// Cenários dos contratos que a construção consegue provar sozinha, sem navegador.
// O que depende de rolagem, foco e clique é conferido no navegador, e está dito no PR.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { raizTemporaria, construirEm, texto, RAIZ } from './ajuda.mjs';
import { TEXTOS, caminhoDoCase } from '../construcao/interface.mjs';
import { lerCase } from '../construcao/conteudo.mjs';
import { escapar } from '../construcao/markdown.mjs';
import { comQuebra, QUEBRA_DESKTOP, QUEBRA_DO_CASE, QUEBRA_DA_BARRA } from '../construcao/tokens.mjs';

// O endereço de cada case, lido de onde a construção lê (decisão 221): o teste não o fixa.
const enderecoDoCase = (arquivo) => caminhoDoCase(lerCase(RAIZ, arquivo));
const FINANCAS = enderecoDoCase('case-study-financas-pf-pj.md');
const REEMBOLSO = enderecoDoCase('case-study-reembolso-sulamerica.md');
const re = (caminho) => `/${caminho}`.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

const site = construirEm(raizTemporaria());

// ── home/home.md ──────────────────────────────────────────────────────────────

test('Quem faz triagem abre a home', () => {
  const home = site.pagina('index.html');
  const ordem = ['Se existe uma', 'Sou curiosa', 'Larissa Quadros · UX Designer', 'Ver os meus trabalhos']
    .map((t) => texto(home).indexOf(t));
  assert.ok(ordem.every((i) => i >= 0), 'os quatro elementos aparecem');
  assert.deepEqual([...ordem].sort((a, b) => a - b), ordem, 'frase, parágrafo, identificação, ação');
  assert.equal((home.match(/class="botao"/g) ?? []).length, 1, 'não há segunda ação principal');
});

test('A pessoa segue para os trabalhos', () => {
  assert.match(site.pagina('index.html'), /<a class="botao" href="\/trabalhos\/">Ver os meus trabalhos<\/a>/);
});

test('Um dos quatro textos da home falta no arquivo', () => {
  const raiz = raizTemporaria({ 'quem-sou-eu.md': (t) => t.replace(/\nSou curiosa[^\n]*\n/, '\n') });
  assert.match(construirEm(raiz).pagina('index.html'), /FALTA · o parágrafo/);
  assert.equal(construirEm(raiz, 'publicar').ok, false);
});

// ── trabalhos/indice-de-trabalhos.md ──────────────────────────────────────────

test('A ordem dos cards', () => {
  const indice = site.pagina('trabalhos/index.html');
  assert.ok(indice.indexOf('A planilha que virou produto') < indice.indexOf('Toda semana, do zero'));
});

test('A pessoa abre um case', () => {
  const indice = site.pagina('trabalhos/index.html');
  assert.match(indice, new RegExp(`<a class="card cor-azul" href="${re(FINANCAS)}">`), 'o card inteiro é o link');
  assert.match(indice, new RegExp(`<a class="card cor-laranja" href="${re(REEMBOLSO)}">`));
});

// ── case/card-proximo-case.md ─────────────────────────────────────────────────

test('Leitor termina o case de Finanças', () => {
  const fim = site.pagina(`${FINANCAS}index.html`).split('class="proximo"')[1];
  assert.match(fim, new RegExp(`class="card cor-laranja" href="${re(REEMBOLSO)}"`));
});

test('Leitor termina o case de Reembolso', () => {
  const fim = site.pagina(`${REEMBOLSO}index.html`).split('class="proximo"')[1];
  assert.match(fim, new RegExp(`class="card cor-azul" href="${re(FINANCAS)}"`));
});

// ── case/pagina-de-case.md ────────────────────────────────────────────────────

test('A pessoa abre um case', () => {
  const caso = site.pagina(`${FINANCAS}index.html`);
  const t = texto(caso);
  assert.ok(t.indexOf('A planilha que virou produto') < t.indexOf('Papel') && t.indexOf('Papel') < t.indexOf('Estive em todas'),
    'título, frase de abertura e tira aparecem antes dos capítulos');
  assert.match(caso, /aria-current="page">Trabalhos</, 'a barra marca Trabalhos como seção');
  assert.equal((caso.match(/class="marca-texto"/g) ?? []).length, 1, 'o marca-texto cobre um trecho, uma vez só');
});

test('A pessoa abre um capítulo que tem vídeo', () => {
  const caso = site.pagina(`${REEMBOLSO}index.html`);
  const videos = caso.match(/<video[^>]+>/g) ?? [];
  assert.equal(videos.length, 2, 'uma versão por tema');
  for (const v of videos) {
    assert.match(v, /preload="none"/, 'só o pôster é baixado');
    assert.doesNotMatch(v, /autoplay/, 'o vídeo não toca sozinho');
    assert.match(v, /src="\/publico\/midias\/reembolso-5-prototipo-(claro|escuro)\.mp4"/, 'servido pelo próprio site');
  }
});

test('Alguém não consegue ver o vídeo', () => {
  // O texto alternativo do vídeo é o conteúdo para quem não o vê (decisão 190): ele chega ao
  // leitor de tela como o nome do vídeo. O teste lê o texto do arquivo de conteúdo, como a
  // construção lê, e não fixa redação nenhuma: só exige que seja o mesmo, e que não falte.
  for (const arquivo of ['case-study-financas-pf-pj.md', 'case-study-reembolso-sulamerica.md']) {
    const c = lerCase(RAIZ, arquivo);
    const videosNoArquivo = c.capitulos.flatMap((cap) => cap.nos)
      .filter((n) => n.tipo === 'imagem' && n.caminho.endsWith('.mp4'));
    assert.ok(videosNoArquivo.length, `${arquivo} sem vídeo`);
    const html = site.pagina(`${caminhoDoCase(c)}index.html`);
    for (const v of videosNoArquivo) {
      assert.ok(v.alt.trim(), `${arquivo}:${v.linha}: vídeo sem texto alternativo`);
      const base = v.caminho.replace(/\.mp4$/, '').split('/').pop();
      const tags = html.match(new RegExp(`<video [^>]*src="[^"]*${base}-(claro|escuro)\\.mp4"[^>]*>`, 'g')) ?? [];
      assert.equal(tags.length, 2, `${base}: as duas versões de tema`);
      for (const tag of tags) {
        assert.ok(tag.includes(`aria-label="${escapar(v.alt)}"`), `${base}: o vídeo não leva o texto alternativo do arquivo`);
      }
    }
  }
});

test('A pessoa lê um capítulo em desktop', () => {
  // Num case de mídias mais altas que o texto, texto e mídia correm em colunas separadas
  // (decisões 204, 207 e 208). O texto vem antes da mídia no HTML em todo case. Sem script, o
  // case fica no layout de cada mídia ao lado do seu capítulo; com script, o texto nasce no
  // layout certo e a mídia só aparece depois de posicionada.
  const fin = site.pagina(`${FINANCAS}index.html`);
  const ree = site.pagina(`${REEMBOLSO}index.html`);
  assert.match(fin, /<main id="conteudo" class="case cor-azul case--colunas-separadas"/);
  assert.doesNotMatch(ree, /case--colunas-separadas/);
  const ordem = (html) => [...html.matchAll(/<section class="capitulo"[\s\S]*?<\/section>/g)]
    .map(([sec]) => sec.match(/capitulo__(leitura|provas)/g)?.join(' '));
  for (const o of [...ordem(fin), ...ordem(ree)]) {
    if (o?.includes('provas')) assert.equal(o, 'capitulo__leitura capitulo__provas', 'a afirmação antes da prova');
  }

  // O script roda logo depois dos capítulos, e só no case de colunas separadas.
  const colunasJs = readFileSync(join(RAIZ, 'modelo/colunas.js'), 'utf8');
  assert.match(fin, /<\/div>\s*<script>\(function \(\) \{\s*var main = document\.querySelector\('\.case--colunas-separadas'\)/);
  assert.equal((ree.match(/case--colunas-separadas/g) ?? []).length, 0);
  // Ele não mexe no texto: só escreve o topo das mídias, a margem do par e a sobra no fim.
  const escritas = [...colunasJs.matchAll(/(\w+)\.style\.(\w+) =/g)].map((m) => `${m[1]}.${m[2]}`);
  assert.deepEqual([...new Set(escritas)].sort(), ['colunas.paddingBottom', 'p.top', 'par.marginTop', 'provas.top'].sort());
  // Ele mostra as mídias quando termina, e, se falhar, devolve o layout em que tudo aparece.
  const [, corpoDoTry, corpoDoCatch] = colunasJs.match(/try \{([\s\S]*?)\} catch \(erro\) \{([\s\S]*?)\}/) ?? [];
  assert.match(corpoDoTry ?? '', /colunas\.classList\.add\('colunas-posicionadas'\)/, 'as mídias aparecem depois de posicionadas');
  assert.match(corpoDoCatch ?? '', /main\.classList\.add\('sem-colunas'\)/, 'se o script falhar, as mídias aparecem no layout sem script');

  const { base, largo } = regrasPorLargura(readFileSync(join(site.saida, 'estilo.css'), 'utf8'));
  const sel = (x) => `.com-js .case--colunas-separadas:not(.sem-colunas) ${x}`;
  // Sem script: nenhuma regra própria, fica o layout de cada mídia ao lado do capítulo.
  for (const regra of Object.keys({ ...base, ...largo })) {
    if (regra.includes('case--colunas-separadas') && regra !== '.case--colunas-separadas') {
      assert.ok(regra.startsWith('.com-js '), `regra das colunas que vale sem script: ${regra}`);
    }
  }
  // Com script: o texto segue com o respiro, na largura da coluna de texto.
  assert.match(largo[sel('.capitulo + .capitulo')] ?? '', /margin-top:\s*var\(--space-96\)/, 'o texto segue com o respiro de capítulo');
  for (const x of ['.capitulo__leitura', '.capitulo__titulo']) {
    assert.match(largo[sel(x)] ?? '', /width:\s*var\(--largura-texto\)/, `${x} na largura da coluna de texto`);
  }
  // A mídia e o par só aparecem depois de posicionados.
  assert.match(largo[sel('.capitulo__provas')] ?? '', /position:\s*absolute/);
  assert.match(largo[sel('.capitulo__provas')] ?? '', /visibility:\s*hidden/, 'a mídia não aparece fora do lugar');
  assert.match(largo[sel('.capitulo__par')] ?? '', /visibility:\s*hidden/, 'o par não aparece fora do lugar');
  assert.match(largo[sel('.capitulo__par')] ?? '', /margin-top:\s*var\(--space-96\)/, 'o par fica o respiro depois do texto');
  for (const x of ['.capitulo__provas', '.capitulo__par']) {
    assert.match(largo[sel(`.colunas-posicionadas ${x}`)] ?? '', /visibility:\s*visible/, `${x} aparece quando posicionado`);
  }
  assert.match(base['.capitulo__provas'] ?? '', /order:\s*2/, 'em tela estreita a mídia vem depois do texto');
});

test('A coluna de mídia segue a regra da decisão 204', () => {
  // A conta do script, tirada do próprio arquivo que vai para a página, com as medidas de 1440.
  const colunasJs = readFileSync(join(RAIZ, 'modelo/colunas.js'), 'utf8');
  const funcao = (nome) => {
    const fonte = colunasJs.match(new RegExp(`function ${nome}\\([^)]*\\) \\{[\\s\\S]*?\\n  \\}`))?.[0];
    assert.ok(fonte, `colunas.js sem a função ${nome}`);
    return new Function(`${fonte}; return ${nome};`)();
  };
  const topos = funcao('topos');
  const margemDoPar = funcao('margemDoPar');
  // E a página usa essas duas contas, e não outra: o topo de cada mídia vem de topos(), e a
  // margem do par vem de margemDoPar().
  const posicionar = colunasJs.match(/function posicionar\(\) \{[\s\S]*?\n  \}/)?.[0] ?? '';
  assert.match(posicionar, /var calculados = topos\(primeirasLinhas, alturas, respiro\);/, 'o topo das mídias vem de topos()');
  assert.match(posicionar, /provas\.style\.top = calculados\[i\] \+ 'px';/, 'cada mídia recebe o topo calculado');
  assert.match(posicionar, /par\.style\.marginTop = margemDoPar\(/, 'a margem do par vem de margemDoPar()');
  // Primeira linha de cada capítulo e altura de cada mídia, medidas no site em 1440.
  assert.deepEqual(topos([768, 1212, 2038, 2956], [404, 878, 1178, 849], 96), [768, 1268, 2242, 3516],
    'o mais baixo entre a primeira linha do capítulo e o fim da mídia anterior mais o respiro');
  assert.deepEqual(topos([100, 1000], [200, 200], 96), [100, 1000], 'mídia curta: cada uma na primeira linha do seu capítulo');
  // O par: o texto do capítulo 6 termina em 4314, e o CSS já põe o par 96 abaixo, em 4410 (o
  // topo natural, com a margem do CSS). A coluna de mídia termina em 4365; o par precisa ficar
  // 96 depois dela, em 4461. A margem calculada substitui a do CSS.
  assert.equal(4410 - 96 + margemDoPar(4410, 4365, 96), 4461);
  assert.equal(margemDoPar(5000, 4365, 96), 96, 'texto mais baixo: fica só o respiro depois do texto');
});

// Decisões 211 e 212, nos contratos home/home.md e trabalhos/indice-de-trabalhos.md. O node não
// monta a página: a altura medida em cada janela fica com a conferência no navegador. Aqui, a
// forma do CSS que produz o desenho.
function semRolagem() {
  return regrasPorLargura(readFileSync(join(site.saida, 'estilo.css'), 'utf8'));
}

// Nenhum valor escrito à mão nos degraus: eles só trocam uma variável por outra.
function soVariaveis(porAltura, filtro) {
  for (const [altura, regras] of Object.entries(porAltura)) {
    if (altura === 'larguraDoMinimo' || altura === 'porLargura' || altura === 'faixaDaBarra') continue;
    for (const [seletor, corpo] of Object.entries(regras)) {
      if (!filtro.test(seletor)) continue;
      for (const [, prop, valor] of corpo.matchAll(/([\w-]+):\s*([^;]+);/g)) {
        assert.match(valor.trim(), /^(var\(--[\w-]+\)( var\(--[\w-]+\))?|none)$/, `${altura}, ${seletor} { ${prop}: ${valor} }`);
      }
    }
  }
}

function ocupaAJanela(base, largo, pagina) {
  // A página ocupa a janela menos a barra, e o conteúdo fica no meio, com o mesmo respiro em
  // cima e embaixo.
  assert.match(largo[pagina], /min-height: calc\(100vh - var\(--altura-barra\)\)/, `${pagina}: altura da janela`);
  assert.match(largo[pagina], /min-height: calc\(100svh - var\(--altura-barra\)\)/, `${pagina}: altura da janela, com a barra do navegador`);
  assert.match(largo[pagina], /align-content: center/, `${pagina}: conteúdo no meio`);
  assert.doesNotMatch(base[pagina], /min-height|align-content: center/, `${pagina}: na tela estreita, nada muda`);
}

test('A Home cabe na janela do desktop', () => {
  const { base, largo, porAltura } = semRolagem();
  ocupaAJanela(base, largo, '.home');
  // Degraus: abaixo de 980, o desenho de 790; abaixo de 790, ou de 1280 de largura, o de 650.
  assert.match(porAltura['980']['.home__frase'], /font-size: var\(--home-frase-media\)/);
  assert.match(porAltura['980']['.home'], /row-gap: var\(--space-64\)/, 'em 790, 64 entre a frase e o bloco');
  assert.match(porAltura['790']['.home__frase'], /font-size: var\(--home-frase-baixa\)/);
  assert.match(porAltura['790']['.home__frase'], /--marca-linha: var\(--home-frase-baixa\)/, 'o marca-texto acompanha a frase');
  assert.match(porAltura['790']['.home__paragrafo'], /font-size: var\(--home-abertura-size-baixa\)/);
  soVariaveis(porAltura, /home/);
});

test('Trabalhos cabe na janela do desktop', () => {
  const { base, largo, porAltura } = semRolagem();
  ocupaAJanela(base, largo, '.trabalhos');
  // Degraus: abaixo de 1010, o desenho de 790; abaixo de 790, ou de 1280 de largura, o de 650.
  assert.match(porAltura['1010']['.trabalhos .card__capa'], /max-height: var\(--capa-media\)/);
  assert.match(porAltura['790']['.trabalhos .card__capa'], /max-height: var\(--capa-baixa\)/);
  assert.match(porAltura['790']['.trabalhos__titulo br'], /display: none/, 'no mínimo, o título numa linha só');
  assert.match(porAltura['790']['.trabalhos .card__titulo'], /font-size: var\(--card-titulo-baixo-size\)/);
  assert.equal(porAltura['790']['.trabalhos .card__texto'], undefined, 'o texto do card mantém o respiro de 24');
  soVariaveis(porAltura, /trabalhos/);
  for (const regras of Object.values(porAltura)) {
    // A capa baixa vale só em Trabalhos: o card do próximo case continua em 3:2.
    for (const seletor of Object.keys(regras)) if (/card/.test(seletor)) assert.match(seletor, /^\.trabalhos /, `${seletor} fora de Trabalhos`);
  }
});

test('O título de Trabalhos numa janela estreita', () => {
  // Abaixo de 1120 de largura, a quebra escolhida volta, em qualquer altura (decisão 213).
  const { porAltura } = semRolagem();
  const html = site.pagina('trabalhos/index.html');
  const [, primeira, segunda] = html.match(/<h1 class="trabalhos__titulo">([^<]+)<br class="so-largo">([^<]+)<\/h1>/) ?? [];
  assert.equal(primeira?.trim(), 'Dois problemas que eu vi de perto,');
  assert.equal(segunda?.trim(), 'e o que fiz com eles.');
  assert.deepEqual(Object.keys(porAltura.porLargura ?? {}), ['1120'], 'a regra vale abaixo de 1120 de largura');
  assert.match(porAltura.porLargura['1120']['.trabalhos__titulo br'], /display: revert/, 'abaixo de 1120, a quebra aparece');
  // A regra vem depois do degrau que esconde a quebra, para vencer em qualquer altura.
  const css = readFileSync(join(site.saida, 'estilo.css'), 'utf8');
  assert.ok(css.indexOf('(width < 1120px)') > css.lastIndexOf('.trabalhos__titulo br { display: none; }'), 'a quebra vence o degrau de 650');
});

test('A janela é mais baixa que o mínimo', () => {
  // Abaixo do mínimo, vale o desenho de 650 e a página rola, com respiro de pelo menos 24.
  // Os degraus só existem no desktop; abaixo de 1280 de largura, vale sempre o de 650.
  const { largo, porAltura } = semRolagem();
  for (const pagina of ['.home', '.trabalhos']) {
    assert.match(largo[pagina], /padding-block: var\(--space-24\)[^}]*$/, `${pagina}: abaixo do mínimo, o respiro não fica menor que 24`);
  }
  assert.equal(porAltura.foraDoDesktop, undefined, 'nenhum degrau de altura vale fora do desktop');
  assert.deepEqual(Object.keys(porAltura).filter((k) => !['larguraDoMinimo', 'porLargura', 'faixaDaBarra'].includes(k)).sort(), ['1010', '790', '980']);
  assert.deepEqual(porAltura.larguraDoMinimo, ['790 abaixo de 1280', '790 abaixo de 1280'], 'Home e Trabalhos: abaixo de 1280 de largura, o desenho de 650');
});

test('O par de telas é uma peça só', () => {
  // `<!-- bloco: par -->` (decisão 205): duas imagens, cada uma com o seu texto alternativo,
  // e uma legenda só, a da segunda.
  const fin = site.pagina(`${FINANCAS}index.html`);
  const pares = fin.match(/<figure class="par">[\s\S]*?<\/figure>/g) ?? [];
  assert.equal(pares.length, 1);
  const [par] = pares;
  assert.equal((par.match(/<div class="par__tela">/g) ?? []).length, 2, 'duas telas');
  assert.equal((par.match(/<figcaption/g) ?? []).length, 1, 'uma legenda só');
  for (const nome of ['financas-6-mockup-evolucao', 'financas-6-mockup-dre']) {
    for (const tema of ['claro', 'escuro']) assert.match(par, new RegExp(`${nome}-${tema}\\.png`));
  }
  const alts = [...par.matchAll(/alt="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(alts).size, 2, 'cada tela com o seu texto alternativo');
  assert.match(fin.split('id="resultados"')[1].split('</section>')[0], /class="capitulo__par"/, 'o par é a mídia do capítulo 6');
});

test('O case numa janela entre a tela estreita e o desktop', () => {
  // Decisões 225 e 229, seção "Entre 1024 e 1280 de largura" de case/pagina-de-case.md. O case leva o mesmo CSS com a troca de modo
  // na quebra dele, e os scripts leem a quebra da página. A medida no navegador fica com a
  // conferência; aqui, a forma.
  const css = readFileSync(join(site.saida, 'estilo.css'), 'utf8');
  const cssDoCase = readFileSync(join(site.saida, 'estilo-case.css'), 'utf8');
  assert.equal(cssDoCase, comQuebra(css, QUEBRA_DO_CASE), 'o CSS do case é o mesmo, com a quebra do case');
  assert.doesNotMatch(cssDoCase.replace(/\/\*[\s\S]*?\*\//g, ''), new RegExp(`\\((min|max)-width: ${QUEBRA_DESKTOP}px|${QUEBRA_DESKTOP - 0.02}px\\)`),
    'no CSS do case não sobra troca de modo na quebra das outras páginas');
  for (const p of [`${FINANCAS}index.html`, `${REEMBOLSO}index.html`]) {
    const html = site.pagina(p);
    assert.match(html, new RegExp(`<html [^>]*data-quebra="${QUEBRA_DO_CASE}"`), `${p}: a quebra do case`);
    assert.match(html, /<link rel="stylesheet" href="\/estilo-case\.css">/, `${p}: o CSS do case`);
  }
  for (const p of ['index.html', 'trabalhos/index.html', 'quem-sou-eu/index.html', '404.html']) {
    const html = site.pagina(p);
    assert.match(html, new RegExp(`<html [^>]*data-quebra="${QUEBRA_DESKTOP}"`), `${p}: a quebra das outras páginas`);
    assert.match(html, /<link rel="stylesheet" href="\/estilo\.css">/, `${p}: o CSS de sempre`);
  }
  for (const script of ['moldura.js', 'colunas.js']) {
    const fonte = readFileSync(join(RAIZ, 'modelo', script), 'utf8');
    assert.match(fonte, /matchMedia\('\(min-width: ' \+ [^;]*getAttribute\('data-quebra'\)/, `${script}: a quebra vem da página`);
    assert.doesNotMatch(fonte, /matchMedia\('\(min-width: \d+px\)'\)/, `${script}: nenhuma quebra escrita no script`);
  }
  // No modo estreito: coluna de no máximo 680 no meio, mídia de no máximo 411, e o bloco de
  // destaque sangrando com o texto na coluna. Abaixo de 728, as regras não mudam nada.
  const estreito = [...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/@media \(max-width: 1023\.98px\) \{([\s\S]*?)\n\}/g)].map((m) => m[1]).join('\n');
  for (const seletor of ['.case__hero > *', '.capitulo > :not(.capitulo__leitura)', '.capitulo__leitura > :not(.bloco-de-destaque)', '.case__fim > *']) {
    assert.ok(estreito.includes(seletor), `coluna: ${seletor}`);
  }
  assert.match(estreito, /max-width: var\(--coluna-do-case\);\s*margin-inline: auto;/);
  assert.match(estreito, /\.capitulo__leitura \.bloco-de-destaque \{\s*padding-inline: calc\(var\(--space-24\) \+ max\(0px, \(100% - var\(--coluna-do-case\)\) \/ 2\)\);/);
  assert.match(estreito, /\.prova, \.par \{\s*width: 100%;\s*max-width: var\(--midia-do-case\);/);
  assert.match(estreito, /\.extra \.extra__titulo, \.extra \.extra__conteudo \{\s*padding-inline: max\(var\(--margem\), \(100% - var\(--coluna-do-case\)\) \/ 2\);/, 'o extra segue a coluna');
  assert.match(css, /@media \(min-width: 676px\) and \(max-width: 1023\.98px\) \{\s*\.convite \.botao \{ width: auto;/, 'o botão do convite com a largura do texto onde a coluna tem limite');
});

test('A pessoa vai para fora do site', () => {
  const caso = site.pagina(`${REEMBOLSO}index.html`);
  // O endereço é conteúdo e muda; o que o contrato pede é a forma: palavra sublinhada,
  // nova aba, e o rótulo avisando. E o protótipo abre no fluxo do app (decisão 185): sem
  // ponto de partida, o Figma abre outro fluxo do arquivo. O nó em si não é fixado aqui.
  const prototipos = [...caso.matchAll(/href="(https:\/\/www\.figma\.com\/proto\/[^"]+)" target="_blank" rel="noopener">Abrir o protótipo<span class="aviso-nova-aba"> abre em nova aba<\/span>/g)];
  assert.ok(prototipos.length >= 1, 'o link do protótipo é palavra sublinhada que abre em nova aba');
  for (const [, url] of prototipos) assert.match(url, /starting-point-node-id=/, `sem ponto de partida: ${url}`);
  // Na tira, o repositório aparece uma vez só, como "Ver o repositório", no endereço que está
  // no arquivo; o "[link]" do arquivo não vira um segundo link no texto.
  const md = readFileSync(join(RAIZ, 'case-study-reembolso-sulamerica.md'), 'utf8');
  const endereco = md.match(/^\*\*Repositório\*\* · .*\[[^\]]+\]\(([^)]+)\)\s*$/m)?.[1];
  assert.ok(endereco, 'o arquivo do Reembolso tem o endereço do repositório na tira');
  const dd = caso.match(/<dt>Repositório<\/dt><dd>([\s\S]*?)<\/dd>/)?.[1] ?? '';
  const links = [...dd.matchAll(/<a [^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)].map((m) => [m[1], m[2]]);
  assert.deepEqual(links, [[escapar(endereco), 'Ver o repositório']]);
  assert.match(dd, /<a class="tira__link" [^>]*target="_blank" rel="noopener">/, 'abre em nova aba');
  assert.doesNotMatch(dd, /\[|\]/, 'nenhum colchete do arquivo na página');
});

// ── erro/endereco-inexistente.md ──────────────────────────────────────────────

test('A pessoa pede um endereço que não existe', () => {
  const erro = site.pagina('404.html');
  assert.match(erro, /<header class="barra">/, 'a barra fixa continua visível');
  assert.match(texto(erro), /Esse endereço não leva a lugar nenhum\./);
  for (const saida of ['Ver os trabalhos', 'Voltar para a home', 'Falar comigo']) assert.match(erro, new RegExp(saida));
});

test('Como a hospedagem entrega a página de erro', () => {
  // Decisão 233. O GitHub Pages responde 404 e entrega o 404.html da raiz do site para todo
  // endereço que não existe. O status é do servidor e se confere no ar; aqui, a parte do site:
  // o arquivo está na raiz, e é a página de erro do site, com a barra e as saídas.
  assert.ok(existsSync(join(site.saida, '404.html')), 'o 404.html está na raiz do site');
  const erro = site.pagina('404.html');
  assert.match(erro, /<header class="barra">/);
  assert.ok(texto(erro).includes(TEXTOS.erroTitulo.texto), 'é a página de erro do site, não a do servidor');
  // Servido em qualquer profundidade, ele só pode usar endereços a partir da raiz.
  for (const [, alvo] of erro.matchAll(/(?:href|src)="([^"#]*)"/g)) {
    if (/^(https?:|mailto:)/.test(alvo)) continue;
    assert.match(alvo, /^\//, `endereço relativo no 404.html quebraria em /a/b/: ${alvo}`);
  }
});

test('As saídas não se disfarçam de outra coisa', () => {
  const erro = site.pagina('404.html');
  assert.doesNotMatch(erro, /aria-current="page"/, 'nenhum item da barra aparece como página atual');
  assert.doesNotMatch(erro.split('erro__saidas')[1], /class="botao"/, 'nenhuma saída é botão');
});

// ── moldura/botao-contato.md e tema/tema-claro-e-escuro.md ────────────────────

test('O leitor está na home ou na página de erro', () => {
  for (const p of ['index.html', '404.html']) {
    assert.doesNotMatch(site.pagina(p), /aria-current="page"|barra__item--atual/);
  }
});

test('O leitor está em Quem sou eu, em tela estreita', () => {
  assert.match(site.pagina('quem-sou-eu/index.html'), /class="barra__item barra__item--atual" type="button" popovertarget="menu"/);
});

test('Leitor procura como falar com ela', () => {
  const home = site.pagina('index.html');
  assert.match(home, /<div class="caixa caixa--contato" id="contato" popover>/);
  assert.match(home, /href="mailto:llquadros95@gmail\.com">llquadros95@gmail\.com</, 'o endereço aparece escrito por extenso');
});

test('A pessoa baixa o currículo', () => {
  // O PDF é entregue, e o currículo aparece como palavra sublinhada, não como botão.
  const quem = site.pagina('quem-sou-eu/index.html');
  const m = quem.match(/<a class="sublinhado" href="\/(publico\/[^"]+\.pdf)">Baixar currículo em PDF<\/a>/);
  assert.ok(m, 'o currículo é palavra sublinhada que aponta para um PDF');
  assert.ok(existsSync(join(site.saida, m[1])), 'o PDF está no site');
  assert.equal(readFileSync(join(site.saida, m[1])).subarray(0, 5).toString('latin1'), '%PDF-', 'o arquivo entregue é um PDF');
  assert.doesNotMatch(quem, /FALTA · o arquivo do currículo/);
});

test('Leitor escolhe o LinkedIn', () => {
  // O perfil abre em nova aba, no contato de toda página e em "Quem sou eu". O endereço vem do
  // mesmo lugar que a construção usa, que o teste de copy amarra ao contrato: o teste não fixa
  // qual perfil é. O rótulo é só a palavra, sem o aviso de nova aba (decisão 217): o link é
  // lido até o </a>, e o que houver além do rótulo aparece na comparação.
  const endereco = escapar(TEXTOS.linkedinEndereco.texto).replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
  const link = new RegExp(`<a class="[^"]*" href="${endereco}" target="_blank" rel="noopener">([\\s\\S]*?)<\\/a>`, 'g');
  for (const p of ['index.html', 'trabalhos/index.html', '404.html']) {
    assert.deepEqual([...site.pagina(p).matchAll(link)].map((m) => m[1]), ['LinkedIn'], `${p}: o LinkedIn no contato`);
  }
  assert.deepEqual([...site.pagina('quem-sou-eu/index.html').matchAll(link)].map((m) => m[1]).sort(), ['LinkedIn', 'Ver LinkedIn']);
  assert.doesNotMatch(site.pagina('index.html'), /FALTA · o endereço do LinkedIn/);
});

test('A barra é a mesma em todas as páginas na mesma largura', () => {
  // Decisão 230, moldura/botao-contato.md. A barra e as sobreposições trocam de modo na quebra
  // da barra em toda página; o conteúdo segue a quebra da página.
  const paginas = ['index.html', 'trabalhos/index.html', 'quem-sou-eu/index.html', '404.html', `${FINANCAS}index.html`, `${REEMBOLSO}index.html`];
  const barras = paginas.map((p) => {
    const html = site.pagina(p);
    assert.match(html, new RegExp(`<html [^>]*data-quebra-barra="${QUEBRA_DA_BARRA}"`), `${p}: a página diz a quebra da barra`);
    return html.match(/<header class="barra">[\s\S]*?<\/header>/)[0];
  });
  // Tirando a marca da página atual, a barra é a mesma em todas.
  const semMarca = (b) => b.replace(/ aria-current="page"/g, '').replace(/ barra__item--atual/g, '');
  for (const [i, b] of barras.entries()) assert.equal(semMarca(b), semMarca(barras[0]), `${paginas[i]}: a mesma barra`);
  const barra = barras[0];
  assert.match(barra, /<li class="so-barra-larga">[^\n]*quem-sou-eu/, 'Quem sou eu só na barra larga');
  assert.match(barra, /<li class="so-barra-larga so-com-js">[^\n]*popovertarget="tema"/, 'Tema só na barra larga');
  assert.match(barra, /<li class="so-barra-estreita">[^\n]*popovertarget="menu"/, 'Menu só na barra estreita');
  assert.doesNotMatch(barra, /"so-largo|"so-estreito|so-largo"|so-estreito"/, 'a barra não troca na quebra do conteúdo');
  // Em Quem sou eu, abaixo da quebra da barra, o sublinhado vai para o Menu.
  assert.match(barras[2], /class="barra__item barra__item--atual" type="button" popovertarget="menu"/);
  for (const arquivo of ['estilo.css', 'estilo-case.css']) {
    const css = readFileSync(join(site.saida, arquivo), 'utf8');
    assert.ok(css.includes(`@media (max-width: ${QUEBRA_DA_BARRA - 0.02}px) { .so-barra-larga { display: none !important; } }`), `${arquivo}: barra larga só a partir da quebra`);
    assert.ok(css.includes(`@media (min-width: ${QUEBRA_DA_BARRA}px) { .so-barra-estreita { display: none !important; } }`), `${arquivo}: barra estreita só abaixo da quebra`);
    // Abaixo da quebra da barra, a barra e as sobreposições usam os valores da tela estreita,
    // gerados dos tokens.
    const bloco = css.match(new RegExp(`@media \\(max-width: ${QUEBRA_DA_BARRA - 0.02}px\\) \\{\\n  \\.barra, \\.caixa \\{([\\s\\S]*?)\\n  \\}`))?.[1] ?? '';
    const margemEstreita = JSON.parse(readFileSync(join(RAIZ, 'docs/spec/tokens.json'), 'utf8')).colecoes.Grade.variaveis.margem['Tela pequena'];
    assert.match(bloco, new RegExp(`--margem: ${margemEstreita}px;`), `${arquivo}: a margem da barra estreita`);
    // A partir da quebra do Desktop, a barra tem a margem do Desktop, igual em toda página,
    // também no CSS do case (decisão 232). As caixas, não: continuam de margem a margem.
    const margemDesktop = JSON.parse(readFileSync(join(RAIZ, 'docs/spec/tokens.json'), 'utf8')).colecoes.Grade.variaveis.margem.Desktop;
    assert.match(css, new RegExp(`@media \\(${QUEBRA_DESKTOP}px <= width < ${QUEBRA_DA_BARRA}px\\) \\{\\n  \\.barra \\{\\n    --margem: ${margemDesktop}px;\\n  \\}`), `${arquivo}: a barra alinhada ao conteúdo do desktop`);
    // A caixa só se posiciona como no desktop a partir da quebra da barra.
    assert.match(css, new RegExp(`@media \\(min-width: ${QUEBRA_DA_BARRA}px\\) \\{\\n  \\.caixa \\{\\n    left: auto;`), `${arquivo}: a caixa de desktop`);
  }
  const moldura = readFileSync(join(RAIZ, 'modelo/moldura.js'), 'utf8');
  assert.match(moldura, /var barraLarga = window\.matchMedia\('\(min-width: ' \+ [^;]*getAttribute\('data-quebra-barra'\)/);
  assert.match(moldura, /if \(!barraLarga\.matches \|\| !gatilho/, 'a caixa se posiciona pela quebra da barra');
});

test('O script de tema não executa', () => {
  const home = site.pagina('index.html');
  assert.match(home, /<html lang="pt-BR" class="sem-js"[ >]/, 'sem script, a página começa marcada como sem script');
  assert.match(home, /class="caixa caixa--tema so-com-js"/, 'e o controle de tema não promete o que não pode cumprir');
  const css = readFileSync(join(site.saida, 'estilo.css'), 'utf8');
  assert.match(css, /\.sem-js \.so-com-js \{ display: none !important; \}/);
  // Sem script, nenhuma escolha chega ao data-tema: vale a base do CSS, que é o claro.
  assert.match(css, /:root,\n:root\[data-tema="claro"\] \{\n  color-scheme: light;/, 'sem script, o claro');
  assert.doesNotMatch(css, /prefers-color-scheme/, 'e não o do sistema');
});

test('Primeira visita, qualquer que seja o sistema', () => {
  // Decisão 234. Sem escolha guardada, o site fica no claro: o CSS não lê o sistema, o script
  // do <head> só marca uma escolha que exista, e a moldura não lê o sistema.
  for (const arquivo of ['estilo.css', 'estilo-case.css']) {
    const css = readFileSync(join(site.saida, arquivo), 'utf8');
    assert.doesNotMatch(css, /prefers-color-scheme/, `${arquivo}: o sistema não é lido`);
    assert.match(css, /:root,\n:root\[data-tema="claro"\] \{\n  color-scheme: light;/, `${arquivo}: o claro é a base`);
    // As mídias: a versão escura só com o escuro escolhido.
    assert.match(css, /\.midia-escuro \{ display: none; \}/);
    assert.doesNotMatch(css, /:root:not\(\[data-tema="claro"\]\)/, `${arquivo}: nada vale para "não claro" sem escolha`);
  }
  const temaJs = readFileSync(join(RAIZ, 'modelo/tema.js'), 'utf8');
  assert.doesNotMatch(temaJs.replace(/\/\/.*$/gm, ''), /matchMedia|prefers-color-scheme/, 'o script do <head> não lê o sistema');
  assert.match(temaJs, /if \(tema === 'claro' \|\| tema === 'escuro'\) raiz\.setAttribute\('data-tema', tema\);/, 'só a escolha guardada vira data-tema');
  // O fundo do claro é cinza claro, não branco puro (lido dos tokens).
  const fundo = JSON.parse(readFileSync(join(RAIZ, 'docs/spec/tokens.json'), 'utf8')).colecoes.Cor.variaveis['bg/page'].Claro;
  assert.doesNotMatch(String(fundo), /^#?(fff|ffffff)$/i, 'o fundo do claro não é branco puro');
});

test('A barra do navegador acompanha o tema', () => {
  // Decisão 235. A cor é o bg/page de cada tema, lida dos tokens; o claro é o padrão, também
  // sem script, e o escuro só vem da escolha guardada ou da troca no controle.
  const fundo = JSON.parse(readFileSync(join(RAIZ, 'docs/spec/tokens.json'), 'utf8')).colecoes.Cor.variaveis['bg/page'];
  const meta = `<meta name="theme-color" content="${fundo.Claro}" data-claro="${fundo.Claro}" data-escuro="${fundo.Escuro}">`;
  for (const p of ['index.html', 'trabalhos/index.html', 'quem-sou-eu/index.html', '404.html', `${FINANCAS}index.html`, `${REEMBOLSO}index.html`]) {
    const html = site.pagina(p);
    assert.ok(html.includes(meta), `${p}: a barra do navegador no claro, com as duas cores do tema`);
    // A meta vem antes do script do <head>, para ele trocar a cor antes da primeira pintura.
    assert.ok(html.indexOf(meta) < html.indexOf('<script>'), `${p}: a cor antes do script de tema`);
  }
  const temaJs = readFileSync(join(RAIZ, 'modelo/tema.js'), 'utf8');
  assert.match(temaJs, /if \(cor && tema === 'escuro'\) cor\.setAttribute\('content', cor\.getAttribute\('data-escuro'\)\);/, 'a escolha escura guardada já abre com a cor do escuro');
  const moldura = readFileSync(join(RAIZ, 'modelo/moldura.js'), 'utf8');
  assert.match(moldura, /cor\.setAttribute\('content', cor\.getAttribute\(tema === 'escuro' \? 'data-escuro' : 'data-claro'\)\);/, 'a troca no controle troca a cor');
  const manifesto = JSON.parse(readFileSync(join(site.saida, 'manifest.webmanifest'), 'utf8'));
  assert.equal(manifesto.theme_color, fundo.Claro, 'o manifesto no claro');
  assert.equal(manifesto.background_color, fundo.Claro);
});

test('O leitor muda a preferência do sistema', () => {
  // Decisão 234. Nada no site escuta o sistema: mudar a preferência dele não muda a página.
  const moldura = readFileSync(join(RAIZ, 'modelo/moldura.js'), 'utf8').replace(/\/\/.*$/gm, '');
  assert.doesNotMatch(moldura, /prefers-color-scheme/, 'a moldura não lê nem escuta o sistema');
  assert.match(moldura, /return escolhido === 'escuro' \? 'escuro' : 'claro';/, 'sem escolha, o tema em vigor é o claro');
});

// ── Ícone de aba (decisão 187) ────────────────────────────────────────────────

test('Toda página declara o ícone de aba', () => {
  // Sem declaração, o navegador pede /favicon.ico na raiz do domínio, fora do site.
  for (const p of ['index.html', 'trabalhos/index.html', `${FINANCAS}index.html`,
    `${REEMBOLSO}index.html`, 'quem-sou-eu/index.html', '404.html']) {
    const html = site.pagina(p);
    for (const arquivo of ['favicon.ico', 'icone.svg', 'apple-touch-icon.png']) {
      assert.match(html, new RegExp(`href="/publico/icone/${arquivo.replace('.', '\\.')}"`), `${p} sem ${arquivo}`);
    }
  }
});

test('O manifesto nomeia o site e os ícones', () => {
  const m = JSON.parse(readFileSync(join(site.saida, 'manifest.webmanifest'), 'utf8'));
  assert.equal(m.name, 'Larissa Quadros', 'o nome vem de quem-sou-eu.md');
  assert.equal(m.short_name, 'Larissa', 'o nome curto é o da barra');
  assert.equal(m.background_color, '#F4EFE4', 'o fundo claro da página, de tokens.json');
  assert.deepEqual(m.icons.map((i) => i.sizes), ['192x192', '512x512', 'any']);
  assert.match(site.pagina('404.html'), /<link rel="manifest" href="\/manifest\.webmanifest">/);
});

test('Todo endereço local de toda página existe no site', () => {
  // Declarar um arquivo que não foi publicado é 404 calado: o ícone, uma mídia, uma página.
  const PAGINAS = ['index.html', 'trabalhos/index.html', `${FINANCAS}index.html`,
    `${REEMBOLSO}index.html`, 'quem-sou-eu/index.html', '404.html'];
  const existe = (caminho) => {
    const alvo = join(site.saida, caminho.split('#')[0]);
    return existsSync(alvo) && (!statSync(alvo).isDirectory() || existsSync(join(alvo, 'index.html')));
  };
  for (const p of PAGINAS) {
    for (const [, url] of site.pagina(p).matchAll(/(?:href|src|poster)="(\/[^"]*)"/g)) {
      assert.ok(existe(url), `${p} aponta para ${url}, que não está no site`);
    }
  }
  const manifesto = JSON.parse(readFileSync(join(site.saida, 'manifest.webmanifest'), 'utf8'));
  for (const icone of manifesto.icons) {
    assert.ok(existsSync(join(site.saida, icone.src)), `o manifesto aponta para ${icone.src}, que não está no site`);
  }
});

test('O ícone da tela de início não tem transparência', () => {
  // O iOS pinta de preto o que é transparente (decisão 188). No PNG, o byte 25 é o tipo de
  // cor do cabeçalho: 2 é RGB, 6 é RGBA.
  const png = readFileSync(join(site.saida, 'publico/icone/apple-touch-icon.png'));
  assert.equal(png[25], 2, `tipo de cor ${png[25]}: o ícone tem canal de transparência`);
});

test('O vídeo ocupa a coluna na proporção dele, e só o vídeo em pé tem área fixa', () => {
  // O deitado do Finanças é 411x344 como no Figma (decisão 189); o em pé do Reembolso vive
  // numa área fixa com o pôster contido (379:454).
  const videos = (p) => site.pagina(p).match(/<video class="[^"]*"/g) ?? [];
  const fin = videos(`${FINANCAS}index.html`);
  const ree = videos(`${REEMBOLSO}index.html`);
  assert.equal(fin.length, 2, 'o vídeo do Finanças tem as duas versões de tema');
  for (const v of fin) assert.doesNotMatch(v, /prova__video--retrato/, `deitado com área fixa: ${v}`);
  for (const v of ree) assert.match(v, /prova__video--retrato/, `em pé sem área fixa: ${v}`);
  const { base } = regrasPorLargura(readFileSync(join(site.saida, 'estilo.css'), 'utf8'));
  assert.doesNotMatch(base['.prova__video'] ?? '', /aspect-ratio/, 'todo vídeo com proporção fixa');
  assert.match(base['.prova__video--retrato'] ?? '', /aspect-ratio/, 'o vídeo em pé sem a área fixa');
});

// ── A copy de interface tem uma fonte só ─────────────────────────────────────

test('Todo texto de interface que cita um contrato está escrito nele', () => {
  for (const [chave, { texto: t, fonte }] of Object.entries(TEXTOS)) {
    if (!fonte.startsWith('contrato:')) continue;
    const contrato = readFileSync(join(RAIZ, 'docs/comportamento', fonte.slice('contrato:'.length)), 'utf8')
      .replace(/\s+/g, ' ');
    assert.ok(contrato.includes(t), `${chave}: "${t}" não está em ${fonte}`);
  }
});

test('O título do case quebra onde o Figma quebra', () => {
  const fin = site.pagina(`${FINANCAS}index.html`);
  assert.match(fin, /<h1 class="case__titulo"><span class="linha-estreita">A planilha que<\/span> <span class="linha-estreita">virou produto<\/span><\/h1>/,
    'Finanças: quebra escolhida');
  assert.match(site.pagina(`${REEMBOLSO}index.html`), /<h1 class="case__titulo">Toda semana, do zero<\/h1>/,
    'Reembolso: quebra natural');
  // A quebra só existe se o CSS a desenha: cada linha é bloco na tela estreita e volta a
  // correr numa linha no desktop. Sem isso o HTML estaria certo e a tela, não.
  const css = readFileSync(join(site.saida, 'estilo.css'), 'utf8');
  const { base, largo } = regrasPorLargura(css);
  assert.match(base['.case__titulo .linha-estreita'] ?? '', /display:\s*block/, 'na tela estreita cada linha é bloco');
  assert.match(largo['.case__titulo .linha-estreita'] ?? '', /display:\s*inline/, 'no desktop o título corre numa linha');
  const mudou = raizTemporaria({ 'case-study-financas-pf-pj.md': (t) => t.replace('# A planilha que virou produto\n\n**Vi', '# A planilha virou produto\n\n**Vi') });
  assert.match(construirEm(mudou).pagina(`${FINANCAS}index.html`), /<h1 class="case__titulo">A planilha virou produto<\/h1>/,
    'se o título muda no arquivo, a quebra escolhida deixa de valer');
});

// Lê o CSS gerado contando chaves: as regras de fora de qualquer @media (a tela estreita, que
// é a base) e as de dentro de `@media (min-width: 1024px)`. Seletor repetido acumula.
function regrasPorLargura(css) {
  const base = {};
  const largo = {};
  // Degraus de altura do desktop (decisão 211): `@media (min-width: 1024px) and (height < Npx)`.
  const porAltura = {};
  const semComentarios = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let i = 0;
  const lerBloco = (destino, fim) => {
    while (i < fim) {
      const abre = semComentarios.indexOf('{', i);
      if (abre < 0 || abre >= fim) break;
      const seletor = semComentarios.slice(i, abre).trim();
      let profundidade = 1;
      let j = abre + 1;
      while (profundidade && j < semComentarios.length) {
        if (semComentarios[j] === '{') profundidade++;
        else if (semComentarios[j] === '}') profundidade--;
        j++;
      }
      const corpo = semComentarios.slice(abre + 1, j - 1);
      if (seletor.startsWith('@media')) {
        // O degrau mais baixo vale também em toda largura abaixo de 1280 (decisão 212); ele é
        // guardado pela altura, e a largura fica anotada nele.
        const degrau = seletor.match(/^@media \(min-width: 1024px\) and \(height < (\d+)px\)(?:, \(min-width: 1024px\) and \(width < (\d+)px\))?$/);
        if (degrau?.[2]) porAltura.larguraDoMinimo = [...(porAltura.larguraDoMinimo ?? []), `${degrau[1]} abaixo de ${degrau[2]}`];
        if (/^@media \(min-width: 1024px\)$/.test(seletor) || degrau) {
          const salvo = i;
          i = abre + 1;
          lerBloco(degrau ? (porAltura[degrau[1]] ??= {}) : largo, j - 1);
          i = salvo;
        } else if (/^@media \(min-width: 1024px\) and \(width < (\d+)px\)$/.test(seletor)) {
          // Regra só de largura dentro do desktop (decisão 213).
          const largura = seletor.match(/width < (\d+)px/)[1];
          const salvo = i;
          i = abre + 1;
          lerBloco((porAltura.porLargura ??= {})[largura] ??= {}, j - 1);
          i = salvo;
        } else if (/^@media \(1024px <= width < 1280px\)$/.test(seletor)) {
          // A faixa da barra (decisão 232): é do desktop, e não é degrau de altura.
          const salvo = i;
          i = abre + 1;
          lerBloco(porAltura.faixaDaBarra ??= {}, j - 1);
          i = salvo;
        } else if (/height|width </.test(seletor)) {
          porAltura.foraDoDesktop = seletor;
        }
      } else if (destino) {
        for (const sel of seletor.split(',').map((x) => x.trim())) destino[sel] = (destino[sel] ?? '') + corpo;
      }
      i = j;
    }
  };
  lerBloco(base, semComentarios.length);
  return { base, largo, porAltura };
}

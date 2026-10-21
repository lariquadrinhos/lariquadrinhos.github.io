// Contrato idioma/segundo-idioma.md (decisões 242 e 243). Cada teste tem o nome do cenário.
// O inglês é provado com cópias do português como arquivos .en.md (ajuda.mjs): o que se
// confere é o mecanismo, não a tradução, que é dela.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { raizTemporaria, raizComIngles, construirEm, texto, RAIZ } from './ajuda.mjs';
import { TEXTOS, comIdioma, enderecoDe, caminhoDoCase } from '../construcao/interface.mjs';
import { lerCase } from '../construcao/conteudo.mjs';

const site = construirEm(raizComIngles());
const CASES = ['case-study-financas-pf-pj.md', 'case-study-reembolso-sulamerica.md'];

// As páginas, pelo nome, nos dois idiomas: os endereços vêm de onde a construção lê.
function enderecos(i) {
  return comIdioma(i, () => [
    enderecoDe('home'), enderecoDe('trabalhos'), enderecoDe('quem-sou-eu'),
    ...CASES.map((a) => caminhoDoCase(lerCase(RAIZ, a))),
  ]);
}
const PT = enderecos('pt');
const EN = enderecos('en');
const pagina = (endereco) => site.pagina(`${endereco}index.html`);
const lang = (html) => html.match(/<html lang="([^"]+)"/)[1];
const controles = (html) => [...html.matchAll(/<a class="(?:barra__item|caixa__linha)" href="([^"]+)" hreflang="([^"]+)" lang="[^"]+" data-idioma>/g)]
  .map((m) => ({ href: m[1], hreflang: m[2] }));

test('A primeira visita abre em português', () => {
  // A raiz é o português, e nada no site lê o idioma do navegador nem redireciona.
  assert.equal(lang(site.pagina('index.html')), 'pt-BR');
  for (const script of ['tema.js', 'moldura.js', 'colunas.js']) {
    const fonte = readFileSync(join(RAIZ, 'modelo', script), 'utf8').replace(/\/\/.*$/gm, '');
    assert.doesNotMatch(fonte, /navigator\.(language|languages)|location\.(replace|assign)\(|location\.href\s*=/, `${script}: não adivinha nem redireciona`);
  }
});

test('O leitor troca para o inglês', () => {
  PT.forEach((pt, i) => {
    const [aqui, la] = [pagina(pt), pagina(EN[i])];
    // O controle, na barra e no Menu, leva à mesma página no outro idioma, e volta.
    assert.deepEqual(controles(aqui), [{ href: `/${EN[i]}`, hreflang: 'en' }, { href: `/${EN[i]}`, hreflang: 'en' }], `${pt}: English`);
    assert.deepEqual(controles(la), [{ href: `/${pt}`, hreflang: 'pt-BR' }, { href: `/${pt}`, hreflang: 'pt-BR' }], `${EN[i]}: Português`);
    // E a página aponta a sua versão no outro idioma, com o endereço inteiro.
    for (const html of [aqui, la]) {
      assert.match(html, new RegExp(`<link rel="alternate" hreflang="pt-BR" href="https://larissaquadros\\.com/${pt}">`));
      assert.match(html, new RegExp(`<link rel="alternate" hreflang="en" href="https://larissaquadros\\.com/${EN[i]}">`));
    }
  });
  // Num case, no mesmo capítulo: as âncoras são as do português nos dois idiomas, e a moldura
  // põe no controle o capítulo em que a pessoa está.
  for (const [k, pt] of PT.slice(3).entries()) {
    const ids = (html) => [...html.matchAll(/<section class="capitulo" id="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(ids(pagina(EN[3 + k])), ids(pagina(pt)), `${EN[3 + k]}: as mesmas âncoras`);
  }
  const moldura = readFileSync(join(RAIZ, 'modelo/moldura.js'), 'utf8');
  assert.match(moldura, /link\.hash = atual >= 0 \? capitulos\[atual\]\.id : '';/, 'o controle leva ao capítulo atual');
  // Com um capítulo a menos no inglês, as âncoras não batem: a construção recusa.
  const errada = raizComIngles({ 'case-study-reembolso-sulamerica.en.md': (t) => t.replace(/\n## [^\n]*\n<!-- trilha: Resultados[^>]*-->[\s\S]*?(?=\n<!-- bloco: provas -->)/, '\n') });
  assert.throws(() => construirEm(errada), /capítulos/);
});

test('Um link em inglês abre em inglês', () => {
  for (const en of EN) {
    const html = pagina(en);
    assert.equal(lang(html), 'en', `${en}: lang`);
    // A interface está em inglês: a barra, o atalho, o voltar ao topo.
    for (const chave of ['trabalhos', 'quemSouEu', 'contato', 'pularParaConteudo', 'voltarAoTopo']) {
      assert.ok(html.includes(`>${TEXTOS[chave].en}<`), `${en}: ${TEXTOS[chave].en}`);
      assert.ok(!html.includes(`>${TEXTOS[chave].texto}<`), `${en}: sem "${TEXTOS[chave].texto}"`);
    }
  }
  // A faixa do case escreve a posição no idioma da página.
  assert.match(pagina(EN[3]), /<span class="faixa__posicao" data-modelo="\{n\} of \{total\}">1 of \d+<\/span>/);
  const moldura = readFileSync(join(RAIZ, 'modelo/moldura.js'), 'utf8');
  assert.doesNotMatch(moldura.replace(/\/\/.*$/gm, ''), /' de '/, 'a moldura não escreve português');
  // A About em inglês linka o currículo em inglês (decisão 257) e, se ele faltar, volta ao
  // português dizendo isso (decisão 243). Nos dois casos, nada falta e a publicação passa.
  assert.ok(existsSync(join(RAIZ, 'publico/curriculo.en.pdf')), 'o currículo em inglês está no repositório');
  assert.match(pagina(EN[2]), new RegExp(`<a class="sublinhado" href="/publico/curriculo\\.en\\.pdf">${TEXTOS.baixarCurriculo.en.replace(/[()]/g, '\\$&')}</a>`));
  assert.equal(readFileSync(join(site.saida, 'publico/curriculo.en.pdf')).subarray(0, 5).toString('latin1'), '%PDF-', 'e chega ao site, como PDF');
  assert.equal(construirEm(raizComIngles(), 'publicar').ok, true, 'a publicação não recusa');
  const semPdf = raizComIngles();
  rmSync(join(semPdf, 'publico/curriculo.en.pdf'));
  const recuo = construirEm(semPdf, 'publicar');
  assert.equal(recuo.ok, true, 'sem o PDF em inglês, a publicação também passa');
  assert.match(recuo.pagina(`${EN[2]}index.html`), new RegExp(`<a class="sublinhado" href="/publico/curriculo\\.pdf" hreflang="pt-BR">${TEXTOS.baixarCurriculoEmPortugues.en.replace(/[()]/g, '\\$&')}</a>`), 'e linka o português, dizendo isso');
});

test('O controle de idioma na tela estreita', () => {
  const html = pagina(PT[0]);
  // Na barra larga, por último, depois de Tema; abaixo da quebra da barra, dentro do Menu.
  assert.match(html, /popovertarget="tema"[^\n]*\n\s*<li class="so-barra-larga"><a class="barra__item" [^>]*data-idioma>English<\/a><\/li>/);
  const menu = html.match(/<div class="caixa caixa--menu" id="menu" popover>[\s\S]*?\n  <\/div>/)[0];
  assert.match(menu, /<a class="caixa__linha" [^>]*data-idioma><span class="caixa__sinal" aria-hidden="true"><\/span>English<\/a>/);
});

test('A página de erro nos dois idiomas', () => {
  const erro = site.pagina('404.html');
  for (const [i, nivel] of [['pt', 1], ['en', 2]]) {
    const lang = i === 'en' ? ' lang="en"' : '';
    const t = (chave) => (i === 'en' ? TEXTOS[chave].en : TEXTOS[chave].texto);
    const bloco = erro.match(new RegExp(`<div class="erro__explicacao"${lang}>\\s*<h${nivel} class="erro__titulo">([\\s\\S]*?)</h${nivel}>`))?.[1] ?? '';
    assert.equal(texto(bloco), t('erroTitulo'), `${i}: o texto`);
    const saidas = comIdioma(i, () => [enderecoDe('trabalhos'), enderecoDe('home')]);
    for (const s of saidas) assert.match(erro, new RegExp(`<ul class="erro__saidas"${lang}>[\\s\\S]*?href="/${s}"`), `${i}: a saída /${s}`);
  }
});

test('Sem os três arquivos em inglês, o site sai só em português', () => {
  // Enquanto a tradução não é aprovada e entra no repositório, nada em inglês é publicado.
  const so = construirEm(raizTemporaria());
  assert.ok(!existsSync(join(so.saida, 'en')), 'nenhuma página sob /en/');
  assert.doesNotMatch(so.pagina('index.html'), /data-idioma|hreflang="en"/, 'nem o controle, nem a versão em inglês');
  assert.doesNotMatch(so.pagina('404.html'), /lang="en"/, 'a página de erro só em português');
});

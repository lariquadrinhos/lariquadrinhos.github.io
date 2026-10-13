// Do modelo de conteúdo ao HTML das páginas: home, trabalhos, os cases, quem sou eu e erro.
//
// O HTML entrega o produto inteiro (princípio I): texto, imagem, navegação, âncoras da
// trilha e contato funcionam sem script. As sobreposições usam o atributo `popover`, que o
// navegador abre, fecha com Esc ou toque fora e devolve o foco a quem abriu, sem script.
// O script acrescenta: troca de tema, trilha que acompanha a rolagem, voltar ao topo.

import { escapar, inline, ehFraseInteiraEmNegrito, semNegrito } from './markdown.mjs';
import { dimensoes, resolverMidia, resolverCapa } from './midias.mjs';
import { QUEBRA_DESKTOP, QUEBRA_DO_CASE, QUEBRA_DA_BARRA } from './tokens.mjs';
import {
  t, TEXTOS, FRASE_DA_HOME, MARCA_TEXTO_DO_CASE, COR_DO_CASE, BLOCO_DE_DESTAQUE, COLUNAS_SEPARADAS,
  QUEBRA_DO_TITULO_ESTREITA, caminhoDoCase,
  idioma, comIdioma, enderecoDe, LANG, DOMINIO, FRASE_DA_HOME_EN, MARCA_TEXTO_DO_CASE_EN,
  QUEBRA_DO_TITULO_ESTREITA_EN, QUEBRA_DO_TITULO_TRABALHOS,
} from './interface.mjs';

const ATRIBUTOS_EXTERNOS = 'target="_blank" rel="noopener"';

export function slugificar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// O número do capítulo fica no arquivo e sai na construção ("## 2. Ensinei…" vira
// "Ensinei…"), como no Figma (decisão 178).
const tituloDeCapitulo = (texto) => texto.replace(/^\d+\.\s+/, '');

// ── Peças da moldura ───────────────────────────────────────────────────────────

function linkExterno(rotulo, url, classe = 'link-externo') {
  return `<a class="${classe}" href="${escapar(url)}" ${ATRIBUTOS_EXTERNOS}>${rotulo}<span class="aviso-nova-aba"> ${t('abreEmNovaAba')}</span></a>`;
}

// O controle de idioma: o nome do outro idioma, na língua dele, levando à mesma página
// (decisão 242). Com script, a moldura acrescenta o capítulo em que a pessoa está.
function linkDeIdioma(ctx, outro, classe, conteudo) {
  return `<a class="${classe}" href="${ctx.base}${outro.endereco}" hreflang="${LANG[outro.idioma]}" lang="${LANG[outro.idioma]}" data-idioma>${conteudo}</a>`;
}

function barra(ctx, atual, outro) {
  const { base, nomeCurto } = ctx;
  const marca = (pagina) => (atual === pagina ? ' aria-current="page"' : '');
  const sublinhaMenu = atual === 'quem-sou-eu' ? ' barra__item--atual' : '';
  return `<header class="barra">
  <div class="barra__dentro">
    <a class="barra__item barra__nome" href="${base}${enderecoDe('home')}">${escapar(nomeCurto)}</a>
    <nav class="barra__nav" aria-label="${t('rotuloNavegacao')}">
      <ul class="barra__itens">
        <li><a class="barra__item" href="${base}${enderecoDe('trabalhos')}"${marca('trabalhos')}>${t('trabalhos')}</a></li>
        <li class="so-barra-larga"><a class="barra__item" href="${base}${enderecoDe('quem-sou-eu')}"${marca('quem-sou-eu')}>${t('quemSouEu')}</a></li>
        <li><button class="barra__item" type="button" popovertarget="contato" aria-expanded="false">${t('contato')}</button></li>
        <li class="so-barra-larga so-com-js"><button class="barra__item" type="button" popovertarget="tema" aria-expanded="false">${t('tema')}</button></li>
${outro ? `        <li class="so-barra-larga">${linkDeIdioma(ctx, outro, 'barra__item', t('outroIdioma'))}</li>
` : ''}        <li class="so-barra-estreita"><button class="barra__item${sublinhaMenu}" type="button" popovertarget="menu" aria-expanded="false">${t('menu')}</button></li>
      </ul>
    </nav>
  </div>
</header>`;
}

function opcoesDeTema(curtas) {
  return ['claro', 'escuro'].map((tema) => {
    const rotulo = curtas
      ? t(tema === 'claro' ? 'temaClaroCurto' : 'temaEscuroCurto')
      : t(tema === 'claro' ? 'temaClaro' : 'temaEscuro');
    return `<button class="caixa__linha" type="button" data-tema-opcao="${tema}" aria-pressed="false"><span class="caixa__sinal" aria-hidden="true"></span>${rotulo}</button>`;
  }).join('\n    ');
}

function sobreposicoes(ctx, atual, outro) {
  const { base, ausencias, linkedin } = ctx;
  const email = t('email');
  const linhaLinkedin = linkedin
    ? `<a class="caixa__linha caixa__linha--sublinhada" href="${escapar(linkedin)}" ${ATRIBUTOS_EXTERNOS}>${t('linkedin')}</a>`
    : `<span class="caixa__linha">${t('linkedin')} ${ausencias.marcar('o endereço do LinkedIn', 'contato')}</span>`;
  const atualNoMenu = atual === 'quem-sou-eu' ? ' aria-current="page"' : '';
  return `<div class="caixa caixa--contato" id="contato" popover>
    <a class="caixa__linha caixa__linha--sublinhada" href="mailto:${email}">${email}</a>
    ${linhaLinkedin}
  </div>
  <div class="caixa caixa--tema so-com-js" id="tema" popover>
    ${opcoesDeTema(true)}
  </div>
  <div class="caixa caixa--menu" id="menu" popover>
    <a class="caixa__linha" href="${base}${enderecoDe('quem-sou-eu')}"${atualNoMenu}><span class="caixa__sinal" aria-hidden="true"></span>${t('quemSouEu')}</a>
    <div class="caixa__divisoria so-com-js" role="presentation"></div>
    <div class="so-com-js">
    ${opcoesDeTema(false)}
    </div>${outro ? `
    <div class="caixa__divisoria" role="presentation"></div>
    ${linkDeIdioma(ctx, outro, 'caixa__linha', `<span class="caixa__sinal" aria-hidden="true"></span>${t('outroIdioma')}`)}` : ''}
  </div>`;
}

// O endereço de uma página num idioma: a página é o nome dela ou o case.
function enderecoNoIdioma(pagina, i) {
  return comIdioma(i, () => (typeof pagina === 'string' ? enderecoDe(pagina) : caminhoDoCase(pagina)));
}

function documento(ctx, { titulo, atual, corpo, classeDoCorpo = '', pagina }) {
  const { base, temaJs } = ctx;
  // Com o inglês, cada página aponta a sua versão no outro idioma (decisão 242). A página de
  // erro não tem par: o controle leva à home do outro idioma.
  const outroIdioma = ctx.idiomas.find((i) => i !== idioma());
  const outro = outroIdioma && { idioma: outroIdioma, endereco: enderecoNoIdioma(pagina === 'erro' ? 'home' : pagina, outroIdioma) };
  const alternativas = outroIdioma && pagina !== 'erro'
    ? ctx.idiomas.map((i) => `\n<link rel="alternate" hreflang="${LANG[i]}" href="${DOMINIO}/${enderecoNoIdioma(pagina, i)}">`).join('')
    : '';
  const tituloDaAba = titulo ? `${titulo} · ${ctx.nome}` : ctx.nome;
  // O case troca de modo em outra largura (decisão 225): ele leva o CSS com a quebra dele, e
  // os scripts leem a quebra da própria página.
  const ehCase = classeDoCorpo === 'pagina-case';
  const quebra = ehCase ? QUEBRA_DO_CASE : QUEBRA_DESKTOP;
  return `<!doctype html>
<html lang="${LANG[idioma()]}" class="sem-js" data-quebra="${quebra}" data-quebra-barra="${QUEBRA_DA_BARRA}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapar(tituloDaAba)}</title>
<meta name="theme-color" content="${ctx.fundoDaPagina.Claro}" data-claro="${ctx.fundoDaPagina.Claro}" data-escuro="${ctx.fundoDaPagina.Escuro}">
<script>${temaJs}</script>
<link rel="icon" href="${base}publico/icone/favicon.ico">
<link rel="icon" href="${base}publico/icone/icone.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}publico/icone/apple-touch-icon.png">
<link rel="manifest" href="${base}manifest.webmanifest">
<link rel="preload" href="${base}publico/fontes/dm-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${base}${ehCase ? 'estilo-case.css' : 'estilo.css'}">${alternativas}
<script src="${base}moldura.js" defer></script>
</head>
<body class="${classeDoCorpo}">
<div id="topo" tabindex="-1"></div>
<a class="atalho" href="#conteudo">${t('pularParaConteudo')}</a>
${barra(ctx, atual, outro)}
${sobreposicoes(ctx, atual, outro)}
${corpo}
<a class="voltar-ao-topo" href="#topo" hidden>${t('voltarAoTopo')}</a>
</body>
</html>
`;
}

// ── Home ───────────────────────────────────────────────────────────────────────

function fraseComQuebras(frase, linhas, marca, classe) {
  // O trecho do marca-texto é uma faixa da frase; em cada linha, marca-se o pedaço da faixa
  // que cai nela. Assim o trecho pode atravessar uma quebra (na estreita, "forma melhor" /
  // "de fazer,"), e uma palavra do trecho que se repete fora dele não é marcada.
  const inicio = frase.indexOf(marca);
  const fim = inicio + marca.length;
  let pos = 0;
  return linhas.map((linha) => {
    const de = Math.max(inicio, pos) - pos;
    const ate = Math.min(fim, pos + linha.length) - pos;
    pos += linha.length + 1;
    const html = inicio >= 0 && de < ate
      ? escapar(linha.slice(0, de)) + `<mark class="marca-texto">${escapar(linha.slice(de, ate))}</mark>` + escapar(linha.slice(ate))
      : escapar(linha);
    return `<span class="${classe}">${html}</span>`;
  }).join(' ');
}

export function paginaHome(ctx, qse) {
  const { ausencias } = ctx;
  const h = qse.home;
  const falta = (peca) => ausencias.marcar(peca, 'home');

  let frase;
  if (!h.frase) frase = falta('a frase de abertura');
  else {
    const quebras = idioma() === 'en' ? FRASE_DA_HOME_EN : FRASE_DA_HOME;
    const confere = (linhas) => linhas.join(' ') === h.frase;
    if (confere(quebras.desktop) && confere(quebras.estreita)) {
      frase = `<span class="quebra-larga">${fraseComQuebras(h.frase, quebras.desktop, quebras.marcaTexto, 'linha')}</span>`
        + `<span class="quebra-estreita" aria-hidden="true">${fraseComQuebras(h.frase, quebras.estreita, quebras.marcaTexto, 'linha')}</span>`;
    } else {
      // A frase mudou no arquivo: a quebra escolhida deixou de valer, o navegador quebra.
      frase = escapar(h.frase);
    }
  }

  const identificacao = h.nome && h.cargo
    ? `${escapar(h.nome)} · ${escapar(h.cargo)}`
    : falta(!h.nome ? 'o nome' : 'o cargo');

  const corpo = `<main id="conteudo" class="home grade" tabindex="-1">
  <h1 class="home__frase">${frase}</h1>
  <div class="home__bloco">
    <p class="home__paragrafo">${h.paragrafo ? escapar(h.paragrafo) : falta('o parágrafo')}</p>
    <p class="home__identificacao">${identificacao}</p>
    <a class="botao" href="${ctx.base}${enderecoDe('trabalhos')}">${t('verTrabalhos')}</a>
  </div>
</main>`;
  return documento(ctx, { titulo: null, atual: 'home', corpo, classeDoCorpo: 'pagina-home', pagina: 'home' });
}

// ── Card de case (índice e próximo case) ───────────────────────────────────────

function imagemTemada(ctx, versoes, alt, { classe = '', carregamento = 'lazy' } = {}) {
  return versoes.map((v) => {
    const d = dimensoes(`${ctx.raiz}/${v.arquivo}`);
    const tamanho = d ? ` width="${d.largura}" height="${d.altura}"` : '';
    const tema = v.tema ? ` midia-${v.tema}` : '';
    return `<img class="${classe}${tema}" src="${ctx.base}${v.arquivo}" alt="${escapar(alt)}"${tamanho} loading="${carregamento}" decoding="async">`;
  }).join('');
}

// O título do case quebra onde o desenho escolheu, só na tela estreita (decisão 186), no case e
// no card dele (decisão 247), nos dois idiomas. Se as linhas juntas não forem o título, a
// quebra deixou de valer e o navegador quebra.
function tituloComQuebra(c, titulo) {
  const quebra = (idioma() === 'en' ? QUEBRA_DO_TITULO_ESTREITA_EN : QUEBRA_DO_TITULO_ESTREITA)[c.prefixo];
  if (quebra && quebra.join(' ') === titulo) return quebra.map((l) => `<span class="linha-estreita">${escapar(l)}</span>`).join(' ');
  return escapar(titulo);
}

function card(ctx, c, onde, nivel = 'h2') {
  const { ausencias } = ctx;
  const capas = resolverCapa(ctx.raiz, c.prefixo);
  const capa = capas.length
    ? imagemTemada(ctx, capas, '', { classe: 'card__capa-img' })
    : ausencias.marcar(`a capa do case ${c.card.titulo ?? c.slug}`, onde);
  const titulo = c.card.titulo ? tituloComQuebra(c, c.card.titulo) : ausencias.marcar('o título do card', onde);
  const linha = c.card.linha ? escapar(c.card.linha) : ausencias.marcar('a linha do card', onde);
  return `<a class="card cor-${COR_DO_CASE[c.prefixo]}" href="${ctx.base}${caminhoDoCase(c)}">
    <div class="card__capa">${capa}</div>
    <div class="card__texto">
      <${nivel} class="card__titulo">${titulo}</${nivel}>
      <p class="card__linha">${linha}</p>
    </div>
  </a>`;
}

export function paginaTrabalhos(ctx, cases) {
  // A quebra escolhida, se as duas linhas juntas forem o título; senão, o navegador quebra.
  const quebra = QUEBRA_DO_TITULO_TRABALHOS[idioma()];
  const tituloHtml = quebra.join(' ') === t('tituloTrabalhos')
    ? `${escapar(quebra[0])}<br class="so-largo"> ${escapar(quebra[1])}`
    : escapar(t('tituloTrabalhos'));
  const corpo = `<main id="conteudo" class="trabalhos grade" tabindex="-1">
  <h1 class="trabalhos__titulo">${tituloHtml}</h1>
  <div class="trabalhos__cards">
  ${cases.map((c) => card(ctx, c, 'trabalhos')).join('\n  ')}
  </div>
</main>`;
  return documento(ctx, { titulo: t('trabalhos'), atual: 'trabalhos', corpo, classeDoCorpo: 'pagina-trabalhos', pagina: 'trabalhos' });
}

// ── Case ───────────────────────────────────────────────────────────────────────

function aberturaComMarca(texto, marca) {
  const i = marca ? texto.indexOf(marca) : -1;
  if (i < 0) return escapar(texto);
  return escapar(texto.slice(0, i)) + `<mark class="marca-texto">${escapar(marca)}</mark>` + escapar(texto.slice(i + marca.length));
}

function tira(ctx, c) {
  const onde = `${c.arquivo}, tira de destaques`;
  return c.hero.tira.map(({ chave, valor }) => {
    let link = '';
    // O link no fim do valor vira "Ver o repositório" na linha de baixo, e sai do texto, com ou
    // sem endereço. `[link]` sem endereço é o repositório que ainda não existe.
    const valorHtml = inline(valor.replace(/,?\s*\[[^\]]+\](\([^)]*\))?\s*$/, ''));
    if (/\[link\]\s*$/.test(valor)) {
      link = ctx.ausencias.marcar('o endereço do repositório', onde);
    } else {
      const m = valor.match(/\[([^\]]+)\]\(([^)]+)\)\s*$/);
      if (m) link = `<a class="tira__link" href="${escapar(m[2])}" ${ATRIBUTOS_EXTERNOS}>${t('verRepositorio')}</a>`;
    }
    return `<div class="tira__item"><dt>${escapar(chave)}</dt><dd>${valorHtml}${link}</dd></div>`;
  }).join('\n      ');
}

function figura(ctx, c, no, capitulo) {
  const { ausencias } = ctx;
  const onde = `${c.arquivo}:${no.linha}`;
  if (!no.alt) return ausencias.marcar(`o texto alternativo da imagem ${no.caminho}`, onde);
  // Imagem de prova sem legenda não é publicada (contrato de conteúdo).
  if (!no.legenda) return ausencias.marcar(`a legenda de ${no.caminho}`, onde);

  const versoes = resolverMidia(ctx.raiz, no.caminho);
  // Toda mídia de prova tem duas versões, uma por tema (contrato de conteúdo). Faltando uma,
  // o tema dela mostraria a outra em silêncio: a que falta é marcada.
  const temas = versoes.map((v) => v.tema).filter(Boolean);
  const faltaTema = temas.length === 1
    ? ausencias.marcar(`a versão ${temas[0] === 'claro' ? 'escura' : 'clara'} de ${no.caminho}`, onde, { classe: 'falta falta--linha' })
    : '';
  let midia;
  if (!versoes.length) {
    midia = `<div class="prova__vazia">${ausencias.marcar(`o arquivo ${no.caminho}`, onde, { classe: 'falta falta--midia' })}</div>`;
  } else if (no.caminho.endsWith('.mp4')) {
    midia = versoes.map((v) => {
      const d = v.poster ? dimensoes(`${ctx.raiz}/${v.poster}`) : null;
      const tamanho = d ? ` width="${d.largura}" height="${d.altura}"` : '';
      const poster = v.poster ? ` poster="${ctx.base}${v.poster}"` : '';
      // Vídeo em pé (o aparelho do Reembolso, 379:454) vive numa área fixa, com o pôster
      // contido; vídeo deitado (a tela do Finanças) ocupa a coluna na proporção dele.
      const retrato = d && d.altura > d.largura ? ' prova__video--retrato' : '';
      // Não toca sozinho e não baixa nada até a pessoa pedir; o pôster é o que carrega.
      return `<video class="prova__video${retrato}${v.tema ? ` midia-${v.tema}` : ''}" src="${ctx.base}${v.arquivo}"${poster}${tamanho} preload="none" controls playsinline muted aria-label="${escapar(no.alt)}"></video>`;
    }).join('');
  } else {
    midia = imagemTemada(ctx, versoes, no.alt, { classe: 'prova__img' });
  }

  let convite = '';
  if (no.convite) {
    const m = no.convite.match(/^(.*?)\s*\[([^\]]+)\]\(([^)]+)\)\s*$/);
    convite = m
      ? `<p class="prova__convite">${escapar(m[1])}<br>${linkExterno(escapar(m[2]), m[3])}</p>`
      : `<p class="prova__convite">${inline(no.convite)}</p>`;
  }
  return `<figure class="prova">
          <div class="prova__midia">${midia}</div>${faltaTema}
          <figcaption class="prova__legenda">${escapar(no.legenda)}</figcaption>
          ${convite}
        </figure>`;
}

// Par de telas (decisão 205): duas imagens que são uma peça só, cada uma com o seu texto
// alternativo e uma legenda só, a da segunda. No desktop lado a lado na largura do conteúdo;
// em tela estreita uma embaixo da outra.
function parDeTelas(ctx, c, imagens) {
  const { ausencias } = ctx;
  const onde = `${c.arquivo}:${imagens[0]?.linha ?? ''}`;
  if (imagens.length !== 2) return ausencias.marcar('a segunda imagem do par de telas', onde);
  const legenda = imagens[1].legenda;
  if (!legenda) return ausencias.marcar('a legenda do par de telas', onde);
  const telas = imagens.map((no) => {
    if (!no.alt) return `<div class="par__tela">${ausencias.marcar(`o texto alternativo de ${no.caminho}`, onde)}</div>`;
    const versoes = resolverMidia(ctx.raiz, no.caminho);
    const temas = versoes.map((v) => v.tema).filter(Boolean);
    const faltaTema = temas.length === 1
      ? ausencias.marcar(`a versão ${temas[0] === 'claro' ? 'escura' : 'clara'} de ${no.caminho}`, onde, { classe: 'falta falta--linha' })
      : '';
    const midia = versoes.length
      ? imagemTemada(ctx, versoes, no.alt, { classe: 'par__img' })
      : `<div class="prova__vazia">${ausencias.marcar(`o arquivo ${no.caminho}`, onde, { classe: 'falta falta--midia' })}</div>`;
    return `<div class="par__tela">${midia}${faltaTema}</div>`;
  }).join('\n            ');
  return `<figure class="par">
          <div class="par__telas">
            ${telas}
          </div>
          <figcaption class="prova__legenda">${escapar(legenda)}</figcaption>
        </figure>`;
}

function provaQueFalta(ctx, c, capitulo) {
  return `<figure class="prova">
          <div class="prova__midia prova__vazia">${ctx.ausencias.marcar(`a mídia de prova do capítulo "${capitulo.rotulo}"`, c.arquivo, { classe: 'falta falta--midia' })}</div>
          <figcaption class="prova__legenda">${ctx.legendaNaoEscrita}</figcaption>
        </figure>`;
}

function lista(no) {
  const tag = no.ordenada ? 'ol' : 'ul';
  return `<${tag} class="lista lista--${no.ordenada ? 'numerada' : 'solta'}">${no.itens.map((i) => `<li>${inline(i)}</li>`).join('')}</${tag}>`;
}

// A tabela ocupa a largura do conteúdo. O título da seção vai para a primeira célula do
// cabeçalho quando ela está vazia, como no Figma (145:52, 145:128).
function tabela(no, titulo) {
  const cab = [...no.cabecalho];
  let legenda = '';
  if (titulo && cab[0] === '') cab[0] = titulo;
  else if (titulo) legenda = `<caption>${escapar(titulo)}</caption>`;
  const colunas = `tabela--${cab.length}-colunas`;
  return `<table class="tabela ${colunas}">${legenda}
          <thead><tr>${cab.map((h) => `<th scope="col">${inline(h)}</th>`).join('')}</tr></thead>
          <tbody>${no.linhas.map((l) => `<tr>${l.map((cel, i) => (i === 0 ? `<th scope="row">${inline(cel)}</th>` : `<td>${inline(cel)}</td>`)).join('')}</tr>`).join('\n          ')}</tbody>
        </table>`;
}

// O endereço de âncora de cada capítulo é o do português nos dois idiomas (decisão 242): o
// case em inglês leva, em c.ref, o case em português.
const idDoCapitulo = (c, i) => slugificar((c.ref ?? c).capitulos[i].rotulo);

// Qual parágrafo recebe o bloco de destaque é escrito pelo começo do texto em português
// (BLOCO_DE_DESTAQUE). No inglês vale a mesma posição: o mesmo parágrafo do mesmo capítulo.
function posicoesDeDestaque(c, indice) {
  const ref = c.ref ?? c;
  const destaques = BLOCO_DE_DESTAQUE[ref.prefixo] ?? [];
  return ref.capitulos[indice].nos.filter((n) => n.tipo === 'paragrafo')
    .map((n, i) => (destaques.some((d) => n.texto.startsWith(d)) ? i : -1)).filter((i) => i >= 0);
}

function capitulo(ctx, c, cap, indice) {
  const id = idDoCapitulo(c, indice);
  const leitura = [];
  const provas = [];
  const largos = [];
  const par = [];
  let noPar = false;
  let soDesktop = true;
  const destaques = posicoesDeDestaque(c, indice);
  let paragrafo = -1;

  for (const no of cap.nos) {
    if (no.tipo === 'paragrafo') {
      paragrafo += 1;
      if (ehFraseInteiraEmNegrito(no.texto)) {
        leitura.push(`<p class="frase-de-abertura">${inline(semNegrito(no.texto))}</p>`);
      } else if (destaques.includes(paragrafo)) {
        leitura.push(`<p class="bloco-de-destaque">${inline(no.texto)}</p>`);
      } else {
        leitura.push(`<p>${inline(no.texto)}</p>`);
      }
    } else if (no.tipo === 'titulo') {
      const nivel = Math.min(no.nivel + 1, 6);
      leitura.push(`<h${nivel} class="subtitulo">${inline(no.texto)}</h${nivel}>`);
    } else if (no.tipo === 'lista') {
      leitura.push(lista(no));
    } else if (no.tipo === 'comentario') {
      noPar = true; // `<!-- bloco: par -->`: as duas imagens seguintes são uma peça só
    } else if (no.tipo === 'imagem' && noPar) {
      par.push(no);
      if (par.length === 2) noPar = false;
    } else if (no.tipo === 'imagem') {
      provas.push(figura(ctx, c, no, cap));
    } else if (no.tipo === 'tabela') {
      soDesktop = false;
      largos.push(tabela(no, null));
    } else if (no.tipo === 'so-desktop') {
      // Seção que só aparece no desktop: em tela estreita sai inteira (decisão 132).
      const [titulo, ...resto] = no.nos;
      const html = resto.map((n) => (n.tipo === 'tabela' ? tabela(n, titulo.texto)
        : n.tipo === 'paragrafo' ? `<p>${inline(n.texto)}</p>` : '')).join('\n');
      const temTabelaComTitulo = resto.some((n) => n.tipo === 'tabela' && n.cabecalho[0] === '');
      const cabecalho = temTabelaComTitulo ? '' : `<h3 class="subtitulo">${inline(titulo.texto)}</h3>`;
      largos.push(`<div class="so-largo-bloco">${cabecalho}${html}</div>`);
    }
  }

  // Capítulo com lacuna de mídia declarada no Figma (docs/spec/legendas.json) e sem mídia
  // no arquivo: a prova falta.
  if (!provas.length && !par.length && ctx.slotsDeMidia(c.arquivo).includes(indice + 1)) {
    provas.push(provaQueFalta(ctx, c, cap));
  }

  const tituloHtml = `<h2 class="capitulo__titulo" id="${id}-titulo">${inline(tituloDeCapitulo(cap.titulo))}</h2>`;
  const leituraHtml = `<div class="capitulo__leitura">
        ${leitura.join('\n        ')}
      </div>`;
  const provasHtml = provas.length ? `<div class="capitulo__provas">\n        ${provas.join('\n        ')}\n      </div>` : '';
  const largoHtml = largos.length ? `<div class="capitulo__largo${soDesktop ? ' so-largo' : ''}">\n        ${largos.join('\n        ')}\n      </div>` : '';
  const parHtml = par.length || noPar ? `<div class="capitulo__par">\n        ${parDeTelas(ctx, c, par)}\n      </div>` : '';
  // O texto vem antes da mídia no HTML, em todo case: a afirmação antes da prova, para quem
  // lê com leitor de tela também (decisão 207).
  const partes = [tituloHtml, leituraHtml, provasHtml, largoHtml, parHtml];
  return `<section class="capitulo" id="${id}" data-etapa="${indice}" aria-labelledby="${id}-titulo">
      ${partes.filter(Boolean).join('\n      ')}
    </section>`;
}

function trilha(c) {
  const itens = c.capitulos.map((cap, i) => `<li class="trilha__item" data-etapa="${i}">
          <a class="trilha__link" href="#${idDoCapitulo(c, i)}"><span class="trilha__marcador" aria-hidden="true"></span><span class="trilha__rotulo">${escapar(cap.rotulo)}</span></a>
        </li>`).join('\n        ');
  return `<nav class="trilha" aria-label="${t('rotuloTrilha')}">
      <ol class="trilha__lista">
        ${itens}
      </ol>
    </nav>`;
}

function faixa(c) {
  const total = c.capitulos.length;
  const primeira = c.capitulos[0]?.rotulo ?? '';
  const posicao = t('posicaoNaTrilha').replace('{n}', '1').replace('{total}', String(total));
  const linhas = c.capitulos.map((cap, i) => `<a class="caixa__linha" href="#${idDoCapitulo(c, i)}" data-etapa="${i}"><span class="caixa__sinal" aria-hidden="true"></span>${escapar(cap.rotulo)}</a>`).join('\n      ');
  return `<div class="faixa">
    <button class="faixa__botao" type="button" popovertarget="etapas" aria-expanded="false" data-total="${total}">
      <span class="faixa__etapa">${escapar(primeira)}</span>
      <span class="faixa__posicao" data-modelo="${escapar(t('posicaoNaTrilha'))}">${posicao}</span>
      <span class="faixa__trilho" aria-hidden="true"><span class="faixa__progresso"></span></span>
    </button>
    <div class="caixa caixa--etapas" id="etapas" popover>
      ${linhas}
    </div>
  </div>`;
}

// O bloco de provas fecha o case: tudo que pode ser conferido, cada link precedido da
// linha que diz o que a pessoa vai encontrar lá (decisão 179).
function provasDoCase(ctx, c) {
  const itens = c.provas.length
    ? c.provas.map((p) => {
      const link = p.url
        ? linkExterno(escapar(p.rotulo), p.url)
        : `<span class="link-externo sublinhado--inerte">${escapar(p.rotulo)}</span>${ctx.ausencias.marcar(`o endereço de "${p.rotulo}"`, `${c.arquivo}:${p.linha}`, { classe: 'falta falta--linha' })}`;
      return `<li class="provas__item"><p class="provas__descricao">${inline(p.descricao)}</p><p>${link}</p></li>`;
    }).join('\n        ')
    : `<li>${ctx.ausencias.marcar('o bloco de provas', c.arquivo, { classe: 'falta falta--linha' })}</li>`;
  return `<section class="provas" aria-labelledby="provas-titulo">
      <h2 class="provas__titulo" id="provas-titulo">${t('tudoAberto')}</h2>
      <ul class="provas__lista">
        ${itens}
      </ul>
    </section>`;
}

function extra(c) {
  if (!c.extra) return '';
  return `<details class="extra">
    <summary class="extra__aba"><h2 class="extra__titulo"><span>${t('leiaMais')}</span><svg class="extra__seta" viewBox="0 0 20 44" width="20" height="44" aria-hidden="true"><path d="M10 28L1.33974 19H18.6603L10 28Z"/></svg></h2></summary>
    <div class="extra__conteudo">
      ${c.extra.paragrafos.map((p) => `<p>${inline(p)}</p>`).join('\n      ')}
    </div>
  </details>`;
}

export function paginaCase(ctx, c, proximo) {
  const { ausencias } = ctx;
  const onde = c.arquivo;
  const cor = COR_DO_CASE[c.prefixo];
  // Um texto só: na tela estreita cada linha vira bloco, no desktop corre numa linha.
  const titulo = c.hero.titulo ? tituloComQuebra(c, c.hero.titulo) : ausencias.marcar('o título do case', onde);
  const abertura = c.hero.abertura
    ? aberturaComMarca(c.hero.abertura, (idioma() === 'en' ? MARCA_TEXTO_DO_CASE_EN : MARCA_TEXTO_DO_CASE)[c.prefixo])
    : ausencias.marcar('a frase de abertura', onde);

  const colunas = COLUNAS_SEPARADAS.includes(c.prefixo) ? ' case--colunas-separadas' : '';
  const corpo = `<main id="conteudo" class="case cor-${cor}${colunas}" tabindex="-1">
  ${faixa(c)}
  <header class="case__hero grade">
    <h1 class="case__titulo">${titulo}</h1>
    <p class="case__abertura">${abertura}</p>
    <dl class="tira">
      ${tira(ctx, c)}
    </dl>
  </header>
  <div class="case__leitura grade">
    ${trilha(c)}
    <div class="case__capitulos">
    ${c.capitulos.map((cap, i) => capitulo(ctx, c, cap, i)).join('\n    ')}
    </div>${COLUNAS_SEPARADAS.includes(c.prefixo) ? `\n    <script>${ctx.colunasJs}</script>` : ''}
  </div>
  <div class="case__fim grade">
    ${provasDoCase(ctx, c)}
  </div>
  ${extra(c)}
  <div class="case__fim grade">
    <section class="proximo" aria-labelledby="proximo-rotulo">
      <p class="proximo__rotulo" id="proximo-rotulo">${t('proximoCase')}</p>
      ${card(ctx, proximo, `${c.arquivo}, próximo case`, 'h2')}
    </section>
    <section class="convite" aria-labelledby="convite-titulo">
      <h2 class="convite__titulo" id="convite-titulo">${t('vamosConversar')}</h2>
      <button class="botao" type="button" popovertarget="contato" aria-expanded="false">${t('falarComigo')}</button>
    </section>
  </div>
</main>`;
  return documento(ctx, { titulo: c.hero.titulo ?? c.slug, atual: 'trabalhos', corpo, classeDoCorpo: 'pagina-case', pagina: c });
}

// ── Quem sou eu ────────────────────────────────────────────────────────────────

export function paginaQuemSouEu(ctx, qse) {
  const { ausencias, base } = ctx;
  const onde = qse.arquivo;
  let foto;
  const versoes = qse.foto ? resolverMidia(ctx.raiz, qse.foto.caminho) : [];
  if (!qse.foto) foto = ausencias.marcar('a foto', onde, { classe: 'falta falta--midia' });
  else if (!qse.foto.alt) foto = ausencias.marcar('o texto alternativo da foto', onde, { classe: 'falta falta--midia' });
  else if (!versoes.length) foto = ausencias.marcar('a foto', onde, { classe: 'falta falta--midia' });
  else foto = imagemTemada(ctx, versoes, qse.foto.alt, { classe: 'quem__foto-img', carregamento: 'eager' });

  const curriculo = ctx.curriculo && ctx.curriculoEmPortugues
    ? `<a class="sublinhado" href="${base}${ctx.curriculo}" hreflang="pt-BR">${t('baixarCurriculoEmPortugues')}</a>`
    : ctx.curriculo
    ? `<a class="sublinhado" href="${base}${ctx.curriculo}">${t('baixarCurriculo')}</a>`
    : `<span class="sublinhado sublinhado--inerte">${t('baixarCurriculo')}</span>${ausencias.marcar('o arquivo do currículo', onde, { classe: 'falta falta--linha' })}`;
  const linkedin = ctx.linkedin
    ? `<a class="sublinhado" href="${escapar(ctx.linkedin)}" ${ATRIBUTOS_EXTERNOS}>${t('verLinkedin')}</a>`
    : `<span class="sublinhado sublinhado--inerte">${t('verLinkedin')}</span>${ausencias.marcar('o endereço do LinkedIn', onde, { classe: 'falta falta--linha' })}`;

  const corpo = `<main id="conteudo" class="quem" tabindex="-1">
  <div class="quem__topo grade">
    <div class="quem__apresentacao">
      ${qse.apresentacao.length ? qse.apresentacao.map((p) => `<p>${inline(p)}</p>`).join('\n      ') : ausencias.marcar('a apresentação', onde)}
    </div>
    <div class="quem__foto${versoes.length ? '' : ' quem__foto--vazia'}">${foto}</div>
  </div>
  <section class="valores grade" aria-labelledby="valores-titulo">
    <h2 class="valores__titulo" id="valores-titulo">${qse.tituloValores ? escapar(qse.tituloValores) : ausencias.marcar('o título dos valores', onde)}</h2>
    <div class="valores__lista">
      ${qse.valores.map((v) => `<div class="valor"><h3 class="valor__titulo">${escapar(v.titulo)}</h3>${v.texto.map((p) => `<p class="valor__texto">${inline(p)}</p>`).join('')}</div>`).join('\n      ')}
    </div>
  </section>
  <div class="grade"><hr class="divisoria"></div>
  <section class="mais grade" aria-labelledby="mais-titulo">
    <h2 class="mais__titulo" id="mais-titulo">${t('maisSobreMim')}</h2>
    <p class="mais__item">${curriculo}</p>
    <p class="mais__item">${linkedin}</p>
    <p class="mais__item mais__direto">${t('faleDireto')} <a class="sublinhado" href="mailto:${t('email')}">${t('email')}</a></p>
  </section>
</main>`;
  return documento(ctx, { titulo: t('quemSouEu'), atual: 'quem-sou-eu', corpo, classeDoCorpo: 'pagina-quem', pagina: 'quem-sou-eu' });
}

// ── Erro ───────────────────────────────────────────────────────────────────────

// O GitHub Pages serve uma só página de erro para o site inteiro: com o inglês, ela traz os
// dois idiomas, sem script, e as saídas de cada um levam às páginas dele (decisão 243). O
// português abre, com o título da página; o inglês vem embaixo, marcado com a língua dele.
function erroNoIdioma(ctx, i, nivel) {
  const lang = i === idioma() ? '' : ` lang="${LANG[i]}"`;
  return comIdioma(i, () => `<div class="erro__explicacao"${lang}>
    <h${nivel} class="erro__titulo">${t('erroTitulo')}</h${nivel}>
    <p class="erro__corpo">${t('erroCorpo')}</p>
  </div>
  <ul class="erro__saidas"${lang}>
    <li><a class="erro__saida" href="${ctx.base}${enderecoDe('trabalhos')}">${t('erroVerTrabalhos')}</a></li>
    <li><a class="erro__saida" href="${ctx.base}${enderecoDe('home')}">${t('erroVoltarHome')}</a></li>
    <li><button class="erro__saida" type="button" popovertarget="contato" aria-expanded="false">${t('falarComigo')}</button></li>
  </ul>`);
}

export function paginaErro(ctx) {
  const corpo = `<main id="conteudo" class="erro grade" tabindex="-1">
  ${ctx.idiomas.map((i, k) => erroNoIdioma(ctx, i, k === 0 ? 1 : 2)).join('\n  ')}
</main>`;
  return documento(ctx, { titulo: t('erroTitulo'), atual: null, corpo, classeDoCorpo: 'pagina-erro', pagina: 'erro' });
}

export { TEXTOS };

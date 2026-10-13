// Contrato conteudo/arquivo-de-texto-vira-pagina.md. Cada teste tem o nome do cenário.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, rmSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { raizTemporaria, construirEm, texto, RAIZ } from './ajuda.mjs';
import { caminhoDoCase } from '../construcao/interface.mjs';
import { lerCase } from '../construcao/conteudo.mjs';
import { escapar } from '../construcao/markdown.mjs';

const FINANCAS = 'case-study-financas-pf-pj.md';
const REEMBOLSO = 'case-study-reembolso-sulamerica.md';
// O endereço de cada case, lido de onde a construção lê (decisão 221): o teste não o fixa.
const enderecoDoCase = (arquivo) => caminhoDoCase(lerCase(RAIZ, arquivo));
const PAGINA_FINANCAS = enderecoDoCase(FINANCAS);
const PAGINA_REEMBOLSO = enderecoDoCase(REEMBOLSO);
const escaparRegex = (texto) => texto.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');

test('Construir a página de um case', () => {
  const { pagina } = construirEm(raizTemporaria());
  const indice = pagina('trabalhos/index.html');
  assert.match(texto(indice), /A planilha que virou produto/, 'o bloco do card vira o card no índice');

  const caso = pagina(`${PAGINA_FINANCAS}index.html`);
  const rotulos = [...caso.matchAll(/class="trilha__rotulo">([^<]+)</g)].map((m) => m[1]);
  assert.deepEqual(rotulos,
    ['Introdução', 'Descoberta', 'Desenho e documentação', 'Design system', 'Desenvolvimento', 'Resultados'],
    'a trilha lista os rótulos na ordem em que aparecem no arquivo');
  assert.equal((caso.match(/<section class="capitulo"/g) ?? []).length, 6, 'cada título com marcador vira capítulo');
});

test('Título sem marcador de trilha', () => {
  const { pagina } = construirEm(raizTemporaria());
  const caso = pagina(`${PAGINA_REEMBOLSO}index.html`);
  assert.match(caso, /<h4 class="subtitulo">O achado que mudou meu diagnóstico<\/h4>/,
    'aparece como subseção dentro do capítulo corrente');
  assert.doesNotMatch(caso, /trilha__rotulo">O achado/, 'e não aparece na trilha');
});

test('Seção marcada como privada', () => {
  const { pagina } = construirEm(raizTemporaria());
  const caso = pagina(`${PAGINA_REEMBOLSO}index.html`);
  assert.doesNotMatch(caso, /Notas de trabalho/, 'nada daquela seção aparece no site');
  assert.doesNotMatch(caso, /Linha editorial/);
});

test('Seção de material de origem', () => {
  const raiz = raizTemporaria({
    [FINANCAS]: (t) => t.replace('<!-- bloco: provas -->',
      '<!-- privado -->\n## Material das legendas\n\nTexto que só alimenta as legendas.\n\n<!-- bloco: provas -->'),
  });
  const { pagina } = construirEm(raiz);
  assert.doesNotMatch(pagina(`${PAGINA_FINANCAS}index.html`), /Material das legendas|só alimenta/);
});

test('Imagem de prova com legenda', () => {
  const { pagina } = construirEm(raizTemporaria());
  const caso = pagina(`${PAGINA_REEMBOLSO}index.html`);
  assert.match(caso, /alt="Quatro anotações sobre capturas do aplicativo/, 'o texto alternativo é preservado');
  assert.match(caso, /<figcaption class="prova__legenda">Quatro das dezoito etapas do fluxo atual/, 'a imagem aparece com sua legenda');
  assert.match(caso, /reembolso-2-diagnostico-claro\.png/, 'a versão clara é servida');
  assert.match(caso, /reembolso-2-diagnostico-escuro\.png/, 'a versão escura é servida');
});

test('Imagem de prova sem legenda', () => {
  const raiz = raizTemporaria({
    [REEMBOLSO]: (t) => t.replace(/\nLegenda: Quatro das dezoito etapas[^\n]*/, ''),
  });
  const { pagina } = construirEm(raiz);
  const caso = pagina(`${PAGINA_REEMBOLSO}index.html`);
  assert.doesNotMatch(caso, /reembolso-2-diagnostico-claro\.png/, 'ela não é publicada');
  assert.match(caso, /FALTA · a legenda de publico\/midias\/reembolso-2-diagnostico\.png/);
});

test('A foto da página', () => {
  const { pagina } = construirEm(raizTemporaria());
  const quem = pagina('quem-sou-eu/index.html');
  assert.match(quem, /<div class="quem__foto"><img class="quem__foto-img" src="\/publico\/larissa\.jpg" alt="Larissa Quadros"/,
    'é tratada como foto da página, e o texto alternativo é preservado');
  assert.doesNotMatch(quem, /class="prova"/, 'não como imagem de texto corrido');
});

test('A foto é trocada', () => {
  const raiz = raizTemporaria({ 'quem-sou-eu.md': (t) => t.replace('publico/larissa.jpg', 'publico/outra.jpg') });
  cpSync(`${raiz}/publico/larissa.jpg`, `${raiz}/publico/outra.jpg`);
  assert.match(construirEm(raiz).pagina('quem-sou-eu/index.html'), /src="\/publico\/outra\.jpg"/,
    'a página mostra a nova foto, sem nenhum código alterado');
});

test('A foto da página não exige legenda', () => {
  const raiz = raizTemporaria();
  const { pagina } = construirEm(raiz);
  const quem = pagina('quem-sou-eu/index.html');
  assert.match(quem, /<img class="quem__foto-img" src="\/publico\/larissa\.jpg" alt="Larissa Quadros"/,
    'ela aparece sem exigir legenda, e o texto alternativo continua');
  assert.doesNotMatch(quem, /FALTA · a foto/);
});

test('Uma peça esperada não está no arquivo', () => {
  const raiz = raizTemporaria({
    'quem-sou-eu.md': (t) => t.replace('**Cargo:** UX Designer\n', ''),
  });
  const local = construirEm(raiz, 'local');
  assert.equal(local.ok, true);
  assert.match(local.pagina('index.html'), /FALTA · o cargo/, 'localmente a falta fica visível, nomeando a peça');

  const publicacao = construirEm(raiz, 'publicar');
  assert.equal(publicacao.ok, false, 'no caminho de publicação a construção recusa');

  // O caminho de publicação é a automação, e ela constrói em modo de publicação (decisões
  // 023 e 240). Com o conteúdo de hoje, sem faltas, a publicação passa.
  const automacao = readFileSync(join(RAIZ, '.github/workflows/publicar.yml'), 'utf8');
  const construcoes = [...automacao.matchAll(/node construcao\/construir\.mjs([^\n]*)/g)].map((m) => m[1].replace(/\s+#.*$/, '')); // o que vem depois de " #" é comentário do YAML, não comando
  assert.ok(construcoes.length, 'a automação constrói o site');
  for (const argumentos of construcoes) assert.match(argumentos, /(^|\s)--publicar(\s|$)/, `a automação publica em modo de publicação: ${argumentos.trim()}`);
  assert.equal(construirEm(raizTemporaria(), 'publicar').ok, true, 'com o conteúdo de hoje, a publicação passa');
});

test('Marcador fora do vocabulário recusa a construção', () => {
  const raiz = raizTemporaria({
    [FINANCAS]: (t) => t.replace('<!-- bloco: extra -->', '<!-- privada -->\n<!-- bloco: extra -->'),
  });
  assert.throws(() => construirEm(raiz), /marcador fora do vocabulário: <!-- privada -->/);
});

test('Prova com endereço vazio é prova que falta', () => {
  // O endereço é esvaziado numa cópia: o teste não depende de qual repositório ainda falta.
  const { pagina } = construirEm(raizTemporaria({
    'case-study-reembolso-sulamerica.md': (t) => t.replace(/\[Ver o repositório\]\([^)]*\)/, '[Ver o repositório]()'),
  }));
  const caso = pagina(`${PAGINA_REEMBOLSO}index.html`);
  assert.match(caso, /FALTA · o endereço de &quot;Ver o repositório&quot;/);
  assert.match(caso, /href="https:\/\/www\.figma\.com\/board\/lCpgyPMBg7BXj0DxgiOUh1"/, 'a prova com endereço vira link');
  assert.match(texto(caso), /Ver o board no FigJam abre em nova aba/, 'o rótulo avisa que abre em nova aba');
});

test('Mídia de prova com uma versão de tema só', () => {
  const raiz = raizTemporaria();
  rmSync(`${raiz}/publico/midias/reembolso-4-telas-de-erro-claro.png`, { force: true });
  const local = construirEm(raiz);
  assert.match(local.pagina(`${PAGINA_REEMBOLSO}index.html`),
    /FALTA · a versão clara de publico\/midias\/reembolso-4-telas-de-erro\.png/, 'a versão que falta fica visível');
  assert.equal(construirEm(raiz, 'publicar').ok, false, 'e a publicação recusa');
});

test('Par de telas sem a segunda imagem', () => {
  const raiz = raizTemporaria({
    'case-study-financas-pf-pj.md': (t) => t.replace(/(<!-- bloco: par -->\n!\[[^\n]*\n)!\[[^\n]*\n/, '$1'),
  });
  assert.match(construirEm(raiz).pagina(`${PAGINA_FINANCAS}index.html`), /FALTA · a (segunda imagem|legenda) do par de telas/);
});

test('O endereço de um case não depende do nome do arquivo', () => {
  const site = construirEm(raizTemporaria());
  // Decisão 221, regra de conteudo/arquivo-de-texto-vira-pagina.md. Os endereços vêm do
  // contrato (o teste de copy confere); o teste não os fixa.
  const cases = [FINANCAS, REEMBOLSO].map((a) => lerCase(RAIZ, a));
  for (const c of cases) {
    assert.ok(existsSync(join(site.saida, caminhoDoCase(c), 'index.html')), `${c.arquivo}: o endereço declarado é gerado`);
    assert.notEqual(caminhoDoCase(c), `trabalhos/${c.slug}/`, `${c.arquivo}: o endereço não sai do nome do arquivo`);
    assert.ok(!existsSync(join(site.saida, 'trabalhos', c.slug)), `${c.arquivo}: o endereço antigo, do nome do arquivo, não é gerado`);
  }
  // Em trabalhos/ só existem as pastas declaradas.
  const declaradas = cases.map((c) => caminhoDoCase(c).split('/')[1]).sort();
  const geradas = readdirSync(join(site.saida, 'trabalhos'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
  assert.deepEqual(geradas, declaradas);
  // Cada endereço leva ao seu case: qual é de qual vem do cenário do contrato, e o case é
  // reconhecido pelo título do arquivo dele, sem fixar texto nenhum.
  const contrato = readFileSync(join(RAIZ, 'docs/comportamento/conteudo/arquivo-de-texto-vira-pagina.md'), 'utf8');
  for (const [nome, arquivo] of [['Finanças', FINANCAS], ['Reembolso', REEMBOLSO]]) {
    const endereco = contrato.match(new RegExp(`o case de ${nome} abre em "([^"]+)"`))?.[1];
    assert.ok(endereco, `o cenário diz onde abre o case de ${nome}`);
    const titulo = lerCase(RAIZ, arquivo).hero.titulo;
    assert.match(site.pagina(`${endereco.replace(/^\//, '')}index.html`), new RegExp(`<title>${escaparRegex(escapar(titulo))} · `),
      `${endereco} é o case de ${nome}`);
  }
  // No ar, o endereço declarado só vale se a publicação construir com o prefixo de onde ele
  // começa: a parte antes de "trabalhos/", a raiz desde a decisão 222. O teste tira o prefixo
  // do contrato e exige o mesmo na automação de publicação.
  const prefixo = contrato.match(/o case de Finanças abre em "([^"]*?)trabalhos\//)?.[1];
  assert.ok(prefixo, 'o cenário diz o endereço do case a partir da raiz do site');
  const automacao = readFileSync(join(RAIZ, '.github/workflows/publicar.yml'), 'utf8');
  const construcoes = [...automacao.matchAll(/node construcao\/construir\.mjs([^\n]*)/g)].map((m) => m[1].replace(/\s+#.*$/, '')); // o que vem depois de " #" é comentário do YAML, não comando
  assert.ok(construcoes.length, 'a automação constrói o site');
  for (const argumentos of construcoes) {
    assert.equal(argumentos.match(/--base=(\S+)/)?.[1], prefixo, `a publicação constrói com o prefixo ${prefixo}: ${argumentos.trim()}`);
  }
  // Link interno quebrado é o teste "Todo endereço local de toda página existe no site", em
  // paginas.test.mjs.
});

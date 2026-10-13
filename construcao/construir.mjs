#!/usr/bin/env node
// A construção: lê os três arquivos de conteúdo e os tokens, escreve o site em site/.
//
//   node construcao/construir.mjs                 modo local: peça que falta fica visível
//   node construcao/construir.mjs --publicar      modo de publicação: peça que falta recusa
//   --base=/                                      prefixo dos endereços (o site abre na raiz, decisão 222)
//
// O modo aparece na primeira linha da saída, sempre (pesquisa da spec 001, item 4).

import { mkdirSync, writeFileSync, readFileSync, rmSync, cpSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { lerTokens, gerarCssDeTokens, comQuebra, QUEBRA_DO_CASE } from './tokens.mjs';
import { lerQuemSouEu, lerCase, ErroDeConteudo } from './conteudo.mjs';
import { criarAusencias } from './ausencia.mjs';
import { ORDEM_DOS_CASES, t, caminhoDoCase } from './interface.mjs';
import { paginaHome, paginaTrabalhos, paginaCase, paginaQuemSouEu, paginaErro } from './paginas.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');

export function construir({ modo = 'local', base = '/', raiz = RAIZ, saida = join(RAIZ, 'site') } = {}) {
  const ausencias = criarAusencias(modo);
  const legendas = JSON.parse(readFileSync(join(raiz, 'docs/spec/legendas.json'), 'utf8'));

  const qse = lerQuemSouEu(raiz);
  const cases = ORDEM_DOS_CASES.map((arquivo) => lerCase(raiz, arquivo));

  const ctx = {
    raiz,
    base,
    ausencias,
    nome: qse.home.nome ?? '',
    nomeCurto: qse.home.nomeCurto ?? ausencias.marcar('o nome curto da barra', 'quem-sou-eu.md'),
    // A cor da barra do navegador no celular é o fundo da página em cada tema (decisão 235).
    fundoDaPagina: lerTokens(join(raiz, 'docs/spec/tokens.json')).colecoes.Cor.variaveis['bg/page'],
    temaJs: readFileSync(join(raiz, 'modelo/tema.js'), 'utf8').replace(/^\s*\/\/.*$/gm, '').replace(/\s*\n\s*/g, ''),
    // Roda na hora, logo depois dos capítulos de um case com colunas separadas (decisão 208).
    colunasJs: readFileSync(join(raiz, 'modelo/colunas.js'), 'utf8').replace(/^\s*\/\/.*\n/gm, ''),
    // O PDF do currículo ainda não existe. O endereço do LinkedIn é copy de interface do
    // contrato moldura/botao-contato.md, ao lado do e-mail.
    curriculo: existsSync(join(raiz, 'publico/curriculo.pdf')) ? 'publico/curriculo.pdf' : null,
    linkedin: t('linkedinEndereco'),
    legendaNaoEscrita: legendas.marcadorDeNaoEscrita,
    slotsDeMidia: (arquivo) => (legendas.cases[arquivo]?.slots ?? []).map((s) => s.capitulo),
  };

  const paginas = {
    'index.html': paginaHome(ctx, qse),
    'trabalhos/index.html': paginaTrabalhos(ctx, cases),
    'quem-sou-eu/index.html': paginaQuemSouEu(ctx, qse),
    '404.html': paginaErro(ctx),
  };
  // Com dois cases, o próximo de cada um é o outro. Sem caso especial para o último.
  cases.forEach((c, i) => {
    paginas[`${caminhoDoCase(c)}index.html`] = paginaCase(ctx, c, cases[(i + 1) % cases.length]);
  });

  if (modo === 'publicar' && ausencias.faltas.length) {
    return { ok: false, ausencias, paginas: {} };
  }

  rmSync(saida, { recursive: true, force: true });
  for (const [caminho, html] of Object.entries(paginas)) {
    mkdirSync(dirname(join(saida, caminho)), { recursive: true });
    writeFileSync(join(saida, caminho), html);
  }
  const css = gerarCssDeTokens(lerTokens(join(raiz, 'docs/spec/tokens.json')))
    + '\n' + readFileSync(join(raiz, 'modelo/estilo.css'), 'utf8').replaceAll('{{base}}', base);
  writeFileSync(join(saida, 'estilo.css'), css);
  writeFileSync(join(saida, 'estilo-case.css'), comQuebra(css, QUEBRA_DO_CASE));
  writeFileSync(join(saida, 'moldura.js'), readFileSync(join(raiz, 'modelo/moldura.js'), 'utf8'));
  cpSync(join(raiz, 'publico'), join(saida, 'publico'), {
    recursive: true,
    filter: (f) => !f.endsWith('.DS_Store'),
  });
  // O manifesto nomeia o site e os ícones grandes para quem o instala ou o fixa na tela de
  // início (decisão 188). O nome vem de quem-sou-eu.md e a cor do fundo claro da página,
  // de tokens.json: nada aqui é escrito duas vezes. Caminhos relativos ao próprio
  // manifesto, para valerem com qualquer base.
  const fundoClaro = lerTokens(join(raiz, 'docs/spec/tokens.json')).colecoes.Cor.variaveis['bg/page'].Claro;
  writeFileSync(join(saida, 'manifest.webmanifest'), JSON.stringify({
    name: ctx.nome,
    short_name: qse.home.nomeCurto,
    lang: 'pt-BR',
    start_url: './',
    background_color: fundoClaro,
    theme_color: fundoClaro,
    icons: [
      { src: 'publico/icone/icone-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'publico/icone/icone-512.png', sizes: '512x512', type: 'image/png' },
      { src: 'publico/icone/icone.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }, null, 2));
  // O Pages não precisa passar o site pelo Jekyll: ele já está pronto.
  writeFileSync(join(saida, '.nojekyll'), '');
  return { ok: true, ausencias, paginas };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const modo = process.argv.includes('--publicar') ? 'publicar' : 'local';
  const base = process.argv.find((a) => a.startsWith('--base='))?.slice('--base='.length) ?? '/';
  console.log(modo === 'publicar'
    ? 'MODO DE PUBLICAÇÃO · peça que falta recusa a construção'
    : 'MODO LOCAL · peça que falta aparece na página, nomeada');
  try {
    const { ok, ausencias, paginas } = construir({ modo, base });
    const n = ausencias.unicas().length;
    if (!ok) {
      console.error(`\nRecusado: ${n} peça(s) faltando. Nada foi escrito.\n${ausencias.relatorio()}`);
      process.exit(1);
    }
    console.log(`${Object.keys(paginas).length} páginas em site/ · base ${base}`);
    if (n) console.log(`\n${n} peça(s) faltando, visíveis na página:\n${ausencias.relatorio()}`);
  } catch (e) {
    if (e instanceof ErroDeConteudo) {
      console.error(`\nRecusado: ${e.message}`);
      process.exit(1);
    }
    throw e;
  }
}

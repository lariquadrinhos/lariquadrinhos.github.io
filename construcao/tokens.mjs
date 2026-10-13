// Gera as custom properties a partir de docs/spec/tokens.json.
//
// O nome é preservado: `/` vira `-` e nada mais muda (bg/page → --bg-page).
// O modo nunca entra no nome: Cor vira um bloco por tema, Tipografia e Grade um
// bloco por largura. É isso que permite escrever var(--bg-page) uma vez só.

import { readFileSync } from 'node:fs';

// A largura a partir da qual vale o modo Desktop. As telas foram desenhadas em 1440 e
// 375; o ponto de troca entre as duas não foi decidido. Ver o PR e perguntas-em-aberto.
export const QUEBRA_DESKTOP = 1024;

// Nas páginas de case, o modo Desktop só entra em 1280 (decisão 225): abaixo disso, o case
// usa o modo de tela estreita, com a coluna de leitura limitada. A mesma fronteira da Home e
// de Trabalhos (decisão 212).
export const QUEBRA_DO_CASE = 1280;

// A barra e as sobreposições trocam de modo em 1280 em todas as páginas (decisão 230): na
// mesma janela, a barra é a mesma de uma página para outra. É a fronteira do case.
export const QUEBRA_DA_BARRA = QUEBRA_DO_CASE;

// O CSS do case é o mesmo CSS, com o ponto de troca movido: todo `min-width` do modo Desktop
// e todo `max-width` do modo estreito passam para a quebra do case. Uma fonte só.
export function comQuebra(css, quebra) {
  return css
    .replaceAll(`(min-width: ${QUEBRA_DESKTOP}px)`, `(min-width: ${quebra}px)`)
    .replaceAll(`(max-width: ${QUEBRA_DESKTOP - 0.02}px)`, `(max-width: ${quebra - 0.02}px)`);
}

const nomeCss = (nome) => `--${nome.replaceAll('/', '-')}`;

function valorCss(colecao, nome, valor) {
  if (typeof valor === 'string' && valor.startsWith('→')) {
    return `var(${nomeCss(valor.replace('→', '').trim())})`;
  }
  if (nome === 'family') return `"${valor}"`;
  if (typeof valor === 'number') {
    // `colunas` é contagem, não medida.
    return colecao === 'Grade' && nome === 'colunas' ? String(valor) : `${valor}px`;
  }
  return valor;
}

function bloco(colecao, variaveis, modo) {
  return Object.entries(variaveis)
    .map(([nome, modos]) => `  ${nomeCss(nome)}: ${valorCss(colecao, nome, modos[modo])};`)
    .join('\n');
}

export function lerTokens(caminho) {
  return JSON.parse(readFileSync(caminho, 'utf8'));
}

export function gerarCssDeTokens(tokens) {
  const { Cor, Tipografia, Grade } = tokens.colecoes;
  const espaco = tokens.colecoes['Espaço e forma'];

  const claro = bloco('Cor', Cor.variaveis, 'Claro');
  const escuro = bloco('Cor', Cor.variaveis, 'Escuro');

  return `/* GERADO de docs/spec/tokens.json (exportado em ${tokens.exportado}). Não editar à mão. */

:root {
${bloco('Espaço e forma', espaco.variaveis, 'Padrão')}
${bloco('Tipografia', Tipografia.variaveis, 'Tela pequena')}
${bloco('Grade', Grade.variaveis, 'Tela pequena')}
}

@media (min-width: ${QUEBRA_DESKTOP}px) {
  :root {
${bloco('Tipografia', Tipografia.variaveis, 'Desktop').replaceAll('\n  ', '\n    ').replace(/^  /, '    ')}
${bloco('Grade', Grade.variaveis, 'Desktop').replaceAll('\n  ', '\n    ').replace(/^  /, '    ')}
  }
}

/* A barra e as sobreposições ficam no modo de tela estreita até a quebra da barra, em toda
   página (decisão 230), mesmo onde o conteúdo já está no modo Desktop. */
@media (max-width: ${QUEBRA_DA_BARRA - 0.02}px) {
  .barra, .caixa {
${bloco('Tipografia', Tipografia.variaveis, 'Tela pequena').replaceAll('\n  ', '\n    ').replace(/^  /, '    ')}
${bloco('Grade', Grade.variaveis, 'Tela pequena').replaceAll('\n  ', '\n    ').replace(/^  /, '    ')}
  }
}

/* A partir da quebra do Desktop, a barra estreita tem a margem do Desktop, para se alinhar ao
   conteúdo (decisão 232); as sobreposições continuam de margem a margem. Escrito em intervalo,
   e não em min-width, para o CSS do case (comQuebra) não mover esta quebra: a barra é a mesma
   em toda página. */
@media (${QUEBRA_DESKTOP}px <= width < ${QUEBRA_DA_BARRA}px) {
  .barra {
    ${nomeCss('margem')}: ${valorCss('Grade', 'margem', Grade.variaveis.margem.Desktop)};
  }
}

/* Tema. Sem escolha salva, segue o sistema; com escolha, data-tema manda. */
:root,
:root[data-tema="claro"] {
  color-scheme: light;
${claro}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-tema="claro"]) {
    color-scheme: dark;
${escuro.replaceAll('\n  ', '\n    ').replace(/^  /, '    ')}
  }
}

:root[data-tema="escuro"] {
  color-scheme: dark;
${escuro}
}
`;
}

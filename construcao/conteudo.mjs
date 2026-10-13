// Dos três arquivos de texto ao modelo que as páginas consomem.
//
// A regra única (decisão 006): marcador é comentário HTML, título é conteúdo. Nenhuma
// seção é reconhecida pelo nome; só pelos marcadores e pela forma.

import { readFileSync } from 'node:fs';
import { lerBlocos, ehFraseInteiraEmNegrito, semNegrito } from './markdown.mjs';
import { lerMarcador, validarMarcadores } from './marcadores.mjs';

const RE_TIRA = /^\*\*([^*]+)\*\*\s*·\s*(.+)$/;
const RE_CAMPO_DA_HOME = /^\*\*([^*:]+):\*\*\s*(.+)$/;

export class ErroDeConteudo extends Error {}

function lerArquivo(raiz, arquivo) {
  const nos = lerBlocos(readFileSync(`${raiz}/${arquivo}`, 'utf8'));
  const erros = validarMarcadores(nos, arquivo);
  if (erros.length) throw new ErroDeConteudo(erros.join('\n'));
  return removerPrivado(nos);
}

// `<!-- privado -->`: a seção seguinte, até um título de nível igual ou superior, não vai
// para o site. `<!-- só no desktop -->` usa o mesmo alcance, mas só marca.
function removerPrivado(nos) {
  const saida = [];
  for (let i = 0; i < nos.length; i++) {
    const no = nos[i];
    const m = no.tipo === 'comentario' ? lerMarcador(no.texto) : null;
    if (m?.tipo === 'privado' || m?.tipo === 'só no desktop') {
      const titulo = nos[i + 1];
      if (titulo?.tipo !== 'titulo') {
        throw new ErroDeConteudo(`linha ${no.linha}: <!-- ${m.tipo} --> precisa vir logo antes de um título`);
      }
      let fim = i + 2;
      while (fim < nos.length && !(nos[fim].tipo === 'titulo' && nos[fim].nivel <= titulo.nivel)
        && !(nos[fim].tipo === 'comentario' && lerMarcador(nos[fim].texto).tipo === 'bloco')) fim++;
      const secao = nos.slice(i + 1, fim);
      if (m.tipo === 'só no desktop') saida.push({ tipo: 'so-desktop', nos: secao, linha: no.linha });
      i = fim - 1;
      continue;
    }
    saida.push(no);
  }
  return saida;
}

// Corta a lista de nós em blocos, um por `<!-- bloco: nome -->`, na ordem do arquivo.
function emBlocos(nos) {
  const blocos = [];
  let atual = null;
  for (const no of nos) {
    const m = no.tipo === 'comentario' ? lerMarcador(no.texto) : null;
    // `par` marca duas imagens dentro de um capítulo; não abre bloco novo (decisão 205).
    if (m?.tipo === 'bloco' && m.nome !== 'par') {
      atual = { nome: m.nome, nos: [], linha: no.linha };
      blocos.push(atual);
    } else if (atual) {
      atual.nos.push(no);
    }
  }
  return blocos;
}

const conteudoSemReguas = (nos) => nos.filter((n) => n.tipo !== 'regua');

// ── quem-sou-eu.md: a home e a página "Quem sou eu" ─────────────────────────────

export function lerQuemSouEu(raiz, arquivo = 'quem-sou-eu.md') {
  const blocos = emBlocos(lerArquivo(raiz, arquivo));
  const bloco = (nome) => blocos.find((b) => b.nome === nome);

  const campos = {};
  for (const p of conteudoSemReguas(bloco('home')?.nos ?? [])) {
    if (p.tipo !== 'paragrafo') continue;
    for (const l of p.linhas) {
      const m = l.match(RE_CAMPO_DA_HOME);
      if (m) campos[m[1].trim()] = m[2].trim();
    }
  }

  const hero = conteudoSemReguas(bloco('hero')?.nos ?? []);
  const frase = hero.find((n) => n.tipo === 'titulo')?.texto ?? null;
  const paragrafo = hero.find((n) => n.tipo === 'paragrafo')?.texto ?? null;

  const foto = conteudoSemReguas(bloco('foto')?.nos ?? []).find((n) => n.tipo === 'imagem') ?? null;

  // A apresentação vai do marcador até o primeiro título; depois vêm os valores.
  const resto = conteudoSemReguas(bloco('apresentacao')?.nos ?? []);
  const apresentacao = [];
  let i = 0;
  for (; i < resto.length && resto[i].tipo === 'paragrafo'; i++) apresentacao.push(resto[i].texto);

  let tituloValores = null;
  const valores = [];
  for (; i < resto.length; i++) {
    const no = resto[i];
    if (no.tipo === 'titulo' && !tituloValores) tituloValores = no.texto;
    else if (no.tipo === 'titulo') valores.push({ titulo: no.texto, texto: [] });
    else if (no.tipo === 'paragrafo' && valores.length) valores[valores.length - 1].texto.push(no.texto);
  }

  return {
    arquivo,
    home: {
      nome: campos['Nome'] ?? null,
      nomeCurto: campos['Nome curto (barra)'] ?? null,
      cargo: campos['Cargo'] ?? null,
      frase,
      paragrafo,
    },
    foto,
    apresentacao,
    tituloValores,
    valores,
  };
}

// ── case-study-*.md ────────────────────────────────────────────────────────────

export function lerCase(raiz, arquivo) {
  const blocos = emBlocos(lerArquivo(raiz, arquivo));
  const slug = arquivo.replace(/^case-study-/, '').replace(/\.md$/, '');
  const prefixo = slug.split('-')[0];

  const card = conteudoSemReguas(blocos.find((b) => b.nome === 'card')?.nos ?? []);
  const cardTitulo = card.find((n) => n.tipo === 'titulo')?.texto ?? null;
  const cardLinha = card.find((n) => n.tipo === 'paragrafo')?.texto ?? null;

  // O corpo do case é o bloco `case` seguido do `hero`, que mora dentro do capítulo 1
  // (decisão 176). Os dois juntos, na ordem do arquivo, formam a sequência de capítulos.
  const corpo = [];
  let heroInicio = -1;
  for (const b of blocos) {
    if (b.nome === 'case') corpo.push(...b.nos);
    if (b.nome === 'hero') { heroInicio = corpo.length; corpo.push(...b.nos); }
  }

  const hero = { titulo: null, abertura: null, tira: [] };
  if (heroInicio >= 0) {
    let j = heroInicio;
    const nos = corpo;
    const fim = () => j >= nos.length;
    while (!fim() && nos[j].tipo === 'regua') j++;
    if (!fim() && nos[j].tipo === 'titulo' && nos[j].nivel === 1) { hero.titulo = nos[j].texto; j++; }
    if (!fim() && nos[j].tipo === 'paragrafo' && ehFraseInteiraEmNegrito(nos[j].texto)) {
      hero.abertura = semNegrito(nos[j].texto); j++;
    }
    while (!fim() && nos[j].tipo === 'paragrafo' && RE_TIRA.test(nos[j].texto)) {
      const [, chave, valor] = nos[j].texto.match(RE_TIRA);
      hero.tira.push({ chave: chave.trim(), valor: valor.trim() });
      j++;
    }
    corpo.splice(heroInicio, j - heroInicio);
  }

  // Capítulo é o título seguido de `<!-- trilha: -->`. Título sem o marcador é subseção.
  const capitulos = [];
  for (let k = 0; k < corpo.length; k++) {
    const no = corpo[k];
    const seguinte = corpo[k + 1];
    const marcador = seguinte?.tipo === 'comentario' ? lerMarcador(seguinte.texto) : null;
    if (no.tipo === 'titulo' && marcador?.tipo === 'trilha') {
      capitulos.push({ titulo: no.texto, rotulo: marcador.rotulo, nos: [], linha: no.linha });
      k++;
      continue;
    }
    if (no.tipo === 'regua') continue;
    if (no.tipo === 'comentario' && lerMarcador(no.texto).nome !== 'par') continue;
    if (!capitulos.length) {
      throw new ErroDeConteudo(`${arquivo}:${no.linha}: conteúdo antes do primeiro capítulo`);
    }
    capitulos[capitulos.length - 1].nos.push(no);
  }

  const extraBloco = blocos.find((b) => b.nome === 'extra');
  let extra = null;
  if (extraBloco) {
    const nos = conteudoSemReguas(extraBloco.nos);
    extra = {
      titulo: nos.find((n) => n.tipo === 'titulo')?.texto ?? null,
      paragrafos: nos.filter((n) => n.tipo === 'paragrafo').map((n) => n.texto),
    };
  }

  // Bloco de provas (decisão 179): pares de uma linha de descrição e um link logo abaixo.
  // Link com endereço vazio, `[Ver o repositório]()`, é prova que ainda falta.
  const provasBloco = blocos.find((b) => b.nome === 'provas');
  const provas = [];
  for (const no of conteudoSemReguas(provasBloco?.nos ?? [])) {
    if (no.tipo !== 'paragrafo') continue;
    const [descricao, link] = no.linhas;
    const m = link?.match(/^\[([^\]]+)\]\(([^)]*)\)$/);
    if (!m) {
      throw new ErroDeConteudo(`${arquivo}:${no.linha}: prova sem o link na linha de baixo`);
    }
    provas.push({ descricao, rotulo: m[1], url: m[2].trim() || null, linha: no.linha });
  }

  return {
    arquivo, slug, prefixo, card: { titulo: cardTitulo, linha: cardLinha }, hero, capitulos, provas, extra,
  };
}

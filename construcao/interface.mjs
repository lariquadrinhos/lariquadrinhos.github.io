// Copy de interface (decisão 011): vive no contrato da tela que a exibe, não nos arquivos
// de conteúdo. Cada texto aqui diz de onde veio. Os que citam um contrato são conferidos
// por teste: se o contrato mudar e este arquivo não, o teste falha. Os que citam um nó do
// Figma ainda não estão escritos em contrato nenhum, e por isso aparecem no PR.

export const TEXTOS = {
  trabalhos: { texto: 'Trabalhos', en: 'Work', fonte: 'contrato:moldura/botao-contato.md' },
  quemSouEu: { texto: 'Quem sou eu', en: 'About', fonte: 'contrato:moldura/botao-contato.md' },
  contato: { texto: 'Contato', en: 'Contact', fonte: 'contrato:moldura/botao-contato.md' },
  tema: { texto: 'Tema', en: 'Theme', fonte: 'contrato:moldura/botao-contato.md' },
  menu: { texto: 'Menu', en: 'Menu', fonte: 'contrato:moldura/botao-contato.md' },
  temaClaroCurto: { texto: 'Claro', en: 'Light', fonte: 'contrato:tema/tema-claro-e-escuro.md' },
  temaEscuroCurto: { texto: 'Escuro', en: 'Dark', fonte: 'contrato:tema/tema-claro-e-escuro.md' },
  temaClaro: { texto: 'Tema claro', en: 'Light theme', fonte: 'contrato:tema/tema-claro-e-escuro.md' },
  temaEscuro: { texto: 'Tema escuro', en: 'Dark theme', fonte: 'contrato:tema/tema-claro-e-escuro.md' },
  email: { texto: 'llquadros95@gmail.com', neutro: true, fonte: 'contrato:moldura/botao-contato.md' },
  linkedin: { texto: 'LinkedIn', neutro: true, fonte: 'contrato:moldura/botao-contato.md' },
  linkedinEndereco: { texto: 'https://www.linkedin.com/in/lari-quadros/', neutro: true, fonte: 'contrato:moldura/botao-contato.md' },

  verTrabalhos: { texto: 'Ver os meus trabalhos', en: 'See my work', fonte: 'contrato:home/home.md' },
  tituloTrabalhos: {
    texto: 'Dois problemas que eu vi de perto, e o que fiz com eles.', en: 'Two problems I saw up close, and what I did about them.',
    fonte: 'contrato:trabalhos/indice-de-trabalhos.md',
  },

  vamosConversar: { texto: 'Vamos conversar?', en: 'Shall we talk?', fonte: 'contrato:case/pagina-de-case.md' },
  tudoAberto: { texto: 'Está tudo aberto.', en: 'It\'s all open.', fonte: 'contrato:case/pagina-de-case.md' },
  leiaMais: { texto: 'Leia mais sobre o produto', en: 'Read more about the product', fonte: 'contrato:case/pagina-de-case.md' },
  falarComigo: { texto: 'Falar comigo', en: 'Get in touch', fonte: 'contrato:erro/endereco-inexistente.md' },
  voltarAoTopo: { texto: 'Voltar ao topo', en: 'Back to top', fonte: 'contrato:moldura/voltar-ao-topo.md' },
  maisSobreMim: { texto: 'Mais sobre mim:', en: 'More about me:', fonte: 'contrato:quem-sou-eu/quem-sou-eu.md' },

  erroTitulo: { texto: 'Esse endereço não leva a lugar nenhum.', en: 'This address doesn\'t lead anywhere.', fonte: 'contrato:erro/endereco-inexistente.md' },
  erroCorpo: {
    texto: 'Pode ser um link meu que envelheceu, ou um erro de digitação. De qualquer forma, o que você procurava deve estar em um desses caminhos.', en: 'It may be an old link of mine, or a typo. Either way, what you were looking for should be down one of these paths.',
    fonte: 'contrato:erro/endereco-inexistente.md',
    // O contrato quebra o corpo em duas linhas de markdown; a conferência ignora a quebra.
  },
  erroVerTrabalhos: { texto: 'Ver os trabalhos', en: 'See the work', fonte: 'contrato:erro/endereco-inexistente.md' },
  erroVoltarHome: { texto: 'Voltar para a home', en: 'Back to the home page', fonte: 'contrato:erro/endereco-inexistente.md' },
  // O endereço de cada case é declarado, não derivado do nome do arquivo (decisão 221).
  enderecoFinancas: { texto: '/trabalhos/financas/', en: '/en/work/financas/', fonte: 'contrato:conteudo/arquivo-de-texto-vira-pagina.md' },
  enderecoReembolso: { texto: '/trabalhos/reembolso/', en: '/en/work/reembolso/', fonte: 'contrato:conteudo/arquivo-de-texto-vira-pagina.md' },
  // As outras páginas e o inglês sob /en/, com os caminhos traduzidos (decisão 242).
  enderecoHome: { texto: '/', en: '/en/', fonte: 'contrato:idioma/segundo-idioma.md' },
  enderecoTrabalhos: { texto: '/trabalhos/', en: '/en/work/', fonte: 'contrato:idioma/segundo-idioma.md' },
  enderecoQuemSouEu: { texto: '/quem-sou-eu/', en: '/en/about/', fonte: 'contrato:idioma/segundo-idioma.md' },
  // O controle de idioma: o nome do outro idioma, na língua dele (decisão 242).
  outroIdioma: { texto: 'English', en: 'Português', fonte: 'contrato:idioma/segundo-idioma.md' },
  // Só em inglês: enquanto não há o PDF em inglês, a About linka o português (decisão 243).
  baixarCurriculoEmPortugues: { texto: null, en: 'Download résumé (PDF, in Portuguese)', fonte: 'contrato:idioma/segundo-idioma.md' },
  // Rótulos que só o leitor de tela ouve (decisão 245).
  rotuloNavegacao: { texto: 'Principal', en: 'Main', fonte: 'contrato:idioma/segundo-idioma.md' },
  rotuloTrilha: { texto: 'Etapas do case', en: 'Case steps', fonte: 'contrato:idioma/segundo-idioma.md' },

  // Desenhados no Figma, sem texto escrito em contrato.
  pularParaConteudo: { texto: 'Pular para o conteúdo', en: 'Skip to content', fonte: 'figma:273:114' },
  proximoCase: { texto: 'Próximo case', en: 'Next case', fonte: 'figma:111:99' },
  abreEmNovaAba: { texto: 'abre em nova aba', en: 'opens in a new tab', fonte: 'figma:245:243' },
  verRepositorio: { texto: 'Ver o repositório', en: 'See the repository', fonte: 'figma:260:126' },
  baixarCurriculo: { texto: 'Baixar currículo em PDF', en: 'Download résumé (PDF)', fonte: 'figma:127:38' },
  verLinkedin: { texto: 'Ver LinkedIn', en: 'See LinkedIn', fonte: 'figma:127:32' },
  faleDireto: { texto: 'Ou fale direto comigo:', en: 'Or reach me directly:', fonte: 'figma:127:37' },
  posicaoNaTrilha: { texto: '{n} de {total}', en: '{n} of {total}', fonte: 'figma:199:352' },
};

// O idioma em que a construção está escrevendo (decisão 242). O português é o padrão; a
// construção troca para o inglês ao escrever /en/ e volta. Cada texto tem o inglês ao lado,
// conferido contra a tabela do contrato idioma/segundo-idioma.md. Texto sem inglês, numa
// página em inglês, para a construção: nunca sai português por engano.
let idiomaAtual = 'pt';
export const IDIOMAS = ['pt', 'en'];
export const LANG = { pt: 'pt-BR', en: 'en' };
export const idioma = () => idiomaAtual;
export function comIdioma(i, fazer) {
  const antes = idiomaAtual;
  idiomaAtual = i;
  try { return fazer(); } finally { idiomaAtual = antes; }
}
export function t(chave) {
  const item = TEXTOS[chave];
  if (idiomaAtual === 'pt' || item.neutro) return item.texto;
  if (item.en === undefined) throw new Error(`texto de interface sem inglês: ${chave}`);
  return item.en;
}

// O endereço de uma página no idioma em vigor, sem a barra inicial.
const ENDERECO_DA_PAGINA = { home: 'enderecoHome', trabalhos: 'enderecoTrabalhos', 'quem-sou-eu': 'enderecoQuemSouEu' };
export const enderecoDe = (pagina) => t(ENDERECO_DA_PAGINA[pagina]).replace(/^\//, '');

// O domínio do site (decisão 233), para os endereços absolutos que apontam a versão no outro
// idioma.
export const DOMINIO = 'https://larissaquadros.com';

// O caminho de cada case dentro do site, sem a barra inicial, a partir do endereço declarado
// no contrato. Renomear o arquivo de conteúdo não muda o endereço; case sem endereço declarado
// para a construção, em vez de ganhar um endereço adivinhado do nome do arquivo.
const ENDERECO_DO_CASE = { financas: 'enderecoFinancas', reembolso: 'enderecoReembolso' };
export function caminhoDoCase(c) {
  const chave = ENDERECO_DO_CASE[c.prefixo];
  if (!chave) throw new Error(`${c.arquivo}: o case não tem endereço declarado (contrato conteudo/arquivo-de-texto-vira-pagina.md)`);
  return t(chave).replace(/^\//, '');
}

// A frase da home tem quebra escolhida, não automática (contrato home/home.md): cada linha
// fecha uma unidade de sentido, e o trecho com marca-texto é de sentido, não de ritmo.
// As quebras e o trecho são os do Figma: 61:2 (desktop) e 94:22 (estreita).
// A construção confere que as linhas, juntas, são exatamente a frase do quem-sou-eu.md;
// se a frase mudar no arquivo, a quebra escolhida deixa de valer e o navegador quebra.
// Em inglês, as quebras e o trecho aprovados com a tradução (decisões 242 e 244).
export const FRASE_DA_HOME_EN = {
  marcaTexto: 'a better way to do it,',
  desktop: ["If there's", 'a better way to do it,', 'I want to find out what it is.'],
  estreita: ["If there's", 'a better way to', 'do it, I want to', 'find out what it is.'], // decisão 247
};

export const FRASE_DA_HOME = {
  marcaTexto: 'forma melhor de fazer,',
  desktop: ['Se existe uma', 'forma melhor de fazer,', 'eu quero descobrir qual é.'],
  estreita: ['Se existe uma', 'forma melhor', 'de fazer, eu quero', 'descobrir qual é.'],
};

// O trecho com marca-texto no hero de cada case. É sempre a virada da frase de abertura:
// observação, decisão, resultado. Figma 110:23 e 110:24 (Finanças) e 144:32 (Reembolso).
export const MARCA_TEXTO_DO_CASE = {
  financas: 'Decidi transformar essa cena em um aplicativo desktop.',
  reembolso: 'Decidi redesenhar o fluxo para que a segunda vez fosse diferente da primeira.',
};
// Em inglês, aprovado com a tradução (decisões 242 e 244).
export const MARCA_TEXTO_DO_CASE_EN = {
  financas: 'I decided to turn that scene into a desktop app.',
  reembolso: 'I decided to redesign the flow so the second time would be different from the first.',
};

// O título do case quebra onde o Figma quebra (decisão 186). Quebra escolhida só na tela
// estreita, e só onde o desenho a escolheu: Finanças em 108:22. Os outros quebram pela
// largura. A construção confere que as linhas, juntas, são o título do arquivo; se o título
// mudar, a quebra escolhida deixa de valer e o navegador quebra.
export const QUEBRA_DO_TITULO_ESTREITA = {
  financas: ['A planilha que', 'virou produto'],
};
// Em inglês, aprovado com a tradução (decisões 242 e 244).
export const QUEBRA_DO_TITULO_ESTREITA_EN = {
  financas: ['From spreadsheet', 'to product'],
};

// A quebra escolhida do título da página de erro em inglês, quando ele não cabe numa linha
// (decisão 251). O português não tem.
export const QUEBRA_DO_TITULO_DO_ERRO = {
  en: ["This address doesn't", 'lead anywhere.'],
};

// A quebra escolhida do título de Trabalhos, nos dois idiomas (decisões 213 e 242).
export const QUEBRA_DO_TITULO_TRABALHOS = {
  pt: ['Dois problemas que eu vi de perto,', 'e o que fiz com eles.'],
  en: ['Two problems I saw up close,', 'and what I did about them.'],
};

// Cases em que a mídia é mais alta que o texto: no desktop, texto e mídia correm em colunas
// separadas, cada uma com o respiro de capítulo (case/pagina-de-case.md, decisão 204). Nos
// outros, cada mídia fica alinhada ao seu capítulo.
export const COLUNAS_SEPARADAS = ['financas'];

// A cor de cada case (design-system.md, "Papéis de acento").
export const COR_DO_CASE = { financas: 'azul', reembolso: 'laranja' };

// A ordem dos cards é fixa e declarada, nunca derivada de data (indice-de-trabalhos.md).
export const ORDEM_DOS_CASES = ['case-study-financas-pf-pj.md', 'case-study-reembolso-sulamerica.md'];

// Qual parágrafo de cada capítulo recebe o bloco de destaque é decisão de conteúdo, e
// está escrita no contrato case/pagina-de-case.md ("Os dois do case de Finanças", "Os três
// do case de Reembolso"). Aqui fica o começo de cada um, conferido contra o contrato por
// teste. Parágrafo cujo texto começa assim recebe o bloco.
export const BLOCO_DE_DESTAQUE = {
  financas: ['Conduzi o projeto inteiro com IA', 'E a documentação virou artefato de handoff'],
  reembolso: [
    'Percebi que muitas das etapas mais pesadas',
    'Separei o que acontece uma vez na vida',
    'Então reconstruí, o mais fielmente possível',
  ],
};

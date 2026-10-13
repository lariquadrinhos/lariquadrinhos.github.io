---
fluxo: idioma/segundo-idioma
dominio: moldura
dono: design
status: rascunho
atualizado: 2026-10-13

figma:
  file: hwClE9Xpm51OW4vPsCCn8J
  pagina: "56:2"
  tela: "@lacuna · o controle de idioma ainda não foi desenhado na barra"
---

# Segundo idioma

O site existe em português e em inglês. O português abre sempre; o inglês é uma escolha na barra, ou
um link direto que ela manda nas candidaturas. Trocar de idioma leva para a mesma página, na mesma
altura da leitura.

## Regras

- **Os idiomas são dois: português e inglês.** Ver decisão 242.
- **O português fica na raiz, e o inglês sob `/en/`, com os caminhos traduzidos:**

  | Português | Inglês |
  |---|---|
  | `/` | `/en/` |
  | `/trabalhos/` | `/en/work/` |
  | `/trabalhos/financas/` | `/en/work/financas/` |
  | `/trabalhos/reembolso/` | `/en/work/reembolso/` |
  | `/quem-sou-eu/` | `/en/about/` |

  **A página de erro é bilíngue**: o GitHub Pages serve uma só para o site inteiro, então ela traz
  o texto em português e em inglês, sem depender de script. Ver decisão 243.
- **Sempre abre em português.** O site não adivinha o idioma pelo navegador: num site estático, isso
  pediria um redirecionamento automático, e a página piscaria. Quem quer inglês troca na barra, ou
  chega por um endereço `/en/`.
- **A escolha não é guardada.** O idioma é o do endereço: um link em inglês abre em inglês, sempre.
- **O controle é uma palavra na barra**, como os outros itens: **"English"** nas páginas em português,
  **"Português"** nas páginas em inglês. Ele leva à mesma página no outro idioma.
  - No desktop, fica depois de "Tema", por último.
  - Abaixo de 1280, a barra é a da tela estreita (decisão 230), e o controle vai para dentro do Menu,
    como o tema.
- **Trocar de idioma mantém a altura da leitura.** No case, a página do outro idioma abre no mesmo
  capítulo: os capítulos têm o mesmo endereço de âncora nos dois idiomas, o do português, mesmo que
  o nome do capítulo na trilha mude.
- **O conteúdo autoral em inglês é dela.** Os arquivos têm o mesmo nome com `.en` antes da extensão:
  `quem-sou-eu.en.md`, `case-study-financas-pf-pj.en.md`, `case-study-reembolso-sulamerica.en.md`.
  Mesmos marcadores, mesmas mídias, na mesma ordem. Eu traduzo, ela revisa e aprova.
- **As mídias são as mesmas nos dois idiomas.** As telas dos produtos ficam em português, porque são
  os produtos reais. Legendas e textos alternativos são traduzidos.
- **O currículo tem uma versão em inglês**, em PDF, produzida por ela. Até existir, a página About
  linka o currículo em português, com o rótulo *"Download résumé (PDF, in Portuguese)"*: nada fica
  faltando, e a publicação não é recusada. Ver decisão 243.
- **A página declara o idioma** (`lang="pt-BR"` ou `lang="en"`) e aponta a sua versão no outro
  idioma, para buscadores e leitores de tela.

## Texto

Texto de interface em inglês. O português de cada item continua no contrato da tela que o exibe; este
é o único lugar do inglês. Rascunho meu, à espera da aprovação dela.

| Português | Inglês |
|---|---|
| Trabalhos | Work |
| Quem sou eu | About |
| Contato | Contact |
| Tema | Theme |
| Menu | Menu |
| Claro · Escuro | Light · Dark |
| Tema claro · Tema escuro | Light theme · Dark theme |
| English (controle, nas páginas em português) | Português (controle, nas páginas em inglês) |
| Ver os meus trabalhos | See my work |
| Dois problemas que eu vi de perto, e o que fiz com eles. | Two problems I saw up close, and what I did about them. |
| Próximo case | Next case |
| Vamos conversar? | Shall we talk? |
| Falar comigo | Get in touch |
| Está tudo aberto. | It's all open. |
| Leia mais sobre o produto | Read more about the product |
| Ver o repositório | See the repository |
| abre em nova aba | opens in a new tab |
| Voltar ao topo | Back to top |
| Pular para o conteúdo | Skip to content |
| {n} de {total} | {n} of {total} |
| Mais sobre mim: | More about me: |
| Baixar currículo em PDF | Download résumé (PDF) |
| (enquanto não há o PDF em inglês) | Download résumé (PDF, in Portuguese) |
| Ver LinkedIn | See LinkedIn |
| Ou fale direto comigo: | Or reach me directly: |
| Esse endereço não leva a lugar nenhum. | This address doesn't lead anywhere. |
| Pode ser um link meu que envelheceu, ou um erro de digitação. De qualquer forma, o que você procurava deve estar em um desses caminhos. | It may be an old link of mine, or a typo. Either way, what you were looking for should be down one of these paths. |
| Ver os trabalhos | See the work |
| Voltar para a home | Back to the home page |

O marca-texto da Home em inglês cobre *"a better way to do it,"*, o equivalente de *"forma melhor de
fazer,"* (decisão 181). A quebra da frase em inglês é escolhida como a do português, quando houver
desenho.

A quebra escolhida do título de Trabalhos em inglês: *"Two problems I saw up close, / and what I did
about them."*

## Peças

| Nome no cenário | Figma | Storybook |
|---|---|---|
| controle de idioma · desktop | `@lacuna` | não se aplica |
| controle de idioma · dentro do menu | `@lacuna` | não se aplica |

## Comportamento

```gherkin
# language: pt
Funcionalidade: Segundo idioma

  Cenário: A primeira visita abre em português
    Dado que o leitor chega pelo endereço da raiz
    Quando a página abre
    Então ela está em português, qualquer que seja o idioma do navegador

  Cenário: O leitor troca para o inglês
    Dado que o leitor está numa página em português
    Quando ele aciona "English" na barra
    Então a mesma página abre em inglês, sob "/en/"
    E, num case, no mesmo capítulo em que ele estava

  Cenário: Um link em inglês abre em inglês
    Dado que o leitor recebeu um endereço sob "/en/"
    Quando ele o abre
    Então a página está em inglês

  Cenário: O controle de idioma na tela estreita
    Dado que a barra é a da tela estreita
    Quando o leitor abre o Menu
    Então o controle de idioma está dentro dele, como uma palavra

  Cenário: A página de erro nos dois idiomas
    Dado que o endereço pedido não existe, em qualquer idioma
    Quando a página de erro aparece
    Então ela traz o texto em português e em inglês
    E as saídas levam às páginas de cada idioma
```

## Transições

| De | Gatilho | Para |
|---|---|---|
| Página em português | "English" na barra | A mesma página em inglês |
| Página em inglês | "Português" na barra | A mesma página em português |

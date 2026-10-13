---
fluxo: moldura/botao-contato
dominio: moldura
dono: design
status: rascunho
atualizado: 2026-09-18

figma:
  file: hwClE9Xpm51OW4vPsCCn8J
  pagina: "@lacuna · nada desenhado ainda"
  tela: "@lacuna · nada desenhado ainda"
---

# Contato na barra

> **A barra tem 64 de altura nas duas larguras**, e o respiro é consequência disso, não
> escolha. Era 72 no desktop sem razão escrita, com o mesmo conteúdo dos dois lados.
>
> **A barra é uniforme.** Todos os seus itens (Trabalhos, Quem sou eu, Contato e o
> controle de tema) usam o mesmo peso e a mesma cor. Nenhum recebe borda, fundo ou
> destaque. Os itens de navegação são do mesmo nível e **não se diferenciam por peso nem
> por cor**. O nível se marca pelo
> tamanho, nunca pela cor, e dois itens do mesmo nível não têm o que marcar. *"Trabalhos em
> primeiro lugar"* é ordem, não ênfase.
>
> **A barra indica onde a pessoa está.** O item correspondente recebe **sublinhado no acento
> de sistema** e é declarado na marcação. Cor e sublinhado juntos, porque cor sozinha não
> basta; peso fica de fora, para não confundir estado com hierarquia.
>
> **Um case pertence a Trabalhos.** É a única relação de pertencimento do site: nenhuma
> outra página está dentro de outra. Numa página de case, "Trabalhos" recebe o mesmo
> sublinhado, como seção. A distinção entre "estou em Trabalhos" e "estou dentro de
> Trabalhos" não é marcada: as duas significam a mesma coisa para quem se orienta, e
> diferenciá-las exigiria um terceiro tratamento visual sem consequência prática.
>
> **Home e erro não recebem sublinhado, e isso é resposta, não ausência.** Na home a pessoa
> está na entrada, não dentro de uma seção; a home é alcançada pelo nome, que é identidade e
> não item de navegação. Na página de erro ela não está em lugar nenhum.

Fica à direita da barra fixa. Navegação diz para onde ir; contato diz o que fazer, e essa
diferença é de **comportamento, não de aparência**. Ao ser acionado, revela o endereço de
e-mail escrito por extenso e o LinkedIn.

## Regras

- O contato não é item de navegação e não leva a uma página.
- **Não tem destaque visual.** A ordem da barra em desktop é: nome · Trabalhos · Quem sou eu
  · Contato · controle de tema, com o tema por último.
- **Em tela estreita a barra é: Larissa · Trabalhos · Contato · Menu.** "Quem sou eu" e o
  controle de tema vão para dentro do menu. **Nenhum item vira ícone**: a barra é toda
  palavra, nas duas larguras.
- **Abaixo de 1280 de largura, todas as páginas usam a barra da tela estreita**, com Menu. É
  a fronteira em que o case passa ao modo estreito (decisão 225), e a barra não troca quando a
  pessoa vai de uma página para outra na mesma janela. O conteúdo da Home, de Trabalhos e de Quem
  sou eu não muda com isso. Com a barra vêm as caixas de contato e do Menu da tela
  estreita, de margem a margem e com véu. **A margem da barra é 80 a partir de 1024**, a mesma do
  conteúdo do desktop, para barra e conteúdo se alinharem à esquerda; abaixo de 1024, 24. Ver
  decisões 230, 231 e 232.
- **O que decide a divisão é a largura, medida, não a arrumação.** A barra estreita tem
  327px úteis. "Quem sou eu" é o rótulo mais longo do site, 113px, e a combinação que cabe
(Larissa · Trabalhos · Contato · Menu, 308px) deixa 19px de folga. Nenhum arranjo com
  "Quem sou eu" na barra fecha: com Menu falta 24px, no lugar de Contato falta 47px, com
  tudo aberto falta 109px. **Então o menu guarda uma página só, e isso não é desarrumação:
  é o resto de uma conta.** Uma terceira página futura cai ali também.
- **Todo item da barra é escrito do mesmo jeito: inicial maiúscula.** "Tema" e "Menu"
  seguem a grafia de "Trabalhos" e "Contato", se são palavras como as outras, são escritas
  como as outras. Uniformidade inclui grafia.
- Quando a página atual está dentro do menu, **é a palavra "Menu" que recebe o sublinhado**.
  Sem isso, a única página escondida seria também a única sem indicador.
- Acionar o botão revela duas saídas: o e-mail e o LinkedIn.
- **As quatro sobreposições do site são a mesma peça: contato, menu e tema.** Mesma casca
  (canto de 10, traço de 1, sombra) e mesmo miolo: a caixa é uma lista de linhas, e **a linha
  inteira é o alvo**, não o texto dentro dela. Tocar ao lado da palavra tem que funcionar.
- **Cada linha tem 12px de respiro em cima e embaixo**, o que dá alvo de 54px no desktop e
  56px na tela estreita. O mínimo confortável para dedo é 44; texto solto numa caixa dá 32.
- **A linha ocupa a caixa inteira, mesmo quando o texto é curto.** Sem isso, "Claro" teria
  alvo 15px mais estreito que "Escuro": duas opções irmãs com áreas de toque diferentes.
- **A divisória tem o mesmo respiro dos dois lados.**
- **A caixa abraça o conteúdo; a largura não é escolhida.** Ela acompanha a linha mais larga.
  Na tela estreita, onde a caixa ocupa a largura disponível, quem manda é a margem.
- **Os rótulos são do tamanho dos itens da barra**, 18. Uma sobreposição é lista de alvos, não
  texto de leitura: o corpo maior aqui só faria a caixa disputar com a página atrás.
- **Toda sobreposição fica a 12px do que a abriu**: contato, menu e tema, nas duas larguras.
  Quando o gatilho é item da barra, a caixa pende da borda de baixo da barra, não da palavra:
  a palavra acaba dentro da barra, e uma caixa saindo do meio dela cobriria a própria barra.
- **A caixa se comporta diferente nas duas larguras, e o que decide é o dedo.** No desktop
  ela ancora logo abaixo do que a abriu e não tem véu: o clique fora tem mira precisa. Em
  tela estreita ela ocupa a largura e ganha véu, que é o alvo grande para recolher.
- **O e-mail e o LinkedIn aparecem como palavra sublinhada**, porque os dois saem do site:
  a mesma forma que eles têm em "Quem sou eu".
- **O e-mail aparece escrito por extenso: `llquadros95@gmail.com`: visível e copiável.**
- **O LinkedIn aponta para `https://www.linkedin.com/in/lari-quadros/`** e aparece com o rótulo "LinkedIn", não com o endereço. Abre em outra aba, **sem aviso no rótulo** (decisão 217). Vale também para "Ver LinkedIn" em "Quem sou eu".
- Não há formulário de contato.
- O contato também existe dentro de "Quem sou eu", junto do currículo em PDF.

**Por que o endereço aparece escrito:** um `mailto:` acionado em computador sem cliente de
e-mail configurado não faz nada visível. Quem faz triagem costuma estar no computador e
muitas vezes usa webmail. Falha silenciosa é o pior tipo de falha: com o endereço à
vista, mesmo que nada abra, a pessoa copia.

## Peças

| Nome no cenário | Figma | Storybook |
|---|---|---|
| contato na barra | dentro de qualquer tela | não se aplica |
| contato revelado · desktop | `152:42` | não se aplica |
| contato revelado · estreita | `152:61` | não se aplica |
| endereço de e-mail | dentro de `152:42` | não se aplica |
| atalho do LinkedIn | dentro de `152:42` | não se aplica |
| botão "Falar comigo" | `215:336`, `215:338` | não se aplica |
| menu aberto · estreita | `154:42` | não se aplica |
| barra fixa | componente, 6 variantes | não se aplica |

## Comportamento

```gherkin
# language: pt
Funcionalidade: Contato na barra

  Contexto:
    Dado que a barra fixa está visível em qualquer página

  Cenário: O leitor está numa página que a barra nomeia
    Dado que o leitor está em Trabalhos ou em Quem sou eu
    Quando a página abre
    Então o item correspondente recebe sublinhado no acento de sistema
    E é anunciado como página atual por leitor de tela
    E nenhum item muda de peso

  Cenário: O leitor está numa página de case
    Dado que o leitor está num dos dois cases
    Quando a página abre
    Então "Trabalhos" recebe sublinhado, como seção a que o case pertence
    E é declarado na marcação como a seção atual
    E a cor do case segue dominando a tela, com o acento de sistema só no que é interativo

  Cenário: O leitor está na home ou na página de erro
    Dado que o leitor está numa dessas duas
    Quando a página abre
    Então nenhum item da barra é sublinhado
    # Não é ausência de indicador: na home a pessoa está na entrada, não dentro de uma
    # seção, e na página de erro não está em lugar nenhum.

  Cenário: Leitor procura como falar com ela
    Quando o leitor aciona o contato
    Então o endereço de e-mail aparece escrito por extenso
    E o atalho do LinkedIn aparece ao lado
    E a página por trás continua onde estava

  Cenário: Leitor escolhe o e-mail
    Dado que o endereço de e-mail está visível
    Quando o leitor toca no endereço
    Então o cliente de e-mail abre com o destinatário preenchido

  Cenário: O cliente de e-mail não abre
    Dado que o leitor tocou no endereço
    E que não há cliente de e-mail configurado
    Então o endereço continua visível na tela
    E o leitor consegue copiá-lo

  Cenário: Leitor escolhe o LinkedIn
    Dado que o atalho do LinkedIn está visível
    Quando o leitor o aciona
    Então o perfil abre em nova aba

  Cenário: A caixa em desktop
    Dado que o leitor acionou o contato num computador
    Então a caixa aparece ancorada logo abaixo do que a abriu
    E a página atrás não escurece

  Cenário: A caixa em tela estreita
    Dado que o leitor acionou o contato numa tela estreita
    Então a caixa ocupa a largura da tela
    E a página atrás escurece
    E tocar no escurecido recolhe a caixa

  Cenário: O gatilho declara que abriu
    Dado que o leitor acionou um gatilho da barra
    Quando a caixa aparece
    Então o gatilho não muda de aparência
    E é declarado na marcação como aberto
    E o leitor de tela anuncia esse estado

  Cenário: A barra continua clara com a caixa aberta
    Dado que a tela é estreita e a caixa está aberta
    Então o véu cobre a página abaixo da barra
    E a barra continua sem escurecer

  Cenário: Leitor desiste
    Dado que o contato está revelado
    Quando o leitor aciona a tecla Esc ou toca fora
    Então o contato se recolhe
    E o foco volta para o contato

  Cenário: A barra em tela estreita
    Dado que a tela é estreita
    Quando a página abre
    Então a barra mostra Larissa, Trabalhos, Contato e Menu, todos em palavra
    E "Quem sou eu" e o controle de tema ficam dentro do menu
    E nenhum item da barra é ícone

  Cenário: O leitor abre o menu em tela estreita
    Dado que a barra estreita está visível
    Quando o leitor aciona "Menu"
    Então "Quem sou eu" e o controle de tema aparecem
    Quando o leitor aciona a tecla Esc ou toca fora
    Então o menu se recolhe
    E o foco volta para "Menu"

  Cenário: O leitor está em Quem sou eu, em tela estreita
    Dado que "Quem sou eu" está dentro do menu
    Quando a página abre
    Então a palavra "Menu" recebe o sublinhado no acento de sistema

  Cenário: A barra é a mesma em todas as páginas na mesma largura
    Dado que a janela tem menos de 1280 de largura
    Quando a pessoa vai de qualquer página para outra
    Então a barra mostra Larissa, Trabalhos, Contato e Menu nas duas
```

## Transições

| De | Gatilho | Para |
|---|---|---|
| Qualquer página | Acionar o contato | Contato revelado, sobre a mesma página |
| Contato revelado | Tocar no endereço | Cliente de e-mail, ou nada: o endereço permanece |
| Contato revelado | Acionar o LinkedIn | Nova aba com o perfil |
| Contato revelado | Esc ou toque fora | Contato recolhido, foco de volta no botão |

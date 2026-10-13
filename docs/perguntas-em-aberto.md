# Perguntas em aberto: Portfólio

> Lista única do que ainda não foi decidido. **Uma pergunta, um lugar.**
> Cada uma traz: o que precisa ser decidido, as opções conhecidas com a consequência de
> cada uma, a classificação, e, para as que esperam, **o momento em que deixa de poder
> esperar**, sempre um ponto do trabalho, nunca uma data.
>
> Pergunta respondida **sai daqui**. A resposta vira regra no contrato ou nas definições,
> e entrada no log se tiver alternativa real. Lista com metade dos itens riscados deixa de
> ser consultável.

**Atualizado:** 9 de outubro de 2026 · **1 pergunta**, nenhuma travando

---

## Travam

Nenhuma.

### ~~P44~~ · Resolvida pela decisão 053
O parágrafo não será escrito. O site publica com dois cases e sem comentar a ausência.

### ~~P45~~ · Resolvida pela decisão 054
"Apresentação" era rótulo de estrutura e virou `<!-- bloco: apresentacao -->`.

### ~~P47~~ · Resolvida pela decisão 056
Texto aprovado e escrito no contrato.

### ~~P48~~ · Resolvida pela decisão 118
Ganhou contrato próprio em `moldura/atalho-de-salto.md`, componente `273:114` e duas telas de
estado. É link e não botão, tem superfície opaca porque flutua, não empurra a barra, e na tela
estreita cobre a faixa de progresso. O destino recebe o foco de verdade, sem isso o salto
seria visual e não de navegação.

### ~~P49~~ · Resolvida pela decisão 084
Roxo para estado, verde para hero, rosa para o terceiro case. Criadas `accent/estado/*` e
`accent/hero/*` como referências.

### ~~P50~~ · Resolvida pela decisão 085
Sem conflito: a página *Sistema visual* nomeia "marcador da trilha" entre os usos do tom forte
do case. O marcador ativo veste a cor do case.

### ~~P52~~ · Resolvida pela decisão 087
O gatilho não muda de aparência, mas declara o estado na marcação. E o véu passou a parar na
barra, que continua clara e tocável.

### ~~P51~~ · Resolvida pela decisão 088
Link não usa a cor de estado: ela é o que distingue o sublinhado de página atual do sublinhado
de link, que têm a mesma forma.

### ~~P53~~ · Resolvida pela decisão 098
Em tela estreita o bloco sangra até as bordas, e o texto dentro fica com a mesma medida da
prosa. No desktop ele fica na coluna, com 66 caracteres, dentro da faixa.

### ~~P54~~ · Resolvida pela decisão 120
A medida real era **105 caracteres**, não 122 nem 148: a banda encolheu quando passou a começar
na margem do texto do case. Criado `line/corpo-largo`: 34 no desktop, 30 em tela pequena. Mesmo
corpo, mais respiro. A escala ganhou um token em vez de um par novo, porque o corpo não muda.

### ~~P55~~ · Resolvida pela decisão 124
O que informa passou para `text/secondary`: 62 nós nas telas e as raízes em três componentes.
`text/tertiary` fica como tom de anotação, que não vai ao ar. Escurecer a cor foi descartado:
sobre o creme não há folga para um terceiro nível que passe. Zero reprovações nos dois temas.

### ~~P56~~ · Resolvida pelas decisões 126 e 127
Criado `border/elevado`: **`#817D74`** no claro, **`#6C6255`** no escuro. Mexer no véu foi
descartado por cálculo. O problema era maior que a pergunta dizia: as sobreposições do desktop e
o atalho de salto não têm véu e reprovavam **também no claro**. O valor claro foi corrigido na
127, depois de eu descobrir que tinha lido o alfa do véu errado. Doze superfícies flutuantes,
zero reprovações nos dois temas.

### ~~P58~~ · Resolvida pela decisão 135
Nenhuma das três opções valia: as três supunham defeito na trilha. **A etapa dura exatamente o
comprimento do capítulo dela**: a janela cancela na conta, então o cenário media capítulo,
não trilha. Reescrito como invariante, com o piso movido de meia tela para um terço e a razão
registrada. **Fica de pé uma observação de conteúdo:** a Introdução do Reembolso tem 240px no
desktop, contra 420 do próximo capítulo mais curto do site. É o único abaixo de 420 e é decisão
dela crescê-lo ou não.

### ~~P62~~ · Resolvida pela decisão 167
**A pergunta estava errada nos fatos.** As lacunas existiam, montadas à mão como quadro solto
mais um texto irmão, em vez de instância do componente. A checagem 14 as ignorou porque procura
pelo nome `mídia de prova`. Nenhuma das três opções que eu listei era a certa: a resposta foi
aplicar uma regra que já estava decidida, peça repetida vira instância, nas doze que tinham
ficado de fora.

### ~~P61~~ · Resolvida pela decisão 163
Ela montou uma segunda mídia para o capítulo: dois mockups no sistema visual remontado, e o
capítulo 4 passou a ser **o único com duas lacunas**. A coluna de prova nasceu daí: no desktop a
mídia era filha única de uma linha horizontal, e duas exigiram uma coluna vertical que as
empilhasse. Nenhuma das três opções que eu tinha listado foi escolhida: a resposta foi produzir a
prova que faltava.

### ~~P60~~ · Resolvida pela decisão 157
**A pergunta estava mal posta.** Não era claro contra escuro: era **temperatura**. O fundo das
versões escuras já era a cor quente da página; o das claras era o cinza neutro que a ferramenta
entrega. A `#F5F5F5` fica a **1,05:1** do creme e ainda assim se vê, porque o olho lê temperatura
antes de claridade. Nenhuma das três opções que eu listei era necessária: **mídia sangra na
página, sem moldura**, e o material é produzido sobre `bg/page` do tema.

### ~~P42~~ · Resolvida pela decisão 176
Os dois cases ganharam `<!-- bloco: hero -->` antes do título. O hero termina na última linha
da tira; a prosa do capítulo 1 começa logo depois.

### ~~P40~~ · Resolvida pela decisão 059
Os três valores foram escolhidos e deixaram de ser provisórios. Capa 3:2 porque a tela
estreita decide; título um degrau abaixo de `titulo-case`; linha em `corpo`.

### P21 · A ordem do "próximo case" com três cases
A decisão 003 resolve dois cases sem exceção, mas não define a ordem com três.
**Opções:** ordem fixa do índice, com o último voltando ao primeiro · o case ainda não lido
nesta sessão · o mais recente primeiro.
**Momento:** antes de o terceiro case existir. · *Contrato, `case/card-proximo-case.md`*

### ~~P11~~ · Resolvida pela decisão 138
A tensão era falsa: *"nada se move sem o leitor pedir"* fala de movimento autônomo, e o marcador
se move porque a pessoa rolou. A terceira opção estava certa e virou regra geral, em três
categorias: o que é derivado da rolagem **não anima nunca**; o que a pessoa aciona e move a
página **salta sem transição** com movimento reduzido; o que aparece ou some **nunca tem
transição**. O sistema não precisa de token de duração.

---

## Adaptações dos briefings a este projeto

Nenhuma em aberto. A P17 (não há Storybook) foi resolvida na prática: os contratos marcam o
Storybook como "não se aplica" (decisão 224).

## ~~P46~~: Resolvida pela decisão 051

A regra de medida foi escopada: 65–75 governa leitura contínua; blocos curtos em grade podem
ficar abaixo, com piso em torno de 45.

# Design system

**O sistema inteiro vive numa página só:** arquivo Figma `hwClE9Xpm51OW4vPsCCn8J`, página
**Sistema visual** (`34:2`).

Ela começou como o lugar onde a aparência foi pensada e as regras dela escritas. A biblioteca
de peças nasceu numa página separada e voltou para cá, porque as duas iam repetir cor e
tipografia, e informação repetida diverge. **Um lugar só é impossível de divergir.**

| Quadro | O que traz |
|---|---|
| 00 · Princípios | por que cada cor existe, e o que bloco colorido faz |
| 01 · Neutros | os sete neutros, nos dois temas, com contraste medido |
| 02 · Acentos, tema claro | as cinco cores de case, com contraste de cada par |
| 03 · Acentos, tema escuro | os mesmos cinco papéis, com valores próprios |
| 04 · Tipografia | os oito níveis e o que cada um faz |
| 05 · Espaço, forma e foco | a escala, os cantos, o traço, e o anel de foco em cada tipo de alvo |
| 06 · Grade | 12 colunas no desktop, 1 na tela estreita |
| 07 · Componentes | as dezessete peças, como componentes de verdade |
| 08–09 · Demonstrações | hero e leitura de case, **recortados das telas reais** e montados com as peças |

**O custo aceito:** a página é longa, e mistura dois ritmos, as regras quase não mudam, a
biblioteca muda toda semana. Aceito porque o outro arranjo já tinha começado a divergir no
primeiro dia.

---

## O que este documento não faz

**Não repete nenhum valor.** Cor, tamanho, espaço e canto vivem nas variáveis do Figma e são
exportados para `docs/spec/tokens.json`. Escrever "18px" aqui criaria a segunda fonte de
verdade que o projeto existe para evitar, e ela envelheceria em silêncio no primeiro ajuste.

O que entra aqui é **o que a variável não diz**: qual coleção governa o quê, que regras
atravessam todas as peças, e o que o sistema ainda não tem.

Comportamento de tela fica nos contratos, em `docs/comportamento/`. Descrição de cada peça
fica no inventário, em `docs/comportamento/componentes/inventario.md`. Este documento é o mapa
que liga os três.

**Três autoridades, sem sobreposição.** Valor é a variável. Regra de aparência é a página
*Sistema visual*. Comportamento é o contrato. Quem discordar de uma delas está errado no seu
próprio terreno.

---

## As quatro coleções, e o que cada uma decide

**62 variáveis:** 24 de Cor, 18 de Tipografia, 17 de Espaço e forma, 3 de Grade.


**Cor** · modos *Claro* e *Escuro*. Os dois foram escolhidos e verificados em separado:
nenhum valor de um deriva do outro, nem no Figma nem no código. As cinco cores de acento
pertencem aos cases, não ao sistema: cada case tem a sua, e ela domina a página dele.

**Tipografia** · modos *Desktop* e *Tela pequena*. **Oito níveis**, cada um um par
`size/` + `line/`, mais a família e **uma entrelinha avulsa**: `line/corpo-largo`, para a banda
do extra, onde a linha passa da medida e precisa de mais respiro. São 18 variáveis. Dois níveis
nunca dividem tamanho **e** entrelinha ao mesmo tempo; a checagem 3 recusa se dividirem.

**Espaço e forma** · modo único. Uma escala só serve respiro e distância. Medida fora da
escala se arredonda para o degrau mais próximo, e só fica fora quando a razão estiver escrita.

**Grade** · modos *Desktop* e *Tela pequena*. **O Figma não aceita vincular grade de layout a
variável**, então estes três números são declarados aqui e aplicados à mão. É a única parte do
sistema sem vínculo, e por isso a única cuja conferência não pode ser automática.

---

## Regras que atravessam todas as peças

**Nível se marca pelo tamanho, nunca pela cor.** Cor marca outra coisa (interatividade,
estado) e as duas não devem se misturar. Foi essa regra que corrigiu o rótulo do menu.

**Título nunca termina com uma palavra sozinha.** Onde a quebra não é escolhida, o título equilibra
as linhas (`text-wrap: balance`): quando ocupa duas ou mais, elas ficam de tamanho parecido, e a última
palavra não fica isolada. Navegador antigo só não recebe a melhoria. Onde há quebra escolhida, ela
manda. Ver decisões 250 e 251.

**Cor sozinha nunca basta.** Todo estado marcado por cor vem acompanhado de forma: sublinhado
na página atual, sinal na opção escolhida, tamanho no marcador ativo da trilha.

**A forma promete o destino.** Três formas, e a pergunta nunca é *quanto destaque isso
merece*, é *para onde isso leva*:

| Forma | Promete | Onde |
|---|---|---|
| Botão preenchido | ação que acontece aqui **e é a principal da página** | dois lugares: a ação da home e o convite ao contato no fim de um case |
| Palavra sublinhada | vai para fora do site | currículo, LinkedIn, e-mail, repositório |
| Palavra simples | outra página daqui | barra, menu, saídas da página de erro |

**Botão não usa cor de acento.** É preenchido em `text/primary`, com rótulo em `bg/surface`
os dois invertem junto com o tema. **Não existe botão secundário**, porque botão é a ação
principal da página e o site nunca tem duas; por isso não há variante de contorno para marcar
uma hierarquia que não existe.

**Link não usa a cor de estado.** O sublinhado da página atual e o sublinhado de um link são
a mesma forma: traço de 2px sob a palavra, e hoje só a cor os separa: roxo num, cor de texto
no outro. Pintar links de roxo colapsaria a única distinção entre *onde estou* e *isto sai
daqui*. A cor de estado fica para a posição do leitor; a forma já diz o destino.

**Alvo nunca abaixo de 44px.** Vale para toda linha de lista, toda opção, todo botão. A
checagem 6 cobra nas sobreposições.

**Foco visível em tudo que recebe foco**, inclusive região que rola. Foco é o que mostra em
que elemento a pessoa está quando navega pelo teclado em vez do rato, sem ele, quem aperta
Tab navega às cegas. Aparece só na navegação por teclado.

O anel tem **afastamento**, e ele não é enfeite: é o que garante que o anel caia sempre sobre
a superfície de fundo, nunca sobre a cor do próprio elemento, e é por isso que **uma cor de
anel basta por tema**, sem precisar de dois tons. O quadro 05 mostra os dois estados lado a
lado e o anel em cada tipo de alvo que o site tem.

**Medida de linha entre 65 e 75 caracteres no texto corrido, onde houver largura.** Blocos
curtos em grade podem ficar abaixo, com piso por volta de 45. Tabela não obedece: é dado, e o
que governa é a comparação ficar legível lado a lado. **A banda do extra é a única exceção
declarada**: cerca de 105 caracteres no desktop, porque ali a largura é o que diz que aquilo
não é o case.

**Linha que mede progresso tem dois tokens, não um.** O trecho percorrido usa o tom forte do
case; o que falta usa **`border/percurso`**. Os dois precisam ser distinguíveis entre si, porque
é a fronteira entre eles que diz quanto falta, e esse par é o que manda no valor do segundo,
não o contraste dele com a página. **Um traço mais escuro aparece mais sobre o fundo e some
contra o trecho percorrido**; o valor certo é o máximo antes de a fronteira cair.

**E o teto disso é desigual entre os temas, o que é exatamente por que existe token por modo.**
No creme o acento laranja é escuro e prende o traço onde ele já estava; no escuro há folga e ele
sobe de 1,43:1 para 2,42:1 contra a página. Ver decisão 131.

**Três categorias de movimento, e só uma delas tem o que desligar.**

1. **Derivado da rolagem**: marcador da trilha, preenchimento da trilha, barra da faixa. **Não
   anima, nunca.** O estado é função da posição, e a posição já é o gesto da pessoa. Não existe
   transição para `prefers-reduced-motion` desligar, porque não existe transição.
2. **A pessoa aciona e a página se move**: atalho de salto, voltar ao topo, item da trilha.
   Rola suave por padrão; com movimento reduzido, **salta sem transição**. É a única categoria
   que a preferência do sistema muda.
3. **Algo aparece ou some**: sobreposições, pastilha do voltar ao topo, aba retrátil.
   **Sem transição, em qualquer preferência.** A caixa aberta é o próprio sinal de que abriu
   (decisão 087); animar a entrada atrasa o sinal.

**Por isso o sistema não tem token de duração**, e a ausência é decisão: nenhuma das três
categorias precisa de um. Ver decisão 138.

**Sombra é para quem não se separa pelo preenchimento.** A sobreposição e o atalho de salto
usam `bg/surface`, que rende **1,15:1** contra a página no claro, eles precisam da sombra para
dizer que estão por cima. O voltar ao topo é sólido e rende **14,25:1**: ali a sombra não tem
trabalho, e vira um borrão escuro sob uma peça escura.

**E a sombra é um recurso do tema claro, só.** Sombra preta a 12% sobre a página escura dá
**1,03:1**, invisível. No escuro quem levanta a superfície é o contorno, não a sombra. Vale
lembrar disso antes de contar com sombra para alguma coisa. Ver decisão 141.

**O canto diz de que família a peça é, e o preenchimento decide a família.**

| preenchimento | família | canto |
|---|---|---|
| sólido escuro | botão, voltar ao topo | **`radius/pilula`** |
| `bg/surface` com contorno | sobreposição, menu, tema, lista de etapas, atalho de salto | **`radius/bloco`** |

**Superfície clara com contorno nunca usa pílula.** Seria a silhueta do botão sem ser botão, e
o site **não tem botão de contorno**, a decisão 093 o removeu. Repor essa forma por acidente é
pior do que quebrar a regra de propósito, porque não deixa rastro. Ver decisão 139.

**E as duas formas sólidas não se distinguem pelo canto, e sim pelo tamanho.** O botão tem 62 de
altura e rótulo 18; o voltar ao topo, 48 e 15. O canto não precisa fazer esse trabalho porque
**a pastilha some quando o convite ao contato entra na tela**: as duas nunca dividem a tela.
Nas páginas de case a folga é de 68px de rolagem entre uma sair e a outra entrar. Ver decisão 142.

**Raio vem de token, não de número digitado.** Os quatro `radius/*` existiam desde o começo e
**nenhum componente os usava**: os valores batiam por coincidência de digitação. Agora estão
vinculados, e o único raio solto que resta é o do anel de foco, que é derivado do alvo que ele
contorna e não tem token próprio.

**Superfície que flutua declara o próprio limite com `border/elevado`.** Sobreposição, menu,
caixa de tema e atalho de salto não se separam do fundo pelo preenchimento: `bg/surface` sobre
`bg/page` dá **1,15:1 no claro e 1,10:1 no escuro**. Quem carrega o limite é a borda, e o piso
para limite de componente é **3:1**, não 4,5, é informação não textual.

**O véu não resolve isso, e o número prova.** Ele já tem opacidade própria por modo (8% no
claro, 45% no escuro) e ainda assim não separa: sob o véu o preenchimento dá **1,37:1 no claro
e 1,20:1 no escuro**. Escurecer mais satura: com o véu a 100% no escuro a separação chega a
**1,29:1**. Véu serve para apagar o que está atrás, não para desenhar o que está na frente.
Ver decisões 126 e 127.

**`text/tertiary` não carrega texto informativo em tamanho normal.** Ele reprova AA no tema
claro (3,19:1 sobre `bg/page`, contra o piso de 4,5) e passa no escuro, 4,76:1. O que informa
usa `text/secondary`, que passa nos dois com folga. O terciário fica como **tom de anotação do
wireframe**, que não vai ao ar, e é permitido em texto grande, onde o piso cai para 3:1.

**E isso não se conserta escurecendo a cor.** Sobre o creme, a cor mais clara que ainda passaria
fica a treze pontos por canal do secundário: os dois níveis viram um. **No claro não há folga
para um terceiro nível que passe; no escuro há.** Ver decisão 124.

**Linha que passa da medida paga em entrelinha.** A exceção acima não sai de graça: quanto mais
longa a linha, mais longe o olho viaja para achar o começo da seguinte, e mais fácil é pular ou
repetir uma. Por isso a banda do extra usa **`line/corpo-largo`** no lugar de `line/corpo`:
mesmo corpo, mais respiro entre as linhas. Em tela pequena a medida já é curta e o token vale o
mesmo que `line/corpo`, o que é a forma de dizer que ali não há o que compensar. Ver decisão 120.

**Mídia sangra na página, e não tem moldura.** Nenhuma imagem de prova leva borda, superfície
própria, raio ou sombra. **O fundo do material é `bg/page` do tema dela**: a mídia entra na
página, não em cima dela.

Isso não é gosto: é o que as medidas dizem. O fundo neutro que as ferramentas entregam
(`#F5F5F5` do FigJam, `#FFFFFF` de um quadro novo) fica a **1,05:1** de contraste do creme da
página, e mesmo assim se vê, porque o olho lê **temperatura** antes de ler claridade. Creme é
quente, cinza de ferramenta é neutro, e a emenda aparece. No tema escuro o problema não existia
porque o fundo da ferramenta e o `bg/page` escuro já são quase a mesma cor quente.

**A textura do canvas não vem junto.** Grade de pontinhos, régua, sombra de moldura do editor:
tudo isso é o ambiente onde o material foi feito, não o material.

**O corte se mostra pelo desenho cortado, não por um retângulo terminando.** Num recorte de
canvas, é a linha e a caixa truncadas na borda que dizem *há mais aqui*, e dizem melhor do que
uma moldura, porque moldura fecha e corte abre. Ver decisão 157.

---

## As peças

Descrição, estados e quando não usar ficam no inventário. Aqui ficam só os endereços.

Todas vivem no quadro **07 · Componentes**.

| Peça | Nó | Variantes | Instâncias nas telas |
|---|---|---|---|
| barra fixa | `203:164` | largura × atual = 6 | 21 |
| barra / item | `203:81` | atual = 2 | **94** |
| card de case | `193:71` | cor × largura = 4 | 8 |
| trilha / item | `199:97` | marcador × posição = **15** | 16 |
| faixa de progresso | `199:346` | cor = 2 | 7 |
| tira de destaques / item | `260:130` | link = 2 | **40** |
| mídia com legenda | conjunto | largura = 2 | **16** |
| bloco de destaque | `217:125` | cor × largura = 4 | 12 |
| botão | `215:115` | largura = 2 | 7 |
| marca-texto | `176:7` | nenhuma | ver abaixo |
| marcador de falta | `173:34` | nenhuma | **22** + 16 aninhados |
| tabela / linha | conjunto | tipo × colunas = 4 | **28** |
| sobreposição / linha | `173:13` | sinal = 3 | 5 |
| sobreposição / caixa | `173:19` | nenhuma | ver abaixo |
| aba retrátil | `239:128` | estado × largura = 4 | 4 |
| atalho de salto | `273:114` | nenhuma | 2 |
| voltar ao topo | `356:120` | nenhuma | 1 · **só no desktop** |

**Dezessete componentes para quinze itens de inventário:** a sobreposição é montada de duas
peças, e a trilha aparece nas duas formas que toma, item lateral e faixa de progresso.

**Um elemento entra no inventário quando aparece em mais de uma tela ou em mais de uma
largura.** Foi esse teste que trouxe o marca-texto, o marcador de falta, a tabela e a
sobreposição: nenhum dos quatro estava na lista original de sete.

**Quinze dos dezessete são usados pelas telas.** Sobram dois, e os dois têm impedimento
técnico, não pendência de trabalho, **instância não aceita override de geometria nem filho
novo**, e é disso que os dois precisam:

- **`marca-texto`**: o realce é um retângulo atrás do texto, e a **largura dele muda a cada
  uso**: 922 na home, 562, 327, 199 nos heroes dos cases. Não há uma medida que sirva, e
  instância recusa redimensionar filho.
- **`sobreposição / caixa`**: a casca precisa de **um número variável de linhas**: duas no
  contato, três no menu, cinco na lista de etapas. Instância não aceita filho novo. É por isso
  que só `sobreposição / linha` é reusável, e é por isso que a checagem 6 existe.

**A tabela de linha precisou de duas variantes novas para caber.** O componente tinha três
células fixas; a tabela *"O que eu entreguei"* tem duas. Virou `tipo × colunas`, e as larguras
de coluna foram fixadas na medida real de uso: 507/253/253 e 254/785, o que só é possível
porque **as tabelas existem numa largura só** desde que saíram da tela estreita.

---

## O que o sistema ainda não tem

**Papéis de acento, resolvidos.** Das cinco cores, **azul** é o case de Finanças, **laranja**
o de Reembolso, **roxo** é a cor de estado, **verde** é a da hero e **rosa** fica para o
terceiro case. Estado e hero existem como referência: `accent/estado/*` e `accent/hero/*`:
apontando para roxo e verde: trocar um papel é trocar num lugar só.

**~~Acento de sistema~~**: resolvido pela decisão 084. A cor de estado é o **roxo**, e existe
como `accent/estado/*`; o anel de foco usa `accent/estado/strong`, não `text/primary`. Trocar o
papel é trocar num lugar só.

**Um conjunto de variantes quebrado, achado nesta auditoria.** O `botão` tinha **duas variantes
com o mesmo nome**: `largura=desktop` as duas, e o Figma recusava até ler as propriedades do
conjunto. A estreita estava batizada de desktop. Corrigido: quem abraça o rótulo é a do desktop,
quem ocupa a coluna inteira é a do estreito, e as sete instâncias passaram a bater com a largura
da tela. **Nenhuma checagem pegava isso**: elas leem o que foi exportado, e o export nunca
chegava a esse campo.

**Trava de proporção da capa do card.** A API do Figma expõe `targetAspectRatio` como somente
leitura; ligar a trava é ação de interface, à mão. Sem ela, redimensionar o card pode
desalinhar a capa.

**~~Atalho de salto~~**: resolvido pela decisão 118. Tem contrato, componente e duas telas de
estado. Junto dele nasceu o **voltar ao topo** (decisão 137), que estava declarado em cinco
documentos e desenhado em nenhum.

**Traço fora do token, encontrado ao componentizar.** Os botões do desktop usavam 1,5 e os da
tela estreita 1, com `stroke/padrao` valendo 1. Corrigido nos cinco. O defeito sobreviveu
porque ninguém compara o traço de um botão com o de outro numa tela diferente, e é
exatamente o que um componente impede.

**Sete peças ainda não são usadas pelas telas**: estão listadas na tabela acima. Para essas, a
checagem 6 é a única coisa que compara as cópias entre si, e ela compara um export, não o
arquivo.

---

## Armadilhas do Figma, anotadas porque já custaram caro

**O que todas têm em comum: falham em silêncio.** Nenhuma dá erro; o arquivo fica errado e
parece certo. Estão aqui na ordem em que custaram tempo.

**`resize(largura, altura)` desliga o auto-ajuste do texto.** Um texto com `textAutoResize`
em `HEIGHT` que recebe `resize(760, 10)` passa a ter 10px de altura fixa e mostra só a
primeira linha: o texto continua lá, invisível. A ordem certa é redimensionar **e depois**
ligar o auto-ajuste, ou usar `layoutSizingHorizontal = 'FILL'` e deixar o auto-layout medir.
**Aconteceu seis vezes**: a última no título da aba retrátil, onde uma busca binária leu
sempre "uma linha" e encolheu o título até o piso.

**Instância recusa mudar a geometria de um filho, sem avisar.** `resize` num texto dentro de
instância simplesmente não faz nada, nem erro, nem mudança. Foi isso que impediu
`marca-texto` e `sobreposição / caixa` de virarem componentes usados: os dois precisam de
medida ou de número de filhos que varia a cada uso. A saída, quando existe, é **dar ao
componente a medida real de uso**: possível na tabela porque ela só existe numa largura.

**Componente removido continua vivo enquanto houver instância.** As 42 barras das telas
apontavam para um conjunto **que não estava em página nenhuma**, enquanto o `barra fixa` do
quadro 07 tinha zero uso. Não há aviso: o arquivo parece consistente e o componente de verdade
não governa nada. Para achar, pergunte de cada instância **em que página vive o componente
dela**, se a resposta for nenhuma, é órfão.

**Duas variantes com o mesmo nome quebram o conjunto inteiro.** O `botão` tinha
`largura=desktop` duas vezes, e o Figma recusava até *ler* as propriedades do conjunto. O
defeito não aparece olhando as variantes: aparece quando alguém tenta usá-las.

**`layoutSizingVertical = 'FILL'` não funciona se o pai abraça o conteúdo**, e também não
avisa. Um filho não pode preencher o eixo que o pai mede por ele. A saída foi tirar o traço da
coluna e torná-lo filho absoluto do item, com constraint de esticar.

**Cor vinculada guarda um literal, e é o literal que aparece se a resolução falhar.**
`setBoundVariableForPaint` aceita qualquer cor como base; se você passar preto, o vínculo fica
certo e o traço pode desenhar **preto**. Resolva o valor da variável e use-o como literal
também.

**`x` e `y` mentem sob rotação.** As setas fechadas da trilha apareciam em `@20,28` contra
`@0,16` das abertas: são as mesmas setas giradas 180°, e as coordenadas passam a reportar o
canto oposto. Meça por `absoluteBoundingBox`, que é imune.

**Converter cor para hexadecimal descarta o alfa.** Foi assim que li `overlay/veu` como
"igual nos dois modos" quando ele é 8% no claro e 45% no escuro, e calibrei uma borda inteira
sobre a página velada errada. **O valor certo já estava em `docs/spec/tokens.json`**, com o
alfa nos dois últimos dígitos: antes de consultar o Figma, veja se o dado já está exportado.

## Como mexer nele

1. **Valor muda na variável**, nunca na peça. Se uma peça tem cor ou medida escrita na mão, é
   defeito.
2. **Peça nova vira componente antes de ser usada duas vezes.** A regra existe porque o
   contrário aconteceu: as sobreposições nasceram como quatro cópias e divergiram em vão,
   tipo, respiro e área de toque, nada disso apareceu até serem comparadas lado a lado.
3. **Reexporte os arquivos de `docs/spec/`** depois de mexer no Figma: `tokens`,
   `sobreposicoes`, `cores-soltas`, `cortes`, `papeis`, `telas`, `trilha` e `enderecos`. Todos
   são gerados; editar à mão quebra o propósito. **Recriar um componente muda o id**, então
   `enderecos.json` é o que impede a documentação de apontar para o que não existe mais.
4. **Rode `node scripts/checagens.mjs`.** Quinze checagens. A sexta e a sétima imprimem a data
   do export, para você saber se está conferindo o presente ou o passado.

**Quadro não corta o próprio conteúdo, e a checagem 8 cobra.** Conteúdo cortado é o defeito
mais silencioso deste arquivo: ele existe, cabe na estrutura e simplesmente não aparece.
Aconteceu quatro vezes num dia. Os dois cortes legítimos: janela sobre uma página maior e
conteúdo que rola: ficam declarados **no nome do quadro**: `· recorte` e
`rola na horizontal`.

**Conjunto de variantes cabe na largura da seção.** As variantes se organizam em linhas que
quebram em 1440: a largura útil do quadro. Em fila única, o card de case dava 2054px e a
trilha 2057: **o que passava da borda era cortado e simplesmente não existia para quem
olhasse**. Variante escondida é pior que variante ausente, porque a lista parece completa.

**A barra fica acima do conteúdo quando o conteúdo passa por baixo dela.** Em quadro que mostra
a página do começo, o conteúdo nasce abaixo dos 64 da barra e a ordem de empilhamento não
importa. Em quadro que mostra a página **no meio da rolagem**, o conteúdo começa em coordenada
negativa e **cruza a barra**: ali ela precisa vir depois na lista de filhos, senão o texto passa
por cima dela. É o que uma barra fixa faz de verdade, e o quadro só está certo se reproduzir
isso. Ver decisão 149.

**Anotação de wireframe não segue o tema.** A faixa da nota é branca e a linha `#E0E0E0`, as
duas **sem vínculo, de propósito**: é o único lugar do arquivo onde cor à mão é certa, e o
nome termina em `· anotação` para a checagem 7 saber disso. A razão: a anotação **fala sobre o
desenho, não faz parte dele**. Cromo que acompanha o tema se disfarça de produto; cromo que
fica branco sempre se anuncia como andaime. Ver decisão 145.

**Quadro de arrumação não tem fundo.** Só três coisas pintam superfície neste site: a página
(`bg/page`), a sobreposição (`bg/surface`) e o card, que usa o tom pálido do case. Coluna,
capítulo, linha de tabela, cabeçalho: tudo isso é transparente, e é o creme da página que
aparece através. Um quadro branco no meio de uma página creme é quase invisível no Figma e
gritante na tela.

**Toda cor vem de variável, e a checagem 7 cobra.** O único isento é o que está marcado como
*anotação* no próprio nome do nó: cromo de documentação, como as colunas do diagrama de
grade. A marca fica no nome para a isenção ser visível no Figma, e não só no script.

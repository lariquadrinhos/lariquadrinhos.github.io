# PRD: Portfólio

| | |
|---|---|
| **Versão** | 1 |
| **Data** | 18 de setembro de 2026 |
| **Origem** | `definicoes-produto-portfolio.md` |
| **Status** | Em aberto: contém decisões que travam a Fase 1 |

> **Proveniência.** Tudo aqui vem do documento de definições. Nada foi inferido,
> completado ou suavizado. Onde a definição não existe, há uma marca `[?]` e a pergunta
> correspondente está em *Decisões em aberto*.
>
> **O que este documento deliberadamente não contém:** valores visuais (vivem em
> variáveis no Figma), comportamento de tela (vive no contrato de comportamento), método
> de construção e arquitetura de documentação (vivem nas definições). PRD responde
> *o que, para quem e por quê*, não *como*.

---

## 1. Propósito

Um site que abrigue três textos já escritos: dois cases e o "Quem sou eu", e que
funcione como portfólio para aplicação a vagas.

O site precisa estar no ar. Enquanto não está, os textos não existem para ninguém.

**O que o produto entrega:** a possibilidade de uma pessoa que nunca a viu entender, em
menos de um minuto, o que ela sabe fazer, e, se quiser ir fundo, ler um case inteiro sem
se perder.

**Quem assina:** Larissa Quadros, UX Designer, vinda da Engenharia Bioquímica.
Fonte: `quem-sou-eu.md`.

---

## 2. Problema

Três textos prontos e aprovados, nenhum lugar onde morem. A consequência prática é que
não dá para aplicar para vagas.

O risco mais comum em projeto de portfólio: o site ficar pronto esperando texto: **não
se aplica aqui**, porque os três textos estão escritos. Nenhuma fase depende de produção
de conteúdo escrito.

---

## 3. Para quem

Três pessoas, com necessidades diferentes e caminhos de entrada diferentes.

| Quem | Como chega | Quanto tempo dá | O que decide |
|---|---|---|---|
| **Quem faz triagem** | Pela home, quase sempre | Segundos | Se entende de imediato o que ela faz |
| **Quem avalia profundidade** | Lê um case inteiro | Minutos | Julgamento: como decidiu, do que abriu mão, o que deu errado |
| **Quem recebe o link de alguém** | Direto numa página interna, sem passar pela home | Variável | Se aquela página se explica sozinha |

**A terceira gera uma restrição estrutural, não uma preferência:** toda página precisa
funcionar sozinha, dizer quem ela é, o que é aquilo, e para onde ir em seguida.

### O que essas pessoas precisam conseguir fazer

1. Entender em segundos o que ela faz e para quem
2. Chegar aos trabalhos sem procurar, e escolher entre eles sem abrir os dois
3. Ler um case longo sem perder a noção de onde está nem de quanto falta
4. Pular para uma parte específica do case e voltar
5. Terminar um case e ir para o outro sem voltar ao índice
6. Avaliar profundidade sem precisar ler tudo
7. Saber quem ela é além do trabalho
8. Baixar o currículo
9. Falar com ela a partir de qualquer página, sem procurar
10. Compartilhar um link que faz sentido sozinho

Cada item acima é um requisito verificável. Se um deles falha, o produto falha.

---

## 4. Princípio que atravessa tudo: conforto de quem lê

Toda decisão de produto passa por aqui. Não é preferência estética; é o critério de
desempate.

- Tipografia grande, linha de leitura curta
- Contraste alto nos dois temas
- Nada se move sem o leitor pedir; quem desligou animações no sistema é respeitado
- Carregamento rápido em rede ruim
- Navegação sempre visível
- Botão de voltar do navegador funcionando
- Site inteiro navegável por teclado, com foco visível
- Nenhuma interação obrigatória para acessar conteúdo
- Nenhum aviso de consentimento na frente do conteúdo

---

## 5. Escopo

### Dentro

Cinco páginas mais a de erro:

| # | Página | Existe para | Decisão de produto que a define |
|---|---|---|---|
| 1 | **Home** | Fazer a pessoa querer ver os trabalhos | É capa, não resumo. Uma ação principal só: o caminho para os trabalhos é o elemento mais evidente da tela |
| | *Conteúdo da home* | | Nome **Larissa Quadros** (na barra: **Larissa**) · cargo **UX Designer** · frase *"Se existe uma forma melhor de fazer, eu quero descobrir qual é."* · parágrafo de abertura. Fonte: `quem-sou-eu.md`, marcados sob `# Home` |
| 2 | **Trabalhos** | Índice dos cases, em cards | Existe porque a home é capa e não lista, e porque é onde um terceiro case cabe sem redesenhar nada |
| 3–4 | **Cases** (dois, um por página) | Mostrar como ela trabalha | São o coração do site. A forma de conduzir o processo aparece dentro de cada etapa, como evidência, não como declaração à parte |
| 5 | **Quem sou eu** | Como ela pensa, decide e o que valoriza | Não é cronologia de emprego, isso fica no currículo em PDF |
| sem número | **Erro** | Devolver a pessoa para dentro do site | Página dentro da moldura do site, não a tela do servidor |

Mais: barra fixa com botão de contato · trilha de leitura nos cases · voltar ao topo ·
tema claro e escuro · português.

### Fora, e por quê

| Fora | Motivo |
|---|---|
| **Versão em inglês** | Primeira evolução após o lançamento. A estrutura nasce preparada, mas traduzir e revisar dois cases mais uma página é trabalho de conteúdo que não vale segurar a publicação. Tradução malfeita custa mais caro que ausência de tradução |
| **Terceiro case** | É este projeto, só pode ser escrito depois que o site existir. Sem card de "em breve" e sem menção à ausência em lugar nenhum: o case entra quando estiver pronto (decisão 053) |
| **Página de método separada** | Os cases mostram o método dentro de cada etapa, o que é mais forte que declarar em página própria |
| **Blog, CMS, animação elaborada, medição, qualquer coisa com backend** | Fora por natureza do produto |

**Sem medição no lançamento** é decisão consciente, não esquecimento: a maioria das
ferramentas exige aviso de consentimento, que brigaria com o conforto do leitor. Pode
entrar depois sem refazer nada.

---

## 6. Funcionalidades e o problema que cada uma resolve

| Funcionalidade | Resolve |
|---|---|
| **Barra fixa no topo** | "Falar com ela a partir de qualquer página, sem procurar" e "navegação sempre visível". Trabalhos vem em primeiro lugar porque é para onde o site quer levar |
| **Contato como botão, não item de menu** | Navegação diz *para onde ir*; contato diz *o que fazer*. Misturar faz o contato competir por atenção com os cases. É e-mail e LinkedIn, sem formulário, que em site estático exige serviço de terceiro e vira ponto de falha sem ganho |
| **Card de case** | "Escolher entre os trabalhos sem abrir os dois". Cada card paga o clique que custa: capa, título e uma linha com a tensão ou o resultado, nunca a categoria do produto. Clicável inteiro |
| **Tira de destaques do case** | Papel, método, entregas, status, repositório. É o elemento mais escaneável do case e, para quem faz triagem, pode ser o mais útil da tela inteira |
| **Trilha lateral** | "Não perder a noção de onde está nem de quanto falta" e "pular para uma parte e voltar". Dá as duas informações ao mesmo tempo. Marcador acompanha a leitura sozinho; cada item é clicável |
| **Card do próximo case** | Quem terminou de ler está no pico de interesse e não deveria voltar ao índice. O objetivo é que ninguém leia só um |
| **Convite ao contato no fim do case** | Mesmo motivo: momento de maior interesse |
| **Voltar ao topo** | Leitura longa. Discreto, aparece só depois que a rolagem começa |
| **Tema claro e escuro** | Conforto de leitura. Abre sempre no claro; o controle na barra troca para o escuro (decisão 234) |
| **Currículo em PDF** | "Baixar o currículo", e tira a cronologia de emprego do site |

---

## 7. Conteúdo

O conteúdo vive em arquivos de texto, fora do código. **Atualizar uma página é editar um
arquivo de texto.**

| Arquivo | Contém | Estado |
|---|---|---|
| `case-study-financas-pf-pj.md` | Case de Finanças | Escrito e aprovado |
| `case-study-reembolso-sulamerica.md` | Case de Reembolso | Escrito e aprovado |
| `quem-sou-eu.md` | Página "Quem sou eu" **e os textos da home**, marcados dentro do arquivo | Escrito e aprovado |

**A home não tem arquivo próprio** porque é capa, não página de conteúdo: são quatro
linhas que mudam junto com a forma como ela se apresenta, e separá-las criaria um arquivo
de três frases para manter.

**Os rótulos da trilha vivem dentro dos arquivos dos cases**, como comentário abaixo de
cada título de capítulo: junto do capítulo a que pertencem, para que um erro de ordem
seja impossível de não ver.

**O site não inventa conteúdo.** Tudo que aparece na tela veio de um desses arquivos ou
está escrito no contrato de comportamento. Peça esperada que não está no arquivo tem
comportamento decidido no domínio *Conteúdo*, não improvisado na hora.

---

## 8. Mídia nos cases

**Imagem de processo, não só tela final.** Fluxos com legenda, mapeamento anotado,
avaliação heurística, biblioteca de componentes, tokens com proveniência, wireframe em
cinza ao lado do mockup colorido.

**Cada imagem precisa provar uma afirmação do texto**, e a legenda carrega o detalhe que
o texto abriu mão de contar. Imagem que não prova nada vira galeria, e galeria ninguém
olha.

**O produto de Finanças não se linka, se mostra.** É aplicativo local, sem login, não há
URL para visitar. No lugar: capturas do produto rodando de verdade e um vídeo curto dele
em uso, ao lado dos mockups correspondentes. Mockup e produto funcionando lado a lado é a
prova mais forte disponível neste portfólio. O link verificável é o repositório.

**Botão de protótipo** em cada case, abrindo em nova aba, com rótulo que avisa que a
pessoa vai sair do site.

---

## 9. Requisitos não funcionais

| Requisito | Critério verificável |
|---|---|
| **Celular em primeiro lugar** | Nenhuma rolagem horizontal, nenhum texto cortado, nenhum alvo pequeno demais |
| **Desempenho** | Primeira leitura possível em menos de 2,5 s no celular, em rede móvel comum. Imagens em formato moderno, dimensionadas para o tamanho em que aparecem, carregadas sob demanda fora da primeira tela |
| **Acessibilidade** | WCAG AA. Contraste ≥ 4,5:1 em texto e ≥ 3:1 em elemento interativo, **nos dois temas**. Foco sempre visível. Toda imagem com texto alternativo. Alvo de toque ≥ 44 px |
| **Temas** | Claro e escuro, com tokens nomeados por papel e não por cor. Padrão segue o sistema; controle na barra sobrescreve. O claro usa fundo cinza claro, não branco puro |
| **Construído por camadas** | O HTML entrega o produto inteiro: textos, imagens, navegação, âncoras da trilha, contato e o tema do sistema. O JavaScript acrescenta só a troca manual de tema, a trilha que se marca sozinha e o zoom da imagem. Sem script, perdem-se conveniências, não conteúdo. ver decisão 005 |

**O escuro não é o claro invertido.** Os dois modos foram escolhidos e verificados em
separado; nenhum valor de um deriva automaticamente do outro.

---

## 10. Comportamento em tela pequena

Construído para tela estreita desde o começo, não adaptado depois. **Não existe fase de
mobile.**

- **A trilha lateral não cabe.** Vira faixa fina de progresso abaixo da barra do topo,
  tocável para abrir a lista completa de etapas
- **A tira de destaques empilha.** Ela fica no topo do case, abaixo do título e da frase de
  abertura, e é o elemento mais escaneável da página: para quem faz triagem rápida, pode
  ser o mais útil da tela inteira
- **A barra do topo** decide o que fica visível e o que vai para menu, sem espremer a
  ponto de matar a legibilidade que é o ponto dela. Mínimo visível: nome e Trabalhos
- **Imagem de desktop em tela de celular.** Os dois cases pedem tratamentos diferentes.
  Reembolso mostra telas de celular, que aparecem bem num celular. Finanças mostra telas
  de desktop largas: reduzidas à largura de um telefone viram mancha ilegível, e são
  justamente a prova visual do trabalho. A imagem abre sob toque, em visualizador com
  zoom, e o texto em volta carrega o que a miniatura não entrega. Onde o ponto for um
  componente e não o conjunto, vale recorte de detalhe em vez da tela inteira

---

## 11. Direção visual

**Contenção.** Tipografia e cor fazem o trabalho, e fazem sozinhas. Sem sombra, sem
gradiente, sem ornamento.

> Um site visualmente ambicioso contradiria o que os cases dizem sobre método e critério.
> O que ele pode ser é confiante na tipografia: coisa diferente.

- **A trilha é o único elemento gráfico distintivo do site**, e existe por função, não
  por decoração
- **A riqueza visual vem das imagens dos cases.** O site é moldura; o trabalho é o quadro
- **Cor é exceção, e exceção precisa de motivo.** Entra em cinco lugares (estado e
  interação, identidade do case, bloco de destaque, marca-texto da hero, imagem) e em
  nenhum outro. Se a cor sair e a tela continuar dizendo a mesma coisa, ela não deveria
  estar lá
- **Cor não julga.** Nada é vermelho por ser ruim nem verde por ser bom

### As regras de uso não moram aqui

Bloco colorido como pontuação, o marca-texto uma vez por página, tom pálido como superfície
e tom forte como detalhe, foco visível no acento da página, medida de linha, grade de doze
colunas, escala de espaço: **tudo isso vive no documento de definições**, que é a fonte.

Repeti-las aqui criaria a segunda fonte de verdade que o projeto existe para evitar, e foi
exatamente o que aconteceu até 19/09/2026, quando a duplicação foi encontrada e desfeita
(decisão 017).

**Uma cor por case**, atribuída uma vez e nunca escolhida no momento de montar a página:
Finanças azul, Reembolso laranja, sistema roxo. Verde e rosa reservados para um terceiro
case.

**Os valores visuais não estão neste documento.** Vivem em variáveis no Figma, página
*Sistema visual*: <https://www.figma.com/design/hwClE9Xpm51OW4vPsCCn8J/?node-id=34-2>

Nenhum valor visual é digitado à mão no código sem vir de uma das coleções de variáveis.
Valor necessário que não existe lá é lacuna, e lacuna vira pergunta, não suposição.

---

## 12. Dependências

Os três textos estão prontos. O que falta abaixo **trava a publicação se ficar para o
fim**, é dependência, não acabamento:

- [ ] Currículo em PDF
- [ ] Foto para a página "Quem sou eu"
- [ ] Imagens dos dois cases: telas finais e artefatos de processo, cada uma com legenda
- [ ] Imagens de capa dos cards
- [ ] Capturas do produto de Finanças rodando, e vídeo curto dele em uso
- [ ] Protótipos com link público conferido
- [ ] Domínio
- [ ] Imagem de compartilhamento e descrições de página

---

## 13. Sequência

**Não há cronograma: há ordem.** Prazo não existe; sequência existe.

| Fase | Entrega |
|---|---|
| **0 · Instrumentação** | Repositório, estrutura de pastas, log, perguntas em aberto, playbook vazio, contrato vazio com índice de domínios. Nada de código |
| **1 · Decidir antes de desenhar** | Frase da home · stack e hospedagem, com alternativa e motivo · como o texto vira página · como a estrutura recebe um segundo idioma · o que fica na barra em tela estreita · como os tokens do Figma entram no código |
| **2 · Design system no Figma** | Componentes com variantes e estados, a partir das variáveis existentes |
| **3 · Telas no Figma** | Um domínio por vez, cada tela nas duas larguras e nos dois temas |
| **4 · Código** | **Primeiro passo: publicar uma página vazia**: o caminho até o deploy precisa funcionar antes de existir conteúdo. Depois, um domínio por vez, na ordem em que foram desenhados |
| **5 · Teste e correção** | Três ou quatro pessoas, uma tarefa cronometrada. Mais checagem técnica: carregamento em rede móvel, teclado, contraste nos dois temas |
| **6 · Publicar** | Domínio próprio, descrições de página, imagem de compartilhamento, link no LinkedIn e no currículo |

**Depois:** versão em inglês · terceiro case, escrito a partir do log · rodada de
pesquisa mais profunda no produto de Finanças.

---

## 14. Critérios de liberação

O site está pronto quando, e não antes:

- [ ] Está no ar, em domínio próprio
- [ ] Funciona bem no celular: sem rolagem horizontal, sem texto cortado, imagens dos
      cases legíveis ou abríveis com zoom
- [ ] Carrega rápido no celular, em rede móvel
- [ ] Dá para navegar o site inteiro só pelo teclado, com foco sempre visível
- [ ] Funciona nos dois temas, com contraste verificado nos dois
- [ ] Uma pessoa que nunca a viu consegue dizer o que ela faz em menos de um minuto
- [ ] Os dois cases estão completos, com imagens de processo legendadas e links de
      protótipo funcionando
- [ ] Qualquer página aberta direto, sem passar pela home, se explica sozinha
- [ ] O log tem entradas reais, feitas no momento em que cada decisão aconteceu

**Nada além disso segura a publicação.** O resto é iteração depois do ar.

---

## 15. Como saber se funcionou

| Quando | Sinal |
|---|---|
| **Antes de publicar** | Três ou quatro pessoas que recrutam ou lideram design dizem o que ela faz em menos de um minuto, sem ajuda |
| **Depois de publicar** | Alguém mencionar um case específico sem ela ter apontado: sinal de que o site está fazendo o trabalho sozinho |

---

## 16. Riscos

| Risco | Contenção |
|---|---|
| **Escopo crescendo** | Portfólio se expande para sempre, e cada item novo parece pequeno sozinho. A lista de escopo existe para essa conversa não ser reaberta a cada ideia |
| **Polir em vez de publicar** | Site que não está no ar não é portfólio. Se um item não está na definição de pronto, não segura a publicação |
| **Documentação virando objetivo** | Se uma decisão for tomada pensando em como vai ler no case, a ordem inverteu. A documentação é regra de trabalho, não objetivo |
| **Conteúdo travando a construção** | Currículo, foto, imagens e capas são dependência, não acabamento. Produzir cedo |
| **Desenhar tudo antes de publicar qualquer coisa** | Custo de desenhar primeiro: nada no ar por um tempo longo, e problema de implementação só aparece no fim. Reduzido por duas coisas: deploy é a primeira tarefa da fase de código, mesmo com página vazia, e o design system vem antes das telas |

---

## 17. Decisões em aberto

As que **travam** a Fase 1, nas palavras do próprio documento de definições:

- `[?: stack e hospedagem, com alternativa considerada e motivo registrados]`
- `[?: como o conteúdo em texto vira página]`
- Segundo idioma: inglês, sob `/en/`, com o contrato `idioma/segundo-idioma.md` (decisão 242).
- `[?: o que fica visível na barra em tela estreita, além do mínimo já definido, nome e Trabalhos]`
- `[?: como os tokens do Figma entram no código, em um único lugar de onde tudo deriva]`

Ausentes do documento de definições, e necessárias para o site existir:

**Espera**, classificada segundo a regra das definições:

- `[?: qual domínio]` · **Deixa de poder esperar:** antes da Fase 6 · Publicar.
  Comprar leva minutos, mas a propagação de DNS e a emissão do certificado levam horas.
  Publicar em endereço provisório na Fase 4 e apontar o domínio depois não gera
  retrabalho: por isso espera, e não trava.

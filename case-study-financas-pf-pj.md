# Case Study: Finanças PF+PJ

<!-- bloco: card -->
# A planilha que virou produto
Desenvolvi uma aplicação desktop para organização financeira para pessoas PF+PJ.

<!-- bloco: case -->

## 1. A ideia
<!-- trilha: Introdução -->

<!-- bloco: hero -->
# A planilha que virou produto

**Vi alguém tentando encaixar a vida financeira pessoal e a da empresa na mesma planilha. Decidi transformar essa cena em um aplicativo desktop. Hoje: funcionando e em uso por uma pessoa real.**

**Papel** · Product/UX Designer, presente da descoberta ao código

**Escopo** · Ideia → documento de produto → modelagem de domínio → fluxos → wireframes → design system → mockups → desenvolvimento

**Entregas** · 26 telas em claro e escuro, 24 estados vazios, design system com 11 componentes e 16 ícones, 9 documentos de design

**Status** · Em uso, sendo testado por um usuário real

**Repositório** · Projeto inteiro aberto, do documento de produto às regras de implementação, [link](https://github.com/lariquadrinhos/case-financas)

Estive em todas as etapas, da primeira conversa até o código: defini o problema, modelei o domínio, desenhei o produto inteiro, construí o design system e segui na implementação ao lado de um desenvolvedor, aprendendo versionamento e programação assistida por IA no caminho.

A entrega final foi além das telas: mantive um repositório com a documentação de todo o processo, em que cada decisão ficou registrada junto do raciocínio que a sustentava. Foi o que permitiu a informação atravessar as etapas sem se perder e chegar inteira ao desenvolvimento.

![Gravação do aplicativo em uso, com dados de demonstração. A tela inicial mostra as pendências do mês. O cursor entra no DRE pela barra lateral e alterna entre PF, PJ e Consolidado: o mesmo mês em três leituras, com números diferentes em cada uma. Depois abre Indicadores Financeiros e volta de outubro para setembro, e termina no Histórico, filtrado por lançamentos pagos na categoria Alimentação, mês a mês desde maio.](publico/midias/financas-1-produto-em-uso.mp4)
Legenda: Gravado numa janela mais estreita que a de 1440 em que as telas foram desenhadas, com dados de demonstração.

---

## 2. Ensinei a ferramenta antes de usá-la
<!-- trilha: Descoberta -->

**Antes de abrir qualquer ferramenta de design, eu defini o método.**

Conduzi o projeto inteiro com IA, e a primeira coisa que construí não foi uma tela: foi uma skill. Um conjunto de instruções reutilizável que ensinava o Claude a conduzir qualquer etapa seguinte, do brainstorming à modelagem de domínio. Apoiei essa skill em frameworks de estruturação de incerteza e formulação de perguntas, e fixei nela uma regra inegociável: nenhuma lacuna de informação é preenchida por suposição.

Com o método de pé, dirigi a construção do documento de produto a partir de duas fontes: um documento de brainstorming e a planilha que o usuário já usava. Pedi a leitura das fórmulas da planilha, não só dos valores visíveis. Essa instrução fez aparecer a lógica de negócio que a planilha já tinha.

Com as regras estáveis, pedi a tradução do documento para um modelo formal de domínio: eventos, comandos, políticas e agregados. Onde havia tensão sem resposta certa ainda, instruí que ficasse marcada como hotspot em vez de decidida no automático.

![Dois trechos de arquivos do projeto. Na skill loop-produto, a diretriz nunca assuma premissas: tornar explícitas as lacunas de conhecimento em vez de preenchê-las por conta própria, com os quatro quadrantes, de known knowns a unknown unknowns. No event storming, o começo da tabela de hotspots, com H4 fechado por ADR e H5 modelado e não testado.](publico/midias/financas-2-descoberta.png)
Legenda: A regra na skill, e as dúvidas que ela transformou em hotspots.

---

## 3. O Figma era metade da entrega
<!-- trilha: Desenho e documentação -->

**Com o modelo de negócio validado, passei de "o que o sistema faz" para "o que a pessoa vê".**

Comecei pelo fluxo do usuário: mapeei o caminho completo, do primeiro acesso até as ações do dia a dia. Assim desenhei cada tela sabendo por que ela existia e o que vinha antes e depois dela.

Desenhando os wireframes, apareceram mais decisões. Toda vez que uma tela levantava uma pergunta de comportamento, eu registrava a pergunta, a resposta e o raciocínio por trás dela, na ordem em que aconteceram. Esse hábito virou um documento: um histórico cronológico do porquê de cada tela ser do jeito que é.

E a documentação virou artefato de handoff. Para cada tela, escrevi a especificação funcional separada do desenho visual, o modelo de dados exato de cada campo, e um glossário fechado de nomenclatura. A meta era simples: quem fosse implementar não deveria precisar me perguntar nada que já não estivesse escrito.

Parte da interface é gerada a partir do dado. Então documentei também as regras de renderização: o algoritmo por trás do desenho. Sem isso, quem fosse programar teria que inventar comportamento para cada caso extremo.

![O Novo Lançamento em três trechos. No fluxo do FigJam, ele leva às quatro abas e a Salva, sucesso. No wireframe da aba Despesa, a data já vem preenchida com hoje, o status Pago e a entidade PF já vêm selecionados, e há um campo para buscar ou criar categoria. Na especificação, linhas 125 a 132, os mesmos campos: data pré-preenchida com hoje, padrão Pago, padrão PF, e categoria nova sem sair do formulário.](publico/midias/financas-3-desenho.png)
Legenda: O Novo Lançamento no fluxo, no wireframe e na especificação.

---

## 4. O escuro não é o claro invertido
<!-- trilha: Design system -->

**Antes de aplicar qualquer visual definitivo, construí o sistema.**

Uma coleção fechada de tokens de cor nomeados por papel semântico, cada um com valor próprio para o tema claro e para o escuro. Junto, escalas de tipografia, espaçamento e raio, e uma biblioteca de componentes documentada com cada variante e cada estado.

E foi só vendo a cor na tela real que decisões novas apareceram. O par de cores que distingue pessoa física de pessoa jurídica passava no contraste no tema claro e reprovava no escuro. Corrigir exigiu matizes diferentes por tema, não um ajuste automático. Tema escuro não é inversão: é um segundo sistema, e precisa ser validado sozinho.

![O card de lucro por entidade do mockup da Evolução Mensal, no tema claro e no escuro, com as barras de PF e PJ. Embaixo, o contraste de cada cor contra o card, com mínimo de 3:1: no claro, PF 4,56 e PJ 5,99; no escuro com as cores do claro, PJ cai para 2,89 e reprova; com as cores corrigidas, PF 5,80 e PJ 5,13.](publico/midias/financas-4-design-system.png)
Legenda: O par PF/PJ nos dois temas: no escuro, o roxo do claro reprovava.

---

## 5. Cem agentes conferindo o meu desenho
<!-- trilha: Desenvolvimento -->

**Entreguei o design e continuei junto.**

Construí o produto ao lado de um desenvolvedor e do Claude: backend completo, banco de dados, contrato de API e centenas de testes automatizados, tela por tela, fiel ao que eu tinha desenhado e documentado.

No fim, uma auditoria de fidelidade. Mais de cem agentes de IA rodando em paralelo, cada um cruzando uma tela implementada contra o frame real no Figma, mostrou o tamanho do que a documentação sustentava sozinha. Com tudo já especificado antes, a implementação só precisou seguir.

---

## 6. O que ficou
<!-- trilha: Resultados -->

**O produto existe, funciona e está em uso.**

Aprendi a decidir o que as coisas são, e sustentar essa decisão em cada tela depois. Aprendi a escrever para quem vem depois de mim, e descobri que documentar bem é o que faz o design sobreviver ao contato com a implementação. E aprendi que trabalhar com IA se decide antes, não depois: o que define a qualidade do que volta é a regra que eu estabeleci no começo, não a minha avaliação de cada resposta. Sem ela, qualquer resultado plausível passa.

<!-- bloco: par -->
![A Home do produto rodando, com dados de demonstração: o quadro Onde Está Meu Dinheiro, com as contas em blocos do tamanho do saldo, as dívidas logo abaixo e o patrimônio líquido no rodapé, e o quadro Despesas por Categoria, com os gastos do mês em blocos.](publico/midias/financas-6-produto-home.png)
![A Evolução Mensal do produto rodando, com dados de demonstração: o gráfico Lucro Líquido por entidade, com uma barra por mês de maio a outubro e o valor de outubro, R$ 6.530, em destaque; embaixo, o começo da tabela mês a mês, com receita, EBITDA e lucro líquido.](publico/midias/financas-6-produto-evolucao.png)
Legenda: A Home e a Evolução Mensal no produto, já com as melhorias que vieram dos testes de uso.

<!-- bloco: provas -->
As decisões de UX, a especificação de cada tela e o modelo de dados
[Ver o repositório](https://github.com/lariquadrinhos/case-financas)

As 46 telas em claro e escuro, o style guide e os tokens
[Ver o arquivo no Figma](https://www.figma.com/design/7IZBeQV15kgZp7Shcqh4c8)

O fluxo do usuário mapeado, do primeiro acesso às ações do dia a dia
[Ver o fluxo no FigJam](https://www.figma.com/board/6cLvP3Mwhy4yWGLJBDsp3z)

<!-- bloco: extra -->
## O Produto

Quem tem pessoa jurídica além da física não tem uma vida financeira: tem duas. Misturadas na
mesma planilha podem virar uma bagunça.

Essa aplicação é um único livro-razão com três leituras. Cada lançamento é registrado uma vez e
alimenta o Consolidado, o PF e o PJ ao mesmo tempo. Sem dados duplicados.

O resultado fecha em regime de caixa e já mostra meses futuros **sem precisar simular nada**: o
que já está agendado (recorrência, parcela de dívida) já é a projeção. Toda divergência entre
previsto e pago vira um item de **Pendências**, a caixa de entrada única de tudo que exige decisão.

Nada fica escondido em menu. Uma barra lateral concentra o produto inteiro: lançar algo novo, os
quatro relatórios (DRE, Balanço, Evolução Mensal, Indicadores), Revisão de Recorrentes, Histórico,
Plano de Contas. A Home é uma central de comando que a pessoa organiza do seu jeito: reordena e
minimiza cada card, e o layout fica salvo. Lançar uma receita ou despesa é um clique em "+ Novo
Lançamento", de qualquer tela.

No card de **Pendências** a pessoa vê tudo que precisa de uma decisão. Cada item com o
verbo certo: Direcionar, Alocar, Revisar, Pagar. "Onde Está Meu
Dinheiro" e "Despesas por Categoria" são **treemaps interativos**: tamanho do bloco é valor, clicar
abre o detalhe e permite **redirecionar dinheiro na hora**.
Todo relatório navega mês a mês, com Consolidado/PF/PJ e Pago/Previsto sempre à vista, nunca atrás
de um filtro escondido.

**Consumo Livre** foi pensado para quem quer ter um dinheiro livre para gastar como quiser sem rótulo.
Um clique, só o valor. Sem categoria, sem conta, sem data.
**Entradas e Saídas** mostra de onde veio e pra onde foi o dinheiro do mês, linha a linha. E todo
pagamento, reajuste ou divergência gera um **Evento** automático.

O visual é calmo por decisão, não por acaso. A hierarquia de cada tela segue a informação que o
próprio dado já carrega. O design não briga com o número, ele organiza em cima do que o número já
diz. Com tanta tabela e gráfico juntos, sobrecarga visual era o risco real; o que importa ganha
destaque discreto, nunca um destaque que cansa. E nenhuma cor assume positivo ou negativo sozinha.
Julgar o número é decisão de quem olha.

A profundidade é de ferramenta financeira de verdade: cronograma de amortização com reajuste de
juros recalculando só o que ainda não venceu, venda de bem dividida entre vários destinos, 18
indicadores financeiros, recorrência com parcelamento propagada automaticamente mês a mês. Tudo
local, sem login, sem fricção de conta.

---


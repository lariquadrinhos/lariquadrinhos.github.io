# Log de decisões: Portfólio

> Registro cronológico. Cada entrada foi escrita no momento em que a decisão aconteceu.
> Entrada nunca é editada depois: decisão que mudou ganha entrada nova, que cita a anterior.
> Este documento não manda em nada: é memória, não fonte. O que vale hoje está nas
> definições e no contrato.

---

## 001 · Manter um log de decisões, em arquivo único e cronológico

**Quando** 2026-09-18 · **Fase** 0 · **Domínio**, · `#escopo`

**Gatilho.** O projeto começou a produzir decisões antes de existir qualquer lugar para
registrá-las. Quatro já tinham acontecido sem registro.

**Decisão.** Manter um log cronológico, arquivo único, entradas numeradas e imutáveis,
escritas no momento em que a decisão acontece.

**Alternativa descartada.** Não manter log e confiar no histórico do Git. Perdeu porque
o Git registra o que mudou, não o que foi considerado e descartado, e a alternativa
descartada é justamente o campo que dá valor ao registro.

**Custo aceito.** Atrito em cada decisão, e um arquivo que cresce sem nunca encolher.
O atrito é reduzido pela skill escrever a entrada e Larissa só confirmar.

**Consequência.** Diretriz 9 das diretrizes passa a apontar para este arquivo.

---

## 002 · Os briefings prevalecem sobre a skill loop-produto na estrutura de documentos

**Quando** 2026-09-18 · **Fase** 0 · **Domínio**, · `#escopo`

**Gatilho.** Duas estruturas de documentação incompatíveis, ambas escritas por Larissa:
a skill `loop-produto` do projeto bigorna prescreve `/docs/prd/`, `/docs/adr/` e
`/docs/specs/`; os briefings deste projeto prescrevem `docs/comportamento/` e `docs/spec/`.
A colisão perigosa era `docs/specs/` contra `docs/spec/`: nomes quase idênticos, conteúdos
sem relação.

**Decisão.** A estrutura dos briefings vale. `docs/adr/` e `docs/specs/` foram apagados.

**Alternativa descartada.** Manter as duas, como sugerido inicialmente por Larissa. Perdeu
por dois motivos: `docs/spec/` e `docs/specs/` conviverem seria a colisão que ninguém
percebe até errar; e o log já é um conjunto de ADRs (entradas numeradas, imutáveis, com
alternativa descartada) acrescido da ordem cronológica, que o ADR não tem. Um terceiro
lugar para a mesma decisão contraria a regra de trabalho 2, que prevê dois.

**Custo aceito.** Perde-se o índice por decisão: para saber por que X foi escolhido, lê-se
o log em vez de abrir um arquivo. Mitigado porque o contrato responde "qual é a regra hoje",
que é a pergunta mais frequente.

**Consequência.** `docs/adr/` e `docs/specs/` removidos. Diretriz 9 reescrita. A skill
`loop-produto` não é copiada para este projeto enquanto prescrever a estrutura antiga.

---

## 003 · O card do próximo case é circular, sem exceção no último

**Quando** 2026-09-18 · **Fase** 0 · **Domínio** case · `#escopo`

**Gatilho.** O event storming perguntou o que o card ao fim do segundo case oferece, já que
o site nasce com dois. Parecia oferecer algo já lido.

**Decisão.** O card de cada case aponta para o outro. Não há caso especial para o último.

**Alternativa descartada.** Levar ao índice de Trabalhos, ou fazer o card sumir no último
case. Perderam quando ficou claro que um dos três públicos chega direto numa página interna
por link compartilhado: para quem cai no segundo case sem passar pela home, o card
circular aponta para conteúdo novo, não repetido. As duas alternativas também criariam uma
exceção no componente, contra a promessa de que um terceiro case cabe sem redesenhar nada.

**Custo aceito.** Quem leu os dois na ordem recebe, ao fim, a oferta do que acabou de ler.

**Consequência.** `docs/comportamento/case/card-proximo-case.md` criado. Abre uma lacuna
nova: com três cases, a ordem do "próximo" não está definida, marcada no contrato, sem
travar.

---

## 004 · O botão de contato revela o e-mail escrito, em vez de disparar mailto

**Quando** 2026-09-18 · **Fase** 0 · **Domínio** moldura · `#recusa-de-ia`

**Gatilho.** As definições dizem que contato é e-mail e LinkedIn e que o botão dispara a
ação direto, mas são dois destinos e uma ação só.

**Decisão.** O botão fica à direita da barra, como definido, e ao ser acionado revela o
endereço `llquadros95@gmail.com` escrito por extenso, copiável, com o LinkedIn ao lado.

**Alternativa descartada.** Duas. Disparar `mailto:` direto e deixar o LinkedIn em "Quem
sou eu", perdeu porque `mailto:` sem cliente configurado falha calado, e o público de
triagem costuma estar no computador, em webmail. E a proposta de Larissa de deixar o e-mail
visível ao lado do nome na barra: perdeu por três motivos: não cabe em tela estreita sem
truncar, o que torna o endereço inútil; tornaria o contato a informação mais destacada de
toda página, contra a regra de que contato não deve competir com os cases; e ocuparia mais
espaço horizontal que "Trabalhos" e "Quem sou eu" somados.

**Custo aceito.** Um toque a mais que a versão com o e-mail sempre visível, e um componente
novo a desenhar.

**Consequência.** `docs/comportamento/moldura/botao-contato.md` criado. A lacuna do
comportamento em tela estreita aponta para a pergunta P10.

---

## 005 · O site é construído por camadas: HTML entrega o produto, JavaScript acrescenta

**Quando** 2026-09-18 · **Fase** 1 · **Domínio**, · `#restricao`

**Gatilho.** O event storming levantou duas perguntas que travavam a escolha de stack:
o que acontece sem JavaScript, e como aplicar o tema certo antes da primeira pintura sem
contrariar a regra de que o conteúdo não depende de script.

**Decisão.** O HTML entrega o produto inteiro: textos, imagens, navegação, âncoras da
trilha, contato, e o tema seguindo a preferência do sistema. O JavaScript acrescenta três
coisas e só elas: a troca manual de tema com memória, a trilha que se marca sozinha ao
rolar, e o visualizador de imagem com zoom. Sem script, o site perde essas conveniências
e não perde nada do produto.

**Alternativa descartada.** Montar a página no navegador, como faz a maior parte das
ferramentas atuais. Perdeu por dois motivos. O primeiro é a regra já escrita nas
definições: conteúdo legível sem depender de script. O segundo é mais forte e não é sobre
quem desliga JavaScript: é que todo visitante passa pelo momento em que o script ainda
não chegou. Com a exigência de primeira leitura em menos de 2,5 segundos em rede móvel, o
relógio só para quando o texto aparece; se ele depender de script, começa depois do
download e da execução.

**Custo aceito.** A trilha não marca sozinha e o tema não troca manualmente quando o
script falha. Duas conveniências perdidas, nenhuma informação.

**Consequência.** Elimina de saída qualquer stack que renderize no navegador: restam
gerador de site estático e HTML escrito à mão, o que estreita a pergunta P05.
`docs/comportamento/tema/tema-claro-e-escuro.md` criado. Resolve a tensão da P01: o script
de tema é bloqueante mas falha em segurança, caindo na preferência do sistema.

---

## 006 · Os arquivos de conteúdo seguem uma convenção declarada, em vez de o site se adaptar a eles

**Quando** 2026-09-18 · **Fase** 1 · **Domínio** conteudo · `#restricao`

**Gatilho.** A medição dos três arquivos encontrou cinco inconsistências estruturais:
duas grafias de "Texto para o card", `#` significando coisas diferentes em arquivos
diferentes, `##` ora capítulo ora subseção, um `##` sobrando no fim de um título, e uma
seção de anotação interna sem nada que a marcasse como não publicável.

**Decisão.** Uma convenção declarada, com uma regra única: **marcador é comentário HTML,
título é conteúdo.** Os três arquivos foram normalizados, só marcadores, nenhuma palavra
de prosa alterada.

**Alternativa descartada.** A construção tolerar as variações: aceitar as duas grafias,
tratar `##` por posição, ignorar a seção chamada "Notas de trabalho" pelo nome. Perdeu
porque "ignora a seção chamada Notas de trabalho" não é regra verificável: é exceção com
nome próprio, que quebra no dia em que o título virar "Notas finais". E porque daqui a três
meses a edição será feita por uma pessoa lendo o arquivo, não por um analisador adivinhando.

**Custo aceito.** Arquivos aprovados foram editados. O risco foi contido restringindo a
mudança a marcadores e a um `##` sobrando; nenhuma frase mudou.

**Consequência.** `docs/comportamento/conteudo/arquivo-de-texto-vira-pagina.md` criado.
Abre a pergunta P22, sobre o bloco "O Produto". Requisito novo para a stack: a ferramenta
precisa ler comentários HTML como marcadores estruturais.

---

## 007 · O mecanismo de exportação dos tokens não se decide agora

**Quando** 2026-09-18 · **Fase** 1 · **Domínio**, · `#recusa-de-ia` `#reversao`

**Gatilho.** Larissa interrompeu a discussão sobre como exportar as variáveis do Figma:
o design system ainda não existe, e decidir a exportação antes de haver o que exportar é
decidir no vazio.

**Decisão.** A P07 se divide. O **princípio** fica decidido agora, porque restringe o
resto: os valores descem das variáveis, o nome é preservado (`bg/page` → `--bg-page`,
barra vira hífen e nada mais muda), e existe um único lugar de onde tudo deriva. O
**mecanismo** (transcrição, exportação para arquivo, ou leitura pela API na construção)
fica para depois da Fase 2, quando o design system estiver fechado no Figma.

**Alternativa descartada.** Fechar o mecanismo agora, como eu vinha propondo. Perdeu
porque a escolha depende do que o design system for quando existir (quantas coleções,
quantos componentes, com que frequência muda) e nenhuma dessas informações existe hoje.

**Custo aceito.** Nenhum identificado. A P07 também não era bloqueio da stack, ao
contrário do que eu havia classificado: qualquer gerador de site estático consome um
arquivo CSS gerado, então ela não elimina candidato nenhum.

**Consequência.** P07 sai de "travam" para "esperam", com momento "depois da Fase 2".
A P05 deixa de esperar por ela. O inventário em `docs/spec/README.md` passa a valer como
retrato de um sistema incompleto, não como especificação fechada.

**Correção de rota minha**, não dela: eu li "como os tokens entram no código" na Fase 1
como escolha de ferramenta, quando o que está escrito é princípio.

---

## 008 · Os números de ritmo ficam no documento; só os valores de token vivem no Figma

**Quando** 2026-09-18 · **Fase** 1 · **Domínio**, · `#reversao`

**Gatilho.** A revisão encontrou uma contradição no documento de definições: ele afirma
duas vezes não conter nenhum valor visual (*"este documento não tem nenhum, de
propósito"*) e contém 96 entre capítulos, 28 entre parágrafos, 8 ou 12 dentro de um
bloco, grade de 12 colunas, margem de 80 e medida de linha entre 65 e 75 caracteres.

**Decisão.** A frase muda; os números ficam. O documento passa a distinguir duas perguntas:
*"quanto vale?"* é do Figma, hex, tamanho de fonte, entrelinha, quanto mede `space/96`.
*"quanto disso, e onde?"* é do documento: espaço entre capítulos, colunas da grade,
caracteres por linha.

**Alternativa descartada.** Levar os números de ritmo para o Figma, para que a afirmação
original ficasse verdadeira. Perdeu porque eles não são valores: não definem token nenhum,
escolhem qual token se aplica onde. Levá-los para variáveis criaria tokens sem papel
semântico: `espaco-entre-capitulos` seria um apelido de `space/96`, e apelido de token é
a duplicação que a separação existe para evitar.

**Custo aceito.** A regra de fronteira deixa de caber numa frase e passa a exigir duas.
Alguém com pressa pode ler o documento e achar que ele contradiz a si mesmo: agora a
distinção está escrita, mas precisa ser lida.

**Consequência.** `_privado/definicoes-produto-portfolio.md` alterado em três pontos, na
seção *Especificação visual*. As sete regras acrescentadas ao PRD nesta mesma revisão
passam a ter fundamento explícito: elas citam números de ritmo, não valores.

---

## 009 · A stack é HTML e CSS próprios, com uma construção escrita por nós, sem framework

**Quando** 2026-09-18 · **Fase** 1 · **Domínio**, · `#restricao`

**Gatilho.** A P05 era a última pergunta travando. Os requisitos vinham acumulados de
decisões anteriores: HTML completo na construção, script curto e bloqueante no `<head>`,
leitura dos marcadores próprios, três arquivos de conteúdo sem frontmatter, CSS gerado,
hospedagem estática.

**Decisão.** HTML e CSS escritos por nós, com uma etapa de construção própria que lê os
três arquivos de conteúdo e gera as páginas. Sem framework. A construção existe porque a
regra é que atualizar uma página seja editar um arquivo de texto, sem ela, editar uma
página seria editar HTML.

**Alternativa descartada.** Astro, que eu havia recomendado, e Eleventy. O argumento que eu
usei a favor do Astro era a otimização de imagem, e ele caiu quando ficou claro que o
conjunto de imagens dos cases é **fixo**, preparado uma vez, não gerado a cada construção.
O que sobrou do outro lado pesou mais: a convenção de marcadores é própria, então o código
de leitura seria nosso em qualquer opção; são cinco páginas e três arquivos; e um framework
esconderia justamente a parte que o terceiro case existe para mostrar.

**Custo aceito.** Imagens responsivas e pré-visualização durante o desenvolvimento passam
a ser trabalho nosso. Nenhum dos dois é difícil neste tamanho, mas nenhum vem de graça.

**Consequência.** P05 fecha na metade da stack. A hospedagem continua em aberto. **Nada
disso autoriza começar a escrever código:** o produto é desenhado inteiro no Figma antes
de virar código, e nada foi desenhado ainda.

---

## 010 · O Spec Kit fica, com saída em `docs/speclist/`

**Quando** 2026-09-18 · **Fase** 1 · **Domínio**, · `#recusa-de-ia` `#reversao`

**Gatilho.** Eu havia recomendado desinstalar o Spec Kit, sob o argumento de que as specs
duplicariam o contrato de comportamento.

**Decisão.** O Spec Kit fica, com invocação automática mantida. A saída passa de `specs/`
para `docs/speclist/`, e o formato por funcionalidade (`spec.md`, `plan.md`, `tasks.md`)
permanece.

**Alternativa descartada.** Desinstalar, como eu propunha. Perdeu porque a premissa estava
errada: contrato e spec não descrevem a mesma coisa. **O contrato é o manual de telas**:
para cada tela criada no Figma, uma entrada que a descreve e a liga ao frame e às peças,
permanente, organizada por tela. **A spec é plano de trabalho**, o que se constrói agora,
em que passos, temporária, organizada por funcionalidade. Uma spec consome o contrato; não
o substitui. Em um projeto onde designer e desenvolvedor são a mesma pessoa, o contrato é
justamente o que unifica os dois lados, e derrubá-lo em favor da spec eliminaria a ponte.

**Custo aceito.** Três pastas vizinhas com nomes parecidos: `spec/`, `speclist/`,
`comportamento/`. Contido com um README em cada uma dizendo o que é e o que não é.

**Consequência.** `speckit-specify` alterada para gravar em `docs/speclist/`.
A skill `contrato-de-comportamento` reescrita: a identidade dela passa a ser *manual de
telas*, com o handoff entre design e desenvolvimento no topo do documento em vez de nota
de rodapé. P20 encerrada.

**Erro meu de leitura**, não dela: o briefing define o contrato como a escrita única do
comportamento consumida por quatro leitores sem tradução. Eu li isso como justificativa e
não como definição, e daí tratei a spec como concorrente.

---

## 011 · Copy de interface vive no contrato; conteúdo autoral vive nos arquivos de texto

**Quando** 2026-09-18 · **Fase** 1 · **Domínio** conteudo · `#escopo`

**Gatilho.** Escrever o contrato da página de erro expôs que o texto dela não tinha origem
prevista. A regra diz que o site não inventa conteúdo: tudo vem de um dos três arquivos ou
está escrito no contrato, e o texto da página de erro não estava em nenhum dos dois.

**Decisão.** Conteúdo autoral vive nos arquivos de texto; **copy de interface vive no
contrato da tela que a exibe.** A exceção declarada são os rótulos da trilha, que ficam nos
arquivos dos cases porque separá-los tornaria um erro de ordem invisível.

**Alternativa descartada.** Um quarto arquivo de conteúdo, ou um bloco novo dentro de
`quem-sou-eu.md`. Perderam porque copy de interface não é texto de autoria: rótulo de botão
e mensagem de erro pertencem ao comportamento da tela, e separá-los do contrato faria a
mesma decisão morar em dois lugares.

**Custo aceito.** Mudar o texto de um botão passa a ser mudar um arquivo de contrato, não
um arquivo de conteúdo: um pouco menos direto para quem só quer trocar uma palavra.

**Consequência.** Resolve mais do que a página de erro: "Ver meus trabalhos", "Próximo
case", o rótulo do contato e os rótulos da tira de destaques tinham o mesmo problema e
agora têm origem. O texto da página de erro foi rascunhado no contrato e aguarda a voz dela
pergunta P31.

---

## 012 · A foto da página "Quem sou eu" entra por marcador, não por posição

**Quando** 2026-09-18 · **Fase** 1 · **Domínio** conteudo · `#escopo`

**Gatilho.** A convenção de conteúdo cobre imagem dentro do texto: markdown mais
`Legenda:`, mas a foto da página não é imagem de texto corrido, e não havia marcador
para ela.

**Decisão.** `<!-- bloco: foto -->` seguido da imagem em markdown. Reaproveita o vocabulário
existente, declara a intenção, e o texto alternativo obrigatório vem de graça no markdown.

**Alternativa descartada.** "A primeira imagem do bloco é a foto": regra por posição, o
mesmo defeito que a decisão 006 recusou em "ignora a seção chamada Notas de trabalho".
E caminho fixo declarado no contrato, que tiraria a foto do arquivo de conteúdo e quebraria
a regra de que atualizar uma página é editar um arquivo de texto.

**Custo aceito.** Mais um marcador na convenção: oito, agora.

**Consequência.** Trocar a foto passa a ser trocar o arquivo apontado, sem tocar em código.

---

## 013 · A ordem dos cards é fixa e declarada, com Finanças primeiro

**Quando** 2026-09-18 · **Fase** 1 · **Domínio** trabalhos · `#escopo`

**Gatilho.** Escrever o contrato do índice expôs que a ordem dos cards nunca tinha sido
escolhida, e que ela comunica prioridade quer alguém decida quer não.

**Decisão.** Ordem fixa e declarada no contrato: Finanças PF+PJ primeiro, Reembolso
SulAmérica em seguida.

**Alternativa descartada.** Duas. *Mais recente primeiro* perdeu por decidir sozinha para
sempre: o terceiro case subiria ao topo automaticamente, sem ninguém olhar, contra a regra
de que nada avança sem decisão registrada. E *Reembolso primeiro* perdeu por pouco: ele é
mais fácil de ler de relance, "toda semana, do zero" entrega na hora, contra um tempo a
mais de "a planilha que virou produto", mas redesenho de fluxo é o formato que quem faz
triagem já viu muitas vezes, enquanto designer que foi até código em uso por pessoa real
é raro.

**Custo aceito.** O primeiro card exige um segundo a mais de leitura do que exigiria o
outro, justamente no momento em que o tempo é mais curto.

**Consequência.** A ordem passa a ser regra no contrato do índice. Acrescentar um terceiro
case passa a exigir uma decisão de ordem explícita, em vez de ela acontecer sozinha.

---

## 014 · A constituição técnica é ratificada na versão 1.0.0

**Quando** 2026-09-18 · **Fase** 1 · **Domínio**, · `#escopo`

**Gatilho.** `/speckit-constitution` nunca havia rodado, e `.specify/memory/constitution.md`
continuava sendo o modelo em branco desde a instalação. Era um arquivo que afirmava guardar
os princípios do projeto e não guardava nenhum.

**Decisão.** Constituição escrita em cinco princípios, mais restrições técnicas, fluxo de
trabalho e governança. **Todo princípio deriva de uma decisão já registrada no log, com a
entrada de origem citada**: nada foi inventado para preencher a estrutura do modelo.

**Alternativa descartada.** Duas. Preenchê-la mais cedo, quando eu a apontei como vazia:
perdeu na hora, porque as respostas dependiam da stack, do comportamento sem script e da
convenção de conteúdo, e nenhuma das três existia. E escrevê-la a partir dos exemplos do
modelo, que sugerem princípios genéricos como *Library-First* e *Test-First*: perdeu
porque princípio que não vem de decisão tomada aqui é enfeite, e enfeite em documento de
governança é pior que ausência.

**Custo aceito.** Mais um documento na pilha, e a fronteira com as `diretrizes` precisa ser
lida para não confundir: método e conduta lá, princípios técnicos aqui. A própria
constituição declara essa divisão no topo, mas depender de alguém ler é custo real.

**Consequência.** `.specify/memory/constitution.md` deixa de ser modelo em branco. Toda
emenda futura passa a exigir entrada no log com a alternativa descartada. A seção
"Constituição técnica" das `diretrizes`, que estava vazia de propósito, passa a apontar
para cá.

---

## 015 · A medida de linha vale onde há largura; em tela estreita quem governa é a margem

**Quando** 2026-09-19 · **Fase** 3 · **Domínio**, · `#restricao`

**Gatilho.** O wireframe da home em 375px expôs que a regra *"medida de linha entre 65 e 75
caracteres: é o número que governa a largura da coluna, não o contrário"* não pode ser
cumprida em tela estreita.

**Decisão.** A regra passa a ser escopada. Onde a largura permite, a medida governa a coluna
e nunca passa de 75. **Em tela estreita quem governa é a margem**, que não desce de 24, e a
medida resultante fica entre 35 e 45 caracteres: faixa confortável para leitura em tela
estreita.

**Alternativa descartada.** Duas, e as duas caíram por aritmética, não por preferência.
*Encolher a margem para ganhar caracteres:* em 375px com **margem zero**, DM Sans a 18px
cabe **44 caracteres**, 21 a menos que o alvo. Nenhuma margem alcança 65. *Encolher o
corpo:* para 65 caracteres em 327px o corpo precisaria de cerca de **10px**, abaixo de
qualquer piso de legibilidade e contra a regra de que corpo e apoio não encolhem.

**Custo aceito.** A regra deixa de ser uma frase e passa a ter duas metades, uma por
contexto. Quem ler só a primeira vai achar que o celular está errado.

**Consequência.** Definições e PRD alterados. A medição também encontrou o erro inverso no
desktop: o parágrafo do wireframe estava em 720px, o que dá **82 caracteres**, acima do
limite de 75. Corrigido para **628px**, que são seis colunas da grade de doze e dão 72
caracteres. **A grade e a medida coincidem em seis colunas**, o que torna a regra
verificável sem contar caractere: se o texto corrido ocupa metade da grade, a medida está
certa.

---

## 016 · A medida em tela estreita é de 34 a 45 caracteres, não de 35 a 45

**Quando** 2026-09-19 · **Fase** 3 · **Domínio**, · `#reversao` `#restricao`

**Reverte parcialmente a entrada 015.**

**Gatilho.** A 015 fixou a faixa de tela estreita em 35 a 45 caracteres, calculada sobre um
corpo de 18px que eu havia **suposto**. A leitura das variáveis mostrou os valores reais do
modo `Tela pequena`, e o parágrafo da home usa `abertura`, que ali vale 20/32, não 18/30.

**Decisão.** A faixa passa a ser **34 a 45 caracteres**, e deixa de ser arbitrada: ela é o
resultado da escala estreita aplicada aos 327px de coluna. `abertura` a 20px dá 34
caracteres; `corpo` a 18px dá 38; `apoio` a 15px dá 45. **Os extremos da faixa são os
extremos da própria escala**, não há número escolhido à mão.

**Alternativa descartada.** Manter 35 e usar `corpo` em vez de `abertura` no parágrafo da
home, o que daria 38 e caberia na faixa antiga. Perdeu porque trocaria o nível tipográfico
para salvar um número: no desktop o parágrafo é `abertura`, e mudar de nível só em tela
estreita quebraria a correspondência entre as duas larguras.

**Custo aceito.** Nenhum além de uma entrada de reversão logo depois da original.

**Consequência.** Definições e PRD atualizados. O wireframe estreito foi refeito com os
valores reais.

---

## 017 · O PRD deixa de repetir as regras de uso e passa a apontar para as definições

**Quando** 2026-09-19 · **Fase** 3 · **Domínio**, · `#recusa-de-ia`

**Gatilho.** Larissa perguntou onde as regras estavam sendo registradas. A conferência
mostrou que as regras visuais existiam **nos dois** arquivos: definições e PRD. Cinco
testadas, cinco duplicadas.

**Decisão.** As definições são a fonte das regras de uso. O PRD guarda direção de produto:
contenção, a trilha como único elemento gráfico, a riqueza vindo das imagens, cor como
exceção, uma cor por case, e **aponta** para as definições no resto.

**Alternativa descartada.** Manter a repetição e assumir o compromisso de atualizar os dois
a cada mudança. Perdeu porque foi exatamente o que falhou: a regra da medida de linha
mudou na 015 e eu precisei editar dois arquivos, o que é a definição do problema.

**Custo aceito.** O PRD fica mais magro, e o ponteiro só resolve para quem tem acesso às
definições, que hoje estão em `_privado/`. Isso amarra a leitura do PRD à pergunta P16,
sobre o que fica público.

**Consequência.** Duplicação desfeita. **Erro meu, criado ao escrever o PRD e agravado na
revisão**, quando acrescentei sete regras que já existiam na fonte.

---

## 018 · A home abre pela frase; nome e cargo vêm depois do parágrafo

**Quando** 2026-09-19 · **Fase** 3 · **Domínio** home · `#reversao`

**Reverte a ordem implícita no wireframe original**, que vinha da leitura literal de
"nome, cargo, uma frase e um parágrafo" como sequência.

**Gatilho.** Larissa reorganizou o frame à mão. A linha de identificação, que estava acima
do título, desceu para logo abaixo do parágrafo, imediatamente antes da ação.

**Decisão.** A ordem na tela é **frase → parágrafo → nome e cargo → ação**. A página abre
pelo que ela pensa, não por quem ela é: a identificação chega depois de a frase ter feito
o trabalho, e encosta na ação.

**Alternativa descartada.** Abrir pela identificação, que era o wireframe anterior. Perdeu
porque para quem faz triagem em segundos o gancho é a frase, não o nome: o nome já está
na barra, e repeti-lo no topo gastava a primeira linha de atenção com um dado que não
convence ninguém a continuar.

**Custo aceito.** A lista das definições ("nome, cargo, uma frase e um parágrafo") deixa
de ser lida como ordem. Quem ler o documento sem ver a tela vai supor a sequência errada.

**Consequência.** Contrato da home atualizado com a ordem e com o cenário em Gherkin
correspondente. O parágrafo foi reescrito para não repetir o cargo: *"Sou UX Designer,
curiosa por natureza e apaixonada..."* virou *"Sou curiosa e apaixonada..."*, e
`quem-sou-eu.md` foi sincronizado, **a mudança tinha sido feita só no Figma, e o arquivo
de texto é a fonte.**

---

## 019 · O respiro da hero é uma relação, não um valor

**Quando** 2026-09-19 · **Fase** 3 · **Domínio** home · `#restricao`

**Gatilho.** Larissa ajustou o respiro do frame à mão e depois explicou a intenção: hero
com bastante ar, **com o mesmo respiro entre a barra e a frase e entre a frase e o
parágrafo**, e os três elementos do bloco de apresentação igualmente espaçados entre si.
Os valores que ela usou: 100 e 30, não existem na coleção de espaço.

**Decisão.** A regra fixa a **relação**, não o número: respiro igual acima e abaixo da
frase, espaçamento uniforme dentro do bloco de apresentação. Os valores saem da escala e
mudam com a largura: hoje 96 e 32 em desktop, 64 e 24 em tela estreita.

**Alternativa descartada.** Duas. *Acrescentar `space/100` e `space/30` à coleção*, para
que os valores manuais virassem tokens: perdeu porque quebraria o ritmo da escala, que
progride por volta de 1,5× e não comporta 100 entre 96 e 128. E *deixar como estava*, com
medidas fora da escala: perdeu contra a regra dela de que espaço só sai de `space/*`.

**Custo aceito.** Quatro pixels a menos de respiro que ela tinha escolhido à mão, e dois a
mais entre os elementos do bloco. Diferença imperceptível; se não for, a escala é que
precisa de decisão, não o frame.

**Consequência.** As duas larguras passam a seguir a regra. A tela estreita foi
reestruturada para a mesma ordem do desktop, que ainda não tinha recebido a decisão 018, e
o texto do parágrafo foi sincronizado: **ele estava desatualizado lá também.**

**A observação dela é o ponto.** Ajuste manual não se reproduz na próxima tela; regra se
reproduz. Foi ela quem disse: *"talvez eu devia ter explicado o que eu queria ao invés de
fazer manualmente"*. É exatamente para isso que o contrato existe.

---

## 020 · A escala de espaço fica como está; o que muda é quando se escolhe o valor

**Quando** 2026-09-19 · **Fase** 3 · **Domínio**, · `#restricao`

**Gatilho.** Três valores de espaço apareceram fora da coleção: **28**, citado nas
definições para distância entre parágrafos, e **100** e **30**, escolhidos à mão no frame
da hero. A regra diz que espaço só sai de `space/*`.

**Decisão.** A coleção não muda. As definições passam a dizer **32** entre parágrafos, e
ganham uma regra nova: **todo valor sai da coleção, inclusive quando foi escolhido a olho.**
Número ajustado na tela até parecer certo é arredondado para o token mais próximo antes de
ser escrito em qualquer lugar.

**Alternativa descartada.** Duas. *Acrescentar `space/28` e `space/30`*: perdeu porque a
escala progride alternando ×1,5 e ×1,33 de ponta a ponta, e esses dois criariam passos de
×1,17 e ×1,14 num trecho só, quebrando o ritmo para resolver dois casos. E *aceitar valor
fora da escala quando o olho pedir*: perdeu porque é a própria regra que o projeto tem,
e abandoná-la na primeira vez que incomoda é não ter regra.

**O que decidiu a questão.** Os três valores estão a **4px ou menos** de um token existente:
100 fica a 4 de 96, 30 a 2 de 32, 28 a 4 dos dois vizinhos. **Nenhum deles aponta para um
passo faltando**: apontam para um momento em que ninguém consultou a escala. O problema
não era a ferramenta, era o procedimento.

**Custo aceito.** Continua possível que um dia a escala realmente falte um passo, e a regra
de arredondar esconda isso. Por isso a regra tem uma saída declarada: se o token mais
próximo parecer errado **por mais de um passo**, a decisão volta para a escala.

**Consequência.** Definições alteradas em dois pontos. P35 encerrada.

---

## 021 · A grade vira coleção própria, com dois modos

**Quando** 2026-09-19 · **Fase** 3 · **Domínio**, · `#restricao`

**Gatilho.** A auditoria deixou a margem de 80 como única medida fora da escala, e o
diagnóstico foi mais fundo: **nenhum valor de grade era token**, nem margem, nem colunas,
nem calha.

**Decisão.** Coleção **Grade**, com modos `Desktop` e `Tela pequena`, e três variáveis:
`margem` (80 / 24), `colunas` (12 / 1), `calha` (24 / 0). A regra de que espaço só sai de
`space/*` passa a declarar que **não alcança a grade**: composição é outro sistema.

**Alternativa descartada.** Três. *Acrescentar `grade/*` à coleção Espaço e forma*: perdeu
porque aquela coleção tem um modo só, e a grade muda com a largura; dar-lhe dois modos
obrigaria todos os valores de espaço a existirem em duplicata sem variar. *Deixar a grade só
nas definições e amendar a regra de espaço*: perdeu porque o código precisa da margem, e a
constituição diz que nenhum valor visual é digitado à mão sem vir de uma coleção; a saída
seria abrir exceção para valor em prosa, que é o buraco que o sistema de tokens existe para
fechar. *Mudar a margem para 64 ou 96*: perdeu por reconstruir o layout inteiro para
obedecer uma regra que não era sobre ele.

**Custo aceito, e é grande.** **A grade do Figma não aceita vínculo com variável**:
testado, `setBoundVariable` recusa o campo `layoutGrids`. O token é fonte para o código e
referência declarada, mas **não propaga para os frames**: mudar a margem continua exigindo
edição manual em cada frame. O ganho é ter um lugar declarado e um valor que o código pode
consumir legalmente; não é propagação automática.

**Consequência.** Quarta coleção no arquivo, e as definições passam a dizer quatro em vez de
três. `colunas` em tela pequena vale **1**, isso descreve o que existe hoje, uma coluna
única entre margens, e não uma decisão de grade estreita, que ninguém tomou. A grade foi
aplicada aos dois frames. Pede uma checagem nova: **todo frame bate com o token do seu
modo**, hoje ninguém verifica isso.

---

## 022 · As checagens são escritas em Node, sem dependência nenhuma

**Quando** 2026-09-19 · **Fase** 3 · **Domínio**, · `#restricao`

**Gatilho.** O script das quatro checagens era a última entrega pendente da primeira
execução da skill do contrato, e escrevê-lo obriga a escolher uma linguagem: a primeira
coisa do projeto a fazer isso.

**Decisão.** Node, sem dependência nenhuma. `scripts/checagens.mjs`, executável com
`node scripts/checagens.mjs`.

**Alternativa descartada.** Python, que está disponível na máquina e é mais curto para
manipular texto. Perdeu porque a construção do site será a mesma linguagem, e ter duas
linguagens num projeto de cinco páginas é custo sem ganho: a decisão 009 já disse que a
construção é nossa, e o ecossistema de site estático é Node.

**Custo aceito.** A escolha da linguagem de construção foi feita aqui, por um script
auxiliar, em vez de na decisão que tratava de stack. Fica registrado que foi assim, e não
por análise do que a construção precisa.

**Consequência.** Das quatro checagens do briefing, **duas rodam hoje**: estrutura do
contrato, e toda `@lacuna` apontando para pergunta que existe. Uma passa por vacuidade:
nenhum contrato cita token ainda. Uma quarta foi acrescentada por mim: os arquivos de
conteúdo seguem a convenção de marcadores.

**As quatro bloqueadas estão declaradas na saída do script**, não omitidas: `figma.tela`
resolve (exige token pessoal do Figma), `Cenário:` tem teste (P19), `storybook.usa` (P17,
não se aplica), e frame batendo com token de grade, que a decisão 021 mostrou não ser
automatizável, porque a grade do Figma recusa vínculo com variável.

---

## 023 · Peça ausente: visível na construção local, bloqueante na publicação

**Quando** 2026-09-19 · **Fase** 4 · **Domínio** conteudo · `#restricao`

**Gatilho.** A clarificação da spec 001 pegou a pergunta mais antiga ainda aberta: o que a
construção faz quando uma peça esperada não está no arquivo, rótulo de trilha, imagem,
legenda, currículo.

**Decisão.** Os dois comportamentos, por contexto. Na **construção local**, a página gera
com a falta **visível na tela**, nomeando a peça. No **caminho de publicação**, a construção
recusa e nada sobe. A lacuna é vista por quem trabalha e nunca por quem visita.

**Alternativa descartada.** Três, e cada uma escolhia um lado perdendo o outro. *Falhar
sempre*: seguro para o site, mas uma legenda por escrever impediria qualquer
pré-visualização. *Gerar com aviso em log*: o site nunca trava, mas o aviso é ignorável e
a página quebrada vai ao ar; é falha silenciosa, que este projeto trata como o pior tipo.
*Lacuna visível sempre*: impossível de ignorar, inclusive para quem visita.

**Custo aceito.** A construção passa a ter dois modos, e alguém pode publicar achando que
está em modo local. O modo precisa ser evidente na saída, não inferido.

**Consequência.** FR-011 fechado. **Quatro contratos tinham `@lacuna` apontando para esta
pergunta** (conteúdo, home, trabalhos e quem sou eu) e os quatro viraram cenário real.
É a Diretriz 0 aplicada à construção: a lacuna é marcada, nunca preenchida, e nunca
publicada em silêncio.

---

## 024 · A construção terá analisador de markdown próprio, e os testes usam o Node

**Quando** 2026-09-21 · **Fase** 4 · **Domínio**, · `#restricao`

**Gatilho.** A Fase 0 do plano da spec 001 precisava resolver duas incógnitas técnicas:
quanto de markdown a construção entende, e como testar sem acrescentar dependência.

**Decisão.** Analisador próprio do subconjunto medido: títulos, negrito, itálico, tabelas,
listas, réguas e parágrafos, mais o padrão `**Chave** ·` da tira de destaques. Testes com
`node:test`, embutido.

**Alternativa descartada.** *Uma biblioteca de markdown*: uma linha de código contra
centenas de recursos não usados e atualizações de segurança para acompanhar; contraria a
decisão 022. *Vitest ou Jest*: melhores em projeto grande, dependências que envelhecem.

**O que decidiu foi medição, não preferência.** Os três arquivos de conteúdo usam um
subconjunto pequeno, e **três recursos não aparecem em lugar nenhum**: citação, código
embutido e link. O único `[link]` existente é marcador não resolvido. Isso põe o analisador
na casa de 150 a 200 linhas.

**Custo aceito, e é o maior deste plano.** Um erro no analisador corrompe os textos dela em
silêncio, e os textos são o produto. Por isso a suíte de testes deixa de ser desejável e
passa a ser condição: cada recurso do subconjunto precisa de teste que o cite pelo nome.

**Consequência.** A **P19** fecha: ela estava bloqueada por falta de suíte, e `node:test`
existe no Node instalado. A checagem 3 do contrato: *"todo `Cenário:` é citado por um
teste"*, deixa de ser impossível e passa a ser pendente. O script de checagens foi
atualizado para dizer isso.

---

## 025 · Publicação por GitHub Pages, com a automação versionada

**Quando** 2026-09-21 · **Fase** 4 · **Domínio**, · `#restricao`

**Gatilho.** FR-012 foi retirado da clarificação por ser comparação de stack, e delegado ao
plano. A Fase 0 o resolveu.

**Decisão.** GitHub Pages, com um arquivo de automação no repositório que constrói a cada
envio e publica a saída.

**Alternativa descartada.** *Cloudflare Pages*: constrói sozinho, sem arquivo de automação,
e entrega mais rápido; perdeu porque a configuração de construção passaria a viver num
painel web que o Git não vê. *Commitar a saída construída*: dispensa automação, mas mistura
fonte com gerado e enche o histórico de HTML.

**O que pesou mais.** Não foi o desempenho nem a conveniência: foi **a configuração de
publicação ser um arquivo versionado**. Num projeto cuja regra é decisão registrada em
arquivo, ter parte de como o site é construído fora do repositório seria incoerente.

**Custo aceito.** A entrega do Pages é mais lenta que a do Cloudflare. Para cinco páginas de
texto e imagem, a diferença é pequena diante do requisito de 2,5 segundos, mas existe.

**Consequência.** O domínio segue adiado (P15), e até lá o endereço é o do Pages. Apontar um
domínio depois não gera retrabalho.

---

## 026 · Itens de navegação são do mesmo nível e não se diferenciam por cor

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#recusa-de-ia`

**Gatilho.** Larissa perguntou por que "Quem sou eu" tinha cor diferente de "Trabalhos" no
wireframe da barra.

**Decisão.** Os itens de navegação são do mesmo nível e usam o mesmo peso e a mesma cor.

**Alternativa descartada.** Dar mais peso a "Trabalhos", que era o que eu tinha feito.
Perdeu por dois motivos, e o segundo é mais forte que o primeiro. As definições dizem
*"Trabalhos em primeiro lugar"*: **isso é ordem, não ênfase**, e eu li como ênfase. E mesmo
que fosse ênfase, o canal estaria errado: a regra dela é que *"o nível se marca pelo
tamanho, nunca pela cor"*, e dois itens do mesmo nível não têm o que marcar.

**Custo aceito.** Nenhum. A barra fica mais quieta, que é o que a direção de contenção pede.

**Consequência.** Corrigido nas duas larguras. A regra subiu para o contrato da moldura,
onde vale para a barra inteira e não só para o contato. **Abriu a pergunta P37**: estando
numa das páginas, o item correspondente indica isso? A trilha tem marcador de etapa ativa
dentro de um case; a navegação não tem equivalente declarado.

---

## 027 · O controle de tema é espaço reservado rotulado, não um círculo mudo

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** tema · `#recusa-de-ia`

**Gatilho.** Larissa perguntou o que era "aquela bolinha vazia" na barra.

**Decisão.** O espaço do controle de tema é uma peça **rotulada**: lê-se "tema": em vez de
um círculo cinza sem legenda.

**Alternativa descartada.** Desenhar o controle de verdade agora. Perdeu porque sua forma
depende da P26, ainda aberta: se o controle tem dois estados ou três, com a posição "seguir
o sistema", muda o que ele é.

**Custo aceito.** Um rótulo em texto onde provavelmente haverá um ícone. É wireframe: a
palavra diz o que a forma ainda não pode dizer.

**O que isso ensinou.** Espaço reservado sem rótulo não é neutro: **é ambíguo**. Um círculo
cinza numa barra pode ser avatar, ícone ou foto, e quem olha precisa perguntar. A mesma
regra do contrato vale para o desenho: a lacuna é marcada, nunca deixada em branco.

---

## 028 · A barra não indica a página atual visualmente, mas declara na marcação

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#restricao`

**Gatilho.** A correção da decisão 026 deixou os dois itens iguais, e isso expôs uma
pergunta que ninguém tinha feito: como alguém sabe em que página está?

**Decisão.** Nenhuma indicação visual. O item correspondente é **declarado como página atual
na marcação**, para quem navega por leitor de tela.

**Alternativa descartada.** Duas. *Dar o acento de sistema ao item atual*: é cor de estado,
que a regra permite; perdeu no teste dela: *"se a cor sair e a tela continuar dizendo a mesma
coisa, ela não deveria estar lá"*, e a página de Trabalhos continua dizendo que é Trabalhos
sem o destaque. E perdeu num segundo ponto: indicar só por cor contraria a exigência de não
depender de cor sozinha, e o canal alternativo seria peso, que a decisão 026 acabou de
remover. *Tornar o item atual não clicável*: some sem avisar, que é pior que não indicar.

**O argumento que eu não tinha visto antes de mapear.** Com dois itens e seis páginas, o
indicador **ficaria mudo em quatro**: na home ninguém está em Trabalhos nem em Quem sou eu, e
nas duas páginas de case nenhum dos dois é a página atual. **Os cases são onde a pessoa passa
mais tempo.** Um sinal ausente onde mais se lê é um sinal fraco.

**Por que a metade não visual fica mesmo assim.** Quem enxerga recebe a orientação da própria
página: título, conteúdo, trilha. Quem percorre a barra por leitor de tela, item a item,
não tem esse contexto naquele momento. A declaração na marcação **compensa uma diferença no
modo de consumir a página**, e não acrescenta nada para quem não precisa dela. Não é
inconsistência: é o mesmo conteúdo chegando por canais diferentes.

**Custo aceito.** Um comportamento que não se vê no Figma e só se verifica em teste ou com
leitor de tela. Por isso virou dois cenários no contrato, nomeados: incluindo o caso do
case, em que **nenhum** item é anunciado.

---

## 029 · A escolha de tema vale até ser trocada de novo; o controle tem duas posições

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** tema · `#restricao`

**Gatilho.** O contrato do tema tinha uma lacuna desde o primeiro dia: o leitor escolhe um
tema no site e depois muda a preferência do sistema operacional, qual ganha? A pergunta
também segurava a forma do controle, e com ela o wireframe da barra.

**Decisão.** A escolha manual vale até ser trocada de novo. Mudança na preferência do
sistema não a desfaz. O controle tem **duas posições**, claro e escuro; não há posição
"seguir o sistema": o automático vale enquanto ninguém tiver escolhido, e não volta depois.

**Alternativa descartada.** Duas. *A preferência do sistema voltar a mandar*: perdeu porque
a pessoa escolheu e o site desfaria; mesmo sendo defensável como "a preferência mais
recente", **isso lê como defeito**: ela volta, vê o tema que não escolheu, e conclui que o
site esqueceu. Falha que parece bug é pior que falha que ninguém nota. *Uma terceira posição,
"seguir o sistema"*: perdeu por custo: na barra, isso é um seletor segmentado largo demais
para uma tela estreita que já está no mínimo de nome e Trabalhos, ou um botão que cicla,
em que não se sabe o estado atual sem olhar duas vezes.

**Custo aceito, e é o mais concreto desta decisão.** Quem usa sistema que troca sozinho de
claro para escuro à noite, e tocou no controle uma vez, **perde essa troca automática neste
site, em silêncio**. Há saída: voltar o controle para o tema que bate com o sistema, mas
ela devolve a cor, não o automático. Se algum dia isso incomodar, a reversão é a terceira
posição, e esta entrada é o ponto de partida dela.

**Consequência.** Duas lacunas do contrato do tema viraram cenário, incluindo o caso
simétrico que faltava: quem **nunca** escolheu continua acompanhando o sistema. A forma do
controle deixa de estar bloqueada: duas posições, mas o **desenho** dele segue sendo
trabalho da Fase 2, não desta decisão.

---

## 030 · A barra é uniforme: contato sem destaque, tema por último

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#reversao`

**Reverte a regra de que o contato é visualmente distinto**, escrita nas definições.

**Gatilho.** Larissa pediu barra uniforme: tirar o destaque do contato e mover o controle de
tema para o último item.

**Decisão.** Todos os itens da barra usam o mesmo peso e a mesma cor. Nenhum recebe borda,
fundo ou destaque. A ordem é: nome · Trabalhos · Quem sou eu · Contato · controle de tema.

**Alternativa descartada.** Manter o contato como botão com borda, que era a regra escrita:
*"Fica na direita da barra, visualmente distinto dos itens de menu"*.

**O que decidiu foi a própria razão da regra, que apontava para o outro lado.** A frase
seguinte das definições diz: *"misturar os dois faz o contato competir por atenção com os
cases"*. **Um botão com borda compete mais que texto simples**: a regra pedia destaque, e o
motivo pedia discrição. A mudança segue o motivo e a regra foi reescrita.

A distinção entre navegação e ação **não desaparece: deixa de ser de aparência e passa a ser
só de comportamento.** Contato continua disparando a ação em vez de levar a uma página.

**Custo aceito.** Nada na barra indica que o contato se comporta diferente dos vizinhos.
Quem toca espera mudar de página e recebe uma revelação sobre a mesma página. É surpresa
pequena e de baixo custo, mas é surpresa.

**Consequência.** Definições reescritas no ponto do contato. O contrato mudou de nome:
`botão-contato.md` continua sendo o arquivo, mas o título passou a ser "Contato na barra",
porque botão era o que ele deixou de ser. A regra de uniformidade subiu para valer sobre a
barra inteira, incluindo o controle de tema, que eu havia deixado em cinza mais claro:
mesmo erro do círculo sem rótulo: um item mais apagado lê como menos importante, não como
espaço reservado.

---

## 031 · A barra indica a página atual com sublinhado no acento de sistema

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#reversao`

**Reverte a decisão 028**, que estabelecia indicação só na marcação, sem canal visual.

**Gatilho.** Larissa, depois de ler a 028, decidiu que a página atual deve ganhar destaque.

**Decisão.** O item da página atual recebe **sublinhado no acento de sistema**, e continua
sendo declarado como página atual na marcação. Dois canais: cor e sublinhado.

**Alternativa descartada.** *Peso*, como segundo canal no lugar do sublinhado: perdeu
porque a decisão 026 acabou de remover diferença de peso da barra, e reintroduzi-la
confundiria **estado** com **hierarquia**, que são coisas diferentes no sistema dela.
*Marcador gráfico*, como o da trilha: perdeu porque a trilha é declarada como o único
elemento gráfico distintivo do site, e repetir seu vocabulário na barra diluiria isso.

**O que mudou em relação à 028.** Nada nos fatos: o indicador continua aparecendo em **duas
das seis páginas**, e continua mudo nos dois cases, que é onde a pessoa passa mais tempo.
O que mudou foi o peso dado a esse custo: **é decisão dela, e ela a tomou com o argumento
na mão.** A 028 está registrada e não foi apagada; esta a substitui.

**Custo aceito.** O destaque existe em duas páginas e falta em quatro, o que pode ler como
inconsistência em vez de ausência intencional.

**Consequência.** Abre a **P38**: a página de case sublinha "Trabalhos" como seção? Responder
que sim exigiria declarar o que é seção, coisa que o documento não faz. O wireframe da home
**não pode demonstrar a regra**: na home nenhum item de navegação é a página atual, porque
ela é alcançada pelo nome. O primeiro desenho que mostra o destaque é o de Trabalhos.

---

## 032 · A página de case sublinha "Trabalhos" como seção

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#escopo`

**Gatilho.** A decisão 031 deu sublinhado ao item da página atual, e o indicador aparecia em
duas das seis páginas: mudo justamente nos dois cases, que é onde a pessoa passa mais
tempo.

**Decisão.** Um case pertence a Trabalhos, e numa página de case "Trabalhos" recebe o mesmo
sublinhado, como seção. **É a única relação de pertencimento do site**: nenhuma outra página
está dentro de outra.

**Alternativa descartada.** Duas. *Deixar só a página exata*: o indicador ficaria mudo em
quatro de seis, e nos cases a ausência seria sentida como esquecimento. *A home sublinhar o
próprio nome*, o que daria simetria: perdeu porque transformaria o elemento de identidade
em item de navegação; o nome é a marca do site, não uma aba.

**O que decidiu não foi simetria.** Foi perceber que **as duas ausências que sobram são
respostas certas, não falhas**: na home a pessoa está na entrada, não dentro de uma seção;
na página de erro não está em lugar nenhum. Quatro de seis com motivo vale mais que seis de
seis por preenchimento.

**Custo aceito.** "Estou em Trabalhos" e "estou dentro de Trabalhos" ficam indistinguíveis.
Diferenciá-las exigiria um terceiro tratamento visual, e as duas significam a mesma coisa
para quem se orienta.

**Verificado contra a regra da cor dominante.** Numa página de case o sublinhado é roxo, de
sistema, enquanto a trilha é azul ou laranja. Isso não viola *"uma cor dominante por tela"*:
a regra diz que, dentro de um case, a cor do case domina e **a de sistema aparece só nos
elementos interativos**, e o item da barra é um link.

---

## 033 · A barra estreita é toda palavra: nome, Trabalhos, Contato e menu

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#restricao`

**Gatilho.** Larissa propôs usar ícones para caber tudo na barra estreita, dizendo que
gostava da literalidade do texto e perguntando o que eu achava. É a pergunta P10, aberta
desde o começo.

**Decisão.** Barra estreita com **nome · Trabalhos · Contato · menu**, tudo em palavra.
"Quem sou eu" e o controle de tema vão para dentro do menu. **Nenhum item vira ícone.**

**Alternativa descartada.** *Quatro ícones com o nome em texto*: perdeu por medição, antes
de qualquer argumento: em 327px de largura útil, quatro ícones ocupam 300 e a versão toda em
palavra ocupa 309. **Os ícones economizariam nove pixels.** *Tudo em texto sem menu*, não
cabe: 434.

**Os argumentos que vieram depois do número, e que sustentariam a decisão sozinhos.** A
direção visual já excluía ícones (*"tipografia e cor fazem o trabalho, e fazem sozinhas;
sem ornamento"*) e a regra de cor os antecipava, ao listar *"ícone que não é estado"* entre
os lugares onde a cor não entra. A trilha é declarada o **único** elemento gráfico
distintivo do site, e quatro ícones criariam um segundo vocabulário presente em toda página.
E **"Quem sou eu" não tem ícone**: uma silhueta de pessoa diz perfil, conta ou login, não
"quem eu sou".

**Custo aceito.** "Quem sou eu" e o tema ficam a um toque de distância em tela estreita,
que é onde a maior parte das pessoas abre portfólio.

**Consequência.** P10 encerrada, e com ela as duas últimas lacunas dos contratos de moldura
e tema. A decisão 032 ganhou um caso novo: quando a página atual está dentro do menu, **é a
palavra "menu" que recebe o sublinhado**, sem isso, a única página escondida seria também a
única sem indicador. A forma do menu aberto é trabalho da Fase 3; o comportamento dele já
está contratado.

---

## 034 · O display de tela pequena baixa de 44 para 42, para a frase caber em quatro linhas

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** home · `#restricao`

**Gatilho.** Larissa achou a quebra da hero estreita estranha em cinco linhas e pediu
quatro, com *"de fazer,"* e *"eu quero"* na mesma linha: antecipando que talvez fosse
preciso diminuir um pouco.

**Decisão.** `size/display` no modo `Tela pequena` passa de **44 para 42**. `line/display`
fica em 48. A frase quebra em quatro linhas: *"Se existe uma / forma melhor / de fazer, eu
quero / descobrir qual é."*

**Alternativa descartada.** Três. *Manter 44 e cinco linhas* (a quebra partia "de fazer,"
de "eu quero", separando uma unidade de sentido. *Usar 43*) cabe, mas em **327 exatos**,
sem nenhuma folga: qualquer diferença de renderização quebraria a linha. *Apertar o
espaçamento entre letras*: traria os 334 para dentro de 327, mas seria valor visual
escolhido à mão numa tela, exatamente o que a decisão 020 proíbe.

**O que decidiu entre 42 e 43 foi a folga, não o tamanho.** Em 42 a linha mais larga mede
319, com oito pixels de margem. Em 43 mede 327, que é o limite. E 42 é par, como todos os
outros valores da escala estreita.

**Custo aceito.** A hero da home encolhe 2px em tela estreita. `line/display` fica em 48
para um corpo de 42, proporção maior que a de antes, o que é desejável em tamanho menor,
mas foi consequência, não escolha deliberada de entrelinha.

**Consequência.** A quebra da frase subiu para o contrato da home: **ela é escolhida, não
automática**, e cada linha fecha uma unidade de sentido. Nenhum outro elemento usa `display`
em tela estreita, então a mudança não alcança nada além da hero da home.

---

## 035 · A abertura em tela estreita baixa para 18, com a entrelinha preservada em 32

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** home · `#restricao`

**Gatilho.** Larissa pediu o mesmo tratamento do título para o parágrafo da home estreita,
e perguntou como isso alteraria as regras. A pergunta valeu mais que o ajuste.

**Decisão.** `size/abertura` no modo `Tela pequena` passa de **20 para 18**. `line/abertura`
**permanece em 32**.

**Alternativa descartada.** Duas. *Trocar o parágrafo para `corpo` só em tela estreita*:
perdeu pelo mesmo motivo da decisão 016: mudaria o nível tipográfico entre as larguras, e o
parágrafo da home é `abertura` no desktop. *Baixar `line/abertura` junto, para 30*: perdeu
porque igualaria `abertura` e `corpo` por completo; mantendo 32 contra 30, os dois ficam com
o mesmo corpo e **entrelinhas diferentes**, e a distinção sobrevive no ar entre as linhas,
que é onde ela faz sentido numa linha de abertura.

**O que a medição expôs, e é mais importante que o ajuste.** O parágrafo a 20px cabia
**33 caracteres**, não 34: abaixo do piso que a decisão 016 fixou. O motivo não é erro de
cálculo: aquele piso foi medido com **o texto antigo**, que Larissa reescreveu depois.
**Medida em caracteres depende do texto, não só do corpo**: letras têm larguras
diferentes, e o mesmo tamanho dá contagens diferentes em frases diferentes.

**Consequência: a regra da medida foi reescrita para ser verificável.** O que se verifica é
a **coluna**, largura da tela menos as duas margens, e a medida em caracteres passa a ser
declarada como **consequência, não alvo**, em torno de 35 a 45. Uma regra que só pode ser
conferida contra um texto específico não é regra, é observação.

**Segundo achado.** A escala estreita tem **oito níveis e sete valores distintos**:
`subtitulo` e `abertura` eram ambos 20. A colapso não é novo, só mudou de lugar: agora
`abertura` e `corpo` compartilham o corpo 18, mas com entrelinhas diferentes, o que é menos
colapso do que havia antes.

---

## 036 · A escala converge por construção; a regra é distinguibilidade, não corpos distintos

**Quando** 2026-09-21 · **Fase** 3 · **Domínio**, · `#restricao`

**Gatilho.** A decisão 035 expôs que a escala estreita tem oito níveis e sete corpos
distintos. Larissa pediu para resolver o colapso.

**Decisão.** Não se resolve mudando números: **o colapso é consequência aritmética da regra
que a produz.** Uma escala que comprime pelo topo contra um piso fixo converge, os níveis
de cima descem, `corpo`, `apoio` e `etiqueta` não se movem, e em algum ponto dois se
encontram. A regra passa a ser explícita: **dois níveis nunca têm ao mesmo tempo o mesmo
corpo e a mesma entrelinha.** Hoje `abertura` 18/32 e `corpo` 18/30 dividem o corpo e se
separam pela entrelinha.

**Alternativa descartada.** Duas. *Separar `abertura` e `corpo` por tamanho*, pondo abertura
em 19: perdeu por introduzir um ímpar numa escala inteiramente par, para resolver algo que
não é problema. *Reduzir a escala estreita a sete níveis*, eliminando um: perdeu porque a
correspondência entre as larguras se quebraria: um elemento que é `abertura` no desktop
precisaria virar outra coisa em tela estreita, exatamente o que a decisão 016 recusou.

**Medição que sustenta a decisão.** No desktop **não há nenhum** par com o mesmo corpo. Em
tela estreita há **um**, e ele é distinguível. Os três níveis do piso são idênticos nas duas
larguras: a compressão acontece toda acima deles.

**Custo aceito.** A escala estreita tem um par que só se distingue por entrelinha, o que é
uma diferença mais sutil que a de corpo. Em textos curtos, de uma ou duas linhas, a
entrelinha quase não se manifesta e os dois níveis parecerão iguais.

**Consequência.** A regra virou **checagem declarada** no script, e está bloqueada pela
mesma razão que outras: os valores da escala não estão no repositório, e esperam o mecanismo
de exportação dos tokens (**P07**).

**Nota de registro.** Não havia pergunta P39. O achado foi registrado na decisão 035 e na
spec visual, mas **nunca virou pergunta na lista**: omissão minha. Esta entrada fecha o
assunto sem que a pergunta tenha chegado a existir.

---

## 037 · Os tokens descem por exportação para arquivo versionado

**Quando** 2026-09-21 · **Fase** 3 · **Domínio**, · `#restricao`

**Gatilho.** Cinco checagens estavam declaradas e bloqueadas, três delas pela mesma razão:
os valores das variáveis não existiam no repositório. A decisão 007 havia adiado o mecanismo
até a Fase 2, e o design system já tem as quatro coleções com valores reais.

**Decisão.** As variáveis são **exportadas** para `docs/spec/tokens.json`, versionado no
repositório. O CSS de custom properties é **gerado** desse arquivo. Nem o arquivo nem o CSS
são editados à mão. **A construção não consulta o Figma pela rede.**

**Alternativa descartada.** Duas. *Transcrição manual*: contraria diretamente a regra de que
nenhum valor visual é digitado à mão. *Leitura pela API na construção*: perdeu por tornar a
publicação dependente de o Figma estar no ar e de um segredo válido: uma indisponibilidade
lá impediria publicar aqui, e a decisão 009 escolheu um sistema sem dependência justamente
para não ter esse tipo de acoplamento.

**A objeção que precisei responder.** Escrever hexadecimais num arquivo do repositório
parece a "segunda lista" que a regra proíbe. Não é, e a distinção importa: **duas listas
mantidas à mão divergem; um arquivo gerado não diverge.** Ele está em dia ou desatualizado,
e desatualizado é um **estado detectável**, não uma contradição silenciosa. O README da spec
continua guardando só nomes e regras de uso.

**Custo aceito, e é o ponto fraco real.** A exportação é disparada à mão. Se uma variável
mudar no Figma e ninguém reexportar, o site fica com o valor velho **sem que nada acuse**.
Não há detecção automática porque ela exigiria acesso do repositório ao Figma, que é o
acoplamento recusado acima. A mitigação é de procedimento: mudou variável, reexporta.

**Consequência: três checagens destravaram.** "Todo token citado existe" passou a conferir
contra os 54 tokens reais em vez de nomes extraídos de prosa. "Dois níveis nunca compartilham
corpo e entrelinha" (decisão 036) passou a rodar, e confirma: oito níveis distinguíveis nos
dois modos, com `abertura` e `corpo` dividindo o corpo 18 em tela estreita e separados pela
entrelinha. E o FR-013 da spec 001 fechou: **a spec não tem mais nenhum marcador de
clarificação.**

---

## 038 · "O Produto" é material de origem para as legendas, não seção da página

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** conteudo · `#escopo`

**Gatilho.** O bloco "O Produto", no fim do case de Finanças: 45 linhas descrevendo
funcionalidades, com título e sem marcador de trilha. A convenção o trataria como subseção
do capítulo 6, e ninguém tinha decidido se era isso mesmo.

**Decisão.** Marcado `<!-- privado -->`. Não vai para a página; **continua no arquivo como
material de origem para as legendas das imagens.**

**Alternativa descartada.** Três. *Capítulo próprio com rótulo de trilha*: quebraria o
arco, que vai de Ideia a Resultados; um capítulo depois da conclusão chega tarde. *Subseção
do capítulo 6*, o que a convenção faria hoje, e desequilibra: uma reflexão curta seguida de
45 linhas que não são "o que ficou", são "o que é". *Descartar o texto*: perderia material
bom e necessário.

**O que decidiu foi uma frase das próprias definições**, que eu tinha lido sem conectar:
*"quando os textos dos cases perderam os exemplos concretos, **o específico saiu junto, e é
nas imagens que ele volta**; a legenda carrega o detalhe que o texto abriu mão de contar."*
"O Produto" **é** o específico que saiu, Pendências, treemaps, Consumo Livre, os 18
indicadores. É conteúdo de legenda escrito em forma de prosa. E a linha editorial fecha:
*"o produto aparece como evidência, nunca como assunto"*, e uma seção chamada "O Produto"
faz dele o assunto.

**Custo aceito.** Quem ler o case não aprende, em palavras corridas, o que o produto faz:
vai depender das imagens e das legendas existirem e serem boas. **Isso transfere peso para
uma dependência que ainda não foi produzida.** Se as imagens ficarem fracas, este texto é
o que faz falta, e reverter custa remover um marcador.

**Consequência.** O contrato passou a declarar que **privado tem dois usos legítimos**:
anotação de trabalho e material de origem. Antes só o primeiro estava previsto, e é por isso
que este bloco não tinha classificação possível.

---

## 039 · O card de case é componente, construído antes do resto do design system

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** componentes · `#restricao`

**Gatilho.** Desenhar a tela de Trabalhos exigia o card, que aparece **em dois lugares**:
no índice e ao fim de cada case.

**Decisão.** O card foi construído como **componente**, não como desenho copiado, e as duas
telas usam instâncias dele.

**Alternativa descartada.** Desenhá-lo solto em Trabalhos e de novo na página de case, como
o resto do wireframe foi feito. Perdeu porque é exatamente assim que duas versões do mesmo
elemento divergem, e o contrato do índice já declara que os dois usos são o mesmo
componente.

**O que isso admite.** As telas estão sendo desenhadas **antes** do design system, que é a
Fase 2. A Home foi assim e o card também seria, se não fosse usado duas vezes. **Construir
este componente fora de ordem é reconhecer que a ordem foi invertida**, não corrigi-la.

**Custo aceito, e ele é concreto.** O componente **não mantém a proporção da capa ao ser
redimensionado**: a altura é fixa e precisou ser ajustada à mão nas instâncias estreitas.
Enquanto isso não for resolvido, cada tela ajusta por conta e elas voltam a divergir, que
é o problema que o componente existe para evitar.

**Três valores foram preenchidos por mim, não escolhidos:** capa em 3:2, título em
`titulo-cap`, linha em `corpo`. Estão marcados na pergunta **P40** e na descrição do
componente. Eles sustentam o wireframe; não são decisão de design system.

**Consequência.** Trabalhos existe nas duas larguras, e é a **primeira tela a mostrar o
sublinhado de página atual** (decisão 031). Abre também a **P39**: a página tem título? O
documento não diz, e o wireframe traz a lacuna marcada em vez de um título inventado.

---

## 040 · Trabalhos tem título, e ele convida em vez de rotular

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** trabalhos · `#escopo`

**Gatilho.** O wireframe trazia a lacuna P39: o documento descreve a página como "índice
dos cases, em cards" e não menciona título.

**Decisão.** A página tem título, acima dos cards, e ele **convida em vez de rotular**.
Rascunho: *"Dois problemas que eu vi de perto, e o que fiz com eles."*

**Alternativa descartada.** Duas. *Sem título*, com a barra sublinhada bastando para dizer
onde se está: perdeu porque a barra diz **onde**, e o título pode dizer **por que vale
olhar**, que é outra função. *Um rótulo como "Trabalhos"*: repetiria o item da barra e não
acrescentaria nada.

**Por que este texto.** Ele diz algo que é verdade dos dois cases e que nenhum dos dois diz
sozinho: **ambos começaram observando uma pessoa travar numa tarefa comum.** Finanças partiu
de alguém tentando juntar duas vidas financeiras numa planilha; Reembolso, de alguém
repetindo todo mês um pedido que o aplicativo tratava como se fosse o primeiro.

**Custo aceito.** É rascunho meu na voz dela: registrado como P41.

---

## 041 · Correção de digitação nos textos passa a ser feita sem perguntar

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** conteudo · `#escopo`

**Gatilho.** Apontei um erro de digitação no card de Reembolso e Larissa autorizou a
corrigir sempre.

**Decisão.** Erros de digitação e pontuação nos arquivos de conteúdo são corrigidos sem
perguntar. **Mudança de palavra, de sentido ou de construção continua sendo dela.**

**Alternativa descartada.** Continuar apontando cada um: perdeu por atrito sem ganho: um
erro de digitação não tem duas leituras possíveis.

**Consequência imediata.** 22 correções, 20 delas no case de Reembolso. A mais séria era
**"Nilsen" onde se lê Nielsen**: o nome do autor das dez heurísticas, num case cujo método
é avaliação heurística. É o tipo de erro que quem faz triagem em UX nota.

**Um efeito colateral que vale registrar.** Corrigir o arquivo de texto **não corrigiu o
desenho**: as instâncias do card no Figma tinham a cópia antiga, e precisaram ser
sincronizadas à mão. É a mesma classe de problema da exportação de tokens (decisão 037):
**o Figma guarda cópias daquilo que o repositório é fonte**, e nada avisa quando as duas
divergem.

---

## 042 · O texto do case ocupa seis colunas, não cinco

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** case · `#reversao`

**Reverte a grade de leitura escrita nas definições.**

**Gatilho.** Antes de desenhar a página de case, medi a grade que as definições descrevem:
*"a trilha ocupa as duas primeiras colunas, o título as três seguintes e o texto as cinco
últimas"*: contra a regra da medida de linha.

**Decisão.** O texto ocupa **seis colunas**. A grade de leitura fica: trilha nas colunas 1 e
2, título nas 4 a 6, texto nas 7 a 12. Fecha exatamente em doze.

**Alternativa descartada.** Manter cinco colunas, como está escrito. Perdeu por medição:
cinco colunas dão 519px e **61 caracteres** por linha, quatro abaixo do mínimo de 65. Seis
dão 628px e 74 caracteres, dentro da faixa.

**Quem decidiu foi a própria hierarquia das regras dela.** A regra da medida diz, com todas
as letras, que *"é o número que governa a largura da coluna de texto, **não o contrário**"*.
Entre uma grade que diz cinco e uma medida que exige seis, a medida ganha por declaração
expressa, não por eu ter escolhido.

**Custo aceito.** A frase das definições sobre a grade de leitura fica desatualizada em um
número, e quem ler o documento sem ver esta entrada vai desenhar cinco colunas.

**Consequência.** Dois contratos novos no domínio case, que era o mais denso e tinha só um
arquivo: `pagina-de-case.md` e `trilha.md`. Abre a **P42**: nos arquivos de case, o hero
está dentro do primeiro capítulo, e a construção só conseguiria separá-lo por posição, o
tipo de regra que a decisão 006 recusou.

---

## 043 · A faixa de progresso nomeia a etapa, não só mede o quanto falta

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** case · `#escopo`

**Gatilho.** Desenhar o case em tela estreita exigiu a faixa de progresso que substitui a
trilha. As definições a descrevem como *"uma faixa fina de progresso, tocável para abrir a
lista completa de etapas"*, e não dizem o que ela mostra.

**Decisão.** A faixa **nomeia a etapa atual e diz a posição**: "Descoberta · 2 de 6":
além do trilho preenchido.

**Alternativa descartada.** Uma faixa apenas gráfica, um trilho com a parte percorrida
preenchida. Perdeu porque **daria só metade da informação**: as definições dizem que a
trilha *"dá duas informações ao mesmo tempo: onde estou e quanto falta"*. Um trilho sozinho
responde quanto falta e **perde onde estou**, e é justamente em tela estreita, onde não há
lista visível, que saber onde se está fica mais difícil.

**Custo aceito.** A faixa deixa de ser fina de verdade: passa a ter altura de texto, e come
espaço vertical numa tela que já tem pouco.

**Consequência.** A regra subiu para o contrato da trilha, com o cenário correspondente. E
o contrato da página ganhou a regra que a largura impõe: **em tela estreita o título do
capítulo fica acima do texto**, porque não há grade para duas faixas, *"título ao lado do
texto" vale onde há grade para isso*, do mesmo jeito que a medida de linha vale onde há
largura.

---

## 044 · O marca-texto cobre um trecho da hero, não necessariamente do título

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** case · `#reversao`

**Reverte "uma faixa atrás de parte do título"**, escrito nas definições.

**Gatilho.** Larissa quis destacar *"Decidi transformar essa cena em um aplicativo
desktop."*: frase que está na abertura do case, não no título.

**Decisão.** O marca-texto cobre um trecho **da hero**, uma vez por página: do título **ou**
da frase de abertura. A restrição de estar na hero, e de acontecer uma vez só, não muda.

**Alternativa descartada.** Manter o destaque no título e não atender o pedido. Perdeu
porque o trecho escolhido é a **virada da frase**: a abertura tem três tempos, observação,
**decisão** e resultado, e destacar o segundo marca onde o case começa de fato. Destacar
"A planilha" no título marcaria o assunto, que a linha editorial dela diz não ser o ponto:
*"o produto aparece como evidência, nunca como assunto."*

**O que a mudança trouxe de técnico.** O trecho cai no meio de um parágrafo e **atravessa
duas linhas**, então a faixa virou duas, com deslocamentos diferentes: 281px na primeira,
zero na segunda. A regra nova diz explicitamente que **a faixa acompanha a quebra, e a
quebra não é escolhida em função da faixa**: parágrafo reflui conforme a largura, título
não. É o oposto da decisão 034, onde a quebra do título foi escolhida pelo destaque.

**Custo aceito.** No wireframe as faixas foram posicionadas por medição e ficam presas a
esta quebra; qualquer mudança de largura, corpo ou texto exige recalcular. No site isso é
gratuito (a faixa é propriedade do trecho, não posição na tela), mas no Figma é trabalho
manual a cada ajuste.

---

## 045 · O título fica junto do texto; ao lado vai a mídia de prova

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** case · `#reversao`

**Reverte a decisão 042 e a grade de leitura original**, em que o título ocupava uma faixa
própria ao lado do texto.

**Gatilho.** Larissa, vendo o case inteiro desenhado: o título pertence ao texto e deve
ficar acima dele; **o que merece a faixa ao lado é a imagem que prova aquele capítulo.**

**Decisão.** Grade de leitura: trilha nas colunas 1 e 2, título e texto juntos nas 3 a 8,
mídia de prova nas 9 a 12. Fecha em doze exatas, sem coluna de folga.

**Alternativa descartada.** A grade anterior: título nas colunas 4 a 6, texto nas 7 a 12,
mídia empilhada abaixo do texto. Perdeu por duas razões que só apareceram com a página
inteira montada. **A imagem empurrava o texto para baixo**, e a página ficava 25% mais
longa: 7242px contra 5414px. E a faixa lateral ficava com um título de três palavras
enquanto a prova visual do capítulo esperava a vez lá embaixo.

**O que isso corrige de fundo.** A regra *"cada imagem precisa provar uma afirmação do
texto"* pedia que a prova estivesse **perto da afirmação**. Empilhada, ela chegava depois de
todo o texto; ao lado, ela chega junto.

**Custo aceito, e virou a P43.** A coluna de mídia tem **411px**. As definições dizem que
este case mostra telas de desktop largas e que **elas são a prova visual do trabalho**:
uma captura de 1440 cabe ali em 29% do tamanho. Ou a mídia larga rompe a coluna, ou mostra
recorte em vez da tela inteira, ou a leitura encolhe abaixo do mínimo de medida. As três
saídas têm custo e nenhuma está escolhida.

**Consequência.** Definições e contrato reescritos. Em tela estreita o que muda é o outro
lado: **a mídia desce para baixo do texto**, porque não há grade para duas faixas, mesma
forma das outras regras que valem "onde há grade para isso".

---

## 046 · Vídeo é servido pelo próprio site, sem pré-carregamento e sem tocar sozinho

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** case · `#restricao`

**Gatilho.** A primeira mídia do case de Finanças é um vídeo do produto em uso, e Larissa
perguntou se isso não deixaria o site pesado.

**Decisão.** O vídeo **não é pré-carregado**: até a pessoa pedir, baixa zero byte, e o que
carrega é a imagem de pôster. **Não toca sozinho.** E é **servido pelo próprio site**, nunca
incorporado de terceiro.

**Alternativa descartada.** Duas. *Incorporar do YouTube ou Vimeo*, que é o caminho mais
fácil: perdeu porque traz script e cookie de rastreamento, e **reintroduziria o aviso de
consentimento que a decisão de não medir existiu justamente para evitar**. *Trocar o vídeo
por sequência de capturas*: perdeu porque as definições pedem o vídeo, e porque produto em
movimento é o que prova "em uso".

**O que respondeu a pergunta do peso.** Nada, do ponto de vista da primeira leitura: sem
pré-carregamento, o custo é o pôster, que é só mais uma imagem. E a regra que garante isso
já existia por outro motivo: *"nada que se mova sem o leitor pedir"*, escrita por conforto
de leitura, resolve o desempenho de graça.

**Custo aceito.** O arquivo vive no repositório, e o Git guarda binário sem compressão
incremental: cada versão nova soma ao histórico para sempre. Um recorte curto é irrelevante
diante dos limites, mas trocar o vídeo cinco vezes deixa cinco cópias lá dentro.

**Consequência.** O vídeo passa a ser **duas peças** no inventário de materiais: o arquivo e
a imagem de pôster.

---

## 047 · Saída para fora do site é link, não botão; e o protótipo sai deste case

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** case · `#reversao` `#escopo`

**Reverte "botão de protótipo em cada case"**, escrito nas definições: nas duas metades da
frase.

**Gatilho.** Larissa, vendo o fim da página desenhado: **"botão dá sensação de dentro do
site; link sublinhado o usuário entende que vai pra fora."** E: o protótipo do case de
Finanças não existe e não será feito.

**Decisão.** Saída para fora do site é **link sublinhado**, precedido de um convite que diz
o que a pessoa vai encontrar. **Protótipo só onde existe**: Reembolso tem, Finanças não.

**Alternativa descartada.** Manter o botão com rótulo avisando que sai. Perdeu porque
**a forma promete antes do rótulo explicar**: botão é a forma de "acontece algo aqui", e um
aviso em letra menor não desfaz a promessa que o contorno já fez. A afordância chega
primeiro que o texto.

**O que isso generaliza.** A decisão 030 já tinha tirado o contorno do contato por ele
competir com os cases; aqui o contorno sai por outro motivo: **prometia o destino errado**.
São razões diferentes chegando na mesma conclusão: neste site, contorno de botão é reservado
para a ação principal, e o resto é palavra.

**Custo aceito.** Um link é menos visível que um botão. O repositório é a única prova
verificável deste case, e passa a chamar menos atenção do que chamava.

**Consequência.** O inventário de materiais perdeu um link e ganhou um texto: o convite ao
repositório, hoje rascunhado como *"O processo inteiro está no repositório, decisão por
decisão."* O contrato ganhou o cenário da saída externa. E a promessa de "protótipo em cada
case" deixa de existir: a lista de dependências do PRD já não pode cobrar um protótipo que
não será feito.

---

## 048 · Em "Quem sou eu", currículo é botão e contato é texto

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** quem-sou-eu · `#escopo`

**Gatilho.** A página precisa oferecer currículo e contato, e a decisão 047 acabou de
estabelecer que botão promete ação dentro do site e palavra promete ir embora.

**Decisão.** O currículo é **botão**: baixar um arquivo é ação que acontece aqui. O e-mail
e o LinkedIn aparecem como **texto**, porque levam para fora.

**Alternativa descartada.** Os dois como botão, que era o desenho anterior do contato antes
da decisão 030. Perdeu porque trataria destinos diferentes com a mesma promessa.

**O que isso confirma.** A regra da 047 não era sobre links externos: era sobre **forma
prometendo destino**. Aplicada aqui, ela separa duas coisas que pareciam iguais: baixar e
sair, sem precisar de rótulo explicando.

---

## 049 · A legenda obrigatória vale para imagem de prova, não para a foto

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** conteudo · `#reversao`

**Reverte "toda imagem tem legenda, e sem ela não entra."**

**Gatilho.** Ao acrescentar o marcador de foto ao `quem-sou-eu.md`, **a checagem recusou o
arquivo**: imagem sem `Legenda:` na linha seguinte.

**Decisão.** **Texto alternativo é obrigatório em toda imagem**, sem exceção. **Legenda é
obrigatória em imagem de prova**, sem ela a imagem não entra. **A foto declarada por
`<!-- bloco: foto -->` é exceção**: não prova afirmação nenhuma, é peça da página.

**Alternativa descartada.** Escrever uma legenda para a foto, só para satisfazer a regra.
Perdeu porque seria legenda sem função, e a razão da regra é que *"a legenda carrega o
detalhe que o texto abriu mão de contar"*, o que só faz sentido para imagem que prova algo.

**Quem encontrou foi a checagem, não eu.** A regra tinha sido escrita pensando só em mídia
de case, e valia para tudo. O primeiro uso fora desse contexto a quebrou, que é
exatamente o que uma verificação automática serve para fazer.

**Consequência.** Contrato e script atualizados, com três cenários no lugar de um: imagem de
prova com legenda, imagem de prova sem legenda, e a foto da página.

## 050 · Os textos dos valores foram reescritos no Figma e voltaram para o arquivo

**Contexto.** Larissa enxugou os seis textos de valores direto no Figma, buscando blocos mais
parelhos. O arquivo `quem-sou-eu.md` seguia com as versões longas.

**Decisão.** Os textos do Figma foram transcritos de volta para `quem-sou-eu.md`, que continua
sendo a fonte: é dele que o site é construído.

**Por quê.** A regra do projeto diz que nenhuma palavra é copiada do Figma para o código, e
ela continua valendo. Mas ela descreve o fluxo normal, em que o Figma recebe amostras. Aqui o
fluxo se inverteu: a escrita aconteceu no Figma. O que a regra protege é o arquivo ser a
fonte, não a direção em que o texto viaja uma vez. Então o texto volta para o arquivo, e o
arquivo segue mandando.

**Consequência.** Os seis blocos encurtaram. Duas correções de digitação entraram junto: um
espaço duplo em "Amor" e uma vírgula solta em "um lema, que significa". A ênfase em
*melhor possível*, que existia no arquivo e se perdeu no texto simples do Figma, foi
restaurada.

## 051 · Blocos curtos em grade: largura única, viúva é trabalho do navegador

**Contexto.** Em 411px, dois dos seis valores terminavam com uma palavra sozinha na última
linha: "passamos." e "existir.". Larissa estreitou esses dois para 380px, o que resolveu, e
perguntou como isso ficava nas regras.

**Decisão.** A largura volta a ser única (411px, 4 colunas) para todos os blocos da mesma
grade. A viúva passa a ser resolvida por `text-wrap: pretty` no site, e por edição do texto
quando incomodar de verdade.

**Por quê.** O ajuste dela estava certo no diagnóstico e errado na alavanca. Largura por bloco
tem três problemas: quebra o alinhamento das linhas, fica fora da grade (380px são 3,72
colunas), e serve a uma frase exata, trocar uma palavra desfaz o motivo e deixa o número. O
que pesa mais: no estreito a largura é ditada pela margem, então o ajuste simplesmente não
existe lá. `text-wrap: pretty` resolve nas duas larguras, de graça, e degrada em silêncio.

**Consequência.** Regra dos blocos curtos escrita nas definições. P46 resolvida: medida abaixo
de 65 é permitida nesses blocos, com piso em torno de 45. Os seis valores voltaram a 411px.

## 052 · Em "Quem sou eu" nada é botão: os três caminhos para fora têm a mesma forma

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** quem-sou-eu · `#reversao`

**Reverte a decisão 048**, que tinha posto o currículo como botão e o contato como texto.

**Gatilho.** Larissa, redesenhando o fim da página: o currículo passa a ser link escrito, o
LinkedIn ganha link próprio, e os três entram sob um convite único, "Mais sobre mim:".

**Decisão.** Currículo, LinkedIn e e-mail são **palavra sublinhada**. Nada nessa página é
botão.

**Por quê.** A 048 tinha lido "baixar um arquivo" como ação que acontece dentro do site. Mas
o PDF não acontece dentro: ele abre no leitor, ou vai para a pasta de downloads. Os três
saem, o que muda é para onde, não se saem. A regra da 047 ("a forma promete o destino")
continua valendo; o que estava errado era a classificação do download, não a regra.

**Alternativa descartada.** Manter o botão e mudar só o LinkedIn. Perdeu porque deixaria dois
destinos externos com formas diferentes na mesma lista de quatro linhas, e a diferença de
forma teria que significar alguma coisa que não significa.

**Custo aceito.** O currículo perde destaque: era o único contorno da página. Aceito porque
o convite acima ("Mais sobre mim:") já agrupa os três, e a página inteira não tem ação
principal disputando atenção.

**Consequência.** O bloco `116:73` foi substituído por `127:32`. O contrato ganhou o cenário
dos três caminhos com a mesma forma. Com isso, o botão deixa de existir em "Quem sou eu":
resta como forma apenas onde há ação principal dentro do site.

## 053 · O site não explica por que tem dois cases

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** quem-sou-eu · `#reversao` `#escopo`

**Reverte** a exigência, escrita nas definições e no contrato, de que "Quem sou eu" mencione
que o próprio site está sendo documentado enquanto é construído.

**Gatilho.** Larissa, vendo a nota de lacuna no wireframe: *"essa nota aqui não precisa, não
pretendo adicionar esse parágrafo."*

**Decisão.** O parágrafo não será escrito. O site publica com dois cases e **não comenta a
ausência do terceiro** em lugar nenhum. O terceiro entra quando estiver escrito.

**Por quê.** A ideia original era transformar a ausência em demonstração. Mas o texto que faz
isso precisa primeiro apontar a ausência, e um portfólio que explica quantos cases não tem
chama atenção para a conta em vez do trabalho. Dois cases não são uma falta que precise de
nota de rodapé; são dois cases. O terceiro vai demonstrar o processo **sendo** o case, não
sendo anunciado antes de existir.

**Alternativa descartada.** Manter o parágrafo em versão mais curta e discreta. Perdeu pelo
mesmo motivo: qualquer versão dele precisa nomear a ausência para justificá-la.

**Custo aceito.** Perde-se o enquadramento que fazia o site parecer deliberadamente
inacabado. Quem chegar antes do terceiro case vê um portfólio de dois cases, sem contexto de
que há mais vindo.

**Consequência.** A nota `@lacuna P44` saiu do wireframe. P44 fechada. Exigência removida do
contrato, das definições e do PRD.

## 054 · "Apresentação" era rótulo de estrutura, não título

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** conteudo · `#restricao`

**Resolve a P45.**

**Gatilho.** Em `quem-sou-eu.md`, `## Apresentação` e `## Meus valores` estavam no mesmo
nível, mas o wireframe desenhou um e não o outro, sem nenhuma regra explicando a diferença.

**Decisão.** `## Apresentação` virou `<!-- bloco: apresentacao -->`. "Meus valores" continua
título.

**Por quê.** A regra da 006 diz *marcador é comentário HTML, título é conteúdo*, mas ela
resolve a forma, não a classificação. Faltava o teste. Ele é: **a quem a palavra se dirige.**
"Meus valores" é frase dita a quem visita a página. "Apresentação" é palavra usada para
organizar o arquivo: ninguém escreve "Apresentação" acima da própria apresentação. O `##`
estava escondendo um rótulo dentro da forma de título.

**Alternativa descartada.** Apagar a linha e deixar a construção entender por posição: tudo
entre a foto e o primeiro `##` seria a apresentação. Perdeu pelo mesmo motivo que a 006
recusou regra por posição: funciona até alguém inserir um parágrafo em outro lugar.

**Consequência.** Vocabulário de blocos ganhou `apresentacao`. `BLOCOS_VALIDOS` atualizado no
script. O contrato de conteúdo ganhou a seção "Como separar título de rótulo", com o teste
escrito para a próxima vez.

## 055 · O site tem três formas, não duas: contorno, sublinhado e palavra simples

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** erro · `#restricao`

**Gatilho.** A página de erro precisa oferecer três saídas, e nenhuma das duas formas que o
projeto tinha escrito servia. Botão prometeria "acontece algo aqui" (e não acontece nada
aqui, você só vai embora. Sublinhado prometeria sair do site) e as três levam para dentro.

**Decisão.** O vocabulário de formas fica explícito, com três entradas:

| Forma | Promete | Onde |
|---|---|---|
| Contorno de botão | ação que acontece dentro do site **e é a principal da página** | um lugar: o convite ao contato no fim de um case |
| Palavra sublinhada | vai para fora do site | currículo, LinkedIn, e-mail, repositório |
| Palavra simples | navegação para outra página daqui | barra, saídas da página de erro |

**Por quê.** A terceira forma já existia: é a da barra fixa, mas nunca tinha sido nomeada.
Por isso as decisões 047 e 052 pareciam tratar de uma escolha binária, e por isso a 048
errou: com só duas formas na cabeça, baixar um arquivo teve que virar botão por eliminação.
Com três, cada caso tem onde cair.

**Alternativa descartada.** Dar contorno à saída principal ("Ver os trabalhos") e deixar as
outras duas como palavra. Perdeu porque a diferença de forma teria que significar alguma
coisa, e ali ela significaria só "essa é a que eu prefiro que você clique", que é
hierarquia editorial, não promessa de destino, e o site já expressa hierarquia pela ordem.

**Consequência.** Contrato da página de erro escrito e desenhado nas duas larguras. A regra
das três formas vale para o site inteiro e passa a ser o teste para qualquer elemento novo:
**a pergunta não é "quanto destaque isso merece", é "para onde isso leva".**

## 056 · O texto da página de erro assume a falha antes de oferecer a saída

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** erro · `#conteudo`

**Resolve a P47.**

**Gatilho.** O texto da página era rascunho meu. Três direções foram escritas inteiras:
título, corpo e os três rótulos juntos, porque voz se escolhe em bloco, não em pedaços.

**Decisão.** Título: *"Esse endereço não leva a lugar nenhum."* Corpo: *"Pode ser um link
meu que envelheceu, ou um erro de digitação. De qualquer forma, o que você procurava deve
estar em um desses caminhos."* Saídas inalteradas.

**Por quê.** A ordem das duas hipóteses é a decisão inteira: **o link quebrado vem antes do
erro de digitação.** Isso tira a culpa de quem leu antes de oferecer a saída, e é a mesma
postura dos cases, olhar o sistema, não o usuário. A versão anterior dizia "pode ter
mudado, ou pode ter vindo com um erro de digitação", que é a mesma informação com o dedo
apontado para o outro lado.

**Alternativas descartadas.** Uma versão neutra, que resolveria e liberaria: perdeu por ser
o 404 de qualquer site. E uma que transformava o erro em conversa, pedindo aviso do link
quebrado: perdeu porque pede trabalho de quem já se frustrou, e porque trocaria "Falar
comigo" por um rótulo de uso único.

**Consequência.** A caixa de lacuna saiu das duas larguras. P47 fechada. O contrato ganhou o
cenário que fixa a ordem das hipóteses, sem ele, uma reescrita futura poderia inverter as
duas frases sem perceber que inverte a postura.

## 057 · O inventário de componentes fecha em oito, e revela que só um existe

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** componentes · `#restricao`

**Resolve a P30.**

**Gatilho.** A lista dos sete previstos foi escrita antes de qualquer tela existir. Com as
cinco desenhadas nas duas larguras, dava para conferi-la contra o que o arquivo realmente
tem, em vez de aceitá-la.

**Decisão.** A lista fecha em **oito**: barra fixa, card de case, trilha, tira de destaques,
bloco de mídia com legenda, botão, marca-texto e marcador de falta.

**O que mudou.** Entraram **marca-texto** (8 ocorrências, home e case) e **marcador de
falta** (19 ocorrências, quatro telas): nenhum dos dois estava previsto. Saiu **campo de
foco**, que não é componente: é token. A própria regra deste inventário diz que
acessibilidade vive dentro de cada componente, e `foco/largura` e `foco/afastamento` já
existem nas variáveis; mantê-lo criaria uma peça que ninguém instancia. E o **botão**
encolheu: depois das decisões 047, 052 e 055 ele sobrevive em um lugar só, o convite ao
contato no fim do case.

**O teste que a lista passou a ter.** Um elemento entra no inventário quando aparece em mais
de uma tela **ou** em mais de uma largura. Foi ele que trouxe marca-texto e marcador de falta,
e foi ele que deixou campo de foco de fora.

**O que a conferência revelou, e que ninguém tinha perguntado.** Dos oito, **só o card de
case é componente de verdade no Figma**. A barra fixa está copiada **dez vezes**: mudá-la
hoje é mudá-la em dez lugares à mão. As duas telas construídas nesta sessão clonaram a barra
de telas existentes: a décima cópia nasceu hoje. Nenhuma checagem pega divergência entre
cópias, porque cópias não têm do que divergir até alguém editar uma.

**Consequência.** Lacuna fechada no contrato, que ganhou a tabela dos oito e os dois cenários
que a mantêm honesta. Desenhar os sete que faltam continua sendo trabalho da Fase 2, o que
esta decisão fecha é *qual é a lista*, não *que ela está construída*.

## 058 · O segundo case desenhado, e a tabela entra no inventário

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** case · `#escopo`

**Gatilho.** O case de Reembolso precisava existir em desenho. Ele tem cinco capítulos, não
seis, e **três tabelas**: elemento que o case de Finanças não tem.

**Decisão.** Tela desenhada nas duas larguras. A **tabela de comparação** entra no inventário
como nono componente, e ganha duas regras: ocupa a largura inteira do conteúdo, não a coluna
de leitura; e **em tela estreita rola na horizontal dentro da própria janela**, com aviso em
palavras.

**Por quê a tabela não obedece à medida de linha.** A regra dos 65–75 governa prosa. Tabela é
dado, e o que governa é a comparação ficar legível lado a lado: a coluna "fluxo atual" ao
lado de "novo fluxo" é a frase inteira que a tabela diz. Empilhar as linhas no estreito
destruiria exatamente isso.

**O aviso não é enfeite.** Sem ele, quem não arrasta nunca descobre que existe uma coluna à
direita, e a tabela mente por omissão, mostrando metade da comparação como se fosse toda.

**O que o desenho confirmou sobre a P42.** O capítulo 1 deste case **não tem título próprio**:
o `#` que existe dentro dele é o título do case, consumido pelo hero. O mesmo acontece no case
de Finanças. Não é coincidência dos dois arquivos: é a estrutura que eles compartilham, e é
por isso que a construção precisa de um marcador em vez de deduzir por posição.

**Consequência.** Contrato do case ganhou a seção das tabelas e o cenário da rolagem.
Inventário foi para nove: **a lista mudou duas vezes em dois dias**, o que é o teste de
entrada funcionando, não furando.

## 059 · Os três valores do card deixam de ser provisórios

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** componentes · `#restricao`

**Resolve a P40.**

**Gatilho.** Capa em 3:2, título em `titulo-cap` e linha em `corpo` sustentavam o card desde
que ele foi construído, mas nenhum dos três tinha sido escolhido, foram preenchidos para o
componente existir.

**Capa em 3:2, quem decide é a tela estreita.** A mesma imagem serve 628 e 327 de largura.
Em 327, uma proporção de 2:1 daria 163px de altura: curto demais para uma composição de
produto continuar legível. 3:2 dá 218. O desktop toleraria qualquer proporção; o card
estreito é que tem piso. **A restrição mais apertada é que escolhe**, e ela não estava no
tamanho maior.

**E isso decide outra coisa que ninguém tinha perguntado:** nenhum dos dois cases tem material
nativo em 3:2, Finanças são capturas largas de desktop, Reembolso são telas altas de
celular. Então **a capa é composição, não captura**. Recortar uma captura larga até caber
jogaria fora justamente o que ela prova.

**Título em `titulo-cap`.** O card mostra um título de case, que na própria página do case é
`titulo-case`. Um degrau abaixo é a forma reduzida do mesmo texto. Dois degraus: `subtitulo`
poriam o título de um case abaixo dos nomes dos valores em "Quem sou eu".
**Custo aceito:** no fim de um case o título do card iguala o nível dos títulos de capítulo.
Aceito porque a capa acima dele marca o card como objeto, não como cabeçalho: 36px sob uma
imagem grande não se lê como seção.

**Linha em `corpo`.** É frase para ler, não metadado. `apoio` a rebaixaria a legenda;
`abertura` a faria competir com o título.

**Consequência.** A capa foi cravada em 3:2 exato nas nove cópias, estavam em 1,494. A trava
de proporção continua pendente e é **ação de interface**: a API expõe `targetAspectRatio`
como somente leitura. O inventário de materiais ganhou a especificação da capa, com o mínimo
de 1252×835 para alta densidade.

## 060 · O contato revelado ganha desenho, e o véu é decisão de dedo

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#lacuna-fechada`

**Gatilho.** Larissa, sobre o botão no fim do case: *"aqui falar como é botão mesmo né? o que
acontece ao clicar ali?"* A resposta existia em oito cenários do contrato e em nenhum pixel.

**Decisão.** O contato revelado foi desenhado nas duas larguras: `152:42` e `152:61`. É
**caixa sobre a mesma página**, não página nova: o e-mail escrito por extenso e o LinkedIn,
os dois como palavra sublinhada, porque os dois saem do site.

**As duas larguras não se comportam igual, e a razão é o dedo.** No desktop a caixa ancora
logo abaixo do que a abriu e **não tem véu**: o clique fora tem mira precisa, e escurecer a
página inteira cobraria caro por uma caixa pequena. Em tela estreita ela ocupa a largura e
**ganha véu**, porque o dedo não tem mira fina e o véu é o que dá um alvo grande para
recolher. Mesma função, dois aparelhos de apontar.

**Consequência.** A tabela da decisão 055 foi corrigida: ela registrava só o destino
("acontece dentro do site") e tinha deixado cair o qualificador que a 047 já trazia, **"e é
a ação principal da página"**. Sem ele, "Falar comigo" como botão no fim do case e como
palavra na tela de erro pareciam contradição; com ele, as duas estão certas. Era falha de
registro, não de desenho.

## 061 · "Tema" abre as duas posições, e o menu estreito não empilha camada

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** tema · `#restricao`

**Gatilho.** O menu da tela estreita contém "Quem sou eu" e o controle de tema, e o controle
estava marcado como *"forma a definir"* desde que a barra foi desenhada. Não dava para
desenhar o menu sem resolver.

**Decisão.** "Tema" **abre uma caixa com as duas posições**, Claro e Escuro, com a que está em
vigor marcada. Não troca direto.

**Por quê, entre três formas possíveis.** Trocar direto custaria um toque a menos, mas nunca
diria *qual das duas está valendo*, e como o tema segue o sistema na primeira visita, quem
chega não sabe se o que vê foi escolhido ou herdado. Nomear o destino ("Escuro" quando o site
está claro) resolveria isso, mas faria o rótulo da barra mudar sozinho entre visitas.
Mostrar as duas posições é o que o contrato já descrevia: *"o controle tem duas posições"*,
e usa o mesmo padrão do contato: **três sobreposições no site, um jeito só de abrir e fechar**.

**Custo aceito.** Dois toques para alternar entre duas coisas.

**O que a tela estreita acrescentou.** Lá o tema vive dentro do menu, e o menu **já é a camada
aberta**. Abrir uma caixa sobre a caixa seria empilhar camada em camada por uma escolha entre
dois itens, então as duas posições aparecem **em linha, dentro do próprio menu**. E
**escolher não fecha o menu**: a troca acontece atrás e é visível; fechar esconderia o
resultado no mesmo gesto que o produz.

**A posição em vigor é marcada, não só colorida**: a mesma regra que a barra já aplica ao
indicador de página atual.

**Consequência.** Duas telas novas: `154:42` (menu aberto, estreita) e `154:89` (tema
revelado, desktop). A lacuna do controle de tema fechou no contrato do tema. A moldura ganhou
o menu na tabela de peças.

## 062 · O anel de foco, e por que uma cor só basta

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** componentes · `#restricao`

**Gatilho.** Foco visível estava declarado como princípio em três lugares e especificado em
nenhum: os tokens traziam `foco/largura` e `foco/afastamento`, e mais nada.

**Decisão.** Anel de 2px, afastado 2px, seguindo a forma do elemento, em `text/primary` do
tema em vigor. Aparece no foco por teclado, não no clique. Demonstrado em `155:42` sobre os
seis tipos de alvo que o site tem.

**O afastamento é o que decide a cor.** Eu ia propor um anel de dois tons (claro por dentro,
escuro por fora) que é a solução padrão quando o fundo é imprevisível. Fui verificar e não
era necessário: **como o anel nunca encosta no elemento, ele cai sempre sobre a superfície de
fundo**, e dentro de um tema todas as superfícies são da mesma família de claridade,
inclusive as cinco cores de case. O afastamento, que parecia detalhe estético, é o que torna
uma cor suficiente.

**O alvo é o elemento inteiro.** No card de case o anel envolve o card, não o título: o card
todo é o link. Se o anel marcasse só o texto, ele mentiria sobre o tamanho da área clicável.

**Região que rola recebe foco.** A tabela em tela estreita precisa ser alcançável pelo
teclado para poder ser rolada. Sem isso, a decisão 058, que mandou a tabela rolar em vez de
empilhar: deixaria metade da comparação inacessível para quem não usa o dedo. A regra de
rolagem criou a necessidade de foco; as duas só funcionam juntas.

**Duas faltas encontradas pelo caminho, as duas abertas como pergunta.** O **atalho de salto**
(P48) não existe em contrato nenhum, e é o único elemento do site cuja existência inteira é
um estado de foco: está desenhado como proposta. E **"acento de sistema" não existe como
token** (P49), apesar de ser citado nas definições, em três contratos e em três decisões; o
anel foi definido com `text/primary` para não depender dele.

## 063 · A caixa de tema continua aberta, mas pela razão certa

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** tema · `#correcao`

**Corrige a justificativa da decisão 061.** O comportamento não muda; o motivo escrito
estava errado.

**Gatilho.** Larissa: *"se escolher o tema não fecha a caixa de tema, pra fechar é só clicar
fora?"* A resposta é sim, Esc ou clicar fora, como as outras duas sobreposições. Mas a
pergunta obrigou a reler por que a caixa não fecha sozinha, e a razão registrada não se
sustentava.

**O que a 061 dizia.** *"Fechar esconderia o resultado no mesmo gesto que o produz."*

**Por que está errado.** O resultado da troca de tema é **a página inteira** mudando de cor.
Fechar a caixa mostra mais da página, não menos. O único resultado que a caixa exibe é o
sinal passando de uma posição para a outra, que é a parte menos importante do que acabou de
acontecer.

**A razão certa.** Trocar de tema é **controle de experimentar**: a ação mais provável logo
depois de escolher escuro é olhar e voltar ao claro, para comparar. Fechar a cada escolha
cobraria abrir-escolher-abrir-escolher para comparar duas opções. Navegação não tem esse
padrão: quem escolhe "Quem sou eu" não quer voltar e escolher outra coisa. Tema tem, e é o
que separa este controle de um menu comum.

**O que isso ensina sobre o método.** A 061 chegou ao comportamento certo por um argumento
que não resistia a uma pergunta simples. Um motivo errado não estraga a decisão de hoje, mas
estraga a próxima: quem ler *"fechar esconde o resultado"* vai aplicar isso a algum controle
onde a caixa realmente é o resultado, e acertar por acaso, ou errar. **O registro precisa
resistir a ser reusado**, não só a descrever o que foi feito.

**Consequência.** Contrato do tema reescrito no ponto, com o fechamento por Esc e clique fora
explicitado em cenário próprio: ele estava implícito por analogia com o contato, e
implícito não é verificável.

## 064 · Contrato não aponta para regra por posição, e agora a checagem cobra

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** instrumentacao · `#restricao`

**Gatilho.** Larissa: *"regra tá escrita certo?"* Não estava. O contrato do tema terminava
com *"Como as duas últimas regras convivem com não piscar"*, e as duas últimas já não eram
aquelas: eu tinha inserido quatro regras no meio dez minutos antes.

**Decisão.** Contrato não aponta para regra por posição. Nomeia a regra. O parágrafo virou
*"Como 'sem JavaScript' convive com 'nunca há piscada'"*. **Checagem 5 criada** para cobrar
isso nos onze contratos.

**Por quê.** É o mesmo defeito que a decisão 006 recusou nos arquivos de conteúdo, aparecendo
em outro lugar. Referência por posição quebra **em silêncio**: o texto continua lendo bem,
só passa a descrever outra coisa. Ninguém percebe até tentar usar.

**A primeira versão da checagem estava errada, e isso foi o mais útil.** Ela acusou seis
frases corretas: *"a faixa aparece logo abaixo da barra"*, *"a caixa ancora logo abaixo do
que a abriu"*. Nenhuma aponta para o documento: descrevem a tela, onde posição é justamente o
que se quer dizer. **A distinção que faltava é entre apontar para o texto e descrever a
interface.** Uma checagem que acusa o inocente é pior que checagem nenhuma, porque ensina a
ignorar a saída.

**Como foi verificada.** Reintroduzi o defeito original no contrato do tema, rodei, vi a
checagem acusar, desfiz. Checagem que nunca falhou é checagem que ninguém sabe se funciona.

**Consequência.** Duas correções no contrato do tema: a referência posicional, e a regra de
"escolher não fecha", que carregava a refutação do motivo errado da 061, argumento contra
uma ideia morta é matéria do log, não do manual. Quem abre o contrato quer saber o que vale.

## 065 · A divisão da barra estreita passa a trazer a conta que a obriga

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#instrumentacao`

**Gatilho.** Larissa, olhando o painel do menu: *"porque aqui diz 'quem sou eu'?"* O contrato
afirmava que "Quem sou eu" e o tema vão para o menu, e não dizia o que força isso.

**Decisão.** A regra passa a trazer a medida: barra estreita tem **327px** úteis; a
combinação que cabe soma **308px**, com 19 de folga; "Quem sou eu" tem **113px** e não entra
em arranjo nenhum, falta 24px mesmo sacrificando Contato, 47px no lugar de Contato, 109px
com tudo aberto.

**Por quê registrar o número.** Sem ele a divisão parece escolha de organização, e escolha de
organização se rediscute. Com ele, a única coisa que muda a divisão é mudar a largura da tela
ou encurtar o rótulo. **Uma regra que não traz a restrição que a produziu convida a ser
desfeita por alguém de boa-fé.**

**O que a pergunta também nomeou.** O menu guarda **uma página só**. É estranho para um menu,
e é honesto: ele não existe por juntar coisas parecidas, existe por não caber. Está escrito
assim no contrato, para que ninguém tente "consertar" a estranheza sem saber que o consertar
não cabe.

## 066 · Dentro do menu, "Tema" tem o tamanho de "Quem sou eu"

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** tema · `#correcao`

**Gatilho.** Larissa, sobre o painel do menu: *"estranho é o tema tá com fonte diferente do
quem sou eu, os dois estão igualmente dentro do menu."*

**O que estava errado.** Eu tinha desenhado "Tema" como rótulo de grupo (13px, cinza) o que
marca **nível**. Mas não há diferença de nível: os dois são exatamente o que o menu guarda.
A regra da barra já dizia *"o nível se marca pelo tamanho"*, e eu usei tamanho para marcar
outra coisa.

**Decisão.** "Tema" passa a 18px, igual a "Quem sou eu". A diferença real, que "Quem sou eu"
se toca e "Tema" não: vai para dois eixos que não são o de nível: **cor**, que diz que é
nome e não alvo, e **recuo**, que põe Claro e Escuro visivelmente debaixo dele.

**O que isso separa.** Três coisas diferentes estavam apoiadas no mesmo eixo: *nível*
(tamanho), *interatividade* (cor) e *pertencimento* (recuo). Encolher o rótulo misturava as
três e acertava por acaso. Agora cada uma tem o seu.

**Por que não deixar os dois idênticos**, que era o que a observação pedia ao pé da letra:
tamanho igual **e** cor igual prometeriam um toque que não existe. A intenção dela era "os
dois são irmãos", e é isso que o tamanho passa a dizer. O resto continua distinguindo o que
de fato difere.

## 067 · O rótulo "Tema" some do menu; as opções se nomeiam

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** tema · `#correcao`

**Corrige a decisão 066, tomada minutos antes.**

**Gatilho.** Larissa, de novo: *"tema tá diferente ainda."* A 066 tinha igualado o tamanho e
mantido a cor diferente, com o argumento de que cor marcaria "não se toca".

**O que eu estava fazendo de errado.** Duas tentativas seguidas de **marcar** que "Tema" não
era tocável: primeiro com tamanho, depois com cor. Nenhuma atacava o fato de haver, no meio
de uma lista de alvos, uma linha que não era alvo.

**Decisão.** O rótulo "Tema" **deixa de existir**. As opções passam a se nomear: "Tema claro"
e "Tema escuro". Com isso **tudo o que está no menu tem a mesma forma e tudo se toca**.

**Por que isto é melhor que acertar a marcação.** A pergunta certa não era *como sinalizar a
exceção*, era *por que existe exceção*. Removê-la custou duas palavras e eliminou uma classe
inteira de problema, não há mais o que marcar, então não há mais como marcar errado.

**Por que o desktop não muda.** Lá as opções continuam "Claro" e "Escuro", porque a palavra
"Tema" está logo acima, na barra, e é ela que as nomeia. No menu estreito o gatilho é "Menu",
que não nomeia nada, então as opções precisam se nomear sozinhas. **Não é inconsistência:
é a mesma regra, que é o rótulo vir de algum lugar.**

**Consequência.** Os três rótulos alinham na mesma coluna: "Quem sou eu" reserva a largura do
sinal de escolhido mesmo sem tê-lo. Sem isso a lista ficava desencontrada em 28px.

## 068 · As sobreposições ficam todas a 12px do que as abriu

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#correcao`

**Gatilho.** Larissa: *"agora o desktop, abre e vê se ficou certo."* A caixa de tema estava a
16px da barra; as outras três a 12px.

**Decisão.** Doze, nas quatro. E a regra ganha a parte que faltava: **quando o gatilho é item
da barra, a caixa pende da borda de baixo da barra, não da palavra.** A palavra acaba dentro
da barra, uma caixa saindo do meio dela cobriria a própria barra.

**Por que um número solto passa despercebido.** Dezesseis é valor legítimo da escala, e a
caixa não parecia errada olhando sozinha. Só aparece comparando as quatro, e ninguém compara
quatro telas espalhadas pelo arquivo de propósito. **Foi conferência pedida que achou, não
inspeção de rotina**, e é o tipo de divergência que nenhuma das cinco checagens pega, porque
elas leem os documentos e este número mora no Figma.

**O que mais foi conferido e estava certo.** A caixa termina em 1360, igual ao fim de "Tema"
e à margem da página. Os dois rótulos começam na mesma coluna, com "Escuro" reservando a
largura do sinal. A tipografia é 18/30, a dos itens da barra: o menu estreito usa 18/32
porque lá a escala é outra.

## 069 · As quatro sobreposições passam a ser a mesma peça

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#correcao`

**Gatilho.** Larissa: *"agora confere o contato também."* A conferência comparou as quatro
caixas lado a lado pela primeira vez.

**O que estava errado.** A casca era igual nas quatro (canto 10, traço 1, sombra y8 r24) e
**o miolo era de duas famílias**. Contato: texto solto numa caixa com respiro de 24, alvo de
32 a 34px. Tema e menu: linhas com respiro próprio, alvo de 54 a 56px.

**Três defeitos, em ordem de gravidade.**

1. **Alvo pequeno demais.** 32px de altura em tela estreita, abaixo dos 44 confortáveis para
   dedo, e eram justamente os dois links que existem para ser tocados.
2. **Só o texto era alvo, não a linha.** No menu, tocar em qualquer ponto da linha funciona;
   no contato, tocar ao lado de "LinkedIn" não fazia nada. A mesma caixa ensinava duas
   coisas diferentes sobre onde se pode tocar.
3. **Tipo diferente sem critério.** Contato no desktop a 21/34, tema a 18/30. Na tela estreita
   os dois já usavam 18, o que mostra que o 21 não era escolha, era sobra de ter construído
   a primeira caixa por analogia com texto de leitura.

**Decisão.** Uma peça só. A caixa é lista de linhas; a linha inteira é o alvo; cada linha tem
12px de respiro em cima e embaixo; o rótulo é 18, o tamanho dos itens da barra.

**Por que o 18 e não o 21.** Sobreposição é lista de alvos, não texto de leitura. O corpo
maior fazia a caixa disputar atenção com a página atrás, que é justamente o que ela não
deve fazer: ela é um desvio curto, não um destino.

**O que a conferência ensina sobre as anteriores.** Este defeito nasceu quando a caixa de
contato foi construída sozinha, antes de existirem as outras três. Cada uma pareceu certa no
dia. **A divergência só existe em comparação, e comparação não acontece por acaso**: foi
pedida duas vezes seguidas, e das duas vezes achou coisa.

## 070 · Conferência do menu e do tema: três defeitos nas peças de referência

**Quando** 2026-09-21 · **Fase** 3 · **Domínio** moldura · `#correcao`

**Gatilho.** Larissa: *"confere o menu e o tema também então."* Eu tinha acabado de usar as
duas como referência para consertar o contato, sem nunca as ter conferido.

**Três defeitos, todos invisíveis olhando uma caixa por vez.**

1. **A divisória do menu tinha respiro diferente dos dois lados**: 12px acima, 20px abaixo,
   por causa de um espaçador de 8px que sobrou da montagem. Espaço assimétrico em volta de
   uma linha lê como erro de impressão, não como separação.
2. **A caixa de tema tinha largura escolhida na mão: 200px.** Nenhuma outra tem. A de contato
   abraça o conteúdo; a do menu ocupa a largura disponível. Duzentos não vinha de nada, e
   número que não vem de nada é número que ninguém sabe manter.
3. **As linhas do tema não ocupavam a caixa.** "Claro" tinha alvo 15px mais estreito que
   "Escuro": duas opções irmãs com áreas de toque diferentes.

**Decisão.** Divisória simétrica. Caixa de tema abraça o conteúdo: 136px, que é a linha mais
larga. Linhas preenchem a caixa, então o alvo é sempre a linha inteira.

**O que custou.** A caixa de tema teve de ser reconstruída do zero. Patch por patch, o nó de
texto ficou preso numa largura antiga e passou a quebrar "Escuro" em duas linhas; aumentar a
caixa não desfazia. **Remontar no molde que já funcionava foi mais rápido que consertar o que
já estava torto**, e é o terceiro episódio hoje em que a leitura de tamanho no Figma vem
defasada e me leva por um caminho errado.

**O que isso diz sobre conferir.** Usei menu e tema como régua para corrigir o contato sem
ter conferido a régua. As duas tinham defeito. **Referência não confere a si mesma.**

## 071 · A sobreposição é o décimo componente, e as quatro finalmente batem

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#restricao`

**Gatilho.** Larissa: *"confere as quatro de novo lado a lado."* Terceira conferência
seguida, e a terceira achou coisa.

**Dois restos.** No contato do desktop **as linhas ainda não ocupavam a caixa**: o mesmo
defeito corrigido no tema minutos antes, que passou porque aquela caixa era a única declarada
como "abraça", e caixa que abraça faz as linhas abraçarem também. E a **coluna do sinal tinha
dois nomes**, `marca de escolhido` e `coluna do sinal`, contra a regra do inventário de um
nome só nos três lugares.

**A decisão maior.** Contato, menu e tema **são um componente**, e ele entra no inventário
como o décimo. Passa o teste de entrada com folga: quatro telas, duas larguras. Estava
faltando não por descuido da lista, mas porque **a peça não existia quando a lista foi
fechada**: a primeira caixa foi desenhada depois, e as outras três nasceram como cópias
dela sem que ninguém declarasse que eram a mesma coisa.

**O que três conferências seguidas ensinaram.** A primeira achou um vão de 16 onde as outras
tinham 12. A segunda achou três famílias de miolo. A terceira achou o resto da segunda. Em
nenhuma delas o defeito era visível olhando uma caixa; em todas ele era óbvio na tabela
comparativa. **Uniformidade não se vê em série, só em coluna**, e nada no processo de hoje
produz colunas sozinho. As três vieram porque foram pedidas.

## 072 · Checagem 6: comparar as quatro sobreposições deixa de depender de alguém pedir

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** instrumentacao · `#instrumentacao`

**Gatilho.** Larissa: *"cria uma checagem pra isso."* Três conferências seguidas acharam
defeito, e as três aconteceram porque foram pedidas.

**O problema de fazer isso virar checagem.** As medidas moram no Figma e o script lê
documentos. O projeto já tinha resolvido esse impasse uma vez, para os tokens: **exporta-se
do Figma para um arquivo gerado, e a checagem confere o arquivo.**

**Decisão.** `docs/spec/sobreposicoes.json`, gerado, nunca editado à mão. **Checagem 6**
compara as quatro em três camadas: a **casca** tem de ser idêntica nas quatro, sem exceção de
largura; o **miolo** tem de ser igual dentro de cada largura, porque tipo e altura mudam com a
escala; e alguns invariantes valem sempre, linha ocupa a caixa, rótulos alinhados, coluna do
sinal em todas as linhas ou em nenhuma, e **alvo nunca abaixo de 44px**.

**Como foi verificada.** Cada um dos defeitos reais encontrados ontem e hoje foi reintroduzido
no arquivo, um por vez, e a checagem acusou os seis: vão de 16, linha que não ocupa a caixa,
alvo de 32, tipo 21 contra 18, coluna do sinal em parte das linhas, sombra diferente.
**Checagem que nunca falhou é checagem que ninguém sabe se funciona**: é a segunda vez hoje
que este projeto verifica o verificador.

**O que ela não faz, dito em voz alta.** Confere o **export**, não o Figma. Se o desenho mudar
e ninguém reexportar, ela aprova o passado com cara de presente. É a mesma limitação de
`tokens.json` e a saída é a mesma: a checagem imprime a data do export toda vez que roda.

**E o que resolveria de verdade.** Nada disso seria preciso se a sobreposição fosse componente
de verdade no Figma, aí a uniformidade seria imposta, não conferida. Esta checagem é muleta
enquanto as dez peças do inventário forem nove cópias e um componente.

## 073 · O design system ganha página própria, componentes de verdade e documento

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#instrumentacao`

**Gatilho.** Larissa: *"cria uma página lá no figma chama de Design System e cria tudo lá,
design system completo, tokens, variáveis, componentes... e cria o documento."*

**O que foi feito.** Página **Design System** (`171:14`) com cinco seções: Cor, Tipografia,
Espaço e forma, Grade e Componentes. As amostras de cor são **vinculadas à variável**, não
repintadas: trocar a variável muda a amostra, e os dois modos aparecem lado a lado no mesmo
quadro. As dez peças do inventário viraram **componentes de verdade**, três delas com
variantes.

**O que isso resolve.** A decisão 057 tinha encontrado que só o card era componente e a barra
estava copiada dez vezes, e que nenhuma checagem pega divergência entre cópias, porque cópias
não divergem até alguém editar uma. Agora a uniformidade passa a ser imposta pelo Figma em vez
de conferida depois.

**O que isso não resolve, e precisa ficar dito.** **As telas ainda não usam os componentes.**
Os wireframes seguem montados com as cópias antigas, feitas antes de as peças existirem.
Trocar cópia por instância é trabalho que falta, e até lá a checagem 6 continua sendo a única
coisa que compara as sobreposições: comparando um export, não o arquivo.

**O documento.** `docs/design-system.md`, e ele **não repete nenhum valor**. Escrever "18px"
ali criaria a segunda fonte de verdade que o projeto existe para evitar, e ela envelheceria em
silêncio no primeiro ajuste. O que entra é o que a variável não diz: qual coleção governa o
quê, as regras que atravessam todas as peças, os endereços, e **uma lista do que o sistema
ainda não tem**, o acento de sistema que não existe, a trava de proporção que é ação de
interface, o atalho de salto sem contrato.

**Uma conferência feita no caminho.** Mover o card de case para a página nova podia quebrar as
instâncias nos wireframes. Nove instâncias, nenhuma perdida.

## 074 · Componentizar encontrou três defeitos que os wireframes escondiam

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa: *"confere tem umas coisas quebradas."* Estavam.

**Dois defeitos eram meus, de ter inventado medida em vez de ler a peça.** O respiro do botão
saiu 17/34/18/34: com vertical **assimétrico**: quando o original é 16/32. E o quadro da
mídia saiu 274 de altura quando o original tem 308. Componente que não bate com o que
substitui é pior que cópia: ele parece autoridade.

**Um era de construção.** No marca-texto o realce tinha largura fixa de 240 sob um texto de
261: a última palavra ficava de fora. Refeito com o realce em posição absoluta e restrição
esticada, para acompanhar a frase qualquer que seja ela.

**E um estava nos wireframes desde sempre, escondido.** Os botões do desktop usam traço de
**1,5**; os da tela estreita, **1**. O token `stroke/padrao` vale **1**. Ou seja: cinco botões
fora do sistema, e a diferença de 3px que eu perseguia entre componente e original vinha
exatamente daí, traço de 1,5 desenhado por fora soma 3 à caixa.

**Decisão.** Traço 1 nos dois, pelo token. Cinco botões corrigidos nos wireframes. E o botão
ganhou a **variante estreita** que eu não tinha visto: 327 de largura cheia, sem respiro
lateral, ela existe nos wireframes desde que o case estreito foi desenhado.

**Por que isso escapou de tudo.** Ninguém compara o traço de um botão com o de outro numa
tela diferente. A checagem 6 só olha sobreposições. O olho não vê meio pixel de traço. **Só
apareceu porque componentizar obriga a responder "qual é a medida certa?" uma vez só**, e aí
as duas respostas diferentes ficam no mesmo lugar, impossíveis de ignorar.

## 075 · Vinte e nove textos escondidos na página do sistema

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** instrumentacao · `#correcao`

**Gatilho.** Larissa: *"parece que os frames estão com tamanho quebrado, a informação dentro
deles não está visível."* Estavam, e era.

**O que era.** `resize(largura, altura)` **desliga o auto-ajuste do texto**. Vinte e nove
textos da página: todos os subtítulos de seção, todas as amostras de tipografia, todas as
descrições de componente: tinham 10px de altura fixa e mostravam só a primeira linha. O
texto estava lá, invisível.

**Por que passou pela minha própria conferência.** Eu tinha rodado uma verificação geométrica
filho que passa da borda do pai, e ela deu **zero**. Não passava: um texto de 10px cabe
folgadamente em qualquer frame. **A checagem estava certa e a pergunta estava errada.** O
defeito não é conteúdo que transborda, é conteúdo que encolheu.

**A terceira vez.** Aconteceu na frase de abertura do case de Reembolso, depois em catorze
textos da mesma tela, agora em vinte e nove. Sempre o mesmo mecanismo, sempre encontrado
olhando e não medindo. Ficou anotado em `docs/design-system.md`, com a ordem correta das
chamadas.

**Consequência.** Os vinte e nove religados. As seções cresceram e foram reempilhadas com
folga constante. A amostra de `display` no desktop foi encurtada para caber em uma linha: um
espécime de tipo que quebra em três linhas não mostra o nível, mostra o parágrafo. Varredura
final: zero textos presos na página do sistema e zero nos wireframes.

## 076 · O sistema mora em duas páginas, e eu criei a segunda sem ler a primeira

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa: *"confere as outras páginas também."* As outras estavam íntegras. O
problema era a relação entre elas.

**O que eu fiz errado.** Criei a página *Design System* sem ler a página *Sistema visual*, que
já existia com oito quadros. Isso é a Diretriz 0, não assumir premissas: quebrada da forma
mais simples possível: assumi que não havia sistema porque ninguém me disse que havia.

**Duas coisas estavam lá e não na minha.**

1. **Doze pares de contraste medidos**, nos dois temas, com o valor de cada um. Eu tinha
   escrito no documento a regra dos 4,5:1 **sem a prova**, que já existia, medida, a uma
   página de distância.
2. **A resposta da P49**, escrita desde sempre: *"duas cores sobram para o sistema: uma para
   estado (link, foco, item ativo) e uma livre para a hero."* O acento de sistema nunca esteve
   faltando do plano, **esteve faltando só o batismo.** Eu tinha aberto a pergunta como "não
   existe", quando o certo era "não foi escolhido qual das cinco".

**Decisão.** As duas páginas ficam, com papéis declarados. *Sistema visual* é o **argumento** e
a prova: por que o fundo é creme, por que cada case tem cor, e o contraste de cada par.
*Design System* é a **referência**: variáveis como espécime vivo, escala, grade e as peças
como componentes. Quando divergirem, a referência está errada até prova em contrário, mas o
argumento é o que explica, e apagá-lo perderia a razão das escolhas.

**Consequência.** P49 reescrita com a intenção que já existia; ela deixou de ser "inventar uma
cor" e virou "escolher entre roxo, verde e rosa". O documento do sistema passou a apontar para
a prova de contraste em vez de afirmar a regra no vazio.

## 077 · O sistema volta a ser uma página só

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#reversao`

**Reverte a decisão 076**, que tinha dado papéis separados a duas páginas.

**Gatilho.** Larissa, depois de ver as duas: *"o Sistema visual eu criei para pensar na
aparência do site e criar regras para essa aparência. O design system é a biblioteca que tem
tudo o que vai ser usado. Você acha que deveríamos juntar os dois?"* E escolheu juntar.

**O que a conferência mostrou primeiro.** Os valores **não divergiam**: as amostras da página
dela já estavam vinculadas às mesmas variáveis, hexadecimal por hexadecimal. O que diferia é
que **a página dela diz mais**: cada cor com o papel escrito e o contraste medido. A minha
mostrava o mesmo quadrado sem nada disso. Não era divergência: era a minha ser uma versão
pior da dela.

**Decisão.** Uma página só. *Espaço e forma*, *Grade* e *Componentes* viraram os quadros 05,
06 e 07 da *Sistema visual*; as demonstrações renumeraram para 08 e 09; minhas seções de cor e
tipografia foram apagadas, por serem duplicata mais pobre das dela. A página *Design System*
deixou de existir.

**Por que juntar venceu.** A divisão que eu tinha proposto: argumento × referência: obriga
as duas a falarem de cor e de tipografia. A divisão dela: regras × biblioteca, não obriga,
mas ainda assim as duas iam repetir os tokens. **Um lugar só é impossível de divergir**, e a
divergência já tinha começado no primeiro dia.

**Custo aceito, dito por ela:** a página fica longa e mistura dois ritmos, as regras quase
não mudam, a biblioteca muda toda semana.

**O que quase se perdeu.** Cinquenta e uma molduras internas tinham fundo branco herdado de
quando as seções viviam numa página branca; sobre o creme da página dela, apareceram como
retângulos brancos no meio do conteúdo. E os cabeçalhos ficaram espremidos numa coluna de
100px. Nenhum dos dois é visível sem olhar: **mudar de contexto revela o que estava apoiado
no contexto antigo.**

## 078 · A amostra de foco não explicava foco, e a demonstração morava no lugar errado

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa, apontando para a amostra: *"o que é esse foco?"*

**A pergunta era o defeito.** A amostra mostrava um quadrado escrito "Alvo com foco" com um
anel em volta, ao lado de dois nomes de variável e de uma frase: *"o afastamento é o que faz
uma cor bastar por tema"*, que é uma conclusão sem a premissa. Nada ali dizia **o que foco
é**, nem **quem precisa dele**. Um espécime que só é legível para quem já sabe não é
espécime; é lembrete.

**Refeito.** Os dois estados lado a lado: em repouso e com foco, porque a diferença é o
conteúdo da amostra e não dava para vê-la com um estado só. E uma frase em português antes das
medidas: quem navega pelo teclado precisa ver em que elemento está a cada Tab; quem usa rato
nunca vê o anel.

**E a demonstração completa estava na página errada.** O quadro com o anel em cada tipo de
alvo (item da barra, link, botão, opção, card inteiro, região que rola, atalho de salto)
vivia na página *Wireframe*, entre as telas do site. É documento de sistema, não tela. Entrou
no quadro 05, que passou a se chamar **05 · Espaço, forma e foco**.

**O que isso continua mostrando.** É a terceira vez hoje que algo estava certo e no lugar
errado. A decisão 077 juntou duas páginas porque informação repetida diverge; esta move uma
peça porque **documento guardado junto do trabalho some dentro do trabalho**: ninguém procura
a definição do anel de foco no meio das cinco telas.

## 079 · A trilha troca numa linha a um terço do topo, não pela maior parte da tela

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#reversao`

**Reverte a regra** *"a trilha marca a etapa cuja seção ocupa a maior parte da tela"*, escrita
no contrato desde o primeiro desenho.

**Gatilho.** Larissa pediu o componente da trilha e **a regra que define onde ele muda**.
Antes de construir, simulei a regra existente contra os capítulos reais dos dois cases, com
janela de 900px.

**O que a simulação mostrou.** A regra **castiga capítulo curto**. A Introdução do case de
Reembolso tem 240px de altura; o Diagnóstico, logo abaixo, tem 898. A Introdução nunca chega a
ocupar mais da janela que o vizinho, e fica ativa por **400px de rolagem: menos de meia
tela**. A pessoa passa por ela sem registrar que existe.

**Decisão.** A etapa ativa é **a última cujo início já passou de uma linha a um terço do topo
da tela**. Com ela, a Introdução do Reembolso fica ativa por 760px, e nenhuma etapa dos dois
cases fica abaixo de meia tela. Nenhuma das duas regras pisca ou volta atrás: a diferença é
só a distribuição.

**Sobre "a regra para cada case", que foi o pedido.** Não existe uma por case, e é isso que
está certo: **os pontos de troca são os começos dos capítulos**, e os capítulos vêm dos
marcadores `<!-- trilha: -->` do arquivo de conteúdo. Muda-se o arquivo, mudam-se os pontos,
sem tocar em regra nenhuma. Uma regra, e cada case fornece os dados.

**O componente.** O traço passou a viver **dentro de cada item**, em vez de ser uma linha à
parte. Empilhar itens produz linha contínua para qualquer número de capítulos: o case de
seis etapas e o de cinco usam a mesma peça. Seis variantes: estado ativo/inativo × posição
primeira/meio/última. As posições existem porque o traço começa no ponto na primeira e termina
no ponto na última; sem elas sobra um toco de 12px acima da primeira etapa, que lê como erro.

**Um cenário novo no contrato, verificável:** nenhuma etapa fica ativa por menos de meia tela.
É a forma escrita do defeito que a simulação encontrou, se alguém mudar a regra de novo, o
cenário cobra.

## 080 · A barra da faixa mede leitura, não etapas

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#restricao`

**Gatilho.** Larissa pediu regra e componente completo para a faixa de progresso. A faixa
tinha uma decisão escondida que ninguém tinha tomado: **o que a barrinha mede.**

**O que a medição mostrou.** Proporção de etapas e proporção de leitura divergem. No case de
Finanças a diferença chega a 8 pontos; no de Reembolso, a **16**: ao fim do Diagnóstico, dois
quintos das etapas passaram mas só um quarto da leitura. Numa página de 9.214px, dezesseis
pontos são cerca de **1.500px que a barra estaria prometendo já terem passado**.

**Decisão.** A barra mede **quanto da leitura já passou**. O texto continua dizendo a etapa e
a posição dela entre as etapas. **As duas medidas são diferentes de propósito:** o texto
responde *onde estou*, a barra responde *quanto falta*, que são exatamente as duas coisas
que a decisão 043 disse que a faixa precisa dar.

**A regra que faltava, escrita para o futuro.** *Não iguale as duas.* Fazer a barra acompanhar
o "2 de 5" deixaria os dois indicadores coerentes entre si, e mentirosos sobre o resto da
leitura. É o tipo de conserto que parece arrumação.

**O estado aberto, que nunca tinha sido desenhado.** Tocar a faixa abre a lista completa, e
ela é a sobreposição do site: mesma casca, mesmas linhas, mesma forma de fechar, com a etapa
atual marcada por sinal, como a opção em vigor no controle de tema.

**Um limite do Figma que virou regra.** Instância não aceita filho novo. Uma sobreposição com
número variável de linhas (cinco etapas num case, seis no outro) não pode ser instância da
caixa: monta-se copiando a casca e instanciando as linhas. **Só a linha é reutilizável de
verdade**, e é por isso que a checagem 6 precisa continuar existindo: ela é o que mantém as
cópias da casca honestas umas com as outras.

## 081 · O card de case vira quatro variantes, e três defeitos caem junto

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa pediu regra e componente completo para o card. A inspeção achou mais do
que faltava: achou coisa errada.

**Três defeitos.**

1. **Nenhuma cor estava vinculada a variável.** Branco, cinza e quase-preto escritos à mão. O
   card **não respondia ao tema escuro**: ficaria branco numa página escura, com o contraste
   invertido.
2. **A cor do case não existia na peça.** O contrato diz *"carrega a cor do case de destino"*
   desde sempre, os nomes das instâncias diziam "(azul)" e "(laranja)", e não havia acento
   nenhum no desenho. O nome fazia o trabalho que a cor deveria fazer.
3. **No case de Reembolso em tela estreita, o card do próximo case apontava para o próprio
   Reembolso.** O desktop apontava certo. Quem lesse o case no celular chegaria ao fim e seria
   convidado a ler de novo o que acabou de ler.

**Decisão.** Quatro variantes: cor × largura, tudo vinculado a variável, e a superfície do
card carrega a cor do case no tom pálido, que é o papel de `surface` no sistema. As oito
instâncias foram trocadas pelas variantes certas, com o texto vindo dos arquivos de conteúdo.

**O que a variante de largura resolve sozinha.** As larguras eram ajustadas instância a
instância, e o inventário já registrava o risco: *"a altura é fixa e precisa ser ajustada em
cada instância"*. Com largura como variante, ninguém estica o card, e a capa não sai do 3:2
porque não há o que esticar. **O problema não foi consertado: deixou de ser possível.**

**E uma assimetria antiga sumiu por um motivo simples.** O inventário registrava que texto
padrão do componente propaga e texto sobrescrito não, então corrigir o arquivo de conteúdo
sincronizava um case e deixava o outro para trás. A causa era o padrão do componente ser o
conteúdo de um dos cases. **Com o padrão genérico: "Título do case": toda instância
sobrescreve, e nenhuma finge estar sincronizada.**

## 082 · A barra tem 64 nas duas larguras, e o sublinhado entra na peça

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** moldura · `#correcao`

**Gatilho.** Larissa pediu regra e componente completo para a barra fixa.

**O número que ninguém tinha explicado.** A barra era **72 no desktop e 64 na estreita**. O
conteúdo é do mesmo tamanho nos dois: texto de 18/30, então a diferença virava respiro de
**21px contra 17**, e os dois estão fora da escala de espaço. Não havia razão escrita para
nenhum dos três números.

**Decisão.** **64 nas duas larguras**, que é valor de escala e já era o do estreito. O respiro
passa a ser consequência da altura, não escolha: a mesma forma de raciocinar que a tela
estreita usa para a medida de linha. As dezesseis telas foram trocadas e o conteúdo do desktop
subiu 8px em cada uma.

**O sublinhado sai da tela e entra na peça.** Ele era um retângulo solto, posicionado à mão em
cada tela: dezesseis oportunidades de errar a posição. Agora é variante: `atual` com três
valores. E a variante carrega a regra que antes dependia de alguém lembrar: **em tela estreita,
`atual=quem-sou-eu` sublinha "Menu"**, porque é lá que essa página mora.

**Um resto encontrado na conferência.** Depois da troca, a caixa de contato no desktop ficou a
**13** do botão em vez de 12: sobra de o botão ter mudado de altura quando o traço foi
corrigido na decisão 074, somada ao deslocamento de 8. Um pixel, invisível olhando, achado
comparando. Corrigido, e a medição foi reexportada para a checagem 6.

**O que este componente encerra.** Era a última peça montada à mão em toda tela. Com ela,
barra, card, trilha, faixa e sobreposição: tudo que se repete entre telas: é instância.

## 083 · O marca-texto tinha três cores e duas proporções

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa pediu regra e componente completo para o marca-texto.

**Três cores para o mesmo elemento.** Home e case de Finanças em `#E6E6E6`, cinza. Case de
Reembolso em `#FFE28A`, amarelo, esse fui eu, ao construir a tela. Componente em
`accent/verde/surface`. **Nenhuma das onze ocorrências no wireframe estava vinculada a
variável**, e duas das três cores não existem na paleta.

**Duas proporções.** O realce ocupava 76% da entrelinha nos cases e 71% a 79% na home, cada
um ajustado à mão. Agora é **75% da entrelinha, centrada**, que bate com o que os cases já
faziam e escala para qualquer nível de tipo.

**E um defeito que só a padronização revelou.** Na home em tela estreita, a frase destacada é
*"forma melhor de fazer,"*. No desktop ela cabe numa linha e era destacada inteira; no
estreito quebra em duas (*"forma melhor"* e *"de fazer,"*) e **só a primeira tinha realce**.
Metade da frase destacada, metade não, desde que a tela foi desenhada.

É exatamente o que a regra *um realce por linha quebrada* existe para evitar: quando a frase
quebra diferente entre as larguras, o número de retângulos muda, e é aí que se esquece um.

**Sobre a cor, que fica para ela.** O marca-texto aparece na home e no hero do case: é o uso
da cor que a página *Sistema visual* chama de *"livre para a hero"*. Com azul e laranja nos
dois cases, sobram **roxo, verde e rosa** para três papéis: estado, hero, e o terceiro case.
Hoje está em verde, provisório. A P49 foi reescrita para tratar das três de uma vez.

## 084 · Roxo é estado, verde é hero, rosa é o terceiro case

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#restricao`

**Resolve a P49**, aberta quando o anel de foco foi definido e não havia cor de sistema.

**Gatilho.** O marca-texto apareceu com três cores diferentes e nenhuma na paleta, o que
obrigou a perguntar qual das cinco ele deveria usar. A página *Sistema visual* já dizia que
duas das cinco ficam para o sistema (uma para estado, uma para a hero) mas nenhuma tinha
sido escolhida.

**Decisão de Larissa.** Roxo para estado, verde para hero, rosa para o terceiro case.

**Como foi implementado.** Não pintando roxo nas coisas, mas criando **referências**:
`accent/estado/surface`, `accent/estado/strong`, `accent/hero/surface` e `accent/hero/strong`,
cada uma apontando para a cor escolhida. **Trocar um papel passa a ser trocar num lugar só**,
e quem lê a peça vê "estado", não "roxo", que é o que importa saber.

**O que recebeu cada uma.** Treze marca-texto foram para `hero/surface`. Os quatro sublinhados
de página atual, que o contrato sempre chamou de *"acento de sistema"*, foram para
`estado/strong`. E o anel de foco também: a página *Sistema visual* lista *foco* entre os usos
da cor de estado, então a decisão 062, que usou `text/primary` por não haver cor, se resolve
sozinha agora que há.

**Duas coisas que a distribuição expôs, abertas como pergunta em vez de resolvidas por mim.**
A **trilha ativa** (P50): o contrato dela diz que carrega a cor do case, e a *Sistema visual*
diz que item ativo usa a cor de estado, as duas frases apontam para cores diferentes, e hoje
o marcador está em `text/primary`, que não é nenhuma. E os **links** (P51): a *Sistema visual*
lista *link* entre os usos da cor de estado, mas a decisão 055 já dá essa informação pela
forma, sublinhado promete sair do site. Pintar de roxo pode ser reforço ou ruído, e é dela.

## 085 · A trilha veste a cor do case, e a resposta já estava escrita

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#restricao`

**Resolve a P50**, que eu tinha aberto como conflito entre duas frases.

**Não havia conflito.** O quadro 02 da página *Sistema visual* diz, sobre o tom forte de cada
case: *"o tom forte é detalhe gráfico, **marcador da trilha**, ícone, linha."* A trilha está
nomeada ali, explicitamente. O *"item ativo"* que a mesma página lista sob a cor de estado é
outro: item da barra, opção de tema.

**Eu abri a pergunta por não ter lido a frase inteira**: é a segunda vez hoje. A P49 também
tinha resposta escrita na mesma página, e também virou pergunta por leitura apressada. O
documento dela responde mais do que eu estava perguntando.

**Decisão.** O marcador ativo usa `accent/<case>/strong`. Nove variantes: três marcadores
(inativo, ativo azul, ativo laranja) por três posições. Acrescentar um case acrescenta um
marcador, não uma trilha inteira.

**O que fica neutro, e por quê.** O traço e os marcadores inativos continuam em `border` e
`text/tertiary`. A mesma frase lista *"linha"* entre os usos do tom forte, mas pintar uma
linha vertical de 3.700px em cor forte transformaria a trilha em ornamento, e o contrato dela
abre dizendo que **existe por função, não por decoração**. Cor forte marca *onde estou*, não
*onde a trilha passa*.

**A faixa acompanha.** Em tela estreita a barra de progresso usa a mesma cor: é a trilha em
outra forma.

**Dois erros de conteúdo achados na troca.** A faixa do case de Finanças dizia "2 de 5" e ele
tem seis etapas. A do Reembolso dizia "Descoberta", que é capítulo do Finanças: herança de a
tela ter sido construída a partir da outra. Nenhum dos dois apareceria sem trocar a peça.

## 086 · O item da barra vira componente; Contato, Tema e Menu não

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** moldura · `#restricao`

**Gatilho.** Larissa: *"da barra fixa, contato, tema e menu, não precisam de componentes?"*

**Contato, Tema e Menu: não, e o motivo é uma decisão antiga.** Os três só existem dentro da
barra, e a barra **não distingue navegação de gatilho por aparência, só por comportamento**,
foi o que a decisão 030 estabeleceu ao tirar o destaque do contato. Um componente por gatilho
acrescentaria camada sem tirar cópia, e abriria a porta para uma diferença visual que o
projeto decidiu não ter.

**O item da barra: sim, e o motivo é um número.** As seis variantes guardavam **27 nós de
texto** com o mesmo estilo, seis "Larissa", seis "Trabalhos", seis "Contato", três de cada um
dos outros. Mudar o corpo dos itens era editar 27 lugares. Este projeto já viu isso falhar
três vezes: a sobreposição divergiu em quatro cópias, o marca-texto em onze, o botão em cinco.

**E o item levou o sublinhado junto.** Ele era um retângulo posicionado à mão em cada variante,
com a largura copiada do rótulo. Agora vive dentro do item e **acompanha a largura sozinho**:
some a chance de o sublinhado ficar mais curto ou mais longo que a palavra.

**O que a pergunta encontrou, e fica para ela (P52).** Nenhum dos três gatilhos **mostra que
está aberto**. Com a caixa de tema aberta, "Tema" é idêntico a "Contato". No desktop a
proximidade da caixa diz de onde ela veio; na tela estreita, onde a caixa ocupa a largura
inteira, não diz nada.

**Uma nota sobre trocar conjunto de variantes.** Apaguei o conjunto da barra e criei outro do
zero, com as dezesseis telas apontando para o antigo. **Elas reapontaram sozinhas**, porque o
Figma religa instâncias pelo nome da variante. Vale saber: funciona enquanto os nomes forem
os mesmos, mudar um nome de variante, não.

## 087 · O gatilho não pinta que abriu: declara

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** moldura · `#restricao`

**Resolve a P52.**

**Decisão.** Contato, Tema e Menu **não mudam de aparência** enquanto a caixa está aberta.
Mas **declaram o estado na marcação**, e o leitor de tela anuncia.

**Por quê, visualmente não.** A caixa aberta já é o sinal, e ela se identifica sozinha: o
conteúdo do menu diz "Quem sou eu / Tema claro / Tema escuro", o do contato mostra um e-mail.
No desktop ela ainda ancora logo abaixo da palavra. Pintar o gatilho acrescentaria uma segunda
marca para a mesma informação, e a barra ser uniforme foi decisão tomada e paga na 030, que
já aceitou como custo que *"nada na barra indica que o contato se comporta diferente"*.

**Na tela estreita nem apareceria.** Lá a caixa ocupa a largura inteira e o véu cobre o que
está atrás: um destaque no gatilho estaria sob o véu, ou obrigaria o gatilho a furar o véu
para ser visto, o que é muita construção para pouca informação.

**Por que na marcação sim.** Quem usa leitor de tela não tem a caixa como pista visual, e o
foco volta para o gatilho quando a caixa fecha, sem o estado declarado, a pessoa não sabe se
acionar de novo abre ou fecha. É o mesmo tipo de regra que o sublinhado da página atual já
segue: *"é anunciado como página atual por leitor de tela"*.

**E a pergunta descobriu outra coisa.** O véu cobria a barra inteira. Isso diz *"isto não está
disponível"* sobre a única coisa que continua disponível: a barra segue tocável com a caixa
aberta, e tocar nela é como se troca de destino sem fechar antes. **O véu passou a começar
abaixo da barra.**

**Dois erros de conteúdo achados junto.** As duas telas de sobreposição em largura estreita
foram montadas sobre o case de Reembolso e herdaram a faixa do case de Finanças:
*"Descoberta · 2 de 6"* onde deveria estar *"Diagnóstico · 2 de 5"*, e na cor errada. É a
segunda vez que uma tela construída a partir de outra carrega o conteúdo da origem.

## 088 · Link não usa a cor de estado, porque ela é o que o distingue

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#restricao`

**Resolve a P51**, aberta porque a página *Sistema visual* lista *link* entre os usos da cor
de estado.

**A conferência decidiu.** Os dois sublinhados do site têm **a mesma forma**, traço de 2px
sob a palavra, e são separados **só pela cor**:

| | forma | cor |
|---|---|---|
| página atual, na barra | 2px sob a palavra | roxo, `accent/estado/strong` |
| link que sai do site | 2px sob a palavra | cor do texto |

**Pintar links de roxo colapsaria a única distinção entre *onde estou* e *isto sai daqui*.** A
cor de estado fica para a posição do leitor; a forma já diz o destino, que é o que a decisão
055 estabeleceu.

**Sobre a frase da página dela.** *"Estado (link, foco, item ativo)"* foi escrita antes de o
vocabulário de formas existir: a decisão 055 é posterior e mais específica. Quando duas
regras do projeto discordam, vale a que foi escrita sabendo da outra.

**Um defeito achado no caminho.** Os oito links e os quatro riscos de sublinhado usavam
`#2E2E2E`, **que não existe na paleta**: `text/primary` é `#221F20`. Nenhum estava vinculado
a variável, então nenhum respondia ao tema. Catorze correções. É a terceira peça hoje a
aparecer com cor fora da paleta escrita à mão: antes foram o card e o marca-texto.

## 089 · Checagem 7, e os wireframes migram para a paleta

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** instrumentacao · `#instrumentacao`

**Gatilho.** Três peças apareceram no mesmo dia com cor escrita à mão e fora da paleta: o
card, o marca-texto e os links. Larissa pediu uma checagem para isso.

**A varredura achou muito mais do que a pergunta.** **Setecentas e setenta e quatro cores
soltas.** E o padrão não era descuido pontual: `#2E2E2E` em 257 lugares, `#7A7A7A` em 105,
branco em 144. **Os wireframes inteiros estavam numa paleta de cinzas neutros que não é a do
sistema**: desenhados antes de a paleta existir e nunca migrados. O fundo das telas era
branco puro quando a regra diz *"o tema claro usa fundo cinza claro, não branco puro"*.

**Migrar veio antes de checar.** Uma checagem que falha 774 vezes é uma checagem que se
aprende a ignorar. Setecentas e cinquenta cores foram mapeadas para as variáveis por faixa de
luminosidade e papel; nenhuma ficou sem destino.

**O efeito é maior que o esperado.** As telas deixaram de ser cinzas e passaram a mostrar o
site que o sistema descreve: fundo creme, texto quente, e os cards vestindo a cor de cada
case. O wireframe passou a ser uma previsão do site, não um esboço dele.

**Um token novo.** O véu era a única cor do site sem variável. Virou `overlay/veu`, e o valor
do tema escuro é diferente do claro por uma razão: **a página escura já é escura, e 8% de
preto sobre ela quase não separa**. Está em 45%, e fica anotado que esse valor nunca foi visto
numa tela pintada.

**A checagem.** Compara `docs/spec/cores-soltas.json`, exportado do Figma, e exige que só
restem elementos **marcados como anotação no próprio nome**. A marca vive no nome do nó, e não
numa lista dentro do script, para a isenção ser visível no Figma por quem estiver desenhando.

**Como foi verificada.** Os três defeitos reais de hoje foram reintroduzidos um a um (o
cinza dos links, o cinza da capa, o amarelo do marca-texto) e a checagem acusou os três. Uma
anotação nova foi acrescentada e ela não acusou. **Testada nos dois sentidos**: pega o que
deve pegar, e não acusa o inocente, que foi a lição da checagem 5.

## 090 · Os wireframes viraram mockup sem que ninguém decidisse isso

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** processo · `#licao`

**O que aconteceu.** A decisão 089 migrou 750 cores dos wireframes para as variáveis do
sistema, como tarefa de higiene para a checagem 7 poder existir. As variáveis são a paleta
real: fundo creme, texto quente, cor por case. **Os wireframes deixaram de ser wireframes.**

**O que se perdeu.** Larissa: *"não era o que eu queria. o processo é importante pra mim, e
documentar o processo é essencial. os wireframes como estavam eram um marco de como as telas
nasceram."* Este projeto documenta o próprio processo porque **o processo é o material do
terceiro case**. O estágio em cinza era registro, e registro apagado não volta.

**Havia sinal, e eu passei por cima.** Antes da migração, os cards eram cinzas e a cor do case
vivia **só no nome da camada**: "card · Finanças PF+PJ (azul)". Isso é convenção de
wireframe: anota-se a intenção, não se pinta. Alguém tinha escolhido aquilo, e eu li como
lacuna.

**Decisão dela.** Não voltar atrás: os wireframes seguem como mockup das telas reais.

**O que muda daqui em diante.** Diretriz 0.3 escrita: **mudar o estágio de um artefato é
decisão, não efeito colateral.** O teste é *depois desta mudança, a peça ainda é a mesma coisa
que era?*, e se não for, para e pergunta. E o complemento, que ela pediu com as mesmas
palavras: **trazer a demanda na hora em que ela precisa ser resolvida**, e deixar esperar o
que não trava o processo.

**O tipo de erro.** Não foi erro de execução: a migração está tecnicamente correta e a
checagem 7 é útil. Foi erro de **alcance**: uma tarefa que eu tratei como técnica tinha uma
consequência que só ela podia autorizar.

## 091 · Dois conjuntos de variantes estavam sendo cortados pela seção

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa: *"tem uns frames escondendo conteúdo."* Tinha.

**O que estava escondido.** O quadro 07 tem 1440px de largura útil. Em fila única, o conjunto
**card de case** media **2054px** e o **trilha / item**, **2057px**. As variantes que passavam
da borda eram cortadas pela moldura da seção: a de cor laranja do card e as três do marcador
laranja da trilha **não existiam para quem olhasse a página**.

**Por que isso é pior que faltar.** Uma variante ausente se nota: a lista tem buraco. Uma
variante cortada **não se nota**, porque a lista parece completa: quem abrir a página vê
quatro cards e conclui que são todos.

**Decisão.** As variantes passam a se organizar em linhas que quebram na largura útil da
seção. O card foi para 2×2, a trilha para 3 na primeira linha e 3 na segunda, e a barra ficou
com cada variante de desktop na sua linha, porque cada uma já tem 1440.

**Varredura completa, com cinco tipos de defeito.** Conteúdo cortado pelo pai, texto preso em
altura menor que a entrelinha, nó invisível, opacidade zerada e tamanho achatado. Nas duas
páginas. Fora os dois conjuntos, só apareceram quatro casos na página das telas, **todos
intencionais**: as duas tabelas que rolam na horizontal (decisão 058) e os dois recortes que
mostram só o topo de uma página.

## 092 · As demonstrações mostravam um site que já não existe

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa: *"continua olhando o design system, o que mais tem quebrado?"*

**O que estava quebrado.** Os quadros 08 e 09, as duas demonstrações, mostravam um desenho
**anterior a praticamente todas as decisões deste projeto**:

| | demonstração | sistema |
|---|---|---|
| barra | 72px, itens 15px | 64px, itens 18px |
| nome na barra | "Larissa Quadros" | "Larissa" |
| Contato | **pílula roxa** | palavra simples |
| hero | 88/92 | 96/96 |
| marca-texto | lilás | verde, `accent/hero` |
| ações na home | duas | uma |
| capítulos | numerados | sem número |
| instâncias de componente | zero | nada |

**A pílula roxa do Contato é literalmente o desenho anterior à decisão 030**, a que tirou o
destaque do contato porque ele competia com os cases.

**Por que parei antes de mexer.** As demonstrações não estavam erradas: eram **registro de
como o site foi proposto**, o mesmo tipo de marco que os wireframes em cinza eram. Tendo
destruído um registro hoje por conta própria (decisão 090), apresentei as opções e esperei.
**Foi a Diretriz 0.3 funcionando na primeira vez em que podia.**

**Decisão dela: atualizar.** O registro da proposta original sai do arquivo de trabalho; ele
continua existindo no histórico de versões do Figma, que é onde esse tipo de coisa sobrevive
sem poluir o presente.

**Como foram refeitas.** Não redesenhadas: **recortadas das telas reais**. O quadro 08 é o
topo da home, o 09 é a trilha e o capítulo 3 do case de Reembolso. Trazem seis instâncias de
componente entre as duas. Uma demonstração desenhada à parte diverge no dia seguinte; uma
demonstração que é a tela, não.

**E ganharam a altura do próprio conteúdo.** Antes cortavam no meio de um parágrafo, o que lê
como defeito e não como recorte.

## 093 · O botão é neutro e preenchido, e o documento de definições se reconcilia

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#reversao`

**Gatilho.** Larissa pediu os componentes de botão. Antes de construir, a inspeção encontrou
que **o documento de definições dela e as decisões do projeto dizem coisas diferentes**, e
ninguém tinha reconciliado.

**As duas filosofias.** As definições diziam: *"link, foco, botão de contato, aqui a cor não
é decoração: é a única forma de dizer 'isto responde ao toque'"*. As decisões 047, 055 e 088
dizem o contrário: **a forma promete o destino**, e a cor fica para a posição do leitor.

**Decisão dela: neutro.** Botão em `text/primary`, link em `text/primary`, e o roxo reservado
a foco e página atual. **O roxo passa a significar uma coisa só: "onde você está"**, e isso
é o que torna a regra aprendível.

**Três correções no documento de definições**, que estava desatualizado desde a decisão 084:
a linha de "estado e interação" virou "posição do leitor"; a tabela de acentos passou a ter
três papéis em vez de um "Sistema" que acumulava tudo; e o botão saiu da lista de usos do tom
forte.

**Dois defeitos que a construção expôs.**

**"Falar comigo" era contorno no desktop e preenchido no estreito**: mesmo botão, dois
estilos por largura. E a escolha dela resolveu isso sozinha: **se a cor não distingue, o
preenchimento é a única diferença possível entre dois botões, e o site não tem dois.** Botão
é a ação principal da página, e nenhuma página tem duas. Um estilo só, preenchido; o contorno
saiu porque marcava uma hierarquia que não existe.

**Nenhum dos sete botões era instância.** Eram quadros soltos, cada um com o seu respiro. Os
sete viraram instâncias de duas variantes.

## 094 · O bloco de destaque existe, e tinha caído da lista por colisão de nome

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa pediu o componente de bloco de destaque.

**Ele estava previsto e eu o perdi.** Aparece três vezes nas definições dela: na lista dos
sete componentes da Fase 2, na lista dos cinco lugares onde cor entra, e na regra *"bloco
colorido é pontuação, não estilo de parágrafo"*. **E não aparece uma vez sequer no contrato do
case.** Quando a decisão 057 fechou a lista de componentes em oito, ele não estava lá.

**Por que passou.** Colisão de nome. O case tem uma **"tira de destaques"** (as chaves
Papel, Método, Entregas no topo da página) e um **"bloco de destaque"**, que é o fundo pálido
atrás de uma frase. Ao auditar as telas eu encontrei a tira e li como se cobrisse o bloco.
**Nomes parecidos para coisas diferentes fazem uma passar pela outra**, e nenhuma checagem
pega isso: as duas existem, com nomes válidos.

**Decisão.** Componente criado, quatro variantes: duas cores por duas larguras. Usa o tom
pálido do case, que é o papel de superfície. Inventário vai a doze.

**O que fica pendente, e é dela.** **Nenhuma tela usa o bloco.** Hoje as frases que sustentam
capítulos são marcadas por **peso**, em Medium. A contagem:

| | frases fortes por capítulo |
|---|---|
| Finanças | 0, 1, 1, 1, 1, 1 |
| Reembolso | 0, **3**, **3**, **2**, 1 |

No case de Finanças a troca seria direta: uma por capítulo, como a regra pede. **No de
Reembolso, três capítulos têm mais frases fortes do que a regra permite blocos**, e escolher
qual delas carrega o bloco é decisão de conteúdo: é escolher qual frase sustenta o capítulo.

## 095 · As quatro frases do case de Reembolso que ganham bloco

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#conteudo`

**Gatilho.** O componente existia e nenhuma tela usava. Larissa: *"vamos capítulo por capítulo
no reembolso."*

**As escolhas dela.**

| Capítulo | Frase |
|---|---|
| 2 · Diagnóstico | *"Transformei 'acho que tá ruim' em diagnóstico."* |
| 3 · Novo fluxo | *"Cinco princípios, e um filtro para cada decisão."* |
| 4 · Wireframes e interface | *"Um fluxo no papel é uma hipótese. Desenhar cada tela é como se testa."* |
| 5 · Resultados | a única frase forte do capítulo |

O capítulo 1 fica sem bloco: não tem frase forte, e a regra permite zero.

**O critério que as escolhas revelam**, e que virou regra no contrato: **a frase escolhida é a
que diz o que o capítulo prova, e nunca a que repete o título.** Nos capítulos 3 e 4 ela pegou
a frase de abertura. No 2, não: a de abertura é *"Antes de qualquer análise houve
observação"* e o título é *"Olhar antes de opinar"*: o bloco diria duas vezes a mesma coisa.

**Eu tinha argumentado por outras duas.** No capítulo 4 defendi *"O app não segue o sistema da
própria empresa"*, por ser a descoberta do case inteiro. Ela escolheu a de método. As duas
leituras são defensáveis; a diferença é que **o bloco marca o que sustenta o capítulo, não o
que é mais surpreendente nele**, e o achado sobre o sistema já tem subtítulo próprio.

**Consequência.** Oito instâncias, quatro por largura. As duas telas do case foram
reempilhadas: o desktop cresceu 279px e a estreita 312. As outras frases em peso forte
continuam em peso forte: o bloco é o degrau acima delas, não o substituto.

## 096 · O bloco de destaque é parágrafo, não frase, e serve ao ritmo, não à importância

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#correcao`

**Reverte a aplicação da decisão 095.**

**Gatilho.** Larissa, depois de ver o resultado: *"não sei por que escrevi na regra 'frase'. o
que eu queria destacar são parágrafos, pra dar um respiro na leitura."*

**O que eu tinha feito.** Pus fundo pálido atrás de **frases curtas em peso forte**: uma
linha cada. Elas já estavam marcadas pelo peso, então o bloco virou etiqueta em cima de
etiqueta, e não deu respiro nenhum. O texto em volta continuou a mesma parede.

**Por que li errado, e o que faltava para não ler.** As definições diziam *"o fundo pálido
atrás da frase que sustenta um capítulo"*, e as telas tinham frases curtas em Medium que
encaixavam perfeitamente em "frase que sustenta". **A regra dizia o quê e não dizia o
para quê.** *"Dar respiro numa leitura longa"* nunca esteve escrito, e é a única coisa que
teria desfeito a ambiguidade.

**Decisão.** O bloco é **um parágrafo inteiro**, com **o mesmo corpo e o mesmo peso da prosa
em volta**, se mudasse de tamanho, diria "isto é mais importante", que é outra coisa. Não
vai em frase curta nem em lista.

**Consequência.** Os oito blocos saíram e as frases voltaram a peso forte. O componente foi
refeito: texto em `corpo`, Regular, em `text/primary` sobre o tom pálido. Regra corrigida nas
definições e reescrita no contrato do case, agora **começando pelo para quê**.

**O que isso ensina sobre as regras deste projeto.** Uma regra que diz o *quê* sem o *para
quê* é ambígua mesmo quando parece precisa, e a ambiguidade só aparece quando alguém a
executa. **Escrever a razão junto não é enfeite: é o que torna a regra verificável por quem
não estava lá.**

## 097 · Os três parágrafos do case de Reembolso que ganham bloco

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#conteudo`

**Decisão.** Três blocos em cinco capítulos, nos parágrafos mais longos de cada um:
*"Percebi que muitas das etapas mais pesadas…"* (8 linhas), *"Separei o que acontece uma vez
na vida…"* (5) e *"Então reconstruí, o mais fielmente possível…"* (7).

**Dois capítulos ficam sem**, e por razões diferentes: a **Introdução** tem um parágrafo só, e
colorir seria colorir o capítulo inteiro, deixaria de ser pontuação. **Resultados** só tem
listas, e a regra proíbe.

**A proporção se mantém entre as larguras**: 33%, 14% e 25% do capítulo no desktop; 32%, 16%
e 25% no estreito. O parágrafo cresce no estreito, mas o capítulo também.

**Um efeito colateral que fica aberto.** O bloco tem respiro lateral, então **o texto dentro
dele é mais estreito que a prosa em volta**: no estreito são 279px contra 327, o que dá cerca
de 33 caracteres contra 38. A medida da tela estreita já é consequência da margem e anda perto
do piso; dentro do bloco ela cai abaixo. **Um respiro que aperta a linha é contraditório.**

A saída seria o bloco **sangrar até as bordas da tela** no estreito: 375 de largura com
respiro de 24, o que faria o texto dentro dele ter exatamente a largura da prosa. Fica
anotado como P53: muda a estrutura da coluna e é decisão dela.

## 098 · O bloco sangra até as bordas na tela estreita

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#restricao`

**Resolve a P53.**

**O problema.** O bloco tem respiro lateral, então o texto dentro dele era mais estreito que a
prosa em volta: **279px contra 327 na tela estreita, cerca de 33 caracteres contra 38.** A
medida da tela estreita já é consequência da margem e anda perto do piso de 35, dentro do
bloco ela caía abaixo. **Um respiro que aperta a linha é contraditório:** ele existe para o
olho descansar, não para a linha quebrar mais vezes.

**Decisão.** Em tela estreita o bloco **ocupa a largura da tela**. A cor vai de ponta a ponta e
o respiro do bloco ocupa o lugar da margem da página, então o texto dentro fica em **327:
exatamente a medida da prosa**.

**No desktop nada muda**, e isso foi verificado, não assumido: lá o bloco fica na coluna de
leitura de 628 e o respiro de 32 deixa a linha em **66 caracteres**, dentro da faixa de 65 a
75. Consertar o que não está quebrado seria churn.

**Como foi feito, sem truque.** O capítulo estreito passou de 327 para 375 de largura, sem
respiro próprio, e o respiro migrou para dentro de duas **colunas de leitura**: uma antes e
uma depois do bloco. O bloco fica entre elas, preenchendo a largura. Só auto-layout; nenhuma
posição absoluta, nenhuma margem negativa.

**O que isso custou em estrutura.** Cada capítulo com bloco ganhou dois quadros de coluna. É o
preço de um elemento que sangra dentro de uma coluna: **alguém precisa segurar a margem, e se
não é o capítulo, são os filhos dele.**

## 099 · Cento e trinta e sete quadros brancos por cima do creme

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** componentes · `#correcao`

**Gatilho.** Larissa: *"arruma o bg, tá branco."*

**O que era.** `figma.createAutoLayout` cria o quadro com **fundo branco por padrão**. Todos
os quadros de arrumação deste arquivo (colunas, capítulos, linhas de tabela, cabeçalhos,
células) nasceram brancos, e **a migração de cor da decisão 089 preservou o branco em vez de
removê-lo**: `#FFFFFF` virou `bg/surface`, que é branco de propósito.

**Por que passou pela checagem 7.** Ela pergunta *"esta cor vem de variável?"*, e a resposta
era sim. **A cor estava certa e o elemento não deveria ter cor nenhuma**: é o mesmo tipo de
erro da varredura geométrica que não achou o texto encolhido: a checagem estava certa e a
pergunta estava errada.

**Por que passou pelo olho.** Branco sobre creme é quase invisível no Figma, onde a prancheta
já é clara. Só aparece quando se olha a tela inteira sabendo que o fundo deveria ser creme.

**Decisão.** Cento e trinta e sete quadros perderam o fundo. **Três coisas continuam pintando
superfície neste site:** a página em `bg/page`, a sobreposição em `bg/surface`, e o card, que
usa o tom pálido do case. Os rótulos de botão também seguem em `bg/surface`, porque ali é cor
de texto sobre fundo escuro.

**O que fica de regra.** Quadro de arrumação não tem fundo. Se um quadro precisa de cor, ele
deixou de ser arrumação e virou superfície, e superfície é uma das três.

## 100 · Os dois parágrafos do case de Finanças, e a regra dos três parágrafos

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#conteudo`

**Decisão.** Dois blocos no case de Finanças: *"Conduzi o projeto inteiro com IA…"* no
capítulo de Descoberta (33% do capítulo) e *"E a documentação virou artefato de handoff…"* no
de Desenho e documentação (24%).

**Quatro capítulos ficam sem, pelo mesmo motivo.** Têm dois parágrafos de prosa ou menos. E
daí saiu uma regra que faltava: **o capítulo precisa de pelo menos três parágrafos de prosa
para receber bloco.** Com dois, colorir um não é pontuação, é **alternância**: o olho lê
"colorido, não colorido" como padrão, não como pausa. Com um só, o bloco vira o capítulo: em
Resultados ele ocuparia 55%.

**Os dois cases têm densidades diferentes, e isso é consequência do texto.** O Reembolso tem
capítulos de quatro a sete parágrafos e levou três blocos; o de Finanças tem capítulos de dois
a quatro e levou dois. **Onde não há sequência longa, não há parede para quebrar**, e forçar
o bloco a aparecer em todo capítulo o transformaria de pontuação em estilo, que é exatamente o
que a regra dela proíbe.

**Consequência.** Quatro instâncias, duas por largura. Na tela estreita os dois capítulos
ganharam colunas de leitura para o bloco poder sangrar, como a decisão 098 estabeleceu. As
duas telas do case foram reempilhadas.

## 101 · Todo capítulo estreito tem a mesma largura, com bloco ou sem

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#correcao`

**Gatilho.** Larissa: *"tem uns frames que não estão do tamanho certo."* Tinha.

**O que estava desencontrado.** Na tela estreita, os capítulos ficaram com **duas larguras**:
375 em x=0 nos que ganharam bloco, e 327 em x=24 nos outros. O texto alinhava nos dois: os
dois entregam 327 de medida, mas **"capítulo" deixou de ser uma coisa só**. E um capítulo
que ganhasse bloco depois precisaria ser remontado.

**Decisão.** Todos os onze capítulos estreitos passam a ter 375 em x=0, com o respiro dentro de
uma coluna de leitura. A moldura fica igual; o que muda é o que ela guarda.

**A diferença que fica entre as larguras, com causa escrita.** No desktop o bloco **não
sangra**, e o texto dentro dele tem 564 contra 628 da prosa: 66 caracteres contra 74. Não é
descuido nem inconsistência por preguiça: **a coluna de mídia fica ao lado, a 24 de
distância**, e um bloco sangrando invadiria ela. Sessenta e seis está dentro da faixa de 65 a
75; na tela estreita, onde não há mídia ao lado, a medida caía abaixo do piso e por isso o
bloco sangra lá.

**O que isso vale como método.** Uma diferença entre larguras é defeito quando não tem causa,
e é decisão quando tem. **A única forma de não confundir as duas é escrever a causa junto**:
senão a próxima pessoa a olhar vai "consertar" a diferença e quebrar a razão dela.

## 102 · Checagem 8, contra o defeito mais silencioso do arquivo

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** instrumentacao · `#instrumentacao`

**Gatilho.** Larissa, apontando dois capítulos do case de Finanças: *"o frame não mostra todo
conteúdo, não é a primeira vez que isso acontece."* Não era.

**A causa dos dois.** Os capítulos do case de Finanças no desktop são **quadros sem
auto-layout, com altura fixa e corte ligado**. Quando o bloco de destaque entrou, a coluna de
leitura cresceu para 730 dentro de um quadro de 652, e o quadro cortou 78px em silêncio. Os
capítulos do Reembolso não tiveram o problema porque eu os construí com auto-layout, que
cresce sozinho.

**Quatro ocorrências no mesmo dia, do mesmo defeito.** A frase de abertura presa em 10px de
altura; vinte e nove textos encolhidos na página do sistema; duas variantes de componente
cortadas pela seção; e agora dois capítulos. **O padrão é sempre o mesmo: o conteúdo existe,
cabe na estrutura, e não aparece.**

**Por que nenhuma outra checagem pegava.** A de cor pergunta se a cor vem de variável. A de
sobreposição compara peças entre si. A varredura geométrica que eu mesmo rodei procurava
conteúdo **transbordando**, e este é o contrário: conteúdo **contido e escondido**.

**Decisão.** Checagem 8, contra `docs/spec/cortes.json`. **Os dois cortes legítimos ficam
declarados no nome do quadro**: `· recorte` para janela sobre uma página maior,
`rola na horizontal` para conteúdo que rola, para a exceção ser visível no Figma por quem
estiver desenhando, e não escondida numa lista dentro do script.

**Verificada com os quatro casos reais do dia**, reintroduzidos um a um: capítulo cortado,
variante cortada, recorte de tela e texto encolhido. Acusou os quatro.

**Um erro cometido no conserto, e corrigido.** A primeira passada ajustou a altura de **todo**
quadro que cortava, e esticou os dois recortes de sobreposição, que cortam de propósito. Foi
o que motivou a exceção viver no nome: **sem marca visível, quem conserta não sabe o que é
defeito.**

## 103 · "O Produto" vai para a página como extra, fora da trilha

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#reversao`

**Reverte a decisão 038**, que marcou a seção como privada.

**Gatilho.** Larissa: *"a seção 'O produto' fala justamente do produto porque o resto do texto
inteiro não fala, por isso achei importante incluir essa seção. Essa seção é essencial, do
jeito que foi escrita."*

**Por que a 038 errou.** Ela se apoiou na linha editorial *"o produto aparece como evidência,
nunca como assunto"* e concluiu que uma seção chamada "O Produto" faz dele o assunto. **Mas
evidência de quê?** Os seis capítulos falam de processo: ensinar a ferramenta, o Figma como
entrega, o design system, a auditoria. Nenhum diz o que a aplicação faz. **Sem a seção, o case
descreve como uma coisa foi construída sem nunca dizer o que a coisa é.**

A 038 também apostou o concreto nas legendas das imagens, e registrou isso como custo:
*"transfere peso para uma dependência que ainda não foi produzida"*. Um dia depois, nenhuma
imagem dos dois cases existe.

**Decisão dela: publicar, e fora da trilha.** *"É um conteúdo à parte, é extra. Por isso tem a
liberdade de falar sobre o produto: ele tem um objetivo diferente do resto todo."*

**O que eu tinha feito de errado no meio do caminho.** Publiquei como capítulo 7, com rótulo
de trilha. Estava errado por dois motivos que ela corrigiu de uma vez: entrar na trilha faria
dela parte do arco Ideia→Resultados, quebrando-o, que foi exatamente o que a 038 previu, e
apagaria a razão de ela poder falar do produto, que é **não** pertencer ao arco.

**Consequência.** Vocabulário ganhou `<!-- bloco: extra -->`, porque a convenção só conhecia
capítulo e subseção, e extra não é nenhum dos dois. O contrato do case ganhou a seção. A tela
ganhou divisória e rótulo **EXTRA** antes do título: o case acabou, e o que vem depois precisa
dizer que é outra coisa.

## 104 · O convite ao repositório fecha o case, antes do extra

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#correcao`

**Gatilho.** Larissa, apontando o convite ao repositório: *"vai acima de O produto, fechando
o case."*

**O que eu tinha feito.** Pus o extra logo depois do último capítulo, antes do repositório. A
ordem ficava: capítulos, extra, repositório, próximo case.

**Por que está errado.** **O repositório é o que fecha o case**: é a última coisa do arco e
a prova verificável do processo que os seis capítulos descrevem. Pôr o extra no meio separa a
conclusão da sua prova, e faz o extra parecer parte do arco, que é exatamente o que ele não é.

**Ordem correta:** capítulos, convite ao repositório, extra, próximo case, contato. **Encerra
primeiro e depois oferece o extra**, assim fica claro onde uma coisa termina e a outra
começa, o que é a razão de o extra ter divisória e rótulo.

**Consequência.** As duas telas do case de Finanças reordenadas. O de Reembolso não muda: não
tem extra, e lá o repositório já era a última coisa antes do próximo case.

## 105 · O extra é banda de cor, não seção com divisória

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#correcao`

**Gatilho.** Larissa, sobre a seção extra: *"não segue a mesma formatação do case, o texto
preenche a tela e ganha o destaque de cor."*

**O que eu tinha feito.** Desenhei o extra **com a formatação do case**: mesma coluna de
leitura, fundo creme, separado só por uma divisória fina e um rótulo. Seguia o padrão quando
o ponto dele era justamente não seguir.

**Decisão.** O extra vira uma **banda que sangra a tela inteira**, no tom pálido do case. O
case acabou, e o extra precisa dizer isso **antes da primeira palavra**: uma divisória não
bastava, porque o olho lê divisória como pausa, não como mudança de assunto. A divisória saiu;
a cor faz o trabalho dela melhor.

**Uma decisão que tomei dentro da instrução dela, e que fica declarada.** *"O texto preenche a
tela"* podia significar que a linha também vai de ponta a ponta. **Mantive a medida de
leitura**: 1280px a 18px dariam cerca de **125 caracteres por linha**, contra os 65 a 75 da
regra. A cor sangra, o texto não: a banda é para separar, não para esticar a linha.

**Consequência.** O extra do case de Finanças é hoje o **único lugar do site onde uma cor de
case ocupa a largura inteira da tela**. Combina com a natureza dele: é a única parte que não
pertence ao arco.

## 106 · A linha do extra ocupa a tela: a única exceção à medida

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#reversao`

**Gatilho.** Larissa: *"aumenta a largura da linha, completando a tela."*

**Decisão dela.** O texto da banda do extra vai de margem a margem: **1280px no desktop, 148
caracteres por linha**, contra 73 na coluna de leitura. É **o dobro do teto** da regra de 65
a 75, e **a única exceção a ela em todo o site**.

**O que a exceção compra.** A banda existe para dizer *"isto não é o case"*, e a largura é
parte de como ela diz. Com a linha na medida de leitura, a cor mudava mas o ritmo continuava o
mesmo: o extra ainda lia como um capítulo pintado de azul. Com a linha inteira, o corpo do
texto muda de forma antes de a primeira frase ser lida.

**O que a exceção custa, dito sem rodeio.** Cento e quarenta e oito caracteres é uma linha
longa para leitura contínua. O risco é o olho perder a linha ao voltar para a esquerda: pular
uma ou repetir. **A regra existe por isso, e aqui ela foi trocada por outra coisa
conscientemente.**

**O que fica aberto (P54).** Linha longa cansa menos com mais entrelinha. A banda usa `corpo`,
18/30, e a escala não tem um 18 com entrelinha maior. Anotado para o visual design, quando dá
para ver a tela pintada e julgar.

**Uma coisa que eu tinha errado antes.** Na primeira versão mantive a medida de leitura dentro
da banda, e declarei a escolha. Estava errado no julgamento mas certo no método: **a decisão
não era minha, e deixá-la visível foi o que permitiu que ela fosse corrigida numa frase.**

## 107 · A linha do extra vai do texto do case até a margem

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#correcao`

**Corrige a decisão 106**, que tinha esticado a linha de margem a margem.

**Gatilho.** Larissa: *"ficou ruim largo assim, faz começando do mesmo lugar do texto do case
e indo até o final da tela."*

**Decisão.** O texto começa em **297**: exatamente onde começa o texto dos capítulos, e vai
até a margem direita. São **1063px, 122 caracteres por linha**, contra os 1280 e 148 da versão
anterior.

**A largura não é arbitrária, e isso só ficou claro depois de medir.** Mil e sessenta e três é
**exatamente a largura de um capítulo**: coluna de leitura mais calha mais coluna de mídia. O
extra ocupa o espaço inteiro que um capítulo ocupa, com texto no lugar de texto-e-prova. Ele
continua alinhado com o que veio antes e, ainda assim, muda de forma.

**O que a versão de margem a margem perdia.** Começando em 80, o texto do extra não se
alinhava com nada da página, e a banda deixava de ser "o capítulo que virou outra coisa" para
virar um bloco solto de outra página.

**A exceção à medida continua, menor.** Cento e vinte e dois contra o teto de 75. Segue sendo
a única do site, e a razão é a mesma: ali a largura é o que diz que aquilo não é o case.

## 108 · O extra vira aba retrátil, e chega fechada

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#escopo`

**Gatilho.** Larissa: *"essa seção de O produto fica retrátil. Uma aba que pode ser aberta e
fechada. Vamos pôr um título: Leia mais sobre o produto, clica no botão de setinha ela abre, e
pode ser fechada de novo."*

**Decisão.** O extra vira aba. Chega **fechada**: banda de cor com o título
*"Leia mais sobre o produto"* e uma seta. A linha inteira é o alvo, não só a seta: a seta
indica o estado, como o sinal indica a opção em vigor no controle de tema.

**O que a aba resolve, e que a seção aberta não resolvia.** O extra tem 1.200px de texto sobre
funcionalidades, depois de um case que já terminou. Aberto por padrão, ele **empurra o próximo
case e o contato para baixo de uma parede de prosa** que nem todo leitor quer. Fechado, a
página termina em 6.025px em vez de 7.354, e **o conteúdo passa a ser oferecido, não
imposto**, que é a diferença entre extra e apêndice.

**E isso reconcilia uma tensão que estava aberta sem ninguém ter notado.** As definições dizem
*"nenhuma interação obrigatória para acessar conteúdo"*. Uma aba fechada parece contrariar
isso, mas a regra fala de conteúdo do site, e o extra é declaradamente o que **não** é do
arco. A interação aqui não bloqueia: ela oferece.

**O que ganhamos de graça.** Na web isso é `details`/`summary` nativo: **abre e fecha sem
JavaScript**, e já é anunciado por leitor de tela. É o único componente do site cujo
comportamento inteiro é HTML puro: nada a construir, nada a degradar.

**Consequência.** Componente novo, quatro variantes; inventário vai a treze. As duas telas do
case mostram a aba fechada, que é o estado padrão, e dois quadros novos mostram o estado
aberto: mesmo padrão das sobreposições, que também vivem em quadro próprio.

## 109 · O convite ao contato é uma frase só

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#conteudo`

**Gatilho.** Larissa, sobre o rascunho no fim do case: *"vamo pensar nesse texto."*

**O que estava errado.** *"Quer conversar sobre isso?"*, e o **isso** não tinha referência.
Podia ser o case, o problema descrito, o jeito de trabalhar. Um pronome sem antecedente no
último elemento da página.

**Decisão dela: a versão seca.** *"Vamos conversar?"*, sem linha de apoio. Só a frase e o
botão.

**As duas que perderam, e o que elas queriam comprar.** Uma reconhecia a leitura:
*"Você leu até aqui"*: apostando que atravessar 7.000px é um sinal real. Outra oferecia o
motivo da conversa e repetia, em uma linha, o método que o case inteiro mostrou: entender antes
de propor.

**Por que a seca ganha mesmo sendo a mais comum.** O case já fez o trabalho inteiro. **Um
convite que argumenta disputa com ele no último centímetro da página**, e argumentar depois
de já ter provado é insegurança, não generosidade. A página termina leve.

**Consequência.** Cinco lugares atualizados, e o marcador de falta saiu de três deles: o texto
deixou de faltar.

## 110 · O bloco de provas: repositório, Figma e, onde existe, protótipo

**Quando** 2026-09-22 · **Fase** 3 · **Domínio** case · `#escopo`

**Gatilho.** Larissa: *"vamo pensar no texto do convite ao repositório, também vai entrar link
pro figma, acha uma boa ideia colocar o figma?"*

**Sobre o Figma: sim, e o motivo é do próprio case.** Um capítulo do case de Finanças se chama
**"O Figma era metade da entrega"**. Linkar o repositório e não o arquivo faz o case afirmar
uma coisa e mostrar a prova de outra. **Afirmação com link é evidência; sem link é alegação.**

**Um buraco achado no caminho.** Os dois cases tinham **exatamente o mesmo bloco**, com só o
link do repositório, mas a decisão 047 já dizia *"protótipo só onde existe: Reembolso tem"*,
e o próprio texto do Reembolso promete *"43 telas alcançáveis, 145 ligações, zero becos sem
saída"*. **O link do protótipo nunca tinha sido desenhado.** O bloco foi clonado de um case
para o outro e ninguém conferiu o que cada um prometia.

**Decisão.** O bloco vira **"as provas do case"**, sob o convite *"Está tudo aberto."* Cada
prova traz uma linha dizendo o que há lá e o link. Finanças tem duas; Reembolso, três.

**Por que o convite mudou.** *"O processo inteiro está no repositório, decisão por decisão"*
falava de uma prova só. Com duas ou três, o convite precisa cobrir todas, e
*"Está tudo aberto"* é também uma afirmação incomum: a maioria dos portfólios mostra resultado
e esconde arquivo.

**Um risco registrado, que não é motivo para não linkar.** Quem abre um arquivo do Figma vê
camadas, nomes, sobras, páginas de rascunho. **Vale abrir os dois arquivos antes de publicar e
conferir se eles sustentam o que o case afirma sobre eles**: o link transforma o arquivo em
parte do argumento.

---

## 111 · Abrir os arquivos antes de linkar, e achar o que o texto errava

**22 de setembro de 2026**

**Gatilho.** A decisão 110 terminou com um risco registrado: *"vale abrir os dois arquivos
antes de publicar e conferir se eles sustentam o que o case afirma sobre eles."* Ela pediu:
*"abre os dois arquivos do figma pra conferir"*, e mandou cinco endereços, não três.

**O que os arquivos têm.**

| Arquivo | O que tem lá dentro |
|---|---|
| Finanças · Figma | Capa que é documentação do próprio arquivo. Wireframe, Mockup com **46 telas + 23 estados** em claro e escuro, style guide com **11 componentes** (estados, inclusive Foco) e **16 ícones**, **38 variáveis de cor em dois modos** e **13 de escala** |
| Finanças · FigJam | Fluxo do usuário inteiro, com legenda de cores, setas e formas |
| Reembolso · Figma | Avaliação heurística completa das **10 heurísticas de Nielsen**, com nota e severidade, média **4,1**. Frame "Telas reais do fluxo atual" com **33 capturas** do app e do gov.br. Persona |
| Reembolso · FigJam | Board de **40.682 × 15.756** com o fluxo atual anotado tela a tela, o novo ao lado, e o fluxograma |
| Reembolso · protótipo | Nó `235:844` é tela construída de verdade, 390×844, com instâncias de componente |

**Os arquivos sustentam o que os cases afirmam.** Nenhum case promete algo que o arquivo não
mostre. O risco da 110 não se confirmou.

**Mas o texto que eu tinha escrito errava.** Eu tinha posto, na linha do Figma de Finanças,
*"As telas, as especificações e o modelo de dados"*. **A capa do próprio arquivo diz o
contrário:** *"A especificação e as decisões vivem no repositório do projeto, não aqui, este
arquivo é o desenho."* Eu descrevi o arquivo pelo que o case fala dele, não pelo que ele é.

**Decisão.** Cada linha do bloco de provas passa a ser escrita a partir do arquivo aberto, não
da lembrança do case. As quatro linhas do Reembolso e as três de Finanças foram refeitas assim.

**Por quê.** O bloco existe para ser verificável. Uma descrição que não bate com o arquivo
transforma a prova em mais uma alegação, e pior, numa alegação que qualquer pessoa desmente
em um clique, porque o link está ali.

**Alternativa descartada.** Escrever descrição genérica: *"o arquivo do Figma"*, que nunca
erra porque nunca afirma. Descartada: a linha existe para dizer o que a pessoa vai achar lá,
senão o link não precisa de linha nenhuma.

**Os dois FigJam viram prova própria.** Ela mandou *"figma e figjam de cada case"*: são
artefatos distintos, em endereços distintos, provando afirmações distintas, o FigJam do
Reembolso é o que prova o capítulo do diagnóstico; o de Finanças, o *"mapeei o caminho
completo"*. Empacotá-los sob o link do Figma esconderia os dois maiores.

**Custo aceito.** O Reembolso passa a ter **quatro** links ao fim da página, e Finanças três.
É bloco maior do que o previsto na 110. Aceito: a página inteira é construída sobre a ideia de
que o processo é a entrega, e é aqui que ele fica endereçável.

**Consequência.** **5 endereços registrados**, em `docs/materiais-a-produzir.md`. Os **dois
repositórios continuam faltando**: são os únicos endereços que o bloco ainda não tem, e o
marcador de falta em cada tela agora diz exatamente isso.

---

## 112 · Dois defeitos que só a comparação em coluna mostrou

**22 de setembro de 2026**

**Gatilho.** *"confere se ficou igual nas quatro telas"*, sobre o bloco de provas da decisão 111.

**A estrutura estava igual** nas quatro: mesmos espaçamentos (32 entre provas, 4 dentro,
8 entre rótulo e aviso), mesmos tamanhos, mesmos pesos, toda cor vinda de variável, todo texto
em largura preenchida. As diferenças eram só as que devem existir: o convite a 22 no desktop
e 20 no estreito, a largura da coluna, o número de provas.

**Primeiro defeito: a contagem.** O marcador de falta dizia *"os outros três já existem"* nas
**quatro** telas. No Reembolso são três. **Em Finanças são dois**: a frase foi copiada junto
com a estrutura. É a quarta vez que um erro desta família aparece: o card do próximo caso
apontando para o próprio case, a faixa de progresso com a contagem do outro, o bloco de provas
idêntico nos dois. **Clonar tela carrega o conteúdo junto, e o conteúdo é a parte que muda.**

**Segundo defeito: o marcador da capa estava em Regular**, e os outros sete em Medium, nas
quatro telas. Por estar errado igual nas quatro, **nunca apareceu**: comparar telas entre si
não acha defeito que todas compartilham. Só apareceu ao listar os marcadores **da mesma tela**
um debaixo do outro.

**Decisão.** O peso de todo marcador de falta passa a ser lido **do componente `173:34`**, não
do que a tela vizinha faz. Quatro marcadores corrigidos para 13/18 Medium.

**Por quê.** O componente existe justamente para ser a resposta. Enquanto os wireframes não
usam instâncias, e pela decisão da 0.3 não vão passar a usar de enfiada, o componente ainda
pode servir de **referência conferível**, mesmo sem ser instanciado.

**Alternativa descartada.** Converter os 36 marcadores em instâncias. Descartada pela mesma
razão da diretriz 0.3: transformaria o wireframe em outra coisa sem que isso tenha sido pedido.

**Consequência.** O inventário dizia *"19 ocorrências"* e são **36**: a contagem é de antes do
segundo case e do bloco de provas. Corrigida. E fica registrado o que a comparação em coluna
alcança e o que não alcança: **ela acha o que difere, não o que está errado por igual.**

---

## 113 · A mesma varredura nas dezoito telas, e a raiz que faltava consertar

**22 de setembro de 2026**

**Gatilho.** *"confere as outras telas do mesmo jeito"*: a checagem da decisão 112, aplicada ao
arquivo inteiro: **mesmo papel, formatação diferente**, dentro de cada tela e entre elas.

**111 papéis varridos em 18 telas.** Quatro defeitos, e nenhum deles aparecia olhando uma tela.

**1 · A tira de destaques estava escrita em duas línguas.** Finanças trazia `PAPEL`, `ESCOPO`,
`ENTREGAS`, `STATUS`, `REPOSITÓRIO`: caixa alta, `text/secondary`. Reembolso trazia `Papel`,
`Método`, `Entregas`, `Repositório`: capitalizada, `text/tertiary`. Duas diferenças de uma vez.

**O desempate não precisou de opinião: os arquivos de conteúdo sempre disseram `**Papel**`,
`**Escopo**`, capitalizado.** A caixa alta existia só no wireframe de Finanças, que foi
desenhado antes de o componente existir. O conserto devolveu o desenho ao que a fonte já dizia.

**2 · As legendas de mídia em duas cores.** Finanças em `text/tertiary`, Reembolso em
`text/secondary`. O componente `174:26` diz `text/secondary`. Doze legendas corrigidas.

**3 · Quatro marcadores de falta em Trabalhos continuavam em Regular**: a correção da 112 não
os alcançou. **Eu tinha dado a 112 por encerrada sem que estivesse.** A varredura só os
encontrou na segunda passada dentro da mesma execução: estão dentro de instâncias do
`card de case`, e a primeira busca não desce nelas.

**4 · E a raiz estava intacta.** Consertar as instâncias não conserta o componente: o
`card de case`, na página Sistema visual, tinha os quatro marcadores em Regular. **Todo card
novo nasceria errado de novo.** Corrigido na raiz.

**Decisão.** Quando um papel diverge, **o componente é o desempate**, e quando o componente
também é suspeito, o arquivo de conteúdo é. Nunca a tela vizinha.

**Por quê.** A tela vizinha não é autoridade: em três dos quatro casos acima ela estava errada
junto. Foi o que a 112 já tinha registrado: comparar telas entre si acha o que difere, não o
que está errado por igual.

**Alternativa descartada.** Escolher entre caixa alta e capitalizada por gosto. Descartada: a
resposta já estava escrita em dois lugares, e não foi consultada na primeira vez.

**Consequência.** Restam **três divergências, todas legítimas**: o parágrafo em Medium é a
frase de abertura do capítulo, e o rótulo em Medium na trilha é o capítulo corrente. **Os dois
compartilham nome com outro papel**, e é isso que mantém a checagem acusando inocente. Dar nome
próprio a eles é o que falta para essa varredura virar checagem automática.

---

## 114 · O link que o conteúdo prometia e o desenho não mostrava

**24 de setembro de 2026**

**Gatilho.** A decisão 113 terminou apontando que a linha do repositório do Reembolso não tinha
o marcador `[link]` que a de Finanças tem. Ela: *"põe o marcador de link também"*.

**O marcador entrou, e destapou um buraco mais antigo.** Com as duas linhas iguais, ficou
visível que **nenhum dos dois wireframes desenhava esse link**. O `[link]` de Finanças estava
no arquivo de conteúdo desde antes e nunca virou desenho: a célula da tira mostrava só o texto.

É a terceira vez que esta família aparece: **o conteúdo promete o que o desenho não mostra**,
como o protótipo do Reembolso que nunca tinha sido desenhado (decisão 110). A diferença é que
aqui a promessa estava num marcador, não numa frase, e marcador não se lê ao olhar a tela.

**A decisão foi dela, porque muda a forma da tira.** Três caminhos: a célula ganhar uma segunda
linha com o link; a própria chave virar o link; ou tirar o `[link]` das duas linhas e deixar o
bloco de provas ser o único lugar. **Ela escolheu a segunda linha na célula.**

**Por quê esse caminho se sustenta.** É a mesma estrutura do bloco de provas (o que há lá, e
embaixo o link) então a página repete um padrão que já ensinou em vez de inventar outro. E
mantém o link onde quem faz triagem rápida está olhando: as definições chamam a tira de
*"o elemento mais escaneável do case"*.

**Sem o aviso "abre em nova aba".** A célula tem 237px no desktop e o aviso quebraria linha. O
sublinhado já é a promessa de sair: é a forma que "Quem sou eu" usa para currículo, LinkedIn e
e-mail. O aviso continua onde há espaço para ele, no bloco de provas.

**Custo aceito.** A tira de Finanças cresceu 8px. A do Reembolso não cresceu nada: a célula de
entregas já era mais alta que a do repositório mesmo depois do acréscimo.

**A raiz foi junto, e dessa vez sem precisar ser lembrada.** O componente da tira era um
componente solto, sem lugar para link. Virou **conjunto com a propriedade `link`**: `não` e
`sim`: em `260:130`. Sem isso, toda instância futura nasceria sem o link, que é exatamente o
erro que a 113 achou no `card de case`.

**Consequência.** O endereço do repositório agora falta em **dois** lugares por case: na tira e
no bloco de provas. Continua sendo **um endereço só**, e o marcador de falta segue só no bloco,
porque dois marcadores para a mesma ausência é ruído, não informação.

---

## 115 · O respiro dentro da célula é o mesmo nas duas larguras

**24 de setembro de 2026**

**Gatilho.** Na conferência lado a lado das quatro telas de case, a tira de destaques aparecia
com **8px entre chave e valor no desktop e 4px na estreita**. Com o link novo dentro da célula
(decisão 114), os 4px deixavam `Ver o repositório` grudado no parágrafo, e a estreita é tela
de toque. Ela: *"aumenta pra 8 na estreita também"*.

**Decisão.** O espaçamento interno da célula da tira passa a ser **8 nas duas larguras**.

**Por quê 8 e não um valor próprio da estreita.** O componente `260:130` já dizia 8. A estreita
é que divergia, e divergia de um jeito que não tinha razão registrada em lugar nenhum. **Não é
a estreita ganhando respiro; é a estreita voltando para o que a peça já definia.**

**O espaçamento é da célula, então a chave ganhou junto.** Não dava para afastar só o link sem
inventar um espaçador dentro da célula. Afastar os dois mantém a célula com um ritmo só, que é
o que a peça é: um bloco de três linhas, não três coisas soltas.

**O que mudou de tamanho.** A tira de Finanças na estreita foi de 516 para 540, a do Reembolso
de 428 para 448. Os heroes cresceram junto e as duas telas foram reempilhadas. Nenhum texto
cortado.

**Consequência.** Some uma diferença entre larguras que não era decisão: era sobra. As duas
larguras agora têm o mesmo ritmo interno, e o que muda entre elas é só o que foi escolhido:
margem, escala de tipo e o empilhamento.

---

## 116 · Dois papéis que compartilhavam nome com outro

**24 de setembro de 2026**

**Gatilho.** A varredura "mesmo papel, formatação diferente" das decisões 112 e 113 sobrava
sempre três acusações legítimas. Ela: *"resolve esses nomes"*.

**Primeiro, desfazer um erro meu.** Eu tinha relatado **três** nomes ambíguos, incluindo
`título do case`: o do hero e o do card do próximo. **Não era verdade.** Os dois vivem sob pais
diferentes, `hero do case` e `texto do card`, e a varredura chaveia por pai mais nome: nunca os
confundiu. Quem os misturou foi a minha consulta, que pegou o primeiro do arquivo inteiro. **Eu
relatei como defeito do desenho um defeito da minha checagem.**

**Decisão. Dois nomes novos:**

| Era | Virou | Por quê |
|---|---|---|
| `parágrafo` em Medium sobre `text/primary` | **`frase de abertura`** | Abre o capítulo e resume o que ele vai provar. Não é um parágrafo com ênfase: é outro papel |
| `rótulo` em Medium sobre `text/primary`, na trilha | **`rótulo · atual`** | É o capítulo onde a pessoa está |

**28 frases de abertura** e **2 rótulos** renomeados. A trilha só tem um corrente por tela.

**Um erro no caminho, e o que ele ensina.** O primeiro filtro do `rótulo` pegou **9 rótulos que
não são da trilha**, e-mail e LinkedIn do contato revelado, itens do menu, opções de tema.
Todos são "rótulo em Medium sobre primary", mas nenhum é capítulo corrente. Revertidos.
**Formatação não identifica papel; o pai identifica.** Foi o que a checagem já sabia e o meu
filtro esqueceu.

**A raiz foi junto.** As **6 variantes `marcador=ativo`** do `trilha / item`, na página Sistema
visual, também passaram a nomear `rótulo · atual`. Sem isso, toda instância futura do capítulo
corrente nasceria com o nome antigo: o mesmo erro do `card de case` na 113 e da tira na 114.
**Três vezes seguidas a raiz estava intacta depois de a tela estar certa.**

**Consequência.** **115 papéis varridos nas 18 telas, zero divergências.** A varredura deixa de
acusar inocente, e com isso ela pode virar checagem automática, que era o que faltava. Não
virou ainda: não trava nada.

**Por que não usar `· atual` para um estado é tentador e ainda assim certo aqui.** Estado
normalmente vive em variante, não em nome. Mas a varredura lê nome, não variante, e o projeto já
declara exceção no nome: `· recorte`, `· rola na horizontal`. O sufixo segue o precedente da
casa em vez de inventar um segundo jeito de dizer a mesma coisa.

---

## 117 · Checagem 9, e a lacuna que ficou declarada em vez de coberta

**24 de setembro de 2026**

**Gatilho.** *"cria a checagem"*: a varredura das decisões 112 a 116, que parou de acusar
inocente quando os papéis ganharam nome próprio.

**O que ela confere.** O papel é o par **pai › nome** do nó. Mesmo papel, mesma largura, um
formato só, em todas as telas. **115 papéis em 18 telas, 603 textos.**

**Um quarto nome apareceu ao construir a checagem.** A lente por nome dentro da tela ainda
acusava `célula`: cabeçalho da tabela em Medium sobre `text/tertiary` contra corpo em Regular
sobre `text/primary`. Virou **`célula de cabeçalho`**, 10 nós e a raiz em `tabela / linha`. Eu
tinha relatado três nomes; eram quatro. **O quarto só apareceu porque a segunda lente o
escondia**: a primeira o via desde sempre.

**A decisão difícil: qual lente virar checagem.**

| Lente | Acha | Custo |
|---|---|---|
| pai › nome, entre telas | a tela que saiu da linha: a tira, as legendas | nenhum: zero acusações hoje |
| nome, dentro da tela | o marcador de falta em Regular dentro da capa | **15 acusações, todas inocentes** |

**A segunda acusaria** o título a 56px no hero contra 36px no card, a frase de abertura em
escala de hero, o rótulo do botão contra o da trilha. Todos legítimos, e **não há sinal
estrutural que os separe do caso do marcador**. A diferença é semântica: um título de hero é
outra coisa; um marcador de falta é a mesma coisa.

**Decisão.** A checagem fica com a lente precisa, e **a lacuna fica declarada**: no comentário
do código e numa nota impressa a cada execução.

**Por quê.** É a regra que ela própria estabeleceu quando a checagem 5 acusou seis frases
legítimas: **uma checagem que acusa inocente ensina a ignorar a checagem.** Cobrir menos e
dizer o que não cobre vale mais do que cobrir tudo e ser desligada.

**A saída para papel que é mesmo outro papel é nome próprio, não checagem frouxa.** Foi assim
que nasceram `frase de abertura`, `rótulo · atual` e `célula de cabeçalho`.

**Verificada falhando.** Alimentei o defeito real da tira: `chave` em `text/secondary` num
case e `text/tertiary` no outro. A checagem acusou e o script saiu com código 1; restaurado,
saiu 0. **Checagem que nunca falhou não está verificada.**

**Consequência.** Nove checagens. E uma classe de defeito que já apareceu uma vez segue sem
cobertura automática, dita em voz alta em vez de esquecida.

---

## 118 · O atalho de salto: link, opaco, e um só

**24 de setembro de 2026**

**Gatilho.** *"bora resolver a p48"*. Um case tem 7.000px e toda página tem barra fixa. Sem
atalho, quem navega por teclado atravessa a barra inteira em cada página antes do texto. Estava
desenhado como proposta no quadro 05 de *Sistema visual*, e **em nenhum contrato**.

**Um defeito na própria proposta.** A peça desenhada tinha borda, canto e respiro, e
**nenhum preenchimento**. Na demonstração ela repousa sobre o fundo da página e parece certa;
na vida real ela flutua sobre o conteúdo, e o texto da página apareceria atrás do rótulo.
**Ganhou `bg/surface`.** O contexto da demonstração escondia a falta.

**As decisões, e o que cada uma descartou:**

| Decisão | Alternativa descartada | Por quê |
|---|---|---|
| **É link, não botão** | tratar como botão | "Falar comigo" segue sendo o único botão do site. Este move a pessoa dentro da própria página |
| **Flutua sobre o conteúdo** | empurrar a barra para baixo | Empurrar desloca a página inteira no instante em que alguém está se orientando, e para quem não está vendo o cursor. Flutuar custa uma superfície opaca; empurrar custa a estabilidade |
| **É um só** | somar "pular para a trilha" | A primeira tecla de uma página não é lugar de oferecer escolha |
| **Cobre a faixa de progresso na estreita** | descer o atalho para baixo da faixa | A faixa é indicador passivo e não recebe foco. O atalho é a única coisa acionável ali naquele instante, então cobrir não tira nada de ninguém |
| **O destino recebe o foco** | só rolar até o conteúdo | **É a decisão que faz o atalho existir** |

**Por que o destino precisa receber foco de verdade.** Um atalho que só rola deixa o foco onde
estava: a pessoa vê o conteúdo, aperta Tab e volta para o segundo item da barra. O salto teria
sido visual e não de navegação: exatamente o que ele existe para resolver. É o erro mais comum
desse padrão e não aparece em captura de tela nenhuma.

**Consequência.** Contrato novo em `moldura/atalho-de-salto.md`, seis cenários. Componente
`273:114`, o **décimo quarto** do inventário, e o primeiro que entra por acessibilidade, não
por repetição. Duas telas de estado, `274:243` e `274:279`, seguindo o padrão dos outros
estados revelados: recorte, anotação e a nota explicando o que não se vê.

**O arquivo passou de 18 para 20 telas**, então `papeis.json` foi reexportado: **117 papéis,
644 textos, zero divergências.** A checagem 9 acompanhou o crescimento sem ajuste.

---

## 119 · A checagem 9 estreou deixando passar o defeito que ela existe para pegar

**24 de setembro de 2026**

**Gatilho.** *"confere as duas telas novas lado a lado"*, sobre as telas do atalho de salto.

**Três defeitos, todos meus, nenhum visível olhando as duas telas isoladas.**

**1 · A nota saiu em outro formato.** As quatro telas de estado anteriores usam
`13/18 Medium text/tertiary`. As minhas saíram `15/24 Regular text/secondary`.

**E a checagem 9 passou.** A chave era `pai › nome`, e **nó de primeiro nível tem a própria
tela como pai**, então cada tela virava uma chave só dela e nenhum elemento de topo era
comparado com o das outras. A nota é filha direta da tela. Passou pelo buraco.

**Correção da checagem.** Nó de primeiro nível entra como **`(topo) › nome`**. Com isso as seis
notas viram um papel só, e a divergência teria sido acusada. A varredura foi de 117 para **113
papéis**: quatro chaves que eram a mesma coisa com nomes de tela diferentes.

**A checagem estreou com o defeito que ela deveria pegar já dentro do arquivo.** Escrever a
checagem não é o mesmo que confiar nela: a primeira coisa que ela mereceu foi ser desmentida.

**2 · A faixa de anotação, lida pela regra errada.** Eu olhei a família e concluí "faixa só na
estreita, no desktop a nota fica solta". **A regra não é largura: é recorte.** `Contato
revelado · desktop 1440` e `Tema revelado · desktop 1440` não têm faixa porque mostram um
elemento inteiro; as duas telas estreitas têm porque cortam a página. As minhas duas cortam.
Tirei a faixa do desktop e depois devolvi.

**3 · O hero em x=297 quando mora em x=80.** Empurrado 217px para dentro e cortado na direita.
E o atalho, alinhado em 297, ficava fora de prumo com o nome na barra e com o título. Ambos
foram para a margem da página, que agora é **lida da própria barra**, não escrita à mão.

**Consequência.** Quatro coisas corrigidas e uma checagem consertada. **113 papéis, 644 textos,
20 telas, zero divergências.** A lacuna que sobra continua sendo a mesma e continua declarada:
o mesmo nome sob pais diferentes na mesma tela.

---

## 120 · A linha longa paga em entrelinha, e a pergunta estava desatualizada

**24 de setembro de 2026**

**Gatilho.** *"resolve a p54"*, se a banda do extra, com linha muito acima da medida, precisa
de mais entrelinha.

**Primeiro, medir.** A pergunta falava em **148 caracteres no título e 122 no corpo**. A medida
real hoje é **105**. A banda encolheu de sangria total para 1063px quando ela mandou *"faz
começando do mesmo lugar do texto do case e indo até o final da tela"*, e a pergunta continuou
com o número de antes. **Pergunta guardada envelhece junto com o desenho.** Nenhuma das três
opções escritas foi avaliada sobre o número certo.

**O que a medição mostrou, lado a lado:**

| | largura | corpo | caracteres por linha |
|---|---|---|---|
| prosa do case | 628 | 18/30 | ~69: dentro do teto de 75 |
| banda do extra, desktop | 1063 | 18/30 | **~105** |
| banda do extra, estreita | 327 | 18/30 | ~34: a medida já é curta |

**O problema é só do desktop.** Em tela estreita a banda sangra, mas a margem governa e a linha
fica em 34 caracteres. Não há o que compensar lá.

**Decisão. Criado `line/corpo-largo`: 34 no desktop, 30 em tela pequena.** Mesmo corpo, mais
respiro entre as linhas.

**Por quê um token e não um par novo.** A escala vem em pares: `size/corpo` com `line/corpo`.
Um par novo exigiria `size/extra` valendo 18, idêntico a `size/corpo`: um token que existe só
para ter com quem se casar. **O corpo não muda; só a entrelinha muda.** Então só a entrelinha
ganha token.

**Por que o valor em tela pequena é igual ao de `line/corpo`.** Poderia não existir naquele
modo. Mas um token que some num modo obriga quem usa a lembrar da exceção. Valendo o mesmo, ele
diz em voz alta: *ali não há medida longa para compensar.*

**Alternativa descartada: usar `abertura` (21/34)**, como a pergunta sugeria. A pergunta dizia
que abertura "tem mais entrelinha": tem, em pixels. **Mas a proporção é menor:** 34/21 = 1,62
contra 30/18 = 1,67. Trocaria o problema por um pior, e a linha ainda ficaria em ~90
caracteres, longe do teto.

**Alternativa descartada: deixar como está.** A largura é decisão dela e não se reabre, é ela
que diz que o extra não é o case. Mas largura escolhida não cancela o custo que ela cria.
**A exceção fica; o custo fica pago.**

**Consequência.** 60 tokens. A regra de medida em `docs/design-system.md` deixou de citar 122
caracteres e passou a citar 105, com a entrelinha ao lado. `papeis.json` reexportado: 113
papéis, zero divergências, a banda tem pai próprio, `extra`, então o novo formato não colide
com o `parágrafo` da leitura.

---

## 121 · A banda do extra respira igual em cima e embaixo

**24 de setembro de 2026**

**Gatilho.** Na conferência lado a lado do extra, o respiro de baixo **dobrava quando a aba
abria** (48 para 96 no desktop, 32 para 64 na estreita) e o de cima não. As duas larguras
dobravam do mesmo jeito, o que fazia parecer escolha. **Não estava escrito em lugar nenhum**,
nem na decisão 108, que criou a aba. Ela: *"deixa 48 e 32, igual em cima e embaixo"*.

**Decisão.** O respiro de baixo passa a valer o mesmo que o de cima, nos dois estados e nas
duas larguras: **48 no desktop, 32 na estreita.**

**Por quê.** Fechada, a banda já era simétrica. Aberta, o último parágrafo ficava ao dobro da
distância que o título tem do topo: a mesma peça com dois ritmos conforme o estado. **A aba
muda o que a banda mostra, não como ela respira.**

**E havia respiro sobrando de qualquer forma.** Na página do case a banda já é seguida de 96 de
intervalo até o bloco seguinte. Somados, davam 192 abaixo do último parágrafo: não era o fim
do texto pedindo ar, era ar contado duas vezes.

**Custo aceito.** Nenhum. A banda aberta foi de 1318 para 1270 no desktop e de 2634 para 2602
na estreita, e nada abaixo dela se move: as duas telas do estado aberto mostram só a banda.

**Consequência.** Um valor a menos para lembrar. O respiro da banda é um só, e quem o procurar
encontra o mesmo número dos dois lados, em qualquer estado.

---

## 122 · A seta da aba encosta no título, na linha do título

**24 de setembro de 2026**

**Gatilho.** Ela: *"bota a setinha do extra alinhada com o título (com a primeira linha para a
tela estreita) e aproxima do título, não deixa longe lá na margem"*.

**O que empurrava a seta para longe.** A aba usava `SPACE_BETWEEN` com o título em largura
preenchida: o título esticava até onde desse, e a seta ia parar na margem oposta, a 600px do
texto no desktop. **A distância não era escolha; era o que sobrou do alinhamento.**

**Decisão.** Alinhamento ao início, título encolhido à própria linha mais longa, e vão fixo de
**16** entre o fim do título e a seta.

**E o caso difícil: a estreita, onde o título quebra em duas linhas.** Centralizar a seta no
bloco a deixaria entre as duas linhas, apontando para o vão. A seta foi para **uma caixa da
altura de uma linha**, alinhada ao topo, então ela cai no meio da **primeira** linha, que é
onde o título começa e onde o olho está.

**Como o título passou a saber sua própria largura.** Ele é fixado na **menor largura que ainda
o mantém no mesmo número de linhas**, achada por busca binária. Sem isso o bloco ficaria com a
largura disponível inteira, e a seta voltaria para longe, só que agora encostada num bloco
invisível em vez de na margem.

**Dois enganos no caminho, e os dois já conhecidos desta casa.**

**O primeiro custou o título.** `layoutSizingHorizontal = 'FIXED'` **zera o `textAutoResize`**:
é a mesma armadilha que já mordeu cinco vezes. A busca binária passou a ler sempre "1 linha",
e encolheu o título até o piso de 40px. Corrigido invertendo a ordem: fixar primeiro, religar
o `textAutoResize` depois, e religar de novo a cada medida.

**O segundo foi alarme falso, e eu quase relatei como defeito.** As setas fechadas apareciam em
`@20,28` contra `@0,16` das abertas: vinte pixels e doze pixels de diferença, em dois estados
da mesma peça. **Elas são as mesmas setas rotacionadas 180°**, e `x`/`y` passam a reportar o
canto oposto. Medido por caixa delimitadora, as quatro são idênticas: vão de 16, e o centro da
seta exatamente na metade da primeira linha, 22 no desktop, 17 na estreita.

**A lição, que já é a segunda vez esta semana:** propriedade de nó não é medida. `x` mente com
rotação, como `parent.name` mentiu no `título do case`. **Quando o número surpreende, medir de
outro jeito antes de acusar.**

**Consequência.** Quatro variantes e quatro instâncias conferidas por caixa delimitadora, todas
iguais. Nenhuma tela mudou de altura. 113 papéis, 644 textos, zero divergências.

---

## 123 · O case no escuro, e o defeito que ele achou no claro

**24 de setembro de 2026**

**Gatilho.** *"vamos fazer o tema escuro do case"*. Das 22 telas do arquivo, **nenhuma existia
no escuro**: a paleta tinha dois modos desde sempre e nenhuma página tinha sido vista num
deles.

**O trabalho de variável se pagou aqui.** As duas telas escuras são o case clonado com **um
comando**: `setExplicitVariableModeForCollection`. Nada foi repintado à mão, nada ficou para
trás, nenhum texto cortado. **Isso só funcionou porque a checagem 7 já garantia que não havia
cor escrita à mão**: a migração que na hora pareceu excessiva é o que tornou o tema escuro um
clique em vez de um retrabalho.

**Depois, medir.** Quinze pares de texto-sobre-fundo nas duas telas, com o piso AA de cada
tamanho, nos **dois** temas.

| Par | claro | escuro | piso | vai ao ar? |
|---|---|---|---|---|
| `text/tertiary` sobre `border`, 13px | **2,53** | **3,34** | 4,5 | não: é o marcador de falta |
| `text/tertiary` sobre `bg/page`, 13px | **3,19** | 4,76 | 4,5 | **sim**: as chaves da tira |
| `text/tertiary` sobre `bg/page`, 15px | **3,19** | 4,76 | 4,5 | **sim**: "abre em nova aba" |
| outros 12 pares | passa | passa | não se aplica | não se aplica |

**O escuro está limpo.** O único par que reprova nele é andaime que não vai ao ar.

**E o resultado inverteu a pergunta.** Eu fui medir o tema novo e **o defeito estava no antigo**.
`text/tertiary` sobre `bg/page` dá **3,19:1 no claro**, abaixo de AA, e 4,76 no escuro. A cor
que reprova é a que já estava publicada em toda tira de destaques.

**Por que ninguém tinha visto.** A página *Sistema visual* declara *"Contraste conferido"* e
lista quatro números: primário claro, primário escuro, secundário claro, secundário escuro.
**`text/tertiary` não está lá.** Ele é descrito como "metadado" e nunca foi medido, e as
definições exigem que *"todo par novo passa por AA nos dois temas antes de entrar"*. A regra
existia; o terceiro nível escapou dela.

**Não decidi.** Mudar `text/tertiary` mexe no site inteiro, e as duas saídas têm custo real:
escurecer a cor até 4,5:1 (por volta de `#716D68`) aproxima demais de `text/secondary` e achata
três níveis em dois; mudar o uso mantém a paleta mas move as chaves da tira para
`text/secondary`. Virou **P55**.

**Consequência.** 22 telas, sendo duas no escuro. 113 papéis, 797 textos, zero divergências.
E uma pergunta nova que só existe porque a página foi montada no outro tema: **o tema escuro
pagou o próprio custo antes de ficar pronto.**

---

## 124 · No claro não cabe um terceiro nível de texto

**24 de setembro de 2026**

**Gatilho.** *"resolve a p55"*: `text/tertiary` sobre `bg/page` dá 3,19:1 no claro, abaixo do
piso AA de 4,5, e carrega texto que vai ao ar.

**Primeiro, o tamanho real do problema.** Enumerei todo uso de `text/tertiary`: **62 ocorrências
que vão ao ar**, e não as 18 que a pergunta supunha. Além das chaves da tira e do "abre em nova
aba", estavam lá os **cabeçalhos da tabela de comparação** e o aviso de rolagem: texto que
informa, não decora. E **todas sobre `bg/page`**: nenhuma sobre outro fundo.

**O que decidiu não foi gosto, foi um número.** A pergunta oferecia escurecer a cor até 4,5:1.
Calculei qual seria: a cor mais clara que passa sobre o creme **e** sobre `bg/subtle` é
`#696561`, a **treze pontos por canal** de `text/secondary` (`#5C5854`). Dois níveis que
ninguém distingue não são dois níveis.

**A assimetria entre os temas é a explicação.** No escuro, entre o fundo `#1A1715` e o piso AA
há uma faixa larga: secundário 8,11, terciário 4,76, os dois passando e visivelmente
diferentes. No creme `#F4EFE4` essa faixa é estreita: de 4,5 até os 6,15 do secundário. **O
escuro comporta três níveis de texto; o claro não.**

**Decisão.** Tudo que informa passa a `text/secondary`. `text/tertiary` fica como **tom de
anotação do wireframe** (marcador de falta, "o que falta", notas das telas de estado) que
não vai ao ar. Em texto grande continua permitido, onde o piso cai para 3:1.

**Alternativa descartada.** Escurecer o terciário: achataria três níveis em dois e ainda
deixaria `bg/subtle` no limite.

**Consequência.** 62 nós nas telas e as raízes em `tira de destaques / item`, `tabela / linha` e
`mídia com legenda`. **27 pares que vão ao ar, zero reprovações**, mínimo de **5,52 no claro** e
**6,26 no escuro**.

**E a linha que criou a lacuna foi corrigida.** O quadro 01 declarava *"Contraste conferido"*
listando só primário e secundário. Agora lista **os três**, com o número do terciário e a regra
de por que ele não carrega texto informativo. **A declaração que omitia era o que fazia a regra
parecer cumprida.**

**Dois excessos meus no caminho, e a forma de achar cada um.** Na primeira passada movi **108
nós** em vez de 62: peguei junto os rótulos de documentação da própria página Sistema visual,
que são cromo e não produto. Ao reverter, devolvi a terciário **vinte nós que já eram
secundários antes**, só consegui separá-los porque a primeira execução tinha devolvido a lista
exata do que mudou. **Registro de que se mexeu é o que torna o desfazer possível.**

---

## 125 · O site inteiro no escuro, e o único token que não foi escolhido duas vezes

**24 de setembro de 2026**

**Gatilho.** *"agora faz o tema escuro das outras telas"*, depois do case.

**Dezoito telas, um comando cada.** Clonar e
`setExplicitVariableModeForCollection`. **Quarenta telas** no arquivo, vinte no escuro. Cada
escura tem exatamente o tamanho da clara, e a assinatura nó a nó (tipo, nome, tamanho, fonte,
contagem de caracteres, variável de cor) é **idêntica**. Nenhum nó tocado à mão.

**O contraste de texto passa inteiro.** Trinta e um pares que vão ao ar, **zero reprovações**,
mínimo de **5,52 no claro** e **6,26 no escuro**: resultado da decisão 124, que veio antes e
por isso as dezoito telas nasceram certas.

**Mas o escuro trouxe um defeito que o claro não tinha.** `overlay/veu` é `#000000` a 45%, e é
**o mesmo valor nos dois modos**. É a única variável da paleta que não distingue claro de
escuro, num sistema cujas definições dizem que *"os dois modos foram escolhidos e verificados
em separado"*. Este não foi: foi escolhido uma vez e herdado.

| | claro | escuro |
|---|---|---|
| página sob o véu | `#86837D` | `#0E0D0C` |
| caixa da sobreposição | `#FFFFFF` | `#232019` |
| separação caixa × velada | **3,76:1** | **1,20:1** |

**Por que escurecer mais não resolve, e é isso que torna a questão uma decisão.** No claro a
caixa lê porque o véu escurece tudo em volta de uma superfície **branca**. No escuro a caixa
quase não sobe da página: `bg/surface` sobre `bg/page` dá **1,10:1 mesmo sem véu**. Levar o véu
a 80% leva a separação a 1,26. **O mecanismo do claro não atravessa para o escuro**, não é um
valor errado, é um método que só funciona de um lado.

**Não decidi.** As três saídas mexem em lugares diferentes do sistema: valor próprio por modo,
clarear `bg/surface` no escuro (todo card do site), ou borda visível só no escuro. Virou
**P56**.

**Uma limitação da minha auditoria, achada e contornada.** Ela mede o texto contra o fundo
**herdado dos pais**. Realce desenhado *atrás* do texto como irmão: o marca-texto, não entra
por esse caminho: eu tinha medido aquele texto contra a página, não contra o realce. Fui atrás
das sobreposições geométricas em separado e achei duas, `text/primary` sobre
`accent/hero/surface`, 13,33 no claro e 11,40 no escuro, ambas folgadas. **Mas a lacuna existe:
texto sobre retângulo solto não é pego pela medição automática.**

**Consequência.** 40 telas, 1.288 textos, 113 papéis, zero divergências.

---

## 126 · O limite de quem flutua, e um cálculo que descartou duas opções antes de testá-las

**24 de setembro de 2026**

**Gatilho.** *"resolve a p56"*: a caixa de sobreposição não se separava do fundo no escuro,
1,20:1 contra o piso de 3.

**Duas das três opções caíram no cálculo, não na tentativa.**

**Mexer no véu: impossível, não ruim.** Mais véu escurece a página e aumenta a separação, mas
satura. Com o véu a **100%**, a página vira preto puro e a separação da caixa chega a
**1,29:1**. Não existe valor de véu que resolva. Isso não é opinião sobre estética: é um teto.

**Clarear `bg/surface` no escuro: desproporcional.** Para 3:1 sobre a página velada, a
superfície precisaria de algo como `#5F5A53`, cinza médio, não superfície escura. Mudaria todo
card do site para consertar três sobreposições.

**Sobra a borda, e ela é a resposta certa pelo motivo certo.** O piso da WCAG para **limite de
componente** é 3:1, não 4,5, é informação não textual. Um contorno perceptível satisfaz o
critério sem tocar em superfície nenhuma.

**Mas a pergunta descrevia menos da metade do problema.** Ao enumerar o que flutua, apareceu que
as sobreposições do **desktop**: contato revelado e tema revelado, e o **atalho de salto** não
têm véu: flutuam direto sobre a página. Ali o limite é **1,26:1 no claro** e 1,43 no escuro.
**Reprovava também no tema claro, e isso estava publicado desde sempre.** A P56 nasceu como
defeito do escuro e era defeito dos dois.

**Decisão.** Criado **`border/elevado`**: `#8E8A80` no claro, `#6C6255` no escuro. Aplicado às
cinco peças que flutuam e às raízes em Sistema visual.

**Por que não mudar o `border` existente.** Ele é fio de divisória: tabela, célula, separador.
Clareá-lo a 3:1 engrossaria toda linha fina do site para resolver cinco caixas. **Papel
diferente, token diferente**: a mesma lógica que criou `line/corpo-largo`.

**Como cada valor foi achado.** Calibrando a borda **só onde o preenchimento não dá conta**. No
claro velado o preenchimento já entrega 3,76:1, então ali a borda não precisa carregar nada, e
foi justamente essa exigência a mais, na minha primeira calibragem, que empurrou o valor claro
para `#3C3A36`, um contorno quase preto. **Pedir garantia onde ela já existia deformou o
resultado.**

**Consequência.** 61 tokens. **Doze superfícies flutuantes medidas, zero reprovações**: cada uma
atinge 3:1 pelo preenchimento ou pela borda, nos dois temas.

---

## 127 · Correção: o véu tinha alfa por modo, e eu li errado

**24 de setembro de 2026**

**Gatilho.** *"confere as telas de sobreposição lado a lado nos dois temas"*. Na conferência, o
véu apareceu **a 8%** na tela clara, e eu tinha calculado a decisão 126 inteira com **45%**.

**O que eu afirmei e está errado.** A decisão 125 diz que `overlay/veu` é *"`#000000` a 45%, o
mesmo valor nos dois modos"* e que é *"a única variável da paleta que não distingue claro de
escuro"*. **Falso.** Ele é `#000000` a **8% no claro** e a **45% no escuro**: escolhido em
separado, como todos os outros.

**Como eu errei.** A cor no Figma tem canal alfa, e a minha função de conversão para hexadecimal
**descartava o alfa**. Li `#000000` nos dois modos e concluí que eram iguais. O alfa estava a
dois campos de distância, no mesmo objeto que eu já tinha na mão.

**E o pior: a resposta certa já estava exportada.** `docs/spec/tokens.json` registra
`overlay/veu` como `#00000014` no claro e `#00000073` no escuro, 8% e 45%, com o alfa nos dois
últimos dígitos. **Fui ao Figma buscar um dado que o repositório já tinha, e perdi no caminho a
parte que importava.**

**A consequência prática.** Com o alfa errado eu calculei a página velada do claro como
`#86837D` quando é `#E0DCD2`, e concluí que ali o preenchimento entregava **3,76:1** quando
entrega **1,37**. Por isso calibrei `border/elevado` no claro dispensando o caso velado, e o
valor `#8E8A80` dava só **2,52:1** sob o véu. **A decisão 126 deixou passar exatamente o caso
que a P56 descrevia.**

**Correção.** `border/elevado` no claro passa de `#8E8A80` para **`#817D74`**: 3,60 sobre a
página e **3,01 sobre a velada**. O escuro segue `#6C6255`. **Doze superfícies flutuantes, zero
reprovações nos dois temas.**

**O que fica de regra.** É a terceira vez nesta semana que um número surpreendente veio de
leitura, não de desenho: `x` mentiu com rotação, `parent.name` mentiu no `título do case`, e
agora `hex()` mentiu descartando alfa. **Quando a medida surpreender, desconfie primeiro do
instrumento.** E antes de consultar o Figma, olhe se o dado já está exportado: o repositório é
a fonte que não perde canal.

---

## 128 · O escuro estava sem vida, e a causa era saturação

**24 de setembro de 2026**

**Gatilho.** Ela, vendo as telas escuras: *"não gostei muito das cores, achei meio sem vida. A
gente poderia usar as cores no modo forte na tela escura?"*

**A pergunta supunha uma causa; a medição mostrou outra.** As superfícies de acento **perderam
cerca de metade da saturação** ao passar para o escuro:

| | superfície clara | sat | superfície escura | sat |
|---|---|---|---|---|
| laranja | `#FBE0D2` | 0,84 | `#3A2318` | **0,41** |
| roxo | `#E4DCFB` | 0,79 | `#2A2145` | **0,35** |
| rosa | `#FBDCEC` | 0,79 | `#3A1E2E` | **0,32** |
| verde | `#D9EED4` | 0,43 | `#1E3320` | **0,26** |

No claro são cor pálida de verdade; no escuro viraram marrom e azul-petróleo escurecidos. **Não
era o token errado: era a mesma família de cor com a cor drenada.**

**Por que o tom forte como fundo foi descartado.** No escuro ele é claro (`#6FB4D6`, `#FF9463`,
`#A98CFF`) e dá **1,68 a 2,24** contra o texto claro. O texto teria de virar tinta escura,
invertendo a polaridade da página dentro de um bloco de parágrafo inteiro. É também o único uso
que as definições proíbem por escrito: *"o forte é marcador, ícone e linha, e nunca é fundo de
parágrafo."* Ofereci três caminhos; ela escolheu **saturar as superfícies**.

**Duas tentativas, e a diferença entre elas é o ponto.** Na primeira igualei a saturação
mantendo a luminosidade **do HSL**, e a luminância real mudou junto: o bloco roxo caiu de
**1,19 para 1,07** contra a página, ficando quase invisível. **Saturar sem travar a luminância
não é saturar: é escurecer de lado.**

Na segunda, mantive matiz e saturação da correspondente clara e **busquei o L que devolve
exatamente a luminância original**. Resultado: separação da página e contraste do texto
**idênticos aos de antes, número por número** (1,29 / 1,22 / 1,19 / 1,32 / 1,19) e só a cor
mudou.

| | antes | agora | saturação |
|---|---|---|---|
| azul | `#16303D` | `#13303F` | 0,47 → 0,53 |
| laranja | `#3A2318` | `#471B06` | 0,41 → 0,84 |
| roxo | `#2A2145` | `#270D75` | 0,35 → 0,79 |
| verde | `#1E3320` | `#153518` | 0,26 → 0,43 |
| rosa | `#3A1E2E` | `#4E0930` | 0,32 → 0,79 |

**Consequência.** 31 pares auditados nas 40 telas, **zero reprovações**, mínimo 5,52. A mudança
é puramente cromática: nenhum veredito de contraste se moveu, porque a grandeza que os governa
foi tratada como invariante do problema, e não como resultado.

---

## 129 · A trilha se enche, e a regra que parecia proibir era a que pedia

**28 de setembro de 2026**

**Gatilho.** Ela: *"temos o comportamento da trilha registrado como regra? Eu quero que ela vá
colorindo conforme avança no conteúdo, não só a bolinha atual colorida."*

**Sim, está registrado**: `case/trilha.md`, 16 regras e 9 cenários. E havia uma que dizia o
contrário: *"o traço e os marcadores inativos ficam neutros."*

**Mas o motivo escrito dessa regra é o que sustenta a mudança.** Ele era: *"pintar a linha
inteira de cor forte a transformaria em ornamento."* **Linha sempre igual não informa nada**,
por isso seria ornamento. **Linha que enche informa quanto já passou.** O critério da regra é
função, e a versão que enche cumpre o critério melhor que a que não enchia. Não foi ela
derrubando um princípio: foi o princípio aplicado até o fim.

**O que de fato conflitava era uma palavra: "inativos".** Ela juntava duas coisas diferentes,
o que já foi lido e o que ainda não foi. A trilha passa a ter **três estados: percorrido, atual
e por vir.**

**E a tela estreita já fazia isso.** A faixa de progresso enche conforme a rolagem desde a
decisão 080. **O desktop é que estava fora de linha**, dando só posição enquanto a estreita dava
posição e progresso.

**A cor precisa parar na bolinha, não no item.** Se o traço inteiro do item atual ficasse
colorido, a cor passaria da bolinha e prometeria leitura que não aconteceu; se ficasse todo
neutro, abriria um vão de 12px acima dela. Por isso **o traço virou duas peças**, acima e abaixo
da bolinha. No item atual, a de cima é colorida e a de baixo não.

**O rótulo do percorrido não muda.** Lido não é o mesmo que atual, se o peso também mudasse,
metade da trilha pareceria ativa.

**E a etapa atual continua distinguível sem depender de cor.** Contra as por vir valem as três
marcas; contra as percorridas valem **marcador maior e peso do rótulo**. A razão original da
regra das três marcas era não depender de cor, e isso segue de pé.

**Um defeito antigo que só apareceu agora.** O traço tinha altura fixa de 56, mas o item
*"Desenho e documentação"* tem rótulo de duas linhas e mede **80**. Faltavam **24px**: uma
falha na linha, invisível enquanto tudo era neutro e gritante quando a linha passou a prometer
continuidade. O traço agora estica com o item.

**Três tropeços de ferramenta, todos registrados porque voltam.**
**Um:** `layoutPositioning = 'ABSOLUTE'` exige pai com auto-layout, `coluna do marcador` não
tem. **Dois:** `layoutSizingVertical = 'FILL'` **falhou em silêncio**, sem erro: filho não pode
preencher o eixo que o pai abraça, e o item abraça na vertical. A saída foi tirar os traços da
coluna e fazê-los filhos absolutos do item, com constraint de esticar. **Três:** os traços
saíram **pretos**, o vínculo com a variável estava certo, mas o literal ficou `#000000` e é o
literal que aparece. Passei a resolver o valor da variável e usá-lo como literal junto com o
vínculo.

**Consequência.** Componente de 9 para **15 variantes**. Quatro telas de case atualizadas nos
dois temas, mais o exemplo em Sistema visual. 40 telas, 1.288 textos, 113 papéis, zero
divergências.

---

## 130 · A trilha é derivada da posição, não acumulada

**28 de setembro de 2026**

**Gatilho.** Ela: *"E está registrado o que acontece ao rolar de volta pra cima? Quero que perca
a cor novamente."*

**Estava registrado, e de um jeito ambíguo.** O cenário *"Nenhuma etapa fica ativa por menos de
meia tela"* terminava com **"E o marcador nunca volta para uma etapa que já deixou"**. Na
decisão 079 aquilo queria dizer *não piscar enquanto se rola para frente*: o próprio `Quando`
do cenário diz *"rola do começo ao fim"*. Mas a frase, lida solta, proíbe voltar.

**O que não estava registrado era o caso dela: rolar de volta.** A pergunta achou um buraco que
a redação disfarçava, pior que um buraco aberto, porque parecia preenchido.

**Decisão.** O estado da trilha é **derivado da posição, não acumulado**. Rolando para cima, as
etapas abaixo voltam a neutro. A trilha responde *onde você está*, não *até onde já chegou*.

**Por que essa é a escolha coerente, e não só a preferida.** A decisão 129 diz que **a cor para
exatamente na bolinha atual**. Guardar o ponto mais longe alcançado faria a cor passar da
bolinha e as duas regras se contradiriam. Pior: daria **dois significados à mesma marca**,
parte da linha dizendo "você está aqui" e parte dizendo "você esteve aqui antes". Derivar da
posição mantém uma leitura só, e de quebra dispensa guardar estado de sessão.

**E alcança o que a pergunta não mencionou.** Sendo derivada, a regra responde sozinha três
casos que nunca foram escritos: **voltar por um item da trilha**, **abrir um link direto para
uma seção no meio**, e **recarregar a página**. Nos três a trilha mostra a etapa de agora.
Chegar ao meio por link pinta metade da trilha sem nada ter sido lido, e está certo, porque a
trilha diz posição, não leitura. **Regra derivada não precisa de um caso por caminho.**

**A frase ambígua foi reescrita** para dizer o que a 079 queria: *"o marcador não pisca entre
duas etapas enquanto a rolagem segue numa direção."*

**Minha própria checagem me pegou no caminho.** Escrevi *"contradizendo a regra acima"* e a
checagem 5: nenhum contrato aponta para uma regra por posição: reprovou o arquivo. Corrigido
nomeando a regra. **A checagem que eu escrevi para os outros funcionou contra mim**, que é a
única prova que ela podia dar de que serve.

**Consequência.** Três cenários novos, um deles cobrindo caminho que nem foi perguntado.
Nenhuma mudança no Figma: é comportamento, e o desenho dos três estados já existe desde a 129.

---

## 131 · O traço do que falta ganha token, e o cálculo mostra que só um tema tinha folga

**28 de setembro de 2026**

**Gatilho.** Na conferência da trilha eu apontei que o trecho ainda não percorrido dá **1,26:1
no claro** contra a página, quase invisível, enquanto o contrato promete que a trilha diz
*"onde a pessoa está e quanto falta"*. Ela: *"cria um token pro traço do que falta"*.

**Antes de escolher valor, medir o espaço.** O traço fica **entre** a página e o trecho já
percorrido, e isso amarra os dois lados: escurecê-lo para aparecer sobre a página aproxima ele
da cor do case, e apaga justamente a fronteira que informa. **O par que manda no valor não é
traço × página; é traço × percorrido.**

**O piso veio de onde já estava.** A fronteira mais fraca de hoje é o laranja sobre o traço, no
claro: **3,21:1**. Adotei esse número como teto de perda: o novo token pode aparecer o quanto
quiser desde que nenhuma fronteira fique pior do que a pior de hoje.

| | traço × página hoje | máximo | quem prende |
|---|---|---|---|
| claro | 1,26 | **1,26** | o laranja `#C2521E` é escuro e já prende |
| escuro | 1,43 | **2,42** | o azul, com folga |

**Decisão. Criado `border/percurso`**: `#DDD6C7` no claro, `#5D5549` no escuro.

**O valor claro ser igual ao de `border` é resultado, não preguiça.** Percorri os fatores de
0,2 a 4 e nenhum melhora a visibilidade sem derrubar a fronteira abaixo de 3,21. **No creme não
cabe.** Registrar isso vale mais do que mexer: da próxima vez que alguém achar o traço apagado
no claro, a resposta já está calculada e a saída conhecida, mudaria o acento do case, não o
traço.

**Por que token novo e não `border`.** São trabalhos diferentes: `border` é divisória (tabela,
célula, separador) ; `border/percurso` responde *quanto falta*. Mantê-los juntos faria um ajuste
de divisória mexer no significado da trilha. Mesma lógica de `border/elevado` e
`line/corpo-largo`: **papel diferente, token diferente.**

**E é o caso que mais justifica ter modo por token.** O claro fica onde estava e o escuro sobe
**1,43 → 2,42**. Um token só, com um valor só, teria de escolher entre travar o escuro no pior
dos dois ou quebrar o claro.

**Consequência.** 62 tokens. Quinze variantes e as quatro trilhas das telas passam a usar o
token novo; nenhum traço ficou em `border`. As fronteiras finais: no claro azul 4,95 e laranja
3,21, as de hoje, intactas; no escuro azul 3,22 e laranja 3,39.

---

## 132 · As tabelas saem da tela estreita

**28 de setembro de 2026**

**Gatilho.** Ela: *"acho que podemos dispensar as tabelas no modo estreito."*

**O inventário já registrava o custo delas.** A regra *"região que rola recebe foco"* existia
**só por causa da tabela no estreito**: *"a tabela em tela estreita precisa ser alcançável pelo
teclado para poder ser rolada; sem isso, metade da comparação fica inacessível a quem não usa o
dedo."* Um mecanismo de acessibilidade inteiro, mantido para uma peça que não cabia.

**Ao levantar, as duas tabelas se mostraram animais diferentes.**

| | cabeçalho no arquivo | o que é |
|---|---|---|
| O que o novo fluxo mudou | `\| \| Fluxo atual \| Novo fluxo \|` | comparação de verdade, 10 linhas |
| O que eu entreguei | `\| \| \| `: **vazio** | cinco pares chave-valor vestidos de tabela |

**Ofereci três caminhos**: empilhar no estreito, empilhar e ainda converter a de entregas nas
duas larguras, ou tirar de vez. **Ela escolheu tirar de vez.**

**Uma correção minha, feita depois da escolha.** A prévia que montei para a terceira opção
sugeria que a prosa do capítulo 3 já dizia *"cinco etapas, contra doze do atual"*. **Era
ilustração minha, não o texto real**: a prosa diz "cinco etapas" e nunca menciona o doze.
Avisei antes de implementar, e o que se perde ficou registrado em **P57**, número por número.

**Decisão.** Marcador novo no vocabulário de conteúdo: **`<!-- só no desktop -->`**, no mesmo
formato do `<!-- privado -->` que já existia. A seção some em tela estreita e continua no
desktop.

**Por que um marcador e não uma regra sobre tabelas.** Regra por tipo de elemento decide pela
forma; marcador decide pelo conteúdo. Amanhã pode haver tabela que caiba, ou outra coisa que não
caiba, e quem sabe é quem escreve o texto, não quem monta a página. **É a mesma lógica de a
trilha vir dos marcadores do arquivo, e não de uma lista à parte.**

**Uma checagem nova, e a razão dela é o silêncio.** Erro de digitação em `<!-- bloco: -->` faz a
construção falhar e alguém percebe. Erro em marcador solto **publica calado o que era para
sumir**: a pior falha possível, porque não se manifesta. A checagem 4 passou a recusar marcador
solto fora da lista conhecida. **Verificada falhando:** com `so no desktop` sem acento, acusa e
o script sai com código 1.

**Consequência.** As duas telas estreitas do Reembolso encolheram **1.089px**, de 11.481 para
10.392: quase um décimo da página. Nenhuma tabela ou aviso de rolagem sobrou no estreito.
40 telas, 1.194 textos, 112 papéis, zero divergências.

**Duas sobras declaradas, que não apaguei por conta própria.** O quadro 05 de *Sistema visual*
ainda demonstra *"REGIÃO QUE ROLA · a tabela no estreito recebe foco"*, e a checagem 8 ainda
isenta nós marcados `rola na horizontal`: **as duas agora sem uso**. São desenho e regra dela;
apagar é decisão, não faxina.

---

## 133 · A lista de etapas ganha tela, e o véu aprende a poupar outro gatilho

**28 de setembro de 2026**

**Gatilho.** Ela: *"revise as telas, falta criarmos alguma tela?"*

**A revisão foi feita pelos cenários, não pela memória.** Levantei todo `Cenário:` dos doze
contratos e cruzei com as 40 telas. **Um estado tinha cenário e não tinha tela:**

> *"Quando a pessoa toca a faixa · Então a lista completa de etapas aparece"*, `case/trilha.md`

As outras três sobreposições (contato no desktop, contato e menu no estreito, tema no desktop)
todas têm tela. Esta só existia como **exemplo em Sistema visual**, e exemplo não é estado: não
tem barra, não tem véu, não tem página atrás.

**O que a revisão confirmou que não falta.** O controle de tema em tela estreita parecia um
buraco, mas o contrato diz *"o controle de tema fica dentro do menu, não na barra"*, e a tela
`Menu aberto` já mostra "Tema claro / Tema escuro" na lista. **Coberto, e coberto por decisão.**

**Um defeito velho, achado pelo caminho.** A varredura da decisão 126 procurava superfícies
flutuantes por nome: `revelado|sobreposição|atalho de salto`. **"lista de etapas" não casava
com nenhum**, e o exemplo da proposta do atalho também não. Os dois seguiam em `border`, e no
escuro o limite deles seria **1,20:1**. Corrigidos. **Varredura por nome erra quando o nome não
foi previsto**: buscar por propriedade, como fiz agora (`fill=bg/surface` com `stroke=border`),
acha o que a lista de nomes não alcança.

**Uma decisão nova, e ela veio de aplicar uma regra que já existia.** A decisão 087 tirou o véu
de cima da barra porque *"dizia 'isto não está disponível' sobre a única coisa que continua
disponível"*. Nesta tela **a faixa é o gatilho**, e o véu a cobria, como cobre nas telas de
menu e contato, onde a faixa é só conteúdo. **Aqui não pode:** velar o gatilho apaga o que fecha
a lista. O véu passou a começar abaixo da faixa, em 108.

**A lista ocupa a largura inteira e nasce colada na faixa**, ao contrário do menu e do contato,
que são caixas com margem. **Ela é a faixa crescendo, não uma caixa nova**, e é isso que
justifica a geometria diferente sem virar exceção arbitrária.

**Consequência.** **42 telas**, 21 estados em dois temas. 1.248 textos, 114 papéis, zero
divergências. O limite da lista sobre a página velada: **3,01 no claro e 3,27 no escuro**.
A peça deixou de ser `@lacuna` no contrato da trilha.

---

## 134 · O que substitui o mockup que a trilha não pode ter

**28 de setembro de 2026**

**Gatilho.** Ela: *"fico preocupada porque não temos os mockups com a trilha funcionando, como
contornar esse problema na hora de desenvolver?"*

**A preocupação está certa e o remédio não é mais mockup.** A trilha é a única peça do site cujo
comportamento **nenhum quadro do Figma pode mostrar**: ela muda com a rolagem, e desenho
congela um instante. Desenhar seis quadros por case por tema daria 24 imagens que ainda assim
não provariam nada sobre o que acontece **entre** elas.

**Mas a regra é aritmética pura.** *"A etapa ativa é a última cujo início já passou de uma linha
a um terço do topo."* Dados os inícios dos capítulos e a altura da janela, a etapa ativa é uma
função, e função se simula sem navegador, sem desenho e sem código de produção.

**Decisão. O mockup é substituído por um oráculo**: `docs/spec/trilha.json` guarda o início de
cada capítulo das quatro telas, e a **checagem 10** percorre a rolagem inteira verificando o
cenário que já estava escrito. Deixa de existir "não temos como saber se está certo": existe uma
tabela de quando cada etapa assume, conferível antes de uma linha de código ser escrita.

**Por que a checagem mora aqui e não num teste de unidade.** Quem quebra este cenário é **quem
escreve texto**, não quem programa: capítulo curto entre dois vizinhos faz a etapa piscar. O
teste de unidade virá e usará o mesmo `trilha.json`: a função `etapaAtiva(rolagem, janela,
inícios)` deve ser isolada no código exatamente para isso, e aí desenho, checagem e implementação
compartilham uma fonte só.

**E ela achou defeito no primeiro uso.** `Case Reembolso · desktop` reprova: **a Introdução fica
ativa por 336px contra o piso de 450**. O cenário está escrito desde a decisão 079 e **nunca
valeu para esse capítulo**: ninguém podia saber, porque nada o executava.

**Um número errado na 079, corrigido aqui.** Ela registra que com a linha de um terço a
Introdução *"fica ativa por 760px"*. São **336**: a distância entre dois inícios de capítulo,
que não depende da janela. Sob a regra antiga eram 400px: **para este capítulo, a regra nova é
pior que a que substituiu.** A decisão de trocar a regra continua defensável pela distribuição
geral; o número que a justificava, não. Virou **P58**.

**A suíte fica vermelha até ela decidir**, e isso é deliberado. Esconder um defeito verdadeiro
para manter o placar verde é o oposto do que estas checagens existem para fazer.

**O que o oráculo ainda não cobre, dito em voz alta.** A transição entre etapas (se anima, e o
que acontece com movimento reduzido) segue em aberto na P11. E a pintura dos três estados não
precisa de simulação: ela é derivada do índice ativo, e as **15 variantes do componente** já
mostram todo estado que um item pode ter.

---

## 135 · A etapa dura o capítulo dela, e o cenário media a coisa errada

**28 de setembro de 2026**

**Gatilho.** *"resolve a p58"*: a checagem 10 reprovava `Case Reembolso · desktop`: a Introdução
ficava ativa por 336px contra o piso de 450.

**As três opções da pergunta partiam da mesma leitura errada.** Crescer o capítulo, dar
permanência mínima à trilha, ou baixar o piso: as três tratavam como defeito da trilha. Antes
de escolher, fiz a conta:

```
etapa k    assume em  inicio[k]   − janela/3
etapa k+1  assume em  inicio[k+1] − janela/3
logo dura             inicio[k+1] − inicio[k]      ← a janela CANCELA
```

**A etapa fica ativa exatamente enquanto o capítulo dela é o que está sendo lido.** Conferi nas
quatro telas, capítulo por capítulo: bate ao pixel em todos. E a duração **não depende do
tamanho da janela**: o mesmo case distribui igual em qualquer monitor.

**Isso reclassifica o problema inteiro.** O cenário *"nenhuma etapa fica ativa por menos de meia
tela"* nunca falou sobre a trilha: ele media **comprimento de capítulo**, com outro nome. É
regra de conteúdo vestida de regra de comportamento, e por isso ninguém percebia que quem a
quebra é quem escreve texto.

**Decisão.** O cenário vira o invariante verdadeiro: *"a etapa dura exatamente o capítulo dela"*,
mais um segundo cenário dizendo que capítulo curto demais é defeito do capítulo. A checagem 10
mudou de título: **"nenhum capítulo é curto demais para virar etapa"**, e passou a reportar o
capítulo mais curto de cada tela, passando ou não.

**Baixei um piso, e isso merece desconfiança, então aqui está a justificativa.** De meia tela
para um terço. Afrouxar limite para calar alarme é o movimento suspeito por excelência. Duas
razões: **a meia tela veio de um número errado**, a decisão 079 registrou 760px onde a regra dá
336, e **um terço é a única constante que o mecanismo já tem**, a posição da linha de troca.
Etapa que dura menos que a distância entre o topo e a linha nunca chega a se assentar.

**Correção da decisão 079, que segue de pé no essencial.** O número 760 estava errado; a escolha
de trocar a regra continua certa, mas por outro motivo do que o registrado. O motivo bom não era
"dá mais tempo à Introdução": é que **a duração passa a ser do capítulo, e não da comparação
com o vizinho**. A regra antiga fazia a mesma página distribuir diferente em telas diferentes.

**O que fica para ela, e não é mais defeito de sistema.** A Introdução do Reembolso tem **240px
no desktop**, contra 420 do próximo capítulo mais curto do site inteiro. É o único abaixo de 420,
e ao lado de um vizinho de 1.601px. Passa na checagem com 0,37 tela. **Crescer ou não é decisão
de conteúdo dela**: registrada, não pendente.

**Consequência.** Suíte verde de novo, e verde por ter entendido o problema, não por tê-lo
escondido. 14 perguntas em aberto, nenhuma travando.

---

## 136 · O vazio no fim das telas, e por que só as de case não tinham

**28 de setembro de 2026**

**Gatilho.** Ela apontou `Trabalhos · tela estreita` (`101:34`): *"por que tem esse espaço vazio
ao final da rolagem da tela?"*

**Eram 470px**: o conteúdo terminava em 1.134 e o quadro ia até 1.604. E a varredura mostrou
que não era caso isolado: **nove das vinte e uma telas** estavam fora da margem.

| tela | sobra | esperado |
|---|---|---|
| Trabalhos · estreita | **470** | 64 |
| Tema revelado · desktop | 170 | 96 |
| Erro · desktop | 160 | 96 |
| Contato revelado · desktop | 125 | 96 |
| Quem sou eu · estreita | 96 | 64 |
| Erro · estreita | 96 | 64 |
| Trabalhos · desktop | 98 | 96 |
| Extra aberto · desktop e estreita | **0** | 96 / 64 |

**A causa é a diferença de método, e ela é a parte que interessa.** As quatro telas de case
saem certas sempre porque **são reempilhadas por código** a cada mudança: o laço calcula o fim
e redimensiona. Trabalhos, Quem sou eu e Erro **nunca passaram por isso**: a altura foi posta à
mão uma vez e ficou. Quando o conteúdo encolheu, o quadro não acompanhou.

**Por que ninguém tinha visto.** Vazio no fim não quebra nada. Não aparece na conferência de
cor, nem na de corte, nem na de papel, nem na de contraste. **Só aparece quando alguém rola até
embaixo**, que é exatamente o que ela fez.

**Decisão.** Toda tela termina **uma margem depois do conteúdo**: 96 no desktop, 64 no
estreito. Dezoito quadros ajustados, contando os gêmeos escuros.

**Duas escolhas dentro disso.** A anotação do wireframe (faixa da nota, limite e nota) **não
conta como conteúdo**: ela documenta a tela, não faz parte dela, e por isso acompanha o novo fim
em vez de definir onde ele fica. E as duas telas de `Extra aberto`, que abraçavam a banda com
sobra zero, **ganharam margem** em vez de virar exceção: uma regra sem exceção vale mais do que
dois pixels de economia.

**Isento continua quem declara.** Quadro marcado `· recorte` mostra uma janela sobre uma página
maior: o conteúdo passa do fim de propósito. Mesma isenção da checagem 8, mesmo lugar: o nome.

**Checagem 11**, com `docs/spec/telas.json`. **Verificada falhando:** devolvi a altura 1.604 ao
Trabalhos estreito e ela acusou `sobra 470px, esperado 64 (vazio a mais)`. Restaurada, passa.

**Consequência.** Onze checagens. Dezesseis telas conferidas, cinco recortes isentos. E fica
registrado o padrão que gerou o defeito: **o que é reempilhado por código não erra; o que foi
dimensionado à mão erra em silêncio.**

---

## 137 · Voltar ao topo: a última peça da moldura, declarada em cinco lugares e desenhada em nenhum

**28 de setembro de 2026**

**Gatilho.** Ela: *"e o botão para voltar ao topo, não criamos?"*

**Não. E o buraco era maior do que uma tela faltando.** A peça está declarada nas definições
(*"discreto, flutuante no canto inferior direito, aparecendo só depois que a rolagem começa"*),
na lista de escopo, no domínio moldura, no event storming, no PRD e na tarefa T007 da spec.
**Não tinha contrato, componente, tela, nem pergunta em aberto.** Era o único item da moldura
nessa situação: o atalho de salto, que estava no mesmo estado, ao menos tinha a P48.

**Por que passou batido.** Ela nunca virou pergunta, e pergunta é o mecanismo que este projeto
usa para lembrar do que falta. **O que não vira pergunta não é cobrado por nada**: as onze
checagens conferem o que existe, não o que foi prometido.

**Um conflito entre duas coisas escritas por ela.** As definições dizem **botão**; as decisões
047, 052 e 055 reduziram o botão a um só, e a 118 decidiu o caso análogo com todas as letras:
*"é link, não botão, 'Falar comigo' segue sendo o único botão do site; este move a pessoa
dentro da própria página"*. Levei as três formas possíveis a ela. **Escolheu a pastilha
flutuante, só palavra.**

**A casca não foi inventada: é a do atalho de salto.** Os dois flutuam sobre o conteúdo e os
dois movem a pessoa dentro da página, um para o começo do texto, outro para o começo da
página. Casca igual para trabalho igual poupa uma forma nova e **já vem com o limite conferido**:
3,60 no claro e 3,00 no escuro, pela borda.

**Sem ícone, e isso é decisão.** O site não tem vocabulário de ícone nenhum: os únicos glifos
são o ✓ do tema e a seta da aba retrátil. Estrear um ícone aqui obrigaria a desenhar um conjunto
inteiro para uma peça só.

**A regra do "acionar leva o foco" veio de graça da 118.** Um voltar ao topo que só rola deixa o
foco no meio da página: a pessoa vê o começo, aperta Tab e continua de onde estava. O retorno
teria sido visual e não de navegação: exatamente o erro que a 118 registrou para o atalho.

**Uma consequência que dispensou regra própria.** *"Não aparece em página que não rola"* não
precisou ser decidido: home e erro cabem numa tela, então nunca passam de uma tela de rolagem.
A regra do gatilho já responde.

**Consequência.** Componente `356:120`, contrato `moldura/voltar-ao-topo.md` com sete cenários,
e **46 telas**, 23 estados em dois temas. O inventário vai a **quinze** componentes, e
`docs/comportamento/README.md` deixa de dizer que a pasta `moldura/` está vazia. 1.394 textos,
115 papéis, zero divergências.

---

## 138 · Movimento reduzido: a tensão da P11 não existia

**28 de setembro de 2026**

**Gatilho.** *"resolve a p11"*: *"tensão entre duas regras: o marcador se move sozinho, e nada
se move sem o leitor pedir."* Ela tinha ficado um mês em aberto e **duas peças já a citavam**.

**A tensão era falsa.** *"Nada se move sem o leitor pedir"* fala de **movimento autônomo**:
carrossel que gira, parallax, vídeo que toca sozinho. **O marcador da trilha se move porque a
pessoa rolou.** É resposta a gesto, não movimento próprio. Das três opções escritas na pergunta,
a terceira: *"a regra não se aplica a indicador de posição"*: estava certa desde o começo.

**E a decisão 130 já tinha fechado metade sem perceber.** Ao dizer que o estado da trilha é
**derivado da posição, não acumulado**, ela tornou o marcador uma função da rolagem. Função não
tem transição: o valor é o que é, a cada instante. **Não há o que `prefers-reduced-motion`
desligar, porque não há nada ligado.**

**Mas a pergunta estava mal escrita, não errada.** Ela perguntava sobre a trilha; a questão
verdadeira é do site inteiro, o que anima, e o que a preferência do sistema muda. Respondê-la
para uma peça só deixaria as outras sete sem resposta.

**Decisão. Três categorias, e só uma tem o que desligar:**

| | o que é | movimento reduzido muda? |
|---|---|---|
| **Derivado da rolagem** | marcador e traço da trilha, barra da faixa | **não**, não há transição |
| **A pessoa aciona e a página se move** | atalho de salto, voltar ao topo, item da trilha | **sim**: salta em vez de rolar suave |
| **Algo aparece ou some** | sobreposições, pastilha, aba retrátil | **não**, nunca tem transição |

**Por que a terceira categoria nunca anima, nem para quem não desligou nada.** A decisão 087 diz
que **a caixa aberta é o próprio sinal de que abriu**. Animar a entrada atrasa o sinal: paga em
clareza para comprar suavidade, no momento em que a pessoa está esperando resposta.

**Um token que o sistema não vai ter, e a ausência é decisão.** Nenhuma das três categorias
precisa de duração: a primeira não tem transição, a terceira também não, e a segunda usa a
rolagem do navegador. **Sistema de design que não precisa de token de duração é raro o bastante
para valer registro**, se um aparecer amanhã, é sinal de que alguém está animando algo que as
três categorias não previram.

**Consequência.** Regra em `docs/design-system.md`, entre as que atravessam todas as peças.
**Os dois `@lacuna` viraram cinco cenários**: dois na trilha, dois no voltar ao topo, um no
atalho de salto, que tinha o mesmo buraco e não citava a pergunta. Restam duas lacunas no
projeto, ambas com pergunta viva. 13 perguntas em aberto.

---

## 139 · A pastilha tinha a silhueta do botão, e nenhum raio vinha de token

**28 de setembro de 2026**

**Gatilho.** Ela, olhando o voltar ao topo recém-criado: *"essa é a aparência do botão?"*

**Era, e esse é o defeito.** Eu dei à pastilha `cornerRadius = 999`: a pílula, e anotei no
código *"a forma que o botão já usa"*, como se fosse virtude. Com fundo claro, contorno de 1px e
canto de pílula, ela reconstruiu **exatamente o botão de contorno que a decisão 093 removeu do
site**. O inventário diz, na regra do botão: *"não existe contorno, botão é a ação principal da
página e o site nunca tem duas"*.

**A regra não foi violada na letra e foi na forma.** A peça não é um botão e não se comporta como
um; mas quem olha não lê comportamento, lê silhueta. **Respeitar a regra e reconstruir a coisa
que ela proíbe é pior do que quebrá-la**, porque não deixa rastro em lugar nenhum.

**Decisão.** Toda superfície que flutua usa **`radius/bloco`**. Sobreposição, menu, caixa de
tema, lista de etapas, atalho de salto e voltar ao topo passam a compartilhar a mesma forma. A
pílula fica reservada ao botão, que é o único que a tem.

**E o atalho de salto estava na família errada.** Usava raio 8, que é `radius/card`: a forma do
card de case. Corrigido para `radius/bloco` junto, inclusive na proposta desenhada no quadro 05.

**A pergunta dela destapou algo maior: nenhum raio do arquivo vinha de token.** Os quatro
`radius/*` existiam desde o começo (0, 8, 10, 999) e **nenhum componente os usava**. Os números
batiam **por coincidência de digitação**. Um ajuste no token não teria mudado nada em lugar
nenhum, e ninguém descobriria até tentar.

**24 nós vinculados**: 14 nos componentes, 10 nas sobreposições desenhadas direto nas telas.
Resta um raio solto: o do **anel de foco**, e ele fica solto de propósito, é derivado do alvo
que contorna, não um valor próprio.

**O que isso ensina sobre as checagens que existem.** A checagem 7 pergunta *"toda cor vem de
variável?"* e por isso a paleta está inteira vinculada. **Não havia a pergunta equivalente para
raio**, e por isso nenhum raio estava. A cobertura das checagens desenhou onde o sistema é firme
e onde ele só parece firme.

**Consequência.** Regra em `docs/design-system.md` e nos dois contratos de moldura. Nenhuma
mudança visual além da pastilha e do atalho: os outros vínculos amarraram valores que já
estavam certos.

---

## 140 · A pastilha fica sólida, e a família estava com uma peça faltando

**28 de setembro de 2026**

**Gatilho.** Ela: *"tô achando esse botão muito feio, principalmente no modo claro, o que podemos
fazer para melhorar essa aparência?"*

**O diagnóstico separou gosto de defeito, e havia defeito.**

| | sobreposição | atalho de salto | voltar ao topo |
|---|---|---|---|
| sombra | **24px, 12%** | **nenhuma** | **nenhuma** |

**As duas peças que faltavam sombra são as duas que eu criei.** A família se define por
preenchimento, contorno e sombra, e eu entreguei duas com dois terços. Sem sombra a peça não
flutua: fica colada, e "colado" é metade do que ela chamou de feio.

**E o claro sofria por uma razão de sistema.** `bg/surface` no claro é **branco puro** sobre uma
página **creme**: 1,15:1. A sobreposição escapa disso porque aparece **sobre o véu**, que
escurece a volta e faz o branco ler como elevação. **A pastilha não tem véu:** fica direto sobre
o texto, e aí o contorno precisa carregar o limite sozinho a 3,60:1. Traço forte em volta de
mancha branca fria numa página quente: é isso que ela viu.

**Decisão dela: sólida, sem contorno.** Preenchida em `text/primary`, rótulo em `bg/surface`,
canto `radius/bloco`, com a sombra da família. **O limite passa a vir do preenchimento**
(14,25:1 no claro e 15:1 no escuro) e o traço, que era o problema, deixa de existir.

**O risco que ela aceitou, e o que fiz para ele não cobrar.** Sólida e escura, a pastilha se
aproxima do botão. Restam três diferenças de forma (canto 10 contra pílula, corpo 48 contra 62,
rótulo 15 contra 18) , e diferença de forma é frágil quando as duas aparecem juntas. **Então
elas não aparecem:** a regra passou de *"não cobre o convite ao contato"* para **"some quando o
convite ao contato entra na tela"**. A distinção deixa de precisar se sustentar sozinha, porque
nunca é posta à prova.

**A sombra do atalho de salto foi corrigida junto**, inclusive na proposta do quadro 05. Ele
mantém contorno e superfície: aparece sozinho, no topo, e só com foco, nunca convive com texto
corrido como a pastilha.

**O que a pergunta dela ensinou sobre o processo.** Eu tinha auditado essa peça por contraste,
por raio, por token e por gêmea escura, e **passou em tudo**. Nenhuma checagem pergunta se algo
é bonito, e nenhuma perguntaria se a família está completa: a sombra faltando não quebrava
nada. **Ela viu em dois segundos o que onze checagens não veem.**

---

## 141 · A sombra sai da pastilha, e descobre-se que ela só funciona num tema

**28 de setembro de 2026**

**Gatilho.** Ela, depois de a pastilha ficar sólida: *"com sombra fica melhor?"*

**Montei as quatro versões lado a lado em vez de opinar** (com e sem sombra, nos dois temas) e
medi o que a sombra produz sobre a página:

| | página | página sob a sombra | contraste |
|---|---|---|---|
| claro | `#F4EFE4` | `#D7D2C9` | **1,31** |
| escuro | `#1A1715` | `#171412` | **1,03** |

**Não fica melhor.** No claro a sombra vira um borrão escuro sob uma peça escura: o mesmo tom
embaçando a própria borda da peça. No escuro ela **não existe**: sombra preta sobre página quase
preta rende 1,03:1.

**A razão é anterior ao gosto.** Sombra diz *"isto está por cima"* para quem o preenchimento não
diz. A sobreposição e o atalho de salto usam `bg/surface`, que rende **1,15:1** contra a página
no claro, eles precisam. A pastilha sólida rende **14,25:1**: já está dito, e dizer duas vezes
suja.

**Eu tinha posto a sombra pelo motivo errado.** Na decisão 140 acrescentei a sombra porque *"a
família tem três propriedades"*, e naquele momento a peça era branca com contorno, onde a
sombra realmente trabalhava. **Quando ela virou sólida na mesma decisão, a sombra deixou de ter
função e eu a mantive por inércia**, carregando uma regra que a mudança tinha acabado de
invalidar.

**Decisão.** A pastilha perde a sombra. A regra que fica é melhor que uma lista: **sombra é para
quem não se separa pelo preenchimento.** Sobreposição e atalho de salto mantêm; pastilha e card
de case, não.

**E um fato de sistema que apareceu de brinde:** **a sombra é um recurso do tema claro, só.** No
escuro ela nunca vai render mais que 1,03, lá quem levanta uma superfície é o contorno. Vale
lembrar antes de contar com sombra para alguma coisa; a sobreposição no escuro se sustenta pelo
`border/elevado`, não pela sombra que também tem.

**Consequência.** Duas perguntas curtas dela: *"essa é a aparência do botão?"* e *"com sombra
fica melhor?"*: produziram a correção de um raio errado, o vínculo de 24 raios que não vinham
de token, a sombra faltando em duas peças, a forma sólida, e agora a regra de quando sombra se
aplica. **Nenhuma das onze checagens teria achado qualquer uma delas.**

---

## 142 · O canto da pastilha era resto da forma anterior

**28 de setembro de 2026**

**Gatilho.** Ela: *"por que esse botão tem arredondamento diferente do botão de fale comigo?"*

**Porque eu deixei um resto para trás, e é o mesmo erro da sombra, duas vezes seguidas.**

Quando a pastilha era **branca com contorno**, ela pertencia à família das **superfícies**
(sobreposição, menu, lista de etapas) e `radius/bloco` era o raio certo dessa família. Quando ela
virou **sólida**, saiu dessa família e entrou na do botão. **E levou o raio da anterior junto.**
Mudei o preenchimento e não re-derivei o resto, exatamente como tinha feito com a sombra na 141.

**E o motivo que escrevi na hora não se sustentava.** Registrei que *"o canto é o que separa as
duas"*, e, na mesma decisão, criei a regra que faz a pastilha **sumir quando o convite ao
contato entra na tela**. Se elas nunca dividem a tela, **o canto não tem nada para separar**.
Sobrava uma segunda linguagem de arredondamento para o mesmo tratamento, sem trabalho nenhum.

**Conferido, não suposto.** Simulei as dez páginas que têm botão ou rolagem suficiente. Só os
quatro cases têm as duas peças, e na página de Finanças a pastilha some na rolagem **5105**
enquanto o botão só aparece em **5173**: **68px de folga**. Nunca coexistem.

**Decisão.** A pastilha passa a usar `radius/pilula`. **O canto passa a dizer de que família a
peça é:** sólido escuro é pílula; superfície com contorno é `radius/bloco`. Duas famílias, dois
cantos, nenhuma exceção.

**O que distingue as duas formas sólidas é o tamanho** (48 contra 62 de altura, 15 contra 18 de
rótulo) e isso é hierarquia legível, não um código que alguém precise aprender.

**O padrão que estas três perguntas dela expuseram.** Em 140 mudei o preenchimento e mantive a
sombra da forma antiga. Em 142, mudei o preenchimento e mantive o canto da forma antiga. **Mudar
uma propriedade estrutural obriga a revisar todas as outras**, e eu revisei nenhuma das duas
vezes. Fica registrado como regra de processo, não como lamento: **quando o preenchimento de uma
peça muda, o canto, a borda e a sombra têm de ser re-derivados junto**, nenhum deles é
independente do preenchimento, porque todos existem para separar a peça do fundo.

---

## 143 · O design system estava desatualizado, e a auditoria achou um componente quebrado

**28 de setembro de 2026**

**Gatilho.** Ela: *"o design system tá atualizado?"*

**Não estava.** Conferi cada número que o documento afirma contra o estado real:

| o documento dizia | era |
|---|---|
| "As dez peças" | **17 componentes**, 15 itens de inventário |
| "Nove checagens" | **onze** |
| "Tipografia · oito níveis" | oito pares mais `line/corpo-largo`: **18 variáveis** |
| "trilha / item · estado: ativo, inativo" | **15 variantes**, marcador × posição |
| "Atalho de salto · não está em contrato nenhum" | tem contrato, componente e duas telas |
| "o anel de foco usa `text/primary` até lá" | usa `accent/estado/strong` desde a 084 |
| "As telas ainda não usam os componentes" | **dez das dezessete** já são usadas |

**E a auditoria travou num erro de verdade.** Ao ler as propriedades dos conjuntos, o Figma
recusou: *"Component set has existing errors"*. O **botão** tinha **duas variantes com o mesmo
nome**: `largura=desktop` as duas. A estreita estava batizada de desktop, e o conjunto inteiro
ficava ilegível por causa disso.

**Errei ao consertar, e o erro é instrutivo.** Ordenei por altura para achar a menor: **as duas
têm 62**. Chutei errado e inverti os nomes. O que distingue não é altura: é o respiro lateral,
a do desktop abraça o rótulo com 32 de cada lado, a do estreito tem **padding zero** porque
ocupa a coluna de 327 inteira. **Conferi contra as telas** antes de dar por feito, e as sete
instâncias agora batem com a largura da própria tela.

**Nenhuma checagem pegaria isso**, e vale dizer por quê: as onze leem **exports**,
`tokens.json`, `papeis.json`, `telas.json`, `cortes.json`. Nome de variante nunca foi exportado,
então nunca foi conferido. **A cobertura das checagens é do que se exporta, não do arquivo.**

**Uma sobra recolhida.** O componente `atalho de salto` estava **solto na página**, fora do
quadro 07, desde que foi criado: eu tinha notado e deixado passar. Agora mora com os outros
dezesseis.

**Consequência.** Documento reescrito em cinco pontos, com a tabela de peças trazendo agora
**quantas instâncias cada uma tem nas telas**: número que torna visível, sem prosa, quais
peças ainda são cópia.

---

## 144 · Cinco das sete peças viram instância, e a primeira era um componente fantasma

**28 de setembro de 2026**

**Gatilho.** *"troca essas sete por instâncias"*: a decisão 0.3 sendo exercida por ela.

**A primeira não era o que eu tinha dito.** `barra / item` aparecia com zero instâncias, e eu
tinha relatado isso como "ainda desenhado por cópia". **Era outra coisa:** as 42 barras das telas
apontavam para um **conjunto órfão** (`195:98`) que não está em página nenhuma, um componente
antigo que sobreviveu porque instâncias o mantêm vivo. O `barra fixa` do quadro 07, construído
com `barra / item` dentro, tinha **zero uso**. Religadas as 42, `barra / item` saltou de 0 para
**94**.

**O que foi trocado, e o que cada troca custou:**

| peça | instâncias | o que exigiu |
|---|---|---|
| `barra / item` | **94** | religar 42 barras ao componente vivo |
| `tira de destaques / item` | **40** | nada: estrutura idêntica |
| `marcador de falta` | **22** + 16 aninhados | nada; 4 dentro do componente de card |
| `mídia com legenda` | **16** | **variante nova de largura**: o componente tinha uma altura só, e as estreitas cresceram 63px cada até ganhar a sua |
| `tabela / linha` | **28** | **duas variantes novas**: `colunas=2` para a tabela de entregas, e largura de coluna na medida real |

**Duas não dão, e o impedimento é o mesmo nas duas: instância não aceita override de
geometria.** Descobri isso ao tentar, a largura da célula de tabela era **recusada em
silêncio**, sem erro.

- **`marca-texto`**: o realce é um retângulo atrás do texto e sua largura **muda a cada uso**,
  922 na home, 562, 327, 199 nos heroes. Não existe medida única.
- **`sobreposição / caixa`**: precisa de número variável de linhas, e instância não aceita filho
  novo. Já era conhecido, e é a razão de a checagem 6 existir.

**A tabela só coube porque as tabelas encolheram de escopo.** Fixei as colunas em 507/253/253 e
254/785: medidas absolutas, que normalmente seriam um erro num componente. **São defensáveis
porque a tabela existe numa largura só** desde a decisão 132, que a tirou da tela estreita. Uma
decisão de conteúdo tomada há duas horas é o que tornou esta possível.

**Verificação.** 46 telas, margens todas certas, gêmeas claras e escuras com alturas idênticas,
**112 papéis e zero divergências**. As duas telas estreitas de case encolheram 18px: efeito de
o marcador de falta virar instância com altura própria.

---

## 145 · A anotação do wireframe não muda de tema, e duas telas minhas mudavam

**28 de setembro de 2026**

**Gatilho.** Conferência das 46 telas depois da troca por instâncias. Estrutura limpa (zero
diferenças entre clara e escura fora o alfa do véu, margens todas certas) , mas a varredura
acusou **cor sem variável em dez telas**.

**Não era defeito: era o cromo de anotação**, isento da checagem 7 porque o nome termina em
`· anotação`. A faixa é branca e a linha `#E0E0E0`, os dois sem vínculo, **de propósito**.

**Mas duas telas minhas fugiam da convenção.** Ao criar as do voltar ao topo eu usei
`bg/subtle` e `border`, vinculados, então **a anotação delas virava escura no tema escuro**,
enquanto as outras cinco ficavam brancas nos dois. Nunca tinha comparado uma família com a
outra.

**A convenção existente é a certa, e agora está dita.** A anotação **fala sobre o desenho, não
faz parte dele**. Cromo que acompanha o tema se disfarça de produto; cromo que fica branco
sempre se anuncia como andaime. Era o que as cinco primeiras já faziam, por decisão de quem as
montou, e eu quebrei sem perceber ao criar as novas.

**Consequência.** Quatro telas alinhadas. **As sete telas com anotação usam o mesmo cromo**, e a
razão de ele não vir de token deixa de parecer esquecimento.

---

## 146 · O design system atualizado, e onze endereços que apontavam para o nada

**28 de setembro de 2026**

**Gatilho.** *"atualiza o design system com essas mudanças"*, depois da troca por instâncias.

**O que entrou no documento.** A contagem de tokens por coleção: **62: 24 de Cor, 18 de
Tipografia, 17 de Espaço e forma, 3 de Grade**. A tabela de peças com **quantas instâncias cada
uma tem**, e as duas que não podem virar instância com o motivo técnico. A regra do cromo de
anotação (145). E a seção de armadilhas, que cresceu de **uma para oito**.

**As oito armadilhas têm uma coisa em comum, e é ela que as torna caras:** nenhuma dá erro. O
arquivo fica errado e parece certo. `resize` desligando o auto-ajuste, instância recusando
geometria em silêncio, componente órfão vivendo por causa das instâncias, duas variantes com o
mesmo nome, `FILL` que não funciona sob pai que abraça, cor vinculada desenhando o literal
errado, `x` mentindo sob rotação, hexadecimal descartando alfa. **Todas custaram tempo neste
projeto, e todas voltariam.**

**E ao conferir o documento contra o Figma, achei onze endereços apontando para o nada.** Dos
**59 citados na documentação**, dez estavam mortos e um era órfão:

| onde | endereço | era |
|---|---|---|
| inventário | `174:21`, `174:30`, `174:35` | barra fixa, marca-texto, faixa de progresso |
| inventário | `101:8` | card de case: **órfão**, existe fora de página |
| página de case | `107:36`, `114:27`, `115:76` | capítulo e o bloco que virou "as provas do case" |
| botão de contato | `146:63`, `148:203` | as duas instâncias do botão |
| spec/README | `37:88`, `38:105` | os dois quadros de demonstração |

**Por que morreram.** **Recriar um componente muda o id.** A barra, o card, a faixa e o
marca-texto ganharam id novo quando viraram componentes de verdade, e a documentação continuou
citando o antigo. Dois endereços ficaram velhos por outra razão: o bloco mudou de **nome** na
decisão 110, de "convite ao repositório" para "as provas do case", e ninguém reconferiu o id.

**Checagem 12**, e ela precisou de uma forma diferente das outras. Só o Figma sabe se um id
existe, então **a resolução acontece lá dentro** e o resultado é exportado; a checagem confere o
resultado **e** que o número de endereços citados não mudou desde o export: senão alguém
acrescenta uma citação nova e ela passa sem ser conferida. **Verificada falhando:** devolvi
`174:21` ao inventário e ela acusou as duas coisas, o endereço morto e a contagem defasada.

**Consequência.** Doze checagens. 55 endereços citados, todos vivos e em página. E o documento
deixou de afirmar um único número que eu não tenha conferido contra o arquivo.

---

## 147 · O voltar ao topo sai da tela estreita

**28 de setembro de 2026**

**Gatilho.** Ela: *"quero dispensar o botão de voltar ao topo na tela estreita."*

**A razão está visível na tela de estado que eu tinha acabado de montar.** No desktop a pastilha
cai na **margem vazia à direita** e não cobre nada. Na estreita a coluna de leitura ocupa a
largura toda, e a pastilha flutua **em cima do texto**: na captura ela tapa o fim de uma linha
do parágrafo. É a mesma peça em dois contextos diferentes, e só um deles tem lugar sobrando.

**Levantei a consideração contrária antes de fazer, e ela não muda a decisão.** As páginas
estreitas são **as mais longas do site**: 10.374px contra 7.970 do desktop, então é onde a
volta ao topo pouparia mais rolagem. O iPhone tem o toque na barra de status; Android e Chrome
não têm equivalente universal. **Ela decidiu com isso na mesa.**

**Consequência.** As duas telas de estado da largura estreita saíram: **44 telas**, 22 estados
em dois temas. O contrato ganhou a regra e um cenário: *"em tela estreita ela não existe"*: em
vez de a ausência ficar implícita. O componente passa a ter **uma instância só**.

**A checagem 12 acusou na hora**, e é a primeira vez que uma checagem pega uma mudança minha no
mesmo minuto: *"a documentação cita 54 endereços, e o export conferiu 55, reexporte"*. O
endereço da tela removida ainda estava no contrato. **Era exatamente o caso que ela foi escrita
para pegar**, dois passos depois de existir.

---

## 148 · A pastilha volta para 32 das bordas

**28 de setembro de 2026**

**Gatilho.** Na conferência da tela do voltar ao topo eu reportei que a pastilha estava a **34**
das bordas, e não aos 32 que o contrato manda. Ela: *"corrige os 34 pra 32."*

**A causa é deriva de duas decisões atrás.** A pastilha foi posicionada quando media **143 de
largura**: superfície clara com contorno de 1px de cada lado. Quando virou sólida na decisão
140, o contorno saiu e ela encolheu para **141**. A posição, que eu tinha escrito em coordenada
absoluta, ficou onde estava: os 32 viraram 34 nos dois eixos.

**É o mesmo padrão da 142, e agora com a terceira ocorrência.** Mudei o preenchimento e não
re-derivei o resto: na 141 sobrou a sombra, na 142 sobrou o canto, aqui sobrou a posição.
**Posicionar por coordenada absoluta guarda o tamanho de ontem**: calcular a partir da borda,
como fiz agora, não guarda.

**Consequência.** 32 nos dois eixos, nas duas gêmeas, que seguem com zero diferenças entre si.

**Uma medida vizinha, conferida e correta:** o atalho de salto fica a 80 da esquerda no desktop
e 24 na estreita, que é a margem da página em cada largura. Ele acompanha a margem do conteúdo
porque nasce no fluxo do texto; a pastilha usa 32 porque flutua sobre a margem vazia. **Dois
números diferentes com razões diferentes, e não é deriva.**

---

## 149 · A barra fica por cima quando o conteúdo passa por baixo dela

**28 de setembro de 2026**

**Gatilho.** Conferindo a tela do voltar ao topo, notei que `barra fixa` **não era o primeiro
filho**, e é em todas as outras telas de recorte. Tratei como desvio e corrigi.

**A correção estava errada, e a captura mostrou na hora.** No Figma o primeiro filho fica
**atrás**. Nesta tela o capítulo começa em **y = −220**: ela mostra a página **no meio da
rolagem**, então o conteúdo cruza a faixa dos 64 onde a barra vive. Com a barra em primeiro, o
texto passou a ser desenhado **por cima dela**.

**Por que as outras telas podem ter a barra em primeiro.** Nelas o conteúdo nasce em y = 160,
abaixo da barra, nunca se cruzam, e a ordem não faz diferença. **A regra não é "barra em
primeiro": é "barra acima do que passa por baixo dela"**, que é o que uma barra fixa faz de
verdade. Nas telas do topo as duas ordens dão o mesmo resultado, e foi por isso que a diferença
pareceu desvio.

**A conferência é que estava mal formulada.** Eu comparava `children[0].name === 'barra fixa'`:
uma regra de posição na lista, do tipo que a checagem 5 recusa nos contratos por apontar por
posição em vez de por papel. Aplicada ao Figma, o erro é o mesmo.

**Consequência.** Ordem devolvida: capítulo, trilha, barra, pastilha, anotação. As duas gêmeas
com **zero diferenças, agora incluindo a ordem dos filhos**: a comparação passou a preservar a
ordem real em vez de ordenar por posição vertical, que era outro jeito de não enxergar isto.
Pastilha a 32 das duas bordas.

---

## 150 · O 33 era meu, e duas regras que ela enunciou trabalhando

**29 de setembro de 2026**

**Gatilho.** Revisão da lacuna de mídia do capítulo 2 do Reembolso: a avaliação heurística. Ao
listar o que o material tem, apareceu que o site dizia **32** num lugar e **33** em outro. Ela:
*"vamos padronizar para 33, é só um erro de contagem."*

**Fui contar antes, e o erro era meu.** O **32** aparece duas vezes, as duas escritas por ela: na
tira de destaques do case e no cabeçalho da própria avaliação no Figma, *"32 telas reais do
fluxo (iPhone)"*. O **33** aparece uma vez, **no bloco de provas que eu escrevi**. Padronizar em
33 teria propagado invenção minha para dentro do arquivo dela.

**E a decisão 111 também está errada num ponto.** Registrei lá que o arquivo do Reembolso tem um
frame *"Telas reais do fluxo atual"* com 33 capturas. **Esse frame não existe.** O mapeamento
vive em página própria: `mapeamento do fluxo atual`, com **17 seções numeradas de 0 a 16** e
38 nós de imagem. O arquivo tem **cinco páginas**, não uma: apresentação, mapeamento, wireframes,
design system e mockups. **Eu descrevi o arquivo de memória de uma visita, e a memória errou em
duas coisas ao mesmo tempo.**

**Consequência.** A linha do Figma no bloco de provas passa a dizer o que o arquivo tem: *"A
avaliação das 32 telas, o fluxo atual mapeado etapa a etapa, e o redesenho em wireframe e
mockup"*. Corrigida nas quatro telas e em `materiais-a-produzir.md`.

**Duas regras que ela enunciou no meio do trabalho, e que valem além desta lacuna:**

**Telas reais de produto de terceiro não vão para o portfólio.** O FigJam tem a avaliação
anotada sobre as capturas do app da SulAmérica, e seria a imagem mais direta possível para o
capítulo 2. **Fica fora.** A consequência é que este case prova o diagnóstico por dado: a
tabela, não por captura.

**O texto pode prometer além da imagem.** O capítulo 2 diz *"amarrando cada problema ao lugar
exato onde acontece"*, e a tabela não mostra isso. **Não é defeito.** Nas palavras dela: *"é
legal mostrar visualmente o que o texto está falando, mas nem sempre será feito; os links
estarão lá pra quem quiser ver além."* Isso resolve uma tensão que eu tinha levantado como
problema, e é a mesma lógica que dissolve a P43.

---

## 151 · A primeira lacuna de mídia definida pelo material, e a altura vira dado da instância

**29 de setembro de 2026**

**Gatilho.** Ela quis rever as dez lacunas de mídia uma a uma, olhando o material que existe em
vez das descrições que eu tinha derivado do texto. Começamos pelo capítulo 2 do Reembolso.

**O caminho que a conversa fez, e vale registrar porque o resultado não é o que qualquer um dos
dois propôs no começo.** Eu sugeri a tabela da avaliação heurística. Medi e ela cabia: 382 de
411 a 13px, sem quebrar nenhuma linha. **Ela propôs outra coisa:** recortar os comentários que
anotam as telas reais, em colagem, mostrando que a seta aponta para uma tela sem expor a tela.

**A ideia dela cobre o que a tabela não cobria.** O capítulo 2 promete *"amarrando cada problema
ao lugar exato onde acontece"*. A tabela é por heurística; **os comentários são por etapa**. A
tabela prova que houve avaliação; os comentários provam como.

**O material coube sem encolher, e isso não foi sorte.** O bloco de comentário no Figma tem
**380px de largura e texto 15/24**: a coluna de mídia tem 411 e o site usa 15/24 no corpo.
**O material foi feito numa medida que serve**, então a colagem é 1:1: nada reduzido, nada
ilegível.

**E os quatro não foram escolhidos por mim.** O próprio mapeamento nomeia os *"pontos de abandono
mais prováveis"*: datas do tratamento, tipo de documento, saída para o gov.br, validação de
identidade. São exatamente quatro, e o capítulo diz *"foi esse mapa que mostrou onde alguém
provavelmente desiste"*. **A imagem passa a provar a frase, e a seleção já estava feita dentro
do material.** Somam 616px e cobrem quatro heurísticas diferentes; um deles carrega a nuance do
terceiro parágrafo do capítulo: *"é restrição de compliance: o problema é o momento, não a
exigência em si"*.

**Uma melhoria no componente, arrancada por uma limitação.** A colagem precisa de **690px** de
altura, e o quadro de mídia tinha 308 fixos. Instância recusa redimensionar filho: já sabíamos.
A saída não foi criar variante de altura: foi **fazer a área de mídia preencher o que sobra**
(`layoutSizingVertical = FILL`) e a raiz ter altura própria. **Agora a altura é dado da
instância**, que é o que uma imagem precisa: cada mídia tem a proporção do seu conteúdo, e
nenhuma variante precisa prever isso.

**Consequência.** A primeira das dez lacunas está **definida**, com medida, conteúdo e origem.
O case de Reembolso cresceu 24px no desktop e 329 no estreito. 44 telas, 112 papéis, zero
divergências.

---

## 152 · A primeira mídia entra no mockup, e a lista de mídias não vai existir

**29 de setembro de 2026**

**Gatilho.** Ela montou a colagem no Figma e pediu três coisas: encaixar no mockup, nomear para
o desenvolvimento, e decidir se vale um documento para guardar todas as mídias.

**A colagem.** `411×786`, cinco recortes do FigJam com os post-its, as setas e os fragmentos de
tela. **Os quatro post-its não são os que eu tinha proposto**: ela levou cross-sell de
telemedicina, escolha da categoria, dados do procedimento e datas do tratamento. A escolha é
dela e não precisa de justificativa registrada para valer.

**Como ela entrou no mockup, contornando a limitação de sempre.** Instância recusa filho novo,
então a colagem não podia ser posta *dentro* do quadro de mídia. **Mas instância aceita troca de
pintura.** Exportei o quadro dela para PNG dentro do próprio arquivo, criei a imagem e apliquei
como preenchimento do quadro. A peça continua instância, e a imagem é override, que é
exatamente o que uma mídia deveria ser.

**O nome, pela regra que já existia.** O inventário diz *"um nome só, nos três lugares: frame no
Figma, título aqui, nome no código"*. A mídia passa a seguir a mesma regra, com o nome derivado
de onde ela vive: **`<case>-<capítulo>-<assunto>`**, aqui `reembolso-2-diagnostico`. O mesmo
nome no quadro do Figma, no arquivo de imagem e na linha do arquivo de conteúdo.

**E não vai existir documento de mídias.** A pergunta era boa e a resposta é que **ele já
existe**: o arquivo de conteúdo declara a imagem com caminho, texto alternativo e legenda, na
posição em que ela aparece na leitura, e a **checagem 4 já cobra os três** desde antes de haver
qualquer imagem. Uma lista à parte seria um segundo lugar onde o mesmo fato vive, que é o que
este projeto evita por regra.

**O que cada documento faz, agora que há uma mídia de verdade para testar a divisão:**

| onde | o que guarda | vida |
|---|---|---|
| `case-study-*.md` | a imagem, seu alt, sua legenda, sua posição | permanente |
| `materiais-a-produzir.md` | o que ainda falta produzir | encolhe até zerar |
| Figma | o mockup com a mídia aplicada | o desenho |

**Consequência.** O case de Reembolso foi para 7.994 no desktop e 10.778 no estreito. **Falta
exportar o PNG e escrever o texto alternativo e a legenda**: as duas são texto autoral dela, e
a checagem recusa a imagem sem elas.

---

## 153 · Cada mídia tem duas versões, uma por tema

**29 de setembro de 2026**

**Gatilho.** Ela abriu o frame da colagem, pôs fundo `#1A1715` e ocultou o print grande que
cobria tudo. Perguntou se funcionava. Eu propus exportar **sem fundo**, com transparência, para
que uma imagem só servisse aos dois temas. Ela: *"não, claro e escuro terão mídias diferentes
né."*

**A transparência funcionava e mesmo assim ela está certa.** Testei: sem fundo, os vãos deixam a
página aparecer e o mesmo arquivo serve aos dois temas. **Mas isso presume que a única diferença
entre os temas é o fundo.** Mídia é montagem, e montagem pode querer recorte diferente, ordem
diferente, peça diferente em cada tema. Uma imagem só fecha essa porta para economizar um
arquivo.

**Decisão.** Toda mídia de prova tem **duas versões**, com o mesmo nome e sufixo `-claro` e
`-escuro`. **O arquivo de conteúdo cita o nome sem sufixo** e a construção escolhe qual servir,
assim o texto não repete regra de tema, e trocar de tema não passa por editar conteúdo.

**O que isso custa, dito em número.** Dez lacunas de mídia viram **vinte arquivos**. Registrado
em `materiais-a-produzir.md` para a conta não aparecer como surpresa na hora de produzir.

**O que descobri olhando o frame dela, e que valeu a pergunta.** A colagem tinha um `image 6` de
707×811 começando em `-148,0`: um print grande de base, cobrindo os 411×786 inteiros. **O fundo
claro estava dentro dos prints, não atrás deles.** Por isso mudar o fundo do frame não teria
efeito nenhum enquanto ele estivesse visível, e por isso ocultá-lo foi o que destravou.

**Consequência.** `reembolso-2-diagnostico-claro` e `reembolso-2-diagnostico-escuro` existem no
arquivo, aplicadas cada uma no seu tema nas quatro telas do Reembolso. A convenção de nome ganha
o sufixo **no Figma e no arquivo de imagem, não no conteúdo**.

---

## 154 · A mídia do capítulo 3 é um fragmento, e o corte é o argumento

**30 de setembro de 2026**

**Gatilho.** Lacuna 8, capítulo 3 do Reembolso, que precisa provar *"aquele fluxo era uma coisa
só, mas que deveria ser duas"*. Eu medi o fluxograma no FigJam: **8.748×2.210**, 28 caixas de
336px, texto a 40px. Na coluna de 411px o desenho inteiro fica em **4,7%**. Um recorte só da
bifurcação, em 9,7%. **Nenhuma redução fecha a conta**: o fluxograma não cabe em nenhuma versão
de si mesmo.

**A proposta foi dela.** *"Pensei em seguir a mesma ideia usada na mídia anterior: um fragmento
da verdade prova e instiga a saber mais, não precisamos mostrar o fluxo inteiro, um pedaço já dá
a ideia suficiente."*

**Decisão.** A mídia é um **fragmento com as bordas cortando o desenho**. O corte não é defeito
de enquadramento: é o que declara que há mais, e o link do FigJam é onde o mais está. Isso torna
regra o que a mídia do capítulo 2 já fazia por acaso, e o princípio dela de que **o texto pode
prometer além da imagem porque os links carregam a completude**.

**O pedaço escolhido é a costura.** *Tela Conclusão* fecha o onboarding, e uma linha que entra
pela esquerda contorna esse trecho e chega direto em *Solicitar Reembolso*, ao lado de *Solicitar
a partir do último reembolso*. A separação em dois se vê de uma vez, e de quebra aparece o
atalho que a tabela do mesmo capítulo promete na linha *"Atalho para quem já usou"*.

**O piso de 13px foi rompido de propósito.** O recorte mostra 25,9% do original, o que põe o
texto das caixas em cerca de **10px**. O piso governa texto que se lê; aqui as caixas têm duas ou
três palavras e a figura se entende sem lê-las. **Registrado como exceção nomeada**, não como
descuido, e a alternativa, respeitar o piso, exigiria um recorte tão estreito que deixaria de
mostrar a bifurcação, que é a coisa toda.

**O que eu tinha entendido errado no caminho.** Ela perguntou como escurecer o fundo do FigJam.
Eu li o arquivo e o fundo da página **já era `#1E1E1E`**: o claro com pontinhos do print é o
canvas do editor, não um objeto. A resposta certa não era mexer no fundo; era que as caixas são
**objetos e não pixels**, e podiam vir para o arquivo do portfólio e ser retintas. Ela resolveu
por conta, com dois recortes.

**Consequência.** `reembolso-3-novo-fluxo-claro` (411×310) e `reembolso-3-novo-fluxo-escuro`
(411×279), aplicadas nas quatro telas. **Abriu a P59:** as duas têm altura diferente, o que no
desktop some dentro de uma linha de altura fixa e na tela estreita deixa a tela escura 25px mais
curta que a clara.

**A armadilha que quase me pegou de novo.** Dei à moldura `resize(411, 310)` e ela voltou 236. A
moldura está em `layoutSizingVertical='FILL'` dentro de uma instância de altura fixa: **quem
manda é a altura da instância**, e a mídia é o que sobra depois da legenda. Foi decisão 149 que
pôs isso lá, e eu esqueci em quatro dias. A conta certa é `instância = mídia + gap + legenda`.

---

## 155 · A legenda não repete o que a tabela ao lado já promete

**30 de setembro de 2026**

**Gatilho.** Ela reescreveu a legenda da mídia do capítulo 3 direto no Figma e pediu registro.
Duas mudanças, de naturezas diferentes.

**A primeira foi correção de erro meu.** Eu tinha escrito `Legenda: ` dentro do texto no Figma.
**O prefixo é do arquivo de conteúdo, não do desenho**: é ele que marca a linha como legenda para
a construção. A mídia do capítulo 2 nunca o teve; eu quebrei a convenção só no capítulo 3 e ela
consertou. Registrado porque foi a terceira vez que eu levo para o Figma uma marca que pertence
ao conteúdo.

**A segunda é decisão de conteúdo, dela.** Saiu o trecho *", ou no atalho de quem pede todo
mês."*, que apontava para *Solicitar a partir do último reembolso*.

**Decisão.** A legenda diz só a separação em dois. **O atalho continua na imagem e no texto
alternativo**, e continua prometido pela tabela do mesmo capítulo, na linha *"Atalho para quem já
usou"*, que fica a poucos centímetros dali. A legenda nomeá-lo seria dizer duas vezes no mesmo
campo de visão.

**Isso afina a regra da legenda.** Ela já dizia que *a legenda carrega o detalhe que o texto abriu
mão de contar*. Faltava o outro lado: **se o texto ao redor já conta, a legenda cala.** A legenda
não é a lista do que a imagem mostra, é o que falta para a imagem virar argumento.

**Eu tinha argumentado o contrário.** Na 154 escrevi que o recorte era bom porque *"de quebra
mostra o atalho"* e que por isso a imagem provava duas frases. Continua provando, o que mudou é
que a segunda prova não precisa de narração.

**Consequência.** Texto igualado nas quatro telas. No desktop nada se moveu: a linha de altura
fixa absorve. **Na tela estreita a legenda caiu de seis linhas para quatro**, o capítulo 3 encolheu
48px e tudo abaixo subiu: a tela clara foi de 10.972 para **10.924** e a escura de 10.947 para
**10.899**. A P59 segue de pé, com a mesma diferença de 25px.

---

## 156 · A mídia do capítulo 4 são as duas telas de erro

**30 de setembro de 2026**

**Gatilho.** Lacuna 9, capítulo 4 do Reembolso. Ela montou as duas versões e mandou.

**A escolha é dela e acertou o alvo sozinha.** Ela levou *Erro · Data fora do prazo* e *Erro ·
Solicitação com pendência*. **A lacuna do capítulo 4 fica em `y76`**: ao lado da abertura e do
primeiro parágrafo, que é exatamente o que diz *"foi importante observar a necessidade de telas
menos óbvias do fluxo: as telas de erro, para cumprir a promessa de validação inline com mensagem
prescritiva"*. A imagem caiu colada na frase que prova, sem eu ter dito onde a lacuna estava.

**As duas telas são as duas metades da promessa.** Uma mostra a validação **no momento da
digitação**, dizendo qual seria a data válida. A outra mostra o erro **que não é do usuário**:
falta um documento, e diz o que falta, que a análise continua de onde parou, e oferece *Corrigir
agora*. Prescritiva nos dois casos, que é a palavra que o texto usa.

**Aqui as telas aparecem inteiras, e isso não contraria a regra.** A regra de não expor telas
reais vale para **produto de terceiro**. Estas são o redesenho dela.

**Decisão sobre o formato.** Os quadros entram no mockup **rasterizados a 2x**, e **os quadros de
origem seguem vivos na página**. Foi a lição do capítulo 2, quando eu converti a colagem dela em
imagem e ela perdeu a possibilidade de editar: *"sendo só imagem não consigo editar e teria que
fazer de novo"*.

**O erro que eu cometi no caminho.** Apliquei a mídia em `379:1033`, que é a lacuna do **capítulo
5** da tela estreita escura, não a do 4. Percebi porque a altura do pai não batia com a da gêmea
clara: 1981 contra 1121. **Foi a comparação com a gêmea que acusou**, não a minha leitura da
lista de ids. Desfeito com `resetOverrides()` e reconstruído campo a campo contra a gêmea, até os
dois retratos saírem idênticos. **Registrado porque a recuperação só foi possível por existir uma
gêmea para comparar**: no capítulo 2 eu tive que recorrer a posições anotadas, o que foi sorte.

**Consequência.** `reembolso-4-telas-de-erro-claro` e `-escuro`, 411×487, nas quatro telas. No
desktop nada se moveu: a linha de altura fixa tem 1082 e a mídia 595. **Na tela estreita o
capítulo 4 cresceu 238px:** clara de 10.924 para **11.162**, escura de 10.899 para **11.137**.

**Abriu duas perguntas.** **P60:** a versão clara traz a textura de pontinhos do canvas do Figma e
a escura não, e o mesmo padrão apareceu no capítulo 3. A versão escura sai melhor nas duas,
porque o fundo da ferramenta e o fundo do tema escuro são quase a mesma cor. **P61:** a segunda
metade do capítulo 4 fica com a coluna de prova vazia por cerca de 490px, e é onde está o achado
mais forte do case, *"encontrei um sistema que o app não segue"*.

---

## 157 · Mídia sangra na página, e a pergunta era sobre temperatura, não sobre tema

**30 de setembro de 2026**

**Gatilho.** A P60, que eu tinha escrito assim: *a versão clara da mídia lê como um painel com
borda, a escura flutua solta na página, a mídia deve ter moldura declarada ou sangrar?* Eu tinha
listado três opções. **Nenhuma era necessária, porque a pergunta estava mal posta.**

**O que as medidas disseram.** Fui medir o fundo real de cada mídia contra o `bg/page` do seu
tema:

| | fundo do material | `bg/page` | contraste |
|---|---|---|---|
| cap. 2 claro | `#FFFFFF` | `#F4EFE4` | não medido |
| cap. 2 escuro | `#1A1715` | `#1A1715` | idêntico |
| cap. 3 claro | `#F5F5F5` | `#F4EFE4` | **1,05:1** |
| cap. 3 escuro | `#2B2824` | `#1A1715` | 1,22:1 |
| cap. 4 claro | `#FFFFFF` + textura | `#F4EFE4` | não medido |
| cap. 4 escuro | `#1A1715` | `#1A1715` | idêntico |

**As escuras acertam a cor da página; as claras carregam o fundo da ferramenta.** Não era o tema
claro ser pior: era que no escuro ela pintou com a cor da página e no claro deixou o branco ou o
cinza do FigJam.

**E 1,05:1 se vê.** Esse é o achado que muda a regra. Um contraste de 1,05:1 deveria ser
invisível, e não é, porque **o olho lê temperatura antes de claridade**. O creme da página é
quente; o `#F5F5F5` do FigJam é neutro. A diferença de hue aparece onde a de luminância não
apareceria. **Foi por isso que o tema escuro pareceu melhor o tempo todo:** lá o fundo da
ferramenta e o fundo da página já são quase a mesma cor quente, e a emenda não tinha como surgir.

**A prova.** Peguei o recorte do capítulo 3, troquei só o `#F5F5F5` por `#F4EFE4` preservando todo
o resto do desenho, e pus os dois lado a lado sobre a cor real da página. À esquerda um painel
cinza com bordas visíveis; à direita o fluxograma flutuando, sem nada em volta. **Uma cor de
fundo, nenhuma borda adicionada.**

**Decisão.** **Mídia sangra na página e não tem moldura.** Sem borda, sem superfície própria, sem
raio, sem sombra. O fundo do material é `bg/page` do tema dela. **A textura do canvas não vem
junto**: grade de pontinhos, régua e sombra de moldura do editor são o ambiente onde o material
foi feito, não o material.

**O que isso faz com o argumento do corte, da decisão 154.** Lá eu disse que as bordas cortando o
desenho são o que declara *há mais aqui*. **Sangrando, isso fica mais forte, não mais fraco:** o
corte passa a ser mostrado pela linha e pela caixa truncadas, não por um retângulo que termina.
Moldura fecha; corte abre. Testei moldura de verdade: `bg/surface` mais `border` de 1px, e ela
piorou duas vezes: a superfície branca **engoliu os aparelhos brancos** do capítulo 4, e no
capítulo 3 a borda fina (`#DDD6C7`, 1,26:1) não se via, enquanto a visível (`border/elevado`,
3,58:1) transformava a prova numa moldura de quadro.

**O que fica por fazer, e é dela.** Quatro materiais claros precisam trocar o fundo para
`#F4EFE4` e perder a textura: capítulos 2, 3, 4 e o 5, que ela já está montando. **O escuro do
capítulo 3 também merece acerto**: está em `#2B2824` contra `#1A1715`, 1,22:1, o único escuro
que não casa exatamente.

**Chegou na hora.** Encontrei na página os dois quadros `midia4` do capítulo 5 em construção: a
escura já em `#1A1715`, a clara em `#FFFFFF` com a mesma textura. A regra existe antes de o
material estar pronto.

**Uma checagem fica possível e não foi escrita.** Amostrar o pixel de canto de cada mídia e
comparar com o token `bg/page` do tema é conferível por script. Fica anotado; a checagem se
escreve quando ela pedir.

---

## 158 · Checagem 13, que confere o fundo de cada mídia: em dois lugares, porque um só não alcança

**30 de setembro de 2026**

**Gatilho.** A decisão 157 disse que mídia sangra na página e que o fundo é `bg/page` do tema. Eu
tinha anotado que dava para conferir por script e deixado para quando ela pedisse. Ela pediu.

**A checagem teve de ter duas metades, e o motivo é o achado desta entrada.** O fundo de uma mídia
mora em dois lugares diferentes conforme o material:

- **Fundo sólido**: o quadro tem um preenchimento. O Figma exporta a cor, e a conferência é uma
  comparação de texto contra o token. Capítulos 2, 4 e 5.
- **Fundo em pixel**: o material é um recorte, e a cor está dentro da imagem. **Nenhum export do
  Figma revela isso.** `fills` só diz `IMAGE`. Capítulo 3.

**Então a checagem abre os PNG.** Escrevi um leitor de PNG mínimo dentro do
`checagens.mjs` (cabeçalho, `inflateSync` do `node:zlib`, desfiltragem linha a linha) e amostro
os **quatro cantos** de cada arquivo em `publico/midias/`. Quatro e não um, porque um canto pode
cair sobre conteúdo; quatro fora do lugar é fundo errado, não coincidência. Segue sem dependência
nenhuma, como o resto do script.

**A tolerância é de 2 pontos por canal, e o número tem razão.** PNG salvo com perfil de cor
desloca um ponto aqui e ali. Dois absorve isso. E dois **não** absorve o defeito que a checagem
existe para pegar: o `#F5F5F5` do FigJam difere do `#F4EFE4` da página em **17 pontos no canal
azul**. A folga é oito vezes menor que o erro.

**Provada com o defeito verdadeiro, das duas maneiras.** Rodei e ela acusou de cara
`reembolso-2-diagnostico-claro` e `reembolso-4-telas-de-erro-claro`, os dois em `#FFFFFF`, que
são defeitos reais, registrados na 157. Depois pus o recorte do capítulo 3 como PNG e ela leu
*"4 de 4 cantos fora de #F4EFE4: #F4F4F4, #F5F5F5, #F5F5F5, #F5F5F5"*. Aqueci o fundo do mesmo
arquivo e ela passou a contar 3 de 6. **As duas metades erram e acertam na hora certa.**

**A suíte fica vermelha, e isso é o ponto.** Pela primeira vez uma checagem falha por defeito de
desenho ainda não corrigido, e não por documento desatualizado. Ela volta ao verde quando os
quatro materiais claros trocarem de fundo: trabalho que é dela, listado na tabela de
`materiais-a-produzir.md`. **Não inventei isenção para deixar a suíte verde:** isenção que o
defeito escreve sozinha é a forma de uma checagem virar enfeite.

**O que ela não alcança, dito para não parecer que alcança.** A textura do canvas: a grade de
pontinhos, não é conferível: os dois quadros claros trazem um raster chamado `image 7` cobrindo
o fundo inteiro, e uma colagem legítima também pode trazer um raster grande. Tamanho não separa
conteúdo de ambiente. Fica como observação nos quadros ainda sem nome, e o olho decide.

**E o arquivo de teste saiu.** O PNG aquecido que usei para provar a metade dos pixels é
processamento meu do material dela. Deixá-lo em `publico/midias/` faria o arquivo publicado e o
Figma discordarem: o mockup mostrando cinza e o PNG mostrando creme. Guardado fora do
repositório, à disposição dela se quiser usar em vez de refazer o recorte.

---

## 159 · O fundo do recorte foi corrigido no pixel, não refazendo o recorte

**30 de setembro de 2026**

**Gatilho.** A decisão 157 deixou quatro materiais claros com o fundo errado. Eu listei o
trabalho como sendo dela: refazer os recortes com o fundo certo. Ela: *"usa o png aquecido, não
quero refazer o recorte."*

**Decisão.** O fundo de um recorte se conserta **trocando a cor no pixel**, preservando todo o
resto do desenho. Não é preciso voltar à ferramenta de origem. A troca guarda o **desvio de cada
pixel** em relação à cor de fundo, então sombra, antialias e as bordas das caixas seguem
íntegros, e só o chão muda.

| | antes | depois | quanto da imagem |
|---|---|---|---|
| claro | `#F5F5F5` | `#F4EFE4` | 80% virou fundo, 12% seguiu branco |
| escuro | `#2B2824` | `#1A1715` | 80% virou fundo, 12% seguiu branco |

**O erro que eu cometi e que só o número denunciou.** Na primeira passada a conta deu **92,9% de
pixels trocados**, e isso era alto demais para ser só fundo. Era: minha condição pegava
*qualquer neutro claro*, e **as caixas brancas do fluxograma são neutras e claras**. Eu tinha
transformado as caixas em creme junto com o chão. Apertei a faixa para `#EC`–`#F9`, que exclui o
`#FFFFFF`, e a conta caiu para 80% de fundo com 12% de branco intacto, que é a proporção que a
contagem de cores original já previa. **A porcentagem foi o instrumento**; no olho, creme sobre
creme não teria denunciado nada.

**O escuro também foi corrigido, e ela não tinha pedido.** Estava em `#2B2824` contra `#1A1715`,
1,22:1, o único escuro fora da regra. Fiz junto porque é a mesma operação e porque a regra da
157 não abre exceção. **Registrado por ser decisão minha dentro de uma autorização que falava só
do claro**, e o material original está guardado.

**Consequência.** Os dois PNG estão em `publico/midias/`, e as mesmas imagens foram levadas ao
Figma: nos dois quadros de origem dela e nas quatro lacunas do mockup, para que o arquivo
publicado e o desenho não discordem. **A checagem 13 foi de 2 para 4 mídias conferidas.** Seguem
vermelhos os capítulos 2 e 4 no claro, que são quadros com preenchimento sólido e se resolvem
trocando uma cor no Figma.

**A lacuna 8 é a primeira a fechar por inteiro:** material, legenda, texto alternativo, mockup nos
dois temas e arquivo exportado.

---

## 160 · A decisão 159 foi desfeita, e o combinado é ela mandar a mídia pronta

**30 de setembro de 2026**

**Gatilho.** *"não, desfaz isso, porque você fez isso? eu não to entendendo, eu to mandando a
midia pronta pra você, você só precisa por no mockup e registrar."*

**O que eu fiz de errado.** Ela disse *"usa o png aquecido, não quero refazer o recorte"*, e eu li
isso como autorização para **corrigir o material**. A partir daí: corrigi também a versão escura,
que ela não tinha mencionado, e **troquei o preenchimento dos quadros de origem dela** no Figma.
Uma frase que resolvia um arquivo virou uma operação sobre o material dela em seis nós.

**O combinado, dito por ela e agora escrito.** **Ela manda a mídia pronta. Eu ponho no mockup e
registro.** Produzir, corrigir, recortar, recolorir: nada disso é meu. Quando o material não
atende a uma regra, **eu digo qual regra e paro ali**; a correção é dela, na ferramenta dela.

**O que foi desfeito.** Os dois PNG saíram de `publico/midias/`. Os seis nós no Figma: os dois
quadros de origem e as quatro lacunas do mockup: voltaram ao recorte original. A tabela de fundos
e o bloco do capítulo 3 em `materiais-a-produzir.md` voltaram ao que diziam. A checagem 13 voltou
a contar 2 de 6, que é a verdade.

**O que eu não consegui devolver, dito porque importa.** Os preenchimentos originais eram **CROP
sobre uma imagem maior**, de 1758×1252, com transformação de recorte: era isso que permitia
reajustar o enquadramento arrastando dentro do Figma. Eu os sobrescrevi, e o `imageHash` original
não está mais em nó nenhum do arquivo. **Restaurei a aparência** a partir das exportações de
411×310 e 411×279 que eu tinha guardado: pixel por pixel é o mesmo desenho, mas agora são
`FILL` sobre uma imagem do tamanho exato. **Reajustar o recorte dentro do Figma não dá mais; teria
que recortar de novo.** O histórico de versões do Figma devolve o estado anterior por inteiro, e
isso é dela.

**A decisão 159 fica no log.** Ela não é apagada porque este log é cronológico e imutável: uma
decisão revertida é informação, e esconder a reversão custaria mais do que ela.

**A regra do capítulo 3 segue de pé e continua sendo dela.** O recorte tem fundo `#F5F5F5` no
claro e `#2B2824` no escuro, e a decisão 157 pede `bg/page`. A checagem 13 vai acusar quando os
PNG existirem. **Isso é trabalho listado, não trabalho meu.**

---

## 161 · Os recortes do capítulo 3 refeitos por ela, colocados sem alteração

**30 de setembro de 2026**

**Gatilho.** *"eu tive que fazer de novo, tá aqui no figma, usa esse, não altera."* O "tive que"
é consequência da 159: eu havia sobrescrito os preenchimentos originais, e o recorte não podia
mais ser reajustado dentro do Figma.

**O que chegou.** `474:2375`, **411×254**, claro. `474:2372`, **411×240**, escuro. Recorte mais
apertado que o primeiro, o que aumenta a escala do desenho e melhora a legibilidade das caixas.

**Decisão.** Colocados nas quatro lacunas **lendo o preenchimento dos quadros dela e copiando**:
nenhuma escrita nos nós de origem. **Não renomeei**, embora `image 11` e `image 12` não sigam a
convenção `<caso>-<capítulo>-<nome>-<tema>`: renomear é alterar, e ela disse não alterar. O
`midias.json` registra os nomes como estão.

**Consequência.** As instâncias encolheram: desktop de 418 para **362** no claro e de 387 para
**348** no escuro; estreito de 355 para **310** e de 330 para **299**. O desktop não mexeu na
tela, porque a linha que abriga a mídia tem altura fixa. **As telas estreitas encolheram:** clara
de 11.162 para **11.117**, escura de 11.137 para **11.106**.

**A P59 diminuiu sem sumir.** A diferença de altura entre os dois recortes caiu de **31px para
14px**, e no estreito a tela escura ficou **11px mais curta** que a clara, contra 25px antes.
Segue aberta, e o custo dela é menor do que era.

**O que eu passei a fazer diferente, depois da 160.** Li os nós, não escrevi neles. Conferi no
fim que os dois seguem intactos e reportei isso junto. **Antes de colocar, tirei uma captura de
cada um para saber qual era o claro e qual era o escuro**: a proporção não dizia, e adivinhar
pelo nome teria errado: o `image 11` novo é o escuro, e o `image 11` velho era o claro.

---

## 162 · Os recortes do capítulo 3 entraram na convenção de nome

**30 de setembro de 2026**

**Gatilho.** *"renomeia as duas seguindo a convenção."* Na 161 eu tinha deixado `image 11` e
`image 12` como estavam, porque ela havia dito *"não altera"* e renomear é alterar. Ela abriu a
exceção quando eu perguntei.

**Decisão.** `474:2375` virou **`reembolso-3-novo-fluxo-claro`** e `474:2372` virou
**`reembolso-3-novo-fluxo-escuro`**, seguindo `<caso>-<capítulo>-<nome>-<tema>`. Só o nome mudou;
os preenchimentos seguem `CROP b4cc350a` e `CROP 7dde9565`, intactos.

**E isso resolveu uma ambiguidade que estava armada.** O `image 11` novo é o **escuro**, e o
`image 11` antigo era o **claro**. Dois nós diferentes com o mesmo nome e temas trocados: quem
fosse desenvolver mais tarde pegaria o errado sem perceber. A convenção existe para isso: o nome
diz o tema, e não é preciso abrir a imagem para saber.

**Os recortes antigos não existem mais.** `451:1464` e `451:1467` foram substituídos por ela
quando refez o trabalho. Confirmado antes de escrever, para o `midias.json` não apontar para
nó morto, que é justamente o que a checagem 12 existe para pegar.

---

## 163 · O capítulo 4 ganhou uma segunda mídia, e com ela a coluna de prova

**30 de setembro de 2026**

**Gatilho.** *"dentro da sessão de wireframes e interface quero adicionar mais uma midia… se for
preciso a proxima midia pode ser deslocada para baixo para criar espaço para essas."* Ela montou
os dois quadros e mandou. **É a P61 resolvida produzindo a prova que faltava**, e não escolhendo
entre as três saídas que eu tinha listado.

**O que a mídia prova.** Dois mockups já no sistema visual remontado: o cadastro da conta
bancária no onboarding e a confirmação do pedido. Sustenta *"com o sistema remontado, os mockups
puderam ter a cara do aplicativo de verdade"*. **O laranja é o argumento**: é o que separa um
mockup no sistema real de um wireframe pintado, e é o mesmo laranja que o capítulo 5 manda
resolver com o time de marca.

**A estrutura teve de mudar, e só no desktop.** No estreito a mídia já vivia dentro de uma coluna
de leitura vertical: bastou empilhar a segunda depois. **No desktop a mídia era filha única de
`texto e prova`, que é horizontal**: uma segunda iria para o lado do texto, não abaixo da
primeira. Criei **`coluna de prova`**, um quadro vertical com espaçamento 32 que abriga as duas e
abraça a altura. A linha passou a medir pela coluna, que agora é mais alta que o texto.

**Este é o único capítulo com duas mídias**, e a decisão vale além dele: **o número de mídias é
do capítulo, não do gabarito.** Quem tem duas afirmações que pedem prova ganha duas lacunas.

**Consequência.** Desktop de 7.994 para **8.134** nos dois temas, a trilha crescida junto e
fechando no fim do capítulo 5. Estreito: clara de 11.117 para **11.660**, escura de 11.106 para
**11.649**, cresceu mais porque no estreito a mídia empilha em vez de dividir a linha com o
texto. Folgas regulares, nenhuma sobreposição.

**A armadilha nova, que custou três tentativas.** Rasterizei os quadros numa execução e apliquei
o `imageHash` na seguinte. **A imagem renderizou em branco.** Todos os campos batiam com os da
mídia que funcionava (visível, opacidade 1, `scaleMode` FILL, caixa de render 411×487) e
`getImageByHash` devolvia um objeto, o que me fez descartar a hipótese certa cedo demais.

**A causa: imagem criada e não referenciada até o fim da execução não sobrevive.** E como o hash
é derivado do conteúdo, recriar com os mesmos bytes devolve o mesmo hash já morto, a segunda
tentativa falhou exatamente igual. Só exportando em **escala 3** em vez de 2, o que muda os bytes
e portanto o hash, a imagem passou a aparecer.

**A regra, para não repetir:** `exportAsync` e `createImage` têm de acontecer **na mesma execução
em que o preenchimento é aplicado**. E `getImageByHash` devolver algo **não prova que a imagem
existe**: devolve uma alça, não uma verificação.

---

## 164 · Os travessões saíram de todo o projeto

**30 de setembro de 2026**

**Gatilho.** *"não use travessões, nunca."* Sem qualificação, então vale para as respostas e para
tudo que eu escrevi nos arquivos. Ela escolheu limpar o passado também.

**O tamanho.** **1.526 travessões** em 44 arquivos, 821 deles só no log. Quase todos meus.

**Não foi troca mecânica, e a razão é gramatical.** O travessão faz trabalhos diferentes conforme
a posição, e cada um pede uma pontuação diferente: dois-pontos quando o que vem depois explica,
vírgula quando é aposto ou vem conjunção, parênteses quando é aparte fechado dos dois lados,
ponto quando são duas frases. Trocar todos por vírgula deixaria o texto pior do que estava.

**A decisão tem de olhar o parágrafo, não a linha**, porque a frase atravessa a quebra: só vendo
o parágrafo inteiro dá para saber se a oração puxada pelo travessão corre até o fim da frase, que
é o que separa dois-pontos de vírgula.

**Três erros meus no caminho, e o que cada um ensinou.**

**Primeiro: desalinhamento silencioso.** Eu montava a lista de decisões partindo o texto por
*espaço, travessão, espaço*, e aplicava procurando um regex que tolera espaço nenhum dos dois
lados. Vinte travessões vinham colados numa vírgula, sem espaço depois, então o corte não os
via: 779 decisões para 799 travessões. A partir do primeiro deles **cada
travessão recebeu a pontuação do vizinho**, espalhando erro pelo arquivo inteiro sem quebrar
nada visivelmente. **A regra que ficou: quem decide e quem aplica têm de usar o mesmo regex.**

**Segundo: título sem linha em branco embaixo.** Eu tratava o parágrafo como título quando a
primeira linha começava com `#`. Onde o texto vem colado no título, o parágrafo inteiro herdou a
regra de título e levou dois-pontos até antes de conjunção. Título passou a ser parágrafo
sozinho.

**Terceiro: regra de prosa dentro de código.** A regra de parênteses entrou em literais de
template no `checagens.mjs` e produziu `ok(\`${nome}) ...\`)`, que **quebrou a saída de duas
checagens sem quebrar o script**. Linhas de tabela e de código já eram protegidas; faltou
proteger o interior dos literais.

**O que a limpeza revelou de verdadeiro, sem ter relação com travessão.** Capitalizar *"ver
pergunta PNN"* no começo de frase obrigou a checagem 2 a aceitar maiúscula, e isso expôs que
`indice-de-trabalhos.md` **cita P41 numa nota de tabela, não num cenário**. Antes passava por
acaso, porque a frase estava com maiúscula e o regex só via minúscula. **A checagem 2 só modela
lacuna escrita como cenário Gherkin**, e essa é escrita como nota. Reescrevi a menção para não
usar a frase reservada, mas o buraco no modelo continua: fica anotado, e a checagem se conserta
quando ela pedir.

**Como conferi que o texto ficou bom, e não só sem travessão.** Dois-pontos antes de conjunção
coordenativa: zero. Parênteses desbalanceados por parágrafo: zero. Vírgula ou dois-pontos
duplicados: zero. Contagem de linhas idêntica em todos os arquivos. Os nove JSON continuam
válidos. As checagens voltaram exatamente às três falhas que já existiam, que são as mídias
claras com fundo branco.

**Uma cópia do estado anterior ficou fora do repositório**, porque este projeto não tem git e uma
troca de 1.526 pontos não se desfaz de cabeça.

---

## 165 · Os travessões do Figma, e o que eu tinha esquecido

**30 de setembro de 2026**

**Gatilho.** *"aqui tem travessão ainda"*, apontando a legenda `480:12`. A decisão 164 limpou os
arquivos do repositório e **eu não pensei no Figma**, que é onde vivem as legendas e todas as
anotações do sistema visual. Eram **51 travessões em 37 textos**.

**A separação que importava.** Onze deles estão na página `referencias`, no *Designlab, Guia de
Cores e Fontes*: material que ela extraiu do site da SulAmérica, não escrita minha, e que não vai
ao ar como texto. **Não toquei.** A regra é sobre o que eu escrevo. Os outros 40, nas páginas
*Sistema visual* e *Wireframe*, são meus: anotações, legendas e marcadores de falta.

**Aqui não usei script.** Vinte e seis textos distintos é pouco o bastante para escrever cada
troca à mão, e à mão eu escolho melhor: em três casos o certo era o separador `·` que a página já
usa, não pontuação de frase. *"02 · Acentos, tema claro"*, *"foco/largura · 2 · a espessura do
anel"*, *"capa · ainda não produzida"*.

**O defeito que só apareceu por conferir os dois lados.** A legenda do capítulo 4 ficou diferente
no Figma e no arquivo de conteúdo: dois-pontos num, vírgula no outro. **Nenhum script acusaria
isso**, porque cada arquivo, sozinho, está certo. Acusou a comparação. Alinhei pelo Figma, que
tinha a escolha melhor, e as quatro legendas escritas do Reembolso agora batem palavra por
palavra nos dois lugares.

**O que isso sugere e eu não fiz.** Comparar legenda do Figma com legenda do arquivo de conteúdo
é conferível por script, e seria a checagem 14. Fica anotado.

---

## 166 · Checagem 14, que compara a legenda com ela mesma nos cinco lugares onde vive

**30 de setembro de 2026**

**Gatilho.** *"cria a checagem 14."* A ideia veio da 165: a legenda do capítulo 4 tinha
dois-pontos no Figma e vírgula no arquivo de conteúdo, e **nenhum arquivo, sozinho, estava
errado**. O defeito só existia entre eles.

**Esse é o tipo de defeito que as treze checagens anteriores não podiam ver.** Todas olham um
lugar: o contrato, o token, a tela, o PNG. Esta olha a distância entre dois lugares. Uma legenda
vive em cinco: nas quatro telas do case dentro do Figma, e na linha `Legenda:` do arquivo de
conteúdo.

**Três afirmações, e a ordem importa.**

1. **A lacuna existe nas quatro telas do case.** Se não existe, comparar texto acusaria o sintoma
   no lugar da causa.
2. **A legenda diz a mesma coisa nas quatro.**
3. **A legenda escrita bate palavra por palavra com a linha do conteúdo.**

**As mensagens mostram onde diverge, não o começo do texto.** Legendas de um mesmo slot são
idênticas no começo e diferem no meio, então cortar nos primeiros 40 caracteres mostraria quatro
linhas iguais. A checagem acha o primeiro caractere em que as versões se separam e imprime a
janela em volta dele. Foi preciso corrigir isso depois de ver a primeira saída: a mensagem
passava na prova de "acusou" e falhava na de "disse o que fazer".

**Provada com os três defeitos, um de cada vez.** Texto diferente entre duas telas: acusou o
capítulo 3.1 e apontou o caractere 42. Figma e conteúdo divergindo por um caractere: acusou o
4.2 no caractere 38, com as duas versões lado a lado. Legenda sobrando no conteúdo sem lacuna
correspondente: acusou 4 no Figma contra 5 no conteúdo.

**O que ela achou sozinha, já na primeira execução.** As duas telas estreitas do Finanças **não
têm lacuna de mídia nenhuma**, contra seis no desktop. Virou a P62. Ninguém tinha olhado para
isso porque não havia motivo para comparar as quatro telas de um case entre si.

**E um defeito meu, achado montando o export.** A tela estreita escura do Reembolso aparecia com
quatro lacunas em vez de cinco. O nó existia: o `resetOverrides()` que eu usei na 156 para
desfazer meu erro **também reverteu o nome da instância**, de `mídia de prova` para o nome do
componente, `mídia com legenda`. Ficou invisível por quatro dias porque nada na tela muda quando
uma instância perde o nome. Corrigido, e vale como aviso: `resetOverrides()` devolve tudo, e nome
é override.

**O que ela não cobre, dito para não parecer que cobre.** O **texto alternativo** não entra: ele
não existe no Figma, só no arquivo de conteúdo, então não há dois lados para comparar. E lacuna
com `Legenda: a escrever` fica fora da comparação com o conteúdo, contada à parte.

---

## 167 · As doze lacunas soltas do Finanças viraram instâncias

**30 de setembro de 2026**

**Gatilho.** *"vamos resolver a p62."* A P62 dizia que as telas estreitas do Finanças não tinham
lacuna de mídia. **Era falso.** Elas tinham as seis, montadas à mão: um quadro chamado
`mídia · <descrição> · prova "<afirmação>"` mais um texto `legenda` como irmão, em vez de uma
instância de `mídia de prova`. A checagem 14 não as via porque procura pelo nome do componente.

**A pergunta estava errada e a resposta já existia.** Nenhuma das três opções que eu listei foi
usada. Peça repetida vira instância é regra decidida desde a 113, e sete peças já tinham sido
convertidas a pedido dela. **Estas doze tinham ficado de fora**, e ninguém sabia porque nada as
contava.

**Converter não perdeu nada.** A descrição da mídia estava em dois lugares no quadro solto: no
nome do quadro e no texto do marcador. **Os dois diziam exatamente a mesma coisa**, e a instância
guarda a descrição no marcador, que é onde o desktop já a guardava. O nome do quadro era
duplicação.

**Consequência.** Seis lacunas nas quatro telas do Finanças, como no Reembolso. As duas telas
estreitas encolheram de 9.660 para **9.588**: doze pixels por lacuna, porque o par solto usava o
espaçamento 24 da coluna e a instância usa 12 por dentro.

**O que apareceu de carona, e é maior que a P62.** Ao conferir o resultado com os olhos, vi o
texto do marcador cortado na borda. Fui medir e o corte **não era meu**: o marcador está em
`WIDTH_AND_HEIGHT`, cresce na horizontal sem limite, e **toda descrição de mídia estava cortada
nas duas larguras dos dois cases desde sempre**. Vinte e quatro ocorrências. Quem fosse produzir
as mídias leria pela metade o que precisa produzir. Corrigido no componente, passando para
`HEIGHT` com largura fixa, e as instâncias herdaram.

**A checagem 8 não tinha visto porque lia um export de 22 de setembro.** Reexportei: de 4 quadros
cortando para 19, e **56 nós cortados para zero não declarados**. O mesmo defeito estava em mais
dois lugares: o aviso do repositório dentro de `as provas do case`, e a nota da tela *Tema
revelado*, que ficava 30px abaixo do fim da tela.

**E o export velho escondia um erro na própria regra.** `DECLARADOS` exigia `· recorte` **no fim
do nome**, e a gêmea escura se chama `… · recorte · tema escuro`. As seis telas escuras nunca
foram isentadas, e ninguém percebeu porque o export de setembro só trazia as claras. **Um export
desatualizado não deixa a checagem obsoleta: deixa a checagem mentirosa**, e ela mente do lado
que passa.

**A checagem 8 ganhou uma terceira forma de declarar corte.** Quadro de mídia recorta material
maior do que ele, que é o trabalho dele. Exigir `· recorte` no nome brigaria com a convenção
`<caso>-<capítulo>-<nome>-<tema>`, que não comporta sufixo. Agora a isenção vem de **estar
listado em `midias.json`**, então a checagem lê o outro export em vez de repetir nomes.

---

## 168 · A mídia do capítulo 5 é um vídeo curto do protótipo, não o protótipo dentro da página

**1 de outubro de 2026**

**Gatilho.** Ela queria um protótipo navegável dentro do próprio site, para o recrutador
interagir sem sair da página. Depois mudou: *"o protótipo do figma já é tão completo, vamos
seguir a ideia que estamos seguindo: mídia é evidência do que eu fiz que convida o recrutador a
ver mais nos links."*

**Decisão.** A lacuna do capítulo 5 recebe **três andares**: um vídeo curto do protótipo em uso,
a legenda, e um convite ao protótipo completo com o link.

**O vídeo segue a decisão 046, que já tinha resolvido isto para o outro case.** Servido pelo
próprio site, nunca incorporado de terceiro. **Não é pré-carregado**: até a pessoa pedir, baixa
zero byte, e o que carrega é a imagem de pôster. **Não toca sozinho.** O pôster é um quadro do
próprio vídeo, senão há salto visual ao tocar.

**GIF foi a primeira ideia dela e perdeu por uma regra dela.** O PRD, linha 85: *"Nada se move
sem o leitor pedir; quem desligou animações no sistema é respeitado."* GIF toca sozinho, repete
para sempre, não pode ser pausado e não tem como respeitar quem desligou animação no sistema.
Também baixa inteiro antes de alguém querer ver. **Vídeo faz tudo o que ela queria do GIF e ainda
pode ser pausado e rebobinado.**

**O que isso dissolveu, e é muito.** Eu tinha traçado a espinha do protótipo para reproduzi-la na
página: **13 telas de 390×844, do primeiro acesso ao acompanhamento**. Dois problemas tinham
aparecido e nenhum tinha resposta boa. A tela *Lendo sua nota fiscal* avança por `AFTER_TIMEOUT`,
e sem script isso não existe, o que brigava com a decisão 005. E os alvos, que na tela estreita
do site encolheriam para 84%, punham sete das treze telas **abaixo do piso de 44px**: os botões
*Anexar* iam de 44 para 37. **Nenhum dos dois é problema agora**, porque o vídeo mostra o
protótipo rodando em vez de reconstruí-lo.

**O convite diz o que o vídeo não mostra.** Repetir *"veja o protótipo completo"* seria repetir o
rótulo que o bloco *as provas do case* já usa. O convite nomeia o tamanho do que ficou de fora:
as 43 telas alcançáveis, os caminhos de erro, os atalhos de quem já pediu. **O vídeo prova que
existe e funciona; o convite diz o que mais existe.**

**E repetir o link aqui não contraria a decisão 155.** Lá a legenda repetia uma tabela que estava
do lado, no mesmo campo de visão. Aqui a curiosidade nasce no capítulo 5 e o bloco de provas fica
no fim da página, a mais de mil pixels. **Repetição a essa distância tem função; a vizinha não
tinha.**

**Consequência de estrutura.** A peça `mídia de prova` tem dois andares, mídia e legenda. O
convite é um terceiro, e por enquanto só esta lacuna o tem. Vira **variante da peça**, não bloco
separado, para a lacuna seguir sendo uma coisa só e a construção seguir lendo um componente.

**Consequência de produção.** Esta lacuna passa a ser **quatro arquivos**: vídeo e pôster, um par
por tema. É a segunda mídia do projeto a custar quatro, depois do vídeo do capítulo 1 do
Finanças, e pelo mesmo motivo.

**O que o peso significa, dito antes de ela gravar.** Na primeira leitura o custo é só o pôster,
que é mais uma imagem. O vídeo só pesa para quem pedir. É a regra *"nada se move sem o leitor
pedir"* resolvendo desempenho de graça, como já tinha acontecido na 046.

---

## 169 · A tolerância da checagem 13 passa a depender de onde o material nasceu

**1 de outubro de 2026**

**Gatilho.** O vídeo do protótipo foi gravado e o pôster reprovou na checagem 13: o fundo saiu
`#EFEBE0` contra o `#F4EFE4` do `bg/page`, errando até 6 pontos por canal, e a folga era 2.

**A causa foi medida antes de eu propor qualquer coisa.** O **branco do app sai exato em
`#FFFFFF`** e só os tons médios se deslocam. Essa é a assinatura de conversão de espaço de cor:
gravação de tela captura em Display P3 e entrega em sRGB, o que **preserva as pontas e move o
meio**. Não é defeito do material, do enquadramento nem da codificação.

**Decisão.** A tolerância passa a depender do campo `origem` em `midias.json`: **2 pontos para o
que vem do Figma, 6 para o que vem de vídeo**. O número 6 é o erro medido, não um arredondamento
confortável.

**Corrigir a cor foi considerado e recusado.** Para puxar o fundo três pontos eu teria que mexer
na curva da imagem inteira, e quem mais se desloca é o **laranja**, que é a cor da marca e o
argumento da mídia do capítulo 4. Trocar fidelidade de marca por pontos de fundo é mau negócio.

**Por que afrouxar não desarma a checagem, dito em número.** O defeito que ela existe para pegar
é o cinza neutro que a ferramenta entrega, e ele erra por **17 pontos** no canal azul: quase três
vezes a folga maior. **Provado nos dois sentidos**, não argumentado: pus o recorte do FigJam como
pôster e ela acusou mesmo com folga 6; escureci o fundo do pôster verdadeiro em 7 pontos, um a
mais que a folga, e ela acusou de novo.

**Ela pediu o registro do motivo junto com o afrouxamento**, e tinha razão de pedir: a decisão
158 avisa que isenção que o defeito escreve sozinha é como uma checagem vira enfeite. A diferença
aqui é que a folga veio de uma medição da ferramenta, não do resultado que eu queria aprovar.

**O defeito que apareceu no caminho, e que não tem nada a ver com cor.** O pôster saía com uma
borda suja de 1px que o corte deveria ter removido, e o quadro bruto estava limpo naquele pixel.
A causa é o **deslocamento ímpar**: cortar em `x=1` numa imagem yuv420 obriga a reamostrar o
plano de cor, que tem metade da resolução, e o resultado herda a borda que o corte tirou.
**Cortar em posição par resolve.** Fica como regra para toda gravação de tela deste projeto:
`crop` com origem e tamanho pares, sempre.

**Consequência.** `reembolso-5-prototipo-claro.mp4`, **700×1340, 21,8 segundos, 690 KB**, de 60
para 30 quadros por segundo, e o pôster de 168 KB tirado do primeiro quadro. O bruto tinha 5,6 MB
e trazia a moldura da seleção de captura nos quatro lados e o controle de parar nos últimos
segundos. **Falta a versão escura**, que é a mesma gravação com o fundo da apresentação em
`#1A1715`.

---

## 170 · A amostra do fundo passou a ser um bloco afastado da borda

**1 de outubro de 2026**

**Gatilho.** Ela regravou o claro e gravou o escuro. Processados, **o escuro reprovou num canto
por 7 pontos e o claro por 1**, com a folga de 6 recém-decidida. Afrouxar de novo seria afrouxar
até passar, que é o oposto de ter uma checagem.

**Dois defeitos diferentes, e nenhum era a tolerância.**

**O primeiro estava no vídeo.** O **primeiro quadro** do escuro sai `#151515`, neutro, e a partir
de 0,1s estabiliza em `#181614`, que é quente e fica a 2 pontos do token. É a cor ainda se
acertando no arranque da gravação. Descartar **os primeiros 0,2 segundos** resolve, e o pôster
passa a ser tirado do primeiro quadro estável. Vale para toda gravação de tela deste projeto.

**O segundo estava na checagem.** Ela amostrava **o pixel exato do canto**, e num PNG tirado de
vídeo o canto é justamente onde a compressão mais erra. Um pixel sozinho mede o artefato, não o
fundo. Agora amostra a **mediana de um bloco de 8 pixels, afastado 4 da borda**, nos quatro
cantos.

**Isso não é afrouxar, é medir melhor**, e a diferença importa: a folga seguiu em 6 e as duas
provas de reprovação continuam acusando. Pus o recorte do FigJam como pôster e ela acusou os
quatro cantos; desloquei o fundo verdadeiro em 7 pontos e ela acusou os quatro de novo. **Medir
no lugar certo melhorou a precisão nos dois sentidos**, não só no que me convinha.

**Consequência.** Os quatro arquivos do capítulo 5 estão prontos e passam: **747 KB e 728 KB** de
vídeo, **167 KB e 154 KB** de pôster, todos 700×1340. O bruto somava 11,8 MB nos dois.

**E a pergunta do fim se respondeu sozinha.** Os dois vídeos agora percorrem a espinha inteira e
terminam em *Acompanhar status*, a tela 13. Ela incluiu o último clique sem eu pedir, e a frase
do capítulo 5, *"do primeiro acesso ao acompanhamento"*, deixou de prometer um passo que o vídeo
não dava.

---

## 171 · O conteúdo ganhou duas convenções: vídeo e convite

**1 de outubro de 2026**

**Gatilho.** Escrever a legenda e o convite do capítulo 5 esbarrou num buraco: **o arquivo de
conteúdo não sabia declarar vídeo nem convite.** A convenção só conhecia imagem com `Legenda:`,
e a decisão 046 tinha criado vídeo um mês antes sem que ninguém escrevesse como citá-lo.

**Vídeo usa a mesma marcação de imagem, e o que o distingue é a extensão.** `![alt](arquivo.mp4)`
em vez de `.png`. A construção lê a extensão e serve vídeo com pôster em vez de imagem.
**Nenhum marcador novo**, porque o que muda é o arquivo, não o papel: nos dois casos é mídia de
prova com legenda embaixo. O pôster é derivado do nome, `<nome>-<tema>-poster.png`, pela mesma
regra de sufixo da decisão 153.

**`Convite:` é linha nova, logo abaixo de `Legenda:`.** E traz a única exceção a uma regra do
case: **é o único lugar do corpo onde um link aparece fora do bloco de provas.** Registrado como
exceção nomeada, não como descuido.

**A checagem 4 aprendeu três coisas**, e cada uma foi provada reprovando de propósito. Mídia sem
texto alternativo. Convite sem link, que seria uma frase solta prometendo um clique que não
existe. E **vídeo sem o pôster ao lado**, que é o defeito mais caro dos três: sem pôster a página
carrega o vídeo inteiro só para mostrar o primeiro quadro, e some a economia que a decisão 046
existe para garantir.

**A peça ganhou o terceiro andar como propriedade, não como variante nova.** `convite` é um
booleano desligado por padrão, e o quadro escondido sai do cálculo do auto-layout. **Quatro
variantes seriam o caminho óbvio e o errado:** o convite não muda com a largura, então cruzá-lo
com `largura` dobraria o conjunto para registrar uma independência.

**O convite repete a forma do bloco de provas de propósito.** Frase em 15/24 secundário, rótulo
em 18/30 médio sublinhado, e *abre em nova aba* ao lado. Mesma forma, mesmo significado: quem já
viu o bloco reconhece o que aquilo faz antes de ler.

**E o rótulo é diferente do que o bloco usa.** Lá é *"Abrir o protótipo"*, aqui é *"Percorrer o
protótipo"*. Mesmo destino, dois rótulos: o do bloco é um índice de provas, o daqui é um convite
no meio da leitura.

**Consequência.** Desktop de 8.134 para **8.251**, estreito de 11.660 para **12.291**. O capítulo
5 cresceu 631px no estreito porque lá a mídia empilha e o aparelho tem 626 de altura. A **lacuna
10 está fechada**, com material, legenda, convite, link e mockup nos dois temas.

---

## 172 · O vídeo é exibido menor do que o arquivo, e o pôster é que acompanha a exibição

**1 de outubro de 2026**

**Gatilho.** *"ficou enorme, diminui essa midia."* Ela pediu o aparelho num tamanho parecido com
o das outras mídias, um pouco maior, não muito.

**O número que faltava era o do aparelho, não o do quadro.** Medi: dentro do vídeo o aparelho
tem **1262 de altura e ocupa 94% do quadro**. Nas mídias do capítulo 4 ele tem **413**. Era três
vezes maior, e era isso que fazia o capítulo inteiro parecer desgovernado. Comparar alturas de
quadro teria escondido a causa, porque a mídia do capítulo 2 também tem 786 e não incomoda: lá
o quadro está cheio de colagem, aqui está cheio de um aparelho só.

**Decisão.** O aparelho vai a **480**, um degrau acima dos 413 das outras. O quadro do vídeo fica
**266×510** dentro da coluna de 411, e a moldura ganha **dois preenchimentos**: `bg/page` por
baixo e o vídeo por cima em `FIT`. Como o fundo do vídeo já é a cor da página, a sobra de cada
lado não se vê, e a decisão 157 segue cumprida sem exceção.

**No desktop as cinco mídias do case passam a medir 786, 254, 487, 487 e 510.** A do vídeo
encosta nas do capítulo 4 por cima, que é exatamente o que ela pediu.

**O arquivo não encolheu junto, e a razão é que eles têm jornadas diferentes.** O vídeo fica em
**700×1340**: é a cópia de melhor qualidade, e **só baixa se alguém pedir**. O pôster **carrega
sempre**, então foi para o tamanho de exibição em tela de alta densidade, **532×1018**, e caiu de
167 para **118 KB** no claro e de 154 para **109 KB** no escuro.

**E isso expôs um custo de ter apagado os brutos cedo demais.** Se o vídeo precisasse encolher,
eu teria que recodificar a partir de um arquivo já comprimido, com perda de geração. Não precisou
desta vez. **Regra que fica: o bruto sai depois que o tamanho de exibição está decidido**, não
quando o arquivo processado fica pronto.

**Consequência.** Desktop de 8.251 para **8.170**, estreito de 12.291 para **12.071**.

---

## 173 · Ela reescreveu a legenda e o convite, e com isso reverteu parte da 168

**1 de outubro de 2026**

**Gatilho.** *"arrumei a legenda e o convite ao link, revise e registre e altere o que for
preciso."* Ela editou a tela **desktop clara**; as outras três ainda tinham o meu texto.

**O que ela escreveu.**

| | antes, meu | agora, dela |
|---|---|---|
| legenda | O pedido mensal inteiro, do toque em Pedir reembolso até o acompanhamento. As cinco etapas com digitação, e a captura inicial que dispensa digitar. | Vídeo do protótipo de pedido de reembolso. |
| convite | O vídeo percorre um caminho só. No protótipo são 43 telas e 145 ligações, com o preparo do primeiro acesso, os caminhos de erro e o atalho de quem já pediu. | Descubra mais navegando pelo protótipo completo. |
| rótulo | Percorrer o protótipo | Abrir o protótipo |

**Isso reverte duas coisas que a 168 e a 171 tinham decidido, e a reversão é dela.** A 168 dizia
que o convite **nomeia o tamanho do que ficou de fora** em vez de repetir *"veja o protótipo
completo"*, e o texto dela é justamente a forma curta. A 171 dizia que o rótulo seria diferente
do que o bloco de provas usa, e ela voltou ao mesmo rótulo. **Registrado como reversão, não como
ajuste**, porque as duas decisões eram minhas e argumentadas, e esconder que foram desfeitas
custaria mais do que elas.

**O mesmo rótulo nos dois lugares tem um argumento que eu não tinha considerado.** Eu quis
diferenciar porque o bloco é índice e o convite é convite. Mas **mesmo destino com rótulos
diferentes é o leitor tendo que descobrir que são a mesma coisa**, e a regra da decisão 047, *a
forma promete o destino*, empurra para o mesmo rótulo, não para dois.

**Propagado para as quatro telas**, com o espaço solto no fim da legenda removido, e levado ao
arquivo de conteúdo. As quatro voltam a dizer a mesma coisa, que é o que a checagem 14 exige.

**Consequência.** O capítulo 5 encolheu de novo: desktop de 8.251 para **8.170** já pela 172, e o
estreito de 12.071 para **11.951** agora, porque o convite caiu de três linhas para uma.

---

## 174 · Fotografia vai em JPEG; o resto continua em PNG

**1 de outubro de 2026**

**Gatilho.** Ela mandou a imagem de capa do case de Reembolso, dois aparelhos sobre fundo
laranja. É **a primeira fotografia do projeto**: tudo que havia antes era captura de tela,
diagrama ou colagem, que são gráficos chapados.

**O número decidiu.** O mesmo quadro a 1252×835, que é 626×417 em tela de alta densidade:

| formato | peso |
|---|---|
| PNG | **1,1 MB** |
| JPEG | **146 KB** |

**Sete vezes e meia**, sem diferença que se veja. PNG guarda cada pixel exato, o que é certo para
texto e cor chapada e é desperdício para gradiente e sombra, que é do que uma fotografia é feita.

**Decisão.** **Fotografia vai em JPEG. Captura de tela, diagrama e colagem continuam em PNG.** A
regra é sobre o conteúdo da imagem, não sobre onde ela aparece.

**WebP seria menor ainda e ficou de fora por um motivo prático:** o ffmpeg desta máquina não traz
o codificador. Servir WebP exigiria um segundo arquivo de reserva para quem não o suporta, o que
dobra o material para economizar bytes que o JPEG já economiza. Registrado para não ser
redescoberto.

**Uma versão só serve aos dois temas, e isso não contraria a decisão 153.** Aquela regra vale
para **mídia de prova**, que sangra na página e por isso precisa do fundo do tema. **Capa é
imagem contida num card**, com recorte definido e borda própria: o fundo laranja dela funciona
igual no claro e no escuro.

**Oito instâncias herdaram de uma vez.** O card varia por **cor**, não por case, e o laranja é a
cor do Reembolso. Pôr a capa nas duas variantes laranja preencheu o índice de Trabalhos nas duas
larguras e nos dois temas, mais o card do próximo case ao fim do Finanças. **Se o card variasse
por nome de case, seriam oito edições em vez de duas.**

**Consequência.** `publico/midias/reembolso-capa.jpg`, 1252×835, 146 KB. A capa do Finanças
continua por montar, e a decisão 059 já avisou que ela **é composição, não captura**, porque o
material bruto daquele case não é 3:2.

---

## 175 · A capa do Finanças tem duas versões, e o motivo não é o fundo

**1 de outubro de 2026**

**Gatilho.** Ela mandou duas imagens para a capa do case de Finanças, uma dizendo *"essa para o
modo escuro"*. A decisão 174, escrita minutos antes, tinha dito que **uma versão só serve aos
dois temas** porque capa é imagem contida num card.

**A 174 não está errada, está incompleta.** Fui comparar as duas e **o fundo é o mesmo azul claro
nas duas**. O que muda é o **produto dentro do tablet**: modo claro numa, modo escuro na outra.
A regra da 174 falava de fundo; esta fala de conteúdo.

**Decisão.** Capa tem **uma versão**, salvo quando o conteúdo dela muda com o tema. Quando o
produto retratado tem tema próprio, a capa acompanha o tema do site.

**E aqui isso deixa de ser simetria e vira argumento.** O produto do Finanças tem um controle de
tema, que se vê no canto da barra lateral das duas imagens. Mostrar a capa clara no site claro e
a escura no site escuro **exibe uma função que ela construiu**, sem uma palavra de texto. O
capítulo 4 daquele case é sobre o design system nos dois temas: a capa passa a provar a abertura
do capítulo antes de o capítulo começar.

**O Reembolso segue com uma só, e isso é consistente.** O app de seguros redesenhado não tem modo
escuro, e o case nunca afirma que tem. **Duas capas ali seriam simetria inventada**, e inventariam
uma função que o trabalho não entregou.

**Como foi montado, e o porquê.** A clara vai nas duas variantes azuis do componente, de onde
todas as instâncias herdam. A escura é **sobrescrita nas quatro instâncias das telas de tema
escuro**, porque **preenchimento de imagem não se vincula a variável** e o modo do tema não
alcança um fill. É a mesma técnica das mídias dos capítulos 2, 3 e 4.

**Consequência.** Os dois slots de capa estão preenchidos e viram **três arquivos**:
`reembolso-capa.jpg` com 146 KB, `financas-capa-claro.jpg` com 109 KB e
`financas-capa-escuro.jpg` com 106 KB. **O índice de Trabalhos deixa de ter buraco** nos dois
temas e nas duas larguras.

---

## 176 · O hero do case é declarado por marcador, não por posição

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** conteudo · `#restricao`

**Gatilho.** A P42 dizia que precisava ser decidida antes de implementar a construção da página
de case, e a implementação começou. O título, a frase de abertura e a tira de destaques estão
dentro do capítulo 1 dos dois arquivos, e a construção não tinha como separá-los sem regra de
posição.

**Decisão.** Os dois arquivos de case ganham `<!-- bloco: hero -->` logo antes do título. O hero
é o título, a frase de abertura e as linhas `**Chave** · valor` que vêm logo abaixo dela; a prosa
do capítulo 1 começa no primeiro parágrafo depois da tira.

**Alternativa descartada.** *Regra por posição*: o primeiro `#` do bloco do case, mais o que o
segue, vira hero. Não tocaria nos arquivos, e é exatamente o tipo de regra que a decisão 006
recusou: um título movido de lugar mudaria o que a página é, em silêncio. *Separar o hero num
bloco próprio antes do primeiro capítulo* exigiria mover texto autoral, para um ganho que o
marcador já entrega.

**Custo aceito.** O fim do hero ainda é definido por forma, não por marcador: termina na última
linha da tira. É a mesma convenção que o contrato de conteúdo já usa para achar a tira.

**Consequência.** P42 sai da lista de perguntas. O `@lacuna` do contrato `case/pagina-de-case.md`
vira cenário real. `hero` passa a valer dentro de um case, como já valia dentro da home.

---

## 177 · O site vai ao ar com as faltas visíveis

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** conteudo · `#escopo` `#restricao`

**Gatilho.** A construção ficou pronta e o caminho de publicação recusaria: faltam a foto, o PDF
do currículo, o endereço do LinkedIn, os repositórios dos dois cases, o arquivo do Figma do
Finanças e as seis mídias do Finanças. Seguindo a decisão 023, o site não iria ao ar até tudo
existir.

**Decisão.** Publicar já, no modo local: o site público mostra os marcadores de falta, nomeando
cada peça, até os materiais chegarem. O modo de publicação continua existindo e continua
recusando; a automação é que passa a construir no modo local, e o diz na primeira linha da saída.

**Alternativa descartada.** *Seguir a 023*: a automação pronta, recusando até o último material
chegar, e o site entrando no ar sozinho depois. Perdeu porque o caminho até o ar precisa ser
visto funcionando agora, com o conteúdo real, para ela revisar e comentar. *Não publicar ainda*:
adiaria justamente a verificação que a Fase 4 manda fazer primeiro.

**Custo aceito.** Quem visitar antes dos materiais vê o andaime: "FALTA · a foto" no lugar da
foto. É a terceira alternativa que a 023 descartou, *lacuna visível sempre, inclusive para quem
visita*, agora escolhida de propósito e por tempo limitado.

**Consequência.** `.github/workflows/publicar.yml` constrói sem `--publicar`. Voltar ao
comportamento da 023 é trocar uma linha nesse arquivo, e deve virar entrada nova quando
acontecer.

---

## 178 · Onde o texto dos cases diverge, vale o que ela deixou no Figma

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** conteudo · `#recusa-de-ia`

**Gatilho.** Ao construir, o dev encontrou o `.md` dos cases e as telas do Figma dizendo coisas
diferentes, e seguia a regra de que no código vale o `.md`. Levou à Larissa caso a caso.

**Decisão.** Nos quatro pontos, vale o Figma, e o `.md` foi atualizado para ficar igual:

| | antes, no `.md` | agora, como no Figma |
|---|---|---|
| capítulo 1, os dois cases | Ideia | A ideia |
| numeração dos capítulos | "1.", "2." no título | some na página; o `.md` guarda o número e a construção o tira, por ser forma |
| Reembolso, capítulo 4 | subtítulo "Onde o arquivo parou de ser desenho" com a frase do protótipo embaixo | sem subtítulo; a frase entra no fim do parágrafo "Com o sistema remontado", como ela fundiu no Figma |
| Reembolso, "No onboarding" | com o parêntese "(que já vêm do cadastro do plano, então é conferir e não digitar)" | sem o parêntese |
| Reembolso, "O que eu faria a seguir" | itens 1, 2, 3 e 5 com a justificativa | só a ação, como no Figma |

**Alternativa descartada.** *Usar o `.md`*, como o dev propôs para o capítulo 4 (renderizar o
título como subtítulo) e para o capítulo 5 (o texto longo). Perdeu porque os cortes no Figma
foram decisão dela, feita depois do `.md`, e o `.md` só não tinha acompanhado.

**Custo aceito.** O capítulo 5 perde os porquês de quatro dos seis próximos passos. Quem quiser
saber por que validar o OCR com engenharia não encontra mais a resposta na página.

**Consequência.** A regra de construção, em que no texto o `.md` ganha do Figma, continua valendo:
o que mudou foi o `.md`, trazido até o Figma, e agora os dois dizem o mesmo. O título de abertura do capítulo 1 do Reembolso não aparece no Figma (o
capítulo começa direto no hero), então "A ideia" ali vem da resposta dela, não da tela.

---

## 179 · O bloco de provas mora no arquivo do case, e o endereço vazio é a falta

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** conteudo · `#restricao`

**Gatilho.** O dev foi construir o bloco "Está tudo aberto." e não achou de onde tirar o texto:
as linhas que dizem o que há em cada prova existiam só no Figma (`245:243` e `245:279`), e os
endereços, quase todos, em lugar nenhum. Texto autoral não pode nascer no código.

**Decisão.** Cada case ganha `<!-- bloco: provas -->`, com uma linha de descrição e, logo abaixo,
o link, por prova. As descrições foram copiadas do Figma como estão. O convite *"Está tudo
aberto."* continua no contrato, por ser interface. **Link com endereço vazio é prova que ainda
falta**, e o site mostra o marcador de falta no lugar. Proposta do dev, aprovada por ela.

**Alternativa descartada.** *Deixar o bloco inteiro no contrato da página de case*, como copy de
interface: as descrições dizem o que cada case produziu, então são conteúdo do case, não da tela.
*Construir a partir do Figma*: faria o código ler texto de uma fonte que a regra de conteúdo não
reconhece.

**Custo aceito.** O endereço de cada prova passa a ser editado no arquivo de texto, longe de onde
ela desenha o bloco. Se mudar uma descrição no Figma, ela precisa ser trazida para o `.md`.

**Consequência.** O Figma já tinha uma prova a mais em cada case, o FigJam, que o contrato não
listava. A tabela de provas de `case/pagina-de-case.md` foi trazida até o Figma. Endereços já
conhecidos foram preenchidos no Reembolso (Figma, FigJam e protótipo); faltam os três do Finanças
e o repositório do Reembolso.

---

## 180 · A ênfase dentro da frase fica marcada, mas não aparece

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** conteudo

**Gatilho.** O `.md` tem negrito e itálico dentro de frases, listas e tabelas; o Figma não mostra
nenhum deles. Só o parágrafo inteiro em negrito vira frase de destaque.

**Decisão.** Seguir o Figma. A ênfase continua marcada no HTML, sem peso nem itálico visível.

**Alternativa descartada.** *Mostrar a ênfase do `.md`*: o texto ganharia pontos de peso que o
desenho não tem, e a frase de destaque deixaria de ser a única coisa com peso no corpo.

**Custo aceito.** O realce que ela escreveu no texto (por exemplo, *"um sistema que o app não
segue"*) não se vê na página. Fica só no HTML, onde leitor de tela ainda pode anunciá-lo.

**Consequência.** Regra nova em `conteudo/arquivo-de-texto-vira-pagina.md`.

---

## 181 · O marca-texto da home cobre "forma melhor de fazer,"

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** home

**Gatilho.** O contrato `home/home.md` dizia que o marca-texto cobria *"forma melhor"*; o Figma
cobre *"forma melhor de fazer,"*, nas duas larguras.

**Decisão.** Vale o Figma. O contrato foi atualizado.

**Alternativa descartada.** *Voltar o Figma ao contrato*: o desenho é o mais recente e é dela; o
contrato só não tinha acompanhado.

**Consequência.** Em 375 o marca-texto passa por duas linhas, *"forma melhor"* e *"de fazer,"*.

---

## 182 · No texto, o Figma manda em todo o site, e os PNGs do capítulo 3 entram como estão

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** conteudo

**Gatilho.** A conferência do dev achou mais dois desencontros. `quem-sou-eu.md` tinha duas frases
na apresentação que o Figma (`116:32`, `132:32`) não tem. E os PNGs `reembolso-3-novo-fluxo-claro`
e `-escuro`, exportados de `474:2375` e `474:2372`, têm cantos `#F5F5F5` e `#2B2824` em vez do
`bg/page`, e a checagem 13 os reprova.

**Decisão.** *"siga o figma já falei pra você atualiza o md pra ficar igual o figma"*: a regra da
178 não vale só para os cases, vale para todo texto do site, e o `.md` acompanha o Figma sem nova
pergunta. As duas frases saíram de `quem-sou-eu.md`. Sobre os PNGs: *"usa esses"*. Entram como
estão.

**Alternativa descartada.** *Perguntar caso a caso*, como eu vinha fazendo: ela já tinha dado a
regra na 178. *Reexportar os PNGs com o fundo da página*, que a 157 pedia: ela escolheu os
arquivos atuais.

**Custo aceito.** Os cantos dos dois PNGs não são a cor da página, e a checagem 13 fica vermelha
por um defeito conhecido e listado. Ela não ganhou isenção: a palavra foi para usar os arquivos,
não para mudar a checagem.

**Consequência.** A página "Quem sou eu" fica da altura do desenho.

---

## 183 · A tira e os títulos do Finanças valem para os dois cases, e as checagens não barram o ar

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** Duas perguntas do dev. No Figma do Reembolso (`144:32`) a tira de destaques não tem
as bordas de cima e de baixo, e os títulos não têm o rastreio negativo; no Finanças (`106:22`)
têm. E o workflow que ele escreveu roda as checagens sem deixar que elas barrem a publicação,
porque a 13 reprova os PNGs do capítulo 3 (decisão 182) e travaria o site desde já.

**Decisão.** O desenho do Finanças vale nos dois cases, como o código já fazia. As checagens rodam
e aparecem no registro, mas **não barram a publicação por enquanto**.

**Alternativa descartada.** *Cada case como está no Figma*: o mesmo componente teria duas formas
sem motivo. *Adotar o Reembolso nos dois*: mudaria o case que já estava certo. *Checagens barrando
a publicação*: o site só iria ao ar depois de os PNGs do capítulo 3 passarem, e ela já decidiu
usar os atuais.

**Custo aceito.** O Figma do Reembolso fica diferente do site na tira e nos títulos até ser
acertado. Uma checagem vermelha não impede mais nada: alguém precisa ler o registro.

**Consequência.** Voltar a barrar é tirar uma linha (`continue-on-error`) do workflow, e deve virar
entrada nova quando acontecer.

---

## 184 · A foto entra recortada em 4:5, tirando do céu e da jaqueta

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** quem-sou-eu

**Gatilho.** Ela mandou a foto (nó `503:1524`, 1086×1448, 3:4) e pediu: coloque no mockup e, se
precisar, corte e redimensione. O espaço desenhado para ela é 4:5 nas duas larguras (`116:48`,
519×649; `132:41`, 327×409).

**Decisão.** Recortar para 4:5 sem reduzir: **1086×1358**, tirando 30 px do céu e 60 px da
jaqueta, para o rosto não descer na moldura. JPEG, pela decisão 174: **188 KB**. Uma versão só
serve aos dois temas, como a capa da 174, porque a foto é contida e não sangra na página. O
recorte nas quatro telas é o mesmo do arquivo, copiado como preenchimento; o nó dela não foi
tocado, só renomeado para `larissa`, a pedido dela.

**Alternativa descartada.** *Encaixar sem cortar*, com faixas ou com a moldura mudando de
proporção: a moldura é desenho dela e vale nas duas larguras. *Cortar só embaixo*: deixaria o
rosto mais alto e o céu inteiro, que é o que menos diz. *Reduzir ao dobro do espaço desktop*
(1038 de largura): ganharia uns poucos KB e perderia a folga para telas mais densas.

**Custo aceito.** A borda de baixo corta a jaqueta mais perto da gola do que a foto original.

**Consequência.** `publico/larissa.jpg`. Os quatro marcadores "FALTA · a foto" saíram do Figma, e
o site deixa de mostrar o seu. Em `materiais-a-produzir.md`, a foto sai da lista do que falta.

---

## 185 · O protótipo abre no fluxo do app, e o contrato larga a tabela que rola

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** Primeira rodada do tester sobre o site publicado (`c6a7f02`). Três apontamentos já
tinham resposta numa regra dela ou numa decisão anterior.

**Decisão.**
- **"Abrir o protótipo"** passa a abrir no único fluxo que ela definiu na página `mockups`,
  *"Primeiro acesso · do onboarding ao primeiro pedido"* (`235:844`). Sem ponto de partida, o
  Figma abria o fluxo da página `apresentação do case` (`41:2`), uma capa antiga que diz *"UX/UI
  Designer Jr."*. Mudou o link nos dois lugares do `.md`; o arquivo dela não foi tocado.
- **"No onboarding…" e "No fluxo mensal…"** (Reembolso, cap. 3) ficam em negrito inteiro no
  `.md`, porque no Figma são parágrafo inteiro em Medium. Pela 180, isso os faz frase de destaque,
  como no desenho. Aplicação da 182: no texto, o Figma manda.
- **`case/pagina-de-case.md` perde a regra da tabela que rola na horizontal.** Ela sobrou de antes
  da 132, que tirou a tabela da tela estreita, e o contrato dizia as duas coisas.

**Alternativa descartada.** *Trocar o fluxo padrão no arquivo do Reembolso*: resolveria o link
sem parâmetro, mas é mexer no arquivo dela para consertar um link nosso.

**Consequência.** Também corrigido o acento de *"heurísticas"* no capítulo 3 do Reembolso, e
preenchidos os links do Figma e do FigJam do Finanças, que existiam desde a 111 e a 179 deixou
vazios por engano meu.

---

## 186 · Os três PNGs claros também entram como estão, e o título do Finanças quebra como no Figma

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** Dois pontos da primeira rodada do tester. A checagem 13 reprovava, além dos dois PNGs
do capítulo 3 que a 182 cobriu, `reembolso-2-diagnostico-claro`, `reembolso-4-telas-de-erro-claro`
e `reembolso-4-sistema-remontado-claro`, de cantos `#F5F5F5` contra o `bg/page` `#F4EFE4`. E na
tela estreita o título do Finanças quebrava *"A planilha que virou / produto"*, quando o Figma
(`108:22`) quebra *"A planilha que / virou produto"*.

**Decisão.** *"usa esses também, siga o figma no título"*. Os três PNGs entram como estão, como os
do capítulo 3. O título do Finanças quebra onde o Figma quebra, por escolha, como a frase da home.

**Alternativa descartada.** *Reexportar os três com o fundo da página*, que a 157 pedia. *Deixar a
largura decidir a quebra*, que o dev tinha deixado depois de tirar o `text-wrap: balance` que pôs
por conta própria: acerta o Reembolso e erra o Finanças.

**Custo aceito.** No tema claro, as três imagens aparecem como uma caixa levemente cinza sobre a
página. A checagem 13 segue vermelha por elas, sem isenção. A quebra do título fica presa ao texto
de hoje: se o título mudar, a quebra precisa ser escolhida de novo.

**Consequência.** Regra nova em `case/pagina-de-case.md`.

---

## 187 · O ícone de aba é um L num círculo do verde do marca-texto

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** moldura · `#escopo`

**Gatilho.** O tester notou que o site não declara ícone de aba e que a primeira página registra um
404 de `/favicon.ico`. Nenhum contrato falava dele.

**Decisão.** *"cria um circulo no verde do marca texto do modo claro com um L dentro"*. Componente
`ícone de aba` (`534:1482`) na página Sistema visual, seção `10 · Ícone de aba`: círculo em
`accent/verde/surface` (`#D9EED4`) e o L em DM Sans Bold, `text/primary` (`#221F20`), os dois
fixos no modo Claro. **É um ícone só para os dois temas.** Arquivos em `publico/icone/`: `icone.svg`,
`favicon.ico` (16, 32 e 48), `icone-192.png`, `icone-512.png` e `apple-touch-icon.png` (180), com
os cantos transparentes.

**Alternativa descartada.** *Deixar sem ícone*: o navegador mostra o genérico, e o console registra
um erro em toda primeira visita. *Duas versões, uma por tema*: o ícone mora na aba do navegador,
cujo tema não é o do site.

**Custo aceito.** O verde é claro: numa aba de navegador clara a borda do círculo quase some e o
que se lê é o L.

**Consequência.** O SVG que o Figma exporta traz o fundo da página e da seção por trás do círculo;
o arquivo publicado foi limpo à mão para conter só o círculo e o L, e os PNGs foram gerados dele.

---

## 188 · O ícone da tela de início ganha o fundo claro, e o manifesto nomeia o site

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** moldura · `#restricao`

**Gatilho.** Publicado o ícone de aba (187), sobraram duas pontas. O iOS não aceita transparência
no `apple-touch-icon` e pinta de preto o que é transparente: o círculo apareceria sobre um
quadrado preto. E os PNGs de 192 e 512 entraram no repositório sem nada que os usasse, porque só
um manifesto os declara, e o manifesto pede nome e cores que ninguém tinha decidido.

**Decisão.** Ela respondeu nas duas: *"usa a cor clara o bg"* e *"nomeia eles"*. O
`apple-touch-icon.png` ganha o fundo claro da página, `bg/page` do tema claro (`#F4EFE4`), atrás
do círculo; o desenho do círculo e do L não muda. O site ganha `manifest.webmanifest`, com nome
**Larissa Quadros**, nome curto **Larissa** (os mesmos de `quem-sou-eu.md`, o curto é o da
barra), e os ícones de 192, 512 e o SVG. Fundo e cor de tema do manifesto usam a mesma cor clara.

**Alternativa descartada.** *Deixar transparente*: o preto do iOS é o pior resultado, uma cor que
ninguém escolheu. *Fundo verde do círculo*: some a forma redonda que é o próprio ícone. *Apagar os
PNGs grandes*: eles foram produzidos para isto, e sem manifesto o Android e o "Adicionar à tela
de início" ficam sem nome nem ícone grande.

**Custo aceito.** No tema escuro, quem fixa o site vê o ícone sobre o creme. É um ícone só para os
dois temas desde a 187, e a tela de início não acompanha o tema do site.

**Consequência.** O manifesto é gerado pela construção, a partir de `quem-sou-eu.md` e de
`tokens.json`, e não existe como arquivo escrito à mão. Todas as páginas o declaram. O PNG
original, transparente, não foi apagado do histórico: está no commit da 187.

---

## 189 · O vídeo do Finanças é gravado com dados de demonstração, e a legenda diz isso

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** O capítulo 1 do Finanças pedia um vídeo do produto em uso, e não havia nenhum. O
produto está em uso por uma pessoa real, com as finanças dela, então o vídeo não podia mostrar o
banco de verdade.

**Decisão.** *"faz um base com dados completos"*. O app (`bigorna`) rodou aqui, em modo de
produção, sobre um banco à parte: o cenário sintético do próprio repositório estendido por script
para doze meses, de novembro/2025 a outubro/2026, com as pendências quase todas resolvidas. Todo
dado é inventado. O roteiro é dela: a home de setembro (*"usa setembro"*), Relatórios na barra
lateral, o DRE alternando Consolidado, PF e PJ, Indicadores Financeiros voltando um mês, e o
Histórico filtrado por Status e Categoria (*"achei curto"*, e ela acrescentou as duas últimas
partes). **A legenda diz "com dados de demonstração"**, porque a frase que o vídeo prova é *"em
uso por uma pessoa real"* e o vídeo não é o uso dela.

`financas-1-produto-em-uso-claro` e `-escuro`: **822×688**, o dobro do espaço desenhado (411×344),
30 quadros, 24 segundos, sem som, 344 KB e 393 KB, com pôster no primeiro quadro. Os quadros foram
capturados direto do navegador em 2x, porque o gravador do navegador grava em 1x e o texto
borrava. O cursor é desenhado na página, porque o navegador automatizado não tem cursor.

**Alternativa descartada.** *Ela gravar a própria tela*, como no protótipo do Reembolso: exporia o
banco real ou exigiria montar um de mentira do mesmo jeito. *O Novo Lançamento como roteiro*, que
eu tinha proposto: ela escolheu os relatórios. *A Evolução Mensal como relatório*: em 1440 o
"Último ano" corta setembro e outubro, defeito do app.

**Custo aceito.** O fundo do vídeo é o do app, não o da página: a checagem 13 reprova os dois
pôsteres, e no claro a mídia aparece como uma caixa, como os PNGs da 186. Os menus do Histórico são
listas nativas, que não aparecem na gravação: o valor muda sem o menu abrir. A legenda e o texto
alternativo são rascunho meu, à espera dela.

**Consequência.** No Figma, o pôster de cada tema nas quatro telas; a linha do capítulo 1 nas duas
desktop cresceu 84 px e tudo abaixo desceu junto. `docs/spec/legendas.json` e `midias.json`
relidos do Figma. A base de demonstração e os scripts ficam fora do repositório, na área temporária
desta sessão.

---

## 190 · A legenda do vídeo pode contextualizar; quem descreve é o texto alternativo

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case · `#recusa-de-ia`

**Gatilho.** Ela escolheu para o vídeo do Finanças a legenda *"Gravado numa janela mais estreita
que a de 1440 em que as telas foram desenhadas, com dados de demonstração."* O vídeo foi gravado
em 960 px para caber no espaço de mídia, e ela achou mais importante dizer isso do que repetir o
percurso. O tester apontou que o contrato pedia o contrário: *"a legenda do vídeo descreve o que
acontece nele, não comenta"*. A legenda do Reembolso, *"Vídeo do protótipo de pedido de
reembolso."* (173), já não cumpria a regra.

**Decisão.** A regra muda. **O texto alternativo descreve o percurso, e a legenda pode
contextualizar**: dizer como o vídeo foi feito ou o que ele é. A alternativa em texto que a WCAG
pede para vídeo sem áudio é o texto alternativo, e os dois vídeos têm um que descreve a sequência
inteira.

**Alternativa descartada.** *Juntar descrição e condição de gravação na legenda*, que eu
recomendei: preservaria a regra, ao custo de uma legenda de duas frases. *Manter a regra e
registrar as duas legendas como exceção*: um contrato com duas exceções em dois vídeos deixa de
dizer o que vale.

**Custo aceito.** Quem enxerga e não dá play não lê o que o vídeo mostra, só o pôster e a
legenda.

**Consequência.** A regra antiga não vinha de entrada do log: estava escrita direto no contrato e no plano de materiais. Muda em `case/pagina-de-case.md` (regra e cenário) e a
nota de `materiais-a-produzir.md`. As duas legendas de vídeo passam a cumprir o contrato como
estão.

---

## 191 · Uma checagem para capítulo que começa antes de o anterior terminar

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** Com o vídeo do capítulo 1 do Finanças (189), a mídia cresceu na 108:22 e na 298:2 e
o capítulo 2 ficou onde estava: 37px por baixo do capítulo 1. O designer corrigiu, mas nenhuma
checagem tinha visto. O tester mostrou por quê: a 11 olha só a altura da tela e a margem final, e
a 10 mede de início a início de capítulo. A Larissa pediu uma checagem para isso, pelo nome:
*"cada capítulo começa depois do fim do anterior"*.

**Decisão.** Checagem 15. O `trilha.json` passa a guardar o fim de cada capítulo, além do início:
`[rótulo, início, fim]`. A checagem reprova quando um capítulo começa antes do fim do anterior, e
também quando o vão entre os dois não é o respiro de capítulo da largura, `space/96` no desktop e
`space/64` na tela estreita, lidos de `tokens.json`. Provada com o defeito real: o estado de antes
da correção, capítulo 1 terminando em 2094 e capítulo 2 começando em 2057, reprova nomeando os
dois capítulos e os 37px.

**Alternativa descartada.** *Cobrar só a sobreposição*: pegaria o defeito de hoje e deixaria
passar o vão que abre a mais, que é o mesmo descuido no sentido contrário. *Medir na página
construída*: o site não tinha o defeito, que estava só no Figma; é lá que a checagem precisa olhar.

**Custo aceito.** O `trilha.json` precisa ser reexportado com o fim sempre que um capítulo mudar
de tamanho, e um export sem o fim reprova em vez de passar calado. Ao reexportar, apareceu que o
arquivo estava velho para o Reembolso: páginas de 7994 e 10778 contra 8170 e 11951 no Figma, e
inícios de capítulo de antes das últimas mudanças. A checagem 10 vinha simulando a trilha do
Reembolso sobre medidas antigas.

**Consequência.** `scripts/checagens.mjs` ganha a 15, e `docs/spec/trilha.json` é relido nas
quatro telas claras de case.

---

## 192 · O capítulo 2 do Finanças mostra a regra e a regra produzindo hotspots

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** A lacuna do capítulo 2 pedia *"a skill e o modelo de domínio, com os hotspots
marcados"*, para provar *"nenhuma lacuna de informação é preenchida por suposição"*. A skill não
estava em lugar óbvio: é `bigorna/.claude/skills/loop-produto/SKILL.md`.

**Decisão.** Uma colagem de dois trechos, empilhados, com as bordas cortando o resto, como a do
capítulo 2 do Reembolso. Em cima, a seção *"Diretriz central: nunca assuma premissas"* da skill e
os quatro quadrantes. Embaixo, a tabela de hotspots do event storming **na versão atual do `.md`**
(*"1 md"*), com H4, H5, H9 e H10: fechado por ADR, modelado e não testado, parcialmente revertido,
fechado por decisão de produto. Montada por mim (*"2 você monta"*), em DM Sans, nas cores do site e
sobre o `bg/page` de cada tema. O texto é literal; os status, que são começos de textos longos,
terminam em reticências. **Os travessões da skill ficam** (*"mantém o travessão"*): é citação.

`financas-2-descoberta-claro` e `-escuro`: 411×794, arquivo em 822×1588.

**Alternativa descartada.** *A tabela de hotspots do HTML*, H1 a H10 na versão v6 do PRD: mostraria
o artefato como era, e ela preferiu o estado atual. *Só os hotspots, sem a skill*: mostraria o
resultado sem a regra que o capítulo diz ter vindo antes. *Trocar o travessão por outra pontuação*:
deixaria de ser o texto do arquivo.

**Custo aceito.** A colagem é recomposta em tipografia do site, não captura de tela dos arquivos:
prova o conteúdo, não a aparência deles.

**Consequência.** No Figma, as quatro telas; o capítulo 2 cresceu 224 px no desktop e 435 na
estreita, e tudo abaixo desceu com o respiro de 96 e 64. `legendas.json` e `midias.json`
atualizados; a checagem 13 passa para as duas versões. Legenda e texto alternativo são rascunho meu.

---

## 193 · A colagem do capítulo 2 mostra os arquivos como arquivo

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case · `#reversao`

**Gatilho.** Publicada a colagem da 192, ela achou que faltava *"um diferenciador visual pra quebrar
essa sensação de muito texto"* e sugeriu uma borda. Os trechos estavam na mesma fonte, tamanho e
cor do texto do capítulo ao lado, e liam como mais texto da página.

**Decisão.** *"arquivo"*. Os trechos passam a aparecer como num editor: fonte monoespaçada, a
marcação do markdown visível em cinza (`##`, `**`, `-`, `|`), números de linha reais à esquerda
(15 a 24 da skill, 755 a 768 do event storming), e as linhas puladas da tabela marcadas como uma
dobra, *"⋯ 3 linhas"*. A tabela agora mostra as quatro colunas do arquivo. **Reverte, da 192, a
recomposição na tipografia do site**; o conteúdo, os cortes e os travessões continuam.

`financas-2-descoberta-claro` e `-escuro`: 411×947, arquivo em 822×1894.

**Alternativa descartada.** *A borda que ela sugeriu*, e *um fundo `bg/subtle` atrás dos trechos*:
os dois são moldura ou superfície própria, exceção à 157, e a borda faria a checagem 13 reclamar.
*Manter a versão da 192*: o problema que ela viu continuava.

**Custo aceito.** A mídia ficou 153 px mais alta no desktop e 122 na estreita. A linha fina que
separa os números do texto é o único traço da peça.

**Consequência.** Figma, as quatro telas reajustadas com o respiro de 96 e 64; desktop com 6668 e
estreita com 10222. Texto alternativo reescrito para a versão nova; a legenda não mudou.

---

## 194 · A colagem do capítulo 2 corta depois do H5

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** A versão de arquivo da 193 ficou com 947 px, e ela: *"ficou grande mesmo, pode cortar"*.

**Decisão.** O segundo trecho termina no H5 (linha 763). Saem a segunda dobra, o H9 e o H10. A peça
volta a 411×795, a altura da 192.

**Alternativa descartada.** *Cortar o trecho da skill*: ele é a regra que o capítulo cita, e o corte
cairia nos quatro quadrantes. *Encolher a fonte*: o texto já está em 12,5 px.

**Custo aceito.** A tabela mostra só dois status, fechado e modelado sem teste; os casos revertido e
fechado por decisão de produto deixam de aparecer.

**Consequência.** Figma reajustado: desktop com 6516, estreita com 10101, respiros de 96 e 64. Texto
alternativo e `midias.json` atualizados.

---

## 195 · O capítulo 3 do Finanças junta fluxo, wireframe e especificação da mesma tela

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** A lacuna do capítulo 3 pedia *"fluxo mapeado ao lado de uma especificação de tela"*,
para provar *"quem fosse implementar não deveria precisar me perguntar nada que já não estivesse
escrito"*.

**Decisão.** Três trechos da mesma tela, o Novo Lançamento, empilhados:
- **o fluxo**, recorte real do board do FigJam (Novo Lançamento → 4 abas), cortado nas bordas;
- **o wireframe**, do Figma do Finanças (`262:873`, modal `6:29`), no bloco Informações básicas até
  o Status, quase em tamanho real; ela perguntou se cabia, e cabia;
- **a especificação**, linhas 125 a 130 de `01-especificacao-de-telas.md`, na versão de arquivo da
  193.

Os mesmos campos aparecem no wireframe e na especificação: *"pré-preenchida com hoje"* e
*"padrão Pago"* se conferem no desenho. **No tema claro o fluxo fica sem o fundo do FigJam**, direto
sobre a página; **no escuro, com o cinza do FigJam atrás** (*"a da direita"*). O wireframe é branco
nos dois temas, porque é a superfície do próprio modal. Os travessões da especificação ficam por
serem citação.

`financas-3-desenho-claro` e `-escuro`: 411×798, arquivo em 822×1596.

**Alternativa descartada.** *O fundo escuro também atrás do fluxo escuro*: as setas, cinza-escuro no
FigJam, sumiam. *Redesenhar o ramo nas cores do site*: ela preferiu o board real. *A peça sem
wireframe* (722 px): perdia o "o que a pessoa vê". *A peça com wireframe até a Entidade* (889 px):
alta demais; cortada no Status, voltou para perto dos 795 do capítulo 2.

**Custo aceito.** No escuro, o cinza do FigJam e o branco do wireframe aparecem como painéis claros
sobre a página. **A checagem 13 passa, mas só porque amostra os quatro cantos**, e os cantos caem nas
linhas de nome de arquivo e de especificação, sobre o `bg/page`. O texto das caixas do fluxo fica
perto de 11 px, abaixo do piso de 13, como no capítulo 3 do Reembolso.

**Consequência.** Figma, as quatro telas; desktop com 6652, estreita com 10563, respiros de 96 e 64.
Legenda e texto alternativo são rascunho meu.

---

## 196 · A especificação do capítulo 3 volta a mostrar Entidade e Categoria

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** Publicada a 195, ela pediu *"aumenta a especificação de tela"*: *"mais linhas"*, sem
mudar o tamanho da letra.

**Decisão.** O trecho da especificação vai de 125 a 132: voltam Entidade (*"padrão PF"*) e Categoria
(*"cria categoria nova inline sem sair do formulário"*). O wireframe continua cortado no Status. A
peça passa a 411×855, arquivo em 822×1710.

**Alternativa descartada.** *Letra maior no mesmo trecho*, e *as duas coisas*: ela escolheu só as
linhas.

**Custo aceito.** A peça fica 57 px mais alta que a da 195, e mais alta que a do capítulo 2. As duas
linhas novas não têm par no wireframe recortado.

**Consequência.** Figma reajustado: desktop com 6709, estreita com 10608, respiros de 96 e 64. Texto
alternativo e `midias.json` atualizados.

---

## 197 · O wireframe do capítulo 3 fica mais estreito, centralizado e mostra até a Categoria

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** Depois da 196, ela pediu para aumentar *"um pouco a tela do wireframe"*, ganhando altura
com uma largura menor; vista a primeira versão (360 px), *"diminui mais um pouco a largura [...] sem
aumentar altura, e centraliza ele"*.

**Decisão.** O wireframe passa a 320 px de largura, centralizado na coluna, e o recorte do modal
desce até o começo de *Classificação (sugerida)*: mostra Valor, Data de pagamento, Status, Entidade
(PF selecionado) e o campo Categoria (*"Buscar ou criar categoria…"*). **Todas as linhas da
especificação, 128 a 132, ganham par no desenho.** A peça fica com 411×970, arquivo em 822×1940.

**Alternativa descartada.** *360 px de largura, recorte até a Categoria*: mesma altura, menos tela.
*Parar na Entidade* ou *estreitar para manter os 855*: ela preferiu mostrar mais.

**Custo aceito.** A peça é a mais alta dos três capítulos. A letra do wireframe fica a dois terços do
tamanho real.

**Consequência.** Figma reajustado: desktop com 6824, estreita com 10700, respiros de 96 e 64. Texto
alternativo e `midias.json` atualizados.

---

## 198 · O fluxo do capítulo 3 segue o wireframe: 320 px, centralizado, e volta o "Salva, sucesso"

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** *"faz esse trabalho também com o fluxo, diminui o tamanho assim cabe mais do fluxo"*, logo
depois da 197.

**Decisão.** O recorte do FigJam passa a 320 px de largura, centralizado, como o wireframe, e desce
até mostrar *"Salva, sucesso"* inteiro: Novo Lançamento → 4 abas → Salva, sucesso. No escuro, o
retângulo cinza do FigJam encolhe junto. A peça fica com 411×1031, arquivo em 822×2062.

**Alternativa descartada.** *Manter a altura do fluxo* e mostrar só metade do "Salva, sucesso": ficaria
uma caixa cortada no meio, sem servir de borda nem de conteúdo.

**Custo aceito.** A peça ganha 61 px e o texto das caixas fica perto de 9 px na página, legível só
porque cada caixa tem poucas palavras.

**Consequência.** Figma reajustado: desktop com 6885, estreita com 10748, respiros de 96 e 64. Texto
alternativo e `midias.json` atualizados.

---

## 199 · O capítulo 4 do Finanças mostra o par PF/PJ em uso e o contraste que reprovou

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** A lacuna do capítulo 4 pedia *"o par PF/PJ nos dois temas, com os números de
contraste"*, para provar *"passava no contraste no tema claro e reprovava no escuro"*. O registro do
Finanças (`files_design/07-style-guide.md`) conta a reprovação por outra métrica: *"ΔE 13,5, abaixo de
15"*, separação entre as duas cores, não contraste. Não reproduzi o 13,5: pela CIEDE2000 o par do
claro dá 22,1 e o do escuro, 27,7.

**Decisão.** Medir o contraste, que é a palavra do case. Pela fórmula da WCAG, contra o card de cada
tema (`#FFFFFF` e `#161B21`), com o mínimo de 3:1 para gráfico: no claro, PF 4,56 e PJ 5,99; **no
escuro com o par do claro, PJ 2,89, reprova**; no escuro com o par corrigido, PF 5,80 e PJ 5,13. A
peça tem o card *Lucro Líquido por entidade* recortado do mockup da Evolução Mensal nos dois temas
(`406:4` e `427:30`), em 320 px e centralizado, e embaixo as três situações, com amostras de barras
desenhadas nas cores reais. **O ΔE 13,5 fica fora** (*"deixa fora"*).

`financas-4-design-system-claro` e `-escuro`: 411×710, arquivo em 822×1420.

**Alternativa descartada.** *Citar o ΔE 13,5 como "medido no projeto"*: um número que não se
reproduz não sustenta a afirmação. *Só as amostras, sem o gráfico*: o par não apareceria em uso.

**Custo aceito.** O "antes" não existe em tela nenhuma: as amostras são desenhadas, não recortadas. Os
dois cards do gráfico aparecem como painéis, branco e escuro, no meio da peça; a checagem 13 passa
pelos cantos.

**Consequência.** Figma, as quatro telas; o capítulo 4 cresceu 430 px no desktop (tela com 7315) e 392
na estreita (11140), respiros de 96 e 64. Legenda e texto alternativo são rascunho meu. O case e o
registro do Finanças continuam dizendo coisas diferentes sobre a métrica: o case diz contraste, o
style guide diz ΔE.

---

## 200 · A peça do capítulo 4 ganha respiro embaixo, porque a checagem 13 a reprovou

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** Logo depois da 199, antes de publicar: a checagem 13 reprovou as duas versões no canto
inferior esquerdo. A última amostra (`#161B21`) encostava no rodapé, e a checagem amostra um bloco
afastado da borda (decisão 170), que caía dentro dela.

**Decisão.** A peça ganha um respiro de 10 px embaixo, e o canto volta a cair no `bg/page`. Passa a
411×734, arquivo em 822×1468; o capítulo 4 fica com 894 no desktop (tela com 7339) e 1426 na estreita
(11159).

**Alternativa descartada.** *Afrouxar a checagem para esta peça*: o defeito era real, a mídia não
sangrava na página naquele canto.

**Consequência.** Os números da 199 sobre tamanho e altura valem com esta correção.

---

## 201 · O capítulo 5 do Finanças compara o DRE, a tela mais fiel ao mockup

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** A lacuna do capítulo 5 pedia *"mockup e produto rodando lado a lado"*, para provar *"fiel
ao que eu tinha desenhado e documentado"*. Ela escolheu a Home, empilhada. Rodado o produto com o
cenário original do repositório e o relógio em julho de 2026, **a Home não estava igual ao mockup**:
dez pendências contra cinco (o servidor calcula pela data real) e outro desenho de cartão. A
Evolução Mensal também divergia (uma barra por mês no Consolidado, contra PF e PJ lado a lado). A
barra lateral é diferente nas três.

**Decisão.** *"usa o DRE"*, a tela mais fiel: o mockup (`397:2` e `448:26`) e o produto rodando no
mesmo trecho, do título ao Lucro Líquido, empilhados na largura inteira da coluna. Igual: título,
seletores, mês e as catorze linhas da cascata, com os mesmos rótulos e sinais. Diferente: os valores
e o destaque dos subtotais. Legenda curta, por pedido dela: *"O mesmo DRE no mockup e no produto
rodando."*; as diferenças ficam ditas no texto alternativo.

`financas-5-desenvolvimento-claro` e `-escuro`: 411×678, arquivo em 822×1356.

**Alternativa descartada.** *A Home*, como ela pediu primeiro: mostraria o contrário do que a frase
promete. *Uma peça dividida ao meio*: mais difícil de ler. *Rever a frase do capítulo antes da
mídia*: ela preferiu a tela fiel.

**Custo aceito.** O texto dos dois recortes fica perto de 5 px na página: a peça se lê pela forma.
**A frase "fiel ao que eu tinha desenhado" continua mais forte que o que as telas mostram**: o
produto segue a estrutura e as regras, não o desenho pixel a pixel, e a barra lateral é outra.

**Consequência.** Figma, as quatro telas; o capítulo 5 cresceu 370 px no desktop (tela com 7709) e 318
na estreita (11477), respiros de 96 e 64. O app de demonstração roda com um banco à parte, do
cenário original, fora do repositório.

---

## 202 · O texto alternativo do capítulo 5 passa a listar todas as diferenças

**Quando** 2026-10-01 · **Fase** 4 · **Domínio** case

**Gatilho.** O tester apontou que o texto alternativo da 201 dizia só *"mudam os valores e o destaque
dos subtotais"*, e na peça mudam também o tamanho do Lucro Líquido, o seletor de mês (botão com
contorno no mockup, texto solto no produto) e a frase de ajuda abaixo dos seletores. Quem usa leitor
de tela recebia uma descrição mais igual do que a imagem é.

**Decisão.** O texto alternativo lista as cinco diferenças. A legenda curta não muda.

**Alternativa descartada.** *Manter o texto alternativo enxuto*: descreveria a imagem errado.

**Consequência.** Correção também de um número da 201: a cascata tem **treze** linhas, não catorze,
nas duas telas.

---

## 203 · O capítulo 6 do Finanças mostra o produto rodando em duas telas que só ele calcula

**Quando** 2026-10-02 · **Fase** 4 · **Domínio** case

**Gatilho.** A última lacuna do Finanças pedia *"capturas do produto rodando de verdade"*, para provar
*"o produto existe, funciona e está em uso"*. O vídeo do capítulo 1 e o DRE do capítulo 5 já mostram o
produto rodando, então o capítulo 6 mostra o que nenhum dos dois mostrou: interface gerada pelos dados.

**Decisão.** Duas capturas do produto rodando, com a base de demonstração de um ano, em setembro, numa
janela de 960 px como a do vídeo: o bloco **Onde Está Meu Dinheiro** da Home (o treemap de contas e
investimentos, com o patrimônio líquido) e os **Indicadores Financeiros** do mês. Legenda curta, por
pedido dela: *"O produto rodando: onde está o dinheiro e os indicadores do mês."* O texto alternativo
diz que os dados são de demonstração.

`financas-6-resultados-claro` e `-escuro`: 411×768, arquivo em 822×1536.

**Alternativa descartada.** *Despesas por Categoria*, a segunda captura que eu tinha proposto: ela viu
algo errado (*"despesas por categoria tem alguma coisa errada"*); o que eu vi foi um bloco estreito sem
rótulo e o "Outras" engolindo a parcela do financiamento. *Evolução Mensal*: corta o eixo em 960 e em
1440, e em 960 para em agosto. *Balanço Patrimonial*: repete os saldos do Onde Está Meu Dinheiro.

**Custo aceito.** Os dados não são os da pessoa que usa o produto: a frase *"está em uso"* fala dela, e
a imagem mostra o produto, não o uso dela. Os três defeitos achados no caminho (o treemap de despesas,
o eixo da Evolução Mensal e as diferenças entre a Home e o mockup, da 201) são do repositório do
Finanças e ficam para lá.

**Consequência.** Figma, as quatro telas; o capítulo 6 cresceu 484 px no desktop (tela com 8193) e 390
na estreita (11867), e o bloco de provas desceu junto, a 96 e 64. **Com isso, as seis mídias do
Finanças estão entregues**, e as onze lacunas de mídia dos dois cases têm legenda; todas são rascunho
meu à espera dela.

---

## 204 · No Finanças, texto e mídia correm em colunas separadas

**Quando** 2026-10-02 · **Fase** 4 · **Domínio** case

**Gatilho.** Com as seis mídias no lugar, ela: *"não gosto como a area da midia vaza a area de texto,
as midias desse case são maiores que os textos [...] tentar manter esse alinhamento com a hora que
são mencionados prejudica a fluidez do texto"*. Cada capítulo tinha a altura da maior das duas
colunas, e a mídia, mais alta, abria um vão embaixo de cada texto.

**Decisão.** No desktop do Finanças, as colunas se dissociam. **O texto** segue com 96 entre
capítulos; **a mídia** segue com os mesmos 96 entre uma mídia e a próxima, na ordem, e nunca começa
antes do próprio capítulo. Feito isso, a coluna de mídia terminava em 6108 e a de texto em 4320; por
sugestão minha, aceita (*"leva a mídia do 6 pra baixo do texto"*), **a mídia do capítulo 6 desce para
baixo do próprio texto**, a 32 dele. As colunas terminam em 5180 e 5184, e o bloco de provas vem 96
depois. A tela desktop vai de 8289 para 6941.

Junto, aprovadas antes: **moldura** com a textura de pontos do FigJam (`451:1725`, a mesma do capítulo
4 do Reembolso) atrás das partes estreitas dos capítulos 3 e 4, só no tema claro; no escuro, sem
moldura e **alinhadas à esquerda** (*"no modo preto acho que da pra alinhar a esquerda"*). Capítulo 3
com 411×1095, capítulo 4 com 411×766.

**Alternativa descartada.** *Manter cada mídia ao lado do seu capítulo*: é a regra que causava o vão.
*Mover outra mídia para baixo do texto*: a do 6 era a mais atrasada em relação ao próprio capítulo.

**Custo aceito.** A partir do capítulo 3, a mídia aparece depois do texto que a menciona, não ao lado:
a do capítulo 5 começa quase 600 px depois do texto do capítulo 5. A tela estreita não muda.

**Consequência.** Regra nova em `case/pagina-de-case.md`, só para o Finanças; o Reembolso mantém a
mídia alinhada ao capítulo. A construção do site precisa mudar para o desktop do Finanças.

---

## 205 · Os capítulos 5 e 6 do Finanças trocam duas mídias pequenas por um par de telas grandes

**Quando** 2026-10-02 · **Fase** 4 · **Domínio** case · `#reversao`

**Gatilho.** *"é legal a ideia de mostrar o mockup ao lado do produto [...] mas no fim os resultados são
duas telas iguais ocupando espaço [...] e na mídia do último capítulo [...] as telas estão tão pequenas
que nem mostram direito o produto real"*.

**Decisão.** Reverte as mídias da 201 (capítulo 5) e da 203 (capítulo 6). No lugar das duas, **uma peça
só**: a Home e o DRE do produto rodando, com a base de demonstração, em setembro, cada uma com um título
em cima e **uma legenda embaixo das duas**, *"A Home e o DRE do produto rodando, com dados de
demonstração."* No desktop, as duas lado a lado na **largura inteira do conteúdo** (1063), depois do
texto do capítulo 6 e 96 depois da coluna de mídia; em tela estreita, uma embaixo da outra. **O
capítulo 5 fica sem mídia.** Capturas numa janela de 1100×720; cada tela aparece com 515 de largura,
pouco menos da metade do tamanho real. Respiro de 10 embaixo de cada uma, pela checagem 13.

`financas-6-produto-home` e `financas-6-produto-dre`, claro e escuro: 515×376, arquivo em 1030×752. O
conteúdo declara o par com um marcador novo, `<!-- bloco: par -->`.

**Alternativa descartada.** *Uma tela por capítulo*, e *o par na coluna de mídia* (cada tela com uns
200 px) ou *sangrando a tela toda*: ela escolheu uma peça só, na largura do conteúdo, com Home e DRE.

**Custo aceito.** O texto do produto fica perto de 6 a 7 px na página: legível nos títulos e valores
grandes, não nas linhas pequenas. O capítulo 5 deixa de ter prova visual própria; a frase *"fiel ao que
eu tinha desenhado"*, que a 201 provava com o mockup, fica sem imagem.

**Consequência.** Figma, as quatro telas: as mídias do capítulo 5 ficam ocultas, e a do 6 vira o par;
desktop com 6639, estreita com 11212. `case/pagina-de-case.md` e `arquivo-de-texto-vira-pagina.md`
ganham a regra e o marcador. Saem de `publico/midias/` os arquivos da 201 e da 203. A checagem 4 e a
construção precisam aprender o marcador novo, e `legendas.json` perdeu a lacuna do capítulo 5.

---

## 206 · O par do capítulo 6 mostra os mockups, não o produto rodando

**Quando** 2026-10-02 · **Fase** 4 · **Domínio** case · `#reversao`

**Gatilho.** Ela pediu a Evolução Mensal no lugar da Home do par da 205, e perguntou *"por que tá saindo
diferente do figma?"*. O produto rodando diverge do mockup: na Evolução Mensal, o Consolidado tem uma
barra azul por mês em vez das barras de PF e PJ lado a lado, sem legenda e sem o valor em destaque, e o
rótulo do eixo sai cortado; no DRE, os subtotais perdem a faixa e o Lucro Líquido perde o destaque; a
barra lateral é outra. A cópia local do `bigorna` (`feat/produto-e-backend`, 14/09) já inclui os
branches de fidelidade ao Figma, e o `origin/main` só tem o merge dela: a diferença está no código, e é
de aparência, não de funcionamento.

**Decisão.** *"vamos por o mockups então"*. Reverte da 205 o conteúdo do par: no lugar das capturas do
produto, **os mockups da Evolução Mensal (`406:4` e `427:30`) e do DRE (`397:2` e `448:26`)** do Figma
do Finanças, recortados na mesma proporção, com os títulos *"Figma · mockup da Evolução Mensal"* e
*"Figma · mockup do DRE"*. Legenda: *"A Evolução Mensal e o DRE, no desenho do produto."* O formato da
205 continua: par na largura inteira do conteúdo, lado a lado no desktop, empilhado no estreito.

`financas-6-mockup-evolucao` e `financas-6-mockup-dre`, claro e escuro: 515×376, arquivo em 1030×752.

**Alternativa descartada.** *Mostrar o produto como ele é*: mostraria justamente o que não seguiu o
desenho. *Corrigir o produto antes de capturar*: é trabalho no repositório do Finanças, fora deste
projeto. *Procurar telas do produto que já batam com o mockup*: ela preferiu os mockups.

**Custo aceito.** O capítulo 6 afirma *"o produto existe, funciona e está em uso"* e a mídia dele mostra
o desenho. A única imagem do produto rodando no case passa a ser o vídeo do capítulo 1.

**Consequência.** Figma, as quatro telas, sem mudança de altura. As divergências entre o produto e o
mockup ficam como achado para o repositório do Finanças, junto das que a 201 e a 203 já registraram.

---

## 207 · No Finanças, o texto vem antes da mídia no HTML, e um script posiciona as mídias

**Quando** 2026-10-05 · **Fase** 4 · **Domínio** case

**Gatilho.** A construção da 204 coube só em CSS, com a mídia flutuando a partir da primeira linha do
capítulo, e para isso ela vinha **antes** do texto no HTML. O tester mediu o efeito: o leitor de tela
anunciava o texto alternativo e a legenda antes dos parágrafos que a mídia prova, e em 375 a tela
mostrava o texto antes da mídia, o contrário do que se lia. Fere a WCAG 1.3.2 (sequência com
significado); o ponto do foco do teclado (2.4.3) ele mesmo descartou, porque o texto do capítulo 1 não
tem nada focável.

**Decisão.** *"vai com o script"*. O HTML volta a ter o texto antes da mídia em cada capítulo. No
desktop, um script calcula a posição de cada mídia pela regra da 204. **Sem script, a mídia cai para
depois do texto**, como no Reembolso: o site perde a coluna lateral, nunca o conteúdo.

**Alternativa descartada.** *Manter a mídia antes no HTML*, como estava: descumpre o nível AA que o
site promete. *Procurar uma saída só com CSS*: a regra "nunca antes do próprio capítulo, nunca por
cima da anterior" depende de medir alturas, e nenhum caminho conhecido faz isso sem calcular.

**Custo aceito.** O desktop do Finanças passa a depender de script para o layout em duas colunas. É a
exceção que a regra da casa admite: o HTML entrega o conteúdo, o script acrescenta a disposição.

**Consequência.** Regra em `case/pagina-de-case.md`. A construção e os testes de layout da 204 mudam.

---

## 208 · O texto do Finanças nasce no layout de colunas, e as mídias aparecem já no lugar

**Quando** 2026-10-05 · **Fase** 4 · **Domínio** case

**Gatilho.** Implementando a 207, o dev apontou um salto estrutural: o script só mede depois que o texto
está montado, e o `moldura.js` carrega com `defer`. Numa conexão lenta, a página pintaria no layout sem
script e, um instante depois, o texto dos capítulos 2 a 6 subiria e as mídias mudariam de lugar. Ele
também leu o "sem script" da 207 como o layout do Reembolso (mídia ao lado, capítulo esperando a
mídia), e não como mídia empilhada embaixo do texto; a leitura dele ficou.

**Decisão.** *"vai com a A"*. O `<head>` marca a página como "com script" antes da primeira pintura, como
já faz com o tema, e o CSS monta o texto com os vãos de 96 desde o começo: **o texto nunca se mexe**. As
mídias e o par ficam invisíveis até um script curto, logo depois dos capítulos e sem `defer`, calcular as
posições e mostrá-las já no lugar. Recalcula ao redimensionar, quando a fonte carrega e quando cada
imagem carrega. Sem script, o layout do Reembolso.

**Alternativa descartada.** *B*: o cálculo no `moldura.js`, com `defer`; o texto também não salta, mas as
mídias ficam invisíveis mais tempo numa conexão lenta. *C*: nascer no layout do Reembolso e reorganizar
quando o script rodar; é o salto visível.

**Custo aceito.** Um script de umas 30 linhas no meio da página, bloqueando a leitura do HTML por
instantes. Numa conexão muito lenta, a mídia pode surgir um instante depois do texto, sem deslizar.

**Consequência.** Regra em `case/pagina-de-case.md`, corrigindo também o "sem script" da 207.

---

## 209 · O "+44,4% vs. junho" fica no recorte do capítulo 4

**Quando** 2026-10-05 · **Fase** 4 · **Domínio** case

**Gatilho.** O tester observou, na rodada 15, que o recorte do card do mockup no capítulo 4 mostra
*"R$ 10.400,00 · +44,4% vs. junho"* sobre barras de fevereiro a abril: o número fala de meses que não
aparecem.

**Decisão.** *"pode deixar assim a mídia é claramente um recorte de algo maior"*. A peça não muda.

**Alternativa descartada.** *Tirar o número do recorte*, que eu recomendei, e *recortar maio a julho*.

**Custo aceito.** Quem ler com atenção pode estranhar o junho.

---

## 210 · O currículo vai ao site como está, com o telefone

**Quando** 2026-10-05 · **Fase** 4 · **Domínio** quem-sou-eu · `#escopo`

**Gatilho.** Ela pôs o PDF do currículo no projeto. Ele traz dados que o site ainda não tinha: o
telefone, o nome completo (*Larissa Lopes de Quadros*) e a cidade (*Florianópolis, SC*). O repositório
e o site são públicos.

**Decisão.** *"2"*: publicar como está. `publico/curriculo.pdf`, 36,6 KB. Os metadados do arquivo não
trazem nada pessoal (autor *Un-named*, gerado no LibreOffice).

**Alternativa descartada.** *Tirar o telefone do PDF antes*, que eu recomendei. *Deixar o currículo só
no LinkedIn* e tirar o link do site.

**Custo aceito.** O telefone fica num arquivo público, indexável por buscador, e no histórico do Git
mesmo que o arquivo seja trocado depois. O currículo diz *Product Designer · UX/UI*; o site diz *UX
Designer*.

**Consequência.** A falta do currículo some do site.

---

## 211 · Home e Trabalhos cabem na janela do desktop, sem rolagem

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** home · `#escopo`

**Gatilho.** *"a tela da home e dos trabalhos devia caber inteira sem rolagem"*. Medido no site: em
1366×768, a Home passava 211 px e Trabalhos 218 px; mesmo em 1440×900, 79 e 111, sem contar a barra do
navegador.

**Decisão.** No desktop, as duas páginas ocupam a altura da janela e cabem inteiras, com o conteúdo
centralizado entre a barra e o pé. Referência mínima **1366×768** (uns 650 px visíveis), escolhida por
ela, só desktop. No mínimo: a frase da Home em 64 e o parágrafo em 22; o título de Trabalhos numa
linha, em 40; as capas com 285 de altura. Em janelas mais altas, tudo cresce até o tamanho original.
Abaixo do mínimo, rola. Desenhado em oito quadros (dois temas, duas alturas, 650 e 790), numa seção
de proposta, e aprovado.

**Alternativa descartada.** *Referência 1440×900*: o ajuste seria menor, e quem tem um notebook comum
rolaria. *Incluir o celular*: em Trabalhos, os dois cards empilhados pedem quase 1200 px. *Respiros
fixos e conteúdo do tamanho original*: é o que não cabe.

**Custo aceito.** O título da Home perde força no mínimo. As capas ficam panorâmicas e são recortadas
pelo centro: o topo do tablet do Finanças e o dos celulares do Reembolso saem cortados; recompor as
capas no formato baixo fica como possibilidade, não como pedido.

**Consequência.** Regras em `home/home.md` e `trabalhos/indice-de-trabalhos.md`. A capa baixa vale só
em Trabalhos; o card do próximo case continua em 3:2. O site precisa medir a altura da janela.

---

## 212 · Os espaços da 211 voltam à escala, e abaixo de 1280 de largura vale o desenho do mínimo

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** home

**Gatilho.** Três pontos do dev e um do tester depois da 211. Dois espaços fora da escala (72 entre a
frase e o bloco da Home em 790; 20 no texto do card em 650). O salto do respiro ao redimensionar,
porque a regra vai por degraus. A largura: entre 1024 e 1279, a frase da Home quebrava sozinha em
quatro ou cinco linhas, contra a quebra escolhida do contrato, e em 1024 a janela mais alta rolava e a
mais baixa não; isso vinha de antes da 211. E onde listar as medidas novas sem token, agora que o
trabalho vai direto na `main`, sem PR.

**Decisão.** *"vai com as quatro"*, todas propostas minhas:
1. **72 vira 64, e 20 vira 24**, da escala de espaço. Home em 790 com 42 de respiro; Trabalhos em 650
   com 33.
2. **Degraus**, sem interpolar: só aparecem tamanhos desenhados.
3. **Abaixo de 1280 de largura, vale o desenho do mínimo**, qualquer que seja a altura: a frase fica
   nas três linhas escolhidas, e as duas páginas cabem.
4. **As medidas novas sem token entram na P65**: 64, 80, 22/33, 40/48, 28/36, 285 e 314.

**Alternativa descartada.** *Interpolar com clamp*: contínuo, mas cria tamanhos que ninguém desenhou.
*Aceitar a quebra automática entre 1024 e 1279*: contraria o contrato da Home. *Manter 72 e 20*: fogem
da escala sem motivo de leitura.

**Custo aceito.** Quem arrasta a janela vê o respiro mudar de uma vez nos pontos de degrau. Entre 1024
e 1279, uma janela alta mostra a Home no tamanho do mínimo, com sobra de respiro.

**Consequência.** Figma: os quatro quadros afetados reajustados. `home/home.md`,
`trabalhos/indice-de-trabalhos.md` e a P65 atualizados.

---

## 213 · Abaixo de 1120 de largura, o título de Trabalhos quebra onde ela escolheu

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** trabalhos

**Gatilho.** Depois da 212, o dev e o tester mediram que Trabalhos não cabia em toda janela de desktop
com 650 de altura: abaixo de 1120 de largura, o título em 40 não cabe numa linha e a página rola (31 a
62 em 650, 11 a 12 em 700; de 789 de altura em diante, cabe). E, entre 1024 e 1100, em qualquer altura,
o título quebrava sozinho com *"eles."* isolado na segunda linha.

**Decisão.** *"vai assim"*, proposta minha. Abaixo de 1120 de largura, o título usa a quebra escolhida
em duas linhas do desenho de 790, *"Dois problemas que eu vi de perto, / e o que fiz com eles."*, em
qualquer altura. O cenário passa a prometer a página sem rolagem a partir de 1120 de largura **ou** 790
de altura.

**Alternativa descartada.** *Um degrau menor abaixo de 1120*, com título menor: pediria desenho novo
para janelas fora da referência. *Manter o cenário como estava*: prometeria o que o site não cumpre.

**Custo aceito.** Janelas ao mesmo tempo estreitas (menos de 1120) e baixas (menos de 790) rolam um
pouco, até 62 em 1024×650.

**Consequência.** `trabalhos/indice-de-trabalhos.md`: regra e cenário ajustados, e um cenário novo para
o título em janela estreita.

---

## 214 · O repositório do Reembolso vai a público num repositório novo, sem as capturas reais

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** A prova "Ver o repositório" do Reembolso precisava de endereço, e o repositório do case
(`lariquadrinhos/case-sulamerica`) é privado. O histórico dele guarda, num commit anterior a
*"Remove the real user's screenshots from the repository"*, as 32 capturas do app real e um `.zip`, com
nome, CPF, dados bancários e foto de identidade da pessoa que acompanhou o projeto. Torná-lo público
expunha tudo isso a quem voltasse no histórico. Na varredura do estado atual, sobrava uma captura real,
`entregaveis/case-imagens/fluxo-atual-erro-de-data.png`, com as datas de sessões de terapia.

**Decisão.** *"vai com a 1"*: um repositório público novo, **`lariquadrinhos/case-reembolso`**, com o
estado atual em **um commit só**, assinado por Larissa Quadros. *"pode excluir todas as capturas de
tela"*: a captura real saiu, junto da linha que a exibia em `case-study-reembolso-sulamerica.md`. O nome
*Rafael A. C. Moreira* e o banco, agência e conta dos documentos são inventados, por palavra dela, e
ficam. O privado não mudou.

**Alternativa descartada.** *Reescrever o histórico do privado e torná-lo público*: preserva os commits,
mas é destrutivo e dessincroniza outras cópias. *Não publicar o repositório*: o case perderia uma prova.

**Custo aceito.** O público não tem o histórico de commits do trabalho. Os documentos de pesquisa
continuam dizendo que a pessoa faz terapia de psicologia e quanto paga por sessão, sem nome real.

**Consequência.** O endereço entra na tira e no bloco de provas do Reembolso. Uma falta a menos.

---

## 215 · As capturas reais saem do FigJam e do Figma do Reembolso, e as mídias do site ficam

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** Depois da 214, o dev achou no repositório público o arquivo `Reembolso SulAmerica.jam`,
com 74 capturas do app real embutidas: selfie, nome completo, CPF, recibos e dados bancários. Tornei
o repositório privado de imediato. A conferência seguinte achou as mesmas capturas no quadro do FigJam
(`lCpgyPMBg7BXj0DxgiOUh1`) e na página "mapeamento do fluxo atual" do arquivo de design
(`LUp4aT7fVYH4cD8ZwrHIfd`), os dois abertos sem login pelos links do case. Os wireframes e mockups
ainda traziam números dos documentos reais: CPF, CRP e conta, protocolo e número de solicitação. A
varredura da 214 só leu texto, e não olhou dentro das imagens: erro meu.

**Decisão.** Ela desenhou o modelo, um quadro branco com o nome da tela e *"(conteúdo privado)"*, e
pediu *"faz assim pra todas as telas com dados pessoais, o nome de cada tela ta no post it"*. Foram 13
capturas no FigJam e 14 no Figma, ligadas aos seus post-its no FigJam. O desfoque que ela tinha posto
sobre a selfie saiu (*"apaga"*). Os dados reais dos wireframes e mockups viraram dados inventados
(*"trocar por dados inventados"*): Rafael A. C. Moreira, a conta 00123/4567, o CPF 123.456.789-09 e o
CRP 06/12345 do prestador, o CPF 987.654.321-00 do titular, o protocolo 1234.5678.9012.3456.7890 e a
solicitação 1234567890. As três telas de datas do tratamento ficam (*"deixa"*): só datas, sem nome.

**Alternativa descartada.** *Reexportar a capa e as mídias dos capítulos 4 e 5 do site*, que mostram o
protocolo real e o CPF 024.418.260-26 dos mockups antigos, sem nome nem foto: *"não tem problema com
as midias do site"*.

**Custo aceito.** O site e o Figma passam a mostrar números diferentes na mesma tela. As capturas
originais continuam no histórico de versões dos dois arquivos do Figma e no repositório privado
`case-sulamerica`.

**Consequência.** O `case-reembolso` continua privado até ser refeito sem o `.jam` antigo e com os
PNGs reexportados.

---

## 216 · O repositório do Reembolso é refeito sem o arquivo do FigJam, com o link no lugar

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** Depois da 215, o `case-reembolso` continuava privado, com o `.jam` antigo no único commit.
Um OCR das 127 imagens achou dados reais em 16 telas, repetidas em `mockups/`, `wireframes/` e
`wireframes/composicoes/`, exportadas antes de o Figma ser corrigido.

**Decisão.** *"nao quero essa captura de figjam quero o link só"*: o `.jam` sai, e um `README.md` na
raiz leva ao FigJam, ao Figma e ao protótipo. As 16 telas e os dois quadros completos foram exportados de
novo do Figma; nas composições, a tela nova entrou no lugar exato da antiga. O protocolo real saiu de
`microcopy.md` e `anotacoes-ux.md`. Com a permissão dela (*"gh auth refresh -h github.com -s
delete_repo"*), o repositório antigo foi apagado e recriado com um commit só, e ficou público com
*"pode deixar público"*. Um OCR final não acha nenhum dado real nas imagens.

**Alternativa descartada.** *Salvar uma cópia nova do `.jam`*: é uma foto datada do quadro, que
envelhece a cada mudança; o link mostra sempre a versão atual.

**Custo aceito.** O repositório antigo ficou público por uns dez minutos na 214. Pela API ele não tinha
cópias, mas um serviço de arquivamento pode tê-lo guardado.

**Consequência.** Os links do Reembolso no site voltam a abrir o repositório.

---

## 217 · O LinkedIn abre em outra aba sem aviso

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** moldura

**Gatilho.** Os links externos dos cases levam o aviso *"abre em nova aba"* no rótulo. O LinkedIn, no
contato da barra e no "Ver LinkedIn" de Quem sou eu, abre em outra aba sem aviso, e a pergunta era se
ganhava o mesmo aviso, visível ou só para leitor de tela.

**Decisão.** *"nao precisa aviso"*. O rótulo fica "LinkedIn" e "Ver LinkedIn", como está no site.

**Alternativa descartada.** *Aviso visível*, como nos cases. *Aviso só para leitor de tela*, que era a
minha recomendação.

**Custo aceito.** Quem usa leitor de tela não é avisado de que vai para outra aba.

**Consequência.** `moldura/botao-contato.md` registra a regra. O código já se comporta assim: nada a
construir.

---

## 218 · O LinkedIn pede login a quem não tem conta, e fica assim

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** moldura

**Gatilho.** A conferência pendente desde a inclusão do LinkedIn: o que vê quem abre o perfil sem estar
logado. Ela abriu numa janela anônima, e aparece a tela de login do LinkedIn, não o perfil.

**Decisão.** *"não é um problema qualquer pessoa sabe que precisa de login pra entrar no linkdin"*. O
link continua apontando para o perfil.

**Alternativa descartada.** Nenhuma foi proposta.

**Custo aceito.** Quem não tem conta, ou não está logado, não vê o perfil. Os mesmos dados de contato
estão no site: o e-mail e o currículo em PDF.

**Consequência.** Nada a construir.

---

## 219 · Os clientes citados no currículo ficam

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** quem-sou-eu

**Gatilho.** Ficou aberto desde a 210: o currículo publicado cita clientes atendidos no emprego dela, e
a pergunta era se ela pode nomeá-los num arquivo público.

**Decisão.** *"pode deixar assim"*. O PDF fica como está.

**Alternativa descartada.** *Tirar os nomes dos clientes do PDF.*

**Custo aceito.** Se houver algum acordo de confidencialidade com o empregador, quem responde por ele é
ela.

**Consequência.** Nada a construir.

---

## 220 · O título de Trabalhos é dela, e a lista de perguntas perde três

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** trabalhos

**Gatilho.** Revisão da lista de perguntas em aberto, parada desde 1º de outubro. Quatro pareciam
superadas por decisões posteriores, e eu as conferi antes de propor a saída.

**Decisão.** *"sim, o título é meu, pode atualizar a lista"*.
- **P41:** o título *"Dois problemas que eu vi de perto, e o que fiz com eles."* deixa de ser rascunho
  meu. Ele estava nas telas que ela aprovou, e nas decisões 211 a 213 ela escolheu onde ele quebra.
- **P43** sai: as decisões 204 a 206 deram às telas do Finanças colunas separadas e o par de telas em
  largura inteira.
- **P32** sai: a decisão 018 já tinha deixado o nome nos dois lugares com pesos diferentes, "Larissa" na
  barra e "LARISSA QUADROS · UX DESIGNER" no bloco, que é uma das opções da pergunta.
- **P63** fica, reduzida às páginas de case: em 1024 a coluna de leitura tem uns 48 caracteres.

**Alternativa descartada.** Nenhuma: as três saídas registram o que já estava decidido.

**Custo aceito.** Nenhum novo.

**Consequência.** A lista tem 13 perguntas, nenhuma travando. O contrato de Trabalhos perde a marca de
lacuna do título. Nada a construir.

---

## 221 · Os cases ganham endereços curtos

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** conteudo

**Gatilho.** P64: nenhum documento fixava o endereço das páginas. O código os derivava dos nomes dos
arquivos, e os cases saíam em `/trabalhos/financas-pf-pj/` e `/trabalhos/reembolso-sulamerica/`.

**Decisão.** *"encurtar"*: **`/trabalhos/financas/`** e **`/trabalhos/reembolso/`**. Os outros ficam:
`/`, `/trabalhos/`, `/quem-sou-eu/`. O endereço passa a ser declarado, e não derivado do nome do
arquivo.

**Alternativa descartada.** *Manter como está*, que era a minha recomendação. *Tirar o nível de
Trabalhos* (`/financas/`), que deixaria de mostrar que o case pertence a Trabalhos.

**Custo aceito.** "financas" diz menos que "financas-pf-pj". Os endereços antigos passam a dar a
página de erro; como o site ainda não foi divulgado, não há link compartilhado a preservar.

**Consequência.** A regra entra em `conteudo/arquivo-de-texto-vira-pagina.md`, e a P64 sai da lista.
Fica aberto o começo do endereço, `lariquadrinhos.github.io/case-portifolio/`, que depende do domínio
(P15) ou do nome do repositório.

---

## 222 · O site sai de /case-portifolio/ e passa a abrir na raiz

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** conteudo · `#escopo`

**Gatilho.** Fechada a P64, ficou o começo do endereço: `https://lariquadrinhos.github.io/case-portifolio/`.
O nome do repositório entra no endereço, e "portifolio" tem um "i" a mais.

**Decisão.** O repositório passa a se chamar **`lariquadrinhos.github.io`**, e o site abre em
**`https://lariquadrinhos.github.io/`**. Escolhido por ela entre as duas opções que aprovou.

**Alternativa descartada.** *Renomear para `portfolio`*, que corrigia a grafia e mantinha um prefixo
no endereço. *Domínio próprio* (P15): ela ainda não comprou; quando comprar, ele entra por cima deste
endereço, sem retrabalho.

**Custo aceito.** O endereço antigo do site deixa de abrir. O GitHub redireciona o endereço do
repositório, mas não o das páginas. Onde o endereço antigo tiver sido posto (LinkedIn, currículo),
precisa ser trocado à mão.

**Consequência.** O dev renomeia o repositório e troca o prefixo de publicação para `/` no mesmo
movimento, para o site não ficar no ar com os caminhos errados.

---

## 223 · O texto da página de erro é dela

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** erro

**Gatilho.** P31: o texto da página de erro era rascunho meu, à espera da voz dela. Ele é o mesmo no
contrato, no Figma (`136:32` e `136:51`) e no site, e com a 221 e a 222 passou a ser a página que
recebe os endereços antigos.

**Decisão.** *"1, pode ficar como está"*. O título, o corpo e as três saídas ficam como estão, e
passam a ser dela.

**Alternativa descartada.** *Ela reescrever no Figma.* *Eu propor variações.*

**Custo aceito.** Nenhum.

**Consequência.** A P31 sai da lista, que fica com 11 perguntas. Nada a construir.

---

## 224 · Quatro perguntas saem da lista porque já tinham resposta

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** conteudo

**Gatilho.** *"confere se as perguntas já não tem respostas"*. Conferi as 11 contra o log, os contratos
e o site no ar.

**Decisão.** *"sim, pode tirar"*.
- **P12** (endereço para uma seção do case): cada capítulo tem âncora, como
  `/trabalhos/reembolso/#diagnostico`, e `case/trilha.md` já tem o cenário de quem chega por link direto.
- **P14** (volta do protótipo): links externos abrem em outra aba (`case/pagina-de-case.md`), então a
  página do case fica onde estava, com trilha e rolagem.
- **P16** (textos públicos antes do site): o site está no ar com eles.
- **P17** (não há Storybook): os contratos marcam o Storybook como "não se aplica".

**Alternativa descartada.** Nenhuma.

**Custo aceito.** Nenhum.

**Consequência.** A lista fica com 7: P57, P59, P63, P65, P21, P09 e P15. Nada a construir.

---

## 225 · Entre 1024 e 1280, o case usa o modo estreito com a coluna limitada

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** case

**Gatilho.** P63. Medido no site no ar, em caracteres por linha da prosa: logo abaixo de 1024, a coluna
única esticava até 103 (Reembolso) e 104 (Finanças); entre 1024 e 1280, a coluna do desktop ficava com
38 a 57. O piso é 65.

**Decisão.** Opção 1, proposta minha, desenhada em `602:1487` (Reembolso em 1100) e aprovada:
*"aprovado, limita o botão e manda pro dev"*. Abaixo de 1280, o case usa o modo estreito, com a coluna
de leitura de no máximo 680, centralizada (uns 70 caracteres). A mídia fica nos 411 do desktop,
centralizada. O bloco de destaque sangra até as bordas. O botão do convite tem a largura do texto.

**Alternativa descartada.** *Só limitar a coluna estreita*: deixava 1024 a 1280 apertado. *Desenhar
uma largura intermediária*: pedia desenho novo dos dois cases.

**Custo aceito.** Entre 1024 e 1280, a mídia vem entre os textos, como no celular, e não ao lado. O
marca-texto da frase de abertura não foi desenhado nessa largura: o código o posiciona.

**Consequência.** Regra em `case/pagina-de-case.md`. A P63 sai da lista, que fica com 6.

---

## 226 · O celular fica sem os números das tabelas do Reembolso

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** case

**Gatilho.** P57: com a 132, as duas tabelas do Reembolso saíram da tela estreita. Conferido no texto de
hoje, o "44 telas" já está na prosa do capítulo 4; seguem só nas tabelas o ~12 → 5 etapas com digitação,
30+ → ~10 telas, 3 → 0 modais, a digitação de CRP, CPF e valor trocada por OCR, 43 telas alcançáveis
com 145 ligações, 94 variáveis, 18 componentes e 148 ícones, e os 14 scripts de medição.

**Decisão.** *"1"*: aceitar a perda. O celular fica com o resumo do capítulo 5, *"de dezoito etapas
para cinco"*, e o desktop é a versão completa.

**Alternativa descartada.** *Devolver ao estreito a tabela de entregas como lista*, que era a minha
recomendação. *Ela escrever uma ou duas frases com os números que mais importam.*

**Custo aceito.** Quem lê no celular não vê os números do protótipo, do design system e da comparação
etapa a etapa.

**Consequência.** A P57 sai da lista, que fica com 5. Nada a construir.

---

## 227 · As duas versões da mídia do capítulo 3 do Reembolso ficam com alturas diferentes

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** case

**Gatilho.** P59: os recortes do capítulo 3 têm alturas diferentes no claro e no escuro (508 e 480 no
arquivo, 254 e 240 na tela). No desktop não custa nada; na tela estreita, a página escura fica um pouco
mais curta que a clara, e a conferência lado a lado acusa a diferença em tudo que vem abaixo.

**Decisão.** *"nao tem problema"*: aceitar. Os recortes são dela e ficam como estão.

**Alternativa descartada.** *Igualar os dois recortes, tirando margem do claro.* *Igualar pela moldura
mais alta, com uma faixa vazia no escuro.*

**Custo aceito.** Na tela estreita, os dois temas não têm a mesma altura abaixo do capítulo 3, e quem
confere lado a lado precisa descontar essa diferença.

**Consequência.** A P59 sai da lista, que fica com 4. Nada a construir.

---

## 228 · Medida que só existe numa peça é medida de componente, não token

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** sistema visual · `#emenda`

**Gatilho.** P65: 38 medidas que o Figma desenha sem variável, reunidas pelo código num bloco no topo de
`modelo/estilo.css`, cada uma com o nó de origem. São a estrutura da página (barra, faixa, trilha,
coluna do case, mídia, capas baixas), onze tamanhos de texto fora da escala (Home e Trabalhos sem
rolagem, parágrafo e etiqueta da Home), ajustes finos (rastreio, sombra, sublinhado) e proporções.

**Decisão.** *"3, pode aceitar como medida de componente"*, proposta minha. Token é o que se repete
pelo sistema; medida que só existe numa peça vive nesse bloco, com o nó de origem, e valor novo fora da
escala continua indo para lá, nunca solto no código. **Emenda à constituição, 1.0.0 → 1.1.0** (MENOR:
exceção nova a um princípio, sem mudar o resto dele).

**Alternativa descartada.** *Criar as variáveis no Figma*: a escala de tipo ganharia onze degraus que
só existem numa tela. *Corrigir no desenho*: mudaria telas aprovadas, como as da 211.

**Custo aceito.** A conformidade deixa de ser "nenhum valor fora dos tokens" e passa a ser "nenhum valor
fora dos tokens ou do bloco de medidas de componente". O bloco precisa continuar com o nó de cada valor,
ou a exceção vira improviso.

**Consequência.** A P65 sai da lista, que fica com 3: P15, P21 e P09. O comentário do bloco no
`estilo.css` ainda cita a P65.

---

## 229 · A coluna do case entre 676 e 1280 passa a 628, e o extra entra nela

**Quando** 2026-10-09 · **Fase** 4 · **Domínio** case

**Gatilho.** O dev publicou a 225 (`6575da4`) e trouxe três pontos. Em 680 a prosa dava 71 a 84
caracteres por linha (Reembolso 71/80/79/72, Finanças 81/78/84/76), acima da meta de 65 a 75. O extra
"O Produto" do Finanças não estava na lista do que segue a coluna, por esquecimento meu, e em 1100 ia
de borda a borda, com uns 130 caracteres. E o botão do convite com a largura do texto valia a partir de
onde a coluna tem limite, não só a partir de 1024.

**Decisão.** *"sim, vai com as três"*, propostas minhas:
1. A coluna passa a **628**, a mesma da coluna de texto do desktop; o limite começa em **676** (628 mais
   24 de cada lado).
2. Todo texto segue a coluna, inclusive o conteúdo extra.
3. O botão do convite tem a largura do texto sempre que a coluna tem limite.

**Alternativa descartada.** *Manter 680*, acima da meta. *Botão de largura inteira até 1024.*

**Custo aceito.** O Finanças fica com uns 70 a 78 caracteres, o mesmo que já tem no desktop.

**Consequência.** `602:1487` reajustado: coluna em x236, 628 de largura, capa do próximo em 628×419,
altura 9693. `case/pagina-de-case.md` atualizado, com o cenário "O case numa janela entre a tela estreita
e o desktop". `--coluna-do-case` passa a 628.

---

## 230 · Abaixo de 1280, toda página usa a barra da tela estreita; a prosa logo acima de 1280 fica como está

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** moldura

**Gatilho.** Duas observações do tester na rodada 32. Entre 1024 e 1279, o case mostrava a barra da
tela estreita (com Menu) e as outras páginas a do desktop (com Quem sou eu e Tema): quem ia de Trabalhos
para um case via a barra trocar. E entre 1280 e uns 1400, já no desktop, a primeira linha da prosa tem
59 (Reembolso) e 62 (Finanças) caracteres, abaixo do piso de 65.

**Decisão.** *"sim, vai com as duas"*, propostas minhas:
1. **Abaixo de 1280, todas as páginas usam a barra da tela estreita.** Só peças já desenhadas, e a
   barra igual no site todo. O conteúdo da Home, de Trabalhos e de Quem sou eu não muda.
2. **A prosa entre 1280 e uns 1400 fica como está.**

**Alternativa descartada.** *O case manter a barra do desktop, com a faixa de progresso embaixo*:
combinação nunca desenhada. *Levar a fronteira do case acima de 1280.*

**Custo aceito.** Entre 1024 e 1279, a Home, Trabalhos e Quem sou eu escondem Quem sou eu e o tema no
Menu. Entre 1280 e uns 1400, a prosa fica de 3 a 6 caracteres abaixo do piso; o Finanças já tem 60 no
desenho de 1440.

**Consequência.** `moldura/botao-contato.md` ganha a regra e o cenário "A barra é a mesma em todas as
páginas na mesma largura".

---

## 231 · Com a barra estreita, abaixo de 1280, vêm a margem e as caixas da tela estreita

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** moldura

**Gatilho.** Ao aplicar a 230 (`2ac511d`), o dev levou junto, para a barra ser de fato a mesma em toda
página, a margem de 24 da tela estreita ("Larissa" a 24 da borda, não a 80) e a caixa de contato da
tela estreita, de margem a margem e com véu. Antes, na Home em 1100, ela abria sob o botão.

**Decisão.** *"pode ficar como o dev fez"*.

**Alternativa descartada.** *A barra estreita com as caixas do desktop*, abrindo sob o botão e sem
véu, que eu levantei porque nessa largura quem usa costuma estar com mouse.

**Custo aceito.** Entre 1024 e 1279, quem usa mouse recebe a caixa pensada para o dedo, com véu.

**Consequência.** `moldura/botao-contato.md` registra a regra junto da 230.

---

## 232 · A barra estreita fica com a margem de 80 a partir de 1024

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** moldura

**Gatilho.** Rodada 33 do tester: entre 1024 e 1279, na Home, em Trabalhos e em Quem sou eu, a barra
tinha a margem de 24 da tela estreita (231) e o conteúdo a de 80 do desktop. Barra e conteúdo não se
alinhavam à esquerda, numa combinação que não está desenhada.

**Decisão.** *"1, manda pro dev"*, proposta minha: a partir de 1024, a barra volta à margem de 80. Ela
continua com Menu e com as caixas da tela estreita. Reverte a parte da margem da 231.

**Alternativa descartada.** *O conteúdo dessas três páginas passar a 24 abaixo de 1280*: mudaria
telas aprovadas. *Deixar como está.*

**Custo aceito.** No case, entre 1024 e 1279, a barra a 80 não se alinha com a coluna centralizada,
que nunca se alinhou com ela.

**Consequência.** `moldura/botao-contato.md` atualizado.

---

## 233 · O site ganha o domínio larissaquadros.com

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** conteudo · `#escopo`

**Gatilho.** P15: "domínio próprio" era critério de liberação, e nenhum tinha sido escolhido. Ela decidiu
comprar agora.

**Decisão.** *"acho que vou comprar o .com entao porque quero me candidatar para fora do brasil
também"*. Comprou **`larissaquadros.com`** na Cloudflare, o nome que proponho por bater com o site e
o currículo. O DNS aponta o domínio para os quatro endereços do GitHub Pages e o `www` para
`lariquadrinhos.github.io`, sem o proxy da Cloudflare ("DNS only"), para o GitHub poder emitir o
certificado. O endereço principal é o domínio sem `www`.

**Alternativa descartada.** *`.com.br` no registro.br*: mais barato, mas menos reconhecido fora do
Brasil. *`lariquadros.com`*: não bate com o nome do site nem do currículo.

**Custo aceito.** Renovação anual, por conta dela. O registro precisa continuar com a proteção de dados
pessoais da Cloudflare.

**Consequência.** A P15 sai da lista, que fica com 2. O dev configura o domínio no GitHub Pages e o
HTTPS. `lariquadrinhos.github.io` e `www.larissaquadros.com` passam a redirecionar para
`larissaquadros.com`.

---

## 234 · O site abre sempre no tema claro

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** tema

**Gatilho.** *"quero que abra sempre no modo claro e se o usuario quiser pode alterar para escuro"*. Até
aqui, a primeira visita seguia a preferência de tema do sistema da pessoa.

**Decisão.** Na primeira visita, o site abre no tema claro, qualquer que seja o sistema, e sem JavaScript
também. O controle na barra troca para o escuro, e a escolha continua lembrada entre visitas, como antes.
A preferência do sistema deixa de ser lida.

**Alternativa descartada.** *Seguir o sistema na primeira visita*, a regra que vinha desde o começo.

**Custo aceito.** Quem usa o sistema no escuro chega num site claro e precisa trocar à mão.

**Consequência.** `tema/tema-claro-e-escuro.md` reescrito: regras, a explicação do script e os
cenários. Os dois cenários de primeira visita viram um só, e os dois de mudança no sistema também.

---

## 235 · A barra do navegador no celular acompanha o fundo do tema

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** tema

**Gatilho.** Ao aplicar a 234, o dev notou que o site não define a cor da barra do navegador no celular,
que ficava com a cor padrão de cada navegador.

**Decisão.** *"pode pintar com o creme, manda pro dev"* e, perguntada sobre o escuro, *"acompanha a cor
do tema"*. A barra tem a cor de `bg/page` do tema em uso, e troca junto com ele.

**Alternativa descartada.** *A cor padrão do navegador.* *Sempre creme*, que no escuro deixaria uma
faixa clara acima da página escura.

**Custo aceito.** Nenhum.

**Consequência.** `tema/tema-claro-e-escuro.md` ganha a regra e o cenário "A barra do navegador
acompanha o tema".

---

## 236 · O par do capítulo 6 do Finanças passa a mostrar o produto rodando

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** case · `#reversao`

**Gatilho.** Ela pôs no Figma capturas reais do produto rodando, nos dois temas: a Home (`607:2701`,
`607:2704`) e a Evolução Mensal (`607:2707`, `607:2710`), com quadrados dela cobrindo o indicador do
canto inferior esquerdo. *"é melhor do que mostrar os mockup mas precisa explicar na legenda que depois
dos testes com o usuario o produto ganhou algumas melhorias"*. Os valores são de demonstração, por
palavra dela.

**Decisão.** O par do capítulo 6 troca os mockups da Evolução Mensal e do DRE pela Home e pela Evolução
Mensal do produto. Montei as imagens no formato do par anterior (1030 de largura, título no alto, faixa
de `bg/page` embaixo), com as telas inteiras e os quadrados dela aplicados, e ela aprovou na prancha e
no Figma. Títulos: *"Produto · Home"* e *"Produto · Evolução Mensal"*. Legenda, a opção A das três que
propus: *"A Home e a Evolução Mensal no produto, já com as melhorias que vieram dos testes de uso."*

**Alternativa descartada.** *Manter os mockups*, como na 206. As outras duas legendas.

**Custo aceito.** As imagens mostram a tela inteira, então o texto delas fica pequeno, como já era nos
mockups. O capítulo 6 encolhe 56 no desktop e 48 na tela estreita.

**Consequência.** Reverte a 206 quanto à mídia. `publico/midias/financas-6-produto-{home,evolucao}-
{claro,escuro}.png` entram, e os quatro `financas-6-mockup-*` saem. O `.md` muda o par, com textos
alternativos novos, e a legenda. Figma: as quatro telas do case atualizadas, e as imagens soltas em
`611:1540` a `611:1547`.

---

## 237 · O vídeo do capítulo 1 do Finanças é regravado na versão atual, e o par volta a 48 no Figma

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** case

**Gatilho.** *"quero refazer o video também"*, logo depois da 236. E o dev achou que, na composição da
tela estreita que eu montei para o par do capítulo 6 (`611:1542`, `611:1543`), o vão entre as imagens
ficou em uns 25, contra os 48 que o site usa desde a 205.

**Decisão.** *"sim, só dados de demonstração, pode gravar com o mesmo roteiro para os dois temas"*: o
vídeo foi regravado no produto que ela deixou rodando em `localhost:3000`, sobre a base dele, que ela
confirmou ser só de demonstração. Mesmo roteiro da 189 (Home; DRE em PF, PJ e Consolidado; Indicadores
Financeiros, um mês atrás; Histórico filtrado por pagos em Alimentação), mesmo formato (822×688, em 2x,
cursor desenhado, o indicador de desenvolvimento escondido), uns 23 segundos. Aprovado: *"aprovado,
corrige o figma e manda pro dev"*. No Figma, o par da estreita volta a 48, a regra da 205, e o site não
muda.

**Alternativa descartada.** *A estreita passar a 24*, que seguiria o erro da composição.

**Custo aceito.** A barra lateral do produto não tem mais a aba Relatórios que abria e fechava, então o
vídeo vai direto ao DRE. No Histórico, a tabela é mais larga que a janela, e a coluna de valores aparece
cortada à direita.

**Consequência.** `publico/midias/financas-1-produto-em-uso-{claro,escuro}.mp4` e os pôsteres trocados,
com os mesmos nomes. O texto alternativo do vídeo foi reescrito para o roteiro novo; a legenda continua
valendo. No Figma: os pôsteres em `536:1397` e `536:1398` e nas quatro telas, e o par da estreita
(`488:57`, `488:110`) com 537,5, igual ao site. Uma consequência da 237 é que a base usada passa a ser a
do produto, e não mais uma base separada.

---

## 238 · O repositório do Finanças vai a público numa cópia limpa, `case-financas`

**Quando** 2026-10-13 · **Fase** 4 · **Domínio** case · `#restricao`

**Gatilho.** Ela mandou o endereço do repositório do produto, `lariquadrinhos/bigorna`, para a falta do
case. Ele estava público. Antes de linkar, achei `docs/reference/meu-dre.xlsx`, a planilha de origem,
com centenas de valores, linhas com detalhes da vida de quem a usava (assinaturas, academia, a ração
de um pet com nome, as operadoras), no histórico desde julho. E 80 dos 83 commits assinados com o nome
da pessoa, o mesmo das capturas reais do Reembolso, que a 214 e a 215 tiraram de tudo: linkar os dois
repositórios ligaria esse nome aos documentos do Reembolso.

**Decisão.** *"Publicar uma cópia limpa, como fizemos com o Reembolso"*, proposta minha. O `bigorna`
voltou a privado (sem forks). O **`lariquadrinhos/case-financas`** foi criado com o estado atual da
`main`, num commit só, assinado por Larissa Quadros, sem a planilha. E com as três trocas que ela
aprovou (*"sim, vai com as três trocas e esse nome"*):
- o nome da pessoa vira "a pessoa" ou "a pessoa usuária", a regra que ela mesma deu no playbook;
- os detalhes da planilha viram termos genéricos (assinaturas, streaming, ração do pet, academia);
- o contato em `SECURITY.md` e `CODE_OF_CONDUCT.md` passa a ser o do site.
O README diz que a planilha não está na cópia pública porque traz as finanças reais de quem a usava.

**Alternativa descartada.** *Limpar o histórico do repositório original*: destrutivo, e quem já clonou
fica com a versão antiga. *Linkar como está.*

**Custo aceito.** A cópia pública não tem o histórico de commits. O original ficou público por um tempo
que não sei medir, com a planilha e o nome; não tinha forks. Algumas menções à planilha seguem nos
documentos como história, sem link.

**Consequência.** O endereço entra na tira e nas provas do Finanças. As duas últimas faltas do site somem.

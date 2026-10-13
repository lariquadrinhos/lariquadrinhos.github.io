---
fluxo: tema/tema-claro-e-escuro
dominio: tema
dono: design
status: rascunho
atualizado: 2026-09-21

figma:
  file: hwClE9Xpm51OW4vPsCCn8J
  pagina: "34-2"
  tela: "@lacuna · o controle de tema ainda não foi desenhado"
---

# Tema claro e escuro

Atravessa o site inteiro, e por isso não pertence à moldura. Na primeira visita o site abre
no tema claro, qualquer que seja a preferência do sistema; o controle na barra troca para o
escuro, e a escolha é lembrada.
O tema certo aparece já na primeira pintura, nunca há troca visível depois que a página
apareceu.

## Regras

- **Na primeira visita, o site abre sempre no tema claro.** A preferência do sistema não é
  lida. Ver decisão 234.
- O controle na barra troca para o escuro, e de volta.
- A escolha manual é lembrada entre visitas e **vale até ser trocada de novo**.
- **O controle tem duas posições**, claro e escuro. Não há posição "seguir o sistema".
- **"Tema" abre as duas posições; não troca direto.** A caixa mostra Claro e Escuro com a que
  está em vigor marcada. Trocar direto custaria um toque a menos, mas nunca diria qual das
  duas está valendo.
- **A posição em vigor é marcada, não só colorida.** Vale aqui a mesma regra da barra: cor
  sozinha não basta.
- **No desktop a caixa ancora sob "Tema", sem véu.**
- **Em tela estreita o tema vive dentro do menu**, e ali mostra as duas posições **em linha,
  sem abrir outra caixa**: o menu já é a camada aberta, e sobrepor camada em camada é o que
  se evita.
- **Dentro do menu não existe rótulo "Tema": as opções se nomeiam.** As linhas são
  "Tema claro" e "Tema escuro". Assim **tudo o que está no menu é da mesma forma e tudo se
  toca**: nenhuma linha parece alvo sem ser. No desktop as opções continuam "Claro" e
  "Escuro", porque ali a palavra "Tema" está logo acima, na barra, e é ela que as nomeia.
- **Os rótulos das três linhas alinham na mesma coluna.** "Quem sou eu" reserva a largura do
  sinal de escolhido mesmo não tendo sinal, senão a lista fica desencontrada.
- **Escolher não fecha a caixa**, nem no desktop, nem dentro do menu. Trocar de tema é
  controle de *experimentar*: a ação mais provável logo depois de escolher é escolher de
  novo, para comparar. Fechar cobraria uma reabertura por tentativa. Navegação não tem esse
  padrão; tema tem. Ver decisão 063.
- **Para fechar: Esc ou clicar fora**, igual ao contato e ao menu. As três sobreposições do
  site abrem e fecham do mesmo jeito, e o foco volta para o que as abriu.
- **O tema certo é aplicado antes da primeira pintura.** Nunca há piscada.
- **Sem JavaScript, o site fica no tema claro e o conteúdo permanece legível.**
  O script é reforço que falha em segurança, não dependência.
- O tema claro usa fundo cinza claro, não branco puro.
- **A barra do navegador no celular tem a cor do fundo da página no tema em uso**: `bg/page` claro
  na primeira visita, e o escuro quando a pessoa escolhe o escuro. A página parece contínua até o
  topo da tela. Ver decisão 235.
- Os dois modos foram escolhidos e verificados em separado. **Nenhum valor de um deriva
  automaticamente do outro**, nem no Figma nem no código.
- Contraste mínimo de 4,5:1 em texto e 3:1 em elemento interativo, **nos dois temas**.

**Como "sem JavaScript" convive com "nunca há piscada":** a piscada só existe por causa da
troca manual. Sem escolha, o CSS já pinta o claro. Com escolha, ela precisa ser lida antes do
primeiro desenho, o que exige um script curto e bloqueante no topo do documento, cuja única
tarefa é marcar o tema no elemento raiz. Se ele não executar, o CSS fica no claro.

## Peças

| Nome no cenário | Figma | Storybook |
|---|---|---|
| controle de tema · desktop | `154:89` | não se aplica |
| controle de tema · dentro do menu | `154:42` | não se aplica |

## Comportamento

```gherkin
# language: pt
Funcionalidade: Forma do controle de tema

  Cenário: O leitor abre o controle em desktop
    Quando o leitor aciona "Tema"
    Então as duas posições aparecem numa caixa ancorada sob "Tema"
    E a posição em vigor aparece marcada, e não apenas colorida
    E a página atrás não escurece

  Cenário: O leitor abre o controle em tela estreita
    Dado que o tema vive dentro do menu
    Quando o leitor aciona "Menu"
    Então as duas posições do tema aparecem dentro do próprio menu
    E nenhuma caixa nova abre por cima do menu

  Cenário: O leitor troca de tema com a caixa aberta
    Dado que a caixa de tema está aberta
    Quando o leitor escolhe a outra posição
    Então o tema troca
    E a caixa continua aberta
    E a marca passa para a posição escolhida

  Cenário: O leitor fecha a caixa de tema
    Dado que a caixa de tema está aberta
    Quando o leitor aciona a tecla Esc ou clica fora
    Então a caixa se recolhe
    E o foco volta para "Tema"
```

```gherkin
# language: pt
Funcionalidade: Tema claro e escuro

  Cenário: Primeira visita, qualquer que seja o sistema
    Dado que o leitor nunca escolheu um tema neste site
    E que o sistema dele está no modo claro ou no escuro
    Quando qualquer página abre
    Então a página aparece no tema claro
    E o fundo é cinza claro, não branco puro

  Cenário: Leitor troca o tema
    Dado que o leitor está em qualquer página
    Quando ele aciona o controle de tema
    Então a página passa para o outro tema
    E a escolha é guardada

  Cenário: Leitor volta depois de ter escolhido
    Dado que o leitor já escolheu um tema nesta site antes
    Quando ele abre qualquer página
    Então a página aparece no tema que ele escolheu
    E o tema já está aplicado na primeira pintura

  Cenário: O script de tema não executa
    Dado que o JavaScript está indisponível
    Quando qualquer página abre
    Então a página aparece no tema claro
    E todo o conteúdo permanece legível
    E o controle de tema não promete o que não pode cumprir

  Cenário: O leitor muda a preferência do sistema
    Dado que o leitor está em qualquer página
    Quando ele muda a preferência do sistema operacional
    Então o site continua no tema em que estava

  Cenário: O controle de tema em tela estreita
    Dado que a tela é estreita
    Quando a barra é montada
    Então o controle de tema fica dentro do menu, não na barra
    E continua tendo duas posições

  Cenário: A barra do navegador acompanha o tema
    Dado que o leitor está num celular
    Quando a página aparece em qualquer um dos dois temas
    Então a barra do navegador tem a cor do fundo da página nesse tema
    E troca junto quando o leitor troca o tema
```

## Transições

| De | Gatilho | Para |
|---|---|---|
| Qualquer página | Acionar o controle | A mesma página, no outro tema |
| Primeira visita | nada | Tema claro |
| Visita seguinte | nada | Tema escolhido, se houve escolha |

---
fluxo: erro/endereco-inexistente
dominio: erro
dono: design
status: desenhado
atualizado: 2026-09-21

figma:
  file: hwClE9Xpm51OW4vPsCCn8J
  pagina: "56:2"
  tela: "136:32 (desktop) · 136:51 (estreita)"
---

# Endereço inexistente

Endereço que não existe devolve uma página **dentro da moldura do site**, não a tela do
servidor. Explica o que aconteceu e oferece saída.

## Regras

- A página de erro tem a barra fixa, o tema e a tipografia do site: é o site, não uma
  tela de servidor.
- Ela explica o que aconteceu, em linguagem comum.
- **O texto desta página vive neste contrato**, não nos arquivos de conteúdo: é copy de
  interface, não conteúdo autoral.
- Ela oferece três saídas: os trabalhos, a home e o contato.
- **As três saídas são palavra simples**, sem contorno e sem sublinhado. Contorno prometeria
  ação que acontece aqui, e não acontece nada aqui; sublinhado prometeria sair do site, e as
  três levam para dentro. Navegação interna já tem forma neste site: é a da barra.
- **Nenhum item da barra recebe destaque de página atual.** A página de erro não é seção do
  site, então não há item a que ela pertença: como já acontece na home.
- Vale para qualquer saída que devolva a pessoa para dentro do site, não só para endereço
  digitado errado.

## Texto

**Título** · Esse endereço não leva a lugar nenhum.
**Corpo** · Pode ser um link meu que envelheceu, ou um erro de digitação. De qualquer
forma, o que você procurava deve estar em um desses caminhos.
**Saídas** · Ver os trabalhos · Voltar para a home · Falar comigo

> **O corpo assume a falha antes de oferecer a saída.** "Um link meu que envelheceu" tira a
> culpa de quem leu: é a mesma postura dos cases, olhar o sistema e não o usuário. O texto é
> dela (decisão 223). Alterar este texto é alterar este arquivo.

## Peças

| Nome no cenário | Figma | Storybook |
|---|---|---|
| tela, desktop | `136:32` | não se aplica |
| tela, estreita | `136:51` | não se aplica |
| saídas da página de erro | dentro de `136:32` | não se aplica |

## Comportamento

```gherkin
# language: pt
Funcionalidade: Endereço inexistente

  Cenário: A pessoa pede um endereço que não existe
    Quando o endereço pedido não corresponde a nenhuma página
    Então a página de erro aparece dentro da moldura do site
    E a barra fixa continua visível
    E o tema em uso é respeitado
    E a página explica o que aconteceu
    E oferece saída para os trabalhos, para a home e para o contato

  Cenário: O texto vem do contrato
    Dado que o texto desta página é copy de interface
    Então ele vive neste contrato, não nos arquivos de conteúdo
    E alterá-lo é alterar este arquivo

  Cenário: As saídas não se disfarçam de outra coisa
    Dado que a página de erro está aberta
    Então as três saídas aparecem como palavra simples
    E nenhuma aparece como botão
    E nenhuma aparece sublinhada
    E nenhum item da barra aparece como página atual

  Cenário: O corpo não culpa quem leu
    Dado que a página de erro está aberta
    Então o corpo levanta a hipótese do link quebrado antes da digitação errada

  Cenário: Como a hospedagem entrega a página de erro
    Dado que o site é servido pelo GitHub Pages em "larissaquadros.com"
    Quando o endereço pedido não corresponde a nenhuma página
    Então o servidor responde com o status 404
    E entrega a página de erro do site, não a do servidor
```

## Transições

| De | Gatilho | Para |
|---|---|---|
| Página de erro | Trabalhos | Índice de trabalhos |
| Página de erro | Home | Home |
| Página de erro | Contato | Contato revelado |

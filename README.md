# Portfólio: o processo, documentado enquanto acontece

> **Rascunho meu, à espera da voz dela.** Este README é proposta: é a Larissa falando no
> repositório dela, então o texto abaixo precisa da aprovação dela antes de valer.

Este repositório **não é o site**. É o registro de como ele está sendo construído: as
decisões, o que foi descartado, e o que ainda não foi decidido.

O site é gerado a partir daqui e publicado em <https://larissaquadros.com/>.

## O que tem aqui

| | |
|---|---|
| [`docs/prd/`](docs/prd/) | O que o produto é, para quem, e por quê |
| [`docs/comportamento/`](docs/comportamento/) | O manual de telas: o que cada tela faz, e onde ela está no Figma |
| [`docs/log-de-decisoes.md`](docs/log-de-decisoes.md) | Cada decisão, com a alternativa que perdeu e o motivo |
| [`docs/perguntas-em-aberto.md`](docs/perguntas-em-aberto.md) | O que ainda não foi decidido, e quando cada coisa precisa ser |
| [`docs/loop-produto-playbook.md`](docs/loop-produto-playbook.md) | Como o trabalho foi conduzido com IA, com os prompts como foram escritos |
| [`docs/event-storming.md`](docs/event-storming.md) | Eventos, atores e os pontos ainda indecisos |

Os três arquivos `.md` na raiz são o conteúdo do site: dois cases e a página "Quem sou eu".
Eles estão escritos e aprovados; o que falta é onde eles vão morar.

## Por que isso está aberto

Três regras valem aqui, e as três são visíveis nos arquivos:

**Nenhuma lacuna é preenchida por suposição.** Toda decisão que falta está marcada no ponto
exato onde ela aparece, apontando para a pergunta correspondente. O contrato mostra *onde*
falta decidir; a lista de perguntas é o único lugar onde se lê *o que* falta.

**Toda decisão é registrada no momento em que acontece**, com a alternativa descartada e o
custo aceito: inclusive as que foram revertidas depois.

**A documentação é regra de trabalho, não objetivo.** Se uma decisão for tomada pensando em
como ela vai ler depois, ela está errada.

## Estado

O site está construído e publicado no modo local: onde falta material (foto, currículo,
LinkedIn, mídias do case de Finanças, endereços de repositório), a página mostra o marcador de
falta no lugar, por decisão (177). Como construir, testar e publicar está em [`CLAUDE.md`](CLAUDE.md).

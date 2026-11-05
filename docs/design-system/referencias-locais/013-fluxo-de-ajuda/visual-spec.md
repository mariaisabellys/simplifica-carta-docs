# Referência visual local — 013 Fluxo de ajuda

## Proveniência e escopo

Figma `YaVUdqYa3boHpvGrxf4ZJ5`, node `169:495` (`FAQ`), extraído em
04/11/2026.

- rota: `/ajuda`;
- captura: [desktop.png](desktop.png), 1440 × 1085;
- conteúdo: `src/content/pages/ajuda.ts`;
- estados dos canais: `docs/arquitetura/contrato-canais-ajuda.md`.

O frame representa a FAQ e sua chamada de apoio. Os cards dos canais pertencem
à composição compartilhada das features 014/015 e não devem ser inseridos aqui.

## Composição

Header e breadcrumb antecedem uma região em duas colunas: introdução à esquerda
e quatro perguntas recolhidas à direita. Abaixo, um banner de apoio ocupa a
largura do conteúdo e antecede o footer compartilhado. A FAQ permite múltiplas
respostas abertas; cada item cresce com a resposta integral e não depende de
hover. `details/summary` nativos são adequados se preservarem a hierarquia visual.

O CTA textual superior leva à âncora `#precisa-de-apoio`. A ação do banner leva
à entrada compartilhada da 014, nunca abre calendário ou cria solicitação
diretamente.

## Estados e divergências normativas

A captura mostra `Agende uma visita` e `Agendar visita`, mas essa copy é
histórica. O conteúdo resolvido pelos estados editoriais prevalece:

- atendimento ativo: `Receba orientação...` e `Consultar atendimento`;
- pendente/pausado/inválido: `Consulte os canais de apoio`, aviso verdadeiro e
  `Ver canais de apoio`;
- a FAQ permanece utilizável mesmo quando ambos os canais estão indisponíveis.

As quatro perguntas, respostas, ordem e destinos vêm do TypeScript. O frame não
autoriza prometer vaga, visita, prazo, confirmação ou operação do canal.

## Responsividade e acessibilidade

Em larguras estreitas, introdução, perguntas e banner empilham; o CTA do banner
pode ocupar nova linha ou largura total. Perguntas usam botão/summary com nome
acessível, foco visível e estado expandido; ícone `+` não é a única indicação.
A âncora compensa header fixo, textos não usam elipse e o conteúdo mantém ordem
DOM coerente. Header/footer reutilizam componentes e tokens locais.

## Limite de evidência

A captura é desktop e mostra apenas perguntas recolhidas. Estados expandidos,
copy resolvida, mobile, zoom e foco exigem verificação no navegador. O pacote
local substitui consulta obrigatória ao Figma; ERS e revisão institucional
continuam independentes.

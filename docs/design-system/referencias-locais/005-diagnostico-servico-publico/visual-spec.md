# Referência visual local — 005 Diagnóstico de serviço público

## Proveniência

- Figma `YaVUdqYa3boHpvGrxf4ZJ5`;
- questionário `387:1020`, 1440 × 1106 px;
- resultado `387:1362`, 1440 × 1106 px;
- extração por `get_design_context` e `download_assets` em 03/11/2026;
- capturas: [diagnostico-desktop.png](diagnostico-desktop.png) e
  [resultado-desktop.png](resultado-desktop.png);
- conteúdo oficial: `src/content/diagnostico/`.

## Composição e estados

Header/footer compartilhados, breadcrumb e progresso geral de quatro etapas.
No desktop, o conteúdo principal usa duas colunas e navegação inferior.

No questionário, a introdução fica à esquerda e um card branco com contador,
progresso, pergunta, apoio e três respostas fica à direita. `Sim` e `Não`
dividem uma linha; `Não tenho certeza` ocupa a largura. Cada opção deve ser um
controle real e acessível.

No resultado, título e ilustração ficam à esquerda; o painel à direita contém
ícone, título, explicação e ações. A ilustração usa `resultado-fundo.svg`,
`resultado-tela.svg` e `resultado-personagem.svg`. O frame mostra apenas uma
amostra: resultados e ações vêm de `respostas.ts` e `acoes.ts`.

## Responsividade e divergências

- abaixo de 900 px, as colunas empilham na ordem do DOM;
- opções mantêm alvo mínimo de 44 px e podem empilhar;
- progresso possui equivalente textual e não depende apenas de cor;
- cards crescem com copy e zoom; não usar alturas fixas;
- a ilustração é decorativa quando texto equivalente comunica o estado;
- o protótipo mostra cinco perguntas, mas o contrato atual contém oito;
- conteúdo versionado prevalece sobre textos, ramificações e destinos do frame;
- Inter substitui Outfit/Rawline e `Material de apoio` segue fora do MVP.

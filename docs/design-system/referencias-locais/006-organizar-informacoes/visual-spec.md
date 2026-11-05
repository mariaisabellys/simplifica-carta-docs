# Referência visual local — 006 Organizar informações

## Proveniência

- Figma `YaVUdqYa3boHpvGrxf4ZJ5`, node `387:1918`;
- extração em 03/11/2026; frame 1440 × 2188 px;
- captura: [desktop.png](desktop.png);
- conteúdo: `src/content/pages/organizar-informacoes.ts`;
- contrato: `specs/006-organizar-informacoes/contrato-orientacoes-v3.md`.

## Composição

Reutiliza shell, breadcrumb e progresso geral. O cabeçalho de etapa antecede uma
sidebar de progresso/tópicos e um painel principal com cards. Cada informação
tem marcação independente e ação para expandir orientação. O estado expandido
contém identificação, exemplos a evitar/preferir e dicas. Aviso creme e
navegação anterior/próxima encerram o conteúdo.

Referências desktop: painel principal próximo de 910 px, sidebar de 243 px,
raios de 20–24 px e sombras suaves. Nada disso autoriza altura fixa.

## Conteúdo, estados e responsividade

- renderizar três tópicos, 13 informações e o mapa 13 → 24 vigente;
- `2 de 11 informadas` é amostra histórica, não contrato;
- marcação não altera a Carta nem significa aprovação;
- expansão e marcação são estados independentes;
- abaixo de 900 px, sidebar vira resumo superior e tudo ocupa uma coluna;
- marcação e expansão são controles separados com nomes próprios;
- progresso tem equivalente textual; foco permanece no acionador da expansão;
- Inter e conteúdo versionado prevalecem; o Figma é só proveniência.

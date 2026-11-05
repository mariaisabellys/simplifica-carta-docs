# Referência visual local — 003 Explorar por etapas

## Proveniência

- arquivo Figma: `YaVUdqYa3boHpvGrxf4ZJ5`;
- node: `575:483` (`explorar-por-etapas-v2`);
- extração: `get_design_context` e `download_assets`, em 27/10/2026;
- frame: 1440 × 2134 px;
- captura normativa: [desktop.png](desktop.png);
- conteúdo oficial: `src/content/pages/explorar-por-etapas.ts`.

## Composição desktop

1. Reutiliza header e footer da 002; não os duplica na página.
2. Hero full-bleed abaixo do header, com gradiente
   `#022b45 → #094c6d → #0e6c91`, breadcrumb, H1 de 46 px e descrição de 18 px.
3. Área principal com container de até 1280 px e grid 2 × 2, gap de 32 px.
4. Cada card tem borda `#e2e8f0`, sombra leve, raio de 24 px, padding de 32 px
   e altura mínima aproximada de 420 px no desktop. Ícone e badge ficam no
   topo; botão de largura total fica na base.
5. CTA final centralizado, com texto e botão outline navy.

Tons das etapas: ciano `#0088a5`, laranja `#f97304`, navy `#0f3f67` e vinho
`#7c1b1f`. Texto de corpo: `#475569`. O badge sempre mostra `ETAPA N`; a
identificação nunca depende apenas da cor.

## Assets locais

- `help-circle.svg`, `check-square.svg`, `file-text.svg` e `book-open.svg`:
  ícones decorativos das quatro etapas;
- `chevron-right-breadcrumb.svg` e `chevron-right.svg`: variantes distintas
  para breadcrumb e ações;
- marca institucional vem de `src/assets/brand/semt-d-branco.png`.

## Adaptação responsiva

- grid 2 × 2 vira uma coluna quando o card perder largura de leitura;
- cards usam altura automática; o botão não pode sobrepor descrição longa;
- o hero e a área de cards reduzem padding lateral progressivamente;
- badge pode quebrar para baixo do ícone, preservando ordem e contraste;
- breadcrumb permite quebra segura e mantém `aria-current="page"`;
- header/footer seguem exclusivamente o contrato responsivo da 002.

## Regras de conteúdo e comportamento

- renderizar os cards por uma única lista ordenada 1–4;
- destinos e rótulos vêm de `explorar-por-etapas.ts`;
- não criar estado de progresso, bloqueio ou conclusão;
- o CTA final leva ao início do fluxo linear em `/diagnostico`;
- o layout cresce para acomodar a copy; não truncar para igualar o frame;
- Inter substitui qualquer família histórica observada no protótipo.

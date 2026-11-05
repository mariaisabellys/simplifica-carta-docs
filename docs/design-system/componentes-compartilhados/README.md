# Componentes compartilhados

Este pacote consolida as decisões visuais reutilizadas pelos lotes 002–015.
Ele não cria uma nova tela: referencia capturas já versionadas e define os
contratos consumidos por todas as features.

## Proveniência visual

| Componente | Node de origem | Referência local |
| --- | --- | --- |
| Header, marca e navegação | `310:175` (`546:652`, `310:188`) | [`002 desktop`](../referencias-locais/002-home-e-navegacao/desktop.png) |
| Footer institucional | `310:175` (`690:389`) | [`002 desktop`](../referencias-locais/002-home-e-navegacao/desktop.png) |
| Label-Row / badge Necessário | `651:317` | [contexto no mapa](../mapa-figma-telas.md#componentes-identificados) |
| Breadcrumb, botões, cards e stepper | composição recorrente nos lotes | specs visuais e tokens locais |

## Contratos

- `AppShell`: um `header`, um `main` e um `footer`; não possui copy de domínio.
- `Header`: marca acessível, navegação por teclado, `aria-current` e menu móvel sem hover.
- `Footer`: links reais, endereço versionado, logo decorativo e copyright; sem altura fixa.
- `Breadcrumb`: `nav` com nome acessível, lista ordenada e retorno explícito.
- `PageHeader`: um único `h1`, eyebrow opcional e largura adaptável ao conteúdo.
- `Button`/`ButtonLink`: alvo mínimo de 44 px, foco visível e destino preservado.
- `Card`: conteúdo por props; estados active, pending, disabled e unavailable com texto.
- `LabelRow`: label forte, indicador obrigatório textual e badge `Necessário`.
- `Stepper`: etapa atual anunciada; conectores são decoração e não bloqueiam reflow.
- `Alert`/feedback: status local, foco estável e mensagem textual para sucesso/aviso/erro.

## Tokens e assets

Usar os tokens de [`tokens-e-componentes.md`](../tokens-e-componentes.md): Inter,
navy `#0B2A4A`, teal `#1B9E95`, orange `#F47920`, escala de 4 px, raios de
6–20 px, foco visível e alvos de toque de 44 px.

Reutilizar sem duplicação `src/assets/brand/semt-d-branco.png`,
`src/assets/home/arrow-right.svg` e os assets da ajuda em
`src/assets/ajuda/`. Linhas, conectores e divisores permanecem CSS; URLs
temporárias do Figma não entram no runtime.

Este contrato documenta composição e comportamento; não comprova implementação
nem substitui testes de navegador, contraste, teclado e leitor de tela.

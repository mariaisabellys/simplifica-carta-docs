# Referência visual local — 007 Formulário da Carta de Serviço

## Proveniência e estados

Figma `YaVUdqYa3boHpvGrxf4ZJ5`, extraído em 03/11/2026.

| Parte | Node | Captura | Dimensão |
| --- | --- | --- | --- |
| 1 — Sobre o serviço | `653:1540` | [parte-1-desktop.png](parte-1-desktop.png) | 1440 × 1986 |
| 2 — Público e requisitos | `2024:269` | [parte-2-desktop.png](parte-2-desktop.png) | 1440 × 2050 |
| 3 — Como funciona | `641:58` | [parte-3-desktop.png](parte-3-desktop.png) | 1440 × 2268 |
| 4 — Atendimento | `647:650` | [parte-4-desktop.png](parte-4-desktop.png) | 1440 × 2278 |
| 5 — Informações finais | `660:2533` | [parte-5-desktop.png](parte-5-desktop.png) | 1440 × 1801 |

Conteúdo: `src/content/pages/formulario-carta.ts`. Modelo e matriz:
`modelo-central-carta.md` e `matriz-campos-v3.md`.

## Composição compartilhada

Header, breadcrumb, progresso geral e cabeçalho antecedem a região de trabalho.
No desktop, edição fica à esquerda e pré-visualização viva à direita, em
proporção aproximada de 55/45. Resumo de progresso, pendências e abas das cinco
partes aparecem acima do formulário. A prévia reutiliza a feature 009.

- Parte 1: campos básicos e orientação editorial contextual.
- Parte 2: público, requisitos/documentos, custos e grupos condicionais.
- Parte 3: coleção repetível de etapas, modalidade e prazo.
- Parte 4: agendamento, canais e condições exclusivas; alternativas lado a lado
  no frame são documentação, não dois estados simultâneos.
- Parte 5: informações adicionais, conclusão e acesso ao tutorial.

## Integração da feature 008

Mensagens aparecem junto ao alvo e no resumo. Orientação editorial não usa
`aria-invalid`, não bloqueia ações válidas e expira após edição. Sugestões nunca
alteram texto automaticamente. O `Aplicar sugestão` histórico da parte 1 deve
ser adaptado ao contrato vigente, que exige decisão humana.

## Responsividade, acessibilidade e divergências

- abaixo de 1024 px, edição e prévia empilham, com formulário primeiro no DOM;
- abas quebram ou rolam de forma controlada sem perder rótulos;
- campos são controles HTML reais com labels e mensagens associadas;
- coleções preservam foco por ID; conteúdo oculto não permanece focável;
- cards e prévia crescem com zoom/copy; não copiar alturas do frame;
- 25 campos, condições e Carta v3 prevalecem sobre dados exemplificativos;
- a prévia sintética nunca inicializa o estado real;
- Inter substitui Outfit/Rawline; o Figma é só proveniência.

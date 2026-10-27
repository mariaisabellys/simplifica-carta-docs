# Verificação T021 — Roteiro de implementação

Data: 23 de outubro de 2026.

## Resultado

A T021 foi concluída em escopo exclusivamente documental. Foi publicado o
[roteiro de implementação por dependência](../roteiro-implementacao.md), com:

- classificação das features 001–017 em pronta documentalmente, pronta com
  dependência explícita ou bloqueada por decisão;
- sete gates locais e sete lotes de implementação;
- ordem interna, dependências, checks e condição de encerramento por lote;
- acessibilidade 016 incorporada transversalmente;
- preparação do deploy estático e distinção entre teste local e publicado;
- agenda isolada no último lote, sem bloquear páginas independentes;
- primeira tarefa de código e comando interno, sem executá-los.

## Conferência do AC14

| Elemento exigido | Evidência | Parecer |
| --- | --- | --- |
| Ordem por dependência | Lotes 1–7: navegação; páginas/diagnóstico; provider/formulário; regras/projeções; tutorial/cópia; ajuda; agenda. | Atendido. |
| Bloqueios delimitados | G1–G7 e tabela 001–017 vinculam decisão, impacto e área. | Atendido. |
| Liberação por feature | Cada feature possui classificação e gate de aceite integral. | Atendido. |
| Verificação proporcional | Cada lote lista testes, typecheck/build, visual e recorte 016. | Atendido. |
| Teste publicado | F017-09/F017-10 só é tratado como publicado após ambiente aprovado; Vite local não é aceito como equivalente. | Atendido. |
| Primeira ação | 002/T007; comando `/spec:implementar 002-home-e-navegacao`. | Atendido, não executado. |
| Limite do parecer | Documento declara que prontidão documental não equivale a produto entregue. | Atendido. |

AC14 está atendido documentalmente. AC01–AC13 permanecem conforme a
[auditoria T020](t020-auditoria-cruzada-final.md).

## Estado final do ciclo

- T001–T010 e T012–T021: concluídas documentalmente.
- T011: parcial, porque a reconciliação documental está pronta, mas
  `src/content/tutorial/paraiba-digital.ts` ainda deve migrar de 10/6 para
  25/13/12 em 011/T009.
- Código, conteúdo TypeScript, testes, build, navegador, Figma e infraestrutura
  não foram modificados ou executados nesta tarefa.
- Alterações preexistentes no workspace foram preservadas.

## Checks

- links Markdown locais ativos verificados após a publicação do roteiro;
- referências a features, tarefas, gates e relatórios conferidas;
- estado T020/T021 e tabela de acompanhamento conferidos;
- `git diff --check` executado;
- hash do diff preexistente de `src/` e `tests/` comparado ao baseline T019/T020.

O próximo passo recomendado é criar o checkpoint documental e, mediante pedido
de implementação, iniciar 002/T007 pelo comando registrado no roteiro.

# Verificacao: Copia de dados no tutorial

> **Baseline atualizado em 16 de outubro de 2026:** utilitário de clipboard
> permanece válido; a projeção integrada v3 continua pendente.

## Resultado e escopo

Implementacao parcial em 2026-10-05, solicitada por
`/spec:implementar 012-copia-dados-tutorial`. Implementados src/lib/clipboard.ts
e tests/clipboard.test.mjs. T009 possui entrega isolada; nenhuma tarefa foi
marcada concluida porque suas dependencias e aceite integrado seguem pendentes.
Nao foram implementados seletores, controlador, componentes ou integracao com
a pagina do tutorial. Nenhuma area de transferencia real foi acessada.

Spec, plan, tasks, implementation-plan e validation da 012 foram analisados,
junto aos contratos/dependencias de 007/011/015 e inventario de src. Alterados
plan/tasks/implementation-plan para incluir CA15 nas matrizes, modalidades,
ambos os sistemas/formas externas, troca/restauracao com dados retidos e
ocultacao durante operacao pendente. Corrigida a ordem de como agendar apos
os quatro novos campos de agendamento. Spec e validation permanecem intactos;
validation registra a auditoria anterior, sem alegacao de resolucao integral.

## Comportamento implementado

- copiarTexto recebe a string integral, sem normalizar quebras, escapar HTML,
  acrescentar rotulos ou aplicar protecoes de CSV.
- Contexto inseguro, ausencia de browser/API/metodo retornam unavailable.
- Rejeicao, erro sincrono e erro ao acessar API retornam write-failed.
- writeText e invocado antes do primeiro await, preservando o fluxo do gesto
  quando o consumidor chamar o utilitario diretamente em seu handler.
- Sucesso so e retornado apos resolucao. Nenhuma leitura de clipboard,
  consulta previa de permissoes, fallback oculto, log de valores ou persistencia.

O utilitario nao gerencia trava, timers, foco ou selecao manual. Esses contratos
pertencem ao controlador/interface ainda pendentes; sucesso da API nao prova
colagem/cadastro externo nem permanencia do texto no clipboard.

## Verificacoes executadas

| Comando / ambiente | Resultado |
| --- | --- |
| node --test tests/clipboard.test.mjs tests/csv.test.mjs, Node 24.20.0 | 10 testes passaram: sete novos de clipboard, tres existentes de CSV |
| npm.cmd run typecheck | Passou |
| npm.cmd run build | Passou fora do sandbox apos acesso negado do esbuild no sandbox; Vite 7.3.6, 49 modulos |

Mocks verificam string literal com Unicode/CR/LF/CRLF/HTML, receiver da API,
chamada imediata, resolucao pendente, indisponibilidade, rejeicao, erro
sincrono/getter e nova tentativa. Globals de teste restaurados ao final;
nenhum clipboard do usuario foi sobrescrito. Nao comprovam permissao, gesto,
colagem, selecao manual ou acessibilidade em browser/dispositivo real.

## Atualizacao documental — 2026-10-07

- V012-01 foi resolvida: a string derivada deve ser enviada integralmente a
  `writeText`; a alternativa manual deve preservar conteudo e quebras visiveis,
  sem prometer terminadores CR/LF/CRLF identicos apos normalizacao do DOM,
  sistema operacional ou destino. Os testes devem observar os dois contratos
  separadamente e nunca normalizar a Carta para produzir igualdade artificial.
- CA15 permanece presente nas matrizes de PLAN e IMPLEMENTATION-PLAN e nos
  cenarios T013–T015, cobrindo modalidades, sistemas, formas externas,
  aplicabilidade, troca/restauracao/recarga e fonte preservada.
- Esta atualizacao fecha inconsistencias documentais; nao representa execucao
  dos testes futuros nem aceite funcional dos componentes ainda pendentes.

## Atualizacao de integracao com a 011 — 2026-10-08

- Referencia visual oficial: variante da etapa 4, [node `564:980`](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-980&m=dev).
- Montagem exclusiva em `fill-information`, por `?etapa=4`; nenhuma UI da 012
  deve aparecer nas demais etapas.
- `tutorialParaibaDigitalContent.steps[3]` governa dez blocos, ordem, labels,
  introducao, edicao e CTAs. Somente seis blocos com `copyLabel` sao copiaveis.
- O contrato interno nao cria cards adicionais. `keywords` passa a usar
  exclusivamente `informacoesFinais.palavrasChave`; permanece proibido inferir
  esse valor a partir de outros campos.
- Ao sair da etapa 4, controles, timers e feedback transitório desmontam;
  callbacks tardios sao ignorados e a Carta continua preservada no provider.

Esta atualizacao e documental. Nao comprova consulta MCP detalhada, renderizacao
do node, integracao dos componentes ou comportamento real do clipboard.

## Pendencias e decisoes

- Definir trava por instancia ou identidade do campo/sessao ao ocultar e
  remontar com escrita pendente. Cleanup de UI nao cancela writeText iniciado.
- Modelo/provider/decoder v2 da 007 e composicao/conteudo da 011 nao estao
  implementados. Nao criar outra Carta/provider para contornar isso.
- O node foi identificado, mas a consulta detalhada via Figma MCP permanece
  pendente. Constitution, secao 6, determina:
  "Antes de implementar trabalho visual, o Codex deve consultar via MCP".
  Referencia: ../../docs/processo/constitution.md. UI permanece pendente.
- Conferencia do ERS, revisao editorial/cruzada, testes reais HTTPS e matriz
  de acessibilidade/mobile ainda pendentes. CA01–CA18 nao possuem aceite
  integral; testes isolados apoiam apenas a operacao browser de T009.

V012-01–04 tiveram ajustes documentais. O reuso do utilitario pela 015 e futuro.
Alteracoes anteriores em csv.ts e specs 003–011 foram preservadas.

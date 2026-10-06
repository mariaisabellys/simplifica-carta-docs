# Verificacao: Copia de dados no tutorial

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

## Pendencias e decisoes

- V012-01: plan/tasks exigem igualdade literal da copia manual, mas textarea
  normaliza CR/CRLF. Decidir criterio da copia manual antes da interface;
  preservar a string original enviada a API independentemente dessa decisao.
- Definir trava por instancia ou identidade do campo/sessao ao ocultar e
  remontar com escrita pendente. Cleanup de UI nao cancela writeText iniciado.
- Modelo/provider/decoder v2 da 007 e composicao/conteudo da 011 nao estao
  implementados. Nao criar outra Carta/provider para contornar isso.
- Figma MCP indisponivel na sessao. Constitution, secao 6, determina:
  "Antes de implementar trabalho visual, o Codex deve consultar via MCP".
  Referencia: ../../docs/processo/constitution.md. UI permanece pendente.
- Conferencia do ERS, revisao editorial/cruzada, testes reais HTTPS e matriz
  de acessibilidade/mobile ainda pendentes. CA01–CA15 nao possuem aceite
  integral; testes isolados apoiam apenas a operacao browser de T009.

V012-02–04 tiveram ajustes documentais; a divergencia V012-01 continua
explicita, sem inventar comportamento. O reuso do utilitario pela 015 e futuro.
Alteracoes anteriores em csv.ts e specs 003–011 foram preservadas.

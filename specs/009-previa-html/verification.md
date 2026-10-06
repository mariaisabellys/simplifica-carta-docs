# Verificacao: Previa HTML

## Status e escopo

Rodada de `/spec:implementar 009` em 2026-10-05.
**Preparacao documental realizada; implementacao da previa nao iniciada.**
Nenhum codigo ou componente foi criado, teste executado ou tarefa marcada
concluida. Nao ha aceite funcional ou visual nesta rodada.

## Fontes e preparacao realizada

Conferidos SPEC, PLAN, TASK, IMPLEMENTATION-PLAN e validation.md da 009;
pagina placeholder, modelo inicial da Carta e regras de IA. Confirmada
ausencia de CartaSessionProvider e carta.preview.ts em src, assim como
node_modules. Contratos de navegacao alinhados documentalmente na rodada
006 nao comprovam entrega de contexto, breadcrumb, foco ou preservacao.

| Referencia | Resultado documental |
| --- | --- |
| V009-01 | CA19 incluido nas matrizes PLAN/IMPLEMENTATION-PLAN, com campos ativos/inativos e preservacao da fonte. Plano detalhado e TASK relacionam T002/T006/T008/T010/T014–T016. |
| V009-02 | PLAN, fixtures do plano detalhado e T014/T015 detalham modalidades, sistema nativo com dados externos retidos, externo dentro/fora e ausencias aplicaveis; T010/T016 incluem required atual, troca/restauracao/recarga e previa montada. URL permanece texto, sem executar agendamento. |
| V009-03 | Subtarefa hasContent reunida: texto ativo util, item com texto ou true/false explicito; IDs/ordens/atributos isolados nao bastam. Cenarios condicionais permanecem subtarefa separada. |

validation.md permanece registro historico. Ajustes de rastreabilidade e
testes planejados nao certificam seletor, renderizacao ou jornada reais.

## Dependencias ainda pendentes

- Modelo v2, provider/decoder e avisos de recuperacao da 007 nao entregues;
  modelo atual nao possui campos novos/IDs e usa false inicial. Nao criar
  segunda Carta ou recuperacao propria para contornar dependencia.
- Required complete/failed e resumo/retorno da 008 ainda planejados.
  Previa permanece livre com dados parciais, mas nao deve simular validacao
  ou afirmar ausencia de pendencias sem contrato real.
- Exportacao funcional da 010 nao entregue; omitir acao ficticia e manter
  T012/CA12 pendentes, conforme plano. Isso nao autoriza download simulado.
- Figma sem confirmacao posterior de instalacao/conexao; node 821:308 e
  referencia local, sem consulta Design/Make ou pagina completa confirmada.
  `docs/ia/regras-para-ia.md` exige consulta via MCP antes de implementar
  visualmente. Nao presumir medidas/tokens/estados do cartao pelos snippets.
- ERS PDF nao confrontado e copy nao homologada; mapas de enums/significados
  precisam de conteudo versionado conciliado com a 007. Politica de URL da
  007/008 permanece pendente; a previa nao transforma URL em navegacao.
- Resumo em contexto preview, alvos/foco de grupos condicionais, navegacao,
  ajuda e ambientes assistivos precisam de entrega/verificacao integrada.

## Checks e arquivos alterados

Verificada cobertura CA19 nas matrizes e atualizacao das tarefas/fixtures;
git status de src permaneceu sem alteracoes. Nenhum build/typecheck,
instalacao de dependencias, teste de browser/storage ou migration foi executado.

Alterados plan.md, tasks.md e implementation-plan.md da 009; criado este
registro. SPEC, pagina, estilos, rotas, schema/storage e backend permaneceram
intactos. Alteracoes preexistentes no workspace foram preservadas.

Retomar com fonte unica e contratos reais da 007/008, referencias/decisoes
pertinentes fechadas: implementar seletor puro, conteudo/cartao seguros,
pagina/estados/retorno e testes. Integrar 010 quando operacional; registrar
checks reais e dependencias ainda abertas sem declarar aceite integral.

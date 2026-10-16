# Verificacao: Validacao e linguagem simples

> **Baseline atualizado em 16 de outubro de 2026:** o aceite integrado continua
> pendente sobre o modelo v3 da 007.

## Status

Rodada de `/spec:implementar 008` em 2026-10-05.
**Preparacao documental realizada; implementacao dependente nao iniciada.**
Nenhum codigo, componente, pacote ou teste foi alterado/executado nesta rodada.
Nenhum criterio recebeu aceite funcional ou tarefa foi marcada concluida.

## Conferencia e correcoes

Lidos SPEC, PLAN, TASK, IMPLEMENTATION-PLAN e validation.md; conferidos
carta.validation.ts, lib/validation.ts, schema/modelo da 007, inventario de
consumidores e instrucoes locais. Busca nao encontrou AGENTS.md no repositorio.

| Referencia | Resultado documental |
| --- | --- |
| V008-01 | CA19 corrigido para duas colunas no PLAN e tres no plano detalhado, com tarefas reais em vez de resultado esperado na coluna Tarefas. |
| V008-02 | PLAN/plano detalhado/T017 detalham null/Nao, Sim sem tipos/sistema, Online/Presencial/ambos, enums/lista invalidos, externo/nativo e troca/restauracao/recarga. T019/T020 incluem retirada de mensagens inativas e equivalencia formulario/CSV. |
| V008-03 | Snapshot/revisao inclui aplicabilidade, alem do texto. Callback exige alvo existente/ativo e revisao atual; troca de condicao cancela/invalida resultados sem apagar valores. Parte fechada visualmente nao e campo inativo. T012/T019 explicitam a regressao com texto preservado. |

validation.md permanece registro historico. Correcoes encerram lacunas de
texto, sem comprovar controlador implementado, testes ou homologacao.

## Dependencias e decisoes pendentes

- Modelo v2, provider, IDs e formulario da 007 ainda nao entregues. A pagina
  permanece placeholder; integracao de blur/revisao/resumo/foco nao tem base real.
- SPEC RF02 e T002 exigem decidir protocolos/politica da URL antes do codigo.
  URL absoluta nao e decisao sobre protocolos aceitos; nenhuma politica HTTPS
  exclusiva ou integracao externa foi inventada nesta rodada.
- Catalogo versionado (240 pontos de codigo, termos/mensagens, fronteiras de
  hifen/apostrofo) ainda depende de validacao editorial. Metas/fixtures/timing
  sao candidatos, sem medicao ou homologacao institucional.
- ERS PDF continua sem inspecao. Manual textual nao substitui fonte original.
- Sem confirmacao posterior de instalacao/conexao Figma; consulta Design/Make
  continua pendente. Nao repetida sugestao de integracao ignorada anteriormente.
  `docs/ia/regras-para-ia.md` exige consulta via MCP antes de implementar estados
  visuais; nodes locais nao comprovam estilos, erro, sugestao ou resumo.
- useAppNavigate da 002/003/006 esta alinhado documentalmente; contexto/links
  reais e contrato de retorno/foco ainda precisam de entrega/testes.
- Consumidores 009/010/012 nao entregam jornada completa: CA09/CA10 permanecem
  pendentes, sem confundir teste unitario de helper com gate integrado.

## Verificacoes e arquivos

Conferidas cardinalidade das linhas CA19 e referencias de aplicabilidade,
timers, testes e tarefas. git status de src permaneceu sem alteracoes.
Node 24.20.0/npm 11.19.0 encontrados; node_modules ausente e suite nao
configurada. Nenhuma instalacao/build/typecheck foi realizada como evidencia
de funcionalidade ainda nao implementada.

Alterados plan.md, tasks.md e implementation-plan.md da 008; criado este
registro. SPEC, src, schema/storage, backend e demais alteracoes existentes
no workspace foram preservados.

Retomar com contratos/decisoes pertinentes fechados: implementar tipos,
catalogo e motores independentes, testar defensividade/Unicode/pureza/falhas,
depois integrar controlador/UI/consumidores e executar checks/ambientes reais.
Nao considerar este registro implementacao ou aceite integral.

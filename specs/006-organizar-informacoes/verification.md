# Verificacao: Organizar informacoes

> **Historico superado em 6 de outubro de 2026:** esta verificacao trata do
> contrato antigo de dez assuntos estaticos. Ela nao comprova nem invalida o
> contrato oficial atual de tres topicos e 13 informacoes; uma nova verificacao
> sera necessaria apos a reconciliacao documental e a implementacao.

## Status e escopo

Rodada de `/spec:implementar 006` em 2026-10-05.
**Implementacao da pagina nao iniciada: referencia visual e conciliacao
institucional continuam pendentes.** O comando autoriza codigo, mas nao
substitui as fontes exigidas pelos documentos do projeto.

Conferidos os quatro artefatos, validation.md, codigo de App/AppShell,
ButtonLink/placeholder, conteudo da entrada 003 e instrucoes locais.
Nao foram encontrados AGENTS.md no inventario do repositorio.

## Preparacao concluida nesta rodada

| Referencia | Resultado documental |
| --- | --- |
| V006-01 | PLAN alinhado a dez IDs/assuntos; nome popular opcional dentro de Nome. |
| V006-02 | Tabela do plano detalhado inclui tipo/sistema e URL/exibicao somente para sistema externo, mantendo orientacao opcional. |
| V006-03 | Exemplo Breadcrumb da 003 alinhado a useAppNavigate da 002/006; preserva clique modificado, target/download, eventos ja tratados e destinos externos. Componentes reais ainda ausentes. |
| V006-04 | Registro historico corrigido: 005/007/013/016 possuem documentos, enquanto implementacao e aceite permanecem independentes. |
| V006-05 | CA10 permite hook compartilhado de navegacao e proibe hooks/efeitos de dominio, storage/API/progresso. |
| V006-06 | Plano detalhado referencia cinco obrigatorios gerais e obrigatoriedade condicional da 007/008, sem validar nesta pagina consultiva. |

validation.md permanece registro historico da rodada anterior. As correcoes
acima encerram inconsistencias de texto, sem declarar T005 aprovado ou resolver
dependencias executaveis. Nenhuma tarefa foi marcada concluida.

## Bloqueios verificados

- Na rodada original, nenhuma consulta Figma foi concluida. Posteriormente, o
  node `387:1918` foi identificado como frame proprio da 006 e registrado no
  mapa. Design e Make ainda precisam de consulta detalhada antes da
  implementacao visual.
- `docs/ia/regras-para-ia.md` exige consulta visual via MCP antes de
  implementar e admite solicitar link com node-id, exportacao ou captura
  especifica quando a referencia retornada e insuficiente. Nao inventar
  layout usando frame 575:483 da 003.
- PDF ERS nao inspecionado e copy institucional nao homologada; manter
  P006-01/P006-03 pendentes. Manual textual nao substitui PDF.
- NavigationContext/Breadcrumb e contrato onNavigate em ButtonLink ausentes
  no codigo atual; sua entrega minima precisa de verificacao integrada.
  Formulario/provider 007 e ajuda 013 permanecem dependencias de aceite.

## Checks e aceite

Node/npm foram encontrados; node_modules esta ausente. Nao houve instalacao
de pacotes, build/typecheck ou teste de browser, pois nenhum codigo foi
alterado. Nenhum CA01–CA12 recebeu aceite funcional nesta rodada.

Arquivos alterados: plan.md e implementation-plan.md da 006, exemplo de
Breadcrumb em implementation-plan.md da 003, e este registro novo.
Pagina, estilos, rotas, schema/storage e backend permanecem intactos.

Retomar a mesma implementacao quando a referencia visual estiver acessivel,
conciliar ERS/copy e registrar decisoes antes de entregar conteudo/pagina,
navegacao minima e estilos. Depois executar typecheck/build e verificacoes
reais disponiveis, registrando integracoes/ambientes ainda pendentes.

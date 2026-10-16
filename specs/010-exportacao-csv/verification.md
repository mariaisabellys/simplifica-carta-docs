# Verificacao: Exportacao CSV

> **Baseline atualizado em 16 de outubro de 2026:** o helper existe, mas a
> exportação integrada da Carta v3 continua pendente.

## Resultado e escopo

Rodada de `/spec:implementar 010-exportacao-csv` em 2026-10-05.
**Implementacao parcial: serializador generico concluido e verificado;
exportacao completa/integracao/aceite permanecem pendentes.**

Implementada a parte nao visual de contrato definido de T009, independente
do provider/modelo v2 e da politica candidata de formulas. Nenhum componente,
botao, download, backend ou migracao foi criado. T009 permanece desmarcada,
pois tambem inclui artefato/mapeamento completo. Nenhum CA integrado aprovado.

## Alteracoes executaveis

- `src/lib/csv.ts`: aceita arrays readonly, coloca todas as celulas entre
  aspas, duplica aspas internas, usa CRLF entre registros e no final, preserva
  CR/LF/CRLF internos e retorna vazio para ausencia de registros. Nao altera fonte.
- `tests/csv.test.mjs`: runner nativo Node, sem novo framework/pacote;
  regressao de delimitadores, Unicode, aspas, quebras internas e tentativa
  de produzir outra celula com aspas/virgula. Fixture congelada demonstra
  ausencia de mutacao. BOM e protecao de formulas nao sao responsabilidade
  desse serializador; testados como nao adicionados nessa camada.
- Consumidor existente `gerarCsvDaCarta` permanece com oito campos antigos;
  recebe novo formato sintatico, sem afirmar cobertura dos 17 dados ou
  seguranca para abertura em planilhas. Busca identificou somente esse caller
  de criarCsv; nao existe botao/download funcional que publique o helper.

## Consolidacao documental

| Referencia | Resultado |
| --- | --- |
| V010-01 | PLAN, T014 e fixture do plano detalhado corrigidos para 17 dados + cabecalho = 18 registros logicos, sem registro vazio por CRLF final. |
| V010-02 | CA19 incluido nas matrizes PLAN/IMPLEMENTATION-PLAN; T006/T021 agora abrangem CA01–CA19. |
| V010-03 | T014/T016 e fixtures detalham modalidades em ordem fixa, enums traduzidos, sistemas/formas de exibicao, inativos vazios e fonte preservada; pipeline exige required condicional do mesmo snapshot. |

validation.md permanece registro historico. Documentacao de testes planejados
nao e evidencia de que pipeline, mapeamento ou condicoes foram implementados.

## Verificacoes executadas

Ambiente: Windows/PowerShell, Node 24.20.0 e npm 11.19.0.

| Comando | Resultado observado |
| --- | --- |
| node --test tests/csv.test.mjs | 3 testes passaram, 0 falhas. Node executou TS diretamente; nao comprova navegadores/planilhas. |
| npm.cmd ci --ignore-scripts --no-audit --no-fund | Tentativa inicial falhou com EPERM no cache fora do workspace; repeticao com permissao ampliada instalou 69 pacotes. Nenhuma dependencia/lockfile alterado. |
| npm.cmd run typecheck | Passou, exit 0. |
| npm.cmd run build | Tentativa inicial falhou por acesso negado do sandbox ao carregar configuracao Vite; repeticao com permissao ampliada passou, 49 modulos e assets de producao gerados. |

Nao foram testados download, BOM do artefato, parser independente do CSV
completo, formula em Excel/Calc, browsers/leitores ou desempenho do pipeline.
Build nao aprova estes comportamentos. Nenhum dado real foi exportado/enviado.

## Pendencias para completar a feature

- Entregar modelo/provider/decoder da 007, required complete/failed/condicional
  da 008 e slot/pagina real da 009. Nao criar Carta ou regras paralelas.
- Fechar politica de formulas e verificar nas planilhas suportadas; prefixo
  apostrofo continua candidato. Quoting nao neutraliza formula.
- Implementar os 17 campos, formatadores/mapas compartilhados, snapshot,
  safety, BOM/Blob, download/cleanup, hook e retorno/foco reais.
- Invalidar blocked ao editar a Carta sem repetir download; medir custo
  sincrono/gesto e rever fluxo prepared quando necessario.
- Figma/ERS/copy continuam pendentes; regras locais exigem consulta Design/
  Make antes de trabalho visual. Nao houve dispensa ou consulta nesta rodada.
- Validar CA01–CA19 em consumidores reais, planilhas/browsers, acessibilidade
  e desempenho; ambiente nao executado permanece pendente.

## Arquivos e continuidade

Alterados src/lib/csv.ts, plan.md/tasks.md/implementation-plan.md da 010;
criados tests/csv.test.mjs, verification.md e quickstart.md desta feature.
package.json/package-lock.json, modelo/storage e demais modificacoes
preexistentes foram preservados. Dependencias/build gerados ficam nas pastas
ignoradas do projeto.

Continuar pelas dependencias e tarefas restantes acima; nao considerar esta
rodada entrega integral da exportacao, interface ou homologacao de CSV.

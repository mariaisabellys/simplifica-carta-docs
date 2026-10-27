# Verificação T011 — Tutorial Paraíba Digital

Data: 20/10/2026. Escopo: somente documentação.
Estado: **parte documental executada; T011 global parcial**, pois o item 1
exige alteração em paraiba-digital.ts, expressamente preservado nesta rodada.

## Alterações

- Criado contrato-integracao-v3.md com matriz externa de 25 paths e condições,
  separação editorial/sessão, migração prevista do conteúdo e IT01–IT11.
- Reconciliados spec, plan, tasks, implementation-plan e validation;
  CA01–CA17 preservados/atualizados e CA18–CA20 acrescentados.
- Seis versões anteriores preservadas em historico/2026-10-20-pre-t011-*.md,
  com links relativos ajustados. Snippets antigos não são base de implementação.
- Mapa Figma esclarece 564:980 ampliável, cinco grupos e valores da Carta.
- Nenhum código, conteúdo TypeScript, teste ou dependência alterado.

## Cobertura da tarefa global

| Item T011 | Resultado |
| --- | --- |
| 1 — Atualizar conteúdo | Pendente fora do escopo documental; migração e preservação das outras cinco etapas especificadas |
| 2 — Lista fixa / fonte de valores | Regra documental reconciliada com 012; aplicação no conteúdo pendente |
| 3 — Exemplos/lorem ipsum | Destino especificado: não usar como dados, somente eventual fixture ilustrativa separada; remoção no TS pendente |
| 4 — Specs/critérios/mapa | Atualizados, variante sem limite de campos |
| 5 — Links/âncoras/fallback/edição | Contrato fechado com alvos reais, registro da 007 e foco coordenado; implementação futura |
| 6 — Matriz externa/fontes | 25 linhas locais; URL, correspondência, fonte/data, instruções e GIFs explicitamente pendentes |
| 7 — Teste integrado | IT01–IT11 documentados; nenhuma execução funcional |

## Checks documentais

Verificação local registrada após edição: comparar 25 paths/IDs/condições com
012 e matriz central; conferir CA01–CA20 e IT01–IT11; resolver links locais;
buscar seletores legados nos documentos ativos; comparar arquivos históricos;
executar git diff --check; conferir ausência de diff em src e tests.
Os resultados efetivos estão no registro abaixo; nenhum check substitui
validação operacional, visual ou teste de browser.

| Check executado em 20/10/2026 | Resultado |
| --- | --- |
| Script Node de leitura: matriz 011 × 012 × matriz central 007 | 25 paths existentes; IDs, ordem e condições da 011 iguais à 012; 13 definições abertas e 12 escolhas |
| IDs dos critérios e cenários previstos | CA01–CA20 e IT01–IT11 completos, sem lacunas |
| Resolução de links locais dos sete documentos ativos da 011 | 41 destinos de arquivo existentes; não verifica conteúdo externo nem existência de fragmentos HTML futuros |
| Busca de seletores antigos nos documentos ativos | Nenhum identificacao.*, requisitos.*, atendimento.canais/prazo/custo/orientacaoAgendamento ou prefixo carta-copia- |
| Comparação dos históricos com versões lidas antes da edição | Seis arquivos iguais, salvo ajuste dos links relativos |
| Leitura do conteúdo atual | Confirmados dez quickCopyFields, seis copyLabel e lorem ipsum; prova da pendência, não de sincronização |
| git diff --check | Sem erros |
| git diff --name-only -- src tests | Sem saída; nenhuma alteração rastreada nessas áreas |

Não executados: testes funcionais, suíte, typecheck, build, clipboard real,
browser, consulta Figma/ERS ou validação administrativa. As alterações desta
rodada estão restritas a Markdown, incluindo históricos e mapa.

## Pendências e retomada — estado em 20/10/2026

Autorizar uma rodada de conteúdo para executar o item 1/T009 local, mantendo
as demais etapas e verificando consumidores. Só então reavaliar o aceite
“conteúdo e 011/012 descrevem a mesma tela completa”.
Fontes administrativas/URL, ERS, Figma, assets autorizados, revisão institucional,
implementação e testes reais seguem pendentes. Não anunciar publicação automática
ou correspondência homologada. Consultas históricas não foram repetidas aqui.
Destino de `Concluir Guia` fechado documentalmente na T015: home `/`, sem
limpar a Carta ou comprovar publicação. O conteúdo tipado ainda expõe somente
`kind: finish`; a ligação funcional do destino permanece em T013.

## Sincronização de conteúdo — 27/10/2026

T009 local e a parcela de conteúdo da T011 global foram concluídas. Em
`src/content/tutorial/paraiba-digital.ts`, a etapa 4 deixou de conter dez
`quickCopyFields`, seis `copyLabel`, lorem ipsum, URL e valores ilustrativos.
`tutorialCartaDataContent` passou a referenciar a projeção da feature 012 com
cinco grupos, 25 definições, 13 textos copiáveis e 12 escolhas informativas.
As outras cinco etapas, IDs, percentuais, ações e o export de compatibilidade
foram preservados.

Checks executados: busca pelos identificadores/valores removidos, conferência
das cardinalidades 25/13/12, `npm run typecheck`, `npm run build`, links locais
dos artefatos alterados e `git diff --check`. A página continua provisória e a
região da 012 ainda não foi implementada; não foram executados clipboard,
IT01–IT11, browser, inspeção Figma/ERS ou validação da plataforma externa.

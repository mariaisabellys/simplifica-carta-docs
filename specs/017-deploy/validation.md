# Validação documental: Deploy e ambientes

Data: 22 de outubro de 2026.

## Base e fontes consultadas

- sete artefatos previstos pela convenção documental;
- `package.json`, `vite.config.ts`, `index.html` e `.gitignore`;
- contratos de arquitetura, navegação e agenda;
- ADR-003 aceita e ADR-004 ainda proposta;
- artefatos das features 014–016;
- documentação oficial atual do Vite para build, base, variáveis e deploy
  estático.

Não foram consultados consoles de nuvem, DNS, certificados, bancos, SMTP ou
ambientes publicados. Nenhum fornecedor foi selecionado.

## Resultado por dimensão

| Dimensão | Resultado | Justificativa |
| --- | --- | --- |
| Prontidão documental da 017 | Atendida para iniciar decisões/implementação | Escopo, requisitos DP01–DP20, plano, tarefas e roteiros existem |
| Implementação do frontend | Não validada | Navegação, provider, 404, pipeline e configuração ainda têm lacunas |
| Deploy estático | Não executado | Não há ambiente/URL/provedor aprovados |
| Agenda operacional | Bloqueada | IN01–IN08, ADR-004, API, banco, worker e operação pendentes |
| Aceite visual/assistivo | Não executado | Pertence também à 016 e requer ambiente funcional |
| Produção | Não autorizada | T018 é exclusivamente documental |

## Conferências documentais

| ID | Conferência | Resultado |
| --- | --- | --- |
| V017-01 | Pasta 017 existia antes da tarefa | Confirmado: existia vazia |
| V017-02 | Frontend e agenda têm trilhos distintos | Atendido em spec/plan/tasks |
| V017-03 | 12 URLs, fallback, 404, query/hash têm testes previstos | Atendido por DP03/DP04/PUB01–PUB08 |
| V017-04 | HTTPS, assets, cache, headers e base têm destino | Atendido por DP02/DP05/DP06/DP08 |
| V017-05 | Variável pública não é tratada como segredo | Atendido por DP07/DP13 |
| V017-06 | API, proxy, banco, worker/outbox e SMTP falso têm destino | Atendido por DP10–DP14 |
| V017-07 | Ambiente sintético não usa dados reais | Atendido por DP14 e quickstart |
| V017-08 | Stack e fornecedor não foram inferidos | Atendido; INF01–INF10 abertos |
| V017-09 | Deploy estático pode avançar sem agenda ativa | Atendido por DP16, mantendo canal indisponível/pausado |
| V017-10 | Nenhum teste/deploy foi declarado executado | Atendido nos sete artefatos |

## Pendências abertas

- INF01–INF10 da própria feature.
- IN01–IN08 e aprovação/substituição da ADR-004.
- implementação das lacunas da T015 e aceites transversais da 016.
- criação futura de pipeline, adaptador, ambiente, backend e runbooks.
- execução real de PUB01–PUB12, AGD01–AGD05 e suites de cada feature.

## Parecer

A feature 017 está **documentalmente estruturada**, mas não está pronta para
produção. O trilho A pode seguir para decisões e implementação próprias. O
trilho B permanece fechado até as aprovações e evidências listadas. Não há
contradição em publicar futuramente conteúdo estático com a agenda indisponível,
desde que a interface comunique esse estado de modo verdadeiro.

## Revalidação T019 — 22/10/2026

Parecer atual: **plano de deploy coerente; nenhuma infraestrutura entregue**.
DP01–DP20 seguem para F017-01–F017-21 e PUB01–PUB12/AGD01–AGD05. As fontes
oficiais atuais do Vite confirmam `dist/`, preview somente local, base pública e
exposição de `VITE_*`. INF01–INF10 e IN01–IN08 permanecem abertos; não há URL,
pipeline, HTTPS, proxy, banco ou worker. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

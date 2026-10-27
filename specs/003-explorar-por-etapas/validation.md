# Validação atual: Explorar por etapas

## Parecer

Validação documental de 22/10/2026. Spec, plan, tasks, implementation-plan,
quickstart e conteúdo tipado foram comparados com os contratos T015/T016.

Resultado: **documentação pronta com lacuna funcional explícita**. Os quatro
cards e o CTA final possuem destinos definidos, mas página e rota ainda não
existem no registro do aplicativo.

## Achados

| ID | Estado | Evidência/encaminhamento |
| --- | --- | --- |
| V003-01 | resolvido documentalmente | Identificador/pasta normalizados e conteúdo final versionado. |
| V003-02 | resolvido documentalmente | Breadcrumb/links usam AppLink e contrato de URL completa, sem handler local. |
| V003-03 | aberto para implementação | Registrar `/explorar-por-etapas`, página e metadata; hoje são 12 paths planejados e 11 registrados. |
| V003-04 | dependência de destinos | 005/006/007/011 podem estar parciais; card não deve fingir maturidade do destino. |
| V003-05 | aguardando fonte | Node `575:483` identificado, sem inspeção visual autenticada na T016. |

Nenhum teste, build, browser ou Figma foi executado nesta validação.

## Revalidação T019 — 22/10/2026

Parecer atual: **documentação/conteúdo coerentes; rota e página ausentes**.
`explorar-por-etapas.ts` permanece fonte editorial, enquanto as tarefas
T011–T032 cobrem assets, rota, composição e testes. O node `575:483` existe e
respondeu por metadados; isso não valida layout. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

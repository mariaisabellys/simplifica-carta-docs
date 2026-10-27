# Validação atual: Home e navegação

## Parecer

Validação documental registrada em 22/10/2026 contra spec, plan, tasks,
implementation-plan, quickstart, conteúdo home, rotas/shell e contratos T015/T016.

Resultado: **contrato documental coerente; implementação atual não atende a
home nem a navegação especificadas**. A feature pode seguir para implementação
após conferir fontes visuais, sem criar API paralela.

## Achados

| ID | Estado | Evidência/encaminhamento |
| --- | --- | --- |
| V002-01 | resolvido documentalmente | Copy versionada e documentos alinham hero, processo e CTA educativo. |
| V002-02 | resolvido documentalmente | T015 substituiu exemplos concorrentes por provider/hooks/AppLink e URL completa. |
| V002-03 | aberto para implementação | HomePage atual ainda é placeholder e não usa o conteúdo aprovado integral. |
| V002-04 | aberto para implementação | App/AppShell ainda usam pathname/onNavigate; faltam search/hash, 404, título, foco, scroll e skip. |
| V002-05 | dependência 003 | Link `/explorar-por-etapas` é válido no contrato, mas a rota ainda não está registrada. |
| V002-06 | aguardando fonte | T016 não acessou visualmente `310:175`/Make; aceite visual permanece pendente. |

Não foram executados testes, build, browser ou Figma nesta validação. Os
roteiros do quickstart são previstos, não resultados.

## Revalidação T019 — 22/10/2026

Parecer atual: **contrato coerente; implementação não pronta**. `home.ts` mantém
o conteúdo aprovado, mas HomePage ainda não o consome integralmente; provider,
URL completa, 404, título, foco, scroll e rota 003 continuam pendentes em
T007–T029. O node `310:175` respondeu por metadados, sem inspeção visual. A
rastreabilidade e os limites estão na
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

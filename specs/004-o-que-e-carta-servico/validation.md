# Validação atual: O que é uma Carta de Serviço

## Parecer

Validação documental registrada em 22/10/2026 e atualizada em 27/10/2026.
Conteúdo, documentos, rota e implementação placeholder foram comparados. A
ementa e a URL do Decreto nº 9.756/2019 foram reconsultadas no Planalto na
atualização mais recente.

Resultado: **conteúdo/contrato documental coerentes; página funcional ainda
pendente**. A alegação histórica de consulta Figma permanece preservada, mas a
T016 não conseguiu repetir a inspeção e não fornece aceite visual atual.

## Achados

| ID | Estado | Evidência/encaminhamento |
| --- | --- | --- |
| V004-01 | resolvido documentalmente | Copy cobre importância, fundamentos, dez campos e três normas. |
| V004-02 | aberto para implementação | `OQueECartaPage` continua com PageHeader/PlaceholderCard, sem conteúdo completo. |
| V004-03 | dependência compartilhada | Breadcrumb/header/footer/links devem usar navegação 002/T015. |
| V004-04 | resolvido documentalmente | Decreto nº 9.756/2019 reconsultado no Planalto em 27/10/2026; resumo alinhado à ementa sobre a unificação dos canais digitais do Governo federal. Links das três normas permanecem sujeitos ao teste funcional T035. |
| V004-05 | aguardando visual | Node `365:265` mapeado; inspeção atual e responsividade pendentes. |

Nenhum link externo foi aberto e nenhum teste/build/browser foi executado.

## Revalidação T019 — 22/10/2026

Parecer atual: **ajuste editorial obrigatório antes da implementação**. Os três
links do Planalto responderam e a Lei nº 13.460/2017 e o Decreto nº 9.094/2017
sustentam o conteúdo principal. No Decreto nº 9.756/2019, a ementa oficial fala
em “unificação dos canais digitais”, enquanto o conteúdo usa “migração dos
sítios e portais”; revisar a paráfrase e a evidência de T006/T013 sem alterar a
fonte por inferência. A página continua placeholder. O node `365:265` respondeu
por metadados, sem aceite visual. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

## Correção legal — 27/10/2026

O bloqueio editorial apontado pela T019 foi encerrado. A fonte oficial apresenta
a ementa “Institui o portal único ‘gov.br’ e dispõe sobre as regras de
unificação dos canais digitais do Governo federal”. O resumo versionado em
`src/content/pages/o-que-e-carta.ts` e as ocorrências normativas ativas da
feature passaram a usar essa redação.

Esta correção aprova documentalmente o resumo e a URL consultada; não comprova
renderização, abertura do link, vigência futura, aceite visual ou funcionamento
da página. V004-02, V004-03 e V004-05 permanecem inalterados.

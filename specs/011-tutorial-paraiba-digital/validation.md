# Validação documental: Tutorial Paraíba Digital

> **Revalidação vigente — 27/10/2026:** `/spec:validar` reexecutado após a
> sincronização 25/13/12. Contrato e conteúdo local estão coerentes; fontes
> administrativas, composição, assets e testes permanecem pendentes. Evidência
> no [registro seletivo](../../docs/verificacoes/revalidacao-contratos-2026-10-27.md).

20/10/2026 — T011 de docs/tasks.md; revalidada em 27/10/2026 após conteúdo.
Resultado: **contratos e conteúdo local reconciliados; implementação e aceite
operacional/funcional ainda pendentes**. Não é autorização para publicar tutorial.

## Revisão atual

[Spec](spec.md), [plan](plan.md), [tasks](tasks.md),
[implementation-plan](implementation-plan.md) e [contrato v3](contrato-integracao-v3.md)
adotam a mesma integração 007/012: 25 campos, cinco grupos, 13 definições
abertas/12 escolhas, condições e âncoras por projeção, sem exemplos como valores.
A [validação anterior](historico/2026-10-20-pre-t011-validation.md)
foi preservada como histórico, não como evidência de funcionalidade atual.

| Achado | Tratamento documental / situação |
| --- | --- |
| V011-01 — CA17 faltava nas matrizes | IT03/06 e tarefas locais T003/004/012/016 cobrem condições e alvos; não é teste executado |
| V011-02 — Âncoras para campos inexistentes | Contrato deriva alvos apresentados, fallback tutorial-dados na etapa 4 e título nas outras; implementação pendente |
| V011-03 — Cenários de modalidade/sistema incompletos | IT03/05–07 cobrem troca, restauração, recarga e operação pendente; execução pendente |
| V011-04 — Classificação externa ambígua | 25 linhas pendentes; confirmar/complemento/sem equivalente somente após evidência |
| V011-05 — Snippets/modelo legados | Substituídos no plano ativo; versões anteriores isoladas em histórico |
| V011-06 — Conteúdo ainda com dez exemplos/seis copyLabel | Resolvido em 27/10/2026: lista e exemplos removidos; conteúdo referencia projeção 012 com 25/13/12 |
| V011-07 — Falta de evidência operacional | URL administrativa, menus, estados, matriz e GIFs continuam pendentes |

## Limites de aceite

CA01–CA20 são critérios futuros, nenhum aprovado funcionalmente nesta rodada.
Não houve nova consulta externa, leitura do PDF ERS, Figma MCP, aprovação
institucional, browser/clipboard, teste, typecheck ou build.
A fonte editorial está sincronizada, mas isso não implementa a região 012 nem
homologa as outras cinco etapas ou as instruções da plataforma externa.

Para fechar: executar migração autorizada de conteúdo e checks; obter evidência
operacional/visual/ERS; implementar integrações e executar IT01–IT11 e testes
da 012. Registrar resultado por critério, sem usar data documental como data
de revisão institucional. Checks locais desta rodada em [verification](verification.md).

## Revalidação T019 — 22/10/2026

Parecer histórico em 22/10/2026: a feature estava documentalmente parcial por
causa dos exemplos. Essa parcela foi encerrada em 27/10/2026; RF01–RF07/CA01–CA20
e IT01–IT11 continuam destinados a T001–T018. Os seis nodes responderam por
metadados e o portal público Paraíba
Digital está acessível; login, URL administrativa, menus, permissões e fluxo de
cadastro não foram verificados. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

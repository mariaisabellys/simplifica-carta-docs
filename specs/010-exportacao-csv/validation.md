# Validação documental: Exportação CSV

> **Revalidação vigente — 27/10/2026:** `/spec:validar` reexecutado após a
> propagação do modelo v3. Contrato documental coerente; G4, implementação e
> testes em planilhas reais permanecem pendentes. Evidência no
> [registro seletivo](../../docs/verificacoes/revalidacao-contratos-2026-10-27.md).

## Parecer de 19/10/2026 — T009

Autor: Codex. Base: HEAD 7948d35 e alterações documentais T003–T008 preservadas.
**Matriz v3 consolidada documentalmente; segurança/aceite integrado pendentes.**
[Validação anterior](historico/2026-10-19-pre-t009-validation.md).

Fontes: sete artefatos 010, matriz 007, projeção 009, helpers CSV/validação,
tipos/schema, tests/csv.test.mjs e package.json. OWASP CSV Injection consultada
em 19/10, link no contrato. Sem Figma/ERS ou execução em browser/planilha.

| ID | Estado / resolução | Próxima ação |
| --- | --- | --- |
| V010-01 | Resolvido documentalmente: matriz única de 22 dados, não 17; cabeçalho totaliza 23 registros lógicos. | F010-04/06 implementam e testam. |
| V010-02 | CA19 preservado nas matrizes/tarefas, CA20 cobre contagem e chaves. | Verificação futura por F010-12. |
| V010-03 | EX07/08 cobrem S/ON/E, presencial, nativo/externo e retenção; K também explícita. | F010-04/07. |
| V010-04 | Resolvido documentalmente: obrigatoriedade 007, editorial 008 sem gate, mesmo snapshot. | F010-03; helper estrutural ainda incompleto. |
| V010-05 | Segurança aguardando validação real; apóstrofo candidato não homologado, consulta não comprova eficácia. | F010-02/05/09 antes da liberação. |
| V010-06 | Resolvido documentalmente: 25 definições, agregações, rótulos e diferenças do helper explícitos. | F010-04, preservar fonte e todos os atributos úteis. |
| V010-07 | Lifecycle/gesto/performance propostos, não verificados. | F010-07/10/11 em ambientes reais. |

MC-03/04/05/08 foram fechadas na matriz 007; implementar sem reinterpretá-las.
A representação Ativo/Inativo não certifica confirmação ou publicação. Consulta visual,
ERS/copy, provider/foco/slot e compatibilidade são dependências de entrega.
Planejamento pode orientar próximos trabalhos autorizados; não declara produção
segura, implementação completa ou testes funcionais aprovados.

## Revalidação T019 — 22/10/2026

Parecer atual: **matriz documental coerente; segurança e compatibilidade não
homologadas**. RF01–RF07/CA01–CA20 seguem para F010-01–F010-12; 22 dados/23
registros lógicos permanecem distintos das 25 definições do formulário. Helper
e testes isolados existentes não comprovam planilhas reais, mitigação de
fórmulas, gesto, lifecycle ou performance. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

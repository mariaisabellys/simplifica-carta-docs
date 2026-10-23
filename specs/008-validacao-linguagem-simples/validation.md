# Validação documental: Linguagem simples

## Estado em 19/10/2026 — T007

Autor do registro: Codex. Base: estado local sobre HEAD 7948d35, incluindo
T003–T006 e alterações documentais preexistentes. **Contrato operacional definido
com dependências delimitadas; não liberado como implementação integral.**
[Relatório anterior preservado](historico/2026-10-19-pre-t007-validation.md).

Consultados spec/plan/tasks/implementation-plan da 008, matriz v3 e contrato
de orientações 006, contrato de contagem T005, conteúdos 006/007 já conferidos
nesses contratos, src/lib/validation.ts e carta.validation.ts.
Sem consulta externa Figma, ERS, aprovação institucional ou teste funcional.

## Achados e decisões

| ID | Estado e evidência | Próxima ação/responsável |
| --- | --- | --- |
| V008-01 | Aguardando aprovação editorial. Tabela LS03 preserva seis linhas originais + 21 pares; contrato distingue sugestões de reescrita contextual. | Responsável editorial: aprovar leitura/pares/versão/data em F008-01 antes de ativar catálogo. |
| V008-02 | Resolvido documentalmente desde 18/10; T005 centralizou algoritmo, exclusões e CP01–CP13. | Implementação em F008-03; não reabrir limite de 20. |
| V008-03 | Mensagens MSG01–MSG17 definidas documentalmente; aprovação da copy permanece pendente. | Responsável editorial em F008-01; não atribuir homologação ao usuário por inferência. |
| V008-04 | Mapeamento documental fechado: 25 campos, perfis e IDs da matriz v3. Integração real não testada. | F008-07/10; document-name segue ID proposto da 007, não controle já entregue. |
| V008-05 | Visual/assistivo aguardando verificação; integração no formulário, sem página própria. | F008-09/11 com 007/016 e fontes visuais. |
| V008-06 | Resolvido documentalmente: estados incompletos não permitem aprovado; checklist por revisão e explicação humana explícita. | F008-05/08 implementam e testam VE05/06/14/15/18. |
| V008-07 | Resolvido documentalmente: LS02 por parágrafo, sem razão global de scrollHeight; limitações de input/textarea/fontes/ocultação explícitas. | F008-06/11 comprovam equivalência em navegador; técnica não validada nesta rodada. |
| V008-08 | Resolvido documentalmente: detecção por token/construção, flexões explícitas, acentos preservados, sobreposição e offsets. | F008-04, catálogo ainda condicionado a V008-01. |
| V008-09 | Resolvido documentalmente: heurísticas LS04/05 limitadas com confirmação humana; LS06 manual, jargão não catalogado revisado humanamente. | F008-05; não prometer cobertura gramatical completa. |

MC-12 da matriz da 007 resolvida no escopo documental pela matriz campo × regra;
as decisões estruturais MC-02–MC-08 não são resolvidas por este motor editorial.

## Prontidão e limites

Podem orientar desenvolvimento futuro: tipos, estado, matriz, fixtures,
mensagens propostas e adaptadores definidos no contrato. Ativação de catálogo/
copy depende de V008-01/03; conclusão visual/funcional depende de V008-04/05,
motor, geometria e testes previstos. Nenhum estado editorial bloqueia as ações
permitidas; regras estruturais pertencem à 007.

A implementação atual conserva 240 caracteres em src/lib/validation.ts e
contagem total no helper da 007; não são contratos vigentes nem foram corrigidos.
Resultados e checks documentais desta rodada estão em [verification](verification.md).

## Revalidação T019 — 22/10/2026

Parecer atual: **contrato completo, aprovação editorial e motor pendentes**.
LS01–LS06/CA01–CA18 seguem para F008-01–F008-12 e VE01–VE18. O contrato de
palavras significativas continua único, mas catálogo, MSG01–MSG17, heurísticas,
geometria e execução precisam de aprovação/implementação. Metadados dos
Form-Card estão disponíveis; não houve teste visual. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

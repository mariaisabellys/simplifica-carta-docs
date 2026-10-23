# Validação documental: Prévia HTML

## Estado em 19/10/2026 — T008

Autor: Codex. Base: HEAD 7948d35 e alterações locais T003–T007 preservadas.
**Projeção v3 reconciliada documentalmente; implementação e aceites pendentes.**
[Relatório anterior](historico/2026-10-19-pre-t008-validation.md).

Fontes: seis artefatos 009, modelo/matriz v3 e contratos 007/008, tipos/schema/
catálogos, PreviaCartaPage, referências locais de navegação/Figma.
Sem consulta externa ao Figma/ERS ou aprovação institucional.

## Achados

| ID | Estado e resolução | Pendência/entrega |
| --- | --- | --- |
| V009-01 | Rastreabilidade CA19 preservada e atualizada para K/S/E. | Executar F009-09/10. |
| V009-02 | Cenários condicionais presentes em PV05/PV09–PV11, com retenção e omissão. | Testes futuros, não executados. |
| V009-03 | HasContent definido no contrato com seleções v3, default Ativo e resposta Não distintos. | F009-03/09. |
| V009-04 | Tabela e snippets antigos retirados do corpo ativo; 25 definições/paths v3. | F009-03/04 implementam. |
| V009-05 | Estrutural atribuída à 007; 008 apenas editorial; snapshot CSV pertence à 010. | F009-06/07/10. |
| V009-06 | Uma projeção/componente nos dois contextos e IDs DOM únicos. | F009-05/08/10. |
| V009-07 | Vazios/opcionais/listas/seleções/defaults explícitos, sem descarte de item parcial. | MC-05 segue decisão do produto; projeção não certifica estado externo. |

V009-01–07 estão resolvidos no âmbito documental desta revisão, não no código.
As decisões antigas ficam no histórico, sem reescrever evidências anteriores.

## Prontidão delimitada

Contrato permite preparar implementação de projeção/fixtures, mediante autorização.
Antes da entrega visual/integrada: consultar Design/Make/ERS, revisar copy,
entregar provider/foco e validação estrutural da 007, ação 010 e destinos reais.
MC-03/04/05/08 não são resolvidas por inferência da prévia; ela preserva os valores
seguros e não inventa validação de negócio. Fallback publicado e ambiente assistivo
exigem execução própria. PreviaCartaPage continua placeholder.
Conferências desta rodada em [verification](verification.md).

## Revalidação T019 — 22/10/2026

Parecer atual: **projeção v3 coerente; componente e integração ausentes**.
RF01–RF07/CA01–CA21 estão mapeados a F009-01–F009-12, mantendo dados vazios,
parciais, condicionais e sugestões separadas. `PreviaCartaPage` continua
placeholder. O node compartilhado `821:308` respondeu por metadados, sem
comparação visual. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

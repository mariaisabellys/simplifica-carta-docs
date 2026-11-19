# Validação documental: Prévia HTML

> **Implementação parcial vigente — 18/11/2026:** `/spec:implementar` executado após a
> propagação do modelo v3. Projeção dos 25 campos e condições atuais está
> implementada; provider global, retorno por foco, CSV e aceites manuais continuam pendentes. Evidência no
> [registro seletivo](../../docs/verificacoes/revalidacao-contratos-2026-10-27.md).

## Estado em 19/10/2026 — T008

Autor: Codex. Base: HEAD 7948d35 e alterações locais T003–T007 preservadas.
**Projeção v3 reconciliada documentalmente; implementação e aceites pendentes.**
[Relatório anterior](historico/2026-10-19-pre-t008-validation.md).

Fontes: seis artefatos 009, modelo/matriz v3 e contratos 007/008, tipos/schema/
catálogos, PreviaCartaPage, referências locais de navegação/Figma.
A consulta visual foi concluída posteriormente no lote local de 04/11/2026;
ERS e aprovação institucional permanecem pendentes.

## Achados

| ID | Estado e resolução | Pendência/entrega |
| --- | --- | --- |
| V009-01 | Rastreabilidade CA19 preservada e atualizada para K/S/ON/E. | Executar F009-09/10. |
| V009-02 | Cenários condicionais presentes em PV05/PV09–PV11, com retenção e omissão. | Testes futuros, não executados. |
| V009-03 | HasContent definido no contrato com seleções v3, default Ativo e resposta Não distintos. | F009-03/09. |
| V009-04 | Tabela e snippets antigos retirados do corpo ativo; 25 definições/paths v3. | F009-03/04 implementam. |
| V009-05 | Estrutural atribuída à 007; 008 apenas editorial; snapshot CSV pertence à 010. | F009-06/07/10. |
| V009-06 | Uma projeção/componente nos dois contextos e IDs DOM únicos. | F009-05/08/10. |
| V009-07 | Vazios/opcionais/listas/seleções/defaults explícitos, sem descarte de item parcial. | MC-05 fechada: Ativo/Inativo é estado configurado; projeção não certifica estado externo. |

V009-01–07 estão resolvidos no âmbito documental desta revisão, não no código.
As decisões antigas ficam no histórico, sem reescrever evidências anteriores.

## Prontidão delimitada

Contrato permite preparar implementação de projeção/fixtures, mediante autorização.
Antes da entrega visual/integrada: usar o pacote local, consultar ERS, revisar copy,
entregar provider/foco e validação estrutural da 007, ação 010 e destinos reais.
MC-03/04/05/08 foram fechadas na matriz da 007; a prévia apenas projeta seus
resultados e não duplica validação de negócio. Fallback publicado e ambiente assistivo
exigem execução própria. `PreviaCartaPage` agora renderiza a prévia real e o
formulário incorpora o mesmo componente.
Conferências desta rodada em [verification](verification.md).

## Revalidação T019 — 22/10/2026

Parecer histórico: **projeção v3 coerente; componente e integração ausentes**.
RF01–RF07/CA01–CA21 estão mapeados a F009-01–F009-12, mantendo dados vazios,
parciais, condicionais e sugestões separadas. `PreviaCartaPage` continua
placeholder. O node compartilhado `821:308` respondeu por metadados, sem
comparação visual. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

## Implementação F009 — 18/11/2026

- `carta.preview.ts` implementa `hasContent`, 25 definições, K/S/ON/E, listas,
  ausências, ordem estável e projeção sem mutação.
- `CartaPreview` renderiza texto literal, IDs prefixados, níveis contextuais e
  estado vazio sem card fictício; nenhum dado vira HTML, iframe ou link ativo.
- `/previa` apresenta resumo estrutural separado, avisos e destinos livres. O
  formulário usa a mesma projeção/componente nas cinco partes.
- CSV não foi simulado: a ação permanece ausente até a entrega real da 010.
- 11 testes focados passaram; typecheck, build e 74 testes totais passaram.
- Inspeção visual automatizada em navegador não foi possível porque nenhum
  navegador estava disponível no ambiente; PV18 continua pendente.

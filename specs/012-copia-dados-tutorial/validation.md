# Validação documental: Cópia de dados no tutorial

## Parecer concluído em 20/10/2026 — T010 iniciada em 19/10

Autor: Codex. Base: HEAD 7948d35 e alterações documentais anteriores preservadas.
**Contrato v3 reconciliado; integração/conteúdo T011 e aceite funcional pendentes.**
[Relatório anterior](historico/2026-10-19-pre-t010-validation.md).

Fontes locais: sete documentos 012, docs/spec, matriz 007, conteúdo do tutorial e
utilitário clipboard. Sem consulta externa Figma/ERS ou operação real de clipboard.

| ID | Estado documental | Destino |
| --- | --- | --- |
| V012-01 | Decisão de 07/10 preservada: string API original; manual preserva conteúdo/quebras visíveis. | F012-07/10 verificam ambientes. |
| V012-02 | CA15 incluído e atualizado; matriz/fixtures cobrem K/S/E. | F012-07/09. |
| V012-03 | Corridas/ocultação/remount definidos; trava por identidade acima das rotas, não só componente. | F012-04/08. |
| V012-04 | Ordem histórica superada pela matriz v3, cinco grupos sem campo removido. | F012-03. |
| V012-05 | Cobertura fechada: 25 definições, 13 abertas/12 escolhas; exemplos nunca são fallback. | F012-03/07; T011 sincroniza conteúdo/011. |
| V012-06 | Âncoras somente dos campos apresentados e fallback tutorial-dados definidos. | T011 e F012-06/09. |

Os achados estão resolvidos quanto ao contrato, não à implementação.
Conteúdo atual ainda tem dez blocos/seis copyLabel: isso é divergência conhecida
com tarefa T011, não permissão para limitar a UI. Nenhum TypeScript foi editado.
MC-05/validação runtime/foco da 007, consulta visual/copy/ERS e clipboard real
permanecem pendências de entrega. Não declarar aprovação institucional/visual.

## Revalidação T019 — 22/10/2026

Parecer atual: **contrato 25/13/12 coerente; integração bloqueada pela 011**.
RF01–RF06/CA01–CA20 seguem para F012-01–F012-11. O node `564:980` respondeu
por metadados, mas o conteúdo da etapa 4 ainda não foi migrado; exemplos nunca
podem substituir a sessão. Clipboard, âncoras, foco, corrida e ambientes reais
continuam sem execução. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

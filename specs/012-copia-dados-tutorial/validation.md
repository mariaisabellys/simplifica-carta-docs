# Validação documental: Cópia de dados no tutorial

> **Revalidação vigente — 27/10/2026:** `/spec:validar` reexecutado após a
> sincronização da 011. Contrato 25/13/12 coerente; seletor, UI, clipboard
> integrado e testes permanecem pendentes. Evidência no
> [registro seletivo](../../docs/verificacoes/revalidacao-contratos-2026-10-27.md).

## Parecer concluído em 20/10/2026 — T010 iniciada em 19/10

Autor: Codex. Base: HEAD 7948d35 e alterações documentais anteriores preservadas.
**Contrato v3 e conteúdo T011 reconciliados; integração e aceite funcional pendentes.**
[Relatório anterior](historico/2026-10-19-pre-t010-validation.md).

Fontes locais: sete documentos 012, docs/spec, matriz 007, conteúdo do tutorial e
utilitário clipboard. Sem consulta externa Figma/ERS ou operação real de clipboard.

| ID | Estado documental | Destino |
| --- | --- | --- |
| V012-01 | Decisão de 07/10 preservada: string API original; manual preserva conteúdo/quebras visíveis. | F012-07/10 verificam ambientes. |
| V012-02 | CA15 incluído e atualizado; matriz/fixtures cobrem K/S/ON/E. | F012-07/09. |
| V012-03 | Corridas/ocultação/remount definidos; trava por identidade acima das rotas, não só componente. | F012-04/08. |
| V012-04 | Ordem histórica superada pela matriz v3, cinco grupos sem campo removido. | F012-03. |
| V012-05 | Cobertura fechada: 25 definições, 13 abertas/12 escolhas; exemplos nunca são fallback. Conteúdo sincronizado em 27/10/2026. | F012-03/07 implementam e testam a projeção. |
| V012-06 | Âncoras somente dos campos apresentados e fallback tutorial-dados definidos. | T011 e F012-06/09. |

Os achados estão resolvidos quanto ao contrato e ao conteúdo, não à implementação.
A lista de dez blocos/seis `copyLabel` foi removida em 27/10/2026; a etapa 4
referencia a projeção 25/13/12, mas nenhum componente 012 foi entregue por isso.
Implementação de MC-02–MC-08, foco da 007, consulta visual/copy/ERS e clipboard
real permanecem pendências de entrega. Não declarar aprovação institucional/visual.

## Revalidação T019 — 22/10/2026

Parecer histórico em 22/10/2026: a integração estava bloqueada pelo conteúdo
da 011. Essa parcela foi encerrada em 27/10/2026; a composição segue pendente.
RF01–RF06/CA01–CA20 seguem para F012-01–F012-11. O node `564:980` respondeu
por metadados; exemplos nunca podem substituir a sessão. Clipboard, âncoras,
foco, corrida e ambientes reais
continuam sem execução. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

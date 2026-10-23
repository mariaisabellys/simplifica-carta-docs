# Validação documental: Atendimento agendado

21/10/2026 — T014. **Contrato técnico reconciliado; produção/aceite funcional
bloqueados por IN01–IN08 e implementação ausente.**
[Validação anterior](historico/2026-10-21-pre-t014-validation.md) preservada.

## Resultado

- [Contrato único](contrato-agenda.md) substitui tabelas e snippets divergentes:
  quatro endpoints, payload/códigos, contexto/CSRF, recuperação e 410.
- Pausa editorial separada do gate de servidor; replay/lookup de registro
  válido preservados; criação nova serializada contra mudança do gate.
- Intervalo/fuso imutáveis por ID, snapshot no registro e Receipt do snapshot;
  oferta mudada não altera replay. R1–R6 conferido conceitualmente.
- Descrição opcional existente no conteúdo representada no contrato; tipos
  e helper antigos ainda precisam de migração, sem alteração nesta rodada.
- IN01–IN08 indicam evidência necessária, papéis responsáveis e impacto.
  Responsáveis nominais não foram inventados.
- ADR-003 aceita não alterada; ADR-004 criada como proposta não aprovada.
  Versões/lock/worker/infra/testes reais continuam pendentes.
- CA01–CA20 preservados e CA21–CA22 acrescentados; AG01–AG13 cobrem critérios.
  Nenhuma aprovação funcional inferida de documentação ou helper isolado.

## Limites e próximos passos

T013 permanece parcial por migração de conteúdo; decisões documentais servem
de base, não prova de entrada implementada.
Dependências institucionais bloqueiam schema final/dados reais, agenda,
ativação, envio e deploy. Trabalho documental e fixtures sintéticas não
autoriza implementação neste comando.
Sem consulta Figma/ERS, browser, banco, API, CSRF ou SMTP nesta revisão.
Ver [verification](verification.md) para checks efetivamente executados.

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

## Revalidação T019 — 22/10/2026

Parecer atual: **contrato técnico coerente; operação bloqueada**. A frase antiga
“T013 permanece parcial” está superada pela migração de conteúdo registrada no
encerramento acima; não altera IN01–IN08. RF01–RF09/CA01–CA22 seguem para
T001–T024 e AG01–AG13/R1–R6. Página, API, banco, worker e SMTP não existem. Os
quatro nodes responderam por metadados, sem validar a jornada. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

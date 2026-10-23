# Verificação T014 — Agenda e contratos

21/10/2026. Escopo documental. T014 concluída documentalmente: contratos
consolidados e decisões externas registradas como bloqueios, não aprovadas.

## Entregas

[Contrato da agenda](contrato-agenda.md): quatro endpoints/contexto/CSRF/códigos/recovery/410,
gate de novas criações, snapshot imutável, idempotência, worker e AG01–AG13.
Sete artefatos reconciliados; sete originais preservados em
historico/2026-10-21-pre-t014-*.md com links relativos ajustados.
ADR-004 proposta criada; ADR-003 aceita preservada.
IN01–IN08 identificam papéis responsáveis a consultar, evidência e impacto.
Nenhum responsável nominal, prazo, fuso ou política institucional inventado.

## Revisão conceitual

R1–R6 do contrato: registro S captura intervalo A, resposta se perde, oferta
muda para B e gate pausa; replay K/P válido retorna mesmo snapshot A, sem nova
ocupação/outbox. Payload alterado gera 409; recuperação expirada gera 410,
sem afirmar que registro não existe. Análise documental, sem execução de banco.

## Verificação local

Resultados de checks documentais registrados abaixo.

| Check em 21/10/2026 | Resultado |
| --- | --- |
| Script Node de integridade | Oito documentos ativos, sete artefatos vinculados ao contrato; 26 destinos de arquivo locais existentes |
| IDs e matriz normativa | CA01–CA22, AG01–AG13, IN01–IN08 e R1–R6 completos; quatro endpoints |
| Comparação com arquivos anteriores | Sete históricos íntegros, salvo ajuste de links relativos |
| Replay R1–R6 | Coerência documental de snapshot/pausa/repetição/expiração; sem execução transacional |
| ADR-004 e ADR-003 | Nova ADR explicitamente proposta/não aprovada; nenhuma alteração na ADR-003 aceita |
| git diff --check | Sem erros |
| git status --short -- src tests | Sem saída: nenhum código/conteúdo executável/teste alterado |

A primeira checagem encontrou ausência de vínculo explícito ao contrato neste
registro; vínculo corrigido e script repetido com sucesso. Links foram
verificados quanto à existência local, não conteúdo externo ou alvos DOM.
Nenhum código/TypeScript/teste/configuração operacional alterado.
Não executados: suíte, typecheck/build, migrations, banco/worker, rede/CSRF,
SMTP, browser/clipboard, Figma/ERS ou validação institucional.

## Pendências

IN01–IN08, aprovação ADR/ambientes, migração dos tipos/helper/descrição opcional,
conteúdo T013, implementação e testes AG01–AG13/CA01–CA22.
Fontes editoriais continuam atendimento pendente/e-mail ativo, sem nova ativação.
Testes históricos do helper não comprovam API/snapshot/gate atuais.

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

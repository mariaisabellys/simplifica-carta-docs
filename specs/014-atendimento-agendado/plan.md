# Plano: Atendimento agendado

21/10/2026 — T014 documental. [Spec](spec.md), [contrato da agenda](contrato-agenda.md),
[tarefas](tasks.md), [ADR-004 proposta](../../docs/decisoes/adr-004-stack-atendimento.md).
Versão anterior preservada no [histórico](historico/2026-10-21-pre-t014-plan.md).

## Decisões técnicas do contrato

Quatro endpoints com payloads/códigos únicos, contexto/CSRF e recuperação
definidos no contrato. Não manter tabela paralela de API.
Seis campos obrigatórios + descricaoDuvida opcional + horarioId; Carta excluída.
Slot tem id/inicio/fim/timezone imutáveis; troca temporal cria outro id.
Registro guarda snapshot e resposta de replay não lê oferta atual.
Operação/solicitação/outbox atômicas; capacidade sob lock; sucesso após commit.
Pausa gate não cancela registro, e replay válido precede bloqueio de criação.
410 só expiração, não inexistência; lookup not-observed mantém incerteza.
Worker fora da transação, retry de evento, sem garantia de entrega única física.

## Ordem e bloqueios

1. Conferir decisões IN01–IN08 e obter responsáveis nominais/aprovação com fonte/data.
2. Aprovar ou revisar ADR-004, selecionar versões/lock e preparar ambiente isolado.
3. Migrar types/helper/conteúdo para contrato; preservar Carta, nenhuma PII em URL.
4. Implementar configuração/gate, snapshots, API, CSRF e transações.
5. Implementar outbox/worker/monitoramento com SMTP falso antes de envio real.
6. Integrar UI e recuperação explícita, roteamento de entrada da T013 e foco.
7. Executar AG01–AG13/CA01–CA22; registrar ambientes, defeitos e retestes.

Passos acima são futuros. Trabalho documental/fixtures sintéticas pode prosseguir;
schema final, oferta institucional, migrations com dados reais, ativação,
notificação operacional e deploy dependem de decisões institucionais/infra.
Não aprovar implicitamente America/Fortaleza, capacidade 1 ou prazo de retenção.

## Interface e segurança

Entrada 425:201 compartilhada 014/015; botão interno abre calendário, sem
auto-link. Horário 425:296, dados/revisão 446:206, resultado 470:444, uma rota.
Layout adapta-se ao conteúdo; consulta detalhada Design/Make/ERS ainda pendente.
Selecionar não reserva. Contexto e consulta distinguem loading/empty/failed/ready.
Registro incerto preserva chave/snapshot; recarga só recupera explicitamente,
sem reconstruir campos ou enviar novo POST automaticamente.
Dados pessoais apenas no fluxo de atendimento autorizado, não no store da Carta.
Segredos de provedor só servidor; logs não contêm payload/chaves/PII.
Fonte de contato da 015 não autoriza destinatário do worker.

## Verificação

AG01–AG13 cobrem CA01–CA22; CJ01–CJ12 cobrem integração de canais.
Concorrência precisa do banco escolhido e conexões distintas; mocks/SQLite
não comprovam locks da proposta PostgreSQL. CSRF anônimo e pausas exigem testes
reais de API. SMTP falso e relógio controlado; nenhum atendimento/e-mail real.
Browsers/assistivos/reflow conforme 016; registrar versões e testes não executados.
R1–R6 é somente replay conceitual, não teste funcional.

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

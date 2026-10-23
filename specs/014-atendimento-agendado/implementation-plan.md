# Plano de implementação: Atendimento agendado

21/10/2026 — T014 documental, não implementação. A base anterior com snippets
Django/TS foi preservada no [histórico](historico/2026-10-21-pre-t014-implementation-plan.md);
não copiar código que deriva Receipt da oferta mutável ou ignora gate/descrição.

## Base única

[Contrato da agenda](contrato-agenda.md) define quatro endpoints e todos os
payloads/códigos, CSRF, locks, snapshot, pausa, replay/410, worker e AG01–AG13.
[Spec](spec.md) define CA01–CA22; [canais](../../docs/arquitetura/contrato-canais-ajuda.md)
define UI e CJ01–CJ12. [ADR-004](../../docs/decisoes/adr-004-stack-atendimento.md)
é proposta; versões/lock/provisionamento continuam pendentes.
IN01–IN08 registram quem deve confirmar e o que cada ausência bloqueia.

## Inventário local

Tipos AttendanceFields/AttendancePayload e helper createAttempt existem,
mas só contemplam seis campos e horarioId; migração para descricaoDuvida
opcional pendente. Suporte de snapshot é contrato futuro do backend.
Página placeholder; não há API/banco/worker implementados que provem este fluxo.
Esta revisão não executa nem altera helper/testes existentes.

## Sequência executável após autorização

| Ordem | Área futura | Condição / verificação |
| --- | --- | --- |
| 1 | ADR/ambiente/lock/segredos | IN07; dependências compatíveis verificadas em fontes oficiais no momento da implementação |
| 2 | Types e validação compartilhada | Seis obrigatórios + descrição opcional + horárioId; IN04, sem truncamento ou dados da Carta |
| 3 | Modelos/migrations | IN01/02/03/06; intervalo imutável, snapshot em solicitação, operação única e outbox |
| 4 | Configuração de gate e serviço de registro | Operação → gate → intervalo; controle de pausa usa mesma barreira; AG04–08 |
| 5 | Contexto/horários/registro/lookup | Contrato único, CSRF/origem, no-store, limites e erros por endpoint; AG01–03/09 |
| 6 | Worker e comandos restritos | IN05/07, lease e retry de evento, SMTP falso; AG10 |
| 7 | Cliente/controlador frontend | Tentativa imutável, mesma chave, sem retry automático; AG06/11 |
| 8 | Composição/canais/estilos | T013 conteúdo, consulta visual, foco e estados; CJ/AG12 |
| 9 | Verificação e operação | CA01–CA22, IN01–08, testes/retomada; AG13 |

Nenhum arquivo acima é entrega declarada nesta tarefa. Não montar backend
com dados reais usando candidatos institucionais como defaults.

## Algoritmo contratual, sem código-base incompleto

Validar envelope/origem/CSRF/chave; canonicalizar payload conforme contrato.
Na transação: resolver/serializar operação por chave; divergência → 409,
expiração → 410; registro existente válido → Receipt do snapshot.
Somente se criação nova: serializar gate, recusar se fechado; bloquear intervalo,
verificar capacidade/data/habilitação; criar solicitação+snapshot+outbox e
associar operação; responder depois do commit. Falha reverte todo o conjunto.
Não fazer join temporal mutável no replay, nem usar fuso do dispositivo.

Gate e manutenção de oferta respeitam ordem de locks; confirmar serialização
no banco selecionado. Mudança de intervalo/fuso cria novo ID. Replay antigo
válido não consulta capacidade atual e continua disponível em pausa.
Tombstones/expiração precisam política IN06; não excluir operação válida e
permitir recriação com mesma chave.

Lookup retorna somente resultado mínimo ou not-observed, e 410 para expirado.
Not-observed não comprova ausência de POST concorrente. UI permanece incerta
quando necessário; sem payload em memória, apenas consulta, não novo envio.
sessionStorage da operação é separado da Carta e guarda marcador mínimo/segredo
conforme política, nunca payload pessoal; storage bloqueado tem aviso verdadeiro.

## Worker, UI e resultados

Worker com claim/lease e timeout, envio fora da transação, atualização só do
lease corrente; falha não desfaz registro. Um evento lógico não garante um
único e-mail físico após crash. Sem afirmar entrega/leitura.
Mostrar Solicitação registrada somente com Receipt válido; sucesso não depende
de SMTP. Não implementar confirmação ao solicitante nesta proposta.

Entrada/calendário/dados/revisão/resultado preservam fonte e foco. Pausa impede
nova ação, não apaga formulário/tentativa ou resultado. API é autoridade de
gate; config editorial ativa sozinha não libera novas solicitações.
Consulta visual 425:201/425:296/446:206/470:444 e Make permanece futura.
Sem backend da Carta, mailto na 015 ou transmissão de dados ao consultar FAQ.

## Evidência necessária

AG01–AG13, R1–R6 e IN01–IN08 estão no contrato. R1–R6 foi revisão conceitual,
não execução de SQL/HTTP. Testes futuros: PostgreSQL isolado com conexões
concorrentes, relógio controlado, CSRF efetivo, SMTP falso e casos de proxy.
Typecheck/build/suíte frontend, checks backend/migrations e browser/assistivos
somente na implementação; registrar falhas e não aprovar ambiente indisponível.

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

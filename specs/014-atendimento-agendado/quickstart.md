# Quickstart: Atendimento agendado

21/10/2026 — roteiro futuro, não execução funcional.
[Contrato](contrato-agenda.md), [spec CA01–CA22](spec.md),
[ADR-004 proposta](../../docs/decisoes/adr-004-stack-atendimento.md).

## Estado atual e bloqueios

Types/helper existem, com seis campos; descrição opcional requer migração.
Página placeholder, API/banco/worker não entregues. Não é possível solicitar
atendimento real neste estado. IN01–IN08 exigem confirmação, nomeação e evidência.
Não executar migrations/oferta/envio/deploy por este roteiro documental.

## Preparação autorizada futura

Ambiente isolado com banco real escolhido, conexões distintas, relógio
controlado, configuração sintética, SMTP falso e segredos de teste.
Sem dados pessoais reais ou contato institucional de produção.
Configurar same-origin HTTPS e CSRF/origem inclusive anônimo; registrar versões
exatas/lock após aprovação ADR-004. Não inferir suporte de versões candidatas.

## Roteiro

1. GET contexto: conferir chaves/configuração e bootstrap CSRF; repetir em pausa
   sem perder recuperação. POST sem token/origem aceita deve falhar.
2. Consultar horários: ready/empty/failed, datas inválidas e fuso institucional.
3. Selecionar/revisar sem reserva; registrar seis campos e descrição opcional.
4. Confirmar: 201 Receipt após commit, com snapshot e referência, não atendimento confirmado.
5. Perder resposta e recuperar/repetir mesma chave/payload: 200 mesmo Receipt.
6. Pausar entre tentativa e replay: recuperação registrada funciona; criação nova
   bloqueada. Not-observed nunca prova que POST concorrente não concluirá.
7. Trocar intervalo/fuso da oferta por novo ID: pedido antigo usa snapshot;
   nova tentativa com ID desabilitado recebe 409, sem reinterpretação de horário.
8. Expirar recuperação: 410, sem novo registro automático ou afirmação de ausência.
9. Falhar worker/SMTP: registro permanece; retentar evento e verificar lease.
10. Concorrência última capacidade e mesma chave: um registro/outbox por tentativa;
    testar com conexões distintas, não apenas mocks.
11. Recarga/storage bloqueado/incerto: nenhuma submissão automática;
    sem payload pessoal no marcador, sem Carta enviada.
12. Conferir entrada 425:201, calendário interno e CJ01–CJ12, teclado/reflow.

Registrar AG01–AG13, CA01–CA22, ambiente/resultado/defeito/reteste.
R1–R6 no contrato é demonstração conceitual já revisada, não teste executado.

## Checks isolados existentes — após autorização de testes

```sh
node --test tests/atendimento.attempt.test.mjs tests/clipboard.test.mjs tests/csv.test.mjs
npm run typecheck
npm run build
```

Esses checks não provam API, snapshot, locks, CSRF ou worker. Adaptar testes do
helper ao contrato antes de alegar compatibilidade. Checks backend/migrations
e suíte concorrente serão definidos conforme stack/ambiente realmente entregues.

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

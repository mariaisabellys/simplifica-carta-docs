# Verificacao: Atendimento agendado

## Resultado e escopo

Executado `/spec:implementar 014-atendimento-agendado` em 2026-10-05.
Implementacao parcial: AttendanceFields/AttendancePayload adicionados em
atendimento.types.ts; createAttempt e tipo Attempt em atendimento.attempt.ts;
quatro testes em tests/atendimento.attempt.test.mjs. Contrato legado preservado.
Helper sem consumidor ainda; T018 possui entrega isolada, sem tarefa concluida.
Pagina permanece placeholder. Nao foram criados backend, banco, migrations,
agenda, worker, armazenamento de operacao ou envios/requisicoes reais.

## Comportamento e evidencias

createAttempt usa crypto.getRandomValues com 32 bytes, captura timestamp e
gera chave no formato v1.timestamp.hex previsto pelo plano. Captura apenas
os seis campos e horarioId, sem spread de campos extras; congela snapshot e
tentativa, preservando strings sem normalizacao/truncamento. Falha de crypto
propaga, sem fallback fraco. Nao valida formato/limites institucionais, persiste,
envia ou inicia retry. Consumidor futuro deve chamar somente na confirmacao de
tentativa nova e reutilizar esse objeto em resultado incerto.

| Check | Resultado |
| --- | --- |
| node --test tests/atendimento.attempt.test.mjs tests/clipboard.test.mjs tests/csv.test.mjs | 14 testes passaram, quatro novos |
| npm.cmd run typecheck | Passou |
| npm.cmd run build | Passou fora do sandbox para evitar bloqueio de leitura do esbuild previamente identificado; Vite 7.3.6 |

Fixtures sinteticas verificam tamanho/formato da chave com crypto/relogio
controlados, snapshot imutavel independente de edicoes, exclusao de dados
extras e falha sem fallback. Nao comprovam idempotencia, seguranca de API,
capacidade transacional, recuperacao, notificacao ou interface. Nenhum dado
institucional real foi usado; nenhum contato recebeu mensagem.

## Documentacao

Analisados spec/plan/tasks/implementation-plan/validation da 014, ADR-003,
contratos compartilhados 013/015 e codigo/inventario. Plan/tasks/plano detalhado
foram atualizados para registrar GET contexto/CSRF e 410, cobertura de bootstrap,
recusa CSRF, Retry-After e falha de lookup. Spec/validation intactos; validation
continua registro da auditoria anterior. V014-02 recebeu alinhamento documental,
sem alegar payload final ou classificacao por endpoint resolvidos. Alteracoes
anteriores do workspace preservadas. Este relatorio e quickstart adicionados.

### Atualizacao editorial — 2026-10-07

O conteudo versionado foi reconciliado com RF06, RF07 e os limites do MVP:

- `Atendimento agendado com Sucesso!` foi substituido por
  `Solicitacao registrada`, sem confundir registro com confirmacao do atendimento;
- removida a afirmacao de que um e-mail de confirmacao foi enviado ao solicitante;
- removida a acao `Reagendar`, pois remarcacao self-service esta fora do escopo;
- o envio passou a ser chamado de `Confirmar solicitacao`;
- mes, data e horarios estaticos foram identificados como exemplos ilustrativos,
  sem representar disponibilidade da agenda institucional.

Esta correcao nao comprova backend, agenda, notificacao ou registro funcional.

### Atualizacao Figma — 2026-10-08

- `425:201`: pagina inicial/escolha de data.
- `425:296`: escolha de horario.
- `446:206`: dados e revisao antes do envio.
- `470:444`: solicitacao registrada.
- Os quatro frames pertencem a uma rota; o conteudo versionado prevalece e o
  layout deve acomodar estados reais, erros e textos longos.

Esta atualizacao confirma o mapeamento, nao consulta MCP detalhada nem aceite visual.

## Pendencias

- V014-01: decidir se pausa editorial tambem bloqueia API, como consultar/
  recuperar e tratar tentativa existente. Nao cancelar POST por aviso de card.
- V014-03: definir imutabilidade ou captura de intervalo/fuso e comportamento
  de oferta alterada entre revisao/envio, para replay/notificacao coerentes.
- Agenda, fuso, capacidade, modalidade, confirmacao, campos/formatos/limites,
  politica de dados/recuperacao e destinatario/provedor requerem decisao da equipe.
- Stack/ADR/lock, PostgreSQL, proxy/CSRF, outbox/worker e ambiente de testes
  transacionais inexistentes. Nenhuma escolha pendente foi aprovada por inferencia.
- Constitution secao 6 exige: "Antes de implementar trabalho visual, o Codex
  deve consultar via MCP". Figma MCP indisponivel nesta sessao; interface aguarda
  consulta Design/Make. Fonte: ../../docs/processo/constitution.md. ERS e copy
  tambem aguardam conferencia/validacao.
- Navegacao/provider v2 e canais 013/015 ainda incompletos; testes de browser,
  acessibilidade, PostgreSQL concorrente e SMTP falso permanecem pendentes.

CA01–CA20 sem aceite integral. Helper nao registra solicitacao, reserva vaga
ou prova que atendimento esta operacional. Segredo/timestamp ainda dependem
da politica futura de validade/relogio; nao estabelecer prazo arbitrario.

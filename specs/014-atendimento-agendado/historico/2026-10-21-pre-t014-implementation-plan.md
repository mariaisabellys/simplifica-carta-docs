# Implementation Plan: Atendimento agendado

> **Referencia atualizada em 16 de outubro de 2026:** `425:201` e a entrada
> compartilhada 014/015; trechos que o chamam de escolha de data sao historicos.

## Objetivo e status

Preparado em 2026-10-05 para `/spec:plano-implementacao atendimento-agendado`,
resolvido para `014-atendimento-agendado`. O comando recebido como
`/spec:plano-implentacao` corresponde ao comando interno da constitution.

Entregar consulta de horarios reais, dados institucionais, revisao e confirmacao
explicita de solicitacao, com capacidade transacional, recuperacao idempotente
e notificacao duravel da equipe. A Carta permanece no navegador.

**Plano tecnico documental pendente de decisoes institucionais, ADR de stack,
Figma, conferencia do PDF do ERS, validacao editorial e infraestrutura.** Nao
declara agenda, banco, notificacao ou prontidao para producao. Esta etapa cria
somente este arquivo: nao instala dependencias, altera src, cria backend,
marca tarefas, publica infraestrutura ou envia solicitacoes/mensagens reais.

Atualizacao por `/spec:implementar` em 2026-10-05: tipos de campos/payload e
helper createAttempt com snapshot imutavel implementados e testados isoladamente.
Nao ha fluxo integrado/API/backend. Inventario abaixo e historico da preparacao;
resultados atuais em verification.md. Nenhuma tarefa integralmente concluida.

## Fontes e inventario

- Spec/plan/tasks 014, lidos nesta etapa; ADR-003, fundacao tecnica e decisoes
  tecnicas do projeto. Manual textual/README, MVP/fluxos/constitution/regras
  para IA consultados nesta conversa, sem equivaler a leitura do PDF ERS.
- Planos detalhados 002/007/013 e contratos 015/016 desta conversa:
  navegacao, provider da Carta, canais editoriais e matriz de acessibilidade.
- AtendimentoAgendadoPage, atendimento.types.ts, routes, App, ButtonLink,
  vite.config.ts e inventario de arquivos/backend/testes.
- [Django: transacoes](https://docs.djangoproject.com/en/5.2/topics/db/transactions/)
  e [select_for_update](https://docs.djangoproject.com/en/5.2/ref/models/querysets/#select-for-update),
  consultados em 2026-10-05 para transacoes/locks e testes transacionais.
- [Series suportadas do Django](https://www.djangoproject.com/download/)
  e [requisitos do DRF](https://www.django-rest-framework.org/#requirements),
  consultados nesta etapa para a proposta de stack.

Nao houve leitura/validacao do PDF ERS, MCP Figma, agenda institucional,
confirmacao de contato/provedor ou testes. A disponibilidade visual/local de
uma rota nao comprova funcionamento operacional.

| Area | Estado real | Dependencia |
| --- | --- | --- |
| Frontend | Rota e placeholder | Fluxo selecao/dados/revisao/resultado |
| Tipo inicial | Seis campos + data/horario como strings | horarioId, resultados e operacao tipados |
| Backend/banco | Ausentes | Django/DRF/PostgreSQL, migrations/configuracao |
| API/proxy | Ausentes, Vite sem proxy | Same-origin/proxy e contratos abaixo |
| Notificacao | Ausente | Outbox + worker realmente executado |
| Operacao/politica | Nao definidas institucionalmente | T002–T005 e procedimentos restritos |
| Carta | Provider v2 ainda planejado | 007/002 preservam memoria acima das rotas |
| Canais | 013 propoe fonte editorial; 015 placeholder | Estados compartilhados e alternativa validada |
| Figma | Quatro frames identificados; consulta detalhada pendente | `425:201` principal e tres variantes da mesma rota |
| Testes/deploy | Sem suites backend/frontend; 017 nao detalhada | Infraestrutura de verificacao e publicacao futura |

## Decisoes propostas e bloqueios institucionais

| Tema | Proposta de base | Confirmacao necessaria |
| --- | --- | --- |
| Registro | Ocupa capacidade, estado registrada_aguardando_confirmacao | Equipe confirma se isso corresponde ao fluxo real |
| Selecionar | Nao reserva nem registra | Sem reserva temporaria nesta entrega |
| Capacidade | Inteiro positivo por intervalo | Valores/oferta/responsavel; nao assumir sempre 1 |
| Fuso | America/Fortaleza candidato | IANA institucional validado, sem fuso do dispositivo |
| Agenda | Oferta administrativa explicita | Modalidade/duracao/antecedencia/horizonte/feriados |
| Dados | Nome/orgao/setor/emailInstitucional/telefone/assunto obrigatorios | ERS/equipe confirmam limites e telefone |
| Notificacao | Equipe apenas, texto simples | Destinatario/remetente/provedor validado no backend |
| Dados pessoais | Persistencia minima de atendimento | Finalidade/responsaveis/acesso/retencao/exclusao/backups/aviso |
| Recuperacao | Segredo da tentativa + resultado minimo | Validade institucional e cleanup coerentes |

Nao inventar duracao, local, sala virtual, prazo de resposta, base legal,
retencao ou consentimento generico. Aviso de tratamento/participacao/proximo
passo depende de texto institucional real. Sem essas decisoes, T002–T004 e
CA18 ficam pendentes. E-mail ao solicitante fora da entrega proposta.

## Stack e registro arquitetural antes do codigo

Base proposta: Python 3.13, Django serie 5.2 LTS, DRF compativel e PostgreSQL
serie 17, driver psycopg 3. Series sao alvo documental; **patches exatos e lock
reproduzivel permanecem pendentes** de selecao/verificacao no ambiente de
implementacao. Consultas oficiais confirmam serie Django 5.2 no quadro de
suporte e compatibilidade DRF, sem provar dependencias instaladas. Nao usar
numero de patch obtido hoje como substituto de resolucao/teste futuro.

Registrar ADR-004 de stack/operacao com status proposto antes do codigo:
Django/DRF + PostgreSQL; outbox sem Redis/Celery inicial; same-origin HTTPS;
comandos operacionais restritos. Contexto: ADR-003 define backend minimo sem
especificar banco/infraestrutura. Consequencias: processo web, banco persistente
e worker separados, migrations e backup. Nao alterar ADR-003 aceita como se
escolha concreta ja estivesse aprovada. T005 ainda depende desse registro.

PostgreSQL e necessario para evidencia de locks desta proposta. SQLite nao
comprova select_for_update; usar TransactionTestCase/conexoes distintas para
concorrencia. Catch de IntegrityError deve ocorrer depois do rollback do
savepoint, nunca consultar transacao quebrada. As referencias Django acima
fundamentam esta estrategia, nao resultados de teste executado.

## API e fronteira de dados

| Endpoint | Entrada e retorno |
| --- | --- |
| GET /api/atendimento/contexto | Contexto publico/fuso/limites e inicializacao CSRF, sem dados pessoais |
| GET /api/atendimento/horarios?from=YYYY-MM-DD&to=YYYY-MM-DD | Janela inclusiva de ate 31 dias candidata; horarios futuros habilitados com capacidade livre |
| POST /api/atendimento/solicitacoes | JSON de seis campos + horarioId; Idempotency-Key no header; 201 novo/200 repeticao |
| POST /api/atendimento/operacoes/consultar | JSON { chave }; apenas resultado minimo da propria tentativa |

Contexto e adicao tecnica ao plan para bootstrap CSRF/configuracao, sem nova
funcionalidade de negocio, agora tambem registrada no plan/tasks, junto de 410.
Confirmar URL/payload e classificacao por endpoint em T005. from/to interpretados
no fuso institucional, converter [inicio do dia from, inicio do dia apos to)
para UTC. Limites/horizonte validados no servidor; nao misturar datas locais
com instantes. Horarios retornam id/inicio/fim ISO 8601 com offset e timezone
IANA; nada de ocupantes, assuntos, contatos ou listagem publica de registros.

```ts
// src/features/atendimento/atendimento.types.ts — contrato novo proposto
export type AttendanceFields = {
  nome: string; orgao: string; setor: string;
  emailInstitucional: string; telefone: string; assunto: string;
};
export type Slot = { id: string; inicio: string; fim: string };
export type Availability = { timezone: string; horarios: readonly Slot[] };
export type AttendancePayload = AttendanceFields & { horarioId: string };
export type Receipt = {
  referencia: string; estado: "registrada_aguardando_confirmacao";
  inicio: string; fim: string; timezone: string;
};
export type ApiFailure = {
  code: "invalid-input" | "slot-unavailable" | "key-payload-mismatch"
    | "operation-expired" | "rate-limited" | "unavailable";
  fields?: Partial<Record<keyof AttendancePayload, readonly string[]>>;
};
export type Lookup =
  | { status: "registered"; result: Receipt }
  | { status: "not-observed" }
  | { status: "expired" };
```

Resposta 201/200 tem Receipt minimo e somente depois do commit; chave secreta
nao e devolvida em URLs. 400 contrato invalido, 409 slot/key mismatch, 410
operacao expirada (adicao explicita ao plan), 429 com Retry-After, 503 falha
temporaria. Erros estruturados sem SQL/excecoes/dados pessoais. Unknown body,
JSON invalido, erros de proxy/rede ou 5xx nao autorizam anunciar ausencia de
registro: resultado pode ser incerto. Lookup not-observed nao prova que POST
concorrente nao concluira. Referencia publica aleatoria nao concede acesso.

## Validacao equivalente e preservacao

Limites candidatos em pontos de codigo Unicode: nome 150, orgao/setor 200,
e-mail 254, telefone 40, assunto 2000. JSON UTF-8 maximo proposto 32 KiB no
proxy/API, incluindo overhead; configurar, testar e conciliar em T003/T005.
Rejeitar campos desconhecidos/tipos incorretos, strings sem texto util e UUID
invalido. Preservar original valido, sem trim editorial, conversao numerica
ou truncamento. JS conta Array.from(value).length para alinhar Python len.

E-mail: sintaxe unica documentada e fixtures comuns frontend/backend, sem
allowlist de dominio inventada. Nao supor que input type=email e DRF EmailField
tenham conjunto identico; escolher politica explicita e testar divergencias.
Telefone: candidato aceita digitos/espacos/+/-/()/ponto, 8–15 digitos, ate 40
caracteres; depende de validacao institucional e de numeros com extensao.
Enquanto pendente nao tratar formato como regra aprovada. Rejeitar quebras
no e-mail/telefone; assunto pode ser multiline e nunca vira cabecalho.

Serializer DRF deve definir trim_whitespace=False, validators de texto util,
UUIDField para horarioId e rejeicao explicita de chaves desconhecidas. Campos
data/horario enviados pelo cliente sao rejeitados: backend deriva intervalo
do horarioId. Schema funcional final tipado e fixtures compartilhadas evitam
validacao concorrente com a Carta. Nao importar tipos de Carta no backend.

## Modelo e invariantes: codigo base Django

Trechos pressupõem imports uuid/secrets/models/Q/F/timezone e configuracao
validada. Acrescentar constraints/indices/migrations reais, nao usar exemplos
como schema pronto. Nomes finais devem ser coerentes entre serializers/API.

```python
# backend/atendimento/models.py
def public_reference():
    return secrets.token_hex(16)

class Horario(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    inicio = models.DateTimeField()
    fim = models.DateTimeField()
    capacidade = models.PositiveIntegerField()
    habilitado = models.BooleanField(default=True)
    class Meta:
        constraints = [
            models.CheckConstraint(condition=Q(capacidade__gte=1), name="slot_capacity_positive"),
            models.CheckConstraint(condition=Q(fim__gt=F("inicio")), name="slot_end_after_start"),
        ]

class Solicitacao(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    referencia = models.CharField(max_length=32, unique=True, default=public_reference)
    horario = models.ForeignKey(Horario, on_delete=models.PROTECT)
    nome = models.CharField(max_length=150)
    orgao = models.CharField(max_length=200)
    setor = models.CharField(max_length=200)
    email_institucional = models.CharField(max_length=254)
    telefone = models.CharField(max_length=40)
    assunto = models.TextField()
    estado = models.CharField(max_length=48, default="registrada_aguardando_confirmacao")
    criada_em = models.DateTimeField(auto_now_add=True)

class Operacao(models.Model):
    chave_hash = models.CharField(max_length=64, unique=True)
    payload_hash = models.CharField(max_length=64)
    solicitacao = models.OneToOneField(Solicitacao, null=True, on_delete=models.PROTECT)
    expira_em = models.DateTimeField()

class Notificacao(models.Model):
    solicitacao = models.OneToOneField(Solicitacao, on_delete=models.PROTECT)
    estado = models.CharField(max_length=16, default="pendente")
    tentativas = models.PositiveIntegerField(default=0)
    proxima_tentativa = models.DateTimeField(default=timezone.now)
    lease_id = models.UUIDField(null=True)
    lease_ate = models.DateTimeField(null=True)
    ultimo_codigo = models.CharField(max_length=40, blank=True)
```

Adicionar constraints de estados/tentativas e coerencia lease_id/lease_ate,
indices de horario/inicio e notificacao vencida, limites do assunto no serializer
e validacao de comandos. OneToOne define um evento logico por solicitacao.
Operacao.solicitacao null existe somente dentro da transacao nova; nunca
commitar linha pendente sem registro nesta base. Anomalia persistida e erro
operacional, nao convite a criar segundo registro.

Solicitacoes registradas ocupam capacidade nesta proposta. Toda manutencao
de capacidade/habilitacao/estado usa mesmo lock do Horario; nenhuma escrita
direta administrativa que contorne servico. Nao diminuir capacidade abaixo
da ocupacao. No MVP sem cancelamento/remarcacao self-service. Cleanup de
registros nao pode liberar capacidade futura inadvertidamente; conciliar
retencao versus horario/estado antes de excluir. Instantes UTC, USE_TZ=True.

## Registro atomico e idempotencia: codigo base

Chave gerada por confirmacao nova: versao + timestamp de criacao + 32 bytes
criptograficos, por exemplo v1.timestamp.hex64. Hash SHA-256 da chave no banco.
Validar formato/tamanho/idade com relogio do servidor e janela configurada;
timestamp futuro fora da tolerancia rejeitado. Prazo/tolerancia de recuperacao
dependem de politica, sem default institucional inventado. Reusar chave exata.

Payload canonico e objeto fechado, UUID normalizado e strings integrais;
JSON ordenado, UTF-8, sem normalizar texto. HMAC-SHA256 com segredo servidor
versionado para digest do payload evita hash simples de dados pessoais com
baixa entropia. Rotacao mantem validacao das operacoes ainda recuperaveis.
Guarda de tombstones/expiracao da chave impede excluir e aceitar novamente
uma tentativa ainda valida; chave expirada nao gera novo registro.

```python
# backend/atendimento/services/registro.py — esqueleto, helpers/imports omitidos
def registrar(chave, payload):
    digest_key, expiry = validar_e_hash_chave(chave)
    digest_payload = hash_payload_canonico(payload)
    with transaction.atomic():
        op, created = Operacao.objects.get_or_create(
            chave_hash=digest_key,
            defaults={"payload_hash": digest_payload, "expira_em": expiry},
        )
        # get_or_create usa unicidade; lock serializa repeticoes da mesma operacao.
        op = Operacao.objects.select_for_update().get(pk=op.pk)
        if not hmac.compare_digest(op.payload_hash, digest_payload):
            raise KeyPayloadMismatch()
        if op.expira_em <= timezone.now():
            raise OperationExpired()
        if op.solicitacao_id:
            result = resposta_minima(op.solicitacao)
            is_new = False
        else:
            if not created:
                raise OperationInvariantFailure()
            horario = Horario.objects.select_for_update().get(pk=payload["horarioId"])
            now = timezone.now()
            occupied = Solicitacao.objects.filter(horario=horario).count()
            if not horario.habilitado or horario.inicio <= now or occupied >= horario.capacidade:
                raise SlotUnavailable()
            solicitacao = criar_solicitacao(horario, payload) # seis campos explicitamente mapeados
            op.solicitacao = solicitacao
            op.save(update_fields=["solicitacao"])
            Notificacao.objects.create(solicitacao=solicitacao)
            result = resposta_minima(solicitacao)
            is_new = True
    return result, is_new  # atomic saiu com commit antes da resposta HTTP
```

Horario inexistente vira erro estavel, com rollback da operacao nova.
Resolver repeticao antes de revalidar horario agora lotado/passado. Ordem de
locks: Operacao antes de Horario; manutencao de horario nao pode inverter
essa ordem ao buscar operacoes. get_or_create depende do unique em chave_hash;
verificar corrida sob isolamento PostgreSQL proposto READ COMMITTED. Se tratar
IntegrityError adicional, usar savepoint e releitura apos rollback; nao mascarar
qualquer falha de banco como repeticao. Timeout de lock vira resultado incerto/
temporario recuperavel, sem chave nova. Configurar limites de transacao.

Transacao inclui operacao/solicitacao/outbox; falha desfaz tudo. Resposta perdida
apos commit recupera resultado minimo com chave. Lookup nao expõe PII e nao
usa referencia como autenticacao. Ausencia de operacao nao garante ausencia
de POST em andamento; repetir mesma chave/payload quando snapshot ainda existe.

## Outbox, worker e notificacao

Comando `processar_notificacoes --once`: claim em transacao curta via
select_for_update(skip_locked=True); eventos pendentes/retry vencidos ou lease
expirado. Criar lease UUID, deadline, incrementar tentativas e commitar claim.
Enviar fora de lock/transacao de registro, com timeout SMTP menor que lease.
Atualizar resultado com filtro id+lease_id vigente; worker antigo nao sobrescreve
claim novo. Lease vencido permite recuperacao apos crash.

Estados: pendente/processando/retry/aceito/falhou. Backoff candidato 1/5/15/60
minutos e maximo 5 tentativas, lease candidato 120 s/timeout SMTP 30 s; parametros
operacionais a validar em T007/T015, sem promessa de atendimento nesse prazo.
Clock controlado nos testes. Apos limite, operador restrito repete o mesmo
evento, sem nova Solicitacao. Alarmes somente por codigo/contagem permitida.

```python
# Trecho de envio: claim/leases/retry ficam no servico worker
message = EmailMessage(
    subject=f"Solicitacao de atendimento {solicitacao.referencia}",
    body=render_corpo_texto_simples(solicitacao),
    from_email=settings.ATENDIMENTO_FROM_EMAIL,
    to=[settings.ATENDIMENTO_TEAM_EMAIL],
    headers={"Message-ID": message_id_estavel(solicitacao)},
)
message.send(fail_silently=False)
```

Configuracao exclusiva servidor, destinatario/remetente validados. E-mail do
solicitante somente no corpo, nao From/cabecalho/HTML. Aceite SMTP e aceito,
nao entregue/lido. Crash entre aceite e gravacao pode duplicar mensagem fisica;
um evento logico + Message-ID nao garantem entrega exatamente uma vez.
Falha nunca desfaz registro nem pede novo cadastro. on_commit pode acordar
worker, mas nao substitui evento duravel e execucao real.

Operacao por conta restrita no servidor, sem endpoint publico/admin painel
completo: comandos de oferta dry-run/apply, consulta de estados, retry de evento,
cleanup validado. Documentar manutencao, responsavel, acesso a segredos/banco,
backup/restauracao e alertas. Agendar worker supervisor/service/timer na 017;
fila gravada sem worker executavel nao e notificacao pronta.

## Protecao de API e politica de dados

Same-origin HTTPS/proxy /api; JSON somente. POST exige verificacao efetiva de
CSRF e origem mesmo para solicitante anonimo: nao confiar em SessionAuthentication
DRF para proteger requests sem login. Definir aplicacao explicita de CSRF nas
views e testar enforce_csrf_checks. Bootstrap contexto fornece cookie/token;
cliente envia X-CSRFToken com credentials same-origin. Sem CORS permissivo.

No-store em contexto sensivel/registro/lookup; segredo/body/headers excluidos
de logs/traces/proxy/APM. Sem listagem publica/detail por referencia. Segredos
de SMTP/HMAC/banco fora do bundle/repo, .env.example somente nomes sem valores.
Limiter no proxy e API com limites configurados e teste para rede institucional
compartilhada; throttling nao substitui lock de capacidade. Availability window
bounded e limite de payload aplicados antes de trabalho caro.

Definir finalidade/responsaveis/aviso/acesso/retencao/exclusao/backups/incidentes
com equipe antes de producao. Comando cleanup requer politica configurada, modo
dry-run, registro operacional sem PII e coerencia com tombstones/outbox/slots.
Nao inferir base legal ou prazo. Sem anexos/CPF/Carta/diagnostico no backend.

## Frontend: estados, tentativa e recuperacao

Availability separado: loading/ready/empty/failed. Fetch de consulta tem
AbortController + requestId/revisao para ignorar respostas obsoletas; abortar
GET nao cancela nenhuma solicitacao. Agrupar datas no timezone fornecido via
Intl, nao cortar ISO por substring nem usar timezone do dispositivo.

Fluxo: escolha -> dados -> revisao -> envio -> registrado/incerto/conflito/
erro anterior. Selecao por radio/lista ou select nativos conforme Figma, somente
horarios da resposta real. Mudar data limpa horario incompatível e preserva seis
campos; atualizar oferta nao sobrescreve dados. Backend valida novamente no envio.

```ts
// src/features/atendimento/useAtendimento.ts — contratos de controlador
type Attempt = {
  key: string; payload: Readonly<AttendancePayload>; createdAt: number;
};
type SubmissionState =
  | { status: "idle" }
  | { status: "sending"; attempt: Attempt }
  | { status: "registered"; result: Receipt }
  | { status: "uncertain"; attempt?: Attempt }
  | { status: "conflict" }
  | { status: "failed"; error: ApiFailure };

function createAttempt(payload: AttendancePayload): Attempt {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const timestamp = Date.now();
  const secret = Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
  return { key: `v1.${timestamp}.${secret}`, payload: { ...payload }, createdAt: timestamp };
}
```

Handler Confirmar toma trava imediata por ref antes de setState, captura payload
revisado e cria attempt somente se novo. Salvar marcador minimo antes de POST,
com try/catch; falha storage segue em memoria. Chamar cliente API com attempt
imutavel, chave no header e CSRF. Reentrada sending ignorada. Timeout/abort
do fetch nao prova cancelamento servidor; conservar attempt/chave e marcar incerto.

Timeout candidato 20 s, a validar com infraestrutura; nao liberar novo payload
porque expirou. No incerto, bloquear edicao/novo envio ate resolver ou orientar
contato validado. Consulta/repeticao sao acoes explicitas; nenhum POST de registro
no mount/recarga/voltar. Se snapshot em memoria existe, botao de repetir usa MESMA
key/payload. Se depois de recarga so segredo existe, apenas lookup; nao reconstruir
seis campos nem oferecer retry de payload novo como recuperacao.

400/409 conhecidos confirmam rejeicao dessa chamada conforme contrato servidor;
erro 5xx/malformed/rede e incerto. Key mismatch nao vira novo pedido: defeito/
divergencia da tentativa a resolver. Slot conflict preserva campos, atualiza
oferta e solicita nova revisao; gerar chave nova somente apos rejeicao definitiva
e confirmacao explicita de novo payload. Sucesso exige decoder de Receipt valido.

sessionStorage separado `simplifica-carta:atendimento-operacao:v1`: somente
version/key/createdAt/estado minimo/referencia e expiracao validada; nenhum campo
pessoal, payload ou Carta. Recuperacao apos recarga por clique explicito Verificar
solicitacao, sem POST automatico. Dados pessoais somente em memoria da visita;
ao encerrar visita, descartar formulario sem limpar Carta. Guardar chave enquanto
resultado incerto dentro da validade; apagar marcador ao encerrar recuperacao
ou expirar conforme politica. Referencia isolada nao recupera registro.

Storage bloqueado mostra limitacao de recuperacao apos recarga; segredo perdido
em resultado incerto orienta ajuda/contato validado, sem afirmar que nada foi
registrado ou criar novo automaticamente. Resultado registered nao depende de
notificacao SMTP; mostrar Solicitacao registrada, sem atendimento confirmado.

## Componentes, copy e CSS de base

Criar SelecaoHorario/FormularioAtendimento/RevisaoAtendimento/
ResultadoAtendimento sob feature. Pagina reutiliza shell/PageHeader/breadcrumb
Inicio > Preciso de ajuda > Atendimento agendado, sem main/h1 duplicados.
Links internos fixos para ajuda/e-mail/formulario preservam provider da Carta;
alternativa e-mail condicionada a estado editorial validado da 013/015.

```tsx
// Trecho de revisao, props reais do controlador; textos em conteudo versionado
<section aria-labelledby="atendimento-revisao">
  <h2 id="atendimento-revisao" tabIndex={-1}>{content.reviewTitle}</h2>
  <dl>{reviewEntries.map(entry => (
    <div key={entry.id}><dt>{entry.label}</dt><dd>{entry.value}</dd></div>
  ))}</dl>
  <p>{content.dataPurposeNotice}</p>
  <button type="button" onClick={voltarDados} disabled={sending}>{content.correct}</button>
  <button type="button" onClick={confirmar} disabled={sending}>{content.confirm}</button>
  <p role="status" aria-live="polite">{sending ? content.processing : ""}</p>
</section>
```

reviewEntries inclui seis campos/data/inicio-fim/fuso, valores React seguros.
Formulario usa labels/IDs, help/error aria-describedby e aria-invalid; resumo
focavel com links abre etapa e foca controle. Avancar/revisar nao chama registro.
Mudanca de etapa foca heading; erro explicito foca resumo; resultado incerto/
sucesso com heading focavel e anuncio comedido sem duplicacao. Loading nao
apaga formulario; teclado nao depende de calendario visual personalizado.

Conteudo versionado em `src/content/ajuda/atendimento-agendado.ts`: estados de
consulta, labels/ajuda/erros/revisao e mensagens distintas. Copy oficial:
"Solicitação registrada. Isso ainda não confirma o atendimento." Nao anunciar
e-mail enviado nem oferecer remarcacao self-service. Incerto: "Não foi possível
confirmar o resultado. Verifique esta solicitação antes de tentar um novo envio."
Conflito: "O horário ficou indisponível. Escolha outro horário; seus dados foram
preservados." Falha de disponibilidade: "Não foi possível consultar os horários.
Tente novamente." Aviso de tratamento/participacao depende de aprovacao real.

```css
/* Base semantica proposta; confirmar Design/Make */
.attendance-flow { display: grid; gap: var(--space-6); min-inline-size: 0; }
.attendance-flow fieldset { min-inline-size: 0; margin: 0; }
.attendance-flow input, .attendance-flow textarea, .attendance-flow select {
  box-sizing: border-box; max-inline-size: 100%; inline-size: 100%; font: inherit;
}
.attendance-flow dd, .attendance-flow p { overflow-wrap: anywhere; white-space: pre-wrap; }
.attendance-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); }
.attendance-actions button { max-inline-size: 100%; white-space: normal; min-block-size: 2.75rem; }
```

Radio nao recebe inline-size 100%: limitar regra aos controles textuais na
implementacao. Textos/erros com altura natural, Inter/fallbacks/tokens locais,
foco/contraste medidos e reflow 016. No Figma Design
YaVUdqYa3boHpvGrxf4ZJ5, consultar detalhadamente `425:201` (canais), `425:296`
(horario), `446:206` (dados/revisao) e `470:444` (resultado). `425:201` e o
node principal; os demais sao variantes da mesma rota. `169:495` pertence a FAQ.
Consultar Make dVm7lEZdBFqOiiySWLWUqp node `0:1` para controles/tokens/estados.
Sem consulta MCP ou assets obtidos nesta etapa.

`scheduledServiceContent` prevalece para titulos, instrucoes, campos, acao e
resultado. O layout se adapta a texto longo, erros e estados loading/empty/
failed/conflict/uncertain. Exemplos do Figma nao viram datas ou horarios reais.
Nao reintroduzir `Atendimento agendado com Sucesso!`, e-mail enviado,
`Reagendar` ou qualquer promessa removida pela revisao editorial.

## Arquivos, migrations e operacao

| Area | Arquivos propostos / tarefas |
| --- | --- |
| Decisao | docs/decisoes/adr-004-stack-atendimento.md proposto; T005 |
| Backend base | backend/manage.py, config/settings/urls, requirements/lock, env example; T009 |
| Modelos | atendimento/models.py e migrations/0001_initial.py, constraints/indices; T010 |
| API | serializers.py/views.py/urls.py; contexto/horarios/registro/lookup; T011/T013 |
| Servicos | services/registro.py, operacoes.py, notificacoes.py, oferta.py; T012–T014 |
| Comandos | ofertar_horarios, processar_notificacoes, consultar_notificacoes, repetir_notificacao, limpar_atendimento; T015 |
| Frontend dominio | atendimento.types/api/validation/recovery.ts e useAtendimento.ts; T016–T018 |
| UI/conteudo | componentes da feature, pagina e content/pages/atendimento-agendado.ts; T017/T019 |
| Integracao | Vite proxy /api somente desenvolvimento; HTTPS/proxy/worker na 017 |
| Testes | backend atendimento/tests; frontend testes de cliente/controlador/UI; T020–T023 |
| Documentacao | verification.md e quickstart.md da 014; T024 |

Criar schema completo e rodar makemigrations/migrate no ambiente sintetico,
verificar makemigrations --check --dry-run e consistencia do banco; nao gerar
migrations neste comando documental. Sem banco de Cartas ou segredos em frontend.

## Testes e matriz de evidencias futuras

Backend: Django APIClient com CSRF checks, relogio injetado/controlado, PostgreSQL
real e TransactionTestCase. Ultima vaga/capacidade >1, mesma chave mesmo payload,
mesma chave payload diferente inclusive horarios distintos, horario passado/
forjado/inativo, rollback de outbox e replay apos slot lotar/passar. Usar barreiras
e conexoes independentes, contar registros/eventos e nao provar lock com mocks.
Testar conflito versus lookup concorrente/not-observed e resposta perdida apos
commit; expiracao/tombstone/rotacao HMAC sem reabrir duplicidade.

Notificacao: SMTP falso ou captura local sem envio institucional; claim concorrente,
crash/lease expirado, retry/backoff, worker antigo, falha depois de aceite antes
de gravar. Conferir referencia/destinatario fixo/texto/cabecalhos, evento unico e
possibilidade documentada de repeticao fisica. Operacao/cleanup/acesso restrito
e alarmes sem PII, segredos ausentes de logs/bundle/requests publicos.

Frontend: suite compartilhada ou Vitest/Testing Library quando configurada;
API simulada para estados e rede, integracao real em ambiente sintetico.
Troca de data/resposta fora de ordem, revisao sem envio, confirmar duplicado,
timeout/commit perdido, mesma key/payload, conflito com campos preservados,
lookup recarga sem POST automatico, storage bloqueado/segredo perdido/expirado.
Inspecionar payloads/storage/URLs para ausencia Carta/diagnostico/PII em links.

| Ambiente proposto | Evidencia |
| --- | --- |
| PostgreSQL da serie alvo, conexoes reais | Transacao/capacidade/idempotencia/cleanup |
| Backend de teste + SMTP local falso | Notificacao duravel, retry e limites de entrega |
| Windows 11 Chrome/Edge/Firefox; macOS Safari | Fluxo/HTTPS/CSRF/rede/recuperacao |
| iOS Safari; Android Chrome reais | Selecao/revisao/foco/reflow e rede lenta |
| NVDA Chrome/Firefox; VoiceOver Safari | Controles/erros/resumo/resultados/fuso/anuncios |

Registrar versoes/hardware/ambiente no dia, dados sinteticos, procedimentos e
observacoes; ambientes indisponiveis permanecem pendentes. Larguras
1440/1024/768/390/320 px e intermediarias, texto 200%, zoom 400% para reflow,
fonte fallback/conteudo longo/contraste medido. Nenhuma solicitacao ou mensagem
real para verificar; deploy e segredos operacionais pertencem a etapa 017.

Checks apos codigo: npm run typecheck/build e suite frontend; Django check,
check --deploy no perfil de staging, migrations --check --dry-run e suites API/
PostgreSQL/worker. verification.md registra revisao produto, CA/tarefa, ambiente,
procedimento/resultado/defeito/reteste/pendencia, sem PII. quickstart explica
PostgreSQL, oferta dry-run, API/CSRF, worker SMTP falso e recuperacao concorrente.

## Rastreabilidade e prontidao

| Criterios | Evidencia / tarefas |
| --- | --- |
| CA01–CA03 | Entrada/oferta real/fuso/selecao; T010/T011/T016/T019/T022 |
| CA04–CA06 | Validacao/revisao/rejeicao servidor; T003/T011/T017/T020/T022 |
| CA07–CA08 | Locks/capacidade/idempotencia real; T012/T013/T018/T020 |
| CA09–CA11 | Commit/resultado verdadeiro/recuperacao/falhas; T012/T013/T018/T022 |
| CA12–CA13 | Outbox/worker/configuracao/SMTP teste; T014/T015/T021 |
| CA14–CA15 | Recarga sem envio/Carta separada; T018/T019/T022 |
| CA16 | API minima/acesso/CSRF/segredos; T004/T013/T015/T020/T021 |
| CA17 | Figma/teclado/leitura/reflow; T006/T019/T023 |
| CA18 | Decisoes/infra/politica/operacao/validacao; T002–T008/T015/T024 |
| CA19–CA20 | Quatro nodes na mesma rota, conteudo versionado prevalente e exemplos sem virar dados; T006/T017–T019/T022–T024 |

Nao declarar prontidao integral com stack sem lock/ADR, agenda/fuso/politica/
notificacao sem responsavel e evidencia, Figma/ERS pendentes ou worker ausente.
Nao criar consentimento ficticio, banco de Cartas, listagem publica, calendario
externo, anexos, cancelamento/remarcacao self-service ou promessa de entrega SMTP.

## Proximo passo

Continuar a implementacao apos decisoes institucionais/stack e V014-01/V014-03:
definir pausa editorial versus gate efetivo da API e tratamento de tentativa
existente, sem cancelar por inferencia; definir estabilidade/captura de
inicio/fim/fuso e oferta alterada entre revisao/envio, replay e notificacao.
V014-02 teve resumo API/tarefas sincronizados; payload final de contexto e
classificacao de erros por endpoint ainda dependem de T005. Consultar ERS/Figma,
validar agenda/campos/politica e registrar ADR/lock antes de backend/interface.
Helper isolado nao resolve essas decisoes. Nenhuma tarefa marcada concluida;
evidencias dos testes/checks em verification.md.

## Integração compartilhada — T013, 20/10/2026

Aplicar o [contrato de canais](../../../docs/arquitetura/contrato-canais-ajuda.md)
como definição única de estado/endereço/destino, apresentação, transições e
migração editorial. Entrada 425:201 com dois cards; atendimento ativo usa botão interno para abrir
calendário, sem link à própria rota. Pendente/pausado não inicia calendário ou
nova solicitação; dados/tentativa já existentes não são apagados.

Estado atual inspecionado: atendimento pendente, e-mail ativo editorialmente.
Ativo não prova vagas, recebimento ou implementação. Agenda vazia/erro de rede
e falha de clipboard são estados operacionais distintos, não mudam supportChannels.
As decisões de apresentação antes abertas em V013-01/V015-02 estão definidas
no contrato; efeitos de pausa na API/recuperação da 014 seguem para T014 global.
Conteúdo TypeScript permanece inalterado e ainda requer migração. Não há aceite
funcional nesta revisão; testar CJ01–CJ12 e critérios locais após implementar.

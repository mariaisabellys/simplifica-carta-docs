# Validacao: Atendimento agendado

Revisão atual: [verificação T013](../../../docs/verificacoes/t013-canais-ajuda.md).
A seção “Integração compartilhada — T013” ao final registra o contrato vigente.

## Registro anterior — evidência histórica, não estado atual dos canais

> **Baseline visual atualizado em 16 de outubro de 2026:** `425:201` e a
> entrada compartilhada com a 015; revalidar a sequencia interna da agenda.

## Resultado e escopo

Executado `/spec:validar 014-atendimento-agendado` em 2026-10-05.
**Resultado: requer consolidacao documental; decisoes institucionais,
fontes, infraestrutura e aceite funcional permanecem pendentes.**

Foram avaliados SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Somente este relatorio
foi criado, sem alterar esses artefatos ou codigo, criar backend, executar
migrations, acessar banco, enviar mensagens ou registrar solicitacoes.
Nenhuma tarefa foi concluida. T008 registra uma validacao com pendencias,
nao prontidao para implementacao dependente ou producao.

## Fontes analisadas e limites

- [spec.md](../spec.md), [plan.md](../plan.md), [tasks.md](../tasks.md) e
  [implementation-plan.md](../implementation-plan.md): agenda, dados, API,
  modelos, transacoes, idempotencia, outbox, recuperacao, UI e testes.
- Contratos de 013/015 e validacao da 013: estados compartilhados dos canais
  e alternativa por e-mail; contratos de navegacao/provider das rodadas anteriores.
- Decisoes tecnicas, ADR-003, contexto local de constitution/produto/roadmap
  e referencias de design inspecionados nesta conversa.
- Pagina/tipo inicial de atendimento e inventario frontend, sem backend
  funcional. Contratos atuais nao entregam API, banco, worker ou recuperacao.
- Documentacao oficial [Django 5.2: transacoes](https://docs.djangoproject.com/en/5.2/topics/db/transactions/),
  [select_for_update](https://docs.djangoproject.com/en/5.2/ref/models/querysets/#select-for-update)
  e [DRF: SessionAuthentication](https://www.django-rest-framework.org/api-guide/authentication/#sessionauthentication),
  consultadas nesta rodada. Referencias tecnicas nao comprovam testes executados.

O ERS PDF nao foi extraido/inspecionado. A verificacao de ferramentas registrada
na 006 nao encontrou Python/py/Poppler; nao houve instalacao nesta rodada.
Manual textual nao substitui PDF. Na rodada original, nao havia ferramenta
Figma utilizavel e os frames ainda nao estavam confirmados. Agenda, contatos,
modalidade, politica de dados e textos nao foram homologados pela equipe.

### Atualizacao das referencias visuais — 2026-10-08

Foram identificados `425:201` como escolha compartilhada de canal, `425:296`
para horario, `446:206` para dados/revisao e `470:444` para solicitacao
registrada. A transicao exata para escolha de data deve ser confirmada no MCP.

O layout deve adaptar-se a `scheduledServiceContent` e aos estados reais da
API. Copy ou exemplos do Figma nao podem restaurar promessas removidas: o
resultado e `Solicitacao registrada`, nao atendimento confirmado; nao anunciar
e-mail enviado nem oferecer `Reagendar`. Datas, horarios e dados pessoais dos
frames continuam ilustrativos. Identificacao resolvida; consulta MCP detalhada,
implementacao e verificacao visual permanecem pendentes.

## Lacunas e divergencias documentais

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V014-01 | Media, dependencia compartilhada | 013/015 propoem canais.ts unico com pendente/ativo/pausado e destino pausado explicativo. A 014 menciona estado editorial para alternativa por e-mail, mas nao detalha estado do proprio canal, acesso direto ou tentativa em andamento durante pausa. | Consolidar comportamento conjunto em 014/013/015: aviso e limite de novas solicitacoes, consulta/recuperacao e tentativa existente. Definir se pausa e somente editorial ou tambem regra efetiva da API. Nao inferir que card pausado cancela POST, remove registro ou modifica agenda. Ver V013-01. |
| V014-02 | Media | IMPLEMENTATION-PLAN adiciona GET contexto para CSRF/configuracao e resposta 410 operation-expired, explicitamente marcados como adicoes. PLAN tabela API e TASK T005 ainda enumeram apenas tres endpoints e 400/409/429/503. | Consolidar endpoint/payload e 410 no contrato resumido, tarefas de cliente/API e testes. Detalhar bootstrap, retry, expiracao, CSRF recusado e rate limit, mantendo mesma chave quando resultado continua incerto. Adicoes sao propostas reconhecidas, mas ainda nao formam contrato consistente em todos os artefatos. |
| V014-03 | Media, regra de manutencao pendente | Receipt retorna inicio/fim/timezone; modelo Solicitacao guarda FK Horario, sem intervalo capturado. Manutencao documenta locks/capacidade/habilitacao/estado, mas nao proibe alterar inicio/fim/fuso apos selecao ou registro. resposta_minima e helper omitido. | Definir estabilidade do intervalo e fuso: imutabilidade da oferta pertinente ou captura dos dados registrados, com politica para oferta alterada entre revisao e envio. Nao recuperar um horario diferente como se fosse o escolhido. Testar replay/notificacao apos manutencao e garantir revisao verdadeira. A lacuna nao comprova mutacao ocorrida; exige regra antes de implementar helpers/comandos. |

Nenhuma dessas lacunas autoriza criar reserva temporaria, cancelamento,
remarcacao self-service ou confirmacao automatica. As propostas devem ser
fechadas com os documentos donos e regras institucionais aplicaveis.

## Requisitos e contratos consistentes

- RF01–RF09 e os 18 criterios possuem rastreabilidade nos quatro artefatos.
  Atendimento GESED e distinto da configuracao de agendamento da Carta.
- Disponibilidade vem do backend, com estados loading/ready/empty/failed,
  fuso explicito e validacao final no servidor; selecionar nao reserva.
- Seis campos iniciais, horarioId, frontend/backend equivalentes; limites,
  telefone e politica de e-mail ainda candidatos. Sem CPF/anexos/Carta.
- Confirmacao explicita e unica acao de registro; revisao/correcao preservam
  dados. Registro ocupa capacidade e aguarda confirmacao institucional na
  proposta, sem anunciar atendimento definitivamente confirmado.
- Operacao, solicitacao e outbox atomicas; locks e unicidade protegem
  capacidade e repeticao. Replay concluido precede revalidacao de horario
  agora lotado/passado; excecao desfaz registros parciais.
- Segredo criptografico por tentativa, hash no banco e payload canonico com
  digest protegido/versionado; referencia publica nao concede acesso.
- Resultado incerto nao gera nova chave nem anuncia ausencia de registro.
  Lookup not-observed nao prova que POST concorrente nao concluira.
- Mesmo segredo/payload em retry; apos recarga somente lookup se payload nao
  esta em memoria. Sem POST automatico, campos pessoais ou Carta no marcador
  separado de sessionStorage; perda de segredo tem limite declarado.
- Outbox duravel e worker executavel com claim/lease/retry; envio fora dos
  locks de registro. Um evento logico nao garante mensagem fisica exatamente
  uma vez. Aceite SMTP nao e entrega/leitura; falha nao desfaz solicitacao.
- Destinatario/remetente configurados no servidor, corpo texto simples e
  entrada fora de cabecalhos; segredos fora do bundle e logs comuns.
- CSRF/origem explicitamente previstos para solicitante anonimo, acesso
  operacional restrito, limites/no-store e ausencia de listagem publica.
- Carta/diagnostico permanecem no navegador; provider acima das rotas
  preserva memoria, sem importacao desses dominios no backend.

As referencias Django apoiam testes transacionais/conexoes reais e tratamento
de erros apos rollback; a documentacao DRF confirma que SessionAuthentication
nao impõe CSRF a requests anonimos. A proposta reconhece esse limite e exige
protecao explicita. Isso nao certifica configuracao futura ou ausencia de falhas.

## Decisoes e dependencias pendentes

| Ponto | Acao necessaria |
| --- | --- |
| Agenda/confirmacao | Equipe confirma modalidade/duracao/participacao, oferta, capacidade, antecedencia/horizonte/feriados e se registro apenas solicita ou efetiva atendimento. America/Fortaleza e candidato, nao decisao homologada. |
| Dados/copy | Confirmar campos/limites/sintaxe/telefone, aviso/finalidade e proximo passo. Nao inventar allowlist de dominio, consentimento generico ou formato institucional. |
| Politica de dados | Definir responsaveis, acesso, retencao/exclusao/backups/incidentes e validade da recuperacao. Nao criar prazo/base legal por inferencia; limpeza nao pode reabrir duplicidade ou liberar capacidade futura indevidamente. |
| Stack/ADR | Registrar ADR-004 proposta e resolver patches/lock compatíveis no ambiente de implementacao. Series Python/Django/DRF/PostgreSQL sao alvo documental, sem dependencias instaladas ou stack aprovada. |
| Chave/relogio | Confirmar validade/tolerancia de timestamp cliente versus servidor e rotacao de segredo HMAC/tombstones. Testar desvio de relogio sem liberar nova tentativa duplicada. |
| Erros/recuperacao | Fechar V014-02 e classificacao dos erros de proxy/CSRF/payload/429/410 para cada endpoint. Falha de consulta nunca vira ausente; erro nao reconhecido nao autoriza novo envio cego. |
| Worker/operacao | Validar destinatario/provedor, timeout/lease/backoff, responsavel e processo de execucao, comandos restritos/alertas/backup. Outbox sem worker operacional nao entrega notificacao. |
| Canais/manutencao | Resolver V014-01/V014-03, com estados reais e intervalo registrado coerente; alternativa por e-mail somente confirmada. |
| ERS/Figma/navegacao | Confrontar PDF e consultar detalhadamente `425:201`, `425:296`, `446:206`, `470:444`; validar copy e navegacao. FAQ `169:495` nao define formulario de atendimento. |
| Deploy/ambientes | 017 nao detalhada; confirmar proxy/HTTPS/CSRF/banco/worker e suites PostgreSQL/SMTP falso, browsers/leitores/dispositivos. Nenhum ambiente ou aceite foi executado nesta rodada. |

## Verificacoes e arquivos alterados

Nao foram instaladas dependencias, executados build/checks/suites, criadas
migrations, iniciado servidor ou acessado banco. Snippets incluem helpers e
configuracao omitidos; este relatorio nao comprova compilacao ou transacoes.

Verificacao futura exige PostgreSQL/conexoes concorrentes reais, rollback,
replay/expiracao, resposta perdida/lookup concorrente, manutencao da oferta,
CSRF/abuso, worker/SMTP de teste, recuperacao frontend e acessibilidade.
Mocks/SQLite nao comprovam o contrato de locks proposto. Registrar evidencias
reproduziveis por CA em verification.md sem dados pessoais reais.

Somente `specs/014-atendimento-agendado/validation.md` foi criado.
Os quatro artefatos e src permaneceram intocados, sem tarefas concluidas
automaticamente. Resolver V014-01–V014-03 e decisoes aplicaveis, atualizar
contratos e repetir validacao antes de implementacao dependente ou producao.

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

# Contrato documental da agenda 014

21/10/2026 — T014. Fonte normativa única de API, intervalo, pausa e recuperação.
Contrato para futura implementação; não API existente nem aprovação de produção.
[ADR-003](../../docs/decisoes/adr-003-backend-atendimento.md) aceita backend mínimo;
[ADR-004](../../docs/decisoes/adr-004-stack-atendimento.md) mantém stack proposta.
[Canais](../../docs/arquitetura/contrato-canais-ajuda.md) define entrada/estados UI.

## Fronteira e payloads

Somente dados de atendimento, nunca Carta/diagnóstico. Não coletar credenciais.
Campos obrigatórios: nome, orgao, setor, emailInstitucional, telefone, assunto.
Adicionar descricaoDuvida opcional para corresponder a question-description
do conteúdo existente; não concatenar silenciosamente com assunto.
Payload fechado de registro: os seis campos + descricaoDuvida opcional + horarioId.
Omitido descricaoDuvida normaliza para string vazia antes do digest; demais
strings válidas são preservadas, sem trim editorial/truncamento.
Data, horário e fuso não são livres no payload: servidor deriva de horarioId.
Tipos/helper atuais ainda possuem apenas seis campos; migração futura obrigatória.

Slot público: {id, inicio, fim, timezone}, ISO 8601 com offset para instantes e
IANA para timezone. id é opaco estável; inicio/fim/timezone são imutáveis.
Alterar intervalo ou fuso cria outro id e desabilita oferta antiga. Não reutilizar
id removido. Capacidade/habilitação podem mudar com auditoria e lock.

Receipt: {referencia, estado: "registrada_aguardando_confirmacao", inicio, fim,
timezone}. Os três dados temporais vêm do snapshot gravado no registro,
nunca de join com oferta mutável ou configuração de fuso atual.
Modelo de negócio proposto: registro ocupa capacidade, sem afirmar agendamento
confirmado; aprovação institucional desse fluxo ainda é bloqueio IN01.

Erro: {code, fields?}; fields só para validação, sem repetir dados pessoais.
Códigos permitidos por endpoint abaixo. Nenhuma exceção, SQL, segredo ou
configuração do provedor em resposta/log público. Respostas privadas no-store.

## API fechada para implementação futura

| Método / endpoint | Entrada | Sucesso | Erros de domínio |
| --- | --- | --- | --- |
| GET /api/atendimento/contexto | Sem dados pessoais | 200 {canal:{status,notice?}, aceitaNovasSolicitacoes, timezone, maxDiasConsulta, limitesCampos, politicaVersao, csrfToken}; inicializa cookie CSRF | 503 unavailable se configuração mínima inválida |
| GET /api/atendimento/horarios | from/to YYYY-MM-DD, janela inclusiva | 200 {timezone, horarios:[Slot]}; [] significa consulta válida sem oferta | 400 invalid-input; 503 channel-unavailable se novas ações bloqueadas; 503 unavailable |
| POST /api/atendimento/solicitacoes | Payload fechado + header Idempotency-Key | 201 Receipt novo; 200 Receipt do mesmo registro | 400 invalid-input; 409 key-payload-mismatch / slot-unavailable; 410 operation-expired; 503 channel-unavailable / unavailable |
| POST /api/atendimento/operacoes/consultar | JSON {chave}, sem campos adicionais | 200 {status:"registered",result:Receipt} ou {status:"not-observed"} | 400 invalid-input; 410 operation-expired; 503 unavailable |

Todos: 429 rate-limited com Retry-After quando limitados; POST também 403
csrf-failed/origin-denied, 413 payload-too-large e 415 unsupported-media-type.
Erros de infraestrutura podem não ter esse envelope: tratá-los como desconhecidos,
não como rejeição definitiva do registro. GET não retorna registros pessoais.
Não há listagem pública por referência; referência não é autenticação.

Contexto com recuperação-only deve funcionar na pausa. Bloqueio de novas ações
não remove token CSRF, contexto ou consulta de operação. Parâmetros inválidos
não recebem default silencioso. Janela técnica proposta máxima 31 dias,
limites de campos/32 KiB e demais números só viram configuração após aprovação.
Servidor converte dias from/to no fuso institucional em intervalo UTC
[início de from, início do dia após to), inclusive em mudanças de offset.

## CSRF, origem e classificação de resultado

Same-origin HTTPS, credentials same-origin; POST exige origem autorizada e
token CSRF enviado em X-CSRFToken, inclusive sem login. Bootstrap de contexto
fornece token/cookie; não inserir segredo de operação em URL. Não depender de
configuração de autenticação que dispense proteção para anônimos.
Verificar CSRF real no ambiente escolhido; renovar contexto em recusa, sem
reenviar registro automaticamente. Política técnica, não configuração entregue.

200/201 com Receipt válido após commit é único sucesso de registro.
400/403/409/413/415 estruturados comprovam rejeição desta chamada, não ausência
de uma chamada anterior ou concorrente com mesma chave.
503 channel-unavailable impede criação nova nesta chamada; não prova ausência
de registro anterior. Timeout, rede, abort, resposta malformada/5xx desconhecido
e 429 no fluxo com tentativa anterior incerta mantêm incerteza.
Nunca gerar chave nova automaticamente por erro, recarga ou pausa.

410 é resposta terminal de recuperação expirada, não prova de que não houve
registro. Não criar automaticamente outra solicitação; orientar contato
operacional validado/ajuda. Not-observed também não prova ausência definitiva
de POST concorrente: preservar mesma chave/snapshot e consultar novamente.
Replay após expiração não é aceito; não retornar sucesso antigo fora da janela
de recuperação definida pela política. Não existe ramo status expired com 200:
expiração usa exclusivamente 410 operation-expired.

## Pausa editorial e autoridade de API

supportChannels é fonte editorial do frontend, não mecanismo de segurança.
API tem configuração operacional controlada, com versão e responsável.
Só iniciar nova ação se editorial ativo E aceitaNovasSolicitacoes true.
Um lado bloqueado prevalece; divergência mostra indisponibilidade e é registrada
operacionalmente sem dados pessoais. Não escrever no arquivo editorial por
erro de rede; não promover canal para ativo pela resposta da API.

Servidor autoriza/nega novas criações independentemente do cliente.
Na transação, verificar operação existente antes do gate de novas criações:
mesma chave/payload já registrada e ainda recuperável retorna mesmo snapshot
durante pausa; payload divergente dá 409; chave expirada dá 410.
Operação não registrada e gate bloqueado dá 503 channel-unavailable, sem criar
registro/outbox/ocupação. Lookup continua disponível com proteções.

Mudança do gate e admissão nova são serializadas pela mesma barreira/lock de
configuração. Se registro obtém autorização e commit antes da pausa, ele existe
e permanece recuperável; se pausa comita primeiro, nova criação é rejeitada.
Pausa não cancela registro, POST já autorizado ou notificação já enfileirada.
Ordem de locks proposta: operação → configuração operacional → intervalo;
manutenção não pode adquirir esses locks em ordem inversa.
Consulta/replay de registro existente não necessita lock do intervalo atual.

Na UI, pausa preserva formulário, tentativa/chave/payload e resultado; proíbe
nova submissão, mas oferece verificação explícita. Em resultado incerto,
não liberar novo pedido ao receber rejeição de uma repetição sem esclarecer
a tentativa anterior. Depois de reload sem payload, somente lookup, não
reconstrução dos dados nem replay com formulário novo.

## Idempotência, snapshot e concorrência

Chave secreta criptográfica por confirmação nova; nunca por clique repetido.
Guardar hash da chave e digest HMAC versionado do payload canônico no servidor.
Validade, tolerância de relógio e retenção/tombstones dependem de IN06.
Mesmo contato/horário com chaves diferentes não representa deduplicação garantida:
não prometer impedir pedidos deliberadamente distintos sem regra de negócio.

Registro atômico: operação única + solicitação com snapshot imutável
{horarioId,inicio,fim,timezone} + evento único de outbox. Capacidade conferida
sob lock do intervalo e relógio do servidor; selecionar/revisar não reserva.
Sem commit, nenhuma dessas partes persiste. Resultado só após commit.
Capacidade não pode ser reduzida abaixo da ocupação sem decisão institucional
separada; não cancelar ocupantes silenciosamente.

Oferta alterada antes do primeiro registro:
- Intervalo/fuso mudado → novo id; antigo indisponível → 409 slot-unavailable.
- Capacidade esgotada/desabilitado/passado → mesmo 409, preservando formulário.
- Revisão de nova oferta exige seleção/revisão/confirmar explícitos; só criar
  outra chave quando não existir resultado incerto da tentativa anterior.
Após registro, qualquer replay válido é resolvido antes de disponibilidade:
horário agora passado/lotado/desativado não altera Receipt nem duplica outbox.

### Replay conceitual conferido em 21/10/2026

| Passo | Estado sintético | Resultado documental esperado |
| --- | --- | --- |
| R1 | Intervalo A: início 10:00-03:00, fim 10:30-03:00, timezone institucional F; chave K/payload P | Registro S copia A para snapshot e cria um evento |
| R2 | Resposta perdida após commit | Cliente incerto; mantém K/P, não cria pedido novo |
| R3 | Oferta A desativada; nova oferta B com outro horário/fuso; gate pausado | S continua com snapshot A; nenhuma alteração retroativa |
| R4 | Replay K/P dentro da validade | 200 com snapshot A; um registro/uma ocupação/um evento |
| R5 | K com payload alterado | 409 key-payload-mismatch, sem novo registro |
| R6 | Lookup K após expiração | 410 operation-expired; não inferir ausência de S nem recriar |

F é símbolo de fuso aprovado, não aprovação de America/Fortaleza.
Tabela é análise de contrato, não execução de banco/locks/API.

## Notificação e resultado verdadeiro

Outbox durável, worker separado, destinatário/remetente configurados no servidor
e validados pela equipe. Não derivar destinatário da caixa de suporte 015
sem aprovação. Notificar apenas equipe; confirmação ao solicitante fora da
entrega proposta. Conteúdo mínimo em texto, não From/headers vindos do usuário.
Descrição opcional só no corpo se incluída e aprovada pela política de dados.

Claim com lease, timeout e tentativas limitadas; enviar fora da transação
de registro, gravar retorno condicionado ao lease atual. Falha de envio não
desfaz registro nem pede recadastro. Retentar evento, não solicitação.
Aceite SMTP não prova entrega/leitura. Crash após envio e antes do ack pode
duplicar mensagem física: evento lógico único não garante envio exatamente uma vez.
Parâmetros anteriores 120 s/30 s/5 tentativas/backoff são candidatos, não decisão
operacional aprovada. Worker real/monitoramento exigem IN05/IN07.

Mostrar “Solicitação registrada” com referência/snapshot após Receipt válido;
nunca “atendimento confirmado” ou “e-mail enviado” por inferência.
Na recuperação, somente resultado mínimo, sem reexpor campos pessoais.

## Registro institucional e responsáveis por confirmar

As consultas foram **abertas documentalmente em 27/10/2026**, em paralelo com
INF01–INF10, no [registro G6/G7](../../docs/decisoes/registro-g6-g7-agenda-deploy.md).
Continuam sem encaminhamento comprovado, nomeação, resposta ou aprovação.
Papéis são responsáveis a consultar, não atribuição a pessoas ou prazos reais.

| ID | Estado | Decisão/evidência necessária | Papel responsável por confirmar | Impacto / bloqueio |
| --- | --- | --- | --- | --- |
| IN01 | Aberta em 27/10/2026 | Registro ocupa capacidade aguardando confirmação; modalidade/duração/local/participação | Gestão do atendimento GESED | Fluxo de registro, textos e CA09/18 |
| IN02 | Aberta em 27/10/2026 | Oferta, capacidade, antecedência, horizonte, feriados e manutenção | Coordenação da agenda | Oferta/slots/concorrência e ativação |
| IN03 | Aberta em 27/10/2026 | Fuso IANA institucional (America/Fortaleza apenas candidato) | Coordenação da agenda + técnica | Exibição, consultas, snapshot e notificações |
| IN04 | Aberta em 27/10/2026 | Campos/formatos/limites, telefone/ramal e descrição opcional | Gestão do atendimento + responsável por privacidade | Schema/formulário/dados reais |
| IN05 | Aberta em 27/10/2026 | Destinatário/remetente/provedor, conteúdo e monitoramento da notificação | GESED + operação de comunicação | Worker/envio real; não usar contato 015 por inferência |
| IN06 | Aberta em 27/10/2026 | Finalidade, aviso, acesso, retenção/exclusão/backups, validade da chave/tombstones e incidentes | Responsável institucional por dados/privacidade + infraestrutura | Persistência/recuperação/produção; sem base legal ou prazo inventado |
| IN07 | Aberta em 27/10/2026 | Stack/lock, ambientes, banco, TLS, segredos, worker/leases/retry e supervisão | Coordenação técnica/infraestrutura | ADR-004, provisionamento/testes e deploy |
| IN08 | Aberta em 27/10/2026 | Quem pausa/reativa, procedimento e sincronização editorial/operacional | Gestão GESED + operação técnica | Gate e retomada; nenhuma reativação automática |

Registrar futuramente responsável nominal, fonte/ata, decisão, data e aprovador
em cada linha; até lá não considerar aprovação tácita. Limites candidatos:
nome 150, órgão/setor 200, e-mail 254, telefone 40, assunto 2000; limite de
descricaoDuvida ainda depende IN04. Sem truncamento automático ou coleta extra.
Sem envio/agenda real, credenciais ou configuração de infraestrutura nesta tarefa.

## Trabalho liberado e bloqueado

Liberado documentalmente: revisão de contratos, fixtures sintéticas, roteiro
de testes e análise R1–R6. Não autoriza escrever código neste comando.
Após autorização de implementação: protótipo isolado pode usar configuração
explicitamente sintética, nunca canal ativo/produção presumidos.
Bloqueados por IN01–IN08: schema final, migrations com dados reais, oferta
institucional, ativação, envio, worker operacional e deploy.
Testes PostgreSQL/CSRF/worker exigem ambiente isolado aprovado em IN07;
não instalar/provisionar por inferência. T013 conteúdo ainda não sincronizado.

## Matriz de verificação futura

| ID | Cenário | Resultado / critérios |
| --- | --- | --- |
| AG01 | Bootstrap/contexto/CSRF anônimo/origem/token ausente | Contrato de contexto e 403 reais, sem criação; CA01/16 |
| AG02 | GET vazio/erro/pausa/datas inválidas e mudança de offset | Distinguir []/400/503; fuso institucional; CA02/03 |
| AG03 | Campos obrigatórios, descrição opcional e desconhecidos | Validação equivalente sem truncamento; CA04/05 |
| AG04 | Última capacidade, múltiplas conexões e capacidade maior que um | Sem excedente; rejeição 409 preserva dados; CA06/07 |
| AG05 | Mesma chave/payload simultâneos e diferente | Um registro/outbox; mismatch 409; CA08 |
| AG06 | Perda de resposta, lookup not-observed e retry | Sem chave nova; mesmo snapshot após commit; CA10/14 |
| AG07 | Gate pausa concorrente com primeiro POST/replay | Ordem definida; replay registrado permitido, novo bloqueado; CA08/11/21 |
| AG08 | Intervalo/fuso alterados antes/depois do registro | Novo id antes; snapshot imutável depois; CA03/08/22 |
| AG09 | Expiração, relógio, cleanup e segredo perdido | 410 sem inferir ausência; tombstone não reabre duplicidade; CA10/16 |
| AG10 | Falha/crash worker/SMTP e lease obsoleto | Registro preservado, retry evento, sem falsa entrega; CA12/13 |
| AG11 | Reload/storage bloqueado/resposta inválida/429/503 | Incerto preservado, recuperação explícita, sem POST automático; CA10/14 |
| AG12 | Fluxo/cards/teclado/reflow e Carta preenchida | CJ01–CJ12 + sem envio/leitura da Carta; CA15/17/19/20 |
| AG13 | Revisão de IN01–IN08/ADR/ambientes | Pendentes bloqueiam produção; CA18 |

Testes são futuros. Comparação conceitual R1–R6 não prova concorrência real,
segurança, SMTP, conformidade legal ou acessibilidade.

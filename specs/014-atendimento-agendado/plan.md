# Plan: Atendimento agendado

## Objetivo e status

Planejar disponibilidade, formulario, revisao e registro de solicitacao em
`/ajuda/atendimento-agendado`, com controle de capacidade, recuperacao de
tentativas e notificacao da equipe. A Carta permanece no navegador.

Este documento prepara `/spec:tarefas`; nao cria backend, agenda operacional,
solicitacoes ou mensagens reais. Antes de implementar, consolidar contratos em
`implementation-plan.md`, resolver regras institucionais e executar validacao.

## Fontes e estado atual

- Spec 014, planos 007/013, specs 015/016 e documentos locais de produto.
- Constitution, regras para IA, fundacao tecnica e ADR-003.
- Manual de levantamento: campos, revisao, registro e recomendacao Django/DRF.
- Rota, AtendimentoAgendadoPage e atendimento.types.ts existentes.
- Documentacao oficial versionada do Django, indicada ao final.

A pagina e um placeholder. O tipo atual contem nome, orgao, setor,
emailInstitucional, telefone, assunto, data e horario como strings, mas nao
representa disponibilidade, operacao idempotente ou estados de notificacao.
Nao existe backend implementado ou infraestrutura de testes para esta feature.
015 e 016 agora possuem specs; a nota de ausencia na spec e historica.
017 continua sendo dependencia de publicacao a detalhar.

Nao houve leitura do PDF do ERS, consulta direta ao Figma ou verificacao de
agenda, destinatario e provedor operacionais. Esses pontos continuam pendentes.

## Abordagem tecnica

### 1. Stack e fronteira de dados

Propor Django com Django REST Framework em `backend/`, coerente com o manual
e o backend minimo previsto na ADR-003. Usar PostgreSQL para disponibilidade
e registro concorrente. SQLite pode servir a experimento descartavel, mas nao
validara o contrato de concorrencia: `select_for_update` nao bloqueia linhas
nesse banco. Fixar versoes suportadas e dependencias no plano de implementacao.

Registrar a escolha concreta em documento de arquitetura/ADR antes do codigo;
este plano nao altera silenciosamente decisoes existentes. Preferir frontend
e API publicados na mesma origem, com proxy `/api/` e HTTPS. No desenvolvimento,
configurar proxy do Vite para a API, sem credenciais no bundle.

API publica limitada a disponibilidade, registro e recuperacao da propria
operacao por segredo aleatorio. Sem login de solicitante. Operacao da equipe
exige acesso autenticado e restrito; nao criar endpoint publico de listagem.
Nao importar tipos, store ou payload da Carta para o backend.

### 2. Agenda e persistencia

| Entidade | Dados e invariantes |
| --- | --- |
| Horario | UUID, inicio/fim com fuso, capacidade inteira positiva e habilitado; fim posterior ao inicio. |
| Solicitacao | UUID interno, referencia publica aleatoria, horario, seis campos do formulario, estado e datas operacionais. |
| Operacao | Hash de segredo aleatorio, hash do payload canonico, solicitacao associada e validade de recuperacao. Chave unica no banco. |
| Notificacao | Solicitacao/evento unicos, estado, tentativas, proxima tentativa, lease do worker e erro operacional sem dados pessoais. |

Armazenar instantes em UTC e publicar ISO 8601 com offset. Configurar fuso
institucional explicito; `America/Fortaleza` e proposta a confirmar, nao regra
aprovada. Frontend formata com Intl e esse fuso, sem inferir pelo dispositivo.
Backend fornece identificador IANA junto da disponibilidade e confirmacao.

Ofertar intervalos previamente cadastrados por comando administrativo restrito,
com validacao e modo de verificacao antes de gravar. Nao gerar agenda ficticia
ou integrar calendario externo. Capacidade e configuravel por intervalo.
Definir duracao, antecedencia, horizonte, feriados e responsavel pela oferta
com a equipe; nenhum horario e criado como efeito de visitar a pagina.

Escolher horario nao reserva vaga. Na proposta inicial, solicitacoes registradas
ocupam capacidade imediatamente e aguardam confirmacao institucional; mostrar
"Solicitacao registrada", sem anunciar atendimento confirmado. Conciliar essa
politica com ERS/equipe antes de implementar. Se o registro efetivar agendamento,
alterar estado, textos e testes juntos. Operador pode inativar oferta; alteracao
de capacidade nunca pode ficar abaixo da ocupacao vigente.

### 3. Contrato de API proposto

| Endpoint | Contrato |
| --- | --- |
| GET `/api/atendimento/contexto` | Bootstrap CSRF e configuracao publica/fuso/limites; URL/payload final a fechar em T005, sem dados pessoais. |
| GET `/api/atendimento/horarios?from=...&to=...` | Datas ISO, intervalo limitado; retorna horarios disponiveis, inicio/fim e fuso, sem dados de solicitantes. |
| POST `/api/atendimento/solicitacoes` | Seis campos e horarioId; segredo em `Idempotency-Key`; registra ou recupera a mesma tentativa. |
| POST `/api/atendimento/operacoes/consultar` | Segredo no corpo; retorna apenas resultado minimo da propria tentativa, sem listar operacoes. |

Limitar consulta a 31 dias por requisicao como proposta tecnica, conciliada com
o horizonte institucional. Resposta de registro: referencia, estado, inicio,
fim e fuso. Nao retornar dados pessoais na recuperacao apos recarga.
Referencia publica nao concede acesso; somente o segredo da operacao permite
recuperar resultado. Nao colocar segredo ou campos pessoais em URLs.

Usar 201 para novo registro e 200 para repeticao concluida. Erros estruturados
com codigo estavel e erros por campo: 400 para contrato invalido; 409 para
horario indisponivel ou chave reutilizada com payload diferente; 410 para
operation-expired conforme plano detalhado; 429 com
Retry-After e orientacao de nova tentativa; 503 para indisponibilidade. Mensagens publicas
nao incluem excecoes, SQL ou configuracao do provedor.

Ausencia em consulta de operacao nao prova que uma requisicao concorrente
nao sera concluida. Para resolver resultado incerto, repetir o POST original
com a mesma chave e payload, quando ainda disponiveis, ou consultar novamente.
Nunca gerar nova chave automaticamente depois de timeout.

### 4. Validacao e formulario

Manter os seis campos obrigatorios inicialmente. Propor limites de caracteres:
nome 150, orgao 200, setor 200, e-mail 254, telefone 40 e assunto 2000.
Confirmar esses limites e formato de telefone antes do codigo. Rejeitar campos
desconhecidos, tipos invalidos e texto vazio apos trim no backend; frontend
aplica o mesmo contrato e associa erros a controles e resumo.

Validar sintaxe de e-mail sem inventar lista de dominios. Telefone aceita
pontuacao conforme contrato institucional, preservando a informacao digitada.
Nao alterar silenciosamente assunto, nome ou telefone durante normalizacao.
Backend deriva data/horario do horarioId; nao confia em strings do cliente.

Separar orientacoes e mensagens em `src/content/ajuda/atendimento-agendado.ts`.
Incluir orientacao para nao informar senhas, documentos ou dados de cidadaos.
Nao adicionar anexos, CPF ou consentimento generico. Aviso de finalidade e
tratamento depende de texto institucional versionado e validado.

O conteudo base usa `Confirmar solicitacao` e, somente apos recibo valido,
`Solicitacao registrada`. Nao afirma atendimento confirmado, envio de e-mail
ao solicitante ou remarcacao disponivel. Exemplos de calendario/horario sao
identificados como ilustrativos e nao substituem a consulta ao backend.

### 5. Transacao, capacidade e idempotencia

Gerar segredo com pelo menos 256 bits aleatorios criptograficos para cada
confirmacao explicita de um payload novo. Guardar apenas seu hash no backend.
Associar hash do payload canonico para detectar chave reutilizada com dados
diferentes. Reenvio do mesmo payload usa a mesma chave.

Dentro de transacao atomica:

1. Resolver operacao pela chave unica; repeticao concluida retorna resultado
   anterior antes de revalidar se o horario agora esta passado ou lotado.
2. Para operacao nova, bloquear linha do horario e validar existencia,
   habilitacao, inicio futuro e ocupacao menor que capacidade.
3. Criar solicitacao, associar operacao e criar notificacao pendente na mesma
   transacao; confirmar commit antes de responder sucesso.
4. Em conflito, retornar erro sem solicitacao, ocupacao ou notificacao parcial.

Todas as rotinas que alteram ocupacao/capacidade usam o mesmo bloqueio de
horario e ordem deterministica de locks. Unicidade da operacao protege chamadas
simultaneas com mesma chave; tratar violacao com savepoint/releitura depois da
transacao concorrente, sem continuar uma transacao quebrada. Nao usar apenas
contagem sem bloqueio ou desabilitacao do botao.

Rollback remove qualquer registro parcial. Falha de rede depois do commit
mantem resultado recuperavel. Operacoes sem registro podem ser repetidas com a
mesma chave; nao criar estado pendente permanente sem lease e recuperacao.
Prazo de guarda de chaves/resultados deve cobrir recuperacao e retencao definida
pela instituicao; exclusao nao pode reabrir duplicidade de operacao ainda valida.

### 6. Notificacao duravel e operacao restrita

Usar outbox no banco, criada junto da solicitacao. Um comando worker agendado
processa pendencias com lease, tentativas limitadas e backoff configurado.
Nao exigir Redis/Celery no MVP. Definir processo e agendamento do worker no
deploy; gravar pendencia sem executar worker nao constitui notificacao pronta.

Enviar fora da transacao de registro e de locks longos. Worker reivindica
evento atomicamente, envia e atualiza resultado verificando seu lease.
Falha SMTP nao desfaz solicitacao. Comando restrito permite consultar estados
e repetir evento falho, sem criar nova solicitacao. Alertar operador sobre
falhas persistentes sem incluir nome, telefone, e-mail ou assunto no alerta.

Destinatario, remetente e credenciais sao configuracao exclusiva do servidor.
Corpo em texto simples e assunto controlado incluem referencia e dados minimos;
entrada do usuario nao vira cabecalho. Nao usar e-mail do usuario como From.
Validar destinatario com equipe; endereco citado em outro documento nao prova
que esta ativo. Confirmacao por e-mail ao solicitante fica fora desta entrega.

Marcar aceite do provedor como aceito, sem afirmar entrega/leitura. Falha entre
aceite SMTP e gravacao do resultado pode repetir mensagem: outbox garante um
evento logico por solicitacao, mas SMTP nao garante entrega exatamente uma vez.
Usar Message-ID estavel e referencia para conciliacao; registrar essa limitacao
operacional e aproveitar deduplicacao do provedor somente quando comprovada.
`on_commit` pode acordar worker, mas nao substitui fila persistida e retentativa.

### 7. Estado e continuidade no frontend

Separar disponibilidade de estado do formulario. Fluxo: escolha > dados >
revisao > envio > resultado. Tratar conflito, erro anterior ao registro e
resultado incerto como estados distintos. Mudanca de data invalida horario
incompativel; requisicoes antigas de disponibilidade nao sobrescrevem recentes.

Resumo mostra todos os campos e horario/fuso; voltar preserva formulario.
Confirmar e a unica acao que envia. Durante processamento, impedir confirmacao
repetida e anunciar estado. No conflito, atualizar horarios preservando campos.
No sucesso, limpar dados pessoais da memoria ao encerrar a visita; voltar ou
recarregar nunca dispara POST de registro automaticamente.

Manter campos em memoria durante a visita. Persistir em sessionStorage apenas
segredo, referencia e estado minimo da operacao para recuperar apos recarga,
com acesso protegido por try/catch e chave separada da Carta. Nao guardar os
seis campos em storage. Recuperacao consulta API sem reenviar dados pessoais.
Apagar segredo ao encerrar recuperacao/expirar conforme contrato definido.

Se storage falhar, continuar em memoria e explicar limitacao de recuperacao
apos recarga. Se o segredo se perder em resultado incerto, orientar contato
com equipe; nao oferecer novo cadastro como recuperacao automatica. Esse caso
deve ser testado, sem prometer recuperacao que o cliente nao pode realizar.

Reutilizar navegacao interna do shell, breadcrumb Inicio > Preciso de ajuda >
Atendimento agendado e links reais para `/ajuda`, `/ajuda/suporte-email` e
formulario. Nao ler ou modificar storage da Carta. Tratar ausencia operacional
da API como indisponibilidade verdadeira, sem horarios simulados em producao.

### 8. Acesso, privacidade e publicacao

Definir acesso operacional por comandos autenticados no servidor inicialmente,
sem painel completo. Restringir banco, backups e segredos a equipe autorizada.
Contrato same-origin exige protecao CSRF/origem para POST e configuracao segura
de cookies quando usados. CORS nao substitui autenticacao ou controle de acesso.

Limitar payload, janelas de consulta e requisicoes por origem/IP conforme
infraestrutura, considerando proxies e usuarios em rede institucional comum.
Aplicar controles no proxy e API; throttling isolado nao substitui transacao
de capacidade. Operacao e segredo nao aparecem em logs, traces ou analytics.
Respostas pessoais/recuperacao usam Cache-Control: no-store.

Antes de producao, definir finalidade, responsavel, acesso, retencao/exclusao,
backup, aviso ao usuario e procedimento de incidente com a instituicao.
Implementar limpeza e acesso conforme essa decisao, incluindo operacoes e
outbox; nao inventar prazo ou base legal. Logs comuns registram apenas codigos,
tempo e identificadores operacionais permitidos, sem payload ou headers secretos.

## Componentes e arquivos provaveis

| Area | Arquivos ou responsabilidade |
| --- | --- |
| Pagina | `src/pages/AtendimentoAgendadoPage.tsx`: composicao e integracao com shell. |
| Conteudo | `src/content/ajuda/atendimento-agendado.ts`: textos e mensagens versionados. |
| Feature | `src/features/atendimento/atendimento.types.ts`, `atendimento.api.ts`, `atendimento.validation.ts` e `useAtendimento.ts`. |
| Componentes | SelecaoHorario, FormularioAtendimento, RevisaoAtendimento e ResultadoAtendimento, dentro da feature. |
| Estilos | CSS da feature usando tokens existentes; adaptar componentes comuns somente quando necessario. |
| Backend | `backend/` com configuracao Django, app atendimento, models, serializers, services, views, urls, migrations e tests. |
| Operacao | Comandos de oferta de horarios, worker de notificacoes, consulta/repeticao restrita e limpeza conforme politica. |
| Integracao | Proxy Vite, variaveis de ambiente de exemplo sem segredos, documentacao local e deploy da 017. |
| Decisoes | Documento/ADR de stack, politica de agenda e operacao; mapa Figma e implementation-plan desta feature. |

Nomes sao propostas a ajustar a estrutura vigente. Compartilhar tipos de erro
e controles acessiveis quando ja existirem; nao introduzir router ou store
paralelos. Nao alterar formulario/CSV da Carta para transportar atendimento.

## Referencias visuais e acessibilidade

Consultar detalhadamente os frames ja identificados no Figma Design:
`425:201` (data), `425:296` (horario), `446:206` (dados/revisao) e
`470:444` (resultado); consultar Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, via MCP antes de implementar.
Node `169:495` e de ajuda/FAQ, nao referencia comprovada do agendamento.
Registrar evidencias, estados, assets e responsividade no implementation-plan.
O layout deve adaptar-se ao conteudo versionado e aos estados reais da API;
exemplos de data/horario/dados do Figma nunca viram disponibilidade ou defaults.

Preferir controles nativos de selecao por data/horario com agrupamento e
rotulos; nao construir calendario complexo sem necessidade demonstrada pelo
Figma. Selecionado, indisponivel e processamento precisam de texto alem de cor.
Associar ajuda/erros, focar resumo de erros ou titulo da etapa, usar anuncios
moderados e foco visivel. Conferir teclado, leitor de tela, zoom e telas
pequenas sem corte/rolagem horizontal, reutilizando Inter e tokens.

## Estrategia de verificacao

| Criterios | Verificacao prevista |
| --- | --- |
| CA01–03 | Rota direta/recarga/ajuda; disponibilidade encontrada, vazia e falha; data/fuso, troca de selecao e respostas fora de ordem. |
| CA04–06 | Frontend e API rejeitam ausencias, espacos, excesso, tipos invalidos e horarios passados/forjados; revisao nao envia. |
| CA07–08 | Testes transacionais com PostgreSQL e conexoes concorrentes: ultima vaga, capacidade maior que um e mesma chave/payload. |
| CA09–11 | Confirmacao somente apos commit; falha antes do registro, resposta perdida, recuperacao e chave com payload diferente. |
| CA12–13 | SMTP falso: falha, retry, crash do worker, lease vencido e um evento por registro; destinatario controlado e nenhum segredo no bundle. |
| CA14–16 | Recarga sem POST automatico, storage bloqueado, token invalido, ausencia de enumeracao publica e Carta preservada. |
| CA17 | Teclado/leitor de tela, foco, anuncios, responsividade e ampliacao nos navegadores previstos. |
| CA18 | Conferir Figma, regras institucionais, configuracao de agenda, banco, worker, politica de dados e deploy. |
| CA19–CA20 | Quatro estados na mesma rota, preservacao do fluxo e prevalencia do conteudo/versionamento sobre exemplos do Figma. |

Usar testes de servico/API Django e testes transacionais adequados para locks,
com PostgreSQL real no ambiente de integracao. Tests unitarios com SQLite nao
comprovam concorrencia. Controlar relogio nos casos de limite de horario.
Simular respostas de rede no frontend e SMTP em memoria, com dados sinteticos;
nao enviar mensagens ou criar registros institucionais reais nos testes.

Definir ferramenta frontend no implementation-plan conforme infraestrutura
disponivel, evitando adicionar framework apenas para espelhar componentes.
Executar typecheck/build, checks Django, verificacao de migrations e testes
de contrato/concorrencia na implementacao. Hoje foi revisada documentacao;
nenhum build, teste de aplicacao ou envio de e-mail foi executado.

## Riscos e decisoes pendentes

- Agenda, capacidade, modalidade, duracao, fuso e confirmacao institucional
  precisam de decisao antes de fechar contratos e textos.
- ERS precisa confirmar campos, limites, telefone e eventual regra de dominio.
- PostgreSQL, hospedagem, worker, destinatario e provedor precisam de operacao
  concreta; placeholder nao comprova prontidao do canal.
- Recuperacao depende do segredo e de sua retencao; especificar expiracao e
  tratamento de perda sem duplicidade ou exposicao.
- SMTP pode repetir mensagem apos falha incerta; equipe identifica referencia,
  sem promessa de entrega unica ou leitura.
- Politica de dados e controles operacionais precisam de validacao institucional
  antes de producao. Figma e textos devem ser conciliados antes do codigo visual.

Essas pendencias nao impedem decompor tarefas, mas tarefas dependentes devem
explicitar o bloqueio. Sem essas decisoes, nao declarar CA18 atendido.

## Referencias tecnicas

- [Django: select_for_update e limites por banco](https://docs.djangoproject.com/en/5.2/ref/models/querysets/#select-for-update).
- [Django: transacoes e callbacks apos commit](https://docs.djangoproject.com/en/5.2/topics/db/transactions/#performing-actions-after-commit).

Referencias versionadas apoiam a proposta; nao afirmam que Django 5.2 foi
instalado ou que seja a ultima versao. Fixar stack suportada na proxima etapa.

## Proximo passo

Executar `/spec:tarefas 014-atendimento-agendado`, separando decisoes,
infraestrutura/backend, fluxo frontend, notificacoes, operacao e verificacoes.
Depois criar `implementation-plan.md`, resolver pendencias e executar
`/spec:validar` antes de `/spec:implementar`.

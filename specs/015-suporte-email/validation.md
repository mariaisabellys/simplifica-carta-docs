# Validacao: Suporte por e-mail

> **Baseline atualizado em 16 de outubro de 2026:** frame e acao foram
> definidos. Revalidar a interface futura no node `425:201`, com copia do e-mail
> da GESED e sem `mailto:`.

## Resultado e escopo

Executado `/spec:validar 015-suporte-email` em 2026-10-05.
**Resultado: requer consolidacao documental; contato institucional, copy,
ERS, Figma e aceite funcional permanecem pendentes.**

Foram avaliados SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Somente este relatorio
foi criado, sem alterar esses artefatos ou codigo, abrir aplicativo externo,
acessar clipboard, enviar mensagem, criar backend ou executar migrations.
Nenhuma tarefa foi marcada concluida. T007 registra validacao com pendencias,
sem aprovar contato ativo ou implementacao visual/funcional.

## Fontes analisadas e limites

- [spec.md](spec.md), [plan.md](plan.md), [tasks.md](tasks.md) e
  [implementation-plan.md](implementation-plan.md): contato, estados,
  mailto, copia, navegacao, codigo base e cobertura RF01–RF07/CA01–CA13.
- Planos detalhados e validacoes de 012/013/014: utilitario/controlador
  neutro, estados compartilhados e alternativas entre canais. Contratos de
  navegacao e provider 002/007 inspecionados nas rodadas anteriores.
- Constitution, prompts/regras de IA, MVP, fluxos, decisoes tecnicas,
  ADR-003 e referencias locais de Figma. README/manual textual consultados
  quanto a contato, escopo orientativo e notificacoes.
- SuporteEmailPage, rota existente e package.json: pagina placeholder,
  sem acoes de contato/copia ou suite de testes configurada.
- [RFC 6068 — mailto](https://www.rfc-editor.org/rfc/rfc6068) e
  [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/),
  consultadas nesta rodada; fontes tecnicas nao validam atividade do contato
  nem comprovam resultado em navegador/aplicativo real.

O PDF do ERS nao foi extraido/inspecionado. A verificacao registrada na 006
nao encontrou Python/py/Poppler; nao houve instalacao nesta rodada. Manual
textual nao substitui PDF. Nao ha ferramenta Figma utilizavel exposta nesta
sessao e o mapa local nao identifica frame proprio da 015. A referencia
169:495 e FAQ, nao composicao comprovada de suporte por e-mail.

Nao foi encontrado arquivo separado de roadmap no inventario Markdown local;
MVP, fluxos e sequencia de specs oferecem contexto de planejamento, sem
comprovar entrega. Nenhuma confirmacao institucional de titularidade,
atividade ou recebimento do contato foi obtida.

## Lacunas e consolidacao documental

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V015-01 | Media, contrato compartilhado | PLAN Fonte unica propoe endereco/estado/aviso no objeto de contatos.ts; TASK T002/T006/T008 mantem esse contrato. IMPLEMENTATION-PLAN separa contatos.ts de canais.ts e exige estado unico no segundo, em acordo com 013. | Consolidar PLAN/TASK com a separacao proposta, indicando propriedade/imports e tarefas para canais.ts. Nao criar duas constantes de estado ou deixar ajuda e contato anunciarem disponibilidades diferentes. A adicao no plano detalhado esta reconhecida, mas precisa chegar ao contrato resumido. |
| V015-02 | Media, apresentacao editorial pendente | PLAN/TASK T002 e IMPLEMENTATION-PLAN permitem endereco como referencia indisponivel somente conforme texto/apresentacao validados. O JSX proposto renderiza textarea com email e instrucao de copia manual para qualquer estado, inclusive pendente; apenas mailto/copia automatica sao condicionais. SPEC RF05 fala em alternativa manual permanente sem explicitar essa excecao editorial. | Fechar apresentacao para ativo/pendente/pausado: decidir com equipe se endereco de referencia pode aparecer em cada estado e qual aviso acompanha selecao manual. Alinhar RF05, tarefas e codigo base a essa decisao. Nao confundir ausencia de handler com canal nao confirmado, nem publicar endereco pendente como contato ativo. Testar acesso direto e troca de estado. Nao ha prova de envio indevido; trata-se de proposta cuja condicao editorial nao esta representada no snippet. |

V015-02 nao determina ocultar ou excluir o contato por inferencia. A referencia
documentada permanece `gesed.semtd@gmail.com`, sujeita a confirmacao. Nao
substituir por outro endereco ou tentar confirmar mediante mensagem real.

## Requisitos e contratos consistentes

- RF01–RF07 e todos os 13 criterios possuem rastreabilidade em PLAN, TASK
  e IMPLEMENTATION-PLAN; nenhuma lacuna de numeracao de criterio encontrada.
- Acesso por ajuda, alternativa 014, URL e recarga, sem login, diagnostico,
  Carta, CSV ou backend de agendamento como requisito para consultar pagina.
- Suporte orientativo GESED; nao aprova/publica Carta, promete prazo ou
  substitui canais tecnicos externos. Orientacoes e exemplos ficam versionados.
- Usuario escreve, revisa e envia no aplicativo externo; nao ha formulario
  de envio, SMTP, coleta, anexos automaticos, protocolo ou rascunho no app.
- Destinatario fixo e somente assunto generico versionado, sem body/cc/bcc,
  parametros da URL ou dados da sessao. URI construido por helper puro,
  percent-encoding UTF-8 uma vez por componente, sem interceptacao SPA.
- Link acionado explicitamente; montagem/clique nao anunciam mensagem
  enviada, recebida, lida ou aplicativo comprovadamente aberto.
- No canal ativo, endereco selecionavel e alternativa manual independem
  de deteccao do aplicativo. Falha do handler nao exige novo backend.
- Copia recebe somente endereco exato; sucesso apos promise resolvida,
  sem leitura do clipboard, permissao previa obrigatoria ou fallback oculto.
- Controlador neutro compartilhavel com 012: trava imediata, revisao A/B/A,
  callbacks/timers atuais e limpeza na desmontagem. Mudanca de estado passa
  undefined e conserva instancia/trava enquanto gravacao esta pendente.
- Confirmacao de copia e distinta de envio. Duracoes de cinco segundos e
  aviso de demora apos dez segundos sao propostas, sujeitas a validacao.
- Carta preservada por navegacao/provider acima das rotas, sem leitura de
  dominio, dados em mailto/clipboard/requests ou limpeza em blur/visibilitychange.
- Alternativa de atendimento somente com estado ativo e destino real
  confirmado; nao reserva horario, consulta agenda ou cria solicitacao.
- Teclado, foco, status local, endereco longo e reflow possuem verificacoes
  futuras; exemplos de codigo nao certificam compilacao ou acessibilidade.

A RFC 6068 sustenta codificacao dos componentes e separacao entre URI e
mensagem enviada pelo usuario. A referencia Clipboard descreve escrita
assincrona sujeita a permissoes e tratamento de texto pela plataforma.
Essas referencias nao comprovam handler configurado ou copia/colagem real.
A restricao ASCII do helper e explicitamente de escopo, nao validacao
universal de e-mail nem evidencia de contato operacional.

## Rastreabilidade dos criterios

| Criterios | Evidencia planejada / tarefas |
| --- | --- |
| CA01 | Entradas, URL/recarga e shell; T001/T011/T013 |
| CA02/CA09 | Contato confirmado, fonte unica e texto/link/copia identicos; T002/T008–T010/T013 |
| CA03/CA08 | URI/subject, gesto explicito e ausencia de anuncio de envio; T003/T009/T013–T014 |
| CA04/CA05 | Alternativa manual e copia resolve/reject/ausente, corridas e timers; T004/T009–T010/T013–T014 |
| CA06 | Orientacoes/exemplos sem coleta ou anexos exigidos; T003/T008/T011/T013 |
| CA07/CA10 | Memoria preservada e retornos sem historico exclusivo ou solicitacao; T001/T011/T013 |
| CA11 | Figma, teclado/leitor, foco/status e reflow; T004–T006/T010/T012/T014 |
| CA12 | Estados, alternativas verdadeiras e limites orientativos; T002–T003/T008–T009/T011/T013 |
| CA13 | Conteudo versionado, Figma e ausencia de coleta/envio/persistencia; T001–T008/T011–T013/T015 |

Rastreabilidade indica cobertura planejada, nao criterios aprovados. CA02
depende de confirmacao institucional; CA13 inclui consulta visual pendente.

## Pendencias e impactos para implementacao futura

| Ponto | Acao necessaria |
| --- | --- |
| Contato/copy | Equipe confirma endereco, titularidade/atividade, finalidade e textos; registrar responsavel/data/fonte sem evidencia interna no bundle. Sintaxe e placeholder nao encerram CA02. |
| Estados/fontes | Resolver V015-01/V015-02 e casos ativo/pendente/pausado. Estado editorial nao mede disponibilidade em tempo real nem muda por falha isolada de API. |
| Alternativa 014 | Fechar V013-01/V014-01 sobre estado do destino de agendamento e confirmar entrega real antes de publica-lo como operacional. Backend indisponivel nao impede consultar orientacoes da 015. |
| Clipboard 012 | Extrair controlador para helper/hook neutros e alinhar consumidores sem dependencia inversa. Pendencias da 012 sobre campos condicionais/quebras nao devem ser tratadas como resolvidas pela copia de um endereco de uma linha. Testar identidade/trava e cleanup no contrato comum. |
| Mailto | Confirmar assunto generico e escopo do endereco; verificar uma codificacao, +/acentos/delimitadores e rejeicao de configuracao inadequada com fixtures sinteticas. Mudanca para endereco fora do escopo exige revisao, sem alteracao silenciosa. |
| ERS/Figma | Confrontar PDF e consultar Design/Make, confirmar frame/estados/tokens. Se prototipo trouxer formulario de envio, resolver divergencia antes de ampliar escopo/backend. |
| Navegacao/provider | Conciliar contratos 002/003 e entregar links/breadcrumb/foco da 002 e provider 007; testar volta com Carta em memoria e storage bloqueado, sem importar dados no suporte. |
| Ambientes/aceite | Registrar browsers, handlers configurados/ausentes, leitores/dispositivos, selecao, foco e reflow. Inspecionar compose apenas em ambiente controlado, encerrar sem enviar; mocks nao certificam ambiente real. |

README/ADR mencionam suporte relacionado e notificacoes de suporte/atendimento
em termos gerais. A 015 delimita envio pelo aplicativo externo, enquanto a
014 detem notificacoes do atendimento. Nao foi encontrada exigencia local
explicita de SMTP para o canal mailto; ERS ainda precisa confirmar escopo.
Nao interpretar a formulacao ampla como autorizacao para implementar envio.

## Verificacoes e arquivos alterados

Pagina atual permanece PageHeader/PlaceholderCard. Nenhum mailto/copia/estado
real foi exercitado. Nao foram executados build/typecheck, instaladas suites,
testados browsers ou realizadas leituras/escritas de clipboard nesta etapa.

Checks e testes significativos ficam para implementacao: contrato de URI,
fonte compartilhada, corridas de copia, estados editoriais, navegacao/memoria,
ausencia de dados transmitidos e acessibilidade, com evidencias por criterio
em verification.md. Testes nao enviam mensagens institucionais nem sobrescrevem
clipboard do usuario automaticamente.

Somente `specs/015-suporte-email/validation.md` foi criado. Os quatro artefatos
e src permaneceram intocados; nenhuma tarefa foi concluida automaticamente.
Consolidar V015-01/V015-02 e dependencias aplicaveis antes de repetir validacao
e implementar trabalho dependente. Este relatorio nao aprova contato ativo,
copy, layout ou aceite funcional.

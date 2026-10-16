# Tasks: Suporte por e-mail

## Convencoes e status

- Base: spec.md e plan.md da 015; contratos de 002/007/012/013/014/016.
- Todas as tarefas estao pendentes. Esta lista nao comprova contato ativo,
  validacao editorial, consulta Figma, implementacao ou teste real de clipboard/mailto.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  `/spec:validar` sem bloqueios relevantes.
- Canal frontend sem formulario, SMTP, backend de envio ou rascunho de mensagem.
  Usuario revisa e envia no aplicativo externo; notificacoes da 014 ficam na 014.
- Referencia gesed.semtd@gmail.com depende de confirmacao institucional.
  Sintaxe e presenca no placeholder nao comprovam operacao.
- Consulta independente de Carta/diagnostico/CSV; alternativa manual sempre
  visivel. Abrir mailto nao comprova abertura, envio, recebimento ou leitura.
- Specs consumidoras existentes nao comprovam integracao entregue. Testes
  nao enviam mensagens reais nem sobrescrevem clipboard do usuario automaticamente.

## Fase 1 — Fontes e contratos

- [ ] **T001 — Inventariar contexto e integracoes reais**
  - Conferir ERS, manual textual, MVP, ADR-003, constitution e regras de IA.
  - Inventariar pagina/rota, shell/breadcrumb/links da 002, conteudo e testes;
    conferir provider da 007 e entradas/alternativas reais de 013/014.
  - Conferir utilitario neutro de clipboard da 012, se implementado, evitando
    duplicacao ou dependencia de Carta/tutorial para copiar contato.
  - Evidencia: fontes lidas e lacunas no implementation-plan;
    RF01/RF06, CA01/CA07/CA10/CA13.

- [ ] **T002 — Confirmar contato e disponibilidade editorial**
  - Manter `gesed.semtd@gmail.com` como endereco editorial confirmado pelo
    documento mestre; confirmar titularidade/atividade e equipe responsavel
    antes de mudar o estado operacional para ativo.
  - Fechar contatos.ts com ID estavel, equipe e endereco; estado
    pendente/ativo/pausado e aviso somente em canais.ts compartilhado com
    013/014/015. Nao duplicar estado nem evidencia interna no bundle.
  - Definir pausa confirmada, suspensao de mailto/copia como acoes principais
    e eventual endereco como referencia indisponivel, conforme texto validado.
  - Aplicar V015-02: em pendente, mostrar o endereco somente como referencia
    documentada com aviso e sem mailto/copia; em pausado, manter pagina/aviso/
    retorno e suspender acoes principais; em ativo, habilitar mailto e copia.
  - Definir retorno a ajuda e alternativa de agendamento quando operacional,
    sem prometer vagas/resposta imediata ou monitoramento em tempo real.
  - Nao enviar mensagem para verificar sem autorizacao. Contato pendente
    bloqueia entrega ativa e aceite de CA02, sem substituto inventado.
  - Dependencia: T001. Evidencia: contato/estado validados e coerentes com 013;
    RF02/RF07, CA02/CA09/CA12.

- [ ] **T003 — Validar copy e contrato de mailto**
  - Fechar titulo, finalidade, orientacoes, exemplos e avisos com equipe;
    recomendar nome/orgao/setor/contexto/resultado esperado no e-mail externo.
  - Identificar exemplos como ilustrativos; nao exigir anexos/Carta/CSV nem
    coletar dados no app. Orientar a nao enviar senhas/documentos/dados de cidadaos.
  - Confirmar proposta de destinatario fixo e assunto versionado
    Dúvida sobre a elaboração da Carta de Serviços, sem corpo predefinido.
  - Definir codificacao UTF-8 do parametro subject uma unica vez, sem codificar
    URI inteiro, cc/bcc/cabecalhos arbitrarios, valores da sessao ou parametros da URL.
  - Fechar Abrir aplicativo de e-mail e alternativa manual sempre visivel;
    nao detectar handler por timer nem anunciar envio/protocolo apos clique.
  - Dependencia: T002. Evidencia: copy validada e contrato de href;
    RF03–04/RF07, CA03–CA04/CA06/CA08/CA12.

- [ ] **T004 — Fechar copia, retorno e selecao manual**
  - Copiar apenas endereco exato da fonte unica por acao explicita, sem mailto,
    assunto, markup, leitura de clipboard ou consulta previa obrigatoria de permissao.
  - Definir idle/pending/copied/failed, trava imediata, identificador/revisao
    de contato e callbacks condicionados a tentativa atual/componente montado.
  - Endereço copiado somente apos promise resolvida; tratar contexto inseguro,
    API ausente/rejeicao com selecao manual e nova tentativa, sem fallback oculto.
  - Confirmar duracao candidata de cinco segundos; limpar/reiniciar timers,
    invalidar retorno ao mudar contato e manter erro ate nova tentativa ou mudanca.
  - Fechar texto selecionavel sem caracteres inseridos pela quebra visual,
    foco no botao e status acessivel local, sem sucesso baseado apenas em toast/cor.
  - Dependencias: T001–T003. Evidencia: contrato neutro reutilizavel com 012;
    RF05, CA04–CA05/CA08–CA09/CA11.

- [ ] **T005 — Consultar Figma e confirmar composicao**
  - Identificar via MCP frame proprio de suporte por e-mail no Design
    YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2; 169:495 da FAQ nao define esta pagina.
  - Consultar Make dVm7lEZdBFqOiiySWLWUqp, node 0:1; registrar contato,
    acoes, alternativa manual, orientacoes, retornos, assets e estados de copia/pausa.
  - Fechar foco, responsividade, endereco longo e tokens; atualizar mapa com
    frame confirmado. Referencia insuficiente permanece pendencia visual.
  - Resolver eventual formulario no prototipo contra ERS/spec antes de codigo,
    sem ampliar coleta/backend para reproduzir visual.
  - Dependencias: T002–T004. Evidencia: consultas e composicao no plano detalhado;
    CA11/CA13.

- [ ] **T006 — Criar plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 015-suporte-email`, consolidando T001–T005.
  - Definir contatos.ts, canais.ts, suporte-email.ts, arquivos/codigo base e contratos
    de href/copia/UI/navegacao, com fonte unica para texto/destinatario/clipboard.
  - Fechar integracao minima com 013, helper neutro da 012 e ausencia de
    imports/hooks/storage da Carta, formularios ou notificacao da 014.
  - Reutilizar suite frontend quando existente para contratos/corridas/
    navegacao; nao instalar framework apenas para testar labels estaticas.
  - Definir matriz de browsers/apps configurados/ausentes e documento de
    evidencias; verificacao manual nao envia mensagem institucional.
  - Dependencias: T001–T005. Evidencia: implementation-plan.md completo.

- [ ] **T007 — Validar documentos antes de codigo**
  - Executar `/spec:validar 015-suporte-email` contra ERS, MVP, constitution,
    Figma, contato/copy validados e contratos de 002/007/012–014/016.
  - Resolver divergencias de contato/estado, mailto, retorno de copia e layout;
    contato pendente nao recebe status ativo por existir no repositorio.
  - Dependencia: T006. Evidencia: validacao RF01–RF07/CA01–CA13 registrada.

## Fase 2 — Contato e acoes

- [ ] **T008 — Implementar fonte unica e conteudo versionado**
  - Criar src/content/support/contatos.ts e src/content/pages/suporte-email.ts
    com contrato de T002/T003, sem contato duplicado no JSX/013.
  - Derivar endereco exibido, mailto e copia do mesmo objeto; consumir estado/
    aviso somente de canais.ts, sem promessa de disponibilidade em tempo real.
  - Dependencia: T007 e comando `/spec:implementar`.
  - Evidencia: RF02/RF07, CA02/CA06/CA09/CA12–CA13.

- [ ] **T009 — Implementar link de contato e alternativa manual**
  - Entrega parcial em 2026-10-05: src/lib/mailto.ts e cinco testes isolados;
    nenhum link/contato integrado ou aplicativo aberto. Evidencias em
    verification.md; contato/assunto finais e interface continuam pendentes.
  - Construir anchor mailto com destinatario/subject de T003, ativado so por
    clique/teclado; nao interceptar como rota SPA nem abrir em effect/montagem.
  - Manter endereco selecionavel e instrucao de webmail/aplicativo antes e
    depois da tentativa, sem deteccao de abertura ou estado de mensagem enviada.
  - Nao exigir target=_blank, provedor especifico ou janela auxiliar; estado
    pausado suspende acao principal conforme T002 e mantem explicacao verdadeira.
  - Dependencia: T008. Evidencia: RF04–05, CA03–CA04/CA08/CA12.

- [ ] **T010 — Implementar copia de contato e estados locais**
  - Reusar/criar helper neutro copiarTexto sem importar feature de Carta;
    writeText recebe so endereco, diretamente no fluxo do gesto explicito.
  - Implementar trava/tentativas/timers de T004, sucesso apos resolucao,
    erro verdadeiro e tentativa posterior; callbacks antigos nao confirmam contato novo.
  - Limpar timers/desmontagem e manter selecao/foco; botao type=button com
    nome Copiar endereço de e-mail e status anunciado sem leitura de clipboard.
  - Dependencias: T008/T004. Evidencia: RF05, CA05/CA08–CA09/CA11.

- [ ] **T011 — Integrar pagina, estados e navegacao**
  - Substituir placeholder na rota existente, reutilizando shell/PageHeader,
    breadcrumb Inicio > Preciso de ajuda > Suporte por e-mail e titulo/foco da 002.
  - Compor contato, acoes, orientacoes/exemplo, alternativa manual e links
    reais para ajuda, agendamento e formulario; acesso direto tem destinos explicitos.
  - Integrar estado compartilhado da 013 quando necessario sem formulario,
    SMTP, rascunho ou leitura de Carta/diagnostico; backend da 014 nao bloqueia consulta.
  - Preservar provider/navegacao interna e nao limpar sessao em blur/
    visibilitychange ao abrir aplicativo externo.
  - Dependencias: T009–T010 e navegacao real da 002.
  - Evidencia: RF01/RF06, CA01/CA07/CA10/CA12–CA13.

- [ ] **T012 — Aplicar layout responsivo e acessibilidade**
  - Usar tokens/Inter, hierarquia e assets confirmados; endereco longo quebra
    visualmente sem inserir caracteres no dado e permanece selecionavel integralmente.
  - Manter ordem DOM/visual, foco/contraste, icones decorativos ocultos,
    controles em coluna quando necessario e feedback textual perto do botao.
  - Sem largura fixa/corte/overflow horizontal; links e copia por teclado,
    anuncios comedidos e nenhuma mudanca inesperada de foco.
  - Dependencia: T011/T005. Evidencia: CA11/CA13 e comparacao com Figma.

## Fase 3 — Verificacao e fechamento

- [ ] **T013 — Verificar contratos, corridas e jornada integrada**
  - Conferir destinatario e subject decodificado, codificacao unica e ausencia
    de corpo/headers arbitrarios/dados de sessao; montar pagina nao aciona mailto.
  - Alterar contato em fixture da fonte unica e comparar texto/link/copia;
    retorno anterior invalida, estado de pausa coincide com 013.
  - Cobrir ativo/pendente/pausado, acesso direto e troca durante pending;
    referencia/instrucao manual seguem somente a decisao editorial de T002.
  - Mockar clipboard resolve/reject/ausente/inseguro, duplo clique, mudanca
    durante pending, desmontagem e timers antigos; nenhum sucesso antecipado.
  - Conferir alternativa manual permanente e ausencia de anuncio de envio;
    simular URI sem abrir/enviar mensagem real nem gravar clipboard do usuario.
  - Com Carta em memoria, navegar ajuda/e-mail/formulario e comparar dados;
    sem valores nos hrefs/clipboard/requests, coleta ou dependencia do backend.
  - Verificar cobertura editorial/exemplos/limites e canais alternativos
    operacionais; destino placeholder fica pendente de aceite integrado.
  - Dependencias: T008–T012 e suite/navegacao/provider reais quando aplicavel.
  - Evidencia: CA01–CA10/CA12–CA13.

- [ ] **T014 — Verificar browsers, aplicativo externo e selecao acessivel**
  - Testar Chrome/Edge/Firefox/Safari conforme 016, com/sem aplicativo de e-mail
    configurado; conferir destinatario/assunto e encerrar sem concluir envio.
  - Verificar copia por gesto com texto sintetico/ambiente controlado e falha
    da API; selecao manual por teclado/toque continua funcional.
  - Percorrer breadcrumb/contato/acoes/retornos com teclado/leitor de tela,
    conferindo foco/status sem dependencia de icone/cor.
  - Testar 1440/1024/768/390/320 px e intermediarias, texto 200% e zoom/reflow,
    endereco longo/fonte fallback e contraste medido.
  - Registrar ambientes/versoes, resultados de abertura, defeitos/retestes;
    nao generalizar handler instalado para outros dispositivos. Ambiente ausente fica pendente.
  - Dependencias: T012–T013. Evidencia: CA03–CA05/CA11.

- [ ] **T015 — Executar checks e consolidar aceite**
  - Executar npm run typecheck, npm run build e suite compartilhada disponivel;
    conferir 013/012 se fonte/helper comuns forem alterados.
  - Criar quickstart.md com entradas, fonte do contato/estado, mailto, copia,
    alternativa manual e verificacao sintetica sem envio real.
  - Consolidar CA01–CA13, validacao institucional, Figma, ambientes,
    defeitos/retestes e pendencias no documento de verificacao de T006.
  - Revisar ausencia de SMTP/backend, formulario/anexos, segredos, rascunho,
    leitura/transmissao da Carta e promessas de abertura/envio/recebimento.
  - Dependencias: T013–T014. Evidencia: checks e resultados reais;
    contato/integracoes/ambientes pendentes impedem declarar aceite integral.

## Rastreabilidade

| Requisito/criterios | Tarefas principais |
| --- | --- |
| RF01, CA01 | T001, T003, T011, T013 |
| RF02, CA02/CA09 | T002, T008–T010, T013 |
| RF03, CA06 | T003, T008, T011, T013 |
| RF04, CA03/CA08 | T003, T009, T013–T014 |
| RF05, CA04/CA05 | T004, T009–T010, T013–T014 |
| RF06, CA07/CA10 | T001, T011, T013 |
| Acessibilidade/reflow, CA11 | T004–T006, T010, T012, T014 |
| Disponibilidade/copy, CA12 | T002–T003, T008–T009, T011, T013 |
| RF07/arquitetura/visual, CA13 | T001–T008, T011–T013, T015 |

## Proximo passo

Executar `/spec:plano-implementacao 015-suporte-email`, consolidando contato
validado, copy, mailto, compartilhamento com 013/012 e referencias Figma.
Depois executar `/spec:validar` antes de `/spec:implementar`.
Esta etapa criou somente tarefas.

# Tasks: Fluxo de ajuda

## Convencoes e status

- Base: spec.md e plan.md da 013; navegacao da 002 e contratos de 006–016.
- Todas as tarefas estao pendentes. Esta lista nao comprova validacao editorial,
  consulta Figma, implementacao ou operacao dos canais de atendimento.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  `/spec:validar` sem bloqueios relevantes.
- Entrada de consulta em /ajuda, sem login, coleta, leitura da Carta,
  backend obrigatorio ou persistencia das interacoes de FAQ.
- Escolher canal apenas navega. Agenda/solicitacao pertencem a 014 e contato/
  mailto/copia de endereco a 015; nao implementar esses mecanismos na entrada.
- Specs 014–016 agora existem; notas historicas e rotas placeholder nao
  comprovam canais entregues. Aceite integrado depende dos destinos reais.

## Fase 1 — Preparacao e contratos

- [ ] **T001 — Conferir fontes e navegacao existente**
  - Conferir ERS, fontes textuais, MVP, fluxos, constitution e regras de IA.
  - Inventariar AjudaPage, rotas, App/AppShell, links, breadcrumb, estilos e
    infraestrutura de testes; comparar implementacao com plano da 002.
  - Confirmar contrato /ajuda#duvidas-frequentes, hash/foco/historico e provider
    da 007 acima das rotas para preservar Carta/diagnostico sem leitura na ajuda.
  - Conferir entrega real de 006–012/014–015, registrando placeholders e lacunas.
  - Evidencia: fontes lidas e inventario no implementation-plan;
    RF01/RF04, CA01/CA05–CA07/CA13–CA14.

- [ ] **T002 — Consolidar cobertura e validar conteudo institucional**
  - Usar `src/content/pages/ajuda.ts` como fonte oficial, sem criar perguntas
    adicionais: titulo/tagline/subtitulo, CTA interno, quatro itens e secao de apoio.
  - Conferir literalmente as respostas sobre publico, outro orgao, modalidades
    digital/presencial e responsabilidade pela atualizacao da Carta.
  - Manter somente o encaminhamento versionado para a 014; nao reinserir card da
    015, retorno ao formulario ou os sete assuntos candidatos do plano anterior.
  - Validar redacao com equipe responsavel e registrar fontes/responsavel/data;
    sem promessa de recuperacao futura, importacao CSV, prazo, aprovacao ou
    suporte tecnico externo nao verificado. Nao anunciar placeholders como entrega.
  - Dependencia: T001. Evidencia: copy validada e cobertura registrada;
    RF01–02/RF05, CA02/CA12.

- [ ] **T003 — Fechar destinos e disponibilidade editorial dos canais**
  - Consolidar associacao fechada ID/destino: atendimento-agendado para
    /ajuda/atendimento-agendado e suporte-email para /ajuda/suporte-email.
  - Conciliar com 014/015 fonte unica de estado editorial pendente/ativo/pausado
    e aviso de indisponibilidade confirmada; isso nao representa vagas,
    monitoramento em tempo real ou resposta imediata.
  - Definir alternativa realmente operacional e se destino pausado permanece
    acessivel para explicacao; sem href #, botao inerte ou alternativa inventada.
  - FAQ renderiza sem consultar agenda, API de saude ou SMTP. Nao duplicar
    contato: se necessario visualmente, consumir fonte validada da 015.
  - Registrar estado pendente quando nao houver comprovacao de entrega; URL
    existente/endereco placeholder nao comprovam canal ativo.
  - Entrega parcial em 2026-10-05: src/content/support/canais.ts define mapa
    fechado de destinos e tipos compartilhados; configuracao editorial real,
    consumidores e regra do destino 014 pendente/pausado continuam pendentes.
  - Dependencias: T001–T002. Evidencia: contrato e estados documentados;
    RF03/RF05, CA03–CA04/CA11–CA13.

- [ ] **T004 — Consultar Figma e fechar comportamento da FAQ**
  - Consultar via MCP Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2,
    node 169:495; confirmar FAQ, dois canais e retorno ou localizar frame adicional.
  - Consultar Make dVm7lEZdBFqOiiySWLWUqp, node 0:1; registrar tokens,
    ordem/composicao, paineis, estados dos canais, assets e responsividade.
  - Confirmar associacao no mapa de telas; referencia insuficiente fica
    pendencia visual, sem inserir formulario/agenda para completar prototipo.
  - Escolher FAQ aberta ou expansiva conforme referencia; preferir details/
    summary se adequado. Accordion controlado exige button, aria-expanded e
    painel associado, com IDs estaveis e estado local sem persistencia.
  - Definir foco/teclado, links nos paineis e possibilidade de comparar
    respostas; FAQ nunca e requisito para escolher canal.
  - Dependencias: T002–T003. Evidencia: consultas, composicao e estrategia unica
    no plano detalhado; CA08–CA10/CA14.

- [ ] **T005 — Criar plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 013-fluxo-de-ajuda` consolidando T001–T004.
  - Definir conteudo tipado em src/content/pages/ajuda.ts, IDs/destinos,
    arquivos e codigo base de pagina/FAQ/cards/estilos, extraindo so o necessario.
  - Fechar breadcrumb, unico h1, regioes e ancora duvidas-frequentes com foco
    programatico conforme 002, scroll-margin e navegacao/hash/historico compartilhados.
  - Definir contrato editorial de indisponibilidade/alternativa e ausencia de
    hooks/storage/props da Carta ou diagnostico na pagina.
  - Reutilizar suite compartilhada quando existente e verificacoes manuais
    significativas; nao instalar framework apenas para contar perguntas/labels.
  - Fechar matriz de browsers da 016 e documento de evidencias, separando
    teste de links de aceite dos canais reais de 014/015.
  - Dependencias: T001–T004. Evidencia: implementation-plan.md completo.

- [ ] **T006 — Validar documentos antes de codigo**
  - Executar `/spec:validar 013-fluxo-de-ajuda` contra ERS, MVP, constitution,
    Figma, navegacao 002 e contratos de sessao/canais de 007/014/015.
  - Resolver divergencias de FAQ/copy, ancora, layout e estados editoriais;
    registrar integracoes futuras sem declarar operacao dos canais.
  - Dependencia: T005. Evidencia: validacao RF01–RF05/CA01–CA14 registrada.

## Fase 2 — Consulta e encaminhamento

- [ ] **T007 — Implementar conteudo tipado e destinos estaveis**
  - Criar ajuda.ts com titulo, introducao, escopo, FAQ, canais, retorno e
    avisos validados; IDs estaveis, links estruturados e associacao ID/href fechada.
  - Sem HTML concatenado/Markdown interpretado, contatos duplicados, dados
    de sessao ou promessas nao validadas. Conteudo separado da apresentacao.
  - Dependencia: T006 e comando `/spec:implementar`.
  - Evidencia: RF02/RF05, CA02/CA12/CA14.

- [ ] **T008 — Implementar FAQ e destino de ancora**
  - Renderizar estrategia unica de T004/T005 com perguntas/respostas integrais,
    links por assunto e secao id duvidas-frequentes, sem busca/chat/progresso.
  - FAQ expansiva usa controles/estados semanticos, teclado e foco coerentes;
    conteudo fechado nao recebe foco ativo, links abertos ficam acessiveis.
  - Aplicar foco e scroll-margin conforme shell, sem handler global concorrente
    de hash nem exigir abertura de paineis para acessar os canais.
  - Dependencia: T007/T005 e contrato de navegacao real da 002.
  - Evidencia: RF02, CA02/CA08–CA09 e ancora funcional de CA01.

- [ ] **T009 — Implementar cards dos canais e estados verdadeiros**
  - Renderizar dois canais com descricao e link de destino de T003, sem
    handlers de envio, mailto na entrada, formulario ou consulta a backend.
  - Aplicar aviso editorial validado em pendente/pausado e alternativa somente
    com outro canal ativo e entregue, mantendo FAQ e retorno. Com ambos nao
    ativos, nao inventar alternativa; nao exibir horarios/prazos ficticios.
  - Consumir contato/estado compartilhado da 015 somente se exigido pelo
    contrato visual; nao acoplar entrada a UI de suporte ou carregar Carta.
  - Dependencias: T007/T003. Evidencia: RF03/RF05, CA03–CA04/CA11–CA12;
    aceite operacional dos destinos permanece em T013.

- [ ] **T010 — Integrar pagina, shell e continuidade**
  - Substituir placeholders de AjudaPage por composicao de T005, reutilizando
    shell/PageHeader/breadcrumb Inicio > Preciso de ajuda, sem main/header/footer duplicados.
  - Reusar links internos da 002 com href real, modificadores, nova aba e
    preservacao da memoria; conferir pagina atual e titulo de documento pelo shell.
  - Oferecer retorno fixo /formulario-carta para acesso direto/inicio/retomada,
    sem history.back como unico destino ou leitura de sessao para decidir texto.
  - Confirmar /ajuda e /ajuda#duvidas-frequentes por entrada compartilhada,
    URL direta, recarga e voltar/avancar; ajustar so integracao necessaria.
  - Dependencias: T008–T009 e shell/navegacao reais da 002.
  - Evidencia: RF01/RF04, CA01/CA05–CA07/CA14, sem reinicializar providers.

- [ ] **T011 — Aplicar responsividade e acessibilidade**
  - Usar tokens/Inter e assets confirmados, unico h1 e hierarquia de regioes,
    links com destinos claros e icones decorativos ocultos.
  - Garantir foco/contraste, paineis por teclado e ancora fora do header sticky;
    cards viram uma coluna antes de comprimir leitura/acoes.
  - Textos/respostas crescem sem corte/ellipsis, com ordem DOM/visual coerente
    e ampliacao conforme 016; estados nao dependem so de cor/icone.
  - Dependencia: T010/T004. Evidencia: CA08–CA10/CA14 e comparacao com Figma.

## Fase 3 — Verificacao e fechamento

- [ ] **T012 — Verificar FAQ, navegacao e preservacao de sessao**
  - Conferir cobertura editorial dos sete assuntos e limites das respostas
    contra T002/contratos finais; numero de perguntas nao comprova conteudo correto.
  - Verificar destinos dos canais e retorno, FAQ expansiva quando adotada,
    links nas respostas e hash por link/acesso direto/recarga/voltar/avancar.
  - Com Carta parcial e diagnostico em memoria, navegar ajuda/canal/retorno
    e comparar estado preservado, incluindo storage indisponivel quando viavel.
  - Conferir ausencia de hooks/storage/coleta/envio na pagina, dados de sessao
    em URLs/mensagens e handlers de solicitacao ao escolher canal.
  - Testar configuracao pausada confirmada mantendo FAQ e alternativa correta;
    backend indisponivel da 014 nao bloqueia consulta nem fluxo de e-mail.
  - Cobrir pendente/ativo/pausado por canal e ambos nao ativos; alternativa
    apenas confirmada. Estado editorial nao e disponibilidade da agenda.
  - Usar suite compartilhada se disponivel e verificacao manual documentada;
    nao enviar e-mails ou criar solicitacoes reais para testar a entrada.
  - Dependencias: T007–T011 e infraestrutura de T005.
  - Evidencia: CA01–CA07/CA11–CA12/CA14.

- [ ] **T013 — Verificar encaminhamento para canais reais**
  - Apos entrega de 014/015, seguir links aos fluxos operacionais e conferir
    contratos de destino/estado editorial, distinguindo navegação de solicitacao.
  - Confirmar alternativa indicada como operacional; pausas e integracoes
    ausentes permanecem pendentes sem horarios ou status inventados.
  - Registrar evidencias separadas dos testes de href; nao implementar agenda,
    backend ou envio nesta feature para compensar destino placeholder.
  - Dependencias: T009/T012 e implementacoes reais de 014/015.
  - Evidencia: CA03–CA04/CA11/CA13; nao exige submissao real de atendimento.

- [ ] **T014 — Verificar teclado, leitura assistiva e reflow**
  - Percorrer header/footer, breadcrumb, FAQ, canais e retorno por teclado/
    leitor de tela; conferir estados expansivos, foco, links e ancora sticky.
  - Validar Chrome/Edge/Firefox/Safari conforme matriz da 016, incluindo mobile,
    1440/1024/768/390/320 px e intermediarias, texto 200% e zoom/reflow.
  - Usar respostas longas/fonte fallback, medir contraste e verificar ausencia
    de corte/sobreposicao/overflow horizontal, sem dependencia de hover.
  - Registrar ambientes/versoes, defeitos e retestes; ambiente ausente fica pendente.
  - Dependencias: T011–T012. Evidencia: CA08–CA10/CA14.

- [ ] **T015 — Executar checks e consolidar aceite**
  - Executar npm run typecheck, npm run build e suite compartilhada disponivel;
    verificar consumidores de navegacao/componentes comuns alterados.
  - Criar quickstart.md com entradas/ancora, consulta da FAQ, destinos,
    retorno, estados editoriais e verificacao sem envio de solicitacoes.
  - Consolidar resultados CA01–CA14, copy validada, Figma, ambientes,
    defeitos/retestes e dependencias no documento de verificacao de T005.
  - Revisar ausencia de coleta/backend obrigatorio, contatos duplicados,
    storage de FAQ/Carta, triagem automatica e promessas de reserva/envio/aprovacao.
  - Dependencias: T012–T014. Evidencia: checks e resultados reais vinculados;
    canais/ambientes pendentes impedem declarar aceite integral.

## Rastreabilidade

| Requisito/criterios | Tarefas principais |
| --- | --- |
| RF01, CA01 | T001–T002, T008, T010, T012 |
| RF02, CA02 | T002, T004, T007–T008, T012 |
| RF03, CA03–CA04 | T003, T009, T012–T013 |
| RF04, CA05/CA06/CA07 | T001, T005, T010, T012 |
| FAQ/teclado, CA08–CA09 | T004–T005, T008, T011, T014 |
| Responsividade, CA10 | T004, T011, T014 |
| Indisponibilidade, CA11 | T003, T009, T012–T013 |
| RF05, CA12 | T002–T003, T007, T009, T012, T015 |
| Canais integrados, CA13 | T001, T003, T013, T015 |
| Arquitetura/conteudo/visual, CA14 | T001, T004–T007, T010–T012, T014–T015 |

## Proximo passo

Executar `/spec:plano-implementacao 013-fluxo-de-ajuda`, consolidando FAQ/copy,
referencias Figma, ancora da 002, disponibilidade editorial e destinos de
014/015. Depois executar `/spec:validar` antes de `/spec:implementar`.
Esta etapa criou somente tarefas.

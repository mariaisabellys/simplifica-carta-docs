# Tasks: Responsividade e acessibilidade

## Convencoes e status

- Identificador adotado: 016-responsividade-acessibilidade, conforme spec,
  plan e roadmap. O comando responsabilidade-acessibilidade nao cria pasta duplicada.
- Base: spec.md e plan.md da 016, contratos das features 002–015 e constitution.
- Todas as tarefas estao pendentes. Esta lista nao comprova auditoria, consulta
  Figma, teste assistivo ou conformidade WCAG.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  `/spec:validar` sem bloqueios relevantes. A 016 nao cria rota ou modo separado.
- Cada feature continua responsavel por acessibilidade desde a implementacao;
  a 016 consolida contratos/correcoes sem absorver funcionalidades ausentes.
- Placeholders e ambientes indisponiveis permanecem pendentes, nao aprovados
  ou nao aplicaveis. Testes automaticos complementam verificacao manual.
- Evidencias usam dados sinteticos, agendamento/API/SMTP controlados e nenhum
  envio institucional real. Aplicativos externos ficam fora do escopo avaliado.

## Fase 1 — Escopo, criterios e referencias

- [ ] **T001 — Inventariar rotas, processos e consumidores**
  - Conferir ERS, fontes textuais, constitution, planos/verificacoes existentes
    e codigo real de App/AppShell/routes/FormField/estilos/index.html.
  - Inventariar home, exploracao, consulta da Carta, diagnostico/resultado,
    organizacao, formulario/validacao, previa/CSV, tutorial/copia, ajuda,
    agendamento e e-mail, com estados normais/falha e responsavel por feature.
  - Verificar agendamento da Carta (007): checkboxes Online/Presencial ou ambos, grupos
    de sistema/exibicao, URL e obrigatoriedade condicionais; controles ocultos fora da
    ordem de foco e mensagens inativas removidas, com valores preservados na sessao.
  - Conferir rota de exploracao e documentos/entregas de 005/017; registrar
    ausencia sem implementar funcionalidade de outra spec nesta etapa.
  - Mapear consumidores de links, foco, tokens, campos e mensagens comuns.
  - Evidencia: inventario implementado/placeholder/pendente no plano detalhado;
    RF01, CA01/CA14.

- [ ] **T002 — Conciliar meta WCAG e matriz de criterios**
  - Confirmar proposta WCAG 2.2 A/AA contra ERS e mencoes anteriores a 2.1 AA,
    registrando decisao sem alegacao juridica/certificacao.
  - Planejar matriz por criterio A/AA, pagina/processo e estado; revisar todos
    os criterios pertinentes, sem aprovar grupos por uma observacao unica.
  - Definir resultado pendente/atendido no escopo/falhou/nao aplicavel com
    justificativa; ausencia de ambiente nao e nao aplicabilidade.
  - Distinguir preferencia de projeto de alvos principais 44 px do minimo AA
    aplicavel, suas excecoes/espacamento; separar checklist 2.1 se ainda exigido.
  - Dependencia: T001. Evidencia: meta e estrutura de avaliacao consolidadas;
    RF05/RF08, CA07/CA14.

- [ ] **T003 — Definir ambientes, fixtures e evidencias**
  - Confirmar Windows Chrome/Edge/NVDA e Firefox, macOS Safari, iOS Safari/
    VoiceOver e Android Chrome; TalkBack amplia cobertura quando disponivel.
  - Definir versoes/dispositivos reais, pelo menos leitura assistiva desktop
    e movel; emulacao nao substitui leitor/browser/teclado virtual real.
  - Definir 1440/1024/768/390/320 px e intermediarias, retrato/paisagem,
    texto 200%, zoom/reflow 400% em referencia de 1280 px e espacamento de texto.
  - Preparar plano de massa sintetica: textos/listas extensos, endereco longo,
    falhas de fonte/imagem/rede/storage/clipboard e estados da API/SMTP de teste.
  - Definir registro de criterio/CA/rota/estado/dono/metodo/ambiente/commit/data/
    resultado/evidencia/defeito; dados pessoais e segredos nunca entram nas evidencias.
  - Dependencias: T001–T002. Evidencia: matriz viavel com responsaveis pelas
    execucoes indisponiveis; RF08, CA12–CA15.

- [ ] **T004 — Consultar Figma dos contextos afetados**
  - Consultar via MCP frames pertinentes do Design YaVUdqYa3boHpvGrxf4ZJ5,
    pagina 167:2, e Make dVm7lEZdBFqOiiySWLWUqp, node 0:1.
  - Usar mapa atual e identificar frames faltantes; nao presumir frame proprio
    da 016 ou deduzir reflow/teclado apenas da referencia desktop.
  - Registrar tokens, estados, composicao, assets e adaptacoes necessarias
    quando referencia visual criar barreira, preservando informacao/hierarquia.
  - Dependencias: T001–T003. Evidencia: fontes/nodes e divergencias no plano;
    CA15. Referencia insuficiente fica pendencia antes de ajustes visuais.

- [ ] **T005 — Fechar contratos compartilhados de navegacao e formularios**
  - Conciliar com 002 titulo por rota, skip link/main, foco/scroll de rota,
    historico/hash e fallback; preservar modificadores/nova aba/download/mailto.
  - Definir foco de etapas, remocao/reordenacao e fechamento no componente
    responsavel, sem tabIndex positivo ou handlers de foco concorrentes.
  - Conciliar FormField com 007/008/014: IDs estaveis de label/ajuda/erro,
    aria-describedby explicito e atributos no controle sem clone inferido de children.
  - Definir grupos/obrigatoriedade/autocomplete aplicavel, resumo apos acao
    explicita e retorno a parte/campo; sugestao nao gera aria-invalid.
  - Definir mensagens/live regions e paineis nativos/controlados sem anuncios
    duplicados; sem modal novo apenas para cumprir criterio.
  - Dependencias: T001–T004. Evidencia: contratos e donos no plano detalhado;
    RF03–04/RF06–07, CA04–CA06/CA08–CA11.

- [ ] **T006 — Criar plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 016-responsividade-acessibilidade`.
  - Consolidar T001–T005, arquivos/codigo base, contratos e correcoes previstas,
    priorizando impedimentos de processo e problemas compartilhados.
  - Definir accessibility-matrix.md, verification.md e pasta de evidencias;
    estes arquivos receberao resultados reais durante verificacao.
  - Definir axe-core em infraestrutura de browser/suite compartilhada adequada,
    comandos e estados a varrer; nao instalar dependencias nesta etapa.
  - Fechar regressao por consumidor, limites de escopo e criterio de reteste;
    nao introduzir roteador/framework visual/widget de acessibilidade.
  - Dependencias: T001–T005. Evidencia: implementation-plan.md completo.

- [ ] **T007 — Validar documentos antes de codigo**
  - Executar `/spec:validar 016-responsividade-acessibilidade` contra ERS,
    constitution, meta tecnica, Figma e contratos finais das features afetadas.
  - Resolver divergencias de foco, campos, tokens e semantica de estados sem
    mudar regras de negocio ou tratar funcionalidades ausentes como verificadas.
  - Dependencia: T006. Evidencia: validacao RF01–RF08/CA01–CA15 registrada.

## Fase 2 — Avaliacao e correcoes

- [ ] **T008 — Criar matriz e registrar avaliacao inicial**
  - Criar accessibility-matrix.md/verification.md conforme T002/T003/T006,
    inicialmente pendentes, com criterio por contexto e nao aplicabilidade justificada.
  - Avaliar implementacoes reais e registrar defeitos com reproducao/impacto/
    evidencia/dono; nao pressupor que pontos suspeitos do plan sao falhas comprovadas.
  - Executar varredura automatizada definida nos estados abertos/erros/resultados,
    complementada por inspecao manual; zero alertas nao aprova processo.
  - Dependencia: T007 e comando `/spec:implementar` para correcoes/configuracao.
  - Evidencia: baseline reproduzivel, RF01/RF08, CA01/CA13–CA14.

- [ ] **T009 — Corrigir shell, links, semantica e foco**
  - Implementar correcoes comprovadas no dono compartilhado: titulo por rota,
    idioma/viewport adequados, skip link/main, pagina atual e landmarks sem duplicacao.
  - Consolidar navegacao interna sem reload/perda de memoria e comportamento
    nativo de links especiais/modificadores, com foco unico de rota/hash/historico.
  - Conferir header sticky e fallback de alvo inexistente, sem foco em elemento
    desmontado ou deslocamento a cada re-render; unico h1 por pagina.
  - Dependencias: T008/T005 e navegacao real da 002.
  - Evidencia: RF03–04, CA04–CA06, regressao nos consumidores.

- [ ] **T010 — Corrigir reflow, preferencias e tokens medidos**
  - Corrigir grades/minimos/filhos com min-width:0, quebra de textos e altura
    natural onde baseline comprovar barreiras; nao mascarar corte com overflow global.
  - Medir combinacoes reais/alpha/fundos de texto, controles e foco nos estados;
    ajustar token semantico comum quando necessario e registrar ratios/excecoes.
  - Conferir alvos/espacamento, hover/foco, movimento reduzido, fonte fallback,
    espacamento, orientacao e teclado virtual sem bloquear zoom ou apagar dados.
  - Adaptar sticky/overlays no contexto afetado sem offset fixo universal;
    nao truncar Carta ou reordenar visual em desacordo com DOM.
  - Dependencias: T008/T004. Evidencia: RF02/RF05, CA02–CA03/CA07/CA12/CA15.

- [ ] **T011 — Corrigir campos, erros, listas e selecao de horario**
  - Aplicar contrato FormField de T005 nos consumidores implementados,
    incluindo labels/ajuda/erros/grupos e finalidade dos campos de atendimento.
  - Corrigir resumo/retorno a campo em parte oculta, sugestoes separadas de
    erros e preservacao de dados, sem anuncio a cada tecla.
  - Conferir IDs/nome contextual/foco de adicionar/remover/mover listas e
    alternativa ao arraste; horario deve operar sem calendario visual obrigatorio.
  - Dependencias: T008–T009/T005 e controles reais de 007/008/014.
  - Evidencia: RF06, CA08–CA09; features ausentes permanecem pendentes.

- [ ] **T012 — Corrigir paineis, assets e estados dinamicos**
  - Corrigir menu/FAQ/paineis existentes com nome/papel/estado, teclado e
    conteudo oculto fora do foco; modal existente exige entrada/fechamento/retorno.
  - Revisar alternativas textuais, imagens decorativas e instrucao de tutorial
    independente de asset, preservando conteudo quando imagem nao carrega.
  - Corrigir status/processamento/erros/recuperacao com texto e anuncios moderados,
    sem foco e alert simultaneos redundantes ou botao inerte como unica explicacao.
  - Preservar retorno verdadeiro: copia, download iniciado, registro, resultado
    incerto e notificacao pendente seguem 010/012/014/015, sem sucesso externo inventado.
  - Dependencias: T008–T009/T005 e componentes reais das features responsaveis.
  - Evidencia: RF03–04/RF07, CA06/CA10–CA12.

## Fase 3 — Processos completos e fechamento

- [ ] **T013 — Verificar teclado e leitura assistiva em processos completos**
  - Percorrer consulta/diagnostico/formulario/validacao/previa/exportacao/
    tutorial/copia/FAQ/agendamento/e-mail com combinacoes reais de T003.
  - Conferir titulos/idioma/landmarks/ordem/listas/imagens/nomes/estados e
    operacoes sem mouse, armadilhas ou envio causado por foco/selecao.
  - Testar rota/historico/hash, menu/painel, retorno a erros, remocao/movimento
    de itens e selecao de horario; foco sobrevive e nao fica encoberto.
  - Dependencias: T009–T012 e fluxos reais de cada feature.
  - Evidencia: CA04/CA05/CA06/CA08/CA09/CA13, desktop e movel;
    emulacao/screenshot nao substituem execucao assistiva.

- [ ] **T014 — Verificar layout, contraste, toque e preferencias**
  - Executar larguras/intermediarias/orientacoes de T003, distinguindo viewport,
    texto 200%, zoom/reflow 400% e espacamento de texto.
  - Usar dados extensos, fonte/imagem indisponiveis, movimento reduzido,
    hover/foco e teclado virtual, incluindo sticky/overlays e campos focados.
  - Registrar medidas reais de contraste texto/nao textual/foco e alvos/
    espacamento nos estados, excecoes por criterio e preferencia de 44 px.
  - Confirmar valores/acoes integrais sem corte, perda, sobreposicao ou scroll
    horizontal da pagina; resize/orientacao nao reinicializam formulario.
  - Dependencias: T010–T012. Evidencia: CA02/CA03/CA07/CA12/CA15.

- [ ] **T015 — Verificar falhas, mensagens e recuperacao acessivel**
  - Exercitar storage bloqueado/recuperacao parcial, copia recusada, download
    falho, agenda vazia/falha/conflito, envio incerto e notificacao pendente.
  - Conferir nome/estado/retorno/alternativa, ausencia de foco inesperado e
    anuncio repetitivo; informacao essencial continua consultavel apos timers.
  - Confirmar Carta parcial livre para tutorial/copia, gate apenas conforme
    negocio e mensagens sem prova falsa de salvamento/envio/publicacao externa.
  - Agendamento usa API/SMTP de teste e dados sinteticos; nao criar registros
    institucionais reais. Falhas nao perdem dados preservados pelo contrato.
  - Dependencias: T011–T013 e estados reais de 007–015.
  - Evidencia: CA08/CA10/CA11/CA13.

- [ ] **T016 — Corrigir defeitos e verificar regressao dos consumidores**
  - Priorizar impedimentos de processo/defeitos compartilhados, corrigindo no
    componente responsavel e registrando adaptacoes ao Figma quando necessarias.
  - Retestar criterio/contexto que falhou e consumidores afetados; manter
    resultado vinculado ao commit/ambiente, sem reabrir suite sem justificativa.
  - Atualizar matriz com resultados reais e pendencias/donos das features ou
    ambientes ausentes; nao absorver implementacao de 005/017 ou outros placeholders.
  - Dependencias: T013–T015. Evidencia: defeitos corrigidos/retestados,
    RF01/RF08, CA01/CA13/CA14/CA15.

- [ ] **T017 — Executar checks e consolidar prontidao transversal**
  - Executar typecheck/build, suite adequada e varreduras dos estados afetados
    conforme T006; verificar criterios A/AA aplicaveis por pagina e processo.
  - Criar quickstart.md com ambientes, fixtures, comandos e roteiros manuais
    de teclado/leitura/reflow/falhas; evidencias sem dados pessoais/segredos.
  - Consolidar verification.md e accessibility-matrix.md com escopo/versao/
    ambientes/resultados/defeitos/retestes, consultas Figma e limitacoes explicitas.
  - Vincular verificacao final de rotas/assets ao ambiente da 017 quando
    entregue; ausencia de deploy/fluxos/ambientes permanece pendencia.
  - Conferir ausencia de widget/modo separado, novas regras de negocio ou
    dados alterados para caber no layout. Nao declarar conformidade global
    com processos/criterios pendentes nem certificacao juridica.
  - Dependencias: T016. Evidencia: CA01–CA15 com resultados rastreaveis
    e conclusao limitada ao escopo efetivamente verificado.

## Rastreabilidade

Entrega parcial em 2026-10-05: guard compartilhado de links integrado ao
AppShell, preservando cliques modificados/download/target/externos. Quatro
testes isolados, typecheck/build e matriz inicial registrados em verification.md.
T009 ainda parcial: skip link, titulo/foco/hash e navegacao da 002 pendentes.
Nenhuma checkbox concluida; matriz nao representa auditoria WCAG completa.

| Requisito/criterios | Tarefas principais |
| --- | --- |
| RF01, CA01 | T001, T008, T016–T017 |
| RF02, CA02/CA03 | T003, T010, T014 |
| RF03, CA06 | T005, T009, T012–T013 |
| RF04, CA04/CA05 | T005, T009, T011–T013 |
| RF05, CA07 | T002–T004, T010, T014 |
| RF06, CA08/CA09 | T005, T011, T013, T015 |
| RF07, CA10/CA11 | T005, T012, T015 |
| Preferencias/assets, CA12 | T003, T010, T012, T014 |
| RF08, CA13/CA14 | T001–T003, T006–T008, T013–T017 |
| Referencias/evidencias, CA15 | T003–T004, T010, T014, T016–T017 |

## Proximo passo

Executar `/spec:plano-implementacao 016-responsividade-acessibilidade`,
consolidando inventario, meta WCAG, matriz real de ambientes, criterios,
contratos compartilhados e referencias Figma. Depois executar `/spec:validar`
antes de `/spec:implementar`. Esta etapa criou somente tarefas.

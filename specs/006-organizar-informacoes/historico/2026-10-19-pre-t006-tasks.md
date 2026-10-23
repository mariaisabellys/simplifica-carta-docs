# Tasks: Organizar informacoes

> **Status em 6 de outubro de 2026:** estas tarefas refletem o contrato antigo
> de dez assuntos estaticos. Devem ser replanejadas para os tres topicos e 13
> informacoes do conteudo versionado, incluindo marcacao, progresso e
> orientacoes expansiveis. Nenhuma tarefa conflitante deve ser executada antes
> dessa reconciliacao.

## Convencoes e status

- Base: spec.md e plan.md da 006. Executar conforme dependencias abaixo.
- Todas as tarefas permanecem desmarcadas: criar esta lista nao conclui
  consulta visual, validacao editorial, implementacao ou testes.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  `/spec:validar` sem bloqueios relevantes.
- Cada tarefa deve produzir evidencia verificavel; registrar pendencia quando
  depender de feature ou ambiente ainda indisponivel.
- Escopo: pagina consultiva, sem checklist interativo, coleta, storage,
  leitura da Carta, backend ou controle de progresso.
- Notas de ausencia de 007/013/016 na spec e no plano sao historicas: essas
  specs agora existem, mas sua existencia nao comprova funcionalidades entregues.

## Fase 1 — Preparacao e decisoes

- [ ] **T001 — Conferir contratos e dependencias no repositorio**
  - Revisar App, AppShell, ButtonLink, PageHeader, rotas e contratos de 002/003.
  - Conferir entrada da etapa 2, destinos de formulario/ajuda e estado da 005.
  - Conferir 007/008: tipo, sistema, campos externos condicionais e obrigatoriedade,
    sem ampliar os dez assuntos nem alterar schema nesta feature.
  - Arquivos: fontes existentes e registro no implementation-plan da 006.
  - Evidencia: inventario de componentes entregues, lacunas e donos; distinguir
    pagina pronta de placeholder. Cobertura: RF01/RF03/RF05, CA01–07.

- [ ] **T002 — Identificar e consultar referencia visual da 006**
  - Consultar via MCP Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`;
    identificar frame proprio de organizar informacoes.
  - Nao usar `575:483` da exploracao como layout desta pagina.
  - Consultar Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.
  - Registrar hierarquia, lista, acoes, tokens, estados, assets e responsividade;
    resolver divergencias se houver campos, upload ou checklist interativo.
  - Atualizar mapa Figma e prever figmaNodeId somente com frame confirmado.
  - Dependencia: T001. Evidencia: consultas e decisoes no implementation-plan.
    Sem referencia suficiente, registrar bloqueio visual. Cobertura: CA12.

- [ ] **T003 — Consolidar e validar a redacao de levantamento**
  - Conciliar fontes locais, ERS e contratos de 007/008; registrar fontes
    efetivamente lidas e pontos ainda nao confirmados.
  - Preparar introducao e dez assuntos na ordem da spec, incluindo criterios
    de acesso, nome popular opcional dentro do assunto Nome do servico e
    orientacao de como levantar agendamento.
  - Distinguir desconhecido de gratuito/sem exigencia; nao apresentar todos
    os assuntos como obrigatorios ou equivalentes homologados da plataforma.
  - Validar linguagem simples, acentuacao, exemplos ilustrativos e limites
    de orientacao/aprovacao/publicacao com equipe responsavel.
  - Dependencia: T001. Evidencia: copy e registro de validacao; ausencia de
    validacao permanece pendente. Cobertura: RF02–04/RF06, CA03–04/CA11.

- [ ] **T004 — Criar o plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 006-organizar-informacoes`.
  - Consolidar T001–T003, arquivos, conteudo tipado, composicao, contratos de
    links/breadcrumb/foco, CSS, assets confirmados e estrategia de verificacao.
  - Definir reuso de componentes; extrair item local somente se justificar.
  - Definir suite existente ou roteiro manual sem instalar framework apenas
    para reproduzir o array editorial. Registrar ambientes viaveis da 016.
  - Dependencias: T001–T003. Evidencia: implementation-plan.md completo;
    pendencias relevantes resolvidas antes de iniciar codigo.

- [ ] **T005 — Validar documentos antes da implementacao**
  - Executar `/spec:validar 006-organizar-informacoes`.
  - Comparar spec, plan, tasks e implementation-plan com ERS, MVP,
    constitution, Design e Make; conferir CA01–CA12 e fora de escopo.
  - Registrar resultado e resolver divergencias bloqueantes.
  - Dependencia: T004. Evidencia: validacao documental sem bloqueios de codigo.

## Fase 2 — Implementacao autorizada em etapa posterior

- [ ] **T006 — Criar conteudo editorial tipado**
  - Criar `src/content/pages/organizar-informacoes.ts` conforme contrato fechado.
  - Usar IDs estaveis, array na ordem 1–10, introducao, confirmacao com setor,
    publicacao manual, exemplos opcionais identificados e acoes tipadas.
  - Nao incluir paths tecnicos na copy nem importar estado/schema da Carta.
  - Dependencia: T005 e comando `/spec:implementar`.
  - Evidencia: conteudo separado da apresentacao e cobertura editorial revisada.
    Cobertura: RF02/RF03/RF06, CA03–04/CA10–11.

- [ ] **T007 — Compor pagina de consulta sem estado de dominio**
  - Substituir PlaceholderCard em `src/pages/OrganizarInformacoesPage.tsx`.
  - Reutilizar PageHeader quando adequado; um h1, secao h2 e lista ol/li,
    com titulos de assunto coerentes e todos os textos essenciais visiveis.
  - Renderizar apenas conteudo da pagina, sem main/header/footer duplicados.
  - Nao adicionar checkboxes, progresso, requisito de leitura, effects de
    inicializacao, API, anexos ou armazenamento.
  - Dependencia: T006. Evidencia: dez assuntos integrais, na ordem correta,
    consultaveis sem acao previa. Cobertura: RF02–04, CA03–04/CA10–11.

- [ ] **T008 — Integrar breadcrumb e destinos internos**
  - Usar Inicio > Organizar informações, pagina atual identificada, acao
    Preencher Carta para `/formulario-carta` e Preciso de ajuda para `/ajuda`.
  - Reutilizar acao de ajuda do shell se ja existir; evitar duplicacao inutil.
  - Usar contrato de links da 002: href real, navegacao interna preservando
    memoria, modificadores/nova aba, historico e foco compartilhado.
  - Manter rota, specId e aria-current; adicionar frame somente conforme T002.
  - Se navegacao/breadcrumb comum estiver ausente, registrar ajuste minimo
    e responsabilidade da 002 no plano antes de editar; sem router paralelo.
  - Dependencias: T007 e contrato compartilhado confirmado em T001/T004.
  - Evidencia: destinos funcionais sem gate ou reinicio da Carta; cobertura
    RF01/RF05, CA01/CA05–08. Integracoes ainda placeholders ficam pendentes.

- [ ] **T009 — Aplicar estilos responsivos e acessiveis**
  - Usar estilos locais ou escopo no globals.css conforme plano detalhado.
  - Reutilizar tokens e Inter; adicionar token somente com necessidade confirmada.
  - Preservar sequencia visual/DOM, coluna unica em largura estreita, quebra
    de texto e altura natural; sem CSS columns que altere leitura.
  - Conferir contraste/foco reais e icones decorativos; usar assets locais
    apenas quando inventariados, sem dependencias de URLs temporarias.
  - Dependencias: T007–T008. Evidencia: layout aderente a referencia registrada,
    legivel com textos longos e ampliacao. Cobertura: CA08–09/CA12.

## Fase 3 — Verificacao e fechamento

- [ ] **T010 — Verificar entradas, leitura e navegacao**
  - Testar acesso direto, recarga, header, breadcrumb, voltar/avancar e acoes,
    sem diagnostico, login ou Carta. Conferir etapa 2 real da 003 quando pronta.
  - Verificar dez assuntos, exemplos, desconhecidos e ausencia de progresso.
  - Conferir acesso livre ao formulario/ajuda e ausencia de chamadas/coleta.
  - Dependencias: T008–T009. Evidencia: roteiro e resultados por CA01–05,
    CA07/CA10–11; CA02 pendente se 003 nao estiver entregue.
  - Fallback de URL direta publicado depende do deploy: validar em ambiente
    publicado quando disponivel, sem confundir sucesso no Vite com publicacao.

- [ ] **T011 — Verificar preservacao integrada da Carta**
  - Preencher Carta representativa em 007 com textos, listas e escolhas;
    visitar 006 e retornar por link e historico, comparando todos os valores.
  - Conferir ausencia de leitura/escrita de Carta pela 006 e manutencao do
    registro da sessao quando existir; incluir modo em memoria sem storage.
  - Nao inserir persistencia para compensar links com recarga.
  - Dependencias: T008 e formulario/provider reais da 007.
  - Evidencia: CA06 executado sem perda de dados; enquanto 007 for placeholder,
    marcar verificacao pendente e nao declarar aceite integrado.

- [ ] **T012 — Verificar teclado, leitura assistiva e reflow**
  - Percorrer links por teclado; conferir foco de rota, titulos, lista,
    breadcrumb, nomes de destinos e ordem com leitor de tela.
  - Testar 1440/1024/768/390/320 px e larguras intermediarias, texto 200%,
    reflow/zoom conforme 016, fonte fallback e texto longo sem corte/overflow.
  - Registrar navegador, sistema, tecnologia assistiva, versoes e resultados;
    ambiente indisponivel fica pendente. Medir contraste dos estados usados.
  - Dependencia: T009. Evidencia: CA08–09 e verificacao visual CA12; defeitos
    reproduzidos, corrigidos e retestados, sem declarar auditoria global.

- [ ] **T013 — Executar checks tecnicos adequados**
  - Executar `npm run typecheck` e `npm run build`.
  - Rodar suite existente quando aplicavel aos contratos de navegacao e
    preservacao; usar roteiro manual definido se infraestrutura nao existir.
  - Se componente compartilhado mudar, verificar seus consumidores afetados.
  - Dependencias: T006–T009; repetir apos correcoes que afetem resultados.
  - Evidencia: comandos, resultados e limites registrados, sem testes que
    apenas espelhem os dez itens do array.

- [ ] **T014 — Consolidar evidencias e pendencias de aceite**
  - Registrar resultado por CA01–CA12, consultas visuais e validacao editorial
    em verification.md ou documento de verificacao adotado no plano detalhado.
  - Referenciar defeitos, retestes e dependencias abertas de 003/005/007/013/deploy.
  - Conferir ausencia de ampliacao de escopo e manter checkboxes vinculados
    a evidencia; pendencias de integracao impedem declarar aceite integral.
  - Dependencias: T010–T013; registrar explicitamente qualquer tarefa bloqueada.
  - Evidencia: revisao final coerente com spec/plano e estado real da feature.

## Rastreabilidade

| Requisito/criterio | Tarefas principais |
| --- | --- |
| RF01, CA01–02 | T001, T008, T010 |
| RF02, CA11 | T003, T006–T007, T010 |
| RF03, CA03–04 | T003, T006–T007, T010 |
| RF04, CA05/CA10 | T006–T008, T010 |
| RF05, CA06–07 | T008, T010–T011 |
| RF06, CA10 | T003, T006, T014 |
| Acessibilidade/reflow, CA08–09 | T004, T008–T009, T012 |
| Referencias visuais, CA12 | T002, T004–T005, T009, T012, T014 |

## Proximo passo

Executar `/spec:plano-implementacao 006-organizar-informacoes`, consolidando
T001–T004 e suas evidencias. Depois executar `/spec:validar` antes de
`/spec:implementar`. Esta etapa criou somente a lista de tarefas.

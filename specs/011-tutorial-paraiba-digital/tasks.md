# Tasks: Tutorial Paraiba Digital

> **Contrato de etapa consolidado:** testes futuros devem cobrir query,
> histórico, foco e parâmetros desconhecidos conforme o contrato arquitetural.

> **Baseline v3 — 16 de outubro de 2026:** a etapa 4 consome a Carta v3 sem
> manter estado editável próprio.

## Convencoes e status

- Base: spec.md e plan.md da 011; contratos de 007–010 e integracao com 012.
- Todas as tarefas estao pendentes. Esta lista nao comprova consulta Figma,
  fluxo externo verificado, validacao editorial, implementacao ou testes.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  `/spec:validar` sem bloqueios relevantes.
- Tutorial consultavel sem Carta, diagnostico, previa, CSV ou login no app.
  Cadastro, revisao e acoes oficiais continuam manuais na plataforma externa.
- A 011 controla conteudo/composicao; a 012 controla seletores, clipboard,
  feedback e alternativa manual. Nao duplicar mecanismo de copia.
- Portal publico localizado nao comprova URL administrativa, menus, permissoes
  ou publicacao. Figma orienta apresentacao, sem validar fluxo operacional.
- Specs 013/016 agora existem; notas historicas e placeholders nao comprovam
  ausencia de documentacao atual nem entrega funcional.

## Fase 1 — Fontes e contratos

- [ ] **T001 — Inventariar contexto e integracoes reais**
  - Conferir ERS, fontes textuais, MVP, fluxos, constitution e regras de IA.
  - Inventariar TutorialParaibaDigitalPage, conteudo, rota, shell, breadcrumb,
    links/foco da 002, entrada da 003 e destino da 009/010.
  - Conferir provider/decoder v2 da 007, componentes/seletores reais da 012 e
    ajuda da 013; distinguir contratos planejados de funcionalidades entregues.
  - Evidencia: fontes lidas, arquivos e lacunas no implementation-plan;
    RF01/RF05/RF07, CA01/CA05–CA07/CA15–CA16.

- [ ] **T002 — Verificar fluxo operacional e enderecos oficiais**
  - Obter manual oficial ou material institucional autorizado/validado para
    o perfil de servidor responsavel pelo cadastro, conciliando com ERS.
  - Verificar acesso administrativo, permissoes, caminho do cadastro, nomes
    dos campos e acoes; distinguir salvar, enviar, analisar e publicar apenas
    quando esses estados forem comprovados.
  - Registrar referencia, data de verificacao, perfil, variante da interface
    e evidencia por instrucao; confirmar links e canais externos pertinentes.
  - Se interface administrativa nao for publica, usar material institucional;
    nao coletar credenciais, contornar permissoes ou criar cadastro real.
  - Registrar trechos nao verificados como pendentes documentais. Nao usar URL
    publica como acesso administrativo confirmado nem inventar menus.
  - Dependencia: T001. Evidencia: registro de fontes e fluxo verificado;
    RF02–03/RF06, CA02–CA04/CA11/CA15.

- [ ] **T003 — Mapear dados locais e campos externos**
  - Criar matriz com campo local, nome externo verificado, tela/parte, modo
    de entrada, diferencas, fonte e data, cobrindo os 17 campos locais da 007.
  - Incluir nome popular, agendamento e como agendar; distinguir correspondencia
    confirmada, informacao complementar e campo sem equivalente identificado.
  - Cobrir os cinco cenarios da 007 CA19–CA23 e obrigatoriedade CA24, com valores
    externos preservados na sessao e nao transferidos quando inativos.
  - Explicar listas/opcoes com entrada separada e revisao apos colar; nao
    presumir que multiline preenche todos os itens externos.
  - Separar obrigatoriedade local da externa; nao inventar valores, coletar
    novos campos ou afirmar equivalencia homologada/importacao automatica CSV.
  - Dependencia: T002. Evidencia: matriz completa com lacunas identificadas;
    RF04, CA08–CA09.

- [ ] **T004 — Conciliar explicitamente o contrato da 012**
  - Verificar a conciliacao documental ja realizada da 012 com 007/009: orientacaoAgendamento,
    null sem copia de Nao e false copiavel somente como resposta explicita
    no modelo migrado. Remover inferencia baseada em outros campos preenchidos.
  - Fechar listas parciais sem inventar tipo/classificacao e definicao de
    Carta com conteudo, excluindo IDs/defaults como prova de preenchimento.
  - Definir CartaTransferFieldId fechado, estado/texto/ID do seletor e contrato
    de CartaCopyFields ou equivalente, com fonte unica do provider.
  - Definir propriedade dos componentes para evitar dependencia circular:
    passos referenciam campos por ID; a 011 nao reimplementa clipboard.
  - Registrar divergencias remanescentes nos documentos afetados e verificar
    consistencia antes de componentes conjuntos; conciliacao documental nao
    comprova entrega ou encerra pendencias da validacao da 012.
  - Dependencias: T001/T003. Evidencia: contrato/documentacao conciliados;
    RF04–05, CA06–CA10.

- [ ] **T005 — Consultar pagina e variantes visuais do tutorial**
  - Consultar via MCP Figma Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2,
    os nodes `564:635`, `564:730`, `564:852`, `564:980`, `564:1232` e
    `564:1357`; nao usar 575:483 da entrada da 003.
  - Tratar `564:635` como pagina no estado inicial e os outros cinco como
    variantes da mesma pagina; nao criar rotas ou paginas duplicadas.
  - Comparar cada frame com `src/content/tutorial/paraiba-digital.ts`; adaptar
    layout ao conteudo oficial e registrar textos/placeholders divergentes,
    sem copiar o Figma de volta para o arquivo editorial.
  - Consultar Make dVm7lEZdBFqOiiySWLWUqp, node 0:1; registrar composicao,
    tokens, progresso, etapa ativa, regiao de copia, imagens, foco e responsividade.
  - Confirmar estados sem dados/parcial/preenchido/recuperacao/falha de copia.
    Preferir regiao unica de copia; se frame intercalar campos, reconciliar
    agrupamento/identidade com 012 sem duplicar controles do mesmo valor.
  - Manter mapa-figma-telas.md com os seis frames e `564:635` como figmaNodeId
    principal da rota. Referencia insuficiente fica pendencia visual.
  - Dependencias: T001/T004. Evidencia: consultas e nodes no implementation-plan;
    CA13–CA14/CA16.

- [ ] **T006 — Validar copy operacional e inventario de assets**
  - Redigir cobertura de preparacao, acesso, localizacao, transferencia,
    revisao, conclusao e ajuda conforme T002/T003, com linguagem simples.
  - Vincular passos a fontes; validar texto e correspondencias com equipe
    responsavel, registrando responsavel e data efetiva de revisao.
  - Fechar introducao, avisos, orientacao para tela divergente, fontes, data
    visivel e links; nao confundir data do tutorial com Carta/publicacao.
  - Selecionar capturas somente quando ajudarem: autorizacao, origem/data,
    contexto/perfil, legenda e alternativa textual, sem dados reais/credenciais.
  - Definir arquivos locais e mapa de assets por ID, separados da copy;
    mockups nao podem ser rotulados como captura autentica. Texto deve bastar
    para compreender cada passo mesmo sem imagem.
  - Dependencias: T002–T005. Evidencia: copy validada e inventario autorizado;
    RF02–03/RF06–07, CA02–CA04/CA08/CA11–CA12/CA15–CA16.

- [ ] **T007 — Criar plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 011-tutorial-paraiba-digital`.
  - Consolidar T001–T006, fontes/datas, matriz, frame, assets, arquivos,
    contratos tipados e codigo base de pagina/componentes/conteudo/estilos.
  - Fechar IDs estaveis de passos/fontes/campos, `?etapa=1..6`, historico e
    foco no titulo; somente uma etapa fica ativa, mas todas permanecem livres.
  - Definir leitura editorial independente do estado da Carta, regiao da 012,
    estados de sessao, navegacao e link externo em nova aba com aviso acessivel
    e rel="noopener noreferrer", sem valores da Carta em query/hash.
  - Reutilizar testes de 007/012 ou definir infraestrutura para composicao e
    integracao; fechar matriz de navegadores e documento de verificacao.
  - Dependencias: T001–T006. Evidencia: implementation-plan.md completo,
    com pendencias explicitas e sem instrucoes provisorias como definitivas.

- [ ] **T008 — Validar documentos antes de codigo**
  - Executar `/spec:validar 011-tutorial-paraiba-digital` contra ERS, MVP,
    constitution, Figma, fontes operacionais e contratos de 007–010/012/013/016.
  - Resolver bloqueios de fonte/copy, correspondencias, contrato da 012,
    assets e composicao antes da implementacao conjunta.
  - Dependencia: T007. Evidencia: validacao RF01–RF07/CA01–CA17 registrada;
    fonte operacional ausente impede aceite de CA02–CA04/CA08.

Configuracoes de agendamento so se aplicam com `exigeAgendamento === true`. Tipo de
agendamento (Online, Presencial ou ambos) e Sistema de agendamento (Paraiba Digital ou
Outro sistema ou site) sao obrigatorios nesse estado. Link do agendamento e Como o
agendamento sera exibido? sao obrigatorios e visiveis somente para Outro sistema ou
site. Dentro do Paraiba Digital mantem o cidadao na experiencia; Em uma nova pagina
redireciona para a URL externa. Paraiba Digital identifica agendamento pelo proprio
sistema, sem link ou forma de exibicao externa.

Ao mudar para Nao/nao informado ou de Outro sistema ou site para Paraiba Digital,
preservar valores previamente preenchidos na mesma sessao, conforme o padrao da 007, sem
apagar silenciosamente. Valores inativos nao sao exibidos, validados como obrigatorios
nem transferidos como configuracao ativa; ao retornar a condicao correspondente, ficam
disponiveis para revisao.

Tutorial deve orientar uma unica configuracao condicional de agendamento e incluir os
quatro campos novos na matriz local da 012. Correspondencia de labels, campos,
integracao interna e capacidade de exibicao no Paraiba Digital oficial dependem de
confirmacao institucional; nao presumir iframe, API ou homologacao. Transferencia
permanece manual.

## Fase 2 — Conteudo e integracao

- [ ] **T009 — Implementar conteudo tipado e rastreavel**
  - Evoluir src/content/tutorial/paraiba-digital.ts para titulo, introducao,
    passos ordenados, IDs estaveis, fontes/contextos/datas, reviewedAt,
    links, avisos, acoes, legendas e referencias aos campos da 012.
  - Separar tipos/mapa de assets se melhorar clareza; nao usar titulos como
    keys nem embutir valores da Carta, dados de aprovacao interna ou credenciais.
  - Publicar somente copy validada: sem fonte/link/data vazios, href # ou
    menus presumidos. Data visivel corresponde a revisao efetiva.
  - Dependencia: T008 e comando `/spec:implementar`.
  - Evidencia: RF02–03/RF07, CA02–CA04/CA15–CA16.

- [ ] **T010 — Compor tutorial por etapa ativa e progresso acessivel**
  - Substituir placeholder de TutorialParaibaDigitalPage, reutilizando shell,
    PageHeader e breadcrumb; unico h1 e hierarquia coerente de passos.
  - Renderizar uma etapa ativa por vez conforme `?etapa=1..6`, com progresso,
    IDs estaveis, historico, foco e anuncios adequados. Ausencia/valor invalido
    abre a etapa 1; nunca exigir concluir uma etapa para consultar outra.
  - Aplicar CTAs por posicao: etapa 1 sem anterior; 2–5 anterior/proxima;
    etapa 6 anterior/concluir. Validar 17/33/50/67/83/100 por etapa.
  - Exibir introducao, data, fontes e todas as instrucoes sem gate de Carta,
    diagnostico, obrigatorios ou CSV; sem progresso persistido/certificacao.
  - Dependencias: T009/T007. Evidencia: RF01–03, CA01–CA05/CA13.

- [ ] **T011 — Integrar assets locais e alternativas textuais**
  - Adicionar somente assets autorizados de T006, com legenda, contexto,
    alternativa textual e dimensoes/carregamento que evitem deslocamento excessivo.
  - Adaptar imagens a mobile sem exigir zoom para instrucao essencial;
    falha de carregamento conserva texto/legenda e consulta do passo.
  - Dependencias: T010/T006. Evidencia: RF06, CA12/CA14, sem dependencia
    de URLs temporarias do Figma ou imagem remota essencial.

- [ ] **T012 — Integrar fonte da sessao e componentes de copia**
  - Conectar, somente na etapa 4 (`564:980`), a regiao CartaCopyFields da 012
    ao provider real da 007 conforme T004/T007; os passos apontam campos por ID
    sem mecanismos duplicados.
  - Sem dados, mostrar estado vazio da 012 e Preencher Carta; parcial permite
    copiar valores informados sem required como gate ou sugestoes obrigatorias.
  - Recuperacao invalida/memoria apenas usa avisos/dados seguros do provider,
    preservando instrucoes; nao acessar storage nem inicializar segunda Carta.
  - Atualizacoes/retorno da edicao mostram valores atuais; confirmacoes para
    texto alterado sao invalidadas pela 012. Renderizar dados como texto seguro.
  - Gerar links relacionados somente para IDs visiveis do seletor atual da 012,
    incluindo ativos missing com heading existente. Inativos nao recebem link
    de campo; falha de copia mantem heading tutorial-dados no fallback e
    elimina links de campo sem destino, preservando instrucoes independentes.
  - Falha de clipboard mantem pagina e alternativa manual/nova tentativa da
    012; sucesso significa somente copia, sem detectar colagem/publicacao.
  - Dependencias: T010/T004 e provider/componentes reais da 007/012.
  - Evidencia: RF04–05, CA05–CA10; mecanismo da 012 verificado em sua propria feature.

- [ ] **T013 — Integrar entradas, continuidade e ajuda**
  - Conferir acesso por menu, card da 003, previa e URL direta/recarga; usar
    navegacao compartilhada da 002, pagina atual e breadcrumb ao inicio.
  - Oferecer Preencher Carta/Editar informacoes para /formulario-carta,
    revisao /previa e Preciso de ajuda /ajuda conforme contexto, sem gate.
  - Implementar link oficial confirmado com nome/destino e nova aba conforme
    T007; preservar Carta, href real e modificadores da navegacao interna.
  - Sem dados pessoais em links, abertura automatica, requisicoes de fundo,
    suporte proprio ou anuncio de conclusao externa.
  - Dependencias: T010/T012 e navegacao/entradas reais de 002/003/009.
  - Evidencia: RF01/RF05–07, CA01/CA07/CA11/CA15–CA16.

- [ ] **T014 — Aplicar layout responsivo e estados acessiveis**
  - Aplicar tokens/Inter confirmados; passos, fontes, imagens e copia com
    texto integral/selecionavel, altura natural e quebra de palavras longas.
  - Preservar ordem DOM/visual, foco/contraste e titulos/links compreensiveis;
    instrucao nao depende so de imagem, coordenada, cor ou icone.
  - Integrar feedback da 012 sem live region duplicada ou mover foco em
    atualizacao dos dados; respeitar estados sem dados/parciais/falha.
  - Dependencias: T010–T013. Evidencia: CA13–CA14/CA16, comparacao com Figma.

## Fase 3 — Verificacao e fechamento

- [ ] **T015 — Verificar cobertura e consistencia editorial**
  - Conferir cada instrucao operacional contra fonte/perfil/data de T002,
    matriz de T003 e validacao de T006; revisar nomes, links, permissoes e
    diferenca entre salvar/enviar/publicar conforme evidencia real.
  - Conferir as seis etapas oficiais; preparacao pertence a introducao/etapa 4
    e ajuda e transversal. Incluir revisao apos colar, diferencas e divergencias.
  - Revisar origem/autorizacao/contexto das capturas e data efetiva apresentada.
    Nao declarar tutorial operacional aceito com orientacoes genericas.
  - Dependencias: T009–T013. Evidencia: CA02–CA04/CA08/CA11–CA12/CA15–CA16.

- [ ] **T016 — Testar composicao, sessao e copia integrada**
  - Verificar instrucoes sem Carta, modelo vazio, Carta parcial, required
    pendente, sugestoes, recuperacao invalida e memoria valida sem storage.
  - Editar no formulario e retornar, atualizar provider com pagina montada e
    recarregar sessao valida; comparar valores e confirmacoes de copia atuais.
  - Conferir agendamento null/false explicito/legado via decoder, orientacao
    preservada e listas parciais conforme contrato revisto da 012.
  - Cobrir Online/Presencial/ambos, Paraiba Digital com valores externos retidos
    e externo dentro/nova pagina. Trocar/restaurar e recarregar com links
    montados: somente campos visiveis possuem anchors, ativo missing conserva
    heading e inativo desaparece sem apagar valor. Retorno antigo de copia
    nao reaparece; falha da regiao de dados conserva tutorial-dados no fallback.
  - Testar copia real quando ambiente permitir, negacao/indisponibilidade e
    alternativa manual: tutorial permanece e nenhum retorno anuncia cadastro.
  - Inserir HTML/scripts sinteticos como texto: nenhuma interpretacao ou
    requisicao remota derivada desses valores. Falha de imagem nao remove instrucao.
  - Dependencias: T011–T013 e infraestrutura de T007/007/012.
  - Evidencia: CA05–CA10/CA12/CA16, sem repetir testes internos de clipboard da 012.

- [ ] **T017 — Verificar navegacao, teclado e reflow nos ambientes definidos**
  - Exercitar entradas, URL direta/recarga, `?etapa=1..6`, voltar/avancar, formulario,
    previa, ajuda e nova aba oficial, preservando Carta e sem transmissao de valores.
  - Usar teclado/leitor de tela: titulos, progresso, etapa ativa, imagens, links,
    campos/acoes de copia, feedback e foco coerentes com header sticky.
  - Conferir Chrome/Edge/Firefox/Safari na matriz da 016, incluindo mobile,
    1440/1024/768/390/320 px e intermediarias, texto 200% e zoom/reflow.
  - Usar texto longo, fonte fallback, imagem/clipboard indisponiveis; medir
    contraste e verificar ausencia de corte/sobreposicao/overflow horizontal.
  - Registrar ambientes/versoes, defeitos e retestes; indisponibilidade fica
    pendente. Nao criar cadastro real, enviar mensagens ou usar credenciais externas.
  - Dependencias: T014/T016. Evidencia: CA01/CA07/CA10–CA14.

- [ ] **T018 — Executar checks e consolidar aceite**
  - Executar npm run typecheck, npm run build e suite configurada; verificar
    consumidores de conteudo/componentes compartilhados alterados.
  - Criar quickstart.md com entradas, estados, fixtures sinteticas, verificacao
    da copia/alternativa manual e referencias para manutencao editorial.
  - Consolidar resultados CA01–CA17, consultas Figma, fontes/copy, matriz,
    ambientes, defeitos e pendencias no documento de verificacao de T007.
  - Conferir ausencia de storage proprio, logs/envio da Carta, conta externa,
    automacao, progresso persistido e promessas de publicacao/importacao CSV.
  - Dependencias: T015–T017. Evidencia: checks e criterios com resultados reais;
    fontes/validacao editorial/integracoes ausentes impedem aceite integral.

## Rastreabilidade

| Requisito/criterios | Tarefas principais |
| --- | --- |
| Agendamento condicional, CA17 | T003, T004, T006, T016 |
| RF01, CA01 | T001, T010, T013, T017 |
| RF02, CA02/CA04 | T002, T006, T009–T010, T015 |
| RF03, CA03 | T002, T006, T009, T015, T018 |
| RF04, CA08 | T003–T004, T006, T012, T015 |
| Contrato de agendamento, CA09 | T003–T004, T012, T016 |
| Copia integrada, CA06/CA10 | T004, T012, T016–T017 |
| RF05, CA05/CA07 | T001, T010, T012–T013, T016–T017 |
| RF06, CA11/CA12 | T002, T006, T011, T013, T015–T017 |
| RF07, CA15 | T002, T006, T009, T013, T015 |
| Acessibilidade/reflow, CA13/CA14 | T005, T007, T010–T011, T014, T017 |
| Arquitetura/conteudo/visual, CA16 | T001, T004–T009, T013–T016, T018 |

## Proximo passo

Executar `/spec:plano-implementacao 011-tutorial-paraiba-digital`, consolidando
fontes operacionais, matriz de campos, revisao da 012, copy validada, assets e
referencias Figma. Depois executar `/spec:validar` antes de
`/spec:implementar`. Esta etapa criou somente tarefas.

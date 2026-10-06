# Tasks: Previa HTML

## Convencoes e status

- Base: spec.md e plan.md da 009; executar conforme dependencias indicadas.
- Todas as tarefas estao pendentes. Criar a lista nao conclui consulta visual,
  validacao editorial, implementacao ou verificacoes.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  `/spec:validar` sem bloqueios relevantes.
- Previa local e somente leitura, derivada da Carta unica da 007. Sem storage
  proprio, segunda Carta, backend, arquivo HTML/PDF ou publicacao externa.
- Pendencias obrigatorias nao bloqueiam previa/tutorial/edicao; exportacao
  pertence a 010 e exige verificacao atual da 008.
- Specs consumidoras agora existem; notas historicas de ausencia nao provam
  falta de documentacao atual nem entrega de suas funcionalidades.

## Fase 1 — Preparacao e contratos

- [ ] **T001 — Conferir fonte de sessao e integracoes reais**
  - Inventariar PreviaCartaPage, rota, App, shell, links e componentes comuns.
  - Conferir provider/decoder da 007, campos novos, IDs, ordem e estados de
    recuperacao; verificar contrato required complete/failed da 008.
  - Conferir exportacao 010, tutorial 011 e ajuda 013 implementados ou pendentes.
  - Evidencia: inventario e lacunas no implementation-plan, sem aprovar placeholders.

- [ ] **T002 — Fechar contrato de apresentacao e ausencia**
  - Conciliar ERS/modelo da 007: todos os campos, nome popular e como agendar.
  - Definir hasContent: texto util ativo, item com nome/descricao util ou
    agendamento explicitamente true/false; IDs, ordens e atributos isolados nao bastam.
  - Cobrir os cinco cenarios da 007 CA19–CA23 e obrigatoriedade CA24, com valores
    externos preservados na sessao e nao transferidos quando inativos.
  - Fechar omissao uniforme de nome popular/adicionais vazios, missing dos demais,
    listas parciais, classificacao/tipo null e aviso de itens incompletos.
  - Preservar numeros de origem nas etapas preenchidas com lacunas; nao renumerar
    subconjunto nem alterar fonte. Campos condicionais inativos ficam somente na sessao,
    sem exibicao na previa.
  - Dependencia: T001. Evidencia: tipos concretos e convencoes documentados;
    cobertura RF02–04, CA02/CA04–09/CA13.

- [ ] **T003 — Consultar Figma e validar copy**
  - Consultar via MCP Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`,
    node `821:308`; identificar pagina completa, acoes e estados adicionais.
  - Consultar Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.
  - Registrar secoes, ordem, tokens, assets e estados vazio/parcial/com dados/
    validacao indisponivel; conciliar campos omitidos sem perder cobertura.
  - Validar copy, ausencias, avisos e limites de revisao/publicacao com equipe;
    registrar fontes lidas e pendencias de ERS/editorial sem presumir homologacao.
  - Dependencia: T002. Evidencia: consultas, copy e divergencias resolvidas;
    referencia insuficiente fica bloqueio visual. Cobertura CA17–18.

- [ ] **T004 — Criar plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 009-previa-html`.
  - Consolidar T001–T003, seletores puros, componentes, conteudo, arquivos,
    codigo base, CSS, foco/rotas e retorno de pendencias ao campo da 007.
  - Definir slot de exportacao real da 010 e comportamento enquanto indisponivel;
    nao oferecer botao que simula exportacao ou anuncia funcionalidade inexistente.
  - Reutilizar testes de 007/008 ou definir infraestrutura adequada para seletores
    e integracao; nao instalar biblioteca apenas para testar labels estaticas.
  - Dependencias: T001–T003. Evidencia: implementation-plan.md completo.

- [ ] **T005 — Validar documentos antes de codigo**
  - Executar `/spec:validar 009-previa-html` contra ERS, MVP, constitution,
    Figma e contratos de 007/008/010; conferir RF01–RF07 e CA01–CA19.
  - Resolver bloqueios de campos, listas, copy e integracao; registrar resultado.
  - Dependencia: T004. Evidencia: validacao documental registrada.

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

Previa permanece acessivel com Carta parcial; mostrar pendencias dos campos ativos e
identificar sistema/tipo/exibicao em linguagem simples. Nao renderizar iframe nem abrir
o link para executar agendamento aqui.

## Fase 2 — Derivacao e renderizacao

- [ ] **T006 — Criar seletores puros de previa**
  - Criar carta.preview.ts conforme tipos fechados em T002/T004.
  - Derivar hasContent, campos present/missing, listas e avisos sem mutacao,
    ordenacao in-place, cache persistido ou mensagens gravadas na Carta.
  - Usar trim apenas para detectar ausencia; devolver texto integral. IDs sao
    keys internas, nao valores visiveis. Agendamento legado usa decoder da 007.
  - Dependencia: T005 e comando `/spec:implementar`.
  - Evidencia: vazio/defaults, parcial, false explicito e custo `0` corretos;
    CA04–09/CA14.

- [ ] **T007 — Criar conteudo editorial versionado**
  - Criar `src/content/pages/previa-carta.ts` com labels, secoes, mensagens de
    vazio/ausencia/recuperacao, avisos de revisao e rotulos/destinos.
  - Nao incluir valores de sessao ou inferir gratuidade/dispensa de requisitos.
  - Dependencias: T005/T003. Evidencia: conteudo separado de dados/apresentacao;
    RF07, CA06–08/CA17.

- [ ] **T008 — Renderizar cartao integral e seguro**
  - Criar/reutilizar CartaPreview e PreviewField apenas se a extracao justificar;
    secoes coerentes com formulario, rotulos/valores e listas ul/ol adequadas.
  - Mostrar todos os campos conforme contrato, dados parciais, atributos ausentes,
    numeros de etapas e avisos separados dos valores da Carta.
  - Usar nos de texto React; sem dangerouslySetInnerHTML, Markdown, iframe,
    linkificacao ou recursos remotos derivados das entradas.
  - Preservar acentos, quebras e redacao; sem ellipsis, resumo ou altura que corte.
  - Dependencias: T006–T007. Evidencia: CA02/CA06–09/CA14, sem editar a fonte.

- [ ] **T009 — Integrar provider e estados da pagina**
  - Substituir placeholder de PreviaCartaPage e consumir useCartaSession da 007.
  - Reagir aos valores atuais mesmo montada, sem snapshot editavel, acesso direto
    a storage, migracao duplicada ou inicializacao de Carta paralela.
  - Distinguir hidratacao pendente, se existir, de vazio; exibir dados seguros
    em memoria e avisos de recuperacao sem mover foco em atualizacoes.
  - Estado vazio oferece mensagem e Preencher Carta, sem cartao ficticio ou
    lista de erros como unica apresentacao. Provider ausente e falha de integracao.
  - Dependencias: T008 e provider real da 007.
  - Evidencia: CA01/CA03–05/CA13 com fonte unica e estados verdadeiros.

- [ ] **T010 — Integrar pendencias compartilhadas e correcao**
  - Consumir required da 008 sobre valores atuais; failed nao equivale a sem erros.
  - Reutilizar resumo quando adequado; retorno por alvo fechado abre parte e
    foca controle na 007, sem dados pessoais em URL.
  - Manter cartao, edicao e tutorial acessiveis com pendencias/falha. Nao executar
    segundo motor editorial nem anunciar aprovacao quando nao houver erros.
  - Atualizacoes nao tornam cartao inteiro live region nem deslocam foco.
  - Com resposta/sistema alterados, obter required atual da 008 para os
    campos aplicaveis e retirar pendencias inativas, mantendo valores da Carta.
  - Dependencias: T009 e required/resumo/retorno reais de 008/007.
  - Evidencia: CA04/CA11 e falha de validacao com dados visiveis.

- [ ] **T011 — Integrar breadcrumb e acoes internas**
  - Reutilizar shell/links/foco da 002 e breadcrumb com pagina atual identificada.
  - Oferecer Editar informacoes para `/formulario-carta`, tutorial para
    `/tutorial-paraiba-digital` e ajuda `/ajuda` sem gate ou retorno apenas por historico.
  - Preservar memoria, href real, modificadores/nova aba e voltar/avancar;
    nao duplicar router/header/main/footer ou expor previa no menu sem contrato.
  - Dependencias: T009–T010 e navegacao compartilhada confirmada em T001.
  - Evidencia: CA01/CA10–11; destinos placeholders ficam pendentes de integracao.

- [ ] **T012 — Integrar exportacao quando a 010 estiver pronta**
  - Conectar componente/acao real de 010 conforme T004; ela valida snapshot
    atual, gera arquivo e controla retorno. Nao implementar gerador nesta feature.
  - Required ausente/failed impede apenas CSV, com explicacao e correcao;
    sugestoes nao bloqueiam. Nao usar validacao cacheada como unica permissao.
  - Sem 010 funcional, registrar integracao pendente e evitar acao ficticia.
  - Dependencias: T010–T011 e exportacao real da 010.
  - Evidencia: CA12 integrado; pendencia nao impede testar leitura da previa.

- [ ] **T013 — Aplicar layout responsivo e estados acessiveis**
  - Usar tokens/Inter e assets confirmados; altura natural, pre-wrap e quebra
    de enderecos/palavras longos sem perda de texto.
  - Preservar ordem DOM/visual, unico h1 e sem main duplicado; avisos/acoes
    continuam legiveis com ampliacao e fonte fallback.
  - Conferir contraste/foco e evitar coordenadas absolutas para dados variaveis.
  - Dependencias: T008–T011; conferir T012 quando integrado.
  - Evidencia: CA15–16/CA18 e comparacao com referencia visual registrada.

## Fase 3 — Testes e fechamento

- [ ] **T014 — Testar seletores, ausencias e pureza**
  - Cobrir modelo inicial, itens vazios e atributos/IDs/ordens isolados;
    false explicito e textos novos produzem conteudo, false legado passa por migracao.
  - Cobrir custo `0`, opcionais omitidos, agendamento null/Sim/Nao, orientacao
    incompatível preservada, listas parciais e etapa vazia intercalada.
  - Cobrir Online/Presencial/ambos, Sim sem tipos/sistema, Paraiba Digital
    com URL/exibicao retidas, externo dentro/nova pagina e campos externos
    ausentes. Trocar/restaurar sistema sem mutar valores; inativos nao geram
    conteudo ou flags de exibicao aplicaveis.
  - Usar fixture congelada e conferir textos, arrays, ordem e IDs intactos.
  - Dependencia: T006 e infraestrutura de T004.
  - Evidencia: testes significativos CA04–09/CA14, sem apenas repetir labels.

- [ ] **T015 — Testar renderizacao segura e cobertura integral**
  - Conferir todos os valores/atributos de Carta preenchida e mensagens separadas.
  - Inserir HTML/scripts/enderecos como texto sintetico: nenhuma execucao,
    elemento ou requisicao remota originada por interpretar esses valores.
  - Conferir acentos, quebras, espacos e textos extensos sem truncamento.
  - Conferir rotulos/significados dos dois sistemas e formas de exibicao;
    ausencias ativas identificadas, configuracoes inativas omitidas e URL
    externa apenas texto, sem anchor/iframe/redirecionamento.
  - Dependencias: T008–T009/T014.
  - Evidencia: CA02/CA06–09/CA14 e renderizacao sem alterar redacao.

- [ ] **T016 — Testar sessao, retorno e falhas integradas**
  - Editar formulario, abrir previa, atualizar provider com previa montada e
    retornar; comparar valores/listas. Recarregar com sessao valida.
  - Alternar Sim/Nao/null e externo/Paraiba Digital com previa montada;
    reativar e recarregar, conferindo fonte preservada, apresentacao atual e
    retirada das pendencias inativas conforme validacao compartilhada da 008.
  - Testar storage bloqueado, recuperacao parcial/impossivel, Carta vazia e
    required failed; manter dados seguros visiveis sem falso estado completo.
  - Conferir correcao em parte oculta, tutorial livre e CSV bloqueado somente
    conforme 010. Integracoes ausentes permanecem pendentes por criterio.
  - Dependencias: T009–T012/T015 e features reais para aceite integrado.
  - Evidencia: CA01/CA03–05/CA10–13 sem perda de dados ou exportacao falsa.

- [ ] **T017 — Verificar teclado, leitura assistiva e reflow**
  - Percorrer titulos, secoes, listas, pendencias e acoes com teclado/leitor de
    tela; conferir foco de rota/correcao e ausencia de anuncio integral repetido.
  - Testar Chrome/Edge/Firefox/Safari na matriz viavel da 016, larguras
    1440/1024/768/390/320 px e intermediarias, texto 200% e zoom/reflow.
  - Usar textos longos, enderecos sem espacos e fonte fallback; medir contraste.
  - Registrar ambientes/versoes, defeitos e retestes; ambiente ausente fica pendente.
  - Dependencia: T013. Evidencia: CA15–16/CA18 sem corte/overflow horizontal.

- [ ] **T018 — Executar checks e consolidar aceite**
  - Executar `npm run typecheck`, `npm run build` e suite configurada; verificar
    consumidores de componentes compartilhados alterados.
  - Registrar resultados CA01–CA19, Figma, copy, defeitos, retestes e dependencias
    em documento de verificacao adotado em T004; nao aprovar criterios pendentes.
  - Conferir ausencia de storage proprio, dados em logs/envio externo, edicao
    paralela, download HTML/PDF, compartilhamento publico ou promessa de aprovacao.
  - Dependencias: T014–T017. Evidencia: checks e cobertura vinculados a tarefas;
    pendencias de consumidores impedem declarar aceite integral.

## Rastreabilidade

| Requisito/criterios | Tarefas principais |
| --- | --- |
| Agendamento condicional, CA19 | T002, T006, T008, T010, T014–T016 |
| RF01, CA01 | T001, T009, T011, T016 |
| RF02, CA03/CA10/CA13 | T001, T009, T011, T016 |
| RF03, CA02/CA06–09/CA14 | T002, T006, T008, T014–T015 |
| RF04, CA04–05 | T002, T006, T009, T014, T016 |
| RF05, CA11 | T010, T016 |
| RF06, CA10/CA12 | T011–T012, T016 |
| RF07/arquitetura, CA17 | T003, T007, T018 |
| Acessibilidade/reflow, CA15–16 | T004, T013, T017 |
| Visual, CA18 | T003–T005, T013, T017–T018 |

## Proximo passo

Executar `/spec:plano-implementacao 009-previa-html`, consolidando contratos
reais de 007/008, integracao da 010, copy e Figma. Depois executar `/spec:validar`
antes de `/spec:implementar`. Esta etapa criou somente tarefas.

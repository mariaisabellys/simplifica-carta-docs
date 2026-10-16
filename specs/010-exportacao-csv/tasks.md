# Tasks: Exportacao CSV

> **Baseline v3 — 16 de outubro de 2026:** gerar o CSV somente a partir do
> snapshot v3 e não exportar IDs ou valores condicionais inativos.

## Convencoes e status

- Base: spec.md e plan.md da 010, ADR-002 e contratos de 007–009.
- Todas as tarefas estao pendentes. Esta lista nao comprova implementacao,
  consulta Figma, testes de planilhas ou aceite institucional.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  `/spec:validar` sem bloqueios relevantes.
- CSV local da Carta unica da sessao; sem backend, envio externo, storage
  proprio, importacao automatica ou formatos adicionais.
- Formato e politica de formulas do plan sao propostas a consolidar. Testes
  de strings nao comprovam interpretacao segura por aplicativos de planilha.
- Dependencias documentadas nao significam funcionalidades implementadas.

## Fase 1 — Preparacao e contratos

- [ ] **T001 — Conferir fontes e integracoes reais**
  - Inventariar carta.csv.ts, lib/csv.ts, tipos/schema, validacao, provider,
    PreviaCartaPage, conteudo, estilos e infraestrutura de testes.
  - Conciliar ERS, ADR-002 e contratos de 007–009: decoder v2, listas/ordens,
    null nas escolhas, nomePopular e orientacaoAgendamento.
  - Confirmar required complete/failed da 008, resumo de pendencias e retorno
    ao campo da 007; registrar placeholders e dependencias ainda ausentes.
  - Evidencia: fontes efetivamente lidas e inventario no implementation-plan;
    RF01–03/RF06, CA01–03/CA11–12/CA17–18.

- [ ] **T002 — Fechar contrato do arquivo e das listas**
  - Consolidar duas colunas campo/valor, cabecalho e 17 registros na ordem do
    plan: nome, nome_popular, descricao, publico_alvo, criterios, documentos,
    etapas, prazo, custo, canais, exige_agendamento, tipos_agendamento,
    sistema_agendamento, link_agendamento, exibicao_agendamento, orientacao_agendamento e
    informacoes_complementares. Sem IDs, metadados ou linhas extras.
  - Confirmar virgula, quoting de todas as celulas, aspas internas duplicadas,
    CRLF entre registros e final, UTF-8/BOM no artefato, MIME
    text/csv;charset=utf-8 e nome fixo simplifica-carta.csv, sem heuristica locale.
  - Fechar listas multiline com LF entre itens, preservando quebras internas,
    ordem, numeros de etapas com lacunas e textos integrais. Documentar que
    split por linhas nao reconstitui necessariamente os itens originais.
  - Documento recebe Obrigatório/Opcional apenas quando informado; canal usa
    mapa versionado de tipos apenas quando informado. Omitir itens sem texto
    util, preservar parciais e nao criar atributos ou ausencia de exigencia.
  - Ausencias ficam vazias; preservar custo 0, Sim/Nao explicitos, null vazio
    e orientacao de agendamento somente com Sim; dados inativos apenas na sessao.
  - Dependencia: T001. Evidencia: tabela e exemplos sinteticos documentados;
    RF03–04, CA04–07.

- [ ] **T003 — Definir politica de formulas e matriz de compatibilidade**
  - Consolidar politica candidata de apostrofo antes da celula de valor final,
    depois de compor listas e antes de quoting, sem alterar a Carta original.
  - Especificar conjunto exato de espacos/controles, tab/CR/LF iniciais,
    sinais =/+/-/@ e variantes de largura completa. Normalizar somente copia
    para deteccao; preservar caracteres originais, incluindo negativos legitimos.
  - Definir fixtures sinteticas inofensivas, Unicode/fronteiras e tentativas
    de criar celulas com aspas/delimitadores; nunca usar formulas com links externos.
  - Definir verificacao em Excel desktop e LibreOffice Calc: abertura padrao,
    importacao virgula/UTF-8 como Texto e salvar/reabrir, separadamente.
  - Registrar versao, sistema, locale e opcoes; se algum caminho avaliar
    formulas, rever politica e compatibilidade antes do aceite de CA08.
  - Definir aviso breve de marcador de protecao e limites de tipagem e
    regravacao; nao prometer seguranca universal ou homologacao externa.
  - Dependencia: T002. Evidencia: politica, fixtures e matriz no plano detalhado;
    RF05, CA08/CA15. Resultados reais pertencem a T018.

- [ ] **T004 — Consultar referencias visuais e fechar mensagens**
  - Consultar via MCP Figma Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2,
    referencia 821:308, localizando acao e estados no fluxo de previa.
  - Consultar Make dVm7lEZdBFqOiiySWLWUqp, node 0:1; registrar tokens,
    componentes, foco, contraste, composicao e comportamento responsivo.
  - Fechar mensagens idle/processing/blocked/started/failed, aviso de protecao,
    captura dos dados no clique e continuidade ao cadastro manual.
  - Usar retorno limitado a download iniciado, sem afirmar arquivo salvo.
    Registrar divergencias e lacunas visuais/editoriais, sem presumir aprovacao.
  - Dependencias: T001–T003. Evidencia: fontes, nodes e copy no implementation-plan;
    RF01/RF07, CA13–14/CA18.

- [ ] **T005 — Criar plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 010-exportacao-csv` consolidando T001–T004.
  - Definir contratos puros, componentes/hook, conteudo, slot da 009, arquivos,
    codigo base, snapshot, required, estados e trava imediata da operacao.
  - Definir ciclo de vida de anchor/object URL e prazo de revoke com verificacao
    em navegador; inicio proximo do gesto e passo explicito de download caso
    processamento assincrono perca ativacao. Nao adicionar worker sem evidencia.
  - Confirmar fixture de 50 documentos, 50 canais, 100 etapas e ate 1 MiB UTF-8;
    definir ambiente, repeticoes e medicao ate Blob pronto, separada do download.
  - Reutilizar testes de 007/008 ou planejar infraestrutura para serializacao,
    pipeline e integracao, incluindo parser CSV independente do serializador.
  - Dependencias: T001–T004. Evidencia: implementation-plan.md com contratos,
    matriz de ambientes, verificacoes e criterios de bloqueio.

- [ ] **T006 — Validar documentos antes de codigo**
  - Executar `/spec:validar 010-exportacao-csv` contra ERS, MVP, constitution,
    Figma, ADR-002 e contratos finais de 007–009/011–012/016.
  - Resolver divergencias de campos, formato, formulas, copy e integracao;
    distinguir proposta documental de evidencias futuras de navegadores/planilhas.
  - Dependencia: T005. Evidencia: validacao documental RF01–07/CA01–19 registrada.

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

CSV continua com duas colunas campo/valor, agora 17 registros fixos: manter os 13
existentes e inserir tipos_agendamento, sistema_agendamento, link_agendamento e
exibicao_agendamento imediatamente depois de exige_agendamento, antes de
orientacao_agendamento. Campos inativos geram valor vazio; tipos ativos usam Online e/ou
Presencial separados por LF, nesta ordem. Sistema/exibicao usam rotulos da 007.
Validacao compartilhada da 008 impede exportacao se configuracoes obrigatorias ativas
estiverem ausentes/invalidas.

## Fase 2 — Geracao e integracao

- [ ] **T007 — Implementar formatacao integral da Carta**
  - Evoluir carta.csv.ts com mapeamento puro dos 17 campos de T002, listas,
    atributos explicitos, ausencias e ordens coerentes com 007/009.
  - Usar trim somente para detectar conteudo; nao truncar ou reescrever valores,
    ordenar in-place, expor IDs ou incluir mensagens da previa.
  - Dependencia: T006 e comando `/spec:implementar`.
  - Evidencia: RF03, CA04/CA06–07; testes de cobertura em T014.

- [ ] **T008 — Implementar protecao de valores**
  - Aplicar politica fechada em T003 a celula final; separar deteccao/protecao
    quando melhorar responsabilidade e retornar quantidade de valores protegidos.
  - Manter fonte intacta e nao usar formulas como ="texto" para preservar valores.
  - Dependencias: T007/T003. Evidencia: RF05, casos de T015; aceite de CA08
    permanece dependente da verificacao real T018.

- [ ] **T009 — Implementar serializacao e artefato CSV**
  - Evoluir lib/csv.ts com quoting, aspas duplicadas e CRLF definidos em T002;
    preservar CR, LF e CRLF internos sem criar registros/colunas adicionais.
  - Compor cabecalho e linhas, acrescentar BOM uma unica vez na fronteira do
    artefato e criar Blob UTF-8 com MIME correto, sem cache de arquivo anterior.
  - Dependencias: T007–T008. Evidencia: RF04, CA05; round-trip em T014.

- [ ] **T010 — Implementar acionamento e limpeza do download**
  - Criar operacao browser para object URL e anchor temporaria com nome fixo,
    acionada pelo gesto do usuario conforme T005, sem envio externo.
  - Remover anchor e liberar URL depois do uso com prazo definido; limpar
    recursos tambem nas falhas sem revoke prematuro ou recursos acumulados.
  - Propagar erros detectaveis; invocacao sem erro nao confirma salvamento.
  - Dependencias: T009/T005. Evidencia: RF06, CA11/CA13, testes em T016/T018.

- [ ] **T011 — Orquestrar snapshot, validacao e estado**
  - Criar useExportCartaCsv ou equivalente: copiar snapshot consistente do
    provider 007, validar e serializar essa mesma versao sem reidratar storage.
  - Required failed ou complete com errors impede Blob/download; sugestoes
    editoriais nao sao gate. Memoria valida funciona sem armazenamento disponivel.
  - Implementar idle/processing/blocked/started/failed e distinguir falhas de
    validacao, geracao e download. Travar imediatamente no handler por ref,
    liberar em finally e permitir nova operacao apos termino.
  - Nova tentativa captura novos valores; nao limpar sessao, misturar versoes
    ou reutilizar CSV obsoleto. Manter inicio de download conforme T005.
  - Dependencias: T007–T010 e provider/required reais da 007/008.
  - Evidencia: RF02–03/RF06, CA01–03/CA09–13; testes em T016.

- [ ] **T012 — Integrar conteudo, acao e correcao na previa**
  - Criar conteudo versionado em src/content/exports/carta-csv.ts ou caminho
    fechado em T005; separar mensagens/convencoes de dados e apresentacao.
  - Criar ExportCsvAction ou equivalente e integrar ao slot de PreviaCartaPage
    da 009, sem rota nova ou botao que simule exportacao.
  - Reutilizar resumo de pendencias da 008 e alvos de correcao da 007; abrir
    parte e focar campo sem valores pessoais na URL.
  - Mostrar processamento, falhas e retorno verdadeiro; manter Editar,
    tutorial e ajuda acessiveis em bloqueio/falha e apos download.
  - Dependencias: T011/T004 e integracao real da 009/007/008.
  - Evidencia: RF01–02/RF07, CA02/CA11/CA13–14/CA17–18.

- [ ] **T013 — Aplicar estados acessiveis e layout responsivo**
  - Aplicar tokens/Inter e composicao confirmados em T004; botao com nome
    Exportar CSV, teclado e foco visivel, sem explicacao dependente apenas de cor.
  - Anunciar pendencias e retorno com live region comedida; manter foco coerente
    no botao/resumo e evitar anuncio repetitivo do cartao inteiro.
  - Garantir mensagens/acoes com altura natural e sem corte nas larguras da
    matriz da 016, incluindo 320 px e ampliacao de texto.
  - Dependencia: T012. Evidencia: RF07, CA14/CA18; verificacao em T020.

## Fase 3 — Testes e fechamento

- [ ] **T014 — Testar cobertura, pureza e round-trip**
  - Usar fixture completa congelada: 17 campos, listas com varias entradas,
    lacunas em etapas, atributos null, itens vazios/parciais, custo 0,
    agendamento null/false/true e orientacao preservada.
  - Conferir fonte/IDs/arrays/ordem inalterados e ausencia de metadados/avisos.
  - Ler CSV com parser independente: BOM, 17 dados mais cabecalho (18 registros logicos),
    duas colunas, virgula, aspas, acentos e CR/LF/CRLF internos/finais.
  - Comparar valores conforme convencoes e protecao, sem exigir igualdade
    literal nos casos em que o marcador documentado modifica o artefato.
  - Cobrir Online/Presencial/ambos em ordem fixa, enums traduzidos, sistema
    nativo com URL/exibicao retidas e externo dentro/nova pagina; inativos
    vazios nas quatro linhas estruturadas, com fonte preservada apos troca.
  - Dependencias: T007–T009 e infraestrutura de T005.
  - Evidencia: CA04–07 e preservacao da fonte de CA08.

- [ ] **T015 — Testar fronteiras da politica de formulas**
  - Cobrir =/+/-/@, largura completa, espacos/controles definidos, tab/CR/LF,
    prefixos combinados, negativos legitimos e valores comuns nao protegidos.
  - Conferir protecao da celula apos compor listas, marcador/contagem e quoting
    contra aspas/delimitadores que tentem criar outra celula.
  - Dependencias: T008/T014. Evidencia: politica aplicada e fonte intacta;
    estes testes nao substituem verificacao de interpretacao em T018.

- [ ] **T016 — Testar pipeline, falhas e recursos browser**
  - Required errors/failed nao cria Blob/URL nem aciona anchor; sugestoes
    pendentes nao bloqueiam required valido. Simular erro tecnico de validacao.
  - Sim sem tipos/sistema e externo sem URL/exibicao validas bloqueiam pelas
    mesmas regras da 008; valores externos inativos nao bloqueiam nativo.
    Troca/restauracao usa snapshot novo e retira pendencias blocked obsoletas,
    sem download automatico ou movimento de foco.
  - Testar snapshot com edicao posterior, nova exportacao atualizada, memoria
    valida sem storage, duplo clique em processamento e nova acao apos termino.
  - Simular falhas de formatacao/serializacao, Blob, createObjectURL e click;
    conferir retorno, dados preservados, trava liberada e limpeza de recursos.
  - Verificar prazo de revoke e anuncio started apenas apos acionamento sem
    erro, sem promessa de salvamento. Mocks nao comprovam download real.
  - Dependencias: T010–T012/T014–T015.
  - Evidencia: CA01–03/CA09–13.

- [ ] **T017 — Verificar jornada integrada e continuidade**
  - Preencher formulario, revisar previa, exportar, editar e exportar novamente;
    comparar artefatos e confirmar Carta preservada.
  - Corrigir pendencia em parte oculta via resumo; simular required failed e
    storage indisponivel, mantendo previa/edicao/tutorial/ajuda acessiveis.
  - Conferir tutorial e copia da 012 quando funcionais, sem exigir download
    anterior. Integracoes ausentes permanecem pendentes por criterio.
  - Dependencias: T012/T016 e features consumidoras reais.
  - Evidencia: CA01–03/CA09/CA11–12/CA17.

- [ ] **T018 — Verificar downloads e interpretacao em ferramentas reais**
  - Baixar arquivo em Chrome/Edge/Firefox desktop e Safari macOS/iOS,
    incluindo Chrome mobile conforme matriz fechada, com repeticoes/falhas.
  - Conferir nome, MIME, bytes/BOM, acionamento por gesto e ciclo de recursos;
    verificar fluxo preparado/baixar se adotado, sem auto-download tardio.
  - Executar matriz de Excel/Calc de T003 com dados sinteticos: acentos,
    duas colunas, listas/multilinhas, zero, aspas e prefixos de formula.
  - Registrar abertura padrao, importacao como Texto e salvar/reabrir
    separadamente, com ambientes/versoes/locale/opcoes e valores observados.
  - Se formulas forem avaliadas em caminho suportado, corrigir politica,
    fixtures, aviso e contrato e retestar. Ambiente indisponivel fica pendente;
    nao declarar CA08/CA15 aprovados por testes unitarios ou mocks.
  - Dependencias: T015–T017. Evidencia: CA05/CA08/CA10–13/CA15.

- [ ] **T019 — Medir desempenho e responsividade durante geracao**
  - Usar build de producao, fixture/ambiente de T005, rodada inicial e
    repeticoes; registrar hardware, sistema, navegador e tamanho UTF-8 real.
  - Medir validacao, formatacao, protecao, serializacao e Blob, com total
    ate Blob pronto <= 5 segundos, excluindo dialogo e download externo.
  - Verificar interacao/atualizacao visual responsiva e integridade do resultado;
    exercitar casos maiores para registrar limites sem truncar dados.
  - Se houver bloqueio, ajustar processamento local e ativacao de download
    conforme T005; atualizar plano/testes e repetir medicao apos ajuste.
  - Dependencias: T011/T014/T016. Evidencia: CA16 sem alegacao de desempenho ilimitado.

- [ ] **T020 — Verificar teclado, leitura assistiva e reflow**
  - Percorrer acao, processamento, pendencias/correcao, falhas e retorno com
    teclado/leitor de tela; conferir foco e anuncios sem deslocamentos indevidos.
  - Testar 1440/1024/768/390/320 px e intermediarias, texto 200% e zoom/reflow,
    mensagens longas, fonte fallback e contraste/foco medidos.
  - Registrar ambientes/versoes, defeitos e retestes; nao aprovar ambientes ausentes.
  - Dependencias: T013/T017. Evidencia: RF07, CA14/CA18.

- [ ] **T021 — Executar checks e consolidar aceite**
  - Executar npm run typecheck, npm run build e suite configurada; conferir
    consumidores do serializador e componentes compartilhados alterados.
  - Criar quickstart.md com contrato do arquivo/listas, geracao local, dados
    sinteticos de verificacao, aviso de protecao e importacao/limites comprovados.
  - Consolidar resultados CA01–19 no documento de verificacao definido em
    T005, vinculando tarefas, ambientes, Figma, defeitos, retestes e pendencias.
  - Revisar ausencia de storage proprio, envio/log de dados, limpeza da Carta,
    formatos extras, importacao externa e promessas de salvamento/publicacao.
  - Dependencias: T014–T020. Evidencia: checks e criterios com resultado real;
    pendencias de integracao/ambiente impedem declarar aceite integral.

## Rastreabilidade

| Requisito/criterios | Tarefas principais |
| --- | --- |
| Agendamento condicional, CA19 | T002, T007, T014, T016 |
| RF01, CA01/CA17 | T001, T004, T011–T012, T017 |
| RF02, CA02–03/CA11–12 | T001, T011–T012, T016–T017 |
| RF03, CA04/CA06–07/CA09 | T001–T002, T007, T011, T014, T016–T017 |
| RF04, CA05 | T002, T009, T014, T018, T021 |
| RF05, CA08 | T003, T008, T015, T018, T021 |
| RF06, CA10–13/CA17 | T005, T010–T012, T016–T018 |
| RF07, CA14 | T004, T012–T013, T020 |
| Compatibilidade, CA15 | T003, T005, T018, T021 |
| Desempenho, CA16 | T005, T019 |
| Arquitetura/conteudo/visual, CA18 | T001, T004–T006, T012–T013, T020–T021 |

## Proximo passo

Executar `/spec:plano-implementacao 010-exportacao-csv`, consolidando contratos
reais de 007–009, formato, politica de formulas, matriz de compatibilidade,
copy e referencias Figma. Depois executar `/spec:validar` antes de
`/spec:implementar`. Esta etapa criou somente tarefas.

# Tasks: Copia de dados no tutorial

> **Baseline v3 — 16 de outubro de 2026:** projetar exclusivamente campos v3
> aplicáveis na etapa 4 da 011.

## Convencoes e status

- Base: spec.md e plan.md da 012; contratos de 007/011 e coerencia com 009/010.
- Todas as tarefas estao pendentes. Esta lista nao altera a semantica da spec,
  comprova consulta Figma, implementacao ou funcionamento real do clipboard.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  `/spec:validar` sem bloqueios relevantes.
- Copia individual na rota existente do tutorial, sem gate de obrigatorios,
  diagnostico, previa ou CSV. Instrucoes continuam consultaveis sem Carta.
- A 011 controla pagina/editorial; a 012 controla textos de transferencia,
  selecao, clipboard e retorno por campo, usando a Carta unica da 007.
- A 012 e montada somente em `fill-information`, etapa 4 da 011, node
  `564:980`; os seis botoes de copia seguem `copyLabel` do conteudo versionado.
- RF03/CA06 foram alinhados com false confirmado/null, campos condicionais e
  listas parciais. Validacao e aceite integrado permanecem pendentes.
- Specs consumidoras agora existem; notas historicas de ausencia e placeholders
  nao comprovam entrega. Mock de clipboard nao comprova permissao em browser real.

## Fase 1 — Preparacao e contratos

Registro em 2026-10-05: a revisao documental prevista em T002 foi aplicada
a RF03/CA03/CA06 da spec e consolidada em implementation-plan.md. Nenhuma
tarefa e marcada concluida: validacao cruzada/visual e integracoes reais
continuam pendentes. A nota de divergencia nas convencoes e historica.

- [ ] **T001 — Inventariar fontes e integracoes reais**
  - Conferir ERS, fontes textuais, constitution, regras de IA e contratos de
    007/009/010/011/015/016 pertinentes a sessao, listas, copia e acessibilidade.
  - Inventariar tipos/schema/decoder/provider da Carta, pagina/conteudo/rota do
    tutorial, navegacao da 002 e callsites de clipboard existentes.
  - Conferir componentes planejados/implementados da 011 e infraestrutura de
    testes; registrar lacunas sem aprovar placeholders como integracao pronta.
  - Evidencia: fontes lidas e inventario no implementation-plan; RF01–02,
    CA01/CA08/CA10/CA14.

- [ ] **T002 — Revisar explicitamente a spec e conciliar semantica**
  - Revisar RF03/CA06 da spec 012 com contrato v2/migracao da 007 e plano da
    011: false gera Não somente como resposta explicita, null fica ausente e
    existencia de outros dados nao confirma default legado.
  - Incluir os quatro campos estruturados apos agendamento, seguidos de
    orientacaoAgendamento opcional; conservar valores inativos somente na sessao.
  - Cobrir os cinco cenarios da 007 CA19–CA23 e obrigatoriedade CA24, sem impedir copia
    independente de campos ativos preenchidos.
  - Documentar listas parciais: nome/descricao util preservados, atributo null
    sem classificacao/tipo inventado e numeros de etapas com lacunas mantidos.
  - Fechar Carta com conteudo por texto util ou resposta explicita; IDs, ordem
    e defaults nao bastam. Conciliar criterios de aceite e documentos afetados.
  - Dependencia: T001. Evidencia: revisao registrada e consistente entre
    spec/plan/011; CA03–CA06 nao sao aceitos contra contrato divergente.

- [ ] **T003 — Fechar seletores e textos de transferencia**
  - Consolidar CartaTransferFieldId fechado e TransferField present com text
    ou missing, com IDs estaveis compartilhados com ancoras da 011.
  - Definir cobertura de 17 campos na ordem revisada da 012, com lista visivel
    conforme aplicabilidade e orientacoes opcionais; incluir nome popular
    (`identificacao.nomePopular`, ID `nome-popular`) separado do nome do
    servico, somente quando preenchido;
    labels/avisos/estados ficam fora da string mostrada e enviada a writeText.
  - Strings preservam espacos, acentos, Unicode e CR/LF/CRLF; trim somente
    detecta ausencia. Custo textual 0 permanece preenchido, sem conversao numerica.
  - Documentos usam Obrigatório/Opcional apenas quando informado; canais usam
    mapa versionado de tipos quando presente. Listas usam LF entre itens,
    preservam texto/ordem e omitem entradas sem nome/descricao util.
  - Definir avisos separados para itens parciais/agendamento; nao copiar IDs,
    JSON, mensagens, rotulos externos ou prefixos de protecao CSV da 010.
  - Compartilhar helpers com 009/010 apenas se convencoes forem identicas,
    preservando contratos de ausencia distintos e sem acoplamento a escape CSV.
  - Dependencia: T002. Evidencia: tabela, tipos e exemplos sinteticos fechados;
    RF03/RF06, CA01–CA06/CA13.

- [ ] **T004 — Fechar operacao de copia, corridas e duracao do retorno**
  - Definir copiarTexto com retorno success/failed, chamada por gesto explicito
    a writeText e tratamento de contexto inseguro/API ausente/rejeicao.
  - Nao ler clipboard, consultar permissao como pre-requisito ou usar fallback
    deprecated/invisivel; alternativa manual permanece independente da API.
  - Definir idle/pending/copied/failed, requestId/revisao de valor e trava
    imediata por campo. Campos distintos podem operar independentemente.
  - Confirmacao so apos promise resolvida; retorno corresponde a campo/texto/
    tentativa. Mudanca invalida retorno, sem cancelar ficticiamente a gravacao.
  - Bloquear nova gravacao do mesmo campo ate tentativa anterior terminar;
    definir operacao demorada sem supor que timeout cancela clipboard.
  - Confirmar proposta de Copiado! por 5 segundos ou ate mudanca/nova tentativa/
    desmontagem; erro permanece ate mudanca/nova tentativa. Limpar timers e
    ignorar callbacks obsoletos/desmontados, sem prometer conteudo atual permanente.
  - Dependencia: T003. Evidencia: transicoes e cenarios de corrida no plano;
    RF04–05, CA02/CA07–CA09.

- [ ] **T005 — Consultar Figma e fechar composicao/copy**
  - Consultar via MCP Design a variante da etapa 4 no
    [node 564:980](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-980&m=dev),
    em conjunto com a 011; nao usar o card da 003 como layout da pagina.
  - Consultar Make dVm7lEZdBFqOiiySWLWUqp, node 0:1; registrar tokens,
    controles selecionaveis, foco e estados vazio/valor/pending/copied/failed.
  - Confirmar o mapa que classifica `564:980` como variante, nao pagina/rota;
    registrar lacunas em vez de presumir composicao aprovada.
  - Comparar o frame com `tutorialParaibaDigitalContent.steps[3]`: dez blocos
    na ordem versionada, seis `copyLabel`, introducao, edicao e navegacao.
  - Fechar labels, Copiar {campo}, Copiado!, Não informado, estado global vazio
    e falha com instrucao de selecao manual, com acentuacao e linguagem simples.
  - Preferir textarea readOnly rotulada; nao disabled nem mensagem de ausencia
    como value. Alternativa em bloco exige prova de selecao acessivel.
  - Dependencias: T003–T004. Evidencia: consultas, copy e composicao confirmadas;
    CA04/CA07/CA11–CA12.

- [ ] **T006 — Criar plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 012-copia-dados-tutorial` consolidando
    T001–T005, arquivos, contratos e codigo base de seletores/utilitario/hook/UI.
  - Definir propriedade de CartaCopyFields/CopyField e integracao com 011,
    provider real, projecao dos IDs e acoes de edicao sem duplicacao.
  - Definir timers, revisoes/travas e cleanup, selecao manual, anuncios com
    nome de campo, layout longo e estados de recuperacao/memoria apenas.
  - Reutilizar testes de 007/011 ou definir infraestrutura significativa para
    seletores, promises/corridas e integracao, sem instalar nesta etapa.
  - Fechar matriz HTTPS de browsers/mobile da 016, verificacao sintetica do
    resultado e documento de evidencias; reuso em 015 nao carrega Carta no suporte.
  - Dependencias: T001–T005. Evidencia: implementation-plan.md completo.

- [ ] **T007 — Validar documentos antes de codigo**
  - Executar `/spec:validar 012-copia-dados-tutorial` contra ERS, MVP,
    constitution, Figma e contratos finais de 007/009–011/015/016.
  - Resolver revisao de RF03/CA06, listas, composicao, copy e corridas;
    distinguir consulta visual/documental de resultado real de clipboard.
  - Dependencia: T006. Evidencia: validacao RF01–RF06/CA01–CA18 registrada.

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

Copia individual passa a 17 campos; inserir IDs tipo-agendamento, sistema-agendamento,
link-agendamento e exibicao-agendamento imediatamente depois de agendamento, antes de
como-agendar. Nao oferecer copia para campos inativos, mesmo com valores armazenados.
Tipos ativos usam Online e/ou Presencial separados por LF; sistema/exibicao usam rotulos
da 007. Copia segue independente de validacao global, conforme contrato existente.

## Fase 2 — Seletores e copia individual

- [ ] **T008 — Implementar seletores puros de transferencia**
  - Criar carta.transfer.ts e tipos quando justificavel, com cobertura/ordem
    de T003 sobre Carta validada/migrada da 007, sem segunda Carta editavel.
  - Derivar present/missing e conteudo sem mutacao, ordenacao in-place,
    normalizacao editorial ou inferencia de atributos/defaults.
  - Uma unica string serve para exibicao selecionavel e chamada de copia;
    nao usar innerText do card/DOM nem escape/protecao do gerador CSV.
  - Dependencia: T007 e comando `/spec:implementar`.
  - Evidencia: RF03/RF06, CA01–CA06/CA13; testes em T013.

- [ ] **T009 — Implementar utilitario browser de clipboard**
  - Criar src/lib/clipboard.ts conforme T004, detectando contexto/API e
    capturando rejeicao mesmo quando disponibilidade parece correta.
  - Invocar writeText diretamente no fluxo do gesto, sem leitura da area,
    logs de valores, consulta previa obrigatoria a permissoes ou fallback oculto.
  - Retornar sucesso somente apos resolucao; indisponibilidade/recusa/erro
    devolvem falha tipada para instrucao de copia manual.
  - Dependencias: T007/T004. Evidencia: RF04–05, CA02/CA07/CA14.
  - Entrega parcial em 2026-10-05: utilitario e sete testes isolados em
    tests/clipboard.test.mjs; dependencias e verificacao de browser pendentes.
    Evidencias em verification.md; nao representa aceite da interface.

- [ ] **T010 — Implementar controlador por campo e cleanup**
  - Criar useFieldCopy ou equivalente com estado de T004 e trava imediata;
    texto/revisao/request capturados no clique, campos independentes.
  - Invalidar retorno/timer ao mudar texto e ignorar conclusoes antigas;
    tentativa pendente anterior mantem trava ate terminar sem falso cancelamento.
  - Limpar timers na nova tentativa/desmontagem e ignorar callbacks posteriores;
    timer antigo nao pode apagar confirmacao recente. Nunca copiar ao montar.
  - Permitir novas tentativas apos termino, manter selecao manual e nao mover
    foco nem limpar selecao automaticamente em sucesso/falha.
  - Dependencias: T008–T009. Evidencia: RF04–05, CA07–CA09; testes em T014.

- [ ] **T011 — Implementar campos selecionaveis e conteudo versionado**
  - Criar copia-carta.ts com labels/estados/avisos e CopyField/CartaCopyFields
    conforme T005/T006, separando texto transferivel de UI.
  - Exibir texto integral em controle readOnly rotulado, nome Copiar {campo},
    foco visivel e feedback associado; ausencia tem mensagem propria sem valor copiavel.
  - Impedir acao no campo missing ou pending com explicacao; manter preenchidos
    livres em Carta parcial. Retorno anunciado com campo, sem live regions de valores.
  - Aplicar tokens/Inter, texto longo/rolagem interna quando necessario, sem
    ellipsis, corte ou overflow da pagina; markup permanece texto literal.
  - Consumir labels, ordem e `copyLabel` de `steps[3].quickCopyFields`; nao
    duplicar textos nem transformar os 17 campos internos em 17 cards.
  - Dependencias: T008–T010/T005. Evidencia: RF03–06, CA02/CA05/CA07/CA11–CA13.

- [ ] **T012 — Integrar sessao e composicao do tutorial**
  - Montar regiao somente quando `step.id === "fill-information"`, em
    `?etapa=4`, consumindo provider real da 007, sem
    montar provider local, ler storage diretamente ou persistir dados de copia.
  - Sem conteudo, mostrar estado vazio e Preencher Carta; parcial permite
    campos presentes sem required/sugestoes/CSV como gate, mantendo instrucoes.
  - Recuperacao/memoria apenas usa dados seguros e avisos da 007; provider
    ausente e lacuna de integracao, nao motivo para criar Carta paralela.
  - Editar/retornar e atualizacoes com pagina montada rederivam valores e
    invalidam retorno. Usar `editPrompt`/`editAction` da 011 e links da 002.
  - Ao sair da etapa 4, desmontar controles/live regions, limpar timers e
    ignorar retorno tardio sem apagar a Carta; ao voltar, derivar o estado atual.
  - Nenhuma copia/navegacao limpa Carta, detecta colagem ou anuncia publicacao.
  - Dependencias: T011 e provider/composicao reais da 007/011.
  - Evidencia: RF01–02/RF06, CA01/CA04–CA05/CA08/CA10/CA14.

## Fase 3 — Testes e fechamento

- [ ] **T013 — Testar cobertura, formatacao e preservacao**
  - Usar fixtures congeladas de modelo vazio/completo/parcial, IDs/atributos
    isolados, zero, true/false explicito/null e legado migrado pela 007.
  - Conferir como agendar preservado, listas vazias/parciais, mapa de tipos,
    ordem de documentos/canais e numeros de etapas com lacunas.
  - Verificar acentos, Unicode, espacos, CR/LF/CRLF e HTML literal, fonte
    inalterada e ausencia de rotulos/avisos/IDs/prefixos CSV no texto.
  - Conferir igualdade exata entre a string derivada e o parametro de `writeText`,
    sem copiar Não informado, null/undefined ou placeholders. Na alternativa
    manual, conferir conteudo e quebras visiveis; registrar eventual normalizacao
    de CR/CRLF pelo DOM, sistema operacional ou destino, sem alterar a fonte.
  - Cobrir Online, Presencial e ambos; Paraiba Digital e sistema externo nas
    duas formas de exibicao, campos ativos vazios e inativos com texto retido.
  - Dependencia: T008/T011 e infraestrutura de T006.
  - Evidencia: CA01–CA06/CA13, conforme spec revisada em T002.

- [ ] **T014 — Testar promises, duplicidade, corridas e timers**
  - Mockar resolve/reject/API ausente/contexto inseguro: nenhum write ao
    montar e nenhum Copiado! antes de resolver ou apos rejeicao.
  - Conferir duplo clique no mesmo campo, outros campos independentes,
    conclusoes fora de ordem e feedback associado a tentativa/valor corretos.
  - Mudar valor durante pending: resposta antiga nao confirma novo valor;
    impedir gravacao concorrente do mesmo campo ate tentativa anterior terminar.
  - Cobrir nova tentativa, expiracao, erro persistente, operacao demorada,
    desmontagem/remontagem e timer antigo nao apagando retorno recente.
  - Ocultar campo externo durante pending e restaurar: limpar timers/ignorar
    feedback antigo; definir escopo da trava entre instancias antes de testar
    novas escritas concorrentes. Nao simular cancelamento da escrita no browser.
  - Conferir texto manual disponivel e ausencia de promessa de cancelamento
    ou conteudo permanente do clipboard. Mocks nao substituem T016.
  - Dependencias: T009–T011/T013. Evidencia: CA02/CA07–CA09.

- [ ] **T015 — Testar jornada e estados integrados**
  - Verificar ausencia completa da 012 nas etapas 1–3 e 5–6 e montagem unica
    em `?etapa=4`, sem duplicar campos, botoes ou live regions.
  - Conferir os dez blocos na ordem de `quickCopyFields`, copia somente nos
    seis com `copyLabel` e ausencia de valor inventado para `keywords`.
  - Abrir tutorial direto sem Carta, com Carta parcial, obrigatorios/sugestoes
    pendentes, sessao invalida/recuperada e storage indisponivel com memoria valida.
  - Editar formulario e retornar, atualizar provider com tutorial montado e
    recarregar sessao valida; conferir valores atuais e retorno invalidado.
  - Simular falha de copia mantendo instrucoes, outros campos, selecao manual
    e nova tentativa; conferir acoes compartilhadas sem duplicacao.
  - Sair da etapa 4 durante pending e apos sucesso, voltar pela URL/historico e
    confirmar cleanup do feedback, retorno tardio ignorado e Carta preservada.
  - Exibir/copiar HTML/scripts sinteticos como texto sem executar ou gerar
    requisicoes; confirmar independencia de diagnostico/previa/exportacao.
  - Alternar Sim/Nao e externo/Paraiba Digital, restaurar campos retidos e
    recarregar sessao; conferir aplicabilidade, modalidades e ambas as formas
    externas. Campos inativos nao copiam; campos ativos preenchidos continuam
    copiaveis em Carta parcial, sem confirmacao herdada de tentativa antiga.
  - Dependencias: T012/T013–T014 e features reais de 007/011.
  - Evidencia: CA01/CA04–CA05/CA07–CA10/CA13–CA18.

- [ ] **T016 — Verificar clipboard real, selecao e acessibilidade**
  - Testar writeText por gesto real em HTTPS nos navegadores Chrome/Edge/
    Firefox/Safari, incluindo mobile conforme matriz da 016 e falha/recusa.
  - Verificar resultado com texto sintetico em aplicativo de teste/controlado;
    nao implementar leitura de clipboard no produto nem usar dados reais.
  - Conferir selecao/copia manual por teclado/toque com API indisponivel,
    controle readOnly, foco e live regions com nome correto do campo.
  - Testar 1440/1024/768/390/320 px e intermediarias, texto 200%, zoom/reflow,
    fonte fallback, textos longos/multiline e contraste medido, sem corte da pagina.
  - Registrar ambientes/versoes, defeitos e retestes; ambiente indisponivel
    fica pendente, sem aceite baseado apenas em mocks.
  - Dependencias: T011–T015. Evidencia: CA02–CA03/CA07/CA09/CA11–CA12.

- [ ] **T017 — Executar checks e consolidar aceite**
  - Executar npm run typecheck, npm run build e suite configurada; conferir
    consumidores de helpers/componentes compartilhados alterados, incluindo
    015 se houver reuso real de utilitario sem dependencia da Carta.
  - Criar quickstart.md com campos/convencoes, casos sinteticos, contexto
    seguro, falhas, selecao manual e limites do retorno de copia.
  - Consolidar resultados CA01–CA18 no documento de verificacao de T006,
    com spec revisada, Figma, ambientes, defeitos, retestes e pendencias.
  - Conferir ausencia de leitura de clipboard, logs/envio dos valores,
    storage proprio, segunda Carta, copia integral, arquivos e automacao externa.
  - Dependencias: T013–T016. Evidencia: checks e criterios com resultados reais;
    revisao documental/integracoes/ambientes ausentes impedem aceite integral.

## Rastreabilidade

| Requisito/criterios | Tarefas principais |
| --- | --- |
| Agendamento condicional, CA15 | T002, T008, T013, T015 |
| Integracao etapa 4/Figma, CA16–CA18 | T005–T006, T011–T012, T014–T017 |
| RF01, CA14 | T001, T006, T012, T015, T017 |
| RF02, CA01/CA08/CA10 | T001, T008, T010, T012, T015 |
| RF03, CA02–CA03/CA06 | T002–T003, T008, T011, T013, T016 |
| RF04, CA02/CA08–CA09 | T004, T009–T010, T014, T016 |
| RF05, CA07 | T004–T005, T009–T011, T014–T016 |
| RF06, CA04–CA05 | T002–T003, T011–T013, T015 |
| Acessibilidade/reflow, CA11–CA12 | T005–T006, T011, T016 |
| Texto seguro, CA13 | T003, T008, T011, T013, T015 |

## Proximo passo

Executar `/spec:plano-implementacao 012-copia-dados-tutorial`, consolidando
revisao de RF03/CA06, contratos de 007/011, seletores, corridas, copy e Figma.
Depois executar `/spec:validar` antes de `/spec:implementar`.
Esta etapa criou somente tarefas.

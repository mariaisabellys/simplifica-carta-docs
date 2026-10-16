# Spec: Exportacao CSV

> **Dependência atualizada em 16 de outubro de 2026:** exportar o modelo v3 da
> 007; tabelas v2 abaixo devem ser reconciliadas antes do aceite funcional.

## Objetivo

Permitir que o servidor exporte as informacoes atuais da Carta de Servicos em
um arquivo CSV gerado localmente, depois de conferir os campos obrigatorios,
para apoiar o cadastro manual no Paraiba Digital e o uso interno dos dados.

## Problema e contexto

O usuario precisa retirar do aplicativo os dados preparados sem transcrever
campos ou perder listas de documentos, etapas e canais. A exportacao deve
representar a Carta atual, distinguir valores ausentes e produzir um arquivo
legivel em ferramentas de planilha.

Conforme ADR-002, CSV e o formato de exportacao do MVP. A previa HTML permanece
um recurso de revisao. O arquivo nao e comprovante de aprovacao nem formato de
importacao homologado pelo Paraiba Digital; o cadastro oficial continua manual.

## Usuarios impactados

- Servidor que prepara e revisa a Carta e precisa conservar uma copia externa.
- Servidor responsavel pelo cadastro manual na plataforma oficial.
- Equipe GESED, que orienta a consistencia dos dados exportados.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: CSV local,
  obrigatorios antes da exportacao e cadastro manual.
- `docs/decisoes/adr-002-exportacao-csv.md`: formato oficial de exportacao do MVP.
- `docs/produto/mvp.md` e `fluxos.md`: jornada e limites de integracao externa.
- `docs/arquitetura/decisoes-tecnicas.md` e `arquitetura-sistema.md`:
  processamento no navegador e sessao temporaria.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  conteudo versionado e consulta visual antes da implementacao.
- Specs 007, 008, 009 e 012: fonte unica da Carta, contratos adicionais,
  obrigatoriedade, previa parcial e copia independente.
- `src/features/carta/carta.csv.ts`, `carta.types.ts`, `carta.schema.ts` e
  `carta.validation.ts`: modelo, exportador e validacao iniciais.
- `src/lib/csv.ts`: serializacao inicial com cabecalho `campo,valor`, virgula,
  aspas e quebra de linha; cobertura e robustez ainda precisam evoluir.
- `docs/design-system/mapa-figma-telas.md`: referencia da previa `821:308`.

Esta spec utiliza fontes textuais locais. Nao declara leitura do PDF do ERS,
consulta direta ao Figma, testes com planilhas ou homologacao externa do CSV.

## Requisitos funcionais

### RF01 — Acao e acesso

- Disponibilizar `Exportar CSV` no fluxo da previa em `/previa`, integrado a
  009, sem criar rota independente apenas para download.
- Iniciar a exportacao somente por acao explicita do usuario, nunca ao abrir
  pagina, editar campo ou concluir diagnostico.
- Nao exigir login, diagnostico concluido, lista marcada ou aceite de
  sugestoes de linguagem simples.
- Explicar que o arquivo contem os dados preparados e que o cadastro e a
  publicacao continuam manuais. Nao sugerir importacao automatica no Paraiba Digital.

### RF02 — Validacao anterior a geracao

- Avaliar os valores atuais com a mesma fonte de obrigatoriedade da 008 antes
  de gerar ou iniciar o download.
- Impedir exportacao se houver obrigatorios ausentes, nulos, incompatíveis ou
  contendo apenas espacos. O conjunto inicial e nome, descricao, publico-alvo,
  prazo e custos, acrescido das regras condicionais de tipo/sistema com Sim e
  link/exibicao com sistema externo, conforme 007/008.
- Apresentar pendencias identificadas por campo e oferecer retorno para
  correcao em `/formulario-carta`, preservando dados. Nao gerar arquivo parcial
  silenciosamente quando um obrigatorio estiver ausente.
- Nome popular e informacoes adicionais continuam opcionais. Nao adicionar
  bloqueio universal para todos os assuntos da Carta.
- Sugestoes editoriais nao impedem exportacao. Nao exigir aceita-las ou
  dispensa-las e nao modificar textos antes de exportar.
- Se a validacao obrigatoria falhar tecnicamente, informar falha e impedir
  geracao, sem tratar erro de processamento como Carta valida.
- A indisponibilidade da exportacao nao bloqueia previa, edicao, ajuda,
  tutorial ou copia individual de campos preenchidos.

### RF03 — Fonte de dados e cobertura

- Usar a mesma Carta da sessao consumida pelo formulario e pela previa.
  Capturar os valores atuais ao iniciar a operacao; validacao e serializacao
  devem avaliar essa mesma versao, sem mistura de alteracoes durante a geracao.
- Uma nova exportacao apos edicao deve usar os novos valores. Nao manter
  cache de arquivo anterior nem modificar ou limpar a Carta ao exportar.
- Cobrir todas as informacoes abaixo, inclusive listas omitidas pelo helper atual.

| Informacao | Referencia na Carta | Representacao de referencia |
| --- | --- | --- |
| Nome do servico | `identificacao.nome` | Texto informado. |
| Nome popular | `identificacao.nomePopular` | Texto opcional, vazio se ausente. |
| Descricao | `identificacao.descricao` | Texto integral. |
| Publico-alvo | `identificacao.publicoAlvo` | Texto integral. |
| Criterios de acesso | `requisitos.criterios` | Texto informado ou vazio. |
| Documentos | `requisitos.documentos` | Um documento por linha no valor do campo, com nome e obrigatorio/opcional quando informado. |
| Etapas | `etapas` | Uma etapa por linha no valor do campo, com ordem e descricao. |
| Prazo | `atendimento.prazo` | Texto integral. |
| Custos | `atendimento.custo` | Texto integral, preservando `0` e gratuidade explicita. |
| Canais | `atendimento.canais` | Um canal por linha no valor do campo, com tipo em linguagem simples e descricao. |
| Necessita de agendamento? | `atendimento.exigeAgendamento` | Sim ou Nao quando explicitamente informado; vazio quando nao informado. |
| Tipo de agendamento | `atendimento.tiposAgendamento` | Online, Presencial ou ambos; obrigatorio com Sim. |
| Sistema de agendamento | `atendimento.sistemaAgendamento` | Paraiba Digital ou Outro sistema ou site; escolha unica obrigatoria com Sim. |
| Link do agendamento | `atendimento.linkAgendamento` | URL obrigatoria somente para Outro sistema ou site. |
| Como o agendamento sera exibido? | `atendimento.exibicaoAgendamento` | Dentro do Paraiba Digital ou Em uma nova pagina; escolha unica obrigatoria somente para Outro sistema ou site. |
| Orientacoes de agendamento | `atendimento.orientacaoAgendamento` | Texto opcional somente com Sim; vazio quando inativo. |
| Informacoes adicionais | `informacoesComplementares` | Texto informado ou vazio. |

- Preservar ordem dos documentos e canais e sequencia valida das etapas
  definida no formulario. Nao ordenar listas de modo diferente da previa.
- Nao inferir ausencia de documentos, gratuidade ou Nao de agendamento a
  partir de campos vazios ou defaults. Um `false` legado sem resposta confirmada
  segue o tratamento de migracao de 007.
- Itens totalmente vazios nao geram linhas ficticias. Itens parciais com texto
  util devem preservar esse texto sem inventar tipo ou classificacao; definir
  a convencao de atributo ausente no planejamento em conjunto com 007–009.
- Nao incluir exemplos, placeholders, mensagens de erro, sugestoes, elementos
  da interface ou resultados de validacao como dados exportados.
- Conciliar nome popular, agendamento nao informado e orientacao de como
  agendar com o modelo final da 007 antes de implementar.

### RF04 — Contrato do arquivo CSV

- Adotar como base o formato local existente de duas colunas `campo` e
  `valor`, com uma linha por informacao da tabela. Manter campos opcionais
  ausentes com valor vazio, sem texto ficticio `Nao informado`.
- Definir e documentar no planejamento os identificadores estaveis das linhas,
  sua ordem e a representacao das listas. Nao afirmar equivalencia com schema
  de importacao da plataforma externa.
- Usar codificacao UTF-8 e manter caracteres acentuados legiveis. Definir no
  planejamento o uso de BOM, delimitador e terminadores de registro, com
  verificacao nas ferramentas de planilha escolhidas.
- O helper usa virgula; eventual mudanca de delimitador deve ser explicita e
  documentada. Nao produzir arquivos diferentes conforme heuristica oculta
  de idioma ou navegador.
- Escapar corretamente o delimitador adotado, aspas duplas e quebras CR, LF e
  CRLF. Dobrar aspas internas e delimitar a celula quando necessario, garantindo
  duas colunas por registro logico mesmo com valores multilinha.
- Preservar texto integral, acentos e quebras de linha sem truncamento,
  normalizacao editorial ou conversao automatica de custos e prazos em numeros.
- Representar listas como texto legivel dentro da celula, sem JSON ou HTML.
  A apresentacao de dados em planilhas pode depender da configuracao de
  importacao; nao prometer tipos ou formatacao que CSV nao define no contrato.
- Usar extensao `.csv` e nome de arquivo deterministico e seguro. Definir a
  convencao no planejamento; o nome nao pode conter separadores de caminho ou
  caracteres de controle vindos do texto digitado.

### RF05 — Conteudo interpretavel como formula

- Definir no planejamento uma politica explicita para valores que possam ser
  interpretados como formulas em planilhas, incluindo prefixos `=`, `+`, `-`
  e `@` e caracteres iniciais de controle ou espaco que afetem a interpretacao.
- Nao considerar o escape de aspas do CSV, isoladamente, como neutralizacao
  de formula. Verificar a politica nas ferramentas de planilha suportadas.
- Tratar esses valores como texto no artefato exportado, sem executa-los,
  criar formulas intencionalmente ou alterar a Carta mantida na sessao.
- Se a protecao exigir prefixo ou outra transformacao no arquivo, documentar
  e comunicar essa excecao de representacao de modo breve. Preservacao da
  redacao na fonte continua obrigatoria; nao prometer igualdade literal do
  arquivo quando a protecao acrescentar caracteres.
- Nao impedir exportacao de todo texto legitimo apenas por iniciar com esses
  caracteres. Conciliar seguranca, legibilidade e preservacao no contrato e
  nos casos de teste antes da implementacao.

### RF06 — Geracao, download e retorno

- Gerar o arquivo localmente no navegador e solicitar seu download, sem envio
  da Carta a backend ou plataforma externa.
- Indicar processamento e evitar acionamentos duplicados enquanto a mesma
  operacao estiver em andamento. Permitir nova exportacao depois da conclusao.
- Anunciar download iniciado apenas depois de gerar o arquivo e solicitar a
  operacao ao navegador. Nao afirmar que o arquivo foi salvo no dispositivo,
  aberto ou publicado quando o aplicativo nao tem essa confirmacao.
- Em falha de geracao ou de acionamento do download, apresentar mensagem
  clara e permitir tentar novamente, mantendo todos os dados e a navegacao.
- Usar a Carta valida em memoria mesmo quando armazenamento de sessao estiver
  indisponivel. Dados ausentes ou invalidos devem seguir o tratamento da 007
  e a validacao da 008, sem gerar arquivo corrompido.
- Liberar recursos temporarios usados no download depois de seu uso, sem
  invalidar prematuramente o arquivo nem acumular recursos a cada tentativa.
- Nao apagar a sessao apos exportar. O usuario pode seguir ao tutorial e copiar
  os mesmos dados, ou editar e exportar novamente.
- O arquivo baixado fica sob controle do usuario fora do aplicativo; o limite
  de sessao do app nao implica exclusao do arquivo do dispositivo.

### RF07 — Conteudo e acessibilidade da acao

- Manter rotulos, avisos, mensagens de processamento, falha e pendencias em
  conteudo versionado, separado da apresentacao visual.
- Oferecer botao com nome acessivel `Exportar CSV`, foco visivel e acionamento
  por teclado. Processamento e bloqueio devem ser compreensiveis sem depender
  apenas de cor, icone ou botao desabilitado sem explicacao.
- Anunciar pendencias e retorno da operacao a leitores de tela, preservando
  foco coerente e acesso ao formulario para correcao.

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

## Requisitos nao funcionais

- Funcionar sem backend, login, persistencia permanente no app ou transmissao
  dos dados da Carta a terceiros. Nao registrar valores em logs ou telemetria.
- Gerar o CSV em ate 5 segundos no ambiente e conjunto representativo de dados
  definidos para verificacao, conforme a meta local do MVP. Registrar os
  parametros de medicao no planejamento, sem alegar desempenho ilimitado.
- Nao bloquear a interface durante geracao; definir limites tecnicos de
  processamento sem truncar silenciosamente dados.
- Verificar download em Chrome, Edge, Firefox e Safari, incluindo dispositivo
  movel e falhas simuladas de geracao ou download.
- Verificar importacao e caracteres nas ferramentas de planilha escolhidas
  no planejamento, incluindo valores multilinha e protecao de formulas.
- Manter mensagens e acoes utilizaveis em desktop, tablet, smartphone e com
  ampliacao de texto, sem corte ou rolagem horizontal da pagina.
- Reutilizar componentes, tokens e Inter com os fallbacks do projeto.

## Referencias visuais e pendencias

A acao integra `/previa`; o mapa local referencia o cartao `821:308`, sem
comprovar nesta etapa o layout da acao de exportacao e seus estados.

Antes de implementar os estados visuais, consultar via MCP o Figma Design
`YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e o Figma Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Identificar a acao no fluxo da previa e
registrar nodes, estados, mensagens e responsividade no `implementation-plan.md`.
Resolver divergencias sem criar pagina de exportacao ou ampliar escopo por analogia.

O planejamento deve conciliar ERS, contratos de 007–009, formato exato do CSV,
representacao das listas parciais, codificacao, compatibilidade, nome de arquivo,
politica de formulas e parametros da meta de desempenho antes do codigo.

## Fora de escopo

- Importar CSV, preencher ou publicar automaticamente no Paraiba Digital.
- Exportar XLSX, PDF, HTML, ZIP ou varios arquivos por Carta.
- Criar formulas, macros, estilos de planilha ou templates de plataforma externa.
- Enviar arquivo por e-mail, compartilhar publicamente ou registrar historico.
- Editar a Carta, implementar previa completa ou copia individual no tutorial.
- Login, multiplas Cartas, armazenamento permanente no aplicativo ou backend.
- Garantir aprovacao institucional, aceite externo ou tipos de celula definidos
  automaticamente por qualquer aplicativo de planilha.

## Dependencias

- `001-fundacao-do-projeto`: modelo, serializacao e validacao iniciais.
- `007-formulario-carta-servico`: Carta atual e contratos finais dos campos.
- `008-validacao-linguagem-simples`: obrigatoriedade compartilhada e sugestoes
  que nao bloqueiam exportacao.
- `009-previa-html`: ponto de entrada, pendencias e retorno para edicao.
- `011-tutorial-paraiba-digital` e `012-copia-dados-tutorial`: continuidade
  depois da exportacao, sem tornar download requisito para acesso ou copia.
- `016-responsividade-acessibilidade`: alinhamento transversal, sem adiar os
  requisitos da acao de exportacao.
- Conciliacao com ERS, consulta visual e validacao do contrato do arquivo.

Na criacao desta spec, 011 e 016 ainda nao possuem pastas em `specs/`.
O helper CSV inicial nao cobre listas, nome popular ou orientacao de agendamento
e nao implementa o fluxo de download. Sua existencia nao comprova esta feature
concluida nem compatibilidade testada com planilhas.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Acionar `Exportar CSV` com obrigatorios preenchidos. | Gerar localmente um arquivo `.csv` com a versao atual validada da Carta. |
| CA02 | Tentar exportar com obrigatorio vazio, apenas espacos ou invalido. | Impedir arquivo e identificar pendencias pelas mesmas regras da 008, com retorno a edicao. |
| CA03 | Exportar com sugestoes de linguagem simples pendentes. | Permitir operacao quando obrigatorios estiverem preenchidos, sem reescrever texto. |
| CA04 | Exportar Carta com todas as informacoes e varias listas. | Incluir toda a tabela, atributos e ordem, sem omitir documentos, etapas ou canais. |
| CA05 | Usar acentos, aspas, delimitador e quebras CR, LF e CRLF. | Recuperar valores legiveis e duas colunas por registro logico ao ler o arquivo conforme contrato. |
| CA06 | Exportar custo `0`, campos opcionais vazios e agendamento nao informado. | Preservar `0`, exportar ausencias vazias e nao inferir gratuidade ou Nao. |
| CA07 | Exportar listas com itens vazios e parciais. | Omitir itens totalmente vazios, preservar texto util e nao inventar atributos. |
| CA08 | Exportar valores potencialmente interpretaveis como formulas. | Aplicar politica documentada e verificada nas planilhas suportadas, sem alterar a Carta. |
| CA09 | Editar depois de exportar e exportar novamente. | Gerar valores atualizados sem reutilizar arquivo obsoleto ou limpar sessao. |
| CA10 | Acionar repetidamente durante processamento. | Evitar downloads duplicados da mesma operacao e permitir nova tentativa apos conclusao. |
| CA11 | Simular falha de validacao, geracao ou download. | Informar falha, nao anunciar sucesso e preservar dados; falha de validacao nao libera exportacao. |
| CA12 | Usar armazenamento indisponivel com Carta valida em memoria. | Exportar os valores atuais sem exigir persistencia; dados invalidos nao geram arquivo corrompido. |
| CA13 | Concluir geracao e solicitar download. | Anunciar somente download iniciado, sem afirmar salvamento no dispositivo ou publicacao. |
| CA14 | Usar a acao e corrigir pendencias por teclado e leitor de tela. | Identificar botao, processamento, erros e destinos com foco coerente. |
| CA15 | Exportar em navegadores e importar nas planilhas definidas no plano. | Validar codificacao, listas, multilinhas, delimitador e politica de formulas com resultados registrados. |
| CA16 | Medir geracao com conjunto representativo no ambiente definido. | Atender meta de ate 5 segundos sem truncar dados nem bloquear a interface. |
| CA17 | Seguir ao tutorial ou voltar ao formulario apos exportar. | Preservar a mesma Carta e permitir continuar sem historico ou persistencia permanente no app. |
| CA18 | Revisar arquitetura, mensagens e estados visuais. | Encontrar geracao local, conteudo versionado, consultas Figma registradas e ausencia de integracao externa ou formatos extras. |
| CA19 | Consultar ou transferir dados em Nao/Sim, Paraiba Digital, externo dentro/fora e apos troca de sistema. | Respeitar configuracoes ativas conforme 007 CA19–CA24; nao apresentar ou transferir valores inativos preservados na sessao; aplicar apenas validacao prevista por esta feature. |

## Proximo passo

Executar `/spec:planejar 010-exportacao-csv` para definir contrato do arquivo,
validacao, download, compatibilidade e testes. Depois, criar tarefas e
`implementation-plan.md`, resolver pendencias e executar `/spec:validar`
antes de `/spec:implementar`.

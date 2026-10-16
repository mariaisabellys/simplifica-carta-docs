# Spec: Formulario da Carta de Servicos

> **Contrato oficial atualizado em 16 de outubro de 2026:** o conteúdo anterior
> foi substituído. O modelo vigente está em `modelo-central-carta.md` e nos
> contratos v3. Tabelas abaixo com paths ou campos incompatíveis são históricas.

## Objetivo

Permitir que o servidor preencha e revise as informacoes da Carta de Servicos
em um formulario dividido em partes, com orientacoes de apoio e dados mantidos
temporariamente durante a sessao, preparando a revisao, a exportacao e o
cadastro manual no Paraiba Digital.

## Problema e contexto

Depois de reunir as informacoes do servico, o servidor precisa transforma-las
em dados claros e estruturados sem perder o trabalho ao consultar outras
etapas. Um formulario unico sem organizacao ou orientacoes dificulta a leitura,
o preenchimento e a identificacao de informacoes ainda pendentes.

Esta funcionalidade corresponde a etapa de elaboracao da Carta. Sucede o
diagnostico e a organizacao das informacoes no fluxo completo, mas tambem deve funcionar por
acesso independente, sem exigir diagnostico ou conclusao da lista da feature
006. O formulario prepara os dados; nao cadastra nem publica na plataforma
oficial e nao representa aprovacao pela GESED.

## Usuarios impactados

- Servidor responsavel pelo levantamento e pela redacao da Carta.
- Servidor responsavel pelo cadastro manual no Paraiba Digital, que precisa
  revisar e transferir os dados preparados.
- Equipe GESED, que precisa manter orientacoes e campos consistentes.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: formulario
  dividido em partes, sessao temporaria e limites de validacao e exportacao.
- `docs/produto/mvp.md`, `escopo.md`, `personas.md` e `fluxos.md`: usuarios,
  jornada e acesso independente.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  conteudo versionado e consulta visual antes da implementacao.
- `docs/arquitetura/arquitetura-sistema.md` e `decisoes-tecnicas.md`: dados da
  Carta no navegador, sem backend ou persistencia permanente.
- `docs/design-system/mapa-figma-telas.md` e `tokens-e-componentes.md`:
  referencias documentadas para formulario e componentes.
- `specs/006-organizar-informacoes/spec.md` e `plan.md`: assuntos a levantar,
  acesso sem bloqueio e preservacao da Carta.
- `specs/012-copia-dados-tutorial/spec.md`: consumo da mesma Carta, incluindo
  nome popular, dados parciais e retorno para edicao.
- `src/app/routes.tsx`, `src/pages/FormularioCartaPage.tsx` e
  `src/components/forms/FormField.tsx`: rota e componentes iniciais.
- `src/features/carta/carta.types.ts`, `carta.schema.ts`, `carta.validation.ts`
  e `carta.storage.ts`: contratos iniciais, ainda sujeitos a conciliacao.

Esta spec utiliza fontes textuais locais. Nao declara leitura do PDF do ERS,
consulta direta ao Figma ou homologacao dos campos atuais do Paraiba Digital.

## Requisitos funcionais

### RF01 — Acesso e integracao

- Disponibilizar o formulario em `/formulario-carta`, pela navegacao
  compartilhada, etapa de elaboracao em `/explorar-por-etapas`, acao
  `Preencher Carta` da 006 e URL direta, inclusive apos recarga.
- Nao exigir diagnostico, lista marcada, login, previa ou exportacao anterior.
- Reutilizar header e footer compartilhados, indicar a pagina atual na
  navegacao quando houver item correspondente e apresentar breadcrumb com
  retorno ao inicio.
- Exibir titulo e introducao em linguagem simples, explicando que os dados
  sao temporarios e que o cadastro oficial sera feito manualmente.

### RF02 — Formulario dividido em partes

Organizar os campos nas partes abaixo, com titulos e orientacoes identificaveis:

| Parte | Informacoes |
| --- | --- |
| Identificacao do servico | Nome, nome popular, descricao e publico-alvo. |
| Requisitos de acesso | Criterios de acesso e documentos necessarios. |
| Etapas do servico | Sequencia de acoes do pedido ate a conclusao. |
| Atendimento | Prazo, custos, canais e agendamento. |
| Informacoes adicionais | Orientacoes complementares ao cidadao. |

- Permitir consultar e editar todas as partes sem exigir completude da parte
  anterior. A divisao organiza o preenchimento, sem criar uma barreira de acesso.
- Preservar dados ao mudar de parte, retornar ou consultar orientacoes.
- Renderizar uma parte ativa por vez conforme as cinco telas mapeadas, sem
  criar cinco rotas nem exigir completar a parte anterior. Identificar a parte
  atual semanticamente e preservar a Carta ao navegar entre elas.
- Nao tratar mudanca de parte ou preenchimento como aprovacao da Carta.

### RF03 — Campos e contrato de dados

Cobrir os campos abaixo com rotulos claros, controles adequados e orientacoes
versionadas. Os paths servem de referencia tecnica e nao aparecem na interface.

| Campo | Contrato de referencia | Comportamento |
| --- | --- | --- |
| Nome do servico | `identificacao.nome` | Texto que identifica o servico. |
| Nome popular do servico | `identificacao.nomePopular` | Texto opcional com nome alternativo ou mais conhecido pelo cidadao, quando aplicavel; complementa o nome do servico sem substitui-lo. |
| Descricao do servico | `identificacao.descricao` | Texto com finalidade e o que e oferecido ao cidadao. |
| Publico-alvo | `identificacao.publicoAlvo` | Texto indicando quem pode utilizar o servico. |
| Criterios de acesso | `requisitos.criterios` | Condicoes para utilizar o servico, quando aplicaveis. |
| Documentos necessarios | `requisitos.documentos` | Lista de nomes de documentos e classificacao obrigatorio/opcional. |
| Etapas do servico | `etapas` | Lista ordenada com descricao de cada etapa. |
| Prazo | `atendimento.prazo` | Texto com estimativa e condicoes relevantes, sem prazo inventado. |
| Custos | `atendimento.custo` | Texto com gratuidade explicita ou valores e condicoes aplicaveis. |
| Canais de atendimento | `atendimento.canais` | Lista com tipo e descricao de acesso ao canal. |
| Necessita de agendamento? | `atendimento.exigeAgendamento` | Escolha explicita entre Sim e Nao; inicialmente nao informado. |
| Tipo de agendamento | `atendimento.tiposAgendamento` | Online, Presencial ou ambos; obrigatorio com Sim. |
| Sistema de agendamento | `atendimento.sistemaAgendamento` | Paraiba Digital ou Outro sistema ou site; escolha unica obrigatoria com Sim. |
| Link do agendamento | `atendimento.linkAgendamento` | URL obrigatoria somente para Outro sistema ou site. |
| Como o agendamento sera exibido? | `atendimento.exibicaoAgendamento` | Dentro do Paraiba Digital ou Em uma nova pagina; escolha unica obrigatoria somente para Outro sistema ou site. |
| Orientacoes de agendamento | `atendimento.orientacaoAgendamento` | Texto complementar opcional, somente com Sim. |
| Informacoes adicionais | `informacoesComplementares` | Texto complementar, opcional. |

- `nomePopular` ainda nao existe no tipo inicial; sua inclusao opcional deve
  ser conciliada com schema, sessao e consumidores, atendendo a spec 012.
- O booleano inicial `false` nao representa resposta do usuario. O contrato
  deve distinguir nao informado, Sim e Nao e adaptar os consumidores; nao
  converter ausencia de resposta em Nao.
- Preservar orientacoes complementares na mesma Carta, sem substituir os campos estruturados.

- A pergunta deve ser **Necessita de agendamento?**, sem resposta preselecionada.
- Com Sim, exigir **Tipo de agendamento**, com selecao de Online, Presencial ou ambos, e
  **Sistema de agendamento**, com escolha unica entre Paraíba Digital e Outro sistema ou
  site.
- Paraíba Digital registra agendamento pelo proprio Paraiba Digital. Nao mostrar nem
  exigir Link do agendamento ou Como o agendamento será exibido?.
- Outro sistema ou site mostra e exige **Link do agendamento** (URL do sistema externo,
  por exemplo `https://agendamento.orgao.pb.gov.br`) e **Como o agendamento será
  exibido?**, com escolha unica.
- **Dentro do Paraíba Digital** registra que o cidadao permanece dentro da experiencia
  do Paraiba Digital durante todo o agendamento, com exibicao/integracao externa e sem
  redirecionamento. **Em uma nova página** registra redirecionamento para a URL externa
  informada.
- Com Nao ou nao informado, ocultar todas as configuracoes especificas de agendamento.
  Com Paraiba Digital, ocultar somente as configuracoes externas. Campos inativos nao
  sao obrigatorios.
- Preservar valores condicionais anteriormente preenchidos na sessao, sem apagamento
  silencioso, mas nao apresenta-los na previa, CSV ou copia como configuracao aplicavel.
  Reativar os valores para revisao quando a condicao voltar a ser selecionada.
- Orientacoes de agendamento continuam opcionais, visiveis e transferiveis somente com
  Sim; nao substituem Tipo, Sistema, Link ou Exibicao.
- Trata-se de uma unica configuracao com dois fluxos, independente dos canais de
  atendimento. Simplifica Carta registra a configuracao para cadastro posterior; nao
  executa o agendamento nem integra sistemas externos nesta feature.

```text
Necessita de agendamento?
└── Sim
    ├── Tipo de agendamento: Online, Presencial ou ambos
    └── Sistema de agendamento
        ├── Paraíba Digital
        │   └── Agendamento realizado pelo próprio Paraíba Digital
        └── Outro sistema ou site
            ├── Link do agendamento
            └── Como o agendamento será exibido?
                ├── Dentro do Paraíba Digital: cidadão permanece na experiência
                └── Em uma nova página: cidadão é redirecionado para a URL externa
```

- Para canais, cobrir os tipos locais online, presencial, telefone, e-mail e
  outro, com descricao que comporte endereco ou instrucoes conforme o caso.
- Nao presumir que documentos vazios significam ausencia de exigencia, custo
  vazio significa gratuidade ou criterio vazio significa acesso irrestrito.
  Orientar a confirmacao junto ao setor responsavel quando a informacao faltar.
- Nao coletar anexos ou documentos pessoais do cidadao. O campo documentos
  registra as exigencias do servico, sem upload.
- Preservar acentos, pontuacao e quebras de linha. Exemplos e placeholders
  nunca se tornam valores preenchidos automaticamente.

### RF04 — Edicao de listas

- Permitir adicionar, editar e remover documentos, etapas e canais de
  atendimento durante a sessao.
- Cada documento deve ter nome e escolha explicita de obrigatorio ou
  opcional, sem inferir sua classificacao pela posicao.
- Cada canal deve ter tipo e descricao de acesso, com rotulos compreensiveis.
- Permitir definir e alterar a sequencia das etapas por controles acessiveis,
  sem depender de arrastar com mouse. Manter ordem coerente apos adicao,
  remocao ou reorganizacao, sem numeros duplicados ou lacunas no resultado.
- Remover um item nao pode alterar os valores dos demais. Acoes devem
  identificar o item afetado e manter foco em posicao coerente.
- Itens ainda vazios podem existir durante a edicao, mas nao devem ser
  apresentados aos consumidores como informacoes validas ou inventadas.
  Definir seu tratamento na revisao sem descartar silenciosamente texto util.

### RF05 — Orientacoes e validacao

- Oferecer orientacao concreta para cada campo e identificar exemplos como
  ilustrativos. Se houver painel expansivel, usar controle com estado
  anunciado, sem apagar ou alterar o valor ao abrir e fechar.
- Derivar a orientacao do item correspondente em
  `src/content/pages/organizar-informacoes.ts`, mantendo fonte unica para
  resumo, identificacao, evite/prefira, exemplos e dicas.
- Suportar o Form-Card compacto (`811:306`) e com orientacao aberta (`811:382`).
  Usar `aria-expanded` e associacao ao painel; campos sem orientacao mapeada
  permanecem compactos e nao recebem texto inventado.
- Identificar campos obrigatorios por texto e semantica, sem depender apenas
  de asterisco ou cor. Manter rotulos, ajuda e mensagens associados ao controle.
- Usar como referencia inicial de obrigatoriedade nome, descricao,
  publico-alvo, prazo e custos, conforme `camposObrigatoriosCarta`. Nome
  popular e informacoes adicionais sao opcionais nesta spec.
- Nao ampliar obrigatoriedade para todos os assuntos por analogia. Regras
  institucionais adicionais e verificacao das listas devem
  ser conciliados com ERS e 008 no planejamento e registrados antes do codigo.
- Ao solicitar revisao, identificar campos obrigatorios vazios ou contendo
  apenas espacos, apresentar mensagens claras e permitir localizar e corrigir
  os campos, inclusive em outra parte do formulario.
- Erros nao podem impedir edicao, consulta de ajuda, mudanca de parte ou
  manutencao de dados parciais. O bloqueio de exportacao com obrigatorios
  ausentes pertence ao contrato de 010, consumindo as regras compartilhadas.
- Integrar os pontos de exibicao da validacao e das sugestoes da feature 008,
  sem criar nesta feature um motor de linguagem simples ou regras divergentes.
  Sugestoes sao orientativas e nunca substituem textos automaticamente.
- Nao anunciar que uma Carta sem erros locais foi aprovada ou sera aceita na
  plataforma externa.

### RF06 — Sessao temporaria e continuidade

- Manter uma unica Carta da sessao, compartilhada com previa, exportacao e
  copia no tutorial. Edicoes devem atualizar essa fonte, sem versoes editaveis
  independentes em cada pagina.
- Preservar os dados ao navegar para organizacao, ajuda, previa ou tutorial e
  retornar ao formulario na mesma sessao. Abrir a pagina nao reinicializa a Carta.
- Preservar dados em recargas quando o armazenamento temporario de sessao
  estiver disponivel. Explicar o limite de sessao sem prometer rascunho
  permanente, recuperacao futura ou sincronizacao entre abas e dispositivos.
- Se armazenamento estiver indisponivel, manter o formulario utilizavel em
  memoria e informar que os dados podem ser perdidos ao recarregar ou fechar.
- Dados armazenados ausentes, malformados ou incompatíveis nao podem derrubar
  a pagina. Validar a estrutura restaurada, aproveitar apenas dados seguros e
  compativeis e informar quando nao for possivel recuperar o preenchimento.
- A migracao dos contratos deve aceitar sessoes anteriores sem `nomePopular`
  ou orientacao de agendamento. Um `false` legado sem evidencia de resposta
  explicita deve ser tratado como nao informado, sem inventar confirmacao.
- Nao limpar automaticamente a Carta ao sair, mudar de parte ou abrir ajuda.
  Esta spec nao exige acao para apagar toda a Carta.

### RF07 — Revisao e proximos passos

- Oferecer acao para revisar as informacoes na rota `/previa`, mantendo os
  valores atuais. Permitir revisar uma Carta parcial, identificando pendencias
  sem obrigar o usuario a completar todos os campos para consultar a previa.
- Disponibilizar acesso a `Preciso de ajuda` em `/ajuda`, reutilizando a acao
  compartilhada quando existir, sem duplicar formulario de suporte.
- Permitir retorno de `/previa` e do tutorial para editar a mesma Carta.
- Quando houver previa dentro das telas do formulario, reutilizar o componente
  `821:308` e a mesma projecao de dados da 009. Nao criar snapshot, seletor ou
  markup de previa paralelo dentro da 007.
- Nao implementar geracao de previa, exportacao CSV ou copia como parte da
  007. Os consumidores devem receber um contrato documentado e consistente.

### RF08 — Conteudo versionado

- Manter titulos, rotulos, orientacoes, exemplos e mensagens editoriais fora
  da apresentacao visual, seguindo a organizacao de `src/content/`.
- Permitir revisao editorial sem alterar a navegacao ou as regras do estado.
- Preservar linguagem simples e acentuacao na interface final.
- Registrar a necessidade de validacao institucional dos textos e regras;
  esta spec nao declara copy nem equivalencia com o Paraiba Digital homologadas.

## Requisitos nao funcionais

- Executar preenchimento e validacao localmente, sem backend, login, envio de
  dados da Carta a servicos externos ou persistencia permanente.
- Nao registrar valores preenchidos em logs ou telemetria.
- Tratar entradas como texto, sem executar HTML ou scripts.
- Funcionar por teclado e leitor de tela, com foco visivel, labels associados,
  agrupamentos semanticos e anuncio de erros e alteracoes relevantes nas listas.
- Manter ordem de leitura coerente; controles de listas e painéis de ajuda
  devem ter nomes e estados acessiveis.
- Funcionar em computador, tablet e smartphone, com texto ampliado, sem
  cortes, sobreposicoes ou rolagem horizontal da pagina.
- Reutilizar shell, tokens e fonte Inter com os fallbacks globais.
- Validar os fluxos em Chrome, Edge, Firefox e Safari, incluindo armazenamento
  indisponivel e dados de sessao invalidos.

## Referencias visuais e pendencias

A feature possui cinco telas/partes na mesma rota, na ordem do conteudo:

| Parte | Node | Referencia |
| --- | --- | --- |
| 1. Sobre o servico | `653:1540` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=653-1540&m=dev) |
| 2. Publico e requisitos | `2024:269` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=2024-269&m=dev) |
| 3. Como o servico funciona | `641:58` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=641-58&m=dev) |
| 4. Atendimento | `647:650` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=647-650&m=dev) |
| 5. Informacoes finais | `660:2533` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=660-2533&m=dev) |

Componentes compartilhados: `811:306` Form-Card compacto, `811:382` Form-Card
com orientacao, `821:308` previa compartilhada com a 009 e `651:317` Label-Row.

O layout deve se adaptar ao conteudo de
`src/content/pages/formulario-carta.ts`; o Figma governa composicao e estilo,
mas nao autoriza truncar, substituir ou duplicar copy. Textos longos aumentam
a altura natural dos componentes, sem corte, ellipsis ou sobreposicao.

No node `2024:269`, a representacao do formulario em imagem e somente
referencia visual. Implementar formulario HTML/React real com inputs,
textareas, selects, radios, checkboxes, fieldsets e listas editaveis, mantendo
estrutura, hierarquia e estilo. Nao incorporar a imagem, mapear cliques sobre
ela ou usa-la como substituto dos controles. A previa embutida segue `821:308`.

Antes do codigo visual, consultar detalhadamente via MCP os cinco frames e os
componentes, alem do Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.

O planejamento deve resolver a divisao visual em partes, regras condicionais,
contrato de agendamento nao informado e sua orientacao, inclusao de nome popular,
migracao da sessao e integracao com 008–012. Se o Figma trouxer campos ou
comportamentos adicionais, registrar a divergencia antes de ampliar o escopo.

## Fora de escopo

- Executar ou exigir conclusao do diagnostico ou checklist da organizacao.
- Aprovar ou publicar a Carta no Paraiba Digital ou integrar seus sistemas.
- Login, historico, varias Cartas simultaneas, rascunhos permanentes e
  sincronizacao entre dispositivos ou abas.
- Upload de documentos, coleta de documentos pessoais e repositorio de anexos.
- Motor de linguagem simples, IA para redacao ou alteracao automatica dos textos.
- Implementacao interna do componente de previa, exportacao CSV, tutorial e
  copia de campos. A 007 apenas integra a previa entregue pela 009.
- Backend de atendimento, agendamento de suporte ou envio de mensagens.

## Dependencias

- `001-fundacao-do-projeto`: modelo, validacao e armazenamento iniciais.
- `002-home-e-navegacao` e `003-explorar-por-etapas`: shell, links e entrada
  independente para elaboracao da Carta.
- `006-organizar-informacoes`: orientacoes de levantamento e entrada do fluxo.
- `008-validacao-linguagem-simples`: regras compartilhadas e sugestoes.
- `009-previa-html`, `010-exportacao-csv` e `012-copia-dados-tutorial`:
  consumo da mesma Carta, valores atuais e campos adicionais.
- `013-fluxo-de-ajuda`: destino de suporte.
- `016-responsividade-acessibilidade`: alinhamento transversal, sem adiar os
  requisitos desta pagina.
- Validacao editorial e conciliacao com ERS e Figma antes da implementacao.

Na criacao desta spec, as pastas 008–011, 013 e 016 ainda nao existem em
`specs/`. Rotas, validadores e placeholders atuais nao comprovam sua conclusao.
A tabela da spec 012 foi alinhada documentalmente com os campos e condicoes
de agendamento da RF03. Validacao institucional e implementacao integrada
dos consumidores continuam pendentes.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir `/formulario-carta` diretamente, pela 006 ou pela etapa de elaboracao. | Acessar o formulario sem exigir diagnostico, login ou dados previos. |
| CA02 | Consultar as partes do formulario. | Encontrar todos os campos da tabela, com rotulos e orientacoes; nome popular e informacoes adicionais opcionais; nome popular complementar, sem substituir o nome do servico. |
| CA03 | Preencher parcialmente e mudar de parte. | Manter valores e permitir continuar ou voltar sem exigir completude. |
| CA04 | Adicionar, editar e remover documentos e canais. | Manter classificacao/tipo e descricao de cada item, sem alterar os demais. |
| CA05 | Reorganizar ou remover etapas por teclado. | Preservar descricoes e produzir sequencia coerente, com foco acessivel. |
| CA06 | Iniciar Carta sem responder agendamento e depois escolher Sim ou Nao. | Distinguir nao informado de Nao; aplicar campos condicionais de RF03 e preservar valores na sessao sem apresentar valores inativos. |
| CA07 | Deixar custos ou documentos vazios. | Nao inferir gratuidade ou ausencia de exigencias; orientar confirmacao. |
| CA08 | Solicitar revisao com obrigatorios vazios ou apenas espacos. | Identificar pendencias e permitir localizar/corrigir, sem apagar dados ou bloquear consulta de previa parcial. |
| CA09 | Consultar orientacao ou receber sugestao de linguagem simples. | Manter o texto digitado e nao aplicar sugestoes automaticamente. |
| CA10 | Visitar organizacao, ajuda, previa ou tutorial e retornar. | Recuperar todos os valores atuais da mesma Carta na sessao. |
| CA11 | Recarregar com armazenamento temporario valido. | Restaurar dados e ordem das listas, sem criar rascunho permanente. |
| CA12 | Usar armazenamento indisponivel, dados invalidos ou sessao legada. | Manter a pagina funcional, preservar dados seguros e informar limites; nao inferir resposta de agendamento do `false` legado. |
| CA13 | Editar a Carta e consultar consumidores implementados. | Previa, CSV e copia usam valores atuais, incluindo nome popular e configuracao de agendamento somente quando aplicavel; campos externos somente para sistema externo. |
| CA14 | Operar por teclado e leitor de tela. | Identificar campos, partes, erros e controles das listas, com foco e estados acessiveis. |
| CA15 | Preencher textos longos em desktop, tablet, smartphone e com ampliacao. | Ler e editar sem corte, sobreposicao ou rolagem horizontal da pagina. |
| CA16 | Digitar acentos, varias linhas ou marcacao HTML. | Preservar como texto sem executar codigo nem substituir por exemplos. |
| CA17 | Revisar comunicacao e arquitetura. | Encontrar conteudo versionado, dados apenas de sessao e ausencia de publicacao, backend ou aprovacao institucional automatica. |
| CA18 | Revisar implementacao visual futura. | Encontrar consultas Figma registradas, shell e tokens reutilizados e divergencias resolvidas. |
| CA19 | Dado que o responsavel configura atendimento, quando informar Nao em Necessita de agendamento?. | Entao nao apresentar configuracoes especificas de agendamento nem exigir seus campos. |
| CA20 | Dado que o servico necessita de agendamento, quando selecionar Paraiba Digital. | Entao identificar agendamento realizado pelo proprio Paraiba Digital; ocultar e nao exigir Link e Exibicao. |
| CA21 | Dado que o servico necessita de agendamento, quando selecionar Outro sistema ou site, informar URL e Dentro do Paraiba Digital. | Entao registrar que o cidadao permanece dentro da experiencia do Paraiba Digital, sem redirecionamento. |
| CA22 | Dado que o servico necessita de agendamento, quando selecionar Outro sistema ou site, informar URL e Em uma nova pagina. | Entao registrar redirecionamento para o endereco externo informado. |
| CA23 | Dado que Outro sistema ou site foi selecionado e campos externos preenchidos, quando mudar para Paraiba Digital. | Entao ocultar Link e Exibicao e retirar sua obrigatoriedade; preservar valores na sessao, sem apresenta-los ou transferi-los como ativos. |
| CA24 | Com Sim, revisar tipos/sistema ausentes; com sistema externo, revisar link/exibicao ausentes ou URL invalida. | Identificar pendencias condicionais e impedir exportacao conforme 008/010; aceitar Online, Presencial ou ambos; permitir previa parcial e edicao. |
| CA25 | Navegar pelas cinco partes do formulario. | Usar os nodes `653:1540`, `2024:269`, `641:58`, `647:650` e `660:2533` como estados da mesma rota, preservando valores e adaptando layout ao conteudo. |
| CA26 | Abrir e fechar a orientacao de um campo. | Alternar entre os estados `811:306` e `811:382`, anunciar o estado e mostrar conteudo correspondente da 006 sem alterar o valor. |
| CA27 | Consultar a previa dentro do formulario. | Reutilizar componente/view model `821:308` da 009, sem duplicar seletores, markup ou estado da Carta. |
| CA28 | Usar a parte representada no frame `2024:269`. | Interagir com formulario real, sem imagem, overlay ou mapa de cliques, preservando a estrutura visual do frame e semantica acessivel. |

## Proximo passo

Executar `/spec:planejar 007-formulario-carta-servico` para definir contratos,
estado compartilhado, migracao, componentes e verificacoes. Depois, criar
tarefas e `implementation-plan.md`, conciliar as pendencias e validar a
documentacao antes de `/spec:implementar`.

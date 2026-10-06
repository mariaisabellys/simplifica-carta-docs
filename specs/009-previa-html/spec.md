# Spec: Previa HTML

## Objetivo

Permitir que o servidor revise visualmente as informacoes atuais da Carta de
Servicos em uma apresentacao HTML legivel e acessivel, identifique dados
ausentes e retorne ao formulario para corrigir o preenchimento sem perder
o trabalho da sessao.

## Problema e contexto

Informacoes distribuidas pelas partes do formulario precisam ser consultadas
em conjunto antes de serem transferidas ao cadastro oficial. A previa organiza
os valores preenchidos para revisao, inclusive quando a Carta estiver parcial.

Esta feature ocupa a rota `/previa`, depois do formulario e da revisao no
fluxo completo. Tambem admite acesso direto. A previa e uma apresentacao
dinamica no navegador, nao um arquivo HTML exportado, publicacao oficial,
aprovacao pela GESED ou reproducao homologada da tela do Paraiba Digital.

## Usuarios impactados

- Servidor responsavel pela redacao e revisao da Carta.
- Servidor responsavel pelo cadastro manual, que precisa conferir os dados
  reunidos antes de exportar e copiar.
- Equipe GESED, que orienta a preparacao e a consistencia das informacoes.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: previa
  dinamica em HTML, revisao e cadastro manual.
- `docs/produto/fluxos.md` e `mvp.md`: jornada de preparacao da Carta.
- `docs/arquitetura/decisoes-tecnicas.md` e `arquitetura-sistema.md`:
  processamento local e dados temporarios de sessao.
- `docs/decisoes/adr-002-exportacao-csv.md`: CSV como formato de exportacao
  do MVP; HTML como recurso de revisao.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  conteudo versionado e consulta visual antes da implementacao.
- `specs/007-formulario-carta-servico/spec.md`: origem unica dos dados,
  campos, continuidade, agendamento nao informado e revisao parcial.
- `specs/008-validacao-linguagem-simples/spec.md`: pendencias obrigatorias,
  sugestoes orientativas e ausencia de bloqueio da previa.
- `specs/012-copia-dados-tutorial/spec.md`: mesma Carta da sessao e retorno
  para edicao, sem segunda versao editavel.
- `docs/design-system/mapa-figma-telas.md`: referencia `821:308`.
- `src/app/routes.tsx` e `src/pages/PreviaCartaPage.tsx`: rota existente e
  pagina placeholder.
- `src/features/carta/carta.types.ts`, `carta.schema.ts`, `carta.storage.ts`
  e `carta.csv.ts`: contratos iniciais, sujeitos a conciliacao com 007 e 010.

Esta spec utiliza fontes textuais locais; nao declara leitura do PDF do ERS,
consulta direta ao Figma ou homologacao dos campos da plataforma externa.

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

## Requisitos funcionais

### RF01 — Acesso e apresentacao

- Disponibilizar a previa em `/previa`, pela acao de revisao do formulario,
  por URL direta e apos recarga.
- Nao exigir diagnostico, conclusao da organizacao, preenchimento integral,
  ausencia de sugestoes, exportacao ou login.
- Reutilizar header e footer compartilhados e apresentar breadcrumb com
  retorno ao inicio e identificacao da pagina atual.
- Exibir titulo e explicacao em linguagem simples: a pagina permite conferir
  os dados e a publicacao continua sendo feita manualmente no Paraiba Digital.
- Identificar a apresentacao como previa, sem selo de aprovacao, comprovante
  de cadastro ou promessa de aceite na plataforma oficial.

### RF02 — Dados atuais e continuidade

- Consumir a mesma Carta da sessao utilizada pelo formulario, exportacao e
  copia, sem gerar uma segunda versao editavel ou snapshot desatualizado.
- Ao acessar ou retornar a pagina, apresentar os valores atuais. Se a mesma
  fonte mudar enquanto a previa estiver montada, atualizar a apresentacao.
- Preservar os dados ao abrir a previa, consultar outras etapas ou voltar
  ao formulario. A pagina nao inicializa, limpa ou modifica a Carta.
- Reutilizar a recuperacao temporaria de sessao definida em 007 quando
  disponivel, inclusive apos recarga. Nao criar persistencia propria da previa.
- Dados ausentes, invalidos ou armazenamento indisponivel nao podem derrubar
  a pagina. Usar os dados validos em memoria quando houver e o tratamento de
  recuperacao da 007; caso contrario, apresentar estado sem dados.
- Nao restaurar outra sessao nem prometer historico ou sincronizacao entre abas.

### RF03 — Cobertura e representacao

Apresentar campos identificados em secoes coerentes com as partes do formulario.
A ordem final das secoes deve ser registrada no plano visual, mantendo ordem
de leitura unica no DOM e cobertura integral abaixo.

| Informacao | Referencia na Carta | Apresentacao |
| --- | --- | --- |
| Nome do servico | `identificacao.nome` | Nome informado, sem usar titulo inventado como valor. |
| Nome popular | `identificacao.nomePopular` | Texto opcional, quando informado. |
| Descricao | `identificacao.descricao` | Texto integral com quebras de linha preservadas. |
| Publico-alvo | `identificacao.publicoAlvo` | Texto informado. |
| Criterios de acesso | `requisitos.criterios` | Texto informado, sem inferir acesso irrestrito de vazio. |
| Documentos necessarios | `requisitos.documentos` | Lista com nome e classificacao obrigatorio/opcional. |
| Etapas do servico | `etapas` | Lista ordenada com descricao de cada etapa, na sequencia definida no formulario. |
| Prazo | `atendimento.prazo` | Texto informado, sem estimativa criada pela previa. |
| Custos | `atendimento.custo` | Texto informado, incluindo `0` ou declaracao explicita de gratuidade. |
| Canais de atendimento | `atendimento.canais` | Lista com tipo em linguagem simples e descricao integral de acesso. |
| Necessita de agendamento? | `atendimento.exigeAgendamento` | Sim, Nao ou Nao informado, conforme contrato explicito da 007. |
| Tipo de agendamento | `atendimento.tiposAgendamento` | Online, Presencial ou ambos; obrigatorio com Sim. |
| Sistema de agendamento | `atendimento.sistemaAgendamento` | Paraiba Digital ou Outro sistema ou site; escolha unica obrigatoria com Sim. |
| Link do agendamento | `atendimento.linkAgendamento` | URL obrigatoria somente para Outro sistema ou site. |
| Como o agendamento sera exibido? | `atendimento.exibicaoAgendamento` | Dentro do Paraiba Digital ou Em uma nova pagina; escolha unica obrigatoria somente para Outro sistema ou site. |
| Orientacoes de agendamento | `atendimento.orientacaoAgendamento` | Texto opcional somente com Sim. |
| Informacoes adicionais | `informacoesComplementares` | Texto complementar, quando informado. |

- Preservar acentos, pontuacao, quebras de linha e redacao atual. Nao aplicar
  sugestoes, resumir ou truncar informacoes para ajustar o cartao visual.
- Preservar a ordem de documentos e canais. Respeitar a ordem valida das etapas
  compartilhada com o formulario, sem alterar a fonte ao renderizar.
- Mostrar rotulos compreensiveis; nao exibir paths tecnicos, JSON, `undefined`
  ou `null` como conteudo.
- Tratar textos e enderecos informados como texto. Esta spec nao exige
  transformar automaticamente valores em links, imagens ou HTML executavel.
- O modelo atual nao inclui nome popular ou orientacao de agendamento e usa
  `false` inicial. Conciliar essas mudancas e sessoes legadas com 007 antes de
  implementar, sem apresentar `false` legado como resposta confirmada.
- Ao mudar para Nao/nao informado ou de Outro sistema ou site para Paraiba Digital,
  preservar valores previamente preenchidos na mesma sessao, conforme o padrao da 007,
  sem apagar silenciosamente. Valores inativos nao sao exibidos, validados como
  obrigatorios nem transferidos como configuracao ativa; ao retornar a condicao
  correspondente, ficam disponiveis para revisao.

### RF04 — Carta parcial, campos ausentes e estado vazio

- Permitir consulta de Carta parcial, mantendo todos os dados preenchidos
  disponiveis mesmo com pendencias obrigatorias.
- Identificar campos ausentes como `Nao informado` ou mensagem equivalente
  versionada, claramente separada do valor da Carta. Nao gravar essa mensagem
  no modelo nem transferi-la aos consumidores como texto preenchido.
- Nome popular e informacoes adicionais opcionais vazios podem ser omitidos
  da apresentacao final; essa escolha deve ser uniforme e documentada. Campos
  obrigatorios ausentes devem permanecer identificaveis para revisao.
- Listas vazias nao significam ausencia de exigencia. Itens vazios de edicao
  nao devem produzir linhas sem significado; itens parciais com texto util
  devem permanecer visiveis, com indicacao do atributo ainda nao informado,
  sem inventar classificacao ou tipo.
- Nao inferir gratuidade de custos vazios, ausencia de documentos de lista
  vazia ou Nao de agendamento sem resposta.
- Quando nao houver dados preenchidos, apresentar `Voce ainda nao preencheu
  as informacoes da Carta.` e acao `Preencher Carta` para `/formulario-carta`.
  Defaults e itens inteiramente vazios nao devem gerar uma Carta ficticia.
- Uma resposta explicita de agendamento, mesmo Nao, e diferente do default
  inicial. O planejamento deve definir a deteccao de Carta com dados a partir
  do contrato final da 007.

### RF05 — Pendencias e revisao

- Identificar as pendencias obrigatorias atuais usando as regras da 008,
  sem criar obrigatoriedade divergente ou validar fatos e regras externas.
- Distinguir mensagens de revisao dos dados apresentados como Carta. Nao
  inserir erros ou sugestoes dentro do texto do servico.
- Oferecer retorno claro para corrigir as informacoes no formulario,
  preservando valores. Se houver links para campos especificos, conciliar
  destino, abertura da parte e foco com o contrato da 007.
- Sugestoes de linguagem simples permanecem orientativas e nao bloqueiam
  a previa. Sua exibicao detalhada continua no formulario; a 009 nao cria um
  segundo motor de analise ou uma redacao alternativa.
- Ausencia de pendencias locais nao pode ser anunciada como aprovacao da Carta.

### RF06 — Acoes e limites de integracao

- Oferecer `Editar informacoes` para `/formulario-carta` com a mesma Carta.
- Oferecer acesso ao tutorial em `/tutorial-paraiba-digital`, sem exigir
  exportacao previa ou conclusao integral da Carta.
- Integrar a acao `Exportar CSV` ao fluxo da feature 010 quando implementado.
  Obrigatorios ausentes impedem a exportacao, usando 008, mas nao bloqueiam
  edicao, leitura da previa ou acesso ao tutorial.
- Nao implementar geracao ou download CSV nesta feature nem anunciar arquivo
  exportado antes de sua geracao pelo consumidor responsavel.
- Oferecer acesso a ajuda em `/ajuda`, reutilizando a acao compartilhada
  quando existente, sem criar formulario de suporte nesta pagina.
- Nao disponibilizar download HTML, PDF, compartilhamento publico ou copia
  integral da Carta como parte desta spec. A copia individual pertence a 012.

### RF07 — Conteudo versionado

- Manter titulos, rotulos, mensagens de vazio, avisos e acoes em conteudo
  versionado, separado da apresentacao visual, seguindo `src/content/`.
- Manter os dados digitados exclusivamente na fonte de sessao da Carta.
- Preservar linguagem simples e acentuacao na interface e permitir revisao
  editorial sem alterar os dados do usuario ou a navegacao.

## Requisitos nao funcionais

- Renderizar a previa localmente no navegador, sem backend, login ou envio
  dos dados da Carta a servicos externos.
- Nao adicionar persistencia permanente ou registrar valores em logs e
  telemetria.
- Exibir HTML ou scripts presentes nas entradas como texto, sem executa-los,
  carregar recursos embutidos ou interpretar marcacao fornecida pelo usuario.
- Oferecer titulos semanticos, rotulos associados aos valores, listas legiveis
  e ordem coerente. Identificar pagina, secoes, pendencias e destinos por texto.
- Permitir consulta e navegacao por teclado e leitor de tela, com foco visivel
  e anuncios de estado sem deslocamento inesperado durante atualizacao.
- Funcionar em computador, tablet e smartphone, com textos longos e ampliacao,
  sem corte, sobreposicao ou rolagem horizontal da pagina. Permitir quebra de
  enderecos e palavras extensas sem perder conteudo.
- Reutilizar shell, tokens e fonte Inter com os fallbacks globais.
- Validar os fluxos em Chrome, Edge, Firefox e Safari.

## Referencias visuais e pendencias

O mapa local associa `/previa` ao node `821:308`, `card-servico-completo`.
Esse node e uma referencia documentada do cartao, sem comprovar nesta etapa
todos os estados ou a composicao completa da pagina.

Antes da implementacao visual, consultar via MCP o node no Figma Design
`YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e o Figma Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Registrar no `implementation-plan.md`
layout, secoes, acoes, estados vazio/parcial/completo, assets e adaptacao
responsiva. Identificar referencias adicionais quando necessario e atualizar
o mapa de telas se houver mudanca.

Resolver divergencias entre o cartao do prototipo e a cobertura do modelo antes
de implementar, sem omitir dados nem ampliar funcionalidades silenciosamente.
Conciliar ERS, contrato final da 007, tratamento de listas parciais, pendencias
da 008 e acao de exportacao da 010 no planejamento.

## Fora de escopo

- Editar os dados diretamente na previa ou manter uma segunda Carta.
- Gerar arquivo HTML, PDF, versao para impressao ou pagina publica compartilhada.
- Implementar geracao CSV, copia individual, tutorial ou formulario completos.
- Reescrever automaticamente, executar marcacao digitada ou avaliar fatos.
- Aprovar, homologar, cadastrar ou publicar no Paraiba Digital.
- Login, historico, varias Cartas simultaneas, sincronizacao entre abas e
  dispositivos ou rascunhos permanentes.
- Backend de atendimento, anexos ou envio de mensagens.

## Dependencias

- `001-fundacao-do-projeto`: modelo e recuperacao de sessao iniciais.
- `002-home-e-navegacao`: shell, links internos e continuidade da navegacao.
- `007-formulario-carta-servico`: origem da Carta, contratos finais e edicao.
- `008-validacao-linguagem-simples`: pendencias obrigatorias compartilhadas.
- `010-exportacao-csv`: acao de exportacao e bloqueio quando houver pendencias.
- `011-tutorial-paraiba-digital` e `012-copia-dados-tutorial`: destino seguinte
  e consumo dos mesmos valores, sem exigir previa ou exportacao concluida.
- `013-fluxo-de-ajuda`: destino de suporte.
- `016-responsividade-acessibilidade`: alinhamento transversal, sem adiar os
  requisitos desta pagina.
- Consulta visual e validacao editorial dos textos de interface.

Na criacao desta spec, 010, 011, 013 e 016 ainda nao possuem pastas em
`specs/`. Rotas, placeholders e helper CSV existentes nao representam essas
features concluidas. Verificacoes integradas dependem dos consumidores reais.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir `/previa` pela revisao, por URL direta ou recarga. | Acessar sem exigir diagnostico, login, exportacao ou Carta completa. |
| CA02 | Consultar Carta com todos os campos preenchidos. | Encontrar toda a cobertura da tabela com rotulos, listas e valores integrais. |
| CA03 | Alterar dados no formulario e retornar a previa. | Exibir valores atuais da mesma Carta, sem snapshot obsoleto. |
| CA04 | Abrir a previa com Carta parcial. | Exibir dados preenchidos e ausencias identificadas, sem bloquear leitura ou edicao. |
| CA05 | Abrir sem dados, somente com defaults ou itens inteiramente vazios. | Apresentar estado sem dados e `Preencher Carta`, sem conteudo ficticio. |
| CA06 | Consultar custo `0`, gratuidade explicita e custo vazio. | Preservar valores informados e diferenciar vazio de gratuidade. |
| CA07 | Consultar agendamento Sim, Nao e nao informado ou legado. | Representar a resposta explicita ou ausencia corretamente, sem inferir Nao do default. |
| CA08 | Consultar orientacao de agendamento e itens de lista parciais. | Mostrar orientacoes somente com Sim, preservar dados inativos na sessao e identificar atributos pendentes das listas, sem inventar valores. |
| CA09 | Reordenar etapas e editar documentos ou canais no formulario. | Exibir sequencia e atributos atuais sem modificar a fonte. |
| CA10 | Usar `Editar informacoes` e retornar. | Preservar integralmente a Carta durante a navegacao. |
| CA11 | Consultar pendencias ou ignorar sugestoes de linguagem simples. | Usar regras da 008, manter previa/tutorial acessiveis e nao alterar a redacao. |
| CA12 | Acionar exportacao com obrigatorios ausentes no fluxo 010. | Impedir apenas exportacao e orientar correcao, sem bloquear leitura ou edicao. |
| CA13 | Usar sessao valida, armazenamento indisponivel ou dados invalidos. | Recuperar dados seguros quando disponiveis ou apresentar estado funcional sem dados. |
| CA14 | Informar HTML, scripts, acentos e varias linhas. | Exibir como texto integral sem executar codigo ou carregar recursos embutidos. |
| CA15 | Consultar apenas por teclado e leitor de tela. | Identificar secoes, valores, pendencias e acoes com foco e ordem coerentes. |
| CA16 | Consultar textos longos e enderecos em telas pequenas e com ampliacao. | Manter todo conteudo legivel, sem corte, sobreposicao ou rolagem horizontal. |
| CA17 | Revisar arquitetura e comunicacao. | Encontrar previa local de sessao, conteudo editorial versionado e ausencia de publicacao, persistencia permanente ou exportacao HTML/PDF. |
| CA18 | Revisar implementacao visual futura. | Encontrar consultas Figma e estados registrados, shell e tokens reutilizados e divergencias resolvidas. |
| CA19 | Consultar ou transferir dados em Nao/Sim, Paraiba Digital, externo dentro/fora e apos troca de sistema. | Respeitar configuracoes ativas conforme 007 CA19–CA24; nao apresentar ou transferir valores inativos preservados na sessao; aplicar apenas validacao prevista por esta feature. |

## Proximo passo

Executar `/spec:planejar 009-previa-html` para definir composicao, contrato de
apresentacao, estados, integracoes e verificacoes. Depois, criar tarefas e
`implementation-plan.md`, conciliar as pendencias e executar `/spec:validar`
antes de `/spec:implementar`.

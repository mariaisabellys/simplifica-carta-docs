# Spec: Fluxo de ajuda

## Objetivo

Oferecer uma entrada clara para esclarecer duvidas sobre levantamento,
organizacao, elaboracao e cadastro manual da Carta de Servicos, com perguntas
frequentes e acesso ao suporte por e-mail ou atendimento agendado.

## Problema e contexto

O servidor pode precisar de orientacao em qualquer etapa, inclusive antes de
preencher a Carta. Precisa encontrar respostas de consulta e entender qual
canal escolher sem perder os dados da sessao ou enviar informacoes por engano.

Esta feature corresponde a `/ajuda`, ponto de entrada do fluxo de atendimento.
A consulta e a escolha de canal acontecem aqui; solicitacao de agendamento e
suporte por e-mail pertencem respectivamente a 014 e 015. O atendimento e
orientativo e nao substitui revisao oficial da GESED ou publica servicos.

## Usuarios impactados

- Servidor responsavel pelo levantamento, que precisa esclarecer requisitos
  e entender o fluxo do manual.
- Servidor responsavel pelo cadastro, que precisa de orientacao sobre revisao
  e transferencia manual dos dados.
- Equipe GESED, que precisa direcionar duvidas a canais definidos e manter
  respostas consistentes.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: fluxo de
  ajuda, perguntas frequentes, e-mail e atendimento agendado orientativo.
- `docs/produto/mvp.md`, `escopo.md`, `personas.md` e `fluxos.md`: usuarios,
  acesso independente e escolha do canal antes da solicitacao.
- `docs/arquitetura/decisoes-tecnicas.md` e
  `docs/decisoes/adr-003-backend-atendimento.md`: backend restrito ao fluxo
  que recebe e registra solicitacoes, sem armazenar a Carta.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  conteudo versionado e consulta visual antes da implementacao.
- Specs 006–012: acesso a ajuda sem bloquear consulta, edicao ou copia e
  preservacao da mesma Carta da sessao.
- `docs/design-system/mapa-figma-telas.md`: referencia FAQ `169:495`.
- `src/app/routes.tsx`, `src/pages/AjudaPage.tsx`,
  `AtendimentoAgendadoPage.tsx` e `SuporteEmailPage.tsx`: rotas existentes e
  paginas placeholder dos canais.
- `src/features/atendimento/atendimento.types.ts`: contrato inicial de
  solicitacao, a detalhar na feature 014.

Esta spec usa fontes textuais locais. Nao declara leitura do PDF do ERS,
consulta direta ao Figma, verificacao de disponibilidade dos canais ou
homologacao editorial das respostas.

## Requisitos funcionais

### RF01 — Acesso e apresentacao

- Disponibilizar `/ajuda` pela acao compartilhada `Preciso de ajuda`, pela
  navegacao quando houver item correspondente e por URL direta e recarga.
- Permitir acesso em qualquer etapa, sem exigir diagnostico, Carta preenchida,
  exportacao, login ou solicitacao anterior.
- Reutilizar header e footer, indicar pagina atual semanticamente na
  navegacao e apresentar breadcrumb com retorno ao inicio.
- Exibir titulo `Preciso de ajuda` e introducao em linguagem simples indicando
  que o usuario pode consultar respostas ou escolher um canal de orientacao.
- Explicar o escopo do suporte: levantamento, organizacao, elaboracao e
  preparacao para cadastro manual, sem prometer aprovacao, publicacao ou
  resolucao de toda demanda da plataforma externa.

### RF02 — Perguntas frequentes

Disponibilizar respostas de consulta que cubram os assuntos abaixo, com
redacao institucional a validar antes da implementacao:

| Assunto | Cobertura minima |
| --- | --- |
| Funcao do Simplifica Carta | Preparacao e orientacao; cadastro e publicacao continuam manuais. |
| Acesso por etapas | Possibilidade de consultar qualquer etapa sem concluir anteriores. |
| Informacoes a reunir | Encaminhamento a `/organizar-informacoes` e confirmacao com o setor responsavel. |
| Continuidade do preenchimento | Dados temporarios da sessao, limites de recuperacao e ausencia de rascunho permanente. |
| Validacao e linguagem simples | Diferenca entre obrigatorios ausentes e sugestoes orientativas, sem aprovacao automatica. |
| Previa, CSV e copia | Funcao de cada recurso e orientacao para revisar dados antes da transferencia manual. |
| Como obter orientacao | Diferenca entre suporte por e-mail e solicitacao de atendimento agendado. |

- Manter respostas coerentes com os contratos finais de 007–012. Nao
  prometer recuperacao futura, importacao CSV ou procedimentos externos nao
  verificados.
- Usar perguntas e respostas claras, com links relevantes para as etapas,
  sem exigir leitura da FAQ antes de acessar os canais.
- Manter todo texto consultavel por tecnologias assistivas. Se forem usados
  paineis expansivos, disponibilizar controles semanticos com estado anunciado,
  operacao por teclado e foco coerente; nao depender de hover.
- A FAQ nao exige busca, filtros, chat, avaliacao de resposta ou registro de
  conclusao. Sua composicao final deve ser conciliada com o Figma.

### RF03 — Escolha do canal

Apresentar as duas opcoes com descricao objetiva e link de acao identificavel:

| Opcao | Destino | Comportamento nesta feature |
| --- | --- | --- |
| Atendimento agendado | `/ajuda/atendimento-agendado` | Encaminhar para consultar disponibilidade e solicitar atendimento na 014. |
| Suporte por e-mail | `/ajuda/suporte-email` | Encaminhar para orientacoes de contato e uso do canal na 015. |

- Explicar que selecionar uma opcao apenas abre o fluxo correspondente.
  Nao cria solicitacao, reserva horario, envia mensagem ou notifica a equipe.
- Permitir escolha independente, sem classificar automaticamente a duvida
  ou exigir dados pessoais na pagina de entrada.
- Nao exibir datas, horarios ou disponibilidade ficticia; esses dados pertencem
  ao contrato da 014. Nao prometer atendimento imediato ou prazo de resposta
  sem validacao institucional.
- A pagina de entrada nao precisa consultar backend para renderizar FAQ e
  links. Indisponibilidade de um fluxo nao deve impedir a leitura da ajuda.
- Quando houver indisponibilidade confirmada de um canal, oferecer mensagem
  verdadeira e alternativa disponivel, sem afirmar solicitacao recebida.
  O mecanismo de disponibilidade deve ser conciliado com 014 e 015, sem criar
  monitoramento ou agenda nesta feature.
- Rotas placeholder nao comprovam canais operacionais. O aceite integrado
  de encaminhamento depende da implementacao real de 014 e 015.

### RF04 — Continuidade da Carta e retorno

- Entrar, consultar FAQ, escolher canal ou voltar nao pode reinicializar,
  alterar ou apagar a Carta da sessao ou as respostas do diagnostico.
- Reutilizar a navegacao compartilhada, preservando dados em memoria ao mudar
  de rota. Nao criar uma segunda Carta nem persistencia propria da ajuda.
- Oferecer acesso explicito a `/formulario-carta` para retomar ou iniciar o
  preenchimento, com rotulo claro e sem exigir leitura dos dados da Carta para
  renderizar a pagina de ajuda.
- Manter voltar/avancar do navegador funcionais. Para acesso direto, nao
  depender exclusivamente de uma pagina anterior no historico.
- Nao enviar a Carta, respostas do diagnostico ou dados da sessao aos canais
  automaticamente, nem embuti-los em URL, query string ou mensagem predefinida.
- Coleta de dados institucionais, assunto da duvida e confirmacao explicita
  pertencem aos fluxos especificos, sem formulario duplicado na 013.

### RF05 — Conteudo e contatos institucionais

- Manter introducao, FAQ, descricoes dos canais, rotulos, destinos e mensagens
  em conteudo versionado, separado da apresentacao visual, seguindo
  `src/content/pages/`.
- Submeter respostas e descricoes a validacao da equipe responsavel e
  preservar linguagem simples e acentuacao.
- O placeholder de suporte menciona `gesed.semtd@gmail.com`, sem verificacao
  nesta etapa. A validacao do endereco, forma de uso e contato final pertence
  ao planejamento da 015; a 013 nao cria um endereco alternativo nem assume
  que esse canal esta ativo.
- Nao duplicar contatos em varios arquivos nem publicar dados institucionais
  provisórios como definitivos. Reutilizar o contrato de conteudo da 015 se
  houver necessidade de mostrar contato nesta pagina.
- Nao confundir canais de orientacao da GESED com suporte tecnico externo
  do Paraiba Digital; referencias externas so entram quando verificadas.

## Requisitos nao funcionais

- Funcionar como pagina de consulta no frontend, sem login, coleta de dados,
  chamada obrigatoria a backend ou persistencia de interacoes de ajuda.
- Nao registrar textos da Carta, duvidas ou dados pessoais em logs ou
  telemetria da pagina de entrada.
- Oferecer um unico titulo principal, hierarquia clara, landmarks e links
  com nomes que identifiquem destinos.
- Permitir consulta da FAQ e escolha de canal por teclado e leitor de tela,
  com foco visivel, contraste adequado e estados anunciados quando houver
  expansao. Nao depender apenas de icones ou cores.
- Funcionar em desktop, tablet e smartphone com texto ampliado e respostas
  longas, sem corte, sobreposicao ou rolagem horizontal da pagina.
- Reutilizar shell, tokens e fonte Inter com os fallbacks globais.
- Validar navegacao em Chrome, Edge, Firefox e Safari.

## Referencias visuais e pendencias

O mapa local associa `169:495`, FAQ, a `/ajuda` ou a uma futura spec de FAQ.
Esta spec inclui FAQ na entrada de ajuda; o planejamento deve conferir se o
frame cobre tambem a escolha dos dois canais ou se existem referencias adicionais.
O node nao representa, por si so, os formularios de 014 e 015.

Antes da implementacao visual, consultar via MCP o Figma Design
`YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, com a referencia `169:495`, e o
Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Registrar no
`implementation-plan.md` composicao, FAQ, acoes, estados, assets e responsividade.
Atualizar o mapa quando a associacao do frame for confirmada ou modificada.

Conciliar ERS, textos institucionais, disponibilidade dos canais e contratos
de navegacao com 014 e 015. Divergencias do prototipo devem ser resolvidas antes
de implementar, sem inserir formularios ou funcionalidades de atendimento na
pagina de entrada silenciosamente.

## Fora de escopo

- Consultar agenda, reservar horario, coletar solicitacao, registrar dados ou
  notificar a equipe; essas responsabilidades pertencem a 014.
- Enviar e-mail, abrir mensagem automaticamente ou implementar formulario de
  contato; o fluxo especifico pertence a 015.
- Chat, chatbot, triagem automatica, tickets, historico e painel administrativo.
- Coletar anexos ou enviar a Carta automaticamente a qualquer canal.
- Aprovar Cartas, publicar servicos ou integrar sistemas externos.
- Busca avancada, glossario completo ou area de materiais de apoio.
- Login, progresso persistido ou salvamento permanente da Carta.

## Dependencias

- `001-fundacao-do-projeto` e `002-home-e-navegacao`: rotas, shell e
  continuidade da navegacao.
- `006-organizar-informacoes` e `007-formulario-carta-servico`: destinos de
  consulta/retomada e preservacao de dados.
- `008-validacao-linguagem-simples`, `009-previa-html`, `010-exportacao-csv`,
  `011-tutorial-paraiba-digital` e `012-copia-dados-tutorial`: coerencia das
  respostas e entradas de ajuda durante o fluxo.
- `014-atendimento-agendado` e `015-suporte-email`: destinos operacionais e
  contratos dos canais, sem impedir planejamento da entrada de ajuda.
- `016-responsividade-acessibilidade`: alinhamento transversal, sem adiar os
  requisitos desta pagina.
- Validacao editorial e confirmacao das referencias visuais.

Na criacao desta spec, 014, 015 e 016 ainda nao possuem pastas em `specs/`.
Seus placeholders e tipo inicial de solicitacao nao representam entrega dos
canais. Testes de encaminhamento completo ficam dependentes dessas features.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir `/ajuda` pela acao compartilhada, URL direta ou recarga. | Exibir consulta e opcoes sem login, Carta ou percurso anterior. |
| CA02 | Consultar apresentacao e FAQ. | Encontrar escopo orientativo e cobertura dos assuntos da tabela, com respostas coerentes e versionadas. |
| CA03 | Escolher atendimento agendado. | Navegar para `/ajuda/atendimento-agendado` sem reservar, enviar ou confirmar solicitacao. |
| CA04 | Escolher suporte por e-mail. | Navegar para `/ajuda/suporte-email` sem enviar mensagem ou anunciar recebimento. |
| CA05 | Abrir ajuda com Carta parcialmente preenchida e retornar ao formulario. | Preservar integralmente os dados e retomar o preenchimento. |
| CA06 | Acessar ajuda diretamente e usar retorno ao formulario. | Abrir `/formulario-carta` sem depender de historico previo. |
| CA07 | Consultar ajuda e selecionar canal. | Nao coletar dados, enviar Carta, respostas ou valores de sessao em URL ou mensagem automatica. |
| CA08 | Usar FAQ expansiva, quando adotada, por teclado e leitor de tela. | Abrir/fechar respostas, identificar estados e manter foco e leitura coerentes. |
| CA09 | Navegar pelos links e canais somente por teclado. | Identificar destinos e acessar acoes com foco visivel e ordem logica. |
| CA10 | Consultar respostas longas em telas pequenas e com ampliacao. | Manter leitura e acoes acessiveis sem corte ou rolagem horizontal. |
| CA11 | Encontrar indisponibilidade confirmada de um canal. | Manter consulta funcional e informar alternativa verdadeira, sem horarios ou promessas ficticias. |
| CA12 | Revisar textos sobre contato, suporte e publicacao. | Encontrar conteudo validado, sem prazo inventado, aprovacao automatica ou confusao com suporte externo. |
| CA13 | Testar os canais completos depois da entrega de 014 e 015. | Chegar aos fluxos reais; nao declarar canal operacional apenas pela existencia de placeholder. |
| CA14 | Revisar arquitetura e implementacao visual futura. | Encontrar conteudo separado, ausencia de coleta/backend na entrada, consultas Figma registradas e shell/tokens reutilizados. |

## Proximo passo

Executar `/spec:planejar 013-fluxo-de-ajuda` para definir conteudo, composicao,
FAQ, contratos de navegacao e verificacoes. Depois, criar tarefas e
`implementation-plan.md`, conciliar pendencias e executar `/spec:validar`
antes de `/spec:implementar`.

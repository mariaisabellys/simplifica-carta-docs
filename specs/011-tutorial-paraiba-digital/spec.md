# Spec: Tutorial Paraiba Digital

## Objetivo

Orientar o servidor no cadastro manual das informacoes da Carta de Servicos no
Paraiba Digital por meio de um tutorial sequencial, consultavel de forma
independente e integrado aos campos de copia da feature 012.

## Problema e contexto

Depois de preparar a Carta, o servidor precisa transferir as informacoes para
a plataforma oficial e conferir o resultado. Orientacoes genericas nao bastam
para explicar onde realizar cada acao, quais dados revisar e como buscar ajuda
quando a interface ou as permissoes forem diferentes das referencias.

Esta feature ocupa `/tutorial-paraiba-digital`, etapa de tutorial de publicacao
em `Explorar por etapas` e destino depois da previa/exportacao no fluxo completo.
Pode ser consultada sem dados da Carta e sem exportar CSV. O Simplifica Carta
orienta e oferece dados para copia; nao acessa contas, preenche campos externos,
aprova nem publica servicos automaticamente.

## Usuarios impactados

- Servidor responsavel pelo cadastro manual na plataforma oficial.
- Servidor que precisa consultar instrucoes ou revisar dados antes da transferencia.
- Equipe GESED, responsavel por validar e manter as orientacoes institucionais.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: tutorial,
  copia individual e cadastro manual, sem integracao direta.
- `docs/produto/mvp.md`, `escopo.md`, `personas.md` e `fluxos.md`: acesso
  independente e jornada de preparacao.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  conteudo versionado e referencias visuais antes da implementacao.
- `docs/arquitetura/decisoes-tecnicas.md`: sessao temporaria e limites do MVP.
- Specs 007–010: mesma Carta da sessao, edicao, validacao, previa e CSV.
- `specs/012-copia-dados-tutorial/spec.md`: comportamento de campos,
  acionamento, retorno, falha e alternativa de copia manual.
- `src/app/routes.tsx`, `src/pages/TutorialParaibaDigitalPage.tsx` e
  `src/content/tutorial/paraiba-digital.ts`: rota existente e tres orientacoes
  iniciais, ainda sem tutorial detalhado ou integracao de copia.
- `docs/design-system/mapa-figma-telas.md`: ausencia de frame especifico
  identificado para este tutorial.

Esta spec utiliza fontes textuais locais. Nao declara leitura do PDF do ERS,
consulta direta ao Figma ou verificacao da interface atual do Paraiba Digital.
As etapas abaixo definem cobertura editorial; nomes de menus, URLs e regras
externas devem ser verificados antes de redigir instrucoes operacionais finais.

## Requisitos funcionais

### RF01 — Acesso e orientacao inicial

- Disponibilizar o tutorial em `/tutorial-paraiba-digital`, pela navegacao
  compartilhada, card da etapa de tutorial em `/explorar-por-etapas`, previa
  e URL direta, inclusive apos recarga.
- Manter as instrucoes consultaveis sem diagnostico concluido, Carta
  preenchida, previa revisada, CSV exportado ou login no Simplifica Carta.
- Reutilizar header e footer, indicar pagina atual na navegacao quando houver
  item correspondente e apresentar breadcrumb com retorno ao inicio.
- Exibir titulo, introducao e explicacao de que a transferencia, a revisao e
  as acoes oficiais acontecem manualmente na plataforma externa.
- Diferenciar acesso livre ao tutorial de eventuais credenciais e permissoes
  exigidas pela plataforma oficial, sem inventar seu processo de autenticacao.

### RF02 — Cobertura do passo a passo

Apresentar instrucoes em sequencia identificada, com titulo e orientacao pratica
para cada etapa. Cobrir os assuntos abaixo, conciliando sua divisao e rotulos
com o fluxo externo verificado no planejamento:

| Assunto | Cobertura esperada |
| --- | --- |
| Preparar e conferir os dados | Revisar informacoes com o setor responsavel e explicar que a Carta preparada e apoio ao cadastro. |
| Acessar a plataforma oficial | Oferecer endereco verificado e orientacao sobre acesso institucional, conforme fonte confirmada. |
| Localizar o cadastro de servicos | Explicar o caminho e as permissoes pertinentes com base em interface ou manual oficial verificado. |
| Transferir as informacoes | Orientar a copia/colagem e o preenchimento manual dos campos correspondentes, com verificacao de listas e opcoes. |
| Conferir o cadastro externo | Revisar valores, documentos, etapas, canais, prazo, custos e agendamento antes de confirmar a acao externa aplicavel. |
| Concluir conforme o fluxo oficial | Explicar as acoes e estados efetivamente existentes, distinguindo salvamento, envio, analise e publicacao quando aplicaveis. |
| Resolver duvidas ou divergencias | Orientar como consultar ajuda quando faltar informacao, permissao ou correspondencia com o tutorial. |

- Nao tratar a tabela como sequencia de menus ja confirmada. O texto final
  deve usar os nomes e comportamentos verificados, sem supor que salvar
  equivale a publicar ou que todo usuario pode concluir a publicacao.
- Manter todos os passos acessiveis, sem exigir marcar conclusao ou seguir
  etapas anteriores. Se houver indice ou navegacao entre passos, preservar
  ordem de leitura e acesso ao conteudo integral.
- Nao criar progresso persistido, pontuacao, comprovante ou certificacao.
- Explicar que o usuario deve conferir os dados depois de colar, especialmente
  quando listas ou escolhas externas demandarem entrada separada.
- Nao sugerir importacao automatica do CSV. O arquivo da 010 serve como apoio;
  qualquer alegacao de importacao externa exigiria escopo e evidencia proprios.

### RF03 — Fontes oficiais e manutencao editorial

- Verificar o endereco de acesso, caminhos, rotulos e acoes externas em fonte
  oficial ou material validado pela equipe responsavel antes da implementacao.
- Registrar no conteudo ou metadados versionados fonte, data da verificacao
  e contexto relevante, como perfil de acesso e variante da interface.
- Apresentar data de revisao do tutorial ao usuario, sem confundi-la com data
  da Carta ou de publicacao do servico.
- Nao solicitar, armazenar ou incluir credenciais reais em instrucoes ou assets.
- Nao publicar URLs inventadas, instrucao provisoria como definitiva ou promessa
  de que os menus atuais sempre terao a mesma aparencia.
- Se nao for possivel verificar um passo, registrar a pendencia documental
  antes da implementacao; orientacoes genericas nao comprovam aceite de um
  tutorial operacional completo.
- Orientar o usuario a consultar ajuda quando a tela encontrada divergir,
  sem tentar automatizar acesso, descobrir permissoes ou contornar restricoes.

### RF04 — Correspondencia dos dados e integracao com copia

- Integrar os campos de copia da 012 na mesma pagina, com rotulos e associacao
  clara entre a informacao preparada e a orientacao de transferencia.
- Usar a mesma Carta atual da sessao, sem segunda versao editavel ou alteracao
  automatica para adequar o texto a um campo externo.
- Conciliar a cobertura de nome, nome popular, descricao, publico-alvo,
  criterios, documentos, etapas, prazo, custos, canais, agendamento, como
  agendar e informacoes adicionais com o contrato final da 007.
- Registrar no planejamento o mapeamento entre dados locais e campos externos
  verificados. Nao afirmar equivalencia integral, obrigatoriedade externa ou
  correspondencia um para um sem evidencia.
- Quando a plataforma pedir informacao adicional ou estrutura diferente,
  orientar a revisao e entrada manual; nao inventar valores, converter ausencia
  em gratuidade ou afirmar que copiar preenche o cadastro inteiro.
- A 012 define botoes, area de transferencia, sucesso, falha e alternativa
  manual. A 011 define sua integracao editorial, sem duplicar o mecanismo.
- Sucesso de copia significa somente copia. O tutorial nao detecta colagem,
  salvamento, analise ou publicacao externos e nao anuncia essas acoes concluidas.
- Conciliar a spec 012 com agendamento nao informado e orientacao de como
  agendar da 007: nao copiar Nao a partir de default ou valor legado sem resposta
  explicita. Registrar a revisao necessaria da 012 antes da implementacao conjunta.

### RF05 — Sem dados, Carta parcial e continuidade

- Sem Carta, manter todas as instrucoes disponiveis e oferecer `Preencher
  Carta` para `/formulario-carta`, com estado vazio definido pela 012.
- Com Carta parcial, permitir consultar tutorial e copiar os campos preenchidos,
  sem bloquear acesso por obrigatorios ausentes ou sugestoes editoriais.
- Oferecer `Editar informacoes` para `/formulario-carta` quando houver dados,
  preservando a mesma Carta. Ao retornar, exibir valores atualizados.
- Oferecer acesso a revisao em `/previa` quando pertinente, sem exigir que
  seja concluida antes de ler o tutorial.
- Reutilizar recuperacao de sessao da 007. Dados ausentes, invalidos ou
  armazenamento indisponivel nao impedem a leitura das instrucoes.
- Nao limpar a Carta ao abrir, sair, copiar ou acessar a plataforma oficial.
  Nao adicionar persistencia propria, historico ou sincronizacao entre abas.

### RF06 — Recursos visuais e links externos

- Usar capturas ou ilustracoes de apoio quando ajudarem a localizar a acao,
  sem substituir a instrucao textual essencial.
- Capturas operacionais devem corresponder a fonte verificada e ter legenda
  contextual, alternativa textual adequada e origem/data registradas.
- Nao incluir dados pessoais, credenciais, solicitacoes reais ou informacoes
  institucionais restritas nas capturas. Usar material autorizado ou demonstrativo.
- Manter assets no projeto, sem depender de URLs temporarias do Figma ou de
  imagens remotas essenciais para entender o passo.
- Nao apresentar mockups ou exemplos como captura autentica da interface atual.
- Links externos devem ter destino oficial verificado e nome que indique sua
  finalidade. Definir abertura em nova aba no planejamento e avisar no nome
  acessivel quando adotada, preservando a Carta e a navegacao interna.
- O tutorial deve continuar compreensivel quando uma imagem nao carregar.

### RF07 — Ajuda e conteudo versionado

- Disponibilizar `Preciso de ajuda` para `/ajuda`, reutilizando a acao do shell
  quando existir, sem duplicar suporte por e-mail ou agendamento.
- Distinguir ajuda oferecida pelo Simplifica Carta de eventuais canais oficiais
  externos; incluir estes ultimos somente quando verificados e pertinentes.
- Manter introducao, passos, rotulos, avisos, fontes, datas e legendas em
  conteudo versionado separado da apresentacao visual, evoluindo
  `src/content/tutorial/paraiba-digital.ts`.
- Preservar acentuacao e linguagem simples. Exemplos devem ser identificados
  como ilustrativos e nao como regras universais do servico.
- Submeter o passo a passo e a correspondencia dos campos a validacao da equipe
  responsavel. Esta spec nao declara copy ou fluxo externo homologados.

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

## Requisitos nao funcionais

- Funcionar no frontend sem backend, login no app, envio de dados da Carta,
  preenchimento automatizado ou acesso a conta externa.
- Nao registrar textos da Carta em logs ou telemetria nem criar persistencia
  permanente. O acesso externo ocorre por acao explicita em link.
- Tratar dados da Carta como texto, sem executar HTML ou scripts.
- Oferecer titulos semanticos, lista de passos e destinos compreensiveis,
  foco visivel e consulta por teclado e leitor de tela.
- Nao depender exclusivamente de imagem, cor, icone ou coordenadas da tela
  para transmitir uma instrucao.
- Funcionar em desktop, tablet e smartphone, com ampliacao, imagens adaptadas
  e textos longos sem corte, sobreposicao ou rolagem horizontal da pagina.
- Reutilizar shell, tokens e Inter com os fallbacks globais.
- Validar consulta e navegacao em Chrome, Edge, Firefox e Safari, incluindo
  imagem indisponivel e alternativa manual de copia definida na 012.

## Referencias visuais e pendencias

O mapa local ainda nao identifica frame oficial especifico para o tutorial.
Nao usar o card de entrada de `Explorar por etapas` como layout desta pagina.

Antes da implementacao visual, identificar e consultar via MCP o frame no
Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e consultar o Figma
Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Registrar no
`implementation-plan.md` composicao, passos, integracao da copia, assets,
estados vazio/parcial/preenchido e responsividade; atualizar o mapa de telas.

Figma orienta a apresentacao; nao comprova sozinho que instrucoes operacionais,
URLs e campos externos estao atuais. O planejamento deve verificar ERS e fontes
oficiais, obter validacao editorial e resolver divergencias com 007 e 012 antes
do codigo. Enquanto isso, o tutorial operacional permanece pendente de validacao.

## Fora de escopo

- Login externo, coleta de credenciais, automacao de navegador ou integracao
  com APIs do Paraiba Digital.
- Publicar, enviar, aprovar ou confirmar cadastro externo pelo Simplifica Carta.
- Detectar se o usuario colou, salvou ou concluiu a publicacao.
- Importacao CSV externa, download de formatos adicionais ou copia integral.
- Editar a Carta no tutorial, gerar redacao ou criar regras de validacao proprias.
- Historico, progresso persistido, certificados ou rascunhos permanentes.
- Criar area completa de materiais de apoio, curso, suporte ou agenda.

## Dependencias

- `001-fundacao-do-projeto` e `002-home-e-navegacao`: estrutura, sessao e shell.
- `003-explorar-por-etapas`: entrada independente para o tutorial.
- `007-formulario-carta-servico`: dados atuais e retorno para edicao.
- `008-validacao-linguagem-simples`, `009-previa-html` e `010-exportacao-csv`:
  coerencia da jornada, sem tornar revisao ou exportacao requisito de acesso.
- `012-copia-dados-tutorial`: componente e comportamento de copia individual;
  planejamentos 011 e 012 devem conciliar a mesma pagina e contratos.
- `013-fluxo-de-ajuda` e `016-responsividade-acessibilidade`: alinhamento
  transversal, sem adiar acessibilidade ou implementar ajuda nesta feature.
- Fontes operacionais verificadas, assets autorizados, validacao editorial e
  identificacao do frame.

Na criacao desta spec, 013 e 016 ainda nao possuem pastas em `specs/`.
As tres orientacoes atuais sao conteudo inicial e nao representam um tutorial
operacional concluido. O comportamento de agendamento na spec 012 recebeu
conciliacao com 007 antes da implementacao conjunta.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir tutorial pela etapa, previa, navegacao ou URL direta e recarga. | Acessar sem exigir diagnostico, login no app, Carta ou CSV. |
| CA02 | Consultar o passo a passo. | Encontrar cobertura da preparacao, acesso, localizacao, transferencia, revisao, conclusao e ajuda, em ordem coerente. |
| CA03 | Revisar instrucoes operacionais e links. | Encontrar fontes verificadas, contexto e data de revisao, sem menus ou URLs inventados. |
| CA04 | Consultar uma orientacao sobre salvar, enviar ou publicar. | Distinguir as acoes efetivamente existentes, sem presumir aprovacao ou publicacao imediata. |
| CA05 | Abrir sem dados ou com sessao invalida/indisponivel. | Manter instrucoes consultaveis e estado vazio com acesso ao formulario. |
| CA06 | Usar Carta parcial com pendencias ou sugestoes. | Consultar tutorial e copiar valores preenchidos conforme 012, sem bloqueio global. |
| CA07 | Editar a Carta e voltar ao tutorial. | Exibir dados atuais da mesma sessao, sem apagar valores ou manter versao editavel duplicada. |
| CA08 | Consultar mapeamento entre Carta e campos externos. | Encontrar correspondencias verificadas e orientacao para diferencas, sem inventar valores ou equivalencia homologada. |
| CA09 | Consultar agendamento nao informado e orientacao de como agendar. | Usar contrato conciliado de 007/012, sem inferir Nao do default; preservar valores inativos apenas na sessao e transferir configuracoes aplicaveis. |
| CA10 | Copiar ou falhar na copia de um campo. | Usar retorno e alternativa manual da 012, sem anunciar cadastro, colagem ou publicacao externos. |
| CA11 | Abrir plataforma oficial por link. | Usar destino verificado e comportamento acessivel, preservando a Carta no app. |
| CA12 | Consultar captura demonstrativa ou imagem que nao carrega. | Identificar contexto e legenda, continuar pela instrucao textual e nao expor dados reais ou credenciais. |
| CA13 | Navegar por teclado e leitor de tela. | Identificar passos, imagens, links e acoes de copia com foco e ordem coerentes. |
| CA14 | Consultar textos longos e capturas em telas pequenas e com ampliacao. | Manter leitura e acoes acessiveis sem corte, sobreposicao ou rolagem horizontal. |
| CA15 | Encontrar tela externa diferente da referencia. | Receber orientacao de ajuda sem automacao, coleta de credenciais ou promessa de acompanhamento externo. |
| CA16 | Revisar arquitetura, conteudo e implementacao visual futura. | Encontrar conteudo versionado, fontes e consultas Figma registradas, shell reutilizado e ausencia de integracao ou persistencia permanente. |
| CA17 | Consultar ou transferir dados em Nao/Sim, Paraiba Digital, externo dentro/fora e apos troca de sistema. | Respeitar configuracoes ativas conforme 007 CA19–CA24; nao apresentar ou transferir valores inativos preservados na sessao; aplicar apenas validacao prevista por esta feature. |

## Proximo passo

Executar `/spec:planejar 011-tutorial-paraiba-digital` para definir fontes,
conteudo operacional, mapeamento dos campos, composicao e integracao com 012.
Depois, criar tarefas e `implementation-plan.md`, resolver pendencias e
executar `/spec:validar` antes de `/spec:implementar`.

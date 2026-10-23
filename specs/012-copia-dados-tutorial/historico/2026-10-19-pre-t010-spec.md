# Spec: Copia de dados no tutorial

> **Dependência atualizada em 16 de outubro de 2026:** consumir o modelo v3 da
> 007. Palavras-chave agora possuem origem direta; recorrência e canais
> genéricos não integram a Carta. A tabela v2 abaixo é histórica.

## Objetivo

Permitir que o servidor consulte e copie individualmente as informacoes da
Carta de Servicos preenchidas na sessao, durante o tutorial do Paraiba Digital,
para realizar o cadastro manual na plataforma oficial.

## Problema e contexto

O usuario ja organizou os dados no formulario e precisa transferi-los para o
cadastro oficial. Sem campos identificados e uma acao de copia individual,
precisa transcrever textos ou procurar informacoes em outras etapas, aumentando
o retrabalho e o risco de omissoes.

A feature complementa `011-tutorial-paraiba-digital` na rota existente
`/tutorial-paraiba-digital`. Nao cria uma pagina independente. O tutorial deve
continuar consultavel por quem chega diretamente, mesmo sem preencher a Carta.
A regiao desta feature pertence exclusivamente a etapa 4, identificada por
`fill-information`, acessivel em `/tutorial-paraiba-digital?etapa=4` e
representada no Figma pelo node `564:980`.

## Usuarios impactados

- Servidor responsavel por cadastrar manualmente a Carta no Paraiba Digital.
- Servidor que revisa ou corrige os dados antes de transferi-los.
- Equipe GESED, que orienta o preenchimento e a preparacao das informacoes.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: escopo do MVP,
  copia individual e cadastro manual.
- `docs/produto/mvp.md`, `escopo.md`, `personas.md` e `fluxos.md`: usuarios,
  jornada e acesso independente ao tutorial.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: documentacao
  antes do codigo, limites de persistencia e consulta visual antes de implementar.
- `docs/arquitetura/decisoes-tecnicas.md`: estado de sessao e regras de validacao.
- `docs/design-system/mapa-figma-telas.md`: referencias visuais documentadas.
- `src/features/carta/carta.types.ts`, `carta.schema.ts` e `carta.storage.ts`:
  modelo inicial e armazenamento temporario existentes.
- `src/pages/TutorialParaibaDigitalPage.tsx`,
  `src/content/tutorial/paraiba-digital.ts` e `src/app/routes.tsx`: ponto de
  integracao. `tutorialParaibaDigitalContent.steps[3]` define titulo, descricao,
  introducao da copia, blocos visuais, acao de edicao e navegacao da etapa 4.

Esta spec usa as fontes textuais acima; nao declara validacao do PDF do ERS
nem consulta direta ao Figma nesta etapa.

## Requisitos funcionais

### RF01 — Acesso e continuidade do tutorial

- Disponibilizar os campos de copia somente na etapa 4 de
  `/tutorial-paraiba-digital`, junto das orientacoes da feature 011.
- Manter as instrucoes do tutorial disponiveis com ou sem dados da Carta.
- Explicar que copiar prepara o texto para colagem e que o cadastro e a
  publicacao continuam sendo realizados manualmente no Paraiba Digital.
- Nao exigir exportacao CSV, conclusao do diagnostico ou percurso sequencial
  das etapas para consultar o tutorial. Para copiar, abrir diretamente
  `?etapa=4`, sem exigir conclusao das etapas 1–3.

### RF01A — Contrato editorial da etapa 4

- Usar `quickCopyIntroduction`, `quickCopyFields`, `editPrompt`, `editAction`
  e `actions` de `tutorialParaibaDigitalContent.steps[3]`; nao duplicar esses
  textos no JSX nem criar uma segunda fonte editorial na 012.
- Preservar a ordem dos dez blocos versionados. Somente entradas que possuem
  `copyLabel` recebem acao de copia: nome do servico, nome popular, descricao,
  documentos, publico e prazo.
- Projetar esses seis IDs visuais para a Carta: `service-name` → `nome`,
  `popular-name` → `nome-popular`, `service-description` → `descricao`,
  `required-documents` → `documentos`, `audience` → `publico-alvo` e
  `service-deadline` → `prazo`.
- Os outros quatro blocos (`additional-information`, `keywords`, `scheduling`
  e `cost`) permanecem na composicao definida pelo conteudo, sem ganhar botao
  de copia por inferencia. `keywords` usa exclusivamente
  `informacoesFinais.palavrasChave` e nunca deve ser fabricado a partir de
  outros campos.
- Os valores existentes em `quickCopyFields` sao exemplos editoriais da tela,
  nao uma segunda Carta. Quando houver dado da sessao para um bloco mapeado,
  ele prevalece; ausente usa o estado `Nao informado`, nunca o exemplo como
  dado real copiavel.

### RF02 — Dados da sessao e atualizacao

- Usar a mesma Carta da sessao utilizada pelo formulario e pela previa.
- Ao acessar ou retornar ao tutorial, apresentar os valores atuais, incluindo
  alteracoes feitas no formulario durante a mesma sessao.
- Nao manter uma segunda versao editavel dos dados no tutorial.
- Oferecer a acao `Editar informacoes` para `/formulario-carta`, preservando
  os dados disponiveis na sessao.
- Nao restaurar dados de outra sessao, criar historico ou salvar rascunhos
  permanentes. Recarregamentos podem reutilizar a sessao temporaria existente.
- Dados ausentes, invalidos ou armazenamento indisponivel nao podem derrubar
  o tutorial. Usar o estado valido em memoria, quando houver; caso contrario,
  apresentar o estado sem dados com orientacao para preencher o formulario.

### RF03 — Campos de transferencia e projecao visual

Revisao documental em 2026-10-05, durante `/spec:plano-implementacao`, conforme
T002: cobertura e semantica conciliadas com modelo v2/decoder da 007 e
integracao da 011. Nao representa implementacao, consulta visual ou aceite.

O seletor neutro pode cobrir os 17 campos do modelo local para reuso e evolucao,
mas a etapa 4 renderiza somente a projecao definida em RF01A. Ter um campo no
seletor nao autoriza criar card ou botao ausente em `quickCopyFields`.

| Campo apresentado | Origem na Carta | Representacao para copia |
| --- | --- | --- |
| Nome do servico | `identificacao.nome` | Texto preenchido. |
| Nome popular do servico | `identificacao.nomePopular` | Texto preenchido. |
| Descricao do servico | `identificacao.descricao` | Texto preenchido. |
| Publico-alvo | `identificacao.publicoAlvo` | Texto preenchido. |
| Documentos necessarios | `requisitos.documentos` | Um documento por linha, com nome e indicacao de obrigatorio ou opcional somente quando explicitamente informada; null preserva somente nome. |
| Criterios de acesso | `requisitos.criterios` | Texto preenchido. |
| Canais de atendimento | `atendimento.canais` | Um canal por linha, com descricao e tipo em linguagem simples somente quando informado; null preserva somente descricao. |
| Prazo | `atendimento.prazo` | Texto preenchido. |
| Custos | `atendimento.custo` | Texto preenchido; preservar valores como `0` e declaracoes de gratuidade. |
| Necessita de agendamento? | `atendimento.exigeAgendamento` | `Sim` para true e `Não` para false explicito no modelo v2; null e ausente. |
| Tipo de agendamento | `atendimento.tiposAgendamento` | Online, Presencial ou ambos; obrigatorio com Sim. |
| Sistema de agendamento | `atendimento.sistemaAgendamento` | Paraiba Digital ou Outro sistema ou site; escolha unica obrigatoria com Sim. |
| Link do agendamento | `atendimento.linkAgendamento` | URL obrigatoria somente para Outro sistema ou site. |
| Como o agendamento sera exibido? | `atendimento.exibicaoAgendamento` | Dentro do Paraiba Digital ou Em uma nova pagina; escolha unica obrigatoria somente para Outro sistema ou site. |
| Orientacoes de agendamento | `atendimento.orientacaoAgendamento` | Texto opcional copiavel somente com Sim. |
| Etapas do servico | `etapas` | Sequencia normalizada pela 007, com numero de origem e descricao, uma por linha; preservar lacunas ao omitir itens sem texto. |
| Informacoes adicionais | `informacoesComplementares` | Texto preenchido. |

- A tabela descreve os dados locais, sem afirmar correspondencia homologada
  com campos ou nomes atuais da plataforma externa.
- Manter acentos, pontuacao, quebras de linha e o conteudo informado. Nao
  aplicar sugestoes de linguagem simples automaticamente durante a copia.
- Copiar somente o valor apresentado para transferencia, sem incluir botoes,
  mensagens de estado ou o rotulo externo ao campo.
- Representar listas como texto simples legivel, sem JSON, marcacao HTML ou
  detalhes internos do modelo. Preservar a ordem de documentos e canais.
- Itens de lista sem nome ou descricao util nao devem gerar linhas vazias ou
  valores inventados. Se nenhum item tiver conteudo, tratar o campo como vazio.
- Agendamento nao informado e null. false legado sem resposta confirmada
  passa pela migracao da 007 e nao vira `Não` apenas porque outros campos
  possuem conteudo. Copiar false somente como resposta explicita do modelo v2.
- Carta com conteudo significa algum texto util ou agendamento true/false
  explicito. IDs, numeros de ordem e defaults nao comprovam preenchimento.
- Preservar texto util de itens parciais, sem inventar classificacao/tipo;
  avisos de incompletude ou resposta em revisao ficam fora do texto copiado.

### RF04 — Acao de copia e retorno ao usuario

- Copiar apenas apos acao explicita no campo correspondente.
- Nao ler a area de transferencia nem copiar automaticamente ao abrir a pagina.
- Exibir `Copiado!` associado ao campo somente quando a operacao for concluida
  com sucesso. A mensagem significa copia, nunca cadastro ou publicacao.
- Enquanto a operacao estiver em andamento, impedir acionamentos duplicados
  no mesmo campo e indicar o estado de processamento.
- Permitir novas copias, inclusive de outros campos. O retorno de cada
  operacao deve permanecer associado ao campo que a originou.
- Limpar a confirmacao anterior quando o valor correspondente mudar. A
  confirmacao nao pode sugerir que um valor novo ja foi copiado.

### RF05 — Falha e alternativa manual

- Se a copia for recusada ou estiver indisponivel, informar: `Nao foi possivel
  copiar. Selecione o texto e copie manualmente.`
- Manter o texto disponivel para selecao e copia manual por teclado ou toque.
- Permitir nova tentativa sem perder dados, navegar para outra pagina ou
  impedir a leitura das demais instrucoes.
- Nunca apresentar sucesso quando a operacao falhar.

### RF06 — Campos vazios e Carta incompleta

- Para campos sem conteudo util, exibir `Nao informado` como mensagem de
  interface e indisponibilizar a acao de copia daquele campo.
- Nao copiar `Nao informado`, exemplos, placeholders, `undefined` ou `null`.
- Se nao houver dados preenchidos, apresentar `Voce ainda nao preencheu as
  informacoes da Carta.` e a acao `Preencher Carta` para `/formulario-carta`.
- Uma Carta parcial permite copiar os campos preenchidos. Orientar a revisao
  dos campos ausentes sem impor o bloqueio global utilizado para exportacao CSV.
- Sugestoes de linguagem simples permanecem orientativas e nao impedem copia.

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

## Requisitos nao funcionais

- Executar a funcionalidade no navegador, sem backend, login ou envio dos
  dados da Carta a servicos externos.
- Nao adicionar persistencia permanente ou registrar os valores copiados em
  logs e telemetria. O texto enviado por acao do usuario a area de transferencia
  fica sob o comportamento do sistema operacional; o app nao promete apaga-lo
  ao encerrar a sessao.
- Tratar os valores como texto, sem executar HTML ou scripts presentes nos dados.
- Oferecer botoes com nome acessivel que identifique o campo, como
  `Copiar nome do servico`, foco visivel e acionamento por teclado.
- Anunciar sucesso e erro a leitores de tela, sem mover o foco de forma
  inesperada e sem depender exclusivamente de cor ou icone.
- Funcionar em computador, tablet e smartphone, mantendo rotulos e acoes
  associados, textos longos legiveis e ausencia de corte ou rolagem horizontal
  da pagina. O texto integral deve continuar acessivel para copia manual.
- Validar o fluxo em Chrome, Edge, Firefox e Safari, incluindo a alternativa
  manual quando a copia automatica nao estiver disponivel.
- Manter mensagens e rotulos editoriais versionados e coerentes com o tutorial.

## Referencia visual e pendencias de planejamento

A referencia oficial desta feature e a variante da etapa 4 da pagina da 011:
[Figma node 564:980](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-980&m=dev).
Ela nao cria rota ou pagina independente; o frame principal da rota continua
`564:635`. O mapa central ja classifica `564:980` como variante.

Antes do codigo visual, consultar detalhadamente via MCP o node `564:980` e o
Figma Make (`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`). O Figma orienta layout e
hierarquia; `src/content/tutorial/paraiba-digital.ts` prevalece para textos,
ordem, existencia de botoes e acoes. Registrar divergencias sem copiar texto
antigo do frame para uma segunda fonte.

O planejamento deve conciliar esta tabela com o contrato final da feature 007
e a organizacao editorial da feature 011, incluindo rotulos das listas,
tratamento de dados parciais e duracao das mensagens de retorno. Nenhum desses
pontos autoriza inventar instrucoes ou campos da plataforma externa.

## Fora de escopo

- Publicacao, preenchimento automatico ou integracao com o Paraiba Digital.
- Autenticacao, historico, sincronizacao entre dispositivos ou abas e rascunhos
  permanentes.
- Copiar toda a Carta de uma vez, gerar arquivos ou substituir a exportacao CSV.
- Editar a Carta dentro do tutorial ou criar novas regras de validacao textual.
- Implementar as instrucoes completas do tutorial, que pertencem a feature 011.
- Rastrear se o usuario colou os dados ou concluiu o cadastro externo.

## Dependencias

- `001-fundacao-do-projeto`: modelo e armazenamento temporario da Carta.
- `002-home-e-navegacao`: shell e navegacao compartilhados.
- `007-formulario-carta-servico`: origem dos dados e retorno para edicao.
- `011-tutorial-paraiba-digital`: pagina e orientacoes que recebem a copia.
- `008-validacao-linguagem-simples`, `009-previa-html` e `010-exportacao-csv`:
  consistencia do conteudo e dos limites entre validacao, revisao e exportacao;
  sua conclusao pelo usuario nao e requisito para copiar campos.
- `016-responsividade-acessibilidade`: alinhamento transversal, sem adiar os
  requisitos de acessibilidade desta feature.

Na criacao desta spec, as pastas 007 a 011 ainda nao estao presentes em
`specs/`. Os arquivos de fundacao existentes nao representam essas features
concluidas; seus contratos devem ser conciliados no planejamento.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir o tutorial com Carta preenchida na sessao. | Exibir os campos da tabela com os valores atuais e acoes individuais. |
| CA02 | Copiar um campo textual com acentos e varias linhas. | Copiar somente seu valor integral, preservando o texto; confirmar somente apos sucesso. |
| CA03 | Copiar documentos, canais e etapas com varios itens, inclusive parciais. | Produzir texto legivel por linha, preservando texto util, atributos explicitamente informados e numeros de origem, sem inventar atributos, renumerar lacunas, expor JSON ou itens vazios. |
| CA04 | Abrir diretamente o tutorial sem Carta ou com o modelo inicial vazio. | Exibir orientacao e `Preencher Carta`; manter o tutorial consultavel e nao oferecer copia de valores iniciais. |
| CA05 | Usar Carta parcial, com campos vazios e campos preenchidos. | Permitir copia dos preenchidos; identificar ausentes sem copiar placeholders ou bloquear toda a Carta. |
| CA06 | Usar custo `0`, agendamento true/false explicito/null, false legado e texto de como agendar. | Preservar `0`; copiar Sim/Não somente de respostas explicitas no modelo v2; null e false legado nao confirmado nao oferecem copia de Não; preservar texto na sessao e oferecer copia somente quando Sim. |
| CA07 | Negar ou indisponibilizar a copia automatica. | Exibir falha, permitir selecao e copia manual e nova tentativa, sem falso sucesso. |
| CA08 | Editar a Carta no formulario e voltar ao tutorial. | Mostrar e copiar o valor atualizado, sem confirmacao herdada para texto alterado. |
| CA09 | Copiar campos diferentes em sequencia. | Associar cada confirmacao ao campo correto; nao perder dados nem anunciar publicacao. |
| CA10 | Recarregar com sessao valida ou acessar com dados ausentes/invalidos. | Reutilizar dados validos quando disponiveis; manter a pagina funcional e orientar preenchimento quando nao houver dados utilizaveis. |
| CA11 | Operar apenas por teclado e com leitor de tela. | Identificar cada botao, aciona-lo, perceber o retorno e conservar foco e ordem de leitura coerentes. |
| CA12 | Usar textos longos em desktop, tablet e smartphone. | Ler e selecionar todo o conteudo sem cortes, sobreposicoes ou rolagem horizontal da pagina. |
| CA13 | Copiar conteudo contendo marcacao HTML. | Exibir e copiar como texto, sem executa-lo. |
| CA14 | Copiar ou navegar sem concluir diagnostico, previa ou CSV. | Manter acesso independente; nao criar backend, envio externo ou persistencia permanente da Carta. |
| CA15 | Consultar e copiar agendamento em Nao/Sim, interno/externo dentro/fora e apos troca de sistema. | Aplicar 007 CA19–CA24: campos inativos sem exibicao ou copia; preservar dados na sessao; tipos permitem Online, Presencial ou ambos; copiar campos ativos preenchidos sem gate global. |
| CA16 | Abrir qualquer etapa diferente da 4. | Nao montar campos, botoes ou live regions da 012; manter somente o conteudo da etapa ativa da 011. |
| CA17 | Abrir `?etapa=4` e comparar com conteudo/Figma. | Usar node `564:980`, os dez blocos na ordem versionada, copia somente nos seis com `copyLabel` e acao `Editar na minha Carta`. |
| CA18 | Sair da etapa 4 durante ou depois de uma tentativa e retornar. | Desmontar controles e feedback transitório, ignorar retorno tardio e preservar a Carta; ao retornar, derivar valores atuais da sessao. |

## Proximo passo

Executar `/spec:planejar 012-copia-dados-tutorial` para detalhar a abordagem
tecnica e a estrategia de verificacao. Depois, criar tarefas e
`implementation-plan.md` antes de `/spec:implementar`.

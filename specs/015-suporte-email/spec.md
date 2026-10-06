# Spec: Suporte por e-mail

## Objetivo

Permitir que o servidor encontre o contato institucional de suporte, entenda
como descrever sua duvida e inicie uma mensagem em seu aplicativo de e-mail,
com alternativa manual que mantenha o canal utilizavel sem aplicativo configurado.

## Problema e contexto

O servidor pode precisar de orientacao sem solicitar atendimento agendado.
Precisa identificar o destinatario correto e preparar uma mensagem clara,
sem confundir abertura de aplicativo com envio ou recebimento pela equipe.

Esta feature ocupa `/ajuda/suporte-email`, destino da escolha de canal da 013
e alternativa da 014. O escopo inicial e contato via e-mail do usuario, sem
formulario de envio no aplicativo ou backend de mensagens. Notificacoes do
agendamento permanecem responsabilidade da 014.

O suporte e orientativo sobre levantamento, organizacao e elaboracao da Carta
e preparacao do cadastro manual. Nao substitui revisao oficial da GESED,
aprova Cartas ou publica servicos no Paraiba Digital.

## Usuarios impactados

- Servidor que precisa esclarecer uma duvida por e-mail.
- Equipe GESED, que precisa receber mensagens com contexto suficiente e
  manter o canal institucional atualizado.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: canal de
  suporte orientativo e contato institucional `gesed.semtd@gmail.com`.
- `docs/produto/mvp.md`, `escopo.md`, `personas.md` e `fluxos.md`: escolha
  independente de e-mail ou atendimento agendado.
- `docs/arquitetura/decisoes-tecnicas.md` e
  `docs/decisoes/adr-003-backend-atendimento.md`: backend para registro e
  notificacoes do atendimento, sem armazenamento da Carta.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  conteudo versionado e consulta visual antes de implementar.
- `specs/013-fluxo-de-ajuda/spec.md`: encaminhamento sem envio automatico,
  contato validado e preservacao da Carta.
- `specs/014-atendimento-agendado/spec.md`: alternativa por e-mail e
  separacao de notificacoes do agendamento.
- `src/app/routes.tsx` e `src/pages/SuporteEmailPage.tsx`: rota existente e
  placeholder que apresenta o mesmo endereco registrado no material local.
- `docs/design-system/mapa-figma-telas.md`: ausencia de frame especifico
  identificado para suporte por e-mail.

Esta spec utiliza fontes textuais locais. Nao declara leitura do PDF do ERS,
consulta direta ao Figma ou verificacao de atividade, titularidade e recebimento
do endereco de suporte. A equipe deve confirmar o contato antes da publicacao.

## Requisitos funcionais

### RF01 — Acesso e apresentacao

- Disponibilizar `/ajuda/suporte-email` pela escolha de canal da 013,
  alternativa da 014 e URL direta, inclusive apos recarga.
- Nao exigir login no aplicativo, diagnostico, Carta preenchida, exportacao
  ou solicitacao anterior.
- Reutilizar shell e breadcrumb com retorno ao inicio e a `/ajuda`.
- Exibir titulo `Suporte por e-mail` e orientacao em linguagem simples sobre
  finalidade do canal e preparacao da mensagem.
- Nao prometer resposta imediata, prazo, horario de funcionamento ou aprovacao
  da Carta sem validacao institucional desses compromissos.

### RF02 — Endereco institucional e manutencao

- Apresentar endereco legivel e selecionavel, com destinatario identico ao
  usado na acao de contato e em eventual acao de copia.
- Usar `gesed.semtd@gmail.com` como referencia documentada inicial, sujeita a
  confirmacao da equipe responsavel. Nao substituir por endereco inventado.
- Manter contato e rotulos em fonte versionada unica, reutilizavel pela 013,
  evitando destinatarios divergentes em arquivos distintos.
- Registrar a validacao do contato no planejamento antes da implementacao;
  formato sintaticamente valido nao comprova que o canal esta operacional.
- Se houver indisponibilidade confirmada, informar de forma verdadeira e
  oferecer retorno a ajuda ou atendimento agendado quando operacional, sem
  anunciar recebimento de mensagem.
- Diferenciar o suporte orientativo da GESED de canais tecnicos externos da
  plataforma. Contatos externos adicionais dependem de verificacao e escopo.

### RF03 — Orientacoes para escrever a mensagem

- Orientar o usuario a informar nome, orgao/setor e contexto da duvida no
  proprio e-mail, com assunto claro e etapa do manual relacionada quando util.
- Recomendar descricao objetiva do problema e resultado esperado, sem exigir
  no aplicativo o preenchimento desses dados como formulario.
- Identificar exemplos de assunto ou corpo como ilustrativos, sem inserir
  dados ficticios como se fossem informacoes reais do solicitante.
- Orientar a nao enviar senhas, documentos pessoais ou dados de cidadaos.
  Nao exigir anexos, a Carta completa ou exportacao CSV para obter suporte.
- Nao afirmar que a equipe revisara ou aprovara formalmente toda Carta enviada.
- Manter instrucoes utilizaveis por quem usa webmail, aplicativo de escritorio
  ou dispositivo movel, sem depender de um provedor especifico.

### RF04 — Acao explicita de contato

- Oferecer link com rotulo claro, como `Abrir aplicativo de e-mail`, usando
  `mailto:` para o contato validado.
- Acionar somente por escolha explicita. Abrir a pagina nao abre o aplicativo,
  envia mensagem ou solicita atendimento automaticamente.
- Explicar que a acao abre o aplicativo de e-mail configurado e que o usuario
  deve revisar e enviar a mensagem nesse aplicativo.
- O planejamento deve definir se ha assunto ou corpo generico predefinido;
  se adotado, usar texto versionado, codificacao adequada de parametros e
  preservar destinatario fixo, sem incluir valores da sessao ou credenciais.
- Nao capturar campos da Carta, respostas do diagnostico ou dados de atendimento
  para embuti-los no link. O usuario decide o conteudo da mensagem externa.
- Nao exibir `Mensagem enviada`, `Solicitacao recebida`, protocolo ou sucesso
  de entrega com base na abertura do link. O app nao acompanha envio, leitura
  ou resposta externos.

### RF05 — Alternativa manual e copia do endereco

- Manter endereco e instrucoes visiveis e selecionaveis mesmo quando o link
  nao abrir aplicativo ou nao houver configuracao de e-mail.
- Orientar a abrir o webmail/aplicativo de preferencia, criar mensagem e usar
  o endereco apresentado como destinatario, sem bloquear outras acoes.
- Nao presumir que o navegador informa confiavelmente se o aplicativo abriu;
  disponibilizar a alternativa manual independentemente dessa deteccao.
- Oferecer `Copiar endereco de e-mail` como conveniencia, somente por acao
  explicita, copiando o endereco sem `mailto:`, assunto, corpo ou markup.
- Confirmar copia apenas apos sucesso. Em falha ou indisponibilidade, informar
  que o endereco pode ser selecionado e copiado manualmente; permitir tentativa
  posterior e nao ler a area de transferencia.
- Diferenciar `Endereco copiado` de mensagem enviada. Evitar acionamentos
  duplicados enquanto a mesma copia estiver em andamento.
- Reutilizar utilitario compartilhado de copia quando houver; nao acoplar
  copia de contato ao estado da Carta ou exigir a feature 012 para mostrar o canal.

### RF06 — Continuidade e alternativas

- Preservar integralmente a Carta da sessao ao entrar, copiar contato, abrir
  aplicativo de e-mail ou voltar ao formulario.
- Nao inicializar, limpar, ler ou transmitir dados da Carta para renderizar
  o canal; nao manter uma segunda versao de dados ou rascunho de mensagem no app.
- Oferecer retorno a `/ajuda`, alternativa `/ajuda/atendimento-agendado` e
  acesso a `/formulario-carta` com rotulos claros.
- Nao reservar horario nem enviar solicitacao ao escolher a alternativa.
- Funcionar por acesso direto sem depender exclusivamente do historico do
  navegador. Indisponibilidade do backend da 014 nao impede consulta do contato.

### RF07 — Conteudo versionado

- Manter titulo, introducao, contato, instrucoes, exemplos e mensagens de
  copia fora da apresentacao visual, seguindo `src/content/`.
- Validar redacao, contato e escopo com a equipe responsavel antes de publicar.
- Preservar acentuacao e linguagem simples. Alteracao do contato deve atualizar
  endereco exibido, link e copia a partir da mesma fonte.

## Requisitos nao funcionais

- Funcionar no frontend sem formulario de envio, backend, SMTP, login no app
  ou persistencia de mensagens. O aplicativo externo de e-mail realiza o envio
  sob controle do usuario.
- Nao registrar valores da Carta, mensagens ou dados pessoais em logs ou
  telemetria. Nao incluir segredos ou credenciais de provedor no frontend.
- Tratar conteudo como texto, sem executar HTML ou scripts. Manter destinatario
  controlado e parametros do link construidos a partir de conteudo versionado.
- Oferecer links/botoes com nomes acessiveis, foco visivel e operacao por teclado.
  Anunciar retorno da copia sem mudar foco inesperadamente ou depender de cor.
- Funcionar em desktop, tablet e smartphone, com ampliacao de texto, endereco
  longo e ausencia de corte, sobreposicao ou rolagem horizontal da pagina.
- Reutilizar shell, tokens e Inter com os fallbacks globais.
- Validar em Chrome, Edge, Firefox e Safari, incluindo aplicativo configurado,
  ausencia de aplicativo e copia automatica indisponivel. Os testes nao devem
  enviar mensagens reais ao canal institucional.

## Referencias visuais e pendencias

O mapa local ainda nao identifica frame especifico de suporte por e-mail.
O node `169:495` pertence a FAQ/entrada de ajuda e nao define sozinho esta pagina.

Antes da implementacao visual, identificar e consultar o frame via MCP no
Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e consultar o Figma
Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Registrar composicao, contato,
acoes, estados de copia, assets e responsividade no `implementation-plan.md`
e atualizar o mapa. Resolver divergencias antes de implementar.

O planejamento deve conciliar ERS, contato ativo, textos, comportamento do
`mailto:`, alternativa manual e eventual utilitario de copia. Se o prototipo
trouxer formulario de envio no app, registrar e resolver a divergencia de
escopo antes de adicionar backend ou coleta de dados.

## Fora de escopo

- Enviar e-mail pelo aplicativo, integrar SMTP/API de mensagens ou receber
  respostas dentro do Simplifica Carta.
- Criar formulario de contato, anexos, protocolo, tickets ou acompanhamento.
- Detectar envio, entrega, leitura ou prazo de resposta da mensagem externa.
- Notificacoes do atendimento agendado, que pertencem a 014.
- Anexar automaticamente Carta, CSV, documentos ou dados da sessao.
- Chat, triagem automatica, login, historico ou rascunhos permanentes.
- Aprovar, cadastrar ou publicar servicos no Paraiba Digital.

## Dependencias

- `001-fundacao-do-projeto` e `002-home-e-navegacao`: rota, shell e links.
- `013-fluxo-de-ajuda`: escolha do canal e conteudo institucional compartilhado.
- `014-atendimento-agendado`: alternativa, sem tornar seu backend requisito
  para consultar o contato por e-mail.
- `007-formulario-carta-servico`: continuidade da Carta na navegacao.
- `016-responsividade-acessibilidade`: alinhamento transversal, sem adiar
  os requisitos desta pagina.
- Confirmacao institucional do endereco, validacao editorial e frame oficial.

Na criacao desta spec, 016 ainda nao possui pasta em `specs/`. O placeholder
de e-mail nao comprova atividade do contato ou funcionalidade de suas acoes.
Nenhuma mensagem real foi enviada nesta etapa.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir pela ajuda, alternativa de agendamento, URL direta ou recarga. | Consultar o canal sem login, diagnostico, Carta ou exportacao. |
| CA02 | Consultar endereco e iniciar contato. | Encontrar contato validado identico no texto, link e copia. |
| CA03 | Acionar link com aplicativo de e-mail configurado. | Solicitar abertura da mensagem para o destinatario correto, com texto generico definido, sem envio automatico. |
| CA04 | Usar ambiente sem aplicativo configurado ou abertura indisponivel. | Encontrar endereco selecionavel e instrucao de uso manual por webmail/aplicativo. |
| CA05 | Copiar o endereco com sucesso ou falha. | Confirmar somente copia concluida; em falha, oferecer selecao manual sem falso sucesso. |
| CA06 | Consultar orientacoes para descrever a duvida. | Encontrar contexto recomendado e exemplos identificados, sem coleta no app ou exigencia de anexos. |
| CA07 | Abrir canal com Carta preenchida e voltar ao formulario. | Preservar dados e nao inclui-los no link, copia de contato ou transmissao automatica. |
| CA08 | Abrir link ou copiar endereco. | Nao anunciar envio, recebimento, protocolo, entrega ou leitura de mensagem. |
| CA09 | Alterar contato na fonte versionada. | Atualizar texto, link e copia sem destinatarios divergentes. |
| CA10 | Escolher atendimento agendado ou retornar a ajuda por acesso direto. | Navegar aos destinos corretos sem depender de historico ou criar solicitacao. |
| CA11 | Usar teclado, leitor de tela e texto ampliado em telas pequenas. | Identificar contato/acoes e retorno de copia, com foco coerente e sem corte ou scroll horizontal. |
| CA12 | Revisar indisponibilidade confirmada e textos institucionais. | Oferecer alternativa verdadeira sem prazo inventado, promessa de aprovacao ou confusao com suporte externo. |
| CA13 | Revisar arquitetura e implementacao visual futura. | Encontrar conteudo versionado, consultas Figma registradas e ausencia de backend de envio, coleta, anexos automaticos ou persistencia de mensagens. |

## Proximo passo

Executar `/spec:planejar 015-suporte-email` para definir fonte do contato,
link, copia, composicao e verificacoes. Depois, criar tarefas e
`implementation-plan.md`, resolver pendencias e executar `/spec:validar`
antes de `/spec:implementar`.

# Spec: Atendimento agendado

> **Referencia compartilhada atualizada em 16 de outubro de 2026:** o node
> `425:201` e a entrada dos canais de ajuda e pertence tambem a 015. O card de
> atendimento inicia a jornada da 014; o card de e-mail exibe o contato da
> GESED e a acao `Copie o e-mail`.

## Objetivo

Permitir que o servidor consulte datas e horarios disponiveis, revise seus
dados institucionais e solicite atendimento orientativo, com registro no
backend, retorno verdadeiro ao usuario e notificacao da equipe responsavel.

## Problema e contexto

Algumas duvidas sobre levantamento, organizacao e elaboracao da Carta exigem
orientacao direta. O usuario precisa escolher um horario disponivel e receber
confirmacao do registro, enquanto a equipe precisa receber dados suficientes
para organizar o atendimento sem coletar a Carta ou documentos pessoais.

Esta feature ocupa `/ajuda/atendimento-agendado`, acessada pela escolha de canal
da 013. Conforme ADR-003, exige backend minimo para disponibilidade, registro e
notificacao. Selecionar horario nao cria solicitacao; somente a confirmacao
explicita envia os dados. O atendimento nao aprova Cartas nem publica servicos.

## Usuarios impactados

- Servidor que solicita orientacao sobre preparacao da Carta e cadastro manual.
- Equipe GESED, que recebe e organiza solicitacoes de atendimento.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: campos,
  disponibilidade, revisao antes de envio, registro e notificacao.
- `docs/produto/mvp.md`, `escopo.md` e `fluxos.md`: atendimento minimo e
  ausencia de gestao completa de agenda no MVP.
- `docs/arquitetura/arquitetura-sistema.md` e `decisoes-tecnicas.md`:
  backend limitado a atendimento; Carta permanece no navegador.
- `docs/decisoes/adr-003-backend-atendimento.md`: separacao de dados e
  persistencia minima para atendimento.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  conteudo versionado e consulta visual antes da implementacao.
- `specs/013-fluxo-de-ajuda/spec.md`: escolha de canal sem envio, preservacao
  da Carta e ausencia de promessas sobre disponibilidade ou prazo de resposta.
- `src/app/routes.tsx`, `src/pages/AtendimentoAgendadoPage.tsx` e
  `src/features/atendimento/atendimento.types.ts`: rota, placeholder e tipo
  inicial; ainda nao existem API, banco ou fluxo de envio implementados.
- `docs/design-system/mapa-figma-telas.md`: quatro frames da jornada de
  atendimento, com `425:201` como pagina inicial.

Esta spec utiliza fontes textuais locais. Nao declara leitura do PDF do ERS,
consulta direta ao Figma, agenda operacional ou validacao juridica da politica
de dados. As regras institucionais pendentes devem ser resolvidas no planejamento.

## Requisitos funcionais

### RF01 — Acesso e orientacao

- Disponibilizar `/ajuda/atendimento-agendado` pela 013 e por URL direta e
  recarga, sem login no aplicativo, diagnostico ou Carta preenchida.
- Reutilizar shell e breadcrumb com retorno ao inicio e a `/ajuda`.
- Explicar finalidade orientativa, etapas de escolha, preenchimento, revisao
  e confirmacao, sem prometer aprovacao institucional ou publicacao.
- Informar modalidade, duracao e instrucoes de participacao somente depois
  de definicao pela equipe responsavel. Nao inventar local, link de reuniao,
  prazo de resposta ou condicoes de atendimento.

### RF02 — Disponibilidade e selecao

- Consultar datas e horarios oferecidos pelo backend; nao gerar disponibilidade
  ficticia no frontend ou permitir selecionar qualquer data sem validacao.
- Diferenciar carregamento, consulta concluida sem horarios, falha de consulta
  e disponibilidade encontrada. Em falha, permitir nova tentativa e retorno
  a ajuda ou ao suporte por e-mail, sem anunciar agenda vazia como fato.
- Permitir selecionar uma data e um horario e alterar a escolha antes do envio.
  Ao mudar a data, invalidar horario anterior que nao pertenca a nova selecao.
- Identificar claramente data, horario e fuso aplicavel. O planejamento deve
  definir fuso institucional e representacao do intervalo no frontend/backend.
  Nao usar o fuso do dispositivo implicitamente como regra de agenda.
- Impedir selecao e envio de horario passado, inexistente ou indisponivel.
  O backend e a autoridade para validar a disponibilidade no envio.
- Selecionar horario nao reserva vaga nem registra dados. Se houver politica
  de reserva temporaria, ela depende de decisao documental antes do codigo;
  nao e exigida nesta spec.
- Definir capacidade por intervalo e regras de oferta no planejamento, sem
  assumir universalmente que cada horario admite apenas um atendimento.

### RF03 — Dados minimos da solicitacao

| Campo | Finalidade | Regra inicial |
| --- | --- | --- |
| Nome | Identificar o solicitante. | Obrigatorio, texto nao vazio. |
| Orgao | Identificar a vinculacao institucional. | Obrigatorio, texto nao vazio. |
| Setor | Contextualizar a unidade solicitante. | Obrigatorio, texto nao vazio. |
| E-mail institucional | Permitir contato sobre o atendimento. | Obrigatorio, formato de e-mail valido. |
| Telefone | Permitir contato complementar. | Obrigatorio no contrato inicial, formato a definir. |
| Assunto da duvida | Orientar a preparacao da equipe. | Obrigatorio, texto nao vazio. |
| Breve descrição da dúvida | Contexto complementar já previsto no conteúdo. | Opcional; descricaoDuvida, limite institucional pendente. |
| Data e horario | Identificar intervalo solicitado. | Obrigatorios, vinculados a disponibilidade valida. |

- Conciliar obrigatoriedade final, limites de tamanho e formatos com ERS e
  equipe responsavel antes de implementar; nao ampliar coleta por analogia.
- Validar no frontend e obrigatoriamente no backend. Rejeitar ausencias,
  tipos invalidos e entradas fora do contrato, com mensagens por campo.
- Nome, orgao, setor e assunto contendo apenas espacos nao sao preenchidos.
- Nao inventar lista de dominios permitidos para e-mail institucional; caso
  exista restricao, documentar e validar seus criterios antes do codigo.
- Permitir pontuacao e formatos de telefone conforme contrato definido, sem
  conversao silenciosa que perca informacao.
- Orientar a descrever a duvida sem enviar documentos pessoais, senhas ou dados
  de cidadaos. Nao exigir CPF, anexos, a Carta completa ou cadastro de conta.
- Manter rotulos, ajuda e erros associados aos controles e preservar os dados
  preenchidos ao corrigir uma pendencia ou trocar horario.

### RF04 — Revisao e confirmacao explicita

- Antes do envio, apresentar resumo legivel dos dados, data, horario e fuso,
  com possibilidade de voltar e corrigir sem perder preenchimento.
- Explicar quais dados serao enviados, sua finalidade e a equipe destinataria.
  O aviso de tratamento de dados deve ser definido e validado institucionalmente.
- Enviar somente apos acao explicita de confirmar solicitacao. Abrir pagina,
  selecionar horario ou avancar para revisao nao envia nem notifica.
- Nao impor aceite generico de consentimento como substituto da definicao
  institucional de tratamento. Eventual controle de ciencia ou aceite deve
  ter finalidade e texto documentados no planejamento.
- Indicar processamento, evitar envios repetidos enquanto a operacao estiver
  pendente e manter foco/retorno acessiveis.

### RF05 — Registro, concorrencia e repeticao

- Registrar no backend apenas os dados minimos de atendimento, intervalo,
  identificador da solicitacao e estados necessarios para processamento.
- Validar capacidade e disponibilidade junto do registro de forma que envios
  concorrentes nao excedam a capacidade configurada.
- Se o horario ficar indisponivel antes de confirmar, nao registrar uma
  solicitacao invalida; informar conflito, atualizar disponibilidade e permitir
  escolher outro horario preservando os demais campos.
- Definir identificacao idempotente da operacao: repeticao da mesma tentativa
  apos duplo clique, timeout ou reconexao nao cria registros, ocupacoes ou
  notificacoes independentes duplicados.
- Se a resposta se perder depois do registro, permitir recuperar o resultado
  da mesma tentativa ou verificar seu estado por mecanismo seguro, sem induzir
  novo envio as cegas nem expor dados de outras solicitacoes.
- Nao usar somente bloqueio de botao no frontend para controlar duplicidade.
- Registrar estados de solicitacao e notificacao separadamente. O planejamento
  deve definir contrato de API, identificadores, transacoes e persistencia;
  o tipo inicial em `atendimento.types.ts` nao cobre esses requisitos sozinho.

### RF06 — Confirmacao e falhas

- Apresentar confirmacao de solicitacao registrada somente apos resposta do
  backend que comprove o registro, com referencia e resumo do horario solicitado.
- Distinguir registro de solicitacao de atendimento definitivamente confirmado.
  Definir no planejamento se a equipe aprova o horario ou se o registro efetiva
  o agendamento; a interface deve refletir essa regra, sem promessa antecipada.
- Mostrar orientacoes de proximo passo e contato apenas quando validados.
- Falha anterior ao registro deve apresentar erro e permitir tentar novamente
  ou escolher outro canal, sem apagar campos nem anunciar sucesso.
- Em resultado incerto, informar que nao foi possivel confirmar o resultado e
  oferecer recuperacao da mesma operacao; nao afirmar que nada foi registrado.
- Recarregar ou voltar apos sucesso nao pode reenviar automaticamente.
  Definir recuperacao segura da confirmacao no planejamento, sem historico
  publico, URL com dados pessoais ou persistencia permanente no frontend.

### RF07 — Notificacao da equipe

- Encaminhar notificacao a destinatario institucional configurado no backend,
  com dados necessarios para organizar o atendimento e referencia da solicitacao.
- Nao expor credenciais SMTP/provedor no frontend nem usar endereco arbitrario
  informado pelo solicitante como destinatario da equipe.
- Usar assunto, corpo e remetente controlados; texto digitado nao deve ser
  interpretado como cabecalho, HTML executavel ou instrucao de envio.
- Registrar o estado da notificacao e permitir recuperacao/repeticao controlada
  quando o provedor falhar, sem duplicar a solicitacao ou perder o registro.
- Se o registro for concluido e a notificacao falhar, preservar o registro.
  Nao instruir o usuario a criar nova solicitacao apenas por falha de e-mail.
- A equipe deve conseguir identificar notificacoes pendentes ou falhas por
  mecanismo operacional restrito definido no planejamento; nao exige painel
  administrativo completo.
- Nao anunciar e-mail entregue ou lido quando houver apenas aceite do provedor.
  Confirmacao por e-mail ao solicitante nao e exigida nesta spec; se adotada,
  definir texto, estados e limites explicitamente no planejamento.

### RF08 — Separacao de dados e continuidade

- Nao enviar, persistir ou anexar automaticamente a Carta, respostas de
  diagnostico ou dados de outras etapas ao backend de atendimento.
- Preservar a Carta da sessao ao consultar, enviar ou sair do agendamento.
- Manter dados do formulario de atendimento durante revisao e falhas recuperaveis
  na mesma visita. Nao exigir salvamento de rascunho entre sessoes ou abas.
- Nao usar query strings ou logs para transportar nome, e-mail, telefone ou
  assunto. Dados operacionais e conteudo da Carta permanecem separados.
- Oferecer retorno a `/ajuda`, alternativa `/ajuda/suporte-email` e acesso
  ao formulario da Carta sem depender exclusivamente do historico.

### RF09 — Conteudo versionado

- Manter introducao, orientacoes, labels, resumo e mensagens de estado fora
  da apresentacao visual, em conteudo versionado.
- Validar textos institucionais, politica de agenda, modalidade, destinatarios
  e aviso de tratamento de dados antes da implementacao.
- Separar configuracao de horarios, credenciais e contatos operacionais de
  textos editoriais; nao incluir segredos no repositorio ou no bundle frontend.
- O conteudo oficial nao pode afirmar atendimento agendado, envio de e-mail ao
  solicitante ou disponibilidade real usando dados de exemplo. Depois de uma
  resposta valida do backend, comunicar apenas `Solicitacao registrada`, com
  referencia, resumo e aviso de que o registro ainda nao confirma o atendimento.
- Nao oferecer `Reagendar` enquanto cancelamento/remarcacao self-service estiver
  fora do escopo. A alternativa segura e retornar a ajuda; novos fluxos dependem
  de contrato institucional, backend e criterios de aceite proprios.
- Meses, datas e horarios mantidos para documentacao visual devem ser marcados
  explicitamente como ilustrativos e nunca compor a disponibilidade operacional.

## Requisitos nao funcionais

- Usar HTTPS no ambiente publicado e restringir acesso aos dados persistidos
  a equipe e processos autorizados. Consulta publica de disponibilidade nao
  deve revelar identidade, assunto ou dados de outros solicitantes.
- Definir protecao dos endpoints, limitacao de abuso, limites de payload,
  tratamento de erros e politica de acesso operacional no planejamento,
  mantendo acesso do solicitante sem login no aplicativo.
- Nao registrar campos pessoais em logs comuns; registrar apenas informacoes
  operacionais necessarias, sem expor segredos ou conteudo em erros.
- Definir finalidade, responsaveis, prazo de retencao, exclusao e acesso aos
  dados com a equipe responsavel antes de producao. Esta spec nao estabelece
  base legal ou prazo arbitrario, nem declara conformidade juridica concluida.
- Restringir persistencia a atendimento; nao criar banco de Cartas.
- Oferecer controles de data/horario e resumo operaveis por teclado e leitor
  de tela; identificar selecao, erros, carregamento e confirmacao por texto,
  com foco visivel e anuncios sem repeticao excessiva.
- Funcionar em desktop, tablet e smartphone com ampliacao, sem corte,
  sobreposicao ou rolagem horizontal. Reutilizar shell, tokens e Inter.
- Validar consulta e envio em Chrome, Edge, Firefox e Safari, incluindo rede
  lenta, indisponibilidade, conflito e resposta perdida.

## Referencias visuais e pendencias

O primeiro frame e a entrada compartilhada das features 014 e 015; os demais
representam estados da jornada de atendimento:

| Estado | Node | Referencia |
| --- | --- | --- |
| Escolha de canal: atendimento ou e-mail | `425:201` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=425-201&m=dev) |
| Escolha um horario | `425:296` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=425-296&m=dev) |
| Dados e revisao antes do envio | `446:206` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=446-206&m=dev) |
| Solicitacao registrada | `470:444` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=470-444&m=dev) |

`425:201` e a composicao compartilhada de entrada; os demais sao
variantes/etapas do atendimento, nao novas features. `169:495` continua sendo
a FAQ. A 015 controla o conteudo e a copia do card de e-mail.

O layout deve adaptar-se a `src/content/ajuda/atendimento-agendado.ts` e aos
estados reais da API. Texto ou exemplo do Figma nao substitui o conteudo
versionado. Em especial, manter `Confirmar solicitacao`, `Solicitacao registrada`
e o aviso de que o registro nao confirma o atendimento; nao restaurar promessa
de e-mail enviado, sucesso de agendamento ou acao de reagendar.

Mes, datas, horarios, nome, orgao e assunto exibidos no Figma sao exemplos.
Disponibilidade e resumo reais sempre vem da API/solicitacao. Antes do codigo
visual, consultar detalhadamente via MCP os quatro nodes e o Figma Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`; registrar divergencias e responsividade.

O planejamento deve conciliar ERS e ADR-003, definir stack concreta do backend,
API, banco, oferta de horarios, capacidade, fuso, confirmacao institucional,
idempotencia, notificacoes, operacao e politica de dados. O material local cita
Django/DRF como recomendacao, sem backend implementado; nao presumir infraestrutura
ou alterar decisao arquitetural sem documentar a escolha.

## Fora de escopo

- Gestao completa de agenda, integracao com calendarios externos, painel
  administrativo avancado, remarcacao ou cancelamento self-service.
- Login de solicitantes, historico publico, acompanhamento completo de tickets.
- Videoconferencia, criacao automatica de sala ou lembretes automaticos.
- Anexos, coleta de documentos pessoais ou envio da Carta ao backend.
- Suporte por e-mail independente, que pertence a 015.
- Aprovar, cadastrar ou publicar servicos no Paraiba Digital.

## Dependencias

- `001-fundacao-do-projeto` e `002-home-e-navegacao`: estrutura, shell e links.
- `013-fluxo-de-ajuda`: escolha do canal e retorno a consulta.
- `015-suporte-email`: alternativa de orientacao, sem exigir sua conclusao
  para registrar solicitacao quando agendamento estiver operacional.
- `007-formulario-carta-servico`: preservacao da Carta sem envio ao atendimento.
- `016-responsividade-acessibilidade` e `017-deploy`: validacoes transversais
  e publicacao segura de frontend/backend.
- Agenda e destinatarios institucionais, provedor de notificacao, regras de
  confirmacao, politica de dados e referencias visuais validadas.

Na criacao desta spec, 015–017 ainda nao possuem pastas em `specs/`.
O placeholder e o tipo inicial nao comprovam disponibilidade, registro ou
notificacao operacionais. Nenhuma solicitacao real foi criada nesta etapa.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir pela ajuda, URL direta ou recarga. | Acessar sem login, diagnostico ou Carta, com orientacoes e retorno a ajuda. |
| CA02 | Consultar disponibilidade em sucesso, vazio e falha. | Diferenciar estados, mostrar apenas horarios reais e permitir nova tentativa/alternativa. |
| CA03 | Selecionar data e horario e mudar a data. | Manter escolha valida, invalidar horario incompatível e identificar fuso sem registrar solicitacao. |
| CA04 | Informar dados ausentes, apenas espacos ou formatos invalidos. | Exibir erros por campo e rejeitar tambem no backend, sem perder preenchimento. |
| CA05 | Revisar, voltar e corrigir antes de confirmar. | Preservar campos e horario e enviar somente por confirmacao explicita. |
| CA06 | Enviar sem horario, com horario passado ou forjado. | Rejeitar no backend, sem registro ou confirmacao falsa. |
| CA07 | Enviar simultaneamente para a ultima capacidade disponivel. | Respeitar capacidade, informar conflito ao excedente e preservar seus campos. |
| CA08 | Repetir a mesma tentativa por duplo clique, timeout ou reconexao. | Recuperar a mesma operacao sem duplicar registro, ocupacao ou notificacao independente. |
| CA09 | Registrar e receber resposta valida. | Mostrar referencia e resumo, distinguindo solicitacao registrada de atendimento confirmado conforme regra institucional. |
| CA10 | Perder resposta depois do registro. | Informar resultado incerto e permitir recuperacao segura sem novo envio as cegas. |
| CA11 | Falhar antes do registro. | Nao anunciar sucesso; permitir tentativa/alternativa mantendo dados. |
| CA12 | Registrar com falha do provedor de notificacao. | Preservar solicitacao e tratar notificacao pendente/falha operacionalmente, sem pedir novo cadastro. |
| CA13 | Notificar equipe em ambiente de teste. | Usar destinatario configurado, referencia e dados minimos, sem segredos no frontend ou cabecalhos vindos do usuario. |
| CA14 | Recarregar ou voltar depois de sucesso. | Nao reenviar automaticamente nem expor dados pessoais em URL. |
| CA15 | Solicitar atendimento com Carta preenchida. | Preservar Carta no navegador e nao envia-la ou persisti-la no backend. |
| CA16 | Consultar disponibilidade e acesso operacional aos registros. | Nao expor dados de solicitantes publicamente; restringir registros a processos autorizados. |
| CA17 | Operar por teclado/leitor de tela e em telas pequenas com ampliacao. | Selecionar, revisar, corrigir e confirmar com estados e foco acessiveis, sem corte ou scroll horizontal. |
| CA18 | Revisar prontidao para producao. | Encontrar API, agenda, capacidade, fuso, notificacoes, politica de dados e operacao definidos, com consultas Figma e textos validados. |
| CA19 | Percorrer a jornada visual. | Usar `425:201`, `425:296`, `446:206` e `470:444` como estados da mesma rota, preservando selecoes e dados aplicaveis. |
| CA20 | Comparar frame e conteudo versionado. | Adaptar layout ao conteudo e aos estados reais, sem reintroduzir disponibilidade ficticia, confirmacao antecipada, e-mail enviado ou remarcacao. |

## Contrato consolidado T014 — 21/10/2026

Aplicar [contrato-agenda.md](contrato-agenda.md) como fonte única de API,
payload/códigos, contexto/CSRF, pausa operacional, snapshot e recuperação.
O payload contém seis campos obrigatórios, descricaoDuvida opcional e horarioId.
Tipos existentes ainda precisam de migração; não são o schema final.

Pausa editorial não desativa API: servidor possui gate próprio. Replay de
operação registrada ainda válida precede gate e revalidação de oferta.
Snapshot de início/fim/fuso é imutável; mudança de intervalo cria novo ID.
410 indica recuperação expirada, nunca ausência de registro. Nenhuma chave
nova automática por rede/timeout/pausa. Notificação não condiciona sucesso.

| ID | Cenário adicional | Resultado esperado |
| --- | --- | --- |
| CA21 | Pausa concorrente com registro e recuperação | Nova criação bloqueada conforme gate serializado; resultado registrado continua recuperável, sem cancelamento inferido |
| CA22 | Oferta/fuso mudam e mesma tentativa é repetida | Snapshot original no Receipt; sem mudar resultado ou duplicar ocupação/outbox |

IN01–IN08 no contrato registram papéis responsáveis a consultar, não pessoas
nomeadas ou decisões aprovadas. [ADR-004](../../docs/decisoes/adr-004-stack-atendimento.md)
é proposta; ADR-003 não aprova stack/infraestrutura. Produção permanece bloqueada.

## Próximo passo

Obter decisões IN01–IN08, concluir migração do conteúdo T013 e autorizar
implementação separadamente. Ver [tasks](tasks.md) e [verification](verification.md).

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

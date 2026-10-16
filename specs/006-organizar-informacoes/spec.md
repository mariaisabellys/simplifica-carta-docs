# Spec: Organizar informacoes

## Objetivo

Orientar o servidor sobre quais informacoes reunir antes de preencher a Carta
de Servicos, oferecendo uma lista de verificacao clara, consultavel e alinhada
ao modelo de dados do produto.

## Decisao de contrato oficial

Decisao registrada em 6 de outubro de 2026. O contrato oficial da feature 006
e o conteudo versionado em `src/content/pages/organizar-informacoes.ts`.

Esse contrato substitui as referencias anteriores a dez assuntos, pagina
puramente estatica e ausencia de progresso. Ate a reconciliacao integral dos
demais artefatos, esta secao prevalece sobre trechos contraditorios deste
documento, de `plan.md`, `tasks.md`, `implementation-plan.md`, `validation.md`
e `verification.md`.

O contrato oficial possui:

- tres topicos, nesta ordem:
  1. `Sobre o serviço`;
  2. `O que é necessário`;
  3. `Como o serviço funciona`;
- 13 informacoes, nesta ordem global:
  1. Nome do serviço;
  2. Nome popular;
  3. O que é o serviço;
  4. Quem pode utilizar?;
  5. Categoria do serviço;
  6. Palavras-chave;
  7. Informações adicionais;
  8. Documentos necessários;
  9. Custos;
  10. Etapas do serviço;
  11. Agendamento;
  12. Prazo;
  13. Recorrência;
- uma declaracao independente por informacao para indicar que o dado foi
  reunido, sem preencher ou validar o valor da Carta;
- progresso derivado entre 0 e 13, com referencia editorial
  `2 de 13 informadas`;
- orientacoes expansiveis, exemplos, comparacoes `Evite`/`Prefira` quando
  fornecidas e dicas;
- navegacao entre topicos sem gate: nenhuma marcacao bloqueia o acesso a
  `/formulario-carta`;
- estado temporario isolado, caso a implementacao restaure marcacoes na mesma
  sessao, sem ler, alterar ou limpar os dados da Carta.

Os 13 itens nao equivalem automaticamente aos campos do schema atual. A
feature e editorial e preparatoria; categoria, palavras-chave, recorrencia e
demais conceitos novos devem ser conciliados com a feature 007 sem ampliar seu
modelo silenciosamente.

## Problema e contexto

As informacoes sobre um servico podem estar dispersas entre setores, documentos
e canais de atendimento. Sem uma orientacao previa, o servidor pode iniciar o
formulario sem conhecer documentos exigidos, etapas, prazos ou custos e precisar
interromper o preenchimento para buscar essas informacoes.

Esta funcionalidade corresponde a etapa 2 de `Explorar por etapas`. No fluxo
completo, sucede o diagnostico e antecede a elaboracao da Carta. Tambem deve
funcionar como consulta independente, sem exigir resultado do diagnostico nem
dados previamente preenchidos.

## Usuarios impactados

- Servidor responsavel pelo levantamento, que precisa saber o que reunir e
  confirmar com os setores responsaveis pelo servico.
- Servidor responsavel pelo cadastro, que precisa preparar informacoes claras
  antes de elaborar a Carta e cadastrar manualmente no Paraiba Digital.
- Equipe GESED, que precisa oferecer orientacoes consistentes e atualizaveis.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: objetivo,
  funcionalidades e limites do MVP.
- `docs/produto/visao-produto.md`, `mvp.md`, `escopo.md`, `personas.md` e
  `fluxos.md`: usuarios, levantamento e acesso independente por etapa.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo de
  especificacao, conteudo versionado e regras para implementacao visual.
- `docs/arquitetura/decisoes-tecnicas.md`: organizacao do frontend e limites
  de armazenamento dos dados da Carta.
- `docs/design-system/mapa-figma-telas.md`: frames atualmente identificados.
- `specs/003-explorar-por-etapas/spec.md` e
  `src/content/pages/explorar-por-etapas.ts`: entrada `Ver lista de informacoes`.
- `specs/004-o-que-e-carta-servico/spec.md`: apresentacao conceitual dos campos,
  cuja orientacao detalhada de levantamento pertence a esta feature.
- `src/app/routes.tsx` e `src/pages/OrganizarInformacoesPage.tsx`: rota existente
  e pagina placeholder.
- `src/features/carta/carta.types.ts` e `carta.schema.ts`: modelo inicial que
  orienta a cobertura dos assuntos, sem definir sozinho a redacao institucional.

Esta etapa utiliza as fontes textuais locais acima. Nao declara consulta direta
ao Figma nem validacao do PDF do ERS.

## Requisitos funcionais

### RF01 — Rota e entradas

- Disponibilizar a pagina em `/organizar-informacoes`.
- Permitir acesso pelo card da etapa 2 de `/explorar-por-etapas`, pela navegacao
  compartilhada e por URL direta, inclusive apos recarregar a pagina.
- Permitir que o fluxo de diagnostico encaminhe o usuario a esta rota, conforme
  as regras da feature 005, sem condicionar o acesso a um resultado armazenado.
- Reutilizar header e footer compartilhados e identificar semanticamente a
  pagina atual na navegacao quando houver item correspondente.
- Exibir breadcrumb com retorno ao inicio e identificacao da pagina atual.

### RF02 — Apresentacao e orientacao inicial

- Exibir o titulo `Organizar informacoes` e uma introducao em linguagem simples
  explicando que a lista ajuda a preparar o preenchimento da Carta.
- Orientar o usuario a reunir informacoes atualizadas com o setor responsavel
  pelo servico e conferir eventuais duvidas antes do cadastro oficial.
- Explicar que o preenchimento acontece na etapa seguinte e que a publicacao
  continua sendo feita manualmente no Paraiba Digital.
- Nao apresentar a lista como certificacao de completude, aprovacao pela GESED
  ou garantia de que o cadastro sera aceito na plataforma externa.

### RF03 — Lista de informacoes a reunir

Apresentar os dez assuntos abaixo na ordem de leitura indicada. Cada assunto
deve ter titulo e orientacao concreta sobre o que levantar. Publico-alvo inclui
criterios de acesso, cobrindo o modelo local sem criar um formulario nesta tela.

| Assunto | Orientacao minima de levantamento | Correspondencia no modelo inicial |
| --- | --- | --- |
| 1. Nome do servico | Identificar o servico com um nome claro que descreva o que o cidadao solicita. Reunir tambem o nome popular, se houver: denominacao alternativa ou mais conhecida pelo cidadao, complementar ao nome do servico, sem substitui-lo. | `identificacao.nome`; `identificacao.nomePopular` opcional no mesmo assunto |
| 2. Descricao do servico | Reunir uma explicacao do que e oferecido e de sua finalidade para o cidadao. | `identificacao.descricao` |
| 3. Publico-alvo e criterios de acesso | Identificar quem pode utilizar o servico e quais condicoes precisa atender. | `identificacao.publicoAlvo`, `requisitos.criterios` |
| 4. Documentos necessarios | Listar os documentos exigidos e distinguir os obrigatorios dos opcionais, conforme a regra do servico. | `requisitos.documentos` |
| 5. Etapas do servico | Levantar a sequencia de acoes do pedido ate a conclusao, com descricao de cada etapa. | `etapas` |
| 6. Prazo | Confirmar o tempo estimado para atendimento ou conclusao e as condicoes que influenciam esse prazo. | `atendimento.prazo` |
| 7. Custos | Confirmar se o servico e gratuito ou pago e reunir valores e condicoes aplicaveis, sem presumir gratuidade quando a informacao estiver ausente. | `atendimento.custo` |
| 8. Canais de atendimento | Identificar os canais disponiveis e suas informacoes de acesso, como endereco, telefone, e-mail ou endereco do atendimento online, conforme o caso. | `atendimento.canais` |
| 9. Agendamento | Confirmar se e necessario agendar; se Sim, levantar tipo (Online, Presencial ou ambos) e sistema. Somente para Outro sistema ou site, reunir URL e forma de exibicao (Dentro do Paraiba Digital ou Em uma nova pagina). | `atendimento.exigeAgendamento`, tiposAgendamento, sistemaAgendamento e, se externo, linkAgendamento/exibicaoAgendamento, conforme 007. |
| 10. Informacoes adicionais | Reunir outras orientacoes relevantes ao cidadao que nao estejam contempladas nos assuntos anteriores. | `informacoesComplementares` |

- Diferenciar informacao ainda desconhecida de ausencia de exigencia. Nao
  sugerir que deixar documentos ou custos em branco equivale a inexistencia
  de documentos exigidos ou gratuidade.
- Orientar a confirmacao de informacoes desconhecidas, sem inventar prazos,
  taxas, documentos ou regras de acesso.
- Exemplos, se utilizados, devem estar claramente identificados como
  ilustrativos e nao como regras validas para todos os servicos.
- A tabela e uma referencia de cobertura local; nao afirma equivalencia
  homologada com os campos atuais do Paraiba Digital.
- Nao apresentar todos os assuntos como campos obrigatorios universais.
  Obrigatoriedade e validacoes devem ser conciliadas com o contrato final das
  features 007 e 008 e com as orientacoes institucionais.
- Nao exibir nomes tecnicos do modelo de dados na interface do usuario.

### RF04 — Uso da lista de verificacao

- A lista e orientativa e pode ser consultada sem preencher ou marcar itens.
- Nesta spec, nao ha caixas de selecao, percentual, pontuacao ou registro de
  conclusao. A documentacao existente pede uma lista de verificacao, mas nao
  estabelece controle interativo de progresso.
- Manter todo o conteudo essencial acessivel sem exigir acoes de confirmacao.
- A leitura ou eventual ausencia de informacoes nao pode bloquear a navegacao
  para o formulario, ajuda ou outras etapas.

### RF05 — Proximos passos e ajuda

- Oferecer a acao `Preencher Carta` para `/formulario-carta`.
- Oferecer acesso a `Preciso de ajuda` para `/ajuda`, reutilizando a acao
  compartilhada quando ela ja estiver disponivel no shell.
- Manter os dados de uma Carta existente intactos ao entrar, sair ou voltar a
  esta pagina. A consulta nao reinicia o formulario nem o diagnostico.
- Nao adicionar formulario de suporte, agendamento ou envio de mensagem nesta
  feature; essas responsabilidades pertencem ao fluxo de ajuda.

### RF06 — Conteudo versionado

- Manter introducao, assuntos, orientacoes, exemplos e rotulos em conteudo
  versionado, separado da apresentacao visual, seguindo `src/content/pages/`.
- Permitir revisao editorial sem alterar regras de navegacao.
- Preservar acentuacao e linguagem simples na interface final.
- Submeter a redacao institucional final a validacao da equipe responsavel;
  esta spec define cobertura e comportamento, nao declara copy homologada.

## Requisitos nao funcionais

- Funcionar sem backend, login, leitura de dados da Carta ou armazenamento de
  respostas e progresso.
- Nao coletar documentos pessoais, anexos ou dados do cidadao. A orientacao
  sobre documentos trata da lista de exigencias do servico, nao de seu envio.
- Apresentar titulos semanticos, ordem de leitura coerente, contraste adequado,
  foco visivel e links com nomes que expressem seus destinos.
- Permitir consulta e navegacao por teclado e leitor de tela, sem depender
  exclusivamente de icones, cores ou posicionamento para transmitir informacao.
- Funcionar em computador, tablet e smartphone, com textos longos legiveis e
  sem corte, sobreposicao ou rolagem horizontal da pagina.
- Reorganizar eventuais colunas em telas menores, preservando a ordem de leitura
  dos dez assuntos no DOM e na apresentacao visual.
- Reutilizar os tokens do projeto e a fonte principal `Inter`, com os fallbacks
  definidos globalmente.

## Referencias visuais e pendencias

O mapa local ainda nao identifica um frame oficial para
`/organizar-informacoes`. O node `575:483` pertence a pagina de entrada
`Explorar por etapas` e nao define o layout desta funcionalidade.

Antes da implementacao visual, identificar e consultar via MCP o frame
correspondente no Figma Design (`YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`) e
consultar o Figma Make (`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`). Registrar no
`implementation-plan.md` a composicao, os componentes, os assets e a adaptacao
responsiva e atualizar o mapa de telas quando o frame for identificado.

A disposicao visual e o posicionamento das acoes devem ser conciliados com
essa consulta. Se o frame apresentar interacoes ou campos alem desta spec,
registrar e resolver a divergencia antes de implementar, sem ampliar o escopo
silenciosamente.

## Fora de escopo

- Executar ou exigir conclusao do diagnostico de servico publico.
- Coletar, editar, validar, copiar ou exportar os dados da Carta.
- Gerar previa HTML ou implementar o formulario da feature 007.
- Criar checklist com progresso persistido, historico ou comprovante de conclusao.
- Receber anexos, criar repositorio de documentos ou area de materiais de apoio.
- Integrar ou publicar automaticamente no Paraiba Digital.
- Criar login, backend ou salvamento permanente de rascunhos.
- Implementar o tutorial, o atendimento agendado ou suporte por e-mail.

## Dependencias

- `001-fundacao-do-projeto`: rota, estrutura de paginas, componentes e tokens.
- `002-home-e-navegacao`: shell e navegacao compartilhados.
- `003-explorar-por-etapas`: card de entrada da etapa 2.
- `004-o-que-e-carta-servico`: alinhamento dos assuntos com a explicacao conceitual.
- `005-diagnostico-servico-publico`: encaminhamento no fluxo completo, sem
  dependencia obrigatoria para acesso direto.
- `007-formulario-carta-servico`: destino da acao principal e conciliacao entre
  orientacoes de levantamento e campos efetivamente preenchidos.
- `013-fluxo-de-ajuda`: destino de suporte, sem implementar sua logica aqui.
- `016-responsividade-acessibilidade`: alinhamento transversal, sem adiar os
  requisitos de acessibilidade desta pagina.
- Validacao editorial das orientacoes e identificacao do frame oficial.

Na criacao desta spec, as pastas 005, 007, 013 e 016 ainda nao existem em
`specs/`. Rotas e placeholders existentes nao representam essas features
concluidas. O planejamento deve conferir seus contratos quando forem criados.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir `/organizar-informacoes` diretamente ou recarregar a pagina. | Exibir a orientacao completa sem exigir diagnostico, login ou Carta preenchida. |
| CA02 | Acionar `Ver lista de informacoes` na etapa 2. | Chegar a pagina de organizacao, coerente com a descricao da entrada. |
| CA03 | Consultar o conteudo da pagina. | Encontrar os dez assuntos da tabela, em ordem, com orientacoes praticas, incluindo nome popular opcional dentro de Nome do servico, criterios de acesso e como levantar agendamento. |
| CA04 | Consultar orientacoes sobre custos e documentos. | Distinguir informacao desconhecida de gratuidade ou ausencia de exigencia, sem valores ou regras inventados. |
| CA05 | Acionar `Preencher Carta` sem marcar ou concluir itens. | Navegar para `/formulario-carta` sem bloqueio. |
| CA06 | Consultar a pagina com Carta ja preenchida na sessao e retornar ao formulario. | Preservar integralmente os dados existentes, sem reiniciar o fluxo. |
| CA07 | Acionar `Preciso de ajuda`. | Navegar para `/ajuda`, sem formulario de suporte duplicado nesta pagina. |
| CA08 | Navegar por teclado e leitor de tela. | Identificar titulos, assuntos e destinos; acessar os links com foco visivel e ordem coerente. |
| CA09 | Consultar em desktop, tablet e smartphone, inclusive com ampliacao de texto. | Manter leitura integral e acoes acessiveis, sem cortes, sobreposicao ou rolagem horizontal da pagina. |
| CA10 | Revisar a arquitetura da pagina. | Encontrar conteudo editorial versionado fora do componente e ausencia de coleta ou persistencia de dados e progresso. |
| CA11 | Revisar a comunicacao sobre conclusao e publicacao. | Entender que a pagina orienta o levantamento e nao aprova a Carta nem publica no Paraiba Digital. |
| CA12 | Revisar a implementacao visual futura. | Encontrar referencias Figma registradas e consultadas, reuso do shell e tokens, e divergencias de escopo resolvidas no planejamento. |

## Proximo passo

Executar `/spec:planejar 006-organizar-informacoes` para definir a abordagem
tecnica e as verificacoes. Depois, criar tarefas e `implementation-plan.md`
antes de `/spec:implementar`.

# Spec: Validacao e linguagem simples

> **Dependência atualizada em 16 de outubro de 2026:** validar exclusivamente
> o modelo v3 definido pela feature 007. Paths v2 abaixo são históricos.

## Objetivo

Identificar informacoes obrigatorias ausentes na Carta de Servicos e oferecer
sugestoes de linguagem simples para os textos preenchidos, ajudando o servidor
a revisar os dados sem substituir sua redacao ou impedir a consulta das etapas.

## Problema e contexto

O servidor pode deixar informacoes essenciais em branco ou escrever textos
longos e formais que dificultam a compreensao pelo cidadao. O produto deve
apontar pendencias de preenchimento e oferecer orientacoes praticas de escrita,
distinguindo erros de obrigatoriedade de sugestoes editoriais.

Esta feature integra o formulario em `/formulario-carta` e disponibiliza regras
compartilhadas para os consumidores da Carta. Nao cria uma pagina independente.
Ausencia de mensagens nao comprova correção factual, conformidade juridica,
aprovacao pela GESED ou aceite do cadastro no Paraiba Digital.

## Usuarios impactados

- Servidor que redige e revisa as informacoes da Carta.
- Servidor responsavel pelo cadastro manual, que precisa identificar
  pendencias antes de exportar ou transferir os dados.
- Equipe GESED, que precisa manter regras e orientacoes consistentes.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: validadores
  locais, campos obrigatorios antes da exportacao e sugestoes orientativas.
- `docs/produto/mvp.md`, `visao-produto.md`, `personas.md` e `fluxos.md`:
  revisao na jornada de preparacao da Carta.
- `docs/arquitetura/decisoes-tecnicas.md` e `arquitetura-sistema.md`:
  validacao no navegador e dados apenas de sessao.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  limites do MVP, conteudo versionado e referencias visuais.
- `specs/007-formulario-carta-servico/spec.md`: campos, partes, revisao
  parcial, contratos de agendamento e pontos de integracao da validacao.
- `specs/006-organizar-informacoes/spec.md`: informacao desconhecida nao
  equivale a ausencia de exigencia ou gratuidade.
- `specs/012-copia-dados-tutorial/spec.md`: copia de campos preenchidos em
  Carta parcial, sem bloqueio por sugestoes de linguagem simples.
- `src/features/carta/carta.schema.ts` e `carta.validation.ts`: cinco
  obrigatorios iniciais e validacao baseada em texto nao vazio.
- `src/lib/validation.ts`: helpers iniciais de preenchimento e sugestoes.
- `docs/design-system/mapa-figma-telas.md`: componentes de formulario mapeados.

Esta spec usa fontes textuais locais; nao declara leitura do PDF do ERS,
consulta direta ao Figma ou homologacao institucional dos criterios editoriais.

## Requisitos funcionais

### RF01 — Integracao e acionamento

- Exibir erros e sugestoes junto aos campos correspondentes no formulario da
  007, sem exigir diagnostico, login ou conclusao de outras etapas.
- Ao solicitar revisao, avaliar os valores atuais de todas as partes,
  inclusive as que nao estiverem visiveis.
- Permitir atualizar o retorno durante a correcao. O planejamento deve definir
  quando validar por campo, evitando erros imediatos em campos ainda intocados
  ao abrir um formulario vazio e anuncios a cada tecla.
- Nao deslocar foco automaticamente durante digitacao. Na revisao explicita,
  oferecer acesso claro ao resumo e aos campos com pendencias.
- Nao validar nem gerar mensagens a partir de exemplos, placeholders ou copy
  de orientacao como se fossem dados da Carta.

### RF02 — Obrigatoriedade

Usar a mesma fonte de regras de obrigatoriedade no formulario e na exportacao.
O contrato inicial, alinhado com 007 e o schema existente, e:

| Campo | Referencia tecnica | Regra inicial |
| --- | --- | --- |
| Nome do servico | `identificacao.nome` | Texto nao vazio apos desconsiderar espacos nas extremidades. |
| Nome popular do servico | `identificacao.nomePopular` | Texto opcional com nome alternativo ou mais conhecido pelo cidadao, quando aplicavel; complementa o nome do servico sem substitui-lo. |
| Descricao do servico | `identificacao.descricao` | Texto nao vazio apos desconsiderar espacos nas extremidades. |
| Publico-alvo | `identificacao.publicoAlvo` | Texto nao vazio apos desconsiderar espacos nas extremidades. |
| Prazo | `atendimento.prazo` | Texto nao vazio apos desconsiderar espacos nas extremidades. |
| Custos | `atendimento.custo` | Texto nao vazio apos desconsiderar espacos nas extremidades. |

- Tratar campo ausente, nulo, de tipo incompatível ou contendo apenas espacos,
  tabulacoes ou quebras de linha como nao preenchido, sem provocar excecao.
- Preservar texto `0` em custos como preenchimento, sem confundir com vazio;
  isso nao comprova que o valor ou a regra de cobranca estejam corretos.
- Nome popular e informacoes adicionais continuam opcionais. Nao gerar erro
  de obrigatoriedade para todo assunto listado na 006.
- Nao interpretar listas vazias como ausencia confirmada de documentos,
  etapas ou canais, nem agendamento nao informado como Nao.
- Configuracoes de agendamento so se aplicam com `exigeAgendamento === true`. Tipo de
  agendamento (Online, Presencial ou ambos) e Sistema de agendamento (Paraiba Digital ou
  Outro sistema ou site) sao obrigatorios nesse estado. Link do agendamento e Como o
  agendamento sera exibido? sao obrigatorios e visiveis somente para Outro sistema ou
  site. Dentro do Paraiba Digital mantem o cidadao na experiencia; Em uma nova pagina
  redireciona para a URL externa. Paraiba Digital identifica agendamento pelo proprio
  sistema, sem link ou forma de exibicao externa.
- Validar URL preenchida e absoluta de agendamento externo; nao testar disponibilidade
  remota nem inferir capacidade de integracao. Protocolos permitidos e politica de URL
  ficam pendentes de decisao especifica antes do codigo.
- Ao mudar para Nao/nao informado ou de Outro sistema ou site para Paraiba Digital,
  preservar valores previamente preenchidos na mesma sessao, conforme o padrao da 007,
  sem apagar silenciosamente. Valores inativos nao sao exibidos, validados como
  obrigatorios nem transferidos como configuracao ativa; ao retornar a condicao
  correspondente, ficam disponiveis para revisao.
- Conciliar somente regras estruturais adicionais das listas com ERS; nao ampliar bloqueios por analogia.
- Cada erro deve identificar o campo e uma acao de correcao, com mensagens
  adequadas ao contexto. Evitar a mensagem generica de exportacao do helper
  atual como unico retorno durante edicao.

### RF03 — Sugestoes de linguagem simples

- Oferecer analise local e deterministica de apoio, sem enviar textos a IA,
  backend ou servicos externos.
- Cobrir textos descritivos: descricao, publico-alvo, criterios de acesso,
  descricoes de etapas, prazo, custos, descricoes dos canais, orientacao de
  agendamento somente com Sim e informacoes adicionais quando houver conteudo. URL e
  enums de agendamento nao recebem heuristica editorial.
- Nome do servico, nome popular e nomes de documentos devem ter orientacao
  editorial disponivel, sem exigir deteccao automatica de estilo nesta spec.
- Oferecer orientacoes para dividir frases extensas e avaliar termos formais
  ou pouco diretos quando houver ocorrencia detectavel pela regra configurada.
- Associar cada sugestao ao campo ou item de lista avaliado e explicar o que
  revisar. Quando indicar um termo, deixar claro que a troca depende do contexto.
- Manter orientacoes gerais de escrita acessiveis, incluindo preferir palavras
  conhecidas, explicar siglas quando necessario e apresentar acoes com clareza,
  sem afirmar que o sistema detecta automaticamente toda sigla ou ambiguidade.
- Nao reescrever textos, substituir termos, remover informacoes ou aplicar
  correcao automaticamente. O usuario decide e edita o proprio texto.
- Nao apresentar uma sugestao como erro factual nem recomendar alteracao que
  invente prazo, custo, documento, direito ou regra de acesso.
- Nao produzir sugestoes de estilo para texto vazio; campos opcionais vazios
  nao devem gerar ruido de revisao.

### RF04 — Regras editoriais versionadas e limites

- Manter mensagens, termos observados, criterios de disparo e exemplos
  versionados, separados da apresentacao visual e identificados por regra.
- Definir no planejamento um conjunto inicial verificavel de regras, com
  campos aplicaveis, limites, exemplos positivos e negativos e validacao
  editorial antes da implementacao.
- O helper atual usa mais de 240 caracteres no texto completo e os termos
  `devem`, `deverao`, `efetuar` e `realizar`. Esses criterios sao heuristicas
  iniciais, sem homologacao; nao constituem limite oficial de campo.
- Nao afirmar que todo texto longo tem frases longas. Se a mensagem tratar de
  extensao de frase, a regra deve avaliar frases; se avaliar tamanho total,
  a mensagem deve expressar somente essa observacao.
- Considerar acentuacao, maiusculas/minusculas e limites de palavras nos
  criterios que detectam termos. Nao disparar por mero trecho interno de outra
  palavra ou exigir que o usuario remova acentos.
- Nao impor limite arbitrario de caracteres, nota, selo, percentual de clareza
  ou avaliacao automatica de conformidade institucional.
- Ausencia de sugestoes significa apenas ausencia de ocorrencias nas regras
  avaliadas; nao anunciar garantia de clareza ou texto aprovado.

### RF05 — Retorno, correcao e identidade dos resultados

- Diferenciar visual e semanticamente pendencia obrigatoria e sugestao
  orientativa, sem depender exclusivamente de cor ou icone.
- Associar mensagens ao controle e apresentar resumo de pendencias apos
  revisao explicita, com acesso aos campos mesmo quando estiverem em outra parte.
- Atualizar ou remover mensagens quando o valor que as gerou mudar; nao manter
  resultado obsoleto nem mensagem referente a item removido.
- Em listas, manter o retorno associado ao item correto apos reordenacao ou
  remocao, e atualizar sua identificacao apresentada ao usuario.
- Evitar mensagens duplicadas da mesma regra para o mesmo campo; ordenar o
  resumo de acordo com a ordem do formulario.
- A avaliacao nao pode modificar a Carta, seus textos, ordem de listas ou dados
  da sessao. Resultados sao derivados dos valores atuais, sem segunda Carta.
- Se a analise de sugestoes falhar, informar indisponibilidade sem anunciar
  sucesso e manter edicao e validacao obrigatoria utilizaveis. Uma falha na
  verificacao de obrigatorios nao pode ser tratada como permissao para exportar.

### RF06 — Limites de bloqueio e consumidores

- Erros obrigatorios nao impedem guardar dados parciais na sessao, editar,
  mudar de parte, consultar ajuda ou acessar a previa parcial.
- A feature 010 deve impedir exportacao quando houver obrigatorios ausentes,
  usando as mesmas regras, e permitir localizar as pendencias para correcao.
  A 008 define o resultado de validacao; a 010 implementa o fluxo de exportacao.
- Sugestoes de linguagem simples nunca bloqueiam exportacao, previa,
  navegacao ou copia individual de campos preenchidos.
- Nao exigir que o usuario aceite, descarte ou marque sugestoes como concluidas
  para continuar. Esta spec nao exige persistencia de sugestoes dispensadas.
- A copia da 012 continua permitindo Carta parcial. Nao implementar um bloqueio
  global de copia com base na validacao obrigatoria.
- Previa, CSV e copia devem preservar a redacao atual do usuario, sem incorporar
  mensagens de validacao ou aplicar sugestoes ao valor transferido.

## Requisitos nao funcionais

- Funcionar no navegador, sem backend, login ou persistencia permanente de
  textos e resultados. Nao registrar valores em logs ou telemetria.
- Tratar valores como texto, sem executar HTML ou scripts e sem alterar o
  conteudo original para realizar a analise.
- Nao bloquear a digitacao com analises repetitivas; definir acionamento e
  limites tecnicos de processamento no planejamento, sem truncar dados da Carta.
- Oferecer mensagens em linguagem simples, com acentuacao, foco visivel e
  associacao programatica entre campo, ajuda e erro.
- Anunciar o resultado da revisao a leitores de tela sem repeticao excessiva;
  preservar navegacao por teclado e foco coerente.
- Nao marcar um campo como invalido apenas por sugestao de estilo.
- Funcionar em computador, tablet e smartphone, com texto ampliado e mensagens
  longas, sem corte, sobreposicao ou rolagem horizontal da pagina.
- Reutilizar componentes, tokens e Inter com os fallbacks do projeto.

## Referencias visuais e pendencias

A feature integra os componentes de formulario documentados para a 007:
`811:306` (Form-Card), `811:382` (orientacao aberta) e `651:317` (Label-Row).
O mapa local nao comprova todos os estados de erro, sugestao e resumo.

Antes de implementar os estados visuais, consultar via MCP o Figma Design
`YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e o Figma Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Registrar nodes, estados, mensagens,
composicao e responsividade no `implementation-plan.md`, resolvendo divergencias
com a spec sem ampliar escopo silenciosamente.

O planejamento deve conciliar ERS, contrato final da 007, catalogo editorial de
regras, momento de validacao e consumidores. Limiares e vocabulario do helper
existente nao devem ser tratados como padrao institucional aprovado.

## Fora de escopo

- IA generativa, corretor gramatical completo, traducao ou reescrita automatica.
- Validacao juridica, verificacao de fatos, autenticidade de documentos ou
  aprovacao da Carta pela GESED.
- Consultar regras atuais do Paraiba Digital automaticamente ou integrar a
  publicacao externa.
- Implementar formulario, previa, gerador CSV ou copia no tutorial completos.
- Criar nota de legibilidade, ranking, certificado ou progresso obrigatorio.
- Login, historico, armazenamento permanente ou envio de dados a terceiros.
- Implementar validacao do diagnostico ou dos formularios de atendimento.

## Dependencias

- `001-fundacao-do-projeto`: tipos, schema e helpers iniciais.
- `007-formulario-carta-servico`: valores atuais, partes, campos e pontos de
  exibicao; o planejamento de 007 e 008 deve conciliar contratos em conjunto.
- `006-organizar-informacoes`: cobertura editorial e tratamento de desconhecidos.
- `009-previa-html`, `010-exportacao-csv` e `012-copia-dados-tutorial`:
  consumo consistente da Carta e limites de bloqueio.
- `016-responsividade-acessibilidade`: alinhamento transversal, sem adiar os
  requisitos desta feature.
- Validacao editorial do catalogo de regras e referencias visuais dos estados.

Na criacao desta spec, 009, 010 e 016 ainda nao possuem pastas em `specs/`.
Helpers existentes e consumidores placeholder nao representam features
concluidas. Os criterios integrados dependem dos consumidores implementados.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Solicitar revisao com os cinco obrigatorios vazios ou apenas espacos. | Identificar cada pendencia e oferecer acesso ao campo correto em qualquer parte. |
| CA02 | Informar os obrigatorios, incluindo custo textual `0`. | Remover erros de ausencia sem declarar veracidade, gratuidade ou aprovacao. |
| CA03 | Manter nome popular e informacoes adicionais vazios. | Nao gerar erros de obrigatoriedade nem sugestoes de estilo para esses vazios. |
| CA04 | Avaliar texto que atende ao criterio versionado de extensao. | Exibir sugestao correspondente ao que a regra realmente mede, sem limite obrigatorio de campo. |
| CA05 | Usar termo observado com acentos e variacao de caixa ou como parte de outra palavra. | Detectar ocorrencias conforme o catalogo e limites de palavras, sem falso disparo por substring. |
| CA06 | Receber sugestoes e continuar sem alterar o texto. | Manter navegacao, previa, copia e exportacao permitidas quando obrigatorios estiverem preenchidos. |
| CA07 | Corrigir o valor que originou mensagem. | Atualizar o resultado e remover mensagens obsoletas sem modificar outros dados. |
| CA08 | Reordenar ou remover item com mensagem. | Manter associacao ao item correto e eliminar resultado de item removido. |
| CA09 | Tentar exportar com obrigatorios ausentes no consumidor 010. | Impedir exportacao e apresentar as mesmas pendencias do formulario. |
| CA10 | Consultar previa ou copiar campo preenchido de Carta parcial. | Permitir consulta/copia sem bloqueio global por pendencias ou sugestoes. |
| CA11 | Avaliar Carta com campos ausentes, nulos ou de tipo incompatível. | Nao provocar excecao nem considerar obrigatorio invalido como preenchido. |
| CA12 | Analisar valores com HTML, acentos e quebras de linha. | Tratar como texto e preservar integralmente a Carta. |
| CA13 | Abrir formulario vazio e editar por teclado e leitor de tela. | Evitar erros prematuros e anuncios a cada tecla; anunciar revisao e permitir localizar/corrigir campos. |
| CA14 | Consultar mensagens longas com ampliacao e em telas pequenas. | Manter leitura, foco e acoes acessiveis sem corte ou rolagem horizontal. |
| CA15 | Revisar arquitetura e catalogo de regras. | Encontrar avaliacao local, mensagens versionadas e ausencia de envio externo, reescrita automatica ou persistencia permanente. |
| CA16 | Simular falha da analise de sugestoes ou da validacao obrigatoria. | Manter edicao; nao anunciar analise concluida nem permitir exportacao por falha da verificacao obrigatoria. |
| CA17 | Avaliar texto sem ocorrencias detectadas. | Informar apenas o resultado das regras, sem selo de clareza ou aprovacao institucional. |
| CA18 | Revisar implementacao visual futura. | Encontrar consultas Figma e estados registrados e divergencias resolvidas. |
| CA19 | Revisar configuracoes de agendamento em Nao/Sim, interno/externo e apos trocar sistema. | Aplicar somente obrigatoriedade de campos ativos conforme 007 CA19–CA24; limpar resultados inativos sem apagar dados; mesmos erros no formulario e CSV, com foco no controle correto. |

## Proximo passo

Executar `/spec:planejar 008-validacao-linguagem-simples` para definir catalogo
de regras, contratos de resultados, acionamento, integracao e testes. Depois,
criar tarefas e `implementation-plan.md`, validar as pendencias editoriais e
documentais e executar `/spec:validar` antes de `/spec:implementar`.

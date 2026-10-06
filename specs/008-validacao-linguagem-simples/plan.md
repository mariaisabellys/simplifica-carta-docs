# Plan: Validacao e linguagem simples

## Objetivo e status

Implementar avaliacao local, deterministica e sem mutacao para identificar os
cinco obrigatorios gerais e condicionais de agendamento ausentes e oferecer sugestoes
editoriais junto aos campos
da Carta. Compartilhar obrigatoriedade com previa/exportacao e manter sugestoes
sem bloqueio de navegacao, copia ou CSV.

Este plano prepara `/spec:tarefas`. Nao implementa codigo, instala bibliotecas
ou homologa regras. Antes do codigo, criar tarefas e `implementation-plan.md`,
conciliar ERS/copy, confirmar contratos da 007 e consultar referencias visuais.

## Fontes consultadas e limites

- Spec 008 atual, spec e plano da 007, specs 006 e 009–012/016.
- Requisitos textuais e documentos locais de arquitetura/processo consultados
  durante a criacao da spec: validacao no navegador, obrigatorios antes da
  exportacao, sugestoes orientativas e dados apenas de sessao.
- Mapa Figma e referencias locais de formulario.
- `src/lib/validation.ts`, `src/features/carta/carta.validation.ts`, schema,
  tipos, FormField e scripts do projeto.

Nao houve consulta direta ao Figma ou leitura do PDF do ERS nesta etapa.
Catalogo abaixo e proposta editorial verificavel, ainda sujeito a validacao.
Nao usa fontes externas para afirmar regras juridicas ou de linguagem oficial.

## Estado atual

- `validarCartaObrigatoria` consulta paths de cinco campos e devolve apenas
  campo/mensagem, sem status de falha ou identidade de item.
- `textoEstaPreenchido` espera string e usa trim; precisa tratar entradas
  desconhecidas defensivamente no contrato de validacao.
- `sugerirLinguagemSimples` avalia tamanho total maior que 240 e quatro termos
  por regex. A mensagem de frases menores nao corresponde necessariamente
  ao que o teste de tamanho total mediu; `deverão` nao esta coberto explicitamente.
- Formulario e consumidores ainda sao placeholders; a 007 planeja provider,
  IDs de itens, null nas escolhas e `atendimento.orientacaoAgendamento`.
- A tabela atual da spec 008 inclui nome popular como opcional. Ele nao integra
  o conjunto dos cinco obrigatorios e nao recebe analise automatica de estilo.
- Nao existe framework de testes configurado.

As notas de ausencia das specs 009/010/016 sao historicas; elas agora existem.
Sua documentacao nao comprova integracao implementada. Conferir estado real
antes de escrever componentes ou adaptar consumidores.

## Abordagem tecnica

### 1. Regras e mensagens compartilhadas

Manter uma unica lista tipada de obrigatorios, inicialmente no schema ou em
modulo dedicado referenciado por ele. Campos: nome, descricao, publico-alvo,
prazo e custos. Acrescentar as regras condicionais de agendamento da 007; listas, nome
popular e orientacoes complementares continuam opcionais.

Implementar funcoes puras separadas para obrigatoriedade e linguagem simples.
Mensagens, rotulos e configuracoes editoriais ficam em
`src/content/validation/carta.ts`; algoritmos ficam em `src/features/carta/`
ou helper compartilhado realmente generico. Nao duplicar regras no JSX nem
permitir que cada consumidor declare sua propria obrigatoriedade.

Verificacao de preenchimento aceita unknown: somente string cujo trim tenha
conteudo passa. Nulo, ausente, numero, objeto e lista nao passam como texto
obrigatorio. Custo textual `0` passa. O trim nao modifica valor armazenado.
Leitura de campos usa seletores tipados/defensivos, sem executar getters ou
interpretar paths fornecidos pelo usuario. Dados restaurados passam primeiro
pelo decoder da 007; validacao continua defensiva contra estrutura incompleta.

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

Tipos de agendamento devem formar conjunto nao vazio de valores conhecidos (Online,
Presencial ou ambos); sistema/exibicao precisam de enum valido. URL externa deve ser
absoluta e preenchida; protocolo permitido precisa de decisao antes do codigo. Campos
inativos nao recebem erros nem sugestoes; URL e enums nao recebem heuristica editorial.

### 2. Contrato de resultados

Proposta de referencia, a consolidar com 007 nas tarefas:

```ts
type CartaSchedulingFieldId =
  | "atendimento.tiposAgendamento" | "atendimento.sistemaAgendamento"
  | "atendimento.linkAgendamento" | "atendimento.exibicaoAgendamento";
type ValidationTarget =
  | { kind: "field"; field: CartaTextFieldId | CartaSchedulingFieldId }
  | { kind: "item"; list: "etapas" | "canais"; itemId: string;
      field: "descricao" };

type ValidationIssue = {
  id: string;
  ruleId: string;
  target: ValidationTarget;
  severity: "error" | "suggestion";
  messageKey: string;
  parameters?: Readonly<Record<string, string>>;
};

type ValidationRun =
  | { status: "complete"; issues: readonly ValidationIssue[] }
  | { status: "failed"; reason: "validation-unavailable" };
```

`CartaTextFieldId` e uniao fechada dos campos textuais da 007. Paths tecnicos
ficam internos; rotulos visiveis vem do registro editorial de campos. Separar
retorno obrigatorio do retorno editorial: falha de sugestoes nao elimina erros
obrigatorios e falha de obrigatorios nunca equivale a lista vazia de erros.

IDs de resultado derivam de regra + alvo estavel, sem texto do usuario e sem
indice de lista como identidade. Em mensagem com termo, interpolar como texto
e nunca como HTML. Nao persistir resultados ou inserir mensagens no modelo.

### 3. Catalogo inicial proposto

| Regra | Disparo | Mensagem proposta | Limites |
| --- | --- | --- | --- |
| `required-text` | Campo da lista obrigatoria nao e string preenchida | `Informe {campo} para completar as informações necessárias à exportação.` | Erro de ausencia, sem validar fatos |
| `long-text` | Mais de 240 pontos de codigo no texto com espacos externos desconsiderados apenas na analise | `Este texto é extenso. Revise se pode organizar as informações em trechos menores, sem retirar conteúdo necessário.` | Sugestao sobre extensao total, sem afirmar frases longas |
| `formal-term` | Palavra inteira normalizada presente em vocabulario versionado | `Avalie se “{termos}” pode ser substituído por uma expressão mais direta, mantendo o sentido.` | Sugestao contextual, sem substituicao automatica |

O limiar de 240 e proposta herdada do helper, sem obrigatoriedade ou limite de
campo. Usar contagem definida em pontos de codigo para casos de Unicode e
testar fronteira 240/241; nao confundir com tamanho de bytes ou regras externas.

Vocabulario inicial proposto: `devem`, `deverão` (tambem detectar grafia sem
acento `deverao`), `efetuar` e `realizar`. Nao ampliar automaticamente para
flexoes, radicais ou sinonimos. Esses termos podem ser adequados ao contexto;
a mensagem deve sugerir avaliacao, sem classificar seu uso como incorreto.

Normalizar copia de analise para Unicode e comparacao sem diferenca de caixa
ou acento; manter a fonte original. Tokenizar palavras com limites Unicode,
sem depender somente de `\b` ASCII. Extrair o termo original para mensagem
quando possivel. `realizacao`, `irrealizar` e `devemos` nao correspondem ao
catalogo fechado. Pontuacao adjacente nao impede ocorrencia.

Deduplicar termos por forma normalizada, preservando ordem da primeira
ocorrencia, e produzir uma sugestao da regra por alvo. Um campo pode receber
no maximo as duas sugestoes editoriais iniciais, sem repeticao por ocorrencia.

Exemplos de verificacao editorial:

- 240 pontos de codigo: sem `long-text`; 241: com sugestao de extensao.
- Texto longo com varias frases curtas: mensagem de texto extenso, sem afirmar
  que cada frase precisa ser dividida.
- `DEVERÃO apresentar` e `deverao apresentar`: ocorrencia do mesmo termo.
- `Realizar o pedido.`: sugestao contextual; `realizacao do pedido`: nenhuma
  ocorrencia pelo catalogo inicial.
- Campo vazio/opcional: nenhuma sugestao; custo `0`: sem erro de ausencia.

Nao criar segmentador de frases, corretor gramatical, detector de siglas,
ranking ou nota nesta entrega. Orientacoes gerais sobre palavras conhecidas,
siglas e acoes claras ficam disponiveis como conteudo editorial, sem alegacao
de deteccao automatica. Exemplos finais requerem validacao institucional.

### 4. Campos avaliados e listas

Analisar descricao, publico-alvo, criterios, prazo, custos,
`atendimento.orientacaoAgendamento`, informacoes adicionais e cada descricao
de etapa/canal com texto. Orientacao so recebe analise com Sim; URL e enums nao recebem
heuristica de linguagem. Nome, nome popular e nomes de documentos recebem
orientacao editorial sem heuristica automatica nesta spec.

Agendamento nao informado e classificacao/tipo de item null sao dados parciais,
sem novas regras de bloqueio aqui. A 007 preserva itens parciais; 009–012
representam ausencias sem inventar valores. Conciliar regras estruturais
adicionais em validacao documental, sem inseri-las por analogia ao required.

Resumo ordenado por partes/campos e ordem atual das listas. Resolver numero
visivel da etapa a partir do item atual, sem gravar indice no resultado.
Remocao do item elimina suas mensagens; reordenacao mantem associacao por ID.

### 5. Acionamento e atualizacao

Proposta de ciclo no formulario:

- Abrir formulario: sem erros obrigatorios visiveis em controles intocados.
- Blur de campo: marcar visitado e avaliar seu valor atual, sem mover foco.
- Revisao explicita: avaliar todos os obrigatorios e campos editoriais,
  abrir resumo de pendencias e disponibilizar destinos de correcao.
- Editar campo ja avaliado: atualizar erro obrigatorio com o valor corrente;
  invalidar sugestoes anteriores imediatamente e recomputar apos pausa
  proposta de 300 ms ou blur, sem anunciar a cada tecla.
- Mudar/remover item: invalidar resultados pelo ID e recalcular alvo alterado.
- Exportar: executar verificacao obrigatoria sincronamente sobre a mesma
  versao da Carta que a 010 serializa, independentemente dos campos visitados.

Tempo de 300 ms e ajuste tecnico proposto, a confirmar com medicao. Estado
pendente nao deve mostrar sugestao velha como atual. Avaliacao atrasada usa
revisao/token de entrada e descarta resultado se valor ou item ja mudou.
Mesmo com motor sincrono, cancelar timers na desmontagem e remocao de item.

Resultados sao derivados, locais e nao persistidos. Sessao restaurada nao
herda mensagens ou dispensas. O usuario nunca precisa aceitar/desmarcar
sugestoes para continuar. Revisar e navegar para previa parcial continua permitido.

### 6. Desempenho e falhas

Usar varreduras simples e vocabulario pequeno, evitando regex com backtracking
complexo ou processamento integral a cada tecla. Medir textos/listas longos
representativos nas tarefas; nao impor limite editorial para compensar custo.

Se a medicao mostrar bloqueio, dividir analise editorial em tarefas ou worker
local e manter indicador de pendencia; nao truncar silenciosamente texto ou
anunciar analise integral de trecho parcial. Definir limite de tempo/fixture
tecnico no plano detalhado com evidencia, sem prometer desempenho ilimitado.

Capturar falhas obrigatorias e editoriais separadamente e devolver status
tipado sem texto da Carta em logs. UI informa analise indisponivel, permite
nova revisao e preserva edicao. CSV fica impedido somente quando verificacao
obrigatoria falhou ou encontrou obrigatorios ausentes, nunca por falha editorial.

### 7. UI e consumidores

Criar `FieldValidationMessages` e `ValidationSummary` se a extracao concentrar
contrato realmente compartilhado. Integrar com FormField da 007: IDs estaveis,
`aria-describedby`, `aria-invalid` apenas para erro, links para alvo e
anuncio resumido de revisao. Erros e sugestoes possuem rotulo textual distinto.

Revisao explicita pode focar resumo; links abrem parte e focam controle pelo
contrato da 007. Em digitacao, nao mudar foco. Nao declarar cada mensagem como
alert assertivo; anunciar atualizacoes relevantes de forma comedida conforme 016.

| Consumidor | Integracao |
| --- | --- |
| 007 | Slots por campo, campos visitados, revisao e destinos/foco |
| 009 | Mesmas pendencias obrigatorias, sem bloquear previa parcial |
| 010 | Gate por status obrigatorio complete sem errors, usando snapshot atual |
| 011/012 | Nenhum gate global de copia; nenhum texto alterado ou mensagem transferida |

Manter adaptador temporario do contrato `ValidacaoCarta[]` somente se houver
callers reais; preservar status de falha sem converter em array vazio.
Revisar callsites do helper `sugerirLinguagemSimples` antes de substitui-lo,
sem manter duas regras divergentes em paralelo. Nao implementar consumidores
completos como parte da 008.

## Arquivos previstos

| Arquivo | Intervencao |
| --- | --- |
| `src/features/carta/carta.validation.ts` | Obrigatoriedade defensiva e retorno tipado |
| `src/features/carta/carta.validation.types.ts` | Criar alvos, IDs e status de resultado |
| `src/features/carta/carta.language.ts` | Criar avaliacao editorial pura e catalogo aplicado |
| `src/content/validation/carta.ts` | Criar mensagens, termos, limiares e orientacoes |
| `src/lib/validation.ts` | Consolidar helpers genericos e retirar regra duplicada |
| `src/features/carta/carta.schema.ts` | Referenciar unica fonte de obrigatorios, se necessario |
| `src/components/forms/FieldValidationMessages.tsx` | Criar apresentacao de mensagens, se justificada |
| `src/components/forms/ValidationSummary.tsx` | Criar resumo e destinos de correcao |
| `src/pages/FormularioCartaPage.tsx` e componentes da 007 | Integrar acionamento e retorno sem duplicar estado da Carta |
| `src/components/forms/FormField.tsx` | Consolidar associacoes de ajuda/erros com 007 |
| Estilos de formulario e tokens existentes | Estados confirmados, contraste e responsividade |

Prever testes unitarios de regras e integracao do formulario. Caminhos novos
sao propostas, a adaptar a estrutura real da 007 no plano detalhado. Nao
alterar storage, backend ou geracao CSV completa nesta feature.

## Referencias visuais e pendencias

Consultar via MCP Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`,
nodes locais `811:306`, `811:382` e `651:317`, e localizar estados de erro,
sugestao e resumo que nao estejam nesses componentes. Consultar Figma Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.

Registrar estados normal/visitado/erro/sugestao/pendente/falha, hierarquia,
contraste, foco, texto ampliado e composicao responsiva no plano detalhado.
Nao presumir que badge Necessario define toda validacao ou que sugestao tem
estilo de erro. Validar copy/catalogo e obrigatoriedade com ERS e equipe antes
de implementar; o limiar e vocabulario acima sao propostas, nao homologacao.

## Estrategia de testes

Esta etapa altera somente documentacao. Verificar cobertura RF01–RF06,
CA01–CA19 e contratos da 007. Testes/build abaixo sao futuros.

Reutilizar infraestrutura da 007 se existir. Se nao houver, registrar nas
tarefas configuracao de testes adequada: funcoes puras e integracao de
mensagens/timers justificam testes automatizados, sem instalar nesta etapa.

- Obrigatorios: cada campo ausente, null, tipo errado, espacos/quebras,
  texto `0`, opcionais vazios e campos extras desconhecidos.
- Agendamento: null/Nao sem configuracoes ativas; Sim exige tipos e sistema;
  Online/Presencial/ambos, enums invalidos e modalidades repetidas. Externo
  exige URL absoluta e exibicao; nativo ignora valores externos retidos.
  Cobrir troca/restauracao/recarga e retirada imediata de mensagens inativas,
  inclusive durante timer pendente com texto preservado; formulario/CSV
  recebem o mesmo resultado required do snapshot atual.
- Catalogo: 240/241 pontos de codigo, Unicode composto/decomposto, caixa,
  acentos, pontuacao, palavra inteira e negativos por substring/flexao nao listada.
- Deduplicacao: termo repetido e varias regras, uma mensagem por regra/alvo,
  ordenacao coerente e nenhuma analise de placeholder.
- Pureza: Carta congelada/fixture nao muda apos avaliacao; preservar acentos,
  HTML textual, quebras e ordem das listas.
- Identidade: mover/remover etapa ou canal sem trocar alvo ou manter mensagem
  de item removido.
- Atualizacao: resultado atrasado nao retorna apos nova edicao/remocao,
  cancelamento de timer e sugestao obsoleta ausente.
- Falhas separadas: editorial indisponivel nao apaga required; required failed
  nao libera exportacao; nenhum falso sucesso de analise.
- Integracao: abrir sem erros prematuros, blur, revisao completa, foco de resumo,
  correcao em parte oculta e sugestao sem aria-invalid/gate.

| Criterios | Verificacao futura |
| --- | --- |
| CA01–CA03/CA11 | Obrigatoriedade defensiva e opcionais |
| CA04–CA05/CA17 | Catalogo, limites e comunicacao sem garantia de clareza |
| CA06/CA09–CA10 | Exportacao bloqueada somente por required; previa/copia livres |
| CA07–CA08 | Atualizacao e identidade de resultados |
| CA12/CA15–CA16 | Texto preservado, localidade, pureza e falhas |
| CA13–CA14 | Teclado/leitor de tela, timing de anuncios e responsividade |
| CA18 | Consultas visuais e estados registrados |
| CA19 | Obrigatoriedade somente de configuracoes ativas conforme 007 CA19–CA24; retirada de resultados inativos sem apagar dados, mesmos erros no formulario/CSV e foco no controle correto |

Executar `npm run typecheck`, `npm run build` e suite configurada apos codigo.
Validar em 1440, 1024, 768, 390 e 320 px, com zoom e textos longos; seguir matriz
de teclado/leitor de tela da 016. CA09 e CA10 integrados permanecem pendentes
ate 009/010/012 reais, sem tomar placeholders como evidencias.

## Riscos e mitigacoes

- Heuristica percebida como regra oficial: linguagem contextual e validacao editorial.
- Mensagem desconectada do algoritmo: long-text fala de tamanho total, sem
  afirmar avaliacao de frases; testes de fronteira e negativos.
- Perda de acentos/valores: normalizar somente copia de analise, sem mutar fonte.
- Bloqueio indevido: severidades e status separados; consumidores consultam required.
- Sugestao em item errado: IDs estaveis da 007, sem identidade por indice.
- Mensagem obsoleta/ruido: invalidar ao editar, timer cancelavel e anuncios
  somente em eventos relevantes.
- Regras duplicadas: uma fonte de required e um catalogo editorial versionado.
- Campos/modelo ainda propostos: reconciliar com implementacao real da 007
  antes de consolidar tipos e callsites.

## Proximo passo

Executar `/spec:tarefas 008-validacao-linguagem-simples`. Depois, consolidar
catalogo/copy, contratos da 007, Figma e verificacoes em
`/spec:plano-implementacao`, seguido de `/spec:validar` antes do codigo.

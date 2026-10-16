# Plan: Copia de dados no tutorial

> **Baseline v3 — 16 de outubro de 2026:** seletores e formatadores devem ser
> refeitos sobre o modelo central da 007; paths v2 abaixo são históricos.

## Objetivo e status

Integrar campos de copia individual em `/tutorial-paraiba-digital`, usando
valores atuais da Carta da sessao e retorno por campo. Preservar texto e listas,
permitir Carta parcial e manter alternativa manual quando clipboard falhar.

Este plano prepara `/spec:tarefas`, sem implementar codigo ou acessar a area
de transferencia. Antes de implementar, revisar a conciliacao documental com
007/011, criar tarefas e implementation-plan e consultar Figma.

## Fontes e limites

- Spec 012 atual; specs/planos 007–011; spec 015 para possivel reuso de utilitario
  de copia de texto e spec 016 para verificacoes transversais.
- README, manual textual, arquitetura, constitution e regras de IA consultados
  nas etapas anteriores.
- Tutorial/rota atuais, tipos/schema/storage da Carta e busca de callsites
  de copia em `src/`: nenhum mecanismo de clipboard implementado.
- [Clipboard.writeText — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText),
  consultado nesta etapa: operacao assincrona em contexto seguro, com retorno
  de sucesso apos atualizacao da area de transferencia e possibilidade de recusa.

Nao houve leitura do PDF do ERS, consulta direta ao Figma ou teste em browser.
Referencia da API nao comprova permissao no dispositivo nem resultado real.

## Estado atual e conciliacao obrigatoria

Atualizacao em 2026-10-05: RF03/CA03/CA06 da spec foram revisados
explicitamente nesta etapa de implementation-plan para os 17 campos,
null/false explicito e listas parciais. As observacoes abaixo descrevem a
divergencia identificada na criacao deste plan. A conciliacao documental
agora possui proposta consistente na spec e no implementation-plan; validacao
cruzada, implementacao e aceite continuam pendentes.

- Conteudo do tutorial possui seis etapas; a pagina ainda nao compoe a etapa
  ativa nem a regiao de dados da etapa 4.
- Modelo atual nao possui nome popular/como agendar e usa false inicial.
- A 007 propoe provider compartilhado, decoder v2, boolean|null e IDs de itens.
- A 011 define uma etapa ativa por `?etapa=1..6`; a regiao unica de copia e
  montada somente em `fill-information` (`?etapa=4`, node `564:980`).
- RF03/CA06 da spec 012 estao alinhados com false explicito, null e campos
  condicionais de agendamento, preservacao na sessao e transferencia somente
  de valores ativos. Validacao cruzada e implementacao permanecem pendentes.

Notas de ausencia das pastas 007–011 sao historicas; suas specs agora existem,
sem representar componentes/consumidores entregues. Nao existe framework de
testes configurado atualmente.

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

## Abordagem tecnica

### 1. Fonte unica e seletores de transferencia

Consumir `useCartaSession` da 007, sem ler storage diretamente, montar provider
na pagina, salvar copia da Carta ou editar valores no tutorial. Derivar campos
de transferencia por funcao pura sobre o modelo validado/migrado.

Proposta de contrato:

```ts
type CartaTransferFieldId =
  | "nome" | "nome-popular" | "descricao" | "publico-alvo"
  | "documentos" | "criterios" | "canais" | "prazo" | "custos"
  | "agendamento" | "tipo-agendamento" | "sistema-agendamento"
  | "link-agendamento" | "exibicao-agendamento" | "como-agendar" | "etapas" | "adicionais";

type TransferField =
  | { id: CartaTransferFieldId; status: "present"; text: string }
  | { id: CartaTransferFieldId; status: "missing" };
```

O texto retornado pelo seletor e a fonte unica tanto da area selecionavel quanto
da chamada a `writeText`. O parametro enviado a API deve ser exatamente a string
derivada, sem normalizacao pelo app. A area manual deve preservar o conteudo e as
quebras visiveis; o DOM, o sistema operacional ou o destino podem normalizar os
terminadores CR/CRLF. Labels, botoes e mensagens ficam fora desse texto,
resolvidos pelo conteudo editorial. Nao copiar a partir de `innerText` do card
inteiro ou de DOM que inclua avisos e elementos de interface.

### 2. Cobertura e formatacao

Preservar a ordem da tabela revisada da 012: agendamento, os quatro campos
estruturados e orientacoes complementares opcionais. Manter IDs fechados e estaveis,
sem usar indice como destino/identidade.

- Strings: avaliar trim apenas para ausencia; copiar valor integral original,
  com espacos internos/externos, acentos, pontuacao e quebras de linha.
- Custo textual `0` e preenchido. Nao converter valores em numero ou gratuito.
- Agendamento: true = `Sim`, false explicito = `Não`, null = missing. Default
  legado passa por migracao da 007 antes de produzir texto.
- Orientacoes complementares sao copiaveis somente com Sim; configuracoes externas
  somente com sistema externo. Valores inativos permanecem na sessao sem acao de copia.
- Documentos: `{nome} (Obrigatório)` ou `{nome} (Opcional)` quando escolha
  explicita; null produz somente nome, sem inventar classificacao.
- Canais: `{tipo traduzido}: {descricao}` quando tipo informado; null produz
  somente descricao, sem inventar canal. Rotulos ficam em mapa versionado.
- Etapas: `{ordem}. {descricao}`, mantendo sequencia e numeros atuais da 007,
  coerentes com a previa; nao renumerar subset apos filtrar etapas vazias.
- Listas: LF entre itens, preservando quebras que existam nos textos; nenhum
  JSON, HTML ou ID. Omitir itens sem nome/descricao util; lista sem texto util
  e missing. Nao apresentar atributos isolados como dado completo.

Avisos de itens incompletos ou de agendamento ficam separados e nao entram
na copia. Nao aplicar prefixos de protecao do CSV da 010 ao clipboard: a copia
individual transfere texto para cadastro manual, sem transformacao editorial.

Os 17 campos formam o contrato neutro de transferencia, nao a quantidade de
cards da etapa. A projecao visual segue `quickCopyFields` do conteudo da 011:

| ID visual | Campo local | Acao de copia |
| --- | --- | --- |
| `service-name` | `nome` | Sim, `copyLabel` versionado |
| `popular-name` | `nome-popular` | Sim, `copyLabel` versionado |
| `service-description` | `descricao` | Sim, `copyLabel` versionado |
| `required-documents` | `documentos` | Sim, `copyLabel` versionado |
| `audience` | `publico-alvo` | Sim, `copyLabel` versionado |
| `additional-information` | `adicionais` | Nao no conteudo atual |
| `keywords` | `informacoesFinais.palavrasChave` | Exibir o valor informado; nao inferir valor |
| `scheduling` | Projecao informativa de agendamento | Nao no conteudo atual |
| `cost` | `custos` | Nao no conteudo atual |
| `service-deadline` | `prazo` | Sim, `copyLabel` versionado |

Rotulo, ordem, `quickCopyIntroduction`, `editPrompt`, `editAction` e CTAs vem
de `tutorialParaibaDigitalContent.steps[3]`. Valores de exemplo do arquivo nao
substituem a Carta nem podem ser enviados ao clipboard como dados do usuario.

Compartilhar helpers puros de formatacao de listas/definicao de conteudo com
009/010 apenas quando as convencoes forem realmente identicas, sem acoplar
a copia ao escape CSV ou ao view model visual da previa. Extracao deve manter
contratos de ausencia diferentes (mensagem na UI, vazio em CSV, missing aqui).

### 3. Estado vazio e Carta parcial

Reutilizar definicao de Carta com conteudo da 007/009: algum texto util ou
resposta explicita de agendamento; IDs, numeros de ordem e defaults nao bastam.
Sem conteudo: mensagem global e Preencher Carta, com tutorial sempre consultavel.

Com Carta parcial: mostrar campos e valores disponiveis; ausentes exibem
`Não informado` fora do dado. Acao de copia ausente/desabilitada precisa de
explicacao textual, sem copiar essa mensagem ou bloquear outros campos.
Obrigatoriedade da 008 e exportacao da 010 nao sao gate para copia.

Ao editar e retornar, rederivar valores atuais. Recuperacao parcial/memoria
apenas usa avisos da 007; dados invalidos nao produzem undefined/null textual.
Navegacao usa links internos da 002 para preservar memoria sem depender de
sessionStorage. Nenhuma acao de copia limpa ou salva a Carta.

### 4. API de copia e retorno verdadeiro

Criar utilitario `copiarTexto` com retorno tipado success/failed e sem leitura
de clipboard. Chamar `navigator.clipboard.writeText(text)` diretamente a partir
do handler explicito, capturando recusa/indisponibilidade/erro sem logs de texto.
Nao exigir consulta previa a Permissions API ou presumir permissao persistente.

Detectar disponibilidade da API e contexto seguro, mas tratar rejeicao mesmo
quando ambos parecem disponiveis. Nao usar fallback deprecated ou selecao
invisivel que anuncia sucesso sem prova; alternativa e texto selecionavel.

Estado proposto por campo:

```ts
type CopyState =
  | { status: "idle" }
  | { status: "pending"; requestId: number; valueRevision: number }
  | { status: "copied"; requestId: number; valueRevision: number }
  | { status: "failed"; requestId: number; valueRevision: number };
```

Manter trava imediata por campo, alem do estado React, para evitar duplo clique
antes do re-render. Campos diferentes podem operar independentemente; retorno
fica associado ao campo/valor/tentativa que o originou. Clipboard armazena
ultimo texto gravado; nao prometer que confirmacao anterior permanece como
conteudo atual do sistema apos outra copia.

Exibir `Copiado!` somente apos promise resolvida. Em falha:
`Não foi possível copiar. Selecione o texto e copie manualmente.`
Nao mover foco automaticamente, limpar selecao do usuario ou anunciar envio.

Proposta de duracao: confirmacao visivel por 5 segundos ou ate mudanca do valor,
nova tentativa ou desmontagem, o que ocorrer primeiro. Erro permanece ate
mudanca/nova tentativa; texto manual sempre disponivel. O prazo e ajuste de
UI a confirmar no plano detalhado, sem exigir que usuario leia somente um toast.

### 5. Corridas, alteracao de valor e desmontagem

Versionar o texto derivado por campo. Ao mudar, invalidar confirmacao/erro
anterior e incrementar revisao; remover timers correspondentes.

Cada promise captura texto e revisao da tentativa. Ao concluir, atualizar UI
somente se campo montado e tentativa/revisao ainda correspondentes. Uma copia
do valor anterior que resolva tarde nao confirma valor novo. Nao ha cancelamento
garantido da gravacao externa; explicar limites somente se necessario ao retorno.

Enquanto tentativa antiga esta pendente, evitar nova gravacao concorrente do
mesmo campo ate ela terminar; permitir selecao manual e acesso aos outros
campos. Se o browser nao responder, definir tratamento de operacao demorada
no implementation-plan sem fingir que a promise foi cancelada ou criar novas
gravacoes desordenadas. Um timeout de UI nao garante cancelamento do clipboard.

Promises de campos diferentes podem terminar fora de ordem; cada Copiado!
indica sua operacao concluida, sem afirmar qual texto permanece no clipboard.
Ignorar callbacks apos desmontagem e limpar timers; nunca copiar ao remontar.

### 6. Componente e alternativa manual acessivel

`CartaCopyFields` recebe valores derivados e conteudo editorial, renderizando
campo com ID, label, area de texto e botao `Copiar {campo}`. Hook
`useFieldCopy` ou controlador equivalente concentra tentativas, revisoes e
timers sem manter outra Carta.

Preferir textarea readOnly rotulada para texto integral e selecao por teclado,
com tamanho adaptavel e rolagem interna quando necessaria; nao usar disabled,
que impediria selecao. Alternativa de bloco textual so entra se teste comprovar
selecao por teclado/leitor de tela/toque sem cortar conteudo.

Separar rotulo e mensagens do value. Textarea ausente nao deve ter value
`Não informado` copiavel; usar mensagem de ausencia em elemento proprio.
Textos longos podem rolar dentro do controle, sem scroll horizontal da pagina
ou ellipsis. Quebras e markup aparecem como texto, sem interpretacao HTML.

Anunciar resumo de sucesso/erro com nome do campo por live region comedida;
nao tornar todos os valores live regions. Manter foco no botao e controle
manual selecionavel. Nao depender de icon/check ou cor para diferenciar estados.

### 7. Integracao e responsabilidade de arquivos

011 fornece pagina, progresso, etapa ativa, fontes, acesso externo e a regiao
da etapa 4. 012 fornece seletores, projecao, componentes e mecanismo de copia. Reusar as
acoes Editar informacoes/Preencher Carta da composicao para evitar duplicacao.
Nao criar rota nova, campos editaveis ou mecanismo externo de cadastro.

| Arquivo | Intervencao prevista |
| --- | --- |
| `src/features/carta/carta.transfer.ts` | Criar seletores e textos de transferencia |
| `src/features/carta/carta.transfer.types.ts` | IDs/status, se separacao justificar |
| `src/lib/clipboard.ts` | Utilitario puro de responsabilidade browser, sem log de valores |
| `src/features/carta/useFieldCopy.ts` | Estado de tentativas/revisoes e timers |
| `src/components/tutorial/CartaCopyFields.tsx` | Regiao integrada com 011 |
| `src/components/tutorial/CopyField.tsx` | Campo, selecao, botao e retorno |
| `src/content/tutorial/copia-carta.ts` | Labels e mensagens versionadas |
| `src/pages/TutorialParaibaDigitalPage.tsx` | Montar regiao sem duplicar estado |
| Estilos existentes de tutorial e tokens | Estados, texto longo e responsividade |

Caminhos sao propostas a ajustar a estrutura real. IDs e copy compartilhados
com 011 precisam de fonte unica, evitando dependencia circular entre conteudo
e componentes. Utilitario clipboard pode atender copia de contato da 015;
esse reuso nao exige carregar Carta em pagina de suporte.

## Visual e pendencias

Consultar detalhadamente a variante da etapa 4 no
[Figma node 564:980](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-980&m=dev)
e o Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Nao presumir layout do
card de entrada da 003 como pagina tutorial. Registrar estados
vazio/valor/pending/copied/failed,
texto selecionavel, foco e responsividade no implementation-plan.

Resolver ERS/copy, revisao documental da 012 e contrato final de 007/011 antes
de codigo. Cobertura/mapeamento externo verificado pertence a 011; este plano
nao afirma que seus campos locais correspondem a plataforma homologada.

## Estrategia de verificacao

Esta etapa e documental. Conferir RF01–RF06, CA01–CA18 e divergencias listadas;
nenhuma area de transferencia foi lida/escrita nem build/interface testados.

Reutilizar infraestrutura de 007/011 quando houver; se ausente, definir nas
tarefas testes adequados para seletores, promises e integracao, sem instalar agora.

- Seletores: cobertura, opcionais, zero, true/false explicito/null, legado
  migrado, como agendar, listas parciais/vazias e numeros de etapas com lacunas.
- Preservacao: acentos, Unicode, quebras, HTML literal e fonte congelada
  inalterada; texto mostrado e parametro enviado exatamente iguais.
- Clipboard mock: resolve/reject/ausente, nenhum write ao montar, promise
  pendente sem sucesso, duplicidade de campo e campos independentes.
- Corridas: valor muda durante pending, retorno tardio, desmontagem, nova
  tentativa e timers antigos nao removendo estado de tentativa recente.
- Retorno: mensagem de falha, selecao manual disponivel, sucesso por campo e
  ausencia de promessa de envio/publicacao ou clipboard atual permanente.
- Integracao: editar/voltar, provider atualizando, sessao invalida/memoria,
  Carta parcial sem gate, regiao somente na etapa 4 e instrucoes da 011 sempre
  consultaveis. Sair da etapa desmonta feedback sem apagar a Carta.

| Criterios | Evidencia futura |
| --- | --- |
| CA01–CA03 | Cobertura e textos copiados integrais/listas legiveis |
| CA04–CA06 | Estado vazio/parcial, zero e falso explicito apos revisao da spec |
| CA07 | Falha e alternativa manual real |
| CA08–CA09 | Atualizacao, corridas e identidade das confirmacoes |
| CA10 | Recuperacao compartilhada e dados seguros |
| CA11–CA12 | Teclado/leitor de tela, selecao e textos longos |
| CA13–CA14 | Texto seguro, acesso livre e ausencia de envio/persistencia |
| CA15 | Campos ativos/inativos, Online/Presencial/ambos e troca/restauracao do sistema |
| CA16–CA18 | Montagem exclusiva na etapa 4, projecao do conteudo, node 564:980 e desmontagem segura |

Executar typecheck/build e suite apos codigo. Testar writeText por gesto real
em ambiente HTTPS nos navegadores Chrome, Edge, Firefox e Safari, incluindo
mobile conforme 016 e recusa/indisponibilidade. Verificar resultado com texto
sintetico em aplicativo de teste ou clipboard controlado, sem permissao de
leitura implementada no produto nem dados reais da Carta.

Verificar selecao/copia manual por teclado e toque, foco, live regions, larguras
1440/1024/768/390/320 px e zoom/reflow. Mock nao comprova permissao nem resultado
em browser real. Sem revisao de RF03/CA06, registrar aceite dessa semantica
como pendente em vez de implementar contra uma spec divergente.

## Riscos e mitigacoes

- False legado vira Nao indevido: decoder v2 e revisao documental antes de codigo.
- Texto exibido diverge do copiado: unica string derivada, sem copy do DOM.
- Copia antiga confirma valor novo: request/revisao e callbacks condicionais.
- Clipboard recusado: falha verdadeira e selecao manual independente da API.
- Listas parciais inventam regras: preservar texto e omitir atributo ausente.
- Confirmacao implica cadastro: copy e anuncio estritamente de copia concluida.
- Reuso de CSV altera texto: separar clipboard de escape/protecao de arquivo.
- UI longa impede selecao: controle readOnly rotulado e verificacao manual real.

## Proximo passo

Executar `/spec:tarefas 012-copia-dados-tutorial`, incluindo conciliacao da
spec, seletores, estados de corrida e integracao com 011. Depois, consolidar
Figma, contratos e testes em `/spec:plano-implementacao`, seguido de
`/spec:validar` antes de implementar.

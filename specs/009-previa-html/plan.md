# Plan: Previa HTML

## Objetivo e status

Substituir o placeholder de `/previa` por apresentacao HTML da Carta atual,
com cobertura integral, estados vazio/parcial/preenchido, pendencias de revisao
e retorno a edicao. Consumir a sessao da 007 e a obrigatoriedade da 008 sem
duplicar dados, alterar textos ou bloquear consulta de Carta parcial.

Este plano prepara `/spec:tarefas`. Codigo e estilos ficam para
`/spec:implementar`, depois de tarefas, `implementation-plan.md`, consultas
visuais e conciliacao das pendencias. HTML aqui significa renderizacao da
interface no navegador, sem arquivo HTML, PDF ou versao publica compartilhada.

## Fontes e limites

- Spec 009 atual; specs e planos 007/008; specs 010–012 e 016.
- README, manual textual de requisitos, fluxo do produto e arquitetura local.
- ADR-002, constitution, regras de IA e estrategia de implementation-plan.
- Mapa Figma e referencias locais de tokens/componentes.
- PreviaCartaPage, rotas, App, AppShell, ButtonLink, estilos e contratos
  iniciais da Carta consultados durante este planejamento e etapas anteriores.

Nao houve consulta direta ao Figma nem leitura do PDF do ERS nesta etapa.
Node `821:308` e referencia documentada localmente, sem composicao ou medidas
confirmadas por este plano. Conferir ERS e Figma no plano detalhado.

## Estado atual e pre-condicoes

- React/TypeScript/Vite, CSS global com tokens e Inter.
- Rota `/previa` existente, specId 009 e figmaNodeId `821:308`; nao e exposta
  automaticamente na navegacao principal.
- Pagina apenas com PageHeader e PlaceholderCard; nao consome Carta.
- App ainda nao tem provider da Carta; a 007 planeja estado acima das rotas,
  envelope de sessao v2, nome popular, orientacao de agendamento e IDs de itens.
- A 008 planeja resultados tipados e falha obrigatoria distinta de lista vazia.
- ButtonLink atual pode recarregar pagina; contratos de navegacao/foco da 002
  devem ser verificados antes da integracao.
- CSV e storage iniciais nao comprovam entrega de exportacao ou sessao robusta.
- Nao ha framework de testes configurado atualmente.

As notas historicas da spec sobre ausencia de 010/011/013/016 nao descrevem
o inventario atual: suas specs agora existem, mas paginas/fluxos ainda podem
ser placeholders. Nao declarar aceite integrado por existencia de rotas.

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

## Abordagem tecnica

### 1. Consumir a fonte unica

Usar `useCartaSession` proposto pela 007. O provider continua montado acima
das rotas; PreviaCartaPage nao inicializa Carta, chama storage ou grava dados.
Re-renderizar com atualizacoes da mesma fonte e derivar apresentacao de forma
pura, sem snapshot editavel ou cache persistido.

O decoder da 007 trata sessao legada/invalida e falhas de armazenamento. A
previa exibe seu aviso quando relevante e usa dados validos em memoria. Nao
replicar migracao ou corrigir o modelo durante renderizacao.

Se hidratacao passar a ser assincrona, distinguir carregamento de ausencia
antes de mostrar estado vazio. Provider ausente e erro de integracao a resolver
antes de entrega, sem inicializar Carta paralela como fallback silencioso.

### 2. Derivar estado e valores sem perder dados

Criar seletores puros, por exemplo `carta.preview.ts`, com valores de exibicao
separados da copy de interface. Contrato proposto:

```ts
type PreviewText =
  | { status: "present"; text: string }
  | { status: "missing" };

type PreviewItem = {
  id: string;
  value: PreviewText;
  attribute?: PreviewText;
};

type CartaPreviewModel = {
  hasContent: boolean;
  // Campos textuais, agendamento e listas tipados conforme a 007.
  // Mensagens e labels sao resolvidos pelo conteudo editorial.
};
```

Consolidar tipos concretos nas tarefas sem abstrair todos os campos como array
de valores heterogeneos ou string JSON. O seletor recebe modelo validado e
nao muta arrays ao ordenar ou filtrar. IDs servem para keys, nunca como dados
visiveis. Texto presente e retornado integralmente; trim apenas decide ausencia.

Definicao proposta de `hasContent`:

- algum campo textual com conteudo util, incluindo nome popular e orientacoes de
  agendamento somente com Sim;
- algum nome de documento ou descricao de etapa/canal com conteudo util;
- resposta explicita de agendamento true ou false no contrato v2/migrado.

IDs, numeros de ordem, tipos/classificacoes escolhidos em itens sem texto e
defaults nao caracterizam Carta com conteudo por si so. Agendamento legado
passa pela migracao da 007 antes dessa verificacao.

Estados de pagina:

- **Vazia:** nenhum conteudo conforme seletor; mensagem e Preencher Carta,
  sem cartao ficticio ou lista de cinco erros como unica apresentacao.
- **Com dados:** apresentar cartao integral. Obrigatoriedade complete com erros
  gera aviso de pendencias; sem erros gera aviso de revisao, sem selo aprovado.
- **Validacao indisponivel:** manter dados visiveis e informar que pendencias
  nao puderam ser verificadas; nao afirmar completude nem liberar CSV por falha.
- **Recuperacao parcial/memoria apenas:** mostrar aviso da sessao separado dos
  dados, mantendo edicao e consulta possiveis.

Nao usar estado binario completa/incompleta como certificacao de qualidade:
ausencia de obrigatorios nao avalia verdade, listas ou aceitacao externa.

### 3. Cobertura e convencoes de apresentacao

Propor secoes na ordem das partes da 007: identificacao, requisitos, etapas,
atendimento e informacoes adicionais. Confirmar composicao no Figma e registrar
eventual conciliacao de ordem antes de implementar, mantendo sequencia unica.

| Campo/grupo | Convencao proposta |
| --- | --- |
| Nome, descricao, publico-alvo, criterios, prazo e custos | Rotulo e texto integral; ausencia como mensagem editorial |
| Nome popular | Mostrar somente quando preenchido |
| Documentos | Lista com nome e Obrigatorio/Opcional; null = classificacao nao informada |
| Etapas | Lista ordenada segundo sequencia normalizada da 007, preservando descricao |
| Canais | Lista com tipo traduzido em linguagem simples e descricao; null = tipo nao informado |
| Agendamento | true = Sim, false = Nao explicito, null = Nao informado |
| Tipo de agendamento | Online, Presencial ou ambos; somente com Sim |
| Sistema de agendamento | Paraiba Digital ou Outro sistema ou site; somente com Sim |
| Link do agendamento | URL somente com Sim e sistema externo |
| Como o agendamento sera exibido? | Dentro do Paraiba Digital ou Em uma nova pagina; somente com Sim e sistema externo |
| Orientacoes de agendamento | `atendimento.orientacaoAgendamento`, opcional e visivel somente com Sim |
| Informacoes adicionais | Mostrar secao somente quando preenchida |

Nome ausente nao vira nome ficticio. Usar titulo de pagina/cartao editorial
independente, mantendo rotulo Nome do servico com ausencia identificada.

Para documento/canal com texto util, preservar item e indicar atributo ausente.
Itens sem nome/descricao util nao geram linhas de conteudo. Se tiverem apenas
classificacao/tipo, mostrar aviso de item de edicao incompleto separado dos
valores, com retorno ao formulario, sem inventar nome/descricao.

Etapas com descricao vazia nao viram instrucoes; se houver etapas preenchidas
e lacunas no array de edicao, preservar seus numeros de origem na visualizacao
e sinalizar etapa pendente. Nao renumerar silenciosamente um subconjunto que
pareceria sequencia completa. Usar `ol`/valor de item adequado e aviso separado;
ordens invalidas sao tratadas pelo decoder/reducer da 007.

Lista totalmente sem texto util mostra ausencia de informacao; nao afirma que
o servico dispensa documentos, etapas ou atendimento.

Configuracoes e orientacoes de agendamento so ficam visiveis com Sim; link e exibicao
somente com sistema externo. Preservar valores inativos na sessao sem apresenta-los como
aplicaveis. Nome popular/adicionais vazios sao omitidos uniformemente; demais campos
de cobertura ficam identificaveis em Carta com dados.

### 4. Renderizacao segura e semantica

Usar React com valores em nos de texto. Nao usar `dangerouslySetInnerHTML`,
Markdown interpretado, iframe/srcdoc ou template HTML concatenado a partir
de entradas. URLs/e-mails digitados permanecem texto nesta feature, sem
linkificacao ou carregamento remoto de conteudo.

Preservar quebras de linha com estilo apropriado, por exemplo white-space
pre-wrap, e quebra de palavras/enderecos longos. Nao criar ellipsis, resumo,
altura fixa ou conteudo oculto que corte a informacao.

Manter unico h1 da pagina, sections/h2, rotulos/valores em dl quando adequados
e listas ul/ol. Nao criar main interno ao shell. Mensagens da aplicacao ficam
fora do texto da Carta, mesmo quando associadas a um campo ou grupo.

### 5. Validacao e retorno para editar

Consumir somente verificacao obrigatoria compartilhada da 008. Nao rodar
heuristicas editoriais duplicadas na previa. Derivar pendencias da Carta atual
e manter falha distinta de ausencia de erros.

Resumo de pendencias reutiliza componente da 008 se seu contrato atender ao
caso de leitura. Links de correcao usam identificador fechado de campo e
destino interno `/formulario-carta` com fragmento a consolidar pela 007:
abrir parte correta e focar controle, sem dados em URL.

Atualizacao de dados nao move foco automaticamente nem transforma todo cartao
em live region. Anunciar apenas resumo/estado relevante quando necessario;
leitura integral deve ficar disponivel por semantica normal.

### 6. Acoes e integracao da exportacao

- Carta vazia: Preencher Carta para `/formulario-carta`; ajuda/tutorial
  continuam acessiveis, sem acao de download ficticia.
- Carta com dados: Editar informacoes para formulario e Ver tutorial para
  `/tutorial-paraiba-digital`, ambos sem gate de validacao.
- Ajuda: reutilizar acao do shell para `/ajuda` ou link explicito se ausente.
- Exportar CSV: slot/contrato integrado com 010, que possui processamento,
  validacao no clique, download e mensagens; a 009 nao implementa seu gerador.

Nao usar validacao cacheada da previa como unica permissao de exportacao: a
010 verifica o snapshot atual no acionamento. Se 010 nao estiver implementada,
registrar integracao pendente e nao renderizar botao que anuncia funcionalidade
inexistente. A conclusao integrada RF06/CA12 depende da entrega da 010.

Reutilizar links internos e historico da 002 para preservar Carta em memoria,
inclusive quando sessionStorage estiver indisponivel. Evitar reload por
ButtonLink atual como caminho principal. Nao criar router paralelo ou expor
previa automaticamente no menu apenas porque a rota ja existe.

## Componentes e arquivos provaveis

| Arquivo | Intervencao |
| --- | --- |
| `src/pages/PreviaCartaPage.tsx` | Consumir provider, estados e acoes |
| `src/features/carta/carta.preview.ts` | Criar seletores puros de apresentacao e conteudo |
| `src/content/pages/previa-carta.ts` | Criar labels, avisos, estados vazio e acoes |
| `src/components/carta/CartaPreview.tsx` | Criar cartao sem edicao, recebendo valores e copy |
| `src/components/carta/PreviewField.tsx` | Criar campo rotulado, somente se simplificar repeticao |
| Componente ValidationSummary da 008 | Reutilizar/adaptar contrato de destinos se necessario |
| Estilos de pagina/globais e tokens existentes | Layout, texto integral, estados e responsividade |
| `src/app/routes.tsx` | Manter rota/node; alterar somente referencia/layout confirmado |

Breadcrumb, ButtonLink, AppShell e navegacao podem exigir integracao minima
se contratos da 002 ainda nao estiverem prontos. Provider/storage sao da 007;
nao criar fallback independente. Arquivos/componentes novos sao propostas,
a ajustar ao codigo real. Assets apenas apos inventario visual.

## Figma, responsividade e acessibilidade

Consultar via MCP Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`,
node `821:308`, e identificar composicao completa/acoes/estados adicionais.
Consultar Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Registrar no plano
detalhado medidas, tokens, assets e adaptacoes, sem presumir layout integral
a partir do nome card-servico-completo.

Se o frame omitir campos do contrato, resolver divergencia antes de codigo,
preservando cobertura. Nao copiar posicionamento absoluto para textos variaveis.
Usar altura por conteudo, colunas responsivas e ordem de leitura unica.

Validar foco/contraste, landmarks e leitura de listas. Testar desde 320 px,
zoom, reflow, enderecos sem espacos e fonte fallback conforme 016. Avisos,
pendencias e acoes precisam permanecer visiveis/acessiveis em telas pequenas.

## Estrategia de verificacao

Esta etapa e documental: conferir RF01–RF07 e CA01–CA19, arquivos citados e
consistencia com 007/008/010. Nenhum teste de interface ou build foi executado.

Na implementacao, reutilizar infraestrutura de testes da 007/008. Se ainda
ausente, definir nas tarefas como executar testes significativos dos seletores
e integracao, sem instalar biblioteca por um teste que apenas repita labels.

- Seletor vazio: modelo inicial, IDs/defaults e itens sem texto nao produzem
  Carta ficticia; false explicito produz conteudo, legado passa por migracao.
- Texto: `0`, acentos, quebras, espacos internos, HTML e strings longas
  preservados; fonte congelada nao muda na derivacao/renderizacao.
- Listas: documento/canal parcial, atributo null, etapa vazia intercalada,
  reordenacao e ausencia total com convencoes corretas.
- Agendamento: Sim/Nao/null e valores inativos preservados na sessao e omitidos da previa.
- Configuracoes ativas: Online/Presencial/ambos, Sim sem tipos/sistema,
  Paraiba Digital com URL/exibicao retidas e externo com URL/exibicao
  presentes/ausentes, dentro/nova pagina. Troca/restauracao/recarga e
  atualizacao com previa montada preservam a fonte; rotulos sao linguagem
  simples e URL permanece texto, sem anchor/iframe ou redirecionamento.
- Estado compartilhado: editar, navegar para previa, atualizar fonte montada,
  voltar e recarregar com sessao valida; memoria apenas continua funcional.
- Erros: falha de recuperacao, required failed e pendencias nao impedem cartao;
  nenhum falso estado completo ou permissao de exportacao.
- Seguranca: markup digitado aparece como texto, sem elementos/script/imagem
  derivados dos valores nem requisicao externa originada por sua interpretacao.

| Criterios | Verificacao futura |
| --- | --- |
| CA01/CA03/CA10/CA13 | Rotas, fonte unica, recuperacao e continuidade |
| CA02/CA06–CA09 | Cobertura, listas, zero, agendamento e ordem |
| CA04–CA05/CA11 | Estados parcial/vazio, pendencias e sugestoes sem gate |
| CA12 | Integracao real da 010, pendente ate sua implementacao |
| CA14 | Texto integral e renderizacao segura |
| CA15–CA16 | Teclado/leitor de tela, foco e layouts com textos extensos |
| CA17–CA18 | Arquitetura, copy, Figma e ausencia de formatos extras |
| CA19 | Tipos/sistema somente com Sim; URL/exibicao somente para externo; ausencia ativa identificada e dados inativos omitidos sem apagar a fonte, inclusive troca/restauracao/recarga |

Executar `npm run typecheck`, `npm run build` e suite existente apos codigo.
Verificar 1440, 1024, 768, 390 e 320 px e larguras intermediarias, zoom de
200% e reflow, matriz de navegadores/leitores da 016 e comparacao com frame
confirmado. Nao declarar aceite de consumidores apenas por rotas placeholder.

## Riscos e mitigacoes

- Fonte obsoleta: usar provider, sem snapshot persistido no componente.
- Ausencia interpretada como regra: estado missing e copy sem inferencias.
- Lista filtrada parecer completa: preservar numeros de origem e avisar
  lacunas, sem inventar etapas ou renumerar subset.
- Dados perdidos por modelo inicial: depender de migracao versionada da 007.
- Texto executado/truncado: nos de texto e layout com quebra/altura natural.
- Exportacao falsa: contrato real da 010 e pendencia explicita ate sua entrega.
- Figma parcial: identificar pagina/estados e conciliar campos antes de estilos.

## Proximo passo

Executar `/spec:tarefas 009-previa-html`. Depois, consolidar contratos reais
de 007/008, slot de 010, copy e referencias visuais em
`/spec:plano-implementacao`, seguido de `/spec:validar` antes de implementar.

# Plan: Tutorial Paraiba Digital

> **Baseline v3 — 16 de outubro de 2026:** referências a dados da Carta devem
> usar a projeção v3 da 012; campos v2 abaixo são históricos.

## Objetivo e status

Evoluir `/tutorial-paraiba-digital` para tutorial sequencial com conteudo
versionado, fontes e data de revisao, integrando os campos de copia da 012
e preservando consulta independente de Carta ou CSV.

Este plano define abordagem e tarefas possiveis. O conteudo operacional ainda
depende de fonte oficial/material institucional validado; a estrutura tecnica
pode seguir para `/spec:tarefas`, mas nao representa tutorial pronto para
implementacao/publicacao. Criar implementation-plan e resolver pendencias
antes de codigo, sem inventar menus, permissoes ou estados externos.

## Referencias Figma oficiais

A rota representa uma pagina unica com seis variantes de etapa:

| Tipo | Etapa | Node |
| --- | --- | --- |
| Pagina — estado inicial | 1. Acesse a plataforma | `564:635` |
| Variante | 2. Faca login | `564:730` |
| Variante | 3. Localize o cadastro | `564:852` |
| Variante | 4. Cadastre as informacoes de sua Carta | `564:980` |
| Variante | 5. Revise os dados | `564:1232` |
| Variante | 6. Publique o servico | `564:1357` |

Consultar os seis nodes antes do trabalho visual. A correspondencia com as
etapas e definida pela ordem de `src/content/tutorial/paraiba-digital.ts`.
Esse arquivo prevalece para textos, percentuais, instrucoes, campos e acoes;
o Figma prevalece somente como referencia de composicao e apresentacao. Nao
criar seis rotas, duplicar o conteudo no componente ou incorporar copy antiga
do frame. Registrar toda divergencia editorial ou estrutural.

## Fontes e evidencia

- Spec 011, spec 012 e contratos propostos nos planos 007–010.
- README, manual textual, fluxo do produto, arquitetura, constitution e regras
  de IA consultados durante a criacao das specs.
- Mapa Figma, tutorial atual, rota e TutorialParaibaDigitalPage.
- Busca em fontes do dominio `pb.gov.br` e abertura do
  [portal Paraiba Digital](https://paraibadigital.pb.gov.br/) nesta etapa.

A busca identifica a pagina publica do portal; a abertura retornou sem texto
extraivel. Isso nao verifica o acesso administrativo de servidores, caminhos
de cadastro, campos ou publicacao. Usar o endereco publico apenas como
referencia localizada, sem apresenta-lo como URL administrativa confirmada.
Nao foram acessadas contas, solicitadas credenciais ou executadas acoes externas.

Nao houve leitura do PDF do ERS ou consulta direta ao Figma. Nao foram obtidos
manual administrativo verificado, capturas autorizadas ou validacao editorial
do passo a passo. Esses pontos permanecem pendentes no planejamento detalhado.

## Estado atual

- Rota existe com `figmaNodeId: "564:635"`; pagina ainda usa PageHeader e
  PlaceholderCard.
- `src/content/tutorial/paraiba-digital.ts` contem as seis etapas oficiais,
  percentuais, instrucoes, acoes e dados de copia da etapa 4.
- Nao ha tutorial operacional, data de revisao, fontes, assets ou componentes
  de copia integrados.
- Provider/decoder da 007 e copia da 012 ainda precisam ser implementados.
- A 012 foi alinhada com v2/null, false explicito e campos condicionais de
  agendamento; integracao da copia depende de implementacao e testes.
- Specs 013/016 agora existem, embora a nota historica da 011 registre sua
  ausencia no momento de criacao. Rotas/placeholder nao comprovam entrega.
- Nao existe framework de testes configurado atualmente.

## Abordagem tecnica

### 1. Estrutura editorial e verificacao operacional

Evoluir o conteudo existente para objeto tipado com titulo, introducao,
passos ordenados, avisos, fontes, data de revisao e acoes. Cada passo
recebe ID estavel; nao usar titulo como chave, pois a copy pode mudar.

As seis etapas oficiais sao: acessar a plataforma, fazer login, localizar o
cadastro, preencher as informacoes, revisar os dados e publicar o servico.
Preparar/conferir os dados integra a introducao e a etapa 4; resolver duvidas
ou divergencias e orientacao transversal, nao uma setima etapa visual.

Antes de finalizar copy operacional:

1. Conferir ERS e obter manual oficial ou material validado pela GESED para
   perfil responsavel pelo cadastro.
2. Registrar URL/material, data, perfil, variante da interface e responsavel
   pela validacao, sem credenciais ou dados reais de solicitantes.
3. Conferir caminho de acesso, permissoes, nomes de campos e acoes; distinguir
   salvar, enviar para analise e publicar apenas se esses estados existirem.
4. Mapear cada instrucao a evidencia; registrar trechos nao verificados como
   pendentes no documento, sem publicar copy ficticia como definitiva.
5. Validar texto e capturas com a equipe; registrar a data efetiva dessa
   revisao, sem usar automaticamente data de criacao do plan como homologacao.

Se o fluxo administrativo nao estiver publicamente acessivel, usar material
institucional autorizado em vez de tentar navegar por conta externa. O plano
nao exige criar/cadastrar um servico real para verificar instrucoes.

Proposta de contrato:

```ts
type TutorialSource = {
  id: string;
  title: string;
  reference: string;
  checkedAt: string;
  accessContext: string;
};

type TutorialStep = {
  id: string;
  title: string;
  instructions: readonly string[];
  sourceIds: readonly string[];
  localFieldIds?: readonly CartaTransferFieldId[];
  assetId?: string;
};

type TutorialContent = {
  title: string;
  introduction: readonly string[];
  reviewedAt: string;
  sources: readonly TutorialSource[];
  steps: readonly TutorialStep[];
  officialAccess: { label: string; href: string };
};
```

Contrato final pode distinguir referencia de arquivo local e URL; manter campos
de aprovacao/pendencia em documento editorial, sem expor instrucoes internas
de implementacao no fluxo do usuario. Conteudo de producao precisa de fontes,
data e link confirmado, sem string vazia, href `#` ou botao sem destino real.

### 2. Matriz de correspondencia

Criar no implementation-plan matriz: campo local, nome externo verificado,
tela/parte, modo de entrada, diferencas, fonte e data. Cobrir os 17 campos locais
da 007 incluindo nome popular, tipo/sistema, link/exibicao externos condicionais
e orientacoes complementares somente com Sim.

Nao afirmar que todos possuem equivalente externo. Distinguir correspondencia
confirmada, informacao complementar a inserir manualmente e campo sem
equivalente identificado. Se listas exigirem entradas separadas, orientar a
conferir e transferir cada item, sem prometer que colar multiline preenche tudo.

Manter obrigatoriedade do app separada da externa. CSV e material de apoio,
sem alegacao de importacao automatica. Um campo externo extra nao autoriza
coleta ou modelo novo no Simplifica Carta sem revisao de escopo.

### 3. Composicao da pagina

Reutilizar shell e breadcrumb. A pagina apresenta introducao, progresso e uma
unica etapa ativa, com acesso externo, recurso visual, acoes anterior/proxima
e, somente na etapa 4, a regiao de dados para copia e edicao.

Usar `?etapa=1..6` como estado navegavel. Ausencia/valor invalido abre a etapa
1; anterior/proxima atualizam URL, historico e foco no titulo da etapa. A
recarga preserva a etapa, mas nao existe progresso persistido ou bloqueio por
preenchimento. Os seletores de progresso podem abrir qualquer etapa e devem
ter nome acessivel e estado atual anunciado.

Manter fonte editorial independente de dados da sessao: falha do provider ou
ausencia de Carta nao pode impedir a leitura do tutorial. Erros de integracao
de provider precisam ser corrigidos, sem inicializar segunda Carta silenciosamente.

### 4. Contrato com a 012

A 011 controla composicao/editorial; a 012 fornece seletores de transferencia,
campos selecionaveis, botoes e feedback de clipboard. Planejar componente
`CartaCopyFields` ou equivalente com valores derivados da fonte unica da 007.
Nao implementar outro mecanismo de copia dentro de TutorialStep.

Propor regiao unica `Informações para copiar` na etapa 4, com campos
identificados, evitando duplicar campos
editaveis ou botoes de copia do mesmo valor em varias partes. Se o Figma
prescrever campos intercalados, reconciliar agrupamento e identidade da 012
antes do codigo, preservando fonte unica e retorno por campo.

Contrato editorial usa `CartaTransferFieldId` fechado, com nomes dos campos
locais, nao nomes externos inferidos. O seletor da 012 devolve status de valor,
texto de transferencia e ID; UI resolve labels versionadas e estados de copia.

Pendencias a registrar na revisao da 012 antes da implementacao conjunta:

- incluir `atendimento.orientacaoAgendamento` como campo de copia;
- false somente quando resposta explicita no modelo migrado; null nao oferece
  copia de Nao; remover inferencia baseada apenas em existencia de outros dados;
- preservar itens parciais sem inventar classificacao/tipo, conforme 007/009;
- compartilhar definicao de Carta com conteudo, inclusive resposta explicita
  de agendamento e exclusao de IDs/defaults como evidencia de preenchimento.

Este plano nao altera silenciosamente a spec 012. A revisao documental deve
ser tarefa explicita e verificada antes de componentes de transferencia.

### 5. Sessao, estados e navegacao

- Tutorial sem dados: todos os passos disponiveis, aviso da 012 e Preencher
  Carta para `/formulario-carta`; nao inventar valores nem esconder instrucoes.
- Carta parcial: regiao de copia permite somente valores informados, sem gate
  de obrigatoriedade da 008 ou dependencia do CSV.
- Carta preenchida: mesmos passos, valores atuais, Editar informacoes e acesso
  a `/previa`; nenhum estado de aprovado ou publicado.
- Recuperacao invalida/memoria apenas: aviso do provider, dados seguros quando
  houver e instrucoes independentes. Nao acessar storage por conta da pagina.
- Falha de copia: tratamento da 012, com selecao manual e nova tentativa;
  nao trocar para pagina de erro nem impedir tutorial.

Reutilizar links internos da 002 para preservar memoria e historico. Acoes de
ajuda apontam `/ajuda`; nao criar suporte/agendamento aqui. Retornar da edicao
usa valores atuais e invalida confirmacoes de copia de texto alterado na 012.

Abrir link oficial confirmado em nova aba, com aviso acessivel e
`rel="noopener noreferrer"`, por acao explicita. Isso preserva pagina do app,
sem transmitir Carta por query/hash nem chamar servico externo em background.
Nao detectar colagem, leitura, conclusao externa ou publicacao.

### 6. Assets e acessibilidade

Capturas precisam de fonte/data, contexto/perfil, autorizacao e ausencia de
credenciais/dados pessoais. Usar arquivos locais e mapa de assets por ID,
separado da copy; registrar legenda e alternativa textual de cada imagem.
Nao gerar mockup e rotula-lo como captura da plataforma atual.

Nao depender de imagem para localizar acao: texto inclui o caminho verificado
e rotulo relevante. Imagem indisponivel conserva legenda/instrucao. Planejar
tamanho e carregamento sem deslocamento excessivo, preservando legibilidade
em mobile; nao exigir zoom de imagem para compreender instrucao essencial.

Usar unico h1 e titulo de etapa com hierarquia coerente. Ao trocar de etapa,
mover foco programaticamente para seu titulo e anunciar progresso de forma nao
redundante. Copy continua selecionavel e integral, sem ellipsis.

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

## Arquivos provaveis

| Arquivo | Intervencao |
| --- | --- |
| `src/content/tutorial/paraiba-digital.ts` | Evoluir para conteudo tipado com fontes, datas e passos |
| `src/content/tutorial/paraiba-digital.types.ts` | Criar contratos se separar melhorar clareza |
| `src/pages/TutorialParaibaDigitalPage.tsx` | Compor passo a passo, estados e regiao da 012 |
| `src/components/tutorial/TutorialStep.tsx` | Passo com instrucao e asset, se extracao justificada |
| `src/components/tutorial/TutorialProgress.tsx` | Progresso e selecao acessivel da etapa ativa |
| `src/assets/tutorial-paraiba-digital/` | Capturas/assets autorizados identificados |
| Componentes/seletores de copia da 012 | Integracao, sem mecanismo duplicado |
| `src/app/routes.tsx` | Manter `564:635` como frame principal da rota |
| Estilos/tokens existentes | Composicao, texto longo, imagens e estados confirmados |
| `docs/design-system/mapa-figma-telas.md` | Registrar frame confirmado no plano detalhado |

Breadcrumb/links/foco podem exigir integracao minima se ainda ausentes na 002.
Nao alterar provider/storage ou motor de validacao para renderizar tutorial.
Inventario de assets e estrutura concreta da 012 ficam definidos no plano
detalhado; nenhum asset ou tela externa foi obtido nesta etapa.

## Referencias visuais e pendencias

Consultar detalhadamente os seis frames ja identificados no Figma Design
`YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, via MCP; nao usar `575:483`, entrada
da 003, como layout do tutorial. Consultar tambem o Figma Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.

Registrar composicao, passos, regiao de copia, assets, estados e responsividade
no implementation-plan. Consulta Figma orienta apresentacao, sem validar fluxo
administrativo atual. Fonte operacional, matriz de correspondencia, link de
acesso administrativo, copy, data efetiva e revisao da 012 permanecem pendentes.

## Estrategia de verificacao

Esta etapa altera somente documentacao. Conferir RF01–RF07/CA01–CA17,
limites de fonte externa e responsabilidades 011/012. Nao houve teste de
interface, acesso administrativo, clipboard ou build.

Na implementacao, reutilizar testes de 007/012 e adicionar apenas verificacoes
significativas da composicao: instrucoes permanecem sem Carta, falha de estado
de copia nao remove tutorial, destinos funcionam, fonte/data sao apresentadas
e mudanca da Carta atualiza regiao de transferencia.

Verificar conteudo por checklist editorial: cada passo operacional com fonte,
perfil e data, nomes externos corretos, sem confundir salvar/publicar, matriz
completa, contatos/links confirmados e capturas autorizadas. Nao usar teste
que apenas conte cards como prova de tutorial correto.

| Criterios | Evidencia futura |
| --- | --- |
| CA01/CA05–CA07 | Entradas, instrucoes independentes, estado vazio/parcial e retorno de edicao |
| CA02–CA04/CA08 | Cobertura e validacao operacional por fonte/perfil, sem equivalencia inventada |
| CA09–CA10 | Revisao da 012 e integracao real de valores/copia |
| CA11 | URL de acesso verificada e nova aba sem valores da Carta |
| CA12 | Assets autorizados, alternativas textuais e imagem indisponivel |
| CA13–CA14 | Teclado/leitor de tela, progresso, foco, texto longo e imagens responsivas |
| CA15–CA16 | Ajuda para divergencias, arquitetura, copy e consultas visuais |
| CA17 | Sistemas/modalidades e campos ativos conforme 007; valores externos inativos preservados sem transferencia; links relacionados apenas para anchors visiveis da 012, inclusive troca/restauracao/recarga |

Executar typecheck/build e suite configurada apos implementar. Validar Chrome,
Edge, Firefox e Safari conforme matriz da 016; larguras 1440, 1024, 768, 390 e
320 px, zoom/reflow e imagem/clipboard indisponiveis. Testes de tutorial nao
devem criar cadastro real, enviar mensagens ou usar credenciais externas.
Sem fonte operacional validada, CA02–CA04/CA08 nao podem ser declarados aceitos.

## Riscos e mitigacoes

- Fonte publica confundida com admin: registrar evidencia e link por perfil,
  sem publicar caminho inferido.
- Tutorial desatualizado: fonte/data versionadas e revisao editorial do fluxo.
- Copia com modelo legado: migracao da 007 e revisao explicita da 012.
- Dependencia circular 011/012: contrato de composicao e propriedade de copia
  definidos em conjunto, com instrucoes independentes do estado de dados.
- Imagem como unica instrucao: texto completo e alternativas por asset.
- Dados externos expostos: capturas demonstrativas autorizadas e nenhuma
  transferencia automatica da Carta ou credenciais.
- Placeholder parecer pronto: pendencias e evidencias separadas de estruturas
  tecnicas ou numero de passos renderizados.

## Proximo passo

Executar `/spec:tarefas 011-tutorial-paraiba-digital`, incluindo verificacao
operacional, revisao da 012 e consulta Figma. Depois, consolidar evidencia,
copy, composicao e contratos em `/spec:plano-implementacao`, seguido de
`/spec:validar` antes de implementar.

# Spec: O que e a Carta de Servicos

## Objetivo

Especificar a pagina educativa `O que e a Carta de Servicos`, destinada a
explicar o conceito, a finalidade e o papel da Carta de Servicos antes que o
usuario inicie ou consulte as etapas de preparacao para o cadastro.

## Contexto

O Simplifica Carta apoia servidores publicos na organizacao das informacoes
necessarias para cadastrar servicos no Paraiba Digital. Parte desse publico
pode chegar ao produto sem conhecer claramente o que e uma Carta de Servicos,
para que ela serve ou qual e o limite de atuacao do Simplifica Carta.

A pagina deve oferecer essa contextualizacao em linguagem simples. Ela e um
conteudo educativo independente, acessivel pela navegacao e pelo CTA da home,
mas nao constitui uma etapa obrigatoria do fluxo de cadastro.

A funcionalidade deve seguir:

- a visao de produto em `docs/produto/visao-produto.md`;
- o escopo e os limites definidos em `docs/produto/escopo.md`;
- o MVP em `docs/produto/mvp.md`;
- os caminhos definidos em `docs/produto/fluxos.md`;
- as regras de conteudo, acessibilidade e design em
  `docs/processo/constitution.md`;
- o shell de navegacao e footer compartilhado definido pela feature
  `002-home-e-navegacao`.

## Referencias Figma

### Figma Design do prototipo

- Link: [O que e a Carta?](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=365-265&m=dev)
- Arquivo: `YaVUdqYa3boHpvGrxf4ZJ5`
- Frame principal: `365:265` (`O que e a Carta?`)
- Dimensao de referencia desktop: `1440 x 2778 px`

O node `365:265` apresenta, nesta ordem:

1. header institucional compartilhada, com `O que e a Carta?` em estado ativo;
2. breadcrumb `Inicio > O que e a Carta de Servico?`;
3. introducao `Contexto e diretrizes`, com definicao resumida e painel `Por que
   e importante?`;
4. secao `Fundamentos`, em gradiente azul, com dois destaques: `Para o Cidadao`
   e `Para o Orgao Publico`;
5. secao `O que uma Carta de Servico deve informar?`, composta por dez cards;
6. secao `Legislacao Aplicavel`, composta por tres referencias normativas com
   acao `Consultar`;
7. footer institucional compartilhado.

O frame da pagina e a referencia oficial para layout, composicao, hierarquia,
conteudo inicial e posicionamento dos assets. A implementacao deve adaptar a
composicao absoluta do prototipo para o sistema responsivo do projeto, sem
copiar coordenadas ou classes Tailwind retornadas pelo Figma.

### Figma Make do design system

- Arquivo: `dVm7lEZdBFqOiiySWLWUqp`
- Node: `0:1`

Deve orientar tokens, componentes, estados, espacamentos e comportamento
responsivo. A fonte principal do projeto e `Inter`, conforme os tokens e as
decisoes de design system vigentes.

### Ajustes de MVP sobre o prototipo

- O prototipo exibe `Material de apoio` na header e itens de materiais no
  footer. A header nao deve incluir essa entrada nesta etapa, conforme a feature
  `002-home-e-navegacao`, porque a area completa esta fora do MVP.
- `Duvidas frequentes` deve usar o destino editorial definido pela feature 002,
  sem criar uma FAQ nova nesta feature.
- `Preciso de ajuda` deve direcionar para `/ajuda`.
- O texto e os links da secao de legislacao devem passar por validacao
  editorial antes da implementacao. O Figma e referencia visual e de conteudo
  inicial, nao fonte juridica definitiva.
- O footer deve reutilizar o componente compartilhado. Esta feature nao deve
  duplicar sua estrutura nem reintroduzir links excluidos do MVP.

## Usuarios impactados

- Servidor que ainda nao conhece o conceito ou a finalidade de uma Carta de
  Servicos.
- Servidor que precisa alinhar o entendimento antes de levantar informacoes.
- Servidor que deseja consultar somente o conteudo conceitual, sem iniciar o
  fluxo completo.
- Equipe GESED, que precisa disponibilizar uma explicacao clara, consistente e
  atualizavel sobre o tema.

## Problema

Sem uma explicacao introdutoria, o usuario pode iniciar o levantamento sem
compreender o objetivo da Carta de Servicos, confundir o material de preparacao
com a publicacao oficial ou esperar que o Simplifica Carta publique os dados
diretamente no Paraiba Digital.

Isso pode provocar preenchimento inadequado, expectativas incorretas sobre o
produto e dificuldade para escolher o proximo passo da jornada.

## Requisitos funcionais

### Rota e entradas

- Disponibilizar a pagina na rota `/o-que-e-carta-de-servicos`.
- Permitir acesso pelo CTA educativo da home.
- Permitir acesso pelo item correspondente da navegacao compartilhada.
- Permitir acesso direto pela URL, inclusive apos recarregar a pagina.
- Exibir breadcrumb com retorno para a home.
- Manter header e footer consistentes com a feature `002-home-e-navegacao`.
- Identificar semanticamente o item atual da navegacao quando a pagina estiver
  aberta.

### Apresentacao da pagina

- Exibir o titulo `O que e a Carta de Servicos`.
- Apresentar uma introducao curta que permita ao usuario compreender a
  finalidade da pagina antes de ler o conteudo detalhado.
- Organizar o conteudo em secoes curtas, com hierarquia clara de titulos.
- Usar paragrafos, listas ou destaques somente quando ajudarem a leitura e a
  compreensao.
- Evitar transformar a pagina em formulario, diagnostico ou tutorial de
  publicacao.
- Reproduzir a ordem das secoes do node `365:265`.

### Conteudo educativo minimo

O texto final deve ser aprovado e versionado. A pagina deve contemplar as
secoes observadas no frame oficial.

#### Contexto e diretrizes

- Exibir a chamada `CONTEXTO E DIRETRIZES`.
- Exibir o titulo `O que e uma Carta de Servico?`, com destaque visual em
  `Carta de Servico`.
- Apresentar uma definicao curta em linguagem simples, explicando que o
  documento informa o que e o servico publico, como acessa-lo, o que levar,
  quanto tempo demora e quanto custa.
- Exibir o painel `Por que e importante?` com tres perspectivas:
  - `Para o cidadao`: preparacao e previsibilidade antes de buscar o servico;
  - `Para o orgao`: transparencia, reducao de duvidas e melhoria do atendimento;
  - `Para a gestao`: monitoramento e melhoria continua dos servicos.

#### Fundamentos

- Exibir o titulo `Fundamentos` em uma secao de destaque com gradiente azul.
- Apresentar a Carta de Servico ao Cidadao como documento informativo sobre os
  servicos prestados, formas de acesso e compromissos de qualidade.
- Exibir dois cards ou paineis de destaque:
  - `Para o Cidadao`, com beneficio de transparencia, previsibilidade e economia
    de tempo;
  - `Para o Orgao Publico`, com beneficio de padronizacao, reducao de demandas
    incompletas e fortalecimento da confianca.
- A afirmacao de obrigatoriedade observada no prototipo deve ser validada com
  fonte oficial antes de integrar o texto final.

#### O que uma Carta de Servico deve informar

- Exibir o titulo `O que uma Carta de Servico deve informar?`.
- Exibir a orientacao `Cada um desses campos deve ser preenchido de forma
  objetiva.`.
- Apresentar exatamente dez cards informativos, nesta ordem de leitura:
  1. `Nome do servico` — identificacao direta e objetiva do servico;
  2. `O que e` — descricao simplificada do servico oferecido;
  3. `Quem pode utilizar` — publico com direito ou necessidade de uso;
  4. `Documentos necessarios` — o que o cidadao precisa apresentar;
  5. `Etapas` — passos do inicio ao fim do servico;
  6. `Prazo` — tempo estimado para conclusao;
  7. `Custos` — valores, taxas ou gratuidade;
  8. `Canais de atendimento` — formas de acessar o servico;
  9. `Agendamento` — se e necessario agendar e como;
  10. `Informacoes adicionais` — outras orientacoes relevantes.
- Cada card deve possuir icone, titulo e descricao, sem depender somente do
  icone ou da cor para comunicar sua finalidade.
- A secao e conceitual e nao substitui a lista detalhada da feature
  `006-organizar-informacoes` nem o formulario da feature 007.

#### Legislacao aplicavel

- Exibir o titulo `Legislacao Aplicavel` e o subtitulo sobre normas federais e
  diretrizes de governanca.
- Apresentar tres referencias, conforme o frame:
  - Lei Federal nº 13.460/2017;
  - Decreto Federal nº 9.094/2017;
  - Decreto Federal nº 9.756/2019.
- Cada referencia deve exibir tipo, numero, ano, resumo e acao `Consultar`.
- A acao deve abrir a fonte oficial em nova aba e informar essa mudanca de
  contexto de forma acessivel.
- Ao usar `target="_blank"`, aplicar `rel="noopener noreferrer"`.
- Numero, vigencia, resumo e URL de cada norma devem ser confirmados em fonte
  oficial antes da implementacao; divergencias devem ser resolvidas com a
  equipe responsavel, sem alterar silenciosamente o conteudo aprovado.

### Conteudo versionado

- Manter titulo, introducao, secoes, destaques e chamadas para acao em arquivo
  de conteudo versionado em `src/content/pages/`.
- Separar a estrutura editorial da apresentacao visual.
- Evitar textos editoriais extensos fixos diretamente no componente da pagina.
- Permitir atualizacao do conteudo sem alterar a logica de navegacao.
- Tratar qualquer copy provisoria do prototipo como referencia, nao como
  substituto do texto aprovado.

## Requisitos nao funcionais

- A pagina deve funcionar em computador, tablet e smartphone.
- O conteudo deve permanecer legivel sem corte, sobreposicao ou scroll
  horizontal.
- A tipografia deve usar `Inter` como fonte principal do projeto, com fallbacks
  definidos nos tokens globais.
- A largura das linhas, espacamento e contraste devem favorecer a leitura de
  conteudo editorial.
- A hierarquia de titulos deve ser semantica e nao pular niveis sem
  justificativa.
- Links e botoes devem ser acessiveis por teclado e possuir foco visivel.
- As acoes devem possuir rotulos claros e nomes acessiveis coerentes com seus
  destinos.
- Informacao nao pode depender apenas de cor, icone ou posicionamento visual.
- Imagens meramente decorativas, caso aprovadas no layout, devem ser ignoradas
  por leitores de tela; imagens informativas devem possuir alternativa textual
  adequada.
- A pagina deve carregar sem backend e sem requisitar dados da Carta.
- A pagina nao deve persistir dados ou progresso do usuario.
- Os icones visiveis do Figma devem usar os assets oficiais exportados; nao
  recriar manualmente os SVGs.

## Comportamento responsivo esperado

- Desktop: introducao em duas colunas, dois paineis em `Fundamentos`, grade de
  tres colunas para os cards informativos e linhas horizontais para legislacao.
- Tablet: secoes e eventuais destaques devem reorganizar-se sem comprometer a
  ordem de leitura; as grades podem usar duas ou uma coluna conforme o espaco.
- Smartphone: conteudo, paineis, cards e referencias legais em coluna unica,
  com espacamento adequado e acoes com area de toque suficiente.
- Header e footer devem seguir o comportamento responsivo compartilhado da
  feature 002.
- A ordem visual deve permanecer igual a ordem do DOM em todos os tamanhos.

O comportamento responsivo deve preservar a hierarquia do frame, mas nao suas
coordenadas absolutas.

## Fora de escopo

- Implementar o diagnostico de servico publico.
- Implementar a lista detalhada para organizacao das informacoes.
- Implementar formulario, validacoes, previa, exportacao ou copia de dados.
- Implementar o tutorial completo do Paraiba Digital.
- Publicar ou integrar automaticamente com o Paraiba Digital.
- Criar autenticacao, perfil, historico ou salvamento permanente.
- Controlar progresso ou conclusao desta leitura.
- Criar uma base juridica ou normativa alem das tres referencias do frame.
- Implementar FAQ completa ou area de materiais de apoio.
- Produzir ou aprovar o texto institucional final sem validacao da equipe
  responsavel.

## Decisoes de escopo

- A pagina e educativa e independente; nao e a primeira etapa obrigatoria do
  fluxo de cadastro.
- A leitura da pagina nao condiciona o acesso a `/diagnostico`,
  `/explorar-por-etapas` ou qualquer etapa posterior.
- O diagnostico responde se uma atividade caracteriza um servico publico; esta
  pagina explica o conceito e a finalidade da Carta de Servicos. As duas
  responsabilidades nao devem ser misturadas.
- A pagina orienta a preparacao das informacoes, mas nao representa nem executa
  a publicacao oficial.
- O texto editorial final precisa de aprovacao e versionamento antes da
  implementacao definitiva.
- O node `365:265` e a referencia visual oficial desta feature.
- A pagina nao adiciona CTAs finais para `/diagnostico` ou
  `/explorar-por-etapas`, pois essas acoes nao fazem parte do frame oficial; os
  caminhos continuam disponiveis pela navegacao compartilhada e pela home.

## Dependencias

- Fundacao tecnica criada em `001-fundacao-do-projeto`.
- Home, CTA de entrada e shell compartilhado definidos em
  `002-home-e-navegacao`.
- Rota `/o-que-e-carta-de-servicos` ja registrada em `src/app/routes.tsx` e
  associada a esta spec.
- Pagina placeholder existente em `src/pages/OQueECartaPage.tsx`.
- Rota `/diagnostico`, relacionada a `005-diagnostico-servico-publico`.
- Rota `/explorar-por-etapas`, relacionada a `003-explorar-por-etapas`.
- Tokens e componentes base em `src/styles/` e `src/components/`.
- Fonte principal `Inter` definida nos tokens globais do projeto.
- Texto institucional final a validar com a equipe responsavel.
- Figma Design node `365:265` consultado via MCP.
- Assets do frame a exportar pelo Figma antes da implementacao visual.
- Referencias normativas e respectivos links a validar em fontes oficiais.

## Criterios de aceite

- `specs/004-o-que-e-carta-servico/spec.md` existe e documenta objetivo,
  usuarios, requisitos, limites, dependencias e criterios de aceite.
- A pagina fica disponivel em `/o-que-e-carta-de-servicos`.
- A pagina pode ser acessada pela home, pela navegacao compartilhada e por URL
  direta.
- A pagina explica, com conteudo aprovado, o que e a Carta de Servicos e para
  que ela serve.
- A composicao segue o node Figma `365:265`, com os ajustes de MVP documentados.
- A pagina apresenta o painel `Por que e importante?` com as tres perspectivas
  do frame.
- A pagina apresenta a secao `Fundamentos` e seus dois destaques.
- A pagina apresenta exatamente dez cards sobre as informacoes da Carta, sem
  reproduzir o formulario completo.
- A pagina apresenta as tres referencias da secao `Legislacao Aplicavel`, cada
  uma com uma acao acessivel para consultar a fonte oficial.
- A pagina nao exige conclusao, nao controla progresso e nao altera dados da
  Carta.
- O conteudo editorial fica versionado fora do componente visual.
- A hierarquia de titulos e a ordem de leitura sao semanticas.
- A navegacao funciona por teclado e possui foco visivel.
- A pagina funciona em desktop, tablet e smartphone sem sobreposicao ou scroll
  horizontal.
- A fonte principal renderizada e `Inter`, com fallback seguro.
- A pagina nao depende de backend.
- A pagina nao sugere publicacao automatica ou integracao direta com o Paraiba
  Digital.
- `Material de apoio` nao e introduzido na header por esta feature.
- Os assets visiveis correspondem aos assets oficiais do Figma.

## Proximos passos recomendados

Depois desta spec, executar:

```txt
/spec:planejar 004-o-que-e-carta-servico
```

Em seguida:

```txt
/spec:tarefas 004-o-que-e-carta-servico
```

Como a funcionalidade envolve uma pagina visual, antes de implementar tambem
deve ser criado:

```txt
/spec:plano-implementacao 004-o-que-e-carta-servico
```

O planejamento deve detalhar a adaptacao responsiva do node `365:265`, o reuso
do shell compartilhado e a validacao editorial das referencias normativas.

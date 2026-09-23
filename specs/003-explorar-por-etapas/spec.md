# Spec: Explorar por Etapas

## Objetivo

Especificar a pagina `Explorar por etapas`, que permite ao usuario acessar
diretamente uma etapa do processo de cadastro da Carta de Servicos sem precisar
percorrer o fluxo completo.

## Contexto

A home oferece dois caminhos distintos:

- `Iniciar o guia`, que inicia o fluxo completo em `/diagnostico`;
- `Explorar por etapas`, que abre `/explorar-por-etapas` para escolha livre de
  uma etapa.

Esta funcionalidade corresponde ao segundo caminho. Ela nao substitui as telas
de diagnostico, organizacao, formulario ou tutorial. Sua responsabilidade e
apresentar essas entradas de forma clara e encaminhar o usuario ao destino
selecionado.

A funcionalidade deve seguir:

- o MVP em `docs/produto/mvp.md`;
- os caminhos definidos em `docs/produto/fluxos.md`;
- as regras de design em `docs/processo/constitution.md`;
- o mapa atualizado em `docs/design-system/mapa-figma-telas.md`;
- o Figma Design do prototipo para layout, composicao e hierarquia;
- o Figma Make para tokens, componentes e estados visuais;
- o shell de navegacao e footer compartilhado definido pela feature
  `002-home-e-navegacao`.

## Referencias Figma

### Figma Design do prototipo

- Link: [Explorar por etapas](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=575-483&m=dev)
- Arquivo: `YaVUdqYa3boHpvGrxf4ZJ5`
- Pagina raiz atual: `167:2` (`Prototipo`)
- Frame principal: `575:483` (`explorar-por-etapas-v2`)

O node `575:483` apresenta:

- header institucional compartilhada;
- breadcrumb `Inicio > Explorar por etapas`;
- hero em gradiente com titulo e texto introdutor;
- quatro cards de etapa organizados em grade;
- icone, identificador da etapa, titulo, descricao e botao em cada card;
- CTA inferior para iniciar o fluxo completo;
- footer institucional compartilhado.

### Figma Make do design system

- Arquivo: `dVm7lEZdBFqOiiySWLWUqp`
- Node: `0:1`

Deve orientar tokens, tipografia, cores, cards, badges, botoes, estados,
navegacao e comportamento responsivo.

### Ajustes de MVP sobre o prototipo

- O prototipo mostra `Materiais de apoio` na header e `Guia de Linguagem
  Simples` no footer. Essas entradas nao devem ser expostas nesta etapa porque a
  area completa de materiais de apoio esta fora do MVP.
- O card `Tutorial de publicacao` representa orientacao para cadastro manual no
  Paraiba Digital. Ele nao deve sugerir publicacao automatica ou integracao
  direta com a plataforma.
- Os textos finais serao mantidos em arquivos de conteudo versionado. A copy do
  Figma funciona como referencia estrutural ate a inclusao dos textos aprovados
  no projeto.

## Usuarios impactados

- Servidor que ja conhece o processo e precisa consultar apenas uma etapa.
- Servidor que interrompeu a jornada e deseja retomar por um ponto especifico.
- Servidor responsavel somente por uma parte do levantamento ou do cadastro.
- Equipe GESED, que precisa oferecer acesso rapido sem obrigar o preenchimento
  de todo o fluxo.

## Problema

Nem todo usuario precisa percorrer o fluxo completo. Alguns ja sabem qual etapa
necessitam consultar ou sao responsaveis apenas por uma parte do processo.

Sem uma pagina de acesso independente, esses usuarios precisariam iniciar o
diagnostico e atravessar etapas anteriores para chegar ao conteudo desejado, o
que aumenta tempo, friccao e possibilidade de abandono.

## Requisitos funcionais

### Rota e entrada

- Disponibilizar a pagina na rota `/explorar-por-etapas`.
- Permitir acesso pelo botao `Explorar por etapas` da home.
- Permitir acesso direto pela URL, inclusive apos recarregar a pagina.
- Exibir breadcrumb com retorno para a home.
- Manter header e footer consistentes com a feature `002-home-e-navegacao`.

### Apresentacao da pagina

- Exibir o titulo `Explorar por etapas`.
- Explicar que o usuario pode acessar uma parte do manual sem seguir o fluxo
  completo.
- Apresentar quatro etapas distintas, na ordem do processo de cadastro.
- Cada etapa deve exibir:
  - numero ou identificador sequencial;
  - icone visual;
  - titulo;
  - descricao breve;
  - botao com rotulo especifico;
  - destino navegavel.
- Os cards devem manter diferenciacao visual por cor sem depender apenas da cor
  para comunicar numero, titulo ou finalidade.

### Etapa 1 — Identificar um servico

- Apresentar o diagnostico como forma de verificar se a atividade caracteriza
  um servico publico.
- Exibir a acao `Iniciar diagnostico`.
- Direcionar para `/diagnostico`.

### Etapa 2 — Organizar informacoes

- Apresentar a reuniao previa de informacoes e documentos necessarios.
- Exibir a acao `Ver lista de informacoes`.
- Direcionar para `/organizar-informacoes`.

### Etapa 3 — Elaborar a Carta

- Apresentar a elaboracao, revisao, visualizacao e preparacao dos dados da Carta.
- Exibir a acao `Elaborar e conferir`.
- Direcionar para `/formulario-carta`.
- Nao implementar formulario, validacao, previa ou exportacao dentro desta
  pagina; essas capacidades pertencem as respectivas features.

### Etapa 4 — Tutorial de publicacao

- Apresentar o tutorial para cadastro manual na plataforma oficial do Estado da
  Paraiba.
- Exibir a acao `Ver tutorial`.
- Direcionar para `/tutorial-paraiba-digital`.
- Informar de forma coerente que a publicacao final ocorre manualmente no
  Paraiba Digital.

### Acesso independente

- Permitir a escolha de qualquer etapa sem exigir conclusao das anteriores.
- Nao bloquear os botoes com base em progresso, respostas ou dados preenchidos.
- Nao marcar etapas como concluidas nesta funcionalidade.
- Nao criar progresso paralelo ao fluxo completo.
- Nao alterar, limpar ou persistir dados da Carta ao abrir esta pagina.

### CTA para o fluxo completo

- Exibir, depois dos cards, uma chamada para quem prefere seguir o processo de
  forma linear.
- Exibir a acao `Ir para o guia passo a passo`.
- Direcionar para `/diagnostico`, primeira etapa do fluxo completo.
- Diferenciar visual e semanticamente esse CTA dos quatro acessos independentes.

### Conteudo versionado

- Manter titulo, introducao, cards, rotulos de botoes e CTA em arquivo de
  conteudo versionado quando os textos finais forem adicionados ao projeto.
- Manter destinos e identificadores tipados para reduzir divergencias entre
  conteudo e rotas.
- Evitar textos editoriais fixos diretamente nos componentes visuais.
- Tratar os textos observados no Figma como referencia inicial, nao como
  substituto dos textos finais aprovados.

## Requisitos nao funcionais

- A pagina deve funcionar em computador, tablet e smartphone.
- A grade deve adaptar-se sem corte, sobreposicao ou scroll horizontal.
- A ordem visual e a ordem de leitura devem permanecer coerentes: etapas 1, 2,
  3 e 4.
- Todos os links e botoes devem ser acessiveis por teclado e possuir foco
  visivel.
- Os controles devem possuir nomes acessiveis que indiquem claramente o destino.
- Icones decorativos devem ser ignorados por leitores de tela; informacao nao
  pode depender apenas de icones.
- Cores dos cards e estados interativos devem possuir contraste adequado e
  seguir os tokens confirmados no Figma Make.
- O layout deve preservar a hierarquia do Figma sem copiar coordenadas
  absolutas ou classes Tailwind retornadas pelo MCP.
- Icones extraidos do Figma devem usar os assets reais exportados, sem SVGs
  recriados manualmente.
- A pagina deve carregar sem backend e sem requisitar dados da Carta.

## Comportamento responsivo esperado

- Desktop: quatro cards em uma grade de duas colunas, conforme o frame.
- Tablet: uma ou duas colunas conforme a largura disponivel, mantendo cards
  legiveis e botoes alinhados.
- Smartphone: cards em coluna unica e botoes com area de toque adequada.
- Header e footer devem seguir o comportamento responsivo compartilhado da
  feature 002.
- O CTA do fluxo completo deve permanecer visivel e legivel em todos os
  tamanhos.

## Fora de escopo

- Implementar a logica do diagnostico.
- Implementar a lista completa de organizacao das informacoes.
- Implementar formulario, validacao de linguagem simples, previa ou exportacao.
- Implementar o tutorial do Paraiba Digital.
- Controlar conclusao ou progresso das etapas.
- Salvar preferencias ou historico de navegacao.
- Exigir autenticacao.
- Publicar automaticamente no Paraiba Digital.
- Implementar materiais de apoio, busca avancada ou FAQ completa.
- Alterar os textos finais das paginas de destino.

## Decisoes de escopo

- A pagina e um indice navegavel das etapas, nao um stepper de progresso.
- A selecao de uma etapa e livre e nao depende de dados anteriores.
- `Ir para o guia passo a passo` e `Iniciar diagnostico` podem apontar para a
  mesma rota, mas comunicam intencoes diferentes:
  - o primeiro inicia o fluxo completo;
  - o segundo abre apenas a etapa de diagnostico escolhida livremente.
- A pagina `O que e a Carta de Servicos` permanece um conteudo educativo
  independente e nao integra os quatro cards do cadastro.
- As funcionalidades internas de cada destino permanecem nas specs 005, 006,
  007 e 011.

## Dependencias

- Fundacao tecnica criada em `001-fundacao-do-projeto`.
- Home e shell compartilhado definidos em `002-home-e-navegacao`.
- Rota `/explorar-por-etapas` registrada no planejamento do projeto.
- Rotas de destino existentes ou planejadas:
  - `/diagnostico` — spec `005-diagnostico-servico-publico`;
  - `/organizar-informacoes` — spec `006-organizar-informacoes`;
  - `/formulario-carta` — spec `007-formulario-carta-servico`;
  - `/tutorial-paraiba-digital` — spec `011-tutorial-paraiba-digital`.
- Tokens e componentes base em `src/styles/` e `src/components/`.
- Figma Design node `575:483` consultado via MCP.
- Figma Make `0:1` a consultar novamente antes de implementar estilos finais.
- Textos finais versionados a adicionar posteriormente, antes da implementacao
  definitiva do conteudo editorial.

## Criterios de aceite

- `specs/003-explorar-por-etapas/spec.md` existe e documenta objetivo, usuarios,
  requisitos, limites, dependencias e criterios de aceite.
- A pagina fica disponivel em `/explorar-por-etapas`.
- A composicao segue o node Figma `575:483`.
- A pagina explica que as etapas podem ser acessadas sem seguir o fluxo completo.
- Exibe exatamente quatro cards, na ordem definida.
- Cada card possui identificador, titulo, descricao, acao e destino coerentes.
- `Iniciar diagnostico` direciona para `/diagnostico`.
- `Ver lista de informacoes` direciona para `/organizar-informacoes`.
- `Elaborar e conferir` direciona para `/formulario-carta`.
- `Ver tutorial` direciona para `/tutorial-paraiba-digital`.
- `Ir para o guia passo a passo` direciona para `/diagnostico`.
- Nenhuma etapa exige conclusao das etapas anteriores.
- A pagina nao cria nem altera progresso ou dados da Carta.
- `Materiais de apoio` nao e introduzido na header por esta feature.
- A pagina funciona em desktop, tablet e smartphone sem sobreposicao ou scroll
  horizontal.
- A ordem de leitura e de foco segue as etapas 1 a 4.
- A navegacao funciona por teclado e possui foco visivel.
- A pagina nao depende de backend.
- A funcionalidade nao sugere publicacao automatica no Paraiba Digital.
- O conteudo fica preparado para receber os textos finais versionados.

## Proximos passos recomendados

Depois desta spec, executar:

```txt
/spec:planejar 003-explorar-por-etapas
```

Em seguida:

```txt
/spec:tarefas 003-explorar-por-etapas
```

Como a funcionalidade envolve uma pagina visual, antes de implementar tambem
deve ser criado:

```txt
/spec:plano-implementacao 003-explorar-por-etapas
```

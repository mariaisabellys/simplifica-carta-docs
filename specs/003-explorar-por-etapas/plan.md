# Plan: Explorar por Etapas

## Objetivo tecnico

Criar a pagina responsiva `/explorar-por-etapas` como um indice navegavel das
quatro etapas do cadastro da Carta de Servicos. A pagina deve reutilizar o shell
compartilhado da aplicacao, apresentar conteudo versionado e encaminhar o
usuario aos destinos existentes sem controlar progresso, exigir dados prévios
ou depender de backend.

Este documento define a abordagem tecnica. Codigo e estilos finais so devem ser
alterados em `/spec:implementar`, depois da criacao de `tasks.md`, do
`implementation-plan.md` e da validacao documental desta spec.

## Fontes consultadas

- `specs/003-explorar-por-etapas/spec.md`;
- `specs/README.md`;
- `docs/processo/constitution.md`;
- `docs/produto/mvp.md`;
- `docs/produto/fluxos.md`;
- `docs/design-system/mapa-figma-telas.md`;
- `docs/design-system/tokens-e-componentes.md`;
- `docs/implementation-plan.md`;
- planos da feature `002-home-e-navegacao`;
- estrutura atual de rotas, shell, paginas, conteudo e estilos em `src/`;
- Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, node `575:483`, conforme a spec e o
  mapa local de telas;
- Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, conforme a documentacao
  local do design system.

A consulta detalhada dos nodes do Figma, incluindo medidas, tokens, estados e
assets, deve ser refeita via MCP em `/spec:plano-implementacao`. O plano nao
deve cristalizar valores visuais antes dessa confirmacao.

## Estado atual e pre-condicoes

- A aplicacao usa React, TypeScript e CSS global com tokens.
- O roteamento atual e interno e baseado em `window.history`, `findRoute` e uma
  tabela em `src/app/routes.tsx`; nao ha React Router.
- A rota `/explorar-por-etapas` e sua pagina ainda nao existem.
- As quatro rotas de destino ja constam da tabela de rotas, ainda que suas
  paginas possam permanecer incompletas ate as respectivas specs.
- A feature `002-home-e-navegacao` planeja substituir o shell atual por header,
  navegacao, footer, conteudo e restauracao de foco compartilhados.
- A implementacao da 003 deve partir do resultado real da 002, se ja estiver
  disponivel, e nao duplicar o shell dentro da nova pagina.

Caso a 003 seja implementada antes da 002, devem ser feitas apenas as mudancas
minimas de integracao necessarias para registrar e acessar a rota. A pagina deve
continuar compativel com a posterior evolucao do shell, sem incorporar header
ou footer proprios.

## Leitura tecnica da tela

O frame `575:483` organiza a pagina nestas regioes, nesta ordem:

1. header institucional compartilhada;
2. breadcrumb `Inicio > Explorar por etapas`;
3. hero em gradiente com titulo e texto introdutor;
4. grade com quatro cards de etapa;
5. CTA destacado para iniciar o guia passo a passo;
6. footer institucional compartilhado.

Cada card combina identificador sequencial, icone, titulo, descricao e um link
de acao. A diferenciacao cromatica auxilia a leitura, mas numero, texto e
rotulo do link devem tornar cada etapa compreensivel sem depender de cor ou
icone.

O header e o footer pertencem ao `AppShell`. A pagina deve renderizar somente o
breadcrumb, o hero, a grade de etapas e o CTA final.

## Abordagem

### 1. Registrar a pagina no roteamento existente

Criar `ExplorarPorEtapasPage` e registrar `/explorar-por-etapas` na tabela de
rotas com:

- `figmaNodeId: "575:483"`;
- `specId: "003-explorar-por-etapas"`;
- `layoutType: "page"` ou o valor consolidado pela feature 002;
- ausencia de exposicao automatica na navegacao principal.

O acesso deve funcionar pela home, por link interno, por recarga e por URL
direta. A pagina nao deve introduzir um roteador paralelo. Links internos devem
usar o contrato de navegacao compartilhado definido pela feature 002, mantendo
`href` real para navegacao progressivamente aprimorada.

### 2. Manter conteudo e destinos em uma fonte tipada

Criar `src/content/pages/explorar-por-etapas.ts` para concentrar:

- breadcrumb;
- titulo e introducao;
- as quatro etapas na ordem oficial;
- rotulos e destinos das acoes;
- texto e acao do CTA final.

O JSX nao deve repetir textos editoriais nem decidir destinos por indice. Os
identificadores e destinos devem ser tipados de forma fechada, evitando que um
card seja associado acidentalmente a uma rota incorreta.

Estrutura de dados proposta:

```ts
type ExploreStepId =
  | "identificar-servico"
  | "organizar-informacoes"
  | "elaborar-carta"
  | "tutorial-publicacao";

type ExploreStepTone = "cyan" | "orange" | "purple" | "green";

type ExploreStep = {
  id: ExploreStepId;
  number: 1 | 2 | 3 | 4;
  icon: string;
  title: string;
  description: string;
  actionLabel: string;
  href:
    | "/diagnostico"
    | "/organizar-informacoes"
    | "/formulario-carta"
    | "/tutorial-paraiba-digital";
  tone: ExploreStepTone;
};

type ExplorePageContent = {
  breadcrumb: ReadonlyArray<{ label: string; href?: "/" }>;
  title: string;
  introduction: string;
  steps: readonly ExploreStep[];
  guideCta: {
    title: string;
    description: string;
    actionLabel: string;
    href: "/diagnostico";
  };
};
```

O campo `icon` deve apontar para um identificador ou asset conhecido, nao para
markup SVG escrito no arquivo de conteudo. A forma final do contrato sera
confirmada no `implementation-plan.md` apos o inventario dos assets.

### 3. Compor a pagina com semantica simples

A pagina deve conter exatamente um `h1`. As etapas devem ser uma lista ordenada
ou uma secao com lista semanticamente equivalente, preservando a ordem 1 a 4 no
DOM em todos os breakpoints.

Componentes provaveis:

- `Breadcrumb`, reutilizavel por outras paginas internas;
- `ExploreStepCard`, responsavel pela apresentacao de uma etapa;
- `ButtonLink`, reaproveitado para as acoes dos cards e do CTA;
- `ExploreGuideCta`, mantido dentro da pagina se nao houver reuso real.

O plano de implementacao deve verificar primeiro os componentes criados pela
feature 002. Nao criar uma segunda implementacao de breadcrumb, link de acao,
container, header ou footer se um contrato compartilhado ja atender ao caso.

Os cards sao acessos independentes, nao um stepper. Portanto, nao devem ter
estado de concluido, atual, bloqueado ou futuro, nem receber props relacionadas
a progresso.

### 4. Tratar navegacao e acessibilidade

Cada acao deve ser um link, pois muda a localizacao da aplicacao. O nome
acessivel pode ser o proprio rotulo visivel, desde que seja suficientemente
claro no contexto do card. Nao usar `button` com manipulador de clique para
simular navegacao.

O breadcrumb deve usar `nav` com rotulo acessivel e indicar a pagina atual com
`aria-current="page"`. Icones decorativos devem usar `aria-hidden="true"` e nao
podem carregar informacao exclusiva.

A integracao com o shell deve preservar:

- navegacao por teclado;
- foco visivel;
- restauracao de foco no `main` ou `h1` apos mudanca de rota;
- funcionamento do botao voltar/avancar do navegador;
- rolagem para o topo ao abrir a pagina;
- links utilizaveis mesmo quando o JavaScript nao intercepta o clique.

### 5. Adaptar o layout sem alterar a ordem do conteudo

- Desktop: grade de duas colunas, com quatro cards em duas linhas;
- tablet: duas colunas quando houver largura util suficiente, migrando para uma
  coluna antes que texto ou acoes fiquem comprimidos;
- smartphone: uma coluna, conteudo sem corte e acoes com area de toque
  adequada;
- todos os tamanhos: hero, cards e CTA limitados por container coerente com o
  shell e sem scroll horizontal a partir de 320 px.

Os cards devem poder crescer com o conteudo. Nao usar altura fixa para forcar
alinhamento. Em grades com duas colunas, pode-se alinhar as acoes ao final com
CSS Grid ou Flexbox, desde que zoom, quebra de texto e traducao futura nao
causem sobreposicao.

### 6. Reconciliar tokens e assets no plano detalhado

O `implementation-plan.md` deve consultar o Figma Design e o Figma Make para:

- mapear gradiente do hero, fundos, bordas, sombras e cores dos quatro cards;
- confirmar tipografia, tamanhos, pesos, espacamentos, raios e largura do
  container;
- documentar estados `hover`, `focus-visible` e `active`;
- identificar os icones reais de cada etapa e qualquer elemento institucional;
- decidir quais elementos visuais sao assets e quais sao geometria simples de
  CSS;
- exportar icones reais durante a implementacao, sem redesenhar SVGs autorais e
  sem manter URLs temporarias do MCP.

Valores confirmados devem ser adicionados a tokens semanticos ou reutilizar os
tokens da feature 002. Variacoes de cor dos cards podem ser expostas por
modificadores ou custom properties, sem espalhar cores literais pelo JSX.

## Arquivos provaveis

### Alterar

- `src/app/routes.tsx`;
- `src/app/App.tsx`, somente se o contrato de navegacao/foco da feature 002
  ainda exigir integracao;
- `src/components/ui/ButtonLink.tsx`, somente se ainda nao aceitar o contrato
  de navegacao e as variantes necessarias;
- `src/styles/tokens.css`;
- `src/styles/globals.css` ou os arquivos de estilo consolidados pela feature
  002.

### Criar

- `src/pages/ExplorarPorEtapasPage.tsx`;
- `src/content/pages/explorar-por-etapas.ts`;
- `src/components/ui/Breadcrumb.tsx`, se nao existir apos a feature 002;
- `src/components/explorar/ExploreStepCard.tsx`, se a extracao reduzir
  duplicacao e concentrar corretamente o contrato do card;
- `src/assets/explorar-por-etapas/`, para assets confirmados e exportados do
  Figma;
- testes da pagina e dos componentes conforme a estrategia definida abaixo.

Nao criar componentes separados para regioes estaticas de uso unico apenas por
correspondencia visual com o Figma. A granularidade final deve favorecer
clareza, teste e reuso real.

## Regras de estado e dados

- Nao ler nem escrever `sessionStorage`, `localStorage` ou estado da Carta.
- Nao consultar backend ou API.
- Nao inferir conclusao a partir da existencia de dados em outras features.
- Nao desabilitar links com base em progresso.
- Nao limpar dados existentes ao entrar ou sair da pagina.
- Nao manter uma etapa selecionada; a navegacao ocorre imediatamente pelo link.

## Estrategia de testes

### Testes automatizados

Se a feature 002 ja tiver configurado Vitest e Testing Library, adicionar testes
para:

- renderizacao do titulo e da introducao;
- existencia de exatamente quatro cards na ordem 1, 2, 3 e 4;
- titulo, rotulo e `href` corretos de cada etapa;
- CTA `Ir para o guia passo a passo` apontando para `/diagnostico`;
- breadcrumb com retorno para `/` e pagina atual indicada;
- navegacao interna usando o contrato do shell;
- ausencia de controles ou indicadores de progresso;
- ausencia de `Materiais de apoio` introduzido pela pagina.

Se o projeto ainda nao possuir infraestrutura de testes, `tasks.md` e
`implementation-plan.md` devem decidir se ela entra nesta feature. A ausencia
de framework nao elimina as verificacoes manuais nem `typecheck` e `build`.

### Verificacoes tecnicas e manuais

- executar `npm run typecheck`;
- executar `npm run build`;
- executar a suite automatizada, quando configurada;
- testar acesso direto e recarga em `/explorar-por-etapas`;
- testar todos os cinco links da pagina e voltar/avancar do navegador;
- percorrer breadcrumb, cards e CTA somente com teclado;
- verificar landmarks, titulos, nomes acessiveis, ordem do DOM e foco;
- validar 1440, 1024, 768, 390 e 320 px;
- validar zoom de 200%, quebra de texto e ausencia de scroll horizontal;
- comparar a composicao desktop com o node `575:483`;
- confirmar que abrir a pagina nao altera dados temporarios da Carta.

## Riscos e mitigacoes

### Dependencia da feature 002

Risco: implementar a pagina sobre o shell placeholder e depois duplicar ou
refazer navegacao, footer e estilos.

Mitigacao: manter a pagina restrita ao seu conteudo e usar os contratos reais da
002 no momento da implementacao. Se a 002 ainda nao estiver pronta, registrar a
dependencia e limitar alteracoes compartilhadas ao minimo.

### Divergencia entre Figma Design, Figma Make e tokens locais

Risco: copiar cores ou medidas do frame sem reconciliar o design system.

Mitigacao: consultar ambos os arquivos via MCP no plano de implementacao,
registrar o mapeamento e priorizar o Figma Design para composicao e o Figma Make
para componentes e tokens.

### Confusao entre indice e progresso

Risco: estilos numerados levarem a implementacao de um stepper com bloqueios ou
estado de conclusao.

Mitigacao: modelar cards como links independentes e nao incluir estado de
progresso nos tipos, props ou armazenamento.

### Destinos ainda incompletos

Risco: as rotas existirem apenas como placeholders quando esta pagina for
entregue.

Mitigacao: manter os destinos corretos e navegaveis, sem absorver o escopo das
specs 005, 006, 007 e 011. A maturidade das paginas de destino deve ser tratada
nas respectivas features.

### Conteudo final ainda pendente

Risco: textos de referencia do Figma serem tratados como copy institucional
aprovada.

Mitigacao: centralizar toda a copy em arquivo versionado, identificar a origem
provisoria no plano de implementacao e permitir substituicao sem alterar a
estrutura dos componentes.

### Icones e cores como unica fonte de significado

Risco: cards visualmente distintos, mas pouco compreensiveis para leitores de
tela ou pessoas com baixa percepcao de cor.

Mitigacao: manter numero, titulo, descricao e acao textuais em todos os cards;
tratar icones como decorativos salvo decisao documentada em contrario; validar
contraste e foco.

## Criterio de prontidao para a proxima etapa

Este plano estara pronto para `/spec:tarefas` quando:

- a abordagem de rota, conteudo, componentes e estilos estiver aceita;
- a dependencia da feature 002 estiver explicita;
- nao houver logica de progresso ou persistencia planejada;
- os cinco destinos estiverem mapeados corretamente;
- riscos, testes e verificacoes estiverem definidos;
- a consulta detalhada do Figma estiver reservada para
  `/spec:plano-implementacao` antes de qualquer codigo.

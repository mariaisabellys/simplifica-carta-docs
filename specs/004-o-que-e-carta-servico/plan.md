# Plan: O que e a Carta de Servicos

## Objetivo tecnico

Substituir o placeholder de `/o-que-e-carta-de-servicos` por uma pagina
educativa, responsiva e acessivel, aderente ao frame Figma `365:265`. A pagina
deve apresentar contexto, fundamentos, dez campos informativos e tres
referencias normativas a partir de conteudo tipado e versionado, reutilizando o
shell compartilhado e sem depender de backend ou estado da Carta.

Este documento define a abordagem tecnica. Codigo e estilos finais so devem ser
alterados em `/spec:implementar`, depois da criacao de `tasks.md`, do
`implementation-plan.md` e da validacao documental da feature.

## Fontes consultadas

- `specs/004-o-que-e-carta-servico/spec.md`;
- `docs/processo/constitution.md`;
- `docs/produto/visao-produto.md`;
- `docs/produto/mvp.md`;
- `docs/produto/fluxos.md`;
- `docs/arquitetura/arquitetura-sistema.md`;
- `docs/design-system/mapa-figma-telas.md`;
- `docs/design-system/tokens-e-componentes.md`;
- `docs/implementation-plan.md`;
- planos das features `002-home-e-navegacao` e
  `003-explorar-por-etapas`;
- estrutura atual de rotas, shell, componentes, conteudo e estilos em `src/`;
- Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, node `365:265`, consultado via MCP
  durante a revisao da spec;
- Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, conforme a documentacao
  local do design system.

O `/spec:plano-implementacao` deve consultar novamente o Figma Design e o Figma
Make para consolidar medidas, tokens, estados e inventario de assets antes de
qualquer implementacao.

## Estado atual e pre-condicoes

- A aplicacao usa React 19, TypeScript e Vite.
- O CSS e global, organizado em `tokens.css` e `globals.css`.
- `Inter` ja esta definida como fonte principal nos tokens do projeto.
- O roteamento e interno, baseado em `window.history`, `findRoute` e
  `src/app/routes.tsx`; nao ha React Router.
- A rota `/o-que-e-carta-de-servicos` ja existe e esta associada a
  `OQueECartaPage` e a spec 004.
- A rota ainda nao possui `figmaNodeId`; deve receber `365:265`.
- `OQueECartaPage.tsx` contem somente `PageHeader` e `PlaceholderCard`.
- Header e footer ainda pertencem a `AppShell` e devem evoluir pela feature
  `002-home-e-navegacao`.
- Nao existe infraestrutura de testes automatizados no `package.json`.
- Os icones do frame ainda nao estao armazenados localmente.
- O conteudo normativo do prototipo ainda precisa de validacao editorial em
  fontes oficiais.

A implementacao da 004 deve partir do estado real da feature 002. Ela nao deve
copiar header, navegacao ou footer para dentro da pagina nem reintroduzir
`Material de apoio` na header.

## Leitura tecnica da tela

O frame `365:265`, com referencia desktop de `1440 x 2778 px`, organiza a tela
nas seguintes regioes:

1. header institucional compartilhada;
2. breadcrumb;
3. introducao em duas colunas;
4. faixa `Fundamentos`, com fundo em gradiente e dois paineis;
5. secao de dez cards sobre as informacoes da Carta;
6. secao de legislacao com tres linhas de referencia e links externos;
7. footer institucional compartilhado.

O `AppShell` e responsavel pelas regioes 1 e 7. A pagina deve renderizar apenas
as regioes 2 a 6. Para permitir faixas de fundo em largura total, o contrato do
container do shell podera precisar de uma variante de pagina ou de um padrao
`full-bleed` com container interno. Nao duplicar o shell para reproduzir o
frame.

## Abordagem

### 1. Consolidar rota e integracao com o shell

Manter a rota existente e adicionar:

- `figmaNodeId: "365:265"`;
- `specId: "004-o-que-e-carta-servico"`, ja presente;
- `layoutType` coerente com o contrato consolidado pela feature 002;
- estado ativo `aria-current="page"` para `O que e a Carta?`.

O acesso deve funcionar pelo CTA da home, pela navegacao editorial, por URL
direta, recarga e historico do navegador. Nao criar um roteador paralelo.

Caso a feature 002 introduza `AppLink`, `Breadcrumb`, container ou restauracao
de foco, a 004 deve reutilizar esses contratos. Se eles ainda nao existirem,
`tasks.md` deve registrar a dependencia e limitar alteracoes compartilhadas ao
minimo necessario.

### 2. Centralizar todo o conteudo em uma fonte tipada

Criar `src/content/pages/o-que-e-carta.ts` para concentrar:

- titulo e subtitulo;
- tres motivos de importancia;
- texto de fundamentos;
- dois beneficios por publico;
- dez campos informativos na ordem oficial; nome popular opcional explicado
  dentro do card Nome do servico, como identificacao complementar, sem
  substituir o nome nem criar um novo card;
- titulo e subtitulo da legislacao;
- tres referencias normativas e respectivos links oficiais.

Estrutura proposta:

```ts
type ImportanceAudience = "citizen" | "agency" | "management";
type FoundationAudience = "citizen" | "public-agency";

type ImportanceItem = {
  id: ImportanceAudience;
  title: string;
  description: string;
};

type FoundationItem = {
  id: FoundationAudience;
  title: string;
  description: string;
  tone: "orange" | "cyan";
};

type ServiceInformationFieldId =
  | "name"
  | "description"
  | "audience"
  | "documents"
  | "steps"
  | "deadline"
  | "costs"
  | "channels"
  | "scheduling"
  | "additional-information";

type ServiceInformationField = {
  id: ServiceInformationFieldId;
  title: string;
  description: string;
};

type LegalReference = {
  id: string;
  kind: "Lei Federal" | "Decreto Federal";
  number: string;
  year: number;
  summary: string;
  actionLabel: "Consultar";
  href: string;
};

type AboutServiceCharterContent = {
  title: string;
  description: string;
  importance: {
    title: string;
    items: readonly ImportanceItem[];
  };
  foundations: {
    title: string;
    description: string;
    items: readonly FoundationItem[];
  };
  information: {
    title: string;
    description: string;
    fields: readonly ServiceInformationField[];
  };
  legislation: {
    title: string;
    description: string;
    references: readonly LegalReference[];
  };
};
```

Os assets devem ser associados separadamente pelos identificadores, nunca por
markup SVG editorial nem URL temporaria do Figma. O conteudo deve preservar a
ordem dos arrays como ordem de leitura e renderizacao.

### 3. Compor a pagina com semantica editorial

A pagina deve conter um unico `h1`. Cada regiao principal deve ser uma
`section` identificada por `aria-labelledby` e um `h2`. Titulos internos dos
cards devem usar `h3` quando representarem subsecoes; rotulos simples podem ser
texto enfatizado quando isso evitar uma hierarquia artificial.

Componentes provaveis:

- `Breadcrumb`, reutilizado da feature 002 ou criado como UI compartilhada;
- `ImportancePanel`, para as tres perspectivas da introducao;
- `FoundationCard`, para os dois beneficios;
- `ServiceInformationCard`, para os dez campos;
- `LegalReferenceItem`, para cada norma e seu link externo.

Os componentes pequenos podem permanecer privados ao arquivo da pagina quando
nao houver reuso. Extrair somente os contratos que reduzam repeticao, facilitem
testes ou concentrem comportamento acessivel. Nao criar um componente para cada
bloco estatico apenas porque existe um frame equivalente no Figma.

### 4. Implementar links legais externos com seguranca e contexto

Cada acao `Consultar` deve ser um elemento `a` com:

- URL oficial validada;
- `target="_blank"`;
- `rel="noopener noreferrer"`;
- nome acessivel que identifique a norma e informe a abertura em nova aba,
  sem depender apenas do contexto visual da linha.

O rotulo visivel pode permanecer `Consultar`. Um texto visualmente oculto ou
`aria-label` deve completar o nome, por exemplo: `Consultar Lei Federal nº
13.460/2017 em nova aba`.

Antes de codificar as referencias, validar numero, ano, vigencia, resumo e URL
em fontes oficiais. Se houver divergencia material em relacao ao Figma, nao
alterar silenciosamente: registrar a diferenca e solicitar aprovacao editorial.

### 5. Exportar e mapear os assets oficiais

O frame contem icones para:

- as tres perspectivas de importancia;
- os dois paineis de fundamentos;
- os dez campos informativos;
- a secao de legislacao.

No `/spec:plano-implementacao`, inventariar node ID, funcao, dimensao e nome de
arquivo de cada asset. Na implementacao, baixar os SVGs pelos recursos
fornecidos pelo Figma e armazena-los em
`src/assets/o-que-e-carta/`.

Regras:

- nao desenhar manualmente SVGs que ja existem no frame;
- nao manter URLs temporarias do MCP no codigo;
- nao substituir um icone por outro apenas por semelhanca;
- preservar a proporcao e a geometria efetiva do asset;
- tratar os icones como decorativos com `aria-hidden="true"` quando titulo e
  descricao ja comunicarem todo o significado.

### 6. Adaptar a composicao para CSS responsivo

Usar fluxo normal, Grid e Flexbox. Nao reproduzir o posicionamento absoluto do
codigo de referencia do Figma.

- Desktop:
  - introducao em duas colunas, com texto a esquerda e painel a direita;
  - fundamentos em dois paineis lado a lado;
  - campos em grade de tres colunas, preservando a ordem do DOM;
  - referencias legais em linhas com tipo/numero, resumo e acao.
- Tablet:
  - introducao e fundamentos em uma ou duas colunas conforme a largura util;
  - campos em duas colunas enquanto o conteudo permanecer legivel;
  - legislacao com acao reposicionada sem perder associacao com a norma.
- Smartphone:
  - todas as regioes em uma coluna;
  - cards com altura determinada pelo conteudo;
  - referencias legais empilhadas;
  - area de toque adequada para `Consultar`;
  - ausencia de scroll horizontal desde 320 px.

A faixa de fundamentos deve ocupar a largura visual disponivel e conter seu
conteudo no mesmo alinhamento horizontal das demais secoes. O plano detalhado
deve decidir se isso sera resolvido por variante do shell, pseudo-full-bleed ou
estrutura de pagina, sem aplicar larguras fixas de 1440 px.

### 7. Reconciliar tokens do Figma com os tokens locais

O `implementation-plan.md` deve confirmar no Figma Design e no Figma Make:

- azuis, ciano, laranja, creme, branco e cinzas;
- gradiente da secao `Fundamentos`;
- tipografia Inter, pesos, tamanhos e alturas de linha;
- largura maxima do container;
- espacamentos entre secoes e dentro dos cards;
- bordas, raios e eventuais sombras;
- estados `hover`, `focus-visible` e `active` dos links;
- comportamento e alinhamento dos icones.

Reutilizar tokens existentes quando semanticamente equivalentes. Adicionar
tokens semanticos apenas para valores confirmados que tenham papel consistente,
como fundo creme dos cards, gradiente institucional ou borda dos paineis. Nao
espalhar cores literais pelo JSX.

### 8. Preservar o limite funcional da pagina

A pagina e somente informativa:

- nao le ou altera dados da Carta;
- nao usa `sessionStorage` ou `localStorage`;
- nao controla progresso;
- nao consulta backend;
- nao adiciona formulario, diagnostico ou tutorial;
- nao inclui CTA final ausente no frame;
- nao introduz `Material de apoio` na header;
- nao absorve o escopo das features 005, 006 ou 007.

## Arquivos provaveis

### Alterar

- `src/app/routes.tsx`, para registrar `figmaNodeId: "365:265"`;
- `src/pages/OQueECartaPage.tsx`, para substituir o placeholder;
- `src/styles/tokens.css`, somente para tokens confirmados e ausentes;
- `src/styles/globals.css` ou o arquivo de estilos consolidado pelas features
  anteriores;
- `src/components/layout/AppShell.tsx`, somente se o contrato consolidado da
  feature 002 precisar de uma variante full-bleed ou integracao de foco;
- `src/components/ui/Breadcrumb.tsx`, caso exista e exija extensao compativel.

### Criar

- `src/content/pages/o-que-e-carta.ts`;
- `src/components/o-que-e-carta/ServiceInformationCard.tsx`, se a extracao for
  confirmada;
- `src/components/o-que-e-carta/LegalReferenceItem.tsx`, se a extracao for
  confirmada;
- `src/assets/o-que-e-carta/`, para os assets oficiais exportados;
- testes da pagina e dos componentes, caso a infraestrutura seja adicionada ou
  ja exista no momento da implementacao.

Nao criar header, footer ou roteador exclusivos para esta pagina.

## Estrategia de validacao de conteudo

O arquivo `src/content/pages/o-que-e-carta.ts` e a fonte editorial aprovada.

1. Consumir o conteudo do arquivo tipado sem alterar seu sentido.
2. Conferir as URLs das tres referencias normativas em fontes oficiais.
3. Registrar qualquer divergencia futura entre fonte oficial, Figma e texto
   aprovado.
4. Atualizar primeiro o arquivo de conteudo, sem espalhar copy em componentes.

Erros ortograficos aparentes do frame, como grafia ou acentuacao, devem ser
corrigidos no conteudo versionado quando nao alterarem o sentido. Mudancas
juridicas ou institucionais exigem aprovacao.

## Estrategia de testes

### Testes automatizados

Se Vitest e Testing Library forem configurados pela feature 002 ou antes da
implementacao, adicionar testes para:

- renderizacao de um unico `h1`;
- breadcrumb com retorno para `/` e pagina atual indicada;
- painel de importancia com exatamente tres itens na ordem definida;
- secao de fundamentos com exatamente dois paineis;
- dez cards informativos na ordem oficial;
- tres referencias legais com tipo, numero, ano, resumo e link;
- links externos com `target="_blank"` e `rel="noopener noreferrer"`;
- nomes acessiveis que identifiquem a norma e a nova aba;
- ausencia de formulario, progresso e CTA final;
- ausencia de `Material de apoio` introduzido pela pagina.

Se o projeto continuar sem infraestrutura de testes, esta feature nao deve
instalar dependencias apenas para um teste isolado sem decisao registrada.
`tasks.md` e `implementation-plan.md` devem manter verificacoes manuais,
`typecheck` e `build` como obrigatorias.

### Verificacoes tecnicas e manuais

- executar `npm run typecheck`;
- executar `npm run build`;
- executar a suite automatizada, quando disponivel;
- testar acesso pela home, header, URL direta, recarga e historico;
- percorrer breadcrumb e links `Consultar` somente com teclado;
- conferir landmarks, um unico `h1`, hierarquia de `h2`/`h3` e ordem do DOM;
- testar os links legais e o aviso de abertura em nova aba;
- validar 1440, 1024, 768, 390 e 320 px;
- validar zoom de 200%, quebra de texto e ausencia de scroll horizontal;
- comparar visualmente a pagina desktop com o node `365:265`;
- verificar cada asset local contra o slot e a geometria do Figma;
- confirmar que a pagina nao le, altera ou persiste dados da Carta;
- confirmar que header e footer continuam pertencendo ao shell compartilhado.

## Riscos e mitigacoes

### Dependencia da feature 002

Risco: implementar a pagina sobre o shell placeholder e duplicar header,
footer, breadcrumb ou navegacao.

Mitigacao: implementar somente o conteudo proprio da pagina e reutilizar os
contratos reais da 002. Se ainda nao estiverem prontos, limitar alteracoes de
integracao e registrar a dependencia.

### Conteudo juridico desatualizado ou impreciso

Risco: tratar o texto do Figma como fonte juridica definitiva ou publicar uma
norma revogada, resumo incorreto ou URL inadequada.

Mitigacao: validar cada referencia em fonte oficial, manter conteudo isolado e
exigir decisao editorial para divergencias materiais.

### Muitos assets semelhantes

Risco: trocar icones entre cards, omitir um asset ou manter URL temporaria do
Figma.

Mitigacao: criar inventario node-a-node no plano de implementacao, usar nomes
semanticos, conferir arquivos nao vazios e validar cada callsite visualmente.

### Layout absoluto do prototipo

Risco: copiar coordenadas fixas de 1440 px e causar sobreposicao, corte ou
ordem de leitura incorreta em telas menores.

Mitigacao: traduzir a composicao para Grid/Flexbox, manter a ordem do DOM e
testar desde 320 px e com zoom de 200%.

### Faixa full-bleed dentro do shell

Risco: a largura maxima atual de `.site-main` impedir o fundo de ponta a ponta
ou incentivar margens negativas frageis.

Mitigacao: consolidar no plano detalhado um contrato de layout reutilizavel e
compativel com a feature 002, preservando container interno e sem duplicar o
shell.

### Divergencia entre Figma Design, Figma Make e tokens locais

Risco: aplicar valores do frame sem reconciliar o design system e a decisao de
usar Inter como fonte principal.

Mitigacao: usar o Figma Design para composicao, o Figma Make para tokens e
componentes e as decisoes locais para a fonte Inter; documentar divergencias no
`implementation-plan.md`.

### Conteudo visual depender apenas de icones ou cores

Risco: cards e paineis perderem significado para leitores de tela ou pessoas
com baixa percepcao de cor.

Mitigacao: manter titulo e descricao textuais, tratar icones decorativos
adequadamente e validar contraste, foco e leitura sem estilos.

## Criterio de prontidao para a proxima etapa

Este plano estara pronto para `/spec:tarefas` quando:

- a rota, o shell e o node `365:265` estiverem mapeados;
- a estrutura tipada cobrir todo o conteudo do frame;
- os componentes provaveis e limites de extracao estiverem definidos;
- a estrategia de assets oficiais estiver explicita;
- a validacao editorial das referencias normativas estiver prevista;
- responsividade, acessibilidade e testes estiverem definidos;
- nenhuma persistencia, backend, formulario ou CTA fora do frame estiver
  planejado;
- a consulta detalhada ao Figma Design e ao Figma Make estiver reservada para
  `/spec:plano-implementacao` antes do codigo.

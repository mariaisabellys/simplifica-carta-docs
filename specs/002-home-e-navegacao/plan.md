# Plan: Home e Navegacao

> **Contrato consolidado — 16 de outubro de 2026:** shell, links, localização,
> foco e histórico seguem `docs/arquitetura/contrato-navegacao.md`.

## Objetivo tecnico

Substituir a home placeholder por uma pagina responsiva baseada no frame Figma
`310:175` e ajustar a navegacao compartilhada para apresentar somente entradas
coerentes com o MVP. A entrega deve reutilizar a fundacao React + TypeScript +
CSS existente, manter o conteudo editorial versionado e nao depender de backend.

Este plano descreve a abordagem tecnica. Codigo e estilos finais so devem ser
alterados em `/spec:implementar`, depois da criacao de `tasks.md` e do
`implementation-plan.md` desta spec.

## Fontes consultadas

- `specs/002-home-e-navegacao/spec.md`;
- `docs/processo/constitution.md`;
- `docs/produto/mvp.md`;
- `docs/produto/fluxos.md`;
- `docs/design-system/mapa-figma-telas.md`;
- `docs/design-system/tokens-e-componentes.md`;
- Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, node `310:175`, consultado via MCP;
- Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, consultado via MCP;
- estrutura atual de `src/app`, `src/components`, `src/content`, `src/pages` e
  `src/styles`.

## Leitura tecnica do Figma

O frame oficial e uma pagina desktop de 1440 px com estas regioes, nesta ordem:

1. header claro com marca, subtitulo e navegacao;
2. hero sobre fundo em gradiente azul, com texto a esquerda, dois CTAs e arte a
   direita;
3. secao central `Como funciona o processo?`;
4. linha visual com quatro etapas numeradas;
5. CTA para conhecer a Carta de Servicos;
6. footer institucional em azul escuro.

O frame usa, entre outros valores, azul escuro proximo de `#00395b`, ciano
`#12b5d0`, laranja `#ff760f`, branco e cinzas. A tipografia do frame combina
Outfit em titulos e Inter/Rawline em textos e navegacao; no codigo, a decisao
transversal e usar Inter como familia principal para todos esses papeis. Os
demais valores devem ser
reconciliados com os tokens semanticos existentes e confirmados novamente no
Figma Make durante o `implementation-plan.md`; o codigo Tailwind retornado pelo
MCP e apenas referencia e nao deve ser copiado nem motivar a instalacao de
Tailwind.

O link `Material de apoio` visto no frame sera deliberadamente omitido, conforme
a decisao de MVP registrada na spec.

## Abordagem

### 1. Separar shell global e composicao da home

Manter `AppShell` como dono do header, da navegacao e do footer, mas retirar dele
textos e listas editoriais fixas. A `HomePage` sera responsavel apenas pelo hero,
processo e CTA intermediario. O container global atual, que limita toda a
`site-main` a 1120 px, devera ser ajustado para permitir faixas de largura total
no hero e no footer, com containers internos limitando e alinhando o conteudo.

### 2. Tornar a navegacao explicita

Nao derivar a header diretamente de todas as rotas com `showInNav`, porque isso
exporia diagnostico, formulario, tutorial e outras areas que nao pertencem a
navegacao definida para esta spec. Manter a tabela de rotas como fonte de
resolucao de paginas e criar uma lista de navegacao editorial separada.

Entradas planejadas:

| Rotulo | Destino | Comportamento |
| --- | --- | --- |
| Inicio | `/` | ativo na home com `aria-current="page"` |
| O que e a Carta? | `/o-que-e-carta-de-servicos` | abre a pagina educativa |
| Duvidas frequentes | `/ajuda#duvidas-frequentes` | aponta para a area de ajuda sem prometer uma FAQ completa |
| Preciso de ajuda | `/ajuda` | abre o fluxo de ajuda |

Em telas menores, a navegacao deve usar um controle de abertura/fechamento
acessivel, com nome exposto a leitores de tela, estado `aria-expanded`, foco
visivel e fechamento apos a navegacao. A acao `Preciso de ajuda` deve permanecer
visivel dentro do menu, sem sobreposicao.

### 3. Definir os destinos da home

- `Iniciar guia`: `/diagnostico`, primeira etapa do fluxo de cadastro de uma
  Carta de Servicos;
- `Explorar por etapas`: `/explorar-por-etapas`, pagina propria para escolher e
  acessar uma etapa do cadastro sem percorrer o fluxo completo;
- CTA `Conheca primeiro o que e uma Carta de Servicos`:
  `/o-que-e-carta-de-servicos`;
- etapa `Identificar um servico`: `/diagnostico`;
- etapa `Organizar informacoes`: `/organizar-informacoes`;
- etapa `Elaborar carta`: `/formulario-carta`;
- etapa `Simular publicacao`: `/tutorial-paraiba-digital`; a copy aprovada fala
  em seguir o tutorial para publicar a carta na plataforma, enquanto o destino
  e os textos de apoio devem manter claro que o cadastro e manual.

A feature 002 deve expor `/explorar-por-etapas` como `href` real nos CTAs da
home e do footer, mas nao deve registrar a pagina nem criar placeholder para
ela. O registro de `ExplorarPorEtapasPage` pertence exclusivamente a feature
`003-explorar-por-etapas`, conforme a decisao documentada na spec 001.

Enquanto a feature 003 nao estiver implementada, os testes da 002 validam o
destino declarado no link, nao a renderizacao da pagina de destino. Mudancas
para rotas ja registradas devem levar o foco ao conteudo principal ou ao titulo
da pagina para nao desorientar usuarios de teclado e leitores de tela.

### 4. Versionar o conteudo

Expandir `src/content/pages/home.ts` para concentrar marca, hero, CTAs, introducao
do processo, quatro etapas e CTA educativo, usando exatamente a copy aprovada.
Criar conteudo compartilhado de
navegacao e footer somente se ele for consumido pelo shell; evitar duplicar
rotulos entre JSX e arquivos de conteudo.

Estrutura de dados proposta:

```ts
type NavigationItem = {
  label: string;
  href: string;
  kind?: "default" | "help";
};

type HomeAction = {
  label: string;
  href: "/diagnostico" | "/explorar-por-etapas";
  variant: "primary" | "secondary-inverse";
  icon: "play" | "list";
};

type HomeProcessStep = {
  id: "identificar" | "organizar" | "elaborar" | "simular";
  number: 1 | 2 | 3 | 4;
  eyebrow: string;
  title: string;
  description: string;
  href:
    | "/diagnostico"
    | "/organizar-informacoes"
    | "/formulario-carta"
    | "/tutorial-paraiba-digital";
};
```

`HomeAction` e `HomeProcessStep` permanecem junto de `homeContent` em
`src/content/pages/home.ts`, porque descrevem exclusivamente a estrutura dessa
fonte editorial. Tipos compartilhados de navegacao continuam em
`src/types/content.ts`.

Icones nao devem ser codificados como SVG manual. Quando forem necessarios para
fidelidade, devem ser exportados do Figma no plano de implementacao e salvos como
assets locais; caso um icone puramente decorativo seja omitido em algum
breakpoint, o rotulo textual deve continuar completo.

### 5. Compor componentes reutilizaveis

Componentes provaveis:

- `Brand`: marca `Simplifica Carta` e subtitulo `Guia de Servicos`;
- `MainNavigation`: links, estado ativo e controle responsivo;
- `HomeHero`: chamada, texto, CTAs e arte;
- `ProcessSection`: titulo, introducao e lista semantica de etapas;
- `ProcessStep`: numero, rotulo, titulo, descricao e destino;
- `HomeIntroCta`: chamada para a pagina educativa;
- `SiteFooter`: colunas institucionais e links validos do MVP;
- evolucao de `ButtonLink` para aceitar variantes e icones sem perder a
  semantica de link.

Os componentes devem permanecer simples e orientados a props. Nao introduzir
biblioteca de componentes ou dependencia de estado global para esta entrega.

### 6. Adaptar o layout responsivo

- Desktop: preservar a hierarquia do frame, com hero em duas colunas e processo
  em linha;
- Tablet: reduzir escala tipografica, espacamentos e largura da arte, permitindo
  quebra controlada dos itens de navegacao;
- Smartphone: empilhar hero, CTAs e colunas do footer; transformar a linha de
  processo em lista vertical; usar menu compacto sem esconder ajuda;
- manter largura minima suportada de 320 px, sem scroll horizontal;
- usar `clamp()`, grid/flex e tokens, evitando coordenadas absolutas do codigo
  gerado pelo Figma;
- respeitar `prefers-reduced-motion` em qualquer rolagem suave ou transicao.

## Arquivos provaveis

### Alterar

- `src/pages/HomePage.tsx`;
- `src/components/layout/AppShell.tsx`;
- `src/components/ui/ButtonLink.tsx`;
- `src/content/pages/home.ts`;
- `src/app/routes.tsx`;
- `src/styles/tokens.css`;
- `src/styles/globals.css`.

### Criar, se confirmados no plano de implementacao

- `src/components/layout/Brand.tsx`;
- `src/components/layout/MainNavigation.tsx`;
- `src/components/layout/SiteFooter.tsx`;
- `src/components/home/HomeHero.tsx`;
- `src/components/home/ProcessSection.tsx`;
- `src/components/home/ProcessStep.tsx`;
- `src/components/home/HomeIntroCta.tsx`;
- `src/content/navigation.ts`;
- `src/assets/home/` para a arte e os icones exportados do Figma;
- testes ao lado dos componentes ou em `src/__tests__/`, conforme a ferramenta
  de testes escolhida no `implementation-plan.md`.

Os nomes e a granularidade finais devem ser fechados no
`implementation-plan.md`; componentes sem reutilizacao ou logica propria podem
permanecer dentro de `HomePage.tsx` para evitar fragmentacao excessiva.

## Tokens e estilos

Revisar os tokens existentes em vez de espalhar valores literais. O plano de
implementacao deve mapear os valores confirmados no Figma para:

- cores de marca, acao, texto, borda e fundos;
- familia e pesos tipograficos efetivamente disponiveis;
- escala de espacamento de 4 px;
- raios de 8 px observados nos CTAs;
- sombras de botoes e superficies;
- largura maxima de container e breakpoints responsivos;
- estados `hover`, `focus-visible`, `active` e `disabled`.

O `implementation-plan.md` deve usar Inter nos tokens `--font-display` e
`--font-body`, com `system-ui, sans-serif` como fallback sem bloquear a
renderizacao. Outfit e Rawline nao devem ser reintroduzidas como fontes
prioritarias.

## Validacoes e acessibilidade

Esta funcionalidade nao possui campos de formulario nem validacao de dados. As
validacoes relevantes sao estruturais e de navegacao:

- exatamente um `h1` na home e hierarquia coerente de titulos;
- header com `nav` nomeada e footer com links semanticamente validos;
- `aria-current="page"` somente no item correspondente a rota atual;
- controle do menu acessivel por teclado e com estado anunciado;
- links e botoes com nomes claros, alvos validos e area de toque adequada;
- imagem informativa com texto alternativo; imagens decorativas com `alt=""`;
- contraste de texto, foco e estados conforme WCAG 2.1 AA;
- destino `/explorar-por-etapas` declarado de forma consistente com a feature
  003;
- ausencia do link `Material de apoio` na header;
- texto de `Simular publicacao` sem sugerir publicacao automatica.

## Estrategia de testes

### Testes automatizados

O projeto ainda nao possui framework de testes. No `implementation-plan.md`,
avaliar a inclusao minima de Vitest, Testing Library e `jest-dom`. Se aprovada,
cobrir:

- renderizacao do hero, dos dois CTAs e das quatro etapas;
- destinos de todos os links principais;
- estado ativo da navegacao;
- abertura, fechamento e atributos acessiveis do menu movel;
- ausencia de `Material de apoio` na header;
- navegacao para `/explorar-por-etapas` e comportamento de foco apos mudanca de
  rota.

Se a instalacao de dependencias de teste nao fizer parte desta entrega, registrar
a lacuna e executar os cenarios abaixo manualmente, sem tratar apenas o build
como evidencia funcional.

### Verificacoes tecnicas

- `npm run typecheck`;
- `npm run build`;
- verificacao de links internos e ausencia de erros no console;
- inspecao do DOM para landmarks, titulos e atributos ARIA.

### Verificacoes visuais e manuais

- comparar a implementacao com o node `310:175` em desktop;
- validar larguras de 1440, 1024, 768, 390 e 320 px;
- percorrer todos os controles apenas com teclado;
- testar zoom de 200% e reflow sem perda de conteudo;
- testar com leitor de tela ao menos a ordem do header, hero, processo, CTA e
  footer;
- testar preferencia de movimento reduzido;
- confirmar que nenhuma acao exige backend.

## Riscos e mitigacoes

| Risco | Mitigacao |
| --- | --- |
| O frame desktop usa posicionamento absoluto e nao define todos os breakpoints | Recriar a intencao com grid/flex, validar nos cinco tamanhos previstos e documentar adaptacoes |
| Divergencia entre cores do frame e tokens resumidos | Confirmar valores no Figma Make durante o `implementation-plan.md` e mapear para tokens semanticos |
| Arte do hero e logos institucionais ainda nao estarem no repositorio | Exportar os assets reais do Figma; nao redesenhar SVGs nem manter placeholders silenciosos |
| Rotas futuras aparecerem indevidamente na header | Separar itens editoriais de navegacao da tabela completa de rotas |
| Link de FAQ prometer uma area completa ainda nao entregue | Apontar para a area de ajuda com fragmento e usar texto compativel com o conteudo disponivel |
| Menu movel introduzir complexidade e regressao de foco | Manter estado local pequeno, atributos ARIA e testes de teclado/foco |
| Fontes externas afetarem desempenho ou disponibilidade | Definir fallbacks e estrategia de carregamento no plano de implementacao |

## Fora da entrega tecnica

- diagnostico, formulario, FAQ completa, materiais de apoio e suporte com
  backend;
- publicacao ou integracao automatica com o Paraiba Digital;
- autenticacao ou persistencia permanente;
- alteracao das paginas de destino alem do necessario para que links e ancoras
  sejam honestos e funcionais;
- instalacao de Tailwind.

## Sequencia recomendada

1. Executar `/spec:tarefas 002-home-e-navegacao`.
2. Executar `/spec:plano-implementacao 002-home-e-navegacao`, incluindo contratos
   finais, extracao de assets, mapeamento de tokens e codigo base.
3. Executar `/spec:validar 002-home-e-navegacao` para conferir consistencia entre
   spec, plano, tarefas, Figma e MVP.
4. Somente entao executar `/spec:implementar 002-home-e-navegacao`.

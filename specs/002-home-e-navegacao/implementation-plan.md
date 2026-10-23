# Implementation Plan: Home e Navegacao

> **Navegação reconciliada na T015 (22/10/2026):** os exemplos abaixo são
> consumidores do contrato central; não constituem implementações alternativas.

## Status

Validado documentalmente em 24 de setembro de 2026 e revisado em 25 de
setembro de 2026 para incorporar a copy aprovada e versionada da home, sem
bloqueios abertos.
Pronto para `/spec:implementar 002-home-e-navegacao`.

## Fontes consultadas

- Spec: `specs/002-home-e-navegacao/spec.md`;
- plano: `specs/002-home-e-navegacao/plan.md`;
- tarefas: `specs/002-home-e-navegacao/tasks.md`;
- constitution: `docs/processo/constitution.md`;
- MVP e fluxo: `docs/produto/mvp.md` e `docs/produto/fluxos.md`;
- mapa e tokens: `docs/design-system/mapa-figma-telas.md` e
  `docs/design-system/tokens-e-componentes.md`;
- estrategia: `docs/implementation-plan.md`;
- codigo React, rotas, shell, conteudo e CSS existentes em `src/`;
- Figma Design, consultado via `get_design_context`:
  - `fileKey`: `YaVUdqYa3boHpvGrxf4ZJ5`;
  - `nodeId`: `310:175`;
  - nome: `home`;
- Figma Make, consultado via `get_design_context`:
  - `fileKey`: `dVm7lEZdBFqOiiySWLWUqp`;
  - `nodeId`: `0:1`.

O retorno do Figma foi tratado como referencia, nao como codigo final. Classes
Tailwind e coordenadas absolutas do retorno nao devem ser copiadas.

## Objetivo da implementacao

Substituir a home placeholder por uma pagina fiel a hierarquia do frame
`310:175`, ajustar header e footer compartilhados e oferecer dois caminhos
claros: iniciar o guia e explorar as quatro etapas. A pagina deve funcionar sem
backend, sem persistencia e sem expor `Material de apoio` na header.

## Decisoes fechadas

- Stack: React 19, TypeScript e CSS global com tokens; nao instalar Tailwind.
- `AppShell` continua responsavel por header, main e footer.
- A lista da header sera independente do cadastro completo de rotas.
- O hero, o processo e o CTA educativo permanecerao em `HomePage.tsx`; nao criar
  componentes de um unico uso sem logica propria.
- Criar componentes separados apenas para `Brand`, `MainNavigation` e
  `SiteFooter`, pois sao compartilhados e possuem responsabilidades proprias.
- `Iniciar guia` aponta para `/diagnostico`, primeira etapa do fluxo de
  cadastro de uma Carta de Servicos.
- O CTA educativo aponta para `/o-que-e-carta-de-servicos` e permanece
  independente do inicio do fluxo de cadastro.
- `Explorar por etapas` aponta para `/explorar-por-etapas`, rota pertencente a
  futura feature `003-explorar-por-etapas`.
- A feature 002 cria os links com `href="/explorar-por-etapas"`, mas nao
  registra `ExplorarPorEtapasPage` nem cria placeholder; essa integracao
  pertence exclusivamente a feature 003.
- A pagina de destino segue o Figma Design `575:483`, mas sua estrutura, cards e
  implementacao nao pertencem a feature 002.
- `Duvidas frequentes` aponta para `/ajuda#duvidas-frequentes`; a pagina de
  ajuda deve receber somente o `id` necessario, sem implementar a FAQ completa.
- O footer nao exibira links sem destino. `Materiais de apoio` e `Guia de
  Linguagem Simples` ficam fora desta entrega.
- A data do copyright deve ser derivada em runtime para evitar texto obsoleto.
- O menu movel usara estado local em `MainNavigation`, sem biblioteca externa.
- Testes automatizados entram nesta spec com Vitest, Testing Library,
  `jest-dom` e ambiente jsdom.

## Mapeamento visual do Figma Design

| Regiao | Referencia observada | Adaptacao para o projeto |
| --- | --- | --- |
| Header | 67 px, fundo branco, borda inferior, marca a esquerda e nav a direita | Header sticky, container fluido limitado e menu recolhivel abaixo de 860 px |
| Marca | `Simplifica Carta`, destaque ciano em `Carta`, divisor e `Guia de Servicos` | Texto HTML, sem imagem; nome acessivel no link da home |
| Hero | 559 px, gradiente azul, conteudo a esquerda e arte a direita | Grid de duas colunas; altura por conteudo e padding responsivo |
| Titulo | Outfit ExtraBold no frame, 64 px no desktop, branco e ciano | Inter ExtraBold por decisao transversal; `clamp(2.5rem, 5vw, 4rem)` e segunda linha destacada |
| CTAs | Laranja primario e azul translucido secundario, raio 8 px | `ButtonLink` com variantes `primary` e `secondary-inverse` |
| Processo | Titulo central, texto introdutor e quatro etapas ligadas | Lista ordenada em grid; conectores apenas decorativos em desktop |
| CTA educativo | Painel creme, raio aproximado de 20 px | Grid texto/acao, empilhado no mobile |
| Footer | Azul `#002b45`, quatro blocos e divisor | Grid responsivo com links validos, descricao, endereco e copyright |

Copy aprovada e versionada para a home:

- `Menos burocracia, mais praticidade.`;
- `Selecione a experiencia que melhor atende as suas necessidades: um guia
  completo do inicio ao fim ou acesso livre as secoes da Carta de Servico.`;
- `Iniciar guia`;
- `Explorar por etapas`;
- `Como funciona o processo?`;
- `O manual conduz voce de forma simples e intuitiva atraves de quatro etapas
  essenciais para garantir um servico direto, acessivel e em conformidade com
  as normas.`;
- `Entenda` — `Identificar um servico` — `Verifique se e realmente um
  servico.`;
- `Reuna` — `Organizar informacoes` — `Reuna todas as informacoes necessarias`;
- `Desenvolva` — `Elaborar carta` — `Preencha a Carta seguindo nossas dicas.`;
- `Conclua` — `Simular publicacao` — `Siga o tutorial para publicar a carta na
  plataforma.`;
- `Nao sabe por onde comecar?`;
- `Conheca primeiro o que e uma Carta de Servicos`;
- `Entenda o que caracteriza uma Carta de Servicos e qual e sua finalidade`;
- `O que e a Carta de Servico?`.

O arquivo `src/content/pages/home.ts` e a fonte textual oficial desta feature e
usa acentuacao correta. A quarta etapa mantem a copy aprovada, e seu destino
`/tutorial-paraiba-digital` preserva o fluxo de cadastro manual; a pagina nao
deve sugerir que o Simplifica Carta publica automaticamente.

## Mapeamento do Figma Make e tokens

O Figma Make confirmou uma fonte estruturada de design system. O arquivo local
`docs/design-system/tokens-e-componentes.md` permanece o resumo operacional. O
frame da home possui variacoes mais recentes; para esta tela, usar os valores
abaixo sem substituir tokens globais de outras features de forma destrutiva.

| Uso | Token planejado | Valor |
| --- | --- | --- |
| Azul principal da home | `--color-home-navy` | `#00395b` |
| Azul do footer | `--color-home-footer` | `#002b45` |
| Ciano de destaque | `--color-home-cyan` | `#12b5d0` |
| Laranja de acao | `--color-home-orange` | `#ff760f` |
| Azul secundario do CTA | `--color-home-secondary-action` | `#265174` |
| Borda do CTA secundario | `--color-home-secondary-border` | `#3b6282` |
| Texto cinza | `--color-home-muted` | `#666666` |
| Navegacao inativa | `--color-home-nav-muted` | `#848b96` |
| CTA educativo | `--color-home-cta-background` | `#ffebd1` |
| Links no footer | `--color-home-footer-muted` | `#8fbce5` |
| Gradiente do hero | `--gradient-home-hero` | `linear-gradient(108deg, #033a5d 21%, #0f3e66 48%, #0388af 99%)` |
| Raio de controle | token existente `--radius-md` | `8px` |
| Raio do painel | `--radius-xl` | `20px` |
| Container | `--container-home` | `1216px` |

Tipografia:

- Inter e a familia principal para titulos, corpo, navegacao e controles;
- `--font-display` e `--font-body` devem priorizar Inter;
- o uso de Inter no lugar de Outfit/Rawline do frame e uma divergencia
  intencional definida para todo o projeto;
- nao adicionar dependencia JavaScript para fontes;
- usar `system-ui, sans-serif` como fallback sem bloquear a renderizacao.

## Inventario de assets

A consulta ao frame retornou quatro imagens raster e quatorze vetores. Nem todos
devem ser copiados: varios vetores sao linhas e circulos que podem ser
representados legitimamente por CSS, pois nao sao glifos autorais.

| Asset no frame | Node/identificacao | Arquivo local | Regra |
| --- | --- | --- | --- |
| Arte principal da Carta | `325:201`, imagem `ChatGPT Image...` | `src/assets/home/carta-servico.png` | baixar o raster original; imagem informativa com alt |
| Marca institucional branca | `690:403`, `SEMTD-branco 1` | `src/assets/home/semtd-branco.png` | baixar o raster original; alt institucional |
| Icone play | `322:171`, `play 1` | `src/assets/home/icon-play.svg` | baixar o SVG exato; `aria-hidden` |
| Icone lista | `325:184`, `text-align-start 1` | `src/assets/home/icon-list.svg` | baixar o SVG exato; `aria-hidden` |
| Seta do CTA | asset `imgArrowRight` | `src/assets/home/icon-arrow-right.svg` | baixar o SVG exato; `aria-hidden` |

Linhas, divisores, circulos numerados e conectores do processo devem ser CSS,
nao arquivos, pois sao geometria de layout sem glifo. As URLs do MCP sao
temporarias; durante `/spec:implementar`, chamar `download_assets` novamente e
salvar os bytes exatos. Nunca manter URL `figma.com/api/mcp/asset` no codigo.

Se a marca institucional estiver incorporada a uma das quatro imagens sem
identificacao suficiente, inspecionar os arquivos baixados antes de nomear. Nao
adivinhar a correspondencia pelo indice da resposta.

## Arquivos a alterar

- `package.json` — scripts e dependencias de teste;
- `src/app/App.tsx` — navegação via provider com pathname/search/hash e foco;
- `src/app/routes.tsx` — remover a responsabilidade editorial de `showInNav`;
- `src/components/layout/AppShell.tsx` — integrar componentes compartilhados;
- `src/components/ui/ButtonLink.tsx` — variantes, icone e navegacao SPA;
- `src/content/pages/home.ts` — conteudo completo e tipado;
- `src/pages/HomePage.tsx` — composicao final;
- `src/pages/AjudaPage.tsx` — ancora honesta `duvidas-frequentes`;
- `src/styles/tokens.css` — tokens adicionais da home;
- `src/styles/globals.css` — layout, estados e responsividade.

## Arquivos a criar

- `src/components/layout/Brand.tsx`;
- `src/components/layout/MainNavigation.tsx`;
- `src/components/layout/SiteFooter.tsx`;
- `src/app/NavigationContext.tsx`;
- `src/content/navigation.ts`;
- `src/types/content.ts`;
- `src/assets/home/carta-servico.png`;
- `src/assets/home/semtd-branco.png`;
- `src/assets/home/icon-play.svg`;
- `src/assets/home/icon-list.svg`;
- `src/assets/home/icon-arrow-right.svg`;
- `src/test/setup.ts`;
- `src/pages/HomePage.test.tsx`;
- `src/components/layout/MainNavigation.test.tsx`.

Nao criar componentes `HomeHero`, `ProcessSection` ou `HomeIntroCta` na primeira
implementacao. Extrair somente se o JSX final ficar dificil de manter ou houver
reuso real.

## Contratos TypeScript

### `src/types/content.ts`

```ts
export type NavigationItem = {
  label: string;
  href: string;
  kind?: "default" | "help";
};

// Navegação importa Navigate do contrato compartilhado; não redefinir API aqui.
```

Os tipos `HomeAction` e `HomeProcessStep` sao especificos da fonte editorial e
ficam exportados em `src/content/pages/home.ts`, conforme o arquivo versionado.

### Props e responsabilidade de navegação

Brand, MainNavigation, SiteFooter, Breadcrumb e ButtonLink compõem AppLink.
Não recebem onNavigate para reimplementar cliques/histórico. ButtonLink adiciona
somente variantes/ícone; preserva atributos nativos target/download/aria.
O único handler elegível vive em AppLink, usando o guard compartilhado.
NavigateOptions/AppLocation são os do [contrato de navegação](../../docs/arquitetura/contrato-navegacao.md), não aliases divergentes.

## Conteudo base

### `src/content/navigation.ts`

```ts
import type { NavigationItem } from "../types/content";

export const mainNavigation: NavigationItem[] = [
  { label: "Início", href: "/" },
  { label: "O que é a Carta?", href: "/o-que-e-carta-de-servicos" },
  { label: "Dúvidas frequentes", href: "/ajuda#duvidas-frequentes" },
  { label: "Preciso de ajuda", href: "/ajuda", kind: "help" },
];

export const footerNavigation = {
  quickAccess: [
    { label: "Início", href: "/" },
    { label: "O que é a Carta?", href: "/o-que-e-carta-de-servicos" },
    { label: "Guia passo a passo", href: "/diagnostico" },
    { label: "Explorar etapas", href: "/explorar-por-etapas" },
  ],
  support: [
    { label: "Dúvidas frequentes", href: "/ajuda#duvidas-frequentes" },
    { label: "Preciso de ajuda", href: "/ajuda" },
  ],
} satisfies Record<string, NavigationItem[]>;
```

### `src/content/pages/home.ts`

```ts
export type HomeAction = {
  label: string;
  href: "/diagnostico" | "/explorar-por-etapas";
  variant: "primary" | "secondary-inverse";
  icon: "play" | "list";
};

export type HomeProcessStep = {
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

export const homeContent = {
  productName: "Simplifica Carta",
  hero: {
    title: "Menos burocracia, mais praticidade.",
    description:
      "Selecione a experiência que melhor atende às suas necessidades: um guia completo do início ao fim ou acesso livre às seções da Carta de Serviço.",
    actions: [
      { label: "Iniciar guia", href: "/diagnostico", variant: "primary", icon: "play" },
      { label: "Explorar por etapas", href: "/explorar-por-etapas", variant: "secondary-inverse", icon: "list" },
    ] satisfies readonly HomeAction[],
  },
  process: {
    title: "Como funciona o processo?",
    description:
      "O manual conduz você de forma simples e intuitiva através de quatro etapas essenciais para garantir um serviço direto, acessível e em conformidade com as normas.",
    steps: [
      { id: "identificar", number: 1, eyebrow: "Entenda", title: "Identificar um serviço", description: "Verifique se é realmente um serviço.", href: "/diagnostico" },
      { id: "organizar", number: 2, eyebrow: "Reúna", title: "Organizar informações", description: "Reúna todas as informações necessárias", href: "/organizar-informacoes" },
      { id: "elaborar", number: 3, eyebrow: "Desenvolva", title: "Elaborar carta", description: "Preencha a Carta seguindo nossas dicas.", href: "/formulario-carta" },
      { id: "simular", number: 4, eyebrow: "Conclua", title: "Simular publicação", description: "Siga o tutorial para publicar a carta na plataforma.", href: "/tutorial-paraiba-digital" },
    ] satisfies readonly HomeProcessStep[],
  },
  introCta: {
    eyebrow: "Não sabe por onde começar?",
    title: "Conheça primeiro o que é uma Carta de Serviços",
    description: "Entenda o que caracteriza uma Carta de Serviços e qual é sua finalidade",
    actionLabel: "O que é a Carta de Serviço?",
    actionHref: "/o-que-e-carta-de-servicos",
  },
} as const;
```

## Composição React — navegação unificada

O [contrato de navegação](../../docs/arquitetura/contrato-navegacao.md) define NavigationProvider, useAppLocation, useAppNavigate e AppLink.
O provider possui leitura e escrita da URL completa; App apenas resolve rota e
compõe páginas. AppShell coordena título/foco/scroll, não cria outro listener.
Versão anterior de contexto apenas de função e App baseado em pathname/hash
foi arquivada; não usar seus handlers ou tipos como base.

Exemplos de consumidores futuros, sem implementar provider nesta documentação:

```tsx
// imports a ajustar aos arquivos compartilhados efetivamente entregues
function RouteView() {
  const location = useAppLocation();
  const route = findRoute(location.pathname); // futuro: undefined quando desconhecida
  return (
    <AppShell>
      {route ? <route.Component /> : <NotFoundPage />}
    </AppShell>
  );
}
// NavigationProvider e CartaSessionProvider permanecem acima de RouteView,
// sem key derivada de pathname/search/hash.
```

Brand e links de menu/rodapé/processo usam AppLink com href real. ButtonLink
também compõe AppLink, sem prop de navegação paralela:

```tsx
<AppLink href="/" aria-label="Simplifica Carta — Início">Simplifica Carta</AppLink>
<ButtonLink href={action.href} variant={action.variant}>{action.label}</ButtonLink>
<AppLink href={step.href}>{step.title}</AppLink>
<AppLink href="/ajuda#duvidas-frequentes">Dúvidas frequentes</AppLink>
<AppLink href="#conteudo-principal">Pular para o conteúdo</AppLink>
<main id="conteudo-principal" tabIndex={-1}>{children}</main>
```

Menu móvel tem estado de abertura local, fecha depois de navegação elegível;
não usa preventDefault próprio e não bloqueia clique modificado. Ícones/assets,
hierarquia visual, conteúdo e CSS continuam conforme seções desta feature.
404 mantém URL desconhecida, shell/título e retorno à home; findRoute atual
ainda retorna home e exige correção futura. Foco por fragmento tem precedência,
URL completa identifica transição, e o shell não disputa foco com a página.

## CSS base

Adicionar ao final de `tokens.css`:

```css
:root {
  --color-home-navy: #00395b;
  --color-home-footer: #002b45;
  --color-home-cyan: #12b5d0;
  --color-home-orange: #ff760f;
  --color-home-secondary-action: #265174;
  --color-home-secondary-border: #3b6282;
  --color-home-muted: #666666;
  --color-home-nav-muted: #848b96;
  --color-home-cta-background: #ffebd1;
  --color-home-footer-muted: #8fbce5;
  --gradient-home-hero: linear-gradient(108deg, #033a5d 21%, #0f3e66 48%, #0388af 99%);
  --radius-xl: 1.25rem;
  --container-home: 76rem;
}
```

Estrutura principal sugerida para `globals.css`:

```css
.content-container {
  width: min(var(--container-home), calc(100% - 2rem));
  margin-inline: auto;
}

.site-main { flex: 1; width: 100%; }

.site-header { position: sticky; top: 0; z-index: 20; background: #fff; border-bottom: 1px solid #ddd; }
.site-header__inner { min-height: 4.1875rem; display: flex; align-items: center; justify-content: space-between; gap: var(--space-6); width: min(82.5rem, calc(100% - 2rem)); margin-inline: auto; }
.brand { display: inline-flex; align-items: center; gap: var(--space-3); text-decoration: none; }
.brand strong { color: var(--color-home-navy); font-size: 1.25rem; }
.brand strong span { color: var(--color-home-cyan); }
.brand i { width: 1px; height: 1.25rem; background: var(--color-border-strong); }
.brand small { color: var(--color-home-nav-muted); font-size: .875rem; font-weight: 600; }

.nav-list { display: flex; align-items: center; gap: var(--space-2); margin: 0; padding: 0; list-style: none; }
.nav-link { display: inline-flex; min-height: 2.75rem; align-items: center; padding-inline: .75rem; color: var(--color-home-nav-muted); font-weight: 700; text-decoration: none; border-radius: 999px; }
.nav-link:hover, .nav-link[aria-current="page"] { color: var(--color-home-orange); }
.nav-toggle { display: none; }

.home-hero { color: #fff; background: var(--gradient-home-hero); }
.home-hero__inner { min-height: 34.9375rem; display: grid; grid-template-columns: minmax(0, 1fr) minmax(18rem, 26rem); align-items: center; gap: clamp(2rem, 7vw, 7rem); padding-block: var(--space-12); }
.home-hero__content { max-width: 36rem; }
.home-eyebrow { margin: 0 0 var(--space-3); font-size: .8125rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.home-hero h1 { margin-bottom: var(--space-5); color: #fff; font-size: clamp(2.5rem, 5vw, 4rem); }
.home-hero h1 span { display: block; color: color-mix(in srgb, var(--color-home-cyan) 88%, transparent); }
.home-hero__description { max-width: 34.5rem; line-height: 1.5; }
.home-hero__image { width: 100%; max-height: 30.5rem; object-fit: contain; }
.home-actions { display: flex; flex-wrap: wrap; gap: var(--space-4); margin-top: var(--space-8); }

.button-link--primary { background: var(--color-home-orange); box-shadow: 0 2px 5px rgb(0 0 0 / 25%); }
.button-link--secondary-inverse { color: #fff; background: var(--color-home-secondary-action); border-color: var(--color-home-secondary-border); }
.button-link img { width: .9375rem; height: .9375rem; object-fit: contain; }

.process-section { scroll-margin-top: 5rem; padding-block: clamp(4rem, 8vw, 7rem); background: #fff; }
.process-section__header { max-width: 47rem; margin: 0 auto var(--space-16); text-align: center; }
.process-list { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); margin: 0; padding: 0; list-style: none; }
.process-step { position: relative; text-align: center; }
.process-step:not(:last-child)::after { content: ""; position: absolute; top: 1.3rem; left: calc(50% + 2rem); width: calc(100% - 2.5rem); border-top: 1px solid var(--color-border-strong); }
.process-step a { position: relative; z-index: 1; display: grid; justify-items: center; color: inherit; text-decoration: none; }
.process-step__number { display: grid; width: 2.625rem; height: 2.625rem; place-items: center; color: #fff; font-weight: 800; background: var(--color-home-orange); border: 5px solid #fff; border-radius: 50%; box-shadow: 0 0 0 1px var(--color-home-orange); }
.process-step__eyebrow { margin-top: var(--space-3); color: var(--color-home-orange); font-size: .625rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }

.home-intro-cta { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: var(--space-8); margin-bottom: clamp(4rem, 8vw, 7rem); padding: var(--space-10); background: var(--color-home-cta-background); border-radius: var(--radius-xl); }

.site-footer { color: var(--color-home-footer-muted); background: var(--color-home-footer); }
.site-footer__grid { display: grid; grid-template-columns: .8fr .9fr 1.2fr 1.4fr; gap: var(--space-10); padding-block: var(--space-12); }
.site-footer h2 { color: #fff; font-size: .875rem; text-transform: uppercase; }
.site-footer a { color: var(--color-home-footer-muted); }
.site-footer address { font-style: normal; }
.site-footer__institution img { display: block; width: 100%; max-width: 18rem; height: auto; }
.site-footer__copyright { width: min(var(--container-home), calc(100% - 2rem)); margin: 0 auto; padding-block: var(--space-6); text-align: center; border-top: 1px solid rgb(143 188 229 / 35%); }

@media (max-width: 860px) {
  .nav-toggle { display: inline-grid; width: 2.75rem; height: 2.75rem; place-items: center; }
  .nav-list { position: absolute; inset: 100% 0 auto; display: none; padding: var(--space-4); background: #fff; border-bottom: 1px solid var(--color-border-default); }
  .nav-list[data-open="true"] { display: grid; }
  .nav-link { width: 100%; }
  .home-hero__inner { grid-template-columns: 1fr; }
  .home-hero__image { justify-self: center; max-width: 20rem; }
  .process-list { grid-template-columns: repeat(2, 1fr); row-gap: var(--space-12); }
  .process-step::after { display: none; }
  .site-footer__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .brand small, .brand i { display: none; }
  .home-actions, .home-actions .button-link { width: 100%; }
  .process-list, .home-intro-cta, .site-footer__grid { grid-template-columns: 1fr; }
  .home-intro-cta { padding: var(--space-6); }
}

@media (prefers-reduced-motion: reduce) {
  html:focus-within { scroll-behavior: auto; }
}
```

Validar suporte de `color-mix`; se a matriz de navegadores do projeto nao o
permitir, usar `rgba(18, 181, 208, .88)`.

## Ajuda e ancora de FAQ

Em `AjudaPage.tsx`, envolver a introducao ou adicionar uma secao curta com
`id="duvidas-frequentes"` e `tabIndex={-1}`. O conteudo deve dizer que as duvidas
podem ser encaminhadas pelos canais apresentados; nao criar lista completa de
FAQ nesta spec.

## Testes automatizados

Adicionar:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "versao compativel",
    "@testing-library/react": "versao compativel",
    "@testing-library/user-event": "versao compativel",
    "jsdom": "versao compativel",
    "vitest": "versao compativel"
  }
}
```

Nao fixar versoes por memoria. Durante a implementacao, verificar versoes
compativeis com Vite 7, TypeScript 5.9 e Node suportado pelo projeto.

Cenarios obrigatorios:

1. home renderiza um `h1`, os dois CTAs e quatro etapas;
2. CTAs e etapas possuem os destinos documentados; para
   `/explorar-por-etapas`, validar o `href` sem exigir o registro da pagina da
   feature 003;
3. header exibe quatro itens e nao exibe `Material de apoio`;
4. `Inicio` recebe `aria-current="page"` na home;
5. menu movel alterna `aria-expanded` e fecha ao navegar;
6. footer nao possui links vazios ou `#` generico;
7. `Simular publicacao` exibe a copy aprovada e aponta para
   `/tutorial-paraiba-digital`, fluxo de cadastro manual;
8. nenhuma chamada de rede ou persistencia e disparada pela home.

## Regras de implementacao

- Reconsultar e baixar assets do Figma somente em `/spec:implementar`.
- Inspecionar cada imagem antes de nomear e versionar.
- Nao copiar Tailwind nem instalar biblioteca de UI.
- Nao usar posicionamento absoluto para reproduzir a pagina inteira.
- Nao implementar FAQ, diagnostico, formulario, tutorial ou suporte completos.
- Nao implementar a pagina `Explorar por etapas` nesta feature; somente manter
  o link para a rota que sera entregue pela feature 003.
- Nao incluir `Material de apoio` na header.
- Nao usar texto que sugira publicacao automatica no Paraiba Digital.
- Preservar Ctrl/Cmd+click e demais comportamentos nativos dos links.
- Manter exatamente um `h1` na home.
- Usar listas para navegacao e etapas.
- Usar `alt=""` somente em imagens decorativas; logos e arte informativa devem
  ter texto alternativo.
- Garantir alvos de toque de pelo menos 44 por 44 px.
- Nao persistir nenhum dado e nao adicionar chamadas de backend.
- Preservar paginas placeholder fora do escopo.

## Ordem de implementacao

1. Baixar, inspecionar e nomear assets.
2. Adicionar testes e setup.
3. Criar tipos e conteudo versionado.
4. Ajustar navegacao da aplicacao e fragmentos.
5. Criar `Brand`, `MainNavigation` e `SiteFooter`.
6. Evoluir `ButtonLink` e `AppShell`.
7. Implementar `HomePage` e a ancora minima em `AjudaPage`.
8. Atualizar tokens e estilos responsivos.
9. Implementar testes.
10. Executar verificacoes tecnicas, acessiveis e visuais.
11. Atualizar os checkboxes de `tasks.md` somente com evidencia.

## Validacao tecnica

Executar:

```txt
npm run typecheck
npm run test
npm run build
```

Verificar ainda:

- ausencia de erros e avisos relevantes no console;
- todos os links internos com destino valido;
- navegacao de historico, recarga direta e fragmentos;
- nenhuma URL temporaria do Figma no bundle;
- nenhum asset desenhado manualmente para substituir icone do Figma.

## Validacao visual e responsiva

- comparar a home em 1440 px com o node `310:175`;
- testar 1024, 768, 390 e 320 px;
- confirmar ausencia de scroll horizontal;
- confirmar hero em duas colunas no desktop e uma coluna no mobile;
- confirmar quatro etapas em linha, depois duas colunas e finalmente uma coluna;
- confirmar menu movel sem sobreposicao e com ajuda acessivel;
- confirmar footer legivel e sem cortes;
- testar zoom de 200%;
- registrar divergencias intencionais: ausencia de `Material de apoio`, texto de
  publicacao manual e adaptacoes responsivas nao fornecidas pelo frame desktop.

## Validacao de acessibilidade

- percorrer todos os controles com Tab e Shift+Tab;
- acionar menu e links com teclado;
- verificar foco visivel sobre fundos claro, azul e creme;
- verificar `aria-current`, `aria-expanded`, landmarks e nomes acessiveis;
- confirmar ordem de leitura: header, hero, processo, CTA e footer;
- testar os fragmentos com foco no destino;
- verificar contraste WCAG 2.1 AA;
- testar `prefers-reduced-motion`;
- verificar texto alternativo dos dois rasters informativos.

## Criterio para iniciar implementacao

A implementacao pode comecar quando:

- este arquivo passar por `/spec:validar 002-home-e-navegacao`;
- eventuais divergencias de tokens e assets estiverem resolvidas;
- as tarefas T001–T005 estiverem marcadas com evidencia;
- nao houver mudanca pendente de escopo sobre FAQ, materiais de apoio ou fluxo
  inicial.

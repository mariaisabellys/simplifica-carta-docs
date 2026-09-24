# Implementation Plan: Explorar por Etapas

## Status

Validado documentalmente em 24 de setembro de 2026, sem bloqueios abertos.
Pronto para `/spec:implementar 003-explorar-por-etapas`.

## Fontes consultadas

- spec: `specs/003-explorar-por-etapas/spec.md`;
- plano: `specs/003-explorar-por-etapas/plan.md`;
- tarefas: `specs/003-explorar-por-etapas/tasks.md`;
- constitution: `docs/processo/constitution.md`;
- MVP e fluxos: `docs/produto/mvp.md` e `docs/produto/fluxos.md`;
- mapa e tokens: `docs/design-system/mapa-figma-telas.md` e
  `docs/design-system/tokens-e-componentes.md`;
- estrategia: `docs/implementation-plan.md`;
- planos e contratos previstos na feature `002-home-e-navegacao`;
- codigo React, rotas, shell, componentes, conteudo e CSS existentes em `src/`;
- Figma Design, consultado via `get_design_context`:
  - `fileKey`: `YaVUdqYa3boHpvGrxf4ZJ5`;
  - `nodeId`: `575:483`;
  - nome: `explorar-por-etapas-v2`;
- Figma Make, consultado via `get_design_context`:
  - `fileKey`: `dVm7lEZdBFqOiiySWLWUqp`;
  - `nodeId`: `0:1`;
  - fonte estruturada exposta em `src/App.tsx`, `src/index.css` e
    `design-system-spec.md`.

O retorno do Figma foi tratado como referencia. Classes Tailwind, coordenadas
absolutas e alturas rigidas do frame nao devem ser copiadas para o projeto.

## Objetivo da implementacao

Disponibilizar `/explorar-por-etapas` como pagina responsiva de acesso livre as
quatro etapas do cadastro da Carta de Servicos. A entrega deve seguir a
hierarquia do frame `575:483`, usar conteudo versionado e links reais, reutilizar
o shell compartilhado e nao criar progresso, persistencia, backend ou logica
das paginas de destino.

## Diagnostico do codigo atual

No momento da criacao deste plano:

- a feature 002 ainda nao esta implementada no codigo;
- `AppShell` ainda deriva a navegacao de `showInNav` e possui header/footer
  placeholders;
- `App` controla o pathname com `window.history`, mas nao disponibiliza
  `navigate` para componentes descendentes;
- `ButtonLink` renderiza um link comum e aceita apenas `primary` e `secondary`;
- `.site-main` limita todas as paginas a 1120 px, impedindo faixas de largura
  total como o hero;
- nao existe breadcrumb compartilhado;
- a rota e a pagina desta feature ainda nao existem;
- nao ha Vitest, Testing Library ou ambiente jsdom configurados.

A implementacao deve preferir o resultado real da feature 002 caso ela seja
executada antes. Se a 003 for implementada sobre o estado atual, deve aplicar o
subconjunto minimo de infraestrutura compartilhada descrito neste plano, sem
recriar header ou footer dentro da pagina.

## Decisoes fechadas

- Stack: React 19, TypeScript e CSS global com tokens; nao instalar Tailwind.
- O `AppShell` continua sendo o unico dono de header, `main` e footer.
- A pagina usa uma faixa de hero em largura total e containers internos de no
  maximo 1280 px.
- Os quatro cards serao renderizados por uma lista ordenada em um unico grid;
  nao reproduzir as duas linhas como estruturas independentes.
- A ordem do DOM sera sempre 1, 2, 3 e 4.
- Cards nao recebem estado de progresso, bloqueio, selecao ou conclusao.
- Conteudo, identificadores, tons, icones e destinos ficam em arquivo
  versionado e tipado.
- Criar `ExploreStepCard`, pois o padrao se repete quatro vezes e possui contrato
  e variacoes proprias.
- Criar `Breadcrumb`, pois e um padrao compartilhavel por paginas internas.
- Manter hero e CTA final em `ExplorarPorEtapasPage.tsx`; nao criar componentes
  de uso unico sem logica propria.
- Usar os SVGs exportados do Figma para os quatro icones e para cada um dos
  dois chevrons distintos.
- Icones e chevrons sao decorativos e usam `alt=""`/`aria-hidden="true"`.
- O CTA final e um link de variante `outline-navy`.
- Os links dos cards usam a cor semantica do respectivo card.
- O tutorial deve dizer explicitamente que o cadastro final e manual no
  Paraiba Digital.
- A copy do Figma e provisoria ate aprovacao editorial, mas ja deve ficar
  isolada no arquivo de conteudo.
- Se a infraestrutura de testes continuar ausente, esta feature adicionara
  Vitest, Testing Library, `jest-dom` e jsdom.

## Mapeamento visual do Figma Design

O frame desktop possui 1440 px de largura e esta organizado assim:

| Regiao | Referencia observada | Adaptacao para o projeto |
| --- | --- | --- |
| Header | 65 px, fundo branco, marca a esquerda e navegacao a direita | Reutilizar exclusivamente o shell da feature 002 |
| Hero | gradiente navy para azul, padding horizontal de 80 px e vertical de 64 px | Faixa de largura total com container interno e padding responsivo |
| Breadcrumb | 14 px, inicio azul claro, chevron de 10 px e pagina atual branca | `nav` acessivel antes do titulo |
| Titulo | Inter Black, 46 px, branco | Inter via `--font-display` e `clamp(2.25rem, 4vw, 2.875rem)` |
| Introducao | 18 px, linha 1.6, azul muito claro | largura fluida e maximo legivel, sem altura fixa |
| Area de cards | fundo branco, padding superior de 80 px, container de 1280 px | secao com container e grid 2×2 |
| Cards | 420 px no frame, padding 32 px, raio 24 px, borda e sombra leve | `min-height` somente no desktop; altura cresce com conteudo |
| Cabecalho do card | icone 48 px a esquerda e badge a direita | flex com quebra segura e sem sobreposicao |
| Badge | capsula, 12 px bold, texto branco | texto `ETAPA N`, nao apenas cor |
| Titulo do card | 22 px extra bold na cor da etapa | `h2` ou `h3` conforme hierarquia final |
| Descricao | 15 px, linha 1.6, `#475569` | texto versionado e fluido |
| Acao do card | largura total, 48 px aproximados, raio 8 px | link de acao com altura minima de toque |
| CTA inferior | texto central e botao branco com borda navy de 2 px | secao separada depois da lista |
| Footer | navy escuro, quatro blocos | reutilizar o footer da feature 002; omitir itens fora do MVP |

### Conteudo confirmado no frame

- titulo: `Explorar por etapas`;
- introducao: acesso direto a qualquer parte do manual sem seguir o fluxo
  completo;
- `ETAPA 1` — `Identificar um servico` — `Iniciar diagnostico`;
- `ETAPA 2` — `Organizar informacoes` — `Ver lista de informacoes`;
- `ETAPA 3` — `Elaborar a Carta` — `Elaborar e conferir`;
- `ETAPA 4` — `Tutorial de publicacao` — `Ver tutorial`;
- chamada inferior: preferencia pelo fluxo completo de forma linear;
- acao inferior: `Ir para o guia passo a passo`.

Aplicar acentuacao correta em portugues no conteudo implementado.

## Mapeamento de tokens

Os valores abaixo foram confirmados no node `575:483`. Devem ser reconciliados
com os tokens criados pela feature 002 antes de adicionar novos nomes.

| Uso | Token planejado | Valor |
| --- | --- | --- |
| Hero inicial | `--color-explore-hero-start` | `#022b45` |
| Hero intermediario | `--color-explore-hero-middle` | `#094c6d` |
| Hero final | `--color-explore-hero-end` | `#0e6c91` |
| Texto do breadcrumb | `--color-explore-breadcrumb` | `#8fbce5` |
| Texto do hero | `--color-explore-hero-text` | `#e2f1ff` |
| Texto dos cards | `--color-explore-muted` | `#475569` |
| Borda dos cards | reutilizar `--color-border-default` | `#e2e8f0` |
| Etapa 1 | `--color-explore-step-1` | `#0088a5` |
| Fundo do icone 1 | `--color-explore-step-1-soft` | `#e1ffff` |
| Etapa 2 | `--color-explore-step-2` | `#f97304` |
| Fundo do icone 2 | `--color-explore-step-2-soft` | `#fff2e1` |
| Etapa 3 | `--color-explore-step-3` | `#0f3f67` |
| Fundo do icone 3 | `--color-explore-step-3-soft` | `#e2e8f0` |
| Etapa 4 | `--color-explore-step-4` | `#7c1b1f` |
| Fundo do icone 4 | `--color-explore-step-4-soft` | `#f9eff1` |
| Raio do card | `--radius-explore-card` | `24px` |
| Raio do icone | `--radius-explore-icon` | `16px` |
| Raio de controles | reutilizar `--radius-md` | `8px` |
| Sombra do card | `--shadow-explore-card` | `0 8px 12px rgba(15, 23, 42, 0.03)` |
| Sombra do CTA | `--shadow-explore-cta` | `0 4px 6px rgba(15, 23, 42, 0.02)` |
| Container | reutilizar/criar `--container-wide` | `1280px` |

Tipografia:

- Inter e a familia principal de todo o projeto;
- `--font-display` e `--font-body` usam `"Inter", system-ui, sans-serif`;
- titulo principal e titulos dos cards usam pesos Black/ExtraBold quando
  disponiveis, com `font-weight: 900` e `800` respectivamente;
- corpo, breadcrumb, badges e botoes tambem usam Inter;
- Outfit, Rawline e Source Sans 3 nao devem ser reintroduzidas nesta feature.

Gradiente planejado:

```css
--gradient-explore-hero: linear-gradient(
  90deg,
  var(--color-explore-hero-start),
  var(--color-explore-hero-middle) 50%,
  var(--color-explore-hero-end)
);
```

Estados `hover` e `active` nao devem ser obtidos apenas escurecendo
arbitrariamente a cor. Usar `color-mix()` com preto em proporcoes pequenas ou
tokens confirmados pela base final da feature 002. `focus-visible` deve manter o
anel global de alto contraste e nao ser removido pelo fundo colorido.

## Inventario de assets

O `get_design_context` retornou os seguintes vetores relevantes:

| Asset | Node | Arquivo local planejado | Uso |
| --- | --- | --- | --- |
| Help circle | `575:603` | `src/assets/explorar-por-etapas/help-circle.svg` | Etapa 1, decorativo |
| Check square | `575:600` | `src/assets/explorar-por-etapas/check-square.svg` | Etapa 2, decorativo |
| File text | `575:609` | `src/assets/explorar-por-etapas/file-text.svg` | Etapa 3, decorativo |
| Book open | `575:615` | `src/assets/explorar-por-etapas/book-open.svg` | Etapa 4, decorativo |
| Chevron do breadcrumb | `575:594` (`imgChevronRight`) | `src/assets/explorar-por-etapas/chevron-breadcrumb.svg` | Separador do breadcrumb, 10 × 10 px, decorativo |
| Chevron de acao | `575:597`, `575:606`, `575:612`, `575:618` (`imgChevronRight1`) | `src/assets/explorar-por-etapas/chevron-action.svg` | Botoes dos cards, 16 × 16 px, decorativo |

O logo institucional `SEMTD-branco` e os demais elementos do footer pertencem
ao shell da feature 002 e nao devem ser baixados novamente por esta feature.
Linhas, fundos, badges e capsulas sao geometria simples e devem ser CSS.

As URLs retornadas pelo MCP expiram. Durante `/spec:implementar`, chamar
`download_assets` para o node `575:483`, salvar os bytes exatos e inspecionar os
arquivos antes de nomea-los. Nunca manter URL `figma.com/api/mcp/asset` no
codigo e nunca recriar os SVGs manualmente.

## Arquivos a alterar

- `package.json` — adicionar scripts/dependencias de teste somente se ainda
  ausentes;
- `vite.config.ts` — configurar ambiente jsdom, quando necessario;
- `src/app/App.tsx` — prover navegacao compartilhada e restaurar foco, somente
  se a feature 002 ainda nao tiver feito isso;
- `src/app/routes.tsx` — registrar a nova pagina;
- `src/components/ui/ButtonLink.tsx` — usar navegacao compartilhada, aceitar
  icone e variante `outline-navy`, se a 002 nao tiver contrato equivalente;
- `src/styles/tokens.css` — adicionar tokens confirmados e nao existentes;
- `src/styles/globals.css` — estilos da pagina, cards e responsividade, ou os
  arquivos CSS consolidados pela feature 002.

## Arquivos a criar

- `src/pages/ExplorarPorEtapasPage.tsx`;
- `src/pages/ExplorarPorEtapasPage.test.tsx`;
- `src/components/explorar/ExploreStepCard.tsx`;
- `src/components/ui/Breadcrumb.tsx`, se ainda nao existir;
- `src/content/pages/explorar-por-etapas.ts`;
- `src/types/explorar.ts`;
- `src/assets/explorar-por-etapas/help-circle.svg`;
- `src/assets/explorar-por-etapas/check-square.svg`;
- `src/assets/explorar-por-etapas/file-text.svg`;
- `src/assets/explorar-por-etapas/book-open.svg`;
- `src/assets/explorar-por-etapas/chevron-breadcrumb.svg`;
- `src/assets/explorar-por-etapas/chevron-action.svg`;
- `src/app/NavigationContext.tsx`, somente se ainda nao existir;
- `src/test/setup.ts`, somente se ainda nao existir.

## Contratos TypeScript

### `src/types/explorar.ts`

```ts
export type ExploreStepId =
  | "identificar-servico"
  | "organizar-informacoes"
  | "elaborar-carta"
  | "tutorial-publicacao";

export type ExploreStepTone = "cyan" | "orange" | "navy" | "wine";

export type ExploreStepHref =
  | "/diagnostico"
  | "/organizar-informacoes"
  | "/formulario-carta"
  | "/tutorial-paraiba-digital";

export type ExploreStep = {
  id: ExploreStepId;
  number: 1 | 2 | 3 | 4;
  tone: ExploreStepTone;
  iconSrc: string;
  title: string;
  description: string;
  actionLabel: string;
  href: ExploreStepHref;
};

export type BreadcrumbItem = {
  label: string;
  href?: "/";
};
```

### Props dos componentes

```ts
type ExploreStepCardProps = {
  step: ExploreStep;
};

type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  iconSrc?: string;
  variant?: "primary" | "secondary" | "outline-navy" | "step";
  tone?: ExploreStepTone;
};
```

`tone` deve gerar uma classe de conjunto fechado, nunca um valor CSS arbitrario
recebido do conteudo.

## Conteudo base

### `src/content/pages/explorar-por-etapas.ts`

```ts
import bookOpen from "../../assets/explorar-por-etapas/book-open.svg";
import checkSquare from "../../assets/explorar-por-etapas/check-square.svg";
import fileText from "../../assets/explorar-por-etapas/file-text.svg";
import helpCircle from "../../assets/explorar-por-etapas/help-circle.svg";
import type { BreadcrumbItem, ExploreStep } from "../../types/explorar";

export const exploreBreadcrumb = [
  { label: "Inicio", href: "/" },
  { label: "Explorar por etapas" },
] as const satisfies readonly BreadcrumbItem[];

export const explorePageContent = {
  title: "Explorar por etapas",
  introduction:
    "Acesse qualquer parte do manual diretamente, sem precisar seguir o fluxo completo. Escolha a etapa de que voce precisa para agilizar a criacao da sua Carta de Servico.",
  guidePrompt: "Prefere seguir o fluxo completo do manual de forma linear?",
  guideAction: "Ir para o guia passo a passo",
  guideHref: "/diagnostico",
} as const;

export const exploreSteps = [
  {
    id: "identificar-servico",
    number: 1,
    tone: "cyan",
    iconSrc: helpCircle,
    title: "Identificar um servico",
    description:
      "Descubra se a atividade que deseja cadastrar e realmente um servico publico por meio de um breve diagnostico.",
    actionLabel: "Iniciar diagnostico",
    href: "/diagnostico",
  },
  {
    id: "organizar-informacoes",
    number: 2,
    tone: "orange",
    iconSrc: checkSquare,
    title: "Organizar informacoes",
    description:
      "Reuna previamente as informacoes e os documentos necessarios para elaborar a Carta de Servicos.",
    actionLabel: "Ver lista de informacoes",
    href: "/organizar-informacoes",
  },
  {
    id: "elaborar-carta",
    number: 3,
    tone: "navy",
    iconSrc: fileText,
    title: "Elaborar a Carta",
    description:
      "Preencha, revise, visualize e prepare os dados da Carta de Servicos para a etapa de publicacao.",
    actionLabel: "Elaborar e conferir",
    href: "/formulario-carta",
  },
  {
    id: "tutorial-publicacao",
    number: 4,
    tone: "wine",
    iconSrc: bookOpen,
    title: "Tutorial de publicacao",
    description:
      "Veja como cadastrar manualmente o servico na plataforma oficial Paraiba Digital, passo a passo.",
    actionLabel: "Ver tutorial",
    href: "/tutorial-paraiba-digital",
  },
] as const satisfies readonly ExploreStep[];
```

Aplicar acentuacao final diretamente neste arquivo durante a implementacao. O
trecho acima evita transformar componentes em fonte editorial.

## Codigo base dos componentes

### `src/components/explorar/ExploreStepCard.tsx`

```tsx
import chevronAction from "../../assets/explorar-por-etapas/chevron-action.svg";
import type { ExploreStep } from "../../types/explorar";
import { ButtonLink } from "../ui/ButtonLink";

type ExploreStepCardProps = {
  step: ExploreStep;
};

export function ExploreStepCard({ step }: ExploreStepCardProps) {
  return (
    <li className={`explore-card explore-card--${step.tone}`}>
      <article className="explore-card__body">
        <div className="explore-card__header">
          <span className="explore-card__icon" aria-hidden="true">
            <img src={step.iconSrc} alt="" width="24" height="24" />
          </span>
          <span className="explore-card__badge">Etapa {step.number}</span>
        </div>

        <div className="explore-card__content">
          <h2>{step.title}</h2>
          <p>{step.description}</p>
        </div>

        <ButtonLink
          href={step.href}
          iconSrc={chevronAction}
          tone={step.tone}
          variant="step"
        >
          {step.actionLabel}
        </ButtonLink>
      </article>
    </li>
  );
}
```

O `<li>` nao deve receber `display: contents`, pois isso pode prejudicar a
semantica em algumas combinacoes de navegador e tecnologia assistiva.

### `src/components/ui/Breadcrumb.tsx`

```tsx
import chevronBreadcrumb from "../../assets/explorar-por-etapas/chevron-breadcrumb.svg";
import type { BreadcrumbItem } from "../../types/explorar";
import { useNavigation } from "../../app/NavigationContext";

type BreadcrumbProps = {
  items: readonly BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  const { navigate } = useNavigation();

  return (
    <nav className="breadcrumb" aria-label="Navegacao estrutural">
      <ol>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li key={item.label}>
              {item.href ? (
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(item.href!);
                  }}
                >
                  {item.label}
                </a>
              ) : (
                <span aria-current={isCurrent ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isCurrent && (
                <img aria-hidden="true" alt="" src={chevronBreadcrumb} width="10" height="10" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

Se a feature 002 fornecer um `Link` compartilhado, substituir o manipulador
manual por esse componente.

### `src/pages/ExplorarPorEtapasPage.tsx`

```tsx
import { ExploreStepCard } from "../components/explorar/ExploreStepCard";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ButtonLink } from "../components/ui/ButtonLink";
import {
  exploreBreadcrumb,
  explorePageContent,
  exploreSteps,
} from "../content/pages/explorar-por-etapas";

export function ExplorarPorEtapasPage() {
  return (
    <div className="explore-page">
      <header className="explore-hero">
        <div className="explore-container">
          <Breadcrumb items={exploreBreadcrumb} />
          <h1 tabIndex={-1}>{explorePageContent.title}</h1>
          <p>{explorePageContent.introduction}</p>
        </div>
      </header>

      <section className="explore-steps" aria-label="Etapas do cadastro">
        <div className="explore-container">
          <ol className="explore-grid">
            {exploreSteps.map((step) => (
              <ExploreStepCard key={step.id} step={step} />
            ))}
          </ol>
        </div>
      </section>

      <section className="explore-guide-cta" aria-labelledby="guide-cta-title">
        <p id="guide-cta-title">{explorePageContent.guidePrompt}</p>
        <ButtonLink href={explorePageContent.guideHref} variant="outline-navy">
          {explorePageContent.guideAction}
        </ButtonLink>
      </section>
    </div>
  );
}
```

O `tabIndex={-1}` deve permanecer somente se o `App` direcionar o foco ao `h1`
apos mudanca de rota. Caso o shell use foco no `main`, remover esse atributo.

## Integracao de rota e navegacao

### Entrada em `src/app/routes.tsx`

```tsx
import { ExplorarPorEtapasPage } from "../pages/ExplorarPorEtapasPage";

// Depois da home, sem showInNav:
{
  path: "/explorar-por-etapas",
  label: "Explorar por etapas",
  Component: ExplorarPorEtapasPage,
  figmaNodeId: "575:483",
  specId: "003-explorar-por-etapas",
  layoutType: "page",
},
```

### Contrato minimo de navegacao

Se `NavigationContext` ainda nao existir, extrair o `navigate` de `App` para um
provider compartilhado. O metodo deve:

1. preservar `href` nos elementos;
2. chamar `history.pushState` somente para navegacao interna sem modificadores;
3. atualizar pathname e hash;
4. rolar para o topo quando nao houver fragmento;
5. depois da renderizacao, focar o `h1` ou o `main` sem rolagem adicional;
6. continuar respondendo a `popstate`.

Nao interceptar clique com `Meta`, `Ctrl`, `Shift`, `Alt`, botao diferente do
principal, `target` externo ou download.

## CSS base

O CSS abaixo e base estrutural. Valores devem usar os tokens finais e ser
ajustados por comparacao visual.

```css
.site-main:has(.explore-page) {
  width: 100%;
  padding: 0;
}

.explore-page {
  background: var(--color-background-default);
}

.explore-container {
  width: min(var(--container-wide), calc(100% - 2 * var(--space-6)));
  margin-inline: auto;
}

.explore-hero {
  padding-block: var(--space-16);
  color: var(--color-text-inverse);
  background: var(--gradient-explore-hero);
}

.explore-hero h1 {
  margin: var(--space-6) 0 var(--space-4);
  color: inherit;
  font-size: clamp(2.25rem, 4vw, 2.875rem);
}

.explore-hero > .explore-container > p {
  max-width: 70rem;
  margin: 0;
  color: var(--color-explore-hero-text);
  font-size: 1.125rem;
  line-height: 1.6;
}

.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumb li {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.breadcrumb a {
  color: var(--color-explore-breadcrumb);
}

.breadcrumb [aria-current="page"] {
  color: var(--color-text-inverse);
  font-weight: 600;
}

.breadcrumb img {
  width: 0.625rem;
  height: 0.625rem;
}

.explore-steps {
  padding-block: var(--space-20) var(--space-12);
}

.explore-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-8);
  margin: 0;
  padding: 0;
  list-style: none;
}

.explore-card {
  min-width: 0;
}

.explore-card__body {
  display: flex;
  min-height: 26.25rem;
  height: 100%;
  flex-direction: column;
  padding: var(--space-8);
  background: var(--color-background-default);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-explore-card);
  box-shadow: var(--shadow-explore-card);
}

.explore-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.explore-card__icon {
  display: grid;
  width: 3rem;
  height: 3rem;
  place-items: center;
  background: var(--step-soft);
  border-radius: var(--radius-explore-icon);
}

.explore-card__icon img {
  width: 1.5rem;
  height: 1.5rem;
}

.explore-card__badge {
  padding: 0.375rem 0.75rem;
  color: var(--color-text-inverse);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: var(--step-color);
  border-radius: 999px;
}

.explore-card__content {
  margin-block: var(--space-5) var(--space-8);
}

.explore-card__content h2 {
  margin-bottom: var(--space-3);
  color: var(--step-color);
  font-size: 1.375rem;
}

.explore-card__content p {
  margin: 0;
  color: var(--color-explore-muted);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.explore-card .button-link {
  width: 100%;
  margin-top: auto;
}

.explore-card--cyan {
  --step-color: var(--color-explore-step-1);
  --step-soft: var(--color-explore-step-1-soft);
}

.explore-card--orange {
  --step-color: var(--color-explore-step-2);
  --step-soft: var(--color-explore-step-2-soft);
}

.explore-card--navy {
  --step-color: var(--color-explore-step-3);
  --step-soft: var(--color-explore-step-3-soft);
}

.explore-card--wine {
  --step-color: var(--color-explore-step-4);
  --step-soft: var(--color-explore-step-4-soft);
}

.button-link--step {
  min-height: 3rem;
  color: var(--color-text-inverse);
  background: var(--step-color);
}

.explore-guide-cta {
  display: grid;
  justify-items: center;
  gap: var(--space-5);
  padding: var(--space-12) var(--space-6) var(--space-20);
  text-align: center;
}

.explore-guide-cta p {
  margin: 0;
  color: var(--color-explore-muted);
  font-weight: 600;
}

.button-link--outline-navy {
  color: var(--color-explore-step-3);
  background: var(--color-background-default);
  border: 2px solid var(--color-explore-step-3);
  box-shadow: var(--shadow-explore-cta);
}

@media (max-width: 760px) {
  .explore-container {
    width: min(100% - 2 * var(--space-4), var(--container-wide));
  }

  .explore-hero {
    padding-block: var(--space-10);
  }

  .explore-grid {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .explore-card__body {
    min-height: 0;
    padding: var(--space-6);
  }

  .explore-guide-cta .button-link {
    width: 100%;
  }
}
```

Se o suporte alvo nao aceitar `:has()`, o `AppShell` deve receber uma classe de
layout derivada de `route.layoutType` e aplicar largura total por essa classe.
Preferir essa solucao explicita se a feature 002 ja a oferecer.

## Responsividade

- acima de 1024 px: grid de duas colunas, gap de 32 px e padding de 32 px nos
  cards;
- entre 761 e 1024 px: duas colunas se cada card mantiver pelo menos 320 px;
  reduzir padding para 24 px se necessario;
- ate 760 px: uma coluna, hero e CTA com padding reduzido;
- em 320 px: badge e icone podem quebrar para duas linhas somente se necessario,
  sem inverter a ordem;
- nenhum elemento usa largura fixa de 1280 px; o container e fluido;
- botoes podem quebrar texto e devem manter altura minima de 44 px;
- a ordem visual nunca deve ser obtida com `order` ou posicionamento absoluto.

## Testes automatizados

Se a feature 002 ainda nao tiver configurado testes, adicionar:

- `vitest`;
- `@testing-library/react`;
- `@testing-library/jest-dom`;
- `@testing-library/user-event`;
- `jsdom`.

Scripts:

```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

Cenarios obrigatorios em `ExplorarPorEtapasPage.test.tsx`:

1. renderiza exatamente um `h1` com `Explorar por etapas`;
2. renderiza uma lista com quatro itens na ordem esperada;
3. mostra `Etapa 1`, `Etapa 2`, `Etapa 3` e `Etapa 4` textualmente;
4. valida rotulo e `href` dos quatro links de etapa;
5. valida o CTA final com `href="/diagnostico"`;
6. valida breadcrumb com link para `/` e item atual;
7. confirma que os icones possuem `alt=""`;
8. confirma que nao existem termos ou controles de progresso, conclusao ou
   bloqueio;
9. confirma que o texto do tutorial menciona cadastro manual;
10. confirma que a pagina nao renderiza `Materiais de apoio` nem
    `Guia de Linguagem Simples`.

Os testes de integracao do `App` devem validar resolucao da rota, navegacao
interna, `popstate` e restauracao de foco se essa infraestrutura for adicionada
nesta feature.

## Regras de implementacao

- Nao alterar a ordem ou os destinos definidos na spec.
- Nao criar estado React para progresso, etapa ativa ou conclusao.
- Nao acessar `sessionStorage`, `localStorage`, contexto da Carta ou backend.
- Nao bloquear links porque uma pagina de destino ainda e placeholder.
- Nao implementar diagnostico, checklist, formulario ou tutorial nesta pagina.
- Nao expor `Materiais de apoio` ou `Guia de Linguagem Simples`.
- Nao sugerir publicacao automatica ou integracao direta com o Paraiba Digital.
- Nao usar altura fixa no mobile nem truncar textos editoriais.
- Nao inserir SVG manual, emoji ou icone aproximado no lugar dos assets.
- Nao adicionar dependencia de Tailwind, React Router ou biblioteca de UI.
- Preservar alteracoes existentes e adaptar o plano ao resultado real da 002.

## Ordem de implementacao

1. verificar novamente o estado da feature 002 e reconciliar contratos;
2. baixar e inspecionar os assets reais do node `575:483`;
3. configurar testes, se ainda ausentes;
4. criar tipos e conteudo versionado;
5. criar/reutilizar navegacao compartilhada e breadcrumb;
6. evoluir `ButtonLink` sem quebrar consumidores existentes;
7. implementar `ExploreStepCard`;
8. montar `ExplorarPorEtapasPage`;
9. registrar a rota;
10. adicionar tokens e CSS responsivo;
11. executar testes, typecheck e build;
12. validar visualmente e por teclado.

## Criterios de validacao

### Funcionais

- `/explorar-por-etapas` resolve a nova pagina por link, URL direta e recarga;
- breadcrumb volta para `/`;
- existem exatamente quatro cards na ordem oficial;
- os quatro links e o CTA final apontam para os destinos definidos na spec;
- qualquer etapa pode ser aberta sem estado anterior;
- a pagina nao modifica dados da Carta.

### Visuais e responsivos

- desktop reproduz hero, grid 2×2, cards e CTA do node `575:483`;
- 1024, 768, 390 e 320 px nao apresentam corte, sobreposicao ou scroll
  horizontal;
- cards crescem quando o texto quebra;
- CTA permanece visivel e legivel;
- divergencias de MVP no header/footer sao intencionais e registradas.

### Acessibilidade

- exatamente um `h1`;
- breadcrumb usa `nav`, lista e `aria-current="page"`;
- lista de etapas preserva ordem semantica 1 a 4;
- todos os links funcionam por teclado e possuem foco visivel;
- nomes de acao sao claros no contexto;
- icones decorativos sao ignorados por leitores de tela;
- informacao nao depende de cor;
- contraste atende WCAG 2.1 AA;
- zoom de 200% e reflow permanecem utilizaveis.

### Tecnicos

- `npm run test` aprovado, quando configurado;
- `npm run typecheck` aprovado;
- `npm run build` aprovado;
- sem erro no console;
- sem URL temporaria do Figma no codigo;
- sem dependencia nova fora da infraestrutura de testes aprovada;
- sem alteracoes de backend, armazenamento ou schema da Carta.

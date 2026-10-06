# Implementation Plan: O que e a Carta de Servicos

## Status

Revisado em 25 de setembro de 2026 com a copy aprovada e versionada. O bloqueio
editorial anterior foi resolvido; nao ha bloqueio documental aberto para o
conteudo.

## Fontes consultadas

- spec: `specs/004-o-que-e-carta-servico/spec.md`;
- plano: `specs/004-o-que-e-carta-servico/plan.md`;
- tarefas: `specs/004-o-que-e-carta-servico/tasks.md`;
- constitution: `docs/processo/constitution.md`;
- produto: `docs/produto/visao-produto.md`, `docs/produto/mvp.md` e
  `docs/produto/fluxos.md`;
- arquitetura: `docs/arquitetura/arquitetura-sistema.md`;
- design system: `docs/design-system/mapa-figma-telas.md` e
  `docs/design-system/tokens-e-componentes.md`;
- estrategia geral: `docs/implementation-plan.md`;
- planos das features 002 e 003;
- codigo React, rotas, shell, componentes, conteudo e CSS existentes em `src/`;
- Figma Design, consultado via `get_design_context` com screenshot:
  - `fileKey`: `YaVUdqYa3boHpvGrxf4ZJ5`;
  - `nodeId`: `365:265`;
  - nome: `O que e a Carta?`;
- nodes filhos consultados em alta fidelidade:
  - `373:313` — introducao;
  - `377:387` — fundamentos;
  - `411:218` — legislacao;
- Figma Make, consultado via `get_design_context`:
  - `fileKey`: `dVm7lEZdBFqOiiySWLWUqp`;
  - `nodeId`: `0:1`;
- fontes oficiais da Presidencia da Republica:
  - [Lei nº 13.460/2017](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13460.htm);
  - [Decreto nº 9.094/2017](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/decreto/d9094.htm);
  - [Decreto nº 9.756/2019](https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d9756.htm).

O Figma Make retornou links para `src/App.tsx`, `src/index.css` e
`design-system-spec.md`, mas o conector nao permitiu ler esses recursos nesta
sessao. Os tokens deste plano combinam os valores observados no Figma Design
com o resumo versionado do design system. Antes de implementar, reconsultar o
Make se os recursos voltarem a ficar acessiveis.

## Objetivo da implementacao

Substituir o placeholder de `/o-que-e-carta-de-servicos` por uma pagina
educativa responsiva, fiel ao node `365:265`, composta por:

1. breadcrumb e introducao conceitual;
2. painel `Por que e importante?`;
3. faixa full-bleed `Fundamentos`;
4. dez cards sobre as informacoes de uma Carta;
5. tres referencias normativas com links externos seguros.

A pagina usa conteudo tipado e versionado, reaproveita o shell compartilhado e
nao consulta backend, armazenamento, progresso ou dados da Carta.

## Diagnostico do codigo atual

No momento da criacao deste plano:

- a feature 002 ainda nao foi implementada no codigo;
- `AppShell` deriva a navegacao de `showInNav` e possui header/footer
  placeholders;
- `App` controla o pathname por `window.history`, sem contexto de navegacao;
- `.site-main` limita todas as paginas a 1120 px e aplica padding proprio;
- nao existe componente `Breadcrumb`;
- `ButtonLink` nao integra a navegacao SPA;
- a rota 004 existe, mas ainda nao possui `figmaNodeId`;
- `OQueECartaPage.tsx` ainda usa `PageHeader` e `PlaceholderCard`;
- nao ha infraestrutura de testes automatizados;
- os 14 SVGs proprios da pagina ainda nao estao locais;
- Inter ja e a fonte principal em `src/styles/tokens.css`.

A implementacao deve preferir o resultado real da feature 002 caso ela seja
executada antes. Se a 004 for implementada sobre o estado atual, deve aplicar o
subconjunto minimo de infraestrutura compartilhada, sem duplicar header ou
footer dentro da pagina.

## Decisoes fechadas

- Stack: React 19, TypeScript e CSS global com tokens; nao instalar Tailwind.
- `AppShell` continua como unico dono de header, `main` e footer.
- A pagina recebe uma variante de layout full-bleed, com containers internos.
- A fonte principal e exclusivamente Inter, inclusive onde o frame menciona
  Outfit ou Rawline.
- A ordem do DOM segue a ordem de leitura do frame.
- Introducao, fundamentos, campos e legislacao sao `section` com titulos
  associados.
- Criar `ServiceInformationCard` e `LegalReferenceItem`, pois os padroes se
  repetem e possuem contratos proprios.
- Os paineis de importancia e fundamentos podem permanecer privados no arquivo
  da pagina, salvo reuso real identificado durante a implementacao.
- Os dez campos serao uma lista unica em CSS Grid; nao criar linhas separadas.
- As tres normas serao uma lista; cada acao sera link externo real.
- Nao adicionar CTA final, formulario, progresso ou estado React de negocio.
- O conteudo fica em `src/content/pages/o-que-e-carta.ts`.
- Os SVGs oficiais ficam em `src/assets/o-que-e-carta/`.
- Todos os icones sao decorativos porque os textos adjacentes comunicam o
  significado completo.
- `Material de apoio` nao entra na header.
- Os links legais usam `target="_blank"`, `rel="noopener noreferrer"` e nome
  acessivel que informa a nova aba.
- Se a infraestrutura de testes continuar ausente, esta feature adicionara
  Vitest, Testing Library, `jest-dom`, `user-event` e jsdom.

## Mapeamento visual do Figma Design

O frame possui 1440 × 2778 px. Coordenadas absolutas e alturas rigidas servem
apenas para leitura do prototipo.

| Regiao | Referencia observada | Adaptacao |
| --- | --- | --- |
| Header | 66 px, branco, item atual em laranja | Reutilizar a feature 002 |
| Introducao | 471 px; texto a esquerda e painel creme a direita | Grid fluido de duas colunas |
| Breadcrumb | 14 px, cinza/navy | `nav` com lista e `aria-current` |
| Eyebrow | 12 px, ciano, tracking amplo | Inter 700, caixa alta |
| H1 | 45 px, ExtraBold, destaque ciano | Inter 800, `clamp()` e `span` |
| Painel de importancia | 439 × 364 px, creme 70%, raio 20 px | Card fluido, tres itens empilhados |
| Fundamentos | 404 px, gradiente navy–azul | Faixa full-bleed com container interno |
| Paineis de fundamentos | dois cards de cerca de 508 × 152 px | Grid 2 colunas, bordas laranja/ciano |
| Campos | secao de 983 px, titulo 40 px | Altura automatica e padding responsivo |
| Cards de campo | 429 × 129 px, creme 57%, raio 20 px | Grid 3 colunas, conteudo fluido |
| Legislacao | 612 px, tres linhas de 101 px | Lista de linhas em desktop e cards no mobile |
| Footer | 243 px, navy escuro | Reutilizar a feature 002 |

### Ordem e conteudo confirmado

1. `O que é uma Carta de Serviço?` e seu subtitulo;
2. `Por que é importante?`, com cidadao, orgao e gestao;
3. `Fundamentos`, com cidadao e orgao publico;
4. `O que uma Carta de Serviço deve informar?`;
5. dez campos na ordem definida na spec;
6. `Legislação Aplicável`;
7. Lei nº 13.460/2017, Decreto nº 9.094/2017 e Decreto nº 9.756/2019.

Aplicar acentuacao correta em portugues no conteudo implementado.

## Validacao normativa

| Referencia | Confirmacao oficial | Decisao editorial |
| --- | --- | --- |
| Lei nº 13.460/2017 | URL oficial do Planalto registrada | Usar o resumo aprovado e versionado |
| Decreto nº 9.094/2017 | URL oficial do Planalto registrada | Usar o resumo aprovado que menciona a Lei nº 13.460/2017 e a simplificacao do atendimento |
| Decreto nº 9.756/2019 | URL oficial do Planalto registrada | Usar o resumo aprovado sobre o Portal Unico gov.br e a migracao de sitios e portais |

A obrigatoriedade da Carta possui suporte direto no art. 7 da Lei nº
13.460/2017. Para evitar extrapolacao, a copy deve dizer que os orgaos e
entidades abrangidos pela lei divulgam a Carta, em vez de formular uma
obrigacao sem sujeito ou alcance.

Copy aprovada e versionada:

- Lei nº 13.460/2017: `Dispoe sobre participacao, protecao e defesa dos direitos
  do usuario dos servicos publicos da administracao publica.`;
- Decreto nº 9.094/2017: `Regulamenta dispositivos da Lei nº 13.460/2017 e
  dispõe sobre simplificação do atendimento prestado aos usuários dos serviços
  públicos federais.`;
- Decreto nº 9.756/2019: `Institui o Portal Único “gov.br” e dispõe sobre as
  regras para migração dos sítios e portais da administração pública federal.`.

## Mapeamento de tokens

Reconciliar estes valores com os tokens finais da feature 002 antes de criar
novos nomes.

| Uso | Token planejado | Valor observado |
| --- | --- | --- |
| Navy de titulos | `--color-charter-navy` | `#00395b` |
| Navy secundario | `--color-charter-navy-alt` | `#0c326f` |
| Ciano | `--color-charter-cyan` | `#12b5d0` |
| Laranja | `--color-charter-orange` | `#f97304` |
| Texto secundario | `--color-charter-muted` | `#666666` |
| Borda | reutilizar `--color-border-default` ou ajustar | `#dddddd` |
| Fundo creme do painel | `--color-charter-cream-strong` | `rgba(255, 235, 209, 0.70)` |
| Fundo creme dos cards | `--color-charter-cream-soft` | `rgba(255, 235, 209, 0.57)` |
| Gradiente inicial | `--color-charter-gradient-start` | `#033a5d` |
| Gradiente intermediario | `--color-charter-gradient-middle` | `#0f3e66` |
| Gradiente final | `--color-charter-gradient-end` | `#0388af` |
| Raio principal | `--radius-charter-card` | `20px` |
| Container de fundamentos | reutilizar/criar `--container-content` | cerca de `1078px` no frame |
| Container dos campos | reutilizar/criar `--container-wide` | cerca de `1356px` no frame |

Gradiente:

```css
--gradient-charter-foundations: linear-gradient(
  90deg,
  var(--color-charter-gradient-start),
  var(--color-charter-gradient-middle) 50%,
  var(--color-charter-gradient-end)
);
```

Tipografia:

- familia: `var(--font-display)` e `var(--font-body)`, ambas Inter;
- H1: `clamp(2.25rem, 4vw, 2.8125rem)`, peso 800;
- H2 de campos: `clamp(2rem, 3.5vw, 2.5rem)`, peso 800;
- H2 de legislacao: `clamp(1.75rem, 3vw, 2.25rem)`, peso 700;
- titulo de card: 1.25rem, peso 700/800;
- corpo principal de fundamentos: 1.25rem no desktop, reduzido no mobile;
- corpo restante: 0.875rem a 1rem, com line-height minimo de 1.5.

Estados ausentes no frame devem seguir os contratos do Figma Make e do shell.
Nunca remover o `focus-visible` global. `Consultar` deve ganhar fundo ciano e
texto navy/branco no hover apenas se o contraste for validado.

## Inventario de assets

Os nomes de hash abaixo sao apenas rastreabilidade do retorno MCP. Na
implementacao, usar nomes semanticos e baixar novamente com `download_assets`.

| Node | Hash MCP | Arquivo local | Uso/tamanho do frame |
| --- | --- | --- | --- |
| `375:351` | `836f9.svg` | `importance-citizen.svg` | importancia, 24 × 24 |
| `375:354` e `375:357` | `026b5.svg` | `importance-check.svg` | orgao e gestao, 24 × 24 |
| `377:396` | `836f9.svg` | `foundation-citizen.svg` | fundamento cidadao, 24 × 24 |
| `377:403` | `dfe90.svg` | `foundation-agency.svg` | fundamento orgao, 25 × 25 |
| `388:448` | `dffc9.svg` | `field-name.svg` | nome, 35 × 35 |
| `388:474` | `6b59c.svg` | `field-description.svg` | o que e, 35 × 35 |
| `388:493` | `a09b3.svg` | `field-audience.svg` | publico, 35 × 35 |
| `388:461` | `1fef1.svg` | `field-documents.svg` | documentos, 35 × 35 |
| `388:592` | `ae7e8.svg` | `field-steps.svg` | etapas, 35 × 35 |
| `388:585` | `6e38a.svg` | `field-deadline.svg` | prazo, 35 × 35 |
| `388:633` | `92460.svg` | `field-costs.svg` | custos, 35 × 35 |
| `388:637` | `baef9.svg` | `field-channels.svg` | canais, 35 × 35 |
| `388:641` | `322e4.svg` | `field-scheduling.svg` | agendamento, 35 × 35 |
| `388:662` | `3c7c4.svg` | `field-additional.svg` | adicionais, 35 × 35 |
| `411:224` | `e849c.svg` | `legislation.svg` | cabecalho legal, 40 × 40 |

`importance-citizen.svg` e `foundation-citizen.svg` apontam para o mesmo vetor
no retorno atual. Pode haver um unico arquivo local compartilhado se os bytes
forem identicos. Nao deduplicar apenas pelo nome do hash sem conferir o arquivo.

Assets do header/footer (`SEMTD-branco`, divisores e marca) pertencem a feature
002 e nao devem ser baixados novamente. O breadcrumb do node nao expos um SVG
proprio; usar o separador do componente compartilhado da 002 ou geometria CSS,
marcada como decorativa.

## Arquivos a alterar

- `package.json` — scripts e dependencias de teste somente se ainda ausentes;
- `vite.config.ts` — ambiente jsdom, quando necessario;
- `src/app/App.tsx` — navegacao/foco somente se a 002 nao tiver resolvido;
- `src/app/routes.tsx` — adicionar `figmaNodeId: "365:265"`;
- `src/components/layout/AppShell.tsx` — variante full-bleed somente se ausente;
- `src/styles/tokens.css` — tokens confirmados e ainda inexistentes;
- `src/styles/globals.css` — estilos da pagina ou import de arquivo dedicado;
- `src/pages/OQueECartaPage.tsx` — substituir o placeholder.

## Arquivos a criar

- `src/content/pages/o-que-e-carta.ts`;
- `src/components/o-que-e-carta/ServiceInformationCard.tsx`;
- `src/components/o-que-e-carta/LegalReferenceItem.tsx`;
- `src/components/ui/Breadcrumb.tsx`, se ainda nao existir;
- `src/styles/pages/o-que-e-carta.css`, se a organizacao de CSS for aprovada;
- `src/pages/OQueECartaPage.test.tsx`, se testes forem configurados;
- `src/assets/o-que-e-carta/` com os SVGs do inventario;
- `src/test/setup.ts`, somente se ainda nao existir.

## Contratos TypeScript

### `src/content/pages/o-que-e-carta.ts`

```ts
export type ImportanceId = "citizen" | "agency" | "management";
export type FoundationId = "citizen" | "public-agency";

export type ServiceInformationFieldId =
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

export type ImportanceItem = {
  id: ImportanceId;
  title: string;
  description: string;
};

export type FoundationItem = {
  id: FoundationId;
  title: string;
  description: string;
};

export type ServiceInformationField = {
  id: ServiceInformationFieldId;
  title: string;
  description: string;
};

export type LegalReference = {
  id: "law-13460" | "decree-9094" | "decree-9756";
  kind: "Lei Federal" | "Decreto Federal";
  number: string;
  year: 2017 | 2019;
  summary: string;
  actionLabel: "Consultar";
  href: `https://${string}`;
};
```

Os tipos editoriais ficam junto do conteudo. Icones e tons visuais devem ser
associados separadamente pelos identificadores, sem misturar assets com copy.

## Conteudo base

### `src/content/pages/o-que-e-carta.ts`

```ts
export const serviceInformationFields = [
  { id: "name", title: "Nome do serviço", description: "Identificação direta e objetiva do serviço. O nome popular, quando houver, é um nome alternativo ou mais conhecido pelo cidadão; complementa o nome do serviço sem substituí-lo." },
  { id: "description", title: "O que é", description: "Descrição simplificada do serviço oferecido." },
  { id: "audience", title: "Quem pode utilizar", description: "Público com direito ou necessidade de uso." },
  { id: "documents", title: "Documentos necessários", description: "Tudo que o cidadão precisa apresentar." },
  { id: "steps", title: "Etapas", description: "Passos do início ao fim do serviço." },
  { id: "deadline", title: "Prazo", description: "Tempo estimado para conclusão." },
  { id: "costs", title: "Custos", description: "Valores, taxas ou gratuidade." },
  { id: "channels", title: "Canais de atendimento", description: "Formas de acessar o serviço." },
  { id: "scheduling", title: "Agendamento", description: "Se é necessário agendar; tipo e sistema de agendamento; link e forma de exibição somente para outro sistema ou site." },
  { id: "additional-information", title: "Informações Adicionais", description: "Outras orientações relevantes." },
] as const satisfies readonly ServiceInformationField[];

export const legalReferences = [
  {
    id: "law-13460",
    kind: "Lei Federal",
    number: "13.460",
    year: 2017,
    summary: "Dispõe sobre participação, proteção e defesa dos direitos do usuário dos serviços públicos da administração pública.",
    actionLabel: "Consultar",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13460.htm",
  },
  {
    id: "decree-9094",
    kind: "Decreto Federal",
    number: "9.094",
    year: 2017,
    summary: "Regulamenta dispositivos da Lei nº 13.460/2017 e dispõe sobre simplificação do atendimento prestado aos usuários dos serviços públicos federais.",
    actionLabel: "Consultar",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/decreto/d9094.htm",
  },
  {
    id: "decree-9756",
    kind: "Decreto Federal",
    number: "9.756",
    year: 2019,
    summary: "Institui o Portal Único “gov.br” e dispõe sobre as regras para migração dos sítios e portais da administração pública federal.",
    actionLabel: "Consultar",
    href: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d9756.htm",
  },
] as const satisfies readonly LegalReference[];
```

O arquivo contem introducao, importancia, fundamentos, campos e legislacao com
a copy final aprovada.

## Codigo base dos componentes

### `ServiceInformationCard.tsx`

```tsx
import type { ContentItem, ServiceInformationFieldId } from "../../content/pages/o-que-e-carta";

type Props = {
  field: ContentItem<ServiceInformationFieldId>;
  iconSrc: string;
};

export function ServiceInformationCard({ field, iconSrc }: Props) {
  return (
    <li className="charter-field-card">
      <img aria-hidden="true" alt="" src={iconSrc} width="35" height="35" />
      <div>
        <h3>{field.title}</h3>
        <p>{field.description}</p>
      </div>
    </li>
  );
}
```

### `LegalReferenceItem.tsx`

```tsx
import type { LegalReference } from "../../content/pages/o-que-e-carta";

type Props = { reference: LegalReference };

export function LegalReferenceItem({ reference }: Props) {
  const accessibleLabel =
    `Consultar ${reference.kind} nº ${reference.number}/${reference.year} em nova aba`;

  return (
    <li className="charter-law">
      <div className="charter-law__identity">
        <span className="charter-law__kind">{reference.kind}</span>
        <strong>nº {reference.number}</strong>
        <span>{reference.year}</span>
      </div>
      <p>{reference.summary}</p>
      <a
        aria-label={accessibleLabel}
        href={reference.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {reference.actionLabel}
      </a>
    </li>
  );
}
```

## Codigo base da pagina

```tsx
import { LegalReferenceItem } from "../components/o-que-e-carta/LegalReferenceItem";
import { ServiceInformationCard } from "../components/o-que-e-carta/ServiceInformationCard";
import { fieldIcons } from "../components/o-que-e-carta/field-icons";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { aboutCharterPageContent } from "../content/pages/o-que-e-carta";

export function OQueECartaPage() {
  return (
    <article className="charter-page">
      <section className="charter-intro" aria-labelledby="charter-title">
        <div className="charter-container charter-intro__grid">
          <div>
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "O que é uma Carta de Serviço?" },
              ]}
            />
            <h1 id="charter-title">{aboutCharterPageContent.title}</h1>
            <p>{aboutCharterPageContent.description}</p>
          </div>
          <aside className="charter-importance" aria-labelledby="importance-title">
            <h2 id="importance-title">{aboutCharterPageContent.importance.title}</h2>
            <ul>{/* aboutCharterPageContent.importance.items */}</ul>
          </aside>
        </div>
      </section>

      <section className="charter-foundations" aria-labelledby="foundations-title">
        <div className="charter-container">
          <h2 id="foundations-title">{aboutCharterPageContent.foundations.title}</h2>
          <p>{aboutCharterPageContent.foundations.description}</p>
          <ul className="charter-foundations__grid">{/* dois itens tipados */}</ul>
        </div>
      </section>

      <section className="charter-fields" aria-labelledby="fields-title">
        <div className="charter-container charter-container--wide">
          <h2 id="fields-title">{aboutCharterPageContent.information.title}</h2>
          <p>{aboutCharterPageContent.information.description}</p>
          <ul className="charter-fields__grid">
            {aboutCharterPageContent.information.fields.map((field) => (
              <ServiceInformationCard
                field={field}
                iconSrc={fieldIcons[field.id]}
                key={field.id}
              />
            ))}
          </ul>
        </div>
      </section>

      <section className="charter-legislation" aria-labelledby="legislation-title">
        <div className="charter-container charter-container--wide">
          <header>{/* icone, h2 e subtitulo */}</header>
          <ul>
            {aboutCharterPageContent.legislation.references.map((reference) => (
              <LegalReferenceItem key={reference.id} reference={reference} />
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
```

O `aside` da importancia e adequado por ser conteudo complementar a definicao.
Se testes com leitor de tela indicarem navegacao excessiva, manter o elemento
mas evitar landmark nomeado redundante.

## Integracao de rota e shell

Em `src/app/routes.tsx`:

```ts
{
  path: "/o-que-e-carta-de-servicos",
  label: "Carta de Servicos",
  Component: OQueECartaPage,
  showInNav: true,
  figmaNodeId: "365:265",
  specId: "004-o-que-e-carta-servico",
  layoutType: "section",
}
```

Se a feature 002 separar a navegacao editorial de `routes`, remover a
dependencia de `showInNav` sem mudar a rota. O rotulo visivel da header deve ser
`O que e a Carta?`, conforme a 002, ainda que o label tecnico da rota seja
diferente.

O shell deve aplicar uma classe de largura total baseada em `layoutType` ou em
metadado explicito. Preferir contrato explicito a `:has()` quando a feature 002
ja oferecer essa capacidade.

## CSS base

```css
.site-main:has(.charter-page) {
  width: 100%;
  padding: 0;
}

.charter-page {
  color: var(--color-text-primary);
  background: var(--color-background-default);
}

.charter-container {
  width: min(67.5rem, calc(100% - 2 * var(--space-6)));
  margin-inline: auto;
}

.charter-container--wide {
  width: min(84.75rem, calc(100% - 2 * var(--space-6)));
}

.charter-intro {
  padding-block: var(--space-10) var(--space-16);
}

.charter-intro__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(20rem, 0.85fr);
  gap: clamp(var(--space-8), 7vw, var(--space-20));
  align-items: start;
}

.charter-intro h1 span,
.charter-fields h2 span {
  color: var(--color-charter-cyan);
}

.charter-importance {
  padding: var(--space-10);
  background: var(--color-charter-cream-strong);
  border-radius: var(--radius-charter-card);
}

.charter-importance ul,
.charter-foundations ul,
.charter-fields ul,
.charter-legislation ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.charter-foundations {
  padding-block: var(--space-10);
  color: var(--color-white);
  background: var(--gradient-charter-foundations);
}

.charter-foundations h2 {
  color: inherit;
}

.charter-foundations__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(var(--space-6), 5vw, var(--space-16));
  margin-top: var(--space-8);
}

.charter-foundation-card {
  padding: var(--space-6) var(--space-8);
  border: 1px solid var(--foundation-color);
  border-radius: var(--radius-charter-card);
}

.charter-fields {
  padding-block: var(--space-16);
  border-block: 1px solid var(--color-border-default);
}

.charter-fields__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-8) var(--space-6);
  margin-top: var(--space-10);
}

.charter-field-card {
  display: grid;
  grid-template-columns: 2.1875rem minmax(0, 1fr);
  gap: var(--space-2);
  min-width: 0;
  padding: var(--space-5);
  background: var(--color-charter-cream-soft);
  border-radius: var(--radius-charter-card);
}

.charter-field-card h3,
.charter-field-card p {
  margin: 0;
}

.charter-legislation {
  padding-block: var(--space-12) var(--space-20);
}

.charter-law {
  display: grid;
  grid-template-columns: 8rem minmax(0, 1fr) auto;
  gap: var(--space-6);
  align-items: center;
  padding: var(--space-4);
}

.charter-law__identity {
  display: grid;
}

.charter-law__kind {
  width: max-content;
  padding: var(--space-1) var(--space-3);
  color: var(--color-white);
  font-weight: 800;
  background: var(--color-charter-cyan);
  border-radius: 999px;
}

.charter-law > a {
  min-height: 2.75rem;
  padding: var(--space-2) var(--space-4);
  color: var(--color-charter-cyan);
  text-decoration: none;
  border: 1px solid currentColor;
  border-radius: 999px;
}

@media (max-width: 900px) {
  .charter-intro__grid,
  .charter-foundations__grid {
    grid-template-columns: 1fr;
  }

  .charter-fields__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .charter-container,
  .charter-container--wide {
    width: min(100% - 2 * var(--space-4), 84.75rem);
  }

  .charter-importance,
  .charter-foundation-card {
    padding: var(--space-6);
  }

  .charter-fields__grid,
  .charter-law {
    grid-template-columns: 1fr;
  }

  .charter-law > a {
    width: 100%;
    text-align: center;
  }
}
```

Valores de container devem ser ajustados por comparacao visual. Nao usar
alturas fixas do frame; cards precisam crescer com zoom e quebra de texto.

## Responsividade

- acima de 1024 px: introducao em duas colunas, fundamentos 2 colunas, campos 3
  colunas e legislacao em linhas;
- entre 601 e 1024 px: introducao/fundamentos em uma coluna quando necessario,
  campos em 2 colunas e legislacao fluida;
- ate 600 px: todas as regioes em uma coluna;
- em 320 px: nenhum texto, badge, icone ou link pode causar scroll horizontal;
- ordem visual sempre igual a ordem do DOM;
- areas clicaveis com minimo recomendado de 44 × 44 px;
- zoom de 200% sem truncamento ou sobreposicao.

## Testes automatizados

Se a feature 002 nao tiver configurado testes, adicionar:

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

Cenarios obrigatorios em `OQueECartaPage.test.tsx`:

1. existe exatamente um `h1`;
2. breadcrumb possui link para `/` e pagina atual;
3. importancia possui exatamente tres itens na ordem esperada;
4. fundamentos possui exatamente dois itens;
5. campos possui exatamente dez itens na ordem oficial;
6. legislacao possui exatamente tres referencias;
7. cada referencia exibe tipo, numero, ano e resumo;
8. cada link possui URL oficial, `target="_blank"` e
   `rel="noopener noreferrer"`;
9. nomes acessiveis identificam a norma e a nova aba;
10. icones decorativos possuem `alt=""`;
11. nao existem formulario, progresso ou CTA final;
12. a pagina nao renderiza `Material de apoio`.

Testes de integracao do `App` devem cobrir resolucao da rota, CTA da home,
header, `popstate` e foco se esses contratos forem implementados nesta feature.

## Regras de implementacao

- Consultar novamente o estado da feature 002 antes de editar o shell.
- Nao copiar Tailwind, coordenadas absolutas ou alturas rigidas do Figma.
- Nao instalar Tailwind, React Router ou biblioteca de icones.
- Nao desenhar, editar ou substituir os SVGs oficiais.
- Nao manter URL temporaria `figma.com/api/mcp/asset` no codigo.
- Nao duplicar header, footer, breadcrumb ou logica de navegacao existente.
- Nao adicionar CTA final ausente no frame.
- Nao acessar backend, storage, contexto ou schema da Carta.
- Nao introduzir `Material de apoio` na header.
- Nao publicar copy normativa divergente sem aprovacao editorial.
- Preservar alteracoes existentes e limitar mudancas compartilhadas ao
  necessario para esta tela.

## Ordem de implementacao

1. concluir `/spec:validar` e resolver a aprovacao da copy normativa;
2. verificar o estado real da feature 002;
3. baixar e inspecionar os assets do node `365:265`;
4. configurar testes, se ainda ausentes;
5. criar tipos e conteudo versionado;
6. criar/reutilizar breadcrumb e navegacao interna;
7. implementar cards de campo e referencias legais;
8. montar a pagina com secoes semanticas;
9. registrar `figmaNodeId` na rota;
10. adicionar tokens e CSS responsivo;
11. executar testes, typecheck e build;
12. validar links, teclado, responsividade e comparacao visual.

## Criterios de validacao

### Funcionais

- a rota resolve por header, CTA da home, URL direta e recarga;
- breadcrumb retorna para `/`;
- existem tres itens de importancia, dois fundamentos, dez campos e tres
  referencias legais;
- links externos usam as URLs oficiais aprovadas e abrem com seguranca;
- a pagina nao modifica dados da Carta.

### Visuais

- desktop reproduz a hierarquia, gradiente, painel creme, cards e legislacao
  do node `365:265`;
- os 14 vetores visiveis correspondem aos nodes do inventario;
- header/footer continuam sob responsabilidade da 002;
- divergencias intencionais de MVP estao registradas.

### Responsivos e acessiveis

- 1440, 1024, 768, 390 e 320 px sem corte ou scroll horizontal;
- exatamente um `h1` e hierarquia coerente de `h2`/`h3`;
- listas preservam ordem semantica;
- links funcionam por teclado e possuem foco visivel;
- nova aba e identificada no nome acessivel;
- informacao nao depende de cor ou icone;
- contraste atende WCAG 2.1 AA;
- zoom de 200% e reflow permanecem utilizaveis.

### Tecnicos

- `npm run test` aprovado, quando configurado;
- `npm run typecheck` aprovado;
- `npm run build` aprovado;
- nenhum erro no console;
- nenhum asset vazio, substituido ou carregado por URL temporaria;
- nenhuma dependencia nova fora da infraestrutura de testes aprovada;
- nenhuma alteracao em backend, storage ou schema da Carta.

## Decisao editorial

A copy fornecida em 25 de setembro de 2026 prevalece como versao aprovada. Os
resumos legais foram registrados com seus links oficiais no arquivo tipado.

## Resultado da validacao documental

### Conformidades

- `spec.md`, `plan.md`, `tasks.md` e este plano descrevem a mesma pagina, rota,
  ordem de secoes e limite funcional.
- A pagina permanece educativa e independente do fluxo obrigatorio, conforme
  `docs/produto/fluxos.md`.
- O escopo nao inclui backend, formulario, progresso, persistencia ou
  publicacao automatica.
- O node oficial `365:265` esta registrado na spec, no mapa de telas, no plano
  e nas tarefas.
- Inter permanece como fonte principal em toda a implementacao planejada.
- O ajuste de MVP que remove `Material de apoio` da header esta consistente com
  a feature 002 e com `docs/produto/mvp.md`.
- Os dez campos, tres perspectivas, dois fundamentos e tres referencias legais
  possuem contratos, ordem e criterios de teste correspondentes.
- A estrategia responsiva e acessivel cobre desktop, tablet, smartphone,
  teclado, contraste, nova aba, zoom e reflow.
- O inventario cobre os 14 SVGs unicos da pagina e separa os assets do shell.

### Bloqueio B001 — Resolvido

- A equipe forneceu e aprovou a redacao definitiva das tres referencias.
- O conteudo esta versionado em `src/content/pages/o-que-e-carta.ts`.
- T008 e as tarefas editoriais T009–T013 estao concluidas.

### Alertas nao bloqueantes

- A feature 002 ainda nao esta implementada; a 004 deve verificar o shell real
  antes do codigo e nao duplicar infraestrutura compartilhada.
- O Figma Make retornou os recursos estruturados, mas eles nao puderam ser
  lidos nesta sessao. Os tokens possuem base suficiente no frame e na
  documentacao local, com reconsulta obrigatoria quando possivel.
- A infraestrutura de testes ainda nao existe. O plano ja determina sua
  inclusao caso continue ausente no momento da implementacao.

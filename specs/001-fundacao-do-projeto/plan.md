# Plan: Fundacao do Projeto

## Abordagem

Manter a fundacao documental ja criada e preparar a fundacao tecnica do projeto em duas etapas:

1. Documentar a arquitetura inicial do app.
2. Implementar a base React + TypeScript + Vite somente quando for usado `/spec:implementar`.

O README antigo, o ERS, o Figma Design do prototipo e os arquivos do Figma Make permanecem como fontes de contexto.

## Entrega ja concluida

- `README.md`
- `.gitignore`
- `docs/processo/constitution.md`
- `docs/produto/visao-produto.md`
- `docs/produto/mvp.md`
- `docs/produto/escopo.md`
- `docs/produto/personas.md`
- `docs/produto/fluxos.md`
- `docs/arquitetura/arquitetura-sistema.md`
- `docs/arquitetura/decisoes-tecnicas.md`
- `docs/design-system/referencia-figma-make.md`
- `docs/design-system/tokens-e-componentes.md`
- `docs/ia/guia-uso-codex.md`
- `docs/ia/prompts-padroes.md`
- `docs/ia/regras-para-ia.md`
- `docs/decisoes/adr-001-arquitetura-mvp.md`
- `docs/decisoes/adr-002-exportacao-csv.md`
- `docs/decisoes/adr-003-backend-atendimento.md`
- `specs/README.md`
- `specs/001-fundacao-do-projeto/*`

## Entrega tecnica planejada

Quando a etapa `/spec:implementar` for solicitada, criar ou ajustar:

- `package.json`
- `index.html`
- `vite.config.ts`
- `tsconfig.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/styles/`
- `src/routes/`
- `src/pages/`
- `src/components/`
- `src/content/`
- `src/features/carta/`
- `src/features/diagnostico/`
- `src/features/atendimento/`
- `src/lib/`
- `src/types/`

## Estrutura tecnica proposta

```txt
src/
  app/
    App.tsx
    routes.tsx
  components/
    layout/
    ui/
    forms/
  content/
    pages/
    fluxo/
    diagnostico/
    tutorial/
  features/
    carta/
      carta.types.ts
      carta.schema.ts
      carta.storage.ts
      carta.csv.ts
    diagnostico/
    atendimento/
  pages/
    HomePage.tsx
    OQueECartaPage.tsx
    DiagnosticoPage.tsx
    OrganizarInformacoesPage.tsx
    FormularioCartaPage.tsx
    PreviaCartaPage.tsx
    TutorialParaibaDigitalPage.tsx
    AjudaPage.tsx
  styles/
    globals.css
    tokens.css
  lib/
    csv.ts
    validation.ts
  types/
```

## Rotas iniciais propostas

- `/`
- `/o-que-e-carta-de-servicos`
- `/diagnostico`
- `/diagnostico/resultado`
- `/organizar-informacoes`
- `/formulario-carta`
- `/previa`
- `/tutorial-paraiba-digital`
- `/ajuda`
- `/ajuda/atendimento-agendado`
- `/ajuda/suporte-email`

## Estrategia visual

Usar o Figma Design do prototipo como referencia para:

- layout das telas;
- fluxo de navegacao;
- composicao das secoes;
- hierarquia visual;
- comportamento esperado de cada pagina.

Usar o Figma Make como referencia para:

- tokens de cor;
- fontes Outfit e Source Sans 3/Rawline;
- escala de espacamento;
- bordas e radius;
- botoes;
- cards;
- navegacao;
- formularios.

## Estrategia de conteudo

Conteudo institucional deve ficar em `src/content/`, separado da estrutura visual.

## Estrategia de estado temporario

Os dados da Carta devem permanecer em estado de aplicacao e/ou `sessionStorage`, sem persistencia permanente no MVP.

## Estrategia de CSV

CSV deve ser gerado localmente no navegador a partir do modelo de dados da Carta.

## Backend

O backend de atendimento agendado nao sera implementado nesta primeira fundacao tecnica. A estrutura deve apenas reservar separacao para a feature `atendimento`.

## Validacao

- Conferir se a estrutura existe.
- Conferir se os documentos citados no README existem.
- Conferir se a spec 001 esta completa.
- Na implementacao futura, executar instalacao, desenvolvimento local e build.

## Riscos

- Duplicidade entre README antigo e novos documentos.
- Links finais de Figma Design/Figma Make ainda podem precisar ser atualizados manualmente se houver uma versao mais atual.
- A criacao do projeto Vite pode exigir reorganizacao caso o repositorio ja contenha arquivos na raiz.
- Tailwind CSS pode exigir instalacao de dependencias.
- A escolha entre Tailwind e CSS modular deve preservar aderencia ao Figma Make.

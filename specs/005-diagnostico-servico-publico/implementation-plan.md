# Implementation Plan: Diagnostico de Servico Publico

## Status

Plano detalhado criado em 29 de setembro de 2026 a partir da spec, do plano,
das tarefas, do codigo real e da consulta ao Figma Design e Figma Make.

O plano esta pronto para validacao documental. A implementacao visual deve
reconsultar o Figma Make antes do codigo: o MCP retornou a lista de recursos do
arquivo, mas nao permitiu abrir `App.tsx`, `index.css` ou
`design-system-spec.md` nesta sessao. O frame do Figma Design retornou contexto
de alta fidelidade e screenshot.

## Fontes consultadas

- `specs/005-diagnostico-servico-publico/spec.md`;
- `specs/005-diagnostico-servico-publico/plan.md`;
- `specs/005-diagnostico-servico-publico/tasks.md`;
- `docs/processo/constitution.md`;
- `docs/produto/mvp.md`, `escopo.md`, `fluxos.md` e `personas.md`;
- `docs/arquitetura/arquitetura-sistema.md`, `fundacao-tecnica.md` e
  `decisoes-tecnicas.md`;
- `docs/design-system/mapa-figma-telas.md`, `tokens-e-componentes.md` e
  `referencia-figma-make.md`;
- `docs/implementation-plan.md`;
- codigo atual em `src/` e scripts do `package.json`;
- Figma Design:
  - `fileKey`: `YaVUdqYa3boHpvGrxf4ZJ5`;
  - `nodeId`: `387:1020`;
  - nome: `diagnostico`;
  - contexto e screenshot recebidos via `get_design_context` com a skill
    `figma-design-to-code`;
- Figma Make:
  - `fileKey`: `dVm7lEZdBFqOiiySWLWUqp`;
  - `nodeId`: `0:1`;
  - estrutura de recursos retornada via `get_design_context`;
  - leitura individual dos recursos indisponivel nesta sessao.

## Objetivo da implementacao

Entregar um fluxo de oito perguntas em `/diagnostico`, uma pergunta por vez,
com tres respostas acessiveis, estado temporario de sessao e resultado
deterministico em `/diagnostico/resultado`.

A interface deve preservar a composicao visual do frame oficial, adaptar o
prototipo antigo ao conteudo aprovado e manter as regras condicionais fora do
DOM e dos componentes visuais.

## Estado real do repositorio

- React 19, TypeScript e Vite.
- CSS global em `src/styles/globals.css`, com tokens em `tokens.css`.
- Navegacao propria em `App.tsx`, usando `window.history` e `popstate`.
- `AppShell` recebe `onNavigate`, mas as paginas nao acessam esse contrato.
- `/diagnostico` e `/diagnostico/resultado` ja existem em `routes.tsx`.
- O node `387:1020` ja esta associado a `/diagnostico`.
- `DiagnosticoPage` renderiza oito `PlaceholderCard`, sem formulario.
- `ResultadoDiagnosticoPage` e placeholder.
- Perguntas, resultados e regra inicial ja estao versionados.
- `diagnostico.types.ts` ainda possui `nao-sei` e resultado booleano legado.
- Nao existem Vitest, Testing Library nem script `test`.
- Inter ja e a fonte principal nos tokens.

## Leitura do Figma Design

### Dimensoes e composicao desktop

O frame mede aproximadamente `1440 x 1105 px` e apresenta:

1. header navy com 67 px de altura;
2. breadcrumb a partir de `x=71`, `y=100`;
3. indicador das quatro etapas gerais entre `y=162` e `y=225`;
4. conteudo principal em duas colunas a partir de `y=311`;
5. introducao a esquerda, com largura aproximada de 575 px;
6. card do diagnostico a direita, `619 x 345 px`, raio 20 px e sombra;
7. barra de navegacao inferior a `y=727`, com largura de 1200 px;
8. footer compartilhado a partir de `y=862`, com 243 px de altura.

### Hierarquia visual observada

- breadcrumb: `Inicio > Guia > Identificar servico`;
- etapa geral ativa: `1 — ENTENDA`;
- eyebrow ciano: `DIAGNOSTICO INTERATIVO`;
- titulo navy com `servico?` em laranja;
- subtitulo e tres beneficios em cinza;
- checks ciano de 18 px;
- card branco com pergunta, progresso e tres opcoes;
- `Sim` e `Nao` lado a lado; `Nao tenho certeza` ocupa a linha inteira;
- navegacao geral com acao secundaria contornada e primaria laranja.

### Valores visuais observados

| Uso | Valor observado | Decisao |
| --- | --- | --- |
| Header | `#0f3f67` | Reutilizar token navy do shell ou reconciliar |
| Titulo principal | `#00395b` | Token semantico de heading |
| Titulo do card | `#174673` | Reutilizar navy intermediario confirmado |
| Ciano | `#12b5d0` | Eyebrow, checks e destaque de marca |
| Laranja | `#f97304` / `#ff6f00` | Acento e acao primaria; unificar por token |
| Texto secundario | `#848b96` / `#666666` | Reconciliar com tokens neutral existentes |
| Borda de opcoes | `#bcc3ce` | Reutilizar border strong quando equivalente |
| Borda de navegacao | `#e2e8f0` | Ja corresponde ao neutral 200 local |
| Card | branco, raio 20 px | Token de surface e raio especifico |
| Sombra | `0 4px 4px rgba(0,0,0,.25)` | Confirmar no Make antes de adicionar |

### Divergencias obrigatorias em relacao ao frame

| Figma | Produto aprovado | Implementacao |
| --- | --- | --- |
| `Pergunta 1 de 5` e cinco pontos | Oito perguntas | Exibir `N de 8` e oito pontos ou progresso equivalente |
| Pergunta e texto auxiliar antigos | Oito perguntas versionadas, sem hints | Usar somente `perguntas.ts`; nao inventar hint |
| Card implementado como link | Formulario interativo | Usar `form`, `fieldset`, `legend` e radios |
| CTA `Organizar informacoes` no questionario | Resultado condicional antes da etapa seguinte | Usar `Continuar` e `Ver resultado`; CTA seguinte apenas no resultado valido |
| `Voltar para pagina inicial` fixo | Voltar entre perguntas e recomecar | Primeiro passo pode voltar; passos seguintes revisam a pergunta anterior |
| Outfit e Rawline | Inter e fonte oficial | Usar Inter em toda a feature |
| `Material de apoio` na header | Fora do MVP | Reutilizar header da feature 002 sem esse item |
| Footer completo do frame | Shell compartilhado | Nao duplicar footer na feature |
| Quatro etapas gerais com SVGs | Shell/fluxo geral | Reutilizar componente compartilhado ou reproduzir fielmente uma unica vez |

O frame nao contem uma tela dedicada para os cinco resultados. A pagina de
resultado deve derivar sua composicao do card, tokens e hierarquia do
diagnostico, sem criar copy ou regra nova.

## Mapeamento de assets

Nenhum asset deve usar as URLs temporarias retornadas pelo MCP. Durante
`/spec:implementar`, baixar os assets pelo fluxo oficial do Figma, salvar
localmente e verificar arquivo, slot e geometria.

| Node | Asset observado | Uso | Nome local sugerido | Escopo |
| --- | --- | --- | --- | --- |
| `387:1058`, `387:1061` | Arrow Down, 10 px | Separador do breadcrumb | `chevron-breadcrumb.svg` | Compartilhado |
| `387:1118`–`387:1131` | Elipses do stepper | Estados das quatro etapas | `process-step-*.svg` | Compartilhado/fluxo |
| `387:1141`–`387:1143` | Linhas do stepper | Conexao das etapas | `process-line-*.svg` | Compartilhado/fluxo |
| `387:1206`, `387:1218`, `387:1211` | Group 27, check 18 px | Tres destaques | `check-highlight.svg` | Feature 005 |
| `588:950` | Linha vertical | Separador da marca | `brand-divider.svg` | Shell 002 |
| `690:435` | SEMTD branco | Marca institucional do footer | asset institucional existente | Shell 002 |
| `690:422` | Linha do footer | Separador | asset compartilhado | Shell 002 |

Circulos e linhas somente podem ser reproduzidos em CSS se a verificacao no
plano de implementacao confirmar equivalencia exata e se nao forem assets
autorais. O check deve usar o SVG oficial; nao substitui-lo por caractere,
emoji ou icone aproximado.

## Decisoes tecnicas consolidadas

### Fonte unica de dominio

- `perguntas.ts`: copy e IDs das perguntas;
- `respostas.ts`: copy dos cinco resultados;
- `condicoes.ts`: opcoes, mapa completo e motor puro;
- `src/features/diagnostico/`: reducer, sessao e validadores;
- componentes: somente apresentacao e eventos.

Atualizar `src/features/diagnostico/diagnostico.types.ts` para reexportar os
tipos canonicos ou remove-lo. Nao manter `nao-sei` nem resultado booleano.

### Navegacao compartilhada

Extrair o contrato de navegacao de `App.tsx` se a feature 002 ainda nao o
tiver feito. O diagnostico nao deve chamar `history.pushState` diretamente.

```ts
export type NavigateOptions = { replace?: boolean };

export type NavigationContextValue = {
  currentPath: string;
  navigate: (path: string, options?: NavigateOptions) => void;
};
```

`navigate` deve preservar URL real, `popstate`, scroll ao topo e restauracao
de foco. Acesso invalido ao resultado deve usar `replace`.

### Estado e sessao

```ts
export type RespostasParciaisDiagnostico = Partial<RespostasDoDiagnostico>;

export type DiagnosticoState = {
  currentQuestionId: PerguntaDiagnosticoId;
  answers: RespostasParciaisDiagnostico;
  completed: boolean;
};

export type DiagnosticoAction =
  | { type: "answer"; questionId: PerguntaDiagnosticoId; value: OpcaoDiagnostico }
  | { type: "next" }
  | { type: "previous" }
  | { type: "restart" }
  | { type: "restore"; state: DiagnosticoState };
```

Usar `useReducer`. Armazenar respostas por ID. A pergunta atual tambem deve ser
um ID; indices servem apenas para calcular posicao visual.

Chave de sessao:

```ts
export const DIAGNOSTICO_SESSION_KEY =
  "simplifica-carta:diagnostico:v1";

export type DiagnosticoSession = {
  version: 1;
  currentQuestionId: PerguntaDiagnosticoId;
  answers: RespostasParciaisDiagnostico;
  completed: boolean;
};
```

O parser deve validar JSON, versao, IDs e opcoes. Payload invalido e removido.
Nao usar `localStorage`, backend ou texto de resultado na sessao.

### Conclusao

1. confirmar as oito respostas;
2. persistir a sessao como concluida;
3. navegar para `/diagnostico/resultado`;
4. na pagina de resultado, validar novamente as respostas;
5. recalcular `obterRespostaDoDiagnostico`;
6. resolver `respostasDiagnosticoPorId[id]`;
7. renderizar uma unica orientacao.

Nunca confiar em ID ou texto recebido da URL ou do storage.

## Conteudo adicional necessario

Adicionar opcoes tipadas ao conteudo, sem fixa-las no componente:

```ts
export const opcoesDiagnostico = [
  { value: "sim", label: "Sim" },
  { value: "nao", label: "Não" },
  { value: "nao-tenho-certeza", label: "Não tenho certeza" },
] as const satisfies readonly {
  value: OpcaoDiagnostico;
  label: string;
}[];
```

Rotulos de CTAs finais devem ser confirmados editorialmente. Destinos:

- `servico-publico` e `autosservico` → `/organizar-informacoes`;
- `analisar-melhor` → `/ajuda`;
- etapa e processo interno → refazer ou voltar, sem formulario automatico.

## Arquivos a alterar

- `package.json`, para scripts/dependencias de teste aprovados;
- `src/app/App.tsx`, para prover navegacao compartilhada;
- `src/app/routes.tsx`, somente se metadados do resultado forem necessarios;
- `src/pages/DiagnosticoPage.tsx`;
- `src/pages/ResultadoDiagnosticoPage.tsx`;
- `src/content/diagnostico/perguntas.ts`, para opcoes tipadas;
- `src/content/diagnostico/condicoes.ts`, apenas se testes revelarem lacuna;
- `src/content/diagnostico/respostas.ts`, apenas para CTA editorial aprovado;
- `src/features/diagnostico/diagnostico.types.ts`;
- `src/styles/tokens.css`;
- `src/styles/globals.css`, ou import do CSS da feature;
- `vite.config.ts`, para ambiente de testes, se Vitest for adotado.

## Arquivos a criar

- `src/app/NavigationContext.tsx`, se ausente apos consolidacao da 002;
- `src/features/diagnostico/diagnostico.reducer.ts`;
- `src/features/diagnostico/diagnostico.session.ts`;
- `src/features/diagnostico/diagnostico.validation.ts`;
- `src/features/diagnostico/useDiagnostico.ts`;
- `src/components/diagnostico/DiagnosticoProgress.tsx`;
- `src/components/diagnostico/DiagnosticoQuestionCard.tsx`;
- `src/components/diagnostico/DiagnosticoResultCard.tsx`;
- `src/styles/pages/diagnostico.css`, se CSS por pagina for consolidado;
- `src/assets/diagnostico/check-highlight.svg`;
- assets compartilhados somente se ainda nao existirem pela feature 002;
- `src/content/diagnostico/condicoes.test.ts`;
- `src/features/diagnostico/diagnostico.reducer.test.ts`;
- `src/features/diagnostico/diagnostico.session.test.ts`;
- `src/pages/DiagnosticoPage.test.tsx`;
- `src/pages/ResultadoDiagnosticoPage.test.tsx`;
- `src/test/setup.ts`, se ausente.

Nao criar backend, banco, novo roteador, store global generico ou copia do
design system.

## Codigo base

### Reducer

```ts
import { perguntasDiagnostico } from "../../content/diagnostico/perguntas";
import type {
  OpcaoDiagnostico,
  RespostasDoDiagnostico,
} from "../../content/diagnostico/condicoes";
import type { PerguntaDiagnosticoId } from "../../content/diagnostico/perguntas";

export type DiagnosticoState = {
  currentQuestionId: PerguntaDiagnosticoId;
  answers: Partial<RespostasDoDiagnostico>;
  completed: boolean;
};

export const initialDiagnosticoState: DiagnosticoState = {
  currentQuestionId: perguntasDiagnostico[0].id,
  answers: {},
  completed: false,
};

export function diagnosticoReducer(
  state: DiagnosticoState,
  action: DiagnosticoAction,
): DiagnosticoState {
  if (action.type === "answer") {
    return {
      ...state,
      answers: { ...state.answers, [action.questionId]: action.value },
    };
  }

  if (action.type === "restart") return initialDiagnosticoState;
  if (action.type === "restore") return action.state;

  const index = perguntasDiagnostico.findIndex(
    ({ id }) => id === state.currentQuestionId,
  );

  if (action.type === "previous" && index > 0) {
    return { ...state, currentQuestionId: perguntasDiagnostico[index - 1].id };
  }

  if (action.type === "next") {
    if (!state.answers[state.currentQuestionId]) return state;
    if (index < perguntasDiagnostico.length - 1) {
      return { ...state, currentQuestionId: perguntasDiagnostico[index + 1].id };
    }
    return { ...state, completed: true };
  }

  return state;
}
```

O tipo `DiagnosticoAction` deve ser importado ou declarado no arquivo real. O
codigo final deve proteger `findIndex === -1` no parser/restauracao.

### Validador de respostas completas

```ts
export function hasCompleteAnswers(
  answers: Partial<RespostasDoDiagnostico>,
): answers is RespostasDoDiagnostico {
  return perguntasDiagnostico.every(({ id }) =>
    opcoesDiagnostico.some(({ value }) => value === answers[id]),
  );
}
```

### Card da pergunta

```tsx
type DiagnosticoQuestionCardProps = {
  question: PerguntaDiagnostico;
  position: number;
  total: number;
  value?: OpcaoDiagnostico;
  canGoBack: boolean;
  onAnswer: (value: OpcaoDiagnostico) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function DiagnosticoQuestionCard(props: DiagnosticoQuestionCardProps) {
  const legendRef = useRef<HTMLLegendElement>(null);

  useEffect(() => {
    legendRef.current?.focus();
  }, [props.question.id]);

  return (
    <form
      className="diagnostic-card"
      onSubmit={(event) => {
        event.preventDefault();
        props.onContinue();
      }}
    >
      <DiagnosticoProgress current={props.position} total={props.total} />
      <fieldset>
        <legend ref={legendRef} tabIndex={-1}>
          {props.question.text}
        </legend>
        <div className="diagnostic-options">
          {opcoesDiagnostico.map((option) => (
            <label className="diagnostic-option" key={option.value}>
              <input
                checked={props.value === option.value}
                name={`question-${props.question.id}`}
                onChange={() => props.onAnswer(option.value)}
                type="radio"
                value={option.value}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="diagnostic-card__controls">
        <button disabled={!props.canGoBack} onClick={props.onBack} type="button">
          Voltar
        </button>
        <button disabled={!props.value} type="submit">
          {props.position === props.total ? "Ver resultado" : "Continuar"}
        </button>
      </div>
    </form>
  );
}
```

No primeiro passo, o controle secundario pode voltar a home conforme o Figma,
mas nao deve aparecer desabilitado se o design aprovado exigir um link real.
A decisao final deve ser unica no plano validado.

### Pagina do diagnostico

```tsx
export function DiagnosticoPage() {
  const { navigate } = useNavigation();
  const diagnostic = useDiagnostico();
  const index = perguntasDiagnostico.findIndex(
    ({ id }) => id === diagnostic.state.currentQuestionId,
  );
  const question = perguntasDiagnostico[index];

  function continueFlow() {
    const isLast = index === perguntasDiagnostico.length - 1;
    if (!diagnostic.state.answers[question.id]) return;
    diagnostic.next();
    if (isLast) navigate("/diagnostico/resultado");
  }

  return (
    <div className="diagnostic-page">
      <Breadcrumb items={diagnosticBreadcrumb} />
      <ProcessStepper activeStep={1} />
      <div className="diagnostic-layout">
        <DiagnosticoIntro content={diagnosticoContent} />
        <DiagnosticoQuestionCard
          canGoBack={index > 0}
          onAnswer={(value) => diagnostic.answer(question.id, value)}
          onBack={diagnostic.previous}
          onContinue={continueFlow}
          position={index + 1}
          question={question}
          total={perguntasDiagnostico.length}
          value={diagnostic.state.answers[question.id]}
        />
      </div>
      <WizardNavigation onRestart={diagnostic.restart} />
    </div>
  );
}
```

O provider/hook deve persistir o estado atualizado antes da navegacao final.
Evitar depender da assincronicidade do `dispatch` para gravar `completed`.

### Pagina de resultado

```tsx
export function ResultadoDiagnosticoPage() {
  const { navigate } = useNavigation();
  const { restart, session } = useDiagnostico();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => titleRef.current?.focus(), []);

  if (!session || !session.completed || !hasCompleteAnswers(session.answers)) {
    return <NavigateToDiagnostic replace />;
  }

  const resultId = obterRespostaDoDiagnostico(session.answers);
  const result = respostasDiagnosticoPorId[resultId];

  return (
    <DiagnosticoResultCard
      onRestart={() => {
        restart();
        navigate("/diagnostico", { replace: true });
      }}
      result={result}
      resultId={resultId}
      titleRef={titleRef}
    />
  );
}
```

`NavigateToDiagnostic` pode ser um efeito privado da pagina; nao precisa virar
abstracao generica.

## CSS base sugerido

```css
.diagnostic-page {
  display: grid;
  gap: var(--space-10);
}

.diagnostic-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(31rem, 1.08fr);
  gap: clamp(var(--space-8), 6vw, var(--space-16));
  align-items: center;
}

.diagnostic-intro h1 {
  max-width: 36rem;
  color: var(--color-brand-navy);
}

.diagnostic-highlights {
  display: grid;
  gap: var(--space-3);
  padding: 0;
  list-style: none;
}

.diagnostic-card {
  display: grid;
  gap: var(--space-6);
  padding: clamp(var(--space-6), 4vw, var(--space-10));
  background: var(--color-white);
  border-radius: 1.25rem;
  box-shadow: var(--shadow-diagnostic-card);
}

.diagnostic-card fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.diagnostic-card legend {
  margin-bottom: var(--space-6);
  color: var(--color-brand-navy);
  font-size: clamp(1.25rem, 2.2vw, 1.5rem);
  font-weight: 800;
  line-height: 1.35;
}

.diagnostic-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}

.diagnostic-option:last-child {
  grid-column: 1 / -1;
}

.diagnostic-option {
  position: relative;
  display: block;
}

.diagnostic-option input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  opacity: 0;
}

.diagnostic-option span {
  display: flex;
  min-height: 3rem;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  color: var(--color-brand-navy);
  font-weight: 700;
  border: 1px solid var(--color-border-strong);
  border-radius: 0.625rem;
  cursor: pointer;
}

.diagnostic-option input:checked + span {
  color: var(--color-text-inverse);
  background: var(--color-action-primary);
  border-color: var(--color-action-primary);
}

.diagnostic-option input:focus-visible + span {
  outline: 3px solid rgba(244, 121, 32, 0.8);
  outline-offset: 3px;
}

@media (max-width: 64rem) {
  .diagnostic-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 30rem) {
  .diagnostic-options {
    grid-template-columns: 1fr;
  }

  .diagnostic-option:last-child {
    grid-column: auto;
  }
}
```

Confirmar `--shadow-diagnostic-card`, estado selecionado e cor primaria no
Figma Make antes de adicionar tokens. O radio deve permanecer acessivel; se a
tecnica de ocultacao falhar em algum navegador/leitor, usar `clip-path` padrao
de visually-hidden ou manter o controle visivel.

## Responsividade

### Desktop — 1440 px

- duas colunas como no frame;
- container util proximo de 1200 px;
- card com largura maxima aproximada de 619 px;
- opcoes `Sim`/`Nao` lado a lado;
- stepper geral horizontal;
- navegacao inferior distribuida.

### Tablet — 1024 e 768 px

- empilhar introducao e card quando a leitura em duas colunas ficar estreita;
- manter o card antes da navegacao inferior;
- permitir quebra dos destaques;
- reduzir espacamentos sem reduzir alvos de toque;
- adaptar stepper geral sem scroll horizontal.

### Smartphone — 390 e 320 px

- uma coluna;
- tres opcoes empilhadas;
- botoes em coluna ou duas linhas conforme o texto;
- pergunta e labels com altura pelo conteudo;
- breadcrumb pode quebrar sem cortar;
- stepper geral pode usar versao compacta textual, preservando as quatro
  etapas e a etapa ativa;
- nenhum posicionamento absoluto estrutural.

## Acessibilidade

- exatamente um `h1` por pagina;
- pergunta em `legend`, nao apenas `h2` visual;
- radios nativos e labels clicaveis;
- progresso textual `Pergunta N de 8`;
- foco na pergunta ao trocar passo;
- foco no titulo do resultado ao navegar;
- `aria-live="polite"` somente para progresso, sem repetir toda a pergunta;
- botoes com `type` correto e estado disabled real;
- contraste WCAG AA em bordas, textos, selecao e foco;
- icones decorativos com `alt=""` e `aria-hidden="true"`;
- check dos destaques nao substitui o texto;
- suporte a teclado, zoom 200%, reflow e `prefers-reduced-motion`;
- nenhuma regra interna, matriz ou pontuacao no HTML.

## Estrategia de testes

### Dependencias propostas

- `vitest`;
- `jsdom`;
- `@testing-library/react`;
- `@testing-library/user-event`;
- `@testing-library/jest-dom`.

Adicionar `test` e, se desejado, `test:watch` ao `package.json`. Configurar
setup compartilhado; nao criar runner exclusivo da feature.

### Motor

- casos nominais da spec;
- pergunta 5 `Sim`, `Nao` e duvida isolada;
- pergunta 8 `Sim`, `Nao` e duvida isolada;
- quatro duvidas essenciais;
- duas duvidas nao essenciais;
- tres contradicoes;
- processo interno com pergunta 4 `Sim` e `Nao`;
- pergunta 4 incerta vencendo o processo interno;
- fallback;
- todas as `3^8 = 6.561` combinacoes, garantindo ID valido e determinismo.

### Reducer e sessao

- responder por ID;
- bloquear avanco sem resposta;
- voltar e preservar valor;
- concluir no oitavo passo;
- reiniciar;
- restaurar payload valido;
- rejeitar versao, ID, opcao e JSON invalidos;
- remover sessao invalida;
- confirmar ausencia de `localStorage`.

### Integracao

- uma pergunta no DOM;
- tres radios com nomes acessiveis;
- progresso de 1 a 8;
- teclado completo;
- revisao de resposta;
- conclusao e rota do resultado;
- cinco resultados;
- acesso direto invalido;
- recarga valida;
- foco de passo e resultado;
- CTAs corretos;
- regras internas ausentes do DOM.

## Ordem de implementacao

1. validar este plano com `/spec:validar`;
2. reconsultar ou obter export dos recursos do Figma Make;
3. consolidar tipos e remover contrato legado;
4. adicionar opcoes versionadas;
5. configurar testes;
6. testar e fechar o motor puro;
7. implementar reducer, parser e sessao;
8. consolidar navegacao compartilhada;
9. implementar componentes acessiveis;
10. montar `/diagnostico`;
11. montar `/diagnostico/resultado`;
12. baixar e verificar assets oficiais;
13. aplicar tokens e responsividade;
14. executar testes, comparacao visual e revisao final.

## Regras de implementacao

- nao instalar Tailwind;
- nao copiar JSX/Tailwind do Figma;
- nao usar coordenadas absolutas estruturais;
- nao duplicar header, footer, breadcrumb ou stepper compartilhado;
- nao inventar hints para perguntas;
- nao reduzir o fluxo para cinco perguntas;
- nao navegar para organizar informacoes antes do resultado;
- nao expor regras ou respostas no resultado;
- nao usar indices como chaves de negocio;
- nao confiar em dados de storage sem validacao;
- nao usar backend ou `localStorage`;
- nao alterar dados da Carta;
- nao usar Outfit ou Rawline; Inter permanece principal;
- nao substituir assets visiveis por emojis ou similares;
- preservar `href` real em links e a navegacao SPA compartilhada;
- manter o fallback `analisar-melhor`.

## Verificacao manual

- entradas pela home, explorar, header e URL;
- pergunta 1 ate 8;
- voltar e alterar resposta;
- recarregar no meio;
- concluir cada resultado possivel;
- recarregar resultado;
- acesso direto sem sessao;
- refazer;
- CTAs contextuais;
- historico voltar/avancar;
- 1440, 1024, 768, 390 e 320 px;
- teclado, leitor de tela, foco, contraste, zoom e reflow;
- movimento reduzido;
- ausencia de scroll horizontal;
- ausencia de chamadas de rede e `localStorage`;
- comparacao visual com screenshot do node `387:1020`;
- verificacao de cada asset local, slot, callsite e geometria.

## Criterios de conclusao

- `npm run typecheck` aprovado;
- `npm run build` aprovado;
- `npm run test` aprovado;
- oito perguntas e tres opcoes corretas;
- 6.561 combinacoes cobertas sem erro;
- cinco resultados corretos;
- sessao temporaria validada;
- acesso direto seguro;
- regras internas ausentes do DOM;
- navegacao compartilhada;
- Inter aplicada;
- responsividade e acessibilidade aprovadas;
- assets oficiais locais e verificados;
- divergencias do Figma documentadas e intencionais;
- nenhum bloqueio em `/spec:revisar`.

## Pendencia antes da implementacao visual

Reconsultar o Figma Make ou obter os arquivos exportados de `src/App.tsx`,
`src/index.css` e `src/imports/pasted_text/design-system-spec.md`. O contexto
retornou os resource links, mas a leitura individual falhou. Ate essa
confirmacao, os valores do frame e os tokens locais sao suficientes para o
planejamento, mas nao para fechar a verificacao visual final exigida pela
constitution.

# Plan: Diagnostico de Servico Publico

## Objetivo tecnico

Transformar os placeholders de `/diagnostico` e `/diagnostico/resultado` em um
fluxo interativo, responsivo e acessivel de oito perguntas. O fluxo deve manter
as respostas durante a sessao, calcular um unico resultado por uma funcao pura
e exibir somente a orientacao editorial associada ao identificador retornado.

Este documento define a abordagem tecnica. A implementacao visual e funcional
somente deve ocorrer em `/spec:implementar`, depois de `tasks.md`,
`implementation-plan.md` e `/spec:validar`.

## Fontes consultadas

- `specs/005-diagnostico-servico-publico/spec.md`;
- `docs/processo/constitution.md`;
- `docs/produto/mvp.md`, `escopo.md`, `fluxos.md` e `personas.md`;
- `docs/arquitetura/arquitetura-sistema.md`;
- `docs/arquitetura/fundacao-tecnica.md`;
- `docs/arquitetura/decisoes-tecnicas.md`;
- `docs/design-system/mapa-figma-telas.md`;
- `docs/design-system/tokens-e-componentes.md`;
- specs 002 e 003, para shell e entradas no diagnostico;
- rotas, paginas, componentes, estilos e contratos atuais em `src/`;
- conteudo aprovado em `src/content/diagnostico/`;
- Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, nodes mapeados `387:1020`
  (questionario) e `387:1362` (resultado);
- Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, conforme a documentacao
  local.

O `/spec:plano-implementacao` deve consultar novamente o Figma Design e o
Figma Make para confirmar layout, dimensoes, estados, tokens, responsividade e
assets antes do codigo definitivo.

## Estado atual

- A aplicacao usa React 19, TypeScript e Vite.
- O roteamento e proprio, baseado em `window.history`, `popstate`, `findRoute`
  e estado local em `App.tsx`; nao existe React Router.
- As rotas `/diagnostico` e `/diagnostico/resultado` ja estao registradas.
- `/diagnostico` ja possui `figmaNodeId: "387:1020"` e `specId` correto.
- `/diagnostico/resultado` deve usar `figmaNodeId: "387:1362"` e o mesmo
  `specId`.
- `DiagnosticoPage.tsx` exibe o cabecalho, os destaques e oito cards
  provisoriamente, mas ainda nao possui formulario, progresso ou navegacao.
- `ResultadoDiagnosticoPage.tsx` ainda e um placeholder.
- `perguntas.ts`, `respostas.ts` e `condicoes.ts` ja contem a copy e a regra
  aprovadas e devem ser tratadas como fontes existentes a validar.
- `src/features/diagnostico/diagnostico.types.ts` possui um contrato legado
  divergente: usa `nao-sei` e um resultado booleano simplificado.
- Nao existe contexto de navegacao acessivel pelas paginas.
- Nao existe infraestrutura de testes automatizados no `package.json`.
- O CSS atual e global, com tokens em `src/styles/tokens.css`.
- Inter ja e a fonte principal do projeto.

## Decisoes de arquitetura

### 1. Separar conteudo, regra, estado e apresentacao

Manter quatro responsabilidades independentes:

- conteudo das perguntas em `src/content/diagnostico/perguntas.ts`;
- conteudo dos resultados em `src/content/diagnostico/respostas.ts`;
- regra pura em `src/content/diagnostico/condicoes.ts` ou, se consolidado no
  plano detalhado, em `src/features/diagnostico/diagnostico.rules.ts`;
- estado e transicoes do fluxo em `src/features/diagnostico/`;
- componentes e paginas apenas para apresentacao e eventos de interface.

Nao duplicar perguntas, respostas ou condicionais em JSX. Caso a regra seja
movida da pasta de conteudo para a feature, manter reexportacao compativel e
uma unica implementacao canonica.

### 2. Consolidar um unico contrato de dominio

O contrato oficial deve usar:

```ts
type OpcaoDiagnostico = "sim" | "nao" | "nao-tenho-certeza";

type RespostasParciaisDiagnostico = Partial<
  Record<PerguntaDiagnosticoId, OpcaoDiagnostico>
>;

type RespostasDoDiagnostico = Readonly<
  Record<PerguntaDiagnosticoId, OpcaoDiagnostico>
>;

type RespostaDiagnosticoId =
  | "etapa-de-outro-servico"
  | "processo-interno"
  | "servico-publico"
  | "autosservico"
  | "analisar-melhor";
```

`src/features/diagnostico/diagnostico.types.ts` deve ser atualizado para
reexportar os tipos canonicos ou removido quando nao houver consumidores. Nao
manter `nao-sei`, `caracterizaServico: boolean` ou outro segundo modelo
incompativel.

### 3. Modelar o fluxo por ID, nao por indice de negocio

Estado proposto:

```ts
type DiagnosticoState = {
  currentQuestionId: PerguntaDiagnosticoId;
  answers: RespostasParciaisDiagnostico;
  completed: boolean;
};

type DiagnosticoAction =
  | {
      type: "answer";
      questionId: PerguntaDiagnosticoId;
      value: OpcaoDiagnostico;
    }
  | { type: "next" }
  | { type: "previous" }
  | { type: "restart" }
  | { type: "restore"; state: DiagnosticoState };
```

A ordem visual pode ser derivada de `questions` e `order`, mas a resposta deve
sempre ser armazenada pela chave `PerguntaDiagnosticoId`. Isso impede que uma
reordenacao acidental associe respostas a regras erradas.

Usar `useReducer` para concentrar transicoes e facilitar testes. O reducer nao
deve calcular copy nem acessar DOM, storage ou historico.

### 4. Manter o resultado derivado das respostas

Ao concluir:

1. validar que os oito IDs possuem uma opcao reconhecida;
2. converter o mapa parcial em `RespostasDoDiagnostico`;
3. chamar `obterRespostaDoDiagnostico`;
4. armazenar o estado concluido da sessao;
5. navegar para `/diagnostico/resultado`;
6. na pagina de resultado, recalcular o ID a partir das respostas validadas;
7. buscar a copy em `respostasDiagnosticoPorId`.

Nao confiar em um resultado textual vindo de URL, storage ou estado de
navegacao. O identificador e sempre derivado novamente da regra canonica.

### 5. Preservar a sessao com escopo minimo

Usar estado React como fonte durante a interacao e `sessionStorage` somente
para suportar:

- navegacao da pagina de perguntas para a pagina de resultado;
- recarga acidental na mesma aba;
- voltar para revisar respostas durante a sessao.

Contrato proposto:

```ts
const DIAGNOSTICO_SESSION_KEY = "simplifica-carta:diagnostico:v1";

type DiagnosticoSession = {
  version: 1;
  currentQuestionId: PerguntaDiagnosticoId;
  answers: RespostasParciaisDiagnostico;
  completed: boolean;
};
```

Regras:

- validar o objeto lido antes de usa-lo;
- ignorar e remover payload invalido ou de versao desconhecida;
- nao usar `localStorage`;
- nao armazenar texto, dados pessoais ou informacoes da Carta;
- `restart` remove a chave e volta a primeira pergunta;
- a sessao nao cria historico permanente.

Se o contrato de estado compartilhado da aplicacao estiver implementado antes
da feature 005 e cobrir recarga e rotas, o plano detalhado pode dispensar
`sessionStorage`, desde que preserve os mesmos comportamentos.

### 6. Usar navegacao compartilhada

As paginas hoje nao recebem `navigate`. A implementacao deve reutilizar o
contrato de navegacao consolidado pela feature 002. Se ainda nao existir,
extrair de `App.tsx` um `NavigationContext` com:

```ts
type NavigationContextValue = {
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean }) => void;
};
```

O contexto deve continuar usando `window.history` e `popstate`. Nao criar um
segundo roteador dentro do diagnostico e nao manipular `pushState` diretamente
em cada componente.

Ao concluir, usar `navigate("/diagnostico/resultado")`. Ao tentar acessar o
resultado sem uma sessao completa e valida, usar
`navigate("/diagnostico", { replace: true })` ou mostrar uma acao equivalente
definida no plano detalhado.

### 7. Renderizar uma pergunta ativa por vez

A pagina `/diagnostico` deve compor:

1. header compartilhado;
2. introducao do diagnostico;
3. lista dos tres destaques;
4. indicador textual de progresso;
5. um unico card com a pergunta ativa;
6. grupo das tres respostas;
7. controles `Voltar`, `Continuar` ou `Ver resultado`;
8. acao para recomecar;
9. footer compartilhado.

O DOM nao deve manter oito fieldsets simultaneamente escondidos por CSS. Isso
reduz ruido para leitores de tela e evita foco em perguntas inativas.

### 8. Usar semantica nativa de formulario

Estrutura planejada:

```tsx
<form onSubmit={handleSubmit}>
  <fieldset>
    <legend>{question.text}</legend>
    {/* tres inputs radio com labels visiveis */}
  </fieldset>
  {/* navegacao do passo */}
</form>
```

Cada opcao deve ser um `input type="radio"` real. Cards clicaveis podem
estilizar o `label`, sem substituir a semantica do controle. `name` deve ser
estavel por pergunta, e `value` deve usar `OpcaoDiagnostico`.

O botao de continuidade fica desabilitado enquanto a pergunta atual estiver
sem resposta. Se houver tentativa de envio invalido por mecanismo alternativo,
exibir mensagem ligada ao `fieldset` e mover foco para o grupo.

### 9. Tratar foco e anuncio de progresso

- O titulo da pergunta deve receber foco programatico ao avancar ou voltar.
- O progresso visivel deve informar `Pergunta N de 8`.
- Mudancas de passo podem ser anunciadas por uma regiao `aria-live="polite"`
  pequena e nao duplicativa.
- Ao abrir o resultado, focar o `h1` ou titulo principal do resultado com
  `tabIndex={-1}`.
- Ao recomecar, focar a introducao ou primeira pergunta.
- Respeitar `prefers-reduced-motion`; nenhuma animacao e necessaria para o
  funcionamento.

### 10. Renderizar o resultado por ID

`ResultadoDiagnosticoPage` deve:

- obter e validar as oito respostas da sessao;
- redirecionar ou oferecer inicio quando nao houver execucao valida;
- calcular o ID pelo motor puro;
- resolver `respostasDiagnosticoPorId[id]`;
- exibir somente titulo e descricao do resultado;
- aplicar a composicao oficial do node `387:1362`: cabecalho de resultado,
  ilustracao, card informativo e navegacao inferior;
- manter o texto vindo de `respostas.ts`, inclusive quando divergir da copy de
  amostra do Figma;
- dimensionar o card pelo conteudo para acomodar os cinco resultados;
- nao exibir respostas, criterios, pesos, combinacoes ou pontuacao;
- oferecer `Refazer diagnóstico`;
- oferecer continuidade contextual somente quando prevista no escopo.

Matriz editorial versionada em `src/content/diagnostico/acoes.ts`:

- todos: `Refazer diagnóstico` no card e `Voltar para página inicial` na
  navegacao inferior;
- `servico-publico` e `autosservico`: `Organizar informações` na navegacao
  inferior, com destino `/organizar-informacoes`;
- `analisar-melhor`, `etapa-de-outro-servico` e `processo-interno`:
  `Consultar ajuda` no card, com destino `/ajuda`, sem CTA para organizacao.

O JSX deve consumir a matriz versionada e nao definir rotulos ou destinos por
condicionais locais.

## Componentes provaveis

### Componentes da feature

- `DiagnosticoIntro`: titulo, subtitulo e destaques, se a composicao justificar
  extracao;
- `DiagnosticoProgress`: texto e indicador visual de progresso;
- `DiagnosticoQuestionCard`: `form`, `fieldset`, `legend` e opcoes;
- `DiagnosticoOption`: radio + label visual, somente se reduzir repeticao;
- `DiagnosticoControls`: voltar, continuar, concluir e recomecar;
- `DiagnosticoResultCard`: indicador informativo, titulo, descricao e acoes
  condicionais do resultado, conforme a geometria do node `387:1362`.

Componentes pequenos podem permanecer privados a pagina quando nao houver
reuso ou ganho de teste. Nao criar abstracoes genericas para um unico caso.

### Componentes compartilhados

- `AppShell`: continuar responsavel por header, main e footer;
- `ButtonLink`: usar para CTAs navegaveis quando o contrato for suficiente;
- `PageHeader`: reutilizar apenas se representar fielmente o frame;
- componentes de breadcrumb e navegacao definidos pela feature 002.

`PlaceholderCard` nao deve ser o componente final do questionario, pois nao
possui semantica de formulario, estados de selecao ou controles de navegacao.

## Estrutura de arquivos proposta

### Alterar

- `src/app/App.tsx`, somente para expor navegacao compartilhada se ainda
  necessario;
- `src/app/routes.tsx`, apenas se metadados de resultado ou layout precisarem
  ser ajustados;
- `src/pages/DiagnosticoPage.tsx`;
- `src/pages/ResultadoDiagnosticoPage.tsx`;
- `src/content/diagnostico/perguntas.ts`, somente para contratos ou rotulos de
  opcao aprovados ainda ausentes;
- `src/content/diagnostico/respostas.ts`, somente para metadados de CTA
  aprovados;
- `src/content/diagnostico/condicoes.ts`, para ajustes encontrados por testes;
- `src/features/diagnostico/diagnostico.types.ts`, para eliminar o contrato
  legado;
- `src/styles/tokens.css`, somente para tokens confirmados e ausentes;
- `src/styles/globals.css` ou arquivo de pagina consolidado pelo plano
  detalhado.

### Criar, se confirmados no plano detalhado

- `src/app/NavigationContext.tsx`, se a feature 002 ainda nao tiver criado;
- `src/features/diagnostico/DiagnosticoContext.tsx` ou
  `useDiagnostico.ts`, para estado/reducer e sessao;
- `src/features/diagnostico/diagnostico.reducer.ts`;
- `src/features/diagnostico/diagnostico.session.ts`;
- `src/features/diagnostico/diagnostico.validation.ts`;
- `src/components/diagnostico/DiagnosticoQuestionCard.tsx`;
- `src/components/diagnostico/DiagnosticoProgress.tsx`;
- `src/components/diagnostico/DiagnosticoResultCard.tsx`;
- `src/styles/pages/diagnostico.css`, se o projeto adotar CSS por pagina;
- testes unitarios e de integracao da feature;
- assets locais confirmados no inventario do Figma.

Nao criar backend, endpoint, banco, schema de Carta ou roteador exclusivo.

## Estrategia do motor de decisao

### Preservar a precedencia aprovada

O motor deve continuar avaliando nesta ordem:

1. duvida essencial ou duas ou mais duvidas;
2. processo interno forte;
3. contradicoes;
4. etapa de outro servico;
5. servico publico e autosservico;
6. fallback `analisar-melhor`.

No padrao interno forte, a pergunta 4 pode ser `Sim` ou `Não` sem alterar o
resultado. Se ela for `Não tenho certeza`, a regra anterior de duvida essencial
prevalece e retorna `analisar-melhor`.

As funcoes auxiliares podem permanecer privadas. Somente
`obterRespostaDoDiagnostico` precisa ser exportada para consumo da interface e
testes de caixa-preta.

### Cobrir todo o dominio de entrada

Existem `3^8 = 6.561` combinacoes validas. Alem dos casos nominais da spec, um
teste parametrizado deve percorrer todas elas e confirmar que:

- a funcao nunca lanca erro;
- sempre retorna um dos cinco IDs permitidos;
- a mesma entrada sempre retorna o mesmo ID;
- nenhuma combinacao retorna texto ou valor indefinido.

O teste exaustivo nao substitui casos nomeados de precedencia, pois precisa ser
possivel compreender por que cada regra critica vence.

## Estrategia de testes

### Infraestrutura

O projeto nao possui script `test`. O `/spec:plano-implementacao` deve decidir
entre:

- adicionar Vitest, Testing Library, `user-event` e `jest-dom` como
  infraestrutura compartilhada; ou
- se outra feature ja tiver feito isso, apenas reutilizar a configuracao.

Como esta feature possui regra combinatoria e interacao multietapas, testes
automatizados sao parte recomendada da implementacao e nao devem ser
substituidos apenas por verificacao manual.

### Testes unitarios do motor

- servico publico com pergunta 5 = `Sim`;
- servico publico com pergunta 5 = `Não`;
- servico publico com duvida isolada na pergunta 5;
- autosservico com criterios principais e pergunta 8 = `Sim`;
- servico publico com pergunta 8 = `Não tenho certeza`;
- etapa de outro servico no padrao completo;
- processo interno com pergunta 4 = `Sim` e `Não`;
- pergunta 4 = `Não tenho certeza` retornando `analisar-melhor`, mesmo quando
  as demais respostas formarem o padrao interno;
- duvida isolada em cada criterio essencial;
- duas duvidas em criterios nao essenciais;
- cada uma das tres contradicoes;
- precedencia do processo interno sobre a terceira contradicao;
- combinacao nao reconhecida caindo em `analisar-melhor`;
- enumeracao exaustiva das 6.561 combinacoes.

### Testes do reducer e sessao

- responder por ID sem alterar outras respostas;
- avancar e voltar preservando valores;
- impedir avanco sem resposta;
- concluir somente com oito respostas validas;
- reiniciar limpando estado e `sessionStorage`;
- restaurar payload valido da versao atual;
- rejeitar JSON invalido, IDs desconhecidos, valores invalidos e versao
  incompatível;
- nao persistir texto de resultado nem dados fora do diagnostico.

### Testes de integracao da interface

- renderizar somente uma pergunta ativa;
- exibir `Pergunta 1 de 8` e atualizar o progresso;
- oferecer as tres opcoes com radios e labels;
- desabilitar continuidade sem resposta;
- percorrer as oito perguntas somente por teclado;
- voltar e encontrar a opcao previamente selecionada;
- concluir e navegar ao resultado correto;
- focar o titulo ao trocar de passo e ao abrir o resultado;
- refazer e retornar a primeira pergunta sem respostas;
- acesso direto ao resultado sem sessao valida;
- CTAs de continuidade coerentes com o tipo de resultado;
- ausencia das regras internas no DOM.

### Verificacoes manuais

- executar `npm run typecheck`;
- executar `npm run build`;
- executar `npm run test`, quando configurado;
- testar entrada pela home, pagina explorar, header e URL direta;
- testar recarga no meio do questionario e na pagina de resultado;
- testar voltar e avancar do navegador;
- testar 1440, 1024, 768, 390 e 320 px;
- testar zoom de 200% e reflow;
- testar teclado, leitor de tela, foco e anuncio de progresso;
- testar `prefers-reduced-motion`;
- verificar ausencia de chamadas de rede e `localStorage`;
- comparar visualmente o questionario com `387:1020` e a pagina de resultado
  com `387:1362`.

## Estrategia visual e responsiva

### Desktop

- limitar a largura de leitura da introducao e do card;
- preservar hierarquia entre rotulo, titulo, destaques e questionario;
- manter opcoes com areas de clique amplas;
- posicionar controles sem separar visualmente o usuario da pergunta.

### Tablet

- permitir que os destaques quebrem de linha sem alterar a ordem;
- manter pergunta e opcoes em coluna quando isso favorecer a leitura;
- evitar larguras fixas do prototipo.

### Smartphone

- empilhar destaques, opcoes e controles;
- garantir alvos de toque adequados;
- manter `Voltar` e acao principal visiveis e distinguiveis;
- permitir quebra de perguntas longas sem corte;
- funcionar desde 320 px sem scroll horizontal.

Usar fluxo normal, Flexbox e Grid. Nao copiar coordenadas absolutas ou classes
Tailwind produzidas pelo Figma.

## Tokens e estados consolidados

O plano detalhado reconciliou Figma Design, a consulta ao Figma Make e os
tokens locais para:

- cores de fundo, texto, borda, progresso e selecao;
- tipografia Inter, pesos, tamanhos e alturas de linha;
- largura maxima do card;
- espacamento da introducao, destaques e formulario;
- raios, bordas e sombras;
- radio normal, hover, selecionado, foco e desabilitado;
- botoes normal, hover, active, focus-visible e disabled;
- resultado positivo, orientativo e inconclusivo sem depender somente de cor;
- transicoes permitidas com movimento reduzido.

Reutilizar tokens existentes quando semanticamente equivalentes. Nao espalhar
cores literais ou medidas do frame diretamente pelo JSX.

## Acessibilidade planejada

- um unico `h1` por pagina;
- `fieldset` e `legend` para a pergunta ativa;
- radios nativos com labels completos;
- progresso textual e, se usado, `progress` com nome acessivel;
- ordem de foco coerente com a ordem visual;
- foco gerenciado sem prender o usuario;
- mensagens de erro associadas por `aria-describedby`;
- `aria-live` somente para atualizacoes necessarias;
- icones decorativos com `aria-hidden="true"`;
- contraste suficiente nos estados normal, selecionado, foco e desabilitado;
- nenhuma informacao comunicada apenas por cor;
- suporte a zoom, reflow e texto longo.

## Riscos e mitigacoes

### Contrato legado divergente

Risco: partes diferentes do app usarem `nao-sei` e
`nao-tenho-certeza`, ou resultado booleano e resultado por ID.

Mitigacao: consolidar os tipos canonicos, eliminar o contrato legado e buscar
todas as importacoes antes da implementacao.

### Regra duplicada na interface

Risco: a pagina reproduzir condicionais para escolher copy ou CTA e divergir
de `obterRespostaDoDiagnostico`.

Mitigacao: a pagina consome somente o ID retornado e o mapa
`respostasDiagnosticoPorId`; testes garantem uma unica fonte da decisao.

### Sobreposicao de regras

Risco: a terceira contradicao capturar o padrao interno quando a pergunta 4 for
`Sim`.

Mitigacao: manter a precedencia documentada e testes nomeados para pergunta 4
como `Sim`, `Não` e `Não tenho certeza`, confirmando que a duvida essencial
vence antes do padrao interno.

### Combinacoes nao especificadas

Risco: inferir um resultado positivo para uma combinacao ambigua.

Mitigacao: fallback conservador `analisar-melhor` e teste exaustivo do dominio.

### Estado perdido entre rotas

Risco: navegar para o resultado e perder respostas, ou exibir resultado antigo
de outra execucao.

Mitigacao: sessao versionada e validada, resultado recalculado e limpeza
explicita ao recomecar.

### Roteador paralelo

Risco: manipular historico diretamente na feature e divergir do `App`.

Mitigacao: expor e reutilizar o contrato de navegacao compartilhado.

### Persistencia indevida

Risco: transformar o diagnostico em historico permanente ou misturar respostas
com dados da Carta.

Mitigacao: `sessionStorage` com chave exclusiva, sem dados pessoais, limpeza no
restart e proibicao de `localStorage` ou backend.

### Acesso direto ao resultado

Risco: inventar resultado padrao ou mostrar orientacao de sessao anterior
invalida.

Mitigacao: validar oito respostas e versao da sessao antes de renderizar; caso
contrario, substituir a rota ou oferecer inicio explicito.

### Foco perdido entre passos

Risco: leitores de tela e usuarios de teclado nao perceberem a troca de
pergunta ou resultado.

Mitigacao: foco programatico no titulo, progresso textual e testes com teclado
e tecnologia assistiva.

### Dependencia das features seguintes

Risco: criar CTAs para paginas ainda placeholder ou absorver escopo de
organizacao e ajuda.

Mitigacao: limitar a feature aos destinos ja registrados, sem implementar o
conteudo das features 006 ou 013.

## Limites da implementacao

- nao usar IA, pontuacao probabilistica ou chamada externa;
- nao enviar respostas ao backend;
- nao criar historico ou login;
- nao usar `localStorage`;
- nao exibir regras internas;
- nao implementar a etapa de organizacao das informacoes;
- nao implementar materiais complementares;
- nao alterar dados da Carta;
- nao publicar no Paraiba Digital;
- nao criar um novo sistema de rotas.

## Criterio de prontidao para `/spec:tarefas`

O plano estara pronto quando:

- contratos canonicos e remocao do tipo legado estiverem definidos;
- fluxo de estado, sessao e navegacao entre rotas estiver definido;
- semantica do formulario e gerenciamento de foco estiverem definidos;
- composicao das paginas de pergunta e resultado estiver definida;
- regra de classificacao e precedencia permanecerem alinhadas a spec;
- estrategia exaustiva de testes cobrir as 6.561 combinacoes;
- riscos de persistencia, acesso direto e roteador paralelo estiverem
  mitigados;
- consulta detalhada ao Figma estiver reservada para
  `/spec:plano-implementacao` antes do codigo.

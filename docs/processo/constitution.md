# Constitution Manual do Simplifica Carta

Este documento define as regras de trabalho do projeto. Ele funciona como a nossa constitution manual inspirada no Spec Kit, sem depender dos comandos oficiais do Spec Kit.

## Principios

### 1. Documentacao antes do codigo

Toda funcionalidade relevante deve passar por `spec.md`, `plan.md`, `tasks.md` e, quando houver implementacao visual ou complexa, `implementation-plan.md` antes da implementacao.

Codigo so deve ser escrito quando a etapa atual for `/spec:implementar`.

Quando existir `implementation-plan.md`, ele deve ser usado como base principal da implementacao.

A aplicabilidade dos sete artefatos, seus estados e a preservação de histórico seguem a [convenção documental](../../specs/README.md). Antes de implementar contratos dependentes, registrar a validação documental atual; registrar entrega e checks efetivos em `verification.md`. Prontidão documental, implementação, aceite funcional e aceite visual são estados distintos. Dispensa de plano detalhado para trabalho simples exige justificativa em `plan.md`; não decorre apenas da ausência de interface.

### 2. O produto orienta, nao substitui o Paraiba Digital

O Simplifica Carta deve apoiar a preparacao das informacoes da Carta de Servicos, mas a publicacao oficial continua sendo feita manualmente no Paraiba Digital.

### 3. MVP enxuto e evolutivo

O MVP deve resolver o fluxo principal com clareza. Funcionalidades fora do escopo devem ser registradas como evolucao futura, nao misturadas ao MVP.

### 4. Conteudo versionado

Orientacoes, exemplos, perguntas, etapas e textos institucionais devem ficar versionados no projeto sempre que possivel.

### 5. Acessibilidade e responsividade desde o inicio

As telas devem funcionar em computador, tablet e smartphone, com navegacao clara, contraste adequado, foco visivel e linguagem simples.

### 6. Design guiado pelo Figma

O Figma Design do prototipo orienta fluxo, layout, composicao, ordem das secoes e comportamento das telas. O Figma Make orienta tokens, componentes, cores, tipografia, espacamentos, botoes, cards, navegacao e formularios.

Antes de implementar trabalho visual, o Codex deve consultar via MCP:

- Figma Design do prototipo: `fileKey YaVUdqYa3boHpvGrxf4ZJ5`, pagina raiz atual `167:2`, node inicial recomendado `310:175`.
- Figma Make do design system: `fileKey dVm7lEZdBFqOiiySWLWUqp`, `nodeId 0:1`.

### 7. Dados da Carta sem persistencia permanente no MVP

As informacoes preenchidas na Carta de Servicos devem ser mantidas apenas durante a sessao. O MVP nao tera login nem salvamento permanente de rascunhos.

### 8. Atendimento agendado com minimo necessario

O backend do MVP existe apenas para registrar solicitacoes basicas de atendimento e notificar a equipe responsavel.

## Mini comandos internos

### `/spec:criar`

Cria ou revisa o `spec.md` de uma funcionalidade. Deve identificar problema, objetivo, usuarios, requisitos, criterios de aceite, fora de escopo e dependencias.

### `/spec:planejar`

Cria ou revisa o `plan.md`. Deve indicar abordagem tecnica, arquivos provaveis, estrutura de dados, componentes, validacoes, riscos e estrategia de testes.

### `/spec:tarefas`

Cria ou revisa o `tasks.md`. Deve quebrar o trabalho em tarefas pequenas, verificaveis e implementaveis.

### `/spec:plano-implementacao`

Cria ou revisa o `implementation-plan.md`. Deve consolidar contexto, referencias do Figma, arquivos afetados, contratos de componentes, codigo base em React/TypeScript/CSS, regras de implementacao e validacoes.

### `/spec:validar`

Compara `spec.md`, `plan.md`, `tasks.md` e `implementation-plan.md`, quando existir, com ERS, Figma Design, Figma Make, roadmap e constitution.

Registra o parecer atual em `validation.md`, identificando base, fontes realmente consultadas, pendências e tarefas afetadas. Fontes não acessadas não podem ser declaradas verificadas. O histórico permanece identificado e separado das instruções vigentes.

### `/spec:implementar`

Implementa codigo seguindo os documentos aprovados. Quando existir `implementation-plan.md`, deve segui-lo como base principal e adaptar apenas o necessario a estrutura real do projeto.

### `/spec:revisar`

Revisa a funcionalidade implementada, considerando requisitos, acessibilidade, responsividade, aderencia ao Figma e lacunas tecnicas.

Registra em `verification.md` os cenários e checks executados, ambiente, resultados, defeitos e pendências. O quickstart fornece o roteiro reproduzível; sua existência não comprova execução.

## Onde colocar cada tipo de informacao

- ERS: requisitos oficiais, regras de negocio amplas e escopo institucional.
- README: orientacao geral para entender e iniciar o projeto.
- `docs/produto`: visao, MVP, escopo, personas e fluxos.
- `docs/arquitetura`: arquitetura, stack e decisoes tecnicas.
- `docs/design-system`: referencias do Figma Design, Figma Make, tokens e componentes.
- `docs/ia`: regras de uso do Codex e prompts padroes.
- `docs/implementation-plan.md`: estrategia geral de uso do `implementation-plan.md` nas specs.
- `docs/decisoes`: ADRs.
- `specs`: especificações, planos, tarefas, planos de implementação, quickstarts, validações e verificações por funcionalidade; histórico datado separado dos contratos ativos.
- Codigo: implementacao executavel, componentes, paginas, validadores e testes.

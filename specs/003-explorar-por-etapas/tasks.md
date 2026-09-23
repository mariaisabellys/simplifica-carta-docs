# Tasks: Explorar por Etapas

## Convencoes

- As tarefas devem ser executadas na ordem das dependencias indicadas.
- Cada tarefa deve produzir uma alteracao pequena e verificavel.
- Alteracoes de codigo so podem comecar em `/spec:implementar`.
- Como esta funcionalidade e visual, `implementation-plan.md` deve ser criado e
  validado antes da implementacao.
- Os checkboxes permanecem desmarcados ate existir evidencia de conclusao no
  repositorio ou no registro de validacao.
- A pagina deve permanecer um indice de links independentes, nunca um stepper
  com progresso, bloqueios ou conclusao.

## Fase 1 — Preparacao obrigatoria

- [x] **T001 — Criar o plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 003-explorar-por-etapas`.
  - Consolidar estrutura visual, contratos, codigo base, CSS, assets,
    breakpoints e estrategia de testes.
  - Registrar o Figma Design `575:483` e o Figma Make `0:1` como fontes.
  - Evidencia: `specs/003-explorar-por-etapas/implementation-plan.md` criado.

- [x] **T002 — Conferir o estado real da feature 002**
  - Verificar quais contratos de shell, navegacao interna, foco, containers,
    `ButtonLink`, header e footer foram efetivamente implementados.
  - Identificar divergencias entre o plano da 002 e o codigo disponivel.
  - Proibir duplicacao de header, footer ou roteamento dentro da nova pagina.
  - Dependencia: T001.
  - Evidencia: integracoes e eventuais lacunas registradas no
    `implementation-plan.md`.

- [x] **T003 — Consultar e mapear o Figma Design**
  - Consultar via MCP o arquivo `YaVUdqYa3boHpvGrxf4ZJ5`, node `575:483`.
  - Confirmar hierarquia, dimensoes, grid, espacamentos, ordem das regioes e
    comportamento visual dos quatro cards e do CTA final.
  - Tratar classes Tailwind e coordenadas absolutas retornadas como referencia,
    nao como codigo para copia.
  - Dependencia: T001.
  - Evidencia: mapeamento visual registrado no `implementation-plan.md`.

- [x] **T004 — Confirmar tokens e estados no Figma Make**
  - Consultar via MCP o arquivo `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.
  - Mapear tipografia, cores, gradiente, bordas, sombras, raios, espacamentos e
    estados interativos para tokens semanticos.
  - Resolver divergencias com `src/styles/tokens.css` e com os tokens da 002 sem
    alterar outras features de forma destrutiva.
  - Dependencias: T002, T003.
  - Evidencia: tabela de tokens e estados no `implementation-plan.md`.

- [x] **T005 — Inventariar os assets da pagina**
  - Identificar no node `575:483` os icones reais das quatro etapas e demais
    elementos que precisam ser exportados.
  - Separar assets autorais de formas simples que podem ser reproduzidas por
    CSS.
  - Definir nomes, formatos, destino local e tratamento acessivel.
  - Nao redesenhar SVGs do Figma nem planejar dependencia de URLs temporarias.
  - Dependencias: T003, T004.
  - Evidencia: inventario de assets no `implementation-plan.md`.

- [x] **T006 — Fechar a estrategia de testes**
  - Verificar se Vitest, Testing Library e `jest-dom` ja estao configurados pela
    feature 002.
  - Definir os testes automatizados da pagina, conteudo, links e breadcrumb.
  - Se a infraestrutura ainda nao existir, decidir se entra nesta feature e
    registrar a justificativa.
  - Dependencias: T001, T002.
  - Evidencia: estrategia e arquivos de teste previstos no
    `implementation-plan.md`.

- [ ] **T007 — Validar a documentacao antes do codigo**
  - Executar `/spec:validar 003-explorar-por-etapas`.
  - Comparar `spec.md`, `plan.md`, `tasks.md`, `implementation-plan.md`, MVP,
    fluxos, constitution, Figma Design e Figma Make.
  - Resolver divergencias bloqueantes antes de implementar.
  - Dependencias: T001–T006.
  - Evidencia: validacao documental sem bloqueios abertos.

## Fase 2 — Conteudo e contratos

- [ ] **T008 — Definir os tipos do conteudo da pagina**
  - Modelar identificador, numero, titulo, descricao, acao, destino, icone e
    variacao visual de cada etapa.
  - Restringir os destinos aos quatro caminhos oficiais.
  - Modelar breadcrumb, introducao e CTA do guia completo.
  - Nao incluir campos de progresso, conclusao, bloqueio ou persistencia.
  - Dependencia: T007.
  - Evidencia: tipos TypeScript compilando sem erros.

- [ ] **T009 — Criar o conteudo versionado**
  - Criar `src/content/pages/explorar-por-etapas.ts` ou o caminho consolidado no
    plano detalhado.
  - Registrar titulo, introducao, quatro cards, rotulos de acao e CTA final.
  - Preservar a ordem das etapas 1, 2, 3 e 4.
  - Explicar que o tutorial conduz ao cadastro manual no Paraiba Digital.
  - Dependencia: T008.
  - Evidencia: pagina capaz de consumir toda a copy sem textos editoriais
    duplicados no JSX.

- [ ] **T010 — Validar os destinos tipados**
  - Confirmar os pares de acao e rota:
    - `Iniciar diagnostico` → `/diagnostico`;
    - `Ver lista de informacoes` → `/organizar-informacoes`;
    - `Elaborar e conferir` → `/formulario-carta`;
    - `Ver tutorial` → `/tutorial-paraiba-digital`;
    - `Ir para o guia passo a passo` → `/diagnostico`.
  - Garantir que todos os destinos estejam registrados na tabela de rotas.
  - Dependencia: T009.
  - Evidencia: dados e rotas sem divergencias.

- [ ] **T011 — Preparar os assets locais**
  - Exportar ou baixar do Figma os icones confirmados no inventario.
  - Salvar os arquivos em `src/assets/explorar-por-etapas/` ou no diretorio
    compartilhado definido no plano detalhado.
  - Conferir formato, integridade, nome e correspondencia de cada arquivo.
  - Dependencias: T005, T007.
  - Evidencia: assets reais versionados localmente, sem URL temporaria.

## Fase 3 — Rota e componentes

- [ ] **T012 — Registrar a rota da pagina**
  - Criar a entrada `/explorar-por-etapas` em `src/app/routes.tsx`.
  - Associar `figmaNodeId: "575:483"` e
    `specId: "003-explorar-por-etapas"`.
  - Nao adicionar a rota automaticamente a header principal.
  - Dependencias: T007, T010.
  - Evidencia: `findRoute("/explorar-por-etapas")` resolve a pagina correta.

- [ ] **T013 — Garantir navegacao interna e acesso direto**
  - Integrar a nova rota ao contrato SPA existente, sem criar roteador paralelo.
  - Preservar `href` real nos links.
  - Confirmar acesso por URL, recarga, voltar e avancar do navegador.
  - Preservar rolagem para o topo e restauracao de foco definidas pela 002.
  - Dependencias: T002, T012.
  - Evidencia: navegacao funcional nos quatro modos de entrada.

- [ ] **T014 — Implementar ou reutilizar o breadcrumb**
  - Reutilizar o componente compartilhado, se existente.
  - Caso necessario, criar um `Breadcrumb` com `nav`, rotulo acessivel, link
    para `/` e `aria-current="page"` na pagina atual.
  - Manter separadores puramente decorativos.
  - Dependencias: T002, T008, T013.
  - Evidencia: breadcrumb semanticamente correto e navegavel por teclado.

- [ ] **T015 — Implementar o card de etapa**
  - Exibir numero, icone, titulo, descricao e link de acao.
  - Receber o conteudo por props sem decidir copy ou destino internamente.
  - Tratar o icone como decorativo, salvo decisao contraria documentada.
  - Aplicar variacao visual sem depender somente da cor para significado.
  - Nao adicionar estado de etapa atual, concluida ou bloqueada.
  - Dependencias: T004, T008, T011, T013.
  - Evidencia: um componente renderiza corretamente qualquer uma das quatro
    entradas tipadas.

- [ ] **T016 — Adequar o componente de link de acao**
  - Reutilizar `ButtonLink` e o contrato de navegacao da feature 002.
  - Adicionar somente as variantes realmente exigidas pelos cards e pelo CTA.
  - Manter semantica de link, foco visivel e nome acessivel.
  - Dependencias: T002, T004, T013.
  - Evidencia: links funcionais sem duplicar logica de navegacao.

## Fase 4 — Composicao da pagina

- [ ] **T017 — Implementar o hero da pagina**
  - Exibir o titulo `Explorar por etapas` e a introducao versionada.
  - Aplicar a composicao e o gradiente confirmados no Figma.
  - Garantir exatamente um `h1` na pagina.
  - Dependencias: T004, T009, T014.
  - Evidencia: hero renderizado com hierarquia de titulos correta.

- [ ] **T018 — Implementar a lista das quatro etapas**
  - Renderizar os cards a partir do conteudo versionado.
  - Usar lista ordenada ou estrutura semanticamente equivalente.
  - Preservar a ordem 1 a 4 no DOM e na apresentacao visual.
  - Garantir acesso livre a qualquer etapa, sem condicoes ou bloqueios.
  - Dependencias: T009, T015, T016, T017.
  - Evidencia: exatamente quatro cards com conteudo e destinos corretos.

- [ ] **T019 — Implementar o CTA do fluxo completo**
  - Posicionar o CTA depois da grade de cards.
  - Diferencia-lo visual e semanticamente dos acessos independentes.
  - Exibir `Ir para o guia passo a passo` com destino `/diagnostico`.
  - Dependencias: T009, T016, T018.
  - Evidencia: CTA final visivel, navegavel e com destino correto.

- [ ] **T020 — Montar a pagina final no shell compartilhado**
  - Compor breadcrumb, hero, lista de etapas e CTA na ordem do frame.
  - Manter header e footer sob responsabilidade do `AppShell`.
  - Nao introduzir `Materiais de apoio` ou `Guia de Linguagem Simples`.
  - Nao incorporar conteudo ou logica das paginas de destino.
  - Dependencias: T014, T017–T019.
  - Evidencia: pagina completa na rota, sem duplicacao do shell.

## Fase 5 — Estilos e responsividade

- [ ] **T021 — Aplicar tokens e variacoes visuais**
  - Reutilizar tokens da feature 002 e adicionar apenas os tokens semanticos
    confirmados para hero, cards e CTA.
  - Evitar valores literais repetidos e estilos definidos no JSX.
  - Implementar estados normal, hover, foco e active conforme o Figma Make.
  - Dependencias: T004, T020.
  - Evidencia: estilos consumindo tokens, sem instalar Tailwind.

- [ ] **T022 — Implementar o layout desktop**
  - Reproduzir a hierarquia do node `575:483` com grid/flex.
  - Exibir os quatro cards em grade de duas colunas.
  - Alinhar cards e acoes sem alturas fixas que cortem conteudo.
  - Dependencia: T021.
  - Evidencia: composicao desktop coerente em 1440 px.

- [ ] **T023 — Implementar tablet e smartphone**
  - Manter duas colunas apenas quando a largura util preservar legibilidade.
  - Migrar para uma coluna em telas estreitas sem mudar a ordem do DOM.
  - Garantir areas de toque adequadas e CTA final legivel.
  - Validar 1024, 768, 390 e 320 px sem sobreposicao ou scroll horizontal.
  - Dependencia: T022.
  - Evidencia: layout responsivo nos quatro tamanhos alvo.

- [ ] **T024 — Completar os requisitos de acessibilidade**
  - Garantir foco visivel, contraste WCAG 2.1 AA e nomes acessiveis claros.
  - Marcar icones e separadores decorativos para serem ignorados por leitores
    de tela.
  - Confirmar landmarks, hierarquia de titulos, ordem de foco e ordem de leitura.
  - Validar zoom de 200% e reflow.
  - Dependencias: T014–T023.
  - Evidencia: verificacao acessivel sem bloqueios.

- [ ] **T025 — Confirmar ausencia de estado e efeitos colaterais**
  - Verificar que a pagina nao acessa backend, armazenamento ou dados da Carta.
  - Confirmar que entrar, navegar e voltar nao cria, altera nem limpa progresso
    ou informacoes preenchidas.
  - Confirmar que nenhuma etapa aparece concluida, atual ou bloqueada.
  - Dependencia: T020.
  - Evidencia: inspecao de codigo e teste manual sem efeitos colaterais.

## Fase 6 — Testes e verificacao

- [ ] **T026 — Implementar os testes automatizados aprovados**
  - Cobrir titulo, introducao, breadcrumb e CTA final.
  - Cobrir exatamente quatro cards na ordem correta.
  - Cobrir rotulos e `href` das cinco acoes.
  - Cobrir navegacao interna e restauracao de foco, quando pertencentes ao
    contrato testavel desta feature.
  - Cobrir ausencia de indicadores de progresso e de entradas fora do MVP.
  - Dependencias: T006, T020, T025.
  - Evidencia: suite automatizada aprovada; se dispensada em T006, registrar a
    tarefa como nao aplicavel com justificativa.

- [ ] **T027 — Executar verificacoes tecnicas**
  - Executar `npm run typecheck`.
  - Executar `npm run build`.
  - Executar a suite de testes, quando configurada.
  - Verificar console, imports, assets e links internos.
  - Dependencia: T026.
  - Evidencia: comandos concluidos sem erros.

- [ ] **T028 — Verificar navegacao e acesso direto**
  - Abrir `/explorar-por-etapas` diretamente e recarregar a pagina.
  - Testar o acesso vindo da home.
  - Testar breadcrumb, quatro cards, CTA final e historico voltar/avancar.
  - Confirmar que paginas de destino incompletas permanecem responsabilidade de
    suas proprias specs.
  - Dependencias: T013, T027.
  - Evidencia: todos os caminhos navegaveis com rotas corretas.

- [ ] **T029 — Executar verificacao responsiva e acessivel**
  - Validar 1440, 1024, 768, 390 e 320 px.
  - Confirmar ausencia de corte, sobreposicao e scroll horizontal.
  - Percorrer a pagina apenas com teclado.
  - Conferir contraste, foco, nomes acessiveis, ordem de leitura e zoom de 200%.
  - Dependencias: T023, T024, T027.
  - Evidencia: checklist responsivo e acessivel concluido.

- [ ] **T030 — Comparar a entrega com o Figma**
  - Comparar a pagina desktop com o node `575:483`.
  - Confirmar composicao, hierarquia, cards, tokens, icones, estados e CTA.
  - Registrar divergencias intencionais de MVP, incluindo a ausencia de
    `Materiais de apoio` e `Guia de Linguagem Simples`.
  - Dependencia: T029.
  - Evidencia: revisao visual concluida e divergencias justificadas.

- [ ] **T031 — Revisar os criterios de aceite**
  - Conferir cada criterio de `spec.md` contra a implementacao e as evidencias.
  - Confirmar acesso independente, publicacao manual e ausencia de backend ou
    persistencia.
  - Registrar e resolver pendencias dentro do escopo.
  - Dependencia: T030.
  - Evidencia: todos os criterios atendidos ou pendencias explicitadas.

- [ ] **T032 — Executar a revisao final da funcionalidade**
  - Executar `/spec:revisar 003-explorar-por-etapas`.
  - Corrigir lacunas autorizadas dentro do escopo.
  - Dependencia: T031.
  - Evidencia: revisao final sem bloqueios.

## Definicao de concluido

A spec `003-explorar-por-etapas` estara concluida quando:

- a rota `/explorar-por-etapas` funcionar por navegacao interna, URL direta e
  recarga;
- a pagina seguir a hierarquia do Figma Design `575:483` e os tokens confirmados
  no Figma Make;
- breadcrumb, hero, quatro cards e CTA final estiverem presentes na ordem
  prevista;
- os cards exibirem identificador, icone, titulo, descricao, acao e destino
  corretos;
- qualquer etapa puder ser aberta sem conclusao das anteriores;
- o CTA do guia completo apontar para `/diagnostico`;
- o tutorial comunicar cadastro manual no Paraiba Digital;
- header e footer vierem do shell compartilhado, sem entradas fora do MVP;
- a pagina nao ler, criar, alterar ou limpar progresso e dados da Carta;
- desktop, tablet, smartphone, teclado e zoom de 200% estiverem validados;
- typecheck, build e testes aplicaveis estiverem aprovados;
- os criterios de aceite tiverem evidencia e `/spec:revisar` nao apresentar
  bloqueios.

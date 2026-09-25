# Tasks: Home e Navegacao

## Convencoes

- As tarefas devem ser executadas na ordem das dependencias indicadas.
- Cada tarefa deve gerar uma alteracao pequena e verificavel.
- Alteracoes de codigo so podem comecar em `/spec:implementar`.
- Como esta funcionalidade e visual, `implementation-plan.md` deve ser criado e
  validado antes da implementacao.
- Os checkboxes permanecem desmarcados ate a respectiva evidencia de conclusao
  existir no repositorio ou no registro de validacao.

## Fase 1 — Preparacao obrigatoria

- [x] **T001 — Criar o plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 002-home-e-navegacao`.
  - Consolidar contratos de componentes, codigo base, CSS, assets, breakpoints e
    estrategia de testes.
  - Registrar o node Figma Design `310:175` e o Figma Make `0:1` como fontes.
  - Evidencia: `specs/002-home-e-navegacao/implementation-plan.md` criado.

- [x] **T002 — Confirmar tokens e tipografia no Figma Make**
  - Mapear cores, fontes, pesos, espacamentos, raios, sombras e estados para os
    tokens semanticos do projeto.
  - Resolver divergencias entre o frame da home e o resumo local do design
    system.
  - Definir fallbacks de fontes sem bloquear a renderizacao.
  - Dependencia: T001.
  - Evidencia: tabela de mapeamento registrada no `implementation-plan.md`.

- [x] **T003 — Inventariar e planejar a extracao dos assets reais do Figma**
  - Identificar a arte do hero, logos institucionais e icones usados pelos CTAs
    e pelo processo.
  - Definir quais imagens sao informativas e quais sao decorativas.
  - Planejar arquivos locais em `src/assets/home/`, sem recriar SVGs manualmente
    e sem depender de URLs temporarias do MCP.
  - Dependencias: T001, T002.
  - Evidencia: inventario com origem, nome de arquivo, formato e texto
    alternativo no `implementation-plan.md`.

- [x] **T004 — Fechar a estrategia de testes**
  - Decidir se Vitest, Testing Library e `jest-dom` entram nesta spec.
  - Se entrarem, documentar configuracao, arquivos e cenarios automatizados.
  - Se nao entrarem, registrar a lacuna e tornar obrigatorio o roteiro manual
    definido neste arquivo.
  - Dependencia: T001.
  - Evidencia: decisao registrada no `implementation-plan.md`.

- [x] **T005 — Validar a documentacao antes do codigo**
  - Executar `/spec:validar 002-home-e-navegacao`.
  - Conferir consistencia entre `spec.md`, `plan.md`, `tasks.md`,
    `implementation-plan.md`, MVP, fluxos e Figma.
  - Resolver divergencias bloqueantes antes de implementar.
  - Dependencias: T001–T004.
  - Evidencia: validacao sem bloqueios abertos.

## Fase 2 — Conteudo e contratos

- [x] **T006 — Modelar o conteudo versionado da home**
  - Expandir `src/content/pages/home.ts` com marca, hero, dois CTAs, introducao,
    quatro etapas e CTA educativo.
  - Incluir destinos e variantes sem duplicar textos no JSX.
  - Preservar exatamente a copy aprovada e manter o destino de `Simular
    publicacao` no tutorial de cadastro manual.
  - Dependencia: T005.
  - Evidencia: conteudo tipado e importavel pela home.

- [ ] **T007 — Criar o conteudo compartilhado da navegacao e do footer**
  - Criar a lista explicita da header com `Inicio`, `O que e a Carta?`,
    `Duvidas frequentes` e `Preciso de ajuda`.
  - Omitir `Material de apoio`.
  - Definir links institucionais e de apoio do footer apenas para destinos
    existentes ou honestamente identificados.
  - Dependencia: T005.
  - Evidencia: fonte unica de conteudo consumivel pelo `AppShell`.

- [ ] **T008 — Ajustar os contratos de navegacao interna**
  - Separar a navegacao editorial da tabela completa de rotas.
  - Preservar pathname e fragmento de URL.
  - Manter `/explorar-por-etapas` como `href` real da feature 003, sem registrar
    a pagina ou criar placeholder nesta feature.
  - Definir o comportamento de `/ajuda#duvidas-frequentes` sem recarregar a
    aplicacao.
  - Definir restauracao de foco apos mudanca de pagina.
  - Dependencias: T006, T007.
  - Evidencia: tipos e contratos finais documentados e implementados.

## Fase 3 — Componentes compartilhados

- [ ] **T009 — Implementar a marca da aplicacao**
  - Exibir `Simplifica Carta` e `Guia de Servicos` conforme a hierarquia do
    frame.
  - Manter o link para a home e um nome acessivel completo.
  - Dependencias: T002, T007.
  - Evidencia: componente renderizado no header sem texto duplicado.

- [ ] **T010 — Implementar a navegacao desktop**
  - Renderizar somente os quatro itens definidos nesta spec.
  - Aplicar `aria-current="page"` ao item ativo.
  - Implementar estados normal, hover, foco e ativo com tokens.
  - Dependencias: T007–T009.
  - Evidencia: navegacao funcional por mouse e teclado em desktop.

- [ ] **T011 — Implementar a navegacao responsiva**
  - Adicionar controle de abrir/fechar com nome acessivel e `aria-expanded`.
  - Fechar o menu apos a navegacao e manter `Preciso de ajuda` acessivel.
  - Evitar sobreposicao, scroll horizontal e armadilha de foco.
  - Dependencia: T010.
  - Evidencia: menu funcional em 768, 390 e 320 px.

- [ ] **T012 — Evoluir o componente de link de acao**
  - Suportar variantes primaria e secundaria previstas para a home.
  - Suportar icone opcional exportado do Figma sem perder o nome textual.
  - Manter semantica de link para destinos de navegacao.
  - Dependencias: T002, T003.
  - Evidencia: `ButtonLink` reutilizavel nos CTAs da home.

- [ ] **T013 — Implementar o footer institucional**
  - Criar as colunas de acesso rapido, recursos/apoio, descricao e dados
    institucionais previstas no frame.
  - Exibir copyright e mensagem coerente com o MVP.
  - Omitir ou desabilitar de forma honesta links para areas nao entregues.
  - Dependencias: T003, T007, T012.
  - Evidencia: footer semanticamente correto e responsivo.

- [ ] **T014 — Refatorar o AppShell**
  - Integrar marca, navegacao e footer compartilhados.
  - Permitir secoes de largura total com containers internos.
  - Preservar o funcionamento das paginas placeholder existentes.
  - Dependencias: T009–T013.
  - Evidencia: shell compartilhado funcionando em todas as rotas atuais.

## Fase 4 — Home

- [ ] **T015 — Implementar o hero da home**
  - Exibir o titulo `Menos burocracia, mais praticidade.`, o subtitulo aprovado
    e os dois CTAs.
  - Direcionar `Iniciar guia` para `/diagnostico`.
  - Direcionar `Explorar por etapas` para `/explorar-por-etapas`.
  - Integrar a arte real do Figma com texto alternativo adequado.
  - Dependencias: T003, T006, T008, T012, T014.
  - Evidencia: hero fiel a hierarquia do node `310:175`.

- [ ] **T016 — Implementar a secao de processo**
  - Criar a ancora `id="processo"`.
  - Exibir titulo, introducao aprovada e quatro etapas em lista semantica.
  - Direcionar as etapas para diagnostico, organizacao, formulario e tutorial.
  - Preservar a ordem visual e textual do Figma.
  - Dependencias: T006, T008, T014.
  - Evidencia: quatro etapas renderizadas com destinos corretos.

- [ ] **T017 — Implementar o CTA educativo**
  - Exibir a chamada `Nao sabe por onde comecar?`.
  - Exibir o titulo `Conheca primeiro o que e uma Carta de Servicos`.
  - Exibir a descricao `Entenda o que caracteriza uma Carta de Servicos e qual
    e sua finalidade`.
  - Exibir no botao `O que e a Carta de Servico?`.
  - Direcionar para `/o-que-e-carta-de-servicos`.
  - Manter hierarquia e contraste compativeis com o frame.
  - Dependencias: T006, T012, T014.
  - Evidencia: CTA presente entre o processo e o footer.

- [ ] **T018 — Montar a HomePage final**
  - Substituir integralmente o placeholder atual.
  - Compor hero, processo e CTA na ordem do Figma.
  - Garantir exatamente um `h1` e hierarquia coerente de titulos.
  - Remover o card `Estado da fundacao` da home.
  - Dependencias: T015–T017.
  - Evidencia: home completa sem conteudo placeholder.

## Fase 5 — Estilos e comportamento responsivo

- [ ] **T019 — Atualizar os tokens CSS**
  - Aplicar o mapeamento aprovado de cores, tipografia, espacamentos, raios,
    sombras, containers e breakpoints.
  - Evitar valores literais repetidos nos componentes.
  - Nao instalar Tailwind.
  - Dependencias: T002, T005.
  - Evidencia: tokens reutilizados pela home e pelo shell.

- [ ] **T020 — Implementar o layout desktop**
  - Reproduzir a composicao do node `310:175` em 1440 px.
  - Usar grid/flex em vez das coordenadas absolutas retornadas pelo MCP.
  - Alinhar header, hero, processo, CTA e footer por containers coerentes.
  - Dependencias: T014, T018, T019.
  - Evidencia: comparacao visual desktop sem divergencias estruturais graves.

- [ ] **T021 — Implementar os layouts de tablet e smartphone**
  - Adaptar o hero para coluna unica quando necessario.
  - Transformar o processo em lista vertical em telas estreitas.
  - Empilhar CTAs e colunas do footer sem perda de conteudo.
  - Garantir funcionamento em 1024, 768, 390 e 320 px.
  - Dependencias: T011, T013, T020.
  - Evidencia: ausencia de sobreposicao e scroll horizontal nos tamanhos alvo.

- [ ] **T022 — Implementar estados e preferencias de acessibilidade**
  - Garantir foco visivel e contraste WCAG 2.1 AA.
  - Configurar area de toque adequada para controles.
  - Garantir restauracao de foco ao navegar para outra pagina.
  - Respeitar `prefers-reduced-motion` em rolagem ou transicoes.
  - Dependencias: T010–T021.
  - Evidencia: estados interativos perceptiveis e navegacao por teclado completa.

## Fase 6 — Testes e verificacao

- [ ] **T023 — Implementar os testes automatizados aprovados**
  - Cobrir hero, CTAs, quatro etapas e destinos.
  - Cobrir item ativo e ausencia de `Material de apoio` na header.
  - Cobrir atributos e interacoes do menu movel.
  - Cobrir `href="/explorar-por-etapas"` sem exigir que a pagina da feature 003
    esteja registrada, e cobrir restauracao de foco nas rotas existentes.
  - Dependencias: T004, T018, T022.
  - Evidencia: suite aprovada sem falhas; se T004 dispensar framework, registrar
    esta tarefa como nao aplicavel com justificativa.

- [ ] **T024 — Executar verificacoes tecnicas**
  - Executar `npm run typecheck`.
  - Executar `npm run build`.
  - Executar a suite de testes, quando configurada.
  - Verificar console e links internos.
  - Dependencia: T023.
  - Evidencia: comandos concluidos sem erros.

- [ ] **T025 — Executar verificacao responsiva**
  - Validar 1440, 1024, 768, 390 e 320 px.
  - Confirmar ausencia de corte, sobreposicao e scroll horizontal.
  - Testar zoom de 200% e reflow.
  - Dependencias: T021, T024.
  - Evidencia: checklist dos cinco tamanhos e do zoom concluido.

- [ ] **T026 — Executar verificacao de acessibilidade**
  - Percorrer header, hero, processo, CTA e footer apenas com teclado.
  - Conferir landmarks, hierarquia de titulos, nomes acessiveis, `aria-current`,
    `aria-expanded`, textos alternativos e ordem de foco.
  - Testar preferencia de movimento reduzido.
  - Dependencias: T022, T024.
  - Evidencia: checklist acessivel concluido sem bloqueios.

- [ ] **T027 — Comparar a entrega com o Figma**
  - Comparar a home desktop com o node `310:175`.
  - Confirmar hierarquia, composicao, tokens, assets, estados e adaptacoes
    responsivas.
  - Registrar divergencias intencionais, incluindo a ausencia de `Material de
    apoio` na header.
  - Dependencias: T025, T026.
  - Evidencia: revisao visual concluida e divergencias justificadas.

- [ ] **T028 — Revisar os criterios de aceite da spec**
  - Conferir cada criterio de `spec.md` contra a implementacao e as evidencias.
  - Confirmar que a home nao depende de backend nem persiste dados.
  - Confirmar que nenhuma area fora do MVP e apresentada como completa.
  - Dependencia: T027.
  - Evidencia: todos os criterios atendidos ou pendencias explicitamente
    registradas.

- [ ] **T029 — Executar a revisao final da funcionalidade**
  - Executar `/spec:revisar 002-home-e-navegacao`.
  - Corrigir eventuais lacunas autorizadas dentro do escopo.
  - Dependencia: T028.
  - Evidencia: revisao final sem bloqueios.

## Definicao de concluido

A spec `002-home-e-navegacao` estara concluida quando:

- a home substituir o placeholder e seguir o node Figma `310:175`;
- header e footer compartilhados refletirem o MVP;
- os dois caminhos principais e as quatro etapas tiverem destinos validos;
- `Material de apoio` nao aparecer na header;
- desktop, tablet, smartphone, teclado, zoom e movimento reduzido tiverem sido
  verificados;
- typecheck, build e testes aplicaveis estiverem aprovados;
- todos os criterios de aceite da spec estiverem atendidos;
- `/spec:revisar 002-home-e-navegacao` estiver concluido.

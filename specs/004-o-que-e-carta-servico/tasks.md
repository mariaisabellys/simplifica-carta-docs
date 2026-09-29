# Tasks: O que e a Carta de Servicos

## Convencoes

- As tarefas devem ser executadas na ordem das dependencias indicadas.
- Cada tarefa deve produzir uma alteracao pequena, verificavel e restrita ao
  escopo da feature 004.
- Alteracoes de codigo so podem comecar em `/spec:implementar`.
- Como a funcionalidade e visual, `implementation-plan.md` deve ser criado e
  validado antes da implementacao.
- Os checkboxes permanecem desmarcados ate existir evidencia de conclusao no
  repositorio ou no registro de validacao.
- O frame Figma `365:265` orienta layout e composicao; o Figma Make `0:1`
  orienta tokens e componentes.
- A pagina permanece informativa: nao deve acessar backend, estado, progresso
  ou armazenamento da Carta.
- Conteudo juridico do Figma nao deve ser tratado como fonte oficial sem
  validacao editorial.

## Fase 1 — Preparacao obrigatoria

- [x] **T001 — Criar o plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 004-o-que-e-carta-servico`.
  - Consolidar estrutura visual, contratos, codigo base, CSS, assets,
    breakpoints, links legais e estrategia de testes.
  - Registrar o Figma Design `365:265` e o Figma Make `0:1` como fontes.
  - Evidencia: `specs/004-o-que-e-carta-servico/implementation-plan.md` criado.

- [x] **T002 — Conferir o estado real da feature 002**
  - Verificar os contratos implementados de `AppShell`, navegacao editorial,
    container, full-bleed, foco, header, footer, `ButtonLink` e breadcrumb.
  - Identificar divergencias entre a documentacao da 002 e o codigo atual.
  - Proibir duplicacao de header, footer ou roteamento na pagina 004.
  - Dependencia: T001.
  - Evidencia: integracoes e lacunas registradas no `implementation-plan.md`.

- [x] **T003 — Consultar e mapear o Figma Design**
  - Consultar via MCP o arquivo `YaVUdqYa3boHpvGrxf4ZJ5`, node `365:265`.
  - Confirmar hierarquia, medidas, containers, espacamentos, ordem das secoes,
    grades, linhas legais e comportamento visual dos links.
  - Tratar classes Tailwind e coordenadas absolutas retornadas como referencia,
    nao como codigo para copia.
  - Dependencia: T001.
  - Evidencia: mapeamento visual registrado no `implementation-plan.md`.

- [x] **T004 — Confirmar tokens e estados no Figma Make**
  - Consultar via MCP o arquivo `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.
  - Mapear cores, gradiente, tipografia Inter, espacamentos, bordas, raios,
    sombras e estados interativos.
  - Reconciliar os valores com `src/styles/tokens.css` e com a feature 002.
  - Dependencias: T002, T003.
  - Evidencia: tabela de tokens e estados no `implementation-plan.md`.

- [x] **T005 — Inventariar todos os assets da pagina**
  - Identificar os icones da introducao, fundamentos, dez campos e legislacao.
  - Registrar node ID, finalidade, dimensao, formato, nome local e tratamento
    acessivel de cada asset.
  - Separar assets autorais de formas simples reproduziveis por CSS.
  - Nao redesenhar SVGs nem planejar dependencia de URLs temporarias.
  - Dependencias: T003, T004.
  - Evidencia: inventario completo no `implementation-plan.md`.

- [x] **T006 — Validar o conteudo juridico de referencia**
  - Conferir em fontes oficiais a Lei Federal nº 13.460/2017, o Decreto Federal
    nº 9.094/2017 e o Decreto Federal nº 9.756/2019.
  - Verificar numero, ano, vigencia, resumo e URL de consulta.
  - Verificar a base da afirmacao de que a Carta e obrigatoria.
  - Registrar divergencias entre Figma, fonte oficial e texto institucional.
  - Nao decidir silenciosamente alteracoes materiais; encaminhar divergencias
    para aprovacao editorial.
  - Dependencia: T001.
  - Evidencia: matriz de validacao normativa no `implementation-plan.md`.

- [x] **T007 — Fechar a estrategia de testes**
  - Verificar se Vitest, Testing Library e `jest-dom` foram configurados por
    outra feature.
  - Definir testes da pagina, listas, links externos, seguranca e breadcrumb.
  - Se a infraestrutura nao existir, registrar se sera criada ou dispensada,
    com justificativa e roteiro manual obrigatorio.
  - Dependencias: T001, T002.
  - Evidencia: estrategia e arquivos previstos no `implementation-plan.md`.

- [x] **T008 — Validar a documentacao antes do codigo**
  - Executar `/spec:validar 004-o-que-e-carta-servico`.
  - Comparar `spec.md`, `plan.md`, `tasks.md`, `implementation-plan.md`, MVP,
    fluxos, constitution, Figma Design e Figma Make.
  - Resolver divergencias bloqueantes antes da implementacao.
  - Dependencias: T001–T007.
  - Evidencia: validacao documental sem bloqueios abertos.

## Fase 2 — Conteudo e contratos

- [x] **T009 — Definir os tipos do conteudo da pagina**
  - Modelar introducao, importancia, fundamentos, campos informativos e
    legislacao.
  - Restringir identificadores, tons e tipos de norma com unions TypeScript.
  - Preservar a ordem dos itens por arrays `readonly`.
  - Nao incluir campos de progresso, estado da Carta ou persistencia.
  - Dependencia: T008.
  - Evidencia: tipos TypeScript compilando sem erros.

- [x] **T010 — Criar o conteudo versionado da introducao**
  - Criar `src/content/pages/o-que-e-carta.ts` ou o caminho consolidado no plano
    detalhado.
  - Registrar titulo, subtitulo e definicao aprovada.
  - Registrar os tres itens de `Por que e importante?` na ordem do frame.
  - Corrigir apenas grafia e acentuacao que nao alterem o sentido aprovado.
  - Dependencia: T009.
  - Evidencia: introducao importavel sem copy editorial duplicada no JSX.

- [x] **T011 — Criar o conteudo versionado de fundamentos**
  - Registrar titulo, descricao e os dois destaques `Para o Cidadao` e `Para o
    Orgao Publico`.
  - Usar a redacao aprovada sobre a obrigatoriedade.
  - Associar tons semanticos sem incluir estilos ou markup no conteudo.
  - Dependencias: T006, T009.
  - Evidencia: fundamentos tipados e editorialmente rastreaveis.

- [x] **T012 — Criar os dez campos informativos**
  - Registrar exatamente dez itens na ordem oficial do frame.
  - Incluir identificador, titulo e descricao de cada campo.
  - Manter a associacao entre identificadores e assets fora da fonte editorial.
  - Nao incluir logica do formulario ou checklist detalhado.
  - Dependencias: T005, T009.
  - Evidencia: array tipado com dez itens corretos e sem duplicacao.

- [x] **T013 — Criar as referencias legais versionadas**
  - Registrar tipo, numero, ano, resumo e URL oficial das tres normas.
  - Incorporar o conteudo aprovado e as URLs oficiais validadas em T006.
  - Manter o rotulo visivel `Consultar` separado do nome acessivel completo.
  - Dependencias: T006, T009.
  - Evidencia: tres referencias tipadas com URLs oficiais validadas.

- [ ] **T014 — Preparar os assets locais**
  - Exportar ou baixar do Figma todos os assets aprovados no inventario.
  - Salvar em `src/assets/o-que-e-carta/` ou no diretorio compartilhado definido
    no plano detalhado.
  - Conferir formato, integridade, dimensoes e correspondencia node-a-node.
  - Eliminar qualquer dependencia de URL temporaria do Figma.
  - Dependencias: T005, T008.
  - Evidencia: assets oficiais nao vazios e versionados localmente.

## Fase 3 — Rota e componentes

- [ ] **T015 — Consolidar os metadados da rota**
  - Manter `/o-que-e-carta-de-servicos` associado a `OQueECartaPage`.
  - Adicionar `figmaNodeId: "365:265"` em `src/app/routes.tsx`.
  - Manter `specId: "004-o-que-e-carta-servico"`.
  - Ajustar `layoutType` somente conforme o contrato real da feature 002.
  - Dependencias: T002, T008.
  - Evidencia: `findRoute` retorna pagina, spec e node corretos.

- [ ] **T016 — Garantir navegacao interna e acesso direto**
  - Integrar a pagina ao contrato SPA existente sem criar roteador paralelo.
  - Preservar `href` real nos links internos.
  - Confirmar acesso pelo CTA da home, header, URL, recarga, voltar e avancar.
  - Preservar rolagem para o topo e restauracao de foco definidas pela 002.
  - Dependencias: T002, T015.
  - Evidencia: navegacao funcional em todos os modos de entrada.

- [ ] **T017 — Implementar ou reutilizar o breadcrumb**
  - Reutilizar o componente compartilhado, se existente.
  - Caso necessario, criar `Breadcrumb` com `nav`, rotulo acessivel, link para
    `/` e `aria-current="page"` na pagina atual.
  - Tratar separadores como decorativos.
  - Dependencias: T002, T010, T016.
  - Evidencia: breadcrumb semanticamente correto e navegavel por teclado.

- [ ] **T018 — Implementar o painel de importancia**
  - Renderizar titulo e exatamente tres perspectivas a partir do conteudo.
  - Associar os icones corretos e trata-los conforme o inventario acessivel.
  - Preservar a ordem cidadao, orgao e gestao no DOM.
  - Nao fixar alturas que cortem texto em zoom ou telas menores.
  - Dependencias: T004, T010, T014.
  - Evidencia: painel reutiliza dados tipados e corresponde ao frame.

- [ ] **T019 — Implementar o card de fundamento**
  - Receber titulo, descricao, tom e icone por props.
  - Renderizar os tons laranja e ciano sem depender apenas da cor.
  - Garantir contraste e crescimento conforme o conteudo.
  - Dependencias: T004, T011, T014.
  - Evidencia: o mesmo contrato renderiza corretamente os dois destaques.

- [ ] **T020 — Implementar o card de campo informativo**
  - Receber icone, titulo e descricao por props.
  - Nao decidir copy, ordem ou asset por indice dentro do componente.
  - Tratar o icone como decorativo quando o texto ja transmitir o significado.
  - Dependencias: T004, T012, T014.
  - Evidencia: um contrato renderiza corretamente qualquer um dos dez campos.

- [ ] **T021 — Implementar o item de referencia legal**
  - Exibir tipo, numero, ano, resumo e acao `Consultar`.
  - Usar link com `target="_blank"` e `rel="noopener noreferrer"`.
  - Fornecer nome acessivel com norma e aviso de nova aba.
  - Receber todos os dados por props, sem copy juridica fixa no componente.
  - Dependencias: T004, T013.
  - Evidencia: componente seguro e acessivel para qualquer referencia tipada.

## Fase 4 — Composicao da pagina

- [ ] **T022 — Implementar a introducao**
  - Compor breadcrumb, `h1`, subtitulo e painel de importancia.
  - Destacar visualmente `Carta de Servico` sem fragmentar o nome acessivel do
    titulo.
  - Garantir exatamente um `h1` na pagina.
  - Dependencias: T010, T017, T018.
  - Evidencia: introducao completa na ordem do node `365:265`.

- [ ] **T023 — Implementar a secao Fundamentos**
  - Renderizar titulo, descricao e dois cards a partir do conteudo versionado.
  - Aplicar a faixa de fundo em largura total com container interno.
  - Reutilizar o contrato full-bleed do shell ou a estrategia aprovada, sem
    duplicar header/footer e sem largura fixa de 1440 px.
  - Dependencias: T002, T011, T019, T022.
  - Evidencia: secao completa e alinhada ao container compartilhado.

- [ ] **T024 — Implementar a secao dos campos da Carta**
  - Renderizar titulo, orientacao e exatamente dez cards a partir do array.
  - Usar lista ou estrutura semanticamente equivalente.
  - Preservar a ordem do DOM independentemente do numero de colunas.
  - Dependencias: T012, T020, T023.
  - Evidencia: dez cards presentes, corretos e semanticamente agrupados.

- [ ] **T025 — Implementar a secao de legislacao**
  - Renderizar titulo, subtitulo e exatamente tres referencias.
  - Manter cada resumo e link semanticamente associado a sua norma.
  - Nao adicionar normas alem das aprovadas nesta feature.
  - Dependencias: T013, T021, T024.
  - Evidencia: tres referencias completas com links externos corretos.

- [ ] **T026 — Montar a pagina final no shell compartilhado**
  - Substituir o placeholder de `OQueECartaPage.tsx`.
  - Compor breadcrumb, introducao, fundamentos, campos e legislacao na ordem do
    frame.
  - Manter header e footer sob responsabilidade do `AppShell`.
  - Nao adicionar CTA final, formulario, progresso ou conteudo de outras specs.
  - Nao introduzir `Material de apoio` na header.
  - Dependencias: T022–T025.
  - Evidencia: pagina completa na rota, sem duplicacao do shell.

## Fase 5 — Estilos, responsividade e acessibilidade

- [ ] **T027 — Aplicar tokens e estados visuais**
  - Reutilizar tokens existentes e adicionar apenas os valores semanticos
    confirmados no Figma.
  - Implementar gradiente, fundos, bordas, raios, tipografia e espacamentos.
  - Implementar estados normal, hover, foco e active dos links.
  - Evitar estilos inline, valores repetidos e instalacao de Tailwind.
  - Dependencias: T004, T026.
  - Evidencia: estilos consumindo tokens e aderentes ao design system.

- [ ] **T028 — Implementar o layout desktop**
  - Reproduzir a hierarquia do node `365:265` com fluxo normal, Grid e Flexbox.
  - Exibir introducao em duas colunas, dois fundamentos lado a lado, dez campos
    em grade de tres colunas e legislacao em linhas horizontais.
  - Evitar coordenadas absolutas e alturas fixas que cortem conteudo.
  - Dependencia: T027.
  - Evidencia: composicao coerente em 1440 px.

- [ ] **T029 — Implementar o layout de tablet**
  - Adaptar introducao, fundamentos e campos para duas ou uma coluna conforme a
    largura util.
  - Reposicionar a acao legal sem separar o link de sua norma.
  - Validar 1024 e 768 px sem corte, sobreposicao ou scroll horizontal.
  - Dependencia: T028.
  - Evidencia: layout funcional nos dois tamanhos de tablet.

- [ ] **T030 — Implementar o layout de smartphone**
  - Empilhar secoes, cards e referencias legais em coluna unica.
  - Garantir areas de toque adequadas e linhas de texto legiveis.
  - Validar 390 e 320 px sem alterar a ordem do DOM.
  - Dependencia: T029.
  - Evidencia: layout funcional nos dois tamanhos de smartphone.

- [ ] **T031 — Completar os requisitos de acessibilidade**
  - Confirmar landmarks, exatamente um `h1` e hierarquia coerente de titulos.
  - Garantir foco visivel, contraste WCAG 2.1 AA e nomes acessiveis claros.
  - Marcar icones e separadores decorativos para leitores de tela.
  - Confirmar aviso de nova aba nos links legais.
  - Validar navegacao por teclado, zoom de 200% e reflow.
  - Dependencias: T017–T030.
  - Evidencia: checklist acessivel sem bloqueios.

- [ ] **T032 — Confirmar ausencia de estado e efeitos colaterais**
  - Verificar que a pagina nao acessa backend, `sessionStorage`, `localStorage`
    ou dados da Carta.
  - Confirmar que abrir, sair e voltar nao cria, altera ou limpa progresso.
  - Confirmar ausencia de formulario e CTA final fora do frame.
  - Dependencia: T026.
  - Evidencia: inspecao de codigo e teste manual sem efeitos colaterais.

## Fase 6 — Testes e verificacao

- [ ] **T033 — Implementar os testes automatizados aprovados**
  - Cobrir um unico `h1`, breadcrumb, tres itens de importancia e dois
    fundamentos.
  - Cobrir exatamente dez campos na ordem oficial.
  - Cobrir exatamente tres normas, seus dados e URLs.
  - Cobrir `target`, `rel` e nomes acessiveis dos links externos.
  - Cobrir ausencia de formulario, progresso, CTA final e entrada fora do MVP.
  - Dependencias: T007, T026, T032.
  - Evidencia: suite aprovada; se dispensada em T007, registrar como nao
    aplicavel com justificativa.

- [ ] **T034 — Executar verificacoes tecnicas**
  - Executar `npm run typecheck`.
  - Executar `npm run build`.
  - Executar a suite de testes, quando configurada.
  - Verificar console, imports, arquivos de assets e links.
  - Dependencia: T033.
  - Evidencia: comandos concluidos sem erros.

- [ ] **T035 — Verificar navegacao e links externos**
  - Abrir `/o-que-e-carta-de-servicos` diretamente e recarregar.
  - Testar acesso pela home e pela header.
  - Testar breadcrumb e historico voltar/avancar.
  - Testar cada `Consultar`, URL oficial, nova aba e seguranca do link.
  - Dependencias: T016, T034.
  - Evidencia: todos os caminhos e links funcionais.

- [ ] **T036 — Executar verificacao responsiva e acessivel**
  - Validar 1440, 1024, 768, 390 e 320 px.
  - Confirmar ausencia de corte, sobreposicao e scroll horizontal.
  - Percorrer a pagina apenas com teclado.
  - Conferir contraste, foco, nomes acessiveis, ordem de leitura e zoom de 200%.
  - Dependencias: T030, T031, T034.
  - Evidencia: checklist responsivo e acessivel concluido.

- [ ] **T037 — Comparar a entrega com o Figma**
  - Comparar a pagina desktop com o node `365:265`.
  - Confirmar composicao, hierarquia, gradiente, cards, legislacao e estados.
  - Conferir cada asset local contra node, slot e geometria efetiva.
  - Registrar divergencias intencionais de MVP, incluindo a ausencia de
    `Material de apoio` na header.
  - Dependencia: T036.
  - Evidencia: revisao visual concluida e divergencias justificadas.

- [ ] **T038 — Revisar os criterios de aceite**
  - Conferir cada criterio de `spec.md` contra a implementacao e as evidencias.
  - Confirmar conteudo aprovado, dez campos, tres normas, shell compartilhado e
    ausencia de backend ou persistencia.
  - Resolver pendencias dentro do escopo.
  - Dependencia: T037.
  - Evidencia: criterios atendidos ou pendencias explicitadas.

- [ ] **T039 — Executar a revisao final da funcionalidade**
  - Executar `/spec:revisar 004-o-que-e-carta-servico`.
  - Corrigir lacunas autorizadas dentro do escopo.
  - Dependencia: T038.
  - Evidencia: revisao final sem bloqueios.

## Definicao de concluido

A spec `004-o-que-e-carta-servico` estara concluida quando:

- a rota `/o-que-e-carta-de-servicos` funcionar por navegacao interna, URL
  direta, recarga e historico;
- a pagina seguir a hierarquia do Figma Design `365:265` e os tokens
  confirmados no Figma Make;
- breadcrumb, introducao, importancia, fundamentos, dez campos e legislacao
  estiverem presentes na ordem prevista;
- as tres referencias normativas estiverem validadas, aprovadas e ligadas a
  fontes oficiais;
- os links externos informarem a nova aba e aplicarem os atributos de
  seguranca;
- todos os assets visiveis corresponderem aos assets oficiais do Figma;
- header e footer vierem do shell compartilhado, sem `Material de apoio` na
  header;
- nao existir CTA final, formulario, progresso, backend ou persistencia nesta
  pagina;
- desktop, tablet, smartphone, teclado e zoom de 200% estiverem validados;
- `typecheck`, build e testes aplicaveis estiverem aprovados;
- os criterios de aceite tiverem evidencia e `/spec:revisar` nao apresentar
  bloqueios.

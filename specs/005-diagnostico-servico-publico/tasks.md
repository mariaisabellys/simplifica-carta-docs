# Tasks: Diagnostico de Servico Publico

## Convencoes

- Executar as tarefas na ordem das dependencias indicadas.
- Cada tarefa deve produzir uma alteracao pequena, verificavel e restrita a
  feature 005.
- Alteracoes de implementacao so devem ocorrer em `/spec:implementar`.
- Como a funcionalidade e visual e possui regra combinatoria,
  `implementation-plan.md` deve ser criado e validado antes do codigo final.
- Checkboxes permanecem desmarcados ate existir evidencia correspondente.
- O Figma Design `387:1020` orienta composicao e fluxo visual.
- O Figma Make `0:1` orienta tokens, controles e estados.
- Perguntas, textos de resultado e regras nao devem ser duplicados no JSX.
- O diagnostico nao usa backend, `localStorage`, IA ou persistencia permanente.
- Combinacoes nao reconhecidas devem permanecer conservadoras e retornar
  `analisar-melhor`.

## Fase 1 — Preparacao obrigatoria

- [x] **T001 — Criar o plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 005-diagnostico-servico-publico`.
  - Consolidar contratos, estado, sessao, navegacao, componentes, codigo base,
    CSS, testes, assets e validacoes.
  - Registrar o Figma Design `387:1020` e o Figma Make `0:1` como fontes.
  - Evidencia: `implementation-plan.md` criado e completo.

- [x] **T002 — Conferir shell e navegacao reais**
  - Inspecionar `App.tsx`, `AppShell`, `routes.tsx`, `ButtonLink` e os contratos
    consolidados pelas features 002 e 003.
  - Confirmar como paginas acessam `navigate`, `replace`, restauracao de foco,
    rolagem e historico.
  - Impedir roteador paralelo ou manipulacao dispersa de `pushState`.
  - Dependencia: T001.
  - Evidencia: lacunas e integracoes registradas no plano detalhado.

- [x] **T003 — Consultar e mapear o Figma Design**
  - Consultar via MCP o arquivo `YaVUdqYa3boHpvGrxf4ZJ5`, node `387:1020`.
  - Confirmar hierarquia, card, progresso, opcoes, botoes, estados, medidas,
    espacamentos, resultado e responsividade observavel.
  - Nao copiar coordenadas absolutas ou classes Tailwind como implementacao.
  - Dependencia: T001.
  - Evidencia: leitura visual detalhada no `implementation-plan.md`.

- [ ] **T004 — Confirmar tokens e estados no Figma Make**
  - Consultar via MCP o arquivo `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.
  - Mapear Inter, cores, bordas, raios, sombras, espacamentos e estados de
    radio, card, progresso e botoes.
  - Reconciliar valores com `src/styles/tokens.css`.
  - Dependencias: T002, T003.
  - Evidencia: tabela de tokens e estados no plano detalhado.

- [x] **T005 — Inventariar assets do diagnostico**
  - Identificar icones dos destaques, controles, progresso e resultados.
  - Registrar node, finalidade, dimensao, formato, nome local e tratamento
    acessivel.
  - Distinguir assets oficiais de formas simples reproduziveis com CSS.
  - Proibir URLs temporarias do Figma no codigo.
  - Dependencias: T003, T004.
  - Evidencia: inventario completo no plano detalhado.

- [x] **T006 — Fechar a estrategia de testes**
  - Verificar se Vitest, Testing Library, `user-event` e `jest-dom` ja existem.
  - Caso estejam ausentes, planejar a infraestrutura compartilhada minima.
  - Confirmar testes unitarios, reducer, sessao, integracao e enumeracao das
    6.561 combinacoes.
  - Dependencias: T001, T002.
  - Evidencia: ferramentas, scripts e arquivos de teste definidos.

- [ ] **T007 — Validar a documentacao antes do codigo**
  - Executar `/spec:validar 005-diagnostico-servico-publico`.
  - Comparar spec, plan, tasks, implementation-plan, produto, arquitetura,
    constitution, Figma Design, Figma Make e codigo atual.
  - Resolver bloqueios e contradicoes antes de implementar.
  - Dependencias: T001–T006.
  - Evidencia: validacao documental sem bloqueios abertos.

## Fase 2 — Conteudo e contratos de dominio

- [ ] **T008 — Consolidar os tipos canonicos do diagnostico**
  - Manter `sim`, `nao` e `nao-tenho-certeza` como unicas opcoes internas.
  - Consolidar IDs das oito perguntas e dos cinco resultados.
  - Atualizar ou remover `src/features/diagnostico/diagnostico.types.ts`.
  - Eliminar o tipo legado `nao-sei` e o resultado booleano simplificado.
  - Evitar ciclos entre `content` e `features`.
  - Dependencia: T007.
  - Evidencia: busca sem contratos divergentes e TypeScript aprovado.

- [x] **T009 — Versionar a apresentacao e as oito perguntas**
  - Manter rotulo, titulo, subtitulo e tres destaques aprovados.
  - Manter oito perguntas com IDs semanticos e ordem fechada de 1 a 8.
  - Preservar acentuacao e texto aprovado.
  - Evidencia: `src/content/diagnostico/perguntas.ts`.

- [x] **T010 — Versionar os cinco textos de resultado**
  - Manter ID, titulo e descricao para etapa, processo interno, servico
    publico, autosservico e analise adicional.
  - Manter `respostasDiagnosticoPorId` para resolucao por identificador.
  - Nao incluir regra condicional nos textos.
  - Evidencia: `src/content/diagnostico/respostas.ts`.

- [x] **T011 — Registrar o motor inicial de decisao**
  - Manter a precedencia de duvidas, processo interno, contradicoes, etapa,
    servico/autosservico e fallback.
  - Manter a pergunta 5 opcional para os criterios de servico.
  - Usar a pergunta 8 apenas para distinguir autosservico.
  - Retornar somente `RespostaDiagnosticoId`.
  - Evidencia: `src/content/diagnostico/condicoes.ts`, com typecheck e casos
    principais executados durante o versionamento da copy.

- [ ] **T012 — Revisar o motor contra a spec aprovada**
  - Comparar cada helper e sua ordem com as regras do `spec.md`.
  - Confirmar que pergunta 4 = `Não tenho certeza` vence o padrao interno.
  - Confirmar que o padrao interno vence a terceira contradicao quando a
    pergunta 4 for `Sim`.
  - Confirmar fallback para combinacoes nao descritas.
  - Dependencias: T008, T011.
  - Evidencia: matriz regra-codigo sem divergencias.

- [ ] **T013 — Adicionar rotulos tipados das opcoes**
  - Versionar `Sim`, `Não` e `Não tenho certeza` fora dos componentes.
  - Associar cada rotulo ao valor interno correto.
  - Preservar nomes acessiveis completos.
  - Dependencias: T008, T009.
  - Evidencia: opcoes importaveis sem strings repetidas no JSX.

## Fase 3 — Estado, sessao e navegacao

- [ ] **T014 — Implementar o reducer do diagnostico**
  - Modelar pergunta atual, respostas parciais e conclusao.
  - Implementar acoes `answer`, `next`, `previous`, `restart` e `restore`.
  - Armazenar respostas por `PerguntaDiagnosticoId`, nunca por indice.
  - Impedir transicao `next` sem resposta atual.
  - Dependencias: T008, T009, T013.
  - Evidencia: transicoes puras e tipadas.

- [ ] **T015 — Implementar validacao da sessao**
  - Definir payload versionado `simplifica-carta:diagnostico:v1`.
  - Validar versao, pergunta atual, IDs, opcoes e estado de conclusao.
  - Rejeitar JSON invalido, campos desconhecidos e respostas incompletas para
    resultado.
  - Nao persistir texto, dados pessoais ou dados da Carta.
  - Dependencia: T008.
  - Evidencia: parser seguro com casos validos e invalidos.

- [ ] **T016 — Implementar armazenamento temporario**
  - Usar estado React durante a interacao.
  - Usar `sessionStorage` somente para navegacao entre rotas e recarga na aba.
  - Remover a chave ao recomecar ou ao detectar payload invalido.
  - Proibir `localStorage` e chamadas a backend.
  - Dependencias: T014, T015.
  - Evidencia: estado restauravel na sessao e descartavel no reinicio.

- [ ] **T017 — Expor navegacao compartilhada para as paginas**
  - Reutilizar o contrato da feature 002, se existente.
  - Caso ausente, extrair `NavigationContext` de `App.tsx` com `navigate` e
    opcao `replace`.
  - Preservar `popstate`, URL real, rolagem e foco.
  - Nao adicionar React Router nem roteador interno na feature.
  - Dependencias: T002, T007.
  - Evidencia: paginas navegam pelo mesmo contrato do shell.

- [ ] **T018 — Integrar o estado ao ciclo das duas rotas**
  - Disponibilizar reducer e sessao para `/diagnostico` e
    `/diagnostico/resultado`.
  - Restaurar sessao valida sem substituir respostas atuais incorretamente.
  - Recalcular o resultado a partir das respostas, sem confiar em texto ou ID
    persistido.
  - Dependencias: T016, T017.
  - Evidencia: perguntas e resultado compartilham uma unica execucao valida.

- [ ] **T019 — Tratar acesso direto ao resultado**
  - Validar a existencia das oito respostas antes de renderizar.
  - Redirecionar com `replace` para `/diagnostico` ou apresentar inicio claro,
    conforme decisao do plano detalhado.
  - Nunca inventar resultado padrao.
  - Dependencia: T018.
  - Evidencia: URL direta e payload invalido tratados de forma segura.

## Fase 4 — Componentes do questionario

- [ ] **T020 — Implementar o indicador de progresso**
  - Exibir `Pergunta N de 8`.
  - Usar semantica acessivel e indicador visual somente como complemento.
  - Derivar posicao a partir da pergunta ativa e da ordem versionada.
  - Nao usar progresso como regra de negocio.
  - Dependencias: T004, T009, T014.
  - Evidencia: progresso correto em todos os oito passos.

- [ ] **T021 — Implementar o grupo acessivel de respostas**
  - Usar `fieldset`, `legend` e tres radios nativos.
  - Renderizar rotulos a partir do conteudo tipado.
  - Aplicar `name`, `value`, `checked` e `onChange` coerentes.
  - Permitir selecionar e alterar opcao por teclado e clique no label.
  - Dependencias: T004, T013, T014.
  - Evidencia: grupo funcional sem depender de div clicavel.

- [ ] **T022 — Implementar os controles do passo**
  - Exibir voltar, continuar ou concluir conforme a posicao.
  - Desabilitar continuidade sem resposta atual.
  - Evitar duplo envio na ultima pergunta.
  - Preservar a resposta ao voltar e avancar.
  - Dependencias: T014, T017, T021.
  - Evidencia: controles cobrem primeiro, intermediarios e ultimo passo.

- [ ] **T023 — Implementar a acao de recomecar**
  - Solicitar a transicao `restart`.
  - Limpar respostas, conclusao e sessao da feature.
  - Voltar para a primeira pergunta e restaurar foco adequado.
  - Nao limpar dados da Carta ou outras features.
  - Dependencias: T016, T017.
  - Evidencia: nova execucao inicia sem residuos.

- [ ] **T024 — Implementar o card da pergunta ativa**
  - Renderizar somente uma pergunta no DOM.
  - Compor progresso, `fieldset`, opcoes, mensagem e controles.
  - Receber dados e callbacks por props, sem acessar regra de resultado.
  - Crescer com perguntas longas sem altura fixa.
  - Dependencias: T020–T023.
  - Evidencia: contrato renderiza qualquer uma das oito perguntas.

- [ ] **T025 — Implementar o card de resultado**
  - Receber titulo, descricao e metadados de acao por props.
  - Nao receber matriz de respostas nem executar condicionais do motor.
  - Diferenciar significado com texto e icone, nunca apenas por cor.
  - Garantir foco programatico no titulo.
  - Dependencias: T004, T010, T017.
  - Evidencia: um contrato renderiza qualquer um dos cinco resultados.

## Fase 5 — Composicao das paginas

- [ ] **T026 — Implementar a introducao do diagnostico**
  - Renderizar rotulo, `h1`, subtitulo e tres destaques versionados.
  - Usar exatamente um `h1`.
  - Associar os assets corretos e tratamento acessivel definido no inventario.
  - Dependencias: T005, T009.
  - Evidencia: introducao completa sem copy fixa no JSX.

- [ ] **T027 — Montar a pagina `/diagnostico`**
  - Substituir os oito `PlaceholderCard` por uma pergunta ativa.
  - Compor introducao, progresso, card, controles e reinicio.
  - Manter header e footer sob responsabilidade do `AppShell`.
  - Nao renderizar regras internas ou resultados antecipados.
  - Dependencias: T018, T024, T026.
  - Evidencia: questionario navegavel na ordem oficial.

- [ ] **T028 — Implementar conclusao e navegacao ao resultado**
  - Exigir oito respostas validas.
  - Executar `obterRespostaDoDiagnostico` uma vez por conclusao.
  - Persistir somente a sessao minima e navegar para
    `/diagnostico/resultado`.
  - Impedir cliques repetidos de criar estados divergentes.
  - Dependencias: T012, T018, T022, T027.
  - Evidencia: ultima pergunta conduz a resultado reproduzivel.

- [ ] **T029 — Montar a pagina `/diagnostico/resultado`**
  - Substituir o placeholder atual.
  - Recalcular o ID usando respostas validadas.
  - Resolver a copy por `respostasDiagnosticoPorId`.
  - Renderizar exatamente um resultado e nenhuma regra interna.
  - Dependencias: T019, T025, T028.
  - Evidencia: cinco IDs produzem as cinco orientacoes aprovadas.

- [ ] **T030 — Implementar as acoes contextuais do resultado**
  - Disponibilizar `Refazer diagnóstico` para todos os resultados.
  - Para servico e autosservico, direcionar a `/organizar-informacoes`.
  - Para analise adicional, direcionar a `/ajuda`.
  - Para etapa e processo interno, nao encaminhar automaticamente ao
    formulario.
  - Confirmar rotulos finais no Figma e no conteudo aprovado.
  - Dependencias: T023, T029.
  - Evidencia: cada resultado oferece somente acoes coerentes com o escopo.

## Fase 6 — Estilos, responsividade e acessibilidade

- [ ] **T031 — Preparar assets locais**
  - Exportar ou baixar os assets confirmados no inventario.
  - Salvar em diretorio semantico dentro de `src/assets/`.
  - Conferir integridade, dimensoes e correspondencia node-a-node.
  - Eliminar dependencia de URLs temporarias.
  - Dependencias: T005, T007.
  - Evidencia: assets oficiais versionados e nao vazios.

- [ ] **T032 — Aplicar tokens e estados visuais**
  - Reutilizar tokens existentes e adicionar somente tokens confirmados.
  - Estilizar progresso, card, radios e botoes nos estados normal, hover,
    selecionado, foco, active e disabled.
  - Usar Inter e evitar estilos inline ou cores literais repetidas.
  - Dependencias: T004, T027, T029, T031.
  - Evidencia: interface coerente com o design system.

- [ ] **T033 — Implementar layout desktop**
  - Traduzir o node `387:1020` para fluxo normal, Grid e Flexbox.
  - Limitar largura de leitura sem copiar dimensoes absolutas.
  - Manter card, progresso e controles visualmente associados.
  - Dependencia: T032.
  - Evidencia: composicao coerente em 1440 px.

- [ ] **T034 — Implementar layout de tablet**
  - Adaptar destaques, card, opcoes e controles para 1024 e 768 px.
  - Preservar ordem do DOM e areas de toque.
  - Evitar corte, sobreposicao e scroll horizontal.
  - Dependencia: T033.
  - Evidencia: layout funcional nos dois tamanhos.

- [ ] **T035 — Implementar layout de smartphone**
  - Empilhar destaques, opcoes e controles conforme a largura.
  - Suportar perguntas longas e labels com quebra de linha.
  - Validar 390 e 320 px sem alterar a ordem de leitura.
  - Dependencia: T034.
  - Evidencia: fluxo completo utilizavel em smartphone.

- [ ] **T036 — Implementar gerenciamento de foco e anuncios**
  - Focar o titulo da pergunta ao avancar e voltar.
  - Anunciar progresso sem duplicacao excessiva.
  - Focar o titulo do resultado na mudanca de rota.
  - Restaurar foco adequado ao recomecar.
  - Respeitar `prefers-reduced-motion`.
  - Dependencias: T020, T024, T025, T027, T029.
  - Evidencia: fluxo compreensivel com teclado e leitor de tela.

- [ ] **T037 — Completar requisitos de acessibilidade**
  - Confirmar `fieldset`, `legend`, radios, labels e mensagens associadas.
  - Confirmar exatamente um `h1` por pagina e hierarquia coerente.
  - Garantir foco visivel, contraste WCAG 2.1 AA e informacao alem da cor.
  - Validar zoom de 200%, reflow e alvos de toque.
  - Dependencias: T021, T030, T032–T036.
  - Evidencia: checklist acessivel sem bloqueios.

## Fase 7 — Testes automatizados

- [ ] **T038 — Configurar ou reutilizar a infraestrutura de testes**
  - Implementar a decisao de T006.
  - Disponibilizar ambiente DOM, setup acessivel e script `npm run test`.
  - Evitar configuracao exclusiva que conflite com outras features.
  - Dependencias: T006, T007.
  - Evidencia: teste minimo executando no projeto.

- [ ] **T039 — Testar casos nomeados do motor**
  - Cobrir servico com pergunta 5 = `Sim`, `Não` e duvida isolada.
  - Cobrir autosservico e pergunta 8 incerta.
  - Cobrir etapa, processo interno, quatro duvidas essenciais, duas duvidas,
    tres contradicoes e fallback.
  - Cobrir a precedencia do processo interno e da duvida na pergunta 4.
  - Dependencias: T012, T038.
  - Evidencia: casos da spec aprovados.

- [ ] **T040 — Testar exaustivamente as 6.561 combinacoes**
  - Gerar todas as combinacoes de tres opcoes para oito perguntas.
  - Confirmar que nenhuma lanca erro.
  - Confirmar retorno restrito aos cinco IDs e determinismo.
  - Nao substituir os testes nomeados de precedencia.
  - Dependencias: T039.
  - Evidencia: enumeracao completa aprovada.

- [ ] **T041 — Testar reducer e sessao**
  - Cobrir resposta por ID, avanco, retorno, conclusao e reinicio.
  - Cobrir restauracao valida e rejeicao de payloads invalidos.
  - Cobrir remocao da chave e ausencia de `localStorage`.
  - Dependencias: T014–T016, T038.
  - Evidencia: estado e sessao aprovados.

- [ ] **T042 — Testar o fluxo integrado do questionario**
  - Confirmar uma pergunta ativa e progresso correto.
  - Confirmar tres radios, bloqueio sem resposta e navegacao por teclado.
  - Confirmar revisao de resposta, conclusao e rota do resultado.
  - Confirmar que regras internas nao aparecem no DOM.
  - Dependencias: T027, T028, T036–T038.
  - Evidencia: fluxo de oito passos aprovado.

- [ ] **T043 — Testar a pagina de resultado**
  - Cobrir os cinco resultados e suas acoes permitidas.
  - Cobrir acesso direto sem sessao, sessao invalida e recarga valida.
  - Cobrir foco inicial e acao de refazer.
  - Confirmar que resultado e recalculado, nao confiado do storage.
  - Dependencias: T029, T030, T036, T038.
  - Evidencia: pagina de resultado aprovada.

## Fase 8 — Verificacao final

- [ ] **T044 — Executar verificacoes tecnicas**
  - Executar `npm run typecheck`.
  - Executar `npm run build`.
  - Executar `npm run test`.
  - Verificar console, imports, bundle e assets.
  - Dependencias: T039–T043.
  - Evidencia: comandos concluidos sem erros.

- [ ] **T045 — Verificar entradas, recarga e historico**
  - Testar entrada pela home, explorar por etapas, header e URL direta.
  - Testar recarga no meio do fluxo e no resultado.
  - Testar voltar e avancar do navegador.
  - Confirmar ausencia de resultado antigo ou inventado.
  - Dependencias: T019, T027–T030, T044.
  - Evidencia: todos os caminhos de navegacao funcionais.

- [ ] **T046 — Executar verificacao responsiva e acessivel**
  - Validar 1440, 1024, 768, 390 e 320 px.
  - Testar teclado, leitor de tela, foco, contraste e zoom de 200%.
  - Confirmar ausencia de corte, sobreposicao e scroll horizontal.
  - Confirmar suporte a movimento reduzido.
  - Dependencias: T035–T037, T044.
  - Evidencia: checklist responsivo e acessivel concluido.

- [ ] **T047 — Comparar a entrega com o Figma**
  - Comparar diagnostico e estados com o node `387:1020`.
  - Conferir composicao, tipografia, progresso, card, opcoes, botoes e assets.
  - Registrar divergencias intencionais de MVP e acessibilidade.
  - Dependencia: T046.
  - Evidencia: revisao visual concluida.

- [ ] **T048 — Confirmar privacidade e limites**
  - Verificar ausencia de backend, analytics com respostas e `localStorage`.
  - Confirmar que somente a chave de sessao prevista e usada.
  - Confirmar que regras, matriz de respostas e pontuacao nao sao renderizadas.
  - Confirmar que dados da Carta permanecem inalterados.
  - Dependencias: T016, T029, T044.
  - Evidencia: inspecao tecnica sem efeitos fora do escopo.

- [ ] **T049 — Revisar os criterios de aceite**
  - Conferir cada criterio do `spec.md` contra codigo, testes e evidencias.
  - Resolver lacunas dentro do escopo ou registrar bloqueios reais.
  - Dependencias: T045–T048.
  - Evidencia: matriz de aceite concluida.

- [ ] **T050 — Executar a revisao final da feature**
  - Executar `/spec:revisar 005-diagnostico-servico-publico`.
  - Corrigir lacunas autorizadas dentro do escopo.
  - Dependencia: T049.
  - Evidencia: revisao final sem bloqueios.

## Definicao de concluido

A feature `005-diagnostico-servico-publico` estara concluida quando:

- `/diagnostico` apresentar a copy aprovada e uma pergunta por vez;
- as oito perguntas oferecerem as tres opcoes aprovadas;
- voltar, avancar, revisar e recomecar preservarem estado corretamente;
- o motor mantiver precedencia, contradicoes e fallback da spec;
- as 6.561 combinacoes validas retornarem um dos cinco IDs sem erro;
- `/diagnostico/resultado` exibir exatamente uma orientacao pelo ID calculado;
- acesso direto sem sessao valida nao inventar resultado;
- servico e autosservico puderem seguir para `/organizar-informacoes`;
- casos inconclusivos puderem acessar `/ajuda`;
- respostas existirem somente na sessao, sem backend ou `localStorage`;
- regras internas nao forem renderizadas;
- navegacao usar o contrato compartilhado, sem roteador paralelo;
- desktop, tablet, smartphone, teclado, leitor de tela, zoom e reflow estiverem
  validados;
- a interface estiver alinhada ao Figma e usar Inter;
- `typecheck`, build e testes estiverem aprovados;
- `/spec:revisar` nao apresentar bloqueios.

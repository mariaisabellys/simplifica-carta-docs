# Tarefas: Tutorial Paraíba Digital

Revisão documental em 20/10/2026. IDs locais T001–T018 preservados; não
confundir T011 local (assets) com T011 de docs/tasks.md (reconciliação).
Todas as entregas abaixo continuam pendentes de execução/aceite funcional.
A reconciliação documental não encerra automaticamente tarefas de implementação.

Base: [spec CA01–CA20](spec.md), [plan](plan.md), [plano detalhado](implementation-plan.md)
e [contrato de integração v3](contrato-integracao-v3.md). Antecedentes no
[histórico](historico/2026-10-20-pre-t011-tasks.md).

## Fontes e contratos

- [ ] **T001 — Inventariar contexto e integrações reais.**
  Conferir ERS, conteúdo, página, navegação e contratos atuais 007/012.
  Separar contratos de entrega; registrar lacunas sem afirmar ausência de
  utilitários existentes. Evidência: inventário datado; CA01/05–07/16.
- [ ] **T002 — Verificar fluxo operacional e endereço oficial.**
  Obter material autorizado, perfil/permissões, URL administrativa, menus e
  estados reais; fonte/trecho/data/responsável por instrução. Não coletar
  credenciais nem criar cadastro. Depende T001; CA02–04/11/15/20.
- [ ] **T003 — Verificar correspondência externa v3.**
  Preencher as 25 linhas do contrato com nome/tela/modo/diferenças/fonte/data.
  Separar pendente de sem equivalente comprovado; entradas de listas/opções
  são manuais, sem equivalência/importação presumidas. Depende T002; CA08/17/18/20.
- [ ] **T004 — Conferir integração com 012.**
  Adotar matriz já reconciliada de 25 campos, 13 abertos/12 escolhas, K/S/E,
  itens por ID, vazio/default e coordenador acima das rotas. Não reintroduzir
  campos legados. Definir interface sem ciclo, CTA único e alvos reais.
  Depende T001; CA06–10/17–19. Documento não comprova componentes prontos.
- [ ] **T005 — Consultar página e variantes Figma.**
  Consultar seis nodes/Make do mapa; 564:635 inicial, 564:980 variante da etapa 4
  ampliável para todos os dados. Registrar tokens, estados, responsividade e
  divergências; conteúdo prevalece sobre exemplos visuais. Depende T004; CA13/14/16/18.
- [ ] **T006 — Validar copy e assets.**
  Submeter instruções/matriz à equipe com fonte e data reais; inventariar
  capturas autorizadas, contexto, legenda/alt e arquivos locais sem dados reais.
  Não apresentar placeholder/GIF fictício como captura. Depende T002/003/005;
  CA02–04/08/11/12/15/20.
- [ ] **T007 — Fechar plano executável.**
  Conferir contratos reais e arquivos do implementation-plan; definir
  composição, query/hash, foco, disponibilidade da região e testes IT01–IT11.
  Depende T001–006; CA16/19. Revisão documental atual não remove bloqueios externos.
- [ ] **T008 — Revalidar antes de implementar.**
  Confrontar spec/plano/ERS/Figma/fontes e 007/012/navegação; registrar bloqueios
  por CA01–CA20. Depende T007; não homologar tutorial sem fonte administrativa.

## Conteúdo e integração

- [ ] **T009 — Sincronizar conteúdo tipado.**
  Aplicar tabela de migração do contrato em paraiba-digital.ts: projeção completa
  em vez de dez entradas, escolhas sem cópia, exemplos/lorem ipsum fora dos
  valores reais. Preservar outras cinco etapas, IDs, ações, percentuais e
  compatibilidade do export; labels versionados, valores apenas da sessão.
  Não inventar fonte/data/href. Depende T008; CA16/18/20 e IT11.
  Esta alteração TypeScript não foi executada na T011 documental.
- [ ] **T010 — Compor página por etapa ativa.**
  Reusar shell/breadcrumb, um h1, progresso e seis estados por query; CTAs por
  posição e percentuais 17/33/50/67/83/100. Não exigir Carta/login/CSV.
  Depende T009 e navegação compartilhada; CA01/02/05/13/19.
- [ ] **T011 — Integrar assets e alternativas.**
  Usar apenas material autorizado, sem URL temporária do Figma; texto e legenda
  persistem se imagem falhar; dimensões adaptáveis. Depende T006/010; CA12/14.
- [ ] **T012 — Integrar sessão e região da 012.**
  Montar só na etapa 4, cinco grupos/aplicáveis/ausências; sem segunda Carta ou
  gate global. Boundary conserva tutorial-dados e instruções. Derivar links
  dos alvos montados, invalidar feedback obsoleto sem liberar trava pendente.
  Depende T004/010 e implementação 007/012; CA05–10/17–19.
- [ ] **T013 — Integrar entradas, edição e ajuda.**
  Menu/003/prévia/URL e recarga; edição via registro autorizado e retorno com
  valores atuais; /ajuda e /previa. Link oficial só confirmado, nova aba
  acessível sem enviar dados. Concluir Guia retorna à home `/` sem limpar Carta ou comprovar publicação,
  conforme T015; integrar esse destino ao kind finish. Depende T012/002; CA01/07/11/15/19.
- [ ] **T014 — Aplicar layout e acessibilidade.**
  Inter/tokens, conteúdo integral, altura natural, texto longo, ordem DOM,
  foco e reflow. Não duplicar live region/CTA ou limitar campos ao frame.
  Depende T005/010–013; CA13/14/16/18.

## Verificação e fechamento

- [ ] **T015 — Verificar cobertura editorial.**
  Fonte/perfil/data por instrução, matriz de 25 paths, fontes/URLs/ações e
  assets autorizados; distinguir salvar/analisar/publicar sem automatizar.
  Depende T009/011/013; CA02–04/08/11/12/15/20.
- [ ] **T016 — Executar integração.**
  IT01–IT11 com fixtures v3 sintéticas; reutilizar TR da 012. Cobrir K/S/E,
  null/false/default, múltiplos itens, query/hash/history, edição/retorno,
  falha de região, manual e promise pendente ao sair/voltar. Preservar fonte,
  não executar HTML e não reintroduzir exemplos. Depende T012/013;
  CA05–10/12/17–19.
- [ ] **T017 — Verificar ambientes e acessibilidade.**
  Navegadores/assistivos reais do plano, teclado, histórico/recarga/fallback SPA,
  320–1440 px, texto 200%/zoom 400%, imagem/clipboard indisponíveis; registrar
  versão, defeitos e retestes sem cadastro real. Depende T014/016; CA01/07/10–14/19.
- [ ] **T018 — Consolidar checks e aceite.**
  Executar suíte/typecheck/build; criar quickstart, registrar cada CA01–CA20
  com evidência ou pendência e revisão institucional real. Sem logs da Carta,
  storage próprio ou publicação automática. Depende T015–017; não marcar
  aceite integral quando faltarem fonte, ERS, consulta visual ou testes.

Rastreabilidade dos cenários por critério: matriz IT01–IT11 do contrato.
Nenhum item foi marcado concluído apenas pela reformulação deste documento.

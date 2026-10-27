# Tarefas: Suporte por e-mail

20/10/2026 — limpeza documental T012 global. IDs locais T001–T015 preservados;
não confundir T012 local (layout) com a tarefa global.
Nenhuma tarefa funcional marcada concluída por esta revisão.
Base: [spec](spec.md), [plan](plan.md), [plano detalhado](implementation-plan.md).
Todas as ações futuras seguem exclusivamente exibição/cópia do contato.

## Fontes e contratos

- [ ] **T001 — Conferir contexto e integrações.** Inventariar ERS, shell,
  navegação, fontes de conteúdo, página, clipboard e entradas 013/014;
  separar contrato de implementação entregue. CA01/07/10/13.
- [ ] **T002 — Conferir fonte e disponibilidade editorial.** Consumir
  supportContacts e supportChannels existentes. E-mail ativo editorialmente
  por decisão de 16/10, sem afirmar resposta operacional. Aplicar o contrato T013
  aos avisos/apresentação não ativa e alternativas; não enviar mensagem
  de teste. Depende T001; CA02/09/12.
- [ ] **T003 — Validar conteúdo de orientação/cópia.** Rótulo Copie o e-mail,
  mensagens da fonte, endereço como destinatário a ser usado manualmente.
  Sem assunto/corpo predefinidos, coleta, anexos exigidos ou promessa de
  recebimento. Depende T002; CA03/04/06/08.
- [ ] **T004 — Fechar controlador neutro.** Reusar copiarTexto, trava por
  contato, revisão/request/geração, cleanup e alternativa manual; 5 s sucesso
  e 10 s demora sem liberar operação pendente. Não depender da Carta.
  Depende T001/003; CA04/05/09/11.
- [ ] **T005 — Consultar Design/Make.** Node 425:201 compartilhado com 014,
  dois cards, contato selecionável, cópia/manual, foco/reflow/tokens.
  Layout adapta-se ao conteúdo; registrar consulta, não apenas link.
  Depende T003/004; CA11/13.
- [ ] **T006 — Fechar plano executável.** Conferir arquivos existentes,
  coordenador/consumidores sem ciclo, matriz EM01–EM12 e dependências de T013
  global. Depende T001–005; plano atual é documental, não interface entregue.
- [ ] **T007 — Revalidar antes do código.** Conferir RF01–RF07/CA01–CA13,
  ERS, consulta visual, conteúdo e estados compartilhados. Não confundir
  contato ativo editorialmente com teste de atendimento. Depende T006.

## Interface futura

- [ ] **T008 — Integrar conteúdo existente.** Consumir contatos/canais e
  src/content/ajuda/suporte-email.ts; não recriar fontes ou duplicar endereço.
  Completar mensagens auxiliares versionadas. Depende T007; CA02/06/09/12/13.
- [ ] **T009 — Apresentar contato e alternativa manual.** Endereço integral,
  selecionável, instrução de copiar/colar e canal orientativo; não criar
  abertura de aplicativo ou geração de mensagem. Helper anteriormente entregue
  fica somente no histórico, sem requisito de integração.
  Depende T008; CA02–04/06/08.
- [ ] **T010 — Implementar botão e controlador de cópia.** Rótulo Copie o
  e-mail, payload apenas endereço, trava imediata e resultado verdadeiro.
  Cobrir troca de estado/endereço e remount sem sucesso antigo.
  Depende T004/008; CA03/05/08/09/11.
- [ ] **T011 — Integrar página/cards e navegação.** Reusar shell/breadcrumb,
  links reais e estado compartilhado. Não importar Carta nem criar backend.
  Política dos estados e transições depende T013 global.
  Depende T009/010; CA01/07/10/12/13.
- [ ] **T012 — Layout e acessibilidade.** Inter/tokens, ordem DOM, seleção
  integral, foco/status local e reflow; sem CTA duplicado.
  Depende T005/011; CA11/13.

## Verificação

- [ ] **T013 — Executar EM01–EM10.** Fixtures sintéticas, clipboard mock,
  fonte única, concorrência, cleanup, preservação da Carta e ausência de
  abertura/envio automático. Estados não ativos conforme decisão da T013
  global; registrar pendências sem inventar aceite. Depende T008–012.
- [ ] **T014 — Executar EM11–EM12 em ambientes reais.** Chrome/Edge/Firefox/
  Safari, teclado/leitores/toque, 320–1440 px, texto 200%/zoom 400%.
  Cópia por gesto somente em ambiente controlado; sem envio real.
  Registrar versões/defeitos/retestes. Depende T012/013; CA04/05/11/13.
- [ ] **T015 — Consolidar checks e aceite.** Suíte/typecheck/build,
  quickstart atualizado e evidência por CA01–CA13. Teste do helper legado não
  aprova UI; não instalar framework para testar só labels.
  Depende T013/014. Consulta visual/ERS/integração/ambientes ausentes ficam pendentes.

Matriz EM01–EM12 no implementation-plan relaciona cada critério aos cenários.
Não há tarefa futura de construir link de mensagem, assunto ou corpo.

## Integração compartilhada — T013, 20/10/2026

Aplicar o [contrato de canais](../../docs/arquitetura/contrato-canais-ajuda.md)
como definição única de estado/endereço/destino, apresentação, transições e
migração editorial. E-mail ativo: Copie o e-mail e alternativa manual. Pendente/pausado: aviso,
endereço de referência selecionável, sem botão ou instrução incentivando contato.
Ambos os canais indisponíveis: orientações e retornos, sem ação operacional.

Estado atual inspecionado: atendimento pendente, e-mail ativo editorialmente.
Ativo não prova vagas, recebimento ou implementação. Agenda vazia/erro de rede
e falha de clipboard são estados operacionais distintos, não mudam supportChannels.
As decisões de apresentação antes abertas em V013-01/V015-02 estão definidas
no contrato; efeitos de pausa na API/recuperação seguem contrato-agenda.md da 014;
as decisões institucionais IN01–IN08 permanecem pendentes.
Migração de conteúdo concluída em 21/10/2026; resolvedor compartilhado e
consumidores conferidos em tests/support.presentation.test.mjs. Isso não entrega
calendário/API/clipboard ou composição visual completa. Não há aceite
funcional nesta revisão; testar CJ01–CJ12 e critérios locais após implementar.

### Complemento executável após autorização

- [ ] Aplicar a migração de conteúdo do contrato sem duplicar fontes.
- [ ] Integrar estados/transições e foco conforme contexto de entrada.
- [ ] Executar CJ01–CJ12, incluindo as nove combinações e acesso direto.
- [ ] Registrar efeitos de pausa sobre tentativa/API após decisão T014,
  sem cancelar operação ou criar nova chave por inferência.

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

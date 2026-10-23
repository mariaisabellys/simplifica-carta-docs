# Tasks: Exportação CSV

T009 documental, 19/10/2026. [Lista anterior](historico/2026-10-19-pre-t009-tasks.md).
F010 são tarefas locais futuras; nenhuma é encerrada por reescrever documentos.
Base: [contrato](contrato-exportacao-v3.md) e [plano técnico](implementation-plan.md).

- [ ] F010-01 — Conferir provider/estrutura/foco 007 e slot 009; registrar gaps
  reais, sem interpretar helper como exportação entregue.
- [ ] F010-02 — Consultar Figma/ERS, revisar copy e política candidata de fórmulas;
  definir ambientes/caminhos suportados e responsáveis pela decisão de segurança.
- [ ] F010-03 — Implementar snapshot independente de todos os grupos/arrays v3
  e validação estrutural da mesma revisão, com falha distinta de sucesso vazio.
  Depende de F010-01; testar EX12/13, sem gate editorial.
- [ ] F010-04 — Implementar matriz/rótulos/formatadores dos 22 registros com
  K/S/E, listas parciais, prazo, Ativo e ausência. Depende de F010-01.
  Testar EX01/03–08, congelando fonte e comparando todas as chaves.
- [ ] F010-05 — Implementar candidato de safety e testes de fronteiras Unicode,
  células finais/listas, quoting e não acumulação. Depende de F010-02/04.
  EX09/10; não declarar homologação por unit tests.
- [ ] F010-06 — Compor CSV/Blob com BOM único e parser independente para testes.
  Depende de F010-04/05; EX02/11; não usar split de LF.
- [ ] F010-07 — Implementar trava, estados, download/cleanup/retry e invalidação
  de blocked ao editar. Depende de F010-03/06; EX14, sem download automático.
- [ ] F010-08 — Integrar ação/resumo/correção/avisos na 009 com navegação/foco
  da 007, sem props de CSV cacheado. Depende de F010-07/slot real.
- [ ] F010-09 — Executar EX15 em Excel/Calc: abrir/importar/salvar/reabrir,
  versões/locale/opções registrados; revisar política se falhar. Depende de
  F010-05/06. Bloqueia declaração de segurança/liberação, não só o relatório.
- [ ] F010-10 — Executar EX16 em desktop/mobile reais, teclado/leitor/reflow,
  gesto/navegação/recursos. Depende de F010-08; ambiente ausente fica pendente.
- [ ] F010-11 — Executar EX17: 50 documentos, 100 etapas, 1 MiB; investigar 2 MiB.
  Medir custo por etapa, máximo/mediana e responsividade; não truncar para passar.
  Depende de F010-07/08; revisar gesto/preparação se necessário.
- [ ] F010-12 — Rodar testes/typecheck/build e consolidar CA01–CA20, defeitos,
  retestes e dependências em relatórios. Depende de F010-09–11.
  Quickstart é roteiro, não evidência de execução.

| Critérios | Tarefas |
| --- | --- |
| CA01–CA03/CA09/CA12 | F010-03/07 |
| CA04–CA07/CA19–CA20 | F010-04/06 |
| CA08/CA15 | F010-05/09/10 |
| CA10–CA11/CA13 | F010-07/10 |
| CA14/CA17–CA18 | F010-02/08/10 |
| CA16 | F010-11 |

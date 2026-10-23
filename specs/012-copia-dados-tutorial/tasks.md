# Tasks: Cópia de dados no tutorial

T010 documental — 19/10/2026. [Anterior](historico/2026-10-19-pre-t010-tasks.md).
F012 são tarefas futuras locais; sem marcação de execução por esta reconciliação.
Base: [contrato](contrato-transferencia-v3.md).

- [ ] F012-01 — Conferir provider/retorno 007, utilitário clipboard, montagem/URL
  011 e sincronização editorial T011 global. Registrar entregue versus planejado.
- [ ] F012-02 — Consultar node 564:980/Make e ERS; revisar copy e layout ampliado,
  sem retirar campos. Depende de F012-01.
- [ ] F012-03 — Implementar matriz de 25 definições e cinco grupos com 13 tipos
  abertos/12 escolhas, K/S/E, IDs de itens e ausências. Depende de F012-01.
- [ ] F012-04 — Implementar coordenador por identidade acima das rotas, trava
  imediata, revisão/A-B-A/generation, catch/finally e descarte tardio.
  Depende de F012-01; não alterar utilitário neutro por necessidade de domínio.
- [ ] F012-05 — Implementar campos abertos com cópia/seleção manual e escolhas
  somente leitura sem botão; timers 5/10 s e feedback acessível. Depende de
  F012-02–04; não usar DOM como payload.
- [ ] F012-06 — Integrar somente etapa 4, região/âncoras/retorno e CTAs únicos.
  Depende de F012-05 e T011; outros passos sem UI/live regions da 012.
- [ ] F012-07 — Testar TR01–TR07: cobertura, valores, listas por item, escolhas
  sem botão, inativos e zero exemplos em payload. Fixture congelada.
  Depende de F012-03/05.
- [ ] F012-08 — Testar TR08–TR13 com promises controladas, duplo clique antes
  de render, remount/ocultação, A/B/A, erro síncrono/rejeição e timers.
  Depende de F012-04/05; StrictMode e retorno tardio sem sucesso falso.
- [ ] F012-09 — Testar TR14–TR16 com provider/tutorial reais: âncora/fallback,
  etapas, edição/recarga/memória, ausência de gate. Depende de F012-06.
- [ ] F012-10 — Executar TR17 em origem segura e desktop/mobile reais:
  Chrome/Edge/Firefox/Safari, leitores disponíveis, seleção por toque/teclado,
  texto longo e 320/390/768/1024/1440, zoom/reflow. Registrar normalizações,
  permissões e destino controlado, sem ler clipboard pelo produto.
- [ ] F012-11 — Rodar testes/typecheck/build; atualizar quickstart/relatórios
  CA01–CA20, defeitos e retestes. Depende de F012-07–10.

| Critérios | Tarefas |
| --- | --- |
| CA01–CA06/CA15/CA19 | F012-03/05/07 |
| CA07–CA09/CA18 | F012-04/08 |
| CA10/CA14/CA16/CA20 | F012-06/09 |
| CA11–CA13 | F012-05/07/10 |
| CA17 | F012-01/02/06 |

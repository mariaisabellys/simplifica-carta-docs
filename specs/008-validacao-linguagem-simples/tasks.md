# Tasks: Validação em linguagem simples

T007 documental, 19/10/2026. Executar conforme [contrato operacional](contrato-validacao-editorial.md)
e [plano detalhado](implementation-plan.md). IDs F008 distinguem tarefas futuras
das tarefas globais. [Lista anterior](historico/2026-10-19-pre-t007-tasks.md).
Contagem e matriz estão definidas documentalmente; nenhuma tarefa funcional abaixo
foi executada pela T007.

- [x] F008-01 — Aprovação explícita registrada em 27/10/2026: catálogo
  `ls-pt-BR-v1` (6 registros originais + 21 adicionais) e mensagens
  `msg-pt-BR-v1` (MSG01–MSG17). Responsável: usuário responsável pelo conteúdo
  do projeto. Sugestões permanecem contextuais; não há substituição automática
  nem homologação institucional implícita.
- [ ] F008-02 — Criar tipos e conteúdo versionado: resultados por regra,
  seis estados agregados, intervalos, revisão, checklist e MSG01–MSG17.
  Depende do contrato; reproduzir exatamente as versões aprovadas em F008-01.
- [ ] F008-03 — Implementar contagem compartilhada T005 e segmentação pt-BR;
  testar CP01–CP13 e VE01, abreviações, decimais, fallback/indisponibilidade.
  Remover 240 caracteres e não usar helper legado como fallback. Depende de F008-02.
- [ ] F008-04 — Implementar LS03 com tokens inteiros, acentos/NFC, construções,
  ausência de flexão implícita, sobreposição, deduplicação e mapa de offsets;
  testar VE02–VE06/18. Depende de F008-01/02/03.
- [ ] F008-05 — Implementar heurísticas limitadas LS04/LS05 e checklist LS03–LS06;
  confirmação de explicação por trecho, não por pontuação. Testar VE05–VE08.
  Depende de F008-02/04; não apresentar ausência de match como prova gramatical.
- [ ] F008-06 — Implementar adaptador LS02 por parágrafo, espelho input/textarea,
  fontes/largura/scrollbar/zoom, campos ocultos e tolerância. Documentar técnica
  escolhida e equivalência real; testar VE11–VE13 em navegador. Depende de F008-02
  e controles reais da 007; DOM simulado sozinho não aprova geometria.
- [ ] F008-07 — Implementar matriz dos 25 campos e classificação M, alvos por ID,
  aplicabilidade K/S/ON/E e vazios. Testar VE09/10/15; não analisar seletores/prazo/URL.
  Depende de F008-02 e modelo/formulário v3.
- [ ] F008-08 — Implementar agregação, invalidação por edição/versão/layout,
  descarte de resultados atrasados e checklist em memória fora da Carta.
  Testar VE06/14/15/18 e cada ramo da precedência. Depende de F008-03–07.
- [ ] F008-09 — Integrar blur/revisão explícita, resumo ordenado, abertura/foco,
  anúncios únicos e mensagens, sem aria-invalid editorial ou bloqueio de ação.
  Depende de F008-08 e visual confirmado com 007/016.
- [ ] F008-10 — Testar consumidores 009/010/012: original intacto, HTML literal,
  nenhuma substituição/exportação de checklist; bloqueios só estruturais.
  Testar VE16 e Carta antes/depois. Depende de F008-09 e consumidores entregues.
- [ ] F008-11 — Executar testes em 320/390/768/1024/1440, texto ampliado,
  zoom/fontes/textarea e teclado/leitores disponíveis; registrar ambientes,
  defeitos e retestes. Testar VE12/13/17. Depende de F008-06/09.
- [ ] F008-12 — Executar typecheck, testes e build; preparar quickstart e atualizar
  validation/verification com evidências e pendências por CA, sem presumir
  aprovação institucional. Depende de F008-10/11; sem teste, registrar pendência.

## Rastreabilidade

| Critérios | Tarefas |
| --- | --- |
| CA01–CA03 | F008-03 |
| CA04/CA16 | F008-06/11 |
| CA05–CA06/CA18 | F008-01/04/05 |
| CA07–CA09 | F008-05 |
| CA10–CA11/CA15 | F008-08 |
| CA12 | F008-09/10 |
| CA13/CA17 | F008-07/08 |
| CA14 | F008-09/11 |

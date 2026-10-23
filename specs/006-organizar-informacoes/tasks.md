# Tasks: Organizar informações

Replanejadas em 19/10/2026 pela T006 documental, conforme [spec](spec.md),
[contrato](contrato-orientacoes-v3.md) e [plano detalhado](implementation-plan.md).
[Lista anterior preservada](historico/2026-10-19-pre-t006-tasks.md).
IDs F006 distinguem tarefas futuras desta feature das tarefas globais de docs/tasks.md.
Nenhuma tarefa de implementação é concluída pela reconciliação documental.

## Preparação

- [ ] F006-01 — Conferir estado real de rotas, shell, links, conteúdo e dependências
  003/005/007/013/016/017. Registrar entrega versus placeholder; seguir contrato
  compartilhado sem API de navegação paralela. Evidência: inventário datado.
- [ ] F006-02 — Consultar Design 387:1918 e Make, confrontar ERS e registrar
  composição, estados, tokens/assets e divergências. Revisar com equipe a redação.
  Depende de F006-01. Não declarar homologação por existir um frame.
- [ ] F006-03 — Aplicar ao conteúdo as substituições do contrato: descrição,
  público por controle, categoria/tópico, custos, agendamento, prazo e recorrência.
  Preservar 13 IDs e três tópicos; manter ressalvas MC-03/MC-05. Versionar mapa
  e complementos por alvo sem duplicação no JSX. Conferir exemplo de descrição.
  Depende de F006-01 e revisão editorial de F006-02; exige autorização de código/conteúdo.
- [ ] F006-04 — Revalidar documentos atuais e decisões pendentes antes da UI;
  manter bloqueios por entrega. Depende de F006-01–03.

## Implementação posterior

- [ ] F006-05 — Criar estado isolado em memória acima das rotas: conjunto de IDs
  conhecidos, marcação/desmarcação idempotentes e contagem derivada. Inicial zero,
  sem seed de progressExample; sem storage/API. Depende de F006-04.
- [ ] F006-06 — Compor página com três tópicos, 13 informações, marcação e
  expansão independentes, exemplos/dicas íntegros e progresso acessível.
  Sem main duplicado nem acesso à Carta. Depende de F006-03/05.
- [ ] F006-07 — Integrar entradas, breadcrumb e destinos livres; preservar href,
  modificadores, histórico, foco e memória. Depende de F006-06 e shell entregue.
- [ ] F006-08 — Integrar orientações na 007 por mapa explícito, incluindo
  reutilização em vários controles e itens por ID estável; não criar orientação
  de Ativo nem campo de recorrência. Depende de F006-03 e formulário entregue.
- [ ] F006-09 — Aplicar estilos/tokens/Inter e estados acessíveis conforme
  referências consultadas; preservar ordem, texto longo, foco e reflow.
  Depende de F006-02/06/07.

## Verificação

- [ ] F006-10 — Testar 0/13, dois IDs, duplicata, desmarcação, 13/13, abertura
  sem marcação e recarga; repetir fluxo entre rotas e com storage bloqueado.
  Carta sintética deve permanecer idêntica. Depende de F006-05–07 e provider 007.
- [ ] F006-11 — Conferir correspondências e copy em todos os destinos da 007,
  condições Sim/Não/externo, controles de público, tópico e prazo; recorrência
  sem campo. Testar itens reordenados e orientação oculta sem perda de dados.
  Depende de F006-08.
- [ ] F006-12 — Verificar teclado, leitores, contraste, larguras 1440/1024/768/
  390/320, intermediárias, texto 200% e reflow. Registrar ambientes indisponíveis
  como pendentes; emulação não comprova dispositivos reais. Depende de F006-09.
- [ ] F006-13 — Executar typecheck/build e suíte adequada, verificar destinos
  reais e fallback publicado quando disponível; retestar consumidores de
  componentes comuns alterados. Depende de F006-06–09 e deploy para recarga publicada.
- [ ] F006-14 — Criar/atualizar quickstart, validation e verification com
  evidência por CA, pendências, defeitos e retestes. Depende de F006-10–13;
  testes não executados não permitem marcar aceite integral.

## Rastreabilidade

| Critérios | Tarefas |
| --- | --- |
| CA01–02, CA05, CA07 | F006-01/07/13 |
| CA03–04, CA11, CA15–16 | F006-03/08/11 |
| CA06, CA10, CA13–14 | F006-05/06/10 |
| CA08–09 | F006-06/09/12 |
| CA12 | F006-02/09/12 |
| Todos: evidência | F006-14 |

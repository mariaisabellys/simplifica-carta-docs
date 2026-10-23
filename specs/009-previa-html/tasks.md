# Tasks: Prévia HTML

T008 documental — 19/10/2026. [Histórico](historico/2026-10-19-pre-t008-tasks.md).
IDs F009 são tarefas futuras locais; não confundir com T008 global.
Base: [spec](spec.md), [contrato](contrato-projecao-v3.md), [plano detalhado](implementation-plan.md).

- [ ] F009-01 — Conferir provider v3, recuperação, registro de foco, navegação,
  validação estrutural 007 e integração 010. Registrar entregas versus placeholders.
- [ ] F009-02 — Consultar Design 821:308/Make, ERS e revisar copy; registrar
  estados nos dois contextos e adaptações sem omitir campos. Depende de F009-01.
- [ ] F009-03 — Implementar view model readonly e seletor dos 25 campos,
  condições K/S/E, hasContent, listas e defaults. Não migrar/alterar fonte.
  Depende de F009-01 e autorização de implementação.
- [ ] F009-04 — Versionar labels/mensagens e renderizar CartaPreview seguro:
  texto literal, listas, ausências, prefixo único e heading contextual.
  Depende de F009-02/03; nenhum link ativo derivado de dados.
- [ ] F009-05 — Integrar o mesmo seletor/card em /previa e nas cinco partes da
  007; atualizações da revisão atual, sem cópia editável. Depende de F009-04/provider.
- [ ] F009-06 — Integrar avisos de sessão, resumo estrutural e retorno por registro
  de alvo/fallback; sem gate editorial e sem foco espontâneo. Depende de F009-05.
- [ ] F009-07 — Integrar destinos livres e slot CSV real. 010 valida seu snapshot;
  enquanto indisponível, registrar CA12 pendente e não simular exportação.
  Depende de F009-06 e 010 para o slot.
- [ ] F009-08 — Aplicar layout/tokens/Inter e acessibilidade, adaptando frame ao
  conteúdo. Testar dois cards montados sem IDs duplicados. Depende de F009-02/05.
- [ ] F009-09 — Testar seletor com fixtures congeladas PV01–PV12, incluindo
  seleções isoladas, 25 definições, opcionais, defaults e condições; comparar
  fonte/strings/IDs/ordem antes/depois. Depende de F009-03.
- [ ] F009-10 — Testar PV13–PV17: contexto compartilhado, markup literal sem
  recursos, memória/recuperação, foco e exportação. Depende de F009-05–07 e
  consumidores reais; stubs não aprovam jornada integrada.
- [ ] F009-11 — Executar PV18 e verificação visual: Chrome/Edge/Firefox/Safari,
  leitores disponíveis, 320/390/768/1024/1440 e intermediárias, texto 200%,
  zoom/reflow, URL longa e fallback de fonte. Registrar limitações/defeitos/reteste.
  Depende de F009-08; ausência de ambiente permanece pendente.
- [ ] F009-12 — Rodar typecheck/build/suíte existente, verificar regressões dos
  componentes comuns, preparar quickstart e consolidar CA01–CA21 em relatórios.
  Depende de F009-09–11; não marcar aprovado sem evidência.

## Rastreabilidade

| Critérios | Tarefas |
| --- | --- |
| CA01/CA03/CA10/CA13 | F009-01/05/06/10 |
| CA02/CA04–CA09/CA19/CA21 | F009-03/04/09 |
| CA11–CA12 | F009-06/07/10 |
| CA14 | F009-04/10 |
| CA15–CA16 | F009-08/11 |
| CA17–CA18 | F009-02/04/11/12 |
| CA20 | F009-04/05/08/10 |

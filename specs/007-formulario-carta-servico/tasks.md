# Tasks — Formulário da Carta v3

Baseline 19/10/2026, T004. Tarefas de implementação abaixo ainda pendentes.
IDs F007 identificam esta lista vigente; tarefas T001–T027 do documento anterior
permanecem apenas no histórico, não correspondem às tarefas globais de docs/tasks.md.

## Contratos e preparação

- [x] F007-01 — Fechar MC-02–MC-08 da matriz com regras e mensagens, sem ampliar campos. Evidência: matriz, modelo central, spec, plan, implementation-plan, contratos consumidores e validation atualizados em 27/10/2026.
- [ ] F007-02 — Integrar decisões de contagem T005, orientações T006 e regras T007. Conferir cada um dos 25 campos, catálogos, IDs e condições K/S/ON/E.
- [ ] F007-03 — Consultar Design/Make e registrar cinco partes, Form-Card, Label-Row e prévia; definir estados ausentes com design system. Reconstruir imagem da parte 2 com controles reais.
- [ ] F007-04 — Revalidar spec/plan/tasks/implementation-plan e emitir validation atual. Não liberar dependência com decisão obrigatória ainda aberta.

## Domínio e sessão — após autorização de implementação

- [ ] F007-05 — Criar registro de campos e ações tipadas sobre v3; testar categoria/subcategoria, custo, agendamento e escolhas inválidas sem mutação.
- [ ] F007-06 — Criar operações de documentos e etapas por ID; defaults vazios, modalidade null, ordem 1..N e IDs preservados após reordenação.
- [ ] F007-07 — Evoluir storage com resultado discriminado, decoder defensivo e preservação de registro inválido/anterior/futuro. Recuperar Carta parcial segura; testar original incompatível intacto e ausência de gravação antes de hidratar.
- [ ] F007-08 — Criar provider único e hook; manter estado entre rotas, avisos de memória apenas e ação explícita de substituir registro inválido. Testar falha de leitura/escrita e recarga válida.
- [ ] F007-09 — Integrar validação estrutural/editorial separada e revisão por snapshot; invalidar confirmação ao editar. Erro técnico não equivale a ausência de pendências.

## Interface — depende dos contratos e referências aplicáveis

- [ ] F007-10 — Compor cinco partes a partir do conteúdo e registro, sem estado editável duplicado. Implementar navegação livre, posição da parte e preservação de valores.
- [ ] F007-11 — Implementar controles sobre serviço e público, catálogos e mensagens. Limite de descrição usa contagem significativa; selecionar categoria limpa subcategoria incompatível com aviso.
- [ ] F007-12 — Implementar documentos, etapas e ações acessíveis; após adicionar/remover/reordenar, aplicar foco por ID e anunciar resultado sem perder texto.
- [ ] F007-13 — Implementar custo/prazo e agendamento K/S/ON/E; preservar inativos e retirá-los de validação/projeções. Corrigir metadados e testar presencial exclusivo, ambos e restauração.
- [ ] F007-14 — Implementar adicionais/palavras-chave e orientações 006 com variantes 811:306/811:382, sem modificar valores.
- [ ] F007-15 — Implementar resumo e retorno a parte/campo/item; destino removido ou inativo tem fallback conhecido, coordenado com shell.
- [ ] F007-16 — Integrar prévia compartilhada 009 e ações para tutorial/ajuda, preservando fonte e acesso parcial. Marcar integração pendente enquanto consumidor não existir.
- [ ] F007-17 — Ajustar conteúdo e estado de conclusão: revisão estrutural atual bem-sucedida, CTA neutro para Carta parcial, nenhuma promessa de aprovação/publicação automática.

## Verificação e entrega

- [ ] F007-18 — Testar domínio/decoder/provider: Carta parcial recuperável, formato/tipos/catálogos, duplicatas, IDs, ordem, sessão, revisão separada, leitura/escrita e falhas; registrar evidência reproduzível.
- [ ] F007-19 — Testar formulário com todas as partes, dados sintéticos, listas, foco, condicionais, HTML literal, acentos e retorno entre rotas.
- [ ] F007-20 — Testar integração 008/009/010/011/012 sobre a mesma Carta, incluindo novos campos e todos os abertos copiáveis na etapa 4; sem gate editorial.
- [ ] F007-21 — Verificar Figma, teclado/leitor, zoom/reflow e mensagens longas em ambientes registrados. Não marcar aceite de ambiente não executado.
- [ ] F007-22 — Executar checks pertinentes, atualizar quickstart/verification e revalidar. Distinguir código parcial de entrega integrada.

## Rastreabilidade

| Aceite | Tarefas |
| --- | --- |
| CA01–CA03 | F007-02/08/10/19 |
| CA04–CA05 | F007-06/12/18/19 |
| CA06–CA07, CA19–CA24 | F007-01/05/09/13/18–20 |
| CA08–CA09 | F007-02/09/14/15/19 |
| CA10–CA12 | F007-07/08/18/19 |
| CA13 | F007-16/20 |
| CA14–CA16 | F007-10–15/19/21 |
| CA17–CA18 | F007-03/04/17/21/22 |
| CA25–CA28 | F007-03/10–16/19/21 |
| CA29–CA32 | F007-01/02/05/09/11/13/18–20 |
| CA33 | F007-09/17/19 |
| CA34 | F007-01/02/05/09/13/18/19 |
| CA35 | F007-01/06/09/12/18/19 |
| CA36 | F007-01/05/09/13/18–20 |
| CA37 | F007-01/05/07/09/18/19 |

Histórico: [tarefas anteriores](historico/2026-10-19-pre-t004-tasks.md).

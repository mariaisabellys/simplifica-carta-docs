# Verificacao: Tutorial Paraiba Digital

## Status

Rodada de `/spec:implementar 011-tutorial-paraiba-digital` em 2026-10-05.
**Preparacao documental realizada; tutorial operacional nao implementado.**
Sem manual administrativo ou material institucional autorizado que confirme
menus/campos/acoes, nao publicar instrucoes presumidas como definitivas.
Nenhum codigo alterado, tarefa concluida ou criterio com aceite funcional.

## Conferencias e correcoes

Conferidos SPEC, PLAN, TASK, IMPLEMENTATION-PLAN e validation.md; conteudo
e pagina existentes, contratos de sessao/copia e alteracoes previas da 010.
O conteudo possui seis etapas; a pagina permanece em cards placeholder, sem
composicao por etapa ativa, data efetiva, matriz externa ou copia integrada.

| Referencia | Resultado documental |
| --- | --- |
| V011-01 | CA17 incluido nas matrizes PLAN/IMPLEMENTATION-PLAN com cenarios condicionais e tarefas pertinentes. |
| V011-02 | Exemplo TutorialStep deixa de criar anchors para todos os IDs estaticos; adapter proposto intersecta IDs do passo com campos visiveis da 012. Ativo missing mantem heading; inativo nao recebe link. Contrato coordena falha da regiao para omitir links sem destino e preservar tutorial-dados no fallback unico. Componentes/estado de disponibilidade ainda precisam de entrega real. |
| V011-03 | T012/T016 e fixtures detalham modalidades, sistemas/formas externas, troca/restauracao/recarga e links montados, preservacao da fonte e retorno antigo de copia invalidado pela 012. |
| V011-04 | Classificacao de correspondencias reunida em subtarefa T003 completa, com cenarios condicionais separados. |

T004 atualizado para conferir conciliacao documental da 012 ja realizada,
sem presumir implementacao ou encerrar pendencias da validacao dessa feature.
validation.md permanece registro historico; snippets corrigidos nao provam
compilacao, anchors reais, manutencao de foco ou integracao entregue.

## Busca de fonte operacional

Busca publica nesta rodada por manual/cadastro e Carta de Servicos em fontes
pb.gov.br nao localizou nos resultados consultados manual administrativo
utilizavel. Isso nao prova inexistencia do material; ele pode exigir acesso
institucional. Resultados incluem [Carta de Servicos da LOTEP](https://lotep.pb.gov.br/carta-de-servicos-ao-cidadao)
e [noticia oficial sobre oficina de elaboracao](https://paraiba-portal-backend.plone.rke.codataprd.pb.gov.br/portal_paraiba/noticias/governo-realiza-2o-encontro-da-rede-pb-digital-nesta-quarta-feira),
sem evidencia de menus, campos ou estados administrativos de cadastro.
Nao promovidos a officialAccess ou fonte operacional de passos.

Nenhuma conta externa, credencial ou cadastro real foi acessado/criado.
Data desta rodada nao e reviewedAt do tutorial; correspondencias continuam
pendentes em vez de serem marcadas como sem equivalente por falta de fonte.

## Pendencias para implementacao

- Manual oficial/material institucional autorizado para perfil de cadastro,
  com URL/contexto/permissoes/menus/campos/acoes e evidencia por instrucao.
- Matriz dos 17 campos verificada, copy/revisao institucional efetiva e
  fontes/datas verdadeiras; nao inventar salvar/enviar/analisar/publicar.
- Provider/modelo/decoder da 007 e seletor/componentes/clipboard da 012
  ainda ausentes; estados e anchors precisam da mesma projeção de campos.
- Referencias Design/Make e frame proprio continuam sem consulta; regras
  locais exigem consulta antes de implementar visualmente. Frames 003/009
  nao substituem o tutorial. ERS PDF tambem continua sem confronto.
- Navegacao/fragmentos/foco compartilhados, entradas/destinos reais e
  ambientes browser/assistivos precisam de entrega/verificacao integrada.
- Assets somente autorizados/demonstrativos, com fonte/data/legenda/alt;
  nao apresentar mockup como captura autentica ou imagem como unica instrucao.

## Atualizacao do mapeamento Figma — 2026-10-08

- Pagina no estado inicial: etapa 1, node `564:635`.
- Variantes da mesma pagina: etapas 2–6, nodes `564:730`, `564:852`,
  `564:980`, `564:1232` e `564:1357`.
- Os seis nodes foram registrados na spec, no plano, nas tarefas, no plano de
  implementacao e no mapa central.
- `src/content/tutorial/paraiba-digital.ts` permanece a fonte dos textos,
  percentuais, instrucoes, campos e acoes. O Figma orienta a apresentacao e
  deve ser adaptado quando houver divergencia de conteudo.

Esta atualizacao confirma as referencias e sua classificacao, mas nao equivale
a consulta MCP dos frames nem a validacao visual de uma implementacao.

## Atualizacao do contrato documental — 2026-10-08

- Uma unica etapa deve ser renderizada por vez em `?etapa=1..6`; valores
  ausentes ou invalidos abrem a etapa 1.
- Voltar, avancar, recarregar e compartilhar a URL preservam a etapa sem
  persistir progresso ou expor dados da Carta.
- Percentuais esperados: 17%, 33%, 50%, 67%, 83% e 100%.
- A etapa 1 nao tem acao anterior; etapas 2–5 tem anterior/proxima; etapa 6
  tem anterior/concluir.
- A integracao de copia e seus estados vazio, parcial, completo e falha ficam
  somente na etapa 4 (`564:980`).
- Preparacao integra a introducao/etapa 4 e ajuda e transversal; nao ha uma
  setima tela. Textos visiveis permanecem na fonte de conteudo, nao no JSX.

Essas correcoes sao documentais e de metadado da rota. A tela ainda precisa ser
implementada e confrontada visualmente com os seis frames.

## Verificacoes e arquivos

Conferidos CA17, classificacao T003, fixtures e contrato de links/fallback.
Nao foram executados testes/typecheck/build nesta rodada: nao houve mudanca
executavel. Checks da 010 nao comprovam tutorial operacional ou interface.

Alterados plan.md, tasks.md e implementation-plan.md da 011; criado este
registro. SPEC e src permanecem intactos nesta rodada, preservando inclusive
a alteracao anterior em src/lib/csv.ts. Nenhuma dependencia foi instalada.

Retomar com fonte administrativa e referencias/contratos pertinentes:
implementar conteudo rastreavel, composicao, regiao real da 012, navegacao e
testes; registrar resultados por CA01–CA17 sem homologacao presumida.

# Verificacao: Formulario da Carta de Servicos

## Status e escopo

Rodada de `/spec:implementar 007-formulario-carta-servico` em 2026-10-05.
**Preparacao documental realizada; implementacao do formulario nao iniciada.**
O comando autoriza implementacao, mas as fontes e decisoes exigidas pelo plano
continuam pendentes. Nenhum criterio recebeu aceite funcional e nenhuma tarefa
foi marcada concluida.

## Preparacao realizada

Conferidos SPEC, PLAN, TASK, IMPLEMENTATION-PLAN e validation.md, modelo/factory,
pagina placeholder, inventario src, package.json e regras locais de implementacao.
Conferido o alinhamento documental da navegacao 002/003/006 realizado na rodada
anterior; componentes compartilhados ainda nao foram entregues.

| Referencia da validacao | Resultado nesta rodada |
| --- | --- |
| V007-01 | Matrizes PLAN/IMPLEMENTATION-PLAN completadas com CA19–CA24: sem agendamento, fluxo nativo, externo dentro/fora, troca e obrigatoriedade condicional. Plano detalhado vincula T018/T019/T022–T025. |
| V007-02 | Removida quebra entre CA18 e CA19 na tabela SPEC, preservando IDs e textos. |
| V007-03 | Resumo do consumidor 010 atualizado com tipos/sistema/link/exibicao, orientacao opcional e exclusao de campos externos inativos. |
| P007-02 | Referencia do plano detalhado atualizada para useAppNavigate unico, conforme exemplo 003 alinhado na rodada 006. Entrega/teste do contexto e links reais permanecem pendentes. |
| P007-03 | Algoritmo separa listas de objetos de tiposAgendamento, lista de enums; preserva modalidades seguras, distingue ausencia esperada em v2 anterior de dado invalido e exige recuperacao parcial sem sobrescrita inicial. T009/T023 incluem esses casos. |
| P007-07 | SPEC esclarece jornada diagnostico > organizacao > formulario, mantendo acesso independente sem gate. Ambientes continuam pendentes. |

validation.md permanece evidencia historica. As correcoes documentais acima
nao aprovam fontes, compilacao, migracao ou preservacao real de dados.

## Dependencias ainda abertas

- Consulta atual da integracao Figma confirmou installed=false. Nao houve
  confirmacao de conexao ou ferramenta de leitura utilizavel; a sugestao
  anterior nao foi repetida. Design YaVUdqYa3boHpvGrxf4ZJ5 pagina 167:2,
  nodes 811:306/811:382/651:317, e Make dVm7lEZdBFqOiiySWLWUqp node 0:1
  continuam sem consulta. Nodes de cards nao comprovam formulario completo.
- `docs/ia/regras-para-ia.md` exige consulta visual via MCP antes de
  implementar. Disposicao simultanea/por partes, estados, tokens e assets
  precisam de referencia real, sem inferir layout definitivo dos snippets.
- ERS PDF nao inspecionado e redacao institucional nao homologada. Nao
  substituir evidencia por existencia de manual textual ou plano.
- Limites candidatos de recuperacao (8 MiB/1000 itens) continuam sujeitos
  a confirmacao/medicao; nao transformar em maxLength de produto.
- Protocolos permitidos de URL externa precisam de decisao compartilhada
  com 008; nao inferir politica HTTPS exclusiva. A 007 apenas registra
  configuracao, sem iframe, redirecionamento ou agendamento executado.
- Retorno/foco e alvos condicionais precisam de consolidacao com 008/016;
  consumidores 009–012 e provider/navegacao reais precisam de testes integrados.

## Verificacoes e arquivos alterados

Busca confirmou CA19–CA24 nas matrizes e ausencia de mudancas em src via
git status. node_modules esta ausente e package.json nao possui suite.
Nao foram instaladas dependencias ou executados build/typecheck, testes de
browser/storage, migrations ou alteracoes em banco. Nenhum codigo foi escrito.

Alterados somente spec.md, plan.md, tasks.md e implementation-plan.md da 007;
criado este registro. Outras alteracoes existentes no workspace foram preservadas.

Retomar a implementacao com referencias e decisoes pertinentes resolvidas,
entregar modelo/reducer/decoder/storage/provider com testes de recuperacao,
depois formulario/estados/navegacao e checks reais. Registrar por criterio os
resultados e as dependencias que ainda impedirem aceite integral.

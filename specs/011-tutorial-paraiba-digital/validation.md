# Validacao: Tutorial Paraiba Digital

> **Baseline atualizado em 16 de outubro de 2026:** repetir a integração da
> etapa 4 usando a projeção v3 da 012.

## Resultado e escopo

Executado `/spec:validar 011-tutorial-paraiba-digital` em 2026-10-05.
**Resultado: requer ajustes documentais e permanece pendente de fonte
operacional administrativa, ERS, Figma e validacao editorial.**

Foram avaliados SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Somente este relatorio
foi criado, sem alterar esses artefatos ou codigo-fonte, nem concluir tarefas.
T008 registra uma validacao com pendencias; nao ha aceite de tutorial
operacional, correspondencia externa ou implementacao visual.

## Fontes analisadas e limites

- [spec.md](spec.md), [plan.md](plan.md), [tasks.md](tasks.md) e
  [implementation-plan.md](implementation-plan.md): cobertura editorial,
  fontes, matriz dos 17 campos, composicao, ancoras, integracao e testes.
- Contratos da 007 e validacoes anteriores de 007–010: sessao, agendamento,
  obrigatoriedade e continuidade; seletor/contratos do plano detalhado da 012,
  incluindo remocao de campos inativos da lista visivel.
- `src/content/tutorial/paraiba-digital.ts` e
  `src/pages/TutorialParaibaDigitalPage.tsx`: conteudo com seis etapas e pagina
  ainda baseada em cards placeholder, sem composicao por etapa ou copia integrada.
- Constitution, contexto local de produto/roadmap/design consultados nas
  validacoes anteriores e referencias citadas pelos quatro documentos.
- [Portal Paraiba Digital](https://paraibadigital.pb.gov.br/) e
  [listagem publica](https://paraibadigital.pb.gov.br/todos), abertos nesta
  rodada: nao retornaram texto extraivel. Nao foram acessadas contas externas.

Nao se obteve manual administrativo, captura autorizada, verificacao de menus,
permissoes, campos ou estados de publicacao. Links publicos nao foram aprovados
como officialAccess administrativo. Nao inventar instrucoes para preencher a
matriz pendente ou usar data deste relatorio como reviewedAt do tutorial.

O ERS PDF nao foi extraido/inspecionado. A verificacao de ferramentas registrada
na 006 nao encontrou Python/py/Poppler; nao houve instalacao nesta rodada.
Manual textual nao substitui PDF. Na rodada original, nao havia ferramenta
Figma utilizavel nem frame proprio confirmado. Nao foram executados testes de
browser, clipboard, tecnologia assistiva ou validacao pela equipe.

### Atualizacao das referencias visuais — 2026-10-08

Os nodes oficiais foram fornecidos e mapeados: `564:635` e a pagina no estado
inicial; `564:730`, `564:852`, `564:980`, `564:1232` e `564:1357` sao variantes
das etapas 2–6. A lacuna de identificacao de frames esta resolvida. Permanece
pendente a consulta detalhada via MCP e a verificacao visual da implementacao.
O conteudo versionado da feature prevalece sobre textos, exemplos e placeholders
dos frames; os layouts devem se adaptar a ele, com divergencias registradas.

### Consolidacao do contrato de estados — 2026-10-08

Os documentos passaram a definir uma unica etapa ativa por vez, no parametro
`?etapa=1..6`, com etapa 1 como fallback. Preparacao foi incorporada a
introducao/etapa 4 e ajuda permanece transversal: nao existem sete telas.
A copia pertence somente a etapa 4 (`564:980`). A rota recebeu `564:635` como
node principal. Permanecem pendentes a implementacao, consulta visual detalhada,
assets e validacao operacional/institucional.

## Inconsistencias e lacunas documentais

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V011-01 | Media | SPEC CA17 e TASK matriz de rastreabilidade incluem agendamento condicional. Matrizes de verificacao do PLAN e IMPLEMENTATION-PLAN terminam em CA16. | Incluir CA17 com evidencia dos dois sistemas, campos ativos/inativos e preservacao da fonte, vinculado a T003/T004/T006/T016 e integracao da 012. |
| V011-02 | Media | TutorialStep do IMPLEMENTATION-PLAN gera anchors para todo step.localFieldIds. O seletor da 012 filtra campos de agendamento quando resposta nao e Sim e link/exibicao quando sistema nao e externo. A 011 exige validar anchors existentes e afirma que missing conserva heading. | Distinguir campo ativo missing de campo inativo ausente. Derivar links relacionados somente dos IDs visiveis da 012, ou apontar referencias inativas ao heading da regiao de dados com contexto adequado. Nao recriar controles inativos para satisfazer anchors. Definir comportamento tambem quando CopyBoundary falha; a alternativa tutorial-dados precisa ser renderizada no fallback. |
| V011-03 | Media | TASK T016 e fixtures do plano detalhado citam null/false/true e orientacoes/valores externos inativos, mas nao detalham modalidades, sistema nativo, externo dentro/fora ou troca com links relacionados montados. | Acrescentar testes de composicao para uma/ambas modalidades, ambos os sistemas, ambos os modos externos, troca/restauracao e recarga. Conferir campos/anchors visiveis, cancelamento de retorno antigo de copia pela 012 e ausencia de gate global. Testar aqui integracao, sem duplicar testes internos de clipboard. |
| V011-04 | Baixa | TASK T003: subtarefa de cenarios interrompe a frase distinguir correspondencia; confirmada, informacao complementar e campo sem equivalente fica na subtarefa seguinte. | Reunir a classificacao em uma subtarefa completa e separar os cenarios condicionais. Preservar fonte/data e nao tratar pendente como sem equivalente verificado. |

V011-02 e uma lacuna de composicao do codigo-base proposto, nao um defeito
observado em funcionalidade implementada. O conteudo operacional ainda nao
possui localFieldIds finais; a regra deve ser fechada antes de cria-los.

## Regras e contratos consistentes

- Tutorial independente de Carta, diagnostico, previa, CSV ou login no app.
  As seis etapas oficiais correspondem aos seis estados visuais; preparacao e
  ajuda sao conteudos transversais.
- Cadastro, revisao e acoes oficiais manuais, sem conta externa, credenciais,
  API, automacao ou deteccao de colagem/salvamento/publicacao.
- Fontes, perfil/contexto e datas reais versionados; salvar/enviar/analisar/
  publicar somente como acoes verificadas. Conteudo provisório nao e definitivo.
- Matriz cobre 17 campos locais e distingue correspondencia confirmada,
  complemento e ausencia de equivalente pesquisado. Obrigatoriedade externa
  nao e inferida da local; multiline nao promete preencher entradas separadas.
- Uma configuracao condicional de agendamento: tipos/sistema com Sim,
  link/exibicao somente externos; orientacao opcional com Sim. Valores inativos
  preservados na sessao sem transferencia. Nao presume iframe ou capacidade
  real de incorporacao no Paraiba Digital oficial.
- 011 controla editorial/composicao; 012 fornece tipos neutros, seletor,
  campos, clipboard e fallback manual. Sem mecanismo duplicado ou ciclo de
  importacao entre paginas; protecao CSV nao e aplicada ao clipboard.
- Instrucoes sobrevivem a ausencia/recuperacao da Carta e falha da regiao de
  copia. Falha de integracao nao vira Carta vazia ou provider substituto.
- Assets locais demonstrativos/autorizados, fonte/data/legenda/alt; texto
  essencial permanece compreensivel quando imagem falha.
- Link oficial confirmado por acao explicita em nova aba, com aviso acessivel
  e rel adequado; nenhuma Carta em URL ou requisicao de fundo.
- Progresso livre, foco no titulo e historico por `?etapa=1..6`; sem progresso
  persistido ou obrigacao de concluir passos.

Nao foi encontrada regra principal que copie configuracoes inativas ou infira
Nao do default legado. A 012 atual ja foi revisada documentalmente para campos
ativos e null/false explicito. Implementacao e testes conjuntos continuam
pendentes; revisao documental nao equivale a entrega funcional.

## Pendencias e impactos para implementacao futura

| Ponto | Acao necessaria |
| --- | --- |
| Fonte administrativa | Obter material oficial/institucional autorizado para o perfil de cadastro, com referencia, versao/data, contexto e evidencia por instrucao em T002. Sem isso, CA02–CA04/CA08 nao possuem aceite operacional. |
| Matriz externa/copy | Verificar todos os campos, rotulos, modos de entrada e estados; submeter a equipe com responsavel/data. Nao substituir lacunas por menus ou URLs supostos. |
| ERS/Figma | Confrontar PDF e consultar detalhadamente no Design/Make os seis frames agora mapeados. Frames de entrada/previa nao homologam o tutorial. |
| Estado da conciliacao 012 | PLAN/T004 ainda listam revisoes ja efetuadas como trabalho a realizar, enquanto inventario e plano detalhado reconhecem atualizacao. Ajustar descricao para verificacao cruzada remanescente, sem marcar tarefa concluida ou reaplicar regras antigas. |
| Contratos reais | Entregar provider/decoder da 007 e CartaCopyFields/seletores/labels da 012. Consolidar props fields e propriedade dos anchors, incluindo IDs ativos/missing e fallback de falha. |
| Navegacao compartilhada | Contrato documental fechado em `docs/arquitetura/contrato-navegacao.md`. Implementar AppLink, query `etapa`, popstate e foco no shell e validar a integração. |
| Conteudo e assets | Completar fontes/checkedAt/reviewedAt reais e inventario autorizado; mover copy ilustrativa do JSX para conteudo. Nao criar objetos de producao com fonte/data/href ficticios. |
| Integracao/ambientes | Confirmar entradas 003/009 e ajuda, fallback SPA, clipboard/manual, imagens ausentes e tecnologia assistiva real. Registrar o que nao foi executado; placeholders nao comprovam jornada. |

Nao ha nova decisao sobre apagar dados ocultos: preservacao ja e regra
documentada. Correspondencia/capacidade de agendamento no sistema oficial
continua dependente de evidencia institucional; esta rodada nao a homologou.

## Verificacao e arquivos alterados

O conteudo possui seis etapas e a pagina continua placeholder, conforme
inventario. Nao foram instaladas dependencias ou executados build/typecheck
como evidencia de tutorial futuro. Contagem de cards nao prova instrucoes
corretas; verificacao posterior deve combinar revisao humana por fonte com
testes de integridade, composicao, sessao, campos/anchors, falhas, foco e reflow.

Somente `specs/011-tutorial-paraiba-digital/validation.md` foi criado.
Os quatro artefatos e src permaneceram intocados, sem tarefas concluídas
automaticamente. Corrigir V011-01–V011-04, fechar dependencias aplicaveis e
repetir a validacao antes de implementacao dependente. Este relatorio nao e
aprovacao editorial, institucional, visual ou funcional.

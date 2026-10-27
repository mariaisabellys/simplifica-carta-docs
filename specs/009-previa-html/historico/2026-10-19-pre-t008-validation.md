# Validacao: Previa HTML

> **Histórico anterior ao modelo v3:** repetir a validação da projeção sobre a
> Carta central da 007.

## Resultado e escopo

Executado `/spec:validar 009-previa-html` em 2026-10-05.
**Resultado: requer ajustes documentais; confronto integral das fontes,
validacao editorial/visual e aceite funcional permanecem pendentes.**

Esta rodada avalia SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Somente este
relatorio foi criado, sem alterar os quatro artefatos ou codigo-fonte e sem
marcar tarefas como concluidas. T005 registra uma validacao com pendencias,
nao uma aprovacao sem bloqueios.

## Fontes analisadas e limites

- [spec.md](../spec.md), [plan.md](../plan.md), [tasks.md](../tasks.md) e
  [implementation-plan.md](../implementation-plan.md): cobertura dos campos,
  seletor, estados, listas, exemplos de componentes, contratos e testes.
- Constitution e ADR-002 de exportacao CSV; contexto local de produto,
  roadmap e design consultado nas validacoes anteriores.
- 007: Carta v2, recuperacao, agendamento e foco; 008: ValidationRun,
  resumo e limites de bloqueio; 010: exportacao sobre snapshot e retorno.
  Referencias a tutorial, copia, ajuda e acessibilidade nos documentos da 009.
- `src/pages/PreviaCartaPage.tsx`: pagina placeholder; contratos iniciais de
  modelo, schema, storage, navegacao e helpers inspecionados nas rodadas 007/008.

O ERS PDF nao foi extraido ou inspecionado. A verificacao de ferramentas
registrada na validacao da 006 nao encontrou Python/py/Poppler; nao houve
instalacao nesta rodada. O manual textual nao substitui o PDF.
Nao ha ferramenta Figma utilizavel exposta nesta sessao. O node 821:308
e referencia local do cartao, sem comprovar composicao completa, estados
ou consulta a Design/Make. Nao foi verificado o estado de instalacao/conexao
do plugin. Nao declarar homologacao visual, institucional ou editorial.

## Inconsistencias e lacunas documentais

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V009-01 | Media | SPEC inclui CA19; TASK o vincula a T002/T008/T014–T015. PLAN, tabela Criterios/Verificacao futura, e IMPLEMENTATION-PLAN, tabela CA/Evidencia/Tarefas, terminam em CA18. | Incluir CA19 nas duas matrizes, com evidencia dos campos ativos, omissao dos inativos e preservacao da fonte. O fluxo ja esta descrito e implementado no seletor proposto; a lacuna e de rastreabilidade. |
| V009-02 | Media | TASK T014/T015 e fixtures do IMPLEMENTATION-PLAN detalham Sim/Nao/null e orientacao, mas nao detalham modalidades, sistema nativo, externo dentro/fora e troca com URL/exibicao retidas. T002 pede esses cenarios na preparacao. | Acrescentar casos executaveis para Online, Presencial e ambos; Sim sem tipos/sistema; sistema nativo com valores externos retidos; externo com campos presentes/ausentes e ambas as formas de exibicao; troca/restauracao e previa montada atualizando. Verificar ausencia de iframe/link ativo, rotulos e pendencias dos campos aplicaveis, sem mutacao da Carta. Vincular atualizacao/recarga a T016 e validacao compartilhada a T010. |
| V009-03 | Baixa | TASK T002, linhas 28–31: a nova subtarefa de cenarios interrompe a frase Definir hasContent; explicitamente true/false fica sob a subtarefa seguinte. | Reunir a definicao de hasContent em uma subtarefa completa e manter os cenarios condicionais em outra. Preservar a regra existente: true/false explicitos contam como conteudo; IDs/ordens/atributos isolados nao. Nao exige nova decisao de negocio. |

Nao foi identificada regra principal que ainda apresente Link/Exibicao para
Paraiba Digital ou campos de agendamento quando a resposta nao for Sim.
As notas de ausencia de specs na criacao estao identificadas como historicas;
PLAN e plano detalhado distinguem documentos presentes de codigo pendente.

## Contratos e regras consistentes

- Previa local em /previa, somente leitura e acessivel com Carta parcial,
  sem exigir diagnostico, exportacao ou completude.
- Uma Carta compartilhada da 007, atualizada mesmo com pagina montada;
  sem storage proprio, segunda Carta editavel ou migracao durante render.
- Cobertura de 17 campos logicos, com listas agregadas e texto integral.
  Nome popular/adicionais vazios omitidos; ausencias aplicaveis identificadas
  por mensagem de interface, sem gravar Nao informado como dado.
- hasContent considera texto ativo util, nomes/descricoes de listas e
  agendamento true/false explicito. Dados condicionais inativos nao criam
  Carta ficticia. False legado deve passar pelo decoder antes do seletor.
- Custo 0 e gratuidade expressa preservados; vazio nao significa gratuito,
  dispensado ou Nao. Lista vazia nao confirma ausencia de exigencia.
- Itens sem texto sao filtrados com aviso de incompletude; itens parciais
  com texto preservam atributos ausentes. Etapas conservam numeros de origem,
  usando li.value, sem renumerar subconjunto ou ordenar a fonte in-place.
- Tipos/sistema somente com Sim; link/exibicao somente com Sim e externo.
  Orientacao e opcional com Sim. Seletor deriva arrays/valores ativos e flags
  de exibicao, sem apagar dados externos retidos na sessao.
- Sistema nativo deve ser identificado como agendamento pelo Paraiba Digital;
  externo deve explicar permanencia na experiencia ou redirecionamento.
  A previa registra esses significados: nao executa agendamento, incorporacao
  ou redirecionamento. URL continua texto, sem linkificacao ou iframe.
- Required da 008, complete/failed, sem segundo motor editorial. Falha nao
  oculta dados ou libera CSV; sugestoes nao bloqueiam previa/tutorial/edicao.
- Exportacao pertence a 010, que captura e valida snapshot no clique.
  Sem componente funcional, omitir acao ficticia e registrar CA12 pendente.
- React renderiza entradas como texto; preserva acentos, quebras e HTML
  literal sem executar ou carregar recursos derivados. HTML e interface de
  revisao, sem arquivo HTML/PDF, pagina publica ou aprovacao institucional.

## Pendencias e impactos para implementacao futura

| Ponto | Acao necessaria |
| --- | --- |
| ERS/copy/Figma | Confrontar fontes oficiais, confirmar pagina completa e estados vazio/parcial/falha/recuperacao, validar textos e registrar evidencias em T001–T003/CA18. |
| Provider/decoder | Aguardar contrato real da 007, incluindo avisos de recuperacao e memoria apenas. Inicializacao assincrona, se adotada, exige ramo anterior ao estado vazio; provider ausente e falha de integracao, nao Carta nova. |
| Resumo e retorno | Consolidar props run/context/labels/destinos com 008/007. O esqueleto da 009 reconhece que o contrato ainda e proposto; definir contexto preview sem autofocus de montagem/atualizacao e targets dos grupos condicionais. |
| Navegacao | Resolver useAppNavigate/useNavigation entre 002/003, registrado nas validacoes anteriores; preservar href, modificadores, historico e memoria. Shell controla titulo/foco de rota; correcao deve abrir parte e focar alvo conhecido. |
| Rotulos de agendamento | Completar mapas de enums e explicacoes versionadas conforme 007, pois o exemplo de copy da 009 inclui labels mas ainda remete os valores e significados ao contrato compartilhado. Nao renderizar enums tecnicos crus. |
| Ajuda | O esqueleto nao inclui link local, mas o plano admite ajuda no shell ou fallback local. Confirmar acessibilidade de /ajuda em todos os estados e criar fallback somente se necessario, sem duplicar acao existente. |
| CSV | Fechar integracao do ExportCsvAction/onCorrect e comportamento blocked/failed com 010. Nenhuma permissao baseada apenas no resumo cacheado. CA12 permanece pendente ate entrega real. |
| Deploy e ambientes | Recarga direta fora do Vite depende do fallback de deploy; confirmar ambientes da 016 e registrar testes nao executados, sem generalizar emulacao a leitores reais. |

Preservacao dos valores ocultos ja e regra definida, nao decisao pendente.
Protocolos de URL continuam pendencia compartilhada de 007/008; como a previa
nao torna enderecos clicaveis, nao deve inventar politica de navegacao externa.

## Verificacoes e estado do codigo

PreviaCartaPage continua placeholder e nao le a Carta. Provider, modelo v2,
resumo e exportacao completos permanecem planejados. Isso e coerente com o
inventario do plano, mas nao comprova nenhum criterio integrado.

Nao foram instaladas dependencias nem executados build/typecheck ou testes
como evidencia de comportamento ainda inexistente. Os exemplos dependem de
componentes propostos; este relatorio nao afirma compilacao ou fidelidade Figma.
Testes futuros devem verificar pureza, conteudo/ausencias, condicoes ativas,
listas com lacunas, renderizacao segura, sessao, retorno/foco e exportacao,
com resultados reproduziveis em verification.md e ambientes identificados.

## Arquivo alterado e proximo passo

Somente `specs/009-previa-html/validation.md` foi criado nesta execucao.
Os quatro documentos avaliados e src permaneceram intocados, sem tarefas
concluidas automaticamente. Corrigir V009-01–V009-03 e fechar dependencias
aplicaveis antes de repetir a validacao e implementar trabalho dependente.

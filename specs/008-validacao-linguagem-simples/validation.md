# Validacao: Validacao e linguagem simples

## Resultado e escopo

Executado `/spec:validar 008-validacao-linguagem-simples` em 2026-10-05.
**Resultado: requer ajustes documentais; confronto integral das fontes,
validacao editorial e aceite funcional permanecem pendentes.**

Foram avaliados SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Somente este relatorio
foi criado; os quatro artefatos e o codigo nao foram alterados. Nenhuma tarefa
foi marcada como concluida. Esta execucao registra a avaliacao de T006 com
pendencias, sem declarar aprovacao para implementacao visual.

## Fontes analisadas e limites

- [spec.md](spec.md), [plan.md](plan.md), [tasks.md](tasks.md) e
  [implementation-plan.md](implementation-plan.md): requisitos, catalogo,
  exemplos tecnicos, acionamento, contratos, testes e rastreabilidade.
- Constitution, prompts internos, roadmap, MVP, fluxos e mapa local Figma.
- Contratos da 007, especialmente modelo, agendamento, revisao e foco;
  contrato da 010 e seu exemplo de validacao do snapshot antes do CSV.
  Referencias de previa/copia/acessibilidade confrontadas na revisao documental
  anterior e nos planos da 007/008.
- `src/features/carta/carta.schema.ts`, `carta.validation.ts` e
  `src/lib/validation.ts`; busca de callers dos tres helpers em todo `src`.

O ERS PDF nao foi extraido ou inspecionado. A verificacao de ferramentas
registrada na validacao da 006 nao encontrou Python/py/Poppler; nao foram
instaladas dependencias. O manual textual nao substitui o PDF.
Nao ha ferramenta Figma utilizavel exposta nesta sessao. Nodes locais
811:306, 811:382 e 651:317 nao comprovam consulta aos estados de erro,
sugestao, resumo ou falha. Nao foi verificado o estado de instalacao/conexao
do plugin. Nenhuma homologacao institucional ou visual foi realizada.

## Inconsistencias e lacunas

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V008-01 | Media | PLAN: tabela Criterios/Verificacao futura tem duas colunas, mas CA19 foi adicionado com tres. IMPLEMENTATION-PLAN: tabela CA/Evidencia/Tarefas tem tres colunas; CA19 coloca o resultado esperado na coluna Tarefas. | Ajustar a linha ao cabecalho de cada tabela. No plano detalhado, inserir tarefas reais de implementacao e teste; a TASK ja relaciona T002/T009/T014/T017. O criterio existe nos quatro documentos, mas sua evidencia/rastreabilidade esta mal estruturada. |
| V008-02 | Media | TASK T017 descreve cinco campos e falhas, embora a matriz lhe atribua CA19. Estrategia de testes do PLAN e tabela de grupos do IMPLEMENTATION-PLAN tambem nao detalham os casos condicionais; T002 os menciona na preparacao. | Acrescentar casos executaveis para null/Nao, Sim sem tipos/sistema, uma ou ambas modalidades, enums/lista invalidos, externo com URL/exibicao ausentes ou invalidas, sistema nativo com valores externos retidos e troca/restauracao/recarga. Incluir comparacao formulario/CSV e retirada de mensagens inativas em T019/T020. A regra de negocio esta definida; falta a cobertura de testes explicita no trabalho que a verifica. |
| V008-03 | Media | IMPLEMENTATION-PLAN, Acionamento/timers: revisao e snapshot do texto por alvo; sincronizacao pelo texto derivado. RF02/CA19 exigem retirar resultados quando resposta/sistema muda sem apagar valores. | Incluir a condicao de aplicabilidade na invalidacao e na verificacao do callback. Exemplo: orientacao com timer pendente, mudar Sim para Nao mantendo o texto; o alvo ainda existe e seu texto nao mudou. Cancelar/descartar esse resultado e limpar mensagens imediatamente. Recalcular required dos campos externos ao trocar sistema mesmo sem editar URL/exibicao. O texto geral exige essa retirada, mas o mecanismo detalhado ainda nao a garante explicitamente. |

V008-03 e uma lacuna do controlador planejado, nao um defeito observado em
codigo implementado. Nao altera a decisao de preservar os valores ocultos.

## Regras e contratos consistentes

- Cinco obrigatorios gerais em fonte unica; nome popular e adicionais
  opcionais. Espacos e tipos incompatíveis nao preenchem texto; custo textual
  0 permanece preenchido sem comprovar gratuidade ou correcao factual.
- Agendamento somente com exigeAgendamento true: tipos e sistema obrigatorios;
  link/exibicao somente para sistema externo. Sistema nativo nao exige
  campos externos. Valores inativos sao preservados, sem erros ou transferencia
  ativa. Orientacao so recebe analise com Sim; URL e enums nao sao editoriais.
- Motores required/editorial separados; ValidationRun complete/failed.
  Falha editorial nao elimina required; falha required nao libera exportacao.
  A 010 valida o mesmo snapshot que serializa e filtra erros, sem depender de
  visited, cache da UI ou sugestoes.
- Previa e copia de campos preenchidos de Carta parcial permanecem livres;
  sugestoes nao bloqueiam navegacao, CSV, copia ou edicao.
- Sugestoes locais, deterministicas, sem IA externa, reescrita ou persistencia.
  Texto, HTML literal, acentos, quebras e ordem da Carta sao preservados.
- Extensao proposta mede pontos de codigo do texto aparado, nao frases,
  grafemas ou bytes. A mensagem do plano corresponde ao tamanho total.
- Vocabulario fechado normalizado em copia de analise; palavra inteira,
  deduplicacao por regra/alvo e negativos de substring/flexao. Nomes e
  documentos recebem orientacao sem heuristica automatica.
- IDs estaveis de itens, resultados derivados e resumo em ordem atual;
  sugessoes nao usam aria-invalid nem movem foco durante digitacao.
- Campos intocados sem erros prematuros; revisao explicita inclui partes
  ocultas e oferece localizacao, sem condicionar edicao a completude.

Nao foi encontrada regra que torne link/exibicao obrigatorios para Paraiba
Digital, nem bloqueio global de copia por obrigatorios ou sugestoes. A nota
da SPEC sobre ausencia de pastas na criacao e historica; o PLAN distingue
documentacao existente de implementacao pendente.

## Pendencias e impactos para implementacao futura

| Ponto | Acao necessaria |
| --- | --- |
| ERS, catalogo e copy | Confrontar fontes oficiais e registrar responsavel/data de validacao editorial; 240 pontos de codigo e termos sao propostas, nao limites institucionais. |
| URL externa | Decidir protocolos e politica de URL em T002. URL absoluta nao comprova protocolo aceito, disponibilidade ou possibilidade de incorporacao. Nao inventar restricao HTTPS exclusiva. |
| Helper condicional | Detalhar validarAgendamentoCondicional antes do codigo, como o proprio plano exige: ownData, enums, lista sem duplicatas, URL e erros por alvo. O snippet que o chama nao e um modulo completo pronto para compilar. |
| Aplicabilidade/registro | Consolidar ordem, labels, IDs DOM e foco dos grupos condicionais com 007/016; ao corrigir grupo de modalidades, focar controle adequado sem exigir todas as caixas. |
| Modelo/provider/decoder | Dependem da entrega real da 007. Legado deve passar pelo decoder; nao inferir Nao do false antigo nem introduzir segunda Carta na 008. |
| Navegacao compartilhada | Resolver a divergencia useAppNavigate/useNavigation da 002/003, registrada nas validacoes 006/007, antes de usar destinos de correcao entre rotas. |
| Figma | Consultar Design/Make e registrar estados, associacoes, foco, contraste e reflow antes de fechar apresentacao. |
| Catalogo/metas tecnicas | Confirmar fronteiras de hifen/apostrofo, debounce 300 ms, fixture e metas 50/200 ms por medicao. Nao truncar dados nem afirmar desempenho medido. |
| Integracao e ambientes | CA09/CA10 dependem de consumidores reais; configurar suite e registrar navegadores/leitores/ambientes efetivamente executados. |

## Estado do codigo e verificacoes

A busca em src encontrou somente declaracoes dos helpers, sem callers reais.
O helper atual ainda retorna array de campo/mensagem; a heuristica antiga
usa length/regex ASCII e mensagem de frases menores. O schema atual tem
cinco campos e false inicial. O plano reconhece esses estados como legados
a evoluir, nao como entrega dos requisitos novos.

Nao foram executados build/typecheck ou testes como evidencia de comportamento
que ainda nao existe; nenhuma dependencia foi instalada. A validacao documental
nao comprova compilacao dos exemplos ou cumprimento de CA01–CA19.
Na implementacao futura, executar checks e testes significativos de required,
Unicode, pureza, falhas, timers, aplicabilidade, foco e consumidores, vinculados
a tarefas e evidencias reproduziveis em verification.md.

## Arquivo alterado e proximo passo

Somente `specs/008-validacao-linguagem-simples/validation.md` foi criado.
Os quatro documentos avaliados e arquivos em src permaneceram intocados.
Corrigir V008-01–V008-03, resolver as pendencias aplicaveis e repetir a validacao
antes da implementacao dependente. Este relatorio nao constitui aceite
institucional, editorial, visual ou funcional.

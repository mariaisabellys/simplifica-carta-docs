# Spec — Consolidação documental para implementação do Simplifica Carta

Data: 19 de outubro de 2026. Estado: planejamento criado; correções ainda não executadas.

Documentos relacionados: [plano](plan.md) e [tarefas sequenciais](tasks.md).

## Objetivo e escopo

Consolidar requisitos, conteúdo, modelo da Carta, consumidores, navegação e critérios de aceite para que cada feature possa ser implementada a partir de documentos coerentes e verificáveis. Este trabalho abrange as features 001–016 e o planejamento da 017, indicada no índice do projeto.

Os usuários deste conjunto são quem desenvolve, revisa conteúdo, valida produto e verifica a implementação. O resultado esperado é uma base documental executável, com decisões identificadas, responsabilidades por feature e evidências atuais.

A criação destes três documentos prepara as correções futuras. A execução das tarefas começa em uma rodada posterior. Alterações funcionais, instalação de dependências, publicação e implementação de interfaces pertencem às respectivas etapas de implementação.

## Fontes e precedência

1. Decisões explícitas do responsável pelo produto, incluindo a atualização da 012 registrada neste documento.
2. Modelo central da 007 e conteúdo versionado, reconciliados com essas decisões.
3. Contratos compartilhados de navegação, canais e design system.
4. Specs, planos e tarefas atualizados por feature.
5. Registros históricos, usados como evidência de evolução, não como instrução vigente.

O código atual é evidência do que existe, não homologação automática de comportamento. O Figma orienta composição e estilo; o layout deve acomodar o conteúdo vigente. Conflitos com ERS ou decisões institucionais devem ser registrados com trecho, impacto e decisão necessária, sem declarar consulta que não ocorreu.

Fontes principais:

- [Modelo central da Carta](../specs/007-formulario-carta-servico/modelo-central-carta.md).
- [Contrato de navegação](arquitetura/contrato-navegacao.md).
- [Mapa Figma](design-system/mapa-figma-telas.md).
- [Constitution](processo/constitution.md).
- [Índice de features](../specs/README.md).
- `src/content/pages/formulario-carta.ts`, `organizar-informacoes.ts`, `src/content/tutorial/paraiba-digital.ts` e conteúdo de ajuda.
- `src/features/carta/carta.types.ts`, `carta.schema.ts`, `carta.validation.ts`, `carta.csv.ts` e `carta.storage.ts`.

## Problemas a resolver

| ID | Problema e evidência da auditoria | Resultado exigido |
| --- | --- | --- |
| DOC-01 | 007 contém tabelas, tarefas e snippets v2 apesar do modelo v3 vigente. | Todos os artefatos ativos orientam v3; migração e recuperação possuem contrato único. |
| DOC-02 | 009–012 usam paths removidos e projeções antigas. | Mapeamento completo a partir da mesma Carta, sem segunda representação editável. |
| DOC-03 | 010 descreve 17 linhas; o helper atual produz 22 linhas de dados. | Matriz oficial de exportação com cardinalidade, ordem, valores e testes derivados. |
| DOC-04 | 012 limita a interface a dez blocos/seis botões. | Aplicar a nova decisão: todos os campos da Carta, cópia nos campos abertos. |
| DOC-05 | 007 conta tokens totais; 008 exige palavras significativas. | Compartilhar definição de contagem e distinguir limite do campo de limite por frase. |
| DOC-06 | 008 ainda não fecha catálogo, mensagens, campo × regra e estados. | Contrato editorial verificável com limites das heurísticas e falhas explícitos. |
| DOC-07 | 006 orienta recorrência e não mapeia integralmente orientações para 007. | Explicitar destino de cada informação e decidir recorrência sem ampliar o modelo por inferência. |
| DOC-08 | 015 mantém tarefas e critérios de mailto após decisão de copiar e-mail. | Apenas exibição/cópia no contrato ativo; histórico separado. |
| DOC-09 | 013–015 misturam estado editorial, operacional e registros anteriores. | Fonte única de canais e transições coerentes, inclusive acesso direto e pausas. |
| DOC-10 | 014 tem decisões abertas de API, estabilidade de horário e operação. | Contratos completos antes de implementar backend dependente. |
| DOC-11 | Relatórios antigos apresentam problemas posteriormente resolvidos como pendências. | Baseline atual por feature com histórico datado e evidência de encerramento. |
| DOC-12 | Há artefatos ausentes e 017 consta apenas como intenção no índice. | Convenção documental proporcional ao escopo e artefatos necessários criados. |
| DOC-13 | Referências visuais identificadas não comprovam consulta ou estados completos. | Registrar consultas e adaptações necessárias antes da implementação visual correspondente. |
| DOC-14 | Exemplos antigos de navegação e inventários podem divergir do contrato compartilhado. | Rotas, query, hash, foco e destinos derivados de contrato único. |

## RF01 — Modelo e matriz central

Atualizar a 007 integralmente. A matriz central deve conter, para cada campo: parte, ID editorial, path v3, tipo de controle, tipo de valor, opções, obrigatoriedade, condição de ativação, representação vazia, destino na 006/008/009/010/012 e alvo de foco. Documentos e etapas usam IDs estáveis; índices visuais não são identidade.

Separar obrigatoriedade de regras estruturais e sugestões editoriais. O schema atual lista dez paths obrigatórios gerais, além de regras condicionais; revisar essa lista contra o conteúdo e registrar a justificativa, substituindo a referência obsoleta a cinco obrigatórios. Definir também validação de valores de catálogo, prazo, custo, listas e URL conforme escopo real.

Definir comportamento de storage v3, formato inválido, versão anterior/futura e recuperação sem perda silenciosa. Não reintroduzir o envelope v2 de snippets antigos.

## RF02 — Decisão vigente da feature 012

**Decisão do usuário em 19/10/2026:** a etapa de cópia deve apresentar todos os campos da Carta. Campos abertos possuem botão de copiar. Campos de outros tipos apresentam somente a informação escolhida no formulário.

Esta decisão substitui a restrição anterior a dez blocos e seis botões. A 012 continua integrada exclusivamente à etapa 4 da 011, na rota `/tutorial-paraiba-digital?etapa=4`, usando o node `564:980` como referência de layout adaptável ao conteúdo completo.

### Matriz inicial de apresentação e cópia

| Parte | Campo/path v3 | Apresentação | Copiar |
| --- | --- | --- | --- |
| Sobre o serviço | `sobreServico.nome` | Texto informado | Sim |
| Sobre o serviço | `sobreServico.nomePopular` | Texto informado | Sim |
| Sobre o serviço | `sobreServico.descricao` | Texto informado | Sim |
| Sobre o serviço | `sobreServico.categoria` | Opção escolhida | Não |
| Sobre o serviço | `sobreServico.subcategoria` | Opção escolhida | Não |
| Sobre o serviço | `sobreServico.topico` | Texto informado | Sim |
| Sobre o serviço | `sobreServico.ativo` | Estado escolhido, com rótulo legível | Não |
| Público e requisitos | `publicoRequisitos.publicosEspecificos` | Grupos escolhidos | Não |
| Público e requisitos | `publicoRequisitos.perfisUsuario` | Perfis escolhidos | Não |
| Público e requisitos | `publicoRequisitos.quemPodeUtilizar` | Texto informado | Sim |
| Público e requisitos | `publicoRequisitos.documentos[].nome` | Um documento por item | Sim, por texto/item |
| Público e requisitos | `publicoRequisitos.custo.tipo` | Opção escolhida | Não |
| Público e requisitos | `publicoRequisitos.custo.detalhe` | Valor/link informado, quando ativo | Sim |
| Público e requisitos | `publicoRequisitos.prazo.maximo` | Valor do campo aberto | Sim |
| Público e requisitos | `publicoRequisitos.prazo.tipo` | Unidade escolhida | Não |
| Como funciona | `etapas[].titulo` | Título por etapa, na ordem atual | Sim |
| Como funciona | `etapas[].orientacaoCidadao` | Orientação por etapa | Sim |
| Como funciona | `etapas[].modalidade` | Modalidade por etapa | Não |
| Atendimento | `atendimento.exigeAgendamento` | Sim/Não ou ausência explícita | Não |
| Atendimento | `atendimento.tiposAgendamento` | Modalidades escolhidas, quando ativas | Não |
| Atendimento | `atendimento.sistemaAgendamento` | Sistema escolhido, quando ativo | Não |
| Atendimento | `atendimento.linkAgendamento` | Link informado, quando ativo | Sim |
| Atendimento | `atendimento.exibicaoAgendamento` | Opção escolhida, quando ativa | Não |
| Informações finais | `informacoesFinais.informacoesAdicionais` | Texto informado | Sim |
| Informações finais | `informacoesFinais.palavrasChave` | Texto informado | Sim |

São 25 definições de campos de usuário, com repetição por item nas coleções. `versao`, IDs e ordem técnica não são campos copiáveis; a numeração da etapa é contexto visual. Essa cardinalidade difere da quantidade de linhas agregadas do CSV.

Regras complementares:

- “Todos os campos” cobre os campos aplicáveis da Carta atual. Valores condicionais retidos, mas inativos, permanecem ocultos, conforme o modelo central.
- Campos aplicáveis vazios continuam identificáveis, com mensagem de ausência; não há cópia habilitada de vazio, placeholder ou exemplo. Coleções vazias apresentam estado vazio.
- Checkbox `false` é mostrado conforme a semântica do campo; `null` não é convertido em Não. A política de defaults deve constar na matriz central.
- Texto de URL é campo aberto e pode ser copiado. Dropdown, radio, checkbox e multisseleção não recebem botão de cópia.
- O botão copia apenas o valor do campo, sem rótulo, status, numeração da UI ou transformação editorial. Prazo máximo e unidade permanecem separados para respeitar o tipo de controle.
- Dados vêm da sessão atual. Valores ilustrativos de `quickCopyFields`, inclusive lorem ipsum, não preenchem dados ausentes.
- Preservar cópia parcial, retorno à edição, fonte original, falhas de clipboard e alternativa manual. Retirar feedback antigo ao mudar texto, item, condição ou etapa.
- Mostrar cinco grupos correspondentes ao formulário e ajustar o layout, sem truncar campos para caber no frame antigo.

## RF03 — Prévia, CSV e tutorial

009 deve mapear todos os campos aplicáveis do v3 e compartilhar projeção/componente com a prévia embutida da 007. O tratamento de campos vazios da prévia deve ser explícito e pode diferir da tela de transferência.

010 deve estabelecer uma matriz oficial; as 22 linhas atuais são evidência inicial, não aceite automático. Documentar agregações, rótulos de enums, dados inativos, escaping, proteção contra fórmulas e preservação da fonte. Contar registros lógicos, não linhas físicas de valores multilinha.

011 deve incorporar a nova projeção da 012, adaptar conteúdo da etapa 4 e manter seis etapas. A correspondência com a plataforma externa exige fonte/data; documentação local não comprova nomenclatura ou operação externa atual. Identificar URL oficial, instruções verificadas e mídia ainda pendente.

## RF04 — Linguagem simples e orientações

A descrição inteira da 007 possui limite estrutural de 20 palavras significativas. A 008 aplica limite editorial de 20 palavras significativas por frase. Usar a mesma definição de tokens e exclusões; esclarecer que os efeitos são diferentes: erro estrutural pode bloquear CSV, sugestão editorial não.

Versionar artigos/preposições/contrações excluídos, Unicode, caixa, acentos, hífen, apóstrofo e exemplos de fronteira. O catálogo lexical determinístico não equivale a análise gramatical contextual completa.

O catálogo de termos burocráticos permanece proposto até aprovação explícita. Pares recebidos que mudam classe gramatical ou sentido precisam de instrução contextual; não apresentar todas as sugestões como sinônimos intercambiáveis. Registrar a decisão sem substituir silenciosamente os pares enviados.

Criar matriz campo × regra, copy dos estados e contrato de falha/inconclusivo. “Aprovado” deve significar apenas ausência de ocorrências no escopo efetivamente avaliado. Fechar checklist humano, quando é invalidado e como evidência manual participa do estado. Medição de linhas depende do layout e não deve produzir aprovação falsa por indisponibilidade.

006 deve mapear orientações aos campos da 007 e explicitar itens complementares. Recorrência não entra automaticamente no v3; decidir se permanece como orientação externa, se é removida ou se exige alteração deliberada do modelo. Conferir também tópico aberto versus seleção, prazo imediato e sistema de agendamento apenas online versus qualquer modalidade.

## RF05 — Ajuda, atendimento e navegação

015 usa o node compartilhado `425:201`, endereço GESED de fonte única e botão “Copie o e-mail”. Remover mailto de requisitos, tarefas, exemplos e testes ativos.

013–015 devem distinguir estado editorial do canal, disponibilidade da agenda e resultado de uma operação. E-mail atualmente ativo e atendimento pendente são configurações existentes, não prova de entrega operacional. Fechar comportamento de pausa e recuperação da 014, contrato de API, horário/fuso, notificações e decisões de operação antes de implementar dependências.

Definir a entrada compartilhada 014/015, transição do card ao calendário e acesso direto, evitando ação que apenas navega para a própria página sem avançar o estado. Preservar contrato compartilhado de rotas, query, hash, foco, histórico e 404.

## RF06 — Evidências e prontidão

Cada relatório deve separar: estado documental atual, decisões pendentes, código existente, testes executados e aceite funcional/visual. Problema corrigido recebe referência à correção; relatório histórico é preservado ou arquivado sem continuar sendo checklist ativo.

Ausência de um arquivo não prova, sozinha, bloqueio funcional. Confirmar o padrão de artefatos com `specs/README.md` e a constitution. Criar documentos faltantes ou justificar não aplicabilidade, sem inventar testes realizados.

## Critérios de aceite da consolidação

| ID | Critério verificável |
| --- | --- |
| AC01 | 007 e matriz central descrevem apenas v3 no contrato ativo. |
| AC02 | Campos, obrigatoriedade, condições e IDs são rastreáveis entre conteúdo e consumidores. |
| AC03 | 009/010/011/012 não instruem uso de paths removidos. |
| AC04 | 012 documenta os 25 campos de usuário, repetições e condições, com cópia apenas nos abertos preenchidos. |
| AC05 | 011, conteúdo planejado da etapa 4 e mapa Figma reconhecem a expansão da 012. |
| AC06 | CSV possui ordem/cardinalidade e testes coerentes com a matriz aprovada. |
| AC07 | 007/008 compartilham contagem significativa e distinguem bloqueio estrutural de revisão editorial. |
| AC08 | 006 tem destino para cada orientação e decisão explícita sobre recorrência. |
| AC09 | 015 não exige mailto no escopo ativo; 013–015 compartilham canais e transições. |
| AC10 | 014 identifica decisões fechadas e pendências localizadas, sem afirmar infraestrutura entregue. |
| AC11 | Navegação e referências visuais são coerentes, com consultas pendentes claramente identificadas. |
| AC12 | Todas as features têm estado documental atual e artefatos necessários ou justificativa de dispensa. |
| AC13 | Links locais, rastreabilidade e instruções de teste foram conferidos; nenhuma validação funcional é inventada. |
| AC14 | Existe ordem de implementação por dependência, com bloqueios delimitados por feature. |

Revisão T021 em 23/10/2026: AC14 atendido documentalmente pelo
[roteiro de implementação por dependência](roteiro-implementacao.md), com
classificação 001–017, gates locais, sete lotes, checks e primeira tarefa de
código. A [verificação T021](verificacoes/t021-roteiro-implementacao.md)
registra a evidência e os limites; o roteiro não representa implementação ou
aceite funcional.

## Conclusão deste trabalho

A consolidação termina quando as tarefas estiverem verificadas, os conflitos ativos forem encerrados e as dependências externas restantes estiverem explicitamente atribuídas. A prontidão pode ser liberada por feature; a indisponibilidade operacional da agenda não impede implementar páginas independentes cujo contrato já esteja fechado.

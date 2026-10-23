# Plan — Execução da consolidação documental

Data: 19 de outubro de 2026. Referências: [spec](spec.md) e [tarefas](tasks.md).

## Estratégia

Executar lotes pequenos e verificáveis, começando pela fonte central e propagando decisões aos consumidores. A auditoria anterior é o ponto de partida; cada tarefa confirma o estado atual antes de editar. Preservar mudanças existentes no workspace e não assumir que arquivos não relacionados pertencem ao trabalho.

Nesta rodada são criados apenas os três documentos de coordenação. As tarefas futuras podem corrigir documentos e conteúdo versionado quando expressamente incluído no lote; mudanças em motores, tipos, componentes, persistência e testes executáveis são encaminhadas à implementação da feature.

## Entregas e sequência

| Lote | Tarefas | Entrega | Dependência |
| --- | --- | --- | --- |
| A | T001–T002 | Inventário e regras de evidência | Nenhuma |
| B | T003–T006 | Matriz central, 007 v3, contagem e alinhamento 006 | A |
| C | T007–T011 | 008 e consumidores 009–012 alinhados | B |
| D | T012–T015 | Ajuda, canais, agenda e navegação coerentes | A; matriz para retornos ao formulário |
| E | T016–T018 | Visual, artefatos e deploy planejados | B–D |
| F | T019–T021 | Revalidação cruzada e ordem de implementação | A–E |

Cada tarefa deve atualizar o próprio status em `docs/tasks.md`, com evidência. Não marcar como implementado o que foi apenas especificado.

## Artefatos que serão corrigidos

| Área | Arquivos principais | Regra de atualização |
| --- | --- | --- |
| Modelo | `specs/007-*/modelo-central-carta.md` e quatro artefatos principais da 007 | Matriz única com paths reais, tipos, obrigatoriedade, condições e storage v3. |
| Conteúdo | `src/content/pages/formulario-carta.ts`, `organizar-informacoes.ts` | Corrigir copy/metadados aprovados sem alterar funcionalidade incidentalmente. |
| Linguagem | Seis documentos da 008 | Catálogo, mensagens, campo × regra, estados e testes especificados. |
| Prévia | Quatro artefatos e relatórios da 009 | Projeção v3 e compartilhamento com 007. |
| CSV | Quatro artefatos, quickstart e relatórios da 010 | Matriz completa e cardinalidade derivada. |
| Tutorial/cópia | Artefatos 011/012 e `src/content/tutorial/paraiba-digital.ts` | Todos os campos aplicáveis e cópia por tipo; seis etapas preservadas. |
| Ajuda | Artefatos 013–015, conteúdo de ajuda e fontes em `src/content/support` | E-mail copiável, estados únicos e transições explícitas. |
| Compartilhados | Contrato de navegação, mapa Figma, documentos da 016 | Nenhum router/provider ou componente concorrente nos exemplos. |
| Processo | `specs/README.md`, relatórios e quickstarts | Estado atual separado do histórico; comandos reproduzíveis. |
| Deploy | [Feature 017](../specs/017-deploy/spec.md) e ADRs pertinentes | Dois trilhos, decisões de ambiente, fallback SPA, testes publicados e dependências do backend registrados; implementação ainda futura. |

## Método para cada tarefa

1. Ler a tarefa, suas dependências e os documentos afetados.
2. Conferir alterações locais e evidências citadas; delimitar o lote.
3. Resolver decisões já autorizadas e identificar somente escolhas que mudam produto ou dependem da instituição.
4. Editar documentos e conteúdo previstos no lote, propagando a decisão a todos os artefatos ativos da área.
5. Conferir critérios, tarefas, exemplos, referências e consumidores imediatamente afetados.
6. Executar verificação proporcional e registrar resultado, limitações e próxima tarefa.

Se uma decisão necessária estiver aberta, registrar a pergunta concreta e o impacto. O restante independente pode avançar. Não chamar uma proposta de homologada por falta de resposta.

## Matriz central e projeções

A matriz canônica será mantida junto ao modelo central da 007. Não copiar regras inteiras em vários lugares: consumidores referenciam a matriz e documentam apenas transformações próprias.

009 apresenta dados; 010 agrega dados em linhas CSV; 012 apresenta controles de leitura e cópia por tipo. As quantidades de campos e de linhas CSV não precisam coincidir. Todas as projeções devem compartilhar condições de ativação, sem alterar valores de origem.

Para a 012, usar a tabela de 25 definições de `docs/spec.md` como ponto de partida, validando-a contra o formulário atual. Campos de coleções se repetem por ID estável. Não combinar campo aberto com seletor dentro de uma única ação de cópia. A expansão de conteúdo deve chegar simultaneamente à 011, à 012, ao conteúdo da etapa 4 e ao mapa Figma.

## Decisões já estabelecidas

- Carta v3 é a fonte central.
- Descrição: até 20 palavras significativas no campo inteiro; regra editorial: até 20 por frase.
- Artigos, preposições e contrações catalogados são excluídos da contagem.
- 012 apresenta todos os campos aplicáveis; somente campos abertos preenchidos têm cópia habilitada.
- 012 é parte da etapa 4 da 011, node `564:980`.
- Dados condicionais inativos permanecem fora das projeções, mesmo se retidos na sessão.
- 015 copia somente o endereço GESED, sem mailto.
- Conteúdo determina os textos e o layout se adapta a ele.

## Decisões a fechar durante as tarefas

| Decisão | Tarefa | Informação necessária |
| --- | --- | --- |
| Regras estruturais ainda incompletas | T003–T004 | Obrigatoriedade, prazo, listas, defaults e URLs documentados por campo. |
| Destino de recorrência e divergências da 006 | T006 | Escolha de produto sem ampliação implícita da Carta. |
| Catálogo e mensagens da 008 | T007 | Aceite explícito e orientação contextual para pares ambíguos. |
| Parágrafo e resultado inconclusivo | T007 | Medição, zoom, campo oculto, checklist e estados sem falso sucesso. |
| Contrato final CSV | T009 | Agregações e representação do v3, incluindo enums. |
| Plataforma externa | T011 | URL/fonte/data, correspondência e instruções verificadas. |
| Entrada compartilhada e canal pausado | T013 | Transição ao calendário, acesso direto e ações disponíveis. |
| API e operação da agenda | T014 | Horário/fuso, pausa, recuperação, infraestrutura e responsáveis. |
| Padrão de artefatos e deploy | T002/T017/T018 | Aplicabilidade, ambiente e evidências exigidas. |

## Verificação

Para Markdown: `git diff --check`, links relativos, IDs de requisitos/tarefas e comparação entre spec/plan/tasks/implementation-plan. Buscas por `identificacao.`, `requisitos.`, `informacoesComplementares`, `orientacaoAgendamento`, `version: 2`, cinco obrigatórios e mailto são indicadores de revisão; ocorrências históricas corretamente delimitadas são permitidas.

Para conteúdo TypeScript alterado: executar typecheck e testes pertinentes já disponíveis. Build é necessário quando a alteração afeta imports/consumidores da aplicação. Não criar testes artificiais para provar apenas que um texto foi copiado; priorizar cobertura de mapeamentos e semântica quando houver implementação.

Verificação visual exige consulta efetiva ao Figma e posteriormente navegador. Não transformar link de node em evidência de inspeção. Verificação funcional usa dados sintéticos e registra ambiente, comandos e resultado; testes ainda não executados permanecem previstos.

## Riscos e tratamento

| Risco | Tratamento |
| --- | --- |
| Perder requisitos úteis ao remover v2 | Migrar comportamento válido para v3 e arquivar somente estrutura obsoleta. |
| “Todos os campos” expor valores inativos | Matriz única de aplicabilidade e casos de troca/restauração. |
| Carta parcial virar exemplo fictício no tutorial | Separar metadados editoriais de dados reais da sessão. |
| Mudança editorial exigir código fora do lote | Registrar incompatibilidade e encaminhar à implementação, sem declarar prontidão funcional. |
| Parecer que todos os problemas antigos continuam abertos | Estado atual por ID com evidência de fechamento e histórico datado. |
| Decisão operacional da 014 bloquear todo o projeto | Delimitar dependência; liberar features independentes com contrato pronto. |

## Saída para implementação

Após T021, emitir lista por feature: pronta documentalmente; pronta com dependência explicitada; bloqueada por decisão identificada. A ordem sugerida será fundação/navegação, páginas e diagnóstico, modelo/provider da Carta, validação e projeções, tutorial/cópia, ajuda e agenda. A acessibilidade acompanha cada entrega; deploy é preparado antes do teste publicado.

Concluir documentos não conclui features. Cada implementação posterior executa seu plano, testes e comparação visual próprios.

### Publicação T021 — 23/10/2026

A saída foi consolidada no
[roteiro de implementação por dependência](roteiro-implementacao.md). O roteiro
classifica as 17 features, define gates e lotes, integra acessibilidade e deploy
e libera como primeira tarefa de código a 002/T007, sem executá-la. A evidência
de fechamento está na [verificação T021](verificacoes/t021-roteiro-implementacao.md).

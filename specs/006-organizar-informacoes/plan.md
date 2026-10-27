# Plan: Organizar informações

Reconciliado em 19/10/2026 pela T006. [Histórico anterior](historico/2026-10-19-pre-t006-plan.md).
Planejamento, não evidência de implementação.

## Contratos

Seguir [spec](spec.md), [orientações v3](contrato-orientacoes-v3.md),
[matriz da Carta](../007-formulario-carta-servico/matriz-campos-v3.md) e
[navegação compartilhada](../../docs/arquitetura/contrato-navegacao.md).
Reutilizar PreparationTopicId, PreparationInformationId, PreparationInformation
e organizeInformationPageContent já existentes; não recriar o conteúdo com
o esquema antigo. Ordem: 7 + 2 + 4 informações nos três tópicos.

## Arquitetura

Separar conteúdo, estado de preparação e apresentação. Estado mínimo:
IDs conhecidos marcados e IDs expandidos; atualização imutável/idempotente.
Contagem deriva das marcas; denominador do catálogo. Escopo de memória acima
das páginas permite ida/volta interna sem remontar as marcações, mas não vincula
a preparação ao provider da Carta. Recarga/nova aba começam em zero.
Não criar persistência/API por conveniência.

A 006 não importa hooks/storage de domínio da Carta. A 007 pode importar conteúdo
editorial compartilhado e o mapa de orientação por controle, não o estado da 006.
Complementos são dados versionados, não textos divergentes em componentes.
Recorrência permanece sem destino de campo; Ativo não recebe tópico novo e usa
a semântica fechada na 007. Prazo imediato não integra o v3 e nunca é convertido.

## Interface e navegação

Compor breadcrumb, PageHeader, preparação/progresso, navegação por tópicos,
informações com marcação/expansão e próximos passos. Reutilizar AppLink/ButtonLink,
foco/título/rolagem do shell. Preservar href, modificadores, nova aba, histórico
e fragmentos; não escrever diretamente no history da página.
Tópicos internos podem apontar para regiões identificadas, sem guardar marcas na URL.

Usar controles nativos ou equivalentes acessíveis: checkbox com label, botão
de expansão com aria-expanded/aria-controls, conteúdo associado, sem botões
aninhados. Expansão não desloca foco. Estado visual/DOM mantém a ordem canônica.
Progressão textual e anúncio discreto; cores não substituem nomes/estado.
Inter e tokens existentes; estilos com escopo local e altura natural.
Consultar node 387:1918 e Make antes de fechar medidas, assets e composição.

## Arquivos e sequência futura

| Arquivo/área | Trabalho previsto |
| --- | --- |
| src/content/pages/organizar-informacoes.ts | Aplicar redações do contrato e complementos, preservando 13 IDs. |
| src/pages/OrganizarInformacoesPage.tsx | Compor preparação interativa no lugar do placeholder, após conferir estado real. |
| Estado de preparação compartilhado | Implementar módulo isolado em memória; localização definida na etapa técnica. |
| Formulário 007 | Consumir mapa de orientações; não copiar conteúdo ou estado de preparação. |
| Shell/links | Reutilizar entrega da 002; correções transversais no dono, não router paralelo. |
| Estilos/assets/mapa visual | Atualizar somente com evidência visual. |
| quickstart/validation/verification | Roteiro e resultados atuais conforme padrão documental; não reescrever evidência histórica. |

Primeiro confirmar dependências e revisar conteúdo; depois entregar estado,
composição, navegação, reuso e estilos; por fim testes e relatórios.
Sem alteração de tipos/schema/CSV da Carta pela 006.

## Verificação e riscos

CA01–CA16 guiam a matriz no [plano detalhado](implementation-plan.md).
Testar transições de marcação, estado em memória, expansão, independência da Carta,
destinos reais e retorno por histórico; não apenas reproduzir o array num teste.
Build/typecheck somente na implementação. Frame não consultado, ERS, homologação,
aplicação das decisões de prazo, Ativo, agendamento e componentes compartilhados são pendências explícitas,
não aprovações implícitas. T006 fecha o alinhamento documental, não prontidão integral.

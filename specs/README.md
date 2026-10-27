# Specs

Cada pasta em `specs/` representa uma funcionalidade ou etapa relevante do produto.

## Convenção documental vigente — 19/10/2026

Esta é a referência do projeto para aplicabilidade dos artefatos e registro de evidências, em conjunto com a [constitution](../docs/processo/constitution.md). Os documentos são produzidos ao longo da jornada; uma feature recém-criada não precisa conter evidências de implementação futura.

| Artefato | Quando é exigido | Conteúdo mínimo |
| --- | --- | --- |
| `spec.md` | Toda feature, desde sua definição. | Objetivo, escopo, requisitos, decisões, dependências e critérios de aceite. |
| `plan.md` | Antes da implementação. | Abordagem, contratos, arquivos afetados, riscos e estratégia de verificação. |
| `tasks.md` | Antes da implementação. | Tarefas identificadas, dependências, escopo e aceite verificável. |
| `implementation-plan.md` | Antes de implementação visual ou complexa, incluindo múltiplos contratos técnicos. | Detalhamento suficiente para executar, fontes reais, exemplos atuais e verificações. |
| `quickstart.md` | Antes da verificação integrada/entrega; pode ser preparado durante o planejamento. | Pré-condições, comandos existentes, dados sintéticos, passos, resultados esperados e limitações. |
| `validation.md` | Ao executar validação documental e antes de liberar implementação dependente dos contratos. | Parecer atual sobre consistência e prontidão documental, com fontes e pendências. |
| `verification.md` | Ao registrar entrega parcial ou execução de verificações; na entrega final. | O que existe, o que foi efetivamente verificado, resultados e o que permanece não executado. |

Uma feature sem interface ainda exige planejamento e validação dos seus contratos. Seu quickstart pode ser um roteiro de API, teste de domínio ou comando; verificação visual pode ser `não aplicável` com justificativa.

Para uma mudança pequena e simples, o plano detalhado pode ser dispensado se `plan.md` contiver tudo que é necessário. Registrar ali: artefato dispensado, escopo, motivo, documento que cobre seu conteúdo, data e responsável pelo registro. A ausência do arquivo sozinha não é dispensa. Fundação técnica não recebe dispensa automática: avaliar o escopo, inclusive shell, rotas e contratos compartilhados. Uma revisão exclusivamente editorial de feature existente pode usar os artefatos atuais, registrando o lote e seus checks sem abrir uma nova feature.

## Estados independentes

| Dimensão | Valores | Evidência necessária |
| --- | --- | --- |
| Prontidão documental | Em elaboração; requer ajustes; pronta com dependências delimitadas; pronta. | `validation.md` identifica contratos vigentes e pendências por entrega afetada. |
| Implementação | Não iniciada; parcial; concluída no escopo. | Arquivos/commit ou estado local e tarefas entregues em `verification.md`. |
| Aceite funcional | Não executado; parcial; aprovado; reprovado. | Cenários executados, ambiente e resultado por critério aplicável. |
| Aceite visual/acessibilidade | Não executado; parcial; aprovado; reprovado; não aplicável. | Inspeções/testes efetivos ou justificativa de não aplicabilidade. |

Documento pronto não significa código concluído; build bem-sucedido não comprova jornada, fidelidade visual ou homologação editorial. Uma dependência aberta deve indicar quais tarefas bloqueia e quais podem seguir. A ausência de confirmação não constitui aprovação.

## Parecer de validação atual

`validation.md` começa com o estado atual e contém:

1. Data, autor/responsável pelo registro e base examinada: commit e alterações locais relevantes.
2. Escopo: artefatos, versão de modelo/conteúdo e critérios avaliados.
3. Fontes efetivamente consultadas, com caminho/node/versão quando disponíveis; fontes não acessadas ficam explícitas.
4. Resultado documental e tarefas liberadas ou bloqueadas.
5. Tabela de achados: ID estável, classificação/impacto, evidência localizada, correção/decisão, tarefa de destino, responsável quando conhecido e estado.
6. Achados encerrados: data, alteração ou decisão que os resolveu e evidência de conferência.
7. Próxima ação e links para histórico/verificação funcional, quando existirem.

Estados de achado: aberto, em correção, resolvido documentalmente, aguardando decisão/fonte ou superado por mudança de escopo. Não reutilizar IDs para problemas diferentes. Alterar contrato exige reavaliar os critérios afetados; um parecer antigo não é aprovação da nova versão. Não atribuir revisão institucional a uma pessoa que não a realizou.

## Registro de verificação

`verification.md` registra data/base, escopo entregue, arquivos alterados, ambiente, comando ou procedimento, resultado observado, evidência por critério, defeito/reteste e pendências. Distinguir checks documentais de testes executáveis e de inspeção visual. Um resultado esperado pertence ao roteiro; só um resultado observado pode ser declarado como execução. Quando apenas houver preparação documental, registrar explicitamente que não houve aceite funcional.

## Histórico e instruções vigentes

Specs, planos e tarefas ativos devem conter apenas contratos vigentes. Migrar requisitos ainda válidos antes de retirar exemplos obsoletos. Preservar relatórios e decisões anteriores em `specs/<feature>/historico/AAAA-MM-DD-<artefato>.md`, usando sufixo quando necessário, com indicação de que não orientam a implementação atual. Atualizar links locais ao mover um documento.

Alternativamente, um registro curto pode ficar ao final do relatório em seção `Histórico — não vigente`, com data e indicação do contrato sucessor. Snippets incompatíveis e tarefas antigas extensas devem ir ao arquivo histórico, não ao corpo do plano ativo.

Preservar texto e contexto da evidência anterior; uma nova nota explica sua superação sem reescrever o passado. O relatório atual referencia o histórico e explica quais achados foram encerrados, continuam abertos ou perderam aplicabilidade. Esta convenção não move arquivos automaticamente: a reconciliação de cada feature faz essa migração com seus links.

## Implementation Plan

O `implementation-plan.md` deve ser criado antes de `/spec:implementar` para funcionalidades visuais ou complexas.

Ele deve reunir contexto, referencias do Figma Design e Figma Make, arquivos afetados, contratos de componentes, codigo base em React/TypeScript/CSS, regras de implementacao e validacoes.

Mais detalhes em [`docs/implementation-plan.md`](../docs/implementation-plan.md).

## Ordem inicial

1. `001-fundacao-do-projeto`
2. `002-home-e-navegacao`
3. `003-explorar-por-etapas`
4. `004-o-que-e-carta-servico`
5. `005-diagnostico-servico-publico`
6. `006-organizar-informacoes`
7. `007-formulario-carta-servico`
8. `008-validacao-linguagem-simples`
9. `009-previa-html`
10. `010-exportacao-csv`
11. `011-tutorial-paraiba-digital`
12. `012-copia-dados-tutorial`
13. `013-fluxo-de-ajuda`
14. `014-atendimento-agendado`
15. `015-suporte-email`
16. `016-responsividade-acessibilidade`
17. `017-deploy`

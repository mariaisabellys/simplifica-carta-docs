# Plano de implementação: Tutorial Paraíba Digital

20/10/2026 — revisão documental T011. Substitui os snippets e seletores antigos,
preservados no [histórico](historico/2026-10-20-pre-t011-implementation-plan.md).
Não copiar código-base histórico para implementação v3.

## Base normativa

[Spec CA01–CA20](spec.md), [plano](plan.md), [contrato de integração v3](contrato-integracao-v3.md),
[matriz 007](../007-formulario-carta-servico/matriz-campos-v3.md),
[transferência 012](../012-copia-dados-tutorial/contrato-transferencia-v3.md)
e [navegação](../../docs/arquitetura/contrato-navegacao.md).

## Contratos antes do código

- Consumir tipos/catálogos da 007 e projeção readonly da 012, sem redeclarar
  união legada ou manter lista de 17 campos. Matriz externa tem 25 linhas.
- Conteúdo editorial referencia IDs estáveis e grupos da projeção; não contém
  snapshots da Carta. Modelo de produção não recebe fontes/hrefs/datas falsos.
- Fonte editorial é tutorialParaibaDigitalContent; export tutorialParaibaDigital
  existente é a lista de etapas. Conferir consumidores antes de alterar formato.
- 011 não importa página da 012 e 012 não depende do conteúdo de página da 011:
  compartilhar contratos neutros, sem ciclo.
- Cinco grupos sempre representados; 13 definições abertas copiáveis, 12
  escolhas apenas informativas; coleções por item/ID e K/S/ON/E conforme 012.
- Estado raiz vazio, recuperação, carregamento e falha são distintos. Default
  Ativo não prova preenchimento nem publicação. Nenhum gate global de validação.

## Arquivos e ordem futura

| Ordem | Área / arquivo proposto | Responsabilidade / aceite |
| --- | --- | --- |
| 1 | src/content/tutorial/paraiba-digital.ts | Concluído em 27/10/2026: conteúdo 25/13/12 sem valores de fallback; outras cinco etapas preservadas; IT11 ainda requer composição |
| 2 | Contratos neutros / projeção da 012 | Integração com tipos reais da 007; não criar modelo no tutorial; IT02/03 |
| 3 | src/pages/TutorialParaibaDigitalPage.tsx | Uma etapa por URL, shell/breadcrumb, editorial independente da Carta; IT01/04 |
| 4 | Componentes tutorial de progresso/etapa/navegação | IDs estáveis, instruções/fontes e CTAs; IT04/09/10 |
| 5 | Adaptador da região de dados e boundary restrito | Montar 012 só na etapa 4, fallback tutorial-dados e CTA único; IT05–08 |
| 6 | Registro de alvos relacionado à projeção | Somente alvos existentes, retorno autorizado à 007; IT05/06 |
| 7 | Assets locais e estilos/tokens | Fonte/autorização/alt; layout adaptável, Inter; IT08/10 |
| 8 | Testes integrados e verification.md | Executar IT01–IT11 e checks; relatar pendências, sem dados reais |

Nomes de componentes/arquivos novos são propostas, não inventário de entrega.
A infraestrutura real de sessão/clipboard/navegação deve ser conferida antes
da implementação. Não afirmar ausência de utilitário só por falta de composição.

## Página e variantes

Uma rota, node principal 564:635. Variantes 564:730, 564:852, 564:980,
564:1232 e 564:1357 correspondem às etapas 2–6.
Consultar os links do [mapa](../../docs/design-system/mapa-figma-telas.md)
e Make dVm7lEZdBFqOiiySWLWUqp, node 0:1 antes da implementação visual.
Essa consulta não foi feita na T011. Expandir 564:980 para todos os grupos,
textos longos, listas e estados; sem altura fixa/corte para caber no frame.
Figma não sobrescreve conteúdo nem valida a plataforma oficial.

## Navegação e foco

Reusar NavigationProvider/useAppLocation/useAppNavigate/AppLink previstos no
contrato compartilhado. Query etapa inválida/ausente/duplicada normaliza por
replaceState; preservar desconhecidos; ações de troca criam histórico conforme
contrato. Popstate/recarga restauram etapa, sem progresso persistido.

Âncoras são tutorial-carta- mais identidade definida pela 012. Nunca derivar de
texto ou índice; campos missing ativos têm destino, inativos não.
Fallback tutorial-dados só na etapa 4; nas outras, título da etapa. Boundary
preserva esse único heading se a região falhar. Não duplicar alvos em adapters.
Coordenar foco de hash, etapa e shell, sem deslocar foco por atualizações da Carta.
Sticky offset real e scroll-margin, respeitando reduced-motion.

Editar abre parte/campo pelo registro autorizado da 007; item removido → grupo,
campo inativo → condição. Retorno lê valores atuais, não snapshot editorial.
Não implementar retorno com dados sensíveis na URL.

## Continuidade das operações

011 desmonta UI da 012 ao sair da etapa 4; coordenador acima das rotas conserva
trava de operação pendente. Ignorar resultado de revisão/geração antiga,
inclusive editar A/B/A, ocultar/reativar, remover/reordenar e retornar.
Não recriar operações ao montar, limpar clipboard ou prometer cancelamento.
Falha mantém alternativa manual e instruções; sucesso só confirma cópia.

## Fontes, testes e liberação

O contrato de integração contém matriz externa de 25 paths, registro de fontes
e IT01–IT11 com CA01–CA20. Preencher evidência por instrução/campo/asset antes
de aprovar tutorial operacional. ERS, URL administrativa, Design/Make e revisão
institucional continuam pendentes. Preservar seis etapas durante migração do
conteúdo; qualquer correção operacional posterior precisa fonte e diff próprio.

Após implementar, executar suíte/typecheck/build e browser/assistivos conforme
plan.md; registrar comandos/resultados e falhas, sem tratar contagem de cards
como prova de fluxo externo. Nenhum cadastro, envio, conta ou credencial real.

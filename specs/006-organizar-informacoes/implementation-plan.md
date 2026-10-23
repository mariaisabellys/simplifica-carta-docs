# Implementation Plan: Organizar informações

Reconciliado em 19/10/2026 pela T006 documental.
[Plano anterior e snippets superados](historico/2026-10-19-pre-t006-implementation-plan.md).
Os exemplos antigos de lista estática não orientam a implementação atual.

## Base e estado

Consultados documentos ativos da 006, conteúdo das páginas 006/007, matriz v3,
modelo central, contrato de contagem, navegação compartilhada e mapa Figma local.
Nenhuma consulta externa ao Figma, ERS PDF, build ou teste funcional nesta rodada.
A implementação futura deve seguir [spec](spec.md), [plan](plan.md) e
[contrato de orientações](contrato-orientacoes-v3.md), que detalha o mapa 13 → 24
e os textos de substituição. O TypeScript continua pendente de atualização.

O mapa identifica Design YaVUdqYa3boHpvGrxf4ZJ5, node 387:1918; Make
dVm7lEZdBFqOiiySWLWUqp, node 0:1 permanece fonte a consultar.
575:483 é entrada da 003. Registrar composição, medidas/tokens, estados,
assets e adaptação responsiva após consulta real, sem inventar fidelidade visual.

## Contrato de conteúdo e reuso

Reutilizar tipos e objeto existentes em organizar-informacoes.ts, incluindo
howToIdentify, avoid, prefer, example, additionalGuidance e tips.
Não substituir o catálogo por dez assuntos nem reinserir canais genéricos.
As três seções agrupam 7/2/4 itens; os IDs, não índices ou títulos, são as chaves.
Usar o mapa de destinos do contrato para a 007; documentos/etapas identificados
por IDs estáveis, conforme seu modelo. Ativo sem orientação; recorrência sem campo.
F006-03 aplica redação futura antes da renderização, mantendo fonte única.
A revisão de orientação não cria regras de validação em runtime.

## Estado e transições

| Evento | Marcações | Expansão | Carta |
| --- | --- | --- | --- |
| Iniciar aplicação | Conjunto vazio, 0/13 | Estado inicial fechado para detalhes, resumo visível | Não acessar |
| Marcar ID conhecido | Adicionar uma vez | Preservar | Não acessar |
| Desmarcar ID | Remover se presente | Preservar | Não acessar |
| ID desconhecido | Ignorar, sem alterar denominador | Não criar item | Não acessar |
| Expandir/recolher | Preservar | Alterar apenas o ID acionado | Não acessar |
| Navegar internamente/voltar | Preservar memória isolada | Pode reiniciar ao montar a página | Não acessar |
| Recarregar/nova aba | Reiniciar zero | Reiniciar | Recuperação pertence exclusivamente à 007 |

Estado de preparação em um módulo/provider separado acima das rotas, sem
importar storage/reducer da Carta. Usar conjunto imutável ou estrutura equivalente;
não mutar Set e reutilizar a mesma referência em React. Derivar contagem, nunca
manter contador independente suscetível a divergência. Total = information.length.
Não inicializar marcas com progressExample ou dados preenchidos.
Sem persistência, diagnóstico, API ou parâmetros de URL para marcas.

## Composição, links e acessibilidade

PageHeader recebe título/subtítulo atuais. Breadcrumb, tópicos, progresso,
lista com marcação e expansão, próximos passos ficam dentro do main do shell.
As informações são acessíveis sem marcar; resumo e controles sempre identificados.
Associação única de label/checkbox e botão/painel; não colocar checkbox dentro
do botão de expansão. Enter/Espaço operam controles nativos; foco permanece no
acionador ao expandir/recolher, com aria-expanded atualizado.
Progresso anunciado de forma discreta e textual, sem anunciar conclusão da Carta.

AppLink/ButtonLink e breadcrumb seguem a navegação compartilhada, sem handler
local de pushState. Shell controla título/foco/scroll; mudanças de marcação
não fazem navegação nem deslocam foco. /formulario-carta e /ajuda sempre livres.
Se componentes comuns não estiverem entregues, registrar dependência na 002/T015
global em vez de copiar antigas APIs incompatíveis.

CSS com escopo de página; Inter/tokens existentes, altura natural, quebra de
textos e ordem DOM/visual coerente. Não usar CSS columns/order para alterar a
sequência. Uma coluna em telas estreitas quando necessário. Definir medidas e
assets somente após consulta visual; contraste/foco medidos, não presumidos.

## Verificações futuras por aceite

| Critérios | Procedimento e resultado esperado |
| --- | --- |
| CA01–02 | URL direta/recarga e entrada da 003 sem dados prévios; conteúdo correto. Fallback publicado depende da 017. |
| CA03–04 | Conferir 3 tópicos, 13 IDs, ordem, exemplos e diferença entre desconhecido/dispensado. |
| CA05/CA07 | Formulário e ajuda acessíveis em 0/13 e 13/13, com links e histórico reais. |
| CA06/CA10 | Carta sintética antes/depois idêntica; 006 sem imports/efeitos de domínio da Carta ou API. Repetir sem storage. |
| CA08–09 | Teclado/leitor, foco, anúncio, nomes, contraste e larguras/zoom conforme F006-12 e 016. |
| CA11 | Nenhuma mensagem de aprovação/publicação; 13 marcas não ativam conclusão na 007. |
| CA12 | Comparação com fontes efetivamente consultadas; divergências e adaptações documentadas. |
| CA13–14 | 0 → marcar A/B → 2 → repetir B → 2 → retirar A → 1; expansão não muda; navegação preserva; recarga zera. |
| CA15–16 | 24 campos mapeados; tópico texto; descrição <=20 significativas; público contextual; S/E; ressalvas de imediato/recorrência. |

Testar Chrome/Edge+NVDA, Firefox, Safari/VoiceOver e dispositivos móveis conforme
ambientes disponíveis da 016, registrando versão, ausência e limitações.
Executar npm run typecheck, npm run build e suíte existente após código;
não instalar framework apenas para comparar listas. Retestar componentes comuns.
Registrar evidência, defeito/reteste e critérios não executados; preparar quickstart
antes da entrega integrada. Relatórios anteriores não são aceite desta versão.

## Pendências delimitadas

- F006-03: aplicar conteúdo alinhado e complementos; não concluído por esta rodada.
- MC-03: definição de prazo imediato/zero/decimal/sem estimativa, decisão do produto.
  A orientação com ressalva pode ser preparada; validação semântica depende disso.
- MC-05: significado/ajuda de Ativo; não inventar orientação por analogia.
- Caso presencial sem sistema representável: confirmar necessidade de mudança
  deliberada do v3 com o produto; manter S/E e não inventar escolha.
- Consulta Design/Make, confronto ERS e revisão institucional (responsável/data).
- Entrega de navegação/formulário e entradas/destinos reais; fallback publicado.
- Testes funcionais, visuais e assistivos ainda não executados.

A T006 fecha a reconciliação documental e o contrato de progresso; não declara
essas pendências resolvidas nem autoriza implementação fora do pedido.

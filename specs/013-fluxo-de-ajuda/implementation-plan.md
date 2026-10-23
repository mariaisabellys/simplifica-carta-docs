# Implementation Plan: Fluxo de ajuda

> **Integracao visual atualizada em 16 de outubro de 2026:** a escolha de
> canais pertence ao node `425:201`; a FAQ permanece `169:495`.

## Objetivo e status

Preparado em 2026-10-05 para `/spec:plano-implementacao 013-fluxo-de-ajuda`.
O comando recebido como `/spec:plano-implentacao` corresponde ao comando
interno da constitution.

Substituir o placeholder de `/ajuda` por consulta orientativa com FAQ,
encaminhamento aos dois canais e retorno explicito ao formulario. A pagina
funciona independentemente de Carta, diagnostico, CSV, login ou backend.

**Plano tecnico documental pendente de consulta Figma, conferencia do PDF
do ERS, validacao editorial e confirmacao dos canais reais 014/015.** Nao
declara canais ativos, layout confirmado ou criterios de aceite aprovados.
Esta etapa cria somente este documento; nao altera src, instala bibliotecas,
marca tarefas, envia mensagens ou registra solicitacoes.

Atualizacao em 2026-10-05 por `/spec:implementar`: entregue apenas o mapa de
destinos e tipos compartilhados em src/content/support/canais.ts. O inventario
abaixo registra a preparacao anterior. Configuracao de estados/copy, consumidores
e interface continuam pendentes; evidencias atuais em verification.md.

> Revisão T013: exemplos antigos de perguntas/cards/código foram removidos
> da base ativa e preservados em historico/2026-10-20-pre-t013-implementation-plan.md.
> Usar conteúdo existente e contrato compartilhado, não reconstruir as fontes.

## Fontes efetivamente consultadas

- Spec, plan e tasks da 013, lidos nesta etapa.
- Plano detalhado da 002: navegacao e destino `/ajuda#duvidas-frequentes`.
- Plano detalhado da 007: provider acima das rotas e preservacao da Carta;
  planos detalhados 009–012 consultados nesta conversa para FAQ de revisao,
  exportacao, tutorial e copia, incluindo revisao documental da 012.
- Plans 014/015, especialmente destino de atendimento, disponibilidade e
  fonte compartilhada de contato/estado editorial; plano 016 consultado na
  conversa para acessibilidade/reflow.
- README/manual textual, MVP/fluxos/arquitetura, constitution, regras para IA
  e estrategia de implementation-plan, consultados nas etapas anteriores.
- ADR-003, mapa Figma, AjudaPage, paginas de canais, routes, App, ButtonLink,
  estilos sticky/foco e inventario/package.json das etapas desta conversa.

PDF ERS nao extraido/validado; manual textual nao equivale a leitura desse
PDF. Figma nao consultado via MCP: nenhuma ferramenta Figma exposta nesta
sessao. Nenhum canal foi verificado operacionalmente, nenhuma FAQ validada
pela equipe e nenhum teste de interface/build executado.

## Inventario real e dependencias

| Area | Estado atual | Pre-condicao futura |
| --- | --- | --- |
| Rota /ajuda | specId 013, node 169:495, layout support | Preservar identidade; confirmar associacao visual |
| AjudaPage | PageHeader e dois PlaceholderCards, sem acoes | FAQ e apoio por estado; entrada de canais em 014/015 |
| FAQ/hash | FAQ e ancora ausentes em src | Efetivar duvidas-frequentes pelo contrato 002 |
| Canais | Rotas existem, paginas placeholder | Entrega 014/015 e evidencia separada dos links |
| Contato | Placeholder 015 menciona endereco nao validado | Fonte unica validada da 015; nao duplicar na ajuda |
| Navegacao | App trata pathname, ButtonLink pode recarregar | Hash/foco/historico e links internos 002/003 |
| Sessao | Provider v2 planejado na 007, ainda ausente | Montagem acima das rotas para continuidade |
| Breadcrumb | Ainda sem componente pronto em src | Reusar contrato compartilhado, sem shell duplicado |
| Tests | Sem suite configurada | Reusar suite compartilhada; verificacoes manuais adequadas |

Specs 014–016 existem; notas historicas de ausencia nao significam ausencia
documental atual. Placeholder, URL ou tipo de atendimento nao provam operacao.
AjudaPage nao importa Carta/diagnostico/provider/storage nem recebe seus dados
como props. Preservacao decorre da navegacao e provider acima das rotas.

## Referencias visuais e assets

| Fonte | Consulta necessaria | Evidencia atual |
| --- | --- | --- |
| Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2, node 169:495 | FAQ e seção de apoio; canais usam 425:201 | Referencia local FAQ, sem consulta MCP |
| Make dVm7lEZdBFqOiiySWLWUqp, node 0:1 | Tokens/cards/links/expansao/foco/estados/reflow | Resumo local, sem consulta direta |

Confirmar ordem das regioes, perguntas abertas/fechadas, canais, pausas,
composicao responsiva e medidas/tokens. Node FAQ nao representa formularios
de 014/015. Atualizar mapa somente com evidencia; nao inserir agenda/formulario
para preencher lacuna do prototipo. CSS abaixo e proposta semantica.

Inventario de assets novos: vazio. Icones, se necessarios e confirmados,
reusar sistema existente com aria-hidden para decoracao. Nao gerar imagens
ou exportar URLs temporarias do Figma por antecipacao. Texto identifica todas
as acoes, mesmo sem icone. Inter/fallbacks seguem decisao local do projeto.

## FAQ, conteúdo e fontes

Usar src/content/pages/ajuda.ts: quatro perguntas, tagline, introdução e CTA
superior para #precisa-de-apoio. Não acrescentar cards ou perguntas.
Título/CTA da seção de apoio migram conforme estado do atendimento; conteúdo
atual ainda tem Agendar visita fixo. A revisão é documental, não implementação.

## Estados e composição compartilhada

O [contrato compartilhado de canais](../../docs/arquitetura/contrato-canais-ajuda.md) define a matriz de estados, rótulos e transições,
incluindo endereço de referência sem ação em não ativo e ambos indisponíveis.
supportChannels/supportDestinations e supportContacts já existem. Atendimento
pendente, e-mail ativo editorialmente; não afirmar que ambos estão pendentes
ou que configuração de canais está ausente.

Não criar novo mapa local ou resolver divergência com fallback ativo.
helpChannelsContent alimenta composição 425:201 somente na entrada 014/015.
A página FAQ não importa controlador clipboard nem formulário de atendimento.

## Contrato de implementação e testes

Substituir antigos exemplos TS/JSX por consumo dos objetos reais; não copiar
snippets históricos que colocam canais dentro da FAQ. Resolvedor compartilhado
de apresentação deve usar canal/estado/contexto para título/aviso/ação.
Botão interno da 014 muda entrada → calendário; entrada 015 navega à rota 014.
CTA da FAQ apenas navega à entrada, mesmo se indisponível, pois destino explica.
Nenhum link circular para abrir calendário, href # ou botão inerte.

Testar CJ01–CJ12 do contrato e manter critérios CA01–CA14 da spec. Falhas de
rede/agenda vazia não alteram estado editorial. Retornos não leem Carta.
Pausa sobre POST incerto/recuperação é dependência da T014; não apagar tentativa.
Integração deve coordenar foco com shell, sem novas queries ou dados na URL.

## Ancora, navegacao e continuidade

Implementar exatamente `/ajuda#duvidas-frequentes`, conforme 002. Foco no
section tabindex=-1 identificado, sem exigir abrir respostas. Fragmento e
ID tecnico fixo; nao construir seletor CSS com hash arbitrario do usuario.
Resolver IDs conhecidos via getElementById ou helper compartilhado seguro.

- NavigationProvider trata pathname/search/hash e eventos; shell monta rota antes
  de focar/rolar. Na mesma rota com novo hash, nao descartar navegacao nem
  aplicar scrollTo(0) depois de rolar para FAQ.
- Acesso direto/recarga/voltar/avancar respeitam hash sem novo pushState.
  Preservar history.state existente em navegacao; titulo de documento e foco
  de rota seguem contrato 002. Nao criar listeners globais concorrentes.
- Links reais preservam modificadores/clique central/target; interceptar apenas
  navegacao interna primaria sem modificador para preservar memoria da Carta.
- Header sticky tem altura variavel com texto/zoom/fonte. Usar offset medido
  do shell (por ResizeObserver ou equivalente), nao constante presumida.
- Retorno fixo ao formulario funciona em acesso direto sem history.back e
  nao precisa ler dados para escolher rotulo. FAQ continua sem provider local.

Providers de Carta/diagnostico ficam acima das rotas e nao recebem key por
pathname que reinicialize estado. A 013 nao muda respostas/valores, storage
ou payload de canais. Nenhum valor pessoal em URL/query/hash/mailto, nenhum
handler de envio na entrada. Recuperacao de sessao continua propriedade 007.

## CSS e acessibilidade propostos

```css
/* globals.css; tokens/medidas/composicao finais apos consulta Design/Make */
.help-faq { display: grid; gap: var(--space-3); min-inline-size: 0;
  scroll-margin-block-start: calc(var(--sticky-header-offset, 0px) + var(--space-4)); }
.help-faq-item { border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md); padding: var(--space-4); min-inline-size: 0; }
.help-faq-item summary { cursor: pointer; font-weight: 600; overflow-wrap: anywhere; }
.help-faq-answer { padding-block-start: var(--space-3); overflow-wrap: anywhere; }
.help-channels { display: grid; grid-template-columns: minmax(0, 1fr);
  gap: var(--space-6); }
.help-channel-card { display: grid; gap: var(--space-3); min-inline-size: 0;
  padding: var(--space-5); border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md); overflow-wrap: anywhere; }
.help-channel-card a { justify-self: start; max-inline-size: 100%; white-space: normal; }
.help-faq:focus-visible { outline: 3px solid var(--color-brand-navy); outline-offset: 3px; }
@media (min-width: 48rem) {
  .help-channels { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
```

Breakpoint e proposta, conferir largura util/textos e Figma. Sem altura fixa,
clamp/ellipsis em respostas ou links; fonte Inter/fallbacks globais. Manter
marker nativo de summary ou indicador igualmente compreensivel confirmado;
nao depender somente de cor/icone. Medir foco/contraste e area de acionamento,
ordem DOM/visual e reflow conforme 016. Nenhum asset novo presumido.

## Arquivos e sequencia de implementacao

| Arquivo | Intervencao / tarefa |
| --- | --- |
| src/content/pages/ajuda.ts | FAQ/copy/apoio por estado e destino canônico; T007 |
| src/content/support/canais.ts | Fonte neutra de estado editorial; T003/T009 |
| src/content/support/contatos.ts da 015 | Referenciar fonte compartilhada quando criada; endereco so na 015 |
| src/components/ajuda/FaqSection.tsx | details/summary/ancora; T008 |
| src/components/ajuda/HelpChannelCard.tsx | Cards/aviso/alternativa; T009 |
| src/pages/AjudaPage.tsx | Composicao/retorno fixo; T010 |
| src/styles/globals.css | Expansao/reflow/foco confirmados; T011 |
| Navegacao/breadcrumb 002/003 | Integracao minima de href/hash/foco, se ausente; T010 |
| src/app/routes.tsx | Manter rota/node; alterar node so com evidencia |
| docs/design-system/mapa-figma-telas.md | Confirmar associacao apos consulta; T004 |
| specs/013-fluxo-de-ajuda/verification.md | Evidencias e validacao editorial; T012–T015 |
| specs/013-fluxo-de-ajuda/quickstart.md | Entradas/FAQ/canais/retorno apos entrega; T015 |

T001 possui inventario; T002/T003 possuem proposta, sem validacao da equipe
ou operacao confirmada. T004 Figma pendente. T005 possui este artefato, sem
dependencias encerradas. Executar T006 validar documentos; implementar
conteudo/FAQ/cards/entrada/estilos; verificar T012–T015. Nao alterar backend,
solicitação 014, mecanismo de cópia 015 ou schema/provider para renderizar entrada de ajuda.

## Verificacao futura e matriz de ambientes

Reusar suite compartilhada se existir. Nao instalar framework so para contar
perguntas. Checks manuais significativos sao necessarios para pagina orientativa;
se houver suite, testar comportamento e integracao de navegacao/hash, estados
dos canais e preservacao de memoria, sem testes que apenas espelhem labels.

Checklist editorial: sete assuntos cobertos com respostas coerentes com
007–012, sem aprovacao, rascunho permanente, importacao externa ou prazo
prometido; descricoes/avisos validados por responsavel/data. Fontes e contato
da 015 independentes do numero de cards ou correcoes de acentuacao.

Cenarios: URL direta/recarga; link compartilhado para hash; mesma rota com
hash novo; voltar/avancar e foco fora do header; FAQ por Enter/Space, multiplas
respostas abertas e links so consultaveis quando abertas; canais independentes;
ativo/pausado/pendente, ambos pausados/pendentes e alternativa somente ativa;
backend 014 indisponivel sem impedir FAQ/e-mail; retorno explicito sem historico.

Com Carta parcial/diagnostico em memoria e storage indisponivel, navegar para
ajuda/canal/voltar/formulario e comparar estado preservado. Teste observa
provider real/injetado, sem passar Carta a AjudaPage. Conferir ausencia de
leitura/session props/requests de atendimento na entrada e dados nas URLs.
Destino placeholder permite testar href, mas CA13 permanece pendente.

| Ambiente proposto | Evidencia exigida |
| --- | --- |
| Windows 11, Chrome/Edge/Firefox estaveis | Entradas/hash/historico, FAQ nativa, canais/retorno e preservacao |
| macOS, Safari estavel | Mesmos comportamentos e foco em summary/ancora |
| iOS Safari; Android Chrome reais | Toque/expansao/reflow e navegacao |
| NVDA com Firefox/Chrome; VoiceOver/Safari | Landmarks/summary/estado/links/foco sem anuncios duplicados |

Registrar versoes exatas, sistema/dispositivo/tecnologia assistiva e resultados.
Larguras 1440/1024/768/390/320 px e intermediarias; texto 200%, zoom 400% para
reflow desktop, fonte fallback, respostas/links longos e header multiline.
Medir contraste/foco e verificar ausencia de corte/sobreposicao/overflow da
pagina. Configuracao SPA deve permitir recarga em /ajuda e hash; verificar
hosting real sem publicar site nesta etapa. Ambiente ausente fica pendente.

Depois de entrega 014/015, verificar entrada nos fluxos reais e estado
editorial consistente. Nao enviar e-mail ou submeter atendimento real para
testar encaminhamento; verificar interface e contratos sem concluir operacao.
Nao confundir status ativo editorial com vagas/SMTP/permissoes em tempo real.

verification.md futuro registra revisao do produto, CA/tarefa, procedimento,
ambiente, resultado, defeito/reteste e pendencia; nenhum dado pessoal. Executar
typecheck/build e suite disponivel apos codigo. quickstart inclui entradas/
hash, FAQ/teclado, destinos/retorno e estados editoriais sem envio de solicitacao.

## Rastreabilidade e limites de aceite

| Criterios | Evidencia / tarefas |
| --- | --- |
| CA01 | Entrada direta/recarga/hash/shell; T008/T010/T012 |
| CA02 | Copy/FAQ versionadas e cobertura; T002/T007/T012 |
| CA03–CA04 | Destinos certos e navegacao sem envio; T009/T012/T013 |
| CA05–CA07 | Continuidade/retorno fixo/sem dados nos canais; T010/T012 |
| CA08–CA10 | FAQ semantica/teclado/foco/reflow; T004/T008/T011/T014 |
| CA11 | Pausa confirmada e alternativa operacional; T003/T009/T012/T013 |
| CA12 | Validacao institucional e limites de suporte; T002/T007/T015 |
| CA13 | Fluxos reais 014/015, separado de href; T013 |
| CA14 | Conteudo/shell/Figma e ausencia de coleta/backend; T004/T006/T014/T015 |

Nao declarar aceite integral enquanto ERS/Figma/copy, navegacao/provider,
canais reais ou ambientes necessarios estiverem pendentes. Pagina de ajuda
nao coleta duvidas/anexos/dados, nao persiste expansao, nao envia Carta,
nao consulta agenda/backend para FAQ e nao promete reserva/aprovacao/publicacao.

## Proximo passo

Continuar `/spec:implementar` apos resolver V013-01, consultar Figma/ERS e
validar copy, ancora/navegacao 002 e configuracao dos canais 014/015. V013-02
teve vocabulario/cenarios sincronizados em plan/tasks; isso nao aprova estados
operacionais. T003 possui contrato tipado parcial; nenhuma tarefa marcada
concluida. Resultados de checks e limites atuais em verification.md.

## Integração compartilhada — T013, 20/10/2026

Aplicar o [contrato de canais](../../docs/arquitetura/contrato-canais-ajuda.md)
como definição única de estado/endereço/destino, apresentação, transições e
migração editorial. FAQ sem cards adicionais, CTA de apoio por estado, destino canônico da 014.
Na entrada compartilhada, atendimento ativo abre calendário interno na própria
014, e-mail ativo copia; a FAQ apenas navega.

Estado atual inspecionado: atendimento pendente, e-mail ativo editorialmente.
Ativo não prova vagas, recebimento ou implementação. Agenda vazia/erro de rede
e falha de clipboard são estados operacionais distintos, não mudam supportChannels.
As decisões de apresentação antes abertas em V013-01/V015-02 estão definidas
no contrato; efeitos de pausa na API/recuperação seguem contrato-agenda.md da 014;
as decisões institucionais IN01–IN08 permanecem pendentes.
Migração de conteúdo concluída em 21/10/2026; resolvedor compartilhado e
consumidores conferidos em tests/support.presentation.test.mjs. Isso não entrega
calendário/API/clipboard ou composição visual completa. Não há aceite
funcional nesta revisão; testar CJ01–CJ12 e critérios locais após implementar.

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

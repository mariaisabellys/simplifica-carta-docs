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

> Contrato editorial atualizado em 2026-10-07: implementar diretamente
> `src/content/pages/ajuda.ts`. As sete perguntas candidatas, o titulo
> `Preciso de ajuda`, o retorno ao formulario e os dois cards descritos abaixo
> sao registro historico substituido; nao fazem parte da pagina oficial atual.
> A pagina possui quatro perguntas e uma secao de apoio para a feature 014.

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
| AjudaPage | PageHeader e dois PlaceholderCards, sem acoes | FAQ/cards/retorno reais |
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
| Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2, node 169:495 | FAQ/entrada, canais e retorno; localizar frames adicionais se necessario | Referencia local FAQ, sem consulta MCP |
| Make dVm7lEZdBFqOiiySWLWUqp, node 0:1 | Tokens/cards/links/expansao/foco/estados/reflow | Resumo local, sem consulta direta |

Confirmar ordem das regioes, perguntas abertas/fechadas, canais, pausas,
composicao responsiva e medidas/tokens. Node FAQ nao representa formularios
de 014/015. Atualizar mapa somente com evidencia; nao inserir agenda/formulario
para preencher lacuna do prototipo. CSS abaixo e proposta semantica.

Inventario de assets novos: vazio. Icones, se necessarios e confirmados,
reusar sistema existente com aria-hidden para decoracao. Nao gerar imagens
ou exportar URLs temporarias do Figma por antecipacao. Texto identifica todas
as acoes, mesmo sem icone. Inter/fallbacks seguem decisao local do projeto.

## FAQ e copy proposta para validacao

Adotar inicialmente `details`/`summary` nativos, multiplas respostas abertas,
sem estado React/persistencia/progresso. Essa e a estrategia tecnica unica
deste plano, condicionada a conciliacao visual. Se Figma exigir outro controle,
revisar plano antes de codigo; nao manter duas implementacoes concorrentes.

Cada pergunta tem ID tecnico estavel; texto pode mudar sem mudar key. Toda
resposta e texto React e links estruturados, sem HTML/Markdown interpretado.
Abrir FAQ nao e pre-requisito para escolher canal. Nao acrescentar busca,
chat, triagem, avaliacao ou formulario de duvidas.

| ID | Pergunta candidata | Cobertura / referencia |
| --- | --- | --- |
| funcao-manual | O Simplifica Carta publica o serviço por mim? | Preparacao local; publicacao manual, conforme MVP |
| acesso-etapas | Preciso seguir todas as etapas em ordem? | Acesso independente; 003 |
| reunir-informacoes | Quais informações preciso reunir? | Consulta da 006 e revisao com setor responsavel |
| continuidade-sessao | Posso continuar o preenchimento depois? | Sessao temporaria/memoria apenas; 007, sem rascunho permanente |
| validacao-textos | As sugestões de linguagem simples são obrigatórias? | Obrigatorios versus sugestoes; 008, sem aprovacao automatica |
| previa-csv-copia | Qual a diferença entre prévia, CSV e cópia? | Revisao, arquivo local e texto individual; 009–012 |
| escolher-orientacao | Como escolho um canal de orientação? | Destinos 014/015 e estados editoriais, sem prazo/vagas prometidos |

Titulo: Preciso de ajuda. Introducao candidata: "Consulte as dúvidas frequentes
ou escolha um canal de orientação para preparar a Carta de Serviços."
Escopo candidato: "A orientação apoia o levantamento, a organização e a
elaboração das informações. O cadastro e a publicação no Paraíba Digital
continuam manuais."

Antes de publicar, validar respostas/descricoes com equipe e registrar
responsavel, fonte e data efetiva em verification.md ou registro editorial.
Nao usar data de criacao deste plano como aprovacao. Referencias a recursos
planejados precisam ser verificadas contra entrega real, sem anunciar placeholders
como funcionamento. Nenhuma instrucao administrativa externa e inventada aqui.

## Estados editoriais dos canais e fonte unica

ID/destino fechado:

- atendimento-agendado -> `/ajuda/atendimento-agendado`.
- suporte-email -> `/ajuda/suporte-email`.

Proposta neutra em `src/content/support/canais.ts`: estado
`pendente | ativo | pausado`, alinhado ao plan 015. ativo significa fluxo
validado/publicado, equivalente a publicado no plan 013; nao significa vagas,
resposta imediata ou monitoramento. pausado exige indisponibilidade confirmada
e aviso validado. pendente significa sem confirmacao para publicacao ativa;
nao e prova de falha operacional. Estado atual documentado: ambos pendentes.

013 e 014/015 consomem mesma configuracao, sem constantes contraditorias.
Contato da 015, em contatos.ts, referencia o ID/estado compartilhado; endereco
e titularidade continuam propriedade/validacao da 015. A 013 nao precisa
exibir endereco e nao o repete. Conciliar esta extracao com implementacoes
reais antes de criar arquivos; nao mudar planos executaveis silenciosamente.

O contrato tipado de canais.ts ja existe, sem objeto supportChannels ou avisos
editoriais publicados. Nao inferir ativo pela existencia do mapa. V013-01 ainda
exige definir na 014 o comportamento de acesso direto em pendente/pausado e
de tentativas em andamento; nao usar estado editorial como gate de API sem
essa decisao. A 013 apenas encaminha, sem cancelar ou criar solicitacoes.

Sempre manter link real para pagina de orientacao do proprio canal, inclusive
pausado, desde que destino implementado explique pausa. Rotulo pausado:
"Ver orientações do canal". Nao oferecer acao que prometa agendar/enviar nessa
condicao. Em pendente, publicar card definitivo somente depois de conciliar
status/copy; exemplo abaixo mostra aviso sem afirmar operacao. Essa estrategia
nao dispensa entrega de destinos nem aprova CA13.

Alternativa de outro canal somente quando sua configuracao estiver ativo e
entrega real tiver sido confirmada. Se ambos pendentes/pausados, manter FAQ e
formulario e nao inventar alternativa de atendimento. Destino ativo tambem
pode encontrar agenda vazia/erro de API: esses estados pertencem a 014 e nao
alteram automaticamente a configuracao editorial da ajuda.

Sem chamada de agenda, health check, SMTP ou backend da entrada. Selecionar
canal apenas navega; nao reservar, enviar, registrar, notificar ou coletar.

## Contratos TypeScript e conteudo: codigo base

Exemplos sao proposta editorial, nao objetos aprovados para producao. Completar
imports nos caminhos reais e conferir consumidores. Metadados de validacao
ficam documentais, sem expor checklist interno no fluxo do usuario.

```ts
// src/content/support/canais.ts — fonte compartilhada 013/014/015
export const supportDestinations = {
  "atendimento-agendado": "/ajuda/atendimento-agendado",
  "suporte-email": "/ajuda/suporte-email",
} as const;
export type SupportChannelId = keyof typeof supportDestinations;
export type SupportChannelState =
  | { status: "ativo" }
  | { status: "pendente"; notice: string }
  | { status: "pausado"; notice: string };
export type SupportChannels = Readonly<Record<SupportChannelId, SupportChannelState>>;

// src/content/pages/ajuda.ts
export type HelpHref = "/organizar-informacoes" | "/explorar-por-etapas"
  | "/formulario-carta" | "/previa" | "/tutorial-paraiba-digital"
  | typeof supportDestinations[SupportChannelId];
export type FaqItem = {
  id: string; question: string; paragraphs: readonly string[];
  links?: readonly { label: string; href: HelpHref }[];
};
export type HelpChannel = {
  id: SupportChannelId; title: string; description: string;
  actionLabel: string;
};
export const ajudaContent = {
  title: "Preciso de ajuda",
  introduction: "Consulte as dúvidas frequentes ou escolha um canal de orientação para preparar a Carta de Serviços.",
  scope: "A orientação apoia o levantamento, a organização e a elaboração das informações. O cadastro e a publicação no Paraíba Digital continuam manuais.",
  faqTitle: "Dúvidas frequentes", channelsTitle: "Canais de orientação",
  choiceNotice: "Escolher um canal abre suas orientações. Nenhuma mensagem ou solicitação é enviada nesta página.",
  returnLabel: "Ir para o formulário da Carta",
  pausedAction: "Ver orientações do canal",
  alternativeLabel: (title: string) => `Consultar ${title}`,
  faq: [
    { id: "funcao-manual", question: "O Simplifica Carta publica o serviço por mim?",
      paragraphs: ["O Simplifica Carta ajuda a preparar e revisar as informações. O cadastro e a publicação na plataforma oficial continuam manuais."] },
    { id: "acesso-etapas", question: "Preciso seguir todas as etapas em ordem?",
      paragraphs: ["Você pode consultar cada etapa sem concluir as anteriores."],
      links: [{ label: "Explorar as etapas", href: "/explorar-por-etapas" }] },
    { id: "reunir-informacoes", question: "Quais informações preciso reunir?",
      paragraphs: ["Consulte as orientações de organização e confirme os dados com o setor responsável pelo serviço."],
      links: [{ label: "Organizar as informações", href: "/organizar-informacoes" }] },
    { id: "continuidade-sessao", question: "Posso continuar o preenchimento depois?",
      paragraphs: ["Os dados ficam disponíveis durante a sessão. O aplicativo não oferece salvamento permanente de rascunhos.",
        "Se o armazenamento da sessão estiver indisponível, os dados em memória podem ser perdidos ao recarregar ou sair. Não conte com recuperação em outra sessão."],
      links: [{ label: "Abrir o formulário da Carta", href: "/formulario-carta" }] },
    { id: "validacao-textos", question: "As sugestões de linguagem simples são obrigatórias?",
      paragraphs: ["As sugestões orientam a revisão do texto e não precisam ser aceitas para copiar campos ou exportar. Campos obrigatórios ausentes impedem a exportação CSV.",
        "A verificação não representa aprovação institucional da Carta."] },
    { id: "previa-csv-copia", question: "Qual a diferença entre prévia, CSV e cópia?",
      paragraphs: ["A prévia ajuda a revisar as informações. O CSV gera um arquivo local. A cópia transfere o texto de um campo para colagem manual.",
        "Confira os dados depois de colar. Esses recursos não publicam o serviço nem garantem importação automática do CSV na plataforma oficial."],
      links: [{ label: "Revisar a Carta", href: "/previa" },
        { label: "Consultar o tutorial de cadastro manual", href: "/tutorial-paraiba-digital" }] },
    { id: "escolher-orientacao", question: "Como escolho um canal de orientação?",
      paragraphs: ["Consulte as orientações de suporte por e-mail ou de atendimento agendado. A solicitação ocorre no fluxo escolhido, conforme as condições informadas.",
        "Escolher o canal não envia mensagem nem reserva horário."] },
  ] satisfies readonly FaqItem[],
  channels: [
    { id: "atendimento-agendado", title: "Atendimento agendado",
      description: "Consulte as orientações para solicitar atendimento, conforme a disponibilidade apresentada no fluxo.",
      actionLabel: "Ver atendimento agendado" },
    { id: "suporte-email", title: "Suporte por e-mail",
      description: "Consulte as orientações de contato para esclarecer dúvidas por escrito.",
      actionLabel: "Ver suporte por e-mail" },
  ] satisfies readonly HelpChannel[],
} as const;
```

Mapear href por ID, nunca por indice ou string livre. Configuracao de canais
real nao e preenchida com ativo por default. Avisos precisam ser verdadeiros/
validados; status desconhecido nao deve virar ativo por fallback. Tipos nao
substituem conferencia editorial de destino/entrega.

## Componentes React: codigo base

```tsx
// src/components/ajuda/FaqSection.tsx — imports conteudo/AppLink reais
export function FaqSection({ items }: { items: readonly FaqItem[] }) {
  return (
    <section id="duvidas-frequentes" tabIndex={-1} aria-labelledby="ajuda-faq-title"
      className="help-faq">
      <h2 id="ajuda-faq-title">{ajudaContent.faqTitle}</h2>
      {items.map(item => (
        <details key={item.id} className="help-faq-item">
          <summary>{item.question}</summary>
          <div className="help-faq-answer">
            {item.paragraphs.map((text, index) => <p key={index}>{text}</p>)}
            {item.links?.length ? (
              <ul>{item.links.map(link => (
                <li key={link.href}><AppLink href={link.href}>{link.label}</AppLink></li>
              ))}</ul>
            ) : null}
          </div>
        </details>
      ))}
    </section>
  );
}

// src/components/ajuda/HelpChannelCard.tsx
export function HelpChannelCard({ channel, state, alternative }: {
  channel: HelpChannel; state: SupportChannelState; alternative?: HelpChannel;
}) {
  const titleId = `help-channel-${channel.id}`;
  return (
    <article className="help-channel-card" aria-labelledby={titleId}>
      <h3 id={titleId}>{channel.title}</h3>
      <p>{channel.description}</p>
      {state.status !== "ativo" ? <p>{state.notice}</p> : null}
      <AppLink href={supportDestinations[channel.id]}>
        {state.status === "ativo" ? channel.actionLabel : ajudaContent.pausedAction}
      </AppLink>
      {alternative ? <AppLink href={supportDestinations[alternative.id]}>
        {ajudaContent.alternativeLabel(alternative.title)}
      </AppLink> : null}
    </article>
  );
}

// src/pages/AjudaPage.tsx — sem hooks/props de Carta/diagnostico
export function AjudaPage() {
  const c = ajudaContent;
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: c.title }]} />
      <PageHeader title={c.title} description={c.introduction} />
      <p>{c.scope}</p>
      <FaqSection items={c.faq} />
      <section aria-labelledby="help-channels-title">
        <h2 id="help-channels-title">{c.channelsTitle}</h2>
        <p>{c.choiceNotice}</p>
        <div className="help-channels">
          {c.channels.map(channel => {
            const state = supportChannels[channel.id]; // objeto compartilhado validado
            const alternative = state.status !== "ativo" ? c.channels.find(other =>
              other.id !== channel.id && supportChannels[other.id].status === "ativo") : undefined;
            return <HelpChannelCard key={channel.id} channel={channel} state={state}
              alternative={alternative} />;
          })}
        </div>
      </section>
      <AppLink href="/formulario-carta">{c.returnLabel}</AppLink>
    </>
  );
}
```

AppLink/Breadcrumb/supportChannels sao contratos a adaptar/criar no comando
de implementacao, nao componentes/configuracao prontos em src. O mapa
supportDestinations e tipos compartilhados ja existem; importar de canais.ts
em vez de duplicar. Reusar
ButtonLink com onNavigate conforme contrato 002 se equivalente; nao adicionar
router paralelo. PageHeader ja produz unico h1; shell fornece main/header/footer.

summary recebe comportamento/estado nativos; nao adicionar role=button ou
aria-expanded manual concorrente. Sem name agrupando details para exclusividade;
permitir comparar respostas. Conteudo fechado e links seguem comportamento
nativo; verificar com teclado/leitor de tela nos browsers reais. Sem live
regions de resposta inteira ou foco automatico ao expandir. Estado local de
abertura nao persiste ao trocar rota; nao grava storage ou diagnostico.

## Ancora, navegacao e continuidade

Implementar exatamente `/ajuda#duvidas-frequentes`, conforme 002. Foco no
section tabindex=-1 identificado, sem exigir abrir respostas. Fragmento e
ID tecnico fixo; nao construir seletor CSS com hash arbitrario do usuario.
Resolver IDs conhecidos via getElementById ou helper compartilhado seguro.

- Shell deve tratar pathname/hash, hashchange/popstate e montar rota antes
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
| src/content/pages/ajuda.ts | FAQ/copy/canais/destinos tipados; T007 |
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

# Implementation Plan: Organizar informacoes

> **Status em 6 de outubro de 2026:** plano detalhado superado pela decisao de
> contrato registrada na spec. O contrato oficial possui tres topicos, 13
> informacoes, marcacao independente, progresso de 0 a 13 e orientacoes
> expansiveis. O codigo base e as proibicoes de checkbox/progresso abaixo nao
> devem ser usados ate a reescrita deste plano.

## Status e limites

Plano tecnico preparado em 2026-10-02 e superado pelo contrato de 2026-10-06.
O frame `387:1918` foi identificado posteriormente. **Continuam pendentes a
reescrita deste plano, a consulta visual detalhada via MCP, a conciliacao com o
PDF do ERS e a validacao editorial; a feature ainda nao esta pronta para
implementacao visual nem aceite integral.**

Executar `/spec:validar 006-organizar-informacoes` depois de resolver as pendencias,
antes de `/spec:implementar`. Nenhuma tarefa foi marcada como concluida:
inventario parcial ou codigo base documental nao conclui T001–T004 integralmente.

O texto abaixo descreve o contrato antigo de dez assuntos e deve ser lido como
registro historico. O contrato vigente possui tres topicos, 13 informacoes,
marcacao independente e progresso de 0 a 13.

## Fontes efetivamente consultadas

- spec.md, plan.md e tasks.md da 006; README.md e specs/README.md (roadmap).
- `Readme Manual de Levantamento de Serviços.md`, trechos de objetivo,
  organizacao, validacao e limites de suporte/sessao.
- docs/implementation-plan.md; constitution, regras de IA e prompts-padroes
  lidos no fluxo desta conversa; produto/mvp.md e produto/fluxos.md.
- arquitetura/decisoes-tecnicas.md, design-system/mapa-figma-telas.md e
  design-system/tokens-e-componentes.md.
- Planos detalhados de 002/003, especialmente navegacao/breadcrumb;
  planos 007/008 para agendamento e obrigatoriedade; documentos 016 para verificacao.
- Codigo atual de App, AppShell, routes, OrganizarInformacoesPage, PageHeader,
  ButtonLink, conteudo de exploracao, tipos/schema/storage da Carta, estilos,
  tokens e package.json, inspecionado nesta conversa.

O PDF `Documento de Requisitos - Manual de Levantamento de Serviços-2.pdf`
nao foi extraido/validado: Python/Poppler nao estavam disponiveis entre os comandos
verificados. O manual textual nao deve ser descrito como leitura desse PDF.
Conferir requisito original da lista, conteudo e interacoes na proxima revisao.

## Referencias visuais e consulta pendente

| Fonte | Referencia | Evidencia nesta etapa |
| --- | --- | --- |
| Design | fileKey YaVUdqYa3boHpvGrxf4ZJ5; node `387:1918` | Frame identificado no mapa; consulta MCP detalhada pendente |
| Make | fileKey dVm7lEZdBFqOiiySWLWUqp; node 0:1 | Sem consulta MCP; tokens locais sao inventario, nao confirmacao visual |
| Mapa local | docs/design-system/mapa-figma-telas.md | Registra `387:1918` como referencia da 006 |
| Exploracao | node 575:483 | Entrada da 003; nao usar como layout da 006 |

Foi pesquisada a integracao Figma: plugin disponivel, ainda nao instalado/conectado,
sem ferramenta de leitura Figma utilizavel nesta sessao. A sugestao de conexao
nao constitui consulta aos arquivos. Instalar/conectar Figma e obter contexto
Design/Make antes de fechar layout, espacamentos, estados ou assets.

Na revisao visual, registrar node/nome do frame, composicao, ordem de regioes,
posicao das acoes, medidas/tokens, foco, comportamento estreito e assets locais.
O mapa e a rota devem manter o node confirmado `387:1918`. Se houver
upload/checklist interativo no frame, registrar a
divergencia e conciliar ERS/spec antes de incluir qualquer interacao.

O esqueleto e o CSS abaixo representam requisitos semanticos e possibilidades
tecnicas. **Nao sao layout homologado nem codigo extraido do Figma.**

## Inventario e dependencias reais

| Area | Estado verificado | Decisao para a 006 |
| --- | --- | --- |
| Rota | Existe, showInNav true, specId 006 e layoutType section; deve registrar `387:1918` | Manter path/identidade e metadata visual |
| Pagina | PageHeader + PlaceholderCard | Substituir somente em /spec:implementar |
| Shell | Header/nav/main/footer e aria-current por path | Reusar, sem main duplicado |
| App | history/popstate, scroll no navigate, sem foco/titulo explicitos | Reusar contrato da 002; nao criar router local |
| ButtonLink | Anchor simples sem onNavigate | Precisa contrato compartilhado antes da integracao |
| AppShell handleNav | Intercepta cliques sem verificar modificadores | Corrigir no dono 002, incluindo regressao |
| Breadcrumb/contexto | Planejados, ausentes no codigo | Consolidar 002/003 antes de importar |
| Entrada da 003 | Conteudo etapa 2 aponta para /organizar-informacoes; rota/pagina ainda ausentes | CA02 pendente de entrega real |
| 005 | Spec e conteudo do diagnostico presentes; interface ainda incompleta | Encaminhamento pertence a 005; acesso direto livre |
| 007/008 | Specs/planos presentes; provider v2 nao entregue no codigo inspecionado | CA06 pendente, sem alterar storage pela 006 |
| 013/016 | Documentos presentes, paginas/contratos nao comprovados entregues | Reusar destinos e alinhar verificacoes |
| Testes | dev/build/preview/typecheck, sem framework configurado | Roteiro manual; suite compartilhada se entregue antes do codigo |

Notas antigas de ausencia de 007/013/016 no plan/spec nao descrevem o estado
documental atual. Existencia de documento ou placeholder nao equivale a entrega.

## Decisoes de escopo e correspondencia

- Conteudo editorial estatico e integralmente visivel; nenhum estado de dominio.
- Ordem unica definida pelo array e lista ol/li, sem CSS columns ou order que
  altere leitura. Um h1, h2 da lista e h3 de cada assunto.
- Dez assuntos, conforme RF03. Nome popular pode ser citado dentro de nome,
  sem criar decimo primeiro item. Tipo, sistema, link e exibicao ficam dentro de agendamento,
  com as condicoes da 007; nao sao novos assuntos independentes.
- Desconhecido nao significa gratuito, sem documentos ou resposta Nao.
  A 006 nao interpreta o false inicial, campos vazios ou dados reais da sessao.
- Nao rotular os dez assuntos como obrigatorios universais. A 008 planeja
  cinco obrigatorios gerais e os condicionais de agendamento da 007/008;
  esta pagina nao valida nem anuncia completude.
- Dados/documentos a reunir sao informacoes sobre exigencias do servico;
  nao pedir anexos, documentos de cidadaos ou envio da Carta.
- Formulario e ajuda sao destinos internos sempre livres. Se ajuda ja estiver
  no shell, evitar duplicacao desnecessaria; confirmar posicao no Figma.

| Assunto | Referencia documental, sem import em runtime |
| --- | --- |
| Nome | identificacao.nome; nomePopular dentro do mesmo assunto, se pertinente |
| Descricao | identificacao.descricao |
| Publico-alvo e criterios | identificacao.publicoAlvo; requisitos.criterios |
| Documentos | requisitos.documentos; nome/classificacao quando confirmados |
| Etapas | etapas; sequencia do pedido ate conclusao |
| Prazo | atendimento.prazo e condicoes aplicaveis |
| Custos | atendimento.custo; zero/gratuidade somente como informacao confirmada |
| Canais | atendimento.canais e informacoes de acesso |
| Agendamento | atendimento.exigeAgendamento, tiposAgendamento e sistemaAgendamento; linkAgendamento/exibicaoAgendamento somente para sistema externo; orientacaoAgendamento opcional, conforme 007 |
| Adicionais | informacoesComplementares |

## Arquivos e responsabilidades

| Arquivo | Intervencao futura | Tarefas |
| --- | --- | --- |
| src/content/pages/organizar-informacoes.ts | Criar tipos e conteudo validado abaixo | T003/T006 |
| src/pages/OrganizarInformacoesPage.tsx | Compor pagina sem estado ou effects | T007/T008 |
| src/styles/globals.css | Acrescentar classes prefixadas organize- apos consulta visual | T009 |
| src/app/routes.tsx | Preservar rota; frame somente apos confirmacao | T002/T008 |
| docs/design-system/mapa-figma-telas.md | Registrar frame efetivamente consultado | T002 |
| Breadcrumb/NavigationContext/ButtonLink comuns | Reusar entrega 002/003; ajuste minimo documentado se ainda ausente | T001/T004/T008 |
| verification.md e quickstart.md da 006 | Criar na implementacao com resultados/roteiro | T010–T014 |

Nao criar assets antes de inventario visual. Nao modificar schema, validacao,
storage, formulario, CSV, diagnostico ou backend. Nao adicionar tokens por
antecipacao: reusar existentes e validar contraste nos estados realmente usados.

## Contratos de navegacao e componentes

Contrato documental consolidado nesta rodada de `/spec:implementar 006`:
002 e exemplo Breadcrumb da 003 usam useAppNavigate retornando funcao.
O exemplo da 003 preserva modificadores, target/download e destinos externos.
NavigationContext/ButtonLink/Breadcrumb ainda precisam de entrega compartilhada;
alinhamento documental nao comprova navegacao ou preservacao de memoria.

Contrato escolhido para o codigo base desta pagina:

```ts
type AppNavigate = (href: string) => void;
// src/app/NavigationContext.tsx, responsabilidade compartilhada da 002
// useAppNavigate(): AppNavigate, sob NavigationProvider acima das paginas.

type BreadcrumbItem = { label: string; href?: string };
type BreadcrumbProps = { items: readonly BreadcrumbItem[] };
// Breadcrumb usa o mesmo contexto, aria-label="Navegação estrutural",
// ol/li e aria-current="page" no ultimo item sem href.

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onNavigate?: AppNavigate;
};
```

Os componentes comuns precisam interceptar somente clique primario sem
modificadores em destino interno, preservando href real, target/download e
mailto/links externos. Sem provider compartilhado, nao copiar silenciosamente
o esqueleto: entregar contrato comum ou revisar este plano antes do codigo.
Breadcrumb deve usar handler/link compartilhado, sem dependencia de asset da 003.

PageHeader atual aceita title/description/eyebrow e produz h1. A pagina passa
o primeiro paragrafo como description e renderiza paragrafos restantes abaixo.
Foco/titulo de documento sao do shell: focar main/titulo em troca de rota,
sem effect local ou foco repetido em re-render. Header sticky nao pode encobrir alvo.

## Codigo base: conteudo editorial proposto

**Copy para validacao da equipe, sem homologacao nesta etapa.** Acentos fazem
parte da interface final. Exemplos opcionais foram omitidos para evitar regras
ficticias; se adicionados, usar exampleLabel explicitamente.

```ts
// src/content/pages/organizar-informacoes.ts
export type InformationTopicId =
  | "nome" | "descricao" | "publico-alvo" | "documentos" | "etapas"
  | "prazo" | "custos" | "canais" | "agendamento" | "adicionais";

export type InformationTopic = {
  id: InformationTopicId;
  title: string;
  guidance: string;
  example?: string;
};

export type OrganizeInformationContent = {
  title: string;
  introduction: readonly [string, ...string[]];
  confirmationGuidance: string;
  topicsTitle: string;
  topics: readonly InformationTopic[];
  publicationGuidance: string;
  exampleLabel: string;
  breadcrumb: readonly [{ label: string; href: "/" }, { label: string }];
  primaryAction: { label: string; href: "/formulario-carta" };
  helpAction: { label: string; href: "/ajuda" };
};

export const organizeInformationContent = {
  title: "Organizar informações",
  introduction: [
    "Use esta lista para reunir as informações do serviço antes de preencher a Carta de Serviços.",
    "Você pode consultar qualquer assunto e seguir para o formulário quando precisar, sem marcar ou concluir itens.",
  ],
  confirmationGuidance:
    "Reúna informações atualizadas com o setor responsável pelo serviço. Se algo ainda não estiver claro, confirme antes de registrar essa informação.",
  topicsTitle: "Informações para reunir",
  topics: [
    {
      id: "nome", title: "Nome do serviço",
      guidance: "Identifique o serviço com um nome claro que descreva o que o cidadão solicita. Reúna também o nome popular, se houver: nome alternativo ou mais conhecido pelo cidadão, que complementa o nome do serviço sem substituí-lo.",
    },
    {
      id: "descricao", title: "Descrição do serviço",
      guidance: "Reúna uma explicação do que o serviço oferece e de sua finalidade para o cidadão.",
    },
    {
      id: "publico-alvo", title: "Público-alvo e critérios de acesso",
      guidance: "Identifique quem pode utilizar o serviço e quais condições essa pessoa precisa atender.",
    },
    {
      id: "documentos", title: "Documentos necessários",
      guidance: "Liste os documentos exigidos e confirme quais são obrigatórios ou opcionais. Se ainda não souber a regra, consulte o setor responsável: informação em branco não significa que nenhum documento é exigido.",
    },
    {
      id: "etapas", title: "Etapas do serviço",
      guidance: "Levante a sequência de ações desde o pedido até a conclusão do serviço e descreva o que acontece em cada etapa.",
    },
    {
      id: "prazo", title: "Prazo",
      guidance: "Confirme o tempo estimado para atendimento ou conclusão e as condições que podem influenciar esse prazo.",
    },
    {
      id: "custos", title: "Custos",
      guidance: "Confirme se o serviço é gratuito ou pago. Quando houver cobrança, reúna os valores e as condições aplicáveis. Se ainda não souber, busque a informação; não presuma gratuidade.",
    },
    {
      id: "canais", title: "Canais de atendimento",
      guidance: "Identifique os canais disponíveis e as informações para acessá-los, como endereço, telefone, e-mail ou endereço do atendimento online, conforme o caso.",
    },
    {
      id: "agendamento", title: "Agendamento",
      guidance: "Confirme se necessita de agendamento. Se Sim, reúna tipo (Online, Presencial ou ambos) e sistema (Paraíba Digital ou Outro sistema ou site). Para sistema externo, reúna link e forma de exibição: Dentro do Paraíba Digital ou Em uma nova página. Se ainda não souber, confirme com o setor responsável.",
    },
    {
      id: "adicionais", title: "Informações adicionais",
      guidance: "Reúna outras orientações importantes para o cidadão que não estejam contempladas nos assuntos anteriores.",
    },
  ],
  publicationGuidance:
    "O preenchimento acontece no formulário da Carta. Esta lista orienta o levantamento e não representa aprovação pela GESED nem garantia de aceite. O cadastro e a publicação no Paraíba Digital continuam manuais.",
  exampleLabel: "Exemplo ilustrativo",
  breadcrumb: [{ label: "Início", href: "/" }, { label: "Organizar informações" }],
  primaryAction: { label: "Preencher Carta", href: "/formulario-carta" },
  helpAction: { label: "Preciso de ajuda", href: "/ajuda" },
} as const satisfies OrganizeInformationContent;
```

O satisfies confere tipos, nao comprova cobertura, unicidade ou ordem editorial.
Revisar os dez IDs/titulos na ordem RF03. Nao importar CartaServico/schema para
derivar a lista e nao mostrar paths tecnicos ao usuario.

## Codigo base: composicao React

Pre-condicao: NavigationContext, ButtonLink e Breadcrumb compartilham o contrato
acima. O arquivo abaixo nao compila contra a fundacao atual sem essa entrega.
Nao implementar mecanismos paralelos dentro da pagina para contornar a dependencia.

```tsx
// src/pages/OrganizarInformacoesPage.tsx
import { useAppNavigate } from "../app/NavigationContext";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ButtonLink } from "../components/ui/ButtonLink";
import { PageHeader } from "../components/ui/PageHeader";
import {
  organizeInformationContent as content,
  type InformationTopic,
} from "../content/pages/organizar-informacoes";

function InformationTopicItem({ topic }: { topic: InformationTopic }) {
  return (
    <li className="organize-topic" id={`organizar-${topic.id}`}>
      <h3>{topic.title}</h3>
      <p>{topic.guidance}</p>
      {topic.example ? (
        <p><strong>{content.exampleLabel}: </strong>{topic.example}</p>
      ) : null}
    </li>
  );
}

export function OrganizarInformacoesPage() {
  const navigate = useAppNavigate();
  return (
    <div className="organize-page">
      <Breadcrumb items={content.breadcrumb} />
      <PageHeader
        title={content.title}
        description={content.introduction[0]}
      />
      <div className="organize-introduction">
        {content.introduction.slice(1).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>{content.confirmationGuidance}</p>
      </div>
      <section className="organize-topics" aria-labelledby="organize-topics-title">
        <h2 id="organize-topics-title">{content.topicsTitle}</h2>
        <ol className="organize-topic-list">
          {content.topics.map((topic) => (
            <InformationTopicItem key={topic.id} topic={topic} />
          ))}
        </ol>
      </section>
      <div className="organize-next-step">
        <p>{content.publicationGuidance}</p>
        <div className="organize-actions">
          <ButtonLink href={content.primaryAction.href} onNavigate={navigate}>
            {content.primaryAction.label}
          </ButtonLink>
          <ButtonLink href={content.helpAction.href} variant="secondary" onNavigate={navigate}>
            {content.helpAction.label}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
```

Se o shell final ja tiver ajuda claramente acessivel nesse contexto, remover
o segundo link apos decisao visual registrada, preservando CA07. Nao criar
formulario de suporte. InformationTopicItem fica local, sem arquivo novo
enquanto nao existir reuso que justifique.

## CSS estrutural proposto, sujeito a consulta visual

Reusar globals.css; classes exclusivas evitam alterar cards de outras features.
Uma coluna e proposta provisoria conservadora de leitura, nao decisao Figma.
Se frame confirmar grade, usar Grid com ordem por linha e coluna unica estreita,
preservando numeração ol e sequencia 1–10. Nao usar list-style:none sem alternativa
semantica verificada nem display:contents nos li.

```css
.organize-page { min-width: 0; }
.organize-page p { line-height: 1.7; overflow-wrap: anywhere; }
.organize-introduction,
.organize-next-step { max-width: 75ch; }
.organize-topics { margin-block: var(--space-8); }
.organize-topic-list {
  margin-block: 0;
  padding-inline-start: var(--space-6);
}
.organize-topic { min-width: 0; margin-block: var(--space-6); }
.organize-topic h3 { overflow-wrap: anywhere; }
.organize-topic::marker { font-weight: 700; }
.organize-topic p:last-child { margin-bottom: 0; }
.organize-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.organize-actions .button-link {
  min-width: 0;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: anywhere;
  text-align: center;
}
```

Medidas acima sao proposta de estrutura baseada nos tokens existentes, ainda
nao confirmada no Make. Nao adicionar cor/sombra/iconografia por analogia.
Foco e botao primario atuais precisam medicao: branco sobre teal e outline
laranja transparente nao estao aprovados por este plano. Corrigir barreira
comum no dono 002/016 e retestar consumidores, documentando divergencia visual.

## Ordem de execucao futura

1. Concluir T001–T003: ERS, consulta Design/Make, contratos comuns e copy validada.
2. Revisar este documento com evidencia real; executar T005 `/spec:validar`.
3. Em `/spec:implementar`, T006 conteudo e T007 composicao; fechar dependencia
   de navegacao e executar T008 sem router/state/storage local.
4. Aplicar T009 somente com layout/tokens confirmados e medir foco/contraste.
5. Executar T010–T013 e consolidar T014; integracoes ausentes ficam pendentes.

## Verificacao e criterios de aceite

Resultados vao para verification.md, com data/commit/ambiente/versao/passos/
resultado/evidencia/defeito/reteste; quickstart.md conterá roteiro reproduzivel.
Nao criar relatorio com aprovado sem execucao.

| CA | Metodo e evidencia esperada | Dependencia |
| --- | --- | --- |
| CA01 | URL direta/recarga sem Carta/diagnostico; conteudo completo | Rota local; fallback publicado depende deploy |
| CA02 | Card real da etapa 2 abre pagina correta | 003 entregue; hoje pendente |
| CA03 | Revisao editorial de dez assuntos/ordem/criterios/agendamento | Copy validada, T003/T006 |
| CA04 | Desconhecido distinto de gratuito/sem exigencia, sem regras ficticias | Revisao editorial |
| CA05 | Preencher Carta sempre livre sem marcas/progresso | Links comuns; destino funcional da 007 |
| CA06 | Carta sintetica com textos/listas/escolhas preservada por links e historico; repetir com storage bloqueado | Provider/formulario reais da 007 |
| CA07 | Ajuda real acessivel sem suporte duplicado | 013 entregue; teste de href sozinho nao conclui jornada |
| CA08 | Teclado/leitor: h1/h2/h3/ol/breadcrumb, nomes/foco de links e rota | Shell comum e ambiente assistivo |
| CA09 | 1440/1024/768/390/320 px/intermediarias, texto 200%, reflow/zoom, fallback e texto longo | Matriz da 016 e medicao real |
| CA10 | Conteudo fora de JSX; sem hooks/efeitos de dominio, storage/API/checklist/progresso; hook compartilhado de navegacao permitido | Inspecao de imports/rede/controles |
| CA11 | Orientacao sem aprovacao/garantia/publicacao automatica | Copy validada |
| CA12 | Design/Make consultados, frame/mapa/rota corretos, comparacao e divergencias resolvidas | Figma conectado; hoje pendente |

Verificar Windows Chrome/Edge com NVDA, Firefox, Safari macOS e Safari iOS/
VoiceOver conforme disponibilidade real definida na 016; Android Chrome para
toque/orientacao quando disponivel. Registrar ausencia como pendente. Emulacao
de largura nao comprova navegador/leitor ou teclado virtual reais.

Checks depois de codigo: `npm run typecheck`, `npm run build` e suite
compartilhada se existir. Nao adicionar testes que apenas reproduzam o array
editorial. Testes relevantes cobrem destinos/foco/modificadores/estado preservado.
Se link comum mudar, verificar consumidores da 002/003 e demais paginas afetadas.
Nesta etapa nao houve build, teste de UI ou aceite funcional.

## Pendencias que precisam de evidencia

| Pendencia | Responsabilidade | Efeito |
| --- | --- | --- |
| Figma instalado/conectado e frame proprio identificado | Referencias Design/Make, T002 | Bloqueia fechamento visual/CA12 |
| PDF ERS confrontado com lista consultiva | T003 e validacao documental | Bloqueia conciliacao documental integral |
| Copy aprovada pela equipe, responsavel/data registrados | T003 | Bloqueia publicacao como redacao institucional definitiva |
| useAppNavigate/ButtonLink/Breadcrumb unificados e entregues | 002/003, T001/T008 | Bloqueia uso direto do codigo base e preservacao integrada |
| 003/005/007/013 funcionais | Features proprietarias | Impede aprovar criterios de jornada dependentes |
| Fallback de rotas no ambiente publicado | Deploy/017 | Impede concluir recarga publicada apenas pelo Vite local |

O plano pode ser revisado tecnicamente agora; as pendencias nao autorizam
inventar layout, homologacao ou funcionalidades de outras features.

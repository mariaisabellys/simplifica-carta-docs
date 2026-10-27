# Implementation Plan: Previa HTML

> **Plano parcialmente superado:** adaptadores e snippets v2 não devem ser
> implementados; usar o modelo central v3 da 007.

## Status e objetivo

Preparado em 2026-10-02. **Plano tecnico pendente de consulta Figma,
conferencia do PDF do ERS e validacao editorial. Nao pronto para implementacao
visual ou aceite integral.** Esta etapa cria somente documentacao; nao marca
tarefas, implementa src, instala bibliotecas ou executa testes funcionais.

Entregar leitura integral da Carta atual em /previa, inclusive parcial,
com ausencias identificadas e retorno ao formulario. HTML significa interface
local, sem arquivo HTML/PDF, impressao, pagina publica ou aprovacao institucional.

## Fontes e inventario

Fontes efetivamente consultadas nesta conversa:

- spec.md, plan.md e tasks.md da 009, lidos nesta etapa.
- Planos detalhados da 007/008; documentos 010–016 previamente consultados
  para snapshot, exportacao, continuidade e acessibilidade.
- README, manual textual, roadmap, MVP/fluxos, arquitetura, ADR-002,
  constitution, regras de IA e docs/implementation-plan.md.
- Mapa Figma/tokens locais; App/AppShell/routes, ButtonLink/PageHeader,
  tipos/schema/storage/validation/csv e estilos inspecionados nesta conversa.
- PreviaCartaPage atual: PageHeader e PlaceholderCard, sem leitura da Carta.

PDF ERS nao extraido/validado; Python/Poppler nao encontrados na verificacao
de comandos da sessao. Manual textual nao equivale a leitura desse PDF.

| Area | Estado real | Pre-condicao futura |
| --- | --- | --- |
| Rota /previa | specId 009, node 821:308; fora do menu principal | Preservar identidade sem expor menu por antecipacao |
| Pagina | Placeholder | Substituir em /spec:implementar |
| Provider/modelo v2 | Planejados na 007, ainda ausentes em src | Fonte unica acima das rotas |
| Required/resumo | Helper inicial; contratos novos planejados na 008 | complete/failed e retorno tipado |
| Exportacao | Helper incompleto, sem download | Componente real da 010 para CA12 |
| Links/foco | ButtonLink pode recarregar; foco/titulo comuns ainda incompletos | Contrato unico 002/003/007 |
| Testes | Sem framework configurado | Reusar infraestrutura 007/008 |

Specs 010/011/013/016 agora existem; notas historicas de ausencia nao descrevem
inventario documental atual. Rotas/placeholders nao comprovam entrega funcional.

## Referencias visuais pendentes

| Fonte | Referencia | Evidencia |
| --- | --- | --- |
| Design | YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2, node 821:308 | Referencia local card-servico-completo; sem consulta MCP |
| Make | dVm7lEZdBFqOiiySWLWUqp, node 0:1 | Sem consulta MCP |

Plugin Figma foi localizado anteriormente, ainda nao instalado/conectado e
sem confirmacao posterior. Consultar Design/Make antes de estilos e confirmar
pagina completa, acoes e estados vazio/parcial/required failed/recuperacao.
Registrar nodes adicionais, medidas/tokens, assets, foco/contraste e reflow;
atualizar mapa somente com evidencia real. Frame que omita campos do modelo
exige conciliacao preservando cobertura, sem inferir layout integral pelo nome.

Codigo e CSS abaixo sao base semantica/tecnica proposta, nao output Figma nem
layout homologado. Copy exige validacao da equipe com responsavel/data.

## Contratos de apresentacao

Seletor recebe CartaServico v2 validada/migrada pela 007. Nao aceita sessao
bruta, nao acessa storage, nao executa decoder novamente nem corrige dados
durante render. IDs sao somente identidade de edicao/keys, nunca texto visivel.

hasContent = algum texto util ativo (inclusive nome popular e orientacoes de
agendamento somente com Sim), nome de
documento ou descricao de etapa/canal util, ou agendamento true/false explicito.
IDs, numeros, tipo/classificacao sem texto e defaults nao bastam. trim apenas
detecta ausencia; retornar strings originais sem normalizacao/truncamento.

| Campo | Regra de exibicao na Carta com dados |
| --- | --- |
| Nome/descricao/publico-alvo/criterios/prazo/custo | Sempre rotulados; missing gera Nao informado da UI |
| Nome popular | Omitido se missing |
| Documentos | Nome integral; escolha explicita Obrigatorio/Opcional; null como atributo ausente |
| Etapas | Descricao integral e numero original do array normalizado; lacunas preservadas na leitura |
| Canais | Tipo traduzido ou atributo ausente; descricao integral |
| Agendamento | Sim/Nao explicitos; null como ausencia |
| Tipo de agendamento | Online, Presencial ou ambos; somente com Sim |
| Sistema de agendamento | Paraiba Digital ou Outro sistema ou site; somente com Sim |
| Link do agendamento | URL somente com Sim e sistema externo |
| Como o agendamento sera exibido? | Dentro do Paraiba Digital ou Em uma nova pagina; somente com Sim e sistema externo |
| Orientacoes de agendamento | Texto opcional somente com Sim; Nao/null omite mesmo com valor armazenado |
| Adicionais | Secao omitida se missing |

Lista sem nome/descricao util mostra ausencia, sem declarar dispensa de exigencia.
Itens de edicao sem texto sao filtrados da lista apresentada, com aviso separado
de incompletude. Documento/canal com texto e atributo null permanece visivel.
Etapa vazia intercalada nao provoca renumeracao do subconjunto; ol/li value usa
ordem de origem e aviso. Campos de agendamento inativos sao preservados somente na sessao,
sem mudar resposta ou criar gate novo.

Configuracoes de agendamento so se aplicam com `exigeAgendamento === true`. Tipo de
agendamento (Online, Presencial ou ambos) e Sistema de agendamento (Paraiba Digital ou
Outro sistema ou site) sao obrigatorios nesse estado. Link do agendamento e Como o
agendamento sera exibido? sao obrigatorios e visiveis somente para Outro sistema ou
site. Dentro do Paraiba Digital mantem o cidadao na experiencia; Em uma nova pagina
redireciona para a URL externa. Paraiba Digital identifica agendamento pelo proprio
sistema, sem link ou forma de exibicao externa.

Ao mudar para Nao/nao informado ou de Outro sistema ou site para Paraiba Digital,
preservar valores previamente preenchidos na mesma sessao, conforme o padrao da 007, sem
apagar silenciosamente. Valores inativos nao sao exibidos, validados como obrigatorios
nem transferidos como configuracao ativa; ao retornar a condicao correspondente, ficam
disponiveis para revisao.

Previa permanece acessivel com Carta parcial; mostrar pendencias dos campos ativos e
identificar sistema/tipo/exibicao em linguagem simples. Nao renderizar iframe nem abrir
o link para executar agendamento aqui.

## Tipos e seletor puro: codigo base

```ts
// src/features/carta/carta.preview.ts
import type { CartaServico, TipoCanal } from "./carta.types";

export type PreviewText = { status: "present"; text: string } | { status: "missing" };
export type CartaPreviewModel = {
  hasContent: boolean;
  identificacao: { nome: PreviewText; nomePopular: PreviewText; descricao: PreviewText; publicoAlvo: PreviewText };
  requisitos: {
    criterios: PreviewText;
    documentos: readonly { id: string; nome: string; obrigatorio: boolean | null }[];
    incompleteDocuments: number;
  };
  etapas: readonly { id: string; ordem: number; descricao: string }[];
  incompleteSteps: number;
  atendimento: {
    prazo: PreviewText; custo: PreviewText;
    canais: readonly { id: string; tipo: TipoCanal | null; descricao: string }[];
    incompleteChannels: number;
    exigeAgendamento: boolean | null;
    orientacaoAgendamento: PreviewText;
    tiposAgendamento: readonly ("online" | "presencial")[];
    sistemaAgendamento: CartaServico["atendimento"]["sistemaAgendamento"];
    linkAgendamento: PreviewText;
    exibicaoAgendamento: CartaServico["atendimento"]["exibicaoAgendamento"];
    showSchedulingGuidance: boolean;
    showExternalScheduling: boolean;
  };
  informacoesComplementares: PreviewText;
};

const hasText = (value: string) => value.trim().length > 0;
const present = (value: string): PreviewText =>
  hasText(value) ? { status: "present", text: value } : { status: "missing" };

export function criarPreviaDaCarta(carta: CartaServico): CartaPreviewModel {
  const identificacao = {
    nome: present(carta.identificacao.nome), nomePopular: present(carta.identificacao.nomePopular),
    descricao: present(carta.identificacao.descricao), publicoAlvo: present(carta.identificacao.publicoAlvo),
  };
  const documentos = carta.requisitos.documentos.filter((item) => hasText(item.nome)).map((item) => ({ ...item }));
  const etapas = carta.etapas.filter((item) => hasText(item.descricao)).map((item) => ({ ...item }));
  const canais = carta.atendimento.canais.filter((item) => hasText(item.descricao)).map((item) => ({ ...item }));
  const criterios = present(carta.requisitos.criterios);
  const prazo = present(carta.atendimento.prazo);
  const custo = present(carta.atendimento.custo);
  const orientacao = present(carta.atendimento.exigeAgendamento === true ? carta.atendimento.orientacaoAgendamento : "");
  const adicionais = present(carta.informacoesComplementares);
  const scheduling = carta.atendimento.exigeAgendamento;
  const texts = [...Object.values(identificacao), criterios, prazo, custo, orientacao, adicionais];
  return {
    hasContent: texts.some((value) => value.status === "present") || documentos.length > 0 ||
      etapas.length > 0 || canais.length > 0 || scheduling !== null,
    identificacao,
    requisitos: { criterios, documentos,
      incompleteDocuments: carta.requisitos.documentos.length - documentos.length },
    etapas, incompleteSteps: carta.etapas.length - etapas.length,
    atendimento: {
      prazo, custo, canais,
      incompleteChannels: carta.atendimento.canais.length - canais.length,
      exigeAgendamento: scheduling, orientacaoAgendamento: orientacao,
      tiposAgendamento: scheduling === true ? [...carta.atendimento.tiposAgendamento] : [],
      sistemaAgendamento: scheduling === true ? carta.atendimento.sistemaAgendamento : null,
      linkAgendamento: present(scheduling === true && carta.atendimento.sistemaAgendamento === "externo" ? carta.atendimento.linkAgendamento : ""),
      exibicaoAgendamento: scheduling === true && carta.atendimento.sistemaAgendamento === "externo" ? carta.atendimento.exibicaoAgendamento : null,
      showSchedulingGuidance: scheduling === true,
      showExternalScheduling: scheduling === true && carta.atendimento.sistemaAgendamento === "externo",
    },
    informacoesComplementares: adicionais,
  };
}
```

Codigo pressupoe contrato v2, sem fallback para false legado: decoder da 007
faz isso antes. Nao sort/renumerar aqui; array/ordem ja sao normalizados pelo
reducer/decoder. Copias de itens sao dados derivados somente leitura, nao segunda
Carta editavel. Declarar tipos readonly para impedir mutacao pelos componentes.

## Conteudo editorial proposto

```ts
// src/content/pages/previa-carta.ts — copy sujeita a validacao
export const previaCartaContent = {
  title: "Prévia da Carta de Serviços",
  introduction: "Confira as informações preparadas. O cadastro e a publicação no Paraíba Digital continuam manuais.",
  cardTitle: "Informações da Carta",
  empty: "Você ainda não preencheu as informações da Carta.",
  missing: "Não informado",
  reviewNotice: "Revise os dados com o setor responsável. Esta prévia não representa aprovação pela GESED nem garantia de aceite na plataforma oficial.",
  requiredFailed: "Não foi possível verificar as pendências de preenchimento. Os dados continuam disponíveis para revisão e edição.",
  incompleteDocuments: "Há itens de documentos sem nome. Revise a lista no formulário.",
  incompleteSteps: "Há etapas sem descrição. Os números das etapas preenchidas foram preservados.",
  incompleteChannels: "Há canais sem descrição. Revise a lista no formulário.",
  documentClassificationMissing: "Classificação não informada",
  channelTypeMissing: "Tipo não informado",
  documentRequired: "Obrigatório", documentOptional: "Opcional",
  yes: "Sim", no: "Não",
  sections: { identificacao: "Identificação do serviço", requisitos: "Requisitos de acesso",
    etapas: "Etapas do serviço", atendimento: "Atendimento", adicionais: "Informações adicionais" },
  labels: { nome: "Nome do serviço", nomePopular: "Nome popular", descricao: "Descrição do serviço",
    publicoAlvo: "Público-alvo", criterios: "Critérios de acesso", documentos: "Documentos necessários",
    prazo: "Prazo", custo: "Custos", canais: "Canais de atendimento",
    exigeAgendamento: "Necessita de agendamento?", orientacaoAgendamento: "Orientações de agendamento",
    tiposAgendamento: "Tipo de agendamento", sistemaAgendamento: "Sistema de agendamento",
    linkAgendamento: "Link do agendamento", exibicaoAgendamento: "Como o agendamento será exibido?" },
  channelTypes: { online: "Online", presencial: "Presencial", telefone: "Telefone", email: "E-mail", outro: "Outro" },
  actions: {
    fill: { label: "Preencher Carta", href: "/formulario-carta" },
    edit: { label: "Editar informações", href: "/formulario-carta" },
    tutorial: { label: "Ver tutorial", href: "/tutorial-paraiba-digital" },
    help: { label: "Preciso de ajuda", href: "/ajuda" },
  },
  breadcrumb: [{ label: "Início", href: "/" }, { label: "Prévia da Carta" }],
} as const;
```

Avisos de sessao usam fonte editorial da 007, evitando texto contraditorio ou
mensagens duplicadas. Nao mostrar aviso como dado da Carta, nao incluir IDs
tecnicos na copy nem placeholders/exemplos como valores. Ausencia de required
nao muda reviewNotice para aprovado. Name ausente nunca vira titulo ficticio.

## Componentes e renderizacao segura

CartaPreview recebe model/copy, sem hooks de sessao/validacao/download; pagina
orquestra fonte e acoes. PreviewField concentra dt/dd e missing sem interpretar
HTML. Usar apenas nos de texto React; sem dangerouslySetInnerHTML, Markdown,
iframe, linkificacao ou imagem/link derivados de valores digitados.

```tsx
// src/components/carta/PreviewField.tsx
import type { PreviewText } from "../../features/carta/carta.preview";
export function PreviewField({ label, value, missing }: {
  label: string; value: PreviewText; missing: string;
}) {
  return (
    <div className="carta-preview__field">
      <dt>{label}</dt>
      <dd className={value.status === "present" ? "carta-preview__value" : "carta-preview__missing"}>
        {value.status === "present" ? value.text : missing}
      </dd>
    </div>
  );
}
```

Codigo base para a parte mais delicada da lista; completar demais secoes com
mesma semantica e contratos, sem criar componentes por bloco decorativo:

```tsx
// Dentro de CartaPreview({ model, content })
<section aria-labelledby="preview-etapas-title">
  <h3 id="preview-etapas-title">{content.sections.etapas}</h3>
  {model.etapas.length > 0 ? (
    <ol className="carta-preview__list">
      {model.etapas.map((item) => (
        <li key={item.id} value={item.ordem}>
          <p className="carta-preview__value">{item.descricao}</p>
        </li>
      ))}
    </ol>
  ) : <p>{content.missing}</p>}
  {model.incompleteSteps > 0 ? <p className="carta-preview__notice">{content.incompleteSteps}</p> : null}
</section>;
```

Renderizar tipo/sistema somente com showSchedulingGuidance; link/exibicao somente com
showExternalScheduling. Mapear enums para rotulos da 007. Para sistema interno,
identificar agendamento pelo proprio Paraiba Digital; para externo, explicar permanencia
na experiencia ou redirecionamento. Pendencias condicionais da 008 ficam fora dos
valores.

Estrutura completa de CartaPreview: article com h2 cardTitle; cinco sections
h3. Identificacao/requisitos/atendimento usam dl de campos, e listas de documentos/
canais dentro de dd para rotulo correspondente. Nome popular/adicionais omitidos
se missing. Etapas ol fica sob heading, com value original. Documentos/canais
mostram texto integral + atributo explicito ou mensagem de atributo ausente.
Avisos de incompletude e agendamento ficam fora da string de valor; nao hidden
nem conteudo que precisa aceitar/fechar para ler dados.

Rotulos/atributos sao copy; textos digitados recebem white-space:pre-wrap.
Numero de etapa e dado de ordem; nao colocar indice filtrado como numero.
Se article for reutilizado mais de uma vez na pagina, IDs de headings precisam
prefixo unico/useId; no escopo atual existe somente um cartao.

## Pagina, estados e integracao

```tsx
// Esqueleto de PreviaCartaPage; imports conforme entrega dos contratos.
export function PreviaCartaPage() {
  const session = useCartaSession();
  const navigate = useAppNavigate();
  const model = criarPreviaDaCarta(session.carta);
  const required = validarCartaObrigatoria(session.carta);
  const content = previaCartaContent;
  return (
    <div className="previa-page">
      <Breadcrumb items={content.breadcrumb} />
      <PageHeader title={content.title} description={content.introduction} />
      <CartaSessionNotice recovery={session.recovery} storage={session.storage} />
      {model.hasContent ? (
        <>
          <p>{content.reviewNotice}</p>
          {required.status === "failed" ? <p>{content.requiredFailed}</p> : (
            <ValidationSummary run={required} context="preview" />
          )}
          <CartaPreview model={model} content={content} />
          <div className="previa-actions">
            <ButtonLink href={content.actions.edit.href} onNavigate={navigate}>
              {content.actions.edit.label}
            </ButtonLink>
          </div>
        </>
      ) : (
        <div className="previa-empty">
          <p>{content.empty}</p>
          <ButtonLink href={content.actions.fill.href} onNavigate={navigate}>
            {content.actions.fill.label}
          </ButtonLink>
        </div>
      )}
      <div className="previa-actions">
        <ButtonLink href={content.actions.tutorial.href} variant="secondary" onNavigate={navigate}>
          {content.actions.tutorial.label}
        </ButtonLink>
      </div>
    </div>
  );
}
```

Esqueleto depende de componentes planejados, ainda nao existentes: adaptar
contratos concretos sem copiar imports inexistentes como implementacao pronta.
CartaSessionNotice e adaptador pequeno da fonte de avisos da 007, nao decoder
novo; se avisos ja forem comuns, reutilizar. ValidationSummary deve ter contexto
preview sem auto-focus em atualizacao/montagem. Na 008 esse contrato ainda era
descrito em prosa: fechar props run/context/labels/destinos na revisao conjunta.
Nao duplicar requiredFailed no resumo e na pagina.

Provider inicializacao sincronica proposta na 007 nao exige loading. Se contrato
mudar para hidratacao assincrona, inserir ramo de carregamento antes do empty,
sem afirmar dados ausentes enquanto recupera. Provider ausente e erro de integracao,
nao motivo para criar Carta inicial independente. Derivacao por render e atual;
useMemo apenas se custo medido justificar, sempre dependente de carta atual.

Em estado vazio, nao renderizar cartao com cinco erros como unica apresentacao;
tutorial/ajuda livres. Em partial/required failed, cartao/edicao/tutorial continuam
visiveis. Nenhum estado com dados e certificado de completude/veracidade.

## Retorno ao campo e navegacao

Reusar contratos da 002/007: useAppNavigate retorna funcao, ButtonLink com
onNavigate, Breadcrumb usa mesmo contexto. Preservar href real, modificadores,
nova aba/historico e memoria sem reload; nao criar router paralelo ou expor
previa no menu automaticamente. Titulo/foco de rota pertencem ao shell.

Resumo usa ValidationTarget fechado da 008, rotulo do registro da 007 e href
de correcao como /formulario-carta#carta-nome. A 007 abre parte/foca controle
apos render, valida fragmento e tem fallback para alvo removido; nao usa
querySelector de hash arbitrario. Fragmentos nao contem valores pessoais.
Atualizacao da Carta nao desloca foco ou transforma cartao inteiro em live region.
Ajuda /ajuda reutiliza shell quando acessivel; caso ausente, link local de copy
versionada. Acesso direto possui destinos explicitos sem history.back obrigatorio.

## Slot de exportacao: responsabilidade da 010

Quando ExportCsvAction real estiver entregue, integrar proximo das acoes de
edicao/tutorial conforme Figma. Contrato proposto: componente sem props de
CSV/validacao cacheada; consome provider e captura snapshot atual no clique,
validando esse mesmo snapshot com required da 008. Owns processing, trava,
blocked/failed/started e recursos browser. Mensagens ficam na fonte da 010.

Sem 010 funcional, omitir componente/import e registrar T012/CA12 pendentes;
nao renderizar botao simulando download. Se Carta vazia, omitir acao de exportacao;
quando parcial, acao real pode explicar pendencias, sem bloquear cartao/edicao.
Failed required bloqueia CSV, sugestoes/falha editorial nao bloqueiam. A 009
nao gera arquivo, nao limpa sessao nem afirma download salvo/publicacao.

## Arquivos e CSS estrutural candidato

| Arquivo futuro | Responsabilidade | Tarefas |
| --- | --- | --- |
| carta.preview.ts | Model/seletor puro e hasContent | T006 |
| content/pages/previa-carta.ts | Copy/labels/acoes/mapa de tipos | T007 |
| CartaPreview.tsx/PreviewField.tsx | Article/sections/dl/listas/texto seguro | T008 |
| PreviaCartaPage.tsx | Fonte/estados/required/links/slot 010 | T009–T012 |
| CSS escopado globals.css | Texto integral/reflow/foco | T013 |
| routes.tsx/mapa Figma | Manter referencia; atualizar so com consulta | T003 |
| Testes/verification.md/quickstart.md | Evidencias/roteiro sintetico | T014–T018 |

```css
.previa-page,
.carta-preview { min-width: 0; }
.carta-preview section { margin-block: var(--space-6); }
.carta-preview__field { min-width: 0; margin-block: var(--space-4); }
.carta-preview dt { font-weight: 700; }
.carta-preview dd { margin-inline-start: 0; margin-block-start: var(--space-2); }
.carta-preview__value { white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.7; }
.carta-preview__list { padding-inline-start: var(--space-6); }
.carta-preview__list li { min-width: 0; margin-block: var(--space-3); }
.carta-preview__notice,
.carta-preview__missing { overflow-wrap: anywhere; line-height: 1.6; }
.previa-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); margin-block: var(--space-6); }
.previa-actions .button-link { max-width: 100%; white-space: normal; overflow-wrap: anywhere; }
```

CSS e proposta estrutural de coluna natural, nao medidas homologadas. Nao
usar altura fixa, ellipsis, resumo do valor, overflow global escondido ou CSS
columns que altere sequencia. Inter/fallback e tokens existentes; cores/espacos/
assets finais somente apos Make/Design. Medir contraste/foco real e adaptar
header sticky para nao encobrir leitura/alvos; sem novo token por antecipacao.

## Testes futuros e rastreabilidade

Reusar Vitest/jsdom/Testing Library da 007/008 se implementados; nao instalar
framework apenas para contar labels. Testes significativos de hasContent,
identidade/ausencia/pureza e atualizacao/jornada justificam suite compartilhada.

| CA | Evidencia esperada | Tarefas |
| --- | --- | --- |
| CA01 | Rota/acao 007/URL/recarga livres | T009/T011/T016 |
| CA02 | Todos os 17 campos/listas/atributos integrais | T006/T008/T015 |
| CA03 | Edicao/retorno e provider atualizando pagina montada | T009/T016 |
| CA04 | Carta parcial com dados/ausencias e leitura livre | T006/T009/T016 |
| CA05 | Modelo vazio, IDs/atributos/ordens isolados sem cartao ficticio | T006/T014 |
| CA06 | Custo 0/gratuidade textual preservados; vazio distinto | T006/T014–T015 |
| CA07 | null/Sim/Nao e legado via decoder correto | T006/T014/T016 |
| CA08 | Texto ativo visivel; dados inativos somente na sessao; listas parciais | T006/T008/T014–T015 |
| CA09 | Ordem atual, numeros com lacunas e fonte intacta | T006/T014–T016 |
| CA10 | Editar/voltar com mesma Carta e memoria apenas | T011/T016 |
| CA11 | Required compartilhado/falha, sugestoes ignoradas sem gate | T010/T016 |
| CA12 | Exportacao real bloqueada so por required | T012/T016; depende 010 |
| CA13 | Sessao segura/recuperacao/memoria e vazio funcional | T009/T016 |
| CA14 | HTML/scripts/URLs em texto, sem execucao/requisicao remota | T008/T014–T015 |
| CA15 | Teclado/leitor, titulos/valores/listas/pendencias/foco | T013/T017 |
| CA16 | Textos/endereco longos, ampliacao/reflow sem corte | T013/T017 |
| CA17 | Copy/localidade, sem edicao/storage/envio/arquivo HTML/PDF | T007/T018 |
| CA18 | Consulta visual/estados e divergencias resolvidas | T003/T013/T017–T018 |
| CA19 | Configuracoes apenas quando ativas; tipos/sistema com Sim e URL/exibicao somente externo; ausencias ativas identificadas e fonte preservada em troca/restauracao/recarga | T002/T006/T008/T010/T014–T016 |

Fixtures congeladas: inicial, false v2 isolado, nome popular/como agendar
isolados, itens vazios/atributos sem texto, custo 0, documento/canal null,
etapa vazia entre duas preenchidas, resposta Nao/null com orientacao, markup e
espacos/CR/LF/CRLF. Conferir fonte/IDs/arrays intactos e texto recuperado integral.
Incluir Online/Presencial/ambos; Sim sem tipos/sistema; Paraiba Digital com
URL/exibicao retidas; externo com URL/exibicao preenchidas ou ausentes e
ambas as formas de exibicao. Troca/restauracao nao modifica a fonte ou
mostra campos inativos; missing de campo ativo permanece identificavel.
Conferir rotulos versionados e significados de permanencia/redirecionamento,
sem mostrar enums tecnicos crus ou executar o fluxo descrito.
No rendering de markup sintetico, nenhuma tag/imagem/script/anchor ou requisicao
derivada da entrada deve surgir. Ler numeração real de li.value, nao apenas contar itens.

Integracao: formulario/provider reais, navegar/retornar/recarregar, storage
bloqueado, recuperacao partial/unrecoverable, required failed e correcao em parte
oculta. Placeholders permanecem pendentes, nao stubs aceitos como jornada pronta.
Com previa montada, trocar resposta/sistema, reativar e recarregar; comparar
valores preservados e configuracoes apresentadas. Required atual da 008
retira pendencias inativas sem apagar dados; parte apenas fechada continua
com campos aplicaveis. URL permanece texto, sem iframe/anchor ativo.

Manual conforme 016: Chrome/Edge/Firefox/Safari, NVDA desktop e VoiceOver iOS
quando disponiveis; 1440/1024/768/390/320 px/intermediarias, texto 200%, zoom/reflow,
fonte fallback, endereco sem espacos e teclado virtual. Registrar ambientes/
versoes/contraste/defeitos/retestes, sem generalizar emulacao a tecnologia assistiva real.

Apos codigo: npm run typecheck, npm run build e suite configurada; regressao
dos componentes comuns alterados. verification.md registra commit/data/CA/
ambiente/passos/resultado/evidencia/reteste; quickstart.md explica fixtures e
roteiro. Nenhum build/teste funcional executado nesta etapa documental.

## Pendencias e ordem futura

1. Concluir T001–T003 com ERS, copy validada, Design/Make e contratos concretos
   de provider/required/resumo/foco/exportacao. Manter notas de ausencia historica claras.
2. Atualizar este plano e executar T005 `/spec:validar 009-previa-html`.
3. `/spec:implementar`: T006–T008 seletor/conteudo/cartao seguro, depois
   T009–T011 integracao real/falhas/links; T012 apenas com 010 pronta.
4. T013 estilos com referencia confirmada; T014–T018 testes/checks/evidencias.

Figma sem conexao bloqueia fechamento visual; ERS/editorial permanecem
pendentes. Falta de 007/008/010 e destinos reais impede aceite integrado;
nao absorver implementacao das features ausentes nem declarar conformidade por
criar este plano. A publicacao/recarga fora do Vite depende do fallback de deploy.

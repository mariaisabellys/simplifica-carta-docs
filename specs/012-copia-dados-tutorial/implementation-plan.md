# Implementation Plan: Copia de dados no tutorial

## Objetivo e status

Preparado em 2026-10-05 para `/spec:plano-implementacao
012-copia-dados-tutorial`; o comando recebido como `/spec:plano-implentacao`
foi interpretado conforme a constitution.

Entregar copia individual dos 17 campos previstos da Carta em
`/tutorial-paraiba-digital`, com texto selecionavel, sucesso verdadeiro por
campo, tratamento de corridas e alternativa manual independente do clipboard.
Sem gate de obrigatorios, sugestoes, diagnostico, previa ou exportacao CSV.

**Implementacao parcial em 2026-10-05: utilitario de clipboard e testes isolados
entregues; integracao/interface pendentes.** Evidencias em verification.md.
O inventario abaixo registra a preparacao do plano, anterior a esta entrega.

**Plano tecnico documental pendente de Figma, conferencia do PDF do ERS,
validacao editorial/cruzada e contratos reais 007/011.** Nao declara clipboard
testado ou aceite. Esta etapa cria o plano e aplica a revisao documental
explicita de T002; nao altera src, instala bibliotecas, marca tarefas ou
acessa a area de transferencia do usuario.

## Fontes consultadas e inventario

- Spec/plan/tasks 012 lidos nesta etapa; planos detalhados 007/009/010/011
  consultados nesta conversa para modelo v2, listas, sessao e composicao.
- Contexto local de README/manual textual, MVP/fluxos/arquitetura, constitution,
  regras para IA e estrategia de implementation-plan das etapas anteriores.
- Mapa Figma/tokens locais e plano 016; contrato de clipboard reutilizavel
  do plan 015, consultado nesta etapa.
- Tipos/storage da Carta, pagina/conteudo do tutorial, inventario src e
  package.json; busca de clipboard/writeText/execCommand/seletores em src.
- [Clipboard API — W3C, writeText](https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext)
  e [textarea — HTML Standard](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element),
  consultados em 2026-10-05. Clipboard e operacao assincrona, sujeita a contexto/
  permissoes; textarea possui comportamento proprio de quebras de linha.

Referencias tecnicas nao comprovam permissao/resultado em dispositivo real.
PDF ERS nao extraido; Figma nao consultado via MCP (sem ferramenta Figma exposta
na sessao); nenhum teste funcional ou build executado. Nao usar documento
como evidencia de clipboard gravado, colagem ou cadastro externo.

| Area | Estado em src | Dependencia |
| --- | --- | --- |
| Modelo | Sem nome popular/como agendar/null/IDs | Tipos/decoder v2 da 007 |
| Storage | Helpers iniciais, sem provider/recuperacao robusta | Provider unico da 007 acima das rotas |
| Tutorial | Tres PlaceholderCards | Pagina/composicao real da 011 |
| Copia | Sem writeText, utilitario, hook ou componentes | T008–T012 |
| Navegacao | ButtonLink pode recarregar; contrato interno ainda planejado | 002/003 para preservar memoria |
| Tests | Sem framework/script test | Reusar suite 007/011 ou configurar na implementacao |
| Fonte editorial externa | Ainda pendente na 011 | Nao inventar nomes de campos externos na 012 |

Notas de ausencia das specs 007–011 na spec original sao historicas; suas
pastas existem e nao equivalem a entrega funcional. Nao criar provider local,
ler storage na copia ou inicializar segunda Carta para contornar dependencias.

## Revisao documental aplicada nesta etapa

Conforme T002, RF03/CA03/CA06 da spec 012 foram revisados explicitamente:

- Adicionado `atendimento.orientacaoAgendamento` apos tipo, sistema, link e
  exibicao de agendamento, conforme a ordem atual dos 17 campos.
- null e ausente; false so gera Não como resposta explicita do modelo v2.
  false legado nao confirmado passa por migracao da 007, sem inferencia por
  existencia de outros campos preenchidos.
- Texto util de listas parciais preservado, atributos null nao inventados;
  etapas mantem numero da sequencia normalizada e lacunas apos filtro.
- Conteudo significa texto util ou agendamento true/false explicito;
  IDs, ordens e defaults nao bastam. Custo textual 0 permanece preenchido.

Registrada atualizacao no plan/tasks 012 e no plano detalhado 011. Nao marcar
T002 concluida antes da validacao cruzada. Esta revisao concilia proposta
documental, sem mudar modelo executavel ou aprovar contratos ainda ausentes.

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

Copia individual passa a 17 campos; inserir IDs tipo-agendamento, sistema-agendamento,
link-agendamento e exibicao-agendamento imediatamente depois de agendamento, antes de
como-agendar. Nao oferecer copia para campos inativos, mesmo com valores armazenados.
Tipos ativos usam Online e/ou Presencial separados por LF; sistema/exibicao usam rotulos
da 007. Copia segue independente de validacao global, conforme contrato existente.

## Contrato dos 17 campos e convencoes

| Ordem | ID estavel | Fonte / regra |
| --- | --- | --- |
| 1 | nome | identificacao.nome, texto integral |
| 2 | nome-popular | identificacao.nomePopular, opcional |
| 3 | descricao | identificacao.descricao |
| 4 | publico-alvo | identificacao.publicoAlvo |
| 5 | documentos | requisitos.documentos, LF entre itens com nome util |
| 6 | criterios | requisitos.criterios |
| 7 | canais | atendimento.canais, LF entre itens com descricao util |
| 8 | prazo | atendimento.prazo |
| 9 | custos | atendimento.custo, inclusive 0 |
| 10 | agendamento | true Sim, false explicito Não, null missing |
| 11 | tipo-agendamento | Online, Presencial ou ambos em LF; somente com Sim |
| 12 | sistema-agendamento | Paraíba Digital ou Outro sistema ou site; somente com Sim |
| 13 | link-agendamento | URL somente com Sim e sistema externo |
| 14 | exibicao-agendamento | Dentro do Paraíba Digital ou Em uma nova página; somente com Sim e sistema externo |
| 15 | como-agendar | atendimento.orientacaoAgendamento, opcional somente com Sim |
| 16 | etapas | ordem de origem + ponto/espaco + descricao, LF entre itens |
| 17 | adicionais | informacoesComplementares |

Strings usam trim somente para detectar ausencia; retornar texto original.
Documento recebe ` (Obrigatório)`/` (Opcional)` apenas se escolha explicita;
null preserva nome. Canal informado recebe tipo traduzido + `: ` + descricao;
null preserva somente descricao. Mapa versionado: Online, Presencial, Telefone,
E-mail, Outro. Preservar ordem documentos/canais; nao sort/renumerar etapas.
LF separa itens, quebras internas permanecem; split por LF nao reconstrui listas.

Seletor retorna present com text ou missing sem text. IDs/rotulos/avisos/
mensagens/exemplos nao entram no texto. Nao usar CSV/BOM/aspas/apostrofo de
protecao, JSON, HTML interpretado ou DOM innerText do card. Campo com HTML
literal e mostrado e enviado como string. 011 referencia estes IDs/ancoras;
nenhuma correspondencia com campos externos e homologada pela 012.

Avisos opcionais de item parcial/agendamento em revisao ficam fora do dado,
com chaves editoriais tipadas. Reusar diagnostico puro da 009 se identico;
nao importar view model visual ou motor required para decidir copia.

## Tipos e seletor puro: codigo base

Pressupoe CartaServico v2/TipoCanal da 007; completar imports reais. Nao
aplicar em dados brutos de storage; decoder rejeita/recupera tipos antes.

```ts
// src/features/carta/carta.transfer.types.ts — contrato neutro importado pela 011
export type CartaTransferFieldId =
  | "nome" | "nome-popular" | "descricao" | "publico-alvo"
  | "documentos" | "criterios" | "canais" | "prazo" | "custos"
  | "agendamento" | "tipo-agendamento" | "sistema-agendamento"
  | "link-agendamento" | "exibicao-agendamento" | "como-agendar" | "etapas" | "adicionais";
export type TransferField =
  | { id: CartaTransferFieldId; status: "present"; text: string }
  | { id: CartaTransferFieldId; status: "missing" };
export const transferAnchor = (id: CartaTransferFieldId) => `carta-copia-${id}`;

// src/content/transfer/copia-carta.ts — convencoes versionadas
export const transferConventions = {
  yes: "Sim", no: "Não", required: "Obrigatório", optional: "Opcional",
  channels: { online: "Online", presencial: "Presencial", telefone: "Telefone",
    email: "E-mail", outro: "Outro" },
} as const;

// src/features/carta/carta.transfer.ts — importar tipos e conventions
const hasText = (value: string) => value.trim().length > 0;
const field = (id: CartaTransferFieldId, text: string): TransferField =>
  hasText(text) ? { id, status: "present", text } : { id, status: "missing" };
export function criarCamposDeTransferencia(carta: CartaServico): readonly TransferField[] {
  const c = transferConventions;
  const documentos = carta.requisitos.documentos.filter(d => hasText(d.nome))
    .map(d => d.nome + (d.obrigatorio === null ? "" :
      ` (${d.obrigatorio ? c.required : c.optional})`)).join("\n");
  const canais = carta.atendimento.canais.filter(a => hasText(a.descricao))
    .map(a => a.tipo === null ? a.descricao : `${c.channels[a.tipo]}: ${a.descricao}`)
    .join("\n");
  const etapas = carta.etapas.filter(e => hasText(e.descricao))
    .map(e => `${e.ordem}. ${e.descricao}`).join("\n");
  const agendamento = carta.atendimento.exigeAgendamento;
  const fields: TransferField[] = [
    field("nome", carta.identificacao.nome),
    field("nome-popular", carta.identificacao.nomePopular),
    field("descricao", carta.identificacao.descricao),
    field("publico-alvo", carta.identificacao.publicoAlvo),
    field("documentos", documentos), field("criterios", carta.requisitos.criterios),
    field("canais", canais), field("prazo", carta.atendimento.prazo),
    field("custos", carta.atendimento.custo),
    field("agendamento", agendamento === null ? "" : agendamento ? c.yes : c.no),
    field("tipo-agendamento", agendamento === true ? formatarTiposAgendamento(carta.atendimento.tiposAgendamento) : ""),
    field("sistema-agendamento", agendamento === true ? formatarSistemaAgendamento(carta.atendimento.sistemaAgendamento) : ""),
    field("link-agendamento", agendamento === true && carta.atendimento.sistemaAgendamento === "externo" ? carta.atendimento.linkAgendamento : ""),
    field("exibicao-agendamento", agendamento === true && carta.atendimento.sistemaAgendamento === "externo" ? formatarExibicaoAgendamento(carta.atendimento.exibicaoAgendamento) : ""),
    field("como-agendar", agendamento === true ? carta.atendimento.orientacaoAgendamento : ""),
    field("etapas", etapas), field("adicionais", carta.informacoesComplementares),
  ];
  const scheduleIds = new Set(["tipo-agendamento", "sistema-agendamento", "link-agendamento", "exibicao-agendamento", "como-agendar"]);
  const externalIds = new Set(["link-agendamento", "exibicao-agendamento"]);
  return fields.filter(item => (!scheduleIds.has(item.id) || agendamento === true) &&
    (!externalIds.has(item.id) || carta.atendimento.sistemaAgendamento === "externo"));
}
```

Exemplo sintetico: documento Identidade/null vira Identidade; canal null com
descricao util preserva descricao; etapas 1 e 3 viram `1. Solicitar\n3. Receber`;
agendamento null e missing, false v2 e Não mesmo sem outros textos. Orientacao
com texto e resposta null permanece na sessao, sem campo visivel ou acao de copia.
Nenhuma mutacao da fonte.

Formatadores compartilhados propostos: `formatarTiposAgendamento` seleciona
Online/Presencial na ordem fixa, separados por LF; `formatarSistemaAgendamento` mapeia
paraiba-digital/externo para Paraíba Digital/Outro sistema ou site;
`formatarExibicaoAgendamento` mapeia dentro-paraiba-digital/nova-pagina para Dentro do
Paraíba Digital/Em uma nova página. null/lista vazia retornam "". Sao funcoes puras com
rotulos versionados, sem inferencia ou execucao externa.

Ao ocultar campos por alteracao de resposta/sistema, desmontar seus controles de copia,
cancelar timers e ignorar conclusoes de requests antigos. Valores continuam na Carta;
nao reexibir confirmacao anterior quando o campo voltar a ser ativo. A cobertura maxima
e 17 campos; a lista visivel respeita aplicabilidade, distinguindo campo ativo ausente
de campo inativo.

## Operacao browser e limites do clipboard

Utilitario neutro em src/lib/clipboard.ts pode ser reutilizado pela 015 para
endereco institucional, sem importar tipos/provider/conteudo da Carta.
Chamar writeText dentro do handler explicito, antes de qualquer await/timer;
sem Permissions API como requisito, sem readText ou fallback execCommand.

```ts
// src/lib/clipboard.ts
export type CopyResult =
  | { status: "success" }
  | { status: "failed"; reason: "unavailable" | "write-failed" };
export async function copiarTexto(text: string): Promise<CopyResult> {
  try {
    if (!window.isSecureContext || typeof navigator.clipboard?.writeText !== "function") {
      return { status: "failed", reason: "unavailable" };
    }
    await navigator.clipboard.writeText(text);
    return { status: "success" };
  } catch {
    return { status: "failed", reason: "write-failed" };
  }
}
```

Resolver promise confirma somente operacao de copia daquela tentativa.
Nao confirma colagem/publicacao, conteudo atual permanente do clipboard nem
cancelamento de gravacao anterior. Produto nao le area de transferencia.
Texto passado a writeText permanece integral, sem normalizacao pelo app;
browser/sistema/destino podem normalizar quebras. Registrar comportamento
real por ambiente; nao prometer igualdade de bytes em qualquer aplicativo.

Textarea readOnly recebe a mesma string derivada usada pelo handler, mas seu
valor DOM normaliza quebras CR/CRLF conforme HTML. Nao usar textarea.value
como fonte nem teste de igualdade literal de DOM para essas quebras. Testar
separadamente string original/parametro API e exibicao/alternativa manual.
Essa limitacao de representacao precisa ser conciliada em /spec:validar com
exigencia de preservacao; fonte e string enviada continuam intactas. Se aceite
exigir bytes identicos na copia manual, revisar controle/contrato antes do codigo.

## Estados, revisoes, trava e operacao demorada

Estado logico por campo: idle/pending/copied/failed. Identidade inclui ID fixo
de campo, requestId monotono e revisao do texto transferivel. Nenhuma copia
no mount/efeito, nenhuma gravacao concorrente no mesmo campo enquanto promise
anterior nao terminar. Campos distintos independentes; ultima gravacao efetiva
no sistema pode depender da ordem de resolucao, nao so da ordem dos cliques.

| Evento | Regra |
| --- | --- |
| Clique em present/idle ou retorno anterior | Capturar texto/revisao; trava imediata por ref; pending |
| Clique enquanto promise pendente | Ignorar gravacao duplicada; manter texto manual |
| Promise resolve | Copied somente se montado e request/revisao atuais |
| Promise rejeita/indisponivel | Failed somente se tentativa ainda atual |
| Texto muda durante pending | Invalidar retorno/timer; preservar trava ate promise acabar |
| Texto A muda B e volta A | Revisao distinta; retorno da tentativa antiga nao e reaproveitado |
| 5 s apos sucesso | Idle se mesma tentativa/revisao; nao altera clipboard |
| 10 s ainda pending | Mensagem de demora/manual; trava permanece, sem timeout fingindo cancelamento |
| Unmount | Limpar timers, ignorar UI tardia; nao cancelar/repetir writeText |

Erro permanece ate mudanca/nova tentativa. Copiado! dura 5 segundos ou ate
mudanca/tentativa/desmontagem. Mensagem de demora apos 10 segundos e proposta
editorial; manual sempre acessivel. Se promise nunca terminar, campo permanece
travado nessa montagem; nao liberar para outra gravacao potencialmente concorrente.
Novo mount nao autoexecuta copia nem pode garantir cancelamento da antiga.

## Hook por campo: codigo base

```tsx
// src/features/carta/useFieldCopy.ts — imports React e copiarTexto
type Outcome = { status: "idle" } | {
  status: "copied" | "failed"; requestId: number; revision: number;
};
export function useFieldCopy(text: string | undefined) {
  const [outcome, setOutcome] = useState<Outcome>({ status: "idle" });
  const [pending, setPending] = useState(false);
  const [slow, setSlow] = useState(false);
  const mounted = useRef(false);
  const generation = useRef(0);
  const revision = useRef(0);
  const currentText = useRef(text);
  const requestId = useRef(0);
  const lock = useRef<number | null>(null);
  const successTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const slowTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const clearTimers = () => {
    clearTimeout(successTimer.current); clearTimeout(slowTimer.current);
  };
  useLayoutEffect(() => {
    mounted.current = true;
    generation.current += 1;
    return () => {
      mounted.current = false; generation.current += 1; clearTimers();
    };
  }, []);
  useLayoutEffect(() => {
    currentText.current = text;
    revision.current += 1;
    clearTimeout(successTimer.current);
    setOutcome({ status: "idle" });
    // Nao liberar lock nem cancelar timer de demora da tentativa ativa.
  }, [text]);
  const copiar = () => {
    if (lock.current !== null || text === undefined || currentText.current !== text) return;
    const id = ++requestId.current;
    const rev = revision.current;
    const gen = generation.current;
    lock.current = id;
    clearTimers(); setSlow(false); setPending(true); setOutcome({ status: "idle" });
    const sameMount = () => mounted.current && generation.current === gen;
    const current = () => sameMount() && requestId.current === id && revision.current === rev;
    slowTimer.current = setTimeout(() => {
      if (sameMount() && lock.current === id) setSlow(true);
    }, 10_000);
    // copiarTexto chama writeText sincronicamente ate seu primeiro await.
    void copiarTexto(text).then(result => {
      if (!current()) return;
      setOutcome({ status: result.status === "success" ? "copied" : "failed",
        requestId: id, revision: rev });
      if (result.status === "success") {
        successTimer.current = setTimeout(() => {
          if (current()) setOutcome({ status: "idle" });
        }, 5_000);
      }
    }).finally(() => {
      if (lock.current === id) lock.current = null;
      clearTimeout(slowTimer.current);
      if (sameMount()) { setPending(false); setSlow(false); }
    });
  };
  const status = pending ? "pending" :
    outcome.status !== "idle" && outcome.revision === revision.current ? outcome.status : "idle";
  return { status, slow, copiar };
}
```

copiarTexto tem contrato total (resolve resultado, inclusive falhas); se
dependencia injetada em testes puder rejeitar, completar catch defensivo antes
de finally sem gerar rejeicao nao tratada. Verificar hooks sob StrictMode;
generation invalida callbacks apos cleanup/remontagem simulada. Nao alterar
refs/estado em render para esconder stale outcome; layout effect invalida antes
de pintura, revisao distingue A/B/A. Campo missing continua montado com mesma
key ID para nao perder trava ao mudar o valor. IDs de key nunca incluem texto.

Timer de demora nao atualiza valor nem move foco. Feedback pending com texto
alterado deve informar que a tentativa em andamento usa valor anterior, sem
prometer que valor novo foi copiado; comparar revisao capturada em controlador
se UI precisar dessa variante. Base oferece mensagem generica de operacao.

## Conteudo e componentes: codigo base

```ts
// src/content/transfer/copia-carta.ts — copy candidata a validacao editorial
export const transferLabels: Record<CartaTransferFieldId, string> = {
  nome: "Nome do serviço", "nome-popular": "Nome popular do serviço",
  descricao: "Descrição do serviço", "publico-alvo": "Público-alvo",
  documentos: "Documentos necessários", criterios: "Critérios de acesso",
  canais: "Canais de atendimento", prazo: "Prazo", custos: "Custos",
  agendamento: "Necessita de agendamento?",
  "tipo-agendamento": "Tipo de agendamento", "sistema-agendamento": "Sistema de agendamento",
  "link-agendamento": "Link do agendamento", "exibicao-agendamento": "Como o agendamento será exibido?",
  "como-agendar": "Orientações de agendamento",
  etapas: "Etapas do serviço", adicionais: "Informações adicionais",
};
export const copyCartaContent = {
  title: "Informações para copiar", missing: "Não informado",
  empty: "Você ainda não preencheu as informações da Carta.",
  manualHint: "Você também pode selecionar o texto e copiar manualmente.",
  pending: "Copiando…", copied: "Copiado!",
  failed: "Não foi possível copiar. Selecione o texto e copie manualmente.",
  slow: "A cópia está demorando. Você pode selecionar o texto e copiar manualmente.",
  notice: "Confira os dados depois de colar. O cadastro e a publicação continuam manuais.",
  fill: "Preencher Carta", edit: "Editar informações",
  copyLabel: (label: string) => `Copiar ${label}`,
};
```

```tsx
// src/components/carta/CopyField.tsx — imports tipos/hook/conteudo
export function CopyField({ field }: { field: TransferField }) {
  const text = field.status === "present" ? field.text : undefined;
  const { status, slow, copiar } = useFieldCopy(text);
  const c = copyCartaContent;
  const label = transferLabels[field.id];
  const localId = useId();
  const labelId = `${localId}-label`, inputId = `${localId}-text`;
  const hintId = `${localId}-hint`;
  const message = status === "pending" ? slow ? c.slow : c.pending :
    status === "copied" ? c.copied : status === "failed" ? c.failed : "";
  return (
    <section className="carta-copy-field" aria-labelledby={labelId}>
      <h3 id={transferAnchor(field.id)} tabIndex={-1}>
        <span id={labelId}>{label}</span>
      </h3>
      {text !== undefined ? (
        <>
          <textarea id={inputId} aria-labelledby={labelId} aria-describedby={hintId}
            readOnly value={text} rows={5} wrap="soft" spellCheck={false} />
          <p id={hintId}>{c.manualHint}</p>
        </>
      ) : <p>{c.missing}</p>}
      <button type="button" onClick={copiar} disabled={text === undefined || status === "pending"}
        aria-label={c.copyLabel(label)}>
        {c.copyLabel(label)}
      </button>
      <p role="status" aria-live="polite" aria-atomic="true">
        {message ? `${label}: ${message}` : ""}
      </p>
    </section>
  );
}

// src/components/carta/CartaCopyFields.tsx — sem provider/clipboard paralelo
export function CartaCopyFields({ fields }: { fields: readonly TransferField[] }) {
  const c = copyCartaContent;
  const empty = !fields.some(field => field.status === "present");
  return (
    <div className="carta-copy-fields">
      {empty ? <p>{c.empty}</p> : null}
      <p>{c.notice}</p>
      {fields.map(field => <CopyField key={field.id} field={field} />)}
    </div>
  );
}
```

Regiao externa da 011 fornece h2 tutorial-dados, session notice e UMA acao
Preencher/Editar por hasContent. Nao duplicar link global vazio na 012 e na
011. Se CartaCopyFields for usado fora desse wrapper, passar slot de acao
documentado, mantendo hierarquia de heading ajustavel. A 011 e proprietaria
do layout/passo/fontes/link oficial; 012 nao importa pagina ou conteudo 011.

Sem foco automatico em sucesso/falha; preservar foco do botao e selecao manual.
Disabled nativo durante pending pode afetar foco em browsers: verificar retorno
e, se necessario, usar aria-disabled com handler guardado e explicacao sem
alterar trava. Live region curta por campo fica montada, nao tornar value live.
Nao duplicar anuncio da 012 em toast/live region da 011. Repeticao do mesmo
sucesso exige testar limpeza/anuncio por tentativa, sem texto pessoal no status.

Textarea nao disabled, sem edicao, truncamento ou ellipsis. Rolagem interna
permite texto integral; mobile/teclado devem conseguir selecionar e copiar
manualmente mesmo com API ausente. Nao selecionar tudo automaticamente ao
copiar ou concluir. Nome e estado de cada campo sao independentes.

## Figma, CSS e responsividade

Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2: localizar frame do tutorial e
regiao da copia junto da 011; ainda sem node identificado. Make
dVm7lEZdBFqOiiySWLWUqp, node 0:1: confirmar textarea, botao, focus/feedback,
tokens e estados missing/present/pending/copied/failed. Sem consulta MCP nesta
sessao. Nao usar card da entrada 003 como layout nem inventar figmaNodeId.
Atualizar mapa apos evidencia; sem necessidade de assets raster por antecipacao.

```css
/* globals.css: base semantica proposta, confirmar no Design/Make */
.carta-copy-fields { display: grid; gap: var(--space-6); min-inline-size: 0; }
.carta-copy-field { display: grid; gap: var(--space-3); min-inline-size: 0; }
.carta-copy-field p, .carta-copy-field h3 { margin: 0; overflow-wrap: anywhere; }
.carta-copy-field textarea {
  box-sizing: border-box;
  inline-size: 100%; min-inline-size: 0; max-inline-size: 100%;
  min-block-size: 7rem; resize: vertical;
  font: inherit; line-height: 1.5; padding: var(--space-3);
}
.carta-copy-field button {
  justify-self: start; max-inline-size: 100%; min-block-size: 2.75rem;
  white-space: normal; font: inherit;
}
.carta-copy-field [id^="carta-copia-"] {
  scroll-margin-block-start: calc(var(--sticky-header-offset, 0px) + var(--space-4));
}
```

Reusar tokens/Inter e variante de botao real, foco visivel com contraste medido;
nao usar ButtonLink para operacao clipboard. Texto/feedback com altura natural.
Offset sticky segue contrato de ancoras da 011/002, sem altura fixa presumida.

## Arquivos e sequencia

| Arquivo | Acao / tarefa |
| --- | --- |
| src/features/carta/carta.transfer.types.ts | IDs/TransferField/anchors neutros; T008 |
| src/features/carta/carta.transfer.ts | Seletor puro integral; T008 |
| src/lib/clipboard.ts | Operacao reutilizavel sem dependencia Carta; T009 |
| src/features/carta/useFieldCopy.ts | Requests/revisoes/trava/timers; T010 |
| src/content/transfer/copia-carta.ts | Labels/convencoes/avisos; T011 |
| src/components/carta/CopyField.tsx | Texto manual/acao/retorno; T011 |
| src/components/carta/CartaCopyFields.tsx | Lista de ate 17 campos, conforme aplicabilidade; T011 |
| Regiao TutorialCartaData e pagina da 011 | Fonte/hasContent/acao/avisos/anchors; T012 |
| src/styles/globals.css | Estados/reflow confirmados; T011 |
| Testes junto a seletores/helper/hook/componentes | T013–T015 |
| specs/012-copia-dados-tutorial/verification.md | Evidencia por CA/ambiente; T016/T017 |
| specs/012-copia-dados-tutorial/quickstart.md | Procedimento verificavel apos entrega; T017 |

T002 revisao documental registrada; T003/T004 possuem contrato/base aqui;
T005 visual/editorial pendente. Executar T007 validacao; implementar tipos/
seletor, clipboard, controlador, campos e integracao real. Reusar infraestrutura
007/011; se continuar ausente, configurar suite apropriada na implementacao,
conferindo versoes/docs oficiais antes de instalar. Nao instalar nesta etapa.

## Testes e evidencias futuras

Seletores com fixtures congeladas: modelo vazio/completo/parcial; 17 campos
e ordem; IDs/defaults/atributos isolados sem conteudo; 0; true/false v2/null;
false legado migrado pela 007; como agendar preservado; etapas 1/3; nomes/
descricoes com atributo null; Unicode/acentos/espacos/CR/LF/CRLF/HTML literal.
Conferir fonte/arrays inalterados e ausencia de IDs/avisos/rotulos/protecao CSV.

Hook com promises controladas e fake timers: resolve/reject/API ausente/
contexto inseguro; nenhum write ao montar; sucesso somente apos resolver;
duplo clique antes de re-render; outros campos independentes; resolucao fora
de ordem; alteracao pending e A/B/A; mesmo campo mantem trava ate terminar;
10 s demorado sem falso cancelamento; retry depois de falha; 5 s sucesso;
timer antigo nao apaga recente; unmount/remount/StrictMode ignoram UI tardia.
Testar novo texto missing mantendo identidade/controle de tentativa antiga.

Componente/integracao: parametro writeText e string derivada original exatamente
iguais; DOM exibido preserva texto visivel com normalizacao de quebras prevista
por HTML. HTML literal nao executa. Ausentes nao copiam mensagem; readOnly
selecionavel; falha conserva tutorial/outros campos/manual. Editar/retornar,
provider atualizado, memory-only/recovery seguro, sem gate e sem storage proprio.
Nao duplicar testes internos da 007: usar contrato real e testar consumidor.

| Ambiente HTTPS proposto | Evidencia exigida |
| --- | --- |
| Windows 11, Chrome/Edge/Firefox estaveis | Gesto real, colar fixture em destino controlado, rejeicao/manual e foco |
| macOS, Safari estavel | Mesmo procedimento e quebras observadas |
| iOS Safari; Android Chrome reais | Toque, selecao manual/texto longo e falha/API indisponivel |
| NVDA com Chrome/Firefox; VoiceOver/Safari | Nomes, foco, pending/copied/failed, repeticao sem anuncios duplicados |

Registrar sistema/dispositivo/browser/versoes, origem HTTPS, procedimento,
opcoes/permissoes observadas e destino de colagem de teste. Usar apenas dados
sinteticos; nao sobrescrever clipboard do usuario em testes automaticos fora
de contexto de teste controlado. Resultado real verificado por colagem manual
em aplicativo/control local, sem adicionar leitura de clipboard no produto.
Mocks nao comprovam permissao, selecao real ou resultado em sistema operacional.

Larguras 1440/1024/768/390/320 px e intermediarias, texto 200%, zoom 400% para
reflow desktop; fonte fallback, controles/rotulos longos, multitexto e URLs.
Medir foco/contraste e verificar selecao por teclado/toque, rolagem interna
sem overflow horizontal da pagina. Ambiente indisponivel permanece pendente.

verification.md futuro: revisao do produto, CA/tarefa, ambiente, procedimento,
resultado observado, defeito/reteste e pendencia; sem dados reais da Carta.
Executar typecheck/build e suite configurada apos codigo; checar reuso em 015
se realmente implementado. quickstart inclui 17 campos, convencoes, contexto
seguro, falhas/manual, demora e limites de confirmacao/normalizacao de quebras.

## Rastreabilidade e limites de aceite

| Criterios | Evidencia / tarefas |
| --- | --- |
| CA01–CA03 | Seletor/textos/API e listas; T008/T011/T013/T016 |
| CA04–CA06 | Modelo vazio/parcial, 0/respostas explicitas/como agendar; T002/T008/T013/T015 |
| CA07 | Falha verdadeira/manual/retry; T009–T011/T014–T016 |
| CA08–CA09 | Atualizacao/revisoes/requests/timers; T010/T014/T015 |
| CA10 | Fonte unica/recuperacao segura e memoria valida; T012/T015 |
| CA11–CA12 | Figma/foco/anuncios/selecao/reflow; T005/T011/T016 |
| CA13 | Texto literal/fonte integra; T008/T011/T013/T015 |
| CA14 | Acesso independente e ausencia de envio/storage; T012/T015/T017 |
| CA15 | Campos ativos/inativos, modalidades e troca/restauracao de sistema; T002/T008/T013/T015 |

Sem aceite integral enquanto ERS, Figma, validacao editorial/cruzada, contratos
reais ou ambientes obrigatorios estiverem pendentes. Revisao RF03/CA06 nao
comprova decoder/clipboard implementados. Nao limpar Carta/clipboard, criar
logs de valores, historico, segunda Carta, copia integral, arquivos ou automacao
externa. Sistema pode manter texto copiado apos fim da sessao do app.

## Proximo passo

Continuar a implementacao apos resolver V012-01 de validation.md (igualdade
literal da copia manual versus normalizacao de quebras do controle HTML) e
definir o escopo da trava ao ocultar/remontar um campo com writeText pendente.
O hook por instancia nao garante trava compartilhada entre instancias; nao
prometer cancelamento de uma escrita ja iniciada. Conferir contratos 007/011,
Figma, ERS e validacao editorial antes da interface. O utilitario isolado nao
depende dessas escolhas; T009 permanece parcial pelas dependencias T007/T004.
Nenhuma tarefa marcada concluida; resultados reais em verification.md.

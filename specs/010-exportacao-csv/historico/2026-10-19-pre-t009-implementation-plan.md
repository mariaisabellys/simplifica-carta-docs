# Implementation Plan: Exportacao CSV

> **Plano parcialmente superado:** substituir matriz e snippets v2 pelo
> contrato central v3 da 007 antes da implementação final.

## Status e objetivo

Preparado em 2026-10-05 para `/spec:plano-implementacao 010-exportacao-csv`.
O comando recebido como `/spec:plano-implentacao` foi interpretado como o
comando interno definido na constitution, sem criar um fluxo alternativo.

**Plano tecnico documental, pendente de consulta Figma, conferencia do PDF
do ERS, validacao editorial e conciliacao final de 007–009.** Nao declara
prontidao visual, compatibilidade comprovada ou criterios de aceite aprovados.
Esta etapa escreve somente este documento: nao altera src, instala dependencias,
marca tarefas ou executa a exportacao. Seguir com `/spec:validar` antes de codigo.

Entregar uma acao `Exportar CSV` em `/previa` que captura a Carta da sessao,
valida os obrigatorios e gera localmente o arquivo para cadastro manual.
Exportar preserva a Carta e permite editar, acessar tutorial e copiar campos.

## Fontes consultadas e inventario real

- `spec.md`, `plan.md` e `tasks.md` da 010; planos detalhados 007, 008 e 009.
- README e trechos de requisitos, exportacao, regras de negocio e desempenho
  de `Readme Manual de Levantamento de Serviços.md`.
- MVP, fluxos, arquitetura-sistema, ADR-002, constitution, regras para IA,
  `docs/implementation-plan.md` e ordem do roadmap em `specs/README.md`.
- Mapa Figma, resumo de tokens/componentes e plano transversal da 016.
- Tipos/schema/required/CSV da Carta, `lib/csv.ts`, `lib/validation.ts`, pagina
  da previa, `tokens.css`, inventario src e scripts de `package.json`.
- [CSV Injection — OWASP](https://community.owasp.org/attacks/CSV_Injection),
  consultado em 2026-10-05: escape e mitigacao de formulas sao responsabilidades
  distintas; protecao pode se perder ao salvar/reabrir e nao e universal.

PDF do ERS nao extraido nem conferido. O manual textual e fonte efetivamente
consultada, sem equivaler a leitura do PDF. Sem consulta MCP do Figma: nenhuma
ferramenta Figma esta exposta nesta sessao. Nenhum teste de browser/planilha foi
executado. Referencias abaixo sao locais e propostas, sem homologacao externa.

| Area | Estado em src | Dependencia para implementar |
| --- | --- | --- |
| Modelo | Sem nomePopular/orientacaoAgendamento; escolhas booleanas sem null; listas sem IDs | Modelo v2/decoder da 007 |
| Sessao | Helper inicial; provider unico ainda ausente | CartaSessionProvider/useCartaSession da 007 |
| Required | Retorna array de campo/mensagem | ValidationRun complete/failed da 008 |
| Serializador | Virgula/LF; quoting condicional, nao cobre CR isolado | Contrato CRLF/quoting abaixo |
| Mapeamento CSV | Oito registros; omite listas e novos campos | Cobertura integral dos 17 registros |
| Previa | PageHeader/PlaceholderCard | Pagina e slot real da 009 |
| Download/hook/UI | Ausentes | T010–T013 da 010 |
| Testes | Sem suite/script test | Reusar infraestrutura futura 007/008 ou configurar em /spec:implementar |

Existencia de specs, rotas e helpers nao comprova funcionamento. Notas de
ausencia de 011/016 na spec original sao historicas; ambas possuem documentos.

Atualizacao em `/spec:implementar 010-exportacao-csv`, 2026-10-05: implementada
somente a parte independente e nao visual do serializador generico em
src/lib/csv.ts, com quoting integral/escape/CRLF e testes no runner nativo
Node. Essa parte possui contrato fechado e nao precisa do modelo/provider,
politica de formulas ou referencias visuais para ser verificada isoladamente.
T009 permanece parcial: mapeamento/artefato completo ainda dependem de T007/T008.
Nenhuma interface foi implementada e nenhuma dependencia institucional foi
declarada encerrada. Resultados reais e limites em verification.md.

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

CSV continua com duas colunas campo/valor, agora 17 registros fixos: manter os 13
existentes e inserir tipos_agendamento, sistema_agendamento, link_agendamento e
exibicao_agendamento imediatamente depois de exige_agendamento, antes de
orientacao_agendamento. Campos inativos geram valor vazio; tipos ativos usam Online e/ou
Presencial separados por LF, nesta ordem. Sistema/exibicao usam rotulos da 007.
Validacao compartilhada da 008 impede exportacao se configuracoes obrigatorias ativas
estiverem ausentes/invalidas.

## Referencias visuais e verificacao pendente

| Fonte | Referencia a consultar via MCP | Estado |
| --- | --- | --- |
| Design | fileKey YaVUdqYa3boHpvGrxf4ZJ5; pagina 167:2; referencia 821:308 | Mapa local: card-servico-completo; acao/estados nao confirmados |
| Make | fileKey dVm7lEZdBFqOiiySWLWUqp; node 0:1 | Tokens/componentes nao confirmados nesta etapa |

Antes dos estilos, localizar frame completo da previa e acao, registrar nodes
adicionais, hierarquia, medidas, alinhamento com Editar/tutorial, variantes de
estado, foco, contraste e reflow. Confirmar tokens de botao e feedback no Make.
Atualizar mapa somente com evidencia. Se os estados nao existirem no Figma,
registrar a lacuna e validar a proposta sem apresenta-la como output do Figma.
Nao exportar assets por antecipacao: esta acao pode usar texto/botao sem imagem.

CSS e JSX abaixo definem base semantica proposta. Inter e fallbacks seguem a
decisao local; cores de foco/acao existentes precisam de medicao, conforme 016.

## Contratos e regras de integracao

1. Entrada: `CartaServico` v2 da 007, decodificada/normalizada no provider.
   Acrescenta nomePopular, orientacaoAgendamento e escolhas explicitamente
   nullable. A 010 nao migra dados nem transforma false legado em resposta.
2. Snapshot: copiar grupos e todos os itens ao iniciar; nao usar DOM, storage,
   resultados editoriais ou previa derivada como fonte. Nenhuma edicao posterior
   muda o arquivo daquela operacao. Nova acao captura nova versao.
3. Required: `validarCartaObrigatoria(snapshot): ValidationRun` da 008,
   com `complete.issues` ou `failed`. Apenas erros obrigatorios bloqueiam;
   exceptions/falha tecnica impedem Blob/download. Reusar os cinco campos do
   schema: nome, descricao, publico-alvo, prazo e custo. Nunca duplicar lista.
4. Listas: ordem/numero ja normalizados pela 007; filtrar somente itens sem
   nome/descricao util, preservar numeros de etapas com lacunas e nao sort.
5. `ExportCsvAction` consome provider e controla o hook; a 009 insere o
   componente proximo das acoes sem passar CSV/validacao cacheada. Bloqueios
   nao escondem a previa, Editar, ajuda ou tutorial.
6. Correcao: `ValidationSummary` da 008 recebe required atual e destino tipado
   da 007. Navegacao interna deve abrir parte e focar campo; nenhum valor da
   Carta na URL. Adaptar props/imports ao componente real, ainda inexistente.

## Contrato fechado do artefato local

Nome fixo `simplifica-carta.csv`; MIME `text/csv;charset=utf-8`. Duas colunas,
cabecalho `campo,valor`, 17 registros na ordem abaixo, sem IDs/metadados/avisos.
Virgula fixa, sem heuristica locale ou linha sep=. Todas as celulas entre aspas;
aspas internas duplicadas; CRLF entre registros e final; CR/LF/CRLF internos
preservados. UTF-8 com BOM U+FEFF uma vez, somente ao compor Blob.

| Ordem | Campo | Fonte v2 / representacao |
| --- | --- | --- |
| 1 | nome | identificacao.nome |
| 2 | nome_popular | identificacao.nomePopular |
| 3 | descricao | identificacao.descricao |
| 4 | publico_alvo | identificacao.publicoAlvo |
| 5 | criterios | requisitos.criterios |
| 6 | documentos | nome + classificacao explicita; LF entre itens |
| 7 | etapas | ordem + ponto/espaco + descricao; LF entre itens |
| 8 | prazo | atendimento.prazo |
| 9 | custo | atendimento.custo, inclusive string 0 |
| 10 | canais | tipo traduzido + dois pontos/espaco + descricao, se tipo informado |
| 11 | exige_agendamento | true: Sim; false explicito: Não; null: vazio |
| 12 | tipos_agendamento | Online, Presencial ou ambos em LF; somente com Sim |
| 13 | sistema_agendamento | Paraíba Digital ou Outro sistema ou site; somente com Sim |
| 14 | link_agendamento | URL somente com Sim e sistema externo |
| 15 | exibicao_agendamento | Dentro do Paraíba Digital ou Em uma nova página; somente com Sim e sistema externo |
| 16 | orientacao_agendamento | atendimento.orientacaoAgendamento, opcional somente com Sim |
| 17 | informacoes_complementares | informacoesComplementares |

Documento com obrigatorio true/false recebe ` (Obrigatório)`/` (Opcional)`;
null recebe somente nome. Canal null recebe somente descricao. Mapear online,
presencial, telefone, email e outro para Online, Presencial, Telefone, E-mail
e Outro em conteudo versionado. A 009 deve usar o mesmo vocabulario.

Usar trim apenas para testar texto util; devolver o texto original. Ausencia
opcional composta apenas de espacos fica vazia; texto util mantem espacos e
quebras integrais. Sem `Não informado`, inferencia de gratuidade ou dispensa.
Listas multiline sao representacao de leitura: split por LF nao reconstrui
itens quando a descricao possui quebras internas. CSV nao define tipo de celula
nem layout homologado de importacao do Paraiba Digital.

Exemplo sintetico: documento `Identidade`/true vira `Identidade (Obrigatório)`;
etapas preenchidas nas ordens 1 e 3 viram `1. Solicitar\n3. Receber`, sem
renumeracao; `custo = "0"` permanece 0; agendamento null vira valor vazio.

## Politica candidata de formulas

Aplicar somente ao valor final de cada um dos 17 registros, depois das listas
e antes do quoting. Identificadores/cabecalho sao constantes confiaveis.
Acrescentar apostrofo U+0027 antes do valor integral quando detectado prefixo
de risco; contar celulas protegidas, nao itens. Fonte permanece intacta.

Deteccao v1: copiar para NFKC somente para detectar; retirar da copia um prefixo
de U+0000–U+0020, U+007F–U+00A0, U+1680, U+180E, U+2000–U+200F,
U+2028–U+202F, U+205F, U+2060–U+206F, U+3000 e U+FEFF. Se esse prefixo
contiver TAB/CR/LF, proteger mesmo sem sinal. Apos o prefixo, proteger se o
primeiro caractere normalizado for =, +, - ou @, incluindo largura completa.
Nao usar trim/normalize no valor devolvido. Negativos legitimos tambem recebem
marcador; nao bloquear texto nem converter em numero. Valor vazio nao protege.

Este conjunto e uma escolha local conservadora, nao lista universal de
interpretacao de planilhas. A OWASP descreve tambem prefixo TAB para Excel;
nao substituir a politica acordada sem verificacao comparativa e conciliacao
de T003/RF05. Apostrofo continua candidato, com aceite CA08 pendente. Se um
caminho suportado executar formula, rever politica, aviso e contrato e retestar.
Salvar/reabrir exige evidencia separada; nao prometer preservacao universal.

Os formatadores de agendamento propostos sao puros: tipos conhecidos em ordem
Online/Presencial separados por LF; sistema paraiba-digital/externo mapeado para Paraíba
Digital/Outro sistema ou site; exibicao dentro-paraiba-digital/nova-pagina mapeada para
Dentro do Paraíba Digital/Em uma nova página. null/lista vazia produz "". Rotulos ficam
em conteudo versionado compartilhado com previa/copia.

## Funcoes puras: codigo base proposto

Os trechos pressupõem os tipos v2 da 007; nao compilam contra o modelo atual
sem essa dependencia. Separar arquivos como indicado, completando imports reais.

```ts
// src/lib/csv.ts — revisar callers antes de mudar assinatura/terminadores
export function criarCsv(rows: readonly (readonly string[])[]): string {
  const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;
  return rows.map(row => row.map(quote).join(",")).join("\r\n") + "\r\n";
}

// src/features/carta/carta.csv-safety.ts
const leading = /^[\u0000-\u0020\u007f-\u00a0\u1680\u180e\u2000-\u200f\u2028-\u202f\u205f\u2060-\u206f\u3000\ufeff]*/u;
export function protegerValorCsv(value: string) {
  const detection = value.normalize("NFKC");
  const prefix = detection.match(leading)?.[0] ?? "";
  const protectedValue = /[\t\r\n]/.test(prefix) ||
    /^[=+\-@]/.test(detection.slice(prefix.length));
  return { value: protectedValue ? "'" + value : value, protectedValue };
}

// src/content/exports/carta-csv.ts — convencoes e copy versionadas
export const csvLabels = {
  required: "Obrigatório", optional: "Opcional", yes: "Sim", no: "Não",
  channels: { online: "Online", presencial: "Presencial", telefone: "Telefone",
    email: "E-mail", outro: "Outro" },
} as const;

// src/features/carta/carta.csv.ts — imports: tipos, labels, safety, criarCsv
const hasText = (value: string) => value.trim().length > 0;
const text = (value: string) => hasText(value) ? value : "";
export function copiarCartaParaExportacao(carta: CartaServico): CartaServico {
  return { ...carta, identificacao: { ...carta.identificacao },
    requisitos: { ...carta.requisitos,
      documentos: carta.requisitos.documentos.map(item => ({ ...item })) },
    atendimento: { ...carta.atendimento,
      tiposAgendamento: [...carta.atendimento.tiposAgendamento],
      canais: carta.atendimento.canais.map(item => ({ ...item })) },
    etapas: carta.etapas.map(item => ({ ...item })) };
}
export function gerarCsvDaCarta(carta: CartaServico) {
  const documents = carta.requisitos.documentos.filter(d => hasText(d.nome))
    .map(d => d.nome + (d.obrigatorio === null ? "" :
      ` (${d.obrigatorio ? csvLabels.required : csvLabels.optional})`)).join("\n");
  const steps = carta.etapas.filter(e => hasText(e.descricao))
    .map(e => `${e.ordem}. ${e.descricao}`).join("\n");
  const channels = carta.atendimento.canais.filter(c => hasText(c.descricao))
    .map(c => c.tipo === null ? c.descricao :
      `${csvLabels.channels[c.tipo]}: ${c.descricao}`).join("\n");
  const scheduling = carta.atendimento.exigeAgendamento;
  const rows: [string, string][] = [
    ["nome", text(carta.identificacao.nome)],
    ["nome_popular", text(carta.identificacao.nomePopular)],
    ["descricao", text(carta.identificacao.descricao)],
    ["publico_alvo", text(carta.identificacao.publicoAlvo)],
    ["criterios", text(carta.requisitos.criterios)],
    ["documentos", documents], ["etapas", steps],
    ["prazo", text(carta.atendimento.prazo)],
    ["custo", text(carta.atendimento.custo)], ["canais", channels],
    ["exige_agendamento", scheduling === null ? "" :
      scheduling ? csvLabels.yes : csvLabels.no],
    ["tipos_agendamento", scheduling === true ? formatarTiposAgendamento(carta.atendimento.tiposAgendamento) : ""],
    ["sistema_agendamento", scheduling === true ? formatarSistemaAgendamento(carta.atendimento.sistemaAgendamento) : ""],
    ["link_agendamento", scheduling === true && carta.atendimento.sistemaAgendamento === "externo" ? text(carta.atendimento.linkAgendamento) : ""],
    ["exibicao_agendamento", scheduling === true && carta.atendimento.sistemaAgendamento === "externo" ? formatarExibicaoAgendamento(carta.atendimento.exibicaoAgendamento) : ""],
    ["orientacao_agendamento", scheduling === true ? text(carta.atendimento.orientacaoAgendamento) : ""],
    ["informacoes_complementares", text(carta.informacoesComplementares)],
  ];
  let protectedValueCount = 0;
  const safeRows = rows.map(([field, value]) => {
    const safe = protegerValorCsv(value);
    if (safe.protectedValue) protectedValueCount += 1;
    return [field, safe.value];
  });
  return { csv: criarCsv([["campo", "valor"], ...safeRows]), protectedValueCount };
}
export function criarArtefatoCsv(csv: string): Blob {
  return new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
}
```

Snapshot por spread pressupoe dados internos confiaveis do decoder, sem getters
ou proxies externos. Falha na copia e falha tecnica de validacao; nao recuperar
silenciosamente com Carta inicial. Required defensivo da 008 continua necessario.
Tipos incompatíveis em opcionais/listas devem ter sido rejeitados pelo decoder;
excecao de mapeamento vira generation failed, nunca arquivo parcial.

## Download, gesto e ciclo de recursos

Acionar no handler explicito, sem await/timer entre captura e click. Proposta
inicial sincrona para fixture representativa; nao adicionar worker sem medicao.
Revogar URL em 60 segundos apos click, prazo candidato a verificar na matriz.
Nao revogar no unmount da acao: navegar ao tutorial nao pode invalidar download
em curso. Timer pertence ao helper; teardown da pagina libera recursos do browser.
Falha anterior/na chamada de click remove anchor e revoga URL imediatamente.

```ts
// src/features/carta/carta.csv-download.ts — sem helper global sem reuso real
export function iniciarDownloadCsv(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  let anchor: HTMLAnchorElement | undefined;
  let started = false;
  try {
    anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "simplifica-carta.csv";
    anchor.hidden = true;
    document.body.append(anchor);
    anchor.click();
    started = true;
  } finally {
    anchor?.remove();
    if (started) window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    else URL.revokeObjectURL(url);
  }
}
```

Click sem excecao significa apenas solicitacao ao navegador. Cancelamento,
bloqueio silencioso ou salvamento nao possuem confirmacao confiavel aqui.
Repeticoes intencionais apos termino criam URLs independentes com prazo finito;
testar cleanup por tentativa, sem acumulo indefinido.

Se o processamento sincrono exceder orcamento de interacao ou impedir feedback,
revisar pipeline antes do aceite: trabalho particionado/worker local e estado
`prepared` com botao explicito `Baixar CSV`. Este segundo gesto baixa o Blob
da captura inicial, identificado na mensagem; invalidar preparado ao editar e
liberar referencias antigas. Nao autoacionar download apos tarefa assincrona.
Registrar a mudanca nos planos/tarefas; prepared nao pertence a base inicial.

## Hook e estados: codigo base

```tsx
// src/features/carta/useExportCartaCsv.ts — imports de React e helpers acima
export type ExportState =
  | { status: "idle" }
  | { status: "processing" }
  | { status: "blocked"; issues: readonly ValidationIssue[] }
  | { status: "started"; protectedValueCount: number }
  | { status: "failed"; stage: "validation" | "generation" | "download" };

export function useExportCartaCsv(carta: CartaServico) {
  const [state, setState] = useState<ExportState>({ status: "idle" });
  const busy = useRef(false);
  const exportar = () => {
    if (busy.current) return;
    busy.current = true;
    setState({ status: "processing" });
    let stage: "validation" | "generation" | "download" = "validation";
    try {
      const snapshot = copiarCartaParaExportacao(carta);
      const required = validarCartaObrigatoria(snapshot);
      if (required.status === "failed") {
        setState({ status: "failed", stage });
        return;
      }
      const errors = required.issues.filter(issue => issue.severity === "error");
      if (errors.length) {
        setState({ status: "blocked", issues: errors });
        return;
      }
      stage = "generation";
      const result = gerarCsvDaCarta(snapshot);
      const blob = criarArtefatoCsv(result.csv);
      stage = "download";
      iniciarDownloadCsv(blob);
      setState({ status: "started", protectedValueCount: result.protectedValueCount });
    } catch {
      setState({ status: "failed", stage });
    } finally {
      busy.current = false;
    }
  };
  return { state, exportar };
}
```

Nao consultar editorial nem required cacheado da previa. Trava por ref e tomada
antes da primeira operacao; desabilitar botao isoladamente nao e trava. Na base
sincrona React pode agrupar processing/started sem pintar estado intermediario:
na implementacao verificar feedback sob carga, considerando flush controlado
antes do trabalho se necessario, com custo medido. Nao usar await so para pintar
e perder gesto. Duas acoes intencionais apos termino sao permitidas; teste de
duplicidade deve invocar reentrada durante a operacao, nao inventar intervalo.

Pendencias do snapshot podem ficar obsoletas apos editar em outra rota.
Ao remontar acao iniciar idle; se houver edicao com acao montada, invalidar
blocked por revisao da Carta sem repetir download nem mover foco automaticamente.
Started continua mensagem historica da operacao, identificando dados do clique.

## Conteudo, componente e CSS de base

Copy proposta, sujeita a validacao editorial com responsavel/data:

```ts
// src/content/exports/carta-csv.ts
export const cartaCsvContent = {
  action: "Exportar CSV", processing: "Preparando CSV…",
  introduction: "O arquivo usa os dados do momento do clique. O cadastro e a publicação no Paraíba Digital continuam manuais.",
  blocked: "Preencha os campos obrigatórios indicados para exportar.",
  started: "Download iniciado. Confira os downloads do seu navegador.",
  protection: "Alguns valores receberam um marcador textual de proteção no arquivo. Os dados do formulário foram preservados.",
  importHint: "Ao importar em uma planilha, selecione UTF-8, vírgula e a coluna valor como Texto.",
  failures: {
    validation: "Não foi possível verificar os campos obrigatórios. Tente novamente.",
    generation: "Não foi possível gerar o CSV. Os dados foram preservados. Tente novamente.",
    download: "Não foi possível iniciar o download. Tente novamente ou revise as opções do navegador.",
  },
} as const;
```

`ExportCsvAction` chama useCartaSession e useExportCartaCsv, com botao nativo
type=button. Contrato proposto de resumo adapter: recebe issues e callback
onCorrect(target: ValidationTarget), abre `/formulario-carta` via navegacao
interna com destino fechado da 007. Reusar ValidationSummary real, sem motor
paralelo de mensagens. A mensagem e o resumo sao texto React, nunca innerHTML.

```tsx
// Corpo base de ExportCsvAction; SummaryAdapter implementa contrato acima
const { carta } = useCartaSession();
const { state, exportar } = useExportCartaCsv(carta);
const content = cartaCsvContent;
const hintId = useId();
const message = state.status === "processing" ? content.processing :
  state.status === "started" ? content.started :
  state.status === "failed" ? content.failures[state.stage] : "";
return (
  <section className="carta-csv-action" aria-label={content.action}>
    <p id={hintId}>{content.introduction}</p>
    <button type="button" onClick={exportar}
      disabled={state.status === "processing"} aria-describedby={hintId}>
      {state.status === "processing" ? content.processing : content.action}
    </button>
    <p role="status" aria-live="polite" aria-atomic="true">{message}</p>
    {state.status === "blocked" ? (
      <SummaryAdapter title={content.blocked} issues={state.issues} onCorrect={onCorrect} />
    ) : null}
    {state.status === "started" && state.protectedValueCount > 0 ? (
      <p>{content.protection}</p>
    ) : null}
    <p>{content.importHint}</p>
  </section>
);
```

Adapter/onCorrect ainda sao contratos, nao componentes existentes. Ao blocked,
focar heading/resumo tabindex=-1 apos commit; nao anunciar simultaneamente o
mesmo resumo em alert e live region. Started/failed mantem foco no botao; nao
focar download invisivel. A live region curta permanece montada desde idle.
Para repeticao com mesmo resultado, confirmar anuncio por tentativa com leitor
de tela e limpar status no inicio sem adicionar texto pessoal ou spam assistivo.

```css
/* Proposta em globals.css; confirmar composicao/tokens no Design/Make */
.carta-csv-action {
  display: grid;
  gap: var(--space-3);
  min-inline-size: 0;
  font-family: var(--font-body);
}
.carta-csv-action p { margin: 0; overflow-wrap: anywhere; }
.carta-csv-action button {
  justify-self: start;
  max-inline-size: 100%;
  min-block-size: 2.75rem;
  padding: var(--space-3) var(--space-4);
  white-space: normal;
  font: inherit;
}
.carta-csv-action button:focus-visible {
  outline: 3px solid var(--color-brand-navy);
  outline-offset: 3px;
}
```

Reusar variante real do botao compartilhado se existente na implementacao;
ButtonLink atual e link, nao controle adequado para download. Nao fixar altura
de mensagens/card nem substituir disabled por cor. Medir foco/contraste reais.

## Arquivos e sequencia de implementacao

| Arquivo | Acao / tarefa |
| --- | --- |
| src/features/carta/carta.csv.ts | Snapshot/mapeamento/artefato completo; T007/T009 |
| src/lib/csv.ts | Quoting/CRLF; conferir consumidores; T009 |
| src/features/carta/carta.csv-safety.ts | Deteccao/protecao e contagem; T008 |
| src/features/carta/carta.csv-download.ts | Anchor/URL/cleanup; T010 |
| src/features/carta/useExportCartaCsv.ts | Gate, estados, trava/falhas; T011 |
| src/content/exports/carta-csv.ts | Convencoes/copy; T012 |
| src/components/carta/ExportCsvAction.tsx | Acao/resumo/retorno; T012/T013 |
| src/pages/PreviaCartaPage.tsx | Slot real da 009; T012 |
| src/styles/globals.css | Estados/reflow apos Figma; T013 |
| Testes junto a feature/helper | Pureza, parser, pipeline e componente; T014–T016 |
| package.json/package-lock.json e setup de teste, se ausentes | Infraestrutura no comando de implementacao |
| specs/010-exportacao-csv/quickstart.md | Procedimento verificavel apos codigo; T021 |
| specs/010-exportacao-csv/verification.md | Evidencias por CA/ambiente; T017–T021 |

Executar T006 validacao documental; integrar contratos reais 007/008/009;
implementar funcoes puras, safety e artefato; download e hook; conteudo/componente;
verificar suite e jornada, planilhas/navegadores, desempenho e acessibilidade.
Nao alterar schema ou required independentemente, adicionar backend, logs de
valores, cache persistente, formatos extras ou download automatico.

## Testes e matriz de evidencias futuras

Reusar suite da 007/008 quando existir. Se continuar ausente, propor Vitest com
ambiente DOM e Testing Library para comportamento React e parser independente
(por exemplo Papa Parse) para round-trip; conferir versoes/docs oficiais no
momento de instalar. Nao instalar nesta etapa nem usar o serializador como
seu proprio parser. Scripts test/typecheck/build devem ser efetivamente rodados
apos codigo; mocks nao comprovam arquivo baixado ou formula segura.

Fixture completa congelada: 17 valores; nome popular; orientacao mesmo com
agendamento null/false; custo 0; documentos/canais parciais e vazios; etapas 1/3;
aspas/virgula/CR/LF/CRLF; acentos e IDs sinteticos ausentes do artefato.
Verificar fonte e arrays/ordens inalterados, 17 dados mais cabecalho (18 registros logicos) de duas
colunas, BOM unico e CRLF final, valores conforme convencao/protecao.
Nao contar CRLF final como registro vazio. Incluir Online/Presencial/ambos
na ordem fixa, sistema nativo com dados externos retidos e externo dentro/
nova pagina; quatro linhas estruturadas com rotulos traduzidos e inativos
vazios, sem apagar valores da Carta em troca/restauracao.

Fixtures safety inofensivas: =1+1, +1, -1, @texto; largura completa dos sinais;
cada fronteira do conjunto de prefixos e caracteres imediatamente externos;
TAB/CR/LF com/sem sinal; NBSP/FEFF/controles combinados; negativos legitimos;
valor comum/vazio/apostrofo inicial; aspas e virgulas tentando criar celula.
Testar apos compor listas, incluindo nome de documento/tipo de canal que muda
prefixo final. Nenhuma formula com link externo ou dados reais.

Pipeline: errors/failed/exception nao cria Blob nem URL; editorial nao participa;
memoria sem storage funciona; snapshot nao mistura edicao posterior; nova
tentativa usa nova Carta; reentrada durante processamento e retry apos fim;
falhas de copia, formatacao, Blob, createObjectURL, append/click; finally libera
trava; anchor removida/URL revogada no prazo; started somente apos click sem erro.
Sim sem tipos/sistema e externo sem URL/exibicao validas bloqueiam com
required compartilhado da 008; nativo nao bloqueia por valores externos
inativos. Mudanca de Carta invalida blocked obsoleto sem executar download
ou mover foco; nova tentativa valida e serializa o mesmo snapshot atual.

| Ambiente proposto | Caminhos / evidencia exigida |
| --- | --- |
| Windows 11, Chrome/Edge/Firefox estaveis | Download real, nome/bytes/MIME, repeticao, navegacao imediata, revoke 60 s |
| macOS, Safari estavel | Mesmo procedimento, gesto e comportamento de download |
| iOS, Safari; Android, Chrome | Dispositivo real, gesto/arquivo, orientacao/tamanhos e navegacao |
| Windows 11, Excel desktop | Abertura padrao; importacao explicita virgula/UTF-8/Texto; salvar CSV/reabrir |
| Windows 11 ou Linux, LibreOffice Calc | Mesmos tres caminhos, opcoes de deteccao/avaliacao registradas |
| NVDA/Windows com Firefox ou Chrome; VoiceOver/Safari | Botao, resumo/correcao, foco, live region e repeticoes |

Registrar versoes exatas, sistema, locale pt-BR e opcoes observadas no dia do
teste; repetir casos de largura completa em locale relevante quando viavel e
registrar limite se indisponivel. Conferir duas colunas, acentos, listas e
formula como texto, sem avaliacao; importacao como Texto separada de abertura
padrao. Se abrir numa coluna por locale, documentar importacao, sem modificar
delimitador silenciosamente. Ambiente indisponivel fica pendente, sem aprovado.

Reflow: 1440/1024/768/390/320 px e intermediarias; texto 200%, zoom 400% em
viewport desktop para reflow, fonte fallback, mensagens longas, teclado,
contraste/foco medidos. Manter ajuda/tutorial/Editar usaveis em todos os estados.

### Medicao de desempenho

Fixture T005 confirmada documentalmente: 50 documentos, 50 canais, 100 etapas;
ate 1 MiB de texto util UTF-8 total. Distribuir texto sintetico com acentos,
multilinhas e aspas; computar tamanho com TextEncoder sobre os valores, sem
confundir com bytes do CSV (quoting/BOM acrescentam bytes). Registrar ambos.

Ambiente proposto: build de producao em Windows 11/Chrome estavel e Android/
Chrome real; registrar CPU/RAM, dispositivo, energia, versoes e ausencia de
throttling artificial. Uma rodada fria + 10 repeticoes com edicoes/nova captura;
medir performance.now por copia/required, formatacao, safety, serializacao e
Blob; manter maximo/mediana e total ate Blob pronto <= 5 segundos. Download e
dialogo externos fora do total. Instrumentacao nao registra valores pessoais.

Medir responsividade em paralelo com observacao de frames/long tasks e acao
de teclado/feedback; tempo total sozinho nao aprova ausencia de bloqueio.
Orcamento proposto de tarefa continua <= 50 ms, a confirmar no ambiente real.
Se exceder, revisar processamento/gesto conforme secao prepared e retestar;
nao truncar textos nem impor limite de produto para passar. Exercitar tambem
caso 2 MiB como investigacao de limite, sem promessa de desempenho ilimitado.

## Rastreabilidade e criterios de fechamento

| Criterios | Implementacao / evidencia |
| --- | --- |
| CA01–CA03 | Required compartilhado no snapshot; T011/T012/T016/T017 |
| CA04–CA07 | Tabela/listas/ausencias, parser independente; T007/T009/T014 |
| CA08 | Politica candidata + planilhas reais; T008/T015/T018 |
| CA09–CA10 | Nova captura/trava/retry; T011/T016/T017 |
| CA11–CA13 | Falhas/memoria/cleanup/retorno verdadeiro; T010/T011/T016/T018 |
| CA14 | Resumo/correcao/foco/anuncios; T012/T013/T020 |
| CA15 | Matriz browser/planilha registrada; T018 |
| CA16 | Fixture/medicao/responsividade; T019 |
| CA17 | Continuidade sem limpar sessao ou exigir download; T017 |
| CA18 | Arquitetura/copy/Figma/contratos; T004/T006/T020/T021 |
| CA19 | Quatro linhas estruturadas ativas/inativas, modalidades/rotulos e fonte preservada; required sobre snapshot atual; T002/T007/T014/T016–T017/T021 |

`verification.md` futuro deve identificar revisao do produto, CA, tarefa,
ambiente, procedimento, resultado observado, defeito/reteste e pendencias;
nao armazenar dados reais da Carta. Nao declarar aceite integral enquanto
Figma, ERS, contratos reais, ambientes ou politica de formulas estiverem pendentes.

## Proximo passo

Executar `/spec:validar 010-exportacao-csv` com este plano, reconciliando o
PDF do ERS, Design/Make, vocabulario/listas e contratos reais da 007–009.
T001–T003 possuem proposta/inventario neste documento; T004 permanece pendente
de consulta visual e validacao editorial. T005 tem artefato documental, sem
afirmar encerramento de suas dependencias. T006 e testes futuros nao executados.
Depois das divergencias resolvidas, seguir `/spec:implementar`.

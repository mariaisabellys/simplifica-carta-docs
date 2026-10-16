# Implementation Plan: Formulario da Carta de Servicos

## Status

Preparado em 2026-10-02. **Plano tecnico pendente de ERS PDF, validacao
editorial, consulta Figma e conciliacao documental da 012; nao pronto para
implementacao visual ou aceite integral.** Esta etapa cria somente o documento,
sem instalar dependencias, alterar src ou marcar tarefas como concluidas.

Antes de codigo, concluir pendencias e executar `/spec:validar
007-formulario-carta-servico`. Implementacao somente em `/spec:implementar`.

## Objetivo e fontes

Entregar formulario em cinco partes, com listas editaveis e uma unica Carta
temporaria acima das rotas. Acesso independente, preenchimento parcial e previa
parcial permanecem livres. Sem backend, localStorage, anexos, varias Cartas,
sincronizacao entre abas ou publicacao externa.

Fontes efetivamente lidas nesta conversa:

- Spec, plan e tasks da 007; planos 007/008 e documentos 009–016 previamente
  consultados para os contratos consumidores; plano detalhado da 006.
- README, specs/README.md, manual textual de levantamento, MVP, fluxos,
  decisoes tecnicas, constitution, regras de IA e docs/implementation-plan.md.
- Mapa Figma e tokens/componentes locais; planos detalhados de 002/003.
- Codigo App/AppShell/routes, ButtonLink/PageHeader, FormField,
  FormularioCartaPage, carta.types/schema/storage/validation/csv, globals/tokens
  e package.json. Busca de callsites em src realizada nesta etapa.

O PDF do ERS nao foi extraido/validado: Python/Poppler nao foram encontrados
na verificacao de comandos desta sessao. A leitura do manual textual nao e
equivalente a leitura do PDF. Regras finais e copy requerem evidencia institucional.

## Mapeamento visual e contrato de adaptacao

| Referencia | Uso documental | Situacao |
| --- | --- | --- |
| Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2 | Arquivo oficial | Sem consulta MCP nesta sessao |
| 653:1540 | Pagina/parte 1 — Sobre o servico | Node principal da rota |
| 2024:269 | Pagina/parte 2 — Publico e requisitos | Formulario aparece como imagem; reconstruir com controles reais |
| 641:58 | Pagina/parte 3 — Como o servico funciona | Variante da mesma rota |
| 647:650 | Pagina/parte 4 — Atendimento | Variante da mesma rota |
| 660:2533 | Pagina/parte 5 — Informacoes finais | Variante da mesma rota |
| 811:306 | Form-Card compacto | Sem orientacao expandida |
| 811:382 | Form-Card com orientacao | Mesmo componente, painel aberto |
| 821:308 | Previa da Carta | Componente compartilhado com a 009 |
| 651:317 | Label-Row/obrigatoriedade | Associacoes e contraste a verificar |
| Make dVm7lEZdBFqOiiySWLWUqp, node 0:1 | Tokens/controles/responsividade | Sem consulta MCP |

A integracao Figma foi localizada no turno anterior, ainda nao instalada/
conectada; nao houve confirmacao posterior de conexao nem ferramenta Figma
disponivel. Nao repetir sugestao como se conexao estivesse concluida.
Antes de estilos, consultar detalhadamente os nodes e registrar composicao,
acoes, estados, assets e comportamento estreito. Os cinco frames representam
cinco partes na mesma rota, uma ativa por vez.

`src/content/pages/formulario-carta.ts` governa titulos, descricoes, campos,
opcoes e acoes. O layout deve crescer e reorganizar-se para acomodar o conteudo;
texto do Figma nao substitui copy versionada. Orientacoes vem de
`src/content/pages/organizar-informacoes.ts`, por mapeamento de IDs. A previa
embutida reutiliza o componente/view model da 009 e o padrao `821:308`.

O formulario desenhado como imagem em `2024:269` e referencia visual, nao asset
de producao. Traduzir sua estrutura para form, fieldset, legend, label, input,
textarea, select, radio, checkbox, botoes e listas reais. Preservar hierarquia,
alinhamentos e densidade do frame sem posicionar hotspots sobre uma imagem.

Codigo/CSS abaixo sao base tecnica proposta, nao output Figma ou layout aprovado.
Campos/interacoes extras no prototipo exigem conciliacao de escopo, nao copia cega.

## Inventario do estado real

| Area | Estado observado | Consequencia |
| --- | --- | --- |
| Pagina | PageHeader + placeholder com modelo inicial | Nenhum formulario funcional |
| Modelo | Sem nomePopular/orientacaoAgendamento/IDs; false inicial | Precisa v2 com escolhas null |
| Storage | get fora do try, merge superficial, set sem protecao | Precisa decoder e resultados tipados |
| App | history/popstate, sem provider de Carta | Montar fonte persistente acima de CurrentPage |
| FormField | label por id; hint sem ID e sem erro | Evoluir contrato explicito |
| Links | ButtonLink anchor simples; shell intercepta modificadores | Consolidar 002 antes de continuidade integrada |
| Validacao | Cinco paths obrigatorios e helper inicial | Integrar contrato required/failed da 008 |
| CSV | Ternario booleano transforma null em nao | Adaptacao minima obrigatoria |
| Consumidores | Previa/tutorial placeholders | CA13 pendente por consumidor |
| Testes | Sem framework em package.json | Configuracao justificada na implementacao |

Callsites reais afetados: schema usado por FormularioCartaPage e storage;
CartaServico usado por schema/storage/validation/csv. Nao existe consumidor
funcional da sessao a aprovar por mera existencia da rota.

## Decisoes documentais

- Jornada completa: diagnostico > organizacao > formulario; acesso livre por
  003/006/menu/URL. Corrigir descricao da spec em revisao explicita, sem gate.
- Cinco partes: identificacao, requisitos, etapas, atendimento e adicionais.
  Renderizar uma parte ativa por vez; progresso/navegacao abre qualquer parte
  sem gate. Retorno de erro abre a parte correspondente antes de focar o campo.
- Nome popular e adicionais opcionais. Cinco obrigatorios locais: nome,
  descricao, publico-alvo, prazo e custo, em fonte unica compartilhada com 008.
- Configuracoes de agendamento so se aplicam com `exigeAgendamento === true`. Tipo de
  agendamento (Online, Presencial ou ambos) e Sistema de agendamento (Paraiba Digital ou
  Outro sistema ou site) sao obrigatorios nesse estado. Link do agendamento e Como o
  agendamento sera exibido? sao obrigatorios e visiveis somente para Outro sistema ou
  site. Dentro do Paraiba Digital mantem o cidadao na experiencia; Em uma nova pagina
  redireciona para a URL externa. Paraiba Digital identifica agendamento pelo proprio
  sistema, sem link ou forma de exibicao externa.
- Ao mudar para Nao/nao informado ou de Outro sistema ou site para Paraiba Digital,
  preservar valores previamente preenchidos na mesma sessao, conforme o padrao da 007,
  sem apagar silenciosamente. Valores inativos nao sao exibidos, validados como
  obrigatorios nem transferidos como configuracao ativa; ao retornar a condicao
  correspondente, ficam disponiveis para revisao.
- null significa nao informado; false v2 e resposta Nao explicita. false legado
  sem evidencia vira null; existencia de outros dados nao confirma escolha.
- Documento.obrigatorio e canal.tipo admitem null. Itens parciais sao preservados.
- RF03/CA06 da 012 foram alinhados documentalmente com null/false e campos
  condicionais; verificar integracao real e fonte unica antes do aceite.

## Arquivos futuros e tarefas

| Arquivo | Responsabilidade | Tarefas |
| --- | --- | --- |
| carta.types.ts/carta.schema.ts | Modelo v2, factory, IDs fechados de campos e obrigatorios | T007 |
| carta.reducer.ts | Operacoes imutaveis tipadas por ID | T008 |
| carta.migration.ts | Decoder/legado/recuperacao e invariantes | T009 |
| carta.storage.ts | Fronteira segura de sessionStorage e resultados | T010 |
| CartaSessionProvider.tsx | Fonte unica, hook, recuperacao e persistencia | T011 |
| App.tsx | Provider sem key por rota, junto da navegacao comum | T011/T020 |
| carta.validation.ts/carta.csv.ts | Compatibilidade minima com v2 | T012 |
| content/pages/formulario-carta.ts | Labels, partes, orientacoes, avisos/acoes | T013 |
| content/pages/organizar-informacoes.ts | Fonte compartilhada das orientacoes de campo | T013/T014 |
| components/forms/FormField.tsx | Label/ajuda/erro e props explicitas de controle | T014 |
| components/forms/carta/ | DocumentosEditor, EtapasEditor, CanaisEditor e campos conforme reuso | T015–T018 |
| FormularioCartaPage.tsx | Composicao, revisao, retorno/foco e links | T015/T019–T020 |
| Componente de previa da 009 | Previa embutida conforme `821:308`, sem view model paralelo | T015/T020 |
| globals.css ou estilo escopado | Classes carta-form-, sem layout presumido | T021 |
| Testes de feature/integracao | Reducer, migracao, storage e jornada | T022–T026 |
| verification.md/quickstart.md | Resultados e roteiro reproduzivel | T027 |

Nomes novos em src/features/carta/ sao relativos a essa pasta. Rotas,
Breadcrumb/NavigationContext/ButtonLink comuns sao da 002/003; nao criar router,
provider por pagina ou componentes de suporte. Assets somente apos consulta visual.

## Modelo v2 e factory: codigo base

```ts
// carta.types.ts
export type TipoCanal = "online" | "presencial" | "telefone" | "email" | "outro";
export type DocumentoServico = { id: string; nome: string; obrigatorio: boolean | null };
export type EtapaServico = { id: string; ordem: number; descricao: string };
export type CanalAtendimento = { id: string; tipo: TipoCanal | null; descricao: string };
export type CartaServico = {
  identificacao: { nome: string; nomePopular: string; descricao: string; publicoAlvo: string };
  requisitos: { criterios: string; documentos: DocumentoServico[] };
  etapas: EtapaServico[];
  atendimento: {
    prazo: string; custo: string; canais: CanalAtendimento[];
    exigeAgendamento: boolean | null; orientacaoAgendamento: string;
    tiposAgendamento: ("online" | "presencial")[];
    sistemaAgendamento: "paraiba-digital" | "externo" | null;
    linkAgendamento: string;
    exibicaoAgendamento: "dentro-paraiba-digital" | "nova-pagina" | null;
  };
  informacoesComplementares: string;
};

// carta.schema.ts
export function criarCartaInicial(): CartaServico {
  return {
    identificacao: { nome: "", nomePopular: "", descricao: "", publicoAlvo: "" },
    requisitos: { criterios: "", documentos: [] }, etapas: [],
    atendimento: {
      prazo: "", custo: "", canais: [], exigeAgendamento: null, orientacaoAgendamento: "",
      tiposAgendamento: [], sistemaAgendamento: null, linkAgendamento: "", exibicaoAgendamento: null,
    },
    informacoesComplementares: "",
  };
}
export const camposObrigatoriosCarta = [
  "identificacao.nome", "identificacao.descricao", "identificacao.publicoAlvo",
  "atendimento.prazo", "atendimento.custo",
] as const;
```

Adicionar imports de tipos nos arquivos separados. Factory sempre produz arrays/
objetos independentes. Substituir uso mutavel do singleton inicial; se export
legado for mantido temporariamente, nao usá-lo como estado compartilhado mutavel.


Contrato compartilhado da 007: `atendimento.tiposAgendamento: ("online" |
"presencial")[]`, `sistemaAgendamento: "paraiba-digital" | "externo" | null`,
`linkAgendamento: string` e `exibicaoAgendamento: "dentro-paraiba-digital" |
"nova-pagina" | null`. Valores iniciais: [], null, "" e null. Nao confundir tipo de
agendamento com `atendimento.canais`. `orientacaoAgendamento` permanece texto
complementar opcional quando Sim; nao substitui esses campos estruturados.

Na evolucao do contrato v2 ainda planejado, decoder aceita registros v2 sem os quatro
campos novos, inicializando-os sem inferir tipo, sistema, URL ou exibicao do texto
antigo. Preservar orientacao e demais valores seguros; validar enums/lista sem
duplicatas e tipos por propriedade. Campos condicionais inativos continuam armazenados
para revisao, inclusive apos recarga, mas nao implicam selecao ativa.

## Operacoes e reducer: contrato e codigo base

```ts
type IdentificacaoText = keyof CartaServico["identificacao"];
type AtendimentoText = "prazo" | "custo" | "orientacaoAgendamento" | "linkAgendamento";
export type CartaAction =
  | { type: "identificacao.texto"; field: IdentificacaoText; value: string }
  | { type: "atendimento.texto"; field: AtendimentoText; value: string }
  | { type: "criterios"; value: string }
  | { type: "adicionais"; value: string }
  | { type: "agendamento"; value: boolean | null }
  | { type: "agendamento.tipos"; value: CartaServico["atendimento"]["tiposAgendamento"] }
  | { type: "agendamento.sistema"; value: CartaServico["atendimento"]["sistemaAgendamento"] }
  | { type: "agendamento.exibicao"; value: CartaServico["atendimento"]["exibicaoAgendamento"] }
  | { type: "documento.adicionar"; item: DocumentoServico }
  | { type: "documento.editar"; id: string; patch: Partial<Pick<DocumentoServico, "nome" | "obrigatorio">> }
  | { type: "documento.remover"; id: string }
  | { type: "canal.adicionar"; item: CanalAtendimento }
  | { type: "canal.editar"; id: string; patch: Partial<Pick<CanalAtendimento, "tipo" | "descricao">> }
  | { type: "canal.remover"; id: string }
  | { type: "etapa.adicionar"; item: EtapaServico }
  | { type: "etapa.editar"; id: string; descricao: string }
  | { type: "etapa.remover"; id: string }
  | { type: "etapa.mover"; id: string; direction: -1 | 1 };

const renumerar = (itens: readonly EtapaServico[]) =>
  itens.map((item, index) => ({ ...item, ordem: index + 1 }));

export function cartaReducer(carta: CartaServico, action: CartaAction): CartaServico {
  switch (action.type) {
    case "identificacao.texto":
      return { ...carta, identificacao: { ...carta.identificacao, [action.field]: action.value } };
    case "atendimento.texto":
      return { ...carta, atendimento: { ...carta.atendimento, [action.field]: action.value } };
    case "criterios": return { ...carta, requisitos: { ...carta.requisitos, criterios: action.value } };
    case "adicionais": return { ...carta, informacoesComplementares: action.value };
    case "agendamento":
      return { ...carta, atendimento: { ...carta.atendimento, exigeAgendamento: action.value } };
    case "agendamento.tipos":
      return { ...carta, atendimento: { ...carta.atendimento, tiposAgendamento: [...action.value] } };
    case "agendamento.sistema":
      return { ...carta, atendimento: { ...carta.atendimento, sistemaAgendamento: action.value } };
    case "agendamento.exibicao":
      return { ...carta, atendimento: { ...carta.atendimento, exibicaoAgendamento: action.value } };
    case "documento.adicionar":
      if (carta.requisitos.documentos.some((item) => item.id === action.item.id)) return carta;
      return { ...carta, requisitos: { ...carta.requisitos, documentos: [...carta.requisitos.documentos, action.item] } };
    case "documento.editar":
      return { ...carta, requisitos: { ...carta.requisitos, documentos:
        carta.requisitos.documentos.map((item) => item.id === action.id ? { ...item, ...action.patch } : item) } };
    case "documento.remover":
      return { ...carta, requisitos: { ...carta.requisitos, documentos:
        carta.requisitos.documentos.filter((item) => item.id !== action.id) } };
    case "canal.adicionar":
      if (carta.atendimento.canais.some((item) => item.id === action.item.id)) return carta;
      return { ...carta, atendimento: { ...carta.atendimento, canais: [...carta.atendimento.canais, action.item] } };
    case "canal.editar":
      return { ...carta, atendimento: { ...carta.atendimento, canais:
        carta.atendimento.canais.map((item) => item.id === action.id ? { ...item, ...action.patch } : item) } };
    case "canal.remover":
      return { ...carta, atendimento: { ...carta.atendimento, canais:
        carta.atendimento.canais.filter((item) => item.id !== action.id) } };
    case "etapa.adicionar":
      if (carta.etapas.some((item) => item.id === action.item.id)) return carta;
      return { ...carta, etapas: renumerar([...carta.etapas, action.item]) };
    case "etapa.editar":
      return { ...carta, etapas: carta.etapas.map((item) => item.id === action.id ? { ...item, descricao: action.descricao } : item) };
    case "etapa.remover": return { ...carta, etapas: renumerar(carta.etapas.filter((item) => item.id !== action.id)) };
    case "etapa.mover": {
      const from = carta.etapas.findIndex((item) => item.id === action.id);
      const to = from + action.direction;
      if (from < 0 || to < 0 || to >= carta.etapas.length) return carta;
      const next = [...carta.etapas];
      [next[from], next[to]] = [next[to], next[from]];
      return { ...carta, etapas: renumerar(next) };
    }
  }
}
```

Criar IDs fora do reducer em handlers/operacoes do provider com randomUUID ou
factory testavel equivalente. Novos documentos/canais com escolhas null;
etapa ordem normalizada pelo reducer. Nenhuma acao altera orientacao ao trocar
agendamento. Patches nao aceitam id/ordem; nao expor setter de path arbitrario.
Operacoes inexistentes e tentativas de mover alem dos limites sao no-op.

## Decoder, limites e recuperacao

```ts
export type Recovery = "empty" | "complete" | "partial" | "unrecoverable";
export type DecodedCarta = {
  carta: CartaServico;
  recovery: Recovery;
  source: "absent" | "legacy" | "v2" | "unknown";
  writePolicy: "after-edit" | "after-hydration";
};
export type StoredCartaV2 = { version: 2; carta: CartaServico };
// decodeCarta(value: unknown, makeId: () => string): DecodedCarta
```

Algoritmo obrigatorio de carta.migration.ts, a implementar e testar em T009:

1. Somente objeto simples/registro nao array/null como raiz. Se propriedade
   propria version existir, aceitar apenas version === 2 e carta objeto;
   versao desconhecida/estrutura impossivel: inicial + unrecoverable + after-edit.
   Raiz sem version e legado; nunca deduzir v2 por campos adicionais.
2. Projetar cada propriedade conhecida em objeto novo, sem spread do JSON.
   Strings validas sao copiadas exatamente; valor errado vira default e marca
   partial. Campos novos ausentes no legado sao adicoes esperadas, nao prova
   de corrupcao. HTML/Unicode sao texto valido, nao sanitizar redacao.
3. Listas de documentos/canais/etapas: item objeto invalido descartado com partial; objeto com algum texto
   valido preserva esse texto mesmo com outros atributos invalidos. Item vazio
   estruturalmente valido permanece editavel. Escolha invalida vira null.
   tiposAgendamento e uma lista de enums, nao de objetos: aceitar somente online
   e presencial, preservando ordem; remover repeticoes/entradas invalidas com
   partial, mantendo modalidades validas. Propriedade ausente no legado ou v2
   anterior aos quatro campos e adicao esperada: []; valor presente nao array
   vira [] com partial. sistemaAgendamento/exibicaoAgendamento ausentes recebem
   null; enums presentes invalidos recebem null com partial. linkAgendamento
   ausente recebe ""; string presente permanece integral, tipo incorreto vira
   "" com partial. Nao inferir esses valores da orientacao antiga nem valida-los
   como obrigatorios durante recuperacao; campos inativos continuam preservados.
4. IDs v2 aceitos por padrao seguro `^[A-Za-z0-9_-]{1,80}$` e unicos em cada
   lista; gerar substituto para ausente/invalido/duplicado, marcando partial.
   Novos UUIDs atendem esse padrao. Nao colocar texto do usuario em IDs DOM.
5. Agendamento legado true => true, false/ausente => null. No v2 aceitar
   true/false/null; tipo invalido => null + partial. Orientacao preservada
   independentemente dessa resposta.
6. Etapas legadas: ordenar copia por ordem inteira positiva; validas primeiro,
   empate preserva indice original, ordens invalidas por ultimo na ordem original.
   Depois renumerar 1..N. V2 preserva sequencia do array e renumera ordem
   inconsistente com partial. Nunca alterar texto/ID para ordenar.
7. Recuperacao partial nao sobrescreve registro original ao montar: after-edit.
   Legacy completo pode migrar automaticamente depois da hidratacao; complete
   v2 nao precisa escrita inicial. Unknown nunca migra silenciosamente.

Limites tecnicos candidatos do decoder: 8 MiB UTF-8 de registro serializado,
1000 itens por lista. Medir e confirmar no plano antes de codigo. Payload/lista
acima do limite produz unrecoverable/after-edit com aviso, **sem truncar ou
recuperar prefixo silenciosamente**. Esses limites protegem leitura do storage,
nao sao maxLength de produto ou limite de edicao. Nao ler profundidade arbitraria:
projetar apenas grupos conhecidos. Geracao de ID deve evitar colisoes existentes.

## Storage e provider: contratos e base de orquestracao

```ts
export type LoadResult = DecodedCarta & { storage: "available" | "unavailable" };
export type SaveResult = { status: "written" } | { status: "failed" };
const STORAGE_KEY = "simplifica-carta:sessao";
// carregarCartaDaSessao(): LoadResult
// salvarCartaNaSessao(carta: CartaServico): SaveResult
```

carregar protege acesso a window.sessionStorage, getItem, tamanho, JSON.parse
e decode. API recusada => memoria apenas; JSON malformado => unrecoverable
com registro intocado. salvar protege acesso/stringify/set e usa envelope v2.
Sem logs de valores, retorno permanente ou localStorage. Nao chamar limpar.

Provider inicializa a partir da leitura protegida uma vez por instancia;
initializer nao escreve storage e deve tolerar verificacoes StrictMode sem
duplicar efeitos destrutivos. Decodificacao gera identidade da instancia que
ficar montada; nao prometer uma unica chamada interna em desenvolvimento.

Proposta de escrita: sincronamente nas operacoes explicitas, a partir de ref
atualizada antes do dispatch React. Isso evita perder ultimas teclas por debounce
ou navigation/refresh antes de effect. Medir custo de serializacao; se precisar
atrasar, revisar politica/flush e testes antes de mudar. Sem escrita em render.

```tsx
// CartaSessionProvider.tsx: esqueleto, imports locais conforme arquivos criados
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type SessionValue = {
  carta: CartaServico;
  recovery: Recovery;
  storage: "available" | "memory-only";
  apply: (action: CartaAction) => void;
};
const CartaSessionContext = createContext<SessionValue | null>(null);

export function CartaSessionProvider({ children }: { children: ReactNode }) {
  const [loaded] = useState(carregarCartaDaSessao);
  const [carta, setCarta] = useState(loaded.carta);
  const [storage, setStorage] = useState<SessionValue["storage"]>(
    loaded.storage === "available" ? "available" : "memory-only",
  );
  const current = useRef(loaded.carta);
  const migrationAttempted = useRef(false);
  const edited = useRef(false);

  useEffect(() => {
    if (migrationAttempted.current || edited.current) return;
    migrationAttempted.current = true;
    if (loaded.source === "legacy" && loaded.writePolicy === "after-hydration") {
      if (salvarCartaNaSessao(current.current).status === "failed") setStorage("memory-only");
    }
  }, [loaded]);

  const apply = useCallback((action: CartaAction) => {
    const next = cartaReducer(current.current, action);
    if (next === current.current) return;
    edited.current = true;
    current.current = next;
    setCarta(next);
    const result = salvarCartaNaSessao(next);
    setStorage(result.status === "written" ? "available" : "memory-only");
  }, []);

  return (
    <CartaSessionContext.Provider value={{ carta, recovery: loaded.recovery, storage, apply }}>
      {children}
    </CartaSessionContext.Provider>
  );
}
export function useCartaSession() {
  const session = useContext(CartaSessionContext);
  if (!session) throw new Error("useCartaSession requer CartaSessionProvider");
  return session;
}
```

Recovery descreve origem da recuperacao, storage descreve capacidade atual;
nao fundir partial e memory-only em um unico estado. Aviso de partial/impossivel
explica que primeira edicao pode substituir registro incompatível; manter em
memoria antes da edicao. Mensagem nao anuncia salvamento a cada tecla. Em
set recusado, memoria permanece autoritativa e proximas edicoes podem tentar
novamente; recarga sem storage nao tem recuperacao garantida.

App monta CartaSessionProvider sem key de pathname acima de CurrentPage,
dentro/ao lado do NavigationProvider compartilhado. Nao montar novo provider
em formulario/previa/tutorial. Foco de rota/titulo e responsabilidade do shell.

## Conteudo e controle: base para FormField e campos

Conteudo em formulario-carta.ts deve incluir:

| Parte | Campos/labels e orientacao proposta a validar |
| --- | --- |
| Identificacao | Nome: o que cidadao solicita; nome popular opcional: nome alternativo ou mais conhecido pelo cidadao, complementar e sem substituir o nome do servico; descricao: oferta/finalidade; publico-alvo: quem pode utilizar |
| Requisitos | Criterios: condicoes de acesso; documentos: nome e classificacao confirmada, sem anexos |
| Etapas | Descricao desde pedido ate conclusao, sequencia editavel |
| Atendimento | Prazo e condicoes; custos/gratuidade confirmados; canais/tipo/acesso; Necessita de agendamento?; tipo Online/Presencial ou ambos; sistema Paraiba Digital/Outro sistema ou site; link/exibicao somente externo; orientacoes opcionais com Sim |
| Adicionais | Orientacoes relevantes ainda nao cobertas, opcionais |

### Mapa de orientacoes compartilhadas com a 006

| Campo/grupo da 007 | ID de orientacao da 006 | Observacao |
| --- | --- | --- |
| service-name | service-name | Correspondencia direta |
| popular-name | popular-name | Correspondencia direta |
| service-description | service-description | Correspondencia direta |
| who-can-use / specific-audience | audience | Compartilhar orientacao, mantendo controles proprios da 007 |
| category / subcategory / topic | category | Uma orientacao para o grupo de classificacao |
| required-documents | documents | Correspondencia direta |
| service-steps | steps | Correspondencia direta |
| requires-scheduling e configuracoes | scheduling | Uma orientacao para o grupo condicional |
| costs-and-fees | costs | Correspondencia direta |
| important-additional-information | additional-information | Correspondencia direta |

Campos sem correspondencia nao recebem ajuda inventada. O conteudo atual da
006 tambem possui `keywords`, `deadline` e `recurrence`, enquanto o conteudo
atual da 007 nao oferece controles equivalentes; por outro lado, a spec/modelo
da 007 ainda cita criterios, canais e prazo. Essa divergencia precisa ser
resolvida na consolidacao de conteudo/modelo antes do codigo, sem o layout
Figma criar ou remover campos silenciosamente.

Cada Form-Card recebe a orientacao como dado e alterna entre `811:306` e
`811:382`. Fechar o painel nao altera o campo; trocar de parte preserva o estado
da Carta. O estado aberto pode ser local/transitorio e nao precisa integrar o
envelope persistido, salvo decisao posterior explicitamente documentada.

Acrescentar titulo/introducao, aviso de sessao/memoria/recuperacao, nomes das
partes, labels de adicionar/remover/subir/descer, Revisar informações,
Ver prévia, Preciso de ajuda e avisos para confirmar desconhecidos. Exemplos
rotulados Exemplo ilustrativo, nunca value inicial. Mensagens da 008 ficam
em contrato proprio, nao copiadas para outra fonte de regras.

FormField pode manter children para consumidores existentes e expor helper
de IDs; novos controles recebem atributos explicitamente, sem cloneElement.

```tsx
type FormFieldProps = {
  id: string; label: string; hint?: string; error?: string;
  required?: boolean; requiredLabel?: string; children: React.ReactNode;
};
export function fieldDescriptionIds(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}
export function FormField({ id, label, hint, error, required, requiredLabel = "Obrigatório", children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{required ? ` (${requiredLabel})` : ""}</label>
      {hint ? <p id={`${id}-hint`}>{hint}</p> : null}
      {children}
      {error ? <p id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}
```

```tsx
// Exemplo dentro de parte da pagina, apos copy/contrato required validado
const { carta, apply } = useCartaSession();
const id = "carta-nome";
const field = content.fields.nome;
// error e resultado atual da 008; nunca sugestao editorial.
<FormField id={id} label={field.label} hint={field.hint} required error={error}>
  <input
    id={id} value={carta.identificacao.nome} required
    aria-invalid={error ? true : undefined}
    aria-describedby={fieldDescriptionIds(id, field.hint, error)}
    onChange={(event) => apply({ type: "identificacao.texto", field: "nome", value: event.target.value })}
  />
</FormField>;
```

Usar form noValidate, ou botoes type=button para revisao, de modo que required
semantico nao bloqueie previa parcial pelo submit nativo. Orientacao expansiva
usa details/summary ou button aria-expanded/painel confirmado no Figma.
Erro por campo nao deve ser role=alert repetido a cada tecla; foco/resumo
controlados pela acao explicita. Entradas via value/onChange sao texto, sem HTML.

Grupos de tipos usam checkboxes (ao menos um com Sim); sistema/exibicao usam radios de
escolha unica, com label/legend e estado obrigatorio associado. Ao ocultar controles,
remove-los da navegacao por teclado e limpar mensagens inativas sem apagar valores. Se o
foco estiver no grupo que sera removido, retornar ao controle de resposta/sistema que
mudou a condicao. Reexibir valores preservados quando a condicao voltar a ser ativa. Nao
executar redirecionamento nem incorporar site externo durante a edicao.

## Listas, agendamento e foco

- Documentos/canais em fieldset com legend contextual e controles nativos.
  Campo vazio de classificacao/tipo representa null; selecionado false deve
  ser convertido explicitamente, nunca Boolean("false").
- DOM IDs compostos por lista + item.id + campo; keys por id, nao indice.
  Adicionar foca primeiro controle do novo item depois do commit de render.
- Remover foca primeiro controle do proximo sobrevivente, ou anterior, ou botao
  adicionar se lista vazia. Manter referencias por ID e executar foco apos render.
- Mover etapa preserva foco no item por ID, anuncia posicao moderadamente;
  limite desabilitado tem explicacao e alternativa de foco se botao deixar de operar.
- Textos dos nomes de acao incluem numero do item (Remover documento 2), sem
  depender de nome preenchido. Botoes de edicao type=button.

```tsx
// Exemplo de agendamento em parte Atendimento
<fieldset>
  <legend>{content.fields.agendamento.label}</legend>
  {([null, true, false] as const).map((value, index) => (
    <label key={String(value)}>
      <input type="radio" name="carta-agendamento"
        checked={carta.atendimento.exigeAgendamento === value}
        onChange={() => apply({ type: "agendamento", value })} />
      {content.fields.agendamento.options[index]}
    </label>
  ))}
</fieldset>;
// Renderizar configuracoes somente com Sim; link/exibicao somente com sistema externo.
// Guardar texto integral: trocar Sim/Nao/null jamais limpa orientacao.
```

## Retorno a campo e integracao de validacao

Contrato com 008: required complete/failed separado de sugestoes; failed nao
equivale a zero erros. A 007 oferece slots/resumo/correcao, nao motor editorial.
Revisao explicita avalia todos os campos e foca resumo; digitacao nao move foco.
Ver previa permanece link livre mesmo com pendencias ou failed; gate CSV e da 010.

Definir FieldTarget fechado para campos escalares e itens por ID, mapeado a
parte e controle DOM. Dentro da pagina, focusField(target) abre parte quando
necessario e foca apos render. Para retorno entre rotas, usar fragmento restrito
como #carta-nome ou #carta-documento-{id}-nome, sem valor digitado. Parser aceita
apenas campos/IDs conhecidos do estado e fallback para titulo/parte se item
foi removido; nunca querySelector de hash arbitrario. Coordenar com shell da 002
para evitar foco concorrente. Indice de partes nao valida antes de navegar.

Navegacao compartilhada escolhida no plano 006: useAppNavigate retorna funcao,
ButtonLink usa onNavigate; Breadcrumb compartilha mesmo contexto. O exemplo
da 003 foi alinhado documentalmente nessa rodada, preservando modificadores,
target/download e destinos externos. Componentes reais ainda precisam de
entrega antes de import. Nao compensar reload inadequado com persistencia permanente.

## Adaptacao minima dos consumidores

| Consumidor | Mudanca na 007 | Entrega completa fora da 007 |
| --- | --- | --- |
| validation/schema | Cinco obrigatorios em fonte unica e tipos compativeis | Engine/editorial/resumo da 008 |
| CSV existente | true => sim; false => nao; null => vazio, sem IDs | Cobertura integral, seguranca/download da 010 |
| Previa | Documentar null/atributos parciais/texto preservado | Renderizacao 009 |
| Tutorial/copia | Contrato v2, campos estruturados ativos e orientacoes opcionais; sem default Nao | 011/012 apos implementacao e validacao integrada |

O helper CSV adaptado continua incompleto; nao declarar exportacao entregue.
Sem referencias a feature nova para compilar antiga nem downloads automaticos.

## CSS estrutural candidato

```css
.carta-form { min-width: 0; }
.carta-form__parts { display: flex; flex-wrap: wrap; gap: var(--space-3); }
.carta-form__section { min-width: 0; margin-block: var(--space-8); }
.carta-form__fields { display: grid; gap: var(--space-5); }
.carta-form__item { min-width: 0; margin-block: var(--space-5); }
.carta-form input:not([type="radio"]):not([type="checkbox"]),
.carta-form textarea,
.carta-form select { width: 100%; max-width: 100%; min-width: 0; }
.carta-form textarea { min-height: 8rem; resize: vertical; }
.carta-form label,
.carta-form legend,
.carta-form p { overflow-wrap: anywhere; }
.carta-form__actions { display: flex; flex-wrap: wrap; gap: var(--space-3); }
```

Valores/arranjo sao candidatos, nao layout confirmado. Preservar Inter/tokens,
altura natural e todo texto editavel. Nao esconder overflow global ou limitar
comprimento para caber. Medir foco/contraste reais; header sticky/teclado virtual
nao podem encobrir controle ou erro. Sem efeitos/movimento obrigatorios.

## Infraestrutura e testes futuros

Como migracao/identidade/persistencia podem perder dados, automatizar testes
significativos. Proposta T005: Vitest + jsdom + Testing Library/react + user-event,
com versoes compativeis fixadas/verificadas na implementacao. Nao instalar agora.
Scripts futuros test e test:run, com `vitest run` para verificacao final;
configuration resolve arquivos .test.ts/.test.tsx e cleanup apos cada teste.
Reusar infraestrutura se outra feature a entregar antes.

| Grupo | Casos essenciais | Tarefas |
| --- | --- | --- |
| Factory/reducer | Objetos independentes, fixture congelada, updates sucessivos, IDs, vizinhos intactos, mover limites/renumerar | T022 |
| Decoder | Legado/v2/future, falso legado/v2, grupos/tipos invalidos, campos novos, Unicode/HTML, IDs duplicados, ordens, limites sem truncamento | T023 |
| Storage/provider | get/set/quota, partial/future intocados ate editar, migration completa apos hidratar, StrictMode, ultimas teclas e recarga | T023 |
| UI/jornada | Cinco partes/nodes, campos reais em 2024:269, orientacao 006, previa 821:308, null, listas/foco e links/historico | T024 |
| Revisao | Espacos/custo 0/opcionais, erro em parte oculta, sugestao sem substituir, previa parcial/failed | T019/T024 |
| Consumidores | Valores atuais/nome popular/orientacao/null/listas sem IDs | T025, pendente por entrega |

Manuais T026: Chrome/Edge/Firefox/Safari; Windows/NVDA desktop e iOS Safari/
VoiceOver movel conforme matriz real da 016, Android Chrome quando disponivel.
1440/1024/768/390/320 px/intermediarias, texto 200%, zoom/reflow, orientacao,
fonte fallback, teclado virtual e listas/textos longos. Ambiente ausente e pendente.

## Rastreabilidade e aceite

| CA | Evidencia futura |
| --- | --- |
| CA01 | URL/recarga/003/006/menu livres, formulario real |
| CA02 | Cinco partes/todos os campos, copy/orientacoes/opcionais corretos |
| CA03 | Troca de parte preserva valores e nao exige completude |
| CA04 | Documentos/canais editaveis com vizinhos/atributos intactos |
| CA05 | Movimento/remocao com IDs/ordem/foco por teclado |
| CA06 | null/Sim/Nao e orientacao preservada, legado sem inferencia |
| CA07 | Ausencia nao vira gratuito/sem exigencia |
| CA08 | Required/revisao/resumo/retorno e previa parcial livre |
| CA09 | Orientacoes/sugestoes nao alteram texto |
| CA10 | Navegar outras rotas/voltar sem perder a Carta unica |
| CA11 | Recarga de envelope valido restaura listas/textos |
| CA12 | Storage/JSON/versao/legado invalidos sem crash/overwrite indevido |
| CA13 | Consumidores reais usam v2 atual; pendente ate entrega individual |
| CA14 | Teclado/leitor, labels/grupos/listas/erros/foco |
| CA15 | Reflow/ampliacao/listas extensas e teclado virtual |
| CA16 | Acentos/quebras/HTML literal preservados sem execucao |
| CA17 | Fonte editorial/sessao, sem backend/logs/publicacao/aprovacao |
| CA18 | Consultas Figma reais, comparacao e divergencias resolvidas |
| CA19 | Nao oculta configuracoes, preserva valores e retira obrigatoriedade; T018/T019/T022–T024 |
| CA20 | Paraiba Digital identifica fluxo nativo sem Link/Exibicao; T018/T019/T024 |
| CA21 | Externo com URL e Dentro do Paraiba Digital registra permanencia na experiencia; T018/T019/T024–T025 |
| CA22 | Externo com URL e Em uma nova pagina registra redirecionamento; T018/T019/T024–T025 |
| CA23 | Troca externo/nativo preserva valores na sessao/recarga e exclui inativos dos consumidores; T018/T019/T022–T025 |
| CA24 | Online/Presencial/ambos, sistema e URL/exibicao condicionais; pendencias sem bloquear previa parcial; gate CSV integrado depende 008/010; T018/T019/T024–T025 |
| CA25 | Cinco partes/nodes na mesma rota, estado preservado e layout adaptavel; T003/T015/T021/T024/T026 |
| CA26 | Form-Card `811:306`/`811:382`, aria-expanded e orientacao da 006; T003/T013–T014/T024/T026 |
| CA27 | Previa compartilhada `821:308` com view model da 009; T003/T015/T020/T024–T025 |
| CA28 | `2024:269` reconstruido como formulario real e acessivel; T003/T015–T019/T021/T024/T026 |

Checks apos codigo: typecheck, build e suite configurada. T027 registra
commit/data/ambiente/passos/resultado/evidencia/defeito/reteste em verification.md,
com quickstart reproduzivel. Nao executar build documental como prova de codigo
que ainda nao existe, nem marcar tarefas por simples criacao deste plano.

## Pendencias e ordem de execucao

1. T001–T004: confrontar PDF ERS, resolver jornada/012/limites, validar copy,
   consultar Design/Make e consolidar navegacao/retorno/foco com 002/003/008.
2. Atualizar este plano com frames/regras/evidencias e executar T006 `/spec:validar`.
3. `/spec:implementar`: T007–T012 modelo/reducer/decoder/storage/provider e
   adaptacoes minimas; testes de recuperacao antes de conectar consumidores.
4. T013–T021 conteudo/campos/listas/agendamento/revisao/navegacao/estilos,
   sem implementar engine 008, previa, CSV completo ou copia nesta feature.
5. T022–T027 testes/checks/evidencias. Placeholders, ERS/editorial/Figma ou
   ambientes pendentes impedem aceite integral; registrar dono e proxima acao.

Figma nao conectado bloqueia fechamento visual; copy/ERS/revisao da 012 e
limites tecnicos candidatos exigem consolidacao antes de codigo dependente.
Esta base nao altera silenciosamente a spec ou afirma homologacao externa.

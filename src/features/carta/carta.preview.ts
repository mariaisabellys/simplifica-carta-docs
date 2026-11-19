import type { CartaServico } from "./carta.types";

export type CartaPreviewValue =
  | { kind: "text"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "missing" };

export type CartaPreviewField = {
  id: string;
  label: string;
  value: CartaPreviewValue;
};

export type CartaPreviewItem = {
  id: string;
  label: string;
  fields: readonly CartaPreviewField[];
};

export type CartaPreviewSection = {
  id: string;
  title: string;
  fields: readonly CartaPreviewField[];
  items?: readonly CartaPreviewItem[];
  emptyItemsLabel?: string;
};

export type CartaPreviewModel = {
  hasContent: boolean;
  hasEmptyItems: boolean;
  sections: readonly CartaPreviewSection[];
};

const text = (value: string | null | undefined): CartaPreviewValue =>
  typeof value === "string" && value.trim().length > 0 ? { kind: "text", text: value } : { kind: "missing" };

const choice = (value: string | null | undefined): CartaPreviewValue => value ? { kind: "text", text: value } : { kind: "missing" };
const list = (items: readonly string[]): CartaPreviewValue => items.length ? { kind: "list", items: [...items] } : { kind: "missing" };
const field = (id: string, label: string, value: CartaPreviewValue): CartaPreviewField => ({ id, label, value });

const costLabels = { gratuito: "Gratuito", "sob-consulta": "Sob consulta", "com-taxa": "Com taxa" } as const;
const schedulingTypeLabels = { online: "Online", presencial: "Presencial" } as const;
const schedulingSystemLabels = { "paraiba-digital": "Paraíba Digital", "sistema-externo": "Outro sistema ou site" } as const;
const schedulingDisplayLabels = { "dentro-paraiba-digital": "Dentro do Paraíba Digital", "nova-pagina": "Em uma nova página" } as const;

export const cartaPreviewDefinitionIds = [
  "service-name", "popular-name", "service-description", "category", "subcategory", "topic", "active",
  "specific-audience", "user-profile", "who-can-use", "required-documents", "costs-and-fees", "cost-value-or-link", "maximum-deadline", "deadline-type",
  "step-title", "citizen-guidance", "modality",
  "requires-scheduling", "scheduling-type", "scheduling-system", "scheduling-link", "scheduling-display",
  "important-additional-information", "keywords",
] as const;

export function criarModeloPreviaCarta(carta: CartaServico): CartaPreviewModel {
  const scheduling = carta.atendimento.exigeAgendamento === true;
  const online = scheduling && carta.atendimento.tiposAgendamento.includes("online");
  const external = online && carta.atendimento.sistemaAgendamento === "sistema-externo";
  const showCostDetail = carta.publicoRequisitos.custo.tipo === "sob-consulta" || carta.publicoRequisitos.custo.tipo === "com-taxa";

  const documentItems: CartaPreviewItem[] = carta.publicoRequisitos.documentos.map((document, index) => ({
    id: document.id,
    label: `Documento ${index + 1}`,
    fields: [field("required-documents", "Documento necessário", text(document.nome))],
  }));
  const stepItems: CartaPreviewItem[] = carta.etapas.map((step, index) => ({
    id: step.id,
    label: `Etapa ${index + 1}`,
    fields: [
      field("step-title", "Título da etapa", text(step.titulo)),
      field("citizen-guidance", "Orientação ao cidadão", text(step.orientacaoCidadao)),
      field("modality", "Modalidade", choice(step.modalidade)),
    ],
  }));

  const sections: CartaPreviewSection[] = [
    {
      id: "about-service",
      title: "Sobre o serviço",
      fields: [
        field("service-name", "Nome do serviço", text(carta.sobreServico.nome)),
        field("popular-name", "Nome popular", text(carta.sobreServico.nomePopular)),
        field("service-description", "O que é o serviço", text(carta.sobreServico.descricao)),
        field("category", "Categoria", choice(carta.sobreServico.categoria)),
        field("subcategory", "Subcategoria", choice(carta.sobreServico.subcategoria)),
        field("topic", "Tópico", text(carta.sobreServico.topico)),
        field("active", "Situação do serviço", { kind: "text", text: carta.sobreServico.ativo ? "Ativo" : "Inativo" }),
      ],
    },
    {
      id: "audience-requirements",
      title: "Público e requisitos",
      fields: [
        field("specific-audience", "Público específico", list(carta.publicoRequisitos.publicosEspecificos)),
        field("user-profile", "Perfil do usuário", list(carta.publicoRequisitos.perfisUsuario)),
        field("who-can-use", "Quem pode utilizar", text(carta.publicoRequisitos.quemPodeUtilizar)),
        field("costs-and-fees", "Custos e taxas", choice(carta.publicoRequisitos.custo.tipo ? costLabels[carta.publicoRequisitos.custo.tipo] : null)),
        ...(showCostDetail ? [field("cost-value-or-link", "Valor ou link para consulta", text(carta.publicoRequisitos.custo.detalhe))] : []),
        field("maximum-deadline", "Prazo máximo", text(carta.publicoRequisitos.prazo.maximo)),
        field("deadline-type", "Tipo de prazo", choice(carta.publicoRequisitos.prazo.tipo)),
      ],
      items: documentItems,
      emptyItemsLabel: "Nenhum documento informado",
    },
    {
      id: "service-flow",
      title: "Como o serviço funciona",
      fields: [],
      items: stepItems,
      emptyItemsLabel: "Nenhuma etapa informada",
    },
    {
      id: "service-attendance",
      title: "Atendimento",
      fields: [
        field("requires-scheduling", "Necessita de agendamento?", carta.atendimento.exigeAgendamento === null ? { kind: "missing" } : { kind: "text", text: carta.atendimento.exigeAgendamento ? "Sim" : "Não" }),
        ...(scheduling ? [field("scheduling-type", "Tipo de agendamento", list(carta.atendimento.tiposAgendamento.map((item) => schedulingTypeLabels[item])))] : []),
        ...(online ? [field("scheduling-system", "Sistema de agendamento", choice(carta.atendimento.sistemaAgendamento ? schedulingSystemLabels[carta.atendimento.sistemaAgendamento] : null))] : []),
        ...(external ? [
          field("scheduling-link", "Link do agendamento", text(carta.atendimento.linkAgendamento)),
          field("scheduling-display", "Como o agendamento será exibido?", choice(carta.atendimento.exibicaoAgendamento ? schedulingDisplayLabels[carta.atendimento.exibicaoAgendamento] : null)),
        ] : []),
      ],
    },
    {
      id: "final-information",
      title: "Informações finais",
      fields: [
        field("important-additional-information", "Informações adicionais importantes", text(carta.informacoesFinais.informacoesAdicionais)),
        field("keywords", "Palavras-chave", text(carta.informacoesFinais.palavrasChave)),
      ],
    },
  ];

  return {
    hasContent: hasCartaContent(carta, { scheduling, online, external, showCostDetail }),
    hasEmptyItems: carta.publicoRequisitos.documentos.some((item) => !item.nome.trim()) || carta.etapas.some((item) => !item.titulo.trim() || !item.orientacaoCidadao.trim() || !item.modalidade),
    sections,
  };
}

function hasCartaContent(carta: CartaServico, conditions: { scheduling: boolean; online: boolean; external: boolean; showCostDetail: boolean }): boolean {
  const applicableText = [
    carta.sobreServico.nome, carta.sobreServico.nomePopular, carta.sobreServico.descricao, carta.sobreServico.topico,
    carta.publicoRequisitos.quemPodeUtilizar, carta.publicoRequisitos.prazo.maximo,
    carta.informacoesFinais.informacoesAdicionais, carta.informacoesFinais.palavrasChave,
    ...(conditions.showCostDetail ? [carta.publicoRequisitos.custo.detalhe] : []),
    ...(conditions.external ? [carta.atendimento.linkAgendamento] : []),
  ];
  return applicableText.some((value) => value.trim().length > 0)
    || carta.sobreServico.categoria !== null
    || carta.sobreServico.subcategoria !== null
    || carta.sobreServico.ativo
    || carta.publicoRequisitos.publicosEspecificos.length > 0
    || carta.publicoRequisitos.perfisUsuario.length > 0
    || carta.publicoRequisitos.custo.tipo !== null
    || carta.publicoRequisitos.prazo.tipo !== null
    || carta.publicoRequisitos.documentos.some((item) => item.nome.trim().length > 0)
    || carta.etapas.some((item) => item.titulo.trim().length > 0 || item.orientacaoCidadao.trim().length > 0 || item.modalidade !== null)
    || carta.atendimento.exigeAgendamento !== null
    || (conditions.scheduling && carta.atendimento.tiposAgendamento.length > 0)
    || (conditions.online && carta.atendimento.sistemaAgendamento !== null)
    || (conditions.external && carta.atendimento.exibicaoAgendamento !== null);
}

export function cartaPreviewDomId(prefix: string, sectionId: string, fieldId: string, itemId?: string): string {
  return [prefix, sectionId, itemId, fieldId].filter(Boolean).map((part) => String(part).replace(/[^a-zA-Z0-9_-]/g, "-")).join("-");
}

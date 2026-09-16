import type { CartaServico } from "./carta.types";

export const cartaServicoInicial: CartaServico = {
  identificacao: {
    nome: "",
    descricao: "",
    publicoAlvo: "",
  },
  requisitos: {
    documentos: [],
    criterios: "",
  },
  atendimento: {
    canais: [],
    prazo: "",
    custo: "",
    exigeAgendamento: false,
  },
  etapas: [],
  informacoesComplementares: "",
};

export const camposObrigatoriosCarta = [
  "identificacao.nome",
  "identificacao.descricao",
  "identificacao.publicoAlvo",
  "atendimento.prazo",
  "atendimento.custo",
] as const;

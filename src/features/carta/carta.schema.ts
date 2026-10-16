import type { CartaServico } from "./carta.types";

export function criarCartaServicoInicial(): CartaServico {
  return {
    versao: 3,
    sobreServico: { nome: "", nomePopular: "", descricao: "", categoria: null, subcategoria: null, topico: "", ativo: false },
    publicoRequisitos: {
      publicosEspecificos: [], perfisUsuario: [], quemPodeUtilizar: "", documentos: [],
      custo: { tipo: null, detalhe: "" }, prazo: { maximo: "", tipo: null },
    },
    etapas: [],
    atendimento: {
      exigeAgendamento: null, tiposAgendamento: [], sistemaAgendamento: null,
      linkAgendamento: "", exibicaoAgendamento: null,
    },
    informacoesFinais: { informacoesAdicionais: "", palavrasChave: "" },
  };
}

export const cartaServicoInicial = criarCartaServicoInicial();

export const camposObrigatoriosCarta = [
  "sobreServico.nome",
  "sobreServico.descricao",
  "sobreServico.categoria",
  "sobreServico.subcategoria",
  "publicoRequisitos.perfisUsuario",
  "publicoRequisitos.quemPodeUtilizar",
  "publicoRequisitos.custo.tipo",
  "publicoRequisitos.prazo.maximo",
  "publicoRequisitos.prazo.tipo",
  "atendimento.exigeAgendamento",
] as const;

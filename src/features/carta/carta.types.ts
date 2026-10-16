import type { CategoriaServico, ModalidadeEtapa, PerfilUsuario, PublicoEspecifico, SubcategoriaServico, TipoPrazo } from "./carta.catalogs";

export type DocumentoServico = { id: string; nome: string };
export type EtapaServico = { id: string; ordem: number; titulo: string; orientacaoCidadao: string; modalidade: ModalidadeEtapa | null };
export type TipoCusto = "gratuito" | "sob-consulta" | "com-taxa";
export type TipoAgendamento = "online" | "presencial";
export type SistemaAgendamento = "paraiba-digital" | "sistema-externo";
export type ExibicaoAgendamento = "dentro-paraiba-digital" | "nova-pagina";

export type CartaServico = {
  versao: 3;
  sobreServico: {
    nome: string;
    nomePopular: string;
    descricao: string;
    categoria: CategoriaServico | null;
    subcategoria: SubcategoriaServico | null;
    topico: string;
    ativo: boolean;
  };
  publicoRequisitos: {
    publicosEspecificos: PublicoEspecifico[];
    perfisUsuario: PerfilUsuario[];
    quemPodeUtilizar: string;
    documentos: DocumentoServico[];
    custo: { tipo: TipoCusto | null; detalhe: string };
    prazo: { maximo: string; tipo: TipoPrazo | null };
  };
  etapas: EtapaServico[];
  atendimento: {
    exigeAgendamento: boolean | null;
    tiposAgendamento: TipoAgendamento[];
    sistemaAgendamento: SistemaAgendamento | null;
    linkAgendamento: string;
    exibicaoAgendamento: ExibicaoAgendamento | null;
  };
  informacoesFinais: {
    informacoesAdicionais: string;
    palavrasChave: string;
  };
};

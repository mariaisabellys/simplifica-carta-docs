export type EtapaServico = {
  ordem: number;
  descricao: string;
};

export type DocumentoServico = {
  nome: string;
  obrigatorio: boolean;
};

export type CanalAtendimento = {
  tipo: "online" | "presencial" | "telefone" | "email" | "outro";
  descricao: string;
};

export type CartaServico = {
  identificacao: {
    nome: string;
    descricao: string;
    publicoAlvo: string;
  };
  requisitos: {
    documentos: DocumentoServico[];
    criterios: string;
  };
  atendimento: {
    canais: CanalAtendimento[];
    prazo: string;
    custo: string;
    exigeAgendamento: boolean;
  };
  etapas: EtapaServico[];
  informacoesComplementares: string;
};

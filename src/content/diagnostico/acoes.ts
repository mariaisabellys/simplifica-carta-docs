import type { RespostaDiagnosticoId } from "./respostas";

export type AcaoNavegavelDiagnostico = {
  label: string;
  href: string;
};

export type AcoesResultadoDiagnostico = {
  cardPrimary?: AcaoNavegavelDiagnostico;
  navigationNext?: AcaoNavegavelDiagnostico;
};

export const acaoRefazerDiagnostico = {
  label: "Refazer diagnóstico",
} as const;

export const acaoVoltarInicioDiagnostico = {
  label: "Voltar para página inicial",
  href: "/",
} as const satisfies AcaoNavegavelDiagnostico;

export const acoesResultadoDiagnosticoPorId = {
  "etapa-de-outro-servico": {
    cardPrimary: {
      label: "Consultar ajuda",
      href: "/ajuda",
    },
  },
  "processo-interno": {
    cardPrimary: {
      label: "Consultar ajuda",
      href: "/ajuda",
    },
  },
  "servico-publico": {
    navigationNext: {
      label: "Organizar informações",
      href: "/organizar-informacoes",
    },
  },
  autosservico: {
    navigationNext: {
      label: "Organizar informações",
      href: "/organizar-informacoes",
    },
  },
  "analisar-melhor": {
    cardPrimary: {
      label: "Consultar ajuda",
      href: "/ajuda",
    },
  },
} as const satisfies Record<RespostaDiagnosticoId, AcoesResultadoDiagnostico>;

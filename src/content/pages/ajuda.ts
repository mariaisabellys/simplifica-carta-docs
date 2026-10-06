export type FaqItemId =
  | "different-by-audience"
  | "depends-on-another-agency"
  | "digital-and-in-person"
  | "responsible-for-updates";

export type FaqItem = {
  id: FaqItemId;
  question: string;
  answer: string;
};

export const helpPageContent = {
  title: "Dúvidas frequentes",
  tagline: "Uma resposta quando você precisa.",
  description:
    "Encontre respostas rápidas para dúvidas que podem surgir durante o cadastro dos serviços.",
  primaryAction: {
    label: "Ainda preciso de ajuda ->",
    href: "/ajuda#precisa-de-apoio",
  },
  faq: {
    id: "duvidas-frequentes",
    title: "Perguntas frequentes",
    items: [
      {
        id: "different-by-audience",
        question: "O que fazer quando o serviço é diferente conforme o público?",
        answer:
          "Se as regras, documentos, etapas ou resultados mudarem muito para cada público, pode ser melhor criar serviços separados. Se as diferenças forem pequenas, informe essas condições dentro do mesmo serviço.",
      },
      {
        id: "depends-on-another-agency",
        question: "Como cadastrar um serviço que depende de outro órgão?",
        answer:
          "Informe o que cabe ao seu órgão e explique quando houver participação de outro órgão. O usuário precisa saber quem realiza cada parte e onde deve procurar atendimento, se necessário.",
      },
      {
        id: "digital-and-in-person",
        question: "O que fazer quando parte do serviço é digital e parte é presencial?",
        answer:
          "Informe todas as etapas na ordem em que acontecem e indique quais são digitais e quais exigem atendimento presencial.",
      },
      {
        id: "responsible-for-updates",
        question: "Quem deve atualizar a Carta de Serviço depois que ela for publicada?",
        answer:
          "O órgão responsável pelo serviço deve manter as informações atualizadas sempre que houver mudanças em documentos, etapas, prazos, canais ou outras condições.",
      },
    ] satisfies readonly FaqItem[],
  },
  support: {
    id: "precisa-de-apoio",
    sectionTitle: "Precisa de apoio?",
    title: "Agende uma visita com a equipe de Serviços Digitais",
    description:
      "Receba orientações caso sua dúvida não tenha sido esclarecida pelo Manual Simplifica Carta.",
    action: {
      label: "Agendar visita ->",
      href: "/ajuda/atendimento-agendado",
    },
  },
} as const;

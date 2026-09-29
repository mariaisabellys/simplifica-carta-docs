export type HomeAction = {
  label: string;
  href: "/diagnostico" | "/explorar-por-etapas";
  variant: "primary" | "secondary-inverse";
  icon: "play" | "list";
};

export type HomeProcessStep = {
  id: "identificar" | "organizar" | "elaborar" | "simular";
  number: 1 | 2 | 3 | 4;
  eyebrow: string;
  title: string;
  description: string;
  href:
    | "/diagnostico"
    | "/organizar-informacoes"
    | "/formulario-carta"
    | "/tutorial-paraiba-digital";
};

export const homeContent = {
  productName: "Simplifica Carta",
  hero: {
    title: "Menos burocracia, mais praticidade.",
    description:
      "Selecione a experiência que melhor atende às suas necessidades: um guia completo do início ao fim ou acesso livre às seções da Carta de Serviço.",
    actions: [
      {
        label: "Iniciar guia",
        href: "/diagnostico",
        variant: "primary",
        icon: "play",
      },
      {
        label: "Explorar por etapas",
        href: "/explorar-por-etapas",
        variant: "secondary-inverse",
        icon: "list",
      },
    ] satisfies readonly HomeAction[],
  },
  process: {
    title: "Como funciona o processo?",
    description:
      "O manual conduz você de forma simples e intuitiva através de quatro etapas essenciais para garantir um serviço direto, acessível e em conformidade com as normas.",
    steps: [
      {
        id: "identificar",
        number: 1,
        eyebrow: "Entenda",
        title: "Identificar um serviço",
        description: "Verifique se é realmente um serviço.",
        href: "/diagnostico",
      },
      {
        id: "organizar",
        number: 2,
        eyebrow: "Reúna",
        title: "Organizar informações",
        description: "Reúna todas as informações necessárias",
        href: "/organizar-informacoes",
      },
      {
        id: "elaborar",
        number: 3,
        eyebrow: "Desenvolva",
        title: "Elaborar carta",
        description: "Preencha a Carta seguindo nossas dicas.",
        href: "/formulario-carta",
      },
      {
        id: "simular",
        number: 4,
        eyebrow: "Conclua",
        title: "Simular publicação",
        description: "Siga o tutorial para publicar a carta na plataforma.",
        href: "/tutorial-paraiba-digital",
      },
    ] satisfies readonly HomeProcessStep[],
  },
  introCta: {
    eyebrow: "Não sabe por onde começar?",
    title: "Conheça primeiro o que é uma Carta de Serviços",
    description:
      "Entenda o que caracteriza uma Carta de Serviços e qual é sua finalidade",
    actionLabel: "O que é a Carta de Serviço?",
    actionHref: "/o-que-e-carta-de-servicos",
  },
} as const;

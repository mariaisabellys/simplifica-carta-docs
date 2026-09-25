export type ExploreStepId =
  | "identificar-servico"
  | "organizar-informacoes"
  | "elaborar-carta"
  | "tutorial-publicacao";

export type ExploreStepTone = "cyan" | "orange" | "navy" | "wine";

export type ExploreStepHref =
  | "/diagnostico"
  | "/organizar-informacoes"
  | "/formulario-carta"
  | "/tutorial-paraiba-digital";

export type ExploreStep = {
  id: ExploreStepId;
  number: 1 | 2 | 3 | 4;
  tone: ExploreStepTone;
  title: string;
  description: string;
  actionLabel: string;
  href: ExploreStepHref;
};

export const explorePageContent = {
  title: "Explorar por etapas",
  description:
    "Acesse qualquer parte do manual diretamente, sem precisar seguir o fluxo completo. Escolha a etapa que você precisa para agilizar a criação da sua Carta de Serviço.",
  steps: [
    {
      id: "identificar-servico",
      number: 1,
      tone: "cyan",
      title: "Identificar um serviço",
      description:
        "Descubra se aquilo que deseja cadastrar é realmente um serviço público de acordo com as diretrizes oficiais. Responda um breve diagnóstico interativo.",
      actionLabel: "Iniciar diagnóstico",
      href: "/diagnostico",
    },
    {
      id: "organizar-informacoes",
      number: 2,
      tone: "orange",
      title: "Organizar informações",
      description:
        "Saiba quais informações e documentos cruciais reunir antes de elaborar a Carta de Serviços. Use nossa lista de verificação para não esquecer nada.",
      actionLabel: "Ver lista de informações",
      href: "/organizar-informacoes",
    },
    {
      id: "elaborar-carta",
      number: 3,
      tone: "navy",
      title: "Elaborar a Carta",
      description:
        "Preencha, melhore, confira e visualize a Carta em tempo real utilizando técnicas de linguagem simples e acessibilidade. Exporte o CSV e finalize.",
      actionLabel: "Elaborar e conferir",
      href: "/formulario-carta",
    },
    {
      id: "tutorial-publicacao",
      number: 4,
      tone: "wine",
      title: "Tutorial de publicação",
      description:
        "Veja como cadastrar o serviço na plataforma oficial do Estado da Paraíba passo a passo acompanhado de dicas visuais e orientações.",
      actionLabel: "Ver tutorial",
      href: "/tutorial-paraiba-digital",
    },
  ] satisfies readonly ExploreStep[],
  guideCta: {
    prompt: "Prefere seguir o fluxo completo do manual de forma linear?",
    actionLabel: "Ir para o guia passo a passo",
    href: "/diagnostico",
  },
} as const;

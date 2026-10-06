export type HelpChannelId = "scheduled-service" | "email-support";

export const helpChannelsContent = {
  title: "Ainda precisa de ajuda?",
  description:
    "Receba orientação da equipe responsável para tirar dúvidas sobre a identificação, organização ou elaboração da Carta de Serviço.",
  channels: [
    {
      id: "scheduled-service",
      title: "Atendimento Agendado",
      description:
        "Agende uma reunião com nossa equipe especialista em governo digital, linguagem simples e carta de serviços.",
      action: {
        label: "Agendar atendimento",
        href: "/ajuda/atendimento-agendado",
      },
    },
    {
      id: "email-support",
      title: "Suporte por e-mail",
      description:
        "Envie suas dúvidas técnicas detalhadas ou rascunhos da carta de serviço do seu órgão para nossa central de atendimento.",
      action: {
        label: "Enviar e-mail",
        href: "/ajuda/suporte-email",
      },
    },
  ] satisfies readonly {
    id: HelpChannelId;
    title: string;
    description: string;
    action: { label: string; href: string };
  }[],
} as const;

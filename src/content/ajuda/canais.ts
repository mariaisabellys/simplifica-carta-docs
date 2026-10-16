import {
  supportChannels,
  supportDestinations,
  type SupportChannelId,
} from "../support/canais";

export type HelpChannelId = SupportChannelId;

export const helpChannelsContent = {
  title: "Ainda precisa de ajuda?",
  description:
    "Receba orientação da equipe responsável para tirar dúvidas sobre a identificação, organização ou elaboração da Carta de Serviço.",
  channels: [
    {
      id: "atendimento-agendado",
      title: "Atendimento Agendado",
      description:
        "Consulte a disponibilidade de orientação com a equipe de governo digital, linguagem simples e carta de serviços.",
      state: supportChannels["atendimento-agendado"],
      action: {
        label: "Consultar atendimento",
        href: supportDestinations["atendimento-agendado"],
      },
    },
    {
      id: "suporte-email",
      title: "Suporte por e-mail",
      description:
        "Consulte o endereço e o estado do canal para dúvidas sobre a Carta de Serviço.",
      state: supportChannels["suporte-email"],
      action: {
        label: "Consultar canal de e-mail",
        href: supportDestinations["suporte-email"],
      },
    },
  ] satisfies readonly {
    id: HelpChannelId;
    title: string;
    description: string;
    state: (typeof supportChannels)[SupportChannelId];
    action: { label: string; href: string };
  }[],
} as const;

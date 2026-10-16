import {
  supportChannels,
  supportDestinations,
  type SupportChannelId,
} from "../support/canais";
import { supportContacts } from "../support/contatos";

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
        kind: "navigate",
        label: "Consultar atendimento",
        href: supportDestinations["atendimento-agendado"],
      },
    },
    {
      id: "suporte-email",
      title: "Suporte por e-mail",
      description:
        "Copie o e-mail da GESED para entrar em contato sobre dúvidas relacionadas à Carta de Serviço.",
      email: supportContacts.gesed.email,
      state: supportChannels["suporte-email"],
      action: {
        kind: "copy-email",
        label: "Copie o e-mail",
        value: supportContacts.gesed.email,
      },
    },
  ] satisfies readonly {
    id: HelpChannelId;
    title: string;
    description: string;
    email?: string;
    state: (typeof supportChannels)[SupportChannelId];
    action:
      | { kind: "navigate"; label: string; href: string }
      | { kind: "copy-email"; label: string; value: string };
  }[],
} as const;

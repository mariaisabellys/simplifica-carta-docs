import { supportChannels } from "../support/canais";
import { supportContacts } from "../support/contatos";

const channel = supportChannels["suporte-email"];
const contact = supportContacts.gesed;

export const emailSupportContent = {
  title: "Suporte por e-mail",
  description:
    "Consulte as orientações para entrar em contato com a equipe responsável por dúvidas sobre a Carta de Serviço.",
  contact: {
    team: contact.team,
    address: contact.email,
    addressLabel: "Endereço institucional documentado",
  },
  channelState: channel,
  pendingNotice:
    "Não utilize este endereço para atendimento enquanto o canal estiver em validação operacional.",
  action:
    channel.status === "ativo"
      ? {
          label: "Abrir aplicativo de e-mail",
          href: `mailto:${contact.email}`,
        }
      : null,
} as const;

import { supportChannels } from "../support/canais";
import { supportContacts } from "../support/contatos";

const channel = supportChannels["suporte-email"];
const contact = supportContacts.gesed;

export const emailSupportContent = {
  sectionLabel: "Ainda precisa de ajuda?",
  title: "Suporte por e-mail",
  description:
    "Copie o e-mail da GESED e use-o no seu aplicativo ou serviço de e-mail para entrar em contato.",
  contact: {
    team: contact.team,
    address: contact.email,
    addressLabel: "E-mail da GESED",
  },
  channelState: channel,
  copyInstruction:
    "Copie o endereço disponível e cole-o como destinatário da mensagem no seu e-mail.",
  copyAction: {
    label: "Copie o e-mail",
    value: contact.email,
    successMessage: "E-mail copiado!",
    failureMessage: "Não foi possível copiar. Selecione o endereço e copie manualmente.",
  },
  pendingNotice: "",
  action: null as { label: string; href: string } | null,
} as const;

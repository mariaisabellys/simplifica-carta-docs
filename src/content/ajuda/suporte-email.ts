import { getSupportPresentation } from "../support/canais";
import { supportContacts } from "../support/contatos";

const presentation = getSupportPresentation("suporte-email");
const channel = presentation.email.state;
const contact = supportContacts.gesed;

export const emailSupportContent = {
  sectionLabel: "Ainda precisa de ajuda?",
  title: "Suporte por e-mail",
  description: presentation.email.description,
  contact: {
    team: contact.team,
    address: contact.email,
    addressLabel: presentation.email.addressLabel,
  },
  channelState: channel,
  copyInstruction: presentation.email.copyInstruction,
  copyAction: presentation.email.action?.kind === "copy-email" ? {
    label: presentation.email.action.label,
    value: presentation.email.action.value,
    successMessage: "E-mail copiado!",
    failureMessage: "Não foi possível copiar. Selecione o endereço e copie manualmente.",
  } : null,
  unavailableNotice: presentation.unavailableNotice,
  returns: presentation.returns,
  action: null as { label: string; href: string } | null,
} as const;

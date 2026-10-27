import { getSupportPresentation, type SupportChannelId } from "../support/canais";

export type HelpChannelId = SupportChannelId;

export function getHelpChannelsContent(context: SupportChannelId) {
  const presentation = getSupportPresentation(context);
  return {
    title: "Ainda precisa de ajuda?",
    description: "Receba orientação da equipe responsável para tirar dúvidas sobre a identificação, organização ou elaboração da Carta de Serviço.",
    unavailableNotice: presentation.unavailableNotice,
    returns: presentation.returns,
    channels: [
      {
        id: "atendimento-agendado",
        title: "Atendimento Agendado",
        description: "Consulte a disponibilidade de orientação com a equipe de governo digital, linguagem simples e carta de serviços.",
        state: presentation.appointment.state,
        action: presentation.appointment.action,
      },
      {
        id: "suporte-email",
        title: "Suporte por e-mail",
        description: presentation.email.description,
        email: presentation.email.address,
        addressLabel: presentation.email.addressLabel,
        copyInstruction: presentation.email.copyInstruction,
        state: presentation.email.state,
        action: presentation.email.action,
      },
    ],
  } as const;
}

// Compatibilidade para a entrada principal; a rota 015 deve passar seu contexto.
export const helpChannelsContent = getHelpChannelsContent("atendimento-agendado");

export const supportDestinations = {
  "atendimento-agendado": "/ajuda/atendimento-agendado",
  "suporte-email": "/ajuda/suporte-email",
} as const;

export type SupportChannelId = keyof typeof supportDestinations;

export type SupportChannelState =
  | { status: "ativo" }
  | { status: "pendente"; notice: string }
  | { status: "pausado"; notice: string };

export type SupportChannels = Readonly<
  Record<SupportChannelId, SupportChannelState>
>;

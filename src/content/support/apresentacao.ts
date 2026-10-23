import type { SupportChannelState } from "./canais";

type Context = "atendimento-agendado" | "suporte-email";
export type SupportAction =
  | { kind: "open-calendar"; label: string }
  | { kind: "navigate"; label: string; href: string }
  | { kind: "copy-email"; label: string; value: string };

const unavailableNotice = "Este canal está indisponível no momento.";

function resolveState(value: unknown): SupportChannelState {
  if (typeof value !== "object" || value === null) {
    return { status: "pendente", notice: unavailableNotice };
  }
  const state = value as Record<string, unknown>;
  if (state.status === "ativo") return { status: "ativo" };
  if ((state.status === "pendente" || state.status === "pausado") &&
      typeof state.notice === "string" && state.notice.trim()) {
    return { status: state.status, notice: state.notice };
  }
  return { status: "pendente", notice: unavailableNotice };
}

export function resolveSupportPresentation(input: {
  channels: Partial<Record<Context, unknown>>;
  destinations: Record<Context, string>;
  email: string;
}, context: Context) {
  const appointment = resolveState(input.channels["atendimento-agendado"]);
  const email = resolveState(input.channels["suporte-email"]);
  const appointmentActive = appointment.status === "ativo";
  const emailActive = email.status === "ativo";
  const appointmentAction: SupportAction | null = !appointmentActive ? null
    : context === "atendimento-agendado"
      ? { kind: "open-calendar", label: "Consultar datas e horários" }
      : { kind: "navigate", label: "Consultar atendimento", href: input.destinations["atendimento-agendado"] };
  const emailAction: SupportAction | null = emailActive
    ? { kind: "copy-email", label: "Copie o e-mail", value: input.email }
    : null;
  return {
    appointment: { state: appointment, action: appointmentAction },
    email: {
      state: email,
      action: emailAction,
      address: input.email,
      addressLabel: emailActive ? "E-mail da GESED" : "Endereço de referência — canal indisponível",
      description: emailActive
        ? "Copie o e-mail da GESED para entrar em contato sobre dúvidas relacionadas à Carta de Serviço."
        : "Consulte abaixo a situação do canal de suporte por e-mail.",
      copyInstruction: emailActive
        ? "Copie o endereço disponível e cole-o como destinatário da mensagem no seu e-mail."
        : null,
    },
    faqSupport: {
      title: appointmentActive ? "Receba orientação da equipe de Serviços Digitais" : "Consulte os canais de apoio",
      notice: appointment.status === "ativo" ? null : appointment.notice,
      action: {
        label: appointmentActive ? "Consultar atendimento ->" : "Ver canais de apoio ->",
        href: input.destinations["atendimento-agendado"],
      },
    },
    unavailableNotice: !appointmentActive && !emailActive
      ? "Os canais de apoio estão indisponíveis no momento. Você pode consultar as dúvidas frequentes e continuar preparando sua Carta."
      : null,
    returns: [
      { label: "Voltar à ajuda", href: "/ajuda" },
      { label: "Ir para o formulário da Carta", href: "/formulario-carta" },
    ],
  };
}

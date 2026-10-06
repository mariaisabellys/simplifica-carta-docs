import type { AttendancePayload } from "./atendimento.types";

export type Attempt = Readonly<{
  key: string;
  payload: Readonly<AttendancePayload>;
  createdAt: number;
}>;

export function createAttempt(payload: AttendancePayload): Attempt {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const timestamp = Date.now();
  const secret = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  const snapshot: AttendancePayload = {
    nome: payload.nome,
    orgao: payload.orgao,
    setor: payload.setor,
    emailInstitucional: payload.emailInstitucional,
    telefone: payload.telefone,
    assunto: payload.assunto,
    horarioId: payload.horarioId,
  };

  return Object.freeze({
    key: `v1.${timestamp}.${secret}`,
    payload: Object.freeze(snapshot),
    createdAt: timestamp,
  });
}

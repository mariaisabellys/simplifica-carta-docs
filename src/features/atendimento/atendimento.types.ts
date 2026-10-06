export type AttendanceFields = {
  nome: string;
  orgao: string;
  setor: string;
  emailInstitucional: string;
  telefone: string;
  assunto: string;
};

export type AttendancePayload = AttendanceFields & { horarioId: string };

export type SolicitacaoAtendimento = {
  nome: string;
  orgao: string;
  setor: string;
  emailInstitucional: string;
  telefone: string;
  assunto: string;
  data: string;
  horario: string;
};

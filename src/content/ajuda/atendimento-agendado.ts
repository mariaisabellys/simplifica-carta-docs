export type AppointmentFieldId =
  | "full-name"
  | "institutional-email"
  | "phone-extension"
  | "agency-institution"
  | "department"
  | "main-subject"
  | "question-description";

export type AppointmentField = {
  id: AppointmentFieldId;
  label: string;
  description: string;
  example: string;
  required: boolean;
};

export const scheduledServiceContent = {
  dateSelection: {
    title: "Escolha uma data",
    availability: "Consulte a disponibilidade da agenda",
    illustrativeMonth: "Mês ilustrativo: agosto de 2026",
    description:
      "O calendário deve apresentar somente as datas retornadas como disponíveis pela agenda institucional.",
  },
  timeSelection: {
    title: "Escolha um horário",
    description:
      "Após selecionar uma data disponível, o sistema apresenta os horários disponíveis para atendimento.",
    example: {
      label: "Exemplo ilustrativo",
      date: "12 de agosto de 2026",
      introduction:
        "Em uma data selecionada, a lista de horários pode ser apresentada desta forma:",
      availableTimes: ["09:00", "09:30", "10:00", "10:30", "14:00", "15:00", "15:30"],
    },
    instruction:
      "Selecione um dos horários retornados como disponíveis para continuar a solicitação.",
  },
  form: {
    title: "Dados do Agendamento",
    requiredFieldsNotice: "Todos os campos marcados com * são obrigatórios.",
    sectionTitle: "Informações pessoais e institucionais",
    fields: [
      {
        id: "full-name",
        label: "Nome completo *",
        description: "Campo para informar o nome completo do solicitante.",
        example: "Maria Silva",
        required: true,
      },
      {
        id: "institutional-email",
        label: "E-mail institucional *",
        description: "Campo para informar o e-mail institucional do solicitante.",
        example: "Maria.silva@orgao.gov.br",
        required: true,
      },
      {
        id: "phone-extension",
        label: "Telefone / Ramal *",
        description: "Campo para informar um telefone ou ramal para contato.",
        example: "(61) 99999-9999",
        required: true,
      },
      {
        id: "agency-institution",
        label: "Órgão / Instituição *",
        description:
          "Campo para informar o órgão ou instituição ao qual o solicitante está vinculado.",
        example: "Secretaria de Educação",
        required: true,
      },
      {
        id: "department",
        label: "Setor / Departamento *",
        description: "Campo para informar o setor ou departamento do órgão/instituição.",
        example: "Diretoria de Atendimento",
        required: true,
      },
      {
        id: "main-subject",
        label: "Assunto principal *",
        description: "Campo para informar o assunto principal que será tratado no atendimento.",
        example: "Dúvida sobre a identificação do serviço",
        required: true,
      },
      {
        id: "question-description",
        label: "Breve descrição da dúvida",
        description:
          "Campo destinado à descrição do contexto ou da dificuldade encontrada pelo solicitante.",
        example: "Detalhe o contexto ou as dificuldades encontradas.",
        required: false,
      },
    ] satisfies readonly AppointmentField[],
    actionLabel: "Confirmar solicitação",
  },
  confirmation: {
    title: "Solicitação registrada",
    message:
      "Recebemos sua solicitação de atendimento. O registro não confirma que o atendimento já foi agendado.",
    statusNotice:
      "Consulte nesta página a referência e o status informados para a solicitação.",
    summaryTitle: "Resumo da solicitação",
    example: {
      reference: "Referência de exemplo",
      date: "12/08/2026",
      time: "15:00",
      name: "Maria Silva",
      agency: "Secretaria de Educação",
      mainSubject: "Lorem ipsum",
    },
    actions: [
      { label: "Voltar para ajuda", kind: "back-to-help", href: "/ajuda" },
    ],
  },
} as const;

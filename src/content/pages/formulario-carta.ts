export type CharterFormPartId =
  | "about-service"
  | "audience-requirements"
  | "service-flow"
  | "service-attendance"
  | "final-information";

export type CharterFormFieldKind =
  | "text"
  | "textarea"
  | "checkbox-group"
  | "radio-group"
  | "select"
  | "collection";

export const charterFormPageContent = {
  sectionLabel: "Reunir dados",
  title: "Elabore sua Carta de Serviço",
  description:
    "Preencha as informações do serviço. Enquanto você escreve, vamos ajudar a melhorar os textos e mostrar o que ainda falta para sua Carta ficar completa.",
  progress: {
    title: "Progresso da sua Carta",
    question: "O que falta para finalizar?",
    currentPartExample: 1,
    totalParts: 5,
    labelTemplate: "Parte {current} de {total}",
  },
  parts: [
    {
      id: "about-service",
      title: "Sobre o serviço",
      description:
        "Começe pelas informações principais que ajudam o cidadão a entender o que é o serviço",
      fields: [
        { id: "service-name", label: "Nome do serviço", kind: "text" },
        { id: "popular-name", label: "Nome popular", kind: "text" },
        { id: "service-description", label: "O que é o serviço", kind: "text" },
        { id: "category", label: "Categoria", kind: "text" },
        { id: "subcategory", label: "Subcategoria", kind: "text" },
        { id: "topic", label: "Tópico", kind: "text" },
      ],
    },
    {
      id: "audience-requirements",
      title: "Público e requisitos",
      description:
        "Informe quem pode utilizar o serviço e o que é necessário para acessá-lo",
      fields: [
        {
          id: "specific-audience",
          label: "Público específico:",
          kind: "checkbox-group",
          options: ["Servidor", "Cidadão", "Empresa"],
        },
        { id: "user-profile", label: "Perfil do usuário", kind: "text" },
        { id: "who-can-use", label: "Quem pode utilizar", kind: "text" },
        {
          id: "required-documents",
          label: "Documentos necessários",
          kind: "collection",
          behavior: "crud",
        },
        {
          id: "costs-and-fees",
          label: "Custos e taxas",
          kind: "checkbox-group",
          options: ["Gratuito", "Sob consulta", "Com taxa"],
          detailField: {
            id: "cost-value-or-link",
            placeholder: "Informe o valor ou link da consulta",
          },
        },
      ],
    },
    {
      id: "service-flow",
      title: "Como o serviço funciona",
      description:
        "Organize o passo a passo que o cidadão precisa seguir para utilizar o serviço.",
      fields: [
        {
          id: "service-steps",
          label: "Etapas do serviço",
          kind: "collection",
          addLabel: "Adicionar etapa",
          itemLabelTemplate: "Passo {number}",
          itemFields: [
            { id: "step-title", label: "Título da etapa", kind: "text" },
            {
              id: "citizen-guidance",
              label: "Orientação ao cidadão",
              kind: "text",
            },
            { id: "modality", label: "Modalidade", kind: "select" },
          ],
          removeLabel: "Remover",
        },
      ],
    },
    {
      id: "service-attendance",
      title: "Atendimento",
      description:
        "Organize as informações sobre atendimento e agendamento do serviço.",
      fields: [
        {
          id: "requires-scheduling",
          label: "Necessita de agendamento?",
          kind: "select",
          options: ["Sim", "Não"],
        },
        {
          id: "scheduling-type",
          label: "Tipo de agendamento",
          kind: "checkbox-group",
          options: ["Online", "Presencial"],
        },
        {
          id: "scheduling-system",
          label: "Sistema de agendamento",
          kind: "radio-group",
          options: [
            {
              id: "paraiba-digital",
              label: "Paraíba Digital",
              description: "O agendamento será feito pelo próprio Paraíba Digital",
            },
            {
              id: "external-system",
              label: "Outro sistema ou site",
              description:
                "O agendamento será realizado em um sistema ou site externo",
            },
          ],
        },
        {
          id: "external-scheduling",
          visibleWhen: {
            fieldId: "scheduling-system",
            equals: "external-system",
          },
          fields: [
            {
              id: "scheduling-link",
              label: "Link do agendamento",
              kind: "text",
            },
            {
              id: "scheduling-display",
              label: "Como o agendamento será exibido?",
              kind: "radio-group",
              options: [
                {
                  id: "embedded",
                  label: "Dentro do Paraíba Digital",
                  description:
                    "O cidadão permanece no Paraíba Digital durante todo o processo de agendamento.",
                },
                {
                  id: "new-page",
                  label: "Em uma nova página",
                  description:
                    "O cidadão será relacionado para um site externo para realizar o agendamento",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "final-information",
      title: "Informações finais",
      description:
        "Inclua somente informações complementares que sejam importantes para o cidadão",
      fields: [
        {
          id: "important-additional-information",
          label: "Informações adicionais importantes",
          kind: "textarea",
        },
      ],
    },
  ] satisfies readonly {
    id: CharterFormPartId;
    title: string;
    description: string;
    fields: readonly Record<string, unknown>[];
  }[],
  completion: {
    title: "Tudo pronto para publicar",
    description:
      "Você revisou as 5 partes da sua Carta de Serviço. Agora que ela está completa, avance para a próxima etapa e veja como publicá-la no Paraíba Digital.",
    action: {
      label: "Ver tutorial de publicação",
      href: "/tutorial-paraiba-digital",
    },
  },
} as const;

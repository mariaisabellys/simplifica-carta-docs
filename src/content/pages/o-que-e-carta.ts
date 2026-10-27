export type ImportanceItemId = "citizen" | "agency" | "management";
export type FoundationItemId = "citizen" | "public-agency";
export type ServiceInformationFieldId =
  | "name"
  | "description"
  | "audience"
  | "documents"
  | "steps"
  | "deadline"
  | "costs"
  | "channels"
  | "scheduling"
  | "additional-information";
export type LegalReferenceId = "law-13460" | "decree-9094" | "decree-9756";
export type LegalReferenceKind = "Lei Federal" | "Decreto Federal";

export type ContentItem<Id extends string> = {
  id: Id;
  title: string;
  description: string;
};

export type LegalReference = {
  id: LegalReferenceId;
  kind: LegalReferenceKind;
  number: "13.460" | "9.094" | "9.756";
  year: 2017 | 2019;
  summary: string;
  actionLabel: "Consultar";
  href: `https://${string}`;
};

export const aboutCharterPageContent = {
  title: "O que é uma Carta de Serviço?",
  description:
    "É um documento que informa ao cidadão o que é um serviço público, como acessá-lo, o que levar, quanto tempo demora e quanto custa. Tudo de forma clara e justa.",
  importance: {
    title: "Por que é importante?",
    items: [
      {
        id: "citizen",
        title: "Para o cidadão",
        description:
          "Sabe o que esperar e como se preparar antes de buscar o serviço.",
      },
      {
        id: "agency",
        title: "Para o órgão",
        description:
          "Aumenta a transparência, reduz dúvidas e melhora o atendimento.",
      },
      {
        id: "management",
        title: "Para a gestão",
        description:
          "Facilita o monitoramento e a melhoria contínua dos serviços.",
      },
    ] satisfies readonly ContentItem<ImportanceItemId>[],
  },
  foundations: {
    title: "Fundamentos",
    description:
      "A Carta de Serviço ao Cidadão é um documento informativo obrigatório que tem por objetivo informar os usuários sobre os serviços prestados por órgão ou entidade, como formas de acesso a esses serviços e os compromissos de qualidade do atendimento.",
    items: [
      {
        id: "citizen",
        title: "Para o Cidadão",
        description:
          "Garante transparência, previsibilidade e economia de tempo ao saber exatamente quais documentos levar, quanto tempo vai demorar e onde solicitar.",
      },
      {
        id: "public-agency",
        title: "Para o Órgão Público",
        description:
          "Padroniza os fluxos de atendimento, reduz a chegada de demandas incompletas e fortalece a confiança da sociedade na instituição.",
      },
    ] satisfies readonly ContentItem<FoundationItemId>[],
  },
  information: {
    title: "O que uma Carta de Serviço deve informar?",
    description: "Cada um desses campos deve ser preenchido de forma objetiva",
    fields: [
      { id: "name", title: "Nome do serviço", description: "Identificação direta e objetiva do serviço." },
      { id: "description", title: "O que é", description: "Descrição simplificada do serviço oferecido." },
      { id: "audience", title: "Quem pode utilizar", description: "Público com direito ou necessidade de uso." },
      { id: "documents", title: "Documentos necessários", description: "Tudo que o cidadão precisa apresentar." },
      { id: "steps", title: "Etapas", description: "Passos do início ao fim do serviço." },
      { id: "deadline", title: "Prazo", description: "Tempo estimado para conclusão." },
      { id: "costs", title: "Custos", description: "Valores, taxas ou gratuidade." },
      { id: "channels", title: "Canais de atendimento", description: "Formas de acessar o serviço." },
      { id: "scheduling", title: "Agendamento", description: "Se é necessário agendar e como." },
      { id: "additional-information", title: "Informações Adicionais", description: "Outras orientações relevantes." },
    ] satisfies readonly ContentItem<ServiceInformationFieldId>[],
  },
  legislation: {
    title: "Legislação Aplicável",
    description: "Principais normas federais e diretrizes de governança.",
    references: [
      {
        id: "law-13460",
        kind: "Lei Federal",
        number: "13.460",
        year: 2017,
        summary:
          "Dispõe sobre participação, proteção e defesa dos direitos do usuário dos serviços públicos da administração pública.",
        actionLabel: "Consultar",
        href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/lei/l13460.htm",
      },
      {
        id: "decree-9094",
        kind: "Decreto Federal",
        number: "9.094",
        year: 2017,
        summary:
          "Regulamenta dispositivos da Lei nº 13.460/2017 e dispõe sobre simplificação do atendimento prestado aos usuários dos serviços públicos federais.",
        actionLabel: "Consultar",
        href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2017/decreto/d9094.htm",
      },
      {
        id: "decree-9756",
        kind: "Decreto Federal",
        number: "9.756",
        year: 2019,
        summary:
          "Institui o portal único “gov.br” e dispõe sobre as regras de unificação dos canais digitais do Governo federal.",
        actionLabel: "Consultar",
        href: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/decreto/d9756.htm",
      },
    ] satisfies readonly LegalReference[],
  },
} as const;

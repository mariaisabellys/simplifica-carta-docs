export type TutorialStepId =
  | "access-platform"
  | "sign-in"
  | "locate-registration"
  | "fill-information"
  | "publish-service";

export type TutorialAction = {
  label: string;
  kind: "previous" | "next" | "finish";
};

const tutorialNavigation = [
  { id: "access-platform", label: "Acesse a plataforma" },
  { id: "sign-in", label: "Faça login" },
  { id: "locate-registration", label: "Localize o cadastro" },
  { id: "fill-information", label: "Cadastre as informações de sua Carta" },
  { id: "publish-service", label: "Publique o serviço" },
] as const;

const platformPreview = {
  title: "Visão da plataforma",
  placeholder: "Aqui serão adicionados GIFs reais da seção de cadastro.",
} as const;

export const tutorialCartaDataContent = {
  title: "Informações da sua Carta",
  description:
    "Confira as informações da sua Carta. Copie os campos de texto preenchidos e selecione manualmente as opções correspondentes na plataforma oficial.",
  projection: {
    owner: "feature-012",
    source: "carta-v3",
    groupCount: 5,
    fieldDefinitionCount: 25,
    copyableTextDefinitionCount: 13,
    displayOnlyChoiceDefinitionCount: 12,
  },
  copyActionLabelTemplate: "Copiar {field}",
  emptyTextValue: "Não informado",
  emptyCollectionValue: "Nenhum item informado",
  manualChoiceNotice:
    "As opções escolhidas devem ser selecionadas manualmente na plataforma oficial.",
} as const;

export const tutorialParaibaDigitalContent = {
  completion: {
    title: "Guia concluído!",
    description: "Você concluiu todas as etapas do guia para publicar sua Carta de Serviço.",
    guidance: "Agora, confira se todas as informações foram cadastradas corretamente na plataforma oficial. Após o envio, o serviço seguirá para análise antes da publicação no Paraíba Digital.",
    homeLabel: "Voltar ao início",
    platformLabel: "Acessar plataforma oficial",
  },
  officialPlatformUrl: "https://gestor.paraibadigital.pb.gov.br/",
  title: "Publique sua Carta de Serviço",
  description:
    "Siga o guia interativo de 5 etapas para publicar as informações do seu serviço de forma simples, direta e acessível.",
  progress: {
    title: "Progresso do tutorial",
    totalSteps: 5,
    navigation: tutorialNavigation,
    stepLabelTemplate: "Etapa {current} de {total}",
    completionLabelTemplate: "{percentage}% concluído",
  },
  steps: [
    {
      id: "access-platform",
      number: 1,
      percentage: 20,
      title: "Acesse a plataforma",
      description:
        "Abra a plataforma oficial utilizada para cadastrar e gerenciar os serviços do seu órgão, clicando no botão abaixo.",
      platformPreview,
      actions: [
        { label: "Próxima etapa", kind: "next" },
      ] satisfies readonly TutorialAction[],
    },
    {
      id: "sign-in",
      number: 2,
      percentage: 40,
      title: "Faça login",
      description: "Utilize suas credenciais institucionais para acessar o sistema.",
      instructionsTitle: "Como fazer",
      instructions: [
        "Informe seu usuário institucional no campo correspondente.",
        "Digite sua senha e clique em “Entrar”.",
        "Aguarde o redirecionamento para a página de Carta de Serviços.",
      ],
      platformPreview,
      actions: [
        { label: "Etapa anterior", kind: "previous" },
        { label: "Próxima etapa", kind: "next" },
      ] satisfies readonly TutorialAction[],
    },
    {
      id: "locate-registration",
      number: 3,
      percentage: 60,
      title: "Localize o cadastro",
      description:
        "Encontre a seção de cadastro de novas Cartas de Serviço no menu interno.",
      instructionsTitle: "Como fazer",
      instructions: [
        "No painel esquerdo, expanda o menu principal clicando em “Carta de Serviços”.",
        "Clique em “Serviços” para ir para a página de cadastro.",
        "Clique no botão “Novo Serviço” para começar a cadastrar um serviço.",
      ],
      platformPreview,
      actions: [
        { label: "Etapa anterior", kind: "previous" },
        { label: "Próxima etapa", kind: "next" },
      ] satisfies readonly TutorialAction[],
    },
    {
      id: "fill-information",
      number: 4,
      percentage: 80,
      title: "Cadastre as informações de sua Carta",
      cartaData: tutorialCartaDataContent,
      editPrompt: "Precisa alterar alguma informação?",
      editAction: { label: "Editar na minha Carta", href: "/formulario-carta" },
      actions: [
        { label: "Etapa anterior", kind: "previous" },
        { label: "Próxima etapa", kind: "next" },
      ] satisfies readonly TutorialAction[],
    },
    {
      id: "publish-service",
      number: 5,
      percentage: 100,
      title: "Publique o serviço",
      description:
        "Esta é a etapa final do preenchimento. Após salvar, as informações do serviço serão enviadas para análise da equipe de Serviços Digitais antes da publicação no Paraíba Digital.",
      instructionsTitle: "Como fazer",
      instructions: [
        "Revise todas as informações e verifique se não há pendências.",
        "Clique em “Salvar” no canto inferior direito da plataforma.",
        "Após salvar, o serviço será encaminhado para análise da equipe de Serviços Digitais.",
        "Aguarde a avaliação. Caso sejam necessários ajustes, você receberá orientações para realizar as correções.",
        "Após a aprovação, o serviço estará pronto para ser publicado no Paraíba Digital.",
      ],
      platformPreview,
      actions: [
        { label: "Etapa anterior", kind: "previous" },
        { label: "Concluir Guia", kind: "finish" },
      ] satisfies readonly TutorialAction[],
    },
  ] as const,
} as const;

// Mantem compatibilidade com a pagina provisoria ate a implementacao da feature 011.
export const tutorialParaibaDigital = tutorialParaibaDigitalContent.steps;

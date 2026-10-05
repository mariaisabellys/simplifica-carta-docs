export type TutorialStepId =
  | "access-platform"
  | "sign-in"
  | "locate-registration"
  | "fill-information"
  | "review-data"
  | "publish-service";

export type TutorialAction = {
  label: string;
  kind: "official-platform" | "previous" | "next" | "finish";
};

const tutorialNavigation = [
  { id: "access-platform", label: "Acesse a plataforma" },
  { id: "sign-in", label: "Faça login" },
  { id: "locate-registration", label: "Localize o cadastro" },
  { id: "fill-information", label: "Preencha as informações" },
  { id: "review-data", label: "Revise os dados" },
  { id: "publish-service", label: "Publique o serviço" },
] as const;

const platformPreview = {
  title: "Visão da plataforma",
  placeholder: "Aqui serão adicionados GIFs reais da seção de cadastro.",
} as const;

export const tutorialParaibaDigitalContent = {
  title: "Publique sua Carta de Serviço",
  description:
    "Siga o guia interativo de 6 etapas para publicar as informações do seu serviço de forma simples, direta e acessível.",
  progress: {
    title: "Progresso do tutorial",
    totalSteps: 6,
    navigation: tutorialNavigation,
    stepLabelTemplate: "Etapa {current} de {total}",
    completionLabelTemplate: "{percentage}% concluído",
  },
  steps: [
    {
      id: "access-platform",
      number: 1,
      percentage: 17,
      title: "Acesse a plataforma",
      description:
        "Abra a plataforma oficial utilizada para cadastrar e gerenciar os serviços do seu órgão.",
      platformPreview,
      actions: [
        { label: "Acessar plataforma oficial", kind: "official-platform" },
        { label: "Próxima etapa", kind: "next" },
      ] satisfies readonly TutorialAction[],
    },
    {
      id: "sign-in",
      number: 2,
      percentage: 33,
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
      percentage: 50,
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
      percentage: 67,
      title: "Cadastre as informações de sua Carta",
      description:
        "Preencha os campos do formulário na plataforma oficial utilizando os dados consolidados.",
      quickCopyIntroduction: "Utilize os atalhos de cópia rápida abaixo:",
      quickCopyFields: [
        {
          id: "service-name",
          label: "Nome do serviço",
          value: "Solicitar segunda via de certificado",
          copyLabel: "Copiar",
        },
        {
          id: "popular-name",
          label: "Nome popular",
          value: "Solicitar certificado",
          copyLabel: "Copiar",
        },
        {
          id: "service-description",
          label: "O que é o serviço",
          value:
            "Serviço que permite ao cidadão obter cópia autenticada do histórico escolar emitido pela rede pública.",
          copyLabel: "Copiar",
        },
        {
          id: "required-documents",
          label: "Documentos necessários",
          value:
            "Documentos de identificação oficial com foto (RG ou CNH);\nCPF do solicitante;\nComprovante de residência atualizado.",
          copyLabel: "Copiar",
        },
        {
          id: "audience",
          label: "Quem pode utilizar",
          value: "Estudantes matriculados ou concluintes na Rede Estadual de Ensino",
          copyLabel: "Copiar",
        },
        {
          id: "additional-information",
          label: "Outras informações",
          value:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
          id: "keywords",
          label: "Palavras-chave",
          value: "certificado, histórico escolar, escola pública, segunda via",
        },
        {
          id: "scheduling",
          label: "Agendamento",
          value: "Online: www.url.com",
        },
        { id: "cost", label: "Custo:", value: "Gratuito" },
        {
          id: "service-deadline",
          label: "Prazo de atendimento",
          value: "Até 5 dias úteis",
          copyLabel: "Copiar",
        },
      ],
      editPrompt: "Precisa alterar alguma informação?",
      editAction: { label: "Editar na minha Carta", href: "/formulario-carta" },
      actions: [
        { label: "Etapa anterior", kind: "previous" },
        { label: "Próxima etapa", kind: "next" },
      ] satisfies readonly TutorialAction[],
    },
    {
      id: "review-data",
      number: 5,
      percentage: 83,
      title: "Revise os dados",
      description:
        "Antes de finalizar a publicação, revise todos os dados cadastrados. Erros comuns de redação ou links quebrados dificultam o acesso do cidadão ao serviço público.",
      instructionsTitle: "Como fazer",
      instructions: [
        "Verifique se o nome do serviço está correto de acordo com as diretrizes do guia.",
        "Confirme se a descrição do que é o serviço está objetiva e acessível para o cidadão comum.",
        "Revise os documentos necessários e certifique-se de que estão em linguagem simples.",
        "Confira os prazos estimados e os canais de atendimento indicados.",
        "Clique em ‘Salvar rascunho’ se notar que ainda precisa de ajustes nos textos.",
      ],
      platformPreview,
      actions: [
        { label: "Etapa anterior", kind: "previous" },
        { label: "Próxima etapa", kind: "next" },
      ] satisfies readonly TutorialAction[],
    },
    {
      id: "publish-service",
      number: 6,
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

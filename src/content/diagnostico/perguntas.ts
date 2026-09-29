export type PerguntaDiagnosticoId =
  | "entrega-externa"
  | "publico-solicitante"
  | "necessidade-publico"
  | "uso-independente"
  | "acao-iniciada-publico"
  | "resultado-utilizavel"
  | "atendimento-ao-publico"
  | "obtencao-direta";

export type PerguntaDiagnostico = {
  id: PerguntaDiagnosticoId;
  order: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  text: string;
};

export const diagnosticoContent = {
  sectionLabel: "Diagnóstico Interativo",
  title: "Isso é mesmo um serviço?",
  description:
    "Responda as perguntas para descobrir se o que você quer cadastrar é realmente um serviço público.",
  highlights: [
    "Leva menos de 2 minutos",
    "Baseado nos critérios do Gov.br",
    "Você pode recomeçar quando quiser",
  ],
  questions: [
    {
      id: "entrega-externa",
      order: 1,
      text: "A atividade gera uma entrega ou resultado para alguém fora do órgão?",
    },
    {
      id: "publico-solicitante",
      order: 2,
      text: "Existe um público que pode solicitar, acessar ou utilizar essa atividade?",
    },
    {
      id: "necessidade-publico",
      order: 3,
      text: "O resultado atende a uma necessidade desse público?",
    },
    {
      id: "uso-independente",
      order: 4,
      text: "A atividade pode ser utilizada de forma independente, sem fazer parte obrigatoriamente de outro serviço?",
    },
    {
      id: "acao-iniciada-publico",
      order: 5,
      text: "O público consegue iniciar alguma ação para obter o resultado, como solicitar, consultar, emitir, baixar ou agendar?",
    },
    {
      id: "resultado-utilizavel",
      order: 6,
      text: "A atividade gera algo que o público pode usar, como um documento, benefício, autorização, informação, atendimento ou cadastro?",
    },
    {
      id: "atendimento-ao-publico",
      order: 7,
      text: "A atividade existe para atender o público, e não apenas para o funcionamento interno do órgão?",
    },
    {
      id: "obtencao-direta",
      order: 8,
      text: "O resultado pode ser obtido diretamente pelo usuário, sem precisar de análise ou atendimento de um servidor?",
    },
  ] satisfies readonly PerguntaDiagnostico[],
} as const;

export const perguntasDiagnostico = diagnosticoContent.questions;

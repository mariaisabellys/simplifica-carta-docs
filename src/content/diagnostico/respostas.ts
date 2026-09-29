export type RespostaDiagnosticoId =
  | "etapa-de-outro-servico"
  | "processo-interno"
  | "servico-publico"
  | "autosservico"
  | "analisar-melhor";

export type RespostaDiagnostico = {
  id: RespostaDiagnosticoId;
  title: string;
  description: string;
};

export const respostasDiagnostico = [
  {
    id: "etapa-de-outro-servico",
    title: "Pode ser uma etapa de outro serviço",
    description:
      "A atividade descrita parece fazer parte de um serviço maior e, sozinha, não representa uma entrega final para o público atendido. Verifique se essa atividade faz parte de uma sequência que resulta em uma entrega maior. Nesse caso, ela deve aparecer como uma etapa do serviço, e não como um serviço separado.",
  },
  {
    id: "processo-interno",
    title: "Pode ser um processo interno",
    description:
      "A atividade parece estar relacionada ao funcionamento interno do órgão. Processos administrativos e atividades realizadas apenas pela equipe não devem ser cadastrados como serviços. Lembre-se de que uma Carta de Serviço deve apresentar o resultado final entregue ao público atendido, como cidadãos, empresas ou instituições, e não apenas atividades internas do órgão.",
  },
  {
    id: "servico-publico",
    title: "É um serviço público",
    description:
      "Com base nas suas respostas, a atividade atende aos principais critérios de um serviço público e gera uma entrega ou resultado para o público atendido. Você pode avançar para a elaboração da Carta de Serviço.",
  },
  {
    id: "autosservico",
    title: "É um autosserviço",
    description:
      "O resultado é disponibilizado diretamente ao público, sem necessidade de análise ou atendimento de um servidor. Mesmo assim, ele pode ser cadastrado como serviço.",
  },
  {
    id: "analisar-melhor",
    title: "Precisamos analisar melhor",
    description:
      "Há especificidades nesta atividade que exigem uma avaliação mais detalhada. Recomendamos consultar nossos materiais complementares ou agendar um atendimento com nossa equipe.",
  },
] as const satisfies readonly RespostaDiagnostico[];

export const respostasDiagnosticoPorId = Object.fromEntries(
  respostasDiagnostico.map((resposta) => [resposta.id, resposta]),
) as Record<RespostaDiagnosticoId, RespostaDiagnostico>;

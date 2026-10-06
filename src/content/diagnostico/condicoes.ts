import type { PerguntaDiagnosticoId } from "./perguntas";
import type { RespostaDiagnosticoId } from "./respostas";

export type OpcaoDiagnostico = "sim" | "nao" | "nao-tenho-certeza";

export type RespostasDoDiagnostico = Readonly<
  Record<PerguntaDiagnosticoId, OpcaoDiagnostico>
>;

const criteriosEssenciais: readonly PerguntaDiagnosticoId[] = [
  "entrega-externa",
  "uso-independente",
  "resultado-utilizavel",
  "atendimento-ao-publico",
];

function possuiDuvidaEssencial(respostas: RespostasDoDiagnostico) {
  return criteriosEssenciais.some(
    (perguntaId) => respostas[perguntaId] === "nao-tenho-certeza",
  );
}

function possuiDuasOuMaisDuvidas(respostas: RespostasDoDiagnostico) {
  return (
    Object.values(respostas).filter(
      (resposta) => resposta === "nao-tenho-certeza",
    ).length >= 2
  );
}

function possuiRespostasContraditorias(respostas: RespostasDoDiagnostico) {
  const entregaSemResultadoUtilizavel =
    respostas["entrega-externa"] === "sim" &&
    respostas["resultado-utilizavel"] === "nao";

  const acaoSemPublico =
    respostas["publico-solicitante"] === "nao" &&
    respostas["acao-iniciada-publico"] === "sim";

  const atividadeIndependenteSemEntrega =
    respostas["uso-independente"] === "sim" &&
    respostas["entrega-externa"] === "nao" &&
    respostas["resultado-utilizavel"] === "nao";

  return (
    entregaSemResultadoUtilizavel ||
    acaoSemPublico ||
    atividadeIndependenteSemEntrega
  );
}

function pareceProcessoInterno(respostas: RespostasDoDiagnostico) {
  const criteriosDeRelacaoComPublico: readonly PerguntaDiagnosticoId[] = [
    "entrega-externa",
    "publico-solicitante",
    "necessidade-publico",
    "acao-iniciada-publico",
    "resultado-utilizavel",
    "atendimento-ao-publico",
  ];

  return criteriosDeRelacaoComPublico.every(
    (perguntaId) => respostas[perguntaId] === "nao",
  );
}

function pareceEtapaDeOutroServico(respostas: RespostasDoDiagnostico) {
  return (
    respostas["entrega-externa"] === "nao" &&
    respostas["publico-solicitante"] === "sim" &&
    respostas["necessidade-publico"] === "sim" &&
    respostas["uso-independente"] === "nao" &&
    respostas["acao-iniciada-publico"] === "sim" &&
    respostas["resultado-utilizavel"] === "nao" &&
    respostas["atendimento-ao-publico"] === "sim"
  );
}

function atendeAosCriteriosDeServicoPublico(
  respostas: RespostasDoDiagnostico,
) {
  return (
    respostas["entrega-externa"] === "sim" &&
    respostas["publico-solicitante"] === "sim" &&
    respostas["necessidade-publico"] === "sim" &&
    respostas["uso-independente"] === "sim" &&
    respostas["resultado-utilizavel"] === "sim" &&
    respostas["atendimento-ao-publico"] === "sim"
  );
}

export function obterRespostaDoDiagnostico(
  respostas: RespostasDoDiagnostico,
): RespostaDiagnosticoId {
  if (
    possuiDuvidaEssencial(respostas) ||
    possuiDuasOuMaisDuvidas(respostas)
  ) {
    return "analisar-melhor";
  }

  if (pareceProcessoInterno(respostas)) {
    return "processo-interno";
  }

  if (possuiRespostasContraditorias(respostas)) {
    return "analisar-melhor";
  }

  if (pareceEtapaDeOutroServico(respostas)) {
    return "etapa-de-outro-servico";
  }

  if (atendeAosCriteriosDeServicoPublico(respostas)) {
    return respostas["obtencao-direta"] === "sim"
      ? "autosservico"
      : "servico-publico";
  }

  return "analisar-melhor";
}

import { criarCsv } from "../../lib/csv";
import type { CartaServico } from "./carta.types";

export function gerarCsvDaCarta(carta: CartaServico): string {
  return criarCsv([
    ["campo", "valor"],
    ["nome", carta.identificacao.nome],
    ["descricao", carta.identificacao.descricao],
    ["publico_alvo", carta.identificacao.publicoAlvo],
    ["criterios", carta.requisitos.criterios],
    ["prazo", carta.atendimento.prazo],
    ["custo", carta.atendimento.custo],
    ["exige_agendamento", carta.atendimento.exigeAgendamento ? "sim" : "nao"],
    ["informacoes_complementares", carta.informacoesComplementares],
  ]);
}

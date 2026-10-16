import { criarCsv } from "../../lib/csv";
import type { CartaServico } from "./carta.types";

export function gerarCsvDaCarta(carta: CartaServico): string {
  const custo = carta.publicoRequisitos.custo.tipo ?? "";
  const prazo = [carta.publicoRequisitos.prazo.maximo, carta.publicoRequisitos.prazo.tipo]
    .filter(Boolean).join(" ");
  const agendamento = carta.atendimento.exigeAgendamento === null
    ? ""
    : carta.atendimento.exigeAgendamento ? "sim" : "nao";

  return criarCsv([
    ["campo", "valor"],
    ["nome", carta.sobreServico.nome],
    ["nome_popular", carta.sobreServico.nomePopular],
    ["descricao", carta.sobreServico.descricao],
    ["categoria", carta.sobreServico.categoria ?? ""],
    ["subcategoria", carta.sobreServico.subcategoria ?? ""],
    ["topico", carta.sobreServico.topico],
    ["ativo", carta.sobreServico.ativo ? "sim" : "nao"],
    ["publicos_especificos", carta.publicoRequisitos.publicosEspecificos.join("\n")],
    ["perfis_usuario", carta.publicoRequisitos.perfisUsuario.join("\n")],
    ["quem_pode_utilizar", carta.publicoRequisitos.quemPodeUtilizar],
    ["documentos", carta.publicoRequisitos.documentos.map(({ nome }) => nome).join("\n")],
    ["custo", custo],
    ["detalhe_custo", custo && custo !== "gratuito" ? carta.publicoRequisitos.custo.detalhe : ""],
    ["prazo", prazo],
    ["etapas", carta.etapas.map(({ ordem, titulo, orientacaoCidadao, modalidade }) => `${ordem}. ${titulo} — ${orientacaoCidadao}${modalidade ? ` (${modalidade})` : ""}`).join("\n")],
    ["exige_agendamento", agendamento],
    ["tipos_agendamento", carta.atendimento.exigeAgendamento ? carta.atendimento.tiposAgendamento.join("\n") : ""],
    ["sistema_agendamento", carta.atendimento.exigeAgendamento ? carta.atendimento.sistemaAgendamento ?? "" : ""],
    ["link_agendamento", carta.atendimento.exigeAgendamento && carta.atendimento.sistemaAgendamento === "sistema-externo" ? carta.atendimento.linkAgendamento : ""],
    ["exibicao_agendamento", carta.atendimento.exigeAgendamento && carta.atendimento.sistemaAgendamento === "sistema-externo" ? carta.atendimento.exibicaoAgendamento ?? "" : ""],
    ["informacoes_adicionais", carta.informacoesFinais.informacoesAdicionais],
    ["palavras_chave", carta.informacoesFinais.palavrasChave],
  ]);
}

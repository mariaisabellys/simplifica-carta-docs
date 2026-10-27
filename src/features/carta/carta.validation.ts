import { camposObrigatoriosCarta } from "./carta.schema";
import { subcategoriasPorCategoria } from "./carta.catalogs";
import type { CartaServico } from "./carta.types";

export type ValidacaoCarta = {
  campo: string;
  mensagem: string;
};

export function validarCartaObrigatoria(carta: CartaServico): ValidacaoCarta[] {
  const erros: ValidacaoCarta[] = camposObrigatoriosCarta.flatMap((campo) => {
    const valor = getValueByPath(carta, campo);

    if (typeof valor === "string" && valor.trim().length > 0) {
      return [];
    }

    if (typeof valor === "boolean") {
      return [];
    }

    if (Array.isArray(valor) && valor.length > 0) {
      return [];
    }

    return [{ campo, mensagem: "Campo obrigatorio para exportacao da Carta." }];
  });

  if (contarPalavras(carta.sobreServico.descricao) > 20) {
    erros.push({ campo: "sobreServico.descricao", mensagem: "Use no máximo 20 palavras na descrição do serviço." });
  }
  if (carta.publicoRequisitos.publicosEspecificos.length > 2) {
    erros.push({ campo: "publicoRequisitos.publicosEspecificos", mensagem: "Selecione no máximo 2 grupos de público específico." });
  }
  if (carta.sobreServico.categoria && carta.sobreServico.subcategoria && !subcategoriasPorCategoria[carta.sobreServico.categoria].includes(carta.sobreServico.subcategoria as never)) {
    erros.push({ campo: "sobreServico.subcategoria", mensagem: "Selecione uma subcategoria da categoria escolhida." });
  }
  if (carta.publicoRequisitos.custo.tipo && carta.publicoRequisitos.custo.tipo !== "gratuito" && !carta.publicoRequisitos.custo.detalhe.trim()) {
    erros.push({ campo: "publicoRequisitos.custo.detalhe", mensagem: "Informe o valor ou o link para consulta do custo." });
  }
  if (carta.atendimento.exigeAgendamento === true && carta.atendimento.tiposAgendamento.length === 0) {
    erros.push({ campo: "atendimento.tiposAgendamento", mensagem: "Selecione ao menos um tipo de agendamento." });
  }
  if (carta.atendimento.exigeAgendamento === true && carta.atendimento.sistemaAgendamento === null) {
    erros.push({ campo: "atendimento.sistemaAgendamento", mensagem: "Selecione o sistema de agendamento." });
  }
  if (carta.atendimento.exigeAgendamento === true && carta.atendimento.sistemaAgendamento === "sistema-externo") {
    if (!carta.atendimento.linkAgendamento.trim()) erros.push({ campo: "atendimento.linkAgendamento", mensagem: "Informe o link do agendamento externo." });
    if (carta.atendimento.exibicaoAgendamento === null) erros.push({ campo: "atendimento.exibicaoAgendamento", mensagem: "Selecione como o agendamento externo será exibido." });
  }
  return erros;
}

export function contarPalavras(texto: string): number {
  return texto.trim().match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}

function getValueByPath(source: CartaServico, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, source);
}

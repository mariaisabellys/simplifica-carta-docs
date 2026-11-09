import { camposObrigatoriosCarta } from "./carta.schema";
import { subcategoriasPorCategoria } from "./carta.catalogs";
import type { CartaServico } from "./carta.types";
import { significantCount } from "./carta.language";

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
  if (carta.publicoRequisitos.prazo.maximo && !/^[1-9]\d*$/.test(carta.publicoRequisitos.prazo.maximo.trim())) {
    erros.push({ campo: "publicoRequisitos.prazo.maximo", mensagem: "Informe um inteiro positivo, sem zeros à esquerda." });
  }
  if (carta.etapas.length > 0) {
    carta.etapas.forEach((etapa) => {
      if (!etapa.titulo.trim()) erros.push({ campo: `etapas.${etapa.id}.titulo`, mensagem: "Informe o título da etapa." });
      if (!etapa.orientacaoCidadao.trim()) erros.push({ campo: `etapas.${etapa.id}.orientacaoCidadao`, mensagem: "Informe a orientação ao cidadão." });
      if (!etapa.modalidade) erros.push({ campo: `etapas.${etapa.id}.modalidade`, mensagem: "Selecione a modalidade da etapa." });
    });
  }
  if (carta.atendimento.exigeAgendamento === true && carta.atendimento.sistemaAgendamento === "sistema-externo" && carta.atendimento.linkAgendamento.trim()) {
    try {
      const url = new URL(carta.atendimento.linkAgendamento);
      if (!/^https?:$/.test(url.protocol) || !url.hostname || url.username || url.password) throw new Error("invalid");
    } catch { erros.push({ campo: "atendimento.linkAgendamento", mensagem: "Use um link absoluto HTTP(S), sem credenciais." }); }
  }
  return erros;
}

export function contarPalavras(texto: string): number {
  return significantCount(texto);
}

function getValueByPath(source: CartaServico, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, source);
}

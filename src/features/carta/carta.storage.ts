import { criarCartaServicoInicial } from "./carta.schema";
import { categoriasServico, modalidadesEtapa, perfisUsuario, publicosEspecificos, subcategoriasPorCategoria, tiposPrazo } from "./carta.catalogs";
import type { CartaServico } from "./carta.types";

const STORAGE_KEY = "simplifica-carta:sessao";

export function carregarCartaDaSessao(): CartaServico {
  try {
    const serialized = window.sessionStorage.getItem(STORAGE_KEY);
    if (!serialized) return criarCartaServicoInicial();
    const parsed: unknown = JSON.parse(serialized);
    return isCartaServicoV3(parsed) ? parsed : criarCartaServicoInicial();
  } catch {
    return criarCartaServicoInicial();
  }
}

export function salvarCartaNaSessao(carta: CartaServico) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(carta));
    return true;
  } catch {
    return false;
  }
}

export function limparCartaDaSessao() {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // A sessao em memoria continua utilizavel quando o storage estiver bloqueado.
  }
}

function isCartaServicoV3(value: unknown): value is CartaServico {
  if (!isRecord(value) || value.versao !== 3) return false;
  const sobre = value.sobreServico;
  const publico = value.publicoRequisitos;
  const atendimento = value.atendimento;
  const finais = value.informacoesFinais;
  if (!isRecord(sobre) || !isRecord(publico) || !isRecord(atendimento) || !isRecord(finais)) return false;
  const categoriaValida = sobre.categoria === null || categoriasServico.includes(sobre.categoria as never);
  const subcategoriaValida = sobre.subcategoria === null || (categoriaValida && sobre.categoria !== null && subcategoriasPorCategoria[sobre.categoria as keyof typeof subcategoriasPorCategoria].includes(sobre.subcategoria as never));
  return typeof sobre.nome === "string" && typeof sobre.nomePopular === "string" && typeof sobre.descricao === "string" && categoriaValida && subcategoriaValida && typeof sobre.topico === "string" && typeof sobre.ativo === "boolean"
    && isStringArrayFrom(publico.publicosEspecificos, publicosEspecificos) && isStringArrayFrom(publico.perfisUsuario, perfisUsuario)
    && typeof publico.quemPodeUtilizar === "string" && isDocumentArray(publico.documentos) && isCost(publico.custo) && isDeadline(publico.prazo)
    && isStepArray(value.etapas)
    && (atendimento.exigeAgendamento === null || typeof atendimento.exigeAgendamento === "boolean")
    && isStringArrayFrom(atendimento.tiposAgendamento, ["online", "presencial"] as const)
    && (atendimento.sistemaAgendamento === null || atendimento.sistemaAgendamento === "paraiba-digital" || atendimento.sistemaAgendamento === "sistema-externo")
    && typeof atendimento.linkAgendamento === "string"
    && (atendimento.exibicaoAgendamento === null || atendimento.exibicaoAgendamento === "dentro-paraiba-digital" || atendimento.exibicaoAgendamento === "nova-pagina")
    && typeof finais.informacoesAdicionais === "string" && typeof finais.palavrasChave === "string";
}

function isRecord(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
function isStringArrayFrom(value: unknown, options: readonly string[]) { return Array.isArray(value) && value.every((item) => typeof item === "string" && options.includes(item)); }
function isDocumentArray(value: unknown) { return Array.isArray(value) && value.every((item) => isRecord(item) && typeof item.id === "string" && typeof item.nome === "string"); }
function isCost(value: unknown) { return isRecord(value) && (value.tipo === null || value.tipo === "gratuito" || value.tipo === "sob-consulta" || value.tipo === "com-taxa") && typeof value.detalhe === "string"; }
function isDeadline(value: unknown) { return isRecord(value) && typeof value.maximo === "string" && (value.tipo === null || tiposPrazo.includes(value.tipo as never)); }
function isStepArray(value: unknown) { return Array.isArray(value) && value.every((item) => isRecord(item) && typeof item.id === "string" && typeof item.ordem === "number" && typeof item.titulo === "string" && typeof item.orientacaoCidadao === "string" && (item.modalidade === null || modalidadesEtapa.includes(item.modalidade as never))); }

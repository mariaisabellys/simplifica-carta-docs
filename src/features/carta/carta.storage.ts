import { criarCartaServicoInicial } from "./carta.schema.ts";
import {
  categoriasServico, modalidadesEtapa, perfisUsuario, publicosEspecificos,
  subcategoriasPorCategoria, tiposPrazo,
} from "./carta.catalogs.ts";
import type { CartaServico } from "./carta.types.ts";

export const CARTA_STORAGE_KEY = "simplifica-carta:sessao";

export type CartaLoadResult =
  | { status: "empty" | "restored"; carta: CartaServico }
  | { status: "invalid" | "unsupported" | "unavailable"; carta: CartaServico };

type StorageReader = Pick<Storage, "getItem">;
type StorageWriter = Pick<Storage, "setItem">;
type StorageRemover = Pick<Storage, "removeItem">;

function browserSessionStorage(): Storage | null {
  try { return typeof window === "undefined" ? null : window.sessionStorage; }
  catch { return null; }
}

export function carregarCartaDaSessaoComStatus(storage: StorageReader | null = browserSessionStorage()): CartaLoadResult {
  if (!storage) return { status: "unavailable", carta: criarCartaServicoInicial() };
  try {
    const serialized = storage.getItem(CARTA_STORAGE_KEY);
    if (serialized === null) return { status: "empty", carta: criarCartaServicoInicial() };
    let parsed: unknown;
    try { parsed = JSON.parse(serialized); }
    catch { return { status: "invalid", carta: criarCartaServicoInicial() }; }
    if (isRecord(parsed) && Object.hasOwn(parsed, "versao") && parsed.versao !== 3) return { status: "unsupported", carta: criarCartaServicoInicial() };
    return isCartaServicoV3(parsed)
      ? { status: "restored", carta: parsed }
      : { status: "invalid", carta: criarCartaServicoInicial() };
  } catch {
    return { status: "unavailable", carta: criarCartaServicoInicial() };
  }
}

export function carregarCartaDaSessao(): CartaServico {
  return carregarCartaDaSessaoComStatus().carta;
}

export function salvarCartaNaSessao(carta: CartaServico, storage: StorageWriter | null = browserSessionStorage()): boolean {
  if (!storage) return false;
  try { storage.setItem(CARTA_STORAGE_KEY, JSON.stringify(carta)); return true; }
  catch { return false; }
}

export function limparCartaDaSessao(storage: StorageRemover | null = browserSessionStorage()): boolean {
  if (!storage) return false;
  try { storage.removeItem(CARTA_STORAGE_KEY); return true; }
  catch { return false; }
}

export function isCartaServicoV3(value: unknown): value is CartaServico {
  if (!isExactRecord(value, ["versao", "sobreServico", "publicoRequisitos", "etapas", "atendimento", "informacoesFinais"]) || value.versao !== 3) return false;
  const sobre = value.sobreServico;
  const publico = value.publicoRequisitos;
  const atendimento = value.atendimento;
  const finais = value.informacoesFinais;
  if (!isExactRecord(sobre, ["nome", "nomePopular", "descricao", "categoria", "subcategoria", "topico", "ativo"])) return false;
  if (!isExactRecord(publico, ["publicosEspecificos", "perfisUsuario", "quemPodeUtilizar", "documentos", "custo", "prazo"])) return false;
  if (!isExactRecord(atendimento, ["exigeAgendamento", "tiposAgendamento", "sistemaAgendamento", "linkAgendamento", "exibicaoAgendamento"])) return false;
  if (!isExactRecord(finais, ["informacoesAdicionais", "palavrasChave"])) return false;

  const categoriaValida = sobre.categoria === null || categoriasServico.includes(sobre.categoria as never);
  const subcategoriaValida = sobre.subcategoria === null || (
    categoriaValida && sobre.categoria !== null &&
    subcategoriasPorCategoria[sobre.categoria as keyof typeof subcategoriasPorCategoria].includes(sobre.subcategoria as never)
  );
  const documentos = publico.documentos;
  const etapas = value.etapas;
  if (!Array.isArray(documentos) || !Array.isArray(etapas)) return false;
  const documentIds = documentos.map((item) => isRecord(item) ? item.id : undefined);
  const stepIds = etapas.map((item) => isRecord(item) ? item.id : undefined);

  return typeof sobre.nome === "string" && typeof sobre.nomePopular === "string" && typeof sobre.descricao === "string"
    && categoriaValida && subcategoriaValida && typeof sobre.topico === "string" && typeof sobre.ativo === "boolean"
    && isUniqueStringArrayFrom(publico.publicosEspecificos, publicosEspecificos, 2)
    && isUniqueStringArrayFrom(publico.perfisUsuario, perfisUsuario)
    && typeof publico.quemPodeUtilizar === "string"
    && documentos.every(isDocument) && uniqueNonEmptyIds(documentIds)
    && isCost(publico.custo) && isDeadline(publico.prazo)
    && etapas.every(isStep) && uniqueNonEmptyIds(stepIds)
    && etapas.every((item, index) => (item as { ordem: number }).ordem === index + 1)
    && (atendimento.exigeAgendamento === null || typeof atendimento.exigeAgendamento === "boolean")
    && isUniqueStringArrayFrom(atendimento.tiposAgendamento, ["online", "presencial"] as const)
    && (atendimento.sistemaAgendamento === null || atendimento.sistemaAgendamento === "paraiba-digital" || atendimento.sistemaAgendamento === "sistema-externo")
    && typeof atendimento.linkAgendamento === "string"
    && (atendimento.exibicaoAgendamento === null || atendimento.exibicaoAgendamento === "dentro-paraiba-digital" || atendimento.exibicaoAgendamento === "nova-pagina")
    && typeof finais.informacoesAdicionais === "string" && typeof finais.palavrasChave === "string";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isExactRecord(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  return isRecord(value) && Object.keys(value).length === keys.length && keys.every((key) => Object.hasOwn(value, key));
}

function isUniqueStringArrayFrom(value: unknown, options: readonly string[], maximum = Number.POSITIVE_INFINITY): boolean {
  return Array.isArray(value) && value.length <= maximum && new Set(value).size === value.length
    && value.every((item) => typeof item === "string" && options.includes(item));
}

function uniqueNonEmptyIds(ids: unknown[]): boolean {
  return ids.every((id) => typeof id === "string" && id.length > 0) && new Set(ids).size === ids.length;
}

function isDocument(value: unknown): boolean {
  return isExactRecord(value, ["id", "nome"]) && typeof value.id === "string" && value.id.length > 0 && typeof value.nome === "string";
}

function isCost(value: unknown): boolean {
  return isExactRecord(value, ["tipo", "detalhe"])
    && (value.tipo === null || value.tipo === "gratuito" || value.tipo === "sob-consulta" || value.tipo === "com-taxa")
    && typeof value.detalhe === "string";
}

function isDeadline(value: unknown): boolean {
  return isExactRecord(value, ["maximo", "tipo"]) && typeof value.maximo === "string"
    && (value.tipo === null || tiposPrazo.includes(value.tipo as never));
}

function isStep(value: unknown): boolean {
  return isExactRecord(value, ["id", "ordem", "titulo", "orientacaoCidadao", "modalidade"])
    && typeof value.id === "string" && value.id.length > 0
    && Number.isInteger(value.ordem) && (value.ordem as number) > 0
    && typeof value.titulo === "string" && typeof value.orientacaoCidadao === "string"
    && (value.modalidade === null || modalidadesEtapa.includes(value.modalidade as never));
}

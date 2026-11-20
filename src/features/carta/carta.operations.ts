import type { CategoriaServico } from "./carta.catalogs";
import type { CartaServico } from "./carta.types";

function copy(carta: CartaServico): CartaServico { return structuredClone(carta); }

export function selecionarCategoria(carta: CartaServico, categoria: CategoriaServico | null): CartaServico {
  const next = copy(carta);
  next.sobreServico.categoria = categoria;
  next.sobreServico.subcategoria = null;
  return next;
}

export function adicionarDocumento(carta: CartaServico, id: string): CartaServico {
  if (!id || carta.publicoRequisitos.documentos.some((item) => item.id === id)) return carta;
  const next = copy(carta);
  next.publicoRequisitos.documentos.push({ id, nome: "" });
  return next;
}

export function removerDocumento(carta: CartaServico, id: string): CartaServico {
  if (!carta.publicoRequisitos.documentos.some((item) => item.id === id)) return carta;
  const next = copy(carta);
  next.publicoRequisitos.documentos = next.publicoRequisitos.documentos.filter((item) => item.id !== id);
  return next;
}

export function adicionarEtapa(carta: CartaServico, id: string): CartaServico {
  if (!id || carta.etapas.some((item) => item.id === id)) return carta;
  const next = copy(carta);
  next.etapas.push({ id, ordem: next.etapas.length + 1, titulo: "", orientacaoCidadao: "", modalidade: null });
  return next;
}

export function removerEtapa(carta: CartaServico, id: string): CartaServico {
  if (!carta.etapas.some((item) => item.id === id)) return carta;
  const next = copy(carta);
  next.etapas = next.etapas.filter((item) => item.id !== id).map((item, index) => ({ ...item, ordem: index + 1 }));
  return next;
}

export function moverEtapa(carta: CartaServico, id: string, direction: -1 | 1): CartaServico {
  const from = carta.etapas.findIndex((item) => item.id === id);
  const to = from + direction;
  if (from < 0 || to < 0 || to >= carta.etapas.length) return carta;
  const next = copy(carta);
  const [item] = next.etapas.splice(from, 1);
  next.etapas.splice(to, 0, item);
  next.etapas = next.etapas.map((step, index) => ({ ...step, ordem: index + 1 }));
  return next;
}

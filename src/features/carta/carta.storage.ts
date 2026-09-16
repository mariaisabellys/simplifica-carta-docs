import { cartaServicoInicial } from "./carta.schema";
import type { CartaServico } from "./carta.types";

const STORAGE_KEY = "simplifica-carta:sessao";

export function carregarCartaDaSessao(): CartaServico {
  const serialized = window.sessionStorage.getItem(STORAGE_KEY);

  if (!serialized) {
    return cartaServicoInicial;
  }

  try {
    return { ...cartaServicoInicial, ...JSON.parse(serialized) };
  } catch {
    return cartaServicoInicial;
  }
}

export function salvarCartaNaSessao(carta: CartaServico) {
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(carta));
}

export function limparCartaDaSessao() {
  window.sessionStorage.removeItem(STORAGE_KEY);
}

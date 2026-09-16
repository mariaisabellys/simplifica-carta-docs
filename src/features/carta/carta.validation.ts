import { camposObrigatoriosCarta } from "./carta.schema";
import type { CartaServico } from "./carta.types";

export type ValidacaoCarta = {
  campo: string;
  mensagem: string;
};

export function validarCartaObrigatoria(carta: CartaServico): ValidacaoCarta[] {
  return camposObrigatoriosCarta.flatMap((campo) => {
    const valor = getValueByPath(carta, campo);

    if (typeof valor === "string" && valor.trim().length > 0) {
      return [];
    }

    return [{ campo, mensagem: "Campo obrigatorio para exportacao da Carta." }];
  });
}

function getValueByPath(source: CartaServico, path: string): unknown {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, source);
}

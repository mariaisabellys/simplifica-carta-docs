export function textoEstaPreenchido(value: string): boolean {
  return value.trim().length > 0;
}

import { significantCount } from "../features/carta/carta.language";

export function sugerirLinguagemSimples(value: string): string[] {
  const sugestoes: string[] = [];

  if (significantCount(value) > 20) {
    sugestoes.push("Considere dividir o texto em frases menores.");
  }

  if (/\b(devem|deverão|efetuar|realizar)\b/i.test(value)) {
    sugestoes.push("Avalie trocar termos formais por palavras mais diretas.");
  }

  return sugestoes;
}

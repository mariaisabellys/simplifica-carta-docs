export function textoEstaPreenchido(value: string): boolean {
  return value.trim().length > 0;
}

export function sugerirLinguagemSimples(value: string): string[] {
  const sugestoes: string[] = [];

  if (value.length > 240) {
    sugestoes.push("Considere dividir o texto em frases menores.");
  }

  if (/\b(devem|deverao|efetuar|realizar)\b/i.test(value)) {
    sugestoes.push("Avalie trocar termos formais por palavras mais diretas.");
  }

  return sugestoes;
}

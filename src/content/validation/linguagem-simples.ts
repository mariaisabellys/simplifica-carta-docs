export const languageLimits = { maxSignificantWordsPerSentence: 20, sentenceReviewFromSignificantWords: 21, paragraphReviewFromVisualLines: 5 } as const;
export const languageRuleVersion = "ls-pt-BR-v1";
export const messageVersion = "msg-pt-BR-v1";
export const jargonCatalog = [
  ["utente", "cidadão ou você"], ["munícipe", "cidadão ou você"], ["cominar", "aplicar ou determinar"], ["cominado", "aplicar ou determinar"],
  ["ex vi", "remover ou explicar de forma simples"], ["a quo", "remover ou explicar de forma simples"], ["ad referendum", "remover ou explicar de forma simples"], ["preambularmente", "primeiramente ou inicialmente"],
  ["fica o requerente ciente", "você precisa saber que"], ["manifestação de vontade", "pedido ou escolha"], ["efetuar", "fazer"], ["providenciar", "resolver"], ["requerente", "solicitar"], ["protocolar", "entregar"], ["pertinente", "considerar"], ["consoante", "seguir"], ["destarte", "concluir"], ["outrossim", "acrescentar"], ["doravante", "adotar"], ["subsidiar", "apoiar"], ["usufruir", "usar"], ["imprescindível", "garantir"], ["preliminarmente", "começar"], ["viabilizar", "facilitar"], ["encaminhamento", "enviar"], ["disponibilizar", "oferecer"], ["ratificar", "confirmar"], ["deferir", "aprovar"], ["indeferir", "negar"], ["conceder", "liberar"], ["pleitear", "pedir"],
] as const;
export const significantExclusions = new Set("o a os as um uma uns umas ante após até com contra de desde em entre para perante por sem sob sobre trás ao aos à às do da dos das dum duma duns dumas no na nos nas num numa nuns numas pelo pela pelos pelas".split(" "));

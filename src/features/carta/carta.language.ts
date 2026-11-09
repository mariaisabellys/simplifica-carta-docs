import { jargonCatalog, languageLimits, languageRuleVersion, significantExclusions } from "../../content/validation/linguagem-simples";
import type { CartaServico } from "./carta.types";
import type { LanguageOccurrence, LanguageReview, LanguageRuleId } from "./carta.language.types";

const tokenPattern = /[\p{L}\p{N}][\p{L}\p{M}\p{N}]*(?:[-’'][\p{L}\p{N}][\p{L}\p{M}\p{N}]*)*/gu;
const tokens = (text: string) => text.normalize("NFC").match(tokenPattern) ?? [];
const significantCount = (text: string) => tokens(text).filter((token) => !significantExclusions.has(token.toLocaleLowerCase("pt-BR"))).length;
function sentences(text: string): string[] { const Segmenter = (Intl as unknown as { Segmenter?: new (locale: string, options: { granularity: "sentence" }) => { segment: (value: string) => Iterable<{ segment: string }> } }).Segmenter; if (Segmenter) return [...new Segmenter("pt-BR", { granularity: "sentence" }).segment(text)].map((item) => item.segment).filter((item) => item.trim()); return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? []; }
const occurrence = (ruleId: LanguageRuleId, targetId: string, fieldPath: string, message: string, excerpt: string, severity: LanguageSeverity, index: number): LanguageOccurrence => ({ id: `${ruleId}:${targetId}:${index}`, ruleId, severity, targetId, fieldPath, excerpt, message, textRevision: 0, ruleVersion: languageRuleVersion });
type LanguageSeverity = "guidance" | "review";

function analyzeText(text: string, targetId: string, fieldPath: string): LanguageOccurrence[] {
  if (!text.trim()) return [];
  const found: LanguageOccurrence[] = [];
  sentences(text).forEach((sentence, index) => { const count = significantCount(sentence); if (count >= languageLimits.sentenceReviewFromSignificantWords) found.push(occurrence("sentence-length", targetId, fieldPath, `Esta frase tem ${count} palavras significativas. Use até 20 e divida a frase, se necessário.`, sentence.trim(), "review", index)); });
  const normalized = text.normalize("NFC");
  const lower = normalized.toLocaleLowerCase("pt-BR");
  jargonCatalog.forEach(([term, suggestion], index) => { const escaped = term.split(" ").map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\s+"); const pattern = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, "giu"); let match: RegExpExecArray | null; while ((match = pattern.exec(lower))) { const excerpt = normalized.slice(match.index, match.index + match[0].length); found.push(occurrence("unexplained-jargon", targetId, fieldPath, `Revise “${excerpt}”. Sugestão contextual: ${suggestion}. Adapte a frase sem mudar seu sentido.`, excerpt, "review", index + match.index)); } });
  if (/\b(?:ser|é|são|foi|foram|será|serão|seria|seriam|sendo|sido)\s+(?:\w+\s+)?(?:enviado|encaminhado|realizado|solicitado|exigido)(?:s|as|os)?\b/i.test(normalized)) found.push(occurrence("active-voice", targetId, fieldPath, "Este trecho pode estar na voz passiva. Verifique se é possível dizer quem faz a ação.", normalized, "guidance", 0));
  if (/\b(?:fica o requerente ciente|o utente|o munícipe)\b/i.test(normalized)) found.push(occurrence("direct-address", targetId, fieldPath, "Considere falar diretamente com o cidadão ou usar uma orientação direta.", normalized, "guidance", 0));
  return found;
}

export function analisarLinguagemSimples(carta: CartaServico): LanguageReview {
  const targets: { id: string; path: string; text: string }[] = [
    { id: "service-description", path: "sobreServico.descricao", text: carta.sobreServico.descricao },
    { id: "who-can-use", path: "publicoRequisitos.quemPodeUtilizar", text: carta.publicoRequisitos.quemPodeUtilizar },
    { id: "important-additional-information", path: "informacoesFinais.informacoesAdicionais", text: carta.informacoesFinais.informacoesAdicionais },
    ...carta.etapas.map((step) => ({ id: `step-${step.id}-citizen-guidance`, path: `etapas.${step.id}.orientacaoCidadao`, text: step.orientacaoCidadao })),
  ].filter((target) => target.text.trim());
  const occurrences = targets.flatMap((target) => analyzeText(target.text, target.id, target.path));
  if (!targets.length) return { status: "nao-aplicavel", occurrences: [], analyzedTargets: 0, message: "Não há texto aplicável a esta revisão." };
  return { status: occurrences.some((item) => item.severity === "review") ? "revisao-necessaria" : "revisao-necessaria", occurrences, analyzedTargets: targets.length, message: occurrences.length ? "Ainda há pontos para revisar. As sugestões não impedem continuar." : "Não encontramos ocorrências automáticas nas regras avaliadas. Conclua a revisão manual." };
}

export { significantCount };

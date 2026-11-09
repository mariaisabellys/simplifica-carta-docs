import { perguntasDiagnostico } from "../../content/diagnostico/perguntas";
import type { PerguntaDiagnosticoId } from "../../content/diagnostico/perguntas";
import type { OpcaoDiagnostico, RespostasDoDiagnostico } from "../../content/diagnostico/condicoes";

export const DIAGNOSTICO_SESSION_KEY = "simplifica-carta:diagnostico:v1";
export type RespostasParciaisDiagnostico = Partial<RespostasDoDiagnostico>;
export type DiagnosticoState = { currentQuestionId: PerguntaDiagnosticoId; answers: RespostasParciaisDiagnostico; completed: boolean };
export type DiagnosticoAction =
  | { type: "answer"; questionId: PerguntaDiagnosticoId; value: OpcaoDiagnostico }
  | { type: "next" } | { type: "previous" } | { type: "restart" }
  | { type: "restore"; state: DiagnosticoState };

export const initialDiagnosticoState: DiagnosticoState = {
  currentQuestionId: perguntasDiagnostico[0].id, answers: {}, completed: false,
};

export function diagnosticoReducer(state: DiagnosticoState, action: DiagnosticoAction): DiagnosticoState {
  if (action.type === "answer") return { ...state, answers: { ...state.answers, [action.questionId]: action.value }, completed: false };
  if (action.type === "restart") return initialDiagnosticoState;
  if (action.type === "restore") return action.state;
  const index = perguntasDiagnostico.findIndex(({ id }) => id === state.currentQuestionId);
  if (index < 0) return initialDiagnosticoState;
  if (action.type === "previous" && index > 0) return { ...state, currentQuestionId: perguntasDiagnostico[index - 1].id, completed: false };
  if (action.type === "next" && state.answers[state.currentQuestionId]) {
    if (index < perguntasDiagnostico.length - 1) return { ...state, currentQuestionId: perguntasDiagnostico[index + 1].id };
    return { ...state, completed: true };
  }
  return state;
}

export function hasCompleteAnswers(answers: RespostasParciaisDiagnostico): answers is RespostasDoDiagnostico {
  return perguntasDiagnostico.every(({ id }) => answers[id] === "sim" || answers[id] === "nao" || answers[id] === "nao-tenho-certeza");
}

function isValidState(value: unknown): value is DiagnosticoState {
  if (!value || typeof value !== "object") return false;
  const state = value as Record<string, unknown>;
  return typeof state.currentQuestionId === "string" && perguntasDiagnostico.some(({ id }) => id === state.currentQuestionId)
    && typeof state.answers === "object" && state.answers !== null && typeof state.completed === "boolean"
    && Object.entries(state.answers as Record<string, unknown>).every(([id, answer]) => perguntasDiagnostico.some(({ id: validId }) => validId === id) && (answer === "sim" || answer === "nao" || answer === "nao-tenho-certeza"));
}

export function loadDiagnosticoSession(): DiagnosticoState {
  if (typeof window === "undefined") return initialDiagnosticoState;
  try {
    const raw = window.localStorage.getItem(DIAGNOSTICO_SESSION_KEY);
    if (!raw) return initialDiagnosticoState;
    const parsed: unknown = JSON.parse(raw);
    return isValidState(parsed) ? parsed : initialDiagnosticoState;
  } catch { return initialDiagnosticoState; }
}

export function saveDiagnosticoSession(state: DiagnosticoState) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(DIAGNOSTICO_SESSION_KEY, JSON.stringify(state)); } catch { /* storage is optional */ }
}

export function clearDiagnosticoSession() {
  if (typeof window === "undefined") return;
  try { window.localStorage.removeItem(DIAGNOSTICO_SESSION_KEY); } catch { /* storage is optional */ }
}

export function navigateDiagnostico(path: string) {
  window.history.pushState(null, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0 });
}

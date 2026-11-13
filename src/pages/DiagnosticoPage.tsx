import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useReducer } from "react";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ButtonLink } from "../components/ui/ButtonLink";
import { diagnosticoContent, opcoesDiagnostico, perguntasDiagnostico } from "../content/diagnostico/perguntas";
import { diagnosticoReducer, loadDiagnosticoSession, navigateDiagnostico, saveDiagnosticoSession } from "../features/diagnostico/diagnostico.state";

export function DiagnosticoPage() {
  const [state, dispatch] = useReducer(diagnosticoReducer, undefined, loadDiagnosticoSession);
  useEffect(() => saveDiagnosticoSession(state), [state]);
  const index = Math.max(0, perguntasDiagnostico.findIndex(({ id }) => id === state.currentQuestionId));
  const question = perguntasDiagnostico[index];
  const selected = state.answers[question.id];
  const goNext = () => { if (!selected) return; const last = index === perguntasDiagnostico.length - 1; dispatch({ type: "next" }); if (last) saveDiagnosticoSession({ ...state, completed: true }); if (last) navigateDiagnostico("/diagnostico/resultado"); };
  return <div className="diagnostic-page"><div className="diagnostic-container">
    <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Guia" }, { label: "Identificar serviço", current: true }]} />
    <ol className="diagnostic-process" aria-label="Etapas do guia">{["Entenda", "Reúna", "Desenvolva", "Conclua"].map((label, step) => <li className={step === 0 ? "is-active" : ""} key={label}><span>{step + 1}</span><strong>{label}</strong></li>)}</ol>
    <div className="diagnostic-layout"><section className="diagnostic-intro" aria-labelledby="diagnostic-title"><p className="eyebrow">{diagnosticoContent.sectionLabel}</p><h1 id="diagnostic-title">Isso é mesmo um <span>serviço?</span></h1><p>{diagnosticoContent.description}</p><ul className="diagnostic-highlights">{diagnosticoContent.highlights.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <form className="diagnostic-card" onSubmit={(event) => { event.preventDefault(); goNext(); }}><div className="diagnostic-progress" aria-label={`Pergunta ${index + 1} de ${perguntasDiagnostico.length}`}><span>Pergunta {index + 1} de {perguntasDiagnostico.length}</span><div>{perguntasDiagnostico.map((item, itemIndex) => <i className={itemIndex <= index ? "is-active" : ""} key={item.id} />)}</div></div><fieldset><legend>{question.text}</legend><div className="diagnostic-options">{opcoesDiagnostico.map((option) => <label className={`diagnostic-option ${selected === option.value ? "is-selected" : ""}`} key={option.value}><input type="radio" name={question.id} value={option.value} checked={selected === option.value} onChange={() => dispatch({ type: "answer", questionId: question.id, value: option.value })} /><span>{option.label}</span></label>)}</div></fieldset><div className="diagnostic-card__controls"><button type="button" className="button-link button-link--outline-navy" onClick={() => index > 0 ? dispatch({ type: "previous" }) : navigateDiagnostico("/")}><ArrowLeft size={16} aria-hidden="true" />Voltar</button><button type="submit" className="button-link button-link--primary" disabled={!selected}>{index === perguntasDiagnostico.length - 1 ? "Ver resultado" : "Continuar"}<ArrowRight size={16} aria-hidden="true" /></button></div></form>
    </div><div className="diagnostic-restart"><ButtonLink href="/diagnostico" variant="secondary" iconLeft={<ArrowLeft size={16} aria-hidden="true" />}>Recomeçar diagnóstico</ButtonLink></div>
  </div></div>;
}

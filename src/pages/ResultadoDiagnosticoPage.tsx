import { useEffect, useMemo } from "react";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ButtonLink } from "../components/ui/ButtonLink";
import { acoesResultadoDiagnosticoPorId, acaoRefazerDiagnostico, acaoVoltarInicioDiagnostico } from "../content/diagnostico/acoes";
import { diagnosticoContent } from "../content/diagnostico/perguntas";
import { obterRespostaDoDiagnostico } from "../content/diagnostico/condicoes";
import { respostasDiagnosticoPorId } from "../content/diagnostico/respostas";
import { clearDiagnosticoSession, hasCompleteAnswers, loadDiagnosticoSession, navigateDiagnostico } from "../features/diagnostico/diagnostico.state";
import illustrationBackground from "../assets/diagnostico/resultado-fundo.svg";
import illustrationScreen from "../assets/diagnostico/resultado-tela.svg";
import illustrationCharacter from "../assets/diagnostico/resultado-personagem.svg";

export function ResultadoDiagnosticoPage() {
  const state = useMemo(loadDiagnosticoSession, []);
  const answers = state.answers;
  const valid = state.completed && hasCompleteAnswers(answers);
  useEffect(() => { if (!valid) navigateDiagnostico("/diagnostico"); }, [valid]);
  if (!valid) return null;
  const resultId = obterRespostaDoDiagnostico(answers as Parameters<typeof obterRespostaDoDiagnostico>[0]); const result = respostasDiagnosticoPorId[resultId]; const actions = acoesResultadoDiagnosticoPorId[resultId];
  return <div className="diagnostic-page diagnostic-result-page"><div className="diagnostic-container"><Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Guia" }, { label: "Resultado", current: true }]} /><ol className="diagnostic-process" aria-label="Etapas do guia">{["Entenda", "Reúna", "Desenvolva", "Conclua"].map((label, step) => <li className={step === 0 ? "is-active" : ""} key={label}><span>{step + 1}</span><strong>{label}</strong></li>)}</ol><div className="diagnostic-result"><section className="diagnostic-result__intro"><p className="eyebrow">{diagnosticoContent.sectionLabel}</p><h1>Resultado das <span>respostas</span></h1><div className="diagnostic-illustration" aria-hidden="true"><img src={illustrationBackground} alt="" /><img src={illustrationScreen} alt="" /><img src={illustrationCharacter} alt="" /></div></section><article className="diagnostic-result-card"><div className="diagnostic-result-card__icon" aria-hidden="true">i</div><h2>{result.title}</h2><p>{result.description}</p><div className="diagnostic-result-card__actions">{"cardPrimary" in actions ? <ButtonLink href={actions.cardPrimary.href} variant="primary">{actions.cardPrimary.label}</ButtonLink> : null}<a className="button-link button-link--outline-navy" href="/diagnostico" onClick={() => clearDiagnosticoSession()}>{acaoRefazerDiagnostico.label}</a></div></article></div><div className="diagnostic-result-navigation"><ButtonLink href={acaoVoltarInicioDiagnostico.href} variant="secondary">{acaoVoltarInicioDiagnostico.label}</ButtonLink>{"navigationNext" in actions ? <ButtonLink href={actions.navigationNext.href} variant="primary">{actions.navigationNext.label}</ButtonLink> : null}</div></div></div>;
}

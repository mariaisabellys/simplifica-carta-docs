import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MonitorCog, KeyRound, ScanSearch, FilePlusCorner, Rocket } from "lucide-react";
import { tutorialParaibaDigitalContent as content } from "../content/tutorial/paraiba-digital";
import { TutorialCartaData } from "../components/tutorial/TutorialCartaData";
import acessarPlataformaIllustration from "../assets/tutorial/acessar-plataforma.png";
import computer from "../assets/tutorial/computer.svg";
import { TutorialCompletionDialog } from "../components/tutorial/TutorialCompletionDialog";
import { ButtonLink } from "../components/ui/ButtonLink";
import "../styles/tutorial.css";

const icons = [MonitorCog, KeyRound, ScanSearch, FilePlusCorner, Rocket];

function readStep() {
  const value = new URLSearchParams(window.location.search).get("etapa");
  return value && /^[1-5]$/.test(value) ? Number(value) : 1;
}

function readReturnHref() {
  const origin = new URLSearchParams(window.location.search).get("origem");
  return origin === "guia" ? "/formulario-carta" : "/explorar-por-etapas";
}

export function TutorialParaibaDigitalPage() {
  const [number, setNumber] = useState(readStep);
  const [returnHref, setReturnHref] = useState(readReturnHref);
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const explicitChange = useRef(false);
  const step = content.steps[number - 1];
  const StepIcon = icons[number - 1];
  const officialUrl = content.officialPlatformUrl;
  const stepLabel = content.progress.stepLabelTemplate.replace("{current}", String(number)).replace("{total}", String(content.progress.totalSteps));

  useEffect(() => {
    const onPopState = () => {
      explicitChange.current = true;
      setNumber(readStep());
      setReturnHref(readReturnHref());
      setFinished(false);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${finished ? content.completion.title : step.title} | Tutorial Paraíba Digital | Simplifica Carta`;
    if (explicitChange.current) {
      heading.current?.focus();
      explicitChange.current = false;
    }
    return () => { document.title = previousTitle; };
  }, [step, finished]);

  function navigate(next: number) {
    if (next === number) return;
    const url = new URL(window.location.href);
    url.searchParams.set("etapa", String(next));
    url.hash = "";
    window.history.pushState(null, "", url);
    explicitChange.current = true;
    setFinished(false);
    setNumber(next);
  }

  return (
    <div className="tutorial-page">
      <header className="tutorial-banner">
        <div className="tutorial-container">
        <nav aria-label="Breadcrumb" className="tutorial-breadcrumb">
          <a href="/">Início</a><span aria-hidden="true">›</span>
          <span aria-current="page">Tutorial de publicação</span>
        </nav>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        </div>
      </header>
      <div className="tutorial-container tutorial-workspace">
        <nav className="tutorial-sidebar" aria-label={content.progress.title}>
          <p>{content.progress.title}</p>
          <strong>{stepLabel}</strong>
          <ol>
            {content.progress.navigation.map((item, index) => (
              <li key={item.id}>
                <button type="button" aria-current={index + 1 === number ? "step" : undefined} onClick={() => navigate(index + 1)}>
                  <span className={index + 1 < number ? "tutorial-step-number tutorial-step-number--past" : "tutorial-step-number"} aria-hidden="true">{index + 1 < number ? "✓" : index + 1}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <section className="tutorial-panel" aria-labelledby="tutorial-step-title">
          <div className="tutorial-progress-label"><span>{stepLabel}</span><span>{content.progress.completionLabelTemplate.replace("{percentage}", String(step.percentage))}</span></div>
          <progress max={100} value={step.percentage} aria-label={content.progress.title} />
          <h2 id="tutorial-step-title" ref={heading} tabIndex={-1}>
            <span className="tutorial-title-icon" aria-hidden="true"><StepIcon aria-hidden="true" /></span>{step.title}
          </h2>
          {"description" in step && <p className="tutorial-description">{step.description}</p>}
          {"instructions" in step && <section className="tutorial-instructions">
            <h3>{step.instructionsTitle}</h3>
            <ol>{step.instructions.map((instruction, index) => <li key={instruction}><span aria-hidden="true">{index + 1}</span>{instruction}</li>)}</ol>
          </section>}
          {"cartaData" in step ? <>
            <TutorialCartaData />
            <p className="tutorial-edit">{step.editPrompt} <a href={step.editAction.href}>{step.editAction.label}</a></p>
          </> : number === 1 ? <a className="tutorial-access-link" href={officialUrl} target="_blank" rel="noopener noreferrer"
            aria-label="Acessar a plataforma oficial do Paraíba Digital (abre em nova aba)">
            <img className="tutorial-access-illustration" src={acessarPlataformaIllustration}
            alt="Ilustração indicando o acesso à plataforma oficial do Paraíba Digital" />
          </a> : <section className="tutorial-preview" aria-label={step.platformPreview.title}>
            <div className="tutorial-preview-bar"><span aria-hidden="true">🔴 🟠 🟢</span><span>{step.platformPreview.title}</span></div>
            <div className="tutorial-preview-body"><img src={computer} alt="" /><h3>{step.platformPreview.title}</h3><p>{step.platformPreview.placeholder}</p></div>
          </section>}
          <div className="tutorial-actions">
            {number === 1 && <ButtonLink href={returnHref} variant="secondary" iconLeft={<ArrowLeft size={16} aria-hidden="true" />}>Voltar</ButtonLink>}
            {step.actions.map(action =>
              <button className={action.kind === "previous" ? "button-link button-link--secondary" : "tutorial-button"} key={action.kind} type="button"
                onClick={() => action.kind === "finish" ? setFinished(true) : navigate(number + (action.kind === "previous" ? -1 : 1))}>
                {action.kind === "previous" && <ArrowLeft size={16} aria-hidden="true" />}{action.label}{action.kind === "next" && <ArrowRight size={16} aria-hidden="true" />}
              </button>)}
          </div>
        </section>
      </div>
      {finished && <TutorialCompletionDialog onClose={() => setFinished(false)} />}
    </div>
  );
}

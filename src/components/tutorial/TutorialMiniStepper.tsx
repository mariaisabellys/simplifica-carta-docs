import { useId, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Step = { id: string; title: string; content: ReactNode };

export function TutorialMiniStepper({ title, steps, emptyText }: {
  title: string; steps: Step[]; emptyText: string;
}) {
  const [current, setCurrent] = useState(0);
  const id = useId();
  const multiple = steps.length > 1;

  return <section className="tutorial-mini-stepper" aria-labelledby={`${id}-title`}>
    <h4 id={`${id}-title`} className="tutorial-sr-only">{title}</h4>
    {steps.length > 0 ? <>
      {steps.map((step, index) => <div id={`${id}-panel-${step.id}`} key={step.id}
        className="tutorial-mini-stepper-panel" hidden={index !== current} role="group" aria-label={step.title}>
        {step.content}
      </div>)}
      {multiple && <div className="tutorial-internal-navigation">
        <div className="tutorial-internal-progress">
          <div className="tutorial-mini-stepper-track" aria-hidden="true">
            <span className="tutorial-mini-stepper-position"
              style={{ width: `${(current + 1) * 100 / steps.length}%` }} />
          </div>
          
        </div>
        <div className="tutorial-mini-stepper-actions">
          <button type="button" className="tutorial-internal-arrow" disabled={current === 0}
            aria-label="Voltar item anterior" aria-controls={`${id}-panel-${steps[current].id}`}
            onClick={() => setCurrent(value => value - 1)}>
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" className="tutorial-internal-arrow" disabled={current === steps.length - 1}
            aria-label="Avançar para o próximo item" aria-controls={`${id}-panel-${steps[current].id}`}
            onClick={() => setCurrent(value => value + 1)}>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>}
    </> : <p className="tutorial-description">{emptyText}</p>}
  </section>;
}

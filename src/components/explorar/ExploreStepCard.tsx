import type { ExploreStep } from "../../content/pages/explorar-por-etapas";
import { ButtonLink } from "../ui/ButtonLink";
import chevronRight from "../../assets/explorar-por-etapas/chevron-right.svg";

type ExploreStepCardProps = {
  step: ExploreStep;
  icon: string;
};

export function ExploreStepCard({ step, icon }: ExploreStepCardProps) {
  return (
    <article className={`explore-step-card explore-step-card--${step.tone}`}>
      <div className="explore-step-card__topline">
        <div className="explore-step-card__icon"><img src={icon} alt="" aria-hidden="true" /></div>
        <span className="explore-step-card__badge">Etapa {step.number}</span>
      </div>
      <div>
        <h2>{step.title}</h2>
        <p>{step.description}</p>
      </div>
      <ButtonLink href={step.href} variant="step" icon={chevronRight}>
        {step.actionLabel}
      </ButtonLink>
    </article>
  );
}

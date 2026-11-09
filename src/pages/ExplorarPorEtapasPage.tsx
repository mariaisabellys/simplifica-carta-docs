import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ButtonLink } from "../components/ui/ButtonLink";
import { ExploreStepCard } from "../components/explorar/ExploreStepCard";
import { explorePageContent } from "../content/pages/explorar-por-etapas";
import helpCircle from "../assets/explorar-por-etapas/help-circle.svg";
import checkSquare from "../assets/explorar-por-etapas/check-square.svg";
import fileText from "../assets/explorar-por-etapas/file-text.svg";
import bookOpen from "../assets/explorar-por-etapas/book-open.svg";

const stepIcons = [helpCircle, checkSquare, fileText, bookOpen] as const;

export function ExplorarPorEtapasPage() {
  return (
    <div className="explore-page">
      <section className="explore-hero">
        <div className="explore-container">
          <Breadcrumb items={[{ label: "Início", href: "/" }, { label: explorePageContent.title, current: true }]} />
          <h1>{explorePageContent.title}</h1>
          <p>{explorePageContent.description}</p>
        </div>
      </section>

      <div className="explore-content explore-container">
        <ol className="explore-step-grid">
          {explorePageContent.steps.map((step, index) => <li key={step.id}><ExploreStepCard step={step} icon={stepIcons[index]} /></li>)}
        </ol>
        <section className="explore-guide-cta" aria-labelledby="explore-guide-title">
          <p>{explorePageContent.guideCta.prompt}</p>
          <ButtonLink href={explorePageContent.guideCta.href} variant="outline-navy">
            {explorePageContent.guideCta.actionLabel}
          </ButtonLink>
        </section>
      </div>
    </div>
  );
}

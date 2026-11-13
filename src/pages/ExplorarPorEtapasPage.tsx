import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ArrowRight, Route } from "lucide-react";
import { ButtonLink } from "../components/ui/ButtonLink";
import { ExploreStepsCarousel } from "../components/explorar/ExploreStepsCarousel";
import { explorePageContent } from "../content/pages/explorar-por-etapas";

export function ExplorarPorEtapasPage() {
  return (
    <div className="explore-page">
      <div className="explore-content explore-container">
        <header className="explore-intro">
          <Breadcrumb items={[{ label: "Início", href: "/" }, { label: explorePageContent.title, current: true }]} />
          <h1>{explorePageContent.introTitle}</h1>
          <p>{explorePageContent.description}</p>
          <span className="explore-intro__accent" aria-hidden="true" />
        </header>
        <ExploreStepsCarousel />
        <section className="explore-guide-cta" aria-labelledby="explore-guide-title">
          <span className="explore-guide-cta__icon" aria-hidden="true"><Route /></span>
          <div className="explore-guide-cta__content">
            <p className="explore-guide-cta__label">{explorePageContent.guideCta.label}</p>
            <h2 id="explore-guide-title">{explorePageContent.guideCta.title}</h2>
            <p>{explorePageContent.guideCta.description}</p>
          </div>
          <ButtonLink href={explorePageContent.guideCta.href} variant="primary" iconRight={<ArrowRight size={16} aria-hidden="true" />}>
            {explorePageContent.guideCta.actionLabel}
          </ButtonLink>
        </section>
      </div>
    </div>
  );
}

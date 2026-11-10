import { ButtonLink } from "../components/ui/ButtonLink";
import { homeContent } from "../content/pages/home";
import heroImage from "../assets/home/hero-carta-servico.png";
import playIcon from "../assets/home/play.svg";
import listIcon from "../assets/home/text-align-start.svg";
import arrowIcon from "../assets/home/arrow-right.svg";

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-container home-hero__grid">
          <div className="home-hero__content">
            <p className="eyebrow">Guia para criação de Cartas de Serviços</p>
            <h1>Menos burocracia,<br /><span>mais praticidade.</span></h1>
            <p>{homeContent.hero.description}</p>
            <div className="hero-actions">
              {homeContent.hero.actions.map((action) => (
                <ButtonLink key={action.href} href={action.href} variant={action.variant} icon={action.icon === "play" ? playIcon : listIcon}>
                  {action.label}
                </ButtonLink>
              ))}
            </div>
          </div>
          <img className="home-hero__image" src={heroImage} alt="Ilustração de uma Carta de Serviços" />
        </div>
      </section>

      <section className="home-process home-container" aria-labelledby="process-title">
        <div className="home-section-heading">
          <h2 id="process-title">{homeContent.process.title}</h2>
          <p>{homeContent.process.description}</p>
        </div>
        <ol className="process-grid">
          {homeContent.process.steps.map((step) => (
            <li className="process-step" key={step.id}>
              <a className="process-step__link" href={step.href}>
                <span className="process-step__number" aria-hidden="true">{step.number}</span>
                <p className="process-step__eyebrow">{step.eyebrow}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-intro-cta" aria-labelledby="intro-cta-title">
        <div className="home-container home-intro-cta__inner">
          <div>
            <p className="eyebrow">{homeContent.introCta.eyebrow}</p>
            <h2 id="intro-cta-title">{homeContent.introCta.title}</h2>
            <p>{homeContent.introCta.description}</p>
          </div>
          <ButtonLink href={homeContent.introCta.actionHref} variant="primary" icon={arrowIcon}>
            {homeContent.introCta.actionLabel}
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}

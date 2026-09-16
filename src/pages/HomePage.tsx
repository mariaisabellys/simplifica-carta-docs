import { ButtonLink } from "../components/ui/ButtonLink";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";
import { fluxoPrincipal } from "../content/fluxo/fluxo-principal";

export function HomePage() {
  return (
    <>
      <section className="hero">
        <p className="eyebrow">Manual interativo</p>
        <h1>Simplifica Carta</h1>
        <p>
          Uma base para orientar servidores publicos no levantamento, organizacao e
          preparacao das informacoes da Carta de Servicos.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/o-que-e-carta-de-servicos">Iniciar guia</ButtonLink>
          <ButtonLink href="/diagnostico" variant="secondary">
            Fazer diagnostico
          </ButtonLink>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <p className="eyebrow">Fluxo principal</p>
          <h2>Preparacao antes do Paraiba Digital</h2>
        </div>
        <div className="step-grid">
          {fluxoPrincipal.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <PlaceholderCard title="Estado da fundacao">
        Esta tela inicial ainda e um placeholder da fundacao tecnica. As telas finais serao
        detalhadas nas proximas specs antes da implementacao.
      </PlaceholderCard>
    </>
  );
}

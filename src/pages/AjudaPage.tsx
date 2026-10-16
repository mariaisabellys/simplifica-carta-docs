import { ButtonLink } from "../components/ui/ButtonLink";
import { PageHeader } from "../components/ui/PageHeader";
import { helpPageContent } from "../content/pages/ajuda";
import { supportChannels } from "../content/support/canais";

export function AjudaPage() {
  const content = helpPageContent;
  const appointmentState = supportChannels["atendimento-agendado"];

  return (
    <>
      <PageHeader
        eyebrow={content.tagline}
        title={content.title}
        description={content.description}
      />
      <ButtonLink href={content.primaryAction.href}>{content.primaryAction.label}</ButtonLink>

      <section id={content.faq.id} aria-labelledby="faq-title">
        <h2 id="faq-title">{content.faq.title}</h2>
        {content.faq.items.map((item) => (
          <details key={item.id}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </section>

      <section id={content.support.id} aria-labelledby="support-title">
        <p>{content.support.sectionTitle}</p>
        <h2 id="support-title">{content.support.title}</h2>
        <p>{content.support.description}</p>
        {appointmentState.status !== "ativo" ? <p>{appointmentState.notice}</p> : null}
        <ButtonLink href={content.support.action.href} variant="secondary">
          {appointmentState.status === "ativo"
            ? content.support.action.label
            : "Consultar atendimento ->"}
        </ButtonLink>
      </section>
    </>
  );
}

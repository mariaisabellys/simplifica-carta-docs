import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../components/ui/ButtonLink";
import { PageHeader } from "../components/ui/PageHeader";
import { helpPageContent } from "../content/pages/ajuda";

export function AjudaPage() {
  const content = helpPageContent;

  return (
    <>
      <PageHeader
        eyebrow={content.tagline}
        title={content.title}
        description={content.description}
      />
      <ButtonLink href={content.primaryAction.href} iconRight={<ArrowRight size={16} aria-hidden="true" />}>{content.primaryAction.label}</ButtonLink>

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
        {content.support.notice ? <p>{content.support.notice}</p> : null}
        <ButtonLink href={content.support.action.href} variant="secondary">
          {content.support.action.label}
        </ButtonLink>
      </section>
    </>
  );
}

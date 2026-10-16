import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";
import { emailSupportContent } from "../content/ajuda/suporte-email";

export function SuporteEmailPage() {
  const content = emailSupportContent;

  return (
    <>
      <PageHeader
        eyebrow="E-mail"
        title={content.title}
        description={content.description}
      />
      <PlaceholderCard title={content.contact.addressLabel}>
        <p>{content.contact.address}</p>
        {content.channelState.status !== "ativo" ? (
          <p>{content.channelState.notice}</p>
        ) : null}
        {content.channelState.status === "pendente" ? <p>{content.pendingNotice}</p> : null}
        {content.action ? <a href={content.action.href}>{content.action.label}</a> : null}
      </PlaceholderCard>
    </>
  );
}

import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";

export function AjudaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Suporte"
        title="Preciso de ajuda"
        description="Entrada para suporte por e-mail e solicitacao basica de atendimento agendado."
      />
      <div className="two-column">
        <PlaceholderCard title="Atendimento agendado">
          Fluxo com data, horario, dados institucionais minimos e notificacao da equipe.
        </PlaceholderCard>
        <PlaceholderCard title="Suporte por e-mail">
          Canal orientativo para duvidas sobre levantamento, organizacao e elaboracao da Carta.
        </PlaceholderCard>
      </div>
    </>
  );
}

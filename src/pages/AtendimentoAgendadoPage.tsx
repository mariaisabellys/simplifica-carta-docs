import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";

export function AtendimentoAgendadoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Atendimento"
        title="Atendimento agendado"
        description="Placeholder para a feature que exigira backend minimo em etapa posterior."
      />
      <PlaceholderCard title="Separacao tecnica">
        A fundacao reserva `src/features/atendimento`, mas ainda nao implementa APIs nem
        persistencia.
      </PlaceholderCard>
    </>
  );
}

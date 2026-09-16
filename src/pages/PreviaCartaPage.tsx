import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";

export function PreviaCartaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Previa"
        title="Previa HTML"
        description="Area reservada para revisao visual dinamica das informacoes preenchidas."
      />
      <PlaceholderCard title="Uso no MVP">
        A previa HTML e apoio de revisao. A exportacao oficial do MVP sera CSV gerado no
        navegador.
      </PlaceholderCard>
    </>
  );
}

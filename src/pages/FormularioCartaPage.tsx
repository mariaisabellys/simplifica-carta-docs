import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";
import { cartaServicoInicial } from "../features/carta/carta.schema";

export function FormularioCartaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Formulario"
        title="Preencher a Carta de Servicos"
        description="Estrutura inicial para o formulario que sera dividido em partes nas specs futuras."
      />
      <PlaceholderCard title="Modelo inicial">
        O modelo da Carta ja existe com {Object.keys(cartaServicoInicial).length} grupos
        principais para evoluir o formulario.
      </PlaceholderCard>
    </>
  );
}

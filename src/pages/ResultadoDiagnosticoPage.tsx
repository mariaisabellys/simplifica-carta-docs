import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";

export function ResultadoDiagnosticoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resultado"
        title="Resultado do diagnostico"
        description="Tela reservada para apresentar orientacao conforme as respostas do usuario."
      />
      <PlaceholderCard title="Proxima spec">
        A logica completa do diagnostico sera definida na spec de diagnostico de servico
        publico.
      </PlaceholderCard>
    </>
  );
}

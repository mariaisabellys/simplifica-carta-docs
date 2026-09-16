import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";
import { perguntasDiagnostico } from "../content/diagnostico/perguntas";

export function DiagnosticoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Diagnostico"
        title="Identificar um servico publico"
        description="Perguntas iniciais para diferenciar servico publico de processo interno, programa ou sistema."
      />
      <div className="content-list">
        {perguntasDiagnostico.map((pergunta) => (
          <PlaceholderCard key={pergunta.id} title={pergunta.label}>
            {pergunta.hint}
          </PlaceholderCard>
        ))}
      </div>
    </>
  );
}

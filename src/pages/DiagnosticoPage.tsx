import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";
import {
  diagnosticoContent,
  perguntasDiagnostico,
} from "../content/diagnostico/perguntas";

export function DiagnosticoPage() {
  return (
    <>
      <PageHeader
        eyebrow={diagnosticoContent.sectionLabel}
        title={diagnosticoContent.title}
        description={diagnosticoContent.description}
      />
      <ul className="diagnostic-highlights" aria-label="Características do diagnóstico">
        {diagnosticoContent.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="content-list">
        {perguntasDiagnostico.map((pergunta) => (
          <PlaceholderCard key={pergunta.id} title={pergunta.text} />
        ))}
      </div>
    </>
  );
}

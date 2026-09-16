import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";
import { tutorialParaibaDigital } from "../content/tutorial/paraiba-digital";

export function TutorialParaibaDigitalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cadastro manual"
        title="Tutorial Paraiba Digital"
        description="Orientacoes para copiar as informacoes preparadas e cadastrar manualmente na plataforma oficial."
      />
      <div className="content-list">
        {tutorialParaibaDigital.map((item) => (
          <PlaceholderCard key={item.title} title={item.title}>
            {item.description}
          </PlaceholderCard>
        ))}
      </div>
    </>
  );
}

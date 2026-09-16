import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";

export function OrganizarInformacoesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Organizacao"
        title="Organizar informacoes"
        description="Checklist inicial das informacoes necessarias para preencher a Carta de Servicos."
      />
      <PlaceholderCard title="Campos esperados">
        Nome, descricao, publico-alvo, documentos, etapas, prazos, custos, canais,
        agendamento e informacoes complementares.
      </PlaceholderCard>
    </>
  );
}

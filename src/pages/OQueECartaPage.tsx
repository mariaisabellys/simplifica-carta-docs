import { PageHeader } from "../components/ui/PageHeader";
import { PlaceholderCard } from "../components/ui/PlaceholderCard";

export function OQueECartaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Conceito"
        title="O que e a Carta de Servicos"
        description="Espaco reservado para explicar finalidade, importancia e limites da Carta de Servicos."
      />
      <PlaceholderCard title="Conteudo versionado">
        O texto institucional desta pagina devera sair de arquivos em `src/content/pages`,
        mantendo regra de negocio fora dos componentes visuais.
      </PlaceholderCard>
    </>
  );
}

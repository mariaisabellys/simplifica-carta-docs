import type { ContentItem, ServiceInformationFieldId } from "../../content/pages/o-que-e-carta";

type ServiceInformationCardProps = {
  item: ContentItem<ServiceInformationFieldId>;
  icon: string;
};

export function ServiceInformationCard({ item, icon }: ServiceInformationCardProps) {
  return (
    <article className="service-information-card">
      <img src={icon} alt="" aria-hidden="true" />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

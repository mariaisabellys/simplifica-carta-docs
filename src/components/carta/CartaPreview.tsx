import type { CartaPreviewField, CartaPreviewModel } from "../../features/carta/carta.preview";
import { cartaPreviewDomId } from "../../features/carta/carta.preview";
import { previaCartaContent } from "../../content/pages/previa-carta";
import fileIcon from "../../assets/previa/file.svg";

type CartaPreviewProps = {
  model: CartaPreviewModel;
  idPrefix: string;
  headingLevel?: 2 | 3;
};

export function CartaPreview({ model, idPrefix, headingLevel = 2 }: CartaPreviewProps) {
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const SectionHeading = `h${Math.min(headingLevel + 1, 4)}` as "h3" | "h4";
  const ItemHeading = `h${Math.min(headingLevel + 2, 5)}` as "h4" | "h5";
  if (!model.hasContent) {
    return <section className="carta-preview-empty" aria-labelledby={`${idPrefix}-empty-title`}><Heading id={`${idPrefix}-empty-title`}>{previaCartaContent.emptyTitle}</Heading><p>{previaCartaContent.emptyDescription}</p></section>;
  }
  return <article className="carta-preview-card" aria-labelledby={`${idPrefix}-title`}>
    <header className="carta-preview-card__header"><img src={fileIcon} alt="" aria-hidden="true" className="carta-preview-card__icon" /><Heading id={`${idPrefix}-title`}>{previaCartaContent.cardTitle}</Heading></header>
    <div className="carta-preview-card__body">{model.sections.map((section) => <section className="carta-preview-section" key={section.id} aria-labelledby={`${idPrefix}-${section.id}-title`}><SectionHeading id={`${idPrefix}-${section.id}-title`}>{section.title}</SectionHeading>{section.fields.length ? <dl>{section.fields.map((entry) => <PreviewField key={entry.id} field={entry} id={cartaPreviewDomId(idPrefix, section.id, entry.id)} />)}</dl> : null}{section.items ? <div className="carta-preview-items">{section.items.length ? section.items.map((item) => <article className="carta-preview-item" key={item.id} aria-labelledby={cartaPreviewDomId(idPrefix, section.id, "item-title", item.id)}><ItemHeading id={cartaPreviewDomId(idPrefix, section.id, "item-title", item.id)}>{item.label}</ItemHeading><dl>{item.fields.map((entry) => <PreviewField key={entry.id} field={entry} id={cartaPreviewDomId(idPrefix, section.id, entry.id, item.id)} />)}</dl></article>) : <p className="carta-preview-empty-list">{section.emptyItemsLabel}</p>}</div> : null}</section>)}</div>
  </article>;
}

function PreviewField({ field, id }: { field: CartaPreviewField; id: string }) {
  return <div className={`carta-preview-field${field.value.kind === "missing" ? " is-missing" : ""}`} id={id}><dt>{field.label}</dt><dd>{field.value.kind === "missing" ? previaCartaContent.missingValue : field.value.kind === "list" ? <ul>{field.value.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul> : field.value.text}</dd></div>;
}

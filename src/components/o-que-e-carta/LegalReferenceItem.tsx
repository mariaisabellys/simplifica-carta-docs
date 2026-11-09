import type { LegalReference } from "../../content/pages/o-que-e-carta";
import legislationIcon from "../../assets/o-que-e-carta-servico/legislacao.svg";

type LegalReferenceItemProps = {
  reference: LegalReference;
};

export function LegalReferenceItem({ reference }: LegalReferenceItemProps) {
  return (
    <article className="legal-reference-item">
      <img src={legislationIcon} alt="" aria-hidden="true" />
      <div className="legal-reference-item__body">
        <p className="legal-reference-item__kind">{reference.kind}</p>
        <h3>{reference.number}/{reference.year}</h3>
        <p>{reference.summary}</p>
      </div>
      <a href={reference.href} target="_blank" rel="noopener noreferrer">
        {reference.actionLabel}<span aria-hidden="true"> ↗</span><span className="sr-only"> (abre em nova aba)</span>
      </a>
    </article>
  );
}

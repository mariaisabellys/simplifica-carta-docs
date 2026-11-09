import { Breadcrumb } from "../components/ui/Breadcrumb";
import { LegalReferenceItem } from "../components/o-que-e-carta/LegalReferenceItem";
import { ServiceInformationCard } from "../components/o-que-e-carta/ServiceInformationCard";
import { aboutCharterPageContent } from "../content/pages/o-que-e-carta";
import citizenIcon from "../assets/o-que-e-carta-servico/para-o-cidadao.svg";
import importanceIcon from "../assets/o-que-e-carta-servico/importancia.svg";
import agencyIcon from "../assets/o-que-e-carta-servico/para-o-orgao-publico.svg";
import nameIcon from "../assets/o-que-e-carta-servico/nome-do-servico.svg";
import descriptionIcon from "../assets/o-que-e-carta-servico/o-que-e.svg";
import audienceIcon from "../assets/o-que-e-carta-servico/quem-pode-utilizar.svg";
import documentsIcon from "../assets/o-que-e-carta-servico/documentos-necessarios.svg";
import stepsIcon from "../assets/o-que-e-carta-servico/etapas.svg";
import deadlineIcon from "../assets/o-que-e-carta-servico/prazo.svg";
import costsIcon from "../assets/o-que-e-carta-servico/custos.svg";
import channelsIcon from "../assets/o-que-e-carta-servico/canais-de-atendimento.svg";
import schedulingIcon from "../assets/o-que-e-carta-servico/agendamento.svg";
import additionalIcon from "../assets/o-que-e-carta-servico/informacoes-adicionais.svg";

const informationIcons = [nameIcon, descriptionIcon, audienceIcon, documentsIcon, stepsIcon, deadlineIcon, costsIcon, channelsIcon, schedulingIcon, additionalIcon] as const;

export function OQueECartaPage() {
  return (
    <div className="charter-page">
      <section className="charter-intro">
        <div className="charter-container charter-intro__grid">
          <div className="charter-intro__copy">
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: aboutCharterPageContent.title, current: true }]} />
            <p className="eyebrow">Conceito</p>
            <h1>{aboutCharterPageContent.title}</h1>
            <p>{aboutCharterPageContent.description}</p>
          </div>
          <aside className="importance-panel" aria-labelledby="importance-title">
            <h2 id="importance-title">{aboutCharterPageContent.importance.title}</h2>
            <ul>
              {aboutCharterPageContent.importance.items.map((item, index) => (
                <li key={item.id}>
                  <img src={[citizenIcon, importanceIcon, importanceIcon][index]} alt="" aria-hidden="true" />
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="foundations-section" aria-labelledby="foundations-title">
        <div className="charter-container">
          <h2 id="foundations-title">{aboutCharterPageContent.foundations.title}</h2>
          <p className="foundations-section__description">{aboutCharterPageContent.foundations.description}</p>
          <div className="foundations-grid">
            {aboutCharterPageContent.foundations.items.map((item) => (
              <article className={`foundation-card foundation-card--${item.id}`} key={item.id}>
                <img src={item.id === "citizen" ? citizenIcon : agencyIcon} alt="" aria-hidden="true" />
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="information-section charter-container" aria-labelledby="information-title">
        <div className="information-section__heading">
          <h2 id="information-title">{aboutCharterPageContent.information.title}</h2>
          <p>{aboutCharterPageContent.information.description}</p>
        </div>
        <div className="service-information-grid">
          {aboutCharterPageContent.information.fields.map((item, index) => <ServiceInformationCard key={item.id} item={item} icon={informationIcons[index]} />)}
        </div>
      </section>

      <section className="legislation-section" aria-labelledby="legislation-title">
        <div className="charter-container">
          <div className="legislation-section__heading">
            <h2 id="legislation-title">{aboutCharterPageContent.legislation.title}</h2>
            <p>{aboutCharterPageContent.legislation.description}</p>
          </div>
          <div className="legal-reference-list">
            {aboutCharterPageContent.legislation.references.map((reference) => <LegalReferenceItem key={reference.id} reference={reference} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

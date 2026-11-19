import { ArrowLeft, ArrowRight, CircleHelp } from "lucide-react";
import { useMemo, useState } from "react";
import { CartaPreview } from "../components/carta/CartaPreview";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ButtonLink } from "../components/ui/ButtonLink";
import { previaCartaContent } from "../content/pages/previa-carta";
import { criarModeloPreviaCarta } from "../features/carta/carta.preview";
import { criarCartaServicoInicial } from "../features/carta/carta.schema";
import { carregarCartaDaSessao } from "../features/carta/carta.storage";
import { validarCartaObrigatoria } from "../features/carta/carta.validation";
import type { CartaServico } from "../features/carta/carta.types";

export function PreviaCartaPage() {
  const [carta] = useState<CartaServico>(() => { try { return carregarCartaDaSessao(); } catch { return criarCartaServicoInicial(); } });
  const model = useMemo(() => criarModeloPreviaCarta(carta), [carta]);
  const issues = useMemo(() => validarCartaObrigatoria(carta), [carta]);
  return <div className="preview-page"><div className="preview-page__container">
    <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Preencher a Carta", href: "/formulario-carta" }, { label: "Prévia", current: true }]} />
    <header className="preview-page__header"><p className="eyebrow">{previaCartaContent.eyebrow}</p><h1>{previaCartaContent.title}</h1><p>{previaCartaContent.description}</p></header>
    {model.hasContent && issues.length ? <aside className="preview-page__notice" aria-label="Resumo da revisão"><strong>{issues.length} pendência(s) estrutural(is)</strong><p>A prévia preserva os dados informados. Corrija os campos no formulário antes de exportar ou publicar.</p></aside> : null}
    {model.hasEmptyItems ? <aside className="preview-page__notice preview-page__notice--warning"><p>{previaCartaContent.emptyItemsWarning}</p></aside> : null}
    <CartaPreview model={model} idPrefix="page-preview" headingLevel={2} />
    <nav className="preview-page__actions" aria-label="Ações da prévia"><ButtonLink href="/formulario-carta" variant="outline-navy" iconLeft={<ArrowLeft size={16} aria-hidden="true" />}>{model.hasContent ? previaCartaContent.actions.edit : "Preencher Carta"}</ButtonLink><ButtonLink href="/tutorial-paraiba-digital" variant="primary" iconRight={<ArrowRight size={16} aria-hidden="true" />}>{previaCartaContent.actions.tutorial}</ButtonLink><ButtonLink href="/ajuda" variant="secondary" iconLeft={<CircleHelp size={16} aria-hidden="true" />}>{previaCartaContent.actions.help}</ButtonLink></nav>
  </div></div>;
}

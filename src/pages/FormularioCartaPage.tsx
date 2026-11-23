import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, CircleHelp, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { CartaPreview } from "../components/carta/CartaPreview";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { ButtonLink } from "../components/ui/ButtonLink";
import { charterFormPageContent } from "../content/pages/formulario-carta";
import { organizeInformationPageContent, type PreparationInformationId } from "../content/pages/organizar-informacoes";
import { categoriasServico, modalidadesEtapa, perfisUsuario, publicosEspecificos, subcategoriasPorCategoria, tiposPrazo } from "../features/carta/carta.catalogs";
import { criarModeloPreviaCarta } from "../features/carta/carta.preview";
import { adicionarDocumento, adicionarEtapa, moverEtapa as moverEtapaNaCarta, removerDocumento as removerDocumentoDaCarta, removerEtapa as removerEtapaDaCarta, selecionarCategoria } from "../features/carta/carta.operations";
import { useCartaSession } from "../features/carta/CartaSessionProvider";
import { validarCartaObrigatoria, type CharterPartId, type ValidacaoCarta } from "../features/carta/carta.validation";
import { analisarLinguagemSimples } from "../features/carta/carta.language";
import type { LanguageReview } from "../features/carta/carta.language.types";
import type { CartaServico, TipoAgendamento } from "../features/carta/carta.types";

const parts = charterFormPageContent.parts;
const uid = () => typeof crypto !== "undefined" && "randomUUID" in crypto
  ? crypto.randomUUID()
  : `item-${Date.now()}-${Math.random().toString(16).slice(2)}`;

function focusAfterRender(id: string) {
  requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.focus()));
}

export function FormularioCartaPage() {
  const { carta, revision, storageMode, loadStatus, review, updateCarta, reviewCarta, replaceStoredCarta } = useCartaSession();
  const [partId, setPartId] = useState<CharterPartId>("about-service");
  const [touched, setTouched] = useState(() => new Set<string>());
  const [languageReview, setLanguageReview] = useState<LanguageReview | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const partIndex = parts.findIndex((item) => item.id === partId);
  const part = parts[partIndex];
  const currentIssues = useMemo(() => validarCartaObrigatoria(carta), [carta]);
  const previewModel = useMemo(() => criarModeloPreviaCarta(carta), [carta]);
  const reviewIsCurrent = review?.revision === revision;
  const ready = reviewIsCurrent && review.status === "complete";

  const update = (mutate: (next: CartaServico) => void | CartaServico) => {
    updateCarta(mutate);
    setLanguageReview(null);
  };
  const markTouched = (path: string) => setTouched((current) => new Set(current).add(path));
  const errorFor = (path: string) => (touched.has(path) || reviewIsCurrent)
    ? currentIssues.find((item) => item.campo === path)
    : undefined;
  const announce = (message: string) => { setAnnouncement(""); requestAnimationFrame(() => setAnnouncement(message)); };

  function runReview() {
    const result = reviewCarta();
    setLanguageReview(analisarLinguagemSimples(carta));
    if (result.issues.length) focusIssue(result.issues[0]);
  }

  function focusIssue(item: ValidacaoCarta) {
    setPartId(item.partId);
    focusAfterRender(item.targetId);
  }

  function addDocument() {
    const id = uid();
    update((next) => adicionarDocumento(next, id));
    announce("Documento adicionado.");
    focusAfterRender(`carta-document-${id}-name`);
  }

  function removeDocument(id: string) {
    const index = carta.publicoRequisitos.documentos.findIndex((item) => item.id === id);
    const remaining = carta.publicoRequisitos.documentos.filter((item) => item.id !== id);
    const nextTarget = remaining[index]?.id ?? remaining[index - 1]?.id;
    update((next) => removerDocumentoDaCarta(next, id));
    announce("Documento removido.");
    focusAfterRender(nextTarget ? `carta-document-${nextTarget}-name` : "carta-add-document");
  }

  function addStep() {
    const id = uid();
    update((next) => adicionarEtapa(next, id));
    announce("Etapa adicionada.");
    focusAfterRender(`carta-step-${id}-titulo`);
  }

  function removeStep(id: string) {
    const index = carta.etapas.findIndex((item) => item.id === id);
    const remaining = carta.etapas.filter((item) => item.id !== id);
    const nextTarget = remaining[index]?.id ?? remaining[index - 1]?.id;
    update((next) => removerEtapaDaCarta(next, id));
    announce("Etapa removida.");
    focusAfterRender(nextTarget ? `carta-step-${nextTarget}-titulo` : "carta-add-step");
  }

  function moveStep(id: string, direction: -1 | 1) {
    const from = carta.etapas.findIndex((item) => item.id === id);
    const to = from + direction;
    if (from < 0 || to < 0 || to >= carta.etapas.length) return;
    update((next) => moverEtapaNaCarta(next, id, direction));
    announce(`Etapa movida para a posição ${to + 1}.`);
    focusAfterRender(`carta-step-${id}-move-${direction < 0 ? "up" : "down"}`);
  }

  return <div className="charter-form-page"><div className="charter-form-container">
    <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Organizar informações", href: "/organizar-informacoes" }, { label: "Preencher a Carta", current: true }]} />
    <header className="charter-form-header"><p className="eyebrow">{charterFormPageContent.sectionLabel}</p><h1>{charterFormPageContent.title}</h1><p>{charterFormPageContent.description}</p></header>
    <p className="sr-only" aria-live="polite">{announcement}</p>
    <StorageNotice mode={storageMode} status={loadStatus} replace={replaceStoredCarta} />
    {review && !reviewIsCurrent ? <div className="charter-session-notice"><strong>A Carta foi alterada após a última revisão.</strong><p>Revise novamente para confirmar o estado atual.</p></div> : null}
    <nav className="charter-part-tabs" aria-label="Partes da Carta"><ol>{parts.map((item, index) => <li key={item.id}><button type="button" aria-current={item.id === partId ? "step" : undefined} className={item.id === partId ? "is-active" : ""} onClick={() => setPartId(item.id)}><span>{index + 1}</span>{item.title}</button></li>)}</ol></nav>
    <div className="charter-form-layout">
      <aside className="charter-form-sidebar"><h2>Progresso da Carta</h2><strong>{currentIssues.length ? `${currentIssues.length} pendência(s)` : "Sem pendências detectadas"}</strong><small>Parte {partIndex + 1} de {parts.length}</small><p>Você pode mudar de parte sem perder o que já preencheu.</p></aside>
      <main className="charter-form-content">
        <section className="charter-part-heading"><p className="eyebrow">Parte {partIndex + 1} de {parts.length}</p><h2>{part.title}</h2><p>{part.description}</p></section>
        {partId === "about-service" ? <AboutService carta={carta} update={update} errorFor={errorFor} touch={markTouched} announce={announce} /> : null}
        {partId === "audience-requirements" ? <Audience carta={carta} update={update} errorFor={errorFor} touch={markTouched} addDocument={addDocument} removeDocument={removeDocument} /> : null}
        {partId === "service-flow" ? <ServiceFlow carta={carta} update={update} errorFor={errorFor} touch={markTouched} addStep={addStep} removeStep={removeStep} moveStep={moveStep} /> : null}
        {partId === "service-attendance" ? <Attendance carta={carta} update={update} errorFor={errorFor} touch={markTouched} /> : null}
        {partId === "final-information" ? <FinalInfo carta={carta} update={update} touch={markTouched} /> : null}
        <div className="charter-part-navigation"><button type="button" className="button-link button-link--outline-navy" disabled={partIndex === 0} onClick={() => setPartId(parts[partIndex - 1].id)}><ArrowLeft size={16} aria-hidden="true" />Parte anterior</button>{partIndex < parts.length - 1 ? <button type="button" className="button-link button-link--primary" onClick={() => setPartId(parts[partIndex + 1].id)}>Próxima parte<ArrowRight size={16} aria-hidden="true" /></button> : <button type="button" className="button-link button-link--primary" onClick={runReview}>Revisar Carta</button>}</div>
        {reviewIsCurrent ? <ReviewSummary review={review} ready={ready} focusIssue={focusIssue} /> : null}
        {languageReview ? <LanguageSummary review={languageReview} /> : null}
      </main>
      <aside className="charter-live-preview" aria-labelledby={`inline-preview-${part.id}-heading`}><div className="charter-inline-preview__heading"><div><p className="eyebrow">Prévia ao vivo</p><h2 id={`inline-preview-${part.id}-heading`}>Veja a Carta enquanto preenche</h2></div><ButtonLink href="/previa" variant="outline-navy">Abrir prévia completa</ButtonLink></div><CartaPreview model={previewModel} idPrefix={`form-preview-${part.id}`} headingLevel={3} /></aside>
    </div>
  </div></div>;
}

type CommonPartProps = { carta: CartaServico; update: (mutate: (next: CartaServico) => void | CartaServico) => void; errorFor: (path: string) => ValidacaoCarta | undefined; touch: (path: string) => void };
type FieldProps = { label: string; id: string; path: string; value: string; onChange: (value: string) => void; touch: (path: string) => void; issue?: ValidacaoCarta; help?: string; type?: "text" | "url" };

function Field({ label, id, path, value, onChange, touch, issue, help, type = "text" }: FieldProps) {
  const descriptionId = `${id}-description`;
  return <label className="charter-field" htmlFor={id}><span>{label}</span><input id={id} type={type} value={value} onChange={(event) => onChange(event.target.value)} onBlur={() => touch(path)} aria-invalid={issue ? true : undefined} aria-describedby={(help || issue) ? descriptionId : undefined} />{help || issue ? <small id={descriptionId} className={issue ? "charter-error" : undefined}>{issue?.mensagem ?? help}</small> : null}</label>;
}

function TextArea(props: FieldProps) {
  const { label, id, path, value, onChange, touch, issue, help } = props;
  const descriptionId = `${id}-description`;
  return <label className="charter-field" htmlFor={id}><span>{label}</span><textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} onBlur={() => touch(path)} rows={5} aria-invalid={issue ? true : undefined} aria-describedby={(help || issue) ? descriptionId : undefined} />{help || issue ? <small id={descriptionId} className={issue ? "charter-error" : undefined}>{issue?.mensagem ?? help}</small> : null}</label>;
}

function Guidance({ infoId, complement }: { infoId: PreparationInformationId; complement?: string }) {
  const [open, setOpen] = useState(false);
  const info = organizeInformationPageContent.information.find((item) => item.id === infoId);
  if (!info) return null;
  const id = `guidance-${infoId}`;
  return <section className={`charter-guidance${open ? " is-open" : ""}`}><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}><CircleHelp size={17} aria-hidden="true" />{open ? "Fechar orientação" : `Como preencher: ${info.title}`}</button>{open ? <div id={id}><p>{info.summary}</p>{complement ? <p>{complement}</p> : null}<ul>{info.howToIdentify.map((item) => <li key={item}>{item}</li>)}</ul>{info.example ? <p><strong>Exemplo:</strong> {info.example}</p> : null}</div> : null}</section>;
}

function AboutService({ carta, update, errorFor, touch, announce }: CommonPartProps & { announce: (message: string) => void }) {
  const subcategories = carta.sobreServico.categoria ? subcategoriasPorCategoria[carta.sobreServico.categoria] : [];
  return <div className="charter-card-grid">
    <Field label="Nome do serviço" id="carta-service-name" path="sobreServico.nome" value={carta.sobreServico.nome} onChange={(value) => update((next) => { next.sobreServico.nome = value; })} touch={touch} issue={errorFor("sobreServico.nome")} />
    <Field label="Nome popular" id="carta-popular-name" path="sobreServico.nomePopular" value={carta.sobreServico.nomePopular} onChange={(value) => update((next) => { next.sobreServico.nomePopular = value; })} touch={touch} />
    <Guidance infoId="service-name" />
    <TextArea label="O que é o serviço" id="carta-service-description" path="sobreServico.descricao" value={carta.sobreServico.descricao} onChange={(value) => update((next) => { next.sobreServico.descricao = value; })} touch={touch} issue={errorFor("sobreServico.descricao")} help="Use até 20 palavras significativas em toda a descrição." />
    <Guidance infoId="service-description" />
    <label className="charter-field" htmlFor="carta-category"><span>Categoria</span><select id="carta-category" value={carta.sobreServico.categoria ?? ""} onBlur={() => touch("sobreServico.categoria")} aria-invalid={errorFor("sobreServico.categoria") ? true : undefined} onChange={(event) => { const value = (event.target.value || null) as CartaServico["sobreServico"]["categoria"]; const cleared = !!carta.sobreServico.subcategoria; update((next) => selecionarCategoria(next, value)); if (cleared) announce("A subcategoria foi limpa porque a categoria mudou."); }}><option value="">Selecione</option>{categoriasServico.map((item) => <option key={item}>{item}</option>)}</select>{errorFor("sobreServico.categoria") ? <small className="charter-error">{errorFor("sobreServico.categoria")!.mensagem}</small> : null}</label>
    <label className="charter-field" htmlFor="carta-subcategory"><span>Subcategoria</span><select id="carta-subcategory" value={carta.sobreServico.subcategoria ?? ""} disabled={!carta.sobreServico.categoria} onBlur={() => touch("sobreServico.subcategoria")} aria-invalid={errorFor("sobreServico.subcategoria") ? true : undefined} onChange={(event) => update((next) => { next.sobreServico.subcategoria = (event.target.value || null) as CartaServico["sobreServico"]["subcategoria"]; })}><option value="">Selecione</option>{subcategories.map((item) => <option key={item}>{item}</option>)}</select>{errorFor("sobreServico.subcategoria") ? <small className="charter-error">{errorFor("sobreServico.subcategoria")!.mensagem}</small> : null}</label>
    <Field label="Tópico" id="carta-topic" path="sobreServico.topico" value={carta.sobreServico.topico} onChange={(value) => update((next) => { next.sobreServico.topico = value; })} touch={touch} help="Escreva o assunto mais específico, se houver." />
    <Guidance infoId="category" />
    <label className="charter-check charter-field" htmlFor="carta-active"><input id="carta-active" type="checkbox" checked={carta.sobreServico.ativo} onChange={(event) => update((next) => { next.sobreServico.ativo = event.target.checked; })} /><span>Serviço ativo</span><small>Este é apenas o estado configurado na Carta; não publica nem despublica o serviço.</small></label>
  </div>;
}

function Audience({ carta, update, errorFor, touch, addDocument, removeDocument }: CommonPartProps & { addDocument: () => void; removeDocument: (id: string) => void }) {
  const cost = carta.publicoRequisitos.custo;
  return <div className="charter-card-grid">
    <fieldset id="carta-specific-audience" className="charter-fieldset" tabIndex={-1}><legend>Público específico <small>Escolha até 2 grupos.</small></legend><div className="charter-options">{publicosEspecificos.map((item) => <label key={item}><input type="checkbox" checked={carta.publicoRequisitos.publicosEspecificos.includes(item)} disabled={!carta.publicoRequisitos.publicosEspecificos.includes(item) && carta.publicoRequisitos.publicosEspecificos.length >= 2} onChange={() => update((next) => { next.publicoRequisitos.publicosEspecificos = next.publicoRequisitos.publicosEspecificos.includes(item) ? next.publicoRequisitos.publicosEspecificos.filter((value) => value !== item) : [...next.publicoRequisitos.publicosEspecificos, item]; })} />{item}</label>)}</div></fieldset>
    <fieldset id="carta-user-profile" className="charter-fieldset charter-fieldset--wide" tabIndex={-1} aria-invalid={errorFor("publicoRequisitos.perfisUsuario") ? true : undefined}><legend>Perfil do usuário <small>Selecione ao menos um.</small></legend><div className="charter-options charter-options--many">{perfisUsuario.map((item) => <label key={item}><input type="checkbox" checked={carta.publicoRequisitos.perfisUsuario.includes(item)} onBlur={() => touch("publicoRequisitos.perfisUsuario")} onChange={() => update((next) => { next.publicoRequisitos.perfisUsuario = next.publicoRequisitos.perfisUsuario.includes(item) ? next.publicoRequisitos.perfisUsuario.filter((value) => value !== item) : [...next.publicoRequisitos.perfisUsuario, item]; })} />{item}</label>)}</div>{errorFor("publicoRequisitos.perfisUsuario") ? <small className="charter-error">{errorFor("publicoRequisitos.perfisUsuario")!.mensagem}</small> : null}</fieldset>
    <Guidance infoId="audience" complement="Selecione até dois públicos específicos, ao menos um perfil e descreva as condições de acesso." />
    <Field label="Quem pode utilizar" id="carta-who-can-use" path="publicoRequisitos.quemPodeUtilizar" value={carta.publicoRequisitos.quemPodeUtilizar} onChange={(value) => update((next) => { next.publicoRequisitos.quemPodeUtilizar = value; })} touch={touch} issue={errorFor("publicoRequisitos.quemPodeUtilizar")} />
    <fieldset className="charter-fieldset charter-fieldset--wide"><legend>Documentos necessários <small>Se nenhum documento for exigido, mantenha a lista vazia.</small></legend>{carta.publicoRequisitos.documentos.map((document, index) => <div className="charter-collection-row" key={document.id}><Field label={`Documento ${index + 1}`} id={`carta-document-${document.id}-name`} path={`publicoRequisitos.documentos.${document.id}.nome`} value={document.nome} onChange={(value) => update((next) => { const item = next.publicoRequisitos.documentos.find((entry) => entry.id === document.id); if (item) item.nome = value; })} touch={touch} issue={errorFor(`publicoRequisitos.documentos.${document.id}.nome`)} /><button type="button" className="charter-remove" onClick={() => removeDocument(document.id)}><Trash2 size={16} aria-hidden="true" />Remover documento {index + 1}</button></div>)}<button id="carta-add-document" type="button" className="button-link button-link--outline-navy" onClick={addDocument}><Plus size={16} aria-hidden="true" />Adicionar documento</button></fieldset>
    <Guidance infoId="documents" />
    <fieldset id="carta-costs" className="charter-fieldset" tabIndex={-1}><legend>Custos e taxas</legend><div className="charter-options">{([['gratuito','Gratuito'],['sob-consulta','Sob consulta'],['com-taxa','Com taxa']] as const).map(([id, label]) => <label key={id}><input type="radio" name="carta-cost" checked={cost.tipo === id} onBlur={() => touch("publicoRequisitos.custo.tipo")} onChange={() => update((next) => { next.publicoRequisitos.custo.tipo = id; })} />{label}</label>)}</div>{errorFor("publicoRequisitos.custo.tipo") ? <small className="charter-error">{errorFor("publicoRequisitos.custo.tipo")!.mensagem}</small> : null}{cost.tipo && cost.tipo !== "gratuito" ? <Field label="Valor, orientação ou link para consulta" id="carta-cost-detail" path="publicoRequisitos.custo.detalhe" value={cost.detalhe} onChange={(value) => update((next) => { next.publicoRequisitos.custo.detalhe = value; })} touch={touch} issue={errorFor("publicoRequisitos.custo.detalhe")} /> : null}</fieldset>
    <Guidance infoId="costs" />
    <div className="charter-inline-fields"><Field label="Prazo máximo" id="carta-deadline" path="publicoRequisitos.prazo.maximo" value={carta.publicoRequisitos.prazo.maximo} onChange={(value) => update((next) => { next.publicoRequisitos.prazo.maximo = value; })} touch={touch} issue={errorFor("publicoRequisitos.prazo.maximo")} help="Use um inteiro positivo, sem zeros à esquerda." /><label className="charter-field" htmlFor="carta-deadline-type"><span>Tipo de prazo</span><select id="carta-deadline-type" value={carta.publicoRequisitos.prazo.tipo ?? ""} onBlur={() => touch("publicoRequisitos.prazo.tipo")} onChange={(event) => update((next) => { next.publicoRequisitos.prazo.tipo = (event.target.value || null) as CartaServico["publicoRequisitos"]["prazo"]["tipo"]; })}><option value="">Selecione</option>{tiposPrazo.map((item) => <option key={item}>{item}</option>)}</select>{errorFor("publicoRequisitos.prazo.tipo") ? <small className="charter-error">{errorFor("publicoRequisitos.prazo.tipo")!.mensagem}</small> : null}</label></div>
    <Guidance infoId="deadline" />
  </div>;
}

function ServiceFlow({ carta, update, errorFor, touch, addStep, removeStep, moveStep }: CommonPartProps & { addStep: () => void; removeStep: (id: string) => void; moveStep: (id: string, direction: -1 | 1) => void }) {
  return <div className="charter-card-grid"><fieldset className="charter-fieldset charter-fieldset--wide"><legend>Etapas do serviço</legend>{carta.etapas.map((step, index) => <article className="charter-step" key={step.id}><div className="charter-step__heading"><strong>Etapa {index + 1}</strong><div className="charter-step__actions"><button id={`carta-step-${step.id}-move-up`} type="button" disabled={index === 0} onClick={() => moveStep(step.id, -1)} aria-label={`Mover etapa ${index + 1} para cima`}><ArrowUp size={16} aria-hidden="true" /></button><button id={`carta-step-${step.id}-move-down`} type="button" disabled={index === carta.etapas.length - 1} onClick={() => moveStep(step.id, 1)} aria-label={`Mover etapa ${index + 1} para baixo`}><ArrowDown size={16} aria-hidden="true" /></button><button type="button" className="charter-remove" onClick={() => removeStep(step.id)}><Trash2 size={16} aria-hidden="true" />Remover</button></div></div><Field label="Título da etapa" id={`carta-step-${step.id}-titulo`} path={`etapas.${step.id}.titulo`} value={step.titulo} onChange={(value) => update((next) => { const item = next.etapas.find((entry) => entry.id === step.id); if (item) item.titulo = value; })} touch={touch} issue={errorFor(`etapas.${step.id}.titulo`)} /><TextArea label="Orientação ao cidadão" id={`carta-step-${step.id}-orientacaoCidadao`} path={`etapas.${step.id}.orientacaoCidadao`} value={step.orientacaoCidadao} onChange={(value) => update((next) => { const item = next.etapas.find((entry) => entry.id === step.id); if (item) item.orientacaoCidadao = value; })} touch={touch} issue={errorFor(`etapas.${step.id}.orientacaoCidadao`)} /><label className="charter-field" htmlFor={`carta-step-${step.id}-modalidade`}><span>Modalidade</span><select id={`carta-step-${step.id}-modalidade`} value={step.modalidade ?? ""} onBlur={() => touch(`etapas.${step.id}.modalidade`)} onChange={(event) => update((next) => { const item = next.etapas.find((entry) => entry.id === step.id); if (item) item.modalidade = (event.target.value || null) as CartaServico["etapas"][number]["modalidade"]; })}><option value="">Selecione</option>{modalidadesEtapa.map((item) => <option key={item}>{item}</option>)}</select>{errorFor(`etapas.${step.id}.modalidade`) ? <small className="charter-error">{errorFor(`etapas.${step.id}.modalidade`)!.mensagem}</small> : null}</label></article>)}<button id="carta-add-step" type="button" className="button-link button-link--outline-navy" onClick={addStep}><Plus size={16} aria-hidden="true" />Adicionar etapa</button>{errorFor("etapas") ? <small className="charter-error">{errorFor("etapas")!.mensagem}</small> : null}</fieldset><Guidance infoId="steps" /></div>;
}

function Attendance({ carta, update, errorFor, touch }: CommonPartProps) {
  const attendance = carta.atendimento;
  const scheduled = attendance.exigeAgendamento === true;
  const online = scheduled && attendance.tiposAgendamento.includes("online");
  const external = online && attendance.sistemaAgendamento === "sistema-externo";
  return <div className="charter-card-grid"><label className="charter-field" htmlFor="carta-requires-scheduling"><span>Necessita de agendamento?</span><select id="carta-requires-scheduling" value={attendance.exigeAgendamento === null ? "" : attendance.exigeAgendamento ? "sim" : "nao"} onBlur={() => touch("atendimento.exigeAgendamento")} onChange={(event) => update((next) => { next.atendimento.exigeAgendamento = event.target.value === "" ? null : event.target.value === "sim"; })}><option value="">Selecione</option><option value="sim">Sim</option><option value="nao">Não</option></select>{errorFor("atendimento.exigeAgendamento") ? <small className="charter-error">{errorFor("atendimento.exigeAgendamento")!.mensagem}</small> : null}</label>{scheduled ? <fieldset id="carta-scheduling-types" className="charter-fieldset charter-fieldset--wide" tabIndex={-1}><legend>Tipo de agendamento</legend><div className="charter-options">{(["online", "presencial"] as TipoAgendamento[]).map((type) => <label key={type}><input type="checkbox" checked={attendance.tiposAgendamento.includes(type)} onBlur={() => touch("atendimento.tiposAgendamento")} onChange={() => update((next) => { next.atendimento.tiposAgendamento = next.atendimento.tiposAgendamento.includes(type) ? next.atendimento.tiposAgendamento.filter((item) => item !== type) : [...next.atendimento.tiposAgendamento, type]; })} />{type === "online" ? "Online" : "Presencial"}</label>)}</div>{errorFor("atendimento.tiposAgendamento") ? <small className="charter-error">{errorFor("atendimento.tiposAgendamento")!.mensagem}</small> : null}</fieldset> : null}{online ? <fieldset id="carta-scheduling-system" className="charter-fieldset charter-fieldset--wide" tabIndex={-1}><legend>Sistema usado no agendamento on-line</legend><div className="charter-options"><label><input type="radio" name="carta-scheduling-system" checked={attendance.sistemaAgendamento === "paraiba-digital"} onBlur={() => touch("atendimento.sistemaAgendamento")} onChange={() => update((next) => { next.atendimento.sistemaAgendamento = "paraiba-digital"; })} />Paraíba Digital</label><label><input type="radio" name="carta-scheduling-system" checked={attendance.sistemaAgendamento === "sistema-externo"} onBlur={() => touch("atendimento.sistemaAgendamento")} onChange={() => update((next) => { next.atendimento.sistemaAgendamento = "sistema-externo"; })} />Outro sistema ou site</label></div>{errorFor("atendimento.sistemaAgendamento") ? <small className="charter-error">{errorFor("atendimento.sistemaAgendamento")!.mensagem}</small> : null}</fieldset> : null}{external ? <><Field label="Link do agendamento" id="carta-scheduling-link" path="atendimento.linkAgendamento" value={attendance.linkAgendamento} type="url" onChange={(value) => update((next) => { next.atendimento.linkAgendamento = value; })} touch={touch} issue={errorFor("atendimento.linkAgendamento")} /><fieldset id="carta-scheduling-display" className="charter-fieldset" tabIndex={-1}><legend>Como será exibido?</legend><div className="charter-options"><label><input type="radio" name="carta-scheduling-display" checked={attendance.exibicaoAgendamento === "dentro-paraiba-digital"} onBlur={() => touch("atendimento.exibicaoAgendamento")} onChange={() => update((next) => { next.atendimento.exibicaoAgendamento = "dentro-paraiba-digital"; })} />Dentro do Paraíba Digital</label><label><input type="radio" name="carta-scheduling-display" checked={attendance.exibicaoAgendamento === "nova-pagina"} onBlur={() => touch("atendimento.exibicaoAgendamento")} onChange={() => update((next) => { next.atendimento.exibicaoAgendamento = "nova-pagina"; })} />Em uma nova página</label></div>{errorFor("atendimento.exibicaoAgendamento") ? <small className="charter-error">{errorFor("atendimento.exibicaoAgendamento")!.mensagem}</small> : null}</fieldset></> : null}<Guidance infoId="scheduling" complement="O sistema é necessário apenas quando o tipo inclui On-line; dados ocultos continuam preservados para uma possível restauração." /></div>;
}

function FinalInfo({ carta, update, touch }: Pick<CommonPartProps, "carta" | "update" | "touch">) {
  return <div className="charter-card-grid"><TextArea label="Informações adicionais importantes" id="carta-additional-information" path="informacoesFinais.informacoesAdicionais" value={carta.informacoesFinais.informacoesAdicionais} onChange={(value) => update((next) => { next.informacoesFinais.informacoesAdicionais = value; })} touch={touch} /><Guidance infoId="additional-information" /><Field label="Palavras-chave" id="carta-keywords" path="informacoesFinais.palavrasChave" value={carta.informacoesFinais.palavrasChave} onChange={(value) => update((next) => { next.informacoesFinais.palavrasChave = value; })} touch={touch} /><Guidance infoId="keywords" /></div>;
}

function StorageNotice({ mode, status, replace }: { mode: "session" | "memory-only" | "replacement-required"; status: string; replace: () => boolean }) {
  if (mode === "session") return null;
  return <aside className="charter-session-notice" role="status"><strong>{mode === "replacement-required" ? "Não foi possível recuperar a Carta salva." : "A Carta está somente na memória."}</strong><p>{mode === "replacement-required" ? `O registro existente (${status === "unsupported" ? "de outra versão" : "inválido"}) foi preservado e não será sobrescrito sem sua confirmação.` : "Se a página for recarregada, as alterações podem ser perdidas."}</p>{mode === "replacement-required" ? <button type="button" className="button-link button-link--outline-navy" onClick={replace}>Usar esta nova Carta na sessão</button> : null}</aside>;
}

function ReviewSummary({ review, ready, focusIssue }: { review: NonNullable<ReturnType<typeof useCartaSession>["review"]>; ready: boolean; focusIssue: (issue: ValidacaoCarta) => void }) {
  return <section className={`charter-review ${ready ? "is-complete" : "has-issues"}`} aria-live="polite"><h3>{review.status === "failed" ? "Não foi possível concluir a revisão" : ready ? "Informações obrigatórias concluídas" : "Ainda há informações para revisar"}</h3>{review.status === "failed" ? <p>Tente revisar novamente. A Carta continua disponível para edição.</p> : review.issues.length ? <ol>{review.issues.map((item) => <li key={`${item.campo}-${item.mensagem}`}><button type="button" onClick={() => focusIssue(item)}><strong>{item.label}:</strong> {item.mensagem}</button></li>)}</ol> : <p>A estrutura está completa no snapshot atual. Isso não representa aprovação institucional nem publicação automática.</p>}<div className="charter-review__actions"><ButtonLink href="/previa" variant="outline-navy">Conferir prévia</ButtonLink><ButtonLink href="/tutorial-paraiba-digital?etapa=1&origem=guia" variant={ready ? "primary" : "secondary"} iconRight={<ArrowRight size={16} aria-hidden="true" />}>{ready ? "Ver tutorial de publicação" : "Consultar tutorial com dados parciais"}</ButtonLink></div></section>;
}

function LanguageSummary({ review }: { review: LanguageReview }) {
  return <section className={`charter-language-review ${review.occurrences.length ? "has-guidance" : "is-pending"}`} aria-live="polite"><h3>Revisão em linguagem simples</h3><p>{review.message}</p>{review.occurrences.length ? <ul>{review.occurrences.map((item) => <li key={item.id}><strong>{item.fieldPath}</strong>: {item.message}{item.excerpt ? <blockquote>{item.excerpt}</blockquote> : null}</li>)}</ul> : null}<small>Esta orientação editorial não bloqueia prévia, navegação ou exportação.</small></section>;
}

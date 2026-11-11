import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Copy } from "lucide-react";
import { tutorialCartaDataContent as content } from "../../content/tutorial/paraiba-digital";
import { carregarCartaDaSessao } from "../../features/carta/carta.storage";
import { hasMissingTutorialInformation, projectCartaForTutorial, type TutorialField } from "../../features/carta/carta.tutorial";
import { TutorialMiniStepper } from "./TutorialMiniStepper";
import { organizeTutorialSteps } from "./tutorial.steps";
import { copiarTexto } from "../../lib/clipboard";

// Locks survive a step unmount while the browser's clipboard write is pending.
const pendingCopies = new Set<string>();

function CopyField({ field }: { field: TutorialField }) {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(pendingCopies.has(field.id));
  const mounted = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const id = `tutorial-carta-${field.id}`;
  useEffect(() => {
    mounted.current = true;
    const interval = setInterval(() => setPending(pendingCopies.has(field.id)), 500);
    return () => { mounted.current = false; clearTimeout(timer.current); clearInterval(interval); };
  }, [field.id]);

  async function copy() {
    if (pendingCopies.has(field.id)) return;
    pendingCopies.add(field.id);
    setPending(true);
    setStatus("Copiando…");
    timer.current = setTimeout(() => {
      if (mounted.current) setStatus("A cópia está demorando. Você pode selecionar o texto e copiar manualmente.");
    }, 10000);
    try {
      const result = await copiarTexto(field.value);
      if (mounted.current) {
        clearTimeout(timer.current);
        setStatus(result.status === "success" ? "Texto copiado." : "Não foi possível copiar. Selecione o texto e copie manualmente.");
        if (result.status === "success") timer.current = setTimeout(() => setStatus(""), 5000);
      }
    } finally {
      pendingCopies.delete(field.id);
      if (mounted.current) setPending(false);
    }
  }

  const hasText = field.value.trim().length > 0;
  return <div className="tutorial-data-row" id={id}>
    {field.copyable && hasText ? <>
      <div className="tutorial-data-value">
        <label htmlFor={`${id}-text`}>{field.label}</label>
        <textarea id={`${id}-text`} rows={Math.min(4, Math.max(field.value.length > 120 ? 4 : 1, field.value.split("\n").length))} readOnly value={field.value} aria-describedby={`${id}-status`} />
      </div>
      <button className="tutorial-button tutorial-button--secondary" type="button" aria-disabled={pending} onClick={copy} aria-label={content.copyActionLabelTemplate.replace("{field}", field.label)}><Copy size={16} aria-hidden="true" />{pending ? "Copiando…" : "Copiar"}</button>
      <p id={`${id}-status`} role="status">{status || (pending ? "Cópia em andamento. A seleção manual continua disponível." : "")}</p>
    </> : <dl><dt>{field.label}</dt><dd>{hasText ? field.value : content.emptyTextValue}</dd></dl>}
  </div>;
}

export function TutorialCartaData() {
  const [carta] = useState(carregarCartaDaSessao);
  const groups = organizeTutorialSteps(projectCartaForTutorial(carta));
  return <section id="tutorial-dados" className="tutorial-data" aria-labelledby="tutorial-step-title" tabIndex={-1}>
    <p className="tutorial-description">{content.description}</p>
    <p className="tutorial-description">{content.manualChoiceNotice}</p>
    {hasMissingTutorialInformation(carta) && <div className="tutorial-notice">
      <AlertTriangle className="tutorial-notice-icon" size={18} aria-hidden="true" />
      <p className="tutorial-notice-content">Algumas informações da sua Carta ainda não foram preenchidas. <a href="/formulario-carta">Preencher Carta</a></p>
    </div>}
    <TutorialMiniStepper title={content.title} emptyText={content.emptyTextValue}
      steps={groups.flatMap((group, index) => group.steps.length ? group.steps.map(step => ({
        id: `${index}-${step.id}`,
        title: step.title,
        content: <>{step.fields.map(field => <CopyField key={field.id} field={field} />)}</>,
      })) : [{
        id: `${index}-empty`,
        title: group.title,
        content: <p className="tutorial-description">{content.emptyTextValue}</p>,
      }])} />
  </section>;
}


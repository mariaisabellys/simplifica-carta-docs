import type { TutorialField, TutorialGroup } from "../../features/carta/carta.tutorial";

export type TutorialInternalStep = { id: string; title: string; fields: TutorialField[] };

// Explicit platform order, independent of the Carta's storage categories.
export function organizeTutorialSteps(groups: TutorialGroup[]) {
  const fields = groups.flatMap(group => group.fields);
  const select = (...ids: string[]) => ids.flatMap(id => fields.filter(field => field.id === id));
  const documents = fields.filter(field => field.id.startsWith("document-") && field.value.trim().length > 0);
  const separateDocuments = documents.length >= 2;
  const scheduling = (...ids: string[]) => select(...ids).filter(field => field.value.trim());
  const definitions = [
    { id: "identity", fields: select("service-name", "specific-audience", "popular-name") },
    { id: "classification", fields: select("user-profile", "category", "subcategory", "topic") },
    // Split on both sides so documentation stays between description and eligibility.
    ...(separateDocuments ? [
      { id: "description", fields: select("service-description") },
      { id: "documents", fields: documents },
      { id: "eligibility", fields: select("who-can-use") },
    ] : [
      { id: "description", fields: [...select("service-description"), ...documents, ...select("who-can-use")] },
    ]),
    { id: "additional-information", fields: select("important-additional-information", "keywords") },
    { id: "scheduling", fields: scheduling("requires-scheduling", "scheduling-type", "scheduling-system") },
    { id: "scheduling-link", fields: scheduling("scheduling-display", "scheduling-link") },
    { id: "costs-and-deadline", fields: select("costs-and-fees", "cost-value-or-link", "maximum-deadline", "deadline-type").filter(field => field.id !== "cost-value-or-link" || field.value.trim()) },
  ];
  const steps: TutorialInternalStep[] = definitions
    .filter(group => group.fields.length)
    .map((group, index) => ({ ...group, title: `Conjunto ${index + 1}` }));
  const stageTitles = fields.filter(field => /^step-.*-title$/.test(field.id));
  stageTitles.forEach((field, index) => {
    const id = field.id.slice(0, -"-title".length);
    steps.push({ id, title: `Conjunto ${steps.length + 1} — Etapa ${index + 1}`, fields: select(`${id}-title`, `${id}-guidance`, `${id}-modality`) });
  });
  return steps.map(step => ({ title: step.title, steps: [step] }));
}

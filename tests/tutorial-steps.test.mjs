import { test } from "node:test";
import assert from "node:assert/strict";
import { criarCartaServicoInicial } from "../src/features/carta/carta.schema.ts";
import { projectCartaForTutorial } from "../src/features/carta/carta.tutorial.ts";
import { organizeTutorialSteps } from "../src/components/tutorial/tutorial.steps.ts";

const pages = carta => organizeTutorialSteps(projectCartaForTutorial(carta)).flatMap(group => group.steps);
const ids = page => page.fields.map(field => field.id);
const expected = [
  ["service-name", "specific-audience", "popular-name"],
  ["user-profile", "category", "subcategory", "topic"],
  ["service-description", "document-doc-1", "who-can-use"],
  ["important-additional-information", "keywords"],
  ["requires-scheduling", "scheduling-type", "scheduling-system"],
  ["scheduling-display", "scheduling-link"],
  ["costs-and-fees", "cost-value-or-link", "maximum-deadline", "deadline-type"],
];
function completeCarta() {
  const carta = criarCartaServicoInicial();
  carta.publicoRequisitos.documentos = [{ id: "doc-1", nome: "RG" }];
  carta.publicoRequisitos.custo = { tipo: "com-taxa", detalhe: "  10 reais\nvalor literal  " };
  carta.atendimento = { exigeAgendamento: true, tiposAgendamento: ["online"], sistemaAgendamento: "sistema-externo", linkAgendamento: "https://example.com", exibicaoAgendamento: "nova-pagina" };
  carta.etapas = Array.from({ length: 12 }, (_, i) => ({ id: `stage-${i}`, ordem: i + 1, titulo: `Stage ${i}`, orientacaoCidadao: `Instructions ${i}`, modalidade: "Online" }));
  return carta;
}

test("exact platform order, seven fixed sets and one page per service stage; preserves all values", () => {
  const carta = completeCarta();
  const before = JSON.stringify(carta);
  const projected = projectCartaForTutorial(carta);
  const projectionBefore = JSON.stringify(projected);
  const result = organizeTutorialSteps(projected).flatMap(group => group.steps);
  assert.equal(result.length, 7 + carta.etapas.length);
  assert.deepEqual(result.slice(0, 7).map(ids), expected);
  carta.etapas.forEach((stage, index) => {
    assert.deepEqual(ids(result[7 + index]), ["title", "guidance", "modality"].map(suffix => `step-${stage.id}-${suffix}`));
    assert.deepEqual(result[7 + index].fields.map(field => field.value), [stage.titulo, stage.orientacaoCidadao, stage.modalidade]);
  });
  assert.equal(result[5].fields[1].label, "Link/URL para agendamento");
  const actual = result.flatMap(page => page.fields);
  assert.deepEqual(actual.map(field => field.id).sort(), projected.flatMap(group => group.fields).filter(field => field.id !== "active").map(field => field.id).sort());
  for (const field of actual) assert.deepEqual(field, projected.flatMap(group => group.fields).find(original => original.id === field.id));
  assert.equal(JSON.stringify(carta), before);
  assert.equal(JSON.stringify(projected), projectionBefore);
});

test("conditional scheduling and costs keep relative order and never create empty pages", () => {
  for (const requires of [null, false, true]) for (const types of [[], ["presencial"], ["online"], ["online", "presencial"]]) for (const system of [null, "paraiba-digital", "sistema-externo"]) for (const cost of [null, "gratuito", "sob-consulta", "com-taxa"]) {
    const carta = completeCarta();
    carta.etapas = [];
    carta.atendimento.exigeAgendamento = requires;
    carta.atendimento.tiposAgendamento = types;
    carta.atendimento.sistemaAgendamento = system;
    carta.publicoRequisitos.custo.tipo = cost;
    const result = pages(carta);
    assert(result.every(page => page.fields.length));
    const actual = result.flatMap(ids);
    const applicable = expected.flat().filter(id => {
      if (id === "requires-scheduling") return requires !== null;
      if (id === "scheduling-type") return requires === true && types.length > 0;
      if (id === "scheduling-system") return requires === true && types.includes("online") && system !== null;
      if (["scheduling-display", "scheduling-link"].includes(id)) return requires === true && types.includes("online") && system === "sistema-externo";
      if (id === "cost-value-or-link") return ["sob-consulta", "com-taxa"].includes(cost);
      return true;
    });
    assert.deepEqual(actual, applicable);
  }
});

test("empty retained conditional values do not produce empty sets", () => {
  const carta = completeCarta();
  carta.atendimento.linkAgendamento = "";
  carta.atendimento.exibicaoAgendamento = null;
  carta.publicoRequisitos.custo.detalhe = "";
  const result = pages(carta);
  assert.equal(result.length, 6 + carta.etapas.length);
  assert.equal(result.some(page => page.id === "scheduling-link"), false);
  assert.equal(result.flatMap(ids).includes("cost-value-or-link"), false);
});

for (const count of [0, 1, 2, 3, 10]) {
  test(`document pagination with ${count} documents preserves sequence, values and dynamic totals`, () => {
    const carta = completeCarta();
    carta.publicoRequisitos.documentos = Array.from({ length: count }, (_, index) => ({ id: `doc-${index}`, nome: `  Documento ${index}\ntexto original  ` }));
    const before = JSON.stringify(carta);
    const projected = projectCartaForTutorial(carta);
    const result = pages(carta);
    const documentFields = projected.flatMap(group => group.fields).filter(field => field.id.startsWith("document-") && field.value.trim().length > 0);
    const split = count >= 2;
    assert.equal(result.length, (split ? 9 : 7) + carta.etapas.length);
    const documentPage = result.find(page => page.fields.some(field => field.id === documentFields[0]?.id));
    if (split) {
      assert.equal(documentPage.id, "documents");
      assert.deepEqual(documentPage.fields, documentFields);
      assert.deepEqual(ids(result[2]), ["service-description"]);
      assert.deepEqual(ids(result[4]), ["who-can-use"]);
    } else {
      assert.equal(result.some(page => page.id === "documents"), false);
      assert.deepEqual(ids(documentPage ?? result[2]), ["service-description", ...documentFields.map(field => field.id), "who-can-use"]);
    }
    const flattened = result.flatMap(page => page.fields);
    assert.deepEqual(flattened.filter(field => documentFields.some(document => document.id === field.id)), documentFields);
    assert.deepEqual(flattened.map(field => field.id), [
      ...expected.slice(0, 2).flat(), "service-description", ...documentFields.map(field => field.id), "who-can-use",
      ...expected.slice(3).flat(), ...carta.etapas.flatMap(stage => ["title", "guidance", "modality"].map(suffix => `step-${stage.id}-${suffix}`)),
    ]);
    result.forEach((page, index) => assert(page.title.startsWith(`Conjunto ${index + 1}`)));
    assert.equal(JSON.stringify(carta), before);
  });
}

test("internal navigation renders the dynamic page count and progress for document scenarios", async () => {
  const { readFileSync } = await import("node:fs");
  const { createRequire } = await import("node:module");
  const { runInNewContext } = await import("node:vm");
  const { default: ts } = await import("typescript");
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const componentUrl = new URL("../src/components/tutorial/TutorialMiniStepper.tsx", import.meta.url);
  const source = readFileSync(componentUrl, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  for (const count of [0, 1, 2, 3, 10]) {
    const carta = completeCarta();
    carta.publicoRequisitos.documentos = Array.from({ length: count }, (_, i) => ({ id: `d-${i}`, nome: `Document ${i}` }));
    const steps = pages(carta).map(page => ({ id: page.id, title: page.title, content: page.fields.map(field => field.value).join("\n") }));
    for (const current of [0, steps.length - 1]) {
      const exports = {};
      const require = createRequire(componentUrl);
      runInNewContext(compiled, { exports, require: name => name === "react" ? { ...require(name), useState: () => [current, () => {}] } : require(name) });
      const html = renderToStaticMarkup(createElement(exports.TutorialMiniStepper, { title: "Informações", emptyText: "Não informado", steps }));
      assert.equal((html.match(/role="group"/g) || []).length, steps.length);
      assert.equal((html.match(/hidden=""/g) || []).length, steps.length - 1);
      assert(html.includes(`width:${(current + 1) * 100 / steps.length}%`));
      const buttons = html.match(/<button[^>]*>/g);
      assert.equal(buttons[0].includes('disabled=""'), current === 0);
      assert.equal(buttons[1].includes('disabled=""'), current === steps.length - 1);
    }
  }
});

test("only filled documents count toward pagination without changing stored values", () => {
  for (const filled of [0, 1, 2, 4]) {
    const carta = completeCarta();
    carta.publicoRequisitos.documentos = [
      { id: "empty", nome: "" },
      ...Array.from({ length: filled }, (_, i) => ({ id: `filled-${i}`, nome: `  Documento ${i}\ntexto original  ` })),
      { id: "whitespace", nome: " \n\t " },
    ];
    const before = JSON.stringify(carta);
    const result = pages(carta);
    const documentPage = result.find(page => page.id === "documents");
    assert.equal(Boolean(documentPage), filled >= 2);
    assert.equal(result.length, (filled >= 2 ? 9 : 7) + carta.etapas.length);
    const documents = result.flatMap(page => page.fields).filter(field => field.id.startsWith("document-"));
    assert.equal(documents.length, filled);
    assert.deepEqual(documents.map(field => field.value), carta.publicoRequisitos.documentos.filter(document => document.nome.trim()).map(document => document.nome));
    assert.equal(result.flatMap(ids).includes("required-documents"), false);
    if (filled === 0) assert.deepEqual(ids(result[2]), ["service-description", "who-can-use"]);
    assert.equal(JSON.stringify(carta), before);
  }
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { test } from "node:test";
import { tutorialParaibaDigitalContent as content } from "../src/content/tutorial/paraiba-digital.ts";

const page = readFileSync(new URL("../src/pages/TutorialParaibaDigitalPage.tsx", import.meta.url), "utf8");
const reader = page.match(/function readStep\(\) \{[\s\S]*?\n\}/)[0];
function readStep(search) {
  return runInNewContext(`${reader}\nreadStep()`, { URLSearchParams, window: { location: { search } } });
}

test("five matching navigation entries with progress from 20 to 100 percent", () => {
  assert.equal(content.progress.totalSteps, 5);
  assert.deepEqual(content.steps.map(step => step.title), ["Acesse a plataforma", "Faça login", "Localize o cadastro", "Cadastre as informações de sua Carta", "Publique o serviço"]);
  assert.deepEqual(content.progress.navigation.map(item => item.id), content.steps.map(step => step.id));
  assert.deepEqual(content.progress.navigation.map(item => item.label), content.steps.map(step => step.title));
  assert.deepEqual(content.steps.map(step => step.number), [1, 2, 3, 4, 5]);
  assert.deepEqual(content.steps.map(step => step.percentage), [20, 40, 60, 80, 100]);
  assert(content.description.includes("5 etapas"));
});

test("direct query access accepts only steps 1 through 5", () => {
  for (let number = 1; number <= 5; number++) assert.equal(readStep(`?etapa=${number}`), number);
  for (const search of ["", "?etapa=6", "?etapa=0", "?etapa=7", "?etapa=05", "?etapa=abc"]) assert.equal(readStep(search), 1);
});

test("next and previous actions traverse five steps and publication finishes", () => {
  let number = readStep("?etapa=1");
  const visited = [number];
  while (content.steps[number - 1].actions.some(action => action.kind === "next")) {
    number++;
    assert(number <= content.steps.length);
    visited.push(number);
  }
  assert.deepEqual(visited, [1, 2, 3, 4, 5]);
  assert.equal(content.steps[3 + 1].id, "publish-service");
  assert.equal(content.steps[number - 1].percentage, 100);
  assert(content.steps[number - 1].actions.some(action => action.kind === "finish"));
  while (content.steps[number - 1].actions.some(action => action.kind === "previous")) number--;
  assert.equal(number, 1);
  assert.equal(content.steps[5 - 2].id, "fill-information");
  assert(page.includes('navigate(number + (action.kind === "previous" ? -1 : 1))'));
  assert(page.includes('action.kind === "finish" ? setFinished(true)'));
  assert(page.includes("const icons = [MonitorCog, KeyRound, ScanSearch, FilePlusCorner, Rocket]"));
});

const returnReader = page.match(/function readReturnHref\(\) \{[\s\S]*?\n\}/)[0];
function readReturnHref(search) {
  return runInNewContext(`${returnReader}\nreadReturnHref()`, { URLSearchParams, window: { location: { search } } });
}

test("entry links declare their origin and return to existing routes", () => {
  const explore = readFileSync(new URL("../src/content/pages/explorar-por-etapas.ts", import.meta.url), "utf8");
  const form = readFileSync(new URL("../src/pages/FormularioCartaPage.tsx", import.meta.url), "utf8");
  assert(explore.includes('href: "/tutorial-paraiba-digital?etapa=1&origem=etapas"'));
  assert(form.includes('href="/tutorial-paraiba-digital?etapa=1&origem=guia"'));
  assert.equal(readReturnHref("?etapa=1&origem=etapas"), "/explorar-por-etapas");
  assert.equal(readReturnHref("?etapa=1&origem=guia"), "/formulario-carta");
  assert(page.includes('href={returnHref} variant="secondary"'));
});

test("step navigation preserves origin and return destination after reload", () => {
  const navigate = page.match(/  function navigate\(next: number\) \{[\s\S]*?\n  \}/)[0].replace("next: number", "next");
  for (const origin of ["etapas", "guia"]) {
    let href = `https://example.test/tutorial-paraiba-digital?etapa=1&origem=${origin}`;
    let number = 1;
    const context = {
      URL, number, explicitChange: { current: false },
      window: {
        location: { href },
        history: { pushState: (_state, _title, url) => { href = String(url); context.window.location.href = href; } },
      },
      setFinished: () => {},
      setNumber: value => { number = value; context.number = value; },
    };
    for (const next of [2, 3, 4, 5, 4, 3, 2, 1]) {
      runInNewContext(`${navigate}\nnavigate(${next})`, context);
      const search = new URL(href).search;
      assert.equal(new URLSearchParams(search).get("origem"), origin);
      assert.equal(readStep(search), next);
      assert.equal(number, next);
      assert.equal(readReturnHref(search), origin === "guia" ? "/formulario-carta" : "/explorar-por-etapas");
    }
  }
});

test("direct access and unknown origins safely return to explore", () => {
  for (const search of ["", "?etapa=3", "?etapa=2&origem=", "?etapa=5&origem=unknown"]) {
    assert.equal(readReturnHref(search), "/explorar-por-etapas");
  }
});

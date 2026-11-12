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

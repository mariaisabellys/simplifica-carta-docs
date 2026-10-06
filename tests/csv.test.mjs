import assert from "node:assert/strict";
import { test } from "node:test";
import { criarCsv } from "../src/lib/csv.ts";

test("isolates embedded delimiters and record breaks without changing source", () => {
  const rows = Object.freeze([
    Object.freeze(["campo", "valor"]),
    Object.freeze(["descricao", 'Órgão, ação "citada"\rCR\nLF\r\nCRLF']),
    Object.freeze(["custo", "0"]),
    Object.freeze(["opcional", ""]),
  ]);
  assert.equal(criarCsv(rows),
    '"campo","valor"\r\n' +
    '"descricao","Órgão, ação ""citada""\rCR\nLF\r\nCRLF"\r\n' +
    '"custo","0"\r\n"opcional",""\r\n');
  assert.equal(rows[1][1], 'Órgão, ação "citada"\rCR\nLF\r\nCRLF');
});

test("keeps a quote and comma payload inside one value", () => {
  assert.equal(criarCsv([["descricao", '\",\"=1+1\r\npróxima']]),
    '"descricao",""",""=1+1\r\npróxima"\r\n');
});

test("does not add a BOM, formula prefix or phantom record", () => {
  assert.equal(criarCsv([]), "");
  assert.equal(criarCsv([["campo", "valor"], ["nome", "=1+1"]]),
    '"campo","valor"\r\n"nome","=1+1"\r\n');
});

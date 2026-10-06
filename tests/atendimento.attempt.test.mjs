import assert from "node:assert/strict";
import { test } from "node:test";
import { createAttempt } from "../src/features/atendimento/atendimento.attempt.ts";

const fields = () => ({
  nome: " Nome sintético ", orgao: "Órgão", setor: "Setor",
  emailInstitucional: "teste@example.test", telefone: "+55 (00) 0000-0000",
  assunto: 'Dúvida 🚀\r\n<script>literal</script>', horarioId: "slot-sintetico",
});

test("uses 32 cryptographic bytes and one timestamp for the operation key", (t) => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "crypto");
  Object.defineProperty(globalThis, "crypto", { configurable: true, value: {
    getRandomValues(bytes) {
      assert.ok(bytes instanceof Uint8Array);
      assert.equal(bytes.length, 32);
      bytes.set(Array.from({ length: 32 }, (_, index) => index));
      return bytes;
    },
  } });
  t.after(() => {
    if (descriptor) Object.defineProperty(globalThis, "crypto", descriptor);
    else delete globalThis.crypto;
  });
  t.mock.method(Date, "now", () => 1234567890);
  const attempt = createAttempt(fields());
  assert.equal(attempt.createdAt, 1234567890);
  assert.equal(attempt.key, `v1.1234567890.${Array.from({ length: 32 }, (_, i) => i.toString(16).padStart(2, "0")).join("")}`);
});

test("captures immutable original strings independently of later form edits", () => {
  const input = fields();
  const original = { ...input };
  const attempt = createAttempt(input);
  input.assunto = "Editado";
  input.horarioId = "outro";
  assert.deepEqual(attempt.payload, original);
  assert.notEqual(attempt.payload, input);
  assert.throws(() => { attempt.payload.assunto = "alterado"; }, TypeError);
  assert.throws(() => { attempt.key = "outra"; }, TypeError);
});

test("excludes unrelated session fields from the captured payload", () => {
  const attempt = createAttempt({ ...fields(), carta: { texto: "privado" }, diagnostico: "privado", data: "legada" });
  assert.deepEqual(Object.keys(attempt.payload).sort(), Object.keys(fields()).sort());
});

test("fails without a cryptographic generator instead of using weak fallback", (t) => {
  t.mock.method(globalThis.crypto, "getRandomValues", () => { throw new Error("unavailable"); });
  assert.throws(() => createAttempt(fields()), /unavailable/);
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { criarMailto } from "../src/lib/mailto.ts";

test("encodes each component once and preserves plus, accents and delimiters", () => {
  const address = "orientacao+teste@example.test";
  const subject = "Dúvida 🚀 + & ? # % ' ! ( ) * sobre serviços";
  const uri = criarMailto(address, subject);
  const [recipient, query] = uri.slice("mailto:".length).split("?");
  assert.equal(decodeURIComponent(recipient), address);
  assert.equal(query.split("&").length, 1);
  assert.ok(query.startsWith("subject="));
  assert.equal(decodeURIComponent(query.slice("subject=".length)), subject);
  assert.ok(recipient.includes("%2B"));
  assert.ok(query.includes("%20"));
  assert.ok(query.includes("%25"));
  assert.ok(query.includes("%27"));
});

test("subject cannot introduce body, cc, bcc or another URI header", () => {
  const subject = "&body=privado&cc=outro@example.test&bcc=outro@example.test";
  const uri = criarMailto("teste@example.test", subject);
  const params = new URL(uri).searchParams;
  assert.deepEqual([...params.keys()], ["subject"]);
  assert.equal(params.get("subject"), subject);
});

test("rejects addresses outside the documented single ASCII mailbox scope", () => {
  for (const address of [
    "mailto:teste@example.test", "Nome <teste@example.test>",
    "a@example.test,b@example.test", "a@example.test?bcc=b@example.test",
    '"teste"@example.test', "ação@example.test", " teste@example.test",
    "teste@example.test\n", "teste@example.test\r\nBcc: b@example.test",
    "teste@example", "teste@example.test\0",
  ]) {
    assert.throws(() => criarMailto(address, "Dúvida"), /invalid-contact-configuration/);
  }
});

test("rejects line breaks and NUL in subject", () => {
  for (const subject of ["Dúvida\nBcc: teste", "Dúvida\rteste", "Dúvida\0teste"]) {
    assert.throws(() => criarMailto("teste@example.test", subject), /invalid-subject-configuration/);
  }
});

test("returns a URI without requiring a browser or opening an application", () => {
  assert.equal(criarMailto("teste@example.test", ""), "mailto:teste@example.test?subject=");
});

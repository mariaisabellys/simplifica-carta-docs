import assert from "node:assert/strict";
import { test } from "node:test";
import { registerHooks } from "node:module";
import { resolveSupportPresentation } from "../src/content/support/apresentacao.ts";

// The app uses bundler-style extensionless imports. Resolve them for Node tests.
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    try { return nextResolve(specifier, context); }
    catch (error) {
      if (error.code === "ERR_MODULE_NOT_FOUND" && specifier.startsWith(".") &&
          !/\.[a-z]+$/i.test(specifier)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});
const { supportChannels, supportDestinations } = await import("../src/content/support/canais.ts");
const { supportContacts } = await import("../src/content/support/contatos.ts");
const { getHelpChannelsContent } = await import("../src/content/ajuda/canais.ts");
const { emailSupportContent } = await import("../src/content/ajuda/suporte-email.ts");
const { helpPageContent } = await import("../src/content/pages/ajuda.ts");
const { scheduledServiceContent } = await import("../src/content/ajuda/atendimento-agendado.ts");
hooks.deregister();

const state = status => status === "ativo" ? { status } : { status, notice: `Aviso ${status}` };
const fixture = (appointment, email) => ({
  channels: { "atendimento-agendado": state(appointment), "suporte-email": state(email) },
  destinations: { "atendimento-agendado": "/agenda-teste", "suporte-email": "/email-teste" },
  email: "apoio@example.test",
});

for (const appointment of ["ativo", "pendente", "pausado"]) {
  for (const email of ["ativo", "pendente", "pausado"]) {
    test(`presentation ${appointment}/${email} in both route contexts`, () => {
      const input = fixture(appointment, email);
      const before = structuredClone(input);
      for (const context of ["atendimento-agendado", "suporte-email"]) {
        const result = resolveSupportPresentation(input, context);
        assert.equal(result.faqSupport.action.href, "/agenda-teste");
        assert.equal(result.faqSupport.action.label, appointment === "ativo"
          ? "Consultar atendimento ->" : "Ver canais de apoio ->");
        if (appointment === "ativo") {
          assert.equal(result.appointment.action.kind,
            context === "atendimento-agendado" ? "open-calendar" : "navigate");
          if (context === "atendimento-agendado") assert.equal(result.appointment.action.href, undefined);
          else assert.equal(result.appointment.action.href, "/agenda-teste");
        } else {
          assert.equal(result.appointment.action, null);
          assert.equal(result.faqSupport.notice, `Aviso ${appointment}`);
        }
        assert.equal(result.email.address, input.email);
        if (email === "ativo") {
          assert.deepEqual(result.email.action, { kind: "copy-email", label: "Copie o e-mail", value: input.email });
          assert.ok(result.email.copyInstruction);
        } else {
          assert.equal(result.email.action, null);
          assert.equal(result.email.copyInstruction, null);
          assert.match(result.email.addressLabel, /referência/);
        }
        assert.equal(Boolean(result.unavailableNotice), appointment !== "ativo" && email !== "ativo");
        assert.deepEqual(result.returns.map(item => item.href), ["/ajuda", "/formulario-carta"]);
      }
      assert.deepEqual(input, before);
    });
  }
}

test("missing/invalid state fails conservatively without active action", () => {
  for (const invalid of [null, undefined, {}, { status: "desconhecido" }, { status: "pausado", notice: " " }]) {
    const input = fixture("ativo", "ativo");
    input.channels = { "atendimento-agendado": invalid, "suporte-email": invalid };
    const result = resolveSupportPresentation(input, "atendimento-agendado");
    assert.equal(result.appointment.action, null);
    assert.equal(result.email.action, null);
    assert.ok(result.unavailableNotice);
  }
});

test("current content consumes the canonical state, address and destinations", () => {
  assert.equal(supportChannels["atendimento-agendado"].status, "pendente");
  assert.equal(supportChannels["suporte-email"].status, "ativo");
  assert.equal(helpPageContent.faq.items.length, 4);
  assert.equal(helpPageContent.support.title, "Consulte os canais de apoio");
  assert.equal(helpPageContent.support.action.label, "Ver canais de apoio ->");
  assert.equal(helpPageContent.support.action.href, supportDestinations["atendimento-agendado"]);
  assert.equal(helpPageContent.support.notice, supportChannels["atendimento-agendado"].notice);
  const cards = getHelpChannelsContent("atendimento-agendado").channels;
  assert.equal(cards[0].action, null);
  assert.equal(cards[1].action.value, supportContacts.gesed.email);
  assert.equal(emailSupportContent.copyAction.value, cards[1].action.value);
  assert.equal(emailSupportContent.copyAction.label, cards[1].action.label);
  assert.deepEqual(scheduledServiceContent.entry.channels, cards);
  assert.notEqual(scheduledServiceContent.calendar.emptyMessage, scheduledServiceContent.calendar.failureMessage);
  assert.equal(scheduledServiceContent.calendar.backAction.kind, "back-to-channels");
});

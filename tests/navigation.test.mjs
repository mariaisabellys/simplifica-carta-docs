import assert from "node:assert/strict";
import { test } from "node:test";
import { shouldHandleInternalLink } from "../src/lib/navigation.ts";

function setup(t) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    location: { href: "https://app.example.test/ajuda", origin: "https://app.example.test" },
  } });
  t.after(() => {
    if (descriptor) Object.defineProperty(globalThis, "window", descriptor);
    else delete globalThis.window;
  });
}
function event(overrides = {}, anchor = {}) {
  return {
    defaultPrevented: false, button: 0, metaKey: false, ctrlKey: false,
    shiftKey: false, altKey: false,
    currentTarget: { href: "https://app.example.test/formulario-carta", target: "",
      hasAttribute: () => false, ...anchor }, ...overrides,
  };
}
test("handles primary same-origin links with native href retained", (t) => {
  setup(t);
  assert.equal(shouldHandleInternalLink(event()), true);
  assert.equal(shouldHandleInternalLink(event({}, { target: "_self" })), true);
});
test("preserves modified, middle and already handled clicks", (t) => {
  setup(t);
  for (const key of ["metaKey", "ctrlKey", "shiftKey", "altKey", "defaultPrevented"]) {
    assert.equal(shouldHandleInternalLink(event({ [key]: true })), false);
  }
  for (const button of [1, 2]) assert.equal(shouldHandleInternalLink(event({ button })), false);
});
test("preserves download and named or new browsing contexts", (t) => {
  setup(t);
  assert.equal(shouldHandleInternalLink(event({}, { hasAttribute: (name) => name === "download" })), false);
  for (const target of ["_blank", "_parent", "_top", "janela"]) {
    assert.equal(shouldHandleInternalLink(event({}, { target })), false);
  }
});
test("preserves external, mailto and invalid destinations", (t) => {
  setup(t);
  for (const href of ["https://other.example.test/", "http://app.example.test/", "mailto:teste@example.test", "javascript:void(0)", "http://["]) {
    assert.equal(shouldHandleInternalLink(event({}, { href })), false);
  }
});

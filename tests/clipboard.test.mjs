import assert from "node:assert/strict";
import { test } from "node:test";
import { copiarTexto } from "../src/lib/clipboard.ts";

function browser(t, secure, clipboard) {
  for (const [key, value] of Object.entries({
    window: { isSecureContext: secure },
    navigator: { clipboard },
  })) {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value });
    t.after(() => {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    });
  }
}

test("passes the original string immediately with the clipboard receiver", async (t) => {
  const value = '=ação 🚀\r\nlinha\rfinal\n<script>"literal"</script>';
  let written;
  const clipboard = {
    writeText(text) {
      assert.equal(this, clipboard);
      written = text;
      return Promise.resolve();
    },
  };
  browser(t, true, clipboard);
  const result = copiarTexto(value);
  assert.equal(written, value);
  assert.deepEqual(await result, { status: "success" });
});

test("confirms success only after the write resolves", async (t) => {
  let resolveWrite;
  browser(t, true, { writeText: () => new Promise((resolve) => { resolveWrite = resolve; }) });
  let settled = false;
  const result = copiarTexto("texto").then((value) => { settled = true; return value; });
  await Promise.resolve();
  assert.equal(settled, false);
  resolveWrite();
  assert.deepEqual(await result, { status: "success" });
});

test("does not write in an insecure context", async (t) => {
  let writes = 0;
  browser(t, false, { writeText() { writes += 1; } });
  assert.deepEqual(await copiarTexto("texto"), { status: "failed", reason: "unavailable" });
  assert.equal(writes, 0);
});

test("returns unavailable for absent API or write method", async (t) => {
  browser(t, true, undefined);
  assert.deepEqual(await copiarTexto("texto"), { status: "failed", reason: "unavailable" });
  navigator.clipboard = {};
  assert.deepEqual(await copiarTexto("texto"), { status: "failed", reason: "unavailable" });
});

test("handles denied writes and allows a subsequent attempt", async (t) => {
  let writes = 0;
  browser(t, true, {
    writeText() {
      writes += 1;
      return writes === 1 ? Promise.reject(new Error("denied")) : Promise.resolve();
    },
  });
  assert.deepEqual(await copiarTexto("texto"), { status: "failed", reason: "write-failed" });
  assert.deepEqual(await copiarTexto("texto"), { status: "success" });
  assert.equal(writes, 2);
});

test("handles synchronous API errors without rejecting", async (t) => {
  browser(t, true, { writeText() { throw new Error("failed"); } });
  assert.deepEqual(await copiarTexto("texto"), { status: "failed", reason: "write-failed" });
  Object.defineProperty(navigator, "clipboard", { get() { throw new Error("blocked"); } });
  assert.deepEqual(await copiarTexto("texto"), { status: "failed", reason: "write-failed" });
});

test("returns unavailable outside a browser", async (t) => {
  browser(t, true, {});
  delete globalThis.window;
  assert.deepEqual(await copiarTexto("texto"), { status: "failed", reason: "unavailable" });
});

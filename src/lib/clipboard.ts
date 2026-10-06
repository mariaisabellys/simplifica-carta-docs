export type CopyResult =
  | { status: "success" }
  | { status: "failed"; reason: "unavailable" | "write-failed" };

export async function copiarTexto(text: string): Promise<CopyResult> {
  try {
    if (
      typeof window === "undefined" ||
      !window.isSecureContext ||
      typeof navigator === "undefined" ||
      typeof navigator.clipboard?.writeText !== "function"
    ) {
      return { status: "failed", reason: "unavailable" };
    }

    await navigator.clipboard.writeText(text);
    return { status: "success" };
  } catch {
    return { status: "failed", reason: "write-failed" };
  }
}

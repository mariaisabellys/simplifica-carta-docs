import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { CartaServico } from "./carta.types";
import { carregarCartaDaSessaoComStatus, salvarCartaNaSessao, type CartaLoadResult } from "./carta.storage";
import { validarCartaObrigatoria, type ValidacaoCarta } from "./carta.validation";

export type CartaStorageMode = "session" | "memory-only" | "replacement-required";
export type CartaReview = { revision: number; status: "complete" | "incomplete" | "failed"; issues: readonly ValidacaoCarta[] };

type CartaSessionValue = {
  carta: CartaServico;
  revision: number;
  storageMode: CartaStorageMode;
  loadStatus: CartaLoadResult["status"];
  review: CartaReview | null;
  updateCarta: (mutate: (next: CartaServico) => void | CartaServico) => void;
  reviewCarta: () => CartaReview;
  replaceStoredCarta: () => boolean;
};

const CartaSessionContext = createContext<CartaSessionValue | null>(null);

function initialSession() {
  const result = carregarCartaDaSessaoComStatus();
  const storageMode: CartaStorageMode = result.status === "invalid" || result.status === "unsupported"
    ? "replacement-required"
    : result.status === "unavailable" ? "memory-only" : "session";
  return { result, storageMode };
}

export function CartaSessionProvider({ children }: { children: ReactNode }) {
  const initial = useRef<ReturnType<typeof initialSession> | null>(null);
  if (!initial.current) initial.current = initialSession();
  const [carta, setCarta] = useState(initial.current.result.carta);
  const [revision, setRevision] = useState(0);
  const [storageMode, setStorageMode] = useState<CartaStorageMode>(initial.current.storageMode);
  const [review, setReview] = useState<CartaReview | null>(null);
  useEffect(() => {
    if (revision === 0) return;
    if (storageMode !== "session") return;
    if (!salvarCartaNaSessao(carta)) setStorageMode("memory-only");
  }, [carta, revision, storageMode]);

  const updateCarta = useCallback((mutate: (next: CartaServico) => void | CartaServico) => {
    setCarta((current) => {
      const next = structuredClone(current);
      return mutate(next) ?? next;
    });
    setRevision((current) => current + 1);
  }, []);

  const reviewCarta = useCallback(() => {
    try {
      const issues = validarCartaObrigatoria(carta);
      const result: CartaReview = { revision, status: issues.length ? "incomplete" : "complete", issues };
      setReview(result);
      return result;
    } catch {
      const result: CartaReview = { revision, status: "failed", issues: [] };
      setReview(result);
      return result;
    }
  }, [carta, revision]);

  const replaceStoredCarta = useCallback(() => {
    const saved = salvarCartaNaSessao(carta);
    setStorageMode(saved ? "session" : "memory-only");
    return saved;
  }, [carta]);

  const value = useMemo<CartaSessionValue>(() => ({
    carta, revision, storageMode, loadStatus: initial.current!.result.status,
    review, updateCarta, reviewCarta, replaceStoredCarta,
  }), [carta, revision, storageMode, review, updateCarta, reviewCarta, replaceStoredCarta]);

  return <CartaSessionContext.Provider value={value}>{children}</CartaSessionContext.Provider>;
}

export function useCartaSession(): CartaSessionValue {
  const value = useContext(CartaSessionContext);
  if (!value) throw new Error("useCartaSession deve ser usado dentro de CartaSessionProvider");
  return value;
}

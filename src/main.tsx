import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { CartaSessionProvider } from "./features/carta/CartaSessionProvider";
import "./styles/globals.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <CartaSessionProvider>
      <App />
    </CartaSessionProvider>
  </StrictMode>,
);

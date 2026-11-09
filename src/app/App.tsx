import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { findRoute, routes } from "./routes";

function normalizePath(pathname: string) {
  return pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
}

export function App() {
  const [location, setLocation] = useState(() => ({
    pathname: normalizePath(window.location.pathname),
    hash: window.location.hash,
  }));

  useEffect(() => {
    const handleLocation = () => setLocation({ pathname: normalizePath(window.location.pathname), hash: window.location.hash });
    window.addEventListener("popstate", handleLocation);
    window.addEventListener("hashchange", handleLocation);
    return () => {
      window.removeEventListener("popstate", handleLocation);
      window.removeEventListener("hashchange", handleLocation);
    };
  }, []);

  const route = useMemo(() => findRoute(location.pathname), [location.pathname]);

  function navigate(nextPath: string) {
    const next = new URL(nextPath, window.location.origin);
    if (next.pathname === location.pathname && next.hash === location.hash) {
      return;
    }

    window.history.pushState(null, "", `${next.pathname}${next.search}${next.hash}`);
    setLocation({ pathname: normalizePath(next.pathname), hash: next.hash });
    window.scrollTo({ top: 0 });
    if (next.hash) {
      window.requestAnimationFrame(() => document.getElementById(next.hash.slice(1))?.scrollIntoView());
    }
  }

  const CurrentPage = route.Component;

  return (
    <AppShell currentPath={route.path} onNavigate={navigate} routes={routes}>
      <CurrentPage />
    </AppShell>
  );
}

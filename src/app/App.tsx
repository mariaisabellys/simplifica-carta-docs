import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { findRoute, routes } from "./routes";

function normalizePath(pathname: string) {
  return pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
}

export function App() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => setPathname(normalizePath(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const route = useMemo(() => findRoute(pathname), [pathname]);

  function navigate(nextPath: string) {
    if (nextPath === pathname) {
      return;
    }

    window.history.pushState(null, "", nextPath);
    setPathname(nextPath);
    window.scrollTo({ top: 0 });
  }

  const CurrentPage = route.Component;

  return (
    <AppShell currentPath={route.path} onNavigate={navigate} routes={routes}>
      <CurrentPage />
    </AppShell>
  );
}

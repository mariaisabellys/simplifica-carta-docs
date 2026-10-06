import type { ReactNode } from "react";
import type { AppRoute } from "../../app/routes";
import { shouldHandleInternalLink } from "../../lib/navigation";

type AppShellProps = {
  children: ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  routes: AppRoute[];
};

export function AppShell({ children, currentPath, onNavigate, routes }: AppShellProps) {
  const navRoutes = routes.filter((route) => route.showInNav);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="/" onClick={(event) => handleNav(event, "/", onNavigate)}>
          <span className="brand-mark" aria-hidden="true">
            SC
          </span>
          <span>
            <strong>Simplifica Carta</strong>
            <small>Manual de Levantamento de Servicos</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Navegacao principal">
          {navRoutes.map((route) => (
            <a
              aria-current={route.path === currentPath ? "page" : undefined}
              href={route.path}
              key={route.path}
              onClick={(event) => handleNav(event, route.path, onNavigate)}
            >
              {route.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <span>Gerencia Executiva de Servicos Digitais</span>
        <span>Preparacao para cadastro manual no Paraiba Digital</span>
      </footer>
    </div>
  );
}

function handleNav(
  event: React.MouseEvent<HTMLAnchorElement>,
  path: string,
  onNavigate: (path: string) => void,
) {
  if (!shouldHandleInternalLink(event)) return;
  event.preventDefault();
  onNavigate(path);
}

import type { ReactNode } from "react";
import type { AppRoute } from "../../app/routes";
import { Brand } from "./Brand";
import { MainNavigation } from "./MainNavigation";
import { SiteFooter } from "./SiteFooter";

type AppShellProps = {
  children: ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  routes: AppRoute[];
};

export function AppShell({ children, currentPath, onNavigate, routes }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <Brand onNavigate={onNavigate} />
        <MainNavigation currentPath={currentPath} onNavigate={onNavigate} />
      </header>

      <main className="site-main">{children}</main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}

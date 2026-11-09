import { useState } from "react";
import { mainNavigation } from "../../content/navigation";
import { shouldHandleInternalLink } from "../../lib/navigation";

type MainNavigationProps = {
  currentPath: string;
  onNavigate: (path: string) => void;
};

export function MainNavigation({ currentPath, onNavigate }: MainNavigationProps) {
  const [open, setOpen] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!shouldHandleInternalLink(event)) return;
    event.preventDefault();
    setOpen(false);
    onNavigate(href);
  }

  return (
    <div className="main-navigation">
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="main-navigation-list"
        onClick={() => setOpen((current) => !current)}
      >
        <span aria-hidden="true">☰</span>
        <span>Menu</span>
      </button>
      <nav id="main-navigation-list" className={open ? "site-nav site-nav--open" : "site-nav"} aria-label="Navegação principal">
        {mainNavigation.map((item) => {
          const itemPath = item.href.split("#")[0];
          const active = itemPath === "/" ? currentPath === "/" : currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);
          return (
            <a
              aria-current={active ? "page" : undefined}
              className={item.kind === "help" ? "site-nav__help" : undefined}
              href={item.href}
              key={item.href}
              onClick={(event) => handleClick(event, item.href)}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}

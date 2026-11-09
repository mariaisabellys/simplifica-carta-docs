type BrandProps = {
  onNavigate?: (path: string) => void;
};

export function Brand({ onNavigate }: BrandProps) {
  return (
    <a
      className="brand"
      href="/"
      onClick={(event) => {
        if (!onNavigate || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onNavigate("/");
      }}
    >
      <span className="brand-name">Simplifica <span>Carta</span></span>
      <span className="brand-divider" aria-hidden="true" />
      <span className="brand-subtitle">Guia de Serviços</span>
    </a>
  );
}

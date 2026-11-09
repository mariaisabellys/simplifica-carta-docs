import { footerQuickLinks, footerSupportLinks } from "../../content/navigation";
import { shouldHandleInternalLink } from "../../lib/navigation";

type SiteFooterProps = { onNavigate: (path: string) => void };

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  const year = new Date().getFullYear();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!shouldHandleInternalLink(event)) return;
    event.preventDefault();
    onNavigate(href);
  }

  return (
    <footer className="site-footer site-footer--expanded">
      <div className="site-footer__grid">
        <div>
          <h2>Acesso rápido</h2>
          <ul>{footerQuickLinks.map((item) => <li key={item.href}><a href={item.href} onClick={(event) => handleClick(event, item.href)}>{item.label}</a></li>)}</ul>
        </div>
        <div>
          <h2>Recursos e apoio</h2>
          <ul>{footerSupportLinks.map((item) => <li key={item.href}><a href={item.href} onClick={(event) => handleClick(event, item.href)}>{item.label}</a></li>)}</ul>
        </div>
        <div className="site-footer__description">
          <strong>Simplifica <span>Carta</span></strong>
          <p>O manual completo e interativo para auxiliar órgãos e servidores públicos na elaboração, validação e publicação de Cartas de Serviços.</p>
        </div>
        <div className="site-footer__address">
          <strong>SEMTD</strong>
          <p>Centro Administrativo da Paraíba<br />Avenida João da Mata, 200 — Jaguaribe<br />João Pessoa/PB — CEP 58015-020</p>
        </div>
      </div>
      <div className="site-footer__bottom">© {year} Simplifica Carta. Desenvolvido para servidores públicos.</div>
    </footer>
  );
}

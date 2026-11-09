type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "secondary-inverse" | "outline-navy" | "step";
  icon?: string;
};

export function ButtonLink({ children, href, variant = "primary", icon }: ButtonLinkProps) {
  return (
    <a className={`button-link button-link--${variant}`} href={href}>
      {icon ? <img src={icon} alt="" aria-hidden="true" /> : null}
      {children}
    </a>
  );
}

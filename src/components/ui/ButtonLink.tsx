type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "secondary-inverse" | "outline-navy" | "step";
  icon?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

export function ButtonLink({ children, href, variant = "primary", icon, iconLeft, iconRight }: ButtonLinkProps) {
  return (
    <a className={`button-link button-link--${variant}`} href={href}>
      {icon ? <img src={icon} alt="" aria-hidden="true" /> : null}
      {iconLeft}
      {children}
      {iconRight}
    </a>
  );
}

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({ children, href, variant = "primary" }: ButtonLinkProps) {
  return (
    <a className={`button-link button-link--${variant}`} href={href}>
      {children}
    </a>
  );
}

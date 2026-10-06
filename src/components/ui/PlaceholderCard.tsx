type PlaceholderCardProps = {
  title: string;
  children?: React.ReactNode;
};

export function PlaceholderCard({ children, title }: PlaceholderCardProps) {
  return (
    <section className="placeholder-card">
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </section>
  );
}

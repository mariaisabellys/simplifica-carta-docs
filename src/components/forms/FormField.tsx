type FormFieldProps = {
  id: string;
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
  requiredLabel?: string;
};

export function FormField({
  children,
  hint,
  id,
  label,
  required = false,
  requiredLabel = "Necessario",
}: FormFieldProps) {
  return (
    <div className="form-field">
      <div className="form-label-row" data-figma-node-id="651:317">
        <label htmlFor={id}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
        {required ? <span className="required-badge">{requiredLabel}</span> : null}
      </div>
      {children}
      {hint ? <small>{hint}</small> : null}
    </div>
  );
}

export function criarMailto(endereco: string, assunto: string): string {
  if (!/^[A-Za-z0-9._+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(endereco)) {
    throw new Error("invalid-contact-configuration");
  }
  if (/[\r\n\u0000]/.test(assunto)) {
    throw new Error("invalid-subject-configuration");
  }

  const encode = (value: string) =>
    encodeURIComponent(value).replace(
      /[!'()*]/g,
      (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
    );
  const [local, domain] = endereco.split("@");
  return `mailto:${encode(local)}@${domain}?subject=${encode(assunto)}`;
}

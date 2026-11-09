import type { NavigationItem } from "../types/content";

export const mainNavigation: NavigationItem[] = [
  { label: "Início", href: "/" },
  { label: "O que é a Carta?", href: "/o-que-e-carta-de-servicos" },
  { label: "Dúvidas frequentes", href: "/ajuda#duvidas-frequentes" },
  { label: "Preciso de ajuda", href: "/ajuda", kind: "help" },
];

export const footerQuickLinks: NavigationItem[] = [
  { label: "Início", href: "/" },
  { label: "O que é a Carta?", href: "/o-que-e-carta-de-servicos" },
  { label: "Guia passo a passo", href: "/tutorial-paraiba-digital" },
  { label: "Explorar etapas", href: "/explorar-por-etapas" },
];

export const footerSupportLinks: NavigationItem[] = [
  { label: "Dúvidas frequentes", href: "/ajuda#duvidas-frequentes" },
  { label: "Preciso de ajuda", href: "/ajuda", kind: "help" },
];

import type { ComponentType } from "react";
import { AjudaPage } from "../pages/AjudaPage";
import { AtendimentoAgendadoPage } from "../pages/AtendimentoAgendadoPage";
import { DiagnosticoPage } from "../pages/DiagnosticoPage";
import { FormularioCartaPage } from "../pages/FormularioCartaPage";
import { HomePage } from "../pages/HomePage";
import { OQueECartaPage } from "../pages/OQueECartaPage";
import { OrganizarInformacoesPage } from "../pages/OrganizarInformacoesPage";
import { PreviaCartaPage } from "../pages/PreviaCartaPage";
import { ResultadoDiagnosticoPage } from "../pages/ResultadoDiagnosticoPage";
import { SuporteEmailPage } from "../pages/SuporteEmailPage";
import { TutorialParaibaDigitalPage } from "../pages/TutorialParaibaDigitalPage";

export type AppRoute = {
  path: string;
  label: string;
  Component: ComponentType;
  showInNav?: boolean;
  figmaNodeId?: string;
  specId?: string;
  layoutType?: "page" | "section" | "support";
};

export const routes: AppRoute[] = [
  {
    path: "/",
    label: "Inicio",
    Component: HomePage,
    showInNav: true,
    figmaNodeId: "310:175",
    specId: "002-home-e-navegacao",
    layoutType: "page",
  },
  {
    path: "/o-que-e-carta-de-servicos",
    label: "Carta de Servicos",
    Component: OQueECartaPage,
    showInNav: true,
    figmaNodeId: "365:265",
    specId: "004-o-que-e-carta-servico",
    layoutType: "section",
  },
  {
    path: "/diagnostico",
    label: "Diagnostico",
    Component: DiagnosticoPage,
    showInNav: true,
    figmaNodeId: "387:1020",
    specId: "005-diagnostico-servico-publico",
    layoutType: "section",
  },
  {
    path: "/diagnostico/resultado",
    label: "Resultado",
    Component: ResultadoDiagnosticoPage,
    figmaNodeId: "387:1362",
    specId: "005-diagnostico-servico-publico",
    layoutType: "section",
  },
  {
    path: "/organizar-informacoes",
    label: "Organizar informacoes",
    Component: OrganizarInformacoesPage,
    showInNav: true,
    figmaNodeId: "387:1918",
    specId: "006-organizar-informacoes",
    layoutType: "section",
  },
  {
    path: "/formulario-carta",
    label: "Formulario",
    Component: FormularioCartaPage,
    showInNav: true,
    figmaNodeId: "653:1540",
    specId: "007-formulario-carta-servico",
    layoutType: "section",
  },
  {
    path: "/previa",
    label: "Previa",
    Component: PreviaCartaPage,
    figmaNodeId: "821:308",
    specId: "009-previa-html",
    layoutType: "section",
  },
  {
    path: "/tutorial-paraiba-digital",
    label: "Tutorial",
    Component: TutorialParaibaDigitalPage,
    showInNav: true,
    figmaNodeId: "564:635",
    specId: "011-tutorial-paraiba-digital",
    layoutType: "section",
  },
  {
    path: "/ajuda",
    label: "Ajuda",
    Component: AjudaPage,
    showInNav: true,
    figmaNodeId: "169:495",
    specId: "013-fluxo-de-ajuda",
    layoutType: "support",
  },
  {
    path: "/ajuda/atendimento-agendado",
    label: "Atendimento agendado",
    Component: AtendimentoAgendadoPage,
    figmaNodeId: "425:201",
    specId: "014-atendimento-agendado",
    layoutType: "support",
  },
  {
    path: "/ajuda/suporte-email",
    label: "Suporte por e-mail",
    Component: SuporteEmailPage,
    figmaNodeId: "425:201",
    specId: "015-suporte-email",
    layoutType: "support",
  },
];

export function findRoute(pathname: string): AppRoute {
  return routes.find((route) => route.path === pathname) ?? routes[0];
}

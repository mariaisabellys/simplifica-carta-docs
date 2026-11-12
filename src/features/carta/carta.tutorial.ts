import type { CartaServico } from "./carta.types";

export type TutorialField = { id: string; label: string; value: string; copyable: boolean };
export type TutorialGroup = { title: string; fields: TutorialField[] };

// Read-only projection: retained values of inapplicable fields never reach the UI.
export function projectCartaForTutorial(carta: CartaServico): TutorialGroup[] {
  const sobre = carta.sobreServico;
  const publico = carta.publicoRequisitos;
  const atendimento = carta.atendimento;
  const field = (id: string, label: string, value: string | null, copyable = true): TutorialField =>
    ({ id, label, value: value ?? "", copyable });
  const choices = (id: string, label: string, values: readonly string[]) => field(id, label, values.join(", "), false);
  const scheduled = atendimento.exigeAgendamento === true;
  const online = scheduled && atendimento.tiposAgendamento.includes("online");
  const external = online && atendimento.sistemaAgendamento === "sistema-externo";
  return [
    { title: "Sobre o serviço", fields: [
      field("service-name", "Nome do serviço", sobre.nome),
      field("popular-name", "Nome popular", sobre.nomePopular),
      field("service-description", "O que é este serviço", sobre.descricao),
      field("category", "Categoria", sobre.categoria, false),
      field("subcategory", "Subcategoria", sobre.subcategoria, false),
      field("topic", "Tópico", sobre.topico),
      field("active", "Ativo", sobre.ativo ? "Ativo" : "Inativo", false),
    ] },
    { title: "Público e requisitos", fields: [
      choices("specific-audience", "Público específico", publico.publicosEspecificos),
      choices("user-profile", "Perfil do usuário", publico.perfisUsuario),
      field("who-can-use", "Quem pode utilizar este serviço", publico.quemPodeUtilizar),
      ...publico.documentos.map((documento, index) => field(`document-${encodeURIComponent(documento.id)}`, `Documentação necessária — Documento ${index + 1}`, documento.nome)),
      ...(!publico.documentos.length ? [field("required-documents", "Documentação necessária", "Nenhum item informado", false)] : []),
      field("costs-and-fees", "Custos e taxas", publico.custo.tipo === "gratuito" ? "Gratuito" : publico.custo.tipo === "sob-consulta" ? "Sob consulta" : publico.custo.tipo === "com-taxa" ? "Com taxa" : null, false),
      ...(publico.custo.tipo === "com-taxa" || publico.custo.tipo === "sob-consulta" ? [field("cost-value-or-link", "Valor ou link da consulta", publico.custo.detalhe)] : []),
      field("maximum-deadline", "Prazo máximo", publico.prazo.maximo),
      field("deadline-type", "Tipo de prazo", publico.prazo.tipo, false),
    ] },
    { title: "Como o serviço funciona", fields: carta.etapas.length ? carta.etapas.flatMap((etapa, index) => [
      field(`step-${encodeURIComponent(etapa.id)}-title`, `Etapa ${index + 1}: título`, etapa.titulo),
      field(`step-${encodeURIComponent(etapa.id)}-guidance`, `Etapa ${index + 1}: orientação ao cidadão`, etapa.orientacaoCidadao),
      field(`step-${encodeURIComponent(etapa.id)}-modality`, `Etapa ${index + 1}: modalidade`, etapa.modalidade, false),
    ]) : [field("service-steps", "Etapas do serviço", "Nenhum item informado", false)] },
    { title: "Atendimento", fields: [
      field("requires-scheduling", "Necessita de agendamento?", atendimento.exigeAgendamento === null ? null : scheduled ? "Sim" : "Não", false),
      ...(scheduled ? [choices("scheduling-type", "Tipo de agendamento", atendimento.tiposAgendamento.map(tipo => tipo === "online" ? "Online" : "Presencial"))] : []),
      ...(online ? [field("scheduling-system", atendimento.sistemaAgendamento === "paraiba-digital" ? "Local do agendamento" : "Sistema de agendamento", atendimento.sistemaAgendamento === "paraiba-digital" ? "Na plataforma oficial, selecione “Interno” em Local do agendamento." : external ? "Selecione a opção “Externo” em Local do agendamento." : null, false)] : []),
      ...(external ? [
        field("scheduling-link", "Link/URL para agendamento", atendimento.linkAgendamento),
        field("scheduling-display", "Como o agendamento será exibido?", atendimento.exibicaoAgendamento === "nova-pagina" ? "Em Link do agendamento, selecione “Externo”. Essa opção direciona o cidadão para o site de agendamento fora do Paraíba Digital." : atendimento.exibicaoAgendamento === "dentro-paraiba-digital" ? "Em Link do agendamento, selecione “Integrado”. Assim, o site de agendamento será exibido dentro do próprio Paraíba Digital." : null, false),
      ] : []),
    ] },
    { title: "Informações finais", fields: [
      field("important-additional-information", "Outras informações", carta.informacoesFinais.informacoesAdicionais),
      field("keywords", "Palavras-chave", carta.informacoesFinais.palavrasChave),
    ] },
  ];
}


// Check before pagination hides empty conditional fields. The projection already
// excludes inapplicable scheduling/cost fields and normalizes null text values.
export function hasMissingTutorialInformation(carta: CartaServico): boolean {
  if (carta.atendimento.exigeAgendamento == null) return true;
  return projectCartaForTutorial(carta).some(group => group.fields.some(field =>
    field.id !== "active" && (
      field.id === "required-documents" ||
      field.id === "service-steps" ||
      !field.value.trim()
    )
  ));
}
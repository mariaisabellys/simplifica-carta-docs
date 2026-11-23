import { subcategoriasPorCategoria } from "./carta.catalogs.ts";
import type { CartaServico } from "./carta.types.ts";
import { significantCount } from "./carta.language.ts";

export type CharterPartId = "about-service" | "audience-requirements" | "service-flow" | "service-attendance" | "final-information";
export type ValidacaoCarta = { campo: string; mensagem: string; partId: CharterPartId; targetId: string; label: string };

const issue = (campo: string, mensagem: string, partId: CharterPartId, targetId: string, label: string): ValidacaoCarta =>
  ({ campo, mensagem, partId, targetId, label });

const required = (value: unknown) => typeof value === "string" ? !value.trim()
  : Array.isArray(value) ? value.length === 0
    : value === null || value === undefined;

export function validarCartaObrigatoria(carta: CartaServico): ValidacaoCarta[] {
  const errors: ValidacaoCarta[] = [];
  const addRequired = (value: unknown, campo: string, partId: CharterPartId, targetId: string, label: string) => {
    if (required(value)) errors.push(issue(campo, "Campo obrigatório para concluir a Carta.", partId, targetId, label));
  };

  addRequired(carta.sobreServico.nome, "sobreServico.nome", "about-service", "carta-service-name", "Nome do serviço");
  addRequired(carta.sobreServico.descricao, "sobreServico.descricao", "about-service", "carta-service-description", "O que é o serviço");
  addRequired(carta.sobreServico.categoria, "sobreServico.categoria", "about-service", "carta-category", "Categoria");
  addRequired(carta.sobreServico.subcategoria, "sobreServico.subcategoria", "about-service", "carta-subcategory", "Subcategoria");
  addRequired(carta.publicoRequisitos.perfisUsuario, "publicoRequisitos.perfisUsuario", "audience-requirements", "carta-user-profile", "Perfil do usuário");
  addRequired(carta.publicoRequisitos.quemPodeUtilizar, "publicoRequisitos.quemPodeUtilizar", "audience-requirements", "carta-who-can-use", "Quem pode utilizar");
  addRequired(carta.publicoRequisitos.custo.tipo, "publicoRequisitos.custo.tipo", "audience-requirements", "carta-costs", "Custos e taxas");
  addRequired(carta.publicoRequisitos.prazo.maximo, "publicoRequisitos.prazo.maximo", "audience-requirements", "carta-deadline", "Prazo máximo");
  addRequired(carta.publicoRequisitos.prazo.tipo, "publicoRequisitos.prazo.tipo", "audience-requirements", "carta-deadline-type", "Tipo de prazo");
  addRequired(carta.atendimento.exigeAgendamento, "atendimento.exigeAgendamento", "service-attendance", "carta-requires-scheduling", "Necessita de agendamento?");

  if (significantCount(carta.sobreServico.descricao) > 20) {
    errors.push(issue("sobreServico.descricao", "Use no máximo 20 palavras significativas na descrição inteira.", "about-service", "carta-service-description", "O que é o serviço"));
  }
  if (carta.publicoRequisitos.publicosEspecificos.length > 2) {
    errors.push(issue("publicoRequisitos.publicosEspecificos", "Selecione no máximo 2 grupos.", "audience-requirements", "carta-specific-audience", "Público específico"));
  }
  if (new Set(carta.publicoRequisitos.publicosEspecificos).size !== carta.publicoRequisitos.publicosEspecificos.length) {
    errors.push(issue("publicoRequisitos.publicosEspecificos", "Remova seleções duplicadas.", "audience-requirements", "carta-specific-audience", "Público específico"));
  }
  if (new Set(carta.publicoRequisitos.perfisUsuario).size !== carta.publicoRequisitos.perfisUsuario.length) {
    errors.push(issue("publicoRequisitos.perfisUsuario", "Remova seleções duplicadas.", "audience-requirements", "carta-user-profile", "Perfil do usuário"));
  }
  if (carta.sobreServico.categoria && carta.sobreServico.subcategoria
    && !subcategoriasPorCategoria[carta.sobreServico.categoria].includes(carta.sobreServico.subcategoria as never)) {
    errors.push(issue("sobreServico.subcategoria", "Selecione uma subcategoria da categoria escolhida.", "about-service", "carta-subcategory", "Subcategoria"));
  }

  carta.publicoRequisitos.documentos.forEach((document, index) => {
    if (!document.nome.trim()) errors.push(issue(`publicoRequisitos.documentos.${document.id}.nome`, "Informe o nome do documento ou remova o item.", "audience-requirements", `carta-document-${document.id}-name`, `Documento ${index + 1}`));
  });
  if (carta.publicoRequisitos.custo.tipo && carta.publicoRequisitos.custo.tipo !== "gratuito" && !carta.publicoRequisitos.custo.detalhe.trim()) {
    errors.push(issue("publicoRequisitos.custo.detalhe", "Informe o valor, uma orientação ou o link para consulta.", "audience-requirements", "carta-cost-detail", "Valor ou link para consulta"));
  }
  if (carta.publicoRequisitos.prazo.maximo.trim() && !/^[1-9]\d*$/.test(carta.publicoRequisitos.prazo.maximo.trim())) {
    errors.push(issue("publicoRequisitos.prazo.maximo", "Informe um inteiro positivo, sem sinal, decimal ou zeros à esquerda.", "audience-requirements", "carta-deadline", "Prazo máximo"));
  }

  if (!carta.etapas.length) {
    errors.push(issue("etapas", "Adicione ao menos uma etapa do serviço.", "service-flow", "carta-add-step", "Etapas do serviço"));
  }
  carta.etapas.forEach((step, index) => {
    if (!step.titulo.trim()) errors.push(issue(`etapas.${step.id}.titulo`, "Informe o título da etapa.", "service-flow", `carta-step-${step.id}-titulo`, `Etapa ${index + 1}: título`));
    if (!step.orientacaoCidadao.trim()) errors.push(issue(`etapas.${step.id}.orientacaoCidadao`, "Informe a orientação ao cidadão.", "service-flow", `carta-step-${step.id}-orientacaoCidadao`, `Etapa ${index + 1}: orientação`));
    if (!step.modalidade) errors.push(issue(`etapas.${step.id}.modalidade`, "Selecione a modalidade.", "service-flow", `carta-step-${step.id}-modalidade`, `Etapa ${index + 1}: modalidade`));
  });

  const scheduled = carta.atendimento.exigeAgendamento === true;
  const online = scheduled && carta.atendimento.tiposAgendamento.includes("online");
  const external = online && carta.atendimento.sistemaAgendamento === "sistema-externo";
  if (scheduled && carta.atendimento.tiposAgendamento.length === 0) {
    errors.push(issue("atendimento.tiposAgendamento", "Selecione ao menos um tipo de agendamento.", "service-attendance", "carta-scheduling-types", "Tipo de agendamento"));
  }
  if (online && carta.atendimento.sistemaAgendamento === null) {
    errors.push(issue("atendimento.sistemaAgendamento", "Selecione o sistema usado na parcela on-line.", "service-attendance", "carta-scheduling-system", "Sistema de agendamento"));
  }
  if (external && !carta.atendimento.linkAgendamento.trim()) {
    errors.push(issue("atendimento.linkAgendamento", "Informe o link do agendamento externo.", "service-attendance", "carta-scheduling-link", "Link do agendamento"));
  }
  if (external && carta.atendimento.exibicaoAgendamento === null) {
    errors.push(issue("atendimento.exibicaoAgendamento", "Selecione como o agendamento será exibido.", "service-attendance", "carta-scheduling-display", "Exibição do agendamento"));
  }
  if (external && carta.atendimento.linkAgendamento.trim() && !isSafeHttpUrl(carta.atendimento.linkAgendamento)) {
    errors.push(issue("atendimento.linkAgendamento", "Use um link absoluto HTTP(S), com domínio e sem credenciais.", "service-attendance", "carta-scheduling-link", "Link do agendamento"));
  }
  return errors;
}

export function contarPalavras(texto: string): number { return significantCount(texto); }

function isSafeHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol) && !!url.hostname && !url.username && !url.password;
  } catch { return false; }
}

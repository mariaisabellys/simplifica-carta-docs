import assert from "node:assert/strict";
import test from "node:test";
import { cartaPreviewDefinitionIds, cartaPreviewDomId, criarModeloPreviaCarta } from "../src/features/carta/carta.preview.ts";
import { criarCartaServicoInicial } from "../src/features/carta/carta.schema.ts";

const findField = (model, id) => model.sections.flatMap((section) => [...section.fields, ...(section.items ?? []).flatMap((item) => item.fields)]).find((entry) => entry.id === id);

test("PV01: schema inicial não cria Carta fictícia", () => {
  const carta = criarCartaServicoInicial();
  const model = criarModeloPreviaCarta(carta);
  assert.equal(model.hasContent, false);
  assert.equal(model.sections.length, 5);
});

test("PV02/PV12: seleção isolada cria conteúdo e expõe Inativo", () => {
  const carta = criarCartaServicoInicial();
  carta.sobreServico.categoria = "Justiça e Segurança";
  const model = criarModeloPreviaCarta(carta);
  assert.equal(model.hasContent, true);
  assert.deepEqual(findField(model, "active").value, { kind: "text", text: "Inativo" });
  assert.deepEqual(findField(model, "popular-name").value, { kind: "missing" });
});

test("contrato mantém exatamente 25 definições canônicas", () => {
  assert.equal(cartaPreviewDefinitionIds.length, 25);
  assert.equal(new Set(cartaPreviewDefinitionIds).size, 25);
});

test("PV03/PV04: cenário E ativo projeta as 25 definições e mantém opcionais ausentes", () => {
  const carta = criarCartaServicoInicial();
  carta.sobreServico = { nome: "Serviço", nomePopular: "", descricao: "Descrição", categoria: "Justiça e Segurança", subcategoria: "Outros Serviços", topico: "", ativo: true };
  carta.publicoRequisitos.publicosEspecificos = ["Cidadão"];
  carta.publicoRequisitos.perfisUsuario = ["Cidadão"];
  carta.publicoRequisitos.quemPodeUtilizar = "Todos";
  carta.publicoRequisitos.documentos = [{ id: "doc-1", nome: "Identidade" }];
  carta.publicoRequisitos.custo = { tipo: "com-taxa", detalhe: "R$ 10" };
  carta.publicoRequisitos.prazo = { maximo: "10", tipo: "Dias corridos" };
  carta.etapas = [{ id: "step-1", ordem: 1, titulo: "Solicitar", orientacaoCidadao: "Envie os dados", modalidade: "Online" }];
  carta.atendimento = { exigeAgendamento: true, tiposAgendamento: ["online"], sistemaAgendamento: "sistema-externo", linkAgendamento: "https://agenda.example", exibicaoAgendamento: "nova-pagina" };
  carta.informacoesFinais = { informacoesAdicionais: "", palavrasChave: "" };
  const model = criarModeloPreviaCarta(carta);
  const projected = model.sections.flatMap((section) => [...section.fields, ...(section.items ?? []).flatMap((item) => item.fields)]);
  assert.equal(projected.length, 25);
  assert.deepEqual(findField(model, "popular-name").value, { kind: "missing" });
  assert.deepEqual(findField(model, "important-additional-information").value, { kind: "missing" });
});

test("PV05: detalhe de custo inativo não vaza e zero é preservado", () => {
  const carta = criarCartaServicoInicial();
  carta.publicoRequisitos.custo = { tipo: "gratuito", detalhe: "segredo retido" };
  let model = criarModeloPreviaCarta(carta);
  assert.equal(findField(model, "cost-value-or-link"), undefined);
  carta.publicoRequisitos.custo = { tipo: "com-taxa", detalhe: "0" };
  model = criarModeloPreviaCarta(carta);
  assert.deepEqual(findField(model, "cost-value-or-link").value, { kind: "text", text: "0" });
});

test("PV07: itens vazios e parciais continuam identificáveis", () => {
  const carta = criarCartaServicoInicial();
  carta.etapas = [
    { id: "step-empty", ordem: 1, titulo: "", orientacaoCidadao: "", modalidade: null },
    { id: "step-partial", ordem: 2, titulo: "Leve os documentos", orientacaoCidadao: "", modalidade: null },
  ];
  const model = criarModeloPreviaCarta(carta);
  const flow = model.sections.find((section) => section.id === "service-flow");
  assert.equal(model.hasContent, true);
  assert.equal(model.hasEmptyItems, true);
  assert.deepEqual(flow.items.map((item) => item.id), ["step-empty", "step-partial"]);
});

test("PV06/PV08: prazo e ordem recebida são preservados sem mutação", () => {
  const carta = criarCartaServicoInicial();
  carta.publicoRequisitos.prazo = { maximo: "0", tipo: null };
  carta.etapas = [
    { id: "second", ordem: 2, titulo: "Segundo", orientacaoCidadao: "B", modalidade: "Presencial" },
    { id: "first", ordem: 1, titulo: "Primeiro", orientacaoCidadao: "A", modalidade: "Online" },
  ];
  const before = structuredClone(carta);
  const model = criarModeloPreviaCarta(carta);
  assert.deepEqual(findField(model, "maximum-deadline").value, { kind: "text", text: "0" });
  assert.deepEqual(findField(model, "deadline-type").value, { kind: "missing" });
  assert.deepEqual(model.sections.find((section) => section.id === "service-flow").items.map((item) => item.id), ["second", "first"]);
  assert.deepEqual(carta, before);
});

test("PV09: Não explícito conta como conteúdo e oculta descendentes", () => {
  const carta = criarCartaServicoInicial();
  carta.atendimento.exigeAgendamento = false;
  carta.atendimento.tiposAgendamento = ["online"];
  carta.atendimento.sistemaAgendamento = "sistema-externo";
  carta.atendimento.linkAgendamento = "https://retido.example";
  carta.atendimento.exibicaoAgendamento = "nova-pagina";
  const model = criarModeloPreviaCarta(carta);
  assert.equal(model.hasContent, true);
  assert.deepEqual(findField(model, "requires-scheduling").value, { kind: "text", text: "Não" });
  assert.equal(findField(model, "scheduling-type"), undefined);
  assert.equal(findField(model, "scheduling-link"), undefined);
});

test("PV10/PV11: condições S, ON e E revelam somente campos aplicáveis", () => {
  const carta = criarCartaServicoInicial();
  carta.atendimento.exigeAgendamento = true;
  carta.atendimento.tiposAgendamento = ["online", "presencial"];
  carta.atendimento.sistemaAgendamento = "sistema-externo";
  carta.atendimento.linkAgendamento = "https://agenda.example/caminho";
  carta.atendimento.exibicaoAgendamento = "dentro-paraiba-digital";
  const model = criarModeloPreviaCarta(carta);
  assert.deepEqual(findField(model, "scheduling-type").value, { kind: "list", items: ["Online", "Presencial"] });
  assert.deepEqual(findField(model, "scheduling-link").value, { kind: "text", text: "https://agenda.example/caminho" });
});

test("PV13: prefixos contextuais produzem IDs DOM distintos", () => {
  assert.notEqual(cartaPreviewDomId("route", "about", "service-name"), cartaPreviewDomId("form", "about", "service-name"));
});

test("PV14: texto literal é preservado e a fonte não é alterada", () => {
  const carta = criarCartaServicoInicial();
  const literal = "  <script>alert('x')</script>\nhttps://exemplo.test  ";
  carta.sobreServico.descricao = literal;
  const before = structuredClone(carta);
  const model = criarModeloPreviaCarta(carta);
  assert.deepEqual(findField(model, "service-description").value, { kind: "text", text: literal });
  assert.deepEqual(carta, before);
});

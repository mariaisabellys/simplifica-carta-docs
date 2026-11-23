import assert from "node:assert/strict";
import test from "node:test";
import { criarCartaServicoInicial } from "../src/features/carta/carta.schema.ts";
import { CARTA_STORAGE_KEY, carregarCartaDaSessaoComStatus, isCartaServicoV3, salvarCartaNaSessao } from "../src/features/carta/carta.storage.ts";
import { contarPalavras, validarCartaObrigatoria } from "../src/features/carta/carta.validation.ts";
import { adicionarDocumento, adicionarEtapa, moverEtapa, removerDocumento, removerEtapa, selecionarCategoria } from "../src/features/carta/carta.operations.ts";

const clone = (value) => structuredClone(value);

function cartaCompleta() {
  const carta = criarCartaServicoInicial();
  carta.sobreServico.nome = "Solicitar declaração escolar";
  carta.sobreServico.descricao = "Solicite uma declaração escolar para comprovar sua matrícula.";
  carta.sobreServico.categoria = "Educação e Pesquisa";
  carta.sobreServico.subcategoria = "Gestão Educacional";
  carta.publicoRequisitos.perfisUsuario = ["Estudante"];
  carta.publicoRequisitos.quemPodeUtilizar = "Estudantes matriculados";
  carta.publicoRequisitos.custo.tipo = "gratuito";
  carta.publicoRequisitos.prazo = { maximo: "5", tipo: "Dias úteis" };
  carta.etapas = [{ id: "step-1", ordem: 1, titulo: "Solicite", orientacaoCidadao: "Envie os dados.", modalidade: "Online" }];
  carta.atendimento.exigeAgendamento = false;
  return carta;
}

function memoryStorage(initial = null) {
  let value = initial;
  let writes = 0;
  return {
    getItem(key) { assert.equal(key, CARTA_STORAGE_KEY); return value; },
    setItem(key, next) { assert.equal(key, CARTA_STORAGE_KEY); value = next; writes += 1; },
    snapshot: () => value,
    writes: () => writes,
  };
}

test("storage distingue ausência e restaura Carta v3 parcial sem gravar", () => {
  const empty = memoryStorage();
  assert.equal(carregarCartaDaSessaoComStatus(empty).status, "empty");
  assert.equal(empty.writes(), 0);
  const partial = criarCartaServicoInicial();
  partial.sobreServico.nome = "Serviço parcial";
  const stored = memoryStorage(JSON.stringify(partial));
  const result = carregarCartaDaSessaoComStatus(stored);
  assert.equal(result.status, "restored");
  assert.equal(result.carta.sobreServico.nome, "Serviço parcial");
  assert.equal(stored.writes(), 0);
});

test("storage preserva registro inválido ou de outra versão", () => {
  for (const raw of ["{invalido", JSON.stringify({ versao: 2, dado: "original" })]) {
    const storage = memoryStorage(raw);
    const result = carregarCartaDaSessaoComStatus(storage);
    assert.ok(result.status === "invalid" || result.status === "unsupported");
    assert.equal(storage.snapshot(), raw);
    assert.equal(storage.writes(), 0);
  }
});

test("storage indisponível mantém Carta segura em memória", () => {
  const unavailable = { getItem() { throw new Error("blocked"); } };
  assert.equal(carregarCartaDaSessaoComStatus(unavailable).status, "unavailable");
  assert.equal(salvarCartaNaSessao(criarCartaServicoInicial(), { setItem() { throw new Error("full"); } }), false);
});

test("decoder rejeita propriedades desconhecidas, duplicatas, IDs e ordem inválidos", () => {
  const base = cartaCompleta();
  assert.equal(isCartaServicoV3(base), true);
  const unknown = clone(base); unknown.extra = true;
  assert.equal(isCartaServicoV3(unknown), false);
  const duplicateProfile = clone(base); duplicateProfile.publicoRequisitos.perfisUsuario.push("Estudante");
  assert.equal(isCartaServicoV3(duplicateProfile), false);
  const duplicateDocument = clone(base); duplicateDocument.publicoRequisitos.documentos = [{ id: "doc", nome: "A" }, { id: "doc", nome: "B" }];
  assert.equal(isCartaServicoV3(duplicateDocument), false);
  const wrongOrder = clone(base); wrongOrder.etapas[0].ordem = 2;
  assert.equal(isCartaServicoV3(wrongOrder), false);
});

test("operações de documentos preservam identidade, irmãos e fonte", () => {
  const source = cartaCompleta();
  source.publicoRequisitos.documentos = [{ id: "doc-1", nome: "Identidade" }];
  const before = clone(source);
  const added = adicionarDocumento(source, "doc-2");
  assert.deepEqual(source, before);
  assert.deepEqual(added.publicoRequisitos.documentos, [{ id: "doc-1", nome: "Identidade" }, { id: "doc-2", nome: "" }]);
  const removed = removerDocumento(added, "doc-1");
  assert.deepEqual(removed.publicoRequisitos.documentos, [{ id: "doc-2", nome: "" }]);
  assert.equal(adicionarDocumento(added, "doc-2"), added);
});

test("operações de etapas preservam IDs e normalizam somente a ordem", () => {
  const source = cartaCompleta();
  const added = adicionarEtapa(source, "step-2");
  added.etapas[1].titulo = "Receba";
  const moved = moverEtapa(added, "step-2", -1);
  assert.deepEqual(moved.etapas.map(({ id, ordem, titulo }) => ({ id, ordem, titulo })), [
    { id: "step-2", ordem: 1, titulo: "Receba" },
    { id: "step-1", ordem: 2, titulo: "Solicite" },
  ]);
  const removed = removerEtapa(moved, "step-2");
  assert.deepEqual(removed.etapas.map(({ id, ordem }) => ({ id, ordem })), [{ id: "step-1", ordem: 1 }]);
  assert.equal(moverEtapa(source, "step-1", -1), source);
});

test("trocar categoria limpa subcategoria sem alterar a fonte", () => {
  const source = cartaCompleta();
  const next = selecionarCategoria(source, "Saúde e Vigilância Sanitária");
  assert.equal(source.sobreServico.subcategoria, "Gestão Educacional");
  assert.equal(next.sobreServico.categoria, "Saúde e Vigilância Sanitária");
  assert.equal(next.sobreServico.subcategoria, null);
});

test("revisão exige etapa completa, mas aceita zero documentos", () => {
  const carta = cartaCompleta();
  assert.deepEqual(validarCartaObrigatoria(carta), []);
  carta.etapas = [];
  assert.ok(validarCartaObrigatoria(carta).some((item) => item.campo === "etapas"));
  carta.etapas = [{ id: "step-1", ordem: 1, titulo: "", orientacaoCidadao: "", modalidade: null }];
  const fields = validarCartaObrigatoria(carta).map((item) => item.campo);
  assert.ok(fields.includes("etapas.step-1.titulo"));
  assert.ok(fields.includes("etapas.step-1.orientacaoCidadao"));
  assert.ok(fields.includes("etapas.step-1.modalidade"));
});

test("agendamento presencial não exige sistema e on-line exige", () => {
  const carta = cartaCompleta();
  carta.atendimento.exigeAgendamento = true;
  carta.atendimento.tiposAgendamento = ["presencial"];
  assert.equal(validarCartaObrigatoria(carta).some((item) => item.campo === "atendimento.sistemaAgendamento"), false);
  carta.atendimento.tiposAgendamento = ["online", "presencial"];
  assert.equal(validarCartaObrigatoria(carta).some((item) => item.campo === "atendimento.sistemaAgendamento"), true);
  carta.atendimento.sistemaAgendamento = "paraiba-digital";
  assert.equal(validarCartaObrigatoria(carta).some((item) => item.campo.startsWith("atendimento.") && item.campo !== "atendimento.exigeAgendamento"), false);
});

test("agendamento externo exige URL HTTP(S) segura e exibição", () => {
  const carta = cartaCompleta();
  carta.atendimento = { exigeAgendamento: true, tiposAgendamento: ["online"], sistemaAgendamento: "sistema-externo", linkAgendamento: "https://usuario:senha@agenda.example", exibicaoAgendamento: null };
  let fields = validarCartaObrigatoria(carta).map((item) => item.campo);
  assert.ok(fields.includes("atendimento.linkAgendamento"));
  assert.ok(fields.includes("atendimento.exibicaoAgendamento"));
  carta.atendimento.linkAgendamento = "https://agenda.example/caminho";
  carta.atendimento.exibicaoAgendamento = "nova-pagina";
  fields = validarCartaObrigatoria(carta).map((item) => item.campo);
  assert.equal(fields.includes("atendimento.linkAgendamento"), false);
  assert.equal(fields.includes("atendimento.exibicaoAgendamento"), false);
});

test("prazo aceita apenas inteiro positivo canônico", () => {
  const carta = cartaCompleta();
  for (const value of ["0", "01", "+1", "1.5", "Imediato", "Sem estimativa"]) {
    carta.publicoRequisitos.prazo.maximo = value;
    assert.ok(validarCartaObrigatoria(carta).some((item) => item.campo === "publicoRequisitos.prazo.maximo"), value);
  }
  carta.publicoRequisitos.prazo.maximo = "10";
  assert.equal(validarCartaObrigatoria(carta).some((item) => item.campo === "publicoRequisitos.prazo.maximo"), false);
});

test("contagem significativa segue as fixtures de limite do contrato", () => {
  const repeated = (count) => Array.from({ length: count }, () => "serviço").join(" ");
  assert.equal(contarPalavras(repeated(20)), 20);
  assert.equal(contarPalavras(`de para o a ${repeated(20)}`), 20);
  assert.equal(contarPalavras("O DE PARA À até ate ação"), 2);
  assert.equal(contarPalavras("segunda-via d'água d’água"), 3);
  assert.equal(contarPalavras("20 2,5 12/08/2026"), 6);
  const carta = cartaCompleta();
  carta.sobreServico.descricao = repeated(21);
  assert.ok(validarCartaObrigatoria(carta).some((item) => item.campo === "sobreServico.descricao"));
});

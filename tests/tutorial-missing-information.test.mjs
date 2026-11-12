import assert from "node:assert/strict";
import { test } from "node:test";
import { criarCartaServicoInicial } from "../src/features/carta/carta.schema.ts";
import { hasMissingTutorialInformation } from "../src/features/carta/carta.tutorial.ts";
import { categoriasServico, subcategoriasPorCategoria, perfisUsuario, publicosEspecificos, tiposPrazo, modalidadesEtapa } from "../src/features/carta/carta.catalogs.ts";

function completeCarta() {
  const carta = criarCartaServicoInicial();
  Object.assign(carta.sobreServico, { nome: "Servico", nomePopular: "Popular", descricao: "Descricao", categoria: categoriasServico[0], subcategoria: subcategoriasPorCategoria[categoriasServico[0]][0], topico: "Topico" });
  Object.assign(carta.publicoRequisitos, { publicosEspecificos: [publicosEspecificos[0]], perfisUsuario: [perfisUsuario[0]], quemPodeUtilizar: "Todos", documentos: [{ id: "doc", nome: "RG" }], custo: { tipo: "gratuito", detalhe: "" }, prazo: { maximo: "5", tipo: tiposPrazo[0] } });
  carta.atendimento.exigeAgendamento = false;
  carta.etapas = [{ id: "etapa", ordem: 1, titulo: "Solicitar", orientacaoCidadao: "Preencha os dados", modalidade: modalidadesEtapa[0] }];
  carta.informacoesFinais = { informacoesAdicionais: "Outras", palavrasChave: "servico" };
  return carta;
}

test("empty and partially filled Cartas have pending information", () => {
  const carta = criarCartaServicoInicial();
  assert.equal(hasMissingTutorialInformation(carta), true);
  carta.sobreServico.nome = "Servico";
  assert.equal(hasMissingTutorialInformation(carta), true);
});

test("complete applicable information needs no alert, including disabled scheduling", () => {
  const carta = completeCarta();
  const before = JSON.stringify(carta);
  assert.equal(hasMissingTutorialInformation(carta), false);
  assert.equal(JSON.stringify(carta), before);
  carta.atendimento = { exigeAgendamento: false, tiposAgendamento: [], sistemaAgendamento: null, linkAgendamento: "", exibicaoAgendamento: null };
  assert.equal(hasMissingTutorialInformation(carta), false);
});

test("every relevant scalar field detects blank, null and undefined", () => {
  for (const path of ["sobreServico.nome", "sobreServico.nomePopular", "sobreServico.descricao", "sobreServico.categoria", "sobreServico.subcategoria", "sobreServico.topico", "publicoRequisitos.quemPodeUtilizar", "publicoRequisitos.custo.tipo", "publicoRequisitos.prazo.maximo", "publicoRequisitos.prazo.tipo", "informacoesFinais.informacoesAdicionais", "informacoesFinais.palavrasChave", "publicoRequisitos.documentos.0.nome", "etapas.0.titulo", "etapas.0.orientacaoCidadao", "etapas.0.modalidade"]) {
    for (const value of ["", " \n\t ", null, undefined]) {
      const carta = completeCarta();
      const keys = path.split(".");
      const key = keys.pop();
      keys.reduce((current, part) => current[part], carta)[key] = value;
      assert.equal(hasMissingTutorialInformation(carta), true, `${path} / ${value}`);
    }
  }
  for (const value of [null, undefined]) {
    const carta = completeCarta();
    carta.atendimento.exigeAgendamento = value;
    assert.equal(hasMissingTutorialInformation(carta), true);
  }
});

test("missing collections are pending even when pagination hides placeholders", () => {
  for (const path of ["publicoRequisitos.documentos", "publicoRequisitos.publicosEspecificos", "publicoRequisitos.perfisUsuario", "etapas"]) {
    const carta = completeCarta();
    const keys = path.split(".");
    const key = keys.pop();
    keys.reduce((current, part) => current[part], carta)[key] = [];
    assert.equal(hasMissingTutorialInformation(carta), true, path);
  }
});

test("scheduling only checks applicable fields", () => {
  const carta = completeCarta();
  carta.atendimento.exigeAgendamento = true;
  assert.equal(hasMissingTutorialInformation(carta), true);
  carta.atendimento.tiposAgendamento = ["presencial"];
  assert.equal(hasMissingTutorialInformation(carta), false);
  carta.atendimento.tiposAgendamento = ["online"];
  assert.equal(hasMissingTutorialInformation(carta), true);
  carta.atendimento.sistemaAgendamento = "paraiba-digital";
  assert.equal(hasMissingTutorialInformation(carta), false);
  carta.atendimento.sistemaAgendamento = "sistema-externo";
  assert.equal(hasMissingTutorialInformation(carta), true);
  carta.atendimento.linkAgendamento = "https://example.com";
  assert.equal(hasMissingTutorialInformation(carta), true);
  carta.atendimento.exibicaoAgendamento = "nova-pagina";
  assert.equal(hasMissingTutorialInformation(carta), false);
  carta.atendimento.linkAgendamento = " ";
  assert.equal(hasMissingTutorialInformation(carta), true);
});

test("cost details only count when fees or consultation apply", () => {
  for (const type of ["gratuito", "com-taxa", "sob-consulta"]) {
    const carta = completeCarta();
    carta.publicoRequisitos.custo.tipo = type;
    assert.equal(hasMissingTutorialInformation(carta), type !== "gratuito");
    carta.publicoRequisitos.custo.detalhe = "10 reais";
    assert.equal(hasMissingTutorialInformation(carta), false);
  }
});

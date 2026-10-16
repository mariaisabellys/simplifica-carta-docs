import assert from "node:assert/strict";
import { test } from "node:test";
import { subcategoriasPorCategoria } from "../src/features/carta/carta.catalogs.ts";
import { criarCartaServicoInicial } from "../src/features/carta/carta.schema.ts";

function cartaValida() {
  const carta = criarCartaServicoInicial();
  carta.sobreServico.nome = "Solicitar declaração escolar";
  carta.sobreServico.descricao = "Permite solicitar uma declaração escolar para comprovar a matrícula do estudante.";
  carta.sobreServico.categoria = "Educação e Pesquisa";
  carta.sobreServico.subcategoria = "Gestão Educacional";
  carta.publicoRequisitos.perfisUsuario = ["Estudante"];
  carta.publicoRequisitos.quemPodeUtilizar = "Estudantes matriculados";
  carta.publicoRequisitos.custo.tipo = "gratuito";
  carta.publicoRequisitos.prazo = { maximo: "5", tipo: "Dias úteis" };
  carta.atendimento.exigeAgendamento = false;
  return carta;
}

test("maps each category to its official subcategories", () => {
  assert.deepEqual(subcategoriasPorCategoria["Educação e Pesquisa"], [
    "Capacitações", "Ensino Superior", "Ensino Técnico-Profissional",
    "Estudos e Pesquisas", "Gestão Educacional", "Outras",
  ]);
});

test("creates an isolated v3 Carta with explicit undecided states", () => {
  const carta = cartaValida();
  const outra = criarCartaServicoInicial();
  assert.equal(carta.versao, 3);
  assert.equal(outra.atendimento.exigeAgendamento, null);
  carta.publicoRequisitos.perfisUsuario.push("Estudante");
  assert.deepEqual(outra.publicoRequisitos.perfisUsuario, []);
});

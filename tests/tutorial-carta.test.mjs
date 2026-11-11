import assert from "node:assert/strict";
import { test } from "node:test";
import { criarCartaServicoInicial } from "../src/features/carta/carta.schema.ts";
import { projectCartaForTutorial } from "../src/features/carta/carta.tutorial.ts";

for (const scenario of [
  { system: "paraiba-digital", display: "dentro-paraiba-digital", id: "scheduling-system", selection: "“Interno” em Local do agendamento", explanation: "Na plataforma oficial" },
  { system: "sistema-externo", display: "dentro-paraiba-digital", id: "scheduling-display", selection: "“Integrado”", explanation: "Assim, o site de agendamento será exibido dentro do próprio Paraíba Digital." },
  { system: "sistema-externo", display: "nova-pagina", id: "scheduling-display", selection: "“Externo”", explanation: "Essa opção direciona o cidadão para o site de agendamento fora do Paraíba Digital." },
]) {
  test(`scheduling guidance: ${scenario.system} / ${scenario.display}`, () => {
    const carta = criarCartaServicoInicial();
    carta.atendimento = { exigeAgendamento: true, tiposAgendamento: ["online"], sistemaAgendamento: scenario.system, linkAgendamento: "https://example.com/agenda", exibicaoAgendamento: scenario.display };
    const before = JSON.stringify(carta);
    const fields = projectCartaForTutorial(carta).flatMap(group => group.fields);
    const guidance = fields.find(field => field.id === scenario.id);
    assert(guidance.value.includes(scenario.selection));
    assert(guidance.value.includes(scenario.explanation));
    assert.equal(guidance.copyable, false);
    if (scenario.system === "sistema-externo") {
      assert.equal(guidance.value, `Em Link do agendamento, selecione ${scenario.selection}. ${scenario.explanation}`);
      const system = fields.find(field => field.id === "scheduling-system");
      assert.equal(system.label, "Sistema de agendamento");
      assert.equal(system.value, "Selecione a opção “Externo” em Local do agendamento.");
      assert.equal(system.copyable, false);
    }
    if (scenario.system === "paraiba-digital") {
      assert.equal(guidance.label, "Local do agendamento");
      assert.equal(fields.some(field => field.id === "scheduling-display" || field.id === "scheduling-link"), false);
    } else {
      const link = fields.find(field => field.id === "scheduling-link");
      assert.equal(link.value, carta.atendimento.linkAgendamento);
      assert.equal(link.copyable, true);
    }
    assert.equal(JSON.stringify(carta), before);
    carta.atendimento.exigeAgendamento = false;
    assert.equal(projectCartaForTutorial(carta).flatMap(group => group.fields).some(field => field.id === scenario.id), false);
  });
}

test("projects five groups without inventing copyable data", () => {
  const groups = projectCartaForTutorial(criarCartaServicoInicial());
  assert.equal(groups.length, 5);
  const fields = groups.flatMap(group => group.fields);
  assert.equal(fields.filter(field => field.copyable && field.value.trim()).length, 0);
  assert.equal(fields.find(field => field.id === "active").value, "Inativo");
  assert.equal(fields.find(field => field.id === "requires-scheduling").value, "");
});

test("projects all 25 definitions and preserves original text without mutating the Carta", () => {
  const carta = criarCartaServicoInicial();
  carta.sobreServico.nome = "  =Serviço\r\n<script>literal</script>  ";
  carta.publicoRequisitos.documentos = [{ id: "doc-1", nome: "RG" }];
  carta.publicoRequisitos.custo = { tipo: "com-taxa", detalhe: "10" };
  carta.etapas = [{ id: "etapa-1", ordem: 1, titulo: "Solicitar", orientacaoCidadao: "Informe os dados", modalidade: "Online" }];
  carta.atendimento = { exigeAgendamento: true, tiposAgendamento: ["online"], sistemaAgendamento: "sistema-externo", linkAgendamento: "https://example.com", exibicaoAgendamento: "nova-pagina" };
  const before = JSON.stringify(carta);
  const fields = projectCartaForTutorial(carta).flatMap(group => group.fields);
  assert.equal(fields.length, 25);
  assert.equal(fields.filter(field => field.copyable).length, 13);
  assert.equal(fields.find(field => field.id === "service-name").value, carta.sobreServico.nome);
  assert.equal(JSON.stringify(carta), before);
  carta.atendimento.exigeAgendamento = false;
  carta.publicoRequisitos.custo.tipo = "gratuito";
  const hidden = projectCartaForTutorial(carta).flatMap(group => group.fields);
  for (const id of ["cost-value-or-link", "scheduling-type", "scheduling-system", "scheduling-link", "scheduling-display"]) {
    assert.equal(hidden.some(field => field.id === id), false);
  }
  assert.equal(carta.atendimento.linkAgendamento, "https://example.com");
});

# Verificacao: Responsividade e acessibilidade

## Resultado

Executado `/spec:implementar 016-responsividade-acessibilidade` em 2026-10-05.
Implementacao parcial: src/lib/navigation.ts e guard no handleNav de AppShell.
Antes, handler executava preventDefault em todos os cliques; agora apenas
clique primario sem modificadores, nao tratado, em link HTTP(S) interno sem
download/target alternativo. Href permanece real. Erro de URL nao intercepta.
Layout, CSS, tokens, textos e regras de negocio nao alterados.

Quatro testes novos em tests/navigation.test.mjs cobrem clique primario,
modificadores/botoes, defaultPrevented, download, targets, externo/mailto e
URL invalida com mocks. Guard integrado ao handler existente, sem router
paralelo. Isso nao implementa navegacao global, hash, foco ou providers.

## Checks

| Check | Resultado |
| --- | --- |
| node --test tests/navigation.test.mjs tests/mailto.test.mjs tests/atendimento.attempt.test.mjs tests/clipboard.test.mjs tests/csv.test.mjs | 23 testes passaram, quatro novos |
| npm.cmd run typecheck | Passou |
| npm.cmd run build | Passou fora do sandbox para evitar bloqueio de leitura do esbuild previamente identificado; Vite 7.3.6 |

Nenhum teste real de browser, teclado, leitor de tela, contraste, zoom/reflow,
toque ou fluxo integrado foi executado. Observacao estatica do handler e
testes unitarios nao equivalem a defeito reproduzido por tecnologia assistiva.
Nao houve envio, acesso a banco, migrations ou dados pessoais reais.

## Documentacao e pendencias

Analisados spec/plan/tasks/implementation-plan e codigo de shell/App/routes/
FormField. A 016 ainda nao possui validation.md; leitura desta rodada nao
substitui `/spec:validar` contra ERS/Figma. Tasks/plano detalhado receberam
registro parcial; spec/plan intactos. Matriz inicial e quickstart adicionados.
Nenhuma tarefa concluida; alteracoes anteriores do workspace preservadas.

- Constitution secao 6 exige: "Antes de implementar trabalho visual, o Codex
  deve consultar via MCP". Fonte: ../../docs/processo/constitution.md. Figma
  MCP indisponivel; nenhum ajuste visual realizado antes dessa consulta.
- Conciliacao ERS/meta WCAG, politica de foco/hash/navegacao 002 e associacoes
  dos formularios 007/008/014 ainda pendentes. FormField nao tem consumidores
  reais atuais, portanto contrato nao foi declarado integrado.
- Skip link/main, titulo/foco de rota, sticky, reflow/contraste e estados reais
  ainda aguardam implementacao/verificacao apropriadas.
- Suite Playwright/axe proposta nao instalada nesta rodada; matriz completa
  A/AA, ambientes e responsaveis ainda a definir. Matriz inicial registra CA,
  sem substituir auditoria de todos os criterios aplicaveis.
- Placeholders de 006–015 e ausencia de processos completos impedem aceite
  transversal. Helpers entregues nao comprovam interfaces acessiveis.

CA01–CA15 sem aceite integral ou declaracao de conformidade. Consultar
accessibility-matrix.md para limites por criterio e tarefas proprietarias.

## Atualizacao documental T016 — 22/10/2026

Escopo desta atualização: somente documentação. O mapa e as specs proprietárias
foram reconciliados no
[registro T016](../../docs/verificacoes/t016-figma-acessibilidade.md). Tentativas
de acesso web aos nodes representativos `310:175`, `2024:269`, `564:980` e
`425:201` falharam; não havia navegador conectado nem MCP Figma. Portanto,
nenhuma inspeção visual, comparação pixel a pixel ou homologação de frame foi
registrada.

Foram documentados:

- inventário de páginas, variantes e componentes compartilhados 002–016;
- ampliação da etapa 4, formulário real, orientação e prévia única;
- loading, vazio, erro, revisão, falha e conteúdo longo ausentes dos frames;
- matriz por contexto e métodos de foco, teclado, anúncios, contraste, reflow,
  zoom/texto/espaçamento, toque, estados e conteúdo extremo;
- pendência explícita de inspeção por node e separação entre Figma, contrato
  local e evidência funcional.

Checks documentais finais constam no registro central. Nenhum código/teste,
build, servidor, browser assistivo ou atendimento real foi alterado/executado.
Os resultados CA01–CA15 continuam pendentes; esta rodada fecha apenas o aceite
documental da T016 e não declara conformidade WCAG nem aceite visual.

## Atualizacao documental T017 — 22/10/2026

`validation.md` foi criado com parecer atual e separacao entre contrato,
implementacao, ambientes e fontes pendentes. A feature 016 passa a possuir os
sete artefatos convencionados. Isso não altera CA01–CA15 nem representa nova
execução de testes, browser, Figma ou tecnologia assistiva. Registro central:
[verificação T017](../../docs/verificacoes/t017-artefatos-baseline.md).

# Verificação T017 — artefatos e baselines

## Resultado

T017 concluída documentalmente em 22/10/2026. As features 001–016 possuem
agora os sete artefatos da convenção (`spec`, `plan`, `tasks`,
`implementation-plan`, `validation`, `verification` e `quickstart`). A pasta
017 continua vazia por decisão de escopo: sua criação documental pertence à
T018 e não foi antecipada.

Nenhum artefato novo afirma execução funcional. Validations registram parecer
documental atual; verifications distinguem evidência estática/histórica;
quickstarts descrevem procedimentos e resultados esperados como futuros.

## Inventário reconfirmado

| Feature | Cobertura após T017 | Observação |
| --- | --- | --- |
| 001 | 7/7 | Criados implementation-plan, validation e verification. |
| 002–005 | 7/7 cada | Criados validation e verification atuais. |
| 006–009 | 7/7 cada | Criados quickstarts previstos. |
| 010 | 7/7 | Já completa; preservada. |
| 011 | 7/7 | Quickstart criado; T011 global continua parcial pelo conteúdo tipado. |
| 012–015 | 7/7 cada | Já completas; preservadas. |
| 016 | 7/7 | Validation criada; matriz T016 continua relatório complementar. |
| 017 | 0/7 | Pasta existente sem artefatos; destino exclusivo da T018. |

O baseline atual contém 18 arquivos TypeScript em `src/content`, sete testes
`*.test.mjs` e seis módulos TypeScript em `src/features/carta`. O snapshot T001
registrava 17 conteúdos e seis testes; ele permanece histórico, mas não deve
ser usado como inventário corrente. `package.json` ainda não possui script
`test`; isso não significa ausência de testes.

## Artefatos criados

### Fundação e pareceres

- `001`: implementation-plan, validation e verification;
- `002`, `003`, `004` e `005`: validation e verification;
- `016`: validation.

Os pareceres separam contrato documental, implementação observada, fontes não
consultadas e tarefas futuras. Nenhum deles converte placeholder em entrega,
link de Figma em inspeção ou menção histórica de build em execução atual.

### Quickstarts previstos

- `006`: 3 tópicos/13 informações, progresso, orientação e memória;
- `007`: provider/modelo v3, cinco partes, listas/condições e storage;
- `008`: regras editoriais, contagem, catálogo, revisão e indisponibilidade;
- `009`: projeção v3 compartilhada, vazia/parcial/completa e retornos;
- `011`: seis etapas, query, etapa 4, cópia e fontes externas.

Cada roteiro contém pré-condições, massa sintética, passos, resultados
esperados, comandos realmente disponíveis quando aplicáveis e limitações. A
existência do roteiro não comprova execução.

Os quickstarts 002–005 também foram corrigidos: removido `npm run test`, que
não existe no package atual. A 002 aponta somente para o teste de navegação já
presente e delimita sua cobertura; 003–005 registram a necessidade de suites
próprias sem inventar arquivo, comando ou resultado.

## Baseline atual 001–005 e 016

| Feature | Parecer documental | Principal pendência não documental |
| --- | --- | --- |
| 001 | Fundação existente e utilizável como base | navegação completa, deploy e verificações novas |
| 002 | contrato/home coerentes | Home/shell atuais ainda legados/placeholders |
| 003 | conteúdo/destinos coerentes | rota e página ausentes |
| 004 | conteúdo educativo coerente | página ainda placeholder; fontes legais/visuais atuais pendentes |
| 005 | regra/conteúdo coerentes | UI/sessão/tipos e enumeração `3^8` pendentes |
| 016 | matriz/contrato transversal coerentes | auditoria visual/assistiva/medidas não executada |

## Evidência e checks

- inventário dos sete nomes de artefato por pasta 001–017;
- busca por afirmações obsoletas de faltantes;
- contagem atual de conteúdo/testes/módulos da Carta;
- links Markdown relativos e whitespace verificados no fechamento;
- comparação do diff de `src/`/`tests/` com o baseline de início da T017.

Não foram executados npm, testes Node, typecheck, build, servidor, navegador,
Figma, ERS, leitor de tela ou deploy. Comandos em quickstarts são instruções
futuras. Alterações preexistentes do workspace foram preservadas.

## Pendências e próxima tarefa

- T011 permanece parcial pela migração de conteúdo do tutorial.
- T016 mantém inspeção visual e auditoria funcional pendentes.
- Decisões MC/externas registradas nas features não são resolvidas pela presença
  dos sete documentos.
- T018 deve criar os artefatos da 017 e planejar deploy/fallback/backend sem
  publicar o produto.

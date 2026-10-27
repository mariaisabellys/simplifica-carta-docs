# Revalidação seletiva dos contratos alterados

Data: **27 de outubro de 2026**.

Comando lógico executado: `/spec:validar` somente nas features com contrato,
matriz normativa ou spec de infraestrutura alterados no diff vigente.

## Escopo

Revalidadas: 006, 007, 008, 009, 010, 011, 012, 014, 016 e 017.

Não revalidadas neste lote: 001–005, 013 e 015. Ajustes existentes nessas
features não alteraram seus contratos nesta etapa, ou já pertencem a validação
anterior específica. A exclusão evita transformar uma alteração editorial ou
um relatório histórico em falsa mudança normativa.

## Fontes efetivamente consultadas

- `spec.md`, `plan.md`, `tasks.md`, `implementation-plan.md`, `quickstart.md`,
  `validation.md` e `verification.md` das dez features;
- contratos/matrizes vigentes das features 006–012, contrato da agenda 014,
  matriz transversal 016 e spec de deploy 017;
- modelo central da Carta v3, contratos de contagem, navegação e canais;
- ADR-003, ADR-004, registro G6/G7, mapa de telas, roadmap, constitution e
  convenção documental;
- conteúdo tipado do tutorial, tipos/catálogos/helpers e testes locais afetados.

ERS, Figma Design, Figma Make, navegadores, tecnologias assistivas, planilhas,
clipboard real, plataforma administrativa, nuvem, banco e SMTP **não foram
reacessados** nesta rodada. Seus links e destinos documentais foram conferidos,
mas isso não constitui inspeção visual, validação operacional ou homologação.

## Parecer por feature

| Feature | Resultado documental vigente | Dependências que permanecem |
| --- | --- | --- |
| 006 — Organizar informações | Contrato coerente com três tópicos, 13 informações, 24 destinos e modelo 007 | Aplicar conteúdo F006-03, progresso, integração, revisão institucional e visual |
| 007 — Formulário | Matriz/modelo central coerentes: 25 definições, MC-02–MC-08 fechadas e K/S/ON/E propagadas | Provider, UI, contagem executável, Figma e testes funcionais/visuais |
| 008 — Linguagem simples | `ls-pt-BR-v1` e `msg-pt-BR-v1` coerentes com matriz e consumidores | Motor, geometria, integração, acessibilidade e testes |
| 009 — Prévia HTML | Projeção v3 consistente com os 25 campos e condições atuais | Provider 007, interface 008, composição e aceites |
| 010 — Exportação CSV | Contrato de 22 dados/25 definições consistente com o modelo atual | G4: fórmulas/planilhas-alvo, implementação e testes em aplicativos reais |
| 011 — Tutorial | Conteúdo e contrato 25/13/12 sincronizados, sem valores ilustrativos | Fontes administrativas, assets, composição 011/012, Figma/ERS e IT01–IT11 |
| 012 — Cópia no tutorial | Contrato 25/13/12 coerente com 007/011 e condições K/S/ON/E | Seletor, UI, clipboard integrado, âncoras e TR01–TR17 |
| 014 — Atendimento agendado | Contrato técnico coerente; IN01–IN08 formalmente abertas | Encaminhamento/respostas, ADR-004, API, banco, worker, privacidade e homologação |
| 016 — Responsividade/acessibilidade | Matriz transversal alinhada aos contratos atuais, inclusive ON | Auditorias reais por rota/estado, teclado, leitores, zoom/reflow e dispositivos |
| 017 — Deploy | Dois trilhos e aplicabilidade das INF coerentes; INF01–INF10 abertas | Respostas, fornecedor/ambientes, pipeline, publicação; trilho B também depende de G6 |

Nenhuma inconsistência documental nova bloqueia o início dos lotes independentes.
Isso não encerra G4–G7 nem libera os componentes diretamente afetados por esses
gates. A agenda 014 e a publicação 017 continuam bloqueadas conforme seus
registros; 010 depende da decisão de segurança; 011 depende de fontes externas
para homologação operacional.

## Verificações executadas

| Verificação | Resultado observado |
| --- | --- |
| Artefatos convencionados | 70/70 presentes nas dez features |
| Links locais nos artefatos | 249 destinos verificados; nenhum quebrado |
| Cardinalidades/condições | 006: 3/13/24; 007/009/010/012: 25; 011/012: 25/13/12; K/S/ON/E coerentes |
| Decisões abertas | 8/8 IN e 10/10 INF com data e gates preservados |
| Testes locais | `node --test tests/*.test.mjs`: 36/36 aprovados |
| TypeScript | `npm run typecheck`: aprovado |
| Build | `npm run build`: aprovado; 55 módulos transformados |
| Integridade do diff | `git diff --check`: sem erros |

Os testes existentes não cobrem ainda a composição visual das features, a
projeção/cópia 011/012, as heurísticas completas da 008, a agenda ou o deploy.
O build comprova compilação do estado atual, não aceite dos contratos futuros.

## Próxima ação

Manter os pareceres antigos identificados como históricos. Implementar pelos
lotes do roteiro, respeitando dependências locais; registrar novos resultados
em `verification.md`. Reexecutar `/spec:validar` apenas quando outro contrato
for alterado ou quando uma fonte externa resolver decisão que mude o contrato.

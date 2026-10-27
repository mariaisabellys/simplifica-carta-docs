# Verificação T013 — Canais de ajuda

20/10/2026. Parte documental executada; tarefa global parcial por migração
do conteúdo TypeScript não autorizada nesta rodada. Sem mudança de código,
configuração de canal, agenda, teste ou dependência.

## Entregas

- [Contrato compartilhado](../arquitetura/contrato-canais-ajuda.md): fontes,
  estados editoriais separados dos operacionais, nove combinações, ambos
  indisponíveis, referência de e-mail não ativo e configuração inválida.
- FAQ sem cards adicionais; CTA/título por estado e destino canônico.
- Entrada 014 abre calendário por botão/estado interno, sem link circular.
  Entrada 015 navega à 014; e-mail ativo copia localmente.
- Acesso direto/recarga/retorno/foco definidos sem dados em URL.
- Pausa não apaga tentativa ou cancela POST; API/recuperação/replay na T014.
- 21 artefatos 013/014/015 receberam regras e referência única; snippets
  contraditórios da 013 retirados; originais preservados em pre-t013.
- Mapa Figma e contrato de navegação atualizados, sem consulta externa.

## Inventário e pendências reais

supportChannels já contém atendimento pendente/e-mail ativo.
supportContacts é fonte do endereço e supportDestinations das duas rotas.
helpPageContent ainda contém título/CTA fixos de agendamento. AjudaPage troca
apenas rótulo não ativo por string local; título mantém a promessa.
helpChannelsContent ainda tem ação navigate para a própria rota da 014.
Página da 014 é placeholder; página da 015 não integra o botão de cópia.

Logo não se declara aceite de consistência funcional/conteúdo. A tabela de
migração no contrato lista seis arquivos de conteúdo afetados, sem alterá-los.
As quatro FAQs e estados atuais foram preservados.

## Checks documentais

Resultados registrados após edição abaixo. Sem suite, typecheck/build,
browser, clipboard, Figma MCP, leitura ERS ou comunicação institucional.
CJ01–CJ12 são cenários futuros, não testes funcionais aprovados.

| Check executado | Resultado |
| --- | --- |
| Referência ao contrato e à matriz CJ nos artefatos | 21 documentos 013/014/015 vinculados ao contrato único |
| Links locais dos 21 artefatos | 68 destinos de arquivo existentes; não valida URLs externas nem alvos DOM futuros |
| IDs dos cenários previstos | CJ01–CJ12 completos e sem lacunas |
| Leitura das fontes e páginas atuais | Confirmados quatro itens de FAQ, CTA fixo no conteúdo, mitigação parcial no JSX e card navigate; migração ainda necessária |
| Comparação dos históricos com a leitura anterior às edições | 21 arquivos preservados integralmente, exceto ajuste de links relativos |
| Revisão de contradições ativas | Retirados exemplos de cards/perguntas e configuração antiga da base técnica 013; relatórios anteriores identificados como históricos |
| git diff --check | Sem erros |
| git status --short -- src tests | Sem saída; nenhuma alteração de código/conteúdo executável/testes |

As nove combinações editoriais estão especificadas em CJ01; não foram
exercitadas em interface. Os cenários de pausa/API e recuperação dependem
da T014. O resultado documental não encerra o item 6 da T013 no conteúdo.

## Retomada

Aplicar migração de conteúdo em rodada autorizada; depois integrar e testar.
T014 deve fechar regras de backend/pausa/recuperação antes de implementar
ações dependentes. Não inventar regra de cancelamento ou mudar canal para
ativo para simular entrega. T011 continua parcial e T012 documental concluída.

## Conclusão autorizada — 21/10/2026

A tarefa estava parcial na última execução, como registrado acima.
Após pedido explícito de conclusão, aplicada a migração de conteúdo pendente:
resolvedor puro support/apresentacao.ts e wrapper canônico getSupportPresentation,
FAQ/cards/e-mail/agenda consumindo fontes únicas. AjudaPage deixa de sobrescrever
rótulo localmente; SuporteEmailPage remove a referência ao aviso vazio legado.
Nenhuma alteração no endereço ou nos estados editoriais existentes.

Conteúdo de atendimento usa open-calendar na própria rota, navigate na entrada
015 e null em não ativo. E-mail não ativo mantém referência sem incentivo/copiar.
Calendário recebe textos distintos de loading/vazio/erro/pausa/retorno.
Quatro perguntas da FAQ preservadas. Sem API, calendário interativo, nova
composição visual Figma, mecanismo de clipboard, worker ou envio real.

| Check executado em 21/10/2026 | Resultado |
| --- | --- |
| node --test tests/support.presentation.test.mjs | 11/11: nove combinações em dois contextos, configuração inválida, fontes/conteúdos reais e ausência de mutação |
| npm run typecheck | Passou |
| npm run build | Passou; Vite 7.3.6, artefatos locais, sem deploy |
| node --test tests/*.test.mjs | 36/36 passaram; testes legados não ampliam escopo da 015 |
| git diff --check | Sem erros |

T013 encerrada quanto à consolidação de contrato e migração de conteúdo.
CJ01/CJ02/CJ03/CJ05/CJ06/CJ10/CJ11 têm cobertura do resolvedor/dados, não de
browser ou interação real. CJ04/CJ07–09/CJ12 e integração visual/operacional
continuam exigindo implementação/testes nas features correspondentes.
T014 fechou tecnicamente pausa/replay; IN01–IN08 continuam pendentes.
T011 permanece parcial. Não há aprovação operacional ou institucional implícita.

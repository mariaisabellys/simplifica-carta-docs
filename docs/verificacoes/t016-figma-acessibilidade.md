# Verificação T016 — Figma e requisitos transversais da 016

## Resultado

T016 concluída documentalmente em 22/10/2026. O mapa foi reconciliado com as
specs proprietárias, as adaptações obrigatórias foram consolidadas e a matriz
016 passou a cobrir foco, teclado, anúncios, contraste, reflow, zoom, estados
ausentes e alternativas à medição visual.

Não houve inspeção visual do Figma. O mecanismo web disponível não conseguiu
abrir quatro URLs representativas (`310:175`, `2024:269`, `564:980` e
`425:201`); não havia navegador conectado nem ferramenta MCP do Figma nesta
sessão. Como os nodes pertencem ao mesmo arquivo, todos permanecem pendentes de
consulta autenticada. Links e IDs são inventário, não evidência de layout.

## Fontes efetivamente conferidas

- [mapa de telas](../design-system/mapa-figma-telas.md) e contratos de navegação;
- spec, plan, tasks, implementation-plan, quickstart, verification e
  accessibility-matrix da feature 016;
- specs/contratos ativos das features 002–015, especialmente modelo central
  da Carta, formulário 007, prévia 009, tutorial 011/012 e ajuda 013–015;
- conteúdo versionado citado por esses contratos. Nenhum valor de exemplo do
  Figma foi tratado como conteúdo ou dado inicial.

Não foram executados ERS, browser, leitor de tela, contraste, viewport, zoom,
build ou testes. Nenhum arquivo de código foi alterado.

## Inventário de páginas, variantes e componentes

| Dono | Classificação | Nodes identificados | Pendência visual específica |
| --- | --- | --- | --- |
| 002 | página home/shell | `310:175` | conferir header, hero, processo, CTA, footer e reflow real |
| 003 | página explorar | `575:483` | conferir cards/CTA; rota ainda não registrada em código |
| 004 | página educativa | `365:265` | conferir seções, listas, legislação e conteúdo longo |
| 005 | página diagnóstico + resultado | `387:1020`, `387:1362` | conferir pergunta e estrutura; resultado do frame é só amostra |
| 006 | página organização | `387:1918` | adaptar visual aos três tópicos e 13 informações atuais |
| 007 | página com cinco partes | `653:1540`, `2024:269`, `641:58`, `647:650`, `660:2533` | conferir composição sem limitar conteúdo; formulário real obrigatório |
| 007/006 | variantes de Form-Card/label | `811:306`, `811:382`, `651:317` | conferir orientação fechada/aberta, nomes, estado e foco |
| 007/009 | componente de prévia | `821:308` | não comprova página completa; acomodar todos os estados e campos |
| 011/012 | uma página, seis variantes | `564:635`, `564:730`, `564:852`, `564:980`, `564:1232`, `564:1357` | conferir progresso e navegação; etapa 4 deve crescer com a Carta |
| 013 | página FAQ | `169:495` | conferir FAQ, hashes e CTA sem inserir os cards da entrada |
| 014/015 | entrada compartilhada | `425:201` | conferir cards por contexto; e-mail real e copy prevalecem |
| 014 | variantes da jornada | `425:296`, `446:206`, `470:444` | conferir calendário/horário, formulário/revisão e registro sem promessas |
| 016 | transversal, sem rota | sem frame próprio | usa todas as referências acima; nenhuma tela paralela de acessibilidade |

O Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, continua referência potencial de
componentes/tokens, igualmente não consultada nesta rodada. Frames antigos
marcados no mapa continuam não canônicos.

## Adaptações obrigatórias consolidadas

### Etapa 4 expandida — `564:980`

- É uma variante da página 011, não rota/página independente.
- Renderiza cinco grupos e todas as 25 definições aplicáveis do modelo v3.
- Campos abertos preenchidos oferecem cópia; escolhas exibem somente o valor
  escolhido; vazios, coleções e condições K/S/E seguem o contrato 012.
- Altura, repetição e quebras seguem o conteúdo. O frame não impõe máximo de
  linhas, campos ou altura e não autoriza lorem ipsum como dado.
- Estados de sessão vazia/parcial, imagem ausente, cópia pendente/sucesso/falha,
  região indisponível e conteúdo longo precisam existir fora da amostra.

### Formulário real — `2024:269`

- A representação em imagem serve somente como composição visual.
- Labels, inputs, selects, checkboxes, radios, listas CRUD, botões e mensagens
  viram controles HTML/React reais, editáveis e associados.
- Cinco partes, IDs estáveis, condicionais K/S/E, revisão, resumo de erros,
  reordenação por teclado e preservação da sessão não podem ser simplificados
  para reproduzir a imagem.
- Vazio, parcial, erro estrutural, sugestão editorial, storage/loading/falha e
  conteúdo longo são estados obrigatórios ainda sem evidência visual.

### Orientações — `811:306` e `811:382`

- São duas variantes do mesmo Form-Card, com conteúdo da feature 006.
- Abrir ou fechar orientação não altera valor, progresso, revisão ou foco.
- Acionador expõe estado; conteúdo fechado não fica na ordem de foco; label,
  ajuda e erro mantêm associações próprias, sem anúncio repetido por tecla.

### Prévia compartilhada — `821:308`

- 007 e 009 compartilham projeção, markup semântico e regras de ausências.
- O card do frame não define sozinho a página `/previa`.
- Carta vazia, parcial e completa, erros, sugestões, provider carregando/ausente,
  coleções e textos extensos usam o mesmo componente sem truncamento.

## Estados ausentes dos frames

| Grupo | Estados/documentação exigida |
| --- | --- |
| Consulta estática 002–004/006 | asset/fonte indisponível, link externo, orientação, texto longo, foco/hash e reflow |
| Diagnóstico 005 | sem resposta, seleção, progresso, cinco resultados, sessão inválida e reinício |
| Carta 007/008 | vazia/parcial/revisada, orientação, erros/sugestões, listas, condicionais, storage/loading/falha |
| Prévia/CSV 009/010 | provider loading/ausente, vazia/parcial/completa, validar, download pendente/sucesso/falha |
| Tutorial/cópia 011/012 | seis etapas, query inválida, imagem loading/falha, Carta vazia/parcial, K/S/E, cópia pendente/sucesso/falha |
| FAQ/canais 013–015 | FAQ aberta/fechada, hash, ativo/pendente/pausado/indisponível, clipboard pendente/sucesso/falha |
| Agenda 014 | loading/disponível/vazio/erro, data/horário, formulário/erro/revisão, envio pendente/conflito/incerto/expirado/registrado |
| Todos | conteúdo longo, 320–1440 px/intermediárias, orientação, texto/zoom, foco, teclado, anúncios e contraste por estado |

Loading não é vazio; erro não é ausência; revisão não é publicação; sucesso de
cópia/download/registro não prova envio, arquivo salvo ou atendimento. Esses
significados seguem os contratos proprietários.

## Matriz transversal e métodos

A [matriz 016](../../specs/016-responsividade-acessibilidade/accessibility-matrix.md)
agora registra por contexto os estados mínimos e separa evidência visual de:

- foco por `activeElement`, sequência e destino após montagem;
- teclado por operação completa com controles reais;
- anúncios pela árvore acessível e NVDA/VoiceOver;
- contraste por cores computadas/fundo real e razão medida;
- reflow em browser real com overflow/corte/overposição;
- zoom real, tamanho de texto e espaçamento, separados de viewport;
- estados acionados por fixtures/mocks e conteúdo extremo sintético.

Nenhuma dessas dimensões foi marcada como atendida. Screenshot, frame, token,
atributo ARIA isolado ou build não substituem o método correspondente.

## Correções documentais realizadas

- mapa passou a declarar a indisponibilidade de acesso e apontar para este registro;
- plano 016 deixou de dizer que organização/tutorial/suporte/resultado não têm
  frame confirmado e passou a listar todos os nodes já mapeados;
- plano 016 corrigiu a 006 de dez assuntos para três tópicos/13 informações e
  atualizou o estado das dependências 005/017;
- adaptações de `564:980`, `2024:269`, `811:306`/`811:382` e `821:308` foram
  reunidas no plano detalhado;
- accessibility-matrix passou a cobrir páginas/estados e métodos transversais;
- originais dos artefatos alterados foram preservados em `historico/*-pre-t016-*`.

## Aceite documental e pendências

O aceite documental da T016 está atendido: cada página/variante/componente tem
referência identificada ou ausência explícita; estados necessários estão
registrados; links não são tratados como inspeção; métodos não visuais estão
definidos.

Permanecem pendentes para implementação/validação: consulta autenticada de
todos os nodes e Make, revisão visual por estado, ERS, ambientes assistivos,
medições, fluxos reais, rota 003, conteúdo tipado parcial da 011, infraestrutura
017 e execução dos testes. Essas lacunas não reabrem a T016 documental, mas
impedem conformidade ou aceite visual/funcional do produto.

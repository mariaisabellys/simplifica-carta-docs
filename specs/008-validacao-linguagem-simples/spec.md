# Spec: Validação em linguagem simples

> Contrato editorial reconciliado em 19 de outubro de 2026 pela T007 documental. Substitui a regra
> provisória de 240 caracteres e o vocabulário legado.

## Objetivo

Garantir que os textos da Carta de Serviço sejam diretos, acessíveis,
inclusivos e compreensíveis em uma leitura, independentemente do grau de
escolaridade do cidadão. A feature integra o formulário da 007 e não cria uma
página independente.

O validador oferece apoio editorial. Ele não comprova correção factual,
jurídica, acessibilidade integral, aprovação pela GESED nem aceite no Paraíba
Digital.

## Fonte e escopo

Este contrato usa o **Guia de Validação em Linguagem Simples** fornecido para a
feature 008 em 18 de outubro de 2026. A Carta segue o modelo central v3 da 007.
Regras obrigatórias continuam em `carta.validation.ts`; regras editoriais devem
usar motor separado e nunca alterar o texto do usuário.

Aplicar a matriz de 25 campos do [contrato operacional](contrato-validacao-editorial.md),
fonte dos perfis, detecção, mensagens MSG01–MSG17, estados, checklist, medição
e fixtures VE01–VE18. Prazo máximo/unidade e seletores não recebem regras
editoriais; palavras-chave recebem apenas LS03. Custos mistos exigem classificação.
Não analisar labels, exemplos, placeholders, enums ou URLs como prosa.

## Contrato das regras

### LS01 — Comprimento da frase

- Cada frase pode conter no máximo **20 palavras significativas**.
- Artigos, preposições e suas contrações não entram na contagem.
- Até 20 palavras significativas: sem ocorrência de comprimento.
- A partir de 21 palavras significativas: revisão necessária, com orientação
  para dividir a frase em períodos menores.
- Segmentar por pontuação final, preservando abreviações e números quando
  possível; contar palavras com suporte Unicode e comparar tokens completos.

Tokenização, catálogo único de exclusões, limitações lexicais e fixtures seguem o
[contrato compartilhado de contagem](../../docs/arquitetura/contrato-contagem-palavras.md),
consolidado pela T005 em 19/10/2026. Não manter outra lista nesta feature.
LS01 avalia cada frase e nunca bloqueia CSV; o limite estrutural da 007 avalia
a descrição inteira e pode bloquear CSV mesmo que cada frase esteja no limite.

### LS02 — Comprimento do parágrafo

- Cada parágrafo deve ocupar no máximo quatro linhas visuais no campo.
- A recomendação começa na quarta linha; a quinta confirma revisão necessária.
- Como a medição varia com fonte, largura e zoom, o motor textual não deve
  inferir linhas por caracteres. Sem geometria confiável, o resultado é
  inconclusivo, nunca aprovado ou reprovado automaticamente.

### LS03 — Jargões e termos burocráticos

A densidade permitida de termo técnico, jurídico ou administrativo sem
explicação imediata é zero. Detectar somente entradas do catálogo versionado,
indicar o trecho e permitir revisão humana. Somente confirmação humana de
explicação imediata, vinculada ao trecho e à revisão atual, pode resolver a
ocorrência sem editar o termo. Pontuação sozinha não comprova explicação.
Nunca substituir o texto automaticamente. Catálogo `ls-pt-BR-v1` aprovado em
27/10/2026; mudanças exigem nova versão e aprovação.

| Termo ou construção observada | Sugestão contextual |
| --- | --- |
| `utente`, `munícipe` | `cidadão` ou `você` |
| `cominar`, `cominado` | `aplicar` ou `determinar`, conforme o contexto |
| `ex vi`, `a quo`, `ad referendum` | remover ou explicar de forma simples |
| `preambularmente` | `primeiramente` ou `inicialmente` |
| `fica o requerente ciente` | `você precisa saber que` |
| `manifestação de vontade` | `pedido` ou `escolha`, conforme o contexto |
| `efetuar` | `fazer` |
| `providenciar` | `resolver` |
| `requerente` | `solicitar` |
| `protocolar` | `entregar` |
| `pertinente` | `considerar` |
| `consoante` | `seguir` |
| `destarte` | `concluir` |
| `outrossim` | `acrescentar` |
| `doravante` | `adotar` |
| `subsidiar` | `apoiar` |
| `usufruir` | `usar` |
| `imprescindível` | `garantir` |
| `preliminarmente` | `começar` |
| `viabilizar` | `facilitar` |
| `encaminhamento` | `enviar` |
| `disponibilizar` | `oferecer` |
| `ratificar` | `confirmar` |
| `deferir` | `aprovar` |
| `indeferir` | `negar` |
| `conceder` | `liberar` |
| `pleitear` | `pedir` |

O anexo trouxe as duas primeiras entradas em linhas quebradas. Esta leitura
semântica e os pares acrescentados pelo responsável do conteúdo formam o
catálogo aprovado `ls-pt-BR-v1`. Cada novo par foi
registrado exatamente na ordem recebida: primeiro o termo a identificar e,
depois, a sugestão. A implementação deve ignorar caixa, comparar palavras ou
construções inteiras e nunca substituir automaticamente.

### LS04 — Voz ativa

Priorizar `sujeito + verbo + objeto`. Construções passivas reconhecíveis geram
orientação, não prova gramatical completa.

- A revisar: “Os documentos deverão ser encaminhados pelo requerente.”
- Recomendado: “Você deve enviar os documentos.”

### LS05 — Tratamento direto

Priorizar `você` ou imperativo direto e evitar tom excessivamente formal ou
impessoal.

- A revisar: “O utente necessita comprovar residência.”
- Recomendado: “Você precisa comprovar seu endereço.”

### LS06 — Hierarquia da informação

A primeira frase deve trazer a resposta principal ou o dado mais importante do
campo, como finalidade, prazo ou custo. Como relevância semântica não é segura
por regex, esta regra será checklist de revisão humana até existir classificador
validado.

## Estados e decisão

| Estado | Condição | Efeito |
| --- | --- | --- |
| `aprovado` | Todas as análises necessárias atuais e checklist concluído, ao menos um alvo aplicável, sem review, falha ou inconclusivo. | MSG09; não comprova completude da Carta. |
| `revisao-necessaria` | Review ou checklist pendente. Heurísticas LS04/LS05 geram guidance e exigem confirmação humana. | MSG13, com alvos e mensagens específicas. |
| `falha` | Erro em análise necessária. | MSG10; manter ocorrências encontradas e permitir continuar. |
| `inconclusivo` | Análise necessária indisponível, inclusive geometria/catálogo/classificação. | MSG11; nunca inferir aprovação. |
| `nao-analisado` | Texto novo/editado aguardando análise. | MSG12 para edição; resultado anterior invalidado. |
| `nao-aplicavel` | Nenhum alvo textual aplicável. | MSG14; não aprova Carta vazia. |

Ausência de ocorrências automáticas não garante clareza total. Precedência,
confirmações humanas, expiração após edição e regras de layout estão no contrato
operacional. LS04/LS05 não são classificadores gramaticais completos; LS06 é manual.

## Comportamento e integração

- Análise local, determinística, sem IA, backend, logs ou envio externo.
- Cada resultado contém regra, severidade, campo/item, trecho e mensagem.
- Executar após blur do campo alterado e na revisão explícita, não a cada tecla.
- Atualizar resultados obsoletos sem modificar a Carta.
- Sugestões não bloqueiam edição, navegação, prévia, cópia ou CSV; somente
  regras estruturais/obrigatórias podem bloquear a exportação.
- Exibir mensagens no campo e em resumo acessível, sem depender apenas de cor e
  sem usar `aria-invalid` para sugestão editorial.
- Preservar acentos, quebras, HTML literal e redação original.

## Fora de escopo

- Reescrita automática, corretor completo, avaliação jurídica ou factual.
- Nota, percentual de clareza ou certificado de aprovação.
- Inferir linhas por caracteres ou prometer detecção completa de linguagem.

## Critérios de aceite

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CA01 | Frase com 20 palavras significativas, além de artigos e preposições. | Sem ocorrência de comprimento; palavras desconsideradas não entram na contagem. |
| CA02 | Frase com 21 palavras significativas. | Revisão necessária com frase, campo e total contabilizado. |
| CA03 | Token semelhante a artigo/preposição, mas ausente do catálogo. | Contabilizar como palavra significativa; excluir somente tokens versionados. |
| CA04 | Parágrafo ocupa cinco linhas reais. | Revisão; sem layout mensurável, resultado inconclusivo. |
| CA05 | Termo do catálogo com caixa diversa ou Unicode NFC/NFD equivalente. | Detectar construção inteira; preservar acentos, não inferir flexões nem variantes sem acento. |
| CA06 | Termo técnico tem explicação. | Somente confirmação humana vinculada à revisão resolve ocorrência; pontuação sozinha não resolve. |
| CA07 | Passiva reconhecível. | Sugerir voz ativa sem prometer análise completa. |
| CA08 | Texto usa você ou imperativo. | Não gerar falso alerta de impessoalidade. |
| CA09 | Relevância da primeira frase é incerta. | Mostrar checklist, sem decisão automática falsa. |
| CA10 | Sem review, checklist concluído e todas as análises necessárias atuais/disponíveis. | `aprovado` apenas no escopo avaliado, com pelo menos um alvo aplicável. |
| CA11 | Existe review ou checklist pendente. | `revisao-necessaria` com alvo e orientação. |
| CA12 | Usuário ignora sugestão. | Preservar texto e permitir ações estruturalmente válidas. |
| CA13 | Item é alterado/reordenado/removido. | Atualizar resultado pelo ID estável correto. |
| CA14 | Revisão por teclado/leitor de tela. | Anunciar resumo uma vez e permitir localizar o campo. |
| CA15 | Análise necessária falha/indisponível ou texto editado. | Falha/inconclusivo/não analisado; nunca manter aprovação obsoleta. |
| CA16 | Dois parágrafos curtos ou campo com padding/altura mínima. | Medir cada bloco; não usar altura total como número de linhas. |
| CA17 | Seletor, palavras-chave, custo misto e prazo estruturado. | Aplicar apenas regras da matriz; classificação ambígua fica inconclusiva. |
| CA18 | Catálogo ausente/versão incompatível, flexões ou construções sobrepostas. | Resultado inconclusivo sem catálogo aprovado carregado; comparação e deduplicação conforme contrato. |

## Dependências

- 007: modelo central, campos, IDs e pontos de exibição.
- 009, 010 e 012: preservar texto e não transformar sugestões em bloqueio.
- 016: reflow, medição visual, foco, contraste e anúncios acessíveis.

# Contrato operacional da validação editorial

Versão documental 1 — 19/10/2026, T007 global. Complementa a [spec](spec.md)
e utiliza o [contrato único de contagem](../../docs/arquitetura/contrato-contagem-palavras.md).
Não implementa motor, não aprova catálogo institucional nem altera a Carta.

## Catálogo: estado e correspondência

O catálogo normativo proposto é a tabela LS03 da spec, preservada integralmente:
seis linhas originais e 21 pares adicionais. **Aprovação editorial pendente
(V008-01)**: os pares enviados são requisitos registrados, não evidência de
homologação. Não ativar LS03 em produção antes de responsável/data/versão aprovados.
Não reverter silenciosamente ao catálogo legado de 240 caracteres.

Todos os pares são sugestões contextuais, nunca substituições automáticas.
Especial atenção a requerente → solicitar, pertinente → considerar,
consoante → seguir, destarte → concluir, outrossim → acrescentar,
doravante → adotar, imprescindível → garantir, preliminarmente → começar e
encaminhamento → enviar: exigem reescrever a construção, não trocar um token.
Providenciar → resolver e conceder → liberar também dependem do sentido;
não presumir equivalência jurídica. Preservar pares até decisão explícita.

Detecção proposta para a implementação após aprovação:

1. Analisar cópia NFC e minúsculas pt-BR, mantendo acentos. Comparar tokens
   inteiros segundo o tokenizador compartilhado, não substring ou `\b` ASCII.
   `EFETUAR` corresponde a `efetuar`; `manifestacao` não corresponde a
   `manifestação`. Variantes sem acento só com entrada explícita futura.
2. Não derivar flexões, plurais ou radicais: `efetuou` não corresponde a
   `efetuar`. `cominar` e `cominado` já são variantes explícitas. Novas variantes
   exigem versionamento e revisão do catálogo, não regex ampla improvisada.
3. Construções usam sequência contígua de tokens com apenas espaço/quebra
   entre eles. `fica o requerente ciente` corresponde, inclusive espaços extras;
   `fica o requerente. Ciente` não. Não atravessar pontuação ou frases.
4. Em sobreposição da mesma regra, preferir a construção mais longa; empate
   pela ordem da tabela. Assim, a construção inteira suprime o alerta isolado
   de `requerente` naquele intervalo. Repetições em intervalos distintos ficam.
5. Deduplicar por versão da regra + alvo estável + revisão do texto + intervalo
   original + entrada. Regras diferentes não são deduplicadas entre si.
6. Manter mapa de offsets da cópia normalizada para o original (inclusive NFD).
   Trecho exibido é sempre literal. Se o intervalo não puder ser mapeado com
   segurança, reportar inconclusivo, não destacar texto errado nem alterar dados.

## Matriz campo × regra

IDs e paths completos pertencem à [matriz v3](../007-formulario-carta-servico/matriz-campos-v3.md).
Uma linha abaixo por definição (25), não por instância de documento/etapa.
Perfis: **N** = LS03; **P** = LS01–LS06; **M** = classificar antes; **X** =
nenhuma regra editorial. LS04–LS06 em P incluem confirmação humana.
LS03 inclui checklist de jargão não catalogado; detectar catálogo não prova
ausência de todos os termos técnicos. N não exige frase, voz ou hierarquia.

| Nº | ID editorial | Perfil | Aplicação/justificativa |
| --- | --- | --- | --- |
| 01 | `service-name` | N | Nome curto, não prosa. |
| 02 | `popular-name` | N | Nome alternativo, não prosa. |
| 03 | `service-description` | P | Descrição; limite estrutural do campo inteiro permanece na 007. |
| 04 | `category` | X | Catálogo fechado. |
| 05 | `subcategory` | X | Catálogo fechado. |
| 06 | `topic` | N | Assunto curto em texto livre. |
| 07 | `active` | X | Booleano; semântica MC-05 não é validação editorial. |
| 08 | `specific-audience` | X | Seleções. |
| 09 | `user-profile` | X | Seleções. |
| 10 | `who-can-use` | P | Prosa explicativa; público em terceira pessoa pode ser adequado. |
| 11 | `required-documents` / filho `document-name` proposto | N | Nome por item, não analisar ID técnico. |
| 12 | `costs-and-fees` | X | Seleção. |
| 13 | `cost-value-or-link` | M | Somente quando custo não gratuito; ver classificação abaixo. |
| 14 | `maximum-deadline` | X | Valor estruturado textual; semântica MC-03 pertence à 007. |
| 15 | `deadline-type` | X | Unidade selecionada, não prosa. |
| 16 | `step-title` | N | Título curto; orientação de imperativo vem da 006. |
| 17 | `citizen-guidance` | P | Ação/explicação ao cidadão por etapa. |
| 18 | `modality` | X | Seleção. |
| 19 | `requires-scheduling` | X | Escolha booleana. |
| 20 | `scheduling-type` | X | Seleções condicionais. |
| 21 | `scheduling-system` | X | Seleção condicional. |
| 22 | `scheduling-link` | X | URL, não prosa; formato pertence à 007. |
| 23 | `scheduling-display` | X | Seleção condicional. |
| 24 | `important-additional-information` | P | Prosa complementar. |
| 25 | `keywords` | N | Lista lexical, não exigir frases/voz/hierarquia. |

M: valor reconhecível como URL HTTP(S) absoluta inteira, ou valor monetário
isolado no formato `35`, `35,00`, `R$ 35,00`, é X. Formatos aceitos para essa
classificação documental: dígitos, agrupamentos de milhar por ponto opcionais,
decimal por vírgula de duas casas opcional, prefixo R$ opcional. Não validar o
valor de negócio aqui. Texto como “Consulte a tabela de taxas” é P; texto misto
com URL ou valor embutido não é classificado automaticamente como prosa pura:
marcar classificação inconclusiva e pedir revisão humana, sem “aprovado”.
Outros formatos numéricos ambíguos também ficam inconclusivos, não rejeitados.
Classificação é local à 008, não restrição nova no formulário.

Campo vazio ou condicional inativo: não aplicável, não aprovado. Não analisar
labels, exemplos, valores de catálogo, dados ocultos retidos, HTML renderizado
ou texto agregado do CSV. Se não houver alvo textual aplicável, estado agregado
“não aplicável”, não certificado de aprovação da Carta.

## Regras automáticas, heurísticas e humanas

- **LS01:** automático por frase, no máximo 20 significativas; CP01–CP13 da
  T005 são compartilhadas. Segmentar com Intl.Segmenter pt-BR; fallback só
  habilitado após fixtures equivalentes para abreviações, decimais e pontuação.
  Sem segmentador confiável, LS01 inconclusiva, sem usar o campo inteiro como frase.
- **LS02:** geométrica por parágrafo; até três linhas sem ocorrência, quatro
  linhas guidance, cinco ou mais review. Não contar caracteres como linhas.
- **LS03:** correspondência automática do catálogo gera review até edição ou
  confirmação humana de explicação imediata/termo necessário explicado. Não
  inferir explicação pela mera presença de parênteses, dois-pontos ou “ou seja”.
  Usuário indica trecho da explicação na mesma frase ou na frase imediatamente
  seguinte do mesmo parágrafo e confirma clareza/necessidade. Guardar referência
  e decisão em memória vinculadas à revisão; isso é avaliação humana, não
  comprovação semântica. Confirmação genérica “ignorar” não resolve a ocorrência.
  Checklist também pergunta se há outros termos técnicos sem explicação.
- **LS04:** heurística limitada a sequência de forma de ser + particípio do
  vocabulário explícito: ser/é/são/foi/foram/será/serão/seria/seriam/sendo/sido e
  enviado/encaminhado/realizado/solicitado/exigido (variantes a/os/as explícitas
  desses cinco particípios). Apenas tokens adjacentes separados por espaço;
  gerar guidance “possível voz passiva”. Não tentar cobrir passiva sintética ou
  toda conjugação. “Você deve enviar” não corresponde. “É necessário” não
  corresponde. A regra não prova voz ativa quando nada encontra.
- **LS05:** heurística limitada às construções “fica o requerente ciente”,
  “o utente”, “o munícipe”, com a mesma política de tokens/acentos de LS03.
  Guidance contextual; ausência de “você” não é ocorrência. Imperativo e
  identificação de público em terceira pessoa não são erros automáticos.
- **LS04/LS05:** confirmação humana por campo P: voz ativa quando adequada e
  tratamento compreensível/direto. “Não” gera review; “a revisar” mantém pendência.
  Texto nominal/informativo pode ser confirmado como adequado com justificativa
  contextual; não forçar “você” em toda frase. Guidance reconhecida como falso
  positivo fica registrada/resolvida para aquela revisão, sem remover catálogo.
- **LS06:** exclusivamente manual por campo P: “A primeira frase apresenta a
  informação principal deste campo?” Resposta sim/não/a revisar. Não gera nota
  automática; não confirma fato, prazo ou valor. Para adicionais, informação
  principal é a orientação complementar, não repetir o nome do serviço.

## Validade, severidades e estados

Resultado por regra tem estado `ok`, `guidance`, `review`, `pending`, `unknown`,
`error` ou `not-applicable`. Alvo = path ou coleção + ID estável + propriedade.
Guardar revisão do texto, versão de regras/catálogo, condição de aplicabilidade
e revisão de layout para LS02. Checklist/explicações ficam em memória fora da Carta.

Editar texto invalida imediatamente todas as regras/checklists desse alvo;
não conservar “aprovado” até blur. Mudar regra/catálogo invalida alvos afetados.
Inativar campo remove resultado do agregado; reativar exige revisão nova.
Reordenar preserva resultado por ID se texto/condições não mudaram; remover
descarta. Alteração de layout invalida só LS02, não confirmações semânticas.
Resultado assíncrono com revisão antiga é descartado.

Precedência do agregado, mantendo lista de todas as ocorrências:

1. `falha`: alguma análise necessária retornou error.
2. `inconclusivo`: alguma necessária está unknown (geometria, classificação,
   segmentação ou catálogo indisponível/não aprovado).
3. `revisao-necessaria`: review ou checklist pending.
4. `nao-analisado`: alvos aplicáveis novos/editados aguardam análise.
5. `aprovado`: ao menos um alvo aplicável, todas as análises necessárias atuais,
   nenhum review/pending/unknown/error e checklist concluído; guidance de LS02
   pode permanecer. Aprovação só editorial, limitada ao escopo exibido.
6. `nao-aplicavel`: nenhum alvo textual aplicável.

Falha/inconclusivo não apagam reviews já encontrados. Edição de um alvo impede
aprovação agregada enquanto aguarda análise. LS04/LS05 exigem confirmação humana
mesmo sem guidance. “Continuar sem revisar” permite a ação, mas não resolve review.
Nenhum desses estados bloqueia edição, navegação, prévia, cópia ou CSV: só a
validação estrutural da 007 controla suas próprias restrições.

## Mensagens versionadas — propostas editoriais v1

| ID | Mensagem/template | Uso |
| --- | --- | --- |
| MSG01 | Esta frase tem {count} palavras significativas. Use até 20 e divida a frase, se necessário. | LS01 review |
| MSG02 | Este parágrafo ocupa quatro linhas. Considere dividi-lo. | LS02 guidance |
| MSG03 | Este parágrafo ocupa {lines} linhas. Divida-o em blocos de até quatro linhas. | LS02 review |
| MSG04 | Revise “{term}”. Sugestão contextual: {suggestion}. Adapte a frase sem mudar seu sentido. | LS03 review |
| MSG05 | Este trecho pode estar na voz passiva. Verifique se é possível dizer quem faz a ação. | LS04 guidance |
| MSG06 | Considere falar diretamente com o cidadão ou usar uma orientação direta. | LS05 guidance |
| MSG07 | A primeira frase apresenta a informação principal deste campo? | LS06 checklist |
| MSG08 | Não encontramos ocorrências automáticas nas regras avaliadas. Conclua a revisão manual. | Automático sem ocorrência, checklist pendente |
| MSG09 | Revisão editorial concluída para os textos avaliados. Isso não comprova completude ou aprovação da Carta. | Agregado aprovado |
| MSG10 | Não foi possível concluir esta análise. Tente revisar novamente; você pode continuar preenchendo. | Falha |
| MSG11 | Esta análise está inconclusiva: {reason}. Não podemos confirmar este resultado. Você pode continuar. | Inconclusivo |
| MSG12 | O texto mudou. Revise novamente para atualizar o resultado. | Não analisado após edição |
| MSG13 | Ainda há pontos para revisar. As sugestões não impedem continuar. | Review/checklist pendente |
| MSG14 | Não há texto aplicável a esta revisão. | Não aplicável |
| MSG15 | Há termos técnicos sem explicação clara neste campo? | LS03 manual: Não confirma ausência; Sim gera review |
| MSG16 | A voz usada está adequada e deixa claro quem faz a ação? | LS04 manual |
| MSG17 | O texto se dirige ao público de forma clara e adequada ao campo? | LS05 manual |

Razões MSG11 limitadas a códigos versionados: geometria indisponível, fonte
carregando, segmentação indisponível, classificação pendente, catálogo pendente,
intervalo não mapeado. Não mostrar stack trace ou conteúdo sensível em logs.
Placeholders são texto escapado; nunca HTML interpretado. Estas mensagens estão
definidas documentalmente, mas aprovação editorial da copy ainda é V008-03.

## Medição de parágrafos

Parágrafo textual = bloco não vazio separado por uma ou mais quebras de linha
(CRLF normalizado só na cópia). Quebra visual automática não cria parágrafo.
Linhas em branco não contam. Medir cada bloco, não a altura total do campo.

Não usar simplesmente scrollHeight/lineHeight: inclui padding, min-height,
rolagem e vários parágrafos. Para input/textarea, usar espelho não interativo,
fora da árvore acessível, com texto literal, largura interna, fonte, peso,
line-height, espaçamento, white-space e quebra equivalentes ao campo; sem
padding/min-height na medida dos blocos. Textarea com scrollbar deve reproduzir
a largura útil real; auto-resize/altura do controle não altera número de linhas.
Input de linha única usa espelho com quebra na largura disponível, explicitando
na UI que é projeção de leitura, não a linha horizontal rolável do input.

Contar linhas renderizadas do bloco por geometria de caixas de linha, ou altura
do bloco/line-height numérico se validado em navegador; razão próxima de inteiro
com tolerância máxima de 0,1 linha. Ambiguidade fora da tolerância é unknown,
não arredondamento que transforme cinco em quatro. Definir evidência da técnica
escolhida em F008-06. Texto oculto, largura zero, painel desmontado, fonte pendente,
line-height não resolvido ou medição não equivalente: unknown.

Reavaliar após render estável, fontes prontas, largura/resize, zoom, ampliação
de texto e abertura do campo. Invalidar resultado antigo primeiro. Não forçar
usuário a abrir todos os campos para navegar; resumo pode indicar análise
inconclusiva e oferecer abrir/reavaliar. Resultado de uma largura não prova outra.
Se fonte falhar e fallback estabilizar, medir fallback real e registrar contexto.

## Fixtures e evidência futura

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| VE01 | CP01–CP13, duas frases de 11 | Mesma contagem; 008 sem excesso, 007 pode impedir CSV pela descrição inteira. |
| VE02 | EFETUAR / efetuou / manifestação NFD / manifestacao | Caixa e NFC correspondem; flexão/sem acento não. |
| VE03 | fica o requerente ciente; termo repetido depois | Um alerta da construção + ocorrência posterior, não duplicata interna. |
| VE04 | ex vi / ex. vi / efetuar em palavra maior | Só construção inteira contínua corresponde. |
| VE05 | Jargão seguido de parênteses sem explicação | Review permanece até confirmação humana específica válida. |
| VE06 | Explicação confirmada, depois texto editado | Confirmação inválida; revisão nova requerida. |
| VE07 | deverão ser encaminhados / Você deve enviar / É necessário | Só primeiro gera guidance LS04; checklist manual ainda requerido. |
| VE08 | Consulte o resultado / Estudantes matriculados | Ausência de você não gera alerta LS05. |
| VE09 | Seletores, URL, prazo máximo, palavras-chave | X sem regras; palavras-chave só LS03. |
| VE10 | Custo: R$ 35,00 / Consulte a tabela / texto com URL | X / P / inconclusivo, sem alterar valor. |
| VE11 | Dois parágrafos de três linhas cada | Sem review LS02; total seis não reprova. |
| VE12 | Quatro/cinco linhas, padding/min-height e scrollbar | Guidance/review pelas linhas do bloco, não altura do controle. |
| VE13 | Campo oculto, zoom, fonte carregando, reabertura | Inconclusivo até nova geometria válida, nunca aprovação por ausência. |
| VE14 | Sem ocorrências mas checklist pendente/erro/unknown | Revisão/falha/inconclusivo respectivamente, nunca aprovado. |
| VE15 | Editar, reordenar, remover e inativar item | Revisões e IDs seguem o contrato, sem resultado no alvo errado. |
| VE16 | Ignorar sugestão e copiar/exportar | Texto original intacto; bloqueios somente estruturais. |
| VE17 | Revisão explícita por teclado/leitor | Anúncio único, resumo por ordem da Carta, abrir/focar alvo correto. |
| VE18 | Catálogo não aprovado ou segmentador indisponível | Inconclusivo para regra necessária; não usar legado silenciosamente. |

São resultados esperados, não testes executados nesta tarefa. A prontidão
documental é separada da homologação editorial, implementação e aceite funcional.

# Contrato da exportação CSV v3

19/10/2026 — T009 documental. Fontes: [matriz central](../007-formulario-carta-servico/matriz-campos-v3.md),
[prévia v3](../009-previa-html/contrato-projecao-v3.md), tipos/schema/catálogos,
`carta.csv.ts`, `carta.validation.ts` e `src/lib/csv.ts` atuais.
Contrato normativo local de formato; não homologação de importação no Paraíba Digital.

## Artefato e contagem

Arquivo `simplifica-carta.csv`, MIME `text/csv;charset=utf-8`, UTF-8 com um BOM
U+FEFF adicionado somente na composição do Blob. Serializador genérico não
adiciona BOM. Vírgula fixa; todas as células entre aspas duplas, aspas internas
duplicadas; CRLF entre registros e no final. Preservar CR, LF e CRLF internos.
Sem linha sep=, metadados, versão, IDs internos ou cabeçalhos extras.

Cabeçalho lógico: duas células `campo` e `valor`. A matriz abaixo define **22
registros de dados + 1 cabeçalho = 23 registros lógicos**, sempre duas colunas.
CRLF final não gera registro vazio; LF dentro de uma célula não é novo registro.
Testes devem derivar contagem e ordem da matriz, além de comparar todas as chaves,
não usar split por linhas ou apenas um número fixo para comprovar cobertura.

## Matriz única: ordem, identificador, fonte e representação

**A** = sempre; **K** = custo sob-consulta/com-taxa; **S** = exigeAgendamento true;
**E** = S e sistema-agendamento sistema-externo. Manter registro inativo com valor
vazio, nunca remover linha nem transferir valor retido. Não exportar mensagens
da prévia, obrigatoriedade, revisão editorial ou checklist de preparação.

| Ordem | Identificador | Paths v3 | Condição | Representação |
| --- | --- | --- | --- | --- |
| 01 | `nome` | `sobreServico.nome` | A | Texto. |
| 02 | `nome_popular` | `sobreServico.nomePopular` | A | Texto. |
| 03 | `descricao` | `sobreServico.descricao` | A | Texto. |
| 04 | `categoria` | `sobreServico.categoria` | A | Rótulo selecionado ou vazio. |
| 05 | `subcategoria` | `sobreServico.subcategoria` | A | Rótulo selecionado ou vazio. |
| 06 | `topico` | `sobreServico.topico` | A | Texto livre. |
| 07 | `ativo` | `sobreServico.ativo` | A | true → Sim; false → Não, sem inferir confirmação/publicação. |
| 08 | `publicos_especificos` | `publicoRequisitos.publicosEspecificos` | A | Rótulos na ordem recebida, unidos por LF. |
| 09 | `perfis_usuario` | `publicoRequisitos.perfisUsuario` | A | Rótulos na ordem recebida, unidos por LF. |
| 10 | `quem_pode_utilizar` | `publicoRequisitos.quemPodeUtilizar` | A | Texto. |
| 11 | `documentos` | `publicoRequisitos.documentos[].nome` | A | Nomes na ordem recebida, unidos por LF; regra de lista abaixo. |
| 12 | `custo` | `publicoRequisitos.custo.tipo` | A | Gratuito / Sob consulta / Com taxa; null vazio. |
| 13 | `detalhe_custo` | `publicoRequisitos.custo.detalhe` | K | Texto, inclusive zero ou URL; sem conversão monetária. |
| 14 | `prazo` | `publicoRequisitos.prazo.maximo`; `publicoRequisitos.prazo.tipo` | A | Máximo textual + espaço + rótulo da unidade, só partes presentes. |
| 15 | `etapas` | `etapas[].titulo`; `etapas[].orientacaoCidadao`; `etapas[].modalidade` | A | Blocos com número atual, título, orientação e modalidade, conforme regra abaixo. |
| 16 | `exige_agendamento` | `atendimento.exigeAgendamento` | A | true → Sim; false → Não; null vazio. |
| 17 | `tipos_agendamento` | `atendimento.tiposAgendamento` | S | Online / Presencial, na ordem recebida, unidos por LF. |
| 18 | `sistema_agendamento` | `atendimento.sistemaAgendamento` | S | Paraíba Digital / Outro sistema ou site; null vazio. |
| 19 | `link_agendamento` | `atendimento.linkAgendamento` | E | Texto integral, sem acesso externo. |
| 20 | `exibicao_agendamento` | `atendimento.exibicaoAgendamento` | E | Dentro do Paraíba Digital / Em uma nova página; null vazio. |
| 21 | `informacoes_adicionais` | `informacoesFinais.informacoesAdicionais` | A | Texto. |
| 22 | `palavras_chave` | `informacoesFinais.palavrasChave` | A | Texto original, não separar/reescrever termos. |

São as 25 definições da matriz central agregadas em 22 registros: prazo agrega
dois campos; etapas agregam três por item. Ordem da etapa é atributo técnico
usado na apresentação, não registro separado; IDs/versão não são dados exportados.
Não criar campos removidos por compatibilidade com exemplos históricos.

## Texto, listas, ausências e escolhas

Texto vazio ou só espaços produz célula vazia. Texto útil retorna a string
original integral, inclusive espaços ao redor, quebras e acentos. Teste de
ausência não autoriza trim no texto devolvido. Não inserir “Não informado”.

Documentos: manter todos os nomes úteis e sua ordem; nomes sem texto útil não
geram valor fictício nem classificação Obrigatório/Opcional. Omitir item
inteiramente vazio não perde informação de usuário; a prévia identifica esse
item para edição. Não inferir dispensa de documentos da célula vazia.

Etapas: manter item se título, orientação ou modalidade tiver valor. Não filtrar
item só por orientação vazia. Para cada item útil, produzir bloco:

```text
Etapa {ordem}
Título: {titulo}
Orientação ao cidadão: {orientacaoCidadao}
Modalidade: {rotuloModalidade}
```

Componentes ausentes ficam vazios após seus rótulos; não inventar conteúdo.
Unir linhas do bloco por LF e blocos por dois LF. Strings internas permanecem
integrais. Omitir etapa totalmente vazia, preservando número atual das demais,
sem renumerar subconjunto ou ordenar/mutar fonte. Uma etapa só com modalidade
é exportada. Regras estruturais por item pertencem à 007 (MC-04), não à 010.

Representações agregadas são para leitura, não serialização reversível de itens:
um LF digitado pode se confundir com separador. Não prometer importador por split
LF, preservação de IDs ou reconstrução de estrutura. O parser CSV deve recuperar
a célula completa; nenhuma parte textual útil pode ser truncada. Não usar JSON/HTML.

Multisseleções mantêm ordem recebida, alinhada à prévia T008; esta decisão substitui
a ordenação fixa Online/Presencial de planos antigos. Não deduplicar nem corrigir
valores inválidos durante exportação: formato seguro/validação defensiva da 007
deve preceder o mapeamento. Rótulos vêm do conteúdo/catálogos, não enums internos.

Prazo parcial tem regra de formatação testável, mas exportação integrada deve
continuar bloqueada se máximo/unidade obrigatório estiver ausente. Não converter
Imediato em zero ou inventar unidade (MC-03). Custo zero não implica Gratuito.
Ativo false é exportado como Não, com aviso de que o v3 não registra confirmação
da escolha; não equivale a serviço publicado ou inativo no sistema externo.
MC-05 permanece decisão de produto, não resolvida pela representação booleana.

## Snapshot e validação

Clique explícito captura cópia independente de **todos** os grupos e arrays:
sobreServico; publicoRequisitos com públicos/perfis/documentos/custo/prazo;
etapas; atendimento com tipos; informacoesFinais. Congelar nos testes; não mutar
nem reusar referências mutáveis do provider. Registrar revisão da captura.

A validação estrutural da **007** avalia essa captura antes da formatação.
Usar sua lista de dez obrigatórios gerais e cinco condicionais, relações e
limites vigentes; não replicar um segundo catálogo local ou apenas contar campos.
Helper atual retorna array e ainda tem lacunas defensivas/contagem total.
Adaptação futura deve distinguir resultado disponível com/sem erros e falha;
exceção não equivale a ausência de erros. Erro/falha impede Blob/URL/download.

008 não fornece obrigatoriedade. Guidance, review, checklist pendente, falha ou
inconclusivo editorial nunca bloqueiam exportação estruturalmente válida.
Validar a prévia ou estado cacheado não substitui validar o snapshot exportado.
Edição posterior não altera operação em curso; nova tentativa captura revisão nova.
Editar invalida aviso blocked antigo sem acionar download automaticamente.

Pipeline: captura → validação estrutural → matriz/formatadores → proteção
candidata de fórmulas → quoting CSV → Blob com BOM → solicitação de download.
Se segurança ainda não aprovada para uma entrega pública, registrar dependência
da release; isso não é um novo bloqueio editorial de dados do usuário.

## Política de fórmulas — candidata, não homologada

Manter candidato existente: avaliar cada **célula final de valor**, após agregação
e antes de quoting; cabeçalho/identificadores são constantes. Em cópia NFKC de
detecção, remover prefixo dos intervalos U+0000–U+0020, U+007F–U+00A0, U+1680,
U+180E, U+2000–U+200F, U+2028–U+202F, U+205F, U+2060–U+206F, U+3000, U+FEFF.
Se prefixo contiver TAB/CR/LF ou próximo caractere for =/+/-/@, acrescentar
apóstrofo U+0027 ao **valor original inteiro**. Vazio não recebe prefixo.
Normalização é só para detecção; negativos legítimos também são protegidos,
não bloqueados. Contar células modificadas, não termos/itens.

Se lista começar com texto seguro e contiver sinal em linha interna, o quoting
deve manter tudo na mesma célula; não prefixar cada linha como se fosse célula
nova. Testar payload de aspas/delimitador para impedir quebra da estrutura CSV.
Exportar fonte original novamente não pode acumular prefixos de tentativas anteriores.

Quoting sozinho não neutraliza fórmulas. A OWASP alerta para reativação após
salvar/reabrir e ausência de estratégia universal. Por isso, apóstrofo permanece
candidato, não selo de segurança; avaliar alternativas como TAB sem adotá-las
silenciosamente. [OWASP CSV Injection](https://community.owasp.org/attacks/CSV_Injection),
consultada em 19/10/2026. Consulta não substitui execução em Excel/Calc.

Antes de liberar: testar abertura padrão, importação como Texto e salvar/reabrir
em Excel desktop e LibreOffice Calc, com versões/locale/opções registrados.
Falha em caminho suportado exige revisar política, copy e contrato/retestar;
não encobrir falha recomendando importação como Texto e anunciar segurança universal.
Aviso proposto: “O CSV pode acrescentar um marcador de texto a valores que possam
ser interpretados como fórmulas. Os dados da Carta não são alterados.”
Não prometer igualdade byte a byte do arquivo protegido com texto original.

## Download e limites

Nome fixo, sem dados do usuário no caminho. Ação local em /previa, sem rota nova,
backend, logs de valores ou envio externo. Trava síncrona por operação antes da
captura; liberar em sucesso/falha, evitando reentrada durante processamento.
Estados: idle, processing, blocked (estrutura), failed, started. Started significa
solicitação ao navegador, não arquivo salvo/aberto nem publicação confirmada.

Anchor temporária removida em finally. URL de objeto revogada em falha antes
do clique; após clique, 60 segundos é prazo candidato a verificar em browsers,
com limpeza gerenciada além do ciclo da página para permitir navegação imediata.
Não revogar prematuramente ao desmontar o componente. Repetições devem liberar
recursos, preservar sessão e permitir retry. Falha de storage não impede usar
snapshot válido em memória. Tutorial/cópia/ajuda/edição não dependem de exportar.

Meta futura: até 5 s até Blob pronto, sem incluir diálogo/salvamento do navegador,
50 documentos + 100 etapas e até 1 MiB de texto UTF-8 distribuído pelos campos v3.
Sem coleção de canais. Medir rodada fria + 10 repetições, máximo/mediana e etapas
do pipeline em desktop/mobile reais, sem dados pessoais. Responsividade é requisito
separado: orçamento candidato de tarefa contínua 50 ms. Se exceder, revisar fluxo
com preparação assíncrona e segundo gesto Baixar CSV, invalidando artefato preparado
quando revisão mudar; não implementar mudança silenciosa nem truncar texto.
2 MiB é investigação de limite, não nova garantia de produto.

## Divergências do código atual

Reconciliação com as 17 linhas históricas: retirados `criterios`, `canais` e
`orientacao_agendamento`; acrescentados `categoria`, `subcategoria`, `topico`,
`ativo`, `publicos_especificos`, `perfis_usuario`, `detalhe_custo` e `palavras_chave`.
`publico_alvo` foi substituído por `quem_pode_utilizar` e
`informacoes_complementares` por `informacoes_adicionais`. Assim, 17 − 3 + 8 = 22;
as duas substituições de nome não alteram a cardinalidade. Isso não migra arquivos
anteriores nem promete compatibilidade de importação. Prazo/custo/documentos/etapas
também mudaram de estrutura, conforme matriz e regras acima.

| Área | Observado | Contrato futuro |
| --- | --- | --- |
| Registros | Helper já tem 22 dados, não oito nem 17. | Manter chaves/ordem da matriz. |
| Escolhas | Custo/sistemas/exibição e sim/nao em valores internos. | Rótulos legíveis/Sim/Não. |
| Etapas | Uma linha concatenada com pontuação. | Blocos explícitos, preservando todos os três campos e número. |
| Ausências | Strings brutas; listas não filtram totalmente vazios. | Teste de ausência sem trim de texto útil; regras de lista acima. |
| CSV genérico | Quoting integral, vírgula, CRLF e escape de aspas já existem. | Preservar essa camada; não declarar proteção contra fórmulas nela. |
| Segurança/arquivo | Sem proteção de fórmulas, BOM/Blob ou download integrado nos helpers lidos. | Pipeline com política verificada, BOM único e ciclo de recursos. |
| Validação | Gerador não chama validação; helper estrutural ainda incompleto. | Orquestração sobre snapshot e validação 007 antes de gerar. |

## Fixtures e resultados esperados — execução futura

| ID | Cenário | Expectativa |
| --- | --- | --- |
| EX01 | 25 campos com sentinelas distintas | 22 chaves na ordem; 23 registros com cabeçalho e duas células cada. |
| EX02 | Aspas, vírgula, CR/LF/CRLF e Unicode | Parser CSV independente recupera células integrais; não contar linhas físicas. |
| EX03 | Opcionais vazios, espaços, texto “0” e defaults | Vazio sem mensagem; texto útil intacto; Ativo Sim/Não sem inferência. |
| EX04 | Documento vazio entre nomes multiline | Preservar nomes úteis/ordem, não classificação fictícia. |
| EX05 | Etapas só título, só orientação, só modalidade e vazia | Três úteis com atributos presentes, vazia omitida e números atuais preservados. |
| EX06 | Prazo parcial/zero; custo gratuito/não gratuito | Formatadores preservam partes; pipeline bloqueia incompletude estrutural; detalhe inativo vazio. |
| EX07 | Sim/Não/null, Online/Presencial/ambos, nativo/externo | S/E corretos; quatro registros condicionais mantidos vazios quando inativos. |
| EX08 | Trocar condições com dados retidos | Nenhum dado inativo exportado ou apagado; nova captura reativa corretamente. |
| EX09 | =1+1, +1, -1, @texto, largura completa e prefixos | Candidato aplicado à célula final; fronteiras dos intervalos testadas; fonte intacta. |
| EX10 | Texto seguro, apóstrofo inicial e sinal no meio de lista | Sem proteção indevida/acumulada; quoting mantém uma célula. |
| EX11 | BOM/Blob e CRLF final | Um BOM nos bytes; nenhum BOM duplicado no cabeçalho ou registro fantasma. |
| EX12 | Alterar fonte após captura e exportar novamente | Primeira operação usa captura antiga íntegra, segunda revisão nova; validação e arquivo da mesma revisão. |
| EX13 | Estrutura falha/erro e editorial review/falha | Estrutura impede Blob; editorial não bloqueia captura estruturalmente válida. |
| EX14 | Reentrada/falha de Blob/URL/click/navegação | Trava/cleanup/retry; sem falso sucesso, memória preservada. |
| EX15 | Excel/Calc abrir/importar/salvar/reabrir | Conferir duas colunas, acentos, multiline e fórmulas como texto; registrar limitações reais. |
| EX16 | Browsers desktop/mobile, teclado/leitor/reflow | Download solicitado, foco e anúncio verdadeiros, sem pressupor salvamento. |
| EX17 | Fixture 1 MiB e 2 MiB investigativo | Medições de bytes/tempo/responsividade separadas, sem truncamento. |

Fixtures são roteiro, não testes executados nesta tarefa. Política de fórmulas,
compatibilidade, UI e pipeline permanecem pendentes de implementação/verificação.

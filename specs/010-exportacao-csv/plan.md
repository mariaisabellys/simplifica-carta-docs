# Plan: Exportacao CSV

## Objetivo e status

Exportar a Carta atual em CSV local a partir da previa, com cobertura de todos
os campos e listas, validacao obrigatoria compartilhada, processamento sem
duplicidade e retorno verdadeiro sobre o acionamento do download.

Este plano prepara `/spec:tarefas`. Nao gera arquivos reais, instala bibliotecas
ou altera codigo. Antes de implementar, criar tarefas e implementation-plan,
confirmar contratos de 007–009, referencias visuais e politica de compatibilidade.

## Fontes e limites

- Spec 010; specs/planos 007–009; specs 011/012/016.
- ADR-002, requisitos textuais do MVP, arquitetura, constitution e regras de IA.
- `src/lib/csv.ts`, `src/features/carta/carta.csv.ts`, schema, validacao,
  tipos, pagina de previa e scripts do projeto.
- Referencia de seguranca consultada:
  [CSV Injection — OWASP](https://community.owasp.org/attacks/CSV_Injection).

A OWASP distingue escape CSV de mitigacao de formulas e alerta que nao existe
estrategia universal para todos os aplicativos e consumidores. Prefixos de
protecao alteram a representacao e precisam de verificacao por ferramenta,
inclusive quando o arquivo e salvo novamente. Este plano nao declara garantia
universal ou testes executados em planilhas.

Nao houve leitura do PDF do ERS ou consulta direta ao Figma nesta etapa.
Decisoes de formato abaixo sao propostas locais, sem homologacao do Paraiba Digital.

## Estado atual

- `criarCsv` usa virgula e LF, escapa aspas, virgula e LF, mas nao trata CR
  isolado, protecao de formulas, codificacao ou download.
- `gerarCsvDaCarta` usa duas colunas campo/valor e omite documentos, etapas,
  canais, nome popular e como agendar.
- Ternario de agendamento atual transformaria null em nao; precisa ser
  conciliado com contrato v2 da 007.
- A previa ainda e placeholder. A 009 planeja slot para acao da 010 e a 008
  planeja retorno obrigatorio complete/failed separado de sugestoes.
- Nao ha framework de testes configurado.

Notas de ausencia das specs 011/016 na spec sao historicas; elas agora existem,
sem representar entrega funcional. Conferir implementacao real antes de integrar.

Configuracoes de agendamento so se aplicam com `exigeAgendamento === true`. Tipo de
agendamento (Online, Presencial ou ambos) e Sistema de agendamento (Paraiba Digital ou
Outro sistema ou site) sao obrigatorios nesse estado. Link do agendamento e Como o
agendamento sera exibido? sao obrigatorios e visiveis somente para Outro sistema ou
site. Dentro do Paraiba Digital mantem o cidadao na experiencia; Em uma nova pagina
redireciona para a URL externa. Paraiba Digital identifica agendamento pelo proprio
sistema, sem link ou forma de exibicao externa.

Ao mudar para Nao/nao informado ou de Outro sistema ou site para Paraiba Digital,
preservar valores previamente preenchidos na mesma sessao, conforme o padrao da 007, sem
apagar silenciosamente. Valores inativos nao sao exibidos, validados como obrigatorios
nem transferidos como configuracao ativa; ao retornar a condicao correspondente, ficam
disponiveis para revisao.

CSV continua com duas colunas campo/valor, agora 17 registros fixos: manter os 13
existentes e inserir tipos_agendamento, sistema_agendamento, link_agendamento e
exibicao_agendamento imediatamente depois de exige_agendamento, antes de
orientacao_agendamento. Campos inativos geram valor vazio; tipos ativos usam Online e/ou
Presencial separados por LF, nesta ordem. Sistema/exibicao usam rotulos da 007.
Validacao compartilhada da 008 impede exportacao se configuracoes obrigatorias ativas
estiverem ausentes/invalidas.

## Contrato proposto do arquivo

### Estrutura e codificacao

- Duas colunas: `campo` e `valor`, com cabecalho e 17 registros em ordem fixa.
- Delimitador virgula, preservando a base existente; sem deteccao por locale
  e sem linha `sep=`, que acrescentaria registro fora do contrato.
- UTF-8 com BOM no inicio do artefato de download; parser de verificacao deve
  reconhecer/remover BOM do primeiro cabecalho.
- Terminadores de registros CRLF e CRLF final. Quebras internas do usuario
  sao preservadas, inclusive CR, LF ou CRLF, dentro de celulas entre aspas.
- Todas as celulas entre aspas duplas; cada aspa interna duplicada. Isso
  simplifica serializacao e preserva duas colunas por registro logico.
- Blob com tipo `text/csv;charset=utf-8`; arquivo `simplifica-carta.csv`.
  Nome fixo evita expor dados ou aceitar caracteres de caminho do usuario.
- Nenhuma linha extra com metadados, mensagens de interface ou resultados
  de validacao. Documentar o contrato no quickstart futuro.

| Ordem | Identificador de campo | Fonte |
| --- | --- | --- |
| 1 | `nome` | `identificacao.nome` |
| 2 | `nome_popular` | `identificacao.nomePopular` |
| 3 | `descricao` | `identificacao.descricao` |
| 4 | `publico_alvo` | `identificacao.publicoAlvo` |
| 5 | `criterios` | `requisitos.criterios` |
| 6 | `documentos` | `requisitos.documentos` |
| 7 | `etapas` | `etapas` |
| 8 | `prazo` | `atendimento.prazo` |
| 9 | `custo` | `atendimento.custo` |
| 10 | `canais` | `atendimento.canais` |
| 11 | `exige_agendamento` | `atendimento.exigeAgendamento` |
| 12 | `tipos_agendamento` | `atendimento.tiposAgendamento`, somente com Sim |
| 13 | `sistema_agendamento` | `atendimento.sistemaAgendamento`, somente com Sim |
| 14 | `link_agendamento` | `atendimento.linkAgendamento`, somente com Sim e sistema externo |
| 15 | `exibicao_agendamento` | `atendimento.exibicaoAgendamento`, somente com Sim e sistema externo |
| 16 | `orientacao_agendamento` | `atendimento.orientacaoAgendamento`, opcional somente com Sim |
| 17 | `informacoes_complementares` | `informacoesComplementares` |

Manter identificadores legados quando existentes. As adicoes e ordem sao
contrato local; nao representam layout de importacao externa. Campos opcionais
ausentes ficam vazios; custo textual `0` permanece `0`. Nao converter texto
em numero, data, formula ou tipo de celula. Importacao com coluna valor como
Texto e orientacao de compatibilidade, sem promessa de tipagem por CSV.

### Listas e valores parciais

Serializar valores de listas em celula multiline, com separador LF entre
itens; quebras existentes dentro da descricao permanecem intactas. Isso e
representacao para leitura, sem garantir reconstruir itens por split de linhas.

- Documento: `{nome} (Obrigatório)` ou `{nome} (Opcional)` quando classificacao
  explicita; null exporta somente nome, sem criar classificacao ficticia.
- Canal: `{tipo traduzido}: {descricao}` quando tipo informado; null exporta
  somente descricao. Traduzir online, presencial, telefone, e-mail e outro
  por mapa versionado, sem expor IDs/metadados.
- Etapa: `{ordem}. {descricao}`, segundo sequencia normalizada da 007.
  Se houver etapa vazia intercalada, manter numero original das preenchidas,
  coerente com a previa, sem renumerar subset como completo.
- Omitir itens sem nome/descricao util, mesmo que tenham apenas tipo ou
  classificacao. Preservar integralmente texto de itens parciais com conteudo.
- Listas sem texto util produzem celula vazia; nao significam ausencia de exigencia.
- Agendamento true = `Sim`, false explicito = `Não`, null = vazio. Valores
  legados precisam passar pelo decoder da 007 antes de exportar.
- Orientacoes e campos estruturados sao exportados somente quando ativos; valores
  inativos ficam vazios no arquivo e preservados na sessao.

Nao colocar `Nao informado` ou avisos de revisao da previa no arquivo. Toda
formatacao adicional acima e convencional e documentada; nao modifica a fonte.

## Politica de formulas e compatibilidade

Proposta inicial para celulas de valor: identificar prefixos potencialmente
interpretaveis como formula e acrescentar apostrofo antes do valor completo,
antes de fazer escape CSV. Manter a Carta original sem alteracao e comunicar
brevemente: alguns valores recebem marcador textual de protecao no arquivo.

Deteccao deve considerar `=`, `+`, `-`, `@`, variantes de largura completa e
prefixos de espaco/caracteres de controle que precedam esses sinais; valores
com tab/CR/LF inicial tambem entram na protecao. Normalizar somente copia para
detectar, sem remover espacos ou controles da fonte. Documentar conjunto exato
de controles/espacos no implementation-plan e testar Unicode/fronteiras.

Aplicar protecao a celula final, depois de compor listas, e testar que aspas e
delimitadores internos nao criam outra celula. Nao usar formulas como
`="texto"` para conservar valores nem considerar quoting sozinho suficiente.

Esta politica e candidata, nao garantia comprovada. Validar apertura/importacao
em Microsoft Excel desktop e LibreOffice Calc, com valores sinteticos inofensivos
como `=1+1`, suas variantes, sinais, tabulacoes e separadores. Registrar sistema,
versao, locale e opcoes de importacao. Google Sheets nao e requisito de teste
inicial; nao enviar dados reais a planilhas online para verificar compatibilidade.

Verificar abertura padrao e importacao explicita como Texto separadamente.
Se algum caminho avaliar o conteudo como formula, nao declarar CA08 atendido:
ajustar politica/compatibilidade no plano detalhado antes da entrega. Caso a
seguranca dependa de importar como Texto, tornar essa limitacao explicita e
conciliar com RF05, sem prometer abertura direta segura nessa ferramenta.

Testar salvar/reabrir como verificacao de limite e documentar resultados;
nao garantir que manipulacoes posteriores em ferramentas externas preservem
protecao. Mudanca de politica exige rever fixtures, aviso e contrato do arquivo.

## Pipeline e estado de exportacao

### Validacao e captura

No clique, obter snapshot consistente do provider da 007, copiando grupos/listas
sem mutacao. Validar esse mesmo snapshot com obrigatoriedade da 008, depois
formatar/serializar. Nao ler sessionStorage nem reidratar para cada exportacao.

Resultado obrigatorio failed ou com errors impede criacao do Blob/download.
Mostrar resumo e retorno ao campo pelo contrato 007/008. Sugestoes editoriais
nao sao consultadas como gate. Carta em memoria continua exportavel quando
required esta satisfeito mesmo com armazenamento indisponivel.

Nao manter CSV cacheado. Nova tentativa apos edicao captura nova versao. Se
dados mudarem durante geracao, arquivo corresponde ao snapshot do clique e
mensagem identifica essa semantica, sem afirmar refletir alteracoes posteriores.

### Geracao e acionamento

Separar funcoes puras de formatacao/serializacao da operacao browser. Proposta:

```ts
type ExportState =
  | { status: "idle" }
  | { status: "processing" }
  | { status: "blocked"; issues: readonly ValidationIssue[] }
  | { status: "started"; protectedValueCount: number }
  | { status: "failed"; stage: "validation" | "generation" | "download" };
```

Travar a mesma operacao por ref/identificador imediatamente no handler, alem
de feedback visual. Liberar no finally; permitir nova exportacao depois da
operacao. Nao impedir nova acao intencional apos termino como se fosse duplicidade.

Gerar bytes/Blob, criar object URL e acionar anchor temporaria com download
por gesto do usuario. Remover anchor e agendar liberacao da URL somente depois
do acionamento, com politica de prazo baseada nos testes de navegador.
Liberar tambem recursos criados em falhas, evitando leak ou revoke precoce.

Manter inicio de download proximo da acao do usuario, especialmente em mobile;
se worker/processamento assincrono perder ativacao, usar passo explicito de
baixar arquivo preparado, definido no plano detalhado, sem auto-download tardio.

Anunciar `Download iniciado. Confira os downloads do seu navegador.` somente
apos invocacao sem erro. O browser pode recusar/salvar por comportamento externo
sem retorno detectavel; nao afirmar arquivo salvo, entrega ou conclusao real.
Em erro detectavel, permitir tentar novamente preservando dados e demais links.

## Desempenho e verificacao de integridade

Pipeline linear para pequeno conjunto de campos; evitar concatenacao repetitiva
quadratica e normalizacao editorial. Nao impor limite de caracteres no produto
somente para atingir tempo nem truncar silenciosamente valores.

Fixture de medicao proposta: 50 documentos, 50 canais, 100 etapas e ate 1 MiB
de texto total UTF-8, com multilinhas e caracteres especiais. Medir separadamente
validacao, formatacao, protecao, serializacao e criacao de Blob. Meta de ate
5 segundos vale para geracao ate Blob pronto, excluindo dialogo/download externo.

Registrar hardware, sistema, navegador e versao, em build de producao, com
rodada inicial e repeticoes; verificar tambem que uma acao/atualizacao visual
continua responsiva. Fixture e parametros devem ser confirmados antes do
implementation-plan; nao afirmar performance ilimitada por cumprir esse caso.

Se medicao revelar bloqueio, mover formatacao pesada para worker local ou
processamento particionado e usar etapa explicita de download se necessaria.
Nao adicionar worker por antecipacao sem evidencia; testar casos maiores para
identificar limite pratico sem descartes de dados.

## UI e integracao

Criar `ExportCsvAction` ou hook/componentes equivalentes sob dominio carta.
Integrar no slot da 009, com botao Exportar CSV, processamento, pendencias,
erro e retorno. Nao criar rota nova, formulario de exportacao ou suporte proprio.

Reutilizar ValidationSummary da 008 e destinos de correcao da 007. Texto do
CSV vem do snapshot, nunca do DOM da previa; avisos/rotulos de UI nao entram
nos valores. Tutorial e Editar informacoes continuam acessiveis em bloqueio/falha.

Mensagens e convencoes de listas ficam versionadas. Anunciar retorno de modo
comedido, manter foco no botao ou resumo quando apropriado e explicar pendencias
sem depender de botao desabilitado. Usar requisitos da 016 desde esta feature.

## Arquivos provaveis

| Arquivo | Intervencao |
| --- | --- |
| `src/features/carta/carta.csv.ts` | Cobertura completa e formatacao pura do snapshot |
| `src/lib/csv.ts` | Serializacao generica com quoting, CRLF e contrato definido |
| `src/features/carta/carta.csv-safety.ts` | Politica de protecao separada, se clarear responsabilidade |
| `src/lib/download.ts` | Acionamento e ciclo de vida de recursos, se houver reuso real |
| `src/features/carta/useExportCartaCsv.ts` | Estado/orquestracao e trava de operacao |
| `src/components/carta/ExportCsvAction.tsx` | UI integrada da acao |
| `src/content/exports/carta-csv.ts` | Mensagens e convencoes editoriais |
| `src/pages/PreviaCartaPage.tsx` | Integracao do componente da 010 |
| Estilos existentes de previa/acoes | Estados e responsividade confirmados |

Caminhos novos sao propostas a adaptar ao resultado real de 007–009. Nao
modificar schema/obrigatoriedade por conta propria nem adicionar backend.
Assets/tokens novos somente apos consulta visual e necessidade comprovada.

## Referencias visuais e pendencias

Consultar via MCP Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`,
referencia `821:308`, localizando acao/estados de exportacao no fluxo da previa.
Consultar Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Registrar composicao,
estados, contraste, foco e responsividade no implementation-plan.

Conferir ERS, contratos finais de listas/agendamento, fixtures, compatibilidade
e aviso de protecao antes de codigo. A politica de formulas precisa de resultados
em ferramentas reais antes de aceite; nao tratar teste de string como prova
de interpretacao segura por planilha.

## Estrategia de testes

Esta etapa e documental: conferir RF01–RF07/CA01–CA19 e consistencia com
007–009. Nenhum CSV foi gerado, aplicativo de planilha aberto ou build executado.

Reutilizar infraestrutura da 007/008 quando implementada; se continuar ausente,
registrar configuracao adequada nas tarefas. Testes de serializacao/pipeline
e integracao sao justificados pela perda de dados e comportamento de falha.

- Round-trip com parser CSV independente do serializador, BOM, duas colunas,
  17 registros de dados mais cabecalho: 18 registros logicos, sem contar
  CRLF final como registro vazio; aspas, virgula, CR/LF/CRLF e celulas multiline.
- Fixture de toda a cobertura, nome popular, como agendar, zero, null/false
  explicito e listas parciais, com IDs excluidos e fonte congelada inalterada.
- Politica com prefixos, espacos/controles, largura completa, valores legitimos
  negativos e delimitadores/aspas tentando criar celula adicional.
- Nenhum Blob/download em required errors/failed; sugestoes nao bloqueiam.
- Snapshot: edicao posterior nao mistura versoes e nova exportacao usa novo valor.
- Duplo clique, erro de serializacao, createObjectURL/acionamento falhando,
  cleanup e prazo de revoke; nenhum anuncio falso de salvamento.
- Integracao com memoria apenas, pendencias/foco e navegacao apos download.
- Testes reais de importacao e protecao por planilha/versionamento, separados
  dos mocks browser; dados somente sinteticos, formulas inofensivas e sem links externos.

| Criterios | Evidencia futura |
| --- | --- |
| CA01–CA03/CA11–CA12 | Gate obrigatorio, falhas e memoria valida |
| CA04–CA07 | Cobertura, formato, listas e ausencias |
| CA08/CA15 | Politica de formulas e compatibilidade real registrada |
| CA09–CA10/CA13 | Snapshot, repeticao e retorno do acionamento |
| CA14 | Teclado, resumo e anuncios acessiveis |
| CA16 | Medicao em ambiente/fixture definido |
| CA17–CA18 | Continuidade, arquitetura e consultas visuais |
| CA19 | Quatro linhas estruturadas de agendamento; modalidades em ordem Online/Presencial e enums traduzidos; inativos vazios sem apagar a fonte; required do snapshot valida somente configuracoes aplicaveis |

Executar typecheck/build e suite configurada apos codigo. Verificar download
em Chrome/Edge/Firefox desktop e Safari macOS/iOS, incluindo mobile Chrome
quando disponivel na matriz; registrar indisponibilidades de ambiente como
pendencia, sem falso aprovado. Testar acao em 320–1440 px e texto ampliado.

## Riscos e mitigacoes

- Formula executavel: politica candidata + testes reais, sem garantia universal.
- Locale abre coluna unica: contrato fixo e orientacao de importar virgula/UTF-8,
  sem mudar arquivo silenciosamente por navegador.
- Texto alterado no artefato: comunicar marcador de protecao e preservar fonte.
- Lista incompleta perdida: convencoes explicitas e round-trip/fixtures integrais.
- Download duplicado ou URL revogada cedo: trava imediata e cleanup testado.
- Validacao obsoleta: mesma versao para gate e serializacao, validacao no clique.
- Browser sem confirmacao de salvamento: mensagem limitada a acionamento iniciado.
- Desempenho nao medido: fixture, build de producao e evidencia antes de otimizar.

## Proximo passo

Executar `/spec:tarefas 010-exportacao-csv`. Depois, consolidar formato,
compatibilidade, politica de formulas, Figma e integracao em
`/spec:plano-implementacao`, seguido de `/spec:validar` antes de implementar.

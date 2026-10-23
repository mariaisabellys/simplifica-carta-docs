# Validacao: Exportacao CSV

> **Histórico anterior ao modelo v3:** repetir a matriz de exportação contra a
> Carta central da 007.

## Resultado e escopo

Executado `/spec:validar 010-exportacao-csv` em 2026-10-05.
**Resultado: requer ajustes documentais; validacao integral das fontes,
compatibilidade com planilhas e aceite funcional permanecem pendentes.**

Foram avaliados SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Somente este relatorio
foi criado, sem alterar os quatro artefatos ou codigo-fonte. Nenhuma tarefa foi
marcada como concluida. T006 registra uma validacao com pendencias, nao uma
aprovacao sem bloqueios.

## Fontes analisadas e limites

- [spec.md](../spec.md), [plan.md](../plan.md), [tasks.md](../tasks.md) e
  [implementation-plan.md](../implementation-plan.md): formato, mapeamento,
  safety, snapshot, validacao, download, UI, testes e rastreabilidade.
- Contratos de 007–009 inspecionados nas validacoes anteriores: Carta v2,
  campos ativos, ValidationRun e slot de exportacao na previa.
- Constitution, ADR-002, contexto local de produto/roadmap e referencias de
  design consultadas nas rodadas anteriores.
- `src/lib/csv.ts` e `src/features/carta/carta.csv.ts`: serializador e
  mapeamento iniciais, sem download completo.
- [CSV Injection — OWASP](https://community.owasp.org/attacks/CSV_Injection),
  consultado nesta rodada em 2026-10-05. A fonte distingue quoting de protecao
  contra formulas, alerta para salvar/reabrir e ausencia de estrategia universal.

O ERS PDF nao foi extraido ou inspecionado. A verificacao de ferramentas
registrada na validacao da 006 nao encontrou Python/py/Poppler; nao foram
instaladas dependencias. Manual textual nao substitui o PDF.
Nao ha ferramenta Figma utilizavel exposta nesta sessao; node 821:308 e uma
referencia local, sem evidencia de consulta a estados de exportacao.
Nao foram abertos Excel/Calc nem testados downloads reais. A consulta OWASP
nao comprova a politica candidata nas ferramentas suportadas.

## Inconsistencias e lacunas documentais

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V010-01 | Alta | PLAN Estrategia de testes exige 14 registros logicos; TASK T014 repete 14; IMPLEMENTATION-PLAN Testes descreve fixture de 13 valores e 14 registros. Contrato/tabela/mapeamento atuais possuem 17 registros de dados. | Substituir expectativas antigas por 17 dados mais cabecalho: 18 registros logicos de duas colunas, sem contar CRLF final como registro vazio. Ampliar fixture para os quatro campos novos, mantendo ordem e todos os identificadores. A expectativa antiga permitiria omissao ou reprovaria o mapeamento correto. |
| V010-02 | Media | SPEC tem CA19; TASK matriz inclui CA19, mas T006 e T021 ainda encerram evidencia em CA18. Matrizes de PLAN e IMPLEMENTATION-PLAN terminam em CA18. | Incluir CA19 nas matrizes e faixas de verificacao/fechamento, vinculado a T002/T007/T014/T016 e integracao aplicavel. Nao considerar cobertura geral de listas como evidencia suficiente dos dois sistemas de agendamento. |
| V010-03 | Media | TASK T014 e fixtures do plano detalhado cobrem null/false/true e orientacao, sem casos explicitos para modalidades, sistema nativo, externo dentro/fora e troca com valores externos retidos. | Adicionar verificacao das quatro linhas estruturadas, Online/Presencial em ordem fixa, enums traduzidos, inativos vazios e fonte preservada. No pipeline, testar bloqueio de configuracoes ativas ausentes/invalidas pelas mesmas regras da 008 e ausencia de bloqueio pelos valores externos inativos. A regra existe; falta cobertura operacional detalhada. |

O mapeamento proposto esta alinhado ao contrato de 17 dados. Nao foi encontrada
regra principal que exporte link/exibicao inativos ou os exija para sistema
nativo. A divergencia de contagem e remanescente do contrato anterior nos testes,
nao uma autorizacao para reduzir a cobertura do arquivo.

## Contratos consistentes

- Acao explicita em /previa, sem rota nova ou download automatico.
- Snapshot copia grupos, itens e array de modalidades; required da 008 valida
  essa mesma captura antes da serializacao. Falha/erros nao criam Blob/URL;
  editorial nao participa do gate. Nova tentativa usa nova Carta.
- Cinco obrigatorios gerais mais condicionais com Sim/externo; memoria valida
  continua exportavel sem storage. Nao apagar sessao ou exigir exportacao para
  tutorial, previa, edicao ou copia individual.
- Duas colunas campo/valor; 17 dados em ordem fixa; UTF-8/BOM unico no Blob;
  virgula, quoting de todas as celulas, aspas duplicadas e CRLF entre registros
  e final. Quebras internas preservadas dentro de celulas.
- Nome fixo simplifica-carta.csv e MIME text/csv;charset=utf-8. Sem sep=,
  IDs, mensagens, placeholders ou metadados adicionais.
- Listas preservam texto, atributos conhecidos e numeros de origem; itens
  sem texto util sao omitidos. Celula multiline e representacao de leitura,
  nao contrato reversivel de itens por split de LF.
- Null de agendamento gera vazio; false explicito gera Nao; legado depende
  do decoder da 007. Tipos/sistema somente com Sim, link/exibicao somente
  com Sim e externo, orientacao opcional com Sim; inativos ficam vazios.
- Protecao candidata aplicada ao valor final depois das listas e antes do
  quoting; normalizacao somente na copia de deteccao. Prefixo altera artefato
  com aviso, sem mudar a Carta; contagem e por celula protegida.
- Download solicita operacao ao browser; nao confirma salvamento/publicacao.
  Anchor temporaria removida, URL revogada conforme prazo candidato e limpeza
  em falhas; nova acao apos termino e permitida.
- Fluxo de falhas preserva dados, libera trava e mantem navegacao. Resumo
  usa alvos fechados; mensagens renderizadas como texto, sem segundo motor.

## Pendencias e impactos para implementacao futura

| Ponto | Acao necessaria |
| --- | --- |
| ERS/copy/Figma | Confrontar fontes, localizar acao/estados reais e registrar validacao editorial e visual. |
| Politica de formulas | Apostrofo e candidato. Verificar abertura padrao, importacao como Texto e salvar/reabrir em Excel/Calc, versoes/locale/opcoes registrados. OWASP tambem descreve TAB para Excel; nao substituir politica sem conciliacao e testes. Falha num caminho suportado exige revisar contrato/aviso antes de aprovar CA08. |
| Contratos 007/008 | Entregar provider/decoder/modelo e motor condicional; decidir protocolos de URL. A 010 nao cria obrigatoriedade ou migracao paralela. |
| Formatadores | Implementar e testar as funcoes puras de tipos/sistema/exibicao descritas em prosa, com mapas versionados compartilhados; snippets nao sao modulos completos prontos para compilar. |
| Resumo/foco/navegacao | Fechar SummaryAdapter/onCorrect com 007/008 e reconciliar API compartilhada 002/003. Integrar no slot real da 009, sem depender de placeholders. |
| Estado blocked | O plano exige invalidar pendencias ao mudar a Carta com acao montada; o hook-base ainda nao inclui essa invalidacao. Completar mecanismo por revisao e testar, sem nova exportacao automatica ou movimento de foco. |
| Gesto/desempenho | Medir pipeline sincrono e feedback: React pode agrupar processing/started. Se exceder orcamento de interacao, revisar fluxo com prepared/segundo gesto explicitamente documentado. Meta total de 5 s nao comprova interface responsiva. |
| Recursos/repeticoes | Verificar revoke candidato de 60 s, navegacao imediata e repeticao em browsers reais. Reentrada durante processamento e distinta de dois cliques intencionais apos termino. |
| Planilhas/ambientes | Validar BOM/delimitador/listas/multilinha/protecao em ferramentas escolhidas e download em desktop/mobile. Parser/mocks nao comprovam interpretacao de formulas nem arquivo salvo. |

A consulta OWASP sustenta as limitacoes registradas no plano, sem aprovar o
algoritmo local. A definicao de fontes preservadas e campos condicionais
inativos ja esta fechada; nao e necessario decidir novamente sua limpeza.

## Estado do codigo e verificacoes

O serializador atual usa LF e quoting condicional sem CR isolado. O mapeamento
atual possui oito dados e nao cobre listas/campos novos. O plano reconhece
essas lacunas e nao as apresenta como entrega completa.

Nao foram gerados CSVs, instaladas dependencias ou executados build/typecheck
e testes como prova de comportamento futuro. Verificacoes posteriores devem
usar parser independente, fixtures congeladas, fronteiras de safety, falhas
de pipeline e recursos, consumidores reais, planilhas/browsers, desempenho
e acessibilidade; registrar resultados reproduziveis em verification.md.

## Arquivo alterado e proximo passo

Somente `specs/010-exportacao-csv/validation.md` foi criado. Os quatro
documentos avaliados e src permaneceram intocados, sem tarefas concluídas
automaticamente. Corrigir V010-01–V010-03, fechar pendencias aplicaveis e repetir
a validacao. Este relatorio nao constitui homologacao do CSV, da protecao
contra formulas ou da implementacao visual/funcional.

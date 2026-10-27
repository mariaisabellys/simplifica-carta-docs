# Spec: Exportação CSV

Reconciliada em 19/10/2026 pela T009 documental.
[Versão anterior](historico/2026-10-19-pre-t009-spec.md).

## Objetivo e fontes

Exportar localmente a Carta v3 atual para apoio ao cadastro manual. CSV não é
formato de importação homologado, publicação nem comprovante de aprovação.
Seguir [ADR-002](../../docs/decisoes/adr-002-exportacao-csv.md) e o
[contrato único de exportação](contrato-exportacao-v3.md), fonte normativa da
matriz, agregações, contagem, segurança candidata e fixtures EX01–EX17.

## Requisitos

- RF01 — Ação explícita Exportar CSV em /previa, sem rota própria, login,
  diagnóstico ou progresso de preparação exigidos. Não exportar automaticamente.
- RF02 — Capturar snapshot v3 e validar estruturalmente pela 007 antes da geração.
  Usar dez paths gerais e condicionais da matriz central, sem lista local duplicada.
  Falha técnica/erro estrutural impede arquivo. 008 é editorial e não bloqueia.
- RF03 — Representar as 25 definições em 22 registros de dados da matriz única.
  Preservar texto útil, seleções, listas, ordem e fonte; condições K/S/ON/E geram
  valores vazios quando inativas. Nenhum campo novo ou removido por inferência.
- RF04 — Duas colunas campo/valor, cabeçalho + matriz, vírgula, quoting integral,
  CRLF externo/final, quebras internas preservadas, UTF-8/BOM único no Blob,
  nome fixo simplifica-carta.csv e MIME text/csv;charset=utf-8. Nenhum sep=.
- RF05 — Política de fórmulas candidata explicitada no contrato; quoting não
  garante segurança. Prefixo altera só representação do arquivo, nunca a Carta.
  Compatibilidade Excel/Calc e salvar/reabrir precisam de evidência antes da liberação.
- RF06 — Download local com trava, cleanup e retry; anunciar solicitação iniciada,
  nunca arquivo salvo/publicado. Memória válida funciona sem storage. Não limpar
  sessão. Erro não bloqueia prévia, edição, ajuda, tutorial ou cópia individual.
- RF07 — Copy versionada, botão e estados acessíveis, resumo/correção por alvo
  da 007, sem mover foco em atualização espontânea ou duplicar motor editorial.

## Limites e dependências

Sem backend, logs de valores, envio externo, XLSX/PDF/HTML/ZIP, importador,
histórico de arquivos ou execução de fórmulas. Arquivo baixado é externo à sessão.
Meta <=5 s até Blob e responsividade conforme fixture/ambientes do contrato,
não garantia ilimitada. Inter/tokens/reflow; consultar Figma para ação/estados
no fluxo da prévia (referência local 821:308), sem criar página por analogia.
Dependências: 007 (fonte/estrutura/foco), 009 (slot), 008 (editorial separado),
011/012 (continuidade), 016/017 (ambientes). Consulta Figma/ERS e copy pendentes.
Ativo false é exportado como Inativo e true como Ativo, sem confirmar estado
externo ou interação deliberada.

## Critérios de aceite

| ID | Resultado esperado |
| --- | --- |
| CA01 | Snapshot atual estruturalmente válido gera CSV local. |
| CA02 | Ausência/incompatibilidade/falha estrutural da 007 impede arquivo e orienta correção. |
| CA03 | Sugestões, checklist ou falha editorial não bloqueiam exportação válida. |
| CA04 | Toda a matriz v3 e atributos/listas úteis exportados na ordem definida. |
| CA05 | Parser independente recupera duas colunas, acentos, aspas e quebras internas. |
| CA06 | Zero/vazio/defaults distintos; null formatável não autoriza pipeline incompleto. |
| CA07 | Listas parciais preservam texto/modalidade; só itens totalmente vazios são omitidos. |
| CA08 | Política de fórmulas verificada por caminho suportado, sem alterar fonte. |
| CA09 | Nova ação após edição captura revisão nova, sem cache obsoleto. |
| CA10 | Trava impede reentrada da mesma operação; permite nova tentativa depois. |
| CA11 | Falha de validação/geração/download mantém dados, sem sucesso fictício. |
| CA12 | Memória válida exportável sem persistência; recuperação pertence à 007. |
| CA13 | Anunciar somente solicitação iniciada; liberar recursos corretamente. |
| CA14 | Teclado/leitor identifica ação, processamento e correção com foco coerente. |
| CA15 | Browsers e Excel/Calc avaliados com versões/opções/limitações registradas. |
| CA16 | Fixture representativa atende meta e responsividade medidas separadamente. |
| CA17 | Tutorial/cópia/edição livres; sessão não apagada ao exportar. |
| CA18 | Arquitetura/copy/visual conferidos, sem importação/publicação automática. |
| CA19 | K/S/ON/E respeitadas, rótulos legíveis e inativos vazios sem apagar fonte. |
| CA20 | Contagem derivada da matriz: 22 dados + cabeçalho, sem contar LF interno ou CRLF final como registro. |

São critérios futuros; T009 não entrega implementação nem homologação.

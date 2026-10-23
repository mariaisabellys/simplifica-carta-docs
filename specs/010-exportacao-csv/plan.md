# Plan: Exportação CSV

19/10/2026 — T009 documental. [Anterior](historico/2026-10-19-pre-t009-plan.md).
Seguir [contrato único](contrato-exportacao-v3.md) e [spec](spec.md).

## Arquitetura

Provider 007 → snapshot independente/revisão → validação estrutural 007 →
matriz/formatadores → proteção candidata → criarCsv → BOM/Blob → download.
Cada etapa recebe a mesma captura; nenhuma consulta posterior ao provider para
montar parte do arquivo. Não ler DOM, storage ou view model da prévia.
Separar helpers puros de formatação/segurança/CSV e adaptador de browser.
ExportCsvAction no slot da 009 orquestra estado, gesto e resumo/foco da 007.

## Arquivos futuros

- carta.csv.ts: matriz de 22 dados, formatadores v3 e rótulos.
- carta.csv-safety.ts: candidato testável, habilitado conforme política aprovada.
- src/lib/csv.ts: preservar serialização genérica existente, sem BOM/safety nela.
- Conteúdo de exportação: mensagens/rótulos/nome fixo, fora do JSX.
- Ação/hook de exportação: snapshot, trava, falhas, recursos e integração.
- Testes/quickstart/relatórios: evidência por EX/CA.

## Ordem e riscos

Confirmar contratos e aprovar segurança/copy; implementar snapshot/formatadores,
testar parser/quoting, integrar ação real, depois browsers/planilhas/desempenho.
Riscos: interpretação como fórmula, perda de campos agregados, mistura de
revisões, renumeração de listas e sucesso falso. Mitigações e limitações no
contrato; nenhum marcador universalmente seguro é presumido.
Aprovação de segurança não é resultado de build nem de teste com parser.
Figma/ERS, validação defensiva 007, UI/assistivo e planilhas continuam pendentes.

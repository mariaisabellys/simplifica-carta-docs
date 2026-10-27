# Verificação: Exportação CSV

## Registro de 19/10/2026 — T009 documental

Autor: Codex. Base: HEAD 7948d35 e alterações locais anteriores preservadas.
[Verificação histórica](historico/2026-10-19-pre-t009-verification.md) mantém
os testes do serializador executados em 05/10, sem atribuí-los a esta rodada.

Criado contrato-exportacao-v3.md; reconciliados os sete artefatos da 010,
referência da matriz 007 e docs/tasks.md. Originais preservados no histórico,
com ajuste dos links relativos. Nenhum código, teste ou arquivo CSV criado/alterado.

## Checks documentais

- Ordem/chaves da matriz conferidas com os 22 registros atuais de carta.csv.ts.
- Cobertura dos 25 paths centrais pelas 22 linhas, com prazo/etapas agregados.
- CA01–CA20 e EX01–EX17 presentes, tarefas e quickstart alinhados.
- 36 links locais válidos, ausência de seletores antigos ativos e git diff --check sem erros.
- Sete históricos comparados integralmente com os originais, ajustando somente links relativos.
- Nenhum diff em src/tests; não executados build/typecheck/testes nesta rodada.
- Consulta OWASP sobre limitações de fórmulas registrada no contrato, sem
  abrir planilha nem declarar segurança do candidato local.

## Estado real e pendências

Serializador genérico já possui quoting integral/CRLF; helper possui 22 dados,
mas ainda usa enums internos/formatadores diferentes. Não equivale a pipeline
com snapshot/validação/safety/BOM/download. Histórico de três testes do serializador
não prova matriz completa, proteção, navegador ou Excel/Calc.
Fixtures são expectativas futuras. F010-01–12, compatibilidade, performance,
copy/Figma/ERS e decisões estruturais pertinentes permanecem pendentes.

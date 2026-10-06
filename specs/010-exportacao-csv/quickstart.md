# Quickstart: Exportacao CSV

## Estado atual

Implementado somente serializador generico com quoting integral e CRLF.
Nao existe acao de exportacao funcional na previa; gerador da Carta ainda
usa oito campos legados. Consulte verification.md antes de avaliar a feature.

## Verificacao local

Com Node 24 (ambiente verificado), executar na raiz:

```powershell
node --test tests/csv.test.mjs
npm.cmd run typecheck
npm.cmd run build
```

Os testes importam TypeScript pelo suporte nativo do Node, sem framework.
Instale dependencias do lockfile com npm.cmd ci se ausentes para checks/build.
Esses comandos nao exportam dados reais, abrem planilha ou iniciam download.

## Contrato e limites

criarCsv recebe registros de strings, preserva conteudo, duplica aspas e
delimita todas as celulas com aspas. Usa virgula e CRLF entre registros/final;
quebras internas continuam dentro das celulas. Sem registros, retorna vazio.

BOM, duas colunas fixas campo/valor e 17 dados mais cabecalho pertencem ao
artefato completo ainda pendente. O serializador generico nao valida Carta,
protege formulas, adiciona BOM ou solicita download. Quoting nao e politica
de seguranca de planilhas; nao afirmar abertura segura pelo teste unitario.

Fluxo final planejado: snapshot atual da Carta, required compartilhado,
formatacao de 17 dados ativos, protecao validada, serializacao, Blob UTF-8/BOM
e download explicito. Listas sao texto multiline para leitura, sem contrato
reversivel por split LF; valores inativos ficam vazios, preservados na Carta.

Importacao/compatibilidade em Excel/Calc e browsers ainda nao verificadas.
Politica de formulas, referencias visuais e contratos 007–009 permanecem
pendentes, conforme verification.md e implementation-plan.md.

# Quickstart: Copia de dados no tutorial

## Estado atual

Entrega parcial: apenas src/lib/clipboard.ts esta implementado. O tutorial
nao oferece os 17 campos copiaveis previstos. Consultar verification.md para
dependencias, decisoes e ambientes ainda pendentes.

## Verificar o utilitario

Com dependencias instaladas e Node 24.20.0 (suporte nativo a TypeScript):

```powershell
node --test tests/clipboard.test.mjs tests/csv.test.mjs
npm.cmd run typecheck
npm.cmd run build
```

Testes usam mocks e nao acessam a area de transferencia real. Para futura
integracao, chamar copiarTexto diretamente no handler do gesto com a string
derivada original, aguardar resultado e tratar unavailable/write-failed.
Nao anunciar sucesso antes da resolucao nem aplicar escape/prefixos de CSV.

## Verificacao futura da jornada

Implementar os 17 campos conforme a ordem e convencoes do implementation-plan,
respeitando aplicabilidade de agendamento e preservacao de valores inativos.
Resolver primeiro a copia manual com CR/CRLF e a trava entre instancias.
Testar em HTTPS com dados sinteticos: copiar/colar em destino controlado,
recusa/API ausente, selecao manual, texto longo e operacao demorada. Registrar
browser/versao/dispositivo e resultado observado conforme T016. Mocks nao
substituem esses testes; nao adicionar leitura de clipboard ao produto.

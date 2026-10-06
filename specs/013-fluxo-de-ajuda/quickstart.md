# Quickstart: Fluxo de ajuda

## Estado atual

Implementacao parcial: mapa/tipos compartilhados em
src/content/support/canais.ts. A pagina /ajuda permanece placeholder.
Nao ha FAQ, ancora duvidas-frequentes ou encaminhamento integrado entregue.
Consultar verification.md antes de avaliar os criterios de aceite.

## Checks disponiveis

Com dependencias instaladas e Node 24.20.0:

```powershell
npm.cmd run typecheck
npm.cmd run build
node --test tests/clipboard.test.mjs tests/csv.test.mjs
```

Os testes existentes verificam helpers de clipboard/CSV, nao esta pagina.
Importar destinos/tipos de canais.ts nos consumidores futuros, sem repetir
associacoes por indice ou usar ativo como estado padrao de rotas placeholder.

## Verificacao apos integracao

Apos Figma, copy e contratos pendentes resolvidos, verificar /ajuda por entrada
compartilhada, URL direta e recarga; /ajuda#duvidas-frequentes com foco/hash e
voltar/avancar; FAQ por teclado; retorno fixo /formulario-carta e preservacao
da sessao inclusive com storage indisponivel. Conferir ambos os destinos e
estados pendente/ativo/pausado, ambos nao ativos e alternativa apenas confirmada.
Escolher canal apenas navega: nao enviar e-mail nem criar solicitacao real
para testar. Registrar ambientes, resultados e limites conforme T012–T015.

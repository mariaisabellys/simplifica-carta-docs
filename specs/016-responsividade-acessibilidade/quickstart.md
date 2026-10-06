# Quickstart: Responsividade e acessibilidade

Entrega parcial: guard de links no shell; layout e auditoria ainda pendentes.
Com dependencias instaladas e Node 24.20.0:

```powershell
node --test tests/navigation.test.mjs tests/mailto.test.mjs tests/atendimento.attempt.test.mjs tests/clipboard.test.mjs tests/csv.test.mjs
npm.cmd run typecheck
npm.cmd run build
```

Verificacao futura em browser: navegar pelo shell com clique primario e Ctrl/
Cmd/Shift/clique central, comparar destino e abertura nativa. Conferir teclado
e foco separadamente; teste do guard nao comprova esses resultados.

Apos Figma/contratos/fluxos reais, executar matriz completa A/AA, larguras
1440/1024/768/390/320 e intermediarias, texto 200%, zoom real 400%, espacamento,
teclado/leitores e estados de falha. Registrar versoes e evidencias sinteticas;
nenhum atendimento ou e-mail institucional real. Usar accessibility-matrix.md
e verification.md para pendencias, sem aprovar placeholders ou conformidade.

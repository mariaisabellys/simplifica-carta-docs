# Quickstart: Suporte por e-mail

## Estado atual

Somente helper puro criarMailto implementado nesta etapa. Pagina permanece
placeholder; contato/copy/interface ainda pendentes. Ver verification.md.

Com dependencias instaladas e Node 24.20.0:

```powershell
node --test tests/mailto.test.mjs tests/atendimento.attempt.test.mjs tests/clipboard.test.mjs tests/csv.test.mjs
npm.cmd run typecheck
npm.cmd run build
```

Consumidor futuro usa destinatario fixo confirmado da fonte unica e assunto
generico versionado. Anchor real acionado explicitamente; nenhum body/cc/bcc,
dado da sessao, efeito de abertura ou anuncio de envio. Configuracao fora do
escopo do helper deve ser revista, sem alterar silenciosamente o endereco.

Apos resolver contato/V015-02/Figma, verificar estados e alternativa manual,
clipboard mock e gesto real em ambiente controlado, navegacao sem perder Carta
e teclado/reflow. Testar aplicativo configurado/ausente sem concluir envio.
Registrar ambiente e resultado; mocks nao comprovam abertura real do handler.

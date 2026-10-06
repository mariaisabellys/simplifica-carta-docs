# Quickstart: Atendimento agendado

## Estado atual

Somente tipos de campos/payload e helper createAttempt implementados.
Pagina placeholder; API, banco e worker inexistentes. Ver verification.md
para decisoes pendentes. Nao e possivel solicitar atendimento neste estado.

## Verificacao isolada

Com dependencias instaladas e Node 24.20.0:

```powershell
node --test tests/atendimento.attempt.test.mjs tests/clipboard.test.mjs tests/csv.test.mjs
npm.cmd run typecheck
npm.cmd run build
```

Consumidor futuro captura payload revisado ao confirmar nova tentativa;
repeticao usa o mesmo Attempt/chave/payload. Criar outra tentativa nao e
recuperacao de resultado incerto. Nao salvar payload pessoal ou Carta no
marcador de sessionStorage. Nenhum POST automatico na recarga.

## Jornada futura

Apos decisoes/ADR/Figma/infraestrutura, verificar bootstrap CSRF, consulta
real de horarios, selecao/dados/revisao sem registro e confirmacao explicita.
Usar agenda sintetica, PostgreSQL/conexoes concorrentes e SMTP falso; testar
ultima capacidade, replay, rollback, resposta perdida, lookup, expiracao e
worker. Nao usar SQLite/mocks como prova de locks nem enviar mensagens reais.
Registrar CA01–CA18 e ambientes conforme tarefas; nao iniciar migrations ou
oferta operacional a partir deste quickstart antes da implementacao restante.

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
Registrar CA01–CA20 e ambientes conforme tarefas; nao iniciar migrations ou
oferta operacional a partir deste quickstart antes da implementacao restante.

## Integração compartilhada — T013, 20/10/2026

Aplicar o [contrato de canais](../../../docs/arquitetura/contrato-canais-ajuda.md)
como definição única de estado/endereço/destino, apresentação, transições e
migração editorial. Entrada 425:201 com dois cards; atendimento ativo usa botão interno para abrir
calendário, sem link à própria rota. Pendente/pausado não inicia calendário ou
nova solicitação; dados/tentativa já existentes não são apagados.

Estado atual inspecionado: atendimento pendente, e-mail ativo editorialmente.
Ativo não prova vagas, recebimento ou implementação. Agenda vazia/erro de rede
e falha de clipboard são estados operacionais distintos, não mudam supportChannels.
As decisões de apresentação antes abertas em V013-01/V015-02 estão definidas
no contrato; efeitos de pausa na API/recuperação da 014 seguem para T014 global.
Conteúdo TypeScript permanece inalterado e ainda requer migração. Não há aceite
funcional nesta revisão; testar CJ01–CJ12 e critérios locais após implementar.

Roteiro adicional futuro: variar os dois canais em fixtures (nove combinações),
abrir FAQ/014/015 diretamente, conferir CTA e avisos; na própria 014 ativa,
acionar botão e verificar calendário/foco sem mudança de rota; simular vazio,
erro, pausa e retorno sem perder Carta ou tentativa. Nenhum envio real.

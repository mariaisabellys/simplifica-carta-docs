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
CTA da FAQ apenas navega; card da 014 abre calendário interno e e-mail copia.
Não enviar e-mail nem criar solicitação real
para testar. Registrar ambientes, resultados e limites conforme T012–T015.

## Integração compartilhada — T013, 20/10/2026

Aplicar o [contrato de canais](../../docs/arquitetura/contrato-canais-ajuda.md)
como definição única de estado/endereço/destino, apresentação, transições e
migração editorial. FAQ sem cards adicionais, CTA de apoio por estado, destino canônico da 014.
Na entrada compartilhada, atendimento ativo abre calendário interno na própria
014, e-mail ativo copia; a FAQ apenas navega.

Estado atual inspecionado: atendimento pendente, e-mail ativo editorialmente.
Ativo não prova vagas, recebimento ou implementação. Agenda vazia/erro de rede
e falha de clipboard são estados operacionais distintos, não mudam supportChannels.
As decisões de apresentação antes abertas em V013-01/V015-02 estão definidas
no contrato; efeitos de pausa na API/recuperação seguem contrato-agenda.md da 014;
as decisões institucionais IN01–IN08 permanecem pendentes.
Migração de conteúdo concluída em 21/10/2026; resolvedor compartilhado e
consumidores conferidos em tests/support.presentation.test.mjs. Isso não entrega
calendário/API/clipboard ou composição visual completa. Não há aceite
funcional nesta revisão; testar CJ01–CJ12 e critérios locais após implementar.

Roteiro adicional futuro: variar os dois canais em fixtures (nove combinações),
abrir FAQ/014/015 diretamente, conferir CTA e avisos; na própria 014 ativa,
acionar botão e verificar calendário/foco sem mudança de rota; simular vazio,
erro, pausa e retorno sem perder Carta ou tentativa. Nenhum envio real.

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

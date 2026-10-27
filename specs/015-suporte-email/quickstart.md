# Quickstart: Suporte por e-mail

20/10/2026 — roteiro futuro do contrato de cópia, não teste executado.
[Spec](spec.md), [matriz EM01–EM12](implementation-plan.md),
[verificação](verification.md).

## Estado atual e pré-condições

Fontes de contato/canais/copy e utilitário copiarTexto existem. Página
SuporteEmailPage ainda é placeholder e não renderiza copyAction; não afirmar
que este roteiro já pode aprovar a interface. Canal ativo editorialmente,
sem prova de recebimento institucional.
Antes do aceite: implementar controlador/composição, consultar 425:201/Make,
confrontar ERS e aplicar a política de estados compartilhados do contrato T013.

## Conferência de fonte e conteúdo

1. Conferir supportContacts.gesed.email em src/content/support/contatos.ts.
2. Conferir supportChannels/supportDestinations em support/canais.ts;
   não introduzir endereço ou estado duplicado.
3. Abrir /ajuda/suporte-email por URL, ajuda e alternativa da 014.
   Comparar card e página: endereço idêntico, rótulo Copie o e-mail.
4. Montar/focar/navegar não escreve clipboard ou abre aplicativo.
5. Acionar cópia em ambiente controlado: payload é só endereço. Após success,
   mostrar E-mail copiado!; antes de resolver, não confirmar sucesso.
6. Simular API ausente/erro: Não foi possível copiar. Selecione o endereço
   e copie manualmente. Seleção manual continua disponível no canal ativo.
7. Cobrir EM05–EM07: cliques repetidos, troca A/B/A/estado, desmontagem,
   retorno e timers, sem escrita automática ou feedback obsoleto.
8. Navegar com Carta em memória e voltar: mesmos valores, sem leitura/transmissão
   pelo suporte. Estados não ativos seguem o contrato T013, nunca fallback ativo.
9. Comparar layout 425:201, teclado/leitor/toque e reflow; nenhum botão
   alternativo de enviar/abrir aplicativo. Mensagem externa é decisão do usuário.

## Checks após implementação

Com dependências instaladas e ambiente do projeto compatível:

```sh
node --test tests/clipboard.test.mjs tests/navigation.test.mjs
npm run typecheck
npm run build
```

Esses comandos existentes não substituem novos testes de componente/integração
EM01–EM12. Registrar resultados atuais, sem reutilizar aprovações históricas.
Não executar escrita automática no clipboard real nem enviar e-mail
institucional. Teste manual com texto sintético em ambiente controlado.
Não é necessário instalar/configurar aplicativo de e-mail para validar a 015.

## Registro

Anotar data, critério, fixture, ambiente/versão, esperado/observado, defeito e
reteste. Mocks não comprovam seleção manual, foco ou clipboard no navegador.
O helper de mensagem antigo e seus testes ficam fora deste roteiro funcional;
sua entrega histórica está preservada em historico/.

## Integração compartilhada — T013, 20/10/2026

Aplicar o [contrato de canais](../../docs/arquitetura/contrato-canais-ajuda.md)
como definição única de estado/endereço/destino, apresentação, transições e
migração editorial. E-mail ativo: Copie o e-mail e alternativa manual. Pendente/pausado: aviso,
endereço de referência selecionável, sem botão ou instrução incentivando contato.
Ambos os canais indisponíveis: orientações e retornos, sem ação operacional.

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

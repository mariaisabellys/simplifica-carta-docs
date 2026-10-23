# Quickstart: Suporte por e-mail

20/10/2026 — roteiro futuro do contrato de cópia, não teste executado.
[Spec](../spec.md), [matriz EM01–EM12](../implementation-plan.md),
[verificação](../verification.md).

## Estado atual e pré-condições

Fontes de contato/canais/copy e utilitário copiarTexto existem. Página
SuporteEmailPage ainda é placeholder e não renderiza copyAction; não afirmar
que este roteiro já pode aprovar a interface. Canal ativo editorialmente,
sem prova de recebimento institucional.
Antes do aceite: implementar controlador/composição, consultar 425:201/Make,
confrontar ERS e fechar política de estados compartilhados na T013 global.

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
   pelo suporte. Estados não ativos exigem decisões da T013, não fallback ativo.
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

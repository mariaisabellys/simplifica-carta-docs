# Verificação T012 — Suporte por e-mail

20/10/2026. Escopo documental; nenhuma implementação, envio de mensagem ou
acesso ao clipboard. T012 global concluída documentalmente; aceite funcional
da 015 permanece pendente.

## Alterações e cobertura

- Sete artefatos revisados: spec, plan, tasks, implementation-plan, quickstart,
  validation e verification. Objetivo/RF/CA/tarefas/testes previstos usam só cópia.
- Endereço de supportContacts.gesed.email; estado/aviso/destinos de
  supportChannels/supportDestinations. Conteúdo em ajuda/suporte-email.ts e
  ajuda/canais.ts já deriva dessas fontes, sem alterar TypeScript.
- Copie o e-mail, E-mail copiado! e falha/manual alinhados ao conteúdo.
- EM01–EM12 cobrem CA01–CA13, incluindo clipboard/concorrência, layout 425:201
  e preservação de sessão; quickstart não exige aplicativo de e-mail.
- Referências pontuais dos consumidores 013/016 ajustadas; 014/mapa conferidos.
  Consolidação completa de estados/transições continua na T013 global.

## Histórico preservado

Sete originais em historico/2026-10-20-pre-t012-*.md, links relativos ajustados.
A [verificação anterior](../historico/2026-10-20-pre-t012-verification.md) registra
entrega isolada de src/lib/mailto.ts e tests/mailto.test.mjs em 05/10/2026,
com 19 testes históricos (cinco do helper), typecheck e build.
Não repetidos nesta rodada. O helper permanece no repositório, fora da
interface vigente; não removido, integrado nem usado como aceite da cópia.
Nenhuma tarefa funcional local foi marcada concluída pela limpeza documental.

## Inventário conferido

supportContacts/canais e copyAction existem. SuporteEmailPage ainda apresenta
PlaceholderCard e não renderiza o botão de copyAction; src/lib/clipboard.ts
existe. Logo conteúdo e utilitário não comprovam controlador/página entregues.
Estado e-mail ativo para exibição/cópia; atendimento pendente na configuração.
Não há evidência nova de titularidade/atividade/resposta institucional.

## Checks desta rodada

Resultados documentais registrados após a edição abaixo.
Sem execução funcional, typecheck/build, Figma MCP, ERS ou consulta externa.
Não abrir aplicativo, enviar mensagem, modificar estado de canal ou agenda.

| Check executado em 20/10/2026 | Resultado |
| --- | --- |
| Leitura dos sete artefatos ativos, fontes e utilitário | Uma ação oficial; conteúdo/estado atuais distinguidos da página placeholder |
| Script Node: IDs e links locais | RF01–RF07, CA01–CA13, EM01–EM12 e T001–T015 completos; 29 destinos de arquivo válidos nos sete documentos |
| Comparação das mensagens com conteúdo existente | Rótulo, sucesso e falha iguais a emailSupportContent.copyAction; fonte do payload e card conferida |
| Busca de mailto/subject/criarMailto na 015 ativa | Somente menções delimitando proibição/legado e este registro de busca; nenhuma tarefa ou roteiro exigindo a ação antiga |
| Busca nos consumidores 013/014/016 | Exigências específicas antigas corrigidas; menções de navegação genérica, proibição e registros históricos preservadas |
| Histórico | Sete originais conferidos integralmente, salvo links relativos ajustados |
| git diff --check | Sem erros |
| git status --short -- src tests | Sem saída; código/conteúdo executável/testes intactos |

Os links foram verificados quanto à existência de arquivos, não conteúdo
externo ou alvos DOM futuros. A suíte genérica da 016 pode incluir o teste
legado, explicitamente sem torná-lo requisito ou aceite da interface 015.

## Pendências

T013 global fecha apresentação dos estados e entrada compartilhada.
Implementação/controlador/navegação e testes reais EM01–EM12 permanecem futuros,
assim como consulta visual e revisão institucional. Não declarar CA01–CA13
aprovados só pela consistência documental. Próxima tarefa documental: T013.

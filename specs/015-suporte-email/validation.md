# Validação documental: Suporte por e-mail

Revisão atual: [verificação T013](../../docs/verificacoes/t013-canais-ajuda.md).
A seção “Integração compartilhada — T013” ao final registra o contrato vigente.

## Registro anterior — evidência histórica, não estado atual dos canais

20/10/2026 — T012 global. **Contrato ativo limpo; aceite funcional pendente.**
Revisados os sete artefatos da 015, conteúdo/código de referência e menções
nos consumidores 013/014/016/mapa. Nenhum TypeScript/teste alterado.

## Resultado da revisão

| Achado | Tratamento |
| --- | --- |
| Contrato anunciava cópia, mas critérios/tarefas ainda exigiam abertura de aplicativo | Objetivo, RF, CA, planos, tarefas e quickstart agora exigem apenas cópia do endereço |
| Assunto/URI e exemplos técnicos antigos ainda ativos | Removidos da base ativa; sete versões anteriores preservadas em histórico |
| V015-01: propriedades de contato/estado divergentes | contatos.ts é fonte de endereço; canais.ts de estado/aviso/destinos; consumidores não duplicam |
| V015-02: apresentação não ativa incompleta | Decisão documental fechada no contrato T013: referência com aviso sem incentivo; ação suspensa em não ativo |
| Inventário afirmava configuração ausente e canal pendente | Corrigido: fontes existem; e-mail ativo editorialmente; página ainda placeholder |
| Helper histórico confundido com entrega atual | Legado isolado, sem requisito de uso e sem reaproveitar seus checks como aceite da UI |
| Consumidores 013/016 tratavam ação antiga como funcionalidade | Referências pontuais ajustadas para cópia; navegação genérica nativa preservada |

## Critérios e limites

RF01–RF07/CA01–CA13 preservados e atualizados, mapeados em EM01–EM12.
Contrato atual usa node 425:201, rótulo Copie o e-mail, textos de sucesso/falha
da fonte editorial e manual disponível no ativo. Não exige aplicativo instalado,
assunto predefinido ou backend de mensagens.

A revisão T013 fechou documentalmente avisos/referência em não ativo, ambos
indisponíveis, CTA da FAQ e transição ao calendário. Aplicação no conteúdo/interface pendente.
Não há nova alteração de estado editorial ou validação de caixa postal.
Contato ativo editorialmente não equivale a SLA, entrega ou recebimento.

Consulta Figma/Make, ERS, revisão institucional, implementação e EM01–EM12 reais
continuam pendentes. Nenhum browser/clipboard, typecheck/build ou teste funcional
foi executado nesta rodada. Checks documentais em [verification](verification.md).
[Relatório anterior](historico/2026-10-20-pre-t012-validation.md) é histórico,
não descrição normativa ou evidência atual.

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

### Encerramento T013 — 21/10/2026

A migração de conteúdo antes pendente foi aplicada e testada: fontes únicas,
CTA da FAQ, estados e ações por contexto. Ver [registro atualizado](../../docs/verificacoes/t013-canais-ajuda.md).
Onze testes novos, suíte 36/36, typecheck e build passaram. Não equivalem à
implementação/validação visual ou operacional desta feature; preservar suas pendências.

## Revalidação T019 — 22/10/2026

Parecer atual: **contrato e conteúdo coerentes; UI de cópia não entregue**.
RF01–RF07/CA01–CA13 seguem para T001–T015 e EM01–EM12. O e-mail, estado e
`copyAction` derivam da fonte única, mas SuporteEmailPage ainda não renderiza o
botão/controlador de clipboard. O node compartilhado `425:201` respondeu por
metadados, sem aceite visual ou operacional. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

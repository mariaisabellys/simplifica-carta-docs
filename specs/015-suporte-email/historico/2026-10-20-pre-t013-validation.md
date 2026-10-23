# Validação documental: Suporte por e-mail

20/10/2026 — T012 global. **Contrato ativo limpo; aceite funcional pendente.**
Revisados os sete artefatos da 015, conteúdo/código de referência e menções
nos consumidores 013/014/016/mapa. Nenhum TypeScript/teste alterado.

## Resultado da revisão

| Achado | Tratamento |
| --- | --- |
| Contrato anunciava cópia, mas critérios/tarefas ainda exigiam abertura de aplicativo | Objetivo, RF, CA, planos, tarefas e quickstart agora exigem apenas cópia do endereço |
| Assunto/URI e exemplos técnicos antigos ainda ativos | Removidos da base ativa; sete versões anteriores preservadas em histórico |
| V015-01: propriedades de contato/estado divergentes | contatos.ts é fonte de endereço; canais.ts de estado/aviso/destinos; consumidores não duplicam |
| V015-02: apresentação não ativa incompleta | Pendência explicitamente mantida para T013 global; ação oficial suspensa em não ativo |
| Inventário afirmava configuração ausente e canal pendente | Corrigido: fontes existem; e-mail ativo editorialmente; página ainda placeholder |
| Helper histórico confundido com entrega atual | Legado isolado, sem requisito de uso e sem reaproveitar seus checks como aceite da UI |
| Consumidores 013/016 tratavam ação antiga como funcionalidade | Referências pontuais ajustadas para cópia; navegação genérica nativa preservada |

## Critérios e limites

RF01–RF07/CA01–CA13 preservados e atualizados, mapeados em EM01–EM12.
Contrato atual usa node 425:201, rótulo Copie o e-mail, textos de sucesso/falha
da fonte editorial e manual disponível no ativo. Não exige aplicativo instalado,
assunto predefinido ou backend de mensagens.

T012 não encerra T013: avisos/referência em não ativo, ambos canais indisponíveis,
CTA da FAQ e transição entre card e calendário ainda precisam de consolidação.
Não há nova alteração de estado editorial ou validação de caixa postal.
Contato ativo editorialmente não equivale a SLA, entrega ou recebimento.

Consulta Figma/Make, ERS, revisão institucional, implementação e EM01–EM12 reais
continuam pendentes. Nenhum browser/clipboard, typecheck/build ou teste funcional
foi executado nesta rodada. Checks documentais em [verification](../verification.md).
[Relatório anterior](../historico/2026-10-20-pre-t012-validation.md) é histórico,
não descrição normativa ou evidência atual.

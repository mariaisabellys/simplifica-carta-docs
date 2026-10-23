# Plano de implementação: Suporte por e-mail

Reconciliado em 20/10/2026 — T012 documental. [Spec](../spec.md), [plan](../plan.md),
[tasks](../tasks.md), [quickstart](../quickstart.md).
Código-base anterior preservado no [histórico](../historico/2026-10-20-pre-t012-implementation-plan.md);
não usar seus controles de abertura de aplicativo ou geração de mensagem.

## Contratos ativos

Fonte: supportContacts.gesed.email. Estado: supportChannels["suporte-email"].
Destino: supportDestinations. Copy: emailSupportContent.copyAction.
Card compartilhado: helpChannelsContent com kind copy-email.
Ambos devem usar mesma ação/controlador; não inferir outro destinatário
de URL, DOM, storage ou dados da Carta.

Rótulo Copie o e-mail; sucesso E-mail copiado!; falha Não foi possível copiar.
Selecione o endereço e copie manualmente. Preservar exatamente os textos do
conteúdo existente, sem string divergente no JSX.
copyAction.value e contact.address derivam da fonte única.
action:null existente não autoriza preencher link de contato alternativo.

Página atual renderiza placeholder/endereço e eventual action, mas não
copyAction: conteúdo pronto não significa interação entregue.
copiarTexto já existe e retorna success ou failed com unavailable/write-failed.
Reusar esse utilitário, sem recriar API de envio ou dependência da feature Carta.
O helper mailto é legado fora desta interface; não importá-lo na composição.

## Controlador e concorrência previstos

- Botão type=button, guarda síncrona antes de disparar copiarTexto(endereço).
  Sem operação em montagem/efeito, leitura de clipboard ou fallback oculto.
- Identidade estável por contato GESED; revisão monotônica por endereço/estado,
  requestId e geração de montagem distinguem tentativas, inclusive A/B/A.
- Coordenador neutro em memória acima dos pontos de montagem/rotas conserva
  trava de uma operação pendente do mesmo contato, inclusive nos cards
  compartilhados 014/015; não reter histórico nem usar storage.
- Não remover a trava ao mudar endereço/estado ou sair da rota: promessa pode
  continuar. Liberar ao concluir; somente tentativa/revisão/montagem atuais
  e canal ativo recebem feedback. Uma instância não deve anunciar sucesso
  herdado de outra. Nunca escrever automaticamente ao remontar.
- Copied por 5 s; failed até nova tentativa/mudança; pending por 10 s mostra
  demora/manual sem cancelar escrita. Timers de UI limpos ao desmontar.
  Se promessa não terminar, manual e navegação continuam disponíveis.
- Mudança para não ativo invalida feedback, suspende nova ação e não altera
  clipboard. Referência/manual em não ativo aguarda política da T013.
- API ausente/erro/negação/rejeição inesperada produzem falha verdadeira.
  Catch/finally defensivos; retorno tardio não altera contato novo.
- Foco fica no botão; status local curto com anúncio acessível, sem copiar
  endereço inteiro para mensagem de status. Não prometer exclusão entre abas,
  cancelamento por reload ou ordenação de escritas externas.

Proposta técnica futura, não hook já entregue. Reuso de controlador neutro
com 012 só se contratos forem compatíveis; não importar useFieldCopy da Carta.
Não expandir modelo da Carta para guardar contato/operação.

## Composição e arquivos futuros

| Arquivo/área | Trabalho |
| --- | --- |
| src/content/support/contatos.ts | Consumir fonte existente; não duplicar endereço |
| src/content/support/canais.ts | Consumir estado/destinos; política transversal na T013 |
| src/content/ajuda/suporte-email.ts e canais.ts | Consumir instruções/copy; completar mensagens auxiliares sem segunda configuração |
| src/pages/SuporteEmailPage.tsx / card compartilhado | Substituir placeholder, uma ação de cópia, endereço selecionável e retornos |
| src/lib/clipboard.ts | Reusar utilitário; alterar apenas se houver necessidade demonstrada |
| Controlador neutro e coordenador de cópia | Implementar contrato de tentativas; sem dependência da Carta |
| Estilos/tokens/shell | Inter, reflow, foco, breadcrumb e status local |
| Testes de componente/integração | Matriz abaixo, sem rede/envio real |

Figma: 425:201 no Design YaVUdqYa3boHpvGrxf4ZJ5, compartilhado com 014.
Consultar via MCP e conferir Make dVm7lEZdBFqOiiySWLWUqp node 0:1 antes de
implementar visualmente. [Mapa](../../../docs/design-system/mapa-figma-telas.md).
FAQ 169:495 não substitui esse frame. Layout deve acomodar copy atual,
endereço longo e estados de cópia, sem reprodução de texto antigo do desenho.

No ativo, endereço integral em texto selecionável/controle readOnly rotulado,
nunca disabled para seleção, sem espaços/quebras artificiais no payload.
Sem cortar com ellipsis. Validar seleção teclado/toque e quebra visual.
Um shell/main/h1 e sem CTA duplicado. Entradas compartilhadas, alternativas
não ativas e ausência de ambos os canais são dependências da T013, não resolvidas
por este plano. Nenhuma falha de backend da agenda remove contato ativo.

## Matriz de verificação futura

| ID | Cenário | Esperado / critérios |
| --- | --- | --- |
| EM01 | Ajuda/014/URL direta/recarga | Acesso livre e destinos explícitos; CA01/10 |
| EM02 | Fonte de contato alterada em fixture | Endereço e payload iguais em página/card, sem literal duplicado; CA02/09 |
| EM03 | Montagem e gesto explícito | Nenhuma escrita automática; um botão Copie o e-mail; só endereço, sem abrir aplicativo; CA03/08 |
| EM04 | Success/failed/API ausente/rejeição | Mensagens exatas e sucesso só após resolução; manual sempre disponível no ativo; CA04/05 |
| EM05 | Duplo clique/mesmo contato em dois pontos | Uma operação por identidade, guarda imediata; CA05 |
| EM06 | Troca de contato A/B/A ou estado durante pending | Sem feedback obsoleto nem nova escrita; trava até resolução; CA05/09/12 |
| EM07 | Sair/remontar e timers 5 s/10 s | Cleanup da UI, trava pendente preservada, demora não cancela; CA05 |
| EM08 | Carta preenchida, navegação e storage bloqueado | Preservar sessão, sem ler/transmitir Carta no suporte; CA07/10 |
| EM09 | Copy, segurança e rede | Sem coleta/anexos/rascunho/envio/protocolo; endereço não vai a endpoint; CA06/08/13 |
| EM10 | Estado compartilhado ativo/pendente/pausado | Não duplicar configuração; não ativo suspende ação; apresentação final depende T013; CA12 |
| EM11 | Teclado/leitor/toque/zoom/endereço longo | Foco, status e seleção integral; sem corte/overflow; CA11 |
| EM12 | Comparar 425:201 e consumidores | Dois cards no layout compartilhado, um fluxo de cópia, conteúdo prevalece; CA02/13 |

Matriz é plano, não resultado. Não usar testes do helper legado como aceite
desta interface. Após implementação executar suíte, typecheck e build; registrar
browser/OS/assistivo, versões, resultado e reteste. Usar ambientes controlados e
fixtures sintéticas; não enviar e-mail ou alterar clipboard real automaticamente.

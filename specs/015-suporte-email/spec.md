# Spec: Suporte por e-mail

Revisão documental T012 — 20/10/2026. Contrato vigente de exibição e cópia,
conforme decisão de produto de 16/10/2026. Versão anterior no
[histórico](historico/2026-10-20-pre-t012-spec.md), sem força normativa atual.

## Objetivo e limites

Permitir consultar e copiar o endereço da GESED para que o usuário prepare,
revise e envie sua própria mensagem no serviço de e-mail que preferir.
A única ação oficial de contato no portal é **Copie o e-mail**.
Não abrir aplicativo, gerar assunto/corpo predefinidos, enviar mensagem,
criar protocolo ou anunciar recebimento, leitura ou resposta.

Acesso independente por /ajuda/suporte-email, entrada da 013 e alternativa da
014, inclusive URL direta/recarga. Não exigir login, diagnóstico, Carta, CSV
ou atendimento anterior. Suporte orientativo não aprova nem publica Cartas.
Notificações de agendamento pertencem à 014, não a esta feature.

## Fontes e evidências

- [Contato](../../src/content/support/contatos.ts): supportContacts.gesed,
  endereço editorial gesed.semtd@gmail.com, confirmado documentalmente em 07/10.
- [Canais](../../src/content/support/canais.ts): supportChannels e
  supportDestinations; e-mail ativo para exibição/cópia pela decisão de 16/10.
- [Conteúdo da página](../../src/content/ajuda/suporte-email.ts) e
  [cards](../../src/content/ajuda/canais.ts): consumidores das fontes acima.
- [Navegação](../../docs/arquitetura/contrato-navegacao.md),
  [mapa visual](../../docs/design-system/mapa-figma-telas.md), specs 013/014/016.
- [Utilitário de cópia](../../src/lib/clipboard.ts): implementação neutra
  existente, não prova de interface integrada.

Confirmação editorial/estado ativo não comprovam titularidade, atividade,
recebimento ou prazo operacional. Não enviar mensagem de teste ao endereço.
Não houve consulta Figma/ERS ou validação institucional nesta revisão.

## Requisitos funcionais

### RF01 — Acesso e apresentação

Reusar shell, breadcrumb, título/foco e links internos compartilhados,
preservando a Carta. Referência 425:201, compartilhada com 014, apresenta
Atendimento Agendado e Suporte por e-mail. Card de e-mail mostra endereço,
instrução e um botão de cópia; não criar segunda ação de contato.
A rota direta permanece; posição/entrada compartilhada é consolidada em T013.

### RF02 — Fonte única e disponibilidade

Endereço exibido e payload de cópia derivam de supportContacts.gesed.email,
sem literal duplicado no JSX, cards ou controladores. Estado/aviso vêm de
supportChannels["suporte-email"]; destinos vêm de supportDestinations.
Não confundir rótulos editoriais da página com nova configuração de contato.

Estado atual é ativo para exibição/cópia. Não rebaixá-lo a pendente por ausência
de homologação operacional, nem afirmar que ativo garante resposta.
Pendente/pausado suspendem a ação oficial e mostram aviso verdadeiro e retorno
à ajuda; falha de clipboard não altera estado do canal. Apresentação não ativa segue o contrato de canais: endereço de referência
selecionável com aviso, sem botão ou incentivo a contato; ambos indisponíveis
mantêm orientações e retornos. Não aplicar fallback ativo.

### RF03 — Orientação

Explicar como copiar o endereço e colá-lo no campo de destinatário do serviço
de e-mail escolhido pelo usuário. Recomendar contexto da dúvida, órgão/setor
e etapa relacionada sem coletar esses dados no portal. O usuário escolhe
assunto e texto; não preencher mensagem nem exigir anexos/Carta/CSV.
Orientar a não enviar senhas ou dados pessoais de cidadãos. Sem compromisso
de prazo, atendimento imediato ou aprovação formal de rascunhos.

### RF04 — Cópia explícita

Botão type=button com rótulo **Copie o e-mail**. Montagem, foco ou navegação
não copiam automaticamente. Payload é somente o endereço exato da fonte,
sem protocolo, assunto, corpo, rótulo, markup ou dados da sessão.
Não ler clipboard, exigir consulta prévia de permissão ou usar fallback oculto.
Reusar copiarTexto sem dependência do domínio Carta/tutorial.
A página não utiliza mailto; o helper legado está fora da interface vigente.

### RF05 — Retorno e alternativa manual

Sucesso somente após retorno success: **E-mail copiado!**.
Falha/unavailable/write-failed: **Não foi possível copiar. Selecione o endereço e copie manualmente.**
Esses textos vêm de emailSupportContent.copyAction. Endereço legível e
selecionável no canal ativo antes/depois da tentativa, inclusive sem API.
Cópia manual não depende de detectar aplicativo instalado.
Trava imediata impede clique duplicado; revisão do endereço/estado invalida
retorno antigo. Não anunciar sucesso antecipado ou mensagem enviada.
Foco permanece no controle; status acessível local, sem depender só de cor/toast.

### RF06 — Continuidade

Não importar/ler/limpar/transmitir Carta ou diagnóstico para mostrar/copiar
contato. Preservar provider acima das rotas, sem segunda sessão ou rascunho.
Retornos explícitos para /ajuda e /formulario-carta; alternativa de atendimento
segue estado/destino compartilhado, sem prometer vagas ou criar solicitação.
Backend da agenda não é requisito de consulta/cópia do contato.

### RF07 — Conteúdo e segurança

Textos, rótulos, instruções e estados ficam em src/content; dados renderizados
como texto literal. Sem backend/SMTP, formulários, anexos automáticos, logs de
mensagem/Carta, credenciais ou persistência de mensagens.
Alterar a fonte de contato deve atualizar texto e payload juntos.

## Visual, acessibilidade e dependências

Node 425:201 do [mapa](../../docs/design-system/mapa-figma-telas.md) é a referência,
não 169:495 da FAQ. Layout se adapta ao conteúdo versionado. Consultar Design
e Make dVm7lEZdBFqOiiySWLWUqp, node 0:1 antes do trabalho visual; consulta pendente.
Reusar Inter/tokens, um main/h1 conforme shell, foco visível, ordem semântica,
botões por teclado, status local e endereço integral sem corte ou caracteres
inseridos por quebra visual. Verificar seleção por teclado/toque, reflow e zoom.

Dependências: 001/002 navegação/shell, 007 preservação de sessão, 013 entrada
e estados, 014 alternativa, 016 acessibilidade. Reuso apenas de utilitário
neutro de clipboard; não exigir página 012 montada. ERS, revisão institucional,
implementação e ambientes reais permanecem pendentes.

## Critérios de aceite

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CA01 | Entradas, URL direta e recarga | Canal acessível sem login, Carta, diagnóstico ou CSV |
| CA02 | Consultar contato ativo | Endereço legível igual à fonte e ao payload da única ação de cópia |
| CA03 | Acionar Copie o e-mail | Copiar somente endereço por gesto; não abrir aplicativo nem gerar mensagem/assunto |
| CA04 | Cópia indisponível | Endereço selecionável e orientação manual no canal ativo, sem depender de aplicativo |
| CA05 | Resolver, falhar ou repetir cópia | Sucesso somente após success, falha verdadeira, trava e ausência de feedback obsoleto |
| CA06 | Consultar orientações | Contexto recomendado sem coleta, mensagem preenchida ou anexos exigidos |
| CA07 | Navegar e retornar com Carta | Preservar dados, nenhum valor da Carta em payload/URL/requests |
| CA08 | Copiar ou falhar | Não anunciar envio, recebimento, leitura ou protocolo |
| CA09 | Mudar contato na fonte | Texto/payload atualizados juntos, retorno antigo invalidado |
| CA10 | Ajuda/formulário/alternativa | Destinos explícitos e coerentes com estado, sem reservar ou solicitar |
| CA11 | Teclado/leitor/zoom/endereço longo | Foco e status coerentes; seleção integral e sem corte/overflow |
| CA12 | Estado ativo/pendente/pausado | Estado compartilhado, sem promessa operacional; política não ativa conforme contrato de canais |
| CA13 | Arquitetura e layout | Conteúdo único, node 425:201, sem backend de envio/coleta/rascunho |

Critérios são futuros; nenhum aceite funcional é inferido desta limpeza documental.

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

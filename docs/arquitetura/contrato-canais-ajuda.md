# Contrato compartilhado de canais de ajuda — 013/014/015

20/10/2026 — T013 documental. Decisões de apresentação e navegação; não
comprovam interface, agenda ou atendimento operacional.
Atualização em 21/10/2026: migração de conteúdo concluída após autorização;
resolvedor em src/content/support/apresentacao.ts, consumido por canais.ts,
FAQ e conteúdos de entrada/e-mail/agenda. Testes e limites no registro T013.

## Fontes únicas e inventário

| Responsabilidade | Fonte canônica existente | Consumidores |
| --- | --- | --- |
| Endereço/equipe | `src/content/support/contatos.ts`, supportContacts.gesed | Card compartilhado e página da 015 |
| Estado/aviso editorial | `src/content/support/canais.ts`, supportChannels | FAQ, entrada compartilhada e acesso direto 014/015 |
| Destinos de rota | Mesmo canais.ts, supportDestinations | Navegação entre FAQ e páginas de canal |
| Textos da FAQ | `src/content/pages/ajuda.ts`, helpPageContent | Somente /ajuda; quatro perguntas |
| Textos dos cards | `src/content/ajuda/canais.ts`, helpChannelsContent | Composição compartilhada 425:201 |
| Cópia e instruções de e-mail | `src/content/ajuda/suporte-email.ts`, emailSupportContent | Card/rota da 015 |
| Textos de solicitação | `src/content/ajuda/atendimento-agendado.ts` | Calendário, formulário e resultado da 014 |

Nenhum consumidor cria cópia local de estado/endereço/destino. A resolução de
apresentação é compartilhada e pura: canal + estado editorial + contexto da
tela → aviso, texto e ação. Não converter estado de API em configuração editorial.
Rótulos por estado ficam versionados, sem condicionais com textos divergentes
em cada JSX. Contato e payload de cópia sempre da mesma fonte.

Inventário histórico em 20/10 (migração aplicada em 21/10): atendimento pendente, e-mail ativo; ambos os objetos existem.
Ativo significa habilitação editorial para a ação, não que a implementação
esteja entregue, que existam vagas ou que a caixa postal receba/responda.
A FAQ ainda tem título “Agende uma visita…” e CTA “Agendar visita ->” fixos.
O card de atendimento ainda tem kind navigate para sua própria rota.
Esses conflitos de conteúdo não foram corrigidos em TypeScript nesta tarefa.
AjudaPage já troca o rótulo não ativo por “Consultar atendimento ->”, hardcoded,
mas ainda renderiza o título de agendamento do conteúdo. Portanto há mitigação
parcial na interface, não alinhamento completo com a apresentação definida aqui.

## Estados editoriais versus estados operacionais

| Estado | Significado | O que não significa |
| --- | --- | --- |
| ativo | Ação habilitada editorialmente | Vagas agora, resposta imediata, entrega funcional ou publicação institucional comprovada |
| pendente | Ação ainda não liberada editorialmente | Falha de rede, agenda sem vagas ou cópia recusada |
| pausado | Suspensão editorial de novas ações | Cancelamento de solicitações existentes ou aborto de escrita/POST já iniciados |
| Ausente/desconhecido | Configuração inválida; falhar de forma conservadora | Nunca assumir ativo como fallback |

Agenda carregando, disponível, vazia ou com erro são estados operacionais
da 014, apenas quando sua ação estiver habilitada. Agenda vazia mostra
“Não há horários disponíveis no período consultado.” Erro mostra
“Não foi possível consultar os horários. Tente novamente.”
Não substituir um pelo outro, exibir horários fictícios ou pausar canal
automaticamente. Falha de clipboard é local da 015, não estado do canal.

## Apresentação por estado

| Canal/estado | Apresentação | Ação disponível |
| --- | --- | --- |
| Atendimento ativo | Descrição orientativa, sem promessa de vaga | “Consultar datas e horários” abre calendário interno |
| Atendimento pendente | Aviso único de supportChannels | Sem iniciar calendário ou nova solicitação; retorno/alternativa ativa |
| Atendimento pausado | Aviso único de supportChannels | Sem iniciar calendário ou nova solicitação; preservar contexto de tentativa existente |
| E-mail ativo | Endereço selecionável + instrução da 015 | “Copie o e-mail”, somente endereço; manual disponível |
| E-mail pendente | Aviso e endereço identificado como “Endereço de referência — canal indisponível” | Sem botão de cópia ou instrução incentivando contato; retorno/alternativa ativa |
| E-mail pausado | Mesma apresentação conservadora de referência + aviso de pausa | Sem botão de cópia ou instrução incentivando contato |
| Configuração inválida | “Este canal está indisponível no momento.” | Sem ação operacional; ajuda/formulário continuam acessíveis |

Endereço de referência pode permanecer texto selecionável por acessibilidade;
isso não o torna ação oficial ou promessa de atendimento. Não limpar clipboard
nem tentar impedir seleção nativa. Em não ativo, não mostrar a alternativa
“copie manualmente para entrar em contato”. Não inventar outro contato.

Ambos indisponíveis: manter FAQ, dois cards explicativos na entrada compartilhada,
avisos e retornos “Voltar à ajuda” e “Ir para o formulário da Carta”.
Texto: “Os canais de apoio estão indisponíveis no momento. Você pode consultar
as dúvidas frequentes e continuar preparando sua Carta.”
Não criar prazo de retorno, lista de espera, terceiro canal, formulário ou CTA
inoperante. Se apenas um canal ativo, sua ação permanece disponível no próprio
card. Alternativa só pode ser anunciada como operacional após entrega real
verificada, não pela mera existência de rota/placeholder.

## FAQ — composição e CTA

/ajuda mantém node 169:495, quatro perguntas, CTA superior
“Ainda preciso de ajuda ->” para /ajuda#precisa-de-apoio e seção de apoio.
Não acrescentar cards/e-mail à FAQ.

| Estado do atendimento | Título da seção de apoio | CTA e destino |
| --- | --- | --- |
| ativo | “Receba orientação da equipe de Serviços Digitais” | “Consultar atendimento ->” → supportDestinations["atendimento-agendado"] |
| pendente ou pausado | “Consulte os canais de apoio” + aviso do atendimento | “Ver canais de apoio ->” → mesmo destino, que exibe orientações/cards |
| inválido | “Consulte os canais de apoio” + aviso conservador | “Ver canais de apoio ->” → destino canônico existente |

Descrição geral de orientação pode ser preservada sem promessa de visita.
CTA continua sendo navegação informativa mesmo com ambos indisponíveis:
o destino explica os estados e não simula agenda. Não usar “Agendar visita”
como atalho operacional. Estado do e-mail não muda destino nem acrescenta
card na FAQ; sua ação pertence à entrada compartilhada.

## Entrada compartilhada e transições sem circularidade

Rotas preservadas: /ajuda/atendimento-agendado e /ajuda/suporte-email.
Ambas reutilizam a composição 425:201 (dois cards), sem duplicar seus contratos.
A rota da 015 foca a seção de e-mail; a da 014 abre a entrada de canais.
Nenhuma nova rota, query ou parâmetro é criado por esta decisão.

| Origem / evento | Destino ou mudança de estado |
| --- | --- |
| FAQ / CTA de apoio | Rota da 014, estado inicial entrada |
| Entrada 014 / atendimento ativo | Botão “Consultar datas e horários”: estado interno entrada → calendário; não navegar para a própria rota |
| Entrada 015 / atendimento ativo | AppLink para rota 014; lá o botão abre o calendário. Rótulo “Consultar atendimento”, sem prometer pular uma etapa |
| Qualquer entrada / e-mail ativo | Cópia no card, sem navegar ou abrir aplicativo; mesma ação da 015 |
| Entrada / canal não ativo | Aviso, sem botão operacional; não criar href # ou controle inerte |
| Calendário / data disponível | Mostrar horários reais, estado de seleção referenciado por 425:296 |
| Horário escolhido | Dados/revisão, variante 446:206 |
| Registro confirmado pela API | Resultado de solicitação registrada, variante 470:444; não “atendimento confirmado” |
| Calendário / “Voltar aos canais” | Estado interno entrada, preservando dados aplicáveis na sessão da 014 |
| Rota direta ou recarga sem tentativa recuperável | Entrada e estados atuais; nunca assumir calendário aberto ou dados de exemplo |

Estado de tela interno da 014: entrada, calendário, dados/revisão, resultado,
além dos estados de operação/recuperação já pertencentes à 014.
Não colocar datas, dados pessoais ou token de operação em query/hash.
Transições internas não criam history entries artificiais; voltar/avançar do
navegador segue rotas reais. Retorno/remontagem deriva entrada, salvo recuperação
segura de tentativa pela 014. A retenção/recuperação detalhada será fechada na T014.

Após botão interno, focar título da região calendário; após voltar, título
dos canais. Sem foco roubado por atualização de disponibilidade/clipboard.
Somente o calendário é montado como próximo passo; não duplicar o card de
atendimento com link circular dentro da mesma rota.

## Mudança de estado durante uma operação — dependência T014

Na UI, pendente/pausado impede iniciar novo calendário ou nova solicitação.
Não apagar dados já preenchidos, chave/payload de tentativa, resultado ou
referência existentes. Não tratar timeout como falha definitiva.
Se houver tentativa enviada/incerta, manter status e caminho de recuperação;
não induzir nova submissão com outra chave nem afirmar cancelamento.

**Revisão T014 — 21/10/2026:** o [contrato da agenda](../../specs/014-atendimento-agendado/contrato-agenda.md)
fecha autoridade do servidor, gate de novas criações e recuperação/replay.
Operação registrada válida é resolvida antes do gate; pausa não cancela registro.
Mudança de gate serializa com admissão nova; lookup/contexto permanecem disponíveis.
410 indica recuperação expirada, nunca ausência de registro. IN01–IN08 continuam
bloqueios institucionais/operacionais; definição técnica não ativa a agenda.

Na 015, mudança para não ativo invalida feedback e novas ações; promessa
pendente mantém trava até resolver conforme controlador da 015. Não tentar
cancelar escrita ou anunciar sucesso ao retornar. Recuperação da 014 não
depende da disponibilidade do e-mail ou da leitura da Carta.

## Migração de conteúdo — aplicada em 21/10/2026

| Arquivo | Ajuste aplicado no conteúdo/contrato de apresentação |
| --- | --- |
| pages/ajuda.ts | Substituir título/CTA fixos por apresentação resolvida conforme tabela; destino derivado de supportDestinations; preservar quatro FAQs |
| ajuda/canais.ts | Modelar ação de atendimento sensível ao contexto: abrir calendário interno na 014, navegar para 014 na 015; sem auto-link |
| ajuda/suporte-email.ts | Completar referência/aviso não ativo; separar manual ativo de referência sem incentivo a contato |
| ajuda/atendimento-agendado.ts | Textos de entrada/calendário, voltar, loading/vazio/erro e pausa sem apagar tentativa |
| support/canais.ts | Manter estado/aviso/destino únicos; não alterar o estado atual para simular implementação |
| support/contatos.ts | Preservar única fonte de endereço, sem nova constante nos consumidores |

Rótulos/tabelas acima foram aplicados ao conteúdo por resolução compartilhada.
getHelpChannelsContent recebe o contexto da rota; action pode ser null, navigate,
open-calendar ou copy-email. O componente futuro deve executar o discriminante,
sem fabricar href para open-calendar. A FAQ atual já consome título/aviso/CTA
resolvidos, sem string local. Agenda e composição completa dos cards continuam futuras.

## Matriz documental e testes futuros

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| CJ01 | Três estados × três estados dos dois canais | Nove combinações coerentes entre FAQ, entrada e acesso direto; sem default ativo |
| CJ02 | Estado atual: atendimento pendente/e-mail ativo | FAQ neutra, entrada explica indisponibilidade, e-mail copiável |
| CJ03 | Ambos pendentes/pausados | Dois avisos, consulta/retornos; nenhum CTA operacional ou prazo fictício |
| CJ04 | Atendimento ativo e API vazia/erro/loading | Estados distintos, sem alteração de supportChannels ou horário de exemplo |
| CJ05 | Botão de atendimento na própria 014 | Abre calendário interno e move foco, URL não navega para si mesma |
| CJ06 | Entrada 015 → 014; FAQ → 014 | Destino canônico, etapa de entrada explícita, sem loop ou abertura automática |
| CJ07 | Acesso direto/recarga/histórico/voltar aos canais | Estados atuais, rotas reais e retorno definido, sem dados em URL |
| CJ08 | Pausa durante preenchimento/POST incerto | Sem nova operação, dados/referência preservados; recuperação exige contrato T014 |
| CJ09 | Pausa durante cópia, sair/retornar | Sem novo write ou feedback obsoleto; trava da 015 preservada |
| CJ10 | Contato/destino alterado em fixture única | Todos os consumidores atualizados, sem literal duplicado |
| CJ11 | Configuração desconhecida ou incompleta | Falha conservadora, orientações/retornos, nunca ativo presumido |
| CJ12 | Teclado/leitor/reflow e Carta em memória | Foco/status coerentes, sem perda/leitura da Carta pelos canais |

Cenários não executados funcionalmente. Revisão documental não comprova
API, clipboard, Figma ou comunicação institucional.

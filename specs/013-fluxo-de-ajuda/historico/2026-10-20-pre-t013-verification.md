# Verificacao: Fluxo de ajuda

## Resultado e escopo

Executado `/spec:implementar 013-fluxo-de-ajuda` em 2026-10-05.
Entrega parcial: src/content/support/canais.ts define os dois IDs/destinos
fechados e os tipos pendente/ativo/pausado, conforme codigo base do plano
detalhado. Estados nao ativos exigem notice no tipo. Nao foi criado objeto de
configuracao operacional, aviso institucional ou consumidor visual.
O registro acima descreve a rodada de 2026-10-05. A pagina deixou de ser
placeholder na atualizacao editorial registrada abaixo.

## Atualizacao editorial — 2026-10-07

- `src/content/pages/ajuda.ts` foi adotado como contrato oficial da FAQ.
- A pagina passou a renderizar titulo, tagline, subtitulo, CTA interno, quatro
  perguntas com `details/summary` e a secao `Precisa de apoio?`.
- Foram substituidas as propostas antigas de sete assuntos, titulo
  `Preciso de ajuda`, retorno ao formulario e dois cards de canal.
- O encaminhamento da secao de apoio respeita o estado compartilhado da 014:
  enquanto pendente, exibe aviso e rotulo neutro sem prometer agendamento.
- A rota da 015 permanece independente e nao e adicionada como card nesta FAQ.

Esta atualizacao comprova alinhamento de conteudo e renderizacao basica, nao
homologacao visual do Figma nem operacao do atendimento.
T003 possui entrega parcial; nenhuma tarefa marcada concluida.

## Arquivos e consolidacao documental

Analisados spec.md, plan.md, tasks.md, implementation-plan.md e validation.md
da 013, constitution/regras para IA, contratos da 015 e inventario de src.
Alterados plan/tasks/implementation-plan para sincronizar pendente/ativo/pausado
e casos de ambos nao ativos, alternativa apenas confirmada e acesso ao proprio
destino. V013-02 teve correcoes documentais; validation.md permanece registro
historico da auditoria. Spec nao foi alterada. Adicionados este relatorio e
quickstart.md. Alteracoes anteriores do workspace foram preservadas.

## Verificacoes executadas

| Comando | Resultado |
| --- | --- |
| npm.cmd run typecheck | Passou |
| npm.cmd run build | Passou fora do sandbox, para evitar bloqueio de leitura do esbuild previamente identificado; Vite 7.3.6 |
| node --test tests/clipboard.test.mjs tests/csv.test.mjs | 10 testes existentes passaram; nao testam o fluxo 013 |

Nao foram adicionados testes que apenas repetem o mapa estatico. Nenhum teste
de interface, navegacao, FAQ, preservacao de sessao, acessibilidade ou canal
operacional foi executado. Typecheck valida os tipos compilaveis, nao comprova
consumidores ainda ausentes. Nenhuma mensagem, solicitacao ou consulta de
agenda foi enviada; nenhum contato foi publicado/duplicado.

## Pendencias para entrega completa

- Constitution, secao 6: "Antes de implementar trabalho visual, o Codex deve
  consultar via MCP". Figma MCP nao esta exposto nesta sessao; Design/Make nao
  consultados. Referencias em ../../docs/processo/constitution.md e
  ../../docs/ia/regras-para-ia.md. Interface e estilos permanecem pendentes.
- FAQ/descricoes requerem validacao editorial e conferencia do ERS. Nao
  anunciar previa/CSV/copia ou destinos placeholder como recursos entregues.
- V013-01 continua aberto: definir no dono 014 o comportamento da pagina e
  de tentativas em andamento quando canal estiver pendente/pausado. Aviso da
  entrada nao cancela solicitacao nem desativa API. Nenhuma regra inventada.
- Configuracao real de estados e avisos compartilhada com 014/015 ainda
  depende de confirmacao; mapa/tipos nao tornam canal ativo. Ambos constam
  como pendentes nos planos, sem prova de indisponibilidade operacional.
- Navegacao/hash/foco/Breadcrumb da 002/003, provider v2 da 007, canais reais
  014/015 e ambientes da 016 ainda faltam para integracao e aceite.

CA01–CA14 permanecem sem aceite integral. O contrato isolado apoia preparacao
de T003, sem comprovar encaminhamento operacional ou funcionalidade visivel.

# Validacao: Fluxo de ajuda

## Resultado e escopo

Executado `/spec:validar 013-fluxo-de-ajuda` em 2026-10-05.
**Resultado: requer consolidacao documental dos estados compartilhados;
ERS, Figma, copy e aceite dos canais reais permanecem pendentes.**

Foram avaliados SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Somente este relatorio
foi criado; os quatro artefatos e codigo-fonte nao foram alterados. Nenhuma
tarefa foi marcada como concluida. T006 registra validacao com pendencias,
sem aprovar canais operacionais ou implementacao visual.

## Fontes analisadas e limites

- [spec.md](../spec.md), [plan.md](../plan.md), [tasks.md](../tasks.md) e
  [implementation-plan.md](../implementation-plan.md): FAQ, destinos, estados,
  navegacao, exemplos tecnicos e cobertura RF01–RF05/CA01–CA14.
- 014: frontend, disponibilidade e alternativa por e-mail; 015: fonte unica
  contatos/canais e comportamento ativo/pendente/pausado, especialmente seus
  planos detalhados. Busca nos artefatos da 014 por estados editoriais.
- Contratos e validacoes anteriores de 002/003/007–012: navegacao compartilhada,
  provider acima das rotas, sessao e limites de validacao/transferencia.
- `src/pages/AjudaPage.tsx` e ADR-003; contexto local de constitution,
  produto/roadmap/design inspecionado nas rodadas anteriores.

O ERS PDF nao foi extraido/inspecionado. A verificacao de ferramentas registrada
na 006 nao encontrou Python/py/Poppler; nao houve instalacao nesta rodada.
Manual textual nao substitui PDF. Nao ha ferramenta Figma utilizavel exposta;
node 169:495 e referencia local de FAQ, sem confirmacao da composicao completa.
Nao houve validacao editorial pela equipe, verificacao operacional de canais,
envio de mensagem, criacao de solicitacao ou teste de interface.

## Lacunas documentais e consolidacao

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V013-01 | Media, dependencia compartilhada | IMPLEMENTATION-PLAN Estados editoriais exige configuracao unica consumida por 013/014/015, incluindo acesso ao destino pausado com explicacao. A 015 detalha canais.ts e os tres estados. A 014 referencia estado editorial apenas para alternativa por e-mail; nao detalha estado do proprio canal nem sua pagina em pendente/pausado. | Consolidar o contrato no dono 014 com 013/015: aviso, acesso direto ao destino e comportamento da consulta/solicitacao quando canal esta pendente ou pausado. Nao supor que aviso no card desativa API, cancela solicitacao ou substitui estados de agenda. Decidir impacto sobre tentativa em andamento antes de implementar gate. |
| V013-02 | Baixa | TASK T003 e PLAN usam publicado/pausado; IMPLEMENTATION-PLAN escolhe pendente/ativo/pausado e declara ativo equivalente a publicado. T009/T012 detalham pausa, mas nao os casos pendente ou ambos sem alternativa. | Sincronizar vocabulario do contrato e listar casos de pendente, ambos pendentes/pausados e alternativa somente confirmada. Nao ha conflito semantico provado entre ativo/publicado, pois equivalencia esta explicita; a lacuna e de consistencia operacional e cobertura das tarefas. |

O codigo-base da 013 propoe apenas links de orientacao, inclusive para estado
nao ativo, sem executar fluxo de atendimento. V013-01 nao autoriza inserir
consulta de agenda, backend, mailto ou monitoramento na entrada de ajuda.

## Requisitos e contratos consistentes

- RF01–RF05 e todos os 14 criterios constam nas matrizes de PLAN, TASK e
  IMPLEMENTATION-PLAN; nao ha criterio novo de agendamento da Carta a inserir
  artificialmente numa pagina que nao configura ou transfere esses dados.
- Ajuda acessivel sem Carta, diagnostico, CSV ou login, por URL/recarga e
  navegacao compartilhada. FAQ nao e requisito para escolher canal.
- Sete assuntos editoriais cobrem preparacao, etapas, sessao, validacao,
  previa/CSV/copia e orientacao, sem aprovacao ou importacao externa prometidas.
- details/summary nativos sao estrategia proposta unica, multiplas respostas
  abertas, sem estado persistido; referencia visual ainda precisa confirmar
  apresentacao. Expandir nao cria solicitacao ou coleta informacoes.
- Destinos fechados por ID: atendimento-agendado e suporte-email. Selecionar
  apenas navega; nao reserva, envia, notifica ou confirma recebimento.
- Ativo indica fluxo validado/publicado, nao vagas ou resposta imediata;
  pendente nao comprova falha, pausado exige confirmacao e aviso verdadeiro.
  Agenda vazia/erro de API pertence a 014 e nao muda automaticamente estado
  editorial. Ambos inativos nao autorizam alternativa ficticia.
- Fonte unica de estados proposta; contato pertence a 015 e nao e duplicado
  na entrada. Endereco placeholder nao e canal confirmado.
- Carta/diagnostico preservados pelo provider e navegacao acima das rotas,
  sem leitura, props de dominio, storage, dados em URLs ou mensagens da ajuda.
- Retorno fixo ao formulario funciona sem historico anterior ou consulta da
  Carta para escolher label. Nenhum provider substituto ou segunda Carta.
- Ancora exata /ajuda#duvidas-frequentes, foco seguro, historico/hash e offset
  sticky compartilhados; sem handler global concorrente ou foco repetido.
- FAQ/cards locais nao dependem de backend, SMTP ou agenda. Indisponibilidade
  de canal nao remove respostas. Criterio integrado CA13 depende dos destinos
  reais, distinto de verificar href para placeholders.

Nao foi encontrada referencia que transforme agendamento da Carta em pedido
de atendimento GESED, nem envio automatico de Carta/diagnostico aos canais.
As notas de ausencia de specs na criacao estao identificadas como historicas;
PLAN/TASK/plano detalhado reconhecem documentos atuais e codigo pendente.

## Pendencias e impactos para implementacao futura

| Ponto | Acao necessaria |
| --- | --- |
| ERS/copy | Confrontar PDF e validar FAQ, descricoes e avisos com equipe, registrando fonte/responsavel/data; criacao do plano nao e homologacao. |
| Figma | Consultar Design/Make, confirmar FAQ, dois canais e retorno ou frames adicionais; node FAQ nao comprova formularios 014/015. |
| Estados compartilhados | Fechar V013-01/V013-02 e dono da configuracao neutra canais.ts. Nao usar ativo por default ou pausa baseada em falha isolada de agenda. |
| Canais operacionais | Confirmar contato da 015 e entrega real da 014 antes de alternativa operacional/CA13. Nao enviar e-mail nem submeter atendimento real para testar encaminhamento. |
| Navegacao | Conciliar useAppNavigate/useNavigation de 002/003, conforme validacoes anteriores; entregar AppLink/Breadcrumb e tratamento de pathname/hash/popstate antes de usar exemplos. |
| Providers | Carta e diagnostico acima das rotas sem key por pathname; testar memoria com storage indisponivel. Preservar estado nao exige que AjudaPage importe hooks de dominio. |
| Ambientes | Registrar browsers/leitores/dispositivos, foco/expansao, respostas longas, zoom/reflow e recarga SPA. Ambiente nao executado permanece pendente. |

Nenhum novo contato, prazo, horario, mecanismo de pausa ou regra de backend
foi inventado. A decisao sobre comportamento do destino 014 pausado permanece
explicita para fechamento conjunto, sem expandir escopo da 013.

## Verificacoes e arquivos alterados

AjudaPage permanece PageHeader e dois PlaceholderCards sem links/FAQ,
conforme inventario do plano. Isso nao comprova criterios de navegacao,
acessibilidade, preservacao ou operacao de canais.

Nao foram instaladas dependencias nem executados build/typecheck ou testes
como evidencia de comportamento ainda planejado. Verificacoes futuras devem
cobrir FAQ/teclado, hash/historico, estados/alternativas, memoria preservada,
ausencia de leitura/envio e destinos reais, com evidencias em verification.md.

Somente `specs/013-fluxo-de-ajuda/validation.md` foi criado.
Os quatro artefatos e src permaneceram intocados, sem tarefas concluidas
automaticamente. Consolidar V013-01/V013-02 e dependencias aplicaveis antes
de repetir a validacao e implementar trabalho dependente. Este relatorio
nao aprova canais, copy ou implementacao visual/funcional.

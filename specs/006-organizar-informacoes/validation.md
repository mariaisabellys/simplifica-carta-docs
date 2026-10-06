# Validacao: Organizar informacoes

## Resultado e escopo

Executado `/spec:validar 006-organizar-informacoes` em 2026-10-05.
**Resultado: requer ajustes documentais e permanece pendente de validacao
integral das fontes. Nao aprovado para implementacao visual ou aceite funcional.**

Esta rodada compara SPEC, PLAN, TASK e IMPLEMENTATION-PLAN com as fontes
locais, roadmap, constitution, contratos relacionados e codigo existente.
Nao implementa a funcionalidade, nao homologa copy e nao modifica os quatro
artefatos avaliados. Somente este relatorio foi criado. Nenhuma tarefa foi
marcada como concluida; T005 nao possui evidencia de validacao sem bloqueios.

## Fontes efetivamente analisadas

- [spec.md](spec.md), [plan.md](plan.md), [tasks.md](tasks.md) e
  [implementation-plan.md](implementation-plan.md), incluindo exemplos tecnicos.
- `docs/processo/constitution.md`, `docs/ia/prompts-padroes.md`, regras de IA
  e `docs/implementation-plan.md`: significado do comando e limites de codigo.
- README, roadmap `specs/README.md` e manual textual de levantamento:
  preparacao, lista consultiva, cadastro manual e dados temporarios.
- Produto: fluxos, MVP e escopo; arquitetura: decisoes tecnicas.
- Design: mapa de telas e tokens/componentes locais. Esses documentos sao
  referencias locais, nao evidencia de consulta aos arquivos Figma.
- 002/003: contratos de navegacao/breadcrumb e entrada da etapa 2.
- 004: alinhamento conceitual dos assuntos, consultado na revisao documental.
- 007/008: agendamento condicional, campos opcionais e obrigatoriedade;
  013: destino de ajuda; 016: verificacoes transversais e plano detalhado atual.
- Codigo: routes, App, AppShell, ButtonLink, PageHeader, pagina da 006,
  conteudo editorial de exploracao, tipos/schema/storage da Carta,
  tokens/estilos e scripts de package.json.

Nao foi possivel concluir o confronto com o ERS PDF ou com Design/Make:

- O PDF `Documento de Requisitos - Manual de Levantamento de Serviços-2.pdf`
  existe, mas nao foi extraido ou inspecionado nesta rodada. A skill de PDF
  foi consultada para a leitura; Python/py/Poppler nao foram encontrados nos
  comandos verificados, nem executaveis correspondentes nas pastas de runtime
  consultadas. Nao foram instaladas dependencias. O manual textual nao e
  substituto declarado do PDF.
- Nenhuma ferramenta MCP Figma esta exposta nesta sessao. Nao afirmar que
  o plugin esta instalado/desinstalado ou conectado/desconectado: o fato
  verificavel nesta rodada e a ausencia de ferramenta de consulta utilizavel.
- O mapa nao identifica frame proprio da 006. `575:483` pertence a 003,
  conforme os quatro artefatos; nao pode aprovar visual da pagina de organizacao.

Esses limites impedem validacao integral, mas nao impedem registrar as
inconsistencias comprovadas nas fontes locais.

## Inconsistencias documentais

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V006-01 | Alta | PLAN, InformationTopicId e tabela de correspondencia, linhas 94–135: nome-popular separado e onze linhas numeradas. SPEC RF03, TASK T003/T006/T007 e IMPLEMENTATION-PLAN definem dez assuntos. | O PLAN contradiz a cardinalidade/ordem que ele proprio afirma. Integrar nome popular opcional ao assunto Nome, conforme a decisao explicita do plano detalhado; manter os dez IDs e ordem RF03, sem criar nova funcionalidade. |
| V006-02 | Media | IMPLEMENTATION-PLAN, tabela de correspondencia, linha 107: Agendamento ainda referencia apenas exigeAgendamento e orientacaoAgendamento. SPEC RF03, TASK T001 e copy tecnica do mesmo plano ja citam tipo/sistema/link/exibicao. | Tabela incompleta do modelo antigo pode orientar levantamento insuficiente. Referenciar atendimento.exigeAgendamento, tiposAgendamento, sistemaAgendamento e linkAgendamento/exibicaoAgendamento somente para sistema externo; manter orientacaoAgendamento como complemento opcional. |
| V006-03 | Alta, dependencia compartilhada | IMPLEMENTATION-PLAN da 006, linhas 128–156, escolhe useAppNavigate(): funcao e ButtonLink.onNavigate. Plano da 002 usa esse contrato; exemplo Breadcrumb da 003, linhas 404–425, usa useNavigation(): objeto e preventDefault incondicional. Codigo atual ainda nao entrega o contexto/Breadcrumb ou prop onNavigate. | Nao copiar os exemplos em conjunto: APIs incompativeis e cliques modificados interceptados. Consolidar o contrato no dono 002/003, atualizar exemplos afetados e verificar consumidores antes da integracao T008. A 006 nao deve criar roteador/contexto paralelo. |
| V006-04 | Baixa | PLAN Estado atual, linha 54, afirma ausencia de 007/013/016; linha 141 pede conferir 007/008 quando existirem. TASK e plano detalhado esclarecem que essas specs existem. | Atualizar o inventario atual para distinguir documentos presentes de implementacoes pendentes. A nota explicitamente historica da SPEC pode permanecer identificada como historica. |
| V006-05 | Baixa | IMPLEMENTATION-PLAN, evidencia CA10, linha 400, exige sem hooks; exemplo React do proprio documento usa useAppNavigate. SPEC proibe leitura/coleta/persistencia de dominio, nao hook de navegacao. | Trocar a descricao por ausencia de hooks/efeitos de dominio, storage, API e progresso; permitir o hook compartilhado de navegacao. Evita rejeitar o exemplo aprovado pelo contrato proposto. |
| V006-06 | Media | IMPLEMENTATION-PLAN, linha 91, resume a 008 como cinco obrigatorios locais; a 008 atual tem cinco gerais e obrigatoriedade condicional de agendamento com Sim e sistema externo. | Atualizar a referencia para cinco gerais mais condicionais da 007/008, sem inserir validacao na pagina consultiva ou transformar os dez assuntos em obrigatorios universais. |

V006-01 e V006-02 sao divergencias remanescentes da revisao documental anterior.
O conteudo novo de agendamento esta presente na SPEC e no exemplo editorial,
mas a tabela tecnica antiga nao foi integralmente alinhada. A conclusao
anterior de ausencia de referencias conflitantes nao se sustenta para esses
pontos; esta rodada registra a ressalva explicitamente.

As correcoes indicadas nao exigem inventar nova regra de negocio. Este comando
registra a validacao; nao apresenta divergencia como resolvida por existir
uma recomendacao de ajuste.

## Pendencias de fontes, decisao e entrega

| ID | Pendencia | Responsavel/referencia | Condicao de fechamento |
| --- | --- | --- | --- |
| P006-01 | Confronto com ERS PDF | T003/T005 | Extrair/inspecionar trechos pertinentes e registrar correspondencia, inclusive lista orientativa versus eventual interacao; conciliar divergencias antes do codigo. |
| P006-02 | Frame proprio e contexto Design/Make | T002/T004, mapa Figma | Consulta real dos dois arquivos, node correto, estados/tokens/composicao e divergencias documentados. |
| P006-03 | Redacao institucional nao homologada | T003 | Evidencia de revisao da equipe, responsavel/data e decisao sobre exemplos, sem presumir homologacao pelo Figma. |
| P006-04 | Navegacao/Breadcrumb compartilhados ainda planejados | 002/003, T001/T008 | Resolver V006-03 e entregar contrato real com href/modificadores/historico/foco; conferir memoria da Carta. |
| P006-05 | Entrada 003 e destinos 007/013 funcionais | Features proprietarias | Testar entrada e retornos em paginas reais; href correto nao aprova jornada. |
| P006-06 | Preservacao da Carta e memoria sem storage | 007, T011 | Provider/formulario entregues e teste integrado de textos/listas/escolhas, inclusive agendamento condicional; 006 nao le/escreve Carta. |
| P006-07 | Encaminhamento de diagnostico e ambiente publicado | 005/017 | Entregar dependencias proprias; validar fallback de URL direta/recarga no deploy sem confundir Vite com ambiente publicado. |
| P006-08 | Medicoes e ambientes assistivos | 016, T012 | Executar teclado/leitor/reflow/contraste nos contextos reais, registrar versoes e indisponibilidades; emulacao nao substitui leitura movel. |

Protocolos permitidos de URL e capacidade de exibicao interna do sistema
externo continuam pendencias das features 007/011. A 006 apenas orienta seu
levantamento; nao precisa definir iframe/API, testar URL remota, executar
agendamento ou enviar dados para fechar seu conteudo consultivo.

## Comparacao com produto, constitution e roadmap

- A jornada diagnostico > organizacao > formulario e o acesso independente
  estao coerentes com os fluxos e entrada da 003. Acesso direto nao tem gate.
- Escopo consultivo, conteudo versionado, cadastro manual, ausencia de
  backend/coleta/progresso e preservacao de dados estao coerentes com o MVP.
- A palavra checklist no manual textual nao define, por si, checkbox,
  pontuacao ou progresso. A decisao consultiva esta explicita nos artefatos,
  mas sua confirmacao frente ao PDF continua em P006-01.
- A 006 aparece no roadmap e a rota existente tem path, specId, layoutType
  e showInNav coerentes. A pagina atual e placeholder, nao entrega da feature.
- Codigo apenas em /spec:implementar e consulta Figma antes de trabalho
  visual sao respeitados nesta rodada; nao houve alteracao executavel.
- Inter/tokens, shell unico e requisitos de acessibilidade sao previstos;
  isso nao comprova contraste, teclado ou fidelidade visual.
- Agendamento da Carta e item unico de levantamento, separado do suporte
  agendado GESED. O novo fluxo aparece na copy, mas exige alinhar V006-02/06.

## Cobertura dos requisitos

| Requisito | Cobertura documental | Limite atual |
| --- | --- | --- |
| RF01 | Rota, entradas, shell e breadcrumb planejados | Contrato compartilhado/entrada/deploy pendentes |
| RF02 | Titulo, introducao, confirmacao e publicacao manual previstos | Copy/ERS pendentes |
| RF03 | SPEC e exemplo com dez assuntos, desconhecidos e agendamento condicional | Divergencias V006-01/02/06 |
| RF04 | Consulta livre, sem controles ou progresso, coerente | Confirmacao ERS e interface real pendentes |
| RF05 | Destinos livres e preservacao sem suporte duplicado | Navegacao e provider reais pendentes |
| RF06 | Conteudo tipado fora do JSX, acentos e revisao editorial | Homologacao futura; nao executada |

## Cobertura de criterios de aceite

Esta tabela verifica rastreabilidade documental. **Nenhum CA funcional foi
aprovado por inspecao dos planos.** A implementacao e os testes reais ainda
nao foram executados.

| CA | Tarefas | Resultado desta validacao documental |
| --- | --- | --- |
| CA01 | T001/T008/T010 | Acesso independente previsto; navegacao/recarga publicada pendentes |
| CA02 | T001/T008/T010 | Destino da etapa 2 coerente; rota/pagina da 003 ainda ausentes |
| CA03 | T003/T006/T007/T010 | Divergente no PLAN: dez versus onze; agendamento exige tabela alinhada |
| CA04 | T003/T006/T010 | Distincao desconhecido/gratuito/sem exigencia coerente; copy nao homologada |
| CA05 | T006–T008/T010 | Acao sempre livre prevista; destino funcional depende da 007 |
| CA06 | T008/T011 | Nao leitura/escrita da Carta prevista; integracao/provider pendentes |
| CA07 | T008/T010 | Ajuda sem suporte duplicado prevista; funcionamento depende da 013 |
| CA08 | T008/T009/T012 | Estrutura/nomes/foco previstos; V006-03 e ambiente assistivo pendentes |
| CA09 | T009/T012 | Larguras/texto/reflow previstos; medicao/interface reais pendentes |
| CA10 | T003/T006/T007/T014 | Conteudo/escopo coerentes; ajustar proibicao generica de hooks, V006-05 |
| CA11 | T003/T006/T010 | Comunicacao sem aprovacao/publicacao automatica coerente; validacao editorial pendente |
| CA12 | T002/T004/T005/T009/T012/T014 | Nao verificavel contra Figma nesta sessao; frame desconhecido |

Todos RF01–RF06 e CA01–CA12 possuem tarefas relacionadas. A existencia da
rastreabilidade nao resolve inconsistencias, comprova implementacao ou
dispensa fontes institucionais e verificacoes visuais.

## Verificacoes executadas e nao executadas

Executado: leitura e busca cruzada dos documentos, confronto de quantidade/
ordem/IDs, contratos de links e estado, referencias de agendamento, caminhos
existentes, inventario de ferramentas e rastreabilidade RF/CA/T.

Nao executado: build/typecheck, instalacao de pacotes, testes de UI/sessao,
auditoria WCAG, medicao de contraste, comparacao visual Figma, extracao ou
inspecao do PDF, publicacao, alteracao de backend ou banco. Comandos tecnicos
dos planos permanecem verificacoes futuras, nao evidencias desta rodada.

Nao houve envio institucional, copia de valores de usuarios ou leitura de
sessionStorage de navegador. A inspecao de carta.storage.ts e somente leitura
do codigo que descreve o contrato atual.

## Sequencia para revalidacao

1. Alinhar PLAN e tabela tecnica com dez assuntos e novo agendamento;
   corrigir inventario atual, referencia de obrigatorios e evidencia CA10.
2. Consolidar navegacao/Breadcrumb com 002/003 e registrar a API unica;
   resolver ERS, Design/Make e revisao editorial com evidencia real.
3. Reexecutar /spec:validar 006-organizar-informacoes. Somente depois de
   fechar os bloqueios pertinentes, seguir para /spec:implementar.
4. Na implementacao, executar os checks e testes integrados T010–T014,
   mantendo dependencias ausentes como pendentes e resultados em verification.md.

Este relatorio nao autoriza iniciar codigo nem declara o produto aprovado.

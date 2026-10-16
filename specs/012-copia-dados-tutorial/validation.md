# Validacao: Copia de dados no tutorial

> **Baseline atualizado em 16 de outubro de 2026:** seletores v2 estão
> superados; repetir a validação com a projeção da Carta v3.

## Resultado e escopo

Executado `/spec:validar 012-copia-dados-tutorial` em 2026-10-05.
**Resultado: requer ajustes documentais e decisao sobre preservacao das
quebras na alternativa manual; fontes e aceite funcional permanecem pendentes.**

Foram avaliados SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Somente este relatorio
foi criado, sem alterar esses artefatos ou codigo-fonte, nem concluir tarefas.
T007 registra validacao com pendencias, nao aprovacao sem bloqueios.

## Fontes analisadas e limites

- [spec.md](spec.md), [plan.md](plan.md), [tasks.md](tasks.md) e
  [implementation-plan.md](implementation-plan.md): campos, seletor,
  clipboard, promises, revisoes, timers, componentes, testes e rastreabilidade.
- Contratos da 007 e plano/validacao da 011 inspecionados nas rodadas
  anteriores: sessao, campos ativos, composicao e anchors do tutorial.
- Contexto local de constitution/produto/roadmap/design e codigo de tutorial,
  modelo e storage inspecionados nas validacoes anteriores; busca em todo src
  por clipboard/writeText/execCommand, sem mecanismo implementado encontrado.
- [Clipboard API — writeText](https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext)
  e [HTML Standard — textarea](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element),
  consultados nesta rodada em 2026-10-05. A primeira referencia e um Editor's
  Draft, nao prova de comportamento uniforme dos navegadores.

O HTML Standard define normalizacao de quebras para LF no valor API do
textarea. A referencia Clipboard descreve operacao assincrona e tratamento
de texto conforme plataforma. Essas fontes nao comprovam permissao, resultado
real de copia/colagem ou selecao por teclado/toque no ambiente do usuario.

O ERS PDF nao foi extraido/inspecionado. A verificacao de ferramentas registrada
na 006 nao encontrou Python/py/Poppler; nao houve instalacao nesta rodada.
Manual textual nao substitui PDF. Na rodada original, nao havia ferramenta
Figma utilizavel e o frame ainda nao estava confirmado. Nao houve leitura/escrita do
clipboard, consulta a conta externa, teste de browser ou validacao editorial.

### Atualizacao Figma, conteudo e integracao — 2026-10-08

O frame da area de copia foi identificado: variante da etapa 4 da feature 011,
[node `564:980`](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-980&m=dev).
A lacuna de identificacao esta resolvida; continuam pendentes consulta MCP
detalhada, implementacao e validacao visual.

O contrato atualizado monta a 012 somente em `fill-information`
(`/tutorial-paraiba-digital?etapa=4`). `tutorialParaibaDigitalContent.steps[3]`
e a fonte de ordem, labels, introducao, `copyLabel`, edicao e navegacao: dez
blocos visuais, seis copiaveis. O seletor interno nao autoriza criar cards.
`keywords` tem origem em `informacoesFinais.palavrasChave`, sem inferencia.

## Inconsistencias e lacunas documentais

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V012-01 | Alta, decisao de aceite | PLAN contrato/Preservacao e TASK T013 exigem igualdade exata entre texto selecionavel e parametro writeText, incluindo CR/LF/CRLF. IMPLEMENTATION-PLAN, Operacao browser, reconhece normalizacao de CR/CRLF no textarea e pede conciliacao nesta validacao. | Distinguir preservacao integral da fonte/string enviada de representacao/selecao manual e resultado do sistema operacional. Decidir se preservacao de conteudo e quebras visiveis basta para a alternativa manual ou se terminadores exatos sao exigidos. No segundo caso, revisar controle/contrato e comprovar comportamento. Nao reduzir requisito silenciosamente nem normalizar a Carta para fazer teste passar. |
| V012-02 | Media | SPEC inclui CA15 e TASK matriz o vincula a T002/T008/T013/T015. Matrizes de PLAN e IMPLEMENTATION-PLAN terminam em CA14. | Incluir CA15 nas evidencias de aceite com campos ativos/inativos, modalidades, troca/restauracao, fonte preservada e copia parcial sem gate global. |
| V012-03 | Media | TASK T013–T015 e fixtures do IMPLEMENTATION-PLAN cobrem respostas/orientacao e corridas de texto, mas nao detalham os dois sistemas, modalidades e ocultacao durante tentativa pendente. | Adicionar casos para Online/Presencial/ambos, sistema nativo com URL/exibicao retidas, externo dentro/fora, campos ativos missing e troca/restauracao/recarga. Durante ocultacao, conferir desmontagem dos controles, limpeza de timers, UI tardia ignorada e ausencia de confirmacao herdada ao reativar. Verificar anchors com a 011, sem copiar mensagens ou exigir completude global. |
| V012-04 | Baixa | IMPLEMENTATION-PLAN, Revisao documental aplicada: orientacaoAgendamento descrita como imediatamente apos agendamento. Contrato atual coloca quatro campos estruturados entre agendamento e como-agendar. | Atualizar a descricao historica para explicitar ordem final ou marcar que se refere a revisao anterior aos quatro campos novos. Tabela, uniao de IDs e seletor atuais ja possuem a ordem correta. |

V012-01 nao foi resolvido por inferencia: a propria base tecnica pede decisao
de aceite antes do codigo. Nenhum controle novo ou normalizacao foi implementado.

## Contratos e regras consistentes

- Copia individual na pagina da 011, independente de diagnostico, required,
  previa ou CSV. Tutorial continua consultavel sem Carta.
- Uma Carta da 007; seletores puros, sem storage proprio ou segunda versao
  editavel. Texto util preservado; listas com atributos null e numeros com
  lacunas nao recebem valores ficticios ou renumeracao.
- Cobertura maxima de 17 campos. Seletor filtra configuracoes quando resposta
  nao e Sim e link/exibicao quando sistema nao e externo; inativos nao sao
  campos missing visiveis. Dados permanecem na sessao.
- True/false explicitos geram Sim/Nao; null e missing. False legado depende
  do decoder, sem inferencia por outros campos preenchidos. Custo 0 e valido.
- Campo ativo missing nao copia Nao informado, null, placeholder ou exemplo.
  Campo ativo preenchido pode ser copiado com Carta parcial e pendencias.
- Clipboard recebe string derivada, sem labels, mensagens, DOM innerText,
  CSV/BOM/quoting/protecao de formula ou transformacao editorial.
- writeText somente por gesto explicito, com recusa/API ausente/contexto
  inseguro tratados. Sem leitura de clipboard, consulta de permissao como
  requisito, copia automatica ou fallback invisivel que anuncie sucesso.
- Copiado! somente apos sucesso, associado a tentativa/revisao. Mudanca A/B/A
  invalida retorno antigo; promessa externa nao e cancelada pelo timer de UI.
- Trava por campo, callbacks ignorados apos desmontagem, timers limpos;
  outros campos independentes. Copia concluida nao confirma colagem/publicacao
  nem qual valor permanece no clipboard apos outras gravacoes.
- Manual permanece acessivel; textarea readOnly selecionavel, retorno curto
  por campo, sem foco automatico ou execucao de HTML. Estado da copia nao
  persiste no envelope e app nao promete apagar clipboard no fim da sessao.
- 011 controla composicao/editorial; 012 controla tipos neutros, seletor e
  mecanismo. Utilitario reutilizavel pela 015 sem carregar Carta ou criar ciclo.
- A 012 nao monta nas etapas 1–3 ou 5–6. Sair da etapa 4 elimina feedback e
  callbacks de UI, mas nao limpa a Carta mantida pela 007.

Nao foi encontrada regra principal que copie campos inativos ou infira Nao
do default legado. A obrigatoriedade condicional da 007 nao vira gate global
de copia; a 012 nao valida nem executa capacidade de integracao externa.

## Pendencias e impactos para implementacao futura

| Ponto | Acao necessaria |
| --- | --- |
| Quebras de linha | Fechar V012-01 e refletir decisao em SPEC/PLAN/TASK/plano detalhado conforme impacto. Testar separadamente fonte/string derivada, parametro API, DOM selecionavel e colagem real; mocks nao comprovam bytes no sistema. |
| Trava apos ocultacao/remount | A regra impede concorrencia do mesmo campo, mas o hook guarda lock na instancia e campos inativos sao desmontados. Ocultar e reativar enquanto promise antiga aguarda cria instancia sem aquela trava. Definir se garantia e por montagem, como as limitacoes do plano indicam, ou por campo durante toda a sessao; no segundo caso, planejar controle acima das instancias. Testar sem prometer cancelamento da gravacao antiga. |
| Anchors do tutorial | Resolver V011-02: passos nao podem apontar a campos inativos removidos. Compartilhar IDs realmente visiveis e fallback tutorial-dados quando regiao falha, sem recriar controles ocultos. |
| Provider/decoder | Entregar contrato real da 007 antes de consumir sessoes; valores externos preservados e default legado tratados no dono do modelo. |
| API/falhas/timers | Confirmar duracoes propostas de 5 s/10 s e operacao indefinidamente pendente. Dependencia de teste que rejeita exige catch defensivo, como o plano reconhece; nao liberar lock por timeout fingindo cancelamento. |
| Feedback/foco | Confirmar retorno pending quando texto mudou e informar tentativa anterior se necessario. Testar disabled nativo e foco; aria-disabled pode exigir handler guardado, sem enfraquecer trava. |
| Conteudo/componentes | Completar formatadores puros e mapas versionados, avisos separados e props/slots da regiao, sem duplicar Preencher/Editar ou anuncios da 011. Caminhos do PLAN sao propostas; plano detalhado usa components/carta e content/transfer. Consolidar antes de imports. |
| ERS/Figma/editorial | Confrontar PDF e consultar detalhadamente o node `564:980`; validar o frame contra `steps[3]`, copy e correspondencias sem inventar nomes oficiais. |
| Ambientes | Clipboard real em origem segura, browsers desktop/mobile e leitores/seleção manual; registrar versoes/permissoes/destino de teste e limites. Usar dados sinteticos em ambiente controlado. |

A preservacao de dados condicionais ocultos ja esta definida. O ponto aberto
de remount trata concorrencia de gravacoes externas, sem autorizar limpeza
da Carta, exposicao de campos inativos ou reaproveitamento de confirmacoes.

## Verificacao e arquivos alterados

Nao existe mecanismo de clipboard em src; tutorial permanece placeholder,
conforme inventario. Nao foram instaladas dependencias ou executados
build/typecheck/testes como prova de comportamento futuro. Snippets dependem
de contratos ainda planejados e nao foram certificados como compilaveis.

Testes posteriores devem cobrir pureza/formatacao/aplicabilidade, promises
controladas, duplicidade/revisoes, ocultacao/remount, falhas/manual, sessao,
composicao/anchors e resultado real de copia, com evidencias reproduziveis.

Somente `specs/012-copia-dados-tutorial/validation.md` foi criado.
Os quatro artefatos e src permaneceram intocados, sem tarefas concluidas
automaticamente. Corrigir V012-01–V012-04, fechar decisoes e dependencias
aplicaveis e repetir a validacao antes da implementacao dependente.

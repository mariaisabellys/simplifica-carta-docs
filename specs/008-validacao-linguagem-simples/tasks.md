# Tasks: Validacao e linguagem simples

## Convencoes e status

- Base: spec.md e plan.md da 008; executar conforme dependencias indicadas.
- Todas as tarefas estao pendentes. Criar esta lista nao conclui validacao
  editorial, consulta Figma, implementacao ou testes.
- Codigo somente em `/spec:implementar`, depois de implementation-plan e
  validacao documental sem bloqueios relevantes.
- Avaliacao local e pura: nao enviar textos, persistir resultados, reescrever
  valores ou criar nota de clareza/aprovacao.
- Obrigatoriedade e sugestoes possuem resultados independentes. Sugestao
  nunca bloqueia; falha de obrigatorios nunca permite exportacao.
- Specs consumidoras agora existem; placeholders nao comprovam integracao.

## Fase 1 — Preparacao e contratos

- [ ] **T001 — Inventariar implementacao e consumidores reais**
  - Conferir schema, carta.validation.ts, src/lib/validation.ts, FormField e
    todos os callers dos helpers existentes.
  - Conferir provider, modelo, IDs, partes e pontos de exibicao entregues pela
    007, separando contratos planejados de codigo funcional.
  - Identificar consumidores 009/010/012 e contratos compartilhados de foco.
  - Evidencia: inventario de arquivos/callsites e lacunas no implementation-plan.

- [ ] **T002 — Fechar obrigatoriedade e contrato de resultados**
  - Conciliar ERS/007: nome, descricao, publico-alvo, prazo e custos numa unica
    fonte; nome popular/adicionais opcionais e nenhuma regra extra por analogia.
  - Configuracoes de agendamento so se aplicam com `exigeAgendamento === true`. Tipo de
    agendamento (Online, Presencial ou ambos) e Sistema de agendamento (Paraiba Digital
    ou Outro sistema ou site) sao obrigatorios nesse estado. Link do agendamento e Como
    o agendamento sera exibido? sao obrigatorios e visiveis somente para Outro sistema
    ou site. Dentro do Paraiba Digital mantem o cidadao na experiencia; Em uma nova
    pagina redireciona para a URL externa. Paraiba Digital identifica agendamento pelo
    proprio sistema, sem link ou forma de exibicao externa.
  - Validar conjunto de tipos, enums e URL absoluta somente quando ativos; decidir
    protocolos antes do codigo. Testar Nao, Paraiba Digital, externo dentro/fora, troca
    e recarga; remover erros/sugestoes de campos inativos.
  - Definir alvos fechados por campo ou itemId, severidade, ruleId, messageKey,
    parametros textuais, IDs estaveis e status complete/failed independentes.
  - Definir registro de ordem/rotulos/destinos e tratamento defensivo de unknown,
    sem paths arbitrarios ou execucao de getters recebidos como dados.
  - Dependencia: T001. Evidencia: contrato conciliado com 007/009/010/012;
    cobertura RF02/RF05–06, CA01–03/CA08–11/CA16.

- [ ] **T003 — Validar catalogo editorial inicial**
  - Consolidar required-text, long-text e formal-term com disparo, mensagem,
    campos aplicaveis e exemplos positivos/negativos.
  - Confirmar proposta de 240 pontos de codigo e mensagem sobre extensao total,
    sem afirmar deteccao de frases longas ou limite obrigatorio de campo.
  - Confirmar vocabulario devem/deverao/deverão/efetuar/realizar, normalizacao
    Unicode, caixa/acentos, palavra inteira e deduplicacao por alvo.
  - Validar copy/contexto com equipe; orientacoes gerais nao prometem deteccao
    de siglas, fatos ou toda ambiguidade. Registrar fontes efetivamente lidas.
  - Dependencia: T002. Evidencia: catalogo versionavel validado; homologacao
    ausente permanece pendente. Cobertura RF03–04, CA04–05/CA15/CA17.

- [ ] **T004 — Consultar Figma e fechar estados acessiveis**
  - Consultar via MCP Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`,
    nodes `811:306`, `811:382`, `651:317`; localizar erro, sugestao e resumo.
  - Consultar Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.
  - Registrar normal/visitado/erro/sugestao/pendente/falha, contraste, foco,
    associacoes, anuncios e reflow; resolver divergencias de escopo.
  - Dependencias: T002–T003. Evidencia: consultas e estados documentados;
    referencia insuficiente fica bloqueio visual. Cobertura CA13–14/CA18.

- [ ] **T005 — Criar plano detalhado de implementacao**
  - Executar `/spec:plano-implementacao 008-validacao-linguagem-simples`.
  - Consolidar T001–T004, arquivos, contratos, codigo base, UI e consumidores.
  - Fechar ciclo: intocado sem erro inicial, blur avalia campo, revisao avalia
    tudo, edicao invalida sugestao velha e recomputa com token/revisao.
  - Confirmar proposta de 300 ms, cancelamento e politica de anuncios; definir
    fixture/medicao de desempenho e resposta se analise bloquear digitacao.
  - Reutilizar infraestrutura de testes da 007 ou definir configuracao adequada
    para funcoes e timers, sem instalar dependencias nesta etapa.
  - Dependencias: T001–T004. Evidencia: implementation-plan.md completo.

- [ ] **T006 — Validar documentos antes do codigo**
  - Executar `/spec:validar 008-validacao-linguagem-simples` contra ERS, MVP,
    constitution, Figma e contratos de 007/009/010/012.
  - Conferir RF01–RF06, CA01–CA19, regras/bloqueios e catalogo; resolver pendencias
    relevantes antes da implementacao.
  - Dependencia: T005. Evidencia: resultado documental registrado.

## Fase 2 — Regras locais e resultados

- [ ] **T007 — Implementar tipos e registro compartilhado**
  - Criar carta.validation.types.ts e registro fechado conforme T002.
  - Referenciar unica fonte de obrigatorios no schema/modulo acordado; incluir
    IDs de alvo/regra sem texto do usuario ou indice de lista como identidade.
  - Dependencia: T006 e comando `/spec:implementar`.
  - Evidencia: contratos tipados usados pelos motores e consumidores reais.

- [ ] **T008 — Criar conteudo de validacao versionado**
  - Criar `src/content/validation/carta.ts` com mensagens, termos, limiares,
    exemplos e orientacoes gerais validados em T003.
  - Separar texto editorial de algoritmo e JSX; parametros renderizados como
    texto, sem HTML. Diferenciar ajuda durante edicao de contexto de exportacao.
  - Dependencias: T007/T003. Evidencia: catalogo unico, sem mensagens duplicadas
    ou promessa de regra institucional/clareza garantida; CA15/CA17.

- [ ] **T009 — Implementar obrigatoriedade defensiva**
  - Evoluir carta.validation.ts e helper generico de preenchimento para unknown:
    somente string com conteudo apos trim passa; `0` textual permanece valido.
  - Tratar campos/grupos ausentes, null e tipos incorretos sem excecao;
    nao modificar fonte ou inferir gratuidade/ausencia de exigencias.
  - Retornar erros por alvo ou status failed, sem converter falha em array vazio.
  - Dependencias: T007–T008. Evidencia: mesmos cinco campos gerais e condicionais ativos
    em todos os callers;
    CA01–03/CA11/CA16.

- [ ] **T010 — Implementar heuristicas editoriais puras**
  - Criar carta.language.ts: extensao em pontos de codigo do texto aparado apenas
    para analise e vocabulario fechado com limites Unicode de palavras.
  - Normalizar copia de analise; preservar original e termo exibido quando possivel.
  - Deduplicar termos pela forma normalizada e ordem de primeira ocorrencia;
    no maximo uma sugestao por regra/alvo, sem ocorrencias para texto vazio.
  - Analisar apenas campos descritivos acordados e descricoes de etapas/canais;
    nomes/documentos recebem orientacao editorial sem heuristica automatica.
  - Dependencias: T007–T008. Evidencia: catalogo aplicado sem mutacao, regex
    custosa, reescrita ou deteccao fora do escopo; CA04–05/CA12/CA15/CA17.

- [ ] **T011 — Consolidar helpers e separar falhas**
  - Substituir callers reais do helper antigo, retirando regras divergentes.
  - Manter adaptador temporario apenas se necessario e sem esconder failed.
  - Falha editorial preserva resultado obrigatorio; falha obrigatoria nao e
    analise concluida. Mensagens de indisponibilidade nao incluem texto em logs.
  - Dependencias: T009–T010. Evidencia: contratos unicos e falhas independentes;
    CA16, sem ampliar storage/backend/gerador CSV.

## Fase 3 — Formulario e consumidores

- [ ] **T012 — Integrar acionamento e atualizacao por alvo**
  - Integrar na 007 estado de campos visitados/revisados, sem segunda Carta.
  - Blur avalia campo; revisao avalia partes ocultas; edicao de campo ja avaliado
    atualiza required e invalida imediatamente sugestoes obsoletas.
  - Recomputar conforme timing de T005; descartar resultado atrasado por revisao
    e ID, cancelar timers ao remover item/desmontar e atualizar ordem do resumo.
  - Incluir aplicabilidade no snapshot/revisao: troca Sim/Nao/null ou externo/nativo
    invalida timers/resultados imediatamente, mesmo com valores preservados;
    callback so publica para alvo existente, ativo e revisao atual.
  - Dependencias: T011 e formulario/provider/IDs reais da 007.
  - Evidencia: CA07–08/CA13 sem erro inicial prematuro ou resultado de item removido.

- [ ] **T013 — Apresentar mensagens por campo e item**
  - Criar/reutilizar FieldValidationMessages e FormField conforme contrato da 007.
  - Associar ajuda/erro/sugestao com IDs e aria-describedby; aria-invalid apenas
    para erro. Rotulos textuais distinguem pendencia de sugestao.
  - Termos interpolados sao texto; sugestao nao muda valor, foco ou permite
    correcao automatica. Ausencia de ocorrencias nao anuncia aprovacao.
  - Dependencias: T008/T012 e associacoes reais da 007.
  - Evidencia: CA06–08/CA12–14/CA17, sem dependencia apenas de cor/icone.

- [ ] **T014 — Integrar resumo e localizacao de pendencias**
  - Criar/reutilizar ValidationSummary, ordenado por formulario e ordem atual
    das listas, sem duplicar mesma regra/alvo.
  - Revisao explicita usa politica unica de foco/anuncio; links abrem parte
    e focam controle correto via contrato da 007, sem dados da Carta em URL.
  - Digitacao nao move foco nem anuncia cada tecla; falhas permitem nova revisao.
  - Dependencias: T012–T013 e contrato de retorno da 007.
  - Evidencia: CA01/CA07–08/CA13/CA16 em campos visiveis e ocultos.

- [ ] **T015 — Integrar limites de bloqueio nos callers existentes**
  - Disponibilizar resultado required para 009/010: previa parcial livre;
    exportacao exige complete sem errors sobre snapshot que sera serializado.
  - Nenhuma sugestao/falha editorial bloqueia previa, CSV, navegacao ou copia.
  - 012 copia campo informado de Carta parcial sem gate global; mensagens nao
    entram nos valores transferidos. Nao implementar consumidores completos.
  - Dependencias: T011/T014 e consumidores reais para aceite integrado.
  - Evidencia: CA06/CA09–10/CA16 por consumidor; placeholder fica pendente.

- [ ] **T016 — Aplicar estilos e verificar custo de processamento**
  - Usar estados/tokens confirmados em T004, Inter, texto ampliavel e foco visivel.
  - Medir fixtures de textos/listas longos definidos em T005; registrar ambiente
    e tempo, conferindo que digitacao permanece utilizavel.
  - Se necessario, ajustar agendamento ou processamento local com contrato
    revisado, sem truncar dados ou anunciar analise integral de trecho parcial.
  - Dependencias: T010/T012–T014. Evidencia: CA14 e desempenho medido com limites
    explicitados, sem limite editorial arbitrario.

## Fase 4 — Testes e aceite

- [ ] **T017 — Testar obrigatoriedade e falhas independentes**
  - Cobrir cinco campos, espacos/tabulacoes/quebras, grupos ausentes, null,
    tipos incorretos, custo `0` e opcionais vazios.
  - Cobrir null/Nao sem condicionais; Sim sem tipos/sistema; Online, Presencial
    e ambos; modalidades invalidas/repetidas e enums invalidos. Externo exige
    URL absoluta/exibicao validas conforme politica fechada em T002; nativo
    ignora campos externos retidos. Incluir troca/restauracao e recarga da 007.
  - Simular failed nos dois motores: editorial nao elimina required, required
    nao libera CSV; verificar ausencia de falso sucesso.
  - Dependencias: T009/T011 e infraestrutura de T005.
  - Evidencia: testes de comportamento CA01–03/CA11/CA16/CA19.

- [ ] **T018 — Testar catalogo, Unicode e pureza**
  - Cobrir 240/241 pontos de codigo, caracteres fora do BMP, acentos compostos/
    decompostos, caixa, pontuacao e termo repetido.
  - Negativos: realizacao, irrealizar e devemos; nome/documento/placeholder
    nao recebem analise automatica. Texto longo com frases curtas nao gera
    afirmacao indevida sobre tamanho de frase.
  - Avaliar fixture congelada com HTML textual/quebras e conferir fonte/ordem
    intactas, deduplicacao e resultado sem selo de aprovacao.
  - Dependencias: T010 e infraestrutura de T005.
  - Evidencia: CA04–05/CA12/CA15/CA17 sem testes que apenas espelhem o catalogo.

- [ ] **T019 — Testar integracao, timers e identidade**
  - Abrir vazio, blur, revisar todas as partes, corrigir campo oculto e atualizar
    mensagens sem exigir aceitar sugestao ou perder dados.
  - Reordenar/remover etapa/canal com resultado; editar antes do timer, desmontar
    e assegurar que resposta antiga nao reaparece ou troca de item.
  - Com timer de orientacao pendente, mudar Sim para Nao mantendo texto; com
    erros externos, mudar para Paraiba Digital mantendo URL/exibicao. Remover
    mensagens imediatamente, descartar callback e nao herdar resultado antigo
    ao reativar. Parte apenas fechada continua incluida na revisao explicita.
  - Conferir aria-invalid, foco, resumo e ausencia de anuncios a cada tecla.
  - Dependencias: T012–T014/T017–T018.
  - Evidencia: CA01/CA06–08/CA13, com testes de timers e UI reais.

- [ ] **T020 — Verificar consumidores, acessibilidade e responsividade**
  - Conferir CSV com required ausente/falha versus sugestoes; previa/copia parcial
    continuam livres e preservam texto. Registrar CA09–10 pendentes se ausentes.
  - Comparar required do formulario e do snapshot CSV nos cenarios CA19,
    incluindo valores externos retidos/inativos e reativacao sem perda.
  - Executar teclado/leitor de tela e matriz viavel da 016; larguras
    1440/1024/768/390/320 px, texto ampliado/reflow e mensagens longas.
  - Registrar ambientes/versoes, contraste, estados de falha, defeitos e retestes;
    ambiente nao executado permanece pendente.
  - Dependencias: T015–T016/T019 e consumidores entregues para aceite integrado.
  - Evidencia: CA06/CA09–10/CA13–14/CA16/CA18.

- [ ] **T021 — Executar checks e consolidar evidencias**
  - Executar `npm run typecheck`, `npm run build` e suite configurada; verificar
    consumidores de helpers/FormField alterados e corrigir regressao relevante.
  - Registrar resultado por CA01–CA19, catalogo validado, consultas visuais,
    desempenho e pendencias em documento de verificacao definido em T005.
  - Conferir localidade, ausencia de logs/envio/persistencia de textos/resultados,
    regras duplicadas, reescrita e bloqueios indevidos.
  - Dependencias: T017–T020; pendencias integradas impedem aceite integral.
  - Evidencia: checks, defeitos, retestes e cobertura vinculados a tarefas.

## Rastreabilidade

| Requisito/criterios | Tarefas principais |
| --- | --- |
| Agendamento condicional, CA19 | T002, T009, T012, T014, T017, T019–T020 |
| RF01, CA01/CA07/CA13 | T005, T012–T014, T019 |
| RF02, CA01–03/CA11 | T002, T007, T009, T017 |
| RF03, CA04–06/CA12 | T003, T008, T010, T013, T018 |
| RF04, CA04–05/CA15/CA17 | T003, T008, T010, T018, T021 |
| RF05, CA07–08/CA16 | T007, T011–T014, T017, T019 |
| RF06, CA06/CA09–10 | T002, T015, T020 |
| Acessibilidade/reflow, CA13–14 | T004, T013–T014, T016, T020 |
| Visual, CA18 | T004–T006, T016, T020–T021 |

## Proximo passo

Executar `/spec:plano-implementacao 008-validacao-linguagem-simples`, consolidando
catalogo, contratos da 007 e estados visuais. Depois executar `/spec:validar`
antes de `/spec:implementar`. Esta etapa criou somente tarefas.

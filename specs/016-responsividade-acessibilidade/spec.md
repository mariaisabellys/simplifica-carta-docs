# Spec: Responsividade e acessibilidade

> **Contrato transversal:** título, skip link, foco, rolagem, fragmentos e
> histórico seguem `docs/arquitetura/contrato-navegacao.md`.

## Objetivo

Consolidar e verificar responsividade e acessibilidade em todas as paginas e
fluxos do Simplifica Carta, permitindo consulta, preenchimento, revisao,
exportacao, copia e solicitacao de ajuda em diferentes dispositivos e com
tecnologias assistivas.

## Problema e contexto

Layout que funciona somente no desktop, foco perdido ao navegar ou mensagens
nao associadas a campos podem impedir o uso do produto. Componentes
compartilhados precisam de contratos consistentes e os fluxos completos
precisam ser verificados nos estados normais e de falha.

A 016 e transversal e nao cria rota propria. Cada feature continua responsavel
por entregar acessibilidade desde sua implementacao; esta etapa consolida
criterios, verifica integracao e corrige barreiras compartilhadas e locais.
Nao substitui regras de negocio ou amplia os limites do MVP.

O comando recebido usa `016-responsabilidade-acessibilidade`. Foi adotado o
identificador do roadmap, `016-responsividade-acessibilidade`, preservando as
referencias existentes nas outras specs.

## Usuarios impactados

- Servidores que usam computador, tablet ou smartphone, inclusive com texto
  ampliado ou em orientacao diferente da referencia desktop.
- Pessoas que navegam por teclado, leitor de tela, toque ou outros mecanismos
  de entrada e precisam identificar controles, estados e destinos.
- Equipe responsavel pela manutencao, que precisa de criterios verificaveis
  e evidencias de regressao.

## Fontes de contexto

- `README.md`, `Readme Manual de Levantamento de Serviços.md` e documentos
  de produto: dispositivos, navegacao clara, linguagem simples e compatibilidade.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: requisitos
  desde o inicio, tokens, fontes e consulta visual antes de implementar.
- `docs/design-system/tokens-e-componentes.md` e `mapa-figma-telas.md`:
  referencia visual e tipografia Inter.
- Specs e documentos de verificacao de 002–004: teclado, foco, contraste,
  movimento reduzido, larguras de referencia e zoom.
- Specs 006–015: campos, listas, mensagens, copia, download, ajuda e atendimento.
- `src/styles/globals.css`, `tokens.css`, `src/app/App.tsx`, AppShell e
  FormField: estrutura atual de layout, navegacao e formularios.
- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/), consultada nesta etapa:
  referencia tecnica para organizar verificacao de acessibilidade.

O repositorio menciona WCAG 2.1 AA em planos anteriores. Esta spec propoe WCAG
2.2 nivel AA como meta tecnica transversal a conciliar no planejamento; nao
declara auditoria completa ou conformidade alcancada. A referencia cobre
paginas e processos completos, nao apenas componentes isolados.

Nao houve leitura do PDF do ERS, consulta direta ao Figma ou teste de interface
nesta etapa. A leitura do codigo identifica pontos a verificar, sem comprovar
barreiras ou resultados por teste executado.

## Requisitos funcionais

### RF01 — Cobertura transversal

- Inventariar todas as rotas do MVP e componentes compartilhados antes das
  verificacoes, incluindo paginas ainda em desenvolvimento e seus estados.
- Cobrir consulta editorial, diagnostico e resultado, formulario, validacao,
  previa, CSV, tutorial/copia, FAQ, agendamento e suporte por e-mail.
- Verificar agendamento da Carta (007): checkboxes Online/Presencial ou ambos, grupos de
  sistema/exibicao, URL e obrigatoriedade condicionais; controles ocultos fora da ordem
  de foco e mensagens inativas removidas, com valores preservados na sessao.
- Registrar feature responsavel, estado implementado, verificacao executada,
  resultado, evidencia e pendencia por fluxo.
- Nao declarar placeholder aprovado como fluxo funcional nem adiar barreiras
  conhecidas de uma feature pronta para uma auditoria futura.
- Corrigir comportamento compartilhado no componente responsavel, evitando
  variantes de header, breadcrumb, foco ou mensagens por pagina sem necessidade.

### RF02 — Layout e reflow

- Manter conteudo e acoes utilizaveis a partir de 320 px de largura CSS, sem
  rolagem horizontal da pagina, corte ou sobreposicao nos fluxos do MVP.
- Verificar 1440, 1024, 768, 390 e 320 px e larguras intermediarias, sem tratar
  esses pontos como os unicos tamanhos suportados.
- Verificar ampliacao de texto a 200% e reflow equivalente a viewport de
  320 px, incluindo zoom de 400% em janela de referencia de 1280 px quando
  aplicavel. Nao confundir zoom do navegador com tamanho de viewport.
- Adaptar grades, formularios, acoes e imagens ao espaco disponivel. Preservar
  ordem significativa no DOM e no visual, com altura determinada pelo conteudo.
- Manter textos longos, nomes, URLs, e-mails e mensagens integralmente
  acessiveis, com quebra adequada; nao truncar dados da Carta para caber.
- Nao bloquear orientacao retrato/paisagem ou tipo de entrada sem necessidade
  funcional documentada. Mudanca de tamanho nao pode apagar preenchimento.
- Evitar barras fixas, header sticky ou overlays que encubram conteudo, campo
  em edicao, mensagens ou acao necessaria, inclusive com teclado virtual.
- Testar preferencias de espacamento de texto e fonte de fallback sem perda
  de conteudo; fonte externa indisponivel nao impede uso.

### RF03 — Semantica e leitura

- Identificar idioma principal como portugues do Brasil e usar titulo de
  documento que identifique a pagina atual.
- Garantir um titulo principal por pagina, hierarquia de secoes coerente,
  landmarks e listas/agrupamentos adequados a informacao apresentada.
- Disponibilizar mecanismo de pular navegacao repetida e chegar ao conteudo.
- Manter nomes acessiveis coerentes com rotulos visiveis e distinguir controles
  repetidos por campo ou item quando necessario.
- Usar links para destinos e botoes para acoes. Preferir controles nativos;
  controles personalizados precisam expor nome, papel, valor e estado.
- Usar alternativas textuais adequadas em imagens informativas; elementos
  decorativos nao devem criar ruido de leitura. Capturas do tutorial precisam
  de instrucao textual suficiente para entender o passo sem a imagem.
- Nao comunicar significado apenas por cor, icone, posicao ou forma visual.

### RF04 — Teclado e foco

- Permitir todas as operacoes do MVP por teclado, com ordem de foco coerente
  com a leitura, sem armadilhas ou dependencia exclusiva de mouse/arraste.
- Manter foco visivel e nao encoberto por elementos da interface. Nao remover
  outline sem substituto perceptivel em todos os fundos utilizados.
- Definir restauracao de foco em navegacao interna, voltar/avancar e ancoras,
  de forma consistente no shell, com anuncio compreensivel da pagina/destino.
- Nao deixar foco em elemento desmontado apos troca de pagina, remocao de item
  ou fechamento de painel.
- Em menu recolhido, FAQ ou painel expansivo, anunciar estado, disponibilizar
  acionamento por teclado e manter elementos ocultos fora da navegacao ativa.
- Se houver dialogo modal, definir entrada, contencao apropriada, fechamento
  e retorno de foco; nao criar modal apenas para cumprir esta spec.
- Reordenacao de etapas deve ter alternativa de controles acessiveis. Mudanca
  de foco, digitacao ou selecao nao dispara envio, download ou navegacao inesperada.
- Preservar cliques com modificadores, abertura em nova aba e comportamento
  normal dos links internos conforme contrato de navegacao compartilhado.

### RF05 — Contraste, estados e entrada por toque

- Medir combinacoes reais de texto, fundo, controles e indicadores em estados
  normal, hover, foco, selecionado, erro e processamento. Nao inferir contraste
  apenas pela existencia de tokens.
- Aplicar os criterios de contraste da meta AA: 4,5:1 para texto comum,
  3:1 para texto grande nos termos da referencia e 3:1 para informacao visual
  de controles/estados onde o criterio nao textual se aplica. Registrar excecoes
  legitimas por criterio, sem dispensar texto essencial por conveniencia.
- Manter alvos de toque com espaco suficiente para acionamento. Adotar 44 px
  como preferencia de projeto para acoes principais; verificar o criterio AA
  de tamanho minimo/espacamento e suas excecoes na matriz de conformidade.
- Nao depender de hover para revelar conteudo essencial. Conteudo adicional
  em hover/foco, quando existir, precisa permitir leitura e dispensar exibicao
  sem perda de acesso a instrucao.
- Respeitar movimento reduzido e evitar animacoes que prejudiquem leitura ou
  uso. Nao introduzir piscadas, movimento automatico ou efeitos obrigatorios.

### RF06 — Formularios e listas editaveis

- Associar label, orientacao e mensagens ao controle. Placeholder nao substitui
  label, e obrigatoriedade deve ser identificavel alem de asterisco/cor.
- Agrupar escolhas relacionadas, como documentos obrigatorios/opcionais e
  agendamento, com contexto anunciado.
- Identificar erros por campo e oferecer resumo apos revisao/envio explicito,
  com acesso a campo em outra parte quando necessario.
- Distinguir sugestao editorial de erro: sugestao nao torna campo invalido
  nem bloqueia acao permitida pelas specs de negocio.
- Preservar dados ao corrigir, mudar de parte ou trocar horario; nao exigir
  redigitacao de informacao ja fornecida no mesmo processo sem justificativa.
- Manter identidade e foco dos itens de lista apos adicao, remocao e reordenacao.
- Identificar finalidade de campos pessoais no atendimento com atributos
  apropriados quando aplicaveis. Nao coletar dados extras para acessibilidade.
- Escolha de data/horario deve funcionar por teclado e leitor de tela, com
  disponibilidade e selecao compreensiveis sem depender de um calendario visual.

### RF07 — Estados e mensagens dinamicas

- Identificar carregamento, vazio, erro, sucesso e resultado incerto por texto
  e semantica adequados, sem depender apenas de spinner ou cor.
- Anunciar mensagens relevantes sem leitura repetida a cada tecla nem mover
  foco inesperadamente em atualizacao de sugestoes ou copia.
- Manter erros e alternativas de recuperacao acessiveis; botao desabilitado
  isolado nao explica ausencia de dados, pendencia ou indisponibilidade.
- Cobrir falha de armazenamento, copia recusada, download indisponivel,
  consulta de agenda sem horarios/falha, conflito, envio incerto e notificacao
  pendente, respeitando os contratos de 007–015.
- Nao tratar anuncio de sucesso como prova de envio externo, arquivo salvo,
  publicacao ou atendimento confirmado quando o sistema nao confirma isso.
- Estados transitorios devem permanecer tempo suficiente para compreensao;
  informacao essencial precisa continuar consultavel apos o anuncio.

### RF08 — Verificacao e evidencias

- Criar no planejamento matriz de criterios aplicaveis da meta WCAG, por
  pagina/processo, com metodo, resultado e justificativa para nao aplicabilidade.
  A lista desta spec nao substitui revisao de todos os criterios A/AA aplicaveis.
- Combinar verificacoes automatizadas com testes manuais de teclado, leitor
  de tela, toque, contraste, zoom, espacamento e estados de falha. Ausencia de
  alertas automaticos nao comprova conformidade.
- Definir combinacoes de navegador, sistema e tecnologia assistiva e registrar
  versoes utilizadas. Cobrir navegadores do MVP e pelo menos uma combinacao
  desktop e uma movel com leitor de tela; definir a matriz viavel no plano.
- Validar fluxos completos, nao somente screenshots ou pagina inicial.
- Executar testes de agendamento com dados sinteticos e ambiente controlado,
  sem criar solicitacoes reais ou enviar mensagens ao canal institucional.
- Registrar defeitos com reproducao, impacto, evidencia e responsavel; corrigir
  e reverificar antes de declarar o criterio atendido.
- Verificacoes de pagina ainda nao implementada permanecem pendentes. Nao
  declarar todo o produto conforme com lacunas de processos ou criterios.

## Requisitos nao funcionais

- Manter arquitetura React/TypeScript e componentes existentes; esta spec nao
  exige trocar roteador, biblioteca de estilos ou introduzir framework visual.
- Reutilizar tokens e Inter, ajustando valores quando contraste exigir e
  documentando divergencias com referencias visuais.
- Nao modificar dados da Carta ou regras de negocio para resolver layout.
- Testes e relatorios nao devem conter dados pessoais reais, segredos ou
  valores de sessao de usuarios.
- Mudancas compartilhadas precisam verificar regressao dos fluxos afetados,
  com typecheck/build e testes adequados quando houver implementacao.
- Nao adicionar widget de acessibilidade, modo separado ou plugin como
  substituto de semantica, teclado, contraste e reflow da interface principal.

## Referencias visuais e pendencias

Esta feature usa os frames de cada pagina, sem frame proprio presumido.
Antes de implementar ajustes visuais, consultar os nodes pertinentes via MCP
no Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e o Figma Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Identificar referencias pendentes para
telas ainda sem frame e registrar responsividade, estados e divergencias no
`implementation-plan.md`.

O layout desktop do prototipo nao define sozinho reflow, teclado ou leitura
assistiva. Quando a referencia visual criar barreira, documentar a adaptacao
necessaria mantendo cobertura e hierarquia de informacao.

Pontos a verificar no codigo atual: header sticky, largura minima do body,
contraste do foco e botoes, ausencia de restauracao explicita de foco no App,
link de pular navegacao e associacao da ajuda no FormField. Esses pontos nao
foram testados nem corrigidos nesta etapa.

O planejamento deve conciliar ERS, meta WCAG proposta, matriz de tecnologias,
escopo implementado, estados de negocio e evidencias de aceite. Nao declarar
certificacao formal ou cumprimento juridico apenas por adotar uma referencia.

## Fora de escopo

- Criar funcionalidades de produto, novos fluxos, login ou backend de negocio.
- Alterar obrigatoriedade, tratamento de sessao ou regras de notificacao sem
  conciliacao com as specs responsaveis.
- Garantir acessibilidade de aplicativos externos de e-mail, planilhas ou
  Paraiba Digital; manter os links e alternativas do app acessiveis.
- Traducao completa, area de preferencias persistentes ou widget corretivo.
- Certificacao juridica ou declaracao de conformidade sem auditoria/evidencias.

## Dependencias

- `001-fundacao-do-projeto` e `002-home-e-navegacao`: tokens, shell e foco.
- Features 003–015: paginas, componentes e estados de cada fluxo.
- `017-deploy`: ambiente publicado e verificacao final de rotas/assets.
- Referencias visuais, inventario de criterios e matriz de testes definidos.

Na criacao desta spec, 005 e 017 ainda nao possuem pastas em `specs/`.
Diversas paginas sao placeholders e nao permitem concluir verificacao de seus
fluxos. A 016 pode planejar e corrigir contratos compartilhados sem absorver
a implementacao das funcionalidades ausentes.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Revisar inventario de rotas e estados. | Encontrar cobertura, responsavel e evidencia ou pendencia explicita por fluxo. |
| CA02 | Usar larguras de referencia e intermediarias, retrato/paisagem. | Manter conteudo, acoes e ordem sem corte, sobreposicao ou scroll horizontal da pagina. |
| CA03 | Ampliar texto, aplicar zoom/reflow e espacamento. | Manter leitura e operacao sem perda de valores, controles ou mensagens. |
| CA04 | Navegar integralmente por teclado. | Acessar todas as operacoes sem armadilha, mouse exclusivo ou foco invisivel. |
| CA05 | Mudar rota, usar historico/ancoras, remover item e fechar painel. | Manter destino de foco coerente, sem elemento desmontado ou encoberto. |
| CA06 | Ler paginas com tecnologia assistiva. | Identificar idioma, titulo, landmarks, secoes, listas, campos, imagens e destinos. |
| CA07 | Medir contraste e usar toque. | Atender criterios aplicaveis e convencoes documentadas nos estados reais. |
| CA08 | Revisar campos e corrigir erros em outra parte. | Encontrar associacoes, resumo e acesso ao campo, sem perda de dados ou sugestao tratada como erro. |
| CA09 | Adicionar, remover e reordenar listas e escolher horario. | Operar por teclado/leitor de tela com identidade, estado e foco coerentes. |
| CA10 | Simular estados de carregamento, vazio, falha e resultado incerto. | Identificar retorno verdadeiro e alternativa de recuperacao sem bloqueio indevido. |
| CA11 | Acionar copia, exportacao e suporte. | Perceber retorno acessivel sem anuncios falsos de envio, salvamento ou publicacao externos. |
| CA12 | Reduzir movimento, falhar fonte ou imagem e usar teclado virtual. | Manter informacao e acoes acessiveis, sem conteudo essencial dependente de efeito/asset. |
| CA13 | Executar matriz de navegadores e leitores de tela. | Registrar versoes, resultados e defeitos, com verificacoes automatizadas e manuais complementares. |
| CA14 | Revisar prontidao transversal. | Encontrar criterios A/AA aplicaveis avaliados, defeitos corrigidos/retestados e pendencias sem falsa declaracao de conformidade. |
| CA15 | Revisar ajustes visuais e dados usados nas evidencias. | Encontrar consultas Figma, adaptacoes documentadas e dados sinteticos, sem alteracao indevida de negocio ou exposicao pessoal. |

## Proximo passo

Executar `/spec:planejar 016-responsividade-acessibilidade` para definir
inventario, matriz de criterios, combinacoes de teste e correcoes previstas.
Depois, criar tarefas e `implementation-plan.md`, resolver pendencias e
executar `/spec:validar` antes de `/spec:implementar`.

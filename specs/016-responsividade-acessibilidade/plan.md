# Plan: Responsividade e acessibilidade

## Objetivo e identificador

Consolidar contratos compartilhados e verificar paginas e processos completos
do MVP em diferentes tamanhos, entradas e tecnologias assistivas. A 016 nao
cria rota, modo separado de acessibilidade ou regras de negocio novas.

O comando usa `016-responsabilidade-acessibilidade`; este plano segue a spec
e o roadmap em `016-responsividade-acessibilidade`, sem criar pasta duplicada.
Prepara `/spec:tarefas`; nenhum codigo, estilo ou teste de interface foi
executado nesta etapa. Features continuam responsaveis por acessibilidade
desde sua implementacao, sem esperar uma auditoria transversal.

## Fontes e estado atual

- Spec 016, constitution, regras para IA e mapa Figma.
- Contratos dos planos 006–015 e navegacao prevista na 002.
- App, AppShell, routes, FormField, globals.css, tokens.css e index.html.
- WCAG 2.2 e metodologia de avaliacao W3C, referenciadas ao final.

O HTML ja define `pt-BR` e viewport sem impedir zoom. Shell tem header, nav,
main e footer; navegacao identifica rota atual. Existem tokens e outline
global, mas isso nao comprova contraste ou operacao assistiva.

Pontos concretos para verificacao/correcao futura:

- App muda rota e scroll sem contrato explicito de titulo/foco; titulo HTML
  atual e generico. AppShell nao possui link de pular navegacao.
- handleNav intercepta todos os cliques, inclusive modificadores; ButtonLink
  usa anchor simples e pode recarregar. Conciliar ambos com contrato da 002.
- FormField associa label por id, mas hint nao tem id/aria-describedby e nao
  ha contrato de erro. Atributos do controle dependem do consumidor.
- Header sticky cresce em telas menores. Body tem min-width de 320 px;
  grades usam minimo de 220 px, a conferir dentro de cards e espacamentos.
- Outline usa laranja com transparencia e acao primaria usa branco sobre teal:
  medir combinacoes reais antes de definir ajustes, sem presumir aprovacao.
- Diversos fluxos ainda sao placeholders; ausencia de controles nao aprova
  formulario, exportacao, copia ou agendamento.
- Verificar agendamento da Carta (007): checkboxes Online/Presencial ou ambos, grupos de
  sistema/exibicao, URL e obrigatoriedade condicionais; controles ocultos fora da ordem
  de foco e mensagens inativas removidas, com valores preservados na sessao.

Nao houve consulta direta ao Figma, leitura do PDF do ERS ou teste assistivo.
005 e 017 sao dependencias documentais a conferir na proxima etapa.

## Meta tecnica e limites

Adotar WCAG 2.2 A/AA como meta proposta da 016, conciliando mencoes a 2.1 AA
nos documentos anteriores e o ERS antes da validacao. Registrar a decisao
documental sem declarar conformidade, certificacao ou cumprimento juridico.
Convencoes adicionais de projeto podem superar AA sem mudar sua definicao.

Uma verificacao automatizada sem alertas nao aprova pagina ou processo.
Evidencias devem identificar versao do produto, escopo, ambiente, estados
testados e lacunas. Aplicativos externos permanecem fora do escopo; os links
e alternativas que o Simplifica Carta oferece precisam ser utilizaveis.

## Inventario de cobertura

| Rotas/processo | Responsavel | Estados e operacoes a verificar |
| --- | --- | --- |
| `/` | 002 | Navegacao, CTAs, header/footer e acesso ao conteudo. |
| `/explorar-por-etapas` | 003 | Consulta independente, cards e destinos; conferir rota ainda ausente da tabela atual. |
| `/o-que-e-carta-de-servicos` | 004 | Leitura, secoes, listas e links. |
| `/diagnostico` e `/diagnostico/resultado` | 005 | Escolhas, retorno, resultado e continuidade; documentacao propria pendente. |
| `/organizar-informacoes` | 006 | Consulta, checklist, ancoras e textos extensos. |
| `/formulario-carta` | 007/008 | Partes, listas, obrigatoriedade, erros, sugestoes e storage indisponivel. |
| `/previa` e exportacao | 009/010 | Carta vazia/parcial, dados longos, revisao, download e falha. |
| `/tutorial-paraiba-digital` | 011/012 | Passos, imagens indisponiveis, copia por campo, recusa e retorno. |
| `/ajuda` | 013 | FAQ expandida/recolhida, hash, canais e pausa editorial. |
| `/ajuda/atendimento-agendado` | 014 | Agenda, vazio/falha, escolha, revisao, conflito, envio incerto e registro. |
| `/ajuda/suporte-email` | 015 | Contato, mailto, alternativa manual, copia e falha. |

Conferir inventario contra rotas e features efetivamente entregues. A 016
registra ausencia, mas nao implementa a funcionalidade da feature responsavel.
Estado inicial de cada item: pendente de verificacao executada. Agrupar shell
para testar reuso, mantendo verificacao em cada pagina e contexto relevante.

## Estrutura de evidencias e matriz de criterios

Criar na implementacao `accessibility-matrix.md` e `verification.md` nesta
pasta; evidencias sinteticas em subpasta propria. Nao gerar resultados agora.
Cada registro deve conter criterio/CA, rota/processo, estado, responsavel,
metodo, ambiente/versoes, commit, data, resultado, evidencia e defeito vinculado.
Resultados: pendente, atendido no escopo verificado, falhou ou nao aplicavel
com justificativa. Falta de ambiente fica pendente, nunca nao aplicavel.

Matriz inicial de cobertura tecnica, a expandir por pagina/estado:

| Grupo | Criterios WCAG 2.2 A/AA a inventariar | Metodo principal |
| --- | --- | --- |
| Conteudo e estrutura | 1.1.1; 1.3.1–1.3.5; 3.1.1–3.1.2 | DOM, leitura assistiva, imagens e ordem. |
| Apresentacao | 1.4.1–1.4.5; 1.4.10–1.4.13 | Contraste, zoom, texto, hover/foco e assets. |
| Teclado e tempo | 2.1.1–2.1.2; 2.1.4; 2.2.1–2.2.2; 2.3.1 | Operacao completa, timers e movimento. |
| Navegacao | 2.4.1–2.4.7; 2.4.11 | Links, titulos, foco, ancoras e caminhos. |
| Entrada | 2.5.1–2.5.4; 2.5.7–2.5.8 | Toque, nomes, cancelamento e alternativas. |
| Previsibilidade | 3.2.1–3.2.4; 3.2.6 | Mudancas de contexto e ajuda consistente. |
| Formularios | 3.3.1–3.3.4; 3.3.7–3.3.8 | Erros, revisao, continuidade e autenticacao quando houver. |
| Estados | 4.1.2–4.1.3 | Nome/papel/valor e anuncios. |
| Midia temporal | 1.2.1–1.2.5 | Inventariar presenca antes de justificar nao aplicabilidade. |

Intervalos acima incluem apenas niveis A/AA identificados na referencia.
Manter uma linha por criterio aplicavel no documento detalhado, evitando
aprovar um grupo inteiro por uma observacao. 4.1.1 foi removido na WCAG 2.2;
se avaliacao 2.1 continuar exigida, tratar seu checklist separadamente.
Sem login do solicitante, autenticacao publica pode nao se aplicar; nao
generalizar essa conclusao para eventual interface operacional incluida no escopo.

## Contratos e correcoes previstas

### 1. Shell, links, titulo e foco

Consolidar uma unica politica em App/AppShell conforme 002: titulo de documento
por rota, main com id estavel e link de pular navegacao visivel ao foco.
Navegacao interna comum preserva estado; links com modificadores, nova aba,
download, destino externo ou mailto conservam comportamento nativo.

Apos render de nova rota, focar titulo ou main programaticamente com tabindex
-1; nao deslocar foco a cada re-render. Para hash, focar destino real depois
de montar e aplicar compensacao do header. Voltar/avancar deve usar politica
documentada de foco/scroll, com fallback para titulo quando alvo nao existe.
Evitar handlers de foco concorrentes por pagina e anuncios duplicados.

Mudancas internas de etapa, abertura/fechamento e remocao de item pertencem ao
componente responsavel. Restaurar foco em controle sobrevivente ou inicio da
secao, nunca no elemento desmontado. Nao adicionar tabIndex positivo.

### 2. Layout e tokens

Usar grades fluidas, min-width:0 em filhos e quebra de textos longos onde
necessario. Revisar minimos de colunas e body; nao esconder overflow global
para mascarar corte. Dados completos da Carta continuam acessiveis.
Alturas acompanham conteudo; acoes quebram para coluna antes de comprimir texto.

Testar header sticky com zoom e teclado virtual. Quando encobrir conteudo,
adaptar comportamento/altura no contexto afetado, em vez de impor offset fixo
para todos os dispositivos. Campos focados e erros precisam permanecer visiveis.
Nao alterar ordem CSS em desacordo com DOM ou resetar formulario em breakpoint.

Medir contraste de tokens e combinacoes renderizadas, incluindo alpha e fundos
reais. Registrar valores e estados; ajustar token semantico quando problema
for compartilhado, com regressao nos consumidores. Conferir referencia visual
e documentar adaptacao necessaria. Preferir alvos de 44 px nas acoes principais;
avaliar minimo AA de 24 px e excecoes/espacamento por controle.

Testar fonte Inter indisponivel, espacamento de texto e movimento reduzido.
Nao usar screenshot como unico acesso a instrucao, truncar endereco ou impedir
zoom. Nao criar widget ou modo alternativo como correcao.

### 3. Formularios, listas e erros

Evoluir FormField em conjunto com 007/008/014: IDs estaveis de label, ajuda
e erro, contrato explicito de aria-describedby e atributos no controle.
Nao clonar children arbitrarios esperando inferir IDs. Obrigatoriedade deve
estar no texto/semantica e no atributo aplicavel do input, nao apenas badge.
Usar fieldset/legend para grupos relacionados e autocomplete apropriado no
atendimento, sem coletar valores adicionais.

Resumo de erros apos acao explicita recebe foco; seus links abrem parte
necessaria e levam ao controle. aria-invalid representa erro de contrato,
nao sugestao editorial. Digitacao nao move foco nem anuncia resumo a cada tecla.

Itens editaveis usam IDs estaveis. Adicionar, remover e mover tem nomes
contextuais, alternativa a arraste e politica de foco documentada. Calendario
customizado nao e requisito: escolha de horario precisa de controle operavel,
selecao anunciada e fuso claro conforme 014. Preservar campos em todos os retornos.

### 4. FAQ, paineis e mensagens

Preferir semantica nativa conforme planos das features. Paineis controlados
exigem estado exposto e conteudo oculto fora do foco. Se houver modal existente,
conferir entrada, retorno, fechamento e contencao; nao criar modal novo.

Mensagens de copia/consulta usam regiao de status estavel e retorno local,
sem mover foco. Reservar anuncio urgente para erro que exige atencao imediata;
evitar role=alert e foco simultaneos que repetem mensagem. Processamento tem
texto e estado, nao apenas spinner; alternativas explicam acoes indisponiveis.

Preservar semantica verdadeira de 010/012/014/015: iniciar download nao prova
arquivo salvo; copia nao envia mensagem; timeout pode ter resultado incerto;
registro nao comprova e-mail entregue ou atendimento confirmado. A 016 verifica
essas mensagens sem mudar regras de negocio ou inventar estados.

## Matriz de ambientes e testes

| Ambiente proposto | Cobertura |
| --- | --- |
| Windows + Chrome/Edge + NVDA | Teclado, leitura desktop, formulario/listas e processos completos. |
| Windows + Firefox | Regressao funcional, reflow e leitura com NVDA nos componentes criticos. |
| macOS + Safari | Links, formularios, layout e teclado. |
| iOS + Safari + VoiceOver | Leitura movel, toque, orientacao, teclado virtual e fluxo completo. |
| Android + Chrome | Reflow, toque e teclado virtual; TalkBack como ampliacao de cobertura quando disponivel. |

Definir dispositivos/versoes reais no implementation-plan e registrar versoes
no relatorio. Se Safari/iOS ou tecnologia assistiva nao estiverem disponiveis,
manter verificacao pendente e atribuir execucao; emulacao de viewport nao
substitui browser, leitor de tela ou teclado virtual reais.

Executar larguras 1440/1024/768/390/320 px e intermediarias, retrato/paisagem,
texto 200%, zoom/reflow 400% em janela de referencia e espacamento de texto.
Separar teste de viewport de teste de zoom. Usar massa sintetica com textos
longos, listas extensas, e-mails e falhas de assets/rede/storage/clipboard.
Agendamento usa API/SMTP controlados, sem registros ou mensagens institucionais.

Propor axe-core integrado a infraestrutura de browser existente ou suite
compartilhada a definir. Varredura cobre estados abertos/erros/resultados e
nao apenas pagina inicial. Fixar ferramenta e comandos no implementation-plan;
nao instalar dependencias nesta etapa. Inspecao automatizada complementa
teclado, leitor de tela, contraste e operacao manual.

## Arquivos provaveis

| Area | Intervencao |
| --- | --- |
| App/AppShell e links comuns | Politica unica de navegacao, foco, titulo e skip link. |
| FormField e controles compartilhados | Associacao de ajuda/erro, semantica e grupos. |
| globals.css/tokens.css e estilos das features | Reflow, contraste, foco, alvos e preferencias. |
| Componentes de 003–015 | Correcoes locais de listas, paineis, assets e mensagens conforme inventario. |
| routes/index.html | Metadados e verificacao de idioma/viewport sem nova rota 016. |
| Pasta da spec 016 | Matriz, verificacao, defeitos e evidencias sinteticas futuras. |
| Mapa Figma e documentos tecnicos | Evidencias visuais e conciliacao de meta WCAG. |

Antes de editar componente compartilhado, localizar consumidores e conferir
contratos implementados; planos anteriores nao provam que componentes existem.
Nao reimplementar funcionalidade ausente sob nome de correcao transversal.

## Figma e criterios de aceite

Consultar via MCP frames pertinentes de cada pagina no Design
`YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, antes de ajustes visuais.
Usar mapa atual e identificar frames faltantes. Registrar estados, breakpoints
e divergencias no implementation-plan; desktop isolado nao define uso movel.

| Criterios da spec | Evidencia de aceite futura |
| --- | --- |
| CA01/CA14 | Inventario atualizado e matriz por criterio/processo, pendencias e retestes. |
| CA02–03 | Layout, zoom, texto e espacamento nas dimensoes e ambientes registrados. |
| CA04–06 | Teclado, foco de rota/hash/lista, semantica e leitura assistiva. |
| CA07 | Medicoes de contraste e tamanho/espacamento de alvos por estado. |
| CA08–09 | Correcao de erros entre partes, listas e horarios sem perda de dados. |
| CA10–11 | Falhas e resultados acessiveis, com retorno verdadeiro de cada feature. |
| CA12–13 | Preferencias/assets, teclado virtual e matriz real de browsers/leitores. |
| CA15 | Consulta Figma, adaptacoes justificadas e evidencias sinteticas. |

Registrar defeito com passos, impacto, evidencia e dono. Priorizar impedimentos
de processo e problemas compartilhados, depois barreiras locais. Corrigir e
retestar fluxo afetado e consumidores do componente alterado. Typecheck/build
e suite adequada sao obrigatorios na implementacao; repetir verificacoes
adicionais quando mudancas ou defeitos justificarem.

## Riscos e pendencias

- Meta 2.2 ainda precisa ser conciliada com ERS e documentos 2.1.
- Placeholders e 005/017 pendentes impedem concluir cobertura completa.
- Disponibilidade de ambientes assistivos deve ser resolvida e registrada;
  teste nao executado permanece pendente.
- Mudancas em foco/tokens afetam varias paginas: dono compartilhado e regressao.
- Referencias visuais incompletas precisam de consulta, sem impedir registrar
  barreiras funcionais conhecidas.
- Evidencias devem usar dados sinteticos, sem segredos ou dados pessoais reais.

## Referencias tecnicas

- [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/): base dos criterios A/AA.
- [WCAG-EM — W3C](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/): apoio ao planejamento de avaliacao.

Referencias tecnicas nao equivalem a auditoria executada ou aprovacao do produto.

## Proximo passo

Executar `/spec:tarefas 016-responsividade-acessibilidade`, separando inventario,
decisoes, contratos compartilhados, correcoes locais e matriz de verificacao.
Depois criar `implementation-plan.md`, resolver pendencias e executar
`/spec:validar` antes de `/spec:implementar`.

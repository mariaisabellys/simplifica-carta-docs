# Spec: Tutorial Paraiba Digital

> **Contrato de URL confirmado:** `?etapa=1..6`, histórico, foco e normalização
> seguem `docs/arquitetura/contrato-navegacao.md`.

> **Revisão T011 — conteúdo sincronizado em 27/10/2026:** integração v3 definida
> no [contrato de integração](contrato-integracao-v3.md). O TypeScript aplica o
> contrato 25/13/12 sem exemplos; não há aceite funcional ou operacional.

## Objetivo

Orientar o servidor no cadastro manual das informacoes da Carta de Servicos no
Paraiba Digital por meio de um tutorial sequencial, consultavel de forma
independente e integrado aos campos de copia da feature 012.

## Problema e contexto

Depois de preparar a Carta, o servidor precisa transferir as informacoes para
a plataforma oficial e conferir o resultado. Orientacoes genericas nao bastam
para explicar onde realizar cada acao, quais dados revisar e como buscar ajuda
quando a interface ou as permissoes forem diferentes das referencias.

Esta feature ocupa `/tutorial-paraiba-digital`, etapa de tutorial de publicacao
em `Explorar por etapas` e destino depois da previa/exportacao no fluxo completo.
Pode ser consultada sem dados da Carta e sem exportar CSV. O Simplifica Carta
orienta e oferece dados para copia; nao acessa contas, preenche campos externos,
aprova nem publica servicos automaticamente.

## Usuarios impactados

- Servidor responsavel pelo cadastro manual na plataforma oficial.
- Servidor que precisa consultar instrucoes ou revisar dados antes da transferencia.
- Equipe GESED, responsavel por validar e manter as orientacoes institucionais.

## Fontes de contexto

- `README.md` e `Readme Manual de Levantamento de Serviços.md`: tutorial,
  copia individual e cadastro manual, sem integracao direta.
- `docs/produto/mvp.md`, `escopo.md`, `personas.md` e `fluxos.md`: acesso
  independente e jornada de preparacao.
- `docs/processo/constitution.md` e `docs/ia/regras-para-ia.md`: processo,
  conteudo versionado e referencias visuais antes da implementacao.
- `docs/arquitetura/decisoes-tecnicas.md`: sessao temporaria e limites do MVP.
- Specs 007–010: mesma Carta da sessao, edicao, validacao, previa e CSV.
- `specs/012-copia-dados-tutorial/spec.md`: comportamento de campos,
  acionamento, retorno, falha e alternativa de copia manual.
- `src/app/routes.tsx`, `src/pages/TutorialParaibaDigitalPage.tsx` e
  `src/content/tutorial/paraiba-digital.ts`: rota existente, pagina ainda
  provisoria e conteudo editorial completo das seis etapas, ainda sem a
  composicao visual ou integracao de copia previstas.
- `docs/design-system/mapa-figma-telas.md`: pagina principal e cinco variantes
  de etapa do tutorial, nodes `564:635`, `564:730`, `564:852`, `564:980`,
  `564:1232` e `564:1357`.

Esta spec utiliza fontes textuais locais. Nao declara leitura do PDF do ERS,
consulta direta ao Figma ou verificacao da interface atual do Paraiba Digital.
As etapas abaixo definem cobertura editorial; nomes de menus, URLs e regras
externas devem ser verificados antes de redigir instrucoes operacionais finais.

## Requisitos funcionais

### RF01 — Acesso e orientacao inicial

- Disponibilizar o tutorial em `/tutorial-paraiba-digital`, pela navegacao
  compartilhada, card da etapa de tutorial em `/explorar-por-etapas`, previa
  e URL direta, inclusive apos recarga.
- Manter as instrucoes consultaveis sem diagnostico concluido, Carta
  preenchida, previa revisada, CSV exportado ou login no Simplifica Carta.
- Reutilizar header e footer, indicar pagina atual na navegacao quando houver
  item correspondente e apresentar breadcrumb com retorno ao inicio.
- Exibir titulo, introducao e explicacao de que a transferencia, a revisao e
  as acoes oficiais acontecem manualmente na plataforma externa.
- Diferenciar acesso livre ao tutorial de eventuais credenciais e permissoes
  exigidas pela plataforma oficial, sem inventar seu processo de autenticacao.

### RF02 — Cobertura do passo a passo

Apresentar instrucoes em sequencia identificada, com titulo e orientacao pratica
para cada etapa. Cobrir os assuntos abaixo, conciliando sua divisao e rotulos
com o fluxo externo verificado no planejamento:

| Assunto | Cobertura esperada |
| --- | --- |
| Preparar e conferir os dados | Revisar informacoes com o setor responsavel e explicar que a Carta preparada e apoio ao cadastro. |
| Acessar a plataforma oficial | Oferecer endereco verificado e orientacao sobre acesso institucional, conforme fonte confirmada. |
| Localizar o cadastro de servicos | Explicar o caminho e as permissoes pertinentes com base em interface ou manual oficial verificado. |
| Transferir as informacoes | Orientar a copia/colagem e o preenchimento manual dos campos correspondentes, com verificacao de listas e opcoes. |
| Conferir o cadastro externo | Revisar os dados aplicáveis da matriz v3 e eventuais diferenças externas verificadas antes de confirmar a ação externa aplicável. |
| Concluir conforme o fluxo oficial | Explicar as acoes e estados efetivamente existentes, distinguindo salvamento, envio, analise e publicacao quando aplicaveis. |
| Resolver duvidas ou divergencias | Orientar como consultar ajuda quando faltar informacao, permissao ou correspondencia com o tutorial. |

- Nao tratar a tabela como sequencia de menus ja confirmada. O texto final
  deve usar os nomes e comportamentos verificados, sem supor que salvar
  equivale a publicar ou que todo usuario pode concluir a publicacao.
- Exibir uma unica etapa ativa por vez, sem exigir marcar conclusao para abrir
  outra etapa. A navegacao anterior/proxima deve preservar a ordem das seis
  etapas e disponibilizar o conteudo correspondente ao estado atual.
- Representar a etapa em `?etapa=1` a `?etapa=6`; ausencia ou valor invalido
  abre a etapa 1. Recarga, voltar/avancar e URL compartilhada preservam a etapa,
  sem colocar valores da Carta na URL e sem criar seis rotas distintas.
- Na etapa 6, `Concluir Guia` retorna à home `/` pelo contrato compartilhado,
  preserva a Carta e não certifica publicação nem limpa a sessão.
- Nao criar progresso persistido, pontuacao, comprovante ou certificacao.
- Explicar que o usuario deve conferir os dados depois de colar, especialmente
  quando listas ou escolhas externas demandarem entrada separada.
- Nao sugerir importacao automatica do CSV. O arquivo da 010 serve como apoio;
  qualquer alegacao de importacao externa exigiria escopo e evidencia proprios.

### RF03 — Fontes oficiais e manutencao editorial

- Verificar o endereco de acesso, caminhos, rotulos e acoes externas em fonte
  oficial ou material validado pela equipe responsavel antes da implementacao.
- Registrar no conteudo ou metadados versionados fonte, data da verificacao
  e contexto relevante, como perfil de acesso e variante da interface.
- Apresentar data de revisao do tutorial ao usuario, sem confundi-la com data
  da Carta ou de publicacao do servico.
- Nao solicitar, armazenar ou incluir credenciais reais em instrucoes ou assets.
- Nao publicar URLs inventadas, instrucao provisoria como definitiva ou promessa
  de que os menus atuais sempre terao a mesma aparencia.
- Se nao for possivel verificar um passo, registrar a pendencia documental
  antes da implementacao; orientacoes genericas nao comprovam aceite de um
  tutorial operacional completo.
- Orientar o usuario a consultar ajuda quando a tela encontrada divergir,
  sem tentar automatizar acesso, descobrir permissoes ou contornar restricoes.

### RF04 — Apresentação integral da Carta e cópia

- Aplicar o [contrato de integração v3](contrato-integracao-v3.md) e a
  [matriz da 012](../012-copia-dados-tutorial/contrato-transferencia-v3.md):
  cinco grupos, 25 definições, 13 abertas copiáveis e 12 escolhas sem botão.
- Apresentar todos os campos aplicáveis, inclusive vazios; coleções repetem por
  item/ID. Não limitar a lista aos exemplos ou aos seis copyLabel existentes.
- Valores vêm exclusivamente da Carta v3 da 007; conteúdo editorial fornece
  rótulos/instruções, nunca exemplos como fallback de sessão.
- 012 controla projeção, âncoras, clipboard e manual somente na etapa 4;
  011 controla página, passos, links e CTA único de edição.
- Matriz externa cobre os 25 paths, com correspondências ainda pendentes de
  fonte/perfil/data. Não presumir equivalência, limite ou obrigatoriedade.
- Copiar texto não comprova colagem, cadastro, análise ou publicação.
  Escolhas são apresentadas sem botão e preenchidas manualmente no destino.
- Aplicar K/S/ON/E e estados definidos pela 012, incluindo ausências e Ativo;
  preservar valores inativos sem apresentá-los ou copiá-los.
- Links relacionados derivam apenas de alvos apresentados; fallback de falha
  conserva tutorial-dados. Não manter IDs ou seletores legados em código-base.

### RF05 — Sem dados, Carta parcial e continuidade

- Sem Carta, manter todas as instrucoes disponiveis e oferecer `Preencher
  Carta` para `/formulario-carta`, com estado vazio definido pela 012.
- Com Carta parcial, permitir consultar tutorial e copiar os campos preenchidos,
  sem bloquear acesso por obrigatorios ausentes ou sugestoes editoriais.
- Oferecer `Editar na minha Carta` para `/formulario-carta` quando houver dados,
  preservando a mesma Carta. Ao retornar, exibir valores atualizados.
- Oferecer acesso a revisao em `/previa` quando pertinente, sem exigir que
  seja concluida antes de ler o tutorial.
- Reutilizar recuperacao de sessao da 007. Dados ausentes, invalidos ou
  armazenamento indisponivel nao impedem a leitura das instrucoes.
- Nao limpar a Carta ao abrir, sair, copiar ou acessar a plataforma oficial.
  Nao adicionar persistencia propria, historico ou sincronizacao entre abas.

### RF06 — Recursos visuais e links externos

- Usar capturas ou ilustracoes de apoio quando ajudarem a localizar a acao,
  sem substituir a instrucao textual essencial.
- Capturas operacionais devem corresponder a fonte verificada e ter legenda
  contextual, alternativa textual adequada e origem/data registradas.
- Nao incluir dados pessoais, credenciais, solicitacoes reais ou informacoes
  institucionais restritas nas capturas. Usar material autorizado ou demonstrativo.
- Manter assets no projeto, sem depender de URLs temporarias do Figma ou de
  imagens remotas essenciais para entender o passo.
- Nao apresentar mockups ou exemplos como captura autentica da interface atual.
- Links externos devem ter destino oficial verificado e nome que indique sua
  finalidade. Definir abertura em nova aba no planejamento e avisar no nome
  acessivel quando adotada, preservando a Carta e a navegacao interna.
- O tutorial deve continuar compreensivel quando uma imagem nao carregar.

### RF07 — Ajuda e conteudo versionado

- Disponibilizar `Preciso de ajuda` para `/ajuda`, reutilizando a acao do shell
  quando existir, sem duplicar suporte por e-mail ou agendamento.
- Distinguir ajuda oferecida pelo Simplifica Carta de eventuais canais oficiais
  externos; incluir estes ultimos somente quando verificados e pertinentes.
- Manter introducao, passos, rotulos, avisos, fontes, datas e legendas em
  conteudo versionado separado da apresentacao visual, evoluindo
  `src/content/tutorial/paraiba-digital.ts`.
- Preservar acentuacao e linguagem simples. Exemplos devem ser identificados
  como ilustrativos e nao como regras universais do servico.
- Submeter o passo a passo e a correspondencia dos campos a validacao da equipe
  responsavel. Esta spec nao declara copy ou fluxo externo homologados.

Configurações de agendamento só se aplicam com `exigeAgendamento === true`. Tipo de
agendamento exige Online, Presencial ou ambos. Sistema de agendamento (Paraíba Digital
ou Outro sistema ou site) só é obrigatório quando o tipo contém Online; Presencial
exclusivo não apresenta sistema. Link e forma de exibição são obrigatórios somente
para a parcela on-line em Outro sistema ou site. Dentro do Paraíba Digital mantém o
cidadão na experiência; Em uma nova página redireciona para a URL externa. Paraíba
Digital identifica agendamento pelo próprio sistema, sem link ou exibição externa.

Ao mudar para Nao/nao informado ou de Outro sistema ou site para Paraiba Digital,
preservar valores previamente preenchidos na mesma sessao, conforme o padrao da 007, sem
apagar silenciosamente. Valores inativos nao sao exibidos, validados como obrigatorios
nem transferidos como configuracao ativa; ao retornar a condicao correspondente, ficam
disponiveis para revisao.

Aplicar a matriz v3 completa da 012, sem criar campos adicionais de agendamento.
Correspondências externas e capacidade de exibição dependem de confirmação
institucional; não presumir iframe, API ou homologação. Transferência manual.

## Requisitos nao funcionais

- Funcionar no frontend sem backend, login no app, envio de dados da Carta,
  preenchimento automatizado ou acesso a conta externa.
- Nao registrar textos da Carta em logs ou telemetria nem criar persistencia
  permanente. O acesso externo ocorre por acao explicita em link.
- Tratar dados da Carta como texto, sem executar HTML ou scripts.
- Oferecer titulos semanticos, lista de passos e destinos compreensiveis,
  foco visivel e consulta por teclado e leitor de tela.
- Nao depender exclusivamente de imagem, cor, icone ou coordenadas da tela
  para transmitir uma instrucao.
- Funcionar em desktop, tablet e smartphone, com ampliacao, imagens adaptadas
  e textos longos sem corte, sobreposicao ou rolagem horizontal da pagina.
- Reutilizar shell, tokens e Inter com os fallbacks globais.
- Validar consulta e navegacao em Chrome, Edge, Firefox e Safari, incluindo
  imagem indisponivel e alternativa manual de copia definida na 012.

## Referencias visuais e pendencias

O tutorial possui uma pagina logica em `/tutorial-paraiba-digital` e seis
estados visuais. O primeiro frame e a pagina no estado inicial; os demais sao
variantes da mesma pagina, nao novas rotas:

| Tipo | Etapa do conteudo versionado | Node | Referencia |
| --- | --- | --- | --- |
| Pagina — estado inicial | 1. Acesse a plataforma | `564:635` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-635&m=dev) |
| Variante | 2. Faca login | `564:730` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-730&m=dev) |
| Variante | 3. Localize o cadastro | `564:852` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-852&m=dev) |
| Variante | 4. Cadastre as informacoes de sua Carta | `564:980` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-980&m=dev) |
| Variante | 5. Revise os dados | `564:1232` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-1232&m=dev) |
| Variante | 6. Publique o servico | `564:1357` | [Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-1357&m=dev) |

`src/content/tutorial/paraiba-digital.ts` e a fonte editorial oficial. Os
frames orientam layout, composicao, hierarquia, progresso e posicao dos blocos,
mas devem se adaptar aos titulos, instrucoes, percentuais, campos e acoes
versionados. Texto antigo, exemplo ou placeholder encontrado no Figma nao pode
sobrescrever o conteudo. Divergencias devem ser registradas antes do codigo.
Os valores apresentados são exclusivamente da Carta da sessão; o conteúdo
sincronizado não mantém exemplos nem lista fixa de campos como fallback.
O frame 564:980 não limita campos ou altura: deve acomodar os cinco grupos
e as 25 definições aplicáveis, com coleções e condições da 012.

Nao usar o card de entrada de `Explorar por etapas` como layout desta pagina.

Antes da implementacao visual, consultar via MCP os seis frames no Figma
Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e consultar o Figma
Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`. Registrar no
`implementation-plan.md` composicao, passos, integracao da copia, assets,
estados vazio/parcial/preenchido e responsividade; atualizar o mapa de telas.

Figma orienta a apresentacao; nao comprova sozinho que instrucoes operacionais,
URLs e campos externos estao atuais. O planejamento deve verificar ERS e fontes
oficiais, obter validacao editorial e resolver divergencias com 007 e 012 antes
do codigo. Enquanto isso, o tutorial operacional permanece pendente de validacao.

## Fora de escopo

- Login externo, coleta de credenciais, automacao de navegador ou integracao
  com APIs do Paraiba Digital.
- Publicar, enviar, aprovar ou confirmar cadastro externo pelo Simplifica Carta.
- Detectar se o usuario colou, salvou ou concluiu a publicacao.
- Importacao CSV externa, download de formatos adicionais ou copia integral.
- Editar a Carta no tutorial, gerar redacao ou criar regras de validacao proprias.
- Historico, progresso persistido, certificados ou rascunhos permanentes.
- Criar area completa de materiais de apoio, curso, suporte ou agenda.

## Dependencias

- `001-fundacao-do-projeto` e `002-home-e-navegacao`: estrutura, sessao e shell.
- `003-explorar-por-etapas`: entrada independente para o tutorial.
- `007-formulario-carta-servico`: dados atuais e retorno para edicao.
- `008-validacao-linguagem-simples`, `009-previa-html` e `010-exportacao-csv`:
  coerencia da jornada, sem tornar revisao ou exportacao requisito de acesso.
- `012-copia-dados-tutorial`: componente e comportamento de copia individual;
  planejamentos 011 e 012 devem conciliar a mesma pagina e contratos.
- `013-fluxo-de-ajuda` e `016-responsividade-acessibilidade`: alinhamento
  transversal, sem adiar acessibilidade ou implementar ajuda nesta feature.
- Fontes operacionais verificadas, assets autorizados, validacao editorial e
  consulta detalhada dos seis frames mapeados.

Na criacao desta spec, 013 e 016 ainda nao possuiam pastas em `specs/`; ambas
existem atualmente. O conteudo versionado ja possui seis etapas, mas a pagina
continua provisoria e nao representa o tutorial visual ou operacional concluido.
O comportamento de agendamento na spec 012 recebeu conciliacao com 007 antes
da implementacao conjunta.

## Criterios de aceite

| ID | Cenario | Resultado esperado |
| --- | --- | --- |
| CA01 | Abrir tutorial pela etapa, previa, navegacao ou URL direta e recarga. | Acessar sem exigir diagnostico, login no app, Carta ou CSV. |
| CA02 | Consultar o passo a passo. | Encontrar cobertura da preparacao, acesso, localizacao, transferencia, revisao, conclusao e ajuda, em ordem coerente. |
| CA03 | Revisar instrucoes operacionais e links. | Encontrar fontes verificadas, contexto e data de revisao, sem menus ou URLs inventados. |
| CA04 | Consultar uma orientacao sobre salvar, enviar ou publicar. | Distinguir as acoes efetivamente existentes, sem presumir aprovacao ou publicacao imediata. |
| CA05 | Abrir sem dados ou com sessao invalida/indisponivel. | Manter instrucoes consultaveis e estado vazio com acesso ao formulario. |
| CA06 | Usar Carta parcial com pendencias ou sugestoes. | Consultar tutorial e copiar valores preenchidos conforme 012, sem bloqueio global. |
| CA07 | Editar a Carta e voltar ao tutorial. | Exibir dados atuais da mesma sessao, sem apagar valores ou manter versao editavel duplicada. |
| CA08 | Consultar mapeamento entre Carta e campos externos. | Encontrar correspondencias verificadas e orientacao para diferencas, sem inventar valores ou equivalencia homologada. |
| CA09 | Consultar agendamento null/false/true e campos condicionais. | null não vira Não; escolhas não têm cópia; condições S/ON/E preservam valores inativos sem apresentá-los; presencial exclusivo não exige sistema. |
| CA10 | Copiar ou falhar na copia de um campo. | Usar retorno e alternativa manual da 012, sem anunciar cadastro, colagem ou publicacao externos. |
| CA11 | Abrir plataforma oficial por link. | Usar destino verificado e comportamento acessivel, preservando a Carta no app. |
| CA12 | Consultar captura demonstrativa ou imagem que nao carrega. | Identificar contexto e legenda, continuar pela instrucao textual e nao expor dados reais ou credenciais. |
| CA13 | Navegar por teclado e leitor de tela. | Identificar passos, imagens, links e acoes de copia com foco e ordem coerentes. |
| CA14 | Consultar textos longos e capturas em telas pequenas e com ampliacao. | Manter leitura e acoes acessiveis sem corte, sobreposicao ou rolagem horizontal. |
| CA15 | Encontrar tela externa diferente da referencia. | Receber orientacao de ajuda sem automacao, coleta de credenciais ou promessa de acompanhamento externo. |
| CA16 | Revisar arquitetura, conteudo e implementacao visual futura. | Encontrar conteudo versionado, fontes e consultas Figma registradas, shell reutilizado e ausencia de integracao ou persistencia permanente. |
| CA17 | Consultar ou transferir dados em Não/Sim, presencial, Paraíba Digital, externo dentro/fora e após troca de sistema. | Respeitar configurações ativas K/S/ON/E conforme matriz v3 007/012; não apresentar ou transferir valores inativos preservados na sessão; aplicar apenas validação prevista por esta feature. |
| CA18 | Abrir etapa 4 com Carta completa, parcial ou vazia. | Cinco grupos e todos os 25 campos aplicáveis; 13 definições abertas copiáveis quando preenchidas e 12 escolhas sem botão; nenhum exemplo como valor real. |
| CA19 | Trocar etapa, editar/retornar, usar query/hash e histórico. | Uma etapa ativa, 012 só na 4, valores preservados, alvos reais/fallback e foco coordenado; nenhum feedback tardio. |
| CA20 | Revisar conteúdo sincronizado e evidências externas. | Outras cinco etapas preservadas na migração; instruções, links, matriz e assets sem homologação presumida; fonte/data verdadeiras para aprovação operacional. |

## Próximo passo

Concluir os itens pendentes de [tasks.md](tasks.md). A sincronização T009 do
conteúdo foi concluída; fonte administrativa,
ERS/Figma, aprovação editorial, implementação e testes continuam pendentes.
Ver [validation.md](validation.md) e [verification.md](verification.md).

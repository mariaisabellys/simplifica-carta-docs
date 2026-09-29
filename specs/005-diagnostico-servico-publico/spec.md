# Spec: Diagnostico de Servico Publico

## Objetivo

Especificar o diagnostico interativo que ajuda o usuario a avaliar se uma
atividade caracteriza um servico publico, uma etapa de outro servico, um
processo interno, um autosservico ou uma situacao que exige analise adicional.

O diagnostico deve apresentar oito perguntas em linguagem simples, coletar uma
resposta por pergunta e aplicar regras deterministicas para selecionar a
orientacao adequada. As regras de classificacao sao internas e nao devem ser
exibidas ao usuario.

## Contexto

O Simplifica Carta apoia servidores publicos antes do preenchimento da Carta de
Servico. Uma dificuldade recorrente e distinguir uma entrega destinada ao
publico de uma tarefa administrativa, uma etapa intermediaria ou uma atividade
interna do orgao.

O diagnostico e a primeira etapa do fluxo guiado e tambem pode ser acessado de
forma independente pela pagina `Explorar por etapas`. Seu resultado orienta o
proximo passo, mas nao substitui avaliacao institucional quando as respostas
forem inconclusivas ou contraditorias.

A funcionalidade deve seguir:

- `docs/produto/visao-produto.md`;
- `docs/produto/escopo.md`;
- `docs/produto/mvp.md`;
- `docs/produto/fluxos.md`;
- `docs/produto/personas.md`;
- `docs/processo/constitution.md`;
- o shell compartilhado da feature `002-home-e-navegacao`;
- o acesso independente definido pela feature `003-explorar-por-etapas`.

## Identificador normalizado

- Spec: `005-diagnostico-servico-publico`.
- O identificador digitado como `005-diganostico-servico-publico` foi
  normalizado por conter apenas um erro de grafia.

## Referencias Figma

### Figma Design

- Arquivo: `YaVUdqYa3boHpvGrxf4ZJ5`.
- Frame principal: `387:1020` (`diagnostico`).
- Rota associada: `/diagnostico`.
- Mapeamento: `docs/design-system/mapa-figma-telas.md`.

O frame orienta composicao, hierarquia, card do diagnostico, navegacao entre
perguntas e comportamento visual. Antes da implementacao definitiva, o node
deve ser consultado novamente conforme a constitution.

### Figma Make

- Arquivo: `dVm7lEZdBFqOiiySWLWUqp`.
- Node: `0:1`.

Deve orientar tokens, controles, estados, tipografia, espacamentos e
responsividade. A fonte principal do projeto e `Inter`.

## Usuarios impactados

- Servidor responsavel pelo levantamento, que precisa saber se uma atividade
  deve ser descrita em uma Carta de Servico.
- Servidor responsavel pelo cadastro, que precisa evitar cadastrar tarefas
  internas ou etapas isoladas como servicos.
- Equipe GESED, que precisa oferecer criterios consistentes e conteudo
  versionado para orientar os orgaos.

## Problema

Sem criterios guiados, o usuario pode cadastrar como servico uma atividade
interna, uma etapa intermediaria ou uma acao que nao produz entrega propria ao
publico. Tambem pode deixar de registrar um autosservico por acreditar que todo
servico exige analise ou atendimento de um servidor.

Uma classificacao simplista tambem pode produzir conclusoes incorretas diante
de respostas incertas ou contraditorias. Por isso, o fluxo precisa reconhecer
quando nao ha informacao suficiente e encaminhar o caso para analise adicional.

## Requisitos funcionais

### Rotas e entradas

- Disponibilizar o questionario em `/diagnostico`.
- Disponibilizar o resultado em `/diagnostico/resultado`.
- Permitir entrada pelo CTA `Iniciar guia` da home.
- Permitir entrada por `Iniciar diagnostico` em `/explorar-por-etapas`.
- Permitir acesso direto e recarga sem quebrar o shell da aplicacao.
- Reutilizar header, navegacao e footer compartilhados.
- Nao exigir que o usuario tenha visitado a pagina conceitual da feature 004.

### Apresentacao do diagnostico

- Exibir o rotulo `Diagnóstico Interativo`.
- Exibir o titulo `Isso é mesmo um serviço?`.
- Exibir o subtitulo `Responda as perguntas para descobrir se o que você quer
  cadastrar é realmente um serviço público.`.
- Exibir os tres destaques:
  - `Leva menos de 2 minutos`;
  - `Baseado nos critérios do Gov.br`;
  - `Você pode recomeçar quando quiser`.
- Apresentar cada pergunta dentro do card do diagnostico.
- Manter a ordem oficial das oito perguntas.
- Informar o progresso atual sem depender somente de cor.
- Permitir recomecar o diagnostico e limpar somente as respostas desta
  execucao.

### Opcoes de resposta

Cada pergunta deve oferecer exatamente estas opcoes:

- `Sim`;
- `Não`;
- `Não tenho certeza`.

O valor interno correspondente deve ser, respectivamente, `sim`, `nao` e
`nao-tenho-certeza`. O usuario deve escolher uma opcao antes de avancar.

### Perguntas

As perguntas devem ser carregadas de
`src/content/diagnostico/perguntas.ts`, nesta ordem:

1. `A atividade gera uma entrega ou resultado para alguém fora do órgão?`
2. `Existe um público que pode solicitar, acessar ou utilizar essa atividade?`
3. `O resultado atende a uma necessidade desse público?`
4. `A atividade pode ser utilizada de forma independente, sem fazer parte
   obrigatoriamente de outro serviço?`
5. `O público consegue iniciar alguma ação para obter o resultado, como
   solicitar, consultar, emitir, baixar ou agendar?`
6. `A atividade gera algo que o público pode usar, como um documento,
   benefício, autorização, informação, atendimento ou cadastro?`
7. `A atividade existe para atender o público, e não apenas para o
   funcionamento interno do órgão?`
8. `O resultado pode ser obtido diretamente pelo usuário, sem precisar de
   análise ou atendimento de um servidor?`

### Navegacao pelo questionario

- Permitir avancar somente depois de responder a pergunta atual.
- Permitir voltar para revisar uma resposta sem perder as demais.
- Preservar a resposta escolhida ao navegar entre perguntas.
- Ao concluir a oitava pergunta, avaliar o conjunto completo uma unica vez e
  direcionar para `/diagnostico/resultado`.
- Evitar duplo envio ou alteracao do resultado por cliques repetidos.
- O historico do navegador nao deve criar estados impossiveis ou revelar uma
  resposta de outro diagnostico.

### Motor de decisao

- Implementar a avaliacao como funcao pura e deterministica.
- Receber um mapa completo das oito respostas.
- Retornar somente um `RespostaDiagnosticoId`.
- Nao retornar texto editorial diretamente da funcao.
- Nao renderizar criterios, pesos, precedencia ou combinacoes internas.
- Usar `src/content/diagnostico/condicoes.ts` como fonte da regra.
- Usar `src/content/diagnostico/respostas.ts` como fonte dos textos de
  resultado.
- Qualquer combinacao nao reconhecida deve retornar `analisar-melhor`.

## Regras de classificacao

### Precedencia

Aplicar as regras nesta ordem:

1. duvida em criterio essencial ou duas ou mais duvidas;
2. padrao forte de processo interno;
3. respostas contraditorias;
4. padrao de etapa de outro servico;
5. criterios de servico publico e distincao de autosservico;
6. fallback para analise adicional.

Essa precedencia resolve a sobreposicao entre o padrao interno e a contradicao
da pergunta 4: quando todas as perguntas de relacao com o publico forem `Não`,
a pergunta 4 e ignorada e prevalece `processo-interno`.

### Precisamos analisar melhor — duvidas

Retornar `analisar-melhor` quando:

- qualquer uma das perguntas 1, 4, 6 ou 7 receber `Não tenho certeza`; ou
- duas ou mais perguntas, quaisquer que sejam, receberem
  `Não tenho certeza`.

Uma unica duvida fora dos criterios essenciais nao impede, por si so, uma
classificacao sustentada pelos demais criterios. Se nenhuma regra conclusiva
for satisfeita, o fallback ainda deve retornar `analisar-melhor`.

### Pode ser um processo interno

Retornar `processo-interno` no padrao forte em que as perguntas 1, 2, 3, 5, 6
e 7 sejam `Não`.

- A pergunta 4 deve ser ignorada nessa classificacao.
- A pergunta 8 nao altera essa classificacao.
- O padrao representa atividade interna sem entrega acessivel ao publico.

### Precisamos analisar melhor — contradicoes

Quando o padrao forte de processo interno nao estiver satisfeito, retornar
`analisar-melhor` para qualquer uma destas combinacoes:

- pergunta 1 = `Sim` e pergunta 6 = `Não`;
- pergunta 2 = `Não` e pergunta 5 = `Sim`;
- pergunta 4 = `Sim`, pergunta 1 = `Não` e pergunta 6 = `Não`.

### Pode ser uma etapa de outro servico

Retornar `etapa-de-outro-servico` para o padrao:

- pergunta 1 = `Não`;
- pergunta 2 = `Sim`;
- pergunta 3 = `Sim`;
- pergunta 4 = `Não`;
- pergunta 5 = `Sim`;
- pergunta 6 = `Não`;
- pergunta 7 = `Sim`.

A pergunta 8 nao altera essa classificacao. O padrao indica interacao com o
publico, mas ausencia de entrega propria e dependencia de um servico maior.

### E um servico publico

Os criterios principais sao:

- perguntas 1, 2, 3, 4, 6 e 7 = `Sim`.

A pergunta 5 nao precisa ser `Sim`, pois a entrega pode acontecer
automaticamente ou o usuario pode apenas acessar algo disponivel. Uma resposta
isolada `Não tenho certeza` na pergunta 5 nao invalida os criterios principais.

Quando os criterios principais forem satisfeitos:

- pergunta 8 = `Sim` retorna `autosservico`;
- pergunta 8 = `Não` retorna `servico-publico`;
- pergunta 8 = `Não tenho certeza` retorna `servico-publico`, pois os criterios
  de servico continuam satisfeitos, mas nao ha base para afirmar o subtipo
  autosservico.

### E um autosservico

Autosservico e um subtipo de servico publico. Deve ser retornado somente quando
todos os criterios principais de servico publico forem satisfeitos e a
pergunta 8 for `Sim`.

## Resultados visiveis

A tela deve selecionar o texto pelo identificador retornado pelo motor, usando
`respostasDiagnosticoPorId`. Os cinco resultados sao:

### Pode ser uma etapa de outro servico

`A atividade descrita parece fazer parte de um serviço maior e, sozinha, não
representa uma entrega final para o público atendido. Verifique se essa
atividade faz parte de uma sequência que resulta em uma entrega maior. Nesse
caso, ela deve aparecer como uma etapa do serviço, e não como um serviço
separado.`

### Pode ser um processo interno

`A atividade parece estar relacionada ao funcionamento interno do órgão.
Processos administrativos e atividades realizadas apenas pela equipe não
devem ser cadastrados como serviços. Lembre-se de que uma Carta de Serviço deve
apresentar o resultado final entregue ao público atendido, como cidadãos,
empresas ou instituições, e não apenas atividades internas do órgão.`

### E um servico publico

`Com base nas suas respostas, a atividade atende aos principais critérios de
um serviço público e gera uma entrega ou resultado para o público atendido.
Você pode avançar para a elaboração da Carta de Serviço.`

### E um autosservico

`O resultado é disponibilizado diretamente ao público, sem necessidade de
análise ou atendimento de um servidor. Mesmo assim, ele pode ser cadastrado
como serviço.`

### Precisamos analisar melhor

`Há especificidades nesta atividade que exigem uma avaliação mais detalhada.
Recomendamos consultar nossos materiais complementares ou agendar um
atendimento com nossa equipe.`

### Comportamento da tela de resultado

- Exibir exatamente um resultado por execucao.
- Nao exibir a matriz de respostas, pontuacao ou regras internas.
- Nao afirmar que uma classificacao inconclusiva e definitiva.
- Permitir recomecar o diagnostico.
- Quando houver acao de continuidade para um servico valido, direcionar ao
  proximo passo do fluxo sem publicar ou persistir dados automaticamente.
- Para `analisar-melhor`, reutilizar o fluxo `/ajuda`; nao criar uma nova area
  de materiais complementares, pois ela esta fora do MVP.

## Estado e persistencia

- Manter as respostas somente durante a execucao atual ou sessao do navegador.
- Nao enviar as respostas a backend.
- Nao criar login, historico permanente ou perfil de diagnosticos.
- Nao misturar respostas do diagnostico com os dados da Carta.
- Recomecar deve limpar as oito respostas e o resultado calculado.
- Abrir a rota de resultado sem uma execucao valida deve redirecionar para
  `/diagnostico` ou apresentar uma acao clara para inicia-lo, sem inventar
  resultado padrao.

## Conteudo versionado

- `src/content/diagnostico/perguntas.ts`: apresentacao e perguntas.
- `src/content/diagnostico/respostas.ts`: textos dos resultados.
- `src/content/diagnostico/condicoes.ts`: tipos de resposta e motor de decisao.
- Componentes visuais nao devem duplicar esses textos ou reimplementar as
  regras com condicionais locais.
- Os identificadores devem permanecer estaveis para testes e telemetria futura.

## Requisitos nao funcionais

### Acessibilidade

- Usar semantica de formulario para o questionario.
- Agrupar as opcoes de cada pergunta com `fieldset` e `legend` ou estrutura
  semanticamente equivalente.
- Associar mensagens e instrucao de selecao ao grupo correto.
- Garantir operacao completa por teclado e foco visivel.
- Ao mudar de pergunta, mover ou restaurar o foco de forma previsivel.
- Ao exibir o resultado, posicionar o foco no titulo principal da orientacao.
- Nao depender somente de cor ou icone para indicar selecao, progresso, erro ou
  tipo de resultado.
- Respeitar zoom de 200%, reflow e preferencias de movimento reduzido.

### Responsividade

- Funcionar em computador, tablet e smartphone.
- Nao produzir corte, sobreposicao ou scroll horizontal.
- Manter pergunta, opcoes e controles na ordem de leitura em todos os
  breakpoints.
- Evitar que botoes primarios ou opcoes fiquem fora da area visivel em telas
  estreitas.

### Qualidade e seguranca

- A mesma combinacao deve sempre produzir o mesmo resultado.
- A ordem visual das perguntas nao pode alterar sua correspondencia com a
  regra.
- Nao usar indices de array como identificadores da regra de negocio.
- Nao incluir dados pessoais nas respostas do diagnostico.
- Nao executar chamadas externas para classificar a atividade.

## Fora de escopo

- Analise por inteligencia artificial ou modelo probabilistico.
- Envio das respostas para avaliacao humana automatica.
- Pontuacao visivel, ranking ou percentual de certeza.
- Edicao das regras por painel administrativo.
- Persistencia permanente ou historico de diagnosticos.
- Integracao direta com Gov.br ou Paraiba Digital.
- Publicacao automatica de servicos.
- Area completa de materiais complementares.
- Diagnostico juridico definitivo sobre a natureza da atividade.

## Dependencias

- Feature `001-fundacao-do-projeto`: stack, tokens basicos e qualidade.
- Feature `002-home-e-navegacao`: shell, navegacao e entrada pelo fluxo guiado.
- Feature `003-explorar-por-etapas`: entrada independente no diagnostico.
- Feature `006-organizar-informacoes`: proximo passo do fluxo para servicos
  classificados.
- Feature `013-fluxo-de-ajuda`: encaminhamento de casos inconclusivos.
- `src/app/routes.tsx`: rotas `/diagnostico` e `/diagnostico/resultado`.
- Frame Figma `387:1020` e design system do Figma Make.

## Riscos e decisoes registradas

### Sobreposicao entre processo interno e contradicao

O padrao forte de processo interno prevalece quando 1, 2, 3, 5, 6 e 7 forem
`Não`, independentemente da pergunta 4. Fora desse padrao, a combinacao 4 =
`Sim`, 1 = `Não` e 6 = `Não` permanece contraditoria.

### Pergunta 8 e autosservico

A pergunta 8 nao decide se existe um servico. Ela identifica o subtipo
autosservico depois que os criterios principais ja foram satisfeitos.

### Combinacoes parciais nao descritas

As regras aprovadas descrevem padroes fortes, nao todas as combinacoes
possiveis. Para evitar falso positivo, qualquer combinacao sem correspondencia
explicita retorna `Precisamos analisar melhor`.

## Criterios de aceite

- A pasta `specs/005-diagnostico-servico-publico/` usa o identificador correto.
- `/diagnostico` apresenta rotulo, titulo, subtitulo, destaques e oito perguntas
  na ordem aprovada.
- Cada pergunta oferece `Sim`, `Não` e `Não tenho certeza`.
- O usuario pode avancar, voltar, revisar e recomecar sem inconsistencias.
- Nenhuma pergunta pode ser ignorada ao concluir o formulario.
- O motor recebe oito respostas e retorna exatamente um identificador valido.
- Duvida essencial e duas ou mais duvidas retornam `analisar-melhor`.
- As tres contradicoes documentadas retornam `analisar-melhor`, respeitada a
  precedencia do padrao interno forte.
- O padrao de etapa retorna `etapa-de-outro-servico`.
- O padrao interno forte retorna `processo-interno` mesmo quando a pergunta 4
  for `Sim`.
- Os criterios principais com pergunta 8 = `Não` retornam `servico-publico`.
- Os criterios principais com pergunta 8 = `Sim` retornam `autosservico`.
- A pergunta 5 = `Não` nao impede a classificacao como servico.
- Combinacoes nao reconhecidas retornam `analisar-melhor`.
- A tela `/diagnostico/resultado` exibe somente o texto associado ao ID
  retornado.
- As regras internas nao aparecem no HTML nem em mensagens para o usuario.
- Acesso direto ao resultado sem respostas nao inventa uma classificacao.
- As respostas nao sao enviadas a backend nem persistidas permanentemente.
- O fluxo funciona com teclado, foco visivel, leitor de tela, zoom de 200% e em
  larguras de computador, tablet e smartphone.
- A interface usa `Inter` como fonte principal.

## Proximos comandos

```txt
/spec:planejar 005-diagnostico-servico-publico
/spec:tarefas 005-diagnostico-servico-publico
/spec:plano-implementacao 005-diagnostico-servico-publico
/spec:validar 005-diagnostico-servico-publico
```

# Spec: Home e Navegacao

## Objetivo

Especificar a pagina inicial e a navegacao principal do Simplifica Carta,
garantindo que a primeira experiencia do usuario apresente o produto, ofereca
os caminhos principais e siga o prototipo Figma atualizado.

## Contexto

A fundacao tecnica do frontend ja existe com React, TypeScript, Vite, rotas
placeholder e base visual inicial.

O arquivo Figma do prototipo foi revisado para reduzir os frames que devem ser
usados agora. A home atual esta no node `310:175` e substitui os frames antigos
que estavam documentados anteriormente.

Esta funcionalidade deve seguir:

- requisitos do MVP em `docs/produto/mvp.md`;
- fluxo principal em `docs/produto/fluxos.md`;
- regras de design em `docs/processo/constitution.md`;
- mapa atualizado em `docs/design-system/mapa-figma-telas.md`;
- Figma Design do prototipo para layout e composicao;
- Figma Make para tokens, componentes e padroes visuais.

## Referencias Figma

### Figma Design do prototipo

- Arquivo: `YaVUdqYa3boHpvGrxf4ZJ5`
- Pagina raiz atual: `167:2` (`Prototipo`)
- Frame principal da home: `310:175` (`home`)

O frame `310:175` apresenta a home atual com:

- navegacao superior;
- marca `Simplifica Carta` e subtitulo `Guia de Servicos`;
- hero com a chamada `Menos burocracia, mais praticidade.`;
- texto de apoio sobre escolher entre guia completo e acesso livre;
- acoes `Iniciar o guia` e `Explorar por etapas`;
- imagem/arte de apoio da Carta de Servico;
- secao `Como funciona o processo?`;
- quatro etapas visuais do processo:
  - identificar um servico;
  - organizar informacoes;
  - elaborar Carta;
  - simular publicacao;
- CTA `Conheca primeiro o que e uma Carta de Servicos`;
- footer institucional.

### Frames antigos a evitar

Nao usar como referencia principal desta spec:

- `3:2` como home;
- `594:528` como navbar;
- `3:104`, `3:176`, `98:52` ou `263:4` como secoes da home.

Esses nodes pertenciam a uma organizacao anterior do prototipo ou a telas que
serao tratadas em specs proprias.

### Figma Make do design system

- Arquivo: `dVm7lEZdBFqOiiySWLWUqp`
- Node: `0:1`

Deve orientar tokens, tipografia, cores, botoes, cards, estados, navegacao e
comportamento responsivo.

## Usuarios impactados

- Servidor responsavel pelo levantamento, que precisa iniciar o guia e entender
  o caminho para preparar a Carta.
- Servidor responsavel pelo cadastro, que precisa acessar rapidamente etapas e
  entender que o cadastro final sera manual no Paraiba Digital.
- Equipe GESED, que precisa de uma entrada institucional clara, consistente e
  facil de manter no codigo.

## Problema

A fundacao atual possui uma home placeholder e navegacao basica. Ela ainda nao
reflete a composicao, a hierarquia e os caminhos de entrada do prototipo
revisado.

Sem uma home bem definida, o usuario pode nao compreender:

- o que o Simplifica Carta faz;
- como iniciar o guia;
- como explorar as etapas;
- por que deve entender primeiro o que e uma Carta de Servicos;
- que o produto apoia a preparacao das informacoes, sem substituir o Paraiba
  Digital.

## Requisitos funcionais

### Home

- Exibir uma pagina inicial baseada no frame Figma `310:175`.
- Apresentar navegacao superior conforme a home atual do prototipo.
- Apresentar a marca `Simplifica Carta` e o subtitulo `Guia de Servicos`.
- Exibir hero com:
  - frase de apoio `Guia para criacao de Cartas de Servicos`;
  - titulo `Menos burocracia, mais praticidade.`;
  - texto explicando a escolha entre guia completo e acesso livre as secoes;
  - botao/acao `Iniciar o guia`;
  - botao/acao `Explorar por etapas`;
  - imagem/arte da Carta de Servico quando o asset estiver disponivel.
- Direcionar `Iniciar o guia` para `/diagnostico`, primeira etapa do fluxo de
  cadastro de uma Carta de Servicos.
- Direcionar `Explorar por etapas` para `/explorar-por-etapas`, pagina propria
  de acesso independente as etapas do fluxo de cadastro.
- Exibir a secao `Como funciona o processo?` com texto introdutor.
- Exibir quatro etapas do processo:
  - `Identificar um servico`;
  - `Organizar informacoes`;
  - `Elaborar Carta`;
  - `Simular publicacao`.
- Exibir CTA intermediario para a pagina `O que e a Carta de Servicos`.
- Exibir footer institucional com acesso rapido, recursos/apoio, descricao do
  Simplifica Carta, dados institucionais e copyright.

### Navegacao principal

- A navegacao principal deve ser baseada na navegacao contida no node `310:175`.
- Incluir links para:
  - Inicio;
  - O que e a Carta?;
  - Duvidas frequentes;
  - Preciso de ajuda.
- Nao incluir o link `Material de apoio` na header nesta etapa, mesmo que ele
  apareca no prototipo Figma, pois a area completa de materiais de apoio esta
  fora do MVP.
- Destacar o estado atual da pagina inicial.
- Garantir que links para funcionalidades fora do MVP completo nao prometam
  areas completas ainda nao implementadas.
- Permitir navegacao por teclado, foco visivel e estado ativo da pagina/secao.
- Adaptar a navegacao para telas menores sem sobrepor textos ou esconder a
  acao principal de ajuda.

### Conteudo versionado

- Manter textos de hero, etapas, navegacao e footer em arquivos de conteudo
  versionado quando houver repeticao ou manutencao editorial.
- Evitar textos institucionais fixos diretamente em componentes visuais quando
  forem conteudo de pagina.

## Requisitos nao funcionais

- A home deve ser responsiva para computador, tablet e smartphone.
- A navegacao deve ser acessivel por teclado e leitores de tela.
- Os textos devem usar linguagem simples, sem termos tecnicos desnecessarios.
- A composicao deve seguir o Figma Design do prototipo para layout e hierarquia.
- Os tokens, botoes, cards e estados devem seguir o Figma Make.
- A implementacao futura nao deve instalar Tailwind apenas porque o MCP do
  Figma retorna exemplos com classes Tailwind.
- Imagens, icones ou vetores extraidos do Figma devem ser tratados conforme a
  regra do `figma-design-to-code`: usar assets reais exportados, nao SVGs
  recriados manualmente.
- A pagina inicial deve carregar sem depender de backend.

## Fora de escopo

- Implementar diagnostico completo.
- Implementar formulario completo da Carta de Servicos.
- Implementar busca avancada.
- Implementar area completa de material de apoio.
- Exibir o link `Material de apoio` na header da home neste momento.
- Implementar area completa de duvidas frequentes.
- Implementar suporte/agendamento com backend.
- Publicar ou integrar automaticamente com o Paraiba Digital.
- Criar autenticacao, painel administrativo ou persistencia permanente.

## Decisoes de escopo

- A home deve conter apenas os blocos atualmente presentes no node `310:175`.
- FAQ, diagnostico, formulario, previa e ajuda possuem frames proprios no
  Figma e devem ser tratados em specs proprias.
- O link `Material de apoio` aparece no prototipo Figma, mas nao deve ser
  incluido na header nesta etapa, pois a area completa de materiais de apoio
  esta fora do MVP conforme `docs/produto/mvp.md`.
- A etapa visual `Simular publicacao` deve ser interpretada como apoio ao
  cadastro manual/tutorial, sem publicacao automatica no Paraiba Digital.

## Dependencias

- Fundacao tecnica criada em `001-fundacao-do-projeto`.
- Rota `/explorar-por-etapas` planejada para a feature
  `003-explorar-por-etapas`.
- Rotas iniciais existentes em `src/app/routes.tsx`.
- Tokens CSS iniciais em `src/styles/tokens.css`.
- Componentes iniciais de layout e UI em `src/components/`.
- Mapa de Figma em `docs/design-system/mapa-figma-telas.md`.
- Consulta ao Figma Design via MCP antes de planejar/implementar.
- Consulta ao Figma Make via MCP antes de implementar estilos finais.

## Criterios de aceite

- `specs/002-home-e-navegacao/spec.md` existe e documenta objetivo, contexto,
  usuarios, requisitos, fora de escopo, dependencias e criterios de aceite.
- A implementacao futura da home segue o frame Figma `310:175`.
- A home apresenta claramente o produto e os dois caminhos principais:
  `Iniciar o guia` e `Explorar por etapas`.
- `Explorar por etapas` direciona para `/explorar-por-etapas`.
- A home apresenta a secao `Como funciona o processo?` com quatro etapas.
- A home apresenta CTA para `O que e a Carta de Servicos`.
- A navegacao principal possui links coerentes com a home atual do prototipo.
- A pagina funciona em desktop, tablet e smartphone sem sobreposicao de textos
  ou quebra incoerente de layout.
- A navegacao funciona por teclado e possui foco visivel.
- Links para areas fora do MVP nao induzem o usuario a acreditar que ha
  funcionalidade completa ja disponivel.
- Textos e itens repetidos ficam preparados para conteudo versionado.
- Nenhum dado da Carta de Servicos e persistido permanentemente por esta
  funcionalidade.

## Proximos passos recomendados

Depois desta spec, usar:

```txt
/spec:planejar 002-home-e-navegacao
```

Em seguida:

```txt
/spec:tarefas 002-home-e-navegacao
```

Como a funcionalidade envolve tela e composicao visual, antes de
`/spec:implementar` tambem deve ser criado:

```txt
/spec:plano-implementacao 002-home-e-navegacao
```

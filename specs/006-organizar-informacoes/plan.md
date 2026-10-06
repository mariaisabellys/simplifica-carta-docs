# Plan: Organizar informacoes

## Objetivo tecnico e status

Substituir o placeholder de `/organizar-informacoes` por uma pagina de consulta
com dez assuntos de levantamento, orientacoes praticas e acesso livre ao
formulario e a ajuda. Reutilizar o shell, manter conteudo editorial versionado
e funcionar sem backend, dados previos ou controle de progresso.

Este plano define abordagem, contratos propostos e verificacoes para
`/spec:tarefas`. Nao autoriza implementacao visual: antes de
`/spec:implementar`, criar `tasks.md` e `implementation-plan.md`, consultar as
referencias Figma e resolver as pendencias visuais e editoriais.

## Fontes e limites da consulta

- `specs/006-organizar-informacoes/spec.md`;
- `README.md` e trechos sobre organizacao no
  `Readme Manual de Levantamento de Serviços.md`;
- `docs/processo/constitution.md`, `docs/ia/regras-para-ia.md`,
  `docs/ia/prompts-padroes.md` e `docs/ia/guia-uso-codex.md`;
- `docs/produto/mvp.md` e `docs/produto/fluxos.md`;
- `docs/arquitetura/decisoes-tecnicas.md`;
- `docs/design-system/mapa-figma-telas.md`,
  `docs/design-system/tokens-e-componentes.md` e `docs/implementation-plan.md`;
- planos das features 003 e 004;
- rotas, App, AppShell, pagina placeholder, ButtonLink, conteudo da etapa 2,
  tokens e tipos, schema e armazenamento da Carta em `src/`.

Nesta etapa nao houve consulta direta ao Figma nem leitura do PDF do ERS.
As referencias visuais abaixo sao referencias documentadas localmente, sem
medidas, assets ou composicao homologados por este plano. A conciliacao com o
ERS e com os arquivos oficiais do Figma deve ocorrer no plano detalhado.

## Estado atual

- Stack React 19, TypeScript e Vite, com CSS global e tokens; Inter ja e a
  fonte principal.
- `/organizar-informacoes` aponta para `OrganizarInformacoesPage`, tem
  `specId: "006-organizar-informacoes"`, `layoutType: "section"` e
  `showInNav: true`, mas nao tem `figmaNodeId`.
- A pagina contem apenas `PageHeader` e `PlaceholderCard`.
- `AppShell` concentra header, main e footer e ja indica o item atual com
  `aria-current="page"`.
- O roteamento usa `window.history`, `findRoute` e `popstate`; nao ha React
  Router. A navegacao do shell usa `pushState`, mas `ButtonLink` atualmente
  renderiza um link comum, que pode recarregar a aplicacao.
- Existe conteudo da etapa 2 em `src/content/pages/explorar-por-etapas.ts`,
  apontando para esta rota. A pagina e a rota `/explorar-por-etapas` ainda nao
  estao implementadas; CA02 depende da entrega da feature 003.
- Nao existem Breadcrumb ou AppLink compartilhados na estrutura atual.
- Os scripts disponiveis sao `dev`, `build`, `preview` e `typecheck`; nao ha
  framework de testes configurado.
- As specs 007, 013 e 016 possuem documentos; a 005 ainda nao possui pasta.
  Seus placeholders e contratos iniciais nao comprovam funcionalidades entregues.

Conferir novamente esse estado antes de implementar, principalmente os
contratos compartilhados resultantes das features 002 e 003.

## Abordagem tecnica

### Rota e navegacao

Manter a rota e o roteador existentes. Reutilizar o contrato de links internos
consolidado pela feature 002 para breadcrumb, `Preencher Carta` e ajuda, com
`href` real, suporte a voltar/avancar e comportamento normal para cliques com
modificadores e abertura em nova aba. Evitar criar um roteador na pagina.

Usar breadcrumb `Inicio > Organizar informações`, com link para `/` e pagina
atual indicada semanticamente. O titulo visivel deve preservar acentuacao.
Manter a identificacao atual na navegacao quando houver item correspondente
no shell final. Header, footer e restauracao de foco pertencem ao shell.

Oferecer `Preencher Carta` com destino `/formulario-carta`, sempre disponivel.
Para `Preciso de ajuda`, reutilizar a acao compartilhada para `/ajuda` quando
ja existir; caso contrario, prever link explicito sem criar suporte nesta
feature. Nao tratar uma rota placeholder como formulario ou ajuda concluidos.

O encaminhamento de diagnostico para esta pagina pertence a 005. A 006 aceita
acesso direto e nao verifica resultado, respostas ou conclusao do diagnostico.
Recarga e URL direta tambem exigem fallback para `index.html` no ambiente de
publicacao, responsabilidade transversal do deploy.

### Conteudo e estrutura de dados

Criar `src/content/pages/organizar-informacoes.ts` com titulo, introducao,
orientacao de confirmacao junto ao setor responsavel, lista ordenada, aviso
sobre publicacao manual e rotulos/destinos das acoes. Usar estrutura tipada
somente editorial, sem importar o estado ou schema da Carta na pagina.

Contrato proposto, a consolidar no plano detalhado:

```ts
type InformationTopicId =
  | "nome" | "descricao" | "publico-alvo" | "documentos" | "etapas"
  | "prazo" | "custos" | "canais" | "agendamento" | "adicionais";

type InformationTopic = {
  id: InformationTopicId;
  title: string;
  guidance: string;
  example?: string;
};

type OrganizeInformationContent = {
  title: string;
  introduction: readonly string[];
  confirmationGuidance: string;
  topicsTitle: string;
  topics: readonly InformationTopic[];
  publicationGuidance: string;
  exampleLabel: string;
  primaryAction: { label: string; href: "/formulario-carta" };
  helpAction: { label: string; href: "/ajuda" };
};
```

O array define a ordem unica de leitura. Os IDs servem para chaves e ancora
semantica, sem representar campos preenchidos. Exemplos sao opcionais e devem
receber rotulo explicito de exemplo ilustrativo. Paths do modelo de dados
ficam apenas na documentacao, sem aparecer na interface.

| Ordem e assunto | Cobertura tecnica de referencia |
| --- | --- |
| 1. Nome do servico | `identificacao.nome`; `identificacao.nomePopular` opcional no mesmo assunto |
| 2. Descricao do servico | `identificacao.descricao` |
| 3. Publico-alvo e criterios de acesso | `identificacao.publicoAlvo`, `requisitos.criterios` |
| 4. Documentos necessarios | `requisitos.documentos`, incluindo obrigatorios e opcionais |
| 5. Etapas do servico | `etapas`, do pedido a conclusao |
| 6. Prazo | `atendimento.prazo` e condicoes que o influenciam |
| 7. Custos | `atendimento.custo`, valores e condicoes quando aplicaveis |
| 8. Canais de atendimento | `atendimento.canais` e informacoes de acesso |
| 9. Agendamento | `atendimento.exigeAgendamento`, `tiposAgendamento`, `sistemaAgendamento`; `linkAgendamento`/`exibicaoAgendamento` somente para sistema externo; `orientacaoAgendamento` opcional, conforme 007 |
| 10. Informacoes adicionais | `informacoesComplementares` |

A copy deve distinguir informacao desconhecida de ausencia de exigencia ou
gratuidade. Nao derivar orientacoes de valores vazios ou do `false` inicial de
`exigeAgendamento`. Nao apresentar todos os assuntos como obrigatorios nem
afirmar equivalencia homologada com o Paraiba Digital. Conferir contratos de
007 e 008 existentes, sem alterar o modelo nesta feature.

### Composicao e componentes

Renderizar apenas o conteudo proprio da pagina: breadcrumb, introducao,
orientacao, dez assuntos e proxima acao. Usar um unico `h1`, secao da lista
identificada por `h2` e lista ordenada `ol`/`li`; titulos de assunto podem usar
`h3` sob essa secao. Todo texto essencial fica visivel sem expansao obrigatoria.

Reutilizar `PageHeader` se atender a composicao confirmada, `ButtonLink` ou o
link compartilhado da 002 e `Breadcrumb` se ja existir. Um componente local
`InformationTopicItem` pode concentrar a apresentacao repetida dos assuntos;
extrair para arquivo proprio apenas se trouxer clareza ou reuso real. Nao
introduzir props de selecionado, concluido, obrigatorio ou porcentagem.

### Estado e preservacao da Carta

A pagina nao precisa de estado de dominio, effects de inicializacao, chamadas
de API ou armazenamento. Nao importar `carta.storage`, carregar Carta,
limpar sessao ou inicializar formulario ao navegar. Nao criar checkboxes,
pontuacao, percentual ou comprovante de conclusao.

A navegacao compartilhada deve preservar o estado da Carta no escopo definido
por 007. Preferir o fluxo interno sem recarga para dados mantidos em memoria;
nao adicionar persistencia para compensar links inadequados. Se o formulario
ainda for placeholder, CA06 permanece pendente de verificacao integrada, e a
006 deve comprovar que nao le nem modifica dados existentes.

### Responsividade e acessibilidade

Preservar a ordem 1 a 10 no DOM e na apresentacao visual em qualquer largura.
Se o Figma indicar colunas, traduzir para Grid/Flexbox sem distribuir itens
por CSS columns ou reordenacao que altere a sequencia. Em telas estreitas,
usar uma coluna, textos com quebra natural e altura determinada pelo conteudo.

Reutilizar tokens e Inter com fallbacks existentes. Definir largura, espacos,
cores e estados somente depois da consulta visual. Garantir foco visivel,
contraste, links com nomes claros e acoes acessiveis por teclado; icones
decorativos, se houver, devem ficar ocultos para tecnologias assistivas.
Nao criar um segundo `main` dentro da pagina.

## Referencias visuais e pendencias

- Figma Design: `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`.
  O frame da 006 ainda precisa ser identificado via MCP.
- `575:483` corresponde a entrada de exploracao da feature 003; nao usar como
  layout da pagina de organizacao.
- Figma Make: `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`.

Em `/spec:plano-implementacao`, consultar ambos os arquivos via MCP, registrar
frame, composicao, componentes, assets, estados e adaptacao responsiva e
atualizar o mapa de telas. Adicionar `figmaNodeId` a rota somente depois da
identificacao. Nao prever assets ou cores especificos sem evidencia.

Se o frame trouxer checklist interativo, upload ou campos alem da spec,
registrar e resolver a divergencia documental antes de implementar. A copy
institucional tambem requer validacao da equipe responsavel; a referencia
visual nao equivale a aprovacao editorial.

## Arquivos provaveis

| Arquivo | Intervencao prevista |
| --- | --- |
| `src/pages/OrganizarInformacoesPage.tsx` | Substituir placeholder pela composicao sem estado |
| `src/content/pages/organizar-informacoes.ts` | Criar conteudo editorial tipado |
| `src/app/routes.tsx` | Manter contrato e adicionar frame confirmado, se necessario |
| `src/styles/globals.css` ou estilo de pagina adotado pelo projeto | Estilos restritos a pagina e responsividade |
| `src/styles/tokens.css` | Somente tokens confirmados que ainda nao existam |
| `src/components/ui/Breadcrumb.tsx` | Criar apenas se nao houver contrato compartilhado adequado |
| `src/components/ui/ButtonLink.tsx`, `src/app/App.tsx` e `src/components/layout/AppShell.tsx` | Integracao minima de navegacao/foco somente se nao resolvida pela 002 |
| `docs/design-system/mapa-figma-telas.md` | Registrar frame identificado no plano detalhado |

Assets locais e arquivos de teste so devem ser previstos em definitivo apos
inventario visual e verificacao da infraestrutura. Nao alterar schema,
validacao, storage, CSV, formulario, diagnostico ou backend como parte da 006.

## Estrategia de verificacao

Esta etapa altera apenas documentacao: revisar cobertura dos RF01–RF06,
CA01–CA12 e existencia dos arquivos citados. Build e testes de interface sao
verificacoes futuras da implementacao.

Se houver infraestrutura de testes na implementacao, reutiliza-la para testar
comportamentos: ordem e cobertura dos dez assuntos, acesso livre sem dados,
destinos das acoes, breadcrumb, ausencia de controles de progresso e
preservacao de uma Carta pela navegacao integrada. Nao instalar framework
somente para reproduzir o array editorial em um teste.

| Criterios | Verificacao de implementacao |
| --- | --- |
| CA01–CA02 | URL direta, recarga e entrada da etapa 2; conferir historico e fallback de publicacao |
| CA03–CA04 | Dez assuntos na ordem, criterios de acesso, agendamento e distincao entre desconhecido e inexistente |
| CA05–CA07 | Formulario acessivel sem marcar itens, ajuda em `/ajuda` e Carta preservada ao voltar |
| CA08 | Teclado e leitor de tela: titulos, lista, breadcrumb, destinos e foco apos navegacao |
| CA09 | Larguras de 1440, 1024, 768, 390 e 320 px e zoom de 200%, sem corte ou scroll horizontal |
| CA10–CA11 | Conteudo fora do JSX, ausencia de coleta/persistencia e comunicacao correta sobre orientacao e publicacao |
| CA12 | Comparacao com frame confirmado, registro das consultas e divergencias resolvidas |

Executar `npm run typecheck`, `npm run build` e suite existente quando houver
codigo implementado. Para CA06, preencher dados representativos em 007, visitar
a 006 e retornar, conferindo todos os valores; quando houver dados de sessao,
conferir tambem que a pagina nao alterou o registro armazenado. Enquanto 007
nao estiver pronta, registrar esse teste como pendente, sem declarar aceite.

## Riscos e mitigacoes

- **Frame desconhecido:** evitar definir layout por analogia; identificar e
  registrar o frame no plano detalhado antes de estilos.
- **Shell ainda inicial:** conferir entrega de 002 e reutilizar seus
  componentes; limitar qualquer ajuste compartilhado ao necessario.
- **Navegacao com recarga:** consolidar links internos e foco no shell para
  preservar a Carta em memoria; verificar CA06 com o formulario real.
- **Conteudo confundido com validacao:** manter lista consultiva, sem
  obrigatoriedade universal, aprovacao ou regras externas inventadas.
- **Modelo inicial incompleto:** tratar tabela como cobertura local;
  conciliar orientacao de agendamento e obrigatoriedade com 007 e 008.
- **Destinos ainda placeholders:** manter os destinos corretos e registrar
  verificacoes integradas pendentes, sem absorver o escopo de outras specs.
- **Lista longa em colunas:** preservar sequencia no DOM e no visual e testar
  texto ampliado, quebra de linhas e larguras pequenas.

## Proximo passo

Executar `/spec:tarefas 006-organizar-informacoes` para transformar a abordagem
em tarefas verificaveis. Depois, executar `/spec:plano-implementacao
006-organizar-informacoes`, resolver referencias visuais, copy e contratos
compartilhados e realizar `/spec:validar` antes de `/spec:implementar`.

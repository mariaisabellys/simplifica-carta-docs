# Plan: Fluxo de ajuda

> **Integracao atualizada em 16 de outubro de 2026:** a FAQ `169:495` encaminha
> para a escolha de canais `425:201`, compartilhada por 014 e 015.

## Objetivo e status

Substituir o placeholder de `/ajuda` por entrada de orientacao com FAQ,
escolha de atendimento agendado ou suporte por e-mail e retorno ao formulario.
Reutilizar shell/navegacao, preservar Carta e manter consulta independente
de preenchimento, backend ou leitura de dados da sessao.

Este plano prepara `/spec:tarefas`. Antes de codigo/estilos, criar tarefas e
implementation-plan, validar copy e destinos e consultar Figma via MCP.
Nao implementa agenda, coleta de solicitacoes ou envio de e-mail.

> Atualizacao editorial de 2026-10-07: a fonte oficial e
> `src/content/pages/ajuda.ts`, com quatro perguntas e uma secao de apoio para
> a 014. Propostas anteriores de sete assuntos, titulo `Preciso de ajuda` e dois
> cards de canal estao substituidas e nao devem orientar a implementacao.

## Fontes e limites

- Spec 013; specs 014/015/016 e contratos de 006–012.
- Plano de implementacao da 002, especialmente `/ajuda#duvidas-frequentes`.
- Documentos locais de produto, arquitetura, processo e referencias visuais
  consultados durante a criacao da spec.
- AjudaPage, paginas placeholder dos canais, rotas, AppShell, App, ButtonLink
  e estilos atuais.

Nao houve consulta direta ao Figma, leitura do PDF do ERS ou verificacao de
canal operacional. As propostas editoriais e visuais requerem conciliacao
antes de implementar. Nenhuma mensagem/solicitacao foi enviada nesta etapa.

## Estado atual

- Rota `/ajuda` existe, specId 013, layout support e node `169:495`.
- AjudaPage contem PageHeader e dois PlaceholderCards sem links de acao.
- FAQ ainda nao existe no codigo; 002 planeja destino compartilhado
  `/ajuda#duvidas-frequentes`, que esta feature precisa efetivar.
- Rotas `/ajuda/atendimento-agendado` e `/ajuda/suporte-email` sao placeholders.
- Shell possui navegacao e aria-current por caminho; contratos de hash/foco
  planejados na 002 ainda devem ser conferidos na implementacao real.
- Nao ha componente Breadcrumb/FAQ pronto nem framework de testes configurado.
- Specs 014–016 agora existem; nota de ausencia na spec 013 e historica e nao
  comprova implementacao dos canais.

## Abordagem tecnica

### 1. Integracao com rota e shell

Manter rota existente sem router paralelo. Reutilizar links internos da 002
com href real, suporte a modificadores/nova aba, historico e foco. Nao usar
link com reload como caminho principal quando Carta existir apenas em memoria.

Breadcrumb: Inicio > Preciso de ajuda, com pagina atual identificada.
Pagina renderiza conteudo proprio, sem main, header ou footer duplicados.
Titulo visivel com acentuacao e titulo de documento administrado pelo shell.

Implementar destino `id="duvidas-frequentes"` na secao de FAQ, com foco
programatico quando o contrato da 002 exigir, scroll-margin para header sticky
e hash funcionando por link, acesso direto, recarga e voltar/avancar. Nao criar
handler global concorrente para hash se ja existir no shell.

### 2. Conteudo tipado versionado

Criar `src/content/pages/ajuda.ts` com titulo, introducao, escopo orientativo,
FAQ, canais, retorno ao formulario e mensagens de indisponibilidade editorial.
Proposta de contrato:

```ts
type HelpHref =
  | "/organizar-informacoes" | "/explorar-por-etapas"
  | "/formulario-carta" | "/previa" | "/tutorial-paraiba-digital"
  | "/ajuda/atendimento-agendado" | "/ajuda/suporte-email";

type FaqItem = {
  id: string;
  question: string;
  paragraphs: readonly string[];
  links?: readonly { label: string; href: HelpHref }[];
};

type HelpChannel = {
  id: "atendimento-agendado" | "suporte-email";
  title: string;
  description: string;
  actionLabel: string;
  href: "/ajuda/atendimento-agendado" | "/ajuda/suporte-email";
};
```

Consolidar associacao fechada entre ID e destino (uniao discriminada ou mapa
tipado), evitando trocar href por indice. Conteudo e texto/links estruturados,
sem HTML concatenado ou Markdown interpretado para respostas.

FAQ com IDs estaveis e sete assuntos da spec; numero exato de perguntas pode
variar editorialmente, mantendo cobertura. Respostas propostas:

| Assunto | Mensagem a consolidar |
| --- | --- |
| Funcao do manual | Orienta preparacao; cadastro/publicacao continuam manuais |
| Acesso por etapas | Permite consulta independente e link para exploracao |
| O que reunir | Lista na 006 e confirmacao com setor responsavel |
| Continuidade | Sessao temporaria conforme 007; sem promessa de rascunho permanente |
| Validacao | Ausencia obrigatoria distinta de sugestao; nenhuma aprovacao automatica |
| Previa/CSV/copia | Revisao, arquivo local e transferencia individual, sem importacao externa prometida |
| Escolha de suporte | E-mail para orientacao escrita e atendimento conforme disponibilidade real |

Submeter redacao a equipe. Nao afirmar funcionalidade entregue de rotas
placeholder, prazo de resposta ou recuperacao entre sessoes. Manter fonte
editorial coerente com decisoes finais de 007–015.

### 3. FAQ e composicao

Propor introducao, FAQ e regiao de dois canais, com acao de retorno ao
formulario sempre disponivel. Confirmar ordem/layout no Figma; canais nao
dependem de ler respostas ou abrir todos os itens.

Preferir `details`/`summary` nativos para FAQ expansiva se a referencia visual
permitir. Alternativa de accordion controlado exige button com aria-expanded,
associacao ao painel e estado local por ID. Definir uma das estrategias no
implementation-plan, sem manter implementacoes duplicadas.

Nao impor exclusividade de um painel aberto salvo necessidade confirmada;
permitir comparar respostas e preservar foco. Conteudo fechado nao recebe
foco ativo; links abertos permanecem acessiveis. Todos os assuntos consultaveis
sem login, submissao, hover ou registro de progresso.

Componentes provaveis: `FaqSection`/`FaqItem` e `HelpChannelCard`, extraidos
se concentrar repeticao e contrato. Regioes estaticas de uso unico podem ficar
na pagina. IDs da FAQ servem para keys, nao titulos sujeitos a revisao.

### 4. Canais e estados de disponibilidade

Atendimento: link para `/ajuda/atendimento-agendado`, explicando que o destino
permite consultar horarios e solicitar; escolher canal nao reserva nem envia.
E-mail: link para `/ajuda/suporte-email`, sem mailto automatico na entrada;
contato e copia do endereco ficam no fluxo da 015.

Manter descricoes honestas e sem horarios/prazos inventados. A 013 nao consulta
agenda, verifica SMTP ou chama API de saude para renderizar ajuda. Falha no
backend de 014 nao remove FAQ nem acesso ao e-mail.

Para indisponibilidade confirmada, proposta de configuracao editorial unica
por canal em canais.ts: pendente/ativo/pausado, com aviso nos estados nao
ativos e alternativa somente quando outro canal ativo estiver entregue.
Pendente significa sem confirmacao editorial, nao falha operacional; ativo
equivale a publicado. Com ambos nao ativos, manter consulta e retorno sem
inventar alternativa. Nao usar label "disponivel agora" sem
evidencia de estado em tempo real; configuracao ativa apenas indica que o
fluxo foi publicado, nao existencia de vaga/resposta imediata.

Se canal estiver pausado, manter descricao com aviso e link a alternativa
operacional quando confirmada; manter acesso ao proprio destino para explicacao,
conforme plano detalhado. O comportamento da pagina 014 em pendente/pausado,
incluindo tentativa em andamento, ainda exige decisao de seu contrato; o aviso
na entrada nao desativa API nem cancela solicitacoes. Nao substituir destino
por href `#` ou botao inerte.
Uma rota placeholder nao recebe status operacional por existir na tabela.

Antes de declarar aceite dos canais, testar destinos reais de 014/015. A
entrada pode ser planejada/implementada separadamente, com integracao pendente
registrada; nao absorber agenda/backend para tornar card funcional.

### 5. Continuidade e privacidade

AjudaPage nao importa hooks/storage da Carta ou diagnostico, nao recebe seus
valores como props e nao gera URLs/mensagens predefinidas com dados da sessao.
A preservacao decorre do provider e navegacao da 007/002 acima das rotas.

Usar acao fixa `Ir para o formulário da Carta` para `/formulario-carta`,
comportando inicio/retomada sem ler Carta para decidir label. Voltar/avancar
continuam normais; acesso direto tem destinos explicitos sem history.back
como unico retorno.

Nenhum formulario de duvida, anexos, envio, leitura de clipboard, coleta ou
persistencia de estado FAQ. Expandir resposta e navegar nao cria solicitacao.
Nao duplicar endereco institucional na 013; se visual exigir contato, importar
fonte compartilhada validada da 015 sem dependencia da UI de suporte.

## Arquivos provaveis

| Arquivo | Intervencao |
| --- | --- |
| `src/pages/AjudaPage.tsx` | Substituir placeholders por introducao, FAQ, canais e retorno |
| `src/content/pages/ajuda.ts` | Criar conteudo e destinos tipados |
| `src/components/ajuda/FaqSection.tsx` | FAQ e ancora, se extracao justificada |
| `src/components/ajuda/HelpChannelCard.tsx` | Apresentacao repetida de canal |
| Estilos de ajuda/globais e tokens existentes | Layout, foco, expansao e responsividade |
| `src/app/routes.tsx` | Manter rota/node e adaptar somente referencia confirmada |
| `docs/design-system/mapa-figma-telas.md` | Confirmar associacao FAQ/ajuda no plano detalhado |

Breadcrumb, links e navegacao/hash/foco podem exigir ajustes minimos se 002
ainda nao os entregar. Conferir codigo real antes de criar componentes
compartilhados. Nao alterar tipos de solicitacao, backend de 014, mailto de
015 ou estado/storage da Carta como parte da pagina de entrada.

## Visual, responsividade e acessibilidade

Consultar via MCP Figma Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`,
node `169:495`. Verificar se ele cobre FAQ, dois canais e acoes de retorno ou
se ha frame adicional. Consultar Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node
`0:1`. Registrar layout, estados de paineis/canais, assets e adaptacao
responsiva no implementation-plan; nao tratar referencia local como consulta.

Usar um h1 e h2 por regiao, nav/breadcrumb com nomes claros, labels de links
especificos e icones decorativos ocultos. Textos extensos crescem naturalmente;
cards em colunas viram uma coluna antes de comprimir leitura/acoes.

Garantir foco visivel, teclado nos paineis, contraste e hash nao encoberto
pelo header. Seguir 016 em zoom/reflow, toque, fonte fallback e ordem do DOM,
sem esperar sua implementacao para corrigir barreiras. Nao usar busca/chat
ou formulario para preencher espaco adicional do prototipo.

## Estrategia de verificacao

Esta etapa e documental: conferir RF01–RF05/CA01–CA14, fontes e contrato de
ancora da 002. Nenhum teste de interface ou build foi executado.

Reutilizar infraestrutura de testes do projeto quando existir. Para pagina
orientativa, nao instalar framework apenas para contar perguntas; usar suite
compartilhada quando disponivel e verificacoes manuais de comportamento.

Testes significativos se houver infraestrutura:

- Destinos dos dois canais e retorno ao formulario sem handlers de envio.
- FAQ expansiva por teclado/estado e links em resposta visivel.
- Destino `duvidas-frequentes` real com hash e foco pelo shell.
- Configuracao de indisponibilidade nao remove FAQ ou alternativa correta.
- Integracao com Carta preenchida: navegar ajuda/canal/voltar preserva valores,
  sem leitura/envio ou storage proprio na pagina de ajuda.

| Criterios | Evidencia futura |
| --- | --- |
| CA01/CA06 | URL direta, recarga, breadcrumb, hash e retorno explicito |
| CA02/CA12 | Checklist editorial da cobertura e limites das respostas |
| CA03–CA04/CA13 | Destinos corretos e verificacao integrada de 014/015 reais |
| CA05/CA07 | Preservacao da Carta e ausencia de coleta/transmissao |
| CA08–CA10 | FAQ, teclado/leitor de tela, foco e textos longos |
| CA11 | Indisponibilidade confirmada e alternativa sem promessa ficticia |
| CA14 | Arquitetura, conteudo e consultas Figma |

Apos implementar, executar typecheck/build e suite disponivel. Validar Chrome,
Edge, Firefox e Safari conforme 016, larguras 1440/1024/768/390/320 px,
zoom/reflow, foco de ancora e navegacao pela header/footer. Conferir copy
institucional e estado publicado dos canais separadamente dos testes de links.
Nao enviar e-mails ou criar solicitacoes reais para verificar a pagina de entrada.

## Riscos e mitigacoes

- Ancora prevista sem destino: manter `duvidas-frequentes` e testar acesso direto/hash.
- FAQ vira requisito para canal: ambos links independentes, sem progresso/gate.
- Card promete canal inexistente: validar entrega de 014/015 e registrar pendencias.
- Indisponibilidade confundida com agenda vazia: aviso confirmado sem consulta
  de agenda na entrada e alternativa verdadeira.
- Carta perdida por reload: usar navegacao interna e provider da 007.
- Contato divergente: fonte unica da 015, sem endereco duplicado.
- Escopo visual incompleto: conferir frame e contratos antes de estilos.

## Proximo passo

Executar `/spec:tarefas 013-fluxo-de-ajuda`. Depois, consolidar FAQ/copy,
referencias visuais, ancora e estado dos canais em `/spec:plano-implementacao`,
seguido de `/spec:validar` antes de implementar.

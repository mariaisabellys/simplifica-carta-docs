# Quickstart: Explorar por Etapas

## Objetivo

Verificar a pagina `/explorar-por-etapas` depois da implementacao da spec 003.

## Pre-requisitos

- feature `002-home-e-navegacao` implementada, com shell e navegacao
  compartilhados;
- dependencias instaladas com `npm install`;
- assets do node Figma `575:483` exportados e salvos localmente;
- spec 003 validada sem bloqueios.

## Verificacoes automatizadas

Executar:

```bash
npm run test
npm run typecheck
npm run build
```

Os comandos devem terminar sem erros.

## Executar localmente

```bash
npm run dev
```

Abrir o endereco informado pelo Vite e acessar diretamente:

```txt
http://localhost:5173/explorar-por-etapas
```

Recarregar a pagina para confirmar que a rota direta continua funcionando.

## Estrutura esperada

Confirmar, nesta ordem:

1. header compartilhada da feature 002;
2. breadcrumb `Inicio > Explorar por etapas`;
3. hero com titulo `Explorar por etapas` e texto introdutor;
4. quatro cards na ordem das etapas;
5. CTA para o fluxo completo;
6. footer compartilhado da feature 002.

Deve existir exatamente um `h1`.

O subtitulo deve ser exatamente: `Acesse qualquer parte do manual diretamente,
sem precisar seguir o fluxo completo. Escolha a etapa que você precisa para
agilizar a criação da sua Carta de Serviço.`

## Cards e destinos

Confirmar exatamente quatro cards:

| Etapa | Titulo | Acao | Destino |
| --- | --- | --- | --- |
| 1 | Identificar um servico | Iniciar diagnostico | `/diagnostico` |
| 2 | Organizar informacoes | Ver lista de informacoes | `/organizar-informacoes` |
| 3 | Elaborar a Carta | Elaborar e conferir | `/formulario-carta` |
| 4 | Tutorial de publicacao | Ver tutorial | `/tutorial-paraiba-digital` |

O CTA `Ir para o guia passo a passo` deve apontar para `/diagnostico`.

As descricoes e os rotulos renderizados devem corresponder exatamente a
`src/content/pages/explorar-por-etapas.ts`. O card da etapa 4 deve continuar
coerente com a regra de que a pagina apenas orienta o cadastro na plataforma
oficial; ela nao publica o servico automaticamente.

## Assets

Conferir que os arquivos locais correspondem aos nodes corretos:

- `help-circle.svg` — `575:603`;
- `check-square.svg` — `575:600`;
- `file-text.svg` — `575:609`;
- `book-open.svg` — `575:615`;
- `chevron-breadcrumb.svg` — `575:594`, 10 × 10 px;
- `chevron-action.svg` — `575:597` e equivalentes, 16 × 16 px.

Os dois chevrons sao assets diferentes e nao devem ser substituidos por um
unico arquivo. Nenhum asset pode usar URL temporaria do Figma.

## Tipografia

Inter e a fonte principal da pagina e do projeto:

- titulo principal: Inter, peso 900;
- titulos dos cards: Inter, peso 800;
- corpo, breadcrumb, badges e botoes: Inter;
- fallback: `system-ui, sans-serif`.

Outfit, Rawline e Source Sans 3 nao devem ser priorizadas no CSS.

## Acesso independente e efeitos colaterais

- abrir qualquer etapa sem concluir as anteriores;
- confirmar que nenhum card aparece concluido, atual ou bloqueado;
- confirmar ausencia de stepper ou indicador de progresso;
- entrar na pagina, navegar e voltar sem alterar ou limpar dados da Carta;
- confirmar ausencia de chamadas a backend;
- confirmar que a pagina nao acessa `localStorage` ou `sessionStorage`.

## Acessibilidade

- percorrer breadcrumb, quatro cards e CTA somente com teclado;
- confirmar foco visivel em todos os links;
- confirmar `aria-current="page"` no item atual do breadcrumb;
- confirmar ordem de leitura das etapas 1 a 4;
- confirmar que icones e chevrons decorativos sao ignorados por leitores de
  tela;
- confirmar que numero, titulo e acao comunicam a etapa sem depender da cor;
- verificar contraste WCAG 2.1 AA;
- testar zoom de 200% e reflow.

## Responsividade

Validar:

- 1440 px: grade com duas colunas;
- 1024 px: uma ou duas colunas sem compressao de conteudo;
- 768 px: transicao coerente para uma coluna quando necessario;
- 390 px e 320 px: cards em uma coluna e acoes com area de toque adequada.

Nao pode haver corte, sobreposicao ou scroll horizontal.

## Comparacao visual

Comparar a versao desktop com:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
nodeId: 575:483
```

Confirmar gradiente, espacamentos, cores das quatro etapas, cards, badges,
icones, botoes e CTA final. Header e footer seguem a feature 002 e devem omitir
as entradas fora do MVP.

## Resultado esperado

A verificacao esta aprovada quando a pagina corresponde ao frame, os seis
assets estao corretos, os cinco links possuem os destinos previstos, a ordem
das etapas permanece estavel e os testes tecnicos, responsivos e acessiveis
terminam sem bloqueios.

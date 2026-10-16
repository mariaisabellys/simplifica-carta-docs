# Mapa Figma das Telas

Este documento conecta rotas, specs e frames atuais do Figma Design do
prototipo. Ele deve ser atualizado sempre que uma nova tela for especificada ou
quando o frame oficial mudar.

## Arquivo oficial

- Link: [Manual de levantamento dos servicos - Figma Design](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=310-175&m=dev)
- `fileKey`: `YaVUdqYa3boHpvGrxf4ZJ5`
- Pagina raiz atual: `167:2` (`Prototipo`)
- Node inicial recomendado para home: `310:175` (`home`)

## Mapa atual

| Rota | Tela ou secao no Figma | Node ID | Spec relacionada | Observacao |
| --- | --- | --- | --- | --- |
| `/` | home | `310:175` | `002-home-e-navegacao` | Frame oficial atual da home, com hero, processo, CTA sobre Carta de Servicos e footer. |
| `/explorar-por-etapas` | explorar-por-etapas-v2 | `575:483` | `003-explorar-por-etapas` | Pagina para acesso independente as quatro etapas do cadastro, sem exigir o fluxo completo. |
| `/o-que-e-carta-de-servicos` | O que e a Carta? | `365:265` | `004-o-que-e-carta-servico` | Pagina educativa com contexto, fundamentos, campos da Carta e legislacao aplicavel. |
| `/diagnostico` | diagnostico | `387:1020` | `005-diagnostico-servico-publico` | Frame atual para a experiencia de diagnostico. Usar somente na spec propria. |
| `/diagnostico/resultado` | resposta | `387:1362` | `005-diagnostico-servico-publico` | Frame oficial da pagina de resposta. O estado exibido no frame e uma amostra visual; textos e acoes devem seguir o conteudo versionado e o resultado calculado. |
| `/organizar-informacoes` | organizar informaçoes | `387:1918` | `006-organizar-informacoes` | Referencia visual da etapa 2. O contrato editorial oficial atual possui tres topicos e 13 informacoes; divergencias com o frame devem ser documentadas. |
| `/ajuda` | FAQ | `169:495` | `013-fluxo-de-ajuda` | Frame atual para duvidas frequentes e CTA de apoio. Nao faz parte da home atual. |
| `/formulario-carta` | Formulario — parte 1 | `653:1540` | `007-formulario-carta-servico` | Pagina inicial da jornada de cinco partes; node principal da rota. |
| `/previa` | card-servico-completo | `821:308` | `009-previa-html` | Referencia visual para previa/cartao completo do servico, tambem reutilizado dentro da 007. |
| `/tutorial-paraiba-digital` | Tutorial — Etapa 1: Acesse a plataforma | `564:635` | `011-tutorial-paraiba-digital` | Pagina principal do tutorial. As etapas 2–6 sao variantes de estado da mesma pagina, detalhadas abaixo. Conteudo e regras vêm do arquivo versionado da feature. |
| `/ajuda/atendimento-agendado` | Atendimento — escolha de data | `425:201` | `014-atendimento-agendado` | Pagina inicial da jornada; os outros tres frames sao variantes/etapas da mesma rota. |

## Paginas, partes e componentes do formulario da Carta

A feature 007 possui cinco telas/partes na mesma rota. A ordem abaixo acompanha
o contrato de `charterFormPageContent.parts`; nomes visuais e detalhes finais
devem ser confirmados na consulta MCP, sem sobrescrever o conteudo versionado:

| Classificacao | Parte do conteudo | Node ID | Link |
| --- | --- | --- | --- |
| Pagina — estado inicial | 1. Sobre o servico | `653:1540` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=653-1540&m=dev) |
| Variante/parte | 2. Publico e requisitos | `2024:269` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=2024-269&m=dev) |
| Variante/parte | 3. Como o servico funciona | `641:58` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=641-58&m=dev) |
| Variante/parte | 4. Atendimento | `647:650` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=647-650&m=dev) |
| Variante/parte | 5. Informacoes finais | `660:2533` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=660-2533&m=dev) |

Componentes compartilhados da 007:

| Componente/variante | Node ID | Contrato |
| --- | --- | --- |
| Form-Card sem orientacao expandida | `811:306` | Estado compacto do campo. |
| Form-Card com orientacao expandida | `811:382` | Mesmo campo com painel de orientacao visivel. |
| Previa da Carta | `821:308` | Mesmo componente visual e semantico da feature 009; a 007 nao cria uma segunda previa. |

O node `2024:269` apresenta o formulario como imagem de referencia. Na
implementacao, essa imagem nunca e usada como formulario: cada campo, grupo,
lista e acao deve virar controle HTML/React real, editavel, rotulado e acessivel,
preservando hierarquia, distribuicao e aparencia do frame.

O layout de cada tela se adapta ao conteudo de
`src/content/pages/formulario-carta.ts`; o Figma governa composicao e estilo,
mas nao autoriza truncar, substituir ou duplicar copy. As orientacoes dos cards
derivam de `src/content/pages/organizar-informacoes.ts` por ID correspondente.

## Pagina e variantes do tutorial Paraiba Digital

Os seis frames representam uma unica pagina logica e uma unica rota. A troca de
etapa altera o estado apresentado, sem criar seis rotas ou seis features.

| Classificacao | Etapa e conteudo correspondente | Node ID | Link |
| --- | --- | --- | --- |
| Pagina — estado inicial | Etapa 1: Acesse a plataforma | `564:635` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-635&m=dev) |
| Variante da pagina | Etapa 2: Faca login | `564:730` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-730&m=dev) |
| Variante da pagina | Etapa 3: Localize o cadastro | `564:852` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-852&m=dev) |
| Variante da pagina — integra 012 | Etapa 4: Cadastre as informacoes de sua Carta | `564:980` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-980&m=dev) |
| Variante da pagina | Etapa 5: Revise os dados | `564:1232` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-1232&m=dev) |
| Variante da pagina | Etapa 6: Publique o servico | `564:1357` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=564-1357&m=dev) |

Os frames definem composicao, hierarquia e variacoes visuais. Titulos, textos,
percentuais, instrucoes, campos de copia e acoes devem ser renderizados a partir
de `src/content/tutorial/paraiba-digital.ts`. Divergencias editoriais do Figma
nao substituem o conteudo versionado e devem ser registradas no planejamento.

O node `564:980` tambem e a referencia visual da feature
`012-copia-dados-tutorial`. A 012 nao cria pagina nem rota: fornece a projecao,
os controles e o mecanismo de copia montados exclusivamente na etapa 4 da 011.

## Pagina e estados do atendimento agendado

Os quatro frames pertencem a `/ajuda/atendimento-agendado` e seguem o conteudo
de `src/content/ajuda/atendimento-agendado.ts`:

| Classificacao | Estado/etapa | Node ID | Link |
| --- | --- | --- | --- |
| Pagina — estado inicial | Escolha uma data | `425:201` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=425-201&m=dev) |
| Variante da pagina | Escolha um horario | `425:296` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=425-296&m=dev) |
| Variante da pagina | Dados do agendamento e revisao antes do envio | `446:206` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=446-206&m=dev) |
| Variante da pagina | Solicitacao registrada | `470:444` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=470-444&m=dev) |

Figma orienta composicao e hierarquia. O conteudo versionado prevalece,
especialmente as correcoes editoriais que distinguem solicitacao registrada de
atendimento confirmado e removem promessas de e-mail ou remarcacao. Datas,
meses, horarios e dados pessoais dos frames sao exemplos, nunca disponibilidade
real ou valores iniciais. O layout deve adaptar-se aos estados reais da API,
copy longa, erros e acessibilidade.

## Componentes identificados

| Componente | Node ID | Uso esperado |
| --- | --- | --- |
| `Label-Row` | `651:317` | Label de campo com indicador de obrigatoriedade e badge `Necessario`; permanece como componente de apoio para formularios. |
| Navbar da home | Dentro de `310:175` | Navegacao atual da home. Nao usar mais o node antigo `594:528` como referencia da home. |

## Ajustes de MVP sobre o prototipo

- A header da home no Figma pode exibir o link `Material de apoio`, mas ele
  nao deve ser implementado neste momento porque a area completa de materiais
  de apoio esta fora do MVP.

## Frames antigos a evitar

Os frames abaixo foram substituidos pelos ajustes recentes no prototipo e nao
devem ser usados como referencia principal nas proximas specs:

- `0:1` como pagina raiz do arquivo;
- `3:2` como home;
- `594:528` como navbar principal da home;
- `3:104`, `3:176`, `98:52` e `263:4` como referencias atuais de telas.

## Regra de uso

Antes de implementar uma tela, consultar o node correspondente com
`get_design_context`. A resposta deve ser adaptada para a stack do projeto
React + TypeScript + CSS modular/global, sem copiar Tailwind diretamente e sem
instalar Tailwind apenas por causa do output do Figma.

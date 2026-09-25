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
| `/ajuda` ou FAQ | FAQ | `169:495` | `013-fluxo-de-ajuda` ou spec futura de FAQ | Frame atual para duvidas frequentes e CTA de apoio. Nao faz parte da home atual. |
| `/formulario-carta` | Form-Card | `811:306` | `007-formulario-carta-servico` | Card de formulario com campos, orientacao e sugestao. Usar na spec propria. |
| `/formulario-carta` | Form-Card com orientacao aberta | `811:382` | `007-formulario-carta-servico` | Variante com painel de orientacao aberto. |
| `/previa` | card-servico-completo | `821:308` | `009-previa-html` | Referencia visual para previa/cartao completo do servico. |

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

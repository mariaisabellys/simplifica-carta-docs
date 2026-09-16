# Mapa Figma das Telas

Este documento conecta rotas, specs e frames do Figma Design do prototipo.
Ele deve ser atualizado sempre que uma nova tela for especificada ou quando o
frame oficial mudar.

## Arquivo oficial

- Link: [Manual de levantamento dos servicos - Figma Design](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=651-317&m=dev)
- `fileKey`: `YaVUdqYa3boHpvGrxf4ZJ5`
- Pagina raiz: `0:1` (`Esboco do Prototipo`)
- Node recebido como referencia inicial: `651:317` (`Label-Row`)

## Mapa inicial

| Rota | Tela ou secao no Figma | Node ID | Spec relacionada | Observacao |
| --- | --- | --- | --- | --- |
| `/` | Manual de levantamento dos servicos | `3:2` | `002-home-e-navegacao` | Frame principal com hero, cards, etapas, diagnostico, FAQ e CTA de ajuda. |
| `/organizar-informacoes` | Section - organizando_informacoes (aberto) | `98:52` | `006-organizar-informacoes` | Versao expandida dos cards de organizacao das informacoes. |
| `/diagnostico` | Section - Diagnostico do servico | `3:104` | `005-diagnostico-servico-publico` | Secao CTA para iniciar diagnostico. |
| `/ajuda` | footer cta | `3:176` | `013-fluxo-de-ajuda` | CTA visual para pedido de ajuda. |
| `/material-de-apoio` | Material de apoio | `263:4` | Evolucao futura | Area completa de materiais esta fora do MVP, mas existe no prototipo. |

## Componentes identificados

| Componente | Node ID | Uso esperado na fundacao |
| --- | --- | --- |
| `Label-Row` | `651:317` | Label de campo com indicador de obrigatoriedade e badge `Necessario`. |
| `MainNavbar` | `594:528` | Referencia para navegacao desktop em specs de home/navegacao. |

## Regra de uso

Antes de implementar uma tela, consultar o node correspondente com
`get_design_context`. A resposta deve ser adaptada para a stack do projeto
React + TypeScript + CSS modular/global, sem copiar Tailwind diretamente e sem
instalar Tailwind apenas por causa do output do Figma.

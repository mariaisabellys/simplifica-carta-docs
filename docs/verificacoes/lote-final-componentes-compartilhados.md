# Verificação do lote final — componentes e assets compartilhados

Data: 04/11/2026  
Arquivo Figma: `YaVUdqYa3boHpvGrxf4ZJ5`

## Escopo concluído

Foi consolidado o contrato transversal em
`docs/design-system/componentes-compartilhados/`, sem criar telas artificiais
ou duplicar assets. A referência do shell reutiliza a captura integral da home
(node `310:175`, 1440×1627, SHA-256
`1ee05499a0a8fcd9b97ea8f4f94acfcc84c0b0a32e6e2cfc24482366166af656`) e o
`Label-Row` usa o node `651:317` como proveniência estrutural.

## Componentes documentados

`AppShell`, `Header`, `Footer`, `Breadcrumb`, `PageHeader`, `Button`,
`ButtonLink`, `Card`, `LabelRow`, `Stepper` e `Alert/feedback`, incluindo
foco, teclado, estados, reflow e regra de conteúdo por props.

## Assets

O lote confirma reuso de `src/assets/brand/semt-d-branco.png`,
`src/assets/home/arrow-right.svg` e dos três assets de ajuda. Não foram criadas
duplicatas nem mantidas URLs temporárias do Figma.

## Limites

O contrato é documental. Não foram executados implementação, build, testes de
contraste, navegador, teclado ou leitor de tela.

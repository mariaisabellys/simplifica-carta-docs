# Tokens e Componentes

## Fonte oficial

Os tokens e componentes deste documento devem ser tratados como resumo de implementacao. A referencia oficial para design system e:

- [Organize Design System - Figma Make](https://www.figma.com/make/dVm7lEZdBFqOiiySWLWUqp/Organize-Design-System--Copy-?t=rgWuly5cbaPi1E9B-20&fullscreen=1)

A referencia oficial para layout, fluxo e composicao das telas esta documentada em:

- [Referencia Figma do prototipo](referencia-figma-prototipo.md)

Este repositorio nao possui uma pasta com o codigo do design system exportado do Figma Make. Durante a implementacao, os tokens necessarios devem ser criados dentro da aplicacao, por exemplo em `src/styles/tokens.css`, `tailwind.config.*` ou arquivo equivalente definido na fundacao tecnica.

Em caso de divergencia entre este resumo e o Figma Make, usar o Figma Make como fonte principal para tokens e componentes. Em caso de divergencia sobre layout de tela, usar o Figma Design do prototipo como fonte principal.

## Regra para implementacao

Antes de transformar estes tokens e componentes em codigo, consultar o Figma Make via MCP com:

```txt
fileKey: dVm7lEZdBFqOiiySWLWUqp
nodeId: 0:1
skill: figma-design-to-code
```

Usar este documento apenas como mapa resumido. Os valores finais de cor, tipografia, espacamento e estados devem ser confirmados no Figma Make no momento da implementacao. Layout e composicao de paginas devem ser confirmados no Figma Design do prototipo.

## Cores primitivas

- Brand / Navy: `#0B2A4A`
- Brand / Teal: `#1B9E95`
- Brand / Orange: `#F47920`
- Neutral / White: `#FFFFFF`
- Neutral / 50: `#F8F9FA`
- Neutral / 100: `#EDF1F5`
- Neutral / 200: `#E2E8EE`
- Neutral / 300: `#CBD2D9`
- Neutral / 500: `#6B7280`
- Neutral / 700: `#374151`
- Neutral / 900: `#1A202C`

## Cores semanticas

- Text / Primary
- Text / Secondary
- Text / Inverse
- Background / Default
- Background / Secondary
- Background / Brand
- Background / Highlight
- Border / Default
- Border / Strong
- Action / Primary
- Action / Secondary
- Action / Disabled
- Accent / Default
- Feedback / Success
- Feedback / Warning
- Feedback / Error
- Feedback / Information

## Tipografia

### Familia principal do projeto

Inter e a familia tipografica principal do Simplifica Carta para titulos,
corpo, navegacao, rotulos e controles. Os tokens CSS devem usar:

```css
--font-display: "Inter", system-ui, sans-serif;
--font-body: "Inter", system-ui, sans-serif;
```

Outfit, Rawline e Source Sans 3 observadas em frames do Figma permanecem como
referencias historicas do prototipo, mas nao devem ser priorizadas no codigo.
Essa e uma divergencia intencional para manter unidade tipografica no produto.

- Display / LG
- Display / MD
- Heading / H1
- Heading / H2
- Heading / H3
- Heading / H4
- Body / LG
- Body / MD
- Body / SM
- Label / MD
- Label / SM
- Caption
- Navigation / SM

## Espacamento

Escala baseada em multiplos de 4px:

- Space / 1: 4px
- Space / 2: 8px
- Space / 3: 12px
- Space / 4: 16px
- Space / 5: 20px
- Space / 6: 24px
- Space / 8: 32px
- Space / 10: 40px
- Space / 12: 48px
- Space / 16: 64px
- Space / 20: 80px

## Componentes esperados

Os componentes abaixo devem seguir aparencia, estados e espacamentos do Figma Make:

- Button
- Link
- Nav Item
- Icon Button
- Process Step
- Info Banner
- Input
- Textarea
- Select
- Checkbox
- Radio Button
- Alert
- Card
- Header
- Footer
- Breadcrumb
- Stepper

## Padroes de tela

- Hero
- Section Header
- Process Section
- CTA Section
- Form Section
- FAQ
- Help Section

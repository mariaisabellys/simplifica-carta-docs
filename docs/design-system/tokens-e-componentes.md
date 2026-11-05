# Tokens e Componentes

## Fonte oficial versionada

Este documento e os pacotes em
[`referencias-locais/`](referencias-locais/README.md) são a fonte de
implementação disponível no repositório. Eles permitem trabalhar sem conta,
MCP ou acesso ao arquivo privado do Figma.

O arquivo de origem do design system permanece registrado apenas como
proveniência:

- [Organize Design System - Figma Make](https://www.figma.com/make/dVm7lEZdBFqOiiySWLWUqp/Organize-Design-System--Copy-?t=rgWuly5cbaPi1E9B-20&fullscreen=1)

A referencia oficial para layout, fluxo e composicao das telas esta documentada em:

- [Referencia Figma do prototipo](referencia-figma-prototipo.md)

Os tokens necessários devem ser criados em `src/styles/tokens.css` e
reconciliados com os valores versionados abaixo e com o `visual-spec.md` da
feature. O projeto usa CSS global/modular; não instalar Tailwind para reproduzir
o código de referência do Figma.

Em caso de divergência com o arquivo remoto, o estado versionado do repositório
prevalece até que a equipe revise e versione uma atualização. Para texto e
comportamento, `src/content/` e os contratos da feature sempre prevalecem.

## Rastreabilidade opcional

Quem possuir acesso pode auditar a origem pelo MCP com:

```txt
fileKey: dVm7lEZdBFqOiiySWLWUqp
nodeId: 0:1
skill: figma-design-to-code
```

Essa consulta não é pré-requisito para implementar uma feature que possua
captura, manifesto e especificação visual local. Alterações observadas no remoto
só entram no produto depois de serem incorporadas aos arquivos versionados.

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

O contrato consolidado e a proveniência estão em
[`componentes-compartilhados/README.md`](componentes-compartilhados/README.md)
e [`manifest.json`](componentes-compartilhados/manifest.json). Features devem
reutilizar esses contratos antes de criar variantes locais.

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

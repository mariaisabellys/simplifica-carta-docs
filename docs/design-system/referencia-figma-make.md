# Referencia Figma Make

## Papel desta referencia

O Figma Make sera usado como referencia visual e tecnica para o design system do Simplifica Carta.

Referencia oficial do design system:

- [Organize Design System - Figma Make](https://www.figma.com/make/dVm7lEZdBFqOiiySWLWUqp/Organize-Design-System--Copy-?t=rgWuly5cbaPi1E9B-20&fullscreen=1)

Este repositorio nao armazena o codigo gerado pelo Figma Make. A fonte visual oficial do design system e o link acima.

O layout e a composicao das telas devem ser guiados pelo arquivo Figma do
prototipo documentado em
[`docs/design-system/referencia-figma-prototipo.md`](referencia-figma-prototipo.md).
O Figma Make nao substitui o prototipo de telas: ele define tokens,
componentes e padroes visuais reutilizaveis.

O link acima foi verificado via MCP do Figma. A leitura retornou a estrutura de arquivos do Figma Make, incluindo `src/App.tsx`, `src/index.css`, `src/imports/pasted_text/design-system-spec.md`, imagens e arquivos de configuracao do Vite.

Ele deve orientar:

- cores;
- tipografia;
- espacamentos;
- bordas;
- sombras;
- botoes;
- cards;
- navegacao;
- formularios;
- padroes de tela;
- comportamento visual responsivo.

## Como usar esta referencia

Antes de criar ou alterar telas, componentes e estilos, consultar:

1. o Figma Design do prototipo para layout, fluxo e composicao da tela;
2. o Figma Make para confirmar:

- tokens visuais;
- hierarquia tipografica;
- variacoes de botoes;
- cards e banners;
- estados de formularios;
- navegacao;
- responsividade;
- padroes de espacamento.

## Consulta obrigatoria via MCP

Antes de implementar qualquer tela, componente visual, token ou estilo, o Codex
deve consultar este Figma Make via MCP. Quando houver tela envolvida, tambem
deve consultar o arquivo Figma Design do prototipo via MCP.

Parametros de leitura:

```txt
fileKey: dVm7lEZdBFqOiiySWLWUqp
nodeId: 0:1
skill: figma-design-to-code
framework: react
languages: typescript, css
```

Arquivos de referencia esperados na resposta do MCP:

- `src/App.tsx`
- `src/index.css`
- `src/imports/pasted_text/design-system-spec.md`
- imagens em `src/imports/`
- arquivos de configuracao do Vite

O Figma Make deve ser tratado como referencia tecnica ativa para desenvolvimento, nao apenas como link de consulta humana.

Se o MCP nao conseguir retornar o conteudo visual ou tecnico necessario, o Codex deve interromper a implementacao visual, informar a limitacao e solicitar uma destas alternativas:

- link Figma em formato `/design/...` com `node-id`;
- exportacao dos arquivos principais do Figma Make;
- prints ou assets das telas/componentes necessarios.

As informacoes abaixo sao um resumo operacional para orientar a implementacao. Em caso de divergencia, o Figma Make deve prevalecer.

## Observacoes extraidas

Tokens visuais identificados:

- Brand Navy: `#0B2A4A`
- Brand Teal: `#1B9E95`
- Brand Orange: `#F47920`
- Neutral White: `#FFFFFF`
- Gray 50: `#F8F9FA`
- Gray 100: `#EDF1F5`
- Gray 200: `#E2E8EE`
- Gray 300: `#CBD2D9`
- Gray 500: `#6B7280`
- Gray 700: `#374151`
- Gray 900: `#1A202C`

Fontes identificadas:

- Display: Outfit
- Body: Source Sans 3 / Rawline
- Apoio: Inter

## Regra de uso

Antes de implementar telas, consultar o Figma Design do prototipo para fluxo e composicao, e consultar o Figma Make via MCP para tokens, componentes e padroes visuais.

Nao criar uma pasta de codigo do design system dentro deste repositorio sem decisao tecnica especifica. A implementacao dos tokens e componentes deve acontecer dentro da aplicacao quando a fundacao tecnica for implementada.

# Referencia Figma Make

## Papel desta referencia

O Figma Make é a proveniência visual e técnica do design system. O contrato de
implementação está versionado em `tokens-e-componentes.md` e nos pacotes de
`referencias-locais/`, para que a equipe não dependa de acesso ao arquivo.

Referencia oficial do design system:

- [Organize Design System - Figma Make](https://www.figma.com/make/dVm7lEZdBFqOiiySWLWUqp/Organize-Design-System--Copy-?t=rgWuly5cbaPi1E9B-20&fullscreen=1)

O repositório não armazena o código gerado pelo Figma Make, pois ele não deve
ser copiado diretamente. Os tokens e padrões reconciliados no repositório são
a fonte oficial para o código.

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

## Como usar esta referência

Antes de criar ou alterar telas, componentes e estilos, consultar:

1. o pacote visual local da tela para layout, fluxo e composição;
2. `tokens-e-componentes.md` para confirmar:

- tokens visuais;
- hierarquia tipografica;
- variacoes de botoes;
- cards e banners;
- estados de formularios;
- navegacao;
- responsividade;
- padroes de espacamento.

## Consulta opcional via MCP

Uma pessoa com acesso pode auditar a origem via MCP. A consulta não é
pré-requisito para implementar telas com pacote local e não pode introduzir
mudanças que ainda não tenham sido revisadas e versionadas.

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

O Figma Make deve ser tratado como origem rastreável, não como dependência de
execução ou fonte remota obrigatória.

Se uma tela ainda não tiver pacote local e o MCP não retornar o conteúdo
necessário, registrar o bloqueio e solicitar uma destas alternativas:

- link Figma em formato `/design/...` com `node-id`;
- exportacao dos arquivos principais do Figma Make;
- prints ou assets das telas/componentes necessarios.

As informações abaixo orientam a implementação. Em caso de divergência, o
estado versionado prevalece até uma atualização deliberada da equipe.

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

- Display observado no Figma Make: Outfit
- Body observado no Figma Make: Source Sans 3 / Rawline

No codigo do Simplifica Carta, Inter e a familia principal para display e corpo,
conforme a decisao transversal registrada em `tokens-e-componentes.md` e
`docs/arquitetura/decisoes-tecnicas.md`. As familias acima documentam a fonte de
referencia, mas nao substituem a decisao do projeto.
- Apoio: Inter

## Regra de uso

Antes de implementar telas, consultar o pacote visual local para fluxo e
composição e os tokens versionados para componentes e padrões. Usar o Figma via
MCP somente quando esse material ainda não existir ou quando houver auditoria
explícita.

Nao criar uma pasta de codigo do design system dentro deste repositorio sem decisao tecnica especifica. A implementacao dos tokens e componentes deve acontecer dentro da aplicacao quando a fundacao tecnica for implementada.

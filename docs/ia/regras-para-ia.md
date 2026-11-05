# Regras para IA

## Comportamento esperado

- Identificar a funcionalidade em trabalho.
- Consultar contexto antes de propor ou alterar arquivos.
- Explicar o objetivo da etapa.
- Indicar onde a informacao deve ficar.
- Gerar ou ajustar documentos necessarios.
- Indicar proximos passos.
- Implementar codigo apenas com `/spec:implementar`.
- Quando existir `implementation-plan.md`, usa-lo como base principal da implementacao.

## Fontes de contexto

Ordem recomendada:

1. ERS e README.
2. `docs/`.
3. `specs/`.
4. `docs/design-system/referencias-locais/` e tokens versionados.
5. `implementation-plan.md`, quando existir.
6. Codigo existente.
7. Figma Design/Make, somente para telas sem pacote local ou auditoria pedida.

## Regra obrigatoria para trabalho visual

Quando a tarefa envolver tela, componente visual, tokens, estilos, layout,
responsividade ou aderência visual, a IA deve consultar primeiro o pacote visual
local e os tokens versionados. O MCP só é obrigatório quando não existir pacote
local suficiente; nesse caso, a IA deve extrair e versionar a evidência antes
de implementar.

### Figma Design do prototipo

Usar para layout, fluxo, composicao, ordem das secoes, hierarquia visual e comportamento das telas.

Parametros oficiais:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
pagina raiz atual: 167:2
node inicial recomendado: 310:175
link: https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=310-175&m=dev
skill: figma-design-to-code
```

Quando não houver pacote local para uma tela específica, usar um link com
`node-id`, identificar o frame correto e criar captura, manifesto e spec visual.

### Figma Make do design system

Usar para tokens, componentes, tipografia, espacamento, cards, botoes, formularios, navegacao e comportamento responsivo.

Parametros oficiais:

```txt
fileKey: dVm7lEZdBFqOiiySWLWUqp
nodeId: 0:1
skill: figma-design-to-code
```

O objetivo da consulta ao Figma Make e usar o design system como referencia tecnica ativa para:

- tokens;
- componentes;
- tipografia;
- espacamento;
- cards;
- botoes;
- formularios;
- navegacao;
- comportamento responsivo.

Se o pacote local não existir e o MCP não retornar informação suficiente, a IA
deve avisar antes de implementar e solicitar link `/design/...` com `node-id`,
exportação ou captura específica.

## Regra para implementation-plan

Antes de implementar paginas, componentes visuais, formularios, fluxos guiados ou funcionalidades com varias partes tecnicas, o Codex deve criar ou revisar `implementation-plan.md` usando `/spec:plano-implementacao`.

O arquivo deve ficar dentro da pasta da spec e deve conter:

- fontes consultadas;
- node do Figma Design, quando houver tela;
- referencia ao Figma Make, quando houver tokens ou componentes;
- arquivos a criar e alterar;
- contratos de componentes;
- codigo base em React/TypeScript/CSS;
- regras de implementacao;
- validacoes.

Em `/spec:implementar`, se `implementation-plan.md` existir, ele prevalece como guia de implementacao sobre respostas livres da IA. Qualquer divergencia relevante deve ser informada antes de alterar o codigo.

## Organizacao de informacoes

- Requisitos amplos ficam no ERS e em `docs/produto`.
- Decisoes tecnicas ficam em `docs/arquitetura` ou `docs/decisoes`.
- Fluxos e comportamento de uma funcionalidade ficam em `specs`.
- Planos de implementacao com codigo base ficam em `implementation-plan.md` dentro da spec.
- Implementacao fica no codigo.

## Limites

- Nao criar funcionalidades fora do MVP sem registrar como evolucao futura.
- Nao alterar decisao de arquitetura sem ADR.
- Nao salvar dados da Carta permanentemente no MVP.
- Nao assumir integracao direta com o Paraiba Digital.

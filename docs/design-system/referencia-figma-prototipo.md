# Referencia Figma do Prototipo

## Papel desta referencia

O arquivo Figma do prototipo sera usado como referencia oficial para layout,
fluxo, composicao e hierarquia das telas do Simplifica Carta.

Referencia oficial das telas:

- [Manual de levantamento dos servicos - Figma Design](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=651-317&m=dev)

## Relacao com o Figma Make

O projeto possui duas fontes visuais complementares:

- Figma Design: orienta layout das telas, fluxo, estrutura, ordem das secoes,
  composicao, hierarquia visual e comportamento esperado de cada pagina.
- Figma Make: orienta design system, tokens, componentes, cores, tipografia,
  espacamentos, formularios, botoes, cards e padroes visuais reutilizaveis.

Em trabalho visual, o Codex deve consultar as duas referencias quando a tarefa
envolver tela, componente, layout, estilo, responsividade ou aderencia visual.

## Consulta obrigatoria via MCP

Antes de implementar ou revisar qualquer tela, o Codex deve consultar este
arquivo pelo MCP do Figma.

Parametros oficiais do arquivo:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
pagina raiz: 0:1
node inicial: 651:317
tipo: Figma Design
skill: figma-design-to-code
framework: react
languages: typescript, css
```

O node inicial `651:317` representa o componente `Label-Row`. O mapa entre
rotas, specs e frames do prototipo fica em
[`docs/design-system/mapa-figma-telas.md`](mapa-figma-telas.md).

Quando a tarefa envolver uma tela especifica, usar preferencialmente um link
Figma com `node-id` da tela ou componente. Se o link disponivel apontar apenas
para o arquivo, o Codex deve usar o MCP para listar paginas/nos e identificar
o node correto antes de chamar `get_design_context`.

## Ordem de uso em trabalho visual

1. Consultar a spec da funcionalidade em `specs/`.
2. Consultar o Figma Design para layout, fluxo e composicao da tela.
3. Consultar o Figma Make para tokens, componentes e padroes visuais.
4. Implementar no codigo seguindo a estrutura do projeto.
5. Validar responsividade, acessibilidade e aderencia visual.

## Regra de fallback

Se o MCP do Figma nao retornar informacao suficiente do prototipo, o Codex deve
avisar antes de implementar a tela e solicitar uma destas alternativas:

- link Figma com `node-id` da tela especifica;
- captura atualizada da tela;
- exportacao dos frames relevantes;
- confirmacao manual de qual frame deve ser usado.

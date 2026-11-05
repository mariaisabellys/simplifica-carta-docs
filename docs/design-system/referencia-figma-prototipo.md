# Referencia Figma do Prototipo

## Papel desta referencia

O arquivo Figma é a origem do protótipo. Para implementação, a referência
oficial é a evidência versionada no repositório: mapa, tokens e pacotes em
[`referencias-locais/`](referencias-locais/README.md). Isso garante o mesmo
contrato para pessoas e IAs sem acesso ao arquivo privado.

Referencia oficial das telas:

- [Manual de levantamento dos servicos - Figma Design](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=310-175&m=dev)

## Relacao com o Figma Make

O projeto possui duas fontes visuais complementares:

- Figma Design: orienta layout das telas, fluxo, estrutura, ordem das secoes,
  composicao, hierarquia visual e comportamento esperado de cada pagina.
- Figma Make: orienta design system, tokens, componentes, cores, tipografia,
  espacamentos, formularios, botoes, cards e padroes visuais reutilizaveis.

Em trabalho visual, consultar primeiro as fontes locais. O Figma Design e o
Figma Make só precisam ser acessados para telas ainda sem pacote local ou para
uma auditoria explícita; descobertas remotas devem ser versionadas antes de
orientar a equipe.

## Proveniência e consulta opcional via MCP

Os parâmetros abaixo permitem auditar a origem quando houver acesso:

Parametros oficiais do arquivo:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
pagina raiz atual: 167:2
node inicial recomendado: 310:175
tipo: Figma Design
skill: figma-design-to-code
framework: react
languages: typescript, css
```

O node inicial recomendado `310:175` representa a home atual. O componente
`Label-Row` permanece disponivel no node `651:317` para formularios. O mapa
entre rotas, specs e frames do prototipo fica em
[`docs/design-system/mapa-figma-telas.md`](mapa-figma-telas.md).

A pagina `Explorar por etapas` esta no node `575:483` e deve ser usada pela
feature `003-explorar-por-etapas`. Ela apresenta quatro cards com acesso
independente ao diagnostico, organizacao das informacoes, elaboracao da Carta e
tutorial de publicacao.

Quando a tela já possuir captura, manifesto e `visual-spec.md`, não é necessário
abrir o link. Se o pacote estiver ausente, usar o node específico, extrair a
evidência e criar o pacote antes de distribuir a implementação.

## Ordem de uso em trabalho visual

1. Consultar a spec e o conteúdo da funcionalidade.
2. Consultar o pacote em `referencias-locais/` e os tokens versionados.
3. Implementar no código seguindo a estrutura do projeto.
4. Validar responsividade, acessibilidade e aderência contra a captura local.
5. Consultar o Figma apenas se a referência local não existir ou se a tarefa
   pedir uma atualização da origem.

## Regra de fallback

Se uma tela ainda não tiver pacote local e o MCP não retornar informação
suficiente, registrar o bloqueio e solicitar uma destas alternativas:

- link Figma com `node-id` da tela especifica;
- captura atualizada da tela;
- exportacao dos frames relevantes;
- confirmacao manual de qual frame deve ser usado.

# Guia de Uso do Codex

## Papel do Codex no projeto

O Codex atuara como instrutor tecnico, assistente de organizacao, executor de comandos, criador de arquivos, implementador e revisor do projeto.

## Regra principal

O desenvolvimento deve ser guiado por documentacao antes do codigo.

## Como pedir trabalho

Use os mini comandos internos:

- `/spec:criar`
- `/spec:planejar`
- `/spec:tarefas`
- `/spec:validar`
- `/spec:implementar`
- `/spec:revisar`

## Antes de implementar

O Codex deve consultar:

- ERS;
- README;
- documentos em `docs/`;
- spec da funcionalidade;
- Figma Design do prototipo, para layout e composicao das telas;
- Figma Make, quando houver impacto visual.

Para trabalho visual, a consulta ao Figma Design do prototipo deve ser feita via MCP usando:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
pagina raiz: 0:1
node inicial: 651:317
link: https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=651-317&m=dev
skill: figma-design-to-code
```

Quando possivel, usar um link com `node-id` da tela especifica. Se houver apenas o link geral do arquivo, o Codex deve usar o MCP para localizar o frame correto antes de implementar.

Para design system, a consulta ao Figma Make deve ser feita via MCP usando:

```txt
fileKey: dVm7lEZdBFqOiiySWLWUqp
nodeId: 0:1
skill: figma-design-to-code
```

Essas consultas sao obrigatorias antes de implementar telas, componentes, tokens ou estilos.

## Ao finalizar

O Codex deve informar:

- o que foi criado ou alterado;
- onde os arquivos ficaram;
- como verificar;
- proximo passo recomendado.

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
- `/spec:plano-implementacao`
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
- `implementation-plan.md`, quando existir.

Para trabalho visual, a consulta ao Figma Design do prototipo deve ser feita via MCP usando:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
pagina raiz atual: 167:2
node inicial recomendado: 310:175
link: https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=310-175&m=dev
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

## Plano de implementacao

Antes de `/spec:implementar`, funcionalidades visuais ou complexas devem ter um `implementation-plan.md` dentro da pasta da spec.

Esse arquivo serve para reduzir uso de tokens e apoiar colaboradores que nao possuem acesso ao MCP do Figma ou a IAs com grande contexto. Ele deve conter mapeamento visual, arquivos afetados, contratos de componentes, codigo base e validacoes.

Quando o arquivo existir, o Codex deve usa-lo como base principal da implementacao.

## Ao finalizar

O Codex deve informar:

- o que foi criado ou alterado;
- onde os arquivos ficaram;
- como verificar;
- proximo passo recomendado.

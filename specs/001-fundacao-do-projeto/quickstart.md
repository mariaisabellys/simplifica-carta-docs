# Quickstart: Fundacao do Projeto

## Como verificar a fundacao documental

1. Abra `README.md`.
2. Confira se os links de documentacao apontam para arquivos existentes.
3. Abra `docs/processo/constitution.md`.
4. Confira os mini comandos internos.
5. Abra `specs/001-fundacao-do-projeto/`.
6. Confira se existem `spec.md`, `plan.md`, `tasks.md` e `quickstart.md`.
7. Abra `docs/implementation-plan.md`.
8. Confira se `specs/README.md` lista `implementation-plan.md` como arquivo esperado.

## Como verificar a fundacao tecnica depois da implementacao

Quando `/spec:implementar` for usado para esta spec:

1. Instalar dependencias do projeto com `npm install`.
2. Rodar o servidor local de desenvolvimento com `npm run dev`.
3. Abrir a pagina inicial.
4. Navegar pelas rotas placeholder.
5. Rodar o build de producao com `npm run build`.
6. Conferir se os arquivos de conteudo, tipos, validacao, armazenamento temporario e CSV existem.

A rota `/explorar-por-etapas` nao faz parte dos placeholders da fundacao. Ela e
registrada pela spec `003-explorar-por-etapas` no momento de sua implementacao,
junto da pagina real e do node Figma `575:483`.

## Proximo passo recomendado agora

Usar:

```txt
/spec:criar 002-home-e-navegacao
/spec:planejar 002-home-e-navegacao
/spec:tarefas 002-home-e-navegacao
/spec:plano-implementacao 002-home-e-navegacao
```

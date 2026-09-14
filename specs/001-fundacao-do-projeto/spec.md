# Spec: Fundacao do Projeto

## Objetivo

Organizar a base documental e tecnica do Simplifica Carta para permitir desenvolvimento guiado por especificacoes.

## Contexto

O projeto ja possui ERS, prototipo no Figma, referencia de design system no Figma Make e decisao de stack para o MVP.

Esta spec cobre a fundacao do projeto antes da implementacao das funcionalidades de produto.

## Usuarios impactados

- Desenvolvedora do projeto.
- Codex como assistente tecnico.
- Equipe institucional que consultara documentacao.

## Requisitos funcionais

- Criar README principal do projeto.
- Criar `.gitignore`.
- Criar estrutura `docs/`.
- Criar estrutura `specs/`.
- Documentar visao do produto, MVP, escopo, personas e fluxos.
- Documentar arquitetura e decisoes tecnicas.
- Documentar referencia ao Figma Make e tokens iniciais.
- Criar regras de IA e prompts padroes.
- Criar constitution manual inspirada no Spec Kit.

## Requisitos nao funcionais

- Documentos devem ser curtos, claros e versionaveis.
- A estrutura deve facilitar continuidade no Codex CLI e no VS Code.
- A documentacao deve separar produto, arquitetura, design, IA, decisoes e specs.

## Fora de escopo

- Criar o projeto React/Vite.
- Implementar telas.
- Configurar backend.
- Conectar ao Figma MCP.
- Publicar deploy.

## Criterios de aceite

- `README.md` existe e explica objetivo, stack, documentacao e mini comandos.
- `.gitignore` existe e cobre dependencias, builds, logs, ambiente e arquivos locais.
- `docs/` existe com subpastas de produto, arquitetura, design system, IA, decisoes e processo.
- `specs/` existe com a lista de funcionalidades planejadas.
- Esta spec possui `spec.md`, `plan.md`, `tasks.md` e `quickstart.md`.


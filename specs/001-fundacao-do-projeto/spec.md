# Spec: Fundacao do Projeto

## Objetivo

Organizar a base documental e preparar a fundacao tecnica do Simplifica Carta para permitir desenvolvimento guiado por especificacoes.

## Contexto

O projeto ja possui ERS, prototipo no Figma, referencia de design system no Figma Make e decisao de stack para o MVP.

Esta spec cobre duas entregas:

- Fundacao documental, ja criada e commitada.
- Fundacao tecnica, que deve preparar o projeto React + TypeScript + Vite antes das funcionalidades de produto.

## Usuarios impactados

- Desenvolvedora do projeto.
- Codex como assistente tecnico.
- Equipe institucional que consultara documentacao.

## Requisitos funcionais

### Fundacao documental

- Criar README principal do projeto.
- Criar `.gitignore`.
- Criar estrutura `docs/`.
- Criar estrutura `specs/`.
- Documentar visao do produto, MVP, escopo, personas e fluxos.
- Documentar arquitetura e decisoes tecnicas.
- Documentar referencia ao Figma Make e tokens iniciais.
- Criar regras de IA e prompts padroes.
- Criar constitution manual inspirada no Spec Kit.

### Fundacao tecnica

- Criar projeto frontend com React, TypeScript e Vite.
- Configurar Tailwind CSS ou base CSS modular alinhada aos tokens do Figma Make.
- Definir estrutura inicial de pastas para aplicacao, paginas, componentes, conteudo, validadores, utilitarios e estilos.
- Configurar padrao inicial de rotas para as paginas previstas no MVP.
- Criar camada inicial para conteudo versionado.
- Criar modelo inicial de dados da Carta de Servicos.
- Definir estrategia de armazenamento temporario durante a sessao.
- Definir utilitario inicial para exportacao CSV local.
- Definir base para validacao de campos obrigatorios e sugestoes de linguagem simples.
- Reservar separacao tecnica para backend simples de atendimento agendado, sem implementa-lo nesta primeira entrega de frontend.
- Registrar scripts principais de desenvolvimento, build e verificacao.

## Requisitos nao funcionais

- Documentos devem ser curtos, claros e versionaveis.
- A estrutura deve facilitar continuidade no Codex CLI e no VS Code.
- A documentacao deve separar produto, arquitetura, design, IA, decisoes e specs.
- A base tecnica deve favorecer componentes reutilizaveis, responsividade e acessibilidade desde o inicio.
- A aplicacao deve evitar persistencia permanente dos dados da Carta no MVP.
- A organizacao deve permitir evolucao futura para backend, autenticacao, painel administrativo e rascunhos persistentes.

## Fora de escopo

- Implementar telas finais do MVP.
- Implementar diagnostico completo.
- Implementar formulario completo da Carta.
- Implementar backend de atendimento agendado.
- Conectar ao Figma MCP.
- Publicar deploy.
- Criar painel administrativo.
- Criar autenticacao.

## Criterios de aceite

### Fundacao documental

- `README.md` existe e explica objetivo, stack, documentacao e mini comandos.
- `.gitignore` existe e cobre dependencias, builds, logs, ambiente e arquivos locais.
- `docs/` existe com subpastas de produto, arquitetura, design system, IA, decisoes e processo.
- `specs/` existe com a lista de funcionalidades planejadas.
- Esta spec possui `spec.md`, `plan.md`, `tasks.md` e `quickstart.md`.

### Fundacao tecnica

- O reposititorio contem um app React + TypeScript + Vite funcional.
- Os scripts de desenvolvimento e build estao documentados.
- A estrutura inicial de pastas esta criada.
- Existem tokens/estilos base alinhados ao Figma Make.
- Existe roteamento inicial para as secoes principais do MVP, ainda que com paginas placeholder.
- Existe estrutura inicial para conteudo versionado.
- Existe tipo/modelo inicial para os dados da Carta de Servicos.
- Existe decisao registrada sobre armazenamento temporario.
- Existe decisao registrada sobre exportacao CSV.
- O projeto executa build sem erro.

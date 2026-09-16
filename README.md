# Simplifica Carta

O Simplifica Carta e um manual web informativo e interativo para apoiar servidores publicos no levantamento, organizacao e preparacao das informacoes necessarias para a Carta de Servicos.

O projeto nao substitui o Paraiba Digital e nao publica servicos automaticamente. Sua funcao no MVP e orientar, validar, organizar, pre-visualizar, exportar e facilitar a copia das informacoes que serao cadastradas manualmente na plataforma oficial.

## Estado do projeto

Este repositorio esta em fase de organizacao inicial, com desenvolvimento guiado por documentacao antes do codigo. A metodologia sera inspirada no GitHub Spec Kit, mas sem instalar ou usar os comandos oficiais.

Fluxo de trabalho adotado:

1. Constitution
2. Spec
3. Plan
4. Tasks
5. Implementation Plan
6. Implementacao
7. Testes
8. Deploy

## Stack definida para o MVP

- Frontend: React, TypeScript e Vite.
- Estilizacao: Tailwind CSS ou CSS modular baseado nos tokens do Figma Make.
- Conteudo: arquivos versionados no projeto, em TypeScript, JSON, Markdown ou MDX.
- Validacao: executada no navegador.
- Previa HTML: gerada dinamicamente no frontend.
- Exportacao: CSV gerado localmente.
- Armazenamento dos dados da Carta: temporario durante a sessao.
- Backend: simples, apenas para atendimento agendado.
- Banco de dados: minimo, apenas para solicitacoes de atendimento.
- E-mail: SMTP ou provedor institucional para notificacoes de suporte/atendimento.

## Desenvolvimento local

Depois de instalar as dependencias:

```bash
npm install
npm run dev
npm run build
```

O app frontend fica em `src/` e a fundacao tecnica inicial ja contem rotas
placeholder, tokens CSS, conteudo versionado, modelo inicial da Carta,
armazenamento de sessao, validacao obrigatoria e CSV local.

## Documentacao principal

- [Visao do produto](docs/produto/visao-produto.md)
- [MVP](docs/produto/mvp.md)
- [Escopo](docs/produto/escopo.md)
- [Fluxos](docs/produto/fluxos.md)
- [Arquitetura do sistema](docs/arquitetura/arquitetura-sistema.md)
- [Decisoes tecnicas](docs/arquitetura/decisoes-tecnicas.md)
- [Referencia Figma do prototipo](docs/design-system/referencia-figma-prototipo.md)
- [Mapa Figma das telas](docs/design-system/mapa-figma-telas.md)
- [Referencia Figma Make](docs/design-system/referencia-figma-make.md)
- [Tokens e componentes](docs/design-system/tokens-e-componentes.md)
- [Implementation Plan](docs/implementation-plan.md)
- [Regras para IA](docs/ia/regras-para-ia.md)
- [Constitution manual](docs/processo/constitution.md)

## Specs

As funcionalidades serao organizadas em `specs/`, cada uma com:

- `spec.md`: problema, objetivo, requisitos e criterios de aceite.
- `plan.md`: abordagem tecnica.
- `tasks.md`: tarefas pequenas e implementaveis.
- `implementation-plan.md`: plano de implementacao com mapeamento visual, arquivos afetados e codigo base.
- `quickstart.md`: como verificar a funcionalidade.

A primeira especificacao do projeto esta em [specs/001-fundacao-do-projeto](specs/001-fundacao-do-projeto/spec.md).

## Mini comandos internos

Use estes comandos na conversa com o Codex:

- `/spec:criar`: cria ou revisa o `spec.md`.
- `/spec:planejar`: cria ou revisa o `plan.md`.
- `/spec:tarefas`: cria ou revisa o `tasks.md`.
- `/spec:plano-implementacao`: cria ou revisa o `implementation-plan.md` com codigo base e referencias visuais.
- `/spec:validar`: verifica consistencia entre documentacao, ERS, Figma Design, Figma Make, implementation-plan e roadmap.
- `/spec:implementar`: implementa a funcionalidade no codigo.
- `/spec:revisar`: revisa requisitos, acessibilidade, responsividade e aderencia visual.

Codigo so deve ser implementado quando o comando `/spec:implementar` for usado. Quando existir `implementation-plan.md`, a implementacao deve segui-lo como base principal.

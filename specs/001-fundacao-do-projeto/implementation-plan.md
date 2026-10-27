# Implementation Plan: Fundação do projeto

## Status e finalidade

Baseline documental criado na T017 em 22/10/2026. A fundação técnica já existe;
este plano descreve o estado real, as correções compartilhadas ainda pendentes
e como verificar uma futura alteração. Não autoriza nem executa código.

## Fontes e contratos

- [spec](spec.md), [plan](plan.md), [tasks](tasks.md) e [quickstart](quickstart.md);
- constitution, arquitetura, ADRs 001–004 e convenção em `specs/README.md`;
- [contrato de navegação](../../docs/arquitetura/contrato-navegacao.md);
- mapa Figma e registro T016, sem inspeção visual autenticada nesta rodada;
- `package.json`, configurações TypeScript/Vite, `src/` e testes existentes.

## Baseline técnico observado

- React 19, TypeScript 5.9 e Vite 7; CSS global/tokens, sem Tailwind.
- Scripts existentes: `dev`, `build`, `preview` e `typecheck`; não há script
  `test`, embora existam arquivos `node:test` em `tests/`.
- Estrutura presente: `app`, `components`, `content`, `features`, `lib`,
  `pages`, `styles` e `types`.
- Conteúdo versionado existe para páginas, diagnóstico, tutorial e ajuda.
- Carta v3 possui tipos, catálogos, schema, storage, validação e CSV; a
  existência desses helpers não comprova provider/formulário integrado.
- O registro de rotas possui 11 paths. `/explorar-por-etapas` pertence à 003
  e ainda não está registrado; `findRoute` ainda retorna a home para desconhecida.
- App/AppShell ainda usam navegação legada baseada em pathname e `onNavigate`;
  provider de URL completa, 404, título, foco, scroll e skip link são futuros.
- Backend da agenda e deploy pertencem às features 014/017, não à fundação.

## Limites de responsabilidade

A 001 mantém configuração, estrutura e contratos transversais mínimos. Não
implementa páginas finais, regras da Carta, diagnóstico, agenda ou deploy para
fechar seu próprio aceite. Correções pertencem à feature dona e devem reutilizar
a fundação, sem criar abstrações paralelas.

## Sequência para alterações futuras

1. Conferir dirty worktree e preservar mudanças alheias.
2. Identificar o contrato proprietário afetado e seu parecer atual.
3. Ajustar configuração/estrutura compartilhada somente quando necessário.
4. Manter providers persistentes acima das páginas e conteúdo fora do JSX.
5. Não adicionar dependência, framework CSS ou roteador apenas por conveniência.
6. Verificar imports, typecheck, build e testes pertinentes já existentes.
7. Registrar comandos realmente executados em `verification.md`; resultados
   esperados ficam no quickstart.

## Arquivos e intervenções previstas

| Área | Estado/ação futura |
| --- | --- |
| `src/app/App.tsx`, `routes.tsx` | Migrar pelo contrato T015; registrar 003 e 404 nas features responsáveis. |
| `src/components/layout` e `ui` | AppLink/skip/título/foco sem handlers concorrentes. |
| `src/features/carta` | Preservar v3; provider/formulário pertencem à 007. |
| `src/features/diagnostico` | Tipos/regras pertencem à 005. |
| `src/features/atendimento` | Contrato da tentativa pertence à 014; backend não é fundação. |
| `src/styles` | Tokens compartilhados; mudanças visuais exigem referência e medição. |
| `package.json` | Scripts/dependências só com necessidade real e lockfile coerente. |
| `tests/` | Reutilizar `node:test`; não alegar suite por existir arquivo. |

## Verificação futura

Pré-condição: dependências instaladas no ambiente autorizado. Comandos
previstos, ainda não executados pela T017:

```sh
npm run typecheck
npm run build
node --test tests/*.test.mjs
```

Também conferir estrutura, links documentais, rotas diretas/404/fallback SPA e
ausência de dados permanentes da Carta. O glob de testes deve ser validado no
shell do ambiente; registrar quantidade e falhas observadas, sem copiar números
históricos. Figma/assistividade/deploy exigem evidências próprias.

## Pendências

- navegação compartilhada e rota 003: implementação futura;
- provider/interface da Carta, diagnóstico e páginas: features proprietárias;
- Figma visual: acesso autenticado pendente conforme T016;
- agenda operacional e deploy: T014/T018;
- revalidação atual e execução de checks: T019/implementação.

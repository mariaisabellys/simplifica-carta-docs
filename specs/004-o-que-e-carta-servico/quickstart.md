# Quickstart: O que e a Carta de Servicos

## Status documental

A copy da feature 004 foi aprovada e versionada em 25 de setembro de 2026. O
antigo bloqueio editorial `B001` esta resolvido.

## Pre-condicoes

- `spec.md`, `plan.md`, `tasks.md` e `implementation-plan.md` presentes;
- node Figma Design `365:265` acessivel;
- Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, disponivel para reconsulta;
- feature 002 implementada ou contratos reais do shell novamente conferidos;
- copy normativa versionada em `src/content/pages/o-que-e-carta.ts`;
- assets oficiais baixados para `src/assets/o-que-e-carta/`.

## Fonte editorial

Validar todos os textos renderizados contra
`src/content/pages/o-que-e-carta.ts`. Os resumos aprovados dos decretos devem
ser preservados sem substituicao silenciosa por ementas alternativas.

## Verificacao funcional

1. Abrir `/o-que-e-carta-de-servicos` pela URL direta e recarregar.
2. Acessar a pagina pelo CTA da home e pela header.
3. Confirmar breadcrumb com retorno para `/`.
4. Confirmar exatamente:
   - tres itens em `Por que e importante?`;
   - dois paineis em `Fundamentos`;
   - dez cards informativos;
   - tres referencias normativas.
5. Testar voltar e avancar do navegador.
6. Confirmar ausencia de formulario, progresso e CTA final.
7. Confirmar que a pagina nao altera dados da Carta.

## Verificacao dos links legais

Para cada acao `Consultar`:

- confirmar numero, ano, resumo e URL aprovados;
- confirmar abertura em nova aba;
- confirmar `rel="noopener noreferrer"`;
- confirmar nome acessivel com a norma e o aviso de nova aba;
- confirmar funcionamento somente com teclado.

## Verificacao visual

- comparar desktop em 1440 px com o node `365:265`;
- conferir introducao em duas colunas;
- conferir painel creme e gradiente de fundamentos;
- conferir grade de tres colunas dos campos;
- conferir linhas horizontais da legislacao;
- confirmar correspondencia de cada icone com seu node do Figma;
- registrar a ausencia intencional de `Material de apoio` na header.

## Verificacao responsiva e acessivel

Validar em 1440, 1024, 768, 390 e 320 px:

- ausencia de corte, sobreposicao e scroll horizontal;
- ordem visual igual a ordem do DOM;
- um unico `h1` e hierarquia coerente de titulos;
- foco visivel e contraste adequado;
- areas de toque suficientes;
- zoom de 200% e reflow;
- icones decorativos ignorados por leitores de tela.

## Comandos tecnicos

```sh
npm run test
npm run typecheck
npm run build
```

Se `npm run test` ainda nao existir, implementar a infraestrutura prevista no
plano antes de concluir a feature.

## Resultado esperado

A pagina deve reproduzir a hierarquia do frame oficial com conteudo versionado,
links legais seguros, assets reais, shell compartilhado e nenhum efeito sobre
backend, armazenamento ou estado da Carta.

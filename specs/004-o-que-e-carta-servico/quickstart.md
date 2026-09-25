# Quickstart: O que e a Carta de Servicos

## Status documental

A feature 004 foi validada em 24 de setembro de 2026 com o bloqueio editorial
`B001` aberto. Nao iniciar `/spec:implementar` ate a aprovacao da copy dos
Decretos nº 9.094/2017 e nº 9.756/2019.

## Pre-condicoes

- `spec.md`, `plan.md`, `tasks.md` e `implementation-plan.md` presentes;
- node Figma Design `365:265` acessivel;
- Figma Make `dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, disponivel para reconsulta;
- feature 002 implementada ou contratos reais do shell novamente conferidos;
- copy normativa aprovada pela equipe responsavel;
- assets oficiais baixados para `src/assets/o-que-e-carta/`.

## Resolucao necessaria antes da implementacao

Aprovar estes resumos baseados nas ementas oficiais:

- Lei nº 13.460/2017: `Dispoe sobre participacao, protecao e defesa dos direitos
  do usuario dos servicos publicos da administracao publica.`;
- Decreto nº 9.094/2017: `Dispoe sobre a simplificacao do atendimento prestado
  aos usuarios dos servicos publicos.`;
- Decreto nº 9.756/2019: `Institui o portal unico gov.br e dispoe sobre as
  regras de unificacao dos canais digitais do Governo federal.`.

Depois da aprovacao, registrar a decisao no `implementation-plan.md`, marcar
T008 como concluida e somente entao executar `/spec:implementar`.

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

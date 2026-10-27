# Validação atual: Responsividade e acessibilidade

> **Revalidação vigente — 27/10/2026:** `/spec:validar` reexecutado após a
> atualização da matriz transversal. Contrato coerente com as condições atuais;
> auditorias reais continuam não executadas. Evidência no
> [registro seletivo](../../docs/verificacoes/revalidacao-contratos-2026-10-27.md).

## Parecer

Validação documental registrada em 22/10/2026 após T015–T017. Spec, plan,
tasks, implementation-plan, quickstart, matriz, verification, mapa Figma e
contratos proprietários foram comparados.

Resultado: **contrato transversal documentalmente consistente; auditoria e
conformidade não executadas**. A 016 pode orientar implementação e preparação
de testes, mas nenhum CA01–CA15 está aprovado integralmente.

## Fontes e limites

- navegação T015 e inventário visual/estados T016;
- matriz de páginas, estados e métodos da 016;
- rotas/código local apenas para constatar lacunas;
- Figma inacessível na T016; ERS, browsers e tecnologias assistivas não
  consultados nesta validação.

## Achados

| ID | Estado | Evidência/encaminhamento |
| --- | --- | --- |
| V016-01 | resolvido documentalmente | Validation ausente foi criada; matriz distingue evidência visual/funcional. |
| V016-02 | resolvido documentalmente | Nodes, etapa 4 ampliada, formulário real, orientação e prévia compartilhada estão mapeados. |
| V016-03 | aberto para implementação | Provider/404/título/foco/skip e rota 003 permanecem lacunas T015. |
| V016-04 | aberto para execução | Teclado, leitores, contraste, reflow, zoom, toque e falhas requerem ambientes reais. |
| V016-05 | aguardando fonte | Todos os nodes/Make exigem inspeção autenticada; link não é aceite visual. |
| V016-06 | dependência externa planejada | A 017 agora especifica deploy/fallback SPA; ambiente publicado continua ausente e a agenda depende da 014. |

## Liberação

Liberados: uso da matriz como roteiro, implementação de correções no componente
dono e preparação de fixtures sintéticas. Bloqueados: declaração WCAG, aceite
visual, aprovação global e qualquer afirmação de teste não executado.

Próxima revisão: T019, depois das dependências documentais e das implementações
pertinentes. O histórico de 05/10 permanece evidência separada e não é reescrito.

## Revalidação T019 — 22/10/2026

Parecer atual: **plano transversal coerente; conformidade não avaliada**.
RF01–RF08/CA01–CA15 seguem para T001–T017 e para a matriz WCAG por
rota/processo/estado. WCAG 2.2 foi reaberta na fonte W3C. Os 26 nodes ativos do
mapa responderam por metadados, mas não houve screenshot, browser, teclado,
leitor, contraste, reflow ou zoom. Ambiente publicado continua ausente, embora
planejado na 017. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

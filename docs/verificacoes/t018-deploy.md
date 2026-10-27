# Verificação T018 — Feature 017 e dependências de deploy

Data: 22 de outubro de 2026.

## Escopo

Execução exclusivamente documental da T018 de `docs/tasks.md`. O objetivo foi
transformar a pasta vazia `specs/017-deploy/` em um contrato executável no
futuro, sem escolher fornecedor, alterar código ou publicar o produto.

## Linha de base preservada

Antes das edições:

- `specs/017-deploy/` existia e tinha zero arquivos;
- `package.json` expunha `dev`, `build`, `preview` e `typecheck`, sem script
  agregado `test`;
- `vite.config.ts` não declarava `base` nem integração de deploy;
- não havia uso de `VITE_*`, `import.meta.env` ou `process.env` no frontend;
- não havia API, banco, worker, pipeline ou configuração de provedor;
- `src/` e `tests/` já continham alterações alheias à T018.

O diff de `src/` e `tests/` foi identificado pelo SHA-256
`ab5a297c4beec82f90d37feda874a4f758ddb975911673316b9f6669453b220c` antes
da tarefa e permaneceu com o mesmo hash ao final. A T018 não alterou esses
diretórios.

## Arquivos criados

| Arquivo | Função |
| --- | --- |
| `specs/017-deploy/spec.md` | DP01–DP20, trilhos, gates e INF01–INF10 |
| `specs/017-deploy/plan.md` | Fases de decisão, frontend, agenda, promoção e rollback |
| `specs/017-deploy/tasks.md` | F017-01–F017-21 e rastreabilidade |
| `specs/017-deploy/implementation-plan.md` | Topologia, pipeline, cache, segurança, backend e testes publicados |
| `specs/017-deploy/quickstart.md` | Roteiro futuro local, publicado, sintético e de rollback |
| `specs/017-deploy/validation.md` | Parecer documental e pendências |
| `specs/017-deploy/verification.md` | Registro próprio da feature |

## Arquivos atualizados

- `docs/tasks.md`: T018 marcada como concluída documentalmente, com limites e
  próxima tarefa.
- `docs/plan.md`: a referência futura foi substituída pela feature estruturada.
- `specs/016-responsividade-acessibilidade/implementation-plan.md`: a ausência
  de plano da 017 deixou de ser tratada como lacuna; ambiente continua ausente.
- `specs/016-responsividade-acessibilidade/validation.md`: a dependência agora
  distingue planejamento de ambiente publicado.

## Decisões registradas

1. Frontend estático e agenda operacional são trilhos independentes.
2. A hospedagem deve servir `dist/` por HTTPS, com base pública aprovada,
   fallback de página e exclusão de assets e `/api`.
3. As 12 rotas oficiais, recarga, query/hash, 404 interna e asset 404 terão
   evidências separadas no ambiente publicado.
4. Valores `VITE_*` são públicos; o frontend atual não exige variável nova.
5. Carta, diagnóstico, prévia, CSV e suporte por cópia de e-mail não ganham
   backend por causa da agenda.
6. A agenda futura usa o contrato da 014: API/proxy, banco transacional,
   migrations, outbox, worker, segredos e ambiente sintético isolado.
7. Publicação estática futura pode ocorrer com a agenda indisponível/pausada,
   desde que não mostre ações nem promessas operacionais.
8. A agenda só abre após DP17, IN01–IN08 e ADR final aprovados.
9. Fornecedor, domínio, base, ambientes, stack e responsabilidades permanecem
   em INF01–INF10; nada foi inferido.

## Verificações executadas

| Check | Resultado |
| --- | --- |
| Quantidade de artefatos da 017 | 7/7 |
| Requisitos | DP01–DP20 presentes |
| Tarefas futuras | F017-01–F017-21 presentes e desmarcadas |
| Links relativos dos arquivos tocados | Válidos após criação deste registro |
| Whitespace/patch | `git diff --check` sem erro |
| Preservação de código/testes | Hash do diff inalterado |
| Build/typecheck/testes | Não executados; fora do escopo documental |
| Preview/servidor/deploy/migration | Não executados |

Também foram lidas as fontes locais de arquitetura, navegação, agenda e ADRs.
A documentação oficial do Vite sobre deploy estático, base pública e variáveis
foi consultada em 22/10/2026. Exemplos de provedores foram usados apenas para
confirmar o comportamento do Vite, não como seleção de plataforma.

## Pendências

- INF01–INF10: fornecedor, domínio/base, ambientes, segurança, stack, banco,
  worker/SMTP, segredos, privacidade e operação.
- IN01–IN08: decisões institucionais da agenda.
- implementação do contrato de navegação e aceites da 016.
- pipeline, ambiente não produtivo, PUB01–PUB12, AGD01–AGD05 e runbooks.
- T019: reexecutar validações por feature com o novo baseline.

## Conclusão

T018 **concluída documentalmente**. A feature 017 deixou de ser uma referência
sem plano e agora dá destino aos testes publicados e às dependências da agenda.
Nenhum deploy foi realizado e nenhuma prontidão operacional foi declarada.

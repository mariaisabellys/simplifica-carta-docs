# Verificação: Deploy e ambientes

## Registro de 22 de outubro de 2026 — T018

### Objetivo

Verificar a criação documental da feature 017 sem implementar ou publicar o
produto.

### Estado anterior confirmado

- `specs/017-deploy/` existia e não continha artefatos.
- O frontend possuía configuração Vite mínima e build local para `dist/`.
- Não havia configuração de provedor, pipeline, variáveis públicas consumidas ou
  backend da agenda.
- A navegação oficial e a feature 014 já registravam lacunas e bloqueios que não
  poderiam ser resolvidos por inferência nesta tarefa.

### Artefatos produzidos

1. `spec.md`
2. `plan.md`
3. `tasks.md`
4. `implementation-plan.md`
5. `quickstart.md`
6. `validation.md`
7. `verification.md`

### Checks executados

- inventário da pasta 017 e dos scripts/configurações locais;
- busca por uso de `VITE_*`, `import.meta.env` e `process.env`;
- leitura dos contratos de navegação, arquitetura, agenda e ADRs 003/004;
- revisão dos requisitos IN01–IN08 e da separação editorial/operacional;
- consulta da documentação oficial atual do Vite;
- conferência de links locais, rastreabilidade DP01–DP20 e tarefas F017-01–21;
- conferência final de whitespace com `git diff --check`;
- comparação do diff de `src/` e `tests/` com a linha de base da tarefa.

Os resultados dos checks mecânicos finais são registrados no relatório
[T018](../../docs/verificacoes/t018-deploy.md). Nenhum comando de build,
typecheck, teste, preview, servidor, migration ou deploy foi executado.

### Resultado

- Cobertura documental: **7/7 artefatos**.
- Deploy estático: **planejado, não executado**.
- Agenda operacional: **planejada e bloqueada**.
- Fornecedor/infraestrutura: **não escolhidos**.
- Produção: **não publicada nem autorizada**.

### Pendências

INF01–INF10, IN01–IN08, implementação da navegação, pipeline, ambiente, testes
publicados e todos os gates da agenda. Essas pendências não impedem o fechamento
documental da T018; impedem qualquer declaração de prontidão operacional.

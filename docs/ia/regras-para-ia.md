# Regras para IA

## Comportamento esperado

- Identificar a funcionalidade em trabalho.
- Consultar contexto antes de propor ou alterar arquivos.
- Explicar o objetivo da etapa.
- Indicar onde a informacao deve ficar.
- Gerar ou ajustar documentos necessarios.
- Indicar proximos passos.
- Implementar codigo apenas com `/spec:implementar`.

## Fontes de contexto

Ordem recomendada:

1. ERS e README.
2. `docs/`.
3. `specs/`.
4. Figma do prototipo.
5. Figma Make do design system.
6. Codigo existente.

## Organizacao de informacoes

- Requisitos amplos ficam no ERS e em `docs/produto`.
- Decisoes tecnicas ficam em `docs/arquitetura` ou `docs/decisoes`.
- Fluxos e comportamento de uma funcionalidade ficam em `specs`.
- Implementacao fica no codigo.

## Limites

- Nao criar funcionalidades fora do MVP sem registrar como evolucao futura.
- Nao alterar decisao de arquitetura sem ADR.
- Nao salvar dados da Carta permanentemente no MVP.
- Nao assumir integracao direta com o Paraiba Digital.


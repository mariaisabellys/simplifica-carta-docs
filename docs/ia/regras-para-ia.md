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

## Regra obrigatoria para trabalho visual

Quando a tarefa envolver tela, componente visual, tokens, estilos, layout, responsividade ou aderencia visual, o Codex deve consultar o Figma Make via MCP antes de implementar.

Parametros oficiais:

```txt
fileKey: dVm7lEZdBFqOiiySWLWUqp
nodeId: 0:1
```

O objetivo da consulta e usar o Figma Make como referencia tecnica ativa para:

- tokens;
- componentes;
- tipografia;
- espacamento;
- cards;
- botoes;
- formularios;
- navegacao;
- comportamento responsivo.

Se o MCP nao retornar informacao suficiente, o Codex deve avisar antes de implementar visualmente e solicitar link `/design/...`, exportacao ou captura especifica.

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

# Plan: Validação em linguagem simples

## Objetivo

Implementar o contrato de `spec.md` integrado à Carta v3 da 007 e separado da
validação estrutural/obrigatória.

Revisão documental T007 em 19/10/2026: seguir o
[contrato operacional](contrato-validacao-editorial.md), incluindo matriz de
25 campos, mensagens MSG01–MSG17 e fixtures VE01–VE18. Código não alterado.

## Decisões

- Remover a regra provisória de 240 caracteres.
- Contar palavras significativas por frase: no máximo 20; review a partir de 21.
- Excluir somente artigos, preposições e contrações do catálogo versionado.
- Medir linhas somente no elemento visual; nunca por caracteres.
- Manter catálogo versionado de termos e alternativas contextuais.
- Tratar voz passiva e impessoalidade como heurísticas explicáveis.
- Manter hierarquia como checklist manual até haver mecanismo validado.
- Nunca aplicar substituições automaticamente.

## Arquitetura

Reutilizar o [contrato de contagem](../../docs/arquitetura/contrato-contagem-palavras.md)
da 007/008, incluindo catálogo e fixtures CP01–CP13. A contagem será uma função
compartilhada; somente a 008 segmenta frases. O helper atual da 007 ainda precisa
ser adaptado; a T005 documental não entrega código nem testes funcionais.

Criar `src/content/validation/linguagem-simples.ts` com limiares, catálogo,
mensagens, exemplos e checklist. Criar `carta.language.ts` com funções puras de
segmentação, contagem, catálogo e heurísticas.

O resultado deve conter `ruleId`, `severity`, `targetId`, `fieldPath`, `excerpt`
e `message`, intervalos originais, versão/revisão e estado por regra.
Severidades: `guidance` e `review`; estados agregados incluem falha,
inconclusivo, não analisado e não aplicável além de aprovado/revisão necessária.
Guidance isolada não reprova, mas checklist pendente impede aprovação.

A interface mede cada parágrafo em geometria equivalente ao campo; não usa
`scrollHeight / lineHeight` global. Espelho para input/textarea reproduz largura
útil/fonte/quebra sem padding/min-height. Recalcular conteúdo, resize, zoom e fonte;
campo oculto ou geometria não confiável retorna inconclusivo, conforme contrato.

## Acionamento e integração

- Após blur do campo alterado e na ação explícita “Revisar”.
- Medição visual após render estável, sem bloquear digitação.
- Invalidar resultados quando texto, aplicabilidade ou item mudar.
- Reutilizar paths e IDs estáveis da Carta v3.
- Não usar `aria-invalid` para orientação/revisão editorial.
- CSV, prévia e cópia recebem sempre os valores originais.

## Testes

- Fronteiras 0/20/21 palavras significativas; múltiplas frases, abreviações e Unicode.
- Artigos, preposições, contrações, caixa, acentos e tokens não catalogados.
- Catálogo: caixa, acento, construção inteira, substring, explicação e contexto.
- Passiva/ativa e impessoal/direto com positivos e negativos.
- Estado agregado com guidance, review e checklist.
- Pureza e IDs de itens reordenados/removidos.
- Linhas reais em larguras, zoom e fontes distintos; falha inconclusiva.
- Teclado, leitor de tela, resumo, foco e anúncios.

## Riscos

| Risco | Tratamento |
| --- | --- |
| Segmentação incorreta | Fixtures em português e resultado explicável. |
| Falso positivo gramatical | Heurística conservadora e revisão humana. |
| Linha variar com layout | Medir no elemento real e recalcular. |
| “Aprovado” parecer certificação | Limitar a copy às regras avaliadas. |
| Tabela ambígua | Validar editorialmente antes do código. |

## Ordem

1. Aprovar tabela/copy (V008-01/V008-03), mantendo pares e ressalvas contextuais.
2. Criar tipos, conteúdo e fixtures.
3. Implementar/testar motor puro.
4. Integrar formulário da 007.
5. Implementar/testar medição visual.
6. Integrar resumo e consumidores.
7. Validar documentação, testes, acessibilidade e build.

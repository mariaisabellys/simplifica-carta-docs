# Implementation Plan: Validação em linguagem simples

## Estado

Atualizado em 27 de outubro de 2026. Catálogo `ls-pt-BR-v1` e mensagens
`msg-pt-BR-v1` estão aprovados; nenhuma regra nova está implementada. O helper
de 240 caracteres é legado.

## Contratos técnicos

```ts
type LanguageRuleId =
  | "sentence-length"
  | "paragraph-lines"
  | "unexplained-jargon"
  | "active-voice"
  | "direct-address"
  | "information-hierarchy";

type LanguageSeverity = "guidance" | "review";
type LanguageStatus = "aprovado" | "revisao-necessaria" | "falha"
  | "inconclusivo" | "nao-analisado" | "nao-aplicavel";

type LanguageOccurrence = {
  id: string;
  ruleId: LanguageRuleId;
  severity: LanguageSeverity;
  targetId: string;
  fieldPath: string;
  excerpt?: string;
  message: string;
  textRevision: number;
  ruleVersion: string;
  originalRange?: { start: number; end: number };
};
```

O review agregado contém status, ocorrências, resultados por regra e checks
manuais vinculados à revisão. Seguir o [contrato operacional](contrato-validacao-editorial.md)
para estados, precedência, matriz de campos, detecção e mensagens.
IDs derivam de regra + alvo estável + revisão + intervalo original + entrada,
não do índice visual. Guidance só permite aprovado quando todas as análises e
confirmações necessárias estão atuais e completas. Intervalos usam índices
UTF-16 do texto original; normalização exige mapa de offsets, não índices da cópia.

## Conteúdo versionado

`src/content/validation/linguagem-simples.ts` deve exportar:

```ts
export const languageLimits = {
  maxSignificantWordsPerSentence: 20,
  sentenceReviewFromSignificantWords: 21,
  paragraphReviewFromVisualLines: 5,
} as const;
```

O arquivo também conterá catálogo, sugestões, exemplos e mensagens. A tabela
executável deve reproduzir exatamente as versões aprovadas em V008-01/F008-01.

## Motor textual

Aplicar o [contrato único de contagem](../../docs/arquitetura/contrato-contagem-palavras.md)
e suas fixtures CP01–CP13. Compartilhar a função com a validação estrutural da
007, sem duplicar o catálogo de exclusões. A contagem do campo inteiro permanece
independente da avaliação editorial por frase. A adaptação do helper atual ainda
não foi implementada.

1. Analisar uma cópia, sem normalizar a Carta.
2. Usar `Intl.Segmenter("pt-BR", { granularity: "sentence" })` e fallback local.
3. Contar tokens Unicode completos e excluir somente artigos, preposições e
   contrações presentes no catálogo versionado.
4. Gerar review a partir de 21 palavras significativas e informar o total.
5. Procurar construções inteiras em cópia normalizada e devolver trecho original.
6. Aplicar heurísticas conservadoras de passiva e impessoalidade.
7. Incluir hierarquia nos checks manuais.

Não usar tamanho total do campo como substituto de frase ou parágrafo.

## Medição visual

- Medir cada parágrafo por geometria de linhas ou espelho equivalente validado,
  sem usar altura total do campo. Seguir contrato para input/textarea, padding,
  scrollbar, min-height, parágrafos e tolerância máxima de 0,1 linha.
- Reavaliar com conteúdo, `ResizeObserver` e carregamento da fonte.
- Review a partir de cinco linhas visuais.
- Sem geometria confiável, retornar `unknown` e agregado inconclusivo.
- Invalidar LS02 ao mudar layout/fonte/zoom; não invalidar checklist semântico
  só por resize. Campo oculto não recebe aprovação automática.
- Teste DOM não substitui verificação em navegador real.

## Integração

- Adaptar cada campo/item textual da Carta v3 a alvo estável.
- Campo vazio não recebe sugestão; obrigatoriedade usa motor separado.
- Blur analisa o alvo; revisão explícita avalia o snapshot atual.
- Alteração invalida resultados do alvo imediatamente.
- Resultado fica derivado em memória, fora do payload da Carta.
- CSV, prévia e cópia recebem o valor original.

## UI e acessibilidade

- Guidance e review editorial não usam `aria-invalid`.
- Erro estrutural continua separado e pode bloquear CSV.
- Resumo segue a ordem do formulário e permite abrir/focar o campo.
- Região de status anuncia uma vez após revisão explícita.
- Trechos são exibidos como texto, nunca HTML interpretado.

## Arquivos previstos

| Arquivo | Alteração |
| --- | --- |
| `src/content/validation/linguagem-simples.ts` | Fonte editorial. |
| `src/features/carta/carta.language.types.ts` | Contratos. |
| `src/features/carta/carta.language.ts` | Motor puro. |
| `src/features/carta/carta.language.targets.ts` | Alvos da Carta v3. |
| `src/lib/validation.ts` | Remover heurística legada. |
| Formulário 007 | Integrar revisão, mensagens e checklist. |
| Testes | Regras, integração, DOM, navegadores e acessibilidade. |

## Gate

F008-01 está concluída. Antes da entrega integrada: confirmar correspondência
exata das versões executáveis, integração real com paths/IDs da 007 e estados
no Figma/design system, sem inventar página independente.

## Evidência esperada

| Critério | Evidência |
| --- | --- |
| CA01–CA03 | Fronteiras 20/21, catálogo de exclusões e tokens não catalogados. |
| CA04 | Geometria e verificação responsiva. |
| CA05–CA06 | Catálogo, substring, caixa, acento e explicação. |
| CA07–CA09 | Positivos/negativos e checklist. |
| CA10–CA11 | Agregação e copy limitada. |
| CA12–CA13 | Pureza, consumidores e IDs. |
| CA14 | Teclado/leitor com foco e anúncio. |
| CA15–CA18 | VE02–VE06 e VE09–VE18: estados incompletos, geometria por bloco, perfis e catálogo. |

Cada VE01–VE18 do contrato é requisito de teste futuro, não teste executado.
Motor textual, medição e checklist são adaptadores separados; falta de qualquer
análise necessária impede aprovado, nunca as ações permitidas ao usuário.

# Contrato de contagem de palavras significativas

Versão documental 1 — 19/10/2026, T005 de `docs/tasks.md`. Fonte normativa única
para a contagem compartilhada entre 007 e 008. Não representa implementação.

## Dois escopos, uma contagem

| Consumidor | Unidade avaliada | Limite e consequência |
| --- | --- | --- |
| 007 — descrição | Campo inteiro, somando todas as frases | Até 20 significativas; 21 ou mais é erro estrutural e pode impedir CSV/conclusão. |
| 008 — LS01 | Cada frase separadamente | Até 20 significativas sem ocorrência de comprimento; 21 ou mais gera revisão editorial, nunca bloqueio de CSV, navegação, prévia ou cópia. |

Ausência de ocorrência LS01 não aprova as demais regras editoriais. Zero palavras
significativas atende ao limite máximo, mas não comprova preenchimento ou qualidade:
obrigatoriedade e demais regras continuam independentes. Nunca truncar nem reescrever
automaticamente o texto para satisfazer o limite.

## Algoritmo determinístico

1. Analisar uma cópia do texto normalizada em Unicode NFC. Preservar o original
   na sessão, prévia, CSV e cópia.
2. Extrair tokens pela expressão Unicode
   `/[\p{L}\p{N}][\p{L}\p{M}\p{N}]*(?:[-’'][\p{L}\p{N}][\p{L}\p{M}\p{N}]*)*/gu`.
   Letras e números iniciam tokens; marcas combinantes podem continuá-los.
3. Converter cada token para minúsculas em português (`pt-BR`) apenas para
   comparação. Não remover acentos, não radicalizar nem substituir palavras.
4. Excluir somente tokens inteiros presentes na união do catálogo abaixo.
   Duplicatas do catálogo não afetam o resultado. Não excluir por substring.
5. Contar os tokens restantes. Repetições contam individualmente.

Espaços, quebras de linha e pontuação delimitam tokens; não contam. Números
contam, inclusive quando misturados a letras. Hífen ASCII, apóstrofo reto e
apóstrofo tipográfico entre segmentos mantêm um único token (`segunda-via`,
`d'água`, `d’água`). Não decompor compostos para excluir partes. Travessões e
outros tipos de hífen são separadores. Símbolos e emojis não contam.
Pontos, vírgulas e barras separam tokens: `2,5` conta dois; `12/08/2026` conta
três. Esta é uma convenção lexical, não uma interpretação de números ou datas.

## Catálogo único de exclusões

- Artigos: `o`, `a`, `os`, `as`, `um`, `uma`, `uns`, `umas`.
- Preposições: `a`, `ante`, `após`, `até`, `com`, `contra`, `de`, `desde`, `em`,
  `entre`, `para`, `perante`, `por`, `sem`, `sob`, `sobre`, `trás`.
- Contrações: `ao`, `aos`, `à`, `às`, `do`, `da`, `dos`, `das`, `dum`, `duma`,
  `duns`, `dumas`, `no`, `na`, `nos`, `nas`, `num`, `numa`, `nuns`, `numas`,
  `pelo`, `pela`, `pelos`, `pelas`.

Catálogo preservado da LS01, sem novas exclusões. A união possui 48 entradas.
“Palavra significativa” é aqui uma definição operacional, não uma classificação
gramatical contextual: `a`, `um` e `para` são excluídos mesmo se usados como
pronome, numeral ou verbo. Conjunções, pronomes e contrações não catalogadas
continuam contando, por exemplo `e`, `você`, `dele`, `naquele`. `ate` conta;
`até` não. Alterar essa aproximação exige revisão versionada compartilhada,
nunca listas diferentes por feature.

## Frases e apresentação

A 007 não segmenta frases para aplicar seu limite. A 008 segmenta antes de
contar, conforme seu plano (`Intl.Segmenter` e fallback futuro). Pontuação
decimal e abreviações não devem ser confundidas com fim de frase. A equivalência
entre segmentador e fallback ainda exige fixtures e testes na implementação da
008; esta tarefa não declara essa implementação validada. As fixtures abaixo
usam limites de frase inequívocos.

A ajuda atual da 007, “Use até 20 palavras significativas.”, permanece coerente.
Complemento previsto para implementação: “Artigos, preposições e contrações do
catálogo não entram na contagem. O limite vale para toda a descrição.” O contador
deve identificar significativas, não apresentar total bruto como se fosse esse
resultado. A 008 informa a contagem da frase apontada. Não modificar o conteúdo
TypeScript nesta tarefa documental.

## Fixtures normativas

`R(n)` significa a palavra `serviço` repetida n vezes, separada por espaços.
Os totais abaixo contam tokens antes e depois das exclusões, respectivamente.

| ID | Entrada | Total | Significativas | Resultado esperado |
| --- | --- | --- | --- | --- |
| CP01 | Texto vazio | 0 | 0 | Sem excesso; obrigatoriedade independente. |
| CP02 | `R(20)` | 20 | 20 | Limite atendido. |
| CP03 | `R(21)` | 21 | 21 | Estrutural na descrição; review se frase da 008. |
| CP04 | `de para o a` seguido de `R(20)` | 24 | 20 | Limite atendido apesar do total bruto. |
| CP05 | `de para o a` seguido de `R(21)` | 25 | 21 | Excesso em ambos os escopos de uma frase. |
| CP06 | `R(11) + ". " + R(11) + "."` | 22 | 22 | Descrição excede; cada frase tem 11, sem ocorrência LS01. |
| CP07 | `O DE PARA À até ate ação` | 7 | 2 | Contam apenas `ate` e `ação`. |
| CP08 | `ação` em NFC e a mesma palavra em NFD, separadas por espaço | 2 | 2 | Normalização equivalente; original preservado. |
| CP09 | `segunda-via d'água d’água` | 3 | 3 | Compostos inteiros, sem excluir partes. |
| CP10 | `20 2,5 12/08/2026` | 6 | 6 | Números e separadores seguem regra lexical. |
| CP11 | `a um para e você dele naquele` | 7 | 4 | Exclusão lexical mesmo com possível ambiguidade. |
| CP12 | `pedido pedido — enviar\nCPF 😊` | 4 | 4 | Repetição conta; quebra, travessão e emoji não. |
| CP13 | `de devolver para parabenizar` | 4 | 2 | Sem exclusão por substring. |

## Implementação ainda pendente

`src/features/carta/carta.validation.ts` usa `contarPalavras`, que atualmente
conta tokens totais, sem catálogo de exclusões. Adaptar esse helper ou substituí-lo
por função compartilhada e testar os dois consumidores com estas fixtures.
Não manter duas implementações independentes. A localização técnica final e a
integração pertencem à implementação, não à conclusão documental da T005.

009, 010 e 012 consomem os valores originais e os resultados estruturais da
Carta, sem recontar com uma regra própria. Em especial, 010 não transforma
revisão editorial em impedimento de exportação. MC-01 fica resolvida quanto ao
contrato documental, mas a divergência do código permanece até adaptação/testes.

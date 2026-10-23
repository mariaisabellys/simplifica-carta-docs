# Validação atual: Diagnóstico de serviço público

## Parecer

Validação documental registrada em 22/10/2026. Foram confrontados os artefatos,
perguntas, respostas, condições, ações, tipos atuais, duas rotas e T015/T016.

Resultado: **regra e conteúdo documentados, implementação integrada ainda
bloqueada por migração técnica e testes exaustivos**.

## Achados

| ID | Estado | Evidência/encaminhamento |
| --- | --- | --- |
| V005-01 | resolvido documentalmente | Oito perguntas, três respostas, precedência, cinco resultados e ações possuem fontes. |
| V005-02 | resolvido documentalmente | Resultado inválido retorna com replace; restart e CTAs têm destinos T015. |
| V005-03 | aberto para implementação | Questionário e resultado atuais ainda renderizam placeholders/lista, sem sessão interativa. |
| V005-04 | aberto para implementação | `diagnostico.types.ts` mantém contrato legado; alinhar aos IDs/valores aprovados. |
| V005-05 | aberto para testes | Enumerar `3^8` combinações, precedência/contradições, acesso inválido e cliques repetidos. |
| V005-06 | aguardando visual | Nodes `387:1020`/`387:1362` identificados, sem inspeção visual T016. |

O quickstart menciona `npm run test`, script inexistente hoje. Antes de executar,
usar o runner realmente adotado ou adicionar script em implementação autorizada;
esta validação não executou nem aprovou testes.

## Revalidação T019 — 22/10/2026

Parecer atual: **regra e conteúdo coerentes; jornada integrada pendente**. A
comparação estática confirmou oito perguntas, cinco resultados, pergunta 5 não
obrigatória e pergunta 8 usada para o subtipo. T008/T012–T045 ainda cobrem tipos,
enumeração `3^8`, sessão, UI e testes. Os nodes `387:1020` e `387:1362`
responderam por metadados, sem validar estados visuais. Ver a
[matriz T019](../../docs/verificacoes/t019-validacoes-features.md).

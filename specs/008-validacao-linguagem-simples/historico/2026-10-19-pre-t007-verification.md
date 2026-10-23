# Verificação: Validação em linguagem simples

## Estado

Em 18 de outubro de 2026, os documentos foram atualizados para o novo Guia. A
implementação não foi alterada nem verificada funcionalmente.

`src/lib/validation.ts` ainda contém a heurística legada de 240 caracteres. Ela
está marcada para substituição, não é fonte normativa vigente.

## Conferências documentais

- O mesmo limite de 20 palavras significativas e o catálogo de exclusões
  aparecem em todos os artefatos.
- Parágrafos usam medição visual e fallback inconclusivo.
- Catálogo normalizado e ambiguidades estão explícitos.
- Os 21 pares adicionais foram registrados na ordem fornecida e permanecem
  pendentes de aprovação editorial antes da implementação.
- Voz, tratamento e hierarquia têm regra, limite e teste.
- Estados/severidades não transformam sugestão em bloqueio de CSV.
- A integração aponta para a Carta v3 da 007.

## Evidências pendentes

- aceite editorial V008-01–V008-03;
- implementação e testes do motor;
- integração com campos reais da 007;
- medição em navegadores e larguras reais;
- teclado e leitor de tela;
- typecheck, testes e build após implementação.

Até lá, a feature está documentada e planejada, mas não implementada nem
aprovada funcionalmente.

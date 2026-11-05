# Referência visual local — 008 Validação em linguagem simples

## Natureza da feature

A 008 não possui rota ou página independente. Ela integra campos, mensagens e
resumo da 007. Criar tela autônoma contrariaria sua spec.

Referências normativas:

- [parte 1 do formulário](../007-formulario-carta-servico/parte-1-desktop.png),
  para mensagem contextual junto ao campo;
- [partes 2–5](../007-formulario-carta-servico/visual-spec.md), para os mesmos
  slots de mensagem, resumo, navegação e prévia;
- `specs/008-validacao-linguagem-simples/contrato-validacao-editorial.md`.

## Contrato visual e responsivo

- orientação contextual fica depois do controle relacionado;
- resumo precede abas/formulário e permite localizar o alvo;
- guidance/review usam texto e ícone, sem depender só de cor;
- erro estrutural da 007 permanece separado;
- status agregado anuncia uma vez após revisão explícita;
- sugestões preservam o original e nunca substituem texto automaticamente;
- após edição, o alvo volta a `nao-analisado`;
- mensagens acompanham a largura do campo, quebram sem overflow e empilham ações
  no mobile.

O `Aplicar sugestão` visível na parte 1 é histórico. O contrato atual exige
decisão editorial consciente antes de qualquer alteração.

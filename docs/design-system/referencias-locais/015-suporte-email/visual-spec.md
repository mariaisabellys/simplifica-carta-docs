# Referência visual local — 015 Suporte por e-mail

## Propriedade visual

A feature 015 não possui frame ou página visual independente. Ela reutiliza a
entrada compartilhada da 014, node `425:201`, extraída em 04/11/2026:
[entrada-desktop.png](../014-atendimento-agendado/entrada-desktop.png), 1440 × 1176.

- rota direta: `/ajuda/suporte-email`;
- composição visual: header, banner de ajuda e os dois cards da entrada;
- contrato: `docs/arquitetura/contrato-canais-ajuda.md`;
- conteúdo: `src/content/ajuda/suporte-email.ts` e fontes em `src/content/support/`.

Ao entrar diretamente, a página mantém a composição compartilhada, direciona o
foco à região do card de e-mail e não transforma o card de atendimento em uma
segunda página. O estado do atendimento continua visível conforme o contrato.

## Estados e ação

- ativo: endereço integral, instrução e `Copie o e-mail`; a string copiada é
  exatamente `supportContacts.gesed.email`;
- pendente/pausado: aviso e endereço de referência selecionável, sem botão ou
  incentivo para contato;
- inválido/ambos indisponíveis: orientações e retornos, sem ação operacional;
- copiando/sucesso/falha: feedback local por campo, alternativa manual e foco
  estável; não anunciar recebimento, entrega ou resposta.

O frame mostra `Enviar E-mail`, mas essa é uma decisão visual histórica. Não
abrir aplicativo, não criar `mailto`, não enviar mensagem e não inventar assunto.

## Responsividade e acessibilidade

Em telas estreitas, os cards empilham e o card de e-mail ocupa largura natural.
O endereço pode ser selecionado por teclado/toque, não usa elipse nem quebra
artificial no payload e tem nome acessível. O botão de cópia expõe pending,
sucesso e falha sem roubar foco; a entrada mantém breadcrumb, retorno à ajuda e
um único `main`/`h1`.

## Limite de evidência

Não há captura específica da 015: o manifesto aponta deliberadamente para a
entrada da 014. A referência local substitui consulta obrigatória ao Figma para
composição; clipboard real, estados editoriais, ERS, revisão institucional e
integração operacional continuam pendentes.

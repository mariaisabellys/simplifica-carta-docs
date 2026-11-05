# Referência visual local — 014 Atendimento agendado

## Proveniência e estados

Figma `YaVUdqYa3boHpvGrxf4ZJ5`, extraído em 04/11/2026. Os quatro frames são
estados da rota `/ajuda/atendimento-agendado`, não páginas independentes.

| Estado | Node | Captura | Dimensão |
| --- | --- | --- | --- |
| Entrada compartilhada com 015 | `425:201` | [entrada-desktop.png](entrada-desktop.png) | 1440 × 1176 |
| Seleção de data e horário | `425:296` | [horario-desktop.png](horario-desktop.png) | 1440 × 1480 |
| Dados e revisão | `446:206` | [revisao-desktop.png](revisao-desktop.png) | 1440 × 1320 |
| Solicitação registrada | `470:444` | [solicitacao-desktop.png](solicitacao-desktop.png) | 1440 × 1320 |

Conteúdo: `src/content/ajuda/atendimento-agendado.ts`. Contratos:
`specs/014-atendimento-agendado/contrato-agenda.md` e
`docs/arquitetura/contrato-canais-ajuda.md`.

## Composição compartilhada

Header, banner em gradiente, breadcrumb, título e ilustração de interrogações
antecedem o estado de trabalho. A entrada apresenta dois cards lado a lado:
atendimento e e-mail. Ela também é reutilizada pela rota 015, que direciona foco
ao card de e-mail; nenhuma terceira composição deve ser criada.

Ao abrir o atendimento ativo, o conteúdo abaixo do banner vira jornada de três
passos: escolha de data/horário, preenchimento/revisão e resultado. O progresso
é informativo e precisa de rótulos além de cor. O footer permanece compartilhado.

## Estados funcionais

- entrada: cards refletem estados editoriais atuais; atendimento pendente ou
  pausado não abre calendário;
- calendário: loading, vazio, falha, retry, datas e horários reais são estados
  distintos; os valores da captura são exemplos, nunca disponibilidade inicial;
- dados/revisão: sete campos do conteúdo versionado, seis obrigatórios e uma
  descrição opcional; labels e erros pertencem a controles HTML reais;
- envio: ocupado, rejeição de validação, conflito, indisponibilidade, resultado
  incerto e recuperação preservam dados/chave conforme o contrato;
- resultado: somente Receipt válido permite `Solicitação registrada`, referência
  e snapshot de data/horário; não certifica atendimento agendado.

## Divergências normativas

O Figma usa `Agendar Atendimento`, `Confirmar agendamento`, `Atendimento agendado
com Sucesso!`, promessa de e-mail e ação `Reagendar`. Esses textos e comportamentos
não são normativos. Usar `Consultar datas e horários`, `Confirmar solicitação` e
`Solicitação registrada`; não prometer confirmação, mensagem enviada ou permitir
reagendamento sem contrato. Dados pessoais e datas dos frames são ilustrativos.

A captura `solicitacao-desktop.png` contém elementos do header/footer deslocados
e cortados no próprio frame exportado. Isso é defeito da referência, não alvo de
implementação: reutilizar shell íntegro e validar o estado central pela hierarquia.

## Responsividade e acessibilidade

- cards de entrada, calendário/horários e colunas do formulário empilham antes
  de comprimir conteúdo;
- tabela/calendário usa botões com nomes completos e não depende apenas de cor;
- datas indisponíveis não são focáveis como ações; horário selecionado mantém
  estado acessível;
- erros são associados aos campos e o resumo/foco segue a primeira pendência;
- mudanças explícitas focam o título do novo estado; atualizações de agenda,
  rede ou recuperação não roubam foco;
- nenhum dado pessoal, chave ou horário é colocado em query/hash.

## Limite de evidência

Os frames cobrem somente desktop e caminhos felizes históricos. Não comprovam
API, agenda, CSRF, concorrência, recuperação, estados não ativos, privacidade ou
acessibilidade. O pacote local substitui consulta obrigatória ao Figma, mas não
libera produção enquanto IN01–IN08 e os testes do contrato estiverem pendentes.

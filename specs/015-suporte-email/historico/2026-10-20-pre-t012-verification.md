# Verificacao: Suporte por e-mail

> **Atualizacao em 16 de outubro de 2026:** o helper `mailto` entregue nesta
> rodada historica nao sera usado pela tela atual. O contrato vigente exibe e
> copia o endereco da GESED no layout do node `425:201`.

## Resultado

Executado `/spec:implementar 015-suporte-email` em 2026-10-05.
Entrega parcial: src/lib/mailto.ts e tests/mailto.test.mjs. criarMailto segue
o codigo base do plano: mailbox ASCII unico dentro do escopo documentado,
rejeicao de CR/LF/NUL no assunto e percent-encoding uma vez por componente.
Nao abre aplicativo ou envia mensagem. Nenhum contato real foi integrado.
T009 possui entrega isolada; nenhuma tarefa marcada concluida. Pagina
permanece placeholder; hook/controlador e interface ainda ausentes.

## Verificacao executada

| Check | Resultado |
| --- | --- |
| node --test tests/mailto.test.mjs tests/atendimento.attempt.test.mjs tests/clipboard.test.mjs tests/csv.test.mjs | 19 testes passaram, cinco novos de mailto |
| npm.cmd run typecheck | Passou |
| npm.cmd run build | Passou fora do sandbox para evitar bloqueio de leitura do esbuild previamente identificado; Vite 7.3.6 |

Fixtures sinteticas verificam acentos/Unicode, mais, espacos e delimitadores,
decodificacao sem dupla codificacao, ausencia de parametros extras, rejeicao
de endereco fora do escopo e quebras/NUL. Helper puro nao exige browser.
Regex e guarda do escopo previsto, nao validador universal ou prova de contato
ativo. Nenhum aplicativo aberto, clipboard acessado ou e-mail enviado. Testes
nao comprovam handler real, selecao manual, foco ou acessibilidade.

## Documentacao e pendencias

Analisados spec/plan/tasks/implementation-plan/validation da 015 e contratos
012–014/codigo. Plan/tasks/plano detalhado atualizados: contatos.ts guarda
ID/equipe/endereco, canais.ts guarda estado/aviso compartilhado, sem segunda
constante. V015-01 corrigido documentalmente; configuracao operacional ainda
nao implementada. Spec/validation intactos. Relatorio e quickstart adicionados;
alteracoes anteriores preservadas.

### Atualizacao de endereco e estados — 2026-10-07

- `gesed.semtd@gmail.com` foi confirmado como endereco editorial oficial a
  partir do documento mestre, sem inferir que a caixa esta operacional.
- Criada fonte unica de contato em `src/content/support/contatos.ts`.
- Criada configuracao compartilhada em `src/content/support/canais.ts` com
  estados `pendente | ativo | pausado`; suporte por e-mail e atendimento
  agendado iniciam como `pendente` por falta de validacao operacional.
- Em `pendente`, a pagina mostra o endereco somente como referencia documentada,
  com aviso, sem `mailto:` ou copia ativa.
- A entrada de ajuda passou a consumir IDs, destinos e estados canonicos,
  sem anunciar envio de e-mail ou agendamento disponivel.

Essas decisoes resolvem V015-01/V015-02 no contrato editorial. O estado ativo
continua condicionado a confirmacao da equipe e a testes do fluxo real.

### Atualizacao de produto — 2026-10-16

- O node `425:201` foi definido como referencia visual compartilhada.
- O canal de e-mail passou a `ativo` para exibicao e copia do endereco.
- A acao oficial e `Copie o e-mail`; `mailto:` nao integra a tela atual.
- Essa ativacao editorial nao comprova resposta, prazo, entrega ou leitura.

- Confirmar titularidade/atividade, assunto e textos antes de mudar o canal de
  `pendente` para `ativo`; o endereco editorial nao equivale a canal operacional.
- Constitution secao 6 exige: "Antes de implementar trabalho visual, o Codex
  deve consultar via MCP". Figma MCP indisponivel nesta sessao; Design/Make e
  ERS pendentes. Fonte: ../../docs/processo/constitution.md.
- Clipboard neutro entregue na 012 pode ser reutilizado; hook de trava/
  revisao/timers e consumidores faltam. Nao declarar corridas resolvidas.
- Navegacao/provider 002/007 e alternativa real 014 incompletos. Configuracao
  de canais ainda nao existe; mapa/tipos da 013 nao tornam canal operacional.
- Testes reais de handlers/browsers/leitores/reflow e aceite CA01–CA13
  continuam pendentes. Sem interface integrada, checks nao encerram criterios.

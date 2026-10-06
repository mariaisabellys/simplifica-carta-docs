# Verificacao: Suporte por e-mail

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

- V015-02 aberto: equipe decide referencia selecionavel/instrucao manual em
  pendente/pausado e avisos por estado. JSX candidato incondicional recebeu
  ressalva explicita antes de implementacao; nenhuma regra inventada.
- Confirmar titularidade/atividade/endereco e assunto/textos. Referencia
  gesed.semtd@gmail.com continua documental, sem novo contato ou status ativo.
- Constitution secao 6 exige: "Antes de implementar trabalho visual, o Codex
  deve consultar via MCP". Figma MCP indisponivel nesta sessao; Design/Make e
  ERS pendentes. Fonte: ../../docs/processo/constitution.md.
- Clipboard neutro entregue na 012 pode ser reutilizado; hook de trava/
  revisao/timers e consumidores faltam. Nao declarar corridas resolvidas.
- Navegacao/provider 002/007 e alternativa real 014 incompletos. Configuracao
  de canais ainda nao existe; mapa/tipos da 013 nao tornam canal operacional.
- Testes reais de handlers/browsers/leitores/reflow e aceite CA01–CA13
  continuam pendentes. Sem interface integrada, checks nao encerram criterios.

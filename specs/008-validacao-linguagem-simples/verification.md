# Verificação: Validação em linguagem simples

## Registro de 19/10/2026 — T007 documental

Autor: Codex. Base: HEAD 7948d35 e alterações locais anteriores preservadas.
[Registro de 18/10 preservado](historico/2026-10-19-pre-t007-verification.md).
Escopo: documentação; implementação e aceite funcional/visual não executados.

## Artefatos

Criado contrato-validacao-editorial.md. Atualizados spec, plan, tasks,
implementation-plan e validation/verification da 008, referência MC-12 da
matriz da 007 e docs/tasks.md. Preservados relatórios/lista de tarefas anteriores
no histórico. Nenhum arquivo de src foi alterado.

## Checks desta rodada

- Comparação da tabela LS03 antes/depois: preservadas as seis linhas originais
  e os 21 pares adicionais; aprovação continua pendente.
- Matriz editorial com 25 definições, incluindo filho document-name proposto;
  correspondência com matriz v3, sem omitir seletores, URL ou prazo.
- MSG01–MSG17, VE01–VE18 e CA01–CA18 presentes; rastreabilidade das tarefas.
- Conferência de 25 links locais válidos, git diff --check sem erros e ausência de diff em src.
- Conferência textual das seis condições de estado, checklist após edição,
  LS02 por bloco e não bloqueio editorial de CSV/cópia/prévia/navegação.

Os cenários VE são testes previstos, não execuções do motor. Conferência da
estrutura documental não comprova algoritmos, offsets, geometria, acessibilidade
ou integrações. Não foram executados build/typecheck/testes de aplicação.

## Pendências registradas em 19/10/2026

Aprovação V008-01/V008-03; implementação F008-02–09; consumidores, navegador,
teclado/leitores e build F008-10–12. Helper legado de 240 caracteres permanece,
assim como contagem total no helper da 007. Não declarar a feature concluída.

## Registro de aprovação — 27/10/2026

- V008-01 encerrada: `ls-pt-BR-v1`, 27 registros aprovados sem alteração de
  ordem ou conversão em substituição automática.
- V008-03 encerrada: `msg-pt-BR-v1`, MSG01–MSG17 aprovadas como copy editorial.
- Responsável registrado: usuário responsável pelo conteúdo do projeto, por
  solicitação explícita nesta execução.
- Escopo: aprovação editorial para implementação. Não é homologação da GESED,
  parecer jurídico, teste do motor ou aceite visual/acessível.
- F008-01 concluída; execução retoma em F008-02.

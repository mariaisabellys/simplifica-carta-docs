# Validacao: Formulario da Carta de Servicos

> **Validação histórica:** a divergência conteúdo/modelo foi resolvida pelo
> contrato v3; validação funcional e visual continua pendente.

## Resultado e escopo

Executado `/spec:validar 007-formulario-carta-servico` em 2026-10-05.
**Resultado: requer ajustes documentais; validacao integral das fontes e
aceite funcional permanecem pendentes.**

Esta rodada avalia SPEC, PLAN, TASK e IMPLEMENTATION-PLAN. Nao implementa
codigo, nao modifica os quatro artefatos avaliados e nao marca tarefas como
concluidas. Somente este relatorio foi criado. T006 registra uma validacao
com pendencias, e nao uma aprovacao sem bloqueios.

## Fontes analisadas e limites

- [spec.md](spec.md), [plan.md](plan.md), [tasks.md](tasks.md) e
  [implementation-plan.md](implementation-plan.md): requisitos, contratos,
  modelos, exemplos, recuperacao da sessao, testes e rastreabilidade.
- Constitution, prompts internos, roadmap `specs/README.md`, fluxos de
  produto e referencias locais de design consultadas na revisao documental.
- 002/003/006: acesso independente, shell, navegacao e retorno ao formulario.
- 008: obrigatoriedade geral e condicional, targets e revisao; 009: previa;
  010: contrato CSV; 011/012: tutorial e copia de campos ativos;
  013: ajuda sem perda da Carta; 016: acessibilidade e responsividade.
- Codigo existente: pagina placeholder, tipos/schema/storage/validacao/CSV
  da Carta, navegacao e componentes compartilhados; scripts de package.json.

O ERS PDF existe, mas nao foi extraido ou inspecionado. A verificacao de
ferramentas registrada na validacao da 006 nao encontrou Python/py/Poppler;
nao houve instalacao nesta rodada. O manual textual nao substitui o PDF.
Nenhuma ferramenta Figma utilizavel esta exposta nesta sessao. Referencias
locais a nodes nao constituem consulta ao Design ou Make, nem homologacao
visual. O frame completo do formulario e os textos institucionais ainda
precisam de confronto com as fontes oficiais.

### Atualizacao das referencias e do contrato visual — 2026-10-08

Foram identificadas cinco telas/partes: `653:1540`, `2024:269`, `641:58`,
`647:650` e `660:2533`. `653:1540` e o node principal da rota; os demais sao
partes/variantes da mesma jornada. `811:306`/`811:382` sao estados do Form-Card,
e `821:308` e a previa compartilhada com a 009.

O layout deve adaptar-se a `src/content/pages/formulario-carta.ts`, sem usar
copy do Figma como segunda fonte. Orientacoes derivam da 006 por ID. O formulario
mostrado como imagem em `2024:269` deve ser reconstruido com controles reais,
nunca incorporado como imagem interativa. A identificacao dos nodes esta
resolvida; consulta MCP detalhada e validacao visual continuam pendentes.

Permanece uma divergencia de conteudo/modelo: a 006 possui orientacoes para
keywords, prazo e recorrencia sem controles equivalentes no conteudo atual da
007, enquanto a spec/modelo 007 ainda cita criterios, canais e prazo. Resolver
essa consolidacao antes do codigo, sem deixar o Figma decidir campos.

## Inconsistencias e lacunas documentais

| ID | Gravidade | Evidencia | Impacto e correcao indicada |
| --- | --- | --- | --- |
| V007-01 | Media | SPEC CA19–CA24; TASK T018 e tabela de rastreabilidade incluem os seis criterios. PLAN, tabela Criterios/Evidencia, termina em CA17–CA18. IMPLEMENTATION-PLAN, Rastreabilidade e aceite, termina em CA18. | Completar ambas as matrizes com ausencia de agendamento, sistema nativo, externo dentro/fora, troca de sistema e obrigatoriedade condicional. Vincular evidencias a T018/T019/T022–T025, incluindo preservacao dos valores ocultos e exclusao dos consumidores ativos. O fluxo existe em prosa; a lacuna e de rastreabilidade, nao ausencia integral da regra. |
| V007-02 | Baixa | SPEC, linha 339: linha em branco entre CA18 e CA19. As linhas CA19–CA24 nao repetem cabecalho/separador de tabela. | Em Markdown com tabelas, a quebra encerra a tabela anterior; os novos criterios ficam fora dela. Remover a linha em branco ou fornecer cabecalho de tabela separado, mantendo IDs e texto. |
| V007-03 | Media | PLAN, tabela Consumidores e mudancas compativeis, linha da 010: menciona null, nome popular, listas e como agendar, mas nao explicita os quatro campos estruturados. A 010 atual define tipos, sistema, link e exibicao em linhas proprias, condicionadas ao estado ativo. | Atualizar a referencia resumida ao contrato atual da 010 e a exclusao de campos externos inativos. Nao implementar CSV completo na 007: sua adaptacao minima permanece distinta da entrega da 010. Evita usar a descricao antiga como inventario completo para CA13/T025. |

Nao foi identificada regra principal que ainda torne Link ou Exibicao
obrigatorios para Paraiba Digital. As lacunas acima nao autorizam remover a
preservacao de valores condicionais nem transformar modalidades em canais.

## Dependencias e decisoes pendentes

| ID | Ponto | Acao antes da entrega dependente |
| --- | --- | --- |
| P007-01 | ERS, copy e Figma sem confronto integral | Consultar fontes oficiais, confirmar frame/composicao e registrar evidencias em T001–T004 e CA18. Nao afirmar conformidade visual ou editorial nesta rodada. |
| P007-02 | API compartilhada de navegacao | A 002 propoe useAppNavigate retornando funcao; o exemplo Breadcrumb da 003 usa useNavigation retornando objeto. A propria 007 reconhece a divergencia nas linhas 523–526. Conciliar em 002/003 e entregar contexto/props antes de importar exemplos; nao criar contexto paralelo na 007. Ver tambem V006-03. |
| P007-03 | Decoder dos novos campos | O plano detalhado aceita v2 sem os quatro campos novos e exige enums/lista sem duplicatas. Seu algoritmo generico de listas descreve itens objeto; explicitar que essa regra trata documentos/canais/etapas e detalhar separadamente tiposAgendamento, uma lista de enums. Cobrir ausencia esperada em v2, valores invalidos, duplicatas, recuperacao parcial e politica de escrita em T009/T023. Nao supor descarte de modalidades validas. |
| P007-04 | Limites tecnicos candidatos | Consolidar 8 MiB/1000 itens, resposta a excesso e preservacao do registro original. Sao propostas tecnicas do plano, nao limites institucionais homologados. |
| P007-05 | URL e integracao externa | Consolidar protocolos aceitos e mensagens com a 008; nao inventar regra HTTPS exclusiva. A 007 registra configuracao: nao executa incorporacao, redirecionamento ou agendamento real. Mecanismo de integracao pertence ao sistema que consumir esses dados. |
| P007-06 | Retorno/foco e consumidores reais | Fechar IDs/targets dos grupos condicionais com 008/016 e testar retorno a campos/itens existentes. Validar CA13 somente quando previa, CSV e copia estiverem implementados sobre a mesma Carta. |
| P007-07 | Jornada e ambientes | A ordem de produto e diagnostico, organizacao e formulario, com acesso independente. Esclarecer a frase inicial da SPEC sobre suceder o diagnostico sem criar gate. Confirmar navegadores/leitores e registrar ambientes indisponiveis. |

Essas pendencias distinguem decisoes ainda abertas de regras ja definidas.
Nao e necessario decidir novamente se valores ocultos devem ser apagados:
o padrao documentado e preserva-los na sessao, inclusive apos recarga,
retirando apresentacao, obrigatoriedade e transferencia ativa.

## Regras e contratos consistentes

- Uma Carta temporaria compartilhada, cinco partes e 17 campos logicos;
  listas agregadas nao representam limite de itens.
- Necessita de agendamento admite null inicialmente. A resposta Nao oculta
  todas as configuracoes; Sim exige ao menos uma modalidade e um sistema.
- Online, Presencial ou ambos; sistema unico Paraiba Digital ou externo,
  independente dos canais de atendimento.
- Paraiba Digital identifica agendamento nativo e oculta Link/Exibicao.
  Sistema externo exige URL e escolha Dentro do Paraiba Digital ou Em uma
  nova pagina, com os respectivos significados de permanencia/redirecionamento.
- Troca para sistema nativo preserva dados externos inativos sem obrigacao
  ou transferencia. Orientacao e complemento opcional quando Sim.
- Cinco obrigatorios gerais mais condicionais da 008; previa parcial livre.
  A 007 nao deve duplicar engine nem impor requisitos universais adicionais.
- Legado false nao comprova resposta Nao e migra para null; false explicito
  no envelope v2 permanece Nao. Conteudo anterior nao infere novos enums.
- Recuperacao parcial/versao futura nao sobrescreve o original ao montar;
  indisponibilidade de storage permite edicao em memoria com aviso.
- 009/010/012 consideram apenas configuracoes ativas. IDs tecnicos nao sao
  exportados; dados continuam texto, sem execucao de HTML ou envio automatico.
- Cadastro oficial e manual; agendamento da Carta e distinto do pedido de
  suporte da 014. Nenhum backend ou migration e necessario nesta validacao.

## Codigo existente e verificacao futura

O codigo ainda possui formulario placeholder, exigeAgendamento booleano,
modelo sem os campos novos e storage com recuperacao superficial. O CSV
existente nao entrega o contrato planejado. Sao implementacoes futuras
explicitamente previstas; sua ausencia nao prova cumprimento dos criterios.

Nao foram executados build/typecheck como evidencia da funcionalidade nem
instaladas dependencias. package.json nao possui suite de testes configurada.
A verificacao futura deve cobrir reducer sem mutacao, IDs/ordem, decoder,
falhas de storage, ultimas edicoes e recarga; CA19–CA24 com ambos os tipos,
troca de sistema e consumidores; foco/grupos/erros, teclado e reflow.
Registrar resultados reproduziveis, ambiente, defeitos e retestes em T027.

## Arquivos alterados e proximo passo

Somente `specs/007-formulario-carta-servico/validation.md` foi criado nesta
execucao. SPEC, PLAN, TASK, IMPLEMENTATION-PLAN e codigo-fonte permaneceram
intocados por este comando. Nenhuma tarefa foi concluida automaticamente.

Corrigir V007-01–V007-03, fechar as dependencias aplicaveis e repetir a
validacao. Implementar apenas em etapa explicitamente autorizada para isso;
nao considerar este relatorio aprovacao institucional ou visual.

# Verificação T020 — Auditoria cruzada final

Data: 22 de outubro de 2026.

Escopo: auditoria documental cruzada dos contratos consolidados em
[`docs/spec.md`](../spec.md), sem implementar ou corrigir código funcional.
Base: estado local posterior à T019, com alterações preexistentes preservadas.

## Resultado

A T020 foi concluída documentalmente. Não foi encontrado conflito documental
crítico ativo nas áreas já liberadas. As matrizes vigentes de Carta, projeção,
CSV e transferência usam o modelo v3 e são compatíveis entre si. As
divergências restantes estão delimitadas como implementação ainda não entregue,
decisão de produto, aprovação editorial ou dependência institucional, com dono,
impacto e tarefa de resolução registrados abaixo.

Este parecer não representa aceite funcional, visual, assistivo, institucional
ou de produção.

## Buscas de regressão

Foram pesquisados nos documentos ativos paths v2, cardinalidades antigas,
restrições a dez blocos/seis botões, `mailto` e APIs divergentes de navegação.

- Paths v2 e contagens antigas remanescentes aparecem apenas em histórico,
  baseline de auditoria ou descrição explícita de divergência do código atual;
  não são instruções normativas ativas.
- A 012 exige 25 definições, repetição por item e 13 campos abertos copiáveis;
  a regra antiga de dez blocos/seis botões está registrada somente como
  precedente substituído.
- A 015 não contém requisito ativo de `mailto`. O helper e seu teste existentes
  são legado de código, não autorização para restaurar a ação.
- O contrato vigente de navegação define `NavigationProvider`,
  `useAppLocation`, `useAppNavigate` e `AppLink`. Menções a `onNavigate` em
  inventários ou relatórios descrevem o código provisório e não formam um
  segundo contrato.

## Cadeia da Carta — 006 a 012

| Verificação | Evidência | Resultado |
| --- | --- | --- |
| Orientações 006 | 3 tópicos, 13 informações e 12 orientações cobrem 24 das 25 definições; `ativo` é técnico/editorial e recorrência permanece complementar, sem path v3. | Coerente com o contrato vigente. |
| Matriz 007 | 25 definições, dez paths gerais, cinco regras condicionais K/S/E, IDs estáveis e cinco partes. | Fonte canônica confirmada. |
| Validação 008 | Matriz para 25 campos, regras LS01–LS06 e separação entre erro estrutural e revisão editorial. | Compatível; aprovação do catálogo/copy continua pendente. |
| Prévia 009 | 25 IDs, paths e condições comparados à 007. | Nenhuma diferença. |
| CSV 010 | 22 registros de dados agregam as 25 definições; com cabeçalho, são 23 registros lógicos. | Ordem e cardinalidade documentais coerentes. |
| Tutorial 011 | Contrato prevê cinco grupos, 25 campos, 13 abertos e 12 escolhas na etapa 4. | Documento coerente; conteúdo TypeScript ainda provisório. |
| Transferência 012 | 25 definições; 13 copiáveis, incluindo repetição por item, e 12 apenas exibidas. | Nenhuma diferença de ID, path ou condição frente à 009. |

A comparação automatizada das matrizes 007, 009 e 012 retornou `25/25/25`
linhas e zero divergências de ID, path ou condição. O conteúdo atual de
`src/content/tutorial/paraiba-digital.ts` ainda possui dez exemplos e seis
`copyLabel`; essa incompatibilidade é de implementação/conteúdo, bloqueia o
aceite integrado da etapa 4 e continua atribuída à tarefa T009 da feature 011.

## Cadeia de ajuda — 013 a 015

O contrato compartilhado mantém uma única origem para estado, endereço e ação
dos canais. No estado atual, e-mail está `ativo` e atendimento está `pendente`.
O resolvedor comum cobre entrada pela FAQ, entrada compartilhada, acesso direto,
`open-calendar`, `navigate` e `copy-email`, com apresentação conservadora para
estado ausente ou inválido.

Os 11 cenários de apresentação de canais passaram novamente. A interface da 015
ainda não consome `copyAction` para renderizar o botão de cópia, e a 014 ainda é
placeholder: são lacunas funcionais já atribuídas às tarefas vigentes das
features, não divergências entre seus documentos. A agenda permanece impedida
de alegar disponibilidade operacional até o fechamento de IN01–IN08 e da
ADR-004.

## Critérios de aceite

| ID | Parecer T020 | Evidência ou pendência concreta |
| --- | --- | --- |
| AC01 | Atendido documentalmente | Contrato ativo e matriz da 007 usam somente v3; ocorrências v2 estão segregadas como histórico ou diagnóstico. |
| AC02 | Atendido com decisões localizadas | 25 campos, IDs, paths, K/S/E e consumidores estão rastreados. MC-02–MC-08 continuam sob F007-01/F007-02 antes da implementação integral. |
| AC03 | Atendido documentalmente | 009–012 não instruem paths removidos; buscas remanescentes descrevem migração ou código provisório. |
| AC04 | Atendido documentalmente | Matriz 012 confirmou 25 campos, 13 abertos copiáveis e 12 escolhas apenas exibidas, com repetição e condições. |
| AC05 | Atendido documentalmente; código pendente | 011, seu contrato e o mapa reconhecem a expansão. `paraiba-digital.ts` permanece em 10/6 e deve ser sincronizado pela 011/T009. |
| AC06 | Atendido documentalmente | Contrato CSV registra 22 dados, 23 registros com cabeçalho, ordem e fixtures derivados da matriz. Execução funcional permanece para a implementação. |
| AC07 | Atendido documentalmente | 007/008 usam o contrato único de 20 palavras significativas e distinguem bloqueio estrutural de revisão editorial. |
| AC08 | Atendido documentalmente | As 12 orientações têm destinos explícitos; recorrência está classificada como complementar e não integra o modelo v3. |
| AC09 | Atendido documentalmente; UI pendente | 015 não exige `mailto`; 013–015 compartilham fonte e transições. Botão real de cópia permanece nas tarefas da 015. |
| AC10 | Atendido documentalmente | A 014 separa o que está decidido de IN01–IN08/ADR-004 e não afirma backend ou agenda operacionais. |
| AC11 | Atendido documentalmente; aceite visual pendente | Contrato de navegação e mapa visual são coerentes. Integração no app, inspeção visual e acessibilidade reais continuam explicitamente pendentes. |
| AC12 | Atendido documentalmente | Features 001–017 possuem sete artefatos ou justificativa vigente, conforme baseline T017/T018 e parecer T019. |
| AC13 | Atendido | Links, matrizes, IDs, testes direcionados, typecheck e `git diff --check` foram conferidos nesta rodada, com limites declarados. |
| AC14 | Reservado à T021 | A ordem existe no plano, mas sua publicação final é o objetivo explícito da próxima tarefa. |

## Pendências remanescentes e responsáveis

| ID | Tipo e impacto | Dono/tarefa de resolução |
| --- | --- | --- |
| P020-01 | Decisões MC-02–MC-08 impedem fechar validação e comportamento integral da Carta. | Feature 007, F007-01/F007-02 e tarefas relacionadas. |
| P020-02 | Catálogo e mensagens da linguagem simples ainda não têm aprovação editorial explícita. | Feature 008, F008-01; aprovação do responsável editorial. |
| P020-03 | Etapa 4 do conteúdo 011 ainda entrega 10 exemplos/6 ações, não a matriz 25/13/12. | Feature 011, T009; afeta a integração funcional com 012. |
| P020-04 | Registro de rotas do app possui 11 entradas e ainda não implementa integralmente as 12 rotas contratadas, incluindo `/explorar-por-etapas`. | Features 002/003, tarefas de navegação e interface ainda abertas, sob o contrato compartilhado. |
| P020-05 | Página 015 não materializa ainda a ação de copiar, embora o contrato e a fonte estejam corretos. | Feature 015, T008–T015. |
| P020-06 | Agenda e deploy dependem de decisões institucionais e operacionais. | Feature 014/017: IN01–IN08, INF01–INF10, F017-01/F017-02 e ADR-004. |
| P020-07 | Paráfrase do Decreto nº 9.756/2019 na 004 precisa de revisão editorial contra a ementa oficial já registrada pela T019. | Feature 004, revisão legal/editorial antes do aceite de conteúdo. |

As pendências P020-01–P020-07 não criam contratos documentais concorrentes.
Elas limitam a liberação funcional das respectivas features e devem permanecer
visíveis no roteiro de implementação da T021.

## Checks executados

- Comparação automatizada 007/009/012: 25 linhas em cada matriz; zero
  divergências de ID, path ou condição; 13 copiáveis e 12 escolhas na 012.
- Contagem automatizada 010: 22 registros de dados.
- Inspeção do conteúdo 011: dez campos de exemplo e seis `copyLabel` no código
  provisório.
- Inspeção de rotas: 11 entradas no registro atual, contra 12 contratadas.
- `node --test tests/navigation.test.mjs tests/clipboard.test.mjs tests/support.presentation.test.mjs`:
  22 testes aprovados, zero falhas.
- `npm run typecheck`: aprovado.
- Links Markdown locais ativos: 167 arquivos verificados, zero destinos
  ausentes; diretórios históricos foram excluídos desta contagem por não serem
  contratos vigentes.
- `git diff --check`: aprovado.

O hash do diff de `src/` e `tests/` foi comparado ao baseline da rodada. A T020
não editou código, conteúdo TypeScript nem testes; as alterações já presentes
nessas áreas pertencem às rodadas anteriores e foram apenas verificadas.

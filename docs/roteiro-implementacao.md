# Roteiro de implementação por dependência

Publicado em 23 de outubro de 2026, após a auditoria documental T020.

Revalidação seletiva em 27 de outubro de 2026: `/spec:validar` foi reexecutado
somente nas features com contratos alterados — 006–012, 014, 016 e 017. O
[registro consolidado](verificacoes/revalidacao-contratos-2026-10-27.md)
preserva fontes consultadas, resultados, checks e dependências ainda abertas.

Fontes: [spec da consolidação](spec.md), [plano documental](plan.md),
[tarefas documentais](tasks.md), [auditoria T020](verificacoes/t020-auditoria-cruzada-final.md)
e tarefas de cada feature.

## Leitura do estado

Este roteiro ordena trabalho futuro. **Pronta documentalmente** significa que a
feature pode iniciar suas tarefas de implementação, não que esteja pronta para
uso. **Pronta com dependência explícita** significa que há trabalho independente
possível, mas o aceite integrado depende de outra feature ou gate descrito.
**Bloqueada por decisão** significa que não se deve implementar o trecho afetado
antes da decisão indicada.

Nenhuma classificação abaixo substitui testes, comparação visual, auditoria de
acessibilidade, homologação institucional ou validação em ambiente publicado.

## Prontidão por feature

| Feature | Classificação | Pode iniciar | Gate para aceite integral |
| --- | --- | --- | --- |
| 001 — Fundação | Pronta com dependência explícita | Base técnica já existe; conferir integração durante o lote 1. | Navegação central, 404, metadados e ambiente publicado. |
| 002 — Home e navegação | Pronta documentalmente | T007–T014; depois T015–T029. | Inspeção visual real, rota 003 e verificações NV/016. |
| 003 — Explorar por etapas | Pronta documentalmente | T011–T032 após a API central de navegação estar disponível. | Registrar rota, validar quatro destinos e executar aceite visual/acessível. |
| 004 — O que é a Carta | Pronta documentalmente | Executar T014–T039 depois da infraestrutura compartilhada da 002. | Testar links oficiais e concluir aceite visual/acessível. |
| 005 — Diagnóstico | Pronta documentalmente | T008–T050, preservando a ordem local. | Motor exaustivo `3^8`, sessão, jornada, resultado e aceite visual/acessível. |
| 006 — Organizar informações | Pronta documentalmente | F006-01–F006-07; F006-08 acompanha a 007. | Aplicar copy/metadados contratados e validar integração de orientações. |
| 007 — Formulário | Pronta documentalmente | Executar F007-02–F007-22 sobre a matriz v3 fechada. | Implementar MC-01–MC-12 contratadas, consultar Figma e executar testes funcionais/visuais/integrados. |
| 008 — Linguagem simples | Pronta documentalmente | Executar F008-02–F008-12 com `ls-pt-BR-v1` e `msg-pt-BR-v1`. | Implementar motor, geometria, integração, acessibilidade e testes sem alterar a copy aprovada. |
| 009 — Prévia HTML | Pronta com dependência explícita | Preparar view model após o contrato executável da 007. | Provider 007, estados estruturais e interface editorial 008. |
| 010 — Exportação CSV | Pronta com dependência explícita | Implementar snapshot/matriz depois do provider 007. | Homologar mitigação de fórmulas e compatibilidade em planilhas reais. |
| 011 — Tutorial | Pronta com dependências explícitas | Conteúdo 25/13/12 sincronizado; executar T001–T008 e seguir de T010, respeitando dependências. | Fonte administrativa autorizada, assets e integração real com 012. |
| 012 — Cópia de dados | Pronta com dependência explícita | F012-01/F012-02 podem preparar; UI depende de 007 e 011/T009. | Etapa 4 real, 25 campos, 13 cópias por tipo, clipboard e âncoras. |
| 013 — Fluxo de ajuda | Pronta documentalmente | T001–T015, reutilizando o resolvedor já versionado. | Interface, destinos, nove combinações de canais e acessibilidade. |
| 014 — Atendimento agendado | Bloqueada por decisão institucional | Nenhum backend ou promessa operacional deve começar. | IN01–IN08, ADR-004 final, responsáveis, política e infraestrutura aprovados. |
| 015 — Suporte por e-mail | Pronta documentalmente | T008–T015 após a conferência T001–T007. | Botão/controlador de cópia, estados não ativos e EM01–EM12. |
| 016 — Responsividade e acessibilidade | Pronta como trilho transversal | Aplicar em todos os lotes, desde o primeiro componente. | Matriz executada por rota/estado em navegador, teclado e tecnologia assistiva. |
| 017 — Deploy | Bloqueada por decisões de ambiente; trilho A preparável | F017-03–F017-08 após INF aplicáveis; não publicar por inferência. | INF01–INF10; trilho B também depende de IN01–IN08 e ADR-004. |

## Gates que podem ser resolvidos em paralelo

Estes gates não devem interromper os lotes independentes:

1. **G1 — Conteúdo legal 004 — resolvido em 27/10/2026:** ementa do Decreto nº
   9.756/2019 reconsultada no Planalto; resumo alinhado à unificação dos canais
   digitais do Governo federal. Teste de link e vigência continuam no aceite.
2. **G2 — Modelo 007 — resolvido em 27/10/2026:** MC-02–MC-08 fechadas na
   matriz canônica: dez obrigatórios, prazo positivo, listas, Ativo, custo/URL,
   condição ON para sistema e decoder estrito. Implementação/testes permanecem.
3. **G3 — Linguagem 008 — resolvido em 27/10/2026:** catálogo
   `ls-pt-BR-v1` (27 registros) e mensagens `msg-pt-BR-v1` (MSG01–MSG17)
   aprovados; sugestões continuam contextuais e nunca automáticas.
4. **G4 — Segurança 010:** produto/segurança homologa política contra fórmulas
   e conjunto de planilhas-alvo.
5. **G5 — Tutorial 011:** equipe responsável fornece URL administrativa,
   permissões, fluxo, nomenclatura e mídia autorizada, com fonte e data.
6. **G6 — Agenda 014 — aberto documentalmente em 27/10/2026:** IN01–IN08
   aguardam encaminhamento, responsáveis nominais e respostas; ADR-004 e o
   canal permanecem pendentes até homologação.
7. **G7 — Deploy 017 — aberto documentalmente em 27/10/2026:** INF01–INF10
   aguardam encaminhamento, responsáveis nominais e respostas sobre hospedagem,
   ambientes, operação e promoção/rollback. Ver o
   [registro conjunto](decisoes/registro-g6-g7-agenda-deploy.md).

## Lotes de implementação

### Lote 0 — Checkpoint e decisões não técnicas

Objetivo: preservar o estado documental e abrir os gates sem alterar o produto.

1. Criar um checkpoint versionado da documentação atual antes do primeiro
   lote de código.
2. G6/G7 já têm abertura documental conjunta; nomear contatos, encaminhar as
   consultas e registrar resposta, fonte e data por ID, sem transformar silêncio
   em aprovação. Encaminhar também G4/G5 e preservar as evidências de G1–G3.
3. Manter 014 indisponível e 017 sem publicação enquanto seus gates estiverem
   abertos.

Saída: baseline recuperável e decisões localizadas. G4–G7 não bloqueiam o
início do lote 1, exceto nos componentes diretamente afetados.

### Lote 1 — Fundação e navegação compartilhada

Features: 001, 002, 003; apoio transversal 016 e preparação 017.

Ordem:

1. 002/T007 cria a fonte compartilhada de navegação e rodapé.
2. 002/T008–T014 implementam somente a API central documentada, `AppLink`,
   shell, marca, menus, rodapé, título, foco, scroll, skip link e 404.
3. 003/T011–T18 cria página/rota `/explorar-por-etapas` e liga os quatro
   destinos sem criar roteador próprio; continuar as tarefas locais em ordem.
4. 002/T015–T022 compõe a home sobre o shell estabilizado.
5. 002/T023–T029 e cenários NV01–NV12 verificam URL completa, modificadores,
   `popstate`, query, hash, rota desconhecida e preservação de sessão.
6. 016 aplica teclado, foco, landmarks, reflow, zoom, contraste, toque e
   movimento reduzido desde o primeiro componente.
7. Após G7, 017/F017-03–F017-08 prepara base pública, pipeline, assets e
   configuração de hospedagem; não publica antes da aprovação correspondente.

Checks mínimos: testes de navegação, `npm run typecheck`, `npm run build`,
console limpo, acesso direto/recarga aos 12 paths, browser back/forward e
comparação visual real das telas 002/003. A 404 da aplicação e o fallback SPA
devem ser testados separadamente.

### Lote 2 — Páginas independentes e diagnóstico

Features: 004, 005 e partes independentes da 006; dependência do lote 1.

Ordem:

1. 005/T008–T050 implementa perguntas, reducer/sessão, motor, resultado e
   enumeração das 6.561 combinações, sem persistir respostas além do contrato.
2. 006/F006-01–F006-07 aplica conteúdo contratado, estado 0/13 e página de
   preparação; a ligação editorial com a 007 aguarda o lote 3.
3. 004 usa a evidência legal encerrada em G1 e executa T014–T039 depois dos
   contratos compartilhados necessários da 002.

Checks mínimos: typecheck/build, testes do motor e sessão, URLs direta e de
resultado inválido, conteúdo/links oficiais, comparação Figma, teclado,
leitores, 320–1440 px, zoom 200% e reflow 400% conforme a matriz 016.

### Lote 3 — Provider e formulário da Carta

Features: 006 e 007; depende do lote 1. O gate G2 já está encerrado.

Ordem:

1. 007/F007-01 já registrou as decisões G2; executar F007-02 para integrar
   contagem, orientações, mensagens e condições no inventário de implementação.
2. Implementar provider único, sessão/storage v3, IDs estáveis, recuperação e
   cinco partes conforme F007-03–F007-17, sem envelope ou paths v2.
3. Integrar 006/F006-08 por mapa explícito; orientação abre a parte e o alvo
   corretos sem criar outro estado da Carta.
4. Executar F007-18–F007-22 e F006-10–F006-14.

Checks mínimos: fixtures CP01–CP13, dez paths gerais, K/S/ON/E, listas por ID,
storage ausente/inválido/futuro, foco após montagem, perda de dados, 20 palavras
significativas e cinco partes. Typecheck/build e auditoria 016 são obrigatórios.

### Lote 4 — Regras, prévia e exportação

Features: 008, 009 e 010; depende do provider 007 e do G4 para o aceite
completo.

Ordem:

1. Com G3 encerrado, 008/F008-02–F008-12 implementa o motor editorial para os 25 campos,
   estados inconclusivos e checklist humano; revisão editorial não bloqueia
   navegação, prévia ou CSV.
2. 009/F009-01–F009-12 implementa um único view model/componente para a prévia
   embutida e `/previa`, sem editar a fonte.
3. 010/F010-01–F010-12 implementa snapshot, 22 registros de dados, BOM,
   escaping e download; aplicar a mitigação somente após G4.

Checks mínimos: VE01–VE18, PV01–PV18 e fixtures CSV; campos vazios/inativos,
Unicode, multilinha, fórmulas, Excel/LibreOffice/Google Sheets, preservação do
snapshot, typecheck/build e matriz 016.

### Lote 5 — Tutorial e transferência por cópia

Features: 011 e 012; depende dos lotes 3/4 e do gate G5.

Ordem:

1. 011/T001–T008 confirma fonte externa, correspondência e assets.
2. 011/T009 migra `paraiba-digital.ts` de 10 exemplos/6 ações para a projeção
   completa de 25 campos, 13 abertos e 12 escolhas.
3. 011/T010–T014 compõe seis etapas e monta a 012 apenas na etapa 4.
4. 012/F012-03–F012-06 implementa cinco grupos, repetição por item, cópia
   apenas de texto aberto preenchido e alternativa manual.
5. Executar 011/T015–T018 e 012/F012-07–F012-11.

Checks mínimos: IT01–IT11, TR01–TR17, query `etapa=1..6`, recarga/histórico,
clipboard seguro/negado/indisponível, concorrência, retorno para edição,
ausências, K/S/ON/E, comparação dos seis frames e auditoria 016.

### Lote 6 — FAQ e suporte por e-mail

Features: 013 e 015; depende do lote 1. Não depende da agenda ativa.

Ordem:

1. 013/T001–T011 compõe FAQ, âncoras, cards e transições consumindo a fonte
   compartilhada; não duplicar estado/endereço.
2. 015/T001–T007 reconfirma conteúdo/estados e 015/T008–T012 implementa contato,
   botão “Copie o e-mail”, controlador e alternativa manual, sem `mailto`.
3. Executar CJ01–CJ12, EM01–EM12 e tarefas finais de ambas as features.

Checks mínimos: nove combinações de canais, acesso direto, alias/canônico da
FAQ, clipboard, troca de endereço/estado, foco/status, preservação da Carta,
typecheck/build, navegadores e matriz 016.

### Lote 7 — Agenda operacional

Features: 014 e trilho B da 017; bloqueado por G6 e G7.

Ordem após aprovação documentada:

1. 014/T001–T008 fecha contrato executável com os responsáveis.
2. 017/F017-12–F017-16 provisiona ambiente sintético, proxy, banco, migrations,
   worker/outbox, segredos, backup e observabilidade.
3. 014/T009–T019 implementa backend e frontend com gate fechado por padrão.
4. 014/T020–T024 e 017/F017-17 homologam API, idempotência, capacidade,
   notificações, pausa, recuperação, acessibilidade e privacidade.
5. Somente 017/F017-18 pode abrir o gate, após evidência e aprovação nominal.
6. 017/F017-19–F017-21 mantém smoke, dependências e recuperação contínua.

Checks mínimos: AG01–AG13, R1–R6, PUB/AGD, PostgreSQL real de teste, conflitos,
410, replay, outbox, falhas de rede/worker, teclado/leitores/reflow, segurança,
backup/restore, promoção e rollback. Dados devem ser sintéticos.

## Publicação e aceite incremental

- A preparação do trilho estático acompanha o lote 1, mas a publicação depende
  de G7. Enquanto não houver ambiente aprovado, verificações de navegador são
  locais e não podem ser chamadas de teste publicado.
- Quando o ambiente não produtivo existir, executar 017/F017-09/F017-10 a cada
  lote de interface concluído, registrando commit, URL, data e matriz 016.
- Falha ou bloqueio da agenda não impede publicar o frontend com o canal 014
  honestamente `pendente` ou `pausado`.
- Produção exige evidência própria; passar em Vite local ou `vite preview` não
  comprova fallback SPA, headers, cache, HTTPS ou variáveis do ambiente real.

## Primeira tarefa de código liberada

A primeira tarefa liberada é **feature 002, T007 — criar o conteúdo
compartilhado da navegação e do rodapé**, seguida de T008 e dos componentes do
shell. Ela não depende dos gates G4–G7 e prepara todas as páginas seguintes.

Comando interno para iniciar, depois do checkpoint documental:

```text
/spec:implementar 002-home-e-navegacao
```

Na execução, começar em T007, respeitar a ordem local e o
[contrato de navegação](arquitetura/contrato-navegacao.md). Não iniciar 003 ou
páginas dependentes antes de estabilizar a API compartilhada; não interpretar o
comando acima como autorização já executada nesta T021.

## Definição de encerramento dos lotes

Um lote encerra somente quando tarefas locais, testes automatizados pertinentes,
typecheck/build, cenários de navegação, verificação visual real e recorte da
matriz 016 possuem evidência. Pendências externas devem manter o estado da
feature honesto. O ciclo documental T001–T021 estar concluído não torna o
produto implementado.

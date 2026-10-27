# Verificação T019 — Revalidação das features 001–017

Data: 22 de outubro de 2026.

## Escopo e método

Revalidação exclusivamente documental das features 001–017. Para cada pasta,
foram confrontados `spec.md`, `plan.md`, `tasks.md`, `implementation-plan.md`,
`quickstart.md`, `validation.md`, `verification.md`, contratos complementares,
conteúdo TypeScript relacionado e evidências existentes.

Esta rodada não altera código, não executa testes/build/browser e não converte
roteiros futuros em evidência. Parecer documental, implementação, aceite
funcional, aceite visual/assistivo e operação continuam dimensões separadas.

## Linha de base

- 17 pastas de feature, todas com 7/7 artefatos convencionados.
- 18 arquivos TypeScript em `src/content`.
- seis módulos do modelo da Carta em `src/features/carta`.
- sete arquivos `.test.mjs`; `package.json` continua sem script agregado `test`.
- 12 paths no contrato de navegação e 11 entradas em `src/app/routes.tsx`.
- diff preexistente de `src/` e `tests/` identificado por SHA-256
  `ab5a297c4beec82f90d37feda874a4f758ddb975911673316b9f6669453b220c`.

## Fontes externas e visuais realmente consultadas

### Oficiais

- Planalto: Lei nº 13.460/2017 e Decretos nº 9.094/2017 e nº 9.756/2019.
  Os três endereços versionados na 004 responderam. A Lei nº 13.460 sustenta
  direitos do usuário e linguagem simples; o Decreto nº 9.094 sustenta Carta de
  Serviços e simplificação.
- O resumo do Decreto nº 9.756 no conteúdo diz “migração dos sítios e portais”,
  enquanto a ementa oficial vigente diz “unificação dos canais digitais”. O link
  está correto, mas a paráfrase precisa de revisão editorial antes da entrega.
- O portal público `https://paraibadigital.pb.gov.br/` está acessível e expõe
  serviços. Isso não comprova URL administrativa, login, menus, permissões ou o
  fluxo de cadastro descrito no tutorial 011.
- WCAG 2.2 foi reaberta na recomendação oficial W3C; continua referência
  normativa, mas não comprova conformidade do produto.
- As páginas oficiais atuais do Vite confirmam `dist/`, o caráter local de
  `vite preview`, a dependência da base pública e a exposição de `VITE_*` no
  bundle. Nenhum fornecedor foi escolhido.

### Figma

O conector autenticado respondeu metadados para os 26 nodes ativos do mapa:
11 nodes da tabela principal; além deles, quatro partes adicionais da 007, dois
Form-Card, cinco etapas adicionais da 011, três variantes adicionais da 014 e
Label-Row. Os estados iniciais e componentes compartilhados não foram contados
duas vezes. IDs e nomes existem no arquivo
`YaVUdqYa3boHpvGrxf4ZJ5`.

Esta rodada confirmou disponibilidade/identidade estrutural, não realizou
comparação pixel a pixel, medição, extração de assets, inspeção responsiva ou
aceite visual. Metadados não substituem `get_design_context`, screenshot e
browser na implementação. O mapa preserva a conferência T016 como histórica e
recebeu um adendo T019.

## Parecer atual por feature

| Feature | Prontidão documental | Estado de conteúdo/implementação observado | Bloqueio ou próxima ação |
| --- | --- | --- | --- |
| 001 | Apta como fundação com dependências explícitas | Estrutura técnica existe; integração global não concluída | Navegação, ambiente publicado e aceites transversais |
| 002 | Coerente | `home.ts` existe, mas HomePage não o consome integralmente; provider/404 ausentes | Implementar T007–T029 e contrato T015 |
| 003 | Coerente | Conteúdo tipado existe; rota/página não estão registradas | Implementar T011–T032; manter destinos honestos |
| 004 | Ajuste editorial aberto | Conteúdo existe; página é placeholder | Corrigir/validar paráfrase do Decreto nº 9.756; implementar página e links |
| 005 | Coerente para implementação | Oito perguntas, cinco resultados e motor existem; UI/sessão/tipos legados pendem | Revisar motor, enumerar `3^8` e implementar jornada |
| 006 | Coerente no contrato vigente | Três tópicos/13 informações; página é placeholder | Aplicar copy/metadados e implementar F006-01–14 |
| 007 | Parcial por decisões de produto | Modelo v3/helpers existem; página é placeholder e provider ausente | Fechar MC-02–MC-08 aplicáveis, especialmente prazo, Ativo, URL e presencial |
| 008 | Parcial por aprovação editorial | Contrato de 25 campos e regras existe; motor atual não atende | Aprovar catálogo/mensagens e implementar/testar motor |
| 009 | Coerente, dependente da 007/008 | Contrato de projeção existe; PreviaCartaPage é placeholder | Implementar view model/componente e estados |
| 010 | Coerente com decisão de segurança aberta | Helper/testes isolados existem; matriz v3 é mais ampla | Homologar mitigação CSV e compatibilidade em planilhas reais |
| 011 | Parcial | Documentos exigem 25 campos; conteúdo ainda contém dez exemplos/seis cópias | Sincronizar `paraiba-digital.ts` e validar fluxo administrativo real |
| 012 | Coerente, bloqueada pela integração 011 | Contrato cobre 25 campos/13 abertos/12 escolhas; UI não entregue | Migrar etapa 4 e executar clipboard/âncoras/estados |
| 013 | Coerente em documentação e conteúdo compartilhado | FAQ e resolvedor existem; interface completa dos canais não está entregue | Implementar CJ01–CJ12 e verificar destinos/estados |
| 014 | Contrato técnico coerente, operação bloqueada | Página placeholder; sem API, banco ou worker | Resolver IN01–IN08/ADR final e só então implementar/homologar |
| 015 | Coerente em documentação e conteúdo | Fontes/copy estão corretas; página não renderiza `copyAction` | Implementar botão/controlador e executar EM01–EM12 |
| 016 | Apta como plano transversal | Nenhuma auditoria visual/assistiva foi executada | Executar matriz por rota/estado em ambientes reais |
| 017 | Apta como plano de deploy | Nenhum ambiente ou pipeline existe | Resolver INF01–INF10; implementar trilho A; agenda segue DP17 |

## Rastreabilidade atualizada

| Feature | Requisito/critério | Tarefa responsável | Teste previsto ou evidência atual |
| --- | --- | --- | --- |
| 001 | Critérios documental/técnico da spec | Blocos documental e técnico de `tasks.md` | Quickstart e verification; aceite integrado pendente |
| 002 | Critérios de home/navegação | T007–T029 | Cenários do implementation-plan; conteúdo versionado é evidência editorial |
| 003 | Critérios de quatro cards/rota | T011–T032 | Cenários de página/navegação; node `575:483` disponível |
| 004 | Conteúdo, links e legislação | T014–T039; reabrir revisão editorial de T006 | Testes de links/conteúdo; fontes Planalto consultadas na T019 |
| 005 | Regras, sessão e cinco resultados | T008–T045 | Enumeração `3^8`, integração e dois nodes disponíveis |
| 006 | RF01–RF06/CA01–CA16 | F006-01–F006-14 | Quickstart e contrato de orientações; implementação pendente |
| 007 | RF01–RF09/CA01–CA33 | F007-01–F007-22 | Matriz v3, CP01–CP13 e cenários de sessão/formulário |
| 008 | LS01–LS06/CA01–CA18 | F008-01–F008-12 | VE01–VE18 previstos; aprovação/motor pendentes |
| 009 | RF01–RF07/CA01–CA21 | F009-01–F009-12 | Cenários de projeção/segurança; node `821:308` disponível |
| 010 | RF01–RF07/CA01–CA20 | F010-01–F010-12 | Matriz de 22 dados e testes em planilhas reais pendentes |
| 011 | RF01–RF07/CA01–CA20 | T001–T018 | IT01–IT11; seis nodes disponíveis, conteúdo ainda divergente |
| 012 | RF01–RF06/CA01–CA20 | F012-01–F012-11 | Matriz 25/13/12 e cenários clipboard; depende da T009 da 011 |
| 013 | RF01–RF05/CA01–CA14 | T001–T015 | CJ01–CJ12; conteúdo/resolvedor têm evidência T013 |
| 014 | RF01–RF09/CA01–CA22 | T001–T024 | AG01–AG13 e R1–R6; execução bloqueada por IN01–IN08 |
| 015 | RF01–RF07/CA01–CA13 | T001–T015 | EM01–EM12; conteúdo/resolvedor existe, UI/clipboard pendem |
| 016 | RF01–RF08/CA01–CA15 | T001–T017 | Matriz WCAG/processos; todos os resultados reais pendentes |
| 017 | DP01–DP20 | F017-01–F017-21 | PUB01–PUB12/AGD01–AGD05; nenhum ambiente executado |

As linhas sem IDs históricos não receberam IDs artificiais nesta tarefa. O
destino de teste está no plano/quickstart próprio; a matriz acima é o índice
atual, não evidência de aprovação.

## Problemas encerrados confirmados

- 17 features possuem os sete artefatos convencionados.
- identificador/pasta da 003, matriz v3 da Carta, contrato de contagem,
  orientações 006, projeções 009/010/012, navegação documental e canais de ajuda
  permanecem conciliados.
- 012 continua definida como região da etapa 4 da 011 e não página autônoma.
- 015 continua sendo cópia local do e-mail, sem mailto ou backend.
- 017 agora dá destino ao deploy estático e às dependências da agenda.

## Pendências prioritárias

1. **004:** revisar a paráfrase do Decreto nº 9.756 contra a ementa oficial.
2. **007:** fechar MC-02–MC-08 aplicáveis antes do formulário dependente.
3. **008:** obter aprovação editorial do catálogo/mensagens.
4. **011:** migrar o conteúdo da etapa 4 de dez exemplos para a projeção v3.

### Atualização posterior — 27/10/2026

A pendência de conteúdo da 011 registrada acima foi encerrada: a etapa 4 agora
referencia a projeção 25/13/12 da 012 e não contém exemplos nem `copyLabel`.
Permanece pendente validar o fluxo administrativo real e executar os aceites.
5. **002/003:** entregar provider, rota ausente e 404 antes de validar URLs.
6. **014/017:** manter agenda fechada até IN01–IN08, ADR final e infraestrutura.
7. **016:** executar visual, teclado, leitores, contraste, reflow e zoom; nodes
   disponíveis não equivalem a aceite.

## Checks documentais

- presença 7/7 por feature;
- links relativos dos arquivos atualizados;
- busca de contratos v2/paths removidos nos documentos ativos;
- contagem de 12 rotas planejadas versus 11 registradas;
- conferência de conteúdo 011/012 e estados 013–015;
- metadados Figma em 26/26 nodes ativos;
- fontes oficiais citadas acima;
- `git diff --check`;
- comparação final do hash de `src/` e `tests/` com a linha de base.

## Conclusão

T019 concluída documentalmente. Cada feature recebeu parecer T019 em seu
`validation.md`, com estado documental separado de implementação e aceite. O
projeto está mais rastreável, mas não pronto para implementação indiscriminada:
004, 007, 008 e 011 requerem correções/decisões documentais específicas; 014 e
017 dependem de decisões institucionais; todas as entregas de interface ainda
exigem seus testes funcionais, visuais e assistivos.

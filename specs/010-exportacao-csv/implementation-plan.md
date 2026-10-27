# Implementation Plan: Exportação CSV

19/10/2026 — T009 documental.
[Snippets e decisões anteriores](historico/2026-10-19-pre-t009-implementation-plan.md).
Fonte normativa: [matriz/pipeline/fixtures](contrato-exportacao-v3.md).
Não repetir tabela de exportação com contagem divergente neste documento.

## Base verificada

Lidos tipos/schema, helper estrutural, carta.csv.ts, src/lib/csv.ts,
tests/csv.test.mjs e package.json. Helper atual tem 22 registros; serializador
já usa quoting integral/CRLF. Os três testes existentes cobrem só serializador.
Não foram executados nesta rodada. BOM/safety/download/snapshot integrado
não são comprovados pelos helpers. Consulta OWASP atual registrada no contrato;
Figma/ERS e ferramentas de planilha não consultados/executados.

## Contratos técnicos

Snapshot deep copy de grupos, custo/prazo, públicos/perfis, documentos, etapas
e tipos de agendamento. Não basta spread superficial. Usar revisão capturada;
validar e formatar somente ela. Validador estrutural da 007 hoje retorna array:
adapter deve capturar falha técnica, sem acessar status inexistente no helper.
Não criar regras próprias nem usar estado editorial da 008.

Formatadores puros produzem readonly [campo, valor][] conforme matriz única.
25 definições agregadas em 22 linhas; documentos/etapas preservam todos os
atributos úteis. Não serializar JSON, IDs ou mensagens. Condicionais mantêm
chave com vazio. Labels de escolhas compartilhados com 007/009, sem enums crus.
Safety recebe célula final e retorna valor protegido/flag; contar flags por
célula. criarCsv faz somente quoting, escape e CRLF. Compor BOM uma vez no Blob.
Parser de testes deve ser independente do serializador/formatadores.

## Ação e recursos

ExportCsvAction consome provider e captura no clique, não recebe arquivo ou
validação cacheada da 009. Estado idle/processing/blocked/failed/started e trava
síncrona antes de leitura; finally libera trava. Falha bloqueia criação posterior
de recursos. Copy “Download iniciado” só após solicitação; não afirmar salvo.
Erro recuperável mantém dados/edição e permite tentativa com snapshot novo.
Mudança de revisão invalida blocked antigo, sem download/foco automático.

Criar URL e anchor temporária somente após validação/arquivo pronto. Remover
anchor em finally; revogar URL em falha pré-clique. Após clique, prazo candidato
60 s gerenciado independentemente do componente, verificar navegação imediata/
repetição nos browsers. Não assumir segurança de lifecycle por mock.
Se processamento bloquear UI ou perder gesto, redesenhar explicitamente modo
prepared/segundo botão, invalidando captura preparada após edição. Essa alternativa
não é implementação entregue nem autorização para alterar silenciosamente o fluxo.

Resumo usa registro autorizado da 007, abre parte e foca alvo após render;
fallback para grupo/condição se item removido/inativo. AppLink/NavigationProvider
compartilhados. Sem dados pessoais em URL/logs. Exportação não exige storage.

## UI, compatibilidade e performance

Ação em /previa, node local 821:308 não comprova posicionamento/estados. Consultar
Design YaVUdqYa3boHpvGrxf4ZJ5 e Make dVm7lEZdBFqOiiySWLWUqp/0:1 antes de UI.
Inter/tokens, foco/contraste, mensagens de falha/proteção/limite da confirmação,
teclado/leitor; 320/390/768/1024/1440, intermediárias e zoom/reflow.

EX01–EX17 e CA01–CA20 orientam testes:
parser, fonte congelada, limites de safety e falhas unitárias; provider/slot reais;
Chrome/Edge/Firefox Windows, Safari macOS/iOS, Chrome Android; Excel desktop e
LibreOffice Calc, abrir/importar como Texto/salvar/reabrir com configuração
registrada. Emulação não prova dispositivo/leitor/planilha real.
Meta/fixture 1 MiB e investigação 2 MiB conforme contrato, com relógio por etapa,
bytes de texto separados dos bytes CSV/BOM e responsividade avaliada além dos 5 s.
Não elevar orçamento ou impor corte para esconder regressão.

## Pendências de liberação

Política candidata de fórmulas e compatibilidade real; implementação da validação
defensiva/contador e decisões MC-03/04/05/08 já fechadas na 007; provider/ação/slot/foco;
copy/Figma/ERS; ambientes e desempenho. Não resolver decisão de negócio por
formatação. Build/testes só após implementação autorizada e com evidências atuais.

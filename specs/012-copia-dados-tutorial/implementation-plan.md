# Implementation Plan: Cópia de dados no tutorial

T010 documental — 19/10/2026.
[Exemplos anteriores](historico/2026-10-19-pre-t010-implementation-plan.md).
Fonte normativa: [contrato v3](contrato-transferencia-v3.md).

## Base atual

Conferidos documentos 012, decisão docs/spec, matriz 007, conteúdo
src/content/tutorial/paraiba-digital.ts e src/lib/clipboard.ts.
O conteúdo foi sincronizado em 27/10/2026 com o contrato 25/13/12 e não contém
valores ilustrativos; a composição da região com a 011 continua pendente.
Utilitário existente resolve success/failed após escrita e trata indisponibilidade;
não possui coordenação, timers, projeção ou UI. Sem teste real nesta rodada.

## Adaptadores propostos

- carta.transfer.ts: cinco grupos com registros discriminados open/choice/collection,
  path/ID estável, label, condição e valor original. Open present tem string;
  missing não tem payload; choice não tem propriedade de ação copiar.
- Registro de edição 007: destino por campo/item, sem índice/texto em chave.
- Coordenador de cópia acima das rotas: Map de operações por identidade de
  sessão/path/item, request/revision e promise; não persiste valores ou estado.
- CartaCopyFields/CopyTextField/ChoiceDisplay: renderização sem edição,
  nomes acessíveis, textContent/readOnly, feedback localizado.
- 011: montagem exclusiva em fill-information; tutorial-dados estável inclusive
  em falha, âncoras apenas de registros apresentados, CTAs sem duplicação.
- Conteúdo editorial: tutorial e labels da 007 com mensagens da operação
  versionadas; evitar uma segunda lista manual divergente de campos.

Não usar view model formatado de CSV ou innerText para copiar. Documentos e
etapas são expandidos por ID; cópia usa nome/título/orientação separados.
Prazo máximo/unidade e custo/detalhe não se concatenam. Escolhas nunca recebem
botão, mesmo quando possuem valor textual.

## Operação e ciclo de vida

Antes de writeText: conferir alvo open, ativo, preenchido e sem trava; capturar
original/revisão, marcar trava sincronicamente e invocar utilitário no gesto.
Sucesso/falha só atualiza montagem/revisão/request vigente. Cleanup não cancela
promise; trava sobrevive ao remount. Edição invalida feedback; A/B/A usa revisão
monotônica e não comparação de string apenas. Finally libera registro de
operação/referências; catch defensivo cobre dependência injetada que rejeita.
Campos distintos independentes; não garantir ordem global do clipboard.
5 s limpa sucesso atual; 10 s informa demora sem liberar trava. Nova montagem
sem confirmação herdada, com aviso se mesma chave continua pendente. Não copiar
por effect, mount, retorno de rota ou mudança de valor.

Manual usa conteúdo original selecionável; contrato de quebras distingue string
API exata de conteúdo/quebras visíveis no DOM/colagem. Não usar textarea.value
como fonte. Nenhuma leitura de clipboard, query de permissão obrigatória,
execCommand/fallback invisível ou prefixo de segurança CSV.

## UI, navegação e visual

Região de cinco grupos, título semântico, opções como labels/valores; texto
longo não truncado. Ausência como mensagem, sem botão; manual continua disponível
durante erro/pending. Anúncios curtos por campo/item, sem foco roubado por promise.
Retorno usa NavigationProvider/AppLink e registro da 007; alvo inativo/removido
vai à condição/grupo. Fallback tutorial-dados não recria campos ocultos.

Referência local Design YaVUdqYa3boHpvGrxf4ZJ5 node 564:980; Make
dVm7lEZdBFqOiiySWLWUqp/0:1 a consultar. Não houve consulta visual nesta rodada.
Layout adapta-se aos 25 campos e quantidade variável de itens/botões; Inter/tokens,
reflow e seleção acessível. Não criar página nem copiar texto ilustrativo do frame.

## Verificação futura

TR01–TR17 e CA01–CA20: primeiro seletor/fixtures congeladas e promises controladas;
depois provider/011 reais e clipboard em HTTPS/contexto seguro com dados sintéticos.
Mocks não comprovam gesto/permissão/colagem. Registrar versões/dispositivo/leitor,
destino de colagem, normalizações, retorno/erro e limites entre abas/reload.
Verificar 015 somente se utilitário compartilhado mudar, sem acoplar Carta ao e-mail.
Composição 011, Figma/ERS/copy, provider/foco e testes funcionais continuam pendentes;
nenhum snippet antigo é módulo compilado ou requisito de contagem vigente.

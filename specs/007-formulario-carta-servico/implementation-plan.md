# Implementation Plan — Formulário da Carta v3

Baseline atualizado em 27/10/2026. MC-02–MC-08 estão fechadas; implementação,
validação executável e aceite ainda são entregas futuras. Esta rodada é
documental; nenhum snippet foi compilado e nenhum código funcional foi alterado.

## Fontes, escopo e estado observado

Usar [spec](spec.md), [plan](plan.md), [tasks](tasks.md), [matriz canônica](matriz-campos-v3.md) e modelo central. Types/schema/catalogs/storage/validation/CSV v3 existem. Formulário/provider e integração não são entregues por esses helpers. O storage atual retorna Carta vazia sem distinguir motivo de falha; precisa de evolução futura.

Design: arquivo YaVUdqYa3boHpvGrxf4ZJ5; partes 653:1540, 2024:269, 641:58, 647:650, 660:2533; componentes 811:306, 811:382, 651:317 e 821:308. Make: dVm7lEZdBFqOiiySWLWUqp, node 0:1. São referências identificadas, não evidência de consulta nesta rodada.

## Contratos técnicos propostos

Exemplos de interfaces para implementação futura; importar CartaServico existente em vez de redefinir o domínio.

```ts
type CartaLoadResult =
  | { status: "empty"; carta: CartaServico }
  | { status: "restored"; carta: CartaServico }
  | { status: "invalid" | "unsupported"; carta: CartaServico }
  | { status: "unavailable"; carta: CartaServico };

type StorageMode = "session" | "memory-only" | "replacement-required";
type FieldTarget =
  | { kind: "field"; fieldId: string }
  | { kind: "document"; itemId: string; field: "nome" }
  | { kind: "step"; itemId: string; field: "titulo" | "orientacaoCidadao" | "modalidade" };

type StructuralReview = {
  revision: number;
  status: "complete" | "failed";
  issues: readonly { target: FieldTarget; message: string }[];
};
```

Os IDs string devem ser restringidos pelo registro de campos antes de uso. Não aceitar path arbitrário vindo da URL como atualização ou seletor DOM.

Contexto expõe carta, revision, storageMode, ação tipada, revisão e ação explícita de substituição da sessão inválida. CartaLoadResult de falha contém apenas Carta vazia segura e status, não conteúdo inválido exposto à UI/logs. O registro bruto permanece no storage sem sobrescrita.

## Fluxo de hidratação e gravação

1. Provider faz uma leitura controlada e distingue ausência de indisponibilidade.
2. Parse/decoder recebe unknown e verifica forma v3 sem exigir completude.
3. Registro válido hidrata memória; ausência cria estado inicial.
4. Registro inválido ou não suportado gera replacement-required; não gravar no mount nem ao editar.
5. Usuário pode continuar em memória ou autorizar explicitamente substituição pelo snapshot atual.
6. Após hidratação válida/ausência ou substituição autorizada, gravar alterações confirmadas no estado. Falha mantém Carta e muda para memory-only.
7. Não usar limpeza no unmount, navegação, conclusão ou exportação.

Testar StrictMode/remount, escrita inicial, última edição antes de navegar e falhas de storage. Não guardar segunda Carta recuperada em estado paralelo. Sem migração segura aprovada, não mesclar dados de versão anterior. IDs duplicados, vazios e ordem malformada são recuperação inválida; reparar parcialmente requer contrato novo.

## Ações e condições

```ts
const schedulingActive = (c: CartaServico) =>
  c.atendimento.exigeAgendamento === true;
const onlineSchedulingActive = (c: CartaServico) =>
  schedulingActive(c) && c.atendimento.tiposAgendamento.includes("online");
const externalSchedulingActive = (c: CartaServico) =>
  onlineSchedulingActive(c) &&
  c.atendimento.sistemaAgendamento === "sistema-externo";
const costDetailActive = (c: CartaServico) =>
  c.publicoRequisitos.custo.tipo === "sob-consulta" ||
  c.publicoRequisitos.custo.tipo === "com-taxa";
```

Condições são puras e compartilháveis: K/S/ON/E. Não alterar metadados do
formulário sem conferir os agrupadores aninhados. Presencial exclusivo não
ativa sistema; ambos ativa o sistema para a parcela on-line.

Criar ações específicas para categoria/subcategoria, público/perfil, custo/detalhe, prazo, escolhas de agendamento, textos e CRUD por ID. Atualizações produzem novo estado sem perder irmãos. Categoria incompatível limpa subcategoria e informa motivo. Custo gratuito preserva detalhe oculto. Não/null e sistema nativo preservam configurações externas ocultas.

Coleções: adicionar documento com id e nome vazio; etapa com id, ordem seguinte, título/orientação vazios, modalidade null. Na revisão, coleção de documentos vazia é válida, item existente exige nome e deve existir ao menos uma etapa com título/orientação/modalidade. Remoção e reordenação renumeram etapas atuais; consumidores usam essa mesma sequência. Não gerar IDs em render nem usar índice como key.

## Registro de campos e foco

Criar descritores com fieldId, path ou acesso por item, partId, label, controlKind, condição e target. A matriz fornece todos os 25 campos; document-name é o filho proposto que precisa ser formalizado no conteúdo.

DOM: carta-<fieldId> para simples; carta-document-<id>-name e carta-step-<id>-<propriedade> para repetidos. Codificar fragmentos de ID; navegar somente pelo registro autorizado.

Resumo solicita abrir parte e focar depois da montagem. Se alvo foi removido, focar grupo/lista. Se está inativo, focar condição correspondente e explicar, sem reativar campos. Após remover item, próximo/anterior/Adicionar; após reordenar, manter alvo por ID. Coordenar isso com foco de rota do shell.

## Revisão e conclusão

Revisão estrutural trabalha sobre snapshot e revision atuais, abrangendo partes não visíveis e campos aplicáveis. Erros por alvo entram em resumo ordenado; aria-invalid apenas para erro estrutural do controle. Editorial é derivado separado pela 008.

```ts
const readyForNextStep =
  review?.status === "complete" &&
  review.revision === revision &&
  review.issues.length === 0;
```

O exemplo pressupõe revisão explícita; não preencher review com sucesso inicial. Toda edição incrementa revision, invalidando confirmação anterior. Falha do motor deixa status failed. Estado editorial não bloqueia CTA neutro, prévia ou CSV estruturalmente válido.

Conteúdo de conclusão precisa dizer que informações obrigatórias estão preenchidas e que publicação é manual; não comprova veracidade nem aprovação. O botão de tutorial continua disponível em estado parcial com copy adequada.

## Componentes e integração visual

- FormularioCartaPage coordena parte aberta, registro, resumo e ações.
- Componentes de parte recebem valores e callbacks do mesmo provider.
- FormField associa label, ajuda e erro; grupos usam legend; ações têm nomes acessíveis.
- Orientações alternam Form-Card compacto/expandido com aria-expanded e IDs únicos.
- Documento/Etapa usam controles HTML reais; imagem da parte 2 serve apenas de referência visual.
- Prévia embutida reutiliza componente e view model da 009; evitar importações circulares entre páginas.
- A 012 recebe a mesma Carta por projeção: todos os campos aplicáveis, sem limitar seis botões ou dez blocos.

Usar tokens/Inter e CSS do projeto. Não fixar alturas que cortem conteúdo, não truncar texto para caber no Figma. Confirmar composição responsiva nas consultas e em navegador.

## Decisões fechadas e liberação parcial

MC-02–MC-08 foram fechadas em 27/10/2026 na matriz canônica: dez obrigatórios,
prazo inteiro positivo, regras de documentos/etapas, semântica de Ativo, URL
HTTP(S), condição ON para sistema e decoder estrito. MC-01/T005 tem
[contrato documental fechado](../../docs/arquitetura/contrato-contagem-palavras.md),
mas adaptar o helper e testar CP01–CP13 ainda é necessário. MC-12/T007 aguarda
implementação/aprovação editorial. MC-09/T006 tem
[contrato de orientações fechado](../006-organizar-informacoes/contrato-orientacoes-v3.md),
com aplicação editorial/reuso futuros em F006-03/F006-08.

MC-10 e MC-11 receberam contrato técnico nesta T004: alvo por ID e políticas de categoria/custo. Implementação e conteúdo correspondente permanecem futuros. A lista de pendências atual será revalidada em T019; relatórios antigos continuam históricos.

## Matriz de verificação prevista

| Grupo | Casos | Aceite |
| --- | --- | --- |
| V3/catálogos | 25 campos; tipos inválidos; categorias/subcategorias; perfis/públicos e duplicatas | CA02/29/30 |
| Contagem | 20/21 significativas no campo inteiro; regra por frase separada | CA32 |
| Custos/prazos | três custos, detalhe/URL, restauração, inteiro positivo/unidade e rejeições | CA07/31/34 |
| Agendamento | null/false/true; presencial exclusivo; ON; nativo/externo; ambas exibições; valores retidos | CA06/19–24/36 |
| Coleções | zero documentos; item nomeado; mínimo uma etapa completa; add/edit/remove/reorder, IDs/ordem e foco | CA04/05/14/35 |
| Decoder | propriedades, tipos, enums, relações, duplicatas, IDs e ordem inválidos; preservação atômica | CA12/29/30/37 |
| Storage | ausência, v3 parcial, JSON inválido, anterior/futuro, falha leitura/escrita e substituição explícita | CA10–12 |
| Revisão | erro estrutural/editorial, parte oculta, alvo removido/inativo e revisão obsoleta | CA08/09/33 |
| Consumidores | snapshot único, condicionais omitidos, todos os campos da 012 | CA13/27 |
| Interface | teclado/leitor, zoom/reflow, conteúdo longo e HTML literal, cinco frames reais | CA14–18/25–28 |
| Fluxo | entradas independentes, mudança de parte, CTA neutro e preservação de Carta | CA01/03/10/17/33 |

Executar testes pertinentes existentes e novos quando implementado, typecheck/build e inspeções reais. Registrar ambiente/resultado no verification; criar quickstart pela T017. Não inventar aceite de integração ainda não entregue.

Histórico: [plano detalhado anterior](historico/2026-10-19-pre-t004-implementation-plan.md). A rastreabilidade completa CA → tarefa fica em tasks.md.

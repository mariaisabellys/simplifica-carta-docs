# Implementation Plan: Validacao e linguagem simples

## Status e objetivo

Preparado em 2026-10-02. **Plano tecnico pendente de ERS PDF, validacao
editorial do catalogo e consulta Figma. Nao pronto para implementacao visual
ou aceite integral.** Nenhum codigo, biblioteca ou teste foi executado nesta etapa.
Todas as tarefas permanecem pendentes; criar este documento nao conclui T001–T005.

Implementar avaliacao local, deterministica e pura dos cinco obrigatorios gerais,
condicionais de agendamento e
sugestoes contextuais nos textos descritivos. Integrar formulario da 007 e
disponibilizar resultados para 009/010, sem rota nova, reescrita, IA externa,
persistencia de mensagens, selo de clareza ou aprovacao institucional.

## Fontes efetivamente consultadas e limites

- spec.md, plan.md e tasks.md da 008, lidos nesta etapa.
- Spec/plan/tasks e implementation-plan da 007; documentos 006/009–016
  consultados nesta conversa para contratos de consumidores e acessibilidade.
- README, roadmap specs/README.md, manual textual de levantamento, MVP/fluxos,
  arquitetura, constitution, regras de IA e docs/implementation-plan.md.
- Mapa Figma e tokens locais, FormField, schema/types/storage/validation/csv,
  src/lib/validation.ts, App/shell/links e package.json.
- Busca de callsites dos helpers realizada em src: nenhum caller real das
  funcoes de validacao/sugestao encontrado fora das proprias declaracoes.

O PDF do ERS nao foi extraido/validado nesta sessao; manual textual nao e
evidencia de leitura do PDF. Vocabulario/limiar/mensagens sao propostas locais
a validar com equipe, sem homologacao ou garantia sobre fatos/regras externas.

## Inventario e interfaces dependentes

| Area | Estado real | Decisao |
| --- | --- | --- |
| validarCartaObrigatoria | Paths de cinco campos; campo/mensagem em array | Migrar para complete/failed com alvos fechados |
| textoEstaPreenchido | string + trim | Aceitar unknown defensivamente |
| sugerirLinguagemSimples | length > 240 e regex ASCII de quatro termos | Substituir por motor unico Unicode e mensagem de extensao total |
| FormField | Label; hint sem ID e sem erro | Compartilhar contrato descrito na 007 |
| Provider/modelo v2 | Planejados na 007, ainda ausentes no codigo | Integracao depende de entrega real |
| Consumidores | Previa/tutorial/exportacao ainda incompletos | Teste de gate/jornada pendente por consumidor |
| Infraestrutura | Sem framework de testes | Reusar proposta Vitest/Testing Library da 007 |

Nao criar adaptador de array legado sem caller real. Ao substituir API,
pesquisar novamente consumidores e remover regra editorial antiga divergente.
Uma assinatura compativel que retorna [] em falha seria permissao falsa.

## Referencias visuais

| Fonte | Referencia | Situacao |
| --- | --- | --- |
| Design | YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2 | Sem consulta MCP nesta sessao |
| Componentes locais | 811:306, 811:382, 651:317 | Formulario/orientacao/label, sem prova de todos os estados |
| Make | dVm7lEZdBFqOiiySWLWUqp, node 0:1 | Sem consulta MCP |

Figma foi localizado anteriormente como plugin ainda nao instalado/conectado;
nao houve confirmacao de conexao. Consultar ambos os arquivos antes de fechar
layout/estilos e localizar erro/sugestao/resumo/pendente/falha. Registrar nodes,
composicao, associacoes, foco/contraste e reflow. Badge Necessario nao define
sozinho obrigatoriedade nem estilo de sugestao. Nao inventar assets ou medidas.
Codigo/CSS deste documento sao base tecnica proposta, sem fidelidade visual
comprovada. Atualizar mapa somente com evidencias de consulta real.

## Contratos e fonte unica de obrigatoriedade

Usar IDs tecnicos fechados de campos, independentes de labels. Cinco required
permanecem os do schema da 007; nao criar outra lista especifica para CSV.
Nome popular, adicionais e listas gerais nao geram novos bloqueios. Escolhas de
agendamento seguem obrigatoriedade condicional da 007.

```ts
// carta.validation.types.ts
export type CartaTextFieldId =
  | "identificacao.nome" | "identificacao.nomePopular"
  | "identificacao.descricao" | "identificacao.publicoAlvo"
  | "requisitos.criterios" | "atendimento.prazo" | "atendimento.custo"
  | "atendimento.orientacaoAgendamento" | "informacoesComplementares";

export type CartaSchedulingFieldId =
  | "atendimento.tiposAgendamento" | "atendimento.sistemaAgendamento"
  | "atendimento.linkAgendamento" | "atendimento.exibicaoAgendamento";
export type ValidationTarget =
  | { kind: "field"; field: CartaTextFieldId | CartaSchedulingFieldId }
  | { kind: "item"; list: "etapas" | "canais"; itemId: string; field: "descricao" };
export type ValidationIssue = {
  id: string;
  ruleId: "required-text" | "required-scheduling" | "invalid-scheduling-url" | "long-text" | "formal-term";
  target: ValidationTarget;
  severity: "error" | "suggestion";
  messageKey: "requiredText" | "requiredScheduling" | "invalidSchedulingUrl" | "longText" | "formalTerm";
  parameters?: Readonly<Record<string, string>>;
};
export type ValidationRun =
  | { status: "complete"; issues: readonly ValidationIssue[] }
  | { status: "failed"; reason: "validation-unavailable" };
export type CartaReview = { required: ValidationRun; editorial: ValidationRun };

export function targetKey(target: ValidationTarget): string {
  return target.kind === "field"
    ? JSON.stringify(["field", target.field])
    : JSON.stringify(["item", target.list, target.itemId, target.field]);
}
export function issueId(rule: ValidationIssue["ruleId"], target: ValidationTarget) {
  return JSON.stringify([rule, targetKey(target)]);
}
```

ID de issue e chave de resultado, nao valor pessoal nem indice de lista.
Para DOM, usar helper seguro de campos/IDs da 007 ou ID gerado por componente;
nao inserir esse JSON cru em fragmento. `messageKey`/parametros renderizados
como nos de texto. Labels/numero atual da etapa resolvidos na apresentacao.

## Leitura defensiva sem getters e required: codigo base

Entrada normal e Carta v2 do decoder da 007; required aceita unknown para
ausencias/tipos incorretos. Nao interpretar paths enviados pelo usuario.
Ler somente propriedades proprias de dados; accessor e tratado como ausente.
Proxy hostil pode lancar em reflexao: wrapper retorna failed, nunca [] como sucesso.

```ts
// src/lib/validation.ts
export function textoEstaPreenchido(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Helpers de carta.validation.ts; objeto externo nunca e espalhado.
export function ownData(source: unknown, key: string): unknown {
  if (source === null || typeof source !== "object" || Array.isArray(source)) return undefined;
  const descriptor = Object.getOwnPropertyDescriptor(source, key);
  return descriptor && "value" in descriptor ? descriptor.value : undefined;
}
export function readField(source: unknown, field: CartaTextFieldId): unknown {
  switch (field) {
    case "identificacao.nome": return ownData(ownData(source, "identificacao"), "nome");
    case "identificacao.nomePopular": return ownData(ownData(source, "identificacao"), "nomePopular");
    case "identificacao.descricao": return ownData(ownData(source, "identificacao"), "descricao");
    case "identificacao.publicoAlvo": return ownData(ownData(source, "identificacao"), "publicoAlvo");
    case "requisitos.criterios": return ownData(ownData(source, "requisitos"), "criterios");
    case "atendimento.prazo": return ownData(ownData(source, "atendimento"), "prazo");
    case "atendimento.custo": return ownData(ownData(source, "atendimento"), "custo");
    case "atendimento.orientacaoAgendamento": return ownData(ownData(source, "atendimento"), "orientacaoAgendamento");
    case "informacoesComplementares": return ownData(source, "informacoesComplementares");
  }
}
const failed = (): ValidationRun => ({ status: "failed", reason: "validation-unavailable" });
export function validarCartaObrigatoria(source: unknown): ValidationRun {
  try {
    const issues: ValidationIssue[] = [];
    for (const field of camposObrigatoriosCarta) {
      if (textoEstaPreenchido(readField(source, field))) continue;
      const target: ValidationTarget = { kind: "field", field };
      issues.push({ id: issueId("required-text", target), ruleId: "required-text",
        target, severity: "error", messageKey: "requiredText" });
    }
    // Acrescentar ao mesmo resultado as regras condicionais documentadas abaixo.
    issues.push(...validarAgendamentoCondicional(source));
    return { status: "complete", issues };
  } catch {
    return failed();
  }
}
```

Imports de tipos/schema/helper nos arquivos correspondentes. undefined/null/
numero/array/objeto/espacos/tab/quebras nao preenchem required; custo string 0
preenche sem comprovar gratuidade. Getter de grupo ou campo nunca e invocado.
Campo tecnico do schema deve ser tipado como subconjunto de CartaTextFieldId.

Configuracoes de agendamento so se aplicam com `exigeAgendamento === true`. Tipo de
agendamento (Online, Presencial ou ambos) e Sistema de agendamento (Paraiba Digital ou
Outro sistema ou site) sao obrigatorios nesse estado. Link do agendamento e Como o
agendamento sera exibido? sao obrigatorios e visiveis somente para Outro sistema ou
site. Dentro do Paraiba Digital mantem o cidadao na experiencia; Em uma nova pagina
redireciona para a URL externa. Paraiba Digital identifica agendamento pelo proprio
sistema, sem link ou forma de exibicao externa.

Ao mudar para Nao/nao informado ou de Outro sistema ou site para Paraiba Digital,
preservar valores previamente preenchidos na mesma sessao, conforme o padrao da 007, sem
apagar silenciosamente. Valores inativos nao sao exibidos, validados como obrigatorios
nem transferidos como configuracao ativa; ao retornar a condicao correspondente, ficam
disponiveis para revisao.

`validarAgendamentoCondicional(source)` e parte obrigatoria do motor, a detalhar antes
do codigo: ler propriedades proprias via ownData; se exigeAgendamento nao for true,
retornar []. Com true, exigir lista nao vazia de online/presencial sem duplicatas e
sistema valido. Apenas com sistema externo, exigir URL absoluta preenchida e exibicao
valida. Retornar erros required-scheduling/invalid-scheduling-url por alvo fechado. Nao
validar disponibilidade da URL. Protocolos permitidos precisam de decisao. Recomputar
pendencias ao trocar resposta/sistema, retirando erros e sugestoes inativos. Orientacao
textual so recebe analise com Sim; URL e enums nao recebem heuristicas.

## Catalogo editorial proposto e conteudo

```ts
// src/content/validation/carta.ts — sujeito a validacao editorial
export const cartaValidationContent = {
  config: { longTextThreshold: 240, debounceMs: 300,
    formalTerms: ["devem", "deverão", "efetuar", "realizar"] },
  labels: { error: "Pendência de preenchimento", suggestion: "Sugestão de revisão" },
  messages: {
    requiredScheduling: "Informe esta configuração de agendamento.",
    invalidSchedulingUrl: "Informe uma URL válida para o agendamento externo.",
    requiredText: "Informe este campo para completar as informações necessárias à exportação.",
    longText: "Este texto é extenso. Revise se pode organizar as informações em trechos menores, sem retirar conteúdo necessário.",
    formalTerm: "Avalie se os termos indicados podem ser substituídos por expressões mais diretas, mantendo o sentido.",
  },
  termsLabel: "Termos para avaliar",
  pending: "Análise de sugestões em andamento.",
  requiredFailed: "Não foi possível verificar os campos obrigatórios. Tente revisar novamente.",
  editorialFailed: "Não foi possível analisar as sugestões. Você pode continuar editando e tentar novamente.",
  noRequiredIssues: "Nenhuma pendência de preenchimento encontrada nos campos avaliados.",
  noEditorialIssues: "Nenhuma ocorrência encontrada nas regras de linguagem simples avaliadas.",
  reviewLabel: "Revisar informações",
  summaryLabel: "Pendências de preenchimento",
  correctionLabel: "Corrigir campo",
  generalGuidance: [
    "Prefira palavras conhecidas pelo público do serviço.",
    "Explique siglas quando necessário.",
    "Apresente as ações com clareza e revise o sentido das informações.",
  ],
} as const;
```

Mensagem required contextual acompanha label do campo no componente/resumo,
evitando retorno generico isolado. Para formal-term, mostrar parametros.termos
em linha textual associada; nao exigir substituir nem listar alternativas
universais. Catalogo unico sem mensagem antiga divergente no helper.
Adicionar exemplos positivos/negativos ao registro editorial validado, nao ao
estado. Datas/responsavel/fontes de validacao ficam documentados.

## Heuristicas puras: codigo base

```ts
// carta.language.ts
const normalizeTerm = (value: string) => value.normalize("NFD")
  .replace(/\p{M}/gu, "").toLocaleLowerCase("pt-BR");
const formalVocabulary = new Set(cartaValidationContent.config.formalTerms.map(normalizeTerm));

export function analisarTexto(value: unknown, target: ValidationTarget): ValidationIssue[] {
  if (!textoEstaPreenchido(value)) return [];
  const issues: ValidationIssue[] = [];
  // Contar pontos de codigo sem alocar array do texto inteiro.
  let length = 0;
  for (const _point of value.trim()) length += 1;
  if (length > cartaValidationContent.config.longTextThreshold) {
    issues.push({ id: issueId("long-text", target), ruleId: "long-text", target,
      severity: "suggestion", messageKey: "longText" });
  }
  const seen = new Set<string>();
  const terms: string[] = [];
  // Letras/marcas/numeros/underscore compoem token; numero adjacente nao
  // transforma termo embutido em palavra inteira. Hifen separa palavras.
  for (const match of value.matchAll(/[\p{L}\p{M}\p{N}_]+/gu)) {
    const original = match[0];
    const normalized = normalizeTerm(original);
    if (!formalVocabulary.has(normalized) || seen.has(normalized)) continue;
    seen.add(normalized);
    terms.push(original);
  }
  if (terms.length > 0) {
    issues.push({ id: issueId("formal-term", target), ruleId: "formal-term", target,
      severity: "suggestion", messageKey: "formalTerm", parameters: { termos: terms.join(", ") } });
  }
  return issues;
}
```

Contagem usa texto original aparado, antes de normalizar acentos: caracteres
decompostos contam como varios pontos de codigo, nao grafemas. Emoji fora BMP
conta como um ponto, conjunto ZWJ pode contar varios. Formal-term normaliza copia
NFD sem marcas; deverao/deverão/DEVERÃO correspondem. Vocabulario fechado nao
aceita realizacao/irrealizar/devemos ou flexoes nao listadas. Fronteiras candidatas
incluem letras/numeros/underscore; validar hifen/apostrofo e exemplos com equipe.
No maximo duas sugestoes por alvo, deduplicadas por regra. Fonte nao e alterada.

## Cobertura editorial e listas

Campos escalares analisados, nessa ordem de formulario: descricao, publico-alvo,
criterios, prazo, custo, orientacaoAgendamento, adicionais. Inserir etapas entre
requisitos e atendimento; canais entre custos e agendamento, conforme a 007.
Nao analisar nome/nomePopular/nomes de documentos: recebem orientacao geral.

Motor `avaliarLinguagemDaCarta(carta: CartaServico): ValidationRun`:

1. Enumerar campos na ordem acordada usando readField; combinar analisarTexto. Omitir
orientacaoAgendamento se exigeAgendamento nao for true; nao analisar URL nem enums como
texto descritivo.
2. Enumerar etapa.descricao/canal.descricao com ID seguro/unico do decoder v2.
   Alvo usa ID, nao posicao. Carta legada passa primeiro pelo decoder da 007.
3. Se estrutura de lista/ID violar contrato do provider, retornar failed editorial
   em vez de afirmar analise completa ignorando trecho; required roda separadamente.
4. Capturar falha tecnica somente desse motor, sem logs/valores pessoais.

Ordenacao de mensagens deriva do registro de partes/campos e array **atual**.
Label de Etapa 3 resolve posicao atual, sem salvar numero no issue. Ao remover
item, mensagem desaparece imediatamente; ao mover, associacao permanece pelo ID.
Uma nova chamada deriva resultado; nao persistir mensagens no envelope v2.

Wrapper de revisao chama motores de maneira independente:

```ts
export function revisarCarta(carta: CartaServico): CartaReview {
  return { required: validarCartaObrigatoria(carta), editorial: avaliarLinguagemDaCarta(carta) };
}
export function podeExportar(required: ValidationRun): boolean {
  return required.status === "complete" && !required.issues.some((issue) => issue.severity === "error");
}
```

Cada motor precisa conter seu proprio try/catch; nao envolver ambos num unico
catch que elimina required valido quando editorial falha. Helper de gate consulta
somente required, nunca resultado combinado. CSV revalida snapshot no clique.

## Acionamento, timers e estados da UI

Controlador `useCartaValidation` na feature, usando valores do provider da 007
sem copiar Carta editavel; status derivado e local, nunca storage.

| Evento | Required | Editorial/foco |
| --- | --- | --- |
| Montar | Sem erro exposto nos intocados | Sem analise de exemplos/placeholder |
| Blur | Avaliar alvo, marcar visitado | Avaliar valor atual; nao mover foco |
| Revisao explicita | Todos os required | Todos os alvos; focar resumo uma vez |
| Editar avaliado | Recalcular required corrente | Invalidar issue anterior imediatamente; pending + timer 300 ms |
| Alterar resposta/sistema de agendamento | Recalcular obrigatoriedade dos campos agora ativos | Invalidar revisao/timers/resultados dos alvos que deixam de ser aplicaveis, mesmo com texto preservado; reativar para avaliacao atual sem restaurar mensagem antiga |
| Remover item | Nao cria regra nova | Remover visited/issues/timer pelo ID |
| Mover item | Sem alteracao de texto | Reordenar apresentacao/labels sem trocar identidade |
| Desmontar | Resultados nao persistidos | Cancelar timers e callbacks obsoletos |
| CSV | Validar snapshot sincrono fora do touched | Nao aguardar/consultar sugestao |

Proposta tecnica 300 ms aguarda medicao, nao prazo oficial. Guardar por targetKey
um token/revisao e snapshot do **texto e aplicabilidade do alvo**; ao editar ou
alterar sua aplicabilidade incrementar revisao,
remover resultado velho antes de esperar e cancelar timer anterior. Callback
confere alvo existente e atualmente aplicavel, revisao vigente e componente montado. Blur/revisao cancela
timer pendente e roda valor mais recente. Falha de um alvo editorial pode manter
resultados seguros de outros, mas resumo de analise deve indicar incompletude;
nao anunciar motor inteiro complete quando ha alvo failed/pending.

Visited/reviewed sao estado de UI por alvo. Atualizacao externa da Carta pelo
provider segue mesma invalidacao, nao apenas onChange local. Na implementacao,
sincronizar revisoes pelo texto derivado e pela aplicabilidade, filtrando mensagens
por revisao e condicao ativa antes
de renderizar, evitando um frame de sugestao obsoleta ate effect rodar.
Review explicitamente inclui partes ocultas e nao depende dos visited.
Parte visualmente fechada nao significa campo inativo: revisao inclui seus
campos aplicaveis. Com Nao/null, configuracoes de agendamento sao inativas;
com Paraiba Digital, somente Link/Exibicao externas sao inativas. Orientacao
editorial exige Sim. Nenhuma invalidacao apaga valores da Carta.

## Componentes e associacoes: codigo base

Criar FieldValidationMessages e ValidationSummary por reuso entre formulario/
previa/exportacao. Usar FormField da 007, helper IDs e campos/alvos fechados.

```tsx
type FieldValidationMessagesProps = {
  id: string;
  issues: readonly ValidationIssue[];
};
export function FieldValidationMessages({ id, issues }: FieldValidationMessagesProps) {
  if (issues.length === 0) return null;
  const content = cartaValidationContent;
  return (
    <ul id={id} className="carta-validation-messages">
      {issues.map((issue) => (
        <li key={issue.id} data-severity={issue.severity}>
          <strong>{content.labels[issue.severity]}: </strong>
          {content.messages[issue.messageKey]}
          {issue.parameters?.termos ? (
            <p>{content.termsLabel}: {issue.parameters.termos}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
```

Definir message container por campo, sem ID do texto do usuario. Input recebe
aria-describedby de ajuda + mensagens existentes e aria-invalid so se houver
error atual. Pode integrar erro no FormField ou lista de mensagens, mas nao
renderizar mesmo erro nos dois locais e duplica-lo na descricao assistiva.
Sugestao nao e role=alert, required nem texto aplicavel automaticamente.

ValidationSummary recebe required run, labels de alvo e callback/gerador de
destino da 007. Em complete com errors, lista links; failed mostra falha e
revisar novamente; complete sem errors comunica ausencia local sem aprovacao.
Revisao explicita foca heading/resumo tabindex=-1; nao simultaneamente alert
assertivo com mesmo texto. Atualizacao durante digitacao nao refoca/anuncia
resumo. Status editorial comedida indica pending/failed quando relevante.

Links internos usam href restrito de campo e contrato shared da 002/007,
abrindo parte/focando controle apos render. Nenhum dado pessoal em query/hash.
Item removido usa fallback seguro e nao foca DOM arbitrario. Labels de acoes/
resumo ficam versionadas; componentes nao geram copy institucional nova.

## Arquivos e tarefas

| Arquivo | Mudanca futura | Tarefas |
| --- | --- | --- |
| carta.validation.types.ts | Resultados/alvos/regras e keys | T007 |
| content/validation/carta.ts | Catalogo/mensagens/config/orientacoes validadas | T008 |
| carta.validation.ts | Required puro e status defensivo | T009 |
| carta.language.ts | Heuristicas/editorial independente | T010 |
| lib/validation.ts | unknown; remover helper duplicado sem caller | T011 |
| useCartaValidation.ts | Visited/revisoes/timers e invalidacao | T012 |
| FieldValidationMessages.tsx/ValidationSummary.tsx | Mensagens/resumo compartilhados | T013–T014 |
| FormField/controles/FormularioCartaPage | Slots/associacoes/blur/revisao/foco | T012–T014 |
| Callers reais 009/010 | Required atual; gate apenas onde previsto | T015 |
| CSS escopado de formulario | Estados confirmados | T016 |
| Testes/verification.md/quickstart.md | Evidencias e reproducao | T017–T021 |

Paths de feature sao sob src/features/carta; componentes sob src/components/forms.
Nao alterar storage/modelo para persistir resultados, criar backend ou entregar
previa/CSV/copia completos nesta spec.

## CSS estrutural candidato e medicao

```css
.carta-validation-messages { margin-block: var(--space-2); padding-inline-start: var(--space-5); }
.carta-validation-messages li { margin-block: var(--space-2); overflow-wrap: anywhere; line-height: 1.6; }
.carta-validation-summary { min-width: 0; margin-block: var(--space-6); }
.carta-validation-summary a { overflow-wrap: anywhere; }
```

Nao presumir cores de erro/sugestao a partir de tokens ausentes; confirmar Make
e medir contraste/foco. Altura natural, Inter, mensagens extensas e 320 px sem
overflow. Nao adicionar simbolo como unica distincao entre pendencia/sugestao.

Fixture candidata de desempenho: 100 etapas, 50 canais e ate 1 MiB UTF-8 de
texto descritivo com Unicode/termos/quebras. Medir build de producao, hardware/
SO/browser/versao, rodada inicial + cinco repeticoes, tempos required/editorial
total e por alvo, atraso de interacao e timers. Metas tecnicas propostas para
aprovar estrategia sincronica: required <= 50 ms, alvo <= 50 ms, revisao editorial
total <= 200 ms no ambiente definido. Confirmar metas/fixture antes do codigo;
nao declarar desempenho medido ou ilimitado nesta etapa.

Se processamento comprometer interacao, particionar revisao/editorial ou worker
local com revisoes/cancelamento logico, atualizando plano/tests. Nunca truncar
ou adicionar maxLength de produto para satisfazer meta; pending nao e complete.

## Testes futuros e criterios de aceite

Reusar Vitest/jsdom/Testing Library/user-event planejados pela 007, com versoes
compativeis verificadas na implementacao e comandos test/test:run; fake timers
nos testes de invalidacao. Nao instalar framework nesta etapa.

| Grupo | Casos significativos |
| --- | --- |
| Required | Cinco ausentes/tipos/espacos/tab/quebras; custo 0; opcionais; getter nao executado; proxy com falha retorna failed |
| Agendamento | null/Nao; Sim sem tipos/sistema; Online/Presencial/ambos; enums/lista invalidos/repetidos; externo sem URL/exibicao ou URL invalida; nativo com valores externos retidos; troca/restauracao/recarga e required equivalente no formulario/CSV |
| Extensao | 240/241 pontos de codigo, emoji/decomposicao; frases curtas em texto longo sem mensagem falsa de frase |
| Termos | Caixa/acentos/deverao, pontuacao, repeticao/ordem; negativos substring/flexao/numeros/underscore |
| Pureza/cobertura | Fixture congelada, HTML/quebras intactos, nomes/documentos fora de heuristica, alvos todos cobertos |
| Identidade/timers | Mover/remover com mensagem, editar antes de callback, blur/revisao cancela, desmontar, resultado por revisao atual; Sim para Nao ou externo para nativo com texto preservado cancela/descarta callbacks e mensagens inativas; reativacao nao herda resultado antigo |
| Falhas | Editorial failed nao elimina required; required failed nao libera gate; UI nao anuncia complete com alvo pendente |
| UI | Intocados sem erro, blur/revisao, resumo/parte oculta, aria-invalid so error, termos em texto sem executar HTML |
| Consumidores | Snapshot required/CSV, previa parcial/copia livres, nenhuma mensagem no valor transferido |

| CA | Evidencia esperada | Tarefas |
| --- | --- | --- |
| CA01 | Revisao cinco pendencias e retorno a campo | T009/T014/T017/T019 |
| CA02 | Texto preenchido/custo 0 remove ausencia sem declarar fato | T009/T017 |
| CA03 | Opcionais vazios sem ruido | T009–T010/T017 |
| CA04 | Extensao medida e mensagem coerente | T008/T010/T018 |
| CA05 | Unicode/palavra inteira conforme catalogo | T010/T018 |
| CA06 | Sugestao nao bloqueia qualquer acao permitida | T013/T015/T019–T020 |
| CA07 | Invalidacao imediata e atualizacao sem perda | T012/T019 |
| CA08 | ID atual e resultado removido/reordenado corretamente | T012/T014/T019 |
| CA09 | Gate CSV consulta required atual, nao cache UI | T015/T020; depende 010 real |
| CA10 | Previa/copia parcial livres e fonte intacta | T015/T020; depende 009/012 reais |
| CA11 | unknown defensivo sem excecao/falso preenchido | T009/T017 |
| CA12 | Texto/HTML/acentos/quebras preservados | T010/T013/T018 |
| CA13 | Sem erro prematuro/anuncio por tecla, resumo acessivel | T012–T014/T019–T020 |
| CA14 | Mensagens longas/reflow/foco | T016/T020 |
| CA15 | Catalogo unico/local sem envio/persistencia/reescrita | T008/T011/T021 |
| CA16 | Falhas independentes, edicao continua, required failed bloqueia CSV | T011/T017/T020 |
| CA17 | Resultado local sem selo/garantia | T008/T018/T021 |
| CA18 | Consulta visual e estados/medidas registrados | T004/T016/T020–T021 |
| CA19 | Obrigatoriedade somente de configuracoes ativas conforme 007 CA19–CA24; invalidacao por aplicabilidade sem apagar dados, mesmos erros no formulario/CSV e foco correto | T002/T009/T012/T014/T017/T019–T020 |

Manual conforme 016: Chrome/Edge/Firefox/Safari, leitor desktop NVDA e movel
VoiceOver quando disponiveis; larguras 1440/1024/768/390/320 e intermediarias,
texto 200% e zoom/reflow, teclado virtual/fallback, mensagens/termos extensos.
Registrar ambiente/versoes; falta de execucao permanece pendente, sem auditoria global.

Depois de codigo: npm run typecheck, npm run build e suite configurada;
regressao dos consumidores de FormField/helpers alterados. verification.md
registra commit/data/passos/ambiente/resultado/evidencia/defeito/reteste por CA,
catalogo aprovado e medicao; quickstart.md fornece fixtures/roteiro sintetico.

## Pendencias e ordem futura

1. Concluir T001–T004: ERS/required, catalogo validado com responsavel/data,
   Figma, fronteiras de token, metas de tempo e contratos reais da 007.
2. Revisar este documento com evidencia e executar T006 `/spec:validar`.
3. `/spec:implementar`: T007–T011 tipos/catalogo/motores independentes; testar
   required, Unicode e pureza antes de integrar acionamento.
4. T012–T016 controlador/UI/consumidores e medicao, sem segunda Carta ou gates editoriais.
5. T017–T021 testes/evidencias/checks; CA09/CA10 pendentes ate consumidores reais.

Figma/ERS/editorial nao verificados impedem declarar plano homologado ou
implementacao visual pronta. Catalogo/metas candidatos nao sao regras institucionais.

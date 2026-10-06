# Implementation Plan: Tutorial Paraiba Digital

## Objetivo e status

Preparado em 2026-10-05 para `/spec:plano-implementacao
011-tutorial-paraiba-digital`. O comando recebido como
`/spec:plano-implentacao` corresponde ao comando interno da constitution.

**Plano tecnico documental pendente de fonte operacional administrativa,
validacao editorial, conferencia do PDF do ERS, consulta Figma e conciliacao
da spec 012.** Nao pronto para tutorial operacional definitivo ou aceite visual.
Esta etapa cria somente este documento; nao altera src, marca tarefas,
instala dependencias, acessa contas externas ou executa testes funcionais.

Evoluir `/tutorial-paraiba-digital` para passo a passo integral e consultavel
independentemente, com fontes/data reais e uma regiao de copia individual da
012. O cadastro externo continua manual. Carta, diagnostico, required, previa
e CSV nao sao requisitos para ler instrucoes ou copiar valores preenchidos.

## Fontes efetivamente consultadas

- Spec, plan e tasks da 011; spec e plan da 012, incluindo contratos de
  transferencia e divergencias do agendamento.
- Constitution e contexto local de README/manual textual, MVP, fluxos,
  arquitetura, regras para IA e estrategia de implementation-plan, consultados
  na etapa anterior desta conversa.
- Planos detalhados 007–009 e plano detalhado 010 criado nesta conversa:
  provider/decoder v2, required, previa e continuidade sem gate de CSV.
- Mapa Figma e resumo local de tokens; plano da 016 e contrato de navegacao/
  breadcrumb da 003.
- Codigo de tutorial/conteudo, routes, App, AppShell, PageHeader, ButtonLink;
  referencias de estilos sticky/foco e infraestrutura do package.json.
- Busca publica em fontes pb.gov.br em 2026-10-05 e abertura do
  [portal Paraiba Digital](https://paraibadigital.pb.gov.br/).
  A abertura nao retornou texto extraivel; a busca localizou a
  [listagem publica de servicos](https://paraibadigital.pb.gov.br/todos).
  Esses resultados nao confirmam acesso administrativo, menus, campos,
  permissoes ou estados de publicacao do servidor.

Nenhum manual administrativo verificado ou captura autorizada foi obtido.
Nao houve leitura do PDF do ERS, consulta MCP do Figma, validacao da equipe
ou teste de clipboard/browser. Nao usar data deste documento como reviewedAt
do tutorial nem rotular busca publica como verificacao operacional.

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

Tutorial deve orientar uma unica configuracao condicional de agendamento e incluir os
quatro campos novos na matriz local da 012. Correspondencia de labels, campos,
integracao interna e capacidade de exibicao no Paraiba Digital oficial dependem de
confirmacao institucional; nao presumir iframe, API ou homologacao. Transferencia
permanece manual.

## Inventario real e dependencias

| Area | Estado atual | Condicao para implementacao |
| --- | --- | --- |
| Rota | Existe, showInNav true, specId 011, sem figmaNodeId | Preservar URL e identidade; node somente apos consulta |
| Pagina/conteudo | PageHeader e tres PlaceholderCards; keys por title | Objeto tipado e IDs estaveis, passos/fontes/data reais |
| Sessao | Provider/decoder v2 planejados na 007, ausentes em src | Fonte unica acima das rotas |
| Copia | Sem seletor/componente/clipboard em src | 012 fornece campos e mecanismo, sem duplicacao na 011 |
| Navegacao | App controla pathname; ButtonLink pode recarregar | Contrato compartilhado 002/003, memoria preservada |
| Shell | Header/footer/nav atual; nao tem breadcrumb | Reusar shell e breadcrumb, sem shell dentro da pagina |
| Foco/hash | App nao trata foco/fragmentos; header sticky | Contrato de ancoras e historico abaixo |
| Fontes/assets | Sem data, manual, capturas ou mapeamento confirmado | T002/T003/T006, com evidencia por passo |
| Testes | Sem suite configurada | Reusar 007/012 ou configurar na implementacao |

003 ainda nao aparece na tabela de rotas real; card de entrada nao comprova
acesso implementado. Previa 009 e ajuda 013 continuam dependencias funcionais.
Specs 013/016 existem; notas historicas de ausencia nao descrevem o inventario
documental atual. Nao inicializar Carta separada para contornar dependencias.

## Pendencias de fonte operacional e copy

T002 deve obter manual oficial ou material institucional autorizado para o
perfil responsavel pelo cadastro. Registrar referencia/versionamento, data
efetiva de conferencia, perfil, variante da interface e evidencia por instrucao.
Conferir URL administrativa, acesso/permissoes, caminho e rotulos das acoes.
Nao inferir login, menu ou procedimento de publicacao pela interface publica.

Cobertura editorial proposta, sem sequencia de menus confirmada:

| ID estavel | Assunto | Evidencia necessaria para fechar copy |
| --- | --- | --- |
| preparar-dados | Revisar Carta com setor responsavel | Manual/ERS e validacao institucional |
| acessar-plataforma | Endereco e acesso por perfil | URL e orientacao administrativa confirmadas |
| localizar-cadastro | Localizar area de cadastro | Caminho/permissoes/rotulos verificados |
| transferir-informacoes | Copiar e preencher manualmente | Matriz externa, diferencas de listas/opcoes |
| conferir-cadastro | Revisar valores apos colar | Campos e comportamento externos conferidos |
| concluir-fluxo | Acao final e estado resultante | Distinguir salvar/enviar/analisar/publicar somente se existentes |
| resolver-divergencias | Procurar ajuda quando tela divergir | Orientacao validada; /ajuda local, canais externos somente verificados |

Esses IDs representam sete assuntos, nao necessariamente sete telas externas.
Divisao final pode mudar com evidencia preservando cobertura e redirects de
ancoras se ja publicadas. Texto generico de preparo/ajuda pode orientar a
redacao, mas nao comprova CA02–CA04/CA08 de tutorial operacional completo.

Copy introdutoria candidata: "Use este tutorial para transferir manualmente
as informações preparadas. Confira os dados com o setor responsável e revise
os campos depois de colar na plataforma oficial." Aviso candidato: "Se a tela
ou suas permissões forem diferentes, consulte a ajuda antes de continuar."
Submeter copy/nomes externos/matriz a responsavel institucional, registrando
nome e data em registro editorial. Nao publicar instrucoes pendentes como finais.

## Matriz de correspondencia: cobertura e lacunas

Os IDs seguem o contrato proposto no plan da 012, nao os identificadores CSV.
Cada linha deve receber nome externo, tela/parte, modo de entrada, diferencas,
fonte e data apos T002. Nenhuma correspondencia administrativa foi confirmada.

| ID local | Fonte Carta v2 | Campo externo/tela | Modo e diferencas a verificar | Fonte/data |
| --- | --- | --- | --- | --- |
| nome | identificacao.nome | Pendente | Texto, limite e nome exato | Pendente |
| nome-popular | identificacao.nomePopular | Pendente | Equivalente opcional ou sem equivalente | Pendente |
| descricao | identificacao.descricao | Pendente | Texto/multilinha, formato exigido | Pendente |
| publico-alvo | identificacao.publicoAlvo | Pendente | Texto ou selecao externa | Pendente |
| documentos | requisitos.documentos | Pendente | Entradas separadas e classificacao explicita | Pendente |
| criterios | requisitos.criterios | Pendente | Regras de acesso e campo apropriado | Pendente |
| canais | atendimento.canais | Pendente | Tipo/opcoes e entradas separadas | Pendente |
| prazo | atendimento.prazo | Pendente | Texto versus estrutura externa | Pendente |
| custos | atendimento.custo | Pendente | Preservar 0; nunca inferir gratuito | Pendente |
| agendamento | atendimento.exigeAgendamento | Pendente | Escolha explicita; null nao significa Nao | Pendente |
| tipo-agendamento | atendimento.tiposAgendamento | Pendente | Online, Presencial ou ambos; somente com Sim | Pendente |
| sistema-agendamento | atendimento.sistemaAgendamento | Pendente | Escolha unica; somente com Sim | Pendente |
| link-agendamento | atendimento.linkAgendamento | Pendente | URL somente com Sim e sistema externo | Pendente |
| exibicao-agendamento | atendimento.exibicaoAgendamento | Pendente | Dentro do Paraiba Digital ou Em uma nova pagina; somente externo | Pendente |
| como-agendar | atendimento.orientacaoAgendamento | Pendente | Texto complementar opcional somente com Sim | Pendente |
| etapas | etapas | Pendente | Ordem/numero e entradas externas separadas | Pendente |
| adicionais | informacoesComplementares | Pendente | Equivalente/complemento ou sem equivalente | Pendente |

Ao verificar, classificar cada linha como correspondencia confirmada,
informacao complementar ou sem equivalente identificado; nao substituir
pendente por "sem equivalente" sem pesquisa. Obrigatoriedade externa e local
sao distintas. Texto multiline nao garante preenchimento de varios itens;
orientar transferencia/revisao manual. Campo externo extra nao autoriza novo
modelo local. Nao sugerir importacao automatica do CSV.

## Conciliacao explicita com a 012

Atualizacao em 2026-10-05 durante o plano detalhado da 012: RF03/CA03/CA06
da spec 012 foram revisados explicitamente para incluir como-agendar,
null/false explicito e listas parciais. O diagnostico abaixo registra a
divergencia anterior; sua revisao documental agora existe. Validacao cruzada,
contratos reais e testes conjuntos continuam pendentes, sem encerramento de T004.

RF03/CA06 e tabelas da 012 foram atualizados nesta revisao: 17 campos locais,
null/false explicito e configuracoes de agendamento ativas. T004 continua
pendente de validacao cruzada e evidencia institucional; esta alteracao
documental nao comprova implementacao ou testes. Antes do aceite integrado:

- Conferir os quatro campos estruturados e orientacoes complementares opcionais
  nas tabelas, criterios, seletores e testes da 012.
- false vira Não somente como resposta explicita do modelo v2/decoder da 007;
  null e false legado nao confirmado seguem migracao, sem inferencia por outros dados.
- Documento/canal com texto e atributo null preserva texto sem inventar tipo
  ou classificacao. Omitir somente item sem nome/descricao util.
- Numeros de etapas e ordem de listas sao os da Carta normalizada; nao sort
  nem renumerar subset. Orientacao e campos estruturados preservam valores inativos na
  sessao, sem transferencia.
- hasContent significa texto util ou agendamento true/false explicito;
  IDs, ordens e defaults nao bastam. Custo textual 0 e preenchido.

A 012 e proprietaria de CartaTransferFieldId, TransferField, seletor,
CartaCopyFields, estados/requests/timers, clipboard e alternativa manual.
A 011 importa contrato neutro da feature carta, nao importa pagina da 012.
012 nao importa conteudo/componentes da 011: dependencias sem ciclo.
Nao usar gerarCsvDaCarta nem aplicar apostrofo de protecao CSV ao clipboard.
Texto selecionavel e texto enviado sao iguais; labels/avisos nao entram no valor.

## Referencias Figma e inventario de assets

| Referencia | Consulta necessaria | Evidencia atual |
| --- | --- | --- |
| Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2 | Localizar frame proprio do tutorial, registrar node | Sem frame identificado; sem ferramenta MCP Figma exposta na sessao |
| Make dVm7lEZdBFqOiiySWLWUqp, node 0:1 | Tokens/componentes, foco, feedback, reflow | Resumo local, sem consulta direta |

Nao usar 575:483 (entrada da 003) ou 821:308 (previa) como layout do tutorial.
Conferir introducao/indice/passos/fontes, acesso oficial, regiao de copia,
estados vazio/parcial/preenchido/recuperacao/falha e responsividade. Preferir
uma regiao unica de copia; se Figma intercalar campos, conciliar agrupamento
sem duplicar controles/identidade. Atualizar mapa somente com node confirmado.
Figma nao valida instrucao administrativa externa.

Nenhum asset foi obtido/autorizado. Inventario atual: vazio. T006 deve registrar
ID, arquivo local em src/assets/tutorial-paraiba-digital, dimensoes, origem,
data, perfil/contexto, autorizacao, legenda e alt. Capturas somente com material
demonstrativo autorizado sem dados pessoais/credenciais. Nao gerar mockup como
captura autentica. Instrucao textual completa deve bastar se imagem falhar.

## Tipos editoriais e contrato de composicao: codigo base

Trechos sao proposta tecnica, nao conteudo operacional aprovado. Imports e
paths finais dependem dos componentes reais 002/007/012. Nao gerar objeto de
producao com fontes/datas/hrefs vazios para fazer os exemplos compilarem.

```ts
// src/features/carta/carta.transfer.types.ts — propriedade da 012
export type CartaTransferFieldId =
  | "nome" | "nome-popular" | "descricao" | "publico-alvo"
  | "documentos" | "criterios" | "canais" | "prazo" | "custos"
  | "agendamento" | "tipo-agendamento" | "sistema-agendamento"
  | "link-agendamento" | "exibicao-agendamento" | "como-agendar" | "etapas" | "adicionais";
export type TransferField =
  | { id: CartaTransferFieldId; status: "present"; text: string }
  | { id: CartaTransferFieldId; status: "missing" };
export const transferAnchor = (id: CartaTransferFieldId) => `carta-copia-${id}`;

// src/content/tutorial/paraiba-digital.types.ts — importar ID neutro acima
export type TutorialStepId = "preparar-dados" | "acessar-plataforma"
  | "localizar-cadastro" | "transferir-informacoes" | "conferir-cadastro"
  | "concluir-fluxo" | "resolver-divergencias";
export type TutorialSource = {
  id: string; title: string; reference: string;
  href?: string; checkedAt: string; accessContext: string;
};
export type TutorialAsset = {
  id: string; src: string; width: number; height: number;
  alt: string; caption: string; sourceId: string; capturedAt: string;
};
export type TutorialStepContent = {
  id: TutorialStepId; title: string; instructions: readonly string[];
  sourceIds: readonly string[];
  localFieldIds?: readonly CartaTransferFieldId[];
  assetId?: string;
};
export type TutorialContent = {
  title: string; introduction: readonly string[]; reviewedAt: string;
  sources: readonly TutorialSource[]; steps: readonly TutorialStepContent[];
  officialAccess: { label: string; href: string; sourceId: string };
  divergenceNotice: string;
};
```

Datas ISO YYYY-MM-DD provenientes de conferencia/revisao efetiva; formatar
para pt-BR sem converter por timezone (separar ano/mes/dia) e renderizar time
dateTime. Material institucional sem URL publica usa reference textual, sem
link ficticio. Autorizacao/responsavel e status de aprovacao ficam em registro
editorial documental; usuario ve fontes/contexto/data uteis, sem checklist interno.

CartaCopyFieldsProps proposto: fields readonly TransferField[], com area
identificada por transferAnchor(id). Heading alvo focavel com tabindex=-1,
textarea readOnly e botao/retorno controlados pela 012. Labels e estados vazios
vem do conteudo da 012. Ausencia segue missing, nunca string Não informado
copiavel. Nao editar valores nem enviar novos campos externos nesta regiao.

## Componentes React: codigo base

```tsx
// src/components/tutorial/TutorialStep.tsx — imports de tipos/anchors reais
type TutorialStepProps = {
  step: TutorialStepContent;
  asset?: TutorialAsset;
};
export function TutorialStep({ step, asset }: TutorialStepProps) {
  return (
    <li className="tutorial-step">
      <section aria-labelledby={`tutorial-${step.id}`}>
        <h2 id={`tutorial-${step.id}`} tabIndex={-1}>{step.title}</h2>
        {step.instructions.map((instruction, index) => <p key={index}>{instruction}</p>)}
        {step.localFieldIds?.length ? (
          <TutorialRelatedFieldsBoundary>
            <TutorialRelatedFields ids={step.localFieldIds} />
          </TutorialRelatedFieldsBoundary>
        ) : null}
        {asset ? (
          <figure>
            <img src={asset.src} alt={asset.alt} width={asset.width}
              height={asset.height} loading="lazy" />
            <figcaption>{asset.caption}</figcaption>
          </figure>
        ) : null}
      </section>
    </li>
  );
}
```

transferLabels e mapa versionado da 012, nao nomes externos presumidos.
TutorialRelatedFields e adapter nao visual de selecao + apresentacao de links
a implementar na integracao: dentro do boundary, deriva fields do seletor
atual da 012 e intersecta seus IDs com ids do passo, preservando ordem do passo.
Somente IDs efetivamente renderizados por CartaCopyFields recebem links de
campo; ativo missing mantem heading e pode receber link, inativo nao. Nao
criar controles/anchors inativos para satisfazer referencias editoriais.
TutorialRelatedFieldsBoundary tem fallback sem links de campo; falha no
provider/seletor nao remove instrucoes do passo. Se regiao de copia falhar,
coordenar estado da regiao com adapter para omitir links a campos indisponiveis;
fallback TutorialCopyBoundary renderiza heading tutorial-dados focavel e
orientacao/retorno ao formulario. Nao repetir esse ID nos boundaries de links.
Esses adapters/contratos sao propostas, nao componentes existentes; definir
estado compartilhado de disponibilidade antes da implementacao conjunta.
Se falha de imagem precisar de retorno visivel, acrescentar componente de
imagem que substitui somente img por mensagem curta, preservando legenda e
texto; nao ocultar step. Referencias a sourceIds podem apontar para lista de
fontes com IDs tecnicos estaveis, resolvidas por mapa. Sem dangerouslySetInnerHTML.

```tsx
// src/components/tutorial/TutorialCartaData.tsx — integracao da 012
export function TutorialCartaData() {
  const session = useCartaSession();
  const fields = criarCamposDeTransferencia(session.carta); // seletor da 012
  const hasContent = fields.some(field => field.status === "present");
  return (
    <section aria-labelledby="tutorial-dados">
      <h2 id="tutorial-dados" tabIndex={-1}>Informações para copiar</h2>
      <CartaSessionNotice recovery={session.recovery} storage={session.storage} />
      <AppLink href="/formulario-carta">
        {hasContent ? "Editar informações" : "Preencher Carta"}
      </AppLink>
      <CartaCopyFields fields={fields} />
    </section>
  );
}

// src/pages/TutorialParaibaDigitalPage.tsx — esqueleto com contratos futuros
export function TutorialParaibaDigitalPage() {
  const content = tutorialParaibaDigital;
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" },
        { label: "Tutorial Paraíba Digital" }]} />
      <PageHeader title={content.title} description={content.introduction[0]} />
      {content.introduction.slice(1).map((text, index) => <p key={index}>{text}</p>)}
      <p>Revisado em <time dateTime={content.reviewedAt}>
        {formatTutorialDate(content.reviewedAt)}
      </time>.</p>
      <nav aria-label="Etapas do tutorial">
        <ol>{content.steps.map(step => (
          <li key={step.id}><a href={`#tutorial-${step.id}`}>{step.title}</a></li>
        ))}</ol>
      </nav>
      <a href={content.officialAccess.href} target="_blank" rel="noopener noreferrer">
        {content.officialAccess.label} (abre em nova aba)
      </a>
      <ol className="tutorial-steps">
        {content.steps.map(step => (
          <TutorialStep key={step.id} step={step}
            asset={step.assetId ? tutorialAssets[step.assetId] : undefined} />
        ))}
      </ol>
      <TutorialCopyBoundary><TutorialCartaData /></TutorialCopyBoundary>
      <p>{content.divergenceNotice}</p>
      <AppLink href="/previa">Revisar a Carta</AppLink>
      <AppLink href="/ajuda">Preciso de ajuda</AppLink>
      <TutorialSources sources={content.sources} />
    </>
  );
}
```

AppLink/Breadcrumb/SessionNotice/Sources/Boundary sao contratos a adaptar ou
criar no comando de implementacao; nao existem todos em src. CopyBoundary e
error boundary restrita a regiao de dados, para falha de integracao nao remover
instrucoes. Mostra mensagem versionada de indisponibilidade da copia e links
de edicao/ajuda, sem inicializar provider substituto ou engolir erro como vazio.
Falhas de storage/recuperacao usuais sao estados seguros do provider, nao exceptions.
Falha do provider global e defeito da 007 a resolver; isolamento de regiao nao
substitui robustez do provider. Nao registrar dados/objetos de erro da Carta.

Constantes JSX visiveis sao exemplos de copy: mover para conteudo versionado
na implementacao. Nao criar novo main/h1 alem dos fornecidos por shell/PageHeader.
Regiao unica de copia e posicionamento acima sao proposta, a confirmar no Figma.

## Navegacao, ancoras e foco

Manter anchors reais com href, modificadores, clique central e nova aba.
Links internos usam contrato 002/003; nao interceptar link externo confirmado.
Nova aba oficial exige aviso no nome e rel noopener noreferrer, sem valores
da Carta em query/hash, abertura automatica ou requests em background.
Portal publico localizado nao pode preencher officialAccess administrativo
sem verificacao adicional. Pode ser referencia publica claramente rotulada.

Indice usa links de fragmento para headings, todos os passos expandidos e
livres, sem progresso persistido. Compartilhar helper de ancoras da navegacao:

1. Clique primario sem modificadores atualiza hash via pushState preservando
   history.state existente, foca alvo tabindex=-1 com preventScroll e rola.
2. Link com modificador segue browser. Fragmento desconhecido nao dispara
   busca de campo via texto pessoal nem erro de pagina.
3. No load/mount, hashchange e popstate, resolver somente IDs fechados conhecidos
   apos conteudo montado. Voltar/avancar restaura destino, sem novo pushState.
4. Ao navegar para rota diferente aplicar foco/titulo da 002. Na mesma rota com
   hash, nao aplicar scrollTo(0) ou refocar h1 por cima do alvo.
5. Hook limpa listeners/observers e nao move foco ao atualizar valores da Carta.

Targets de campos missing continuam headings identificados, permitindo achar
informacao sem inventar valor; se regiao de copia falhar, mostrar alternativa
no heading tutorial-dados. Nao criar targets duplicados para mesmo campo.

Header sticky varia de altura: usar offset real do shell medido por
ResizeObserver ou contrato equivalente para --sticky-header-offset, incluindo
quebra do menu, fonte carregada e zoom. CSS scroll-margin soma espacamento.
Nao presumir altura fixa do header. Scroll sem animacao e suficiente; se houver
smooth, respeitar prefers-reduced-motion. Verificar restauracao em browsers reais.

## CSS de base proposto

```css
/* globals.css; composicao/cores finais dependem de Design/Make */
.tutorial-steps { display: grid; gap: var(--space-8); padding-inline-start: 1.5rem; }
.tutorial-step { min-inline-size: 0; overflow-wrap: anywhere; }
.tutorial-step section { display: grid; gap: var(--space-3); }
.tutorial-step p, .tutorial-step figure { margin: 0; }
.tutorial-step h2, [id^="carta-copia-"], #tutorial-dados {
  scroll-margin-block-start: calc(var(--sticky-header-offset, 0px) + var(--space-4));
}
.tutorial-step img { display: block; max-inline-size: 100%; block-size: auto; }
.tutorial-step figcaption { margin-block-start: var(--space-2); overflow-wrap: anywhere; }
.tutorial-step h2:focus-visible, #tutorial-dados:focus-visible {
  outline: 3px solid var(--color-brand-navy); outline-offset: 3px;
}
```

Inter/fallbacks via tokens globais; sem altura fixa, ellipsis, instrucao apenas
por cor/icone ou imagem. Medir contraste/foco, ordem DOM/visual, selecionar
texto integral e evitar overflow em fontes/URLs/textarea da 012. Nao copiar
Tailwind de output Figma nem instalar bibliotecas visuais por antecipacao.

## Arquivos e sequencia

| Arquivo | Intervencao / tarefa |
| --- | --- |
| src/content/tutorial/paraiba-digital.ts | Objeto editorial real; T009 |
| src/content/tutorial/paraiba-digital.types.ts | Contratos acima; T009 |
| src/content/tutorial/paraiba-digital.assets.ts | Mapa somente de assets autorizados; T011 |
| src/components/tutorial/TutorialStep.tsx | Passos/instrucoes/imagens; T010/T011 |
| src/components/tutorial/TutorialSources.tsx | Referencias/contextos/datas; T010 |
| src/components/tutorial/TutorialCartaData.tsx | Fonte unica e regiao da 012; T012 |
| src/components/tutorial/TutorialCopyBoundary.tsx | Isolamento de falha de copia; T012 |
| src/pages/TutorialParaibaDigitalPage.tsx | Composicao integral; T010/T012/T013 |
| src/assets/tutorial-paraiba-digital/ | Material autorizado, se necessario; T011 |
| Contratos/seletores/CartaCopyFields da 012 | Propriedade 012; integrar, sem motor paralelo |
| Navegacao/breadcrumb compartilhados 002/003 | Minimo necessario para links/foco/hash; T013 |
| src/app/routes.tsx | Node apenas apos consulta; T013 |
| src/styles/globals.css | Reflow/estados confirmados; T014 |
| docs/design-system/mapa-figma-telas.md | Frame confirmado, sem node inventado; T005 |
| specs/012-copia-dados-tutorial/spec.md e documentos relacionados | Conciliacao explicita agendamento/listas; T004 |
| specs/011-tutorial-paraiba-digital/verification.md | Evidencias e revisao editorial; T015–T018 |
| specs/011-tutorial-paraiba-digital/quickstart.md | Procedimento apos entrega; T018 |

Resolver T002–T006, validar documentos T008; implementar conteudo, estrutura,
assets, dados/copias, entradas/ajuda e estilos; verificar T015–T018. Reusar
infraestrutura da 007/012; se ausente, configurar suite na implementacao,
sem instalar nesta etapa. Nao alterar provider/schema/required para a pagina.

## Verificacao e matriz de ambientes futura

Testes significativos de composicao com suite compartilhada (por exemplo
Vitest/Testing Library se configurados): instrucoes/fontes/date continuam em
modelo vazio/parcial, required pendente, editorial pendente, recovery invalido
e memoria valida sem storage. Editar/retornar e atualizar provider montado
atualizam texto/confirmacoes pela 012. Boundary de dados falhando preserva
instrucoes e navegacao; nao tratar falha como Carta vazia silenciosa.

Fixtures sinteticas v2: 17 campos, custo 0, agendamento null/false/true, false
legado migrado, orientacoes ativas e valores externos inativos preservados na sessao,
listas vazias/parciais,
etapas com lacunas, textos longos/CR/LF/acentos/HTML literal. Conferir ausencia
de execucao de markup e requests derivados de valores. Falha de imagem mantem
texto/legenda; negacao clipboard mantem alternativa manual da 012. Nao repetir
testes internos de clipboard: verificar aqui composicao e continuidade.
Incluir Online/Presencial/ambos, Paraiba Digital com URL/exibicao retidas e
externo dentro/nova pagina; troca/restauracao/recarga com links relacionados
montados. Ativo missing conserva anchor, inativo nao gera link de campo e
falha da regiao de dados conserva tutorial-dados no fallback. Confirmacao
antiga de copia nao reaparece apos ocultar/reativar; mecanismos ficam na 012.

Verificacao editorial humana por instrucao: fonte/perfil/data, rotulos/caminho,
links, diferenca real entre acoes oficiais, matriz completa, assets autorizados
e revisao institucional. Teste que conta cards nao prova corretude operacional.
Validacao de integridade do conteudo pode detectar IDs repetidos, anchors
inexistentes, sourceIds/assetIds invalidos e datas/hrefs ausentes; nao autoriza
inventar fonte para passar teste. Registrar revisão efetiva do conteudo.

| Ambiente proposto | Verificacoes |
| --- | --- |
| Windows 11, Chrome/Edge/Firefox estaveis | Menu/card/previa/URL direta/recarga, historia/hash, nova aba e preservacao da Carta |
| macOS, Safari estavel | Mesma navegacao, assets e selecao/copia manual |
| iOS Safari; Android Chrome reais | Leitura/reflow, imagem indisponivel, selecao manual e gesto de copia |
| NVDA com Firefox/Chrome; VoiceOver/Safari | Titulos/indice/foco/links/copia/live region da 012 sem duplicacao |

Registrar sistema/browser/tecnologia assistiva e versoes exatas no dia do teste.
Larguras 1440/1024/768/390/320 px e intermediarias; texto 200%, zoom 400% para
reflow desktop, fonte fallback, URL longa, header multiline/sticky e imagem
indisponivel. Medir contraste/foco, ausencia de corte/overflow/sobreposicao.
Checar voltar/avancar entre anchors e rotas e recarga com hash conhecido.
URL direta tambem exige fallback de hosting para SPA; verificar configuracao
real sem implantar site nesta etapa. Ambiente ausente fica pendente.

Nenhum teste deve criar cadastro real, enviar mensagens, usar credenciais
externas ou transferir dados reais. Abertura manual de link oficial verificado
e distinta de automacao/acesso administrativo. Verificar copia real quando
ambiente permitir, sem afirmar colagem/salvamento/publicacao detectados pelo app.

## Rastreabilidade e fechamento

| Criterios | Evidencia / tarefas |
| --- | --- |
| CA01 | Entradas livres, URL/recarga e navegacao; T010/T013/T017 |
| CA02–CA04 | Fonte operacional/copy real e estados oficiais; T002/T006/T009/T015 |
| CA05–CA07 | Instrucoes independentes, estado da sessao e edicao atual; T012/T016/T017 |
| CA08 | Matriz de correspondencia verificada; T003/T006/T015 |
| CA09 | Revisao documental 012/modelo v2 e como agendar; T004/T012/T016 |
| CA10 | Integracao copia/falha/manual sem retorno externo; T012/T016/T017 |
| CA11 | Link confirmado/nova aba/nome acessivel; T002/T013/T017 |
| CA12 | Assets/origem/alternativas/falha; T006/T011/T015–T017 |
| CA13–CA14 | Figma/teclado/leitura assistiva/reflow; T005/T014/T017 |
| CA15 | Orientacao validada para divergencias e ajuda; T006/T013/T015 |
| CA16 | Conteudo/shell/fontes/Figma e limites de arquitetura; T008/T015/T018 |
| CA17 | Modalidades/sistemas/formas externas, campos ativos/inativos preservados e links relacionados sem anchors inexistentes; T003/T004/T006/T012/T016 |

verification.md futuro registra revisao do produto, criterio/tarefa, ambiente,
procedimento, resultado, defeito/reteste e pendencia; sem dados reais da Carta.
Executar typecheck/build e suite configurada apos codigo. quickstart descreve
estados/fixtures, entradas, copia/manual e manutencao de fontes/copy/assets.

Nao declarar aceite integral enquanto fontes/copy/matriz, revisao da 012,
Design/Make, ERS ou integracoes/ambientes necessarios estiverem pendentes.
Sem fonte administrativa, CA02–CA04/CA08 continuam sem evidencia de aceite.
Nao criar logs/envio da Carta, storage proprio, progresso, conta externa,
preenchimento automatizado ou promessa de importacao CSV/publicacao.

## Proximo passo

Executar `/spec:validar 011-tutorial-paraiba-digital` com este documento.
T001 possui inventario; T002–T006 permanecem parcialmente ou integralmente
pendentes de evidencia/conciliacao/validacao. T007 possui artefato documental,
sem declarar dependencias concluidas. T008 e testes futuros nao executados.
Resolver fontes administrativas, ERS, Figma, copy e contrato da 012 antes de
`/spec:implementar`; nao substituir lacunas por instrucoes inventadas.

# Implementation Plan: Suporte por e-mail

> **Plano parcialmente superado em 16 de outubro de 2026:** a referencia e o
> node `425:201` e a acao principal e `Copie o e-mail`. Codigo e testes de
> `mailto:` permanecem historicos, mas nao integram a interface planejada.

## Objetivo e status

Preparado em 2026-10-05 para `/spec:plano-implementacao 015-suporte-email`.
O comando recebido como `/spec:plano-implentacao` corresponde ao comando
interno da constitution.

Substituir o placeholder por contato institucional selecionavel, orientacoes,
link explicito mailto, copia do endereco e alternativa manual permanente.
Usuario revisa e envia no aplicativo externo; notificacoes da 014 ficam na 014.

**Plano tecnico documental pendente de confirmacao institucional do contato,
validacao editorial, conferencia do PDF do ERS, Figma e integracoes reais.**
Nao declara canal ativo, layout confirmado ou acoes testadas. Esta etapa cria
somente este arquivo; nao altera src, instala bibliotecas, marca tarefas,
abre aplicativo externo, grava clipboard ou envia mensagem real.

Atualizacao em 2026-10-05 por `/spec:implementar`: helper puro criarMailto e
cinco testes entregues isoladamente. Clipboard neutro ja existe pela 012;
mapa/tipos de canais pela 013, sem configuracao operacional. Inventario abaixo
registra preparacao anterior; interface/contato/controlador continuam pendentes.
Evidencias atuais em verification.md; nenhuma tarefa integralmente concluida.

## Fontes e inventario real

- Spec/plan/tasks 015 lidos nesta etapa; pagina SuporteEmailPage, inventario
  src e package.json; busca de mailto/clipboard/writeText/contatos em src.
- Planos detalhados 002/007/012/013/014 consultados nesta conversa: navegacao,
  provider, clipboard, canais editoriais e separacao de notificacao/backend.
- Contexto de README/manual textual, MVP/fluxos/arquitetura, ADR-003,
  constitution/regras para IA, mapa Figma e plano 016 das etapas anteriores.
- [RFC 6068 — mailto](https://www.rfc-editor.org/rfc/rfc6068), consultada em
  2026-10-05: codificacao dos componentes do URI e parametros. Referencia
  tecnica nao confirma atividade/titularidade de contato institucional.
- Contrato de writeText referenciado no plano detalhado 012, consultado
  nesta conversa, sem teste real ou acesso ao clipboard.

PDF ERS nao extraido/validado. Nenhuma consulta MCP Figma: ferramentas Figma
nao estao expostas nesta sessao. Nao houve confirmacao da equipe, teste de
browser/mailto/clipboard ou build. Sintaxe valida e endereco em placeholder
nao comprovam canal operacional.

| Area | Estado atual | Dependencia |
| --- | --- | --- |
| Rota | /ajuda/suporte-email, specId 015, sem node Figma | Preservar URL; node somente apos consulta |
| Pagina | PageHeader/PlaceholderCard com referencia de contato | Conteudo/acoes/estados reais |
| Contato | gesed.semtd@gmail.com documentado | Equipe confirma endereco/titularidade/atividade |
| Fonte compartilhada | Ainda ausente em src | contatos.ts + canais.ts conforme 013 |
| Mailto/clipboard | Ausentes | Helpers puros/browser e controlador local |
| Navegacao | Contrato 002 ainda nao entregue integralmente | Links internos/breadcrumb/foco sem reload principal |
| Carta | Provider planejado na 007 | Preservar acima das rotas sem ler dados na 015 |
| Testes | Sem suite configurada | Reusar suite futura 012/013 quando houver |

016 possui documentos; nota historica de ausencia nao representa inventario
atual. Rotas 013/014 e contatos citados nao provam integracoes operacionais.

## Contato e estado editorial compartilhados

Endereco editorial oficial unico: `gesed.semtd@gmail.com`, documentado na
secao `E-mail institucional` do documento mestre. Essa confirmacao editorial
nao substitui validacao de titularidade/atividade; nao testar enviando mensagem
sem autorizacao. Estado atual: `pendente`. Isso bloqueia `mailto`, copia ativa
e aceite CA02, sem significar indisponibilidade operacional confirmada.

Consolidar proposta do plan 015 com plano detalhado 013:

- `src/content/support/contatos.ts` possui ID/equipe/endereco; texto visivel,
  destinatario e parametro de copia derivam desse objeto.
- `src/content/support/canais.ts` possui estado pendente/ativo/pausado por
  ID, compartilhado com 013/014/015. contatos.ts referencia suporte-email,
  sem segunda constante de estado. ativo significa validado/publicado, nao
  resposta imediata ou monitoramento em tempo real.
- Validacao/evidencia/responsavel ficam em documento editorial, nao em
  checklist interno no bundle. Avisos ao usuario sao texto validado util.
- Em pendente, apresentar o endereco apenas como referencia documentada, com
  aviso, sem link/copia ativa. Em pausa confirmada, suspender mailto/copia
  principais e manter pagina, explicacao e retorno; em ativo, habilitar as
  duas acoes a partir da mesma fonte. Nao mostrar instrucao de envio como ativa.
- Agendamento como alternativa operacional somente se estado ativo e destino
  real confirmado. Sem confirmacao, manter retorno a ajuda/formulario; nao
  prometer vagas. API da 014 indisponivel nao bloqueia consulta desta pagina.

Nao duplicar endereco no JSX/FAQ/backend. Destinatario SMTP da 014 pertence a
configuracao servidor e precisa de validacao propria, sem importar bundle
frontend como configuracao operacional.

## Contrato de mailto e alternativa manual

Destinatario fixo validado + unico subject generico versionado:
`Dúvida sobre a elaboração da Carta de Serviços`. Sem body, cc, bcc,
cabecalhos arbitrarios, credenciais, parametros da URL ou valores da sessao.
Percent-encode subject UTF-8 uma vez, sem codificar URI inteiro ou aplicar
URLSearchParams que confunda espaco/mais na interpretacao do assunto.

Escopo inicial de endereco no helper: ASCII simples de uma caixa postal,
sem display name, quoted local-part, listas, whitespace ou URI embutido.
Validar fonte editorial antes de gerar URI. Regex abaixo e guarda de escopo,
nao validador universal de e-mail nem prova de atividade. Mudanca para endereco
internacionalizado/quoted exige rever helper/fixtures; nao alterar silenciosamente
endereco para satisfazer regex.

```ts
// src/lib/mailto.ts — funcao pura, nenhum window.open ou efeito
export function criarMailto(endereco: string, assunto: string): string {
  if (!/^[A-Za-z0-9._+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/.test(endereco)) {
    throw new Error("invalid-contact-configuration");
  }
  if (/[\r\n\u0000]/.test(assunto)) throw new Error("invalid-subject-configuration");
  const encode = (value: string) => encodeURIComponent(value)
    .replace(/[!'()*]/g, char => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
  const [local, domain] = endereco.split("@");
  return `mailto:${encode(local)}@${domain}?subject=${encode(assunto)}`;
}
```

Encodar local-part somente como componente, preservando @ separador. Fonte
documentada atual passa no escopo; local com + deve permanecer + depois de
decode, nao virar espaco. Assunto nao recebe CR/LF para cabecalhos extras.
Nao ler window.location ou texto do usuario. Helper deve ser verificado com
RFC/fixtures e clientes reais antes de aceite, sem dependencia pesada.

Usar anchor real `Abrir aplicativo de e-mail`, sem target=_blank exigido,
onClick de envio, interceptacao SPA, janela auxiliar ou abertura em effect.
Clique somente solicita ao sistema o handler. Nao detectar abertura por timer,
blur/visibilitychange ou prometer sucesso; nunca Mensagem enviada/Recebida/
Protocolo. Alternativa manual fica visivel antes/depois: abrir webmail ou
aplicativo escolhido, criar mensagem, usar endereco e revisar/enviar la.

## Clipboard neutro, corridas e duracao

Reusar `src/lib/clipboard.ts` com copiarTexto(text): Promise<CopyResult> definido
no plano 012; se ainda ausente, criar uma unica implementacao neutra. Sem imports
de Carta/tutorial, readText, Permissions API obrigatoria ou fallback oculto.
writeText recebe somente endereco integral (sem mailto/assunto/rotulo/markup),
diretamente no handler explicito; sucesso somente apos promise resolver.

Controlador neutro proposto `src/hooks/useTextCopy.ts`: extrair algoritmo do
useFieldCopy da 012 mantendo requestId/revisao/geracao/trava/timers; a 012
pode usar wrapper fino sem dependencia inversa. Nao importar useFieldCopy de
feature Carta na 015. Esta extracao e proposta para implementacao, nao codigo
existente; adaptar consumidores 012 e testar contrato comum quando entregues.

```ts
// Contrato de src/hooks/useTextCopy.ts; algoritmo completo no plano 012
type TextCopyController = {
  status: "idle" | "pending" | "copied" | "failed";
  slow: boolean;
  copiar: () => void;
};
// useTextCopy(text: string | undefined): TextCopyController
```

Regras obrigatorias: trava imediata por ref, revision por mudanca de texto
commitada (inclusive A/B/A), callbacks somente da tentativa/revisao/montagem
atuais, timers antigos nao apagam novo retorno. Copied 5 s ou ate mudanca/
tentativa/desmontagem; failed ate mudanca/nova tentativa. Pending mantem trava
ate promise terminar, mesmo ao mudar contato/pausar; nao fingir cancelamento.
Apos 10 s, mensagem candidata de demora/manual, sem liberar gravacao concorrente.
Limpar timers e ignorar conclusoes tardias no unmount/StrictMode.

Contato pausado/pendente passa undefined ao controlador, invalidando retorno
anterior sem executar writeText. Mesmo componente/identidade continua montado
durante mudanca de contato/estado para conservar trava da tentativa pendente.
Fonte selecionavel permanece independente da API; foco/selecao nao mudam
automaticamente. UI de sucesso indica operacao realizada, nao conteudo atual
permanente do clipboard. Sistema pode manter texto depois do fim da sessao.

## Conteudo versionado e componentes: codigo base

Copy candidata a validar com equipe. Nao publicar objeto ativo sem evidencia.

```ts
// src/content/support/contatos.ts — estado vem de canais.ts, propriedade 013/015
export const suporteGesed = {
  channelId: "suporte-email", team: "GESED", email: "gesed.semtd@gmail.com",
} as const;

// src/content/pages/suporte-email.ts
export const suporteEmailContent = {
  title: "Suporte por e-mail",
  introduction: "Consulte as orientações para esclarecer dúvidas sobre levantamento, organização e elaboração da Carta de Serviços.",
  contactTitle: "Contato de orientação", subject: "Dúvida sobre a elaboração da Carta de Serviços",
  open: "Abrir aplicativo de e-mail", copy: "Copiar endereço de e-mail",
  pending: "Copiando endereço…", copied: "Endereço copiado",
  failed: "Não foi possível copiar. Selecione o endereço e copie manualmente.",
  slow: "A cópia está demorando. Você pode selecionar o endereço e copiar manualmente.",
  externalNotice: "Revise e envie a mensagem no aplicativo de e-mail. Esta página não acompanha o envio ou a resposta.",
  manual: "Se o aplicativo não abrir, use seu webmail ou aplicativo de preferência, crie uma mensagem e informe o endereço apresentado como destinatário.",
  manualCopy: "Você também pode selecionar o endereço e copiar manualmente.",
  guidanceTitle: "Como descrever sua dúvida",
  guidance: ["Informe seu nome, órgão e setor no próprio e-mail.",
    "Explique a etapa relacionada, a dúvida e o resultado esperado.",
    "Não envie senhas, documentos pessoais ou dados de cidadãos. Não é necessário anexar a Carta ou o CSV."],
  exampleTitle: "Exemplo de assunto", help: "Voltar à ajuda",
  appointment: "Consultar atendimento agendado", form: "Ir para o formulário da Carta",
};
```

```tsx
// src/pages/SuporteEmailPage.tsx — imports de conteudo, helpers, hook/navegacao reais
export function SuporteEmailPage() {
  const c = suporteEmailContent;
  const contact = suporteGesed;
  const state = supportChannels[contact.channelId];
  const active = state.status === "ativo";
  const copy = useTextCopy(active ? contact.email : undefined);
  const hintId = useId();
  const message = !active ? "" : copy.status === "pending" ? copy.slow ? c.slow : c.pending :
    copy.status === "copied" ? c.copied : copy.status === "failed" ? c.failed : "";
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" },
        { label: "Preciso de ajuda", href: "/ajuda" }, { label: c.title }]} />
      <PageHeader title={c.title} description={c.introduction} />
      <section className="email-support" aria-labelledby="email-support-contact">
        <h2 id="email-support-contact">{c.contactTitle}</h2>
        {state.status !== "ativo" ? <p>{state.notice}</p> : null}
        <label htmlFor="support-email-address">{contact.team}</label>
        <textarea id="support-email-address" readOnly value={contact.email}
          rows={2} wrap="soft" spellCheck={false} aria-describedby={hintId} />
        <p id={hintId}>{c.manualCopy}</p>
        {active ? (
          <>
            <div className="email-support-actions">
              <a href={criarMailto(contact.email, c.subject)}>{c.open}</a>
              <button type="button" onClick={copy.copiar} disabled={copy.status === "pending"}>
                {c.copy}
              </button>
            </div>
            <p>{c.externalNotice}</p><p>{c.manual}</p>
          </>
        ) : null}
        <p role="status" aria-live="polite" aria-atomic="true">{message}</p>
      </section>
      <section aria-labelledby="email-support-guidance">
        <h2 id="email-support-guidance">{c.guidanceTitle}</h2>
        <ul>{c.guidance.map((text, index) => <li key={index}>{text}</li>)}</ul>
        <h3>{c.exampleTitle}</h3><p>{c.subject}</p>
      </section>
      <nav aria-label="Continuar no manual">
        <AppLink href="/ajuda">{c.help}</AppLink>
        {supportChannels["atendimento-agendado"].status === "ativo" ? (
          <AppLink href="/ajuda/atendimento-agendado">{c.appointment}</AppLink>
        ) : null}
        <AppLink href="/formulario-carta">{c.form}</AppLink>
      </nav>
    </>
  );
}
```

AppLink/Breadcrumb/useTextCopy/supportChannels sao contratos futuros, nao
componentes/configuracao existentes. Completar imports/conteudo; labels auxiliares
fixos do exemplo devem ir para catalogo. PageHeader fornece unico h1 e shell
fornece main/header/footer. Nenhum hook/storage/prop de Carta/diagnostico.

V015-02 permanece decisao editorial aberta: o JSX acima nao pode ser publicado
com endereco/instrucao manual incondicionais. Definir apresentacao por estado
ativo/pendente/pausado e aviso validado antes de implementar esse trecho.
Nao inferir ocultacao ou autorizacao de referencia selecionavel em estado
nao ativo. Testar acesso direto e mudanca de estado conforme decisao de T002.

Textarea readOnly rotulada garante alternativa selecionavel por teclado/toque;
nao disabled, sem caracteres artificiais de quebra. Endereco ASCII sem newline
nao tem divergencia CR/LF de texto multiline da 012. Se Figma exigir bloco
textual, aceitar somente apos provar selecao acessivel; nao usar ellipsis/wbr
que altere valor copiado. Label deve identificar Endereço de e-mail da GESED
na copy final, sem depender so de nome de equipe.

Configuracao de contato invalida deve ser detectada na validacao de conteudo
antes de publicar; se houver falha runtime, conservar orientacoes/retornos e
omitir acoes de contato com mensagem versionada, sem derrubar pagina ou gerar
href falso. Nao mostrar endereco pendente como confirmado; aviso identifica
referencia/indisponibilidade conforme texto aprovado. Orientacoes gerais ficam
consultaveis em todos os estados, sem promover envio ao canal pausado.

## Navegacao, Figma e CSS propostos

Links internos seguem 002/003 com href real/modificadores/historico e memoria
preservada. mailto segue navegador, nunca router SPA. Breadcrumb/retornos fixos
funcionam no acesso direto sem history.back. Nao limpar sessao em blur ou
visibilitychange; trocar app nao e encerramento autorizado da Carta.
Estado editorial nao faz consulta SMTP/agenda; pagina funciona sem backend.

Design YaVUdqYa3boHpvGrxf4ZJ5, pagina 167:2: identificar frame proprio,
contato/acoes/manual/orientacoes/pausa/copia e responsividade. 169:495 e FAQ,
nao frame deste canal. Make dVm7lEZdBFqOiiySWLWUqp node 0:1: confirmar
tokens/controles/foco/feedback. Sem consulta MCP/asset nesta etapa; inventario
de assets novos vazio. Atualizar mapa somente com nodes comprovados. Se Figma
mostrar formulario de envio, conciliar escopo/ERS antes de codigo/backend.

```css
/* globals.css: base proposta, validar composicao/cores no Design/Make */
.email-support { display: grid; gap: var(--space-3); min-inline-size: 0; }
.email-support p { overflow-wrap: anywhere; margin: 0; }
.email-support textarea {
  inline-size: 100%; min-inline-size: 0; max-inline-size: 100%;
  box-sizing: border-box; font: inherit; padding: var(--space-3); resize: vertical;
}
.email-support-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); }
.email-support-actions a, .email-support-actions button {
  max-inline-size: 100%; white-space: normal; min-block-size: 2.75rem;
}
```

Reusar Inter/tokens/variantes de botao confirmadas e foco com contraste medido.
Sem corte de mensagem/endereco, largura fixa ou dependencia so de cor/icone.
Live region curta fica montada; foco permanece no botao. Disabled durante
pending precisa de teste de foco; aria-disabled + handler guardado e alternativa
se necessario. Nenhum toast/live region duplicada da 013.

## Arquivos e sequencia

| Arquivo | Intervencao / tarefa |
| --- | --- |
| src/content/support/contatos.ts | Fonte unica de endereco/equipe; T008 |
| src/content/support/canais.ts, contrato 013 | Estado unico/avisos/destinos; T002/T008 |
| src/content/pages/suporte-email.ts | Copy/subject/exemplo/retornos; T008 |
| src/lib/mailto.ts | Construir URI puro controlado; T009 |
| src/lib/clipboard.ts | Utilitario neutro compartilhado 012/015; T010 |
| src/hooks/useTextCopy.ts | Controlador neutro extraido conforme contrato 012; T010 |
| useFieldCopy da 012, se implementado | Wrapper/consumidor do hook comum, sem duplicar algoritmo |
| src/pages/SuporteEmailPage.tsx | Composicao/acoes/manual/estados; T011 |
| src/styles/globals.css | Reflow/foco/copia; T012 |
| Navegacao/breadcrumb da 002 | Integracao minima sem router paralelo; T011 |
| docs/design-system/mapa-figma-telas.md | Node confirmado apos consulta; T005 |
| specs/015-suporte-email/verification.md e quickstart.md | Evidencias/procedimento apos entrega; T015 |

T001 tem inventario; T002 contato e T003 copy institucional pendentes. T004
possui contrato proposto, T005 consulta visual pendente; T006 possui este
artefato sem dependencias encerradas. Executar T007 validar antes de implementar
fonte/helpers/controlador/pagina/layout. Nao alterar notificacoes/backend 014.

## Verificacao futura e ambientes

Reusar suite compartilhada 012/013 quando existir; nao instalar framework so
para labels estaticas. Testes significativos: mailto codificado uma vez,
destinatario/subject decodificados corretos, +/acentos/&/? sinteticamente
verificados, sem body/cc/bcc/valores de URL/sessao. Fonte de contato alterada
atualiza texto/href/parametro writeText. Configuracao fora do escopo e rejeitada,
sem mudar endereco silenciosamente ou aceitar CRLF/URI como contato.

Controlador: mocks resolve/reject/API ausente/contexto inseguro; sem write no
mount, sem Copiado antes de promise; trava antes de render, A/B/A durante pending,
pausa do contato, retry depois de termino, demora, unmount/StrictMode e timers
antigos. Se hook neutro reutiliza suite 012, aqui verificar adapter/mensagens/
parametro apenas, sem duplicar todos os testes internos. Manual sempre
selecionavel; sem anuncio de envio ou deteccao ficticia de aplicativo.

Integracao: ajuda/alternativa 014/URL direta/recarga/retornos, ativo/pendente/
pausado e agendamento alternativo somente confirmado. Com Carta em memoria e
storage bloqueado, navegar/voltar preserva valores sem ler no suporte. Conferir
ausencia de dados nos hrefs/copia/requests e independencia do backend.

| Ambiente proposto | Evidencia exigida |
| --- | --- |
| Windows 11 Chrome/Edge/Firefox; macOS Safari | Mailto com handler configurado e sem handler; alternativa permanente |
| iOS Safari; Android Chrome reais | Handler/selecao por toque/copia em HTTPS/reflow |
| NVDA com Chrome/Firefox; VoiceOver Safari | Nomes de contato/acoes, foco e status local |

Registrar versoes de sistema/browser/aplicativo de e-mail e configuracao do
handler. Abrir compose somente em ambiente controlado, conferir destinatario/
assunto e encerrar SEM enviar. Testes automatizados interceptam URI/clipboard,
sem abrir apps ou sobrescrever clipboard do usuario. Para verificar copia real,
usar fixture sintetica de contato em contexto isolado e colar em destino local,
sem leitura de clipboard adicionada ao produto. Mocks nao comprovam handler/
permissoes de dispositivo; ambiente ausente permanece pendente.

Larguras 1440/1024/768/390/320 px e intermediarias, texto 200%, zoom 400% para
reflow desktop, endereco longo/fonte fallback. Medir foco/contraste e selecao
integral por teclado/toque, sem cortes/overflow. Recarga depende do fallback
SPA real, a conferir sem deploy nesta etapa. Validar contato e copy com equipe
separadamente de teste de URI: abrir compose nao prova atividade institucional.

Checks apos codigo: npm run typecheck/build e suite disponivel, consumidores
012/013 se helpers/fontes comuns mudarem. verification.md registra revisao,
CA/tarefa, validacao institucional, ambiente/procedimento/resultado/defeito/
reteste/pendencia, sem dados pessoais. quickstart inclui fonte/estado, mailto,
copia/manual e procedimento sintetico sem envio real.

## Rastreabilidade e limites de aceite

| Criterios | Evidencia / tarefas |
| --- | --- |
| CA01 | Entradas/URL/recarga/shell; T011/T013 |
| CA02/CA09 | Contato validado e fonte unica; T002/T008/T009/T010/T013 |
| CA03/CA08 | URI/gesto sem anuncio de envio; T009/T013/T014 |
| CA04/CA05 | Manual permanente/copia verdadeira/falha; T010/T013/T014 |
| CA06 | Orientacoes/exemplos/limites validados; T003/T008/T013 |
| CA07/CA10 | Memoria/retornos/destinos sem dados; T011/T013 |
| CA11 | Figma/teclado/status/reflow; T005/T012/T014 |
| CA12 | Pausa/alternativa verdadeira/escopo; T002/T003/T013 |
| CA13 | Conteudo/Figma/ausencia de coleta/envio; T007/T011/T015 |

Nao declarar aceite integral com contato/Figma/ERS/copy/integracoes/ambientes
pendentes. Nao implementar SMTP/backend de envio, formulario, anexos, protocolo,
rascunho, leitura de clipboard/Carta ou promessa de abertura/envio/recebimento.

## Proximo passo

Continuar `/spec:implementar` apos confirmar contato/copy, resolver V015-02
e consultar ERS/Figma. V015-01 teve plan/tasks sincronizados com fontes
separadas contatos.ts/canais.ts. Helper mailto entregue isoladamente; clipboard
neutro existente, controlador/consumidores ainda ausentes. Nenhuma tarefa
marcada concluida; resultados e limites atuais em verification.md.

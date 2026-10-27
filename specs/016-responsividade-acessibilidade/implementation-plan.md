# Implementation Plan: Responsividade e acessibilidade

## Status e objetivo

Preparado em 2026-10-05 para `/spec:plano-implementacao
016-responsividade-acessibilidade` (comando recebido: plano-implentacao).
**Plano tecnico documental; pendente de conciliacao ERS/WCAG, consulta Figma
e disponibilidade dos ambientes assistivos. Nao representa auditoria executada
nem prontidao para aceite transversal.** Todas as tarefas continuam pendentes.

Atualizacao por `/spec:implementar` em 2026-10-05: guard de links internos
entregue em src/lib/navigation.ts e integrado ao handler existente do AppShell.
Quatro testes isolados adicionados. Nao foram alterados layout/tokens/CSS;
matriz e evidencias atuais em accessibility-matrix.md e verification.md.
O inventario abaixo registra preparacao anterior, nao auditoria executada.

Consolidar acessibilidade e responsividade dos componentes e processos reais,
com correcoes no componente responsavel e evidencias por criterio/estado.
Nao criar pagina 016, roteador novo, widget, modo separado, login, backend
ou regras de negocio. Codigo somente em `/spec:implementar`, depois de
resolver bloqueios pertinentes e executar `/spec:validar`.

## Fontes consultadas e limites

- spec.md, plan.md e tasks.md da 016; RF01–RF08 e CA01–CA15.
- Constitution, regras de IA, docs/implementation-plan.md, roadmap,
  manual textual e documentos de produto/arquitetura consultados nesta conversa.
- Contratos de navegacao da 002 e planos de 006–015, incluindo a revisao
  condicional de agendamento da 007 e consumidores 008–012.
- App, routes, AppShell, ButtonLink, FormField, paginas Home/OQueECarta/
  Formulario, index.html, globals.css, tokens.css e package.json.
- Mapa Figma local: referencias documentais, sem consulta visual executada.
- [WCAG 2.2, recomendacao W3C](https://www.w3.org/TR/WCAG22/),
  [WCAG-EM](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/) e
  [testes de acessibilidade do Playwright](https://playwright.dev/docs/accessibility-testing),
  consultados em 2026-10-05. Referencias tecnicas nao comprovam conformidade.

O ERS PDF existe na raiz, mas nao foi extraido/validado nesta etapa; leitura
do manual textual nao equivale a leitura do PDF. Nenhuma ferramenta MCP Figma
esta exposta nesta sessao. Registrar consultas pendentes, sem inventar frames,
medidas ou fidelidade visual. Nao foram executados testes de interface,
leitura assistiva, contraste ou build; nenhum pacote foi instalado.

## Inventario real e dependencias

| Area | Estado observado | Intervencao futura e dono |
| --- | --- | --- |
| App | history/popstate por pathname, scroll imediato, sem titulo/foco de rota | Consolidar politica unica da 002, T005/T009 |
| AppShell | Header/nav/main/footer; main sem ID/skip link; intercepta todos os cliques | Corrigir no shell/links compartilhados, sem duplicacao |
| ButtonLink | Anchor simples, sem navegacao compartilhada | Conciliar com 002 para preservar memoria e comportamento nativo |
| FormField | Label por id; hint sem ID; sem erro; required no badge | Evoluir contrato explicito com 007/008/014, T011 |
| CSS | Body minimo 320px, header sticky, grade minima 220px, foco laranja com alpha | Medir no contexto; suspeitas nao sao defeitos comprovados, T010 |
| Tipografia | Inter com fallback; tokens semanticos existentes | Reusar, testar falha de fonte e medir contrastes reais |
| Home | Conteudo inicial e links, sem entrega completa da 002 comprovada | Avaliar shell/conteudo presente; nao aprovar jornada planejada |
| 004/007 | Paginas inspecionadas usam PlaceholderCard | Verificacao funcional pendente das features proprietarias |
| Demais fluxos | Contratos documentados, entrega funcional nao comprovada | Revalidar codigo e inventario antes de testar |
| 005/017 | 005 documentada e com rotas placeholder; 017 estruturada documentalmente, sem ambiente publicado | Diagnostico permanece dependencia funcional; deploy e testes publicados seguem o plano da 017 |
| Testes | Apenas dev/build/preview/typecheck em package.json | Propor infraestrutura abaixo; reusar suite se entregue antes |

Nao gerar baseline de acessibilidade por leitura de codigo. Diferenciar
observacao estatica, defeito reproduzido e resultado de verificacao real.
Uma rota ou placeholder nao comprova processo entregue.

| Rota/processo | Feature | Estados a incluir quando entregues |
| --- | --- | --- |
| `/` | 002 | Shell, links, menu, CTAs, titulo e foco |
| `/explorar-por-etapas` | 003 | Cards, destinos e ancoras; rota ainda ausente do codigo atual |
| `/o-que-e-carta-de-servicos` | 004 | Leitura, secoes, imagens/listas e links |
| `/diagnostico`, `/diagnostico/resultado` | 005 | Escolhas, resultado, retorno e continuidade |
| `/organizar-informacoes` | 006 | Tres topicos e 13 informacoes, textos longos, acesso livre |
| `/formulario-carta` | 007/008 | Partes, listas, condicionais, erros/sugestoes, recuperacao e memoria apenas |
| `/previa`, exportacao | 009/010 | Vazia/parcial/completa, pendencias, dados longos, download/falha |
| `/tutorial-paraiba-digital` | 011/012 | Passos, imagem indisponivel, copia/manual/recusa e retorno |
| `/ajuda` | 013 | FAQ aberta/fechada, hash, destinos e pausa editorial |
| `/ajuda/atendimento-agendado` | 014 | Agenda/vazio/falha, selecao, revisao, conflito, envio incerto e registro |
| `/ajuda/suporte-email` | 015 | Contato, Copie o e-mail, cópia/falha e alternativa manual; layout 425:201 |

A 014 e agendamento de suporte GESED, separado da configuracao de agendamento
da Carta na 007. Nao executar agenda externa, abrir links preenchidos na Carta
ou enviar mensagens institucionais durante verificacoes.

## Referencias Figma e composicao transversal

| Contexto | Referencias identificadas | Situacao T016 e adaptacao obrigatoria |
| --- | --- | --- |
| Design/Make | Design `YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`; Make `dVm7lEZdBFqOiiySWLWUqp`/`0:1` | Acesso visual indisponivel; nenhum node inspecionado nesta rodada. |
| Home, exploracao e conceito | `310:175`, `575:483`, `365:265` | Referencias de pagina; validar shell, texto longo, foco, menu e reflow. |
| Diagnostico | `387:1020`, resultado `387:1362` | Perguntas/resultados vem da 005; o frame de resultado e apenas amostra de estado. |
| Organizacao | `387:1918` | Adaptar aos tres topicos e 13 informacoes atuais; altura e navegacao acompanham conteudo. |
| Formulario 007 | `653:1540`, `2024:269`, `641:58`, `647:650`, `660:2533` | Cinco partes da mesma rota. `2024:269` e imagem de referencia: reconstruir controles HTML reais. |
| Campo, orientacao e label | `811:306`, `811:382`, `651:317` | Variantes sem/com orientacao; abertura nao modifica dados, foco ou progresso. |
| Previa 007/009 | `821:308` | Um componente compartilhado; ampliar para conteudo integral e estados vazio/parcial/completo/falha. |
| Tutorial 011/012 | `564:635`, `564:730`, `564:852`, `564:980`, `564:1232`, `564:1357` | Uma pagina com seis estados. `564:980` cresce para cinco grupos e 25 definicoes aplicaveis. |
| FAQ | `169:495` | Pagina 013; FAQ aberta/fechada, hashes, canais e estados editoriais exigem verificacao. |
| Ajuda 014/015 | `425:201`, `425:296`, `446:206`, `470:444` | Entrada compartilhada e variantes da 014; conteudo real substitui datas/dados de exemplo. |

A composicao e a das paginas proprietarias: header/nav, main, h1, secoes,
acoes e footer. A 016 verifica reflow e estados desses contextos; nao inventa
um layout proprio. T004 registra nodes consultados, assets, estado, divergencia
e adaptacao. Na T016, tentativas web em `310:175`, `2024:269`, `564:980` e
`425:201` falharam e nao havia navegador conectado ou MCP Figma. Referencia
desktop nao comprova uso movel, teclado ou foco. O
[registro T016](../../docs/verificacoes/t016-figma-acessibilidade.md) mantem
pendencia por tela e estados. Atualizar evidencia visual somente apos consulta
real; documentar adaptacoes quando o visual criar barreira, preservando
informacao e hierarquia.

### Adaptacoes que prevalecem sobre a amostra visual

1. **Etapa 4 expandida (`564:980`):** altura e quantidade de linhas sao
   determinadas pela sessao v3. Renderizar cinco grupos e todas as 25
   definicoes aplicaveis; 13 campos abertos copiam somente quando preenchidos,
   12 escolhas exibem a selecao sem botao. Colecoes repetem por ID e estados
   K/S/ON/E ocultam inativos. Ausencia, copia pendente/sucesso/falha e texto longo
   nao podem ser truncados para reproduzir o frame.
2. **Formulario real (`2024:269`):** a imagem do frame orienta composicao, mas
   cada label, campo, grupo, lista e acao vira HTML/React operavel. Preservar
   cinco partes, validacao, obrigatoriedade, condicionais, IDs estaveis, resumo
   de erros, teclado e associacoes; nenhuma imagem, overlay ou mapa de cliques
   substitui controles.
3. **Orientacoes (`811:306`/`811:382`):** sao variantes do mesmo Form-Card.
   Abrir/fechar explicacao vinda do contrato da 006 nao altera valor, progresso,
   validacao nem foco inesperadamente; conteudo oculto sai da arvore/foco e o
   acionador expoe estado.
4. **Previa compartilhada (`821:308`):** 007 e 009 usam a mesma projecao e
   estrutura semantica. O componente acomoda Carta vazia, parcial, completa,
   erros estruturais, sugestoes separadas, colecoes e valores longos. Um card
   isolado do Figma nao limita a pagina nem autoriza uma segunda previa.

Essas adaptacoes sao contratos documentais; sua aparencia ainda depende de
consulta Figma autenticada e verificacao nos ambientes definidos pela 016.

## Meta e matriz de criterios

WCAG 2.2 A/AA permanece **meta proposta da 016**, a conciliar em T002 com ERS
e referencias locais a 2.1 AA. Nao alterar documentos normativos silenciosamente.
Se 2.1 tambem for exigida, registrar checklist separado, incluindo 4.1.1;
nao misturar criterios removidos ou AAA na lista A/AA da 2.2.

O inventario abaixo usa os identificadores da
[WCAG 2.2](https://www.w3.org/TR/WCAG22/). Na implementacao, cada ID gera
registros separados por pagina/processo/estado, com metodo e resultado.
Nao aprovar um conjunto inteiro com uma unica verificacao.

```ts
// Base para gerar accessibility-matrix.md; nao e resultado de auditoria.
export const wcag22AAIds = [
  "1.1.1",
  "1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5",
  "1.3.1", "1.3.2", "1.3.3", "1.3.4", "1.3.5",
  "1.4.1", "1.4.2", "1.4.3", "1.4.4", "1.4.5",
  "1.4.10", "1.4.11", "1.4.12", "1.4.13",
  "2.1.1", "2.1.2", "2.1.4", "2.2.1", "2.2.2", "2.3.1",
  "2.4.1", "2.4.2", "2.4.3", "2.4.4", "2.4.5", "2.4.6", "2.4.7", "2.4.11",
  "2.5.1", "2.5.2", "2.5.3", "2.5.4", "2.5.7", "2.5.8",
  "3.1.1", "3.1.2", "3.2.1", "3.2.2", "3.2.3", "3.2.4", "3.2.6",
  "3.3.1", "3.3.2", "3.3.3", "3.3.4", "3.3.7", "3.3.8", "4.1.2", "4.1.3",
] as const;
type CriterionId = typeof wcag22AAIds[number];
type AuditResult = "pendente" | "atendido-no-escopo" | "falhou" | "nao-aplicavel";
type AuditRecord = {
  criterion: CriterionId;
  acceptanceCriteria: readonly string[];
  route: string; process: string; state: string; owner: string;
  method: "automatizado" | "manual" | "combinado";
  environment: string; versions: string; commit: string; date: string;
  result: AuditResult; evidence: readonly string[];
  defectId?: string; justification?: string;
};
```

Resultados iniciam pendentes. Ambiente ausente, pagina nao implementada ou
criterio nao testado nunca e nao aplicabilidade. Inventariar midia, gestos,
autenticacao e operacoes de dados antes de justificar ausencia de contexto.
Adotar criterio de processo completo, com limites explicitados, apoiado na
[metodologia WCAG-EM](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/).

| Grupo | Verificacao principal | Tarefas |
| --- | --- | --- |
| Conteudo/estrutura | DOM, nomes, idioma, leitura, imagens e sequencia | T009/T012/T013 |
| Apresentacao | Contraste medido, zoom, espacamento, hover e reflow | T010/T014 |
| Teclado/navegacao | Operacao, skip link, foco, historico, hash e tempo | T009/T013/T015 |
| Entrada/formularios | Grupos, erros, revisao, listas, campos condicionais e toque | T011/T013/T014 |
| Estados | Status, falhas, recuperacao, mensagem verdadeira e anuncios | T012/T015 |
| Contextos especiais | Midia/autenticacao/gestos, aplicabilidade justificada | T002/T008/T017 |

Contraste e tamanho seguem a spec. Distinguir preferencia de projeto de 44px
para acoes principais do criterio AA 2.5.8 (24px, com excecoes e espacamento);
registrar a avaliacao por controle e estado, conforme a
[referencia normativa](https://www.w3.org/TR/WCAG22/#target-size-minimum).

## Navegacao, titulo e foco: contratos e codigo base

Reusar NavigationProvider/useAppNavigate da 002 quando entregues; o hook
retorna funcao de navegacao, nao objeto. Nao duplicar roteador/provider na 016.
T005 consolida politica com 002: uma transicao identificada por chave/revisao,
pathname/search/hash; título document.title atualizado depois do commit da rota;
um unico responsavel por foco e scroll, sem efeito a cada edicao da Carta.

| Evento | Politica proposta a conciliar |
| --- | --- |
| Entrada direta sem hash | Titulo correto; nao roubar foco ja estabelecido sem necessidade |
| Navegacao interna explicita | Focar h1 ou main apos montar; scroll ao inicio |
| Hash inicial/interno | Abrir painel/parte necessario, focar alvo conhecido e posicionar |
| Voltar/avancar | Restaurar URL completa, focar alvo de hash ou título após montagem; aplicar política central de scroll, sem histórico paralelo de coordenadas |
| Re-render, digitacao, resize | Nao disparar foco de rota |
| Alvo removido/inexistente | Fallback na parte ou main; nunca elemento desmontado |

Não criar histórico paralelo de foco/coordenadas; estado de navegação nunca
contém textos da Carta em URL/history. Nao impedir comportamento nativo de mailto, externo, download,
target diferente de _self ou clique modificado. Reutilizar a guarda existente em `src/lib/navigation.ts` no único `AppLink`,
sem duplicar sua implementação nas features. Testar também URL malformada.

O handler único preserva query desconhecida e hash, conforme o contrato central. Clique no skip link e hash na mesma pagina deve cumprir sua
politica especifica, evitando handler concorrente com focus de rota.

```tsx
// Trecho para integrar no AppShell, preservando estrutura atual:
<a className="skip-link" href="#conteudo-principal">Pular para o conteúdo</a>
// header/nav existentes
<main id="conteudo-principal" className="site-main" tabIndex={-1}>{children}</main>
// footer existente
```

```ts
// Base de resolucao: nao executar querySelector com fragmento arbitrario.
export function resolveFocusTarget(root: HTMLElement, hash: string): HTMLElement {
  let target: HTMLElement | null = null;
  try {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    target = id ? document.getElementById(id) : null;
  } catch { /* Fragmento invalido usa fallback. */ }
  if (target && root.contains(target) && target.getClientRects().length > 0) return target;
  return root.querySelector<HTMLElement>("h1") ?? root;
}
// Depois de abrir parte/painel e montar o destino:
// garantir tabindex=-1 em titulos/destinos nao interativos;
// target.focus({ preventScroll: true });
// target.scrollIntoView({ block: "start", behavior: "auto" });
```

Destino focavel precisa estar ativo, sem hidden/inert/ancestor oculto; validar
esse contrato no registro de alvos. Foco de item/erro/painel pertence a seu
componente, nao ao shell. Nao utilizar tabIndex positivo ou scroll suave
obrigatorio. Medir altura real do header com ResizeObserver no shell ou
remover sticky no contexto problematico; nao fixar offset universal.

## Formularios, listas e agendamento

FormField compartilha o contrato da 007/008/014. A 016 corrige barreiras no
dono do componente, sem criar outra variante. Base proposta com atributos
aplicados explicitamente no controle:

```tsx
import type { ReactNode } from "react";
type FormFieldProps = {
  id: string; label: string; hint?: string; error?: string;
  required?: boolean; children: ReactNode;
};
export function fieldDescriptionIds(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean).join(" ") || undefined;
}
export function FormField({ id, label, hint, error, required, children }: FormFieldProps) {
  return <div className="form-field">
    <label htmlFor={id}>{label}{required ? " (Obrigatório)" : ""}</label>
    {hint ? <p id={`${id}-hint`}>{hint}</p> : null}
    {children}
    {error ? <p id={`${id}-error`}>{error}</p> : null}
  </div>;
}
// Exemplo no consumidor, com error vindo da regra ativa da feature:
// <input id={id} required={required} aria-invalid={error ? true : undefined}
//   aria-describedby={fieldDescriptionIds(id, hint, error)} ... />
```

Preservar props/classes/badge usados pelos consumidores existentes ao evoluir
o componente; o trecho nao e substituicao cega. Formulario da Carta usa revisao
controlada e previa parcial livre, conforme 007/008; required nativo nao pode
bloquear esse fluxo. Sugestao editorial nao gera aria-invalid. Grupos usam
fieldset/legend, descricao/erro associados e controles nativos.

Resumo de erro apos acao explicita recebe foco e oferece links para alvos
fechados; abrir parte antes de focar campo. Nao combinar foco e alert assertivo
para o mesmo resumo. Digitacao nao move foco nem anuncia todos os erros.
Autocomplete pessoal na 014 respeita finalidade real e nao amplia coleta.

| Operacao | Foco/estado esperado |
| --- | --- |
| Adicionar item | Primeiro controle do novo ID, sem usar indice como identidade |
| Remover item | Vizinho seguro ou botao adicionar da lista |
| Mover etapa | Manter ID/controle e anunciar nova posicao comedidamente |
| Fechar painel | Manter/retornar ao acionador quando foco estava dentro |
| Escolher horario | Selecao/fuso/disponibilidade compreensiveis; sem calendario visual obrigatorio |
| Ocultar campo condicional | Fora do DOM ativo/teclado; retorno ao acionador se foco estava no campo |

Agendamento da Carta segue RF03/CA19–CA24 da 007:

- Nao/nao informado oculta todas as configuracoes. Sim exige tipo; sistema é
  exigido somente quando o conjunto inclui Online. Presencial exclusivo não o mostra.
- Tipo e conjunto Online, Presencial ou ambos. Nao marcar required em cada
  checkbox individual: isso exigiria ambos; validar o conjunto com a 008,
  usando legend/instrucao de obrigatoriedade e erro associado ao grupo.
- Com Online, sistema é escolha única: Paraiba Digital ou Outro sistema ou site.
- Paraiba Digital oculta link/exibicao; externo exige URL e escolha unica
  Dentro do Paraiba Digital/Em uma nova pagina. Apenas registra configuracao.
- Troca de condicao preserva valores na sessao, retira mensagens inativas e
  nao executa redirecionamento. Nao usar somente opacity/aria-hidden em campos
  que continuariam focaveis. Remover controles ativos ou usar ocultacao efetiva.
- Verificar retorno de foco, recarga, combinacoes dos tipos e consumidores:
  previa/copia omitem dados inativos; CSV tem 17 registros e valores inativos
  vazios, conforme 010. A 016 nao muda essa representacao.

## Reflow, tokens, foco e preferencias: CSS base

As classes/tokens abaixo sao propostas funcionais. Consultar Figma e medir
estados antes de adotar valores visuais; nao afirmar contraste aprovado.
Nao usar overflow-x:hidden no body para mascarar dados cortados.

```css
.skip-link {
  position: fixed;
  inset-block-start: var(--space-2);
  inset-inline-start: var(--space-2);
  z-index: 100;
  transform: translateY(-200%);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-inverse);
  background: var(--color-background-brand);
}
.skip-link:focus { transform: none; }
.site-main, .form-field { min-inline-size: 0; }
.site-main { overflow-wrap: anywhere; }
#conteudo-principal, .site-main [id] {
  scroll-margin-block-start: calc(var(--header-height, 0px) + var(--space-4));
}
.step-grid {
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
}
.site-main img { max-inline-size: 100%; block-size: auto; }
.hero-actions { flex-wrap: wrap; }
.site-main pre { white-space: pre-wrap; overflow-wrap: anywhere; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  /* Desativar somente animacoes/transicoes existentes e identificadas no inventario. */
}
```

Nao aplicar regras globais de imagens a icones decorativos sem conferir
consumidores. Conferir grade/paddings/filhos na largura efetiva. Body minimo
320px nao prova reflow. Preservar dados e ordem DOM ao mudar viewport.
Dimensoes extensas nao geram truncamento/ellipsis de dados da Carta.

Medir cores compostas com alpha, contraste de texto e indicadores/bordas nos
fundos reais. O foco atual laranja transparente exige medicao; candidato de
cor opaca so pode ser adotado com resultados por fundo e regressao. Nao
remover outline de main/titulos focados sem alternativa perceptivel. Registrar
token alterado, ratio, estados, consumidores e divergencia com Figma.

Testar espacamento: line-height 1.5, paragrafos 2 vezes o tamanho de fonte,
letter-spacing 0.12em e word-spacing 0.16em, sem impor esses valores como
estilo padrao. Medidas de texto/contraste/espacamento usam a
[WCAG 2.2](https://www.w3.org/TR/WCAG22/). Testar Inter bloqueada, fallback,
movimento reduzido, retrato/paisagem e teclado virtual real. Ajustar sticky
quando encobrir foco/acoes; screenshot de viewport nao verifica teclado virtual.

## Paineis, imagens e mensagens

Reusar FAQ/paineis das features; details/summary ou button aria-expanded com
aria-controls conforme contrato existente. Oculto nao participa da leitura
ou teclado. Dialogo somente se ja necessario no produto; entrada, fechamento,
contencao e retorno precisam de verificacao especifica.

Capturas de tutorial possuem orientacao textual equivalente suficiente para
o passo. Alt depende do proposito: decorativo vazio, informativo contextual;
nao repetir toda a legenda automaticamente. Falha do asset mantem instrucoes.

Regiao de status permanece montada antes da atualizacao. Copy, download e
consulta nao movem foco. Usar `role="status"` para retorno nao urgente e erro
associado/resumo para correcao; evitar alert repetido por campo a cada tecla.
Mensagens vem de src/content da feature, sem motor paralelo na 016.

Timers de confirmacao nao removem valor nem alternativa manual. A 010 anuncia
download iniciado, nao arquivo salvo; a 012 copia, nao publica; a 014 distingue
resultado incerto/registro/notificacao de confirmacao conforme decisao propria;
a 015 confirma somente cópia do endereço, sem abrir aplicativo ou anunciar
envio. A 016 verifica esses contratos.

## Infraestrutura automatizada proposta

Decisao T006: reusar suite browser existente se entregue; caso contrario,
propor devDependencies `@playwright/test` e `@axe-core/playwright`, com versoes
compativeis fixadas no lockfile na implementacao. Nao instalar agora.
Usar Chromium/Firefox/WebKit para regressao automatizada; WebKit nao comprova
Safari/iOS real. [Playwright documenta integracao com axe e a necessidade de
verificacoes complementares](https://playwright.dev/docs/accessibility-testing).

```ts
// playwright.config.ts, proposto para T008, reusar config se ja existente.
import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/a11y",
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure" },
  reporter: [["list"], ["html", { open: "never" }]],
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173 --strictPort",
    url: "http://127.0.0.1:4173", reuseExistingServer: false,
  },
});
```

```ts
// tests/a11y/shell.spec.ts: exemplo do que testar apos entregar T009.
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("shell permite pular navegacao e nao apresenta violacoes detectadas", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Ir para o conteúdo" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#conteudo-principal")).toBeFocused();
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
});

test("conteudo do shell cabe a 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  const fits = await page.evaluate(() =>
    document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
  expect(fits).toBe(true);
});
```

Varredura completa padrao do axe identifica problemas adicionais; classificar
por criterio/meta na matriz. Nao converter passes/incomplete do motor em
resultado manual ou conformidade AA. Nao excluir selectors/regras para fazer
suite passar sem decisao rastreada e justificativa de aplicabilidade.
Reflow automatizado e teste auxiliar, nao comprova ausencia de corte interno.

Expandir testes para estados reais: FAQ aberta, revisao com erros, listas
editadas, campos condicionais internos/externos, recuperacao, copia recusada
e falhas da API controlada. Fixtures devem usar provider/decoder e contratos
reais das features; nao aprovar formulario apenas por mock de markup.
Destinos ausentes ficam na matriz como pendentes, sem teste vazio aprovado.

Scripts propostos para package.json: `test:a11y` = `playwright test` e
`test:a11y:report` = `playwright show-report`. Se houver mais suites browser,
usar config especifica no comando. Na implementacao, instalar browsers da
infraestrutura aprovada e registrar versoes; falha de ambiente nao e aceite.

Comandos futuros, nao executados nesta etapa:

```text
npm run typecheck
npm run build
npm run test:a11y
npm run test:a11y:report
```

Relatorios/traces/screenshots somente em massa sintetica. API/SMTP da 014 em
ambiente de teste; nunca apontar testes a endpoint institucional de producao.

## Matriz manual, massa e evidencias

| Ambiente proposto | Execucao e limite |
| --- | --- |
| Windows Chrome/Edge + NVDA | Desktop completo; registrar SO/browser/NVDA/build |
| Windows Firefox + NVDA | Regressao de campos, grupos, anuncios e foco |
| macOS Safari | Teclado/layout/links; ambiente ainda nao confirmado |
| iOS Safari + VoiceOver | Leitura movel/toque/orientacao/teclado virtual reais |
| Android Chrome | Toque/reflow/teclado virtual; TalkBack amplia cobertura |

T003 atribui responsavel e versoes reais. Ao menos leitura desktop e movel
precisam de evidencia. Emulacao e Playwright WebKit nao substituem ambientes
reais. Ambiente indisponivel fica pendente, com dono e proxima verificacao.

Massa sintetica: Carta vazia/parcial/completa, custo 0, null/Sim/Nao, Online/
Presencial/ambos, sistema interno/externo e duas exibicoes; URL longa, texto
com acentos/HTML literal/quebras, listas extensas e itens parciais. Preservar
IDs/ordem/valores ao navegar, corrigir, trocar condicoes, redimensionar e recarregar.
Storage bloqueado/parcial, imagens/fontes ausentes, clipboard recusado, download
falho, agenda vazia/conflito/rede incerta e notificacao pendente usam contratos
reais. Falha simulada nao deve gerar solicitacao/envio institucional.

Roteiro T013–T015:

1. Percorrer processos por teclado: skip link, menu, ancoras, historico,
   partes, listas, erros, copia, FAQ e suporte. Conferir foco sem armadilha.
2. Repetir com leitor desktop/movel: nomes, legendas, selecoes, pendencias,
   anuncios, orientacoes e destino de foco. Registrar sequencia observada.
3. Verificar 1440/1024/768/390/320px e intermediarias, retrato/paisagem.
   Texto 200% e zoom 400% em janela de referencia 1280px sao verificacoes
   separadas de mudar viewport; zoom real e espacamento permanecem manuais.
4. Medir contraste de todos os estados e alvos/espacamento; testar hover,
   reduced motion, falha de fonte/imagem e teclado virtual.
5. Exercitar falhas/resultados incertos e retornar a edicao; conferir dados
   preservados, mensagens verdadeiras e alternativas acessiveis.
6. Corrigir defeitos reproduzidos e retestar criterio/contexto e consumidores
   afetados. Ampliar regressao somente se mudanca/falha justificar.

Documentos preparados em T008/T017, sem resultados de auditoria inventados:

- `accessibility-matrix.md`: criterio, CA, pagina/processo, estado, metodo,
  dono, ambiente/versoes, commit/data, resultado, evidencia e justificativa.
- `verification.md`: escopo da rodada, comandos, casos manuais, defeitos,
  retestes e dependencias; nao afirmar conformidade global com pendencias.
- `quickstart.md`: ambiente/fixtures/configuracao e roteiros reproduziveis.
- `evidence/`: arquivos sinteticos autorizados, identificados por rodada;
  evitar valores reais, segredos, logs de sessao e anexos pessoais.

Defeito: ID, criterio/CA, contexto, passos, esperado/observado, impacto,
evidencia, ambiente, dono, commit da correcao e reteste. Priorizar bloqueio
de processo e problema compartilhado; nao rotular suspeita estatica como falha.

## Arquivos futuros e sequencia

| Arquivo/area | Intervencao | Tarefas |
| --- | --- | --- |
| src/app/App.tsx, routes.tsx e navegacao da 002 | Titulo/foco/hash/historico e metadados; sem rota 016 | T005/T009 |
| src/components/layout/AppShell.tsx | Skip link/main, sticky e landmarks | T009/T010 |
| src/components/ui/ButtonLink.tsx e links compartilhados | Guard nativo e integracao unica | T009 |
| src/components/forms/FormField.tsx | IDs, erros, ajuda e contrato explicito | T005/T011 |
| src/styles/globals.css, tokens.css e estilos locais | Reflow/foco/alvos/preferencias, tokens somente apos medicao | T010 |
| src/content e componentes proprietarios 003–015 | Textos/semantica/estados locais; sem absorver funcionalidades | T011/T012 |
| index.html | Conferir idioma/viewport; titulo por pagina pertence ao shell | T009 |
| package.json e lockfile | Infraestrutura de testes aprovada; sem alterar stack | T008 |
| playwright.config.ts, tests/a11y/ | Criar se suite equivalente ainda nao existir | T008/T013–T015 |
| Pasta specs/016 | Matriz, verificacao, quickstart e evidencias sinteticas | T008/T017 |
| Mapa Figma | Atualizar apenas frames realmente consultados | T004 |

Sequencia: T001–T005 consolidam contexto/decisoes; este plano prepara T006,
sem encerrar suas dependencias. T007 valida documentos; T008 registra baseline
real. T009–T012 corrigem defeitos nos donos; T013–T015 verificam processos;
T016 corrige/retesta; T017 consolida checks e conclusao limitada ao escopo.
Nenhuma checkbox e marcada como concluida por criacao deste documento.

## Rastreabilidade e prontidao

| Criterio | Evidencia futura | Tarefas |
| --- | --- | --- |
| CA01 | Inventario implementado/pendente por rota e estado | T001/T008/T016–T017 |
| CA02 | Larguras/intermediarias/orientacoes sem corte ou perda | T003/T010/T014 |
| CA03 | Texto, zoom/reflow e espacamento verificados separadamente | T003/T010/T014 |
| CA04 | Operacoes completas por teclado sem armadilhas | T009/T011–T013 |
| CA05 | Foco de rota/hash/historico/lista/painel e condicional | T005/T009/T011/T013 |
| CA06 | Idioma/titulos/estrutura/nomes/alternativas lidos | T009/T012–T013 |
| CA07 | Medicoes por fundo/estado e alvos/excecoes documentados | T002/T010/T014 |
| CA08 | Associacoes, resumo e retorno a parte/campo sem perda | T005/T011/T013/T015 |
| CA09 | IDs/listas/horarios e grupos condicionais operaveis | T011/T013 |
| CA10 | Carregamento/vazio/falha/incerto e recuperacao | T012/T015 |
| CA11 | Retorno de copia/download/suporte sem sucesso externo falso | T012/T015 |
| CA12 | Preferencias, fonte/imagem e teclado virtual reais | T010/T012/T014 |
| CA13 | Ambientes/versoes reais, automacao e leitura manual | T003/T008/T013–T017 |
| CA14 | Matriz por criterio/processo, defeitos/retestes e lacunas | T002/T008/T016–T017 |
| CA15 | Consulta Figma/adaptacoes, dados sinteticos e escopo preservado | T003–T004/T010/T014/T016–T017 |

Antes do codigo: conciliar ERS/meta, confirmar politica de foco com 002 e
retorno com 007/008/014, consultar Figma dos ajustes, definir infraestrutura,
ambientes/donos e massa sintetica. Capacidade do Paraiba Digital externo e
politica de URLs pertencem a 007/011, nao sao decididas pela 016.

Antes do aceite: executar checks e metodos manuais nos contextos entregues,
resolver/retestar falhas pertinentes e manter ausencias como pendentes.
005, fluxos placeholders, Figma e ambientes ainda indisponiveis impedem aceite
integral. A 017 agora define como preparar esses ambientes, mas não comprova sua
existência; isso não impede consolidar este plano documental. Proximo comando:
`/spec:validar 016-responsividade-acessibilidade`.

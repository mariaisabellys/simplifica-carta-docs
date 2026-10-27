# Contrato de roteamento e navegação compartilhada

## Status

Decisão documental registrada em 16 de outubro de 2026. Este contrato deve ser
implementado antes das páginas dependentes, mas esta rodada não altera código.
Ele prevalece sobre exemplos divergentes de navegação nas specs 001–016.

## Responsabilidades

- `routes.tsx` é a fonte única para paths, página, título, `specId`, node Figma,
  presença na navegação e tipo de layout.
- `NavigationProvider` é o único dono do estado da URL e da escrita em
  `window.history`.
- `useAppLocation` expõe `pathname`, `search`, `hash` e a URL interna normalizada.
- `useAppNavigate` executa navegação programática.
- `AppLink` preserva a semântica e o `href` nativo e intercepta somente cliques
  internos elegíveis.
- `ButtonLink`, breadcrumb, marca e links da navbar compõem `AppLink`; não
  implementam seus próprios handlers de histórico.
- `AppShell` é o dono compartilhado de título do documento, destino de foco,
  rolagem e link de pular para o conteúdo.
- Cada feature controla somente estados internos que não sejam navegação global,
  como pergunta ativa, parte do formulário ou feedback de cópia.

Não instalar uma biblioteca de roteamento somente para cumprir este contrato.
A implementação atual pode continuar baseada na History API, desde que exista
uma única abstração e testes de comportamento.

## Localização canônica

O estado navegável é a combinação:

```text
pathname + search + hash
```

- Normalizar barra final apenas no `pathname`, preservando `/`.
- Preservar parâmetros desconhecidos e fragmentos ao ler a URL.
- Não armazenar dados da Carta, respostas do diagnóstico ou dados pessoais em
  query string, hash ou `history.state`.
- Comparar a URL completa antes de decidir que a navegação é redundante.
- Alterar somente `search` ou `hash` também é navegação válida.

## Contrato de `navigate`

Interface documental:

```ts
type NavigateOptions = {
  replace?: boolean;
  focus?: "route" | "preserve";
  scroll?: "route" | "preserve";
};

type AppLocation = {
  pathname: string;
  search: string;
  hash: string;
  href: string;
};

type Navigate = (destination: string, options?: NavigateOptions) => void;
```

- Usar `pushState` por padrão e `replaceState` somente quando solicitado ou ao
  normalizar uma URL inválida sem criar entrada inútil no histórico.
- `popstate` atualiza toda a localização e nunca executa novo `pushState`.
- Navegação para a mesma URL completa não cria entrada duplicada.
- Destinos internos aceitam path absoluto da aplicação, query e fragmento.
- URLs externas, `mailto:`, `tel:`, downloads e novas janelas seguem o navegador.

## Links internos

`AppLink` intercepta somente botão principal sem modificadores quando:

- o evento não foi previamente cancelado;
- não existe `download`;
- `target` é ausente ou `_self`;
- o protocolo é HTTP(S) e a origem é a mesma da aplicação.

Ctrl/Cmd/Shift/Alt, clique do meio, menu de contexto, abertura em nova aba e
copiar endereço continuam funcionando nativamente. O `href` real permanece no
DOM para acessibilidade, fallback, SEO e inspeção.

## Query string e estados de página

Para a entrada compartilhada 013–015, aplicar o
[contrato de canais de ajuda](contrato-canais-ajuda.md): FAQ navega à entrada
014; na própria rota 014, o botão abre calendário por estado interno, sem
auto-link ou novo parâmetro de URL. Retorno interno usa “Voltar aos canais”;
histórico do navegador segue rotas reais. Recuperação de tentativa da agenda
é responsabilidade da 014/T014, nunca dados pessoais em query/hash.

- O tutorial usa `/tutorial-paraiba-digital?etapa=1` a `?etapa=6`.
- Ausência, repetição ou valor inválido de `etapa` é normalizado para a etapa 1
  com `replaceState`.
- Anterior/próxima alteram somente `etapa`, preservando parâmetros desconhecidos.
- Voltar/avançar restaura a etapa indicada pela URL.
- A parte ativa da feature 007 poderá seguir o mesmo mecanismo somente após
  decisão específica; este contrato não cria parâmetros novos por inferência.

## Fragmentos

- `/ajuda#duvidas-frequentes` e `/ajuda#precisa-de-apoio` são os destinos canônicos, conforme os IDs do conteúdo da FAQ.
- O fragmento antigo `#perguntas-frequentes` na rota `/ajuda` é um alias documental: normalizar para `#duvidas-frequentes` com replace, preservando search, antes de resolver foco. Não criar uma segunda seção.
- Quando o fragmento existir, rolar e focar o alvo real após a renderização.
- O alvo deve aceitar foco programático com `tabIndex={-1}` quando não for
  naturalmente focável.
- Fragmento ausente usa o comportamento normal de rota e não causa exceção.
- Mudança somente de hash não remonta provider da Carta nem limpa estado.

## Título, foco e rolagem

- Cada rota fornece um título curto; `document.title` usa o padrão
  `{título} | Simplifica Carta` e a home usa `Simplifica Carta`.
- Navegação interna nova, incluindo mudança de etapa do tutorial, move o foco
  para o `h1` ou título da região atual depois da renderização.
- `popstate` restaura o estado da URL; o destino de foco segue a mesma regra da
  tela restaurada, sem tentar focar o link acionador que pode não existir.
- Fragmentos focam seu alvo e têm prioridade sobre o título da rota.
- Navegação de rota rola para o topo; fragmentos rolam para o alvo.
- Atualizações internas que não representam navegação preservam foco e rolagem.
- Deve existir `#conteudo-principal` e link “Pular para o conteúdo”.

## Rotas e fallback

Rotas oficiais desta fase:

| Rota | Feature | Observação |
| --- | --- | --- |
| `/` | 002 | Home. |
| `/explorar-por-etapas` | 003 | Acesso livre às quatro etapas. |
| `/o-que-e-carta-de-servicos` | 004 | Página educativa. |
| `/diagnostico` | 005 | Perguntas. |
| `/diagnostico/resultado` | 005 | Resultado calculado; acesso direto sem resultado deve ser tratado pela feature. |
| `/organizar-informacoes` | 006 | Preparação. |
| `/formulario-carta` | 007/008 | Formulário e validação. |
| `/previa` | 009/010 | Prévia e exportação. |
| `/tutorial-paraiba-digital` | 011/012 | Página com etapa em query string. |
| `/ajuda` | 013 | FAQ e apoio. |
| `/ajuda/atendimento-agendado` | 014 | Jornada de atendimento. |
| `/ajuda/suporte-email` | 015 | Orientação de e-mail. |

Uma rota desconhecida nunca retorna a home silenciosamente. Deve renderizar
uma página 404 dentro do shell, com título, explicação e link para a home,
preservando a URL solicitada. O servidor de produção deve possuir fallback SPA
para entregar `index.html`; o fallback de infraestrutura não substitui a 404 da
aplicação.

## Estado compartilhado

- `NavigationProvider` deve permanecer montado acima das páginas.
- O futuro `CartaSessionProvider` fica abaixo ou ao lado dele, também acima da
  página atual, sem `key` derivada da URL.
- Navegar, alterar query/hash ou receber `popstate` não recria nem limpa a Carta.
- A navegação não lê ou escreve conteúdo da Carta.

## Verificações obrigatórias antes do aceite

Revisão documental T015 em 22/10/2026: inventário, retornos e lacunas no
[registro de verificação](../verificacoes/t015-navegacao.md). Não implica implementação.

O provider também sincroniza `hashchange` nativo e deduplica eventos de uma
mesma URL. O shell aplica foco somente após o destino estar montado, uma vez
por navegação. Destinos relativos de query/hash são resolvidos contra a URL
atual completa. Um href explícito para outra rota não herda automaticamente
query da origem; preservar os componentes especificados no destino.

Exemplo de consumidor futuro para mudar a etapa sem descartar search/hash:

```tsx
const location = useAppLocation();
const navigate = useAppNavigate();
function goToStep(next: number) {
  const params = new URLSearchParams(location.search);
  params.set("etapa", String(next));
  navigate(`${location.pathname}?${params.toString()}${location.hash}`);
}
```

Normalização de etapa inválida usa a mesma preservação com `{ replace: true }`.
`Concluir Guia` retorna a `/`, preservando a Carta, sem certificar publicação.
Partes da 007 permanecem internas; não criar `?parte` nesta fase. A matriz de
retornos e os alvos de correção do registro T015 complementam este contrato.

- URL direta e recarga para todas as rotas.
- clique interno, clique modificado, clique do meio, `target`, download e URL externa;
- voltar/avançar entre paths, etapas e fragmentos;
- normalização de `?etapa=` inválida sem duplicar histórico;
- título, foco, rolagem e skip link;
- rota desconhecida e fallback SPA de produção;
- preservação da Carta durante path, query, hash e histórico;
- operação por teclado e leitor de tela.

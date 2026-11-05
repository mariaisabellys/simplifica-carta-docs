# Referência visual local — 004 O que é uma Carta de Serviço

## Proveniência

- arquivo Figma: `YaVUdqYa3boHpvGrxf4ZJ5`;
- node: `365:265` (`O que é a Carta?`);
- extração: `get_design_context` e `download_assets`, em 27/10/2026;
- frame: 1440 × 2778 px;
- captura normativa: [desktop.png](desktop.png);
- conteúdo oficial: `src/content/pages/o-que-e-carta.ts`.

## Composição desktop

1. Reutiliza header/footer da 002.
2. Introdução em duas colunas: breadcrumb, eyebrow, H1 e descrição à esquerda;
   painel creme `Por que é importante?` à direita.
3. Faixa full-bleed de Fundamentos com gradiente navy–ciano, texto introdutório
   e dois cards outline.
4. Seção de informações em fundo branco: título, descrição e dez cards creme em
   grid de três colunas. A última linha pode ficar incompleta.
5. Legislação com título/ícone e lista de três normas. Cada linha contém tipo,
   número/ano, resumo e ação `Consultar`.

Medidas de referência: header 66 px; painel de importância com raio 20 px;
fundamentos cerca de 404 px; cards de informação cerca de 429 × 129 px no frame.
Essas alturas não são fixas no código.

Paleta: navy `#00395b`, navy secundário `#0c326f`, ciano `#12b5d0`, laranja
`#f97304`, texto `#666666`, borda `#dddddd`, creme forte
`rgba(255,235,209,.70)` e creme suave `rgba(255,235,209,.57)`.

## Assets locais

Os SVGs em `src/assets/o-que-e-carta-servico/` cobrem importância,
fundamentos, os dez campos e legislação. São decorativos quando o texto
adjacente já comunica o significado; usar `aria-hidden="true"`.

Mapeamento dos campos: `nome-do-servico`, `o-que-e`, `quem-pode-utilizar`,
`documentos-necessarios`, `etapas`, `prazo`, `custos`,
`canais-de-atendimento`, `agendamento` e `informacoes-adicionais`.

## Adaptação responsiva

- introdução e fundamentos passam de duas colunas para uma;
- grid dos campos passa de três para duas e depois uma coluna;
- lista legal vira cards empilhados; o link permanece após o resumo na ordem do
  DOM e preserva alvo mínimo de toque;
- títulos usam `clamp()`; textos e cards crescem sem recorte;
- nenhuma largura/altura do frame deve impedir zoom a 200% ou copy maior;
- links externos recebem foco visível, `target="_blank"` e
  `rel="noopener noreferrer"`.

## Divergências resolvidas

- o texto e os resumos legais vêm exclusivamente de `o-que-e-carta.ts`;
- para o Decreto nº 9.756/2019, usar a redação versionada sobre unificação dos
  canais digitais, não a paráfrase antiga visível no frame;
- Inter é a única família tipográfica do produto;
- a obrigatoriedade e os links legais seguem a validação documental da feature,
  não a aparência do protótipo.

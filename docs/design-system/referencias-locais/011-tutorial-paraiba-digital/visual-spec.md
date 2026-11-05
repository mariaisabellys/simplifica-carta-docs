# Referência visual local — 011 Tutorial Paraíba Digital

## Proveniência e estados

Figma `YaVUdqYa3boHpvGrxf4ZJ5`, extraído em 04/11/2026. Os seis frames são
estados da mesma rota `/tutorial-paraiba-digital`, selecionados por `?etapa=1..6`.

| Etapa | Node | Captura | Dimensão |
| --- | --- | --- | --- |
| 1 — Acesse a plataforma | `564:635` | [etapa-1-desktop.png](etapa-1-desktop.png) | 1280 × 1215 |
| 2 — Faça login | `564:730` | [etapa-2-desktop.png](etapa-2-desktop.png) | 1280 × 1312 |
| 3 — Localize o cadastro | `564:852` | [etapa-3-desktop.png](etapa-3-desktop.png) | 1280 × 1201 |
| 4 — Cadastre as informações | `564:980` | [etapa-4-desktop.png](etapa-4-desktop.png) | 1280 × 1294 |
| 5 — Revise os dados | `564:1232` | [etapa-5-desktop.png](etapa-5-desktop.png) | 1280 × 1354 |
| 6 — Publique o serviço | `564:1357` | [etapa-6-desktop.png](etapa-6-desktop.png) | 1280 × 1251 |

Conteúdo: `src/content/tutorial/paraiba-digital.ts`. Contratos:
`specs/011-tutorial-paraiba-digital/contrato-integracao-v3.md` e, na etapa 4,
`specs/012-copia-dados-tutorial/contrato-transferencia-v3.md`.

## Composição compartilhada

Header e banner escuro com breadcrumb, título e descrição antecedem o workspace.
No desktop, uma barra lateral de aproximadamente 280 px mostra as seis etapas;
o painel principal flexível contém marcador de etapa, percentual, barra de
progresso, ícone, título, conteúdo específico e navegação anterior/próxima.

As etapas 1–3 e 5–6 usam instruções e uma região ilustrativa da plataforma. A
etapa 4 substitui essa região pela projeção da Carta e pelos controles da 012.
Percentuais normativos: 17, 33, 50, 67, 83 e 100. Trocar de etapa muda estado e
histórico da mesma página; não cria rotas ou páginas duplicadas.

## Etapa 4 e dados da Carta

A captura ilustra seis linhas, mas a implementação apresenta cinco grupos e as
25 definições aplicáveis da Carta v3: 13 tipos abertos copiáveis quando
preenchidos e 12 escolhas sem botão. Coleções repetem por item e condições
K/S/ON/E podem alterar a quantidade. O painel cresce naturalmente; não usar a
altura do frame nem a amostra como limite. Valores vêm exclusivamente do
provider da 007, nunca dos exemplos do Figma.

## Responsividade e acessibilidade

- abaixo de aproximadamente 900 px, sidebar e painel empilham; o progresso vira
  navegação compacta sem perder acesso às seis etapas;
- CTAs quebram em linhas e podem ocupar largura total; conteúdo longo não usa
  elipse nem rolagem horizontal;
- etapa atual usa indicação além de cor; etapas concluídas mantêm rótulo;
- cada mudança explícita atualiza URL, título/foco coordenado e progresso, sem
  anunciar o painel inteiro;
- ilustrações recebem alternativa conforme função; placeholders não são
  descritos como capturas autênticas;
- a etapa 4 preserva leitura, seleção manual e feedback acessível da 012.

## Divergências normativas e limite de evidência

O conteúdo versionado contém correções posteriores ao frame, especialmente o
fluxo de análise/publicação da etapa 6; ele sempre prevalece. URLs, nomes de menu
e comportamento da plataforma oficial ainda exigem validação institucional. As
imagens internas vistas nos frames são mockups de orientação, não evidência de
interface externa atual.

Os frames são desktop. O comportamento mobile acima é contrato adaptativo do
projeto. Inter e tokens locais substituem valores literais. A referência local
elimina consulta obrigatória ao Figma, mas não substitui comparação futura do
navegador, testes de reflow e validação editorial/operacional.

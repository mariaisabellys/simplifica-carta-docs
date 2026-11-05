# Referência visual local — 002 Home e navegação

## Proveniência

- arquivo Figma: `YaVUdqYa3boHpvGrxf4ZJ5`;
- node: `310:175` (`home`);
- extração: `get_design_context` e `download_assets`, em 27/10/2026;
- frame: 1440 × 1627 px;
- captura normativa: [desktop.png](desktop.png);
- conteúdo oficial: `src/content/pages/home.ts`.

## Composição desktop

1. Header branco de 67 px, borda inferior, marca à esquerda e navegação à
   direita. A marca é texto HTML: `Simplifica` navy, `Carta` ciano, divisor e
   `Guia de Serviços` cinza.
2. Hero full-bleed de aproximadamente 559 px, com gradiente
   `#033a5d → #0f3e66 → #0388af`. O conteúdo ocupa a metade esquerda; a arte da
   Carta ocupa a direita. Título grande em duas linhas, descrição e dois CTAs.
3. Processo em fundo branco, título e descrição centralizados. Quatro passos
   formam uma lista horizontal conectada; número, eyebrow, título e descrição
   permanecem legíveis sem depender apenas de cor.
4. CTA educativo em painel creme `#ffebd1`, com ícone circular, texto e botão
   laranja.
5. Footer navy `#002b45`, com navegação, descrição do produto, endereço, marca
   institucional, divisor e copyright.

Container principal: até 1216 px. Raios: 8 px nos controles e 20 px no painel.
Paleta principal: navy `#00395b`, ciano `#12b5d0`, laranja `#ff760f`, texto
secundário `#666666`, navegação `#848b96` e texto de footer `#8fbce5`.

## Assets locais

- `src/assets/home/hero-carta-servico.png`: arte informativa do hero; usar texto
  alternativo que descreva a Carta de Serviço ilustrada;
- `src/assets/brand/semt-d-branco.png`: assinatura institucional do footer;
- `src/assets/home/play.svg`, `text-align-start.svg` e `arrow-right.svg`:
  ícones decorativos dos CTAs, com `aria-hidden="true"`.

Linhas, círculos, divisores e conectores são geometria de layout e devem ser
implementados em CSS, não como novas imagens.

## Adaptação responsiva

- até 860 px, a navegação vira controle de menu acessível;
- hero passa de duas colunas para uma, mantendo texto antes da arte no DOM;
- os CTAs quebram linha e preservam alvo mínimo de 44 px;
- os passos passam de quatro colunas para duas e depois uma; conectores não
  podem cruzar texto e podem ser ocultados no mobile;
- o CTA educativo e o footer empilham seus blocos sem largura/altura fixa;
- título usa `clamp()` e nenhuma seção deve reproduzir coordenadas absolutas.

## Divergências resolvidas

- a captura diz “seis etapas”, mas apresenta quatro. Renderizar “quatro
  etapas”, conforme `home.ts`;
- a captura usa `Iniciar o guia`; renderizar `Iniciar guia`;
- `Material de apoio` aparece no frame, mas está fora do MVP e não entra na
  navegação atual;
- Outfit/Rawline observadas no frame são substituídas por Inter, fonte oficial
  do projeto;
- todo texto do frame é ilustrativo quando divergir do conteúdo versionado.

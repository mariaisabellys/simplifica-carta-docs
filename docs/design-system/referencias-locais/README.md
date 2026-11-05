# Referências visuais locais

Esta pasta torna a implementação independente de acesso ao arquivo privado do
Figma. Cada feature possui uma captura integral do frame desktop e uma
especificação visual que registra estrutura, medidas, tokens, adaptações e
divergências editoriais.

## Ordem de autoridade

1. `src/content/` define todo texto, rótulo, destino e dado exibido;
2. a spec e os contratos arquiteturais definem comportamento e acessibilidade;
3. o `visual-spec.md` e o `desktop.png` locais definem composição e aparência;
4. o link/node do Figma é apenas a proveniência da extração.

Não é necessário consultar o Figma para implementar as features que já possuem
um pacote local completo. O código gerado pelo MCP, coordenadas absolutas e
classes Tailwind não fazem parte do contrato do projeto.

## Lotes disponíveis

| Feature | Captura | Especificação | Manifesto |
| --- | --- | --- | --- |
| 002 — Home e navegação | [desktop.png](002-home-e-navegacao/desktop.png) | [visual-spec.md](002-home-e-navegacao/visual-spec.md) | [manifest.json](002-home-e-navegacao/manifest.json) |
| 003 — Explorar por etapas | [desktop.png](003-explorar-por-etapas/desktop.png) | [visual-spec.md](003-explorar-por-etapas/visual-spec.md) | [manifest.json](003-explorar-por-etapas/manifest.json) |
| 004 — O que é uma Carta | [desktop.png](004-o-que-e-carta-servico/desktop.png) | [visual-spec.md](004-o-que-e-carta-servico/visual-spec.md) | [manifest.json](004-o-que-e-carta-servico/manifest.json) |
| 005 — Diagnóstico | [questionário](005-diagnostico-servico-publico/diagnostico-desktop.png) e [resultado](005-diagnostico-servico-publico/resultado-desktop.png) | [visual-spec.md](005-diagnostico-servico-publico/visual-spec.md) | [manifest.json](005-diagnostico-servico-publico/manifest.json) |
| 006 — Organizar informações | [desktop.png](006-organizar-informacoes/desktop.png) | [visual-spec.md](006-organizar-informacoes/visual-spec.md) | [manifest.json](006-organizar-informacoes/manifest.json) |
| 007 — Formulário da Carta | [partes 1–5](007-formulario-carta-servico/visual-spec.md#proveniência-e-estados) | [visual-spec.md](007-formulario-carta-servico/visual-spec.md) | [manifest.json](007-formulario-carta-servico/manifest.json) |
| 008 — Linguagem simples | Integrada às referências da 007 | [visual-spec.md](008-validacao-linguagem-simples/visual-spec.md) | [manifest.json](008-validacao-linguagem-simples/manifest.json) |
| 009 — Prévia HTML | [componente desktop](009-previa-html/componente-desktop.png) | [visual-spec.md](009-previa-html/visual-spec.md) | [manifest.json](009-previa-html/manifest.json) |
| 010 — Exportação CSV | Integrada ao cabeçalho da 009 | [visual-spec.md](010-exportacao-csv/visual-spec.md) | [manifest.json](010-exportacao-csv/manifest.json) |
| 011 — Tutorial Paraíba Digital | [etapas 1–6](011-tutorial-paraiba-digital/visual-spec.md#proveniência-e-estados) | [visual-spec.md](011-tutorial-paraiba-digital/visual-spec.md) | [manifest.json](011-tutorial-paraiba-digital/manifest.json) |
| 012 — Cópia de dados | Integrada à etapa 4 da 011 | [visual-spec.md](012-copia-dados-tutorial/visual-spec.md) | [manifest.json](012-copia-dados-tutorial/manifest.json) |
| 013 — Fluxo de ajuda | [FAQ desktop](013-fluxo-de-ajuda/desktop.png) | [visual-spec.md](013-fluxo-de-ajuda/visual-spec.md) | [manifest.json](013-fluxo-de-ajuda/manifest.json) |
| 014 — Atendimento agendado | [estados da jornada](014-atendimento-agendado/visual-spec.md#proveniência-e-estados) | [visual-spec.md](014-atendimento-agendado/visual-spec.md) | [manifest.json](014-atendimento-agendado/manifest.json) |
| 015 — Suporte por e-mail | Integrada à entrada compartilhada da 014 | [visual-spec.md](015-suporte-email/visual-spec.md) | [manifest.json](015-suporte-email/manifest.json) |

## Contratos transversais

| Pacote | Conteúdo | Manifesto |
| --- | --- | --- |
| [Componentes compartilhados](../componentes-compartilhados/README.md) | Shell, header, footer, navegação, cards, labels, stepper e feedback | [manifest.json](../componentes-compartilhados/manifest.json) |

## Limite de evidência

Os frames extraídos são desktop. Comportamentos mobile descritos nas
especificações são adaptações normativas do projeto, não capturas de variantes
mobile do Figma. O aceite final ainda exige comparação do navegador com as
imagens locais e testes nas larguras previstas.

Os contratos transversais de header, footer, navegação, cards, botões, labels,
stepper e feedback estão em [componentes compartilhados](../componentes-compartilhados/README.md),
com manifesto próprio e sem duplicação de assets.

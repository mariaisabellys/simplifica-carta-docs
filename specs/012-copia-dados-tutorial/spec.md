# Spec: Cópia de dados no tutorial

19/10/2026 — T010 documental. [Anterior](historico/2026-10-19-pre-t010-spec.md).

## Objetivo e decisão vigente

Apresentar todos os campos aplicáveis da Carta na etapa 4 da 011, com botão
somente nos campos abertos preenchidos. Aplicar a decisão de 19/10 em
[docs/spec](../../docs/spec.md) e o [contrato de transferência v3](contrato-transferencia-v3.md).
A matriz normativa tem 25 definições em cinco grupos; 13 abertas, 12 escolhas.
Não fixar número de instâncias de botão; documentos e etapas são repetíveis.

## Requisitos funcionais

- RF01 — Montar somente em fill-information, /tutorial-paraiba-digital?etapa=4.
  Acesso direto livre, sem diagnóstico, revisão, CSV ou preparação concluídos.
  011 controla etapas/URL/progresso/CTAs; não criar página própria.
- RF01A — Fonte editorial da página é src/content/tutorial/paraiba-digital.ts,
  sincronizada em 27/10/2026 com o contrato 25/13/12. A lista fixa e os valores
  ilustrativos foram removidos; a matriz v3 determina a projeção e nenhum
  exemplo, lorem ipsum, placeholder ou valor fictício é fallback da sessão.
- RF02 — Consumir Carta segura do provider 007, com revisão atual. Sem storage,
  decoder ou segunda Carta na 012. Preservar fonte ao copiar/navegar.
- RF03 — Exibir todos os campos aplicáveis em cinco grupos na ordem da 007.
  Escolhas legíveis sem botão; textos abertos copiam somente sua string original.
  Documento por nome; etapa por título/orientação; prazo sem unidade agregada.
  URL é texto copiável. Não usar agregações da 010 nem extrair texto do DOM.
- RF04 — Gesto explícito, Copiado! somente após sucesso atual. Operações por
  chave estável, revisão e geração; manter trava acima das montagens conforme
  contrato. Retorno tardio nunca confirma valor alterado ou campo oculto.
- RF05 — Falha explica alternativa manual selecionável. Nenhuma leitura de
  clipboard, permissões como requisito prévio ou sucesso por fallback invisível.
  String enviada preserva fonte; manual preserva conteúdo/quebras visíveis,
  conforme decisão de 07/10, sem promessa de bytes idênticos no destino.
- RF06 — Vazios/coleções vazias identificados, sem cópia de mensagens.
  null não é Não; false é exibido sem botão; Ativo/Inativo é estado configurado,
  sem afirmar publicação ou confirmação da interação.
  K/S/ON/E inativos não montados, valores retidos não vazam nem são apagados.
  Carta parcial e qualquer estado editorial permitem cópia de texto presente.

## Segurança, acessibilidade e visual

Texto literal sem interpretação de HTML/Markdown, linkificação ou recurso remoto.
Sem backend, logs de conteúdo, envio, cópia integral, exportação ou edição aqui.
Clipboard do sistema pode persistir após sessão; não prometer limpeza ou cadastro.
Labels, feedback e ajuda versionados; nomes acessíveis incluem campo/item,
foco estável, anúncios curtos, manual por teclado/toque, Inter/tokens/reflow.

Node 564:980 é variante ampliável da etapa 4. Layout adapta-se aos cinco grupos;
não limitar cobertura para caber no frame. Consulta visual/ERS/copy pendentes.
007 fornece dados/retorno; 008 não impõe gate; 011 recebe região; 015 pode
reutilizar utilitário neutro sem importar domínio da Carta; 016 orienta testes.

## Critérios de aceite

| ID | Resultado esperado |
| --- | --- |
| CA01 | Etapa 4 mostra 25 definições aplicáveis em cinco grupos com dados atuais. |
| CA02 | Copiar texto aberto envia somente string original e confirma após conclusão. |
| CA03 | Documentos e textos de etapas têm cópia por item/propriedade, sem agregação. |
| CA04 | Carta vazia mantém grupos/ausências e Preencher Carta, sem dados ilustrativos. |
| CA05 | Carta parcial permite copiar somente os textos presentes sem gate global. |
| CA06 | Zero textual copiável; escolhas/null/false apenas exibidos, com ressalva de Ativo. |
| CA07 | Recusa/API ausente conserva texto manual e informa falha sem sucesso fictício. |
| CA08 | Editar/retornar mostra atual e invalida feedback anterior, inclusive A/B/A. |
| CA09 | Operações distintas têm feedback por ID, sem promessa de ordem global do clipboard. |
| CA10 | Recuperação/memória são da 007; ausência/falha não cria outra Carta. |
| CA11 | Teclado/leitor identifica botões/contextos e retorno sem roubo de foco. |
| CA12 | Texto longo e mobile preservam leitura/seleção integral. |
| CA13 | HTML literal não executa nem recebe escape/prefixo de CSV no payload. |
| CA14 | Tutorial/cópia livres sem diagnóstico, CSV, backend ou publicação automática. |
| CA15 | K/S/ON/E respeitadas; presencial exclusivo não mostra sistema; inativos ocultos sem apagar dados. |
| CA16 | Outras etapas não montam controles/live regions da 012. |
| CA17 | Node 564:980 adapta-se à matriz; conteúdo T011 sincronizado sem exemplos reais. |
| CA18 | Sair/voltar durante operação mantém trava e descarta feedback tardio. |
| CA19 | Nenhum botão em seletores/radios/checkboxes/multisseleções/modalidades. |
| CA20 | Âncoras usam alvos visíveis e fallback; correção abre/foca registro da 007. |

Aceite funcional não executado pela T010 documental.

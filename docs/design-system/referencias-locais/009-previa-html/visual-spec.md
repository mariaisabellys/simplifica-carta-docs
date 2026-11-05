# Referência visual local — 009 Prévia HTML

## Proveniência e escopo

Figma `YaVUdqYa3boHpvGrxf4ZJ5`, node `821:308`
(`card-servico-completo`), extraído em 04/11/2026.

- referência: [componente-desktop.png](componente-desktop.png), 539 × 1775;
- rota proprietária: `/previa`;
- reutilização: prévia viva nas cinco partes da feature 007;
- contrato: `specs/009-previa-html/contrato-projecao-v3.md`.

O frame é um componente, não uma página completa. Na rota `/previa`, o shell,
o título da página, os estados de carregamento/vazio/erro e as ações externas
devem compor esse card sem serem inferidos da captura.

## Composição

O card tem cabeçalho azul-escuro, ícone de arquivo, título e ação de exportação
à direita. O corpo branco organiza os dados em leitura vertical, com rótulos em
caixa alta, valores, divisores, listas e cards internos para etapas. Informações
relacionadas podem formar duas colunas somente quando houver largura suficiente.

A captura exemplifica uma Carta preenchida. A implementação usa a projeção
canônica das 25 definições e suas condições K/S/ON/E; exemplos, campos repetidos
e a altura capturada não são limites. O card cresce com textos, documentos e
etapas e nunca usa rolagem interna para ocultar dados.

## Estados, ações e integrações

- sem conteúdo: mensagem própria e retornos para preencher, tutorial e ajuda;
- parcial: exibir todos os campos aplicáveis e identificar ausências;
- completo: apresentar as cinco partes, sem certificar publicação;
- erro/carregamento: estados distintos, sem reutilizar dados antigos;
- editar: retorna ao alvo autorizado da 007;
- baixar informações: ação real da feature 010, ausente quando ela não estiver
  implementada; não simular download;
- a prévia embutida e a rota usam o mesmo seletor e o mesmo componente, mudando
  apenas contêiner, headings, prefixo de IDs e ações externas.

## Responsividade e acessibilidade

Em larguras estreitas, cabeçalho e ações quebram em linhas; pares de colunas
viram uma coluna e textos longos quebram sem elipse. O card ocupa a largura
disponível, preservando padding e alvo de toque. Títulos seguem o contexto para
não duplicar `h1`; listas continuam semânticas, valores são texto literal e cada
instância recebe prefixo DOM único. Atualizações não movem foco nem transformam
o card inteiro em região viva.

## Divergências normativas

Conteúdo, Carta v3 e contratos prevalecem sobre a amostra visual. Inter e tokens
locais substituem estilos literais do frame. A ação do topo exporta somente CSV
pela 010: não há HTML/PDF. A referência local substitui consulta obrigatória ao
Figma; o aceite ainda exige comparação com o navegador em desktop e mobile.

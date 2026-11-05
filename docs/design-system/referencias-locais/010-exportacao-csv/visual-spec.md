# Referência visual local — 010 Exportação CSV

## Propriedade visual

A feature 010 não possui página ou rota própria. Ela ocupa a ação `Baixar
informações` no cabeçalho do componente da 009, cuja referência normativa é
[componente-desktop.png](../009-previa-html/componente-desktop.png), node
`821:308`, extraído em 04/11/2026.

Contrato funcional: `specs/010-exportacao-csv/contrato-exportacao-v3.md`.

## Estados do controle

- disponível: botão com ícone de download e nome acessível completo;
- gerando: guarda síncrona contra cliques duplicados e estado ocupado;
- sucesso: download real iniciado pelo navegador, com anúncio curto;
- falha estrutural, serialização ou download: mensagem associada e nova
  tentativa possível, sem apagar nem alterar a Carta;
- indisponível: não apresentar controle falso enquanto a integração não existir.

O botão captura e valida o mesmo snapshot da Carta usado pela prévia no gesto.
A feature 008 não é gate para exportar. A ação gera somente CSV; não cria HTML,
PDF, publicação, importação nem histórico de arquivos.

## Responsividade e acessibilidade

No cabeçalho estreito, o botão pode ocupar nova linha ou largura total sem
encobrir o título. O ícone não substitui o texto, o estado ocupado é exposto a
tecnologia assistiva e o feedback não rouba foco. Tamanho de toque, contraste e
reflow seguem os tokens locais.

## Limite da referência

A captura comprova posição e aparência do estado inicial, não o formato CSV,
segurança contra fórmulas, BOM, desempenho nem download real. Esses requisitos
permanecem no contrato e precisam de testes com navegador e planilhas. Não há
motivo para consultar outra tela no Figma nem criar uma página por analogia.

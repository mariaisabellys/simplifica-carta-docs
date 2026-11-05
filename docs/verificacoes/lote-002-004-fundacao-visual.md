# Verificação — lote 002–004: fundação visual e primeiras páginas

Data: 27/10/2026

## Escopo executado

- inspeção autenticada dos nodes `310:175`, `575:483` e `365:265` por
  `get_design_context`;
- exportação das três telas desktop por `download_assets`;
- download e versionamento dos assets de runtime com nomes semânticos;
- criação de captura, `visual-spec.md` e `manifest.json` por feature;
- atualização do mapa, dos tokens e dos documentos ativos das features para
  eliminar a dependência operacional do Figma;
- conferência visual das três capturas locais.

## Evidências

| Feature | Frame exportado | SHA-256 |
| --- | --- | --- |
| 002 | 1440 × 1627 px | `1ee05499a0a8fcd9b97ea8f4f94acfcc84c0b0a32e6e2cfc24482366166af656` |
| 003 | 1440 × 2134 px | `31ebf1824a28d740004427e32575f8ff9fe59377934274877ba233697d22576c` |
| 004 | 1440 × 2778 px | `5c2ace0ca05907de19f4afe339f5b1e46f33301647e481d829a44ed36cee9075` |

Assets verificados: 2 PNGs de runtime, 3 SVGs da home, 6 SVGs da 003 e 14
SVGs da 004. Os SVGs foram validados como XML; nenhum arquivo está vazio.

## Comandos de verificação

```sh
jq empty docs/design-system/referencias-locais/*/manifest.json
find docs/design-system/referencias-locais src/assets -type f -size 0 -print
xmllint --noout src/assets/**/*.svg
git diff --check
```

Resultados: manifestos válidos, nenhum arquivo vazio, SVGs válidos e nenhuma
falha de whitespace. As únicas ocorrências textuais de
`figma.com/api/mcp/asset` são proibições documentais; nenhum código ou manifesto
usa URL temporária.

## Divergências fechadas

- 002: o conteúdo local prevalece sobre “seis etapas” e `Iniciar o guia` do
  frame; a home possui quatro etapas e botão `Iniciar guia`;
- 003: a composição 2 × 2 é preservada no desktop, mas a altura deve crescer
  com o conteúdo e o grid deve colapsar responsivamente;
- 004: o resumo legal versionado do Decreto nº 9.756/2019 prevalece sobre a
  redação antiga visível no frame;
- Inter prevalece sobre Outfit/Rawline observadas no protótipo;
- `Material de apoio` continua fora da navegação do MVP.

## Pendências que permanecem

- implementar as páginas e o shell compartilhado;
- comparar o browser com as capturas locais;
- validar 320, 768, 1024 e 1440 px, zoom de 200%, teclado, foco, contraste e
  leitores de tela;
- executar testes e build depois que o código for implementado.

Conclusão: a fonte visual local do lote 002–004 está pronta para uso por quem
não possui acesso ao Figma. Isso não equivale ao aceite visual da futura
implementação.

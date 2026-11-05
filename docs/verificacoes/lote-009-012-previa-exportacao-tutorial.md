# Verificação do lote visual 009–012

Data: 04/11/2026. Arquivo Figma de origem:
`YaVUdqYa3boHpvGrxf4ZJ5`. Extração autenticada por contexto de design e captura
dos nodes; arquivos conferidos localmente.

## Evidências versionadas

| Feature/estado | Node | Arquivo | Dimensão | SHA-256 |
| --- | --- | --- | --- | --- |
| 009 — componente da prévia | `821:308` | `009-previa-html/componente-desktop.png` | 539 × 1775 | `57b5ed0e0c98e349129880d03ecb9551676b777e05cb2ff3dd5f84f3fdc80540` |
| 011 — etapa 1 | `564:635` | `011-tutorial-paraiba-digital/etapa-1-desktop.png` | 1280 × 1215 | `d6b4706d08551a827b103d7f34cdf4e2f8f01146513ce871ba2fdd475f6fd2c4` |
| 011 — etapa 2 | `564:730` | `011-tutorial-paraiba-digital/etapa-2-desktop.png` | 1280 × 1312 | `99eab28bdd2c60e399a2b5cbd65b5536d64deb4e505bd665ccaa8c52794ffcab` |
| 011 — etapa 3 | `564:852` | `011-tutorial-paraiba-digital/etapa-3-desktop.png` | 1280 × 1201 | `7e6d7513811ed180855abd060b3df843b9ceea134c98d827cf3a01da0981c485` |
| 011 — etapa 4 / região 012 | `564:980` | `011-tutorial-paraiba-digital/etapa-4-desktop.png` | 1280 × 1294 | `47ab1e62fb8a1aa7433a06269499dd1e24468c5d3c9c0da9a9146cbb922154be` |
| 011 — etapa 5 | `564:1232` | `011-tutorial-paraiba-digital/etapa-5-desktop.png` | 1280 × 1354 | `f11bd34645ef654888ff592be4d1417c27c06d6ee62adb1bbe71ec67504427ea` |
| 011 — etapa 6 | `564:1357` | `011-tutorial-paraiba-digital/etapa-6-desktop.png` | 1280 × 1251 | `9570f4dcce430997602d66eee642ac2a16aae3b7c28c2aff262d50d854b882d4` |

Os caminhos da tabela são relativos a `docs/design-system/referencias-locais/`.
Os mesmos hashes e dimensões estão nos manifestos das features proprietárias.

## Decisões confirmadas

- 009: o node é o componente compartilhado da prévia, não a composição integral
  de `/previa`; sua altura não limita a projeção das 25 definições.
- 010: não há página própria. A feature é a ação CSV no cabeçalho da 009 e usa a
  mesma captura como referência de posição/estado inicial.
- 011: os seis nodes são estados de uma única página e rota, não seis telas
  independentes. Conteúdo TypeScript e contrato de integração prevalecem.
- 012: não há página própria. A região é montada exclusivamente na etapa 4 da
  011 e deve expandir a amostra para cinco grupos, 25 definições, coleções e
  condições K/S/ON/E.
- Foram internalizados 13 SVGs semânticos em `src/assets/previa/` e
  `src/assets/tutorial/`; linhas e ornamentos simples continuam em CSS/tokens.

## Limites e pendências reais

As sete capturas são desktop. Regras mobile presentes nos `visual-spec.md` são
contratos adaptativos, não evidência de frames mobile. A extração não comprova:

- implementação das páginas/componentes;
- comparação pixel a pixel com navegador;
- estados vazio, parcial, loading, falha, clipboard ou download real;
- reflow, zoom, teclado, leitores de tela e navegadores suportados;
- formato/segurança/compatibilidade do CSV;
- validade operacional de URLs, menus, permissões ou publicação na plataforma
  externa e confronto com o ERS.

Esses itens continuam nos planos e testes das features. Nenhum build ou teste
da aplicação foi executado neste lote, pois as mudanças são documentação,
capturas e assets semânticos; a auditoria estrutural do pacote é registrada no
resultado da própria tarefa.

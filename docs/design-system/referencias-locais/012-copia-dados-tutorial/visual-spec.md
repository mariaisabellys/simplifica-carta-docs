# Referência visual local — 012 Cópia de dados no tutorial

## Propriedade visual

A feature 012 não possui página nem rota própria. Ela fornece a região de dados
montada exclusivamente na etapa 4 da 011. Referência normativa:
[etapa-4-desktop.png](../011-tutorial-paraiba-digital/etapa-4-desktop.png), node
`564:980`, 1280 × 1294, extraído em 04/11/2026.

Contrato funcional: `specs/012-copia-dados-tutorial/contrato-transferencia-v3.md`.

## Composição e cobertura

Dentro do painel da etapa 4, cada campo aplicável aparece em card claro com
rótulo, valor integral e, quando elegível e preenchido, botão `Copiar {campo}`.
Há cinco grupos na ordem da Carta v3 e 25 definições aplicáveis. Treze definições
de texto admitem cópia; doze escolhas são somente leitura e não recebem botão.
Documentos e etapas repetem ações por item estável.

A captura mostra apenas uma amostra compacta. Não omitir grupos, campos vazios,
coleções ou condicionais para reproduzir sua altura. K/S/ON/E inativos não são
montados e valores retidos nunca são revelados. Ausências permanecem legíveis,
mas não geram payload nem botão desabilitado.

## Estados da ação

- inicial: valor selecionável e botão nomeado pelo campo;
- copiando: trava imediata por identidade, estado ocupado e alternativa manual;
- sucesso: anúncio curto somente após a promessa resolver, expirando sem mover
  foco;
- falha/indisponível: mensagem associada e texto selecionável para cópia manual;
- valor alterado, campo oculto ou etapa desmontada: feedback antigo descartado,
  sem declarar cancelamento do clipboard.

A string enviada é o valor original, sem `trim`, BOM, prefixo CSV, HTML ou
formatação. A feature 008 e erros de outros campos não bloqueiam a cópia de um
texto presente. Sucesso não comprova colagem, cadastro ou publicação externa.

## Responsividade e acessibilidade

Em telas estreitas, valor e botão empilham; o botão conserva alvo de toque e o
texto quebra sem corte. Labels e valores usam semântica de leitura, escolhas não
parecem controles editáveis, IDs são únicos e anúncios são por campo. A região
manual `readOnly` permanece navegável por teclado/toque. Nenhuma atualização de
timer ou promise rouba foco.

## Limite da referência

O frame comprova hierarquia e aparência inicial, não clipboard real,
concorrência, falha, reflow ou todas as combinações da matriz. Esses estados
exigem fixtures e testes em HTTPS, desktop/mobile e tecnologia assistiva. A
referência local substitui consulta obrigatória ao Figma e não autoriza criar
uma página separada.

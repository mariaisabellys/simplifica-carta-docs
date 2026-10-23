# Quickstart: Cópia de dados no tutorial

T010 documental — 19/10/2026.
[Anterior](historico/2026-10-19-pre-t010-quickstart.md).
Roteiro futuro; não constitui teste executado.

## Estado e checks locais

Utilitário src/lib/clipboard.ts existe; projeção/controlador/UI v3 não comprovados
entregues. Conteúdo da etapa 4 depende da T011. Em Node compatível com import de
TypeScript dos testes (histórico usa Node 24), com dependências instaladas:

```sh
node --test tests/clipboard.test.mjs tests/csv.test.mjs
npm run typecheck
npm run build
```

PowerShell pode usar npm.cmd. Mocks não acessam clipboard real e não comprovam UI.

## Roteiro após implementação

1. Confirmar F012-01–06 e T011; abrir /tutorial-paraiba-digital?etapa=4.
2. Usar Carta sintética completa, parcial e vazia. Conferir matriz de 25 definições,
   cinco grupos, botões só nos abertos presentes, escolhas sem ação.
3. Conferir cópia por nome de documento/título/orientação de etapa e ID estável;
   máximo sem unidade, detalhe sem opção, URL original. Sem exemplos/lorem ipsum.
4. Alternar K/S/E, reordenar/remover itens, sair/retornar enquanto promise aguarda;
   verificar trava por identidade e nenhuma confirmação obsoleta.
5. Executar TR01–TR17 do [contrato](contrato-transferencia-v3.md).
   Em origem segura, colar texto sintético em destino controlado; não acrescentar
   leitura de clipboard ao produto. Testar falha/manual/teclado/toque.
6. Registrar string passada à API separadamente do DOM/resultado da colagem,
   sem prometer terminadores exatos no ambiente. Registrar CA/ambiente/reteste.

Não executar testes reais com dados pessoais nem confundir sucesso de cópia com cadastro.

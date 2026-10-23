# Quickstart previsto: Organizar informações

## Status

Roteiro preparado documentalmente na T017 em 22/10/2026. Não foi executado e
não comprova implementação. Usar após entregar a feature 006 e suas dependências.

## Pré-condições

- contrato de orientações v3 e conteúdo TypeScript sincronizados;
- rota `/organizar-informacoes` renderizando a página, não placeholder;
- navegação T015 disponível e sessão/progresso conforme contrato 006;
- dependências instaladas; ambiente e commit registrados.

## Dados sintéticos

- nenhuma informação marcada;
- 2 de 13 e 13 de 13 informações marcadas;
- orientação curta e orientação com parágrafos/listas longos;
- navegação interna que preserva estado e recarga que reinicia o progresso.

## Procedimento funcional previsto

1. Abrir `/organizar-informacoes` por URL direta.
2. Conferir título/subtítulo e três tópicos na ordem: Sobre o serviço (7), O
   que é necessário (2) e Como o serviço funciona (4).
3. Confirmar as 13 informações sem duplicata e progresso inicial `0 de 13`.
4. Marcar/desmarcar itens e verificar contagem por IDs únicos.
5. Abrir cada orientação e conferir o destino de campo/condição do contrato.
6. Navegar internamente e voltar: progresso continua em memória.
7. Recarregar: progresso reinicia conforme contrato, sem usar `progressExample`.
8. Conferir textos/URLs longos em 320, 390, 768, 1024 e 1440 px.
9. Operar marcação e orientações por teclado; foco permanece previsível.

## Checks técnicos previstos

```sh
npm run typecheck
npm run build
```

Executar somente no ambiente autorizado e registrar saída observada. Não há
teste automatizado específico da 006 no baseline T017; criá-lo pertence à
implementação, não a este quickstart.

## Resultado esperado

Conteúdo integral, progresso correto, orientação associada, navegação sem perda
indevida e layout sem corte. Divergências Figma/ERS e decisões MC ainda abertas
permanecem pendências; não aprovar visual por comparação de link.

# ADR-002: Exportacao CSV

## Status

Aceita

## Contexto

O usuario precisa retirar do sistema as informacoes preenchidas para apoiar o cadastro manual e eventual uso interno.

## Decisao

No MVP, o formato oficial de exportacao sera CSV gerado localmente no navegador.

## Consequencias

- Nao e necessario backend para exportar dados da Carta.
- A exportacao fica simples e compativel com planilhas.
- A previa HTML continua sendo recurso de revisao visual, nao formato oficial de exportacao.


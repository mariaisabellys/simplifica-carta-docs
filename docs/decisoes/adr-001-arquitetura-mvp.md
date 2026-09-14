# ADR-001: Arquitetura do MVP

## Status

Aceita

## Contexto

O produto precisa oferecer um manual interativo com fluxo guiado, formulario, validacoes, previa HTML, exportacao CSV e atendimento agendado.

## Decisao

Usar React, TypeScript e Vite no frontend. Manter a maior parte do MVP no navegador. Criar backend simples apenas para atendimento agendado, registro minimo e notificacoes.

## Consequencias

- O frontend pode ser implantado como site estatico.
- O desenvolvimento inicial fica mais simples.
- O backend permanece restrito ao que exige processamento no servidor.
- Evolucoes futuras podem adicionar autenticacao, painel administrativo e persistencia de rascunhos.


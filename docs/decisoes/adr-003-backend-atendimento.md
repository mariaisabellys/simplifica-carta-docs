# ADR-003: Backend para Atendimento Agendado

## Status

Aceita

## Contexto

O fluxo de atendimento agendado exige recebimento de dados, validacao, registro e notificacao da equipe responsavel.

## Decisao

Criar backend simples apenas para o atendimento agendado e seu suporte
operacional. “Suporte relacionado” não inclui o canal de e-mail da feature 015,
que apenas copia um endereço público para contato e não exige backend próprio.

## Consequencias

- O MVP nao e um site estatico puro.
- O backend nao deve armazenar dados da Carta de Servicos.
- Dados de atendimento devem ser tratados com cuidado e em conformidade com a LGPD.

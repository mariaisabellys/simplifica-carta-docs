# Arquitetura do Sistema

## Visao geral

O Simplifica Carta sera uma aplicacao web com frontend em React, TypeScript e Vite. A maior parte do MVP roda no navegador. O backend sera usado apenas para atendimento agendado e notificacoes.

## Frontend

Responsabilidades:

- renderizar paginas e fluxo guiado;
- manter estado temporario da Carta durante a sessao;
- validar campos obrigatorios;
- sugerir melhorias de linguagem simples;
- gerar previa HTML;
- gerar CSV localmente;
- organizar campos para copia;
- consumir APIs minimas de atendimento.

## Conteudo

O conteudo institucional deve ser versionado no projeto, preferencialmente em TypeScript, JSON, Markdown ou MDX.

Tipos de conteudo esperados:

- textos explicativos;
- etapas do fluxo;
- perguntas do diagnostico;
- exemplos;
- mensagens de validacao;
- tutorial do Paraiba Digital.

## Backend

Responsabilidades:

- listar horarios disponiveis para atendimento;
- receber solicitacoes de atendimento;
- validar dados minimos;
- registrar solicitacoes;
- enviar notificacao por e-mail.

O backend nao deve armazenar dados da Carta de Servicos no MVP.

## Persistencia

- Dados da Carta: apenas estado temporario de sessao no navegador.
- Atendimento agendado: persistencia minima para organizacao do atendimento.

## Deploy

O frontend deve permitir deploy estatico. O backend simples pode ser implantado separadamente ou junto da aplicacao, conforme decisao de infraestrutura.


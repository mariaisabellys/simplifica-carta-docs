# ADR-004: Stack e operação do atendimento

Status: **Proposta — não aprovada institucionalmente**. 21/10/2026, T014 documental.
Complementa [ADR-003](adr-003-backend-atendimento.md), que permanece aceita
somente quanto à necessidade de backend mínimo, não quanto a esta stack.

## Proposta a avaliar

Python/Django/DRF, PostgreSQL, driver psycopg, API same-origin HTTPS sob /api,
processo web e worker de outbox separados. Sem Redis/Celery inicialmente;
worker por comando operacional restrito. Sem backend para Carta ou e-mail 015.
Versões anteriormente candidatas (Python 3.13, Django 5.2, PostgreSQL 17) não
são seleção atual, certificação de suporte ou lock aprovado. Validar compatibilidade,
suporte e patches em fontes oficiais na implementação antes de fixar dependências.

## Consequências e alternativas

Exige banco persistente, migrations, segredos, backup/restauração, observabilidade
sem dados pessoais, execução/supervisão do worker e responsável operacional.
SMTP falso para testes; ambiente isolado PostgreSQL com conexões concorrentes.
SQLite/mocks não substituem evidência de concorrência do banco escolhido.
Alternativa de fila gerenciada ou stack institucional diferente exige revisão
desta proposta e testes equivalentes, não mudança silenciosa dos contratos.

## Aprovação pendente

Coordenação técnica/infraestrutura deve nomear responsável, aprovar hospedagem,
stack/lock, banco, TLS/proxy, worker, backups, segredos, monitoramento e custos.
Nenhuma pessoa, conta ou ambiente foi provisionado/atribuído nesta tarefa.
O [contrato da agenda](../../specs/014-atendimento-agendado/contrato-agenda.md)
registra bloqueios, parâmetros e critérios; não executar deploy/migrations
de produção ou usar dados reais antes das aprovações.

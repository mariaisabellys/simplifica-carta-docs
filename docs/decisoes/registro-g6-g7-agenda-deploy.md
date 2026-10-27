# Registro de decisões G6 e G7 — agenda e deploy

Data de abertura documental: **27 de outubro de 2026**.

Este registro abre, em paralelo, as consultas IN01–IN08 da feature 014 e
INF01–INF10 da feature 017. A abertura é interna e versionada: **não comprova
encaminhamento a uma pessoa, resposta, aprovação institucional ou autorização
para implementar, provisionar ou publicar**.

Fontes canônicas do conteúdo das decisões:

- [contrato da agenda](../../specs/014-atendimento-agendado/contrato-agenda.md);
- [spec de deploy](../../specs/017-deploy/spec.md);
- [ADR-004 proposta](adr-004-stack-atendimento.md);
- [roteiro de implementação](../roteiro-implementacao.md).

## Estados e regra de encerramento

Fluxo: `catalogada` → `aberta` → `encaminhada` → `respondida` →
`aprovada`, `rejeitada` ou `substituída`.

- **Aberta**: pergunta, papel a consultar, evidência e impacto estão
  registrados. É o estado atual das 18 decisões.
- **Encaminhada**: exige destinatário ou instância identificável, data e
  referência verificável do envio/recebimento.
- **Respondida**: exige conteúdo da resposta e fonte. Resposta parcial mantém
  as parcelas restantes abertas.
- **Encerrada**: exige decisão inequívoca, responsável nominal, aprovador,
  data e fonte; contratos, ADRs e tarefas afetados devem ser reconciliados.

Silêncio não constitui aprovação. Não registrar segredos, credenciais ou dados
pessoais neste documento. O acompanhamento nominal, o canal, o prazo e as
respostas permanecem `a definir` até haver evidência real.

## Trilha G6 — IN01–IN08

Estado comum: **aberta — aguardando encaminhamento e resposta**.

| ID | Decisão aberta | Papéis a consultar | Evidência solicitada para encerrar | Cruzamentos | Impacto enquanto aberta |
| --- | --- | --- | --- | --- | --- |
| IN01 | O registro ocupa capacidade antes da confirmação? Quais são modalidade, duração, local e forma de participação? | Gestão do atendimento GESED | Decisão/ata versionada, semântica dos estados e textos autorizados, com responsável, aprovador, data e fonte | IN02 | Fluxo, copy, CA09/CA18 e modelos finais |
| IN02 | Quais são oferta, capacidade, antecedência, horizonte, feriados e manutenção? | Coordenação da agenda | Política operacional com valores, regras, dono da manutenção, responsável, aprovador, data e fonte | IN01, IN03 | Slots, concorrência, oferta e ativação |
| IN03 | Qual é o fuso IANA institucional e como datas são convertidas e exibidas? | Coordenação da agenda e coordenação técnica | Identificador IANA e regras de conversão/exibição aprovados, com responsável, data e fonte | IN02, IN07 | Consultas, snapshot, notificações e schema; `America/Fortaleza` continua candidato |
| IN04 | Quais campos, formatos e limites são aprovados, inclusive telefone/ramal e descrição opcional? | Gestão do atendimento e responsável por privacidade | Dicionário/schema e copy versionados, limites e minimização aprovados, com responsável, aprovador, data e fonte | IN06, INF09 | Formulário, schema e uso de dados reais; sem truncamento inferido |
| IN05 | Quais são destinatário, remetente, provedor, conteúdo e monitoramento das notificações? | GESED e operação de comunicação | Configuração operacional sem segredos, template, monitoramento e escalonamento aprovados, com responsável, aprovador, data e fonte | INF07–INF10 | Worker e envio real; o contato da 015 não é reutilizado por inferência |
| IN06 | Quais são finalidade, aviso, acesso, retenção, exclusão, backups, validade de chave/tombstone e resposta a incidentes? | Responsável institucional por dados/privacidade e infraestrutura | Política de dados, matriz de acesso, prazos, backup/restauração e procedimento de incidente aprovados, com responsável, aprovador, data e fonte | INF06, INF08–INF10 | Persistência, recuperação e produção; nenhuma base legal ou prazo presumido |
| IN07 | Qual stack, lock, ambiente, banco, TLS, cofre, worker, retry e supervisão serão adotados? | Coordenação técnica e infraestrutura | ADR-004 aceita, rejeitada ou substituída; versões, ambientes, responsabilidades, custos e testes registrados | INF01, INF03, INF05–INF08, INF10 | ADR-004, provisionamento, testes reais e deploy |
| IN08 | Quem pode pausar/reativar e qual é o procedimento de sincronização editorial e operacional? | Gestão GESED e operação técnica | RACI/runbook aprovado, autorizadores, auditoria, sincronização e retomada, com responsável, aprovador, data e fonte | INF03, INF08, INF10 | Gate e retomada; nenhuma reativação automática |

## Trilha G7 — INF01–INF10

Estado comum: **aberta — aguardando encaminhamento e resposta**.

| ID | Decisão aberta | Papéis a consultar | Evidência solicitada para encerrar | Aplicação/cruzamentos | Impacto enquanto aberta |
| --- | --- | --- | --- | --- | --- |
| INF01 | Quais fornecedor, contas, regiões e limites de custo serão usados? | Infraestrutura e gestão | Provedor/serviços, conta e dono, região por ambiente, custos, suporte e saída aprovados | Trilhos A e B; IN07 | Pipeline, hospedagem, recursos e operação |
| INF02 | Quais domínio, DNS, base pública e certificados serão usados? | Infraestrutura e comunicação | FQDN por ambiente, dono do DNS, raiz/subpath e emissão/renovação TLS aprovados | Trilhos A e B | `base` do Vite, links, assets, fallback, HTTPS e testes |
| INF03 | Quais ambientes, gatilhos, aprovadores, promoção e rollback serão usados? | Engenharia e gestão | Matriz de ambientes, branch/tag, aprovadores, identidade do artefato, promoção e rollback | Trilhos A e B; IN08 | Processo de release e DP18 |
| INF04 | Quais headers, CSP, analytics, monitoramento e política de source maps serão usados? | Segurança e engenharia | Origens, headers, ferramentas autorizadas, acesso/retenção e aprovação de privacidade | Trilhos A e B; INF09 | Browser, clipboard, API, privacidade e diagnóstico |
| INF05 | Qual stack e quais versões definitivas sustentarão a agenda? | Coordenação técnica | ADR-004 aceita, rejeitada ou substituída; runtime, framework, banco, driver, compatibilidade e suporte fixados | Trilha B; IN07 | Backend, imagem, lock, patches e manutenção |
| INF06 | Qual banco, região, HA, backup e recuperação serão usados? | Infraestrutura e dados | Engine/versão, topologia, criptografia, RPO/RTO, retenção e restauração ensaiada | Trilha B; IN06, IN07, INF05 | Persistência, migrations, concorrência e continuidade |
| INF07 | Como worker e SMTP serão executados e supervisionados? | Infraestrutura e GESED | Execução, supervisão, leases/retry, métricas, SMTP/remetente/destinatário e SMTP falso aprovados | Trilha B; IN05, IN07, INF05 | Outbox, notificações e suporte operacional |
| INF08 | Como segredos serão armazenados, rotacionados, revogados e tratados em incidentes? | Segurança e infraestrutura | Inventário, dono, escopo por ambiente, cofre/injeção e runbook aprovados | Trilhos A e B conforme credenciais; IN05–IN08 | Proteção operacional de deploy, API, banco, SMTP e observabilidade |
| INF09 | Quais são retenção, privacidade, acesso e política de logs? | Encarregado e gestão | Finalidade, mapa de dados, retenção/expurgo, acessos e logs sem PII aprovados | Trilhos A/B conforme telemetria; IN04, IN06, INF04/06/07 | Produção, persistência, observabilidade e incidentes |
| INF10 | Quais são SLOs, alertas, plantão e processo de incidente? | Operação e gestão | SLIs/SLOs, limiares, responsáveis, escalonamento, comunicação e exercício do runbook | Trilhos A e B; IN05, IN06, IN08 | Disponibilidade, suporte, DP20 e liberação produtiva |

## Execução paralela e ondas de fechamento

1. Nomear acompanhamento, destinatários e canal para todas as decisões; então
   registrar a passagem de `aberta` para `encaminhada` item a item.
2. Fechar em paralelo IN01–IN04 e INF01–INF04. Isso permite delimitar negócio,
   formulário e frontend estático, sem liberar a agenda operacional.
3. Fechar os conjuntos IN05/INF07–INF10, IN06/INF06/INF08–INF10 e
   IN08/INF03/INF08/INF10 sem respostas contraditórias.
4. Fechar IN07 e INF05–INF08 e decidir formalmente a ADR-004.
5. Reconciliar contratos e executar os gates. O trilho A só publica após as INF
   aplicáveis e seus testes; o trilho B só é provisionado após F017-01/F017-02
   e só é aberto após DP17 e homologação.

## Controle de acompanhamento

| Campo | G6 — agenda | G7 — deploy |
| --- | --- | --- |
| Aberto em | 27/10/2026 | 27/10/2026 |
| Responsável nominal pelo acompanhamento | A definir | A definir |
| Canal/ticket/ata de encaminhamento | Não recebido | Não recebido |
| Prazo de resposta | A definir | A definir |
| Respostas e fontes | Não recebidas | Não recebidas |
| Gate | Permanece fechado | Permanece fechado |

Na próxima atualização, preencher os campos acima e registrar por ID: pessoa e
papel, data, fonte, decisão, aprovador e contratos afetados. A ausência desses
dados mantém o item aberto.

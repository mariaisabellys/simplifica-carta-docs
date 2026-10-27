# Plano: Deploy e ambientes

Criado em 22 de outubro de 2026. Este é um plano documental. A execução técnica
depende das decisões INF01–INF10, das pendências da navegação e, para a agenda,
de IN01–IN08.

## Estratégia

Trabalhar em dois trilhos com promoção independente:

- **A — frontend estático:** fechar navegação, gerar um artefato imutável e
  comprovar o comportamento das páginas em hospedagem HTTPS com fallback SPA.
- **B — agenda operacional:** manter fechada até aprovar stack e operação;
  implementar API, banco, outbox e worker em ambiente sintético isolado antes de
  qualquer exposição real.

O trilho B não deve atrasar automaticamente a publicação das páginas estáticas.
O trilho A também não pode fingir que a agenda está ativa: a apresentação dos
canais segue o contrato editorial das features 013–015.

## Fase 0 — decisões e responsáveis

1. Abertura documental de INF01–INF10 e IN01–IN08 registrada em 27/10/2026;
   nomear acompanhamento/destinatários, encaminhar e registrar respostas no
   [registro G6/G7](../../docs/decisoes/registro-g6-g7-agenda-deploy.md).
2. Aprovar domínio, raiz/subpath, ambientes, fornecedor e topologia.
3. Aprovar política de release, rollback, logs, privacidade, backup e incidente.
4. Aceitar, substituir ou rejeitar a proposta da ADR-004.
5. Registrar as decisões em ADRs/configuração versionada; não alterar contratos
   silenciosamente.

Saída: decisões rastreáveis e nenhum recurso de produção criado por suposição.

## Fase 1 — prontidão do frontend

1. Concluir o contrato de navegação: 12 rotas, URL completa e 404 interna.
2. Definir base pública e corrigir apenas então `vite.config.ts`, links e assets.
3. Consolidar gates reais de typecheck, build e suites existentes; criar script
   agregado apenas na implementação autorizada.
4. Definir manifesto do artefato com commit, runtime, hash e resultado dos gates.
5. Inventariar assets, fontes, arquivos baixáveis e origens externas.

Saída: fonte apta a produzir um artefato estático candidato; ainda sem deploy.

## Fase 2 — adaptação da hospedagem estática

1. Criar configuração específica somente para o fornecedor aprovado.
2. Servir arquivos reais e aplicar fallback a páginas da SPA; excluir assets e
   `/api`.
3. Configurar HTTPS, redirect, DNS, compressão, MIME, cache e headers.
4. Publicar ambiente de preview/homologação com artefato imutável.
5. Não usar `vite preview` como servidor público.

Saída: URL não produtiva autorizada, vinculada ao artefato e à configuração.

## Fase 3 — verificação do frontend publicado

1. Executar smoke da home e das 12 URLs diretas.
2. Recarregar rotas, testar query/hash, histórico, foco, título e 404 interna.
3. Verificar asset real, asset inexistente e `/api` inexistente sem fallback.
4. Verificar HTTPS, certificado, redirects, headers, cache, MIME e ausência de
   conteúdo misto.
5. Executar os gates funcionais, visuais e assistivos previstos para o release.
6. Registrar evidência e defeitos sem dados pessoais.

Saída: parecer de homologação do trilho A; não aprova o trilho B.

## Fase 4 — fundação isolada da agenda

Somente após Fase 0 e decisões da 014:

1. Fixar stack suportada e dependências.
2. Criar API same-origin, schema, migrations e política de acesso.
3. Implementar transação de reserva, snapshot de horário, idempotência e outbox.
4. Criar worker supervisionado com SMTP falso no ambiente de teste.
5. Configurar cofre de segredos, banco isolado, clock controlado e fixtures
   sintéticas.
6. Manter gate operacional fechado.

Saída: ambiente de teste técnico, sem dados ou destinatários reais.

## Fase 5 — verificação e homologação da agenda

1. Executar contratos AG01–AG13 e cenários de replay R1–R6 da feature 014.
2. Testar concorrência no banco escolhido, idempotência, 410, CSRF/origin,
   payload inválido, indisponibilidade, timeout e recuperação.
3. Testar outbox, retries, falha permanente, reprocessamento e atraso do worker.
4. Ensaiar backup/restauração e fechamento do gate.
5. Validar privacidade, retenção, logs, suporte e incidente.

Saída: evidência para decisão institucional; nenhum aceite automático.

## Fase 6 — promoção e operação

1. Aprovar explicitamente o artefato e o ambiente.
2. Aplicar migrations compatíveis antes do código que depende delas.
3. Promover o mesmo artefato do frontend e imagens versionadas do backend.
4. Executar smoke pós-publicação e observar métricas.
5. Abrir o gate da agenda somente após todos os requisitos DP17.
6. Em falha, fechar gate, preservar registros e aplicar rollback/roll-forward
   conforme o runbook.

## Estratégia de rollback

| Componente | Estratégia mínima |
| --- | --- |
| Frontend | Reativar artefato estático anterior conhecido; invalidar somente o necessário; repetir smoke. |
| API | Reverter imagem/configuração compatível ou avançar correção; manter gate fechado durante risco. |
| Banco | Preferir migration compatível e roll-forward; reversão somente se testada e sem perda. |
| Worker | Pausar consumo, preservar outbox, corrigir e reprocessar idempotentemente. |
| Conteúdo/canal | Marcar atendimento indisponível/pausado sem prometer agendamento; manter suporte por cópia do e-mail quando aprovado. |

## Matriz de evidência

| Evidência | Trilho A | Trilho B | Momento |
| --- | --- | --- | --- |
| Hash/manifesto do artefato | Obrigatória | Obrigatória | Build/promoção |
| Typecheck/build/suites | Obrigatória | Obrigatória para seu componente | Antes da publicação |
| URLs diretas/fallback/404 | Obrigatória | `/api` excluída | Preview e produção |
| HTTPS/headers/cache/assets | Obrigatória | Obrigatória | Cada ambiente |
| Testes sintéticos | Conteúdo não pessoal | Obrigatórios | Homologação |
| Concorrência/outbox/SMTP falso | Não aplicável | Obrigatória | Antes de abrir gate |
| Backup/restauração | Não aplicável ao artefato | Obrigatória | Antes de produção |
| Visual/assistiva | Obrigatória | Obrigatória para a jornada | Homologação |
| Smoke pós-release | Obrigatória | Quando habilitada | Cada promoção |

## Riscos e mitigação

- **Fallback abrangente demais:** assets/API retornam HTML. Mitigar com ordem de
  regras e testes explícitos de 404 e content-type.
- **Base pública divergente:** navegação ou assets quebram em subpath. Mitigar
  com decisão INF02 antes do build e matriz de URLs.
- **Segredo no bundle:** qualquer `VITE_*` é público. Mitigar com revisão do
  bundle e allowlist de variáveis.
- **Frontend antigo com assets novos:** cache inconsistente. Mitigar com HTML
  revalidável e assets hashados imutáveis.
- **Agenda aparente sem backend:** promessa indevida. Mitigar com gate editorial
  e operacional separado.
- **Dupla reserva:** mitigar com transação/lock/idempotência no banco real.
- **Notificação duplicada ou perdida:** mitigar com outbox e worker idempotente.
- **PII em logs/fixtures:** mitigar com esquema de log e dados sintéticos.
- **Migration incompatível:** mitigar com expansão/contração e roll-forward.

## Saída documental desta rodada

Spec, plan, tasks, implementation-plan, quickstart, validation e verification da
017, além do registro da T018. Nenhuma fase técnica acima é executada na T018.

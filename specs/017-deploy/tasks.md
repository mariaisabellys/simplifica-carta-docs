# Tarefas: Deploy e ambientes

Criadas em 22 de outubro de 2026. Todos os itens abaixo são trabalho futuro de
decisão ou implementação. A criação desta lista não publica o produto.

## Bloco 0 — decisões

- [ ] **F017-01 — Fechar responsáveis e decisões INF01–INF10**
  - Abertura documental das dez consultas registrada em 27/10/2026 no
    [registro G6/G7](../../docs/decisoes/registro-g6-g7-agenda-deploy.md).
    Ainda faltam encaminhamento verificável, responsáveis nominais e respostas.
  - Nomear os papéis de aprovação, registrar fornecedor, domínio, base,
    ambientes, release, privacidade, observabilidade e operação.
  - Aceite: ADRs aprovadas e decisões sem inferência.

- [ ] **F017-02 — Fechar dependências IN01–IN08 e ADR-004**
  - Abertura documental das oito consultas registrada no mesmo controle; G6 e
    a ADR-004 continuam sem aprovação.
  - Conciliar negócio, capacidade, fuso, formulário, SMTP, privacidade, stack e
    pausa com a feature 014.
  - Aceite: cada bloqueio tem evidência de aprovação ou permanece fechado.

## Bloco A — frontend estático

- [ ] **F017-03 — Concluir navegação e 404 da aplicação**
  - Implementar as 12 rotas, URL completa, 404 interna, título, foco, scroll e
    histórico conforme o contrato central.
  - Aceite: matriz NV01–NV12 e URLs diretas aprovadas localmente.

- [ ] **F017-04 — Definir e aplicar a base pública**
  - Escolher raiz ou subpath e alinhar Vite, links, assets, router e testes.
  - Aceite: nenhum path é corrigido manualmente no artefato.

- [ ] **F017-05 — Consolidar pipeline de qualidade e build**
  - Instalar de forma determinística; executar typecheck, suites existentes,
    build e verificações aplicáveis; produzir manifesto do artefato.
  - Aceite: um único `dist/` imutável é promovível e rastreável.

- [ ] **F017-06 — Implementar configuração da hospedagem aprovada**
  - Servir arquivos, excluir assets e `/api` do fallback, configurar HTTPS,
    cache, MIME, compressão e headers.
  - Aceite: configuração versionada e revisada, sem `vite preview` em produção.

- [ ] **F017-07 — Tipar e limitar variáveis públicas**
  - Criar `.env.example` somente se houver variáveis públicas reais; validar
    tipos/defaults e revisar bundle contra segredos.
  - Aceite: allowlist documentada; nenhum segredo em `VITE_*`.

- [ ] **F017-08 — Inventariar e validar assets**
  - Conferir fontes, imagens, ícones, downloads, origens, hash, MIME e cache.
  - Aceite: nenhum URL temporário e asset 404 não retorna `index.html`.

- [ ] **F017-09 — Publicar ambiente não produtivo do frontend**
  - Criar preview/homologação no fornecedor aprovado e registrar URL/artefato.
  - Aceite: HTTPS válido e promoção manualmente controlada.

- [ ] **F017-10 — Executar testes do frontend publicado**
  - Testar 12 rotas, recarga, query/hash, 404, assets, `/api`, headers, cache,
    visual e acessibilidade.
  - Aceite: evidência por ambiente, commit e artefato, sem PII.

- [ ] **F017-11 — Ensaiar promoção e rollback estático**
  - Promover o mesmo artefato e restaurar a versão anterior.
  - Aceite: smoke antes/depois e runbook reproduzível.

## Bloco B — agenda operacional

- [ ] **F017-12 — Provisionar ambiente sintético isolado**
  - Após F017-01/F017-02, criar rede, API, banco, worker, cofre e SMTP falso sem
    dados ou destinatários reais.
  - Aceite: isolamento entre ambientes e gate fechado por padrão.

- [ ] **F017-13 — Implementar proxy same-origin e segurança da API**
  - Encaminhar somente `/api/atendimento/*`; configurar TLS, hosts/origins, CSRF,
    limites, timeouts e health seguro.
  - Aceite: API nunca recebe fallback SPA e falhas preservam status.

- [ ] **F017-14 — Implementar banco e migrations compatíveis**
  - Entregar schema final aprovado, transações, locks, snapshots, idempotência e
    estratégia expand/contract.
  - Aceite: concorrência testada no banco escolhido; restauração ensaiada.

- [ ] **F017-15 — Implementar e supervisionar worker/outbox**
  - Entregar consumo idempotente, retries, falha permanente, métricas e
    reprocessamento restrito.
  - Aceite: nenhuma mensagem em linha com a requisição e nenhum evento perdido.

- [ ] **F017-16 — Configurar segredos, backup e observabilidade**
  - Definir dono, escopo, rotação, revogação, retenção, métricas e alertas sem
    payloads pessoais.
  - Aceite: inventário aprovado e ensaios registrados.

- [ ] **F017-17 — Executar homologação operacional da 014**
  - Rodar AG01–AG13, R1–R6, concorrência, falhas, privacidade e acessibilidade
    com dados sintéticos.
  - Aceite: relatório independente; achado aberto mantém gate fechado.

- [ ] **F017-18 — Aprovar e abrir o gate da agenda**
  - Confirmar DP17, suporte, incidente, rollback e responsáveis.
  - Aceite: autorização institucional registrada; não é consequência automática
    de um deploy bem-sucedido.

## Bloco C — operação contínua

- [ ] **F017-19 — Automatizar smoke pós-publicação**
  - Executar verificações seguras do frontend e, quando ativa, da API sem criar
    agendamentos reais.
  - Aceite: alertas acionáveis e evidência vinculada ao release.

- [ ] **F017-20 — Revisar dependências, certificados e acessos**
  - Definir cadência de patches, renovação, rotação e remoção de acessos.
  - Aceite: responsáveis e calendário aprovados.

- [ ] **F017-21 — Exercitar incidente e recuperação**
  - Simular falha de frontend, API, banco e worker; fechar gate quando necessário.
  - Aceite: tempos, decisões e melhorias registrados sem dados pessoais.

## Rastreabilidade

| Requisitos | Tarefas principais |
| --- | --- |
| DP01–DP02 | F017-04–F017-05 |
| DP03–DP04 | F017-03, F017-06, F017-10 |
| DP05–DP08 | F017-06–F017-08 |
| DP09 | F017-07, F017-10, F017-16 |
| DP10–DP15 | F017-12–F017-17 |
| DP16–DP17 | F017-02, F017-09, F017-18 |
| DP18–DP20 | F017-11, F017-16, F017-19–F017-21 |

## Ordem sugerida

1. F017-01 e F017-02.
2. F017-03 a F017-08.
3. F017-09 a F017-11, liberando somente o trilho A se aprovado.
4. F017-12 a F017-17.
5. F017-18 somente após todos os gates.
6. F017-19 a F017-21 de forma recorrente.

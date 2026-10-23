# Especificação: Deploy e ambientes

Criada em 22 de outubro de 2026. Estado: **contrato documental; nenhuma
infraestrutura foi escolhida, provisionada ou publicada**.

## Objetivo

Definir como o Simplifica Carta poderá ser entregue com segurança em dois
trilhos independentes:

1. o frontend React/Vite como aplicação estática; e
2. a agenda operacional da feature 014, que exige API, banco, worker e decisões
   institucionais ainda pendentes.

A feature 017 não cria uma página. Ela organiza requisitos de build, hospedagem,
roteamento, segurança, observabilidade, evidências e reversão. O contrato evita
que a indisponibilidade da agenda impeça, por si só, a publicação do conteúdo
estático, sem transformar uma interface editorial em serviço operacional falso.

## Fontes e precedência

- [Contrato de navegação](../../docs/arquitetura/contrato-navegacao.md): rotas,
  URL completa, 404 da aplicação e fallback SPA.
- [Arquitetura do sistema](../../docs/arquitetura/arquitetura-sistema.md):
  frontend estático e limite do backend.
- [ADR-003](../../docs/decisoes/adr-003-backend-atendimento.md): necessidade de
  backend mínimo para a agenda.
- [ADR-004](../../docs/decisoes/adr-004-stack-atendimento.md): stack candidata,
  ainda não aprovada.
- [Contrato da agenda](../014-atendimento-agendado/contrato-agenda.md): API,
  concorrência, outbox, gate operacional e bloqueios IN01–IN08.
- [Feature 016](../016-responsividade-acessibilidade/spec.md): critérios
  transversais que também valem no ambiente publicado.
- Documentação oficial do Vite sobre [deploy estático](https://vite.dev/guide/static-deploy.html),
  [build e base pública](https://vite.dev/guide/build) e
  [variáveis de ambiente](https://vite.dev/guide/env-and-mode), consultada em
  22/10/2026. Essas referências não selecionam fornecedor.

Se uma configuração específica de plataforma divergir deste contrato, deve ser
registrada em decisão própria antes da implementação. Nenhum exemplo de um
fornecedor na documentação do Vite equivale a uma escolha do projeto.

## Estado de partida

- O projeto possui `dev`, `build`, `preview` e `typecheck`; não possui script
  agregado `test`.
- O build padrão do Vite gera `dist/`, diretório ignorado pelo Git.
- `vite.config.ts` usa a base padrão `/`; domínio e eventual subpath não foram
  aprovados.
- Não há uso atual de `import.meta.env`, `process.env` ou variáveis `VITE_*` no
  frontend.
- O repositório não contém configuração de provedor, pipeline de publicação ou
  backend implementado da agenda.
- As 12 rotas oficiais são planejadas, mas a navegação e a 404 ainda possuem
  lacunas registradas. Um deploy não pode ocultar essas lacunas.

## Escopo

### Trilho A — frontend estático

Inclui:

- build reproduzível a partir de dependências travadas;
- publicação imutável do conteúdo de `dist/`;
- HTTPS, domínio, base pública, cache, headers e assets;
- fallback SPA sem capturar assets ou `/api`;
- URLs diretas, recarga, query string, fragmentos e 404 da aplicação;
- ambientes de preview/homologação e produção, quando aprovados;
- smoke tests publicados, evidência, promoção e rollback do artefato.

Não inclui SSR, armazenamento da Carta em servidor, autenticação, CMS ou
telemetria de conteúdo preenchido pelo usuário.

### Trilho B — agenda operacional

Inclui, somente após as aprovações da 014:

- proxy HTTPS same-origin para `/api`;
- processo web, banco transacional, migrations e worker de outbox;
- segredos, backup/restauração, supervisão, métricas e logs sem dados pessoais;
- ambiente sintético isolado, SMTP falso e testes reais de concorrência;
- gate operacional independente do conteúdo editorial.

Não inclui backend para Carta, diagnóstico, prévia, CSV ou suporte por e-mail da
feature 015. Esses dados permanecem no navegador conforme os contratos atuais.

## Requisitos funcionais e operacionais

### DP01 — Artefato estático

O pipeline deve instalar dependências de modo determinístico, executar os gates
aprovados, gerar `dist/` uma única vez e promover exatamente esse artefato entre
ambientes. O registro da entrega deve conter commit, data, executor automatizado,
versão de runtime, hash/identificador do artefato e ambiente. `vite preview` é
somente verificação local do build e não servidor de produção.

### DP02 — Base pública

A decisão deve registrar se a aplicação será servida na raiz `/` ou em subpath.
Até essa decisão, a raiz atual é apenas hipótese de trabalho. Se houver subpath,
`base` do Vite, links, roteamento, assets, fallback e smoke tests devem usar o
mesmo prefixo. Não corrigir caminhos manualmente após o build.

### DP03 — Fallback SPA

Para uma URL de página conhecida sem arquivo físico, a camada estática deve
entregar `index.html`, permitindo que a aplicação resolva a rota. A regra deve:

- excluir `/api` e qualquer prefixo operacional;
- não converter asset inexistente em HTML com status de sucesso;
- servir arquivos reais antes do fallback;
- manter query string; fragmentos são resolvidos pelo navegador;
- permitir que uma rota desconhecida chegue à 404 interna, sem redirecionar para
  a home e sem substituir a URL solicitada.

### DP04 — URLs diretas e navegação

Cada uma das 12 rotas oficiais deve abrir por acesso direto e recarga. Devem ser
verificados também `?etapa=`, fragmentos da FAQ, voltar/avançar, URL desconhecida,
título, foco e rolagem. O teste de infraestrutura e o teste da 404 da aplicação
são evidências diferentes.

### DP05 — HTTPS e fronteira de proxy

Todo ambiente compartilhado deve usar HTTPS. HTTP deve redirecionar de modo
seguro quando aplicável. Certificado, renovação, terminação TLS, domínio,
proxies confiáveis, hosts/origins permitidos, CSRF, HSTS e headers de segurança
dependem da topologia aprovada. A aplicação não deve gerar conteúdo misto.

### DP06 — Assets e cache

`index.html` e outros pontos de entrada devem revalidar e não ficar presos a um
release antigo. Assets com hash podem receber cache longo e imutável. Arquivos
sem hash exigem política conservadora. Verificar MIME, compressão, fontes Inter
e fallbacks, imagens, ícones, arquivos baixáveis e asset inexistente. URLs
temporárias do Figma não são assets de produção.

### DP07 — Variáveis públicas

Valores `VITE_*` são incorporados ao bundle e, portanto, são públicos. Nunca
devem conter credenciais, tokens, chaves privadas, dados pessoais ou segredos de
API. O frontend atual não exige variável própria. Caso a API permaneça
same-origin sob `/api`, não criar URL pública por antecipação. Variáveis futuras,
como identificador público do build, precisam de tipo, default, validação e
registro no `.env.example`; valores secretos ficam exclusivamente no runtime do
backend ou no mecanismo de segredos aprovado.

### DP08 — Headers e política do navegador

A infraestrutura deve definir, testar e documentar no mínimo política de tipo de
conteúdo, referrer e enquadramento. CSP, HSTS, Permissions Policy e demais
headers só podem ser fechados após inventário dos assets, analytics e chamadas
externas reais. O plano deve começar restritivo, registrar exceções e impedir que
um header quebre fontes, clipboard ou API sem evidência.

### DP09 — Privacidade e observabilidade

URLs, logs, traces, erros e métricas não devem conter Carta, respostas do
diagnóstico, dados do agendamento, e-mail institucional do usuário ou conteúdo
copiado. O frontend pode registrar apenas dados técnicos mínimos aprovados. A API
deve usar identificador de correlação, rota normalizada, status, latência e
métricas agregadas; payloads e segredos não entram em logs.

### DP10 — API e proxy da agenda

Quando liberada, a API deve usar o contrato da 014 sob `/api/atendimento/*`,
preferencialmente na mesma origem do frontend. O proxy deve preservar método,
status e headers necessários, limitar corpo/tempo, rejeitar caminhos fora do
contrato e nunca aplicar fallback SPA a uma resposta da API. Health checks não
podem expor segredos nem dados do banco.

### DP11 — Banco, migrations e concorrência

A agenda exige banco persistente e transacional aprovado. Migrations são
versionadas, revisadas, aplicadas separadamente e compatíveis com a estratégia de
rollback/roll-forward. Testes de dupla reserva, idempotência e locks devem usar o
banco escolhido em ambiente isolado; SQLite e mocks não comprovam concorrência.

### DP12 — Worker e outbox

O envio de notificação ocorre fora da requisição por worker supervisionado. A
criação da solicitação e do evento de outbox é atômica. Devem existir retry
limitado, idempotência, fila de falha inspecionável, métricas de atraso e manual
de recuperação. Falha de e-mail não apaga nem duplica a solicitação.

### DP13 — Segredos

O inventário mínimo candidato inclui credenciais de banco, chave da aplicação,
chave de digest/idempotência, hosts/origins/CSRF, credenciais e remetente SMTP,
destinatário institucional, gate administrativo, observabilidade e chaves de
backup. Os nomes finais dependem da stack. Segredos não entram no Git, em
`VITE_*`, logs, fixtures ou artefatos; devem ter dono, escopo por ambiente,
rotação e procedimento de revogação.

### DP14 — Ambientes sintéticos

Local, teste, homologação e produção não compartilham banco, segredos nem
destinatários. Testes automatizados e homologação inicial usam pessoas, órgãos,
datas e e-mails fictícios, relógio controlável e SMTP falso/capturado. Nenhum
teste automatizado envia mensagem para cidadão ou equipe real.

### DP15 — Backup e recuperação

Antes da agenda produtiva, definir retenção aprovada, backup criptografado,
restauração testada, objetivos de recuperação, expurgo e acesso. Um backup
existente sem ensaio de restauração não satisfaz o requisito.

### DP16 — Separação de liberação

O frontend estático pode ser candidato a liberação independentemente da agenda
quando seus próprios gates estiverem atendidos. Nesse caso, a entrada de
atendimento deve refletir o estado editorial `indisponível` ou `pausado`, sem
calendário, horários, formulário operacional ou promessa de confirmação. A
feature 015 pode permanecer disponível como instrução de cópia do e-mail, sem
backend e sem envio automático.

### DP17 — Gate operacional da agenda

Expor o fluxo real da 014 requer IN01–IN08 aprovados, ADR-004 aceita ou
substituída, backend implementado, migrations aplicadas, banco/worker/SMTP
configurados, testes isolados aprovados, privacidade validada, suporte e rollback
ensaiados. Publicar apenas a UI não satisfaz esse gate.

### DP18 — Promoção e rollback

Preview/homologação não promovem automaticamente produção. A promoção exige
aprovação e evidência associada ao mesmo artefato. O frontend deve voltar ao
artefato anterior conhecido. A agenda deve poder fechar o gate sem perder
registros; rollback de código e banco segue plano compatível, preferindo
roll-forward quando uma migration não puder ser revertida com segurança.

### DP19 — Testes no ambiente publicado

Após cada publicação não produtiva e produtiva autorizada, executar smoke tests
de HTTPS, documento, assets, 12 URLs diretas, recarga, query/hash, 404 da
aplicação, asset 404 e exclusão de `/api` do fallback. Para a agenda habilitada,
somar health, contexto, horários, criação sintética, conflito, idempotência,
outbox e falha controlada do worker. Guardar somente evidência sem PII.

### DP20 — Responsabilidade e incidente

Antes de produção, nomear responsáveis por plataforma, DNS/TLS, deploy,
segredos, banco, worker, monitoramento, privacidade, conteúdo e agenda. Registrar
como pausar atendimento, reverter release, comunicar incidente e restaurar
serviço. A feature não atribui nomes ou fornecedores por inferência.

## Estados de liberação

| Estado | Frontend estático | Agenda 014 |
| --- | --- | --- |
| Documentação atual | Planejada, não publicada | Contrato planejado, operação bloqueada |
| Preview futuro | Possível após pipeline e gates do frontend | Deve permanecer sintética e fechada por padrão |
| Homologação futura | Mesmo artefato candidato, URLs e acessibilidade verificadas | Somente após decisões e infraestrutura isolada |
| Produção futura | Pode ser aprovada separadamente | Somente após DP17 e aprovação institucional |

## Decisões pendentes

| ID | Decisão necessária | Responsável a confirmar | Impacto |
| --- | --- | --- | --- |
| INF01 | Fornecedor(es), contas, regiões e custos | Infraestrutura/gestão | Pipeline, recursos e operação |
| INF02 | Domínio, DNS, raiz ou subpath e certificados | Infraestrutura/comunicação | Base Vite, links, TLS e testes |
| INF03 | Ambientes, promoção, branch/tag e aprovações | Engenharia/gestão | Processo de release |
| INF04 | Headers, CSP, analytics, monitoramento e source maps | Segurança/engenharia | Browser, privacidade e diagnóstico |
| INF05 | Stack/versões definitivas da agenda | Coordenação técnica | Backend, imagem, patches e suporte |
| INF06 | Banco, região, HA, backup e recuperação | Infraestrutura/dados | Persistência e continuidade |
| INF07 | Execução/supervisão do worker e SMTP institucional | Infraestrutura/GESED | Notificações e suporte |
| INF08 | Cofre, donos, rotação e resposta a segredo exposto | Segurança/infraestrutura | Proteção operacional |
| INF09 | Retenção, privacidade, acesso e logs | Encarregado/gestão | Tratamento de dados |
| INF10 | SLOs, alertas, plantão e incidente | Operação/gestão | Disponibilidade e reação |

IN01–IN08 permanecem no contrato da 014 e não são substituídos por INF01–INF10.

## Fora de escopo desta tarefa

- escolher ou contratar provedor;
- criar pipeline, conta, DNS, certificado, banco, API ou worker;
- executar build, testes, migrations ou deploy;
- usar dados reais ou enviar mensagens;
- declarar prontidão funcional, visual, assistiva ou operacional.

## Critérios de aceite documental

1. Os dois trilhos e seus gates estão separados.
2. As 12 rotas, fallback SPA, 404 interna, assets e HTTPS têm destino de teste.
3. Variáveis públicas e segredos não são confundidos.
4. API, proxy, banco, worker, outbox e ambiente sintético da 014 têm contrato.
5. Toda escolha institucional permanece identificada, sem fornecedor inferido.
6. Há plano, tarefas, quickstart, validação e verificação coerentes com esta spec.
7. Nenhuma frase afirma que o produto foi publicado ou homologado.

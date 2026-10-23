# Plano de implementação: Deploy e ambientes

Criado em 22 de outubro de 2026. **Não executado.** Este documento traduz a
spec em uma sequência técnica independente de fornecedor. Configurações finais
só serão escritas após INF01–INF10; backend só inicia após IN01–IN08 e decisão
sobre a ADR-004.

## 1. Linha de base técnica

| Item | Estado observado em 22/10/2026 | Consequência |
| --- | --- | --- |
| Frontend | React 19 + TypeScript + Vite 7 | Candidato a build estático |
| Scripts | `dev`, `build`, `preview`, `typecheck` | Não existe `npm run test` agregado |
| Build | `tsc -b && vite build`; saída padrão `dist/` | Gates e manifesto precisam de consolidação |
| Base | Vite sem `base` explícita, logo hipótese `/` | Depende de INF02 |
| Ambiente | Nenhum uso de `import.meta.env`/`VITE_*` | Não criar variável sem consumidor real |
| Navegação | Contrato de 12 rotas; lacunas em código | Fechar antes do aceite publicado |
| Deploy | Sem configuração/pipeline/provedor | Depende de INF01–INF04 |
| Agenda | Contrato futuro, sem API/banco/worker | Trilho B bloqueado |

O diretório `dist/` existente localmente não é evidência de release, não deve
ser versionado e não pode ser promovido sem manifesto e gates reproduzíveis.

## 2. Componentes futuros

```text
Navegador
  └─ HTTPS / e rotas da SPA
      ├─ arquivos reais: index.html, JS, CSS, fontes, imagens
      ├─ fallback de página -> index.html -> roteamento/404 da aplicação
      └─ /api/atendimento/* -> proxy (sem fallback)
                                  └─ API web
                                      ├─ banco transacional
                                      └─ outbox
                                           └─ worker -> SMTP institucional
```

Somente o ramo estático é necessário para páginas 002–013, 015 e conteúdo
editorial da 014. Carta, diagnóstico, prévia e CSV não atravessam a fronteira da
API. O backend não deve receber esses estados nem mesmo para observabilidade.

## 3. Adaptação ao fornecedor

Depois da decisão INF01, criar o menor conjunto de arquivos exigido pelo
provedor. A regra conceitual é:

```text
se caminho começa com /api/: encaminhar à API ou retornar erro real
senão se arquivo existe: servir arquivo
senão se caminho parece asset/arquivo: retornar 404
senão: servir /index.html preservando a URL
```

Não copiar cegamente um exemplo de Netlify, Vercel, GitHub Pages, Firebase,
Nginx ou outro serviço. O adaptador escolhido deve demonstrar a ordem acima,
status e content-type. Se a aplicação usar subpath, todos os prefixos partem da
base aprovada.

## 4. Pipeline do frontend

### 4.1 Entrada

- commit/tag aprovado;
- lockfile íntegro;
- runtime fixado em versão suportada;
- somente variáveis públicas allowlisted;
- configuração de base correspondente ao ambiente.

### 4.2 Gates

1. instalação determinística;
2. typecheck;
3. suites existentes por comando real a definir — não presumir `npm run test`;
4. build;
5. inspeção do bundle contra segredos e URLs temporárias;
6. verificação de links/assets aplicável;
7. geração de manifesto e hash.

Falha em qualquer gate impede publicação. O build ocorre uma vez; o artefato é
promovido sem recompilação entre homologação e produção quando a configuração
pública permitir. Se valores embutidos exigirem builds por ambiente, registrar
essa limitação e tratar cada saída como artefato distinto.

### 4.3 Saída

```text
artifactId, commit, createdAt, runtimeVersion, dependencyLockHash,
publicBase, publicEnvironmentKeys, checks, filesHash
```

O manifesto não contém valores secretos nem dados pessoais.

## 5. Base, assets e cache

- Raiz `/`: manter a base padrão apenas após INF02 confirmar o domínio.
- Subpath: declarar `base` no Vite e testar abertura direta sob o prefixo.
- Usar `import.meta.env.BASE_URL` apenas em composição dinâmica inevitável.
- `index.html`: revalidar; não usar cache imutável longo.
- arquivos com hash: cache público longo e `immutable` quando o fornecedor
  garantir conteúdo endereçado pelo nome.
- arquivos sem hash: revalidação conservadora.
- 404 de asset: status 404 e tipo coerente, nunca HTML 200 da SPA.
- validar fonte Inter, fallback, imagens, ícones, CSV baixado e seus MIME types.

## 6. Variáveis e segredos

### Frontend

| Candidato | Estado | Regra |
| --- | --- | --- |
| `VITE_BUILD_ID` | Opcional, ainda não criado | Identificador público e não sensível |
| URL da API | Dispensável se same-origin `/api` | Criar apenas se topologia aprovada exigir |
| Analytics/monitoramento | Não aprovado | Depende de INF04/INF09 e consentimento aplicável |

Qualquer chave `VITE_*` aparece no bundle. Quando houver uso real, tipar em
`vite-env.d.ts`, validar na inicialização/build e documentar em `.env.example`
sem valores reais.

### Backend

Os nomes dependem da stack, mas o inventário deve cobrir: segredo da aplicação,
DSN/credenciais do banco, chave de digest/idempotência, hosts/origins/CSRF,
credenciais/remetente/destinatário SMTP, gate operacional, observabilidade e
chaves de backup. O mecanismo aprovado injeta os valores no runtime; rotação e
revogação fazem parte do runbook.

## 7. Headers e HTTPS

Implementar após inventário de origens:

- redirect para HTTPS e certificado renovável;
- HSTS somente quando domínio/subdomínios estiverem preparados;
- `X-Content-Type-Options: nosniff` ou equivalente;
- `Referrer-Policy` aprovada;
- restrição de frame por CSP `frame-ancestors` ou política equivalente;
- CSP construída por allowlist real, sem liberar `unsafe-*` por conveniência;
- Permissions Policy mínima quando aplicável.

Verificar clipboard, fontes, imagens, downloads e API após cada mudança. O
header efetivamente recebido no ambiente, não apenas o arquivo de configuração,
é a evidência.

## 8. Backend futuro da agenda

### 8.1 API e proxy

Implementar os endpoints definidos no contrato da 014. O proxy deve preservar
status de sucesso, validação, conflito, expirado e indisponibilidade; aplicar
limites de tamanho/tempo; propagar identificador técnico de requisição; e remover
headers não confiáveis. CSRF/origin/hosts são configurados por ambiente.

### 8.2 Banco

Usar o banco aprovado na ADR final. Criar migrations com estratégia
expand/contract, índices e restrições que sustentem unicidade/concorrência.
Solicitação, snapshot do horário e evento de outbox são gravados atomicamente.
Testes concorrentes abrem conexões reais e não usam SQLite como substituto.

### 8.3 Worker

Executar como processo separado e supervisionado. Reservar evento, enviar por
SMTP aprovado, registrar somente metadados não pessoais e marcar resultado de
forma idempotente. Retentativas usam backoff/limite; falha permanente permanece
visível para operação. Reprocessamento exige permissão e trilha de auditoria.

### 8.4 Dados e ambientes

- fixtures com nomes, e-mails, órgãos e datas fictícios;
- SMTP falso ou caixa capturada em local/teste/homologação inicial;
- relógio/fuso controlável;
- bancos, segredos e buckets separados;
- logs sem corpo, e-mail, telefone, descrição ou Carta;
- produção sem endpoints de debug e sem dados sintéticos misturados aos reais.

## 9. Observabilidade e saúde

Frontend: disponibilidade do documento, assets essenciais, latência técnica,
erros agregados e versão do release. Backend: taxa/latência/status por rota,
conflitos, saturação do banco, tamanho/idade da outbox, retries, falhas do worker
e estado do gate. Health superficial não consulta nem expõe dados; readiness
comprova dependências necessárias sem retornar credenciais.

Alertas precisam de responsável, janela, severidade e ação. Source maps e
serviços externos permanecem desligados até INF04/INF09 definirem acesso,
retenção e proteção.

## 10. Matriz de testes publicados

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| PUB01 | `GET /` por HTTPS | Documento da SPA, status/tipo corretos |
| PUB02 | Cada uma das 12 rotas e recarga | Mesmo path chega à página correta |
| PUB03 | Tutorial com `?etapa=4` | Query preservada e etapa normalizada pela aplicação |
| PUB04 | FAQ com fragmento | Alvo resolvido no cliente, foco conforme contrato |
| PUB05 | URL de página desconhecida | `index.html` permite 404 interna; URL não vira `/` |
| PUB06 | Asset real | Arquivo, MIME, cache e hash corretos |
| PUB07 | Asset inexistente | 404 real, não `index.html` |
| PUB08 | `/api/...` sem backend naquele ambiente | Erro de API/indisponível, nunca SPA |
| PUB09 | HTTP quando aplicável | Redirect seguro para HTTPS |
| PUB10 | Headers/cache/certificado | Política efetivamente recebida e válida |
| PUB11 | Release anterior | Rollback restaura versão e smoke passa |
| PUB12 | Bundle/config | Sem segredo, PII ou URL temporária |
| AGD01 | Agenda editorial fechada | Sem calendário/formulário/promessa operacional |
| AGD02 | Agenda sintética ativa | AG01–AG13/R1–R6 passam no ambiente isolado |
| AGD03 | Duas reservas simultâneas | Uma vence; outra recebe conflito definido |
| AGD04 | Worker/SMTP falha e retorna | Registro persiste; retry não duplica evento |
| AGD05 | Backup/restauração | Estado recuperado conforme objetivos aprovados |

## 11. Ordem de implementação

1. Decisões e navegação.
2. Pipeline/build/base/assets.
3. Configuração estática e ambiente não produtivo.
4. PUB01–PUB12, visual e acessibilidade.
5. Promoção/rollback do trilho A, se aprovado.
6. Fundação isolada do trilho B.
7. AGD02–AGD05 e todos os gates DP17.
8. Autorização separada para produção da agenda.

## 12. Arquivos candidatos futuros

Somente após decisão:

- adaptador de deploy/pipeline do fornecedor;
- configuração de headers/rewrites;
- `.env.example` e tipos de ambiente, se houver variáveis públicas;
- manifesto de release gerado fora do código-fonte ou em artefato de CI;
- implementação backend e migrations no local definido pela ADR final;
- runbooks de release, rollback, backup e incidente.

Este plano não autoriza criar esses arquivos nem fixa nomes de produtos.

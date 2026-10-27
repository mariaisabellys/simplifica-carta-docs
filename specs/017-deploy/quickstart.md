# Quickstart: Verificação futura do deploy

Criado em 22 de outubro de 2026. Estado: **roteiro preparado, não executado**.
Não há URL publicada, fornecedor aprovado ou agenda operacional disponível.

## Finalidade

Orientar uma verificação reproduzível depois que uma implementação da 017
existir. O roteiro usa dados sintéticos e separa preview local, hospedagem
estática e backend da agenda.

## Pré-condições

- decisões INF01–INF04 aprovadas para o frontend e parcelas aplicáveis de
  INF08–INF10 aprovadas quando houver credenciais, logs, monitoramento ou
  operação do ambiente;
- commit e artefato identificados;
- runtime suportado e dependências instaláveis pelo lockfile;
- navegação oficial implementada;
- URL de preview/homologação autorizada;
- para a agenda: IN01–IN08, ADR final, banco isolado, worker e SMTP falso;
- nenhuma credencial ou dado real no terminal, fixtures ou capturas.

## Etapa 1 — conferência local do frontend

Comandos previstos no projeto atual:

```bash
npm run typecheck
npm run build
npm run preview -- --host 127.0.0.1
```

`preview` serve apenas para inspecionar o conteúdo de `dist/`. Ele não comprova
rewrites, proxy, cache, TLS ou headers do ambiente de produção. O projeto não
possui atualmente `npm run test`; execute cada suite pelo comando real definido
na implementação e registre-o, sem inventar um agregador.

Resultado esperado: build concluído, `dist/` gerado localmente, manifesto futuro
coerente e nenhum segredo/URL temporária no bundle.

## Etapa 2 — smoke da hospedagem

Substitua `<ambiente-aprovado>` pela URL registrada; não cole token no comando.

```bash
curl -I https://<ambiente-aprovado>/
curl -I https://<ambiente-aprovado>/explorar-por-etapas
curl -I https://<ambiente-aprovado>/assets/<arquivo-real-com-hash>
curl -I https://<ambiente-aprovado>/assets/nao-existe.js
curl -I https://<ambiente-aprovado>/api/nao-existe
```

Resultados esperados:

- home e rota de página entregam documento da SPA por HTTPS;
- asset real tem tipo/cache corretos;
- asset inexistente retorna 404, não HTML de sucesso;
- `/api/nao-existe` não recebe fallback da SPA;
- headers recebidos correspondem à política aprovada.

## Etapa 3 — URLs diretas no navegador

Abrir e recarregar, uma por vez:

1. `/`
2. `/explorar-por-etapas`
3. `/o-que-e-carta-de-servicos`
4. `/diagnostico`
5. `/diagnostico/resultado`
6. `/organizar-informacoes`
7. `/formulario-carta`
8. `/previa`
9. `/tutorial-paraiba-digital?etapa=4`
10. `/ajuda#duvidas-frequentes`
11. `/ajuda/atendimento-agendado`
12. `/ajuda/suporte-email`

Testar também `/rota-inexistente`, voltar/avançar, fragmento legado da FAQ e
query inválida do tutorial. Resultado esperado: URL preservada, página/estado
correto, 404 interna verdadeira, título/foco/scroll conforme o contrato e Carta
mantida apenas na memória da sessão quando aplicável.

## Etapa 4 — estado editorial da ajuda

Sem agenda operacional aprovada:

- a entrada de atendimento deve aparecer indisponível ou pausada;
- nenhum horário, formulário ou confirmação pode ser oferecido;
- suporte por e-mail apresenta o endereço aprovado e o botão “Copie o e-mail”;
- não ocorre envio automático nem abertura obrigatória de cliente de e-mail.

Resultado esperado: o frontend estático pode ser verificável sem promessa falsa
da 014.

## Etapa 5 — agenda sintética, somente quando liberada

1. Confirmar visualmente e por configuração que o ambiente não é produção.
2. Consultar contexto e horários usando identidade fictícia.
3. Criar solicitação com nome, e-mail, telefone, órgão e descrição sintéticos.
4. Repetir a mesma chave de idempotência.
5. Disputar um horário por duas conexões controladas.
6. Simular falha e retorno do SMTP falso.
7. Conferir solicitação, snapshot e outbox sem expor o payload em logs.
8. Fechar o gate e confirmar resposta de indisponibilidade.

Resultado esperado: contratos AG01–AG13/R1–R6 atendidos, uma única reserva no
conflito, evento idempotente, falha recuperável e nenhuma mensagem real.

## Etapa 6 — rollback

- Frontend: reativar o artefato anterior registrado e repetir PUB01–PUB12.
- Agenda: fechar gate, pausar worker se necessário e seguir o runbook aprovado;
  não apagar registros nem reverter migration insegura.

Resultado esperado: serviço retorna ao estado conhecido e a evidência registra
artefatos, horários, responsáveis e resultado sem PII.

## Registro mínimo

```text
data; ambiente; URL; commit; artifactId; base; runtime;
checks executados; resultado; defeitos; responsável pela evidência
```

Não registrar cookies, tokens, payloads, nomes, telefones, e-mails ou textos da
Carta. Uma execução futura deve atualizar `verification.md`; este quickstart por
si só não é evidência de execução.

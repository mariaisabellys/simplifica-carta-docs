# Verificação T015 — navegação compartilhada

## Resultado

Verificação documental concluída em 22/10/2026. O contrato ativo usa uma única
API: `NavigationProvider`, `useAppLocation`, `useAppNavigate` e `AppLink`.
`ButtonLink`, breadcrumb, marca, menu e rodapé compõem `AppLink`. O estado de
navegação é sempre `pathname + search + hash`; somente o provider escreve em
`window.history`, e o `AppShell` coordena título, foco, rolagem e skip link.

Esta verificação não implementa o contrato. Ela distingue o destino planejado
do que está registrado no código e não trata lacunas funcionais como entregas.

## Fontes conferidas

- [contrato central](../arquitetura/contrato-navegacao.md);
- `src/app/App.tsx`, `src/app/routes.tsx`, `src/lib/navigation.ts` e shell atual;
- specs ativas 001–016, contratos das features 007, 009, 011–015 e conteúdo
  de ações do diagnóstico;
- estado do repositório no início da T015, preservado sem alterações funcionais.

## Inventário: planejado versus registrado

| Feature | Contrato documental | Estado observado no código | Lacuna de implementação |
| --- | --- | --- | --- |
| 001 | Metadados de rota e shell compartilhado. | Base Vite existe. | Não entrega provider, metadata completa ou 404. |
| 002 | Home `/`; marca, menu, rodapé e botões usam `AppLink`. | `/` registrada; shell recebe API legada `onNavigate`. | Migrar shell/App para o contrato central, título, skip, foco e URL completa. |
| 003 | `/explorar-por-etapas`; entradas para diagnóstico, organização, formulário e tutorial. | Página/rota não registradas. | Criar página e registrar rota/metadata; validar os quatro destinos e retorno à home. |
| 004 | `/o-que-e-carta-de-servicos`; retorno e links internos pelo contrato; legislação externa nativa. | Rota registrada. | Consumir AppLink e manter links externos fora do roteador. |
| 005 | Perguntas internas em `/diagnostico`; resultado em `/diagnostico/resultado`. Resultado direto inválido retorna com replace. | Duas rotas registradas; páginas placeholder. | Implementar sessão e redirecionamento; ações aprovadas vão a `/organizar-informacoes`, `/ajuda` ou `/`. |
| 006 | `/organizar-informacoes`; retorno/avanço por link compartilhado. | Rota registrada; placeholder. | Integrar sem provider local. Estado dos tópicos não entra na URL. |
| 007 | `/formulario-carta`; cinco partes são estado interno, sem `?parte`. | Rota registrada; placeholder. | Manter provider da Carta acima das rotas e registro de alvos `carta-*`. |
| 008 | Região embutida na 007, sem rota. | Sem rota própria, conforme contrato. | Correções abrem a parte correta antes de focar o alvo autorizado. |
| 009 | `/previa`; retorno ao formulário preserva valores e usa registro de alvos. | Rota registrada; placeholder. | Resolver alvos após montagem; removido/inativo usa fallback definido. |
| 010 | Ação embutida na 009, sem rota. | Sem rota própria, conforme contrato. | Download não deve ser interceptado por AppLink. |
| 011 | `/tutorial-paraiba-digital?etapa=1..6`; query dirige a etapa. | Rota registrada; placeholder sem query. | Normalizar query com replace, preservar parâmetros desconhecidos e integrar histórico. |
| 012 | Região embutida somente na etapa 4; retorno explícito usa `?etapa=4`. | Sem rota própria, conforme contrato. | Alvos `tutorial-carta-*`; ausência/inatividade cai em `tutorial-dados`. |
| 013 | `/ajuda`; hashes canônicos `#duvidas-frequentes` e `#precisa-de-apoio`. | Rota e IDs de conteúdo existem. | Shell ainda não sincroniza/foca hash. Alias antigo deve normalizar com replace. |
| 014 | `/ajuda/atendimento-agendado`; entrada abre primeiro o canal e depois calendário por estado interno. | Rota registrada; implementação ainda parcial. | Não criar query/histórico artificial para passos; voltar aos canais usa rota real. |
| 015 | `/ajuda/suporte-email`; copiar e-mail é ação local. | Rota registrada. | Copiar não navega; fallback de cópia permanece ação local, sem `mailto:` implícito. |
| 016 | Requisitos transversais do contrato central. | Guarda parcial existe, mas shell não entrega o ciclo completo. | Aplicar foco/scroll/título uma vez após montagem e validar teclado/leitor de tela. |

O contrato possui 12 paths oficiais; `routes.tsx` registra 11. A diferença é
exclusivamente `/explorar-por-etapas`. A função atual `findRoute` devolve a home
para paths desconhecidos e deve passar a distinguir rota ausente para renderizar
404 dentro do shell, preservando a URL. O fallback SPA do servidor é uma
configuração independente e ainda precisa de evidência no ambiente de entrega.

## Destinos e retornos consolidados

- FAQ: destino canônico `/ajuda#duvidas-frequentes`; o nome antigo
  `#perguntas-frequentes` é alias normalizado por replace, não um segundo ID.
- Diagnóstico inválido: `/diagnostico` com replace. Reinício limpa somente as
  oito respostas; CTAs do resultado usam o mapa versionado da feature 005.
- Carta: partes permanecem internas. Prévia/validação abrem a parte e focam um
  alvo autorizado; dados removidos ou inativos usam o fallback de grupo/condição.
- Tutorial: anterior/próxima altera apenas `etapa`, mantendo search desconhecida
  e hash. Ausente, repetida ou inválida normaliza para etapa 1 com replace.
- Edição a partir da etapa 4 retorna explicitamente a
  `/tutorial-paraiba-digital?etapa=4`; o histórico do navegador segue válido.
- `Concluir Guia` retorna à home `/`, preserva a Carta e não confirma publicação.
- 014 usa rota entre canais e atendimento; calendário/formulário/confirmação
  são estados internos. 015 copia texto e não abre cliente de e-mail por inferência.

## Cenários obrigatórios para a implementação

| ID | Verificação esperada |
| --- | --- |
| NV01 | URL direta e recarga em cada um dos 12 paths; rota 003 incluída. |
| NV02 | Clique primário interno usa push; mesma URL completa não duplica histórico. |
| NV03 | Ctrl/Cmd/Shift/Alt, clique do meio, target, download e externo mantêm comportamento nativo. |
| NV04 | Mudança apenas de search ou hash atualiza localização sem perder os demais componentes. |
| NV05 | Voltar/avançar restaura path, etapa e fragmento sem novo push. |
| NV06 | `?etapa` ausente/repetida/inválida normaliza com replace e preserva parâmetros desconhecidos. |
| NV07 | FAQ canônica e alias rolam/focam o alvo real; hash inexistente usa fallback seguro. |
| NV08 | Resultado direto sem sessão retorna ao diagnóstico; reinício não fabrica resultado. |
| NV09 | Retornos 007/009/012 abrem o estado necessário antes do foco e preservam a Carta. |
| NV10 | Título, h1/região, scroll e `#conteudo-principal` são coordenados uma vez pelo shell. |
| NV11 | URL desconhecida mantém o endereço e mostra 404; fallback SPA é testado separadamente. |
| NV12 | Navegação, query, hash e popstate não remontam nem limpam a sessão da Carta. |

## Ajustes documentais realizados

- substituídos exemplos locais concorrentes nas features 002, 003 e 005;
- alinhados 013 e 016 ao dono único de URL, foco, título, rolagem e skip link;
- complementadas as tarefas 002, 003 e 016 com o contrato e NV01–NV12;
- fechado o destino de `Concluir Guia` nos documentos da 011;
- corrigido o fragmento canônico da FAQ e registrado o alias legado;
- preservadas as versões anteriores em diretórios `historico/` pre-T015.

## Verificação e limites

- buscas documentais não encontraram API concorrente em artefatos ativos; as
  ocorrências restantes de contratos antigos estão identificadas como estado
  atual do código ou registro histórico superado;
- os paths do contrato foram comparados com `src/app/routes.tsx`: 12 planejados,
  11 registrados e uma lacuna explícita (003);
- referências Markdown relativas e whitespace foram verificados no fechamento;
- nenhum teste, build, navegador ou servidor foi executado: o escopo é documental;
- nenhum arquivo em `src/` ou `tests/` foi alterado pela T015.

T011 continua parcial pela migração de conteúdo tipado ainda pendente. Isso não
impede o fechamento do contrato documental de navegação, mas bloqueia o aceite
funcional completo do tutorial. As lacunas deste registro devem ser executadas
na etapa de implementação, sem reinterpretá-las como código já entregue.

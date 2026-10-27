# Contrato de integração do tutorial com a Carta v3

20/10/2026 — parte documental da T011 de [docs/tasks](../../docs/tasks.md).
Sincronização do conteúdo executável concluída em 27/10/2026. Isso não comprova
que o tutorial, a projeção da 012 ou a plataforma externa foram implementados.

## Fontes e responsabilidades

- [Modelo central 007](../007-formulario-carta-servico/modelo-central-carta.md) e [matriz de campos](../007-formulario-carta-servico/matriz-campos-v3.md): valores, tipos, catálogos, condições, recuperação e edição.
- [Contrato 012](../012-copia-dados-tutorial/contrato-transferencia-v3.md): apresentação integral, elegibilidade e operações de cópia.
- [Navegação compartilhada](../../docs/arquitetura/contrato-navegacao.md): URL, histórico, foco e preservação da sessão.
- [Conteúdo atual](../../src/content/tutorial/paraiba-digital.ts): fonte editorial sincronizada com o contrato 25/13/12, sem valores ilustrativos da Carta.
- [Mapa visual](../../docs/design-system/mapa-figma-telas.md): uma página, seis estados; referência não é homologação da interface externa.

011 controla página, passos, progresso, instruções e CTAs. 012 controla a região
`tutorial-dados`, projeção, grupos, âncoras, clipboard e alternativa manual.
007 fornece a única Carta segura acima das rotas. Não duplicar provider,
normalização, validação, mecanismo de cópia ou estado editável no tutorial.

## Contrato da etapa 4

Montar a 012 exclusivamente em `fill-information`, etapa 4.
Apresentar todos os campos aplicáveis dos cinco grupos, inclusive ausências.
A matriz da 012 tem 25 definições: 13 abertas copiáveis quando preenchidas e
12 escolhas sem botão, nem mesmo desabilitado. Coleções repetem controles
por ID/propriedade; número de botões não é constante.

K = custo sob-consulta/com-taxa; S = exigeAgendamento true; ON = S e tipos
contém online; E = ON e sistema-externo. Campos inativos não montam valores, controles ou
âncoras, mas permanecem na fonte. Não apagar dados ao navegar.
Abertos vazios não copiam “Não informado”. Coleções vazias não geram item.
null não significa Não ou gratuito. Ativo false é exibido como Inativo e true
como Ativo, sem prometer publicação externa ou confirmação da interação.

Não bloquear cópia por incompletude, avaliação editorial, diagnóstico ou CSV.
Copiar somente a string original aberta, por item, sem rótulo, unidade,
numeração, agregação, proteção CSV ou texto de exemplo. Escolhas exibem os
rótulos do catálogo local; transferência externa dessas escolhas é manual.

## Migração editorial executada em paraiba-digital.ts

Em 27/10/2026, a lista fixa de dez `quickCopyFields`, os seis `copyLabel` e
todos os valores ilustrativos foram retirados da etapa 4. O conteúdo agora
referencia `tutorialCartaDataContent`, cuja projeção pertence à feature 012 e
declara cinco grupos, 25 definições, 13 textos copiáveis e 12 escolhas somente
informativas. A lista canônica continua na matriz 007/012, sem duplicação no
conteúdo da 011.

| Elemento anterior | Tratamento aplicado |
| --- | --- |
| Dez entradas quickCopyFields e seis copyLabel | Substituídos pela referência à projeção completa da 012; elegibilidade vem do tipo/condição. |
| Valores de certificado, documentos e público | Removidos; valores reais virão exclusivamente da sessão da Carta. |
| Lorem ipsum em additional-information | Removido do fluxo real; eventual demonstração pertence a fixture sintética separada. |
| Online: www.url.com e Gratuito | Removidos; agendamento e custo vêm da Carta, sem inferência. |
| Prazo “Até 5 dias úteis” | Removido; prazo máximo e unidade permanecem controles distintos na 007/012. |
| Introdução aos atalhos | Substituída por orientação sobre textos copiáveis e escolhas manuais. |
| Editar na minha Carta | Preservada como uma única ação para `/formulario-carta`; vazio será tratado pela integração da 012. |
| Etapas 1–3/5–6, IDs, percentuais e ações | Preservados. Instruções operacionais continuam candidatas até confirmação institucional. |

A introdução sincronizada não constitui aprovação institucional.
Não colocar valores da sessão no arquivo editorial ou consultar DOM para obtê-los.
Preservar o export de compatibilidade existente ou migrar seus consumidores
explicitamente na implementação; não assumir que ele é o objeto completo.

## Matriz de correspondência externa v3

Inventário local, não homologação externa. A condição segue a 012.
Em cada linha, “Pendente” significa não verificado, não “sem equivalente”.
Depois da evidência, registrar nome externo exato, tela/parte, modo de entrada,
diferenças/limites/obrigatoriedade, referência e trecho, perfil/versão da interface,
responsável e data efetiva. Classificar como confirmada, complemento ou sem
equivalente somente após verificar; manter vínculo individual por ID local.

| Nº | Grupo / ID local | Path v3 | Condição | Campo externo / tela | Modo / diferenças | Fonte / data / status |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Sobre / `service-name` | `sobreServico.nome` | A | Pendente | Pendente | Pendente |
| 02 | Sobre / `popular-name` | `sobreServico.nomePopular` | A | Pendente | Pendente | Pendente |
| 03 | Sobre / `service-description` | `sobreServico.descricao` | A | Pendente | Pendente | Pendente |
| 04 | Sobre / `category` | `sobreServico.categoria` | A | Pendente | Pendente | Pendente |
| 05 | Sobre / `subcategory` | `sobreServico.subcategoria` | A | Pendente | Pendente | Pendente |
| 06 | Sobre / `topic` | `sobreServico.topico` | A | Pendente | Pendente | Pendente |
| 07 | Sobre / `active` | `sobreServico.ativo` | A | Pendente | Pendente | Pendente |
| 08 | Público / `specific-audience` | `publicoRequisitos.publicosEspecificos` | A | Pendente | Pendente | Pendente |
| 09 | Público / `user-profile` | `publicoRequisitos.perfisUsuario` | A | Pendente | Pendente | Pendente |
| 10 | Público / `who-can-use` | `publicoRequisitos.quemPodeUtilizar` | A | Pendente | Pendente | Pendente |
| 11 | Público / `required-documents` | `publicoRequisitos.documentos[].nome` | A | Pendente | Pendente | Pendente |
| 12 | Público / `costs-and-fees` | `publicoRequisitos.custo.tipo` | A | Pendente | Pendente | Pendente |
| 13 | Público / `cost-value-or-link` | `publicoRequisitos.custo.detalhe` | K | Pendente | Pendente | Pendente |
| 14 | Público / `maximum-deadline` | `publicoRequisitos.prazo.maximo` | A | Pendente | Pendente | Pendente |
| 15 | Público / `deadline-type` | `publicoRequisitos.prazo.tipo` | A | Pendente | Pendente | Pendente |
| 16 | Fluxo / `step-title` | `etapas[].titulo` | A | Pendente | Pendente | Pendente |
| 17 | Fluxo / `citizen-guidance` | `etapas[].orientacaoCidadao` | A | Pendente | Pendente | Pendente |
| 18 | Fluxo / `modality` | `etapas[].modalidade` | A | Pendente | Pendente | Pendente |
| 19 | Atendimento / `requires-scheduling` | `atendimento.exigeAgendamento` | A | Pendente | Pendente | Pendente |
| 20 | Atendimento / `scheduling-type` | `atendimento.tiposAgendamento` | S | Pendente | Pendente | Pendente |
| 21 | Atendimento / `scheduling-system` | `atendimento.sistemaAgendamento` | S | Pendente | Pendente | Pendente |
| 22 | Atendimento / `scheduling-link` | `atendimento.linkAgendamento` | E | Pendente | Pendente | Pendente |
| 23 | Atendimento / `scheduling-display` | `atendimento.exibicaoAgendamento` | E | Pendente | Pendente | Pendente |
| 24 | Finais / `important-additional-information` | `informacoesFinais.informacoesAdicionais` | A | Pendente | Pendente | Pendente |
| 25 | Finais / `keywords` | `informacoesFinais.palavrasChave` | A | Pendente | Pendente | Pendente |

São 25 linhas de cobertura, sem inventar um correspondente externo para cada
uma. Multilinha não implica criação de múltiplos itens; opções e listas podem
exigir entradas separadas. Obrigatoriedade local não prova obrigatoriedade
externa. Campo extra externo não autoriza alterar o modelo local.
Não incluir recorrência, canais ou orientações legadas como novos campos v3.

## Registro de evidências operacionais

Revisão documental local: 20/10/2026. Não usar esta data como `reviewedAt`
ou `checkedAt` de fonte externa. Não houve consulta externa nesta tarefa.
As buscas públicas descritas no [registro anterior](historico/2026-10-20-pre-t011-verification.md)
são históricas e não confirmaram acesso administrativo.

| Etapa / assunto | Evidência necessária | Fonte / data efetiva | Estado |
| --- | --- | --- | --- |
| 1 access-platform | URL oficial administrativa, perfil e permissões | Não obtida / não verificada | Pendente; não substituir por portal público presumido |
| 2 sign-in | Login institucional e redirecionamento | Não obtida / não verificada | Instruções atuais candidatas |
| 3 locate-registration | Menu Carta de Serviços, Serviços, Novo Serviço | Não obtida / não verificada | Nomes ainda não homologados |
| 4 fill-information | 25 correspondências e diferenças de preenchimento | Matriz acima sem fonte administrativa | Pendente |
| 5 review-data | Campos revisados e ação Salvar rascunho | Não obtida / não verificada | Rever referência genérica a canais sem criar campo local |
| 6 publish-service | Salvar, envio para análise, avaliação e publicação | Não obtida / não verificada | Não prometer fluxo comprovado ou publicação automática |
| Imagens/GIFs nas etapas 1–3/5–6 | Origem, autorização, contexto, captura, legenda e alt | Apenas placeholder no conteúdo | Assets reais pendentes |
| Figma/ERS | Consulta detalhada dos seis frames/Make e confronto com ERS | Links mapeados; sem nova consulta | Pendente |

Obter material institucional autorizado se a interface não for pública; não
solicitar credenciais, acessar conta ou criar cadastro real para esta tarefa.
Sem fonte, não inserir href fictício, botão sem destino ou data inventada.
Assets locais autorizados, sem dados pessoais; texto deve bastar sem imagem.
Um GIF ilustrativo não é captura autenticada. Conferir permissões e estados
com a equipe antes de publicar instruções operacionais definitivas.

## URL, âncoras e continuidade

Uma rota /tutorial-paraiba-digital e `?etapa=1..6`. Ausência, duplicação ou
valor inválido normalizam para 1 por replaceState, preservando parâmetros
desconhecidos conforme o contrato compartilhado. Trocas explícitas usam
histórico; recarga/voltar/avançar restauram etapa. Não ler apenas pathname,
implementar parser paralelo ou incluir valores da Carta na URL.

Links de campo são derivados dos alvos efetivamente apresentados pela 012,
prefixo `tutorial-carta-`, repetidos por ID estável/propriedade, nunca índice.
Ativo missing pode ter heading/alvo; inativo não. Falha da região retira
links específicos e conserva um único `tutorial-dados` focável no fallback.
Hash de campo da etapa 4 não força a 012 a montar nas outras etapas: nesses
estados, usar título da etapa como fallback; na etapa 4 usar tutorial-dados.
Não oferecer links para destinos ausentes.

Editar usa registro autorizado da 007: abrir parte e focar campo após montar;
item removido vai ao grupo, inativo à condição. Voltar por histórico restaura
etapa 4 e valores atuais; qualquer CTA explícito de retorno usa essa URL,
sem introduzir parâmetros não previstos no contrato compartilhado.
011 e shell coordenam foco: alvo válido de fragmento precede foco genérico
da etapa; atualização de dados/promises não rouba foco.

Sair da etapa desmonta UI/timers/feedback da 012; coordenador de operações
pendentes acima das rotas mantém trava até resolução. Retornar não herda
sucesso nem dispara nova escrita; respostas tardias são descartadas pela 012.
Não prometer cancelamento do clipboard. Falha da região não apaga instruções,
navegação ou Carta, nem é disfarçada de sessão vazia.

Concluir Guia não limpa Carta, não certifica conclusão nem comprova publicação
externa. Decisão documental T015 (22/10/2026): Concluir Guia retorna à home
`/` por navegação compartilhada. O conteúdo atual ainda define apenas kind finish;
sua integração futura deve aplicar esse destino, preservando a sessão.
Link externo confirmado exige gesto, aviso de nova aba e rel apropriado,
sem envio de Carta, requisição automática ou detecção de colagem.

## Matriz de testes integrados previstos

Todos pendentes de implementação e execução; não são resultados desta revisão.

| ID | Cenário | Verificação / critérios |
| --- | --- | --- |
| IT01 | Entradas e sessão vazia/parcial/recuperação inválida/storage bloqueado | Instruções livres; cinco grupos vazios/parciais na etapa 4 sem exemplos; CA01/05/06 |
| IT02 | Carta completa, prazo positivo, múltiplos documentos/etapas e detalhe de custo “0” | Todos os 25 campos aplicáveis, 13 tipos abertos/12 escolhas; cópia por item e sem gate editorial; CA06/08/10/18 |
| IT03 | K/S/ON/E, null/false, Ativo default, modalidades e sistemas | Exibir só aplicáveis; presencial exclusivo sem sistema; valores retidos intactos; CA09/17/18 |
| IT04 | Etapas 1–6 e query inválida/duplicada/ausente + parâmetros desconhecidos | Uma etapa, percentuais 17/33/50/67/83/100; 012 só na 4; normalização/histórico; CA01/02/13/19 |
| IT05 | Editar e voltar, reordenar/remover itens, recarregar sessão válida | Mesmo provider, valores atuais/ordem estável e alvos autorizados; CA07/17/19 |
| IT06 | Âncora ativa missing, inativa, removida, falha da região e hash fora da 4 | Sem link quebrado ou ID duplicado; fallback correto, foco coordenado; CA09/13/17/19 |
| IT07 | Copiar pendente, sair/voltar à 4, editar A/B/A e ocultar/reativar | Trava persiste, retorno tardio não anuncia sucesso, nenhum write automático; CA07/10 |
| IT08 | API ausente/recusa e imagem ausente | Alternativa manual/instruções preservadas; sucesso não anuncia cadastro; CA10/12 |
| IT09 | Fonte/destino/data ausentes, ações externas e GIF placeholder | Não aprovar tutorial operacional; revisão humana por evidência; CA03/04/08/11/12/15/20 |
| IT10 | Teclado/leitor, texto longo, HTML literal, 320–1440 px, zoom/reflow | Sem execução HTML, corte, foco roubado ou live region duplicada; CA13/14/16 |
| IT11 | Comparar conteúdo antes/depois da migração | Outras cinco etapas, IDs/export/CTAs preservados; exemplos não substituem valores; CA16/18/20 |

Reutilizar TR01–TR17 da 012 para operações; não duplicar motor em testes da 011.
Registrar versões de navegador/tecnologia assistiva, fixtures sintéticas,
resultado real e defeito/reteste. Mocks não comprovam clipboard ou fluxo externo.

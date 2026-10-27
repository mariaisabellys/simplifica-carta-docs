# Orientações da preparação e destinos na Carta v3

Contrato documental de 19/10/2026 — T006 de [docs/tasks.md](../../docs/tasks.md).
Fontes: conteúdo atual `src/content/pages/organizar-informacoes.ts`, conteúdo
da 007 e [matriz canônica v3](../007-formulario-carta-servico/matriz-campos-v3.md).
Este documento define ajustes editoriais futuros; nenhum TypeScript foi alterado.

## Inventário e correspondência

Manter três tópicos e 13 informações na ordem abaixo: sete em `about-service`,
duas em `requirements` e quatro em `service-flow`. Não confundir os três tópicos
da preparação com as cinco partes do formulário. Uma informação pode orientar
vários controles; seu número de marcações continua sendo um.

| Ordem | Tópico da 006 | ID da informação | Título | IDs de destino na 007 |
| --- | --- | --- | --- | --- |
| 1 | `about-service` | `service-name` | Nome do serviço | `service-name` |
| 2 | `about-service` | `popular-name` | Nome popular | `popular-name` |
| 3 | `about-service` | `service-description` | O que é o serviço | `service-description` |
| 4 | `about-service` | `audience` | Quem pode utilizar? | `specific-audience`, `user-profile`, `who-can-use` |
| 5 | `about-service` | `category` | Categoria do serviço | `category`, `subcategory`, `topic` |
| 6 | `about-service` | `keywords` | Palavras-chave | `keywords` |
| 7 | `about-service` | `additional-information` | Informações adicionais | `important-additional-information` |
| 8 | `requirements` | `documents` | Documentos necessários | `required-documents` (coleção; nomes por item) |
| 9 | `requirements` | `costs` | Custos | `costs-and-fees`, `cost-value-or-link` |
| 10 | `service-flow` | `steps` | Etapas do serviço | `step-title`, `citizen-guidance`, `modality` (por item de `service-steps`) |
| 11 | `service-flow` | `scheduling` | Agendamento | `requires-scheduling`, `scheduling-type`, `scheduling-system`, `scheduling-link`, `scheduling-display` |
| 12 | `service-flow` | `deadline` | Prazo | `maximum-deadline`, `deadline-type` |
| 13 | `service-flow` | `recurrence` | Recorrência | Sem controle ou path v3; preparação complementar externa |

Cobertura: 12 orientações alcançam 24 das 25 definições de campos da matriz.
`active` não possui orientação da 006: não reutilizar recorrência ou publicar
uma definição inventada. Ativo é o estado configurado opcional definido pela
007; sua ajuda específica pertence ao formulário.
`document-name` é o ID proposto pela T004 para o filho da coleção, não um ID já
existente no conteúdo. Na implementação, usar o mesmo texto de `documents`
associado ao item por ID estável; não buscar orientação por índice ou por título.

## Decisões de alinhamento e redação prevista

### Recorrência — manter complementar, sem ampliar o modelo

Ratificada a decisão já registrada em 06/10 na spec: manter o 13º item como
levantamento complementar, sem coletar tipo/quantidade na 006 nem acrescentar
campos à 007, CSV, prévia ou cópia da 012. Não retirar conteúdo ou reduzir o
denominador por inferência. Não transferir automaticamente para informações
adicionais. A decisão não comprova que a plataforma externa oferece controles
de recorrência; eventual cadastro depende de orientação institucional.

Na futura revisão do conteúdo, preservar definição, exemplo e distinção de
prazo, substituindo instruções como “marque a opção” por levantamento:

> Confirme se o serviço precisa ser realizado novamente após um período definido.
> Se precisar, reúna o intervalo e a unidade. Esta informação é complementar:
> não há campo de recorrência no formulário da Carta deste manual.

Exemplo de anotação externa: “A cada 6 meses”. A marcação da preparação significa
“verifiquei esta informação”, inclusive quando confirmado que não se aplica;
não significa “serviço recorrente”.

### Categoria e tópico

Manter classificação por assunto, não por órgão. Substituir a instrução de
selecionar tópico e seu exemplo por:

> Selecione a categoria e uma subcategoria disponível para ela. No campo Tópico,
> escreva o assunto mais específico, se houver. Tópico é um campo de texto,
> não uma lista de opções.

Exemplo: “Categoria: Educação e Pesquisa; Subcategoria: Ensino Superior;
Tópico: escreva o assunto específico, se houver.” Não criar catálogo de tópicos.

### Descrição e público

Acrescentar ao item `service-description` o limite de 20 palavras significativas
na descrição inteira, conforme [contrato de contagem](../../docs/arquitetura/contrato-contagem-palavras.md).
O exemplo atual tem 21 significativas e precisa ser substituído antes do reuso
no formulário. Texto previsto: “Solicite a segunda via do certificado do Ensino
Médio para comprovar sua escolaridade em empregos, cursos ou concursos.”
O exemplo proposto possui 18 tokens totais e 13 palavras significativas.

Ao reutilizar `audience`, mostrar complemento específico por controle:

- `specific-audience`: “Selecione até dois grupos de público específico.”
- `user-profile`: “Selecione um ou mais perfis de usuário; ao menos um é obrigatório.”
- `who-can-use`: explicar condições de acesso em texto, sem documentos neste campo.

Não interpretar “Informe todos os públicos atendidos” como seleção ilimitada
de grupos. Manter os limites do formulário sem impor novos obrigatórios.

### Prazo — não criar uma opção Imediato

O v3 separa valor textual (`maximum-deadline`) e unidade de catálogo
(`deadline-type`). Exemplo previsto: “Para até 5 dias úteis, informe 5 em Prazo
máximo e selecione Dias úteis em Tipo de prazo.” Não oferecer um campo único
“Prazo” nem uma opção de unidade “Imediato”.

Substituir a instrução “informe Imediato” pela ressalva:

> Confirme o prazo máximo e sua unidade. Se a entrega for imediata ou não houver
> estimativa, confirme com a equipe responsável como registrar o prazo; não
> invente um valor ou uma unidade.

Resolvida a promessa editorial de controle ausente. MC-03 foi fechada pela 007:
o v3 aceita apenas inteiro positivo canônico e unidade; zero, decimal, imediato
e ausência de estimativa são inválidos. Não converter para “0 minutos”, não
concatenar “Imediato” com unidade arbitrária e não declarar que o formulário
atende esses casos. Uma representação futura exige nova versão do modelo. Isso
não altera a contagem da 006.

### Agendamento e custos

Manter a orientação de sistema condicionada ao tipo on-line. Com Sim, selecionar
Online, Presencial ou ambos; o sistema é exigido apenas se a seleção contiver
Online. Presencial exclusivo não mostra sistema. Tipo de agendamento não é
modalidade da etapa: a etapa permite Online/Presencial/Híbrida.

Link e exibição só se aplicam quando Sim, tipo Online e Outro sistema ou site;
selecionar Não ou Presencial exclusivo oculta esses dados, mesmo se retidos na sessão. A orientação explica a
configuração para cadastro posterior, não promete executar agendamento ou
incorporar sites neste manual. Não criar campo de endereço presencial.

O caso presencial exclusivo está representado sem sistema. Com ambos, o sistema
descreve a parcela on-line. O alinhamento não homologa cobertura da plataforma
externa nem amplia seus enums.

Em custos, alinhar rótulos a Gratuito, Sob consulta e Com taxa (escolha única).
Relacionar “taxa fixa” a Com taxa sem restringir novos cenários por inferência.
Detalhe só quando Sob consulta/Com taxa. Informação desconhecida não é gratuito.

## Progresso independente

- Estado inicial real: conjunto vazio, “0 de 13 informadas”. `progressExample`
  (“2 de 13 informadas”) é exemplo editorial, jamais seed ou valor fixo da UI.
- Uma declaração booleana por ID de informação. Marcar adiciona ao conjunto,
  desmarcar remove. Contar IDs únicos e conhecidos: nunca somar controles da 007.
- O denominador é o número de informações do catálogo, atualmente 13, inclusive
  recorrência. Não reduzir automaticamente por custos, público ou agendamento.
- Marcar somente após reunir ou confirmar a não aplicação; não marcar por abrir,
  ler, expandir, trocar tópico, preencher a Carta ou concluir diagnóstico.
- Não há estado “não aplicável” separado nesta versão. O rótulo acessível da
  marcação deve explicar “Informação reunida ou não aplicação confirmada”.
- 13/13 é autodeclaração de preparação, não aprovação, validade, preenchimento
  automático ou completude da Carta. Nenhuma contagem bloqueia os destinos.
- Estado somente em memória, isolado dos dados da Carta, mantido durante a
  navegação interna da aplicação; recarga/nova aba reinicia em zero. Não adicionar
  storage persistente, API ou dados em URL nesta entrega. Retenção por sessão
  com storage exigirá decisão posterior explícita; não ler a chave da Carta.
- Estado de expansão é independente das marcações. Ocultar orientação no
  formulário não altera campos, progresso de preparação ou revisão da Carta.

## Aplicação futura e limites desta rodada

Este contrato prevalece sobre os trechos conflitantes do conteúdo atual apenas
como instrução de revisão futura. Não declarar o conteúdo TypeScript já alinhado:
aplicar as substituições em F006-03, antes de renderizar ou reutilizar as orientações.
Não manter cópias divergentes no JSX da 007; a fonte editorial executável continua
sendo `organizar-informacoes.ts`, com complementos por alvo versionados.

Pendências fora da conclusão documental: revisão institucional, aplicação de
MC-03/MC-05/MC-07 ao TypeScript, implementação de progresso/reuso, consulta
visual e verificação integrada.
O mapa local identifica `387:1918`; não houve consulta externa ao Figma nesta tarefa.

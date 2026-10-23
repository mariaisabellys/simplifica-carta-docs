# Spec — Formulário da Carta de Serviço

Baseline documental: 19/10/2026, T004. Modelo: v3. Implementação integrada e aceite visual/funcional pendentes.

## Objetivo e escopo

Permitir elaborar uma Carta em cinco partes, preservar dados parciais na sessão, consultar orientações e prévia e seguir ao tutorial. A jornada sugerida é diagnóstico → organização → formulário, com acesso independente a /formulario-carta. Não exigir login, diagnóstico aprovado ou conclusão da 006.

Fontes: [modelo central](modelo-central-carta.md), [matriz canônica](matriz-campos-v3.md), conteúdo em src/content/pages/formulario-carta.ts, catálogos e tipos em src/features/carta, [navegação compartilhada](../../docs/arquitetura/contrato-navegacao.md) e [mapa Figma](../../docs/design-system/mapa-figma-telas.md). O levantamento local não comprova consulta visual detalhada nem homologação institucional.

## RF01 — Acesso e navegação

Usar NavigationProvider, useAppLocation, useAppNavigate e AppLink compartilhados. Preservar href, query, hash, cliques modificados, histórico e recarga. Não criar roteador próprio. O shell administra título/foco de rota; o formulário administra partes, retorno a campos e listas. Dados permanecem na mesma fonte de sessão ao visitar ajuda, organização, prévia e tutorial.

## RF02 — Cinco partes

1. about-service: sete campos sobre o serviço.
2. audience-requirements: públicos, perfis, quem pode utilizar, documentos, custo e prazo.
3. service-flow: etapas com título, orientação e modalidade.
4. service-attendance: agendamento e condições.
5. final-information: adicionais e palavras-chave.

A matriz é o inventário canônico de 25 definições. Partes podem ser visitadas e editadas livremente. “Parte X de 5” indica posição, não completude. Não preencher a Carta com exemplos ou placeholders. Valores de seletores vêm dos catálogos existentes.

## RF03 — Modelo e regras estruturais

Usar exclusivamente CartaServico com versao: 3 e os grupos sobreServico, publicoRequisitos, etapas, atendimento e informacoesFinais. A lista atual contém dez obrigatórios gerais, conforme matriz. Até a revisão editorial MC-02, manter essa lista como baseline técnico, sem acrescentar obrigatórios por analogia.

- Descrição: até 20 palavras significativas no campo inteiro, conforme o [contrato compartilhado](../../docs/arquitetura/contrato-contagem-palavras.md), fechado documentalmente na T005; implementação pendente.
- Categoria/subcategoria: relação válida do catálogo. Ao mudar categoria, limpar subcategoria incompatível com aviso claro; não converter a escolha em outra arbitrariamente.
- Públicos específicos: até dois; perfis: ao menos um. Seleções de catálogo devem ser válidas e sem duplicatas.
- Custos: escolha única; detalhe obrigatório em sob-consulta/com-taxa. Ao escolher gratuito, ocultar detalhe e retirar obrigatoriedade; preservar o texto na sessão para restauração, sem transferência enquanto inativo.
- Prazo: máximo textual e unidade. Não inventar regra de número positivo, zero, decimal ou “Imediato”; MC-03 precisa ser fechada antes da validação semântica.
- Documento: nome e ID estável. Etapa: ID, ordem, título, orientação e modalidade. Mínimo de itens e obrigatoriedade por item permanecem MC-04.
- Ativo: booleano, default false; não interpretar como confirmação deliberada nem publicar/despublicar serviço externo. Significado editorial permanece MC-05.
- URL externa: presença exigida quando ativa; protocolo/formato ainda depende de MC-06. Não consultar disponibilidade remota nem executar integração.

Obrigatoriedade, tipo e pertinência ao catálogo são verificações diferentes. Dados malformados devem produzir retorno controlado, não exceção ou aprovação silenciosa. Não converter texto vazio em gratuidade, ausência de documentos ou ausência de agendamento.

## RF04 — Listas e identidade

Adicionar documento com nome vazio; adicionar etapa com título/orientação vazios e modalidade null. Gerar ID estável ao adicionar, nunca durante render. Os defaults dos novos itens são decisões técnicas deste contrato, não exemplos reais.

Editar/remover um item sem alterar outros. Etapas podem ser reordenadas por teclado; IDs permanecem e ordem passa a refletir a sequência atual de 1 a N. Não exigir drag-and-drop. Campos e erros acompanham ID, não índice.

Após adicionar, focar primeiro campo do novo item. Após remover, focar próximo item, anterior ou botão Adicionar se lista vazia. Após reordenar, manter foco no controle do mesmo item e anunciar posição. Remoção resulta de ação explícita; mudanças de parte ou condição não removem itens silenciosamente.

## RF05 — Orientações e validação

Orientações seguem o [mapa e contrato da T006](../006-organizar-informacoes/contrato-orientacoes-v3.md), com reuso por vários controles e complementos específicos. Aplicação editorial ao TypeScript permanece em F006-03; Ativo continua em MC-05. Abrir/fechar orientação não modifica dado ou progresso de preparação. Associar label, instrução e erro; usar fieldset/legend nos grupos.

Separar erros estruturais de sugestões editoriais da 008. Não reescrever texto automaticamente. Validar campos alterados no blur e todos os campos aplicáveis na revisão explícita; evitar erros prematuros ao abrir Carta vazia. Resumo ordenado pelo formulário permite abrir parte e focar controle/item correto.

Sugestões editoriais não usam aria-invalid e não bloqueiam prévia, navegação, cópia ou CSV. Erros estruturais podem bloquear CSV pela 010, mas não edição, persistência parcial ou consulta.

## RF06 — Sessão e recuperação

Um CartaSessionProvider acima das páginas mantém a única Carta editável e usa sessionStorage na chave simplifica-carta:sessao. Serializar o objeto v3 diretamente, conforme contrato existente, sem envelope paralelo. Não usar localStorage, backend, login ou sincronização entre abas.

Concluir leitura antes da primeira gravação. Estado válido parcial deve ser recuperado mesmo sem obrigatórios preenchidos. Validade de formato e completude são diferentes.

Sem registro: criar Carta vazia. Registro v3 seguro: recuperar. JSON inválido, estrutura inválida, versão anterior/futura sem decoder seguro: iniciar Carta vazia em memória, informar recuperação indisponível e preservar registro original. Não converter automaticamente o false de versão anterior em resposta Não.

Na recuperação inválida, suspender sobrescrita automática até ação explícita para usar a nova Carta nesta sessão. Permitir continuar editando apenas em memória. Falha de leitura/escrita mantém memória e aviso verdadeiro de limitação na recarga. Nunca anunciar salvamento quando a operação falhou. Limpeza exige ação explícita, sem apagar sessão ao concluir tutorial/exportação.

Não truncar conteúdo para atender limites técnicos inventados; limites de carga, se necessários, devem ser medidos e documentados antes da implementação.

## RF07 — Agendamento e aplicabilidade

S = exigeAgendamento === true. E = S e sistemaAgendamento === sistema-externo.

- null: não informado; false: Não explícito. Ambos ocultam configurações.
- S ativa tipos e sistema, obrigatórios; aceitar Online, Presencial ou ambos conforme catálogo.
- Sistema Paraíba Digital oculta link/exibição, mesmo com valores retidos.
- E ativa link e exibição, obrigatórios.
- Trocas preservam escolhas e textos na sessão; invalidam resultados dos campos que ficaram inativos.
- Ao retornar à condição, restaurar valores para revisão.
- Exibição dentro/fora da plataforma é apenas dado da Carta. Não abrir iframe, redirecionar ou agendar pela 007.

O conteúdo atual de external-scheduling verifica só sistema; implementação deve aplicar E completa. A T006 definiu substituir a orientação “apenas online” por “se houver agendamento”, preservando S/E; atualização de conteúdo/metadados pendente (MC-07).

## RF08 — Revisão e próximos passos

“Tudo pronto para publicar” só aparece após revisão explícita do snapshot atual sem erros estruturais, com análise estrutural concluída. Mudança na Carta invalida essa confirmação até nova revisão. Revisão editorial pendente não impede a confirmação de completude estrutural, mas suas mensagens continuam visíveis e separadas.

A expressão não significa aprovação institucional ou publicação. A copy deve explicar conclusão das informações obrigatórias e continuidade para revisão/publicação manual; a adaptação do conteúdo versionado será tarefa de implementação/conteúdo específica. Visitar cinco partes não basta.

Manter acesso ao tutorial e prévia mesmo com Carta parcial, usando CTA neutro fora do estado de conclusão. Falha do validador estrutural não libera conclusão nem exportação.

## RF09 — Consumidores e conteúdo

009 compartilha componente/view model da prévia entre formulário e /previa. 010 exporta snapshot atual com regras estruturais da mesma revisão. 011 orienta transferência. 012 mostra todos os campos aplicáveis em cinco grupos na etapa 4; campos abertos preenchidos têm cópia, escolhas não têm botão. Nenhum consumidor modifica texto, inventa valores ou transfere condicionais inativos.

Textos e catálogos são versionados, sem segunda fonte no JSX. A T006 manteve recorrência como preparação complementar, sem campo v3 ou transferência automática para informações adicionais.

## Requisitos transversais e visual

Preservar HTML como texto, acentos e quebras; não registrar conteúdo em logs. Reutilizar Inter/tokens/shell. Suportar teclado, leitor de tela, zoom e reflow com textos extensos. Anunciar revisão e ações de lista sem anúncio a cada tecla; não deslocar foco durante digitação.

| Referência | Uso |
| --- | --- |
| 653:1540 | Parte 1, principal |
| 2024:269 | Parte 2; reconstruir formulário representado em imagem com controles reais |
| 641:58 | Parte 3 |
| 647:650 | Parte 4 |
| 660:2533 | Parte 5 |
| 811:306 / 811:382 | Form-Card sem/com orientação |
| 821:308 | Prévia compartilhada 009 |
| 651:317 | Label-Row |

As cinco telas são estados da mesma rota. Consultar Design e Make antes do código visual. Conteúdo prevalece sobre copy do frame; não usar imagem, overlay ou mapa de cliques como formulário.

## Critérios de aceite

IDs existentes preservados; redação migrada para v3.

| ID | Cenário / resultado |
| --- | --- |
| CA01 | Acesso direto e pelas entradas previstas sem gates. |
| CA02 | Todos os 25 campos da matriz disponíveis, com catálogos e opcionais corretos. |
| CA03 | Trocar parte preserva Carta parcial sem exigir completude. |
| CA04 | CRUD de documentos preserva IDs e textos dos demais itens; não recria campos removidos do modelo. |
| CA05 | Reordenar/remover etapas por teclado mantém identidade, sequência e foco. |
| CA06 | Agendamento distingue null/Sim/Não, preservando dados inativos sem mostrá-los. |
| CA07 | Custo/documentos vazios não geram inferência de gratuidade/dispensa. |
| CA08 | Revisão encontra obrigatórios e condicionais; resumo abre parte e foca alvo. |
| CA09 | Orientação e sugestão não alteram valor nem impedem navegação. |
| CA10 | Visitar outras rotas e voltar mantém a mesma Carta em memória. |
| CA11 | Recarga de v3 válido restaura valores, IDs e ordem. |
| CA12 | Storage indisponível/inválido/anterior/futuro preserva original, mantém edição e mostra limite; sem sobrescrita inicial. |
| CA13 | Prévia, CSV e cópia usam snapshot atual e aplicabilidade comum. |
| CA14 | Labels, grupos, resumo e listas operáveis por teclado/leitor. |
| CA15 | Textos longos e zoom não cortam campos nem criam rolagem horizontal da página. |
| CA16 | HTML literal, acentos e quebras preservados sem execução. |
| CA17 | Conteúdo versionado, sessão temporária e ausência de publicação automática verificáveis. |
| CA18 | Consultas Figma e diferenças documentadas; shell/tokens reutilizados. |
| CA19 | Não/null oculta configurações e retira obrigatoriedade condicional. |
| CA20 | Sistema nativo oculta link/exibição e mantém valores retidos fora dos consumidores. |
| CA21 | Externo/dentro registra configuração, sem executar incorporação. |
| CA22 | Externo/nova página registra configuração, sem redirecionamento da 007. |
| CA23 | Trocar/restaurar sistema preserva valores e remove resultados inativos. |
| CA24 | S sem tipos/sistema ou E sem link/exibição gera erros correspondentes; formato URL conforme decisão MC-06. |
| CA25 | Cinco partes usam referências corretas e layout adaptado ao conteúdo. |
| CA26 | Orientação alterna variantes e anuncia expansão, sem mudar valor. |
| CA27 | Prévia embutida reutiliza componente/projeção da 009. |
| CA28 | Parte 2 é formulário real acessível, não imagem interativa. |
| CA29 | Categoria inválida/subcategoria incompatível e escolhas inválidas não passam silenciosamente; trocar categoria limpa escolha incompatível com aviso. |
| CA30 | Máximo dois públicos e mínimo um perfil; duplicatas não satisfazem cardinalidade. |
| CA31 | Detalhe de custo só é exigido/transferido com K; prazo mantém valor/unidade separados. |
| CA32 | Descrição com 20/21 palavras significativas segue limite do campo e fixtures CP01–CP13 do contrato compartilhado; a revisão por frase da 008 não bloqueia CSV. |
| CA33 | Conclusão exige revisão estrutural atual bem-sucedida; editar invalida confirmação; tutorial continua acessível em Carta parcial. |

## Dependências, pendências e fora de escopo

T005 fechou o contrato de contagem, ainda não implementado; T006 orientações; T007 regras editoriais; T008–T011 projeções; T015 navegação; T016 visual/acessibilidade. MC-02–MC-06 e MC-08 da matriz ainda exigem decisões/contratos antes das partes dependentes. Não declarar o plano integralmente pronto por encerrar T004/T005.

Fora do escopo: backend da Carta, rascunho permanente, integração/publicação externa, agenda real, IA/reescrita automática e novos campos sem decisão.

Histórico preservado em [spec anterior](historico/2026-10-19-pre-t004-spec.md). O histórico não orienta o código atual.

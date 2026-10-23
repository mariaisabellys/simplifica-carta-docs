# Matriz canônica de campos da Carta — v3

Registro documental: 19/10/2026, T003 de [docs/tasks.md](../../docs/tasks.md).
Base: HEAD `7948d35` e alterações locais documentais existentes. Responsável
pelo levantamento: Codex. Decisões de produto pendentes pertencem ao usuário;
esta matriz não declara homologação institucional nem implementação nova.

## Fontes e leitura

Conferidos integralmente `src/content/pages/formulario-carta.ts`,
`src/features/carta/carta.types.ts`, `carta.catalogs.ts`, `carta.schema.ts`,
`carta.validation.ts` e `carta.csv.ts`. Conferidos IDs e orientações relevantes
de `src/content/pages/organizar-informacoes.ts`, regra LS01 da 008 e o
[modelo central](modelo-central-carta.md).

São **25 definições de campos de usuário** nas cinco partes, incluindo os
campos repetíveis de documentos e etapas. Há dez paths na lista atual de
obrigatórios gerais. Cinco campos adicionais possuem obrigatoriedade
condicional: detalhe de custo, tipos/sistema de agendamento e link/exibição.
A presença no schema é evidência de contrato técnico atual; decisões de
obrigatoriedade ainda sem justificativa editorial estão identificadas abaixo.

Legenda: **G** = obrigatório geral no schema atual; **C** = obrigatório quando
ativo; **O** = sem obrigatoriedade no validador atual; **I** = regra por item
ainda precisa de definição. O não significa conteúdo dispensável em todo
serviço, e I não autoriza inventar um mínimo de documentos/etapas.

Condições: **A** = sempre aplicável; **K** = custo `sob-consulta` ou `com-taxa`;
**S** = `exigeAgendamento === true`; **E** = S e sistema `sistema-externo`.
Textos começam em `""`, seleções unitárias em `null`, listas em `[]`; exceção:
`ativo` começa em `false`. Coleções não têm item inicial no schema. A T004
definiu novos documentos com nome vazio e etapas com título/orientação vazios,
modalidade null, ID estável e ordem seguinte; implementação ainda pendente.

## Campos, tipos, ativação e destinos editoriais

Paths com `[]` representam cada item identificado por ID estável. Os IDs
editoriais são os existentes no conteúdo; nomes propostos estão sinalizados.

| Nº | Parte / ID editorial | Path v3 | Controle e tipo | Default | Regra / ativação | Orientação 006 |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | Sobre / `service-name` | `sobreServico.nome` | text / string | vazio | G / A | `service-name` |
| 02 | Sobre / `popular-name` | `sobreServico.nomePopular` | text / string | vazio | O / A | `popular-name` |
| 03 | Sobre / `service-description` | `sobreServico.descricao` | text / string | vazio | G / A; até 20 significativas no campo | `service-description` |
| 04 | Sobre / `category` | `sobreServico.categoria` | select / CategoriaServico ou null | null | G / A | `category` |
| 05 | Sobre / `subcategory` | `sobreServico.subcategoria` | select / SubcategoriaServico ou null | null | G / A; opções dependem de categoria | `category` |
| 06 | Sobre / `topic` | `sobreServico.topico` | text / string | vazio | O / A | `category`; correção editorial definida na T006, aplicação ao conteúdo pendente |
| 07 | Sobre / `active` | `sobreServico.ativo` | checkbox / boolean | false | O / A | Sem orientação específica |
| 08 | Público / `specific-audience` | `publicoRequisitos.publicosEspecificos` | checkbox-group / PublicoEspecifico[] | [] | O / A; máximo 2 | `audience`, cobertura genérica |
| 09 | Público / `user-profile` | `publicoRequisitos.perfisUsuario` | multi-select / PerfilUsuario[] | [] | G / A; mínimo 1 | `audience`, cobertura genérica |
| 10 | Público / `who-can-use` | `publicoRequisitos.quemPodeUtilizar` | text / string | vazio | G / A | `audience` |
| 11 | Público / `required-documents` (coleção); filho `document-name` proposto | `publicoRequisitos.documentos[].nome` | texto por item CRUD / string | coleção [] | I / item existente | `documents` |
| 12 | Público / `costs-and-fees` | `publicoRequisitos.custo.tipo` | radio-group / TipoCusto ou null | null | G / A | `costs` |
| 13 | Público / `cost-value-or-link` | `publicoRequisitos.custo.detalhe` | campo aberto, kind não explicitado / string | vazio | C / K | `costs` |
| 14 | Público / `maximum-deadline` | `publicoRequisitos.prazo.maximo` | text / string | vazio | G / A | `deadline` |
| 15 | Público / `deadline-type` | `publicoRequisitos.prazo.tipo` | select / TipoPrazo ou null | null | G / A | `deadline` |
| 16 | Fluxo / `step-title` | `etapas[].titulo` | text / string | coleção [] | I / item existente | `steps` |
| 17 | Fluxo / `citizen-guidance` | `etapas[].orientacaoCidadao` | text / string | coleção [] | I / item existente | `steps` |
| 18 | Fluxo / `modality` | `etapas[].modalidade` | select / ModalidadeEtapa ou null | coleção [] | I / item existente | `steps` |
| 19 | Atendimento / `requires-scheduling` | `atendimento.exigeAgendamento` | select / boolean ou null | null | G / A | `scheduling` |
| 20 | Atendimento / `scheduling-type` | `atendimento.tiposAgendamento` | checkbox-group / TipoAgendamento[] | [] | C / S; mínimo 1 | `scheduling` |
| 21 | Atendimento / `scheduling-system` | `atendimento.sistemaAgendamento` | radio-group / SistemaAgendamento ou null | null | C / S | `scheduling`; orientação para todo Sim definida na T006, aplicação pendente |
| 22 | Atendimento / `scheduling-link` | `atendimento.linkAgendamento` | text / string | vazio | C / E | `scheduling` |
| 23 | Atendimento / `scheduling-display` | `atendimento.exibicaoAgendamento` | radio-group / ExibicaoAgendamento ou null | null | C / E | `scheduling` |
| 24 | Finais / `important-additional-information` | `informacoesFinais.informacoesAdicionais` | textarea / string | vazio | O / A | `additional-information` |
| 25 | Finais / `keywords` | `informacoesFinais.palavrasChave` | text / string | vazio | O / A | `keywords` |

Partes canônicas: Sobre = `about-service`; Público = `audience-requirements`;
Fluxo = `service-flow`; Atendimento = `service-attendance`; Finais =
`final-information`. `deadline`, `service-steps` e `external-scheduling` são
agrupadores editoriais, não valores adicionais da Carta.

## Opções e limites

| Campo | Fonte/opções atuais | Regra e limite conhecido |
| --- | --- | --- |
| Categoria | `categoriasServico`, 16 valores em `carta.catalogs.ts` | Catálogo fechado; não duplicar lista em consumidores. |
| Subcategoria | `subcategoriasPorCategoria[categoria]` | Pertencer à categoria selecionada; troca invalida seleção incompatível. |
| Público específico | Servidor, Cidadão, Empresa | Zero a dois; deduplicação e validação runtime devem ser especificadas. |
| Perfil | `perfisUsuario`, 17 valores | Ao menos um; seleção múltipla; não há máximo adicional aprovado. |
| Custo | `gratuito` → Gratuito; `sob-consulta` → Sob consulta; `com-taxa` → Com taxa | Escolha única; detalhe obrigatório apenas K. |
| Prazo | `tiposPrazo`: Ano(s), Mês(es), Semana(s), Dias úteis, Dias corridos, Hora(s), Minutos | Máximo é string; nenhum limite numérico aprovado. |
| Modalidade de etapa | Online, Presencial, Híbrida | Valor de catálogo ou null; obrigatoriedade por item pendente. |
| Necessita de agendamento | true → Sim; false → Não; null → não informado | Resposta explícita requerida; false é válido. |
| Tipo de agendamento | `online` → Online; `presencial` → Presencial | Uma ou ambas com S; ordem de projeção deve ser estável. |
| Sistema | `paraiba-digital` → Paraíba Digital; `sistema-externo` → Outro sistema ou site | Obrigatório com S, inclusive presencial no contrato atual. |
| Exibição | `dentro-paraiba-digital` → Dentro do Paraíba Digital; `nova-pagina` → Em uma nova página | Obrigatório com E; configuração não executa integração. |
| Descrição | Conteúdo informa 20 palavras significativas | Código atual conta todas; contrato corrigido na T005, adaptação pendente (MC-01). |
| Outros campos abertos | Texto livre | Não há tamanho máximo aprovado nesta matriz; não inventar limite. |

## Ausência, inatividade e campos técnicos

- Texto apenas com espaços é ausência para preenchimento; projeções não
  substituem valores por exemplos. Não alterar o original para analisar.
- `null` é não informado; lista vazia não confirma dispensa de documentos.
- `ativo=false` é default técnico e não comprova escolha deliberada. Mostrar
  estado não equivale a afirmar que o usuário o confirmou; semântica em MC-05.
- Condicionais inativos não são obrigatórios nem apresentados/copiados como
  dados ativos. Valores de agendamento podem ser retidos; política de retenção
  do detalhe de custo foi definida na T004: preservar na sessão, ocultar e não
  transferir enquanto gratuito ou sem tipo ativo.
- O agrupador externo no conteúdo verifica somente sistema externo. A condição
  canônica E exige também S, mesmo com valor externo retido após selecionar Não.
- A 012 mantém identificação de campos aplicáveis vazios, sem cópia habilitada;
  seleções exibem rótulos, não valores internos. A 009 detalhará vazios na T008.
- `versao: 3`, `documentos[].id`, `etapas[].id` e `etapas[].ordem` são dados
  técnicos. IDs e versão não aparecem como campos ao cidadão. Ordem pode gerar
  numeração visual/CSV, mas não botão separado na 012.
- Chave de alvo proposta: path do campo simples; em coleções, coleção + ID
  estável + propriedade. T004 define IDs DOM/retorno de foco; o índice não
  identifica permanentemente um item. O `document-name` acima ainda não existe
  no conteúdo e não pode ser tratado como controle já implementado.

## Mapeamento aos consumidores

Todas as 25 definições são destinos de leitura da 009 e da 012 quando
aplicáveis. A T008 definiu o [contrato de projeção v3 da 009](../009-previa-html/contrato-projecao-v3.md),
compartilhado com a prévia da 007: campos aplicáveis vazios identificados,
itens parciais preservados e Ativo com ressalva de default, sem resolver MC-05.
Na 012, o [contrato de transferência v3](../012-copia-dados-tutorial/contrato-transferencia-v3.md)
consolidado na T010 define cinco grupos, cópia por campo/item e **13
definições de texto aberto** permitem cópia quando preenchidas; as outras 12
mostram escolhas sem botão. As quantidades de instâncias variam com coleções.

008: os perfis abaixo foram fechados documentalmente na T007 pelo
[contrato editorial](../008-validacao-linguagem-simples/contrato-validacao-editorial.md).
**P** = texto em prosa, LS01–LS06 conforme campo/layout;
**N** = nome/texto curto, LS03 e orientação específica;
**L** = palavras-chave, LS03 sem regras de prosa;
**X** = escolhas/URL/valor estruturado sem análise editorial automática;
**M** = conteúdo misto, exige identificar valor, URL ou prosa antes de analisar.
O contrato editorial detalha N/L como LS03, P como LS01–LS06, X sem análise
editorial e M com classificação explícita/inconclusivo. Implementação e aprovação
institucional do catálogo/copy permanecem pendentes. Validação estrutural
se aplica independentemente do perfil editorial.

| Nº | 008: perfil | 010: linha atual do helper (revisar em T009) | 012: botão |
| --- | --- | --- | --- |
| 01 | N | `nome` | Sim |
| 02 | N | `nome_popular` | Sim |
| 03 | P | `descricao` | Sim |
| 04 | X | `categoria` | Não |
| 05 | X | `subcategoria` | Não |
| 06 | N | `topico` | Sim |
| 07 | X | `ativo` | Não |
| 08 | X | `publicos_especificos` | Não |
| 09 | X | `perfis_usuario` | Não |
| 10 | P | `quem_pode_utilizar` | Sim |
| 11 | N | `documentos` (nomes agregados) | Sim, por item |
| 12 | X | `custo` | Não |
| 13 | M | `detalhe_custo` | Sim, se K |
| 14 | X | `prazo` (máximo + unidade) | Sim, só valor aberto |
| 15 | X | `prazo` (mesma linha) | Não |
| 16 | N | `etapas` (agregado) | Sim, por item |
| 17 | P | `etapas` (mesma linha) | Sim, por item |
| 18 | X | `etapas` (mesma linha) | Não |
| 19 | X | `exige_agendamento` | Não |
| 20 | X | `tipos_agendamento` | Não |
| 21 | X | `sistema_agendamento` | Não |
| 22 | X | `link_agendamento` | Sim, se E |
| 23 | X | `exibicao_agendamento` | Não |
| 24 | P | `informacoes_adicionais` | Sim |
| 25 | L | `palavras_chave` | Sim |

O CSV atual agrega 25 definições em 22 linhas. A T009 consolidou o
[contrato de exportação v3](../010-exportacao-csv/contrato-exportacao-v3.md):
mesmas chaves/ordem, rótulos legíveis, agregações e filtros explícitos, com
diferenças de implementação e política de fórmulas ainda candidata. Isso não
homologa compatibilidade de planilhas. A 012 não herda agregação do CSV: prazo/unidade e textos/seleção
da etapa continuam separados para respeitar a decisão de cópia por controle.

## Regras observadas e lacunas de validação

O helper atual verifica preenchimento dos dez paths, máximo de dois públicos,
categoria/subcategoria, descrição acima de 20 tokens e presença de cinco
condicionais. Ele não comprova validação completa de dados arbitrários:

- presença de string/boolean/lista não garante tipo adequado ao campo;
- catálogos e duplicatas não são verificados de modo uniforme;
- categoria inválida em runtime pode acessar catálogo inexistente;
- listas de documentos/etapas não possuem validação por item;
- prazo máximo e URLs só têm presença, sem semântica definida;
- sistema/exibição verificam null, mas isso não valida qualquer valor externo.

Esses achados são requisitos de especificação defensiva para T004/T007,
não alterações de implementação autorizadas pela T003.

## Decisões e reconciliações pendentes

| ID | Questão | Estado / tarefa de destino |
| --- | --- | --- |
| MC-01 | Contagem significativa versus helper de tokens totais | Resolvida documentalmente na T005: [contrato único e fixtures CP01–CP13](../../docs/arquitetura/contrato-contagem-palavras.md). Adaptação do helper e testes funcionais pendentes. |
| MC-02 | Obrigatoriedade editorial dos dez paths gerais | Inventário confirmado; justificar especialmente categoria, subcategoria, prazo e resposta de agendamento na T004 sem elevar campos opcionais por analogia. |
| MC-03 | Prazo numérico, zero, decimal, imediato e ausência de estimativa | Decisão semântica do produto ainda pendente. T006 retirou a promessa documental de opção Imediato e definiu ressalva editorial; não converter em zero/unidade fictícia. |
| MC-04 | Documentos/etapas: mínimo de itens, texto vazio, modalidade e limites | Nenhum mínimo ou obrigatoriedade por item confirmado; fechar em T004. |
| MC-05 | Significado de Ativo, default false e confirmação do usuário | Definir ajuda e significado nas projeções em T004/T008/T010. |
| MC-06 | Formato de URL externa e detalhe de custo | Protocolos, valor/link e mensagens precisam de contrato em T004/T007; não testar disponibilidade externa por inferência. |
| MC-07 | Agendamento presencial e sistema; condição E incompleta no conteúdo | S/E e orientação conciliadas documentalmente na T006; atualizar conteúdo/metadados na implementação. Caso presencial sem sistema representável requer decisão de produto, não escolha fictícia. |
| MC-08 | Catálogos, tipos inválidos e duplicatas | Definir validação defensiva em T004/T007; tipos TypeScript não validam dados recuperados. |
| MC-09 | Orientação ausente ou genérica, tópico como seleção e recorrência | Resolvida documentalmente na T006 pelo [contrato de orientações](../006-organizar-informacoes/contrato-orientacoes-v3.md): 12 orientações → 24 campos; recorrência complementar, Ativo separado em MC-05. Aplicação editorial em F006-03 pendente. |
| MC-10 | Identidade do controle de documento e alvo DOM/foco | Contrato técnico definido na T004: filho `document-name`, alvos por ID e fallback de foco no grupo; conteúdo/implementação futuros. |
| MC-11 | Retenção de custo inativo e subcategoria incompatível | Contrato técnico definido na T004: reter detalhe de custo oculto; limpar subcategoria incompatível com aviso ao trocar categoria. Implementação futura. |
| MC-12 | Regras editoriais específicas por campo | Resolvida documentalmente na T007: matriz de 25 campos, mensagens, heurísticas/checklists e estados no contrato editorial da 008. Catálogo/copy aguardam aprovação; implementação/testes pendentes. |

## Verificação documental da matriz

Cobertura: 7 campos em Sobre, 8 em Público, 3 por definição de etapa, 5 em
Atendimento e 2 em Finais = 25. Conferidos dez paths gerais e cinco condicionais.
As 13 definições abertas da 012 incluem nomes de documentos e dois textos por
etapa, além de URL e prazo máximo. Campos técnicos foram separados.

Todos os 13 IDs da 006 têm destino ou classificação: 12 orientam campos desta
matriz; `recurrence` permanece complementar sem path v3, decisão mantida na T006.
Nenhum campo do v3 ficou sem destino 009/010/012. Nenhuma regra candidata da
008 foi apresentada como implementação concluída.

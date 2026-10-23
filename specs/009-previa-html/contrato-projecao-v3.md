# Contrato da projeção da Carta v3

19/10/2026 — T008 de [docs/tasks.md](../../docs/tasks.md). Fonte de campos:
[matriz canônica](../007-formulario-carta-servico/matriz-campos-v3.md).
Contrato documental para implementação futura, não seletor já entregue.

## Uma projeção, dois contextos

Um seletor puro `criarPreviaDaCarta` e um componente de leitura `CartaPreview`
devem atender tanto `/previa` quanto a prévia embutida nas cinco partes da 007.
O contexto muda contêiner, nível de títulos, prefixo de IDs e ações externas;
não muda campos, valores, condições ou mensagens de ausência. A prévia embutida
mostra a Carta toda, não só os campos da parte aberta.

Referência local do componente: node `821:308` (card-servico-completo), conforme
mapa Figma. O node não comprova composição completa da rota nem todos os estados.
Consultar referências antes do layout; adaptar dimensões ao conteúdo integral.
Não omitir campos para reproduzir o tamanho do frame. Nenhuma consulta externa
ao Figma ocorreu nesta tarefa documental.

O seletor recebe exclusivamente Carta v3 de formato seguro, entregue pelo
provider da 007, incluindo Cartas parciais. Não decodifica storage, migra versões,
repara tipos/ordem nem muta a fonte. Validação de formato não equivale à completude.
Componente recebe view model readonly e copy; não importa storage, download,
validador editorial ou estado de edição. Página/formulário coordenam os contextos.

## Matriz de cobertura — 25 definições

Partes e ordem são as cinco da 007. **A** = sempre aplicável; **K** = custo
sob-consulta/com-taxa; **S** = exigeAgendamento true; **E** = S e sistema-externo.
Campos aplicáveis vazios, inclusive opcionais, permanecem identificados em Carta
com dados; não omitir nome popular/adicionais como no contrato anterior.

| Nº | Parte / ID editorial | Path v3 | Condição | Apresentação |
| --- | --- | --- | --- | --- |
| 01 | Sobre / `service-name` | `sobreServico.nome` | A | Nome do serviço; texto integral ou ausência. |
| 02 | Sobre / `popular-name` | `sobreServico.nomePopular` | A | Nome popular; texto ou ausência, sem inferir que não existe. |
| 03 | Sobre / `service-description` | `sobreServico.descricao` | A | O que é o serviço; texto integral, mesmo acima do limite. |
| 04 | Sobre / `category` | `sobreServico.categoria` | A | Categoria selecionada ou ausência. |
| 05 | Sobre / `subcategory` | `sobreServico.subcategoria` | A | Subcategoria selecionada ou ausência; não escolher automaticamente. |
| 06 | Sobre / `topic` | `sobreServico.topico` | A | Tópico textual, não catálogo inferido. |
| 07 | Sobre / `active` | `sobreServico.ativo` | A | Ativo: Sim/Não; ressalva de default abaixo. |
| 08 | Público / `specific-audience` | `publicoRequisitos.publicosEspecificos` | A | Lista de grupos selecionados ou ausência. |
| 09 | Público / `user-profile` | `publicoRequisitos.perfisUsuario` | A | Lista de perfis selecionados ou ausência. |
| 10 | Público / `who-can-use` | `publicoRequisitos.quemPodeUtilizar` | A | Quem pode utilizar; texto integral ou ausência. |
| 11 | Público / `required-documents` | `publicoRequisitos.documentos[].nome` | A | Nomes por item; sem classificação obrigatória/opcional inexistente no v3. |
| 12 | Público / `costs-and-fees` | `publicoRequisitos.custo.tipo` | A | Gratuito, Sob consulta ou Com taxa; null é ausência. |
| 13 | Público / `cost-value-or-link` | `publicoRequisitos.custo.detalhe` | K | Valor/link informado como texto, sem gerar moeda ou link ativo. |
| 14 | Público / `maximum-deadline` | `publicoRequisitos.prazo.maximo` | A | Prazo máximo textual preservado, inclusive “0”; não interpretar Imediato. |
| 15 | Público / `deadline-type` | `publicoRequisitos.prazo.tipo` | A | Tipo de prazo; unidade escolhida ou ausência. |
| 16 | Fluxo / `step-title` | `etapas[].titulo` | A | Título integral por etapa. |
| 17 | Fluxo / `citizen-guidance` | `etapas[].orientacaoCidadao` | A | Orientação ao cidadão integral por etapa. |
| 18 | Fluxo / `modality` | `etapas[].modalidade` | A | Online, Presencial, Híbrida ou ausência por etapa. |
| 19 | Atendimento / `requires-scheduling` | `atendimento.exigeAgendamento` | A | Sim, Não ou Não informado; false é resposta, null é ausência. |
| 20 | Atendimento / `scheduling-type` | `atendimento.tiposAgendamento` | S | Online, Presencial ou ambas as escolhas como lista. |
| 21 | Atendimento / `scheduling-system` | `atendimento.sistemaAgendamento` | S | Paraíba Digital ou Outro sistema ou site. |
| 22 | Atendimento / `scheduling-link` | `atendimento.linkAgendamento` | E | Link textual integral, sem navegação/iframe. |
| 23 | Atendimento / `scheduling-display` | `atendimento.exibicaoAgendamento` | E | Dentro do Paraíba Digital ou Em uma nova página. |
| 24 | Finais / `important-additional-information` | `informacoesFinais.informacoesAdicionais` | A | Informações adicionais importantes; texto ou ausência. |
| 25 | Finais / `keywords` | `informacoesFinais.palavrasChave` | A | Palavras-chave originais, sem separar/reescrever/inferir termos. |

Rótulos de escolhas vêm dos catálogos/conteúdo da 007. Multisseleções preservam
a ordem da coleção recebida; não ordenar/deduplicar a fonte. Se os catálogos
mudarem, revalidar a projeção. Categoria/subcategoria incompatíveis de formato
seguro continuam visíveis com pendência estrutural, nunca corrigidas no render.
Valores fora do contrato runtime pertencem à recuperação/validação defensiva
da 007, não devem vazar como enums técnicos ou causar exceção na apresentação.

## Vazio, defaults, listas e condicionais

- Texto só com espaços é ausência para apresentação; não substituir o original.
  Texto presente conserva espaços, acentos, pontuação e quebras, inclusive CR/LF.
  A renderização do navegador pode normalizar a aparência das quebras, mas a
  projeção e a fonte conservam a string original.
- Mensagem “Não informado” pertence à UI, nunca ao modelo nem ao CSV/cópia.
  Lista vazia usa “Nenhum item informado”; não afirma dispensa de documentos.
- Mostrar todos os itens existentes quando houver Carta com dados, inclusive
  itens inteiramente vazios, com atributos ausentes identificados. Não filtrar
  etapas intermediárias: usar ordem atual da 007 (1 a N) e ID estável. Após
  reordenação/remoção, refletir a sequência renumerada pelo formulário; não
  renumerar nem ordenar in-place no seletor. Documentos seguem sua ordem recebida.
- Uma etapa só com modalidade é dado parcial legítimo para leitura: mostrar
  modalidade e ausências de título/orientação. Nome vazio de documento não
  implica documento inválido por esta feature; regras por item ainda são MC-04.
- Dados K/S/E inativos são omitidos da projeção, sem “Não informado” e sem
  revelar conteúdo retido. Nunca apagá-los da sessão. Reativar recalcula valores
  atuais. Ocultar a parte do formulário não torna seus campos inativos.
- Não concatenar máximo/unidade ou custo/detalhe como única string: manter
  rótulos separados para ausências parciais. Zero informado não equivale a
  Gratuito; só a seleção explícita gratuito recebe esse rótulo.
- Ativo false tem default técnico indistinguível de desmarcação deliberada no
  v3. Mostrar “Não” com nota separada: “Este valor pode ser o estado inicial;
  a confirmação dessa escolha não é registrada.” True mostra “Sim”. Não rotular
  como publicado, aprovado, desativado na plataforma ou escolha confirmada.
  Essa projeção conservadora não resolve a semântica de negócio MC-05.

`hasContent`: existe texto não vazio em campo aplicável, seleção unitária não
null, multisseleção não vazia, nome de documento, qualquer título/orientação/
modalidade de etapa, resposta explícita de agendamento (true **ou false**),
ou ativo true. Não contam IDs, versão, ordem, ativo false isolado, campos
condicionais inativos, listas com itens totalmente vazios ou meros espaços.

Sem conteúdo: mensagem de vazio + Preencher Carta, tutorial e ajuda livres;
não criar card fictício. Se há itens vazios de edição, informar separadamente
que há itens sem informação e oferecer retorno ao grupo. Com conteúdo: renderizar
as cinco partes com todos os campos aplicáveis, mesmo se faltarem obrigatórios.
Não usar contagem de erros para determinar vazio nem completude.

## Estado, validação e ações

Provider v3 acima das rotas é a única fonte, atualizada também com prévia montada.
Sem registro/inválido segue recuperação da 007: nova Carta em memória, aviso e
registro original preservado quando inválido; nunca migrar durante projeção.
Falha de storage não elimina dados seguros em memória. Provider ausente é falha
de integração, não Carta vazia silenciosa. Se houver carregamento, distingui-lo
de vazio; não exibir dados antigos de outra revisão.

Validação estrutural pertence à 007; o helper atual retorna array de erros e
ainda não entrega todo o contrato defensivo. A integração futura deve distinguir
resultado disponível, pendências e falha; não presumir objeto `status` no helper
existente nem interpretar exceção como lista vazia. Mensagens de erro ficam fora
dos valores da Carta. Ausência de erro não certifica conteúdo ou publicação.

008 é editorial, com estados inconclusivo/falha/pending; não determina
obrigatoriedade nem bloqueia a prévia, tutorial, cópia ou edição. Não rodar outro
motor editorial na 009. Se exibir status compartilhado, vinculá-lo à revisão
atual e usar copy da 008, sem anunciar aprovação com análise indisponível.

Editar leva a `/formulario-carta`; tutorial a `/tutorial-paraiba-digital` e ajuda
a `/ajuda`. CSV só integra ação real da 010: ela captura e valida estruturalmente
o mesmo snapshot no clique; falha estrutural impede CSV, não a leitura. Sem 010
entregue, não apresentar botão que simula exportação. Sem download HTML/PDF ou
cópia por campo nesta feature; a cópia pertence à 012.

## Retorno e renderização

Links usam contrato compartilhado de navegação e registro de alvos da 007:
simples `carta-<fieldId>`, documento `carta-document-<id>-name`, etapa
`carta-step-<id>-<propriedade>`. Codificar fragmentos e resolvê-los somente pelo
registro autorizado, nunca querySelector com hash arbitrário. Para correção,
abrir a parte e focar após montagem; alvo removido retorna ao grupo, inativo
à condição correspondente, sem reativar dado. Não colocar valores da Carta na URL.
No contexto embutido, acionar o mesmo resolvedor local sem criar segunda fonte.

Unificar foco com shell, evitando dupla transferência de foco na navegação.
Atualizações da fonte não movem foco, não anunciam a Carta inteira e não
transformam o card em live region. Ações explícitas/resumo têm anúncio discreto.
Cada instância recebe prefixo DOM único; usar níveis de títulos adequados ao
contexto (sem h1/main duplicados), labels/valores e listas semânticas.

Exibir entradas somente como nós de texto: sem HTML/Markdown interpretado,
dangerouslySetInnerHTML, iframe, linkificação, imagem ou recursos derivados do
texto. Preservar texto integral com altura natural, pre-wrap e quebra de endereços.
Sem ellipsis, resumo automático ou omissão de dados por largura. Ação de editar
é da interface, não um link derivado da URL digitada pelo usuário.

## Fixtures futuras

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| PV01 | Schema inicial, ativo false, IDs/ordens e itens vazios | Vazio; aviso de itens se existentes; sem Carta fictícia. |
| PV02 | Apenas categoria, perfil, modalidade ou ativo true | Card parcial com seleção e ausências; nenhuma seleção perdida. |
| PV03 | Carta com 25 definições preenchidas e E ativa | Todos os valores em cinco partes nos dois contextos, rótulos legíveis. |
| PV04 | Nome popular, tópico, adicionais e palavras-chave vazios | Identificados como ausentes em Carta com dados; nenhum campo omitido por opcionalidade. |
| PV05 | Gratuito com detalhe retido / Com taxa com “0” / tipo null | Omitir detalhe inativo / preservar “0” / tipo ausente sem inferir gratuidade. |
| PV06 | Prazo só valor / só unidade / “0” / texto Imediato | Preservar cada valor e ausência separadamente; sem conversão ou homologação semântica. |
| PV07 | Documento vazio entre preenchidos; etapas só modalidade ou título | Todos os itens identificáveis, sem inventar classificação/atributos; ID/ordem atuais. |
| PV08 | Remover/reordenar etapas na 007 | Mesmos IDs restantes, sequência atual, fonte intacta; foco por ID. |
| PV09 | Não/null com dados de agendamento retidos | Nenhum descendente S/E visível; Não explícito conta como conteúdo. |
| PV10 | Sim sem tipos/sistema; Online/Presencial/ambos | Campos S identificados; seleções integrais, sem confundir com modalidade Híbrida. |
| PV11 | Sistema nativo com dados externos retidos; externo dentro/fora | Somente E revela link/exibição; texto sem anchor/iframe; reativação mantém valores. |
| PV12 | Só ativo false e depois outra informação | Vazio primeiro; card depois mostra Não com nota de default, sem certificação. |
| PV13 | Alterar provider com ambas as prévias montadas | Mesma revisão e valores atuais; IDs DOM distintos; foco não é roubado. |
| PV14 | HTML/scripts/URL, Unicode, quebras e string longa | Texto literal, zero execução/recurso remoto; fonte congelada permanece igual. |
| PV15 | Storage bloqueado/inválido, provider ausente e carregamento | Estados distintos da 007; sem decoder paralelo ou sobrescrita de registro inválido. |
| PV16 | Correção em parte fechada, item removido e alvo inativo | Abrir/focar registro correto ou fallback; nenhuma perda de dados. |
| PV17 | Review/falha editorial; pendência/falha estrutural; CSV | Prévia/edição/tutorial livres; só 010 valida seu snapshot para exportar. |
| PV18 | Teclado/leitor, zoom e 320–1440 px | Ordem, texto integral, foco, contraste e reflow; registrar ambiente real. |

Fixtures são roteiro futuro, não testes executados na T008. Figma/ERS, copy,
provider/retorno, validação defensiva e 010 exigem verificações antes do aceite.

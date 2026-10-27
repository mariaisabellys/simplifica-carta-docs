# Contrato de apresentação e cópia da Carta v3

19/10/2026 — T010 documental. Aplica a [decisão do usuário](../../docs/spec.md#rf02--decisão-vigente-da-feature-012)
e a [matriz central](../007-formulario-carta-servico/matriz-campos-v3.md).
Somente na etapa `fill-information`, `/tutorial-paraiba-digital?etapa=4`.
Node `564:980` é variante da página 011, não página independente nem limite de campos.

## Matriz normativa

Cinco grupos da 007, nesta ordem. A = sempre; K = custo sob-consulta/com-taxa;
S = exigeAgendamento true; ON = S e tipos contém online; E = ON e
sistema-externo. “Sim” na coluna Copiar
exige campo aplicável com texto útil; somente espaços não habilitam ação.

| Nº | Grupo / ID | Path v3 | Condição | Copiar |
| --- | --- | --- | --- | --- |
| 01 | Sobre / `service-name` | `sobreServico.nome` | A | Sim |
| 02 | Sobre / `popular-name` | `sobreServico.nomePopular` | A | Sim |
| 03 | Sobre / `service-description` | `sobreServico.descricao` | A | Sim |
| 04 | Sobre / `category` | `sobreServico.categoria` | A | Não |
| 05 | Sobre / `subcategory` | `sobreServico.subcategoria` | A | Não |
| 06 | Sobre / `topic` | `sobreServico.topico` | A | Sim |
| 07 | Sobre / `active` | `sobreServico.ativo` | A | Não |
| 08 | Público / `specific-audience` | `publicoRequisitos.publicosEspecificos` | A | Não |
| 09 | Público / `user-profile` | `publicoRequisitos.perfisUsuario` | A | Não |
| 10 | Público / `who-can-use` | `publicoRequisitos.quemPodeUtilizar` | A | Sim |
| 11 | Público / `required-documents` | `publicoRequisitos.documentos[].nome` | A | Sim, por item |
| 12 | Público / `costs-and-fees` | `publicoRequisitos.custo.tipo` | A | Não |
| 13 | Público / `cost-value-or-link` | `publicoRequisitos.custo.detalhe` | K | Sim |
| 14 | Público / `maximum-deadline` | `publicoRequisitos.prazo.maximo` | A | Sim |
| 15 | Público / `deadline-type` | `publicoRequisitos.prazo.tipo` | A | Não |
| 16 | Fluxo / `step-title` | `etapas[].titulo` | A | Sim, por item |
| 17 | Fluxo / `citizen-guidance` | `etapas[].orientacaoCidadao` | A | Sim, por item |
| 18 | Fluxo / `modality` | `etapas[].modalidade` | A | Não |
| 19 | Atendimento / `requires-scheduling` | `atendimento.exigeAgendamento` | A | Não |
| 20 | Atendimento / `scheduling-type` | `atendimento.tiposAgendamento` | S | Não |
| 21 | Atendimento / `scheduling-system` | `atendimento.sistemaAgendamento` | ON | Não |
| 22 | Atendimento / `scheduling-link` | `atendimento.linkAgendamento` | E | Sim |
| 23 | Atendimento / `scheduling-display` | `atendimento.exibicaoAgendamento` | E | Não |
| 24 | Finais / `important-additional-information` | `informacoesFinais.informacoesAdicionais` | A | Sim |
| 25 | Finais / `keywords` | `informacoesFinais.palavrasChave` | A | Sim |

São **13 definições abertas copiáveis e 12 de escolhas sem botão**. Instâncias
variam com coleções, preenchimento e condições; não fixar total de botões na UI.
Não adicionar botão desabilitado em escolhas: não há ação de cópia nessas linhas.
`document-name` é o filho proposto da coleção da 007, não ID já presente no conteúdo.
Texto do documento copia somente nome; título/orientação de etapa copiam
separadamente, sem número, modalidade, rótulo ou agregação da coleção.
Prazo máximo copia só a string do campo, não a unidade; custo copia só detalhe,
não a opção; URL é campo aberto. Não importar formatadores do CSV da 010.

## Estados e representação

- Sempre apresentar cinco grupos e todos os campos aplicáveis, inclusive vazios.
  Sem Carta, mostrar aviso/Preencher Carta e grupos vazios/defaults, sem inventar
  dados ou esconder o tutorial. Durante carregamento/falha do provider, mostrar
  estado próprio, não Carta fictícia. Não criar outra fonte para compensar erro.
- Abertos vazios: “Não informado”, sem botão de copiar; ausência não é string
  transferível. Coleção vazia: “Nenhum item informado”, sem item artificial.
- Coleções existentes: manter ordem/ID; todos os itens parciais identificáveis.
  Campo aberto vazio num item não impede copiar o outro preenchido. Modalidade
  sozinha é exibida, sem botão. Ordem atual da 007 é contexto, não dado copiável.
- Seleções: rótulos do catálogo da 007, multisseleções na ordem recebida.
  null é “Não informado”, [] é ausência de seleção, nunca Não/gratuito.
  Agendamento false é “Não” e true é “Sim”, ambos sem cópia.
- Ativo false exibe Inativo e true exibe Ativo. É o estado configurado na Carta;
  nunca afirmar publicação, despublicação ou confirmação de interação.
- K/S/ON/E inativos: não montar valor, controle, botão ou âncora do campo; não
  revelar valores retidos nem apagar fonte. Parte apenas fechada da 007 não
  torna campos inativos. Reativar deriva dados atuais, sem feedback antigo.
- Uma Carta parcial permite cópia por texto preenchido. Erros estruturais da
  007, todos os estados editoriais da 008 e exportação 010 não são gate global.
  Nenhum diagnóstico, progresso ou conclusão de etapa é exigido.

## Fonte, conteúdo e integração com 011

Fonte exclusiva dos valores: Carta v3 segura do provider da 007. Seletor puro
readonly, sem storage próprio, migração, normalização editorial ou mutação.
Nunca ler innerText/textarea.value para montar payload. Dado original pode
conter HTML, URL, = ou acentos: renderizar como texto literal sem recursos remotos.
Não aplicar BOM, escape, prefixo de fórmula ou rótulo de CSV ao clipboard.

`src/content/tutorial/paraiba-digital.ts` foi sincronizado em 27/10/2026: a
lista limitada, os `copyLabel` e os valores ilustrativos foram removidos. A
etapa 4 referencia a projeção completa da 012 com cinco grupos, 25 definições,
13 textos copiáveis e 12 escolhas. As outras cinco etapas, introdução, edição,
anterior/próxima e o export de compatibilidade foram preservados. Labels vêm
do conteúdo/formulário; o mapa de controles determina elegibilidade.

011 controla URL, etapa ativa, progresso e CTAs. 012 fornece região única
`tutorial-dados`, grupos, projeção e operações de cópia. Só montar na etapa 4;
outras etapas sem controles/live regions da 012. A UI amplia o frame para os
cinco grupos, sem truncar campos para caber. Consulta visual detalhada é futura.
Links, mapa e conteúdo já estão reconciliados documentalmente; a composição e
os componentes continuam pendentes de implementação.

Gerar âncoras dos alvos realmente apresentados: prefixo `tutorial-carta-` mais
ID de campo, e coleção + ID estável + propriedade para repetidos. Codificar IDs
sem colisão; nunca usar texto ou índice de posição. Retorno ao formulário usa
registro autorizado da 007, abre parte/foca após montagem. Alvo removido vai
ao grupo; alvo inativo à condição. Fragmento da 011 sem alvo visível usa
`tutorial-dados` (inclusive falha), sem recriar campo oculto. Não expor valores
em URL. Não duplicar a ação “Editar na minha Carta” ou o anúncio da etapa.

## Clipboard e manual: contrato preservado

Somente gesto explícito; chamar `copiarTexto(original)` diretamente no handler,
sem ler clipboard, consultar permissão previamente como requisito ou usar
fallback oculto que declare sucesso. Utilitário existente resolve success ou
failed/unavailable/write-failed. Sucesso só depois de resolução, nunca no clique.
Falha: “Não foi possível copiar. Selecione o texto e copie manualmente.”
Texto permanece selecionável por teclado/toque, sem necessidade de sucesso.

String enviada à API é exatamente a string original da captura, sem trim ou
transformação. O contrato manual já decidido em 07/10 preserva conteúdo e quebras
visíveis; não promete terminadores byte a byte no DOM/clipboard/sistema/destino.
Textarea readOnly recebe string original, mas seu valor DOM não é fonte de cópia.
Verificar fonte/parâmetro API e seleção/colagem real separadamente; não normalizar
o modelo para satisfazer teste. Sucesso não comprova colagem/cadastro/publicação
nem qual conteúdo permanecerá após outras gravações externas.

## Identidade, concorrência e descarte tardio

Chave estável = identidade da sessão em memória + path; em coleções, coleção +
ID + propriedade. RequestId monotônico, revisão monotônica do valor/aplicabilidade
e geração de montagem distinguem tentativas (inclusive A → B → A).

Contrato técnico escolhido nesta T010: coordenador de operações em memória
**acima das rotas**, separado dos dados da Carta, mantém trava por chave até
promise finalizar, inclusive ocultação, saída da etapa e remontagem. Não guardar
histórico de valores ou feedback no storage. Texto capturado só vive durante
operação; ao concluir, liberar referências. Outros campos continuam independentes.

| Evento | Resultado |
| --- | --- |
| Clique em campo ativo preenchido sem operação da mesma chave | Trava síncrona antes do write; capturar original/revisão e mostrar Copiando… |
| Clique repetido antes de render ou remount com mesma chave pendente | Não criar segunda escrita; manual disponível. |
| Texto/condição muda | Invalidar feedback/revisão; manter trava até operação terminar; não anunciar novo valor copiado. |
| Resolve/rejeita | Liberar trava; atualizar UI só se geração/revisão/request atuais e campo ativo montado. |
| Reordenação | Identidade continua por ID, não associar feedback à nova posição errada. |
| Item removido, etapa/rota desmontada | Limpar timers/feedback; promessa pode continuar, callbacks de UI ignorados. |
| Retorno/remontagem | Derivar dados atuais; sem sucesso herdado; se promise antiga pendente, manter trava com aviso. |
| Sucesso atual por 5 s | Voltar a idle sem apagar clipboard. |
| Pendente por 10 s | Informar demora e alternativa manual; não simular cancelamento ou liberar trava. |

Timers de UI limpos ao desmontar; tempo de demora pode usar início da operação
no coordenador ao remontar. Se promise nunca terminar, chave permanece pendente
na vida dessa aplicação; usuário mantém manual e navegação. Reload/nova aba é
limite do controle: não prometer cancelamento de escrita externa nem exclusão
entre abas. Catch defensivo e finally devem cobrir dependência injetada que rejeita.
Não tentar restaurar clipboard anterior. Ordem de resolução de campos diferentes
pode divergir da ordem dos cliques; mensagem é por operação, não selo de conteúdo atual.

## Acessibilidade e segurança

Botões “Copiar {campo}”, incluindo contexto de documento/etapa no nome acessível.
Escolhas exibidas semanticamente como rótulo/valor, sem controles editáveis.
Texto integral com altura natural/quebra; área manual readOnly quando necessária,
sem confundir com edição da Carta. IDs DOM únicos. Anúncio curto por campo,
sem anunciar texto inteiro; não roubar foco em atualizações, timers ou promises.
Pendência inibe operação com guarda imediata e estado acessível; fallback manual
continua alcançável. Inter/tokens, contraste/reflow e toque verificados depois.
Sem logs, telemetria de conteúdo, leitura de clipboard, backend ou segunda Carta.

## Fixtures futuras

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| TR01 | 25 definições completas com K/E | Cinco grupos, 13 tipos abertos copiáveis, 12 escolhas sem botão. |
| TR02 | Documento/etapas múltiplos, reordenados e parciais | Cópia individual dos textos, sem número/modalidade/concatenação; ID estável. |
| TR03 | Prazo positivo/unidade; custo/detalhe; URL válida | Só textos abertos copiam original; opções apenas exibidas; estrutura inválida impede estado concluído. |
| TR04 | Vazio/null/false/[]/default Ativo | Ausências identificadas, nenhum placeholder copiado, false legível sem botão. |
| TR05 | K/S/ON/E alternados com valores retidos | Inativos não aparecem/copiáveis; presencial exclusivo não mostra sistema; fonte preservada. |
| TR06 | Carta vazia com exemplos no conteúdo | Cinco grupos sem valores ilustrativos; nenhum botão de cópia habilitado. |
| TR07 | Unicode/HTML/CR/LF/CRLF e texto longo | Original enviado integralmente; UI literal/manual com quebras visíveis. |
| TR08 | API ausente, contexto inseguro, recusa ou exceção | Falha verdadeira, manual disponível, sem leitura/fallback secreto. |
| TR09 | Promise controlada e clique duplicado | Sucesso só após resolução e uma operação por chave. |
| TR10 | Editar A/B/A durante pending | Retorno antigo descartado; trava mantida, sem confirmação do novo valor. |
| TR11 | Ocultar/reativar, sair/retornar etapa 4 durante pending | Trava entre montagens, sem UI tardia ou nova escrita automática. |
| TR12 | Dois campos com resolução inversa | Feedback correto por alvo, sem garantia de conteúdo final do clipboard. |
| TR13 | 5 s após sucesso e 10 s pendente | Timers informam corretamente; não cancelam escrita nem limpam clipboard. |
| TR14 | Etapas 1–3/5–6 e fallback de âncora | 012 desmontada; sem links a campo oculto, fallback tutorial-dados. |
| TR15 | Falhas/editorial/estrutura/CSV pendente | Textos presentes continuam copiáveis sem gate global. |
| TR16 | Retorno à edição/recarga/storage bloqueado | Fonte 007 preservada/recuperada; sem feedback obsoleto. |
| TR17 | HTTPS desktop/mobile, teclado/leitor e colagem manual | Evidência real de gesto/seleção/feedback; mock não substitui ambiente. |

Fixtures são requisitos de testes, não execução nesta tarefa. T011, implementação,
consulta Figma/ERS/copy e testes reais permanecem pendentes.

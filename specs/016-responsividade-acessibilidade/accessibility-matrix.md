# Matriz inicial: Responsividade e acessibilidade

## Escopo e limites

Rodada 2026-10-05. Esta matriz registra CA01–CA15 e lacunas; nao substitui
inventario completo dos criterios WCAG A/AA aplicaveis previsto em T002.
WCAG 2.2 AA continua meta proposta, sem declaracao de conformidade.
Dono de manutencao: feature indicada; responsavel humano/ambientes assistivos
a atribuir em T003. Sem commit criado nesta rodada. Evidencia: verification.md.

| CA | Processo / dono | Metodo exigido | Resultado nesta rodada |
| --- | --- | --- | --- |
| CA01 | Rotas 002–015 / T001 | Inventario por rota/estado | Inventario local analisado; placeholders nao aprovados |
| CA02 | Todas as paginas / T010 | Browser, larguras/orientacao | Pendente |
| CA03 | Todas as paginas / T014 | Zoom/texto/espacamento reais | Pendente |
| CA04 | Shell e operacoes / T009–T013 | Teclado/processos completos | Guard testado isoladamente; teclado real pendente |
| CA05 | Navegacao/listas / 002/007/014 | Hash/historico/foco reais | Pendente; guard nao resolve foco |
| CA06 | Todas as paginas / T012–T013 | Leitor/semantica/titulos | Pendente |
| CA07 | Tokens/controles / T010/T014 | Medir contraste/alvos por estado | Pendente |
| CA08 | Formularios / 007/008/014 | Associacoes/erros/correcao | Fluxos ausentes, pendente |
| CA09 | Listas/horarios / 007/014 | Teclado/leitor com IDs | Fluxos ausentes, pendente |
| CA10 | Falhas/recuperacao / 007–015 | Estados integrados reais | Pendente |
| CA11 | Copia/CSV/suporte / 010/012/015 | Feedback integrado/leitor | Helpers isolados existentes, integracao pendente |
| CA12 | Paginas / T014 | Preferencias/assets/teclado virtual | Pendente |
| CA13 | Produto / T003/T013–T015 | Browsers/leitores desktop e movel | Ambientes/versoes a confirmar; nao executado |
| CA14 | Produto / T002/T016–T017 | Matriz A/AA completa e retestes | Pendente; nenhuma nao aplicabilidade presumida |
| CA15 | Ajustes visuais / T004 | Consultas Figma/adaptacoes | Figma indisponivel; nenhum ajuste visual realizado |

Node 24.20.0/testes de mocks nao sao ambientes de leitura assistiva. Chrome,
Edge, Firefox, Safari, NVDA, VoiceOver e dispositivos reais nao foram testados.
Nao marcar criterio WCAG como atendido apenas por teste do guard ou build.

## Atualizacao documental T016 — 22/10/2026

As linhas CA01–CA15 acima continuam como baseline histórico de execução. A
T016 documental não realizou auditoria de interface e não muda resultados para
“atendido”. O inventário abaixo define contextos, estados e métodos que devem
existir antes da avaliação. Referências visuais estão identificadas, mas todos
os nodes permanecem **pendentes de inspeção visual autenticada**.

### Cobertura por tela, componente e estado

| Contexto / dono | Figma identificado | Estados mínimos além do frame | Situação T016 |
| --- | --- | --- | --- |
| Home/shell — 002 | `310:175` | menu aberto/fechado, rota ativa, foco/skip, asset/fonte indisponível, texto longo | Contrato local conferido; visual pendente |
| Explorar — 003 | `575:483` | cards/CTA, foco e destino; texto longo; rota ausente e 404 são lacunas de integração | Contrato local conferido; visual pendente |
| Carta educativa — 004 | `365:265` | leitura longa, links externos/falha de destino, listas e reflow | Contrato local conferido; visual pendente |
| Diagnóstico — 005 | `387:1020`, `387:1362` | pergunta/seleção/sem resposta, progresso, cinco resultados, sessão inválida, reinício | Conteúdo/rotas conferidos; visual e fluxo pendentes |
| Organização — 006 | `387:1918` | três tópicos, 13 informações, orientação expandida/recolhida, progresso e conteúdo longo | Contrato atual corrigido; visual pendente |
| Formulário — 007/008 | cinco partes; `811:306`, `811:382`, `651:317` | vazio/parcial/revisão; orientação; erro/sugestão; listas vazias/repetidas; condicionais; storage/loading/falha | Formulário real obrigatório; visual/fluxo pendentes |
| Prévia/exportação — 009/010 | `821:308` | provider carregando/ausente; Carta vazia/parcial/completa; erro/sugestão; validar/baixar/sucesso/falha | Componente compartilhado; visual/fluxo pendentes |
| Tutorial/cópia — 011/012 | `564:635`–`564:1357`; etapa 4 `564:980` | seis etapas; imagem carregando/falha; sessão vazia/parcial; campos K/S/E; cópia pendente/sucesso/falha; conteúdo longo | Etapa 4 ampliável; visual/fluxo pendentes |
| FAQ/apoio — 013 | `169:495` | FAQ fechada/aberta, hash/foco, canais ativo/pendente/pausado/indisponível, texto longo | IDs/contrato conferidos; visual pendente |
| Atendimento — 014 | `425:201`, `425:296`, `446:206`, `470:444` | calendário loading/disponível/vazio/erro; data/horário; formulário vazio/erro/revisão; envio pendente/conflito/incerto/expirado/registrado | Dados do frame são exemplos; visual/API pendentes |
| E-mail — 015 | entrada `425:201` | canal ativo/inativo; cópia ociosa/pendente/sucesso/falha; seleção manual e texto longo | Conteúdo real conferido; visual/clipboard pendentes |
| Transversal — 016 | sem rota/frame próprio | 320–1440 px, intermediárias, zoom, texto/spacing, contraste, teclado, leitores e falhas de assets | Métodos definidos; execução pendente |

### Dimensoes de verificacao e alternativa a avaliacao visual

| Dimensão | Método exigido | Evidência futura | O que não comprova |
| --- | --- | --- | --- |
| Foco | Navegação real, `document.activeElement`, ordem observada e destino após montagem/hash/erro | roteiro, ambiente, sequência e captura/registro do DOM | screenshot estático ou outline no Figma |
| Teclado | Percorrer processo com Tab/Shift+Tab/Enter/Espaço/setas/Escape conforme o controle | operações concluídas, ordem e defeitos por ambiente | clique automatizado isolado |
| Anúncios | Inspecionar árvore acessível e usar NVDA/VoiceOver nos estados dinâmicos | texto ouvido, momento, repetição e região responsável | presença visual da mensagem ou `aria-live` sem teste |
| Contraste | Medir cores computadas sobre o fundo real por estado, incluindo alpha, foco e não textual | pares de cores, razão, ferramenta e estado | token nominal, screenshot ou conta-gotas do frame |
| Reflow | Browser real em 320/390/768/1024/1440 px e intermediárias; verificar overflow, corte, sobreposição e sticky | viewport, orientação, conteúdo extremo e resultado | redimensionar frame do Figma |
| Zoom/texto | Zoom real 200%/400%, tamanho de texto e espaçamento separados, sem reset de dados | browser/SO, nível e fluxo repetido | emular viewport menor |
| Toque/alvos | Medir caixa/spacing renderizados e operar em dispositivo/entrada de toque | dimensão, exceção AA e contexto | dimensão desenhada no Figma |
| Loading/vazio/erro/revisão/falha | Acionar fixtures/mocks autorizados e observar recuperação, foco, mensagem e preservação | estado reproduzível e retorno esperado/observado | inferência a partir de copy ou placeholder |
| Conteúdo longo | Massa sintética com nomes, URLs, listas e parágrafos extensos em todos os breakpoints | fixture e ausência de corte/truncamento | lorem ipsum curto no frame |

Resultado inicial de todas as novas combinações: **pendente**. Página não
implementada, ambiente ausente ou Figma inacessível nunca vira “não aplicável”.
O [registro T016](../../docs/verificacoes/t016-figma-acessibilidade.md) contém
o inventário completo e a evidência de acesso indisponível.

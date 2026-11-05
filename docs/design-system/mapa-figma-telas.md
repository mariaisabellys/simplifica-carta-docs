# Mapa Figma das Telas

Este documento conecta rotas, specs e frames atuais do Figma Design do
prototipo. Ele deve ser atualizado sempre que uma nova tela for especificada ou
quando o frame oficial mudar.

## Arquivo oficial

- Link: [Manual de levantamento dos servicos - Figma Design](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=310-175&m=dev)
- `fileKey`: `YaVUdqYa3boHpvGrxf4ZJ5`
- Pagina raiz atual: `167:2` (`Prototipo`)
- Node inicial recomendado para home: `310:175` (`home`)

## Estado da conferência T016 — 22/10/2026

O inventário abaixo foi conciliado com as specs proprietárias e com o conteúdo
versionado. Nesta rodada, quatro URLs representativas (`310:175`, `2024:269`,
`564:980` e `425:201`) foram abertas pelo mecanismo web disponível, mas o Figma
recusou o acesso; não havia navegador conectado nem ferramenta MCP do Figma.
Como todos os nodes pertencem ao mesmo arquivo protegido, **nenhum frame foi
visualmente inspecionado na T016**. Identificar um node ou manter seu link não
equivale a validar layout, tokens, medidas, copy, responsividade ou estados.

O [registro T016](../verificacoes/t016-figma-acessibilidade.md) lista, por tela,
as referências locais, estados obrigatórios e pendências específicas. Até uma
consulta autenticada futura, todos os nodes permanecem com evidência visual
pendente. A implementação deve consultar o frame antes do trabalho visual e
registrar data, mecanismo, node e divergências encontradas.

Este parágrafo registra o estado histórico da T016. Para 002–004, ele foi
superado pelo lote visual local de 27/10/2026 descrito abaixo.

## Adendo de disponibilidade T019 — 22/10/2026

O conector Figma autenticado passou a estar disponível e respondeu metadados
para os 26 nodes ativos deste mapa, incluindo páginas, partes/variantes da 007,
seis etapas da 011, estados da 014 e componentes compartilhados. IDs e nomes
foram confirmados no arquivo `YaVUdqYa3boHpvGrxf4ZJ5`.

Esta conferência valida disponibilidade e identidade estrutural, não fidelidade
visual. Não foram executados `get_design_context` por tela, screenshots,
extração de assets, medição, comparação com browser ou inspeção responsiva.
Portanto, as pendências de implementação/aceite visual da T016 continuam
abertas. Evidência consolidada na
[verificação T019](../verificacoes/t019-validacoes-features.md).

## Lote visual local 002–004 — 27/10/2026

Os nodes `310:175`, `575:483` e `365:265` foram inspecionados por
`get_design_context`, exportados por `download_assets` e conferidos localmente.
As capturas integrais, especificações de composição/responsividade e manifestos
estão em [referências visuais locais](referencias-locais/README.md). Os assets de
runtime foram salvos em `src/assets/` com nomes semânticos.

Para essas três features, a consulta ao Figma deixou de ser pré-requisito de
implementação. O aceite visual final continua pendente até comparar o browser
implementado com as capturas locais e testar responsividade; a extração do
frame desktop, isoladamente, não comprova esse aceite.

## Lote visual local 005–008 — 03/11/2026

Os oito frames de 005–007 foram extraídos e a integração visual da 008 foi
documentada sobre a 007. Para essas features, os pacotes locais substituem a
consulta remota obrigatória; implementação e aceite continuam pendentes.

## Lote visual local 009–012 — 04/11/2026

O componente `821:308` da prévia e os seis estados `564:635`, `564:730`,
`564:852`, `564:980`, `564:1232` e `564:1357` do tutorial foram inspecionados e
exportados. A 010 foi documentada como ação integrada à 009 e a 012 como região
integrada à etapa 4 da 011; nenhuma tela artificial foi criada para elas.

Os pacotes locais, manifestos e assets semânticos substituem a consulta remota
obrigatória para 009–012. Implementação, comparação com navegador, estados não
representados e testes responsivos/assistivos continuam pendentes.

## Lote visual local 013–015 — 04/11/2026

O frame `169:495` da FAQ e os estados `425:201`, `425:296`, `446:206` e `470:444`
da jornada de atendimento foram exportados e conferidos localmente. A 015 foi
documentada como composição compartilhada da entrada `425:201`; não há tela
independente do suporte por e-mail. Os pacotes locais substituem a consulta
remota obrigatória para 013–015; implementação, ERS, operação e aceite visual
no navegador continuam pendentes.

## Mapa atual

| Rota | Tela ou secao no Figma | Node ID | Spec relacionada | Observacao |
| --- | --- | --- | --- | --- |
| `/` | home | `310:175` | `002-home-e-navegacao` | Pacote local: [`002-home-e-navegacao`](referencias-locais/002-home-e-navegacao/visual-spec.md). Hero, processo, CTA educativo e footer. |
| `/explorar-por-etapas` | explorar-por-etapas-v2 | `575:483` | `003-explorar-por-etapas` | Pacote local: [`003-explorar-por-etapas`](referencias-locais/003-explorar-por-etapas/visual-spec.md). Acesso independente às quatro etapas. |
| `/o-que-e-carta-de-servicos` | O que e a Carta? | `365:265` | `004-o-que-e-carta-servico` | Pacote local: [`004-o-que-e-carta-servico`](referencias-locais/004-o-que-e-carta-servico/visual-spec.md). Contexto, fundamentos, campos e legislação. |
| `/diagnostico` | diagnostico | `387:1020` | `005-diagnostico-servico-publico` | Pacote local: [`005-diagnostico-servico-publico`](referencias-locais/005-diagnostico-servico-publico/visual-spec.md), estado questionário. |
| `/diagnostico/resultado` | resposta | `387:1362` | `005-diagnostico-servico-publico` | Mesmo pacote local da 005, estado resultado; conteúdo calculado prevalece sobre a amostra. |
| `/organizar-informacoes` | organizar informaçoes | `387:1918` | `006-organizar-informacoes` | Pacote local: [`006-organizar-informacoes`](referencias-locais/006-organizar-informacoes/visual-spec.md). Três tópicos e 13 informações prevalecem. |
| `/ajuda` | FAQ | `169:495` | `013-fluxo-de-ajuda` | Pacote local: [`013-fluxo-de-ajuda`](referencias-locais/013-fluxo-de-ajuda/visual-spec.md). Quatro perguntas e CTA para a entrada compartilhada. |
| `/formulario-carta` | Formulario — parte 1 | `653:1540` | `007-formulario-carta-servico` | Pacote local: [`007-formulario-carta-servico`](referencias-locais/007-formulario-carta-servico/visual-spec.md), com cinco partes e integração visual da 008. |
| `/previa` | card-servico-completo | `821:308` | `009-previa-html` | Pacote local: [`009-previa-html`](referencias-locais/009-previa-html/visual-spec.md). A 010 ocupa a ação de CSV no cabeçalho; o mesmo componente é reutilizado na 007. |
| `/tutorial-paraiba-digital` | Tutorial — Etapa 1: Acesse a plataforma | `564:635` | `011-tutorial-paraiba-digital` | Pacote local: [`011-tutorial-paraiba-digital`](referencias-locais/011-tutorial-paraiba-digital/visual-spec.md), com seis estados. A 012 integra somente a etapa 4. |
| `/ajuda/atendimento-agendado` e `/ajuda/suporte-email` | Ainda precisa de ajuda? — escolha de canal | `425:201` | `014-atendimento-agendado` e `015-suporte-email` | Pacotes locais: [`014-atendimento-agendado`](referencias-locais/014-atendimento-agendado/visual-spec.md) e [`015-suporte-email`](referencias-locais/015-suporte-email/visual-spec.md). Entrada compartilhada, calendário interno e cópia de e-mail conforme estados. |

## Paginas, partes e componentes do formulario da Carta

A feature 007 possui cinco telas/partes na mesma rota. A ordem abaixo acompanha
o contrato de `charterFormPageContent.parts`; nomes visuais e detalhes finais
devem ser confirmados na consulta MCP, sem sobrescrever o conteudo versionado:

| Classificacao | Parte do conteudo | Node ID | Link |
| --- | --- | --- | --- |
| Pagina — estado inicial | 1. Sobre o servico | `653:1540` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=653-1540&m=dev) |
| Variante/parte | 2. Publico e requisitos | `2024:269` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=2024-269&m=dev) |
| Variante/parte | 3. Como o servico funciona | `641:58` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=641-58&m=dev) |
| Variante/parte | 4. Atendimento | `647:650` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=647-650&m=dev) |
| Variante/parte | 5. Informacoes finais | `660:2533` | [Abrir no Figma](https://www.figma.com/design/YaVUdqYa3boHpvGrxf4ZJ5/Manual-de-levantamento-dos-servi%C3%A7os--Copy-?node-id=660-2533&m=dev) |

Componentes compartilhados da 007:

| Componente/variante | Node ID | Contrato |
| --- | --- | --- |
| Form-Card sem orientacao expandida | `811:306` | Estado compacto do campo. |
| Form-Card com orientacao expandida | `811:382` | Mesmo campo com painel de orientacao visivel. |
| Previa da Carta | `821:308` | Mesmo componente visual e semantico da feature 009; a 007 nao cria uma segunda previa. |

O node `2024:269` apresenta o formulario como imagem de referencia. Na
implementacao, essa imagem nunca e usada como formulario: cada campo, grupo,
lista e acao deve virar controle HTML/React real, editavel, rotulado e acessivel,
preservando hierarquia, distribuicao e aparencia do frame.

O layout de cada tela se adapta ao conteudo de
`src/content/pages/formulario-carta.ts`; o Figma governa composicao e estilo,
mas nao autoriza truncar, substituir ou duplicar copy. As orientacoes dos cards
derivam de `src/content/pages/organizar-informacoes.ts` por ID correspondente.

## Pagina e variantes do tutorial Paraiba Digital

Os seis frames representam uma unica pagina logica e uma unica rota. A troca de
etapa altera o estado apresentado, sem criar seis rotas ou seis features.

| Classificacao | Etapa e conteudo correspondente | Node ID | Link |
| --- | --- | --- | --- |
| Pagina — estado inicial | Etapa 1: Acesse a plataforma | `564:635` | [Referência local](referencias-locais/011-tutorial-paraiba-digital/etapa-1-desktop.png) |
| Variante da pagina | Etapa 2: Faca login | `564:730` | [Referência local](referencias-locais/011-tutorial-paraiba-digital/etapa-2-desktop.png) |
| Variante da pagina | Etapa 3: Localize o cadastro | `564:852` | [Referência local](referencias-locais/011-tutorial-paraiba-digital/etapa-3-desktop.png) |
| Variante da pagina — integra 012 | Etapa 4: Cadastre as informacoes de sua Carta | `564:980` | [Referência local](referencias-locais/011-tutorial-paraiba-digital/etapa-4-desktop.png) |
| Variante da pagina | Etapa 5: Revise os dados | `564:1232` | [Referência local](referencias-locais/011-tutorial-paraiba-digital/etapa-5-desktop.png) |
| Variante da pagina | Etapa 6: Publique o servico | `564:1357` | [Referência local](referencias-locais/011-tutorial-paraiba-digital/etapa-6-desktop.png) |

Os frames definem composicao, hierarquia e variacoes visuais. Titulos, textos,
percentuais, instrucoes e acoes editoriais devem ser renderizados a partir
de `src/content/tutorial/paraiba-digital.ts`; valores da Carta vêm exclusivamente
da sessão v3 da 007, apresentados pela projeção da 012. Divergencias editoriais do Figma
nao substituem o conteudo versionado e devem ser registradas no planejamento.

O node `564:980` tambem e a referencia visual da feature
`012-copia-dados-tutorial`. A 012 nao cria pagina nem rota: fornece a projecao,
os controles e o mecanismo de copia montados exclusivamente na etapa 4 da 011.

Revisão documental T011 — 20/10/2026: `564:980` é uma variante ampliável,
sem limite de campos ou altura fixa. Deve acomodar os cinco grupos e todas
as 25 definições aplicáveis da Carta: 13 abertas copiáveis quando preenchidas
e 12 escolhas sem botão, com repetição por item e condições K/S/ON/E.
Layout adapta-se ao conteúdo, sem truncar informações para reproduzir o frame.
Exemplos e lorem ipsum nunca substituem dados ausentes da sessão.
O [contrato da 011](../../specs/011-tutorial-paraiba-digital/contrato-integracao-v3.md)
registra a migração do TypeScript concluída em 27/10/2026; fontes operacionais,
composição e testes continuam pendentes.
Esta atualização do mapa comprova a extração dos frames, mas não a implementação
nem o aceite visual no navegador.

## Pagina compartilhada de ajuda e estados do atendimento agendado

O node `425:201` e compartilhado pelas features 014 e 015 como entrada dos
canais de ajuda. Os demais frames pertencem ao fluxo da 014. O conteudo vem de
`src/content/ajuda/canais.ts`, `src/content/ajuda/suporte-email.ts` e
`src/content/ajuda/atendimento-agendado.ts`:

| Classificacao | Estado/etapa | Node ID | Link |
| --- | --- | --- | --- |
| Pagina compartilhada — entrada | Escolha de canal: atendimento agendado ou suporte por e-mail | `425:201` | [Referência local](referencias-locais/014-atendimento-agendado/entrada-desktop.png) |
| Variante da pagina | Escolha um horario | `425:296` | [Referência local](referencias-locais/014-atendimento-agendado/horario-desktop.png) |
| Variante da pagina | Dados do agendamento e revisao antes do envio | `446:206` | [Referência local](referencias-locais/014-atendimento-agendado/revisao-desktop.png) |
| Variante da pagina | Solicitacao registrada | `470:444` | [Referência local](referencias-locais/014-atendimento-agendado/solicitacao-desktop.png) |

Figma orienta composicao e hierarquia. O conteudo versionado prevalece,
especialmente as correcoes editoriais que distinguem solicitacao registrada de
atendimento confirmado e removem promessas de e-mail ou remarcacao. Datas,
meses, horarios e dados pessoais dos frames sao exemplos, nunca disponibilidade
real ou valores iniciais. O layout deve adaptar-se aos estados reais da API,
copy longa, erros e acessibilidade.

No card `Suporte por e-mail`, exibir `gesed.semtd@gmail.com`, a orientação para
copiar o endereço e o botão `Copie o e-mail`. A ação copia somente o endereço;
não abre aplicativo, não envia mensagem e não anuncia entrega ou recebimento.
O endereço exibido e copiado deriva de `supportContacts.gesed.email`, sem
constante independente nos cards. Sucesso e falha seguem o conteúdo da 015;
seleção manual permanece disponível no canal ativo. A T012 documental de
20/10/2026 reconciliou o [contrato da 015](../../specs/015-suporte-email/spec.md);
apresentação não ativa e transições compartilhadas foram definidas documentalmente
na T013 pelo [contrato de canais](../arquitetura/contrato-canais-ajuda.md).
O conteúdo TypeScript foi migrado em 21/10/2026 por resolvedor compartilhado;
a implementação visual dos cards/calendário e a operação dos canais continuam pendentes.

Na FAQ `169:495`, não inserir os cards: a seção de apoio leva à entrada da 014.
Em `425:201`, na própria rota 014, “Consultar datas e horários” é botão de
transição interna para calendário, não link para a mesma rota. Na rota 015,
o card de atendimento navega à entrada 014; o de e-mail ativo copia localmente.
Calendário é estado interno de expansão da jornada, sem node novo presumido;
`425:296` referencia seleção de horário. Pendente/pausado mostram avisos, sem
ação operacional; ambos indisponíveis mantêm orientações e retornos.
Layout adapta-se a esses estados; o pacote local documenta a consulta visual,
mas não comprova operação nem aceite no navegador.

## Componentes identificados

O contrato consolidado de componentes e assets compartilhados está em
[componentes-compartilhados](componentes-compartilhados/README.md), com manifesto
e referência reaproveitada da captura da home. Ele cobre shell, header, footer,
breadcrumb, botões, cards, `Label-Row`, stepper e feedback.

| Componente | Node ID | Uso esperado |
| --- | --- | --- |
| `Label-Row` | `651:317` | Label de campo com indicador de obrigatoriedade e badge `Necessario`; permanece como componente de apoio para formularios. |
| Navbar da home | Dentro de `310:175` | Navegacao atual da home. Nao usar mais o node antigo `594:528` como referencia da home. |

## Ajustes de MVP sobre o prototipo

- A header da home no Figma pode exibir o link `Material de apoio`, mas ele
  nao deve ser implementado neste momento porque a area completa de materiais
  de apoio esta fora do MVP.

## Frames antigos a evitar

Os frames abaixo foram substituidos pelos ajustes recentes no prototipo e nao
devem ser usados como referencia principal nas proximas specs:

- `0:1` como pagina raiz do arquivo;
- `3:2` como home;
- `594:528` como navbar principal da home;
- `3:104`, `3:176`, `98:52` e `263:4` como referencias atuais de telas.

## Regra de uso

Se houver pacote em `referencias-locais/`, implementar a partir da captura,
manifesto, especificação e assets versionados; nenhuma consulta remota é
obrigatória. Para telas ainda sem pacote local, consultar o node correspondente
com `get_design_context` e, em seguida, versionar o mesmo conjunto de evidências
antes de distribuir a implementação. Sempre adaptar para React + TypeScript +
CSS modular/global, sem copiar Tailwind nem coordenadas absolutas.

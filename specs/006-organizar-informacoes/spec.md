# Spec: Organizar informações

Reconciliada em 19/10/2026 pela T006 documental. Versão anterior preservada em
[histórico](historico/2026-10-19-pre-t006-spec.md). Esta revisão não implementa UI.

## Objetivo e fontes

Orientar o levantamento antes da Carta, com consulta independente e marcações
de preparação. O conteúdo está em src/content/pages/organizar-informacoes.ts.
O [contrato de orientações v3](contrato-orientacoes-v3.md) define ordem, destinos,
ressalvas e substituições editoriais ainda não aplicadas ao TypeScript.
O [modelo central da 007](../007-formulario-carta-servico/modelo-central-carta.md)
define os campos; a preparação não o amplia.

## Requisitos funcionais

### RF01 — Rota e entradas

Manter /organizar-informacoes, acesso direto/recarga sem login ou diagnóstico,
entrada pela etapa 2 da 003 e encaminhamento da 005 conforme seu próprio contrato.
Reutilizar shell, breadcrumb Início > Organizar informações e identificação da
página atual. Seguir o [contrato compartilhado de navegação](../../docs/arquitetura/contrato-navegacao.md);
a 006 não cria roteador próprio. Recarga publicada depende do fallback da 017.

### RF02 — Apresentação

Título: “Organize as informações do seu serviço”. Usar subtítulo do conteúdo
versionado, explicar a preparação e a confirmação junto ao setor responsável.
Não prometer aprovação pela GESED, completude ou publicação automática.

### RF03 — Conteúdo e destinos

Três tópicos: Sobre o serviço; O que é necessário; Como o serviço funciona.
Treze informações na ordem e nos IDs do contrato de orientações: nome, nome
popular, descrição, público, categoria, palavras-chave, informações adicionais,
documentos, custos, etapas, agendamento, prazo e recorrência.
Preservar exemplos, Evite/Prefira, orientações adicionais e dicas quando presentes.
Rotular exemplos como ilustrativos, nunca valores padrão ou regras universais.

Doze orientações mapeiam 24 definições de campos; recorrência é complementar
sem campo v3. Ativo não tem orientação correspondente e permanece em MC-05.
Tópico é texto; prazo é valor/unidade sem opção Imediato; agendamento segue S/E
da matriz v3, não apenas Online. Aplicar as ressalvas e ajustes editoriais do
contrato antes de reutilizar o conteúdo na 007. Não inferir gratuidade, dispensa
de documentos ou resposta Não de informações desconhecidas.

### RF04 — Preparação e expansão

Declaração independente por informação, sem coletar valores da Carta. Progresso
derivado dos IDs marcados: começa em 0 de 13, nunca em progressExample.
Uma marca inclui confirmação de não aplicação, não afirma preenchimento.
Treze marcações não aprovam a Carta nem bloqueiam/habilitam navegação.
Estado em memória isolado, preservado nas rotas internas; recarga reinicia zero.
Orientações expansíveis com controle por teclado; abrir/fechar não marca itens.
A informação essencial e o acesso à orientação não exigem confirmação.

### RF05 — Próximos passos

“Preencher Carta” leva a /formulario-carta e ajuda leva a /ajuda, sempre livres.
Reutilizar ajuda do shell quando adequada. Preservar a Carta existente sem
ler, escrever, reiniciar ou limpar seus dados. Não duplicar FAQ ou suporte.

### RF06 — Conteúdo e reuso

Conteúdo fora do JSX. Reutilizar por IDs explícitos da tabela, com complementos
por controle; não pressupor que IDs da 006 e da 007 coincidam. Nome de documento
e etapas usam identidade estável por item. Mostrar/ocultar orientação da 007
não altera dado, marcação ou validação. Aprovação institucional permanece pendente.

## Requisitos não funcionais e fora de escopo

Sem backend, login, anexos, coleta de dados pessoais, publicação ou persistência
permanente. Estado de preparação não usa storage da Carta nem URL.
Reutilizar Inter, tokens e componentes; um h1, hierarquia de tópicos/informações,
ordem DOM/visual 1–13, foco visível, nomes acessíveis, contraste e reflow.
Não usar cor como único indicador; mudanças de progresso devem ser anunciadas
sem deslocar foco. Não duplicar main/header/footer. Não esconder texto por
altura fixa ou reordenar leitura em colunas. Não validar/exportar a Carta aqui.

## Referências e dependências

Mapa local: node 387:1918 da 006; 575:483 é entrada da 003, não esta página.
Consultar Design/Make e registrar composição, estados e divergências antes
do layout. Layout adapta-se ao conteúdo, não elimina informações para caber.
Não houve consulta Figma nem ao PDF ERS nesta revisão.

Dependências: 001/002 (fundação/shell), 003 (entrada), 004 (conceitos), 005
(encaminhamento não obrigatório), 007 (formulário/reuso), 008 (regra editorial),
013 (ajuda), 016 (acessibilidade), 017 (fallback).
Documentos existentes não comprovam implementação. MC-03/MC-05 e revisão
institucional permanecem abertas nas entregas afetadas.

## Critérios de aceite

| ID | Cenário e resultado esperado |
| --- | --- |
| CA01 | URL direta/recarga sem dados prévios oferece a preparação completa. |
| CA02 | Entrada real da etapa 2 chega à rota correta. |
| CA03 | Três tópicos e 13 informações seguem a ordem e os destinos do contrato. |
| CA04 | Desconhecido é distinto de gratuito/dispensado; exemplos não inventam regras. |
| CA05 | Formulário acessível com qualquer contagem, inclusive zero. |
| CA06 | Visitar, marcar e sair da 006 preserva integralmente a Carta, inclusive sem storage. |
| CA07 | Ajuda acessível em /ajuda, sem suporte duplicado. |
| CA08 | Teclado/leitor operam links, expansão e marcações com foco e anúncios coerentes. |
| CA09 | Desktop/tablet/celular, texto ampliado e reflow sem cortes ou rolagem horizontal. |
| CA10 | Conteúdo versionado e estado isolado de preparação; nenhuma leitura/escrita da Carta. |
| CA11 | Preparação não certifica preenchimento, aprovação ou publicação. |
| CA12 | Referências visuais consultadas, comparação registrada e divergências resolvidas. |
| CA13 | Inicial 0/13; marcar dois IDs dá 2/13, repetir não duplica, desmarcar reduz; exemplo não inicializa estado. |
| CA14 | Navegação interna mantém marcações; recarga reinicia; expansão não altera progresso. |
| CA15 | Reuso por controle respeita tópico aberto, limite da descrição, públicos e condições S/E. |
| CA16 | Recorrência informa ausência de campo v3; imediato não induz valor/unidade fictícios. |

Próxima entrega: aplicar o plano e as tarefas locais somente após autorização
de implementação e resolução das dependências pertinentes.

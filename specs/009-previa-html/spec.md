# Spec: Prévia HTML

Reconciliada em 19/10/2026 pela T008 documental.
[Versão anterior](historico/2026-10-19-pre-t008-spec.md).

## Objetivo e fontes

Permitir revisar a Carta atual, inclusive parcial, em /previa e no formulário,
sem criar segunda Carta ou publicar informações. HTML significa interface
de leitura local, não arquivo exportado ou página pública.

Fontes: [matriz v3](../007-formulario-carta-servico/matriz-campos-v3.md),
[contrato da projeção](contrato-projecao-v3.md), sessão/retorno da 007,
regras editoriais da 008 e navegação compartilhada.
O contrato de projeção contém a tabela normativa de 25 definições, convenções
de ausência/defaults, listas, condições e fixtures PV01–PV18.

## Requisitos funcionais

### RF01 — Acesso

Manter /previa por link, URL direta e recarga, sem exigir diagnóstico, login,
preparação, completude ou exportação. Reutilizar shell/breadcrumb e manter
título/explicação de revisão local, sem selo de aprovação ou promessa de aceite.
Fallback em ambiente publicado pertence à 017. Não adicionar rota ao menu por inferência.

### RF02 — Fonte e continuidade

Consumir o provider v3 da 007 acima das rotas. Derivar da revisão atual também
com card montado; sem snapshot editável, storage próprio ou migração no render.
Preservar fonte, IDs e ordem. Usar avisos de recuperação/memória da 007;
provider ausente é falha de integração, carregamento não é vazio.
Versões/estruturas inseguras seguem recuperação da 007, sem recuperar parcialmente
por regras inventadas na 009.

### RF03 — Cobertura integral

Exibir cinco partes na ordem da 007 e 25 definições do contrato da projeção:
7 sobre o serviço, 8 público/requisitos, 3 por etapa, 5 atendimento e 2 finais.
Categorias, tópico, Ativo, públicos/perfis, custo/prazo separados, títulos/
orientações/modalidade das etapas e palavras-chave estão incluídos.
Condições K/S/E omitem somente valores inativos, preservados na fonte.
Rótulos vêm do conteúdo/catálogos da 007; textos nunca são resumidos/corrigidos.
Nenhum consumidor amplia o modelo por orientação da 006.

### RF04 — Dados parciais e vazio

Seguir hasContent do contrato: seleções são dados, default Ativo false isolado
não é; agendamento false explícito conta. Carta com dados mostra todos os campos
aplicáveis, inclusive opcionais vazios, como Não informado.
Manter itens de edição com ausências identificadas, sem filtrar etapas/lacunas.
Lista vazia não significa dispensa. Sem conteúdo, exibir mensagem e Preencher
Carta; itens vazios podem gerar aviso separado, não card fictício.
Ativo exibe estado booleano com ressalva de default; MC-05 continua aberta.

### RF05 — Pendências e retorno

Regras estruturais são da 007, não da 008. Distinguir erro/falha de resultado
sem pendências; erro não oculta dados. Sugestões da 008 são orientativas,
sem outro motor na prévia, e nenhum status editorial bloqueia ações permitidas.
Resumo fica separado dos valores; correção abre parte/foca alvo do registro da
007 com fallback por item removido/condição inativa. Não anunciar aprovação
institucional quando não houver erros.

### RF06 — Ações

Editar informações → /formulario-carta; Ver tutorial → /tutorial-paraiba-digital;
ajuda → /ajuda, preferindo ação compartilhada. Destinos sempre livres.
Exportar CSV só com ação real da 010, que valida estruturalmente o snapshot
capturado no clique; não usar resumo cacheado como permissão. Falha estrutural
impede apenas CSV. Sem ação fictícia enquanto a 010 não estiver entregue.
Sem download HTML/PDF, impressão, publicação ou cópia por campo (responsabilidade 012).

### RF07 — Conteúdo e componente compartilhado

Um view model puro e um CartaPreview para rota e prévia embutida nas cinco
partes da 007. Não duplicar seletores, markup de valores, copy ou estados.
Contextos só variam contêiner, nível de heading, prefixo DOM e ações externas.
Conteúdo editorial fora do JSX; dados digitados somente no provider.
Atualizações não roubam foco nem anunciam o card inteiro.

## Segurança, acessibilidade e layout

Renderizar localmente texto literal, sem HTML/Markdown interpretado, iframe,
linkificação ou recursos remotos derivados dos valores. Não registrar dados em logs nem enviá-los a serviços externos.
Sem edição na prévia, backend, nova persistência ou sincronização entre abas.
Reutilizar Inter/tokens; único main/h1 por página, títulos/listas/labels semânticos,
prefixos únicos por instância, foco visível e anúncios discretos. Manter altura
natural, quebras e texto integral em telas estreitas/ampliação, sem ellipsis.
Verificar Chrome/Edge/Firefox/Safari e leitores conforme disponibilidade da 016.

## Referências e dependências

Node 821:308 é referência compartilhada do card, não evidência de página completa.
Consultar Design YaVUdqYa3boHpvGrxf4ZJ5 e Make dVm7lEZdBFqOiiySWLWUqp/0:1
antes de implementar visual; adaptar layout à cobertura, não o contrário.
Figma e ERS não foram consultados externamente nesta rodada; copy requer revisão.
Dependências: 001/002 (shell), 007 (v3/sessão/estrutura/foco), 008 (editorial),
010 (CSV), 011/012 (tutorial/cópia), 013 (ajuda), 016/017 (acessibilidade/deploy).
Rotas existentes não comprovam jornadas entregues.

## Critérios de aceite

| ID | Cenário e resultado esperado |
| --- | --- |
| CA01 | /previa acessível por revisão, URL e recarga sem gates. |
| CA02 | Cobertura das 25 definições aplicáveis, valores/seleções integrais. |
| CA03 | Atualização do provider reflete-se nas duas prévias sem snapshot obsoleto. |
| CA04 | Carta parcial mantém dados e ausências de todos os campos aplicáveis. |
| CA05 | Inicial/defaults/itens vazios não criam card fictício; avisos separados. |
| CA06 | Custo selecionado/detalhe/zero/ausência distintos, sem inferir gratuidade. |
| CA07 | Agendamento Sim/Não/null corretamente distinto, sem inferir resposta de legado. |
| CA08 | Documentos e etapas parciais exibem seus atributos; não criar campos ausentes do v3. |
| CA09 | Reordenação/remoção conserva IDs e sequência atual da 007, sem mutar fonte. |
| CA10 | Editar e retornar preserva Carta e abre/foca alvo ou fallback correto. |
| CA11 | Estrutura 007 e editorial 008 separados; prévia/tutorial continuam livres. |
| CA12 | 010 valida snapshot atual; só erro/falha estrutural impede CSV. |
| CA13 | Recuperação/memória/carregamento/provider ausente têm estados verdadeiros. |
| CA14 | Markup, URLs, acentos, espaços e quebras são texto literal sem execução/remoto. |
| CA15 | Teclado/leitor identifica regiões e ações; sem foco/anúncio integral em atualizações. |
| CA16 | Texto extenso, mobile, zoom/reflow preservam conteúdo integral. |
| CA17 | Fonte única e copy versionada; nenhuma publicação, persistência própria ou HTML/PDF. |
| CA18 | Referências consultadas e layout adaptado ao conteúdo, com evidência visual futura. |
| CA19 | Condições K/S/E respeitadas, sem revelar/apagar valores inativos retidos. |
| CA20 | Mesmo componente/view model nos dois contextos, sem IDs DOM repetidos. |
| CA21 | Ativo false não comprova confirmação; seleções isoladas e prazo parcial não somem. |

Nenhum critério funcional é considerado executado pela T008 documental.

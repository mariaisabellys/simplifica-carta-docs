# Plan: Suporte por e-mail

## Objetivo e status

Substituir o placeholder de `/ajuda/suporte-email` por orientacao de contato,
endereco institucional, abertura explicita do aplicativo de e-mail, copia
do endereco e alternativa manual. Preservar a Carta e a navegacao da sessao.

Este plano prepara `/spec:tarefas`. Nao implementa codigo, formulario de envio,
SMTP ou backend; notificacoes do agendamento pertencem a 014. Nenhuma mensagem
real foi enviada ou area de transferencia acessada nesta etapa.

## Fontes e limites

- Spec 015, plano 013, plano 014 e contrato de copia proposto na 012.
- Constitution, regras para IA, documentos locais de produto e ADR-003.
- SuporteEmailPage, App, ButtonLink, rotas, estrutura de content e package.json.
- RFC 6068 e documentacao de Clipboard.writeText, referenciadas ao final.

A rota ja existe, mas a pagina apresenta apenas PageHeader e PlaceholderCard
com `gesed.semtd@gmail.com`. Nao ha mailto, copia, breadcrumb ou fonte
compartilhada de contato implementados. ButtonLink e um anchor simples;
navegacao interna precisa seguir contrato da 002 para preservar estado em
memoria. Nao existe framework de testes configurado no projeto atual.

Nao houve leitura do PDF do ERS, consulta direta ao Figma ou confirmacao de
atividade/titularidade do contato. O endereco tem referencia documental,
nao validacao operacional. Registrar confirmacao da equipe, responsavel e data
antes da implementacao do canal ativo. A nota de ausencia da 016 na spec e
historica: a pasta agora existe, sem comprovar requisitos implementados.

## Abordagem tecnica

### 1. Fonte unica de contato e disponibilidade editorial

Criar `src/content/support/contatos.ts` com objeto tipado de suporte GESED,
consumido pela 015 e pela 013 quando ela apresentar contato ou estado do canal.
Endereco exibido, destinatario do link e texto copiado derivam desse objeto.
Nao manter constantes independentes no JSX ou duplicar endereco na ajuda.

Proposta de dados em contatos.ts: id estavel, nome da equipe e endereco.
Estado editorial `pendente | ativo | pausado` e aviso pertencem somente a
canais.ts, compartilhado com 013/014/015; contato referencia suporte-email.
Mapa/tipos de canais e configuracao inicial agora existem. Evidencia de validacao
(responsavel, data e fonte) fica na documentacao de implementacao, sem dados
internos desnecessarios no bundle. Estado ativo significa canal validado para
publicacao; nao implica resposta imediata ou monitoramento em tempo real.

Endereco editorial oficial: `gesed.semtd@gmail.com`, conforme a secao
`E-mail institucional` do documento mestre. Nao substituir por endereco
inventado ou tentar verificar enviando mensagem sem autorizacao. O estado
inicial e `pendente`: exibir somente como referencia documentada, com aviso,
sem `mailto:` ou copia ativa. CA02 continua pendente ate validacao operacional.

Para pausa confirmada, manter pagina acessivel com aviso verdadeiro e retorno
a ajuda. Suspender mailto/copia como acoes principais do canal pausado; endereco
pode permanecer como referencia explicitamente indisponivel, conforme texto
validado. Mostrar alternativa de agendamento sem prometer vagas. Reutilizar
configuracao editorial da 013 para nao anunciar estados contraditorios.

### 2. Conteudo e composicao da pagina

Usar `src/content/ajuda/suporte-email.ts` para titulo, introducao, orientacoes,
exemplos, rotulos, mensagens de copia e destinos. Conteudo e texto estruturado,
sem HTML interpretado ou dados preenchidos pelo usuario.

Composicao proposta, a confirmar no Figma:

1. Titulo e finalidade orientativa do canal.
2. Contato legivel, link para abrir aplicativo e botao de copia.
3. Alternativa manual sempre visivel, proxima das acoes.
4. Orientacoes e exemplo ilustrativo de assunto.
5. Retorno a ajuda, alternativa de atendimento e formulario da Carta.

Orientar nome, orgao/setor, etapa relacionada, descricao objetiva da duvida e
resultado esperado no proprio e-mail. Nao coletar esses valores no aplicativo.
Propor exemplo de assunto `Duvida sobre a elaboracao da Carta de Servicos`,
com acentuacao na copy final e identificacao de exemplo. Nao inserir nomes
ficticios ou placeholders como se fossem dados reais.

Explicar que o usuario revisa e envia no aplicativo externo. Orientar a nao
enviar senhas, documentos pessoais ou dados de cidadaos; nao exigir Carta,
CSV ou anexos. Nao inventar prazo, funcionamento ou promessa de aprovacao.

### 3. Link mailto e abertura explicita

Adotar destinatario fixo e apenas assunto generico versionado:
`Dúvida sobre a elaboração da Carta de Serviços`. Nao predefinir corpo no MVP;
as orientacoes ficam legiveis na pagina e o usuario escreve a mensagem.
Essa escolha reduz texto no URI e dispensa formulario ou captura de sessao.

Construir href derivado da fonte compartilhada, com valor do assunto
percent-encoded em UTF-8, uma unica vez. Nao aplicar codificacao ao URI inteiro
nem usar concatenacao de texto do usuario. Se corpo for aprovado futuramente,
codificar tambem quebras CRLF conforme RFC 6068 e revisar o contrato.
Restringir parametros a assunto aprovado; sem cc, bcc, headers arbitrarios,
credenciais, dados da Carta ou parametros recebidos da URL.

Usar anchor real com nome `Abrir aplicativo de e-mail`, ativado por clique ou
teclado. Nao interceptar `mailto:` como rota SPA e nao abrir automaticamente
em effect, montagem ou navegacao. Nao exigir target=_blank nem janela auxiliar.

Nao gerar estado de sucesso depois de clicar, timer de deteccao de aplicativo,
protocolo ou mensagem enviada. O aplicativo nao comprova abertura, envio,
recebimento ou leitura. Manter explicacao e alternativa manual visiveis antes
e depois da tentativa, sem depender de detectar handler instalado.

### 4. Copia e alternativa manual

Copiar somente o endereco exato da fonte unica, sem `mailto:`, assunto, markup
ou texto adicional. Preferir utilitario compartilhado `copiarTexto` proposto
na 012 se ja estiver implementado; senao criar helper neutro de texto que ambas
features possam reutilizar. Nao importar feature de Carta/tutorial para copiar
contato e nao condicionar esta pagina a conclusao da 012.

Chamar Clipboard.writeText na acao explicita do usuario. Tratar ausencia da API,
contexto inseguro e rejeicao da promise. Nao ler clipboard nem exigir consulta
previa de permissao. Nao usar fallback com copia invisivel e sucesso presumido.

Estado local `idle | pending | copied | failed`, com trava imediata durante a
tentativa e identificador para ignorar resultado antigo apos desmontagem ou
mudanca de contato. Confirmar `Endereço copiado` somente apos promise resolvida.
Em falha: `Não foi possível copiar. Selecione o endereço e copie manualmente.`
Nova tentativa e permitida; retornar resultado nao limpa ou salva Carta.

Propor confirmacao visivel por cinco segundos, reiniciada em nova tentativa;
erro permanece ate nova tentativa. Limpar timer na desmontagem e invalidar
retorno ao alterar endereco. Mensagem em regiao de status acessivel, proxima
ao controle; foco permanece no botao, sem depender apenas de toast ou cor.

Endereco deve estar sempre em texto selecionavel e permitir quebra visual
sem inserir espacos/caracteres no valor. Instruir: abrir webmail/aplicativo
de preferencia, criar mensagem e usar o endereco como destinatario. Nao
adicionar links de login de provedores ou exigir aplicativo especifico.

### 5. Navegacao, privacidade e continuidade

Manter rota atual sem router paralelo. Breadcrumb: Inicio > Preciso de ajuda >
Suporte por e-mail, com pagina atual identificada. Reutilizar shell, titulo
de documento e contrato de foco da 002, sem duplicar main/header/footer.

Links internos explicitos para `/ajuda`, `/ajuda/atendimento-agendado` e
`/formulario-carta`, com href real e navegacao preservando provider da 007.
Nao depender exclusivamente de history.back. Navegar ao agendamento nao
consulta, reserva ou registra solicitacao nesta pagina.

SuporteEmailPage nao importa hooks/storage da Carta ou diagnostico. Nao cria
rascunho, formulario, API, persistencia ou analytics com dados da sessao.
Indisponibilidade do backend de agendamento nao impede consultar o contato.
Abrir mailto pode levar o usuario a outro aplicativo; nao limpar sessao em
blur/visibilitychange e nao prometer preservar dados depois de encerrar a sessao.

## Arquivos e componentes provaveis

| Arquivo/area | Intervencao prevista |
| --- | --- |
| `src/pages/SuporteEmailPage.tsx` | Substituir placeholder e compor contato, orientacoes e retornos. |
| `src/content/support/contatos.ts` | Fonte unica de ID/equipe/endereco, sem estado duplicado. |
| `src/content/support/canais.ts` | Estado/aviso unicos para 013/014/015; configuracao pendente. |
| `src/content/pages/suporte-email.ts` | Copy, assunto generico, exemplos e mensagens. |
| Helper de copia compartilhado | Reutilizar contrato da 012 ou criar em pasta utilitaria neutra. |
| Componentes UI/navegacao existentes | Reutilizar links, botoes, PageHeader e breadcrumb conforme 002. |
| CSS de suporte e tokens existentes | Reflow, endereco selecionavel, foco e mensagens locais. |
| `src/pages/AjudaPage.tsx` e conteudo da 013 | Importar contato/estado somente quando necessario; evitar duplicacao. |
| Mapa Figma e implementation-plan | Registrar frame, evidencias visuais e validacao institucional. |

Contato e copia podem ficar na pagina; extrair componente apenas quando houver
reuso ou contrato que justifique. Conferir infraestrutura real antes de criar
helper/hook duplicado. Nao alterar backend ou notificacoes da 014.

## Visual e acessibilidade

Antes de implementar, identificar frame no Figma Design
`YaVUdqYa3boHpvGrxf4ZJ5`, pagina `167:2`, e consultar Figma Make
`dVm7lEZdBFqOiiySWLWUqp`, node `0:1`, via MCP. `169:495` e ajuda/FAQ,
nao frame comprovado desta pagina. Registrar composicao, estados, assets e
adaptacao responsiva no implementation-plan e atualizar mapa local.

Se houver formulario de envio no prototipo, resolver divergencia com spec/ERS
antes do codigo; nao ampliar backend para reproduzir visual sem decisao.
Reutilizar Inter, tokens, foco visivel, ordem coerente de DOM e headings.
Botao de copia usa type=button e nome acessivel; icones decorativos ocultos.
Links e botoes operam por teclado, com retorno anunciado sem mudar foco.
Permitir endereco longo, fonte ampliada e controles em coluna nas telas menores,
sem largura fixa ou corte. Seguir requisitos transversais da 016 desde esta tela.

## Estrategia de verificacao

| Criterios | Evidencia prevista |
| --- | --- |
| CA01/CA10 | Ajuda, agendamento, acesso direto, recarga, breadcrumb e destinos internos. |
| CA02/CA09 | Uma fonte atualiza endereco visivel, mailto e texto copiado; estado coerente com 013. |
| CA03/CA08 | URI correto e assunto decodificado; acao explicita sem envio automatico ou falso sucesso. |
| CA04–05 | Alternativa sempre visivel; clipboard resolve/rejeita/ausente; tentativa duplicada e desmontagem. |
| CA06 | Checklist editorial de contexto, exemplo, limites e ausencia de exigencia de anexos. |
| CA07 | Carta preenchida preservada ao navegar e retornar; nenhum valor nos links, clipboard ou requests. |
| CA11 | Teclado/leitor de tela, foco, regiao de status, zoom e endereco longo em tela pequena. |
| CA12–13 | Pausa confirmada, alternativas verdadeiras, fonte versionada, Figma e ausencia de backend/coleta. |

Reutilizar suite frontend quando disponivel para contratos de href/copia e
integracao de navegacao. Nao instalar framework apenas para testar texto
estatico. Simular clipboard e acionamento de URI; nao enviar e-mail real nem
sobrescrever clipboard do usuario em teste automatizado de integracao.

Na implementacao, executar typecheck/build e testes disponiveis. Verificar
Chrome, Edge, Firefox e Safari, com e sem aplicativo configurado, sem concluir
envio no aplicativo externo. Registrar ambiente e resultado de abertura como
verificacao manual, sem generalizar para todos os dispositivos. Conferir
larguras 1440/1024/768/390/320 px, ampliacao/reflow e comportamento por teclado.

Esta etapa verificou apenas documentacao e codigo de referencia; nenhum build,
teste de browser ou funcionalidade de envio/copia foi executado.

## Riscos e pendencias

- Contato nao confirmado: validar com equipe antes de implementar canal ativo;
  sintaxe ou presenca no placeholder nao comprovam operacao.
- App externo ausente: alternativa manual permanente, sem deteccao presumida.
- Copia recusada: retorno verdadeiro e endereco selecionavel.
- Carta perdida por reload interno: integrar navegacao/provider de 002/007.
- Contatos/estados divergentes: fonte unica compartilhada com 013.
- Figma ou ERS divergentes: registrar e resolver antes de adicionar coleta/envio.
- Copy institucional pendente: validar escopo e destinatario, sem prazo inventado.

## Referencias tecnicas

- [RFC 6068: esquema mailto e codificacao](https://www.rfc-editor.org/rfc/rfc6068).
- [Clipboard.writeText: contexto seguro, promise e falhas](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText).

Essas referencias apoiam o contrato tecnico, sem validar atividade do endereco
institucional ou permissao de clipboard no dispositivo do usuario.

## Proximo passo

Executar `/spec:tarefas 015-suporte-email`. Depois consolidar contato validado,
copy, compartilhamento com 013/012 e Figma em `implementation-plan.md`, seguido
de `/spec:validar` antes de `/spec:implementar`.

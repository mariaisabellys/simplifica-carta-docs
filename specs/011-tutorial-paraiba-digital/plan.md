# Plano: Tutorial Paraíba Digital

Reconciliado documentalmente em 20/10/2026 na T011. Não é entrega funcional.
Referências: [spec](spec.md), [contrato de integração](contrato-integracao-v3.md),
[contrato 012](../012-copia-dados-tutorial/contrato-transferencia-v3.md) e
[navegação compartilhada](../../docs/arquitetura/contrato-navegacao.md).
Versão anterior preservada no [histórico](historico/2026-10-20-pre-t011-plan.md).

## Decisões

1. Uma página /tutorial-paraiba-digital, seis estados de etapa livres.
   Preparação é transversal/etapa 4 e ajuda é transversal, não sétima tela.
2. 007 fornece Carta v3 segura; 012 apresenta os cinco grupos/25 definições e
   controla cópia/manual; 011 compõe página e editorial sem duplicar mecanismos.
3. Rótulos e instruções vêm do conteúdo; valores vêm da sessão. Nenhum exemplo,
   endereço fictício ou lorem ipsum substitui Carta vazia/parcial.
4. Escolhas não têm botão; abertos preenchidos copiam individualmente. Não usar
   lista fixa, contagem de botões ou gate estrutural/editorial/CSV.
5. O layout se amplia ao conteúdo. Node 564:980 não define quantidade máxima.
6. Nenhuma conta, API externa, publicação automática, progresso persistido,
   segunda Carta, telemetria textual ou limpeza de sessão ao concluir.

## Sequência de execução

| Ordem | Entrega | Dependência / verificação |
| --- | --- | --- |
| 1 | Levantar fonte administrativa, ERS e autorização dos assets | Fonte/contexto/perfil/data por instrução; ausência mantém bloqueio operacional |
| 2 | Preencher matriz externa de 25 paths | Contrato de integração; não confundir pendente com sem equivalente |
| 3 | Sincronizar paraiba-digital.ts | Concluído em 27/10/2026: contrato 25/13/12, sem exemplos; outras cinco etapas e export preservados |
| 4 | Consultar Design/Make e conciliar layout | Seis nodes do mapa; consulta não homologa processo externo |
| 5 | Integrar navegação e sessão compartilhadas | Provider acima das rotas e URL completa, sem parser paralelo |
| 6 | Compor tutorial e montar região da 012 só na etapa 4 | CTAs únicos, alvos reais, isolamento de falha e dados atuais |
| 7 | Testar e submeter revisão | IT01–IT11, TR da 012, CA01–CA20; registrar resultados efetivos |

## Conteúdo e fontes

A migração exata, matriz externa, destino dos exemplos/lorem ipsum e registro
de evidências estão no contrato de integração. Nenhuma URL administrativa,
data de revisão institucional ou correspondência foi confirmada nesta rodada.
Não publicar objetos com href #, fonte fictícia ou reviewedAt igual à data
deste plano. O portal público não comprova acesso administrativo.

Manter texto essencial legível sem imagem; assets locais autorizados com
origem/data/contexto, legenda e alt, sem credenciais/dados reais. Revisar
menus, permissões, Salvar rascunho, Salvar, análise e publicação por evidência.
Não alterar silenciosamente outras etapas para aparentar homologação.

## Composição, sessão e falhas

Reusar shell, breadcrumb e PageHeader; um h1, título da etapa e progresso
acessível. Percentuais 17/33/50/67/83/100. Etapa 1 sem anterior; 2–5 com
anterior/próxima; 6 com anterior/Concluir Guia. Navegação livre sem requisito
de diagnóstico, Carta, revisão ou CSV.
`Concluir Guia` retorna à home `/`, preservando a sessão da Carta e sem
representar confirmação da publicação externa.

Região tutorial-dados é da 012. Renderizar todos os aplicáveis com estados
de ausência; falha de integração não vira sessão vazia nem provider paralelo.
Recuperação/storage são responsabilidade da 007. CTAs de preencher/editar,
prévia /previa e ajuda /ajuda usam navegação compartilhada, sem duplicação.
Retorno à edição e âncoras seguem o contrato de integração. Valores ocultos
permanecem na fonte, mas não aparecem nem são transferidos.

Operações pendentes da 012 sobrevivem à desmontagem no coordenador acima das
rotas; UI/timers não sobrevivem. Não cancelar promessa ficticiamente ou anunciar
sucesso de valor antigo ao retornar. Apenas ação explícita escreve clipboard.
Link externo verificado abre nova aba com aviso/rel apropriado sem enviar Carta.

## Verificação prevista

O [plano detalhado](implementation-plan.md) relaciona arquivos e ordem.
A [matriz IT01–IT11](contrato-integracao-v3.md#matriz-de-testes-integrados-previstos)
cobre todos os CA01–CA20, incluindo condições, fontes, foco e preservação.
Testes de estrutura não substituem revisão humana das instruções externas.

Validar Chrome/Edge/Firefox/Safari e dispositivos reais conforme 016, teclado,
NVDA/VoiceOver, 320/390/768/1024/1440 px, texto 200%, zoom 400%, imagens ausentes
e texto longo. Registrar versões/ambientes realmente executados; mocks não
atestam clipboard real. Executar typecheck/build/suíte após implementação.
Nada disso foi executado nesta tarefa documental.

# Plan: Cópia de dados no tutorial

T010, 19/10/2026. [Anterior](historico/2026-10-19-pre-t010-plan.md).
Seguir [spec](spec.md) e [contrato v3](contrato-transferencia-v3.md).

## Arquitetura

Provider 007 → seletor puro das 25 definições → região tutorial-dados com cinco
grupos → campo aberto ou escolha sem botão. Projeção readonly e valores originais;
nenhum formatador CSV, storage, copy do DOM ou edição no tutorial.
011 monta região só na etapa 4; sincronização editorial T011 foi concluída em
27/10/2026, sem implementar a região.
Escolhas compartilham rótulos da 007/009, não geram botões por terem string.

Coordenador de cópia em memória acima das rotas, separado do domínio: chave
sessão/path/item, requestId/revisão/generation e trava até promise finalizar.
UI monta/desmonta sem liberar escrita pendente; limpa timers/feedback locais.
Utilitário src/lib/clipboard.ts já existe, mas não entrega seletor/controlador/UI.

## Ordem futura

1. Conferir provider/registro/011 e a sincronização T011 concluída; consultar visual.
2. Implementar matriz, estados/âncoras e projeção de cinco grupos.
3. Implementar coordenador, feedback e manual conforme contrato.
4. Integrar etapa 4 e testar controles, foco, remount e source intacta.
5. Executar navegadores/colagem real, acessibilidade e relatórios.

Riscos: exemplos transferidos, escolhas copiáveis, valores inativos expostos,
agregação indevida de listas, confirmação obsoleta e trava perdida em remount.
TR01–TR17 cobrem os casos. Sem timers fingindo cancelamento externo.
Não liberar implementação integral por existência deste plano: provider,
composição 011, Figma/ERS/copy e ambientes reais permanecem dependências.

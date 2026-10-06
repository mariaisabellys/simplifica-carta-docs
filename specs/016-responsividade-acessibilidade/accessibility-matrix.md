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

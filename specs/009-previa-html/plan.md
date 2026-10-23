# Plan: Prévia HTML

19/10/2026 — T008 documental. [Plano anterior](historico/2026-10-19-pre-t008-plan.md).
Seguir [spec](spec.md) e [projeção v3](contrato-projecao-v3.md); não usar snippets antigos.

## Arquitetura e decisões

Provider 007 → seletor puro → CartaPreview compartilhado → contêiner de rota
ou embutido. Estado de domínio e recuperação pertencem à 007; apresentação
não modifica arrays/textos nem cria storage. View model readonly sem cache persistido.
Usar todos os campos aplicáveis; opcionais vazios permanecem identificáveis.
Manter itens parciais/vazios em Carta com dados e números atuais, sem filtros
que aparentem sequência completa. Condicionais omitidos não são apagados.

Estrutura da 007 gera resumo de pendências/falha; 008 não é gate de exportação
nem motor duplicado. 010 captura/valida snapshot no clique. Seus contratos
funcionais ainda precisam ser entregues/testados, não presumidos por documentos.
Ativo tem projeção booleana conservadora; semântica MC-05 segue pendente.

## Componentes e arquivos futuros

| Artefato | Responsabilidade |
| --- | --- |
| src/features/carta/carta.preview.ts | View model tipado v3, hasContent e seletor puro. |
| src/content/pages/previa-carta.ts | Rótulos/avisos/ações, sem valores da sessão. |
| src/components/carta/CartaPreview.tsx | Leitura semântica segura compartilhada, prefixo único por instância. |
| PreviewField, se justificar | Apresentar valor/ausência em dl sem interpretar texto. |
| src/pages/PreviaCartaPage.tsx | Fonte, avisos, resumo estrutural e ações; substituir placeholder. |
| Formulário 007 | Compor o mesmo card/model nas cinco partes. |
| Estilos com escopo | Reflow/altura natural/tokens/Inter, sem truncar. |
| Testes e relatórios | Fixtures PV01–PV18, jornadas e evidências reais. |

Navegação segue [contrato compartilhado](../../docs/arquitetura/contrato-navegacao.md).
AppLink/ButtonLink e shell concentram histórico/foco; correção usa registro da 007.
Não copiar antigas props de navegação como API vigente.

## Sequência e dependências

1. Conferir fonte/runtime/componentes, contratos e redação.
2. Consultar node 821:308/Make e estados de página; preservar 25 campos.
3. Implementar/testar seletor tipado e conteúdo, depois card nos dois contextos.
4. Integrar sessão, retorno, estrutura e ações reais (CSV depende de 010).
5. Verificar segurança, texto integral, reflow/assistivo e atualizar relatórios.

Riscos: defaults falsamente confirmados, omissão de seleções, dados inativos
expostos, listas filtradas, IDs DOM duplicados, foco roubado e aprovação falsa.
Mitigações no contrato e PV01–PV18. Figma/ERS/copy, semântica MC-05,
validação defensiva da 007, exportação e ambientes reais seguem dependências.
A documentação não comprova implementação; testes e build são futuros.

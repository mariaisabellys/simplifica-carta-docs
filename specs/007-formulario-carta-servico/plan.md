# Plan — Formulário da Carta v3

Baseline: 27/10/2026. Prontidão documental: MC-02–MC-08 fechadas;
implementação integrada e verificações executáveis ainda não iniciadas.

## Fontes

[Spec](spec.md), [matriz](matriz-campos-v3.md), [modelo central](modelo-central-carta.md), conteúdo/tipos/catálogos/schema/validação/storage/CSV locais e contrato de navegação compartilhado. Não houve consulta Figma/ERS nesta rodada.

## Arquitetura proposta

Montar CartaSessionProvider acima das páginas, dentro da composição global, sem recriar por rota ou parte. Disponibilizar Carta imutável atual, atualização por ações, revisão de conteúdo e estado de storage por useCartaSession. A UI guarda parte aberta, orientação expandida e foco separadamente do domínio.

Modelo persistido: objeto CartaServico v3 diretamente, na chave simplifica-carta:sessao. O provider é dono da leitura/escrita; páginas e consumidores não carregam cópias editáveis próprias.

## Edição e ações

Ações tipadas para textos de sobreServico/publicoRequisitos/informacoesFinais, escolhas de catálogo, custo/prazo, agendamento e itens por ID. Não aceitar um setter genérico sem validação de propriedade/valor. Coleções usam IDs gerados uma vez; etapas renumeram ordem após alteração da sequência, preservando IDs.

Troca de categoria limpa subcategoria incompatível e gera aviso. Troca de custo preserva detalhe inativo; troca de agendamento preserva configurações. Aplicabilidade K/S/ON/E deve ser reutilizada nos consumidores.

Ativo permanece boolean false inicial e opcional: false representa Inativo na
Carta, sem afirmar interação ou estado externo. Documentos admitem zero itens;
cada item existente exige nome. Etapas exigem ao menos um item completo. Prazo
aceita inteiro positivo canônico e unidade, conforme a matriz.

## Sessão e falhas

O carregamento precisa de resultado discriminado: empty, restored, invalid, unsupported ou unavailable. Os helpers existentes retornam apenas Carta/boolean e precisam evoluir na implementação para não ocultar falhas.

Hidratação antecede gravação. Registro inválido/anterior/futuro permanece intocado; Carta vazia em memória é acompanhada de aviso e gravação suspensa. Uma ação explícita autoriza substituir o registro pela Carta atual. Falha de escrita muda estado para memória apenas, mantendo todos os valores.

Não persistir feedback, foco, erros ou checklist editorial como campos da Carta. Snapshot de revisão inclui revisão do conteúdo; mudança invalida confirmação antiga. Não depender de unmount para salvar últimas alterações; estratégia de escrita após atualização deve ser testada antes de adotar debounce.

O decoder verifica formato e segurança, não completude. Deve rejeitar
propriedades, tipos, enums, relações entre escolhas presentes, máximo de públicos,
valores repetidos em seleções, IDs e ordem inválidos. Deve recuperar campos/listas
obrigatórios ainda vazios e itens incompletos para que a revisão aponte os erros.
A recuperação é estrita e atômica: não coagir, deduplicar nem reparar
silenciosamente. Migração futura só entra com contrato e fixtures aprovados.

## Identidade e foco

Usar registro central campo → parte → controle. IDs DOM propostos: carta-<fieldId>; itens: carta-document-<id>-name e carta-step-<id>-title/guidance/modality. Codificar IDs técnicos para uso seguro no DOM e resolver somente alvos conhecidos.

Ao solicitar correção: abrir parte, aguardar montagem, focar controle. Alvo removido retorna ao grupo/lista com aviso, nunca a índice que aponta para outro item. Campos inativos direcionam ao controle da condição, sem reativar dados automaticamente.

Navegação de rota respeita o contrato compartilhado; foco específico de correção deve ter prioridade coordenada sobre foco padrão do shell. Revisão explícita anuncia resumo; digitação não move foco.

## Validação e conclusão

Usar validação estrutural compartilhada para campos gerais e condicionais; separar resultados editoriais da 008. Required/type/catalog/cardinality são verificações distintas. Revisão usa snapshot atual de todas as partes aplicáveis, inclusive partes não visíveis.

Estado de conclusão: revisão estrutural completa, sem erros e revision igual à Carta atual. Falha ou alteração retira confirmação. Copy “Tudo pronto para publicar” deve ser ajustada para completar informações obrigatórias, mantendo publicação manual e revisão editorial separadas. Não condicionar acesso ao tutorial à conclusão.

## Consumidores

| Feature | Contrato |
| --- | --- |
| 006 | Orientações por IDs da matriz; lacunas em T006. |
| 008 | Estrutura e sugestões sem mutação; [contagem compartilhada](../../docs/arquitetura/contrato-contagem-palavras.md) definida na T005, implementação pendente. |
| 009 | Componente/view model único na rota e no formulário. |
| 010 | Valida e exporta o mesmo snapshot, com campos v3 e condicionais ativos. |
| 011/012 | Etapa 4 mostra todas as definições aplicáveis; texto aberto copiável, escolhas sem botão. |
| 016 | Foco, mensagens, listas, zoom e reflow em toda a jornada. |

## Arquivos de implementação previstos

| Arquivo/área | Trabalho futuro |
| --- | --- |
| carta.types/schema/catalogs | Manter v3; implementar prazo, listas e condições K/S/ON/E sem duplicar fonte. |
| carta.storage | Retorno discriminado, preservação do registro inválido e escrita controlada. |
| CartaSessionProvider / useCartaSession | Criar fonte única acima das páginas. |
| carta.reducer / registro de campos | Ações tipadas, aplicabilidade, IDs, partes e foco. |
| FormularioCartaPage / componentes por parte | Compor cinco partes e listas reais com conteúdo versionado. |
| FormField / resumo / orientações | Associar instruções, erros e controles acessíveis. |
| Conteúdo formulario-carta | Ajustar condições S/ON/E, filho de documento, kind de detalhe, mensagens e copy de conclusão. |
| Testes de domínio e UI | Sessão, condições, listas, foco, consumidores e regressão v3. |

## Verificação e riscos

Testar Carta inicial, preenchimento parcial, catálogos inválidos, cardinalidades, custo/prazo, null/false/true, externo/nativo, condições retidas e mutação indevida. Testar ID estável, add/remove/reorder por teclado, última tecla antes de navegação e recarga, storage bloqueado, JSON inválido e versão não suportada sem sobrescrita.

Verificação de consumidores exige implementações reais; helper isolado não comprova integração. Visual exige consulta aos nodes registrados na spec e inspeção em navegador, com 320/390/768/1024/1440 px, zoom/texto ampliado, teclado e leitores disponíveis.

Não conservar limites antigos candidatos de 8 MiB/1000 itens como regras aprovadas. Definir limites técnicos por necessidade e medição, sem truncamento.

## Dependências antes de implementar cada parte

MC-02–MC-08 estão fechadas na matriz de 27/10/2026. T005 definiu a contagem e
T007 as regras editoriais; ambas ainda exigem implementação. Componentes visuais
dependem de consulta Figma. Modelo, decoder, provider e UI já podem seguir os
contratos, sem declarar consumidoras prontas antes dos testes integrados.

Histórico: [plano anterior](historico/2026-10-19-pre-t004-plan.md).

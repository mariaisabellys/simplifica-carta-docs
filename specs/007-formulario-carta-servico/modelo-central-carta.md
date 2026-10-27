# Modelo central da Carta de Serviço — versão 3

## Fonte oficial

Decisão registrada em 16 de outubro de 2026. O conteúdo oficial da feature 007
é `src/content/pages/formulario-carta.ts`; catálogos e relações condicionais
ficam em `src/features/carta/carta.catalogs.ts`; o contrato persistido fica em
`src/features/carta/carta.types.ts` e seu estado inicial em `carta.schema.ts`.

Este documento prevalece sobre tabelas históricas incompatíveis nos artefatos
006–012. Nenhuma feature consumidora deve manter uma segunda representação
editável da Carta.

A [matriz canônica de campos v3](matriz-campos-v3.md), registrada em 19/10/2026
pela T003, detalha IDs, paths, controles, condições, consumidores e divergências
observadas. A matriz distingue regras estabelecidas de implementação ainda
pendente e comportamento atual do código. A reconciliação dos demais artefatos da 007
foi registrada na T004; a T005 definiu o
[contrato compartilhado de contagem](../../docs/arquitetura/contrato-contagem-palavras.md).
As decisões estruturais MC-02–MC-08 foram encerradas documentalmente em
27/10/2026 na matriz canônica.

## Cinco partes e campos

1. **Sobre o serviço:** nome, nome popular, descrição de até 20 palavras significativas,
   categoria, subcategoria condicionada à categoria, tópico e estado ativo.
2. **Público e requisitos:** até dois públicos específicos, um ou mais perfis,
   quem pode utilizar, documentos, custo de escolha única e prazo estruturado.
3. **Como o serviço funciona:** etapas ordenadas com ID, título, orientação ao
   cidadão e modalidade.
4. **Atendimento:** resposta explícita sobre agendamento e, quando aplicável,
   tipos, sistema e dados condicionais do sistema externo.
5. **Informações finais:** informações adicionais e palavras-chave.

## Regras estruturais

- Descrição: no máximo 20 palavras significativas no campo inteiro, conforme
  contrato compartilhado. O helper atual ainda conta tokens totais; MC-01 está
  resolvida documentalmente, mas a adaptação do código e seus testes permanecem
  pendentes. A 008 usa a mesma contagem por frase, somente para revisão editorial.
- Categoria e subcategoria: valores fechados; trocar categoria invalida a
  subcategoria que não pertença ao novo catálogo.
- Público específico: zero a dois entre Servidor, Cidadão e Empresa.
- Perfil do usuário: múltipla escolha com pelo menos um valor.
- Custos: `gratuito`, `sob-consulta` ou `com-taxa`, nunca combinações. Detalhe
  obrigatório para consulta ou taxa; URL informada deve ser absoluta HTTP(S),
  com hostname e sem credenciais.
- Prazo: valor máximo como inteiro positivo canônico e unidade do catálogo.
  Zero, decimal, imediato e ausência de estimativa não integram o modelo v3.
- Documentos: coleção opcional; cada item existente exige nome útil.
- Etapas: ao menos uma; cada item exige título, orientação e modalidade.
- Ativo: estado configurado opcional; false significa Inativo, sem comprovar
  interação do usuário, publicação ou despublicação externa.
- Agendamento: `null` significa não informado. Tipos só são aplicáveis com
  `true`; sistema só é aplicável quando tipos incluem on-line; link e exibição
  só são aplicáveis quando essa parcela on-line usa sistema externo.
  Valores condicionais podem ser preservados na sessão, mas consumidores não
  os apresentam nem transferem quando estiverem inativos.
- Documentos e etapas possuem IDs estáveis; IDs não são exportados nem exibidos.
- Palavras-chave têm origem direta na parte 5 e não podem ser inferidas.
- Recorrência e canais genéricos não integram a versão 3 da Carta.

## Consumidores

- 008 valida o mesmo modelo e não cria campos.
- 009 apresenta apenas valores aplicáveis e informados.
- 010 exporta o snapshot da versão 3, omitindo dados condicionais inativos.
- 011 apenas orienta a transferência.
- 012 projeta valores da versão 3 na etapa 4 da 011.
- 006 pode orientar a coleta de informações adicionais, mas seus itens não
  ampliam automaticamente o modelo central.

## Compatibilidade

O storage usa `versao: 3`. Dados legados sem decoder seguro não são mesclados
superficialmente; a aplicação inicia uma Carta v3 vazia e deve informar a falha
de recuperação quando a interface do provider for implementada. O decoder é
estrito para formato, tipos, propriedades, catálogos, relações presentes,
cardinalidades máximas, IDs, ordem e duplicatas; não corrige nem deduplica
silenciosamente. Incompletude é recuperada e tratada pela revisão, não como
registro corrompido.

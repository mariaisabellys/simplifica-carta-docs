# Implementation Plan: Prévia HTML

T008 documental — 19/10/2026.
[Snippets anteriores preservados](historico/2026-10-19-pre-t008-implementation-plan.md).
Código proposto abaixo é contrato de implementação futura, não arquivo entregue.

## Fontes e estado

Consultados os seis documentos anteriores da 009, tipos/schema/catálogos v3,
PreviaCartaPage (ainda placeholder), matriz e contratos de sessão/foco da 007,
regras editoriais T007 e mapa/referências locais. Sem consulta externa Figma/ERS,
compilação ou testes funcionais. Provider/cartão/projeção precisam de entrega real.

Fontes normativas: [projeção v3](contrato-projecao-v3.md) e
[navegação](../../docs/arquitetura/contrato-navegacao.md).
Design: YaVUdqYa3boHpvGrxf4ZJ5, node 821:308; Make dVm7lEZdBFqOiiySWLWUqp/0:1.
Não afirmar medidas/estados confirmados sem consulta futura.

## Contrato técnico do view model

Manter cinco objetos tipados correspondentes ao v3, sem array heterogêneo ou
JSON como valor visível. Cada string/seleção projetada tem present/missing;
campo inativo tem estado explícito inactive e nunca carrega texto retido no
view model. Listas readonly com ID e número atuais, filhos tipados. Dados
técnicos não viram campos exibidos. Mapas de rótulos derivam dos catálogos da 007.

Interface documental mínima para flags (não substitui a matriz integral):

```ts
import type { CartaServico } from "./carta.types";

type PreviewValue =
  | { status: "present"; text: string }
  | { status: "missing" }
  | { status: "inactive" };

const projectText = (value: string): PreviewValue =>
  value.trim().length ? { status: "present", text: value } : { status: "missing" };

function previewConditions(carta: CartaServico) {
  const K = carta.publicoRequisitos.custo.tipo === "sob-consulta" ||
    carta.publicoRequisitos.custo.tipo === "com-taxa";
  const S = carta.atendimento.exigeAgendamento === true;
  const ON = S && carta.atendimento.tiposAgendamento.includes("online");
  const E = ON && carta.atendimento.sistemaAgendamento === "sistema-externo";
  return { K, S, ON, E };
}
```

Não converter seleções/booleanos para string com coerção genérica. Implementar
mapas exaustivos de rótulos e flags segundo contrato; preservação de strings
não é normalização editorial. HasContent inclui seleções e ativo true, exclui
ativo false isolado e dados inativos. Modelo vazio pode ter aviso de itens em
edição sem card fictício. Etapas não são filtradas: ordem atual da 007 é mantida.

## Componente e integração

CartaPreview recebe model readonly, copy, headingLevel e idPrefix único.
Nenhum hook de sessão/validação/download dentro dele. Prefixo só identifica a
instância; IDs de edição continuam os do registro da 007. Não usar índice como key.
PreviewField usa dt/dd e renderiza texto literal; listas dentro de regiões
rotuladas. Componente compartilhado não tem main/h1 fixos. Rota e formulário
fornecem contêiner e ações, não duplicam seletores nem campos.

PreviaCartaPage lê provider; carregamento antes de vazio se houver inicialização
assíncrona. Ausência do provider exibe falha de integração, não cria outra Carta.
Recuperação/avisos pertencem à 007; não escrever storage nem executar decoder
durante render. Invalidar memoização pela revisão atual; sem cache persistido.

Resumo estrutural usa revisão atual da 007. Adapter futuro distingue sucesso
com erros, sucesso sem erros e falha; helper existente retorna array, não
objeto de resultado discriminado. Não copiar snippet que acessa status nele.
Editorial usa 008 somente se estado já estiver disponível e atual; não inicia
motor próprio, não bloqueia ações e não certifica publicação.
010 captura/valida snapshot no clique; nenhum exportador local na 009.

## Retorno e foco

Rota usa AppLink/ButtonLink do contrato compartilhado. Editar sempre possui
href real; clique modificado/nova aba/histórico funcionam nativamente.
Correção usa target autorizado da 007: abre a parte, aguarda montagem e foca
controle; item removido → grupo, condicional inativo → condição, sem reativação.
Não usar valores pessoais em URL ou querySelector de fragmento arbitrário.
Coordenar foco de rota e campo para uma transferência final, não duas concorrentes.
Atualização durante digitação mantém foco/scroll; resumo não anuncia card inteiro.
No contexto embutido, mesmo resolvedor atua localmente; não remontar provider.

## Layout e segurança

Texto React literal, sem interpretação de HTML/Markdown, iframe ou URL ativa.
Nenhum recurso remoto originado das entradas; não registrar dados em logs.
White-space pre-wrap/overflow-wrap e altura natural; sem ellipsis, recorte ou
colunas que mudem a leitura. Inter/tokens e fonte fallback. Avisos distintos
dos valores; estado Ativo não equivale à publicação. Dois contextos compartilham
as mesmas regras, variando só composição/níveis de heading/prefixo/ações.
Consultar Figma para medidas/assets e testar mudanças de conteúdo no layout.

## Plano de testes e evidência

PV01–PV18 no contrato são roteiro futuro. Para seletor, congelar objetos/arrays,
usar sentinelas distintas nos 25 campos, verificar texto e IDs sem mutação,
sem dados condicionais inativos na saída. Testar dois contextos com mesmo snapshot
e mudanças do provider. Renderização de markup não cria tags/requests.
Testar retorno para parte fechada, alvo removido e condições alteradas, storage
bloqueado/recuperação inválida e dados parciais. Não considerar placeholder/stub
como jornada entregue. CSV requer 010 funcional; leitura pode ser testada antes.

CA01–CA21 têm rastreabilidade em tasks. Após código: npm run typecheck,
npm run build e suíte existente adequada; não instalar framework apenas para
contar labels. Registrar ambientes reais/versões e resultados por CA; roteiro
quickstart antes de entrega. Comparação visual/assistiva conforme F009-11/016.

## Pendências

Consulta Figma/ERS e copy; implementação das decisões MC-02–MC-08 da 007;
provider e registro de foco reais;
ação CSV 010; recarga publicada/fallback 017; testes funcionais/visuais.
T008 fecha projeção documental, não homologa modelo nem implementa a prévia.

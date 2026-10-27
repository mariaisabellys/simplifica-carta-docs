# Implementation Plan

## O que e

O `implementation-plan.md` e um arquivo de apoio criado antes da etapa de implementacao de uma funcionalidade.

Ele funciona como um plano de implementacao detalhado, com estrutura tecnica, mapeamento visual, arquivos que devem ser criados ou alterados e codigos base em React/TypeScript/CSS para orientar quem vai implementar.

O objetivo e reduzir dependencia de consultas longas ao Codex, ao MCP do Figma e a IAs com muitos tokens disponiveis. Com esse arquivo, uma pessoa colaboradora consegue implementar uma funcionalidade usando uma base mais direta, ja alinhada aos documentos do projeto e as referencias visuais.

## Onde fica

Cada funcionalidade visual ou complexa deve ter seu próprio `implementation-plan.md` dentro da pasta da spec. Para escopos simples, a dispensa deve ser justificada em `plan.md`, conforme a [convenção documental](../specs/README.md). Fundação e features sem interface são avaliadas pela complexidade dos contratos, não apenas pela presença de tela.

```txt
specs/
  002-home-e-navegacao/
    spec.md
    plan.md
    tasks.md
    implementation-plan.md
    quickstart.md
```

## Quando usar

O `implementation-plan.md` deve ser criado depois de:

1. `spec.md`
2. `plan.md`
3. `tasks.md`

E antes de:

```txt
/spec:implementar
```

Fluxo recomendado:

```txt
/spec:criar
/spec:planejar
/spec:tarefas
/spec:plano-implementacao
/spec:validar
/spec:implementar
/spec:revisar
```

## Novo comando interno

O comando sugerido para criar ou revisar esse arquivo e:

```txt
/spec:plano-implementacao
```

Exemplo:

```txt
/spec:plano-implementacao 002-home-e-navegacao
```

Ao receber esse comando, o Codex deve:

- identificar a funcionalidade;
- ler `spec.md`, `plan.md` e `tasks.md`;
- consultar o ERS, roadmap e documentos em `docs/`;
- consultar o Figma Design quando houver tela envolvida;
- consultar o Figma Make quando houver componentes, tokens ou estilos;
- ler o codigo existente;
- escrever um `implementation-plan.md` detalhado;
- incluir codigo base suficiente para orientar a implementacao.

## Por que isso e importante

O projeto possui multiplos colaboradores. Nem todas as pessoas terao acesso a uma IA com assinatura premium, grande limite de tokens ou acesso ao MCP do Figma.

O `implementation-plan.md` ajuda porque concentra, em um unico arquivo:

- o contexto da funcionalidade;
- as decisoes tecnicas;
- as referencias do Figma;
- os arquivos afetados;
- os contratos dos componentes;
- os codigos base;
- as regras de implementacao;
- os criterios de validacao.

Assim, uma pessoa pode implementar com uma instrucao curta, por exemplo:

```txt
Implemente a spec 002 seguindo exatamente o implementation-plan.md.
```

## Relacao com os outros arquivos da spec

O `implementation-plan.md` nao substitui `spec.md`, `plan.md` ou `tasks.md`.

Cada arquivo tem uma funcao:

- `spec.md`: define o que a funcionalidade precisa entregar.
- `plan.md`: explica a abordagem tecnica.
- `tasks.md`: quebra o trabalho em tarefas pequenas.
- `implementation-plan.md`: mostra como implementar, com codigo base e referencias visuais.
- `quickstart.md`: explica como verificar a funcionalidade depois de pronta.
- `validation.md`: registra consistência e prontidão documental atuais.
- `verification.md`: registra entrega parcial/final e verificações efetivamente executadas.

O quickstart pode ser preparado antes da implementação, com os passos identificados como previstos. O relatório de verificação diferencia esses passos dos resultados observados.

## O que deve conter

Um bom `implementation-plan.md` deve conter:

- status do plano;
- fontes consultadas;
- objetivo da implementacao;
- arquivos a criar;
- arquivos a alterar;
- mapeamento com Figma Design;
- mapeamento com Figma Make;
- estrutura visual da tela ou funcionalidade;
- contratos de componentes;
- codigo base em React/TypeScript;
- CSS ou tokens sugeridos;
- conteudo estruturado necessario;
- regras de implementacao;
- criterios de validacao.

## Uso do Figma Design

Quando a funcionalidade envolver uma tela, o `implementation-plan.md` deve registrar o node oficial do Figma Design.

Referencia atual do prototipo:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
tipo: Figma Design
```

O Figma Design deve orientar:

- layout;
- fluxo;
- composicao da tela;
- ordem das secoes;
- hierarquia visual;
- comportamento esperado da pagina.

Sempre que possivel, o plano deve informar o `nodeId` especifico da tela.

## Uso do Figma Make

Quando a funcionalidade envolver componentes, tokens, estilos ou responsividade, o `implementation-plan.md` deve registrar a consulta ao Figma Make.

Referencia atual do design system:

```txt
fileKey: dVm7lEZdBFqOiiySWLWUqp
nodeId: 0:1
tipo: Figma Make
```

O Figma Make deve orientar:

- cores;
- tipografia;
- espacamentos;
- bordas;
- sombras;
- botoes;
- cards;
- navegacao;
- formularios;
- padroes responsivos;
- componentes reutilizaveis.

## Codigo base dentro do arquivo

O `implementation-plan.md` deve conter codigo base quando isso ajudar a reduzir trabalho e tokens.

Isso inclui, por exemplo:

- codigo da pagina;
- codigo dos componentes;
- tipos TypeScript;
- props esperadas;
- objetos de conteudo;
- CSS sugerido;
- funcoes auxiliares;
- exemplos de uso.

Exemplo de componente dentro do plano:

````md
### `src/components/ui/InfoBanner.tsx`

```tsx
type InfoBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export function InfoBanner({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: InfoBannerProps) {
  return (
    <section className="info-banner">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <a className="button-link button-link--secondary" href={actionHref}>
        {actionLabel}
      </a>
    </section>
  );
}
```
````

Exemplo de CSS dentro do plano:

````md
### CSS sugerido

```css
.info-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-6);
  padding: var(--space-6);
  background: var(--color-background-highlight);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
}
```
````

## Nivel de fidelidade esperado

Para telas baseadas no Figma, o codigo base do `implementation-plan.md` deve ser fiel ao design consultado.

Isso significa:

- preservar estrutura da tela;
- preservar hierarquia visual;
- usar os textos previstos ou indicar onde o conteudo deve entrar;
- respeitar tokens e componentes existentes;
- manter responsividade;
- evitar criar padroes visuais novos sem necessidade;
- adaptar o codigo para a stack real do projeto.

O codigo vindo do Figma ou de IA deve ser tratado como referencia. Ele deve ser adaptado para o projeto, usando a estrutura existente em `src/`.

## Regras para quem implementa

Ao implementar usando um `implementation-plan.md`:

- siga os arquivos indicados no plano;
- evite alterar escopo que pertence a outra spec;
- nao copie codigo de forma cega se ele conflitar com a estrutura atual;
- mantenha conteudo institucional em `src/content` quando possivel;
- use componentes existentes antes de criar novos;
- mantenha os dados da Carta apenas em sessao;
- rode as verificacoes indicadas no plano.

## Validacao recomendada

Cada `implementation-plan.md` deve indicar como validar a implementacao.

Validacoes comuns:

```txt
npm run typecheck
npm run build
```

Para telas, tambem verificar:

- desktop;
- tablet;
- mobile;
- foco visivel;
- contraste;
- navegacao por links/botoes;
- aderencia ao Figma Design;
- uso correto dos tokens do Figma Make.

## Quando o arquivo e obrigatorio

O `implementation-plan.md` deve ser obrigatorio para:

- paginas;
- componentes visuais;
- formularios;
- fluxos guiados;
- funcionalidades com Figma;
- funcionalidades com varias partes tecnicas;
- qualquer tarefa que sera executada por colaboradores com pouco contexto.

Pode ser opcional para ajustes pequenos, correcao de texto ou mudancas internas muito simples.

Registrar a dispensa e a cobertura equivalente em `plan.md`, com escopo, motivo, data e responsável. As regras completas de aplicabilidade e estados ficam em [specs/README.md](../specs/README.md).

## Atualização e evidência

O plano detalhado deve acompanhar o modelo e os contratos vigentes. Snippets não compilados devem ser identificados como exemplos não verificados; snippets incompatíveis com a versão atual devem ser corrigidos ou movidos ao histórico datado, preservando requisitos ainda válidos. Uma nota de precedência no topo não torna código antigo uma base segura para implementação.

Registrar fontes realmente consultadas e consultas pendentes separadamente. O status documental não substitui aceite funcional/visual. Antes de executar tarefas dependentes, conferir o parecer atual em `validation.md`; após trabalho e checks, registrar resultados em `verification.md`. Seguir a convenção de histórico de `specs/README.md` sem alterar retroativamente evidências anteriores.

## Template sugerido

```md
# Implementation Plan: Nome da Funcionalidade

## Status

Em elaboração. Informar a base examinada e as dependências; atualizar a prontidão após validação documental registrada em validation.md.

## Fontes consultadas

- Spec: `specs/000-exemplo/spec.md`
- Plan: `specs/000-exemplo/plan.md`
- Tasks: `specs/000-exemplo/tasks.md`
- Figma Design:
  - fileKey:
  - nodeId:
- Figma Make:
  - fileKey: `dVm7lEZdBFqOiiySWLWUqp`
  - nodeId: `0:1`

## Objetivo da implementacao

Descrever em poucas linhas o que sera implementado.

## Arquivos a alterar

- `src/...`

## Arquivos a criar

- `src/...`

## Mapeamento visual

Descrever secoes, componentes e comportamento esperado.

## Contratos de componentes

Descrever props, tipos e responsabilidades.

## Codigo base

Incluir codigo React/TypeScript/CSS necessario.

## Regras de implementacao

Listar limites e cuidados.

## Validacao

Listar comandos e verificacoes visuais.
```

## Ajustes realizados no projeto

Esta estrategia foi adotada oficialmente no projeto com os seguintes ajustes:

- inclusao do novo comando interno `/spec:plano-implementacao`;
- atualizacao da constitution;
- atualizacao do README;
- atualizacao de `docs/ia/regras-para-ia.md`;
- atualizacao de `docs/ia/guia-uso-codex.md`;
- atualizacao de `docs/ia/prompts-padroes.md`;
- atualizacao de `specs/README.md`;
- inclusao de `implementation-plan.md` como arquivo esperado nas specs.

## Proximo uso recomendado

Na proxima funcionalidade, o fluxo recomendado e:

```txt
/spec:criar 002-home-e-navegacao
/spec:planejar 002-home-e-navegacao
/spec:tarefas 002-home-e-navegacao
/spec:plano-implementacao 002-home-e-navegacao
/spec:validar 002-home-e-navegacao
/spec:implementar 002-home-e-navegacao
```

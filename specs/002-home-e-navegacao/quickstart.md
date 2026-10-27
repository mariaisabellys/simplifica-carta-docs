# Quickstart: Home e Navegacao

> Roteiro previsto; não executado na T017. O package atual não possui script
> `test`; resultados só podem ser registrados em `verification.md` após execução.

## Objetivo

Verificar a home e o shell compartilhado depois da implementacao da spec
`002-home-e-navegacao`.

## Pre-requisitos

- Node.js em versao compativel com o projeto;
- dependencias instaladas com `npm install`;
- spec 002 validada sem bloqueios;
- assets da home exportados do Figma e salvos localmente.

## Verificacoes automatizadas

Executar:

```bash
node --test tests/navigation.test.mjs
npm run typecheck
npm run build
```

O teste existente cobre apenas a guarda de links, não a home, foco ou navegação
integrada. Criar/usar a infraestrutura de UI prevista antes do aceite e
registrar os resultados realmente observados.

## Executar localmente

```bash
npm run dev
```

Abrir o endereco informado pelo Vite, normalmente:

```txt
http://localhost:5173/
```

## Roteiro funcional

1. Abrir `/` e confirmar que a home nao exibe o placeholder da fundacao.
2. Confirmar a marca `Simplifica Carta` e o subtitulo `Guia de Servicos`.
3. Confirmar o hero com:
   - `Menos burocracia, mais praticidade.`;
   - `Selecione a experiencia que melhor atende as suas necessidades: um guia
     completo do inicio ao fim ou acesso livre as secoes da Carta de Servico.`;
   - `Iniciar guia` com destino `/diagnostico`;
   - `Explorar por etapas` com `href="/explorar-por-etapas"`.
4. Confirmar `Como funciona o processo?`, a introducao aprovada e quatro etapas
   na ordem:
   - `Entenda` — `Identificar um servico`;
   - `Reuna` — `Organizar informacoes`;
   - `Desenvolva` — `Elaborar carta`;
   - `Conclua` — `Simular publicacao`.
5. Confirmar que `Simular publicacao` aponta para o tutorial de cadastro manual
   no Paraiba Digital.
6. Confirmar o CTA educativo com:
   - chamada `Nao sabe por onde comecar?`;
   - titulo `Conheca primeiro o que e uma Carta de Servicos`;
   - descricao `Entenda o que caracteriza uma Carta de Servicos e qual e sua
     finalidade`;
   - botao `O que e a Carta de Servico?` apontando para
     `/o-que-e-carta-de-servicos`.
7. Confirmar header e footer institucionais.

Aplicar acentuacao correta aos textos renderizados.

## Limite de integracao com a feature 003

A spec 002 deve criar links reais com `href="/explorar-por-etapas"`, mas nao
registra `ExplorarPorEtapasPage` nem cria placeholder para essa rota. A pagina
de destino passa a funcionar quando `/spec:implementar 003-explorar-por-etapas`
for executado.

Antes disso, validar somente o `href` do link. Nao considerar a ausencia da
pagina 003 um defeito da implementacao da home.

## Navegacao e acessibilidade

- Confirmar na header apenas `Inicio`, `O que e a Carta?`, `Duvidas frequentes`
  e `Preciso de ajuda`.
- Confirmar que `Material de apoio` nao aparece.
- Confirmar `aria-current="page"` em `Inicio` na home.
- Navegar por todos os controles usando somente teclado.
- Verificar foco visivel e ordem coerente.
- Em tela estreita, abrir e fechar o menu e conferir `aria-expanded`.
- Confirmar que o menu fecha depois de navegar.
- Confirmar que `/ajuda#duvidas-frequentes` leva o foco para a ancora prevista.
- Verificar exatamente um `h1` na home.
- Confirmar textos alternativos e imagens decorativas com `alt=""`.

## Responsividade

Validar:

- 1440 px;
- 1024 px;
- 768 px;
- 390 px;
- 320 px;
- zoom de 200%.

Em todos os tamanhos, confirmar ausencia de corte, sobreposicao e scroll
horizontal. No smartphone, hero, processo, CTA e footer devem ficar empilhados
sem alterar a ordem de leitura.

## Comparacao visual

Comparar a versao desktop com o Figma Design:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
nodeId: 310:175
```

Confirmar hero, arte, quatro etapas, CTA educativo, header e footer. Registrar
como divergencias intencionais:

- ausencia de `Material de apoio` na header;
- ausencia de `Materiais de apoio` e `Guia de Linguagem Simples` no footer;
- texto da quarta etapa deixando explicito o cadastro manual.

## Resultado esperado

A verificacao esta aprovada quando a home segue a hierarquia do Figma, todos os
links possuem destinos honestos, a navegacao funciona por teclado, os tamanhos
alvo nao apresentam quebra e os comandos automatizados terminam sem erros.

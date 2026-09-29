# Quickstart: Diagnostico de Servico Publico

## Objetivo

Verificar o questionario em `/diagnostico`, o motor de decisao e a pagina
`/diagnostico/resultado` depois da implementacao da feature 005.

## Status documental

- `spec.md`, `plan.md`, `tasks.md` e `implementation-plan.md` presentes;
- perguntas, respostas e regras iniciais versionadas em
  `src/content/diagnostico/`;
- Figma Design `387:1020` consultado com screenshot;
- leitura detalhada dos recursos internos do Figma Make ainda deve ser
  concluida antes da implementacao visual definitiva.

## Pre-condicoes

- feature 002 implementada ou contratos reais de shell e navegacao novamente
  conferidos;
- spec 005 validada sem bloqueios;
- recursos do Figma Make reconsultados ou fornecidos por exportacao;
- assets oficiais salvos localmente e sem URLs temporarias;
- dependencias instaladas;
- infraestrutura de testes configurada com script `npm run test`.

## Fontes de verdade

- apresentacao e perguntas:
  `src/content/diagnostico/perguntas.ts`;
- textos dos cinco resultados:
  `src/content/diagnostico/respostas.ts`;
- regras condicionais:
  `src/content/diagnostico/condicoes.ts`.

Componentes visuais nao podem duplicar esses textos nem implementar uma segunda
arvore de decisao.

## Comandos tecnicos

```sh
npm run test
npm run typecheck
npm run build
```

Os tres comandos devem terminar sem erros. A suite deve incluir a enumeracao
das `3^8 = 6.561` combinacoes validas.

## Executar localmente

```sh
npm run dev
```

Abrir o endereco informado pelo Vite e acessar:

```txt
http://localhost:5173/diagnostico
```

## Estrutura esperada

Confirmar, nesta ordem:

1. header compartilhado;
2. breadcrumb;
3. indicador das quatro etapas gerais, com a etapa 1 ativa;
4. rotulo `Diagnóstico Interativo`;
5. titulo `Isso é mesmo um serviço?`;
6. subtitulo aprovado;
7. tres destaques introdutorios;
8. progresso `Pergunta N de 8`;
9. um unico card de pergunta;
10. opcoes `Sim`, `Não` e `Não tenho certeza`;
11. controles do passo e acao para recomecar;
12. footer compartilhado.

Deve existir somente uma pergunta ativa no DOM e exatamente um `h1` por
pagina.

## Verificacao do fluxo

1. Confirmar que `Continuar` permanece indisponivel sem resposta.
2. Responder a primeira pergunta e avancar.
3. Confirmar progresso `Pergunta 2 de 8`.
4. Voltar e verificar que a resposta anterior continua selecionada.
5. Alterar a resposta e avancar novamente.
6. Percorrer as oito perguntas.
7. Confirmar que a ultima acao e `Ver resultado`, nao
   `Organizar informações`.
8. Concluir e verificar navegacao para `/diagnostico/resultado`.
9. Confirmar que apenas um resultado e exibido.
10. Usar `Refazer diagnóstico` e verificar retorno limpo a pergunta 1.

## Matriz minima de resultados

Legenda:

- `S`: Sim;
- `N`: Não;
- `?`: Não tenho certeza.

### Servico publico

| P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Resultado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S | S | S | S | N | S | S | N | É um serviço público |

Confirmar que P5 = `Não` nao impede o resultado.

### Autosservico

| P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Resultado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S | S | S | S | S | S | S | S | É um autosserviço |

P8 identifica o subtipo somente depois que os criterios principais forem
satisfeitos.

### Etapa de outro servico

| P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Resultado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N | S | S | N | S | N | S | N | Pode ser uma etapa de outro serviço |

### Processo interno

| P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Resultado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| N | N | N | S | N | N | N | N | Pode ser um processo interno |
| N | N | N | N | N | N | N | S | Pode ser um processo interno |

Confirmar que P4 pode ser `Sim` ou `Não` e P8 nao altera o padrao interno.

### Analise adicional por duvida essencial

| P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Resultado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S | S | S | ? | S | S | S | N | Precisamos analisar melhor |

Repetir com `?` isolado em P1, P6 e P7.

### Analise adicional por duas duvidas

| P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | Resultado |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| S | ? | S | S | ? | S | S | N | Precisamos analisar melhor |

### Analise adicional por contradicao

Verificar separadamente:

| Regra | Exemplo minimo | Resultado |
| --- | --- | --- |
| P1 = S e P6 = N | S, S, S, S, S, N, S, N | Precisamos analisar melhor |
| P2 = N e P5 = S | N, N, S, N, S, S, S, N | Precisamos analisar melhor |
| P4 = S, P1 = N e P6 = N | N, S, S, S, N, N, S, N | Precisamos analisar melhor |

O padrao interno completo deve continuar prevalecendo sobre a terceira
contradicao. Se P4 for `Não tenho certeza`, a duvida essencial prevalece e o
resultado e `Precisamos analisar melhor`.

## Verificacao da pagina de resultado

Para cada um dos cinco IDs:

- conferir titulo e descricao contra `respostas.ts`;
- confirmar ausencia das oito respostas, regras, pesos ou pontuacao;
- confirmar foco inicial no titulo da orientacao;
- confirmar `Refazer diagnóstico`;
- confirmar que servico e autosservico podem seguir para
  `/organizar-informacoes`;
- confirmar que analise adicional pode seguir para `/ajuda`;
- confirmar que etapa e processo interno nao abrem o formulario
  automaticamente.

## Sessao e acesso direto

1. Responder tres perguntas e recarregar a pagina.
2. Confirmar restauracao da pergunta e respostas na mesma aba.
3. Concluir, recarregar o resultado e confirmar o mesmo resultado recalculado.
4. Abrir `/diagnostico/resultado` sem sessao valida.
5. Confirmar redirecionamento ou acao clara para iniciar o diagnostico.
6. Inserir payload invalido na chave de sessao e recarregar.
7. Confirmar descarte seguro, sem resultado inventado.
8. Refazer e confirmar remocao das respostas anteriores.

Verificar que:

- somente `sessionStorage` e usado para esta feature;
- nao existe uso de `localStorage`;
- nao existem chamadas a backend;
- nenhum dado da Carta e alterado;
- texto de resultado nao e confiado diretamente do storage.

## Navegacao

- acessar pela home com `Iniciar guia`;
- acessar por `/explorar-por-etapas` com `Iniciar diagnóstico`;
- acessar pela header, quando previsto pelo shell;
- abrir `/diagnostico` diretamente e recarregar;
- testar voltar e avancar do navegador;
- confirmar URL real e ausencia de roteador paralelo;
- confirmar rolagem ao topo e restauracao de foco.

## Acessibilidade

- percorrer todo o fluxo somente com teclado;
- confirmar `fieldset`, `legend`, radios nativos e labels clicaveis;
- confirmar foco visivel em radios, links e botoes;
- confirmar foco na nova pergunta ao avancar ou voltar;
- confirmar anuncio de `Pergunta N de 8` sem repeticao excessiva;
- confirmar que a selecao nao depende apenas de cor;
- validar contraste WCAG 2.1 AA;
- testar leitor de tela, zoom de 200% e reflow;
- testar `prefers-reduced-motion`;
- confirmar que checks e demais icones decorativos sao ignorados pelo leitor
  de tela.

## Responsividade

Validar:

- 1440 px: introducao e card em duas colunas;
- 1024 px: composicao sem compressao do card;
- 768 px: transicao coerente para uma coluna;
- 390 e 320 px: destaques, radios e controles empilhados.

Nao pode haver corte, sobreposicao ou scroll horizontal. Perguntas e labels
longos devem crescer conforme o conteudo.

## Comparacao visual

Comparar a versao desktop com:

```txt
fileKey: YaVUdqYa3boHpvGrxf4ZJ5
nodeId: 387:1020
```

Confirmar:

- hierarquia entre introducao e card;
- breadcrumb e etapa geral ativa;
- titulo com destaque laranja;
- checks ciano;
- card branco, borda, raio e sombra;
- progresso adaptado de cinco para oito perguntas;
- opcoes em duas colunas no desktop e uma coluna no mobile;
- Inter como fonte principal;
- ausencia intencional de `Material de apoio`;
- navegacao condicional no lugar do CTA antecipado do prototipo;
- correspondencia de cada asset local com node, slot e geometria.

## Resultado esperado

A verificacao esta aprovada quando o fluxo possui oito perguntas acessiveis,
os cinco resultados seguem o motor versionado, as 6.561 combinacoes sao
seguras, a sessao e temporaria, regras internas nao aparecem na interface e a
experiencia corresponde ao Figma com as divergencias aprovadas documentadas.

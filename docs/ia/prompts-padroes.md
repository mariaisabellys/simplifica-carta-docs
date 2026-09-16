# Prompts Padroes

## Criar spec

```txt
/spec:criar [nome da funcionalidade]
```

Objetivo: criar ou revisar `spec.md` com requisitos, criterios de aceite e limites da funcionalidade.

## Planejar implementacao

```txt
/spec:planejar [nome da funcionalidade]
```

Objetivo: criar ou revisar `plan.md` com abordagem tecnica, arquivos afetados e estrategia de testes.

## Criar tarefas

```txt
/spec:tarefas [nome da funcionalidade]
```

Objetivo: criar ou revisar `tasks.md` com tarefas pequenas e verificaveis.

## Criar plano de implementacao

```txt
/spec:plano-implementacao [nome da funcionalidade]
```

Objetivo: criar ou revisar `implementation-plan.md` com contexto consolidado, referencias do Figma, arquivos afetados, contratos de componentes, codigo base e validacoes para reduzir uso de tokens na etapa de implementacao.

## Validar consistencia

```txt
/spec:validar [nome da funcionalidade]
```

Objetivo: verificar consistencia entre spec, plan, tasks, implementation-plan, ERS, Figma Design, Figma Make e roadmap.

## Implementar

```txt
/spec:implementar [nome da funcionalidade]
```

Objetivo: implementar codigo seguindo a documentacao aprovada. Quando existir `implementation-plan.md`, ele deve ser a base principal da implementacao.

## Revisar

```txt
/spec:revisar [nome da funcionalidade]
```

Objetivo: revisar requisitos, acessibilidade, responsividade, aderencia ao Figma e lacunas.

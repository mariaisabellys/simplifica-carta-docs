# Decisoes Tecnicas

## Stack oficial do MVP

- React
- TypeScript
- Vite
- Tailwind CSS ou CSS modular
- Conteudo versionado no projeto
- Backend simples para atendimento agendado

## Estrutura inicial do frontend

O frontend deve ser organizado por responsabilidade:

- `src/app`: composicao da aplicacao e rotas.
- `src/pages`: paginas navegaveis.
- `src/components`: componentes reutilizaveis.
- `src/content`: conteudo institucional versionado.
- `src/features`: regras e estruturas por dominio funcional.
- `src/styles`: tokens, estilos globais e base visual.
- `src/lib`: utilitarios compartilhados.
- `src/types`: tipos globais.

## Tipografia principal

Inter e a fonte principal do projeto em titulos e textos de interface. Os
tokens `--font-display` e `--font-body` devem priorizar Inter e usar
`system-ui, sans-serif` como fallback. Referencias a Outfit, Rawline ou Source
Sans 3 nos frames do prototipo nao alteram essa decisao transversal.

## Rotas iniciais

O MVP deve prever rotas para:

- inicio;
- exploracao independente das etapas;
- explicacao sobre Carta de Servicos;
- diagnostico;
- resultado do diagnostico;
- organizacao das informacoes;
- formulario da Carta;
- previa;
- tutorial do Paraiba Digital;
- ajuda;
- atendimento agendado;
- suporte por e-mail.

## Validacao da Carta

A validacao da Carta sera executada no navegador, com foco em:

- campos obrigatorios;
- clareza minima;
- orientacoes de linguagem simples;
- mensagens de apoio sem bloquear indevidamente o usuario.

## Exportacao CSV

A exportacao CSV sera gerada localmente no navegador.

## Previa HTML

A previa HTML sera dinamica e usada para revisao visual das informacoes preenchidas. Ela nao e o formato oficial de exportacao no MVP.

## Armazenamento temporario

As informacoes da Carta devem existir apenas durante a sessao de uso. O MVP nao tera rascunhos permanentes.

A estrategia preferencial e manter os dados no estado da aplicacao e usar `sessionStorage` apenas quando for util preservar a sessao durante recarregamentos da pagina. `localStorage` nao deve ser usado para rascunhos permanentes no MVP.

## Atendimento agendado

O atendimento agendado exige backend minimo, pois envolve recebimento, registro e notificacao de dados institucionais do solicitante.

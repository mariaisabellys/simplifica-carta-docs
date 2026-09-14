# Fundacao Tecnica

## Objetivo

Definir a base tecnica que sera criada antes das funcionalidades de produto do Simplifica Carta.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS ou CSS modular
- Conteudo versionado no projeto
- Backend simples em fase posterior para atendimento agendado

## Estrutura proposta

```txt
src/
  app/
  components/
    layout/
    ui/
    forms/
  content/
    pages/
    fluxo/
    diagnostico/
    tutorial/
  features/
    carta/
    diagnostico/
    atendimento/
  pages/
  styles/
  lib/
  types/
```

## Paginas iniciais

- Home
- O que e a Carta de Servicos
- Diagnostico de servico publico
- Resultado do diagnostico
- Organizar informacoes
- Formulario da Carta
- Previa HTML
- Tutorial Paraiba Digital
- Preciso de ajuda
- Atendimento agendado
- Suporte por e-mail

## Regras iniciais

- Dados da Carta nao devem ser persistidos permanentemente no MVP.
- Conteudo institucional deve ficar fora dos componentes visuais.
- Componentes devem nascer reutilizaveis quando houver repeticao real.
- Tokens visuais devem seguir o Figma Make.
- Rotas podem iniciar como placeholders ate as specs especificas de cada tela.
- Backend de atendimento deve ser planejado separadamente antes da implementacao.

## Verificacao esperada

Depois da implementacao da fundacao tecnica:

- servidor local abre a aplicacao;
- build executa sem erro;
- rotas principais existem;
- estrutura de pastas esta criada;
- base visual inicial esta disponivel;
- modelo inicial da Carta existe;
- estrategia de sessao e CSV tem arquivos iniciais.

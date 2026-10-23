# Quickstart previsto: Tutorial Paraíba Digital

## Status

Roteiro criado documentalmente na T017. Não executado. T011 permanece parcial:
a sincronização de `src/content/tutorial/paraiba-digital.ts`, fontes externas e
assets autorizados ainda são dependências.

## Pré-condições

- conteúdo das seis etapas sincronizado e revisado por fonte/data verdadeira;
- navegação por `?etapa=1..6` e integração 012 implementadas;
- provider Carta v3 disponível, sem gate para consultar instruções;
- URL oficial/assets autorizados confirmados; dados sempre sintéticos.

## Massa sintética

- sessão vazia, parcial, completa e recuperação/storage indisponível;
- cinco grupos/25 definições, coleções repetidas e condições K/S/E;
- campos abertos vazios/preenchidos e escolhas diversas;
- texto longo, imagem presente/ausente e clipboard permitido/recusado.

## Procedimento previsto

1. Abrir rota sem query, query válida, repetida e inválida; conferir normalização
   com replace, parâmetros desconhecidos preservados e histórico funcional.
2. Percorrer seis etapas: 1 sem anterior, 2–5 com anterior/próxima e 6 com
   `Concluir Guia` retornando à home sem limpar Carta.
3. Conferir progresso 17/33/50/67/83/100 e foco no título da etapa.
4. Em cada imagem, confirmar instrução textual suficiente e fallback de falha.
5. Na etapa 4, renderizar cinco grupos e todos os campos aplicáveis: abertos
   preenchidos copiam; escolhas não têm botão; vazios permanecem identificados.
6. Exercitar cópia pendente/sucesso/falha e alternativa manual sem anúncio de
   colagem, cadastro ou publicação externa.
7. Editar Carta e retornar explicitamente a `?etapa=4`; valores/revisão atuais.
8. Testar alvos ausentes/inativos/removidos e fallback `tutorial-dados`.
9. Conferir texto longo, HTML literal, 320–1440 px, zoom e teclado/leitor.

## Checks técnicos previstos

```sh
node --test tests/clipboard.test.mjs
npm run typecheck
npm run build
```

Clipboard unitário não aprova integração, query, layout ou instrução externa.
Registrar comandos/ambientes reais em verification e nunca acessar conta ou
enviar Carta ao Paraíba Digital durante o teste.

## Resultado esperado

Tutorial livre, seis estados de uma rota, etapa 4 completa e adaptável, cópia
verdadeira e instruções consultáveis sem automação externa. Fonte/visual ainda
pendentes impedem homologação operacional.

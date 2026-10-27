# Quickstart previsto: Validação em linguagem simples

## Status

Roteiro documental criado na T017. Não foi executado. Catálogo `ls-pt-BR-v1`
e mensagens `msg-pt-BR-v1` foram aprovados em 27/10/2026; implementação e
ativação continuam pendentes.

## Pré-condições

- contrato de contagem e contrato editorial aprovados para implementação;
- integração com os campos 007 sem reescrita automática;
- revisão da Carta identificada e alvos de correção autorizados;
- fixtures sintéticas sem dados pessoais.

## Fixtures mínimas

- frase com até 20 palavras significativas e outra acima do limite;
- parágrafo com 3/4 linhas medidas no layout e versão que excede;
- voz passiva e correspondente ativa; tratamento impessoal/direto;
- informação crítica na primeira frase e versão tardia;
- cada termo/catalogação, flexões previstas, acentos/NFC e caixa variada;
- ocorrências sobrepostas/repetidas e HTML literal;
- campo oculto/inativo e item removido;
- texto sem problema, com sugestão, revisão necessária e motor indisponível.

## Procedimento previsto

1. Digitar/colar cada fixture no campo aplicável e disparar validação no evento
   definido, sem anúncio a cada tecla.
2. Conferir contagem de significativas pelo contrato, separada da regra da
   descrição inteira da 007.
3. Conferir trecho, mensagem e sugestão sem alteração automática do original.
4. Confirmar deduplicação/prioridade e validade vinculada à revisão atual.
5. Corrigir o texto e verificar retirada da ocorrência sem perder foco.
6. Usar resumo para abrir parte/alvo; removido/inativo aplica fallback.
7. Simular motor indisponível: não aprovar nem bloquear por falso resultado.
8. Conferir leitura por teclado/tecnologia assistiva e geometria em reflow/zoom.

## Checks técnicos previstos

```sh
npm run typecheck
npm run build
```

O baseline não possui suite dedicada ao motor editorial. A implementação deve
criar testes das fixtures normativas e registrar o comando real, sem converter
este roteiro em resultado executado.

## Resultado esperado

Sugestões explicáveis e estáveis, ausência de falso aprovado, texto preservado
e separação entre revisão editorial e erro estrutural/exportação.

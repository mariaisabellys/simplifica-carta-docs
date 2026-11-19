# Quickstart: Prévia HTML

## Status

Projeção e componente compartilhado implementados em 18/11/2026. Os checks
técnicos foram executados; o procedimento manual de navegador/tecnologia
assistiva e o provider global continuam pendentes.

## Pré-condições

- matriz v3 e contrato de projeção vigentes;
- sessão v3 válida (integração atual); migrar para CartaSessionProvider quando a
  lacuna da 007 for entregue;
- registro de alvos 007 e navegação T015 são pré-condições para testar retorno/foco;
- 010 integrada somente quando ação CSV real estiver disponível.

## Dados sintéticos

- Carta vazia, parcial e completa;
- todos os tipos de custo/agendamento e condicionais K/S/ON/E;
- vários documentos/etapas, itens vazios/parciais e IDs estáveis;
- textos/URLs extensos, HTML literal e palavras-chave múltiplas;
- erro estrutural, sugestões editoriais e provider carregando/ausente.

## Procedimento previsto

1. Abrir `/previa` por URL e pela 007; confirmar a mesma revisão da Carta.
2. Verificar cinco grupos e as 25 definições aplicáveis, em ordem canônica.
3. Em vazio/parcial, exibir ausências conforme contrato sem criar dados/card
   fictício; loading e falha de integração não viram vazio.
4. Conferir listas repetidas, modalidade, seleções rotuladas e inativos omitidos.
5. Usar ação de correção: abrir parte e focar alvo após montagem; item removido
   ou inativo usa fallback definido sem reativar valor.
6. Conferir sugestões separadas de erros e dados sempre legíveis.
7. Repetir a prévia embutida na 007: sem segundo main/h1 ou markup divergente.
8. Testar 320–1440 px, zoom, impressão se prevista e conteúdo extremo.

## Checks técnicos previstos

```sh
node --test tests/carta-preview.test.mjs
node --test tests/*.test.mjs
npm run typecheck
npm run build
```

Esses checks não provam renderização, foco ou visual; registrar testes de
browser/assistivos separadamente quando existirem.

## Resultado esperado

Projeção somente leitura, integral e coerente nas duas superfícies; sem mutação,
truncamento, dado de exemplo ou promessa de aprovação/publicação.

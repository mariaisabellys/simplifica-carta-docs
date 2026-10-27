# Quickstart: Exportação CSV

Atualizado em 19/10/2026 — roteiro, não execução.
[Versão anterior](historico/2026-10-19-pre-t009-quickstart.md).

## Estado

Serializador genérico existe; carta.csv.ts já mapeia 22 dados v3.
Isso não entrega pipeline validado, rótulos finais, safety, BOM/Blob ou download.
[Contrato atual](contrato-exportacao-v3.md) e [verificação](verification.md).

## Checks locais disponíveis

Na raiz, com Node compatível com import de TypeScript usado pelo teste
(o registro histórico usa Node 24) e dependências do lockfile instaladas:

```sh
node --test tests/csv.test.mjs
npm run typecheck
npm run build
```

No PowerShell, npm.cmd pode ser usado. Se dependências faltarem, instalar pelo
fluxo autorizado do projeto; esta tarefa não instala nem executa checks.
Os três testes existentes não cobrem exportação completa ou fórmulas em planilha.

## Roteiro após implementação

1. Conferir F010-01–08 entregues; usar Carta sintética v3 estruturalmente válida
   conforme 007, descrição dentro de 20 significativas e condicionais completos.
2. Preencher sentinelas em todas as definições, inclusive etapas/documentos e E;
   congelar snapshot no teste e acionar exportação pela prévia real.
3. Conferir arquivo fixo, BOM único, MIME, duas colunas e 22 dados + cabeçalho
   via parser independente. Nunca contar linhas por split LF.
4. Verificar EX01–EX08, parciais nos formatadores e bloqueio estrutural no pipeline.
   Testar texto literal/multilinha, fonte intacta e condições retidas não exportadas.
5. Executar casos de safety sintéticos locais sem acesso externo (ex.: =1+1).
   Excel/Calc: abertura padrão, importação Texto e salvar/reabrir são evidências
   separadas; sem aprovação da política, não apresentar recurso como seguro.
6. Editar/exportar novamente, tentar reentrada, simular falhas/cleanup e navegar
   imediatamente. Memória sem storage deve funcionar, sem apagar Carta.
7. Registrar versões/locale/opções, CA/EX, defeitos e retestes, desempenho e
   acessibilidade; caminho indisponível fica pendente, nunca aprovado por build.

Não usar dados pessoais ou fórmulas com rede/execução. Download iniciado não
confirma salvamento. CSV não é importação homologada da plataforma.

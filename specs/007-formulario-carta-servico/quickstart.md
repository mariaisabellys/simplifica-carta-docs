# Quickstart previsto: Formulário da Carta de Serviço

## Status

Roteiro documental T017, não executado. Aplicar somente após provider v3,
formulário real, validação estrutural e consumidores estarem implementados.

## Pré-condições

- matriz/modelo central v3 vigente e decisões MC necessárias resolvidas;
- CartaSessionProvider montado acima das rotas, sem reset por navegação;
- cinco partes e controles reais dos nodes 007; navegação T015 integrada;
- dados exclusivamente sintéticos e storage isolado do perfil do usuário.

## Massa sintética mínima

1. Carta vazia/default.
2. Carta parcial com nome, descrição no limite, categoria/subcategoria e prazo.
3. Carta completa com dois públicos, vários perfis, documentos e duas etapas.
4. Custos gratuito, sob consulta e com taxa, um estado por execução.
5. Agendamento não; sim presencial; sim online Paraíba Digital; externo dentro
   e em nova página, incluindo URL longa.
6. Texto com acentos, HTML literal, palavras longas e listas extensas.
7. Registro de storage válido, inválido e escrita indisponível.

## Procedimento previsto

1. Abrir `/formulario-carta` vazio e confirmar parte 1/5 sem erros prematuros.
2. Preencher as cinco partes e confirmar progresso derivado dos obrigatórios.
3. Abrir/fechar orientação; dados/progresso não mudam.
4. Adicionar, editar, remover e reordenar documentos/etapas por teclado; IDs e
   foco permanecem estáveis.
5. Trocar categoria/subcategoria e condições K/S/E; valores inativos ficam
   fora da projeção, e os preservados reaparecem somente conforme contrato.
6. Revisar: resumo abre parte e foca alvo autorizado; sugestão 008 não vira
   erro estrutural nem reescreve texto.
7. Navegar à prévia/tutorial e retornar; a mesma revisão da Carta permanece.
8. Simular storage bloqueado/inválido; não sobrescrever silenciosamente nem
   anunciar recuperação falsa.
9. Verificar 320–1440 px, zoom, teclado e conteúdo longo.

## Checks técnicos previstos

```sh
node --test tests/carta-model.test.mjs
npm run typecheck
npm run build
```

Registrar quantidades/resultados reais no verification; o comando acima não
testa por si só a interface, foco, storage do browser ou consumidores.

## Resultado esperado

Um único modelo v3, dados preservados, cinco partes operáveis, validação/foco
coerentes e projeções sem valores inventados. Não tratar “Tudo pronto” como
publicação ou aprovação institucional.

# Verificação do lote visual 013–015

Data: 04/11/2026  
Arquivo Figma: `YaVUdqYa3boHpvGrxf4ZJ5`

## Evidências extraídas

| Feature/estado | Node | Captura local | Dimensão | SHA-256 |
| --- | --- | --- | --- | --- |
| 013 — FAQ | `169:495` | `referencias-locais/013-fluxo-de-ajuda/desktop.png` | 1440×1085 | `58e15d0afe7833b5dc9b2953d716200d1bd4db98bfe26dd40090c774c6e25a7f` |
| 014 — entrada compartilhada | `425:201` | `referencias-locais/014-atendimento-agendado/entrada-desktop.png` | 1440×1176 | `490efd0c0d97c87cc865b52df26c02d4b77727f59d80b8fd47fde04f441fff16` |
| 014 — escolha de horário | `425:296` | `referencias-locais/014-atendimento-agendado/horario-desktop.png` | 1440×1480 | `c126be62ca30e156f65d37aa6dd0bea53652276f637e64f693b0d32df22f97d4` |
| 014 — revisão | `446:206` | `referencias-locais/014-atendimento-agendado/revisao-desktop.png` | 1440×1320 | `010e0ab201cfc432cbe0963ddbeaa613075d7f739fbe08221c2443c3fb12e197` |
| 014 — solicitação registrada | `470:444` | `referencias-locais/014-atendimento-agendado/solicitacao-desktop.png` | 1440×1320 | `7701d638405323f5597af57ddce4cdb474e8c3d1013d5b59e63c4f4ca894fedf` |

## Decisões de reconciliação

- A 013 contém apenas a FAQ e encaminha para a entrada compartilhada; não
  duplica os cards dos canais.
- A 014 é uma jornada única com quatro estados, não quatro rotas.
- A 015 não possui frame independente: reutiliza `425:201` e mantém a ação
  local de copiar o endereço, conforme o contrato de canais.
- Conteúdo versionado e contratos locais prevalecem sobre textos ilustrativos
  dos frames (por exemplo, “Confirmar solicitação”, não promessa de consulta
  confirmada ou e-mail enviado).
- A captura `470:444` apresenta recorte/deslocamento próprio no header/footer;
  isso foi registrado como defeito da referência, não como regra de layout.

## Assets semânticos

Foram versionados `src/assets/ajuda/calendar.svg`, `mail.svg` e
`circle-check.svg`. O logo institucional e a seta de ação reutilizam assets já
existentes no repositório; URLs temporárias do Figma não entram no runtime.

## Limites

As capturas são desktop. Não foram executados implementação, build/typecheck,
comparação com navegador, testes responsivos/assistivos, clipboard, API de
agenda, ERS ou validação institucional/operacional.

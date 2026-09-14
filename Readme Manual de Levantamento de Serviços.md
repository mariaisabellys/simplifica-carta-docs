# Manual de Levantamento de Serviços

## Descrição Geral

O Manual de Levantamento de Serviços da GESED será desenvolvido como uma aplicação web informativa e interativa, acessível por navegadores em computadores, tablets e smartphones. O objetivo é orientar os órgãos da Administração Pública Estadual no levantamento, organização e preparação das informações necessárias para a Carta de Serviços.

O produto funcionará como uma cartilha digital com fluxo guiado, orientações, exemplos, modelos, formulários, validações de apoio e pré-visualização das informações preenchidas. Sua finalidade é reduzir erros de preenchimento, uniformizar a linguagem utilizada e apoiar a conformidade com os padrões estabelecidos para o Cadastro dos Serviços Públicos.

O sistema não substituirá o Portal Paraíba Digital e não realizará a publicação direta dos serviços. A publicação continuará sendo feita manualmente na plataforma oficial. O Manual atuará como ferramenta de apoio para preparar, revisar, exportar e copiar as informações que serão usadas no cadastro.

## Objetivo do Projeto

Apoiar os servidores públicos responsáveis pelo levantamento e organização dos serviços públicos estaduais, oferecendo orientações didáticas, exemplos práticos, materiais de apoio, mecanismos de validação e recursos de suporte que auxiliem na elaboração da Carta de Serviços.

## Escopo do MVP

O MVP deverá contemplar o fluxo principal de orientação e preparação da Carta de Serviços, incluindo a função de solicitação de atendimento agendado.

Fazem parte do MVP:

- Página inicial com apresentação do Manual Simplifica Carta.
- Navegação principal entre as seções essenciais do sistema.
- Fluxo guiado por etapas para elaboração da Carta de Serviços.
- Página explicativa sobre o que é a Carta de Serviços.
- Diagnóstico interativo para auxiliar na identificação de um serviço público.
- Tela de resultado do diagnóstico.
- Etapa de organização das informações necessárias para a Carta de Serviços.
- Formulário de elaboração da Carta de Serviços dividido em partes.
- Validação de campos obrigatórios.
- Sugestões de melhoria com base em linguagem simples.
- Pré-visualização em HTML das informações preenchidas.
- Armazenamento temporário das informações preenchidas durante a sessão de uso.
- Disponibilização das informações preenchidas para cópia durante o tutorial do Paraíba Digital.
- Exportação das informações em formato CSV.
- Tutorial de cadastro da Carta de Serviços no Paraíba Digital.
- Fluxo de ajuda ao usuário.
- Opção de suporte por e-mail.
- Solicitação de atendimento agendado.
- Interface responsiva para computadores, tablets e smartphones.

Não fazem parte do MVP:

- Área completa de materiais de apoio.
- Busca avançada de conteúdo.
- Glossário completo.
- Painel administrativo para edição de conteúdo.
- Autenticação de usuários externos.
- Salvamento permanente de rascunhos da Carta de Serviços.
- Publicação automática no Paraíba Digital.
- Integração direta com o Portal Paraíba Digital.
- Gestão completa de agenda institucional com edição administrativa avançada.

O MVP será considerado concluído quando o usuário conseguir percorrer o fluxo principal, identificar se uma atividade caracteriza serviço público, preencher as informações da Carta de Serviços, visualizar a prévia em HTML, exportar os dados em CSV, acessar o tutorial do Paraíba Digital, copiar informações preenchidas para cadastro manual e solicitar atendimento agendado.

## Funcionalidades

- Apresentar um fluxo guiado em etapas para elaboração da Carta de Serviços.
- Permitir a navegação entre seções do manual por meio de cards, botões de ação, menu principal e breadcrumb.
- Auxiliar o usuário na identificação de um serviço público, diferenciando serviços de processos internos, programas, sistemas e outras atividades administrativas.
- Disponibilizar critérios e perguntas de diagnóstico para validar se determinada atividade pode ser considerada um serviço público.
- Orientar a organização das informações necessárias para cadastro da Carta de Serviços, como nome, descrição, público-alvo, documentação necessária, etapas, prazos, custos, agendamento, canais de atendimento e demais informações obrigatórias.
- Disponibilizar formulário para preenchimento das informações da Carta de Serviços durante a navegação pelo manual.
- Exibir prévia dinâmica em HTML com as informações preenchidas pelo usuário.
- Permitir a exportação das informações preenchidas em arquivo CSV.
- Disponibilizar as informações preenchidas em campos organizados para cópia individual durante o tutorial de cadastro no Paraíba Digital.
- Apresentar validadores de texto nos campos do formulário para verificar campos obrigatórios, clareza, objetividade e aderência às orientações de linguagem simples.
- Disponibilizar orientações sobre o uso de linguagem simples para elaboração dos textos.
- Disponibilizar seção de perguntas frequentes para esclarecimento de dúvidas.
- Disponibilizar canal de suporte por e-mail.
- Permitir que o usuário solicite atendimento agendado, informando nome, órgão, setor, e-mail institucional, telefone, assunto da dúvida, data e horário disponível.

## Atendimento Agendado no MVP

Como a solicitação de atendimento agendado faz parte do MVP, o sistema deverá ter uma solução técnica mínima para receber, registrar e encaminhar essas solicitações.

O fluxo mínimo será:

1. O usuário acessa a área de ajuda.
2. O usuário seleciona a opção de atendimento agendado.
3. O sistema exibe datas e horários disponíveis.
4. O usuário informa nome, órgão, setor, e-mail institucional, telefone e assunto da dúvida.
5. O usuário confirma a solicitação.
6. O sistema registra a solicitação.
7. O sistema exibe uma confirmação ao usuário.
8. A equipe responsável recebe a solicitação por e-mail ou painel administrativo simples.

Critérios mínimos:

- O sistema deve validar campos obrigatórios antes do envio.
- O sistema deve impedir envio sem data e horário selecionados.
- O sistema deve apresentar confirmação após a solicitação.
- O sistema deve encaminhar ou armazenar os dados necessários para que a GESED possa realizar o atendimento.
- O usuário deve conseguir revisar ou alterar os dados antes de confirmar.

## Arquitetura

O MVP não deverá ser tratado como site estático puro, pois a função de atendimento agendado exige processamento de dados no servidor ou integração com serviço externo.

A arquitetura recomendada para o MVP é uma aplicação web com frontend em React, TypeScript e Vite, apoiada por uma camada backend leve para tratar solicitações de atendimento.

### Frontend

- React.
- TypeScript.
- Vite.
- Tailwind CSS ou CSS modular baseado em tokens do design system.
- Componentes reutilizáveis para navegação, cards, formulários, validações, prévia HTML, exportação CSV, cópia de campos e agendamento.

### Backend

- Backend leve para receber solicitações de atendimento agendado.
- API para consultar horários disponíveis.
- API para criar solicitações de atendimento.
- Envio de notificação por e-mail para a equipe responsável.
- Persistência mínima das solicitações de atendimento, caso a equipe precise consultar histórico ou evitar perda de dados.

### Persistência

As informações da Carta de Serviços preenchidas pelo usuário devem permanecer apenas temporariamente durante a sessão de uso, sem salvamento permanente no MVP.

As informações de atendimento agendado podem ser armazenadas de forma mínima e controlada, pois são necessárias para executar o atendimento solicitado pelo usuário.

### Exportação

A exportação oficial do MVP será em CSV.

A pré-visualização em HTML será usada apenas para revisão visual durante o preenchimento, não como formato principal de exportação.

### Fluxo principal de dados da Carta de Serviços

1. Conteúdo estruturado e entradas do usuário.
2. Validação dos campos obrigatórios e linguagem simples.
3. Atualização do estado da aplicação.
4. Renderização da prévia HTML.
5. Disponibilização dos dados para cópia.
6. Exportação do arquivo CSV.

### Fluxo principal de dados do atendimento agendado

1. Consulta de horários disponíveis.
2. Preenchimento dos dados institucionais do solicitante.
3. Validação dos campos obrigatórios.
4. Confirmação pelo usuário.
5. Registro da solicitação.
6. Notificação da equipe responsável.
7. Exibição da confirmação ao usuário.

## Tecnologias

Tecnologias recomendadas para o MVP:

- React.
- TypeScript.
- Vite.
- Tailwind CSS ou CSS modular.
- Backend leve em Python com Django ou Django REST Framework.
- Banco de dados relacional simples para solicitações de atendimento, como SQLite no ambiente inicial e PostgreSQL em produção, se necessário.
- Serviço SMTP ou provedor institucional para envio de e-mails de confirmação e notificação.
- GitLab para versionamento.
- Figma para prototipação e validação visual.
- Trello para acompanhamento das atividades.
- VS Code como ambiente de desenvolvimento.

Observação: Django e banco de dados devem ser usados apenas para as funcionalidades que exigem processamento no servidor, especialmente atendimento agendado. O preenchimento da Carta de Serviços deve continuar sem salvamento permanente no MVP.

## Interface de Usuário

- GOV.BR/GOV.PB Design System.
- Design responsivo.
- UX Writing.
- Linguagem simples.
- Navegação intuitiva.
- Breadcrumb.
- Feedback visual.
- Barra de progresso.
- Componentes reutilizáveis.
- Formulários com validação clara.
- Tela de confirmação para atendimento agendado.

## Regras de Negócio

- Todos os campos obrigatórios da Carta de Serviços devem ser preenchidos antes da exportação dos dados.
- As sugestões de linguagem simples possuem caráter orientativo.
- A Carta de Serviços deverá seguir o padrão definido pela GESED.
- O sistema não realizará publicação direta no Portal Paraíba Digital.
- A exportação da Carta de Serviços será realizada em formato CSV.
- O diagnóstico de serviço público será baseado nas perguntas e critérios definidos pela GESED.
- Apenas responsáveis técnicos poderão alterar o conteúdo institucional do manual no código-fonte durante o MVP.
- As informações preenchidas na Carta de Serviços serão mantidas apenas temporariamente durante a sessão de uso.
- O atendimento agendado e o suporte por e-mail terão caráter orientativo e deverão apoiar dúvidas sobre o levantamento, organização e elaboração da Carta de Serviços, sem substituir a revisão oficial da GESED.
- As solicitações de atendimento agendado poderão ser armazenadas pelo tempo necessário para organização e realização do atendimento, respeitando a LGPD.

## Requisitos Não Funcionais Ajustados

- O sistema deverá utilizar HTTPS em todas as páginas.
- O sistema deverá tratar dados pessoais e institucionais conforme a LGPD.
- A página inicial e as páginas principais devem carregar em até 3 segundos em conexão estável.
- A exportação CSV deve ser gerada em até 5 segundos.
- O sistema deverá ser responsivo em computadores, tablets e smartphones.
- O sistema deverá ser compatível com Chrome, Edge, Firefox e Safari.
- A arquitetura deverá permitir evolução futura para painel administrativo, autenticação e integrações institucionais.
- A interface deverá seguir a identidade visual do Governo da Paraíba e da GESED.
- Os dados preenchidos na Carta de Serviços não deverão ser armazenados permanentemente no MVP.
- Os dados enviados para atendimento agendado deverão ser protegidos e acessíveis apenas à equipe responsável.

## Contexto Institucional

A Gerência Executiva de Serviços Digitais é a unidade organizacional responsável pela elaboração, coordenação e atualização do Manual de Levantamento de Serviços.

## Documentação

- Documento de Requisitos: https://docs.google.com/document/d/1-xDkyz1EhtY7v3z71hf4TI9z4Se8Gz5Dzs1z0xSQwrE/edit?tab=t.0
- Fluxo das páginas: https://trello.com/c/wl7CAgWE/19-fluxo-das-p%C3%A1ginas
- Protótipo do Manual de levantamento dos serviços: https://www.figma.com/design/AcrpSnCPm6zC69pMBx52wd/Manual-de-levantamento-dos-servi%C3%A7os

## Organização do Desenvolvimento

O Figma será utilizado na elaboração e validação das interfaces antes da implementação.

O Trello será utilizado para organizar as atividades, acompanhar o andamento das demandas e facilitar a gestão do desenvolvimento.

O GitLab será utilizado para versionamento do código, acompanhamento técnico e integração do fluxo de desenvolvimento.

O VS Code será utilizado como ambiente de desenvolvimento para implementação, manutenção e depuração do código.

## Contato

Para dúvidas, solicitações, sugestões ou informações relacionadas ao projeto, utilize os canais institucionais abaixo.

- Órgão responsável: Secretaria de Modernização e Transformação Digital.
- Unidade responsável: Gerência Executiva de Serviços Digitais.
- E-mail institucional: gesed.semtd@gmail.com.

## Responsabilidade pelo Projeto

A manutenção e a evolução deste projeto são de responsabilidade da Gerência Executiva de Serviços Digitais, vinculada à Secretaria de Modernização e Transformação Digital.

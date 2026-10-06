export type PreparationTopicId =
  | "about-service"
  | "requirements"
  | "service-flow";

export type PreparationInformationId =
  | "service-name"
  | "popular-name"
  | "service-description"
  | "audience"
  | "category"
  | "keywords"
  | "documents"
  | "steps"
  | "scheduling"
  | "deadline"
  | "recurrence"
  | "costs"
  | "additional-information";

export type PreparationInformation = {
  id: PreparationInformationId;
  topicId: PreparationTopicId;
  title: string;
  summary: string;
  howToIdentify: readonly string[];
  avoid?: string;
  prefer?: string;
  example?: string;
  additionalGuidance?: {
    title: string;
    paragraphs: readonly string[];
    examples?: readonly string[];
  };
  tips: readonly string[];
};

export const organizeInformationPageContent = {
  title: "Organize as informações do seu serviço",
  description:
    "Antes de elaborar sua Carta de Serviço, reúna as principais informações sobre o serviço. Use esta etapa como um guia para verificar o que você já sabe e o que ainda precisa descobrir",
  preparation: {
    title: "Preparação da carta",
    progressExample: "2 de 13 informadas",
  },
  topicsLabel: "Tópicos",
  topics: [
    { id: "about-service", title: "Sobre o serviço" },
    { id: "requirements", title: "O que é necessário" },
    { id: "service-flow", title: "Como o serviço funciona" },
  ] as const,
  information: [
    {
      id: "service-name",
      topicId: "about-service",
      title: "Nome do serviço",
      summary: "Defina qual ação o público poderá realizar no serviço.",
      example: "Solicitar segunda via do certificado do Supletivo",
      howToIdentify: [
        "O nome deve indicar exatamente o que a pessoa, empresa ou instituição poderá fazer. Comece com um verbo no infinitivo, como Solicitar, Emitir, Consultar, Agendar, Renovar ou Cadastrar.",
      ],
      avoid: "“Solicitação para emissão de segunda via de certificado”",
      prefer: "“Solicitar 2ª via do certificado”",
      additionalGuidance: {
        title: "Como usar letras maiúsculas e minúsculas?",
        paragraphs: [
          "Escreva com letra maiúscula apenas a primeira palavra do nome do serviço, além de nomes próprios, siglas e nomes oficiais de documentos, programas ou instituições.",
          "Termos genéricos devem ser escritos com letra minúscula.",
        ],
        examples: [
          "Solicitar declaração escolar ✅",
          "Solicitar Declaração Escolar ❌",
          "Emitir Carteira de Identidade Nacional (CIN) ✅",
        ],
      },
      tips: [
        "Use linguagem simples;",
        "Evite siglas e termos técnicos;",
        "Seja específico;",
        "Comece com uma ação sempre que possível;",
        "Evite usar letras maiúsculas em todas as palavras.",
      ],
    },
    {
      id: "popular-name",
      topicId: "about-service",
      title: "Nome popular",
      summary: "Informe outro nome pelo qual o serviço é conhecido pelo público.",
      howToIdentify: [
        "Pense em como as pessoas costumam procurar ou se referir ao serviço no dia a dia. O nome popular pode ser diferente do nome oficial.",
      ],
      avoid: "repetir o mesmo nome do serviço;",
      prefer: "informar um termo realmente utilizado pelo público.",
      example:
        "Nome do serviço: Emitir Carteira de Identidade Nacional (CIN)\nNome popular: Nova identidade",
      tips: [
        "Use apenas quando houver outro nome conhecido;",
        "Pode incluir uma sigla conhecida pelo público;",
        "Não invente nomes alternativos;",
        "Se não houver nome popular, deixe o campo vazio.",
      ],
    },
    {
      id: "service-description",
      topicId: "about-service",
      title: "O que é o serviço",
      summary: "Explique o que o serviço oferece e qual resultado o público pode obter.",
      howToIdentify: [
        "Responda de forma simples: para que esse serviço serve e o que a pessoa recebe ou consegue ao utilizá-lo?",
      ],
      avoid: "explicar procedimentos internos do órgão;",
      prefer: "apresentar a finalidade e o resultado do serviço.",
      example:
        "“Serviço que permite solicitar a segunda via do certificado de conclusão do Ensino Médio, permitindo comprovar a escolaridade para fins de emprego, matrícula em cursos superiores ou concursos públicos.”",
      tips: [
        "Vá direto ao objetivo do serviço;",
        "Evite repetir o nome;",
        "Não descreva as etapas nesse campo;",
        "Explique o benefício ou resultado para o público.",
      ],
    },
    {
      id: "audience",
      topicId: "about-service",
      title: "Quem pode utilizar?",
      summary: "Informe quem pode solicitar, acessar ou utilizar o serviço.",
      howToIdentify: [
        "Identifique os grupos atendidos pelo serviço, como pessoas, empresas, instituições, servidores, estudantes ou outros públicos específicos.",
      ],
      avoid: "“Qualquer pessoa”, quando houver alguma condição;",
      prefer: "“Estudantes que concluíram o Ensino Médio na Rede Estadual de Ensino.”",
      tips: [
        "Informe todos os públicos atendidos;",
        "Inclua condições importantes quando existirem;",
        "Evite termos genéricos;",
        "Não coloque documentos ou requisitos neste campo.",
      ],
    },
    {
      id: "category",
      topicId: "about-service",
      title: "Categoria do serviço",
      summary: "Escolha o tema que melhor representa o serviço.",
      howToIdentify: [
        "A classificação é organizada em três níveis:",
        "Categoria: representa o tema mais amplo do serviço;",
        "Subcategoria: detalha a área dentro da categoria escolhida;",
        "Tópico: especifica ainda mais o assunto relacionado ao serviço.",
        "Pense primeiro na finalidade do serviço e na necessidade que ele atende, e não apenas no órgão responsável.",
        "Comece escolhendo a categoria mais adequada. Depois, quando houver opções disponíveis, selecione a subcategoria e o tópico que melhor representem o assunto do serviço.",
      ],
      avoid: "escolher uma categoria apenas porque ela está relacionada ao órgão responsável;",
      prefer: "classificar o serviço de acordo com o assunto e a necessidade atendida.",
      example:
        "Categoria: Educação e Pesquisa\nSubcategoria: Ensino Superior\nTópico: selecione, quando houver, o assunto mais específico relacionado ao serviço.",
      tips: [
        "Escolha a categoria mais próxima da finalidade principal;",
        "Evite categorias muito amplas quando houver uma opção mais adequada.",
      ],
    },
    {
      id: "keywords",
      topicId: "about-service",
      title: "Palavras-chave",
      summary:
        "Cadastre os termos que auxiliam os usuários a localizarem este serviço nos campos de pesquisa com praticidade.",
      howToIdentify: [
        "Reflita sobre os vocábulos que os cidadãos empregariam na pesquisa, independente de saberem a denominação formal.",
        "Adicione expressões vinculadas ao tópico, certidão, atividade ou designação popular do atendimento.",
      ],
      avoid: "expressões excessivamente amplas, como “atendimento”, “papel” ou “requerimento”;",
      prefer:
        "termos diretamente vinculados ao atendimento, como “diploma”, “supletivo”, “2ª via” e “ensino médio”.",
      example:
        "Nome do serviço: Solicitar 2ª via do certificado do Supletivo\nPalavras-chave: diploma, supletivo, 2ª via, finalização, ensino médio",
      tips: [
        "Empregue expressões habitualmente utilizadas pela população em buscas;",
        "Insira equivalentes ou nomes conhecidos, se for pertinente;",
        "Dê preferência a termos precisos e alinhados à finalidade;",
        "Não utilize orações inteiras;",
        "Evite inserir variações da mesma expressão desnecessariamente.",
      ],
    },
    {
      id: "additional-information",
      topicId: "about-service",
      title: "Informações adicionais",
      summary:
        "Inclua informações importantes que ajudam o público a utilizar o serviço, mas que não pertencem aos outros campos.",
      howToIdentify: [
        "Use este espaço para complementar o serviço com legislação, regras específicas, exceções ou outras orientações importantes.",
      ],
      avoid: "repetir documentos, etapas, prazos ou outras informações já apresentadas;",
      prefer: "incluir somente conteúdos que complementam o entendimento do serviço.",
      example: "“O serviço é regulamentado pela Resolução nº XXX/XXXX.”",
      tips: [
        "Use apenas quando houver informação complementar;",
        "Pode incluir legislação relacionada ao serviço;",
        "Explique condições ou exceções importantes;",
        "Não transforme o campo em um espaço para repetir toda a Carta de Serviço.",
      ],
    },
    {
      id: "documents",
      topicId: "requirements",
      title: "Documentos necessários",
      summary: "Informe os documentos que o público precisa apresentar ou enviar.",
      howToIdentify: ["Liste apenas os documentos realmente necessários para realizar o serviço."],
      avoid: "“Documentação pessoal”",
      prefer: "“CPF; documento de identificação com foto; comprovante de residência.”",
      tips: [
        "Informe o nome de cada documento;",
        "Indique quando um documento for exigido somente em alguma situação;",
        "Não solicite documentos que o órgão já possui, quando não forem necessários;",
        "Informe se é necessário apresentar original, cópia ou arquivo digital, quando for importante.",
      ],
    },
    {
      id: "costs",
      topicId: "requirements",
      title: "Custos",
      summary: "Informe se o serviço é gratuito ou se possui algum valor a ser pago.",
      howToIdentify: [
        "Verifique se há cobrança para utilizar o serviço ou concluir alguma etapa.",
        "Você pode encontrar situações como:",
        "Gratuito: não há cobrança;",
        "Taxa fixa: existe um valor definido;",
        "Taxa sob consulta: o valor depende de alguma condição e precisa ser consultado.",
      ],
      avoid: "“Pode haver cobrança”",
      prefer: "“Taxa de R$ 35,00” ou “Valor calculado conforme o serviço solicitado.”",
      tips: [
        "Informe quando o serviço for gratuito;",
        "Indique o valor da taxa quando ele for fixo;",
        "Explique onde consultar o valor quando ele variar;",
        "Informe apenas cobranças relacionadas ao serviço.",
      ],
    },
    {
      id: "steps",
      topicId: "service-flow",
      title: "Etapas do serviço",
      summary: "Mostre o que o público precisa fazer, do início até receber o resultado.",
      howToIdentify: [
        "Cada etapa deve representar uma ação do usuário e elas podem ocorrer de forma online, presencial ou híbrida.",
        "Online: realizada pelo usuário em um sistema, site ou aplicativo;",
        "Presencial: exige que o usuário compareça a um local de atendimento;",
        "Híbrida: pode envolver ações digitais e presenciais ou oferecer mais de uma forma de realização.",
      ],
      avoid: "incluir atividades internas, como “servidor analisa o processo”;",
      prefer: "“Envie os documentos e aguarde o resultado da análise.”",
      example:
        "1. Preencha a solicitação — Online\nAcesse o sistema, informe os dados solicitados e envie o pedido.\n2. Efetue o pagamento da taxa — Híbrida\nRealize o pagamento pela forma disponível, que pode ser online ou presencial.\n3. Compareça à unidade de atendimento — Presencial\nVá até a unidade indicada e apresente os documentos necessários para concluir o serviço.",
      tips: [
        "Comece cada etapa com um verbo no imperativo;",
        "Informe se cada etapa é online, presencial ou híbrida;",
        "Mostre apenas ações importantes para o público;",
        "Indique quando uma etapa acontecer apenas em situações específicas;",
        "Não transforme atividades internas do órgão em etapas do usuário.",
      ],
    },
    {
      id: "scheduling",
      topicId: "service-flow",
      title: "Agendamento",
      summary:
        "Informe se o cidadão precisa agendar previamente para utilizar o serviço ou realizar alguma de suas etapas.",
      howToIdentify: [
        "Verifique se é necessário escolher ou reservar uma data ou horário antes do atendimento.",
        "Se houver agendamento, informe como ele pode ser realizado: online e/ou presencial",
        "Se o agendamento for online, informe também qual sistema será utilizado:",
        "Paraíba Digital: quando o agendamento é realizado pelo próprio Paraíba Digital;",
        "Outro sistema ou site: quando o órgão utiliza uma plataforma externa para realizar o agendamento.",
        "Quando houver um sistema externo, informe o link do agendamento e escolha como ele será apresentado ao cidadão:",
        "Dentro do Paraíba Digital: a página de agendamento será exibida dentro da plataforma, sem que o cidadão precise sair do Paraíba Digital;",
        "Em uma nova página: ao clicar para agendar, o cidadão será direcionado para o site externo.",
      ],
      tips: [
        "Informe se o agendamento é necessário;",
        "Selecione todas as formas de agendamento disponíveis;",
        "Verifique se o agendamento será feito pelo Paraíba Digital ou por outro sistema ou site;",
        "Se utilizar um sistema externo, informe o link correto;",
        "Defina se o site externo será exibido dentro do Paraíba Digital ou aberto em uma nova página;",
        "Se não houver necessidade de agendamento, selecione “Não” e siga para as próximas informações.",
      ],
    },
    {
      id: "deadline",
      topicId: "service-flow",
      title: "Prazo",
      summary: "Informe quanto tempo pode levar para o público receber o resultado do serviço.",
      howToIdentify: ["Considere o período entre a solicitação e a entrega final."],
      avoid: "“O mais rápido possível”",
      prefer: "“Até 5 dias úteis.”",
      tips: [
        "Informe um prazo realista;",
        "Use dias úteis ou corridos;",
        "Quando o resultado for imediato, informe “Imediato”;",
        "Se o prazo variar, explique em quais situações isso acontece.",
      ],
    },
    {
      id: "recurrence",
      topicId: "service-flow",
      title: "Recorrência",
      summary: "Informe se o serviço precisa ser realizado novamente após determinado período.",
      howToIdentify: [
        "Considere se a pessoa, empresa ou instituição precisa repetir o serviço regularmente, como a cada determinado número de dias, meses ou anos.",
        "Se o serviço for recorrente, informe:",
        "Tipo de recorrência: período utilizado para calcular a repetição, como dia, mês ou ano;",
        "Quantidade: número correspondente ao intervalo entre uma realização e outra.",
        "Se o serviço não precisar ser realizado novamente de forma periódica, não marque a opção de serviço recorrente.",
      ],
      example:
        "Se o serviço precisa ser realizado a cada 6 meses:\nTipo de recorrência: Mês\nQuantidade: 6",
      tips: [
        "Marque como recorrente apenas quando houver necessidade de repetir o serviço após um período definido;",
        "Informe o intervalo real entre uma realização e outra;",
        "Não confunda recorrência com prazo: o prazo indica quanto tempo leva para receber o resultado do serviço; a recorrência indica quando o serviço precisará ser realizado novamente;",
        "Se não houver um período definido para repetir o serviço, não o considere recorrente.",
      ],
    },
  ] satisfies readonly PreparationInformation[],
} as const;

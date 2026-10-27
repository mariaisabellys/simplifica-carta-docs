export const categoriasServico = [
  "Agricultura e Pecuária", "Assistência Social", "Ciência e Tecnologia",
  "Comunicações e Transparência Pública", "Cultura, Artes, História e Esportes",
  "Defesa Civil e Defesa Nacional", "Educação e Pesquisa", "Empresa, Indústria e Comércio",
  "Energia, Minerais e Combustíveis", "Finanças, Impostos e Gestão Pública",
  "Infraestrutura, Trânsito e Transportes", "Justiça e Segurança", "Meio Ambiente e Clima",
  "Saúde e Vigilância Sanitária", "Trabalho, Emprego e Previdência", "Viagem e Turismo",
] as const;

export type CategoriaServico = (typeof categoriasServico)[number];

export const subcategoriasPorCategoria = {
  "Agricultura e Pecuária": ["Apoio e Promoção", "Cadastramento e Certificação", "Informações e Eventos", "Licenciamento e Habilitação", "Outros Serviços"],
  "Assistência Social": ["Demais Iniciativas", "Programas Sociais", "Rede de Assistência e Proteção Social", "Subsistência"],
  "Ciência e Tecnologia": ["Assistência Especializada", "Fiscalização", "Promoção"],
  "Comunicações e Transparência Pública": ["Comunicação Pública", "Telecomunicações", "Transparência"],
  "Cultura, Artes, História e Esportes": ["Apoio e Assistência Técnica", "Apreciação", "Autorizações e Cadastros", "Capacitação e pesquisa", "Consultas e comunicações", "Financiamentos e prêmios", "Reconhecimento"],
  "Defesa Civil e Defesa Nacional": ["Defesa Civil", "Documentação e Serviço Militar", "Educação, Capacitação e Cultura", "Produtos e Atividades Controladas"],
  "Educação e Pesquisa": ["Capacitações", "Ensino Superior", "Ensino Técnico-Profissional", "Estudos e Pesquisas", "Gestão Educacional", "Outras"],
  "Empresa, Indústria e Comércio": ["Comércio Exterior", "Empresas", "Indústria", "Propriedade Industrial e Intelectual", "Zona Franca de Manaus"],
  "Energia, Minerais e Combustíveis": ["Combustíveis", "Energia Elétrica", "Energia Nuclear e Materiais Radiativos", "Minerais", "Petróleo e derivados"],
  "Finanças, Impostos e Gestão Pública": ["CPF, CNPJ e Outros Cadastros", "Gestão Pública", "Impostos e Obrigações", "Outros Serviços", "Sistema Financeiro e Mercado"],
  "Infraestrutura, Trânsito e Transportes": ["Habitação", "Transporte Aéreo", "Transporte Aquaviário", "Transporte Terrestre"],
  "Justiça e Segurança": ["Nacionalidade, Estadia e Outros Direitos", "Outros Serviços", "Policiamento", "Regulação e Fiscalização", "Solução de Contendas"],
  "Meio Ambiente e Clima": ["Autorizações, Anuências e Licenças", "Cadastros e Documentações", "Outros Serviços", "Pesquisa e Aprendizado"],
  "Saúde e Vigilância Sanitária": ["Fiscalização", "Pesquisa, Formação e Capacitação", "Prevenção", "Rede de Atendimento à Saúde"],
  "Trabalho, Emprego e Previdência": ["Previdência", "Trabalho e Emprego"],
  "Viagem e Turismo": ["Brasil no Exterior", "Preparação para viagem", "Turismo"],
} as const satisfies Record<CategoriaServico, readonly string[]>;

export type SubcategoriaServico = (typeof subcategoriasPorCategoria)[CategoriaServico][number];
export const publicosEspecificos = ["Servidor", "Cidadão", "Empresa"] as const;
export type PublicoEspecifico = (typeof publicosEspecificos)[number];
export const perfisUsuario = ["Agricultor", "Cidadão", "Diversidade", "Doador", "Empreendedor", "Empresa", "Ente Público", "Estudante", "Gestante", "Idoso", "Mulher", "PcD", "Povos Tradicionais", "Professor", "Servidor", "Turista", "Tutor de Pet"] as const;
export type PerfilUsuario = (typeof perfisUsuario)[number];
export const tiposPrazo = ["Ano(s)", "Mês(es)", "Semana(s)", "Dias úteis", "Dias corridos", "Hora(s)", "Minutos"] as const;
export type TipoPrazo = (typeof tiposPrazo)[number];
export const modalidadesEtapa = ["Online", "Presencial", "Híbrida"] as const;
export type ModalidadeEtapa = (typeof modalidadesEtapa)[number];

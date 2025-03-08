import React, { useState } from 'react';
import AIAssessmentQuiz from './AIAssessmentQuiz';

const HomePage = () => {
  const [startAssessment, setStartAssessment] = useState(false);
  const [organizationInfo, setOrganizationInfo] = useState({
    name: '',
    industry: '',
    size: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  // Se o usuário iniciou a avaliação, mostrar o componente do questionário
  if (startAssessment) {
    return <AIAssessmentQuiz organizationInfo={organizationInfo} />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganizationInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar o erro deste campo quando o usuário digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!organizationInfo.name.trim()) {
      newErrors.name = 'Nome da organização é obrigatório';
    }
    
    if (!organizationInfo.industry) {
      newErrors.industry = 'Setor é obrigatório';
    }
    
    if (!organizationInfo.size) {
      newErrors.size = 'Tamanho da organização é obrigatório';
    }
    
    if (!organizationInfo.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(organizationInfo.email)) {
      newErrors.email = 'Email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setStartAssessment(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Avaliação de Prontidão para Inteligência Artificial
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra o nível de maturidade da sua organização para implementação de projetos de IA
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Banner */}
          <div className="bg-indigo-700 py-8 px-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">Realize sua autoavaliação</h2>
                <p className="text-indigo-100">
                  Um diagnóstico completo para identificar pontos fortes e oportunidades de melhoria
                </p>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src="/api/placeholder/200/120" 
                  alt="AI Assessment" 
                  className="h-24 w-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Benefits */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Este diagnóstico vai ajudar sua organização a:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Identificar Gaps</h4>
                  <p className="text-gray-600 text-sm">Identifique lacunas na sua estratégia de implementação de IA</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Medir Maturidade</h4>
                  <p className="text-gray-600 text-sm">Avalie o nível de maturidade da sua organização em quatro dimensões-chave</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-800 mb-2">Receber Recomendações</h4>
                  <p className="text-gray-600 text-sm">Obtenha sugestões personalizadas para melhorar sua preparação para IA</p>
                </div>
              </div>
            </div>
            
            {/* Dimensions Info */}
            <div className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Quatro Dimensões de Avaliação</h3>
              <p className="text-gray-600 mb-6">
                Nossa avaliação cobre as quatro áreas críticas para o sucesso da implementação de IA:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start p-4 border-l-4 border-indigo-500 bg-indigo-50">
                  <div className="mr-4 flex-shrink-0 text-indigo-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Estratégia de Negócios</h4>
                    <p className="text-sm text-gray-600">Alinhamento estratégico, metas, e visão para iniciativas de IA</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border-l-4 border-blue-500 bg-blue-50">
                  <div className="mr-4 flex-shrink-0 text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Gestão de Dados</h4>
                    <p className="text-sm text-gray-600">Qualidade, disponibilidade e governança de dados para projetos de IA</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border-l-4 border-green-500 bg-green-50">
                  <div className="mr-4 flex-shrink-0 text-green-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Planejamento Financeiro</h4>
                    <p className="text-sm text-gray-600">Orçamento, alocação de recursos e retorno sobre investimento</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border-l-4 border-purple-500 bg-purple-50">
                  <div className="mr-4 flex-shrink-0 text-purple-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Ética e Impacto Social</h4>
                    <p className="text-sm text-gray-600">Princípios éticos, transparência e responsabilidade nas soluções de IA</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Registration Form */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Comece sua avaliação agora</h3>
              <p className="text-gray-600 mb-6">
                Preencha as informações abaixo para iniciar o diagnóstico e receber seu relatório personalizado:
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome da Organização*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={organizationInfo.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                      Setor de Atuação*
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={organizationInfo.industry}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.industry ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="">Selecione um setor</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="saude">Saúde</option>
                      <option value="educacao">Educação</option>
                      <option value="varejo">Varejo</option>
                      <option value="industria">Indústria</option>
                      <option value="servicos">Serviços</option>
                      <option value="governo">Governo</option>
                      <option value="energia">Energia</option>
                      <option value="outro">Outro</option>
                    </select>
                    {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                      Porte da Organização*
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={organizationInfo.size}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.size ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="">Selecione um porte</option>
                      <option value="startup">Startup (1-10 funcionários)</option>
                      <option value="pequena">Pequena (11-50 funcionários)</option>
                      <option value="media">Média (51-250 funcionários)</option>
                      <option value="grande">Grande (251-1000 funcionários)</option>
                      <option value="enterprise">Enterprise (1000+ funcionários)</option>
                    </select>
                    {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email para receber o relatório*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={organizationInfo.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Iniciar Avaliação
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-500 text-center">
              <p>© {new Date().getFullYear()} AI Readiness Assessment. Todos os direitos reservados.</p>
              <p className="mt-1">
                <span>Esta ferramenta foi desenvolvida para apoiar organizações em sua jornada de IA.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
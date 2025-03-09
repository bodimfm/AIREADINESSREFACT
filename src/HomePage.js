import React, { useState } from 'react';
import AIAssessmentQuiz from './AIAssessmentQuiz';

const HomePage = () => {
  const [startAssessment, setStartAssessment] = useState(false);

  // Função para iniciar a avaliação
  const handleStart = (e) => {
    e.preventDefault();
    setStartAssessment(true);
  };

  // Se a avaliação for iniciada, renderiza o quiz
  if (startAssessment) {
    return <AIAssessmentQuiz />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">
            Avaliação de Prontidão para IA
          </h1>
          <p className="text-xl text-indigo-700 mx-auto max-w-2xl">
            Descubra o nível de maturidade da sua organização para projetos de Inteligência Artificial
          </p>
        </header>
        
        <main className="bg-white rounded-xl overflow-hidden shadow-xl">
          {/* Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 px-6 text-white">
            <div className="flex flex-col items-center justify-center text-center">
              <h2 className="text-2xl font-bold mb-2">Realize sua autoavaliação</h2>
              <p className="text-indigo-100">
                Um diagnóstico completo para identificar pontos fortes e oportunidades
              </p>
            </div>
          </div>
          
          {/* Conteúdo */}
          <div className="p-8">
            {/* Benefícios - Cards Simplificados */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-center mb-8 text-indigo-800">
                O que você vai descobrir:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-indigo-900 mb-2">Gaps de Implementação</h4>
                  <p className="text-indigo-700">
                    Lacunas na sua estratégia de IA
                  </p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-indigo-900 mb-2">Nível de Maturidade</h4>
                  <p className="text-indigo-700">
                    Avaliação em quatro dimensões-chave
                  </p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500 text-white mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-indigo-900 mb-2">Recomendações</h4>
                  <p className="text-indigo-700">
                    Sugestões personalizadas para sua organização
                  </p>
                </div>
              </div>
            </section>
            
            {/* Dimensões - Visual Simplificado */}
            <section className="mb-12 bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-center mb-6 text-indigo-800">
                Dimensões Avaliadas
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-900">Estratégia de Negócios</h4>
                    <p className="text-indigo-700">
                      Alinhamento estratégico e metas
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-900">Gestão de Dados</h4>
                    <p className="text-indigo-700">
                      Qualidade e governança de dados
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-900">Planejamento Financeiro</h4>
                    <p className="text-indigo-700">
                      Orçamento e ROI
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 flex items-center shadow-sm">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-900">Ética e Impacto Social</h4>
                    <p className="text-indigo-700">
                      Transparência e responsabilidade
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Botão para iniciar */}
            <div className="text-center">
              <button
                onClick={handleStart}
                className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Iniciar Avaliação
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Footer */}
          <footer className="py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="text-center">
              <p>© {new Date().getFullYear()} AI Readiness Assessment</p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
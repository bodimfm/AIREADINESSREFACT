import { useState } from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const AIAssessmentQuiz = () => {
  const questions = [
    // Perguntas da Dimensão Business
    { id: 1, dimension: "Business", text: "Nossa organização definiu claramente metas estratégicas de negócios para a IA." },
    { id: 2, dimension: "Business", text: "Nossas iniciativas de IA estão bem alinhadas para apoiar e aprimorar nossa estratégia geral de negócios." },
    { id: 3, dimension: "Business", text: "Identificamos desafios e oportunidades específicas de negócios que podem ser melhoradas com IA." },
    { id: 4, dimension: "Business", text: "Acreditamos que a IA proporcionará uma vantagem competitiva e impulsionará a inovação em nosso modelo de negócios." },
    { id: 5, dimension: "Business", text: "Estabelecemos critérios claros para definir o sucesso das implementações de IA em nossa organização." },
    { id: 6, dimension: "Business", text: "As soluções de IA propostas estão alinhadas com nossas iniciativas comerciais atuais ou futuras." },
    { id: 7, dimension: "Business", text: "Definimos uma data realista para quando nossas iniciativas de IA estarão operacionais, incluindo marcos-chave." },
    { id: 8, dimension: "Business", text: "Temos um sistema em vigor para revisar periodicamente a eficácia e o alinhamento estratégico das iniciativas de IA." },
    { id: 9, dimension: "Business", text: "Estimamos com precisão os investimentos financeiros e de recursos humanos necessários para nossa estratégia de IA." },
    { id: 10, dimension: "Business", text: "Estamos confiantes de que a IA melhorará nossa posição competitiva no mercado." },
    
    // Perguntas da Dimensão Dados
    { id: 11, dimension: "Data", text: "Definimos e implementamos medidas para garantir a precisão dos dados com benchmarks claros." },
    { id: 12, dimension: "Data", text: "Nossos procedimentos para avaliar a completude dos dados são rigorosos e eficazes." },
    { id: 13, dimension: "Data", text: "Estabelecemos critérios para avaliar a relevância dos dados para nossas aplicações específicas de IA." },
    { id: 14, dimension: "Data", text: "Avaliações de qualidade dos dados são conduzidas em frequência apropriada para garantir a integridade dos dados." },
    { id: 15, dimension: "Data", text: "Temos processos para gerenciar e corrigir eficientemente dados faltantes ou incompletos." },
    
    // Perguntas da Dimensão Planejamento de Orçamento e Recursos
    { id: 16, dimension: "Financial", text: "Temos um orçamento bem definido especificamente alocado para a implementação inicial de IA." },
    { id: 17, dimension: "Financial", text: "Temos um sistema confiável de previsão para os custos operacionais contínuos das iniciativas de IA." },
    { id: 18, dimension: "Financial", text: "Recursos financeiros suficientes são alocados para pesquisa e desenvolvimento em IA." },
    { id: 19, dimension: "Financial", text: "Nosso orçamento está projetado para escalar conforme o crescimento dos projetos de IA." },
    { id: 20, dimension: "Financial", text: "Ajustamos regularmente o orçamento dos projetos de IA com base nas métricas de desempenho." },
    { id: 21, dimension: "Financial", text: "As economias das iniciativas de IA são realocadas eficientemente dentro da nossa organização." },
    { id: 22, dimension: "Financial", text: "Estratégias robustas de gestão de riscos financeiros estão implementadas para nossos investimentos em IA." },
    { id: 23, dimension: "Financial", text: "Nosso orçamento de IA está alinhado estrategicamente com os objetivos gerais da organização." },
    { id: 24, dimension: "Financial", text: "Reservamos fundos de contingência para despesas inesperadas relacionadas à IA." },
    { id: 25, dimension: "Financial", text: "Nossos processos de rastreamento e relatórios de custos para projetos de IA são detalhados e transparentes." },
    
    // Perguntas da Dimensão IA Ética e Impacto Social
    { id: 26, dimension: "Ethics", text: "Nossa organização estabeleceu princípios éticos claros para o desenvolvimento de IA." },
    { id: 27, dimension: "Ethics", text: "Temos mecanismos implementados para garantir a equidade em nossos sistemas de IA." },
    { id: 28, dimension: "Ethics", text: "Estabelecemos mecanismos de responsabilidade para decisões tomadas por nossos sistemas de IA." },
    { id: 29, dimension: "Ethics", text: "Nossos processos e algoritmos de IA são mantidos com alta transparência." },
    { id: 30, dimension: "Ethics", text: "Utilizamos ativamente métodos para avaliar o impacto social de nossas tecnologias de IA." },
    { id: 31, dimension: "Ethics", text: "Identificamos e abordamos proativamente possíveis deslocamentos de empregos devido à IA." },
    { id: 32, dimension: "Ethics", text: "Temos procedimentos para monitorar e mitigar vieses em nossos sistemas de IA de forma eficaz." },
    { id: 33, dimension: "Ethics", text: "Práticas de sustentabilidade estão integradas ao nosso ciclo de desenvolvimento de IA." },
    { id: 34, dimension: "Ethics", text: "Medimos os efeitos sociais de longo prazo das nossas implementações de IA." },
    { id: 35, dimension: "Ethics", text: "Revisamos e atualizamos regularmente nossas políticas de ética em IA." }
  ];

  // Estado para armazenar as respostas (1-5)
  const [answers, setAnswers] = useState({});
  // Estado para controlar qual dimensão está sendo mostrada
  const [currentDimension, setCurrentDimension] = useState("Business");
  // Estado para rastrear o progresso geral do questionário
  const [progress, setProgress] = useState(0);
  // Estado para controlar se o resumo está sendo mostrado
  const [showSummary, setShowSummary] = useState(false);

  // Opções de resposta (escala Likert)
  const options = [
    { value: 1, label: "Discordo Totalmente" },
    { value: 2, label: "Discordo" },
    { value: 3, label: "Neutro" },
    { value: 4, label: "Concordo" },
    { value: 5, label: "Concordo Totalmente" }
  ];

  // Lista de todas as dimensões disponíveis
  const dimensions = ["Business", "Data", "Financial", "Ethics"];

// Tradução dos nomes das dimensões para português
const dimensionTranslation = {
  "Business": "Estratégia de Negócios",
  "Data": "Gestão de Dados",
  "Financial": "Planejamento Financeiro",
  "Ethics": "Ética e Impacto Social"
};

  // Filtrar perguntas pela dimensão atual
  const filteredQuestions = questions.filter(q => q.dimension === currentDimension);

  // Atualizar a resposta quando o usuário selecionar uma opção
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Atualizar o progresso geral
    setTimeout(() => {
      const answeredCount = Object.keys(answers).length;
      const totalQuestions = questions.length;
      setProgress((answeredCount / totalQuestions) * 100);
    }, 0);
  };

  // Mudar para a próxima dimensão
  const nextDimension = () => {
    const currentIndex = dimensions.indexOf(currentDimension);
    if (currentIndex < dimensions.length - 1) {
      setCurrentDimension(dimensions[currentIndex + 1]);
    } else {
      setShowSummary(true);
    }
  };

  // Voltar para a dimensão anterior
  const prevDimension = () => {
    const currentIndex = dimensions.indexOf(currentDimension);
    if (currentIndex > 0) {
      setCurrentDimension(dimensions[currentIndex - 1]);
    }
  };

  // Calcular a pontuação média para cada dimensão
  const calculateScores = () => {
    const scores = {};
    const detailedScores = {};
    
    dimensions.forEach(dimension => {
      const dimensionQuestions = questions.filter(q => q.dimension === dimension);
      let total = 0;
      let answered = 0;
      const questionScores = {};
      
      dimensionQuestions.forEach(question => {
        if (answers[question.id]) {
          total += answers[question.id];
          answered++;
          questionScores[question.id] = answers[question.id];
        }
      });
      
      scores[dimension] = answered > 0 ? (total / answered).toFixed(1) : "N/A";
      detailedScores[dimension] = {
        average: scores[dimension],
        answered: answered,
        total: dimensionQuestions.length,
        questionScores: questionScores
      };
    });
    
    return { scores, detailedScores };
  };

  // Determinar o nível de maturidade com base na pontuação
  const getMaturityLevel = (score) => {
    if (score === "N/A") return { level: "Indeterminado", color: "gray-400" };
    const numScore = parseFloat(score);
    
    if (numScore < 1.5) return { level: "Inicial", color: "red-600" };
    if (numScore < 2.5) return { level: "Básico", color: "orange-500" };
    if (numScore < 3.5) return { level: "Intermediário", color: "yellow-500" };
    if (numScore < 4.5) return { level: "Avançado", color: "blue-500" };
    return { level: "Otimizado", color: "green-600" };
  };

  // Obter um feedback baseado na pontuação
  const getFeedback = (score) => {
    if (score === "N/A") return "Sem respostas suficientes";
    const maturity = getMaturityLevel(score);
    
    switch(maturity.level) {
      case "Inicial":
        return "Precisa de atenção urgente - Práticas ad hoc ou inexistentes";
      case "Básico":
        return "Em desenvolvimento - Processos básicos estabelecidos";
      case "Intermediário":
        return "Bom progresso - Processos bem definidos e implementados";
      case "Avançado":
        return "Muito bom - Processos medidos e controlados";
      case "Otimizado":
        return "Excelente - Melhoria contínua implementada";
      default:
        return "Indeterminado";
    }
  };

  // Resetar o questionário
  const resetQuiz = () => {
    setAnswers({});
    setCurrentDimension("Business");
    setShowSummary(false);
  };

  // Gerar dados para gráfico de radar
  const prepareRadarData = (scores) => {
    // Preparar dados para o gráfico radar
    const radarData = dimensions.map(dimension => ({
      subject: dimensionTranslation[dimension],
      fullMark: 5,
      value: scores[dimension] === "N/A" ? 0 : parseFloat(scores[dimension])
    }));
    
    return radarData;
  };
  
  // Gerar dados para gráficos de radar específicos de dimensão
  const prepareDimensionRadarData = (dimension, detailedScores) => {
    const questionScores = detailedScores[dimension].questionScores;
    const dimensionQuestions = questions.filter(q => q.dimension === dimension);
    
    return dimensionQuestions.map(question => ({
      subject: `Q${question.id}`,
      fullMark: 5,
      value: questionScores[question.id] || 0
    }));
  };
  
  // Exibir o resumo dos resultados
  if (showSummary) {
    const { scores, detailedScores } = calculateScores();
    const totalScore = Object.values(scores).filter(s => s !== "N/A").map(parseFloat);
    const overallAverage = totalScore.length > 0 
      ? (totalScore.reduce((sum, score) => sum + score, 0) / totalScore.length).toFixed(1) 
      : "N/A";
    const overallMaturity = getMaturityLevel(overallAverage);
    
    // Preparar dados para o gráfico radar
    const radarData = prepareRadarData(scores);

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">Avaliação de Prontidão para IA</h1>
        <p className="text-center mb-6 text-gray-600">Um diagnóstico da maturidade da sua organização para implementação de IA</p>
        
        {/* Pontuação geral */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-3 text-center">Pontuação Geral: {overallAverage}/5.0</h2>
          <p className="text-center mb-4">Nível de Maturidade: <span className={`font-semibold text-${overallMaturity.color}`}>{overallMaturity.level}</span></p>
          
          <div className="flex justify-between items-center text-xs text-gray-500 mb-1 px-2">
            <span>Inicial</span>
            <span>Básico</span>
            <span>Intermediário</span>
            <span>Avançado</span>
            <span>Otimizado</span>
          </div>
          
          <div className="w-full h-4 bg-gray-200 rounded-full mb-4 flex">
            <div className="h-full bg-red-600 rounded-l-full" style={{ width: '20%' }}></div>
            <div className="h-full bg-orange-500" style={{ width: '20%' }}></div>
            <div className="h-full bg-yellow-500" style={{ width: '20%' }}></div>
            <div className="h-full bg-blue-500" style={{ width: '20%' }}></div>
            <div className="h-full bg-green-600 rounded-r-full" style={{ width: '20%' }}></div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-6 relative mb-6">
            <div className="absolute top-0 left-0 h-full w-full flex justify-between px-6">
              <div className="h-full border-l border-gray-400"></div>
              <div className="h-full border-l border-gray-400"></div>
              <div className="h-full border-l border-gray-400"></div>
              <div className="h-full border-l border-gray-400"></div>
            </div>
            <div 
              className={`bg-${overallMaturity.color} h-6 rounded-full relative`}
              style={{ width: overallAverage === "N/A" ? "0%" : `${(parseFloat(overallAverage) / 5) * 100}%` }}
            >
              <span className="absolute -right-3 -top-7 bg-white text-sm py-1 px-2 rounded shadow">
                {overallAverage}
              </span>
            </div>
          </div>
        </div>
        
        {/* Gráfico de Radar Geral */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Análise Geral por Dimensão</h2>
          
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-md h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 5]} tick={{ fill: 'grey' }} />
                  <Tooltip formatter={(value) => [value.toFixed(1), 'Pontuação']} />
                  <Radar
                    name="Maturidade"
                    dataKey="value"
                    stroke="#4338ca"
                    fill="#4338ca"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dimensions.map(dimension => {
              const score = scores[dimension];
              const maturity = getMaturityLevel(score);
              const answered = detailedScores[dimension].answered;
              const total = detailedScores[dimension].total;
              const dimensionRadarData = prepareDimensionRadarData(dimension, detailedScores);
              
              return (
                <div key={dimension} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">{dimensionTranslation[dimension] || dimension}</h3>
                    <div className="flex items-center">
                      <span className={`text-${maturity.color} font-bold text-xl`}>{score}</span>
                      <span className="text-gray-400 text-sm">/5.0</span>
                    </div>
                  </div>
                  
                  {/* Gráfico de radar específico da dimensão */}
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={60} data={dimensionRadarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 5]} tick={{ fill: 'grey' }} axisLine={false} />
                        <Radar
                          name={dimensionTranslation[dimension]}
                          dataKey="value"
                          stroke={`#${maturity.color.split('-')[1]}`}
                          fill={`#${maturity.color.split('-')[1]}`}
                          fillOpacity={0.5}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className={`bg-${maturity.color} h-3 rounded-full`}
                      style={{ width: score === "N/A" ? "0%" : `${(parseFloat(score) / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>1.0</span>
                    <span>2.0</span>
                    <span>3.0</span>
                    <span>4.0</span>
                    <span>5.0</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Nível: <span className={`text-${maturity.color}`}>{maturity.level}</span></p>
                      <p className="text-xs text-gray-500">Respondeu {answered} de {total} perguntas</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100">
                      {Math.round((parseFloat(score) / 5) * 100)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Recomendações detalhadas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Avaliação Detalhada e Recomendações</h2>
          
          <div className="space-y-6">
            {dimensions.map(dimension => {
              const score = scores[dimension];
              const maturity = getMaturityLevel(score);
              
              let recommendations = [];
              if (score !== "N/A") {
                const numScore = parseFloat(score);
                
                if (numScore < 2.5) {
                  switch(dimension) {
                    case "Business":
                      recommendations = [
                        "Desenvolva uma estratégia clara de IA alinhada aos objetivos de negócio",
                        "Identifique casos de uso específicos onde a IA pode gerar valor",
                        "Estabeleça métricas para medir o sucesso das iniciativas de IA"
                      ];
                      break;
                    case "Data":
                      recommendations = [
                        "Implemente processos de governança de dados",
                        "Desenvolva padrões para qualidade e integridade dos dados",
                        "Estabeleça procedimentos para lidar com dados incompletos ou inconsistentes"
                      ];
                      break;
                    case "Financial":
                      recommendations = [
                        "Defina um orçamento específico para projetos de IA",
                        "Estabeleça mecanismos de previsão de custos para iniciativas de IA",
                        "Crie processos para avaliar o retorno sobre investimento em IA"
                      ];
                      break;
                    case "Ethics":
                      recommendations = [
                        "Estabeleça princípios éticos para o desenvolvimento de IA",
                        "Implemente mecanismos para identificar e mitigar vieses",
                        "Desenvolva processos para garantir transparência nas decisões baseadas em IA"
                      ];
                      break;
                  }
                } else if (numScore < 3.5) {
                  switch(dimension) {
                    case "Business":
                      recommendations = [
                        "Refine a estratégia de IA para melhor alinhamento com objetivos de longo prazo",
                        "Expanda os casos de uso para áreas adicionais do negócio",
                        "Aprimore as métricas de sucesso para capturar impactos indiretos"
                      ];
                      break;
                    case "Data":
                      recommendations = [
                        "Fortaleça os processos de validação de dados",
                        "Melhore a integração entre diferentes fontes de dados",
                        "Implemente técnicas avançadas de análise de qualidade de dados"
                      ];
                      break;
                    case "Financial":
                      recommendations = [
                        "Desenvolva modelos mais sofisticados de previsão de custos",
                        "Estabeleça fundos de contingência para projetos de IA",
                        "Refine os métodos de avaliação de ROI para projetos de longo prazo"
                      ];
                      break;
                    case "Ethics":
                      recommendations = [
                        "Expanda as avaliações de impacto ético para todos os projetos de IA",
                        "Desenvolva métodos mais robustos para detecção e mitigação de vieses",
                        "Implemente processos de auditoria ética para sistemas existentes"
                      ];
                      break;
                  }
                }
              }
              
              return (
                <div key={`detail-${dimension}`} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-2">{dimensionTranslation[dimension] || dimension}</h3>
                  <p className="mb-3">
                    <span className={`inline-block px-2 py-1 rounded text-white text-sm bg-${maturity.color} mr-2`}>
                      {maturity.level}
                    </span>
                    <span className="text-gray-700">{getFeedback(score)}</span>
                  </p>
                  
                  {recommendations.length > 0 && (
                    <div>
                      <p className="font-medium mb-1">Recomendações:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        {recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Botões finais */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={resetQuiz}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reiniciar Avaliação
          </button>
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Imprimir Relatório
          </button>
        </div>
      </div>
    );
  }

  // Exibir o questionário
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-center">Avaliação de Prontidão para IA</h1>
      
      {/* Barra de progresso global */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progresso geral</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Tabs para as dimensões */}
      <div className="flex mb-6 border-b">
        {dimensions.map((dim, index) => (
          <button
            key={dim}
            onClick={() => setCurrentDimension(dim)}
            className={`py-2 px-4 font-medium text-sm transition-colors relative ${
              currentDimension === dim 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {dim}
            {currentDimension === dim && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
            )}
          </button>
        ))}
      </div>
      
      <h2 className="text-xl font-medium mb-6 text-blue-600">
        {currentDimension === "Business" && "Estratégia de Negócios"}
        {currentDimension === "Data" && "Gestão de Dados"}
        {currentDimension === "Financial" && "Planejamento Financeiro"}
        {currentDimension === "Ethics" && "Ética e Impacto Social"}
      </h2>
      
      <div className="space-y-6 mb-8">
        {filteredQuestions.map(question => {
          // Calcular o índice da pergunta dentro da sua dimensão
          const questionIndex = questions
            .filter(q => q.dimension === question.dimension)
            .findIndex(q => q.id === question.id);
            
          return (
            <div key={question.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                  {questionIndex + 1}
                </span>
                <p className="font-medium">{question.text}</p>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={`p-2 rounded-lg text-sm transition-colors ${
                      answers[question.id] === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              
              {answers[question.id] && (
                <div className="mt-2 text-right">
                  <span className="text-xs text-gray-500">
                    {answers[question.id] < 3 ? 'Oportunidade de melhoria' : 
                     answers[question.id] < 4 ? 'Nível adequado' : 'Ponto forte'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between">
        <button
          onClick={prevDimension}
          disabled={currentDimension === dimensions[0]}
          className={`px-5 py-2 rounded-lg flex items-center ${
            currentDimension === dimensions[0]
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          } transition-colors`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>
        
        <button
          onClick={nextDimension}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          {currentDimension === dimensions[dimensions.length - 1] ? 'Ver Resultados' : 'Próximo'}
          {currentDimension !== dimensions[dimensions.length - 1] && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
      
      <div className="mt-6 flex justify-center">
        <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg">
          <span className="text-sm text-gray-700 mr-2">
            Dimensão {dimensions.indexOf(currentDimension) + 1} de {dimensions.length}
          </span>
          <div className="w-16 bg-gray-300 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${((dimensions.indexOf(currentDimension) + 1) / dimensions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssessmentQuiz;
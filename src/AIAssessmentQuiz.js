import React, { useState, useEffect } from 'react';
import { questions } from './questions';
import ScoreChart from './ScoreChart';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AIAssessmentQuiz = () => {
  // Estados para respostas e navegação
  const [answers, setAnswers] = useState({});
  const [currentDimension, setCurrentDimension] = useState("Business");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState("next");
  const [animating, setAnimating] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Dados de contato
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    company: "",
    position: ""
  });
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle, submitting, success, error

  // Opções de resposta (escala Likert)
  const options = [
    { value: 1, label: "Discordo Totalmente", color: "red" },
    { value: 2, label: "Discordo", color: "orange" },
    { value: 3, label: "Neutro", color: "yellow" },
    { value: 4, label: "Concordo", color: "blue" },
    { value: 5, label: "Concordo Totalmente", color: "green" }
  ];

  // Lista de dimensões e suas traduções
  const dimensions = ["Business", "Data", "Financial", "Ethics"];
  const dimensionTranslation = {
    "Business": "Estratégia de Negócios",
    "Data": "Gestão de Dados",
    "Financial": "Planejamento Financeiro",
    "Ethics": "Ética e Impacto Social"
  };

  // Mapeamento de cores para dimensões
  const dimensionColors = {
    "Business": "#4F46E5", // Indigo
    "Data": "#0EA5E9",     // Sky Blue
    "Financial": "#10B981", // Emerald
    "Ethics": "#8B5CF6"     // Violet
  };

  // Filtrar perguntas pela dimensão atual
  const filteredQuestions = questions.filter(q => q.dimension === currentDimension);
  const currentQuestion = filteredQuestions[currentQuestionIndex];

  // Progresso da dimensão atual (circular)
  const dimensionProgress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

  // Atualizar o progresso total sempre que as respostas mudarem
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;
    setProgress((answeredCount / questions.length) * 100);
  }, [answers]);

  // Funções de navegação
  const nextQuestion = () => {
    if (animating) return;
    setAnimating(true);
    setTransitionDirection("next");
    setTimeout(() => {
      const filtered = questions.filter(q => q.dimension === currentDimension);
      if (currentQuestionIndex < filtered.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const currentIndex = dimensions.indexOf(currentDimension);
        if (currentIndex < dimensions.length - 1) {
          setCurrentDimension(dimensions[currentIndex + 1]);
          setCurrentQuestionIndex(0);
        } else {
          setShowContactForm(true);
        }
      }
      setAnimating(false);
    }, 300);
  };

  const prevQuestion = () => {
    if (animating) return;
    setAnimating(true);
    setTransitionDirection("prev");
    setTimeout(() => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      } else {
        const currentIndex = dimensions.indexOf(currentDimension);
        if (currentIndex > 0) {
          const prevDimension = dimensions[currentIndex - 1];
          const prevQuestions = questions.filter(q => q.dimension === prevDimension);
          setCurrentDimension(prevDimension);
          setCurrentQuestionIndex(prevQuestions.length - 1);
        }
      }
      setAnimating(false);
    }, 300);
  };

  // Atualiza a resposta e avança
  const handleAnswer = (questionId, value) => {
    if (animating) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  // Atualiza os dados de contato com validação
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Valida o formulário de contato
  const validateContactForm = () => {
    const errors = {};
    if (!contactInfo.name.trim()) {
      errors.name = "Nome é obrigatório";
    }
    if (!contactInfo.email.trim()) {
      errors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(contactInfo.email)) {
      errors.email = "E-mail inválido";
    }
    if (!contactInfo.company.trim()) {
      errors.company = "Empresa é obrigatória";
    }
    if (!contactInfo.position.trim()) {
      errors.position = "Cargo é obrigatório";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Calcula as pontuações (considerando 1 para perguntas não respondidas)
  const calculateScores = () => {
    const scores = {};
    dimensions.forEach(dimension => {
      const dimQuestions = questions.filter(q => q.dimension === dimension);
      let total = 0;
      dimQuestions.forEach(question => {
        // Se não houver resposta, atribui 1 (mínimo)
        const ans = answers[question.id] || 1;
        total += ans;
      });
      scores[dimension] = (total / dimQuestions.length).toFixed(1);
    });
    return scores;
  };

  // Determina o nível de maturidade com base na pontuação
  const getMaturityLevel = (score) => {
    const num = parseFloat(score);
    if (isNaN(num)) return { level: "Indeterminado", color: "gray" };
    if (num < 1.5) return { level: "Inicial", color: "red" };
    if (num < 2.5) return { level: "Básico", color: "orange" };
    if (num < 3.5) return { level: "Intermediário", color: "yellow" };
    if (num < 4.5) return { level: "Avançado", color: "blue" };
    return { level: "Otimizado", color: "green" };
  };

  // Fornece feedback com base na pontuação
  const getFeedback = (score) => {
    const maturity = getMaturityLevel(score);
    if (maturity.level === "Inicial") {
      return "Precisa de atenção urgente - Práticas ad hoc ou inexistentes";
    } else if (maturity.level === "Básico") {
      return "Em desenvolvimento - Processos básicos estabelecidos";
    } else if (maturity.level === "Intermediário") {
      return "Bom progresso - Processos bem definidos e implementados";
    } else if (maturity.level === "Avançado") {
      return "Muito bom - Processos medidos e controlados";
    } else if (maturity.level === "Otimizado") {
      return "Excelente - Melhoria contínua implementada";
    } else {
      return "Indeterminado";
    }
  };

  // Reseta o questionário
  const resetQuiz = () => {
    setAnswers({});
    setCurrentDimension("Business");
    setCurrentQuestionIndex(0);
    setShowContactForm(false);
    setShowSummary(false);
    setProgress(0);
    setTransitionDirection("next");
    setContactInfo({ name: "", email: "", company: "", position: "" });
    setSubmitStatus("idle");
    setFormErrors({});
  };

  // Prepara os dados para o gráfico de radar geral
  const prepareRadarData = (scores) => {
    return dimensions.map(dimension => ({
      subject: dimensionTranslation[dimension],
      fullMark: 5,
      value: scores[dimension] === "N/A" ? 0 : parseFloat(scores[dimension]),
      fill: dimensionColors[dimension]
    }));
  };

  // Envia os dados para o Formspree com validação
  const submitToFormspree = async () => {
    if (!validateContactForm()) {
      return;
    }
    const scores = calculateScores();
    const totalScore = Object.values(scores).map(parseFloat);
    const overallAverage = totalScore.length > 0
      ? (totalScore.reduce((sum, score) => sum + score, 0) / totalScore.length).toFixed(1)
      : "N/A";
    const overallMaturity = getMaturityLevel(overallAverage);
    const formData = {
      name: contactInfo.name,
      email: contactInfo.email,
      company: contactInfo.company,
      position: contactInfo.position,
      overallScore: overallAverage,
      overallMaturityLevel: overallMaturity.level,
      businessScore: scores.Business,
      businessMaturityLevel: getMaturityLevel(scores.Business).level,
      dataScore: scores.Data,
      dataMaturityLevel: getMaturityLevel(scores.Data).level,
      financialScore: scores.Financial,
      financialMaturityLevel: getMaturityLevel(scores.Financial).level,
      ethicsScore: scores.Ethics,
      ethicsMaturityLevel: getMaturityLevel(scores.Ethics).level,
      answers: JSON.stringify(answers)
    };
    setSubmitStatus("submitting");
    try {
      const response = await fetch("https://formspree.io/f/mgvawppz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setSubmitStatus("success");
        setShowSummary(true);
      } else {
        console.error("Erro ao enviar formulário:", data);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitStatus("error");
    }
  };

  // Componente indicador de progresso das dimensões
  const DimensionProgressIndicator = () => {
    return (
      <div className="flex justify-between items-center mb-6 bg-gray-100 p-3 rounded-lg">
        {dimensions.map((dim, index) => {
          const dimQuestions = questions.filter(q => q.dimension === dim);
          const answeredQuestions = dimQuestions.filter(q => answers[q.id]);
          const dimPercentage = (answeredQuestions.length / dimQuestions.length) * 100;
          const isActive = dim === currentDimension;
          return (
            <div 
              key={dim} 
              className={`text-center flex-1 ${index > 0 ? "border-l border-gray-300" : ""}`}
              aria-current={isActive ? "step" : undefined}
            >
              <div 
                className={`text-sm font-semibold mb-1 ${isActive ? "text-blue-700" : "text-gray-600"}`}
                style={{ color: isActive ? dimensionColors[dim] : "" }}
              >
                {dimensionTranslation[dim]}
              </div>
              <div className="flex justify-center">
                <div className="w-8 h-8 relative">
                  <CircularProgressbar
                    value={dimPercentage}
                    text={`${Math.round(dimPercentage)}%`}
                    styles={buildStyles({
                      textSize: '30px',
                      pathColor: dimensionColors[dim],
                      textColor: isActive ? dimensionColors[dim] : "#6B7280",
                      trailColor: '#d1d5db'
                    })}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // -- Renderização Condicional --

  // 1. Tela do formulário de contato (após o quiz, antes do resumo)
  if (showContactForm && !showSummary) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">Avaliação de Prontidão para IA</h1>
        <p className="text-center mb-6 text-gray-600">
          Obrigado por completar a avaliação! Para ver seus resultados, por favor preencha seus dados.
        </p>

        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-3">Seus Dados</h2>
          <p className="mb-4 text-sm text-gray-600">
            Preencha seus dados para visualizar e receber seu relatório completo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={contactInfo.name}
                onChange={handleContactChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.name ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                aria-required="true"
                aria-invalid={formErrors.name ? "true" : "false"}
                aria-describedby={formErrors.name ? "name-error" : undefined}
              />
              {formErrors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600">
                  {formErrors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={contactInfo.email}
                onChange={handleContactChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                aria-required="true"
                aria-invalid={formErrors.email ? "true" : "false"}
                aria-describedby={formErrors.email ? "email-error" : undefined}
              />
              {formErrors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={contactInfo.company}
                onChange={handleContactChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.company ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                aria-required="true"
                aria-invalid={formErrors.company ? "true" : "false"}
                aria-describedby={formErrors.company ? "company-error" : undefined}
              />
              {formErrors.company && (
                <p id="company-error" className="mt-1 text-sm text-red-600">
                  {formErrors.company}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Cargo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="position"
                name="position"
                value={contactInfo.position}
                onChange={handleContactChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors.position ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
                aria-required="true"
                aria-invalid={formErrors.position ? "true" : "false"}
                aria-describedby={formErrors.position ? "position-error" : undefined}
              />
              {formErrors.position && (
                <p id="position-error" className="mt-1 text-sm text-red-600">
                  {formErrors.position}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={submitToFormspree}
              disabled={submitStatus === "submitting"}
              className={`w-full px-4 py-3 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                submitStatus === "submitting"
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              aria-busy={submitStatus === "submitting" ? "true" : "false"}
            >
              {submitStatus === "submitting" ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </span>
              ) : "Ver Meus Resultados"}
            </button>

            {submitStatus === "error" && (
              <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert">
                <p className="font-medium">Ocorreu um erro ao processar seus dados.</p>
                <p className="text-sm mt-1">
                  Por favor, tente novamente ou entre em contato com nosso suporte.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Tentar novamente
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Ao enviar este formulário, você concorda em receber informações relacionadas à sua avaliação e outras comunicações relevantes sobre IA.
          </p>
        </div>
      </div>
    );
  }

  // 2. Tela de Resumo (após envio do formulário)
  else if (showSummary) {
    const scores = calculateScores();
    const totalScore = Object.values(scores).map(parseFloat);
    const overallAverage = totalScore.length > 0
      ? (totalScore.reduce((sum, score) => sum + score, 0) / totalScore.length).toFixed(1)
      : "N/A";
    const overallMaturity = getMaturityLevel(overallAverage);
    const radarData = prepareRadarData(scores);

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-center">Avaliação de Prontidão para IA</h1>
        <p className="text-center mb-6 text-gray-600">
          Um diagnóstico da maturidade da sua organização para implementação de IA
        </p>

        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          {/* Cabeçalho com dados do usuário */}
          <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nome</p>
                <p className="font-medium">{contactInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">E-mail</p>
                <p className="font-medium">{contactInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Empresa</p>
                <p className="font-medium">{contactInfo.company}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cargo</p>
                <p className="font-medium">{contactInfo.position}</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-3 text-center">
            Pontuação Geral: {overallAverage}/5.0
          </h2>
          <p className="text-center mb-6">
            Nível de Maturidade:{" "}
            <span className={`font-semibold text-${overallMaturity.color}-600`}>
              {overallMaturity.level}
            </span>
          </p>

          {/* Barra colorida de faixas de maturidade */}
          <div className="flex justify-between items-center text-xs text-gray-600 mb-1 px-2">
            <span>Inicial</span>
            <span>Básico</span>
            <span>Intermediário</span>
            <span>Avançado</span>
            <span>Otimizado</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full mb-6 flex">
            <div className="h-full bg-red-600 rounded-l-full" style={{ width: '20%' }}></div>
            <div className="h-full bg-orange-500" style={{ width: '20%' }}></div>
            <div className="h-full bg-yellow-500" style={{ width: '20%' }}></div>
            <div className="h-full bg-blue-500" style={{ width: '20%' }}></div>
            <div className="h-full bg-green-600 rounded-r-full" style={{ width: '20%' }}></div>
          </div>

          {/* Gráfico Geral */}
          <div className="mb-8 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-center">Maturidade por Dimensão</h3>
            <div className="max-w-md mx-auto">
              <ScoreChart data={radarData} />
            </div>
          </div>

          {/* Tabela de pontuações por dimensão */}
          <div className="mb-8 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dimensão
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pontuação
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nível de Maturidade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dimensions.map(dimension => {
                  const score = scores[dimension];
                  return (
                    <tr key={dimension}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: dimensionColors[dimension] }}></div>
                          <div className="text-sm font-medium text-gray-900">{dimensionTranslation[dimension]}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-semibold">{score}/5.0</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-${getMaturityLevel(score).color}-100 text-${getMaturityLevel(score).color}-800`}>
                          {getMaturityLevel(score).level}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Detalhamento por Dimensão */}
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-center">
              Detalhamento por Dimensão
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dimensions.map(dimension => {
                const score = scores[dimension];
                const maturityLevel = getMaturityLevel(score);
                return (
                  <div key={dimension} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <h4 className="text-md font-bold mb-2" style={{ color: dimensionColors[dimension] }}>
                      {dimensionTranslation[dimension]}
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-500">Pontuação</p>
                        <p className="font-semibold">{score}/5.0</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Nível</p>
                        <p className="font-semibold">{maturityLevel.level}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-4">{getFeedback(score)}</p>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500 mb-1">
                        Perguntas respondidas: {
                          questions.filter(q => q.dimension === dimension && answers[q.id]).length
                        } de {
                          questions.filter(q => q.dimension === dimension).length
                        }
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Botões finais: Refazer e Imprimir */}
          <div className="flex justify-between">
            <button
              onClick={resetQuiz}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reiniciar Avaliação
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Imprimir Relatório
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Tela do questionário (fluxo principal)
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-2 text-center">Avaliação de Prontidão para IA</h1>
      <p className="text-center mb-6 text-gray-600">
        Um diagnóstico da maturidade da sua organização para implementação de IA
      </p>

      {/* Barra de progresso geral */}
      <div className="mb-4">
        <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
          <span>Progresso</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Indicador de progresso por dimensão */}
      <DimensionProgressIndicator />

      {/* Título da dimensão atual */}
      <div className="mb-4 text-center">
        <h2 
          className="text-xl font-bold"
          style={{ color: dimensionColors[currentDimension] }}
        >
          {dimensionTranslation[currentDimension]}
        </h2>
        <div className="flex items-center justify-center mt-2">
          <div className="w-12 h-12">
            <CircularProgressbar
              value={dimensionProgress}
              text={`${currentQuestionIndex + 1}/${filteredQuestions.length}`}
              styles={buildStyles({
                textSize: '30px',
                pathColor: dimensionColors[currentDimension],
                textColor: dimensionColors[currentDimension],
                trailColor: '#d1d5db'
              })}
            />
          </div>
        </div>
      </div>

      {/* Bloco de pergunta */}
      <div className={`mb-6 transition-all duration-300 ${
        animating 
          ? transitionDirection === "next" 
            ? "opacity-0 transform translate-x-full" 
            : "opacity-0 transform -translate-x-full"
          : "opacity-100 transform translate-x-0"
      }`}>
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            {currentQuestion?.text}
          </h3>
          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion?.id, option.value)}
                className={`w-full p-3 flex items-center justify-between rounded-lg transition-all ${
                  answers[currentQuestion?.id] === option.value
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-100"
                } border border-gray-200 shadow-sm`}
              >
                <span className="font-medium">{option.label}</span>
                <span className={`w-6 h-6 flex items-center justify-center rounded-full ${
                  answers[currentQuestion?.id] === option.value 
                    ? "bg-white text-blue-600" 
                    : `bg-${option.color}-100 text-${option.color}-600`
                }`}>
                  {option.value}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentDimension === "Business" && currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            currentDimension === "Business" && currentQuestionIndex === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Anterior
        </button>
        <button
          onClick={nextQuestion}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default AIAssessmentQuiz;
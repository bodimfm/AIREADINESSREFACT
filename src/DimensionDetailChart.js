import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LabelList
} from 'recharts';

// Componente para visualizar o detalhamento de cada dimensão
const DimensionDetailChart = ({ data, dimension, color }) => {
  // Mapear níveis para textos descritivos
  const getLevelText = (value) => {
    if (value < 1.5) return "Inicial";
    if (value < 2.5) return "Básico";
    if (value < 3.5) return "Intermediário";
    if (value < 4.5) return "Avançado";
    return "Otimizado";
  };
  
  // Função para calcular a cor com base no valor (gradiente)
  const getBarColor = (value) => {
    // Se uma cor específica foi fornecida, usar ela com diferentes opacidades
    if (color) {
      const opacity = 0.3 + (value / 5) * 0.7; // Varia de 0.3 a 1.0 baseado no valor
      // Extrair componentes RGB da cor hexadecimal
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    // Ou usar escala de cores padrão
    if (value < 1.5) return "#EF4444"; // Vermelho (Inicial)
    if (value < 2.5) return "#F97316"; // Laranja (Básico)
    if (value < 3.5) return "#FACC15"; // Amarelo (Intermediário)
    if (value < 4.5) return "#3B82F6"; // Azul (Avançado)
    return "#10B981"; // Verde (Otimizado)
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis 
            type="number" 
            domain={[0, 5]} 
            tickCount={6} 
            tick={{ fontSize: 12 }} 
          />
          <YAxis 
            dataKey="question" 
            type="category" 
            tick={{ fontSize: 12 }} 
            width={40}
          />
          <Tooltip 
            formatter={(value) => [`${value}/5.0`, 'Pontuação']}
            labelFormatter={(label) => `Questão ${label}`}
          />
          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
            ))}
            <LabelList 
              dataKey="value" 
              position="right" 
              style={{ fontSize: '12px', fill: '#333' }} 
              formatter={(value) => `${value} - ${getLevelText(value)}`} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DimensionDetailChart;
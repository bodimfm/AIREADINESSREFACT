// ScoreChart.js
import React from 'react';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const ScoreChart = ({ data }) => {
  // Garante que 'data' seja um array e filtra itens indefinidos ou sem "subject"
  const validData = Array.isArray(data) 
    ? data.filter(item => item && item.subject !== undefined) 
    : [];

  if (validData.length === 0) {
    return <p>Dados não disponíveis para exibir o gráfico.</p>;
  }

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RadarChart outerRadius={90} data={validData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis domain={[0, 5]} tick={{ fill: 'grey' }} />
          <Tooltip formatter={(value) => [value.toFixed(1), 'Pontuação']} />
          <Radar
            name="Pontuação"
            dataKey="value"
            stroke="#4338ca"
            fill="#4338ca"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
// ScoreChart.js
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const ScoreChart = ({ radarData }) => {
  if (!radarData || radarData.length === 0) {
    return <p>Dados não disponíveis</p>;
  }

  // Agrupar dados por dimensão
  const dimensions = [...new Set(radarData.map((item) => item.dimension))];

  // Cores para diferenciar gráficos
  const colors = ['#4338ca', '#f43f5e', '#14b8a6', '#eab308', '#8b5cf6'];

  return (
    <div>
      {dimensions.map((dim, index) => {
        const dimensionData = radarData.filter((item) => item.dimension === dim);
        return (
          <div key={dim} style={{ marginBottom: '40px', textAlign: 'center' }}>
            <h3 style={{ color: colors[index % colors.length], marginBottom: '10px' }}>
              {dim}
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dimensionData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, textAnchor: 'middle' }} />
                <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 10, fill: 'gray' }} />
                <Tooltip formatter={(value) => [value.toFixed(1), 'Pontuação']} />
                <Radar
                  name={dim}
                  dataKey="value"
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreChart;
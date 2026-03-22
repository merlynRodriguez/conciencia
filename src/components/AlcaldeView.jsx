import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import { PARTIDOS } from '../config';

export function AlcaldeView({ data, hideProfiles = false }) {
  const chartData = Object.keys(PARTIDOS).map(key => ({
    name: PARTIDOS[key].nombre,
    value: data[key] || 0,
    fill: PARTIDOS[key].color,
    foto: PARTIDOS[key].fotoAlcalde || '',
    candidato: PARTIDOS[key].candidatoAlcalde || ''
  })).sort((a, b) => b.value - a.value);

  const totalVotes = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const chartDataWPercentages = chartData.map(d => ({
    ...d,
    percentage: totalVotes > 0 ? ((d.value / totalVotes) * 100).toFixed(1) + '%' : '0%'
  }));

  const winner = chartDataWPercentages[0];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl border-2 border-brand shadow-2xl">
          <p className="font-black text-gray-900 text-lg">{payload[0].name}</p>
          <p className="text-brand font-bold">{payload[0].value.toLocaleString()} votos</p>
          {payload[0].payload.percentage && (
            <p className="text-gray-500 font-medium">{payload[0].payload.percentage}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const PieChartSection = (
    <div className={`glass-card p-6 flex flex-col items-center ${hideProfiles ? 'w-full max-w-2xl mx-auto' : ''}`}>
      <h3 className="text-2xl font-black text-brand-dark mb-4 text-center tracking-wide">Porcentaje de Votación</h3>
      <div className="flex-1 w-full min-h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartDataWPercentages}
              cx="50%"
              cy="50%"
              outerRadius={140}
              innerRadius={0}
              dataKey="value"
              label={({ name, percentage }) => `${name} (${percentage})`}
              labelLine={{ stroke: '#4b5563', strokeWidth: 1 }}
            >
              {chartDataWPercentages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const BarChartSection = (
    <div className="glass-card p-6">
      <h3 className="text-2xl font-black text-brand-dark mb-8 text-center tracking-wide">Total de Votos por Partido</h3>
      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartDataWPercentages}
            layout="vertical"
            margin={{ top: 5, right: 60, left: 140, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis type="number" stroke="#64748b" fontWeight="bold" />
            <YAxis dataKey="name" type="category" stroke="#1e293b" width={130} tick={{fill: '#1e293b', fontWeight: '900'}} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: '#f1f5f9'}} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {chartDataWPercentages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <LabelList dataKey="value" position="right" fill="#1e293b" style={{ fontWeight: '900', fontSize: '1.1rem' }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  if (hideProfiles) {
    return (
      <div className="space-y-6">
        {BarChartSection}
        {PieChartSection}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lado Izquierdo: Foto Ganador */}
        <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-black text-brand-dark mb-6 tracking-wide">Candidato Liderando</h3>
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-[6px] shadow-2xl overflow-hidden mb-8 relative group" style={{ borderColor: winner?.fill || '#e2e8f0' }}>
            {winner && winner.foto ? (
              <img src={winner.foto} alt={winner?.candidato} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-bold">Sin Foto</span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 pb-4 pt-16 to-transparent">
              <span className="text-white font-black text-4xl drop-shadow-md">{winner?.percentage}</span>
            </div>
          </div>
          <h2 className="text-4xl font-black text-gray-900">{winner?.candidato || '---'}</h2>
          <p className="text-2xl font-black mt-3 uppercase tracking-wider" style={{ color: winner?.fill || '#64748b' }}>
            {winner?.name}
          </p>
        </div>

        {/* Lado Derecho: Gráfico de Torta */}
        {PieChartSection}
      </div>

      {/* Abajo: Gráfico de Barras */}
      {BarChartSection}
    </div>
  );
}

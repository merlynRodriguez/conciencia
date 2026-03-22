import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';
import { User } from 'lucide-react';
import { PARTIDOS, TOTAL_ESCANOS } from '../config';

function calculateDHondt(votes, totalSeats) {
  let seats = [];
  let currentVotes = votes.map(v => ({ ...v, dividedVotes: v.value, seatsWon: 0 }));

  for (let i = 0; i < totalSeats; i++) {
    currentVotes.sort((a, b) => b.dividedVotes - a.dividedVotes);
    const winner = currentVotes[0];
    
    if (winner.dividedVotes === 0) break;

    const partyData = PARTIDOS[winner.id];
    let candidateName = `${partyData.nombre} (Concejal ${winner.seatsWon + 1})`;
    
    if (partyData && partyData.concejales && partyData.concejales[winner.seatsWon]) {
      candidateName = partyData.concejales[winner.seatsWon];
    }

    seats.push({
      seatNumber: i + 1,
      partyId: winner.id,
      partyName: winner.name,
      candidateName: candidateName,
      fill: winner.fill
    });

    winner.seatsWon += 1;
    winner.dividedVotes = winner.value / (winner.seatsWon + 1);
  }

  return { seats };
}

export function ConcejoView({ data, hideProfiles = false }) {
  const chartData = Object.keys(PARTIDOS).map(key => ({
    id: key,
    name: PARTIDOS[key].nombre,
    value: data[key] || 0,
    fill: PARTIDOS[key].color
  })).sort((a, b) => b.value - a.value);

  const totalVotes = chartData.reduce((acc, curr) => acc + curr.value, 0);
  const chartDataWPercentages = chartData.map(d => ({
    ...d,
    percentage: totalVotes > 0 ? ((d.value / totalVotes) * 100).toFixed(1) + '%' : '0%'
  }));

  const { seats } = useMemo(() => calculateDHondt(chartData, TOTAL_ESCANOS), [chartData]);

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lado Izquierdo: Siluetas de los Concejales asignados */}
        <div className="glass-card p-8">
          <h3 className="text-2xl font-black text-brand-dark mb-8 text-center tracking-wide">Escaños Asignados ({TOTAL_ESCANOS})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {Array.from({ length: TOTAL_ESCANOS }).map((_, idx) => {
              const seat = seats[idx];
              return (
                <div key={idx} className="flex flex-col items-center bg-white/20 backdrop-blur-md p-5 rounded-2xl shadow-md border border-white/30 hover:border-brand-light/40 transition-all hover:scale-105 hover:shadow-lg">
                  <div 
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 shadow-[0_8px_15px_-3px_rgba(0,0,0,0.2)] border-2 border-white/30"
                    style={{ backgroundColor: seat ? seat.fill : 'rgba(255, 255, 255, 0.5)' }}
                  >
                    <User size={36} color={seat ? "#fff" : "#94a3b8"} />
                  </div>
                  <div className="text-center w-full">
                    <p className="text-xs text-brand font-black tracking-widest bg-brand/5 rounded-full px-2 py-1 inline-block mb-2 border border-brand/10">ESCAÑO {idx + 1}</p>
                    {seat ? (
                      <>
                        <p className="text-xs md:text-sm font-black text-gray-800 leading-tight mt-1 line-clamp-2" title={seat.candidateName}>
                          {seat.candidateName}
                        </p>
                        <p className="text-[10px] md:text-xs uppercase font-black tracking-widest mt-2" style={{ color: seat.fill }}>
                          {seat.partyName}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-bold text-gray-400 mt-2">S/N</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lado Derecho: Gráfico de Torta */}
        {PieChartSection}
      </div>

      {/* Abajo: Gráfico de Barras */}
      {BarChartSection}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useElectionData } from './hooks/useElectionData';
import { PARTIDOS, PARTIDO_PRINCIPAL, TOTAL_MESAS, RECINTOS } from './config';
import { AlcaldeView } from './components/AlcaldeView';
import { ConcejoView } from './components/ConcejoView';
import { RecintoView } from './components/RecintoView';

function App() {
  const [activeTab, setActiveTab] = useState('alcalde'); // 'alcalde' o 'concejo'
  const [selectedRecinto, setSelectedRecinto] = useState('ALL');
  
  // hook handles fetching and aggregating data
  const { dataAlcalde, dataConcejo, mesasCount, loading } = useElectionData(selectedRecinto);

  const escrutadasPct = ((mesasCount / TOTAL_MESAS) * 100).toFixed(1);

  // Efecto Parallax en el fondo para móviles
  useEffect(() => {
    const handleScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollMax > 0) {
        const ratio = window.scrollY / scrollMax;
        document.documentElement.style.setProperty('--scroll-x', `${(ratio * 100).toFixed(2)}%`);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger una vez
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[-1] bg-dinamico opacity-90 transition-opacity duration-300" />
      <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row items-center justify-between glass-card p-6 border-t-[6px] border-t-brand">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand">
              ELECCIONES SUBNACIONALES 2026
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mt-2">
              Municipio de Vinto
            </h2>
            <p className="text-xs md:text-lg font-bold text-gray-700 mt-3 md:mt-2 tracking-wider md:tracking-widest uppercase opacity-90 drop-shadow-sm leading-relaxed">
              Conteo realizado por los voluntarios de <br className="md:hidden" />
              <span className="text-xl md:text-xl font-black text-brand-dark block md:inline mt-1 md:mt-0">
                CONCIENCIA VINTEÑA
              </span>
            </p>
          </div>
          <div className="mt-6 md:mt-0 bg-white/20 backdrop-blur-lg p-3 md:p-4 rounded-3xl flex items-center justify-center shadow-lg border border-brand/20 hover:border-brand/40 hover:shadow-xl transition-all duration-500 group">
            <img src="/img/logo.png" alt="Logotipo Conciencia Vinto" className="h-16 md:h-20 w-auto object-contain rounded-2xl drop-shadow-md group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.style.display='none' }} />
          </div>
        </header>

        {/* PROGRESS BAR */}
        <div className="glass-card p-6 border-l-4 border-l-brand-light">
          <div className="flex justify-between items-end mb-3">
            <span className="text-lg font-bold text-gray-800">Progreso de Escrutinio</span>
            <span className="text-sm md:text-lg font-black text-brand">
              {escrutadasPct}% mesas escrutadas: {mesasCount}/{TOTAL_MESAS}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden border border-gray-300 shadow-inner">
            <div 
              className="bg-gradient-to-r from-brand-light to-brand h-5 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${Math.min(escrutadasPct, 100)}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/40 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* TABS */}
        {selectedRecinto === 'ALL' && (
          <div className="flex space-x-2 md:space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('alcalde')}
              className={`flex-1 py-4 text-center rounded-2xl font-black text-lg transition-all duration-300 ${
                activeTab === 'alcalde' 
                  ? 'bg-brand text-white shadow-xl shadow-brand/30 ring-2 ring-brand-light/50 transform scale-[1.02]' 
                  : 'bg-white/20 backdrop-blur-md text-gray-800 hover:bg-white/40 hover:text-brand hover:shadow-md border border-white/30'
              }`}
            >
              ALCALDE
            </button>
            <button
              onClick={() => setActiveTab('concejo')}
              className={`flex-1 py-4 text-center rounded-2xl font-black text-lg transition-all duration-300 ${
                activeTab === 'concejo' 
                  ? 'bg-brand text-white shadow-xl shadow-brand/30 ring-2 ring-brand-light/50 transform scale-[1.02]' 
                  : 'bg-white/20 backdrop-blur-md text-gray-800 hover:bg-white/40 hover:text-brand hover:shadow-md border border-white/30'
              }`}
            >
              CONCEJO
            </button>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <div className="fade-in">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-brand"></div>
            </div>
          ) : (
            <>
              {selectedRecinto !== 'ALL' ? (
                <RecintoView 
                  dataAlcalde={dataAlcalde} 
                  dataConcejo={dataConcejo} 
                  recinto={selectedRecinto} 
                  onBack={() => setSelectedRecinto('ALL')}
                />
              ) : (
                activeTab === 'alcalde' ? (
                  <AlcaldeView data={dataAlcalde} />
                ) : (
                  <ConcejoView data={dataConcejo} />
                )
              )}
            </>
          )}
        </div>

        {/* RECINTO FILTERS AT BOTTOM */}
        {selectedRecinto === 'ALL' && (
          <div className="glass-card p-8 mt-12 mb-20 border-t-4 border-t-brand-light text-center md:text-left">
            <h3 className="text-2xl font-black text-brand-dark mb-2">Análisis por Recinto Electoral</h3>
            <p className="text-base text-gray-600 mb-6 font-medium">Seleccione un recinto para procesar y cargar los datos correspondientes en esta sección.</p>
            <select 
              value={selectedRecinto} 
              onChange={(e) => setSelectedRecinto(e.target.value)}
              className="w-full md:w-1/2 p-4 bg-white/20 backdrop-blur-md border-2 border-brand/30 rounded-2xl text-gray-900 font-bold text-lg focus:ring-4 focus:ring-brand/20 focus:border-brand focus:outline-none appearance-none shadow-sm transition-all cursor-pointer"
            >
              <option value="ALL">Vista General (Todos los Recintos)</option>
              {Object.keys(RECINTOS).map(r => {
                const rInfo = RECINTOS[r];
                return <option key={r} value={r}>{rInfo.nombre} ({r})</option>
              })}
            </select>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

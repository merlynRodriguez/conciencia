import React from 'react';
import { AlcaldeView } from './AlcaldeView';
import { ConcejoView } from './ConcejoView';
import { RECINTOS } from '../config';

export function RecintoView({ dataAlcalde, dataConcejo, recinto, onBack }) {
  const rInfo = RECINTOS[recinto] || { nombre: `Recinto ${recinto}` };
  return (
    <div className="space-y-12 fade-in relative">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-4 mb-6 bg-brand hover:bg-brand-light active:scale-95 text-white rounded-2xl font-black transition-all shadow-[0_8px_20px_rgba(27,94,32,0.25)] border-2 border-brand-light"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Volver al Dashboard Principal
      </button>

      <div className="bg-gradient-to-br from-brand/50 to-brand-light/40 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border-8 border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 w-full text-center md:text-left">
          <p className="text-white/80 font-black tracking-[0.2em] mb-2 uppercase text-sm md:text-base">Análisis de Resultados</p>
          <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-md leading-tight">
            {rInfo.nombre}
          </h2>
          <p className="bg-white/20 inline-block px-4 py-2 rounded-full font-black mt-4 text-xl md:text-2xl tracking-widest border border-white/30 backdrop-blur-md">
            CÓDIGO: {recinto}
          </p>
        </div>
        <div className="mt-8 md:mt-0 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-inner border border-white/20 text-center min-w-[200px] relative z-10">
            <span className="block text-white/70 text-sm font-black tracking-widest uppercase">Mesas Totales</span>
            <span className="block text-6xl font-black text-white mt-2 drop-shadow-lg">{rInfo.mesas}</span>
        </div>
      </div>

      <section className="bg-white/20 backdrop-blur-md rounded-[2.5rem] p-6 md:p-10 border border-white/30 shadow-lg">
        <div className="flex items-center justify-center gap-4 mb-10 pb-6 border-b-4 border-gray-300/30">
          <h3 className="text-4xl font-black text-brand-dark uppercase tracking-[0.1em] drop-shadow-sm">📊 Alcalde</h3>
        </div>
        <AlcaldeView data={dataAlcalde} hideProfiles={true} />
      </section>

      <div className="w-full h-2 bg-gradient-to-r from-transparent via-brand/40 to-transparent my-16 opacity-80 rounded-full drop-shadow-sm" />

      <section className="bg-white/20 backdrop-blur-md rounded-[2.5rem] p-6 md:p-10 border border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
        <div className="flex items-center justify-center gap-4 mb-10 pb-6 border-b-4 border-gray-300/30">
          <h3 className="text-4xl font-black text-brand-dark uppercase tracking-[0.1em] drop-shadow-sm">📊 Concejo</h3>
        </div>
        <ConcejoView data={dataConcejo} hideProfiles={true} />
      </section>
    </div>
  );
}

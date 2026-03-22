import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export function useElectionData(recintoFilter = 'ALL') {
  const [dataAlcalde, setDataAlcalde] = useState({});
  const [dataConcejo, setDataConcejo] = useState({});
  const [mesasCount, setMesasCount] = useState(0);
  const [recintos, setRecintos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const queryRecintos = recintoFilter === 'ALL' ? ['ALL'] : ['ALL', recintoFilter];
      const { data, error } = await supabase
        .from('totales_dashboard')
        .select('*')
        .in('recinto_id', queryRecintos);
        
      if (error) throw error;
      if (!data || data.length === 0) return;

      // Ubicar fila deseada
      const row = data.find(d => d.recinto_id === recintoFilter) || data.find(d => d.recinto_id === 'ALL');
      if (!row) return;

      // El conteo de mesas globales siempre se toma de la fila 'ALL' para la barra general
      const globalRow = data.find(d => d.recinto_id === 'ALL');
      if (globalRow) setMesasCount(globalRow.mesas_escrutadas);

      // Reconstruir objeto dataAlcalde
      const newAlcalde = {};
      const newConcejo = {};
      for (let i = 1; i <= 11; i++) {
        const pKey = `p${String(i).padStart(2, '0')}`;
        newAlcalde[pKey] = row[`alcalde_${pKey}`] || 0;
        newConcejo[pKey] = row[`concejo_${pKey}`] || 0;
      }
      newAlcalde.blancos = row.alcalde_blancos || 0;
      newAlcalde.nulos = row.alcalde_nulos || 0;
      newConcejo.blancos = row.concejo_blancos || 0;
      newConcejo.nulos = row.concejo_nulos || 0;

      setDataAlcalde(newAlcalde);
      setDataConcejo(newConcejo);

    } catch (err) {
      console.error('Error fetching dashboard totals:', err);
    } finally {
      if(loading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch inicial

    // Polling cada 30 segundos
    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, [recintoFilter]);

  return { dataAlcalde, dataConcejo, mesasCount, loading };
}

import React, { useEffect, useState } from 'react';
import LatestCard from './components/LatestCard';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/latest');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Erro ao buscar dados', e);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Smart Energy Monitor</h1>
      <p>Últimas leituras dos dispositivos:</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {Object.keys(data).length === 0 && <div>Nenhum dado recebido ainda.</div>}
        {Object.entries(data).map(([device, payload]) => (
          <LatestCard key={device} device={device} payload={payload} />
        ))}
      </div>
    </div>
  );
}

export default App;

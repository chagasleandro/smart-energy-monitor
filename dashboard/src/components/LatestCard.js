import React from 'react';

export default function LatestCard({ device, payload }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8, width: 280 }}>
      <h3>{device}</h3>
      <p><strong>Power:</strong> {payload.power ?? '-'} W</p>
      <p><strong>Voltage:</strong> {payload.voltage ?? '-'} V</p>
      <p><strong>Current:</strong> {payload.current ?? '-'} A</p>
      <p style={{ fontSize: 12, color: '#666' }}><strong>Recebido:</strong> {payload._receivedAt ?? '-'}</p>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

type LogEntry = {
  _id: string;
  method: string;
  url: string;
  statusCode: number;
  timestamp: string;
};

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
  fetch('http://localhost:5000/api/logs')
    .then(async res => {
      const text = await res.text();
      return JSON.parse(text);
    })
    .then(setLogs)
    .catch(err => console.error('Erreur lors du chargement des logs', err));
}, []);


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Logs de l'application</h1>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Méthode</th>
            <th className="p-2">URL</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map(log => (
            <tr key={log._id} className="border-t">
              <td className="p-2">{log.method}</td>
              <td className="p-2">{log.url}</td>
              <td className="p-2">{log.statusCode}</td>
              <td className="p-2">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

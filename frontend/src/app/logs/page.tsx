'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchLogs, LogEntry } from '@/lib/logApi';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Vous devez vous connecter");
      return;
    }
    fetchLogs(token)
      .then(setLogs)
      .catch(err => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-red-600 text-center">
        <h1 className="text-2xl font-bold mb-4">Erreur</h1>
        <p>{error}</p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-gray-700 rounded-xl text-white hover:bg-gray-800 transition"
        >
          Retour à l’accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Logs de l'application</h1>
        <Link
          href="/"
          className="px-6 py-2 bg-gray-700 rounded-xl text-white hover:bg-gray-800 transition"
        >
          Retour à l’accueil
        </Link>
      </div>
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
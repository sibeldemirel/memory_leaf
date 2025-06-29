'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchLogs, LogEntry } from '@/lib/logApi';

const LIMIT = 10;

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Vous devez vous connecter");
      return;
    }

    fetchLogs(token, page, LIMIT)
      .then(({ logs, total }) => {
        setLogs(logs);
        setTotal(total);
      })
      .catch(err => setError(err.message));
  }, [page]);

  const totalPages = Math.ceil(total / LIMIT);

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

      {error ? (
        <div className="text-red-600 text-center">{error}</div>
      ) : (
        <>
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

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              ◀ Précédent
            </button>
            <span className="text-gray-600">
              Page {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Suivant ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
}
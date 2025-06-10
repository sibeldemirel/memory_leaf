'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const { isLoggedIn, role, logout } = useAuth();


  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-semibold hover:underline">
        MemoryLeaf
      </Link>

      <nav className="flex gap-4 items-center">

        {isLoggedIn && role === 'ADMIN' && (
          <Link
            href="/logs"
            className="px-4 py-2 bg-amber-600 rounded hover:bg-amber-700 transition"
          >
            Voir les logs
          </Link>
        )}

        {isLoggedIn ? (
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition"
          >
            Déconnexion
          </button>
        ) : (
          <>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Inscription
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
            >
              Connexion
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

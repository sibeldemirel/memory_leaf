'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Menu, X } from 'lucide-react';

export function Header() {
  const { isLoggedIn, role, logout, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  
  return (
    <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center relative">
      <Link href="/" className="text-xl font-semibold hover:underline">
        MemoryLeaf
      </Link>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden"
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav
        className={`absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:flex ${
          menuOpen ? 'flex flex-col gap-2 p-4' : 'hidden'
        } md:flex-row md:items-center md:gap-4`}
      >
        {isLoggedIn && role === 'ADMIN' && (
          <Link
            href="/logs"
            className="px-4 py-2 bg-amber-600 rounded hover:bg-amber-700 transition text-center"
          >
            Voir les logs
          </Link>
        )}
        {isLoggedIn && (
          <Link
            href="/pomodoro"
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition text-center"
            target="_blank"
          >
            Timer Pomodoro
          </Link>
        )}
        {isLoggedIn ? (
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-center"
          >
            Déconnexion
          </button>
        ) : (
          <>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition text-center"
            >
              Inscription
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition text-center"
            >
              Connexion
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
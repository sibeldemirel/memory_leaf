'use client';

import Link from "next/link";
import { useState } from "react";

type EditDeckFormProps = {
  initialName: string;
  onSubmit: (name: string) => void;
};

export function EditDeckForm({ initialName, onSubmit }: EditDeckFormProps) {
  const [name, setName] = useState(initialName);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(name);
  }

  return (
    <section className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Modifier le deck</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom du deck
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <Link
            href="/decks"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Retour à la liste
          </Link>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </section>
  );
}

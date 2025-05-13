'use client';

import { useState } from "react";

type EditDeckFormProps = {
  initialName: string;
  initialPathname: string;
  onSubmit: (name: string, pathname: string) => void;
};

export function EditDeckForm({ initialName, initialPathname, onSubmit }: EditDeckFormProps) {
  const [name, setName] = useState(initialName);
  const [pathname, setPathname] = useState(initialPathname);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(name, pathname);
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

        <div>
          <label htmlFor="pathname" className="block text-sm font-medium text-gray-700 mb-1">
            Pathname
          </label>
          <input
            id="pathname"
            value={pathname}
            onChange={(e) => setPathname(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
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

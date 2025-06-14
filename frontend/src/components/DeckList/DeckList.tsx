import { Deck } from "@/types/Deck";
import Link from "next/link";

type DeckListProps = {
  decks: Deck[];
  onDelete: (id: string) => void;
  onAddClick: () => void;
};

export function DeckList({ decks, onDelete, onAddClick }: DeckListProps) {
  return (
    <div className="px-4 py-2 w-full bg-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-center">
          <thead>
            <tr>
              <th className="p-2 border-y border-gray-200 bg-gray-100 text-sm">Nom du paquet</th>
              <th className="p-2 border-y border-gray-200 bg-gray-100 text-sm hidden sm:table-cell">Nouvelles cartes</th>
              <th className="p-2 border-y border-gray-200 bg-gray-100 text-sm hidden md:table-cell">Cartes en apprentissage</th>
              <th className="p-2 border-y border-gray-200 bg-gray-100 text-sm hidden lg:table-cell">Cartes à réviser</th>
              <th className="p-2 border-y border-gray-200 bg-gray-100 text-sm text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {decks.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-gray-500 italic">
                  Aucun paquet trouvé.
                </td>
              </tr>
            ) : (
              decks.map((deck) => (
                <tr key={deck.id} className="p-2 hover:bg-gray-50 transition">
                  <td className="p-2 border-b border-gray-200 truncate">{deck.name}</td>
                  <td className="p-2 border-b border-gray-200 hidden sm:table-cell">{deck.newCardsCount}</td>
                  <td className="p-2 border-b border-gray-200 hidden md:table-cell">{deck.learningCardsCount}</td>
                  <td className="p-2 border-b border-gray-200 hidden lg:table-cell">{deck.reviewCardsCount}</td>
                  <td className="p-2 border-b border-gray-200 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Link
                        href={`/decks/${deck.id}/cards`}
                        className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition whitespace-nowrap"
                      >
                        Voir
                      </Link>
                      <Link
                        href={`/decks/${deck.id}/edit`}
                        className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition whitespace-nowrap"
                      >
                        Modifier
                      </Link>
                      <button
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition whitespace-nowrap"
                        onClick={() => onDelete(deck.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-4 flex justify-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition"
          >
            Retour à l'accueil
          </Link>
          <button
            onClick={onAddClick}
            className="px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
          >
            Ajouter un paquet
          </button>
        </div>
      </div>
    </div>
  );
}

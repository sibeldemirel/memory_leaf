import { Deck } from "@/types/Deck";
import Link from "next/link";

type DeckListProps = {
  decks: Deck[];
  onDelete: (name: string) => void;
};

export function DeckList({ decks, onDelete }: DeckListProps) {
  if (decks.length === 0) {
    return <p>Aucun deck trouvé.</p>;
  }

  return (
    <div className="p-6 overflow-x-auto w-full">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-y border-gray-200 bg-gray-100 p-4">Nom du deck</th>
            <th className="border-y border-gray-200 bg-gray-100 p-4">Nouvelles cartes</th>
            <th className="border-y border-gray-200 bg-gray-100 p-4">Cartes en apprentissage</th>
            <th className="border-y border-gray-200 bg-gray-100 p-4">Cartes à réviser</th>
            <th className="border-y border-gray-200 bg-gray-100 p-4 text-center">Actions</th> {/* 👈 Nouvelle colonne */}
          </tr>
        </thead>
        <tbody>
          {decks.map((deck) => (
            <tr key={deck.id} className="hover:bg-gray-50 transition">
              <td className="p-4 border-b border-gray-200">{deck.name}</td>
              <td className="p-4 border-b border-gray-200">{deck.newCardsCount}</td>
              <td className="p-4 border-b border-gray-200">{deck.learningCardsCount}</td>
              <td className="p-4 border-b border-gray-200">{deck.reviewCardsCount}</td>
              <td className="p-4 border-b border-gray-200 text-center">
                <div className="flex justify-center gap-2">
                  <Link
                    href={`/decks/${deck.id}`}
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition"
                  >
                    Voir
                  </Link>
                  <button
                    className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition"
                    onClick={() => alert(`Modifier le deck ${deck.name}`)}
                  >
                    Modifier
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition"
                    onClick={() => onDelete(deck.name)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

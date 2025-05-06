import { Deck } from "@/types/Deck";

type DeckListProps = {
  decks: Deck[];
};

export function DeckList({ decks }: DeckListProps) {
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
          </tr>
        </thead>
        <tbody>
          {decks.map((deck) => (
            <tr key={deck.id} className="hover:bg-gray-50 transition">
              <td className="p-4 border-b border-gray-200">{deck.name}</td>
              <td className="p-4 border-b border-gray-200">{deck.newCardsCount}</td>
              <td className="p-4 border-b border-gray-200">{deck.learningCardsCount}</td>
              <td className="p-4 border-b border-gray-200">{deck.reviewCardsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Card } from "@/types/Card";
import Link from "next/link";

type Props = {
  cards: Card[];
  loading: boolean;
  deckId: string;
};

export function DeckCardsList({ cards, loading, deckId }: Props) {
  if (loading) return <p>Chargement des cartes...</p>;
  if (cards.length === 0) return <p>Aucune carte trouvée pour ce deck.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Cartes du paquet</h1>
        <div className="flex gap-4">
          <Link
            href="/decks"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Retour aux paquets
          </Link>
          <Link
            href={`/decks/${deckId}/cards/new`}
            className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Ajouter une carte
          </Link>
        </div>
      </div>

      <ul className="space-y-2">
        {cards.map((card) => (
          <li key={card.id} className="p-2 border rounded bg-white shadow">
            <p><strong>Question:</strong> {card.question}</p>
            <p><strong>Réponse:</strong> {card.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
'use client';

import { Card } from "@/types/Card";
import Link from "next/link";

type Props = {
  cards: Card[];
  loading: boolean;
  deckId: string;
  onCreateCard: () => void;
  onEditCard: (card: Card) => void;
  onDeleteCard: (cardId: string) => void;
};

export function DeckCardsList({
  cards,
  loading,
  deckId,
  onCreateCard,
  onEditCard,
  onDeleteCard,
}: Props) {
  if (loading) return <p>Chargement des cartes...</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Cartes du paquet</h1>
        <div className="flex gap-4">
          <Link
            href="/decks"
            className="text-sm text-blue-600 hover:underline px-4 py-2 h-full flex items-center"
          >
            ← Retour aux paquets
          </Link>
          <button
            onClick={onCreateCard}
            className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Ajouter une carte
          </button>
        </div>
      </div>

      {cards.length === 0 ? (
        <p>Aucune carte trouvée pour ce paquet.</p>
      ) : (
        <ul className="space-y-2">
          {cards.map((card) => (
            <li key={card.id} className="p-4 border rounded bg-white shadow space-y-2">
              <p><strong>Question:</strong> {card.question}</p>
              <p><strong>Réponse:</strong> {card.answer}</p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => onEditCard(card)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => onDeleteCard(card.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

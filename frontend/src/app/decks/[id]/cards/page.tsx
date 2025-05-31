'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/types/Card";
import { fetchCardsByDeck } from "@/lib/cardApi";

export default function DeckDetailPage() {
  const params = useParams();
  const deckId = params.id as string;

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCards() {
      const result = await fetchCardsByDeck(deckId);
      setCards(result);
      setLoading(false);
    }

    if (deckId) loadCards();
  }, [deckId]);

  if (loading) return <p>Chargement des cartes...</p>;
  if (cards.length === 0) return <p>Aucune carte trouvée pour ce deck.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cartes du paquet</h1>
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

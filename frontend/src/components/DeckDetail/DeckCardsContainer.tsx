'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/types/Card";
import { fetchCardsByDeck } from "@/lib/cardApi";
import { DeckCardsList } from "./DeckCardsList";

export function DeckCardsContainer() {
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

  return <DeckCardsList cards={cards} loading={loading} />;
}

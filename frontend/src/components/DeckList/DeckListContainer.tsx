'use client';

import { useEffect, useState } from "react";
import { Deck } from "@/types/Deck";
import { DeckList } from "./DeckList";
import { fetchDecks } from "@/lib/deckApi";

export function DeckListContainer() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDecks() {
      try {
        const decksData = await fetchDecks();
        console.log("Decks récupérés :", decksData);
        setDecks(decksData);
      } catch (error) {
        console.error("Erreur dans loadDecks :", error); // 👈
      } finally {
        setLoading(false);
      }
    }
    loadDecks();
  }, []);

  if (loading) {
    return <p>Chargement des decks...</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <DeckList decks={decks} />
    </div>
  );
}

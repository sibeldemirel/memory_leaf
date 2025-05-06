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
        setDecks(decksData);
      } catch (error) {
        console.error("Erreur dans loadDecks :", error);
      } finally {
        setLoading(false);
      }
    }
    loadDecks();
  }, []);

  if (loading) {
    return <p>Chargement des decks...</p>;
  }

  function handleDelete(name: string) {
    if (confirm(`Es-tu sûr de vouloir supprimer le deck "${name}" ?`)) {
      alert(`Deck "${name}" supprimé ! 🚮`);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <DeckList decks={decks} onDelete={handleDelete}/>
    </div>
  );
}

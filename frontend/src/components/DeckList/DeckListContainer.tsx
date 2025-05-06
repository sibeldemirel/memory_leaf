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

  async function handleDelete(deckId: string) {
    if (!confirm("Es-tu sûr de vouloir supprimer ce deck ?")) {
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/decks/${deckId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Deck supprimé avec succès !");
        setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
      } else {
        alert("Erreur lors de la suppression du deck.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur inattendue lors de la suppression.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <DeckList decks={decks} onDelete={handleDelete} />
    </div>
  );
}

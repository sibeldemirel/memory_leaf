'use client';

import { useEffect, useState } from "react";
import { Deck } from "@/types/Deck";
import { DeckList } from "./DeckList";
import { AddDeckModal } from "./AddDeckModal";
import { fetchDecks, createDeck, deleteDeck } from "@/lib/deckApi";

export function DeckListContainer() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  async function handleDelete(deckId: string) {
    if (!confirm("Es-tu sûr de vouloir supprimer ce deck ?")) return;

    try {
      await deleteDeck(deckId);
      setDecks((prev) => prev.filter((deck) => deck.id !== deckId));
      alert("Deck supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression du deck.");
    }
  }

  async function handleAddDeck(name: string) {
    try {
      const newDeck = await createDeck({ name });
      setDecks((prev) => [...prev, newDeck]);
    } catch (error) {
      console.error("Erreur lors de la création du deck :", error);
      alert("Impossible d’ajouter le deck.");
    }
  }

  if (loading) {
    return <p>Chargement des decks...</p>;
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-white">
      <DeckList
        decks={decks}
        onDelete={handleDelete}
        onAddClick={() => setIsModalOpen(true)}
      />
      <AddDeckModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddDeck}
      />
    </div>
  );
}
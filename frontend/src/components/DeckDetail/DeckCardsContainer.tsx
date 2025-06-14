'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/types/Card";
import {
  fetchCardsByDeck,
  deleteCardById,
  createCard,
  updateCard,
} from "@/lib/cardApi";
import { DeckCardsList } from "./DeckCardsList";
import { CardFormModal } from "../CardForms/CardFormModal";

export function DeckCardsContainer() {
  const params = useParams();
  const deckId = params.id as string;

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | undefined>(undefined);

  useEffect(() => {
    async function loadCards() {
      const result = await fetchCardsByDeck(deckId);
      setCards(result);
      setLoading(false);
    }

    if (deckId) loadCards();
  }, [deckId]);

  async function handleDeleteCard(cardId: string) {
    try {
      await deleteCardById(cardId);
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte :", error);
    }
  }

  function handleCreateClick() {
    setEditingCard(undefined);
    setModalOpen(true);
  }

  function handleEditClick(card: Card) {
    setEditingCard(card);
    setModalOpen(true);
  }

  async function handleSubmitCard(
    cardData: Omit<Card, "id" | "pathname">,
    cardId?: string
  ) {
    try {
      if (cardId) {
        await updateCard(cardId, cardData);
      } else {
        await createCard({ ...cardData, deckId });
      }

      const updated = await fetchCardsByDeck(deckId);
      setCards(updated);
    } catch (error) {
      console.error("Erreur lors de la soumission de la carte :", error);
    }
  }

  return (
    <>
      <DeckCardsList
        cards={cards}
        loading={loading}
        deckId={deckId}
        onDeleteCard={handleDeleteCard}
        onEditCard={handleEditClick}
        onCreateCard={handleCreateClick}
      />
      <CardFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitCard}
        initialData={editingCard}
      />
    </>
  );
}
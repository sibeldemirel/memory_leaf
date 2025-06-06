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
import { CardFormModal } from "./CardFormModal";
import { DeckCardsList } from "../DeckDetail/DeckCardsList";

export function DeckCardsContainer() {
  const params = useParams();
  const deckId = params.id as string;

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | undefined>(undefined);

  useEffect(() => {
    async function loadCards() {
      setLoading(true);
      const result = await fetchCardsByDeck(deckId);
      setCards(result);
      setLoading(false);
    }

    if (deckId) loadCards();
  }, [deckId]);

  const refreshCards = async () => {
    const updated = await fetchCardsByDeck(deckId);
    setCards(updated);
  };

  const handleDeleteCard = async (cardId: string) => {
    await deleteCardById(cardId);
    await refreshCards();
  };

  const handleCreateClick = () => {
    setEditingCard(undefined);
    setModalOpen(true);
  };

  const handleEditClick = (card: Card) => {
    setEditingCard(card);
    setModalOpen(true);
  };

  const handleSubmitCard = async (
    cardData: Omit<Card, "id" | "pathname">,
    cardId?: string
  ) => {
    if (cardId) {
      await updateCard(cardId, cardData);
    } else {
      await createCard({ ...cardData, deckId });
    }
    await refreshCards();
  };

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

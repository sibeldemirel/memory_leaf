import { Card } from "@/types/Card";
import { getAuthHeaders } from "@/utils/getAuthHeaders";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCardsByDeck(deckId: string): Promise<Card[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/decks/${deckId}/cards`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    const json = await res.json();

    if (!res.ok || !json.success || !Array.isArray(json.data)) {
      throw new Error(json.message || "Erreur lors de la récupération des cartes");
    }

    return json.data as Card[];
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes :", error);
    return [];
  }
}

export async function deleteCardById(cardId: string): Promise<void> {
  try {
    const res = await fetch(`${BASE_URL}/api/cards/${cardId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.message || "Erreur lors de la suppression de la carte");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la carte :", error);
    throw error;
  }
}

export async function createCard(data: Omit<Card, "id">): Promise<Card> {
  try {
    const res = await fetch(`${BASE_URL}/api/cards`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || "Erreur lors de la création de la carte");
    }

    return json.data as Card;
  } catch (error) {
    console.error("Erreur lors de la création de la carte :", error);
    throw error;
  }
}

export async function updateCard(cardId: string, data: Partial<Card>): Promise<Card> {
  try {
    const res = await fetch(`${BASE_URL}/api/cards/${cardId}`, {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok || !json.success || !json.data) {
      throw new Error(json.message || "Erreur lors de la modification de la carte");
    }

    return json.data as Card;
  } catch (error) {
    console.error("Erreur lors de la modification de la carte :", error);
    throw error;
  }
}
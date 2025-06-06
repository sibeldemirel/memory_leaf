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

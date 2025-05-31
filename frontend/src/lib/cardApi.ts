import { Card } from "@/types/Card";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchCardsByDeck(deckId: string): Promise<Card[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/decks/${deckId}/cards`);
    const json = await res.json();
    return json.data as Card[];
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes :", error);
    return [];
  }
}
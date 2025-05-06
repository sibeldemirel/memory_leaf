import { Deck } from "@/types/Deck";

type DeckApiResponse = {
  success: boolean;
  data: Deck[];
};

export async function fetchDecks(): Promise<Deck[]> {
  try {
    const res = await fetch("http://localhost:5000/api/decks");
    const json: DeckApiResponse = await res.json();

    if (json.success && Array.isArray(json.data)) {
      return json.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des decks :", error);
    return [];
  }
}

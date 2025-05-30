import { Deck } from "@/types/Deck";

type DeckApiResponse = {
  success: boolean;
  data: Deck[] | Deck;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchDecks(): Promise<Deck[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/decks`);
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

export async function fetchDeckById(id: string): Promise<Deck | null> {
  try {
    const url = `${BASE_URL}/api/decks/${id}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const json = await res.json();
    return json.data as Deck;
  } catch (error) {
    console.error("Erreur lors de la récupération du deck", error);
    return null;
  }
}


export async function updateDeck(id: string, name: string) {
  const res = await fetch(`${BASE_URL}/api/decks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error('Erreur lors de la mise à jour du deck');
  }

  const data = await res.json();
  return data.data;
}
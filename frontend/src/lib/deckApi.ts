import { Deck } from "@/types/Deck";
import { getAuthHeaders } from "@/utils/getAuthHeaders";

type DeckApiResponse = {
  success: boolean;
  data: Deck[] | Deck;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createDeck({
  name,
}: {
  name: string;
}): Promise<Deck> {
  const res = await fetch(`${BASE_URL}/api/decks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ name }),
  });

  const json: DeckApiResponse = await res.json();

  if (!res.ok || !json.success || Array.isArray(json.data)) {
    throw new Error("Erreur lors de la création du deck");
  }

  return json.data as Deck;
}

export async function fetchDecks(): Promise<Deck[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/decks`, {
      headers: getAuthHeaders(),
    });
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
    const res = await fetch(`${BASE_URL}/api/decks/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
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
    headers: getAuthHeaders(),
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error('Erreur lors de la mise à jour du deck');
  }

  const data = await res.json();
  return data.data;
}

export async function deleteDeck(id: string) {
  const res = await fetch(`${BASE_URL}/api/decks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la suppression du deck");
  }

  const json = await res.json();
  return json.message;
}
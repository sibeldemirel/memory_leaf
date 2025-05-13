import { Deck } from "@/types/Deck";

type DeckApiResponse = {
  success: boolean;
  data: Deck[] | Deck;
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

export async function fetchDeckById(id: string): Promise<Deck | null> {
  try {
    const url = `http://localhost:5000/api/decks/${id}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    const text = await res.text();
    const json = JSON.parse(text);
    return json.data as Deck;
  } catch (error) {
    console.error("Erreur lors de la récupération du deck", error);
    return null;
  }
}


export async function updateDeck(id: string, updatedData: { name: string; pathname: string }): Promise<boolean> {
  try {
    const res = await fetch(`http://localhost:5000/api/decks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    return res.ok;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du deck :", error);
    return false;
  }
}
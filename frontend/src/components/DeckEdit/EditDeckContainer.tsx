'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchDeckById, updateDeck } from "@/lib/deckApi";
import { Deck } from "@/types/Deck";
import { EditDeckForm } from "./EditDeckForm";

export function EditDeckContainer() {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDeck() {
      const data = await fetchDeckById(id);
      setDeck(data);
      setLoading(false);
    }

    if (id) {
      loadDeck();
    }
  }, [id]);

  async function handleSubmit(name: string, pathname: string) {
    const success = await updateDeck(id, { name, pathname });
    if (success) {
      router.push("/");
    } else {
      alert("Erreur lors de la mise à jour.");
    }
  }

  if (loading) return <p className="p-4">Chargement...</p>;
  if (!deck) return <p className="p-4">Deck introuvable.</p>;

  return (
    <EditDeckForm
      initialName={deck.name}
      initialPathname={deck.pathname}
      onSubmit={handleSubmit}
    />
  );
}

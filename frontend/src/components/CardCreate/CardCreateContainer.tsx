'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CardCreateForm } from "./CardCreateForm";

export function CardCreateContainer() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.id as string;

  const [loading, setLoading] = useState(false);

  async function handleCreate(question: string, answer: string) {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          answer,
          deckId,
          dueDate: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      router.push(`/decks/${deckId}/cards`);
    } catch (error) {
      console.error("Erreur lors de la création de la carte :", error);
      alert("Échec de la création");
    } finally {
      setLoading(false);
    }
  }

  return <CardCreateForm onSubmit={handleCreate} loading={loading} />;
}

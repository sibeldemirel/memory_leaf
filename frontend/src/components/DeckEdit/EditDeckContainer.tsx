'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchDeckById, updateDeck } from '@/lib/deckApi';
import { EditDeckForm } from './EditDeckForm';
import toast from 'react-hot-toast';

export default function EditDeckContainer() {
  const { id } = useParams();
  const router = useRouter();
  const [deck, setDeck] = useState<{ id: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDeck() {
      try {
        const data = await fetchDeckById(id as string);
        setDeck(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDeck();
  }, [id]);

  const handleSubmit = async (name: string) => {
    try {
      const updated = await updateDeck(id as string, name);
      setDeck(updated);
      toast.success('✅ Deck mis à jour !');
    } catch (err) {
      toast.error('❌ Erreur lors de la mise à jour');
      console.error(err);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!deck) return <p>Deck introuvable.</p>;

  return <EditDeckForm initialName={deck.name} onSubmit={handleSubmit} />;
}
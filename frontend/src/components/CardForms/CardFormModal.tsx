'use client';

import { useState, useEffect } from "react";
import { Card } from "@/types/Card";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Card, "id" | "pathname">, cardId?: string) => void;
  initialData?: Card;
};

export function CardFormModal({ isOpen, onClose, onSubmit, initialData }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    } else {
      setQuestion("");
      setAnswer("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cardData = {
      question,
      answer,
      dueDate: new Date().toISOString(),
      deckId: initialData?.deckId || '',
    };

    onSubmit(cardData, initialData?.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{initialData ? "Modifier la carte" : "Ajouter une carte"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Question"
            className="w-full border p-2 rounded"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Réponse"
            className="w-full border p-2 rounded"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {initialData ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

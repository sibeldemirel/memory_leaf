'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Card = {
    id: string;
    question: string;
    answer: string;
};

export default function ReviewPage() {
    const { deckId } = useParams();
    const router = useRouter();
    const [cards, setCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        async function fetchCards() {
            const token = localStorage.getItem('token');

            if (!token) {
                setUnauthorized(true);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/review-sessions/${deckId}/cards`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 401) {
                    setUnauthorized(true);
                } else {
                    const data = await res.json();
                    setCards(data.data || []);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des cartes :', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCards();
    }, [deckId]);

    if (loading) return <p className="p-4">Chargement...</p>;
    if (unauthorized) return <p className="p-4 text-red-600">Vous devez être connecté pour accéder à cette session.</p>;
    if (cards.length === 0) return <p className="p-4">Aucune carte à réviser.</p>;
    if (currentIndex >= cards.length) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Bravo !</h2>
                <p className="text-lg">Vous avez terminé cette session de révision !</p>
                <button
                    className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                    onClick={() => router.push('/decks')}
                >
                    Retour aux paquets
                </button>
            </div>
        );
    }

    const currentCard = cards[currentIndex];

    function handleNextCard() {
        setShowAnswer(false);
        setCurrentIndex((prev) => prev + 1);
    }

    function handleEvaluate(difficulty: string) {
        console.log(`Carte notée : ${difficulty}`);
        handleNextCard();
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10 text-center">
            <h2 className="text-xl font-semibold mb-4">Carte {currentIndex + 1} / {cards.length}</h2>
            <p className="text-gray-800 text-lg mb-6">{currentCard.question}</p>

            {!showAnswer ? (
                <button
                    onClick={() => setShowAnswer(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Afficher la réponse
                </button>
            ) : (
                <>
                    <p className="mt-4 text-green-700 font-medium text-lg">{currentCard.answer}</p>
                    <div className="mt-6 flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => handleEvaluate('Très difficile')}
                            className="px-3 py-2 bg-red-200 text-red-800 text-sm rounded hover:bg-red-300 transition"
                        >
                            Très difficile
                        </button>
                        <button
                            onClick={() => handleEvaluate('Difficile')}
                            className="px-3 py-2 bg-orange-200 text-orange-800 text-sm rounded hover:bg-orange-300 transition"
                        >
                            Difficile
                        </button>
                        <button
                            onClick={() => handleEvaluate('Facile')}
                            className="px-3 py-2 bg-green-200 text-green-800 text-sm rounded hover:bg-green-300 transition"
                        >
                            Facile
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

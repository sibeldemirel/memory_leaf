import { Card, CardStatus, PrismaClient } from '@prisma/client';
import { slugify } from '../utils/slugify';
import { getDeckCounter } from '../utils/getDeckCounter';

const prisma = new PrismaClient();

interface CreateCardData {
  question: string;
  answer: string;
  dueDate: Date;
  deckId: string;
  status?: CardStatus;
}

export const createCardService = async (data: CreateCardData) => {
  const status: CardStatus = data.status ?? 'NEW';

  const counter = getDeckCounter(null, status);

  const deck = await prisma.deck.findUnique({ where: { id: data.deckId } });
  if (!deck) throw new Error('Deck not found');

  await prisma.deck.update({
    where: { id: data.deckId },
    data: {
      newCardsCount: Math.max(0, deck.newCardsCount + counter.newCardsCount),
      learningCardsCount: Math.max(0, deck.learningCardsCount + counter.learningCardsCount),
      reviewCardsCount: Math.max(0, deck.reviewCardsCount + counter.reviewCardsCount),
    },
  });

  return prisma.card.create({
    data: {
      question: data.question,
      answer: data.answer,
      dueDate: data.dueDate,
      deckId: data.deckId,
      status,
      pathname: slugify(data.question),
    },
  });
};

export const deleteCardService = async (id: string) => {
  const card = await prisma.card.findUnique({ where: { id } });
  if (!card) throw new Error('Card not found');

  // Suppression = oldStatus = card.status, newStatus = null
  const counter = getDeckCounter(card.status, null);

  const deck = await prisma.deck.findUnique({ where: { id: card.deckId } });
  if (!deck) throw new Error('Deck not found');

  await prisma.deck.update({
    where: { id: card.deckId },
    data: {
      newCardsCount: Math.max(0, deck.newCardsCount + counter.newCardsCount),
      learningCardsCount: Math.max(0, deck.learningCardsCount + counter.learningCardsCount),
      reviewCardsCount: Math.max(0, deck.reviewCardsCount + counter.reviewCardsCount),
    },
  });

  return prisma.card.delete({ where: { id } });
};

interface UpdateCardData {
  question?: string;
  answer?: string;
  dueDate?: Date;
  deckId?: string;
  status?: CardStatus;
}

export const updateCardService = async (id: string, data: UpdateCardData) => {
  const card = await prisma.card.findUnique({ where: { id } });
  if (!card) throw new Error('Card not found');

  // S'il y a changement de statut, on met à jour les compteurs
  if (data.status && data.status !== card.status) {
    const counter = getDeckCounter(card.status, data.status);

    const deck = await prisma.deck.findUnique({ where: { id: card.deckId } });
    if (!deck) throw new Error('Deck not found');

    await prisma.deck.update({
      where: { id: card.deckId },
      data: {
        newCardsCount: Math.max(0, deck.newCardsCount + counter.newCardsCount),
        learningCardsCount: Math.max(0, deck.learningCardsCount + counter.learningCardsCount),
        reviewCardsCount: Math.max(0, deck.reviewCardsCount + counter.reviewCardsCount),
      },
    });
  }

  return prisma.card.update({
    where: { id },
    data: {
      ...data,
      pathname: data.question ? slugify(data.question) : undefined,
    },
  });
};

export const getAllCardsService = async () => {
  return prisma.card.findMany({ orderBy: { createdAt: 'desc' } });
};

export async function getCardsByDeckIdService(deckId: string): Promise<Card[]> {
  return prisma.card.findMany({ where: { deckId } });
}
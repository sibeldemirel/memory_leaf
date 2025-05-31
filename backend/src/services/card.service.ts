import { Card, PrismaClient } from '@prisma/client';
import { slugify } from '../utils/slugify';

const prisma = new PrismaClient();

interface CreateCardData {
  question: string;
  answer: string;
  dueDate: Date;
  deckId: string;
}

export const createCardService = async (data: CreateCardData) => {
  const today = new Date();

  let fieldToIncrement: 'newCardsCount' | 'reviewCardsCount' | 'learningCardsCount' = 'newCardsCount';
  if (data.dueDate <= today) {
    fieldToIncrement = 'reviewCardsCount';
  }

  await prisma.deck.update({
    where: { id: data.deckId },
    data: {
      [fieldToIncrement]: {
        increment: 1,
      },
    },
  });

  return prisma.card.create({
    data: {
      ...data,
      pathname: slugify(data.question),
    },
  });
};

export const getAllCardsService = async () => {
  return prisma.card.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export async function getCardsByDeckIdService(deckId: string): Promise<Card[]> {
  return prisma.card.findMany({
    where: { deckId },
  });
}

export const updateCardService = async (id: string, data: Partial<CreateCardData>) => {
  return prisma.card.update({
    where: { id },
    data,
  });
};

export const deleteCardService = async (id: string) => {
  return prisma.card.delete({
    where: { id },
  });
};

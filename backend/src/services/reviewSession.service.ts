import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createReviewSessionService = async (userId: string, deckId: string) => {
  const session = await prisma.reviewSession.create({
    data: { userId, deckId },
  });

  const today = new Date();

  const card = await prisma.card.findFirst({
    where: {
      deckId,
      dueDate: { lte: today },
    },
    orderBy: { dueDate: 'asc' },
  });

  return { session, card };
};

export const getCardsToReviewService = async (deckId: string) => {
  const now = new Date();
  return prisma.card.findMany({
    where: {
      deckId,
      dueDate: {
        lte: now,
      },
    },
    orderBy: {
      dueDate: 'asc',
    },
  });
};


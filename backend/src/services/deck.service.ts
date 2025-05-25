import { Prisma, PrismaClient } from '@prisma/client';
import { slugify } from '../utils/slugify';

const prisma = new PrismaClient();

interface CreateDeckData {
  userId: any;
  name: string;
  pathname: string;
}

export const createDeckService = async (data: CreateDeckData) => {
  return prisma.deck.create({
    data: {
      name: data.name,
      pathname: data.pathname,
      user: {
        connect: { id: data.userId },
      },
    },
  });
};

export const getAllDecksService = async () => {
  return prisma.deck.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getDeckByIdService = async (id: string) => {
  return prisma.deck.findUnique({
    where: { id },
  });
};

interface UpdateDeckData {
  id: string;
  name: string;
//  userId: string;
}

export const updateDeckService = async (data: UpdateDeckData) => {
  const pathname = slugify(data.name);

  return prisma.deck.update({
    where: {
      id: data.id,
//      userId: data.userId, 
    },
    data: {
      name: data.name,
      pathname,
    },
  });
};


export const deleteDeckService = async (id: string) => {
  try {
    const deletedDeck = await prisma.deck.delete({
      where: { id },
    });
    return deletedDeck;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new Error('Deck not found');
      }
    }
    throw error;
  }
};
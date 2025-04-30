import { PrismaClient } from '@prisma/client';

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

export const updateDeckService = async (id: string, data: { name?: string; pathname?: string }) => {
  return prisma.deck.update({
    where: { id },
    data,
  });
};

export const deleteDeckService = async (id: string) => {
    return prisma.deck.delete({
      where: { id },
    });
  };
  
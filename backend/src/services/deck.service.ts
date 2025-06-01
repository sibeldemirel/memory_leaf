import { Prisma, PrismaClient, Role, User } from '@prisma/client';
import { slugify } from '../utils/slugify';

const prisma = new PrismaClient();

interface CreateDeckData {
  userId: string;
  name: string;
  pathname: string;
}

interface SimpleUser {
  userId: string;
  role: Role;
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

export const getAllDecksService = async (user: SimpleUser) => {
  const where = user.role === 'ADMIN' ? {} : { userId: user.userId };

  return prisma.deck.findMany({
    where,
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
}

export const updateDeckService = async (data: UpdateDeckData) => {
  const pathname = slugify(data.name);

  return prisma.deck.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      pathname,
    },
  });
};

export const deleteDeckService = async (id: string) => {
  try {
    return await prisma.deck.delete({
      where: { id },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new Error('Deck not found');
    }
    throw error;
  }
};

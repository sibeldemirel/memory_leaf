import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export const createUserService = async (data: CreateUserData) => {
  return prisma.user.create({
    data,
  });
};

export const getAllUsersService = async () => {
  return prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getUserDecksService = async (userId: string) => {
    return prisma.deck.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  };
  
  
  export const updateUserService = async (userId: string, data: Partial<CreateUserData>) => {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  };
  
  export const deleteUserService = async (userId: string) => {
    return prisma.user.delete({
      where: { id: userId },
    });
  };
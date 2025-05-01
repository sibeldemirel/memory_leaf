import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Card API', () => {
  let userId: string;
  let deckId: string;
  let cardId: string;

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        email: `user_${Date.now()}@memoryleaf.com`,
        name: `User_${Date.now()}`,
        password: 'password123',
      },
    });
    userId = user.id;

    const deck = await prisma.deck.create({
      data: {
        name: 'Deck Test',
        pathname: 'deck-test',
        userId: user.id,
      },
    });
    deckId = deck.id;
  });

  afterAll(async () => {
    if (cardId) {
      await prisma.card.delete({ where: { id: cardId } });
    }
    if (deckId) {
      await prisma.deck.delete({ where: { id: deckId } });
    }
    if (userId) {
      await prisma.user.delete({ where: { id: userId } });
    }
    await prisma.$disconnect();
  });

  it('should create a card', async () => {
    const response = await request(app)
      .post('/api/cards')
      .send({
        question: 'What is the capital of France?',
        answer: 'Paris',
        pathname: 'capital-france',
        dueDate: new Date().toISOString(),
        deckId,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    cardId = response.body.data.id;
  });

  it('should fetch cards', async () => {
    const response = await request(app)
      .get('/api/cards');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

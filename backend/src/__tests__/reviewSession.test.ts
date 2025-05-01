import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('ReviewSession API', () => {
  let userId: string;
  let deckId: string;

  beforeAll(async () => {
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: `testuser_${Date.now()}@memoryleaf.com`,
          name: `testuser_${Date.now()}`,
          password: 'password123',
        },
      });
    }
    userId = user.id;

    let deck = await prisma.deck.findFirst();
    if (!deck) {
      deck = await prisma.deck.create({
        data: {
          name: 'Test Deck',
          pathname: 'test-deck',
          userId: user.id,

        },
      });
    }
    deckId = deck.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new review session', async () => {
    const response = await request(app)
      .post('/api/review-sessions')
      .send({ userId, deckId });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.session).toBeDefined();
    expect(response.body.data.session.id).toBeDefined();
  });

  it('should fetch cards to review for a deck', async () => {
    const response = await request(app)
      .get(`/api/review-sessions/${deckId}/cards`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

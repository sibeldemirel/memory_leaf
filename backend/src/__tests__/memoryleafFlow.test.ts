import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('MemoryLeaf Complete Flow', () => {
  let userId: string;
  let deckId: string;

  beforeAll(async () => {
    await prisma.reviewSession.deleteMany();
    await prisma.card.deleteMany();
    await prisma.deck.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.reviewSession.deleteMany();
    await prisma.card.deleteMany();
    await prisma.deck.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: `testuser_${Date.now()}@memoryleaf.com`,
        name: `Test User`,
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    userId = response.body.data.id;
  });

  it('should create a deck', async () => {
    const response = await request(app)
      .post('/api/decks')
      .send({
        name: 'Test Deck',
        pathname: `deck-${Date.now()}`,
        userId,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    deckId = response.body.data.id;
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
  });

  it('should list all decks', async () => {
    const response = await request(app).get('/api/decks');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should list all cards', async () => {
    const response = await request(app).get('/api/cards');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should get cards to review', async () => {
    const response = await request(app).get(`/api/review-sessions/${deckId}/cards`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should create a review session', async () => {
    const response = await request(app)
      .post('/api/review-sessions')
      .send({
        userId,
        deckId,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });
});

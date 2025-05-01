import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User API', () => {
  let userId: string;

  afterAll(async () => {
    if (userId) {
      await prisma.user.delete({ where: { id: userId } });
    }
    await prisma.$disconnect();
  });

  it('should create a user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: `user_${Date.now()}@memoryleaf.com`,
        name: `User_${Date.now()}`,
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeDefined();
    userId = response.body.data.id;
  });

  it('should fetch users', async () => {
    const response = await request(app)
      .get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

// src/__tests__/ping.test.ts
import request from 'supertest';
import app from '../index';

describe('GET /ping', () => {
  it('should respond with pong', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200);
    expect(response.text).toBe('pong');
  });
});

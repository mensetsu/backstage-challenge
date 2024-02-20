import { getVoidLogger } from '@backstage/backend-common';
import express from 'express';
import request from 'supertest';

import { createRouter } from './router';

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const router = await createRouter({
      logger: getVoidLogger(),
    });
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /health', () => {
    it('returns ok', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('GET /users', () => {
    it('returns 200', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toEqual(200);
    });

    it('returns a list of users', async () => {
      const response = await request(app).get('/users');
      expect(response.status).toEqual(200);
      expect(response.body.results.length).toEqual(20);
    });
  });
});

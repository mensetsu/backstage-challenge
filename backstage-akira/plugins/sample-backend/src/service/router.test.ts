import { getVoidLogger } from '@backstage/backend-common';
import express from 'express';
import request from 'supertest';

import {
  User,
  createRouter,
  getPageOfUsers,
  getMD5,
  exampleUsers,
} from './router';

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
      // sanity check that md5 is in response
      expect(response.body.results[0]).toStrictEqual({
        gender: 'female',
        name: {
          title: 'Miss',
          first: 'Carolyn',
          last: 'Moore',
        },
        email: 'carolyn.moore@example.com',
        picture: 'https://ui-avatars.com/api/name=Carolyn',
        nat: 'GB',
        md5: '4dd379070b058d0b58d537fe19730e3a',
      });
    });
  });

  describe('utility methods', () => {
    it('md5 hashing', () => {
      expect(getMD5('akira')).toBe('96eea1fa04bd82b22db09e12a7bd85ee');
    });

    it('check that all users have md5 hash populated', () => {
      const emptyStringHash = 'd41d8cd98f00b204e9800998ecf8427e';
      exampleUsers.results.forEach(user => {
        expect(user.md5).toBeTruthy();
        expect(user.md5).not.toBe(emptyStringHash);
      });
    });
  });

  describe('getPageOfUsers', () => {
    // just check the size of list and the last name of the first and last elements
    // note: checking the last name prob isn't the best field to use but seems to be unique enough for this small data set
    function assertPage(
      users: User[],
      size: number,
      firstElementName?: string,
      lastElementName?: string,
    ) {
      expect(users.length).toBe(size);
      if (size > 0) {
        expect(users[0].name.last).toBe(firstElementName);
        expect(users[size - 1].name.last).toBe(lastElementName);
      }
    }

    it('edge cases', () => {
      expect(getPageOfUsers(exampleUsers.results, -1)).toEqual([]);
      expect(getPageOfUsers(exampleUsers.results, 0)).toEqual([]);
      expect(getPageOfUsers(exampleUsers.results, -0)).toEqual([]);
      expect(
        getPageOfUsers(
          exampleUsers.results,
          exampleUsers.results.length / 5 + 1,
        ),
      ).toEqual([]);
    });

    it('happy path with exampleUsers', () => {
      assertPage(
        getPageOfUsers(exampleUsers.results, 1),
        5,
        'Moore',
        'Lambert',
      );
      assertPage(
        getPageOfUsers(exampleUsers.results, exampleUsers.results.length / 5),
        5,
        'Jenkins',
        'da Cunha',
      );
    });

    it('test page smaller than page size and entire user info', () => {
      const david = {
        gender: 'male',
        name: {
          title: 'Mr',
          first: 'David',
          last: 'DaVinci',
        },
        email: 'david.davinci@example.com',
        picture: 'https://ui-avatars.com/api/name=David',
        nat: 'IT',
        md5: 'xxxHashxxx',
      };
      const smallList = [david];
      expect(getPageOfUsers(smallList, 1)).toEqual(smallList);
    });
  });
});

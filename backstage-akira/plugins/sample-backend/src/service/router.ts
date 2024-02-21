import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { createHash } from 'crypto';

export interface RouterOptions {
  logger: Logger;
}

/**
 * MD5 the email param
 * @param email
 * @returns MD5'ed email
 */
export function getMD5(email: string): string {
  return createHash('md5').update(email).digest('hex');
}

export type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: string;
  nat: string;
  md5: string;
};

type PartialUserResults = {
  results: Partial<User>[];
};

type UserResults = {
  results: User[];
};

const examplePartialUsers: PartialUserResults = {
  results: [
    {
      gender: 'female',
      name: {
        title: 'Miss',
        first: 'Carolyn',
        last: 'Moore',
      },
      email: 'carolyn.moore@example.com',
      picture: 'https://ui-avatars.com/api/name=Carolyn',
      nat: 'GB',
    },
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Esma',
        last: 'Berberoğlu',
      },
      email: 'esma.berberoglu@example.com',
      picture: 'https://ui-avatars.com/api/name=Esma',
      nat: 'TR',
    },
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Isabella',
        last: 'Rhodes',
      },
      email: 'isabella.rhodes@example.com',
      picture: 'https://ui-avatars.com/api/name=Isabella',
      nat: 'GB',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Derrick',
        last: 'Carter',
      },
      email: 'derrick.carter@example.com',
      picture: 'https://ui-avatars.com/api/name=Derrick',
      nat: 'IE',
    },
    {
      gender: 'female',
      name: {
        title: 'Miss',
        first: 'Mattie',
        last: 'Lambert',
      },
      email: 'mattie.lambert@example.com',
      picture: 'https://ui-avatars.com/api/name=Mattie',
      nat: 'AU',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Mijat',
        last: 'Rakić',
      },
      email: 'mijat.rakic@example.com',
      picture: 'https://ui-avatars.com/api/name=Mijat',
      nat: 'RS',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Javier',
        last: 'Reid',
      },
      email: 'javier.reid@example.com',
      picture: 'https://ui-avatars.com/api/name=Javier',
      nat: 'US',
    },
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Isabella',
        last: 'Li',
      },
      email: 'isabella.li@example.com',
      picture: 'https://ui-avatars.com/api/name=Isabella',
      nat: 'CA',
    },
    {
      gender: 'female',
      name: {
        title: 'Mrs',
        first: 'Stephanie',
        last: 'Garrett',
      },
      email: 'stephanie.garrett@example.com',
      picture: 'https://ui-avatars.com/api/name=Stephanie',
      nat: 'AU',
    },
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Antonia',
        last: 'Núñez',
      },
      email: 'antonia.nunez@example.com',
      picture: 'https://ui-avatars.com/api/name=Antonia',
      nat: 'ES',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Donald',
        last: 'Young',
      },
      email: 'donald.young@example.com',
      picture: 'https://ui-avatars.com/api/name=Donald',
      nat: 'US',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Iegor',
        last: 'Holodovskiy',
      },
      email: 'iegor.holodovskiy@example.com',
      picture: 'https://ui-avatars.com/api/name=Iegor',
      nat: 'UA',
    },
    {
      gender: 'female',
      name: {
        title: 'Madame',
        first: 'Jessica',
        last: 'David',
      },
      email: 'jessica.david@example.com',
      picture: 'https://ui-avatars.com/api/name=Jessica',
      nat: 'CH',
    },
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Eve',
        last: 'Martinez',
      },
      email: 'eve.martinez@example.com',
      picture: 'https://ui-avatars.com/api/name=Eve',
      nat: 'FR',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Caleb',
        last: 'Silva',
      },
      email: 'caleb.silva@example.com',
      picture: 'https://ui-avatars.com/api/name=Caleb',
      nat: 'US',
    },
    {
      gender: 'female',
      name: {
        title: 'Miss',
        first: 'Marcia',
        last: 'Jenkins',
      },
      email: 'marcia.jenkins@example.com',
      picture: 'https://ui-avatars.com/api/name=Marcia',
      nat: 'US',
    },
    {
      gender: 'female',
      name: {
        title: 'Mrs',
        first: 'Mackenzie',
        last: 'Jones',
      },
      email: 'mackenzie.jones@example.com',
      picture: 'https://ui-avatars.com/api/name=Mackenzie',
      nat: 'NZ',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Jeremiah',
        last: 'Gutierrez',
      },
      email: 'jeremiah.gutierrez@example.com',
      picture: 'https://ui-avatars.com/api/name=Jeremiah',
      nat: 'AU',
    },
    {
      gender: 'female',
      name: {
        title: 'Ms',
        first: 'Luciara',
        last: 'Souza',
      },
      email: 'luciara.souza@example.com',
      picture: 'https://ui-avatars.com/api/name=Luciara',
      nat: 'BR',
    },
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Valgi',
        last: 'da Cunha',
      },
      email: 'valgi.dacunha@example.com',
      picture: 'https://ui-avatars.com/api/name=Valgi',
      nat: 'BR',
    },
  ],
};

function userWithMD5(email?: string): User {
  return {
    gender: '',
    name: {
      title: '',
      first: '',
      last: '',
    },
    email: '',
    picture: '',
    nat: '',
    md5: getMD5(email || ''),
  };
}

// fill out md5 field for all partial users
export const exampleUsers: UserResults = {
  results: examplePartialUsers.results.map(partial => ({
    ...userWithMD5(partial.email),
    ...partial,
  })),
};
// NOTE: manually create an invalid md5
exampleUsers.results[1].email = 'invalid-md5@example.com';
exampleUsers.results[1].md5 = 'invalid-md5';

export async function createRouter({
  logger,
}: RouterOptions): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/users', (_, response) => {
    response.json(exampleUsers);
  });
  router.use(errorHandler());
  return router;
}

/**
 * Return a subset of 5 Users, signfied by page (number).
 * @param users list of users
 * @param page the page number to return
 * @returns subset of Users
 */
export function getPageOfUsers(users: User[], page = 1): User[] {
  const size = 5;
  // handle edge cases
  if (!page || page < 1 || page > Math.ceil(users.length / size)) {
    return [];
  }
  const offset = size * (page - 1);
  const possibleEnd = size * page;
  const end = possibleEnd > users.length ? users.length : possibleEnd;
  return users.slice(offset, end);
}

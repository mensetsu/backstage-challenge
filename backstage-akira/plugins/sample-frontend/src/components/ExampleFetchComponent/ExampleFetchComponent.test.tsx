import React from 'react';
import { screen } from '@testing-library/react';

import { ExampleFetchComponent, matchesMD5 } from './ExampleFetchComponent';
import {
  MockConfigApi,
  TestApiProvider,
  renderInTestApp,
  setupRequestMockHandlers,
} from '@backstage/test-utils';
import { configApiRef } from '@backstage/core-plugin-api';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Fix: TextEncoder is not defined - errors
import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });

const mockConfig = new MockConfigApi({
  backend: { baseUrl: 'http://example.com' },
});
const testData = {
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
  ],
};

describe('ExampleFetchComponent', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  setupRequestMockHandlers(server);

  beforeEach(() => {
    server.use(
      rest.get('http://example.com/*', (_, res, ctx) =>
        res(ctx.status(200), ctx.json(testData)),
      ),
    );
  });

  it('renders the user table', async () => {
    await renderInTestApp(
      <TestApiProvider apis={[[configApiRef, mockConfig]]}>
        <ExampleFetchComponent />
      </TestApiProvider>,
    );

    // Wait for the table to render
    const nationality = screen.getAllByText('GB');
    expect(screen.getByAltText('Carolyn')).toBeInTheDocument();
    expect(screen.getByText('Miss Carolyn Moore')).toBeInTheDocument();
    expect(screen.getByText('carolyn.moore@example.com')).toBeInTheDocument();
    expect(nationality[0]).toBeInTheDocument();
  });
});

describe('Utility methods', () => {
  it('matches MD5', () => {
    expect(matchesMD5('', 'd41d8cd98f00b204e9800998ecf8427e')).toBeTruthy();
    expect(
      matchesMD5('no match', 'd41d8cd98f00b204e9800998ecf8427e'),
    ).toBeFalsy();
  });
});

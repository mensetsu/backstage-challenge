import React from 'react';
import { ExampleComponent } from './ExampleComponent';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import {
  setupRequestMockHandlers,
  renderInTestApp,
  MockConfigApi,
  TestApiProvider,
} from '@backstage/test-utils';
import { configApiRef } from '@backstage/core-plugin-api';

const mockConfig = new MockConfigApi({
  backend: { baseUrl: '/test-url' },
});

describe('ExampleComponent', () => {
  const server = setupServer();
  // Enable sane handlers for network requests
  setupRequestMockHandlers(server);

  // setup mock response
  beforeEach(() => {
    server.use(
      rest.get('/*', (_, res, ctx) => res(ctx.status(200), ctx.json({}))),
    );
  });

  it('should render', async () => {
    await renderInTestApp(
      <TestApiProvider apis={[[configApiRef, mockConfig]]}>
        <ExampleComponent />
      </TestApiProvider>,
    );
    expect(screen.getByText('Welcome to sample-frontend!')).toBeInTheDocument();
  });
});

import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const sampleFrontendPlugin = createPlugin({
  id: 'sample-frontend',
  routes: {
    root: rootRouteRef,
  },
});

export const SampleFrontendPage = sampleFrontendPlugin.provide(
  createRoutableExtension({
    name: 'SampleFrontendPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

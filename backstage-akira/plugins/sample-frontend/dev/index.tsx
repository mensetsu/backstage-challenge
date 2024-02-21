import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { sampleFrontendPlugin, SampleFrontendPage } from '../src/plugin';

createDevApp()
  .registerPlugin(sampleFrontendPlugin)
  .addPage({
    element: <SampleFrontendPage />,
    title: 'Root Page',
    path: '/sample-frontend'
  })
  .render();

import { createRouter } from '@internal/plugin-sample-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';
import { getRootLogger } from '@backstage/backend-common';

const logger = getRootLogger();

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  // Here is where you will add all of the required initialization code that
  // your backend plugin needs to be able to start!

  // The env contains a lot of goodies, but our router currently only
  // needs a logger
  return await createRouter({
    logger,
  });
}

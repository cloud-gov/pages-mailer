import fastify from 'fastify';
import fastifyBasicAuth from '@fastify/basic-auth';

import { auth, mailer } from './plugins/index.js';
import { healthCheck, send } from './routes/index.js';

async function build(config = {}) {
  const app = fastify(config.fastify);

  app.register(fastifyBasicAuth, { validate: auth(config.auth) });
  app.register(mailer, { config: config.mailer });
  app.setErrorHandler((err, req, reply) => {
    if (err.statusCode === 401) {
      reply.code(401).send({ error: 'unauthorized' });
      return;
    }
    reply.send(err);
  });

  await app.after();

  app.route(healthCheck);
  app.route({ ...send, onRequest: app.basicAuth });

  return app;
}

export default build;

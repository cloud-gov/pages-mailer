import fp from 'fastify-plugin';

import Mailer from '../mailer.js';

async function mailerPlugin(fastify, { config }) {
  const mailer = new Mailer(config);
  await mailer.verify();

  fastify.decorate('mailer', mailer);

  fastify.addHook('onClose', async () => {
    await mailer.close();
  });
}

export default fp(mailerPlugin);

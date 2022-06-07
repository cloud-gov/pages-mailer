import app from './app.js';
import {
  auth, fastify, host, mailer, port,
} from './config.js';

const start = async () => {
  const server = await app({ auth, fastify, mailer });

  try {
    await server.ready();
    await server.listen(port, host);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

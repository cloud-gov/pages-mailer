import app from './app.js';
import config, { host, port } from './config.js';

const start = async () => {
  const server = await app({
    config,
    logger: true,
  });

  try {
    await server.ready();
    await server.listen(port, host);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

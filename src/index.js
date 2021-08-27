import app from './app.js';
import config, { host, https, port } from './config.js';

const start = async () => {
  const server = await app({
    config,
    https,
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

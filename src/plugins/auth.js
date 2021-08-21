import fastifyBasicAuth from 'fastify-basic-auth';
import fp from 'fastify-plugin';

async function authPlugin(fastify, { config }) {
  async function validate(username, password) {
    if (username !== config.username || password !== config.password) {
      throw new Error('Authentication failed.');
    }
  }
  fastify.register(fastifyBasicAuth, { validate });
}

export default fp(authPlugin);

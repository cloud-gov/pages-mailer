import tap from 'tap';

import app from '../src/app.js';

const username = 'user';
const password = 'pass';

const opts = {
  config: {
    auth: { username, password },
    mailer: { from: 'test@example.gov', jsonTransport: true },
  },
};

const authHeader = {
  Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
};

tap.test('GET `/health` health check', async (t) => {
  const status = 200;
  const message = { message: 'ok' };

  const server = await app(opts);

  const response = await server.inject({
    method: 'GET',
    url: '/health',
  });

  t.equal(response.statusCode, status, `status: ${status}`);
  t.same(response.json(), message, JSON.stringify(message));
});

tap.test('POST `/send` requires authentication', async (t) => {
  const status = 401;
  const message = { error: 'unauthorized' };

  const server = await app(opts);

  const response = await server.inject({
    method: 'POST',
    url: '/send',
  });

  t.equal(response.statusCode, status, `status: ${status}`);
  t.same(response.json(), message, JSON.stringify(message));
});

tap.test('POST `/send` without body', async (t) => {
  const status = 400;
  const message = {
    error: 'Bad Request',
    message: 'body should be object',
  };

  const server = await app(opts);

  const response = await server.inject({
    method: 'POST',
    url: '/send',
    headers: { ...authHeader },
  });

  t.equal(response.statusCode, status, `status: ${status}`);
  t.same(response.json(), { statusCode: 400, ...message }, JSON.stringify(message));
});

tap.test('POST `/send` without required property', async (t) => {
  const status = 400;
  const message = {
    error: 'Bad Request',
    message: "body should have required property 'html'",
  };

  const server = await app(opts);

  const response = await server.inject({
    method: 'POST',
    url: '/send',
    headers: { ...authHeader },
    payload: {},
  });

  t.equal(response.statusCode, status, `status ${status}`);
  t.same(response.json(), { statusCode: status, ...message }, JSON.stringify(message));
});

tap.test('POST `/send`', async (t) => {
  const status = 200;
  const message = { message: 'email sent' };

  const server = await app(opts);

  const response = await server.inject({
    method: 'POST',
    url: '/send',
    headers: { ...authHeader },
    payload: {
      html: '<h1>Hello World</h1>',
      subject: 'test',
      to: ['foo@bar.com'],
    },
  });

  t.equal(response.statusCode, status, `status: ${status}`);
  t.same(response.json(), message, JSON.stringify(message));
});

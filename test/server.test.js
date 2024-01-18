import { expect, test } from 'vitest';

import app from '../src/app.js';

const username = 'user';
const password = 'pass';

const opts = {
  auth: { username, password },
  mailer: { from: 'test@example.gov', jsonTransport: true },
};

const authHeader = {
  Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
    'base64'
  )}`,
};

test('GET `/health` health check', async () => {
  const status = 200;
  const message = { message: 'ok' };

  const server = await app(opts);

  const response = await server.inject({
    method: 'GET',
    url: '/health',
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual(message);
});

test('POST `/send` requires authentication', async () => {
  const status = 401;
  const message = { error: 'unauthorized' };

  const server = await app(opts);

  const response = await server.inject({
    method: 'POST',
    url: '/send',
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual(message);
});

test('POST `/send` without body', async () => {
  const status = 400;
  const message = {
    error: 'Bad Request',
    code: 'FST_ERR_VALIDATION',
    message: 'body must be object',
  };

  const server = await app(opts);

  const response = await server.inject({
    method: 'POST',
    url: '/send',
    headers: { ...authHeader },
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual({ statusCode: 400, ...message });
});

test('POST `/send` without required property', async () => {
  const status = 400;
  const message = {
    error: 'Bad Request',
    code: 'FST_ERR_VALIDATION',
    message:
      "body must have required property 'to', body must have required property 'cc', body must have required property 'bcc', body must match a schema in anyOf",
  };

  const server = await app(opts);

  const response = await server.inject({
    method: 'POST',
    url: '/send',
    headers: { ...authHeader },
    payload: {},
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual({ statusCode: status, ...message });
});

test('POST `/send to all recipient types`', async () => {
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
      cc: ['foo-cc@bar.com'],
      bcc: ['foo-bcc@bar.com'],
    },
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual(message);
});

test('POST `/send to > 1 recipient types`', async () => {
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
      cc: ['foo-cc@bar.com'],
    },
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual(message);
});

test('POST `/send to`', async () => {
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

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual(message);
});

test('POST `/send cc`', async () => {
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
      cc: ['foo@bar.com'],
    },
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual(message);
});

test('POST `/send bcc`', async () => {
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
      bcc: ['foo@bar.com'],
    },
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual(message);
});

test('POST `/send without recipients`', async () => {
  const status = 400;
  const message = {
    error: 'Bad Request',
    code: 'FST_ERR_VALIDATION',
    message:
      "body must have required property 'to', body must have required property 'cc', body must have required property 'bcc', body must match a schema in anyOf",
  };
  const server = await app(opts);

  const response = await server.inject({
    method: 'POST',
    url: '/send',
    headers: { ...authHeader },
    payload: {
      html: '<h1>Hello World</h1>',
      subject: 'test',
    },
  });

  expect(response.statusCode).toEqual(status);
  expect(response.json()).toEqual({ statusCode: status, ...message });
});

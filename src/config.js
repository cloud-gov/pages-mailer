import fs from 'fs';

const {
  AUTH_USERNAME,
  AUTH_PASSWORD,
  CF_INSTANCE_CERT,
  CF_INSTANCE_KEY,
  FROM,
  HOST,
  PORT,
  SMTP_CERT,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
  TRANSPORT,
} = process.env;

export const auth = {
  password: AUTH_PASSWORD,
  username: AUTH_USERNAME,
};

export const host = HOST;

export const https = CF_INSTANCE_CERT
  ? {
    cert: fs.readFileSync(CF_INSTANCE_CERT),
    key: fs.readFileSync(CF_INSTANCE_KEY),
  }
  : null;

export const port = PORT;

export const mailer = TRANSPORT === 'smtp'
  ? {
    from: FROM,
    host: SMTP_HOST,
    port: SMTP_PORT,
    pool: true,
    secure: false,
    requireTLS: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    tls: {
      ca: SMTP_CERT,
    },
  }
  : {
    from: FROM,
    jsonTransport: true,
  };

export default {
  auth, host, https, mailer, port,
};

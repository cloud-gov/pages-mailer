const {
  AUTH_USERNAME,
  AUTH_PASSWORD,
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
  auth, host, mailer, port,
};

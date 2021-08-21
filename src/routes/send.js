export default {
  method: 'POST',
  url: '/send',
  schema: {
    body: {
      type: 'object',
      required: ['html', 'subject', 'to'],
      properties: {
        html: { type: 'string' },
        subject: { type: 'string' },
        to: { type: 'array', minItems: 1, items: { type: 'string' } },
      },
    },
  },
  async handler(request) {
    const { html, subject, to } = request.body;
    const { message } = await this.mailer.send({ html, subject, to });
    this.log.info(message);
    return { message: 'email sent' };
  },
};

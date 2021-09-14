export default {
  method: 'POST',
  url: '/send',
  schema: {
    body: {
      type: 'object',
      required: ['html', 'subject'],
      anyOf: [
        { required: ['to'] },
        { required: ['cc'] },
        { required: ['bcc'] },
      ],
      properties: {
        html: { type: 'string' },
        subject: { type: 'string' },
        to: { type: 'array', minItems: 1, items: { type: 'string' } },
        cc: { type: 'array', minItems: 1, items: { type: 'string' } },
        bcc: { type: 'array', minItems: 1, items: { type: 'string' } },
      },
    },
  },
  async handler(request) {
    const {
      html, subject, to, cc, bcc,
    } = request.body;
    const { message } = await this.mailer.send({
      html, subject, to, cc, bcc,
    });
    this.log.info(message);
    return { message: 'email sent' };
  },
};

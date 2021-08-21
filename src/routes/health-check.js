export default {
  method: 'GET',
  url: '/health',
  handler() {
    return { message: 'ok' };
  },
};

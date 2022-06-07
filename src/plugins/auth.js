export default function validator(config) {
  return async function validate(username, password) {
    if (username !== config.username || password !== config.password) {
      throw new Error('Authentication failed.');
    }
  };
}

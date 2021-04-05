// api routes that don't need to have the authentication of JWTs
const NON_AUTH_PATHS: string[] = ['/user/login', '/user/register', '/user/forgot'];

export { NON_AUTH_PATHS };

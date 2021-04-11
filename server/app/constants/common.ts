// api routes that don't need to have the authentication of JWTs
const NON_AUTH_PATHS: string[] = ['/user/login', '/user/register'];

// eslint-disable-next-line no-undef
type File = Express.Multer.File;
const IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export { NON_AUTH_PATHS, File, IMAGE_MIME_TYPES };

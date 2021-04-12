// api routes that don't need to have the authentication of JWTs
const NON_AUTH_PATHS: string[] = ['/user/login', '/user/register'];

type File = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
};
const IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export { NON_AUTH_PATHS, File, IMAGE_MIME_TYPES };

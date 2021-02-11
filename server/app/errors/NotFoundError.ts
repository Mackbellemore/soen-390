import c from 'config';

export default class NotFoundError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}
c;

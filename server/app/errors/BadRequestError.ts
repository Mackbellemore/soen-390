export default class BadRequestError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export default class ConflictError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

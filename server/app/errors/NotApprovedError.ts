export default class NotApprovedError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

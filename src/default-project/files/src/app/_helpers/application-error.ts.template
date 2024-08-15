export class ApplicationError extends Error {
  originalError?: Error;
  constructor(message?: string, originalError?: Error) {
    super(message);
    this.originalError = originalError;
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}

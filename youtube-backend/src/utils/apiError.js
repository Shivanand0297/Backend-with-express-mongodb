export class ApiError extends Error {

  constructor(message = "Something Went Wrong", statusCode, errors = [], stack) {
    super(this.message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors

    if(stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
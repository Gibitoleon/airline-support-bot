import AppError from './Apperror.js';
export default class AuthenticationError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

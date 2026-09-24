import AppError from './Apperror.js';
import { StatusCodes } from 'http-status-codes';

export default class BadRequestError extends AppError {
  constructor(message, statusCode=StatusCodes.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
  }
}

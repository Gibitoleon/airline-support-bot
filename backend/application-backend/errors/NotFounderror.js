import AppError from './Apperror.js';
import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends AppError {
  constructor(message, statusCode=StatusCodes.NOT_FOUND) {
    super(message);
    this.statusCode = statusCode;
  }
}
import AppError from './Apperror.js';
import { StatusCodes } from 'http-status-codes';
export default class ForbiddenError extends AppError {
    constructor(message,statusCode=StatusCodes.FORBIDDEN) {
        super(message);
        this.statusCode =statusCode
    }
}
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import handleGenericError from '../helpers/handleGenericError';
import handleDuplicateError from '../helpers/handleDuplicateError';
import handleCastError from '../helpers/handleCastError';
import handleValidationError from '../helpers/handleValidationError';
import handleZodValidation from '../helpers/handleZodValidation';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodValidation(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};

export default globalErrorHandler;

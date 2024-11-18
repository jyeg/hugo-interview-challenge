import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../utilities';
// Error handling Middleware function for logging the error message
export const errorLogger = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error); // Log the error for debugging
  next(error); // Call the next middleware
};

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
export const errorResponder = (
  error: HttpError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header('Content-Type', 'application/json');
  const status = error.statusCode || 400;
  response.status(status).send({ message: error.message, errors: error.errors });
};

// Fallback Middleware function for returning
// 404 error for undefined paths
export const invalidPathHandler = (request: Request, response: Response, next: NextFunction) => {
  response.status(404);
  response.send('invalid path');
};

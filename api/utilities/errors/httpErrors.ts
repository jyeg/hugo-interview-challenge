export class HttpError extends Error {
  statusCode: number;
  errors?: any;
  constructor(statusCode: number, message: string, errors?: any) {
    super(message);
    this.name = Error.name;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this);
  }
}

// 400 Bad Request
export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request', errors?: any) {
    super(400, message, errors);
  }
}

// 401 Unauthorized
export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}

// 403 Forbidden
export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(403, message);
  }
}

// 404 Not Found
export class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found') {
    super(404, message);
  }
}

// 500 Internal Server Error
export class InternalServerError extends HttpError {
  constructor(message: string = 'Internal Server Error') {
    super(500, message);
  }
}

import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { BadRequestError, InternalServerError } from '@api/utilities';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);
      if (result.success) {
        next();
      } else {
        const errorMessages = result.error.flatten().fieldErrors;
        return next(
          new BadRequestError('Failed validation. Please check the errors above.', errorMessages)
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.flatten().fieldErrors;
        return next(
          new BadRequestError('Failed validation. Please check the errors above.', errorMessages)
        );
      } else {
        return next(new InternalServerError());
      }
    }
  };
}

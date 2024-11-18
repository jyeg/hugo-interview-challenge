import { NextFunction, Request, Response } from 'express';
import { ApplicationService } from '../services';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  Logger,
  WinstonLogger,
} from '../utilities';
import { applicationSchema } from '@common/lib/schemas';
import { mapApplicationDTOToEntity } from '@api/mappers/map-application-dto-to-entity';

export class ApplicationController {
  private applicationService: ApplicationService;
  private logger: WinstonLogger;

  constructor(applicationService: ApplicationService) {
    this.applicationService = applicationService;
    this.logger = Logger.getLogger();
  }

  /**
   * Handles the create application request.
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const application = mapApplicationDTOToEntity(req.body);
      const createdApplication = await this.applicationService.create(application);
      res.status(201).json(createdApplication);
    } catch (error: any) {
      next(new InternalServerError(error.message));
    }
  }

  /**
   * Handles the get application request.
   */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const application = await this.applicationService.getById(Number(req.params.id));
      if (!application) {
        return next(new NotFoundError('Application not found'));
      }
      res.status(200).json(application);
    } catch (error: any) {
      next(new InternalServerError(error.message));
    }
  }

  /**
   * Handles the update application request.
   * 3. `PUT` route that will update the insurance application with provided data
   - This should accept partial fields from the quote application. Each submitted field needs to
     pass validation in order to be updated.
   - The quote application as a whole may still be incomplete and should not cause this route to
     fail.
   */
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const application = mapApplicationDTOToEntity(req.body);
      const updatedApplication = await this.applicationService.update(
        Number(req.params.id),
        application
      );
      res.status(200).json(updatedApplication);
    } catch (error: any) {
      next(new InternalServerError(error.message));
    }
  }

  /**
   * Handles the submit application request.
   * 4. `POST` route that validates the entire application and returns a price
   - You do not actually need to do any calculation here, returning a random number value would be
     sufficient
   */
  async submit(req: Request, res: Response, next: NextFunction) {
    try {
      await this.applicationService.update(Number(req.params.id), req.body);
      const quote = Math.floor(Math.random() * 1000);
      res.status(200).json({ quote });
    } catch (error: any) {
      next(new InternalServerError(error.message));
    }
  }
}

import { NextFunction, Router, Request, Response } from 'express';

import { ApplicationController } from '../controllers/application.controller';
import { validateData } from '../middleware/validationMiddleware';
import { applicationSchema } from '@common/lib/schemas';
import { ApplicationService } from '../services';

const routes = Router();

const applicationService = new ApplicationService();
const controller = new ApplicationController(applicationService);

routes.post(
  '/',
  validateData(applicationSchema),
  (req: Request, res: Response, next: NextFunction) => controller.create(req, res, next)
);

routes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  controller.get(req, res, next);
});

routes.put(
  '/:id',
  validateData(applicationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    controller.update(req, res, next);
  }
);

routes.post(
  '/:id/submit',
  validateData(applicationSchema),
  (req: Request, res: Response, next: NextFunction) => {
    controller.submit(req, res, next);
  }
);

export default routes;

import { Router } from 'express';

import applicationRoutes from './application.route';

const routes = Router();

routes.use('/applications', applicationRoutes);

export default routes;

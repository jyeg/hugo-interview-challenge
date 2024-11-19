import { z } from 'zod';
import { vehicleSchema, applicationSchema } from './schemas';

type Vehicle = z.infer<typeof vehicleSchema>;
type Application = z.infer<typeof applicationSchema>;

export type { Application, Vehicle };

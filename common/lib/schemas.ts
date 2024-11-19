import * as z from 'zod';
import { calculateAge } from './utils';

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
});

export const vehicleSchema = z.object({
  id: z.number().optional().readonly(),
  vin: z.string().length(17, 'VIN must be exactly 17 characters'),
  year: z
    .number()
    .int()
    .min(1985)
    .max(new Date().getFullYear() + 1),
  makeModel: z.string().min(1, 'Make and Model is required'),
});

export const dependentSchema = z.object({
  id: z.number().optional().readonly(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string(),
  relationship: z.enum(['Spouse', 'Sibling', 'Parent', 'Friend', 'Other']),
});

export const personalInfoSchema = z.object({
  id: z.number().optional().readonly(),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().refine(
    (dob) => {
      const age = calculateAge(new Date(dob));
      return age >= 16;
    },
    { message: 'You must be at least 16 years old' }
  ),
});

export const applicationSchema = z.object({
  ...personalInfoSchema.shape,
  address: addressSchema,
  vehicles: z
    .array(vehicleSchema)
    .min(1, 'At least one vehicle is required')
    .max(3, 'Maximum of 3 vehicles allowed'),
  additionalPeople: z.array(dependentSchema).optional(),
});

export const partialApplicationSchema = applicationSchema.deepPartial();
export type PartialApplicationDTO = z.infer<typeof partialApplicationSchema>;

export type ApplicationDTO = z.infer<typeof applicationSchema>;

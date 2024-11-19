import { Application, Vehicle, Dependent, Prisma } from '@prisma/client';

type PartialApplication = Omit<Application, 'id' | 'createdAt' | 'updatedAt'> &
  Partial<Pick<Application, 'id'>>;
type PartialVehicle = Omit<Vehicle, 'id' | 'applicationId'> &
  Partial<Pick<Vehicle, 'id' | 'applicationId'>>;
type PartialDependent = Omit<Dependent, 'id' | 'applicationId'> &
  Partial<Pick<Dependent, 'id' | 'applicationId'>>;

export type PartialApplicationWithRelatedEntities = PartialApplication & {
  vehicles?: PartialVehicle[];
  dependents?: PartialDependent[];
};

// Define a Prisma validator for the Application entity with vehicles and dependents
const ApplicationWithVehiclesAndDependents = Prisma.validator<Prisma.ApplicationDefaultArgs>()({
  include: { vehicles: true, dependents: true },
});

// Define a type for the Application entity with vehicles and dependents
export type ApplicationAndRelatedEntities = Prisma.ApplicationGetPayload<
  typeof ApplicationWithVehiclesAndDependents
>;

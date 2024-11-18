import { ApplicationDTO, applicationSchema } from '../../common/lib/schemas'; // Import the application schema
import { PartialApplicationWithRelatedEntities } from '@api/entities';

// Mapper function to convert input to Prisma entity
export const mapApplicationToEntity = (
  input: ApplicationDTO
): PartialApplicationWithRelatedEntities => {
  // Map the input to the Prisma entity structure
  const applicationEntity = {
    firstName: input.firstName,
    lastName: input.lastName,
    dateOfBirth: new Date(input.dateOfBirth),
    street: input.address.street,
    city: input.address.city,
    state: input.address.state,
    zipCode: input.address.zipCode,
    vehicles: input.vehicles.map((vehicle) => ({
      ...(vehicle.id ? { id: vehicle.id } : {}),
      vin: vehicle.vin,
      year: vehicle.year,
      makeAndModel: vehicle.makeModel,
    })),
    dependents: input.additionalPeople
      ? input.additionalPeople.map((dependent) => ({
          ...(dependent.id ? { id: dependent.id } : {}),
          firstName: dependent.firstName,
          lastName: dependent.lastName,
          dateOfBirth: new Date(dependent.dateOfBirth),
          relationship: dependent.relationship,
        }))
      : [],
  };

  return applicationEntity;
};

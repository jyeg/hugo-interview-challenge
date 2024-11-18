import { PartialApplicationDTO, PartialApplicationSchema } from '../../common/lib/schemas'; // Import the application schema
import { PartialApplicationWithRelatedEntities } from '@api/entities/types';

// Mapper function to convert entity to Prisma entity
export const mapEntityToApplicationDTO = (
  entity: PartialApplicationWithRelatedEntities
): PartialApplicationDTO => {
  // Map the entity to the Prisma entity structure
  const application = {
    firstName: entity.firstName ?? undefined,
    lastName: entity.lastName ?? undefined,
    dateOfBirth: entity.dateOfBirth ? entity.dateOfBirth.toISOString().split('T')[0] : undefined,
    address: {
      street: entity.street ?? undefined,
      city: entity.city ?? undefined,
      state: entity.state ?? undefined,
      zipCode: entity.zipCode ?? undefined,
    },
    vehicles: entity.vehicles
      ? entity.vehicles.map((vehicle) => ({
          ...(vehicle.id ? { id: vehicle.id } : {}),
          vin: vehicle.vin ?? undefined,
          year: vehicle.year ?? undefined,
          makeModel: vehicle.makeAndModel ?? undefined,
        }))
      : [],
    additionalPeople: entity.dependents
      ? entity.dependents.map((dependent) => ({
          ...(dependent.id ? { id: dependent.id } : {}),
          firstName: dependent.firstName ?? undefined,
          lastName: dependent.lastName ?? undefined,
          dateOfBirth: dependent.dateOfBirth
            ? dependent.dateOfBirth.toISOString().split('T')[0]
            : undefined,
          relationship: (dependent.relationship || 'Other') as
            | 'Spouse'
            | 'Sibling'
            | 'Parent'
            | 'Friend'
            | 'Other',
        }))
      : [],
  };

  return application;
};

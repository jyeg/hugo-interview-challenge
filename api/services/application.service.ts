import { Application, PrismaClient } from '@prisma/client';
import { Logger, WinstonLogger } from '../utilities';
import { PartialApplicationWithRelatedEntities } from '@api/entities/types';
import { mapEntityToApplicationDTO } from '@api/mappers/map-entity-to-application-dto';

/**
 * This service is responsible for CRUD for an insurance application
 */
export class ApplicationService {
  private logger: WinstonLogger;
  private prisma: PrismaClient;

  constructor() {
    this.logger = Logger.getLogger();
    this.prisma = new PrismaClient(); // Initialize Prisma Client
  }

  async create(data: PartialApplicationWithRelatedEntities) {
    // Create a new application in the database
    const createdApplication = await this.prisma.application.create({
      data: {
        ...data,
        vehicles: { create: data.vehicles },
        dependents: { create: data.dependents },
      },
      include: { vehicles: true, dependents: true },
    });
    return mapEntityToApplicationDTO(createdApplication);
  }

  async getById(id: number) {
    // Retrieve an application by ID
    const application = await this.prisma.application.findUnique({
      where: { id },
      include: { vehicles: true, dependents: true },
    });
    if (!application) {
      return null;
    }
    return mapEntityToApplicationDTO(application);
  }

  async update(id: number, data: PartialApplicationWithRelatedEntities) {
    // Update an existing application
    const updatedApplication = await this.prisma.application.update({
      where: { id },
      data: {
        ...data,
        vehicles: {
          deleteMany: {}, // Delete all existing vehicles
          // Handle optional vehicles
          createMany: {
            data: data.vehicles || [],
          },
        },
        dependents: {
          deleteMany: {}, // Delete all existing dependents
          // Handle optional dependents
          createMany: {
            data: data.dependents || [],
          },
        },
      },
      include: { vehicles: true, dependents: true },
    });
    return mapEntityToApplicationDTO(updatedApplication);
  }
}

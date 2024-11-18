import { Application, PrismaClient } from '@prisma/client';
import { Logger, WinstonLogger } from '../utilities';
import { PartialApplicationWithRelatedEntities } from '@api/entities';
import { mapApplicationToEntity } from '@api/mappers/map-application-to-entity';

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
    return await this.prisma.application.create({
      data: {
        ...data,
        vehicles: { create: data.vehicles },
        dependents: { create: data.dependents },
      },
      include: { vehicles: true, dependents: true },
    });
  }

  async getById(id: number) {
    // Retrieve an application by ID
    return await this.prisma.application.findUnique({
      where: { id },
      include: { vehicles: true, dependents: true },
    });
  }

  async update(id: number, data: PartialApplicationWithRelatedEntities) {
    // Update an existing application
    return await this.prisma.application.update({
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
  }
}

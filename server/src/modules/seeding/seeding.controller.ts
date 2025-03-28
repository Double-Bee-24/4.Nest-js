import { Controller, Get } from '@nestjs/common';
import { SeedingService } from './seeding.service';

@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Get()
  async seedDatabase() {
    await this.seedingService.seedDatabase();
    await this.seedingService.setRelationships();
  }
}

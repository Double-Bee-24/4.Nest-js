import { Controller, Get } from '@nestjs/common';
import { SwapiService } from './swapi.service';

@Controller('swapi')
export class SwapiController {
  constructor(private swapiService: SwapiService) {}

  @Get()
  async seedDatabase() {
    await this.swapiService.seedDatabase();
  }

  @Get('reletionships')
  async setDbRelationships() {
    await this.swapiService.setDbRelationships();
  }

  @Get('show')
  async show() {
    await this.swapiService.showFilms();
  }
}

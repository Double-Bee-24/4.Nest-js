import { Controller, Get } from '@nestjs/common';
import { SwapiService } from './swapi.service';

@Controller('swapi')
export class SwapiController {
  constructor(private swapiService: SwapiService) {}

  @Get()
  async seedDatabase() {
    await this.swapiService.seedDatabase();
  }

  // @Get()
  // async makeMagic() {
  //   await this.swapiService.setDbRelationships();
  // }
}

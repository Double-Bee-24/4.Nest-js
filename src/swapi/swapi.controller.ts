import { Controller, Get } from '@nestjs/common';
import { SwapiService } from './swapi.service';

@Controller('swapi')
export class SwapiController {
  constructor(private swapiService: SwapiService) {}

  @Get()
  async uploadDataToDb() {
    const entitiesToLoad = [
      'planets',
      'people',
      'vehicles',
      'species',
      'starships',
    ];

    const requests = entitiesToLoad.map((item) =>
      this.swapiService.downloadDataFromSwapi(item),
    );

    const databaseContent = await Promise.all(requests);

    return databaseContent;
  }
}

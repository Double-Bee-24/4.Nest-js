import { Controller, Get } from '@nestjs/common';
import { SwapiService } from './swapi.service';

@Controller('swapi')
export class SwapiController {
  constructor(private swapiService: SwapiService) {}

  // @Get()
  // performAllActions() {
  //   this.swapiService.fillAllRepositories();
  // }

  @Get()
  makeMagic() {
    this.swapiService.makeMagic();
  }
}

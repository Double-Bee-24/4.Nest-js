import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsDto } from './dto/planets.dto';

@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @Get()
  getPlanets() {
    return this.planetsService.getPlanets();
  }

  @Post()
  createPlanet(@Body() planetsDto: PlanetsDto) {
    return this.planetsService.createPlanet(planetsDto);
  }

  @Put(':id')
  updatePlanet(@Param('id') id: number, @Body() planetsDto: PlanetsDto) {
    return this.planetsService.updatePlanet(id, planetsDto);
  }

  @Delete(':id')
  async deletePlanet(@Param('id') id: number) {
    await this.planetsService.deletePlanet(id);
  }
}

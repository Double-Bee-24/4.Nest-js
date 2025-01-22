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
  getAllPlanets() {
    return this.planetsService.getAllPlanets();
  }

  @Get(':id')
  getPlanet(@Param('id') id: number) {
    return this.planetsService.getPlanet(id);
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

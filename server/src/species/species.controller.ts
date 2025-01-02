import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesDto } from './dto/species.dto';

@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @Get()
  getSpecies() {
    return this.speciesService.getSpecies();
  }

  @Post()
  createSpecies(@Body() speciesDto: SpeciesDto) {
    return this.speciesService.createSpecies(speciesDto);
  }

  @Put(':id')
  updateSpecies(@Param('id') id: number, @Body() speciesDto: SpeciesDto) {
    return this.speciesService.updateSpeceis(id, speciesDto);
  }

  @Delete(':id')
  deleteSpecies(@Param('id') id: number) {
    return this.speciesService.deleteSpecies(id);
  }
}

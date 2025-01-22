import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsDto } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAllFilms() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id')
  getFilm(@Param('id') id: number) {
    return this.filmsService.getFilm(id);
  }

  @Post()
  createFilm(@Body() filmsDto: FilmsDto) {
    return this.filmsService.createFilm(filmsDto);
  }

  @Put(':id')
  updateFilm(@Param('id') id: number, @Body() filmsDto: FilmsDto) {
    return this.filmsService.updateFilm(id, filmsDto);
  }

  @Delete(':id')
  deleteFilm(@Param('id') id: number) {
    return this.filmsService.deleteFilm(id);
  }
}

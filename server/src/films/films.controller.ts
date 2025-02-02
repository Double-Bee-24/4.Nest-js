import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FilmsService } from './films.service';
import { FilmsDto } from './dto/films.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  getAllFilms() {
    return this.filmsService.getAllFilms();
  }

  @Get('image/:id')
  getImage(@Param('id') id: number, @Res() res: Response) {
    return this.filmsService.getImage(id, res);
  }

  @Get(':id')
  getFilm(@Param('id') id: number) {
    return this.filmsService.getFilm(id);
  }

  @Post()
  createFilm(@Body() filmsDto: FilmsDto) {
    return this.filmsService.createFilm(filmsDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filmsService.uploadImage(id, file);
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

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FilmsService } from './films.service';
import { CreateFilmsDto } from './dto/create-films.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UpdateFilmsDto } from './dto/update-films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @ApiQuery({
    name: 'page',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    default: 10,
  })
  @Get()
  getAllFilms(@Query('page') page: number, @Query('limit') limit: number) {
    return this.filmsService.getAllFilms(page, limit);
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
  createFilm(@Body() filmsDto: CreateFilmsDto) {
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
  updateFilm(@Param('id') id: number, @Body() filmsDto: UpdateFilmsDto) {
    return this.filmsService.updateFilm(id, filmsDto);
  }

  @Delete(':id')
  deleteFilm(@Param('id') id: number) {
    return this.filmsService.deleteFilm(id);
  }
}

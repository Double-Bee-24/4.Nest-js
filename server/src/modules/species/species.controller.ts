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
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UpdateSpeciesDto } from './dto/update-species.dto';

@Controller('species')
export class SpeciesController {
  constructor(private speciesService: SpeciesService) {}

  @ApiQuery({
    name: 'page',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    default: 10,
  })
  @Get()
  getAllSpecies(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.speciesService.getAllSpecies(page, limit);
  }

  @Get('image/:id')
  getImage(@Param('id') id: number, @Res() res: Response) {
    return this.speciesService.getImage(id, res);
  }

  @Get(':id')
  getSpecies(@Param('id') id: number) {
    return this.speciesService.getSpecies(id);
  }

  @Post()
  createSpecies(@Body() speciesDto: CreateSpeciesDto) {
    return this.speciesService.createSpecies(speciesDto);
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
    return this.speciesService.uploadImage(id, file);
  }

  @Put(':id')
  updateSpecies(@Param('id') id: number, @Body() speciesDto: UpdateSpeciesDto) {
    return this.speciesService.updateSpeceis(id, speciesDto);
  }

  @Delete(':id')
  deleteSpecies(@Param('id') id: number) {
    return this.speciesService.deleteSpecies(id);
  }
}

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
import { PlanetsService } from './planets.service';
import { CreatePlanetsDto } from './dto/create-planets.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UpdatePlanetsDto } from './dto/update-planets.dto';

@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @ApiQuery({
    name: 'page',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    default: 10,
  })
  @Get()
  getAllPlanets(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.planetsService.getAllPlanets(page, limit);
  }

  @Get('image/:id')
  getImage(@Param('id') id: number, @Res() res: Response) {
    return this.planetsService.getImage(id, res);
  }

  @Get(':id')
  getPlanet(@Param('id') id: number) {
    return this.planetsService.getPlanet(id);
  }

  @Post()
  createPlanet(@Body() planetsDto: CreatePlanetsDto) {
    return this.planetsService.createPlanet(planetsDto);
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
    return this.planetsService.uploadImage(id, file);
  }

  @Put(':id')
  updatePlanet(@Param('id') id: number, @Body() planetsDto: UpdatePlanetsDto) {
    return this.planetsService.updatePlanet(id, planetsDto);
  }

  @Delete(':id')
  async deletePlanet(@Param('id') id: number) {
    await this.planetsService.deletePlanet(id);
  }
}

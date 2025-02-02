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
import { PlanetsService } from './planets.service';
import { PlanetsDto } from './dto/planets.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('planets')
export class PlanetsController {
  constructor(private planetsService: PlanetsService) {}

  @Get()
  getAllPlanets() {
    return this.planetsService.getAllPlanets();
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
  createPlanet(@Body() planetsDto: PlanetsDto) {
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
  updatePlanet(@Param('id') id: number, @Body() planetsDto: PlanetsDto) {
    return this.planetsService.updatePlanet(id, planetsDto);
  }

  @Delete(':id')
  async deletePlanet(@Param('id') id: number) {
    await this.planetsService.deletePlanet(id);
  }
}

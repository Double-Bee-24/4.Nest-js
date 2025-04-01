import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { VehiclesService } from './vehicles.service';
import { CreateVehiclesDto } from './dto/create-vehicles.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UpdateVehiclesDto } from './dto/update-vehicles.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  @ApiQuery({
    name: 'page',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    default: 10,
  })
  @Get()
  getAllVehicles(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.vehicleService.getAllVehicles(page, limit);
  }

  @Get('image/:id')
  getImage(@Param('id') id: number, @Res() res: Response) {
    return this.vehicleService.getImage(id, res);
  }

  @Get(':id')
  getVehicle(@Param('id') id: number) {
    return this.vehicleService.getVehicle(id);
  }

  @Post()
  createVehicle(@Body() vehiclesDto: CreateVehiclesDto) {
    return this.vehicleService.createVehicle(vehiclesDto);
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
    return this.vehicleService.uploadImage(id, file);
  }

  @Put(':id')
  updateVehicle(
    @Param('id') id: number,
    @Body() vehiclesDto: UpdateVehiclesDto,
  ) {
    return this.vehicleService.updateVehicle(id, vehiclesDto);
  }

  @Delete(':id')
  deleteVehicle(@Param('id') id: number) {
    return this.vehicleService.deleteVehicle(id);
  }
}

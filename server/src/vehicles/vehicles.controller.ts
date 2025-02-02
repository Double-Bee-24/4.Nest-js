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
} from '@nestjs/common';
import { Response } from 'express';
import { VehiclesService } from './vehicles.service';
import { VehiclesDto } from './dto/vehicles.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  @Get()
  getAllVehicles() {
    return this.vehicleService.getAllVehicles();
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
  createVehicle(@Body() vehiclesDto: VehiclesDto) {
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
  updateVehicle(@Param('id') id: number, @Body() vehiclesDto: VehiclesDto) {
    return this.vehicleService.updateVehicle(id, vehiclesDto);
  }

  @Delete(':id')
  deleteVehicle(@Param('id') id: number) {
    return this.vehicleService.deleteVehicle(id);
  }
}

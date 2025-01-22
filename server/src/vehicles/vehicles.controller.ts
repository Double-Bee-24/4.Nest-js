import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesDto } from './dto/vehicles.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private vehicleService: VehiclesService) {}

  @Get()
  getAllVehicles() {
    return this.vehicleService.getAllVehicles();
  }

  @Get(':id')
  getVehicle(@Param('id') id: number) {
    return this.vehicleService.getVehicle(id);
  }

  @Post()
  createVehicle(@Body() vehiclesDto: VehiclesDto) {
    return this.vehicleService.createVehicle(vehiclesDto);
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

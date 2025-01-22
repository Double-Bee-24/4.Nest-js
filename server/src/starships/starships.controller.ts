import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsDto } from './dto/starships.dto';

@Controller('starships')
export class StarshipsController {
  constructor(private starshipsService: StarshipsService) {}

  @Get()
  getAllStarships() {
    return this.starshipsService.getAllStarships();
  }

  @Get(':id')
  getStarship(@Param('id') id: number) {
    return this.starshipsService.getStarship(id);
  }

  @Post()
  createStarship(@Body() starshipsDto: StarshipsDto) {
    return this.starshipsService.createStarship(starshipsDto);
  }

  @Put(':id')
  updateStarship(@Param('id') id: number, @Body() starshipsDto: StarshipsDto) {
    return this.starshipsService.updateStarship(id, starshipsDto);
  }

  @Delete(':id')
  deleteStarship(@Param('id') id: number) {
    return this.starshipsService.deleteStarship(id);
  }
}

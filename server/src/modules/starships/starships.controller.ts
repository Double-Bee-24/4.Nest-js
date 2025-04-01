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
import { StarshipsService } from './starships.service';
import { CreateStarshipsDto } from './dto/create-starships.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiQuery } from '@nestjs/swagger';
import { UpdateStarshipsDto } from './dto/update-starships.dto';

@Controller('starships')
export class StarshipsController {
  constructor(private starshipsService: StarshipsService) {}

  @ApiQuery({
    name: 'page',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    default: 10,
  })
  @Get()
  getAllStarships(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.starshipsService.getAllStarships(page, limit);
  }

  @Get('image/:id')
  getImage(@Param('id') id: number, @Res() res: Response) {
    return this.starshipsService.getImage(id, res);
  }

  @Get(':id')
  getStarship(@Param('id') id: number) {
    return this.starshipsService.getStarship(id);
  }

  @Post()
  createStarship(@Body() starshipsDto: CreateStarshipsDto) {
    return this.starshipsService.createStarship(starshipsDto);
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
    return this.starshipsService.uploadImage(id, file);
  }

  @Put(':id')
  updateStarship(
    @Param('id') id: number,
    @Body() starshipsDto: UpdateStarshipsDto,
  ) {
    return this.starshipsService.updateStarship(id, starshipsDto);
  }

  @Delete(':id')
  deleteStarship(@Param('id') id: number) {
    return this.starshipsService.deleteStarship(id);
  }
}

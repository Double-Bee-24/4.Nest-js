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
import { StarshipsService } from './starships.service';
import { StarshipsDto } from './dto/starships.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('starships')
export class StarshipsController {
  constructor(private starshipsService: StarshipsService) {}

  @Get()
  getAllStarships() {
    return this.starshipsService.getAllStarships();
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
  createStarship(@Body() starshipsDto: StarshipsDto) {
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
  updateStarship(@Param('id') id: number, @Body() starshipsDto: StarshipsDto) {
    return this.starshipsService.updateStarship(id, starshipsDto);
  }

  @Delete(':id')
  deleteStarship(@Param('id') id: number) {
    return this.starshipsService.deleteStarship(id);
  }
}

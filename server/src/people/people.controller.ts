import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Param,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PeopleService } from './people.service';
import { PeopleDto } from './dto/people.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get()
  getPeople() {
    return this.peopleService.getPeople();
  }

  @Get('image/:id')
  getImage(@Param('id') id: number, @Res() res: Response) {
    return this.peopleService.getImage(id, res);
  }

  @Get(':id')
  getPerson(@Param('id') id: number) {
    return this.peopleService.getPerson(id);
  }

  @Post()
  createPerson(@Body() peopleDto: PeopleDto) {
    return this.peopleService.createPerson(peopleDto);
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
    return this.peopleService.uploadImage(id, file);
  }

  @Put(':id')
  updatePerson(@Param('id') id: number, @Body() peopleDto: PeopleDto) {
    console.log(peopleDto, 'here data here');
    return this.peopleService.updatePerson(id, peopleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.peopleService.deletePerson(id);
  }
}

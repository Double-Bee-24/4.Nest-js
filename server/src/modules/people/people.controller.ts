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
  Query,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { PeopleService } from './people.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';
import { ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('people')
@UseGuards(RolesGuard)
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @ApiQuery({
    name: 'page',
    default: 1,
  })
  @ApiQuery({
    name: 'limit',
    default: 10,
  })
  @Get()
  getPeople(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.peopleService.getPeople(page, limit);
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
  @Roles('admin')
  createPerson(@Body() peopleDto: CreatePeopleDto) {
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
  updatePerson(@Param('id') id: number, @Body() peopleDto: UpdatePeopleDto) {
    return this.peopleService.updatePerson(id, peopleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.peopleService.deletePerson(id);
  }
}

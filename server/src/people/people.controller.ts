import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Param,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { PeopleDto } from './dto/people.dto';

@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Post()
  create(@Body() peopleDto: PeopleDto) {
    return this.peopleService.createPerson(peopleDto);
  }

  @Get()
  getData() {
    return this.peopleService.getData();
  }

  @Put(':id')
  updatePerson(@Param('id') id: string, @Body() peopleDto: PeopleDto) {
    return this.peopleService.updatePerson(id, peopleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.peopleService.remove(id);
  }
}

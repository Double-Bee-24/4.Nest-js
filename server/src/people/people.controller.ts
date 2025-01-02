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

  @Get()
  getPeople() {
    return this.peopleService.getPeople();
  }

  @Post()
  createPerson(@Body() peopleDto: PeopleDto) {
    return this.peopleService.createPerson(peopleDto);
  }

  @Put(':id')
  updatePerson(@Param('id') id: number, @Body() peopleDto: PeopleDto) {
    return this.peopleService.updatePerson(id, peopleDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.peopleService.deletePerson(id);
  }
}

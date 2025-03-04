import { Test } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

describe('PeopleController', () => {
  let controller: PeopleController;

  const mockPeopleService = {
    createPerson: jest.fn((dto: CreatePeopleDto) => ({
      ...dto,
      id: 1,
    })),
    updatePerson: jest.fn((dto: UpdatePeopleDto, id: number) => {
      // Mocking found person from db
      const existingPerson = {
        id,
        description: 'Old description',
        height: '170',
        mass: '80',
        hairColor: 'Black',
        skinColor: 'Fair',
        eyeColor: 'Brown',
        birthYear: '20BBY',
        gender: 'Male',
        name: 'Old Name',
        homeworld: 123,
      };

      return {
        ...existingPerson,
        ...dto,
      };
    }),
  };

  const createDto: CreatePeopleDto = {
    description: 'Jedi Master and hero of the Clone Wars',
    height: '180',
    mass: '75',
    hairColor: 'Blond',
    skinColor: 'Fair',
    eyeColor: 'Blue',
    birthYear: '17BBY',
    gender: 'Male',
    name: 'Luke Skywalker',
    homeworld: 123,
    id: 1,
  };

  const updateDto: UpdatePeopleDto = {
    description: 'Jedi Master and hero of the Clone Wars',
    height: '180',
    mass: '75',
    hairColor: 'Blond',
    skinColor: 'Fair',
    eyeColor: 'Blue',
    birthYear: '17BBY',
    gender: 'Male',
    name: 'Luke Skywalker',
    homeworld: 123,
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [PeopleService],
    })
      .overrideProvider(PeopleService)
      .useValue(mockPeopleService)
      .compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a person', () => {
    expect(controller.createPerson(createDto)).toEqual(createDto);

    expect(mockPeopleService.createPerson).toHaveBeenCalledWith(createDto);
  });

  it('should update a user', async () => {
    const result = await controller.updatePerson(10, updateDto);

    expect(result).toEqual({ id: 10, ...updateDto });
  });
});

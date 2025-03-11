import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { getPeopleData } from './mock/mock-data';

interface FindAndCountParams {
  skip: number;
  take: number;
  select: string[];
}

describe('PeopleController', () => {
  let controller: PeopleController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: PeopleService;

  const mockPersonRepository = {
    findAndCount: (p: FindAndCountParams) => {
      console.log(p);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-return
      return jest.fn().mockResolvedValue([getPeopleData(), 5])(p);
    },

    findOne: jest.fn().mockResolvedValue(getPeopleData()[0]),
    save: jest.fn().mockResolvedValue(getPeopleData()[0]),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const _peopleData = getPeopleData();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        PeopleService,
        { provide: 'PersonRepository', useValue: mockPersonRepository },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
    service = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('getPeople', () => {
  //   it('should return a paginated list of people', async () => {
  //     const createdPeopleData = await controller.getPeople(1, 3);

  //     expect(createdPeopleData.data.length).toBe(3);
  //     expect(createdPeopleData.total).toBe(5);
  //     expect(createdPeopleData.page).toBe(1);
  //     expect(createdPeopleData.limit).toBe(3);
  //   });
  // });

  // describe('getPerson', () => {
  //   it('should return a single person', async () => {
  //     const person = await controller.getPerson(1);

  //     expect(person).toEqual(peopleData[0]);
  //   });
  // });

  // describe('createPerson', () => {
  //   it('should create a new person', async () => {
  //     const newPerson = await controller.createPerson(peopleData[0]);

  //     expect(newPerson).toEqual(peopleData[0]);
  //   });
  // });

  // describe('updatePerson', () => {
  //   it('should update an existing person', async () => {
  //     const updatedPerson = await controller.updatePerson(1, peopleData[0]);

  //     expect(updatedPerson).toEqual(peopleData[0]);
  //   });
  // });

  // describe('deletePerson', () => {
  //   it('should delete a person', async () => {
  //     const result = await controller.delete(1);

  //     expect(result.affected).toBe(1);
  //   });
  // });

  // describe('getPeople', () => {
  //   it('should return a paginated list of people', async () => {
  //     const createdPeopleData = await controller.getPeople(1, 3);

  //     expect(createdPeopleData.data.length).toBe(3);
  //     expect(createdPeopleData.total).toBe(5);
  //     expect(createdPeopleData.page).toBe(1);
  //     expect(createdPeopleData.limit).toBe(3);
  //   });
  // });
});

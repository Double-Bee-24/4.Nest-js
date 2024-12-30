import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { People } from 'src/people/entities/people.entity';
import { Planets } from 'src/planets/entities/planets.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starships.entity';
import { Vehicles } from 'src/vehicles/entities/vehicles.entity';
import {
  SpeciesResponse,
  PlanetsResponse,
  StarshipsResponse,
  VehiclesResponse,
  PeopleResponse,
} from './interfaces';

@Injectable()
export class SwapiService {
  private swapiUrl: string;

  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,

    @InjectRepository(Planets)
    private planetsRepository: Repository<Planets>,

    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,

    @InjectRepository(Starships)
    private starshipsRepository: Repository<Starships>,

    @InjectRepository(Vehicles)
    private vehiclesRepository: Repository<Vehicles>,

    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.swapiUrl = this.configService.get<string>('SWAPI_URL');
  }

  toCamelCaseFlat(
    obj: Record<string, string | number>,
  ): Record<string, string | number> {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        );
        acc[camelKey] = obj[key];
        return acc;
      },
      {} as Record<string, string | number>,
    );
  }

  async getAmountOfDataFromSwapi(entityType: string): Promise<number> {
    const { data } = await lastValueFrom(
      this.httpService.get<{ total_records: number }>(
        `${this.swapiUrl}/${entityType}`,
      ),
    );

    return data.total_records;
  }

  async downloadDataFromSwapi(entityType: string): Promise<SwapiResponse[]> {
    const totalRecords = await this.getAmountOfDataFromSwapi(entityType);

    const requests = Array.from({ length: totalRecords }, async (_, index) => {
      try {
        const response = await lastValueFrom(
          this.httpService.get(`${this.swapiUrl}/${entityType}/${index + 1}`),
        );
        return response.data.result;
      } catch (error) {
        // Swapi server may not contain records with certain ids, in such cases we want our method to continue working
        if (error.response?.status === 404) {
          console.log(`Data for ID ${index + 1} not found`);
          return null;
        }
        console.error(`Error fetching data for ID ${index + 1}`, error);
        throw error; //Throw an error if it's not 404
      }
    });

    const responses = await Promise.all(requests);

    const peopleData: PeopleResponse[] = responses.filter(
      (elem): elem is PeopleResponse => elem !== null,
    );

    return peopleData;
  }

  async uploadDataToDb(entityType: string, repository: Repository<EntityName>) {
    const data = await this.downloadDataFromSwapi(entityType);

    // Prepare data to be inserted into db
    const newData = data.map((item) => ({
      ...item.properties,
      id: item.uid,
      description: item.description,
    }));

    await repository.save(newData);
  }

  async fillAllRepositories() {
    const repositories = {
      people: this.peopleRepository,
      planets: this.planetsRepository,
      vehicles: this.vehiclesRepository,
      starships: this.starshipsRepository,
      species: this.speciesRepository,
    };

    for (const repositoryName in repositories) {
      await this.uploadDataToDb(repositoryName, repositories[repositoryName]);
    }
  }
}

type EntityName = People | Planets | Vehicles | Starships | Species;

type SwapiResponse =
  | PeopleResponse
  | PlanetsResponse
  | VehiclesResponse
  | StarshipsResponse
  | SpeciesResponse;

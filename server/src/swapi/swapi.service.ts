import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { People } from 'src/people/entities/people.entity';
import { Planets } from 'src/planets/entities/planets.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starships } from 'src/starships/entities/starships.entity';
import { Vehicles } from 'src/vehicles/entities/vehicles.entity';
import {
  SpeciesResponseSchema,
  PeopleResponseSchema,
  PlanetsResponseSchema,
  VehiclesResponseSchema,
  StarshipsResponseSchema,
  FilmsResponseSchema,
  numberArraySchema,
} from './schemas';
import { SwapiResult, EntityName } from './types';
import { toCamelCase } from 'src/utils/object-utils';
import { extractNumber } from 'src/utils/string-utils';
import { Films } from 'src/films/entities/films.entity';

@Injectable()
export class SwapiService {
  private swapiUrl: string;

  private repositories = {
    people: this.peopleRepository,
    planets: this.planetsRepository,
    vehicles: this.vehiclesRepository,
    starships: this.starshipsRepository,
    species: this.speciesRepository,
    films: this.filmsRepository,
  } as const;

  private schemaMap = {
    people: PeopleResponseSchema,
    planets: PlanetsResponseSchema,
    vehicles: VehiclesResponseSchema,
    starships: StarshipsResponseSchema,
    species: SpeciesResponseSchema,
    films: FilmsResponseSchema,
  } as const;

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

    @InjectRepository(Films)
    private filmsRepository: Repository<Films>,

    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.swapiUrl =
      this.configService.get<string>('SWAPI_URL') ||
      'https://www.swapi.tech/api';
  }

  async getAmountOfDataFromSwapi(entityType: string): Promise<number> {
    const { data } = await lastValueFrom(
      this.httpService.get<{ total_records: number }>(
        `${this.swapiUrl}/${entityType}`, // url to get the total number of records
      ),
    );

    return data.total_records;
  }

  delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  async downloadDataFromSwapi(
    entityType: keyof typeof this.schemaMap,
  ): Promise<SwapiResult[]> {
    let totalRecords;

    if (entityType === 'films') {
      totalRecords = 6; // There are 6 films in the swapi database, and we don't have a way to get the total number of records
    } else {
      totalRecords = await this.getAmountOfDataFromSwapi(entityType);
    }

    const requests = Array.from({ length: totalRecords }, async (_, index) => {
      try {
        const response = await lastValueFrom(
          this.httpService.get(`${this.swapiUrl}/${entityType}/${index + 1}`),
        );

        const schema = this.schemaMap[entityType];

        const validatedResponse = schema.parse(response.data);

        if ((index + 1) % 20 === 0) {
          console.log(`Pausing for 2 seconds after ${index + 1} requests...`);
          await this.delay(2000);
        }

        return validatedResponse.result;
      } catch (error) {
        // Swapi server may not contain records with certain ids, in such cases we want our method to continue working
        if ((error as AxiosError).response?.status === 404) {
          console.log(`Data for ID ${index + 1} not found`);
          return null;
        }
        console.error(`Error fetching data for ID ${index + 1}`, error);
        throw error; //Throw an error if it's not 404
      }
    });

    const responses = await Promise.all(requests);

    const peopleData = responses.filter((elem) => elem !== null);

    return peopleData;
  }

  async uploadDataToDb(
    entityType: keyof typeof this.schemaMap,
    repository: Repository<EntityName>,
  ) {
    const swapiData = await this.downloadDataFromSwapi(entityType);
    // Prepare data to be inserted into db
    const editedSwapiData = swapiData
      .map((item) => {
        // Creates a new string with the number extracted from the URL for further relationship management
        Object.entries(item.properties).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // Put array of relation-IDs into a new field
            const newKey = `${key}Ids`;

            (item.properties as Record<string, string[] | string>)[newKey] =
              `{${value.map((cur) => extractNumber(cur)).join(',')}}`;
          }
        });

        // Extract the number from the URL (as its stored in the database)
        if ('homeworld' in item.properties && item.properties.homeworld) {
          item.properties.homeworld = String(
            extractNumber(item.properties.homeworld),
          );
        }

        const {
          url: _url,
          created: _created,
          edited: _edited,
          ...restProperties
        } = item.properties; // Excludes fields from received data

        return {
          ...restProperties,
          id: item.uid,
          description: item.description,
        };
      })
      .map((item) => toCamelCase(item));
    await repository.save(editedSwapiData);
  }

  async seedDatabase() {
    for (const [repositoryName, repository] of Object.entries(
      this.repositories,
    )) {
      await this.uploadDataToDb(
        repositoryName as keyof typeof this.schemaMap,
        repository,
      );
    }
  }

  async setDbRelationships() {
    const films = await this.filmsRepository.find({
      relations: ['planets', 'characters', 'vehicles', 'starships', 'species'],
    });

    if (!films.length) {
      console.error('No films found');
      return;
    }

    for (const film of films) {
      for (const [repositoryName, repository] of Object.entries(
        this.repositories,
      )) {
        if (repositoryName === 'films') {
          continue;
        }

        await this.setFilmsRelationships(
          film,
          repositoryName as
            | 'planets'
            | 'vehicles'
            | 'starships'
            | 'species'
            | 'people',
          repository,
        );
      }

      await this.filmsRepository.save(film);
    }
  }

  async setFilmsRelationships(
    film: Films,
    repositoryName:
      | 'people'
      | 'planets'
      | 'vehicles'
      | 'starships'
      | 'species'
      | 'characters',
    repository: Exclude<Repository<EntityName>, Repository<Films>>,
  ): Promise<void> {
    for (const [key, idsArray] of Object.entries(film)) {
      if (repositoryName === 'people') {
        repositoryName = 'characters';
      }
      if (!(key === `${repositoryName}Ids` && Array.isArray(idsArray))) {
        continue;
      }

      const validatedIdsArray = numberArraySchema.parse(idsArray);

      for (const id of validatedIdsArray) {
        try {
          const repositoryItem = await repository.findOne({
            where: { id },
            relations: ['films'],
          });

          if (repositoryItem) {
            if (Array.isArray(film[repositoryName])) {
              (film[repositoryName] as unknown as EntityName[]).push(
                repositoryItem,
              );
            }
          }
        } catch (error: unknown) {
          console.error(error);
        }
      }
    }
  }

  async showFilms() {
    const films = await this.filmsRepository.find({
      relations: ['planets', 'characters', 'vehicles', 'starships', 'species'],
    });

    console.log(films);
  }
}

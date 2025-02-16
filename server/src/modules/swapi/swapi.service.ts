import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { In, Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { Person } from 'src/modules/people/entities/people.entity';
import { Planet } from 'src/modules/planets/entities/planets.entity';
import { Species } from 'src/modules/species/entities/species.entity';
import { Starship } from 'src/modules/starships/entities/starships.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicles.entity';
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
import { Film } from 'src/modules/films/entities/films.entity';

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
    @InjectRepository(Person)
    private peopleRepository: Repository<Person>,

    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,

    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,

    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,

    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,

    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,

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

    const promises = films.map(async (film) => {
      const relationshipsPromises = Object.entries(this.repositories)
        .filter(([repositoryName]) => repositoryName !== 'films')
        .map(([repositoryName, repository]) => {
          return this.setFilmsRelationships(
            film,
            repositoryName as
              | 'planets'
              | 'vehicles'
              | 'starships'
              | 'species'
              | 'people',
            repository,
          );
        });

      await Promise.all(relationshipsPromises);
      await this.filmsRepository.save(film);
    });

    await Promise.all(promises);

    await this.setPlanetsToPeopleRelationships();

    await this.setVehiclesToPeopleRelationships();
  }

  async setVehiclesToPeopleRelationships() {
    const vehicles = await this.vehiclesRepository.find({
      relations: ['pilots'],
    });

    if (!vehicles.length) {
      throw new NotFoundException('No entries in vehicles table');
    }

    await Promise.all(
      vehicles.map(async (vehicle) => {
        if (vehicle.pilotsIds.length > 0) {
          // Retrieve all people whose IDs are in pilotsIds
          const pilots = await this.peopleRepository.findBy({
            id: In(vehicle.pilotsIds), // Using In() to search for an array of IDs
          });

          if (!pilots.length) {
            throw new NotFoundException(
              `Pilots with IDs [${vehicle.pilotsIds.join(', ')}] not found`,
            );
          }

          // Assign the retrieved people to the pilots relation
          vehicle.pilots = pilots;
        }
      }),
    );

    return await this.vehiclesRepository.save(vehicles);
  }

  async setPlanetsToPeopleRelationships() {
    const people = await this.peopleRepository.find({ relations: ['planet'] });

    if (!people.length) {
      throw new NotFoundException('No entries in people table');
    }

    await Promise.all(
      people.map(async (person) => {
        if (person.homeworld) {
          const planet = await this.planetsRepository.findOne({
            where: { id: person.homeworld },
          });

          if (!planet) {
            throw new NotFoundException(
              `Planet with ID ${person.homeworld} not found`,
            );
          }

          person.planet = planet;
        }
      }),
    );

    return await this.peopleRepository.save(people);
  }

  async setFilmsRelationships(
    film: Film,
    repositoryName:
      | 'people'
      | 'planets'
      | 'vehicles'
      | 'starships'
      | 'species'
      | 'characters',
    repository: Exclude<Repository<EntityName>, Repository<Film>>,
  ): Promise<void> {
    if (repositoryName === 'people') {
      repositoryName = 'characters';
    }

    for (const [key, idsArray] of Object.entries(film)) {
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
              (film[repositoryName] as EntityName[]).push(repositoryItem);
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

    return films;
  }
}

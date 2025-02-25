import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
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
} from './schemas';
import { Film } from 'src/modules/films/entities/films.entity';

@Injectable()
export class SwapiService {
  private swapiUrl: string;

  private repositoryMap = {
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
    this.swapiUrl = 'https://swapi.dev/api/';
  }

  async seedDatabase() {}
}

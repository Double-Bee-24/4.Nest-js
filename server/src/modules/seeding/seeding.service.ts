import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/database/entities/people.entity';
import { Planet } from 'src/database/entities/planets.entity';
import { Species } from 'src/database/entities/species.entity';
import { Starship } from 'src/database/entities/starships.entity';
import { Vehicle } from 'src/database/entities/vehicles.entity';
import {
  SpeciesSchema,
  PersonSchema,
  PlanetSchema,
  VehicleSchema,
  StarshipSchema,
  FilmSchema,
} from './schemas';
import { Film } from 'src/database/entities/films.entity';
import * as fs from 'fs';
import * as path from 'path';
import { z } from 'zod';
import { SeedingObjectType } from './types/seeding-object';

@Injectable()
export class SeedingService {
  private repositoryMap = {
    people: this.peopleRepository,
    planets: this.planetsRepository,
    vehicles: this.vehiclesRepository,
    starships: this.starshipsRepository,
    species: this.speciesRepository,
    films: this.filmsRepository,
  } as const;

  private schemaMap = {
    people: PersonSchema,
    planets: PlanetSchema,
    vehicles: VehicleSchema,
    starships: StarshipSchema,
    species: SpeciesSchema,
    films: FilmSchema,
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
  ) {}

  async readJsonFile(fileName: keyof typeof this.schemaMap) {
    const filePath = path.resolve(
      process.cwd(),
      `src/database/seedingData/${fileName}.json`,
    );

    try {
      const schema = this.schemaMap[fileName];

      const parsedData: unknown = JSON.parse(
        await fs.promises.readFile(filePath, 'utf-8'),
      );

      const validatedData = z.array(schema).parse(parsedData);

      return validatedData;
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
      return null;
    }
  }

  async getSeedingData() {
    // Array with tuples where the first value is entity type and the second is actual data
    return Promise.all(
      (
        Object.keys(this.repositoryMap) as (keyof typeof this.repositoryMap)[]
      ).map(
        async (filename) =>
          [filename, await this.readJsonFile(filename)] as [
            keyof typeof this.repositoryMap,
            SeedingObjectType[] | null,
          ],
      ),
    );
  }

  async seedDatabase() {
    const seedingData = (await this.getSeedingData()).filter(
      (tuple) => tuple[1] !== null,
    );

    await Promise.all(
      seedingData.map(async ([repositoryName, repositoryData]) => {
        if (!repositoryData) {
          throw new Error('Repository data is empty');
        }

        const repository = this.repositoryMap[
          repositoryName
        ] as Repository<any>;

        const count = await repository.count();

        // Check if repository has some data and skip seeding in this case
        if (count > 0) {
          console.log(`Repository ${repositoryName} seeded, skipping`);
        } else {
          await repository.save(repositoryData);

          console.log(`Data saved to the repository ${repositoryName}`);
        }
      }),
    );

    console.log('Seeding successfully complete');
  }

  async setRelationships() {
    await this.setPeopleRelationships();
    await this.setSpeciesRelationships();
    await this.setStarshipsRelationships();
    await this.setVehiclesRelationships();
    await this.setFilmsRelationships();
  }

  // Add 'planet' to 'person' entity
  async setPeopleRelationships() {
    const allPeople = await this.peopleRepository.find({
      relations: ['planet'],
    });

    const allPlanets = await this.planetsRepository.find();

    const planetsMap = new Map(allPlanets.map((planet) => [planet.id, planet]));

    const updatedPeople = allPeople.map((person) => {
      const planet = planetsMap.get(person.homeworldId);

      if (!planet) {
        throw new NotFoundException(
          `There is no planet with id ${person.homeworldId}`,
        );
      }

      person.planet = planet;
      return person;
    });

    await this.peopleRepository.save(updatedPeople);
  }

  async setSpeciesRelationships() {
    const allSpecies = await this.speciesRepository.find({
      relations: ['planet', 'people'],
    });

    const allPeople = await this.peopleRepository.find();

    const allPlanets = await this.planetsRepository.find();

    const planetsMap = new Map(allPlanets.map((planet) => [planet.id, planet]));
    const peopleMap = new Map(allPeople.map((person) => [person.id, person]));

    const updatedSpecies = allSpecies.map((species) => {
      const planet = planetsMap.get(species.homeworldId);

      if (!planet) {
        throw new NotFoundException(
          `There is no planet with id ${species.homeworldId}`,
        );
      }

      species.planet = planet;

      const people = species.peopleIds
        ?.map((id) => peopleMap.get(Number(id)))
        .filter((person): person is Person => person !== undefined);

      if (!people) {
        throw new NotFoundException(
          `There is no people with ids ${species.peopleIds}`,
        );
      }

      species.people = people;

      return species;
    });

    await this.speciesRepository.save(updatedSpecies);
  }

  async setStarshipsRelationships() {
    const allStarships = await this.starshipsRepository.find({
      relations: ['pilots'],
    });

    const allPeople = await this.peopleRepository.find();

    const peopleMap = new Map(allPeople.map((person) => [person.id, person]));

    const updatedStarships = allStarships.map((starship) => {
      const pilots = starship.pilotsIds
        .map((id) => peopleMap.get(Number(id)))
        .filter((person): person is Person => person !== undefined);

      starship.pilots = pilots;

      return starship;
    });

    await this.starshipsRepository.save(updatedStarships);
  }

  async setVehiclesRelationships() {
    const allVehicles = await this.vehiclesRepository.find();

    const allPeople = await this.peopleRepository.find();

    const peopleMap = new Map(allPeople.map((person) => [person.id, person]));

    const updatedVehicles = allVehicles.map((vehicle) => {
      const pilots = vehicle.pilotsIds
        .map((id) => peopleMap.get(Number(id)))
        .filter((person): person is Person => person !== undefined);

      vehicle.pilots = pilots;

      return vehicle;
    });

    await this.vehiclesRepository.save(updatedVehicles);
  }

  async setFilmsRelationships() {
    const allFilms = await this.filmsRepository.find();
    const allPeople = await this.peopleRepository.find();
    const allPlanets = await this.planetsRepository.find();
    const allStarships = await this.starshipsRepository.find();
    const allVehicles = await this.vehiclesRepository.find();
    const allSpecies = await this.speciesRepository.find();

    const peopleMap = new Map(allPeople.map((person) => [person.id, person]));
    const planetsMap = new Map(allPlanets.map((planet) => [planet.id, planet]));
    const starshipsMap = new Map(
      allStarships.map((starship) => [starship.id, starship]),
    );
    const vehiclesMap = new Map(
      allVehicles.map((vehicle) => [vehicle.id, vehicle]),
    );
    const speciesMap = new Map(
      allSpecies.map((species) => [species.id, species]),
    );

    const updatedFilms = allFilms.map((film) => {
      const pilots = film.charactersIds
        .map((id) => peopleMap.get(Number(id)))
        .filter((person): person is Person => person !== undefined);
      film.characters = pilots;

      const planets = film.planetsIds
        .map((id) => planetsMap.get(Number(id)))
        .filter((planet): planet is Planet => planet !== undefined);
      film.planets = planets;

      const starships = film.starshipsIds
        .map((id) => starshipsMap.get(Number(id)))
        .filter((starship): starship is Starship => starship !== undefined);
      film.starships = starships;

      const vehicles = film.vehiclesIds
        .map((id) => vehiclesMap.get(Number(id)))
        .filter((vehicle): vehicle is Vehicle => vehicle !== undefined);
      film.vehicles = vehicles;

      const species = film.speciesIds
        .map((id) => speciesMap.get(Number(id)))
        .filter((species): species is Species => species !== undefined);
      film.species = species;

      return film;
    });

    await this.filmsRepository.save(updatedFilms);
  }
}

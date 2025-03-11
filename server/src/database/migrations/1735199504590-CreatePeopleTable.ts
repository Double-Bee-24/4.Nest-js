import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeopleTable1735199504590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE people (
        id SERIAL PRIMARY KEY,
        description text,
        height VARCHAR(50),
        mass VARCHAR(50),
        "hairColor" VARCHAR(50),
        "skinColor" VARCHAR(50),
        "eyeColor" VARCHAR(50),
        "birthYear" VARCHAR(50),
        gender VARCHAR(50),
        name VARCHAR(255),
        avatar VARCHAR(255),
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "homeworldId" VARCHAR(255),
        "speciesId" INT,
        "planetId" INT,
        "starshipId" INT,
        "vehicleId" INT,
        CONSTRAINT "fkPeoplePlanet" FOREIGN KEY ("planetId") REFERENCES planets(id) ON DELETE SET NULL,
        CONSTRAINT "fkPeopleSpecies" FOREIGN KEY ("speciesId") REFERENCES species(id) ON DELETE SET NULL,
        CONSTRAINT "fkPeopleStarships" FOREIGN KEY ("starshipId") REFERENCES starships(id) ON DELETE SET NULL,
        CONSTRAINT "fkPeopleVehicles" FOREIGN KEY ("vehicleId") REFERENCES vehicles(id) ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE people;`);
  }
}

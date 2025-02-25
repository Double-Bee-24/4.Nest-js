import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeopleTable1735199504590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE people (
        id SERIAL PRIMARY KEY,
        description text,
        height varchar(50),
        mass varchar(50),
        "hairColor" varchar(50),
        "skinColor" varchar(50),
        "eyeColor" varchar(50),
        "birthYear" varchar(50),
        gender varchar(50),
        name varchar(255),
        homeworld varchar(255),
        "speciesId" varchar(24),
        "planetId" INT,
        avatar varchar(255),
        url varchar(255)
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "fkPeoplePlanet" FOREIGN KEY ("planetId") REFERENCES planets(id) ON DELETE SET NULL,
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE people;`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePeopleTable1735199504590 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE people (
        id SERIAL PRIMARY KEY,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        description text,
        height varchar(50),
        mass varchar(50),
        "hairColor" varchar(50),
        "skinColor" varchar(50),
        "eyeColor" varchar(50),
        "birthYear" varchar(50),
        gender varchar(50),
        name varchar(255),
        homeworld INT,
        "speciesId" varchar(24),
        avatar varchar(255)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE people;`);
  }
}
